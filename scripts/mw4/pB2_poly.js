<script>
'use strict';
/* ============================================================
   BOOK ZONE DATA · part 2 — Polynomial Kingdom
   (Book Ch 2: Linear Polynomials + Book Ch 4: Algebraic Identities)
   ============================================================ */
window.BOOKZ=window.BOOKZ||{};
BOOKZ.poly={
 src:'Ganita Manjari · Grade 9 · Part I — Book Ch 2 (Linear Polynomials) + Book Ch 4 (Algebraic Identities)',
 sets:[
 {set:'Exercise Set 2.1 — Degrees & Coefficients',qs:[
  {q:'Find the degrees of: (i) 2x² − 5x + 3 (ii) y³ + 2y − 1 (iii) −9 (iv) 4z − 3',
   why:'Degree polynomial ki "class" hai — usse pata chalta hai graph ka shape aur kitne solutions milenge. Kisi bhi expression ko dekhte hi degree bolo toh aadha kaam ho gaya.',
   steps:[
    ['Degree = highest power of the variable','Degree matlab variable ki SABSE BADI power. Sirf highest dekhna hai — baaki terms ignore.','The degree of a polynomial is the highest power of the variable in it.'],
    ['(i) powers are 2, 1, 0 → degree 2','2x² me power 2, 5x me power 1, 3 me 0. Highest = 2 → degree 2 (quadratic).','In 2x² − 5x + 3 the highest power is 2, so the degree is 2.'],
    ['(ii) powers 3, 1, 0 → degree 3; (iii) no variable → degree 0','y³ + 2y − 1: highest 3 → degree 3 (cubic). −9 me variable hi nahi — constant polynomial, degree 0.','y³ + 2y − 1 has degree 3. The constant −9 has no variable, so its degree is 0.'],
    ['(iv) 4z − 3: highest power 1 → degree 1','Power 1 wale ko LINEAR polynomial bolte hain — isi poore chapter ka hero.','4z − 3 has degree 1 — a linear polynomial, the hero of this chapter.']],
   ans:'(i) 2 · (ii) 3 · (iii) 0 · (iv) 1'},
  {q:'What are the coefficients of x² and x³ in x⁴ − 3x³ + 6x² − 2x + 7, and what is the constant term of 9x³ + 5x² − 8x − 10?',
   why:'Coefficient = us term ka "quantity tag". Physics formulas me bhi yehi hota hai — ½gt² me ½ g ka coefficient hai.',
   steps:[
    ['Spot the exact term, then read its number','x² ka coefficient matlab x² kitne "copies" lag rahi hain. x⁴ − 3x³ + 6x² − 2x + 7 me x² wali term = +6x².','In x⁴ − 3x³ + 6x² − 2x + 7, the x²-term is 6x², so the coefficient of x² is 6.'],
    ['Coefficient of x³ = −3, coefficient of x² = 6','x³ ki term −3x³ hai → coefficient −3 (minus yaad rakhna!). x² ki term 6x² → coefficient 6.','The coefficient of x³ is −3 (sign included!) and the coefficient of x² is 6.'],
    ['Constant term = jisme variable ho hi na','9x³ + 5x² − 8x − 10 me variable-free term = −10. Isliye constant term −10.','The constant term of 9x³ + 5x² − 8x − 10 is −10 — the term with no variable at all.']],
   ans:'coeff of x³ = −3 · coeff of x² = 6 · constant term = −10'}
 ]},
 {set:'Exercise Set 2.2 — Values & Word Problems',qs:[
  {q:'Find the value of the linear polynomial 5x − 3 at: (i) x = 0 (ii) x = −1 (iii) x = 2',
   why:'Polynomial ko "machine" samjho: x daalo, output lo. Auto-rickshaw meter bhi yehi hai — distance daalo, fare niklo.',
   steps:[
    ['Substitute x = 0: 5(0) − 3','x ki jagah 0 rakho: 5×0 = 0, toh 0 − 3 = −3.','Put x = 0: 5(0) − 3 = −3.'],
    ['Substitute x = −1: 5(−1) − 3','5 × (−1) = −5. −5 − 3 = −8. Negative se multiply karte waqt sign dhyan se.','Put x = −1: 5(−1) − 3 = −5 − 3 = −8.'],
    ['Substitute x = 2: 5(2) − 3 = 7','5 × 2 = 10, 10 − 3 = 7. Machine ne teen alag outputs diye — yehi polynomial ki "value" hai.','Put x = 2: 10 − 3 = 7.']],
   ans:'(i) −3 · (ii) −8 · (iii) 7'},
  {q:'The present age of Salil\'s mother is three times Salil\'s present age. After 5 years, their ages will add up to 70 years. Find their present ages.',
   why:'Age problems insurance forms, Aadhaar corrections — sab me aate hain. "Abhi" aur "5 saal baad" ka farak line me kholna hi solution hai.',
   steps:[
    ['Name the unknown: Salil = x, so mother = 3x','Salil ki age x maan lo. Mother 3 guna → 3x. "Present age" ke liye ye dono variables ready.','Let Salil\'s present age be x. Then his mother\'s is 3x.'],
    ['After 5 years BOTH grow: (x + 5) + (3x + 5) = 70','Galti jo sab karte hain: sirf ek ko +5 dena! DONO 5 saal budhe honge. Sum: x + 5 + 3x + 5 = 70.','After 5 years Salil is x + 5 and his mother is 3x + 5, and their sum is 70.'],
    ['Simplify: 4x + 10 = 70 → 4x = 60','x + 3x = 4x; 5 + 5 = 10. Dono sides − 10: 4x = 60.','Combine: 4x + 10 = 70, so 4x = 60.'],
    ['x = 15 → Salil is 15, mother is 45','Dono sides ÷ 4: x = 15. Mother = 3×15 = 45. Check: (15+5) + (45+5) = 20 + 50 = 70 ✓','x = 15, so Salil is 15 and his mother is 45. Check: 20 + 50 = 70 ✓']],
   ans:'Salil = 15 years, Mother = 45 years'},
  {q:'Ruby has 3 times as many two-rupee coins as she has five-rupee coins. If she has a total ₹88, how many coins of each type does she have?',
   why:'Piggy bank, cash drawer, chhutad change — "kitne coin kis type ke" classic inventory problem hai, cashier roz karta hai.',
   steps:[
    ['Let five-rupee coins = f, so two-rupee coins = 3f','Jo KAM hain usse f bolo — two-rupee coins 3 guna zyada hain, toh wo 3f banenge.','Let the number of five-rupee coins be f. Then two-rupee coins = 3f.'],
    ['Money equation: 5 × f + 2 × 3f = 88','Har five-rupee coin ₹5 deta hai: 5f rupees. Har two-rupee coin ₹2: 2 × 3f = 6f rupees. Total 5f + 6f = 88.','Value: 5f + 2(3f) = 5f + 6f = 88 rupees.'],
    ['11f = 88 → f = 8','5f + 6f = 11f. Dono sides ÷ 11: f = 8.','So 11f = 88, giving f = 8.'],
    ['8 five-rupee coins and 24 two-rupee coins','Two-rupee = 3 × 8 = 24. Total coins = 32. Check money: 8×5 + 24×2 = 40 + 48 = ₹88 ✓','Ruby has 8 five-rupee coins and 24 two-rupee coins — total value 40 + 48 = ₹88 ✓.']],
   ans:'8 five-rupee coins · 24 two-rupee coins'}
 ]},
 {set:'Exercise Set 2.4 — Linear Growth & Decay',qs:[
  {q:'A mobile phone is bought for ₹10,000. Its value decreases by ₹800 every year. (i) Find its value after 3 years. (ii) Find an expression relating value v and time t, and explain why it represents linear decay.',
   why:'Phone, bike, laptop — sab depreciate hote hain. Resale price ka andaza lagane ka formula yehi hai; OLX seller bhi yehi sochta hai.',
   steps:[
    ['Each year costs ₹800 → after 3 years, 3 × 800 = ₹2400 gone','3 saal me total girawat = 800 × 3 = 2400 rupees.','Total decrease in 3 years = 800 × 3 = ₹2400.'],
    ['Value after 3 years = 10000 − 2400 = ₹7,600','Starting value minus total fall: 10000 − 2400 = 7600.','v = 10000 − 2400 = ₹7,600.'],
    ['General expression: v = 10000 − 800t','t saal ke liye: value = starting − (rate × time) = 10000 − 800t. Ye hi linear relationship hai.','After t years, v = 10000 − 800t.'],
    ['Why LINEAR decay? Rate per year is CONSTANT','Har saal EXACTLY ₹800 ka girawat — change per step constant hai, isliye graph ek seedhi neeche jaati line (negative slope −800). Value kabhi negative nahi hogi: t = 12.5 pe zero.','Because the change each year is a constant −800, the graph is a straight line falling with slope −800: linear decay.']],
   ans:'(i) ₹7,600 · (ii) v = 10000 − 800t (linear decay, slope −800)'}
 ]},
 {set:'End-of-Chapter Exercises',qs:[
  {q:'A positive number is 5 times another number. If 21 is added to both the numbers, then one of the new numbers becomes twice the other new number. What are the numbers?',
   why:'Ratio-based problems profit-sharing, recipe scaling, map scales me sab aate hain — "5 times" ko x aur 5x me kholna hi skill hai.',
   steps:[
    ['Let the smaller number = x, so bigger = 5x','"5 times another" → x aur 5x. Dono positive hain, tension nahi.','Let the numbers be x and 5x (x > 0).'],
    ['Add 21 to both: x + 21 and 5x + 21','Dono numbers ko 21 mila — dono badal jayenge.','After adding 21 to each: x + 21 and 5x + 21.'],
    ['New condition: 5x + 21 = 2(x + 21)','"one becomes twice the other" — bada wala (5x+21) ab chhota wale (x+21) ka double hai.','The larger new number is twice the smaller: 5x + 21 = 2(x + 21).'],
    ['Expand: 5x + 21 = 2x + 42 → 3x = 21 → x = 7','Right side kholo: 2x + 42. Dono sides − 2x: 3x + 21 = 42. Dono sides − 21: 3x = 21. ÷3: x = 7.','Expanding: 5x + 21 = 2x + 42 → 3x = 21 → x = 7.'],
    ['Numbers are 7 and 35 — verify!','Check: 7+21 = 28, 35+21 = 56. 56 = 2 × 28 ✓ Perfect.','The numbers are 7 and 35. Check: 28 and 56, and 56 = 2 × 28 ✓.']],
   ans:'The two numbers are 7 and 35'},
  {q:'If temperature in Kelvin is x K and in Fahrenheit is y °F, then y = (9/5)(x − 273) + 32. (i) Find y when x = 313 K. (ii) Find x when y = 158 °F.',
   why:'Science lab me Kelvin, ghar me Celsius/Fahrenheit — same temperature, different "address". Conversion bhi ek linear polynomial hi hai!',
   steps:[
    ['Substitute x = 313: y = (9/5)(313 − 273) + 32','Bracket PEHLE: 313 − 273 = 40. BODMAS yaad rakho.','Substitute: y = (9/5)(40) + 32 (bracket first!).'],
    ['(9/5) × 40 = 72 → y = 72 + 32 = 104 °F','40 ÷ 5 = 8, 8 × 9 = 72. Plus 32 → 104. Toh 313 K = 104 °F.','(9/5)(40) = 72, so y = 72 + 32 = 104 °F.'],
    ['Reverse: 158 = (9/5)(x − 273) + 32 → subtract 32 first','Ab ulta jana hai. Dono sides − 32: 126 = (9/5)(x − 273).','For (ii): subtract 32 from both sides: 126 = (9/5)(x − 273).'],
    ['Multiply by 5/9: x − 273 = 126 × 5/9 = 70 → x = 343 K','126 × 5 = 630; 630 ÷ 9 = 70. Dono sides + 273: x = 343. Toh 158 °F = 343 K.','Multiply both sides by 5/9: x − 273 = 70, so x = 343 K.']],
   ans:'(i) 104 °F · (ii) 343 K'},
  {q:'The graph of a linear polynomial p(x) passes through (1, 5) and (3, 11). (i) Find p(x). (ii) Find where the graph cuts the axes.',
   why:'Do points milo → poori line ka rule nikal lo. Trending stock price, speed ke saath distance — 2 data points se future predict karna yehi hai.',
   steps:[
    ['Let p(x) = ax + b — every linear polynomial looks like this','Linear polynomial ka general form ax + b. Bas a (slope) aur b (y-intercept) dhundne hain.','Write p(x) = ax + b with unknowns a and b.'],
    ['Both points must satisfy it: a + b = 5 and 3a + b = 11','(1,5): p(1) = a + b = 5. (3,11): p(3) = 3a + b = 11. Do equations, do unknowns.','Point (1, 5) gives a + b = 5; point (3, 11) gives 3a + b = 11.'],
    ['Subtract: (3a + b) − (a + b) = 11 − 5 → 2a = 6 → a = 3','Equations minus karo — b gayab! 2a = 6 → a = 3. Slope = 3 matlab x har 1 badhe toh y 3 badhta hai.','Subtracting kills b: 2a = 6, so a = 3 (the slope).'],
    ['Back-substitute: 3 + b = 5 → b = 2 → p(x) = 3x + 2','a = 5−b wali equation me daalo: 3 + b = 5 → b = 2. p(x) = 3x + 2.','Then 3 + b = 5 gives b = 2, so p(x) = 3x + 2.'],
    ['Axes cuts: y-axis at (0, 2), x-axis at (−2/3, 0)','p(0) = 2 → y-axis cut (0,2). p(x) = 0: 3x + 2 = 0 → x = −2/3 → x-axis cut (−2/3, 0).','p(0) = 2 gives the y-cut (0, 2); 3x + 2 = 0 gives the x-cut (−2/3, 0).']],
   ans:'(i) p(x) = 3x + 2 · (ii) cuts y-axis at (0, 2), x-axis at (−2/3, 0)'}
 ]},
 {set:'Book Ch 4 · Exercise Set 4.1 & 4.3 — Identities at Work',qs:[
  {q:'Using (a + b)² = a² + 2ab + b², expand: (i) (7x + 4y)²',
   why:'Yahi identity aage mental maths, physics (kinematics), aur poore algebra me kaam karegi. Tiles se dekho toh ek square ke 4 tukde ban jaate hain.',
   steps:[
    ['Match: a = 7x, b = 4y','Identity me a ki jagah 7x aur b ki jagah 4y rakhna hai. (a+b)² ko teen tukdon me kholte hain: a², 2ab, b².','Set a = 7x and b = 4y in the identity.'],
    ['a² = (7x)² = 49x²','Dono ko square karo: 7² = 49 aur x². (7x)² = 49x² — power har factor pe lagti hai.','(7x)² = 49x².'],
    ['2ab = 2 × 7x × 4y = 56xy','Middle term: 2 × 7 × 4 = 56, x ko y se multiply → xy. Ye term sabse aasan bhool jaate hain — 2ab hamesha yaad!','The middle term: 2 × 7x × 4y = 56xy — this is the term everyone forgets.'],
    ['b² = (4y)² = 16y² → answer: 49x² + 56xy + 16y²','4² = 16 with y². Teen terms jodo: 49x² + 56xy + 16y².','(4y)² = 16y². Answer: 49x² + 56xy + 16y².']],
   ans:'49x² + 56xy + 16y²'},
  {q:'Using the same identity, find (105)².',
   why:'Calculator ke bina 5-second me bade squares! Bank exams, aptitude tests me yehi trick kaam aati hai.',
   steps:[
    ['Split 105 = 100 + 5 → a = 100, b = 5','Bade number ko easy tukdon me todo: 105 = 100 + 5. Ab identity lagao.','Write 105² = (100 + 5)².'],
    ['a² = 100² = 10000','100 ka square 10000 — ek ke baad chaar zero.','(100)² = 10000.'],
    ['2ab = 2 × 100 × 5 = 1000','Middle term: 2 × 100 × 5 = 1000.','2ab = 2 × 100 × 5 = 1000.'],
    ['b² = 25 → 10000 + 1000 + 25 = 11025','Sab jodo: 10000 + 1000 + 25 = 11025. Calculator ke bina!','Add: 10000 + 1000 + 25 = 11025.']],
   ans:'105² = 11025'},
  {q:'Find 117² using a suitable identity.',
   why:'117 jaise "boring" numbers bhi identity se 4 lines me square ho jaate hain — exam me saving 1 minute = 1 extra question.',
   steps:[
    ['Choose the split: 117 = 100 + 17 (or 120 − 3)','Do options hain: (100 + 17) ya (120 − 3). (a−b) wala chhota numbers deta hai — 120 − 3 lena smarter hai.','117² can be (100 + 17)² or (120 − 3)². Pick (120 − 3)² for smaller numbers.'],
    ['Use (a − b)² = a² − 2ab + b²: 120² − 2(120)(3) + 3²','a = 120, b = 3. Identity ka minus wala version: middle term MINUS.','Apply (a − b)² = a² − 2ab + b².'],
    ['14400 − 720 + 9 = 13689','14400 − 720 = 13680; +9 → 13689.','14400 − 720 + 9 = 13689.']],
   ans:'117² = 13689'},
  {q:'Factor completely: 16y² − 24y + 9',
   why:'Factorisation expansion ka REVERSE hai. Area diya hai, sides dhundni hain — interior design, farming plots, sab me ulta kaam.',
   steps:[
    ['Check the pattern: is it a perfect square?','Pattern dekho: first term 16y² = (4y)², last term 9 = 3². Middle −24y? Test: 2 × 4y × 3 = 24y ✓ (sign negative toh minus version).','Check for a perfect square: 16y² = (4y)², 9 = 3², and 2·(4y)·3 = 24y matches the middle term.'],
    ['Use (a − b)² = a² − 2ab + b² with a = 4y, b = 3','Sign negative hai isliye MINUS identity: a² − 2ab + b² = (a − b)².','Since the middle term is negative, use (a − b)² with a = 4y, b = 3.'],
    ['16y² − 24y + 9 = (4y − 3)²','Seedha answer: (4y − 3)². Verify karo expand karke: 16y² − 24y + 9 ✓','So 16y² − 24y + 9 = (4y − 3)². (Verify by expanding!)']],
   ans:'(4y − 3)²'},
  {q:'A rectangular pool has area 2x² + 7x + 3 square hastas. If its width is (2x + 1) hastas, find its length.',
   why:'Area = length × width — algebra me iska matlab "expression ko factor karo". Old units (hasta) ke saath history bhi mili!',
   steps:[
    ['Area = length × width → length = area ÷ width','Formula se: length = (2x² + 7x + 3) ÷ (2x + 1). Divide karne ke liye FACTORISE karo.','Length = Area ÷ Width = (2x² + 7x + 3)/(2x + 1). Factorise the area.'],
    ['Split the middle term: 7x = 6x + x','2x² + 7x + 3: aisa jodo ki grouping ho. 7x = 6x + x: 2x² + 6x + x + 3. Product check: 2×3 = 6, aur 6x·x = 6x² = product of ends ✓','Split 7x = 6x + x (since 2 × 3 = 6 and 6 + 1 = 7).'],
    ['Group: 2x(x + 3) + 1(x + 3) = (x + 3)(2x + 1)','Pehli do terms me 2x common, aakhri do me 1: 2x(x+3) + 1(x+3). Common (x+3) bahar: (x+3)(2x+1).','Grouping: 2x(x + 3) + 1(x + 3) = (x + 3)(2x + 1).'],
    ['Length = (x + 3) hastas — the other factor','Area = (2x+1)(x+3), width = (2x+1) diya gaya → length = (x + 3).','Since Area = (2x + 1)(x + 3) and width = 2x + 1, the length is (x + 3) hastas.']],
   ans:'Length = (x + 3) hastas'},
  {q:'The village playground is a square of side 40 m. A walking path of width s metres is built around it. Find an expression for the area of the path.',
   why:'Border/fence/path wale questions "bada square minus chhota square" hote hain — tiles lagane, garden design, sab me same idea.',
   steps:[
    ['Path ke saath whole side = 40 + 2s','Path CHAARO taraf hai → har side pe s do baar judta hai (dono ends). New side = 40 + 2s.','With the path on both ends of every side, the outer square has side 40 + 2s.'],
    ['Big square area: (40 + 2s)²','Whole area (playground + path) = (40 + 2s)². Identity se: 1600 + 160s + 4s².','Outer area = (40 + 2s)² = 1600 + 160s + 4s².'],
    ['Playground area: 40² = 1600','Andar wala square fixed: 1600 m².','Playground area = 1600 m².'],
    ['Path area = outer − inner = (1600 + 160s + 4s²) − 1600 = 4s² + 160s','Subtract: 1600 cancel! Path ka area = 4s² + 160s square metres. (s = 2 ho toh 16 + 320 = 336 m².)','Path area = (40 + 2s)² − 40² = 4s² + 160s square metres.']],
   ans:'Area of path = 4s² + 160s square metres (i.e. s(4s + 160))'}
 ]}
]};
</script>
