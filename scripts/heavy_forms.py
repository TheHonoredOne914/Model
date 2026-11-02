#!/usr/bin/env python3
"""Quantify: stored bytes held in Form XObjects >= threshold, per file."""
import os, collections
import pikepdf

UP = "/home/z/my-project/upload"
FILES = [
    "iemh101.pdf","iemh102.pdf","iemh103.pdf","iemh104.pdf","iemh105.pdf",
    "iemh106.pdf","iemh107.pdf","iemh108.pdf",
    "iemh201.pdf","iemh202.pdf","iemh203.pdf","iemh204.pdf","iemh205.pdf","iemh206.pdf",
    "iest103.pdf","iest108.pdf","iest109.pdf",
    "iest201.pdf","iest202.pdf","iest203.pdf","iest204.pdf","iest205.pdf","iest206.pdf",
]
TH = 24 * 1024

tot_file = tot_heavy = n_heavy = 0
print(f"{'file':14}{'fileMB':>8}{'forms>=24KB':>13}{'MB in them':>12}")
for f in FILES:
    p = os.path.join(UP, f)
    fsz = os.path.getsize(p)
    heavy = 0; cnt = 0
    pdf = pikepdf.open(p)
    seen = set()
    for obj in pdf.objects:
        try:
            if isinstance(obj, pikepdf.Stream):
                d = dict(obj.items())
                if str(d.get("/Subtype","")) == "/Form" and str(d.get("/Type","")) != "/XObject":
                    key = obj.unparse(resolved=True)[:0] # cheap; use obj generation+objnum
                    oid = (obj.objgen[0], obj.objgen[1])
                    if oid in seen: continue
                    seen.add(oid)
                    n = len(obj.read_raw_bytes())
                    if n >= TH:
                        heavy += n; cnt += 1
        except Exception:
            pass
    pdf.close()
    tot_file += fsz; tot_heavy += heavy; n_heavy += cnt
    print(f"{f:14}{fsz/1048576:>8.2f}{cnt:>13}{heavy/1048576:>12.2f}")
print(f"\nTOTAL files {tot_file/1048576:.1f} MB | heavy forms {n_heavy} objs holding {tot_heavy/1048576:.1f} MB")
