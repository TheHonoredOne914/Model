#!/usr/bin/env python3
"""Verify every candidate YouTube ID via public oEmbed (no bot gate).
Real ID -> title + channel. Fake/dead -> 400. Outputs verified JSON."""
import json, subprocess, urllib.parse
from concurrent.futures import ThreadPoolExecutor

CAND = "/home/z/my-project/scripts/v3/vid_candidates.txt"
OUT = "/home/z/my-project/scripts/v3/vid_verified.json"

rows, seen = [], {}
for line in open(CAND, encoding="utf-8"):
    line = line.strip()
    if not line:
        continue
    p = line.split("|")
    if len(p) < 4:
        continue
    rows.append({"subj": p[0].strip(), "cls": int(p[1].strip()), "concept": p[2].strip(), "vid": p[3].strip()})

def check(r):
    vid = r["vid"]
    if vid in seen:
        return seen[vid]
    url = urllib.parse.quote(f"https://www.youtube.com/watch?v={vid}", safe="")
    try:
        out = subprocess.run(["curl", "-s", "-w", "\n%{http_code}", f"https://www.youtube.com/oembed?url={url}&format=json",
                              "--max-time", "10"], capture_output=True, text=True, timeout=15).stdout
        body, _, code = out.rpartition("\n")
        if code == "200":
            d = json.loads(body)
            info = {"ok": True, "title": d.get("title", "")[:110], "author": d.get("author_name", "")[:50]}
        else:
            info = {"ok": False}
    except Exception:
        info = {"ok": False}
    seen[vid] = info
    return info

with ThreadPoolExecutor(max_workers=14) as ex:
    results = list(ex.map(check, rows))

for r, res in zip(rows, results):
    r["ok"] = res["ok"]; r["title"] = res.get("title", ""); r["author"] = res.get("author", "")

ok = [r for r in rows if r["ok"]]
concepts_ok = sorted({(r["subj"], r["cls"], r["concept"]) for r in ok})
print(f"rows: {len(rows)}  unique: {len(seen)}  OK: {len(ok)}  concepts covered: {len(concepts_ok)}")
json.dump(rows, open(OUT, "w"), ensure_ascii=False, indent=1)
missing = sorted({(r['subj'], r['cls'], r['concept']) for r in rows} - set(concepts_ok))
for m in missing[:20]:
    print("MISSING:", m)
print("saved", OUT)
