# -*- coding: utf-8 -*-
"""Standalone Chapter 8 workbook: theory + cheat sheet + type map + speed tricks
+ EXACTLY 120 level-solved questions + 20 MCQs + 20 Choose-the-Correct."""
import sys, os, importlib
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from bookbuilder import build_pdf

def bank(specs):
    d = {}
    for spec in specs:
        mod, var = spec.split(':')
        m = importlib.import_module(mod)
        for b in getattr(m, var):
            if b[0] in ('q', 'mcq'):
                d[b[1]['n']] = b[1]
    return d

RANK = {'Basic': 0, 'Moderate': 1, 'Difficult': 2, 'High': 3, 'HOTS': 4}
BAND = {
    'Basic':    'Level 1 \u00b7 Warm-up Zone: basics and confidence',
    'Moderate': 'Level 2 \u00b7 Core Drills: book-level practice',
    'Difficult':'Level 3 \u00b7 Exam Power Zone: long and twisted',
    'High':     'Level 4 \u00b7 Boss Zone: advanced + HOTS (Olympiad-lite)',
    'HOTS':     'Level 4 \u00b7 Boss Zone: advanced + HOTS (Olympiad-lite)',
}

def all_q(bankd):
    items = [dict(q) for q in bankd.values()]
    items.sort(key=lambda q: RANK.get(q.get('level', 'Moderate'), 1))
    out = []
    for i, q in enumerate(items, 1):
        q['n'] = i
        out.append(('q', q))
    return out

def insert_bands(qblocks):
    out, last = [], None
    for blk in qblocks:
        band = BAND.get(blk[1].get('level', 'Moderate'), '')
        if band != last:
            out.append(('h3', band + ':'))
            last = band
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

TRICK_HDR = ['Instant trick', 'Fire it when...']
T8 = [
 ["Constant +/- between terms? It is an AP: d = t<sub>2</sub> - t<sub>1</sub>, t<sub>n</sub> = a + (n - 1)d. 10th term = a + 9d",
  "'Each time 5 more', fixed fee + per-km charges, yearly increments, row/seat counts"],
 ["Constant x or divide between terms? It is a GP: r = t<sub>2</sub>/t<sub>1</sub>, t<sub>n</sub> = ar<super>n-1</super>. t<sub>10</sub> of 3, 6, 12 = 3 x 2<super>9</super> = 1536",
  "'Doubles', 'halves', '3/4 of previous height', '10% growth', 'splits into 3'"],
 ["'Is k a term?' - solve t<sub>n</sub> = k. n a natural number = YES at position n; n fractional = NO",
  "'Is 100 a term?', 'which term is 607?', 'prove 461 is not a term'"],
 ["Two term-facts given? Two equations: a + (n - 1)d = value (AP) or ar<super>k</super> = value (GP). Subtract / divide them",
  "'3rd term is 12 and 50th is 106', 't<sub>11</sub> = 38, t<sub>16</sub> = 73', 't<sub>2</sub> = 9, t<sub>5</sub> = 243'"],
 ["Sums: 1 + ... + n = n(n + 1)/2. Range k + ... + m = S<sub>m</sub> - S<sub>k-1</sub>, or (first + last)/2 x count",
  "'Total marbles', 'sum of all multiples of 3 up to 99', '25 + 26 + ... + 58'"],
 ["Real-life GP: the exponent counts the doublings / stages / bounces. Sierpinski starts at Stage 0, so count = 3<super>n</super> there",
  "'Bacteria double every hour', 'bounces to 3/4', 'Stage 6 of the fractal', 'folded 20 times'"],
 ["Graph fingerprint: AP points lie on a straight line of slope d; GP points bend on a steepening curve (r > 1) or melt to 0 (0 < r < 1)",
  "'Do the points lie on a line?', 'what shape does the plot make?', 'sketch the growth'"],
]

WORKOUT_NOTE = ('Poora chapter ab ek hi ring mein: <b>120 questions</b>, chaar level zones mein '
                'banta hua. Warm-up se shuru karo, Boss Zone tak pahuncho. Har question ke turant '
                'baad boxed step-by-step solution hai - pehle khud try karo, atako toh solution dekho, '
                'aur "Why this step?" + Hinglish note se logic pakka karo. Agar in 120 ko solve kar '
                'liya toh is chapter ka koi bhi twisted question tumhe nahi rok payega.')

MCQ_NOTE = ('Rapid-fire round: 4 options, ek hi correct. Pehle khud choose karo, phir colored Answer '
            'strip se check karo. Har galat option ka "Why wrong" bhi diya hai - taki exam me wahi trap '
            'tumhe na phasaye.')

CTC_NOTE = ('Doosra rapid round - har MCQ ka style: statement padho, correct option turant chuno. '
            'Ye round theory, definitions aur quick solving ko test karta hai. Answer strip ke neeche '
            'har galat option ka "Why wrong" bhi hai - taki exam ka trap tumhe na phasaye.')

# ---------------- banks ----------------
Q8 = bank(['ch8_b1:CH8_B1', 'ch8_b2:CH8_B2', 'ch8_b3:CH8_B3',
           'ch8_b4:CH8_B4', 'ch8_b5:CH8_B5', 'ch8_b6:CH8_B6'])
M8 = bank(['ch8_e1:CH8_E1', 'ch8_e2:CH8_E2'])

from ch8_a import CH8_A

MCQ_NUMS = list(range(1, 21))
CTC_NUMS = list(range(21, 41))

qs = insert_bands(all_q(Q8))
ms = mcq_picks(M8, MCQ_NUMS, 'MCQ')
cs = mcq_picks(M8, CTC_NUMS, 'CTC')

BLOCKS = (CH8_A
          + [('h2', '8.3 Speed Tricks & Trap Alarms'),
             ('p', 'Ye table tumhara "dekho aur maaro" radar hai - question ka trigger phrase '
                   'dikha, toh yahan ka trick fire karo. Inhe ratt lo, exam me sochna kam padega '
                   'aur speed double ho jayegi.'),
             ('table', TRICK_HDR, T8, [0.46, 0.54])]
          + [('h2', '8.4 The 120-Question Workout'), ('p', WORKOUT_NOTE)] + qs
          + [('h2', '8.5 Rapid MCQs: Choose the Correct Option (20)'), ('p', MCQ_NOTE)] + ms
          + [('h2', '8.6 Choose the Correct Round: Theory & Speed (20)'), ('p', CTC_NOTE)] + cs)

if __name__ == '__main__':
    out = sys.argv[1] if len(sys.argv) > 1 else '/home/z/my-project/scripts/mathbook/book_ch8.pdf'
    nq = sum(1 for b in BLOCKS if b[0] == 'q')
    nm = sum(1 for b in BLOCKS if b[0] == 'mcq' and b[1].get('label', 'MCQ') == 'MCQ')
    nc = sum(1 for b in BLOCKS if b[0] == 'mcq' and b[1].get('label') == 'CTC')
    nf = sum(1 for b in BLOCKS if b[0] == 'q' and b[1].get('fig'))
    print('blocks:', len(BLOCKS), '| solved Qs:', nq, '| MCQ:', nm, '| CTC:', nc, '| diagram Qs:', nf)
    assert nq == 120, 'solved questions off: %d' % nq
    assert nm == 20, 'MCQ off: %d' % nm
    assert nc == 20, 'CTC off: %d' % nc
    # level distribution check
    from collections import Counter
    lv = Counter(q[1]['level'] for q in BLOCKS if q[0] == 'q')
    print('levels:', dict(lv))
    assert lv['Basic'] == 32 and lv['Moderate'] == 44 and lv['Difficult'] == 28 \
        and lv['High'] == 12 and lv['HOTS'] == 4, 'level mix off: %s' % lv
    # uniqueness of question numbers
    ns = [q[1]['n'] for q in BLOCKS if q[0] == 'q']
    assert len(set(ns)) == 120, 'duplicate question numbers'
    # mcq sanity: 4 options, valid answer letter, traps subset
    for b in BLOCKS:
        if b[0] == 'mcq':
            m = b[1]
            assert len(m['options']) == 4, 'options off at %s' % m.get('label')
            assert m['ans'] in 'ABCD', 'ans off at %s%d' % (m.get('label'), m['n'])
            for k in m.get('traps', {}):
                assert k in 'ABCD', 'trap key off: %s' % k
    # figures exist
    figdir = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'figs')
    for b in BLOCKS:
        if b[0] == 'q' and b[1].get('fig'):
            assert os.path.exists(os.path.join(figdir, b[1]['fig'])), 'missing fig %s' % b[1]['fig']
    print('ALL COUNTS OK: 120 + 20 + 20 | levels 32/44/28/12+4 | figs embedded')
    build_pdf(BLOCKS, out)
    print('Built:', out)
