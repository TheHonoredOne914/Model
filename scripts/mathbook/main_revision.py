# -*- coding: utf-8 -*-
"""FINAL REVISION SHEET: 7 chapters x [formulas + checklist + tricks + IMP Qs + rapid MCQs]
= 75 imp questions + 97 rapid MCQs. One-night 80/80 power book."""
import sys, os, importlib
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import bookbuilder
from bookbuilder import build_pdf
from main_full import T1, T2, T3, T4, T6, T7, TRICK_HDR, WALK_Q
from main_ch8 import T8
from rev_a import (PLAN_TITLE, PLAN_P, PLAN_TABLE, FORM_HDR, IMP_NOTE, MCQR_NOTE,
                   CH1_TITLE, CH1_INTRO, CH1_FORMULAS, CH1_CHECKLIST,
                   CH2_TITLE, CH2_INTRO, CH2_FORMULAS, CH2_CHECKLIST,
                   CH3_TITLE, CH3_INTRO, CH3_FORMULAS, CH3_CHECKLIST)
from rev_b import (CH4_TITLE, CH4_INTRO, CH4_FORMULAS, CH4_CHECKLIST,
                   CH6_TITLE, CH6_INTRO, CH6_FORMULAS, CH6_CHECKLIST)
from rev_c import (CH7_TITLE, CH7_INTRO, CH7_FORMULAS, CH7_CHECKLIST,
                   CH8_TITLE, CH8_INTRO, CH8_FORMULAS, CH8_CHECKLIST,
                   FINAL_TITLE, FINAL_P, FINAL_FORMULAS, FINAL_RULES)

# footer/header label override for this edition
bookbuilder.BOOK_TITLE = 'Ganita Manjari Gr 9 - FINAL REVISION SHEET (80/80 Edition)'

def bank(specs):
    d = {}
    for spec in specs:
        mod, var = spec.split(':')
        m = importlib.import_module(mod)
        for b in getattr(m, var):
            if b[0] in ('q', 'mcq'):
                d[b[1]['n']] = b[1]
    return d

def imp_picks(bankd, nums, figs=None):
    out = []
    for i, n in enumerate(nums, 1):
        q = dict(bankd[n])
        q['n'] = i
        if figs and n in figs:
            q['fig'] = figs[n]
        out.append(('iq', q))
    return out

def mcq_picks(bankd, nums):
    out = []
    for i, n in enumerate(nums, 1):
        m = dict(bankd[n])
        m['n'] = i
        out.append(('mcqr', m))
    return out

FORMULA_NOTE = ('Har formula ke saath uska <b>easy matlab</b> aur ek <b>tiny example</b> hai - '
                'formula akela kabhi mat rattro, example ke saath yaad karo. Exam mein pehle 2 '
                'second sochho kaunsa formula fire karna hai, phir likho.')

# ---------------- banks ----------------
Q1 = bank(['ch1_b:CH1_Q1', 'ch1_c:CH1_Q2']);  M1 = bank(['ch1_d:CH1_M1', 'ch1_e:CH1_M2'])
Q2 = bank(['ch2_b:CH2_Q1', 'ch2_c:CH2_Q2']);  M2 = bank(['ch2_d:CH2_M1', 'ch2_e:CH2_M2'])
Q3 = bank(['ch3_b:CH3_Q1', 'ch3_c:CH3_Q2']);  M3 = bank(['ch3_d:CH3_M1', 'ch3_e:CH3_M2'])
Q4 = bank(['ch4_b:CH4_Q1', 'ch4_c:CH4_Q2', 'ch4_d:CH4_Q3']); M4 = bank(['ch4_e:CH4_M1', 'ch4_f:CH4_M2'])
Q6 = bank(['ch6_b:CH6_Q1', 'ch6_c:CH6_Q2', 'ch6_d:CH6_Q3']); M6 = bank(['ch6_e:CH6_M1', 'ch6_f:CH6_M2'])
Q7 = bank(['ch7_b:CH7_Q1', 'ch7_c:CH7_Q2']);  M7 = bank(['ch7_d:CH7_M1', 'ch7_e:CH7_M2'])
Q8 = bank(['ch8_b1:CH8_B1', 'ch8_b2:CH8_B2', 'ch8_b3:CH8_B3',
           'ch8_b4:CH8_B4', 'ch8_b5:CH8_B5', 'ch8_b6:CH8_B6'])
M8 = bank(['ch8_e1:CH8_E1', 'ch8_e2:CH8_E2'])
Q1[5] = WALK_Q   # delivery-boy figure question replaces abstract pick

# ---------------- picks ----------------
IMP1 = imp_picks(Q1, [5, 8, 11, 14, 17, 22, 24, 32, 33, 47], figs={47: 'f1d_robot.png'})
IMP2 = imp_picks(Q2, [8, 10, 12, 13, 14, 21, 23, 25, 34, 43], figs={34: 'f2d_lines.png'})
IMP3 = imp_picks(Q3, [2, 3, 8, 11, 13, 15, 16, 17, 25, 38])
IMP4 = imp_picks(Q4, [4, 6, 8, 16, 19, 24, 27, 36, 39, 42, 47, 53])
IMP6 = imp_picks(Q6, [6, 9, 10, 14, 19, 21, 22, 26, 35, 52, 54, 63],
                 figs={52: 'f6d_track.png', 63: 'f6d_goat.png'})
IMP7 = imp_picks(Q7, [4, 6, 7, 10, 11, 15, 16, 23, 25, 33], figs={25: 'f7d_dart.png'})
IMP8 = imp_picks(Q8, [10, 24, 28, 33, 42, 45, 61, 77, 86, 96, 105])

MCQ1 = mcq_picks(M1, [1, 3, 5, 8, 9, 11, 15, 17, 18, 19, 21, 23, 24, 43])
MCQ2 = mcq_picks(M2, [1, 2, 3, 5, 7, 8, 11, 17, 18, 19, 21, 22, 26, 41])
MCQ3 = mcq_picks(M3, [1, 2, 3, 4, 5, 7, 9, 10, 11, 12, 13, 16, 20, 30])
MCQ4 = mcq_picks(M4, [3, 6, 7, 8, 9, 12, 13, 15, 18, 19, 23, 28, 34, 42, 72])
MCQ6 = mcq_picks(M6, [1, 3, 4, 6, 7, 8, 10, 12, 13, 14, 16, 19, 29, 34, 64])
MCQ7 = mcq_picks(M7, [2, 4, 5, 7, 8, 10, 12, 13, 15, 18, 24, 35, 43])
MCQ8 = mcq_picks(M8, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])

def chapter(num, title, intro, formulas, checklist, trows, imps, mcqs):
    return ([('h1', title), ('callout', 'Ek line mein chapter', intro),
             ('h2', '%d.1 Saare Formulas - Easy Bhasha Mein' % num), ('p', FORMULA_NOTE),
             ('table', FORM_HDR, formulas, [0.30, 0.40, 0.30]),
             ('h2', '%d.2 Concept Checklist - Ye Sab Aana Hai' % num),
             ('bullets', checklist),
             ('h2', '%d.3 Speed Tricks & Trap Alarms' % num),
             ('table', TRICK_HDR, trows, [0.46, 0.54]),
             ('h2', '%d.4 Most Important Questions (%d)' % (num, len(imps))),
             ('p', IMP_NOTE)] + imps
            + [('h2', '%d.5 Rapid-Fire MCQs (%d)' % (num, len(mcqs))), ('p', MCQR_NOTE)] + mcqs)

CH1 = chapter(1, CH1_TITLE, CH1_INTRO, CH1_FORMULAS, CH1_CHECKLIST, T1, IMP1, MCQ1)
CH2 = chapter(2, CH2_TITLE, CH2_INTRO, CH2_FORMULAS, CH2_CHECKLIST, T2, IMP2, MCQ2)
CH3 = chapter(3, CH3_TITLE, CH3_INTRO, CH3_FORMULAS, CH3_CHECKLIST, T3, IMP3, MCQ3)
CH4 = chapter(4, CH4_TITLE, CH4_INTRO, CH4_FORMULAS, CH4_CHECKLIST, T4, IMP4, MCQ4)
CH6 = chapter(6, CH6_TITLE, CH6_INTRO, CH6_FORMULAS, CH6_CHECKLIST, T6, IMP6, MCQ6)
CH7 = chapter(7, CH7_TITLE, CH7_INTRO, CH7_FORMULAS, CH7_CHECKLIST, T7, IMP7, MCQ7)
CH8 = chapter(8, CH8_TITLE, CH8_INTRO, CH8_FORMULAS, CH8_CHECKLIST, T8, IMP8, MCQ8)

FRONT = [('h1', PLAN_TITLE), ('p', PLAN_P),
         ('table', ['Round', 'Kya karna hai', 'Goal'], PLAN_TABLE, [0.16, 0.34, 0.50]),
         ('callout', 'Golden rule', 'Pehle KHUD try karo, phir solution dekho - ye 4 ghante tumhe '
          'exam hall ka sabse confident banda bana denge. Star system: jo bhi galat ho, aage '
          '<b>star</b> lagao aur subah sirf starred cheezein dohrao.')]

FINAL = [('pagebreak',), ('h1', FINAL_TITLE), ('p', FINAL_P),
         ('table', ['Killer formula', 'Ch', 'Kahan kaam aayega'], FINAL_FORMULAS, [0.42, 0.08, 0.50]),
         ('h2', 'Exam Hall ke 8 Rules'), ('bullets', FINAL_RULES),
         ('h2', 'Subah ka 10-Minute Drill (Exam se theek pehle)'),
         ('nums', [
             'Exam Morning Power Page ke 12 formulas <b>bol ke ek baar likho</b> - haath se '
             'likhne se muscle memory banti hai.',
             'Apne <b>starred MCQs aur galtiyan</b> dohrao - sirf wahi, teen minute. Naya kuch '
             'nahi, sirf apni mistakes.',
             'Trap alarms zor se bolo: (a&minus;b)<super>2</super> ka last term PLUS, HT &ne; TH, '
             'without replacement mein denominator shrink, &pi; ka sahi choice.',
             'Triples aur squares ghoshit karo: 3-4-5, 5-12-13, 8-15-17, 7-24-25; squares '
             '11<super>2</super> = 121 se 20<super>2</super> = 400 tak.',
             'Geometry formulas bol ke revise karo - Heron ka s, sector ka &theta;/360, ring ka '
             '(R+r)(R&minus;r). Awaaz nikalne se yaad pakka hota hai.',
             'Gehri saans lo aur bolo: <b>"Maine 172 solved examples kiye hain - paper bas unka '
             'naya version hai."</b> Ab jaao, 80/80 tumhara hai.',
         ]),
         ('callout', 'Aakhri baat', 'Tumhare paas poora syllabus, saare tricks aur 172 solved '
          'examples hain. Kal bas wahi dikhao jo tumne practice kiya hai. Sheet tumhare saath '
          'hai, formula tumhare dimaag mein - ab sirf likhne ki deri hai. All the best - '
          '<b>80/80 is yours.</b>')]

BLOCKS = (FRONT + [('pagebreak',)] + CH1 + [('pagebreak',)] + CH2 + [('pagebreak',)] + CH3
          + [('pagebreak',)] + CH4 + [('pagebreak',)] + CH6 + [('pagebreak',)] + CH7
          + [('pagebreak',)] + CH8 + FINAL)

if __name__ == '__main__':
    out = sys.argv[1] if len(sys.argv) > 1 else '/home/z/my-project/scripts/mathbook/book_revision.pdf'
    niq = sum(1 for b in BLOCKS if b[0] == 'iq')
    nm = sum(1 for b in BLOCKS if b[0] == 'mcqr')
    nf = sum(1 for b in BLOCKS if b[0] == 'iq' and b[1].get('fig'))
    print('blocks:', len(BLOCKS), '| IMP Qs:', niq, '| rapid MCQs:', nm, '| figure Qs:', nf)
    assert niq == 75, 'imp questions off: %d' % niq
    assert nm == 97, 'MCQs off: %d' % nm
    assert nf >= 7, 'figure questions off: %d' % nf
    # per-chapter sanity
    chap, cq, cm = 0, 0, 0
    for b in BLOCKS:
        if b[0] == 'h1' and not b[1].startswith(('How to', 'Exam Morning')):
            if cq:
                assert cq >= 10 and cm >= 10, 'chapter %d thin: q=%d mcq=%d' % (chap, cq, cm)
            chap += 1; cq = 0; cm = 0
        elif b[0] == 'iq':
            cq += 1
        elif b[0] == 'mcqr':
            cm += 1
    assert cq >= 10 and cm >= 10, 'last chapter thin'
    assert chap == 7, 'chapters: %d' % chap
    # MCQ sanity: 4 options, valid answer
    for b in BLOCKS:
        if b[0] == 'mcqr':
            m = b[1]
            assert len(m['options']) == 4, 'options off at %d' % m['n']
            assert m['ans'] in 'ABCD', 'ans off'
    # figures exist
    figdir = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'figs')
    for b in BLOCKS:
        if b[0] == 'iq' and b[1].get('fig'):
            assert os.path.exists(os.path.join(figdir, b[1]['fig'])), 'missing fig %s' % b[1]['fig']
    print('ALL COUNTS OK: 7 chapters | 75 IMP Qs | 97 MCQs | %d figure Qs' % nf)
    build_pdf(BLOCKS, out)
    print('Built:', out)
