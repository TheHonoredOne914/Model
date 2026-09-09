# -*- coding: utf-8 -*-
"""Grand Revision - Part E: the exam-day one-pager."""

GR_E = [
("h2", "R.5  Exam-Day One-Pager (read this in the last 10 minutes before the bell)"),
("p", "This is the whole book folded into one page. Read it top to bottom once, breathe, and walk in."),

("h3", "The ten formulas that earn the most marks"),
("nums", [
 "Distance: d = \u221a(dx\u00b2 + dy\u00b2); from origin \u221a(x\u00b2+y\u00b2); same coordinate \u2192 single difference.",
 "Midpoint = averages; reverse: double minus the known end. Reflections: x-axis flips y, y-axis flips x.",
 "Terminating test: REDUCE, then denominator must be 2\u1d50\u00d75\u207f. Recurring \u2192 p/q: multiply, subtract, solve.",
 "Conjugate: 1/(a+\u221ab) = (a-\u221ab)/(a\u00b2-b\u00b2). Exponents: same base, then add/multiply/flip.",
 "(a\u00b1b)\u00b2 = a\u00b2 \u00b1 2ab + b\u00b2; a\u00b2-b\u00b2 = (a+b)(a-b); (x+a)(x+b): SUM on x, PRODUCT last.",
 "(a\u00b1b)\u00b3 = a\u00b3 \u00b1 3a\u00b2b + 3ab\u00b2 \u00b1 b\u00b3; a\u00b3\u00b1b\u00b3 = (a\u00b1b)(a\u00b2\u2213ab+b\u00b2).",
 "Crown: a\u00b3+b\u00b3+c\u00b3-3abc = (a+b+c)(a\u00b2+b\u00b2+c\u00b2-ab-bc-ca); zero sum \u2192 cubes = 3abc.",
 "Heron: s = P/2, A = \u221a(s(s-a)(s-b)(s-c)). Circle: C = 2\u03c0r, A = \u03c0r\u00b2.",
 "Sector: everything \u00d7 \u03b8/360; A = \u00bdlr; P = l + 2r (TWO radii). Ring: \u03c0(R\u00b2-r\u00b2).",
 "Probability: P = favourable/total, 0 \u2264 P \u2264 1; at least one = 1 - none; without replacement shrinks BOTH counts.",
]),

("h3", "The ten traps that cost the most marks"),
("nums", [
 "Root-splitting: \u221a(dx\u00b2+dy\u00b2) is ONE root at the END, never two roots added.",
 "6 - (-3) = 9. Rewrite minus-negative as plus FIRST.",
 "2\u207b\u00b3 = 1/8, not -8. Negative exponents flip.",
 "(a-b)\u00b2 ends +b\u00b2. Squares are never subtracted inside these identities.",
 "Sum-product swap in (x+a)(x+b): coefficient = SUM, constant = PRODUCT.",
 "Bridge signs: a\u00b3-b\u00b3 = (a-b)\u00b3 + 3ab(a-b) but a\u00b3+b\u00b3 = (a+b)\u00b3 - 3ab(a+b).",
 "Sector perimeter = arc + 2r. Circle area uses r, NOT d.",
 "Un-reduced fractions and un-simplified surds: divide the HCF, extract the square.",
 "Without replacement: 8 \u2192 7 \u2192 6. With 'any order': \u00d72.",
 "P outside [0, 1] means YOUR counts are wrong. Stop and recount.",
]),

("h3", "The five-minute question triage"),
("bullets", [
 "<b>First pass (easy bank):</b> identification, direct formulas, one-line evaluations - answer everything that takes under a minute.",
 "<b>Second pass (bread and butter):</b> Heron, sector, factorisation, recurring conversions, standard probability - show every line, they carry method marks.",
 "<b>Third pass (heavyweights):</b> proofs, HOTS chains, composite figures - label each identity and rule by name.",
 "<b>Last five minutes:</b> the range check on every probability, units on every quantity, and one verification line on every 'show that'.",
]),
("callout", "Final word",
 "You have 340 fully solved questions and 300 MCQs behind you. Every mistake you made in this book is a mistake you will not make in the exam hall - provided you revisited it, not just read it. Ab jao, aur phod do. All the best!"),
]
