# -*- coding: utf-8 -*-
"""Chapter 1 - Part A: intro, concept cheat sheet, question-type map."""

CH1_A = [
("h1", "Chapter 1: Orienting Yourself - The Use of Coordinates"),
("p", "This chapter teaches you how to describe the exact position of any point on a flat surface using nothing but two numbers. That sounds small, but it is the foundation of coordinate geometry, which you will use in every higher class. The uploaded PDF covers the 2-D Cartesian system (axes, origin, ordered pairs, quadrants, plotting), distances parallel to the axes, the distance formula built on the Baudhayana-Pythagoras Theorem, reflections in the axes, midpoint and trisection ideas, the collinearity test, and points on a circle centred at the origin. In this practice book we push every one of those ideas one level higher, with harder numbers, missing-value reasoning, and proof-style thinking."),
("h2", "1.1  Complete Concept Cheat Sheet (read this before any question)"),

("h3", "1.1.1  The coordinate system and its parts"),
("p", "<b>What is it?</b> A coordinate system is a grid-based framework that locates every point in a plane using an ordered pair of numbers. Two perpendicular number lines are drawn: the horizontal one is the <b>x-axis</b> and the vertical one is the <b>y-axis</b>. They meet at the <b>origin O = (0, 0)</b>. Values to the right of O on the x-axis and above O on the y-axis are positive; values to the left and below are negative."),
("p", "<b>When do I use it?</b> Whenever a question gives you points, positions on a map or a room layout, distances between locations, or asks you to 'plot', 'locate', 'identify the quadrant', or 'find the distance between points'."),
("p", "<b>How do I recognise it?</b> Any mention of (x, y) pairs, axes, quadrants, graph paper, or a floor plan with walls along two directions. <b>What does each part mean?</b> In the pair (x, y), the first number x is the <b>perpendicular distance from the y-axis</b> (measured along the x-axis direction), and the second number y is the <b>perpendicular distance from the x-axis</b>. The pair is called an <i>ordered pair</i> because the order is fixed: (3, 5) and (5, 3) are different points. Logically, you can understand it as 'walk x units horizontally, then y units vertically from O'."),
("p", "<b>Tiny example.</b> The point (2, 3) is 2 units right of O and 3 units up. The point (-2, 3) is 2 units LEFT and 3 up. Same distances, different signs, different points entirely."),

("h3", "1.1.2  Points on the axes and the quadrant sign rules"),
("bullets", [
 "A point on the x-axis always looks like (x, 0). Its y-coordinate is 0 because it has zero height above the x-axis. Positive x means right of O, negative x means left of O.",
 "A point on the y-axis always looks like (0, y). Its x-coordinate is 0. Positive y means above O, negative y means below O.",
 "The origin (0, 0) lies on BOTH axes; it belongs to no quadrant.",
 "Quadrant I: (+, +). Quadrant II: (-, +). Quadrant III: (-, -). Quadrant IV: (+, -). Memorise the cycle: starting from I and going anticlockwise the signs are ++, -+, --, +-. A quick memory trick: signs of y follow the C-shape of Roman numerals I, II, III, IV written anticlockwise; signs of x are + in I, - in II, - in III, + in IV.",
 "Any point with x = 0 and y = 0 must be the origin. Any point with both coordinates non-zero cannot lie on either axis.",
]),
("callout", "Identify-the-method trick", "See a question that says 'on the x-axis' or 'on the y-axis'? Instantly write the fixed coordinate: (something, 0) or (0, something). This single habit unlocks a whole family of missing-coordinate questions."),

("h3", "1.1.3  Distances parallel to the axes"),
("p", "<b>What is it?</b> If two points share the same y-coordinate, the segment joining them is horizontal, and the distance is simply the absolute gap between the x-values: distance = |x<sub>2</sub> - x<sub>1</sub>|. If two points share the same x-coordinate, the segment is vertical and the distance is |y<sub>2</sub> - y<sub>1</sub>|."),
("p", "<b>When do I use it?</b> Whenever two given points have one identical coordinate - check this FIRST before reaching for the distance formula. <b>How do I recognise it?</b> Same second number means a horizontal move (like walking along a corridor east-west); same first number means a vertical move. <b>Each term:</b> the absolute value bars guarantee a positive (non-negative) length; order of subtraction does not matter."),
("p", "<b>Tiny example.</b> Distance between (2, 5) and (9, 5) is |9 - 2| = 7. Distance between (4, -3) and (4, 6) is |6 - (-3)| = 9. Note the classic sign trap: 6 - (-3) = 9, not 3."),

("h3", "1.1.4  The distance formula (the star of the chapter)"),
("p", "<b>What is it?</b> For any two points A(x<sub>1</sub>, y<sub>1</sub>) and D(x<sub>2</sub>, y<sub>2</sub>), the distance is AD = <b>\u221a((x<sub>2</sub> - x<sub>1</sub>)<super>2</super> + (y<sub>2</sub> - y<sub>1</sub>)<super>2</super>)</b>. <b>Where does it come from?</b> Drop a right-angled helper triangle: the horizontal leg is |x<sub>2</sub> - x<sub>1</sub>| and the vertical leg is |y<sub>2</sub> - y<sub>1</sub>|. The segment AD is the hypotenuse, so the Baudhayana-Pythagoras Theorem (leg<super>2</super> + leg<super>2</super> = hypotenuse<super>2</super>) gives the formula. It is not a magic rule - it is Pythagoras wearing coordinates."),
("p", "<b>When do I use it?</b> When the two points differ in BOTH coordinates. <b>How do I recognise it?</b> Words like 'find the length of AB', 'how far apart', 'show that the triangle is isosceles', 'find the perimeter' with slanted sides. <b>Each term:</b> subtract corresponding coordinates, square each difference (squares kill any minus sign, so the order of the points does not matter), add, then take the positive square root."),
("p", "<b>Can it be derived logically?</b> Yes - see the helper-triangle picture in Figure 2. <b>Tiny example.</b> From (1, 2) to (4, 6): differences are 3 and 4, so distance = \u221a(9 + 16) = \u221a25 = 5. Whenever the squared sum is a perfect square you get a clean integer - examiners love the triples 3-4-5, 5-12-13, 6-8-10, 8-15-17, 9-12-15, 7-24-25."),
("bullets", [
 "<b>Method 1 (helper triangle):</b> sketch, mark legs |dx| and |dy|, apply Pythagoras. Best for learning and for verifying.",
 "<b>Method 2 (formula directly):</b> substitute into \u221a(dx<super>2</super> + dy<super>2</super>). Best for speed once confident.",
 "<b>Method 3 (shift to origin):</b> subtract the first point from both - distance is unchanged - then compute from (0, 0). Great mental shortcut: distance of (x, y) from origin is \u221a(x<super>2</super> + y<super>2</super>).",
]),
("callout", "Common confusion", "Students often compute \u221a(dx) + \u221a(dy) or dx + dy instead of \u221a(dx<super>2</super> + dy<super>2</super>). Remember: square EACH difference first, THEN add, THEN take one single square root at the very end. Never take a root midway."),

("h3", "1.1.5  Reflections in the axes"),
("p", "<b>What is it?</b> Reflecting a point in the x-axis flips its height: (x, y) becomes (x, -y). Reflecting in the y-axis flips its horizontal position: (x, y) becomes (-x, y). Reflecting in BOTH axes (equivalent to a half-turn about O) gives (-x, -y). <b>Why only one sign changes:</b> a mirror in the x-axis changes only how far up or down you are; your sideways position stays the same."),
("p", "<b>Key property:</b> reflection preserves distances. If A reflects to A' and B reflects to B', then AB = A'B'. The PDF proves this by computing both distances - the squares of the coordinate differences come out identical. Use this to check your reflection answers. <b>Tiny example.</b> A(2, 3) reflects in the x-axis to A'(2, -3). Take another point B(6, 3); it reflects to B'(6, -3). Now AB = |6 - 2| = 4 and A'B' = |6 - 2| = 4: the distance is preserved because the reflection moves the WHOLE segment, not just one endpoint. (If you compare A' with the unreflected B you get \u221a52 - but that was never a preserved pair; always compare each point with its own image.)"),

("h3", "1.1.6  Midpoint and equal-distance ideas"),
("p", "<b>What is it?</b> The midpoint of a segment splits it into two equal halves. The PDF discovers the connection experimentally: if M(m<sub>1</sub>, m<sub>2</sub>) is the midpoint of S and T, then each coordinate of M is the average of the corresponding coordinates: m<sub>1</sub> = (x<sub>S</sub> + x<sub>T</sub>)/2 and m<sub>2</sub> = (y<sub>S</sub> + y<sub>T</sub>)/2. You can verify with the distance formula: distances from M to S and from M to T come out equal. <b>Reverse use:</b> if you know one endpoint A and the midpoint M, the other endpoint is B = (2m<sub>1</sub> - x<sub>A</sub>, 2m<sub>2</sub> - y<sub>A</sub>) - just undo the averaging. <b>Trisection:</b> points P and Q that cut AB into three equal parts satisfy P = A + (B - A)/3 and Q = A + 2(B - A)/3; the midpoint of P and Q equals the midpoint of AB, which is a lovely self-check."),
("p", "<b>When do I use the average idea?</b> Keywords: 'midpoint', 'bisects', 'equally spaced', 'middle point of the segment'. <b>Tiny example.</b> Midpoint of (-4, 1) and (6, 5) is ((-4 + 6)/2, (1 + 5)/2) = (1, 3)."),

("h3", "1.1.7  Collinearity test without plotting"),
("p", "<b>What is it?</b> Three points are collinear (lie on one straight line) if one of the three distances equals the sum of the other two. Concretely, compute AB, BC, AC and check whether the largest equals the sum of the other two. <b>Why it works:</b> if B truly sits on the straight path from A to C, then walking A to B to C covers exactly the straight distance AC - no detour is possible on a straight line (triangle inequality with equality)."),
("p", "<b>When do I use it?</b> Questions like 'are these points on the same straight line?' or 'check without plotting'. <b>Trap:</b> the check must be done with EXACT values. If the distances involve roots, compare exact squared forms or keep radicals; do not round early. <b>Tiny example.</b> (0,0), (3,4), (6,8): AB = 5, BC = 5, AC = 10, and 5 + 5 = 10, so collinear."),

("h3", "1.1.8  Points on a circle centred at the origin"),
("p", "<b>What is it?</b> A circle with centre O(0, 0) and radius r is the set of points whose distance from O equals exactly r. So a point (x, y) lies ON the circle if x<super>2</super> + y<super>2</super> = r<super>2</super>, INSIDE if x<super>2</super> + y<super>2</super> is less than r<super>2</super>, and OUTSIDE if it is greater. This is just the distance-from-origin shortcut applied with an equality/inequality. <b>How do I recognise it?</b> 'Show that these points lie on a circle with centre the origin - find the radius' or 'is the point inside, on, or outside the circle?'. <b>Tiny example.</b> (1, -8), (-4, 7), (-7, -4): squares give 65, 65, 65 - all equal, so all three lie on the circle x<super>2</super> + y<super>2</super> = 65, radius \u221a65."),

("h3", "1.1.9  Exam tips for this chapter"),
("nums", [
 "Before any distance computation, CHECK whether a coordinate is shared - the parallel-to-axes shortcut saves time and avoids errors.",
 "Keep the ordered-pair order sacred. (x, y) and (y, x) coincide only when x = y.",
 "Squaring removes minus signs, so (x<sub>2</sub> - x<sub>1</sub>)<super>2</super> = (x<sub>1</sub> - x<sub>2</sub>)<super>2</super>. Do not waste time worrying about subtraction order.",
 "Memorise Pythagorean triples; they turn ugly roots into integers.",
 "For 'inside/on/outside circle' questions, compare SQUARES of distances - never square roots.",
 "After finding a reflection, quickly verify one preserved distance.",
 "In multi-part geometry questions, draw a rough sketch even if the question says 'without plotting' - your sketch guides the algebra; the algebra is what you present.",
]),

("h2", "1.2  Question Types / Concept Map for Chapter 1"),
("p", "Almost every coordinate question in exams falls into one of the following types. Use this map to label what you are looking at before solving - half the battle is knowing WHICH type of fight it is."),
("table",
 ["Type", "Name", "How to recognise it in the question", "Core method"],
 [
  ["T1", "Direct identification", "Given coordinates, find quadrant / axis / sign pattern", "Sign rules of the four quadrants"],
  ["T2", "Plotting and reading", "Mark points, read positions from a room/map figure", "Ordered pair = walk x then y"],
  ["T3", "Axis-parallel distance", "Two points share one coordinate", "|dx| or |dy| shortcut"],
  ["T4", "Distance formula", "Two points, both coordinates differ", "\u221a(dx<super>2</super> + dy<super>2</super>)"],
  ["T5", "Reverse / missing value", "Distance given, one coordinate unknown (find k)", "Set up equation, solve, check BOTH roots"],
  ["T6", "Triangle / quadrilateral classification", "Show isosceles / right / square / rhombus / parallelogram", "Compute all sides (and diagonals), compare"],
  ["T7", "Reflection reasoning", "Image of a point in x-axis / y-axis / both", "Flip the relevant sign; verify preserved distance"],
  ["T8", "Midpoint / trisection", "'M is the midpoint', 'points of trisection', 'bisects'", "Average coordinates; reverse-average for missing endpoint"],
  ["T9", "Collinearity test", "'On the same line?', 'without plotting'", "Largest distance = sum of other two (exact values)"],
  ["T10", "Circle membership", "'lie on circle with centre origin', inside/outside check", "Compare x<super>2</super> + y<super>2</super> with r<super>2</super>"],
  ["T11", "Applied grid problems", "City streets, screen pixels, room maps", "Model positions as coordinates, then use T3/T4"],
  ["T12", "Perimeter / area from coordinates", "Vertices given, find perimeter or area", "Distance formula on each side; 1/2 base x height for right triangles"],
  ["T13", "Conceptual trap questions", "Order of pair, meaning of coordinates, statements to justify", "Reason from definitions, not memory"],
  ["T14", "Multi-concept HOTS", "Combines distance + midpoint + circle or reflection chains", "Break into labelled mini-steps, verify at each junction"],
 ],
 [0.07, 0.20, 0.42, 0.31]),
("p", "Distribution of the 50 practice questions below: T1-T3 feed Q1-Q10, T4-T5 feed Q11-Q20, T6-T9 feed Q21-Q35, T10-T13 feed Q31-Q40, and T14 dominates Q41-Q50."),
]
