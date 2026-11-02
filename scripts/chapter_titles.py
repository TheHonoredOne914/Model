#!/usr/bin/env python3
"""Pull title text from page 1-2 of each chapter PDF for bookmarks."""
import os
import pypdfium2 as pdfium

UP = "/home/z/my-project/upload"
FILES = [
    "iemh101.pdf","iemh102.pdf","iemh103.pdf","iemh104.pdf","iemh105.pdf",
    "iemh106.pdf","iemh107.pdf","iemh108.pdf",
    "iemh201.pdf","iemh202.pdf","iemh203.pdf","iemh204.pdf","iemh205.pdf","iemh206.pdf",
    "iest103.pdf","iest108.pdf","iest109.pdf",
    "iest201.pdf","iest202.pdf","iest203.pdf","iest204.pdf","iest205.pdf","iest206.pdf",
]

for f in FILES:
    p = os.path.join(UP, f)
    try:
        pdf = pdfium.PdfDocument(p)
        snippet = ""
        for i in (0, 1):
            if i >= len(pdf):
                break
            tp = pdf[i].get_textpage()
            txt = (tp.get_text_bounded() or "").replace("\r", " ").replace("\n", " | ")
            snippet += txt[:180]
            if len(snippet) > 120:
                break
        pdf.close()
        print(f"{f} :: {snippet[:260]}")
    except Exception as e:
        print(f"{f} :: ERROR {e}")
