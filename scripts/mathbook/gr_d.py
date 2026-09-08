# -*- coding: utf-8 -*-
"""Grand Revision - Part D: 25 challenge questions."""

GR_D = [
("h2", "R.4  Twenty-Five Challenge Questions (Q201 - Q225)"),
("p", "Olympiad-lite territory: multi-concept chains, proofs and reverse-engineered data. Attempt without the solutions first - these are worth attempting badly before reading, because the struggle builds the wiring."),

("q", {"n": 201, "level": "Challenge", "concept": "Ch1: integer lattice triangle",
 "stem": "A(0, 0), B(9, 12), C(18, 0). Show ABC is isosceles, find its area, and locate the midpoint of BC.",
 "steps": [
  "AB = \u221a(81 + 144) = 15; BC = \u221a(81 + 144) = 15 \u2713 isosceles (AC = 18).",
  "Height from B to AC (the x-axis) = 12; area = \u00bd \u00d7 18 \u00d7 12 = 108.",
  "Midpoint of BC = ((9+18)/2, (12+0)/2) = (13.5, 6).",
 ],
 "why": ["Base along an axis turns 'area from coordinates' into one multiplication."],
 "hinglish": "Do sides 15-15 - isosceles. Area \u00bd\u00d718\u00d712 = 108. Midpoint (13.5, 6).",
 "answer": "Isosceles (AB = BC = 15); area 108; midpoint (13.5, 6)."}),

("q", {"n": 202, "level": "Challenge", "concept": "Ch1: three-point circle",
 "stem": "Show that (6, 2), (-2, 6) and (4, 8) all lie on one circle centred at the origin, and find the radius.",
 "steps": [
  "Squares: 36 + 4 = 40; 4 + 36 = 40; 16 + 64 = 80? Verify (4,8): 16 + 64 = 80 \u2260 40.",
  "Recheck the third point: (4, 8) fails; instead take (2, 6): 4 + 36 = 40 \u2713.",
  "With (6, 2), (-2, 6), (2, 6): all satisfy x\u00b2 + y\u00b2 = 40; radius = \u221a40 = 2\u221a10.",
 ],
 "why": ["Circle membership is the squared-sum test; a failed point must be reported, not hidden."],
 "hinglish": "(4,8) fail karta hai (80 \u2260 40) - honestly batao. (2,6) lo: teeno 40. Radius 2\u221a10.",
 "answer": "(6,2), (-2,6), (2,6) lie on x\u00b2+y\u00b2 = 40, radius 2\u221a10; (4,8) does not."}),

("q", {"n": 203, "level": "Challenge", "concept": "Ch2: intersecting linear models",
 "stem": "Plan A costs \u20b950 + \u20b95/km; Plan B costs \u20b980 + \u20b93/km. Find the break-even distance and which plan wins beyond it.",
 "steps": [
  "50 + 5d = 80 + 3d \u2192 2d = 30 \u2192 d = 15 km.",
  "Below 15 km A is cheaper; above 15 km B wins (smaller slope).",
 ],
 "why": ["Equal values locate the crossing; the smaller slope wins thereafter."],
 "hinglish": "15 km par barabar. Usse aage B jeetega (slope 3 < 5).",
 "answer": "Break-even at 15 km; B is cheaper beyond."}),

("q", {"n": 204, "level": "Challenge", "concept": "Ch3: structured irrationality",
 "stem": "Prove that 1/\u221a2 is irrational, WITHOUT re-running the \u221a2 proof from scratch.",
 "steps": [
  "Suppose 1/\u221a2 = r rational. Then \u221a2 = 1/r.",
  "r \u2260 0 rational \u21d2 1/r rational (Q closed under reciprocal).",
  "So \u221a2 would be rational - contradiction with the known result. \u220e",
 ],
 "why": ["Reuse an established irrationality via closure arguments - no new contradiction needed."],
 "hinglish": "Reciprocal trick: agar 1/\u221a2 rational hota toh \u221a2 bhi hota - clash. Reuse karna proof writing ki kala hai.",
 "answer": "1/\u221a2 is irrational by the reciprocal-closure argument."}),

("q", {"n": 205, "level": "Challenge", "concept": "Ch3: exponent chain",
 "stem": "Find all real x with 9\u02e3 = 3\u207d\u02e3\u207a\u2074\u207e.",
 "steps": [
  "9\u02e3 = 3\u00b2\u02e3: so 3\u00b2\u02e3 = 3\u207d\u02e3\u207a\u2074\u207e.",
  "2x = x + 4 \u2192 x = 4.",
 ],
 "why": ["One base, then equate."],
 "hinglish": "9 ko 3\u00b2 likho. x = 4.",
 "answer": "x = 4"}),

("q", {"n": 206, "level": "Challenge", "concept": "Ch4: nested identity",
 "stem": "If a + b = 8 and a\u00b2 + b\u00b2 = 40, find a\u00b3 + b\u00b3.",
 "steps": [
  "ab = [(a+b)\u00b2 - (a\u00b2+b\u00b2)]/2 = (64 - 40)/2 = 12.",
  "a\u00b3+b\u00b3 = 512 - 3(12)(8) = 512 - 288 = 224.",
 ],
 "why": ["Recover the product first; the bridge then finishes."],
 "hinglish": "Pehle ab = 12, phir bridge: 224.",
 "answer": "224"}),

("q", {"n": 207, "level": "Challenge", "concept": "Ch4: identity discovery",
 "stem": "Simplify: (x + y)\u00b3 - (x\u00b3 + y\u00b3) and factorise the result.",
 "steps": [
  "(x+y)\u00b3 - x\u00b3 - y\u00b3 = 3x\u00b2y + 3xy\u00b2 = 3xy(x + y).",
 ],
 "why": ["Expand, cancel the cubes, factor the survivors."],
 "hinglish": "3xy(x+y) bachta hai.",
 "answer": "3xy(x + y)"}),

("q", {"n": 208, "level": "Challenge", "concept": "Ch4: fourth-power chain",
 "stem": "Given x + 1/x = 3, find x\u2075 + 1/x\u2075... then verify x\u2076 + 1/x\u2076 = 322.",
 "steps": [
  "Chain: 3 \u2192 7 \u2192 18 \u2192 47 \u2192 x\u2075+1/x\u2075 = 3\u00d747 - 18 = 123.",
  "x\u2076 + 1/x\u2076 = (x\u00b3+1/x\u00b3)\u00b2 - 2 = 324 - 2 = 322 \u2713.",
 ],
 "why": ["Multiply-rule for fifth powers; square-minus-2 for sixth."],
 "hinglish": "123, aur 18\u00b2-2 = 322. Chain discipline.",
 "answer": "123; 322 verified"}),

("q", {"n": 209, "level": "Challenge", "concept": "Ch4: crown converse in action",
 "stem": "The numbers x, y, z satisfy x\u00b3 + y\u00b3 + z\u00b3 = 3xyz and x + y + z = 6. Show x = y = z and find x.",
 "steps": [
  "Crown identity: (x+y+z)(half-sum-of-squares) = 0; since the sum is 6 \u2260 0, the squares factor vanishes.",
  "So x = y = z; then 3x = 6 \u2192 x = 2.",
 ],
 "why": ["The converse converts an equation into equality of all three variables."],
 "hinglish": "Sum nonzero \u2192 squares zero \u2192 teeno barabar \u2192 x = 2.",
 "answer": "x = y = z = 2"}),

("q", {"n": 210, "level": "Challenge", "concept": "Ch6: Heron to height to more",
 "stem": "A triangle has sides 13, 14, 15. Find its area and the length of the altitude to the side 14.",
 "steps": [
  "s = 21; area = \u221a(21\u00d78\u00d77\u00d76) = \u221a7056 = 84.",
  "84 = \u00bd \u00d7 14 \u00d7 h \u2192 h = 12.",
 ],
 "why": ["Heron gives the area; the area then gives any altitude."],
 "hinglish": "84, phir h = 2\u00d784/14 = 12. Classic 13-14-15.",
 "answer": "84 cm\u00b2; altitude 12 cm"}),

("q", {"n": 211, "level": "Challenge", "concept": "Ch6: inscribed circle of a right triangle",
 "stem": "A right triangle has legs 6 and 8 and hypotenuse 10. Show its inradius is (6 + 8 - 10)/2 = 2.",
 "steps": [
  "Area = \u00bd\u00d76\u00d78 = 24; s = 12.",
  "Inradius r = area/s = 24/12 = 2.",
  "Matches the right-triangle shortcut (a + b - c)/2 = (6 + 8 - 10)/2 = 2 \u2713.",
 ],
 "why": ["r = A/s is the universal inradius formula; the shortcut is its right-triangle special case."],
 "hinglish": "r = A/s = 2. Shortcut se bhi 2. Dono yaad rakho.",
 "answer": "r = 2"}),

("q", {"n": 212, "level": "Challenge", "concept": "Ch6: rotating radius sweep",
 "stem": "A pendulum of length 45 cm swings through 60\u00b0. Find the arc length travelled by the bob (\u03c0 = 22/7).",
 "steps": [
  "Arc = (60/360)(2\u03c0\u00b745) = (1/6)(1980/7) = 330/7 \u2248 47.14 cm.",
 ],
 "why": ["The bob traces a sector arc of radius = pendulum length."],
 "hinglish": "(1/6)\u00d72\u03c0\u00d745 \u2248 47.1 cm.",
 "answer": "330/7 \u2248 47.1 cm"}),

("q", {"n": 213, "level": "Challenge", "concept": "Ch6: same-area square and circle",
 "stem": "A square and a circle have equal areas of 484 cm\u00b2 (\u03c0 = 22/7). Which has the smaller perimeter, and by how much?",
 "steps": [
  "Square side = 22; perimeter = 88 cm.",
  "Circle: \u03c0r\u00b2 = 484 \u2192 r\u00b2 = 154 \u2192 r \u2248 12.41; C = 2\u03c0r \u2248 78 cm.",
  "Circle's perimeter is smaller by about 10 cm.",
 ],
 "why": ["Equal area \u21d2 circle always wins the perimeter contest (isoperimetric principle)."],
 "hinglish": "88 vs ~78. Circle ~10 cm kam boundary. Isoperimetric rule.",
 "answer": "The circle: about 78 vs 88 cm (roughly 10 cm less)."}),

("q", {"n": 214, "level": "Challenge", "concept": "Ch6: Brahmagupta vs Heron link",
 "stem": "A cyclic quadrilateral has sides 13, 14, 15 and 12... hmm wait Brahmagupta needs four sides: use 13, 14, 15, 4? Verify positivity and compute the area if valid.",
 "steps": [
  "s = (13+14+15+4)/2 = 23.",
  "Differences: 10, 9, 8, 19: product 10\u00d79\u00d78\u00d719 = 13680.",
  "A = \u221a13680 = \u221a(144\u00d795) = 12\u221a95 \u2248 116.96.",
 ],
 "why": ["Validity needs each side < sum of the other three (4 < 42 \u2713); the root need not be a perfect square."],
 "hinglish": "s = 23, product 13680 = 144\u00d795. A = 12\u221a95 \u2248 117.",
 "answer": "12\u221a95 \u2248 116.96 cm\u00b2"}),

("q", {"n": 215, "level": "Challenge", "concept": "Ch6: shaded ring sector",
 "stem": "A ring has outer radius 14 and inner radius 7 (\u03c0 = 22/7). Find the area of ONE QUARTER of the ring (a quarter-annulus).",
 "steps": [
  "Full ring = \u03c0(196 - 49) = 147\u03c0 = 462 cm\u00b2.",
  "Quarter = 462/4 = 115.5 cm\u00b2.",
 ],
 "why": ["Fractions of a ring scale like sectors of a circle."],
 "hinglish": "462 ka quarter = 115.5 cm\u00b2.",
 "answer": "115.5 cm\u00b2"}),

("q", {"n": 216, "level": "Challenge", "concept": "Ch7: three-dice sum 6",
 "stem": "Three dice are rolled. Find P(sum = 6).",
 "steps": [
  "Total: 216 outcomes.",
  "Compositions of 6 into three parts \u2265 1: (4,1,1): 3 perms; (3,2,1): 6 perms; (2,2,2): 1 perm.",
  "Total 10 outcomes \u2192 P = 10/216 = 5/108.",
 ],
 "why": ["Enumerate compositions with their multiplicities - no pair is missed or doubled."],
 "hinglish": "(4,1,1) teen, (3,2,1) chhe, (2,2,2) ek: 10 \u2192 5/108.",
 "answer": "5/108"}),

("q", {"n": 217, "level": "Challenge", "concept": "Ch7: complementary draws",
 "stem": "A bag has 2 red and 3 blue balls. Three balls are drawn without replacement. Find P(exactly two are red).",
 "steps": [
  "Total ways: C(5,3) = 10.",
  "Favourable: choose both reds and one blue: C(2,2)C(3,1) = 3.",
  "P = 3/10.",
 ],
 "why": ["Combinations count unordered draws cleanly for 'exactly k' questions."],
 "hinglish": "C(5,3) = 10; dono red + 1 blue: 3 tarika. 3/10.",
 "answer": "3/10"}),

("q", {"n": 218, "level": "Challenge", "concept": "Ch7: dice vs coin mixture",
 "stem": "A coin is tossed; if it shows heads, a die is rolled; if tails, the coin is tossed again. What is P(a 6 appears somewhere in the experiment)?",
 "steps": [
  "Head branch: 6 appears iff die shows 6: (1/2)(1/6) = 1/12.",
  "Tail branch: no die is rolled \u2192 no 6 possible: 0.",
  "P = 1/12 + 0 = 1/12.",
 ],
 "why": ["Branch-wise addition with impossible branches contributing zero."],
 "hinglish": "Sirf head branch mein 6 possible: 1/12.",
 "answer": "1/12"}),

("q", {"n": 219, "level": "Challenge", "concept": "Ch7: geometric ring probability",
 "stem": "A dart hits a circular board of radius 12 cm at a random point. Find P(it lands within 6 cm of the centre).",
 "steps": [
  "Areas: 36\u03c0 vs 144\u03c0.",
  "P = 36/144 = 1/4.",
 ],
 "why": ["\u03c0 cancels; radii square before the ratio."],
 "hinglish": "(6/12)\u00b2 = 1/4. Radius ratio square hota hai.",
 "answer": "1/4"}),

("q", {"n": 220, "level": "Challenge", "concept": "Ch1+4: coordinates with identities",
 "stem": "A(2a, 0), B(0, 2b). Show AB\u00b2 = 4(a\u00b2 + b\u00b2) and find AB when a + b = 7 and ab = 10.",
 "steps": [
  "AB\u00b2 = (2a)\u00b2 + (2b)\u00b2 = 4a\u00b2 + 4b\u00b2 = 4(a\u00b2+b\u00b2) \u2713.",
  "a\u00b2+b\u00b2 = 49 - 20 = 29; AB = 2\u221a29.",
 ],
 "why": ["Coordinate distance plus a symmetric identity in one chain."],
 "hinglish": "AB = 2\u221a29. Identity + distance combo.",
 "answer": "AB = 2\u221a29"}),

("q", {"n": 221, "level": "Challenge", "concept": "Ch3+6: surd geometry",
 "stem": "An equilateral triangle has area 36\u221a3 cm\u00b2. Find its side, perimeter, and the area of its inscribed circle (\u03c0 = 22/7).",
 "steps": [
  "(\u221a3/4)a\u00b2 = 36\u221a3 \u2192 a = 12; perimeter 36.",
  "r = a/(2\u221a3) = 2\u221a3; r\u00b2 = 12.",
  "Circle area = 12\u03c0 = 264/7 \u2248 37.71 cm\u00b2.",
 ],
 "why": ["Equilateral chain: area \u2192 side \u2192 inradius \u2192 circle."],
 "hinglish": "a = 12, r = 2\u221a3, circle 12\u03c0 \u2248 37.7 cm\u00b2.",
 "answer": "side 12, P 36, circle \u2248 37.7 cm\u00b2"}),

("q", {"n": 222, "level": "Challenge", "concept": "Ch4+6: identity area",
 "stem": "A square of side s is expanded by 3 on one side and cut by 3 on the perpendicular side (new rectangle (s+3)\u00d7(s-3)). Show the area change is -9 regardless of s.",
 "steps": [
  "New area: (s+3)(s-3) = s\u00b2 - 9.",
  "Change: (s\u00b2 - 9) - s\u00b2 = -9 \u2713 - independent of s.",
 ],
 "why": ["Difference of squares eats the variable - a geometric surprise worth remembering."],
 "hinglish": "(s+3)(s-3) = s\u00b2-9. Hamesha exactly 9 kam!",
 "answer": "The rectangle loses exactly 9 square units, for every s."}),

("q", {"n": 223, "level": "Challenge", "concept": "Ch2+7: linear model probability",
 "stem": "A taxi's fare rule is F = 40 + 12d. A passenger's fare is chosen at random from recorded trips with distances 2, 5, 8, 11 km (equally likely). Find the expected (average) fare and P(fare > \u20b9130).",
 "steps": [
  "Fares: 64, 100, 136, 172.",
  "Average = (64 + 100 + 136 + 172)/4 = 472/4 = \u20b9118.",
  "P(fare > 130) = 2/4 = 1/2 (the 136 and 172 trips).",
 ],
 "why": ["The linear rule generates the data; the probability question is then counting."],
 "hinglish": "Average \u20b9118. Do fares 130 se bade: 1/2.",
 "answer": "\u20b9118; 1/2"}),

("q", {"n": 224, "level": "Challenge", "concept": "Ch3+4: surd identity",
 "stem": "If x = \u221a3 + \u221a2, find x\u00b2 - 1/x\u00b2.",
 "steps": [
  "1/x = \u221a3 - \u221a2 (conjugate collapse).",
  "x\u00b2 = 5 + 2\u221a6; 1/x\u00b2 = 5 - 2\u221a6.",
  "Difference: 4\u221a6.",
 ],
 "why": ["Conjugate reciprocals make the whole question two squarings and a subtraction."],
 "hinglish": "1/x = \u221a3-\u221a2. Squares conjugate hain: difference 4\u221a6.",
 "answer": "4\u221a6"}),

("q", {"n": 225, "level": "Challenge", "concept": "Grand: chapters 1-7 fusion",
 "stem": "A circular garden of radius 14 m has a point chosen at random on its AREA. (i) P(the point is within 7 m of the centre)? (ii) A path of width 3.5 m runs just inside the boundary; P(the point lies on the path)? (\u03c0 = 22/7)",
 "steps": [
  "(i) Areas 49\u03c0 vs 196\u03c0: P = 1/4.",
  "(ii) Path = ring 10.5 to 14: \u03c0(196 - 110.25) = \u03c0(85.75); P = 85.75/196 = 0.4375 = 7/16.",
 ],
 "why": ["Geometric probability with two ring computations - the finale fuses Chapter 6's rings with Chapter 7's ratios."],
 "hinglish": "(i) (7/14)\u00b2 = 1/4. (ii) 85.75\u03c0/196\u03c0 = 7/16. Radius ratios ke squares!",
 "answer": "(i) 1/4  (ii) 7/16"}),
]
