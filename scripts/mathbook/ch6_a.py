# -*- coding: utf-8 -*-
"""Chapter 6 - Part A: intro, cheat sheet, question-type map."""

CH6_A = [
("h1", "Chapter 6: Perimeter and Area"),
("p", "Measurement questions are the most reliable marks in any paper - and the most reliable marks LOST to careless formulas. The uploaded PDF assembles the full toolkit: a review of perimeters and areas of triangles, squares, rectangles and parallelograms; the meaning of \u03c0; circumference and area of circles; arc length and sector area; Heron's formula for triangles with known sides; its special cases for equilateral and isosceles triangles; area of a quadrilateral split by a diagonal; Brahmagupta's formula for cyclic quadrilaterals; and rings, paths and composite regions. This book hardens every tool: reverse questions (area back to radius), sector-perimeter traps, grazing goats, tracks with semicircular ends, and Hippocrates-style shaded regions that look impossible and collapse in one line."),
("img", "f6_heron.png", "Figure 6.1: Heron's machinery - from three sides s(a+b+c)/2 to a clean area, no heights needed.", 0.22),

("h2", "6.1  Complete Concept Cheat Sheet (read this before any question)"),

("h3", "6.1.1  Perimeter and area: the review set"),
("p", "<b>What is it?</b> Perimeter is the length of the boundary; area is the size of the enclosed surface. <b>Core formulas:</b> rectangle P = 2(l+b), A = l\u00d7b; square P = 4s, A = s\u00b2, diagonal = s\u221a2; triangle A = \u00bd \u00d7 base \u00d7 height; parallelogram A = base \u00d7 height; rhombus A = \u00bd \u00d7 d\u2081 \u00d7 d\u2082; trapezium A = \u00bd(a+b)h. <b>The perimeter-area trap:</b> equal perimeters do NOT mean equal areas - among all shapes with a fixed perimeter, the circle encloses the most area. <b>When do I use which?</b> Perimeter answers 'how much boundary/fencing/frame', area answers 'how much surface/paint/carpet/grass'."),
("p", "<b>Units discipline:</b> 1 m = 100 cm but 1 m\u00b2 = 10000 cm\u00b2; 1 hectare = 10000 m\u00b2. Converting lengths squares the conversion factor - forget this once and your answer is off by a factor of 100."),

("h3", "6.1.2  \u03c0, circumference and area of a circle"),
("p", "<b>What is \u03c0?</b> The ratio circumference/diameter - the same constant for EVERY circle, approximately 3.14159... irrational. Exam convention: \u03c0 = 22/7 when the radius is a multiple of 7, otherwise 3.14. <b>Formulas:</b> C = 2\u03c0r = \u03c0d; A = \u03c0r\u00b2. <b>Reverse uses (the exam favourites):</b> given C, r = C/(2\u03c0) then A = C\u00b2/(4\u03c0); given A, r = \u221a(A/\u03c0) then C = 2\u03c0r. <b>Scaling laws:</b> double the radius \u2192 double the circumference but QUADRUPLE the area; radii in ratio k \u2192 areas in ratio k\u00b2. <b>Tiny example.</b> r = 14 cm: C = 2 \u00d7 (22/7) \u00d7 14 = 88 cm; A = (22/7) \u00d7 196 = 616 cm\u00b2."),

("h3", "6.1.3  Arc length and sector area"),
("p", "<b>What is it?</b> A sector is the pizza slice between two radii and an arc of angle \u03b8. The full circle is 360\u00b0, so a sector owns the fraction \u03b8/360 of everything. <b>Arc length:</b> l = (\u03b8/360) \u00d7 2\u03c0r. <b>Sector area:</b> A = (\u03b8/360) \u00d7 \u03c0r\u00b2. <b>The half-angle gem:</b> A = \u00bd \u00d7 l \u00d7 r (treat the arc as a curved 'base' and the radius as the 'height'). <b>Sector PERIMETER (the trap):</b> P = arc + TWO radii = l + 2r. Writing l + r loses marks every single year. <b>Tiny example.</b> r = 21, \u03b8 = 120\u00b0: l = (120/360)(2\u00b7(22/7)\u00b721) = 44 cm; A = (1/3)\u03c0(441) = 462 cm\u00b2; P = 44 + 42 = 86 cm."),
("img", "f6_sector.png", "Figure 6.2: Sector anatomy - arc l, two radii, angle \u03b8; the slice owns \u03b8/360 of the circle.", 0.22),

("h3", "6.1.4  Heron's formula"),
("p", "<b>What is it?</b> Area of a triangle from its three sides alone, no height needed: A = \u221a(s(s-a)(s-b)(s-c)) where s = (a+b+c)/2 is the semi-perimeter. <b>Why it matters:</b> most real triangles (a field, a plot) give you sides, not heights - Heron converts three tape-measure readings into an area. <b>Worked rhythm:</b> (1) add sides, halve for s; (2) compute the three differences s-a, s-b, s-c; (3) multiply all four numbers; (4) take the square root - and SIMPLIFY the surd if it is not a perfect square. <b>Tiny example.</b> Sides 5, 12, 13: s = 15; product 15\u00b73\u00b72 = 900; A = 30. <b>Validity check:</b> each side must be less than the sum of the other two (triangle inequality), otherwise the quantity under the root goes negative - the 'triangle' does not exist."),
("callout", "Verification habit", "If the three sides satisfy a\u00b2 + b\u00b2 = c\u00b2, the triangle is right-angled and the area must equal \u00bdab. Run this cross-check whenever the sides look Pythagorean - 5-12-13, 8-15-17, 7-24-25, 9-40-41 and their scaled cousins."),

("h3", "6.1.5  Equilateral and isosceles shortcuts"),
("p", "<b>Equilateral triangle (side a):</b> height = (\u221a3/2)a, area = (\u221a3/4)a\u00b2, perimeter = 3a. The area formula saves one Heron round-trip. <b>Isosceles triangle:</b> drop the height to the base; it bisects the base. Given equal sides l and base b: height = \u221a(l\u00b2 - b\u00b2/4), area = \u00bd \u00b7 b \u00b7 height, and Heron must agree. <b>Reverse equilateral:</b> area given as k\u221a3, side a satisfies (\u221a3/4)a\u00b2 = k\u221a3 \u21d2 a = 2\u221ak. <b>Tiny example.</b> Equilateral side 12: A = (\u221a3/4)(144) = 36\u221a3 \u2248 62.35."),

("h3", "6.1.6  Quadrilateral by diagonal; Brahmagupta"),
("p", "<b>Diagonal split:</b> any quadrilateral ABCD splits along diagonal AC into triangles ABC and ACD. Find each area (heights or Heron) and ADD. This is the master method for four-sided fields with unequal sides. <b>Brahmagupta's formula (cyclic quadrilaterals):</b> if all four vertices lie on a circle and sides are a, b, c, d with s = (a+b+c+d)/2, then A = \u221a((s-a)(s-b)(s-c)(s-d)) - Heron with the (s - ...) pattern of four sides and no explicit height. It is valid ONLY for cyclic quadrilaterals; applying it to a general quadrilateral is a silent error. <b>Tiny example.</b> Sides 13, 10, 13, 10 (cyclic): s = 23; product 10\u00b713\u00b710\u00b713 = 16900; A = 130."),
("img", "f6_trap.png", "Figure 6.3: A quadrilateral split by diagonal BD - two triangles, two Herons, one sum.", 0.22),

("h3", "6.1.7  Rings, paths and composite regions"),
("p", "<b>Ring (annulus):</b> A = \u03c0R\u00b2 - \u03c0r\u00b2 = \u03c0(R\u00b2 - r\u00b2) = \u03c0(R+r)(R-r). Given width w = R - r and area, use (R+r)(R-r) = A/\u03c0 to recover both radii. <b>Inside border path:</b> rectangular field L \u00d7 B with a path of width w inside: path area = L\u00b7B - (L-2w)(B-2w). <b>Outside circular path:</b> \u03c0((r+w)\u00b2 - r\u00b2) = \u03c0w(2r + w). <b>Composite figures:</b> decompose into rectangles, triangles, sectors and rings; add or subtract; keep every \u03c0 exact until the last line. <b>Chord touching the inner circle (HOTS classic):</b> a chord of the outer circle tangent to the inner one has half-chord\u00b2 = R\u00b2 - r\u00b2, so ring area = \u03c0 \u00d7 (half-chord)\u00b2 - no radii needed!"),
("img", "f6_ring.png", "Figure 6.4: Ring geometry - a chord of the outer circle touching the inner circle fixes R\u00b2 - r\u00b2.", 0.22),

("h3", "6.1.8  Exam tips for this chapter"),
("nums", [
 "Choose \u03c0 = 22/7 when a radius or diameter is a multiple of 7; otherwise use 3.14 - and say which you used.",
 "Sector perimeter = arc + 2r. Circle perimeter = 2\u03c0r. Never mix them.",
 "Reduce every surd area (e.g. \u221a1215 = 9\u221a15) - unsimplified surds lose the final mark.",
 "Check for right triangles (Pythagoras) before Heron; \u00bd \u00d7 leg \u00d7 leg is faster and safer.",
 "Write units at every line: cm for length, cm\u00b2 for area, m\u00b2 for fields, hectares for land.",
 "In reverse questions (area \u2192 radius \u2192 circumference) keep \u03c0 symbolic until the numbers force it in.",
 "Ratio of radii k \u21d2 ratio of areas k\u00b2 - read ratios as ratios, never as differences.",
 "Cost questions: compute the geometric quantity FIRST, then multiply by rate; never mix the two steps.",
]),

("h2", "6.2  Question Types / Concept Map for Chapter 6"),
("table",
 ["Type", "Name", "How to recognise it in the question", "Core method"],
 [
  ["T1", "Basic perimeter/area", "Rectangle, square, triangle, parallelogram, rhombus, trapezium", "Direct formulas with correct units"],
  ["T2", "Heron direct", "Three sides given, area asked", "s = (a+b+c)/2; \u221a(s(s-a)(s-b)(s-c))"],
  ["T3", "Equilateral / isosceles", "'all sides equal', perimeter + base given", "(\u221a3/4)a\u00b2; height by Pythagoras"],
  ["T4", "Quadrilateral by diagonal", "Four sides plus a diagonal", "Two Herons, add"],
  ["T5", "Brahmagupta", "'cyclic quadrilateral' with four sides", "\u221a((s-a)(s-b)(s-c)(s-d))"],
  ["T6", "Circle basics + reverse", "C \u2194 r \u2194 A chains", "C = 2\u03c0r, A = \u03c0r\u00b2, reversed"],
  ["T7", "Arc and sector", "Angle \u03b8 at centre", "(\u03b8/360) fractions; A = \u00bdlr; P = l + 2r"],
  ["T8", "Segments and combinations", "'segment', chord with angle", "sector \u2212 triangle"],
  ["T9", "Rings / annulus", "Two concentric circles", "\u03c0(R\u00b2-r\u00b2); chord trick"],
  ["T10", "Paths and borders", "'path inside/outside', track, frame", "Outer minus inner"],
  ["T11", "Composite figures", "Mixed shapes, shaded regions", "Decompose; add/subtract"],
  ["T12", "Ratio and scaling", "Radii in ratio, same perimeter comparisons", "Areas scale as k\u00b2"],
  ["T13", "Cost applications", "Rates for fencing, ploughing, tiling", "Geometry first, money second"],
  ["T14", "HOTS shaded/proofs", "Lunes, hexagons, grazing animals, AP sides", "Label regions; prove then compute"],
 ],
 [0.07, 0.20, 0.42, 0.31]),
("p", "Distribution of the 70 practice questions: T1-T3 feed Q1-Q12, T4-T6 feed Q13-Q26, T7-T9 feed Q27-Q42, T10-T13 feed Q43-Q56, and T14 dominates Q57-Q70."),
]
