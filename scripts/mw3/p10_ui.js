<script>
'use strict';
/* ================= UI · SCREENS · ROUTER · BATTLE ================= */
const App=$('#app');
let QSTATE=null,BOS=null,EXSTATE={};

/* ---------- topbar ---------- */
function renderTopbar(){
 const lvl=levelOf(S.xp),prog=levelProg(S.xp);
 $('#tb').innerHTML='<div class="tb-in">'
  +'<button class="logo" onclick="A.home()"><span class="logo-badge"><svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M4 4 L20 20 M20 4 L4 20" stroke="#fde68a" stroke-width="2.6" stroke-linecap="round"/><circle cx="12" cy="12" r="4.6" stroke="#fff" stroke-width="2.2"/></svg></span>'
  +'<span class="logo-t">MATHS WAR<small>GRADE 9 · CONCEPT ARENA</small></span></button>'
  +'<div class="tb-r">'
  +'<div class="lvl-chip"><span class="av">🛡️</span><span class="lvltext"><b>WARRIOR</b><span>LV '+lvl+' · '+levelTitle(S.xp)+'</span></span></div>'
  +'<div class="xpwrap"><div class="xpbar"><div class="xpfill" style="width:'+prog+'%"></div></div><div class="xplab">'+S.xp+' XP · next LV '+(lvl*260-S.xp>0?lvl*260-S.xp:'MAX')+'</div></div>'
  +'<button class="ico-btn" onclick="A.sound()" title="sound">'+(S.sound?'🔊':'🔇')+'</button>'
  +'</div></div>';
}

/* ---------- overlays ---------- */
function showOvl(html,noClose){$('#ovl').innerHTML='<div class="ovl-bg" '+(noClose?'':'onclick="A.ovlClose()"')+'></div><div class="ovl-in">'+html+'</div>';$('#ovl').classList.add('show')}
function closeOvl(){$('#ovl').classList.remove('show');$('#ovl').innerHTML=''}

/* ---------- router ---------- */
let ROUTE={view:'home'};
function go(v,p){ROUTE=Object.assign({view:v},p||{});render();scrollTo(0,0)}
function render(){
 closeOvl();
 if(ROUTE.view==='home'){setHue('quad');renderHome()}
 else if(ROUTE.view==='world'){setHue(ROUTE.wid);renderWorld(ROUTE.wid)}
 else if(ROUTE.view==='lesson'){setHue(ROUTE.wid);renderLesson(ROUTE.wid,ROUTE.cid,ROUTE.step||0)}
 else if(ROUTE.view==='quiz'){setHue(ROUTE.wid);renderQuiz()}
 renderTopbar();
}

/* ---------- HOME ---------- */
function renderHome(){
 const tot=WORLDS.reduce((a,w)=>a+w.concepts.length,0);
 const cov=Object.keys(S.covered).length;
 const bossWins=Object.values(S.boss).reduce((a,b)=>a+b,0);
 App.innerHTML='<div class="screen">'
 +'<div class="hero">'
 +'<span class="hero-kick">⚔️ GRADE 9 · NCERT CONCEPT ARENA · HERO: WARRIOR</span>'
 +'<h1 class="hero-t">MATHS WAR</h1>'
 +'<p class="hero-sub">Every chapter. Every concept. One living arena. Learn with animated diagrams, train on infinite exam-style questions and dethrone 12 bosses.</p>'
 +'<div class="hero-cta"><button class="btn btn-p btn-xl" onclick="document.getElementById(\'wgrid\').scrollIntoView({behavior:\'smooth\'})">🗺️ Choose your battlefield</button>'
 +'<button class="btn btn-g btn-xl" onclick="A.startRandom()">🎲 Surprise me</button></div>'
 +'<div class="hero-stats">'
 +'<div class="stat-pill"><b>'+WORLDS.length+'</b><span>Worlds</span></div>'
 +'<div class="stat-pill"><b>'+tot+'</b><span>Concepts</span></div>'
 +'<div class="stat-pill"><b>'+cov+'/'+tot+'</b><span>Covered</span></div>'
 +'<div class="stat-pill"><b>'+bossWins+'</b><span>Boss wins</span></div>'
 +'</div></div>'
 +'<div class="free-note">🔓 <span><b>Nothing is locked.</b> Jump to ANY chapter, ANY concept, in ANY order. Learn, practice and fight bosses wherever you want.</span></div>'
 +'<div class="sect-h" id="wgrid"><h2>🗺️ The 12 Worlds</h2><span>pick any — the whole syllabus is open</span></div>'
 +'<div class="wgrid">'
 +WORLDS.map(w=>{
  const covw=worldCov(w),pct=Math.round(covw/w.concepts.length*100);
  const h=HUES[w.id];
  return '<button class="wcard" style="--ac:'+h[0]+';--acsoft:'+h[1]+';--acink:'+h[0]+';--acdeep:'+h[2]+';animation-delay:'+(WORLDS.indexOf(w)*0.04)+'s" onclick="A.world(\''+w.id+'\')">'
  +'<div class="wicon">'+w.ic+'</div>'
  +'<div class="wname">'+w.n+'</div>'
  +'<div class="wtag">'+w.tag+'</div>'
  +'<div class="wmeta"><span>'+w.concepts.length+' concepts · <span class="cov">'+covw+' covered</span></span>'
  +'<span class="ring" data-t="'+pct+'%" style="--p:'+pct+'"></span></div></button>';
 }).join('')
 +'</div>'
 +'<p class="muted" style="text-align:center;margin-top:30px;font-size:12px">Maths War · your progress saves automatically in this browser · <button class="btn btn-sm btn-g" onclick="A.reset()" style="font-size:11px;padding:5px 10px">reset progress</button></p>'
 +'</div>';
}

/* ---------- WORLD ---------- */
function renderWorld(wid){
 const w=worldById(wid);if(!w){go('home');return}
 const wins=S.boss[wid]||0;
 App.innerHTML='<div class="screen">'
 +'<div class="backrow"><button class="btn btn-g btn-sm" onclick="A.home()">← All worlds</button><span class="muted" style="font-size:12.5px">'+w.ch+'</span></div>'
 +'<div class="whead"><div class="whead-in"><span class="wkick">'+w.ic+' '+w.ch+'</span><h1>'+w.n+'</h1><p>'+w.tag+'</p></div></div>'
 +'<div class="bossband"><div class="bossband-in">'
 +'<span class="boss-mini">'+bossSVG(w.boss.art,64)+'</span>'
 +'<span><h3>👑 '+w.boss.n+' <span style="opacity:.7;font-weight:600;font-size:13px">· '+w.boss.ti+'</span></h3><p>'+w.boss.taunt+'</p>'+(wins?'<p style="color:#6ee7b7;font-weight:700;font-size:12px">🏆 Defeated ×'+wins+'</p>':'')+'</span>'
 +'<button class="btn btn-gold" onclick="A.bossIntro(\''+wid+'\')">⚔️ Challenge boss</button>'
 +'</div></div>'
 +'<div class="sect-h"><h2>📚 Concepts — learn them one by one</h2><span>story → ideas → lab → example → practice</span></div>'
 +'<div class="clist">'
 +w.concepts.map((c,i)=>{
  const st=conceptState(c);
  return '<div class="crow'+(st==='done'?' done':'')+'" style="animation-delay:'+(i*0.05)+'s">'
  +'<span class="cnum">'+(i+1)+'</span>'
  +'<span class="cinfo"><span class="ct">'+c.t+'</span><span class="csub" style="display:block">'+c.sub+'</span>'
  +'<span class="state-pill '+(st==='done'?'st-done':st==='prog'?'st-prog':'st-new')+'">'+(st==='done'?'✓ covered':st==='prog'?'in progress':'not started')+'</span></span>'
  +'<span class="cbtns"><button class="btn btn-p btn-sm" onclick="A.lesson(\''+wid+'\',\''+c.id+'\')">📖 Learn</button>'
  +'<button class="btn btn-s btn-sm" onclick="A.practice(\''+wid+'\',\''+c.id+'\')">🎯 Practice</button></span>'
  +'</div>';
 }).join('')
 +'</div></div>';
}

/* ---------- LESSON ---------- */
const STEP_NAMES=['Story','Key Ideas','Lab','Try It','Practice'];
function renderLesson(wid,cid,step){
 const w=worldById(wid),c=worldById(wid).concepts.find(x=>x.id===cid);
 if(!c){go('home');return}
 if(step===1&&!S.learned[cid]){S.learned[cid]=true;save();addXP(12,'studied '+c.t)}
 const dots='<div class="steps">'+STEP_NAMES.map((n,i)=>'<button class="sdot'+(i===step?' on':i<step?' done':'')+'" onclick="A.setStep(\''+wid+'\',\''+cid+'\','+i+')">'+n+'</button>').join('')+'</div>';
 let body='';
 if(step===0){
  body='<div class="stepcard hcard"><span class="step-kick">📖 THE STORY</span><h3 class="step-t">'+c.t+'</h3>'
  +'<span class="hicon">'+c.hook.ic+'</span>'
  +'<p class="hs">'+c.hook.s+'</p>'
  +'<div class="hw"><b>Why you should care:</b> '+c.hook.w+'</div>'
  +'<div style="margin-top:20px;display:flex;gap:10px"><button class="btn btn-p" onclick="A.setStep(\''+wid+'\',\''+cid+'\',1)">Key ideas →</button></div></div>';
 }else if(step===1){
  body='<div class="stepcard"><span class="step-kick">💡 KEY IDEAS — the facts that matter</span><h3 class="step-t">'+c.t+': what you MUST know</h3>'
  +'<div class="facts">'+c.facts.map((f,i)=>'<div class="fact" style="animation-delay:'+(i*0.12)+'s"><span class="fact-n">'+(i+1)+'</span><span><span class="fact-t">'+f[0]+'</span><div class="fact-d">'+f[1]+'</div></span></div>').join('')+'</div>'
  +'<div style="margin-top:20px;display:flex;gap:10px"><button class="btn btn-p" onclick="A.setStep(\''+wid+'\',\''+cid+'\',2)">Play with the machine →</button></div></div>';
 }else if(step===2){
  body='<div class="labwrap"><div class="lab-head"><b>🧪 '+c.t+' — Interactive Lab</b><span class="hint-lab">drag, slide & tap — it cannot break</span></div>'
  +'<div class="labbox" id="labbox"></div><div class="labctl" id="labctl"></div>'
  +'<div style="padding:0 18px 16px"><div class="taskchips">'+c.tasks.map(t=>'<div class="tchip"><span class="tick">✓</span>'+t+'</div>').join('')+'</div>'
  +'<button class="btn btn-s btn-sm labdone" style="margin-top:12px" onclick="A.exploreDone(\''+cid+'\')">✓ I explored this machine</button></div></div>';
 }else if(step===3){
  EXSTATE[cid]=EXSTATE[cid]||0;
  const rev=EXSTATE[cid];
  body='<div class="stepcard"><span class="step-kick">🎬 WATCH IT SOLVED — step by step</span><h3 class="step-t">'+c.ex.t+'</h3>'
  +'<div class="exsteps">'+c.ex.steps.slice(0,rev).map((s2,i)=>'<div class="exstep"><div class="rail"><span class="nd">'+(i+1)+'</span><span class="ln"></span></div><div><div class="exh">'+s2[0]+'</div><div class="exb">'+s2[1]+'</div></div></div>').join('')+'</div>'
  +(rev<c.ex.steps.length
    ?'<div style="margin-top:16px;display:flex;gap:10px"><button class="btn btn-p" onclick="A.exNext(\''+wid+'\',\''+cid+'\')">Reveal step '+(rev+1)+' →</button></div>'
    :'<div class="why" style="margin-top:14px"><b>Got it?</b> Reading is not doing — prove it in practice. You have got this, Warrior!</div><div style="margin-top:14px;display:flex;gap:10px"><button class="btn btn-gold" onclick="A.setStep(\''+wid+'\',\''+cid+'\',4)">⚔️ Practice now →</button></div>')
  +'</div>';
 }else{
  QSTATE={wid,cid,mode:'lesson',idx:0,score:0,results:[],firstTry:true};
  QSTATE.qs=genQs(c,5);
  body='<div id="quizzone">'+quizCard()+'</div>';
 }
 App.innerHTML='<div class="screen wrap-n" style="padding-left:0;padding-right:0">'
 +'<div class="les-head"><div class="crumbs"><button class="btn btn-g btn-sm" onclick="A.world(\''+wid+'\')">← '+w.n+'</button><span>/</span><b>'+c.t+'</b></div>'
 +'<h1 class="les-t">'+c.t+'</h1><div class="les-sub">'+c.sub+' · hero: Warrior</div></div>'
 +dots+'<div>'+body+'</div></div>';
 if(step===2){
  const box=$('#labbox'),ctli=$('#labctl');
  const api={touch(){},done(){}};
  try{LABS[c.lab[0]](box,ctli,c.lab[1]||{},api)}catch(e){box.innerHTML='<p class="muted">Lab failed to load: '+e.message+'</p>'}
 }
}
function genQs(c,n){const out=[];for(let i=0;i<n;i++){try{out.push(c.gen())}catch(e){out.push({q:'Question error',opts:['1','2','3','4'],a:0,why:'',hint:''})}}return out}

/* ---------- QUIZ ---------- */
function quizCard(){
 const q=QSTATE.qs[QSTATE.idx];
 const w=worldById(QSTATE.wid),c=(QSTATE.cid?w.concepts.find(x=>x.id===QSTATE.cid):null);
 const chip=QSTATE.mode==='boss'?'BOSS FIGHT':(QSTATE.mode==='lesson'?'LESSON PRACTICE':'PRACTICE');
 const meta=QSTATE.mode==='boss'?(w.boss.n+' · '+(QSTATE.idx+1)+'/'+QSTATE.qs.length):(c?c.t:'');
 const L='ABCD';
 return '<div class="quiz"><div class="qcard">'
 +'<div class="qribbon"><span class="qchip">'+chip+'</span><span class="qmeta">'+meta+'</span></div>'
 +'<div class="qbody"><div class="qtext">'+q.q+'</div>'
 +(q.hint?'<div class="qhint" id="qhint">💡 '+q.hint+'</div>':'')
 +'<div class="opts">'+q.opts.map((o,i)=>'<button class="opt" id="opt'+i+'" style="animation-delay:'+(0.08+i*0.07)+'s" onclick="A.answer('+i+')"><span class="opt-l">'+L[i]+'</span><span>'+o+'</span></button>').join('')+'</div>'
 +'<div id="whybox"></div></div>'
 +'<div class="qfoot"><div class="qdots">'+QSTATE.qs.map((_,i)=>'<span class="qdot'+(i<QSTATE.results.length?(QSTATE.results[i]?' ok':' no'):(i===QSTATE.idx?' cur':''))+'"></span>').join('')+'</div>'
 +'<span class="qscore">score '+QSTATE.score+'/'+QSTATE.qs.length+'</span>'
 +(q.hint?'<button class="btn btn-g btn-sm" onclick="A.hint()">💡 Hint</button>':'')
 +'<span id="nextslot"></span></div>'
 +'</div></div>';
}
function rerenderQuiz(){const el=$('#quizzone');if(el){el.innerHTML=quizCard()}else{App.innerHTML='<div class="screen wrap" style="max-width:760px" id="quizzone">'+quizCard()+'</div>'}}

/* ---------- BOSS ARENA ---------- */
function startBoss(wid){
 const w=worldById(wid);
 const old=$('#arena');if(old)old.remove();
 const qs=[];
 while(qs.length<5){const c=pick(w.concepts);try{qs.push(c.gen())}catch(e){}}
 BOS={wid,qs,idx:0,score:0,hp:100};
 const arena=document.createElement('div');arena.id='arena';arena.className='arena';
 document.body.appendChild(arena);
 SFX.boss();
 renderBoss();
}
function renderBoss(){
 const w=worldById(BOS.wid),q=BOS.qs[BOS.idx];
 BOS.answered=false;
 const L='ABCD';
 $('#arena').innerHTML='<div class="arena-in">'
 +'<div class="arena-top"><button class="btn btn-sm" onclick="A.flee()">✕ Flee</button><span style="font-size:12px;font-weight:800;letter-spacing:.12em;color:#b8b2d9">'+w.n.toUpperCase()+' · BOSS BATTLE</span><span style="margin-left:auto;font-size:12px;font-weight:800;color:#b8b2d9">Q'+(BOS.idx+1)+'/5</span></div>'
 +'<div class="bstage" id="bstage">'+bossSVG(w.boss.art,170)+'</div>'
 +'<div class="bname"><h2>'+w.boss.n+'</h2><p>'+w.boss.ti+'</p></div>'
 +'<div class="hpwrap"><div class="hplab"><span>BOSS HP</span><span id="hpnum">'+BOS.hp+'/100</span></div><div class="hpbar"><div class="hpfill" id="hpfill" style="width:'+BOS.hp+'%"></div></div></div>'
 +'<div class="qcard"><div class="qribbon"><span class="qchip">QUESTION '+(BOS.idx+1)+'</span><span class="qmeta">answer to strike!</span></div>'
 +'<div class="qbody"><div class="qtext">'+q.q+'</div>'
 +(q.hint?'<div class="qhint" id="qhint">💡 '+q.hint+'</div>':'')
 +'<div class="opts">'+q.opts.map((o,i)=>'<button class="opt" id="opt'+i+'" style="animation-delay:'+(0.08+i*0.07)+'s" onclick="A.banswer('+i+')"><span class="opt-l">'+L[i]+'</span><span>'+o+'</span></button>').join('')+'</div>'
 +'<div id="bwhy"></div></div></div>'
 +'</div>';
}
function bossStrike(){
 const st=$('#bstage');
 const slash=document.createElementNS(SVGNS,'svg');
 slash.setAttribute('viewBox','0 0 100 100');slash.setAttribute('class','fx-slash');
 slash.style.left='calc(50% - 65px)';slash.style.top='30px';
 slash.innerHTML='<path d="M 10 90 Q 50 40 90 10" stroke="#fde68a" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M 20 95 Q 58 50 95 22" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round"/>';
 st.appendChild(slash);
 const dmg=document.createElement('div');dmg.className='fx-dmg';dmg.textContent='-'+20;dmg.style.left='calc(50% + 40px)';dmg.style.top='60px';
 st.appendChild(dmg);
 const art=st.querySelector('svg');if(art){art.classList.add('boss-hurt');setTimeout(()=>art.classList.remove('boss-hurt'),500)}
 setTimeout(()=>{slash.remove();dmg.remove()},1100);
}
function bossEnd(){
 const w=worldById(BOS.wid);
 const win=BOS.score>=4;
 if(win){
  S.boss[BOS.wid]=(S.boss[BOS.wid]||0)+1;save();
  const perfect=BOS.score===5;
  addXP(80,'boss defeated');
  if(perfect){addXP(40,'FLAWLESS!')}
  const art=$('#arena .bstage svg');if(art)art.classList.add('boss-dead');
  SFX.win();burst(120);
  setTimeout(()=>{
   $('#arena').innerHTML='<div class="arena-in" style="justify-content:center;min-height:100vh"><div class="ovl-in"><div class="viccard">'
   +'<div style="font-size:46px">👑</div><h2 style="font-size:26px;font-weight:900;color:#78350f">'+w.boss.n+' DEFEATED!</h2>'
   +'<div class="stars">'+[1,2,3].map(i=>'<span class="'+(BOS.score>=i+2?'':'off')+'">⭐</span>').join('')+'</div>'
   +'<p style="color:#92400e;font-weight:600;margin:6px 0 4px">Score '+BOS.score+'/5 · +'+(80+(perfect?40:0))+' XP</p>'
   +'<p style="color:#78350f;font-size:13.5px;margin-bottom:18px">The '+w.n+' throne is yours, Warrior. '+(perfect?'FLAWLESS VICTORY — the boss never touched you!':'Your streak of concepts grows stronger.')+'</p>'
   +'<div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap"><button class="btn btn-p" onclick="A.exitBoss()">Return to '+w.n+'</button><button class="btn btn-g" onclick="A.bossAgain()">Fight again</button></div>'
   +'</div></div></div>';
  },900);
 }else{
  SFX.no();
  $('#arena').innerHTML='<div class="arena-in" style="justify-content:center;min-height:100vh"><div class="ovl-in"><div class="viccard" style="background:linear-gradient(165deg,#fff,#fee2e2)">'
  +'<div style="font-size:46px">🛡️</div><h2 style="font-size:24px;font-weight:900;color:#991b1b">'+w.boss.n+' stands… this time</h2>'
  +'<p style="color:#991b1b;font-weight:600;margin:8px 0">Score '+BOS.score+'/5 — you needed 4. Nothing is lost: concepts stay covered, XP stays yours.</p>'
  +'<p style="color:#7f1d1d;font-size:13.5px;margin-bottom:18px">Re-read the Key Ideas or the labs for the concepts that hurt, then return. Bosses always fall to prepared Warriors.</p>'
  +'<div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap"><button class="btn btn-red" onclick="A.bossAgain()">⚔️ Rematch</button><button class="btn btn-g" onclick="A.exitBoss()">Study first</button></div>'
  +'</div></div></div>';
 }
}

/* ---------- covered overlay ---------- */
function coveredOverlay(c,extra){
 const facts=c.facts.map(f=>'<div>'+f[0]+'</div>').join('');
 showOvl('<div class="covcard">'
 +'<div class="covbadge"><div>🏆</div></div>'
 +'<div class="cov-kick">CONCEPT COVERED</div>'
 +'<div class="cov-t">'+c.t+'</div>'
 +'<div class="cov-l">'+(extra||'')+'</div>'
 +'<div class="covlist">'+facts+'</div>'
 +'<div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap"><button class="btn btn-p" onclick="A.closeCov()">Continue</button></div>'
 +'</div>',true);
 burst(90);SFX.win();
}

/* ---------- A: actions ---------- */
window.A={
 home(){QSTATE=null;go('home')},
 world(id){QSTATE=null;go('world',{wid:id})},
 lesson(wid,cid){go('lesson',{wid,cid,step:0})},
 setStep(wid,cid,step){go('lesson',{wid,cid,step})},
 practice(wid,cid){go('quiz',{wid,cid,mode:'practice'})},
 sound(){S.sound=!S.sound;save();renderTopbar();if(S.sound)SFX.click()},
 ovlClose(){closeOvl()},
 closeCov(){closeOvl()},
 startRandom(){const w=pick(WORLDS);go('world',{wid:w.id})},
 exploreDone(cid){
  if(!S.labdone[cid]){S.labdone[cid]=true;save();addXP(8,'lab explored')}
  else toast('Lab already explored ✓');
 },
 hint(){const h=$('#qhint');if(h)h.classList.add('show')},
 exNext(wid,cid){
  const c=worldById(wid).concepts.find(x=>x.id===cid);
  EXSTATE[cid]=(EXSTATE[cid]||0)+1;
  if(EXSTATE[cid]>=c.ex.steps.length&&!S.exdone[cid]){S.exdone[cid]=true;save();addXP(6,'example solved')}
  SFX.step();
  renderLesson(wid,cid,3);
 },
 /* quiz answer (page mode) */
 answer(i){
  if(!QSTATE||QSTATE.answered)return;
  const q=QSTATE.qs[QSTATE.idx];
  const btns=[0,1,2,3].map(k=>$('#opt'+k));
  btns.forEach(b=>b&&b.setAttribute('disabled','1'));
  const ok=i===q.a;
  if(ok){
   btns[i].classList.add('correct');
   const r=btns[i].getBoundingClientRect();burst(24,r.left+r.width/2,r.top);
   SFX.ok();
   if(QSTATE.firstTry){QSTATE.score++;addXP(6,'correct')}
  }else{
   btns[i].classList.add('wrong');btns[q.a].classList.add('correct');
   btns.forEach((b,k)=>{if(k!==i&&k!==q.a)b.classList.add('dim')});
   SFX.no();
  }
  QSTATE.results[QSTATE.idx]=ok;QSTATE.answered=true;
  $('#whybox').innerHTML='<div class="why"><b>'+(ok?'✅ Correct!':'❌ Not this one.')+'</b>'+q.why+'</div>';
  $('#nextslot').innerHTML='<button class="btn btn-p btn-sm" onclick="A.qNext()">'+(QSTATE.idx<QSTATE.qs.length-1?'Next →':'Finish')+'</button>';
  const dots=document.querySelectorAll('.qdot');dots.forEach((d,k)=>{d.className='qdot'+(QSTATE.results[k]===undefined?(k===QSTATE.idx?' cur':''):(QSTATE.results[k]?' ok':' no'))});
 },
 qNext(){
  if(!QSTATE)return;
  if(QSTATE.idx<QSTATE.qs.length-1){QSTATE.idx++;QSTATE.firstTry=true;QSTATE.answered=false;rerenderQuiz()}
  else endPractice();
 },
 /* boss answer */
 banswer(i){
  if(!BOS||BOS.answered)return;BOS.answered=true;
  const q=BOS.qs[BOS.idx];
  const btns=[0,1,2,3].map(k=>$('#opt'+k));
  btns.forEach(b=>b&&b.setAttribute('disabled','1'));
  const ok=i===q.a;
  if(ok){
   btns[i].classList.add('correct');BOS.score++;BOS.hp=Math.max(0,BOS.hp-20);
   const hf=$('#hpfill');if(hf)hf.style.width=BOS.hp+'%';
   const hn=$('#hpnum');if(hn)hn.textContent=BOS.hp+'/100';
   bossStrike();SFX.hit();addXP(4,'boss strike');
  }else{
   btns[i].classList.add('wrong');btns[q.a].classList.add('correct');
   btns.forEach((b,k)=>{if(k!==i&&k!==q.a)b.classList.add('dim')});
   SFX.no();
   const ar=$('#arena');if(ar){ar.classList.add('shake');setTimeout(()=>ar.classList.remove('shake'),450)}
  }
  $('#bwhy').innerHTML='<div class="why"><b>'+(ok?'⚔️ STRIKE! The boss reels!':'💥 The boss counters!')+'</b>'+q.why+'</div>';
  setTimeout(()=>{
   if(BOS.idx<BOS.qs.length-1){BOS.idx++;renderBoss()}
   else bossEnd();
  },ok?900:1400);
 },
 bossIntro(wid){
  const w=worldById(wid);
  showOvl('<div class="introcard"><div style="width:130px;margin:0 auto 6px">'+bossSVG(w.boss.art,130)+'</div>'
  +'<h2>'+w.boss.n+'</h2><p style="letter-spacing:.14em;font-size:11px;color:#b8b2d9;font-weight:800">'+w.boss.ti.toUpperCase()+'</p>'
  +'<p style="margin-top:12px">“'+w.boss.taunt+'”</p>'
  +'<div class="steps3"><div><b>5</b><span>questions drawn from every concept of '+w.n+'</span></div><div><b>4+</b><span>correct answers to claim the throne (+80 XP)</span></div><div><b>5/5</b><span>= FLAWLESS bonus (+40 XP)</span></div></div>'
  +'<div style="display:flex;gap:10px;justify-content:center"><button class="btn btn-gold btn-xl" onclick="A.bossStart(\''+wid+'\')">⚔️ START BATTLE</button><button class="btn btn-sm" style="background:rgba(255,255,255,.1);color:#fff" onclick="A.ovlClose()">Not yet</button></div>'
  +'</div>',true);
 },
 bossStart(wid){closeOvl();startBoss(wid)},
 bossAgain(){const wid=BOS?BOS.wid:ROUTE.wid;const a=$('#arena');if(a)a.remove();BOS=null;startBoss(wid)},
 exitBoss(){const a=$('#arena');if(a)a.remove();BOS=null;if(ROUTE.view==='world')render();else go('home')},
 flee(){BOS=null;const a=$('#arena');if(a)a.remove();if(ROUTE.view==='world')render();else go('home')},
 reset(){
  showOvl('<div class="introcard"><div class="big">⚠️</div><h2>Reset all progress?</h2><p>XP, covered concepts and boss wins will be wiped. This cannot be undone.</p><div style="display:flex;gap:10px;justify-content:center;margin-top:18px"><button class="btn btn-red" onclick="A.resetYes()">Yes, reset</button><button class="btn btn-sm" style="background:rgba(255,255,255,.1);color:#fff" onclick="A.ovlClose()">Keep my progress</button></div></div>',true);
 },
 resetYes(){S={xp:0,learned:{},labdone:{},exdone:{},covered:{},boss:{},sound:S.sound,seen:true};save();closeOvl();render();toast('Progress reset — a fresh Warrior rises!')},
 introDone(){S.seen=true;save();closeOvl();SFX.win()}
};

/* ---------- practice end ---------- */
function endPractice(){
 const w=worldById(QSTATE.wid),c=w.concepts.find(x=>x.id===QSTATE.cid);
 const pass=QSTATE.score>=4;
 if(QSTATE.mode==='lesson'){
  if(pass){
   const first=!S.covered[c.id];
   S.covered[c.id]=true;save();
   if(first)addXP(30,'concept covered');
   coveredOverlay(c,first?'+'+ (30) +' XP bonus · concept permanently covered!':'Already covered before — practice XP banked!');
  }else{
   showOvl('<div class="introcard"><div class="big">💪</div><h2>So close, Warrior!</h2><p>You scored '+QSTATE.score+'/5. You need 4 to cover this concept. Revisit the lab, then come back — nothing is locked, ever.</p><div style="display:flex;gap:10px;justify-content:center;margin-top:16px"><button class="btn btn-gold" onclick="A.setStep(\''+QSTATE.wid+'\',\''+QSTATE.cid+'\',4)">🔁 Try fresh questions</button><button class="btn btn-sm" style="background:rgba(255,255,255,.1);color:#fff" onclick="A.setStep(\''+QSTATE.wid+'\',\''+QSTATE.cid+'\',2)">Back to lab</button></div></div>',true);
  }
 }else{
  if(pass){
   const first=!S.covered[c.id];
   S.covered[c.id]=true;save();
   if(first)addXP(30,'concept covered');
   coveredOverlay(c,first?'+30 XP bonus · '+c.sub:'Practice score '+QSTATE.score+'/5 — banked!');
  }else{
   showOvl('<div class="introcard"><div class="big">🎯</div><h2>Score '+QSTATE.score+'/5</h2><p>You need 4+ to cover <b>'+c.t+'</b>. The explanations you just read ARE the lesson — one more round and it is yours.</p><div style="display:flex;gap:10px;justify-content:center;margin-top:16px"><button class="btn btn-gold" onclick="A.practice(\''+QSTATE.wid+'\',\''+QSTATE.cid+'\');A.ovlClose()">🔁 Fresh questions</button><button class="btn btn-sm" style="background:rgba(255,255,255,.1);color:#fff" onclick="A.world(\''+QSTATE.wid+'\');A.ovlClose()">Back to world</button></div></div>',true);
  }
 }
}

/* ---------- quiz page shell ---------- */
function renderQuiz(){
 const w=worldById(ROUTE.wid),c=w?w.concepts.find(x=>x.id===ROUTE.cid):null;
 if(!c){go('home');return}
 QSTATE={wid:ROUTE.wid,cid:ROUTE.cid,mode:'practice',idx:0,score:0,results:[],firstTry:true};
 QSTATE.qs=genQs(c,5);
 App.innerHTML='<div class="screen wrap" style="max-width:760px">'
 +'<div class="les-head"><div class="crumbs"><button class="btn btn-g btn-sm" onclick="A.world(\''+ROUTE.wid+'\')">← '+w.n+'</button><span>/</span><b>'+c.t+'</b></div>'
 +'<h1 class="les-t">🎯 Practice: '+c.t+'</h1><div class="les-sub">5 fresh exam-style questions · 4 correct = concept covered · wrong answers teach, not punish</div></div>'
 +'<div id="quizzone">'+quizCard()+'</div></div>';
}

/* ---------- boot ---------- */
function boot(){
 render();
 if(!S.seen){
  showOvl('<div class="introcard"><div class="big">⚔️</div><h2>Welcome to MATHS WAR</h2>'
  +'<p>I am your <b>Warrior</b>-coach. This arena covers the ENTIRE Grade 9 NCERT syllabus — 12 worlds, 38 concepts — and every single one is unlocked from the first second.</p>'
  +'<div class="steps3"><div><b>1</b><span>📖 LEARN — story → key facts → play with living diagrams → watch a worked example</span></div><div><b>2</b><span>🎯 PRACTICE — fresh exam-style questions every time; explanations teach, nothing punishes</span></div><div><b>3</b><span>👑 BOSSES — beat each world\'s monster to claim the throne. 4/5 wins the fight</span></div></div>'
  +'<button class="btn btn-gold btn-xl" onclick="A.introDone()">⚔️ Enter the arena</button>'
  +'</div>',true);
 }
}
boot();
</script>
</body>
</html>
