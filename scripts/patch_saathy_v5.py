#!/usr/bin/env python3
"""Drop OCR chart-garbage sentences (>=2 numeric/alphanumeric-mixed tokens)."""
import io

PATH = "/home/z/my-project/public/Saathy.html"
src = io.open(PATH, encoding="utf-8").read()

B = chr(92)
old = ("if (s.length > 30 && s.length < 400 && (/[.!?]$/.test(s) || s.length > 80)"
       " && !/" + B + ".indd/.test(s)) out.push(s);")
new = ("const junky = (s.match(new RegExp(" + B + B + "b" + B + B + "[A-Za-z]*" + B + B + "d[A-Za-z"
       + B + B + "d]*" + B + B + "b" + B + B + "" + chr(34) + ", " + chr(34) + "g" + chr(34) + ")) || []).length;"
       "if (s.length > 30 && s.length < 400 && (/[.!?]$/.test(s) || s.length > 80)"
       " && junky < 2 && !/" + B + ".indd/.test(s)) out.push(s);")
c = src.count(old)
print("anchor count:", c)
assert c == 1
src = src.replace(old, new)
io.open(PATH, "w", encoding="utf-8").write(src)
print("PATCH7 DONE")
