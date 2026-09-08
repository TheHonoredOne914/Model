# -*- coding: utf-8 -*-
"""Chapter 4 - Part A: intro, cheat sheet, question-type map."""

CH4_A = [
("h1", "Chapter 4: Algebraic Identities and Factorisation"),
("p", "An identity is an equality that is true for EVERY value of the letters - not an equation to solve but a tool to rewrite expressions. The uploaded PDF builds the identity toolbox: squares of binomials (a \u00b1 b)\u00b2, the difference of squares a\u00b2 - b\u00b2, the product (x + a)(x + b), the trinomial square (a + b + c)\u00b2, the cubes (a \u00b1 b)\u00b3, the sum and difference of cubes a\u00b3 \u00b1 b\u00b3, and the crown jewel a\u00b3 + b\u00b3 + c\u00b3 - 3abc with its zero-sum shortcut. It then uses these to factorise polynomials and to evaluate products like 98 \u00d7 102 without a calculator. This practice book runs the toolbox at full power: three-variable cubes, nested substitutions, fourth powers, telescoping evaluations, and proof-style questions that examiners reserve for the last section."),
("img", "f4_asq.png", "Figure 4.1: The area model of (a + b)\u00b2 - a big square cut into a\u00b2, two ab strips and b\u00b2.", 0.24),

("h2", "4.1  Complete Concept Cheat Sheet (read this before any question)"),

("h3", "4.1.1  The square identities and the area model"),
("p", "<b>What is it?</b> (a + b)\u00b2 = a\u00b2 + 2ab + b\u00b2 and (a - b)\u00b2 = a\u00b2 - 2ab + b\u00b2. <b>Why true (not just memorised)?</b> Draw a square of side a + b and cut it: you get a\u00b2 (bottom-left), b\u00b2 (top-right), and TWO ab rectangles - the picture proves the formula. For (a - b)\u00b2, start with a\u00b2, remove two strips of width b (areas ab each), then add back b\u00b2 once because it was subtracted twice: a\u00b2 - 2ab + b\u00b2. <b>Companion facts:</b> (a+b)\u00b2 + (a-b)\u00b2 = 2(a\u00b2 + b\u00b2) and (a+b)\u00b2 - (a-b)\u00b2 = 4ab. The second is the 'multiply quick' engine: 5.5\u00b2 - 4.5\u00b2 = 4 \u00d7 5.5 \u00d7 4.5 = 99."),
("p", "<b>When do I use them?</b> Expanding squares, computing squares of numbers near round numbers (98\u00b2 = (100-2)\u00b2), building perfect squares (x\u00b2 + 6x + 9 = (x+3)\u00b2), and reverse-engineering a\u00b2 + b\u00b2 from (a+b) and ab. <b>Tiny example.</b> (3x - 4y)\u00b2 = 9x\u00b2 - 24xy + 16y\u00b2: square each term, double the product, keep the minus sign."),
("img", "f4_msq.png", "Figure 4.2: The area model of (a - b)\u00b2 - remove two ab strips, add back the overlapping b\u00b2.", 0.24),
("callout", "Sign discipline", "(a - b)\u00b2 has ONE minus, on the middle term only. Writing a\u00b2 - 2ab - b\u00b2 is the classic disaster. And (a+b)\u00b2 \u2260 a\u00b2 + b\u00b2 - the cross term 2ab is the whole point."),

("h3", "4.1.2  Difference of squares and (x + a)(x + b)"),
("p", "<b>What is it?</b> a\u00b2 - b\u00b2 = (a + b)(a - b). Verify by expanding: the middle terms a b and -ba cancel exactly. <b>Use it:</b> to factorise any two-square difference (49x\u00b2 - 36y\u00b2 = (7x+6y)(7x-6y)), to multiply numbers equidistant from a round number (51 \u00d7 49 = 50\u00b2 - 1\u00b2 = 2499), and to chain: x\u2074 - 81 = (x\u00b2-9)(x\u00b2+9) = (x-3)(x+3)(x\u00b2+9). <b>The (x + a)(x + b) rule:</b> = x\u00b2 + (a+b)x + ab - coefficient of x is the SUM of the constants, constant term is the PRODUCT. <b>Tiny example.</b> (x + 4)(x + 7) = x\u00b2 + 11x + 28."),

("h3", "4.1.3  The trinomial square (a + b + c)\u00b2"),
("p", "<b>What is it?</b> (a + b + c)\u00b2 = a\u00b2 + b\u00b2 + c\u00b2 + 2ab + 2bc + 2ca. Three squares plus twice every product PAIR - three pairs, not two. <b>Where does it come from?</b> Group as (a + b) + c and apply the binomial square twice. <b>Reverse use:</b> a\u00b2 + b\u00b2 + c\u00b2 = (a+b+c)\u00b2 - 2(ab+bc+ca), which converts between 'sum of squares' and 'sum of pairwise products' - the most used bridge in three-variable problems. <b>Consequence:</b> a\u00b2 + b\u00b2 + c\u00b2 - ab - bc - ca = \u00bd[(a-b)\u00b2 + (b-c)\u00b2 + (c-a)\u00b2] \u2265 0, and equals zero only when a = b = c. <b>Tiny example.</b> (2p + 3q - 4r)\u00b2 = 4p\u00b2 + 9q\u00b2 + 16r\u00b2 + 12pq - 24qr - 16pr: the sign of each cross term is the product of the signs of its parents."),

("h3", "4.1.4  The cube identities"),
("p", "<b>What is it?</b> (a + b)\u00b3 = a\u00b3 + 3a\u00b2b + 3ab\u00b2 + b\u00b3 = a\u00b3 + b\u00b3 + 3ab(a + b); (a - b)\u00b3 = a\u00b3 - 3a\u00b2b + 3ab\u00b2 - b\u00b3 = a\u00b3 - b\u00b3 - 3ab(a - b). Read the signs: all plus for (a+b)\u00b3; alternating - + - for (a-b)\u00b3 with the LAST term negative. <b>Numerical use:</b> 103\u00b3 = (100 + 3)\u00b3 = 1000000 + 90000 + 2700 + 27 = 1092727; 99\u00b3 = (100 - 1)\u00b3 = 1000000 - 30000 + 300 - 1 = 970299. <b>Reverse use:</b> a\u00b3 + b\u00b3 = (a+b)\u00b3 - 3ab(a+b) - the bridge that computes sums of cubes from the pair-sum and product."),
("img", "f4_cube.png", "Figure 4.3: (a + b)\u00b3 as a cube of side a + b, sliced into 8 blocks: a\u00b3, 3a\u00b2b, 3ab\u00b2, b\u00b3.", 0.26),
("callout", "The two cube bridges", "Given a + b and ab: a\u00b3 + b\u00b3 = (a+b)\u00b3 - 3ab(a+b). Given a - b and ab: a\u00b3 - b\u00b3 = (a-b)\u00b3 + 3ab(a-b). These two lines solve half of all 'find the cube sum' exam questions."),

("h3", "4.1.5  Sum and difference of cubes"),
("p", "<b>What is it?</b> a\u00b3 + b\u00b3 = (a + b)(a\u00b2 - ab + b\u00b2) and a\u00b3 - b\u00b3 = (a - b)(a\u00b2 + ab + b\u00b2). <b>How to remember the signs:</b> the binomial keeps the SIGN of the cube; inside the trinomial, the middle term always gets the OPPOSITE sign, and the other two are positive squares. <b>Verification for a\u00b3+b\u00b3:</b> expand (a+b)(a\u00b2-ab+b\u00b2) = a\u00b3 - a\u00b2b + ab\u00b2 + a\u00b2b - ab\u00b2 + b\u00b3 = a\u00b3 + b\u00b3 - the middle terms cancel pairwise. <b>Tiny example.</b> 8a\u00b3 + 27b\u00b3 = (2a)\u00b3 + (3b)\u00b3 = (2a + 3b)(4a\u00b2 - 6ab + 9b\u00b2)."),

("h3", "4.1.6  The crown identity: a\u00b3 + b\u00b3 + c\u00b3 - 3abc"),
("p", "<b>What is it?</b> a\u00b3 + b\u00b3 + c\u00b3 - 3abc = (a + b + c)(a\u00b2 + b\u00b2 + c\u00b2 - ab - bc - ca). <b>The zero-sum shortcut:</b> if a + b + c = 0, the right side vanishes, so a\u00b3 + b\u00b3 + c\u00b3 = 3abc exactly. This turns monsters like 12\u00b3 + 1\u00b3 + (-13)\u00b3 into one multiplication: 3 \u00d7 12 \u00d7 1 \u00d7 (-13) = -468. <b>The converse (HOTS):</b> since a\u00b2+b\u00b2+c\u00b2-ab-bc-ca = \u00bd[(a-b)\u00b2+(b-c)\u00b2+(c-a)\u00b2], the identity forces: if a\u00b3+b\u00b3+c\u00b3 = 3abc then either a + b + c = 0 or a = b = c. <b>Related identity:</b> (a+b+c)\u00b3 = a\u00b3+b\u00b3+c\u00b3 + 3(a+b)(b+c)(c+a) - another workhorse."),

("h3", "4.1.7  Factorisation toolkit (the five moves)"),
("p", "<b>Move 1 - Common factor:</b> pull out the HCF first, ALWAYS first. 6x\u00b3 + 9x\u00b2 = 3x\u00b2(2x + 3). <b>Move 2 - Grouping:</b> rearrange terms so each group shares a factor: a\u00b2 - b\u00b2 + 2bc - c\u00b2 = a\u00b2 - (b-c)\u00b2 = (a+b-c)(a-b+c). <b>Move 3 - Identity spotting:</b> perfect squares (9x\u00b2 + 6x + 1 = (3x+1)\u00b2) and cube forms (x\u00b3 - 8). <b>Move 4 - Middle-term splitting:</b> for x\u00b2 + px + q, find two numbers with sum p and product q: x\u00b2 + 7x + 12 = (x+3)(x+4). For a general quadratic ax\u00b2 + bx + c, split b into two numbers whose product is ac. <b>Move 5 - Substitution:</b> bracket a repeating chunk, factorise the simpler piece, then back-substitute: (x\u00b2-2x)\u00b2 - 23(x\u00b2-2x) + 120 becomes y\u00b2 - 23y + 120 with y = x\u00b2 - 2x."),
("p", "<b>The golden sequence:</b> common factor \u2192 identity \u2192 grouping \u2192 middle-term split \u2192 substitution. Try in that order and stop as soon as it works. <b>Always finish:</b> expand your answer mentally (or on rough paper) and check it rebuilds the original. <b>Tiny example.</b> 2x\u00b3 - 8x = 2x(x\u00b2 - 4) = 2x(x+2)(x-2) - three moves in one line."),

("h3", "4.1.8  The x + 1/x engine"),
("p", "<b>What is it?</b> A family of chained identities. Given x + 1/x = s: x\u00b2 + 1/x\u00b2 = s\u00b2 - 2; x\u00b3 + 1/x\u00b3 = s\u00b3 - 3s; x\u2074 + 1/x\u2074 = (s\u00b2-2)\u00b2 - 2; and in general each power follows from the previous two by multiplication and subtraction. Given x - 1/x = d: x\u00b2 + 1/x\u00b2 = d\u00b2 + 2 and x\u00b3 - 1/x\u00b3 = d\u00b3 + 3d. <b>Why the chains work:</b> divide (x + 1/x)\u00b2 = x\u00b2 + 2 + 1/x\u00b2 by nothing - the middle term is a CONSTANT 2, which is the magic. <b>Tiny example.</b> x + 1/x = 3 \u21d2 x\u00b2 + 1/x\u00b2 = 7 \u21d2 x\u00b3 + 1/x\u00b3 = 27 - 9 = 18 \u21d2 x\u2074 + 1/x\u2074 = 49 - 2 = 47."),

("h3", "4.1.9  Exam tips for this chapter"),
("nums", [
 "Write the identity NUMBER you are using in the margin - examiners award method marks by identity, not by memory.",
 "Common factor first, always: pulling out the HCF shrinks every later step.",
 "Numerical products: convert to (round \u00b1 small) form before choosing the identity.",
 "In three-variable squares, count your cross terms: there must be exactly three pairs, each appearing twice.",
 "Sign of a cross term = product of the signs of its two parents. Never 'guess it'.",
 "Factorisation is not finished until the last check: expand back, compare term by term.",
 "Zero-sum problems: the instant you see a + b + c = 0, write a\u00b3 + b\u00b3 + c\u00b3 = 3abc and move on.",
 "For x + 1/x chains, keep a running table: s, s\u00b2-2, s\u00b3-3s, ... - never recompute from scratch.",
]),

("h2", "4.2  Question Types / Concept Map for Chapter 4"),
("p", "Fourteen question types cover everything from a two-mark expansion to a five-mark proof. Name the type in your head, then execute."),
("table",
 ["Type", "Name", "How to recognise it in the question", "Core method"],
 [
  ["T1", "Binomial squares", "Expand (a \u00b1 b)\u00b2 with letters or numbers", "a\u00b2 \u00b1 2ab + b\u00b2"],
  ["T2", "Difference of squares", "Two perfect squares subtracted; products like 51 \u00d7 49", "(a+b)(a-b) both directions"],
  ["T3", "Near-number evaluation", "98\u00b2, 103\u00b3, 9.8 \u00d7 10.2 without calculator", "Write as (100 \u00b1 k), apply identities"],
  ["T4", "(x + a)(x + b) products", "Two binomials sharing a letter term", "x\u00b2 + (a+b)x + ab"],
  ["T5", "Trinomial squares", "Expand or build (a + b + c)\u00b2", "Three squares + 2 of each pair"],
  ["T6", "Middle-term splitting", "Factorise x\u00b2 + px + q or ax\u00b2 + bx + c", "Two numbers: sum = p, product = q (or ac)"],
  ["T7", "Cube expansion", "Expand (a \u00b1 b)\u00b3", "a\u00b3 \u00b1 3a\u00b2b + 3ab\u00b2 \u00b1 b\u00b3"],
  ["T8", "Sum/difference of cubes", "Factorise a\u00b3 \u00b1 b\u00b3", "(a \u00b1 b)(a\u00b2 \u2213 ab + b\u00b2)"],
  ["T9", "Crown identity", "a\u00b3 + b\u00b3 + c\u00b3 - 3abc; zero-sum shortcuts", "(a+b+c)(a\u00b2+b\u00b2+c\u00b2-ab-bc-ca)"],
  ["T10", "x \u00b1 1/x chains", "Given x + 1/x or x - 1/x, find powers", "Chain: s\u00b2-2, s\u00b3-3s, ..."],
  ["T11", "Symmetric relations", "Given a+b, ab; find a\u00b2+b\u00b2, a\u00b3+b\u00b3", "(a\u00b1b)\u00b2 and cube bridges"],
  ["T12", "Hard factorisation", "Grouping, substitution, a\u2074+a\u00b2+1 forms", "Five moves in golden order"],
  ["T13", "Applied / modelling", "Areas, volumes, ages, consecutive integers", "Translate to expressions, then T1-T9"],
  ["T14", "Proof / HOTS", "'Show that...', converses, chained identities", "Label every identity; end with QED line"],
 ],
 [0.07, 0.20, 0.42, 0.31]),
("p", "Distribution of the 70 practice questions: T1-T4 feed Q1-Q12, T5-T8 feed Q13-Q26, T9-T12 feed Q27-Q42, T10-T13 feed Q43-Q56, and T14 dominates Q57-Q70."),
]
