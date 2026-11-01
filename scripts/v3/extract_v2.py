#!/usr/bin/env python3
"""Extract v2 KB data blobs + syntax-check script blocks."""
import json, re, subprocess, os

SRC = "/home/z/my-project/public/Saathy.html"
html = open(SRC, encoding="utf-8").read()
os.makedirs("/home/z/my-project/scripts/v3", exist_ok=True)

# Extract script blocks
blocks = re.findall(r"<script[^>]*>(.*?)</script>", html, re.S)
print("script blocks:", [len(b) for b in blocks])
for i, b in enumerate(blocks):
    if not b.strip():
        continue
    p = f"/tmp/v2_block{i}.js"
    open(p, "w", encoding="utf-8").write(b)
    r = subprocess.run(["node", "--check", p], capture_output=True, text=True)
    status = "OK" if r.returncode == 0 else "SYNTAX ERROR: " + (r.stderr.strip().split("\n")[0][:160] if r.stderr else "?")
    print(f"block {i}: {len(b)}B -> {status}")

# Pull the giant data lines (550-551, 1-indexed)
lines = html.split("\n")
big = [(i, l) for i, l in enumerate(lines) if len(l) > 20000]
for i, l in big:
    open(f"/tmp/v2_dataline_{i}.js", "w", encoding="utf-8").write(l)
    print(f"data line {i}: {len(l)}B  head: {l[:120]!r}")
