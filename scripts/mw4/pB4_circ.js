<script>
'use strict';
/* ============================================================
   BOOK ZONE DATA · part 4 — Circle Citadel (Book Ch 5: Circles)
   ============================================================ */
window.BOOKZ=window.BOOKZ||{};
BOOKZ.circ={
 src:'Ganita Manjari · Grade 9 · Part I — Book Ch 5 (I\'m Up and Down, and Round and Round)',
 sets:[
 {set:'Exercise Set 5.2 — Chords & Isosceles Triangles',qs:[
  {q:'Show that the triangle formed by a chord and the centre of the circle is isosceles.',
   why:'Pizza slice dekho — crust (chord) aur centre milake ek triangle banta hai jiske do sides barabar hain. Yehi observation aage ke saare circle theorems ka gate hai.',
   steps:[
    ['Setup: chord AB, centre O — join OA and OB','Chord ke dono ends ko centre se jodo. Triangle OAB ban gaya.','Join the centre O to both endpoints of chord AB, forming triangle OAB.'],
    ['OA = OB = radius','O se circle pe HAR point ki doori radius hai. A aur B dono circle pe hain → OA = OB.','Both A and B lie on the circle, so OA = OB = radius.'],
    ['Two equal sides → isosceles (base angles equal)','Do sides barabar = isosceles triangle. Bonus: ∠OAB = ∠OBA bhi (base angles).','Triangle OAB has two equal sides — it is isosceles, with equal base angles at A and B.']],
   ans:'OA = OB = r, so ∆OAB is isosceles with ∠OAB = ∠OBA'}
 ]},
 {set:'Exercise Set 5.3 — Perpendicular from the Centre',qs:[
  {q:'Two parallel chords of lengths 6 cm and 8 cm are on opposite sides of the centre of a circle. If the radius is 5 cm, find the distance between the midpoints of the chords.',
   why:'Bridge pillars dono taraf — "opposite sides" wala case distance JODTA hai, ghata nahi. Ye trap exam me bahut baar aata hai.',
   steps:[
    ['Drop perpendiculars: centre bisects each chord','Theorem 5: centre se chord pe perpendicular chord ko bisect karta hai. Half-chords: 6/2 = 3 aur 8/2 = 4.','The perpendicular from the centre bisects each chord: half-lengths are 3 and 4.'],
    ['Pythagoras for chord 1: d₁ = √(5² − 3²) = 4','r = hypotenuse 5, half-chord = leg 3 → distance from centre d₁ = √(25−9) = √16 = 4 cm.','For the 6 cm chord: d₁ = √(25 − 9) = 4 cm.'],
    ['Pythagoras for chord 2: d₂ = √(5² − 4²) = 3','Half-chord 4 ke liye: d₂ = √(25−16) = √9 = 3 cm.','For the 8 cm chord: d₂ = √(25 − 16) = 3 cm.'],
    ['Opposite sides → ADD: 4 + 3 = 7 cm','Chords centre ke ULT sides pe hain → unke midpoints ke beech distance = d₁ + d₂ = 7 cm. (Same side hote toh minus hota!)','The chords are on opposite sides, so the midpoint distance is 4 + 3 = 7 cm.']],
   ans:'7 cm'},
  {q:'An isosceles triangle ABC is inscribed in a circle with AB = AC. Show that the altitude from A to BC passes through the centre of the circle.',
   why:'Umbrella ka centre rod seedha canopy ke beech me kyun aata hai? Symmetry ka jawab — aur yahan algebraic proof milta hai.',
   steps:[
    ['Centre must be equidistant from B and C','O se B aur C dono radius doori pe hain: OB = OC. Matlab O, BC ke perpendicular bisector PE PADA hai (equidistant points ka locus).','O satisfies OB = OC, so O lies on the perpendicular bisector of BC.'],
    ['Isosceles altitude = perpendicular bisector','AB = AC wale triangle me A se BC pe daala gaya altitude BC ko bisect bhi karta hai aur perpendicular bhi hai — matlab altitude hi BC ka perpendicular bisector hai.','In an isosceles triangle, the altitude from the apex A is also the perpendicular bisector of the base BC.'],
    ['Both O and the altitude sit on the same line → altitude passes through O','Dono (O aur altitude) BC ke perpendicular bisector pe hain, aur ek hi point (midpoint of BC) se guzarte hain → wahi line! Isliye altitude centre se guzarti hai.','The altitude and the centre both lie on the (unique) perpendicular bisector of BC — so the altitude passes through O.']],
   ans:'The altitude from A is the perpendicular bisector of BC, and the centre lies on it'}
 ]},
 {set:'Exercise Set 5.5 — Chord Lengths',qs:[
  {q:'Find the length of the chord of a circle where the radius is 7 cm and the perpendicular distance from the centre is 6 cm.',
   why:'Ceiling fan ka blade wall se kitna paas — chord-distance relation. Pythagoras ek baar phir!',
   steps:[
    ['Draw: centre O, chord AB, perpendicular OM, OM = 6','Theorem: OM ⊥ AB, aur M midpoint hai. Half-chord = AM = MB.','Draw the perpendicular OM from the centre to the chord; M is the midpoint and OM = 6.'],
    ['Right triangle OMA: OA² = OM² + AM²','r = 7 hypotenuse. 7² = 6² + AM².','In right ∆OMA: OA² = OM² + AM².'],
    ['AM = √(49 − 36) = √13','49 − 36 = 13. AM = √13 cm (√13 ≈ 3.61).','AM = √(49 − 36) = √13 ≈ 3.61 cm.'],
    ['Chord = 2 × AM = 2√13 ≈ 7.21 cm','Chord poora = do half = 2√13 cm.','Chord AB = 2√13 ≈ 7.21 cm.']],
   ans:'2√13 cm (≈ 7.21 cm)'},
  {q:'Explain why: if the perpendicular distance of a chord from the centre is d and the radius is r, then chord length = 2√(r² − d²).',
   why:'Formula RATTNA band — nikalna seekho. Ek baar derive kiya toh bhoologe nahi.',
   steps:[
    ['Half-chord, distance d, and radius form a right triangle','OM = d (distance), AM = half-chord (kya?), OA = r (hypotenuse). Right angle at M (Theorem 4).','OM = d and OA = r are a leg and the hypotenuse of right triangle OMA.'],
    ['Pythagoras: AM² + d² = r²','Legs ka square jodo = hypotenuse ka square: AM² = r² − d².','By Pythagoras: AM² = r² − d².'],
    ['AM = √(r² − d²)','Root lo — ye half-chord hai.','So the half-chord is √(r² − d²).'],
    ['Chord = 2 × half = 2√(r² − d²)','Poora chord dono halves ka sum: 2√(r² − d²). Sanity check: d = 0 → chord = 2r = diameter ✓ (longest chord).','Chord = 2√(r² − d²). Check: d = 0 gives 2r, the diameter — the longest chord.']],
   ans:'Chord = 2√(r² − d²) (from Pythagoras on half-chord, distance, radius)'}
 ]},
 {set:'End-of-Chapter Exercises',qs:[
  {q:'Two parallel chords of lengths 10 cm and 24 cm are on the SAME side of the centre. The distance between the chords is 7 cm. Find the radius.',
   why:'Reverse engineering: chord distances se radius nikalna — wheel design, tunnel boring me real use. Answer guess karoge toh maza aayega (hint: 5-12-13!).',
   steps:[
    ['Half-chords: 5 and 12 → distances x and y from centre','Half of 10 = 5, half of 24 = 12. Chhoti chord zyada door hoti hai: x = √(r²−25), y = √(r²−144).','Half-chords 5 and 12 give distances x = √(r²−25) and y = √(r²−144), with x > y.'],
    ['Same side → gap = x − y = 7','Dono chords ek hi side → distance unke centre-distances ka FARAK: √(r²−25) − √(r²−144) = 7.','Same side means the gap is x − y = 7.'],
    ['Try the 5-12-13 triangle: r = 13','Test r = 13: x = √(169−25) = √144 = 12, y = √(169−144) = √25 = 5. 12 − 5 = 7 ✓','Try r = 13: x = 12, y = 5, and 12 − 5 = 7 ✓.'],
    ['Radius = 13 cm','Famous 5-12-13 Pythagorean triple ne kaam kar diya! (Algebra se bhi solve hota: dono squares subtract karo.)','Radius = 13 cm — the 5-12-13 triple in action.']],
   ans:'r = 13 cm'},
  {q:'Quadrilateral MNOP is inscribed in a circle. If MN is a diameter, what can you say about ∠MOP and ∠MNP? Explain.',
   why:'Central angle theorem ka direct application — arc MP ko centre se aur circumference se dono jagah se dekhna.',
   steps:[
    ['Both angles stare at the SAME arc MP','∠MOP centre pe bana hai, chords OM & OP se. ∠MNP circle PE (point N pe) bana hai, chords NM & NP se. Dono ka "target" arc MP hai.','∠MOP is the angle at the centre and ∠MNP an inscribed angle — both subtend the same arc MP.'],
    ['Central angle theorem: ∠MOP = 2 ∠MNP','Centre pe bana angle hamesha DOUBLE hota hai circle pe bane (same arc ke liye) inscribed angle ka. Ye book ka main theorem hai.','The angle at the centre is twice the inscribed angle on the same arc: ∠MOP = 2∠MNP.'],
    ['Answer: ∠MOP = 2 ∠MNP','Isliye ∠MOP, ∠MNP ka exact double hai — hamesha, chahe N kahan bhi ho (arc MP ke opposite side).','So ∠MOP is exactly twice ∠MNP, wherever N sits on the opposite arc.']],
   ans:'∠MOP = 2∠MNP (central angle theorem on arc MP)'},
  {q:'Explain why the exterior angle at any vertex of a cyclic quadrilateral equals the interior opposite angle (e.g., ∠CDE = ∠ABC, E on extension of CD).',
   why:'Cyclic quad ke opposite angles ka sum 180° hai — aur iska instant bonus ye exterior trick deta hai. Proving contest me time bachata hai.',
   steps:[
    ['Cyclic quad rule: ∠ADC + ∠ABC = 180°','Circle ke andar bane quadrilateral ke opposite angles ka sum exactly 180° (Theorem).','In a cyclic quadrilateral, opposite angles sum to 180°: ∠ADC + ∠ABC = 180°.'],
    ['Linear pair: ∠ADC + ∠CDE = 180°','CD ko extend kiya → D pe straight line: interior ∠ADC + exterior ∠CDE = 180°.','Extending CD makes ∠ADC and exterior ∠CDE a linear pair: sum 180°.'],
    ['Dono equations me ∠ADC cancel: ∠CDE = ∠ABC','Pehli se doosri compare karo — dono ka sum 180 hai, ∠ADC common. Toh bache: ∠CDE = ∠ABC. DONE.','Subtracting ∠ADC from both equations: ∠CDE = ∠ABC. The exterior angle equals the interior opposite angle.']],
   ans:'Both ∠ADC+∠ABC and ∠ADC+∠CDE equal 180°, so ∠CDE = ∠ABC'},
  {q:'Consider all chords of a circle of a fixed length. What shape do their midpoints form?',
   why:'Pattern-spotting ka khel: ek condition fix karo (same length), doosri cheez ka locus dekho. GPS geofencing isi concept pe hai.',
   steps:[
    ['Fixed chord length → fixed distance from centre','Chord = 2√(r² − d²) — length fix hai toh d bhi FIX hai! Har same-length chord centre se utni hi door hai.','From chord = 2√(r²−d²), a fixed chord length fixes the distance d from the centre.'],
    ['Midpoints sab us distance pe, har direction me','Har chord ka midpoint centre se exactly d door hai — aur chords har angle pe ho sakti hain.','Each midpoint is exactly d from the centre, in every direction.'],
    ['Shape = a circle (concentric, radius d)','Same centre, fixed distance d, all directions → EK CHHOTA CIRCLE! Centre wahi, radius d.','The midpoints form a circle with the same centre and radius d.']],
   ans:'A concentric circle of radius d (the fixed centre-distance)'},
  {q:'Justify: "There is no chord of a circle that is longer than its diameter."',
   why:'Diameter = longest chord — ye feel se zyada PROOF se aata hai. Triangle inequality ka classy use.',
   steps:[
    ['Diameter = 2r, chord ≤ 2r (Pythagoras result)','Chord formula se: chord = 2√(r² − d²) ≤ 2√(r²) = 2r, kyunki d ≥ 0. Barabari sirf d = 0 (diameter) pe.','From chord = 2√(r²−d²) with d ≥ 0: chord ≤ 2r, with equality only when d = 0 — the diameter.'],
    ['Triangle way: OA + OB ≥ AB','Kisi bhi chord AB ke liye: OA + OB = 2r. Triangle inequality se AB ≤ OA + OB = 2r.','Or by the triangle inequality: AB ≤ OA + OB = 2r for any chord AB.'],
    ['Equality sirf tab jab O, A, B ek seedhi line pe ho','O beech me aata hai sirf tab jab AB diameter ho (A, O, B collinear). Tabhi chord = 2r = diameter. Toh diameter sabse lambi — proof done.','Equality holds only when A, O, B are collinear — i.e., AB is the diameter.']],
   ans:'For any chord AB: AB ≤ OA + OB = 2r, equality only for the diameter'}
 ]}
]};
</script>
