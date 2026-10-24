#!/usr/bin/env python3
"""Emit base64 mascot/logo constants as a JS part file."""
import base64, os

OUT = "/home/z/my-project/scripts/saathy/out"
PARTS = "/home/z/my-project/scripts/saathy/parts"
os.makedirs(PARTS, exist_ok=True)

def b64(p):
    with open(p, "rb") as f:
        return "data:image/png;base64," + base64.b64encode(f.read()).decode()

poses = ["idle", "happy", "thinking", "wink", "explaining", "excited", "reading", "cheering", "sleeping"]
lines = ["/* Auto-generated: Saathy mascot + VidhyaSaathy brand assets (transparent PNG, base64) */"]
lines.append("const MASCOT={")
for p in poses:
    lines.append(f'{p}:"{b64(os.path.join(OUT, f"pose_{p}.png"))}",')
lines.append("};")
lines.append(f'const LOGO_VS="{b64(os.path.join(OUT, "logo_vs.png"))}";')

dst = os.path.join(PARTS, "p10_assets.js")
with open(dst, "w") as f:
    f.write("\n".join(lines) + "\n")
print(dst, os.path.getsize(dst) // 1024, "KB")
