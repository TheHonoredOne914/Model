# -*- coding: utf-8 -*-
"""Chapter 4 - Part G: formula sheet, cheat sheet, mistake buster, exam strategy, checklist."""

CH4_G = [
("h2", "4.5  Chapter Formula Sheet"),
("p", "All twelve identities plus the two bridges. The right column names the mistake that kills each one in exams."),
("table",
 ["Identity / Bridge", "Statement", "Conditions", "Tiny example", "Common mistake"],
 [
  ["Square, sum", "(a+b)\u00b2 = a\u00b2+2ab+b\u00b2", "Always", "(3x+2)\u00b2 = 9x\u00b2+12x+4", "Dropping 2ab"],
  ["Square, difference", "(a-b)\u00b2 = a\u00b2-2ab+b\u00b2", "Always", "(5-y)\u00b2 = 25-10y+y\u00b2", "Writing -b\u00b2 at the end"],
  ["Two-square difference", "a\u00b2-b\u00b2 = (a+b)(a-b)", "Always (reversible)", "49x\u00b2-36 = (7x+6)(7x-6)", "Mixing it with (a-b)\u00b2"],
  ["Companion, sum", "(a+b)\u00b2+(a-b)\u00b2 = 2(a\u00b2+b\u00b2)", "Always", "58 = 2(a\u00b2+b\u00b2) from 10, 4", "Sign slips in expansion"],
  ["Companion, difference", "(a+b)\u00b2-(a-b)\u00b2 = 4ab", "Always", "4\u00d75.5\u00d74.5 = 99", "Confusing with (a+b)(a-b)"],
  ["(x+a)(x+b)", "x\u00b2+(a+b)x+ab", "Always", "(x+4)(x+7) = x\u00b2+11x+28", "Swapping sum and product"],
  ["Trinomial square", "(a+b+c)\u00b2 = \u03a3a\u00b2+2\u03a3ab", "Three pairs, each twice", "(2p+3q-4r)\u00b2", "Two cross terms only"],
  ["Cube, sum", "(a+b)\u00b3 = a\u00b3+3a\u00b2b+3ab\u00b2+b\u00b3", "Always", "(x+2)\u00b3", "Losing the 3s"],
  ["Cube, difference", "(a-b)\u00b3 = a\u00b3-3a\u00b2b+3ab\u00b2-b\u00b3", "Alternating signs", "(2m-3n)\u00b3", "Last term positive"],
  ["Sum of cubes", "a\u00b3+b\u00b3 = (a+b)(a\u00b2-ab+b\u00b2)", "Always", "8a\u00b3+27b\u00b3", "Trinomial middle sign"],
  ["Difference of cubes", "a\u00b3-b\u00b3 = (a-b)(a\u00b2+ab+b\u00b2)", "Always", "x\u00b3-27", "Binomial sign"],
  ["Crown identity", "a\u00b3+b\u00b3+c\u00b3-3abc = (a+b+c)(a\u00b2+b\u00b2+c\u00b2-ab-bc-ca)", "Always; zero-sum shortcut when a+b+c = 0", "12\u00b3+1\u00b3+(-13)\u00b3 = 3(12)(1)(-13)", "Forgetting the converse cases"],
  ["Cube bridges", "a\u00b3\u00b1b\u00b3 = (a\u00b1b)\u00b3 \u2213 3ab(a\u00b1b)", "Given sum/difference and product", "12, 27 \u2192 756", "Sign of the 3ab term"],
  ["Half-sum of squares", "a\u00b2+b\u00b2+c\u00b2-ab-bc-ca = \u00bd[(a-b)\u00b2+(b-c)\u00b2+(c-a)\u00b2]", "\u2265 0; zero iff a = b = c", "Converse of zero-sum", "Missing the equality condition"],
 ],
 [0.16, 0.27, 0.20, 0.19, 0.18], 8.6),

("h2", "4.6  Last-Minute Cheat Sheet"),
("callout", "30-second revision card - Chapter 4",
 "SQUARES: (a\u00b1b)\u00b2 = a\u00b2\u00b12ab+b\u00b2. Sum of squares = (a+b)\u00b2-2ab. 4ab = (a+b)\u00b2-(a-b)\u00b2. "
 "TWO-SQUARE DIFF: (a+b)(a-b). Chains: x\u2074-n = two rounds. "
 "(x+a)(x+b): SUM on x, PRODUCT at the end. "
 "TRINOMIAL SQUARE: 3 squares + 2\u00d7(every pair); cross sign = product of parent signs. "
 "CUBES: 1-3-3-1; (a-b)\u00b3 ends -b\u00b3. a\u00b3\u00b1b\u00b3 = (a\u00b1b)(a\u00b2\u2213ab+b\u00b2). "
 "BRIDGE: a\u00b3+b\u00b3 = (a+b)\u00b3-3ab(a+b). "
 "CROWN: a\u00b3+b\u00b3+c\u00b3-3abc = (a+b+c)(...); zero sum \u21d2 cubes = 3abc; converse \u21d2 a = b = c or sum 0. "
 "x\u00b11 1/x CHAIN: square \u22132 for plus-case, +2 for minus-case."),
("bullets", [
 "<b>If you see two perfect squares subtracted</b> \u2192 (a+b)(a-b); repeat while exponents are even.",
 "<b>If you see numbers near 100</b> \u2192 write (100 \u00b1 k) and expand with the identity.",
 "<b>If you see a quadratic with three terms and square ends</b> \u2192 test the perfect-square condition (middle = 2\u221a\u00d7\u221a).",
 "<b>If you see (chunk) twice with powers</b> \u2192 substitute y = chunk, factorise, back-substitute.",
 "<b>If you see a\u00b3+b\u00b3+c\u00b3 with a zero-sum triple</b> \u2192 instantly 3abc.",
 "<b>If you see x + 1/x = s</b> \u2192 chain: s\u00b2-2, s\u00b3-3s; multiply-rule for higher powers.",
 "<b>If you see 'prove' with three brackets like (a+b), (b+c), (c+a)</b> \u2192 rename them; their sum is 2(a+b+c).",
 "<b>If you see sum-of-squares equals pair-sum</b> \u2192 half-sum-of-squares zero \u21d2 all equal.",
]),

("h2", "4.7  Mistake Buster - DON'T MAKE THESE MISTAKES"),
("nums", [
 "<b>Dropping the cross term.</b> (a+b)\u00b2 = a\u00b2+b\u00b2 is FALSE. Fix: say 'square, double product, square' out loud while expanding.",
 "<b>Negative last term.</b> (a-b)\u00b2 ends +b\u00b2. Fix: a square is never subtracted in these identities.",
 "<b>Sum/product swap in (x+a)(x+b).</b> Coefficient is the SUM, constant is the PRODUCT. Fix: expand one example to re-anchor.",
 "<b>Only two cross terms in a trinomial square.</b> Three pairs exist. Fix: list (ab), (bc), (ca) before writing.",
 "<b>Sign of a cross term guessed.</b> It is the PRODUCT of the parents' signs. Fix: underline each parent's sign first.",
 "<b>Cube pattern 1-2-3.</b> Coefficients are 1-3-3-1. Fix: memorise via (x+1)\u00b3 = x\u00b3+3x\u00b2+3x+1.",
 "<b>Trinomial sign in cube factorisation.</b> a\u00b3+b\u00b3 carries a\u00b2-AB+b\u00b2: the middle sign is OPPOSITE the binomial. Fix: verify by expanding once.",
 "<b>Bridge sign confusion.</b> a\u00b3-b\u00b3 = (a-b)\u00b3+3ab(a-b): PLUS. a\u00b3+b\u00b3 = (a+b)\u00b3-3ab(a+b): MINUS. Fix: derive from the cube expansion, never recall from memory.",
 "<b>Forgetting the \u00b1 when un-squaring.</b> (x-1/x)\u00b2 = 36 gives x-1/x = \u00b16. Fix: every un-squaring opens two cases.",
 "<b>Stopping factorisation early.</b> x\u2074-16 is not finished at (x\u00b2-4)(x\u00b2+4). Fix: expand your final answer back; every factor must be irreducible.",
]),

("h2", "4.8  Exam Strategy for Chapter 4"),
("p", "<b>Order of attack.</b> Expansion and near-number evaluation questions first (one line each, guaranteed marks). Factorisation middle-term splittings next - they are formulaic. Keep crown-identity and multi-variable questions for the middle slot, and the proof/HOTS items for the final third of your time, when the pressure of unfinished sections no longer distracts you."),
("p", "<b>Where marks are lost.</b> Four leak-points dominate: sign errors in cross terms (systematic - fix with the parent-sign rule), incomplete factorisation (the word 'completely' is a contract - deliver irreducible factors), missing \u00b1 cases after un-squaring, and skipped verification lines in 'show that' questions. The last one is the cheapest fix: one expansion line re-earning three method marks."),
("p", "<b>Identities most frequently tested.</b> (a\u00b1b)\u00b2, a\u00b2-b\u00b2, (a+b)\u00b3 and the crown identity lead the frequency table; the cube bridges and the x + 1/x chain follow close behind. Near-number evaluation (98\u00b2, 103\u00b3 style) appears in nearly every paper as a 2-3 mark gift - never leave it."),
("p", "<b>Concepts that get mixed.</b> (a-b)\u00b2 with a\u00b2-b\u00b2 (the classic), sum of cubes with cube of sum, zero-sum shortcut with its converse, and trinomial squares with completed squares. When a question mixes two identities, label each step with the identity used - the marking scheme rewards exactly that."),
("p", "<b>Safe shortcuts.</b> Substituting y for a repeated bracket; testing a claimed identity with one numerical example to reject it; using (a+b)\u00b2-(a-b)\u00b2 = 4ab to multiply nearby numbers. <b>Unsafe shortcuts.</b> Expanding (a+b+c)\u00b3 term by term under time pressure (use the identity), assuming a\u00b3+b\u00b3+c\u00b3 = 3abc without checking the sum, and 'factorising' x\u00b2+9 as (x+3)\u00b2."),
("p", "<b>How to check an answer.</b> Expansion: substitute small numbers (x = 1, y = 2) into both original and result - values must match. Factorisation: expand the last factor pair only. Bridges: plug the numbers into the bridge identity. Proofs: confirm every identity used is quoted by name."),

("h2", "4.9  Chapter Completion Checklist"),
("p", "Tick each box only when you can honestly say DONE:"),
("bullets", [
 "[ ] Every identity covered: both squares, two-square difference, companions, (x+a)(x+b), trinomial square, both cubes, both cube factorisations, crown identity",
 "[ ] Every bridge covered: cube bridges, half-sum-of-squares, sum-cube decomposition",
 "[ ] 70 advanced questions completed (Q1-Q70), difficulty ladder respected",
 "[ ] Every question has a full step-by-step solution",
 "[ ] Every solution has a Hinglish explanation",
 "[ ] 80 MCQs completed with answers",
 "[ ] Every MCQ has an explanation plus trap analysis",
 "[ ] Formula sheet completed (14 rows)",
 "[ ] Last-minute cheat sheet completed",
 "[ ] Mistake buster completed (10 named mistakes)",
 "[ ] Exam strategy completed",
]),
]
