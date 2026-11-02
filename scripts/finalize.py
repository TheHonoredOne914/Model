#!/usr/bin/env python3
"""Finalize: normalize MediaBox=CropBox, add clickable TOC links, save final PDF."""
import os, re, sys
import pikepdf
import pypdfium2 as pdfium

WORK = "/home/z/my-project/scripts/work"

META = {
    "iemh101": 1, "iemh102": 2, "iemh103": 3, "iemh104": 4,
    "iemh105": 5, "iemh106": 6, "iemh107": 7, "iemh108": 8,
    "iemh201": 9, "iemh202": 10, "iemh203": 11, "iemh204": 12,
    "iemh205": 13, "iemh206": 14,
    "iest103": 3, "iest108": 8, "iest109": 9,
    "iest201": 1, "iest202": 2, "iest203": 3,
    "iest204": 4, "iest205": 5, "iest206": 6,
}
TITLES = {
    "iemh101": "Orienting Yourself: The Use of Coordinates",
    "iemh102": "Introduction to Linear Polynomials",
    "iemh103": "The World of Numbers",
    "iemh104": "Exploring Algebraic Identities",
    "iemh105": "I'm Up and Down, and Round and Round",
    "iemh106": "Measuring Space: Perimeter and Area",
    "iemh107": "The Mathematics of Maybe: Introduction to Probability",
    "iemh108": "Predicting What Comes Next: Sequences and Progressions",
    "iemh201": "Propositions and their Converses",
    "iemh202": "How Quantities Combine: Understanding Data",
    "iemh203": "The World of Algorithms",
    "iemh204": "Quadrilaterals",
    "iemh205": "Two Variables, One Line",
    "iemh206": "Math of Space: Surface Area and Volume",
    "iest103": "Atmosphere and Climate",
    "iest108": "Building Blocks in Economics: The Problem of Choice",
    "iest109": "The Price Puzzle: What Drives the Market",
    "iest201": "Oceans and Life",
    "iest202": "Life on Earth",
    "iest203": "Resistance and Resilience (1000-1700 CE)",
    "iest204": "Governance and Public Policy",
    "iest205": "Managing Your Personal Finances",
    "iest206": "From Ideas to Startups",
}
ORDER = ["iemh101","iemh102","iemh103","iemh104","iemh105","iemh106","iemh107","iemh108",
         "iemh201","iemh202","iemh203","iemh204","iemh205","iemh206",
         "iest103","iest108","iest109",
         "iest201","iest202","iest203","iest204","iest205","iest206"]

def norm_boxes(pdf):
    n = 0
    for p in pdf.pages:
        if "/CropBox" in p:
            mb = [float(v) for v in p.mediabox]
            cb = [float(v) for v in p.cropbox]
            if any(abs(a - b) > 0.5 for a, b in zip(mb, cb)):
                p.mediabox = p.cropbox
                n += 1
    return n

def toc_row_rects(toc_pdf_path, starts):
    """Find each chapter row rect on the TOC page: title probe + page-number fallback."""
    doc = pdfium.PdfDocument(toc_pdf_path)
    page = doc[0]
    W, H = page.get_size()
    tp = page.get_textpage()
    tp.count_rects()  # init rect array once
    nrect = tp.count_rects()
    chars = []
    for i in range(nrect):
        l, b, r, t = tp.get_rect(i)
        try:
            txt = tp.get_text_bounded(l, b, r, t) or ""
        except Exception:
            txt = ""
        chars.append((l, b, r, t, txt))
    doc.close()

    # cluster chars into visual rows by y-center (gap threshold), then row text
    chars_sorted = sorted([c for c in chars if c[4].strip()], key=lambda x: -(x[1] + x[3]) / 2)
    rows = []
    for c in chars_sorted:
        cy = (c[1] + c[3]) / 2
        if rows and abs(cy - rows[-1][0]) <= 3.0:
            rows[-1][1].append(c)
            m = sum((x[1] + x[3]) / 2 for x in rows[-1][1]) / len(rows[-1][1])
            rows[-1] = (m, rows[-1][1])
        else:
            rows.append((cy, [c]))
    line_objs = []
    for cy, items in rows:
        items.sort(key=lambda x: x[0])
        text = "".join(x[4] for x in items)
        l = min(x[0] for x in items); r = max(x[2] for x in items)
        b = min(x[1] for x in items); t = max(x[3] for x in items)
        line_objs.append((l, b, r, t, "".join(text.lower().split())))

    # page-number clusters: digit chars in the number zones (left col ~0.38-0.52W, right col ~0.84-0.97W)
    def num_zone(l):
        return "L" if (0.38 * W <= l <= 0.52 * W) else ("R" if (0.84 * W <= l <= 0.97 * W) else None)
    digits = [(num_zone(c[0]), c) for c in chars if c[4].strip().isdigit() and num_zone(c[0])]
    digits.sort(key=lambda zc: -((zc[1][1] + zc[1][3]) / 2))
    rrows = []
    for zone, c in digits:
        cy = (c[1] + c[3]) / 2
        if rrows and rrows[-1][0] == zone and abs(cy - rrows[-1][1]) <= 3.0:
            rrows[-1][2].append(c)
            rrows[-1] = (zone, sum((x[1] + x[3]) / 2 for x in rrows[-1][2]) / len(rrows[-1][2]), rrows[-1][2])
        else:
            rrows.append((zone, cy, [c]))
    num_rows = {}
    for zone, cy, items in rrows:
        items.sort(key=lambda x: x[0])
        num = "".join(x[4].strip() for x in items)
        if num.isdigit():
            num_rows[num] = (min(x[0] for x in items), min(x[1] for x in items),
                             max(x[2] for x in items), max(x[3] for x in items))

    def norm(s):
        return "".join(s.lower().split())

    out = {}
    for key in ORDER:
        disp = TITLES[key]
        if len(disp) > 44:
            disp = disp[:42].rstrip(" ,:")
        probe = norm(disp)[:20]
        if not probe:
            continue
        hit = None
        for i, (l, b, r, t, txt) in enumerate(line_objs):
            if probe in txt or probe in re.sub(r'(.{1,4})\1+', r'\1', txt):
                hit = (l, b, r, t)
                break
            # wrapped titles: try concatenation with next row
            if i + 1 < len(line_objs):
                l2, b2, r2, t2, txt2 = line_objs[i + 1]
                if probe in (txt + txt2):
                    hit = (min(l, l2), b2, max(r, r2), t)  # spans both lines
                    break
        if hit is None:
            # fallback: locate by the row's page number on the right edge
            pnum = str(starts.get(key, ""))
            if pnum and pnum in num_rows:
                nl, nb, nr, nt = num_rows[pnum]
                hit = (20.0, nb, W - 20.0, nt)
        if hit:
            out[key] = hit
    return out, W, H

def add_links(pdf, row_rects, W, H, starts):
    page = pdf.pages[1]  # contents page
    annots = page.get("/Annots")
    if annots is None:
        annots = pdf.make_indirect(pikepdf.Array([]))
        page["/Annots"] = annots
    added = 0
    for key in ORDER:
        if key not in row_rects:
            print(f"  [link-miss] {key}")
            continue
        l, b, r, t = row_rects[key]
        target_idx = starts[key] - 1
        target = pdf.pages[target_idx]
        mb = [float(v) for v in target.mediabox]
        ptop = mb[3] if (mb[3] - mb[1]) > 1 else 842.0
        annot = pdf.make_indirect(pikepdf.Dictionary(
            Type=pikepdf.Name.Annot,
            Subtype=pikepdf.Name.Link,
            Rect=pikepdf.Array([float(l) - 8, float(b) - 3, W - 28, float(t) + 3]),
            Border=pikepdf.Array([0, 0, 0]),
            Dest=pikepdf.Array([target.obj, pikepdf.Name.XYZ, 0, ptop, 0]),
        ))
        annots.append(annot)
        added += 1
    return added

def main():
    src, dstp = sys.argv[1], sys.argv[2]
    import json
    info = json.load(open(os.path.join(WORK, "book_info.json")))
    starts = info["starts"]
    pdf = pikepdf.open(src)
    n = norm_boxes(pdf)
    print(f"normalized {n} pages MediaBox->CropBox")
    row_rects, W, H = toc_row_rects(os.path.join(WORK, "toc.pdf"), starts)
    print(f"toc rows found: {len(row_rects)}/23")
    added = add_links(pdf, row_rects, W, H, starts)
    print(f"links added: {added}")
    pdf.save(dstp, compress_streams=True, object_stream_mode=pikepdf.ObjectStreamMode.generate)
    pdf.close()
    print(f"final: {dstp} ({os.path.getsize(dstp)/1048576:.2f} MB)")

if __name__ == "__main__":
    main()
