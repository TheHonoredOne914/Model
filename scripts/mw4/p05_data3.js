<script>
'use strict';
/* ================= WORLD DATA · part 3 (circ, area, sol, dat) ================= */

WORLDS.push(
{id:'circ',n:'Circle Citadel',ch:'Chapter 9 · Circles',ic:'🎯',
 tag:'Chords, equal distances, half-angle magic and the cyclic four.',
 boss:{n:'CIRRONIS',ti:'Lord of the Infinite Loop',taunt:'My circumference has no end… and neither does your suffering. Spin, Warrior, spin!',art:'ring'},
 concepts:[

 {id:'circ1',t:'Circle Anatomy',sub:'NCERT 9.1 · Chords, arcs, segments',
  irl:['Ordering pizza: chord, sector, segment — you literally eat the vocabulary','Bangles and bike wheels: the radius decides fit and ride; one measurement runs the whole circle'],
  hook:{ic:'🍕',s:'A pizza is a circle textbook: the doughline is the circumference, every cut is a chord, and the slice that reaches crust-to-crust through the centre is the diameter — the longest possible cut. The pepperoni wedge (two radii + arc) is a sector; the leftover cap above a chord is a segment. Lunch = geometry.',
        w:'Vocabulary is half the battle in this chapter. Radius, chord, diameter, arc, sector, segment — the paper sets questions just testing if you can tell them apart.'},
  facts:[['Radius & diameter','All radii are equal. Diameter = 2r and it is the LONGEST chord — it wins every comparison.'],
         ['Chord','A chord joins two points ON the circle; it need not pass through the centre. Infinitely many chords exist.'],
         ['Arc, segment, sector','Arc = a piece of the circle itself. Segment = region between chord and arc. Sector = region between two radii and their arc.'],
         ['The two formulas','Circumference = 2πr. Area = πr². With π = 22/7 and r = 7: C = 44, A = 154.']],
  lab:['circl',{mode:'parts'}],
  tasks:['Drag the point P — watch chord AP grow and shrink','Toggle the diameter and confirm it is the longest chord','Shade the segment, then the sector — tell them apart'],
  ex:{t:'A circle has radius 10 cm and a chord of length 16 cm. How far is the chord from the centre?',
      steps:[['Drop the perpendicular','The perpendicular from the centre to a chord bisects it: half-chord = 8 cm.'],
             ['Pythagoras','Distance² + 8² = 10² → distance² = 100 − 64 = 36.'],
             ['Result','Distance = 6 cm. The 6-8-10 triple strikes again!']]},
  gen(){
    const t=R(1,3);
    if(t===1){
      return Q('The longest chord of a circle is…','the diameter',['the radius','any chord through a point on the circle','the arc'],'The diameter passes through the centre and spans the full circle — no chord can be longer.','Diameter = 2 × radius, through the centre.');
    }
    if(t===2){
      const d=pick([14,28,44,70]);
      return Q('The diameter of a circle is '+d+' cm. Its radius is…',fr(d,2)+' cm',[d+' cm',fr(d,2)+1+' cm',fr(2*d,1)+' cm'],'Radius = diameter ÷ 2 = '+d+'/2 = '+fr(d,2)+' cm.','Halve it.');
    }
    const r=pick([7,14]);
    const C=2*(22/7)*r, A=(22/7)*r*r;
    if(Math.random()<0.5){
      return Q('Circumference of a circle with radius '+r+' cm (π = 22/7)…',fmt(C)+' cm',[fmt(A)+' cm',fmt(C+8)+' cm',fmt(C/2)+' cm'],'C = 2πr = 2 × 22/7 × '+r+' = '+fmt(C)+' cm.','2 × 22/7 × r.');
    }
    return Q('Area of a circle with radius '+r+' cm (π = 22/7)…',fmt(A)+' cm²',[fmt(C)+' cm²',fmt(A+22)+' cm²',fmt(A/2)+' cm²'],'A = πr² = 22/7 × '+r+'² = '+fmt(A)+' cm².','22/7 × r².');
  }},

 {id:'circ2',t:'Chords & the Centre',sub:'NCERT 9.3–9.5 · Equal chords, equal distances',
  irl:['Bicycle spokes: equal spokes sit equal distances from the hub — mechanics true a wheel with chord logic','Centering the umbrella on a round table: the perpendicular from centre to chord — theorem as furniture skill'],
  hook:{ic:'🎯',s:'Two arrows (chords) of exactly the same length hit a circular target. The referee checks their distances from the bull\'s eye: IDENTICAL. Longer arrows always sit closer to the centre; shorter ones shy away to the rim. The centre is the fairest referee in geometry.',
        w:'"Perpendicular from centre bisects the chord" and "equal chords ⇔ equal distances" solve every chord question — usually with a hidden Pythagoras triple.'},
  facts:[['The bisector drop','The perpendicular from the centre to a chord ALWAYS bisects it (and the converse: the line from centre to midpoint is perpendicular).'],
         ['Equal chords, equal distance','Chords of equal length sit at equal distances from the centre — and conversely, equidistant chords are equal.'],
         ['Pythagoras powers it','Distance d, half-chord h, radius r form a right triangle: d² + h² = r².'],
         ['Three points make a circle','One and only one circle passes through three given non-collinear points — its centre is where the perpendicular bisectors meet.']],
  lab:['circl',{mode:'chords'}],
  tasks:['Slide the chord — watch the perpendicular always bisect it','Make two chords EQUAL and compare their distances','Slide one chord longer and see it creep toward the centre'],
  ex:{t:'Find the distance of a 24 cm chord from the centre of a circle of radius 13 cm.',
      steps:[['Halve the chord','Perpendicular bisects: half-chord = 12 cm.'],
             ['Pythagoras','d² + 12² = 13² → d² = 169 − 144 = 25.'],
             ['Result','d = 5 cm. The 5-12-13 triple again — spot triples early!']]},
  gen(){
    const t=R(1,2);
    if(t===1){
      const bank=[[16,10,6],[24,13,5],[48,25,7],[8,5,3],[30,17,8]];
      const [c,r,d]=pick(bank);
      return Q('A circle of radius '+r+' cm has a chord of length '+c+' cm. Its distance from the centre is…',d+' cm',[r+' cm',fr(c,2)+' cm',(d+2)+' cm',(d-1)+' cm'],'Half-chord = '+fr(c,2)+'. Then d² = '+r+'² − '+fr(c,2)+'² = '+(r*r-c*c/4)+' → d = '+d+' cm.','d² + (c/2)² = r². Spot the triple!');
    }
    const bank=[[5,12,24],[7,24,48],[3,4,8],[8,15,30]];
    const [d,r,c]=pick(bank);
    return Q('A chord is '+d+' cm from the centre of a circle of radius '+r+' cm. The chord length is…',c+' cm',[r+' cm',(c/2)+' cm',(c+4)+' cm'],'Half-chord² = '+r+'² − '+d+'² = '+(r*r-d*d)+' → half = '+fr(c,2)+' → chord = '+c+' cm.','Find the half-chord by Pythagoras, then double.');
  }},

 {id:'circ3',t:'Angles in Circles',sub:'NCERT 9.4–9.5 · Central & inscribed angles',
  irl:['Cinema screens: seats on the same arc see the frame at the same inscribed angle — the view is fair all along the row','Roundabouts: equal arcs give equal turning angles — traffic design quietly runs on circle theorems'],
  hook:{ic:'🔦',s:'A lighthouse at the centre of a circular bay sweeps a 80° beam. A boat anchored on the shore sees the same two beam-edges — but from the boat the angle looks exactly HALF: 40°. Same arc, two vantage points: centre sees double, rim sees half. Always. No exceptions.',
        w:'The central-angle theorem is the workhorse of circle questions: central = 2 × inscribed on the same arc. Its children: angles in the same segment are equal, and a semicircle always frames 90°.'},
  facts:[['Central = 2 × inscribed','The angle subtended by an arc at the centre is double the angle it subtends at any point on the remaining circle.'],
         ['Same segment, equal angles','All inscribed angles standing on the SAME arc are equal to each other.'],
         ['Thales\' 90°','An angle in a SEMICIRCLE is always a right angle — the diameter\'s arc subtends 180° at centre, so 90° at the rim.'],
         ['Opposite segments','Angle in the major segment is acute, in the minor segment obtuse — they sum to 180°.']],
  lab:['circl',{mode:'angles'}],
  tasks:['Drag the central angle slider — the inscribed angle always halves it','Drag point C around the arc: inscribed angle refuses to change','Press the semicircle button and meet the guaranteed 90°'],
  ex:{t:'The central angle is 80°. What does the inscribed angle on the same arc say?',
      steps:[['Apply the theorem','Inscribed = ½ × central = ½ × 80 = 40°.'],
             ['Same-segment check','Move the rim point anywhere on the same arc — it stays 40°.'],
             ['Semicircle cousin','If the central angle were 180° (diameter), the inscribed angle would be 90° — Thales\' theorem.']]},
  gen(){
    const t=R(1,3);
    if(t===1){
      const c=pick([60,80,100,120,140,40]);
      return Q('An arc subtends '+c+'° at the centre. The angle it subtends at any point on the remaining circle is…',fr(c,2)+'°',[c+'°',(2*c)+'°',(180-c)+'°'],'Inscribed = half of central = '+c+'/2 = '+fr(c,2)+'°.','Centre sees double; rim sees half.');
    }
    if(t===2){
      const i=pick([25,35,45,55]);
      return Q('An inscribed angle on a circle is '+i+'°. The central angle on the same arc is…',(2*i)+'°',[i+'°',(180-i)+'°',(2*i+10)+'°'],'Central = 2 × inscribed = 2 × '+i+' = '+(2*i)+'°.','Double it for the centre.');
    }
    return Q('The angle subtended by a diameter at any point on the circle is…','90°',['180°','45°','60°'],'A diameter\'s arc is a semicircle: 180° at the centre → half of it, 90°, at the rim. (Thales\' theorem.)','Semicircle always frames a right angle.');
  }},

 {id:'circ4',t:'Cyclic Quadrilaterals',sub:'NCERT 9.6 · The roundabout four',
  irl:['Four friends around a bonfire holding a frame: opposite corners always add to 180° — the geometry of every circle camp','Musical chairs with 4 chairs on a round rug: opposite chair lines always make 180° together — fair spacing by theorem'],
  hook:{ic:'🎡',s:'Four friends stand anywhere on a circular roundabout and join hands — a cyclic quadrilateral. No matter where they stand, one law binds them: opposite corners ALWAYS sum to 180°. Move anyone, the angles rebalance like a see-saw. Geometry\'s roundabout has its own traffic rules.',
        w:'"Opposite angles supplementary" identifies cyclic quads, completes missing angles in one step, and appears in almost every circle question paper.'},
  facts:[['Definition','A quadrilateral with ALL four vertices on one circle is cyclic — the circle is its circumcircle.'],
         ['The big law','Opposite angles of a cyclic quadrilateral are SUPPLEMENTARY: ∠A + ∠C = 180°, ∠B + ∠D = 180°.'],
         ['Exterior twist','If a side is extended, the exterior angle equals the INTERIOR OPPOSITE angle.'],
         ['How it\'s proved','∠A = ½(arc BCD\'s major), ∠C = ½(the rest) — the two halves together sweep 360°, so the angles sum to 180°.']],
  lab:['circl',{mode:'cyclic'}],
  tasks:['Drag any corner — watch both opposite sums stay pinned at 180°','Make one angle 100° and read its opposite','Drag two corners to the same spot: what shape appears?'],
  ex:{t:'In a cyclic quadrilateral, ∠A = 100°. Find ∠C.',
      steps:[['Opposite pair','∠A and ∠C are opposite corners of the cyclic quad.'],
             ['Supplementary law','∠A + ∠C = 180° → ∠C = 180 − 100 = 80°.'],
             ['Sanity check','Move A around the circle: 100 + 80 holds like a magnet.']]},
  gen(){
    const t=R(1,2);
    if(t===1){
      const a=pick([70,85,100,110,95,120]);
      return Q('In a cyclic quadrilateral, one angle is '+a+'°. Its opposite angle is…',(180-a)+'°',[a+'°',(90-a)+'°',(2*a-180)+'°'],'Opposite angles of a cyclic quadrilateral are supplementary: 180 − '+a+' = '+(180-a)+'°.','Opposite corners always sum to 180°.');
    }
    const k=pick([2,3]),m=pick([3,4]);
    return Q('Opposite angles of a cyclic quad are in ratio '+k+' : '+m+'. The angles are…',(180*k/(k+m))+'° and '+(180*m/(k+m))+'°',['90° and 90°',(180*m/(k+m))+'° and '+(180*k/(k+m))+'°',(90*k/(k+m))+'° and '+(90*m/(k+m))+'°'],'They sum to 180° and split '+k+':'+m+': 180×'+k+'/'+(k+m)+' = '+(180*k/(k+m))+'° and 180×'+m+'/'+(k+m)+' = '+(180*m/(k+m))+'°.','Total 180°, divide in the given ratio.');
  }}
]}
,
{id:'area',n:'Area Arsenal',ch:'Chapter 10 · Heron\'s Formula',ic:'🏹',
 tag:'The formula that measures any triangle without ever needing a height.',
 boss:{n:'HERONIA',ti:'The Formula Witch',taunt:'No height? No altitude? Then you cannot measure my fields, Warrior. Heron guards me!',art:'witch'},
 concepts:[

 {id:'area1',t:'Heron\'s Formula',sub:'NCERT 10.1 · Area from three sides',
  irl:['Farmers size triangular plots from 3 boundary walls — no angles needed, Heron does everything','Kite makers cut sail cloth from three bamboo lengths: area known before the first cut, zero waste'],
  hook:{ic:'🪁',s:'At the Patang kite festival, a master kite-maker is asked: "How much paper is on that kite?" It is a scalene triangle — no height marked, no right angle anywhere. He smiles, measures only the three sides, computes one helper called s, and answers in ten seconds. Hero of Alexandria\'s 2000-year-old spell: Heron\'s formula.',
        w:'When the height is missing (and building it is messy), Heron\'s formula is the ONLY clean tool for area from sides — a guaranteed exam question.'},
  facts:[['Step 1 — the semi-perimeter','s = (a + b + c)/2. Half of the total boundary — usually a friendly number.'],
         ['Step 2 — the spell','Area = √(s(s − a)(s − b)(s − c)). Multiply all four factors first, THEN take the root.'],
         ['It needs NO height','That is the entire superpower: three sides in, area out — works for scalene, isosceles, anything valid.'],
         ['Sanity check','For 3, 4, 5: s = 6, Area = √(6·3·2·1) = √36 = 6 ✓ — matches the right-triangle shortcut ½·3·4.']],
  lab:['heron',{mode:'core'}],
  tasks:['Slide a, b, c to 3, 4, 5 and verify area 6','Push c past a + b and read the validity alarm','Find (s−a)(s−b)(s−c) for 13, 14, 15 — then the area'],
  ex:{t:'Find the area of a triangle with sides 13, 14, 15 cm.',
      steps:[['Semi-perimeter','s = (13 + 14 + 15)/2 = 21.'],
             ['Factors','s − a = 8, s − b = 7, s − c = 6.'],
             ['Assemble','Area = √(21 × 8 × 7 × 6) = √7056 = 84 cm². Beautiful and clean.']]},
  gen(){
    const t=R(1,2);
    if(t===1){
      const bank=[[13,14,15],[3,4,5],[5,12,13],[6,8,10],[9,12,15]];
      const [a,b,c]=pick(bank);
      return Q('The semi-perimeter of a triangle with sides '+a+', '+b+', '+c+' is…',fr(a+b+c,2),[String(a+b+c),(a+b+c)/3+'',' '+fr(a+b+c,2)+1],'s = (a + b + c)/2 = ('+a+' + '+b+' + '+c+')/2 = '+fr(a+b+c,2)+'.','Add all sides, halve the total.');
    }
    const bank=[[['3, 4, 5'],'6'],[['6, 8, 10'],'24'],[['5, 12, 13'],'30'],[['9, 12, 15'],'54'],[['13, 14, 15'],'84'],[['5, 5, 6'],'12'],[['10, 10, 12'],'48']];
    const [side,ar]=pick(bank);
    return Q('The area of a triangle with sides '+side+' is…',ar+' sq units',[(parseFloat(ar)*2)+' sq units',(parseFloat(ar)+1)+' sq units',fr(parseFloat(ar),2)+' sq units'],'Heron\'s formula: s = semi-perimeter, then Area = √(s(s−a)(s−b)(s−c)) = '+ar+'.','s first, then √(s(s−a)(s−b)(s−c)).');
  }},

 {id:'area2',t:'Heron in the Field',sub:'NCERT 10.2 · Applications & costs',
  irl:['Contractors quote paint and turf for triangular parks: area → litres → rupees, all from three sides','Splitting a triangular family plot fairly: shares are weighed in square metres, computed Heron-style'],
  hook:{ic:'🏗️',s:'The municipality hires you: "This triangular park — 122 m, 120 m, 22 m — needs a lawn at ₹5 per m². What\'s the bill?" One Heron computation stands between you and a ₹6,600 invoice. Real maths, real money, one formula.',
        w:'Application questions chain Heron with cost = area × rate. Compute the area precisely; the rupees follow automatically.'},
  facts:[['The workflow','Sides → s → Area → multiply by rate (₹/m²) → total cost.'],
         ['Split awkward shapes','A quadrilateral field splits along a diagonal into two triangles; Heron each, then add.'],
         ['Units discipline','Sides in metres → area in m². Mixing cm with m breaks everything — convert FIRST.'],
         ['The classic park','122, 120, 22: s = 132, factors 10, 12, 110 → Area = √(132·10·12·110) = √1742400 = 1320 m².']],
  lab:['heron',{mode:'field'}],
  tasks:['Load the 122-120-22 park preset and verify 1320 m²','Set the rate to ₹5/m² and compute the lawn bill','Try the two-triangle wall preset'],
  ex:{t:'Park 122 × 120 × 22 m; lawn cost ₹5 per m². Total bill?',
      steps:[['Heron step','s = (122 + 120 + 22)/2 = 132; factors: 10, 12, 110.'],
             ['Area','√(132 × 10 × 12 × 110) = √1742400 = 1320 m².'],
             ['Money','Cost = 1320 × 5 = ₹6,600. The invoice is ready.']]},
  gen(){
    const t=R(1,2);
    if(t===1){
      return Q('A triangular park has sides 122 m, 120 m, 22 m. Its area is…','1320 m²',['2640 m²','1220 m²','6600 m²'],'s = 132; Area = √(132 × 10 × 12 × 110) = √1742400 = 1320 m².','s = 132, then Heron.');
    }
    const rate=pick([3,4,5]);
    return Q('The 1320 m² park is fenced & lawn-ed at ₹'+rate+' per m². Total cost…','₹'+(1320*rate),['₹'+(1320*rate+100),'₹'+(1320+rate),'₹'+(1320*rate*2)],'Cost = area × rate = 1320 × '+rate+' = ₹'+(1320*rate)+'.','Area × rate.');
  }}
]}
,
{id:'sol',n:'Volume Vault',ch:'Chapter 11 · Surface Areas & Volumes',ic:'📦',
 tag:'Cones, spheres and cylinders — unwrap them, fill them, master them.',
 boss:{n:'SPHERAX',ti:'The Colossal Core',taunt:'I am a sphere of infinite density! Your little formulas will be CRUSHED — or will they, Warrior?',art:'colossus'},
 concepts:[

 {id:'sol1',t:'Cone Chronicles',sub:'NCERT 11.1 · Slant, surfaces & volume',
  irl:['Ice-cream cones and birthday caps: factories unroll the cone into a sector to cut material with zero waste','Temple shikhara and funnel covers: slant height decides exactly how much cloth or metal wraps it'],
  hook:{ic:'🍦',s:'Unroll a birthday-party cone hat: it flattens into a pizza-slice sector whose radius is the cone\'s SLANT l and whose curved edge is the base circumference 2πr. Fill a cone with water and pour into a same-base cylinder — exactly THREE pours fill it. Cone = ⅓ cylinder, forever.',
        w:'Cone formulas all hang off one Pythagoras relation l² = r² + h². Get l, and CSA, TSA, V all fall in line.'},
  facts:[['The slant link','l² = r² + h² — the slant is the hypotenuse of the hidden right triangle inside every cone.'],
         ['Surfaces','Curved surface = πrl (the unrolled sector). Total surface = πr(l + r): add the base circle πr².'],
         ['Volume = ⅓ cylinder','V = ⅓ πr²h. Three cones fill one cylinder of the same base and height.'],
         ['Classic triple','r = 7, h = 24 → l = 25 (7-24-25!). CSA = πrl = 22/7 × 7 × 25 = 550.']],
  lab:['solid',{mode:'cone'}],
  tasks:['Slide r and h — watch l update by Pythagoras','Press UNROLL and see the sector appear','Set r = 7, h = 24 and read CSA = 550'],
  ex:{t:'r = 7 cm, h = 24 cm. Find CSA, TSA and V.',
      steps:[['Slant first','l = √(49 + 576) = √625 = 25 cm.'],
             ['Surfaces','CSA = πrl = 22/7 × 7 × 25 = 550 cm². TSA = πr(l + r) = 22/7 × 7 × 32 = 704 cm².'],
             ['Volume','V = ⅓πr²h = ⅓ × 22/7 × 49 × 24 = 1232 cm³. Three clean answers, one triple.']]},
  gen(){
    const t=R(1,3);
    if(t===1){
      const bank=[[7,24,25],[3,4,5],[6,8,10],[5,12,13],[8,15,17],[9,12,15]];
      const [r,h,l]=pick(bank);
      return Q('A cone has radius '+r+' and height '+h+'. Its slant height is…',String(l),[String(r+h),String(l+2),String(l-1),'25','13','5'],'l = √(r² + h²) = √('+r*r+' + '+h*h+') = '+l+'.','Pythagoras: l² = r² + h².');
    }
    if(t===2){
      const bank=[['r = 7, l = 25: the curved surface area is','550 cm²',['704 cm²','385 cm²','154 cm²']],['r = 7, l = 25: the total surface area is','704 cm²',['550 cm²','616 cm²','462 cm²']]];
      const [q,a,ws]=pick(bank);
      return Q('For a cone with '+q+'…',a,ws,'πrl = 22/7 × 7 × 25 = 550; adding the base πr² = 154 gives TSA = 704.','CSA = πrl; TSA = πr(l + r).');
    }
    return Q('How many cones (same base, same height) fill a cylinder?','3',['2','4','1.5'],'V(cone) = ⅓ πr²h = exactly one-third of the cylinder — three pours.','The ⅓ is not a coincidence — it is the whole point.');
  }},

 {id:'sol2',t:'Sphere & Hemisphere',sub:'NCERT 11.2–11.3 · The round family',
  irl:['Football makers stitch surface area (leather) while players pump volume (air) — one ball, two formulas','Overhead hemisphere water tanks: capacity in litres and paint for the dome both come from the same r'],
  hook:{ic:'⚽',s:'Cut a football in half: inside, the curved skin of each half measures 2πr², plus one flat πr² face where the knife went — 3πr² in total, called a hemisphere\'s TSA. A sphere\'s whole skin is 4πr²: exactly the same as FOUR circles of its own shadow. Round objects are generous with formulas.',
        w:'Sphere and hemisphere formulas are pure memory marks. Learn the trio (4πr², 2πr², 3πr²) and the volumes, and the bank hands you full credit.'},
  facts:[['Sphere skin','Surface area = 4πr². (Fun: = 4 × the area of its great-circle shadow πr².)'],
         ['Hemisphere skin','Curved = 2πr² (half the sphere). TSA = 2πr² + πr² = 3πr² (curved + flat face).'],
         ['Volumes','Sphere: V = 4/3 πr³. Hemisphere: V = 2/3 πr³ (half of the sphere\'s).'],
         ['r = 7 classics','Sphere SA = 4 × 22/7 × 49 = 616. Hemisphere TSA = 3 × 22/7 × 49 = 462. Hemisphere CSA = 308.']],
  lab:['solid',{mode:'sphere'}],
  tasks:['Slide r and read 4πr² live','Cut the sphere — hemisphere mode: verify 2πr² + πr²','Set r = 7 and check the classic 616'],
  ex:{t:'Find the total surface area of a hemisphere of radius 7 cm.',
      steps:[['Curved half','CSA = 2πr² = 2 × 22/7 × 49 = 308 cm².'],
             ['Flat face','The cut face is a circle: πr² = 154 cm².'],
             ['Total','TSA = 308 + 154 = 462 cm² (or directly 3πr²).']]},
  gen(){
    const t=R(1,3);
    if(t===1){
      const r=pick([7,14]);
      const sa=4*(22/7)*r*r;
      return Q('Surface area of a sphere of radius '+r+' cm (π = 22/7)…',sa+' cm²',[2*sa+' cm²',sa/2+' cm²',(sa-154)+' cm²'],'SA = 4πr² = 4 × 22/7 × '+r+'² = '+sa+' cm².','4 × 22/7 × r².');
    }
    if(t===2){
      const r=pick([7,14]);
      const tsa=3*(22/7)*r*r;
      return Q('TOTAL surface area of a hemisphere of radius '+r+' cm…',tsa+' cm²',[2*tsa/3+' cm²',(2*tsa/3)+' cm²',4*(22/7)*r*r+' cm²',tsa+10+' cm²'],'TSA = 3πr² = 3 × 22/7 × '+r+'² = '+tsa+' cm² (curved 2πr² + flat πr²).','3πr² — do not forget the flat face!');
    }
    return Q('How many small spheres of radius 2 cm melt into one sphere of radius 6 cm?','27',['8','9','3'],'Volume scales as r³: (6/2)³ = 27 small spheres fit into the big one.','Ratio of radii CUBED.');
  }},

 {id:'sol3',t:'Cylinder City',sub:'NCERT 11.2 · Unrolling the drum',
  irl:['LPG cylinders and water drums: the printed litres are πr²h — volume you can verify yourself','Soft-drink can labels: unrolled, a rectangle wrapping the curve — the paper industry cuts them by formula'],
  hook:{ic:'🛢️',s:'Peel the label off a can of juice: it flattens into a rectangle whose width is the can\'s circumference 2πr and height is the can\'s height h — that is the curved surface. The tin top and bottom are two circles. Volume? Just stack circles: base area × height, πr²h.',
        w:'Cylinders are the friendliest solid: unwrap the label (CSA), add two lids (TSA), fill the stack (V). Water-tank questions always end in litres: 1000 cm³ = 1 L.'},
  facts:[['Unroll the label','CSA = 2πrh — a rectangle of width 2πr (circumference) and height h.'],
         ['Add the lids','TSA = 2πr(r + h): CSA plus two circular ends 2πr².'],
         ['Fill the stack','V = πr²h = base area × height.'],
         ['Litres rule','1000 cm³ = 1 litre. A 1540 cm³ tank holds 1.54 L.']],
  lab:['solid',{mode:'cylinder'}],
  tasks:['Slide r and h, then UNROLL the label into the rectangle','Read CSA = 2πrh from the unrolled width × height','Convert a 1540 cm³ volume into litres'],
  ex:{t:'r = 7 cm, h = 10 cm. Find CSA, TSA and V.',
      steps:[['Curved surface','CSA = 2πrh = 2 × 22/7 × 7 × 10 = 440 cm².'],
             ['Total surface','TSA = 2πr(r + h) = 2 × 22/7 × 7 × 17 = 748 cm².'],
             ['Volume','V = πr²h = 22/7 × 49 × 10 = 1540 cm³ = 1.54 litres.']]},
  gen(){
    const t=R(1,3);
    if(t===1){
      const bank=[[7,5,220],[7,10,440],[14,10,880],[7,15,660],[14,5,440]];
      const [r,h,csa]=pick(bank);
      return Q('A cylinder has r = '+r+' cm, h = '+h+' cm. Its curved surface area (π = 22/7) is…',csa+' cm²',[(csa*2)+' cm²',(csa/2)+' cm²',(csa+154)+' cm²'],'CSA = 2πrh = 2 × 22/7 × '+r+' × '+h+' = '+csa+' cm².','2 × 22/7 × r × h.');
    }
    if(t===2){
      const bank=[[7,10,1540],[7,20,3080],[14,15,9240],[7,5,770]];
      const [r,h,v]=pick(bank);
      return Q('Volume of a cylinder with r = '+r+' cm, h = '+h+' cm (π = 22/7)…',v+' cm³',[(v*2)+' cm³',(v/2)+' cm³',(v+77)+' cm³'],'V = πr²h = 22/7 × '+r+'² × '+h+' = '+v+' cm³.','22/7 × r² × h.');
    }
    return Q('A tank of volume 1540 cm³ holds how many litres?','1.54 L',['15.4 L','154 L','0.154 L'],'1000 cm³ = 1 L, so 1540 cm³ = 1.54 L.','Divide cm³ by 1000.');
  }}
]}
,
{id:'dat',n:'Data Dungeon',ch:'Chapter 12 · Statistics',ic:'📊',
 tag:'Tame raw scores, build histograms and deploy the three averages.',
 boss:{n:'DATAMORG',ti:'The Whispering Vault',taunt:'A thousand numbers whisper in my vault. Find your mean among them… if you can!',art:'cube'},
 concepts:[

 {id:'dat1',t:'Taming Raw Data',sub:'NCERT 12.1 · Range & frequency',
  irl:['Cricket scorecards tame chaos: 300 balls of raw data become overs, frequencies and strike rates','Class attendance registers: range and frequency instantly flag who is drifting away'],
  hook:{ic:'🏏',s:'Coach Bhatia has 20 run-scores scribbled on a napkin: 6, 2, 0, 4, 6, 1, 3, … chaos. "Tell me about my team," she says. You cannot answer from a napkin — but a frequency table turns the mess into a story: who scored ducks, how many fifties, the spread. Data\'s first law: organise before you conclude.',
        w:'Range and frequency tables are the entry ticket to all statistics — and "class width" questions are free marks if you know the three definitions.'},
  facts:[['Raw → organised','Raw data is an unsorted list; an ARRAY sorts it. Range = maximum − minimum: the total spread.'],
         ['Frequency','Frequency of a value = how many times it occurs. Tally marks (||||) keep the count honest.'],
         ['Grouped data','For wide ranges, bundle values into class intervals like 0–10, 10–20; class width = upper − lower of one class.'],
         ['Classes touch','In continuous grouping, the upper limit of one class IS the lower limit of the next — no gaps, no overlaps in counting.']],
  lab:['stats',{mode:'table'}],
  tasks:['Build the frequency table of the 20 scores — use the tally','Compute the range from the raw list','Set the class width and watch the intervals form'],
  ex:{t:'Data: 3, 7, 3, 2, 9, 7, 3. Find range and frequency of 3.',
      steps:[['Range','Max 9, min 2 → range = 9 − 2 = 7.'],
             ['Frequency','The value 3 appears three times → frequency 3.'],
             ['Read','The table now tells the story instantly: 3 is the most common score (mode, as it happens).']]},
  gen(){
    const t=R(1,3);
    if(t===1){
      const base=R(10,40),list=[];for(let i=0;i<6;i++)list.push(base+R(0,30));
      const mx=Math.max(...list),mn=Math.min(...list);
      return Q('The range of the data '+list.join(', ')+' is…',String(mx-mn),[String(mx),String(mn),String(mx+mn),String(mx-mn+2)],'Range = max − min = '+mx+' − '+mn+' = '+(mx-mn)+'.','Largest minus smallest.');
    }
    if(t===2){
      const list=[];for(let i=0;i<8;i++)list.push(R(1,6));
      const target=R(1,6);
      const f=list.filter(x=>x===target).length;
      return Q('In the data '+list.join(', ')+', the frequency of '+target+' is…',String(f),[String(f+1),String(f+2),String(Math.max(1,f-1))],'Count the '+target+'s: it appears '+f+' time(s).','Just count them.');
    }
    return Q('Scores are grouped into classes 0–10, 10–20, 20–30. The class width is…','10',['5','20','30'],'Class width = upper limit − lower limit = 10 − 0 = 10 for every class here.','Upper minus lower of one class.');
  }},

 {id:'dat2',t:'Bars & Histograms',sub:'NCERT 12.1 · Picture the data',
  irl:['Weather apps draw rainfall as bars per day — a chart you consult every single morning','Fitness bands: steps-per-hour bars show exactly when you moved — continuous bins, histogram style'],
  hook:{ic:'📈',s:'A bar chart of "favourite subject" shows Maths towering — bars with GAPS, one per category. A histogram of marks shows classes 0–10, 10–20… bars TOUCHING, because the data flows continuously. Choose the wrong chart and a statistician somewhere sheds a tear.',
        w:'Histograms answer "how many in each class" at a glance; exams ask you to read, draw, and pick between bar graph and histogram correctly.'},
  facts:[['Bar graph = categories','Distinct categories (subjects, colours) → bars with equal widths and GAPS between them.'],
         ['Histogram = continuous classes','Grouped continuous data → bars TOUCHING, width = class width, no gaps.'],
         ['Height = frequency','In both charts, bar height is the frequency — read values straight off.'],
         ['Tallest tells the mode-class','The highest bar marks the modal class of grouped data — a favourite one-mark question.']],
  lab:['stats',{mode:'chart'}],
  tasks:['Toggle bar-graph ↔ histogram and watch the gaps vanish','Click each bar to read its frequency','Find the modal class (tallest bar)'],
  ex:{t:'Marks: 0–20:4, 20–40:7, 40–60:12, 60–80:5, 80–100:2. Read the story.',
      steps:[['Choose the chart','Continuous class intervals → HISTOGRAM, bars touching.'],
             ['Read the peak','The tallest bar is 40–60 with 12 students → modal class.'],
             ['Total','4 + 7 + 12 + 5 + 2 = 30 students appeared. One picture, whole story.']]},
  gen(){
    const t=R(1,2);
    if(t===1){
      return Q('Marks are grouped as 0–10, 10–20, … The correct graph is a…','Histogram (continuous classes, no gaps)',['Bar graph with gaps','Pie chart','Line graph only'],'Continuous grouped data demands a histogram — bars touch because 10 ends one class and starts the next.','Continuous → histogram; categories → bar graph.');
    }
    const freqs=[R(2,5),R(6,9),R(10,14),R(3,7),R(1,4)];
    const total=freqs.reduce((a,b)=>a+b,0);
    return Q('A histogram has bar frequencies '+freqs.join(', ')+'. How many students in total?',String(total),[String(total+2),String(total-1),String(Math.max(...freqs))],'Add all bar heights: '+freqs.join(' + ')+' = '+total+'.','Sum the frequencies.');
  }},

 {id:'dat3',t:'Mean, Median, Mode',sub:'NCERT 12.2–12.3 · The three averages',
  irl:['Cricket batting average is a mean; median house price stops one billionaire from skewing the colony average; shoe shops stock the MODE size','Report cards: your aggregate % is a weighted mean across subjects — every result day is statistics day'],
  hook:{ic:'🏆',s:'Five friends\' salaries: 10k, 12k, 12k, 14k, 200k (the boss walked in). Mean = 49.6k — absurd! Median = 12k — honest. Mode = 12k — the crowd\'s choice. One dataset, three averages, three different truths. Choosing the RIGHT average is a life skill (and an exam question).',
        w:'Mean uses every value, median ignores extremes, mode reports popularity. Know all three and how outliers wreck exactly one of them.'},
  facts:[['Mean = Σx / n','Add everything, divide by count. Uses all data, but one huge outlier drags it far away.'],
         ['Median = the middle','SORT first. Odd n → middle value. Even n → mean of the two middle values.'],
         ['Mode = the crowd\'s choice','The most frequent value. A list can have no mode, one mode, or several.'],
         ['Outlier drama','Salaries 10k,12k,12k,14k,200k: mean 49.6k (misleading!), median 12k (truthful), mode 12k.']],
  lab:['stats',{mode:'averages'}],
  tasks:['Add and remove values — watch mean, median, mode move','Insert one giant outlier and see who survives','Build a dataset with NO mode, then one with two modes'],
  ex:{t:'Data: 4, 6, 5, 6, 9. Find mean, median, mode.',
      steps:[['Mean','(4 + 6 + 5 + 6 + 9)/5 = 30/5 = 6.'],
             ['Median','Sort: 4, 5, 6, 6, 9. Middle (3rd) = 6.'],
             ['Mode','6 appears twice, others once → mode = 6. All three agree at 6!']]},
  gen(){
    const t=R(1,3);
    if(t===1){
      const n=5,nums=[];let sum=0;
      for(let i=0;i<n;i++){const v=R(2,18);nums.push(v);sum+=v}
      if(sum%5!==0)return this.gen();
      return Q('The mean of '+nums.join(', ')+' is…',String(sum/5),[String(sum/5+1),String(sum/5-1),String(sum),'0'],'Mean = ('+nums.join(' + ')+')/5 = '+sum+'/5 = '+(sum/5)+'.','Add all, divide by 5.');
    }
    if(t===2){
      const nums=shuf([3,5,7,9,11,13]).slice(0,R(0,1)+5);
      const sorted=[...nums].sort((a,b)=>a-b);
      const n=sorted.length;
      const med=n%2?sorted[(n-1)/2]:(sorted[n/2-1]+sorted[n/2])/2;
      return Q('The median of '+nums.join(', ')+' is…',String(med),[String(med+1),String(med-1),String(nums[0]),String(sorted[n-1])],'Sort: '+sorted.join(', ')+'. Middle position → '+med+'.','SORT first, then take the middle.');
    }
    const mode=pick([4,6,8]);
    const list=shuf([mode,mode,pick([2,3,5]),pick([7,9,11]),pick([1,2,12])]);
    return Q('The mode of '+list.join(', ')+' is…',String(mode),[String(mode+1),String(mode-1),String(list[0])],'Mode = most frequent value. '+mode+' appears twice — more than any other.','Count which value repeats.');
  }}
]}
);
</script>
