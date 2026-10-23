<script>
'use strict';
/* ============================================================
   BOOK ZONE DATA · part 7 — Sequence Spires (Book Ch 8: Sequences & Progressions)
   ============================================================ */
window.BOOKZ=window.BOOKZ||{};
BOOKZ.seq={
 src:'Ganita Manjari · Grade 9 · Part I — Book Ch 8 (Predicting What Comes Next: Sequences and Progressions)',
 sets:[
 {set:'Section Examples — Patterns Meet Real Life',qs:[
  {q:'A taxi charges ₹200 fixed booking plus ₹40 per km. Write the fare sequence for 1, 2, 3, … km and the fare for a 10 km trip.',
   why:'Auto/taxi meter, gym membership, phone plan — "fixed + per-unit" har jagah hai, aur ye ek AP hi hai!',
   steps:[
    ['Fares: 240, 280, 320, … — an AP with a = 240, d = 40','Har km pe ₹40 badh raha hai — constant difference = AP ki pehchaan.','Fares 240, 280, 320, … form an AP: first term 240, common difference 40.'],
    ['nth fare: tn = 240 + (n−1)×40 = 200 + 40n','Formula lagao aur simplify: 240 + 40n − 40 = 200 + 40n. Fixed 200 wapas dikh gaya!','tn = 240 + (n−1)(40) = 200 + 40n — the fixed fee reappears.'],
    ['10 km: 200 + 40×10 = ₹600','n = 10 daalo: 600 rupaye.','For n = 10: 200 + 400 = ₹600.']],
   ans:'tn = 200 + 40n · 10 km trip = ₹600'}
 ]},
 {set:'Exercise Set 8.3 — Geometric Progressions',qs:[
  {q:'Find the 12th term of a GP with common ratio 2, whose 8th term is 192.',
   why:'Ek door ka term diya, aur door ka term chahiye — beech ka gap ratio ke powers se bridge hota hai. Shortcut seekho!',
   steps:[
    ['t12 and t8 ka relationship: t12 = t8 × r⁴','Formula se: t12 = ar¹¹, t8 = ar⁷. Ratio: t12/t8 = r⁴. Beech me exactly 4 multiplications.','t12 = ar¹¹ = ar⁷ × r⁴ = t8 · r⁴.'],
    ['t12 = 192 × 2⁴ = 192 × 16','2⁴ = 16. 192 × 16 = 3072.','t12 = 192 × 16 = 3072.'],
    ['Answer: 3072 — without even finding a!','a ki zaroorat hi nahi padi — relative jump kaam kar gayi. Ye trick time bachati hai.','The 12th term is 3072, found without computing the first term.']],
   ans:'t12 = 3072'},
  {q:'Which term of the GP 2, 6, 18, … is 4374? Write both the explicit and recursive formulas.',
   why:'GP me "kaunsa term" = exponent solve karna. Powers of 3 pehle chhant lo — 2187 = 3⁷ yaad ho toh 10 second ka kaam.',
   steps:[
    ['GP form: tn = a·r^(n−1) with a = 2, r = 3','6/2 = 3, 18/6 = 3 — ratio constant 3.','tn = 2·3^(n−1) is the explicit formula.'],
    ['Set 2·3^(n−1) = 4374 → 3^(n−1) = 2187','Dono sides ÷ 2: 2187. Ye 3 ki power hai: 3⁷ = 2187 (3,9,27,81,243,729,2187).','2·3^(n−1) = 4374 gives 3^(n−1) = 2187 = 3⁷.'],
    ['n − 1 = 7 → n = 8','Exponents barabar → n = 8. Aathwa term hi 4374 hai.','n − 1 = 7, so the 8th term is 4374.'],
    ['Recursive form: t1 = 2, t(n+1) = 3·tn','Har term pichle ko ×3 — yehi recursive rule hai.','Recursive: t1 = 2, t(n+1) = 3 t(n).']],
   ans:'8th term · tn = 2·3^(n−1) · t1 = 2, t(n+1) = 3tn'},
  {q:'A ball is dropped from 80 m and bounces back to 60% of its previous height each time. (i) Height after the 5th bounce? (ii) Total vertical distance travelled by the time it hits the ground for the 6th time?',
   why:'Basketball, rubber ball, physics lab — bounce = GP in action. Ratio 0.6 har baar multiply hota hai.',
   steps:[
    ['Heights form a GP: 80, 48, 28.8, … with r = 0.6','Har bounce 60% = ×0.6. Heights: 80×0.6ⁿ.','Bounce heights: 80·(0.6)ⁿ — a GP with ratio 0.6.'],
    ['(i) 5th bounce: 80 × 0.6⁵ = 80 × 0.07776 ≈ 6.22 m','0.6⁵ = 0.07776. ×80 = 6.2208 m.','After the 5th bounce: 80(0.6)⁵ ≈ 6.22 m.'],
    ['(ii) Down 80, then 5 up-down pairs of GP heights','Distance = 80 + 2×(48 + 28.8 + 17.28 + 10.368 + 6.2208). Har bounce UPAR bhi jaata hai aur NEECHE bhi — isliye 2× (except the final hit).','Total = 80 + 2(48 + 28.8 + 17.28 + 10.368 + 6.2208).'],
    ['Sum inside: 110.6688 → total ≈ 80 + 221.38 = 301.38 m','GP terms add karo: 110.6688. Double: 221.3776. Plus initial 80 → ≈ 301.38 m.','Total vertical distance ≈ 301.38 m.']],
   ans:'(i) ≈ 6.22 m · (ii) ≈ 301.38 m'},
  {q:'Sierpiński triangle: each black triangle becomes 3 at the next stage. If Stage 0 has 1, find the count at stage n and the black area rule (area ×3/4 each stage).',
   why:'Fractals = GP chhupa ke rakhte hain. Sierpiński ka triangle 3ⁿ triangles and (3/4)ⁿ area — dono GP! Nature (fern, snowflake) bhi aisa hi karta hai.',
   steps:[
    ['Count: 1, 3, 9, 27, … → tn = 3ⁿ (a GP with r = 3)','Har stage pe har black triangle 3 banta hai → ×3. Stage n pe 3ⁿ triangles.','Black triangle count at stage n is 3ⁿ — a GP with ratio 3.'],
    ['Stage 4 → 81, Stage 5 → 243','3⁴ = 81, 3⁵ = 243.','Stages 4 and 5 have 81 and 243 black triangles.'],
    ['Area: 1, 3/4, (3/4)², … → (3/4)ⁿ','Har stage pe centre ka 1/4 hissa hat-ta hai → black area ×3/4. Stage n pe (3/4)ⁿ square units.','Black area at stage n is (3/4)ⁿ — a GP with ratio 3/4.'],
    ['n badhao → area → 0, count → ∞','EkGP girti ja rahi hai (area), doosri badhti ja rahi hai (count). Fractal ka jaadu!','As n grows, the count explodes while the area shrinks toward 0.']],
   ans:'Count = 3ⁿ · Area = (3/4)ⁿ square units'}
 ]},
 {set:'End-of-Chapter Exercises',qs:[
  {q:'Find the 31st term of an AP whose 11th term is 38 and 16th term is 73.',
   why:'Do terms diye, doosra term chahiye — classic exam question. d nikalna hi asli game hai.',
   steps:[
    ['Equations: a + 10d = 38, a + 15d = 73','t11 = a+10d, t16 = a+15d — dono equations likho.','t11 = a + 10d = 38 and t16 = a + 15d = 73.'],
    ['Subtract: 5d = 35 → d = 7','Doosri minus pehli: 5d = 35 → d = 7 (common difference).','Subtracting gives 5d = 35, so d = 7.'],
    ['a = 38 − 70 = −32','a + 10(7) = 38 → a = −32.','Then a = 38 − 70 = −32.'],
    ['t31 = a + 30d = −32 + 210 = 178','31st term ke liye 30 jumps: −32 + 30×7 = 178.','t31 = −32 + 210 = 178.']],
   ans:'t31 = 178 (a = −32, d = 7)'},
  {q:'Determine the AP whose third term is 16 and whose 7th term exceeds the 5th term by 12.',
   why:'"t7 exceeds t5 by 12" ka matlab seedha hai: 2d = 12. Translate karne ki aadat daalo — aadhe questions yahin khatam ho jaate hain.',
   steps:[
    ['Translate: t7 − t5 = 12 → (a+6d) − (a+4d) = 12','Dono expand karo — a cancel! 2d = 12.','t7 − t5 = 2d = 12, so d = 6.'],
    ['d = 6 → a + 2d = 16 → a = 4','t3 = a + 2d = 16 → a = 16 − 12 = 4.','From t3 = 16: a + 12 = 16, so a = 4.'],
    ['AP: 4, 10, 16, 22, …','General: a + (n−1)d = 4 + (n−1)6 = 6n − 2.','The AP is 4, 10, 16, 22, … (tn = 6n − 2).']],
   ans:'AP: 4, 10, 16, 22, … (a = 4, d = 6)'},
  {q:'How many three-digit numbers are divisible by 7?',
   why:'"Counting multiples" = AP ka length nikalna. Divisibility, seating, scheduling — counting with steps yahi hai.',
   steps:[
    ['Smallest 3-digit multiple of 7: 105 (7×15)','100 ÷ 7 = 14.28… → aage ka multiple 7×15 = 105.','The smallest is 105.'],
    ['Largest: 994 (7×142)','999 ÷ 7 = 142.7… → 7×142 = 994.','The largest is 994.'],
    ['AP: 105, 112, …, 994 with d = 7 → n = ?','tn = a + (n−1)d: 994 = 105 + (n−1)7.','Solve 994 = 105 + (n−1)(7).'],
    ['(n−1) = 889/7 = 127 → n = 128','889 ÷ 7 = 127 → n = 128 numbers.','n = (994−105)/7 + 1 = 128.']],
   ans:'128 three-digit numbers are divisible by 7'},
  {q:'How many multiples of 4 lie between 10 and 250?',
   why:'"Between" me dono ends EXCLUDE hote hain (10 aur 250 khud multiples nahi hain anyway). Boundary cases ka dhyan — yahi exam trap hai.',
   steps:[
    ['First multiple > 10: 12','10 ke baad pehla 4-multiple = 12.','The first multiple is 12.'],
    ['Last multiple < 250: 248','250 ÷ 4 = 62.5 → 4×62 = 248.','The last is 248.'],
    ['n = (248 − 12)/4 + 1 = 236/4 + 1 = 59 + 1 = 60','Formula: count = (last − first)/d + 1. Yahan 60.','There are 60 multiples of 4.']],
   ans:'60'},
  {q:'The number of bacteria in a culture doubles every hour. If there are 30 bacteria originally, how many at the end of the 2nd, 4th and nth hour?',
   why:'Population growth, viral reels, compound interest — doubling = r = 2 wala GP. Biology + maths combo!',
   steps:[
    ['Counts: 30, 60, 120, … — GP with r = 2','Har ghante ×2. a = 30.','The bacteria count forms a GP: 30·2ⁿ after n hours.'],
    ['2nd hour: 30 × 2² = 120','Do doublings: ×4 → 120.','After 2 hours: 30·2² = 120.'],
    ['4th hour: 30 × 2⁴ = 480','Chaar doublings: ×16 → 480.','After 4 hours: 30·2⁴ = 480.'],
    ['nth hour: 30 × 2ⁿ','General rule: 2ⁿ growth factor. nth hour pe 30·2ⁿ.','After n hours: 30·2ⁿ.']],
   ans:'2 h → 120 · 4 h → 480 · n h → 30·2ⁿ'}
 ]}
]};
</script>
