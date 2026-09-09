# -*- coding: utf-8 -*-
"""Merge slim cover + body into the final deliverable."""
from pypdf import PdfWriter, PdfReader
import os

BASE = '/home/z/my-project/scripts/mathbook'
BODY = os.path.join(BASE, 'book_slim.pdf')
COVER = os.path.join(BASE, 'cover.pdf')
OUT = '/home/z/my-project/download/Ganita_Manjari_Grade9_Practice_Workbook.pdf'

os.makedirs(os.path.dirname(OUT), exist_ok=True)
w = PdfWriter()
cover_page = PdfReader(COVER).pages[0]
body_reader = PdfReader(BODY)
bw = float(body_reader.pages[0].mediabox.width)
bh = float(body_reader.pages[0].mediabox.height)
cover_page.scale_to(bw, bh)
w.add_page(cover_page)
w.append(BODY)
w.add_metadata({
    '/Title': 'Ganita Manjari Grade 9 - Maths Practice Workbook (Boxed Solutions Edition)',
    '/Author': 'Z.ai',
    '/Creator': 'Z.ai',
    '/Subject': 'Cheat sheets + 120 curated questions with boxed step-by-step solutions and Hinglish explanations - coordinates, linear polynomials, number systems, identities, perimeter & area, probability',
})
with open(OUT, 'wb') as f:
    w.write(f)

r = PdfReader(OUT)
print('FINAL:', OUT)
print('pages:', len(r.pages), '| size MB:', round(os.path.getsize(OUT)/1e6, 2))
