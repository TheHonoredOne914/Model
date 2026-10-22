/* ================================================================
   THEATER SCRIPTS — worlds 4..7
   ================================================================ */

/* ---------- WORLD 4 · ANGLE ARENA ---------- */
THEATERS[4]=[
{who:'ARENA HERALD',say:`Euclid built this whole arena on <b>5 tiny truths</b> — no formulas, pure logic. Flip all five scrolls to unlock the arena gates.`,
 hint:'👆 Tap each scroll to flip it',
 svg:()=>`
  <rect width="400" height="300" fill="#FBF1E8"/>
  <text x="200" y="36" text-anchor="middle" ${F} font-size="16" fill="#E05544">EUCLID\u2019S 5 TRUTHS · c. 300 BC</text>
  <g id="aa-scrolls">${[
   ['T1','Things equal to the same thing are equal to each other.'],
   ['T2','If equals are added to equals, the wholes are equal.'],
   ['T3','If equals are subtracted from equals, the remainders are equal.'],
   ['T4','Things that coincide with one another are equal.'],
   ['T5','The whole is GREATER than the part.']]
  .map((s,i)=>{const x=48+(i%3)*104,y=70+Math.floor(i/3)*86;
   return `<g class="flip" data-i="${i}" style="cursor:pointer"><rect x="${x}" y="${y}" width="92" height="70" rx="10" fill="#fff" stroke="#E9C9A8" stroke-width="2"/><text x="${x+46}" y="${y+30}" text-anchor="middle" ${F} font-size="15" fill="#E05544">${s[0]}</text><text class="fl" x="${x+46}" y="${y+46}" text-anchor="middle" font-size="9" fill="#6B6478" opacity="0"></text></g>`}).join('')}
  </g>
  <text id="aa-msg" x="200" y="272" text-anchor="middle" ${F} font-size="13" fill="#2B2438" opacity="0"></text>`,
 init(root,done){
  const txt=['Things equal to the same thing are equal to each other.','If equals are added to equals, the wholes are equal.','If equals are subtracted from equals, the remainders are equal.','Things that coincide with one another are equal.','The whole is GREATER than the part.'];
  let n=0;$$('.flip',root).forEach(g=>g.onclick=()=>{
   if(g.dataset.open)return;g.dataset.open=1;SFX.good();
   g.querySelector('.fl').textContent='✓';g.querySelector('.fl').setAttribute('opacity','1');
   g.querySelector('rect').setAttribute('fill','#FFE6E2');
   const m=$('#aa-msg',root);m.textContent=`“${txt[+g.dataset.i]}”`;m.setAttribute('opacity','1');
   if(++n===5){m.textContent='5 tiny truths… an entire geometry. That\u2019s EUCLID. 🏛️';SFX.fanfare();done()}
  });
 }},
{who:'ARENA HERALD',say:`Two gladiator rays clash and bounce apart. Slide the fighter — watch <b>opposite angles stay EQUAL</b> and neighbours always sum to <b>180°</b>.`,
 hint:'🎛 Slide the fighter\u2019s angle',
 extra:`<div style="width:min(420px,86%)"><input type="range" id="aa-ang" min="20" max="160" value="60" style="width:100%"></div>`,
 svg:()=>`
  <rect width="400" height="300" fill="#FBF1E8"/>
  <text x="200" y="32" text-anchor="middle" ${F} font-size="15" fill="#E05544">CLASH AT A POINT</text>
  <g id="aa-rays"></g>
  <g id="aa-lab"></g>
  <text x="200" y="278" text-anchor="middle" ${F} font-size="13.5" fill="#2B2438" id="aa-sum">opposite pairs: equal & equal · neighbours: 180°</text>`,
 init(root,done,extra){
  const cx=200,cy=150;
  const draw=a=>{
   const r1=a*Math.PI/180,r2=r1+Math.PI;
   $('#aa-rays',root).innerHTML=`
    <line x1="${cx-Math.cos(r1)*120}" y1="${cy-Math.sin(r1)*120}" x2="${cx+Math.cos(r1)*120}" y2="${cy+Math.sin(r1)*120}" stroke="#E05544" stroke-width="4" stroke-linecap="round"/>
    <line x1="${cx-Math.cos(r2)*120}" y1="${cy-Math.sin(r2)*120}" x2="${cx+Math.cos(r2)*120}" y2="${cy+Math.sin(r2)*120}" stroke="#E05544" stroke-width="4" stroke-linecap="round"/>
    <line x1="${cx}" y1="${cy-125}" x2="${cx}" y2="${cy+125}" stroke="#2B2438" stroke-width="3.5"/>
    <line x1="${cx-125}" y1="${cy}" x2="${cx+125}" y2="${cy}" stroke="#2B2438" stroke-width="3.5"/>
    <circle cx="${cx}" cy="${cy}" r="5" fill="#2B2438"/>`;
   $('#aa-lab',root).innerHTML=`
    ${label(cx+70*Math.cos(r1/2),cy+70*Math.sin(r1/2),a+'°','#E05544',14)}
    ${label(cx-70*Math.cos(r1/2),cy-70*Math.sin(r1/2),a+'°','#E05544',14)}
    ${label(cx+62*Math.cos((Math.PI+r1)/2),cy+62*Math.sin((Math.PI+r1)/2),(180-a)+'°','#1E8C79',14)}
    ${label(cx-62*Math.cos((Math.PI+r1)/2),cy-62*Math.sin((Math.PI+r1)/2),(180-a)+'°','#1E8C79',14)}`;
   $('#aa-sum',root).innerHTML=`a = <tspan fill="#E05544">${a}°</tspan> · neighbour = <tspan fill="#1E8C79">${180-a}°</tspan> · together ${a}+${180-a} = <tspan font-weight="800">180° (linear pair!)</tspan>`;
  };
  draw(60);
  extra.querySelector('#aa-ang').oninput=e=>{SFX.slide();draw(+e.target.value)};
  let moved=false;extra.addEventListener('input',()=>{if(!moved){moved=true;setTimeout(done,900)}});
 }},
{who:'ARENA HERALD',say:`Parallel roads never meet — but a transversal street slices both. Tap each angle pair to learn its <b>secret rule</b>.`,
 hint:'👆 Tap angle pairs a·b·c·d',
 svg:()=>`
  <rect width="400" height="300" fill="#FBF1E8"/>
  <line x1="60" y1="100" x2="340" y2="100" stroke="#2B2438" stroke-width="4"/>
  <line x1="60" y1="200" x2="340" y2="200" stroke="#2B2438" stroke-width="4"/>
  <line x1="110" y1="40" x2="290" y2="260" stroke="#E05544" stroke-width="4"/>
  ${[[165,86,'a','#2FB8A0'],[252,86,'b','#5EB8FF'],[165,214,'c','#5EB8FF'],[252,214,'d','#2FB8A0']].map(p=>
   `<g class="pair" data-p="${p[2]}" style="cursor:pointer"><circle cx="${p[0]}" cy="${p[1]}" r="17" fill="${p[3]}" opacity=".28"/><text x="${p[0]}" y="${p[1]+6}" text-anchor="middle" ${F} font-size="15" fill="${p[3]}">${p[2]}</text></g>`).join('')}
  <text x="200" y="30" text-anchor="middle" ${F} font-size="15" fill="#E05544">TRANSVERSAL RULES · parallel lines</text>
  <text x="200" y="276" text-anchor="middle" ${F} font-size="13.5" fill="#2B2438" id="aa-tmsg">a & c are ALTERNATE · b & c are CO-INTERIOR</text>
  <text x="200" y="292" text-anchor="middle" ${F} font-size="12.5" fill="#6B6478" id="aa-tmsg2">Tap a letter to learn its rule</text>`,
 init(root,done){
  const rules={a:'a = b: CORRESPONDING angles are equal (F-shape!)',b:'b + c = 180°: CO-INTERIOR angles add to 180° (C-shape)',c:'c = a: ALTERNATE angles are equal (Z-shape!)',d:'d = b: VERTICALLY OPPOSITE — always equal'};
  const seen=new Set();
  $$('.pair',root).forEach(g=>g.onclick=()=>{
   SFX.good();const p=g.dataset.p;
   const tm=$('#aa-tmsg',root);if(!tm)return;tm.textContent=rules[p];const tm2=$('#aa-tmsg2',root);if(tm2)tm2.textContent='✓ learned';
   if(!seen.has(p)){seen.add(p);if(seen.size===4){toast('Transversal rules cracked!','📐');done()}}
  });
 }},
{who:'DHRUVA',say:`Last gate: the <b>triangle law</b>. Slide the apex flat — whatever you do, the three angles refuse to leave <b>180°</b>. Try to break it!`,
 hint:'🎛 Drag the apex — try to break 180°',
 extra:`<div style="width:min(420px,86%)"><input type="range" id="aa-apex" min="14" max="70" value="40" style="width:100%"></div>`,
 svg:()=>`
  <rect width="400" height="300" fill="#FBF1E8"/>
  <g id="aa-tri"></g>
  <text x="200" y="286" text-anchor="middle" ${F} font-size="14.5" fill="#2B2438" id="aa-t3">A + B + C = 180°. Always. No exceptions since 300 BC.</text>`,
 init(root,done,extra){
  const draw=h=>{
   const A=[80,240],B=[320,240],C=[200,240-h*2.4];
   const ab=Math.hypot(C[0]-A[0],C[1]-A[1]),bc=Math.hypot(B[0]-C[0],B[1]-C[1]);
   const angA=Math.round(Math.acos((ab*ab+160*160- bc*bc)/(2*ab*160))*180/Math.PI);
   const angB=Math.round(Math.acos((bc*bc+160*160-ab*ab)/(2*bc*160))*180/Math.PI);
   const angC=180-angA-angB;
   $('#aa-tri',root).innerHTML=`
    <polygon points="${A} ${B} ${C}" fill="#FF7B6B" opacity=".22"/>
    <polygon points="${A} ${B} ${C}" fill="none" stroke="#E05544" stroke-width="3.5"/>
    ${label(A[0]+34,A[1]-12,angA+'°','#E05544',14)}${label(B[0]-34,B[1]-12,angB+'°','#E05544',14)}${label(C[0],C[1]+24,angC+'°','#E05544',14)}
    <text x="100" y="262" ${F} font-size="13" fill="#6B6478">A</text><text x="312" y="262" ${F} font-size="13" fill="#6B6478">B</text><text x="194" y="${C[1]-10}" ${F} font-size="13" fill="#6B6478">C</text>`;
   $('#aa-t3',root).innerHTML=`${angA}° + ${angB}° + ${angC}° = <tspan fill="#E05544">${angA+angB+angC}°</tspan> — unbreakable 😤`;
  };
  draw(40);
  extra.querySelector('#aa-apex').oninput=e=>{SFX.slide();draw(+e.target.value)};
  let moved=false;extra.addEventListener('input',()=>{if(!moved){moved=true;setTimeout(done,900)}});
 }}
];

/* ---------- WORLD 5 · TRIANGULUM RIDGE ---------- */
THEATERS[5]=[
{who:'RIDGE MONK',say:`Two crystal peaks. If every side and every angle of one matches the other, they\u2019re <b>CONGRUENT</b> — one is a perfect clone. Tap the marks to compare.`,
 hint:'👆 Tap both triangles to check their marks',
 svg:()=>`
  <rect width="400" height="300" fill="#F0F8EC"/>
  <text x="200" y="36" text-anchor="middle" ${F} font-size="16" fill="#4E9642">SPOT THE CLONES</text>
  <g id="tg-a" class="tapon" style="cursor:pointer">
   <polygon points="60,220 170,220 115,110" fill="#7BC86C" opacity=".25" stroke="#4E9642" stroke-width="3"/>
   <line x1="108" y1="216" x2="122" y2="216" stroke="#4E9642" stroke-width="2.5"/>
   <line x1="86" y1="168" x2="98" y2="162" stroke="#4E9642" stroke-width="2.5"/><line x1="90" y1="175" x2="102" y2="169" stroke="#4E9642" stroke-width="2.5"/>
   <path d="M74 220 A14 14 0 0 0 70 210" fill="none" stroke="#E05544" stroke-width="2.5"/>
   <text x="115" y="242" text-anchor="middle" ${F} font-size="13" fill="#4E9642">Peak A</text></g>
  <g id="tg-b" class="tapon" style="cursor:pointer">
   <polygon points="230,220 340,220 285,110" fill="#7BC86C" opacity=".25" stroke="#4E9642" stroke-width="3"/>
   <line x1="278" y1="216" x2="292" y2="216" stroke="#4E9642" stroke-width="2.5"/>
   <line x1="256" y1="168" x2="268" y2="162" stroke="#4E9642" stroke-width="2.5"/><line x1="260" y1="175" x2="272" y2="169" stroke="#4E9642" stroke-width="2.5"/>
   <path d="M244 220 A14 14 0 0 0 240 210" fill="none" stroke="#E05544" stroke-width="2.5"/>
   <text x="285" y="242" text-anchor="middle" ${F} font-size="13" fill="#4E9642">Peak B</text></g>
  <text id="tg-msg" x="200" y="278" text-anchor="middle" ${F} font-size="13.5" fill="#2B2438" opacity="0">Same side-ticks, same angle-arc, same height… CLONES = CONGRUENT ✓</text>`,
 init(root,done){
  let n=0;$$('.tapon',root).forEach(g=>g.onclick=()=>{
   SFX.good();g.querySelector('polygon').setAttribute('fill','#2FB8A0');g.querySelector('polygon').setAttribute('opacity','.3');
   if(++n===2){$('#tg-msg',root).setAttribute('opacity','1');$('#tg-msg',root).classList.add('pop-in');done()}
  });
 }},
{who:'RIDGE MONK',say:`Full check is boring — monks shortcut with <b>3 clues</b>. Tap each rule-stone to see its mini-demo. These 4 shortcuts prove congruence.`,
 hint:'👆 Tap all 4 rule-stones',
 svg:()=>`
  <rect width="400" height="300" fill="#F0F8EC"/>
  <g id="tg-rules">${[['SSS','3 sides equal'],['SAS','2 sides + squeezed angle'],['ASA','2 angles + between side'],['RHS','right angle + hyp + side']].map((r,i)=>{
   const x=36+(i%2)*180,y=64+Math.floor(i/2)*96;return `<g class="stone" data-r="${r[0]}" style="cursor:pointer">
    <rect x="${x}" y="${y}" width="148" height="76" rx="12" fill="#fff" stroke="#B9D9AE" stroke-width="2"/>
    <text x="${x+74}" y="${y+30}" text-anchor="middle" ${F} font-size="17" fill="#4E9642">${r[0]}</text>
    <text x="${x+74}" y="${y+52}" text-anchor="middle" font-size="10.5" fill="#6B6478">${r[1]}</text>
    <text class="st-tick" x="${x+128}" y="${y+22}" ${F} font-size="14" fill="#7BC86C" opacity="0">✓</text></g>`}).join('')}
  </g>
  <text x="200" y="278" text-anchor="middle" ${F} font-size="13.5" fill="#2B2438" id="tg-rmsg">No full-checking needed — 3 clever clues are enough 🔑</text>`,
 init(root,done){
  const demo={SSS:'SSS: 3-4-5 vs 3-4-5 → slide one on top… PERFECT overlap. Congruent!',SAS:'SAS: 5cm + 60° + 5cm locks the whole triangle — no wobble possible',ASA:'ASA: 40°, 7cm, 40° — rays from both ends meet at exactly ONE point',RHS:'RHS: 90° + hypotenuse + one side — the Pythagoras lock 🔒'};
  const seen=new Set();
  $$('.stone',root).forEach(g=>g.onclick=()=>{
   SFX.good();g.querySelector('.st-tick').setAttribute('opacity','1');
   const rm=$('#tg-rmsg',root);if(!rm)return;rm.textContent=demo[g.dataset.r];
   seen.add(g.dataset.r);if(seen.size===4){toast('All 4 congruence keys collected!','🗝️');done()}
  });
 }},
{who:'RIDGE MONK',say:`Isosceles peaks have a secret: <b>two equal legs → two equal base angles</b>. Tilt the apex — the moment legs match, angles match.`,
 hint:'🎛 Slide the apex to the middle',
 extra:`<div style="width:min(420px,86%)"><input type="range" id="tg-apex" min="-70" max="70" value="55" style="width:100%"></div>`,
 svg:()=>`
  <rect width="400" height="300" fill="#F0F8EC"/>
  <g id="tg-iso"></g>
  <text x="200" y="284" text-anchor="middle" ${F} font-size="14" fill="#2B2438" id="tg-imsg"></text>`,
 init(root,done,extra){
  const draw=off=>{
   const A=[100,240],B=[300,240],C=[200+off,240-130];
   const la=Math.hypot(C[0]-A[0],C[1]-A[1]),lb=Math.hypot(B[0]-C[0],B[1]-C[1]);
   const angA=Math.round(Math.acos((la*la+200*200-lb*lb)/(2*la*200))*180/Math.PI);
   const angB=180-angA- Math.round(Math.acos((la*la+lb*lb-200*200)/(2*la*lb))*180/Math.PI);
   const iso=Math.abs(la-lb)<4;
   $('#tg-iso',root).innerHTML=`
    <polygon points="${A} ${B} ${C}" fill="#7BC86C" opacity=".25"/><polygon points="${A} ${B} ${C}" fill="none" stroke="#4E9642" stroke-width="3.5"/>
    ${iso?`<line x1="${(A[0]+C[0])/2-8}" y1="${(A[1]+C[1])/2}" x2="${(A[0]+C[0])/2+8}" y2="${(A[1]+C[1])/2}" stroke="#E05544" stroke-width="3"/><line x1="${(B[0]+C[0])/2-8}" y1="${(B[1]+C[1])/2}" x2="${(B[0]+C[0])/2+8}" y2="${(B[1]+C[1])/2}" stroke="#E05544" stroke-width="3"/>`:''}
    ${label(A[0]+40,A[1]-14,angA+'°',iso?'#E05544':'#6B6478',14)}${label(B[0]-40,A[1]-14,angB+'°',iso?'#E05544':'#6B6478',14)}`;
   $('#tg-imsg',root).innerHTML=iso?'LEGS EQUAL → base angles <tspan fill="#E05544">EQUAL</tspan> — the isosceles secret 🤫':'legs unequal… angles unequal. Keep sliding…';
  };
  draw(55);
  extra.querySelector('#tg-apex').oninput=e=>{SFX.slide();draw(+e.target.value);
   if(Math.abs(+e.target.value)<6&&!this.d){this.d=1;SFX.good();setTimeout(done,800)}};
 }},
{who:'DHRUVA',say:`No height gauge? No problem. <b>Heron\u2019s spell</b>: 3 sides → area. Tap to cast it step by step on the classic 3·4·5 peak.`,
 hint:'👆 Tap 4 times to cast the spell',
 svg:()=>`
  <rect width="400" height="300" fill="#F0F8EC"/>
  <polygon points="120,230 280,230 120,110" fill="#7BC86C" opacity=".25" stroke="#4E9642" stroke-width="3.5"/>
  ${label(200,252,'5','#4E9642',14)}${label(112,175,'3','#4E9642',14)}${label(196,164,'4','#4E9642',14)}
  <text x="200" y="44" text-anchor="middle" ${F} font-size="16" fill="#4E9642">HERON\u2019S SPELL · sides 3, 4, 5</text>
  <g id="tg-hsteps"></g>`,
 init(root,done){
  const steps=[
   ['Step 1 · semi-perimeter','s = (3 + 4 + 5) ÷ 2 = <b>6</b>'],
   ['Step 2 · the spell','Area = √( s(s−a)(s−b)(s−c) ) = √(6·3·2·1)'],
   ['Step 3 · multiply inside','√( 36 )'],
   ['Step 4 · unsheath!','Area = <b>6 square units</b> — no height ever needed!']];
  let k=0;const g=$('#tg-hsteps',root);
  root.addEventListener('click',function h(){
   if(k>=4)return;SFX.good();
   g.innerHTML+=`<text x="200" y="${76+k*42}" text-anchor="middle" ${F} font-size="14.5" fill="#2B2438" class="pop-in">${steps[k][0]}</text>
    <text x="200" y="${96+k*42}" text-anchor="middle" font-size="14" fill="#1E8C79" class="pop-in">${steps[k][1]}</text>`;
   if(++k===4){root.removeEventListener('click',h);confetti(innerWidth/2,innerHeight*.4,40);setTimeout(done,600)}
  });
 }}
];

/* ---------- WORLD 6 · CIRCORA & QUADRA ---------- */
THEATERS[6]=[
{who:'PI-RATE PARROT',say:`Squawk! Measure any ring: wrap the string around it (<b>circumference C</b>) and across it (<b>diameter d</b>). Tap all three temples — C ÷ d never lies.`,
 hint:'👆 Tap the 3 ring temples',
 svg:()=>`
  <rect width="400" height="300" fill="#F3EFFB"/>
  <text x="200" y="36" text-anchor="middle" ${F} font-size="16" fill="#7452B8">THE SACRED RATIO</text>
  <g id="cr-temples">${[[100,120,44],[225,100,30],[322,150,22]].map((c,i)=>
   `<g class="ring" data-i="${i}" style="cursor:pointer">
     <circle cx="${c[0]}" cy="${c[1]}" r="${c[2]}" fill="none" stroke="#9B7BDE" stroke-width="5"/>
     <circle cx="${c[0]}" cy="${c[1]}" r="${c[2]}" fill="none" stroke="#9B7BDE" stroke-width="5" opacity=".35" class="spin-slow" stroke-dasharray="10 14"/>
     <line x1="${c[0]-c[2]}" y1="${c[1]}" x2="${c[0]+c[2]}" y2="${c[1]}" stroke="#E05544" stroke-width="3"/>
     <text class="val" x="${c[0]}" y="${c[1]+c[2]+22}" text-anchor="middle" ${F} font-size="12.5" fill="#7452B8">tap to measure</text></g>`).join('')}
  </g><text id="cr-msg" x="200" y="282" text-anchor="middle" ${F} font-size="14" fill="#2B2438" opacity="0">C ÷ d = 3.14159… EVERY time. That\u2019s π, the sacred ratio 🥧</text>`,
 init(root,done){
  const data=[['C=277, d=88','C÷d = 3.147'],['C=188, d=60','C÷d = 3.133'],['C=138, d=44','C÷d = 3.136']];let n=0;
  $$('.ring',root).forEach(g=>g.onclick=()=>{
   const i=+g.dataset.i;SFX.good();
   g.querySelector('.val').textContent=data[i][0]+' → '+data[i][1];
   if(++n===3){$('#cr-msg',root).setAttribute('opacity','1');$('#cr-msg',root).classList.add('pop-in');done()}
  });
 }},
{who:'PI-RATE PARROT',say:`One wheel, one full turn. The road mark it leaves behind = <b>one circumference</b> = π × d. Tap the wheel to roll it!`,
 hint:'👆 Tap the wheel to roll one full turn',
 svg:()=>`
  <rect width="400" height="300" fill="#F3EFFB"/>
  <line x1="40" y1="230" x2="380" y2="230" stroke="#2B2438" stroke-width="3"/>
  <g id="cr-wheel-g"><g id="cr-wheel" style="cursor:pointer">
   <circle cx="90" cy="180" r="50" fill="#9B7BDE" opacity=".9"/><circle cx="90" cy="180" r="50" fill="none" stroke="#5F3FA8" stroke-width="3"/>
   <line x1="90" y1="180" x2="90" y2="130" stroke="#fff" stroke-width="4" stroke-linecap="round"/>
   <circle cx="90" cy="180" r="7" fill="#fff"/>
  </g></g>
  <g id="cr-marks"></g>
  <text x="200" y="50" text-anchor="middle" ${F} font-size="15" fill="#7452B8">ROLL IT — one turn = one circumference</text>
  <text id="cr-wmsg" x="200" y="278" text-anchor="middle" ${F} font-size="14" fill="#2B2438" opacity="0">distance = π × d = π × 100 = 314 px of road! The wheel "unrolls" its π 🎡</text>`,
 init(root,done){
  $('#cr-wheel',root).onclick=()=>{
   const w=$('#cr-wheel',root);w.style.pointerEvents='none';
   w.style.transition='transform 2.2s cubic-bezier(.3,.7,.4,1)';w.style.transformOrigin='90px 230px';
   w.style.transform='translate(214px,0) rotate(360deg)';
   SFX.whoosh();
   const marks=$('#cr-marks',root);
   setTimeout(()=>{marks.innerHTML=`<line x1="40" y1="248" x2="354" y2="248" stroke="#E05544" stroke-width="3"/>
    <text x="197" y="266" text-anchor="middle" ${F} font-size="13" fill="#E05544">← one full turn: exactly π × d →</text>`;
    $('#cr-wmsg',root).setAttribute('opacity','1');SFX.fanfare();done()},1400);
  };
 }},
{who:'DHRUVA',say:`The deepest secret: <b>why is area πr²?</b> Cut the pizza into wedges, flip them into a row — it becomes (almost) a RECTANGLE: πr tall… × r wide. Tap to cut, tap to rearrange.`,
 hint:'👆 Tap 1st to cut, 2nd to rearrange',
 svg:()=>`
  <rect width="400" height="300" fill="#F3EFFB"/>
  <g id="cr-pizza" style="cursor:pointer"></g>
  <text x="200" y="44" text-anchor="middle" ${F} font-size="15.5" fill="#7452B8">PIZZA ALGEBRA · why Area = πr²</text>
  <text id="cr-pmsg" x="200" y="280" text-anchor="middle" ${F} font-size="14" fill="#2B2438"></text>`,
 init(root,done){
  const cx=200,cy=150,r=86;let phase=0;
  const g=$('#cr-pizza',root);
  const drawPizza=()=>{let s='';for(let i=0;i<12;i++){const a1=i*Math.PI/6-Math.PI/2,a2=a1+Math.PI/6;
    s+=`<path d="M${cx} ${cy} L${cx+r*Math.cos(a1)} ${cy+r*Math.sin(a1)} A${r} ${r} 0 0 1 ${cx+r*Math.cos(a2)} ${cy+r*Math.sin(a2)} Z" fill="${i%2?'#FFAF3C':'#FFC96B'}" stroke="#fff" stroke-width="2"/>`}
   s+=`<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#D98A1B" stroke-width="3"/>`+label(cx,cy,'r','#8A5A00',15)+label(cx,cy-r-14,'pizza r = 86','#8A5A00',12);g.innerHTML=s};
  const drawRect=()=>{
   const w=Math.PI*r/2.6,h=r/2.6,x=cx-w/2,y=cy-h/2;let s='';
   for(let i=0;i<12;i++){const bw=w/12;s+=`<rect x="${x+i*bw}" y="${y+(i%2?0:h/2)}" width="${bw}" height="${h/2}" fill="${i%2?'#FFAF3C':'#FFC96B'}" stroke="#fff" stroke-width="1.6"/>`}
   s+=`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="#D98A1B" stroke-width="3"/>`;
   s+=label(cx,y-12,'πr (half up + half down = full rim)','#8A5A00',12)+label(x-30,cy+h/2,'r','#8A5A00',14)+label(x+w+28,cy+h/2,'r','#8A5A00',14);
   g.innerHTML=s};
  drawPizza();
  g.onclick=()=>{
   if(phase===0){phase=1;SFX.whoosh();toast('Cut into 12 equal wedges!','🍕');
    $('#cr-pmsg',root).textContent='Now tap again — flip the wedges into a row…';}
   else if(phase===1){phase=2;SFX.fanfare();drawRect();
    $('#cr-pmsg',root).innerHTML='Rectangle! width × height = <tspan font-weight="800">πr × r = πr²</tspan>. You just PROVED the formula 🍕→📐';
    g.style.cursor='default';done()}
  };
 }},
{who:'PI-RATE PARROT',say:`Bazaar bonus! Quadrilateral gates: a <b>kite</b> (2 pairs of equal neighbours) and a <b>parallelogram</b> (opposites equal & parallel). Tap the glowing corners to check.`,
 hint:'👆 Tap both shapes\u2019 marked corners',
 svg:()=>`
  <rect width="400" height="300" fill="#F3EFFB"/>
  <text x="200" y="36" text-anchor="middle" ${F} font-size="15.5" fill="#7452B8">KITE & PARALLELOGRAM GATES</text>
  <g id="cr-kite" class="tapon" style="cursor:pointer">
   <polygon points="100,80 140,140 100,230 60,140" fill="#5EB8FF" opacity=".25" stroke="#2F7CC0" stroke-width="3"/>
   <line x1="100" y1="80" x2="100" y2="230" stroke="#2F7CC0" stroke-width="1.5" stroke-dasharray="5 5"/>
   <line x1="60" y1="140" x2="140" y2="140" stroke="#2F7CC0" stroke-width="1.5" stroke-dasharray="5 5"/>
   <circle cx="100" cy="80" r="6" fill="#FFD34D" class="floaty"/>
   <text x="100" y="258" text-anchor="middle" ${F} font-size="12.5" fill="#2F7CC0">KITE</text></g>
  <g id="cr-para" class="tapon" style="cursor:pointer">
   <polygon points="230,190 270,90 370,90 330,190" fill="#7BC86C" opacity=".25" stroke="#4E9642" stroke-width="3"/>
   <circle cx="230" cy="190" r="6" fill="#FFD34D" class="floaty"/><circle cx="370" cy="90" r="6" fill="#FFD34D" class="floaty"/>
   <text x="300" y="258" text-anchor="middle" ${F} font-size="12.5" fill="#4E9642">PARALLELOGRAM</text></g>
  <text id="cr-qmsg" x="200" y="290" text-anchor="middle" ${F} font-size="13.5" fill="#2B2438" opacity="0"></text>`,
 init(root,done){
  let n=0;
  $$('.tapon',root).forEach(g=>g.onclick=()=>{
   SFX.good();n++;
   const qm=$('#cr-qmsg',root);if(!qm)return;
   if(g.id==='cr-kite')qm.textContent='Kite: diagonals cross at 90°, short crossing bisects the long one ✓';
   else qm.textContent='Parallelogram: opposite sides equal & parallel, opposite angles equal ✓';
   qm.setAttribute('opacity','1');
   if(n===2)done();
  });
 }}
];

/* ---------- WORLD 7 · DATASTORM VAULT ---------- */
THEATERS[7]=[
{who:'STORM ORACLE',say:`Roll the storm! Tap <b>ROLL 30</b> — 30 dice fall, bars grow. Do it twice. The storm always leans toward <b>3s and 4s</b>… coincidence? Roll again.`,
 hint:'👆 Tap ROLL twice',
 extra:`<div style="display:flex;gap:8px"><button class="btn sm amber" id="ds-roll">🎲 ROLL 30</button></div>`,
 svg:()=>`
  <rect width="400" height="300" fill="#FBF4E4"/>
  <text x="200" y="34" text-anchor="middle" ${F} font-size="16" fill="#B87716">DICE STORM · 30 dice</text>
  <line x1="50" y1="250" x2="360" y2="250" stroke="#2B2438" stroke-width="2.5"/>
  <g id="ds-bars"></g><g id="ds-dice"></g>`,
 init(root,done,extra){
  let rolls=0;const hist=[0,0,0,0,0,0];
  extra.querySelector('#ds-roll').onclick=()=>{
   rolls++;SFX.roll=SFX.whoosh;SFX.whoosh();
   const drop=$('#ds-dice',root);let s='';
   for(let i=0;i<30;i++){const v=ri(1,6);hist[v-1]++;s+=`<text x="${ri(56,356)}" y="${ri(50,120)}" font-size="${ri(13,20)}" opacity=".8" class="pop-in">🎲</text>`}
   drop.innerHTML=s;
   const g=$('#ds-bars',root);const mx=Math.max(...hist,1);
   g.innerHTML=hist.map((h,i)=>{const bh=h/mx*150;
    return `<rect x="${62+i*49}" y="${250-bh}" width="30" height="${bh}" rx="5" fill="${i===2||i===3?'#E8A23C':'#E3D2A8'}"/>
     <text x="${77+i*49}" y="${244-bh}" text-anchor="middle" ${F} font-size="12" fill="#2B2438">${h}</text>
     <text x="${77+i*49}" y="266" text-anchor="middle" ${F} font-size="12" fill="#6B6478">${i+1}</text>`}).join('');
   if(rolls>=2){toast('Middle faces win the most — 3 & 4 have MORE combinations (1+3, 2+2… vs 1+1 only)','🎲');setTimeout(done,500)}
   else toast('Once more! Feel the storm\u2019s lean…','⛈️');
  };
 }},
{who:'STORM ORACLE',say:`The three data heroes. Scores: <b>4, 6, 5, 6, 9</b>. Tap in order: SORT them → grab the MEDIAN. ADD them → the MEAN. COUNT repeats → the MODE.`,
 hint:'👆 Tap the 3 hero cards in any order',
 svg:()=>`
  <rect width="400" height="300" fill="#FBF4E4"/>
  <text x="200" y="40" text-anchor="middle" ${F} font-size="15.5" fill="#B87716">DATA: 4 · 6 · 5 · 6 · 9</text>
  <g id="ds-heroes">${[['MEDIAN','the middle child (sort first!)','#2FB8A0'],['MEAN','share equally: add ÷ count','#5EB8FF'],['MODE','Mr. Popular — most frequent','#FF7B6B']].map((h,i)=>{
   const x=32+i*118;return `<g class="hero" data-h="${h[0]}" style="cursor:pointer">
    <rect x="${x}" y="80" width="104" height="110" rx="14" fill="#fff" stroke="#E9E2D5" stroke-width="2"/>
    <circle cx="${x+52}" cy="112" r="20" fill="${h[2]}" opacity=".25"/>
    <text x="${x+52}" y="119" text-anchor="middle" font-size="18">${h[0]==='MEDIAN'?'🎯':h[0]==='MEAN'?'⚖️':'🔥'}</text>
    <text x="${x+52}" y="152" text-anchor="middle" ${F} font-size="13.5" fill="${h[2]}">${h[0]}</text>
    <text x="${x+52}" y="172" text-anchor="middle" font-size="9.5" fill="#6B6478">${h[1]}</text></g>`}).join('')}
  </g>
  <g id="ds-calc"></g>`,
 init(root,done){
  const res={MEDIAN:'sort: 4, 5, 6, 6, 9 → middle = 6',MEAN:'(4+6+5+6+9) ÷ 5 = 30 ÷ 5 = 6',MODE:'6 appears twice — mode = 6'};
  const seen=new Set();
  $$('.hero',root).forEach(g=>g.onclick=()=>{
   const h=g.dataset.h;SFX.good();
   if(seen.has(h))return;seen.add(h);
   g.querySelector('rect').setAttribute('stroke',getComputedStyle(document.documentElement).getPropertyValue('--leaf'));
   g.querySelector('rect').setAttribute('stroke-width','3');
   $('#ds-calc',root).innerHTML+=`<text x="200" y="${218+[...seen].length*20}" text-anchor="middle" ${F} font-size="13.5" fill="#2B2438" class="pop-in">${h}: ${res[h]}</text>`;
   if(seen.size===3){toast('All three land on 6! (mean = median = mode — a balanced storm)','📊');setTimeout(done,700)}
  });
 }},
{who:'LADY CHANCE',say:`My spinner: <b>1 green slice, 3 red</b>. Green wins on 1 of 4 equal slices → chance = <b>1/4</b>. Spin it 10 times and watch reality obey the math… roughly 😏`,
 hint:'👆 SPIN x10 — then believe',
 extra:`<div style="display:flex;gap:8px"><button class="btn sm grape" id="ds-spin">🎡 SPIN ×10</button></div>`,
 svg:()=>`
  <rect width="400" height="300" fill="#FBF4E4"/>
  <g id="ds-wheel"><g id="ds-wheel-rot" style="transform-origin:130px 160px">
   <circle cx="130" cy="160" r="80" fill="#fff" stroke="#2B2438" stroke-width="3"/>
   <path d="M130 160 L130 80 A80 80 0 0 1 210 160 Z" fill="#7BC86C"/>
   <path d="M130 160 L210 160 A80 80 0 0 1 130 240 Z" fill="#FF7B6B"/>
   <path d="M130 160 L130 240 A80 80 0 0 1 50 160 Z" fill="#FF7B6B"/>
   <path d="M130 160 L50 160 A80 80 0 0 1 130 80 Z" fill="#FF7B6B"/>
   <circle cx="130" cy="160" r="10" fill="#2B2438"/>
  </g><polygon points="130,70 122,52 138,52" fill="#2B2438"/></g>
  <text x="270" y="90" ${F} font-size="14" fill="#4E9642">P(green) = 1/4 = 0.25</text>
  <g id="ds-tally"></g>`,
 init(root,done,extra){
  let spins=0,greens=0;
  const spinBtn=extra.querySelector('#ds-spin');
  spinBtn.onclick=()=>{
   if(spins>=10)return;SFX.whoosh();spinBtn.disabled=true;
   const rot=$('#ds-wheel-rot',root);rot.style.transition='transform 1s cubic-bezier(.2,.8,.3,1)';
   rot.style.transform=`rotate(${ri(3,9)*360+ri(0,359)}deg)`;
   setTimeout(()=>{
    spinBtn.disabled=false;
    const g=Math.random()<.25?ri(1,3):0;spins++;greens+=g;
    const tEl=$('#ds-tally',root);if(!tEl)return;
    tEl.innerHTML=`<text x="270" y="130" ${F} font-size="14" fill="#2B2438">spins: ${spins}/10</text>
     <text x="270" y="156" ${F} font-size="14" fill="#4E9642">green hit: ${greens} → ${greens}/${spins}</text>
     <text x="270" y="182" font-size="11.5" fill="#6B6478">theory says ≈ ${Math.round(.25*spins)} hits</text>`;
    if(spins>=10){toast(`Reality: ${greens}/10 ≈ 0.${greens} · Theory: 0.25 — close! THAT\u2019S probability.`,'🎯');SFX.fanfare();done()}
   },1050);
  };
 }},
{who:'STORM ORACLE',say:`Probability lives on a line from <b>0 (impossible)</b> to <b>1 (certain)</b>. Place the three storms: sun in the vault (0), a die showing ≤ 6 (1), coin = heads (½).`,
 hint:'👆 Tap 0, ½ and 1 in the right order',
 svg:()=>`
  <rect width="400" height="300" fill="#FBF4E4"/>
  <text x="200" y="40" text-anchor="middle" ${F} font-size="15.5" fill="#B87716">THE PROBABILITY LINE</text>
  <line x1="60" y1="180" x2="340" y2="180" stroke="#2B2438" stroke-width="3"/>
  ${[[60,'0'],[200,'½'],[340,'1']].map(p=>`<circle cx="${p[0]}" cy="180" r="10" fill="#fff" stroke="#2B2438" stroke-width="2.5" class="pstop" data-v="${p[1]}" style="cursor:pointer"/><text x="${p[0]}" y="208" text-anchor="middle" ${F} font-size="14" fill="#6B6478">${p[1]}</text>`).join('')}
  <text x="60" y="150" text-anchor="middle" font-size="18">🚫</text><text x="200" y="150" text-anchor="middle" font-size="18">🪙</text><text x="340" y="150" text-anchor="middle" font-size="18">✅</text>
  <text x="60" y="244" text-anchor="middle" font-size="10.5" fill="#6B6478">impossible</text><text x="200" y="244" text-anchor="middle" font-size="10.5" fill="#6B6478">even chance</text><text x="340" y="244" text-anchor="middle" font-size="10.5" fill="#6B6478">certain</text>
  <text id="ds-lmsg" x="200" y="282" text-anchor="middle" ${F} font-size="13.5" fill="#2B2438" opacity="0"></text>`,
 init(root,done){
  const order={'0':0,'½':1,'1':2};let next=0;
  $$('.pstop',root).forEach(c=>c.onclick=()=>{
   if(order[c.dataset.v]!==next){SFX.bad();toast(next===0?'Start at 0 — the impossible storm!':next===1?'Now the ½ — even chance':'Finish at 1 — certain!','👆');return}
   SFX.good();c.setAttribute('fill','#7BC86C');next++;
   const m=$('#ds-lmsg',root);if(!m)return;m.setAttribute('opacity','1');
   m.textContent=next===1?'Sun indoors = impossible = 0 ☀️🏛️':next===2?'Coin heads = even chance = ½ 🪙':'Die ≤ 6 = EVERY roll = certain = 1 ✅';
   if(next===3){SFX.fanfare();done()}
  });
 }}
];
