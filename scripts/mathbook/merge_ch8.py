# -*- coding: utf-8 -*-
"""Merge Chapter 8 cover + body into the final deliverable."""
from pypdf import PdfWriter, PdfReader
import os

BODY = '/home/z/my-project/scripts/mathbook/book_ch8.pdf'
COVER = '/home/z/my-project/scripts/mathbook/cover_ch8.pdf'
OUT = '/home/z/my-project/download/Ganita_Manjari_Grade9_Ch8_Sequences_and_Progressions.pdf'

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
    '/Title': 'Ganita Manjari Grade 9 - Chapter 8: Sequences and Progressions (Practice Companion)',
    '/Author': 'Z.ai',
    '/Creator': 'Z.ai',
    '/Subject': 'Chapter 8 practice workbook - 120 solved questions + 20 MCQs + 20 Choose-the-Correct with cheat sheet, speed tricks, diagrams and Hinglish teacher guide',
})
with open(OUT, 'wb') as f:
    w.write(f)

r = PdfReader(OUT)
print('FINAL:', OUT)
print('pages:', len(r.pages), '| size MB:', round(os.path.getsize(OUT) / 1e6, 2))
