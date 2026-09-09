# -*- coding: utf-8 -*-
"""Generate all figures for the practice book (palette-consistent, English labels)."""
import os, math
import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.font_manager as fm
fm.fontManager.addfont('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf')
import matplotlib.pyplot as plt
from matplotlib.patches import (Rectangle, Circle, FancyArrowPatch, Arc,
                                Polygon, Wedge, FancyBboxPatch)

plt.rcParams['font.sans-serif'] = ['DejaVu Sans']
plt.rcParams['axes.unicode_minus'] = False

ACC = '#3681a6'; HDR = '#334650'; ICN = '#52798c'; BRD = '#b8c8cf'
ACC2 = '#b43a4e'; CARD = '#e4e7e8'; MUT = '#6f7578'; GOLD = '#a18347'; GRN = '#46875c'

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'figs')
os.makedirs(OUT, exist_ok=True)

def newfig(w=7.0, h=4.4):
    fig, ax = plt.subplots(figsize=(w, h), constrained_layout=True)
    return fig, ax

def clean(ax):
    ax.spines['top'].set_visible(False); ax.spines['right'].set_visible(False)
    ax.spines['left'].set_color(BRD); ax.spines['bottom'].set_color(BRD)
    ax.tick_params(colors=MUT, labelsize=9)

def save(fig, name):
    fig.savefig(os.path.join(OUT, name), dpi=200, facecolor='white')
    plt.close(fig)
    print('saved', name)

# ================= CHAPTER 1 =================
def f1_plane():
    fig, ax = newfig(7.2, 5.6)
    for s in range(-6, 7):
        ax.axhline(s, color=BRD, lw=0.4, zorder=0); ax.axvline(s, color=BRD, lw=0.4, zorder=0)
    ax.axhline(0, color=HDR, lw=1.4, zorder=2); ax.axvline(0, color=HDR, lw=1.4, zorder=2)
    ax.annotate('', xy=(6.6, 0), xytext=(-6.6, 0), arrowprops=dict(arrowstyle='->', color=HDR, lw=1.4))
    ax.annotate('', xy=(0, 6.6), xytext=(0, -6.6), arrowprops=dict(arrowstyle='->', color=HDR, lw=1.4))
    ax.text(6.5, 0.35, 'x-axis', fontsize=10, color=HDR)
    ax.text(0.25, 6.4, 'y-axis', fontsize=10, color=HDR)
    quad = dict(fontsize=11, color=ICN, style='italic')
    ax.text(3.6, 5.6, 'Quadrant I\n(+, +)', ha='center', **quad)
    ax.text(-3.6, 5.6, 'Quadrant II\n(-, +)', ha='center', **quad)
    ax.text(-3.6, -5.6, 'Quadrant III\n(-, -)', ha='center', **quad)
    ax.text(3.6, -5.6, 'Quadrant IV\n(+, -)', ha='center', **quad)
    pts = [(4, 3, 'A (4, 3)'), (-5, 2, 'B (-5, 2)'), (-2, -4, 'C (-2, -4)'), (3, -5, 'D (3, -5)'),
           (4.5, 0, 'P (4.5, 0)'), (0, -4.5, 'Q (0, -4.5)'), (0, 0, 'O (0, 0)')]
    for x, y, lab in pts:
        ax.plot(x, y, 'o', color=ACC2, ms=6, zorder=5)
        dx, dy = 0.25, 0.3
        if x < 0: dx = -1.4
        if y < 0: dy = -0.75
        if (x, y) == (0, 0): dy = -0.8
        ax.text(x + dx, y + dy, lab, fontsize=9.5, color=HDR)
    ax.plot([4, 4], [0, 3], ls=':', color=ICN, lw=1.2)
    ax.plot([0, 4], [3, 3], ls=':', color=ICN, lw=1.2)
    ax.set_xlim(-7, 7); ax.set_ylim(-7, 7); ax.set_aspect('equal'); ax.axis('off')
    save(fig, 'f1_plane.png')

def f1_dist():
    fig, ax = newfig(6.4, 4.6)
    A, D = (3, 4), (7, 1)
    C = (3, 1)
    ax.plot([A[0], D[0]], [A[1], D[1]], color=ACC, lw=2.4, zorder=3)
    ax.plot([A[0], C[0]], [A[1], C[1]], ls='--', color=ICN, lw=1.6)
    ax.plot([C[0], D[0]], [C[1], D[1]], ls='--', color=ICN, lw=1.6)
    ax.plot(*A, 'o', color=ACC2, ms=7); ax.plot(*D, 'o', color=ACC2, ms=7)
    ax.plot(*C, 's', color=MUT, ms=4)
    ax.text(A[0] - 0.15, A[1] + 0.25, 'A (3, 4)', fontsize=10, color=HDR)
    ax.text(D[0] + 0.12, D[1] - 0.4, 'D (7, 1)', fontsize=10, color=HDR)
    ax.text(3.35, 2.35, 'AC = |4 - 1| = 3', fontsize=9.5, color=ICN, rotation=90)
    ax.text(4.35, 0.68, 'CD = |7 - 3| = 4', fontsize=9.5, color=ICN)
    ax.text(4.55, 2.95, 'AD = sqrt(4^2 + 3^2) = 5', fontsize=10, color=ACC2)
    ax.plot([C[0]], [C[1]], marker='+', color=MUT, ms=10, mew=1.5)
    ax.set_xlim(1.5, 8.5); ax.set_ylim(0, 5.2); clean(ax)
    ax.set_xticks(range(2, 9)); ax.set_yticks(range(0, 6))
    ax.grid(True, ls='--', alpha=0.2, color=BRD)
    save(fig, 'f1_dist.png')

def f1_reflect():
    fig, ax = newfig(6.6, 4.6)
    ax.axhline(0, color=HDR, lw=1.3); ax.axvline(0, color=HDR, lw=1.3)
    pts = [(2, 3), (-2, 3), (2, -3), (-2, -3)]
    labs = ['A (2, 3)', "A' (-2, 3)\nreflect in y-axis", "A'' (2, -3)\nreflect in x-axis",
            "A''' (-2, -3)\nreflect in both"]
    offs = [(0.2, 0.25), (-2.6, 0.25), (0.2, -0.75), (-2.9, -0.75)]
    for (x, y), lab, (dx, dy) in zip(pts, labs, offs):
        ax.plot(x, y, 'o', color=ACC2, ms=7, zorder=5)
        ax.text(x + dx, y + dy, lab, fontsize=9, color=HDR)
    ax.plot([2, -2], [3, 3], ls=':', color=ICN, lw=1.5)
    ax.plot([2, 2], [3, -3], ls=':', color=ICN, lw=1.5)
    ax.annotate('', xy=(-1.0, 3.28), xytext=(1.0, 3.28),
                arrowprops=dict(arrowstyle='<->', color=MUT, lw=1.1))
    ax.text(0, 3.55, 'distance preserved', fontsize=8.5, color=MUT, ha='center')
    ax.set_xlim(-5, 5); ax.set_ylim(-5, 5); ax.set_aspect('equal'); ax.axis('off')
    save(fig, 'f1_reflect.png')

def f1_mid():
    fig, ax = newfig(6.4, 3.4)
    A, B, M = (-4, 1), (6, 5), (1, 3)
    ax.plot([A[0], B[0]], [A[1], B[1]], color=ACC, lw=2.4)
    for (x, y), lab, off in [(A, 'A (-4, 1)', (-0.4, 0.45)), (B, 'B (6, 5)', (0.1, 0.45)),
                             (M, 'M (1, 3) = midpoint', (-1.5, -0.95))]:
        ax.plot(x, y, 'o', color=ACC2 if lab.startswith('M') else HDR, ms=7)
        ax.text(x + off[0], y + off[1], lab, fontsize=10, color=HDR)
    ax.text(0.15, 4.35, 'AM = MB', fontsize=10, color=ICN)
    ax.text(-2.9, 2.9, 'AM = sqrt(5^2 + 2^2) = sqrt(29)', fontsize=9, color=MUT)
    ax.text(1.9, 3.55, 'MB = sqrt(5^2 + 2^2) = sqrt(29)', fontsize=9, color=MUT)
    ax.set_xlim(-6, 8); ax.set_ylim(-0.5, 6.5); ax.set_aspect('equal'); ax.axis('off')
    save(fig, 'f1_mid.png')

# ================= CHAPTER 2 =================
def f2_growth():
    fig, ax = newfig(6.8, 4.2)
    d = np.linspace(0, 10, 11)
    c = 100 + 60 * d
    ax.plot(d, c, color=ACC, lw=2.5, marker='o', ms=4, markevery=1)
    ax.fill_between(d, c, 80, color=ACC, alpha=0.10)
    ax.annotate('C = 100 + 60d\nslope +60 (growth)', xy=(6, 460), xytext=(1.2, 560),
                fontsize=10, color=HDR, arrowprops=dict(arrowstyle='->', color=MUT, lw=1))
    ax.text(9.6, 130, 'starts at 100\n(y-intercept)', fontsize=9, color=MUT, ha='right')
    clean(ax); ax.grid(True, ls='--', alpha=0.2, color=BRD)
    ax.set_xlabel('distance d (km)', fontsize=10, color=MUT)
    ax.set_ylabel('cost C (Rs)', fontsize=10, color=MUT)
    save(fig, 'f2_growth.png')

def f2_decay():
    fig, ax = newfig(6.8, 4.2)
    t = np.linspace(0, 6, 7)
    h = 3 - 0.5 * t
    ax.plot(t, h, color=ACC2, lw=2.5, marker='s', ms=4)
    ax.annotate('h = 3 - 0.5t\nslope -0.5 (decay)', xy=(4, 1.0), xytext=(2.6, 2.3),
                fontsize=10, color=HDR, arrowprops=dict(arrowstyle='->', color=MUT, lw=1))
    clean(ax); ax.grid(True, ls='--', alpha=0.2, color=BRD)
    ax.set_xlabel('time t (months)', fontsize=10, color=MUT)
    ax.set_ylabel('water height h (m)', fontsize=10, color=MUT)
    save(fig, 'f2_decay.png')

def f2_family():
    fig, ax = newfig(6.6, 5.0)
    x = np.linspace(-4, 4, 50)
    for a, col in [(0.5, GOLD), (1, GRN), (2, ACC), (3, ACC2)]:
        ax.plot(x, a * x, lw=2.2, color=col, label='y = %g x' % a)
    ax.axhline(0, color=HDR, lw=1.1); ax.axvline(0, color=HDR, lw=1.1)
    ax.legend(loc='upper left', frameon=False, fontsize=9.5)
    ax.text(-3.8, -9.5, 'all pass through the origin (0, 0);\nlarger a = steeper line', fontsize=9.5, color=MUT)
    ax.set_xlim(-4, 4); ax.set_ylim(-11, 11); clean(ax)
    save(fig, 'f2_family.png')

def f2_parallel():
    fig, ax = newfig(6.6, 5.0)
    x = np.linspace(-3, 4, 50)
    for b, col in [(-1, GOLD), (1, GRN), (5, ACC)]:
        ax.plot(x, 2 * x + b, lw=2.2, color=col, label='y = 2x %s %d' % ('-' if b < 0 else '+', abs(b)))
    ax.scatter([0, 0, 0], [-1, 1, 5], color=HDR, zorder=5, s=28)
    ax.text(0.15, -1.6, '(0, -1)', fontsize=9, color=MUT)
    ax.text(0.15, 1.3, '(0, 1)', fontsize=9, color=MUT)
    ax.text(0.15, 5.3, '(0, 5) = y-intercepts', fontsize=9, color=MUT)
    ax.axhline(0, color=HDR, lw=1.1); ax.axvline(0, color=HDR, lw=1.1)
    ax.legend(loc='upper left', frameon=False, fontsize=9.5)
    ax.text(-2.9, -7.6, 'same slope a = 2, different b: parallel lines that never meet', fontsize=9.5, color=MUT)
    ax.set_xlim(-3, 4); ax.set_ylim(-8, 12); clean(ax)
    save(fig, 'f2_parallel.png')

# ================= CHAPTER 3 =================
def f3_numline():
    fig, ax = newfig(8.6, 2.6)
    lo, hi = -5.4, 5.4
    ax.annotate('', xy=(hi, 0), xytext=(lo, 0), arrowprops=dict(arrowstyle='->', color=HDR, lw=1.4))
    for i in range(-5, 6):
        ax.plot([i, i], [-0.12, 0.12], color=HDR, lw=1.2)
        ax.text(i, -0.45, str(i), fontsize=9, ha='center', color=HDR)
    marks = [(0.5, '1/2', ACC), (-0.75, '-3/4', ACC), (2.25, '9/4', ACC),
             (1.414, 'sqrt(2)', ACC2), (3.1416, 'pi', ACC2), (-2.236, '-sqrt(5)', ACC2)]
    for x, lab, col in marks:
        ax.plot([x], [0], 'o', color=col, ms=6, zorder=5)
        ax.text(x, 0.30, lab, fontsize=9, ha='center', color=col)
    ax.axis('off'); ax.set_xlim(lo - 0.3, hi + 0.3); ax.set_ylim(-1, 1)
    save(fig, 'f3_numline.png')

def f3_spiral():
    fig, ax = newfig(6.4, 5.6)
    ax.set_aspect('equal'); ax.axis('off')
    O = (0, 0)
    pts = [O]
    x, y = 0.0, 0.0
    dirs = [(1, 0), (0, 1), (-1, 0), (0, -1)]
    for k in range(1, 6):
        dx, dy = dirs[(k - 1) % 4]
        nx, ny = x + dx, y + dy
        ax.plot([x, nx], [y, ny], color=ACC, lw=2)
        ax.plot([x, nx], [y, ny], marker='o', color=ACC2, ms=4, zorder=5)
        r = math.hypot(nx, ny)
        ang = math.atan2(ny, nx)
        ax.text(nx * 1.14, ny * 1.14, 'sqrt(%d)' % k, fontsize=9.5, color=HDR,
                ha='center', va='center')
        x, y = nx, ny
    ax.plot(0, 0, 's', color=HDR, ms=6)
    ax.text(0.08, -0.32, 'O', fontsize=10, color=HDR)
    ax.set_xlim(-2.6, 3.2); ax.set_ylim(-2.6, 3.2)
    ax.set_title('Square root spiral: each outer edge has length 1', fontsize=10, color=MUT)
    save(fig, 'f3_spiral.png')

def f3_sets():
    fig, ax = newfig(7.4, 5.0)
    ax.add_patch(Rectangle((0.3, 0.5), 9.0, 4.1, fill=True, fc='#eef3f6', ec=HDR, lw=1.5))
    ax.text(9.05, 4.25, 'Real numbers (R)', fontsize=11, color=HDR, ha='right')
    ax.add_patch(Rectangle((6.35, 0.8), 2.65, 3.5, fill=True, fc='#f7ecec', ec=ACC2, lw=1.4))
    ax.text(7.67, 3.95, 'Irrational (I)', fontsize=10.5, color=ACC2, ha='center')
    for s, lab in [(1.414, 'sqrt(2)'), (2.2, 'pi'), (2.9, 'sqrt(3)'), (3.7, 'sqrt(10)'), (5.1, 'e'), (6.9, '0.101001...')]:
        ax.text(6.55 + (s - 1.2) * 0.42, 2.6, lab, fontsize=8.6, color=ACC2, rotation=0)
    ax.add_patch(Rectangle((0.7, 0.8), 5.35, 3.5, fill=True, fc='#edf3ee', ec=GRN, lw=1.4))
    ax.text(3.37, 3.95, 'Rational (Q): p/q form', fontsize=10.5, color=GRN, ha='center')
    ax.add_patch(Rectangle((1.0, 1.1), 4.7, 2.5, fill=True, fc='#eef0f4', ec=ICN, lw=1.3))
    ax.text(3.35, 3.32, 'Integers (Z)', fontsize=10, color=ICN, ha='center')
    ax.text(1.35, 2.85, '... -3, -2, -1, 0, 1, 2, 3 ...', fontsize=9, color=ICN)
    ax.add_patch(Rectangle((1.35, 1.35), 2.6, 1.15, fill=True, fc='#fdf6ea', ec=GOLD, lw=1.3))
    ax.text(2.65, 2.22, 'Natural (N)\n1, 2, 3, 4 ...', fontsize=9.5, color=GOLD, ha='center')
    ax.text(3.35, 0.62, 'N inside Z inside Q inside R;  I sits beside Q inside R', fontsize=9,
            color=MUT, ha='center')
    ax.set_xlim(0, 10); ax.set_ylim(0, 5); ax.axis('off')
    save(fig, 'f3_sets.png')

def f3_density():
    fig, ax = newfig(7.2, 2.4)
    ax.annotate('', xy=(4.4, 0), xytext=(-0.4, 0), arrowprops=dict(arrowstyle='->', color=HDR, lw=1.4))
    for x, lab, col, up in [(1, '1', HDR, True), (1.5, '3/2', ACC, True), (1.25, '5/4', ACC2, False),
                            (1.125, '9/8', GOLD, True), (1.375, '11/8', GRN, False)]:
        ax.plot([x, x], [-0.14 if not up else 0.0, 0.14 if up else 0.0], color=col, lw=1.3)
        ax.plot(x, 0, 'o', color=col, ms=6)
        ax.text(x, 0.24 if up else -0.44, lab, fontsize=10, ha='center', color=col)
    ax.text(2.9, -0.15, 'keep averaging: there is ALWAYS another rational in between',
            fontsize=9.5, color=MUT)
    ax.axis('off'); ax.set_xlim(-0.6, 5.2); ax.set_ylim(-0.9, 0.7)
    save(fig, 'f3_density.png')

# ================= CHAPTER 4 =================
def f4_asq():
    fig, ax = newfig(6.4, 5.2)
    ax.set_aspect('equal'); ax.axis('off')
    a, b = 3.0, 2.0
    ax.add_patch(Rectangle((0, 0), a, a, fc='#dbe7ee', ec=HDR, lw=1.6))
    ax.text(a / 2, a / 2, 'a^2', fontsize=15, ha='center', va='center', color=HDR)
    ax.add_patch(Rectangle((a, 0), b, a, fc='#d9ebe1', ec=HDR, lw=1.6))
    ax.text(a + b / 2, a / 2, 'ab', fontsize=13, ha='center', va='center', color=GRN)
    ax.add_patch(Rectangle((0, a), a, b, fc='#d9ebe1', ec=HDR, lw=1.6))
    ax.text(a / 2, a + b / 2, 'ab', fontsize=13, ha='center', va='center', color=GRN)
    ax.add_patch(Rectangle((a, a), b, b, fc='#f5e6e6', ec=HDR, lw=1.6))
    ax.text(a + b / 2, a + b / 2, 'b^2', fontsize=12, ha='center', va='center', color=ACC2)
    ax.annotate('', xy=(a + b, -0.45), xytext=(0, -0.45), arrowprops=dict(arrowstyle='<->', color=MUT, lw=1.2))
    ax.text(a / 2, -0.95, 'a', fontsize=12, color=MUT, ha='center')
    ax.text(a + b / 2, -0.95, 'b', fontsize=12, color=MUT, ha='center')
    ax.annotate('', xy=(-0.45, a + b), xytext=(-0.45, 0), arrowprops=dict(arrowstyle='<->', color=MUT, lw=1.2))
    ax.text(-0.95, a / 2, 'a', fontsize=12, color=MUT, va='center', rotation=90)
    ax.text(-0.95, a + b / 2, 'b', fontsize=12, color=MUT, va='center', rotation=90)
    ax.set_xlim(-1.6, a + b + 0.7); ax.set_ylim(-1.6, a + b + 0.7)
    ax.set_title('(a + b)^2 = a^2 + 2ab + b^2   (area model)', fontsize=11, color=HDR)
    save(fig, 'f4_asq.png')

def f4_msq():
    fig, ax = newfig(6.4, 5.2)
    ax.set_aspect('equal'); ax.axis('off')
    a, b = 4.0, 1.4
    ax.add_patch(Rectangle((0, 0), a, a, fc='#f0f0ec', ec=HDR, lw=1.6))
    ax.add_patch(Rectangle((0, a - b), a, b, fc='#f7ecec', ec=ACC2, lw=1.2, hatch='//', alpha=0.85))
    ax.add_patch(Rectangle((a - b, 0), b, a, fc='#f7ecec', ec=ACC2, lw=1.2, hatch='//', alpha=0.85))
    ax.add_patch(Rectangle((a - b, a - b), b, b, fc='#f7ecec', ec=ACC2, lw=1.2, hatch='xx', alpha=0.6))
    ax.text((a - b) / 2, (a - b) / 2 + 0.1, '(a - b)^2', fontsize=14, ha='center', color=HDR)
    ax.text(a / 2, a - b / 2, 'strip removed: ab', fontsize=9.5, ha='center', color=ACC2)
    ax.text(a - b / 2 + 0.55, a / 2 - 0.4, 'strip ab\n(overlaps corner\nb^2 once)', fontsize=8.6,
            ha='center', color=ACC2)
    ax.annotate('', xy=(a, -0.4), xytext=(0, -0.4), arrowprops=dict(arrowstyle='<->', color=MUT, lw=1.2))
    ax.text((a - b) / 2, -0.85, 'a - b', fontsize=11, color=MUT, ha='center')
    ax.text(a - b / 2, -0.85, 'b', fontsize=11, color=MUT, ha='center')
    ax.annotate('', xy=(-0.4, a), xytext=(-0.4, 0), arrowprops=dict(arrowstyle='<->', color=MUT, lw=1.2))
    ax.text(-0.85, (a - b) / 2, 'a - b', fontsize=11, color=MUT, va='center', rotation=90)
    ax.text(-0.85, a - b / 2, 'b', fontsize=11, color=MUT, va='center', rotation=90)
    ax.set_xlim(-1.7, a + 0.9); ax.set_ylim(-1.6, a + 0.8)
    ax.set_title('(a - b)^2 = a^2 - 2ab + b^2   (remove two ab strips, add back b^2)', fontsize=10, color=HDR)
    save(fig, 'f4_msq.png')

def f4_cube():
    fig, ax = newfig(6.8, 4.0)
    vals = [1, 3, 3, 1]
    labs = ['a^3', '3a^2 b', '3ab^2', 'b^3']
    cols = [ICN, ACC, GOLD, ACC2]
    bars = ax.bar(range(4), vals, color=cols, width=0.62, edgecolor='none')
    for i, v in enumerate(vals):
        ax.text(i, v + 0.08, labs[i], ha='center', fontsize=12, color=HDR)
    ax.set_xticks([]); ax.set_ylim(0, 3.6)
    ax.spines['top'].set_visible(False); ax.spines['right'].set_visible(False)
    ax.set_yticks([1, 2, 3]); ax.set_yticklabels(['1 box', '2 boxes', '3 boxes'], fontsize=9, color=MUT)
    ax.text(1.5, -0.62, '(a + b)^3 splits into 1 cube a^3, 3 cuboids a^2 b, 3 cuboids ab^2, 1 cube b^3',
            fontsize=9.5, color=MUT, ha='center')
    save(fig, 'f4_cube.png')

# ================= CHAPTER 6 =================
def f6_arc():
    fig, ax = newfig(6.0, 5.2)
    ax.set_aspect('equal'); ax.axis('off')
    r = 3
    circ = Circle((0, 0), r, fill=False, ec=HDR, lw=1.8)
    ax.add_patch(circ)
    th1, th2 = 25, 95
    ax.add_patch(Wedge((0, 0), r, th1, th2, width=0.35, fc=ACC, alpha=0.9))
    ax.plot(0, 0, 'o', color=HDR, ms=5)
    ax.text(0.12, -0.35, 'O', fontsize=11, color=HDR)
    p1 = (r * math.cos(math.radians(th1)), r * math.sin(math.radians(th1)))
    p2 = (r * math.cos(math.radians(th2)), r * math.sin(math.radians(th2)))
    ax.plot([0, p1[0]], [0, p1[1]], color=ICN, lw=1.8)
    ax.plot([0, p2[0]], [0, p2[1]], color=ICN, lw=1.8)
    ax.text(p1[0] + 0.12, p1[1] - 0.3, 'A', fontsize=11, color=HDR)
    ax.text(p2[0] - 0.1, p2[1] + 0.22, 'B', fontsize=11, color=HDR)
    ax.add_patch(Arc((0, 0), 1.7, 1.7, angle=0, theta1=th1, theta2=th2, color=ACC2, lw=1.6))
    ax.text(1.12, 1.28, 'theta', fontsize=12, color=ACC2)
    ax.text(p1[0] / 2 + 0.35, p1[1] / 2 - 0.1, 'r', fontsize=12, color=ICN)
    ax.text(0.4, -1.9, 'arc AB = 2*pi*r x (theta/360)', fontsize=10.5, color=HDR)
    ax.set_xlim(-4, 4); ax.set_ylim(-4, 4)
    save(fig, 'f6_arc.png')

def f6_sector():
    fig, axes = plt.subplots(1, 2, figsize=(8.2, 4.0), constrained_layout=True)
    for ax, mode in zip(axes, ['sector', 'segment']):
        ax.set_aspect('equal'); ax.axis('off')
        r = 2.6
        ax.add_patch(Circle((0, 0), r, fill=False, ec=HDR, lw=1.5))
        ax.plot(0, 0, 'o', color=HDR, ms=4)
        if mode == 'sector':
            ax.add_patch(Wedge((0, 0), r, 40, 130, fc=ACC, alpha=0.55, ec=ACC))
            ax.plot([0, r * math.cos(math.radians(40))], [0, r * math.sin(math.radians(40))], color=ICN, lw=1.5)
            ax.plot([0, r * math.cos(math.radians(130))], [0, r * math.sin(math.radians(130))], color=ICN, lw=1.5)
            ax.text(0, -3.1, 'SECTOR: area = pi r^2 x (theta/360)', fontsize=10, ha='center', color=HDR)
        else:
            ax.add_patch(Wedge((0, 0), r, 40, 130, fc=ACC, alpha=0.30, ec='none'))
            th = np.linspace(math.radians(40), math.radians(130), 40)
            xs = r * np.cos(th); ys = r * np.sin(th)
            chord = np.column_stack([np.linspace(xs[0], xs[-1], 40), np.linspace(ys[0], ys[-1], 40)])
            poly = np.vstack([np.column_stack([xs, ys]), chord[::-1]])
            ax.add_patch(Polygon(poly, closed=True, fc=ACC2, alpha=0.55, ec=ACC2))
            ax.text(0, -3.1, 'SEGMENT = sector - triangle OPQ', fontsize=10, ha='center', color=HDR)
        ax.set_xlim(-3.4, 3.4); ax.set_ylim(-3.5, 3.4)
    save(fig, 'f6_sector.png')

def f6_heron():
    fig, ax = newfig(6.6, 4.6)
    ax.set_aspect('equal'); ax.axis('off')
    A, B, C = (4.5, 4.2), (0, 0), (8, 0)
    ax.add_patch(Polygon([A, B, C], closed=True, fc='#dbe7ee', ec=HDR, lw=1.8, alpha=0.9))
    D = (4.5, 0)
    ax.plot([A[0], D[0]], [A[1], D[1]], ls='--', color=ACC2, lw=1.5)
    ax.text(4.62, 2.0, 'height h', fontsize=10, color=ACC2, rotation=90)
    for (x, y), lab, off in [(A, 'A', (-0.1, 0.28)), (B, 'B', (-0.45, 0.1)), (C, 'C', (0.1, 0.1))]:
        ax.plot(x, y, 'o', color=HDR, ms=5); ax.text(x + off[0], y + off[1], lab, fontsize=12, color=HDR)
    ax.text(2.1, -0.45, 'side a', fontsize=11, color=ICN, ha='center')
    ax.text(6.4, -0.45, 'side b', fontsize=11, color=ICN, ha='center')
    ax.text(1.7, 2.5, 'side c', fontsize=11, color=ICN, rotation=40)
    ax.text(4.0, -1.3, "s = (a + b + c)/2,   Area = sqrt( s(s-a)(s-b)(s-c) )",
            fontsize=11, color=HDR, ha='center')
    ax.set_xlim(-1.5, 9.5); ax.set_ylim(-2, 5.2)
    save(fig, 'f6_heron.png')

def f6_trap():
    fig, ax = newfig(6.6, 3.8)
    ax.set_aspect('equal'); ax.axis('off')
    pts = [(1, 0), (7, 0), (8.6, 2.6), (2.2, 2.6)]
    ax.add_patch(Polygon(pts, closed=True, fc='#dbe7ee', ec=HDR, lw=1.8))
    ax.plot([4.3, 4.3], [0, 2.6], ls='--', color=ACC2, lw=1.5)
    ax.text(4.45, 1.15, 'h', fontsize=12, color=ACC2)
    ax.annotate('', xy=(7, -0.5), xytext=(1, -0.5), arrowprops=dict(arrowstyle='<->', color=ICN, lw=1.3))
    ax.text(4, -0.95, 'a (parallel side)', fontsize=10, color=ICN, ha='center')
    ax.annotate('', xy=(8.6, 3.1), xytext=(2.2, 3.1), arrowprops=dict(arrowstyle='<->', color=ICN, lw=1.3))
    ax.text(5.4, 3.32, 'b (parallel side)', fontsize=10, color=ICN, ha='center')
    ax.text(4.8, -1.75, 'Area = (1/2) x (a + b) x h', fontsize=11.5, color=HDR, ha='center')
    ax.set_xlim(0, 10); ax.set_ylim(-2.3, 3.9)
    save(fig, 'f6_trap.png')

def f6_slice():
    fig, axes = plt.subplots(1, 2, figsize=(8.4, 3.7), constrained_layout=True)
    ax = axes[0]
    ax.set_aspect('equal'); ax.axis('off')
    r = 2.4
    n = 8
    for k in range(n):
        ax.add_patch(Wedge((0, 0), r, k * 360 / n, (k + 1) * 360 / n,
                           fc=ACC if k % 2 == 0 else ICN, alpha=0.65, ec='white', lw=1.2))
    ax.plot(0, 0, 'o', color=HDR, ms=4)
    ax.text(0, -3.1, 'cut the circle into thin sectors', fontsize=10, ha='center', color=HDR)
    ax.set_xlim(-3, 3); ax.set_ylim(-3.4, 3)
    ax = axes[1]
    ax.set_aspect('equal'); ax.axis('off')
    base, hgt = math.pi * r, r
    x0 = -base / 2
    for k in range(n):
        xx = x0 + k * (base / n)
        col = ACC if k % 2 == 0 else ICN
        if k < n // 2:
            ax.add_patch(Polygon([(xx, 0), (xx + base / n, 0), (xx + base / n, hgt), (xx, hgt)],
                                 fc=col, alpha=0.75, ec='white', lw=1.0))
        else:
            xx2 = xx - (base / 2)
            ax.add_patch(Polygon([(xx2, 0), (xx2 + base / n, 0), (xx2 + base / n, hgt), (xx2, hgt)],
                                 fc=col, alpha=0.45, ec='white', lw=1.0, hatch='//'))
    ax.annotate('', xy=(base / 2, -0.4), xytext=(-base / 2, -0.4),
                arrowprops=dict(arrowstyle='<->', color=MUT, lw=1.2))
    ax.text(0, -0.75, 'base = half circumference = pi r', fontsize=10, ha='center', color=MUT)
    ax.annotate('', xy=(base / 2 + 0.35, hgt), xytext=(base / 2 + 0.35, 0),
                arrowprops=dict(arrowstyle='<->', color=MUT, lw=1.2))
    ax.text(base / 2 + 0.6, hgt / 2, 'r', fontsize=11, color=MUT)
    ax.text(0, -1.45, 'arrange alternately: near-parallelogram, Area = pi r x r = pi r^2',
            fontsize=10, ha='center', color=HDR)
    ax.set_xlim(-4.4, 4.6); ax.set_ylim(-1.9, 2.9)
    save(fig, 'f6_slice.png')

def f6_ring():
    fig, ax = newfig(6.0, 5.4)
    ax.set_aspect('equal'); ax.axis('off')
    ax.add_patch(Circle((0, 0), 3.0, fill=False, ec=HDR, lw=1.8))
    ax.add_patch(Circle((0, 0), 1.8, fill=False, ec=HDR, lw=1.8))
    ax.add_patch(Wedge((0, 0), 3.0, 0, 360, width=1.2, fc=GRN, alpha=0.30))
    ax.plot(0, 0, 'o', color=HDR, ms=5)
    ax.text(0.14, -0.4, 'O', fontsize=11, color=HDR)
    B = (-2.4, 1.8); Cc = (2.4, 1.8); A = (0, 1.8)
    ax.plot([B[0], Cc[0]], [B[1], Cc[1]], color=ACC2, lw=2.2)
    ax.plot(A[0], A[1], 'o', color=ACC2, ms=5)
    ax.text(-2.7, 2.0, 'B', fontsize=11, color=HDR)
    ax.text(2.45, 2.0, 'C', fontsize=11, color=HDR)
    ax.text(-0.25, 2.05, 'A', fontsize=11, color=ACC2)
    ax.annotate('', xy=(2.4, -3.3), xytext=(-2.4, -3.3), arrowprops=dict(arrowstyle='<->', color=ICN, lw=1.3))
    ax.text(0, -3.75, 'chord BC = l (tangent to inner circle)', fontsize=10, color=ICN, ha='center')
    ax.plot([0, 0], [0, 1.8], ls=':', color=MUT, lw=1.2)
    ax.text(0.18, 0.8, 'r', fontsize=11, color=MUT)
    ax.text(0, -4.7, 'OA is perpendicular to BC, so AB = l/2;  ring area = pi(R^2 - r^2) = pi(l/2)^2 = (1/4) pi l^2',
            fontsize=9.5, color=HDR, ha='center')
    ax.set_xlim(-4.2, 4.2); ax.set_ylim(-5.2, 4)
    save(fig, 'f6_ring.png')

# ================= CHAPTER 7 =================
def f7_scale():
    fig, ax = newfig(8.4, 2.5)
    ax.annotate('', xy=(10.4, 0), xytext=(-0.4, 0), arrowprops=dict(arrowstyle='->', color=HDR, lw=1.6))
    words = [(0, '0\nImpossible'), (2.5, '0.25\nLess likely'), (5, '0.5\nEven chance'),
             (7.5, '0.75\nMore likely'), (10, '1\nCertain')]
    for x, lab in words:
        ax.plot([x, x], [-0.25, 0.25], color=HDR, lw=2.2)
        ax.text(x, -0.95, lab, fontsize=9.5, ha='center', color=HDR)
    ex = [(1.2, 'sun rising\nin the west', ACC2), (3.6, 'rolling a 6', ICN),
          (6.2, 'heads on a coin', GRN), (8.6, 'rain in\nmonsoon', GOLD)]
    for x, lab, col in ex:
        ax.plot(x, 0, 'o', color=col, ms=7)
        ax.annotate(lab, xy=(x, 0.12), xytext=(x, 0.85), fontsize=8.6, ha='center', color=col,
                    arrowprops=dict(arrowstyle='-', color=col, lw=0.8))
    ax.axis('off'); ax.set_xlim(-0.8, 11.2); ax.set_ylim(-1.5, 1.8)
    save(fig, 'f7_scale.png')

def f7_tree():
    fig, ax = newfig(7.4, 4.6)
    ax.axis('off'); ax.set_xlim(0, 10); ax.set_ylim(0, 6)
    start = (0.6, 3)
    l1 = [(3.4, 4.6, 'H'), (3.4, 1.4, 'T')]
    l2 = [(6.6, 5.4, 'H'), (6.6, 3.8, 'T'), (6.6, 2.2, 'H'), (6.6, 0.6, 'T')]
    outs = ['HH  (1/4)', 'HT  (1/4)', 'TH  (1/4)', 'TT  (1/4)']
    for x, y, lab in l1:
        ax.annotate('', xy=(x, y), xytext=start, arrowprops=dict(arrowstyle='-', color=ICN, lw=1.5))
        ax.plot(x, y, 'o', color=ACC, ms=9)
        ax.text(x + 0.12, y + 0.18, lab, fontsize=11, color=HDR)
    ax.text(1.7, 4.15, '1/2', fontsize=9, color=MUT)
    ax.text(1.7, 2.0, '1/2', fontsize=9, color=MUT)
    pairs = [(l1[0], l2[0]), (l1[0], l2[1]), (l1[1], l2[2]), (l1[1], l2[3])]
    for (p1, p2) in pairs:
        (x1, y1, _) = p1; (x2, y2, lab) = p2
        ax.annotate('', xy=(x2, y2), xytext=(x1, y1), arrowprops=dict(arrowstyle='-', color=ICN, lw=1.5))
        ax.plot(x2, y2, 'o', color=ACC, ms=9)
        ax.text(x2 + 0.12, y2 + 0.15, lab, fontsize=11, color=HDR)
    ax.text(1.9, 4.55, '1/2', fontsize=9, color=MUT)
    ax.text(1.9, 3.6, '1/2', fontsize=9, color=MUT)
    ax.text(2.1, 2.15, '1/2', fontsize=9, color=MUT)
    ax.text(2.1, 1.2, '1/2', fontsize=9, color=MUT)
    for (p1, p2), o in zip(pairs, outs):
        (x1, y1, _) = p1; (x2, y2, _) = p2
        ax.text(7.3, (y1 + y2) / 2 - 0.05, o, fontsize=10, color=HDR)
    ax.text(5, 5.85, 'Two fair coins: sample space S = {HH, HT, TH, TT}, n(S) = 4',
            fontsize=10.5, color=HDR, ha='center')
    save(fig, 'f7_tree.png')

def f7_geo():
    fig, ax = newfig(6.6, 4.4)
    ax.set_aspect('equal'); ax.axis('off')
    ax.add_patch(Rectangle((0, 0), 3, 2, fc='#eef3f6', ec=HDR, lw=1.8))
    ax.add_patch(Circle((1.5, 1), 0.5, fc=ACC2, alpha=0.55, ec=ACC2, lw=1.6))
    ax.text(1.5, 1.0, 'circle', fontsize=9, ha='center', va='center', color=HDR)
    ax.annotate('', xy=(3, -0.3), xytext=(0, -0.3), arrowprops=dict(arrowstyle='<->', color=ICN, lw=1.2))
    ax.text(1.5, -0.62, '3 m', fontsize=10, color=ICN, ha='center')
    ax.annotate('', xy=(-0.3, 2), xytext=(-0.3, 0), arrowprops=dict(arrowstyle='<->', color=ICN, lw=1.2))
    ax.text(-0.75, 1.0, '2 m', fontsize=10, color=ICN, va='center')
    ax.text(1.5, 2.45, 'P(dye lands in circle) = area of circle / area of rectangle\n= pi(0.5)^2 / 6 = pi/24',
            fontsize=10, color=HDR, ha='center')
    ax.set_xlim(-1.2, 4.2); ax.set_ylim(-1.2, 3.1)
    save(fig, 'f7_geo.png')

if __name__ == '__main__':
    f1_plane(); f1_dist(); f1_reflect(); f1_mid()
    f2_growth(); f2_decay(); f2_family(); f2_parallel()
    f3_numline(); f3_spiral(); f3_sets(); f3_density()
    f4_asq(); f4_msq(); f4_cube()
    f6_arc(); f6_sector(); f6_heron(); f6_trap(); f6_slice(); f6_ring()
    f7_scale(); f7_tree(); f7_geo()
    print('ALL FIGURES DONE')
