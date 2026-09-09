# -*- coding: utf-8 -*-
"""Chapter 7 - Part A: intro, cheat sheet, question-type map."""

CH7_A = [
("h1", "Chapter 7: Probability - Measuring Chance"),
("p", "Probability turns 'maybe' into a number between 0 and 1 - and every dice, card and coin question in every exam is built on a handful of ideas done carefully. The uploaded PDF introduces random experiments and trials, outcomes and sample spaces, the classical formula P(E) = favourable outcomes / total outcomes, the complement rule P(not E) = 1 - P(E), sure and impossible events, and empirical probability from observed data. It works through coins, dice, cards and everyday experiments. This practice book sharpens all of it: two-dice tables, three-coin tree diagrams, without-replacement draws, 'at least one' reasoning, geometric probability on lengths and areas, and proof-style questions that show why probabilities must always add to 1."),
("img", "f7_tree.png", "Figure 7.1: A tree diagram - every path is one outcome; multiply along branches, add across paths.", 0.24),

("h2", "7.1  Complete Concept Cheat Sheet (read this before any question)"),

("h3", "7.1.1  Experiment, outcome, sample space, event"),
("p", "<b>What is it?</b> A <i>random experiment</i> is any action with an uncertain result (tossing a coin, drawing a card). Each possible result is an <i>outcome</i>. The set of ALL outcomes is the <i>sample space</i> S, and any subset of S is an <i>event</i>. <b>Key counts:</b> one coin: S = {H, T}, |S| = 2. One die: |S| = 6. Two coins: 4 outcomes. Two dice: 36 ordered outcomes. Three coins: 8 outcomes. A standard deck: 52 cards. <b>The golden habit:</b> before computing ANY probability, WRITE the sample space or its size. Half of all errors are wrong totals, not wrong fractions."),
("p", "<b>When do I count 'ordered' outcomes?</b> When the experiment distinguishes them: two dice give 36 outcomes because (2, 5) and (5, 2) are different throws; drawing two cards one after another gives 52 \u00d7 51 ordered draws. If you prefer unordered counting, you must be consistent in numerator AND denominator."),

("h3", "7.1.2  Classical probability and its three laws"),
("p", "<b>What is it?</b> For equally likely outcomes, P(E) = n(E)/n(S) - favourable outcomes over total outcomes. <b>Three laws:</b> (1) 0 \u2264 P(E) \u2264 1 always; (2) P(sure event) = 1 and P(impossible event) = 0; (3) P(E) + P(not E) = 1, so P(not E) = 1 - P(E). The complement rule converts 'at least one' and 'none' questions into their easier partners. <b>Tiny example.</b> P(rolling a prime on a die) = {2, 3, 5}/6 = 1/2; P(not prime) = 1 - 1/2 = 1/2."),
("p", "<b>Reading the answer:</b> probability may be written as a fraction in lowest terms, a decimal, or a percentage - fractions are the exam default. A probability of 7/4 or -0.2 is a signal that the COUNTS are wrong, not that the formula is wrong."),

("h3", "7.1.3  Cards: the anatomy of a deck"),
("p", "<b>What is it?</b> 52 cards: 4 suits (hearts \u2665, diamonds \u2666 - red; spades \u2660, clubs \u2663 - black) \u00d7 13 ranks each (A, 2, 3, ..., 10, J, Q, K). <b>Standard sub-counts:</b> aces: 4; face cards (J, Q, K): 12; kings: 4; red queens: 2; hearts: 13; numbered cards 2-10: 36; cards between 3 and 8 (inclusive): 24; honour cards (A, K, Q, J, 10): 20. <b>Overlaps matter:</b> 'a king OR a heart' is not 4 + 13 = 17 outcomes because the king of hearts was counted twice - it is 16. The inclusion-exclusion habit starts here."),

("h3", "7.1.4  Dice: singles, pairs and the 36-table"),
("p", "<b>What is it?</b> One die: six outcomes. Two dice: 36 ordered pairs - and the smart move is a 6\u00d76 grid in rough work. <b>Star facts from the table:</b> sum 7 has 6 pairs (most likely); sums 2 and 12 have 1 pair each (least likely); P(sum = 7) = 6/36 = 1/6; P(sum > 9) = 6/36 = 1/6 (pairs for 10, 11, 12); P(doubles) = 6/36 = 1/6; P(product even) = 27/36 = 3/4; P(same parity) = 18/36 = 1/2. <b>Products:</b> a product is odd only when BOTH dice are odd: 9/36 = 1/4. <b>Tiny example.</b> P(sum \u2265 10) = 6/36 = 1/6 (pairs: 4-6, 5-5, 6-4, 5-6, 6-5, 6-6)."),

("h3", "7.1.5  Coins and tree diagrams"),
("p", "<b>What is it?</b> Each coin doubles the sample space: 1 coin \u2192 2, 2 coins \u2192 4, 3 coins \u2192 8, n coins \u2192 2\u207f. A tree diagram draws every path: two branches (H/T) per coin, and each complete path is one outcome. <b>Star facts (three coins):</b> P(exactly 2 heads) = 3/8; P(at least 1 head) = 7/8 (only TTT fails); P(at least 2 heads) = 4/8 = 1/2; P(all same) = 2/8 = 1/4. <b>Why trees work:</b> multiplying along a branch counts outcomes systematically - it is the visual version of 2 \u00d7 2 \u00d7 2."),
("img", "f7_scale.png", "Figure 7.2: The probability scale - impossible 0, sure 1, everything else between.", 0.20),

("h3", "7.1.6  Draws without replacement"),
("p", "<b>What is it?</b> When drawn objects are NOT returned, the second draw's counts shrink: a bag with 5 red and 3 blue balls, two drawn one after another - P(both red) = (5/8)(4/7) = 20/56 = 5/14. The denominator fell from 8 to 7 because one ball left. <b>Two-draw combinations via pairs:</b> P(one red one blue in any order) = 2 \u00d7 (5/8)(3/8) - the factor 2 handles the two orders (RB, BR). <b>Alternative counting:</b> total ways to choose 2 balls from 8 = C(8,2) = 28; both red: C(5,2) = 10; P = 10/28 = 5/14 - same answer, cleaner for 'any order' questions."),

("h3", "7.1.7  Empirical probability"),
("p", "<b>What is it?</b> When real data (not symmetry) defines the chances: P(E) = (number of times E occurred)/(total number of trials). It is an estimate from observation - the more trials, the closer it typically drifts to the true probability. <b>Example shape:</b> 200 screws inspected, 12 defective \u2192 P(defective) = 12/200 = 0.06, so P(good) = 0.94. <b>Warning:</b> empirical probabilities need not be 'nice' fractions, and they describe the PAST data - classical probability describes idealised symmetric setups."),

("h3", "7.1.8  Geometric probability"),
("p", "<b>What is it?</b> When outcomes form a continuum - a point chosen on a segment, a dart hitting a board - probability equals the ratio of measures (lengths, areas): P = favourable length (or area) / total length (or area). <b>Tiny example.</b> A point chosen on a 10 cm segment; P(it lies in the first 3 cm) = 3/10. A dart hitting a 20 cm square board with a 10 cm circle target: P(hit circle) = \u03c0(5\u00b2)/400 = 25\u03c0/400 = \u03c0/16. <b>Guard:</b> both numerator and denominator must use the SAME kind of measure."),

("h3", "7.1.9  Exam tips for this chapter"),
("nums", [
 "Always write n(S) first; a wrong total poisons the whole question.",
 "Two dice: draw the 6\u00d76 grid once and reuse it - sums, products, parity all read off it.",
 "Complement first for 'at least one': P(at least one H) = 1 - P(no H).",
 "Without replacement: denominators shrink (8 \u2192 7); numerators shrink too if a favourable item left.",
 "Cards: memorise 4, 12, 13, 26 and the overlap warning.",
 "Reduce every fraction to lowest terms - un-reduced answers lose the presentation mark.",
 "Check the range: if P > 1 or P < 0, recount - the arithmetic, not the theory, is wrong.",
 "Empirical questions: read the table column-wise; the total row is n(S).",
]),

("h2", "7.2  Question Types / Concept Map for Chapter 7"),
("table",
 ["Type", "Name", "How to recognise it in the question", "Core method"],
 [
  ["T1", "Sample space building", "'List the outcomes', 'find n(S)'", "Coins/dice/cards/objects; 2\u207f, 36, 52"],
  ["T2", "Single die events", "One die, one event", "Count favourable \u00f7 6"],
  ["T3", "Two-dice events", "'two dice thrown', sums/products", "36-table; systematic pairs"],
  ["T4", "Card events", "Deck language: suit, face, ace", "Standard counts; overlaps"],
  ["T5", "Complement rule", "'at least one', 'not', 'none'", "1 - P(opposite)"],
  ["T6", "Bag/ball single draw", "Coloured objects, one draw", "Favourable colour \u00f7 total"],
  ["T7", "Two draws without replacement", "'second ball is not replaced'", "Shrinking denominators; \u00d72 for orders"],
  ["T8", "Tree diagrams", "Multi-stage: 2-3 coins, draw twice", "Multiply along branches"],
  ["T9", "Empirical probability", "Frequency tables, surveys, trials", "occurrences \u00f7 trials; complement from table"],
  ["T10", "Geometric probability", "spinners, dartboards, points on segments", "favourable measure \u00f7 total measure"],
  ["T11", "Event relations", "sure/impossible, P(E) + P(not E), mutually exclusive", "Range laws; complement"],
  ["T12", "Fairness and decisions", "'is the game fair?', expected ties", "Compare P(win) values"],
  ["T13", "Missing probability algebra", "P(one outcome) unknown, sum = 1", "Set up equation; solve"],
  ["T14", "HOTS multi-stage", "Three dice, replacement mixtures, proofs", "Decompose; tree or table; verify"],
 ],
 [0.07, 0.20, 0.42, 0.31]),
("p", "Distribution of the 50 practice questions: T1-T3 feed Q1-Q10, T4-T6 feed Q11-Q20, T7-T10 feed Q21-Q32, T11-T13 feed Q33-Q42, and T14 dominates Q43-Q50."),
]
