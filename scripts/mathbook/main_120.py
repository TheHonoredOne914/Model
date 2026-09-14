# -*- coding: utf-8 -*-
"""FINAL HEAVY WORKBOOK: per chapter = theory + cheat sheet + type map + speed tricks
+ EXACTLY 120 level-solved questions + 20 MCQs + 20 Choose-the-Correct. 6 chapters = 960 Q."""
import sys, os, importlib
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from bookbuilder import build_pdf
from main_full import (T1, T2, T3, T4, T6, T7, TRICK_HDR, WALK_Q, MCQ_NOTE)

def bank(specs):
    d = {}
    for spec in specs:
        mod, var = spec.split(':')
        m = importlib.import_module(mod)
        for b in getattr(m, var):
            if b[0] in ('q', 'mcq'):
                d[b[1]['n']] = b[1]
    return d

def clean_cheat(blocks):
    return [b for b in blocks if not (b[0] == 'p' and b[1].lstrip().startswith('Distribution of'))]

RANK = {'Basic': 0, 'Moderate': 1, 'Difficult': 2, 'High': 3, 'HOTS': 4}
BAND = {
    'Basic':    'Level 1 \u00b7 Warm-up Zone: basics and confidence',
    'Moderate': 'Level 2 \u00b7 Core Drills: book-level practice',
    'Difficult':'Level 3 \u00b7 Exam Power Zone: long and twisted',
    'High':     'Level 4 \u00b7 Boss Zone: advanced + HOTS (Olympiad-lite)',
    'HOTS':     'Level 4 \u00b7 Boss Zone: advanced + HOTS (Olympiad-lite)',
}

def all_q(bankd, figs=None):
    items = []
    for orig_n, q in bankd.items():
        q = dict(q)
        if figs and orig_n in figs:
            q['fig'] = figs[orig_n]
        items.append(q)
    items.sort(key=lambda q: RANK.get(q.get('level', 'Moderate'), 1))
    out = []
    for i, q in enumerate(items, 1):
        q['n'] = i
        out.append(('q', q))
    return out

def insert_bands(qblocks):
    out, last = [], None
    for blk in qblocks:
        lv = blk[1].get('level', 'Moderate')
        if lv != last:
            out.append(('h3', BAND.get(lv, lv) + ':'))
            last = lv
        out.append(blk)
    return out

def mcq_picks(bankd, nums, label='MCQ'):
    out = []
    for i, n in enumerate(nums, 1):
        m = dict(bankd[n])
        m['n'] = i
        m['label'] = label
        out.append(('mcq', m))
    return out

def tricks_blocks(ch, rows):
    return [('h2', '%d.3 Speed Tricks & Trap Alarms' % ch),
            ('p', 'Ye table tumhara "dekho aur maaro" radar hai - question ka trigger phrase '
                  'dikha, toh yahan ka trick fire karo. Inhe ratt lo, exam me sochna kam padega '
                  'aur speed double ho jayegi.'),
            ('table', TRICK_HDR, rows, [0.46, 0.54])]

WORKOUT_NOTE = ('Poora chapter ab ek hi ring mein: <b>120 questions</b>, chaar level zones mein '
                'banta hua. Warm-up se shuru karo, Boss Zone tak pahuncho. Har question ke turant '
                'baad boxed step-by-step solution hai - pehle khud try karo, atako toh solution dekho, '
                'aur "Why this step?" + Hinglish note se logic pakka karo. Agar in 120 ko solve kar '
                'liya toh is chapter ka koi bhi twisted question tumhe nahi rok payega.')

CTC_NOTE = ('Doosra rapid round - har MCQ ka style: statement padho, correct option turant chuno. '
            'Ye round theory, definitions aur quick solving ko test karta hai. Answer strip ke neeche '
            'har galat option ka "Why wrong" bhi hai - taki exam ka trap tumhe na phasaye.')

def build_ch(ch, cheat, trows, qbank, figs, mcq_bank, mcq_nums, ctc_nums):
    qs = insert_bands(all_q(qbank, figs))
    ms = mcq_picks(mcq_bank, mcq_nums, 'MCQ')
    cs = mcq_picks(mcq_bank, ctc_nums, 'CTC')
    return (clean_cheat(cheat)
            + tricks_blocks(ch, trows)
            + [('h2', '%d.4 The 120-Question Workout' % ch), ('p', WORKOUT_NOTE)] + qs
            + [('h2', '%d.5 Rapid MCQs: Choose the Correct Option (20)' % ch), ('p', MCQ_NOTE)] + ms
            + [('h2', '%d.6 Choose the Correct Round: Theory & Speed (20)' % ch), ('p', CTC_NOTE)] + cs)

# ---------------- banks (existing + new = 120 per chapter) ----------------
Q1 = bank(['ch1_b:CH1_Q1', 'ch1_c:CH1_Q2', 'ch1_g1:CH1_G1', 'ch1_g2:CH1_G2'])
Q1[5] = WALK_Q
M1 = bank(['ch1_d:CH1_M1', 'ch1_e:CH1_M2'])

Q2 = bank(['ch2_b:CH2_Q1', 'ch2_c:CH2_Q2', 'ch2_g1:CH2_G1', 'ch2_g2:CH2_G2'])
M2 = bank(['ch2_d:CH2_M1', 'ch2_e:CH2_M2'])

Q3 = bank(['ch3_b:CH3_Q1', 'ch3_c:CH3_Q2', 'ch3_g1:CH3_G1', 'ch3_g2:CH3_G2'])
M3 = bank(['ch3_d:CH3_M1', 'ch3_e:CH3_M2'])

Q4 = bank(['ch4_b:CH4_Q1', 'ch4_c:CH4_Q2', 'ch4_d:CH4_Q3', 'ch4_h1:CH4_H1', 'ch4_h2:CH4_H2'])
M4 = bank(['ch4_e:CH4_M1', 'ch4_f:CH4_M2'])

Q6 = bank(['ch6_b:CH6_Q1', 'ch6_c:CH6_Q2', 'ch6_d:CH6_Q3', 'ch6_h1:CH6_H1', 'ch6_h2:CH6_H2'])
M6 = bank(['ch6_e:CH6_M1', 'ch6_f:CH6_M2'])

Q7 = bank(['ch7_b:CH7_Q1', 'ch7_c:CH7_Q2', 'ch7_g1:CH7_G1', 'ch7_g2:CH7_G2'])
M7 = bank(['ch7_d:CH7_M1', 'ch7_e:CH7_M2'])

from ch1_a import CH1_A
from ch2_a import CH2_A
from ch3_a import CH3_A
from ch4_a import CH4_A
from ch6_a import CH6_A
from ch7_a import CH7_A

CH1 = build_ch(1, CH1_A, T1, Q1, {47: 'f1d_robot.png'}, M1,
               [1, 3, 5, 8, 9, 11, 15, 17, 18, 19, 21, 23, 24, 32, 33, 34, 43, 45, 46, 60],
               [2, 4, 6, 7, 10, 12, 13, 14, 16, 20, 22, 25, 26, 27, 28, 29, 30, 35, 38, 41])
CH2 = build_ch(2, CH2_A, T2, Q2, {34: 'f2d_lines.png'}, M2,
               [1, 2, 3, 5, 7, 8, 11, 17, 18, 19, 21, 22, 26, 31, 33, 41, 42, 43, 51, 55],
               [4, 6, 9, 10, 12, 13, 14, 15, 16, 20, 23, 24, 25, 27, 29, 30, 32, 34, 35, 36])
CH3 = build_ch(3, CH3_A, T3, Q3, {41: 'f3_spiral.png'}, M3,
               [1, 2, 3, 4, 5, 7, 9, 11, 12, 14, 16, 19, 22, 24, 30, 38, 43, 47, 49, 51],
               [6, 8, 10, 13, 15, 17, 18, 20, 21, 23, 25, 26, 27, 28, 29, 31, 32, 34, 35, 36])
CH4 = build_ch(4, CH4_A, T4, Q4, {}, M4,
               [3, 6, 7, 8, 9, 12, 13, 15, 18, 19, 23, 28, 34, 37, 38, 42, 50, 59, 72, 80],
               [1, 2, 4, 5, 10, 11, 14, 16, 17, 20, 21, 22, 24, 25, 26, 27, 29, 30, 31, 32])
CH6 = build_ch(6, CH6_A, T6, Q6, {28: 'f6d_quad.png', 52: 'f6d_track.png', 63: 'f6d_goat.png'}, M6,
               [1, 3, 4, 6, 7, 8, 10, 12, 13, 14, 16, 19, 29, 30, 31, 34, 39, 54, 64, 72],
               [2, 5, 9, 11, 15, 17, 18, 20, 21, 22, 23, 24, 25, 26, 27, 28, 32, 33, 35, 36])
CH7 = build_ch(7, CH7_A, T7, Q7, {25: 'f7d_dart.png', 27: 'f7d_spinner.png'}, M7,
               [2, 4, 5, 7, 8, 10, 12, 13, 15, 18, 19, 24, 28, 32, 35, 41, 43, 44, 50, 57],
               [1, 3, 6, 9, 11, 14, 16, 17, 20, 21, 22, 23, 25, 26, 27, 29, 30, 31, 33, 34])

BLOCKS = (CH1 + [('pagebreak',)] + CH2 + [('pagebreak',)] + CH3 + [('pagebreak',)]
          + CH4 + [('pagebreak',)] + CH6 + [('pagebreak',)] + CH7)

if __name__ == '__main__':
    out = sys.argv[1] if len(sys.argv) > 1 else '/home/z/my-project/scripts/mathbook/book_final.pdf'
    nq = sum(1 for b in BLOCKS if b[0] == 'q')
    nm = sum(1 for b in BLOCKS if b[0] == 'mcq' and b[1].get('label', 'MCQ') == 'MCQ')
    nc = sum(1 for b in BLOCKS if b[0] == 'mcq' and b[1].get('label') == 'CTC')
    nf = sum(1 for b in BLOCKS if b[0] == 'q' and b[1].get('fig'))
    print('blocks:', len(BLOCKS), '| solved Qs:', nq, '| MCQ:', nm, '| CTC:', nc, '| diagram Qs:', nf)
    assert nq == 720, 'solved questions off: %d' % nq
    assert nm == 120, 'MCQ off: %d' % nm
    assert nc == 120, 'CTC off: %d' % nc
    # per-chapter sanity: each chapter must hold exactly 120 q + 20 + 20
    chap, cnt = 0, 0
    for b in BLOCKS:
        if b[0] == 'h1':
            if cnt:
                assert cnt == 160, 'chapter %d total off: %d' % (chap, cnt)
            chap += 1
            cnt = 0
        elif b[0] in ('q', 'mcq'):
            cnt += 1
    assert cnt == 160, 'last chapter total off: %d' % cnt
    assert chap == 6, 'chapters: %d' % chap
    print('PER-CHAPTER COUNTS OK (160 = 120 + 20 + 20 each)')
    build_pdf(BLOCKS, out)
    print('Built:', out)
