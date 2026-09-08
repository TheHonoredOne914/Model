# -*- coding: utf-8 -*-
"""Chapter 1 - Part F: formula sheet, cheat sheet, mistake buster, exam strategy, checklist."""

CH1_F = [
("h2", "1.5  Chapter Formula Sheet"),
("p", "Every working formula of Chapter 1 in one table. Read the conditions column carefully - most wrong answers in exams are correct formulas applied in illegal situations."),
("table",
 ["Formula", "Meaning and when to use", "Conditions", "Tiny example", "Common mistake"],
 [
  ["Distance from O = \u221a(x\u00b2 + y\u00b2)", "Length of the segment joining any point to the origin; use whenever 'how far from O' appears", "Any real x, y", "(6, 8): \u221a(36 + 64) = 10", "Writing x + y instead of the square-root sum"],
  ["d = \u221a((x\u2082 - x\u2081)\u00b2 + (y\u2082 - y\u2081)\u00b2)", "Distance between ANY two points; the master formula", "Works for all real coordinates, any order of the points", "(1, 2) to (4, 6): \u221a(9 + 16) = 5", "Taking the root separately on each difference"],
  ["Horizontal distance = |x\u2082 - x\u2081|", "Two points with the same y-coordinate", "y\u2081 = y\u2082", "(2, 5) to (9, 5): 7", "Forgetting the absolute value when x\u2082 < x\u2081"],
  ["Vertical distance = |y\u2082 - y\u2081|", "Two points with the same x-coordinate", "x\u2081 = x\u2082", "(0, -4) to (0, 6): 10", "Computing 6 - (-4) as 2 instead of 10"],
  ["Midpoint M = ((x\u2081 + x\u2082)/2, (y\u2081 + y\u2082)/2)", "The point that bisects a segment; also proves diagonals bisect", "Always valid for a segment", "(-3, 8) and (5, -2) give (1, 3)", "Subtracting instead of adding, or forgetting to halve"],
  ["Reverse midpoint: B = (2m\u2081 - x\u2081, 2m\u2082 - y\u2081)", "One endpoint known with the midpoint; find the other endpoint", "Midpoint given", "M(2, -1), A(-4, 3) give B(8, -5)", "Adding the coordinates instead of subtracting"],
  ["Trisection: P = A + (B - A)/3", "Points cutting a segment into three equal parts", "P closer to A; Q = A + 2(B - A)/3", "A(4, 7), B(16, -2) give P(8, 4), Q(12, 1)", "Using half the gap (that gives the midpoint)"],
  ["Reflection in x-axis: (x, y) \u2192 (x, -y)", "Mirror image across the horizontal axis", "Only y flips", "(4, -3) gives (4, 3)", "Flipping x as well (that is a double reflection)"],
  ["Reflection in y-axis: (x, y) \u2192 (-x, y)", "Mirror image across the vertical axis", "Only x flips", "(-3, -5) gives (3, -5)", "Flipping y instead of x"],
  ["Circle test: on x\u00b2 + y\u00b2 = r\u00b2; inside if x\u00b2 + y\u00b2 < r\u00b2; outside if x\u00b2 + y\u00b2 > r\u00b2", "Classify a point against a circle centred at O", "Centre must be the origin", "(4, 2) with r = 5: 20 < 25, inside", "Comparing roots instead of squares"],
  ["Collinearity: largest distance = sum of other two", "Three points on one line", "Use EXACT values, no early rounding", "5 + 5 = 10 for (0,0), (3,4), (6,8)", "Comparing rounded decimals in near-miss cases"],
  ["Perimeter of polygon = sum of side distances", "Vertices given; add up the side lengths", "Compute each side exactly", "8 + 5 + 8 + 5 = 26 for a 8 x 5 rectangle", "Using a wrong pair of coordinates for one side"],
  ["Area of right triangle = (1/2) x leg x leg", "Right angle visible (legs axis-parallel or via converse Pythagoras)", "Legs must be the two sides forming the right angle", "(0,0), (8,0), (0,6): area 24", "Forgetting the 1/2, or using the hypotenuse as a leg"],
 ],
 [0.21, 0.28, 0.15, 0.19, 0.17], 8.8),

("h2", "1.6  Last-Minute Cheat Sheet"),
("callout", "30-second revision card - Chapter 1",
 "SIGNS: Q I (+,+), Q II (-,+), Q III (-,-), Q IV (+,-). x = 0 means y-axis, y = 0 means x-axis. "
 "DISTANCES: same y, use |x\u2082-x\u2081|; same x, use |y\u2082-y\u2081|; otherwise \u221a(dx\u00b2+dy\u00b2). From origin: \u221a(x\u00b2+y\u00b2). "
 "TRIPLES: 3-4-5, 5-12-13, 8-15-17, 7-24-25 and their multiples. "
 "MIDPOINT = averages; reverse = double minus. Reflection: x-axis flips y, y-axis flips x. "
 "CIRCLE: compare x\u00b2+y\u00b2 with r\u00b2. COLLINEAR: biggest = sum of other two. (a,b) = (b,a) only if a = b."),
("bullets", [
 "<b>If you see two points sharing a coordinate</b> \u2192 single-difference shortcut, no square root.",
 "<b>If you see 'find k' with a distance</b> \u2192 absolute value opens BOTH ways; expect two answers.",
 "<b>If you see 'inside / on / outside the circle'</b> \u2192 compare x\u00b2 + y\u00b2 with r\u00b2, never roots.",
 "<b>If you see 'midpoint of ... is M, find the other end'</b> \u2192 double the midpoint, subtract the known end.",
 "<b>If you see 'reflected in the axis'</b> \u2192 flip exactly ONE sign; two reflections flip both.",
 "<b>If you see 'without plotting, same line?'</b> \u2192 largest distance equals sum of the other two (exact values only).",
 "<b>If you see legs on the axes of a triangle</b> \u2192 right angle at the shared axis point; area = half product of legs.",
 "<b>If a question shifts a 3-4-5-style shape away from the origin</b> \u2192 the triple survives translation; just use gaps.",
]),

("h2", "1.7  Mistake Buster - DON'T MAKE THESE MISTAKES"),
("nums", [
 "<b>Coordinate-slot swap.</b> Distance from the y-axis is the x-coordinate, and from the x-axis is the y-coordinate. Writing them the other way round silently ruins the answer. Fix: say aloud 'x talks about the y-axis' while practising.",
 "<b>Sign collapse in subtraction.</b> 6 - (-3) = 9, not 3. Every vertical-distance error trace leads here. Fix: rewrite a - (negative) as a + positive BEFORE computing.",
 "<b>Root-splitting the formula.</b> \u221a(dx\u00b2 + dy\u00b2) is NOT \u221adx + \u221ady and NOT dx + dy. Fix: chant 'square, square, add, then root - once'.",
 "<b>Losing a root in 'find k' problems.</b> |4 - k| = 7 has two solutions. Fix: always write the two cases explicitly.",
 "<b>Comparing rounded roots for collinearity.</b> \u221a5 + 5 vs 2\u221a13 differ by less than 0.03; decimals mislead. Fix: compare squared values exactly.",
 "<b>Mixing up (x, y) and (y, x).</b> They coincide only on the line y = x. Fix: never 'sort' coordinates alphabetically or by size.",
 "<b>Distance written as negative.</b> Distances are never negative; a negative coordinate is a DIRECTION. Fix: absolute value before reporting any length.",
 "<b>Midpoint halving forgotten.</b> (x\u2081+x\u2082, y\u2081+y\u2082) is the double midpoint, not the midpoint. Fix: divide by 2 as a separate written step.",
 "<b>Reflection in the wrong variable.</b> x-axis reflection flips y. Students flip x because the axis is named x. Fix: 'the axis you reflect in stays fixed - the other one flips'.",
 "<b>Using the hypotenuse as a leg in area.</b> Area = half product of the two LEGS (the sides touching the right angle). Fix: locate the right angle first, then pick its two arms.",
]),

("h2", "1.8  Exam Strategy for Chapter 1"),
("p", "<b>Order of attack.</b> Begin with identification and axis-distance questions (they take under a minute each and settle your nerves). Then do standard distance-formula questions. Keep classification questions (prove square/parallelogram) and multi-part HOTS for the end, when you can give them the calm they need."),
("p", "<b>Where marks are lost.</b> In this chapter, examiners report three leak-points: sign errors under time pressure (a 2-mark question gone), single-root answers in 'find k' questions (half marks gone), and unverified classifications (method marks gone even when the answer is right). The antidote for all three is the same: write the check line - verify one distance, verify both roots, verify the defining property."),
("p", "<b>Formulas most frequently tested.</b> The distance formula (appears in almost every question), the parallel-to-axis shortcuts, the midpoint formula in both directions (find midpoint, find missing endpoint), reflection rules, and the x\u00b2 + y\u00b2 versus r\u00b2 comparison. The 3-4-5 family of triples is effectively a free speed boost in half of all numerical questions."),
("p", "<b>Concepts that get mixed.</b> Distance with midpoint (find endpoints from midpoints), distance with circle membership (inside/outside tests), reflections chained with distance (prove preservation), and collinearity with equal spacing (chain-step pattern). When two concepts combine, handle them in labelled mini-steps rather than one mega-computation."),
("p", "<b>Safe shortcuts.</b> Using recognised triples (only when the numbers match exactly), shifting both points by a common vector before computing distance, and comparing squared distances instead of roots. <b>Unsafe shortcuts.</b> Rounding roots early to compare, guessing the quadrant from a sketch drawn freehand, dropping the absolute value bars 'because the answer looks positive', and applying the midpoint formula when the question actually describes a trisection point."),
("p", "<b>How to check an answer.</b> Distance: recompute with the points interchanged - the result must be identical. Midpoint: re-average your answer with the other endpoint - you must recover the given midpoint. Reflection: check one preserved distance. Circle: recompute x\u00b2 + y\u00b2. Two minutes of checking routinely saves four to six marks."),

("h2", "1.9  Chapter Completion Checklist"),
("p", "Tick each box only when you can honestly say DONE:"),
("bullets", [
 "[ ] Every concept covered: axes, origin, ordered pairs, quadrants, axis points, distances, distance formula, reflections, midpoint, trisection, collinearity, circle membership",
 "[ ] Every formula covered: 13 formulas in Section 1.5, each with conditions and a micro-example",
 "[ ] 50 advanced questions completed (Q1-Q50), difficulty ladder respected",
 "[ ] Every question has a full step-by-step solution",
 "[ ] Every solution has a Hinglish explanation",
 "[ ] 60 MCQs completed with answers",
 "[ ] Every MCQ has an explanation plus trap analysis",
 "[ ] Formula sheet completed",
 "[ ] Last-minute cheat sheet completed",
 "[ ] Mistake buster completed (10 named mistakes)",
 "[ ] Exam strategy completed",
]),
]
