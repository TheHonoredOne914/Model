# -*- coding: utf-8 -*-
"""Chapter 8 (Sequences & Progressions): 8 bold question diagrams."""
import matplotlib
matplotlib.use('Agg')
import matplotlib.font_manager as fm
fm.fontManager.addfont('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf')
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
import numpy as np
import os

plt.rcParams['font.sans-serif'] = ['DejaVu Sans']
plt.rcParams['axes.unicode_minus'] = False

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'figs')
os.makedirs(OUT, exist_ok=True)

INK    = '#334650'
ACCENT = '#3681a6'
RED    = '#b43a4e'
FILL   = '#dcebf3'
WARN   = '#a18347'
PALE   = '#f0e6d2'
GREEN  = '#4a8c5c'

def save(fig, name):
    fig.savefig(os.path.join(OUT, name), dpi=180, facecolor='white')
    plt.close(fig)
    print('saved', name)

def style_axes(ax):
    ax.spines['left'].set_position('zero')
    ax.spines['bottom'].set_position('zero')
    ax.spines['top'].set_visible(False)
    ax.spines['right'].set_visible(False)
    ax.spines['left'].set_linewidth(1.6)
    ax.spines['bottom'].set_linewidth(1.6)
    ax.spines['left'].set_color(INK)
    ax.spines['bottom'].set_color(INK)
    ax.tick_params(colors=INK, labelsize=11)

# ---------- 1. Triangular dot numbers 1, 3, 6, 10 ----------
fig, ax = plt.subplots(figsize=(7.4, 3.2), constrained_layout=True)
ax.set_facecolor('#fbfcfd')
ax.set_xlim(0, 14.6); ax.set_ylim(-0.4, 5.0)
ax.axis('off')
rows = {1: 1, 3: 2, 6: 3, 10: 4}
xoff = {1: 0.8, 3: 4.0, 6: 8.0, 10: 12.4}
for T, k in rows.items():
    for r in range(k):
        n = r + 1
        for c in range(n):
            ax.scatter([xoff[T] + c - (n - 1) / 2], [k - 1 - r + 0.4],
                       s=95, color=ACCENT, edgecolor=INK, linewidth=1.0, zorder=3)
    ax.annotate('T%d = %d' % (k, T), (xoff[T], -0.05), ha='center',
                fontsize=13.5, fontweight='bold', color=INK)
ax.set_title('Triangular numbers: each new row adds one more dot', fontsize=13,
             color=INK, fontweight='bold', pad=8)
save(fig, 'f8d_tri.png')

# ---------- 2. Growing square pattern: 1, 5, 9, 13 (4 added at corners) ----------
fig, axs = plt.subplots(1, 4, figsize=(9.4, 3.1), constrained_layout=True)
def stage_squares(ax, k):
    """k-th stage: centre cell + 4 squares at each diagonal corner ring m = 1..k-1."""
    ax.set_facecolor('#fbfcfd')
    lim = k - 0.4
    ax.set_xlim(-lim, lim); ax.set_ylim(-lim - 1.05, lim)
    ax.set_aspect('equal'); ax.axis('off')
    cells = [(0, 0)]
    for m in range(1, k):
        cells += [(m, m), (m, -m), (-m, m), (-m, -m)]
    for j, (cx, cy) in enumerate(cells):
        col = FILL if (cx, cy) == (0, 0) else PALE
        ax.add_patch(mpatches.Rectangle((cx - 0.5, cy - 0.5), 1, 1,
                                        facecolor=col, edgecolor=INK,
                                        lw=1.8 if (cx, cy) == (0, 0) else 1.4, zorder=3))
    ax.annotate('Stage %d: %d' % (k, 1 + 4 * (k - 1)), (0, -lim - 0.35), ha='center',
                fontsize=13, fontweight='bold', color=RED)
for i, ax in enumerate(axs, 1):
    stage_squares(ax, i)
fig.suptitle('Growing pattern of squares: 1, 5, 9, 13, ...', fontsize=13, color=INK, fontweight='bold')
save(fig, 'f8d_grow.png')

# ---------- 3. Doubling green squares: 3, 6, 12, 24 ----------
fig, axs = plt.subplots(1, 4, figsize=(9.4, 3.1), constrained_layout=True)
def stage_double(ax, k):
    """Stage k: 3 rows x 2^(k-1) columns; square shrinks so frame stays 1 wide."""
    ax.set_facecolor('#fbfcfd')
    ax.set_aspect('equal'); ax.axis('off')
    cols = 2 ** (k - 1)
    s = 1.0 / cols
    ax.set_xlim(-0.14, 1.14); ax.set_ylim(-0.52, 3 * s + 0.14)
    for r in range(3):
        for c in range(cols):
            ax.add_patch(mpatches.Rectangle((c * s, r * s), s, s,
                                            facecolor='#d9ead3', edgecolor=INK,
                                            lw=max(0.7, 1.6 * s * cols ** 0.3), zorder=3))
    ax.annotate('Stage %d: %d' % (k, 3 * cols), (0.5, -0.30), ha='center',
                fontsize=13, fontweight='bold', color=RED)
for i, ax in enumerate(axs, 1):
    stage_double(ax, i)
fig.suptitle('Green squares double at every stage: 3, 6, 12, 24, ...', fontsize=13, color=INK, fontweight='bold')
save(fig, 'f8d_double.png')

# ---------- 4. AP points on a straight line ----------
fig, ax = plt.subplots(figsize=(6.2, 5.0), constrained_layout=True)
ax.set_facecolor('#fbfcfd')
style_axes(ax)
ax.set_xlim(0, 6.9); ax.set_ylim(0, 19.9)
xs = np.array([1, 2, 3, 4, 5])
ys = np.array([1, 5, 9, 13, 17])
ax.plot(xs, 4 * xs - 3, color=ACCENT, lw=2.2, zorder=2, alpha=0.85)
ax.scatter(xs, ys, s=110, color=RED, zorder=5)
for x, y in zip(xs, ys):
    ax.annotate('(%d, %d)' % (x, y), (x, y), xytext=(x + 0.15, y + 0.55),
                fontsize=12.5, fontweight='bold', color=INK)
ax.annotate('y = 4x - 3', (4.55, 4 * 4.55 - 3 - 1.7), fontsize=13, color=ACCENT,
            fontweight='bold', rotation=0)
ax.annotate('X', (6.6, 0.35), fontsize=14, fontweight='bold', color=INK)
ax.annotate('Y', (0.18, 19.4), fontsize=14, fontweight='bold', color=INK)
ax.set_title('AP: (1,1), (2,5), (3,9), (4,13), (5,17) - all on ONE line',
             fontsize=12.5, color=INK, fontweight='bold', pad=10)
save(fig, 'f8d_apline.png')

# ---------- 5. GP points on a curve ----------
fig, ax = plt.subplots(figsize=(6.2, 5.0), constrained_layout=True)
ax.set_facecolor('#fbfcfd')
style_axes(ax)
ax.set_xlim(0, 6.4); ax.set_ylim(0, 54)
xs = np.array([1, 2, 3, 4, 5])
ys = np.array([3, 6, 12, 24, 48])
xx = np.linspace(0.85, 5.05, 200)
ax.plot(xx, 3 * 2 ** (xx - 1), color=WARN, lw=2.2, zorder=2, alpha=0.9)
ax.scatter(xs, ys, s=110, color=RED, zorder=5)
for x, y in zip(xs, ys):
    ax.annotate('(%d, %d)' % (x, y), (x, y), xytext=(x + 0.12, y + 1.4),
                fontsize=12.5, fontweight='bold', color=INK)
ax.annotate('X', (6.1, 1.2), fontsize=14, fontweight='bold', color=INK)
ax.annotate('Y', (0.18, 51.5), fontsize=14, fontweight='bold', color=INK)
ax.set_title('GP: (1,3), (2,6), (3,12), (4,24), (5,48) - NOT on a line',
             fontsize=12.5, color=INK, fontweight='bold', pad=10)
save(fig, 'f8d_gpcurve.png')

# ---------- 6. Sierpinski triangle stages 0-3 ----------
def sier_points(order, x0, y0, x1, y1, x2, y2, acc):
    """Store the 3^order upright black triangles as vertex triples."""
    if order == 0:
        acc.append((x0, y0, x1, y1, x2, y2))
        return
    mx01, my01 = (x0 + x1) / 2, (y0 + y1) / 2
    mx12, my12 = (x1 + x2) / 2, (y1 + y2) / 2
    mx02, my02 = (x0 + x2) / 2, (y0 + y2) / 2
    sier_points(order - 1, x0, y0, mx01, my01, mx02, my02, acc)
    sier_points(order - 1, mx01, my01, x1, y1, mx12, my12, acc)
    sier_points(order - 1, mx02, my02, mx12, my12, x2, y2, acc)

fig, axs = plt.subplots(1, 4, figsize=(9.6, 3.0), constrained_layout=True)
for i, ax in enumerate(axs):
    order = i
    ax.set_facecolor('#fbfcfd')
    ax.set_aspect('equal'); ax.axis('off')
    ax.set_xlim(-0.15, 1.15); ax.set_ylim(-0.30, 1.15)
    acc = []
    sier_points(order, 0, 0, 1, 0, 0.5, np.sqrt(3) / 2, acc)
    for (x0, y0, x1, y1, x2, y2) in acc:
        ax.fill([x0, x1, x2], [y0, y1, y2], color=INK, zorder=2)
    ax.annotate('Stage %d: %d' % (order, 3 ** order), (0.5, -0.16), ha='center',
                fontsize=13, fontweight='bold', color=RED,
                transform=ax.transData)
fig.suptitle('Sierpinski triangle: every black triangle splits into 3',
             fontsize=13, color=INK, fontweight='bold')
save(fig, 'f8d_sier.png')

# ---------- 7. Sierpinski carpet stages 0-2 ----------
def carpet_holes(order, x, y, s, holes):
    if order == 0:
        return
    t = s / 3
    holes.append((x + t, y + t, t))
    for dy in range(3):
        for dx in range(3):
            if dx == 1 and dy == 1:
                continue
            carpet_holes(order - 1, x + dx * t, y + dy * t, t, holes)

fig, axs = plt.subplots(1, 3, figsize=(7.6, 3.0), constrained_layout=True)
for i, ax in enumerate(axs):
    ax.set_facecolor('#fbfcfd')
    ax.set_aspect('equal'); ax.axis('off')
    ax.set_xlim(-0.12, 1.12); ax.set_ylim(-0.14, 1.12)
    ax.add_patch(mpatches.Rectangle((0, 0), 1, 1, facecolor=RED, edgecolor=INK, lw=1.6))
    holes = []
    carpet_holes(i, 0, 0, 1, holes)
    for (hx, hy, hs) in holes:
        ax.add_patch(mpatches.Rectangle((hx, hy), hs, hs, facecolor='white',
                                        edgecolor=INK, lw=0.9))
    kept = 8 ** i
    ax.annotate('Stage %d: %d' % (i, kept), (0.5, -0.08), ha='center',
                fontsize=13, fontweight='bold', color=INK)
fig.suptitle('Sierpinski square carpet: each red square keeps 8 children',
             fontsize=13, color=INK, fontweight='bold')
save(fig, 'f8d_carpet.png')

# ---------- 8. Bouncing ball (24 ft, r = 3/4) ----------
fig, ax = plt.subplots(figsize=(7.2, 4.8), constrained_layout=True)
ax.set_facecolor('#fbfcfd')
h = [24.0]
for i in range(8):
    h.append(h[-1] * 0.75)
# initial drop (steepening curve) from (0, 24) to (0.55, 0)
tt = np.linspace(0, 1, 80)
ax.plot(0.55 * tt, 24 * (1 - tt ** 2.2), color=RED, lw=2.4, zorder=3)
ax.annotate('drop: 24 ft', (0.02, 24), xytext=(0.6, 24.6), fontsize=12,
            fontweight='bold', color=RED)
ax.scatter([0], [24], s=70, color=RED, zorder=6)
# bounce arcs: arc j rises to h[j] (j = 1..8)
x0 = 0.55; W = 0.82
for j in range(1, 9):
    xx = x0 + (j - 1) * W
    yy = h[j] * np.sin(np.pi * tt)
    ax.plot(xx + W * tt, yy, color=ACCENT, lw=2.4, zorder=3)
    ax.annotate('%.2f' % h[j], (xx + W / 2, h[j] + 0.7), ha='center',
                fontsize=10.5, fontweight='bold', color=INK)
ax.axhline(0, color=INK, lw=2.2)
ax.axhline(4, color=WARN, lw=1.4, ls='--', zorder=2)
ax.annotate('1/6 of 24 ft = 4 ft', (5.1, 4.6), fontsize=11, fontweight='bold', color=WARN)
ax.annotate('after the 7th bounce the peak (3.20 ft) is below 4 ft', (2.1, 7.6),
            fontsize=11, color=ACCENT, fontweight='bold')
ax.set_xlim(-0.2, 8.2); ax.set_ylim(0, 28)
ax.set_xlabel('ground hits / bounces', fontsize=11, color=INK)
ax.set_ylabel('height (ft)', fontsize=11, color=INK)
ax.spines['top'].set_visible(False); ax.spines['right'].set_visible(False)
ax.spines['left'].set_color(INK); ax.spines['bottom'].set_color(INK)
ax.tick_params(colors=INK, labelsize=10)
ax.set_title('Bouncing ball: 24, 18, 13.5, 10.125, ... - a shrinking GP',
             fontsize=13, color=INK, fontweight='bold', pad=10)
save(fig, 'f8d_ball.png')

print('All chapter 8 figures done.')
