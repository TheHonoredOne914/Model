#!/usr/bin/env python3
"""Extract the 9 Saathy cloud poses + VidhyaSaathy logo as transparent PNGs.

Pipeline per sprite:
  1. Crop grid cell, cut off the caption label zone at the bottom.
  2. Estimate bg colour from cell corners.
  3. Strict flood-fill from the borders (vectorised dilation loop) -> hard transparency.
  4. Soft rounds: neighbours of transparent area within a shrinking tolerance of bg
     get proportional alpha -> smooth falloff for shadows / glows.
  5. Trim to content bbox, pad, resize, quantise, save optimised PNG.
"""
import os
import numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage

SRC_SHEET = "/home/z/my-project/upload/file_0000000085dc8211b51075b1ff8b5211.png"
SRC_LOGO = "/home/z/my-project/upload/file_00000000617c8243a648021ca53a7b22.png"
OUT = "/home/z/my-project/scripts/saathy/out"
os.makedirs(OUT, exist_ok=True)

POSES = ["idle", "happy", "thinking", "wink", "explaining", "excited", "reading", "cheering", "sleeping"]
TOL_STRICT = 46.0   # hard bg kill
TOL_SOFT = 150.0    # start of soft falloff for shadows
SOFT_ROUNDS = 6


def dist(arr, color):
    return np.sqrt(((arr.astype(np.float32) - np.float32(color)) ** 2).sum(axis=-1))


def drop_captions(rgba, margin=14):
    """Remove small connected components dangling far BELOW the main cloud
    (caption letters). Keeps sparkles / ? / Zzz which sit above or beside."""
    alpha = rgba[:, :, 3]
    mask = alpha > 10
    lab, n = ndimage.label(mask)
    if n < 2:
        return rgba
    sizes = ndimage.sum(mask, lab, range(1, n + 1))
    main = int(np.argmax(sizes)) + 1
    main_rows = np.where((lab == main).any(axis=1))[0]
    if not len(main_rows):
        return rgba
    bottom = main_rows.max()
    keep = np.ones(n + 1, bool); keep[0] = False
    objs = ndimage.find_objects(lab)
    for i, sl in enumerate(objs, start=1):
        if i == main or sl is None:
            continue
        comp_bottom = sl[0].stop
        h = sl[0].stop - sl[0].start
        if comp_bottom > bottom + margin and h < 60:  # small & far below -> caption
            keep[i] = False
    rgba = rgba.copy()
    rgba[:, :, 3][~keep[lab]] = 0
    return rgba


def extract(arr_rgb, cut_bottom=0.0, tol_strict=TOL_STRICT, captions=True):
    h, w, _ = arr_rgb.shape
    if cut_bottom > 0:
        arr_rgb = arr_rgb[: int(h * (1 - cut_bottom)), :, :]
        h = arr_rgb.shape[0]
    # bg estimate: median of 4 corner patches
    k = 14
    corners = np.concatenate([
        arr_rgb[:k, :k].reshape(-1, 3), arr_rgb[:k, -k:].reshape(-1, 3),
        arr_rgb[-k:, :k].reshape(-1, 3), arr_rgb[-k:, -k:].reshape(-1, 3),
    ])
    bg = np.median(corners, axis=0)

    d = dist(arr_rgb, bg)
    bgish = d < tol_strict
    # flood fill: start from border bg-ish, dilate constrained to bg-ish
    fill = np.zeros((h, w), bool)
    fill[0, :] = bgish[0, :]; fill[-1, :] = bgish[-1, :]
    fill[:, 0] = bgish[:, 0]; fill[:, -1] = bgish[:, -1]
    while True:
        grown = fill.copy()
        grown[1:, :] |= fill[:-1, :]
        grown[:-1, :] |= fill[1:, :]
        grown[:, 1:] |= fill[:, :-1]
        grown[:, :-1] |= fill[:, 1:]
        grown &= bgish
        grown |= fill
        if grown.sum() == fill.sum():
            break
        fill = grown

    alpha = np.where(fill, 0.0, 255.0)
    # soft falloff rounds for shadow gradients connected to exterior
    trans = fill.copy()
    tol = tol_strict * 2.6
    for r in range(SOFT_ROUNDS):
        frontier = np.zeros((h, w), bool)
        frontier[1:, :] |= trans[:-1, :]; frontier[:-1, :] |= trans[1:, :]
        frontier[:, 1:] |= trans[:, :-1]; frontier[:, :-1] |= trans[:, 1:]
        frontier &= ~trans & ~fill  # only not-yet-treated pixels
        near = frontier & (d < tol)
        if not near.any():
            break
        a = np.clip((tol - d[near]) / max(tol - tol_strict, 1.0), 0, 1) * 230.0
        alpha[near] = np.minimum(alpha[near], np.maximum(alpha[near], a))
        alpha[near] = np.where(alpha[near] > a, a, alpha[near])
        trans |= near
        tol *= 0.82

    # gentle edge feather
    a_img = Image.fromarray(alpha.astype(np.uint8))
    a_img = a_img.filter(ImageFilter.GaussianBlur(0.8))
    alpha = np.asarray(a_img, np.float32)
    alpha[alpha < 12] = 0
    alpha[alpha > 242] = 255

    rgba = np.dstack([arr_rgb.astype(np.uint8), alpha.astype(np.uint8)])
    if captions:
        rgba = drop_captions(rgba)
    img = Image.fromarray(rgba)

    # trim to content bbox
    bbox = img.getbbox()  # uses alpha
    if bbox:
        pad = 6
        l, t, rr, b = bbox
        l = max(0, l - pad); t = max(0, t - pad)
        rr = min(img.width, rr + pad); b = min(img.height, b + pad)
        img = img.crop((l, t, rr, b))
    return img


def save_opt(img, path, size=224, colors=256):
    img = img.copy()
    img.thumbnail((size, size), Image.LANCZOS)
    try:
        q = img.quantize(colors=colors, method=Image.FASTOCTREE, dither=Image.FLOYDSTEINBERG)
        q.save(path, optimize=True)
    except Exception:
        img.save(path, optimize=True)
    return os.path.getsize(path)


sheet = np.asarray(Image.open(SRC_SHEET).convert("RGB"))
H, W, _ = sheet.shape
cw, ch = W // 3, H // 3
report = []
for i, name in enumerate(POSES):
    r, c = divmod(i, 3)
    cell = sheet[r * ch:(r + 1) * ch, c * cw:(c + 1) * cw]
    img = extract(cell, cut_bottom=0.03)  # tiny guard cut; captions removed by component filter
    p = os.path.join(OUT, f"pose_{name}.png")
    sz = save_opt(img, p, size=224)
    report.append((name, img.size, sz))

logo = np.asarray(Image.open(SRC_LOGO).convert("RGB"))
img = extract(logo, cut_bottom=0.0, tol_strict=30.0, captions=False)
p = os.path.join(OUT, "logo_vs.png")
sz = save_opt(img, p, size=340, colors=256)
report.append(("logo_vs", img.size, sz))

for name, box, sz in report:
    print(f"{name:12s} box={box} {sz/1024:6.1f} KB")
