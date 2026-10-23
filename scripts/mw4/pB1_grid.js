<script>
'use strict';
/* ============================================================
   BOOK ZONE DATA · part 1 — Grid Guardians (Book Ch 1: Coordinates)
   Ganita Manjari Grade 9 · real exercise questions, solved
   step-by-step with Hinglish + English Ask explanations.
   ============================================================ */
window.BOOKZ=window.BOOKZ||{};
BOOKZ.grid={
 src:'Ganita Manjari · Grade 9 · Part I — Book Ch 1 (Orienting Yourself: The Use of Coordinates)',
 sets:[
 {set:'End-of-Chapter Exercises',qs:[
  {q:'What are the x-coordinate and y-coordinate of the point of intersection of the two axes?',
   why:'GPS, chess boards, game maps — sab ka "zero point" yahi concept hai. Axes ka intersection hi poore system ka address 0 hai.',
   steps:[
    ['The two axes are the x-axis and the y-axis.','x-axis horizontal line hai, y-axis vertical — dono ek dusre ko jahan kaatte hain, wahi intersection point hai.','The x-axis (horizontal) and the y-axis (vertical) cross each other at exactly one point — that point is their intersection.'],
    ['That intersection point is called the origin.','Is point ka naam hai origin. Poore plane ka "home base" yahi hai — sab measurements yahi se count hoti hain.','This crossing point has a name: the origin. Every measurement in the plane starts counting from here.'],
    ['At the origin, distance from BOTH axes is 0','Origin se x-axis ki doori = 0, aur y-axis ki doori bhi = 0. x-coordinate y-axis se doori hai, y-coordinate x-axis se — dono 0.','At the origin, the distance from the y-axis is 0 (so x = 0) and the distance from the x-axis is also 0 (so y = 0).'],
    ['Answer: (0, 0)','Toh intersection point ke coordinates = (0, 0). Isi point ko O bhi likhte hain.','So the coordinates of the intersection are (0, 0) — the origin O.']],
   ans:'(0, 0) — the origin'},
  {q:'Point W has x-coordinate equal to −5. Can you predict the coordinates of point H which is on the line through W parallel to the y-axis? Which quadrants can H lie in?',
   why:'Metro lines socho: ek hi vertical line pe saare stations ka "east-west address" same hota hai. Yahi idea yahan chal raha hai.',
   steps:[
    ['A line parallel to the y-axis keeps x fixed','y-axis ke parallel line pe chalne wala HAR point utna hi door rehta hai y-axis se jitna W hai. y-axis se doori = x-coordinate. W ka x = −5, toh is poori line ka x = −5 hi rahega.','Every point on a line parallel to the y-axis stays the same distance from the y-axis. That distance IS the x-coordinate, so every such point has x = −5.'],
    ['So H = (−5, y) for some value of y','H usi line pe hai, isliye H = (−5, y) — y kuch bhi ho sakta hai. Sirf x pakka −5, y free.','So H must look like (−5, y) — the first number is locked at −5, while y can be anything.'],
    ['Sign of x is negative → left half of the plane','x = −5 negative hai matlab H y-axis ke LEFT side pe hai. Ab sirf y ka sign decide karega quadrant.','Because x = −5 is negative, H lives to the LEFT of the y-axis. Only the sign of y decides which quadrant.'],
    ['y > 0 → Quadrant II; y < 0 → Quadrant III','Agar y positive (upar) → Quadrant II. Agar y negative (neeche) → Quadrant III. (Aur agar y = 0 toh H bilkul x-axis pe baith jayega.)','If y > 0, H is in Quadrant II; if y < 0, in Quadrant III. If y = 0, H sits exactly on the x-axis.']],
   ans:'H = (−5, y); H can lie in Quadrant II (y > 0) or Quadrant III (y < 0)'},
  {q:'Consider the points R(3, 0), A(0, −2), M(−5, −2) and P(−5, 2), joined in the order R→A→M→P→R. Predict: (i) two sides perpendicular to each other, (ii) one side parallel to an axis, (iii) two points that are mirror images in one axis.',
   why:'Floor-plan drawing yehi hai: deewar seedhi hai (axis-parallel) ya corner right-angle hai — coordinates se predict karo, phir plot karke verify.',
   steps:[
    ['Compare coordinates pair by pair','Side RA: R(3,0)→A(0,−2). Side AM: A(0,−2)→M(−5,−2). Side MP: M(−5,−2)→P(−5,2). Side PR: P(−5,2)→R(3,0). Har side ke dono points ke x aur y alag-alag dekho.','Look at each side and compare the two endpoints: if y stays the same the side is horizontal; if x stays the same it is vertical.'],
    ['AM is horizontal (both y = −2), MP is vertical (both x = −5)','A aur M dono ka y = −2 → AM x-axis ke parallel seedhi line. M aur P dono ka x = −5 → MP y-axis ke parallel. Horizontal ⊥ vertical hota hai → AM aur MP perpendicular hain (right angle at M).','A(0,−2) and M(−5,−2) share y = −2, so AM is horizontal. M(−5,−2) and P(−5,2) share x = −5, so MP is vertical. Horizontal meets vertical at 90°, so AM ⊥ MP — (i) and (ii) both solved.'],
    ['Perpendicular sides: AM and MP; axis-parallel side: AM (∥ x-axis) or MP (∥ y-axis)','(i) AM ⊥ MP. (ii) AM x-axis ke parallel (ya MP y-axis ke parallel).','(i) AM and MP are perpendicular. (ii) AM is parallel to the x-axis (MP to the y-axis).'],
    ['Mirror test: flip the sign of y → reflection in the x-axis','x-axis me mirror image = y ka sign flip. M(−5,−2) → (−5, +2) = P milta hai! Toh M aur P ek dusre ke mirror images hain x-axis me. (iii) answer: M & P, axis = x-axis.','Reflecting in the x-axis changes the sign of y only. M(−5,−2) becomes (−5, 2), which is exactly P. So M and P are mirror images in the x-axis.'],
    ['Plot and verify','Ab charo points plot karo: RAMP ek tilted quadrilateral banta hai jiska corner M perfect right angle hai — prediction sahi!','Plot the four points: you get a quadrilateral with a perfect right angle at M — exactly as predicted.']],
   ans:'(i) AM ⊥ MP (right angle at M) · (ii) AM ∥ x-axis (MP ∥ y-axis) · (iii) M and P are mirror images in the x-axis'},
  {q:'In the triangle with A(3, 4), D(7, 1) and M(9, 6), find the lengths of the three sides AD, DM and MA (use the Baudhāyana–Pythagoras method).',
   why:'Kabhi kabhi Google Maps "crow-fly distance" deta hai — wo yahi formula hai. Baudhayana ne yeh 800+ saal pehle Pythagoras se pehle likha tha!',
   steps:[
    ['Shift along x: 7 − 3 = 4, shift along y: 1 − 4 = −3','A se D jaane ke liye x me 4 kadam aage, y me 3 kadam neeche. Ye dono shift ek right triangle ke legs banate hain, AD hypotenuse hai.','Moving from A to D: 4 units across and 3 units down. These shifts are the two legs of a right triangle whose hypotenuse is AD.'],
    ['AD = √(4² + 3²) = √(16 + 9) = √25 = 5','Baudhāyana–Pythagoras: legs ka square jodo, root lo. 4²+3² = 25, √25 = 5. AD = 5 units.','By the theorem: AD = √(4² + 3²) = √25 = 5 units. (Remember: sign of the shift does not matter because we square it.)'],
    ['DM: shifts are 9−7 = 2 and 6−1 = 5 → DM = √(2² + 5²) = √29','D se M: x me 2, y me 5. 4+25 = 29. 29 kisi perfect square ka root nahi → DM = √29 (≈5.39).','From D to M: 2 across, 5 up → DM = √(4 + 25) = √29 units, an irrational number.'],
    ['MA: shifts are 9−3 = 6 and 6−4 = 2 → MA = √(6² + 2²) = √40 = 2√10','M se A: x me 6, y me 2. 36+4 = 40. √40 = √(4×10) = 2√10 (≈6.32).','From M to A: 6 across, 2 up → MA = √40 = 2√10 units.']],
   ans:'AD = 5 · DM = √29 · MA = 2√10 (all in units)'},
  {q:'For each row of the table, state whether M is the midpoint of ST — S(−3,0), M(0,0), T(3,0); S(2,3), M(3,4), T(4,5); S(0,0), M(0,5), T(0,−10); S(−8,7), M(0,−2), T(6,−3). Then find the connection between the coordinates of M, S and T.',
   why:'Middle seat, halfway point, "tum dono ke beech me" — midpoint har jagah hai. Iska formula ab test karke khud discover karoge.',
   steps:[
    ['Row 1: S(−3,0), T(3,0) — M(0,0) is exactly halfway','SM = |0−(−3)| = 3, MT = |3−0| = 3. Barabar doori, aur M S aur T ke BEECH me hai → Yes, midpoint.','SM = 3 and MT = 3, and M lies between S and T → Yes, M is the midpoint.'],
    ['Row 2: S(2,3), T(4,5) — M(3,4) is halfway in BOTH x and y','SM = √(1²+1²)=√2, MT = √(1²+1²)=√2, equal → Yes. Dhyan do: x me 2→3→4 (steps of 1), y me 3→4→5 (steps of 1).','SM = MT = √2 and M sits between S and T → Yes. Notice x climbs 2→3→4 and y climbs 3→4→5 in equal steps.'],
    ['Row 3: S(0,0), T(0,−10) — M(0,5) is NOT between them','SM = 5, MT = |−10−5| = 15. Unequal, aur M T ke beech bhi nahi (T neeche hai, M upar) → No.','SM = 5 but MT = 15, and M is not between S and T → No, not the midpoint.'],
    ['Row 4: S(−8,7), T(6,−3) — check M(0,−2)','True midpoint would be: x = (−8+6)/2 = −1, y = (7−3)/2 = 2 → (−1, 2) ≠ (0,−2) → No. (SM = √(64+81)=√145, MT = √(36+1)=√37 — unequal too.)','The real midpoint of S and T is (−1, 2), not (0, −2) → No.'],
    ['The connection: M = ((x_S + x_T)/2, (y_S + y_T)/2)','Midpoint = dono coordinates ka AVERAGE. Ye row 1, 2 pe verify karo: (−3+3)/2 = 0 ✓, (2+4)/2 = 3 ✓. Ye formula ab hamesha kaam karega.','The midpoint takes the AVERAGE of the x-coordinates and the average of the y-coordinates: M = ((x₁+x₂)/2, (y₁+y₂)/2).']],
   ans:'Yes, Yes, No, No — and M = ((x_S+x_T)/2, (y_S+y_T)/2)'},
  {q:'Use the midpoint connection: find B(x, y) given that M(−7, 1) is the midpoint of A(3, −4) and B.',
   why:'Ulta question! End point aur mid point pata hai — dusra end point dhundo. Ye "reverse engineering" exam me bahut aati hai.',
   steps:[
    ['Write the midpoint equations with the unknown B(x, y)','Midpoint formula ulta lagao: (3 + x)/2 = −7 (x wali equation) aur (−4 + y)/2 = 1 (y wali equation). Do simple equations ban gayi.','Apply M = ((x_A + x_B)/2, (y_A + y_B)/2) with B unknown: (3+x)/2 = −7 and (−4+y)/2 = 1.'],
    ['Solve the x equation: 3 + x = −14 → x = −17','Dono sides × 2: 3 + x = −14. Dono sides − 3: x = −17.','Multiply both sides by 2: 3 + x = −14, then subtract 3: x = −17.'],
    ['Solve the y equation: −4 + y = 2 → y = 6','Dono sides × 2: −4 + y = 2. Dono sides + 4: y = 6.','Multiply by 2: −4 + y = 2, then add 4: y = 6.'],
    ['B = (−17, 6) — check it!','Verify: midpoint of A(3,−4) aur B(−17,6) = ((3−17)/2, (−4+6)/2) = (−14/2, 2/2) = (−7, 1) ✓ = M.','Check: ((3 + (−17))/2, ((−4) + 6)/2) = (−7, 1) = M ✓']],
   ans:'B = (−17, 6)'},
  {q:'Show that A(1, −8), B(−4, 7) and C(−7, −4) lie on a circle K whose centre is the origin O(0, 0). Find the radius of K. Then check whether D(−5, 6) and E(0, 9) lie within, on, or outside circle K.',
   why:'"Same centre se same doori" — yehi circle ki definition hai. Oyo rooms, cell towers coverage — sab "radius ke andar hai ya nahi" wala sawaal hai.',
   steps:[
    ['Circle rule: every point on it is the SAME distance from the centre','Circle ki definition: centre O ho toh circle pe har point ki OA-type doori = radius, sab points ke liye SAME. Toh check karna hai: OA, OB, OC barabar hain?','A circle with centre O is the set of all points at one fixed distance (the radius) from O. So we must show OA = OB = OC.'],
    ['OA = √(1² + (−8)²) = √65','A(1,−8): x me 1, y me 8 shift. 1 + 64 = 65.','OA = √(1² + 8²) = √65.'],
    ['OB = √((−4)² + 7²) = √65 and OC = √((−7)² + (−4)²) = √65','B(−4,7): 16 + 49 = 65. C(−7,−4): 49 + 16 = 65. Teeno √65! Sab centre se utni hi door → teeno circle K pe hain, radius = √65.','OB = √(16 + 49) = √65 and OC = √(49 + 16) = √65. All three distances are equal, so A, B, C all lie on circle K, and the radius is √65.'],
    ['D(−5, 6): OD = √(25 + 36) = √61 < √65 → INSIDE','√61 chhota hai √65 se (61 < 65), matlab D centre se thoda zyada paas hai → D circle ke ANDAR.','OD = √61 and 61 < 65, so D is closer to O than the radius → D lies inside K.'],
    ['E(0, 9): OE = √(0 + 81) = 9, and 9² = 81 > 65 → OUTSIDE','√65 ≈ 8.06 aur 9 > 8.06 → E centre se zyada door → E circle ke BAHAR.','OE = 9 ≈ 9.00 > √65 ≈ 8.06, so E lies outside K.']],
   ans:'Radius = √65 · D is inside K · E is outside K'},
  {q:'A screen is 800 × 600 pixels with the origin at the bottom-left. Icon A: centre (100, 150), radius 80. Icon B: centre (250, 230), radius 100. (i) Does any part of either circle go outside the screen? (ii) Do the two circles intersect?',
   why:'Game/app UI me icons overlap hote hain ya screen se bahar nikal jaate hain — programmer EXACT yehi check karta hai. Real coding question!',
   steps:[
    ['Circle A extremes: x from 20 to 180, y from 70 to 230','Leftmost point = 100 − 80 = 20, rightmost = 100 + 80 = 180, bottom = 150 − 80 = 70, top = 150 + 80 = 230. Screen 0→800 (x), 0→600 (y) me sab fit → A poora andar.','Circle A spans x: 20→180 and y: 70→230 — all within the 800 × 600 screen, so A lies fully inside.'],
    ['Circle B extremes: x from 150 to 350, y from 130 to 330','B: 250 ± 100 → 150 to 350 (x), 230 ± 100 → 130 to 330 (y). Sab screen ke andar → koi part outside NAHI. (i) done: neither goes outside.','Circle B spans x: 150→350, y: 130→330 — also fully inside. So (i) answer: no part of either circle is outside the screen.'],
    ['Distance between centres: AB = √((250−100)² + (230−150)²)','(150)² + (80)² = 22500 + 6400 = 28900. √28900 = 170. Centres 170 pixels apart hain.','AB = √(150² + 80²) = √28900 = 170 pixels.'],
    ['Compare AB with r_A + r_B = 180','Circles tab intersect karte hain jab |r₁ − r₂| ≤ d ≤ r₁ + r₂. Yahan 20 ≤ 170 ≤ 180 ✓ → intersect karte hain (2 points).','Circles intersect when the centre distance is between |r₁−r₂| = 20 and r₁+r₂ = 180. Since 20 ≤ 170 ≤ 180, they intersect at two points.']],
   ans:'(i) No — both circles lie fully on the screen · (ii) Yes — they intersect (AB = 170 < 180 = r_A + r_B)'},
  {q:'Plot A(2, 1), B(−1, 2), C(−2, −1) and D(1, −2). Is ABCD a square? Explain, and find its area.',
   why:'Chess board ke kisi bhi tilted square ke corners ke coordinates se hi uska area nikal aata hai — na ruler, na protractor.',
   steps:[
    ['Find all four sides with the distance formula','AB: shifts (−3, 1) → √(9+1) = √10. BC: (−1, −3) → √10. CD: (3, −1) → √10. DA: (1, 3) → √10. Charo sides √10 — sab barabar!','AB = BC = CD = DA = √10 — all four sides are equal, so ABCD is at least a rhombus.'],
    ['Equal sides alone → rhombus. Check the angles / diagonals','Square hone ke liye diagonals barabar hone chahiye. AC: shifts (−4, −2) → √(16+4) = √20. BD: shifts (2, −4) → √(4+16) = √20. Diagonals bhi barabar!','A rhombus with EQUAL diagonals is a square. AC = √20 and BD = √20 — the diagonals match, so ABCD is a square.'],
    ['(Alternative check: adjacent sides perpendicular)','AB ka slope = (2−1)/(−1−2) = −1/3. BC ka slope = (−1−2)/(−2+1) = 3. (−1/3) × 3 = −1 → perpendicular corner at B ✓','Product of slopes of AB and BC is (−1/3)(3) = −1, so the corner at B is 90° — another proof it is a square.'],
    ['Area = side² = (√10)² = 10 square units','Side √10 ka square = 10. Bas itna hi — plotting ke bina bhi area mil gaya.','Area = (√10)² = 10 square units.']],
   ans:'Yes — a square with side √10 and equal diagonals √20 · Area = 10 square units'}
 ]}
]};
</script>
