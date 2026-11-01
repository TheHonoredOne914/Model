#!/usr/bin/env python3
"""Final lookahead fix — every bracket constructed via chr(), no literal [A sequences."""
import io

PATH = "/home/z/my-project/public/Saathy.html"
src = io.open(PATH, encoding="utf-8").read()

OB, CB = chr(91), chr(93)
bad = "(?=A-Z(" + CB + ")"                  # current broken: (?=A-Z(])
good = "(?=" + OB + "A-Z(" + CB + ")"       # correct:       (?=[A-Z(])
n = src.count(bad)
print("bad:", n)
assert n == 1
src = src.replace(bad, good)
io.open(PATH, "w", encoding="utf-8").write(src)
chk = io.open(PATH, encoding="utf-8").read()
print("fixed:", chk.count(good))
