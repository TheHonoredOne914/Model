#!/usr/bin/env python3
"""
Saathy chapter compression surgery.

Pass A: rasterize heavy vector Form XObjects (>=20KB stored) -> image XObjects
        rendered at 160 DPI JPEG. All references updated; visible result identical.
Pass B: rasterize art-dominated PAGES (content stream bytes >= 150KB, art-heavy,
        and bigger than its expected JPEG size) -> full-page JPEG + invisible
        searchable text layer (reportlab, render mode 3).

Usage: python3 surgery.py <in.pdf> <out_surg.pdf> <raster_dir_base> <map.json>
       map.json accumulates {file: {page_index: raster_pdf_path}}
"""
import io, json, os, sys
import pikepdf
import pypdfium2 as pdfium
from reportlab.pdfgen import canvas as rl_canvas
from reportlab.lib.utils import ImageReader

TH_FORM = 20 * 1024          # 20 KB stored -> rasterize form
TH_PAGE_ART = 150 * 1024     # 150 KB art bytes -> candidate page raster
JPEG_Q = 78
FORM_DPI = 160
PAGE_DPI = 170
MAX_PX = 2400

def stored_size(stream):
    try:
        return len(stream.read_raw_bytes())
    except Exception:
        return 0

def render_pdf_bytes_to_jpeg(data: bytes, dpi: float):
    doc = pdfium.PdfDocument(io.BytesIO(data))
    page = doc[0]
    scale = dpi / 72.0
    w, h = page.get_size()
    scale = min(scale, MAX_PX / max(w, h))
    bmp = page.render(scale=scale)
    pil = bmp.to_pil().convert("RGB")
    doc.close()
    buf = io.BytesIO()
    pil.save(buf, "JPEG", quality=JPEG_Q, optimize=True)
    return buf.getvalue(), pil.size

def matrix_concat(m1, m2):
    # PDF matrix [a b c d e f], apply m1 then m2: m = m2 * m1 (column-vector convention)
    a1, b1, c1, d1, e1, f1 = m1
    a2, b2, c2, d2, e2, f2 = m2
    return [
        a2 * a1 + b2 * c1,
        a2 * b1 + b2 * d1,
        c2 * a1 + d2 * c1,
        c2 * b1 + d2 * d1,
        e2 * a1 + f2 * c1 + e1,
        e2 * b1 + f2 * d1 + f1,
    ]

def transform_bbox(bbox, m):
    x0, y0, x1, y1 = bbox
    pts = [(x0, y0), (x0, y1), (x1, y0), (x1, y1)]
    a, b, c, d, e, f = m
    tp = [(a * x + c * y + e, b * x + d * y + f) for x, y in pts]
    xs, ys = zip(*tp)
    return min(xs), min(ys), max(xs), max(ys)

def render_form_to_jpeg(pdf: pikepdf.Pdf, form) -> bytes:
    bbox = [float(v) for v in form["/BBox"]]
    m = [float(v) for v in form.get("/Matrix", [1, 0, 0, 1, 0, 0])]
    tx0, ty0, tx1, ty1 = transform_bbox(bbox, m)
    w = tx1 - tx0
    h = ty1 - ty0
    if w <= 1 or h <= 1:
        raise ValueError(f"degenerate bbox {w}x{h}")
    tmp = pikepdf.new()
    page = tmp.add_blank_page(page_size=(w, h))
    name = page.add_resource(form, pikepdf.Name.XObject)
    mtxt = " ".join(f"{v:.6f}" for v in m)
    content = f"q {mtxt} cm 1 0 0 1 {-tx0:.6f} {-ty0:.6f} cm {name} Do Q".encode()
    page.contents_add(pikepdf.Stream(tmp, content))
    buf = io.BytesIO()
    tmp.save(buf)
    tmp.close()
    data = buf.getvalue()
    jpeg, size = render_pdf_bytes_to_jpeg(data, FORM_DPI)
    return jpeg, size, (tx0, ty0, w, h, m)

def rasterize_forms(pdf: pikepdf.Pdf) -> int:
    """Replace heavy form XObjects with images. Returns count."""
    # collect unique heavy forms
    heavy = {}
    for obj in pdf.objects:
        try:
            if isinstance(obj, pikepdf.Stream):
                d = dict(obj.items())
                if str(d.get("/Subtype", "")) == "/Form" and str(d.get("/Type", "")) != "/XObject":
                    if stored_size(obj) >= TH_FORM:
                        heavy[obj.objgen] = obj
        except Exception:
            pass
    if not heavy:
        return 0
    # render replacements
    replacement = {}
    for oid, form in heavy.items():
        try:
            jpeg, (pw, ph), geo = render_form_to_jpeg(pdf, form)
            tx0, ty0, w, h, m = geo
            # image matrix: S(w,h) -> T(tx0,ty0) -> M
            mi = matrix_concat([w, 0, 0, h, tx0, ty0], m)
            img = pikepdf.Stream(
                pdf, jpeg,
                stream_dict=pikepdf.Dictionary(
                    Type=pikepdf.Name.XObject,
                    Subtype=pikepdf.Name.Image,
                    Width=int(pw), Height=int(ph),
                    Filter=pikepdf.Name("/DCTDecode"),
                    ColorSpace=pikepdf.Name.DeviceRGB,
                    BitsPerComponent=8,
                    Interpolate=True,
                ),
            )
            replacement[oid] = (img, mi)
        except Exception as e:
            print(f"  [form-skip {oid}] {e}", file=sys.stderr)
    # swap at every reference site
    swapped = set()
    n = 0
    for obj in pdf.objects:
        try:
            if isinstance(obj, pikepdf.Dictionary):
                xo = obj.get("/XObject")
                if isinstance(xo, pikepdf.Dictionary):
                    for k in list(xo.keys()):
                        v = xo[k]
                        try:
                            if isinstance(v, pikepdf.Stream) and v.objgen in replacement:
                                img, mi = replacement[v.objgen]
                                # keep /OC if present
                                oc = v.get("/OC")
                                if oc is not None:
                                    img["/OC"] = oc
                                img["/Matrix"] = pikepdf.Array([float(x) for x in mi])
                                xo[k] = img
                                if v.objgen not in swapped:
                                    swapped.add(v.objgen); n += 1
                        except Exception:
                            pass
        except Exception:
            pass
    return n

def page_art_bytes(pdf: pikepdf.Pdf, page) -> tuple:
    """(content stored bytes, heavy remaining form bytes, total) for a page."""
    content = 0
    try:
        c = page["/Contents"]
        if isinstance(c, pikepdf.Array):
            for s in c:
                content += stored_size(s)
        elif isinstance(c, pikepdf.Stream):
            content += stored_size(c)
    except Exception:
        pass
    forms = 0
    try:
        res = page.get("/Resources", {})
        xo = res.get("/XObject", {}) if res is not None else {}
        if xo is not None:
            for k in xo.keys():
                v = xo[k]
                try:
                    if isinstance(v, pikepdf.Stream) and str(v.get("/Subtype", "")) == "/Form":
                        n = stored_size(v)
                        if n >= 8 * 1024:
                            forms += n
                except Exception:
                    pass
    except Exception:
        pass
    return content, forms

def page_text_rects(pdf_path: str, page_idx: int):
    """Memory-safe text rects via pdfium C++ API. Returns [(l,b,r,t,text)]."""
    out = []
    try:
        doc = pdfium.PdfDocument(pdf_path)
        page = doc[page_idx]
        tp = page.get_textpage()
        n = tp.count_rects()
        for i in range(n):
            l, b, r, t = tp.get_rect(i)
            try:
                txt = tp.get_text_bounded(l, b, r, t)
            except Exception:
                txt = ""
            if txt and txt.strip():
                out.append((l, b, r, t, txt))
        doc.close()
    except Exception:
        pass
    return out

def rasterize_art_pages(pdf: pikepdf.Pdf, src_path: str, raster_dir: str, file_key: str):
    """Rasterize art-dominated pages; returns {page_idx: raster_pdf_path}."""
    import subprocess, glob
    mapping = {}
    os.makedirs(raster_dir, exist_ok=True)
    W = H = 0.0
    infos = []
    for i, page in enumerate(pdf.pages):
        try:
            box = page.get("/CropBox", page.get("/MediaBox"))
            W = float(box[2]) - float(box[0])
            H = float(box[3]) - float(box[1])
        except Exception:
            w, h = page.get("/MediaBox", [0, 0, 595, 842])[2:4]
            W, H = float(w), float(h)
        content, forms = page_art_bytes(pdf, page)
        art = content + forms
        if art < TH_PAGE_ART:
            continue
        exp_jpeg = (W * PAGE_DPI / 72.0) * (H * PAGE_DPI / 72.0) * 0.07
        if art < exp_jpeg * 1.3:
            continue
        infos.append((i, art, exp_jpeg))
    if not infos:
        return mapping
    for i, art, exp in infos:
        out_path = os.path.join(raster_dir, f"{file_key}__p{i:03d}.pdf")
        try:
            words = page_text_rects(src_path, i)
            # single-page temp pdf for poppler
            tmp = pikepdf.new()
            tmp.pages.extend([pdf.pages[i]])
            tmp_path = os.path.join(raster_dir, f"_tmp_{file_key}_{i}.pdf")
            tmp.save(tmp_path)
            tmp.close()
            # render via poppler (memory-safe for huge pages)
            prefix = os.path.join(raster_dir, f"_tmp_{file_key}_{i}")
            hits = []
            r = None
            for dpi_try in (PAGE_DPI, 130):
                r = subprocess.run(
                    ["pdftoppm", "-jpeg", "-jpegopt", "quality=78", "-r", str(dpi_try),
                     "-f", "1", "-l", "1", tmp_path, prefix],
                    capture_output=True, timeout=180)
                hits = glob.glob(prefix + "-*.jpg") or glob.glob(prefix + ".jpg")
                if hits and r.returncode == 0:
                    break
            if not hits:
                raise RuntimeError(f"pdftoppm failed: {r.stderr[:200]}")
            jpg_path = hits[0]
            with open(jpg_path, "rb") as fh:
                jpeg_bytes = fh.read()
            # build final page: image + invisible text
            buf = io.BytesIO()
            canv = rl_canvas.Canvas(buf, pagesize=(W, H))
            img = ImageReader(io.BytesIO(jpeg_bytes))
            canv.drawImage(img, 0, 0, width=W, height=H)
            for (l, b, r, t, txt) in words:
                size = max(4.0, (t - b) * 0.8)
                to = canv.beginText()
                try:
                    to.setTextRenderMode(3)
                except Exception:
                    pass
                to.setFont("Helvetica", size)
                to.setTextOrigin(l, b + (t - b) * 0.22)
                to.textOut(txt[:300])
                canv.drawText(to)
            canv.showPage()
            canv.save()
            with open(out_path, "wb") as f:
                f.write(buf.getvalue())
            for pth in (tmp_path, jpg_path):
                try:
                    os.remove(pth)
                except Exception:
                    pass
            mapping[i] = out_path
            print(f"  [page-raster] {file_key} p{i+1}: art={art/1024:.0f}KB -> {os.path.getsize(out_path)/1024:.0f}KB", flush=True)
        except Exception as e:
            print(f"  [page-skip] {file_key} p{i+1}: {str(e)[:160]}", file=sys.stderr, flush=True)
    return mapping

def main():
    src, dst, raster_dir, map_path = sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4]
    file_key = os.path.splitext(os.path.basename(src))[0]
    pdf = pikepdf.open(src)
    n_forms = rasterize_forms(pdf)
    print(f"{file_key}: forms rasterized = {n_forms}")
    mapping = rasterize_art_pages(pdf, src, raster_dir, file_key)
    pdf.save(dst, compress_streams=True, object_stream_mode=pikepdf.ObjectStreamMode.generate)
    pdf.close()
    # merge into map.json
    m = {}
    if os.path.exists(map_path):
        m = json.load(open(map_path))
    m[file_key] = {str(k): v for k, v in mapping.items()}
    json.dump(m, open(map_path, "w"), indent=1)
    print(f"{file_key}: pages rasterized = {len(mapping)}; saved {dst}")

if __name__ == "__main__":
    main()
