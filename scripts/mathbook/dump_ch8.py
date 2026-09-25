# -*- coding: utf-8 -*-
"""Dump ch8 question stems + MCQs for revision-sheet curation."""
import sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

def bank(specs):
    d = {}
    for spec in specs:
        mod, var = spec.split(':')
        m = __import__(mod)
        for b in getattr(m, var):
            if b[0] in ('q', 'mcq'):
                d[b[1]['n']] = b[1]
    return d

Q8 = bank(['ch8_b1:CH8_B1', 'ch8_b2:CH8_B2', 'ch8_b3:CH8_B3',
           'ch8_b4:CH8_B4', 'ch8_b5:CH8_B5', 'ch8_b6:CH8_B6'])
M8 = bank(['ch8_e1:CH8_E1', 'ch8_e2:CH8_E2'])

print('===== CH8 SOLVED Qs =====')
for n in sorted(Q8):
    q = Q8[n]
    print('Q%-4d|%-9s|%-28s|%s' % (n, q.get('level', ''), q.get('concept', '')[:28],
                                   q['stem'][:110].replace('\n', ' ')))
    print('      ans: %s' % q.get('answer', '')[:90])

print()
print('===== CH8 MCQs (e1, 1-20) =====')
for n in sorted(M8):
    if n > 24:
        break
    m = M8[n]
    print('M%-4d|%-9s|ans(%s)|%s' % (n, m.get('level', ''), m['ans'],
                                     m['stem'][:100].replace('\n', ' ')))
    print('      expl: %s' % m.get('expl', '')[:90])
