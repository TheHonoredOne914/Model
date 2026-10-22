/* ================================================================
   PRACTICE ARENA — paper-first, infinite unique questions,
   step-by-step Solution Decks, "Watch me solve" demo.
   ================================================================ */
const QG=[]; /* QG[w] = [genFn,...] each returns {q,fig,type,choices,ans,ansText,hint,steps,topic} */

/* ---------- helpers ---------- */
function stepsDeck(t,d){return {t,d}}
function mcqWrong(vals){return vals}
function uniqChoices(ans,wrongPool){
 const seen=new Set([String(ans)]);const out=[];
 for(const w0 of wrongPool){const w=String(w0);if(!seen.has(w)){seen.add(w);out.push(w)}}
 let pad=1;
 while(out.length<3&&pad<40){const alt=String(ans)+'  (+'+pad+')';if(!seen.has(alt)){seen.add(alt);out.push(alt)}pad++}
 return out.slice(0,3);
}
function genPick(a){return pick(a)}

/* ================= WORLD 0 · NUMBER SYSTEMS ================= */
QG[0]=[
()=>{ /* simplify surd */
 const k=ri(2,9),m=pick([2,3,5,6,7,10]),n=k*k*m;
 const ans=`${k}√${m}`;
 const ch=shuffle([ans,`${k*m}√${2}`,`${k+1}√${m}`,`√${n+1}`].map(String));
 return {topic:'Simplifying surds',type:'mcq',q:`Simplify: <b>√${n}</b>`,choices:ch,ansText:ans,
  hint:'Pull out the biggest perfect square hiding inside '+n+'.',
  steps:[stepsDeck('Split the number',`√${n} = √(${k*k} × ${m}) — because ${k}² = ${k*k} and ${k*k} × ${m} = ${n}.`),
   stepsDeck('Root the perfect square',`√(${k*k} × ${m}) = √${k*k} × √${m} = ${k}√${m} (product rule of roots).`),
   stepsDeck('Done',`So √${n} = <b>${k}√${m}</b>. The decimal would be messy — this form is EXACT.`)]}},
()=>{ /* classify irrational */
 const irr=pick([['π','I'],['√'+ri(2,10),'I'],['0.101001000…','I']]);
 const irrRoot=irr[0].startsWith('√')?+irr[0].slice(1):-1;
 const rRoots=[4,9,16,25,36].filter(v=>v!==irrRoot);
 const R=[['2/3','R'],['0.25','R'],['√'+pick(rRoots),'R'],['0.333…','R'],['−7','R'],['22/7','R']];
 const rs=shuffle(R).slice(0,3);
 const pool=shuffle([irr,...rs]);
 const ch=pool.map(p=>p[0]);
 return {topic:'Rational vs Irrational',type:'mcq',q:`Which of these is <b>IRRATIONAL</b>?`,choices:shuffle(ch),ansText:irr[0],
  hint:'Rational = ends (2.5) or repeats (0.333…). Irrational = neither, ever.',
  steps:[stepsDeck('Test each number',pool.map(p=>`${p[0]} → ${p[1]==='R'?'rational (ends/repeats)':'irrational (never ends, never repeats)'}`).join('<br>')),
   stepsDeck('The odd one out',`Only <b>${irr[0]}</b> has digits that go on forever WITHOUT a repeating block.`),
   stepsDeck('Takeaway',`π, non-perfect-square roots, and endless non-repeating decimals are irrational. Everything else is rational.`)]}},
()=>{ /* rationalise */
 const a=ri(2,6);let b=a*a-1;const ans=`a − √b form`.replace('a',a).replace('b',b);
 const q=`Rationalise the denominator of <b>1/(${a} + √${b})</b>. What do you multiply on top and bottom?`;
 const ch=shuffle([`(${a} − √${b})/(${a} − √${b})`,`(${a} + √${b})/(${a} + √${b})`,`√${b}/√${b}`,`${a}/${b}`]);
 return {topic:'Rationalising',type:'mcq',q:q,choices:ch,ansText:`(${a} − √${b})/(${a} − √${b})`,
  hint:'Multiply by the CONJUGATE — flip the sign between the two terms.',
  steps:[stepsDeck('Spot the villain',`The denominator ${a} + √${b} has a surd. Multiply by 1 — but disguised as the conjugate over itself.`),
   stepsDeck('The conjugate',`Conjugate of (${a} + √${b}) is <b>(${a} − √${b})</b>. Multiplying by (conj)/(conj) changes nothing mathematically.`),
   stepsDeck('Use (x+y)(x−y) = x²−y²',`(${a} + √${b})(${a} − √${b}) = ${a}² − (√${b})² = ${a*a} − ${b} = ${a*a-b}. No surd left downstairs!`)]}},
()=>{ /* recurring decimal */
 const d=ri(1,9);const g=gcd(d,9);const num=d/g,den=9/g;
 return {topic:'Recurring → fraction',type:'mcq',q:`Write <b>0.${d}${d}${d}…</b> (the digit ${d} repeating forever) as a fraction.`,
  choices:shuffle([`${num}/${den}`,...uniqChoices(`${num}/${den}`,[`${d}/10`,`1/${d+1}`,`${den}/${num}`,`1/9`,`2/9`])]),ansText:`${num}/${den}`,
  hint:'Let x = 0.ddd…, then 10x − x shifts the block.',
  steps:[stepsDeck('Set up the trap',`Let x = 0.${d}${d}${d}…`),
   stepsDeck('Shift one block',`10x = ${d}.${d}${d}${d}… (the decimal point jumps one full repeating block).`),
   stepsDeck('Subtract',`10x − x = ${d}.000… − 0 → 9x = ${d} → x = ${d}/9${g>1?` = ${num}/${den} (divided by ${g})`:''}.`),
   stepsDeck('Takeaway',`Every 1-digit repeat block sits over 9. Two-digit blocks sit over 99. Magic, but provable.`)]}}
];

/* ================= WORLD 1 · POLYNOMIALS ================= */
QG[1]=[
()=>{ /* evaluate p(x) */
 const a=ri(1,5),b=ri(1,9),c=ri(1,9),k=ri(1,4);
 const v=k*k+a*k+b;
 return {topic:'Evaluating p(x)',type:'num',ans:v,ansText:String(v),
  q:`For <b>p(x) = x² + ${a}x + ${b}</b>, find <b>p(${k})</b>.`,
  hint:'Substitute x = '+k+' everywhere, then BODMAS.',
  steps:[stepsDeck('Substitute',`p(${k}) = (${k})² + ${a}(${k}) + ${b}`),
   stepsDeck('Powers first',`= ${k*k} + ${a*k} + ${b}`),
   stepsDeck('Add',`= <b>${v}</b>`)]}},
()=>{ /* expand (x+a)(x+b) */
 const a=ri(1,7),b=ri(1,7);
 const q=`Expand: <b>(x + ${a})(x + ${b})</b>`;
 const ans=`x² + ${a+b}x + ${a*b}`;
 const ch=uniqChoices(ans,[`x² + ${a*b}x + ${a+b}`,`x² + ${a+b}x + ${a+b+1}`,`x² + ${a}x + ${b}`,`x² + ${a+b}x + ${a*b+1}`,`x² + ${a+b+2}x + ${a*b}`]);
 return {topic:'Expanding',type:'mcq',q:q,choices:shuffle([ans,...ch]),ansText:ans,
  hint:'FOIL: First, Outer, Inner, Last — then collect the middle terms.',
  steps:[stepsDeck('FOIL',`x·x = x² &nbsp;|&nbsp; x·${b} = ${b}x &nbsp;|&nbsp; ${a}·x = ${a}x &nbsp;|&nbsp; ${a}·${b} = ${a*b}`),
   stepsDeck('Collect middle',`${b}x + ${a}x = (${a+b})x — that\u2019s why the middle coefficient is the SUM, and the last is the PRODUCT.`),
   stepsDeck('Result',`x² + ${a+b}x + ${a*b}`)]}},
()=>{ /* factor quadratic */
 const r=ri(1,6),s=ri(1,6);
 const q=`One zero of <b>p(x) = x² − ${r+s}x + ${r*s}</b> is ${r}. Find the OTHER zero.`;
 return {topic:'Zeroes of a polynomial',type:'num',ans:s,ansText:String(s),
  hint:'Zeroes multiply to the constant term (r × s = '+(r*s)+').',
  steps:[stepsDeck('Factor by splitting',`x² − ${r+s}x + ${r*s} = (x − ${r})(x − ${s}) — check: ${r}×${s} = ${r*s} ✓ and ${r}+${s} = ${r+s} ✓`),
   stepsDeck('Zeroes = where p(x) = 0',`(x − ${r})(x − ${s}) = 0 when x = ${r} or x = ${s}.`),
   stepsDeck('Answer',`Other zero = <b>${s}</b>`)]}},
()=>{ /* remainder theorem */
 const a=ri(1,4),b=ri(1,6),c=ri(1,6),k=ri(1,3);
 const v=k*k*k+a*k*k+b*k+c;
 return {topic:'Remainder theorem',type:'num',ans:v,ansText:String(v),
  q:`Find the remainder when <b>p(x) = x³ + ${a}x² + ${b}x + ${c}</b> is divided by <b>(x − ${k})</b>.`,
  hint:'No long division needed: remainder = p(k).',
  steps:[stepsDeck('The theorem',`Dividing by (x − ${k}) leaves remainder = p(${k}). Why: p(x) = (x−${k})·q(x) + R, put x = ${k} → R = p(${k}).`),
   stepsDeck('Substitute',`p(${k}) = ${k*k*k} + ${a*k*k} + ${b*k} + ${c}`),
   stepsDeck('Add up',`= <b>${v}</b>`)]}},
()=>{ /* degree */
 const t=pick([['5x³ + 2x² − 7',3],['9y⁴ − y',4],['7 − 2z⁶',6],['3u + 1',1],['4v²',2]]);
 return {topic:'Degree of a polynomial',type:'mcq',q:`What is the <b>degree</b> of <b>${t[0]}</b>?`,
  choices:shuffle([...new Set([String(t[1]),String(t[1]+1),String(Math.max(1,t[1]-1)),'0'])].slice(0,4)),ansText:String(t[1]),
  hint:'Degree = the HIGHEST power of the variable anywhere in the polynomial.',
  steps:[stepsDeck('Scan the powers',`Powers present in ${t[0]}: look for the biggest exponent.`),
   stepsDeck('The biggest wins',`Highest power = ${t[1]} → degree = <b>${t[1]}</b>. (A constant like 7 has degree 0.)`)]}}
];

/* ================= WORLD 2 · COORDINATE ================= */
QG[2]=[
()=>{ /* quadrant */
 const x=ri(1,9)*pick([1,-1]),y=ri(1,9)*pick([1,-1]);
 const qq=x>0?(y>0?'Quadrant I':'Quadrant IV'):(y>0?'Quadrant II':'Quadrant III');
 const ans=qq;
 return {topic:'Quadrants',type:'mcq',q:`In which quadrant does <b>(${x}, ${y})</b> lie?`,
  choices:['Quadrant I','Quadrant II','Quadrant III','Quadrant IV'],ansText:ans,
  hint:'Sign of x decides the half; sign of y decides the floor.',
  steps:[stepsDeck('Read the signs',`x = ${x} is ${x>0?'positive → RIGHT half':'negative → LEFT half'}. y = ${y} is ${y>0?'positive → TOP':'negative → BOTTOM'}.`),
   stepsDeck('Combine',`${x>0?'Right':'Left'} + ${y>0?'top':'bottom'} = <b>${ans}</b> (${x>0&&y>0?'(+,+)':x<0&&y>0?'(−,+)':x<0&&y<0?'(−,−)':'(+,−)'})`)]}},
()=>{ /* distance */
 const t=pick([[3,4],[6,8],[5,12],[8,15],[9,12]]);
 return {topic:'Distance on the grid',type:'num',ans:t[1],ansText:String(t[1]),
  q:`A ship sails straight from <b>(${t[0]}, 0)</b> to <b>(0, ${t[1]})</b>. How long is the journey? (units)`,
  hint:'It\u2019s a right triangle: legs ' + t[0] + ' and ' + t[1] + '. Distance² = x² + y².',
  steps:[stepsDeck('See the right triangle',`Horizontal leg = ${t[0]}, vertical leg = ${t[1]}. The straight path is the hypotenuse.`),
   stepsDeck('Pythagoras',`d² = ${t[0]}² + ${t[1]}² = ${t[0]*t[0]} + ${t[1]*t[1]} = ${t[0]*t[0]+t[1]*t[1]}`),
   stepsDeck('Root it',`d = √${t[0]*t[0]+t[1]*t[1]} = <b>${t[1]}</b> units`)]}},
()=>{ /* midpoint */
 const x1=ri(-5,5),y1=ri(-5,5);const x2=x1+2*ri(1,4),y2=y1+2*ri(1,4);
 const mx=(x1+x2)/2,my=(y1+y2)/2;
 const ans=`(${mx}, ${my})`;
 return {topic:'Midpoint',type:'mcq',q:`Find the midpoint of <b>(${x1}, ${y1})</b> and <b>(${x2}, ${y2})</b>.`,
  choices:shuffle([ans,...uniqChoices(ans,[`(${x1+x2}, ${y1+y2})`,`(${mx+1}, ${my-1})`,`(${(x1+x2)/3}, ${y1+y2})`,`(${mx-1}, ${my+1})`])]),ansText:ans,
  hint:'Midpoint = average of the x\u2019s, average of the y\u2019s.',
  steps:[stepsDeck('Average the x\u2019s',`(${x1} + ${x2}) ÷ 2 = ${x1+x2} ÷ 2 = ${mx}`),
   stepsDeck('Average the y\u2019s',`(${y1} + ${y2}) ÷ 2 = ${y1+y2} ÷ 2 = ${my}`),
   stepsDeck('Answer',`Midpoint = <b>(${mx}, ${my})</b> — the exact halfway island.`)]}},
()=>{ /* axis points */
 const onX=Math.random()<.5,v=ri(1,9)*pick([1,-1]);
 const q=onX?`The point <b>(${v}, 0)</b> lies on which axis?`:`The point <b>(0, ${v})</b> lies on which axis?`;
 const ans=onX?'x-axis':'y-axis';
 return {topic:'Points on axes',type:'mcq',q:q,choices:['x-axis','y-axis','Quadrant I','Origin'],ansText:ans,
  hint:'A point sitting on an axis has ZERO for the other coordinate.',
  steps:[stepsDeck('Zero gives it away',onX?`y = 0 → no height at all → the point lies flat on the <b>x-axis</b>.`:`x = 0 → no horizontal shift → the point stands on the <b>y-axis</b>.`),
   stepsDeck('Extra fact',`(0, 0) is the only point on BOTH axes — the Origin.`)]}}
];

/* ================= WORLD 3 · LINEAR EQUATIONS ================= */
QG[3]=[
()=>{ /* check solution */
 const a=ri(1,5),b=ri(1,5),x=ri(1,4),y=ri(1,4),c=a*x+b*y;
 const lie=c+ri(1,6)*pick([1,-1]);
 const isTrue=Math.random()<.5;
 const cc=isTrue?c:lie;
 const q=`Is <b>(${x}, ${y})</b> a solution of <b>${a===1?'':a}x + ${b===1?'':b}y = ${cc}</b>?`;
 const ans=isTrue?'Yes — LHS = RHS':'No — LHS ≠ RHS';
 return {topic:'Testing solutions',type:'mcq',q:q,choices:['Yes — LHS = RHS','No — LHS ≠ RHS'],ansText:ans,
  hint:'Put x and y in. If both sides land on the same number → solution.',
  steps:[stepsDeck('Substitute',`LHS = ${a}(${x}) + ${b}(${y}) = ${a*x} + ${b*y} = ${a*x+b*y}`),
   stepsDeck('Compare',`LHS = ${a*x+b*y}, RHS = ${cc} → ${a*x+b*y===cc?'EQUAL — it IS a solution ✓':'NOT equal — the point floats off the line ✗'}`)]}},
()=>{ /* rickshaw fare */
 const base=ri(15,40),rate=ri(6,15),km=ri(3,12);
 const fare=base+rate*km;
 return {topic:'Real-life linear',type:'num',ans:fare,ansText:'₹'+fare,
  q:`An auto charges <b>₹${base}</b> to sit + <b>₹${rate} per km</b>. Rahul rides <b>${km} km</b>. Total fare (₹)?`,
  hint:'Fare = base + rate × km.',
  steps:[stepsDeck('Build the equation',`Fare = ${base} + ${rate}x — a linear equation hiding in a rickshaw!`),
   stepsDeck('Put x = '+km,`Fare = ${base} + ${rate} × ${km} = ${base} + ${rate*km}`),
   stepsDeck('Answer',`₹<b>${fare}</b>`)]}},
()=>{ /* solve for y */
 const a=ri(2,6),x=ri(1,5),y=ri(1,9),b=ri(1,5),c=a*x+b*y;
 return {topic:'Solving ax+by=c',type:'num',ans:y,ansText:String(y),
  q:`If <b>${a}x + ${b}y = ${c}</b> and <b>x = ${x}</b>, find <b>y</b>.`,
  hint:'Lock x in, then solve what\u2019s left — a one-variable equation.',
  steps:[stepsDeck('Substitute x = '+x,`${a}(${x}) + ${b}y = ${c} → ${a*x} + ${b}y = ${c}`),
   stepsDeck('Isolate the y-term',`${b}y = ${c} − ${a*x} = ${b*y}`),
   stepsDeck('Divide',`y = ${b*y} ÷ ${b} = <b>${y}</b>`)]}},
()=>{ /* equation from story */
 const rate=ri(3,9),base=ri(10,30);
 const q=`"A party hall charges ₹${base} entry plus ₹${rate} per guest." If total cost is ₹T for g guests, which equation fits?`;
 const ans=`T = ${base} + ${rate}g`;
 return {topic:'Equations from words',type:'mcq',q:q,choices:shuffle([ans,`T = ${rate} + ${base}g`,`T = ${base*rate}g`,`T + ${base} = ${rate}g`]),ansText:ans,
  hint:'One-time cost = constant. Per-guest cost = multiplied by g.',
  steps:[stepsDeck('Spot the parts',`Entry ₹${base} → the constant (paid even for 0 guests). ₹${rate} per guest → ${rate}g.`),
   stepsDeck('Assemble',`T = ${base} + ${rate}g. If g = 0, T = ${base} ✓ (just the entry).`),
   stepsDeck('Takeaway',`Linear equations ARE stories: constant = start, coefficient = rate of change.`)]}}
];

/* ================= WORLD 4 · LINES & ANGLES ================= */
QG[4]=[
()=>{ /* linear pair with ratio */
 const k=pick([1,2,3,4,5,8,9,11]); /* a + k·a = 180 must be integer */
 const a=180/(k+1);
 return {topic:'Linear pair',type:'num',ans:a,ansText:a+'°',
  q:`Two angles form a linear pair: <b>a°</b> and <b>${k}a°</b>. Find <b>a</b>. (degrees)`,
  hint:'Linear pair: the two angles add to exactly 180°.',
  steps:[stepsDeck('Set up the pair',`a + ${k}a = 180° → ${k+1}a = 180°`),
   stepsDeck('Solve',`a = 180 ÷ ${k+1} = <b>${a}°</b> (so the angles are ${a}° and ${k*a}°)`)]}},
()=>{ /* vertically opposite */
 const v=pick([35,45,55,65,75,85,110,125]);
 return {topic:'Vertically opposite',type:'num',ans:v,ansText:v+'°',
  q:`Two straight lines cross. One angle is <b>${v}°</b>. The angle VERTICALLY OPPOSITE to it = ? (degrees)`,
  hint:'Crossing lines make an X. Opposite arms hold equal angles.',
  steps:[stepsDeck('The X-law',`When two lines intersect, vertically opposite angles are ALWAYS equal (both are the "leftover" of 180° minus the same neighbour).`),
   stepsDeck('Answer',`=<b>${v}°</b> — no calculation needed, pure logic.`)]}},
()=>{ /* co-interior */
 const v=pick([70,85,100,110,115,125]);
 return {topic:'Parallel lines · co-interior',type:'num',ans:180-v,ansText:(180-v)+'°',
  q:`Parallel lines are cut by a transversal. One co-interior angle is <b>${v}°</b>. The other = ? (degrees)`,
  hint:'Co-interior (C-shape / same side inside) angles sum to 180°.',
  steps:[stepsDeck('The rule',`Co-interior angles between parallel lines: together they make 180°.`),
   stepsDeck('Subtract',`180 − ${v} = <b>${180-v}°</b>`)]}},
()=>{ /* triangle sum */
 const a=ri(30,80),b=ri(30,80),c=180-a-b;
 return {topic:'Angle sum of triangle',type:'num',ans:c,ansText:c+'°',
  q:`A triangle has angles <b>${a}°</b> and <b>${b}°</b>. Find the third angle. (degrees)`,
  hint:'All three ALWAYS share 180° equally.',
  steps:[stepsDeck('The 180° law',`A + B + C = 180° (tear the corners off any paper triangle — they always form a straight line).`),
   stepsDeck('Subtract both',`C = 180 − ${a} − ${b} = <b>${c}°</b>`)]}},
()=>{ /* exterior angle */
 const a=ri(35,70),b=ri(35,70);
 return {topic:'Exterior angle theorem',type:'num',ans:a+b,ansText:(a+b)+'°',
  q:`Two interior angles of a triangle are <b>${a}°</b> and <b>${b}°</b>. The EXTERIOR angle next to the third = ? (degrees)`,
  hint:'Exterior angle = sum of the two OPPOSITE interior angles.',
  steps:[stepsDeck('The shortcut law',`Exterior angle = remote interior sum: ${a} + ${b}.`),
   stepsDeck('Why it works',`Third angle = 180 − (${a}+${b}); exterior = 180 − third = ${a}+${b}. Same thing!`),
   stepsDeck('Answer',`<b>${a+b}°</b>`)]}}
];

/* ================= WORLD 5 · TRIANGLES + HERON ================= */
QG[5]=[
()=>{ /* congruence rule */
 const t=pick([
  ['AB = DE, BC = EF, ∠B = ∠E','SAS'],['∠A = ∠D, AB = DE, ∠B = ∠E','ASA'],
  ['AB = DE, BC = EF, AC = DF','SSS'],['∠B = 90°, hypotenuse AC = DF, side AB = DE','RHS']]);
 const opts=['SSS','SAS','ASA','RHS'];
 return {topic:'Congruence rules',type:'mcq',q:`Given: <b>${t[0]}</b> (in △ABC and △DEF). Which congruence rule proves them congruent?`,
  choices:opts,ansText:t[1],
  hint:'Count what\u2019s given: sides (S) and angles (A) — and WHERE they sit.',
  steps:[stepsDeck('Inventory the clues',t[0]),
   stepsDeck('Match the pattern',t[1]==='SAS'?'Two sides with the angle BETWEEN them → SAS.':t[1]==='ASA'?'Two angles with the side BETWEEN them → ASA.':t[1]==='SSS'?'All three pairs of sides → SSS.':'Right angle + Hypotenuse + Side → RHS.'),
   stepsDeck('Answer',`<b>${t[1]}</b>`)]}},
()=>{ /* isosceles base angles */
 const v=pick([40,50,60,80,90,100]);
 const base=(180-v)/2;
 return {topic:'Isosceles triangle',type:'num',ans:base,ansText:base+'°',
  q:`An isosceles triangle has vertex angle <b>${v}°</b> (the unequal one). Each base angle = ? (degrees)`,
  hint:'Base angles are EQUAL. All three sum to 180°.',
  steps:[stepsDeck('Equal legs → equal base angles',`Call each base angle b: b + b + ${v} = 180`),
   stepsDeck('Solve',`2b = 180 − ${v} = ${180-v} → b = <b>${base}°</b>`)]}},
()=>{ /* heron */
 const t=pick([[3,4,5],[6,8,10],[5,12,13],[9,12,15],[8,15,17],[7,24,25]]);
 const s=(t[0]+t[1]+t[2])/2;const area=t[0]*t[1]/2;
 return {topic:'Heron\u2019s formula',type:'num',ans:area,ansText:String(area),
  q:`A triangular park has sides <b>${t[0]} m, ${t[1]} m, ${t[2]} m</b>. Find its area (m²).`,
  hint:'s = half perimeter, then Area = √(s(s−a)(s−b)(s−c)).',
  steps:[stepsDeck('Semi-perimeter',`s = (${t[0]} + ${t[1]} + ${t[2]}) ÷ 2 = ${s}`),
   stepsDeck('Feed Heron',`Area = √(${s} × ${s-t[0]} × ${s-t[1]} × ${s-t[2]}) = √(${s*(s-t[0])*(s-t[1])*(s-t[2])})`),
   stepsDeck('Root it',`Area = <b>${area} m²</b> — no height needed, only the three sides!`)]}},
()=>{ /* perimeter */
 const t=pick([[7,9,12],[10,14,15],[13,13,10],[6,6,6],[11,17,20]]);
 const p=t[0]+t[1]+t[2];
 return {topic:'Perimeter',type:'num',ans:p,ansText:String(p),
  q:`Fence a triangular garden with sides <b>${t[0]} m, ${t[1]} m, ${t[2]} m</b>. Total fencing needed (m)?`,
  hint:'Perimeter = walk the whole boundary once.',
  steps:[stepsDeck('Add the boundary',`P = ${t[0]} + ${t[1]} + ${t[2]}`),
   stepsDeck('Answer',`<b>${p} m</b> of fencing${t[0]===t[1]&&t[1]===t[2]?' (an equilateral garden!)':t[0]===t[1]||t[1]===t[2]?' (two sides equal — isosceles!)':''}`)]}}
];

/* ================= WORLD 6 · CIRCLES & QUADS ================= */
QG[6]=[
()=>{ /* circumference */
 const r=pick([7,14,21,28]);
 const C=2*22/7*r;
 return {topic:'Circumference',type:'num',ans:C,ansText:String(C),
  q:`A bangle has radius <b>${r} cm</b>. Find its circumference using π = 22/7. (cm)`,
  hint:'C = 2πr.',
  steps:[stepsDeck('Formula',`C = 2πr = 2 × (22/7) × ${r}`),
   stepsDeck('Cancel the 7',`2 × 22 × ${r/7} = <b>${C} cm</b>${r%7===0?' (that\u2019s why r-multiples of 7 are loved)':''}`)]}},
()=>{ /* area */
 const r=pick([7,14]);
 const A=22/7*r*r;
 return {topic:'Area of circle',type:'num',ans:A,ansText:String(A),
  q:`A circular pizza has radius <b>${r} cm</b>. Area? (use π = 22/7, cm²)`,
  hint:'A = πr² — radius SQUARED, then π.',
  steps:[stepsDeck('Formula',`A = πr² = (22/7) × ${r}²`),
   stepsDeck('Square first',`${r}² = ${r*r}`),
   stepsDeck('Multiply',`A = (22 × ${r*r})/7 = <b>${A} cm²</b>`)]}},
()=>{ /* from circumference to diameter */
 const d=pick([14,21,35,49]);
 const C=22/7*d;
 return {topic:'Reversing the ratio',type:'num',ans:d,ansText:String(d),
  q:`A wheel rolls a road mark of <b>${C} cm</b> in exactly one turn. Its diameter? (π = 22/7, cm)`,
  hint:'One turn = one circumference = π × d. Work backwards.',
  steps:[stepsDeck('Set up',`π d = ${C} → d = ${C} ÷ (22/7)`),
   stepsDeck('Divide by a fraction',`d = ${C} × 7/22 = ${C*7/22}`),
   stepsDeck('Answer',`d = <b>${d} cm</b>`)]}},
()=>{ /* semicircle angle */
 return {topic:'Angle in a semicircle',type:'mcq',
  q:`A triangle is drawn inside a circle with one side as the <b>diameter</b>. The angle at the opposite corner = ?`,
  choices:['90°','60°','45°','180°'],ansText:'90°',
  hint:'Thales\u2019 theorem — the semicircle\u2019s gift.',
  steps:[stepsDeck('The theorem',`Any angle subtended by a diameter is a right angle: "angle in a semicircle = 90°".`),
   stepsDeck('Answer',`<b>90°</b> — always, for ANY point on the semicircle.`)]}},
()=>{ /* parallelogram angles */
 const v=pick([55,65,75,110,120]);
 const other=180-v;
 return {topic:'Parallelogram angles',type:'num',ans:other,ansText:other+'°',
  q:`In parallelogram ABCD, ∠A = <b>${v}°</b>. Find ∠B (the neighbour). (degrees)`,
  hint:'Neighbouring angles of a parallelogram add to 180° (co-interior on parallel sides).',
  steps:[stepsDeck('The property',`Adjacent angles in a parallelogram are co-interior between parallel sides → sum 180°.`),
   stepsDeck('Subtract',`∠B = 180 − ${v} = <b>${other}°</b> (and ∠D = ∠B too — opposites are equal!)`)]}},
()=>{ /* cylinder volume */
 const r=pick([7,14]),h=ri(5,20);
 const V=22/7*r*r*h;
 return {topic:'Volume of cylinder',type:'num',ans:V,ansText:String(V),
  q:`A drum is a cylinder: radius <b>${r} cm</b>, height <b>${h} cm</b>. Volume? (π = 22/7, cm³)`,
  hint:'Volume = base circle × height = πr²h.',
  steps:[stepsDeck('Base area',`πr² = (22/7) × ${r*r} = ${22/7*r*r}`),
   stepsDeck('Stack it up',`V = base × height = ${22/7*r*r} × ${h}`),
   stepsDeck('Answer',`<b>${V} cm³</b>`)]}}
];

/* ================= WORLD 7 · STATS + PROBABILITY ================= */
QG[7]=[
()=>{ /* mean */
 const n=5;const xs=Array.from({length:n},()=>ri(2,20));
 const sum=xs.reduce((a,b)=>a+b,0);const mean=sum/n;
 return {topic:'Mean',type:'num',ans:mean,ansText:String(mean),
  q:`Cricket runs: <b>${xs.join(', ')}</b>. Find the MEAN. ${Number.isInteger(mean)?'':'(round to 1 decimal)'}`,
  hint:'Add everything, divide by how many.',
  steps:[stepsDeck('Add',`${xs.join(' + ')} = ${sum}`),
   stepsDeck('Divide',`${sum} ÷ ${n} = <b>${mean}</b>${Number.isInteger(mean)?'':' ≈ '+mean.toFixed(1)}`)]}},
()=>{ /* median */
 const xs=shuffle(Array.from({length:5},()=>ri(1,30)));
 const sorted=[...xs].sort((a,b)=>a-b);const med=sorted[2];
 return {topic:'Median',type:'num',ans:med,ansText:String(med),
  q:`Find the MEDIAN of: <b>${xs.join(', ')}</b>`,
  hint:'SORT first. Median = the middle child.',
  steps:[stepsDeck('Sort the data',sorted.join(' ≤ ')),
   stepsDeck('Take the middle',`5 values → 3rd one is the middle = <b>${med}</b> (two on each side ✓)`)]}},
()=>{ /* mode */
 const mode=ri(1,9);
 const xs=[mode,ri(1,9),mode,ri(1,9),ri(1,9)];
 const shuffled=shuffle(xs);
 return {topic:'Mode',type:'num',ans:mode,ansText:String(mode),
  q:`Daily chai cups: <b>${shuffled.join(', ')}</b>. Find the MODE.`,
  hint:'Mode = the value that shows up MOST.',
  steps:[stepsDeck('Count each value',`${[...new Set(xs)].map(v=>`${v}×${xs.filter(x=>x===v).length}`).join(', ')}`),
   stepsDeck('The repeater wins',`<b>${mode}</b> appears ${xs.filter(x=>x===mode).length} times → mode = ${mode}`)]}},
()=>{ /* die probability */
 const k=ri(2,5); /* strictly greater than k */
 const good=6-k;
 const simp={2:'1/3',3:'1/2',4:'2/3'}[good]||`${good}/6`;
 const wrongs=shuffle(['1/2','1/6','5/6','2/3','1/3','4/6','2/6'].filter(w=>w!==simp)).slice(0,3);
 return {topic:'Probability (die)',type:'mcq',q:`A fair die is rolled once. What is P(rolling a number <b>greater than ${k}</b>)?`,
  choices:shuffle([simp,...wrongs]),ansText:simp,
  hint:'Count favourable faces ÷ 6.',
  steps:[stepsDeck('Total outcomes',`A die has 6 faces: 1–6.`),
   stepsDeck('Count favourable',`Greater than ${k}: ${[...Array(good)].map((_,i)=>k+1+i).join(', ')} → ${good} faces`),
   stepsDeck('Ratio',`P = ${good}/6${good===3?' = 1/2':''}`)]}},
()=>{ /* coin/cards */
 const t=pick([
  ['tossing a HEAD with a fair coin','1/2',['1/2','1/4','1','0']],
  ['drawing a HEART from a full 52-card deck','1/4',['1/4','1/2','1/13','3/4']],
  ['rolling a die and getting 6','1/6',['1/6','6/6','1/2','1/3']]]);
 return {topic:'Probability basics',type:'mcq',q:`Find the probability of <b>${t[0]}</b>.`,
  choices:t[3],ansText:t[1],
  hint:'P = favourable ÷ total outcomes.',
  steps:[stepsDeck('Count both sides',t[2]),
   stepsDeck('Answer',`P = <b>${t[1]}</b>`)]}},
()=>{ /* range */
 const xs=Array.from({length:5},()=>ri(2,40));
 const rng=Math.max(...xs)-Math.min(...xs);
 return {topic:'Range',type:'num',ans:rng,ansText:String(rng),
  q:`Find the RANGE of: <b>${xs.join(', ')}</b>`,
  hint:'Range = biggest − smallest.',
  steps:[stepsDeck('Spot the extremes',`max = ${Math.max(...xs)}, min = ${Math.min(...xs)}`),
   stepsDeck('Subtract',`Range = ${Math.max(...xs)} − ${Math.min(...xs)} = <b>${rng}</b>`)]}}
];

/* ================= PRACTICE UI ================= */
const PR={w:0,q:null,n:0,correct:0,need:8,session:[],demo:true,locked:false};
function startPractice(w){
 PR.w=w;PR.n=0;PR.correct=0;PR.demo=!S.worlds[w].practice;PR.locked=false;
 setHUD(WORLDS[w].name+' · Practice Arena','Paper first. Calculator never.');
 buildPracticeScreen();
 nextQuestion();
 show('scr-practice');
}
function buildPracticeScreen(){
 $('#scr-holder').innerHTML=`
 <div class="screen" id="scr-practice">
  <div class="pr-top"><span style="font-size:20px">⚔️</span><h2 id="pr-title"></h2>
   <div class="pr-meta"><span class="chip a" id="pr-score">0 / ${PR.need}</span>
   <button class="btn ghost sm" id="pr-back">← Board</button></div></div>
  <div class="pr-wrap" id="pr-wrap"></div>
 </div>`;
 $('#pr-title').textContent=WORLDS[PR.w].real;
 $('#pr-back').onclick=()=>{SFX.click();goHub(PR.w)};
}
function nextQuestion(){
 PR.n++;PR.locked=false;
 const wrap=$('#pr-wrap');
 const gens=QG[PR.w];PR.q=pick(gens)();
 PR.q.hintUsed=false;
 const first=PR.n===1&&PR.demo;
 wrap.innerHTML=`
  <div class="paper-note"><span style="font-size:20px">📓</span><span><b>Paper mode:</b> copy the question in your notebook, solve it with pen — then type the answer. Brain grows when the hand writes.</span></div>
  <div class="q-card">
   <span class="q-num">${first?'DEMO — WATCH ME':'Q'+PR.n} · ${PR.q.topic}</span>
   <div class="q-text">${PR.q.q}</div>
   ${PR.q.fig?`<div class="q-fig">${PR.q.fig}</div>`:''}
   ${PR.q.type==='mcq'
    ?`<div class="mcq-grid">${PR.q.choices.map((c,i)=>`<button class="mcq" data-i="${i}">${c}</button>`).join('')}</div>`
    :`<div class="ans-row"><input class="num-in" id="pr-in" placeholder="?" inputmode="decimal" autocomplete="off"><button class="btn" id="pr-check">Check ✓</button></div>`}
  </div>
  <div class="fb" id="pr-fb"></div>
  <div class="ans-row" id="pr-actions" style="max-width:620px">
   <button class="btn ghost sm" id="pr-hint">💡 Hint</button>
   <button class="btn ghost sm" id="pr-steps">📖 Solution deck</button>
  </div>
  <div class="steps-box" id="pr-deck"></div>`;
 if(PR.q.type==='num'){$('#pr-in').focus();$('#pr-check').onclick=()=>submitNum();
  $('#pr-in').onkeydown=e=>{if(e.key==='Enter')submitNum()}}
 else $$('.mcq').forEach(b=>b.onclick=()=>submitMCQ(+b.dataset.i,b));
 $('#pr-hint').onclick=()=>{SFX.tap();toast(PR.q.hint,'💡')};
 $('#pr-steps').onclick=()=>openDeck(false);
 if(first)openDeck(true);
}
function openDeck(auto){
 const deck=$('#pr-deck');deck.classList.add('show');
 deck.innerHTML=`<div class="steps-head">📖 SOLUTION DECK — ${esc(PR.q.topic)}</div>
 <div id="deck-lines"></div>
 <div style="display:flex;gap:8px;justify-content:center;padding:12px"><button class="btn sm amber" id="deck-next">Reveal next step ↓</button></div>`;
 const lines=$('#deck-lines');let i=0;
 const reveal=()=>{
  const st=PR.q.steps[i];
  lines.innerHTML+=`<div class="step-line"><div class="n">${i+1}</div><div><div class="t">${st.t}</div><div class="d">${st.d}</div></div></div>`;
  SFX.pop();i++;
  if(i>=PR.q.steps.length){$('#deck-next',deck).textContent='✓ Fully solved';$('#deck-next',deck).disabled=true;
   if(auto)setTimeout(()=>{PR.demo=false;nextQuestion()},1400)}
 };
 reveal();
 $('#deck-next',deck).onclick=()=>{if(i<PR.q.steps.length)reveal();SFX.click()};
 deck.scrollIntoView({behavior:'smooth',block:'nearest'});
}
function submitMCQ(i,btn){
 if(PR.locked)return;PR.locked=true;
 const right=PR.q.choices[i]===PR.q.ansText;
 $$('.mcq').forEach(b=>b.style.pointerEvents='none');
 if(right){btn.classList.add('right');SFX.good()}else{
  btn.classList.add('wrong');SFX.bad();
  $$('.mcq').forEach(b=>{if(b.textContent===PR.q.ansText)b.classList.add('right')});
 }
 settle(right);
}
function submitNum(){
 if(PR.locked)return;
 const inp=$('#pr-in');const v=parseFloat(inp.value.replace(',','.'));
 if(isNaN(v)){inp.classList.add('bad');setTimeout(()=>inp.classList.remove('bad'),450);SFX.bad();return}
 PR.locked=true;
 const target=PR.q.ans;
 const right=Math.abs(v-target)<0.01;
 inp.classList.add(right?'ok':'bad');inp.disabled=true;
 if(!right){SFX.bad();toast('Expected: '+PR.q.ansText,'🎯')}
 else SFX.good();
 settle(right);
}
function settle(right){
 const fb=$('#pr-fb');fb.classList.add('show');
 const st=S.worlds[PR.w];st.attempt++;
 if(right){
  PR.correct++;st.correct++;st.practice=Math.max(st.practice,PR.correct);
  bumpStreak();const bonus=S.streak>=3?6:0;
  addXP(12+bonus,null);toast(`+${12+bonus} XP${bonus?' (streak bonus 🔥)':''}`);
  fb.className='fb good show';
  fb.innerHTML=`<div class="big">✅ Correct! ${pick(['The pen is mighty.','Warrior math!','Boss is sweating now.','Clean solve.'])}</div>
   <p style="margin-top:5px">${pick(['Notice HOW the steps flowed — that flow is the real treasure.','Same pattern, different numbers next time. You\u2019ll see it instantly.','That\u2019s one more concept welded into your brain.'])}</p>`;
  if(PR.correct>=PR.need)finishPractice();
 } else {
  resetStreak();
  fb.className='fb bad show';
  fb.innerHTML=`<div class="big">💪 Not yet — and that\u2019s how muscles form.</div>
   <p style="margin-top:5px">Open the <b>Solution Deck</b> below, walk the steps, then take the next one. No shame in war.</p>`;
  if(right===false&&$('#pr-deck').classList.contains('show')){}
  else openDeck(false);
 }
 $('#pr-score').textContent=`${PR.correct} / ${PR.need}`;
 /* swap action buttons for a Next button */
 const acts=$('#pr-actions');
 if(acts){acts.innerHTML=`<button class="btn ${right?'':'amber'}" id="pr-nextq">${right?'Next question →':'Got it — next one →'}</button>`;
  $('#pr-nextq').onclick=()=>{SFX.click();nextQuestion()};
 }
 updatePracticeProgress();
 save();
}
function updatePracticeProgress(){
 /* progress bar handled by score chip */
}
function finishPractice(){
 S.worlds[PR.w].practice=8;save();
 SFX.fanfare();confetti(innerWidth/2,innerHeight/2,110);
 debrief({title:'🏆 PRACTICE ARENA CLEARED',cls:'gold',
  ribbon:`${PR.correct} solves · your hand wrote · your brain grew`,
  concepts:WORLDS[PR.w].concepts.slice(0,3),
  lines:[`You now cover the core of <b>${WORLDS[PR.w].real}</b>. The boss guards the final star — face <b>${WORLDS[PR.w].boss}</b>?`],
  btn:'Face the Boss',btnCls:'coral',onGo:()=>startBoss(PR.w)});
}
