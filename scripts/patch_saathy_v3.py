#!/usr/bin/env python3
"""Fix double-bracket lookahead in cleanSentences + audit all [[ occurrences."""
import io

PATH = "/home/z/my-project/public/Saathy.html"
src = io.open(PATH, encoding="utf-8").read()

# audit every [[ occurrence with context
import re
print("--- [[ audit ---")
for m in re.finditer(re.escape(chr(91) + chr(91)), src):
    a, b = max(0, m.start() - 30), m.start() + 40
    ctx = src[a:b].replace("\n", " ")
    ln = src.count("\n", 0, m.start()) + 1
    print("line", ln, ":", ctx)

bad = "(?=[" + chr(91) + "A-Z(" + chr(93) + chr(93) + "])"
good = "(?=[" + "A-Z(" + chr(93) + "])"
n = src.count(bad)
print("bad lookahead occurrences:", n)
if n:
    src = src.replace(bad, good)
    io.open(PATH, "w", encoding="utf-8").write(src)
    print("FIXED", n)
else:
    print("pattern not found — check audit above")
