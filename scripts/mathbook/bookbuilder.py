# -*- coding: utf-8 -*-
"""Book builder framework for the Ganita Manjari Grade 9 Practice Book PDF.
Route: Report (ReportLab). Cover generated separately via html2poster.js.
"""
import os, sys, hashlib

PDF_SKILL_DIR = "/home/z/my-project/skills/pdf"
_scripts = os.path.join(PDF_SKILL_DIR, "scripts")
if _scripts not in sys.path:
    sys.path.insert(0, _scripts)

from reportlab.lib.pagesizes import A4
from reportlab.lib.units import inch
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY, TA_RIGHT
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase.pdfmetrics import registerFontFamily, stringWidth
from reportlab.platypus import (SimpleDocTemplate, Paragraph, Spacer, PageBreak,
                                Table, TableStyle, Image, KeepTogether, CondPageBreak,
                                HRFlowable)
from reportlab.platypus.tableofcontents import TableOfContents
from PIL import Image as PILImage

# ---------------- Fonts ----------------
FONT_DIR = '/usr/share/fonts'
pdfmetrics.registerFont(TTFont('NotoSerifSC', f'{FONT_DIR}/truetype/noto-serif-sc/NotoSerifSC-Regular.ttf'))
pdfmetrics.registerFont(TTFont('NotoSerifSC-Bold', f'{FONT_DIR}/truetype/noto-serif-sc/NotoSerifSC-Bold.ttf'))
pdfmetrics.registerFont(TTFont('FreeSerif', f'{FONT_DIR}/truetype/freefont/FreeSerif.ttf'))
pdfmetrics.registerFont(TTFont('FreeSerif-Bold', f'{FONT_DIR}/truetype/freefont/FreeSerifBold.ttf'))
pdfmetrics.registerFont(TTFont('FreeSerif-Italic', f'{FONT_DIR}/truetype/freefont/FreeSerifItalic.ttf'))
pdfmetrics.registerFont(TTFont('FreeSerif-BoldItalic', f'{FONT_DIR}/truetype/freefont/FreeSerifBoldItalic.ttf'))
pdfmetrics.registerFont(TTFont('DejaVuSans', f'{FONT_DIR}/truetype/dejavu/DejaVuSansMono.ttf'))
registerFontFamily('NotoSerifSC', normal='NotoSerifSC', bold='NotoSerifSC-Bold')
registerFontFamily('FreeSerif', normal='FreeSerif', bold='FreeSerif-Bold',
                   italic='FreeSerif-Italic', boldItalic='FreeSerif-BoldItalic')
registerFontFamily('DejaVuSans', normal='DejaVuSans', bold='DejaVuSans')

from pdf import install_font_fallback
install_font_fallback()

# ------------- Cascade palette (design_engine palette-cascade --intent cold --mode minimal --seed 7) -------------
PAGE_BG       = colors.HexColor('#eff0f1')
SECTION_BG    = colors.HexColor('#f0f1f2')
CARD_BG       = colors.HexColor('#e4e7e8')
TABLE_STRIPE  = colors.HexColor('#ebedee')
HEADER_FILL   = colors.HexColor('#334650')
COVER_BLOCK   = colors.HexColor('#5a7886')
BORDER        = colors.HexColor('#b8c8cf')
ICON          = colors.HexColor('#52798c')
ACCENT        = colors.HexColor('#3681a6')
ACCENT_2      = colors.HexColor('#b43a4e')
TEXT_PRIMARY  = colors.HexColor('#1a1b1c')
TEXT_MUTED    = colors.HexColor('#6f7578')
SEM_WARNING   = colors.HexColor('#a18347')

TABLE_HEADER_COLOR = HEADER_FILL
TABLE_ROW_EVEN     = colors.white
TABLE_ROW_ODD      = TABLE_STRIPE

# ---------------- Page geometry ----------------
MARGIN = 0.85 * inch
PAGE_W, PAGE_H = A4
AVAIL_W = PAGE_W - 2 * MARGIN
AVAIL_H = PAGE_H - 0.95 * inch - 0.8 * inch
MAX_KEEP_HEIGHT = PAGE_H * 0.40
H1_THRESHOLD = AVAIL_H * 0.25

BOOK_TITLE = "Ganita Manjari Grade 9 - Advanced Maths Practice Book"

# ---------------- Styles ----------------
S = {}
def _st(name, **kw):
    S[name] = ParagraphStyle(name=name, **kw)

_st('body', fontName='FreeSerif', fontSize=10.5, leading=15.8, alignment=TA_JUSTIFY,
    textColor=TEXT_PRIMARY, spaceBefore=0, spaceAfter=7)
_st('bodyL', fontName='FreeSerif', fontSize=10.5, leading=15.8, alignment=TA_LEFT,
    textColor=TEXT_PRIMARY, spaceBefore=0, spaceAfter=7)
_st('h1', fontName='FreeSerif-Bold', fontSize=21, leading=26, textColor=HEADER_FILL,
    spaceBefore=6, spaceAfter=4, alignment=TA_LEFT)
_st('h2', fontName='FreeSerif-Bold', fontSize=14.5, leading=19, textColor=HEADER_FILL,
    spaceBefore=14, spaceAfter=6, alignment=TA_LEFT)
_st('h3', fontName='FreeSerif-Bold', fontSize=11.5, leading=15, textColor=TEXT_PRIMARY,
    spaceBefore=10, spaceAfter=4, alignment=TA_LEFT)
_st('kicker', fontName='FreeSerif', fontSize=8.5, leading=11, textColor=TEXT_MUTED,
    spaceBefore=0, spaceAfter=2, alignment=TA_LEFT)
_st('qmeta', fontName='FreeSerif', fontSize=8.6, leading=11.5, textColor=ACCENT,
    spaceBefore=8, spaceAfter=2, alignment=TA_LEFT)
_st('qstem', fontName='FreeSerif', fontSize=10.5, leading=15.5, alignment=TA_LEFT,
    textColor=TEXT_PRIMARY, spaceBefore=1, spaceAfter=4)
_st('solhead', fontName='FreeSerif-Bold', fontSize=9.5, leading=13, textColor=ICON,
    spaceBefore=2, spaceAfter=3, alignment=TA_LEFT)
_st('step', fontName='FreeSerif', fontSize=10.3, leading=15.2, alignment=TA_LEFT,
    leftIndent=16, textColor=TEXT_PRIMARY, spaceBefore=0, spaceAfter=3.5)
_st('why', fontName='FreeSerif', fontSize=9.8, leading=14.2, alignment=TA_LEFT,
    leftIndent=16, textColor=TEXT_PRIMARY, spaceBefore=0, spaceAfter=3)
_st('hinglish', fontName='FreeSerif', fontSize=10.2, leading=15.0, alignment=TA_LEFT,
    backColor=CARD_BG, borderColor=BORDER, borderWidth=0.7, borderPadding=6,
    leftIndent=2, rightIndent=2, spaceBefore=4, spaceAfter=8)
_st('answer', fontName='FreeSerif-Bold', fontSize=10.5, leading=15, textColor=HEADER_FILL,
    leftIndent=16, spaceBefore=2, spaceAfter=8)
_st('opt', fontName='FreeSerif', fontSize=10.3, leading=14.6, leftIndent=26,
    textColor=TEXT_PRIMARY, spaceBefore=1, spaceAfter=1)
_st('bullet', fontName='FreeSerif', fontSize=10.4, leading=15.4, leftIndent=16,
    bulletIndent=4, alignment=TA_LEFT, textColor=TEXT_PRIMARY, spaceBefore=0, spaceAfter=3.5)
_st('calloutT', fontName='FreeSerif-Bold', fontSize=10.6, leading=14.5, textColor=HEADER_FILL,
    spaceBefore=0, spaceAfter=2, alignment=TA_LEFT)
_st('calloutB', fontName='FreeSerif', fontSize=10.1, leading=14.8, alignment=TA_LEFT,
    textColor=TEXT_PRIMARY, spaceBefore=0, spaceAfter=0)
_st('caption', fontName='FreeSerif-Italic', fontSize=8.7, leading=12, alignment=TA_CENTER,
    textColor=TEXT_MUTED, spaceBefore=3, spaceAfter=10)
_st('thead', fontName='FreeSerif-Bold', fontSize=9.6, leading=12.6, textColor=colors.white,
    alignment=TA_LEFT)
_st('tcell', fontName='FreeSerif', fontSize=9.5, leading=13.2, textColor=TEXT_PRIMARY,
    alignment=TA_LEFT)
_st('toc0', fontName='FreeSerif-Bold', fontSize=11.5, leading=17, textColor=HEADER_FILL, leftIndent=6)
_st('toc1', fontName='FreeSerif', fontSize=9.8, leading=14.5, textColor=TEXT_PRIMARY, leftIndent=26)
_st('tocTitle', fontName='FreeSerif-Bold', fontSize=19, leading=24, textColor=HEADER_FILL, spaceAfter=14)

# ---------------- Doc template with TOC ----------------
class TocDocTemplate(SimpleDocTemplate):
    def afterFlowable(self, flowable):
        if hasattr(flowable, 'bookmark_name'):
            level = getattr(flowable, 'bookmark_level', 0)
            text = getattr(flowable, 'bookmark_text', '')
            key = getattr(flowable, 'bookmark_key', '')
            self.notify('TOCEntry', (level, text, self.page, key))

def _footer(canvas, doc):
    canvas.saveState()
    if doc.page > 1:
        canvas.setStrokeColor(BORDER); canvas.setLineWidth(0.5)
        canvas.line(MARGIN, 0.62 * inch, PAGE_W - MARGIN, 0.62 * inch)
        canvas.setFont('FreeSerif', 7.5); canvas.setFillColor(TEXT_MUTED)
        canvas.drawString(MARGIN, 0.46 * inch, "Ganita Manjari Gr 9 - Practice Book")
        canvas.drawRightString(PAGE_W - MARGIN, 0.46 * inch, str(doc.page))
        # header
        canvas.setFont('FreeSerif', 7.5); canvas.setFillColor(TEXT_MUTED)
        canvas.drawString(MARGIN, PAGE_H - 0.55 * inch, BOOK_TITLE)
        canvas.setStrokeColor(ACCENT); canvas.setLineWidth(1.2)
        canvas.line(MARGIN, PAGE_H - 0.63 * inch, PAGE_W - MARGIN, PAGE_H - 0.63 * inch)
    canvas.restoreState()

# ---------------- Helpers ----------------
def safe_keep_together(elements):
    total_h = 0
    try:
        for el in elements:
            w, h = el.wrap(AVAIL_W, PAGE_H)
            total_h += h
    except Exception:
        return list(elements)
    if total_h <= MAX_KEEP_HEIGHT:
        return [KeepTogether(elements)]
    elif len(elements) >= 2:
        return [KeepTogether(elements[:2])] + list(elements[2:])
    return list(elements)

def heading(text, level):
    key = 'h_' + hashlib.md5((str(level) + text).encode()).hexdigest()[:10]
    style = S['h1'] if level == 0 else S['h2']
    p = Paragraph('<a name="%s"/><b>%s</b>' % (key, text), style)
    p.bookmark_name = key
    p.bookmark_level = level
    p.bookmark_text = text.replace('&', '&')
    p.bookmark_key = key
    return p

def embed_image(path, max_width=None, max_height=None):
    if max_width is None: max_width = AVAIL_W * 0.92
    if max_height is None: max_height = PAGE_H * 0.32
    pil = PILImage.open(path)
    ow, oh = pil.size
    rw = max_width / ow if ow > max_width else 1.0
    rh = max_height / oh if oh > max_height else 1.0
    r = min(rw, rh)
    img = Image(path, width=ow * r, height=oh * r)
    img.hAlign = 'CENTER'
    return img

def make_table(headers, rows, ratios, font=9.5):
    hstyle = ParagraphStyle('th2', parent=S['thead'], fontSize=font + 0.2)
    cstyle = ParagraphStyle('tc2', parent=S['tcell'], fontSize=font, leading=font + 3.6)
    data = [[Paragraph('<b>%s</b>' % h, hstyle) for h in headers]]
    for row in rows:
        data.append([Paragraph(str(c), cstyle) for c in row])
    widths = [r * AVAIL_W for r in ratios]
    assert abs(sum(ratios) - 1.0) < 0.01, 'ratios must sum to 1'
    t = Table(data, colWidths=widths, hAlign='CENTER', repeatRows=1)
    style = [
        ('BACKGROUND', (0, 0), (-1, 0), TABLE_HEADER_COLOR),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('GRID', (0, 0), (-1, -1), 0.5, BORDER),
        ('LEFTPADDING', (0, 0), (-1, -1), 6),
        ('RIGHTPADDING', (0, 0), (-1, -1), 6),
        ('TOPPADDING', (0, 0), (-1, -1), 4.5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 4.5),
    ]
    for i in range(1, len(data)):
        style.append(('BACKGROUND', (0, i), (-1, i), TABLE_ROW_EVEN if i % 2 == 1 else TABLE_ROW_ODD))
    t.setStyle(TableStyle(style))
    return t

def callout(title, body):
    inner = [Paragraph('<b>%s</b>' % title, S['calloutT']),
             Paragraph(body, S['calloutB'])]
    t = Table([[inner]], colWidths=[AVAIL_W * 0.97], hAlign='CENTER')
    t.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), SECTION_BG),
        ('LINEBEFORE', (0, 0), (0, -1), 3, ACCENT),
        ('LEFTPADDING', (0, 0), (-1, -1), 10),
        ('RIGHTPADDING', (0, 0), (-1, -1), 8),
        ('TOPPADDING', (0, 0), (-1, -1), 7),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 7),
    ]))
    return [Spacer(1, 4), t, Spacer(1, 6)]

LEVEL_COLORS = {'Basic': ICON, 'Moderate': ACCENT, 'Difficult': SEM_WARNING,
                'High': ACCENT_2, 'HOTS': ACCENT_2, 'Challenge': ACCENT_2}

# ---------------- XML safety ----------------
import re as _re
_ALLOWED_TAG = _re.compile(r'<(/?)(?:super|sub|b|i|u|br|a\b|font\b|para\b)', _re.I)
def sanitize_text(t):
    """Escape stray '<' that do not open a legitimate ReportLab tag."""
    return _ALLOWED_TAG.sub(lambda m: m.group(0), t).replace('<', '&lt;') \
        if False else _re.sub(r'<(?!/?(?:super|sub|b|i|u|br|a|font)\b)', '&lt;', t)

def sanitize_blocks(blocks):
    out = []
    for blk in blocks:
        if isinstance(blk, tuple) and blk and isinstance(blk[-1], (dict, list)):
            payload = blk[-1]
            if isinstance(payload, dict):
                clean = {k: sanitize_text(v) if isinstance(v, str) else v for k, v in payload.items()}
                out.append(blk[:-1] + (clean,))
            else:  # list of strings (bullets/nums/steps/why)
                out.append(blk[:-1] + ([sanitize_text(x) if isinstance(x, str) else x for x in payload],))
        elif isinstance(blk, tuple):
            out.append(tuple(sanitize_text(x) if isinstance(x, str) else x for x in blk))
        else:
            out.append(blk)
    return out

# ---------------- Block renderer ----------------
def render_blocks(blocks, story):
    for blk in blocks:
        kind = blk[0]
        if kind == 'h1':
            story.append(CondPageBreak(H1_THRESHOLD))
            story.append(heading(blk[1], 0))
            story.append(HRFlowable(width='100%', color=ACCENT, thickness=1.6,
                                    spaceBefore=1, spaceAfter=10))
        elif kind == 'h2':
            story.append(CondPageBreak(70))
            story.append(heading(blk[1], 1))
        elif kind == 'h3':
            story.append(Paragraph('<b>%s</b>' % blk[1], S['h3']))
        elif kind == 'p':
            story.append(Paragraph(blk[1], S['body']))
        elif kind == 'pl':
            story.append(Paragraph(blk[1], S['bodyL']))
        elif kind == 'bullets':
            for it in blk[1]:
                story.append(Paragraph(it, S['bullet'], bulletText='\u2022'))
            story.append(Spacer(1, 4))
        elif kind == 'nums':
            for i, it in enumerate(blk[1], 1):
                story.append(Paragraph(it, S['bullet'], bulletText='%d.' % i))
            story.append(Spacer(1, 4))
        elif kind == 'callout':
            story.extend(callout(blk[1], blk[2]))
        elif kind == 'table':
            story.append(Spacer(1, 8))
            story.append(make_table(blk[1], blk[2], blk[3]))
            story.append(Spacer(1, 10))
        elif kind == 'img':
            path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'figs', blk[1])
            story.append(Spacer(1, 10))
            img = embed_image(path, max_height=blk[3] if len(blk) > 3 else PAGE_H * 0.30)
            cap = Paragraph(blk[2], S['caption'])
            story.extend(safe_keep_together([img, cap]))
            story.append(Spacer(1, 6))
        elif kind == 'q':
            story.extend(render_question(blk[1]))
        elif kind == 'mcq':
            story.extend(render_mcq(blk[1]))
        elif kind == 'pagebreak':
            story.append(PageBreak())
        elif kind == 'spacer':
            story.append(Spacer(1, blk[1]))
        elif kind == 'rule':
            story.append(Spacer(1, 4))
            story.append(HRFlowable(width='100%', color=BORDER, thickness=0.6,
                                    spaceBefore=2, spaceAfter=6))
        else:
            raise ValueError('unknown block: %s' % kind)

def render_question(q):
    out = []
    lv = q.get('level', 'Moderate')
    meta = "Q%d  \u00b7  %s  \u00b7  Concept: %s" % (q['n'], lv, q.get('concept', '-'))
    mp = Paragraph(meta, S['qmeta'])
    sp = Paragraph('<b>Q%d.</b> %s' % (q['n'], q['stem']), S['qstem'])
    sh = Paragraph('SOLUTION', S['solhead'])
    head = [mp, sp, sh]
    out.extend(safe_keep_together(head))
    for i, stp in enumerate(q['steps'], 1):
        out.append(Paragraph('<b>Step %d:</b> %s' % (i, stp), S['step']))
    for wn in q.get('why', []):
        out.append(Paragraph('<font color="#3681a6"><b>\u00bb Why this step?</b></font> %s' % wn, S['why']))
    out.append(Paragraph('<i><b>Hinglish:</b> %s</i>' % q['hinglish'], S['hinglish']))
    out.append(Paragraph('Answer: %s' % q['answer'], S['answer']))
    return out

def render_mcq(m):
    out = []
    lv = m.get('level', 'Normal')
    meta = "MCQ %d  \u00b7  %s  \u00b7  Concept: %s" % (m['n'], lv, m.get('concept', '-'))
    mp = Paragraph(meta, S['qmeta'])
    sp = Paragraph('<b>%d.</b> %s' % (m['n'], m['stem']), S['qstem'])
    opts = [Paragraph('<b>%s.</b> %s' % (chr(65 + i), o), S['opt']) for i, o in enumerate(m['options'])]
    out.extend(safe_keep_together([mp, sp] + opts))
    out.append(Paragraph('<b>Correct Answer: (%s)</b>' % m['ans'], S['solhead']))
    out.append(Paragraph(m['expl'], S['bodyL']))
    for k, v in sorted(m.get('traps', {}).items()):
        out.append(Paragraph('<font color="#b43a4e"><b>Why (%s) is wrong:</b></font> %s' % (k, v), S['why']))
    out.append(Paragraph('<i><b>Hinglish:</b> %s</i>' % m['hinglish'], S['hinglish']))
    return out

def build_pdf(blocks, out_path, toc=True):
    doc = TocDocTemplate(out_path, pagesize=A4,
                         leftMargin=MARGIN, rightMargin=MARGIN,
                         topMargin=0.95 * inch, bottomMargin=0.8 * inch,
                         title=BOOK_TITLE, author='Z.ai', creator='Z.ai',
                         subject='Advanced practice book with Hinglish teacher guide')
    story = []
    if toc:
        story.append(Paragraph('<b>Table of Contents</b>', S['tocTitle']))
        toc = TableOfContents()
        toc.levelStyles = [S['toc0'], S['toc1']]
        story.append(toc)
        story.append(PageBreak())
    render_blocks(sanitize_blocks(blocks), story)
    doc.multiBuild(story, onFirstPage=_footer, onLaterPages=_footer)
    return out_path
