# -*- coding: utf-8 -*-
"""Chapter 2 - Part A: intro, cheat sheet, concept map."""

CH2_A = [
("h1", "Chapter 2: Introduction to Linear Polynomials"),
("p", "From locating points we now move to describing relationships with expressions. The uploaded PDF builds the idea of a polynomial from daily life (boxes of pens, garden fencing, chess-club fees), defines degree, focuses on linear polynomials, shows them as input-output machines (functions), develops linear patterns and growth/decay, teaches how to fit the relationship y = ax + b from data, and finishes by plotting straight lines and reading the meaning of a (slope) and b (y-intercept). This book sharpens every one of those ideas with reverse questions, two-equation fittings, plan comparisons and pattern proofs."),
("h2", "2.1  Complete Concept Cheat Sheet (read this before any question)"),

("h3", "2.1.1  Algebraic expressions: terms, coefficients, constants, variables"),
("p", "<b>What is it?</b> An algebraic expression combines numbers, variables (letter-numbers) and operation signs. In 4x + 5y + 3, the parts 4x, 5y and 3 are the <b>terms</b>; x and y are <b>variables</b> (also called letter-numbers); 4 and 5 are the <b>coefficients</b>; 3 is a <b>constant</b>. <b>Why coefficients matter:</b> the coefficient tells you how many copies of the variable you have, and it is the number that multiplies the variable - including its sign. In -7x the coefficient is -7, not 7."),
("p", "<b>When do I use this?</b> Every 'identify the terms / coefficient / constant' question, and every modelling question where a real situation must become an expression (cost of fencing = rate x length, and so on). <b>Tiny example.</b> For the garden in the PDF: wire fence cost 100 x 2l = 200l, wooden fence 80 x 2w = 160w, seeds 50 x area = 50lw; total 200l + 160w + 50lw - a three-term expression in two variables."),
("callout", "Hidden coefficient trap", "A term like x has coefficient 1 (not 0!), and -x has coefficient -1. A term like 5x\u00b2y has coefficient 5. Missing numbers never mean missing coefficients."),

("h3", "2.1.2  Degree and the polynomial family"),
("p", "<b>What is it?</b> A polynomial in ONE variable is an expression made of that variable and its powers (whole-number powers). The <b>degree</b> is the highest power of the variable. Degree names: 1 = linear, 2 = quadratic, 3 = cubic, 0 = constant. Examples: 3z + 7 is linear (degree 1); x\u00b2 + 5x + 1 is quadratic; 5y\u00b3 + y\u00b2 - 8 is cubic; the number 8 alone is a constant polynomial (it can be written 8x\u2070)."),
("p", "<b>How do I find the degree quickly?</b> Scan the powers of the variable and take the maximum. In 2x\u2074 - 3x\u00b3 + 6x\u00b2 - 2x + 7 the powers are 4, 3, 2, 1, 0, so the degree is 4. <b>Sign-awareness:</b> the degree ignores the sign and size of coefficients - -9x\u2075 still has degree 5. <b>Tiny example.</b> -13 is a constant polynomial of degree 0; 6z + 1 is linear."),
("p", "<b>Common confusion:</b> 'linear polynomial' (degree exactly 1, like 2x + 3) versus 'linear equation' (a statement like 2x + 3 = 64 that equates a linear polynomial to something). The polynomial is the expression; the equation is the claim that two expressions are equal."),

("h3", "2.1.3  Evaluation: the input-output machine"),
("p", "<b>What is it?</b> Substituting a value of the variable into a polynomial gives its value at that input. The PDF pictures this as a machine: feed x = 4 into the machine 2x + 3, out comes 11; feed x = -6, out comes -9. This machine-view is the seed of the 'function' idea. <b>Golden rule of substitution:</b> write the substitution with brackets: 2(-6) + 3, never 2 -6 + 3. Brackets prevent the sign disaster."),
("p", "<b>Tiny example.</b> For p(x) = 7x - 4: p(0) = -4, p(2) = 10, p(-3) = -25. <b>Reverse use:</b> given the output, find the input - that is solving a linear equation: 7x - 4 = 24 gives x = 4. Evaluation forward, equation backward - the same machine run both ways."),

("h3", "2.1.4  Linear equations from words"),
("p", "<b>What is it?</b> Translate a sentence into an equation with ONE unknown, solve, and answer the original question. Standard moves: 'one number is 10 more than the other' means x and x + 10; 'three times as many' means 3x; 'their sum is 64' means x + (x + 10) = 64."),
("p", "<b>Method (always the same skeleton).</b> Step 1: define the unknown precisely ('let the smaller number be x'). Step 2: express every other quantity in terms of x. Step 3: write the balancing condition (sum, difference, total money). Step 4: solve. Step 5: ANSWER THE QUESTION ASKED - if the question asked for both numbers, report both; a bare x earns no full marks. <b>Sanity check:</b> substitute back into the words, not just the equation."),

("h3", "2.1.5  Linear patterns and the nth term"),
("p", "<b>What is it?</b> A linear pattern is a sequence whose consecutive terms differ by a CONSTANT. The tile pattern 1, 3, 5, 7, ... adds 2 tiles each stage, and its nth-stage count is 2n - 1. The constant difference becomes the coefficient of n; the constant term adjusts the start. <b>Finding the rule from the table:</b> if the difference is d, the rule looks like an = dn + c; find c by matching one known term (e.g. for 1, 3, 5: d = 2 and term 1 = 1 gives 1 = 2(1) + c, so c = -1)."),
("p", "<b>Why the difference is the slope:</b> on the graph of the rule, moving one stage right moves the value up by exactly d - the line rises by d per step. <b>Tiny example.</b> Matchstick squares in a row: 4, 7, 10, ... difference 3, rule 3n + 1. Stage 10 needs 31 matches. <b>Reverse use:</b> 'can the pattern ever equal 100?' means solving 3n + 1 = 100; here n = 33 - a whole number, so yes, stage 33 uses exactly 100 matches. If n had come out fractional, the answer would be NO - patterns only exist at whole stages."),

("h3", "2.1.6  Linear growth and linear decay"),
("p", "<b>What is it?</b> Growth: a quantity increases by a fixed amount over equal intervals - C(d) = 100 + 60d (journey cost). Decay: decreases by a fixed amount - h(t) = 3 - 0.5t (water level). The fixed change is the slope: positive for growth, negative for decay. <b>Structure:</b> value = starting value + (change per step) x (number of steps). On a graph, growth tilts up, decay tilts down."),
("p", "<b>How do I recognise it?</b> Words like 'every month adds', 'decreases by 800 each year', 'reduces by 15 per day'. <b>Two standard questions:</b> forward (value after n steps - substitute) and backward (when does the value reach V? - solve). Decay also has the 'run out' question: set the expression to 0 (or the floor value) and solve. <b>Tiny example.</b> Phone bought at 10000, losing 800 per year: v = 10000 - 800t; after 3 years 7600; it touches 3600 when t = 8."),

("h3", "2.1.7  Fitting y = ax + b from two observations"),
("p", "<b>What is it?</b> Many real bills have the shape y = ax + b: a fixed part b plus a per-unit part a. Given two observations (x\u2081, y\u2081) and (x\u2082, y\u2082), substitute both into y = ax + b to get TWO equations, then eliminate b by subtraction: a = (y\u2082 - y\u2081)/(x\u2082 - x\u2081). Then recover b from either observation: b = y\u2081 - a x\u2081."),
("p", "<b>Worked skeleton (the telecom example).</b> 10 GB cost 350 and 20 GB cost 550. Equations: 350 = 10a + b and 550 = 20a + b. Subtract: 200 = 10a, so a = 20 (each extra GB costs Rs 20). Back-substitute: b = 350 - 200 = 150 (the fixed monthly fee). Answer: y = 20x + 150. <b>Meaning check:</b> a is the RATE per unit, b is the ENTRY fee - interpreting them is as important as computing them."),
("callout", "Subtraction is the whole trick", "Subtracting the two equations kills b because b is the SAME in both. What remains is a clean one-step equation for a. If your two equations accidentally have different b values, you have copied the data wrongly - stop and re-read."),

("h3", "2.1.8  Graphs of lines: slope a and y-intercept b"),
("p", "<b>What is it?</b> Every equation y = ax + b draws a straight line. Plotting needs just two points: pick any two x-values, compute the y-values, join with a ruler and extend. Three facts carry all the exam weight: (1) y = ax lines all pass through the ORIGIN (0, 0); (2) larger positive a makes a steeper line, a between 0 and 1 makes a flatter line, negative a tilts the line down-left to up-right reversed (decay); (3) b is where the line CUTS THE Y-AXIS, at the point (0, b) - the y-intercept."),
("p", "<b>Effect of changing a vs changing b.</b> Fix b and vary a: the line pivots about (0, b), changing steepness. Fix a and vary b: the line SLIDES up or down, staying PARALLEL - lines with the same slope are parallel and never meet. Growth means positive slope, decay means negative slope; the slope numerically equals the constant difference of the underlying pattern. <b>Tiny example.</b> y = 2x - 1, y = 2x + 1, y = 2x + 5 are three parallel lines cutting the y-axis at (0, -1), (0, 1) and (0, 5)."),
("p", "<b>Converting to standard shape.</b> Equations often arrive disguised: 2y = 4x + 7 means y = 2x + 3.5 after dividing by 2; 5y = 6x - 10 means y = 1.2x - 2. ALWAYS isolate y first; only then read a and b. Reading the coefficient of x before this conversion is a classic error."),

("h3", "2.1.9  Exam tips for this chapter"),
("nums", [
 "Before reading slope and intercept, rewrite the equation as y = ....",
 "Substitute with brackets - especially for negative inputs.",
 "In word problems, define the unknown in words first; the equation follows automatically.",
 "For pattern rules, lock the constant difference first, then fit the constant term from ONE known term.",
 "When fitting y = ax + b, subtract the two data equations; never solve them separately for b first (double work, double error chances).",
 "Reverse questions (which stage gives 100 matches?) need INTEGER answers - a fractional n means 'no such stage', and saying so IS the answer.",
 "On graphs, label the y-intercept point (0, b) explicitly - it is usually the mark-earning feature.",
]),

("h2", "2.2  Question Types / Concept Map for Chapter 2"),
("table",
 ["Type", "Name", "How to recognise it", "Core method"],
 [
  ["T1", "Anatomy of expressions", "Identify terms, coefficients, variables, constants", "Term-wise reading, sign-aware coefficients"],
  ["T2", "Degree and classification", "Find degree; label linear/quadratic/cubic/constant", "Highest power rule"],
  ["T3", "Evaluation", "Find value of polynomial at given input", "Bracket substitution"],
  ["T4", "Reverse evaluation", "Given output, find input", "Solve the linear equation"],
  ["T5", "Word-problem modelling", "Numbers/ages/coins/fences in words", "Define x, translate, solve, answer in words"],
  ["T6", "Linear patterns", "Table of stages; find nth term or a target stage", "Constant difference = coefficient of n"],
  ["T7", "Reachability question", "Can the pattern equal a value?", "Solve dn + c = target; n must be a whole number"],
  ["T8", "Growth and decay", "Increases/decreases by fixed amount per interval", "value = start + rate x steps"],
  ["T9", "Fit y = ax + b", "Two observations given", "Subtract equations to get a, back-substitute for b"],
  ["T10", "Interpret a and b", "What do the numbers mean?", "a = rate per unit, b = fixed part"],
  ["T11", "Slope and intercept reading", "Find slope/y-intercept of disguised equations", "Isolate y first"],
  ["T12", "Parallel lines", "Same slope, different intercepts", "Compare a values after isolating y"],
  ["T13", "Graph plotting / reading", "Draw the line; identify where it cuts axes", "Two points; (0, b) on y-axis; y = 0 for x-axis"],
  ["T14", "Multi-concept HOTS", "Composition of evaluations, plan comparisons, concurrence", "Break into labelled steps, verify each"],
 ],
 [0.07, 0.21, 0.40, 0.32]),
("img", "f2_family.png", "Figure 2.1: The family y = ax - all lines pass through the origin; larger a means steeper.", 235),
("img", "f2_parallel.png", "Figure 2.2: Same slope (a = 2), different intercepts b - parallel lines that never meet.", 235),
]
