#!/usr/bin/env python3
"""Extract every <script> block from Saathy.html and node --check it."""
import re, subprocess, tempfile, os

src = open("/home/z/my-project/public/Saathy.html", encoding="utf-8").read()
blocks = re.findall(r"<script(?![^>]*type=)[^>]*>(.*?)</script>", src, re.S)
print("script blocks:", len(blocks))
bad = 0
for i, js in enumerate(blocks):
    with tempfile.NamedTemporaryFile("w", suffix=".js", delete=False, encoding="utf-8") as f:
        f.write(js); path = f.name
    r = subprocess.run(["node", "--check", path], capture_output=True, text=True)
    first = js.strip().splitlines()[0][:70] if js.strip() else "(empty)"
    if r.returncode != 0:
        bad += 1
        print(f"BLOCK {i} SYNTAX ERROR — {first}")
        print(r.stderr[:600])
    else:
        print(f"block {i} ok ({len(js)} b) — {first}")
    os.unlink(path)
print("BAD:", bad)
