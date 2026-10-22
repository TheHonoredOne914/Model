/* ================================================================
   SCREENS — Title, Intro story, World Map, World Hub, init
   ================================================================ */
function buildTitle(){
 $('#scr-holder').innerHTML=`
 <div class="screen on" id="scr-title">
  <div class="title-sun"></div>
  <span class="title-math" style="top:12%;left:8%;font-size:44px;transform:rotate(-12deg)">π</span>
  <span class="title-math" style="top:64%;left:5%;font-size:34px;transform:rotate(9deg)">√2</span>
  <span class="title-math" style="top:18%;right:12%;font-size:38px;transform:rotate(8deg)">x²</span>
  <span class="title-math" style="bottom:10%;right:8%;font-size:40px;transform:rotate(-8deg)">180°</span>
  <span class="title-math" style="bottom:20%;left:14%;font-size:30px;transform:rotate(6deg)">a+b</span>
  <div class="hero-stage"><div class="hero-float">${heroSVG()}</div><div class="hero-shadow"></div></div>
  <div class="logo-war"><div class="l1">MATHS <span class="m">WARS</span></div><div class="l2">THE FOG MUST FALL</div></div>
  <div class="tagline">8 islands · every concept hidden inside a game · <b>you learn without noticing</b></div>
  <div class="title-actions">
   <button class="btn lg amber pulse" id="bt-enter">⚔️ ENTER THE WAR</button>
   <button class="btn ghost sm" id="bt-how">❓ How does this teach math??</button>
   ${S.xp>0?'<button class="btn ghost sm" id="bt-reset" style="opacity:.65;font-size:12px;padding:7px 14px">↺ Reset war progress</button>':''}
  </div>
 </div>`;
 setHUD(null);
 $('#bt-enter').onclick=()=>{SFX.fanfare();S.seenIntro?goMap():startIntro()};
 const br=$('#bt-reset');if(br)br.onclick=()=>{localStorage.removeItem(SKEY);location.reload()};
 $('#bt-how').onclick=()=>{
  SFX.click();
  modal(`<div class="deb-ribbon gold">HOW MATHS WAR TEACHES</div>
  <div class="modal-body">
   <div class="step-line"><div class="n">1</div><div><div class="t">🎬 Concept Film</div><div class="d">Each island opens with a 4-scene interactive movie. You tap, drag and guess — the math sneaks in while you play.</div></div></div>
   <div class="step-line"><div class="n">2</div><div><div class="t">🔬 Hands-on Lab</div><div class="d">A machine with sliders: build the (a+b)² square, turn the circle dial, tune angles. You SEE formulas happen.</div></div></div>
   <div class="step-line"><div class="n">3</div><div><div class="t">📓 Practice Arena</div><div class="d">Paper-first questions — infinite unique ones. Solve on paper, check, then walk the step-by-step Solution Deck.</div></div></div>
   <div class="step-line"><div class="n">4</div><div><div class="t">⚔️ Boss Battle</div><div class="d">Every island\u2019s monster guards its concepts. Beat it = the math is YOURS. A debrief tells you exactly what you learned.</div></div></div>
   <p style="text-align:center;font-weight:800;font-size:13px;margin-top:10px;color:var(--teal-d)">You never “study”. You conquer. Same thing. 😎</p>
  </div>
  <div class="modal-foot"><button class="btn" onclick="closeModal()">Got it ⚔️</button></div>`);
 };
}
/* ---------- INTRO STORY ---------- */
const INTRO=[
 {k:'Chapter 0 · The Fog',t:'A fog is eating math',p:'Something called <b>The Fog</b> drifts across the 8 islands of Maths War — wherever it lands, formulas turn vague, steps dissolve, and students say "I don\u2019t get it". You\u2019ve felt it too. Everyone has.',mini:'Dhruva: “The Fog isn\u2019t fought with memory. It\u2019s fought with SEEING. Let\u2019s go.”'},
 {k:'Your hero',t:'Meet Dhruva',p:'A Class-9 student with a pencil-blade, a π-shield, and zero patience for boring lectures. That\u2019s you. Each island hides its math inside games, machines and boss fights — you play, the concept lands, the Fog retreats.',mini:'Rule of the war: <b>if it feels like studying, we\u2019re doing it wrong.</b>'},
 {k:'The map',t:'8 islands. 8 concepts.',p:'Number line bridges, a volcano forge of (a+b)², treasure plotted on grids, rickshaw rivers, Euclid\u2019s arena, triangle peaks, π-temple rings, and a dice-storm casino. Clear one island → the next unlocks. No timers chasing you. No shame. Just war.',mini:'Ready? Tap the first island, watch its film, crank its machines. 🌊'}
];
let introIdx=0;
function startIntro(){introIdx=0;renderIntro()}
function renderIntro(){
 const s=INTRO[introIdx];
 $('#scr-holder').innerHTML=`
 <div class="screen on" id="scr-intro">
  <div class="intro-card">
   <div class="intro-kicker">${s.k}</div>
   <h2>${s.t}</h2>
   <p>${s.p}</p>
   <div class="say-mini">💬 ${s.mini}</div>
   <div class="intro-dots">${INTRO.map((_,i)=>`<i class="${i<=introIdx?'on':''}"></i>`).join('')}</div>
   <div class="name-row">
    ${introIdx>0?`<button class="btn ghost sm" id="in-prev">← Back</button>`:''}
    <button class="btn ${introIdx===INTRO.length-1?'amber':''}" id="in-next">${introIdx===INTRO.length-1?'⚔️ Begin the war':'Next →'}</button>
   </div>
  </div>
 </div>`;
 $('#in-next').onclick=()=>{SFX.click();if(introIdx<INTRO.length-1){introIdx++;renderIntro()}else{S.seenIntro=true;save();goMap()}};
 const p=$('#in-prev');if(p)p.onclick=()=>{SFX.click();introIdx--;renderIntro()};
}
/* ---------- WORLD MAP ---------- */
const ISLE_POS=[[150,400],[300,270],[470,200],[640,270],[760,150],[560,440],[800,340],[900,210]];
function isleUnlocked(i){return i===0||S.worlds[i-1].theater}
function goMap(){
 setHUD('Maths War','The Sea of Concepts · Class 9');
 const stars=w=>{const st=S.worlds[w];return (st.theater?1:0)+(st.lab?1:0)+(st.boss?1:0)};
 const boatAt=ISLE_POS[clamp(S.worlds.filter(x=>x.theater).length,0,7)];
 let route='';for(let i=0;i<7;i++){const a=ISLE_POS[i],b=ISLE_POS[i+1];
  route+=`<path d="M${a[0]} ${a[1]} Q ${(a[0]+b[0])/2} ${(a[1]+b[1])/2-46} ${b[0]} ${b[1]}" fill="none" stroke="#7FBFC9" stroke-width="3" stroke-dasharray="2 12" stroke-linecap="round" class="wave"/>`}
 $('#scr-holder').innerHTML=`
 <div class="screen" id="scr-map">
  <div class="map-top"><h2>Choose your island, Dhruva ⚔️</h2><p>${S.worlds.filter(x=>x.theater).length}/8 islands awakened · best streak 🔥${S.best} · total ⚡${S.xp} XP</p></div>
  <div class="map-wrap"><svg id="map-svg" viewBox="0 0 1000 560" xmlns="http://www.w3.org/2000/svg">
   <defs>
    <radialGradient id="sea" cx=".5" cy=".4"><stop offset="0" stop-color="#CBEFF2"/><stop offset="1" stop-color="#A8DDE4"/></radialGradient>
    <linearGradient id="sand" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFF3D6"/><stop offset="1" stop-color="#F5DFA8"/></linearGradient>
   </defs>
   <rect width="1000" height="560" fill="url(#sea)"/>
   ${[0,1,2].map(k=>`<path d="M0 ${120+k*150} q 40 -12 80 0 t 80 0 t 80 0 t 80 0 t 80 0 t 80 0 t 80 0 t 80 0 t 80 0 t 80 0 t 80 0" fill="none" stroke="#ffffff" stroke-width="3" opacity=".28" class="wave"/>`).join('')}
   ${route}
   <g transform="translate(${boatAt[0]},${boatAt[1]+34})"><g class="boat"><path d="M-16 6 L16 6 L10 14 L-10 14 Z" fill="#E05544"/><rect x="-2" y="-12" width="3.4" height="18" fill="#5B3A00"/><path d="M1 -12 L14 2 L1 2 Z" fill="#fff"/></g></g>
   ${WORLDS.map((w,i)=>{const p=ISLE_POS[i],un=isleUnlocked(i),st=stars(i),done=st===3;
    return `<g transform="translate(${p[0]},${p[1]})"><g class="isle ${un?'':'locked'}" data-w="${i}">
     <circle class="halo" r="58" fill="${w.color}" opacity=".18"/>
     ${done?`<circle r="47" fill="none" stroke="#FFD34D" stroke-width="3.5" stroke-dasharray="8 6"/>`:''}
     <path d="M-46 10 Q-50 -26 0 -30 Q50 -26 46 10 Q30 24 0 22 Q-30 24 -46 10 Z" fill="${un?'url(#sand)':'#C9C4B8'}" stroke="${un?w.dark:'#9A958A'}" stroke-width="2.5"/>
     <ellipse cx="-16" cy="-18" rx="15" ry="9" fill="${un?'#7BC86C':'#B5B0A5'}"/><ellipse cx="14" cy="-20" rx="12" ry="7" fill="${un?'#8FD47F':'#B5B0A5'}"/>
     <text y="-34" text-anchor="middle" font-size="26" ${un?'':'opacity=".5"'}>${un?w.icon:'🔒'}</text>
     <text class="name" y="44">${w.name}</text>
     <text class="stars" y="60">${'⭐'.repeat(st)}${'·'.repeat(3-st)}</text>
     ${un?'':'<text y="76" text-anchor="middle" font-size="10" font-weight="800" fill="#6B6478">watch the previous film to unlock</text>'}
     ${un&&st<3?`<g transform="translate(34,-38)"><g class="coach-finger"><path d="M0 14 L0 2 Q0 -4 5 -2 L14 3 Q18 6 14 9 L4 15 Z" fill="#fff" stroke="#2B2438" stroke-width="1.6"/></g></g>`:''}
    </g></g>`}).join('')}
  </svg></div>
 </div>`;
 show('scr-map');
 $$('#map-svg .isle').forEach(g=>g.onclick=()=>{
  const w=+g.dataset.w;
  if(!isleUnlocked(w)){SFX.bad();toast('Finish the previous island\u2019s Concept Film first!','🔒');return}
  SFX.click();goHub(w);
 });
 if(!S.coachDone.map){setTimeout(()=>{coach('Tap the first island to start your war!', '#map-svg .isle');S.coachDone.map=true;save()},600)}
}
/* ---------- WORLD HUB ---------- */
function goHub(w){
 const W=WORLDS[w],st=S.worlds[w];
 setHUD(W.name,W.real);
 const pct=v=>Math.min(100,v);
 $('#scr-holder').innerHTML=`
 <div class="screen" id="scr-hub"><div class="scrolly">
  <div class="hub-hero">
   <div class="hub-icon" style="background:${W.soft};border-color:${W.color}">${W.icon}</div>
   <div class="hub-title"><h2>${W.name}</h2><div class="sub">${W.real} · ${W.tagline}</div></div>
   <div style="margin-left:auto;display:flex;flex-direction:column;gap:6px;align-items:flex-end">
    <button class="btn ghost sm" id="hb-map">🗺️ All islands</button>
    ${stars3(w)}
   </div>
  </div>
  <div class="hub-story"><span class="q">MISSION BRIEFING</span>${W.story}</div>
  <div class="howto">
   <div class="step"><b style="background:${W.color}">1</b> Watch the film 🎬</div>
   <div class="step"><b style="background:${W.color}">2</b> Crank the lab 🔬</div>
   <div class="step"><b style="background:${W.color}">3</b> Paper practice 📓</div>
   <div class="step"><b style="background:${W.color}">4</b> Boss battle ⚔️</div>
  </div>
  <div class="missions">
   ${missionCard(w,'🎬','Concept Film','An interactive movie. Tap, drag, guess — learn on the sly.',st.theater,'pct-theater',()=>startTheater(w),W,'Watch & play')}
   ${missionCard(w,'🔬','Hands-on Lab','Sliders and dials. Make the formula happen with your own hands.',st.lab,'pct-lab',()=>startLab(w),W,'Enter the lab')}
   ${missionCard(w,'📓','Practice Arena','Paper-first. Infinite unique questions + full Solution Decks.',st.practice>=8,'pct-pr',()=>startPractice(w),W,'Solve on paper',`${st.practice}/8 solved`)}
   ${missionCard(w,'⚔️',W.boss,W.taunt,st.boss,'pct-boss',()=>startBoss(w),W,'Fight the boss',st.boss?'defeated ✓':'8 practice solves recommended')}
  </div>
 </div></div>`;
 show('scr-hub');
 $('#hb-map').onclick=()=>{SFX.click();goMap()};
 const go=[()=>startTheater(w),()=>startLab(w),()=>startPractice(w),()=>startBoss(w)];
 $$('#scr-hub .mission').forEach((m,i)=>{m.onclick=()=>{SFX.click();go[i]()}});
 if(!S.coachDone['hub'+w]){setTimeout(()=>{coach('Start with the Concept Film — it plays like a video, but YOU control it.','#scr-hub .mission');S.coachDone['hub'+w]=true;save()},700)}
}
function stars3(w){const st=S.worlds[w];const n=(st.theater?1:0)+(st.lab?1:0)+(st.boss?1:0);
 return `<div style="font-size:15px;letter-spacing:2px">${'⭐'.repeat(n)}${'<span style="opacity:.3">⭐</span>'.repeat(3-n)}</div>`}
function missionCard(w,ico,title,desc,done,barId,go,W,cta,stat){
 const pct=done?100:0;
 return `<button class="mission ${done?'done':''}" data-bar="${barId}">
  <div class="m-go">→</div>
  <div class="m-ico" style="background:${W.soft}">${ico}</div>
  <h3>${title}</h3><p>${desc}</p>
  <div class="m-bar"><i style="width:${pct}%"></i></div>
  <div class="m-stat">${done?'✅ '+cta:cta}</div>
 </button>`;
}
/* ---------- INIT ---------- */
window.addEventListener('load',()=>{
 updateHUD();buildTitle();
 const cv=$('#confetti-cv');cv.width=innerWidth;cv.height=innerHeight;
 window.addEventListener('resize',()=>{cv.width=innerWidth;cv.height=innerHeight});
 document.addEventListener('pointerdown',()=>{const c=ac();if(c&&c.state==='suspended')c.resume()},{once:true});
});
