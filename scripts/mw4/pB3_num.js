<script>
'use strict';
/* ============================================================
   BOOK ZONE DATA · part 3 — Number Nagar (Book Ch 3: The World of Numbers)
   ============================================================ */
window.BOOKZ=window.BOOKZ||{};
BOOKZ.num={
 src:'Ganita Manjari · Grade 9 · Part I — Book Ch 3 (The World of Numbers)',
 sets:[
 {set:'Exercise Set 3.2 — Integers (Brahmagupta style)',qs:[
  {q:'The temperature in the high-altitude desert of Ladakh is 4 °C at noon. By midnight it drops by 15 °C. What is the midnight temperature?',
   why:'Weather apps, hill trips, freezer settings — temperature exactly aise hi chalta hai. Drop matlab MINUS.',
   steps:[
    ['"Drops by 15" means subtract 15','Drop = girti hai = minus. Starting 4°C se 15 kam karna hai: 4 − 15.','A drop of 15 means we subtract: new temperature = 4 − 15.'],
    ['4 − 15: number line pe 15 kadam LEFT','4 me se 15 nahi katega — 4 se 15 kadam left jao: 4 → 0 (4 kadam) → aur 11 kadam = −11. Brahmagupta ka debt idea: jab cheez kam pad jaye, negative.','On the number line, move 15 steps left from 4: you pass 0 after 4 steps and land 11 further left, at −11.'],
    ['Midnight temperature = −11 °C','Freezing se bhi 11 degree neeche — Ladakh normal!','The midnight temperature is −11 °C.']],
   ans:'−11 °C'},
  {q:'A spice trader takes a loan (debt) of ₹850. Next day he makes a profit (fortune) of ₹1,200. The following week he incurs a loss of ₹450. Write this as an equation using integers and find his final financial standing.',
   why:'Brahmagupta ne yehi kiya tha — debt = negative (ṛiṇa), fortune = positive (Dhana). Aaj ka bank statement exactly yahi system hai.',
   steps:[
    ['Loan = −850, profit = +1200, loss = −450','Ṛiṇa (debt) negative: −850. Dhana (fortune) positive: +1200. Loss phir negative: −450.','Loan → −850, profit → +1200, loss → −450 (Brahmagupta\'s dhana/ṛiṇa convention).'],
    ['Equation: −850 + 1200 − 450','Teen events ko sign ke saath jodo.','Combine the three events: −850 + 1200 − 450.'],
    ['−850 + 1200 = +350','1200 me se 850 ka debt chuka do — 350 bacha, ab profit side pe.','−850 + 1200 = +350 — the trader is now in fortune.'],
    ['350 − 450 = −100 → net debt ₹100','350 se 450 ka loss — phir debt me: −100. Negative number ek story kehta hai!','350 − 450 = −100 — back into debt. Final standing: −100 (owes ₹100).']],
   ans:'−850 + 1200 − 450 = −100 → a net debt of ₹100'},
  {q:'Calculate using Brahmagupta\'s laws: (i) (−12) × 5 (ii) (−8) × (−7) (iii) 0 − (−14) (iv) (−20) ÷ 4',
   why:'Sign rules har exam, EMI, physics — sab jagah. Ek baar rule pakka, lifetime set.',
   steps:[
    ['Rule: same signs → PLUS, different signs → MINUS','Multiply/divide me: (+)(+) = +, (−)(−) = +, (+)(−) = −. Sizes alag se multiply/divide hote hain.','For × and ÷: like signs give +, unlike signs give −. Handle sizes separately from signs.'],
    ['(i) (−12) × 5 = −60','Signs alag → minus. 12 × 5 = 60 → −60.','(−12) × 5 = −60 (unlike signs).'],
    ['(ii) (−8) × (−7) = +56','Dono minus → PLUS. 8 × 7 = 56. "Do galat ek saath = sahi"!','(−8) × (−7) = 56 (like signs give positive).'],
    ['(iii) 0 − (−14) = 0 + 14 = 14','Minus ke saath minus = plus. (Debt maaf = labh!)','Subtracting a negative ADDS: 0 − (−14) = 14.'],
    ['(iv) (−20) ÷ 4 = −5','Signs alag → minus. 20 ÷ 4 = 5 → −5.','(−20) ÷ 4 = −5 (unlike signs).']],
   ans:'(i) −60 · (ii) 56 · (iii) 14 · (iv) −5'}
 ]},
 {set:'Exercise Set 3.3 & 3.4 — Rational Numbers',qs:[
  {q:'Find the sum: (i) 2/5 + 3/10 (ii) −4/7 + 3/14',
   why:'Pizza slices alag size me cut ho toh pehle SAME size ke slices banao — yehi LCM ka kaam hai.',
   steps:[
    ['Different denominators → same banao (LCM)','2/5 aur 3/10: LCM(5,10) = 10. 7 aur 14: LCM = 14.','Rewrite both fractions with the LCM of the denominators.'],
    ['(i) 2/5 = 4/10 → 4/10 + 3/10 = 7/10','5 → 10 karne ke liye upar-neeche ×2: 2/5 = 4/10. 4 + 3 = 7.','(i) 2/5 = 4/10, so the sum is 7/10.'],
    ['(ii) −4/7 = −8/14 → −8/14 + 3/14 = −5/14','7 → 14: ×2. −8 + 3 = −5. Sign numerator ke saath chalta hai.','(ii) −4/7 = −8/14, so the sum is −5/14.']],
   ans:'(i) 7/10 · (ii) −5/14'},
  {q:'Find three distinct rational numbers strictly between −1/2 and 1/4.',
   why:'Rationals ke beech INFINITELY many aur rationals hote hain — "density" ka pehla hands-on feel.',
   steps:[
    ['Common denominator banao taaki gap dikhe','−1/2 aur 1/4: LCM 4 → −2/4 aur 1/4. Beech me sirf −1/4 dikh raha hai. Densify!','Write −1/2 = −2/4 and 1/4 — only −1/4 shows up. We need more room.'],
    ['Scale to eighths: −4/8 and 2/8','Dono ko ×2 upar-neeche: −1/2 = −4/8, 1/4 = 2/8. Ab beech me: −3/8, −2/8, −1/8, 0, 1/8.','Scaling to eighths reveals −3/8, −2/8, −1/8, 0, 1/8.'],
    ['Pick any three: −3/8, 0, 1/8','Teeno strictly beech hain ✓. (−2/8 = −1/4 bhi chalega.)','One valid answer: −3/8, 0, 1/8.'],
    ['Aur bhi — infinity tak','16ths, 32nds... denominator badhao, aur numbers milte rahenge. Isliye "infinitely many".','With denominators 16, 32, … you keep finding more — that is density.']],
   ans:'e.g. −3/8, 0, 1/8 (any three strictly between work)'},
  {q:'Find three rational numbers between 3.1415 and 3.1416.',
   why:'π = 3.14159... isi gali me rehta hai! Decimals me beech ka number = digit chipkao.',
   steps:[
    ['Decimals me "beech" = extra digit','3.1415 aur 3.1416 ke beech: 5th decimal digit 1 se 9 tak kuch bhi — 3.14151 … 3.14159.','Between 3.1415 and 3.1416, append any 5th digit from 1 to 9.'],
    ['Candidates: 3.14151, 3.14155, 3.14159','Teeno strictly beech ✓ — check: 3.1415 < 3.14151 < 3.1416.','Examples: 3.14151, 3.14155, 3.14159.'],
    ['Fun fact: π khud isi window me hai','π ≈ 3.14159265… bhi in dono ke beech hai — ek IRRATIONAL, rationals ke beech chhupa hua!','π itself lies in this interval — an irrational hiding among rationals.']],
   ans:'e.g. 3.14151, 3.14155, 3.14159'}
 ]},
 {set:'Exercise Set 3.5 — Terminating, Repeating & Irrational',qs:[
  {q:'Without long division, decide which have terminating decimals: 7/20, 4/15, 13/250.',
   why:'Division se PEHLE denominator ka "DNA test" (sirf 2s aur 5s?) bata deta hai decimal ki qismat. Exam time-saver!',
   steps:[
    ['Rule: terminating ⟺ denominator (lowest form) = only 2s & 5s','Denominator prime factors me todo. Sirf 2/5 → terminating. Koi aur prime (3, 7…) → repeating.','A fraction terminates exactly when its lowest-form denominator has no primes except 2s and 5s.'],
    ['7/20: 20 = 2²×5² → TERMINATES (0.35)','Dono allowed. 7 ÷ 20 = 0.35.','7/20 = 0.35 — terminates.'],
    ['4/15: 15 = 3×5 → REPEATS (0.2666…)','3 villain hai. 4 ÷ 15 = 0.2666… (6 ghumta rehta hai).','4/15 = 0.2666… — repeats (the 3 spoils it).'],
    ['13/250: 250 = 2×5³ → TERMINATES (0.052)','Sirf 2 aur 5. 13 ÷ 250 = 0.052.','13/250 = 0.052 — terminates.']],
   ans:'7/20 → 0.35 (terminates) · 4/15 → repeats · 13/250 → 0.052 (terminates)'},
  {q:'Classify as rational or irrational: (i) √81 (ii) √12 (iii) 0.33333… (iv) 0.123451234512345… (v) 1.01001000100001…',
   why:'Irrationals pehchanna = Number Nagar ka black belt. Decimals ka pattern test karna seekho.',
   steps:[
    ['√81 = 9 — perfect square → RATIONAL','81 = 9². Root nikla integer = rational.','√81 = 9 — rational.'],
    ['√12 = 2√3 → IRRATIONAL','12 = 4×3 → √12 = 2√3. √3 irrational → 2√3 bhi.','√12 = 2√3 — irrational.'],
    ['0.333… and 0.1234512345… → RATIONAL (repeating)','Dono me FIXED block repeat hota hai (3 aur 12345) → rational. 0.333… = 1/3.','Repeating blocks mean rational: 0.333… = 1/3; 0.1234512345… = 12345/99999.'],
    ['1.010010001… → IRRATIONAL (growing gaps)','1 ke beech zeros badhte ja rahe hain (0, 00, 000…) — koi FIXED block repeat nahi → irrational. Trap!','The zero-gaps keep growing — no repeating block → irrational.']],
   ans:'Rational: √81, 0.333…, 0.1234512345… · Irrational: √12, 1.010010001…'},
  {q:'Without dividing, determine whether 18/125 terminates; if so, how many decimal places?',
   why:'"Kitne decimal places" bhi denominator se predict hota hai — max power of 2 ya 5. Billing systems me yehi hota hai.',
   steps:[
    ['Factor: 125 = 5³ → terminates','Sirf 5s → terminating. Koi 2 nahi, koi aur prime nahi.','125 = 5³ → the decimal terminates.'],
    ['Places = max power of 2 or 5 = 3','Rule: places = max(exponent of 2, exponent of 5) = max(0,3) = 3.','Number of decimal places = 3.'],
    ['See it: 18/125 = (18×8)/(125×8) = 144/1000 = 0.144','125 ko 1000 banane ke liye 8 se multiply — 144/1000 = 0.144. Teen places ✓','18/125 = 144/1000 = 0.144.']],
   ans:'Terminating · 3 decimal places · 0.144'}
 ]},
 {set:'End-of-Chapter Exercises',qs:[
  {q:'Prove that √5 is an irrational number.',
   why:'Classic exam proof — "contradiction" ki kala: maan lo rational, phir khud ko galat saabit karo.',
   steps:[
    ['Assume the opposite: √5 = p/q (lowest terms)','Maan lo √5 = p/q, p-q co-prime (no common factor).','Suppose √5 = p/q in lowest terms.'],
    ['Square: p² = 5q² → 5 | p² → 5 | p','p² me 5 ka factor → p me bhi 5 (prime 5 square me pair bana ke aata hai).','Then p² = 5q², so 5 divides p², hence 5 divides p.'],
    ['Let p = 5k → q² = 5k² → 5 | q','p = 5k: 25k² = 5q² → q² = 5k² → q me bhi 5.','Write p = 5k: then q² = 5k², so 5 divides q too.'],
    ['Contradiction → √5 irrational','p aur q DONO me 5 common — but humne kaha tha lowest terms. Contradiction! → √5 rational ho hi nahi sakta.','Both divisible by 5 contradicts lowest terms, so √5 is irrational. Template works for √2, √3, √7…']],
   ans:'√5 is irrational (proof by contradiction)'}
 ]}
]};
</script>
