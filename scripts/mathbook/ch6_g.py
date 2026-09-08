# -*- coding: utf-8 -*-
"""Chapter 6 - Part G: formula sheet, cheat sheet, mistake buster, exam strategy, checklist."""

CH6_G = [
("h2", "6.5  Chapter Formula Sheet"),
("p", "Every area and perimeter formula of the chapter with its conditions and its signature mistake."),
("table",
 ["Formula", "Meaning / when to use", "Conditions", "Tiny example", "Common mistake"],
 [
  ["P = 2(l+b), A = l\u00d7b", "Rectangle boundary and surface", "Opposite sides equal", "12.5\u00d78: P 41, A 100", "Perimeter = l+b only"],
  ["P = 4s, A = s\u00b2, diag = s\u221a2", "Square trio", "All sides equal", "s = 16: 64, 256, 16\u221a2", "Diagonal = s\u221a3"],
  ["A = \u00bd \u00d7 base \u00d7 height", "Any triangle with a known height", "Height perpendicular to base", "\u00bd\u00d714\u00d79 = 63", "Dropping the \u00bd"],
  ["A = base \u00d7 height", "Parallelogram", "Height between the parallel sides", "10\u00d76.5 = 65", "Using the slant side as height"],
  ["A = \u00bd d\u2081d\u2082", "Rhombus from diagonals", "Diagonals perpendicular", "\u00bd\u00d712\u00d716 = 96", "Forgetting the \u00bd"],
  ["A = \u00bd(a+b)h", "Trapezium", "a, b parallel", "\u00bd(12+8)5 = 50", "Using slant sides in the sum"],
  ["Heron: A = \u221a(s(s-a)(s-b)(s-c))", "Area from three sides", "s = (a+b+c)/2; triangle inequality", "5,12,13 \u2192 30", "s taken as full perimeter"],
  ["Equilateral: A = (\u221a3/4)a\u00b2, h = (\u221a3/2)a", "Equal sides", "All sides a", "a = 12 \u2192 36\u221a3", "Wrong \u221a3 placement"],
  ["C = 2\u03c0r = \u03c0d, A = \u03c0r\u00b2", "Circle basics", "\u03c0 = 22/7 or 3.14 as stated", "r = 14: 88, 616", "\u03c0d\u00b2 for area"],
  ["Arc l = (\u03b8/360)\u00b72\u03c0r", "Curved boundary piece", "\u03b8 in degrees", "90\u00b0, r 7 \u2192 11", "Using \u03c0r instead of 2\u03c0r"],
  ["Sector A = (\u03b8/360)\u03c0r\u00b2 = \u00bdlr", "Pizza slice area", "\u03b8 in degrees or use arc", "120\u00b0, r 21 \u2192 462", "Mixing arc into r\u00b2"],
  ["Sector P = l + 2r", "Boundary of a sector", "One arc + two radii", "44 + 42 = 86", "Adding only one radius"],
  ["Ring A = \u03c0(R\u00b2-r\u00b2) = \u03c0(R+r)(R-r)", "Annulus", "Concentric circles", "\u03c0(100-36) with 10, 6", "Width treated as R"],
  ["Brahmagupta: A = \u221a((s-a)(s-b)(s-c)(s-d))", "Cyclic quadrilateral from sides", "Must be cyclic; s = half perimeter", "13,10,13,10 \u2192 130", "Applying to any quadrilateral"],
  ["Inside path: L\u00b7B - (L-2w)(B-2w)", "Border strip inside a rectangle", "Path inside along all sides", "30\u00d720, w 2 \u2192 184", "Subtracting w only once"],
 ],
 [0.21, 0.24, 0.19, 0.18, 0.18], 8.6),

("h2", "6.6  Last-Minute Cheat Sheet"),
("callout", "30-second revision card - Chapter 6",
 "TRIANGLE: \u00bdbh with height; Heron \u221a(s(s-a)(s-b)(s-c)) with s = P/2. Right triangle? \u00bd\u00d7leg\u00d7leg. "
 "EQUILATERAL: (\u221a3/4)a\u00b2; h = (\u221a3/2)a; r = a/(2\u221a3). "
 "CIRCLE: C = 2\u03c0r, A = \u03c0r\u00b2; reverse: r = C/2\u03c0, r = \u221a(A/\u03c0). "
 "SECTOR: everything \u00d7 \u03b8/360; A = \u00bdlr; P = l + 2r. "
 "RING: \u03c0(R\u00b2-r\u00b2) = \u03c0(R+r)(R-r); chord trick: ring = \u03c0(half-chord)\u00b2. "
 "BRAHMAGUPTA (cyclic only): \u221a((s-a)(s-b)(s-c)(s-d)). "
 "QUADRILATERAL: split by diagonal, add two areas. "
 "SCALING: radius \u00d7k \u21d2 C \u00d7k, A \u00d7k\u00b2. "
 "Same perimeter: circle beats square beats triangle."),
("bullets", [
 "<b>If you see three sides only</b> \u2192 Heron; check Pythagoras first for a shortcut.",
 "<b>If you see 'cyclic quadrilateral'</b> \u2192 Brahmagupta; otherwise split by a diagonal.",
 "<b>If you see an angle at the centre</b> \u2192 multiply every circle quantity by \u03b8/360.",
 "<b>If you see sector perimeter</b> \u2192 arc + 2r, never arc + r.",
 "<b>If you see a path inside</b> \u2192 subtract 2w from each dimension.",
 "<b>If you see a chord touching the inner circle</b> \u2192 ring area = \u03c0(half-chord)\u00b2.",
 "<b>If you see ratios of radii</b> \u2192 circumferences in ratio k, areas in ratio k\u00b2.",
 "<b>If you see rates</b> \u2192 perimeter \u00d7 (rate/metre), area \u00d7 (rate/m\u00b2).",
]),

("h2", "6.7  Mistake Buster - DON'T MAKE THESE MISTAKES"),
("nums", [
 "<b>Diameter used as radius.</b> \u03c0r\u00b2 with r = diameter silently quadruples the area. Fix: halve the diameter FIRST, on paper.",
 "<b>\u00bd dropped in triangle area.</b> \u00bd \u00d7 b \u00d7 h is not b \u00d7 h. Fix: write the \u00bd before the numbers.",
 "<b>Full perimeter instead of semi-perimeter in Heron.</b> Using s = a+b+c doubles s and wrecks the root. Fix: divide by 2 as its own line.",
 "<b>Arc + one radius for sector perimeter.</b> A sector has TWO straight edges. Fix: sketch the slice and trace its boundary.",
 "<b>Width added to diameter.</b> A path's width widens the RADIUS by w, not the diameter by w. Fix: R = r + w explicitly.",
 "<b>Unsimplified surd areas.</b> \u221a1215 is not an answer; 9\u221a15 is. Fix: extract the largest square factor.",
 "<b>Brahmagupta on non-cyclic quadrilaterals.</b> The formula demands a circumcircle. Fix: read for 'cyclic' before using it.",
 "<b>Linear scaling of areas.</b> Double radius = quadruple area. Fix: k\u00b2 chant.",
 "<b>Rounding \u03c0 too early.</b> 22/7 \u2248 3.142857; rounding to 3.14 before multiplying shifts every answer. Fix: keep the fraction to the last line.",
 "<b>Mixed units.</b> Fence in m, area in m\u00b2, land in hectares. Fix: attach units to every intermediate quantity.",
]),

("h2", "6.8  Exam Strategy for Chapter 6"),
("p", "<b>Order of attack.</b> Direct formula questions first (circle basics, rectangle trio) - they are 1-2 marks each and error-proof with discipline. Heron questions next: they are procedural and reward steady arithmetic. Keep sector-perimeter, ring-reverse and composite/shaded questions for later slots; they reward calm reading more than speed."),
("p", "<b>Where marks are lost.</b> Five leak-points: radius/diameter confusion (fatal, 3-mark question), missing \u00bd (triangle and rhombus), sector perimeter missing a radius (2 marks gone), unsimplified surds (final answer mark), and unit slips in cost questions (rate/metre vs rate/m\u00b2). Every one is prevented by the same habit: write the formula BEFORE substituting numbers."),
("p", "<b>Formulas most frequently tested.</b> Heron's formula (with ratio-perimeter setups), circle reverse chains (C \u2194 r \u2194 A), sector area with 90\u00b0/120\u00b0/60\u00b0 angles, ring areas, and the quadrilateral-by-diagonal method. Brahmagupta appears as a 2-3 mark formula application - know its cyclic condition."),
("p", "<b>Concepts that get mixed.</b> Arc length with sector area (one is 1-D, one is 2-D), sector perimeter with circle circumference, ring width with outer radius, and area ratio with radius ratio. Keep a two-column scrap layout: lengths on the left, areas on the right."),
("p", "<b>Safe shortcuts.</b> \u00bdlr for sector area; (R+r)(R-r) factorisation for rings; the chord-touch trick; Pythagoras spotting before Heron. <b>Unsafe shortcuts.</b> Assuming a quadrilateral is cyclic; using 3.14 for 22/7 problems with multiples of 7; estimating \u221a without extracting squares; applying trapezium formula when the quadrilateral is not a trapezium."),
("p", "<b>How to check an answer.</b> Sanity-scale every area (is it in the right magnitude?); recompute one Heron difference; verify sector fractions sum to the whole circle; and for cost problems, re-read the rate's unit before the final multiplication. Ten seconds of checking per question routinely saves a full grade band."),

("h2", "6.9  Chapter Completion Checklist"),
("p", "Tick each box only when you can honestly say DONE:"),
("bullets", [
 "[ ] Every concept covered: basic shapes, \u03c0, circumference, circle area, arcs, sectors, segments, Heron, equilateral/isosceles, diagonal split, Brahmagupta, rings, paths, composites",
 "[ ] Every formula covered: 15 rows in Section 6.5, each with conditions and a micro-example",
 "[ ] 70 advanced questions completed (Q1-Q70), difficulty ladder respected",
 "[ ] Every question has a full step-by-step solution",
 "[ ] Every solution has a Hinglish explanation",
 "[ ] 80 MCQs completed with answers",
 "[ ] Every MCQ has an explanation plus trap analysis",
 "[ ] Formula sheet completed",
 "[ ] Last-minute cheat sheet completed",
 "[ ] Mistake buster completed (10 named mistakes)",
 "[ ] Exam strategy completed",
]),
]
