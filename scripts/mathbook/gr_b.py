# -*- coding: utf-8 -*-
"""Grand Revision - Part B: 30 mixed questions with full solutions."""

GR_B = [
("h2", "R.2  Thirty Mixed Questions (Q101 - Q130) with Full Solutions"),
("p", "One question never announces its chapter. Work these in order, hide the solutions, and tag each mistake you make with its chapter number - that tag is your revision map."),

("q", {"n": 101, "level": "Moderate", "concept": "Mixed: Ch1 distance + classification",
 "stem": "A(2, 3), B(2 + 3k, 7). If AB = 5 and k > 0, find k; state the quadrant of B.",
 "steps": [
  "Same x-coordinate (2 for both): vertical distance = |7 - 3| = |3k|.",
  "5 = 3k (k > 0) \u21d2 k = 5/3.",
  "B = (2 + 5, 7) = (7, 7): both positive \u2192 Quadrant I.",
 ],
 "why": ["Shared x-coordinate means the axis-parallel shortcut, no square root needed."],
 "hinglish": "Same x = vertical distance = |3k|. k = 5/3. B(7,7) - Quadrant I. Shortcut pehchano.",
 "answer": "k = 5/3; B lies in Quadrant I."}),

("q", {"n": 102, "level": "Moderate", "concept": "Mixed: Ch1 reverse midpoint",
 "stem": "M(1, -2) is the midpoint of AB with A(-3, 4). Find B and verify.",
 "steps": [
  "B = (2m\u2081 - x_A, 2m\u2082 - y_A) = (2 + 3, -4 - 4) = (5, -8).",
  "Verify: ((-3+5)/2, (4-8)/2) = (1, -2) \u2713.",
 ],
 "why": ["Doubling the midpoint and subtracting the known end reverses the average."],
 "hinglish": "Double minus known end: (5, -8). Verify by re-averaging - marks ke liye ye line likho.",
 "answer": "B(5, -8)"}),

("q", {"n": 103, "level": "Basic", "concept": "Mixed: Ch3 terminating test",
 "stem": "Without division, decide: terminating or recurring? (i) 21/60 (ii) 29/343 (iii) 77/210.",
 "steps": [
  "(i) 21/60 = 7/20 = 7/(2\u00b2\u00d75): terminating.",
  "(ii) 343 = 7\u00b3: recurring.",
  "(iii) 77/210 = 11/30; 30 has 3: recurring.",
 ],
 "why": ["Reduce first, then factor the denominator into primes."],
 "hinglish": "Pehle reduce karo: 7/20 terminate; 7\u00b3 aur 3\u00d710 recur.",
 "answer": "(i) terminating  (ii) recurring  (iii) recurring"}),

("q", {"n": 104, "level": "Moderate", "concept": "Mixed: Ch3 recurring to p/q",
 "stem": "Express 0.68\overline-like value 0.6888... (the 8 repeating) in p/q form.",
 "steps": [
  "x = 0.6888...; 10x = 6.888...; 100x = 68.888...",
  "100x - 10x = 62 \u21d2 90x = 62 \u21d2 x = 31/45.",
 ],
 "why": ["One non-repeating digit (6) plus one repeating digit (8): shifts of 10 and 100."],
 "hinglish": "(68 - 6)/90 = 62/90 = 31/45. Reduce karna compulsory.",
 "answer": "31/45"}),

("q", {"n": 105, "level": "Moderate", "concept": "Mixed: Ch3 rationalise",
 "stem": "Rationalise and simplify: 10/(\u221a5 + \u221a3)... then find a + b if the result equals a\u221a5 + b\u221a3.",
 "steps": [
  "Multiply by (\u221a5 - \u221a3): denominator 5 - 3 = 2.",
  "Value = 10(\u221a5 - \u221a3)/2 = 5\u221a5 - 5\u221a3.",
  "So a = 5, b = -5 (with a + b = 0).",
 ],
 "why": ["Conjugate first; then compare coefficients of the independent surds."],
 "hinglish": "Conjugate se denominator 2. 5\u221a5 - 5\u221a3. a = 5, b = -5.",
 "answer": "5\u221a5 - 5\u221a3; a = 5, b = -5"}),

("q", {"n": 106, "level": "Basic", "concept": "Mixed: Ch4 numeric square",
 "stem": "Compute 97\u00b2 and 96 \u00d7 104 using identities.",
 "steps": [
  "97\u00b2 = (100-3)\u00b2 = 10000 - 600 + 9 = 9409.",
  "96 \u00d7 104 = (100-4)(100+4) = 10000 - 16 = 9984.",
 ],
 "why": ["Both products live around 100; identities replace multiplication with tiny additions."],
 "hinglish": "(100\u00b13)\u00b2 wala junction: 9409 aur 9984. Identities = speed.",
 "answer": "9409; 9984"}),

("q", {"n": 107, "level": "Moderate", "concept": "Mixed: Ch4 cubic factorisation",
 "stem": "Factorise completely: 2x\u00b3 - 2x\u00b2 - 24x.",
 "steps": [
  "Common factor 2x: 2x(x\u00b2 - x - 24).",
  "Split the middle: -6 and +4 (sum -2, product -24): 2x(x - 6)(x + 4).",
 ],
 "why": ["HCF first, then middle-term splitting - the golden order."],
 "hinglish": "2x bahar, andar split: (x-6)(x+4). Complete factorisation.",
 "answer": "2x(x - 6)(x + 4)"}),

("q", {"n": 108, "level": "Moderate", "concept": "Mixed: Ch4 cube bridge",
 "stem": "If x + y = 9 and xy = 20, find x\u00b3 + y\u00b3.",
 "steps": [
  "x\u00b3+y\u00b3 = (x+y)\u00b3 - 3xy(x+y) = 729 - 3(20)(9) = 729 - 540 = 189.",
 ],
 "why": ["The bridge reads (sum, product) \u2192 cube sum directly."],
 "hinglish": "729 - 540 = 189. Bridge = 2 line answer.",
 "answer": "189"}),

("q", {"n": 109, "level": "Moderate", "concept": "Mixed: Ch4 zero-sum crown",
 "stem": "Evaluate 18\u00b3 + (-13)\u00b3 + (-5)\u00b3 without cubing.",
 "steps": [
  "Sum check: 18 - 13 - 5 = 0 \u2192 zero-sum shortcut.",
  "Value = 3 \u00d7 18 \u00d7 (-13) \u00d7 (-5) = 3 \u00d7 18 \u00d7 65 = 3510.",
 ],
 "why": ["Zero sum collapses three cubes into one product."],
 "hinglish": "Sum zero! 3\u00d718\u00d765 = 3510. Shortcut ka full power.",
 "answer": "3510"}),

("q", {"n": 110, "level": "Moderate", "concept": "Mixed: Ch6 Heron",
 "stem": "A triangular hoarding has sides 26 m, 28 m and 30 m. Find its area.",
 "steps": [
  "s = 42; differences 16, 14, 12.",
  "Product: 42\u00d716\u00d714\u00d712 = 112896.",
  "A = 336 m\u00b2.",
 ],
 "why": ["The same product as Q42's triangle - sides scaled up by 1 from 26-28-30? No: identical 26-28-30 sides; recognising repeats speeds revision."],
 "hinglish": "s = 42, differences 16, 14, 12. 336 m\u00b2. Pattern yaad rakho.",
 "answer": "336 m\u00b2"}),

("q", {"n": 111, "level": "Moderate", "concept": "Mixed: Ch6 sector trio",
 "stem": "A sector of radius 14 cm has angle 90\u00b0. Find arc, area, perimeter (\u03c0 = 22/7).",
 "steps": [
  "Arc = (1/4)(88) = 11 cm.",
  "Area = (1/4)(616) = 154 cm\u00b2.",
  "Perimeter = 11 + 28 = 39 cm.",
 ],
 "why": ["One fraction (\u03b8/360) drives all three quantities."],
 "hinglish": "Quarter: arc 11, area 154, perimeter 11+28 = 39. Dono radii!",
 "answer": "11 cm; 154 cm\u00b2; 39 cm"}),

("q", {"n": 112, "level": "Moderate", "concept": "Mixed: Ch6 ring reverse",
 "stem": "A ring has outer radius 12 cm and width 3 cm. Find its area (\u03c0 = 22/7).",
 "steps": [
  "Inner radius r = 12 - 3 = 9 cm.",
  "Area = \u03c0(144 - 81) = \u03c0(63) = (22/7)(63) = 198 cm\u00b2.",
 ],
 "why": ["Width subtracts from the outer radius to give the inner one."],
 "hinglish": "r = 9. \u03c0\u00d763 = 198 cm\u00b2.",
 "answer": "198 cm\u00b2"}),

("q", {"n": 113, "level": "Basic", "concept": "Mixed: Ch7 two dice",
 "stem": "Two dice are rolled. Find P(sum = 9) and P(sum is odd).",
 "steps": [
  "Sum 9: (3,6), (4,5), (5,4), (6,3): 4/36 = 1/9.",
  "Odd sums: 2+4+6+4+2 = 18 pairs (3,5,7,9,11) \u2192 1/2.",
 ],
 "why": ["The pyramid count makes odd and even sums exactly balanced."],
 "hinglish": "Sum 9: 4 pairs \u2192 1/9. Odd sum: 18 \u2192 1/2. Pyramid count yaad rakho.",
 "answer": "1/9; 1/2"}),

("q", {"n": 114, "level": "Basic", "concept": "Mixed: Ch7 cards",
 "stem": "One card is drawn. Find P(a red king) and P(a king or a queen).",
 "steps": [
  "Red kings: 2 \u2192 2/52 = 1/26.",
  "Kings or queens: 8 \u2192 8/52 = 2/13.",
 ],
 "why": ["Specific-card counts first; disjoint ranks then add."],
 "hinglish": "Red king 2 \u2192 1/26. Kings+queens 8 \u2192 2/13.",
 "answer": "1/26; 2/13"}),

("q", {"n": 115, "level": "Moderate", "concept": "Mixed: Ch7 without replacement",
 "stem": "A bag has 6 red and 4 white balls. Two are drawn without replacement. P(both white)?",
 "steps": [
  "(4/10)(3/9) = 12/90 = 2/15.",
 ],
 "why": ["Shrinking counts: 4 \u2192 3 and 10 \u2192 9."],
 "hinglish": "4/10 \u00d7 3/9 = 2/15. Cascade likho.",
 "answer": "2/15"}),

("q", {"n": 116, "level": "Difficult", "concept": "Mixed: Ch1 reflection chain",
 "stem": "P(3, -4) is reflected in the x-axis to P\u2081, then P\u2081 in the y-axis to P\u2082. Find P\u2082 and verify that OP\u2082 = OP.",
 "steps": [
  "P\u2081 = (3, 4); P\u2082 = (-3, 4).",
  "OP = \u221a(9 + 16) = 5; OP\u2082 = \u221a(9 + 16) = 5 \u2713 (double reflection = half-turn, distances preserved).",
 ],
 "why": ["Two reflections flip both signs; distance from the origin is invariant under sign flips."],
 "hinglish": "Do reflection = dono sign flip. Distance same rehti hai (5) - verification built-in.",
 "answer": "P\u2082(-3, 4); both distances are 5."}),

("q", {"n": 117, "level": "Moderate", "concept": "Mixed: Ch2 fit a line",
 "stem": "A taxi charges a fixed flag-fall plus a per-km rate: 5 km costs \u20b9110 and 9 km costs \u20b9170. Find the linear cost rule and the cost of 15 km.",
 "steps": [
  "Rate a = (170 - 110)/(9 - 5) = 60/4 = \u20b915 per km.",
  "Flag-fall: 110 = 15(5) + b \u2192 b = 35.",
  "Rule: C = 15d + 35; at 15 km: 225 + 35 = \u20b9260.",
 ],
 "why": ["Two data points determine a and b exactly - the fitting method of Chapter 2 in money clothes."],
 "hinglish": "Slope = rate = 15/km, flag-fall = 35. 15 km: \u20b9260. Two points, two unknowns.",
 "answer": "C = 15d + 35; \u20b9260"}),

("q", {"n": 118, "level": "Moderate", "concept": "Mixed: Ch3 exponent equation",
 "stem": "Solve: 3\u207d\u00b2\u02e3\u207b\u00b9\u207e = 81\u02e3.",
 "steps": [
  "Right side: 81\u02e3 = (3\u2074)\u02e3 = 3\u2074\u02e3.",
  "Equation: 2x - 1 = 4x \u21d2 x = -1/2.",
 ],
 "why": ["One base on both sides turns a power equation into a linear one."],
 "hinglish": "81 = 3\u2074. 2x-1 = 4x \u2192 x = -1/2. Negative answer allowed!",
 "answer": "x = -1/2"}),

("q", {"n": 119, "level": "Difficult", "concept": "Mixed: Ch3 nested radical",
 "stem": "Simplify \u221a(8 + 2\u221a15).",
 "steps": [
  "Need m + n = 8, mn = 15: m = 5, n = 3.",
  "\u221a(8 + 2\u221a15) = \u221a5 + \u221a3.",
  "Verify: 5 + 3 + 2\u221a15 \u2713.",
 ],
 "why": ["The (\u221am + \u221an)\u00b2 identity runs backwards."],
 "hinglish": "Sum 8, product 15: 5 aur 3. Answer \u221a5+\u221a3.",
 "answer": "\u221a5 + \u221a3"}),

("q", {"n": 120, "level": "Difficult", "concept": "Mixed: Ch4 chain",
 "stem": "If x + 1/x = 4, find x\u00b3 + 1/x\u00b3 and x\u2074 + 1/x\u2074.",
 "steps": [
  "x\u00b2 + 1/x\u00b2 = 16 - 2 = 14.",
  "x\u00b3 + 1/x\u00b3 = 64 - 12 = 52.",
  "x\u2074 + 1/x\u2074 = 14\u00b2 - 2 = 194.",
 ],
 "why": ["The chain: square-minus-2 and cube-minus-3s."],
 "hinglish": "4 \u2192 14 \u2192 52 \u2192 194. Chain banao, recompute mat karo.",
 "answer": "52 and 194"}),

("q", {"n": 121, "level": "Difficult", "concept": "Mixed: Ch4 identity proof",
 "stem": "Prove that (a + b)\u00b2 + (a - b)\u00b2 = 2(a\u00b2 + b\u00b2) and use it: if a + b = 7 and a - b = 3, find a\u00b2 + b\u00b2.",
 "steps": [
  "Expand: (a\u00b2+2ab+b\u00b2) + (a\u00b2-2ab+b\u00b2) = 2a\u00b2 + 2b\u00b2 \u2713.",
  "Application: a\u00b2+b\u00b2 = (49 + 9)/2 = 29.",
 ],
 "why": ["Expand once, then reuse forever."],
 "hinglish": "Proof 2 lines. (49+9)/2 = 29. Companion identity ka direct use.",
 "answer": "Proved; 29"}),

("q", {"n": 122, "level": "Difficult", "concept": "Mixed: Ch6 trapezium via Heron",
 "stem": "A trapezium has parallel sides 20 cm and 8 cm, and its non-parallel sides are both 10 cm. Find its area.",
 "steps": [
  "Isosceles trapezium: the height drop creates a helper triangle with base 20 - 8 = 12 cm and equal sides 10, 10.",
  "Heron on (10, 10, 12): s = 16; product 16\u00d76\u00d76\u00d74 = 2304; helper area = 48 cm\u00b2.",
  "Height: 48 = \u00bd \u00d7 12 \u00d7 h \u21d2 h = 8 cm.",
  "Trapezium area = \u00bd(20 + 8)(8) = 112 cm\u00b2.",
  "Quick check: half-base 6, h 8, slant \u221a(36+64) = 10 \u2713 (6-8-10 triple).",
 ],
 "why": ["An isosceles trapezium splits into a rectangle plus two symmetric right triangles; Heron extracts h cleanly."],
 "hinglish": "Helper triangle 10-10-12: Heron se area 48, h = 8. Trapezium = \u00bd(28)(8) = 112 cm\u00b2. Isosceles case mein helper symmetric hota hai.",
 "answer": "112 cm\u00b2"}),

("q", {"n": 123, "level": "Difficult", "concept": "Mixed: Ch6 chord-tangent ring",
 "stem": "Two concentric circles: a chord of the outer circle of length 34 cm touches the inner circle. Find the ring area (\u03c0 = 22/7).",
 "steps": [
  "Ring = \u03c0(half-chord)\u00b2 = \u03c0(17\u00b2) = (22/7)(289) = 6358/7 \u2248 908.3 cm\u00b2.",
 ],
 "why": ["Half-chord squared equals R\u00b2 - r\u00b2 - no radii needed."],
 "hinglish": "Half-chord 17. 17\u00b2 = 289. Ring = 289\u03c0 \u2248 908.3 cm\u00b2.",
 "answer": "\u2248 908.3 cm\u00b2"}),

("q", {"n": 124, "level": "Difficult", "concept": "Mixed: Ch6 shaded composite",
 "stem": "A square of side 14 cm contains four quarter-circles of radius 7 cm centred at each corner, drawn INSIDE the square. Find the area of the central region not covered by any quarter-circle (\u03c0 = 22/7).",
 "steps": [
  "Four quarter-circles = one full circle of radius 7: area 154 cm\u00b2.",
  "Square area: 196 cm\u00b2.",
  "Central uncovered region = 196 - 154 = 42 cm\u00b2.",
 ],
 "why": ["Four quarters merge into one circle - the standard consolidation."],
 "hinglish": "Chaar quarter = ek full circle (154). Gap 42 cm\u00b2.",
 "answer": "42 cm\u00b2"}),

("q", {"n": 125, "level": "Difficult", "concept": "Mixed: Ch7 at least one",
 "stem": "A die is rolled 4 times. Find P(at least one 6).",
 "steps": [
  "P(no 6 in one roll) = 5/6; in four rolls: (5/6)\u2074 = 625/1296.",
  "P(at least one 6) = 1 - 625/1296 = 671/1296 \u2248 0.518.",
 ],
 "why": ["The complement cascade: multiply the failures, subtract from 1."],
 "hinglish": "(5/6)\u2074 = 625/1296. 1 minus = 671/1296. Half se thoda zyada - sensible!",
 "answer": "671/1296 \u2248 0.52"}),

("q", {"n": 126, "level": "Difficult", "concept": "Mixed: Ch7 geometric",
 "stem": "A dart hits a 24 cm square board randomly. A circular plate of radius 6 cm sits centred on it. P(hit on plate) to 3 dp (\u03c0 = 3.14).",
 "steps": [
  "Plate area: \u03c0(36) = 113.04 cm\u00b2.",
  "Board: 576 cm\u00b2.",
  "P = 113.04/576 \u2248 0.196.",
 ],
 "why": ["Area over area, both in cm\u00b2."],
 "hinglish": "113.04/576 \u2248 0.196. \u03c0/16 hi hai actually (36\u03c0/576).",
 "answer": "\u2248 0.196"}),

("q", {"n": 127, "level": "High", "concept": "Mixed: Ch1 circle membership",
 "stem": "Show that (1, 7), (5, 5) and (-5, 5)... check membership on x\u00b2 + y\u00b2 = 50 and find the radius.",
 "steps": [
  "(1,7): 1 + 49 = 50 \u2713. (5,5): 25 + 25 = 50 \u2713. (-5,5): 50 \u2713.",
  "All three lie on the circle; radius = \u221a50 = 5\u221a2.",
 ],
 "why": ["Compare squared sums with r\u00b2 - never roots."],
 "hinglish": "Teeno 50 dete hain - circle par. Radius 5\u221a2.",
 "answer": "All on the circle; r = 5\u221a2"}),

("q", {"n": 128, "level": "High", "concept": "Mixed: Ch3 infinite product",
 "stem": "Evaluate 3^(1/3) \u00d7 3^(1/9) \u00d7 3^(1/27) \u00d7 ... (forever).",
 "steps": [
  "Exponent sum: 1/3 + 1/9 + 1/27 + ... = (1/3)/(1 - 1/3) = 1/2 (geometric series).",
  "Product = 3^(1/2) = \u221a3.",
 ],
 "why": ["Same-base products add exponents; the geometric series sums them."],
 "hinglish": "Exponent series 1/2 tak jata hai. Product \u221a3.",
 "answer": "\u221a3"}),

("q", {"n": 129, "level": "High", "concept": "Mixed: Ch4 sum-cube decomposition",
 "stem": "Prove: (x + y + z)\u00b3 - x\u00b3 - y\u00b3 - z\u00b3 = 3(x + y)(y + z)(z + x) and verify at x = 1, y = 2, z = 3.",
 "steps": [
  "Quote the identity (proved in Q49 of Chapter 4): both sides equal the six mixed terms plus 6xyz.",
  "Verify: LHS = 216 - 1 - 8 - 27 = 180. RHS = 3(3)(5)(4) = 180 \u2713.",
 ],
 "why": ["State the identity, then verify numerically - full-credit structure."],
 "hinglish": "Identity quote + numeric check 180 = 180. Ye combination full marks deta hai.",
 "answer": "Proved; verified 180 = 180"}),

("q", {"n": 130, "level": "High", "concept": "Mixed: Ch6+7 grand mix",
 "stem": "A circular garden of radius 21 m has a 3.5 m wide path around it. (i) Find the path area (\u03c0 = 22/7). (ii) A visitor entering a random gate lands at a random point of the OUTER circle (garden + path). What is the probability the point lies on the path?",
 "steps": [
  "(i) Outer R = 24.5 m: path = \u03c0(24.5\u00b2 - 21\u00b2) = \u03c0(600.25 - 441) = \u03c0(159.25).",
  "= (22/7)(159.25) = 22 \u00d7 22.75 = 500.5 m\u00b2.",
  "(ii) P = path area / outer area = 159.25\u03c0 / (24.5\u00b2\u03c0) = 159.25/600.25 \u2248 0.265.",
 ],
 "why": ["Part (i) is ring geometry; part (ii) reuses the same areas as a probability ratio - two chapters, one figure."],
 "hinglish": "Path 500.5 m\u00b2. Probability = \u03c0 cancel karke 159.25/600.25 \u2248 0.265. Ek figure, do concepts!",
 "answer": "(i) 500.5 m\u00b2  (ii) \u2248 0.265"}),
]
