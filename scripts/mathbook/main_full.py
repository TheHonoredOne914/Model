# -*- coding: utf-8 -*-
"""FULL workbook: cheat sheet + speed tricks + 20 boxed solved Qs (with diagrams)
+ 20 boxed MCQs per chapter. Theory + solve mix, Hinglish teacher style."""
import sys, os, importlib
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from bookbuilder import build_pdf

def bank(specs):
    d = {}
    for spec in specs:
        mod, var = spec.split(':')
        m = importlib.import_module(mod)
        for b in getattr(m, var):
            if b[0] in ('q', 'mcq'):
                d[b[1]['n']] = b[1]
    return d

def clean_cheat(blocks):
    return [b for b in blocks if not (b[0] == 'p' and b[1].lstrip().startswith('Distribution of'))]

def picks(bankd, nums, figs=None):
    out = []
    for i, n in enumerate(nums, 1):
        q = dict(bankd[n])
        q['n'] = i
        if figs and n in figs:
            q['fig'] = figs[n]
        out.append(('q', q))
    return out

def mcq_picks(bankd, nums):
    out = []
    for i, n in enumerate(nums, 1):
        m = dict(bankd[n])
        m['n'] = i
        out.append(('mcq', m))
    return out

# ---------------- banks ----------------
Q1 = bank(['ch1_b:CH1_Q1', 'ch1_c:CH1_Q2']);  M1 = bank(['ch1_d:CH1_M1', 'ch1_e:CH1_M2'])
Q2 = bank(['ch2_b:CH2_Q1', 'ch2_c:CH2_Q2']);  M2 = bank(['ch2_d:CH2_M1', 'ch2_e:CH2_M2'])
Q3 = bank(['ch3_b:CH3_Q1', 'ch3_c:CH3_Q2']);  M3 = bank(['ch3_d:CH3_M1', 'ch3_e:CH3_M2'])
Q4 = bank(['ch4_b:CH4_Q1', 'ch4_c:CH4_Q2', 'ch4_d:CH4_Q3']); M4 = bank(['ch4_e:CH4_M1', 'ch4_f:CH4_M2'])
Q6 = bank(['ch6_b:CH6_Q1', 'ch6_c:CH6_Q2', 'ch6_d:CH6_Q3']); M6 = bank(['ch6_e:CH6_M1', 'ch6_f:CH6_M2'])
Q7 = bank(['ch7_b:CH7_Q1', 'ch7_c:CH7_Q2']);  M7 = bank(['ch7_d:CH7_M1', 'ch7_e:CH7_M2'])

from ch1_a import CH1_A
from ch2_a import CH2_A
from ch3_a import CH3_A
from ch4_a import CH4_A
from ch6_a import CH6_A
from ch7_a import CH7_A

# ---------------- new figure question for ch1 (replaces abstract pick) ----------------
WALK_Q = {
    'n': 5, 'level': 'Basic', 'concept': 'Figure reading + distance formula (T2/T4)',
    'fig': 'f1d_walk.png',
    'stem': ('A delivery boy starts at home O(0, 0), rides 4 units east to a tea stall at '
             'A(4, 0), then rides 3 units north to deliver food at B(4, 3), and finally rides '
             'straight back to O. Using the figure: (i) what is the total distance he rode? '
             '(ii) when he is at B, how far is he from home (straight line)? (iii) if a drone '
             'could fly directly from O to B, how much shorter would the O-to-B trip be '
             'compared to his road trip O-A-B?'),
    'steps': [
        'Read the figure: O to A is horizontal with the same y-coordinate, so OA = |4 - 0| = 4 units. A to B is vertical with the same x-coordinate, so AB = |3 - 0| = 3 units. Same-coordinate pairs give free distances.',
        'The ride home B to O is the slanted stretch BO. Route makes a right angle at A, so triangle OAB has legs 4 and 3.',
        'Distance formula (or the 3-4-5 triple): BO = √((4-0)<super>2</super> + (3-0)<super>2</super>) = √(16 + 9) = √25 = 5 units.',
        '(i) Total distance ridden = OA + AB + BO = 4 + 3 + 5 = 12 units.',
        '(ii) At B, straight-line distance from home = BO = 5 units.',
        '(iii) Road O-A-B = 4 + 3 = 7 units; direct O-to-B = 5 units. Saving = 7 - 5 = 2 units.',
    ],
    'why': ['Same-coordinate pairs need only subtraction - save the formula for the slanted side.',
            'The right angle at A makes OB the hypotenuse - spotting the 3-4-5 triple kills the square root work instantly.'],
    'hinglish': ('Delivery wala scene ek right triangle hai: east 4, north 3, toh ghar seedha '
                 '5 - 3-4-5 triple yaad hai na? Total ride 12 units, par seedhi line sirf 5. '
                 'Graph paper par ghoomna mehnga hai, drone hi bhej do!'),
    'answer': '(i) 12 units  (ii) 5 units  (iii) 2 units shorter',
}

SET_NOTE = ('Har question apne BOX me hai, uske turant baad boxed step-by-step solution. '
            'Pehle khud try karo - atak jao tab solution dekho. Har step ke saath "Why this '
            'step?" hai, aur end me Hinglish note jo concept ko pakka kar dega.')

MCQ_NOTE = ('Rapid-fire round: 4 options, ek hi correct. Pehle khud choose karo, phir colored '
            'Answer strip se check karo. Har galat option ka "Why wrong" bhi diya hai - taki '
            'exam me wahi trap tumhe na phasaye.')

TRICK_HDR = ['Instant trick', 'Fire it when...']

T1 = [
    ['Same y? Distance = |x<sub>2</sub> - x<sub>1</sub>|. Same x? Distance = |y<sub>2</sub> - y<sub>1</sub>|',
     'Points share a coordinate - skip the formula, just subtract.'],
    ['Distance from origin = √(x<super>2</super> + y<super>2</super>). Memorise triples: (3,4,5), (6,8,10), (5,12,13), (8,15,17)',
     '"How far from the origin?" - spot the triple, answer in 2 seconds.'],
    ['Reflect in x-axis: (x, -y). In y-axis: (-x, y). In both: (-x, -y)',
     'Any "mirror image / reflection" wording.'],
    ['Midpoint = averages of the coordinates; reverse: B = 2M - A',
     '"Midpoint", "bisects", or one endpoint + midpoint given.'],
    ['Right angle test: (biggest side)<super>2</super> = sum of squares of other two',
     '"Prove/verify right angle", triangle classification.'],
    ['Point on circle centre O radius r ⟺ x<super>2</super> + y<super>2</super> = r<super>2</super>',
     '"On/inside/outside the circle" - compare x<super>2</super>+y<super>2</super> with r<super>2</super>.'],
    ['"On the x-axis" → y = 0; "on the y-axis" → x = 0',
     'Building coordinates of axis points.'],
]
T2 = [
    ['Fixed fee + rate × quantity → y = ax + b (b = fixed part, a = per-unit rate)',
     '"Rs 300 joining + Rs 60 per session" style wording.'],
    ['Two observations? Subtract the equations - b cancels, a pops out',
     'Fit y = ax + b from two bills or data points.'],
    ['Pattern adds k every step → T(n) = kn + c; c = (first term) - k',
     'Matchstick, tile and money patterns.'],
    ['Slope a = Δy/Δx; bigger |a| = steeper; same a = parallel',
     '"Which line is steeper / are they parallel?"'],
    ['Changing b shifts the line up/down; changing a pivots it about (0, b)',
     '"What happens to the graph if ...?"'],
    ['Spends / loses / drains → minus slope (decay). Adds / earns / fills → plus (growth)',
     'Growth vs decay identification.'],
    ['y-intercept = (0, b); x-intercept: put y = 0, solve',
     '"Where does the line cut the axes?"'],
]
T3 = [
    ['Terminating? REDUCE first, then check: denominator = 2<super>m</super> × 5<super>n</super> only',
     '"Without long division, state whether the decimal terminates".'],
    ['Pure recurring 0.abab... = block/99...9. Mixed: (all digits - non-repeating)/99..900..0',
     'Convert recurring decimals to p/q form.'],
    ['Compare surds: same root index banao, then compare inside values',
     '"Arrange in increasing order".'],
    ['Rationalise: multiply by the conjugate. Telescoping sum collapses to (last - first)',
     'Surds in denominators; 1/(√a+√b) chains.'],
    ['Same base first: 8 = 2<super>3</super>, 125 = 5<super>3</super>, 1/81 = 3<super>-4</super> → equate exponents',
     'Every exponent equation.'],
    ['Irrationality skeleton: assume p/q → square → prime lemma → contradiction',
     '"Prove √2 / √3 / √5 is irrational".'],
    ['rational ± irrational = irrational; irrational × non-zero rational = irrational',
     'True/false closure statements.'],
]
T4 = [
    ['Near round numbers: 51 × 49 = 50<super>2</super> - 1; 102<super>2</super> = 100<super>2</super> + 2·100·2 + 4',
     '"Evaluate without direct multiplication".'],
    ['Given a + b and ab: a<super>2</super> + b<super>2</super> = (a+b)<super>2</super> - 2ab; a<super>3</super> + b<super>3</super> = (a+b)<super>3</super> - 3ab(a+b)',
     'Bridge questions - the two givens are never random.'],
    ['a + b + c = 0 → a<super>3</super> + b<super>3</super> + c<super>3</super> = 3abc, instantly',
     'Zero-sum cubes like 25<super>3</super> - 75<super>3</super> + 50<super>3</super>.'],
    ['x + 1/x = s → square it: x<super>2</super> + 1/x<super>2</super> = s<super>2</super> - 2 → keep chaining up',
     'The whole x + 1/x family.'],
    ['Spot perfect cubes (8, 27, 64, 125, a<super>3</super>b<super>3</super>) → apply a<super>3</super> ± b<super>3</super>',
     '27a<super>3</super> + 64 type expressions.'],
    ['Cubic factoring: test x = 1, -1, 2, -2 for a root, then divide',
     'x<super>3</super> - 3x<super>2</super> - 9x - 5 type.'],
    ['HCF first, ALWAYS - before any identity or grouping',
     'Every factorisation: move 1 of the golden sequence.'],
]
T6 = [
    ['π choice: radius multiple of 7 → 22/7; otherwise 3.14',
     'First decision of every circle question.'],
    ['Sector and arc = θ/360 × (full circle value). Gem: sector area = ½ × arc × r',
     'Pizza-slice sector questions.'],
    ['Sides satisfy a<super>2</super> + b<super>2</super> = c<super>2</super>? Area = ½ × leg × leg - skip Heron',
     '5-12-13, 9-40-41 style triangles.'],
    ['Heron rhythm: s → three differences → multiply (pair smartly) → root',
     'Three sides given, height unknown.'],
    ['Ring: A = π(R+r)(R-r). Path outside: R = r + w. Path inside: subtract squares',
     'Garden path / ring / border questions.'],
    ['Wheel: distance = revolutions × circumference',
     '"How many revolutions / how far does it travel".'],
    ['Equilateral: area = (√3/4)a<super>2</super>, height = (√3/2)a',
     'All sides equal - no Heron needed.'],
]
T7 = [
    ['"At least one" → 1 - P(none). Works for coins, dice, bags',
     'Any "at least one" wording.'],
    ['Without replacement: numerator AND denominator both shrink',
     'Two or three draws, balls not returned.'],
    ['Deck counts: 4 aces, 12 face cards, 26 red, 13 per suit, 9 numbered per suit',
     'Every card question - 5 numbers, 90% of answers.'],
    ['Two dice = 36 ordered pairs; sum 7 is the king (6 ways). Draw the 6×6 grid',
     'Sum / product / difference on two dice.'],
    ['n coins → 2<super>n</super> outcomes; one exact sequence (like HHT) = 1/2<super>n</super>',
     'Three-coins questions.'],
    ['Geometric P = favourable area / total area',
     'Darts, spinners, random points on segments.'],
    ['P(E) + P(not E) = 1',
     '"Find P(not ...)" or when P(E) is given directly.'],
]

def chapter(cheat, tricks, set_title, qblocks, mcq_title, mcqblocks):
    return (clean_cheat(cheat)
            + [('h2', set_title[0]), ('p', set_title[1])] + qblocks
            + [('h2', mcq_title[0]), ('p', mcq_title[1])] + mcqblocks)

def tricks_blocks(title, rows):
    return [('h2', title), ('p', 'Ye table tumhara "dekho aur maaro" radar hai - question ka '
             'trigger phrase dikha, toh yahan ka trick fire karo. Inhe ratt lo, exam me '
             'sochna kam padega aur speed double ho jayegi.'),
            ('table', TRICK_HDR, rows, [0.46, 0.54])]

CH1_QS = picks(Q1, [1, 6, 7, 8, 11, 13, 15, 18, 20, 21, 22, 24, 32, 33, 34, 36, 42, 44, 47],
               figs={47: 'f1d_robot.png'})
CH1_QS.insert(4, ('q', dict(WALK_Q)))
for i, blk in enumerate(CH1_QS):
    if blk[0] == 'q':
        blk[1]['n'] = i + 1

FULL1 = chapter(CH1_A, None, ('1.3 Speed Tricks & Trap Alarms', None), None, None, None) if False else None

def build_ch(cheat, trows, ttitle, qs, ms, ch):
    return (clean_cheat(cheat)
            + tricks_blocks('%d.3 Speed Tricks & Trap Alarms' % ch, trows)
            + [('h2', '%d.4 Solved Practice Set (20 Questions)' % ch), ('p', SET_NOTE)] + qs
            + [('h2', '%d.5 Rapid MCQs: Choose the Correct Option (20)' % ch), ('p', MCQ_NOTE)] + ms)

CH1 = build_ch(CH1_A, T1, None, CH1_QS, mcq_picks(M1, [1, 3, 5, 8, 9, 11, 15, 17, 18, 19, 21, 23, 24, 32, 33, 34, 43, 45, 46, 60]), 1)
CH2 = build_ch(CH2_A, T2, None,
               picks(Q2, [2, 5, 7, 8, 10, 11, 12, 13, 14, 18, 21, 23, 25, 27, 29, 31, 34, 38, 43, 46],
                     figs={34: 'f2d_lines.png'}),
               mcq_picks(M2, [1, 2, 3, 5, 7, 8, 11, 17, 18, 19, 21, 22, 26, 31, 33, 41, 42, 43, 51, 55]), 2)
CH3 = build_ch(CH3_A, T3, None,
               picks(Q3, [1, 2, 3, 4, 8, 11, 13, 15, 16, 19, 21, 23, 25, 26, 28, 33, 34, 38, 41, 42],
                     figs={41: 'f3_spiral.png'}),
               mcq_picks(M3, [1, 2, 3, 4, 5, 7, 9, 11, 12, 14, 16, 19, 22, 24, 30, 38, 43, 47, 49, 51]), 3)
CH4 = build_ch(CH4_A, T4, None,
               picks(Q4, [1, 2, 4, 6, 10, 13, 16, 17, 19, 24, 27, 30, 31, 34, 37, 44, 46, 48, 57, 65]),
               mcq_picks(M4, [3, 6, 7, 8, 9, 12, 13, 15, 18, 19, 23, 28, 34, 37, 38, 42, 50, 59, 72, 80]), 4)
CH6 = build_ch(CH6_A, T6, None,
               picks(Q6, [2, 3, 5, 6, 9, 13, 14, 18, 19, 21, 22, 28, 32, 34, 35, 43, 46, 52, 63, 65],
                     figs={28: 'f6d_quad.png', 52: 'f6d_track.png', 63: 'f6d_goat.png'}),
               mcq_picks(M6, [1, 3, 4, 6, 7, 8, 10, 12, 13, 14, 16, 19, 29, 30, 31, 34, 39, 54, 64, 72]), 6)
CH7 = build_ch(CH7_A, T7, None,
               picks(Q7, [2, 4, 6, 7, 9, 11, 12, 14, 15, 17, 21, 23, 24, 25, 26, 31, 33, 40, 41, 46],
                     figs={25: 'f7d_dart.png', 27: 'f7d_spinner.png'}),
               mcq_picks(M7, [2, 4, 5, 7, 8, 10, 12, 13, 15, 18, 19, 24, 28, 32, 35, 41, 43, 44, 50, 57]), 7)

# ch7 fig note: Q27 (spinner) is not in the picked list - it replaces nothing; add it by swapping Q9 (sum-to-1 basic) out? 
# Decision: swap original pick 9 -> 27 so the spinner figure question is included.
CH7 = build_ch(CH7_A, T7, None,
               picks(Q7, [2, 4, 6, 7, 27, 11, 12, 14, 15, 17, 21, 23, 24, 25, 26, 31, 33, 40, 41, 46],
                     figs={25: 'f7d_dart.png', 27: 'f7d_spinner.png'}),
               mcq_picks(M7, [2, 4, 5, 7, 8, 10, 12, 13, 15, 18, 19, 24, 28, 32, 35, 41, 43, 44, 50, 57]), 7)

BLOCKS = (CH1 + [('pagebreak',)] + CH2 + [('pagebreak',)] + CH3 + [('pagebreak',)]
          + CH4 + [('pagebreak',)] + CH6 + [('pagebreak',)] + CH7)

if __name__ == '__main__':
    out = sys.argv[1] if len(sys.argv) > 1 else '/home/z/my-project/scripts/mathbook/book_full.pdf'
    nq = sum(1 for b in BLOCKS if b[0] == 'q')
    nm = sum(1 for b in BLOCKS if b[0] == 'mcq')
    nf = sum(1 for b in BLOCKS if b[0] == 'q' and b[1].get('fig'))
    print('blocks:', len(BLOCKS), '| solved Qs:', nq, '| MCQs:', nm, '| diagram Qs:', nf)
    assert nq == 120 and nm == 120, 'counts off: q=%d mcq=%d' % (nq, nm)
    build_pdf(BLOCKS, out)
    print('Built:', out)
