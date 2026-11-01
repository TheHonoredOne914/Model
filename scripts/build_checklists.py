# -*- coding: utf-8 -*-
"""Build standalone Final Revision Checklists (PDF + MD) for Ganita Manjari Grade 9.

Extracts CH*_CHECKLIST blocks from rev_a/b/c.py and renders a clean printable
A4 checklist booklet in the VidhyaSaathy notebook theme (no emoji).
"""
import sys, os, re

sys.path.insert(0, "/home/z/my-project/scripts/mathbook")
from rev_a import CH1_TITLE, CH1_CHECKLIST, CH2_TITLE, CH2_CHECKLIST, CH3_TITLE, CH3_CHECKLIST
from rev_b import CH4_TITLE, CH4_CHECKLIST, CH6_TITLE, CH6_CHECKLIST
from rev_c import CH7_TITLE, CH7_CHECKLIST, CH8_TITLE, CH8_CHECKLIST

CHAPTERS = [
    (1, CH1_TITLE, CH1_CHECKLIST),
    (2, CH2_TITLE, CH2_CHECKLIST),
    (3, CH3_TITLE, CH3_CHECKLIST),
    (4, CH4_TITLE, CH4_CHECKLIST),
    (6, CH6_TITLE, CH6_CHECKLIST),
    (7, CH7_TITLE, CH7_CHECKLIST),
    (8, CH8_TITLE, CH8_CHECKLIST),
]

# ---------- fonts / palette (project design system) ----------
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase.pdfmetrics import registerFontFamily
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import (BaseDocTemplate, PageTemplate, Frame, Paragraph,
                                Spacer, Table, TableStyle, KeepTogether)
from reportlab.graphics.shapes import Drawing, Rect

FONT_DIR = "/usr/share/fonts"
pdfmetrics.registerFont(TTFont("NotoSerifSC", f"{FONT_DIR}/truetype/noto-serif-sc/NotoSerifSC-Regular.ttf"))
pdfmetrics.registerFont(TTFont("NotoSerifSC-Bold", f"{FONT_DIR}/truetype/noto-serif-sc/NotoSerifSC-Bold.ttf"))
registerFontFamily("NotoSerifSC", normal="NotoSerifSC", bold="NotoSerifSC-Bold")

NAVY = HexColor("#102B4C")
OCEAN = HexColor("#214F78")
PEACH = HexColor("#F6D5C6")
CREAM = HexColor("#FFF5ED")
MIST = HexColor("#FBE9DF")
TEXT = HexColor("#17324F")
SUB = HexColor("#637C96")
LINE = HexColor("#D8DDE7")

OUT_PDF = "/home/z/my-project/download/Saathy_G9_Final_Revision_Checklists.pdf"
OUT_MD = "/home/z/my-project/download/Saathy_G9_Final_Revision_Checklists.md"

TOTAL = sum(len(c) for _, _, c in CHAPTERS)

st_item = ParagraphStyle("item", fontName="NotoSerifSC", fontSize=9.8, leading=14.5,
                         textColor=TEXT, spaceBefore=0, spaceAfter=0)
st_chap = ParagraphStyle("chap", fontName="NotoSerifSC-Bold", fontSize=13.5, leading=17,
                         textColor=HexColor("#FFFFFF"))
st_hint = ParagraphStyle("hint", fontName="NotoSerifSC", fontSize=8.6, leading=12, textColor=SUB)


def on_page(canv, doc):
    canv.saveState()
    w, h = A4
    # cover-style header band on page 1, slim band afterwards
    if doc.page == 1:
        canv.setFillColor(NAVY)
        canv.rect(0, h - 34 * mm, w, 34 * mm, stroke=0, fill=1)
        canv.setFillColor(PEACH)
        canv.rect(0, h - 34 * mm, w, 1.1 * mm, stroke=0, fill=1)
        canv.setFillColor(HexColor("#FFFFFF"))
        canv.setFont("NotoSerifSC-Bold", 19)
        canv.drawString(16 * mm, h - 15.5 * mm, "Final Revision Checklists")
        canv.setFont("NotoSerifSC", 9.5)
        canv.setFillColor(HexColor("#D7E9F5"))
        canv.drawString(16 * mm, h - 21.5 * mm,
                        "Ganita Manjari  \u00b7  Grade 9  \u00b7  7 chapters  \u00b7  %d checkpoints" % TOTAL)
        canv.setFont("NotoSerifSC", 8.6)
        canv.setFillColor(HexColor("#A9CEE8"))
        canv.drawString(16 * mm, h - 27.5 * mm,
                        "Tick a box only when you can honestly say DONE. Revisit any unticked box the night before the exam.")
        canv.setFillColor(NAVY)
        canv.setFont("NotoSerifSC-Bold", 10)
    # footer
    canv.setFillColor(SUB)
    canv.setFont("NotoSerifSC", 8)
    canv.drawString(16 * mm, 10 * mm, "VidhyaSaathy \u00b7 Learning, with you")
    canv.drawRightString(w - 16 * mm, 10 * mm, "Page %d" % doc.page)
    canv.restoreState()


doc = BaseDocTemplate(OUT_PDF, pagesize=A4,
                      leftMargin=16 * mm, rightMargin=16 * mm,
                      topMargin=40 * mm if True else 0, bottomMargin=16 * mm)
frame_p1 = Frame(16 * mm, 16 * mm, A4[0] - 32 * mm, A4[1] - 46 * mm, id="p1")
frame_pn = Frame(16 * mm, 16 * mm, A4[0] - 32 * mm, A4[1] - 26 * mm, id="pn")
doc.addPageTemplates([
    PageTemplate(id="first", frames=[frame_p1], onPage=on_page),
    PageTemplate(id="rest", frames=[frame_pn], onPage=on_page),
])
doc._nextPageTemplateIndex = 0

story = []
BOX = 4.2 * mm

def chapter_block(num, title, items):
    clean_title = re.sub(r"^Chapter\s+\d+\s*:\s*", "", title)
    clean_title = clean_title.replace("  \u2605 MOST IMPORTANT", "  \u00b7 MOST IMPORTANT")
    head = Table(
        [[Paragraph("<b>Chapter %d</b>&nbsp;&nbsp;\u00b7&nbsp;&nbsp;%s" % (num, esc(clean_title)), st_chap),
          Paragraph("<b>%d</b>" % len(items), ParagraphStyle("n", fontName="NotoSerifSC-Bold",
                    fontSize=13.5, textColor=HexColor("#FFFFFF"), alignment=2))]],
        colWidths=[doc.width - 16 * mm, 16 * mm])
    head.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), NAVY),
        ("TOPPADDING", (0, 0), (-1, -1), 5.5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 5.5),
        ("LEFTPADDING", (0, 0), (-1, -1), 8),
        ("RIGHTPADDING", (0, 0), (-1, -1), 8),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("LINEBELOW", (0, 0), (-1, -1), 2, PEACH),
    ]))
    rows, styles = [], [
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (0, -1), 4),
        ("RIGHTPADDING", (0, 0), (0, -1), 2),
        ("LEFTPADDING", (1, 0), (1, -1), 7),
        ("RIGHTPADDING", (1, 0), (1, -1), 6),
        ("TOPPADDING", (0, 0), (-1, -1), 4.5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 4.5),
        ("LINEBELOW", (0, 0), (-1, -2), 0.5, LINE),
    ]
    for i, it in enumerate(items):
        d = Drawing(BOX, BOX)
        d.add(Rect(0.5, 0.5, BOX - 1, BOX - 1, strokeColor=OCEAN, strokeWidth=1.1, fillColor=HexColor("#FFFFFF")))
        rows.append([d, Paragraph(it, st_item)])
        if i % 2 == 1:
            styles.append(("BACKGROUND", (0, i), (-1, i), CREAM))
        styles.append(("ALIGN", (0, i), (0, i), "CENTER"))
    grid = Table(rows, colWidths=[BOX + 10, doc.width - BOX - 10])
    grid.setStyle(TableStyle(styles))
    return KeepTogether([head, grid, Spacer(1, 7 * mm)])


def esc(s):
    return s.replace("&", "&amp;")


first = True
for num, title, items in CHAPTERS:
    story.append(chapter_block(num, title, items))
    if first:
        story.insert(0, Spacer(1, 0))
        first = False

doc.build(story)
print("PDF pages written:", OUT_PDF)

# ---------- markdown twin ----------
ENT = {"&rarr;": "\u2192", "&ne;": "\u2260", "&minus;": "\u2212", "&frac12;": "\u00bd",
       "&times;": "\u00d7", "&plusmn;": "\u00b1", "&le;": "\u2264", "&ge;": "\u2265",
       "&amp;": "&"}

def plain(s):
    s = re.sub(r"<super>(.*?)</super>", r"^\1", s)
    s = re.sub(r"<sub>(.*?)</sub>", r"_\1", s)
    s = s.replace("<b>", "**").replace("</b>", "**")
    for k, v in ENT.items():
        s = s.replace(k, v)
    return s

md = ["# Final Revision Checklists", "",
      "**Ganita Manjari \u00b7 Grade 9 \u00b7 7 chapters \u00b7 %d checkpoints**" % TOTAL, "",
      "Tick a box only when you can honestly say DONE. Revisit any unticked box the night before the exam.", ""]
for num, title, items in CHAPTERS:
    t = re.sub(r"^Chapter\s+\d+\s*:\s*", "", title).replace("  \u2605 MOST IMPORTANT", "\u00b7 MOST IMPORTANT")
    md += ["## Chapter %d \u2014 %s" % (num, t), ""]
    md += ["- [ ] " + plain(it) for it in items]
    md += [""]
with open(OUT_MD, "w", encoding="utf-8") as f:
    f.write("\n".join(md))
print("MD written:", OUT_MD, "items:", TOTAL)
