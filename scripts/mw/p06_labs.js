/* ================================================================
   LABS — hands-on machines. Kid plays with knobs, math happens.
   ================================================================ */
function startLab(w){
 setHUD(WORLDS[w].name+' · Lab','Touch it. Break it. Learn it.');
 $('#scr-holder').innerHTML=`
 <div class="screen" id="scr-lab">
  <div class="lab-top"><span style="font-size:22px">🔬</span><h2 id="lab-title"></h2>
   <button class="btn ghost sm" id="lab-back">← Mission board</button></div>
  <div class="lab-frame">
   <div class="lab-canvas" id="lab-canvas"></div>
   <div class="lab-side" id="lab-side"></div>
  </div>
 </div>`;
 show('scr-lab');
 $('#lab-title').textContent=LABS[w].title;
 $('#lab-back').onclick=()=>{SFX.click();goHub(w)};
 LABS[w].init($('#lab-canvas'),$('#lab-side'),w);
}
function labCard(side,title,body){const d=document.createElement('div');d.className='lab-card';d.innerHTML=`<h4>${title}</h4>${body?`<p>${body}</p>`:''}`;side.appendChild(d);return d}
function labSlider(card,label,min,max,val,step=1,fmt=v=>v){
 const d=document.createElement('div');d.className='slider-row';
 d.innerHTML=`<label><span>${label}</span><output>${fmt(val)}</output></label><input type="range" min="${min}" max="${max}" step="${step}" value="${val}">`;
 card.appendChild(d);const inp=d.querySelector('input'),out=d.querySelector('output');
 inp.oninput=()=>{out.textContent=fmt(+inp.value)};
 return {inp,get v(){return +inp.value},set v(x){inp.value=x;out.textContent=fmt(x)}};
}
function labEq(side){const d=document.createElement('div');d.className='eq-live';side.appendChild(d);return d}
function labRO(side,items){const d=document.createElement('div');d.className='readout';
 d.innerHTML=items.map((it,i)=>`<div class="ro"><div class="v" id="ro-${i}">–</div><div class="k">${it}</div></div>`).join('');
 side.appendChild(d);return d}
function labMile(side,list,w){
 const d=document.createElement('div');d.style.display='flex';d.style.flexDirection='column';d.style.gap='7px';
 d.innerHTML=list.map((m,i)=>`<div class="milestone" id="ms-${i}"><span class="tick">✓</span><span>${m}</span></div>`).join('');
 side.appendChild(d);
 let got=0;
 return {hit(i,label){
  const el=$('#ms-'+i,d);if(el.classList.contains('hit'))return;
  el.classList.add('hit');SFX.good();got++;
  if(label)toast('⚡ '+label);
  if(got===list.length){
   S.worlds[w].lab=true;save();SFX.fanfare();
   confetti(innerWidth/2,innerHeight/2,90);
   setTimeout(()=>debrief({title:'🧪 LAB MASTERED',cls:'gold',ribbon:'You didn\u2019t study. You PLAYED. Same thing here.',
    concepts:WORLDS[w].concepts.slice(2,5),lines:['The machine and you are now one. <b>Practice Arena</b> awaits, hero.'],
    btn:'To Practice Arena',btnCls:'amber',onGo:()=>startPractice(w)}),700);
  }
 }}
}
const LABS=[];

/* ---- LAB 0 · Surd Smith ---- */
LABS[0]={title:'The Surd Smith 🔨',
init(canvas,side,w){
 let s=`<svg viewBox="0 0 400 300"><rect width="400" height="300" fill="#F4FBF9"/>
 <text x="200" y="36" text-anchor="middle" ${F} font-size="15" fill="#1E8C79">SMITH ANY ROOT ONTO THE LINE</text>
 <line x1="50" y1="180" x2="350" y2="180" stroke="#2B2438" stroke-width="2.5"/>
 <g id="s0-line"></g><g id="s0-pin"></g></svg>`;
 canvas.innerHTML=s;
 const c1=labCard(side,'What does the smith do?','Any surd √n can be broken into <b>k√m</b> — pull out the biggest perfect square hiding inside. Slide n and watch the smith work.');
 const sl=labSlider(c1,'n (under the root)',2,200,50,1);
 const eq=labEq(side);
 const ro=labRO(side,['exact form','as decimal']);
 const ms=labMile(side,['Find a perfect square (√n = whole number)','Simplify a surd like √50 → 5√2','Push n past 100'],w);
 const draw=()=>{
  const n=sl.v,x=50+(n-2)/198*300;
  const k=1,m=n;let out=n+'';
  for(let i=Math.floor(Math.sqrt(n));i>=2;i--){if(n%(i*i)===0){out=(i>1?`${i}√${n/(i*i)}`:`${n}`);break}}
  $('#s0-line',canvas).innerHTML=Array.from({length:15},(_,i)=>{const v=Math.round(2+i/14*198);const xx=50+(v-2)/198*300;
   return `<line x1="${xx}" y1="175" x2="${xx}" y2="185" stroke="#94B8AF" stroke-width="1.5"/>`}).join('')+
   `<text x="50" y="200" ${F} font-size="11" fill="#6B6478">2</text><text x="350" y="200" ${F} font-size="11" fill="#6B6478">200</text>`;
  $('#s0-pin',canvas).innerHTML=`${dhruvaDot(x,180,9,'#2FB8A0')}<text x="${clamp(x,60,340)}" y="158" text-anchor="middle" ${F} font-size="15" fill="#1E8C79">√${n}</text>`;
  const sq=Math.sqrt(n);
  eq.innerHTML=Math.abs(sq-Math.round(sq))<1e-9?`√${n} = <span class="hl">${Math.round(sq)}</span> — a WHOLE number!`:`√${n} = <span class="hl">${out}</span>`;
  $('#ro-0',side).textContent=out;$('#ro-1',side).textContent=sq.toFixed(3);
  if(Math.abs(sq-Math.round(sq))<1e-9)ms.hit(0,'√'+n+' = '+Math.round(sq)+' — perfect square found!');
  const p=out.match(/(\d+)√(\d+)/);if(p&&+p[1]>1)ms.hit(1,'√'+n+' = '+out+' — surd simplified!');
  if(n>=100)ms.hit(2,'Deep territory. The smith fears you not.');
 };
 draw();sl.inp.oninput=()=>{SFX.slide();draw()};
}};

/* ---- LAB 1 · THE (a+b)² MACHINE (flagship) ---- */
LABS[1]={title:'The (a+b)² Machine 🧱',
init(canvas,side,w){
 canvas.innerHTML=`<svg viewBox="0 0 400 300" id="pf-lab-svg"><rect width="400" height="300" fill="#FFF7EA"/>
  <text x="200" y="30" text-anchor="middle" ${F} font-size="15" fill="#D98A1B">BUILD THE SQUARE FROM 4 PIECES</text>
  <g id="pfL"></g><text id="pfL-eq" x="200" y="286" text-anchor="middle" ${F} font-size="15" fill="#2B2438"></text></svg>`;
 const c1=labCard(side,'Two metal bars','Bar <b style="color:#2F7CC0">a</b> and bar <b style="color:#E05544">b</b> form one side: <b>a + b</b>. The machine builds that square and counts pieces live.');
 const sa=labSlider(c1,'a',1,7,3),sb=labSlider(c1,'b',1,6,2);
 const eq=labEq(side);
 const ro=labRO(side,['a² plate','2ab strips','b² corner','total']);
 const ms=labMile(side,['Read a² from the blue plate','Catch the twin strips 2ab','Spot the b² corner','Make a = b (twin bars!)','Hit the golden total (a+b)²'],w);
 const draw=()=>{
  const a=sa.v,b=sb.v,sc=170/(a+b),g=$('#pfL',canvas);
  const A=a*sc,B=b*sc,x=200-(a+b)*sc/2,y=34+(230-(a+b)*sc)/2;
  g.innerHTML=`
   <rect x="${x}" y="${y}" width="${A}" height="${A}" fill="#5EB8FF" opacity=".88"/>
   <rect x="${x+A}" y="${y}" width="${B}" height="${A}" fill="#7BC86C" opacity=".88"/>
   <rect x="${x}" y="${y+A}" width="${A}" height="${B}" fill="#7BC86C" opacity=".88"/>
   <rect x="${x+A}" y="${y+A}" width="${B}" height="${B}" fill="#FFAF3C" opacity=".95"/>
   <rect x="${x}" y="${y}" width="${A+B}" height="${A+B}" fill="none" stroke="#2B2438" stroke-width="3"/>
   ${A>36?label(x+A/2,y+A/2+6,'a²','#1B4E7A',16):''}
   ${A>36&&B>24?label(x+A+B/2,y+A/2+6,'ab','#2E6B22',13):''}
   ${B>24&&A>36?label(x+A/2,y+A+B/2+5,'ab','#2E6B22',13):''}
   ${B>28?label(x+A+B/2,y+A+B/2+6,'b²','#8A5A00',14):''}
   <line x1="${x}" y1="${y+A+B+14}" x2="${x+A}" y2="${y+A+B+14}" stroke="#2F7CC0" stroke-width="3.5"/>
   <line x1="${x+A}" y1="${y+A+B+14}" x2="${x+A+B}" y2="${y+A+B+14}" stroke="#E05544" stroke-width="3.5"/>
   ${label(x+A/2,y+A+B+30,'a','#2F7CC0',13)}${label(x+A+B/2,y+A+B+30,'b','#E05544',13)}`;
  const t=a*a,ab=2*a*b,b2=b*b;
  eq.innerHTML=`(${a}+${b})² = <span class="hl">${t}</span> + <span class="hl">${ab}</span> + <span class="hl">${b2}</span> = <span class="hl">${t+ab+b2}</span>`;
  $('#ro-0',side).textContent=t;$('#ro-1',side).textContent=ab;$('#ro-2',side).textContent=b2;$('#ro-3',side).textContent=t+ab+b2;
  ms.hit(0);ms.hit(1);ms.hit(2);
  if(a===b)ms.hit(3,'a = b → all four quarters equal → (a+a)² = 4a². You SEE it!');
  else if(a*a+2*a*b+b*b>0)ms.hit(4,'Golden total verified: the 3 pieces always rebuild the full square.');
 };
 draw();sa.inp.oninput=()=>{SFX.slide();draw()};sb.inp.oninput=()=>{SFX.slide();draw()};
}};

/* ---- LAB 2 · Treasure Plotter ---- */
LABS[2]={title:'Treasure Plotter 🗝️',
init(canvas,side,w){
 const ox=200,oy=150,ux=27,uy=24;
 const targets=[{x:3,y:2,q:'Q-I'},{x:-4,y:3,q:'Q-II'},{x:-2,y:-3,q:'Q-III'},{x:4,y:-2,q:'Q-IV'},{x:0,y:4,q:'y-axis'}];
 let ti=0;
 canvas.innerHTML=`<svg viewBox="0 0 400 300" id="ct-lab-svg">
  <rect width="400" height="300" fill="#F0F8FF"/>
  ${ARROWDEFS}${grid400(ox,oy,ux,uy,-7,7,-6,6)}
  <text id="ctL-target" x="200" y="26" text-anchor="middle" ${F} font-size="15" fill="#2F7CC0"></text>
  <g id="ctL-marks"></g><text id="ctL-msg" x="200" y="290" text-anchor="middle" ${F} font-size="12.5" fill="#6B6478"></text></svg>`;
 const c1=labCard(side,'Captain\u2019s orders','Find each treasure: click the grid where the address says. Remember — <b>x first (right/left)</b>, then <b>y (up/down)</b>.');
 const prog=labCard(side,'Expedition','');
 const ms=labMile(side,['Treasure of Q-I','Treasure of Q-II','Treasure of Q-III','Treasure of Q-IV','Treasure on the y-axis'],w);
 const upd=()=>{
  const t=targets[ti];
  $('#ctL-target',canvas).innerHTML=`Treasure #${ti+1}/5 — dig at <tspan fill="#E05544">(${t.x}, ${t.y})</tspan>`;
  prog.innerHTML=`<h4>📜 Orders</h4><p style="margin-top:5px">${targets.map((tt,i)=>`<span style="opacity:${i<ti?1:.45};font-weight:800">(${tt.x}, ${tt.y})${i<ti?' ✓':''}</span>`).join(' · ')}</p>`;
 };
 canvas.querySelector('svg').addEventListener('click',e=>{
  const svg=canvas.querySelector('svg');const pt=svg.getBoundingClientRect();
  const px=(e.clientX-pt.left)/pt.width*400, py=(e.clientY-pt.top)/pt.height*300;
  const gx=Math.round((px-ox)/ux), gy=Math.round((oy-py)/uy);
  const t=targets[ti];SFX.tap();
  const mark=(ok)=>{$('#ctL-marks',canvas).innerHTML+= ok?
   `<g class="pop-in"><circle cx="${ox+gx*ux}" cy="${oy-gy*uy}" r="10" fill="#7BC86C" opacity=".4"/><text x="${ox+gx*ux}" y="${oy-gy*uy+5}" text-anchor="middle" font-size="14">✓</text></g>`:
   `<g class="pop-in" opacity=".7"><text x="${ox+gx*ux}" y="${oy-gy*uy+5}" text-anchor="middle" font-size="13" fill="#E05544">✗</text></g>`};
  if(gx===t.x&&gy===t.y){
   mark(true);SFX.good();
   const q=t.x===0?'ON the y-axis — x is 0!':`Q-${t.q.slice(2)}`;
   toast(`Treasure #${ti+1} found — (${t.x}, ${t.y}) ${t.x===0?'sits on the y-axis!':'in '+q}`,'🗝️');
   ms.hit(ti,`(${t.x}, ${t.y}) recovered!`);ti++;
   if(ti>=targets.length){SFX.fanfare();$('#ctL-msg',canvas).textContent='ALL TREASURE RECOVERED — the sea is yours, captain 🚢'}
  } else {
   mark(false);SFX.bad();
   $('#ctL-msg',canvas).innerHTML=`You dug at (${gx}, ${gy}) — but x goes ${t.x>0?'RIGHT '+t.x:t.x<0?'LEFT '+(-t.x):'nowhere (0)'} first, then y ${t.y>0?'UP '+t.y:'DOWN '+(-t.y)}`;
  }
 });
 upd();
}};

/* ---- LAB 3 · River Fare Machine ---- */
LABS[3]={title:'Fare Line Machine 🛺',
init(canvas,side,w){
 const ox=120,oy=250,ux=22,uy=15;
 canvas.innerHTML=`<svg viewBox="0 0 400 300"><rect width="400" height="300" fill="#EFF8FB"/>
  ${ARROWDEFS}
  ${grid400(ox,oy,ux,uy,-2,11,-4,10).replace(/stroke="#EDE6D6"/g,'stroke="#DDEAF2"')}
  <line id="twL-line" x1="0" y1="0" x2="0" y2="0" stroke="#3E8FD6" stroke-width="3.5"/>
  <g id="twL-dots"></g>
  <text id="twL-target" x="200" y="26" text-anchor="middle" ${F} font-size="14" fill="#2B6CA8"></text>
  <g id="twL-rick"></g></svg>`;
 const c1=labCard(side,'Design your taxi','Fare = <b>base + rate × km</b>. That\u2019s a line: <b>y = c + m·x</b>. Base = where it starts. Rate = how steep it climbs.');
 const sb=labSlider(c1,'Base fare ₹ (where line starts)',0,60,25);
 const sr=labSlider(c1,'Rate ₹/km (steepness)',0,15,10);
 const tg=labCard(side,'🏆 Contracts','Hit the contract points exactly — tune base & rate!');
 const ms=labMile(side,['Pass through (0, 25) — the base IS the start','Pass through (2, 45)','Pass through (4, 60)','Make the line FLAT (rate = 0)'],w);
 const contracts=[[0,25],[2,45],[4,60]];
 const draw=()=>{
  const c=sb.v,m=sr.v;
  const py=f=>oy-((f-(-40))/140)*260;
  $('#twL-line',canvas).setAttribute('x1',ox);$('#twL-line',canvas).setAttribute('y1',py(c));
  $('#twL-line',canvas).setAttribute('x2',ox+10*ux);$('#twL-line',canvas).setAttribute('y2',py(c+10*m));
  $('#twL-dots',canvas).innerHTML=[0,2,4,6,8,10].map(k=>`<circle cx="${ox+k*ux}" cy="${py(c+m*k)}" r="3.5" fill="#E05544"/>`).join('');
  $('#twL-rick',canvas).innerHTML=`<text x="${ox+10*ux+4}" y="${py(c+10*m)-8}" font-size="15">🛺</text>`;
  $('#twL-target',canvas).innerHTML=`y = <tspan fill="#E05544">${c}</tspan> + <tspan fill="#1E8C79">${m}</tspan>·x — hit the contract points!`;
  contracts.forEach((k,i)=>{if(c+m*k[0]===k[1])ms.hit(i,`Contract met: (${k[0]}, ₹${k[1]})`)});
  if(m===0)ms.hit(3,'Rate 0 → flat river: every km costs the same. y = c!');
 };
 draw();sb.inp.oninput=()=>{SFX.slide();draw()};sr.inp.oninput=()=>{SFX.slide();draw()};
}};

/* ---- LAB 4 · Angle Tuner ---- */
LABS[4]={title:'Angle Tuner 📐',
init(canvas,side,w){
 canvas.innerHTML=`<svg viewBox="0 0 400 300"><rect width="400" height="300" fill="#FBF1E8"/>
  <text x="200" y="28" text-anchor="middle" ${F} font-size="14" fill="#E05544">TUNE THE CLASH · hit the target angles</text>
  <g id="aaL-rays"></g><g id="aaL-lab"></g>
  <text id="aaL-msg" x="200" y="288" text-anchor="middle" ${F} font-size="13" fill="#2B2438"></text></svg>`;
 const c1=labCard(side,'Linear pair law','Two angles on a straight line ALWAYS add to 180°. Move one — the other mirrors. Hit the target contracts.');
 const sl=labSlider(c1,'your angle a°',10,170,60);
 const tg=labCard(side,'🏆 Contracts','');
 const ms=labMile(side,['Make a = 40° (so partner = 140°)','Make partner = 90° (perfect L!)','Make a + partner hit 180° — always true ✅'],w);
 const draw=()=>{
  const a=sl.v,cx=200,cy=160,r1=a*Math.PI/180;
  $('#aaL-rays',canvas).innerHTML=`
   <line x1="${cx-125}" y1="${cy}" x2="${cx+125}" y2="${cy}" stroke="#2B2438" stroke-width="3.5"/>
   <line x1="${cx}" y1="${cy-118}" x2="${cx}" y2="${cy}" stroke="#2B2438" stroke-width="3.5"/>
   <line x1="${cx}" y1="${cy}" x2="${cx+Math.cos(r1)*118}" y2="${cy-Math.sin(r1)*118}" stroke="#E05544" stroke-width="4" stroke-linecap="round"/>
   <circle cx="${cx}" cy="${cy}" r="5" fill="#2B2438"/>`;
  $('#aaL-lab',canvas).innerHTML=`${label(cx+64*Math.cos(r1/2),cy-64*Math.sin(r1/2),a+'°','#E05544',15)}${label(cx+56*Math.cos((Math.PI+r1)/2),cy-56*Math.sin((Math.PI+r1)/2),(180-a)+'°','#1E8C79',15)}`;
  $('#aaL-msg',canvas).innerHTML=`a = <tspan fill="#E05544">${a}°</tspan> · partner = <tspan fill="#1E8C79">${180-a}°</tspan> · sum = <tspan font-weight="800">180° ✓</tspan>`;
  if(a===40)ms.hit(0,'40° locked — partner forced to 140°!');
  if(180-a===90)ms.hit(1,'Partner = 90° — the perfect L (linear pair splits in half)');
  if(a+ (180-a)===180)ms.hit(2,'180° witnessed LIVE — a + partner never misses');
 };
 draw();sl.inp.oninput=()=>{SFX.slide();draw()};
}};

/* ---- LAB 5 · Triangle Forge ---- */
LABS[5]={title:'Triangle Forge 🔺',
init(canvas,side,w){
 canvas.innerHTML=`<svg viewBox="0 0 400 300"><rect width="400" height="300" fill="#F0F8EC"/>
  <g id="tgL-tri"></g><text id="tgL-msg" x="200" y="288" text-anchor="middle" ${F} font-size="13.5" fill="#2B2438"></text></svg>`;
 const c1=labCard(side,'Three bars, one rule','Two bars must TOGETHER beat the third, or no triangle closes: <b>a + b > c</b>. The forge shows the truth live.');
 const sa=labSlider(c1,'side a',1,12,3),sb=labSlider(c1,'side b',1,12,4),sc=labSlider(c1,'side c',1,12,5);
 const ro=labRO(side,['valid?','semi-perimeter s','Heron area']);
 const ms=labMile(side,['Forge the classic 3·4·5','Break the law (a+b ≤ c) — see the fail','Build an isosceles (a = b)','Compute an area with Heron'],w);
 const draw=()=>{
  const a=sa.v,b=sb.v,c=sc.v,g=$('#tgL-tri',canvas);
  const ok=a+b>c&&b+c>a&&a+c>b;
  if(ok){
   const B=(a*a+c*c-b*b)/(2*a);
   const h=Math.sqrt(Math.max(0,c*c-B*B));
   const sc2=190/a, X=60,Y=250;
   const pts=`${X},${Y} ${X+a*sc2},${Y} ${X+B*sc2},${Y-h*sc2}`;
   g.innerHTML=`<polygon points="${pts}" fill="#7BC86C" opacity=".3" stroke="#4E9642" stroke-width="3.5"/>
    ${label(X+a*sc2/2,Y+16,'a = '+a,'#4E9642',13)}${label(X+ (a+B)*sc2/2+16,Y-h*sc2/2,'b = '+b,'#4E9642',13)}${label(X+B*sc2/2-14,Y-h*sc2/2,'c = '+c,'#4E9642',13)}`;
   const s=(a+b+c)/2,area=Math.sqrt(s*(s-a)*(s-b)*(s-c));
   $('#ro-0',side).textContent='YES ✓';$('#ro-1',side).textContent=s.toFixed(1);$('#ro-2',side).textContent=area.toFixed(2);
   $('#tgL-msg',canvas).innerHTML=`a + b = ${a+b} > c = ${c} ✓ triangle CLOSES · Heron: √(${s.toFixed(1)}·${(s-a).toFixed(1)}·${(s-b).toFixed(1)}·${(s-c).toFixed(1)}) = <tspan fill="#1E8C79">${area.toFixed(2)}</tspan>`;
   if(a===3&&b===4&&c===5)ms.hit(0,'3·4·5 — the legendary right triangle!');
   if(a===b)ms.hit(2,'Isosceles forged — equal legs, equal base angles');
   if(area>0)ms.hit(3,'Heron computed: '+area.toFixed(2)+' sq units');
  } else {
   g.innerHTML=`<line x1="60" y1="250" x2="${60+a*16}" y2="250" stroke="#4E9642" stroke-width="4"/>
    <line x1="${60+a*16}" y1="250" x2="${60+a*16+b*16}" y2="250" stroke="#4E9642" stroke-width="4" opacity=".45"/>
    <line x1="60" y1="250" x2="${60+a*16+b*16}" y2="250" stroke="#4E9642" stroke-width="4" opacity=".45"/>
    <text x="200" y="220" text-anchor="middle" font-size="30">💥</text>`;
   $('#ro-0',side).textContent='NO ✗';$('#ro-1',side).textContent='–';$('#ro-2',side).textContent='–';
   $('#tgL-msg',canvas).innerHTML=`a + b = ${a+b} ≤ c = ${c} — bars too short, the triangle <tspan fill="#E05544">COLLAPSES</tspan>`;
   ms.hit(1,'You broke it! a + b must BEAT c. Now you know why.');
  }
 };
 draw();[sa,sb,sc].forEach(s=>s.inp.oninput=()=>{SFX.slide();draw()});
}};

/* ---- LAB 6 · The Circle Dial (flagship) ---- */
LABS[6]={title:'The Circle Dial ⭕',
init(canvas,side,w){
 canvas.innerHTML=`<svg viewBox="0 0 400 300"><rect width="400" height="300" fill="#FBF9FF"/>
  <g id="cirL"></g><text id="cirL-msg" x="200" y="290" text-anchor="middle" ${F} font-size="13" fill="#7452B8"></text></svg>`;
 const c1=labCard(side,'Turn the sacred dial','Radius r drives everything: <b>C = 2πr</b>, <b>A = πr²</b>. Watch the blue squares fill the circle — the count is the area.');
 const sr=labSlider(c1,'radius r',1,8,4);
 const eq=labEq(side);
 const ro=labRO(side,['C = 2πr','A = πr²','A when r→2r']);
 const ms=labMile(side,['See C and A obey the dial','Double r — watch A become 4×!','Set r = 7 (π ≈ 22/7 magic)','Fill the circle with unit squares'],w);
 let lastA=0;
 const draw=()=>{
  const r=sr.v,cx=170,cy=150,sc=16,g=$('#cirL',canvas);
  let sq='';const cols=Math.floor(2*r);
  for(let i=0;i<cols;i++)for(let j=0;j<cols;j++){
   const x=cx-r+i+0.5,y=cy-r+j+0.5;
   if(Math.hypot(x-cx,y-cy)<=r-0.25)sq+=`<rect x="${cx-r+i+1.5}" y="${cy-r+j+1.5}" width="${sc-1}" height="${sc-1}" fill="#5EB8FF" opacity=".35" rx="2"/>`}
  g.innerHTML=sq+`
   <circle cx="${cx}" cy="${cy}" r="${r*sc}" fill="none" stroke="#9B7BDE" stroke-width="4.5"/>
   <line x1="${cx}" y1="${cy}" x2="${cx+r*sc}" y2="${cy}" stroke="#E05544" stroke-width="3"/>
   ${label(cx+r*sc/2,cy-8,'r = '+r,'#E05544',14)}
   <circle cx="${cx}" cy="${cy}" r="3.5" fill="#2B2438"/>`;
  const C=2*Math.PI*r,A=Math.PI*r*r;
  eq.innerHTML=`C = 2π·${r} = <span class="hl">${C.toFixed(2)}</span> &nbsp;·&nbsp; A = π·${r}² = <span class="hl">${A.toFixed(2)}</span>`;
  $('#ro-0',side).textContent=C.toFixed(1);$('#ro-1',side).textContent=A.toFixed(1);
  $('#ro-2',side).textContent=(4*Math.PI*r*r).toFixed(0)+' (r→2r)';
  $('#cirL-msg',canvas).innerHTML=`diameter = <tspan font-weight="800">${2*r}</tspan> · ratio C/d = ${(C/(2*r)).toFixed(3)} = π, ALWAYS`;
  if(lastA>0&&r>1&&Math.abs(A/lastA-4)<.02)ms.hit(1,'r doubled → A × 4. Area scales with r², not r!');
  lastA=A;
  if(r===7)ms.hit(2,'r = 7 → C = 2×(22/7)×7 = 44 — the 22/7 trick in action!');
  ms.hit(0);ms.hit(3);
 };
 draw();sr.inp.oninput=()=>{SFX.slide();draw()};
}};

/* ---- LAB 7 · Storm Data Desk ---- */
LABS[7]={title:'Storm Data Desk 📊',
init(canvas,side,w){
 canvas.innerHTML=`<svg viewBox="0 0 400 300"><rect width="400" height="300" fill="#FBF4E4"/>
  <text x="200" y="28" text-anchor="middle" ${F} font-size="14" fill="#B87716">ROLL THE STORM · read the data</text>
  <line x1="40" y1="242" x2="370" y2="242" stroke="#2B2438" stroke-width="2.5"/>
  <g id="dsL-bars"></g><g id="dsL-stats" x="0"></g></svg>`;
 const c1=labCard(side,'Dice factory','Every roll feeds the bars. The desk computes <b>mean / median / mode</b> live. Watch them settle as data grows.');
 const row=labCard(side,'','');
 row.innerHTML=`<h4>🎲 Roll dice</h4><div style="display:flex;gap:8px;margin-top:8px"><button class="btn sm amber" id="dsL-r10">+10</button><button class="btn sm ghost" id="dsL-r50">+50</button><button class="btn sm ghost" id="dsL-reset">reset</button></div>`;
 const ro=labRO(side,['rolls','mean','median','mode']);
 const ms=labMile(side,['Roll 50+ dice','Mean settles near 3.5','Spot the mode'],w);
 let data=[];
 const render=()=>{
  const hist=[0,0,0,0,0,0];data.forEach(v=>hist[v-1]++);
  const mx=Math.max(...hist,1);const g=$('#dsL-bars',canvas);
  g.innerHTML=hist.map((h,i)=>{const bh=h/mx*150;
   return `<rect x="${52+i*52}" y="${242-bh}" width="34" height="${bh}" rx="6" fill="${h===Math.max(...hist)&&h>0?'#E8A23C':'#EBDDBA'}"/>
    <text x="${69+i*52}" y="${236-bh}" text-anchor="middle" ${F} font-size="12" fill="#2B2438">${h}</text>
    <text x="${69+i*52}" y="259" text-anchor="middle" ${F} font-size="12.5" fill="#6B6478">${i+1}</text>`}).join('');
  const n=data.length;
  if(!n)return;
  const mean=data.reduce((a,b)=>a+b,0)/n;
  const sorted=[...data].sort((a,b)=>a-b);
  const median=sorted[Math.floor((n-1)/2)];
  let mode=hist.indexOf(Math.max(...hist))+1;
  $('#ro-0',side).textContent=n;$('#ro-1',side).textContent=mean.toFixed(2);
  $('#ro-2',side).textContent=median;$('#ro-3',side).textContent=mode;
  if(n>=50)ms.hit(0,'50+ data points — serious storm-keeping!');
  if(n>=50&&Math.abs(mean-3.5)<0.3)ms.hit(1,`Mean ${mean.toFixed(2)} ≈ 3.5 — the storm\u2019s centre, exactly as theory says`);
  if(n>=20)ms.hit(2,`Mode = ${mode} — the crowd favourite`);
 };
 const roll=k=>{for(let i=0;i<k;i++)data.push(ri(1,6));SFX.whoosh();render()};
 row.querySelector('#dsL-r10').onclick=()=>roll(10);
 row.querySelector('#dsL-r50').onclick=()=>roll(50);
 row.querySelector('#dsL-reset').onclick=()=>{data=[];render();SFX.click()};
 render();
}};
