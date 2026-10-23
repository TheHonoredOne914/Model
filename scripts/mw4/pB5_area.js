<script>
'use strict';
/* ============================================================
   BOOK ZONE DATA · part 5 — Area Arsenal (Book Ch 6: Perimeter & Area)
   ============================================================ */
window.BOOKZ=window.BOOKZ||{};
BOOKZ.area={
 src:'Ganita Manjari · Grade 9 · Part I — Book Ch 6 (Measuring Space: Perimeter and Area)',
 sets:[
 {set:'Exercise Set 6.1 — Circles: Perimeter & Arcs',qs:[
  {q:'Calculate the length of the arc: (i) r = 3.5 cm, angle 60° (ii) r = 6.3 m, angle 120°',
   why:'Pizza slice ka crust, race track ka curve, clock ki sui ka rasta — arc length har jagah hai. Full circle ka fraction lo!',
   steps:[
    ['Arc = (angle/360) × full circumference','60° matlab poore circle ka 60/360 = 1/6 hissa. Fraction of circumference — bas yehi idea hai.','Arc length = (θ/360) × 2πr — take the fraction of the whole circle.'],
    ['(i) (60/360) × 2 × (22/7) × 3.5','2 × 22/7 × 3.5 = 22. Ek-sixth of 22 = 22/6 = 11/3 ≈ 3.67 cm.','(i) (1/6) × 2 × (22/7) × 3.5 = 22/6 ≈ 3.67 cm.'],
    ['(ii) (120/360) × 2 × (22/7) × 6.3','2 × 22/7 × 6.3 = 39.6. One-third: 39.6/3 = 13.2 m.','(ii) (1/3) × 2 × (22/7) × 6.3 = 39.6/3 = 13.2 m.']],
   ans:'(i) 11/3 ≈ 3.67 cm · (ii) 13.2 m'}
 ]},
 {set:'Exercise Set 6.2 — Heron\'s Formula & Quadrilaterals',qs:[
  {q:'The parallel sides of a trapezium are 40 cm and 20 cm. Its non-parallel sides are equal, each 26 cm. Find the area.',
   why:'Isosceles trapezium = bridge cross-section, dam wall, roof truss. Height khud nikalni padti hai — yahi asli skill hai.',
   steps:[
    ['Drop heights → the base sticks out by (40−20)/2 = 10 each side','Symmetric shape: dono taraf equal overhang. 40 − 20 = 20, half-half = 10 cm each side.','By symmetry, each end sticks out (40−20)/2 = 10 cm.'],
    ['Height: √(26² − 10²) = √576 = 24','Slant side 26 = hypotenuse, horizontal leg 10 → vertical leg (height) = √(676−100) = √576 = 24 cm.','Height = √(26² − 10²) = 24 cm.'],
    ['Area = ½ × (sum of parallel sides) × height','½ × (40 + 20) × 24 = ½ × 60 × 24 = 720.','Area = ½(a + b)h = ½(60)(24).'],
    ['Area = 720 cm²','Done — trapezium ke liye Heron nahi, ye direct formula best.','The trapezium\'s area is 720 cm².']],
   ans:'720 cm²'},
  {q:'One diagonal of a rhombus is twice the other. The area is 128 cm². Find the length of the shorter diagonal.',
   why:'Kite, diamond tiles, sarpanch ka khets — rhombus ka area diagonals se hi nikalta hai: ½ d₁d₂.',
   steps:[
    ['Rhombus area = ½ × d₁ × d₂','Diagonals perpendicular hote hain — 4 right triangles ban jaate hain. Formula: ½ d₁d₂.','For a rhombus, Area = ½ d₁ d₂ (diagonals are perpendicular).'],
    ['Let shorter = d, longer = 2d → ½ × d × 2d = d²','Substitute: ½ × d × 2d = d². Area = d² = 128.','Let the shorter diagonal be d: Area = d² = 128.'],
    ['d = √128 = 8√2 ≈ 11.3 cm','√128 = √(64×2) = 8√2. Shorter diagonal = 8√2 cm.','d = √128 = 8√2 ≈ 11.3 cm.']],
   ans:'Shorter diagonal = 8√2 ≈ 11.3 cm'}
 ]},
 {set:'Exercise Set 6.3 — Sectors & Real Life',qs:[
  {q:'The length of the minute hand of a clock is 7 cm. Find the area swept by it in 10 minutes.',
   why:'Clock ki sui ek sector sweep karti hai — wiper, sprinkler, radar sab isi me. 10 min = kitne degrees? Wahi asli sawaal.',
   steps:[
    ['10 minutes = 60° sweep (60 min = 360°)','Minute hand 60 min me 360° → per minute 6°. 10 min → 60°.','In 10 minutes the hand sweeps 60° (6° per minute).'],
    ['Sector area = (θ/360) × πr²','Poora circle = π × 7² = 154 cm² (π = 22/7). One-sixth of it: 154/6 ≈ 25.67 cm².','Sector = (60/360) × π × 49 = 154/6 ≈ 25.67 cm².'],
    ['Answer ≈ 25.67 cm² (77/3 exactly with π = 22/7)','154/6 = 77/3 ≈ 25.67.','Area swept ≈ 25.67 cm².']],
   ans:'≈ 25.67 cm²'},
  {q:'A car has two non-overlapping wipers; each blade is 28 cm long and sweeps 120°. Find the total area cleaned per sweep.',
   why:'Wiper design literally isi calculation pe banta hai — windshield coverage percentage nikalna company ka kaam hai!',
   steps:[
    ['One wiper = sector of radius 28, angle 120°','Blade ki length = radius, sweep = sector angle.','Each wiper sweeps a 120° sector of radius 28 cm.'],
    ['One sector = (120/360) × (22/7) × 28²','One-third of full circle: (1/3) × (22/7) × 784. 784/7 = 112 → 22 × 112 = 2464 → /3 ≈ 821.33 cm².','One sector = (1/3) × (22/7) × 784 = 2464/3 ≈ 821.33 cm².'],
    ['Two wipers → × 2 = 4928/3 ≈ 1642.67 cm²','Dono same size, no overlap → seedha double: 2 × 2464/3 = 4928/3 ≈ 1642.67 cm².','Total = 2 × 2464/3 = 4928/3 ≈ 1642.67 cm².']],
   ans:'4928/3 ≈ 1642.67 cm²'}
 ]},
 {set:'End-of-Chapter Exercises',qs:[
  {q:'An isosceles triangle has perimeter 40 cm; the equal sides are 15 cm each. Find its area.',
   why:'Pankha blade, rooftop tent, park design — isosceles ka area chahiye toh pehle base nikalo, phir height ya Heron.',
   steps:[
    ['Base = 40 − 15 − 15 = 10 cm','Perimeter se base katega: 40 − 30 = 10 cm. Sides: 15, 15, 10.','The base is 40 − 30 = 10 cm.'],
    ['Height: split the base → 5 and 5; h = √(15² − 5²) = √200 = 10√2','Apex se height base ko bisect karti hai (isosceles). Right triangle: 5, h, 15 → h = √(225−25) = √200 = 10√2 ≈ 14.14.','Height = √(15² − 5²) = 10√2 ≈ 14.14 cm.'],
    ['Area = ½ × 10 × 10√2 = 50√2 ≈ 70.7 cm²','½ × base × height = ½ × 10 × 10√2 = 50√2.','Area = 50√2 ≈ 70.7 cm².'],
    ['(Heron se bhi same: s = 20, √(20·5·5·10) = √5000 = 50√2 ✓)','Dono raste ek jawab — formulas cross-check karne ka maza.','Heron: s = 20, Area = √(20·5·5·10) = 50√2 ✓ — both methods agree.']],
   ans:'50√2 ≈ 70.7 cm²'},
  {q:'The area of a right-angled triangle is 54 cm². One leg is 12 cm. Find its perimeter.',
   why:'Reverse Heron+Pythagoras combo: area se leg, phir hypotenuse, phir perimeter. Ladder climb karna seekho.',
   steps:[
    ['Area = ½ × leg1 × leg2 → 54 = ½ × 12 × b','Right triangle me dono legs perpendicular — direct area formula. 54 = 6b.','For a right triangle, Area = ½ × product of legs.'],
    ['b = 9 cm','54 ÷ 6 = 9. Doosri leg 9 cm.','The other leg is 9 cm.'],
    ['Hypotenuse = √(9² + 12²) = √225 = 15','9-12-15 = 3× (3-4-5) — famous triple!','Hypotenuse = √(81 + 144) = 15 cm (the 9-12-15 triple).'],
    ['Perimeter = 9 + 12 + 15 = 36 cm','Teen sides jodo: 36 cm.','Perimeter = 36 cm.']],
   ans:'36 cm (legs 9 & 12, hypotenuse 15)'},
  {q:'The sides of a triangle are in the ratio 2:3:4 and its perimeter is 45 cm. Find its area.',
   why:'Ratio questions me "x ka magic" — ratio ko actual numbers me convert karna hi aadha solution hai.',
   steps:[
    ['Sides = 2x, 3x, 4x → 9x = 45 → x = 5','Sum = 2x+3x+4x = 9x = 45 → x = 5. Sides: 10, 15, 20.','Let sides be 2x, 3x, 4x. Then 9x = 45, x = 5 → sides 10, 15, 20.'],
    ['s = 45/2 = 22.5','Heron ka s = half perimeter = 22.5.','Semi-perimeter s = 22.5.'],
    ['s−a = 12.5, s−b = 7.5, s−c = 2.5','Teen differences: 22.5−10 = 12.5; 22.5−15 = 7.5; 22.5−20 = 2.5.','Differences: 12.5, 7.5, 2.5.'],
    ['Area = √(22.5 × 12.5 × 7.5 × 2.5) = √5273.44 ≈ 72.6 cm²','Product = 5273.4375. Root ≈ 72.62. (Exact: (225√843.75)/... decimal is fine.)','Area ≈ 72.6 cm².']],
   ans:'Sides 10, 15, 20 · Area ≈ 72.6 cm²'},
  {q:'The sides of a triangle are 7, 24, 25. Find its area in TWO different ways.',
   why:'Ek triangle, do raste — Heron aur direct. Jab dono same answer dete hain, confidence double ho jaata hai. (7-24-25 ek Pythagorean triple hai!)',
   steps:[
    ['Spot it: 7² + 24² = 49 + 576 = 625 = 25²','7-24-25 ek right triangle hai! Right angle 7 aur 24 ke beech.','Check: 7² + 24² = 625 = 25² → right-angled at the corner of sides 7 and 24.'],
    ['Way 1 (direct): Area = ½ × 7 × 24 = 84','Legs perpendicular → direct formula. ½ × 168 = 84 cm².','Way 1: Area = ½ × 7 × 24 = 84 cm².'],
    ['Way 2 (Heron): s = 28 → √(28·21·4·3) = √7056 = 84','s = 56/2 = 28. Differences: 21, 4, 3. Product 28×21 = 588; 4×3 = 12; 588×12 = 7056. √7056 = 84 ✓','Way 2: s = 28, Area = √(28·21·4·3) = √7056 = 84 cm².'],
    ['Same answer, dono tareeke = 84 cm²','Cross-verification successful. Aisa check exam me bhi kar sakte ho!','Both methods agree: Area = 84 cm².']],
   ans:'84 cm² (both by ½×7×24 and by Heron)'},
  {q:'A bicycle wheel has diameter 60 cm. How far does the cyclist travel after the wheel rotates 100 times?',
   why:'Odometer, smartwatch cycling mode, ferris wheel — "kitne rotation = kitni doori" sab isi pe hai.',
   steps:[
    ['One rotation = one circumference','Wheel ek baar ghoomti hai toh ground pe circumference jitna rasta jaati hai.','Each rotation covers one circumference.'],
    ['Circumference = πd = (22/7) × 0.6 m ≈ 1.885 m','Diameter 60 cm = 0.6 m. π × 0.6 = 22/7 × 0.6 = 13.2/7 ≈ 1.886 m.','Circumference = (22/7) × 0.6 ≈ 1.886 m.'],
    ['100 rotations → 100 × 1.886 ≈ 188.6 m (exactly 60π m)','100 × 13.2/7 = 1320/7 ≈ 188.57 m — exact 60π.','Distance = 100π(0.6) = 60π ≈ 188.5 m.']],
   ans:'60π ≈ 188.5 m'}
 ]}
]};
</script>
