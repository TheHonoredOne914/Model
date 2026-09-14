# -*- coding: utf-8 -*-
"""Chapter 6 extra bank H1: Q71-95 (18 Basic + 7 Moderate), perimeter & area."""

CH6_H1 = [
("q", {"n": 71, "level": "Basic", "concept": "Rectangle perimeter/area (T1)",
 "stem": "A rectangular field is 85 m long and 60 m wide. Find (i) its perimeter, (ii) its area in m<super>2</super> and in hectares.",
 "steps": [
  "(i) Perimeter = 2(85 + 60) = 2 × 145 = 290 m.",
  "(ii) Area = 85 × 60 = 5100 m<super>2</super>.",
  "1 hectare = 10000 m<super>2</super> -> 5100 m<super>2</super> = 0.51 hectare.",
 ],
 "why": ["Perimeter wraps twice around (length + width); hectares convert by dividing by 10000."],
 "hinglish": "Perimeter = 2(l + b), area = l × b. Hectare = 10000 m² ka paisa - 5100 ÷ 10000 = 0.51. Units ka conversion exam ka bonus point hai.",
 "answer": "(i) 290 m  (ii) 5100 m<super>2</super> = 0.51 hectare"}),

("q", {"n": 72, "level": "Basic", "concept": "Triangle base-height (T1)",
 "stem": "(i) A triangle has base 18 cm and height 11 cm - find its area. (ii) Another triangle has base 22 cm and the SAME area - find its height.",
 "steps": [
  "(i) Area = ½ × 18 × 11 = 99 cm<super>2</super>.",
  "(ii) ½ × 22 × h = 99 -> 11h = 99 -> h = 9 cm.",
 ],
 "why": ["Doubling the base halves the needed height for the same area - area is the product held constant."],
 "hinglish": "½ × base × height. Same area, bada base -> chhota height: 18→22 base par height 11→9. See-saw balance samjho.",
 "answer": "(i) 99 cm<super>2</super>  (ii) 9 cm"}),

("q", {"n": 73, "level": "Basic", "concept": "Circumference and area (T6)",
 "stem": "For a circle of radius 10.5 cm, find (i) the circumference and (ii) the area. (Use π = 22/7.)",
 "steps": [
  "(i) C = 2πr = 2 × (22/7) × 10.5 = 2 × 22 × 1.5 = 66 cm.",
  "(ii) A = πr<super>2</super> = (22/7) × 110.25 = 22 × 15.75 = 346.5 cm<super>2</super>.",
 ],
 "why": ["Radius 10.5 = 21/2 is designed for 22/7: the 7s cancel cleanly."],
 "hinglish": "10.5 = 21/2 dekha? 22/7 ke saath perfect jodi! C = 66, A = 346.5. π ka value radius ke denominator se match karo.",
 "answer": "(i) 66 cm  (ii) 346.5 cm<super>2</super>"}),

("q", {"n": 74, "level": "Basic", "concept": "Reverse circle (T6)",
 "stem": "The circumference of a circular plate is 132 cm. Find (i) its radius and (ii) its area.",
 "steps": [
  "(i) 2πr = 132 -> 2 × (22/7) × r = 132 -> r = 132 × 7/44 = 21 cm.",
  "(ii) A = (22/7) × 21<super>2</super> = 22 × 63 = 1386 cm<super>2</super>.",
 ],
 "why": ["Circumference fixes the radius; the area then follows - reverse chain in two steps."],
 "hinglish": "C se r nikalo: 132 × 7/44 = 21. Phir area: 22/7 × 441 = 1386. Reverse questions mein pehle r, baaki sab baad mein.",
 "answer": "(i) 21 cm  (ii) 1386 cm<super>2</super>"}),

("q", {"n": 75, "level": "Basic", "concept": "Equilateral shortcut (T3)",
 "stem": "Find the perimeter and area of an equilateral triangle of side 12 cm (√3 ≈ 1.73).",
 "steps": [
  "Perimeter = 3 × 12 = 36 cm.",
  "Area = (√3/4)a<super>2</super> = (1.73/4) × 144 = 1.73 × 36 = 62.28 cm<super>2</super> (exactly 36√3).",
 ],
 "why": ["Equilateral = one formula, no Heron: (√3/4)a² comes from the fixed 60° angles."],
 "hinglish": "Teeno side barabar -> seedha (√3/4)a². 36√3 ≈ 62.28. Equilateral ke liye Heron ka koi kaam nahi - shortcut ready hai.",
 "answer": "Perimeter 36 cm; area 36√3 ≈ 62.28 cm<super>2</super>"}),

("q", {"n": 76, "level": "Basic", "concept": "Heron direct (T2)",
 "stem": "Find the area of a triangle with sides 5 cm, 12 cm, 13 cm - first by Heron's formula, then by a faster method.",
 "steps": [
  "s = (5 + 12 + 13)/2 = 15.",
  "Heron: A = √(15 × 10 × 3 × 2) = √900 = 30 cm<super>2</super>.",
  "Faster: 5<super>2</super> + 12<super>2</super> = 25 + 144 = 169 = 13<super>2</super> -> right triangle! Area = ½ × 5 × 12 = 30 ✓.",
 ],
 "why": ["Check for Pythagorean triples FIRST - a right triangle skips Heron entirely (area = ½ leg × leg)."],
 "hinglish": "5-12-13 triple dikha? Seedha right triangle - ½ × legs. Heron se bhi 30 hi aata, par triple wala rasta 10 second ka hai. Pehle triple check karo!",
 "answer": "30 cm<super>2</super> (both ways)"}),

("q", {"n": 77, "level": "Basic", "concept": "Parallelogram and triangle (T1)",
 "stem": "A parallelogram has base 14 cm and height 6 cm. (i) Find its area. (ii) A triangle stands on the same base, between the same parallels - find its area.",
 "steps": [
  "(i) Area = base × height = 14 × 6 = 84 cm<super>2</super>.",
  "(ii) The triangle has the same base and height: area = ½ × 14 × 6 = 42 cm<super>2</super> - exactly half.",
 ],
 "why": ["Parallelogram = base × height; any triangle on the same base and height is half of it."],
 "hinglish": "Parallelogram = b × h. Same base, same height ka triangle = aadha = 42. 'Same parallels' ka matlab hi yahi hai.",
 "answer": "(i) 84 cm<super>2</super>  (ii) 42 cm<super>2</super>"}),

("q", {"n": 78, "level": "Basic", "concept": "Trapezium area (T1)",
 "stem": "A trapezium has parallel sides 15 cm and 9 cm, and the distance between them is 8 cm. Find its area.",
 "steps": [
  "A = ½ × (sum of parallel sides) × height.",
  "= ½ × (15 + 9) × 8 = ½ × 24 × 8 = 96 cm<super>2</super>.",
 ],
 "why": ["A trapezium is the average of its parallel sides stretched along the height."],
 "hinglish": "½ × (15 + 9) × 8 = 96. Parallel sides ka average × height - bas yehi formula hai.",
 "answer": "96 cm<super>2</super>"}),

("q", {"n": 79, "level": "Basic", "concept": "Arc and sector (T7)",
 "stem": "For a circle of radius 12 cm, find (i) the length of an arc subtending 60° at the centre and (ii) the area of that sector. (π = 22/7.)",
 "steps": [
  "(i) Arc = (θ/360) × 2πr = (60/360) × 2 × (22/7) × 12 = (1/6) × (528/7) = 88/7 ≈ 12.57 cm.",
  "(ii) Sector = (θ/360) × πr<super>2</super> = (1/6) × (22/7) × 144 = 528/7 ≈ 75.43 cm<super>2</super>.",
 ],
 "why": ["Sector and arc are both fractions of the full circle: θ/360 of circumference or area."],
 "hinglish": "60° = chhatha hissa. Poore circle ke 1/6th value dono jagah: arc 88/7, sector 528/7. Fraction nikaalo, multiply karo.",
 "answer": "(i) 88/7 ≈ 12.57 cm  (ii) 528/7 ≈ 75.43 cm<super>2</super>"}),

("q", {"n": 80, "level": "Basic", "concept": "Ring area (T9)",
 "stem": "Two concentric circles have radii 14 cm and 7 cm. Find the area of the ring between them.",
 "steps": [
  "Ring = πR<super>2</super> - πr<super>2</super> = π(R<super>2</super> - r<super>2</super>) = π(R + r)(R - r).",
  "= (22/7) × (14 + 7)(14 - 7) = (22/7) × 21 × 7.",
  "= 22 × 21 = 462 cm<super>2</super>.",
 ],
 "why": ["π(R + r)(R − r) factors the difference of squares - fewer big multiplications."],
 "hinglish": "Ring = π(R² - r²) = π(R+r)(R-r). 21 × 7 × 22/7 = 462. Factored form se calculation halki hoti hai.",
 "answer": "462 cm<super>2</super>"}),

("q", {"n": 81, "level": "Basic", "concept": "Square and diagonal (T1)",
 "stem": "The perimeter of a square is 40 cm. Find (i) its side, (ii) its area, (iii) its diagonal.",
 "steps": [
  "(i) Side = 40/4 = 10 cm.",
  "(ii) Area = 10<super>2</super> = 100 cm<super>2</super>.",
  "(iii) Diagonal = side√2 = 10√2 ≈ 14.14 cm.",
 ],
 "why": ["Perimeter → side → area → diagonal is the square's assembly line."],
 "hinglish": "Perimeter ÷ 4 = side 10. Area 100. Diagonal 10√2. Square ki assembly line ek hi order mein chalti hai.",
 "answer": "(i) 10 cm  (ii) 100 cm<super>2</super>  (iii) 10√2 ≈ 14.14 cm"}),

("q", {"n": 82, "level": "Basic", "concept": "Isosceles via Heron (T2/T3)",
 "stem": "An isosceles triangle has perimeter 32 cm with equal sides of 11 cm each. Find its area.",
 "steps": [
  "Base = 32 - 22 = 10 cm.",
  "Height: drop from apex, splits base into 5 and 5: h = √(11<super>2</super> - 5<super>2</super>) = √(121 - 25) = √96 = 4√6.",
  "Area = ½ × 10 × 4√6 = 20√6 ≈ 48.99 cm<super>2</super>.",
 ],
 "why": ["In an isosceles triangle the altitude bisects the base - Pythagoras then gives the height."],
 "hinglish": "Base 10 nikla. Altitude base ko 5-5 mein kaat-ti hai (isosceles ka gift). h = √96 = 4√6. Area 20√6 ≈ 49.",
 "answer": "20√6 ≈ 48.99 cm<super>2</super>"}),

("q", {"n": 83, "level": "Basic", "concept": "Wheel revolutions (T13)",
 "stem": "A wheel of diameter 84 cm makes 250 complete revolutions. How far does it travel?",
 "steps": [
  "Circumference = πd = (22/7) × 84 = 264 cm per revolution.",
  "Distance = 250 × 264 = 66000 cm = 660 m.",
 ],
 "why": ["One revolution = one circumference of rolling; distance = revolutions × πd."],
 "hinglish": "Ek chakkar = 264 cm. 250 chakkar = 660 m. Wheel ke questions mein diameter se circumference, phir multiply.",
 "answer": "660 m"}),

("q", {"n": 84, "level": "Basic", "concept": "Semicircle metrics (T6)",
 "stem": "Find the perimeter and area of a semicircle of radius 7 cm. (π = 22/7.)",
 "steps": [
  "Area = ½ × (22/7) × 49 = 77 cm<super>2</super>.",
  "Perimeter = half circumference + diameter = (22/7) × 7 + 14 = 22 + 14 = 36 cm.",
 ],
 "why": ["A semicircle's boundary has TWO pieces: the curved arc AND the straight diameter - forgetting the 2r is the classic error."],
 "hinglish": "Area aadha circle = 77. Par perimeter mein arc + diameter dono: 22 + 14 = 36. Sirf 22 likhna sabse common galti hai - diameter bhool jaate hain!",
 "answer": "Area 77 cm<super>2</super>; perimeter 36 cm"}),

("q", {"n": 85, "level": "Basic", "concept": "Rhombus from diagonals (T1)",
 "stem": "A rhombus has diagonals 16 cm and 12 cm. Find (i) its area, (ii) the length of each side, (iii) its perimeter.",
 "steps": [
  "(i) Area = ½ × d<sub>1</sub> × d<sub>2</sub> = ½ × 16 × 12 = 96 cm<super>2</super>.",
  "(ii) Diagonals bisect at right angles: half-diagonals 8 and 6 -> side = √(64 + 36) = 10 cm.",
  "(iii) Perimeter = 4 × 10 = 40 cm.",
 ],
 "why": ["The 8-6-10 triple hides inside the rhombus - diagonals' halves are the legs of the side triangle."],
 "hinglish": "Area ½ d₁d₂ = 96. Side ke liye aadhe diagonals: 8-6-10 triple! Perimeter 40. Rhombus ke andar Pythagoras chhupa hota hai.",
 "answer": "(i) 96 cm<super>2</super>  (ii) 10 cm  (iii) 40 cm"}),

("q", {"n": 86, "level": "Basic", "concept": "Reverse equilateral (T3)",
 "stem": "An equilateral triangle has height 6√3 cm. Find its side and area.",
 "steps": [
  "Height = (√3/2)a -> 6√3 = (√3/2)a -> a = 12 cm.",
  "Area = (√3/4) × 144 = 36√3 ≈ 62.35 cm<super>2</super>.",
 ],
 "why": ["Height and side are locked by the fixed ratio √3 : 2 in every equilateral triangle."],
 "hinglish": "Height se side: 6√3 ÷ (√3/2) = 12. √3 cancel ho gaya - clean! Phir area 36√3. Reverse mein bhi wahi ratio.",
 "answer": "Side 12 cm; area 36√3 ≈ 62.35 cm<super>2</super>"}),

("q", {"n": 87, "level": "Basic", "concept": "Sector perimeter (T7)",
 "stem": "Find the perimeter of a sector of radius 14 cm and angle 90°. (π = 22/7.)",
 "steps": [
  "Arc = (90/360) × 2 × (22/7) × 14 = (1/4) × 88 = 22 cm.",
  "Perimeter = arc + two radii = 22 + 14 + 14 = 50 cm.",
 ],
 "why": ["A sector's boundary = arc + BOTH radii - the two radii are the most-forgotten 28 cm in this chapter."],
 "hinglish": "Arc 22, par sector ki boundary mein do radius bhi: 22 + 28 = 50. Radii bhoolna sector-perimeter ki national galti hai.",
 "answer": "50 cm"}),

("q", {"n": 88, "level": "Basic", "concept": "Ratio sides with perimeter (T2/T12)",
 "stem": "The sides of a triangle are in the ratio 3 : 4 : 5 and its perimeter is 96 cm. Find the sides and the area.",
 "steps": [
  "Sides: 3x, 4x, 5x -> 12x = 96 -> x = 8. Sides: 24, 32, 40 cm.",
  "Check: 24<super>2</super> + 32<super>2</super> = 576 + 1024 = 1600 = 40<super>2</super> -> right triangle (3-4-5 scaled!).",
  "Area = ½ × 24 × 32 = 384 cm<super>2</super>.",
 ],
 "why": ["Ratio problems: total parts first; then the triple check may skip Heron entirely."],
 "hinglish": "12 parts = 96 -> x = 8. Sides 24-32-40 = 3-4-5 × 8 - right triangle! Area seedha ½ × 24 × 32 = 384. Ratio + triple = double gift.",
 "answer": "Sides 24, 32, 40 cm; area 384 cm<super>2</super>"}),

("q", {"n": 89, "level": "Moderate", "concept": "Heron classic (T2)",
 "stem": "Find the area of a triangle with sides 13 cm, 14 cm and 15 cm.",
 "steps": [
  "s = (13 + 14 + 15)/2 = 21.",
  "Differences: 21 - 13 = 8; 21 - 14 = 7; 21 - 15 = 6.",
  "A = √(21 × 8 × 7 × 6) = √(21 × 336) = √7056 = 84 cm<super>2</super>.",
 ],
 "why": ["The 13-14-15 triangle is the most famous Heron showcase - its area is a whole number, 84."],
 "hinglish": "s = 21, differences 8-7-6. 21 × 8 × 7 × 6 = 7056, root = 84. Ye triangle yaad kar lo - exam ka permanent guest hai.",
 "answer": "84 cm<super>2</super>"}),

("q", {"n": 90, "level": "Moderate", "concept": "Quadrilateral via diagonal (T4)",
 "stem": "In quadrilateral ABCD, diagonal AC = 26 cm. The perpendiculars from B and D to AC measure 11 cm and 9 cm respectively (on opposite sides). Find the area of ABCD.",
 "steps": [
  "Split along AC into two triangles sharing base AC = 26.",
  "Area(ABC) = ½ × 26 × 11 = 143 cm<super>2</super>.",
  "Area(ADC) = ½ × 26 × 9 = 117 cm<super>2</super>.",
  "Total = 143 + 117 = 260 cm<super>2</super>.",
 ],
 "why": ["Any quadrilateral = two triangles on one diagonal: A = ½ × d × (h₁ + h₂)."],
 "hinglish": "Diagonal ko base banao, dono heights jodo: ½ × 26 × (11 + 9) = 260. Quadrilateral ka universal split formula hai ye.",
 "answer": "260 cm<super>2</super>"}),

("q", {"n": 91, "level": "Moderate", "concept": "Brahmagupta (T5)",
 "stem": "A cyclic quadrilateral has sides 12 cm, 16 cm, 20 cm and 24 cm. Find its area using Brahmagupta's formula (√3 ≈ 1.73).",
 "steps": [
  "s = (12 + 16 + 20 + 24)/2 = 36.",
  "A = √((36-12)(36-16)(36-20)(36-24)) = √(24 × 20 × 16 × 12).",
  "24 × 20 = 480; 16 × 12 = 192; product = 92160 = 9216 × 10.",
  "A = √9216 × √10 = 96√10 ≈ 96 × 3.16 = 303.4 cm<super>2</super> (√10 ≈ 3.162).",
 ],
 "why": ["Brahmagupta = Heron's cousin for cyclic quadrilaterals: √((s−a)(s−b)(s−c)(s−d)) with all four differences."],
 "hinglish": "s = 36, chaaron differences 24-20-16-12. 92160 = 9216 × 10 -> 96√10 ≈ 303.4. Square factor bahar nikalna hi yahan ka skill hai.",
 "answer": "96√10 ≈ 303.4 cm<super>2</super>"}),

("q", {"n": 92, "level": "Moderate", "concept": "Reverse from area (T6)",
 "stem": "The area of a circle is 616 cm<super>2</super>. Find (i) its radius and (ii) its circumference. (π = 22/7.)",
 "steps": [
  "(i) πr<super>2</super> = 616 -> r<super>2</super> = 616 × 7/22 = 196 -> r = 14 cm.",
  "(ii) C = 2πr = 2 × (22/7) × 14 = 88 cm.",
 ],
 "why": ["Area → radius → circumference: the reverse pipeline through r² = 196."],
 "hinglish": "616 × 7/22 = 196 = 14². r = 14, phir C = 88. Reverse questions mein r² nikaalna hi sab kuch hai.",
 "answer": "(i) 14 cm  (ii) 88 cm"}),

("q", {"n": 93, "level": "Moderate", "concept": "Outside circular path (T10)",
 "stem": "A circular park of radius 35 m is surrounded by a 7 m wide circular path. Find the area of the path. (π = 22/7.)",
 "steps": [
  "Outer radius R = 35 + 7 = 42 m; inner r = 35 m.",
  "Path area = π(R<super>2</super> - r<super>2</super>) = (22/7)(42<super>2</super> - 35<super>2</super>).",
  "= (22/7)(1764 - 1225) = (22/7)(539) = 22 × 77 = 1694 m<super>2</super>.",
 ],
 "why": ["A path outside adds to the radius: R = r + width, then the ring formula."],
 "hinglish": "R = 35 + 7 = 42. Ring formula: 539 × 22/7 = 1694. Path ke questions mein pehle R-r decide karo, phir ring.",
 "answer": "1694 m<super>2</super>"}),

("q", {"n": 94, "level": "Moderate", "concept": "Wire re-bending (T12)",
 "stem": "A wire of length 176 cm is bent first into a circle and then into a square. Which shape encloses more area, and by how much? (π = 22/7.)",
 "steps": [
  "Circle: 2πr = 176 -> r = 28. Area = (22/7)(784) = 2464 cm<super>2</super>.",
  "Square: side = 176/4 = 44. Area = 44<super>2</super> = 1936 cm<super>2</super>.",
  "Circle wins by 2464 - 1936 = 528 cm<super>2</super>.",
 ],
 "why": ["For a FIXED perimeter, the circle always beats the square - this comparison is the chapter's headline theorem."],
 "hinglish": "Same wire, do shapes: circle 2464, square 1936. Circle jeeta by 528. Fixed perimeter par circle hamesha maximum area deta hai - golden rule!",
 "answer": "Circle encloses more: 2464 vs 1936, by 528 cm<super>2</super>"}),

("q", {"n": 95, "level": "Moderate", "concept": "Segment area (T8)",
 "stem": "Find the area of the minor segment of a circle of radius 14 cm cut off by a 90° central angle. (π = 22/7.)",
 "steps": [
  "Sector (90°) = (1/4) × (22/7) × 14<super>2</super> = (1/4) × 616 = 154 cm<super>2</super>.",
  "Triangle (two radii at 90°): legs 14, 14 -> area = ½ × 14 × 14 = 98 cm<super>2</super>.",
  "Segment = sector - triangle = 154 - 98 = 56 cm<super>2</super>.",
 ],
 "why": ["Segment = sector − triangle: the chord's triangle is the piece you subtract."],
 "hinglish": "Sector 154, triangle 98 (right angle tha!). Segment = 56. Sector minus triangle - bas yehi recipe hai.",
 "answer": "56 cm<super>2</super>"}),
]
