#!/usr/bin/env python3
"""Concatenate parts into the final single-file Saathy chat app."""
import os
P = "/home/z/my-project/scripts/saathy/parts"
OUT = "/home/z/my-project/download/Saathy_Chat.html"
order_html = ["p01_head.html", "p02_chat.html", "p03_settings.html", "p04_body.html"]
order_js = ["p10_assets.js", "p20_core.js", "p21_render.js", "p22_api.js", "p23_settings.js"]
buf = []
for f in order_html:
    buf.append(open(os.path.join(P, f)).read())
for f in order_js:
    buf.append("<script>\n" + open(os.path.join(P, f)).read() + "\n</script>")
buf.append(open(os.path.join(P, "p99_tail.html")).read())
html = "\n".join(buf)
os.makedirs(os.path.dirname(OUT), exist_ok=True)
with open(OUT, "w") as f:
    f.write(html)
print(OUT, f"{os.path.getsize(OUT)/1024:.1f} KB")
