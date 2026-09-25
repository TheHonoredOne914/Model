# -*- coding: utf-8 -*-
"""Revision sheet content - Part A: how-to plan + Chapters 1, 2, 3.
Formula rows: [formula (with super/sub tags), easy-Hinglish meaning, tiny example]."""

PLAN_TITLE = 'How to Use This Sheet (Tonight: 3 Rounds, 2 Hours)'
PLAN_P = ('Ye sheet tumhara <b>kal ke exam ka master key</b> hai. Ek hi PDF, saare 7 chapters, '
          'zero filler. Raat ko sirf teen rounds khelo - bas. Round 1 mein formulas aur tricks '
          'ratt lo (inhe padhne se hi speed aati hai). Round 2 mein har Important Question ko '
          '<b>pehle khud try karo</b>, phir solution se mila lo - yahi asli revision hai. Round 3 '
          'mein MCQs rapid-fire maaro aur jo galat ho, uske aage star laga do. Subah exam se '
          'pehle sirf aakhri page (Exam Morning Power Page) dobara dekho. Agar ye plan follow '
          'kiya, toh 80/80 koi badi baat nahi hai.')
PLAN_TABLE = [
    ['<b>Round 1</b> (~40 min)', 'Saare Formula Tables + Concept Checklists + Speed Tricks',
     'Pura book ka hissa aankh band karke yaad ho jaye - formulas, kab-use-karna, trap warnings.'],
    ['<b>Round 2</b> (~60 min)', '75 Most Important Questions (chapter-wise)',
     'Book-style best questions with chhote solutions. Khud solve karo, phir check karo.'],
    ['<b>Round 3</b> (~40 min)', '97 Rapid-Fire MCQs (12-15 per chapter)',
     '4 options, 1 answer, 1-line logic. Galat wale pe star - wo subah dobara dekho.'],
    ['<b>Subah</b> (~15 min)', 'Exam Morning Power Page (last page)',
     'Whole book ke 12 killer formulas + exam-hall rules. Fresh dimaag = full marks.'],
]

FORM_HDR = ['Formula (ratt lo)', 'Easy bhasha mein matlab', 'Tiny example']

IMP_NOTE = ('Ye wo questions hain jo <b>book ke exercises + exam pattern</b> se seedhe uthaye gaye '
            'hain - inka style, numbers aur twist exam mein aane ke sabse zyada chances hain. '
            'Solution chhota hai par poora logic covered hai.')

MCQR_NOTE = ('Rapid fire: option padho, dimaag mein answer banao, phir Answer line se check karo. '
             'Galat hua toh Answer line ka logic padho - wahi 1 line exam mein marks bachayegi.')

CH1_TITLE = 'Chapter 1: Coordinate Geometry'
CH1_INTRO = ('Graph par points ki language: kahan hai (x, y), do points ke beech kitna faasla, '
             'midpoint kahan, reflection kaise hota hai. Formulas kam, soch smart - isi chapter '
             'mein 3-4-5 triple tumhara best friend ban jata hai.')
CH1_FORMULAS = [
    ['d = &radic;((x<sub>2</sub>&minus;x<sub>1</sub>)<super>2</super> + (y<sub>2</sub>&minus;y<sub>1</sub>)<super>2</super>)',
     'Do points ke beech ka seedha faasla. Dono coordinates ka difference lo, square karo, jodo, root nikalo. Bas.',
     '(1, 2) se (4, 6): &radic;(3<super>2</super> + 4<super>2</super>) = &radic;25 = 5'],
    ['Origin se d = &radic;(x<super>2</super> + y<super>2</super>)',
     'Point (x, y) ka ghar (origin) se faasla. Triples ratt lo: (3,4,5), (5,12,13), (8,15,17) - phir root ki zaroorat hi nahi.',
     '(6, 8): &radic;(36 + 64) = &radic;100 = 10'],
    ['Same y? d = |x<sub>2</sub> &minus; x<sub>1</sub>|<br/>Same x? d = |y<sub>2</sub> &minus; y<sub>1</sub>|',
     'Ek coordinate same hai? Formula chhodo - bas subtract karo. Free marks!',
     '(2, 5) se (9, 5): |9 &minus; 2| = 7'],
    ['M = ((x<sub>1</sub>+x<sub>2</sub>)/2, (y<sub>1</sub>+y<sub>2</sub>)/2)',
     'Midpoint = dono coordinates ka average. "Bisects" dikhe toh yehi.',
     '(1, 2), (5, 8) ka midpoint = (3, 5)'],
    ['Reverse: B = 2M &minus; A (har coordinate pe)',
     'Ek end + midpoint diya ho toh dusra end = 2&times;midpoint &minus; end. Midpoint se double karo, ek end minus.',
     'A(1, 3), M(4, 7) &rarr; B = (8&minus;1, 14&minus;3) = (7, 11)'],
    ['x-axis mein reflect: (x, &minus;y)<br/>y-axis mein reflect: (&minus;x, y)<br/>Origin mein: (&minus;x, &minus;y)',
     'Mirror image: jis axis mein reflect karna hai, USI coordinate ka sign badlo, dusra waise hi rehne do.',
     '(4, &minus;3) in x-axis &rarr; (4, 3)'],
    ['Right angle test: (sabse badi side)<super>2</super> = baaki dono ka sum',
     'Pythagoras ka ulta: agar barabar hai toh right angle confirm. Triangle type puchhe toh yehi karo.',
     '3, 4, 5: 5<super>2</super> = 25 = 9 + 16 ✓'],
    ['Circle: point (x, y) par hai agar x<super>2</super> + y<super>2</super> = r<super>2</super>',
     'Centre origin wale circle ke liye: x<super>2</super>+y<super>2</super> chhota = andar, barabar = par, bada = bahar.',
     'r = 5, point (3, 4): 9 + 16 = 25 &rarr; par hai ✓'],
    ['On the x-axis &rarr; y = 0; on the y-axis &rarr; x = 0',
     'Axis par pade point mein dusri coordinate zero hoti hai. Equidistant point maange toh yehi maan ke solve karo.',
     'y-axis par (0, k) lo, dono points se faasla barabar rakho'],
    ['Right triangle ka area (vertices se) = &frac12; &times; leg &times; leg',
     'Right angle mil jaye toh Heron/box mat karo - dono legs multiply karke aadha. Done.',
     'Legs 8 aur 6 &rarr; area = 24 sq units'],
]
CH1_CHECKLIST = [
    '<b>Quadrant signs:</b> I (+,+), II (&minus;,+) - upper left, III (&minus;,&minus;), IV (+,&minus;). Axis par point ho toh quadrant NAHI hota.',
    '<b>Ordered pair ka order matter karta hai:</b> (3, 5) &ne; (5, 3). Pehla number x (horizontal), dusra y (vertical).',
    '<b>Perpendicular distance:</b> point se x-axis ka faasla = |y|, y-axis ka = |x|. Sign nahi, magnitude.',
    '<b>Collinear points:</b> teeno ke beech ka bada distance = chhote dono ka sum. Distance formula 3 baar lagao.',
    '<b>Parallelogram check:</b> opposite sides equal (distance formula se) - ya diagonals ka midpoint same.',
    '<b>Square/rectangle verify:</b> sides + diagonals sab check karo; square mein diagonals bhi equal hoti hain.',
    '<b>Rectangle ka missing vertex:</b> opposite corners ka midpoint same hota hai - isse nikalo.',
    '<b>Grid-walk vs direct:</b> galiyon mein chalna (horizontal+vertical) seedhe faasle se LAMBA hota hai, kabhi barabar nahi (except straight line).',
    '<b>x<super>2</super>+y<super>2</super> compare karo r<super>2</super> se</b> - andar/par/bahar ka ek-line test.',
]

CH2_TITLE = 'Chapter 2: Linear Equations in One and Two Variables'
CH2_INTRO = ('Duniya ke har "fixed + per-unit" scene ko ek line y = ax + b mein likhna. Bill ho, '
             'age ho, tanki ho ya matchstick pattern - sab isi ek shape mein aata hai. Slope aur '
             'intercept padhna seekh lo, chapter khatam.')
CH2_FORMULAS = [
    ['y = ax + b',
     '<b>a</b> = har unit ka rate (slope), <b>b</b> = shuruati/fixed amount. "Rs 300 joining + Rs 60 per session" &rarr; y = 60x + 300.',
     'y = 60x + 300; x = 5 sessions &rarr; y = 600'],
    ['Slope from 2 points: a = (y<sub>2</sub>&minus;y<sub>1</sub>)/(x<sub>2</sub>&minus;x<sub>1</sub>)',
     'Per step kitna badla. Upar utha toh plus, neeche gira toh minus.',
     '(1, 4), (3, 10): a = (10&minus;4)/(3&minus;1) = 3'],
    ['Do bills diya ho? Equations MINUS karo',
     'Dono equations ko subtract karo - fixed wala (b) cancel ho jata hai, rate (a) khud nikal aata hai. Phir b wapas nikaalo.',
     'y = ax + b ke 2 points &rarr; pehle a, phir b'],
    ['Pattern: T(n) = kn + c, jahan c = (first term) &minus; k',
     'Har step mein utna hi add ho (k)? Toh linear pattern. c nikaalne ke liye pehle term se k ghatao.',
     '4, 9, 14, ...: k = 5, c = 4&minus;5 = &minus;1 &rarr; T(n) = 5n &minus; 1'],
    ['y-intercept = (0, b); x-intercept: y = 0 rakh ke solve',
     'Line jahan y-axis ko kaate = (0, b). x-axis ka point chahiye toh y ko zero maan lo.',
     'y = 2x + 8: y-cut (0, 8), x-cut (&minus;4, 0)'],
    ['Bada |a| = steeper line; same a = parallel lines',
     'Slope compare karo: jiska |a| bada, wo zyada khadi. a same ho toh kabhi milengi nahi (parallel).',
     'y = 3x &minus; 1 steeper than y = x + 9'],
    ['Growth: add/earn &rarr; +a. Decay: spend/drain &rarr; &minus;a',
     'Scene padho: paisa jud raha hai toh slope plus, fat raha hai toh minus. Decay mein bhi formula same.',
     'Bela: 500 &minus; 30x (decay); tanki: 900 &minus; 45t'],
    ['p(x) ki value: x ki jagah number daal do',
     'Polynomial machine hai - input daalo, output lo. p(x) = 3x &minus; 7 at x = 5: 15 &minus; 7 = 8.',
     'p(&minus;2) for 4x &minus; 9 = &minus;8 &minus; 9 = &minus;17'],
    ['Degree = highest power. Linear = degree 1',
     '2x + 9 linear, x<super>2</super> + 1 quadratic, x<super>3</super> cubic. Constant polynomial ka degree 0.',
     '4y<super>3</super> + y: degree 3, cubic'],
]
CH2_CHECKLIST = [
    '<b>Variable pehchano:</b> jo cheez badal rahi hai (sessions, km, months) wahi x hai; jo puchha hai wo y.',
    '<b>Fixed fee kabhi x se multiply nahi hoti</b> - wo b hai, chahe kuch bhi ho.',
    '<b>Do conditions = do equations.</b> "Sum 50 aur difference 8" jaise scenes minus/karne par solve hote hain.',
    '<b>Age problems:</b> "Mother 4 times daughter" &rarr; m = 4d; saalon baad dono mein +k add hota hai.',
    '<b>Coin/money problems:</b> count alag, value alag - 5x + 10y type equation banao.',
    '<b>Matchstick patterns:</b> pehla figure alag (c), har naya figure fixed adds (k) &rarr; T(n) = kn + c.',
    '<b>Line ki graph reading:</b> (0, b) se shuru, slope a se chadho/utro. Har point (x, y) line par hai agar equation satisfy ho.',
    '<b>Two lines same equation = same line</b> (infinite solutions); same a different b = parallel (no meeting).',
    '<b>C &ne; F kabhi barabar nahi hota?</b> Hota hai! F = 1.8C + 32 mein C = F rakho: C = &minus;40. Yaad rakhna, HOTS favourite.',
]

CH3_TITLE = 'Chapter 3: Number Systems and Exponents'
CH3_INTRO = ('Numbers ki family tree (N, Z, Q, R), recurring decimals ko fraction banana, surds '
             'ko rationalise karna aur exponent laws. Proof wale questions (√2, √3, √5 irrational) '
             'pakke aate hain - skeleton ratt lo.')
CH3_FORMULAS = [
    ['N &sub; Z &sub; Q &sub; R',
     'Counting numbers &rarr; unme negatives jude &rarr; unme fractions jude &rarr; unme irrationals jude. Har naya set purana cover karta hai.',
     '&minus;3 &isin; Z, 2/7 &isin; Q, &radic;2 &isin; R par Q se bahar'],
    ['Terminating test: fraction ko REDUCE karo, denominator sirf 2<super>m</super> &times; 5<super>n</super> ho toh terminate',
     'Pehle simplify karo (33/125 &rarr; already clean), phir denominator ke prime factors dekho. 3, 7, 11 aaye = non-terminating repeating.',
     '17/312 &rarr; 312 = 2<super>3</super>&times;3&times;13 &rarr; repeating'],
    ['Pure recurring: 0.ababab... = (block)/(99...9)',
     'Jitne digits repeat, utne 9s denominator mein. 0.777... = 7/9; 0.454545... = 45/99 = 5/11.',
     '0.666... = 6/9 = 2/3'],
    ['Mixed recurring: (sab digits &minus; non-repeat)/(9...90...0)',
     'Upar: poori decimal ke digits minus jo pehle the. Neeche: 9s (repeating ke liye) + 0s (non-repeating ke liye).',
     '0.4777... = (47&minus;4)/90 = 43/90'],
    ['&radic;a &times; &radic;b = &radic;(ab); &radic;a/&radic;b = &radic;(a/b)',
     'Same root ke surds multiply/divide ho toh andar jodo/kaato. Pehle simplify karna best: &radic;72 = 6&radic;2.',
     '&radic;2 &times; &radic;8 = &radic;16 = 4'],
    ['Rationalise: conjugate se multiply karo',
     'Neeche &radic;a &plusmn; &radic;b ho toh (&radic;a &cup; &radic;b) se upar-neeche multiply - (a&minus;b) formula se root gayab.',
     '1/(&radic;5&minus;2) &times; (&radic;5+2)/(&radic;5+2) = &radic;5 + 2'],
    ['a<super>m</super> &times; a<super>n</super> = a<super>m+n</super>; a<super>m</super>/a<super>n</super> = a<super>m&minus;n</super>; (a<super>m</super>)<super>n</super> = a<super>mn</super>',
     'Multiply = powers add; divide = powers minus; power of power = powers multiply. Base SAME hona chahiye.',
     '3<super>5</super> &times; 3<super>&minus;2</super> = 3<super>3</super> = 27'],
    ['a<super>0</super> = 1; a<super>&minus;n</super> = 1/a<super>n</super>; a<super>1/n</super> = <super>n</super>&radic;a; a<super>m/n</super> = <super>n</super>&radic;(a<super>m</super>)',
     'Zero power = 1. Minus power = palat do. Fraction power = root. 64<super>2/3</super> matlab cube root of 64, phir square.',
     '64<super>2/3</super> = (4)<super>2</super> = 16; 64<super>&minus;2/3</super> = 1/16'],
    ['Same base banao &rarr; exponents barabar rakh do',
     '8 = 2<super>3</super>, 125 = 5<super>3</super>, 1/81 = 3<super>&minus;4</super>. Dono side same base aaye toh powers equate karo - equation solved.',
     '3<super>x</super> = 1/81 = 3<super>&minus;4</super> &rarr; x = &minus;4'],
    ['rational &plusmn; irrational = irrational; irrational &times; non-zero rational = irrational',
     'Ek irrational ke saath rational jodo ya guna karo - result irrational hi rahega (rational &times; rational ke alawa).',
     '3 + &radic;2, &radic;2 &times; 4 dono irrational'],
]
CH3_CHECKLIST = [
    '<b>Irrational ka matlab:</b> decimal na terminate ho, na repeat. &radic;2, &pi;, 0.101001000... sab irrational.',
    '<b>0.999... = 1 exactly</b> - proof: x = 0.999..., 10x = 9.999..., 10x &minus; x = 9 &rarr; x = 1. MCQ favourite!',
    '<b>Between any two rationals infinitely many irrationals</b> (aur vice versa) - density. Example banane ke liye surds use karo: &radic;(a/b) forms.',
    '<b>√n irrational jab tak n perfect square na ho</b> - 2, 3, 5, 6, 7 sabke roots irrational; &radic;4, &radic;9, &radic;16 rational.',
    '<b>Irrationality proof ka skeleton:</b> maan lo p/q (lowest terms) &rarr; square karo &rarr; prime p, q ko divide karta hai &rarr; p, q dono divide karte hain &rarr; contradiction. Iska flow ratt lo.',
    '<b>Compare surds:</b> sabko same root ke andar le aao - (&radic;7)<super>2</super> = 7, (2&radic;2)<super>2</super> = 8, (3)<super>2</super> = 9 &rarr; order mil gaya.',
    '<b>Conjugate pair magic:</b> x = 2 + &radic;3 ho toh 1/x = 2 &minus; &radic;3 (multiply karke check karo). x &plusmn; 1/x ke questions isi se khul te hain.',
    '<b>Telescoping sum:</b> 1/(&radic;2+1) + 1/(&radic;3+&radic;2) + ... har term rationalise karne par &radic;(next) &minus; &radic;(prev) bachta hai - chain collapse ho jati hai.',
    '<b>Nested radical:</b> &radic;(7 + 4&radic;3) = &radic;(4 + 3 + 2&middot;2&middot;&radic;3) = 2 + &radic;3. Pattern: m + n = given, mn = inner term.',
]
