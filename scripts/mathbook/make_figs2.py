# -*- coding: utf-8 -*-
"""Question-specific diagrams for the full workbook - bold, clear, exam-style."""
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

INK    = '#334650'   # dark slate
ACCENT = '#3681a6'   # blue
RED    = '#b43a4e'
FILL   = '#dcebf3'   # pale blue
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

# ---------- 1. Delivery walk: O(0,0) -> A(4,0) -> B(4,3) ----------
fig, ax = plt.subplots(figsize=(6.4, 4.6), constrained_layout=True)
pts = {'O(0, 0)': (0, 0), 'A(4, 0)': (4, 0), 'B(4, 3)': (4, 3)}
xs = [0, 4, 4, 0]; ys = [0, 0, 3, 0]
ax.plot(xs, ys, color=ACCENT, lw=3, zorder=2)
for lbl, (x, y) in pts.items():
    ax.scatter([x], [y], s=90, color=RED, zorder=3)
off = {'O(0, 0)': (-0.55, -0.55), 'A(4, 0)': (0, -0.6), 'B(4, 3)': (0.25, 0.25)}
for lbl, (x, y) in pts.items():
    ax.annotate(lbl, (x, y), xytext=(x + off[lbl][0], y + off[lbl][1]),
                fontsize=14, fontweight='bold', color=INK)
ax.annotate('4 km', (2, 0), xytext=(2, -0.75), fontsize=13, color=ACCENT,
            ha='center', fontweight='bold')
ax.annotate('3 km', (4, 1.5), xytext=(4.65, 1.5), fontsize=13, color=ACCENT,
            ha='center', fontweight='bold', rotation=90)
ax.annotate('?', (2, 1.5), xytext=(1.55, 1.75), fontsize=16, color=RED,
            ha='center', fontweight='bold')
ax.plot([3.72, 3.72], [0, 0.28], color=INK, lw=1.6)
ax.plot([3.72, 4], [0.28, 0.28], color=INK, lw=1.6)
ax.set_xlim(-1.4, 6); ax.set_ylim(-1.6, 4.2)
ax.set_xticks(range(-1, 7)); ax.set_yticks(range(-1, 5))
ax.set_aspect('equal')
style_axes(ax)
save(fig, 'f1d_walk.png')

# ---------- 2. Robot grid: S(1,1) -> T(7,4) ----------
fig, ax = plt.subplots(figsize=(7.4, 4.6), constrained_layout=True)
for gx in range(0, 9):
    ax.plot([gx, gx], [0, 5], color='#c9d4da', lw=0.9, zorder=1)
for gy in range(0, 6):
    ax.plot([0, 8], [gy, gy], color='#c9d4da', lw=0.9, zorder=1)
# ground path (L-shape): (1,1)->(7,1)->(7,4)
ax.plot([1, 7, 7], [1, 1, 4], color=ACCENT, lw=3.2, zorder=3,
        solid_capstyle='round', label='Ground robot (grid path) = 6 + 3 = 9 units')
# flying path (direct)
ax.plot([1, 7], [1, 4], color=RED, lw=2.6, ls='--', zorder=3,
        label='Flying robot (direct) = ?')
ax.scatter([1, 7], [1, 4], s=130, color=INK, zorder=4)
ax.annotate('S(1, 1)', (1, 1), xytext=(0.55, 0.45), fontsize=14, fontweight='bold', color=INK)
ax.annotate('T(7, 4)', (7, 4), xytext=(7.15, 4.15), fontsize=14, fontweight='bold', color=INK)
ax.annotate('6 units', (4, 1), xytext=(4, 0.55), fontsize=12.5, color=ACCENT,
            ha='center', fontweight='bold')
ax.annotate('3 units', (7, 2.5), xytext=(7.5, 2.5), fontsize=12.5, color=ACCENT,
            ha='center', fontweight='bold', rotation=90)
leg = ax.legend(loc='upper left', fontsize=11.5, framealpha=0.95, edgecolor='#c9d4da')
ax.set_xlim(-0.5, 8.8); ax.set_ylim(0, 5.3)
ax.set_aspect('equal')
ax.axis('off')
save(fig, 'f1d_robot.png')

# ---------- 3. Lines y = 3x + 1 and y = -3x + 1 ----------
fig, ax = plt.subplots(figsize=(6.6, 5.2), constrained_layout=True)
x = np.linspace(-1.6, 1.6, 100)
ax.plot(x, 3 * x + 1, color=ACCENT, lw=3, label='y = 3x + 1')
ax.plot(x, -3 * x + 1, color=RED, lw=3, label='y = -3x + 1')
ax.scatter([0], [1], s=110, color=INK, zorder=4)
ax.annotate('(0, 1)', (0, 1), xytext=(0.12, 1.45), fontsize=13.5, fontweight='bold', color=INK)
style_axes(ax)
ax.set_xlim(-1.8, 1.8); ax.set_ylim(-4.4, 6.2)
ax.set_xticks(range(-1, 2)); ax.set_yticks(range(-4, 7, 2))
ax.legend(loc='upper center', fontsize=12.5, framealpha=0.95, edgecolor='#c9d4da')
ax.set_aspect('auto')
save(fig, 'f2d_lines.png')

# ---------- 4. Quadrilateral with diagonal (7, 24, 26, 17, AC=25) ----------
fig, ax = plt.subplots(figsize=(7.2, 6.4), constrained_layout=True)
A = np.array([0.0, 0.0]); C = np.array([25.0, 0.0])
bx = (7**2 + 25**2 - 24**2) / (2 * 25); by = np.sqrt(49 - bx**2)
B = np.array([bx, by])
dx = (17**2 + 25**2 - 26**2) / (2 * 25); dy = -np.sqrt(289 - dx**2)
D = np.array([dx, dy])
poly = plt.Polygon([A, B, C, D], closed=True, facecolor=FILL, edgecolor=INK, lw=2.6, zorder=2)
ax.add_patch(poly)
ax.plot([A[0], C[0]], [A[1], C[1]], color=RED, lw=2.2, ls='--', zorder=3)
for P, lbl, off in [(A, 'A', (-2.3, -2.5)), (B, 'B', (-3.4, 0.9)), (C, 'C', (1.6, -2.5)), (D, 'D', (-3.2, -1.4))]:
    ax.scatter(*P, s=80, color=INK, zorder=4)
    ax.annotate(lbl, P, xytext=(P[0] + off[0], P[1] + off[1]), fontsize=16, fontweight='bold', color=INK)
def midlab(P, Q, txt, dy=1.1, dx=0.0, col=INK):
    mx, my = (P[0] + Q[0]) / 2 + dx, (P[1] + Q[1]) / 2 + dy
    ax.text(mx, my, txt, fontsize=13.5, fontweight='bold', color=col, ha='center')
midlab(A, B, '7 cm', dx=-2.4, dy=0.9)
midlab(B, C, '24 cm', dx=1.8, dy=1.0)
midlab(C, D, '26 cm', dx=2.2, dy=-0.4)
midlab(D, A, '17 cm', dx=-2.6, dy=-0.9)
midlab(A, C, 'AC = 25 cm', dy=1.0, col=RED)
ax.set_xlim(-5, 30); ax.set_ylim(-21, 11)
ax.set_aspect('equal'); ax.axis('off')
save(fig, 'f6d_quad.png')

# ---------- 5. Running track: straights 90 m, semicircle ends d = 56 m ----------
fig, ax = plt.subplots(figsize=(8.0, 4.4), constrained_layout=True)
r = 28.0; L = 90.0
th = np.linspace(np.pi / 2, 3 * np.pi / 2, 100)
ax.plot(L + r * np.cos(th), r + r * np.sin(th), color=INK, lw=3)
th = np.linspace(-np.pi / 2, np.pi / 2, 100)
ax.plot(r * np.cos(th), r + r * np.sin(th), color=INK, lw=3)
ax.plot([0, L], [0, 0], color=INK, lw=3)
ax.plot([0, L], [2 * r, 2 * r], color=INK, lw=3)
ax.add_patch(plt.Rectangle((0, 0), L, 2 * r, facecolor=FILL, zorder=0))
ax.add_patch(mpatches.Wedge((L, r), r, -90, 90, facecolor=FILL, zorder=0))
ax.add_patch(mpatches.Wedge((0, r), r, 90, 270, facecolor=FILL, zorder=0))
ax.annotate('90 m', (L / 2, 0), xytext=(L / 2, -7), fontsize=13.5, fontweight='bold',
            color=INK, ha='center')
ax.annotate('90 m', (L / 2, 2 * r), xytext=(L / 2, 2 * r + 5), fontsize=13.5,
            fontweight='bold', color=INK, ha='center')
ax.annotate('', xy=(0, r), xytext=(r, r), arrowprops=dict(arrowstyle='<->', color=RED, lw=2))
ax.annotate('d = 56 m', (r / 2, r), xytext=(r / 2 + 2, r + 4.5), fontsize=13.5,
            fontweight='bold', color=RED)
ax.set_xlim(-14, L + 42); ax.set_ylim(-16, 78)
ax.set_aspect('equal'); ax.axis('off')
save(fig, 'f6d_track.png')

# ---------- 6. Goat grazing: 40 x 30 field, rope 21 at corner ----------
fig, ax = plt.subplots(figsize=(7.0, 5.4), constrained_layout=True)
ax.add_patch(plt.Rectangle((0, 0), 40, 30, facecolor='white', edgecolor=INK, lw=2.6))
th = np.linspace(0, np.pi / 2, 100)
ax.fill_between(21 * np.cos(th), 21 * np.sin(th), 0, color=FILL, zorder=1)
ax.plot(21 * np.cos(th), 21 * np.sin(th), color=RED, lw=2.8, zorder=3)
ax.scatter([0], [0], s=120, color=INK, zorder=4)
ax.annotate('Goat tied here', (0, 0), xytext=(1.2, 1.2), fontsize=13, fontweight='bold', color=INK)
ax.plot([0, 21], [0, 0], color=RED, lw=2, ls=':')
ax.annotate('rope = 21 m', (10.5, 0), xytext=(11, -3.4), fontsize=13, color=RED, fontweight='bold')
ax.annotate('40 m', (20, 30), xytext=(20, 32), fontsize=13.5, fontweight='bold', color=INK, ha='center')
ax.annotate('30 m', (40, 15), xytext=(42.2, 14.5), fontsize=13.5, fontweight='bold', color=INK)
ax.annotate('grazing area', (8, 4.5), fontsize=12.5, color=INK, style='italic')
ax.set_xlim(-4, 48); ax.set_ylim(-7, 36)
ax.set_aspect('equal'); ax.axis('off')
save(fig, 'f6d_goat.png')

# ---------- 7. Dartboard: 20 cm square, centre circle d = 10 ----------
fig, ax = plt.subplots(figsize=(5.6, 5.4), constrained_layout=True)
ax.add_patch(plt.Rectangle((0, 0), 20, 20, facecolor=FILL, edgecolor=INK, lw=2.8))
circ = plt.Circle((10, 10), 5, facecolor=PALE, edgecolor=RED, lw=2.8)
ax.add_patch(circ)
ax.scatter([10], [10], s=40, color=INK, zorder=4)
ax.annotate('centre', (10, 10), xytext=(11.2, 10.8), fontsize=12, color=INK)
ax.annotate('10 cm', (5, 20), xytext=(5, 21.1), fontsize=13.5, fontweight='bold', color=INK, ha='center')
ax.plot([10, 15], [10, 10], color=RED, lw=2, ls=':')
ax.annotate('r = 5', (12.5, 10), xytext=(12.2, 8.3), fontsize=12.5, color=RED, fontweight='bold')
ax.annotate('20 cm', (20, 10), xytext=(21.4, 9.6), fontsize=13.5, fontweight='bold', color=INK, rotation=90)
ax.set_xlim(-2.5, 23.5); ax.set_ylim(-2.5, 23.5)
ax.set_aspect('equal'); ax.axis('off')
save(fig, 'f7d_dart.png')

# ---------- 8. Spinner: A 90, B 150, C 120 ----------
fig, ax = plt.subplots(figsize=(5.6, 5.4), constrained_layout=True)
segs = [(90, FILL, 'A', INK), (150, PALE, 'B', INK), (120, '#e3d3da', 'C', INK)]
start = 90
for ang, col, lbl, tc in segs:
    w = mpatches.Wedge((0, 0), 10, start, start + ang, facecolor=col, edgecolor=INK, lw=2.6)
    ax.add_patch(w)
    mid = np.deg2rad(start + ang / 2)
    ax.annotate(lbl, (0, 0), xytext=(6.3 * np.cos(mid), 6.3 * np.sin(mid)),
                fontsize=17, fontweight='bold', color=tc, ha='center', va='center')
    ax.annotate('%d%s' % (ang, '\u00b0'), (0, 0), xytext=(8.6 * np.cos(mid), 8.6 * np.sin(mid)),
                fontsize=12.5, color='#6f7578', ha='center', va='center')
    start += ang
ax.scatter([0], [0], s=70, color=INK, zorder=4)
ax.set_xlim(-11.5, 11.5); ax.set_ylim(-11.5, 11.5)
ax.set_aspect('equal'); ax.axis('off')
save(fig, 'f7d_spinner.png')

print('ALL QUESTION FIGURES DONE')
