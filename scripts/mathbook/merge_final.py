# -*- coding: utf-8 -*-
"""Merge cover + body into the final deliverable and run QA checks."""
from pypdf import PdfWriter, PdfReader
import os

BODY = '/home/z/my-project/scripts/mathbook/book_body.pdf'
COVER = '/home/z/my-project/scripts/mathbook/cover.pdf'
OUT = '/home/z/my-project/download/Ganita_Manjari_Grade9_Advanced_Practice_Book.pdf'

os.makedirs(os.path.dirname(OUT), exist_ok=True)
w = PdfWriter()
cover_page = PdfReader(COVER).pages[0]
body_reader = PdfReader(BODY)
bw = float(body_reader.pages[0].mediabox.width)
bh = float(body_reader.pages[0].mediabox.height)
cover_page.scale_to(bw, bh)   # exact A4 match with the body
w.add_page(cover_page)
w.append(BODY)
w.add_metadata({
    '/Title': 'Ganita Manjari Grade 9 - Advanced Maths Practice Book (Part I)',
    '/Author': 'Z.ai',
    '/Creator': 'Z.ai',
    '/Subject': 'Advanced practice workbook with Hinglish teacher guide - coordinates, linear polynomials, number systems, algebraic identities, perimeter & area, probability',
})
with open(OUT, 'wb') as f:
    w.write(f)

r = PdfReader(OUT)
print('FINAL:', OUT)
print('pages:', len(r.pages), '| size MB:', round(os.path.getsize(OUT)/1e6, 2))
