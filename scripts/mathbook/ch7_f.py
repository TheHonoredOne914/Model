# -*- coding: utf-8 -*-
"""Chapter 7 - Part F: formula sheet, cheat sheet, mistake buster, exam strategy, checklist."""

CH7_F = [
("h2", "7.5  Chapter Formula Sheet"),
("p", "The probability toolkit with its conditions. Every row is one line of working in an exam answer."),
("table",
 ["Rule", "Statement / use", "Conditions", "Tiny example", "Common mistake"],
 [
  ["P(E) = n(E)/n(S)", "Classical probability", "Equally likely outcomes", "Prime on a die: 3/6 = 1/2", "Wrong n(S)"],
  ["0 \u2264 P(E) \u2264 1", "Range law - validity check", "All events", "P = 1.2 \u2192 recount", "Accepting out-of-range answers"],
  ["P(sure) = 1, P(impossible) = 0", "Boundary events", "Whole sample space / empty set", "number < 7 on a die: 1", "Swapping the two"],
  ["P(not E) = 1 - P(E)", "Complement rule", "E and not E partition S", "not-ace: 12/13", "Applying to overlapping 'or' sets"],
  ["n(S) = 2\u207f", "n coin tosses", "Independent fair coins", "3 coins: 8", "2n instead of 2\u207f"],
  ["n(S) = 36", "Two dice", "Ordered pairs", "sum 7: 6/36 = 1/6", "Unordered 21 pairs mixed with ordered"],
  ["Deck counts: 4/12/13/26", "Aces, faces, suits, reds", "Standard 52-card deck", "face card: 12/52 = 3/13", "Forgetting overlaps (king of hearts)"],
  ["P(A and B) = P(A)\u00b7P(B | A)", "Sequential draws", "Without replacement shrinks both counts", "(5/8)(4/7) = 5/14", "Not shrinking the denominator"],
  ["'Any order' \u00d72", "Two different-type draws", "The two orders have equal probability", "RB or BR: 2\u00d7(5/8)(3/8)", "Missing the order factor"],
  ["P(E or F) = P(E)+P(F)-P(E and F)", "Union with overlap", "General events", "king or heart: (4+13-1)/52", "Adding without the correction"],
  ["P(at least one) = 1 - P(none)", "Complement cascade", "Multi-trial experiments", "3 coins: 1 - 1/8 = 7/8", "Listing cases directly"],
  ["Empirical P(E) = occurrences/trials", "From observed data", "Finite experiment record", "35/500 = 0.07", "Confusing with classical values"],
  ["Geometric P = measure/measure", "Continuous outcomes", "Same measure type both sides", "5 cm of 15 cm: 1/3", "Mixing length with area"],
  ["Sum of all outcome probabilities = 1", "Accounting law", "Complete outcome list", "0.3+0.25+0.45 = 1", "Ignoring missing categories"],
 ],
 [0.22, 0.25, 0.18, 0.18, 0.17], 8.6),

("h2", "7.6  Last-Minute Cheat Sheet"),
("callout", "30-second revision card - Chapter 7",
 "COUNTS: coin 2, die 6, two dice 36 (ordered), 3 coins 8, n coins 2\u207f, deck 52. "
 "DECK: aces 4, face cards 12, spades 13, reds 26; overlap correction for 'or'. "
 "TWO-DICE STARS: sum 7 \u2192 6/36 = 1/6; doubles 1/6; both odd 1/4; product odd 1/4; same parity 1/2. "
 "COMPLEMENT: P(at least one) = 1 - P(none). P(not E) = 1 - P(E). "
 "WITHOUT REPLACEMENT: 8 \u2192 7 denominators; 'any order' \u2192 \u00d72. "
 "RANGE: 0 \u2264 P \u2264 1; all outcomes sum to 1. "
 "EMPIRICAL: occurrences \u00f7 trials. GEOMETRIC: same-measure ratio."),
("bullets", [
 "<b>If you see 'at least one'</b> \u2192 1 minus 'none', always.",
 "<b>If you see two dice</b> \u2192 draw the 36-grid; read sums, products, parity off it.",
 "<b>If you see 'or' with overlapping categories</b> \u2192 add then subtract the intersection once.",
 "<b>If you see 'without replacement'</b> \u2192 shrink numerator and denominator after each draw.",
 "<b>If you see 'in any order'</b> \u2192 multiply by the number of distinct orders.",
 "<b>If you see a frequency table</b> \u2192 empirical fractions; missing entries from the total.",
 "<b>If you see a spinner or dartboard</b> \u2192 angle or area ratios, same measure both sides.",
 "<b>If your answer is outside [0, 1]</b> \u2192 stop; the counts are wrong, not the theory.",
]),

("h2", "7.7  Mistake Buster - DON'T MAKE THESE MISTAKES"),
("nums", [
 "<b>Wrong n(S).</b> Two coins have 4 outcomes, not 3 (HT \u2260 TH). Fix: list outcomes or use 2\u207f - never 'number of head-counts'.",
 "<b>Unordered denominators with ordered numerators.</b> Mixing 21 unordered two-dice pairs with ordered favourable counts corrupts every fraction. Fix: pick one convention, stay in it.",
 "<b>Overlap forgotten in 'or'.</b> P(king or heart) is 16/52, not 17/52 - the king of hearts counted once. Fix: subtract the intersection.",
 "<b>Denominator not shrunk without replacement.</b> After one ball leaves, the second draw is out of 7, not 8. Fix: write the cascade explicitly.",
 "<b>Missing the \u00d72 for 'any order'.</b> One red one blue happens two ways. Fix: name the orders, add them.",
 "<b>Adding probabilities of non-exclusive events for 'or'.</b> P(at least one 6) is 11/36, not 12/36 - (6,6) counted twice. Fix: use 1 - P(none).",
 "<b>Range violations ignored.</b> P = 7/6 signals a counting error. Fix: audit n(E) and n(S) whenever the fraction exits [0, 1].",
 "<b>Un-reduced fractions.</b> 15/36 must become 5/12. Fix: divide by the HCF as the final line.",
 "<b>Empirical treated as classical.</b> A loaded die's P(six) = 0.25 is the data's truth, not 1/6. Fix: label which probability you are reporting.",
 "<b>Mixed measures in geometric probability.</b> Length over area is meaningless. Fix: check units cancel.",
]),

("h2", "7.8  Exam Strategy for Chapter 7"),
("p", "<b>Order of attack.</b> Single-die, single-coin and single-card questions first - one-line answers that bank marks. Two-dice questions next with a reusable grid. Keep without-replacement cascades, 'at least one' complements and geometric probability for the middle slot; the multi-stage HOTS items come last."),
("p", "<b>Where marks are lost.</b> Four leak-points: wrong totals (fix by writing n(S) first), forgotten overlaps in 'or' events, un-shrunk denominators without replacement, and un-reduced final fractions. The range check 0 \u2264 P \u2264 1 is a free error detector - run it on every answer before moving on."),
("p", "<b>Counting facts most frequently tested.</b> The 36-grid (sum 7 = 6 pairs, doubles = 6), the deck counts 4/12/13/26, and 2\u207f coin totals. Complement questions ('at least one', 'not') outnumber direct ones - rehearse the 1 - P route until it is reflexive."),
("p", "<b>Concepts that get mixed.</b> Classical with empirical probability (one is idealised, one is data), mutually exclusive with independent events (Grade 9 needs only the exclusive idea), and 'or' addition with 'and' multiplication. Keep a margin note naming which rule each line uses."),
("p", "<b>Safe shortcuts.</b> Complement-first for 'at least one'; the 2k-1 count for 'maximum = k' on two dice; symmetric splits (same parity = 1/2, mixed parity = 1/2). <b>Unsafe shortcuts.</b> Guessing equal probabilities without checking equally-likely-ness; multiplying probabilities of dependent draws as if independent; treating a small empirical deviation as proof of bias."),
("p", "<b>How to check an answer.</b> Verify n(E) \u2264 n(S); verify complement pairs sum to 1; re-derive one cascade step; and for list-based answers, recount by a second method (grid vs formula). Two methods agreeing is the strongest cheap check in this chapter."),

("h2", "7.9  Chapter Completion Checklist"),
("p", "Tick each box only when you can honestly say DONE:"),
("bullets", [
 "[ ] Every concept covered: experiments, sample spaces, events, classical formula, range laws, complement, cards, dice, coins, tree diagrams, without replacement, empirical, geometric",
 "[ ] Every rule covered: 14 rows in Section 7.5, each with conditions and a micro-example",
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
