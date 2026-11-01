#!/usr/bin/env python3
"""Replace the mangled junky line with a correct one (all brackets via chr())."""
import io, re, sys

PATH = "/home/z/my-project/public/Saathy.html"
src = io.open(PATH, encoding="utf-8").read()

pat = re.compile("const junky" + r"[\s\S]*?" + re.escape("|| [])") + re.escape(".length;"))
m = pat.search(src)
print("broken line found:", bool(m))
if not m:
    sys.exit(1)

B2 = chr(92) + chr(92)   # file-level double backslash (JS string escape)
OB, CB, Q = chr(91), chr(93), chr(34)
correct = ("const junky = (s.match(new RegExp(" + Q + B2 + "b" + OB + "A-Za-z" + CB + "*"
           + B2 + "d" + OB + "A-Za-z" + B2 + "d" + CB + "*" + B2 + "b" + Q + ", " + Q
           + "g" + Q + ")) || []).length;")
src2 = pat.sub(lambda mm: correct, src, count=1)
io.open(PATH, "w", encoding="utf-8").write(src2)
print("FIXED")
print("contains correct:", correct in io.open(PATH, encoding="utf-8").read())
