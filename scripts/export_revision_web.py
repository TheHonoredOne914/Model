# -*- coding: utf-8 -*-
"""Export the Final Revision Sheet content (rev_a/b/c + main_revision picks)
into web-ready JSON for the interactive 80/80 revision app.
Converts ReportLab markup -> HTML (sup/sub/strong/br) + unicode entities."""
import sys, os, json, re, html, shutil

MB = '/home/z/my-project/scripts/mathbook'
sys.path.insert(0, MB)
os.chdir(MB)

import main_revision as MR  # noqa: E402  (assembles BLOCKS: plan + 7 chapters + final)


def web(s):
    """ReportLab markup -> browser-safe HTML string."""
    if not isinstance(s, str):
        return s
    s = html.unescape(s)
    s = s.replace('\u221aa \u222a \u221ab', '\u221aa \u00b1 \u221ab')  # fix ∪ typo -> ±
    s = s.replace('<super>', '<sup>').replace('</super>', '</sup>')
    s = s.replace('<sub>', '<sub>').replace('</sub>', '</sub>')
    s = s.replace('<b>', '<strong>').replace('</b>', '</strong>')
    s = s.replace('<br/>', '<br>').replace('<br />', '<br>')
    s = re.sub(r'\s+', ' ', s).strip()
    return s


def conv(obj):
    if isinstance(obj, str):
        return web(obj)
    if isinstance(obj, list):
        return [conv(x) for x in obj]
    if isinstance(obj, dict):
        return {k: conv(v) for k, v in obj.items()}
    return obj


# ---------- parse BLOCKS into structured chapters ----------
plan = {'title': '', 'body': '', 'rounds': [], 'golden': ''}
chapters = []       # list of chapter dicts
final = {'title': '', 'body': '', 'formulas': [], 'rules': [], 'drill': [], 'pep': ''}
cur = None          # current chapter dict
in_final = False    # past the Exam Morning h1 -> stop feeding `cur`

for b in MR.BLOCKS:
    kind = b[0]
    if kind == 'h1':
        t = web(b[1])
        if t.startswith('How to'):
            plan['title'] = t
        elif t.startswith('Exam Morning'):
            final['title'] = t
            in_final = True
            cur = None  # FINAL-page tables must NOT bleed into the last chapter
        else:
            m = re.match(r'Chapter (\d+): (.*)', t)
            num = int(m.group(1))
            name = m.group(2).replace('\u2605 MOST IMPORTANT', '').strip()
            cur = {'num': num, 'name': name, 'star': 'MOST IMPORTANT' in b[1],
                   'title': t, 'intro': '', 'formulas': [], 'checks': [],
                   'tricks': [], 'imps': [], 'mcqs': []}
            chapters.append(cur)
    elif kind == 'callout':
        if cur is not None and not cur['intro'] and not in_final:
            cur['intro'] = web(b[2])
        elif not plan['body'] and b[1] == 'Golden rule':
            plan['golden'] = web(b[2])
    elif kind == 'p':
        txt = web(b[1])
        if plan['title'] and not plan['body'] and not chapters:
            plan['body'] = txt
        elif final['title'] and not final['body'] and not final['formulas']:
            final['body'] = txt
        # section notes are dropped (web UI has its own microcopy)
    elif kind == 'table':
        hdr, rows = b[1], b[2]
        h0 = web(hdr[0]).lower()
        if cur is None and 'round' in h0:
            plan['rounds'] = [{'round': web(r[0]), 'do': web(r[1]), 'goal': web(r[2])} for r in rows]
        elif cur is not None:
            if 'formula' in h0:
                cur['formulas'] = [{'f': web(r[0]), 'meaning': web(r[1]), 'ex': web(r[2])} for r in rows]
            elif 'trick' in h0 or 'instant' in h0:
                cur['tricks'] = [{'trick': web(r[0]), 'when': web(r[1])} for r in rows]
    elif kind == 'bullets':
        if cur is not None and not in_final:
            cur['checks'] = [web(x) for x in b[1]]
    elif kind == 'nums':
        if final['title'] and in_final:
            final['drill'] = [web(x) for x in b[1]]
    elif kind == 'iq':
        if in_final:
            continue
        q = dict(b[1])
        cur['imps'].append(conv({
            'n': q['n'], 'level': q.get('level', ''), 'concept': q.get('concept', ''),
            'stem': q['stem'], 'steps': q.get('steps', []),
            'answer': q.get('answer', ''), 'why': q.get('why', []),
            'hinglish': q.get('hinglish', ''), 'fig': q.get('fig') or None,
        }))
    elif kind == 'mcqr':
        if in_final:
            continue
        m = dict(b[1])
        cur['mcqs'].append(conv({
            'n': m['n'], 'level': m.get('level', ''), 'concept': m.get('concept', ''),
            'stem': m['stem'], 'options': m['options'], 'ans': m['ans'],
            'expl': m.get('expl', ''), 'hinglish': m.get('hinglish', ''),
            'traps': m.get('traps', {}),
        }))
    elif kind == 'table' and final['title']:
        pass
    elif kind == 'h2' and final['title']:
        pass

# final page tables/bullets arrive with cur=None; re-scan for them
for b in MR.BLOCKS:
    kind = b[0]
    if kind == 'table' and isinstance(b[1], list) and b[1] and 'Killer' in str(b[1][0]):
        final['formulas'] = [{'f': web(r[0]), 'ch': web(r[1]), 'use': web(r[2])} for r in b[2]]
    elif kind == 'bullets' and cur is not None:
        pass
# rules = bullets after final title (the only bullets when cur is done) - find by position
seen_final = False
for b in MR.BLOCKS:
    if b[0] == 'h1' and b[1].startswith('Exam Morning'):
        seen_final = True
        continue
    if seen_final and b[0] == 'bullets':
        final['rules'] = [web(x) for x in b[1]]
        break

# final pep talk (last callout)
for b in reversed(MR.BLOCKS):
    if b[0] == 'callout':
        final['pep'] = web(b[2])
        break

# ---------- figures ----------
figdest = '/home/z/my-project/public/figs'
os.makedirs(figdest, exist_ok=True)
figs_used = []
for c in chapters:
    for q in c['imps']:
        if q.get('fig'):
            src = os.path.join(MB, 'figs', q['fig'])
            if os.path.exists(src):
                shutil.copy2(src, os.path.join(figdest, q['fig']))
                figs_used.append(q['fig'])
            else:
                q['fig'] = None

# chapter display metadata
short = {1: 'Coordinate Geometry', 2: 'Linear Equations', 3: 'Number Systems & Exponents',
         4: 'Algebraic Identities', 6: 'Perimeter & Area', 7: 'Probability',
         8: 'Sequences & Progressions'}
for c in chapters:
    c['short'] = short.get(c['num'], c['name'])

data = {'plan': plan, 'chapters': chapters, 'final': final}

# ---------- sanity ----------
assert len(chapters) == 7, 'chapters: %d' % len(chapters)
nimp = sum(len(c['imps']) for c in chapters)
nmcq = sum(len(c['mcqs']) for c in chapters)
assert nimp == 75, 'imp: %d' % nimp
assert nmcq == 97, 'mcq: %d' % nmcq
for c in chapters:
    assert len(c['formulas']) >= 9, 'ch%d formulas thin' % c['num']
    assert len(c['checks']) >= 9, 'ch%d checks thin' % c['num']
    assert len(c['tricks']) >= 7, 'ch%d tricks thin' % c['num']
    assert len(c['imps']) >= 10 and len(c['mcqs']) >= 10, 'ch%d thin' % c['num']
    for m in c['mcqs']:
        assert len(m['options']) == 4 and m['ans'] in 'ABCD'
# no leftover reportlab tags or entities
leftover = []
def scan(o, path):
    if isinstance(o, str):
        if re.search(r'</?(super|b)\b|&[a-z]+;', o):
            leftover.append((path, o[:80]))
    elif isinstance(o, list):
        for i, x in enumerate(o):
            scan(x, '%s[%d]' % (path, i))
    elif isinstance(o, dict):
        for k, v in o.items():
            scan(v, '%s.%s' % (path, k))
scan(data, 'root')
assert not leftover, 'leftover markup: %s' % leftover[:5]

outp = '/home/z/my-project/src/data/revision.json'
os.makedirs(os.path.dirname(outp), exist_ok=True)
with open(outp, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=1)

print('OK 7 chapters | IMP %d | MCQ %d | figs %s' % (nimp, nmcq, sorted(set(figs_used))))
for c in chapters:
    print('  Ch%-2d %-28s formulas=%2d checks=%2d tricks=%2d imp=%2d mcq=%2d'
          % (c['num'], c['short'], len(c['formulas']), len(c['checks']),
             len(c['tricks']), len(c['imps']), len(c['mcqs'])))
print('JSON:', outp, '%.1f KB' % (os.path.getsize(outp) / 1024))
