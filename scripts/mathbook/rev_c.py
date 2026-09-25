# -*- coding: utf-8 -*-
"""Revision sheet content - Part C: Chapters 7, 8 + Exam Morning Power Page."""

CH7_TITLE = 'Chapter 7: Probability'
CH7_INTRO = ('Chance ka math - coin, dice, cards, bags. Sab kuch ek fraction hai: favourable/total. '
             'Bas total outcomes ginna aana chahiye (2 dice = 36, 3 coins = 8, deck ke 5 magic '
             'numbers). "At least one" dikhe toh complement laga do - aadhe questions wahi se '
             'solve hote hain.')
CH7_FORMULAS = [
    ['P(E) = favourable outcomes / total outcomes',
     'Probability = jitne result hum chahte hain / sab possible results. Hamesha 0 se 1 ke beech.',
     'Die pe even: 3/6 = 1/2'],
    ['0 &le; P(E) &le; 1; sure event P = 1; impossible P = 0',
     'Probability 1.4 ya negative kabhi nahi ho sakti. MCQ mein "which CANNOT be a probability" - 1.4 type options.',
     'P(sun rises) = 1; P(7 on a die) = 0'],
    ['P(not E) = 1 &minus; P(E)',
     'Complement: "nahi hone ka chance" = 1 minus hone ka chance. "At least one" ke liye GOLD: P(at least one) = 1 &minus; P(none).',
     'P(E) = 0.65 &rarr; P(not E) = 0.35'],
    ['n coins &rarr; 2<super>n</super> outcomes<br/>1 exact sequence (HHT) = 1/2<super>n</super>',
     '2 coins &rarr; 4, 3 coins &rarr; 8 outcomes. "Exactly HHT" jaise kisi EK order ka chance 1/8 hota hai.',
     '3 coins exactly 2 heads: 3/8 (HHt, HtH, tHH)'],
    ['1 die &rarr; 6 outcomes; 2 dice &rarr; 36 (ordered pairs)',
     'Do dice ko (first, second) jodi mein gino - 6 &times; 6 = 36. Sum 7 raja hai: 6 ways (1-6, 2-5, 3-4, 4-3, 5-2, 6-1).',
     'P(sum = 7) = 6/36 = 1/6'],
    ['Cards ke 5 magic numbers: 4 aces, 12 face, 26 red, 13 per suit, 9 numbered per suit',
     'Deck ke 90% answers inhi 5 numbers se aate hain. Ratta maar lo - card question mein sochna hi nahi padega.',
     'P(ace) = 4/52 = 1/13; P(face) = 12/52 = 3/13'],
    ['Without replacement: numerator AUR denominator dono shrink',
     'Ball/card wapas nahi mila toh dusri draw mein total ek kam, favourable bhi ho sakta hai ek kam.',
     '2 reds from 5R3B: (5/8)&times;(4/7) = 20/56 = 5/14'],
    ['Empirical P = times it happened / total trials',
     'Experiment/data se probability. 400 mein 96 walk &rarr; P = 96/400 = 0.24.',
     '500 bulbs, 15 defective &rarr; P(good) = 485/500 = 0.97'],
    ['Geometric P = favourable area / total area',
     'Dartboard, spinner, segment - chance = area ka fraction. Angles bhi area hi hain (spinner).',
     'Inner circle r=5 in 20&times;20 board: 25&pi;/400'],
    ['Mutually exclusive: P(A ya B) = P(A) + P(B)',
     'Dono events ek saath kabhi nahi ho sakte (red ya king jaise overlap ho toh common minus karo).',
     'P(red or king) = 26/52 + 4/52 &minus; 2/52 = 28/52'],
]
CH7_CHECKLIST = [
    '<b>Sample space pehle likho</b> - S = {1,2,3,4,5,6} ya {HH, HT, TH, TT}. Bina S ke answer likhna risky hai.',
    '<b>Coins mein HT &ne; TH galti:</b> unordered sochoge toh 3 outcomes aayenge - GALAT. Hamesha ordered gino (4, 8).',
    '<b>Two-dice grid banao:</b> 6&times;6 table mein sum/product bharna 30 second leta hai aur kabhi nahi galat hota.',
    '<b>"At least one six" in 2 dice</b> = 1 &minus; P(no six) = 1 &minus; (5/6)<super>2</super> = 11/36. Direct ginte waqt 6 pairs bhool jaate hain!',
    '<b>Difference events:</b> |a&minus;b| = 1 ke 10 ways hote hain ((1,2)...(6,5) dono order) - ordered pair hi rakhna.',
    '<b>Empirical table:</b> saare P ka total EXACTLY 1 hona chahiye - missing probability isi se nikalti hai.',
    '<b>Same colour / different colour draws:</b> RR + BB + RB jaise cases ko add karo, ya ek hi colour ke pairs gino.',
    '<b>Game fairness:</b> dono ke total chances barabar = fair. P(A) + P(B) + P(draw) = 1 yaad rakho.',
    '<b>Expected count:</b> 300 rolls pe six &asymp; 300 &times; 1/6 = 50 times. P &times; trials = expectation.',
]

CH8_TITLE = 'Chapter 8: Sequences and Progressions'
CH8_INTRO = ('Numbers ki lines: AP mein fixed ADD, GP mein fixed MULTIPLY, Virahanka mein pichhle '
             'do ka SUM. Formula daalo, term nikaalo, "which term" solve karo. Sierpinski aur '
             'doubling wale GP questions kal exam ke favourite hain.')
CH8_FORMULAS = [
    ['AP: t<sub>n</sub> = a + (n&minus;1)d, jahan d = t<sub>2</sub> &minus; t<sub>1</sub>',
     'Har baar utna hi ADD ho raha ho &rarr; AP. a = pehla term, d = common difference (minus bhi ho sakta hai!).',
     '3, 8, 13, ...: a = 3, d = 5; t<sub>10</sub> = 3 + 45 = 48'],
    ['"k is a term?" &rarr; solve a + (n&minus;1)d = k',
     'n NIKAL ke dekho: n natural number aaya = YES (position n); fraction aaya = NO, kabhi nahi aayega.',
     't<sub>n</sub> = 3n&minus;7, k = 557: n = 188 &rarr; YES'],
    ['Sum: 1 + 2 + ... + n = n(n+1)/2',
     'Gauss ka pairing trick: pehla + aakhri, dobara pehla+1 + aakhri&minus;1 ... har pair same sum, pairs = n/2.',
     'S<sub>100</sub> = 100 &times; 101/2 = 5050'],
    ['Range sum k + ... + m = S<sub>m</sub> &minus; S<sub>k&minus;1</sub> ya ((first + last)/2) &times; count',
     'Beech ka sum? Dono method same answer. Count = (last &minus; first)/step + 1 bhoolna mat.',
     '25 + ... + 58: (25+58)/2 &times; 34 = 1411'],
    ['GP: t<sub>n</sub> = a&middot;r<super>n&minus;1</super>, jahan r = t<sub>2</sub>/t<sub>1</sub>',
     'Har baar fixed GUNA (multiply/divide) &rarr; GP. r negative ho toh terms alternate karti hain.',
     '3, 12, 48: r = 4; t<sub>5</sub> = 3 &times; 4<super>4</super> = 768'],
    ['Virahanka-Fibonacci: V<sub>n</sub> = V<sub>n&minus;1</sub> + V<sub>n&minus;2</sub>',
     'Pichhle DO terms ka sum agla term. 1, 2, 3, 5, 8, 13, 21, 34, ... Poet Virahanka (7th century) ne diya tha.',
     '13 ke baad: 8+13 = 21, phir 34, 55, 89'],
    ['Explicit vs Recursive rule',
     'Explicit: kisi bhi n ke liye direct formula (t<sub>n</sub> = 3n + 1) - jump far. Recursive: agla term pichhle se (t<sub>n+1</sub> = t<sub>n</sub> + 3) - ek-ek karke.',
     'Dono same sequence de sakte hain!'],
    ['Sierpinski: triangles = 3<super>n</super>, black area = (3/4)<super>n</super><br/>Carpet: pieces = 8<super>n</super>, area = (8/9)<super>n</super>',
     'Stage 0 se shuru hota hai (original shape), isliye exponent = stage number. Count GP (r=3 ya 8), area shrinking GP (r=3/4, 8/9).',
     'Stage 4: 3<super>4</super> = 81 triangles, area (3/4)<super>4</super> = 81/256'],
    ['Bouncing/folding GP: exponent = number of bounces/stages',
     'Ball 24 ft se giri, har bounce 3/4: heights 18, 13.5, 13.5&times;3/4, ... a = 18, r = 3/4. Bacteria double: 30 &times; 2<super>n</super>.',
     '20 folds: 0.1 mm &times; 2<super>20</super> &asymp; 105 km? Nahi - 0.1&times;2<super>20</super> mm = 104.8 m'],
    ['AP graph = straight line (slope d); GP graph = curve',
     'Points (1, t<sub>1</sub>), (2, t<sub>2</sub>), ... plot karo: equal steps &rarr; line; guna hota gaya &rarr; curve. Graph se AP/GP pehchano.',
     '(1,2),(2,5),(3,8) &rarr; line y = 3x&minus;1'],
]
CH8_CHECKLIST = [
    '<b>Pehla sawaal har sequence ka:</b> difference constant hai? &rarr; AP. Ratio constant? &rarr; GP. Dono nahi &rarr; neither (ya quadratic/Virahanka).',
    '<b>d nikalte waqt order:</b> d = baad wala &minus; pehle wala. 11, 7, 3: d = &minus;4 (decreasing AP).',
    '<b>Two conditions = two equations:</b> "t<sub>3</sub> = 12, t<sub>50</sub> = 106" &rarr; subtract karo, d milta hai, phir a. Ye book ka starred question hai.',
    '<b>t<sub>11</sub> = 38, t<sub>16</sub> = 73 &rarr; 5d = 35 &rarr; d = 7, a = &minus;32; t<sub>31</sub> = a + 30d = 178.</b> NCERT starred - pakka aata hai.',
    '<b>Multiples counting:</b> "how many 2-digit multiples of 3" &rarr; AP 12, 15, ..., 99; n = (99&minus;12)/3 + 1 = 30; sum = n/2 &times; (first+last).',
    '<b>Three numbers in AP?</b> Unhe a&minus;d, a, a+d likho - "sum diya" se a turant milta hai. GP mein a/r, a, ar.',
    '<b>Sum of first n odd numbers = n<super>2</super></b>; first n even = n(n+1); squares 1,4,9 mein differences = odd numbers. Ye identities proof questions mein aati hain.',
    '<b>Recursive rule iterate karo dheere se</b> - har term ko pichhle se banao, jump mat maaro. Hidden pattern dhundhna ho toh 4-5 terms likho.',
    '<b>100 as consecutive sums (starred):</b> 18+...+22 aur 9+...+16 - do hi tarike. Method: n terms &rarr; sum = n&middot;(first+last)/2 = 100 solve karo.',
    '<b>Exponents count karo:</b> doubling kitni baar hua? 2<super>20</super> mein 20 doublings. Chessboard 64th square = 2<super>63</super> grains.',
]

FINAL_TITLE = 'Exam Morning Power Page (Subah Sirf Ye Page)'
FINAL_P = ('Subah exam se pehle poora book nahi - sirf ye page. Ye whole syllabus ke 12 sabse '
           'killer formulas hain jo har section mein kaam aate hain, plus exam-hall ke 8 rules. '
           'Is page ko 3 baar padho, gehri saans lo, aur exam dené jao. Tum ready ho.')
FINAL_FORMULAS = [
    ['Distance &radic;((x<sub>2</sub>&minus;x<sub>1</sub>)<super>2</super> + (y<sub>2</sub>&minus;y<sub>1</sub>)<super>2</super>) + triples (3,4,5)',
     'Ch 1', 'Coordinates se har faasla; triple dikhe toh 2-second answer.'],
    ['y = ax + b (a = rate, b = fixed)',
     'Ch 2', 'Bill/pattern/age - sab isme; slope compare = steeper/parallel.'],
    ['Recurring decimal: block/99...9; mixed: (all&minus;non-repeat)/(9..0..)',
     'Ch 3', '0.454545 = 45/99; 0.4777... = 43/90. Denominator 2<super>m</super>&times;5<super>n</super> = terminating.'],
    ['a<super>m</super>&times;a<super>n</super> = a<super>m+n</super>; a<super>m/n</super> = <super>n</super>&radic;(a<super>m</super>); same base &rarr; equate',
     'Ch 3', '8 = 2<super>3</super>, 1/81 = 3<super>&minus;4</super> banao, powers barabar rakho.'],
    ['(a&plusmn;b)<super>2</super>; a<super>2</super>&minus;b<super>2</super> = (a+b)(a&minus;b); (x+a)(x+b)',
     'Ch 4', '98<super>2</super>, 51&times;49, factorisation - sab inhi se.'],
    ['Crown: a+b+c = 0 &rarr; a<super>3</super>+b<super>3</super>+c<super>3</super> = 3abc',
     'Ch 4', 'Zero-sum dikha, 3abc likho, marks pakke.'],
    ['x + 1/x = s &rarr; s<super>2</super>&minus;2 &rarr; s<super>3</super>&minus;3s &rarr; chain',
     'Ch 4', 'x&minus;1/x = d ho toh d<super>2</super>+2, d<super>3</super>+3d.'],
    ['Heron: s &rarr; 3 differences &rarr; multiply &rarr; &radic;; right triangle &rarr; &frac12;&middot;leg&middot;leg',
     'Ch 6', 'Pehle 5-12-13 check karo - Heron skip ho sakta hai.'],
    ['Arc &ell; = (&theta;/360)2&pi;r; Sector = (&theta;/360)&pi;r<super>2</super> = &frac12;&ell;r; Ring = &pi;(R+r)(R&minus;r)',
     'Ch 6', 'π choice: 7 ka multiple &rarr; 22/7, warna 3.14.'],
    ['P(E) = fav/total; P(not E) = 1&minus;P(E); at least one &rarr; 1 &minus; P(none)',
     'Ch 7', '2 dice = 36, 3 coins = 8, cards: 4 ace / 12 face / 26 red / 13 suit / 9 numbered.'],
    ['AP: t<sub>n</sub> = a + (n&minus;1)d; Sum = n(n+1)/2; GP: t<sub>n</sub> = ar<super>n&minus;1</super>',
     'Ch 8', 'Which term &rarr; n natural? Sierpinski: 3<super>n</super>, (3/4)<super>n</super>.'],
    ['Virahanka: V<sub>n</sub> = V<sub>n&minus;1</sub> + V<sub>n&minus;2</sub> (1,2,3,5,8,13,...)',
     'Ch 8', 'Pichhle do ka sum - 1 mark ka pakka question.'],
]
FINAL_RULES = [
    '<b>Figure banao</b> - coordinate geometry, area, probability (grid) sab mein 2-inch figure half confusion khatam karta hai.',
    '<b>Given values kabhi random nahi hote</b> - a+b, ab diye hain toh bridge lagana hi hai; s diya hai toh Heron.',
    '<b>π ka sahi choice:</b> 7 ka multiple &rarr; 22/7; warna 3.14. Galat choice = pura question galat.',
    '<b>Units likho</b> - cm, cm<super>2</super>, m/s. Unit chhoda toh half mark kata jata hai.',
    '<b>MCQ strategy:</b> options se value daal ke check karna allowed hai - 98<super>2</super> type mein options khud bata denge.',
    '<b>Steps mat chhodo:</b> identity ka naam / formula likhna = method marks, chahe calculation slip ho jaye.',
    '<b>Last 10 minutes:</b> sirf CHECKING - units, signs (minus wale terms), aur "at least one" ke complements dobara dekho.',
    '<b>Trap alarm:</b> (a&minus;b)<super>2</super> ka last term PLUS hota hai; HT aur TH alag outcomes; without replacement mein denominator bhi shrink hota hai.',
]
