#!/usr/bin/env python3
"""Assemble Saathy v.3 standalone HTML from parts + KB JSONs."""
import json, subprocess, sys, os

ROOT = "/home/z/my-project"
V3 = f"{ROOT}/scripts/v3"
OUTS = [f"{ROOT}/public/Saathy.html", f"{ROOT}/download/Saathy.html"]

def read(p): return open(p, encoding="utf-8").read()

head  = read(f"{V3}/part1_head.html")
body  = read(f"{V3}/part2_body.html")
data  = read(f"{V3}/part3_data.js")
eng   = read(f"{V3}/part4_engine.js")
feat  = read(f"{V3}/part5_features.js")
more  = read(f"{V3}/part6_more.js")

kbs = {
    "KB_gm": f"{ROOT}/src/data/books/ganita-manjari.json",
    "KB_sc": f"{ROOT}/src/data/books/science-exploration.json",
    "KB_us": f"{ROOT}/src/data/books/understanding-society.json",
}
islands = "\n".join(
    f'<script type="application/json" id="{k}">' + json.dumps(json.load(open(p, encoding="utf-8")), ensure_ascii=False, separators=(",", ":")) + "</script>"
    for k, p in kbs.items())

html = (head + body + "\n" + islands + "\n<script>\n" + data + "\n" + eng + "\n" + feat + "\n" + more + "\n</script>\n</body>\n</html>\n")

for out in OUTS:
    with open(out, "w", encoding="utf-8") as f:
        f.write(html)
    print(f"wrote {out} ({len(html):,} bytes)")

# syntax check each JS part
for name, src in [("data", data), ("engine", eng), ("features", feat), ("more", more)]:
    p = f"/tmp/v3_{name}.js"
    open(p, "w", encoding="utf-8").write(src)
    r = subprocess.run(["node", "--check", p], capture_output=True, text=True)
    print(f"JS {name}: {'OK' if r.returncode == 0 else 'SYNTAX ERROR'}")
    if r.returncode: print(r.stderr[:600]); sys.exit(1)
print("build complete")
