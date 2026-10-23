#!/usr/bin/env python3
"""Extract exercise sections from book text files into condensed per-chapter files."""
import re, os

SRC = '/home/z/my-project/scripts/mw4/book_txt'
OUT = '/home/z/my-project/scripts/mw4/exercises'

os.makedirs(OUT, exist_ok=True)

for n in range(1, 9):
    with open(f'{SRC}/ch{n}.txt') as f:
        lines = f.readlines()
    # find markers: Exercise Set X.Y or End-of-Chapter
    markers = []
    for i, ln in enumerate(lines):
        if re.match(r'^\s*(Exercise Set \d+\.\d+|End-of-Chapter Exercises)\s*$', ln):
            markers.append((i, ln.strip()))
    # also inline mini-exercises
    inline = []
    for i, ln in enumerate(lines):
        if re.match(r'^\s*Exercise:\s', ln) and not any(abs(i - m[0]) < 4 for m in markers):
            inline.append(i)
    out = []
    if inline:
        out.append('#### INLINE MINI-EXERCISES ####')
        for i in inline:
            chunk = ''.join(lines[i:i+7]).strip()
            out.append(f'[L{i+1}] {chunk}\n')
    for idx, (i, title) in enumerate(markers):
        # end = next marker start - 1, else EOF
        end = markers[idx + 1][0] if idx + 1 < len(markers) else len(lines)
        chunk = lines[i:end]
        # strip leading/trailing blank lines
        while chunk and chunk[0].strip() == '':
            chunk.pop(0)
        while chunk and chunk[-1].strip() == '':
            chunk.pop()
        out.append(f'==== {title} (L{i+1}) ====')
        out.append(''.join(chunk))
        out.append('')
    text = '\n'.join(out)
    with open(f'{OUT}/ch{n}_ex.txt', 'w') as f:
        f.write(text)
    print(f'ch{n}: {len(text)} bytes, {len(markers)} sets, {len(inline)} inline')
