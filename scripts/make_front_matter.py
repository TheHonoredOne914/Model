#!/usr/bin/env python3
"""Generate cover.html + toc.html with real page numbers from processed files."""
import json, os
import pikepdf

WORK = "/home/z/my-project/scripts/work"
ORDER = [f"iemh1{i:02d}" for i in range(1, 9)] + [f"iemh2{i:02d}" for i in range(1, 7)] + \
        ["iest103", "iest108", "iest109"] + [f"iest2{i:02d}" for i in range(1, 7)]

META = {
    "iemh101": ("Ganita Manjari · Part 1", 1, "Orienting Yourself: The Use of Coordinates"),
    "iemh102": ("Ganita Manjari · Part 1", 2, "Introduction to Linear Polynomials"),
    "iemh103": ("Ganita Manjari · Part 1", 3, "The World of Numbers"),
    "iemh104": ("Ganita Manjari · Part 1", 4, "Exploring Algebraic Identities"),
    "iemh105": ("Ganita Manjari · Part 1", 5, "I'm Up and Down, and Round and Round"),
    "iemh106": ("Ganita Manjari · Part 1", 6, "Measuring Space: Perimeter and Area"),
    "iemh107": ("Ganita Manjari · Part 1", 7, "The Mathematics of Maybe: Introduction to Probability"),
    "iemh108": ("Ganita Manjari · Part 1", 8, "Predicting What Comes Next: Sequences and Progressions"),
    "iemh201": ("Ganita Manjari · Part 2", 9, "Propositions and their Converses"),
    "iemh202": ("Ganita Manjari · Part 2", 10, "How Quantities Combine: Understanding Data"),
    "iemh203": ("Ganita Manjari · Part 2", 11, "The World of Algorithms"),
    "iemh204": ("Ganita Manjari · Part 2", 12, "Quadrilaterals"),
    "iemh205": ("Ganita Manjari · Part 2", 13, "Two Variables, One Line"),
    "iemh206": ("Ganita Manjari · Part 2", 14, "Math of Space: Surface Area and Volume"),
    "iest103": ("Social Science · Part 1", 3, "Atmosphere and Climate"),
    "iest108": ("Social Science · Part 1", 8, "Building Blocks in Economics: The Problem of Choice"),
    "iest109": ("Social Science · Part 1", 9, "The Price Puzzle: What Drives the Market"),
    "iest201": ("Social Science · Part 2", 1, "Oceans and Life"),
    "iest202": ("Social Science · Part 2", 2, "Life on Earth"),
    "iest203": ("Social Science · Part 2", 3, "Resistance and Resilience (1000–1700 CE)"),
    "iest204": ("Social Science · Part 2", 4, "Governance and Public Policy"),
    "iest205": ("Social Science · Part 2", 5, "Managing Your Personal Finances"),
    "iest206": ("Social Science · Part 2", 6, "From Ideas to Startups"),
}

def main():
    counts, starts = {}, {}
    cur = 3  # cover=1, contents=2
    for k in ORDER:
        with pikepdf.open(os.path.join(WORK, "surg", f"{k}.pdf")) as pdf:
            counts[k] = len(pdf.pages)
        starts[k] = cur
        cur += counts[k]
    total_pages = cur - 1
    info = {"counts": counts, "starts": starts, "total": total_pages,
            "order": ORDER, "meta": META}
    json.dump(info, open(os.path.join(WORK, "book_info.json"), "w"), indent=1)

    # ---- cover.html
    cover = """<!DOCTYPE html>
<html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;800&display=swap" rel="stylesheet">
<style>
  @page { size: 595px 842px; margin: 0; }
  html, body { margin: 0; padding: 0; background: #102B4C; }
  .poster { width: 595px; height: 842px; background: #102B4C; position: relative;
            font-family: 'Manrope', 'Liberation Sans', 'Carlito', sans-serif; color: #FFF5ED; }
  .band { position: absolute; left: 0; right: 0; }
  .b1 { top: 0; height: 10px; background: #F6D5C6; }
  .b2 { bottom: 0; height: 10px; background: #A9CEE8; }
  .dot { position: absolute; border-radius: 50%; }
  .d1 { width: 210px; height: 210px; right: -60px; top: 90px; background: rgba(246,213,198,0.10); }
  .d2 { width: 120px; height: 120px; left: -40px; top: 300px; background: rgba(169,206,232,0.12); }
  .d3 { width: 70px; height: 70px; right: 90px; bottom: 140px; background: rgba(232,164,124,0.18); }
  .wrap { position: absolute; left: 56px; right: 56px; top: 96px; }
  .eyebrow { font-size: 13px; letter-spacing: 4px; font-weight: 600; color: #A9CEE8; }
  h1 { margin: 18px 0 0; font-size: 52px; line-height: 1.06; font-weight: 800; color: #FFF5ED; }
  .h1em { color: #F6D5C6; }
  .sub { margin-top: 16px; font-size: 16.5px; line-height: 1.5; color: #D7E9F5; font-weight: 400; }
  .grid { position: absolute; left: 56px; right: 56px; top: 388px; display: grid;
          grid-template-columns: 1fr 1fr; gap: 14px; }
  .card { background: rgba(255,245,237,0.07); border: 1px solid rgba(169,206,232,0.28);
          border-radius: 14px; padding: 16px 18px; }
  .card .t { font-size: 15px; font-weight: 800; color: #FFF5ED; }
  .card .s { margin-top: 5px; font-size: 12px; color: #A9CEE8; }
  .stats { position: absolute; left: 56px; right: 56px; bottom: 64px; display: flex; gap: 34px;
           border-top: 1px solid rgba(169,206,232,0.30); padding-top: 20px; }
  .stat .n { font-size: 27px; font-weight: 800; color: #F6D5C6; }
  .stat .l { font-size: 11px; letter-spacing: 1.6px; color: #D7E9F5; margin-top: 3px; }
</style></head>
<body><div class="poster">
  <div class="dot d1"></div><div class="dot d2"></div><div class="dot d3"></div>
  <div class="band b1"></div><div class="band b2"></div>
  <div class="wrap">
    <div class="eyebrow">VIDHYASAATHY</div>
    <h1>Saathy<br>Chapter <span class="h1em">Library</span></h1>
    <div class="sub">Every chapter you gave me — maths and social science —<br>arranged, bookmarked and compressed into one book.</div>
  </div>
  <div class="grid">
    <div class="card"><div class="t">Ganita Manjari — Part 1</div><div class="s">Chapters 1–8 · Mathematics</div></div>
    <div class="card"><div class="t">Ganita Manjari — Part 2</div><div class="s">Chapters 9–14 · Mathematics</div></div>
    <div class="card"><div class="t">Social Science — Part 1</div><div class="s">India and Beyond · Ch 3, 8, 9</div></div>
    <div class="card"><div class="t">Social Science — Part 2</div><div class="s">India and Beyond · Ch 1–6</div></div>
  </div>
  <div class="stats">
    <div class="stat"><div class="n">23</div><div class="l">CHAPTERS</div></div>
    <div class="stat"><div class="n">__TOTAL__</div><div class="l">PAGES</div></div>
    <div class="stat"><div class="n">1</div><div class="l">FILE</div></div>
  </div>
</div></body></html>"""
    cover = cover.replace("__TOTAL__", str(total_pages))
    open(os.path.join(WORK, "cover.html"), "w").write(cover)

    # ---- toc.html
    groups = {}
    for k in ORDER:
        book, ch, title = META[k]
        groups.setdefault(book, []).append((ch, title, starts[k]))

    rows = ""
    col = 0
    group_items = []
    for book, items in groups.items():
        g = f'<div class="gt">{book}</div>'
        for ch, title, pg in items:
            t = title if len(title) <= 44 else title[:42].rstrip(" ,:") + "…"
            g += (f'<div class="row"><span class="cn">{ch}.</span>'
                  f'<span class="ct">{t}</span><span class="dots"></span>'
                  f'<span class="pg">{pg}</span></div>')
        group_items.append(g)
    # two columns: first two groups left, last two right
    left = f'<div class="col">{group_items[0]}{group_items[1]}</div>'
    right = f'<div class="col">{group_items[2]}{group_items[3]}</div>'

    toc = """<!DOCTYPE html>
<html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;800&display=swap" rel="stylesheet">
<style>
  @page { size: 595px 842px; margin: 0; }
  html, body { margin: 0; padding: 0; background: #FFF5ED; }
  .poster { width: 595px; height: 842px; background: #FFF5ED; position: relative;
            font-family: 'Manrope', 'Liberation Sans', 'Carlito', sans-serif; color: #17324F; }
  .top { position: absolute; left: 56px; right: 56px; top: 54px; }
  .eyebrow { font-size: 11px; letter-spacing: 3.5px; font-weight: 600; color: #A05C2E; }
  h2 { margin: 8px 0 0; font-size: 33px; font-weight: 800; color: #102B4C; }
  .cols { position: absolute; left: 56px; right: 56px; top: 150px; bottom: 48px;
          display: flex; gap: 30px; }
  .col { flex: 1; }
  .gt { font-size: 13px; font-weight: 800; color: #214F78; letter-spacing: 0.6px;
        margin: 16px 0 7px; padding-bottom: 5px; border-bottom: 2px solid #F6D5C6; }
  .col .gt:first-child { margin-top: 0; }
  .row { display: flex; align-items: baseline; gap: 6px; padding: 4.2px 0; font-size: 11.3px; }
  .cn { color: #A05C2E; font-weight: 800; min-width: 20px; }
  .ct { color: #17324F; }
  .dots { flex: 1; border-bottom: 1.5px dotted #C9CFDB; transform: translateY(-2.5px); }
  .pg { color: #214F78; font-weight: 700; min-width: 20px; text-align: right; }
  .foot { position: absolute; left: 56px; right: 56px; bottom: 22px; font-size: 10px;
          color: #637C96; display: flex; justify-content: space-between; }
</style></head>
<body><div class="poster">
  <div class="top">
    <div class="eyebrow">SAATHY CHAPTER LIBRARY</div>
    <h2>Contents</h2>
  </div>
  <div class="cols">__LEFT____RIGHT__</div>
  <div class="foot"><span>Grade 9 · Ganita Manjari + India and Beyond</span><span>Page numbers match the bookmarks panel</span></div>
</div></body></html>"""
    toc = toc.replace("__LEFT__", left).replace("__RIGHT__", right)
    open(os.path.join(WORK, "toc.html"), "w").write(toc)

    print(json.dumps({k: starts[k] for k in ORDER}, indent=0))
    print("total pages:", total_pages)

if __name__ == "__main__":
    main()
