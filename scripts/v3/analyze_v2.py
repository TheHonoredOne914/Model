#!/usr/bin/env python3
"""Analyze public/Saathy.html structure and extract embedded KB data."""
import json, re, sys

SRC = "/home/z/my-project/public/Saathy.html"
html = open(SRC, encoding="utf-8").read()
print("bytes:", len(html))
print("lines:", html.count("\n") + 1)

# Find script blocks
scripts = [(m.start(), m.end()) for m in re.finditer(r"<script[^>]*>", html)]
print("script tags:", len(scripts))

# Find big data markers
for marker in ["KB", "BOOKS", "Ganita", "ganita", "CHAPTERS", "VIDEOS", "window.", "const ", "function "]:
    idxs = [m.start() for m in re.finditer(re.escape(marker), html)][:8]
    print(f"{marker!r}: {len([m for m in re.finditer(re.escape(marker), html)])} hits, first at {idxs[:5]}")

# longest line lengths
lines = html.split("\n")
lens = sorted(((len(l), i) for i, l in enumerate(lines)), reverse=True)[:12]
print("longest lines (len, idx):", lens)

# settings handler context
for m in re.finditer(r"settingsBtn", html):
    s = max(0, m.start() - 120)
    print("--- settingsBtn ctx:", html[s:m.end() + 200].replace("\n", " ⏎ ")[:340])
