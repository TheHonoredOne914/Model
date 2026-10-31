#!/usr/bin/env python3
"""Build VIDEO_DB js from verified oEmbed results.
Primary video per concept first, then alternates (more teachers)."""
import json, re

rows = json.load(open("/home/z/my-project/scripts/v3/vid_verified.json"))
ok = [r for r in rows if r["ok"]]

# channel preference: strong full-chapter teachers first
PREF = ["Physics Wallah", "Alakh Pandey", "Magnet Brains", "Shobhit Nirwan", "Digraj Singh Rajput",
        "PW Class 9", "PW Class 10", "PW Foundation", "Vedantu", "BYJU", "Sunlike study",
        "Social School", "Prashant Kirad", "Science and Fun", "Ashu Ghai", "Khan Academy",
        "LearnoHub", "Grade booster", "Amit Sengupta", "Class 9 Learn", "2Pi", "Samridhi"]

def key(r):
    a = r["author"]
    for i, p in enumerate(PREF):
        if p.lower() in a.lower():
            return (i, -len(a))
    return (len(PREF), 0)

by_concept = {}
for r in ok:
    by_concept.setdefault((r["subj"], r["cls"], r["concept"]), []).append(r)

lines, n_concepts = [], 0
for (subj, cls, concept), vids in sorted(by_concept.items(), key=lambda kv: (kv[0][0], kv[0][1], kv[0][2].lower())):
    vids = sorted(vids, key=key)
    n_concepts += 1
    for v in vids:
        t = v["title"].replace("\\", "").replace('"', "'").replace("|", "/")
        a = v["author"].replace('"', "'")
        lines.append(f'["{subj}",{cls},"{concept}","{v["vid"]}","{a}","{t}"]')

js = "/* ================= Saathy v.3 VIDEO DB (all links oEmbed-verified live) ================= */\n"
js += f"/* {n_concepts} concepts x ~3 teachers each = {len(lines)} verified direct links. Primary first. */\n"
js += "const VIDEO_DB=[\n"
for i in range(0, len(lines), 3):
    js += "  " + ",".join(lines[i:i+3]) + ",\n"
js += "];\n"
js += f"const VIDEO_CONCEPTS={n_concepts};\n"
open("/home/z/my-project/scripts/v3/part3_videos.js", "w").write(js)
print(f"concepts: {n_concepts}  total direct links: {len(lines)}  -> part3_videos.js ({len(js)//1024} KB)")
