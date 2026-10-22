/* ================================================================
   BOSS BATTLE — rapid-fire duel vs the world's monster
   ================================================================ */
const BS={w:0,q:null,idx:0,total:8,bossHP:100,meHP:100,timer:null,tLeft:0,over:false,fighting:false};
function startBoss(w){
 BS.w=w;BS.idx=0;BS.bossHP=100;BS.meHP=100;BS.over=false;BS.fighting=false;
 setHUD(WORLDS[w].name+' · Boss Arena',WORLDS[w].boss);
 $('#scr-holder').innerHTML=`
 <div class="screen" id="scr-boss">
  <div class="bs-top">
   <div class="hp-wrap"><div class="hp-label"><span>🗡️ Dhruva</span><span id="me-hp-txt">100</span></div>
    <div class="hp-bar hp-me"><i id="me-hp" style="width:100%"></i></div></div>
   <div><div class="bs-tag">BOSS OF ${esc(WORLDS[w].name)}</div><div class="bs-name">${WORLDS[w].boss}</div></div>
   <div class="hp-wrap"><div class="hp-label"><span id="boss-hp-txt">${WORLDS[w].boss}</span><span>100</span></div>
    <div class="hp-bar hp-boss"><i id="boss-hp" style="width:100%"></i></div></div>
  </div>
  <div class="bs-arena">
   <div class="fighter" id="f-me">${heroSVG()}</div>
   <div class="bs-vs">VS</div>
   <div class="fighter" id="f-boss">${bossSVG(w)}</div>
  </div>
  <div class="bs-bottom">
   <div class="bs-q" id="bs-q">The boss flexes…</div>
   <div class="bs-timer"><i id="bs-time" style="width:100%"></i></div>
   <div class="bs-answers" id="bs-ans"></div>
   <button class="btn ghost sm" id="bs-flee">Retreat (no shame)</button>
  </div>
 </div>`;
 show('scr-boss');
 $('#bs-flee').onclick=()=>{SFX.click();stopTimer();goHub(w)};
 modal(`<div class="deb-ribbon grape">⚔️ ${WORLDS[w].boss} APPEARS</div>
  <div class="modal-body center">
   <div style="font-size:34px;margin:4px 0">${WORLDS[w].emoji}</div>
   <p style="font-weight:800;font-family:var(--f-head);font-size:16px;margin-bottom:8px">“${WORLDS[w].taunt}”</p>
   <p style="font-size:13.5px;color:var(--ink2);font-weight:700;line-height:1.6">${BS.total} questions. 25 seconds each. Every correct answer = one slash of your pencil-blade. Miss = boss strikes. You\u2019ve trained for this.</p>
  </div>
  <div class="modal-foot"><button class="btn coral" id="bs-go">FIGHT ⚔️</button></div>`,
  {onClose:()=>{if(!BS.over&&!BS.fighting)goHub(w)}});
 $('#bs-go').onclick=()=>{BS.fighting=true;SFX.swing();closeModal();bsNext()};
}
function stopTimer(){if(BS.timer){clearInterval(BS.timer);BS.timer=null}}
function bsTimer(){
 stopTimer();BS.tLeft=25;
 $('#bs-time').style.width='100%';$('#bs-time').classList.remove('danger');
 BS.timer=setInterval(()=>{
  const tEl=$('#bs-time');
  if(!tEl||document.querySelector('.screen.on')?.id!=='scr-boss'){stopTimer();return}
  BS.tLeft-=.25;
  tEl.style.width=(BS.tLeft/25*100)+'%';
  if(BS.tLeft<8)tEl.classList.add('danger');
  if(BS.tLeft<=0){stopTimer();bsAnswer(null)}
 },250);
}
function bsNext(){
 if(BS.over)return;
 BS.idx++;
 const gen=pick(QG[BS.w]);BS.q=gen();
 $('#bs-q').innerHTML=`<span style="opacity:.55;font-size:12px">Q${BS.idx}/${BS.total} · ${esc(BS.q.topic)}</span><br>${BS.q.q}`;
 const box=$('#bs-ans');
 if(BS.q.type==='mcq'){
  box.innerHTML=BS.q.choices.map(c=>`<button class="mcq" data-c="${esc(c)}">${c}</button>`).join('');
  $$('#bs-ans .mcq').forEach(b=>b.onclick=()=>bsAnswer(b.dataset.c===BS.q.ansText?BS.q.ansText:null,b));
 }else{
  box.innerHTML=`<input class="num-in" id="bs-in" placeholder="fast!" inputmode="decimal" style="max-width:220px"><button class="btn amber" id="bs-ok">Strike ⚡</button>`;
  $('#bs-ok').onclick=()=>{const v=parseFloat($('#bs-in').value);bsAnswer(!isNaN(v)&&Math.abs(v-BS.q.ans)<.01)};
  $('#bs-in').onkeydown=e=>{if(e.key==='Enter')$('#bs-ok').click()};
  setTimeout(()=>$('#bs-in')&&$('#bs-in').focus(),80);
 }
 bsTimer();
}
function bsAnswer(right,btn){
 if(BS.over)return;stopTimer();
 $$('#bs-ans .mcq').forEach(b=>{b.style.pointerEvents='none';if(BS.q.type==='mcq'&&b.dataset.c===BS.q.ansText)b.classList.add('right')});
 if(right){
  const boss=$('#f-boss'),me=$('#f-me');
  me.classList.add('attack');SFX.swing();
  setTimeout(()=>{
   boss.classList.add('hit');SFX.hit();
   boss.insertAdjacentHTML('beforeend',`<div class="slash" style="right:18%;top:8%">💥</div>`);
   boss.insertAdjacentHTML('beforeend',`<div class="dmg-float" style="right:30%;top:20%">−12</div>`);
   BS.bossHP=Math.max(0,BS.bossHP-100/BS.total);
   $('#boss-hp').style.width=BS.bossHP+'%';
   $('#boss-hp-txt').textContent=BS.bossHP<=0?'KO!':WORLDS[BS.w].boss;
   $('#bs-q').innerHTML=`<span style="color:#1E8C79;font-family:var(--f-head);font-weight:800">SMASH! “${pick(['Argg— my logic!','The pencil… it BURNS.','Equal parts… UNRAVELLING—'])}”</span>`;
   bumpStreak();
   setTimeout(()=>{me.classList.remove('attack');boss.classList.remove('hit');$$('.slash,.dmg-float',boss).forEach(e=>e.remove());
    if(BS.bossHP<=0)bsWin();else if(BS.idx<BS.total)bsNext();else bsWin()},900);
  },260);
 }else{
  const boss=$('#f-boss'),me=$('#f-me');
  boss.classList.add('attack');SFX.hit();
  setTimeout(()=>{
   me.classList.add('hit');SFX.bad();
   me.insertAdjacentHTML('beforeend',`<div class="dmg-float" style="left:30%;top:20%;color:#FF7B6B">−25</div>`);
   BS.meHP=Math.max(0,BS.meHP-25);$('#me-hp').style.width=BS.meHP+'%';
   $('#me-hp-txt').textContent=Math.round(BS.meHP);
   resetStreak();
   $('#bs-q').innerHTML=`<span style="color:#E05544;font-family:var(--f-head);font-weight:800">${BS.q?('Answer was: '+BS.q.ansText):'Time up!'}</span>`;
   setTimeout(()=>{boss.classList.remove('attack');me.classList.remove('hit');$$('.dmg-float',me).forEach(e=>e.remove());
    if(BS.meHP<=0)bsLose();else if(BS.idx<BS.total)bsNext();else bsLose()},1100);
  },260);
 }
}
function bsWin(){
 BS.over=true;stopTimer();
 const boss=$('#f-boss');boss.classList.add('fainted');
 SFX.fanfare();confetti(innerWidth/2,innerHeight*.35,140);
 const w=BS.w,st=S.worlds[w];
 const first=!st.boss;st.boss=true;save();
 addXP(first?60:20,first?'BOSS DEFEATED':'Boss rematch');
 setTimeout(()=>{
  debrief({title:'👑 '+WORLDS[w].boss+' DEFEATED',cls:'grape',
   ribbon:'World '+ (w+1) +' — '+WORLDS[w].real+' — is YOURS',
   concepts:WORLDS[w].concepts,
   lines:['Every concept on this island now lives in your head — and you never sat through a boring lecture. 🥷','Next: sail on. The Fog retreats island by island.'],
   btn:'Sail onward',onGo:()=>goMap()});
 },1000);
}
function bsLose(){
 BS.over=true;stopTimer();
 const w=BS.w;
 toast('The boss laughs… for now','😤');
 debrief({title:'💀 DEFEATED… THIS ROUND',cls:'',ribbon:'Bosses only win when a concept is shaky. Find it, fix it, return.',
  lines:['Tip: redo the <b>Concept Film</b> or grind the <b>Practice Arena</b> — then rematch at full power. The boss waits. ⚔️'],
  btn:'Back to the island',onGo:()=>goHub(w)});
}
