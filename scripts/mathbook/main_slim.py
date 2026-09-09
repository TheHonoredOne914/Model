# -*- coding: utf-8 -*-
"""SLIM workbook build: cheat sheets + 20 best curated questions per chapter.
No MCQs, no grand revision - lean refined edition as requested."""
import sys, os, importlib
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from bookbuilder import build_pdf

def bank(specs):
    """Collect all question dicts from module:VAR specs, keyed by original n."""
    d = {}
    for spec in specs:
        mod, var = spec.split(':')
        m = importlib.import_module(mod)
        for b in getattr(m, var):
            if b[0] == 'q':
                d[b[1]['n']] = b[1]
    return d

def clean_cheat(blocks):
    """Drop stale 'Distribution of the 50/70 questions' paragraphs."""
    return [b for b in blocks if not (b[0] == 'p' and b[1].lstrip().startswith('Distribution of'))]

def picks(bankd, nums):
    out = []
    for i, n in enumerate(nums, 1):
        q = dict(bankd[n])
        q['n'] = i
        out.append(('q', q))
    return out

# ---------------- Chapter banks ----------------
B1 = bank(['ch1_b:CH1_Q1', 'ch1_c:CH1_Q2'])
B2 = bank(['ch2_b:CH2_Q1', 'ch2_c:CH2_Q2'])
B3 = bank(['ch3_b:CH3_Q1', 'ch3_c:CH3_Q2'])
B4 = bank(['ch4_b:CH4_Q1', 'ch4_c:CH4_Q2', 'ch4_d:CH4_Q3'])
B6 = bank(['ch6_b:CH6_Q1', 'ch6_c:CH6_Q2', 'ch6_d:CH6_Q3'])
B7 = bank(['ch7_b:CH7_Q1', 'ch7_c:CH7_Q2'])

from ch1_a import CH1_A
from ch2_a import CH2_A
from ch3_a import CH3_A
from ch4_a import CH4_A
from ch6_a import CH6_A
from ch7_a import CH7_A

SET_NOTE = ('Har question apne BOX me hai, uske turant baad uska boxed step-by-step '
            'solution. Pehle question ko khud solve karne ki koshish karo - jab atak jao '
            'tabhi solution dekho. Har step ke saath "Why this step?" diya hai, aur end me '
            'Hinglish note jo concept ko dil me basa dega.')

CH1 = clean_cheat(CH1_A) + [
    ('h2', '1.3 Solved Practice Set (20 Questions)'),
    ('p', SET_NOTE),
] + picks(B1, [1, 6, 7, 8, 9, 11, 13, 15, 18, 20, 21, 22, 24, 32, 33, 34, 36, 42, 44, 47])

CH2 = clean_cheat(CH2_A) + [
    ('h2', '2.3 Solved Practice Set (20 Questions)'),
    ('p', SET_NOTE),
] + picks(B2, [2, 5, 7, 8, 10, 11, 12, 13, 14, 18, 21, 23, 25, 27, 29, 31, 35, 38, 43, 46])

CH3 = clean_cheat(CH3_A) + [
    ('h2', '3.3 Solved Practice Set (20 Questions)'),
    ('p', SET_NOTE),
] + picks(B3, [1, 2, 3, 4, 8, 11, 13, 15, 16, 19, 21, 23, 25, 26, 28, 33, 34, 38, 41, 42])

CH4 = clean_cheat(CH4_A) + [
    ('h2', '4.3 Solved Practice Set (20 Questions)'),
    ('p', SET_NOTE),
] + picks(B4, [1, 2, 4, 6, 10, 13, 16, 17, 19, 24, 27, 30, 31, 34, 37, 44, 46, 48, 57, 65])

CH6 = clean_cheat(CH6_A) + [
    ('h2', '6.3 Solved Practice Set (20 Questions)'),
    ('p', SET_NOTE),
] + picks(B6, [2, 3, 5, 6, 9, 13, 14, 18, 19, 21, 22, 28, 32, 34, 35, 43, 46, 52, 63, 65])

CH7 = clean_cheat(CH7_A) + [
    ('h2', '7.3 Solved Practice Set (20 Questions)'),
    ('p', SET_NOTE),
] + picks(B7, [2, 4, 6, 7, 9, 11, 12, 14, 15, 17, 21, 23, 24, 25, 26, 31, 33, 40, 41, 46])

BLOCKS = (CH1 + [('pagebreak',)] + CH2 + [('pagebreak',)] + CH3 + [('pagebreak',)]
          + CH4 + [('pagebreak',)] + CH6 + [('pagebreak',)] + CH7)

if __name__ == '__main__':
    out = sys.argv[1] if len(sys.argv) > 1 else '/home/z/my-project/scripts/mathbook/book_slim.pdf'
    nq = sum(1 for b in BLOCKS if b[0] == 'q')
    print('blocks:', len(BLOCKS), '| questions:', nq)
    missing = [i for i, b in enumerate(BLOCKS) if b[0] == 'q' and b[1]['n'] is None]
    assert nq == 120, 'expected 120 questions, got %d' % nq
    build_pdf(BLOCKS, out)
    print('Built:', out)
