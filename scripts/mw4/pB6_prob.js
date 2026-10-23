<script>
'use strict';
/* ============================================================
   BOOK ZONE DATA · part 6 — Chance Mansion (Book Ch 7: Probability)
   ============================================================ */
window.BOOKZ=window.BOOKZ||{};
BOOKZ.prob={
 src:'Ganita Manjari · Grade 9 · Part I — Book Ch 7 (The Mathematics of Maybe: Introduction to Probability)',
 sets:[
 {set:'Book Ideas — Gambler\'s Fallacy & Fairness',qs:[
  {q:'You roll a fair die three times and get a 6 every time. What is the probability of rolling a 6 on the next roll? (And why is "now a 6 is due" wrong?)',
   why:'Ye book ka sabse important life-lesson concept hai — Gambler\'s Fallacy. Ludo, cricket toss, betting — har jagah bachata hai.',
   steps:[
    ['Each roll is an INDEPENDENT event','Die ko memory nahi hoti. Pichle teen 6 ka agle roll pe ZERO asar. Har roll fresh start hai.','Each roll is independent — the die has no memory, so past results change nothing.'],
    ['P(6) = 1/6 ≈ 16.6% — same as always','Fair die ke 6 faces, 1 favourable → 1/6. Chaaro baar 6 aane ke baad bhi 1/6 hi.','P(6) = 1/6 on every roll, no matter what came before.'],
    ['"Ab tail aayega" / "ab 6 nahi aayega" = Gambler\'s Fallacy','Coin/die past track nahi karta. Long run me average theory jaisa aata hai (Law of Large Numbers), lekin agla roll abhi bhi fresh hai.','Believing outcomes "balance out" in the short run is the Gambler\'s Fallacy — randomness has no pattern to complete.']],
   ans:'Still 1/6 — rolls are independent; the die has no memory'}
 ]},
 {set:'Exercise Set 7.3 — Sample Spaces',qs:[
  {q:'A fair die is rolled. Find the probability of getting: (i) an odd number (ii) a number greater than 2 (iii) a number less than 9 (iv) a multiple of 3',
   why:'P = favourable/total — pehli baar sample space likhna, phir count. Ye 4 sub-parts ek hi die me poore probability ka taste de dete hain.',
   steps:[
    ['Sample space S = {1, 2, 3, 4, 5, 6} — total 6','Pehle total outcomes likho. Fair die → sab equally likely.','Sample space has 6 equally likely outcomes.'],
    ['(i) odd: {1,3,5} → 3/6 = 1/2','Teen favourable → P = 3/6 = 1/2.','P(odd) = 3/6 = 1/2.'],
    ['(ii) >2: {3,4,5,6} → 4/6 = 2/3 · (iii) <9: all → 1','4 favourable → 2/3. "Less than 9" — die ka max 6 hai, toh SAB outcomes favourable → P = 1 (certain event!).','P(>2) = 4/6 = 2/3; P(<9) = 6/6 = 1 — a certain event.'],
    ['(iv) multiples of 3: {3,6} → 2/6 = 1/3','Do favourable → 1/3.','P(multiple of 3) = 2/6 = 1/3.']],
   ans:'(i) 1/2 · (ii) 2/3 · (iii) 1 (certain) · (iv) 1/3'},
  {q:'In a village fair there are 3 snacks (Samosa, Pakora, Bhaji) and 2 drinks (Chai, Lassi). List the sample space of snack+drink combos, and the event "Samosa chosen".',
   why:'Menu combinations, outfit combos, seat+meal choices — counting pairs is the base of probability. Table banao, confusion zero.',
   steps:[
    ['Each snack pairs with EACH drink → 3 × 2 = 6 combos','Multiplication principle: snack ke 3 options × drink ke 2 options = 6 total paths.','3 snacks × 2 drinks = 6 equally likely combinations.'],
    ['S = {(Samosa,Chai), (Samosa,Lassi), (Pakora,Chai), (Pakora,Lassi), (Bhaji,Chai), (Bhaji,Lassi)}','Table banao: rows = snacks, columns = drinks. Har cell ek outcome.','S = {(Samosa,Chai), (Samosa,Lassi), (Pakora,Chai), (Pakora,Lassi), (Bhaji,Chai), (Bhaji,Lassi)}.'],
    ['Event "Samosa": 2 outcomes → P = 2/6 = 1/3','Samosa wali row ke dono cells — 2 favourable out of 6.','P(Samosa chosen) = 2/6 = 1/3.']],
   ans:'6 outcomes in S · P(Samosa) = 1/3'}
 ]},
 {set:'Exercise Set 7.4 — Tree Diagrams',qs:[
  {q:'Basket A: 1 apple, 2 oranges. Basket B: 1 banana, 1 mango. You pick one fruit from each basket. Draw the tree, list S, and find P(one apple and one banana).',
   why:'Two-stage experiments ka classic starter — tree diagram banana khud probability ko visual bana deta hai.',
   steps:[
    ['Tree: stage 1 = A-basket (apple 1/3, orange 2/3), stage 2 = B-basket (banana 1/2, mango 1/2)','Pehli branch fruit-from-A, doosri fruit-from-B. Har path ka probability = branches ka PRODUCT.','Stage 1: apple (1/3) or orange (2/3); stage 2: banana (1/2) or mango (1/2).'],
    ['S = {apple-banana, apple-mango, orange-banana, orange-mango} — 4 paths','Tree ke 4 leaves = 4 outcomes.','S has 4 paths: apple-banana, apple-mango, orange-banana, orange-mango.'],
    ['P(apple AND banana) = 1/3 × 1/2 = 1/6','Independent picks → probabilities multiply. Path ke saare branch-probabilities multiply karo.','P(apple, banana) = (1/3)(1/2) = 1/6.']],
   ans:'4 outcomes · P(apple & banana) = 1/6'},
  {q:'A box has 3 red, 4 black, 2 green pens. You pick one and put it back; your friend does the same. Find P(both pick the same colour).',
   why:'"With replacement" = dono picks identical chances. Same-colour ka matlab teeno colour cases JODO — OR ka rule.',
   steps:[
    ['With replacement → second pick same odds: R 3/9, B 4/9, G 2/9','Pen wapas jaata hai → 9 pens har baar. Probabilities dono picks me same.','With replacement, each pick has R 3/9, B 4/9, G 2/9.'],
    ['Same colour ke 3 trees: RR, BB, GG — sabko JODO (or-rule)','RR: (3/9)(3/9) = 9/81. BB: (4/9)(4/9) = 16/81. GG: (2/9)(2/9) = 4/81.','P(RR) = 9/81, P(BB) = 16/81, P(GG) = 4/81.'],
    ['Total = (9 + 16 + 4)/81 = 29/81','Addition karke 29/81 ≈ 0.358. Bas — mutually exclusive cases add hote hain.','P(same colour) = 29/81 ≈ 0.36.']],
   ans:'29/81 ≈ 0.36'}
 ]},
 {set:'End-of-Chapter Exercises',qs:[
  {q:'A bag has 3 red, 2 blue, 1 green ball. One ball is picked at random. What is the probability that it is NOT red?',
   why:'"Not" events ka shortcut: P(not A) = 1 − P(A). Complement ek second ka kaam kar deta hai.',
   steps:[
    ['Total balls = 6','3 + 2 + 1 = 6 equally likely picks.','There are 6 equally likely balls.'],
    ['Method 1 (direct): not-red = blue + green = 3 → 3/6 = 1/2','Blue 2 + green 1 = 3 favourable.','P(not red) = 3/6 = 1/2 directly.'],
    ['Method 2 (complement): 1 − P(red) = 1 − 3/6 = 1/2','P(red) = 3/6. Complement rule: 1 − 3/6 = 1/2. Same answer, alag soch!','Or: P(not red) = 1 − P(red) = 1 − 1/2 = 1/2.']],
   ans:'1/2'},
  {q:'Three coins are tossed simultaneously. What is the probability of getting exactly two heads?',
   why:'"Simultaneously" bhi tree diagram se hi hota hai — bas coins ko ek-ek karke toss maan lo.',
   steps:[
    ['Sample space (toss one-by-one on paper): {HHH, HHT, HTH, THH, HTT, THT, TTH, TTT} — 8 outcomes','3 coins = 2 × 2 × 2 = 8 equally likely paths.','There are 2³ = 8 equally likely outcomes.'],
    ['Exactly two heads: {HHT, HTH, THH} — 3 outcomes','Exactly 2 matlab teen me se DO H aur ek T. Teen paths match karte hain.','The paths with exactly two H are HHT, HTH, THH.'],
    ['P = 3/8','3 favourable / 8 total = 3/8 = 0.375.','P(exactly two heads) = 3/8.']],
   ans:'3/8'},
  {q:'Two dice are rolled. What is the probability that the sum is a prime number greater than 5?',
   why:'Two-dice sample space (36 pairs) exam ka favourite hai. Prime > 5 filter lagao — careful counting ka test.',
   steps:[
    ['Total outcomes = 36; primes greater than 5 up to 12: only 7 and 11','Sums 2–12 me primes: 2,3,5,7,11. ">5" filter → sirf 7 aur 11.','From the 36 pairs, the qualifying sums are 7 and 11 only.'],
    ['Sum = 7: (1,6),(2,5),(3,4),(4,3),(5,2),(6,1) → 6 pairs','7 sabse "popular" sum hai — 6 tareeke.','Six pairs give sum 7.'],
    ['Sum = 11: (5,6),(6,5) → 2 pairs','Sirf do tareeke.','Two pairs give sum 11.'],
    ['P = (6 + 2)/36 = 8/36 = 2/9','Favourable 8 out of 36 → 2/9.','P(sum is prime > 5) = 8/36 = 2/9.']],
   ans:'2/9'},
  {q:'A four-digit number is formed using digits 1, 2, 3, 4 with no repetition. What is the probability that the number is even?',
   why:'Even ka matlab LAST digit even — counting ko peeche se shuru karo. Permutation thinking ka first taste.',
   steps:[
    ['Total numbers = 4! = 4 × 3 × 2 × 1 = 24','Pehli jagah 4 options, doosri 3, teesri 2, chauthi 1 → 24 numbers.','There are 4! = 24 such numbers.'],
    ['Even ⟺ last digit ∈ {2, 4}','Units digit hi evenness decide karta hai.','The number is even exactly when its last digit is 2 or 4.'],
    ['For each even last digit: 3! = 6 arrangements of the rest','Last digit fix (say 2) → baaki 3 digits pehle teen jagah: 3! = 6. Do choices (2,4) → 12 numbers.','Fixing an even last digit leaves 3! = 6 arrangements; two choices give 12.'],
    ['P = 12/24 = 1/2','Adhe numbers even — balanced digits ki wajah se.','P(even) = 12/24 = 1/2.']],
   ans:'1/2'},
  {q:'I throw a pair of dice. Write down an event with probability 0 and one with probability 1.',
   why:'Probability ke extremes — 0 (impossible) aur 1 (certain) — ko pehchanna hi range samajhna hai.',
   steps:[
    ['P = 0 means IMPOSSIBLE — no outcome matches','Die ka max sum 12 hai. Event "sum = 13" → koi pair nahi → P = 0.','Event "sum = 13" is impossible: P = 0.'],
    ['P = 1 means CERTAIN — every outcome matches','"Sum 2 se 12 ke beech hai" — har pair satisfy karta hai → P = 36/36 = 1.','Event "the sum is between 2 and 12" covers all 36 pairs: P = 1.'],
    ['Range reminder: 0 ≤ P ≤ 1','Probability kabhi negative nahi, kabhi 1 se bada nahi. Beech me hi sab kuch.','All probabilities live in [0, 1].']],
   ans:'P(sum = 13) = 0 · P(2 ≤ sum ≤ 12) = 1'}
 ]}
]};
</script>
