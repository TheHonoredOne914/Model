#!/usr/bin/env python3
"""Extract VidhyaSaathy logo assets for embedding in maths-war.html"""
from PIL import Image, ImageDraw, ImageFilter
import numpy as np, base64, os

SRC = '/home/z/my-project/upload/file_00000000617c8243a648021ca53a7b22.png'
OUT = '/home/z/my-project/scripts/mw3'
img = Image.open(SRC).convert('RGB')
W, H = img.size
print('source', img.size)

IVORY = np.array([250, 247, 239])

def flood_key(im):
    """Remove background connected to borders via floodfill on a copy."""
    im2 = im.copy()
    w, h = im2.size
    d = ImageDraw.floodfill
    # seed from many border points
    seeds = [(0,0),(w-1,0),(0,h-1),(w-1,h-1),(w//2,0),(w//2,h-1),(0,h//2),(w-1,h//2)]
    for s in seeds:
        try: d(im2, s, (255,0,255), thresh=26)
        except Exception as e: print('seed fail', s, e)
    a = np.asarray(im2).astype(int)
    mag = (np.abs(a[:,:,0]-255)<40)&(a[:,:,1]<60)&(np.abs(a[:,:,2]-255)<40)
    alpha = np.where(mag, 0, 255).astype(np.uint8)
    return alpha

# ---------- 1) V-MARK ONLY (transparent) ----------
# crop the mark region (no text): generous box
mark = img.crop((230, 170, 970, 790))
alpha = flood_key(mark)
ma = Image.fromarray(alpha, 'L').filter(ImageFilter.GaussianBlur(0.8))
# re-hard threshold partially to keep crisp edge but soft 1px
ma = ma.point(lambda v: 0 if v < 90 else (255 if v > 170 else v))
# crop to content bbox
bbox = ma.getbbox()
print('mark bbox', bbox)
ma2 = ma.crop(bbox); mk = mark.crop(bbox)
mk.putalpha(ma2)
# resize to height 280
r = 280 / mk.height
mk = mk.resize((max(1,round(mk.width*r)), 280), Image.LANCZOS)
mp = os.path.join(OUT, 'logo_mark.webp'); mk.save(mp, 'WEBP', quality=88, method=6)
print('mark bytes', os.path.getsize(mp))

# small favicon version (48px)
fav = mk.resize((48, round(48*mk.height/mk.width)), Image.LANCZOS)
fp = os.path.join(OUT, 'logo_fav.webp'); fav.save(fp, 'WEBP', quality=90, method=6)
print('fav bytes', os.path.getsize(fp))

# ---------- 2) FULL LOCKUP CARD (rounded, ivory bg) ----------
card = img.copy()
cw, ch = card.size
rad = int(ch*0.045)
mask = Image.new('L', (cw, ch), 0)
ImageDraw.Draw(mask).rounded_rectangle([0,0,cw-1,ch-1], radius=rad, fill=255)
# white border ring for definition on dark bg
ring = Image.new('RGB', (cw+16, ch+16), (255,255,255))
ring.paste(card, (8,8))
mask2 = Image.new('L', (cw+16, ch+16), 0)
ImageDraw.Draw(mask2).rounded_rectangle([0,0,cw+15,ch+15], radius=rad+8, fill=255)
ring.putalpha(mask2)
r2 = 430 / ring.width
ring = ring.resize((430, round(ring.height*r2)), Image.LANCZOS)
cp = os.path.join(OUT, 'logo_card.webp'); ring.save(cp, 'WEBP', quality=84, method=6)
print('card bytes', os.path.getsize(cp), ring.size)

# ---------- 3) base64 text files ----------
for name in ['logo_mark', 'logo_fav', 'logo_card']:
    p = os.path.join(OUT, name + '.webp')
    b64 = base64.b64encode(open(p,'rb').read()).decode()
    txt = 'data:image/webp;base64,' + b64
    with open(os.path.join(OUT, name + '.b64.txt'), 'w') as f:
        f.write(txt)
    print(name, 'b64 chars', len(txt))
