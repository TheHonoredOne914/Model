# -*- coding: utf-8 -*-
"""Chapter 3 - Part A: intro, concept cheat sheet, question-type map."""

CH3_A = [
("h1", "Chapter 3: The World of Numbers (Real Numbers)"),
("p", "Numbers are not one big happy family - they live in clearly separated neighbourhoods, and exams love to test whether you know who lives where. The uploaded PDF builds the full number map: natural numbers N, integers Z, rationals Q, irrationals, and the master set R of real numbers. It studies decimal expansions (terminating, recurring, never-ending and never-repeating), shows how to convert recurring decimals back into fractions, constructs <super></super>roots like \u221a2 and \u221a3 on the number line using right-angled triangles, proves that \u221a2 is irrational, simplifies surds, rationalises denominators, and closes with the laws of exponents. In this book every one of those ideas is pushed to competition level: reverse questions, contradiction proofs, nested radicals, and exponent equations that look impossible until you spot the base."),

("h2", "3.1  Complete Concept Cheat Sheet (read this before any question)"),

("h3", "3.1.1  The number family map: N, Z, Q, I, R"),
("p", "<b>What is it?</b> A classification of all numbers you will meet in Grade 9. <b>N</b> (natural numbers) = 1, 2, 3, ... . <b>Z</b> (integers) = ..., -2, -1, 0, 1, 2, ... - N plus zero plus the negatives. <b>Q</b> (rationals) = every number writable as p/q with p, q integers and q \u2260 0 - this includes all terminating decimals and all recurring decimals. <b>I</b> (irrationals) = real numbers that can NOT be written as p/q, like \u221a2, \u221a3, \u03c0, and decimals that go on forever without any repeating block. <b>R</b> (reals) = Q \u222a I, every point on the number line. The nesting is strict: N \u2282 Z \u2282 Q \u2282 R, while I sits beside Q inside R with I \u2229 Q = \u00d8."),
("p", "<b>When do I use it?</b> Whenever a question says 'classify', 'true or false', 'which of these is irrational', or asks about closure of operations. <b>How do I recognise the type?</b> Terminating decimal \u2192 rational. Recurring decimal \u2192 rational. Square root of a non-perfect-square \u2192 irrational. \u03c0 and e \u2192 irrational. A fraction of integers \u2192 rational (even -7/3). <b>Tiny example.</b> -4 is Z and Q and R but not N; 0.333... = 1/3 is Q; \u221a7 is I; 22/7 is Q (it is only an approximation of \u03c0, never equal to it)."),
("img", "f3_sets.png", "Figure 3.1: The number family - each set sits inside the next bigger one; irrationals live beside Q inside R.", 0.20),

("h3", "3.1.2  Decimal expansions and the denominator test"),
("p", "<b>What is it?</b> Every rational number has a decimal expansion that either STOPS (terminates) or STOPS NEVER BUT REPEATS a block (non-terminating recurring). Every irrational number has a decimal expansion that goes on forever WITHOUT any repeating block (non-terminating non-recurring). <b>The denominator test:</b> write the rational in lowest terms p/q. If q = 2<super>m</super> \u00d7 5<super>n</super> (only 2s and 5s, which are exactly the prime factors of 10), the decimal terminates; otherwise it recurs. Why 2 and 5? Because 10 = 2 \u00d7 5, so only these primes can be 'absorbed' into a power of ten."),
("p", "<b>When do I use it?</b> Questions like 'without long division, state whether the decimal will terminate'. <b>Tiny example.</b> 17/8: 8 = 2<super>3</super>, so terminating (2.125). 13/3125: 3125 = 5<super>5</super>, terminating. 7/12: 12 = 2<super>2</super> \u00d7 3 - the stray 3 forces a recurring decimal. 6/15 = 2/5 in lowest terms - always REDUCE FIRST, the reduced denominator decides."),
("callout", "The reduce-first rule", "The 2\u02e1\u00d75\u207f test works only in LOWEST TERMS. 6/15 looks non-terminating until you cancel the 3 and get 2/5 = 0.4. Reducing first is the difference between a right and a wrong answer."),

("h3", "3.1.3  Recurring decimals back to fractions (p/q form)"),
("p", "<b>What is it?</b> A reversing technique. <b>Pure recurring (repeat starts immediately):</b> count the repeating digits k, then the number = (repeating block)/(same number of 9s). Example: 0.555... = 5/9, 0.373737... = 37/99, 0.090909... = 9/99 = 1/11. <b>Mixed recurring (some non-repeating digits first):</b> (all digits once, minus the non-repeating part) / (as many 9s as repeating digits, followed by as many 0s as non-repeating digits). Example: 0.4777... = (47 - 4)/90 = 43/90."),
("p", "<b>Where does the trick come from?</b> Multiply by the right power of 10 so two copies of the repeating block line up, then subtract - the infinite tails cancel exactly and you are left with a finite equation. <b>Full derivation for 0.777...:</b> let x = 0.777...; then 10x = 7.777...; subtract: 10x - x = 7.777... - 0.777... = 7; so 9x = 7 and x = 7/9. <b>Tiny example (mixed).</b> x = 0.2333...; 10x = 2.333..., 100x = 23.33...; subtract: 90x = 21, x = 21/90 = 7/30. Always finish by reducing the fraction."),

("h3", "3.1.4  Locating roots on the number line"),
("p", "<b>What is it?</b> A compass-ruler construction. To place \u221an: build a right triangle where the hypotenuse has length \u221an using the Baudhayana-Pythagoras theorem. For \u221a2: take OA = 1 on the line, raise AB = 1 perpendicular at A; then OB = \u221a(1\u00b2 + 1\u00b2) = \u221a2; swing an arc centred at O through B down to the line. For \u221a3: repeat with the previous hypotenuse - take the segment of length \u221a2 as one leg, add a perpendicular leg of 1, get hypotenuse \u221a(2 + 1) = \u221a3. Chaining this creates the famous <b>square root spiral</b> where each new edge has length \u221a(n+1)."),
("p", "<b>When do I use it?</b> 'Show how to find \u221a5 on the number line', 'represent \u221a4.3 geometrically', and successive-magnification questions ('zoom twice and tell which two numbers \u221a3 sits between at the second decimal'). <b>Successive magnification.</b> To locate 2.6 (say \u221a7 \u2248 2.6457): between 2 and 3, then between 2.6 and 2.7, then between 2.64 and 2.65 - each zoom narrows the interval by a factor of ten. <b>Tiny example.</b> \u221a5: right triangle with legs 2 and 1, hypotenuse \u221a5, arc it down to the line between 2.2 and 2.3 (since 2.23\u00b2 \u2248 4.98, 2.24\u00b2 \u2248 5.02)."),
("img", "f3_numline.png", "Figure 3.2: Building \u221a2, \u221a3, \u221a4, \u221a5 on the number line with right triangles and arcs.", 0.20),

("h3", "3.1.5  Irrationality proofs (the contradiction method)"),
("p", "<b>What is it?</b> The classic proof that \u221a2 is irrational, done by assuming the opposite and breaking it. <b>Skeleton:</b> Step 1 - suppose \u221a2 = p/q in lowest terms (p, q coprime, q \u2260 0). Step 2 - square: p\u00b2 = 2q\u00b2, so 2 divides p\u00b2, hence 2 divides p (because if a prime divides a square, it divides the number itself). Step 3 - write p = 2r; then 4r\u00b2 = 2q\u00b2, so q\u00b2 = 2r\u00b2, hence 2 divides q too. Step 4 - both p and q even contradicts lowest terms. Conclusion: the assumption was false, so \u221a2 is irrational. The identical skeleton works for \u221a3 (replace 2 by 3) and \u221a5."),
("p", "<b>Extension questions exams adore:</b> (i) \u221a2 + \u221a3 is irrational - if it were rational, its square (5 + 2\u221a6) would be rational, forcing \u221a6 rational, contradiction; (ii) rational + irrational = irrational - if x + \u221a2 = r were rational then \u221a2 = r - x would be rational, contradiction; (iii) nonzero rational \u00d7 irrational = irrational - same subtraction trick; (iv) the sum of two irrationals may be rational (a + (-a) = 0, or (1 + \u221a2) + (1 - \u221a2) = 2) and the product may be rational (\u221a2 \u00d7 \u221a2 = 2) - so NO general rule, must test case by case."),
("callout", "Why 'a prime dividing a square divides the number'?", "If p | n\u00b2, write n = p\u00b7k + r with 0 \u2264 r < p. Squaring, n\u00b2 \u2261 r\u00b2 (mod p). For p prime, n\u00b2 \u2261 0 (mod p) forces r\u00b2 \u2261 0 (mod p), and since p is prime r must be 0. Grade 9 books justify it with prime factorisations: p | n\u00b2 means p appears in the factorisation of n\u00b2, and every prime in n\u00b2 comes from a prime in n - in pairs. One 'stray' p is impossible."),

("h3", "3.1.6  Surds: simplifying, adding, comparing"),
("p", "<b>What is it?</b> A surd is an irrational root kept in root form, like \u221a2, \u221a3, \u221a5. <b>Key laws:</b> \u221a(ab) = \u221aa \u00b7 \u221ab; \u221a(a/b) = \u221aa / \u221ab; \u221a(a\u00b2 b) = a\u221ab. <b>Simplify by extracting perfect-square factors:</b> \u221a50 = \u221a(25 \u00b7 2) = 5\u221a2; \u221a72 = \u221a(36 \u00b7 2) = 6\u221a2; \u221a245 = \u221a(49 \u00b7 5) = 7\u221a5. <b>Like surds</b> (same radicand) add like terms: 3\u221a2 + 5\u221a2 = 8\u221a2; unlike surds (3\u221a2 + 2\u221a3) canNOT merge - they just sit there. <b>Comparing surds:</b> square both sides (both positive, so order is preserved): which is bigger, 2\u221a5 or 3\u221a2? Squares give 20 vs 18, so 2\u221a5 wins. <b>Tiny example.</b> Order \u221a7, 2\u221a2, \u221a5: squares are 7, 8, 5, so 2\u221a2 > \u221a7 > \u221a5."),

("h3", "3.1.7  Rationalising the denominator"),
("p", "<b>What is it?</b> Rewriting a fraction so no surd remains in the denominator, using the difference-of-squares identity (a + b)(a - b) = a\u00b2 - b\u00b2. <b>Single surd:</b> multiply top and bottom by that surd: 1/\u221a7 = \u221a7/7. <b>Binomial denominator (\u221aa + \u221ab or a + \u221ab):</b> multiply by the <i>conjugate</i> (flip the middle sign): 1/(2 + \u221a3) = (2 - \u221a3)/((2 + \u221a3)(2 - \u221a3)) = (2 - \u221a3)/(4 - 3) = 2 - \u221a3. The denominator collapses to a clean integer because (a+b)(a-b) = a\u00b2 - b\u00b2. <b>Triple-decker:</b> for 1/(\u221a2 + \u221a3 + \u221a5), group as (\u221a2 + \u221a3) + \u221a5, rationalise once, then regroup and rationalise again - two rounds of conjugates."),
("p", "<b>Why bother?</b> Three reasons: standardized answers (everyone writes 2 - \u221a3, not 1/(2+\u221a3)), easier further computation, and more accurate decimal work (dividing by 1.73... is numerically nastier than multiplying by 0.26...). <b>Tiny example.</b> Rationalise 6/(\u221a5 - \u221a3): multiply by (\u221a5 + \u221a3): = 6(\u221a5 + \u221a3)/(5 - 3) = 3(\u221a5 + \u221a3)."),
("img", "f3_density.png", "Figure 3.3: Density - between any two real numbers, rationals and irrationals are both endless; no 'next' number exists.", 0.20),

("h3", "3.1.8  Laws of exponents"),
("p", "<b>What is it?</b> The five power rules for a real base a > 0 and integer exponents: (1) a<super>m</super> \u00b7 a<super>n</super> = a<super>m+n</super>; (2) a<super>m</super>/a<super>n</super> = a<super>m-n</super>; (3) (a<super>m</super>)<super>n</super> = a<super>mn</super>; (4) a<super>m</super> \u00b7 b<super>m</super> = (ab)<super>m</super>; (5) a\u2070 = 1, and a<super>-m</super> = 1/a<super>m</super>. Roots join the family: a<super>1/p</super> = <super>p</super>\u221aa, so 8<super>2/3</super> = (8<super>1/3</super>)\u00b2 = 2\u00b2 = 4. <b>When do I use them?</b> Simplifying expressions like (3<super>5</super> \u00b7 3<super>-2</super>), solving 2<super>x</super> = 128, or taming products like (5<super>1/2</super> \u00b7 5<super>1/3</super>). <b>Tiny example.</b> (2<super>-3</super> \u00d7 2<super>5</super>) = 2\u00b2 = 4; (3\u2070 + 4\u2070) \u00d7 2\u00b2 = 2 \u00d7 4 = 8; 64<super>-1/3</super> = 1/4."),
("callout", "Exponent equation strategy", "See 2\u02e3 = 128? Write both sides with the SAME base: 2\u02e3 = 2\u2077, so x = 7. See 3\u02e3 \u00d7 3\u02e3\u207a\u00b9 = 243? Left side is 3\u00b2\u02e3\u207a\u00b9, so 2x + 1 = 5, x = 2. See 4\u02e3 = 8? Convert: (2\u00b2)\u02e3 = 2\u00b3, so 2x = 3, x = 3/2. One base to rule them all."),

("h3", "3.1.9  Exam tips for this chapter"),
("nums", [
 "Classify numbers by writing their DECIMAL EXPANSION in your head first - the expansion type decides the set.",
 "For the 2\u02e1\u00b75\u207f test, reduce the fraction FIRST; the reduced denominator is what counts.",
 "Recurring decimal questions: name the variable x, multiply by the correct power of 10, subtract. Show the subtraction line - it carries the marks.",
 "Irrationality proofs: memorise the 4-step contradiction skeleton once, reuse it for \u221a2, \u221a3, \u221a5 by changing the prime.",
 "Simplify every surd to k\u221a(radicand) form BEFORE adding or comparing.",
 "Rationalising: the conjugate is your only tool; write the identity (a+b)(a-b) = a\u00b2 - b\u00b2 explicitly in the solution.",
 "Exponent problems: force ONE base everywhere; then equate the exponents.",
 "Never claim sums/products of irrationals are always irrational - give a counterexample if a true/false question asks.",
]),

("h2", "3.2  Question Types / Concept Map for Chapter 3"),
("p", "Label the question type before you start - in this chapter, recognising 'this is a conjugate problem' or 'this is a same-base problem' IS the solution."),
("table",
 ["Type", "Name", "How to recognise it in the question", "Core method"],
 [
  ["T1", "Set classification", "'Classify into N/Z/Q/I/R', 'true or false about number sets'", "Decimal expansion type; nesting N \u2282 Z \u2282 Q \u2282 R"],
  ["T2", "Terminating test", "'Will the decimal terminate, without division?'", "Lowest terms; denominator = 2\u1d50 \u00d7 5\u207f only"],
  ["T3", "Recurring \u2192 p/q", "'Express 0.4777... in p/q form'", "x, multiply by 10\u1d4f, subtract, solve; reduce"],
  ["T4", "Number line placement", "'Represent \u221a5 on the number line', successive magnification", "Right-triangle construction; zoom by decimals"],
  ["T5", "Irrationality proofs", "'Prove \u221a3 is irrational'", "Contradiction: assume p/q lowest terms, prime divides both"],
  ["T6", "Sum/product arguments", "'Show \u221a2 + \u221a3 irrational'; true/false on operations", "Square it / subtract-the-rational trick; counterexamples"],
  ["T7", "Surd simplification", "'Simplify \u221a72 + \u221a32 - \u221a18'", "Extract perfect squares; collect like surds"],
  ["T8", "Surds comparison", "'Which is larger: 2\u221a5 or 3\u221a2?'", "Square both (both positive); compare radicand multiples"],
  ["T9", "Rationalising", "'Rationalise 1/(2+\u221a3)', triple surds", "Multiply by conjugate; difference of squares; repeat if needed"],
  ["T10", "Exponent laws", "'Simplify (3\u2075 \u00d7 3\u207b\u00b2)/3\u00b2'", "Five power rules; combine bases"],
  ["T11", "Exponent equations", "'Solve 2\u02e3 = 128', '5\u02e3\u207b\u00b2 = 125'", "Same base both sides; equate exponents"],
  ["T12", "Between-ness and density", "'Find two irrationals between 2 and 3'", "\u221a of non-squares in range; a + small irrational tails"],
  ["T13", "Applied / construction", "Spiral of roots, geometric representations, real-life decimals", "Pythagoras chaining; interpret expansions"],
  ["T14", "Multi-concept HOTS", "Nested radicals, x + 1/\u221ax chains, proof + computation mix", "Break into labelled mini-steps, verify each junction"],
 ],
 [0.07, 0.20, 0.42, 0.31]),
("p", "Distribution of the 50 practice questions: T1-T4 feed Q1-Q10, T5-T8 feed Q11-Q22, T9-T12 feed Q23-Q40, and T13-T14 dominate Q41-Q50."),
]
