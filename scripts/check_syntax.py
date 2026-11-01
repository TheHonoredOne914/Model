#!/usr/bin/env python3
"""Extract every classic <script> block from Saathy.html and node --check each."""
import re, subprocess, sys, pathlib

src = pathlib.Path("/home/z/my-project/public/Saathy.html").read_text(encoding="utf-8")
blocks = []
for m in re.finditer(r"<script(?![^>]*type=)[^>]*>(.*?)</script>", src, re.S):
    blocks.append((m.start(), m.group(1)))

print(f"Found {len(blocks)} classic script blocks")
fail = 0
for i, (pos, code) in enumerate(blocks):
    line = src[:pos].count("\n") + 1
    p = pathlib.Path(f"/tmp/block_{i}.js")
    p.write_text(code, encoding="utf-8")
    r = subprocess.run(["node", "--check", str(p)], capture_output=True, text=True)
    if r.returncode != 0:
        fail += 1
        first = r.stderr.strip().splitlines()
        print(f"BLOCK {i} (html line {line}): SYNTAX ERROR")
        for ln in first[:6]:
            print("   ", ln)
    else:
        print(f"BLOCK {i} (html line {line}): OK ({len(code)} chars)")
print("RESULT:", "FAIL" if fail else "ALL OK")
sys.exit(1 if fail else 0)
