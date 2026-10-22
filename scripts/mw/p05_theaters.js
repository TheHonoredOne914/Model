/* ================================================================
   CONCEPT THEATER — every game is an interactive video.
   Kid plays; math sneaks in. After it: DEBRIEF reveals what they learned.
   ================================================================ */
const TH={
 wrap:null,sayEl:null,ctrlEl:null,nextBtn:null,dots:null,
 world:0,idx:0,scenes:[],done:false,wire:null
};
function startTheater(w){
 TH.world=w;TH.idx=0;TH.scenes=THEATERS[w];TH.done=false;
 setHUD(WORLDS[w].name+' · Concept Film','Watch, play, learn (secretly)');
 buildTheaterScreen();
 show('scr-theater');
 playScene(0);
}
function buildTheaterScreen(){
 const w=WORLDS[TH.world];
 $('#scr-holder').innerHTML=`
 <div class="screen" id="scr-theater">
  <div class="th-top">
   <span style="font-size:20px">🎬</span><div class="t">${w.name} — The Concept Film</div>
   <div class="th-progress" id="th-dots">${TH.scenes.map(()=>'<i></i>').join('')}</div>
  </div>
  <div class="th-stage"><div class="th-svg-wrap" id="th-wrap"></div></div>
  <div class="th-bottom">
   <div class="say" id="th-say"></div>
   <div id="th-extra" style="width:100%;max-width:640px;display:flex;justify-content:center"></div>
   <div class="th-ctrl">
    <button class="btn ghost sm" id="th-skip">Skip film</button>
    <button class="btn amber" id="th-next">Next →</button>
   </div>
   <div class="th-hint" id="th-hint"></div>
  </div>
 </div>`;
 TH.wrap=$('#th-wrap');
 $('#th-next').onclick=()=>{SFX.click();thNext()};
 $('#th-skip').onclick=()=>{SFX.click();thFinish(true)};
}
function playScene(i){
 if(CUR!=='scr-theater')return;
 TH.idx=i;TH.done=false;
 const sc=TH.scenes[i];
 $$('#th-dots i').forEach((d,k)=>d.classList.toggle('did',k<i));
 TH.wrap.innerHTML=`<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">${sc.svg()}</svg>`;
 const say=$('#th-say');
 say.innerHTML=(sc.who?`<span class="who">${sc.who}</span>`:'')+sc.say;
 say.style.animation='none';void say.offsetWidth;say.style.animation='';
 $('#th-hint').textContent=sc.hint||'';
 $('#th-next').classList.remove('pulse');
 const extra=$('#th-extra');extra.innerHTML=sc.extra||'';
 if(sc.init){$('#th-next').disabled=true;sc.init(TH.wrap,(skipLock)=>{if(TH.done)return;TH.done=true;$('#th-next').disabled=false;$('#th-next').classList.add('pulse');SFX.pop()},extra);}
 else{$('#th-next').disabled=false;$('#th-next').classList.add('pulse')}
 SFX.whoosh();
}
function thNext(){
 if(!TH.done||CUR!=='scr-theater')return;
 if(TH.idx<TH.scenes.length-1){playScene(TH.idx+1)}
 else thFinish(false);
}
function thFinish(skipped){
 const w=WORLDS[TH.world],st=S.worlds[TH.world];
 st.theater=true;save();
 addXP(skipped?10:40,skipped?'Film watched':'Concept film complete');
 if(!skipped)SFX.fanfare();
 confetti(innerWidth/2,innerHeight/2,80);
 debrief({title:'🎖 MISSION DEBRIEF',cls:'',ribbon:skipped?'Quick watch, hero. Here\u2019s what the film covered:':'Shhh… while you were playing, you actually learned:',
  concepts:w.concepts.slice(0,4),
  lines:[`<b>${w.real}</b> — first concepts are IN your head now. You didn\u2019t memorise a single formula. 😏`],
  btn:'To the mission board',onGo:()=>goHub(TH.world)});
}

/* ---------- tiny svg helpers ---------- */
const F=`font-family="Baloo 2" font-weight="800"`;
function numLine(y,x0,x1,min,max,step,cls=''){
 let s=`<line x1="${x0}" y1="${y}" x2="${x1}" y2="${y}" stroke="#2B2438" stroke-width="3" ${cls} marker-end="url(#arr)"/>`;
 const n=Math.round((max-min)/step);
 for(let i=0;i<=n;i++){const x=x0+(x1-x0)*i/n;
  s+=`<line x1="${x}" y1="${y-6}" x2="${x}" y2="${y+6}" stroke="#2B2438" stroke-width="2"/>
      <text x="${x}" y="${y+22}" text-anchor="middle" ${F} font-size="12" fill="#6B6478">${min+i*step}</text>`}
 return s;
}
const ARROWDEFS=`<defs><marker id="arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="#2B2438"/></marker></defs>`;
function grid400(ox=170,oy=150,ux=26,uy=26,xr=[-6,8],yr=[-5,5]){
 let s='';
 for(let x=xr[0];x<=xr[1];x++)s+=`<line x1="${ox+x*ux}" y1="${oy+yr[0]*uy}" x2="${ox+x*ux}" y2="${oy+yr[1]*uy}" stroke="#EDE6D6" stroke-width="1"/>`;
 for(let y=yr[0];y<=yr[1];y++)s+=`<line x1="${ox+xr[0]*ux}" y1="${oy+y*uy}" x2="${ox+xr[1]*ux}" y2="${oy+y*uy}" stroke="#EDE6D6" stroke-width="1"/>`;
 s+=`<line x1="${ox+xr[0]*ux}" y1="${oy}" x2="${ox+(xr[1]+0.6)*ux}" y2="${oy}" stroke="#2B2438" stroke-width="2.5" marker-end="url(#arr)"/>`;
 s+=`<line x1="${ox}" y1="${oy+yr[0]*uy}" x2="${ox}" y2="${oy+(yr[1]+0.6)*uy}" stroke="#2B2438" stroke-width="2.5" marker-end="url(#arr)"/>`;
 s+=`<text x="${ox+(xr[1]+0.6)*ux}" y="${oy+16}" ${F} font-size="13" fill="#2B2438">x</text>`;
 s+=`<text x="${ox+10}" y="${oy+(yr[1]+0.6)*uy-4}" ${F} font-size="13" fill="#2B2438">y</text>`;
 return s;
}
function dhruvaDot(x,y,r=9,c='#FF9A3C'){
 return `<circle cx="${x}" cy="${y}" r="${r+4}" fill="${c}" opacity=".25"><animate attributeName="r" values="${r+2};${r+7};${r+2}" dur="1.6s" repeatCount="indefinite"/></circle><circle cx="${x}" cy="${y}" r="${r}" fill="${c}" stroke="#fff" stroke-width="2.5"/>`;
}
function label(x,y,t,c='#2B2438',s=13){return `<text x="${x}" y="${y}" text-anchor="middle" ${F} font-size="${s}" fill="${c}">${t}</text>`}

/* ================================================================
   THEATER SCRIPTS — worlds 0..3
   ================================================================ */
const THEATERS=[];

/* ---------- WORLD 0 · ISLA NUMBRA ---------- */
THEATERS[0]=[
{who:'GUIDE',say:`Every number here is a <b>bridge tile</b>. Tap each signpost to wake up a family of numbers — from the innocent counting numbers to the full integer clan.`,
 hint:'👆 Tap the four signposts in order',
 svg:()=>ARROWDEFS+`
  <rect x="0" y="0" width="400" height="300" fill="#EAF7F4"/>
  ${numLine(210,40,360,-3,3,1)}
  <circle cx="115" cy="210" r="5" fill="#2FB8A0"/><circle cx="200" cy="210" r="5" fill="#2FB8A0"/><circle cx="285" cy="210" r="5" fill="#2FB8A0"/>
  <text x="200" y="40" text-anchor="middle" ${F} font-size="17" fill="#1E8C79">THE BRIDGE OF FAMILIES</text>
  <g class="tapon" data-t="n"><rect x="46" y="66" width="66" height="44" rx="10" fill="#2FB8A0"/><text x="79" y="88" text-anchor="middle" ${F} font-size="13" fill="#fff">Counting</text><text x="79" y="102" text-anchor="middle" ${F} font-size="11" fill="#DFF5F0">1 2 3…</text></g>
  <g class="tapon" data-t="w" opacity=".35"><rect x="120" y="66" width="66" height="44" rx="10" fill="#5EB8FF"/><text x="153" y="88" text-anchor="middle" ${F} font-size="13" fill="#fff">Whole</text><text x="153" y="102" text-anchor="middle" ${F} font-size="11" fill="#E3F1FF">+ 0</text></g>
  <g class="tapon" data-t="z" opacity=".35"><rect x="194" y="66" width="72" height="44" rx="10" fill="#FFAF3C"/><text x="230" y="88" text-anchor="middle" ${F} font-size="13" fill="#fff">Integers</text><text x="230" y="102" text-anchor="middle" ${F} font-size="11" fill="#FFF1DA">−3 −2 −1</text></g>
  <g class="tapon" data-t="q" opacity=".35"><rect x="274" y="66" width="80" height="44" rx="10" fill="#FF7B6B"/><text x="314" y="88" text-anchor="middle" ${F} font-size="13" fill="#fff">Rationals</text><text x="314" y="102" text-anchor="middle" ${F} font-size="11" fill="#FFE6E2">p/q · 0.5 · −2¾</text></g>
  <text id="nb-msg" x="200" y="150" text-anchor="middle" ${F} font-size="14" fill="#2B2438" opacity="0">…</text>`,
 init(root,done,extra){
  const order=['n','w','z','q'];let step=0;
  const msgs={n:'1, 2, 3… counting numbers (N) — the first tiles ever laid',w:'Add 0 → Whole numbers (W). Zero joins the bridge!',z:'Mirror them left → Integers (Z). Now negatives can cross too.',q:'Fractions & decimals fill EVERY gap → Rationals (Q). The bridge is packed! ✓'};
  $$('.tapon',root).forEach(g=>g.onclick=()=>{
   if(g.dataset.t!==order[step]){SFX.bad();toast('Wake them in order! Counting first','👆');return}
   SFX.good();g.setAttribute('opacity','1');
   const m=$('#nb-msg',root);if(!m)return;m.textContent=msgs[g.dataset.t];m.setAttribute('opacity','1');m.classList.remove('pop-in');void m.getBBox;m.classList.add('pop-in');
   if(++step===4)done();
  });
 }},
{who:'DHRUVA',say:`Wait — the wise crowd says <b>nothing lives between 1 and 2</b>?? Let\u2019s build a right triangle right on the line and see what crawls out of the corner…`,
 hint:'👆 Tap 3 times: leg 1, leg 1, then the slanted side',
 svg:()=>ARROWDEFS+`
  <rect width="400" height="300" fill="#EAF7F4"/>
  ${numLine(240,60,340,0,4,1)}
  <g id="nb-build">
   <g class="tapon" data-s="1"><path d="M140 240 L140 164" stroke="#FFAF3C" stroke-width="5" stroke-linecap="round" stroke-dasharray="6 7" class="ghost-line"/><circle cx="140" cy="164" r="10" fill="#FFAF3C" opacity=".85"/><text x="118" y="205" ${F} font-size="13" fill="#D98A1B">1 up</text></g>
   <g class="tapon" data-s="2" opacity="0"><path d="M140 164 L216 164" stroke="#5EB8FF" stroke-width="5" stroke-linecap="round" stroke-dasharray="6 7"/><text x="178" y="152" ${F} font-size="13" fill="#2F7CC0">1 right</text></g>
   <g class="tapon" data-s="3" opacity="0"><path d="M140 240 L216 164" stroke="#FF7B6B" stroke-width="6" stroke-linecap="round"/><text x="215" y="215" ${F} font-size="15" fill="#E05544">√2 ?!</text></g>
  </g>
  <text x="200" y="42" text-anchor="middle" ${F} font-size="17" fill="#1E8C79">THE HIDDEN TUNNEL · 1 ➜ 2</text>
  <text id="nb-msg2" x="200" y="270" text-anchor="middle" ${F} font-size="14" fill="#2B2438" opacity="0"></text>`,
 init(root,done){
  let step=0;const msgs=['A tower of height 1 ⬆','Now walk 1 to the right ➡','The shortcut corner-to-corner… its length is 1² + 1² = 2, so length = <tspan font-weight="800">√2</tspan> — a REAL tunnel between 1 and 2!'];
  $$('#nb-build .tapon',root).forEach(g=>g.onclick=()=>{
   const s=+g.dataset.s;if(s!==step+1){SFX.bad();return}
   SFX.good();
   if(s===1){g.querySelector('.ghost-line').classList.add('dash-draw');root.querySelector('[data-s="2"]').setAttribute('opacity','1')}
   if(s===2){root.querySelector('[data-s="3"]').setAttribute('opacity','1')}
   if(s===3){g.classList.add('dash-draw');const t=$('#nb-msg2',root);if(!t)return;t.innerHTML=msgs[2];t.setAttribute('opacity','1');t.classList.add('pop-in');done();return}
   const t=$('#nb-msg2',root);if(!t)return;t.textContent=msgs[step];t.setAttribute('opacity','1');t.classList.add('pop-in');step++;
  });
 }},
{who:'GUIDE',say:`√2 is IRRATIONAL — its digits never end, never repeat. But we can still trap it! Slide the pin: below 1.41 is too small, above 1.42 too big. Squeeze it.`,
 hint:'🎛 Slide the pin onto √2',
 svg:()=>`
  <rect width="400" height="300" fill="#EAF7F4"/>
  <text x="200" y="46" text-anchor="middle" ${F} font-size="17" fill="#1E8C79">THE √2 SQUEEZER</text>
  <line x1="60" y1="150" x2="340" y2="150" stroke="#2B2438" stroke-width="3"/>
  <g id="nb-ticks"></g><g id="nb-pin-g"></g>
  <rect x="60" y="200" width="280" height="64" rx="12" fill="#fff" stroke="#E9E2D5"/>
  <text id="nb-calc" x="200" y="238" text-anchor="middle" ${F} font-size="15" fill="#2B2438">1.41 × 1.41 = 1.9881 &lt; 2</text>`,
 init(root,done,extra){
  const x=v=>60+(v-1.40)/(1.43-1.40)*280;
  const tg=$('#nb-ticks',root),pg=$('#nb-pin-g',root);
  [1.40,1.41,1.42,1.43].forEach(v=>{tg.innerHTML+=`<line x1="${x(v)}" y1="144" x2="${x(v)}" y2="156" stroke="#2B2438" stroke-width="2"/><text x="${x(v)}" y="176" text-anchor="middle" ${F} font-size="12" fill="#6B6478">${v.toFixed(2)}</text>`});
  tg.innerHTML+=`<line x1="${x(1.4142)}" y1="120" x2="${x(1.4142)}" y2="150" stroke="#FF7B6B" stroke-width="2" stroke-dasharray="4 4"/><text x="${x(1.4142)}" y="112" text-anchor="middle" ${F} font-size="13" fill="#E05544">√2 lives here</text>`;
  const slWrap=document.createElement('div');slWrap.innerHTML=`<input type="range" min="1400" max="1430" step="1" value="1400" style="width:min(420px,86%)">`;
  const slInp=slWrap.firstChild;extra.appendChild(slInp);
  const pin=$('#nb-pin-g',root);
  const draw=v=>{const xv=x(v/1000);pin.innerHTML=`${dhruvaDot(xv,150,8,'#2FB8A0')}<text x="${xv}" y="132" text-anchor="middle" ${F} font-size="13" fill="#1E8C79">${(v/1000).toFixed(2)}</text>`;
   const sq=((v/1000)**2).toFixed(4);
   const c=$('#nb-calc',root);
   c.innerHTML=`${(v/1000).toFixed(2)} × ${(v/1000).toFixed(2)} = ${sq} — ${sq<2?'still LESS than 2… squeeze right!':'past 2! bit too far, ease left…'}`;
   c.setAttribute('fill',sq<2?'#1E8C79':'#E05544')};
  draw(1400);let close=false;
  slInp.oninput=e=>{const v=+e.target.value;SFX.slide();draw(v);if(Math.abs(v-1414)<=2&&!close){close=true;SFX.good();toast('TRAPPED! √2 is between 1.41 and 1.42','🎯');done()}};
 }},
{who:'DHRUVA',say:`Final gate! The serpent mixed <b>rational</b> and <b>irrational</b> tiles. Tap each tile: is it R (ends or repeats) or I (forever-random)? Classify all six to open the bridge.`,
 hint:'👆 Tap R or I for every tile',
 extra:`<div style="display:flex;gap:8px"><button class="btn sm teal" id="nb-r" style="background:var(--teal)">R · Rational</button><button class="btn sm coral" id="nb-i">I · Irrational</button></div>`,
 svg:()=>`
  <rect width="400" height="300" fill="#EAF7F4"/>
  <text x="200" y="40" text-anchor="middle" ${F} font-size="17" fill="#1E8C79">SORT THE BRIDGE TILES</text>
  <g id="nb-tiles">${['2','0.333…','22/7','π','√5','0.101001…'].map((t,i)=>{
   const x=78+(i%3)*122,y=88+Math.floor(i/3)*84;return `<g class="tile" data-i="${i}"><rect x="${x-40}" y="${y-30}" width="80" height="60" rx="12" fill="#fff" stroke="#E9E2D5" stroke-width="2"/><text x="${x}" y="${y+6}" text-anchor="middle" ${F} font-size="16" fill="#2B2438">${t}</text><text class="verdict" x="${x}" y="${y-34}" text-anchor="middle" ${F} font-size="12" fill="#7BC86C"></text></g>`}).join('')}
  </g><text id="nb-done" x="200" y="282" text-anchor="middle" ${F} font-size="14" fill="#1E8C79" opacity="0">ALL SIX SORTED — the bridge hums with power ⚡</text>`,
 init(root,done,extra){
  const truth=['R','R','R','I','I','I'];const solved=new Set();
  const why={0:'2 = 2/1 ✓ ends',1:'0.333… repeats → 1/3 ✓',2:'22/7 is p/q ✓',3:'π = 3.14159… never repeats ✗',4:'√5 ≈ 2.2360679… ✗',5:'no pattern, no end ✗'};
  extra.querySelector('#nb-r').onclick=()=>vote('R');extra.querySelector('#nb-i').onclick=()=>vote('I');
  let cur=0;$$('.tile',root).forEach(t=>t.onclick=()=>{cur=+t.dataset.i;SFX.tap();toast(`Tile: ${['2','0.333…','22/7','π','√5','0.101001…'][cur]} — your verdict?`,'🤔')});
  function vote(v){
   const t=$$('.tile',root)[cur];if(solved.has(cur)){toast('Already sorted!','✅');return}
   const ok=truth[cur]===v;t.querySelector('.verdict').textContent=(ok?'✓ ':'✗ ')+why[cur].split(' ')[0];
   t.querySelector('rect').setAttribute('fill',ok?(v==='R'?'#DFF5F0':'#EFE9FB'):'#FFE6E2');
   t.querySelector('text').setAttribute('fill',ok?'#1E8C79':'#E05544');
   if(ok){SFX.good();solved.add(cur)}else SFX.bad();
   toast(why[cur],ok?'✅':'❌');
   if(solved.size===6){$('#nb-done',root).setAttribute('opacity','1');done()}
  }
 }}
];

/* ---------- WORLD 1 · POLYFORGE ---------- */
THEATERS[1]=[
{who:'FOREMAN BOT',say:`The Great Identity Gear builds one giant square from bars: side = <b>a + b</b>. Guess its total area before we build it, hero.`,
 hint:'👆 Pick a guess — every guess is a good guess',
 extra:`<div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center">
  <button class="btn sm ghost" data-g="0">a² + b²</button>
  <button class="btn sm ghost" data-g="1">a² + 2ab + b²</button>
  <button class="btn sm ghost" data-g="2">2ab</button></div>`,
 svg:()=>`
  <rect width="400" height="300" fill="#FFF7EA"/>
  <text x="200" y="40" text-anchor="middle" ${F} font-size="16" fill="#D98A1B">THE IDENTITY GEAR · side = a + b</text>
  <g class="floaty"><rect x="120" y="70" width="110" height="110" rx="6" fill="none" stroke="#D98A1B" stroke-width="3.5" stroke-dasharray="8 7"/>
  <rect x="120" y="70" width="66" height="110" fill="#FFAF3C" opacity=".25"/>
  <rect x="186" y="70" width="44" height="110" fill="#FF7B6B" opacity=".25"/>
  <text x="153" y="132" text-anchor="middle" ${F} font-size="16" fill="#D98A1B">a</text><text x="208" y="132" text-anchor="middle" ${F} font-size="16" fill="#E05544">b</text>
  <text x="175" y="205" text-anchor="middle" ${F} font-size="13" fill="#6B6478">a + b wide… and a + b tall</text></g>
  <text x="200" y="248" text-anchor="middle" ${F} font-size="14" fill="#2B2438">Total area = ? 🤔</text>`,
 init(root,done,extra){
  extra.querySelectorAll('[data-g]').forEach(b=>b.onclick=()=>{
   SFX.good();const t=b.textContent;
   toast(b.dataset.g==='1'?'Hold that thought — let\u2019s SEE it!':'Interesting! Most kids say that. Watch the build…','🧠');
   b.classList.add('coach-ring');setTimeout(()=>done(),600);
  });
 }},
{who:'FOREMAN BOT',say:`Build it live! Tap 4 times — drop the big <b>a×a</b> plate, two <b>a×b</b> strips, one <b>b×b</b> corner. Count the pieces.`,
 hint:'👆 Tap the gear 4 times to drop all pieces',
 svg:()=>`
  <rect width="400" height="300" fill="#FFF7EA"/>
  <text x="200" y="34" text-anchor="middle" ${F} font-size="16" fill="#D98A1B">PIECE BY PIECE</text>
  <g id="pf-sq" class="tapon" style="cursor:pointer">
   <rect x="130" y="56" width="140" height="140" fill="none" stroke="#2B2438" stroke-width="2.5"/>
   <g id="pf-a2" opacity="0"><rect x="130" y="56" width="84" height="84" fill="#5EB8FF" opacity=".85"/></g>
   <g id="pf-ab1" opacity="0"><rect x="214" y="56" width="56" height="84" fill="#7BC86C" opacity=".85"/></g>
   <g id="pf-ab2" opacity="0"><rect x="130" y="140" width="84" height="56" fill="#7BC86C" opacity=".85"/></g>
   <g id="pf-b2" opacity="0"><rect x="214" y="140" width="56" height="56" fill="#FFAF3C" opacity=".9"/></g>
   <text x="172" y="102" text-anchor="middle" ${F} font-size="17" fill="#1B4E7A">a²</text>
   <text x="242" y="102" text-anchor="middle" ${F} font-size="15" fill="#2E6B22">ab</text>
   <text x="172" y="172" text-anchor="middle" ${F} font-size="15" fill="#2E6B22">ab</text>
   <text x="242" y="172" text-anchor="middle" ${F} font-size="15" fill="#8A5A00">b²</text>
  </g>
  <text x="200" y="228" text-anchor="middle" ${F} font-size="14" fill="#2B2438" id="pf-count">4 pieces hiding inside one square</text>
  <text x="200" y="256" text-anchor="middle" ${F} font-size="13" fill="#6B6478">a² plate · ab strip · ab strip · b² corner</text>`,
 init(root,done){
  const ids=['pf-a2','pf-ab1','pf-ab2','pf-b2'];let k=0;
  $('#pf-sq',root).onclick=()=>{
   if(k<4){$('#'+ids[k],root).setAttribute('opacity','1');$('#'+ids[k],root).classList.add('pop-in');SFX.good();k++;
    $('#pf-count',root).textContent=k<4?`${k} of 4 pieces dropped…`:'ALL 4! a² + ab + ab + b² — that\u2019s the whole square ✅';}
   if(k===4)done();
  };
 }},
{who:'DHRUVA',say:`Now the magic: the two green <b>ab</b> strips are twins — tap both to fuse them into <b>2ab</b>. The gear\u2019s inscription will light up.`,
 hint:'👆 Tap both green ab strips',
 svg:()=>`
  <rect width="400" height="300" fill="#FFF7EA"/>
  <g id="pf-fuse">
   <rect x="130" y="56" width="140" height="140" fill="none" stroke="#2B2438" stroke-width="2.5"/>
   <rect x="130" y="56" width="84" height="84" fill="#5EB8FF" opacity=".85"/>
   <g class="fuse" data-f="1" style="cursor:pointer"><rect x="214" y="56" width="56" height="84" fill="#7BC86C" opacity=".85"/><text x="242" y="102" text-anchor="middle" ${F} font-size="15" fill="#2E6B22">ab</text></g>
   <g class="fuse" data-f="2" style="cursor:pointer"><rect x="130" y="140" width="84" height="56" fill="#7BC86C" opacity=".85"/><text x="172" y="172" text-anchor="middle" ${F} font-size="15" fill="#2E6B22">ab</text></g>
   <rect x="214" y="140" width="56" height="56" fill="#FFAF3C" opacity=".9"/>
   <text x="172" y="102" text-anchor="middle" ${F} font-size="17" fill="#1B4E7A">a²</text><text x="242" y="172" text-anchor="middle" ${F} font-size="15" fill="#8A5A00">b²</text>
  </g>
  <text x="200" y="236" text-anchor="middle" ${F} font-size="17" fill="#2B2438" id="pf-eq">a² + ab + ab + b²</text>`,
 init(root,done){
  let n=0;
  $$('.fuse',root).forEach(f=>f.onclick=()=>{
   if(f.dataset.fused)return;f.dataset.fused=1;SFX.good();f.querySelector('rect').setAttribute('fill','#2FB8A0');f.querySelector('rect').setAttribute('opacity','.95');n++;
   if(n===2){$('#pf-eq',root).innerHTML='a² + <tspan fill="#1E8C79">2ab</tspan> + b²  ⚡';$('#pf-eq',root).classList.add('glow-soft');
    toast('The IDENTITY is born: (a+b)² = a² + 2ab + b²','⚡');setTimeout(done,700)}
   else toast('One twin fused! Tap the other','🟩');
  });
 }},
{who:'FOREMAN BOT',say:`Proof it works for ANY a and b! Slide them — the square reshapes and the numbers obey. This is the gear you\u2019ll crank in the Lab next.`,
 hint:'🎛 Slide a and b — watch the equation obey',
 extra:`<div style="display:flex;gap:14px;width:min(460px,90%)"><div style="flex:1"><input type="range" id="pf-a" min="2" max="6" value="3" style="width:100%"><div style="text-align:center;font-weight:800;font-size:12px">a</div></div><div style="flex:1"><input type="range" id="pf-b" min="1" max="5" value="2" style="width:100%"><div style="text-align:center;font-weight:800;font-size:12px">b</div></div></div>`,
 svg:()=>`
  <rect width="400" height="300" fill="#FFF7EA"/>
  <g id="pf-live"></g>
  <text x="200" y="266" text-anchor="middle" ${F} font-size="15" fill="#2B2438" id="pf-eq2"></text>`,
 init(root,done,extra){
  const draw=(a,b)=>{
   const sc=150/(a+b),g=$('#pf-live',root);
   const A=a*sc,B=b*sc,x=200-(a+b)*sc/2,y=20+(150-(a+b)*sc)/2;
   g.innerHTML=`
    <rect x="${x}" y="${y}" width="${A}" height="${A}" fill="#5EB8FF" opacity=".85"/>
    <rect x="${x+A}" y="${y}" width="${B}" height="${A}" fill="#7BC86C" opacity=".85"/>
    <rect x="${x}" y="${y+A}" width="${A}" height="${B}" fill="#7BC86C" opacity=".85"/>
    <rect x="${x+A}" y="${y+A}" width="${B}" height="${B}" fill="#FFAF3C" opacity=".9"/>
    <rect x="${x}" y="${y}" width="${A+B}" height="${A+B}" fill="none" stroke="#2B2438" stroke-width="2.5"/>
    ${A>34?label(x+A/2,y+A/2+6,'a²','#1B4E7A',16):''}${B>26?label(x+A+B/2,y+A/2+6,'ab','#2E6B22',13):''}
    ${B>26?label(x+A/2,y+A+B/2+6,'ab','#2E6B22',13):''}${B>30?label(x+A+B/2,y+A+B/2+6,'b²','#8A5A00',14):''}`;
   $('#pf-eq2',root).innerHTML=`${a}² + 2·${a}·${b} + ${b}² = <tspan fill="#E05544">${a*a}</tspan> + <tspan fill="#1E8C79">${2*a*b}</tspan> + <tspan fill="#D98A1B">${b*b}</tspan> = <tspan fill="#2B2438">${a*a+2*a*b+b*b}</tspan> = (${a}+${b})² ✓`;
  };
  draw(3,2);
  extra.querySelector('#pf-a').oninput=e=>{SFX.slide();draw(+e.target.value,+extra.querySelector('#pf-b').value)};
  extra.querySelector('#pf-b').oninput=e=>{SFX.slide();draw(+extra.querySelector('#pf-a').value,+e.target.value)};
  let moved=false;extra.addEventListener('input',()=>{if(!moved){moved=true;setTimeout(done,900)}});
 }}
];

/* ---------- WORLD 2 · CARTESIA ISLES ---------- */
THEATERS[2]=[
{who:'HARBOR MASTER',say:`No island here has a name — only an <b>address</b>: how far RIGHT (x), how far UP (y). Tap islands to hear their addresses.`,
 hint:'👆 Tap all 3 islands',
 svg:()=>ARROWDEFS+grid400(200,190,28,28,-6,6,-5,4)+
  `<g id="ct-isl">
   <g class="tapon" data-p="2,3" style="cursor:pointer"><ellipse cx="256" cy="106" rx="17" ry="11" fill="#7BC86C"/><ellipse cx="256" cy="106" rx="24" ry="15" fill="#7BC86C" opacity=".3"/></g>
   <g class="tapon" data-p="-4,1" style="cursor:pointer"><ellipse cx="88" cy="162" rx="17" ry="11" fill="#FFAF3C"/><ellipse cx="88" cy="162" rx="24" ry="15" fill="#FFAF3C" opacity=".3"/></g>
   <g class="tapon" data-p="-3,-3" style="cursor:pointer"><ellipse cx="116" cy="274" rx="17" ry="11" fill="#FF7B6B"/><ellipse cx="116" cy="274" rx="24" ry="15" fill="#FF7B6B" opacity=".3"/></g>
  </g>
  <text id="ct-msg" x="200" y="36" text-anchor="middle" ${F} font-size="16" fill="#2F7CC0">Tap an island to ask its address…</text>`,
 init(root,done){
  const seen=new Set();
  $$('#ct-isl .tapon',root).forEach(g=>g.onclick=()=>{
   SFX.good();const [x,y]=g.dataset.p.split(',');
   const cm=$('#ct-msg',root);if(!cm)return;cm.innerHTML=`This island lives at <tspan fill="#E05544">(${x}, ${y})</tspan> → ${Math.abs(+x)} right, then ${+y>=0?Math.abs(+y)+' up':Math.abs(+y)+' down'}`;
   g.querySelector('ellipse').setAttribute('stroke','#2B2438');g.querySelector('ellipse').setAttribute('stroke-width','2.5');
   seen.add(g.dataset.p);if(seen.size===3)done();
  });
 }},
{who:'HARBOR MASTER',say:`The map\u2019s heart is the <b>Origin (0, 0)</b> — where the two great axes cross. Tap it to plant the anchor flag. Everything is measured FROM here.`,
 hint:'👆 Tap the crossing point (0,0)',
 svg:()=>ARROWDEFS+grid400(200,160,30,30,-6,6,-4,4)+
  `<text x="200" y="34" text-anchor="middle" ${F} font-size="16" fill="#2F7CC0">THE ORIGIN — HEART OF THE MAP</text>
   <g id="ct-org" style="cursor:pointer"><circle cx="200" cy="160" r="14" fill="#FFD34D" opacity=".4"><animate attributeName="r" values="12;17;12" dur="1.4s" repeatCount="indefinite"/></circle><circle cx="200" cy="160" r="8" fill="#FFD34D"/></g>
   <text id="ct-org-msg" x="200" y="286" text-anchor="middle" ${F} font-size="13" fill="#2B2438" opacity="0">(0,0) — zero right, zero up. Every address starts here. ⚓</text>`,
 init(root,done){$('#ct-org',root).onclick=()=>{SFX.good();$('#ct-org-msg',root).setAttribute('opacity','1');$('#ct-org-msg',root).classList.add('pop-in');done()}}},
{who:'HARBOR MASTER',say:`The axes split the sea into <b>4 quadrants</b>. Each has a sign-signature. Tap all four zones to raise their flags.`,
 hint:'👆 Tap the 4 colored zones',
 svg:()=>ARROWDEFS+grid400(200,160,30,30,-6,6,-4,4)+
  `<g id="ct-quad">
   <g class="tapon" data-q="I" style="cursor:pointer"><rect x="200" y="40" width="180" height="120" fill="#7BC86C" opacity=".18"/></g>
   <g class="tapon" data-q="II" style="cursor:pointer"><rect x="20" y="40" width="180" height="120" fill="#5EB8FF" opacity=".18"/></g>
   <g class="tapon" data-q="III" style="cursor:pointer"><rect x="20" y="160" width="180" height="120" fill="#FF7B6B" opacity=".18"/></g>
   <g class="tapon" data-q="IV" style="cursor:pointer"><rect x="200" y="160" width="180" height="120" fill="#FFAF3C" opacity=".18"/></g>
  </g>
  <g id="ct-qlab"></g>`,
 init(root,done){
  const flags={I:['(+,+)','both positive','#2E6B22'],II:['(−,+)','x negative, y positive','#2F7CC0'],III:['(−,−)','both negative','#E05544'],IV:['(+,−)','x positive, y negative','#D98A1B']};
  const seen=new Set();
  $$('#ct-quad .tapon',root).forEach(g=>g.onclick=()=>{
   if(seen.has(g.dataset.q))return;seen.add(g.dataset.q);SFX.good();
   const f=flags[g.dataset.q],lab=$('#ct-qlab',root);
   const cx=g.dataset.q==='I'||g.dataset.q==='IV'?290:110,cy=g.dataset.q==='I'||g.dataset.q==='II'?100:220;
   lab.innerHTML+=`<text x="${cx}" y="${cy-8}" text-anchor="middle" ${F} font-size="15" fill="${f[2]}">Q-${g.dataset.q}</text><text x="${cx}" y="${cy+12}" text-anchor="middle" ${F} font-size="14" fill="${f[2]}">${f[0]}</text><text x="${cx}" y="${cy+28}" text-anchor="middle" ${F} font-size="10.5" fill="#6B6478">${f[1]}</text>`;
   g.setAttribute('opacity','.16');g.setAttribute('opacity','.3');
   if(seen.size===4){toast('Sign-signatures memorised, captain!','🧭');done()}
  });
 }},
{who:'DHRUVA',say:`Treasure time! The chest sits at <b>(3, −2)</b>. Sail from the Origin: tap <b>Right 3</b>, then <b>Down 2</b>. X marks the spot.`,
 hint:'👆 Sail: Right 3 first, then Down 2',
 extra:`<div style="display:flex;gap:8px"><button class="btn sm sky" id="ct-r">Right 3 ➡</button><button class="btn sm coral" id="ct-d" disabled>⬇ Down 2</button></div>`,
 svg:()=>ARROWDEFS+grid400(200,160,26,26,-6,7,-4,4)+
  `<text x="200" y="30" text-anchor="middle" ${F} font-size="16" fill="#2F7CC0">SAIL TO (3, −2)</text>
   <g id="ct-boat"></g><g id="ct-tr"></g><text id="ct-pos" x="200" y="294" text-anchor="middle" ${F} font-size="13" fill="#6B6478">at Origin (0,0)</text>`,
 init(root,done,extra){
  const X=200,Y=160;let x=0,y=0;const draw=()=>{$('#ct-boat',root).innerHTML=dhruvaDot(X+x*26,Y+y*26,8,'#FF9A3C');$('#ct-pos',root).textContent=`at (${x}, ${y})`};
  draw();
  extra.querySelector('#ct-r').onclick=()=>{if(x===3){SFX.bad();toast('Already 3 right! Now Down 2','⬇');return}x=3;SFX.whoosh();draw();toast('3 right ✓ — the X-coordinate is set','➡');extra.querySelector('#ct-d').disabled=false};
  extra.querySelector('#ct-d').onclick=()=>{if(y===-2)return;y=-2;SFX.whoosh();draw();
   $('#ct-tr',root).innerHTML=`<text x="${X+3*26}" y="${Y-2*26-16}" text-anchor="middle" font-size="26">❌</text><text x="${X+3*26}" y="${Y-2*26+30}" text-anchor="middle" ${F} font-size="12" fill="#2B2438">(3, −2) · Q-IV</text>`;
   SFX.fanfare();confetti(innerWidth/2,innerHeight*.4,50);done()};
 }}
];

/* ---------- WORLD 3 · TWIN RIVER LINES ---------- */
THEATERS[3]=[
{who:'RIVER PILOT',say:`Twin River taxi rules: <b>₹25 to sit</b>, then <b>₹10 per km</b>. Tap rows to build the fare table — watch what\u2019s growing each time.`,
 hint:'👆 Tap the table 4 times',
 svg:()=>`
  <rect width="400" height="300" fill="#EFF8FB"/>
  <text x="200" y="38" text-anchor="middle" ${F} font-size="16" fill="#2B6CA8">AUTO FARE · base ₹25 + ₹10/km</text>
  <g transform="translate(120,58)">
   <rect width="160" height="180" rx="12" fill="#fff" stroke="#E9E2D5" stroke-width="2"/>
   <text x="80" y="26" text-anchor="middle" ${F} font-size="12" fill="#6B6478">km → fare</text>
   <g id="tw-rows"></g>
   <g id="tw-tap" style="cursor:pointer"><rect x="0" y="130" width="160" height="44" rx="12" fill="#3E8FD6"/><text x="80" y="157" text-anchor="middle" ${F} font-size="13" fill="#fff">+ tap next row</text></g>
  </g>
  <text x="60" y="270" ${F} font-size="13" fill="#2B6CA8">🛺</text>
  <text id="tw-msg" x="200" y="276" text-anchor="middle" ${F} font-size="13.5" fill="#2B2438" opacity="0"></text>`,
 init(root,done){
  const rows=[[0,25],[1,35],[2,45],[3,55]];let k=0;const g=$('#tw-rows',root);
  $('#tw-tap',root).onclick=()=>{
   const r=rows[k];SFX.good();
   g.innerHTML+=`<text x="46" y="${54+k*22}" text-anchor="end" ${F} font-size="13" fill="#2B2438">${r[0]} km</text><text x="114" y="${54+k*22}" ${F} font-size="13" fill="#E05544">₹${r[1]}</text>`;
   $('#tw-msg',root).setAttribute('opacity','1');
   $('#tw-msg',root).innerHTML=r[0]===0?'Sitting itself costs ₹25 — that\u2019s the <tspan font-weight="800">BASE</tspan>':`+1 km → +₹10. Fare = <tspan font-weight="800">25 + 10 × km</tspan>`;
   k++;if(k===4)done();else $('#tw-tap',root).querySelector('text').textContent=`+ tap next row (${k}/4)`;
  };
 }},
{who:'RIVER PILOT',say:`That fare rule <b>F = 25 + 10x</b> is a straight line in disguise! Slide the km dial — the rickshaw drives and the points click onto a line.`,
 hint:'🎛 Slide km from 0 to 6',
 extra:`<div style="width:min(420px,86%)"><input type="range" id="tw-km" min="0" max="60" value="0" style="width:100%"></div>`,
 svg:()=>ARROWDEFS+grid400(150,240,24,24,-1,10,-1,8)+
  `<text x="200" y="30" text-anchor="middle" ${F} font-size="15" fill="#2B6CA8">FARE = 25 + 10x — THE RIVER OF POINTS</text>
   <line id="tw-line" x1="0" y1="0" x2="0" y2="0" stroke="#3E8FD6" stroke-width="0" />
   <g id="tw-pts"></g><g id="tw-rick"></g>`,
 init(root,done,extra){
  const ox=126,oy=264,ux=24,uy=24;
  const px=x=>ox+x*ux,py=f=>oy-(f/10-1)*uy;
  let maxX=0;const seen=new Set();
  const sl=extra.querySelector('#tw-km');
  sl.oninput=e=>{
   const x=+e.target.value/10;SFX.slide();
   $('#tw-rick',root).innerHTML=`<text x="${px(x)}" y="${py(25+10*x)-10}" text-anchor="middle" font-size="17">🛺</text>`;
   if(x>maxX){maxX=x;$('#tw-line',root).setAttribute('x1',px(0));$('#tw-line',root).setAttribute('y1',py(25));
    $('#tw-line',root).setAttribute('x2',px(x));$('#tw-line',root).setAttribute('y2',py(25+10*x));$('#tw-line',root).setAttribute('stroke-width','3.5')}
   const key=Math.round(x*2);
   if(!seen.has(key)&&x>0){seen.add(key);$('#tw-pts',root).innerHTML+=`<circle cx="${px(x)}" cy="${py(25+10*x)}" r="4.5" fill="#E05544" stroke="#fff" stroke-width="1.5"/>`}
   if(x>=5.9&&!this.d){this.d=1;SFX.good();toast('Every km lands ON the same straight line — that\u2019s a LINEAR equation!','📈');setTimeout(done,600)}
  };
 }},
{who:'RIVER PILOT',say:`A second river flows: <b>F = 40 + 5x</b> (a pricier taxi, slower rise). Two non-parallel rivers ALWAYS cross exactly once — tap to reveal the crossing.`,
 hint:'👆 Tap the water to reveal the crossing point',
 svg:()=>ARROWDEFS+grid400(140,250,22,22,-1,12,-1,10)+
  `<text x="200" y="28" text-anchor="middle" ${F} font-size="15" fill="#2B6CA8">TWO RIVERS, ONE CROSSING</text>
   <line x1="${140+0*22}" y1="${250-(2.5-1)*22}" x2="${140+11*22}" y2="${250-(13.5-1)*22}" stroke="#3E8FD6" stroke-width="3.5"/>
   <line x1="${140+0*22}" y1="${250-(4-1)*22}" x2="${140+11*22}" y2="${250-(9.5-1)*22}" stroke="#FF7B6B" stroke-width="3.5"/>
   <text x="${140+9.6*22}" y="${250-(12.6-1)*22}" ${F} font-size="11.5" fill="#2B6CA8">F = 25 + 10x</text>
   <text x="${140+9.8*22}" y="${250-(8.7-1)*22}" ${F} font-size="11.5" fill="#E05544">F = 40 + 5x</text>
   <g id="tw-x" style="cursor:pointer" opacity="0"><circle cx="${140+3*22}" cy="${250-(5.5-1)*22}" r="16" fill="#FFD34D" opacity=".5"/></g>
   <text id="tw-xmsg" x="200" y="286" text-anchor="middle" ${F} font-size="13" fill="#2B2438" opacity="0"></text>`,
 init(root,done){
  root.querySelector('#tw-x').setAttribute('opacity','1');
  root.querySelectorAll('svg')[0];
  const g=$('#tw-x',root);g.style.cursor='pointer';
  g.onclick=()=>{
   SFX.fanfare();g.innerHTML+=`<circle cx="${140+3*22}" cy="${250-(5.5-1)*22}" r="6" fill="#E05544" stroke="#fff" stroke-width="2"/><text x="${140+3*22}" y="${250-(5.5-1)*22-22}" text-anchor="middle" ${F} font-size="13" fill="#E05544">(3, 55)</text>`;
   $('#tw-xmsg',root).innerHTML='At <tspan font-weight="800">x=3</tspan> BOTH charge ₹55 — the one point that solves both equations. That\u2019s why we solve pairs!';
   $('#tw-xmsg',root).setAttribute('opacity','1');done();
  };
 }},
{who:'DHRUVA',say:`Quick captain\u2019s test — a point is a solution only if <b>both sides match</b>. For F = 25 + 10x: is (3, 50) a solution? Choose!`,
 hint:'👆 Choose Yes or No',
 extra:`<div style="display:flex;gap:8px"><button class="btn sm teal" id="tw-y">Yes ✓</button><button class="btn sm coral" id="tw-n">No ✗</button></div>`,
 svg:()=>`
  <rect width="400" height="300" fill="#EFF8FB"/>
  <text x="200" y="50" text-anchor="middle" ${F} font-size="17" fill="#2B6CA8">CHECK THE POINT (3, 50)</text>
  <text x="200" y="110" text-anchor="middle" ${F} font-size="20" fill="#2B2438">F = 25 + 10x</text>
  <text x="200" y="152" text-anchor="middle" ${F} font-size="18" fill="#2B2438">LHS: 50&nbsp;&nbsp;|&nbsp;&nbsp;RHS: 25 + 10×(3)</text>
  <text x="200" y="192" text-anchor="middle" ${F} font-size="18" fill="#2B2438">RHS = 25 + 30 = 55</text>
  <text x="200" y="248" text-anchor="middle" ${F} font-size="15" fill="#6B6478">50 ≠ 55 → the point floats OFF the river 🌊</text>`,
 init(root,done,extra){
  extra.querySelector('#tw-y').onclick=()=>{SFX.bad();toast('50 ≠ 55 — off the river! It\u2019s NOT a solution','❌')};
  extra.querySelector('#tw-n').onclick=()=>{SFX.good();toast('Right! Only points that BALANCE the equation are solutions','✅');done()};
 }}
];
