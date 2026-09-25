# -*- coding: utf-8 -*-
"""Merge Final Revision cover + body into the deliverable."""
from pypdf import PdfWriter, PdfReader
import os

BODY = '/home/z/my-project/scripts/mathbook/book_revision.pdf'
COVER = '/home/z/my-project/scripts/mathbook/cover_revision.pdf'
OUT = '/home/z/my-project/download/Ganita_Manjari_Grade9_Final_Revision_Sheet.pdf'

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
    '/Title': 'Ganita Manjari Grade 9 - Final Revision Sheet (All Chapters 1-8)',
    '/Author': 'Z.ai',
    '/Creator': 'Z.ai',
    '/Subject': 'One-night revision: all formulas with easy Hinglish meanings, concept checklists, speed tricks, 75 most-important book questions with solutions, 97 rapid-fire MCQs, Exam Morning Power Page',
})
with open(OUT, 'wb') as f:
    w.write(f)

r = PdfReader(OUT)
print('FINAL:', OUT)
print('pages:', len(r.pages), '| size MB:', round(os.path.getsize(OUT) / 1e6, 2))
