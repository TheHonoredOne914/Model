#!/usr/bin/env python3
"""Char-by-char comparison at the broken lookahead + fix via slicing."""
import io

PATH = "/home/z/my-project/public/Saathy.html"
src = io.open(PATH, encoding="utf-8").read()

i = src.find("pBody.split(/(?<=")
print("anchor at:", i)
if i < 0:
    # maybe the anchor itself is typed differently; find via split marker
    i = src.find("pBody.split(")
    print("fallback anchor:", i)
seg = src[i:i+80]
print("bytes:", [hex(ord(c)) for c in seg[:60]])
print("repr:", repr(seg))
