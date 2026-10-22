/* ================================================================
   MATHS WAR — core engine: state, audio, fx, router, hud, modal
   ================================================================ */
'use strict';
const $=(s,el=document)=>el.querySelector(s);
const $$=(s,el=document)=>[...el.querySelectorAll(s)];
const ri=(a,b)=>Math.floor(Math.random()*(b-a+1))+a;
const rf=(a,b)=>Math.random()*(b-a)+a;
const pick=a=>a[Math.floor(Math.random()*a.length)];
const shuffle=a=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const gcd=(a,b)=>{a=Math.abs(a);b=Math.abs(b);while(b){[a,b]=[b,a%b]}return a||1};
const pad=n=>String(n).padStart(2,'0');
function sign(n){return n<0?`− ${Math.abs(n)}`:`+ ${Math.abs(n)}`}
function signed(n){return n<0?`−${Math.abs(n)}`:`${n}`}
function fracStr(a,b){const g=gcd(a,b);a/=g;b/=g;if(b===1)return `${a}`;if(b<0){a=-a;b=-b}return b===1?`${a}`:`<span class="mfrac"><span>${a}</span><span>${b}</span></span>`}
const SVGNS='http://www.w3.org/2000/svg';
function svgEl(tag,attrs={},parent){const e=document.createElementNS(SVGNS,tag);for(const k in attrs)e.setAttribute(k,attrs[k]);if(parent)parent.appendChild(e);return e}

/* ---------------- STATE ---------------- */
const RANKS=['ROOKIE','FIGHTER','WARRIOR','ACE','CAPTAIN','WARLORD','MATH TITAN','LEGEND'];
const SKEY='mathswar_v3';
const freshWorld=()=>({theater:false,lab:false,practice:0,boss:false,correct:0,attempt:0});
let S={xp:0,streak:0,best:0,sound:true,seenIntro:false,worlds:Array.from({length:8},freshWorld),coachDone:{}};
function save(){try{localStorage.setItem(SKEY,JSON.stringify(S))}catch(e){}}
function load(){
 try{
  const d=JSON.parse(localStorage.getItem(SKEY));
  if(d&&d.worlds){
   S=Object.assign(S,d);
   const src=Array.isArray(d.worlds)?d.worlds:Object.values(d.worlds);
   S.worlds=Array.from({length:8},(_,i)=>Object.assign(freshWorld(),src[i]||{}));
   if(!S.coachDone)S.coachDone={};
  }
 }catch(e){}
}
load();
function lvl(){return Math.min(8,Math.floor(S.xp/120)+1)}
function rank(){return RANKS[lvl()-1]}
function addXP(n,why){S.xp+=n;updateHUD();if(why)toast(`+${n} XP · ${why}`,'⚡');save()}
function bumpStreak(){S.streak++;S.best=Math.max(S.best,S.streak);updateHUD();save();const f=$('#streak-ico');if(f){f.classList.remove('bump');void f.offsetWidth;f.classList.add('bump')}}
function resetStreak(){S.streak=0;updateHUD();save()}

/* ---------------- AUDIO (tiny synth) ---------------- */
let AC=null;
function ac(){if(!AC){try{AC=new (window.AudioContext||window.webkitAudioContext)()}catch(e){}}return AC}
function tone(f,t,dur,type='sine',vol=.16,delay=0){
  if(!S.sound)return;const c=ac();if(!c)return;
  const o=c.createOscillator(),g=c.createGain();
  o.type=type;o.frequency.setValueAtTime(f,c.currentTime+delay);
  g.gain.setValueAtTime(0,c.currentTime+delay);
  g.gain.linearRampToValueAtTime(vol,c.currentTime+delay+.015);
  g.gain.exponentialRampToValueAtTime(.0001,c.currentTime+delay+dur);
  o.connect(g);g.connect(c.destination);o.start(c.currentTime+delay);o.stop(c.currentTime+delay+dur+.05);
}
const SFX={
  click(){tone(660,.06,.09,'triangle',.1)},
  tap(){tone(520,.06,.07,'sine',.09)},
  good(){tone(523,.12,.14,'sine',.14);tone(659,.12,.14,'sine',.14,.09);tone(784,.16,.22,'sine',.15,.18)},
  bad(){tone(196,.2,.25,'sawtooth',.1);tone(147,.2,.3,'sawtooth',.09,.08)},
  whoosh(){tone(300,.5,.18,'sine',.05);tone(900,.3,.1,'sine',.04,.03)},
  pop(){tone(880,.05,.08,'triangle',.12)},
  fanfare(){[523,659,784,1047].forEach((f,i)=>tone(f,.14,.34,'triangle',.14,i*.13));tone(1319,.3,.5,'sine',.12,.55)},
  hit(){tone(180,.08,.1,'square',.12);tone(90,.15,.16,'sawtooth',.1,.02)},
  swing(){tone(1200,.1,.06,'sine',.07);tone(400,.2,.1,'sawtooth',.05,.03)},
  level(){[392,494,587,784,988].forEach((f,i)=>tone(f,.13,.3,'sine',.13,i*.09))},
  tick(){tone(1000,.03,.04,'sine',.05)},
  slide(){tone(500,.08,.12,'sine',.05)}
};

/* ---------------- TOAST ---------------- */
function toast(msg,ico='',gold=false){
  const w=$('#toast-wrap');const t=document.createElement('div');
  t.className='toast'+(gold?' gold':'');t.innerHTML=(ico?`<span>${ico}</span>`:'')+`<span>${msg}</span>`;
  w.appendChild(t);setTimeout(()=>{t.classList.add('out');setTimeout(()=>t.remove(),320)},2100);
}

/* ---------------- CONFETTI ---------------- */
const FX={parts:[],raf:null};
function confetti(x,y,n=60,colors=['#2FB8A0','#FFAF3C','#FF7B6B','#5EB8FF','#9B7BDE','#7BC86C']){
  const cv=$('#confetti-cv');if(cv.width!==innerWidth){cv.width=innerWidth;cv.height=innerHeight}
  for(let i=0;i<n;i++){const a=rf(0,Math.PI*2),sp=rf(3,11);
    FX.parts.push({x,y,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp-5,g:.28,w:rf(5,10),h:rf(5,10),c:pick(colors),r:rf(0,6.3),vr:rf(-.25,.25),life:rf(50,90)})}
  if(!FX.raf)fxLoop();
}
function fxLoop(){
  const cv=$('#confetti-cv'),cx=cv.getContext('2d');
  cx.clearRect(0,0,cv.width,cv.height);
  FX.parts=FX.parts.filter(p=>p.life>0);
  for(const p of FX.parts){p.x+=p.vx;p.y+=p.vy;p.vy+=p.g;p.r+=p.vr;p.life--;
    cx.save();cx.translate(p.x,p.y);cx.rotate(p.r);cx.globalAlpha=clamp(p.life/28,0,1);
    cx.fillStyle=p.c;cx.fillRect(-p.w/2,-p.h/2,p.w,p.h*(p.life>40?1:Math.abs(p.vy)/8));cx.restore()}
  if(FX.parts.length)FX.raf=requestAnimationFrame(fxLoop);else{FX.raf=null;cx.clearRect(0,0,cv.width,cv.height)}
}
function burstAt(el,n=50){if(!el)return;const r=el.getBoundingClientRect();confetti(r.left+r.width/2,r.top+r.height/2,n)}

/* ---------------- HUD ---------------- */
function updateHUD(){
  $('#hud-xp').textContent=S.xp;
  $('#hud-streak').textContent=S.streak;
  $('#hud-lvl').textContent=lvl();
  $('#hud-rank').textContent=rank();
  $('#btn-sound').textContent=S.sound?'🔊':'🔇';
}
$('#btn-sound').onclick=()=>{S.sound=!S.sound;updateHUD();save();if(S.sound)SFX.pop();toast(S.sound?'Sound ON':'Sound OFF',S.sound?'🔊':'🔇')};

/* ---------------- ROUTER ---------------- */
let CUR=null;
function show(id){
  $$('.screen').forEach(s=>s.classList.remove('on'));
  const el=$('#'+id);if(el)el.classList.add('on');
  CUR=id;
}
function setHUD(title,sub,showHome=true){
  $('#hud').classList.toggle('on',!!title);
  if(title){$('#hud-title').textContent=title;$('#hud-sub').textContent=sub||''}
  $('#hud-home').style.display=showHome?'grid':'none';
}
$('#hud-home').onclick=()=>{SFX.click();goMap()};

/* ---------------- MODAL ---------------- */
function modal(html,{onClose}={}){
  const w=$('#modal-wrap'),b=$('#modal-box');
  b.innerHTML=`<button class="modal-x" onclick="closeModal()">✕</button>`+html;
  w.classList.add('on');
  w.onclick=e=>{if(e.target===w)closeModal()};
  MODAL_CB=onClose||null;
}
let MODAL_CB=null;
function closeModal(){const w=$('#modal-wrap');w.classList.remove('on');$('#modal-box').innerHTML='';if(MODAL_CB){const cb=MODAL_CB;MODAL_CB=null;cb()}}
function debrief({title='MISSION DEBRIEF',ribbon='You just learned — without even noticing 😎',cls='',concepts=[],lines=[],btn='Keep going',btnCls='',onGo}){
  modal(`
    <div class="deb-ribbon ${cls}">${title}</div>
    <div class="modal-body center">
      <div style="font-size:13px;font-weight:800;color:var(--ink2);margin-top:4px">${ribbon}</div>
      <div class="concept-line">${concepts.map(c=>`<span class="chip ${pick(['','a','s','g'])}">${c}</span>`).join('')}</div>
      ${lines.map(l=>`<p style="font-size:14px;line-height:1.6;margin-top:10px;font-weight:600">${l}</p>`).join('')}
    </div>
    <div class="modal-foot"><button class="btn ${btnCls}" id="deb-go">${btn} →</button></div>`);
  $('#deb-go').onclick=()=>{SFX.click();closeModal();if(onGo)onGo()};
}

/* ---------------- COACH ---------------- */
function coach(text,anchorSel,screenEl){
  if(!screenEl)screenEl=$('#'+CUR);
  const a=anchorSel?$(anchorSel,screenEl):null;
  if(a){const r=a.getBoundingClientRect(),sr=screenEl.getBoundingClientRect();
    const tip=document.createElement('div');tip.className='coach-tip';tip.innerHTML=text;
    screenEl.appendChild(tip);
    let x=r.left-sr.left+r.width/2, y=r.bottom-sr.top+10;
    tip.style.left=clamp(x-110,8,sr.width-248)+'px';tip.style.top=y+'px';
    a.classList.add('coach-ring');
    const clean=()=>{tip.remove();a.classList.remove('coach-ring')};
    a.addEventListener('click',()=>setTimeout(clean,50),{once:true});
    setTimeout(clean,6000);
  } else toast(text,'👆');
}
