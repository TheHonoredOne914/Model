/* ================= FEATURES: stage · quiz · plan · games · flash · videos ================= */

/* ---------- Stage sheet ---------- */
function openStage(title, agentKey, build){
  $("#stageTitle").textContent=title;
  const ag=AGENTS[agentKey];
  $("#stageAgent").innerHTML= ag? `<span class="agent-chip"><span class="adot"></span>${ag.name} — ${ag.role}</span> <span class="muted" style="font-size:12px">${ag.line}</span>`:"";
  const body=$("#stageBody"); body.innerHTML="";
  build(body);
  $("#stageWrap").classList.remove("hidden");
  if(navigator.vibrate) navigator.vibrate(8);
}
function closeStage(){ $("#stageWrap").classList.add("hidden"); }

/* ---------- Question engine ---------- */
const TOPIC_HINTS={
 numsys:["number"],poly:["polynomial","algebraic"],coord:["coordinat","orienting"],seq:["sequence","progression"],ident:["identit"],lin2v:["linear"],angles:["angle","line"],tri:["triangle","congruenc"],circ:["circle"],heron:["heron","perimeter","area"],stats:["statistic"],prob:["probab"],
 motion:["motion"],force:["force","newton"],grav:["gravit","float"],work:["work","energy"],sound:["sound"],matter:["matter"],atoms:["atom","molecul"],cell:["cell"],tissue:["tissue"],food:["food"],
 frenrev:["french"],russrev:["russia","socialis"],nazism:["nazi","hitler"],democ:["democracy"],const:["constitution","constituent"],elect:["electoral","election"],insti:["institution","parliament"],rights:["rights"],palampur:["palampur","production"],resource:["people as resource","human capital"],poverty:["poverty"],foodsec:["food security"],drain:["drainage","river"],climate:["climate","monsoon"],physfeat:["physical features","himalaya"],indiasize:["size and location"]
};
function questionsForChapter(chKey, n=6){
  const ch=chapterOf(chKey); if(!ch) return [];
  const bk=BOOKS[ch.book];
  const tks=Object.entries(TOPIC_HINTS).filter(([,kw])=>kw.some(k=>ch.title.toLowerCase().includes(k)||((ch.intro||"").toLowerCase().includes(k)))).map(([t])=>t);
  let pool=MCQ_BANK.filter(m=>tks.includes(m[0]));
  if(pool.length<3){ // pull related by book subject
    pool=pool.concat(MCQ_BANK.filter(m=>((bk.subject==="Maths"&&["numsys","poly","seq","ident","lin2v","coord","angles","tri","circ","heron","stats","prob"].includes(m[0]))||(bk.subject==="Science"&&["motion","force","grav","work","sound","matter","atoms","cell","tissue","food"].includes(m[0]))||(bk.subject==="SST"&&["frenrev","russrev","nazism","democ","const","elect","insti","rights","palampur","resource","poverty","foodsec","drain","climate","physfeat","indiasize"].includes(m[0])))));
  }
  const gen=genCloze(ch, Math.max(0,n-pool.length));
  const qs=[...shuffle(pool).slice(0,Math.max(0,n-gen.length)).map(m=>({L:m[1],q:m[2],opts:m[3],a:+m[4],why:m[5]})),...gen];
  return shuffle(qs).slice(0,n);
}
function genCloze(ch,n){
  const out=[], STOP=new Set("the a an of in on to and or is are was were for with that this it its as by be has have into from at their they he she his her them then than which whose when where who whom".split(" "));
  const secs=(ch.sections||[]).filter(s=>s.content);
  for(let i=0;i<n && i<secs.length;i++){
    const s=secs[i%secs.length];
    const sent=s.content.split(/(?<=[.?!])\s+/).map(x=>x.replace(/\s+/g," ").trim()).filter(x=>x.length>60&&x.length<220)[0];
    if(!sent) continue;
    const words=sent.split(" ");
    const idx=words.findIndex((w,j)=>j>2&&w.length>4&&!STOP.has(w.toLowerCase().replace(/\W/g,"")));
    if(idx<0) continue;
    const ans=words[idx].replace(/\W/g,"");
    if(!ans) continue;
    words[idx]="_____";
    const distract=[]; 
    for(const s2 of secs){ for(const w of (s2.content||"").split(/\W+/)){ if(w.length>4&&w.toLowerCase()!==ans.toLowerCase()&&!STOP.has(w.toLowerCase())&&!distract.includes(w)) distract.push(w); if(distract.length>12) break; } }
    const opts=shuffle([ans,...distract.slice(0,3)]);
    out.push({L:2,q:`Fill the blank — ${s.title}: ${words.join(" ")}`,opts,a:opts.indexOf(ans),why:`The passage states it directly — check section ${s.id} of ${ch.title}.`});
  }
  return out;
}
function shuffle(a){ a=[...a]; for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];} return a; }
function bankQs(n){ return shuffle(MCQ_BANK).slice(0,n).map(m=>({L:m[1],q:m[2],opts:m[3],a:+m[4],why:m[5]})); }

/* ---------- Quiz runner (ladder + confidence + Error DNA + bridge) ---------- */
let QZ=null;
function openQuiz(chKey, label, opts={}){
  const qs=opts.qs||questionsForChapter(chKey, opts.diagnostic?3:6);
  if(!qs.length){ toast("No questions ready for that topic yet"); return; }
  QZ={qs,i:0,ladder:2,streakC:0,ok:0,conf:null,t0:0,chKey,label,diagnostic:!!opts.diagnostic,answers:[],bridge:null};
  openStage(label||(opts.diagnostic?"Level check":"Quiz"), opts.diagnostic?"diag":"quiz", b=>renderQ(b));
}
function renderQ(b){
  const z=QZ, q=z.qs[z.i];
  delete b.dataset.done;
  z.t0=Date.now(); z.conf=null;
  b.innerHTML=`
    <div class="q-meta"><span>${z.diagnostic?"Not a test — routing only":z.label} · Q${z.i+1}/${z.qs.length}</span>
    <span class="ladder">${[1,2,3].map(l=>`<i class="${z.ladder>=l?"l"+z.ladder:""}"></i>`).join("")} L${z.ladder}</span></div>
    <div style="font-size:16.5px;font-weight:700;margin-bottom:14px">${q.q}</div>
    <div id="qOpts">${q.opts.map((o,i)=>`<button class="opt" data-i="${i}"><span class="k">${"ABCD"[i]}</span><span>${o}</span></button>`).join("")}</div>
    <div class="conf-row">
      <button class="conf" data-c="Sure">Sure</button><button class="conf" data-c="Unsure">Unsure</button><button class="conf" data-c="Guess">Guess</button>
    </div>
    <p class="muted" style="margin:4px 0 0">Tap your gut BEFORE the reveal — it's the most honest signal in the app.</p>
    <div id="qFeedback"></div>`;
  b.querySelectorAll(".conf").forEach(c=>c.onclick=()=>{ b.querySelectorAll(".conf").forEach(x=>x.className="conf"); c.classList.add("on-"+c.dataset.c.toLowerCase()); z.conf=c.dataset.c; });
  b.querySelectorAll(".opt").forEach(o=>o.onclick=()=>answer(+o.dataset.i,b));
}
function answer(pick,b){
  const z=QZ,q=z.qs[z.i]; if(b.dataset.done) return; b.dataset.done=1;
  const secs=Math.round((Date.now()-z.t0)/1000);
  const right=pick===q.a;
  b.querySelectorAll(".opt").forEach((o,i)=>{ if(i===q.a)o.classList.add("right"); else if(i===pick)o.classList.add("wrong"); });
  // ladder law: 3 right → up, 2 wrong → down with bridge
  if(right){z.streakC++; z.ok++; if(z.streakC>=3&&z.ladder<3){z.ladder++;z.streakC=0;}}
  else { z.streakC=0; if(z.ladder===3)z.ladder=2; else if(z.ladder===2&&z.answers.filter(a=>!a.ok).slice(-1).length&&z.ladder>1){z.ladder=1;} }
  const key=z.chKey||("topic:"+z.label);
  if(!z.diagnostic) recordAnswer(key,right,z.conf||"Unsure",secs,q.L);
  else { S.trail.push({t:Date.now(),ev:"diagnostic",key,ok:right?1:0}); save(); }
  z.answers.push({ok:right,conf:z.conf,secs});
  const fb=$("#qFeedback");
  const wrongType = !right ? classifyDNA(z.conf||"Unsure",secs,q.L,key) : null;
  fb.innerHTML=`
    ${right?`<div class="card" style="background:#F0F9F3;border-color:#9CD2B2"><b>${z.conf==="Guess"?"Lucky tap — counted honestly, but lightly":"Correct!"}</b><p class="muted" style="margin:6px 0 0">${q.why}</p></div>`
    :`<div class="card" style="background:#FDF1EF;border-color:#F3B8AD"><b>Why it went wrong — ${wrongType.name}</b><p class="muted" style="margin:6px 0 0">${q.why}</p><p style="margin:8px 0 0;font-size:13.5px"><b>Repair:</b> ${wrongType.repair}</p></div>`}
    <div class="row" style="margin-top:10px"><button class="btn primary" id="qNext">${z.i+1<z.qs.length?"Next question":"Finish"}</button></div>`;
  $("#qNext").onclick=()=>{ z.i++; if(z.i<z.qs.length) renderQ(b); else finishQuiz(b); };
}
function classifyDNA(conf,secs,L,key){
  const m=S.mastery[key];
  if(conf==="Guess") return {name:"Guess",repair:"Honest acknowledgement — this question returns tomorrow in a different skin, so the guess becomes knowledge."};
  if(secs<=6&&(!m||m.score>=60)) return {name:"Careless slip",repair:"One-line nudge, no re-teach: slow down on signs and units — you know this."};
  if(L>=3&&m&&m.score>=50) return {name:"Method error",repair:"A worked example of the exact same pattern is queued, step highlighted where it broke."};
  return {name:"Concept gap",repair:"Bridge back: the prerequisite is re-taught in the simplest variant first, then we re-test."};
}
function finishQuiz(b){
  const z=QZ,pct=Math.round(100*z.ok/z.qs.length);
  let extra="";
  if(z.diagnostic){
    const band=pct>=75?4:pct>=50?3:pct>=25?2:1;
    extra=`<div class="card" style="background:var(--powder)"><b>Routing: ${FRIENDLY[band-1]}</b><p class="muted" style="margin:6px 0 0">${band<=1?"Basics rebuild first — Guru brings the simplest examples.":band===2?"Standard slides + worked examples, flashcards pushed.":band===3?"Application focus — twists and numericals.":"Challenge sets + Boss Level — you're in top form."}</p></div>`;
  } else {
    extra=`<p class="muted">${z.ok}/${z.qs.length} correct · ladder now L${z.ladder} · evidence logged for ${S.profile.name||"you"}, parents & teacher reports.</p>`;
  }
  b.innerHTML=`<div style="text-align:center;padding:10px"><div class="big-num">${pct}%</div><p class="muted">final score</p>${extra}
  <div class="row" style="justify-content:center;margin-top:12px"><button class="btn primary" id="qClose">Done</button></div></div>`;
  $("#qClose").onclick=closeStage; checkBadges(); renderHome();
}

/* ---------- Plan maker (the flow: slide → quiz → game → flashcards) ---------- */
let PLAN=null;
function renderPlan(){
  const sel=$("#planSubj"), selC=$("#planChap");
  sel.innerHTML=Object.entries(BOOKS).map(([k,b])=>`<option value="${k}">${b.name}</option>`).join("");
  const fill=()=>{ const bk=sel.value; selC.innerHTML=BOOKS[bk].chapters.map(c=>`<option value="${c.number}">Ch ${c.number} — ${c.title}</option>`).join(""); };
  sel.onchange=fill; fill();
  $("#planGo").onclick=()=>{
    PLAN={book:sel.value,ch:+selC.value,step:0,done:[]};
    renderPlanRun();
  };
  renderPlanRun();
}
function renderPlanRun(){
  const host=$("#planRun"); if(!PLAN){ host.innerHTML=""; return; }
  const ch=BOOKS[PLAN.book].chapters.find(c=>c.number===PLAN.ch);
  const flow=PLAN_FLOW.map((f,i)=>`<div class="fstep ${i<PLAN.step?"done":i===PLAN.step?"now":""}"><div class="fs-dot">${f.icon}</div><div class="fs-t">${f.title}</div></div>`).join("");
  const cur=PLAN_FLOW[PLAN.step];
  host.innerHTML=`
    <div class="card"><h3>${ch.title} <span class="chip">${BOOKS[PLAN.book].subject}</span></h3>
      <div class="flow">${flow}</div>
      <div class="row"><span class="agent-chip"><span class="adot"></span>${AGENTS[cur.agent].name} — ${AGENTS[cur.agent].role}</span>
      <button class="btn primary sm" id="planStep">${PLAN.step===0?"Start level check":cur.title}</button></div>
      <p class="muted" style="margin:10px 0 0">${AGENTS[cur.agent].line}</p></div>
    <div id="planOut"></div>`;
  $("#planStep").onclick=()=>runStep(cur, ch);
  if(PLAN.step>=PLAN_FLOW.length){ PLAN=null; return; }
}
function runStep(cur, ch){
  const key=`${PLAN.book}:${PLAN.ch}`;
  if(cur.id==="diag") openQuiz(key,"Level check",{diagnostic:true});
  if(cur.id==="slides") openSlides(key, ch);
  if(cur.id==="quiz") openQuiz(key,"Chapter quiz");
  if(cur.id==="game") openGamePicker(key);
  if(cur.id==="flash") openFlash(key, ch);
  if(cur.id==="report"){ PLAN.step++; renderPlanRun(); toast("Plan complete — report updated ✓"); go("reports"); }
}
function advancePlan(){ if(PLAN){ PLAN.step++; renderPlanRun(); } }
const _origClose=closeStage;
closeStage=function(){ _origClose(); };

/* ---------- Concept slides (Learn station) ---------- */
function openSlides(key,ch){
  openStage("Concept slides — "+ch.title,"tutor",b=>{
    const band=userBand();
    const secs=(ch.sections||[]).slice(0,4);
    b.innerHTML=`<div class="q-meta"><span>${BOOKS[ch.book].name}</span><span class="chip">${FRIENDLY[band-1]}</span></div>`+
    secs.map((s,i)=>`<div class="card" style="background:var(--cream)"><b>Slide ${i+1} · ${s.title}</b><p style="font-size:14.5px;white-space:pre-wrap;margin:8px 0">${band<=2?firstLines(s.content,3):firstLines(s.content,2)}</p>${band<=2?`<p class="muted">Think of it like this: everyday examples first, jargon later.</p>`:`<p class="muted">Where students slip: watch the definitions and units — examiners trap exactly here.</p>`}</div>`).join("")+
    `<div class="row"><button class="btn primary" id="slQuiz">Checkpoint quiz</button><button class="btn ghost" id="slVideo">Watch a video for this</button></div>`;
    $("#slQuiz").onclick=()=>openQuiz(key,"Checkpoint quiz");
    $("#slVideo").onclick=()=>{ closeStage(); go("videos"); const f=$("#vkFilter"); const q=ch.title.split(/[:(]/)[0].trim(); vkSearch(q); };
  });
  advancePlanSoon();
}
function firstLines(t,n){ return (t||"").split("\n").filter(x=>x.trim()).slice(0,n).join("\n"); }
function advancePlanSoon(){ setTimeout(advancePlan, 400); }

/* ---------- Flashcards ---------- */
function openFlash(key,ch){
  const secs=(ch.sections||[]).filter(s=>s.title&&s.content).slice(0,8);
  if(!secs.length){ toast("No deck for this chapter yet"); return; }
  openStage("Flashcards — "+ch.title,"flash",b=>{
    let i=0,fl=false; const rates=[];
    const draw=()=>{
      const s=secs[i%secs.length]; fl=false;
      b.innerHTML=`<p class="muted">${i+1} / ${secs.length} · tap the card to flip</p>
      <div class="fc-stage"><div class="fc" id="fc"><div class="face front"><small>${ch.title}</small>${s.title}</div><div class="face back">${firstLines(s.content,2)}</div></div></div>
      <div class="row" style="justify-content:center;margin-top:14px">
        <button class="btn ghost sm" id="r0">Forgot</button><button class="btn peach sm" id="r1">Almost</button><button class="btn primary sm" id="r2">Knew it</button>
      </div>`;
      $("#fc").onclick=()=>{ fl=!fl; $("#fc").classList.toggle("flip"); };
      [["r0","forgot"],["r1","almost"],["r2","knew"]].forEach(([id,rate])=>{ $("#"+id).onclick=()=>{ rates.push(rate); S.trail.push({t:Date.now(),ev:"flash",key,rate}); S.xp+=2; save(); i++; draw(); }; });
    };
    draw();
    const done=document.createElement("div"); done.className="row"; done.style.marginTop="12px";
    done.innerHTML=`<button class="btn primary" id="fDone">Finish sprint</button>`;
    b.appendChild(done);
    done.querySelector("#fDone").onclick=()=>{ closeStage(); toast("Revision sprint logged — mastery signal saved"); advancePlan(); };
  });
}

/* ---------- Games arcade ---------- */
const GAMES=[
 {id:"mcq",name:"MCQ Rush",desc:"60-second streaks of quick MCQs — same bank, faster world.",agent:"game"},
 {id:"match",name:"Match the Concept",desc:"Term ↔ definition pairs against the clock.",agent:"game"},
 {id:"rapid",name:"Rapid Revision",desc:"The flashcard deck as a self-rated sprint.",agent:"flash"},
 {id:"streak",name:"Streak Challenge",desc:"Bank your XP… or risk it on one more question.",agent:"game"},
 {id:"boss",name:"Boss Level",desc:"Chapter boss — unlock at 70% mastery. Defeat it to preview the next chapter.",agent:"boss"}
];
function renderGames(){
  $("#gameTiles").innerHTML=GAMES.map(g=>`
    <div class="game-tile ${g.id==="boss"?"locked":""}" id="gt-${g.id}">
      <div class="g-ico">${g.name[0]}</div><h4>${g.name}</h4><p>${g.desc}</p>
      <button class="btn peach sm" data-g="${g.id}">Play</button></div>`).join("");
  $("#gameTiles").querySelectorAll("[data-g]").forEach(x=>x.onclick=()=>openGamePicker(null,x.dataset.g));
  $("#gameXp").textContent="XP "+S.xp;
}
function openGamePicker(chKey, force){
  const key=chKey||currentPlanKey()||null;
  if(force==="mcq") return gameMCQ();
  if(force==="match") return gameMatch();
  if(force==="rapid") return gameRapid();
  if(force==="streak") return gameStreak();
  if(force==="boss") return gameBoss();
  openStage("Game break","game",b=>{
    b.innerHTML=`<div class="grid2">`+GAMES.map(g=>`<div class="game-tile"><div class="g-ico">${g.name[0]}</div><h4>${g.name}</h4><p>${g.desc}</p><button class="btn peach sm" data-g="${g.id}">Play</button></div>`).join("")+`</div>`;
    b.querySelectorAll("[data-g]").forEach(x=>x.onclick=()=>openGamePicker(key,x.dataset.g));
  });
}
function currentPlanKey(){ return PLAN?`${PLAN.book}:${PLAN.ch}`:(weakConcepts(1)[0]?.k||null); }
function gameMCQ(){
  const key=currentPlanKey(); const qs=key?questionsForChapter(key,20):bankQs(20);
  let i=0,score=0,t=60,timer=null;
  openStage("MCQ Rush — 60 seconds","game",b=>{
    const draw=()=>{
      if(i>=qs.length||t<=0){ clearInterval(timer); if(score>S.games.mcqBest){S.games.mcqBest=score;checkBadges();} save();
        b.innerHTML=`<div style="text-align:center;padding:16px"><div class="big-num">${score}</div><p class="muted">best: ${S.games.mcqBest} · +${score} XP · evidence logged</p><button class="btn primary" onclick="Saathy.renderGames();Saathy.closeStage()">Done</button></div>`; S.xp+=score; save(); renderHome(); return; }
      const q=qs[i%qs.length];
      b.innerHTML=`<div class="timerbar"><i style="width:${t/60*100}%"></i></div><p class="muted" style="margin:0 0 8px">Score ${score} · ${t}s</p>
      <div style="font-weight:700;margin-bottom:12px">${q.q}</div>
      <div>${q.opts.map((o,j)=>`<button class="opt" data-i="${j}"><span class="k">${"ABCD"[j]}</span><span>${o}</span></button>`).join("")}</div>`;
      b.querySelectorAll(".opt").forEach(o=>o.onclick=()=>{ const ok=+o.dataset.i===q.a; if(ok){score++; if(navigator.vibrate)navigator.vibrate(6);} i++; draw(); });
    };
    draw(); timer=setInterval(()=>{ t--; draw(); },1000);
  });
}
function gameMatch(){
  const key=currentPlanKey(); const ch=key?chapterOf(key):allChapters()[0];
  const secs=shuffle((ch.sections||[]).filter(s=>s.content&&s.title)).slice(0,4);
  if(secs.length<2){ toast("Need a chapter with sections — pick one in Plan"); return; }
  const left=shuffle(secs.map(s=>({t:s.title,id:s.id}))), right=shuffle(secs.map(s=>({t:firstLines(s.content,1).slice(0,64)+"…",id:s.id})));
  let selL=null,selR=null,done=0,flips=0;
  openStage("Match the Concept","game",b=>{
    const draw=()=>{
      b.innerHTML=`<p class="muted">${done}/${secs.length} matched · ${flips} flips</p>
      <div class="pair"><div>${left.map(l=>`<button class="p ${l.done?"done":""} ${selL===l.id?"sel":""}" data-l="${l.id}">${l.t}</button>`).join("")}</div>
      <div>${right.map(r=>`<button class="p ${r.done?"done":""} ${selR===r.id?"sel":""}" data-r="${r.id}">${r.t}</button>`).join("")}</div></div>`;
      b.querySelectorAll("[data-l]").forEach(x=>x.onclick=()=>{ selL=x.dataset.l; flips++; check(); });
      b.querySelectorAll("[data-r]").forEach(x=>x.onclick=()=>{ selR=x.dataset.r; flips++; check(); });
    };
    const check=()=>{
      if(selL&&selR){
        const hit=selL===selR;
        if(hit){ const L=left.find(x=>x.id===selL), R=right.find(x=>x.id===selR); L.done=R.done=true; done++; S.xp+=5; S.trail.push({t:Date.now(),ev:"game",key:ch.book+":"+ch.number,ok:1}); }
        selL=selR=null;
      }
      if(done===secs.length){ S.xp+=10; save();
        b.innerHTML=`<div style="text-align:center;padding:14px"><div class="big-num">${flips}</div><p class="muted">flips to clear · +${secs.length*5+10} XP</p><button class="btn primary" onclick="Saathy.renderGames();Saathy.closeStage()">Done</button></div>`; renderHome(); }
      else draw();
    };
    draw();
  });
}
function gameRapid(){ const key=currentPlanKey(); const ch=key?chapterOf(key):allChapters()[0]; openFlash(ch.book+":"+ch.number,ch); }
function gameStreak(){
  const qs=bankQs(6); let pot=0,i=0;
  openStage("Streak Challenge","game",b=>{
    const draw=()=>{
      if(i>=qs.length){ S.xp+=pot; save(); renderHome();
        b.innerHTML=`<div style="text-align:center;padding:14px"><div class="big-num">+${pot} XP</div><p class="muted">banked safely</p><button class="btn primary" onclick="Saathy.closeStage()">Done</button></div>`; return; }
      const q=qs[i];
      b.innerHTML=`<div class="boss-gate"><b>Round ${i+1}/6</b><p class="muted" style="color:var(--powder)">Pot: <b>${pot} XP</b> — answer right to grow it, or bank it.</p></div>
      <div style="font-weight:700;margin:12px 0">${q.q}</div>
      ${q.opts.map((o,j)=>`<button class="opt" data-i="${j}"><span class="k">${"ABCD"[j]}</span><span>${o}</span></button>`).join("")}
      <div class="row" style="margin-top:10px"><button class="btn peach" id="bank">Bank ${pot} XP</button></div>`;
      b.querySelectorAll(".opt").forEach(o=>o.onclick=()=>{ const ok=+o.dataset.i===q.a; if(ok){pot+=10;S.trail.push({t:Date.now(),ev:"game",ok:1});} else { pot=0; S.trail.push({t:Date.now(),ev:"game",ok:0}); toast("Pot lost — brave move, that's the game"); } i++; save(); draw(); });
      $("#bank").onclick=()=>{ i=qs.length; draw(); };
    };
    draw();
  });
}
function gameBoss(){
  const key=currentPlanKey(); const ch=key?chapterOf(key):allChapters()[0];
  const secs=(ch.sections||[]).filter(s=>s.content);
  const avg=secs.length?Math.round(secs.reduce((a,s)=>a+mastery(`${ch.book}:${ch.number}:${s.id}`).score,0)/secs.length):0;
  openStage("Boss Level — "+ch.title,"boss",b=>{
    if(avg<70){
      b.innerHTML=`<div class="boss-gate"><h3 style="color:#fff">LOCKED — the Boss guards this chapter</h3>
      <p style="color:var(--powder)">Chapter mastery: <b>${avg}%</b> — you need <b>70%</b>.</p>
      <p style="color:var(--powder);font-size:14px">No shame in the gate — it means Guru has one more slide-quiz round for you. Beat the quiz, then the boss.</p>
      <button class="btn peach" id="gg">Take the boost quiz (L1)</button></div>`;
      $("#gg").onclick=()=>openQuiz(ch.book+":"+ch.number,"Boost quiz");
      return;
    }
    const qs=questionsForChapter(ch.book+":"+ch.number,5).map(q=>({...q,L:3}));
    let i=0,ok=0;
    const draw=()=>{
      if(i>=qs.length){
        if(ok>=4){ const idx=allChapters().findIndex(c=>c.book===ch.book&&c.number===ch.number); const nxt=allChapters()[idx+1];
          S.xp+=40; if(!S.games.bossWins.includes(ch.book+":"+ch.number)) S.games.bossWins.push(ch.book+":"+ch.number); save();
          b.innerHTML=`<div class="boss-gate" style="background:linear-gradient(135deg,var(--good),var(--ocean))"><h3 style="color:#fff">BOSS DEFEATED</h3><p style="color:#fff">+40 XP · next chapter preview unlocked:</p><div class="card" style="text-align:left;margin:12px 0"><b>${nxt?nxt.title:"You finished the book — legend."}</b><p class="muted">${nxt?firstLines(nxt.intro||"",2):""}</p></div><button class="btn peach" onclick="Saathy.closeStage()">Claim</button></div>`;
        } else {
          b.innerHTML=`<div class="boss-gate"><h3 style="color:#fff">So close — ${ok}/5</h3><p style="color:var(--powder)">The boss survives at 4/5. One more flashcard sprint and you've got this.</p><button class="btn peach" onclick="Saathy.closeStage()">Back</button></div>`;
        }
        renderHome(); return;
      }
      const q=qs[i];
      b.innerHTML=`<p class="muted">Boss HP: ${"▮".repeat(5-i)}${"▯".repeat(i)} · Q${i+1}/5</p><div style="font-weight:700;margin:10px 0">${q.q}</div>
      ${q.opts.map((o,j)=>`<button class="opt" data-i="${j}"><span class="k">${"ABCD"[j]}</span><span>${o}</span></button>`).join("")}`;
      b.querySelectorAll(".opt").forEach(o=>o.onclick=()=>{ if(+o.dataset.i===q.a) ok++; i++; draw(); });
    };
    draw();
  });
}

/* ---------- Video kit UI ---------- */
let vkF={cls:"all",subj:"all",q:""};
function renderVideos(){
  const cats=[["all","All"],["math","Maths"],["sci","Science"],["sst","SST"],["9","Class 9"],["10","Class 10"]];
  $("#vkFilter").innerHTML=cats.map(([v,l])=>`<button class="tm ${vkF.cls===v||vkF.subj===v?"on":""}" data-v="${v}">${l}</button>`).join("")+`<input id="vkQ" placeholder="Search concept…" style="border:1.5px solid var(--border);border-radius:999px;padding:8px 14px;font-size:13px;min-width:150px" value="${vkF.q}">`;
  $("#vkFilter").querySelectorAll("[data-v]").forEach(b=>b.onclick=()=>{ const v=b.dataset.v; if(v==="math"||v==="sci"||v==="sst") vkF.subj=vkF.subj===v?"all":v; else if(v!=="all") vkF.cls=vkF.cls===v?"all":v; else {vkF.cls="all";vkF.subj="all";} renderVideos(); });
  $("#vkQ").oninput=e=>{ vkF.q=e.target.value; paintVK(); const q=$("#vkQ"); q.focus(); q.setSelectionRange(q.value.length,q.value.length); };
  paintVK();
}
function vkSearch(q){ go("videos"); vkF={cls:"all",subj:"all",q}; renderVideos(); }
/* Group VIDEO_DB: primary video first per concept, alternates = "more teachers" */
const VK_GROUPS={};
VIDEO_DB.forEach(([bk,cls,concept,vid,author,title])=>{
  const k=bk+":"+cls+":"+concept;
  (VK_GROUPS[k]=VK_GROUPS[k]||{bk,cls,concept,vids:[]}).vids.push({vid,author,title});
});
function paintVK(){
  const groups=Object.values(VK_GROUPS).filter(g=>
    (vkF.subj==="all"||g.bk===vkF.subj)&&(vkF.cls==="all"||String(g.cls)===vkF.cls)&&(!vkF.q||g.concept.toLowerCase().includes(vkF.q.toLowerCase())));
  $("#vkList").innerHTML=groups.length?groups.map(g=>{
    const [p,...alts]=g.vids;
    const subj=g.bk==="math"?"Maths":g.bk==="sci"?"Science":"SST";
    const altLinks=alts.slice(0,2).map(v=>`<a class="vlink" target="_blank" rel="noopener" href="https://www.youtube.com/watch?v=${v.vid}">▶ ${v.author}</a>`).join("");
    const searchMore=`<a class="vlink" target="_blank" rel="noopener" href="https://www.youtube.com/results?search_query=${encodeURIComponent(g.concept+" class "+g.cls+" full chapter")}">🔍 find another teacher</a>`;
    return `<div class="vk-card"><span class="v-sub">Class ${g.cls} · ${subj}</span><h4>${g.concept}</h4>
      <a class="vwatch" target="_blank" rel="noopener" href="https://www.youtube.com/watch?v=${p.vid}">
        <img src="https://i.ytimg.com/vi/${p.vid}/mqdefault.jpg" alt="" loading="lazy" width="160" height="90" style="border-radius:10px;flex:0 0 160px;height:auto;max-height:90px;object-fit:cover">
        <span class="vw-t"><b>▶ Watch now — direct link</b><span class="vw-author">${p.author}</span><span class="vw-title">${p.title}</span></span>
      </a>
      ${alts.length?`<div class="vlinks">${altLinks}${searchMore}</div>`:`<div class="vlinks">${searchMore}</div>`}
      <div class="watch-plan"><div class="wp-t">Watch plan · auto checkpoints (jump freely — the video's own chapters help)</div>
      ${AUTO_PLAN.map(([t,lab])=>`<div class="vt-row"><b class="t">${t}</b><span>${lab}</span></div>`).join("")}</div></div>`;
  }).join(""):`<div class="card"><p class="muted">No match — try another keyword (e.g. "motion", "circle", "democracy").</p></div>`;
}
