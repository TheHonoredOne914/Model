<script>
'use strict';
/* ================= WORLD DATA · part 2 (euc, ang, tri, quad) ================= */

WORLDS.push(
{id:'euc',n:'Euclid\'s Emporium',ch:'Chapter 5 · Introduction to Euclid\'s Geometry',ic:'📜',
 tag:'Build ALL of geometry from a handful of unbreakable seeds.',
 boss:{n:'AXIOMON',ti:'The Unquestionable',taunt:'My postulates have stood for 2300 years. What makes you think YOU can question them, Warrior?',art:'golem2'},
 concepts:[

 {id:'euc1',t:'Axioms & Postulates',sub:'NCERT 5.1–5.2 · The seeds of geometry',
  irl:['UPI works because every step follows trusted rules nobody re-verifies — axioms are the terms & conditions of mathematics','Architects prove a whole building from a few guaranteed assumptions — exactly Euclid proving a world from 5 postulates'],
  hook:{ic:'🏛️',s:'Alexandria, 300 BC. In the great library, Euclid refuses to assume ANYTHING without proof. He boils geometry down to a handful of "obvious truths" — axioms for all of maths, five postulates for geometry — and then, brick by brick, builds 465 theorems. When a king demands a shortcut, Euclid replies: "There is no royal road to geometry."',
        w:'Every proof you will ever write stands on these seeds. Exams directly test the postulates — and rightly so: they are the constitution of geometry.'},
  facts:[['Axiom vs postulate','Axioms are self-evident truths used across ALL of maths ("things equal to the same thing are equal"). Postulates are the five truths specific to geometry.'],
         ['The five postulates','1) A line can be drawn through any two points. 2) A segment extends endlessly. 3) A circle with any centre & radius exists. 4) All right angles are equal. 5) The parallel postulate.'],
         ['The 5th postulate, decoded','If a transversal makes the interior angles on one side sum to LESS than 180°, the two lines meet on that side.'],
         ['Two handy axioms','"If equals are added to equals, wholes are equal." "Things which are halves of the same thing are equal to one another."']],
  lab:['post',{set:'postulates'}],
  tasks:['Step through all five postulate cards with their pictures','Answer the mini-checks on each card','Spot which postulate the parallel-postulate card rewrites'],
  ex:{t:'Apply Euclid\'s axioms',
      steps:[['Chain of equality','A = B and B = C. By Axiom 1 (things equal to the same thing are equal): A = C.'],
             ['Halves work too','If A = B, then A/2 = B/2 — "halves of equals are equal" is a real Euclid axiom.'],
             ['Where you already use it','Proving triangles congruent by ASA quietly uses "equals added to equals are equal" every time you add angle to side.']]},
  gen(){
    const t=R(1,3);
    if(t===1){
      const which=Math.random()<0.5;
      if(which){
        return Q('How many distinct lines can pass through TWO different points?','Exactly one',['Exactly two','Infinitely many','None'],'Postulate 1 (with the "two distinct points" reading): a unique straight line joins them.','Two points force one and only one line.');
      }
      return Q('How many lines can pass through a SINGLE point?','Infinitely many',['Exactly one','Exactly two','None'],'Spin a line around the point — every direction works, so infinitely many lines pass through one point.','One point leaves the direction free!');
    }
    if(t===2){
      const bank=[['If a = b and b = c, then a = c','Axiom: things equal to the same thing are equal','Postulate 5','Postulate 3','A definition'],['Things which are halves of the same thing are…','Equal to one another','Double one another','Unequal','Neither'],['Euclid\'s 5th postulate is about…','When two lines meet (interior angle sum < 180°)','Circles','Right angles','Measuring areas']];
      const b=pick(bank);
      return Q(b[0],b[1],[b[2],b[3],b[4]],'Straight from Euclid\'s list — know the exact statements, they are asked verbatim.','Recall the exact wording of the axioms/postulates.');
    }
    return Q('"A circle can be drawn with any centre and any radius" is…','Postulate 3',['Postulate 1','Postulate 5','Axiom 2'],'Circles belong to geometry, so it is a POSTULATE — the third one.','Postulates = geometry-only truths.');
  }},

 {id:'euc2',t:'Theorems from Seeds',sub:'NCERT 5.2 · Equivalent versions of the 5th',
  irl:['Railway tracks are the fifth postulate made real: parallel lines that never meet, trusted by a billion journeys','Ruled notebook lines and zebra crossings: parallel-line reasoning keeps the world aligned'],
  hook:{ic:'⚖️',s:'Two long highways leave Delhi heading "almost the same way". Can they cross TWICE? Imagine it: two crossings would mean both highways pass through the same two towns — forcing them to be one and the same road. Contradiction! This tiny argument is your first real THEOREM.',
        w:'A theorem is a statement PROVED from axioms. Learning how the proof fights a contradiction is the real skill of this chapter.'},
  facts:[['Theorem 5.1','Two distinct lines cannot have more than one point in common. Proof by contradiction: two common points would make them the same line.'],
         ['Playfair\'s version','Through a point NOT on a given line, exactly ONE line can be drawn parallel to the given line.'],
         ['Sum version (equivalent)','If a transversal makes co-interior angles sum to 180°, the lines are parallel — and vice versa.'],
         ['Undefined on purpose','Point, line and plane are left UNDEFINED — everything else is built on top of them.']],
  lab:['post',{set:'theorems'}],
  tasks:['Walk the contradiction proof card by card','Match Playfair\'s version to the 5th postulate','Decide: can two lines share exactly one point? (Yes — that is normal crossing!)'],
  ex:{t:'Prove: two distinct lines cannot intersect twice',
      steps:[['Assume the opposite','Suppose lines l and m intersect at TWO points P and Q.'],
             ['Force the conclusion','Then both l and m pass through P and Q. But through two distinct points there is exactly ONE line (Postulate 1).'],
             ['Contradiction!','So l = m — they were never distinct. Our assumption fails: two distinct lines meet at most once. ∎']]},
  gen(){
    const t=R(1,3);
    if(t===1){
      return Q('Two distinct lines in a plane can have at most…','1 common point',['2 common points','Infinitely many common points','0 or 2 common points'],'If they shared two points they would be the same line (Postulate 1) — contradiction. So at most one crossing.','Two crossings would force the lines to merge.');
    }
    if(t===2){
      return Q('Through a point P NOT on line l, how many lines are parallel to l?','Exactly one (Playfair)',['Exactly two','Infinitely many','None'],'Playfair\'s axiom — the modern face of Euclid\'s 5th postulate — guarantees a unique parallel through P.','Parallel postulate = uniqueness of the parallel.');
    }
    return Q('A transversal makes co-interior angles 70° and 110°. The lines are…','Parallel (sum is 180°)',['Intersecting','Perpendicular','Coincident'],'70 + 110 = 180° → the co-interior sum version of the 5th postulate fires: the lines never meet.','Co-interior sum = 180° ⟺ parallel.');
  }}
]}
,
{id:'ang',n:'Angle Realm',ch:'Chapter 6 · Lines and Angles',ic:'📐',
 tag:'Complementary twins, linear pairs, and the great transversal chase.',
 boss:{n:'VERTEXA',ti:'The Angle Queen',taunt:'Ninety, one-eighty, spin, REPEAT. Get one angle wrong and my crown grows, Warrior!',art:'spider'},
 concepts:[

 {id:'ang1',t:'Angle Pairs',sub:'NCERT 6.1 · Pairs of angles',
  irl:['Clock hands: 3:00 is a complementary 90°, 6:00 a supplementary 180° — time-telling is angle-pair reading','Pizza cuts: two straight slices through one point make vertically opposite equal pieces — fair shares, guaranteed'],
  hook:{ic:'🕒',s:'Look at a clock at 3:00 — the hands sit at 90°. At 6:00 they open to 180°, a perfect straight line. Now cross two scissors blades: the opposite openings always MATCH, no matter how you cut. Clocks and scissors are secretly teaching you complementary, supplementary and vertically opposite angles.',
        w:'Angle-pair rules turn "find x" questions into 10-second wins — and they are the engine of every geometry proof ahead.'},
  facts:[['Complementary: sum 90°','40° + 50° = 90°, so each is the other\'s complement. Adjacent or not — only the SUM matters.'],
         ['Supplementary: sum 180°','110° + 70° = 180°. A linear pair is a supplementary pair that ALSO shares a vertex and arm.'],
         ['Linear pair axiom','If a ray stands on a line, the two angles formed sum to 180°. The converse holds too.'],
         ['Vertically opposite: always equal','When two lines cross, the opposite angles are equal — because each pair is supplementary to the SAME middle angle.']],
  lab:['trans',{mode:'pair'}],
  tasks:['Drag the ray to make a 60° angle — its complement shows automatically','Slide to 120° and read the supplement','Cross the two lines and verify opposite angles match at every turn'],
  ex:{t:'(2x + 30)° and (3x − 10)° form a linear pair. Find x.',
      steps:[['Linear pair = 180°','(2x + 30) + (3x − 10) = 180.'],
             ['Simplify','5x + 20 = 180 → 5x = 160.'],
             ['Solve','x = 32. Check: 94° + 86° = 180° ✓']]},
  gen(){
    const t=R(1,3);
    if(t===1){
      const x=pick([20,35,45,55,60,72]);
      return Q('The complement of '+x+'° is…',(90-x)+'°',[(180-x)+'°',(90+x)+'°',(270-x)+'°'],'Complement adds to 90°: 90 − '+x+' = '+(90-x)+'°.','Complement → 90. Supplement → 180.');
    }
    if(t===2){
      const x=pick([65,110,85,120,95,40]);
      return Q('The supplement of '+x+'° is…',(180-x)+'°',[(90-x)+'°',(180+x)+'°',(360-x)+'°'],'Supplement adds to 180°: 180 − '+x+' = '+(180-x)+'°.','Complement → 90. Supplement → 180.');
    }
    const a=R(20,70),b=180-a;
    return Q('Two angles form a linear pair. One is '+a+'°. The other is…',b+'°',[(90-a)+'°',(180-a)+'°'.replace('180','170'),(360-a)+'°'],'A linear pair sums to 180°: 180 − '+a+' = '+b+'°. (They also share a vertex and an arm.)','Linear pair = supplementary neighbours.');
  }},

 {id:'ang2',t:'The Transversal Chase',sub:'NCERT 6.2 · Parallel lines & transversal',
  irl:['Railway sleepers crossing two parallel rails make equal alternate angles every time — trains stay on track by theorem','Window grills and ladders on walls: the crossing bar creates F, Z and C patterns that builders trust daily'],
  hook:{ic:'🚆',s:'Two railway tracks run parallel while a footbridge crosses them at a slant — a transversal. Suddenly eight angles appear, and they are not strangers: four of them are clones of each other, four are the other clones. Railway engineers never measure all eight. They measure ONE and copy.',
        w:'Corresponding, alternate, co-interior — these three relationships solve every parallel-line question the board can throw at you.'},
  facts:[['Corresponding angles = equal','Same relative position at each crossing (both top-right, etc.). Equal when lines are parallel.'],
         ['Alternate interior = equal','Z-shape angles inside the parallel lines, on opposite sides of the transversal.'],
         ['Co-interior = supplementary','C-shape angles inside, same side of transversal: they sum to 180°.'],
         ['The converse cracks proofs','If ANY pair of corresponding angles is equal, the lines MUST be parallel — this is how you prove parallelism.']],
  lab:['trans',{mode:'parallel'}],
  tasks:['Rotate the transversal and tap an angle — find its corresponding clone','Tap an angle to highlight its alternate partner (Z-shape!)','Check: co-interior partners always add to 180°'],
  ex:{t:'One angle of the transversal family is 65°. Find the rest.',
      steps:[['Clone the correspondings','All four corresponding copies of 65° are 65°.'],
             ['Fill the supplements','Each 65° partner on the straight line: 180 − 65 = 115°. So the other four are 115°.'],
             ['Verify with co-interior','65 + 115 = 180° ✓ and the Z-pairs match (65 = 65) ✓. Eight angles, two values.']]},
  gen(){
    const t=R(1,3);
    if(t===1){
      const a=pick([55,65,72,110,125]);
      const alt=(a>90)?(180-a):a;
      return Q('Two parallel lines are cut by a transversal. One angle is '+a+'°. Its ALTERNATE interior angle is…',alt+'°',[(180-a)+'°',(90-a)+'°',a+'°'===alt+'°'?'70°':(a+10)+'°'],'Alternate interior angles are EQUAL when lines are parallel. (Here the alternate interior pair works out to '+alt+'°.)','Alternate → equal. Co-interior → sum 180°.');
    }
    if(t===2){
      const x=pick([20,30,40]),base=2*x+30;
      return Q('Corresponding angles are (2x + 30)° and '+base+'°. Find x.',String(x),[String(x+5),String(x-5),String(x+10),String(2*x)],'Corresponding angles are equal: 2x + 30 = '+base+' → 2x = '+(base-30)+' → x = '+x+'.','Set them equal and solve.');
    }
    const x=pick([50,60,70]);
    return Q('Co-interior angles are (x + 40)° and '+x+'°. Find x.',String(x),[String(x+10),String(x-10),String(x+20)],'Co-interior angles sum to 180°: (x + 40) + '+x+' = 180 → 2x = 140 → x = '+x+'.','Co-interior → add to 180°.');
  }},

 {id:'ang3',t:'Angle Sum & the Exterior',sub:'NCERT 6.7–6.8 · Triangle angle properties',
  irl:['Roof trusses: three angles locked to 180° is why triangular roof frames never fold','Kite frames: measure two angles and the third is forced — a 180° budget with no negotiating'],
  hook:{ic:'📄',s:'Tear the three corners off any paper triangle and place them tip-to-tip: they snap into a perfect straight line — 180°, every single time. And if you stretch one side of the triangle outward, the "outside" angle it makes equals the two far corners ADDED. Paper tears don\'t lie.',
        w:'Angle sum 180° and exterior angle theorem are the two most-used facts in school geometry. Instant marks, forever useful.'},
  facts:[['Angle sum property','The three interior angles of ANY triangle sum to exactly 180° — acute, right or obtuse, no exceptions.'],
         ['Exterior angle theorem','An exterior angle = sum of the two REMOTE interior angles (the two it is not next to).'],
         ['Straight-line bonus','Exterior angle + its adjacent interior angle = 180° (linear pair).'],
         ['Instant use','Knowing any two angles hands you the third: third = 180° − (given + given).']],
  lab:['trisum',{}],
  tasks:['Drag the apex vertex and watch the sum freeze at 180°','Make one angle 90° and read the other two\'s relationship','Switch on the exterior angle and verify it equals the two remote angles'],
  ex:{t:'Two angles of a triangle are 50° and 60°. Find the third, and the exterior at it.',
      steps:[['Angle sum','Third = 180 − (50 + 60) = 70°.'],
             ['Exterior angle','Exterior at that vertex = 180 − 70 = 110° (linear pair).'],
             ['Cross-check','Remote angles 50 + 60 = 110° ✓ — the exterior angle theorem agrees.']]},
  gen(){
    const t=R(1,3);
    if(t===1){
      const a=pick([40,50,55,65,70]),b=pick([60,45,80,35,50]);
      return Q('Two angles of a triangle are '+a+'° and '+b+'°. The third angle is…',(180-a-b)+'°',[(180-a)+'°',(180-b)+'°',(90-a-b)+'°',a+b+'°'],'180 − ('+a+' + '+b+') = '+(180-a-b)+'°.','Sum of all three = 180°.');
    }
    if(t===2){
      return Q('Angles of a triangle are x, 2x and 3x. Then x = …','30°',['20°','45°','36°'],'x + 2x + 3x = 180 → 6x = 180 → x = 30°. The angles are 30°, 60°, 90°.','Add the parts, equate to 180°.');
    }
    const a=pick([35,40,50]),b=pick([55,65,60]);
    return Q('An exterior angle of a triangle equals the sum of remote interiors. If the remote angles are '+a+'° and '+b+'°, the exterior angle is…',(a+b)+'°',[(180-a-b)+'°',(180-(a+b))+'°',(a+b+180)+'°','90°'],'Exterior = '+a+' + '+b+' = '+(a+b)+'°. (The adjacent interior would be '+(180-a-b)+'°.)','Exterior angle = sum of the two remote interior angles.');
  }}
]}
,
{id:'tri',n:'Triangle Territory',ch:'Chapter 7 · Triangles',ic:'🔺',
 tag:'Congruence duels, isosceles twins and the inequality gatekeeper.',
 boss:{n:'TRIGON',ti:'The Three-Eyed Tyrant',taunt:'Three eyes. Three sides. Zero mercy. Your puny CPCT will not save you here!',art:'brute'},
 concepts:[

 {id:'tri1',t:'Congruence Rules',sub:'NCERT 7.1 · SSS, SAS, ASA, RHS',
  irl:['Factory quality control: identical tiles pass when three measurements match — SSS on a production line','Forensics match tyre marks with SAS: same angle between same-length gaps means the same vehicle'],
  hook:{ic:'🔑',s:'A locksmith copies a key not by tracing every millimetre but by matching the few cuts that MATTER. Triangles work identically: check just three carefully-chosen parts, and the whole triangle is forced. That is why SSS, SAS, ASA and RHS are called congruence RULES — shortcut passports to identical triangles.',
        w:'CPCT (Corresponding Parts of Congruent Triangles) then unlocks every remaining side and angle for free. Proof-writing starts here.'},
  facts:[['Congruent = identical','Same size AND shape; superimpose one on the other and they coincide exactly. Symbol: ≅.'],
         ['SSS / SAS','SSS: all three pairs of sides equal. SAS: two sides AND the angle BETWEEN them equal.'],
         ['ASA / RHS','ASA: two angles and the INCLUDED side equal. RHS: right angle + hypotenuse + one side (right triangles only).'],
         ['AAA is a trap!','Three equal angles only make triangles SIMILAR (same shape, any size) — NOT congruent. Examiners love this trap.']],
  lab:['congr',{}],
  tasks:['Match all three sliders of both triangles and trigger the CPCT snap','Read which rule lights up when only two sides + included angle match','Try AAA (angles only) and watch it FAIL to snap'],
  ex:{t:'ΔABC ≅ ΔPQR by SSS. What follows?',
      steps:[['The given','AB = PQ, BC = QR, CA = RP — three side pairs equal.'],
             ['Invoke CPCT','Corresponding parts of congruent triangles are equal: ∠A = ∠P, ∠B = ∠Q, ∠C = ∠R automatically.'],
             ['Why this matters','We never measured those angles — congruence hands them to us free. This is the backbone of all Chapter 7 proofs.']]},
  gen(){
    const t=R(1,3);
    if(t===1){
      const bank=[['Three pairs of equal sides','SSS'],['Two sides and the angle between them','SAS'],['Two angles and the included side','ASA'],['Right angle, hypotenuse and a side','RHS'],['Two sides and a NON-included angle','Not enough information']];
      const b=pick(bank);
      return Q('The congruence rule that needs: '+b[0]+'…',b[1],['SSS','SAS','ASA','RHS','AAS'].filter(s=>s!==b[1]).slice(0,3),b[0]+' is exactly the definition of the '+b[1]+' rule.','Match the checklist to the rule name.');
    }
    if(t===2){
      return Q('Two triangles have all three angles equal (AAA). They are…','Similar but NOT necessarily congruent',['Congruent by AAA','Congruent by ASA','Never related'],'Equal angles fix the SHAPE but not the SIZE — one triangle may be a giant copy of the other. That is similarity.','AAA lacks any side — size is free.');
    }
    return Q('ΔABC ≅ ΔDEF. Then side AC equals…','DF',['DE','EF','ED'],'Match the letters: A↔D, B↔E, C↔F. First-and-third letters: AC ↔ DF.','Correspondence order matters — read the letter positions!');
  }},

 {id:'tri2',t:'Isosceles Tales',sub:'NCERT 7.2 · Angles opposite equal sides',
  irl:['A tent with two equal guy-ropes gets equal base angles — that symmetry is why tents survive the wind','The India Gate arch and isosceles roof trusses look grand because equal slopes echo each other'],
  hook:{ic:'⛺',s:'Every tent, roof truss and samosa is an isosceles triangle — two equal sides meeting at a peak. Fold a paper triangle down its middle and the two base angles land exactly on each other. The fold line is nature\'s proof: equal sides face equal angles.',
        w:'The isosceles theorem and its converse let you trade side-information for angle-information instantly — a staple of exam geometry.'},
  facts:[['The theorem','In any triangle, angles opposite EQUAL sides are equal. (Equal sides ↔ equal angles.)'],
         ['The converse','If two angles of a triangle are equal, the sides opposite them are equal too.'],
         ['Equilateral = 60/60/60','All three sides equal → all three angles 60°. The most democratic triangle.'],
         ['Apex bonus','In an isosceles triangle, the median from the apex is also the altitude and the angle bisector — three jobs, one line.']],
  lab:['isos',{mode:'apex'}],
  tasks:['Slide the apex angle and watch both base angles mirror each other','Make the apex 60° and meet the equilateral triangle','Use the converse: equal angles force equal sides'],
  ex:{t:'An isosceles triangle has apex angle 40°. Find the base angles.',
      steps:[['Equal sides → equal angles','The two base angles opposite the equal sides are equal: call each x.'],
             ['Angle sum','x + x + 40 = 180 → 2x = 140.'],
             ['Result','x = 70°. Both base angles are 70°. (Converse check: 70 = 70 ✓)']]},
  gen(){
    const t=R(1,3);
    if(t===1){
      const apex=pick([40,60,80,100,20,50]);
      return Q('An isosceles triangle has apex angle '+apex+'°. Each base angle is…',fr(180-apex,2)+'°',[apex+'°',fr(180-apex,2)+10+'°',(90-apex/2)+'°',fr(180-apex,2)-5+'°'],'Base angles are equal: (180 − '+apex+')/2 = '+fr(180-apex,2)+'° each.','(180 − apex)/2, since the two bases are equal.');
    }
    if(t===2){
      const base=pick([50,55,65,70]);
      return Q('Each base angle of an isosceles triangle is '+base+'°. The apex angle is…',(180-2*base)+'°',[base+'°',(180-base)+'°',(90-base)+'°'],'Apex = 180 − 2('+base+') = '+(180-2*base)+'°.','Subtract both equal bases from 180°.');
    }
    return Q('In an isosceles triangle ABC, AB = AC. Then…','∠B = ∠C',['∠A = ∠B','∠A = ∠C','∠B > ∠C'],'Sides AB and AC are equal, so the angles OPPOSITE them — ∠C and ∠B — are equal.','Angles opposite equal sides are equal.');
  }},

 {id:'tri3',t:'Side–Angle Duel',sub:'NCERT 7.3–7.4 · Inequalities',
  irl:['Bridge bracing: the longest strut always faces the biggest load angle — the side–angle law written in steel','Delivery apps can never beat the straight line: every detour is longer — triangle inequality runs your logistics'],
  hook:{ic:'🥢',s:'Grab three sticks: 2 cm, 3 cm and 7 cm. Try to close the triangle — impossible! The two short sticks simply cannot reach around the long one. Now try 5, 6, 10: they click shut. Triangles obey a strict membership rule, and inside any triangle, the biggest angle stares at the biggest side.',
        w:'Triangle inequality questions are one-liners in exams ("Can 3, 4, 8 form a triangle?") — and the side↔angle ranking finishes inequality proofs in one step.'},
  facts:[['The membership rule','Three lengths form a triangle ONLY if the sum of every two exceeds the third. Fastest check: shortest + middle > longest.'],
         ['Side ↔ angle ranking','The larger angle is always opposite the larger side (and vice versa). Rank one, you rank the other.'],
         ['Third-side window','For sides a, b, the third side c obeys: a − b < c < a + b (strict inequalities).'],
         ['Failure is information','If a + b = c exactly, the "triangle" collapses into a straight segment — still not a triangle!']],
  lab:['isos',{mode:'ineq'}],
  tasks:['Slide c until the triangle snaps open — find the exact limit','Order the angles by sliding the side lengths','Test 2, 3, 7 and watch the gatekeeper reject it'],
  ex:{t:'Can 2, 3, 7 form a triangle? What about 5, 6, 10?',
      steps:[['The gatekeeper test','2 + 3 = 5 < 7. The short sticks can\'t span the long one → NO triangle.'],
             ['Second attempt','5 + 6 = 11 > 10, and every other pair also exceeds the third → YES.'],
             ['Rank them','In Δ(5, 6, 10): the 10 side faces the largest angle, 6 the middle, 5 the smallest.']]},
  gen(){
    const t=R(1,3);
    if(t===1){
      const sets=[[2,3,7,'No'],[4,5,9,'No'],[1,2,3,'No'],[5,6,10,'Yes'],[7,10,16,'Yes'],[6,8,13,'Yes'],[3,4,8,'No'],[10,12,21,'Yes']];
      const s=pick(sets);
      return Q('Can a triangle have sides '+s[0]+', '+s[1]+', '+s[2]+'?',s[3],['Yes','No'].filter(x=>x!==s[3]),'Check: '+s[0]+' + '+s[1]+' = '+(s[0]+s[1])+' '+(s[0]+s[1]>s[2]?'>':'≤')+' '+s[2]+'. '+(s[3]==='Yes'?'All pairs pass → triangle exists.':'Shortest + middle fails to beat the longest → no triangle.'),'Shortest + middle must EXCEED the longest.');
    }
    if(t===2){
      const a=pick([5,6,8,7]),b=pick([8,9,11,10]);
      return Q('Two sides of a triangle are '+a+' and '+b+'. The third side c must satisfy…',(b-a)+' < c < '+(a+b),[a+' < c < '+b,'0 < c < '+(a+b),(a+b)+' < c',(b-a)+' ≤ c ≤ '+(a+b)],'Third-side window: (b − a) < c < (a + b), i.e. '+(b-a)+' < c < '+(a+b)+'. Both inequalities strict!','c > difference of the other two, and c < their sum.');
    }
    return Q('In ΔPQR, angle Q is the largest. Then…','PR is the largest side',['PQ is the largest side','QR is the largest side','PR is the smallest side'],'Largest angle ↔ largest side OPPOSITE it. ∠Q faces side PR → PR is longest.','The biggest angle always stares at the biggest side.');
  }}
]}
,
{id:'quad',n:'Quad Quadrangle',ch:'Chapter 8 · Quadrilaterals',ic:'▦',
 tag:'Skewed parallelograms, a royal family and the midpoint bridge.',
 boss:{n:'QUADRAX',ti:'The Four-Fold Warden',taunt:'Four sides I have, and FOUR FOLD anger. Bend my angles as you wish — my opposites NEVER break!',art:'brute2'},
 concepts:[

 {id:'quad1',t:'Parallelogram Powers',sub:'NCERT 8.1 · Properties',
  irl:['Scissor lifts and retractable phone stands: parallelogram linkages rise while staying perfectly level','Sliding cupboards and telescopic gates: opposite sides stay equal while the frame glides'],
  hook:{ic:'🪜',s:'A pantograph (the extendable lamp arm) is a lattice of parallelograms: stretch it any way you like, and opposite bars stay parallel and equal — that is why it copies drawings perfectly. One diagonal slice and each parallelogram splits into two identical triangles. This one fact generates every parallelogram property.',
        w:'Proving the diagonal splits a parallelogram into congruent triangles (by ASA) unlocks ALL other properties in two lines each. Learn one proof, harvest five.'},
  facts:[['Diagonal = congruence maker','A diagonal divides a parallelogram into two CONGRUENT triangles (alternate angles + common side → ASA).'],
         ['Opposite sides equal','From CPCT: AB = CD and AD = BC — opposite sides are always equal (and parallel).'],
         ['Opposite angles equal','Also from CPCT: ∠A = ∠C and ∠B = ∠D. Adjacent angles are supplementary (co-interior).'],
         ['Diagonals bisect each other','The diagonals cut each other into equal halves: AO = OC and BO = OD at the crossing point O.']],
  lab:['para',{mode:'base'}],
  tasks:['Drag the corner — opposite sides stay equal no matter the skew','Toggle the diagonals and verify the bisection tick-marks','Set one angle to 70° and read the other three'],
  ex:{t:'One angle of a parallelogram is 70°. Find the rest.',
      steps:[['Opposite angle','Opposite angles are equal: the angle across is also 70°.'],
             ['Adjacent pair','Adjacent angles are co-interior between parallel sides: 180 − 70 = 110°.'],
             ['Family complete','Angles in order: 70°, 110°, 70°, 110°. (Sum = 360° ✓)']]},
  gen(){
    const t=R(1,3);
    if(t===1){
      const a=pick([65,70,85,100,110,55]);
      return Q('One angle of a parallelogram is '+a+'°. The OTHER THREE angles are…',(180-a)+'°, '+a+'°, '+(180-a)+'°',[a+'°, '+(180-a)+'°, '+(180-a)+'°',(180-a)+'°, '+(180-a)+'°, '+a+'°',a+'°, '+a+'°, '+(180-a)+'°'],'Opposite equal ('+a+'° across), adjacent supplementary ('+(180-a)+'° next door): '+a+'°, '+(180-a)+'°, '+a+'°, '+(180-a)+'°.','Opposite = equal; adjacent = 180 − angle.');
    }
    if(t===2){
      const a=pick([4,5,6,8]),b=pick([3,5,7,9]);
      return Q('Two adjacent sides of a parallelogram are '+a+' cm and '+b+' cm. Its perimeter is…',(2*(a+b))+' cm',[(a+b)+' cm',(2*a+b)+' cm',(4*(a+b))+' cm'],'Parallelogram: two pairs of equal sides → perimeter = 2('+a+' + '+b+') = '+(2*(a+b))+' cm.','Opposite sides equal → 2(a + b).');
    }
    return Q('The diagonals of a parallelogram ABCD meet at O. Which is ALWAYS true?','OA = OC and OB = OD',['OA = OB','AC = BD','AC ⊥ BD'],'Diagonals of a parallelogram BISECT each other — each is cut into two equal halves at O.','Bisect each other, yes. Equal or perpendicular? Only for special members!');
  }},

 {id:'quad2',t:'The Royal Family',sub:'NCERT 8.2 · Rhombus, rectangle, square',
  irl:['Floor tiling works because squares and rectangles interlock with zero gaps — tilers live in the royal family','Your phone screen is a rectangle: a parallelogram that demanded right angles and got them'],
  hook:{ic:'👑',s:'Every parallelogram is a citizen. Some inherit titles: the RHOMBUS (equal sides, diagonals crossing like an X at right angles), the RECTANGLE (four right angles, diagonals measuring equal), and the crown prince SQUARE — inheriting BOTH estates. Know the family tree and every "identify the quadrilateral" question surrenders.',
        w:'Diagonal clues are the exam\'s favourite riddle: "diagonals equal AND perpendicular" instantly outs a square. Learn the table cold.'},
  facts:[['Rectangle','All angles 90°. Diagonals EQUAL (and they still bisect each other).'],
         ['Rhombus','All sides equal. Diagonals PERPENDICULAR, and each bisects the opposite angles.'],
         ['Square','The maximal heir: all sides equal + all angles 90°. Diagonals equal, perpendicular, bisecting — everything at once.'],
         ['The logic ladder','Square ⊂ Rectangle ⊂ Parallelogram and Square ⊂ Rhombus ⊂ Parallelogram. A square is both a rectangle and a rhombus!']],
  lab:['para',{mode:'royal'}],
  tasks:['Press RECTANGLE — watch diagonals become equal','Press RHOMBUS — watch diagonals rotate to perpendicular','Press SQUARE — both badges light up together'],
  ex:{t:'Identify the figure: diagonals are equal AND perpendicular',
      steps:[['Diagonals equal…','…means rectangle (or its heirs).'],
             ['…and perpendicular','…means rhombus (or its heirs).'],
             ['Both at once','Equal + perpendicular diagonals → SQUARE, the only figure holding both titles.']]},
  gen(){
    const t=R(1,3);
    if(t===1){
      const bank=[['Diagonals are equal and bisect each other','Rectangle'],['Diagonals are perpendicular and bisect each other','Rhombus'],['Diagonals are equal AND perpendicular','Square'],['Only one pair of opposite sides is parallel','Trapezium'],['Two pairs of adjacent sides equal, diagonals perpendicular','Kite']];
      const b=pick(bank);
      return Q('A quadrilateral whose '+b[0].toLowerCase()+' is a…',b[1],['Rectangle','Rhombus','Square','Trapezium','Kite','Parallelogram'].filter(s=>s!==b[1]).slice(0,3),'The diagonal fingerprint '+b[0].toLowerCase()+' belongs uniquely to the '+b[1]+'.','Match the diagonal clues to the family tree.');
    }
    if(t===2){
      const a=pick([6,8,9]),b=pick([8,15,12]);
      const trip={8:6,15:8,12:9,6:8,9:12,8:15};
      if(trip[a]!==b)return this.gen();
      const d=Math.sqrt(a*a+b*b);
      return Q('A rectangle has sides '+a+' cm and '+b+' cm. Each diagonal is…',d+' cm',[Math.round((d+2)*10)/10+' cm',(a+b)+' cm',Math.round((d-1)*10)/10+' cm'],'Diagonal² = '+a+'² + '+b+'² (Pythagoras) → diagonal = '+d+' cm. Rectangle diagonals are always equal.','Pythagoras on the right triangle the diagonal makes.');
    }
    return Q('Every square is a…','rectangle and a rhombus both',['rectangle but not a rhombus','rhombus but not a rectangle','neither'],'A square has equal sides (rhombus ✓) and right angles (rectangle ✓) — it inherits both titles.','The family tree: square sits under BOTH branches.');
  }},

 {id:'quad3',t:'Midpoint Magic',sub:'NCERT 8.9–8.10 · Midpoint theorem',
  irl:['Camera gimbal arms join at midpoints so the phone stays half-way stable — the midpoint theorem in your vlogs','Bridge trusses: the mid-segment is exactly half the base — engineers size beams by it'],
  hook:{ic:'🌉',s:'Two villages sit at the midpoints of a triangular forest\'s sides. The engineers discover something eerie: the straight road joining those midpoints is always EXACTLY parallel to the third side — and exactly HALF its length. No matter how the forest triangle deforms, the bridge keeps its promises.',
        w:'The midpoint theorem (and its converse) is a two-line proof machine for "show DE = ½BC" questions — guaranteed marks if you know the setup.'},
  facts:[['The theorem','The segment joining midpoints of two sides of a triangle is PARALLEL to the third side and HALF as long: DE ∥ BC, DE = ½BC.'],
         ['The converse','A line through the midpoint of one side, parallel to a second side, BISECTS the third side.'],
         ['Proof idea','Extend DE to F so DE = EF; show CDFE is a parallelogram → congruences finish it (or use equal intercepts).'],
         ['Perimeter bonus','The triangle formed by the three midpoints has perimeter exactly HALF the original — three bridges, each half a side.']],
  lab:['midp',{}],
  tasks:['Drag the vertices — watch DE stay glued parallel to BC at half length','Read the live ratio EF/BC from the readout','Slide the inner segment off the midpoint and see parallelism break'],
  ex:{t:'D, E are midpoints of AB, AC. If BC = 12.8 cm, find DE.',
      steps:[['Identify the setup','D and E are midpoints of two sides — the midpoint theorem applies.'],
             ['Apply the theorem','DE ∥ BC and DE = ½ × BC.'],
             ['Compute','DE = ½ × 12.8 = 6.4 cm. Done in one line.']]},
  gen(){
    const t=R(1,3);
    if(t===1){
      const bc=pick([10,12,12.8,14,16,9.6]);
      return Q('D and E are midpoints of AB and AC. If BC = '+bc+' cm, then DE = …',fr(bc,2)+' cm',[(bc*2)+' cm',(bc/4)+' cm',(bc-1)+' cm'],'Midpoint theorem: DE = ½ BC = '+fr(bc,2)+' cm.','DE is always half of BC.');
    }
    if(t===2){
      const de=pick([4,5,6,7.5]);
      return Q('In ΔABC, DE ∥ BC with D, E on AB, AC and DE = '+de+' cm. D and E are the midpoints. Then BC = …',(2*de)+' cm',[de+' cm',fr(de,2)+' cm',(de+2)+' cm'],'Since D, E are midpoints, BC = 2 × DE = '+(2*de)+' cm.','BC is twice the midpoint segment.');
    }
    return Q('A line through the midpoint of one side of a triangle, parallel to a second side…','bisects the third side',['is perpendicular to the third side','equals the third side','trisects the third side'],'That is the CONVERSE of the midpoint theorem: parallel through a midpoint bisects the remaining side.','Converse: midpoint + parallel → bisects.');
  }}
]}
);
</script>
