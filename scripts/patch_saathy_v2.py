#!/usr/bin/env python3
"""Patch v2: corpus hygiene for the offline book brain (drop PDF export junk,
give sub-headings their own line, strip page numbers from sentences)."""
import io, re, sys

PATH = "/home/z/my-project/public/Saathy.html"
src = io.open(PATH, encoding="utf-8").read()

DOT, OB, CB, BS = chr(46), chr(91), chr(93), chr(92)
B2 = BS + BS  # two backslashes (JS regex escape as it appears in source)

old_fn = (
  "function cleanSentences(text) {" + chr(10) +
  "  return String(text || \"\").replace(/" + BS + "s+/g, \" \")" + chr(10) +
  "    .split(/(?<=" + OB + DOT + "!?" + CB + ")" + B2 + "s+(?=" + OB + "A-Z(" + CB + ")/).map(s => s.trim())" + chr(10) +
  "    .filter(s => s.length > 30 && s.length < 400);" + chr(10) +
  "}"
)

new_fn = (
  "function cleanCorpus(text) {" + chr(10) +
  "  return String(text || \"\")" + chr(10) +
  "    .replace(/" + B2 + ".indd" + OB + BS + "s" + BS + "S" + CB + "*?" + B2 + "d" + OB + "1,2" + CB + ":" + B2 + "d" + OB + "2" + CB + ":" + B2 + "d" + OB + "2" + CB + B2 + "s*" + OB + "(?" + ":" + OB + "AP" + CB + "M)" + CB + "?/g, \" \")" + chr(10) +
  "    .replace(/" + B2 + "s+(" + B2 + "d" + OB + "1,2" + CB + B2 + DOT + B2 + "d" + OB + "1,2" + CB + "(?:" + B2 + DOT + B2 + "d" + OB + "1,2" + CB + ")?" + ")" + B2 + "s+/g, \"" + BS + "n$1 \")" + chr(10) +
  "    .replace(/" + OB + BS + "t " + CB + "{" + "2,}/g, \" \");" + chr(10) +
  "}" + chr(10) +
  "function cleanSentences(text) {" + chr(10) +
  "  const out = [];" + chr(10) +
  "  for (let p0 of cleanCorpus(text).split(" + B2 + "n+)) {" + chr(10) +
  "    const p = p0.trim();" + chr(10) +
  "    if (!p) continue;" + chr(10) +
  "    if (/^" + B2 + "d" + OB + "1,2" + CB + "(?:" + B2 + DOT + B2 + "d+" + CB + ")" + OB + "1,3" + CB + B2 + "s/.test(p) && p.split(/" + B2 + "s+/).length <= 8) continue;" + chr(10) +
  "    for (let s0 of p.split(/(?<=" + OB + DOT + "!?" + CB + ")" + B2 + "s+(?=" + OB + "A-Z(" + CB + ")/)) {" + chr(10) +
  "      let s = s0.trim()" + chr(10) +
  "        .replace(/^" + OB + "A-Z" + OB + "a-zA-Z" + CB + CB + "(?:" + B2 + "s+(?:of|the|and|to|in|for|with|[A-Z]" + OB + "a-zA-Z" + CB + "))" + OB + "2,7" + CB + B2 + "s+" + B2 + "d" + OB + "1,3" + CB + B2 + "s+/, \"\")" + chr(10) +
  "        .replace(/^" + B2 + "d" + OB + "1,3" + CB + B2 + "s+/, \"\")" + chr(10) +
  "        .replace(/^" + B2 + "d" + OB + "1,2" + CB + "(?:" + B2 + DOT + B2 + "d+" + CB + ")" + OB + "1,3" + CB + B2 + "s+/, \"\");" + chr(10) +
  "      if (s.length > 30 && s.length < 400 && !/" + B2 + ".indd/.test(s)) out.push(s);" + chr(10) +
  "    }" + chr(10) +
  "  }" + chr(10) +
  "  return out;" + chr(10) +
  "}"
)

n = src.count(old_fn)
if n != 1:
    print("FAIL: cleanSentences anchor found", n, "times"); sys.exit(1)
src = src.replace(old_fn, new_fn)

io.open(PATH, "w", encoding="utf-8").write(src)
print("PATCH2 DONE")
