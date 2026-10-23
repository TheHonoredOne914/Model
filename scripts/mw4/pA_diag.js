<script>
'use strict';
/* ============================================================
   v7 · BASICS CHECK — pehle jaano Warrior ka level,
   phir uske hisaab se padhai. Adaptive boosters per world.
   ============================================================ */
document.head.insertAdjacentHTML('beforeend',`<style>
/* ---- basics report ---- */
.bcard{background:linear-gradient(160deg,#fff,#F2F7FB);border:1.5px solid #D6E2E6;border-radius:20px;padding:22px 24px;margin:18px 0;box-shadow:0 10px 30px rgba(4,29,61,.07);animation:rise .5s ease both}
.bcard h3{margin:0 0 4px;font-size:19px;font-weight:900;color:#041D3D;display:flex;align-items:center;gap:9px}
.bcard .bsub{font-size:13px;color:#517DAB;font-weight:600;margin-bottom:14px}
.meters{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}
.meter{background:#fff;border:1.5px solid #DCE5EE;border-radius:14px;padding:10px 12px}
.meter .mt{font-size:11px;font-weight:800;letter-spacing:.06em;color:#28517C;text-transform:uppercase}
.meter .mbar{height:7px;border-radius:99px;background:#E4EDF4;margin:7px 0 6px;overflow:hidden}
.meter .mfill{height:100%;border-radius:99px;transition:width .8s cubic-bezier(.2,.8,.2,1)}
.meter .mlab{font-size:12px;font-weight:800}
.lv-shaky{color:#B4552D}.lv-solid{color:#1D6E79}.lv-sharp{color:#0F6690}
.bpromo{display:flex;gap:14px;align-items:center;justify-content:space-between;flex-wrap:wrap}
.bpromo p{margin:0;font-size:13.5px;color:#28517C;font-weight:600;max-width:560px}
/* ---- booster band in world ---- */
.bband{display:flex;gap:12px;align-items:center;background:linear-gradient(120deg,#FDF3E3,#FBEDD2);border:1.5px solid #E9D3A8;border-radius:16px;padding:13px 16px;margin:16px 0;animation:rise .5s ease both}
.bband .bic{font-size:24px}
.bband b{color:#7A5A12;font-size:14.5px}
.bband p{margin:2px 0 0;font-size:12.5px;color:#8A6A25;font-weight:600}
/* ---- diag screen ---- */
.diagwrap{max-width:720px;margin:0 auto}
.dprog{height:10px;border-radius:99px;background:#E4EDF4;overflow:hidden;margin:14px 0 22px}
.dprog i{display:block;height:100%;background:linear-gradient(90deg,#28517C,#517DAB 60%,#E3AF3C);border-radius:99px;transition:width .45s cubic-bezier(.2,.8,.2,1)}
.dcount{font-size:12px;font-weight:800;letter-spacing:.14em;color:#517DAB;text-transform:uppercase}
.dq{background:#fff;border:1.5px solid #DCE5EE;border-radius:22px;padding:26px;box-shadow:0 14px 40px rgba(4,29,61,.08);animation:rise .45s ease both}
.dq .dq-kick{font-size:11px;font-weight:800;letter-spacing:.18em;color:#C08A2D;text-transform:uppercase}
.dq h2{margin:8px 0 4px;font-size:24px;font-weight:900;color:#041D3D}
.dq .dq-sub{color:#517DAB;font-size:13px;font-weight:600;margin-bottom:16px}
.dres{background:linear-gradient(165deg,#fff,#F2F7FB);border:1.5px solid #D6E2E6;border-radius:24px;padding:28px;animation:rise .5s ease both}
.dres h2{margin:4px 0 6px;font-size:26px;font-weight:900;color:#041D3D}
.dadv{background:#fff;border:1.5px solid #DCE5EE;border-radius:14px;padding:12px 15px;margin-top:10px;font-size:13.5px;color:#28517C;font-weight:600}
.dadv b{color:#041D3D}
/* ---- refresher block (lesson booster) ---- */
.boost{background:linear-gradient(150deg,#FDF6E7,#FCF0D8);border:1.5px dashed #E3C77E;border-radius:16px;padding:15px 17px;margin-top:14px;animation:rise .5s ease both}
.boost .bt{font-size:11px;font-weight:900;letter-spacing:.16em;color:#B8860B;text-transform:uppercase;margin-bottom:8px}
.boost li{margin:7px 0;font-size:13.5px;color:#5C4A16;font-weight:600;line-height:1.5}
.boost ul{margin:0;padding-left:18px}
</style>`);

/* ---------- strand map + levels ---------- */
const STRAND_MAP={num:'arith',poly:'alg',grid:'geo',line:'alg',euc:'geo',ang:'geo',tri:'geo',quad:'geo',circ:'geo',area:'geo',sol:'geo',dat:'dat',prob:'dat',seq:'alg'};
const STRAND_NAME={arith:'Arithmetic',alg:'Algebra',geo:'Geometry',dat:'Data & Chance'};
function diagLevel(n){return n<=1?'shaky':(n===2?'solid':'sharp')}
function strandOf(wid){return STRAND_MAP[wid]||null}
function weakStrands(){if(!S.diag)return[];return['arith','alg','geo','dat'].filter(s=>diagLevel(S.diag[s])==='shaky')}

/* ---------- the 12 basics questions ---------- */
const DIAG_QS=[
 {s:'arith',q:'3/4 + 1/4 = ?',opts:['1','1/2','1/8','3/8'],a:0,why:'Same denominators? Add the tops only: 3+1 = 4, so 4/4 = 1. Denominator (bottom) batata hai piece ka size — same size ke pieces hi seedha add hote hain.'},
 {s:'arith',q:'(−7) + 12 = ?',opts:['5','−5','19','−19'],a:0,why:'Number line pe −7 se 12 steps aage jao → 5. Bada sign winner ka: 12 positive hai aur bada, so answer positive 5.'},
 {s:'arith',q:'25% of 80 = ?',opts:['20','25','40','8'],a:0,why:'25% = 1/4 (quarter). 80 ke 4 hisse → 80 ÷ 4 = 20. Percentage matlab "per hundred" — 25/100 × 80 = 20.'},
 {s:'alg',q:'Simplify: 5x + 3x',opts:['8x','15x','8x²','5x³'],a:0,why:'5 apples + 3 apples = 8 apples. 5 x + 3 x = 8 x. Same cheez (x) ke counts juddte hain — powers multiply NAHI hote yahan.'},
 {s:'alg',q:'Solve: 2x = 14',opts:['x = 7','x = 12','x = 16','x = 28'],a:0,why:'Equation ek balance hai. x ko akela karne ke liye dono sides ko 2 se divide karo: 14 ÷ 2 = 7. Jo ek side pe karo, doosri side pe bhi — tabhi balance rehta hai.'},
 {s:'alg',q:'3² × 3¹ = ?',opts:['27','9','81','6'],a:0,why:'Same base — powers ADD hoti hain: 2+1 = 3, so 3³ = 27. (Agar multiply karke 9 socha toh dhyan se: 3²×3¹ means 9×3.)'},
 {s:'geo',q:'A triangle ke teeno angles ka sum = ?',opts:['180°','360°','90°','270°'],a:0,why:'Har triangle ka golden rule: teeno angles milke hamesha exactly 180° dete hain. Do angles pata ho toh teesra = 180 − (dono ka sum).'},
 {s:'geo',q:'Area of a 5 cm × 3 cm rectangle = ?',opts:['15 cm²','8 cm²','16 cm²','10 cm²'],a:0,why:'Rectangle ka area = length × breadth = 5 × 3 = 15 square cm. Area matlab andar ka surface kitni "unit squares" bharta hai.'},
 {s:'geo',q:'Point (3, −2) kis quadrant me baithta hai?',opts:['IV (x+, y−)','I (x+, y+)','II (x−, y+)','III (x−, y−)'],a:0,why:'x = 3 positive (right side), y = −2 negative (neeche). Right + neeche = Quadrant IV. Order yaad rakho: pehle x ki baari (chalein "x pehle, phir y").'},
 {s:'dat',q:'4, 8, 12 ka mean = ?',opts:['8','12','6','10'],a:0,why:'Mean = sab jodo, count se baanto: (4+8+12) ÷ 3 = 24 ÷ 3 = 8. Mean is the "equal-share" value — sabko barabar baanto toh har ko kya milta hai.'},
 {s:'dat',q:'2, 3, 3, 5, 7 ka mode = ?',opts:['3','4','5','7'],a:0,why:'Mode = sabse popular value (jo sabse zyada baar aaye). Yahan 3 do baar aaya, baaki sab ek baar → mode = 3. MOst Ontinuous = MOde!'},
 {s:'dat',q:'Ek fair coin me heads aane ka probability = ?',opts:['1/2','1','0','1/4'],a:0,why:'2 barabar outcomes (heads, tails) me se 1 favourable. P = favourable/total = 1/2. Probability hamesha 0 aur 1 ke beech rehti hai.'}
];

/* ---------- strand refreshers (adaptive booster content) ---------- */
const REFRESH={
 arith:{t:'Arithmetic refresher — the ground floor',li:['<b>Fractions:</b> same denominator → add tops (3/8+1/8=4/8). Different → pehle common denominator banao.','<b>Negatives:</b> number line pe left = minus. Minus × minus = plus; minus × plus = minus.','<b>%:</b> 25% = 1/4, 50% = 1/2, 10% = 1/10. "% of 80" means (25/100)×80.','<b>Order of operations:</b> Brackets → powers → × ÷ → + − (BODMAS).']},
 alg:{t:'Algebra refresher — x ke saath dosti',li:['<b>Like terms:</b> 5x+3x = 8x (same cheez count karo). 5x+3x² ko aage nahi badh sakte.','<b>Balance rule:</b> equation dono taraf barabar — jo ek side pe karo, doosri pe bhi.','<b>Solve 2x=14:</b> dono sides ÷ 2 → x=7. Solve x+3=9: dono sides − 3 → x=6.','<b>Powers:</b> x² means x·x. aᵐ·aⁿ = aᵐ⁺ⁿ (same base → powers add).']},
 geo:{t:'Geometry refresher — shapes ki bhasha',li:['<b>Triangle:</b> angles ka sum 180°. Equilateral = 60° each. Isosceles = 2 barabar sides + 2 barabar base angles.','<b>Area:</b> rectangle = l×b, triangle = ½×base×height, circle = πr².','<b>Coordinates:</b> (x, y) — x pehle (right+/left−), y baad me (up+/down−). 4 quadrants anticlockwise I→IV.','<b>Parallel lines:</b> kabhi nahi milti; transversal ke saath corresponding/alternate angles barabar bante hain.']},
 dat:{t:'Data & Chance refresher — numbers ka sabudana',li:['<b>Mean:</b> sab jodo ÷ count. <b>Median:</b> order me lagao, beech wala. <b>Mode:</b> sabse zyada baar wala.','<b>Probability</b> = favourable ÷ total outcomes. Range: 0 (impossible) se 1 (certain).','<b>One die:</b> P(any one face) = 1/6. <b>Coin:</b> P(heads) = 1/2.','<b>Frequency table:</b> tally marks se count; bar height = frequency.']}
};

/* ---------- HTML builders ---------- */
function meterHTML(s){
 const lvl=diagLevel(S.diag[s]);
 const col={shaky:'#C97B4A',solid:'#1D6E79',sharp:'#0F6690'}[lvl];
 const pct={shaky:33,solid:66,sharp:100}[lvl];
 return '<div class="meter"><div class="mt">'+STRAND_NAME[s]+'</div><div class="mbar"><div class="mfill" style="width:'+pct+'%;background:'+col+'"></div></div><div class="mlab lv-'+lvl+'">'+lvl.toUpperCase()+'</div></div>';
}
function basicsCardHTML(){
 if(!S.diag){
  return '<div class="bcard"><h3>🧭 Basics Check — hum pehle aapka level jaanenge</h3><div class="bsub">12 chhote questions · 2 minute · no marks, no judgement — sirf aapke liye</div><div class="bpromo"><p>Ek proper warrior apni talwar ka weight jaanta hai. Ye quick check batayega kaunsi floor strong hai (Arithmetic, Algebra, Geometry, Data) — uske hisaab se har lesson me basics refresher khud ON ho jayega.</p><button class="btn btn-p" onclick="A.diagStart()">🧭 Start Basics Check</button></div></div>';
 }
 const ws=weakStrands();
 const headline=ws.length===0?'Solid ground, Warrior! Har strand ready hai.':'Report ready — '+(ws.length===1?'one':ws.length)+' zone'+(ws.length>1?'s':'')+' needs refresher: humne boosters ON kar diye.';
 return '<div class="bcard"><h3>🧭 Your Warrior Report</h3><div class="bsub">'+headline+'</div><div class="meters">'+['arith','alg','geo','dat'].map(meterHTML).join('')+'</div>'
 +'<div style="margin-top:12px;display:flex;gap:10px;flex-wrap:wrap"><button class="btn btn-g btn-sm" onclick="A.diagRetake()">↻ Retake check</button><span class="muted" style="font-size:12px;align-self:center">Weak strands? Har lesson me basics refresher apne aap dikhega.</span></div></div>';
}
function basicsBandHTML(wid){
 const st=strandOf(wid);
 if(!st||!S.diag)return '';
 const lvl=diagLevel(S.diag[st]);
 if(lvl!=='shaky')return '';
 return '<div class="bband"><span class="bic">🧰</span><div><b>Basics Booster is ON for '+STRAND_NAME[st]+'</b><p>Aapke Basics Check me yeh strand thoda shaky nikla — is world ke har lesson me ground-floor refresher card milega. Ek baar basics pakka, phir yeh world aasan lagega.</p></div><button class="btn btn-g btn-sm" onclick="A.showRefresher(\''+st+'\')">Refresher dekho</button></div>';
}
function boosterHTML(wid){
 const st=strandOf(wid);
 if(!st||!S.diag||diagLevel(S.diag[st])!=='shaky')return '';
 const r=REFRESH[st];
 return '<div class="boost"><div class="bt">🧰 Basics Booster · '+r.t+'</div><ul>'+r.li.map(x=>'<li>'+x+'</li>').join('')+'</ul></div>';
}

/* ---------- diag flow ---------- */
let DSTATE=null;
function renderDiag(){
 if(!DSTATE){go('home');return}
 if(DSTATE.phase==='done'){App.innerHTML='<div class="screen diagwrap">'+diagResultHTML()+'</div>';return}
 const i=DSTATE.i,q=DIAG_QS[i];
 App.innerHTML='<div class="screen diagwrap">'
 +'<div class="backrow"><button class="btn btn-g btn-sm" onclick="A.diagSkip()">Skip for now →</button><span class="muted" style="font-size:12.5px">Basics Check · no marks, only insight</span></div>'
 +'<div class="dcount">Question '+(i+1)+' of '+DIAG_QS.length+' · '+STRAND_NAME[q.s]+'</div>'
 +'<div class="dprog"><i style="width:'+Math.round(i/DIAG_QS.length*100)+'%"></i></div>'
 +'<div class="dq"><span class="dq-kick">🧭 Basics Check</span><h2>'+q.q+'</h2><div class="dq-sub">Jawab soch ke do — galat bhi chalega, wahan se hi seekhna shuru hota hai</div>'
 +'<div class="opts">'+q.opts.map((o,k)=>'<button class="opt" style="animation-delay:'+(0.06+k*0.06)+'s" onclick="A.diagAns('+k+')"><span class="opt-l">'+'ABCD'[k]+'</span><span>'+o+'</span></button>').join('')+'</div>'
 +'<div id="dwhy"></div></div></div>';
}
function diagResultHTML(){
 const names={arith:'Arithmetic',alg:'Algebra',geo:'Geometry',dat:'Data & Chance'};
 const advice={arith:'Fractions, negatives aur percent — ye har chapter ki oxygen hain. Number Nagar se shuru karo, har lesson me refresher milega.',alg:'x wali duniya ka gate Algebra se khulta hai. Polynomial Kingdom + Line Land me booster ON hai.',geo:'Diagrams dost ban jayenge — Angle Realm aur Triangle Territory me ground-floor refresher ke saath shuru karo.',dat:'Data easy hai bas pattern samajh lo — Data Dungeon aur Chance Mansion me refresher ready hai.'};
 return '<div class="dres"><span class="dq-kick">🧭 WARRIOR REPORT READY</span><h2>Ab hum jaante hain: kahan se shuru karna hai</h2>'
 +'<div class="meters" style="margin:16px 0">'+['arith','alg','geo','dat'].map(meterHTML).join('')+'</div>'
 +weakStrands().map(s=>'<div class="dadv"><b>'+names[s]+' booster ON:</b> '+advice[s]+'</div>').join('')
 +(weakStrands().length===0?'<div class="dadv"><b>Ground strong hai!</b> Seedha koi bhi world chuno — sab unlocked hai. Bosses se darna mana hai.</div>':'')
 +'<div style="display:flex;gap:10px;margin-top:20px;flex-wrap:wrap"><button class="btn btn-p btn-xl" onclick="A.diagGo()">⚔️ Arena me enter karo</button><button class="btn btn-g" onclick="A.diagRetake()">↻ Retake</button></div></div>';
}
window.A_EXTRA=Object.assign({},window.A_EXTRA,{
 diagStart(){DSTATE={phase:'test',i:0,ans:[]};go('diag');SFX.click()},
 diagSkip(){DSTATE=null;go('home')},
 diagAns(k){
  if(!DSTATE||DSTATE.phase!=='test')return;
  const q=DIAG_QS[DSTATE.i],ok=k===q.a;
  DSTATE.ans.push({s:q.s,ok});
  const box=$('#dwhy');
  if(box){box.innerHTML='<div class="why" style="margin-top:14px"><b>'+(ok?'✓ Correct!':'Not quite — koi baat nahi.')+'</b> '+q.why+'</div><div style="margin-top:14px"><button class="btn btn-p" onclick="A.diagNext()">'+(DSTATE.i+1<DIAG_QS.length?'Next question →':'See my report →')+'</button></div>'}
  if(ok)SFX.ok();else SFX.no();
 },
 diagNext(){
  DSTATE.i++;
  if(DSTATE.i>=DIAG_QS.length){
   const sc={arith:0,alg:0,geo:0,dat:0};
   DSTATE.ans.forEach(a=>{if(a.ok)sc[a.s]++});
   S.diag=sc;S.booster={};save();DSTATE={phase:'done'};SFX.win();
   renderDiag();scrollTo(0,0);
  }else renderDiag();
 },
 diagRetake(){DSTATE={phase:'test',i:0,ans:[]};go('diag')},
 diagGo(){DSTATE=null;go('home')},
 showRefresher(s){
  const r=REFRESH[s];
  showOvl('<div class="introcard" style="text-align:left;max-width:560px"><div class="bt" style="font-size:11px;font-weight:900;letter-spacing:.16em;color:#B8860B;text-transform:uppercase;margin-bottom:6px">🧰 Basics Booster</div><h2>'+r.t+'</h2><ul style="margin:12px 0 18px;padding-left:20px">'+r.li.map(x=>'<li style="margin:9px 0;color:#28517C;font-weight:600;font-size:14px;line-height:1.55">'+x+'</li>').join('')+'</ul><div style="text-align:center"><button class="btn btn-p" onclick="A.ovlClose()">Samajh gaya ✓</button></div></div>',true);
 }
});
</script>
