<script>
'use strict';
/* ============================================================
   BOOK ZONE DATA · part 8 — NCERT Classics
   (Line Land, Euclid's Emporium, Angle Realm, Triangle Territory,
    Quad Quadrangle, Volume Vault, Data Dungeon)
   ============================================================ */
window.BOOKZ=window.BOOKZ||{};
BOOKZ.line={src:'NCERT Class 9 · Linear Equations in Two Variables — classic exam questions',sets:[{set:'NCERT Classic Exercises',qs:[
 {q:'The cost of a notebook is twice the cost of a pen. Write a linear equation in two variables to represent this statement.',
  why:'Statement → equation translation hi algebra ki asli shakti hai. Bill splitting, budgeting — sab yahi hai.',
  steps:[
   ['Name the variables: notebook cost = ₹x, pen cost = ₹y','Jo pata nahi usse variable bolo — dono costs unknown hain.','Let the notebook cost ₹x and the pen cost ₹y.'],
   ['"Twice" means = 2 ×','Notebook 2 guna mehnga → x = 2y.','The notebook costs twice the pen: x = 2y.'],
   ['Equation: x = 2y (or x − 2y = 0)','Standard form me likho: x − 2y = 0. Ek equation, do variables — a linear equation in two variables.','In standard form: x − 2y = 0.']]},
 {q:'A taxi charges ₹8 for the first kilometre and ₹5 per km for every subsequent kilometre. Taking distance as x km and total fare as ₹y, write the equation and find the fare for 7 km.',
  why:'Real taxi/rapido pricing! "First km special rate" = ek constant + variable part — linear equation ka everyday avatar.',
  steps:[
   ['First km costs 8; remaining (x − 1) km cost 5 each','Total = 8 + 5 × (x − 1). Bas structure samjho.','Fare = 8 + 5(x − 1).'],
   ['Simplify: y = 8 + 5x − 5 = 5x + 3','Distribute karo: 5x − 5. Jodo: 5x + 3.','y = 5x + 3.'],
   ['x = 7: y = 5(7) + 3 = 38','7 km ka fare ₹38.','For 7 km: y = 38.']]},
 {q:'Find four different solutions of the equation 2x + y = 7.',
  why:'Ek equation ke INFINITE solutions hote hain — x chuno, y khud nikal aayega. Graph ki poori line hi solution-set hai.',
  steps:[
   ['Pick any x, compute y = 7 − 2x','x ki jagah apni marzi ki value — y apne aap nikal aayega.','Choose x freely and compute y = 7 − 2x.'],
   ['x = 0 → y = 7; x = 1 → y = 5','(0, 7) aur (1, 5) dono solutions hain.','(0, 7) and (1, 5) are solutions.'],
   ['x = 2 → y = 3; x = 3 → y = 1','(2, 3) aur (3, 1). Chaar solutions ready!','(2, 3) and (3, 1) — four solutions: (0,7), (1,5), (2,3), (3,1).'],
   ['Note: infinite solutions exist','x = −1 bhi chalega: (−1, 9). Line ke HAR point solution hai.','Any point on the line 2x + y = 7 is a solution.']]},
 {q:'Give the geometric representation of y = 3 as: (i) an equation in one variable (ii) an equation in two variables.',
  why:'Same equation, different "lens" — ek variable me point, do variables me poori line. Perspective badalne ka khel.',
  steps:[
   ['One variable: y = 3 is a single POINT on the number line','Sirf y ki duniya me y = 3 matlab ek hi point.','In one variable, y = 3 is just the point 3 on the number line.'],
   ['Two variables: y = 3 means y is ALWAYS 3, x free','Ab x bhi hai — lekin y fix. Har x ke liye y = 3: (0,3), (5,3), (−2,3)…','In two variables, y = 3 holds for every x — all points (x, 3).'],
   ['Representation: a HORIZONTAL line 3 units above the x-axis','Wo saare points jodne pe ek horizontal line banti hai jo x-axis ke upar 3 units par hai.','It is the horizontal line passing through (0, 3).']]}]}]};
BOOKZ.euc={src:'NCERT Class 9 · Introduction to Euclid\'s Geometry — classic exam questions',sets:[{set:'NCERT Classic Exercises',qs:[
 {q:'How many lines can pass through: (i) one given point (ii) two given distinct points?',
  why:'Euclid ka pehla postulate hi ye kehta hai — GPS se laptop screen tak, "2 points se 1 line" har design ka base hai.',
  steps:[
   ['(i) One point → INFINITELY many lines','Ek point ke through jitne chahe lines guzar sakti hain — har direction me ek.','Through one point, infinitely many lines pass.'],
   ['(ii) Two distinct points → EXACTLY one line','Euclid\'s Postulate 1: do points se unique line. Ye "unique" hi navigation ka foundation hai.','Through two distinct points there is exactly ONE line (Postulate 1).'],
   ['Test it: two pins on a board — one stretched string only','Do pins me ek hi string seedhi fit hoti hai. Practical proof!','Two pins determine exactly one stretched string.']]},
 {q:'What is the difference between an axiom and a postulate?',
  why:'Definitions clear honi chahiye — exam me 1-mark ka seedha sawaal, aur thinking ke liye foundation.',
  steps:[
   ['Axiom: universal truth used EVERYWHERE in mathematics','Axiom har jagah chalega — algebra me bhi, geometry me bhi. Example: "Things equal to the same thing are equal to each other."','An axiom is a truth assumed across all of mathematics.'],
   ['Postulate: truth specific to GEOMETRY','Postulate sirf geometry ke rules hain. Example: "A line can be drawn through any two points."','A postulate is an assumption specific to geometry.'],
   ['Dono PROOF ke bina accept kiye jaate hain','Na axiom, na postulate — kisi ko prove nahi kiya ja sakta; ye starting points hain. Inhi pe saara structure khada hai.','Both are accepted without proof — they are the starting bricks.']]},
 {q:'If A, B, C are three points on a line and B lies between A and C, prove that AB + BC = AC.',
  why:'"Whole = sum of parts" — segment addition. Ruler reading, distance calculation, har measurement me implicit hai.',
  steps:[
   ['Axiom: "If equals are added to equals, wholes are equal"','Ye Euclid ka Axiom 2 hai — additivity ka rule.','Use Euclid\'s axiom: wholes of equal parts are equal.'],
   ['AC = AB (with B between) → AC coincides with AB + BC','B ke beech hone se AB aur BC judd ke exactly AC bante hain — overlap nahi, coincidence (Axiom 4).','With B between A and C, the segments AB and BC together exactly match AC.'],
   ['Hence AB + BC = AC. QED','Isi logic se: agar AC = AB + BC, toh B neccessarily beech me hota hai (converse bhi true).','Therefore AB + BC = AC — and the converse holds too.']]}]}]};
BOOKZ.ang={src:'NCERT Class 9 · Lines and Angles — classic exam questions',sets:[{set:'NCERT Classic Exercises',qs:[
 {q:'Two complementary angles differ by 10°. Find both angles.',
  why:'Complementary = 90° ka jodi. Pipe fittings, roof slopes, TV mounts — right angles ke pieces har engineering me.',
  steps:[
   ['Let the angles be x and x + 10','Chhota x, bada x+10. Difference 10 diya hai.','Let the angles be x and x + 10.'],
   ['Sum = 90: x + (x + 10) = 90','Complementary angles ka sum 90° — equation ready.','x + (x + 10) = 90.'],
   ['2x = 80 → x = 40','Solve: x = 40. Angles: 40° and 50°.','2x + 10 = 90 → x = 40. The angles are 40° and 50°.'],
   ['Check: 40 + 50 = 90 ✓ and 50 − 40 = 10 ✓','Dono conditions satisfy.','Verified: sum 90°, difference 10°.']]},
 {q:'Two lines intersect. One of the angles formed is 35°. Find the other three.',
  why:'Scissors, road crossing, X sign — vertically opposite angles ka instant use.',
  steps:[
   ['Vertically opposite pair: 35° and 35°','Line cross pe opposite corners barabar hote hain (vertically opposite angles).','The angle vertically opposite 35° is also 35°.'],
   ['Linear pair: 35° + x = 180° → x = 145°','Same line ke adjacent angles ka sum 180° (linear pair).','The adjacent angle on the straight line: 180° − 35° = 145°.'],
   ['Fourth angle: 145° (vertical opposite again)','Bacha hua bhi 145° — opposite pair.','The remaining angle is 145°. So: 35°, 145°, 35°, 145°.']]},
 {q:'The angles of a triangle are in the ratio 2 : 3 : 4. Find all three angles.',
  why:'Angle sum property + ratio handling — exam me sabse zyada repeat hone wala combo.',
  steps:[
   ['Let angles = 2x, 3x, 4x','Ratio ko x me kholo.','Let the angles be 2x, 3x, 4x.'],
   ['Sum = 180: 2x + 3x + 4x = 180','Triangle ka golden rule: 180°.','Angle sum: 9x = 180.'],
   ['x = 20 → 40°, 60°, 80°','Solve aur substitute: 40, 60, 80.','x = 20 gives angles 40°, 60°, 80°.'],
   ['Check: 40 + 60 + 80 = 180 ✓','Verify always.','Sum checks out.']]},
 {q:'In the figure, PQ ∥ RS and a transversal cuts them. If one alternate interior angle is 65°, find the remaining angles on the diagram.',
  why:'Railway tracks + bridge girder — parallel lines aur transversal ka poora angle-map ek hi fact se khul jaata hai.',
  steps:[
   ['Alternate interior angles are EQUAL: partner = 65°','Z-pattern yaad karo: alternate interior pair barabar.','The alternate interior angle is also 65°.'],
   ['Corresponding angles EQUAL: the matching F-pattern angle = 65°','Same side matching position → 65°.','Corresponding angles are equal too: 65°.'],
   ['Linear pairs fill the rest: 180° − 65° = 115°','Baki positions linear pair se: 115°.','The remaining positions get 115° each (linear pair with 65°).'],
   ['Final map: four 65°, four 115°','Parallel + transversal ke 8 angles me sirf DO values hoti hain.','The 8 angles alternate between 65° and 115°.']]}]}]};
BOOKZ.tri={src:'NCERT Class 9 · Triangles — classic exam questions',sets:[{set:'NCERT Classic Exercises',qs:[
 {q:'In ∆ABC, AB = AC. Prove that ∠B = ∠C (base angles of an isosceles triangle).',
  why:'Isosceles ka property har proof, har design (roof trusses!) me. Ye NCERT ka first formal congruence proof hai.',
  steps:[
   ['Draw the angle bisector of ∠A meeting BC at D','Helper line: ∠A ka bisector. Ab do triangles ban gaye: ∆BAD aur ∆CAD.','Draw the bisector of ∠A, meeting BC at D.'],
   ['Compare ∆BAD and ∆CAD','AB = AC (given), ∠BAD = ∠CAD (construction), AD = AD (common).','In ∆BAD and ∆CAD: AB = AC, ∠BAD = ∠CAD, AD common.'],
   ['SAS congruence: ∆BAD ≅ ∆CAD','Do sides aur included angle barabar → SAS.','By SAS, ∆BAD ≅ ∆CAD.'],
   ['CPCT: ∠B = ∠C','Corresponding parts of congruent triangles — done!','By CPCT, ∠B = ∠C. Base angles are equal.']]},
 {q:'In an isosceles triangle, the vertex angle is 80°. Find the base angles.',
  why:'Same property, numeric form. Exam me 1-2 marks ka instant question.',
  steps:[
   ['Base angles are EQUAL (isosceles property)','Do barabar sides → do barabar base angles. Dono ko x bolo.','The two base angles are equal; call each x.'],
   ['x + x + 80 = 180','Angle sum: 180°.','x + x + 80 = 180.'],
   ['2x = 100 → x = 50°','Base angles 50°, 50°.','Each base angle is 50°.']]},
 {q:'Which congruence criterion proves two triangles congruent if two sides and the INCLUDED angle are equal? What about two angles and the included side?',
  why:'SAS/ASA/SSS/RHS — tool selection hi asli skill hai. Galat criterion likha toh proof invalid.',
  steps:[
   ['Two sides + included angle → SAS','Angle dono sides ke BEECH me ho toh SAS. (SSA nahi hota!)','Sides with the angle between them → SAS.'],
   ['Two angles + included side → ASA','Do angles aur unke beech ki side → ASA. (AAS bhi chalega logically.)','Two angles with the side between them → ASA.'],
   ['Right angle + hypotenuse + side → RHS','Right triangles ka special: RHS (Right angle-Hypotenuse-Side).','For right triangles: RHS.'],
   ['SSS: all three sides','Teeno sides barabar → SSS. Har triangle unique ban jaata hai.','All three sides equal → SSS.']]}]}]};
BOOKZ.quad={src:'NCERT Class 9 · Quadrilaterals — classic exam questions',sets:[{set:'NCERT Classic Exercises',qs:[
 {q:'The angles of a quadrilateral are in the ratio 3 : 5 : 9 : 13. Find all the angles.',
  why:'Quad ka angle sum 360° — rectangle/window/frame sab me. Ratio + sum = instant equation.',
  steps:[
   ['Let angles = 3x, 5x, 9x, 13x','Ratio ko x me kholo.','Let the angles be 3x, 5x, 9x, 13x.'],
   ['Sum = 360: 30x = 360','Quadrilateral ka angle sum 360°.','3x+5x+9x+13x = 30x = 360.'],
   ['x = 12 → 36°, 60°, 108°, 156°','Substitute x = 12.','Angles: 36°, 60°, 108°, 156°.'],
   ['Check: 36+60+108+156 = 360 ✓','Verify.','Sum checks.']]},
 {q:'One angle of a parallelogram is 70°. Find the other three angles.',
  why:'Doors, grids, escalators — parallelogram ke angle rules sab jagah. Adjacent supplementary, opposite equal.',
  steps:[
   ['Opposite angle = 70° (opposite angles equal)','Parallelogram me opposite angles barabar.','The opposite angle is also 70°.'],
   ['Adjacent angles are supplementary: 180 − 70 = 110°','Co-interior/adjacent pair ka sum 180°.','Each adjacent angle = 110°.'],
   ['Fourth = 110° (opposite pair again)','Doosra bhi 110°. Final: 70, 110, 70, 110.','So the angles are 70°, 110°, 70°, 110°.']]},
 {q:'In ∆PQR, L and M are the midpoints of PQ and PR. If QR = 14 cm, find LM.',
  why:'Midpoint theorem — triangle ke andar chhota parallel segment. Bridge trusses me load distribution isi pe.',
  steps:[
   ['Midpoint theorem: LM ∥ QR and LM = ½ QR','Do midpoints jodne wali segment third side ke parallel aur aadhi hoti hai.','By the Midpoint Theorem: LM ∥ QR and LM = QR/2.'],
   ['LM = 14/2 = 7 cm','Half of 14 = 7.','LM = 7 cm.'],
   ['Why? Extend LM to double it → congruent triangles (CPCT)','Proof idea: LM ko double karo, congruence se third point S pe QS ∥ PR nikalta hai — parallelogram ban jaata hai.','The proof doubles LM and uses congruence to form a parallelogram.']]}]}]};
BOOKZ.sol={src:'NCERT Class 9 · Surface Areas & Volumes — classic exam questions',sets:[{set:'NCERT Classic Exercises',qs:[
 {q:'The diameter of a cone is 10.5 cm and its slant height is 10 cm. Find its curved surface area.',
  why:'Birthday cap, ice-cream cone, traffic cone — CSA hi "wrapper" ka area hai. Material estimate karna industry me roz hota hai.',
  steps:[
   ['r = diameter/2 = 5.25 cm, l = 10 cm','Slant height l hai (tip se base edge tak) — height nahi!','Radius r = 5.25 cm, slant height l = 10 cm.'],
   ['CSA of cone = πrl','Formula: π × r × l.','CSA = πrl.'],
   ['= (22/7) × 5.25 × 10','5.25 × 22 = 115.5; ÷7 = 16.5; ×10 = 165.','(22/7)(5.25)(10) = 165.'],
   ['CSA = 165 cm²','Wrapper needs 165 cm² of material.','The curved surface area is 165 cm².']]},
 {q:'Find the surface area of a sphere of radius 7 cm.',
  why:'Footballs, globes, water tanks — sphere ka SA = 4πr². Ek formula, poora duniya ke gol cheezon ka budget.',
  steps:[
   ['SA of sphere = 4πr²','Poora surface — koi edge nahi, koi base nahi.','Surface area = 4πr².'],
   ['= 4 × (22/7) × 7²','7² = 49.','= 4 × (22/7) × 49.'],
   ['= 4 × 22 × 7 = 616 cm²','49/7 = 7 cancels beautifully.','SA = 616 cm².']]},
 {q:'A hemispherical brass bowl has inner diameter 10.5 cm. Find the cost of tin-plating its inside at ₹16 per 100 cm².',
  why:'Real-world cost problem — bowl, dome, jhoola cover. Area nikalo, rate lagao. (Hemisphere ka CSA = 2πr²!)',
  steps:[
   ['r = 10.5/2 = 5.25 cm; CSA hemisphere = 2πr²','Half sphere ka curved area = 2πr² (poore sphere ka aadha).','Inner radius 5.25 cm; curved area = 2πr².'],
   ['= 2 × (22/7) × 5.25² = 2 × (22/7) × 27.5625','5.25² = 27.5625.','Compute: 2 × (22/7) × 27.5625 = 173.25 cm².'],
   ['= 173.25 cm²','Plating area.','Area to plate: 173.25 cm².'],
   ['Cost = (173.25/100) × 16 = ₹27.72','Rate ₹16 per 100 cm² → 1.7325 × 16 = 27.72.','Cost = ₹27.72.']]}]}]};
BOOKZ.dat={src:'NCERT Class 9 · Statistics — classic exam questions',sets:[{set:'NCERT Classic Exercises',qs:[
 {q:'Find the mean, median and mode of: 4, 6, 5, 9, 6, 4, 6, 8',
  why:'Teen "averages" teeno stories kehte hain — salary negotiation, cricket scores, marks. Ek hi data, teen lenses.',
  steps:[
   ['Mean = sum ÷ count = 48/8 = 6','4+6+5+9+6+4+6+8 = 48. ÷8 = 6.','Mean = 48/8 = 6.'],
   ['Median: sort first → 4,4,5,6,6,6,8,9 → middle two 6,6 → 6','Order me lagao (8 values) → 4th aur 5th ka average = (6+6)/2 = 6.','Sorted: 4,4,5,6,6,6,8,9 → median = (6+6)/2 = 6.'],
   ['Mode = 6 (appeared 3 times)','Sabse zyada baar wala value = 6 (3 times).','Mode = 6.'],
   ['Sab 6! Balanced data','Symmetric data me teeno milte hain — good sign.','All three agree at 6 — a balanced dataset.']]},
 {q:'The median of the data 29, 32, 48, 50, x, x+2, 72, 78, 84, 95 (arranged in order) is 63. Find x.',
  why:'Median REVERSE engineering — beech wali value di hai, unknown dhundo. 10 values = beech ke DO values ka average.',
  steps:[
   ['10 values → median = average of 5th & 6th','Even count me median do beech values ka mean hota hai.','With 10 values, the median is the mean of the 5th and 6th.'],
   ['5th = x, 6th = x + 2','Data already sorted — beech wale dono x aur x+2 hain.','The 5th and 6th values are x and x + 2.'],
   ['(x + x + 2)/2 = 63 → 2x + 2 = 126','Equation banao.','(x + (x+2))/2 = 63.'],
   ['2x = 124 → x = 62','Solve: x = 62. (Values 62 aur 64 — aur 63 inka exact beech ✓)','x = 62. The middle pair is 62 and 64.']]},
 {q:'The mean of the following frequency distribution is 18. Find the missing frequency f — classes 11-13, 13-15, 15-17, 17-19, 19-21, 21-23, 23-25 with frequencies 7, 6, 9, 13, f, 5, 4.',
  why:'Survey me ek response count miss ho gaya? Mean se REVERSE nikal sakte ho. Grouped data + unknown frequency = exam favourite.',
  steps:[
   ['Midpoints: 12, 14, 16, 18, 20, 22, 24','Class interval ka midpoint = (lower + upper)/2. Yehi representative value hai.','Use class midpoints: 12, 14, 16, 18, 20, 22, 24.'],
   ['N = 7+6+9+13+f+5+4 = 44 + f','Total frequency me f bhi jodo.','N = 44 + f.'],
   ['Σfx = 7×12 + 6×14 + 9×16 + 13×18 + f×20 + 5×22 + 4×24 = 752 + 20f','Compute: 84 + 84 + 144 + 234 + 20f + 110 + 96 = 752 + 20f.','Σfx = 752 + 20f.'],
   ['Mean: (752 + 20f)/(44 + f) = 18','Mean formula set karo.','Set (752 + 20f)/(44 + f) = 18.'],
   ['752 + 20f = 792 + 18f → 2f = 40 → f = 8','Cross-multiply: 18 × 44 = 792. Solve: f = 8.','f = 8.']]}]}]};
</script>
