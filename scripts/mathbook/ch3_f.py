# -*- coding: utf-8 -*-
"""Chapter 3 - Part F: formula sheet, cheat sheet, mistake buster, exam strategy, checklist."""

CH3_F = [
("h2", "3.5  Chapter Formula Sheet"),
("p", "Every working formula and rule of Chapter 3 in one table. Most wrong answers here come from using a rule outside its conditions - so read the middle column slowly."),
("table",
 ["Formula / Rule", "Meaning and when to use", "Conditions", "Tiny example", "Common mistake"],
 [
  ["N \u2282 Z \u2282 Q \u2282 R; I \u2229 Q = \u00d8", "Classify any real number", "Definition-based classification only", "-4 \u2208 Z \u2229 Q; \u221a2 \u2208 I \u2229 R", "Calling 0 natural, or 22/7 irrational"],
  ["Terminating test: q = 2\u1d50\u00d75\u207f", "Decide if p/q terminates", "p/q in LOWEST terms", "17/40: 40 = 2\u00b3\u00d75, terminates", "Testing before cancelling common factors"],
  ["Pure recurring \u2192 p/q: block/99...9", "0.\u0101\u0304b\u0304 = block (k 9s)", "Repeat begins immediately, k digits", "0.373737... = 37/99", "Using 90 instead of 99 for 2 repeating digits"],
  ["Mixed recurring: (all - head)/(9...90...0)", "0.ab\u0304c\u0304 = (abc - ab)/900 etc.", "n non-repeating, k repeating digits", "0.4777... = (47-4)/90 = 43/90", "Forgetting the trailing zeros in the denominator"],
  ["\u221a(ab) = \u221aa \u00b7 \u221ab", "Split or merge surds", "a, b \u2265 0", "\u221a50 = 5\u221a2", "\u221a(a+b) \u2260 \u221aa + \u221ab (never valid)"],
  ["\u221a(a/b) = \u221aa/\u221ab", "Split quotients of surds", "a \u2265 0, b > 0", "\u221a(18/2) = 3", "Dividing radicands when the surds are unlike"],
  ["Conjugate trick: 1/(a+\u221ab) = (a-\u221ab)/(a\u00b2-b\u00b2)", "Rationalise binomial denominators", "a\u00b2 \u2260 b\u00b2", "1/(2+\u221a3) = 2-\u221a3", "Multiplying by a non-conjugate (same sign)"],
  ["1/\u221aa = \u221aa/a", "Rationalise a lone surd denominator", "a > 0", "1/\u221a7 = \u221a7/7", "Writing \u221a7\u00b2/a and forgetting to simplify"],
  ["a\u1d50 \u00b7 a\u207f = a\u1d50\u207a\u207f", "Add exponents on multiplication", "Same base a > 0", "3\u2075 \u00b7 3\u207b\u00b2 = 3\u00b3 = 27", "Multiplying exponents instead of adding"],
  ["(a\u1d50)\u207f = a\u1d50\u207f", "Multiply exponents on powers of powers", "Same base a > 0", "(2\u00b2)\u00b3 = 2\u2076 = 64", "Adding instead of multiplying: 2\u2075 trap"],
  ["a\u207b\u1d50 = 1/a\u1d50", "Flip negative exponents", "a \u2260 0", "2\u207b\u00b3 = 1/8", "Treating 2\u207b\u00b3 as -8"],
  ["a\u2070 = 1", "Zero exponent", "a \u2260 0", "7\u2070 + 5\u2070 = 2", "Claiming 0\u2070 = 1 in proofs (undefined here)"],
  ["a\u00b9/\u1d56 = \u1d56\u221aa", "Fractional exponents are roots", "a > 0", "8\u00b2/\u00b3 = 4", "Computing 8\u00b2 first vs root first - order matters for size"],
  ["Comparing surds: square both", "Order positive surds", "Both sides positive", "2\u221a5 vs 3\u221a2: 20 > 18", "Comparing coefficients and radicands separately"],
  ["Prime-divides-square lemma", "Core of irrationality proofs", "p prime; p | n\u00b2 \u21d2 p | n", "2 | p\u00b2 \u21d2 2 | p", "Assuming it for composite p (false: 8 | 4\u00b2)"],
 ],
 [0.22, 0.25, 0.16, 0.19, 0.18], 8.8),

("h2", "3.6  Last-Minute Cheat Sheet"),
("callout", "30-second revision card - Chapter 3",
 "SETS: N \u2282 Z \u2282 Q \u2282 R; irrationals beside Q. Terminating \u2194 q = 2\u1d50\u00d75\u207f (lowest terms). "
 "RECURRING \u2192 FRACTION: x = decimal; multiply, subtract, solve. 0.d\u2081d\u2082d\u2081d\u2082... = d\u2081d\u2082/99. "
 "PROOF: \u221a2 irrational by contradiction (4 steps). Rational \u00b1 irrational = irrational. Irrational \u00d7 nonzero rational = irrational. "
 "SURDS: extract squares (\u221a50 = 5\u221a2); like surds only add. Compare by squaring. "
 "CONJUGATE: 1/(a+\u221ab) = (a-\u221ab)/(a\u00b2-b\u00b2). "
 "EXPONENTS: multiply \u2192 add; power \u2192 multiply; negative \u2192 flip; 1/p \u2192 root. Same base, then equate."),
("bullets", [
 "<b>If you see 'terminate or not?'</b> \u2192 reduce the fraction, factor the denominator into primes, look for anything besides 2 and 5.",
 "<b>If you see a repeating decimal</b> \u2192 name it x, shift, subtract; the tail cancels, the rest is algebra.",
 "<b>If you see 'prove irrational'</b> \u2192 contradiction skeleton: assume p/q lowest terms, square, prime divides both, contradiction.",
 "<b>If you see unlike surds</b> \u2192 simplify each to k\u221a( ) form before adding; different radicands never merge.",
 "<b>If you see a surd in the denominator</b> \u2192 conjugate multiply; double surds may need two rounds.",
 "<b>If you see an exponent equation</b> \u2192 force one base on both sides, then equate exponents.",
 "<b>If you see 'insert irrationals between a and b'</b> \u2192 use \u221a of non-squares in that range (e.g., between 2 and 3: \u221a5, \u221a6).",
 "<b>If you see \u03c0-type true/false</b> \u2192 22/7 and 3.14 are rational APPROXIMATIONS of \u03c0; \u03c0 itself is irrational.",
]),

("h2", "3.7  Mistake Buster - DON'T MAKE THESE MISTAKES"),
("nums", [
 "<b>Testing 2\u1d50\u00d75\u207f without reducing.</b> 6/15 fails the test raw (15 = 3\u00d75) but reduces to 2/5 which terminates. Fix: cancel first, THEN factor.",
 "<b>Wrong shift in recurring conversion.</b> For 0.4777... you need 10x and 100x (one digit non-repeating, one repeating). Shifting by the wrong powers wrecks the subtraction. Fix: shift until two identical tails align.",
 "<b>Forgetting to reduce the final fraction.</b> 43/90 from 0.4777... is already lowest terms, but 21/90 from 0.2333... must become 7/30. Fix: divide out the HCF every time.",
 "<b>'\u221a(a+b) = \u221aa + \u221ab'.</b> Fails for a = b = 1: \u221a2 \u2260 2. Roots never split over plus. Fix: only \u221a(ab) and \u221a(a/b) split.",
 "<b>Adding unlike surds.</b> 3\u221a2 + 2\u221a3 is NOT 5\u221a5. Fix: extract perfect squares first; if radicands still differ, stop.",
 "<b>Squaring only one side when comparing.</b> Both quantities are positive here, so squaring both is legal - but you must square BOTH, and square the whole thing (2\u221a5)\u00b2 = 4\u00d75 = 20, not 2\u00d75 = 10.",
 "<b>Losing a sign in conjugates.</b> (2+\u221a3)(2-\u221a3) = 4-3 = 1. If you write 4+3 you flipped the wrong sign. Fix: (a+b)(a-b), middle terms cancel, squares subtract.",
 "<b>Negative exponent sign confusion.</b> 2\u207b\u00b3 = 1/8 \u2260 -8. The minus sign in the exponent means reciprocal, not negativity. Fix: rewrite a\u207b\u1d50 as 1/a\u1d50 before any arithmetic.",
 "<b>Stopping the proof early.</b> '2 divides p\u00b2 so 2 divides p' needs the prime lemma; and you must still derive q even, THEN claim the contradiction with lowest terms. Fix: write all four steps.",
 "<b>Claiming \u03c0 = 22/7.</b> 22/7 is a two-decimal stand-in. \u03c0 is irrational; 22/7 is rational. Fix: say 'approximately' when you mean approximation.",
]),

("h2", "3.8  Exam Strategy for Chapter 3"),
("p", "<b>Order of attack.</b> Classification and terminating-test questions are 30-second wins - do them first to bank marks and build rhythm. Recurring-to-fraction conversions are steady 3-mark work. Keep irrationality proofs for the middle of the session (they need calm, ordered writing), and leave surd-chains and HOTS multi-concept items for the end."),
("p", "<b>Where marks are lost.</b> In this chapter examiners report four leak-points: unreduced fractions in the terminating test (1 mark), skipped subtraction line in recurring conversions (method mark gone even if the answer is right), missing 'both p and q even' conclusion in proofs (the whole contradiction collapses), and sign slips in conjugate multiplication (2-mark losses). The antidote: write the reduce line, write the subtract line, write all proof steps, and expand (a\u00b1b)(a\u2213b) explicitly."),
("p", "<b>Formulas most frequently tested.</b> The 2\u1d50\u00d75\u207f test, the shift-and-subtract conversion, the conjugate identity, \u221a(ab) = \u221aa\u221ab, the five exponent laws, and same-base equations. The prime lemma 'p | n\u00b2 \u21d2 p | n' is the engine of every irrationality proof - rehearse it until it is automatic."),
("p", "<b>Concepts that get mixed.</b> Surds with exponents (8\u00b2/\u00b3 style), rationalising with comparing (which is bigger AFTER rationalising), recurring decimals with set classification (0.999... = 1 is rational!), and proof questions hiding inside computation questions. When two ideas combine, separate them onto different lines."),
("p", "<b>Safe shortcuts.</b> Squaring both sides to compare positive quantities; testing a proposed identity with one numerical example to DISPROVE it (one counterexample is a full proof of falsity); using \u221an between \u221aa\u00b2 and \u221a(a+1)\u00b2 to place roots mentally. <b>Unsafe shortcuts.</b> Dividing roots over addition, rounding surds before comparing, and assuming symmetry ('if \u221a2 + \u221a3 is irrational then \u221a2 \u00d7 \u221a3 must be too' - it is not a rule, \u221a2 \u00d7 \u221a3 = \u221a6 happens to be irrational, but \u221a2 \u00d7 \u221a2 = 2 is not)."),
("p", "<b>How to check an answer.</b> p/q conversions: long-divide your fraction for two cycles - the repeat must reappear. Rationalising: multiply your answer by the original denominator; you must get back the numerator. Exponent equations: substitute back into both sides. Proofs: check you stated the assumption, the two divisibility conclusions, AND the contradiction sentence - all four carry marks."),

("h2", "3.9  Chapter Completion Checklist"),
("p", "Tick each box only when you can honestly say DONE:"),
("bullets", [
 "[ ] Every concept covered: number sets, decimal expansions, terminating test, recurring conversions, number line constructions, irrationality proofs, surds, rationalising, exponent laws",
 "[ ] Every formula covered: 15 rules in Section 3.5, each with conditions and a micro-example",
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
