#!/usr/bin/env python3
"""Verify every candidate YouTube ID via innertube player API.
Outputs: verified table with real title/author/duration. Kills dead/fake IDs."""
import json, subprocess, sys, time
from concurrent.futures import ThreadPoolExecutor

CAND = "/home/z/my-project/scripts/v3/vid_candidates.txt"
OUT = "/home/z/my-project/scripts/v3/vid_verified.json"

rows = []
seen_ids = {}
for line in open(CAND, encoding="utf-8"):
    line = line.strip()
    if not line:
        continue
    parts = line.split("|")
    if len(parts) < 4:
        continue
    subj, cls, concept, vid = parts[0].strip(), parts[1].strip(), parts[2].strip(), parts[3].strip()
    rows.append({"subj": subj, "cls": int(cls), "concept": concept, "vid": vid})

def check(r):
    vid = r["vid"]
    if vid in seen_ids:
        return {"vid": vid, **seen_ids[vid]}
    try:
        payload = json.dumps({"context": {"client": {"clientName": "WEB", "clientVersion": "2.20240101.00.00"}}, "videoId": vid})
        out = subprocess.run(
            ["curl", "-s", "-X", "POST",
             "https://www.youtube.com/youtubei/v1/player?key=AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8",
             "-H", "Content-Type: application/json", "--max-time", "12", "-d", payload],
            capture_output=True, text=True, timeout=20).stdout
        d = json.loads(out)
        st = d.get("playabilityStatus", {}).get("status", "")
        vd = d.get("videoDetails", {})
        if st == "OK" and vd.get("videoId") == vid:
            info = {
                "ok": True,
                "title": vd.get("title", "")[:120],
                "author": vd.get("author", "")[:60],
                "dur": int(vd.get("lengthSeconds", 0)),
            }
        else:
            info = {"ok": False, "reason": st or "no-details"}
        seen_ids[vid] = info
        return {"vid": vid, **info}
    except Exception as e:
        seen_ids[vid] = {"ok": False, "reason": f"err:{e}"}
        return {"vid": vid, "ok": False, "reason": str(e)[:60]}

with ThreadPoolExecutor(max_workers=12) as ex:
    results = list(ex.map(check, rows))

for r, res in zip(rows, results):
    r["ok"] = res["ok"]
    r["title"] = res.get("title", "")
    r["author"] = res.get("author", "")
    r["dur"] = res.get("dur", 0)

ok = [r for r in rows if r["ok"]]
bad = [r for r in rows if not r["ok"]]
print(f"total rows: {len(rows)}  unique ids: {len(seen_ids)}  OK rows: {len(ok)}  DEAD rows: {len(bad)}")
dead_ids = sorted({r['vid'] for r in bad})
print("dead ids:", dead_ids[:20])
json.dump(rows, open(OUT, "w"), ensure_ascii=False, indent=1)
print("saved", OUT)
