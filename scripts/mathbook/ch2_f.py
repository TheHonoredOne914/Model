# -*- coding: utf-8 -*-
"""Chapter 2 - Part F: formula sheet, cheat sheet, mistakes, strategy, checklist."""

CH2_F = [
("h2", "2.5  Chapter Formula Sheet"),
("table",
 ["Formula / Rule", "Meaning and when to use", "Conditions", "Tiny example", "Common mistake"],
 [
  ["Degree = highest power of the variable", "Classify a polynomial; label linear/quadratic/cubic/constant", "One-variable polynomials", "-13 has degree 0; 6z + 1 has degree 1", "Reading the first term's power instead of the max"],
  ["Value at input: substitute in brackets", "Evaluate p(a); run the machine forward", "Always bracket negatives: 7(-3)", "7x - 4 at x = -3 gives -25", "Dropping brackets: 7 - 3 - 4"],
  ["Linear pattern: T(n) = dn + c", "Constant-difference sequences; find any stage", "d = common difference; c fixed by one term", "4, 7, 10: T(n) = 3n + 1", "Using d as the constant term"],
  ["Reachability: solve dn + c = target", "Can the pattern hit a value?", "n must be a whole number for YES", "3n + 1 = 100 gives n = 33: yes", "Answering yes with a fractional n"],
  ["Growth/decay: value = start + rate x steps", "Fixed change per equal interval", "Rate sign: + growth, - decay", "10000 - 800t", "Forgetting the start value"],
  ["Run-out point: expression = 0", "When does a decaying quantity vanish", "Only when the model allows", "900 - 45t = 0 at t = 20", "Reporting a negative or fractional time uncritically"],
  ["Fit y = ax + b from two points", "Two observations of a linear bill/process", "Subtract the equations to eliminate b", "400 = 10a + b, 500 = 14a + b give a = 20? (here 10a gap gives a = 20 for the Rs 200 gap: 200/10)", "Solving both equations separately for b"],
  ["a = (y\u2082 - y\u2081)/(x\u2082 - x\u2081)", "Slope from two points; also the pattern's constant difference", "x\u2082 differs from x\u2081", "(8 - 2)/(3 - 1) = 3", "Inverting the ratio"],
  ["b = y at x = 0", "Fixed part of the relationship; where the line cuts the y-axis", "Read AFTER isolating y", "y = 2x - 5 cuts at (0, -5)", "Reading b from 3y = 6x + 12 as 12"],
  ["Parallel test: same a, different b", "Decide if two lines ever meet", "Both equations isolated for y first", "y = 2x + 3.5 and y = 2x - 11/3", "Comparing b instead of a"],
  ["y = ax passes through (0, 0)", "Zero fixed cost / proportional relationships", "b = 0", "w = 3d (work under constant force)", "Assuming every line crosses the origin"],
  ["x-intercept: set y = 0", "Where the line crosses the x-axis", "Solve ax + b = 0", "y = 2x + 8 cuts at (-4, 0)", "Swapping the roles of the two intercept rules"],
 ],
 [0.22, 0.28, 0.16, 0.19, 0.15], 8.8),

("h2", "2.6  Last-Minute Cheat Sheet"),
("callout", "30-second revision card - Chapter 2",
 "DEGREE: max power (constant = 0, linear = 1, quadratic = 2, cubic = 3). Coefficient of bare x is 1. "
 "EVALUATE with brackets. Reverse = solve. "
 "PATTERN: difference d gives rule dn + c; c from one known term. Target reachable only if n is WHOLE. "
 "FIT y = ax + b: subtract the two data equations, a = gap-ratio, b = y\u2081 - a x\u2081. a = rate per unit, b = fixed part. "
 "LINE FACTS: y = ax passes through origin; b = y-axis cut (0, b); same a = parallel; bigger |a| = steeper; negative a = decay. "
 "ISOLATE y FIRST before reading a and b."),
("bullets", [
 "<b>If you see a table of stages</b> \u2192 constant difference = coefficient of n.",
 "<b>If you see 'can it equal...'</b> \u2192 solve; whole-number n = yes, fraction = no.",
 "<b>If you see two observations of a bill/cost</b> \u2192 subtract equations, get a, back-substitute for b.",
 "<b>If you see a disguised equation (3y = 6x + 12)</b> \u2192 divide, isolate y, THEN read slope and intercept.",
 "<b>If you see 'parallel'</b> \u2192 match the slope only.",
 "<b>If you see 'x-intercept / where it crosses the x-axis'</b> \u2192 set y = 0.",
 "<b>If you see 'fixed fee + per unit'</b> \u2192 that IS y = ax + b: b = fee, a = rate.",
]),

("h2", "2.7  Mistake Buster - DON'T MAKE THESE MISTAKES"),
("nums", [
 "<b>Reading slope from a disguised equation.</b> In 3y = 6x + 12 the slope is 2, not 6. Fix: isolate y before extracting a and b - every single time.",
 "<b>Unbracketed negative substitution.</b> 7(-3) is -21; writing 7 - 3 gives a completely wrong world. Fix: brackets are not optional.",
 "<b>Calling the constant term the coefficient.</b> In 5x - 7, the coefficient of x is 5; -7 is the constant. Fix: ask 'which term is this number attached to?'",
 "<b>Saying a constant has no degree.</b> It has degree 0. Fix: remember c = c x 1 = c x x\u2070.",
 "<b>Accepting a fractional stage.</b> 'Yes, at n = 10.8' is meaningless for patterns. Fix: integrality check before saying yes.",
 "<b>Forgetting the tiered base in fares.</b> 'Rs 50 for the first 2 km' means the rate applies only to (n - 2) km. Fix: write the extra-distance expression explicitly.",
 "<b>Interpreting b as the rate.</b> In F = 1.8C + 32, the offset 32 is not a rate. Fix: slope multiplies the variable; intercept stands alone at x = 0.",
 "<b>Missing the second meaning of 'parallel lines never meet'.</b> Setting two same-slope lines equal produces an impossibility - use this as a quick proof, not a surprise.",
 "<b>Answering only x in word problems.</b> If the question asks for two numbers, both must appear in the final line. Fix: re-read the question before writing the answer.",
 "<b>Mixing up (0, b) and (b, 0).</b> The y-axis cut has x = 0. Fix: axis name tells you which coordinate is zero.",
]),

("h2", "2.8  Exam Strategy for Chapter 2"),
("p", "<b>Order of attack.</b> Definition and evaluation MCQs are fast marks - bank them first. Pattern and growth/decay questions come next (one clean substitution or solve). Keep the two-point fitting questions and multi-step HOTS (plan comparison, composition, concurrency) for the final stretch when your mind is warmed up."),
("p", "<b>Where marks are lost.</b> Top three leak-points: unbracketed substitution (mechanical error), reading a and b without isolating y (conceptual slip), and answering word problems with the bare x instead of the requested quantities (presentation loss). Each has a one-line fix: brackets always; isolate first; answer the question asked."),
("p", "<b>Formulas most frequently tested.</b> The nth-term rule dn + c, the fitting pair a = gap-ratio and b = y\u2081 - a x\u2081, growth/decay value = start + rate x steps, and the parallel condition (same slope). Interpretation sentences (what a and b MEAN) are graded almost as often as the computation itself."),
("p", "<b>Concepts that get mixed.</b> Patterns with graphs (the constant difference IS the slope), evaluation with equations (forward and backward machine runs), and linear models with money (fixed + variable structure everywhere: bills, salaries, fares). Recognising the shared skeleton turns a new word problem into an old friend."),
("p", "<b>Safe shortcuts.</b> Using x = 0 to read b directly from a table; checking a fitted model on BOTH given points before moving on; using the impossible-equation argument (3 = -1) to prove lines never meet. <b>Unsafe shortcuts.</b> Guessing the pattern rule from the first two terms only, skipping the integrality check in reachability questions, and applying the slope formula to points that were never claimed to be on one line."),
("p", "<b>How to check an answer.</b> Evaluation: recompute with brackets written explicitly. Fitted model: substitute BOTH original data points - both must reproduce their y-values. Pattern rule: test on two consecutive known terms. Word problem: translate the final numbers back into the original sentence and see if the story holds."),

("h2", "2.9  Chapter Completion Checklist"),
("bullets", [
 "[ ] Every concept covered: terms, coefficients, degree, classification, evaluation, reverse evaluation, equations from words, patterns, growth/decay, fitting y = ax + b, slope, intercept, parallel lines, graphs",
 "[ ] Every formula covered: 12 rules in Section 2.5 with conditions and micro-examples",
 "[ ] 50 advanced questions completed (Q1-Q50) with the five-band difficulty ladder",
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
