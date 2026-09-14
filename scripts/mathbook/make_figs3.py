# -*- coding: utf-8 -*-
"""Final workbook: 6 extra bold question diagrams (coordinate geometry + area)."""
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

def save(fig, name):
    fig.savefig(os.path.join(OUT, name), dpi=180, facecolor='white')
    plt.close(fig)
    print('saved', name)

# ---------- 1. Treasure map: four points on a full grid ----------
fig, ax = plt.subplots(figsize=(6.2, 5.6), constrained_layout=True)
ax.set_facecolor('#fbfcfd')
for gx in range(-6, 7):
    ax.plot([gx, gx], [-6, 6], color='#c9d6dd', lw=0.6, zorder=0)
    ax.plot([-6, 6], [gx, gx], color='#c9d6dd', lw=0.6, zorder=0)
style_axes(ax)
ax.set_xlim(-6.8, 6.8); ax.set_ylim(-6.8, 6.8)
pts = {'A(2, 3)': (2, 3), 'B(-2, 3)': (-2, 3), 'C(4, -2)': (4, -2), 'D(-4, -2)': (-4, -2)}
for lbl, (x, y) in pts.items():
    ax.scatter([x], [y], s=110, color=RED, zorder=5)
ax.annotate('A(2, 3)', (2, 3), xytext=(2.35, 3.3), fontsize=13.5, fontweight='bold', color=INK)
ax.annotate('B(-2, 3)', (-2, 3), xytext=(-5.6, 3.3), fontsize=13.5, fontweight='bold', color=INK)
ax.annotate('C(4, -2)', (4, -2), xytext=(4.35, -2.6), fontsize=13.5, fontweight='bold', color=INK)
ax.annotate('D(-4, -2)', (-4, -2), xytext=(-5.9, -2.9), fontsize=13.5, fontweight='bold', color=INK)
ax.annotate('X', (6.55, -0.55), fontsize=14, fontweight='bold', color=INK)
ax.annotate('Y', (0.25, 6.45), fontsize=14, fontweight='bold', color=INK)
ax.set_title('Treasure map: four clue points on the grid', fontsize=13, color=INK, fontweight='bold', pad=10)
save(fig, 'f1d_treasure.png')

# ---------- 2. Rectangular park with missing 4th vertex ----------
fig, ax = plt.subplots(figsize=(6.0, 4.6), constrained_layout=True)
ax.set_facecolor('#fbfcfd')
for gx in range(0, 10):
    ax.plot([gx, gx], [0, 8], color='#c9d6dd', lw=0.6, zorder=0)
    ax.plot([0, 9], [gx, gx], color='#c9d6dd', lw=0.6, zorder=0)
style_axes(ax)
ax.set_xlim(-0.9, 9.9); ax.set_ylim(-0.9, 8.9)
ax.plot([1, 7, 7], [2, 2, 6], color=ACCENT, lw=3, zorder=3)
ax.plot([1, 7], [6, 6], color=ACCENT, lw=2, ls='--', zorder=3)
ax.scatter([1, 7, 7], [2, 2, 6], s=100, color=RED, zorder=5)
ax.annotate('P(1, 2)', (1, 2), xytext=(0.15, 1.05), fontsize=13.5, fontweight='bold', color=INK)
ax.annotate('Q(7, 2)', (7, 2), xytext=(7.25, 1.05), fontsize=13.5, fontweight='bold', color=INK)
ax.annotate('R(7, 6)', (7, 6), xytext=(7.25, 5.6), fontsize=13.5, fontweight='bold', color=INK)
ax.annotate('S = ?', (4, 6), xytext=(2.6, 6.35), fontsize=14, fontweight='bold', color=RED)
ax.annotate('6 units', (4, 2), xytext=(3.4, 1.0), fontsize=12, color=ACCENT, fontweight='bold')
ax.annotate('4 units', (7, 4), xytext=(7.75, 3.7), fontsize=12, color=ACCENT, fontweight='bold', rotation=90)
ax.set_title('Park PQRS: three corners known, S is missing', fontsize=13, color=INK, fontweight='bold', pad=10)
save(fig, 'f1d_flag.png')

# ---------- 3. Kite on the coordinate plane ----------
fig, ax = plt.subplots(figsize=(5.6, 5.8), constrained_layout=True)
ax.set_facecolor('#fbfcfd')
for gx in range(-6, 7):
    ax.plot([gx, gx], [-6, 6], color='#c9d6dd', lw=0.6, zorder=0)
    ax.plot([-6, 6], [gx, gx], color='#c9d6dd', lw=0.6, zorder=0)
style_axes(ax)
ax.set_xlim(-5.9, 5.9); ax.set_ylim(-6.6, 6.2)
kx = [0, 3, 0, -3, 0]; ky = [5, 0, -4, 0, 5]
ax.fill(kx, ky, color=FILL, alpha=0.85, zorder=2)
ax.plot(kx, ky, color=ACCENT, lw=3, zorder=3)
ax.scatter([0, 3, 0, -3], [5, 0, -4, 0], s=95, color=RED, zorder=5)
ax.annotate('A(0, 5)', (0, 5), xytext=(0.35, 5.15), fontsize=13.5, fontweight='bold', color=INK)
ax.annotate('B(3, 0)', (3, 0), xytext=(3.3, 0.35), fontsize=13.5, fontweight='bold', color=INK)
ax.annotate('C(0, -4)', (0, -4), xytext=(0.35, -4.8), fontsize=13.5, fontweight='bold', color=INK)
ax.annotate('D(-3, 0)', (-3, 0), xytext=-5.65 + np.array([0, 0.35]), fontsize=13.5, fontweight='bold', color=INK)
ax.annotate('O', (-0.45, -0.65), fontsize=12, color=INK, fontweight='bold')
ax.set_title('Kite ABCD pinned on the axes', fontsize=13, color=INK, fontweight='bold', pad=10)
save(fig, 'f1d_kite.png')

# ---------- 4. Circular park with a concentric pond ----------
fig, ax = plt.subplots(figsize=(5.6, 5.4), constrained_layout=True)
R, r = 5, 2.6
outer = plt.Circle((0, 0), R, color=FILL, ec=ACCENT, lw=3, zorder=2)
pond = plt.Circle((0, 0), r, color='white', ec=RED, lw=2.6, zorder=3)
ax.add_patch(outer); ax.add_patch(pond)
ax.scatter([0], [0], s=70, color=INK, zorder=6)
ax.annotate('O', (0, 0), xytext=(-0.65, -0.85), fontsize=13.5, fontweight='bold', color=INK)
ax.plot([0, R], [0, 0], color=ACCENT, lw=2.2, zorder=4)
ax.plot([0, r], [0, 0], color=RED, lw=2.2, ls='--', zorder=5)
ax.annotate('R = 21 m', (R/2, 0), xytext=(R/2 - 1.3, 0.55), fontsize=13, fontweight='bold', color=ACCENT)
ax.annotate('r = 7 m', (r/2, 0), xytext=(r/2 - 1.15, -1.15), fontsize=13, fontweight='bold', color=RED)
th = np.linspace(0, np.pi/3, 40)
ax.plot(R*np.cos(th), R*np.sin(th), color=WARN, lw=0)
ax.set_xlim(-6.4, 6.4); ax.set_ylim(-6.2, 6.2)
ax.set_aspect('equal'); ax.axis('off')
ax.set_title('Circular park: walking ring between pond and gate circle', fontsize=12.5, color=INK, fontweight='bold', pad=10)
save(fig, 'f6d_park.png')

# ---------- 5. Window: rectangle + semicircle on top ----------
fig, ax = plt.subplots(figsize=(6.4, 5.2), constrained_layout=True)
w, h = 4.0, 3.0
rect = mpatches.Rectangle((0, 0), w, h, fill=True, facecolor=FILL, edgecolor=ACCENT, lw=3, zorder=2)
semi = mpatches.Wedge((w/2, h), w/2, 0, 180, fill=True, facecolor='#f5e3e8', edgecolor=RED, lw=3, zorder=2)
ax.add_patch(rect); ax.add_patch(semi)
ax.annotate('2.8 m', (w/2, h), xytext=(w/2 - 0.62, h + w/2 + 0.32), fontsize=13.5, fontweight='bold', color=RED)
ax.annotate('1.6 m', (w/2, h/2), xytext=(w/2 - 0.6, h/2 - 0.25), fontsize=13.5, fontweight='bold', color=ACCENT)
ax.plot([w/2, w/2], [0, h], color=INK, lw=1.4, ls=':', zorder=3)
ax.annotate('', (w/2, h - 0.05), xytext=(w/2, h + w/2 - 0.05),
            arrowprops=dict(arrowstyle='<->', color=INK, lw=1.4))
ax.set_xlim(-0.8, 4.8); ax.set_ylim(-0.7, 5.6)
ax.set_aspect('equal'); ax.axis('off')
ax.set_title('Nursery window: rectangle + semicircular arch', fontsize=12.5, color=INK, fontweight='bold', pad=10)
save(fig, 'f6d_window.png')

# ---------- 6. L-shaped lawn ----------
fig, ax = plt.subplots(figsize=(6.6, 5.0), constrained_layout=True)
ax.fill([0, 14, 14, 6, 6, 0], [0, 0, 8, 8, 13, 13], color=FILL, ec=ACCENT, lw=3, zorder=2)
ax.plot([6, 6], [8, 13], color=ACCENT, lw=2, ls='--', zorder=3)
ax.plot([6, 14], [8, 8], color=ACCENT, lw=2, ls='--', zorder=3)
ax.annotate('14 m', (7, 0), xytext=(5.9, -1.35), fontsize=13.5, fontweight='bold', color=INK)
ax.annotate('13 m', (0, 6.5), xytext=-1.9 + np.array([0, -0.35]), fontsize=13.5, fontweight='bold', color=INK, rotation=90)
ax.annotate('8 m', (14, 4), xytext=(14.45, 3.6), fontsize=13.5, fontweight='bold', color=INK, rotation=90)
ax.annotate('8 m', (10, 8), xytext=(9.2, 8.35), fontsize=13, fontweight='bold', color=RED)
ax.annotate('6 m', (6, 10.5), xytext=(4.95, 10.15), fontsize=13, fontweight='bold', color=RED, rotation=90)
ax.set_xlim(-2.6, 16.2); ax.set_ylim(-2.3, 14.6)
ax.set_aspect('equal'); ax.axis('off')
ax.set_title('L-shaped lawn (all angles are right angles)', fontsize=13, color=INK, fontweight='bold', pad=10)
save(fig, 'f6d_lawn.png')

print('ALL FIGS DONE')
