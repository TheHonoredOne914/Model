#!/usr/bin/env python3
"""Assemble the final one-PDF library: front matter + 23 chapters (raster-swapped),
bookmarks, metadata. Then qpdf squeeze happens outside."""
import json, os
import pikepdf

WORK = "/home/z/my-project/scripts/work"
OUT = os.path.join(WORK, "assembled.pdf")

info = json.load(open(os.path.join(WORK, "book_info.json")))
rmap = json.load(open(os.path.join(WORK, "raster_map.json")))
ORDER = info["order"]
META = info["meta"]
starts = info["starts"]

PART_PARENTS = [
    ("Ganita Manjari — Part 1 (Chapters 1–8)", [k for k in ORDER if META[k][0].endswith("Part 1") and k.startswith("iemh")]),
    ("Ganita Manjari — Part 2 (Chapters 9–14)", [k for k in ORDER if META[k][0].endswith("Part 2") and k.startswith("iemh")]),
    ("Social Science — Part 1: India and Beyond (Ch 3, 8, 9)", [k for k in ORDER if k.startswith("iest1")]),
    ("Social Science — Part 2: India and Beyond (Ch 1–6)", [k for k in ORDER if k.startswith("iest2")]),
]

def main():
    dst = pikepdf.new()
    # front matter
    cover = pikepdf.open(os.path.join(WORK, "cover.pdf"))
    toc = pikepdf.open(os.path.join(WORK, "toc.pdf"))
    dst.pages.extend(cover.pages)
    dst.pages.extend(toc.pages)
    cover.close(); toc.close()

    page_counts = {}
    for key in ORDER:
        src = pikepdf.open(os.path.join(WORK, "surg", f"{key}.pdf"))
        page_counts[key] = len(src.pages)
        rasters = rmap.get(key, {})
        rdocs = {}
        for i in range(len(src.pages)):
            rp = rasters.get(str(i))
            if rp:
                if rp not in rdocs:
                    rdocs[rp] = pikepdf.open(rp)
                dst.pages.append(rdocs[rp].pages[0])
            else:
                dst.pages.append(src.pages[i])
        for d in rdocs.values():
            d.close()
        src.close()
        print(f"  + {key}: {page_counts[key]} pages")

    total = len(dst.pages)
    assert total == info["total"], f"page mismatch {total} != {info['total']}"

    # bookmarks
    with dst.open_outline() as outline:
        toc_item = pikepdf.OutlineItem("Contents", 1)
        outline.root.append(toc_item)
        for ptitle, keys in PART_PARENTS:
            parent = pikepdf.OutlineItem(ptitle, starts[keys[0]] - 1)
            for k in keys:
                book, ch, title = META[k]
                child = pikepdf.OutlineItem(f"Chapter {ch}: {title}", starts[k] - 1)
                parent.children.append(child)
            outline.root.append(parent)

    # metadata
    with dst.open_metadata(set_pikepdf_as_editor=False) as m:
        m["dc:title"] = "Saathy Chapter Library — Grade 9 Maths & Social Science"
        m["dc:creator"] = ["VidhyaSaathy"]
        m["dc:description"] = "All 23 chapters from Ganita Manjari Parts 1-2 and Social Science Parts 1-2, merged into one compressed, bookmarked PDF."
        m["xmp:CreatorTool"] = "Z.ai"
        m["pdf:Producer"] = "pikepdf"
    dst.docinfo["/Title"] = "Saathy Chapter Library — Grade 9 Maths & Social Science"
    dst.docinfo["/Author"] = "VidhyaSaathy"
    dst.docinfo["/Creator"] = "Z.ai"
    dst.docinfo["/Subject"] = "Ganita Manjari Parts 1-2 · Social Science (India and Beyond) Parts 1-2 — complete chapter collection"

    dst.save(OUT, compress_streams=True, object_stream_mode=pikepdf.ObjectStreamMode.generate)
    dst.close()
    print(f"assembled: {OUT} ({os.path.getsize(OUT)/1048576:.1f} MB, {total} pages)")

if __name__ == "__main__":
    main()
