#!/usr/bin/env python3
"""Boost retrieval: scan full content, weight rare-word hits higher."""
import io

PATH = "/home/z/my-project/public/Saathy.html"
src = io.open(PATH, encoding="utf-8").read()

o1 = '.slice(0, 2600).toLowerCase()'
n1 = '.toLowerCase()'
o2 = '.length, 4) * 1.2;'
n2 = '.length, 3) * 1.8;'

for o, want in ((o1, 1), (o2, 1)):
    c = src.count(o)
    print(repr(o[:30]), "count:", c)
    assert c == want, "anchor mismatch"

src = src.replace(o1, n1).replace(o2, n2)
io.open(PATH, "w", encoding="utf-8").write(src)
print("PATCH6 DONE")
