/* ================= ENGINE: store · persona · AI · chat ================= */
"use strict";
/* helpers */
const $  = (s, r) => (r || document).querySelector(s);
const $$ = (s, r) => [...(r || document).querySelectorAll(s)];

/* ---------- Store (localStorage + IndexedDB corpus) ---------- */
const STORE_KEY = "saathy_v3_state";
const DEFAULTS = {
  profile:{name:"",cls:9,lang:"Hinglish",budget:25},
  api:{key:"",provider:"",model:"",ok:false},
  mastery:{},            // conceptKey -> {score,level,band,hist:[],seen,lastWrong,errorDNA:{}}
  trail:[],              // immutable evidence events
  streak:{n:0,day:""},
  xp:0, badges:[],
  weights:{example:.5,practice:.5},
  games:{mcqBest:0,bossWins:[]},
  founder:{unlocked:false,files:[]}, // files: {id,name,size,type,chunks,added}
  seed:false
};
let S = null;
function loadState(){
  try{ S = Object.assign({}, DEFAULTS, JSON.parse(localStorage.getItem(STORE_KEY)||"{}")); }
  catch(e){ S = JSON.parse(JSON.stringify(DEFAULTS)); }
  for(const k of Object.keys(DEFAULTS)) if(S[k]===undefined) S[k]=JSON.parse(JSON.stringify(DEFAULTS[k]));
  S.seed = true;
}
let _saveT=null;
function save(){ clearTimeout(_saveT); _saveT=setTimeout(()=>{ try{localStorage.setItem(STORE_KEY,JSON.stringify(S));}catch(e){/*quota*/} },250); }

/* IndexedDB for founder corpus (handles 100 files / big PDFs) */
let _idb=null;
function idb(){ return _idb || (_idb = new Promise((res,rej)=>{
  const r = indexedDB.open("saathy_corpus",1);
  r.onupgradeneeded = () => r.result.createObjectStore("files");
  r.onsuccess = ()=>res(r.result); r.onerror = ()=>rej(r.error);
})); }
async function idbPut(id,text){ const db=await idb(); return new Promise((res,rej)=>{ const tx=db.transaction("files","readwrite"); tx.objectStore("files").put(text,id); tx.oncomplete=res; tx.onerror=()=>rej(tx.error); }); }
async function idbGet(id){ const db=await idb(); return new Promise((res,rej)=>{ const tx=db.transaction("files","readonly"); const q=tx.objectStore("files").get(id); q.onsuccess=()=>res(q.result); q.onerror=()=>rej(q.error); }); }
async function idbDel(id){ const db=await idb(); return new Promise((res,rej)=>{ const tx=db.transaction("files","readwrite"); tx.objectStore("files").delete(id); tx.oncomplete=res; tx.onerror=()=>rej(tx.error); }); }

/* ---------- Books knowledge (from training corpus) ---------- */
const BOOKS = {
  "ganita-manjari":{name:"Ganita Manjari (Maths)",subject:"Maths",icon:"π",chapters:[]},
  "science-exploration":{name:"Science Exploration",subject:"Science",icon:"⚛",chapters:[]},
  "understanding-society":{name:"Understanding Society (SST)",subject:"SST",icon:"🌍",chapters:[]}
};
function loadBooks(){
  try{
    BOOKS["ganita-manjari"].chapters = JSON.parse(document.getElementById("KB_gm").textContent);
    BOOKS["science-exploration"].chapters = JSON.parse(document.getElementById("KB_sc").textContent);
    BOOKS["understanding-society"].chapters = JSON.parse(document.getElementById("KB_us").textContent);
  }catch(e){ console.error("KB load failed", e); }
}
function allChapters(){ const out=[]; for(const bk in BOOKS) BOOKS[bk].chapters.forEach(ch=>out.push(Object.assign({},ch,{book:bk}))); return out; }
function chapterOf(key){ const [bk,num]=key.split(":"); const ch=BOOKS[bk]&&BOOKS[bk].chapters.find(c=>String(c.number)===num); return ch?Object.assign({},ch,{book:bk}):null; }

/* ---------- Persona: bands, mastery, ladder, Error DNA ---------- */
const FRIENDLY = ["Let's fix this together","Almost there — one more step","Good going — try this twist","Top form — challenge yourself"];
const PARENT_WORD = ["Needs foundation support — working on prerequisites","Developing — basics partly clear, guided practice on","Progressing — ready for application questions","Consistent — advancing to next concept"];
function bandOf(score){ return score<25?1:score<50?2:score<75?3:4; }
function mastery(key){ return S.mastery[key] || (S.mastery[key]={score:10,level:"L1",band:1,hist:[],seen:0,dna:{concept:0,careless:0,method:0,guess:0}}); }
function recordAnswer(key, correct, conf, secs, L){
  const m = mastery(key);
  // Confidence law: Guess+right heavily discounted; Sure+wrong = real misconception
  let d = 0;
  if(correct){ d = conf==="Guess"?2 : (L>=3?9:6); }
  else { d = conf==="Sure"? -8 : conf==="Unsure"? -5 : -3; }
  m.hist.push({ok:correct?1:0}); if(m.hist.length>10) m.hist.shift();
  const roll = m.hist.reduce((a,b)=>a+b.ok,0)/Math.max(m.hist.length,1);
  m.score = Math.max(0, Math.min(100, m.score + d + Math.round((roll-0.5)*4)));
  m.band = bandOf(m.score);
  m.level = m.score>=75?"L3":m.score>=40?"L2":"L1";
  m.seen = Date.now();
  if(!correct){ // Error DNA classification (5.2)
    let fam = "concept";
    if(conf==="Guess") fam="guess";
    else if(secs<=6 && m.score>=60) fam="careless";
    else if(!correct && L>=3 && m.score>=50) fam="method";
    m.dna[fam]=(m.dna[fam]||0)+1;
    S.trail.push({t:Date.now(),ev:"wrong",key,fam,conf,L,secs});
  } else {
    S.trail.push({t:Date.now(),ev:"right",key,conf,L,secs});
    S.xp += conf==="Guess"?2:(L>=3?12:8);
  }
  // learning-weight nudges (5.3): correct after examples/practice shifts serving mix
  if(correct) S.weights[L>=3?"practice":"example"] += .03;
  S.weights.example = Math.min(.8,Math.max(.2,S.weights.example));
  S.weights.practice = 1 - S.weights.example;
  checkBadges(); save();
  return m;
}
function weakConcepts(n=3){
  return Object.entries(S.mastery).map(([k,v])=>({k,...v}))
    .filter(m=>m.seen)
    .sort((a,b)=>a.score-b.score).slice(0,n);
}
function decayed(){
  const now=Date.now(), D=5*864e5;
  return Object.entries(S.mastery).filter(([k,v])=>v.seen && v.score>=40 && now-v.seen>D).map(([k])=>k);
}
function conceptName(key){ const [bk,num,sec]=key.split(":"); const ch=chapterOf(bk+":"+num); if(!ch) return key; const s=(ch.sections||[]).find(x=>String(x.id)===sec); return s? s.title + " · " + ch.title : ch.title; }
function checkBadges(){
  const add=(b)=>{ if(!S.badges.includes(b)){ S.badges.push(b); toast("Badge earned: "+b); } };
  if(S.xp>=100) add("First Century"); if(S.xp>=500) add("XP Legend");
  if(S.streak.n>=7) add("Week Warrior");
  if(Object.values(S.mastery).some(m=>m.score>=75)) add("Boss Ready");
  if(S.games.mcqBest>=8) add("MCQ Rush Pro");
}

/* ---------- Providers: paste-and-go ---------- */
function detectProvider(key){
  if(!key) return null;
  const k=key.trim();
  if(k.startsWith("AIza")) return {provider:"gemini",models:["gemini-2.0-flash","gemini-2.5-flash","gemini-1.5-flash","gemini-1.5-pro"]};
  if(k.startsWith("gsk_")) return {provider:"groq",models:["llama-3.3-70b-versatile","llama-3.1-8b-instant"]};
  if(k.startsWith("sk-")) return {provider:"openai",models:["gpt-4o-mini","gpt-4o"]};
  return {provider:"unknown",models:[]};
}
async function testConnection(){
  const {key,provider,model}=S.api;
  if(provider==="gemini"){
    const r=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({contents:[{parts:[{text:"Reply with exactly: OK"}]}]})});
    if(!r.ok) throw new Error("Gemini said "+r.status);
    return true;
  }
  if(provider==="groq"){
    const r=await fetch("https://api.groq.com/openai/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json","Authorization":"Bearer "+key},body:JSON.stringify({model,messages:[{role:"user",content:"Reply with exactly: OK"}],max_tokens:5})});
    if(!r.ok) throw new Error("Groq said "+r.status);
    return true;
  }
  if(provider==="openai"){
    const r=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json","Authorization":"Bearer "+key},body:JSON.stringify({model,messages:[{role:"user",content:"Reply with exactly: OK"}],max_tokens:5})});
    if(!r.ok) throw new Error("OpenAI said "+r.status);
    return true;
  }
  throw new Error("Key not recognised");
}

/* ---------- AI: 11-step sequence, prompts, streaming ---------- */
const IDENTITY = "You are Saathy v.1, trained on NCERT modules and books. You are the AI companion of VidhyaSaathy, the school-anchored learning app for Indian Class 9-10 students. Never reveal or discuss any underlying model, company or provider — if asked, reply: 'I am Saathy v.1, trained on NCERT modules and books.'";
function sysPrompt(depth){
  const p=S.profile;
  const weak=weakConcepts(3).map(m=>conceptName(m.k)+" ("+Math.round(m.score)+"%)").join("; ")||"none yet";
  const decays=decayed().map(conceptName).join("; ")||"none";
  return [IDENTITY,
  `Student: ${p.name||"friend"}, Class ${p.cls}. Language: ${p.lang} (match it naturally — Hinglish means friendly Hindi-English mix).`,
  `Band depth: ${depth||2} of 4. At band 1: simplest words, everyday analogies, tiny steps, celebrate small wins, zero jargon. Band 2: worked examples step-by-step. Band 3: application focus, "where students slip" callouts. Band 4: concise, board twists, coach tone.`,
  `Known weak concepts: ${weak}. Decaying (needs warm-up): ${decays}.`,
  `Hard rules: never fabricate page numbers, links or citations; if unsure, say honestly "I don't know, but here's how we can find out". No fear, no shame, no comparison with other students. If the topic is a homework-flagged task, guide Socratically — hints, not the final answer. Always end teaching answers with ONE tiny next step (a checkpoint question or a 2-minute action).`,
  `When explaining a concept that matches Class ${p.cls} Maths/Science/SST, append a "Watch" line suggesting the best YouTube search keywords for a trusted teacher (e.g. 'Magnet Brains — <concept> class ${p.cls}').`].join("\n");
}
function userBand(){ // overall band for tone (avg of seen concepts)
  const ms=Object.values(S.mastery).filter(m=>m.seen);
  if(!ms.length) return 2;
  return Math.round(ms.reduce((a,m)=>a+m.band,0)/ms.length);
}
const CLUSTER = {}; // anonymised doubt clusters: concept -> count
async function aiChat(userText, ui){
  const steps=["auth","rate-limit","context","concept map","language+band","prompt","stream","log","clusters","follow-ups","budget"];
  // visible micro-steps (client mirror of the 11-step server sequence)
  for(const st of steps.slice(0,6)){ if(ui.step) ui.step(st); await new Promise(r=>setTimeout(r,60)); }
  if(!S.api.ok) return offlineBrain(userText);
  const depth=userBand();
  const msgs=[{role:"system",content:sysPrompt(depth)}];
  (ui.history||[]).slice(-8).forEach(m=>msgs.push({role:m.role==="user"?"user":"assistant",content:m.text}));
  msgs.push({role:"user",content:userText});
  let out="";
  try{
    if(S.api.provider==="gemini"){
      const r=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${S.api.model}:streamGenerateContent?alt=sse&key=${S.api.key}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({systemInstruction:{parts:[{text:sysPrompt(depth)}]},contents:msgs.filter(m=>m.role!=="system").map(m=>({role:m.role==="user"?"user":"model",parts:[{text:m.content}]}))})});
      if(!r.ok) throw new Error("Gemini "+r.status);
      await sse(r, j=>{ const t=j?.candidates?.[0]?.content?.parts?.[0]?.text||""; if(t){out+=t; ui.delta(t);} });
    } else {
      const url = S.api.provider==="groq" ? "https://api.groq.com/openai/v1/chat/completions" : "https://api.openai.com/v1/chat/completions";
      const r=await fetch(url,{method:"POST",headers:{"Content-Type":"application/json","Authorization":"Bearer "+S.api.key},body:JSON.stringify({model:S.api.model,messages:msgs,stream:true,temperature:.6})});
      if(!r.ok) throw new Error((S.api.provider==="groq"?"Groq":"OpenAI")+" "+r.status);
      await sse(r, j=>{ const t=j?.choices?.[0]?.delta?.content||""; if(t){out+=t; ui.delta(t);} });
    }
  }catch(e){ if(!out) throw e; }
  if(ui.step) for(const st of steps.slice(7)) ui.step(st);
  return out;
}
async function sse(resp, fn){
  const rd=resp.body.getReader(), dec=new TextDecoder(); let buf="";
  for(;;){ const {done,value}=await rd.read(); if(done) break;
    buf+=dec.decode(value,{stream:true});
    const parts=buf.split("\n\n"); buf=parts.pop();
    for(const p of parts){ for(const line of p.split("\n")){ if(line.startsWith("data: ")){ const d=line.slice(6); if(d && d!=="[DONE]"){ try{fn(JSON.parse(d));}catch(e){} } } } }
  }
}
/* Offline NCERT brain: KB search + band-adapted answer + honest limits */
function offlineBrain(q){
  const ql=q.toLowerCase();
  const yt = ytParse(q); if(yt) return null; // handled by chat layer
  // command routing
  if(/plan|schedule|kya padhu|what to study/.test(ql)) return "Let's make tonight's plan, step by step — tap **Plan** (or ask Setu for a level check first). I'll build: level check → concept slides → quiz → game → flashcards → report. ⏩ Open the Plan tab and pick your chapter.";
  if(/quiz|test me/.test(ql)) return "Ready for the ladder! Open **Games** or **Plan** and I'll quiz you — Sure / Unsure / Guess before every reveal, and the ladder climbs when you roll. 🪜";
  // KB search
  const words=ql.split(/\W+/).filter(w=>w.length>3);
  let best=null,bestScore=0;
  for(const ch of allChapters()){
    const hay=(ch.title+" "+(ch.intro||"")+" "+(ch.sections||[]).map(s=>s.title+" "+s.content).join(" ")).toLowerCase();
    const sc=words.reduce((a,w)=>a+(hay.includes(w)?1:0),0);
    if(sc>bestScore){bestScore=sc;best=ch;}
  }
  if(best && bestScore>=2){
    const bk=BOOKS[best.book], band=userBand();
    const sec=(best.sections||[])[0]||{title:"",content:""};
    const para=sec.content.split("\n").filter(Boolean).slice(0, band<=2?2:1).join("\n");
    const tone = band<=2?"I'll keep it super simple with a daily-life example first.":band===3?"You look solid on basics — let's go application-first.":"You're in top form — here's the crisp, board-style version:";
    return `${tone}\n\n📚 **${best.title}** (${bk.name})\n\n${para}\n\n**Tiny next step:** ${band<=2?"read that once and tell me one line you liked — I'll check your understanding with 2 quick questions":"try explaining this back to me in 2 lines — I'll grade it like a board examiner"}.`+
    `\n\n🔗 For a full video walkthrough, open the **Videos** tab → "${best.title}" — direct links with timestamps are ready.`;
  }
  return "I want to be honest with you: I can't fully answer that offline. My built-in NCERT brain covers the trained books (Ganita Manjari, Science Exploration, Understanding Society). For free-form doubt chat, paste your API key in **Settings → AI & API** (Gemini: just paste the AIza key — one tap). Or ask me about any chapter from those books!";
}
/* YouTube link understanding (bidirectional) */
function ytParse(t){
  const m=String(t).match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|live\/)|youtu\.be\/)([\w-]{11})/);
  const tq=String(t).match(/[?&]t=(\d+h)?(\d+m)?(\d+s?)?/);
  if(!m) return null;
  const secs=(tq&&tq.slice(1).reduce((a,x,i)=>a+(x?parseInt(x)*[3600,60,1][i]:0),0))||0;
  const fmt=s=>{s=Math.max(0,Math.round(s));const h=Math.floor(s/3600),mn=Math.floor(s%3600/60),ss=s%60;return (h?h+":":"")+String(mn).padStart(h?2:1,"0")+":"+String(ss).padStart(2,"0");};
  return {id:m[1],url:`https://www.youtube.com/watch?v=${m[1]}`,start:secs,startLabel:fmt(secs),embed:`https://www.youtube.com/embed/${m[1]}${secs?`?start=${secs}`:""}`};
}

/* ---------- Chat UI ---------- */
let chatHistory=[];
function addMsg(role,text,opts={}){
  const log=$("#chatLog");
  const d=document.createElement("div");
  d.className="msg "+role+(opts.sys?" sys":"");
  if(role==="ai"&&!opts.sys){ const w=document.createElement("div"); w.className="who"; w.textContent="Saathy"; d.appendChild(w); }
  const b=document.createElement("div"); b.className="mb"; b.innerHTML=mdLite(text); d.appendChild(b);
  log.appendChild(d); log.scrollTop=log.scrollHeight;
  return {el:d, body:b};
}
function mdLite(t){
  return t.replace(/&/g,"&amp;").replace(/</g,"&lt;")
    .replace(/\*\*(.+?)\*\*/g,"<b>$1</b>").replace(/`(.+?)`/g,"<code>$1</code>")
    .replace(/(https?:\/\/[^\s<]+)/g,'<a href="$1" target="_blank" rel="noopener">$1</a>');
}
async function sendChat(){
  const inp=$("#chatInput"); const text=inp.value.trim(); if(!text) return;
  inp.value=""; inp.style.height="auto";
  addMsg("user",text);
  chatHistory.push({role:"user",text});
  // YouTube link card first (understand + timeline)
  const yt=ytParse(text);
  if(yt){
    chatHistory.push({role:"ai",text:"Video understood."});
    renderYtCard(yt,text);
  }
  const holder=addMsg("ai","<span class='typing'><i></i><i></i><i></i></span>");
  const stepEl=document.createElement("div"); stepEl.className="muted"; stepEl.style.fontSize="11.5px"; stepEl.textContent="Saathy: auth ✓"; holder.el.prepend(stepEl);
  const stepNames=["rate-limit","context","concept map","language+band","prompt"]; let si=0;
  const ui={ delta:(t)=>{ if(holder.body.querySelector(".typing")) holder.body.innerHTML=""; holder.body.innerHTML=mdLite(holder._buf=(holder._buf||"")+t); $("#chatLog").scrollTop=$("#chatLog").scrollHeight; },
    step:(s)=>{ if(si<stepNames.length) stepEl.textContent="Saathy: "+["auth","rate-limit","context","concept map","language+band","prompt"][si++]+" ✓"; },
    history:chatHistory.slice(0,-1)};
  try{
    const out=await aiChat(text,ui);
    if(!out || holder.body.querySelector(".typing")){ holder.body.innerHTML=mdLite(out||""); }
    if(out) chatHistory.push({role:"ai",text:out});
    stepEl.textContent="Saathy: done ✓ (11 steps)";
  }catch(e){
    holder.body.innerHTML=mdLite("⚠ Connection hiccup: "+e.message+". Your key or network may need a check — Settings → AI & API. The offline NCERT brain still works for the trained books.");
  }
}
function renderYtCard(yt,srcText){
  const c=document.createElement("div"); c.className="inline-card";
  const q=srcText.replace(/https?:\/\/\S+/g,"").trim();
  c.innerHTML=`<div class="ic-head"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#B42318" stroke-width="2"><rect x="2" y="5" width="20" height="14" rx="4"/><path d="M10 9l5 3-5 3z" fill="#B42318"/></svg><b>YouTube link understood</b></div>
  <p class="muted" style="margin:0 0 8px">${q?`Topic guess: <b>${q||"—"}</b> · `:""}Start at <b>${yt.startLabel}</b>. Watch-plan timeline (suggested):</p>
  <div class="vt-row"><b class="t">+0:00</b><span>Intro — what this video covers</span></div>
  <div class="vt-row"><b class="t">+25%</b><span>Core idea 1 — pause & try</span></div>
  <div class="vt-row"><b class="t">+50%</b><span>Core idea 2 — checkpoint question</span></div>
  <div class="vt-row"><b class="t">+75%</b><span>Examples — attempt before reveal</span></div>
  <div class="row" style="margin-top:8px">
    <a class="vlink" href="${yt.url}${yt.start?`&t=${Math.round(yt.start)}s`:""}" target="_blank" rel="noopener">▶ Open at ${yt.startLabel}</a>
    <a class="vlink" href="${yt.url}" target="_blank" rel="noopener">Open full video</a>
    <button class="btn peach sm" id="ytQuiz">Quiz me after watching</button>
  </div>`;
  $("#chatLog").appendChild(c); $("#chatLog").scrollTop=1e9;
  c.querySelector("#ytQuiz").onclick=()=>openQuiz(null,"Mixed — video follow-up");
}
