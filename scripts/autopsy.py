#!/usr/bin/env python3
"""Autopsy: where do the bytes actually live in these NCERT PDFs?"""
import sys, collections
import pikepdf

def autopsy(path):
    pdf = pikepdf.open(path)
    buckets = collections.Counter()
    counts = collections.Counter()
    font_names = collections.Counter()
    t3_fonts = 0
    for obj in pdf.objects:
        try:
            if isinstance(obj, pikepdf.Stream):
                d = dict(obj.items())
                sub = str(d.get("/Subtype", ""))
                typ = str(d.get("/Type", ""))
                n = len(obj.read_raw_bytes())  # STORED bytes
                if sub == "/Image":
                    buckets["image_raw"] += n; counts["image_raw"] += 1
                elif "/FontFile" in typ:
                    buckets["fontfile_raw"] += n; counts["fontfile_raw"] += 1
                    font_names[str(d.get("/BaseFont", "?"))] += n
                elif typ == "/ExtGState":
                    buckets["extgstate"] += n; counts["extgstate"] += 1
                else:
                    buckets["stream_other_raw"] += n; counts["stream_other_raw"] += 1
            elif isinstance(obj, pikepdf.Dictionary):
                sub = str(obj.get("/Subtype", ""))
                if sub == "/Type3":
                    t3_fonts += 1
        except Exception:
            pass
    total = sum(buckets.values())
    print(f"\n== {path}  (stored streams total {total/1048576:.1f} MB, Type3 fonts: {t3_fonts})")
    for k, v in buckets.most_common():
        print(f"  {k:18} {v/1048576:8.2f} MB  ({counts[k]} objs)")
    if font_names:
        print("  top fontfiles:")
        for f, n in sorted(font_names.items(), key=lambda x: -x[1])[:6]:
            print(f"    {f:60} {n/1048576:6.2f} MB")
    pdf.close()

for p in sys.argv[1:]:
    autopsy(p)
