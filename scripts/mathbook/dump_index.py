# -*- coding: utf-8 -*-
"""Dump compact index of all question banks + cheat-sheet structures for curation."""
import sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

Q_BANKS = [
    ('ch1', ['ch1_b:CH1_Q1', 'ch1_c:CH1_Q2']),
    ('ch2', ['ch2_b:CH2_Q1', 'ch2_c:CH2_Q2']),
    ('ch3', ['ch3_b:CH3_Q1', 'ch3_c:CH3_Q2']),
    ('ch4', ['ch4_b:CH4_Q1', 'ch4_c:CH4_Q2', 'ch4_d:CH4_Q3']),
    ('ch6', ['ch6_b:CH6_Q1', 'ch6_c:CH6_Q2', 'ch6_d:CH6_Q3']),
    ('ch7', ['ch7_b:CH7_Q1', 'ch7_c:CH7_Q2']),
    ('gr',  ['gr_c1:GR_C1', 'gr_c2:GR_C2']),
]

import importlib

print('=' * 30, 'QUESTION BANKS', '=' * 30)
for chap, banks in Q_BANKS:
    print('\n### %s ###' % chap.upper())
    for spec in banks:
        mod, var = spec.split(':')
        m = importlib.import_module(mod)
        blocks = getattr(m, var)
        qs = [b[1] for b in blocks if b[0] == 'q']
        print('-- %s (%d questions)' % (spec, len(qs)))
        for q in qs:
            stem = q['stem'].replace('\n', ' ')
            # strip reportlab tags for readability
            for tg in ('<b>', '</b>', '<i>', '</i>', '<super>', '</super>', '<sub>', '</sub>'):
                stem = stem.replace(tg, '')
            print('Q%-4d|%-9s|%-28s|%s' % (q['n'], q.get('level', '?')[:9], q.get('concept', '-')[:28], stem[:95]))

print('\n' + '=' * 30, 'CHEAT SHEETS (A modules)', '=' * 30)
A_MODULES = ['ch1_a:CH1_A', 'ch2_a:CH2_A', 'ch3_a:CH3_A', 'ch4_a:CH4_A', 'ch6_a:CH6_A', 'ch7_a:CH7_A']
for spec in A_MODULES:
    mod, var = spec.split(':')
    m = importlib.import_module(mod)
    blocks = getattr(m, var)
    print('\n-- %s (%d blocks)' % (spec, len(blocks)))
    for b in blocks:
        k = b[0]
        if k in ('h1', 'h2', 'h3'):
            print('  %-6s %s' % (k, b[1][:80]))
        elif k == 'callout':
            print('  %-6s %s || %s' % (k, b[1][:40], b[2][:70]))
        elif k == 'table':
            hdrs = '|'.join(str(h) for h in b[1])[:70]
            print('  %-6s [%d rows] %s' % (k, len(b[2]), hdrs))
        elif k == 'img':
            print('  %-6s %s' % (k, b[1]))
        elif k == 'p':
            t = b[1]
            for tg in ('<b>', '</b>', '<i>', '</i>'):
                t = t.replace(tg, '')
            print('  %-6s %s' % (k, t[:80]))
        else:
            print('  %-6s' % k)
