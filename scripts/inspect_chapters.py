#!/usr/bin/env python3
"""Inspect the 23 uploaded chapter PDFs: pages, dims, text layer, image stats."""
import json, os, subprocess, sys

UP = "/home/z/my-project/upload"
FILES = [
    "iemh101.pdf","iemh102.pdf","iemh103.pdf","iemh104.pdf","iemh105.pdf",
    "iemh106.pdf","iemh107.pdf","iemh108.pdf",
    "iemh201.pdf","iemh202.pdf","iemh203.pdf","iemh204.pdf","iemh205.pdf","iemh206.pdf",
    "iest103.pdf","iest108.pdf","iest109.pdf",
    "iest201.pdf","iest202.pdf","iest203.pdf","iest204.pdf","iest205.pdf","iest206.pdf",
]

def main():
    rows = []
    for f in FILES:
        p = os.path.join(UP, f)
        if not os.path.exists(p):
            rows.append({"file": f, "missing": True}); continue
        try:
            import pypdfium2 as pdfium
            pdf = pdfium.PdfDocument(p)
            n = len(pdf)
            w = h = 0.0
            tchars = 0
            sample_pages = min(n, 3)
            for i in range(sample_pages):
                pg = pdf[i]
                pw, ph = pg.get_size()
                w, h = max(w, pw), max(h, ph)
                tp = pg.get_textpage()
                tchars += len(tp.get_text_bounded())
            pdf.close()
            sz = os.path.getsize(p)
            # image count via pdfimages -list (fast, first 999 lines)
            try:
                out = subprocess.run(["pdfimages","-list","-l","2000",p], capture_output=True, text=True, timeout=60).stdout
                lines = [l for l in out.splitlines()[2:] if l.strip()]
                nimg = len(lines)
            except Exception:
                nimg = -1
            rows.append({"file": f, "pages": n, "w": round(w,1), "h": round(h,1),
                         "text_chars_first3": tchars, "size_mb": round(sz/1048576,2),
                         "kb_per_page": round(sz/1024/max(n,1),1), "images": nimg})
        except Exception as e:
            rows.append({"file": f, "error": str(e)[:200]})
    print(json.dumps(rows, indent=1))

if __name__ == "__main__":
    main()
