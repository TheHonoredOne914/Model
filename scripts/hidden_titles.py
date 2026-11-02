#!/usr/bin/env python3
"""Find hidden chapter titles: use internal outline OR largest-font text on page 1."""
import os
import pdfplumber

UP = "/home/z/my-project/upload"
FILES = ["iest201.pdf", "iest204.pdf", "iest206.pdf", "iemh201.pdf", "iemh204.pdf",
         "iemh202.pdf", "iemh203.pdf", "iemh205.pdf", "iemh206.pdf"]

def largest_font_title(path):
    out = []
    with pdfplumber.open(path) as pdf:
        for pi in range(min(2, len(pdf.pages))):
            chars = pdf.pages[pi].chars
            if not chars:
                continue
            mx = max(c["size"] for c in chars)
            if mx < 14:  # no big title text on this page
                continue
            big = [c for c in chars if c["size"] > mx * 0.75]
            big.sort(key=lambda c: (round(c["top"], 1), c["x0"]))
            line, last_top = [], None
            for c in big:
                if last_top is None or abs(c["top"] - last_top) < 6:
                    line.append(c["text"])
                else:
                    if line:
                        out.append("".join(line).strip())
                    line = [c["text"]]
                last_top = c["top"]
            if line:
                out.append("".join(line).strip())
    return out

for f in FILES:
    p = os.path.join(UP, f)
    try:
        titles = largest_font_title(p)
        print(f"{f} :: {titles[:4]}")
    except Exception as e:
        print(f"{f} :: ERR {e}")
