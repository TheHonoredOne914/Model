<script>
'use strict';
/* ============================================================
   v7 · BOOK ZONE UI — textbook solved like a teacher:
   step-by-step reveal, Ask button (Hinglish + English) per step.
   ============================================================ */
document.head.insertAdjacentHTML('beforeend',`<style>
.bsrc{font-size:12px;font-weight:700;color:#517DAB;background:#EDF3F8;border:1px solid #D6E2E6;border-radius:99px;padding:6px 14px;display:inline-block;margin-bottom:14px}
.bset{font-size:11.5px;font-weight:900;letter-spacing:.14em;text-transform:uppercase;color:#7A5A12;margin:22px 0 10px;display:flex;align-items:center;gap:10px}
.bset:after{content:'';flex:1;height:1.5px;background:linear-gradient(90deg,#E9D3A8,transparent)}
.brow{display:flex;gap:14px;align-items:center;background:#fff;border:1.5px solid #DCE5EE;border-radius:16px;padding:13px 16px;margin-bottom:10px;transition:box-shadow .2s,transform .2s;animation:rise .45s ease both}
.brow:hover{box-shadow:0 8px 24px rgba(4,29,61,.1);transform:translateY(-1px)}
.brow .bnum{width:34px;height:34px;border-radius:11px;background:#EDF3F8;color:#28517C;font-weight:900;display:grid;place-items:center;font-size:14px;flex-shrink:0}
.brow.done .bnum{background:#1D6E79;color:#fff}
.bq{flex:1;min-width:0}
.bq .bt2{font-size:14.5px;font-weight:800;color:#17253C;display:block;line-height:1.4}
.bq .bsub2{font-size:12px;color:#517DAB;font-weight:600;display:block;margin-top:3px}
.bempty{background:#fff;border:1.5px dashed #C9D6E2;border-radius:18px;padding:26px;text-align:center;color:#517DAB;font-weight:600}
/* question player */
.bqwrap{max-width:780px;margin:0 auto}
.bqcard{background:#fff;border:1.5px solid #DCE5EE;border-radius:22px;padding:24px 26px;box-shadow:0 14px 40px rgba(4,29,61,.08)}
.bqcard .bsetchip{font-size:11px;font-weight:900;letter-spacing:.14em;text-transform:uppercase;color:#7A5A12;background:#FBF3DF;border-radius:99px;padding:5px 12px;display:inline-block}
.bqcard h2{font-size:20px;font-weight:900;color:#041D3D;line-height:1.45;margin:12px 0 4px}
.bwhy{background:linear-gradient(130deg,#F0F6FB,#EAF3F9);border-left:4px solid #517DAB;border-radius:0 12px 12px 0;padding:10px 14px;font-size:13.5px;color:#28517C;font-weight:600;margin:14px 0 4px}
.bsteps{margin-top:16px}
.bstep{display:flex;gap:14px;padding:14px 0;border-bottom:1px dashed #E2EAF2;animation:rise .4s ease both}
.bstep .rail{display:flex;flex-direction:column;align-items:center;flex-shrink:0}
.bstep .nd2{width:30px;height:30px;border-radius:10px;background:linear-gradient(140deg,#28517C,#517DAB);color:#fff;font-weight:900;font-size:13.5px;display:grid;place-items:center}
.bstep .ln2{width:2px;flex:1;background:#DCE5EE;margin-top:6px;min-height:10px}
.bmath{font-size:16.5px;font-weight:900;color:#041D3D;line-height:1.5}
.bhi{font-size:13.5px;color:#1D6E79;font-weight:700;margin-top:6px;line-height:1.55}
.bhi:before{content:'🗣️ ';font-size:12px}
.ben{font-size:12.5px;color:#517DAB;font-weight:600;margin-top:4px;line-height:1.5;padding-left:2px}
.ben:before{content:'✦ English: ';font-style:italic;opacity:.8}
.askrow{margin-top:8px}
.askbtn{font-size:11.5px;font-weight:900;letter-spacing:.06em;color:#7A5A12;background:#FBF3DF;border:1.5px solid #E9D3A8;border-radius:99px;padding:5px 13px;cursor:pointer;transition:all .2s}
.askbtn:hover{background:#F6E8C4;transform:translateY(-1px)}
.bans{background:linear-gradient(135deg,#EAF7F1,#E2F3EC);border:1.5px solid #9AD4BE;border-radius:16px;padding:14px 18px;margin-top:18px;animation:rise .45s ease both}
.bans .blab{font-size:10.5px;font-weight:900;letter-spacing:.18em;color:#0B5E44;text-transform:uppercase}
.bans .bval{font-size:19px;font-weight:900;color:#0B5E44;margin-top:3px}
.bctl{display:flex;gap:10px;margin-top:20px;flex-wrap:wrap;align-items:center}
.bprog{font-size:12px;font-weight:800;color:#517DAB;letter-spacing:.08em}
/* ask overlay content */
.askcard{text-align:left;max-width:600px}
.askcard .ak{font-size:10.5px;font-weight:900;letter-spacing:.2em;color:#C08A2D;text-transform:uppercase}
.askcard h3{font-size:20px;font-weight:900;color:#fff;margin:6px 0 14px}
.askctx{background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.14);border-radius:12px;padding:10px 14px;font-size:12.5px;color:#B9C8DC;font-weight:600;margin-bottom:12px}
.askhi{background:rgba(227,175,60,.12);border:1px solid rgba(227,175,60,.4);border-radius:14px;padding:13px 16px;margin-bottom:10px}
.askhi .lb{font-size:10px;font-weight:900;letter-spacing:.18em;color:#F2D57E;text-transform:uppercase;display:block;margin-bottom:5px}
.askhi p{margin:0;color:#FBEFD4;font-size:14.5px;font-weight:600;line-height:1.6}
.asken{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.16);border-radius:14px;padding:13px 16px}
.asken .lb{font-size:10px;font-weight:900;letter-spacing:.18em;color:#9FC3E8;text-transform:uppercase;display:block;margin-bottom:5px}
.asken p{margin:0;color:#EAF2FB;font-size:14px;font-weight:600;line-height:1.6}
</style>`);

/* ---------- list inside world view ---------- */
function bookListHTML(wid){
 const bk=BOOKZ[wid];
 if(!bk)return '<div class="bempty">📕 Book Zone for this world is being inked — check back after the next update. (Concepts, labs & practice are fully live above!)</div>';
 let n=0;bk.sets.forEach(s=>n+=s.qs.length);
 const done=Object.keys(S.book).filter(k=>k.startsWith(wid+':')).length;
 return '<div class="bsrc">📖 '+bk.src+' · '+n+' solved questions</div>'
 +bk.sets.map(st=>'<div class="bset">'+st.set+'</div>'
  +st.qs.map((q,qi)=>{
   const gi=bk.sets.slice(0,bk.sets.indexOf(st)).reduce((a,s2)=>a+s2.qs.length,0)+qi;
   const key=wid+':'+gi,ok=S.book[key];
   const prev=q.q.length>110?q.q.slice(0,110)+'…':q.q;
   return '<div class="brow'+(ok?' done':'')+'" style="animation-delay:'+(qi*0.05)+'s">'
   +'<span class="bnum">'+(ok?'✓':(gi+1))+'</span>'
   +'<span class="bq"><span class="bt2">'+prev+'</span><span class="bsub2">'+(q.steps?q.steps.length:0)+' teacher steps · Ask button on every step</span></span>'
   +'<button class="btn '+(ok?'btn-g':'btn-p')+' btn-sm" onclick="A.bookQ(\''+wid+'\','+gi+')">'+(ok?'Re-solve':'Solve it')+'</button>'
   +'</div>';
  }).join('')).join('')
 +(done?'<p class="muted" style="margin-top:10px;font-size:12.5px">✅ You have solved '+done+' of these, Warrior. Re-solving is free — revision is a weapon.</p>':'');
}

/* ---------- dedicated book screen ---------- */
function renderBook(wid){
 const w=worldById(wid),bk=BOOKZ[wid];
 if(!w||!bk){go('home');return}
 App.innerHTML='<div class="screen">'
 +'<div class="backrow"><button class="btn btn-g btn-sm" onclick="A.world(\''+wid+'\')">← '+w.n+'</button><span class="muted" style="font-size:12.5px">Book Zone</span></div>'
 +'<div class="whead"><div class="whead-in"><span class="wkick">📕 BOOK ZONE · SOLVED LIKE A TEACHER</span><h1>'+w.n+'</h1><p>'+bk.src+'</p></div></div>'
 +'<div class="blist">'+bookListHTML(wid)+'</div></div>';
}

/* ---------- question player ---------- */
let BQ=null;
function renderBookQ(wid,qi){
 const w=worldById(wid),bk=BOOKZ[wid];if(!w||!bk){go('home');return}
 let gi=0,q=null,set=null;
 for(const st of bk.sets){for(const qq of st.qs){if(gi===qi){q=qq;set=st;break}gi++}}
 if(!q){go('book',{wid});return}
 BQ={wid,qi,rev:(BQ&&BQ.wid===wid&&BQ.qi===qi)?BQ.rev:0,q,set};
 const steps=q.steps||[];
 const done=S.book[wid+':'+qi];
 const body='<div class="bqcard">'
 +'<span class="bsetchip">'+set.set+'</span>'
 +'<h2>'+q.q+'</h2>'
 +(q.why?'<div class="bwhy"><b>💡 Why it matters:</b> '+q.why+'</div>':'')
 +'<div class="bsteps">'+steps.slice(0,BQ.rev).map((s,i)=>stepHTML(s,i)).join('')+'</div>'
 +'<div class="bctl">'
 +(BQ.rev<steps.length
   ?'<button class="btn btn-p" onclick="A.bstep()">Teacher writes step '+(BQ.rev+1)+' →</button>'
   :(q.ans?'<div class="bans" style="flex:1"><span class="blab">✔ FINAL ANSWER</span><div class="bval">'+q.ans+'</div></div>':'')
  )
 +'</div>'
 +(BQ.rev>=steps.length
   ?'<div style="display:flex;gap:10px;margin-top:16px;flex-wrap:wrap">'+(done?'<span class="muted" style="font-size:12.5px;align-self:center">✓ Already in your solved collection</span>':'<button class="btn btn-gold" onclick="A.bdone()">🏅 Mark as solved · +8 XP</button>')+'<button class="btn btn-g" onclick="A.book(\''+wid+'\')">Back to Book Zone</button></div>'
   :'<div style="margin-top:14px"><button class="btn btn-g btn-sm" onclick="A.book(\''+wid+'\')">← Back</button> <span class="bprog">'+BQ.rev+'/'+steps.length+' steps revealed — answer ek hi baar me nahi, teacher ki tarah ek-ek karke</span></div>')
 +'</div>';
 App.innerHTML='<div class="screen bqwrap">'
 +'<div class="backrow"><button class="btn btn-g btn-sm" onclick="A.book(\''+wid+'\')">← Book Zone</button><span class="muted" style="font-size:12.5px">'+w.n+'</span></div>'
 +body+'</div>';
}
function stepHTML(s,i){
 return '<div class="bstep"><div class="rail"><span class="nd2">'+(i+1)+'</span>'+(i<99?'<span class="ln2"></span>':'')+'</div>'
 +'<div style="flex:1;min-width:0"><div class="bmath">'+s[0]+'</div>'
 +'<div class="bhi">'+s[1]+'</div>'
 +'<div class="ben">'+s[2]+'</div>'
 +'<div class="askrow"><button class="askbtn" onclick="A.bask('+i+')">🙋 Ask — yeh step kaise aaya?</button></div>'
 +'</div></div>';
}

/* ---------- actions ---------- */
window.A_EXTRA=Object.assign({},window.A_EXTRA,{
 book(wid){BQ=null;go('book',{wid})},
 bookQ(wid,qi){go('bookq',{wid,qi})},
 bstep(){
  if(!BQ)return;
  BQ.rev++;SFX.step();
  renderBookQ(BQ.wid,BQ.qi);
 },
 bask(i){
  if(!BQ)return;
  const q=BQ.q,steps=q.steps||[],s=steps[i];
  const prev=i>0?'<div class="askctx"><b>Pehle kya tha (step '+i+'):</b> '+steps[i-1][0]+'</div>':'<div class="askctx">Ye PEHLA step hai — yahin se solution shuru hota hai.</div>';
  showOvl('<div class="introcard askcard"><span class="ak">🙋 ASK THE TEACHER · STEP '+(i+1)+'/'+steps.length+'</span><h3>'+s[0]+'</h3>'
  +prev
  +'<div class="askhi"><span class="lb">Hinglish me samjho</span><p>'+s[1]+'</p></div>'
  +'<div class="asken"><span class="lb">In English</span><p>'+s[2]+'</p></div>'
  +'<div style="text-align:center;margin-top:16px"><button class="btn btn-p" onclick="A.ovlClose()">Clear ho gaya ✓</button></div>'
  +'</div>',true);
  SFX.click();
 },
 bdone(){
  if(!BQ)return;
  const key=BQ.wid+':'+BQ.qi;
  if(!S.book[key]){S.book[key]=1;save();addXP(8,'book question solved');burst(60)}
  renderBookQ(BQ.wid,BQ.qi);
 }
});
</script>
