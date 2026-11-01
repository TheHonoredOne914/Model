#!/usr/bin/env python3
"""Replace the broken double-bracket lookahead using precisely constructed strings."""
import io

PATH = "/home/z/my-project/public/Saathy.html"
src = io.open(PATH, encoding="utf-8").read()

LB = "(?="                      # (?=
OB = chr(91)                    # [
CB = chr(93)                    # ]
bad = LB + OB + OB + "A-Z(" + CB + CB + ")"     # (?=[[A-Z(]])
good = LB + "A-Z(" + CB + ")"                   # (?=[A-Z(])
n = src.count(bad)
print("bad occurrences:", n)
assert n == 1, "expected exactly 1"
src = src.replace(bad, good)
io.open(PATH, "w", encoding="utf-8").write(src)
print("FIXED")
print("verify:", good in io.open(PATH, encoding="utf-8").read())
