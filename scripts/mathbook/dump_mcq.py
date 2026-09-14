# -*- coding: utf-8 -*-
"""Dump compact index of all MCQ banks for curation."""
import sys, os, importlib
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

MCQ_BANKS = [
    ('ch1', ['ch1_d:CH1_M1', 'ch1_e:CH1_M2']),
    ('ch2', ['ch2_d:CH2_M1', 'ch2_e:CH2_M2']),
    ('ch3', ['ch3_d:CH3_M1', 'ch3_e:CH3_M2']),
    ('ch4', ['ch4_e:CH4_M1', 'ch4_f:CH4_M2']),
    ('ch6', ['ch6_e:CH6_M1', 'ch6_f:CH6_M2']),
    ('ch7', ['ch7_d:CH7_M1', 'ch7_e:CH7_M2']),
]

for chap, banks in MCQ_BANKS:
    print('\n### %s ###' % chap.upper())
    for spec in banks:
        mod, var = spec.split(':')
        m = importlib.import_module(mod)
        blocks = getattr(m, var)
        ms = [b[1] for b in blocks if b[0] == 'mcq']
        print('-- %s (%d MCQs)' % (spec, len(ms)))
        for q in ms:
            stem = q['stem'].replace('\n', ' ')
            for tg in ('<b>', '</b>', '<i>', '</i>', '<super>', '</super>', '<sub>', '</sub>'):
                stem = stem.replace(tg, '')
            opts = '/'.join(str(o)[:14] for o in q['options'][:4])
            print('M%-4d|%-9s|%-26s|(%s) %s|opts: %s' % (
                q['n'], q.get('level', '?')[:9], q.get('concept', '-')[:26],
                q.get('ans', '?'), stem[:80], opts[:60]))
