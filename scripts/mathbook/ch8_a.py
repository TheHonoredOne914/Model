# -*- coding: utf-8 -*-
"""Chapter 8 - Part A: intro, concept cheat sheet, question-type map."""

CH8_A = [
("h1", "Chapter 8: Predicting What Comes Next - Sequences and Progressions"),
("p", "This chapter trains the single most exam-useful skill in school mathematics: looking at a list of numbers and predicting what comes next WITHOUT writing the whole list. The uploaded PDF moves from simple patterns (odd numbers, triangular numbers, square numbers) to the notation t<sub>n</sub>, then to two ways of defining a sequence - the <b>explicit rule</b> (a formula in n that jumps straight to any term) and the <b>recursive rule</b> (each term built from earlier terms). It then develops the two superstar progressions: the <b>Arithmetic Progression (AP)</b> with t<sub>n</sub> = a + (n - 1)d, the sum of the first n natural numbers S<sub>n</sub> = n(n + 1)/2 (the Gauss-Āryabhaṭa pairing idea), and the <b>Geometric Progression (GP)</b> with t<sub>n</sub> = ar<super>n-1</super>. Along the way you meet the Virahānka-Fibonacci sequence (born in 7th-century India from Prakrit poetry metres!), the Sierpiński triangle and carpet fractals, bouncing balls, doubling bacteria and taxi fares - all of them secretly sequences. In this practice book every one of those ideas is pushed harder: missing-value reasoning, two-equation attacks, fractal counting, membership tests and HOTS proofs."),

("h2", "8.1  Complete Concept Cheat Sheet (read this before any question)"),

("h3", "8.1.1  Sequences, terms and the t-sub-n notation"),
("p", "<b>What is it?</b> A <b>sequence</b> is an ordered list of numbers, and each number is called a <b>term</b>. Order is sacred: 2, 4, 6, 8 and 4, 2, 8, 6 are different sequences even though they use the same numbers. A sequence may be <b>infinite</b> (1, 2, 3, 4, ... - the three dots mean it never ends) or <b>finite</b> (6, 12, 24, 48, 96 - exactly five terms). We write t<sub>1</sub> for the first term, t<sub>2</sub> for the second, and so on; the subscript is the <b>position number</b>. For several sequences at once we use different letters: t<sub>n</sub>, s<sub>n</sub>, u<sub>n</sub>."),
("p", "<b>When do I use it?</b> Every single question of this chapter - first identify the terms and their positions. <b>How do I recognise it?</b> Any comma-separated list with a '...' or a question about 'the nth term', 'the 20th term', 'which term is...'. <b>Careful:</b> n (the position) is always a counting number 1, 2, 3, ... but the term value itself can be negative, a fraction, even irrational - the sequence -7, -3, 1, 5, ... has s<sub>1</sub> = -7, and 1, 1/2, 1/3, 1/4, ... has unit fractions as terms."),
("p", "<b>Tiny example.</b> In the square numbers 1, 4, 9, 16, 25, 36, ... we have t<sub>1</sub> = 1, t<sub>2</sub> = 4, t<sub>5</sub> = 25. '25 is the 5th term' and 't<sub>5</sub> = 25' say the same thing."),

("h3", "8.1.2  The famous sequences you must recognise on sight"),
("bullets", [
 "<b>Natural numbers:</b> 1, 2, 3, 4, ... Each term is one more than the previous one.",
 "<b>Odd numbers:</b> 1, 3, 5, 7, 9, ... Constant difference 2. nth term t<sub>n</sub> = 2n - 1.",
 "<b>Triangular numbers:</b> 1, 3, 6, 10, 15, ... Each term is the sum 1 + 2 + ... + n, drawn as a triangle of dots. Differences are 2, 3, 4, 5, 6 (increasing, so it is NOT an AP).",
 "<b>Square numbers:</b> 1, 4, 9, 16, 25, ... Each term is the sum of the first n odd numbers: 9 = 1 + 3 + 5. Differences 3, 5, 7, 9 (consecutive odd numbers).",
 "<b>Powers of 2:</b> 2, 4, 8, 16, 32, ... and 1, 2, 4, 8, ... Constant ratio 2 - a GP in disguise.",
 "<b>Primes:</b> 2, 3, 5, 7, 11, 13, ... NO simple rule - a famous example of a sequence without a regular pattern. Examiners love using primes as the 'NOT an AP' option.",
]),

("h3", "8.1.3  Explicit rule - the jump-straight-to-any-term formula"),
("p", "<b>What is it?</b> An <b>explicit rule</b> computes the term in position n directly from n, with no need for earlier terms. Examples from the PDF: odd numbers u<sub>n</sub> = 2n - 1; the sequence s<sub>n</sub> = 5n - 2 which starts 3, 8, 13, 18, ...; triangular numbers t<sub>n</sub> = n(n + 1)/2. <b>Why is it so useful?</b> Because t<sub>300</sub> needs ONE substitution, not 299 additions. <b>How do I use it?</b> Two directions: (i) substitute n to get the term, (ii) set t<sub>n</sub> = k and solve for n to check whether k is a term and find its position."),
("p", "<b>The membership test (super important).</b> To check if a number k belongs to the sequence, solve t<sub>n</sub> = k. If n comes out a natural number - k is a term, and n is its position. If n is a fraction or decimal - k is NOT a term, because positions must be 1, 2, 3, .... Example from the PDF: in s<sub>n</sub> = 5n - 2, solving 5n - 2 = 308 gives n = 62 (a term, the 62nd), while 5n - 2 = 471 gives n = 94.6 (not a term). <b>Tiny example.</b> Is 137 an odd number of the list 1, 3, 5, ...? Solve 2n - 1 = 137, so n = 69 - yes, the 69th term."),

("h3", "8.1.4  Recursive rule - each term grows out of the previous ones"),
("p", "<b>What is it?</b> A <b>recursive rule</b> defines new terms using earlier terms: you must know the starting value(s) plus the recipe. Examples from the PDF: t<sub>1</sub> = 1, t<sub>n</sub> = t<sub>n-1</sub> + 3 gives 1, 4, 7, 10, ...; u<sub>1</sub> = 1, u<sub>n</sub> = 2u<sub>n-1</sub> + 3 gives 1, 5, 13, 29, ...; s<sub>1</sub> = 3, s<sub>n</sub> = s<sub>n-1</sub>(s<sub>n-1</sub> - 1) gives 3, 6, 30, 870 (terms can explode!). A recursion may even use TWO previous terms. <b>When do I use it?</b> Whenever the question says 'each term is 3 more than / twice / the previous term(s)' or gives t<sub>1</sub> and a rule. <b>Method:</b> iterate step by step, writing every term - never skip, because each step feeds the next."),
("p", "<b>The Virahānka-Fibonacci sequence (India's gift to mathematics).</b> V<sub>1</sub> = 1, V<sub>2</sub> = 2, V<sub>n</sub> = V<sub>n-1</sub> + V<sub>n-2</sub> for n at least 3, giving 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, ... Each term is the sum of the previous TWO. Virahānka wrote it down in the 7th century CE in his work Vṛttajātisamuchaya while studying Prakrit poetry metres; Gopāla (c. 1135 CE) and Hemachandra (c. 1150 CE) developed it further, and Fibonacci studied it around 1200 CE - which is why it also carries his name. Memorise the first ten terms: 1, 2, 3, 5, 8, 13, 21, 34, 55, 89 (then 144, 233, ...)."),
("callout", "Trap alarm", "The recursive rule and the explicit rule describe the SAME sequence in two languages. 't<sub>n</sub> = t<sub>n-1</sub> + 3, t<sub>1</sub> = 1' and 't<sub>n</sub> = 3n - 2' are the same sequence 1, 4, 7, 10, ... Exam questions often ask you to convert one language into the other."),

("h3", "8.1.5  Arithmetic Progression (AP) - the constant-difference sequence"),
("p", "<b>What is it?</b> A sequence in which every term after the first is obtained by ADDING a fixed number d - the <b>common difference</b> - to the previous term. General form: a, a + d, a + 2d, a + 3d, ..., a + (n - 1)d, where a is the first term. The nth term is the star formula of this chapter: <b>t<sub>n</sub> = a + (n - 1)d</b>. Its recursive form: t<sub>1</sub> = a, t<sub>n</sub> = t<sub>n-1</sub> + d. Examples: 1, 5, 9, 13 (a = 1, d = 4); 11, 7, 3, -1, -5 (a = 11, d = -4 - a DECREASING AP); 7, 7, 7, ... (d = 0); 1/2, 5/2, 9/2, ... (d = 2)."),
("p", "<b>When do I use it?</b> Words like 'each time 5 more', 'fixed fee plus per-km charge', 'salary increment', 'rows of seats', 'numbers divisible by k'. <b>How to find d:</b> d = t<sub>2</sub> - t<sub>1</sub>, and CHECK it on t<sub>3</sub> - t<sub>2</sub> - if the differences differ, it is not an AP. <b>Why t<sub>n</sub> = a + (n - 1)d works:</b> to reach the nth term you step from a exactly (n - 1) times, each step adding d. <b>Tiny example.</b> AP 3, 8, 13, 18: t<sub>10</sub> = 3 + 9 × 5 = 48. <b>Plot fact:</b> plotting the pairs (1, 1), (2, 5), (3, 9), ... for an AP always lands on a STRAIGHT LINE - the graph of the AP is linear, because the growth per step is constant."),
("callout", "Identify-the-method trick", "Any AP question with TWO unknown facts about two different terms (e.g. '3rd term is 12 and 50th term is 106') becomes two linear equations: a + 2d = 12 and a + 49d = 106. Subtract to get d, back-substitute to get a. This one move solves a huge family of exam questions."),

("h3", "8.1.6  Sum of the first n natural numbers - the Gauss-Āryabhaṭa formula"),
("p", "<b>What is it?</b> <b>S<sub>n</sub> = 1 + 2 + 3 + ... + n = n(n + 1)/2.</b> The beautiful proof: write S forwards and backwards, add - each column pairs to (n + 1) and there are n columns, so 2S = n(n + 1). Āryabhaṭa's Āryabhaṭīya (Chapter 2, Verse 19) records this idea centuries earlier: take (first + last)/2 - the average - and multiply by the number of terms. The same average trick sums ANY equally spaced list: sum = (first + last)/2 × count."),
("p", "<b>Range sums:</b> 25 + 26 + ... + 58 = (1 + 2 + ... + 58) - (1 + 2 + ... + 24) = S<sub>58</sub> - S<sub>24</sub> = 29 × 59 - 12 × 25 = 1711 - 300 = 1411. Cut off the unwanted head of the list! <b>Triangular numbers:</b> the nth triangular number IS S<sub>n</sub>, so t<sub>10</sub> = 55, t<sub>17</sub> = 153, t<sub>80</sub> = 80 × 81/2 = 3240. <b>Tiny example.</b> 1 + 2 + ... + 100 = 100 × 101/2 = 5050 - Gauss's legendary schoolboy answer."),

("h3", "8.1.7  Geometric Progression (GP) - the constant-ratio sequence"),
("p", "<b>What is it?</b> A sequence in which every term after the first is obtained by MULTIPLYING the previous term by a fixed number r - the <b>common ratio</b>. General form: a, ar, ar<super>2</super>, ar<super>3</super>, ..., ar<super>n-1</super>, with nth term <b>t<sub>n</sub> = ar<super>n-1</super></b> and recursive rule t<sub>1</sub> = a, t<sub>n</sub> = r·t<sub>n-1</sub>. Check by division: t<sub>2</sub>/t<sub>1</sub> = t<sub>3</sub>/t<sub>2</sub> = ... = r. Examples: 3, 6, 12, 24 (r = 2); 1, -1, 1, -1 (r = -1 - alternating); 5, 15/4, 45/16, ... (r = 3/4 - shrinking); 1, 1/3, 1/9, ... (r = 1/3)."),
("p", "<b>When do I use it?</b> Keywords: 'doubles', 'triples', 'halves each time', 'bounces to 3/4 of its height', 'grows 10% per year', 'bacteria multiply', 'fractal splits into 3'. Fractional and negative ratios are full citizens: r = 3/4 makes the sequence shrink towards 0 (decay), r = -1 makes it oscillate. <b>Plot fact:</b> a GP does NOT plot on a straight line - the points (1, 3), (2, 6), (3, 12), (4, 24) curve upwards ever more steeply (exponential growth), or melt towards zero when 0 < r < 1. <b>Tiny example.</b> 3, 6, 12, 24, 48: t<sub>7</sub> = 3 × 2<super>6</super> = 192."),

("h3", "8.1.8  Fractals and real-life GPs (Sierpiński, bacteria, bouncing balls)"),
("bullets", [
 "<b>Sierpiński triangle:</b> Stage 0 is one black triangle. Each stage replaces every black triangle by 3 smaller ones (join midpoints, remove the centre). Black triangle count: 1, 3, 9, 27, 81, ... = 3<super>n</super> at Stage n (a GP with a = 1, r = 3 - note the indexing starts at Stage 0!). Black AREA (Stage 0 = 1 square unit): 1, 3/4, (3/4)<super>2</super>, ... = (3/4)<super>n</super> - a shrinking GP that heads to 0. Count explodes, area melts: that is the fractal magic.",
 "<b>Sierpiński square carpet:</b> trisect each side, remove the middle ninth. Red squares: 8<super>n</super> at Stage n; red area: (8/9)<super>n</super>.",
 "<b>Bouncing ball:</b> dropped from 24 ft, each bounce rises to 3/4 of the previous height: 18, 13.5, 10.125, ... - GP with a = 18, r = 3/4.",
 "<b>Bacteria doubling:</b> 30 bacteria double every hour: 30 × 2<super>n</super> after n hours - growth GP.",
 "<b>Fractals in nature:</b> trees, cauliflower, broccoli, snowflakes, coastlines - shapes that repeat themselves at different scales; zoom in and you see the whole again.",
]),
("callout", "Indexing trap of the year", "Sierpiński counting starts at Stage ZERO: Stage 0 has 1 triangle, so Stage n has 3<super>n</super> (not 3<super>n-1</super>). Bounce questions are the opposite: bounce 1 is the FIRST bounce. Underline in the question whether stages start at 0 or 1 before you touch the formula."),

("h3", "8.1.9  Exam tips for this chapter"),
("nums", [
 "Before anything, decide the species: constant ADDITION means AP, constant MULTIPLICATION means GP, neither means look for a positional rule like n<super>2</super> or a recursive recipe.",
 "Compute d from t<sub>2</sub> - t<sub>1</sub> and VERIFY with t<sub>3</sub> - t<sub>2</sub>; compute r = t<sub>2</sub>/t<sub>1</sub> and verify with t<sub>3</sub>/t<sub>2</sub>. One verification saves whole marks.",
 "'Is k a term?' always means: solve t<sub>n</sub> = k, then check that n is a natural number. A fractional n is a polite NO.",
 "Far terms (50th, 100th, 1000th) demand the explicit formula - NEVER list terms one by one.",
 "Two facts about two terms means two equations in a and d (AP) or a and r (GP). Subtract/divide to eliminate.",
 "For sums 1 + 2 + ... + n use n(n + 1)/2; for sums starting mid-list subtract two S-formulas, or use (first + last)/2 × count.",
 "Watch the indexing: stages of Sierpiński start at 0 (count 3<super>n</super>), bounces start at 1 (height a·r<super>bounce</super>).",
 "Sanity-check the type of growth: if answers explode, r > 1; if they melt to 0, 0 < r < 1; if they go down steadily, d < 0.",
]),

("h2", "8.2  Question Types / Concept Map for Chapter 8"),
("p", "Almost every sequences-and-progressions question in exams falls into one of the following types. Label the question before solving - knowing WHICH fight it is wins half the battle."),
("table",
 ["Type", "Name", "How to recognise it in the question", "Core method"],
 [
  ["T1", "Sequence vocabulary and notation", "'term', 'finite/infinite', 'state t<sub>5</sub>', position questions", "Read positions; subscript = position"],
  ["T2", "List terms from a rule", "t<sub>n</sub> given, 'find the first k terms'", "Substitute n = 1, 2, 3, ... one by one"],
  ["T3", "Far-term jump", "'find the 100th term', 'the 1170th term'", "One substitution into the explicit rule"],
  ["T4", "Membership check", "'is k a term? which term is k?'", "Solve t<sub>n</sub> = k; n must be a natural number"],
  ["T5", "Recursive generation", "t<sub>1</sub> given, t<sub>n</sub> in terms of t<sub>n-1</sub> (or two back)", "Iterate term by term, no skipping"],
  ["T6", "Virahānka-Fibonacci", "'each term = sum of previous two', poetry metres, rabbit style", "Add last two; know 1, 2, 3, 5, 8, 13, ..."],
  ["T7", "AP identify and d", "'constant difference', decreasing lists", "d = t<sub>2</sub> - t<sub>1</sub>, verify; d may be negative or 0"],
  ["T8", "AP nth term / which term", "'find t<sub>20</sub>', 'which term is 607?'", "t<sub>n</sub> = a + (n - 1)d; or solve for n"],
  ["T9", "AP from two conditions", "'3rd term is 12, 50th is 106'", "Two linear equations in a and d"],
  ["T10", "Sums of naturals and ranges", "1 + 2 + ... + n; k + ... + m; smallest n with S<sub>n</sub> > M", "n(n + 1)/2; S<sub>big</sub> - S<sub>small</sub>; average × count"],
  ["T11", "GP identify and ratio", "'doubles', 'halves', alternating signs", "r = t<sub>2</sub>/t<sub>1</sub>, verify; r may be negative or fractional"],
  ["T12", "GP nth term / which term", "'find t<sub>10</sub>', 'which term is 4374?'", "t<sub>n</sub> = ar<super>n-1</super>; powers of r; handle fractions"],
  ["T13", "Fractals and real-life GPs", "Sierpiński stages, bacteria, bouncing balls, 10% growth", "Set up a and r; fix the stage/bounce indexing"],
  ["T14", "Plot nature and HOTS mix", "'do the points lie on a line?', proofs, hybrid stories", "AP plots straight; GP curves; split into mini-steps"],
 ],
 [0.07, 0.22, 0.40, 0.31]),
("p", "Distribution of the 120 practice questions below: T1-T5 feed the Warm-up Zone (Q1-Q32), T6-T12 build the Core Drills (Q33-Q76), T9-T13 power the Exam Power Zone (Q77-Q104), and T14 with multi-concept HOTS rules the Boss Zone (Q105-Q120)."),
]
