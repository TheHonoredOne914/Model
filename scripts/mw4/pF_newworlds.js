<script>
'use strict';
/* ============================================================
   v7 · TWO NEW WORLDS — Chance Mansion (Probability, Book Ch 7)
   and Sequence Spires (Sequences, Book Ch 8) + their labs.
   Total = 14 worlds, as the syllabus demands.
   ============================================================ */
Object.assign(HUES,{
 prob:['#5B4B8A','#E7E3F2','#2E2456'],
 seq:['#1F6B54','#DFF2EA','#0C3A2C']
});

/* ---------- LAB 21 · DICE CASINO ---------- */
LABS.dicecasino=function(box,ctl,opts,api){
 const mode=opts.mode||'die';
 const faces=mode==='coin'?2:6;
 const labels=mode==='coin'?['Heads','Tails']:['1','2','3','4','5','6'];
 const theo=1/faces;
 let counts=new Array(faces).fill(0),rolls=0;
 box.innerHTML='';const s=makeSVG(520,300);box.appendChild(s);
 const g=s.appendChild(NS('g',{}));
 const info=readout(ctl,'');
 function draw(){
  g.innerHTML='';
  const W=520,H=300,pad=46,bw=Math.min(56,(W-2*pad)/faces-14);
  const max=Math.max(5,...counts);
  // axes
  g.appendChild(LN(pad,H-40,W-pad,H-40,{stroke:'#3f3c58','stroke-width':2}));
  const thY=H-40-(theo)*(H-110)/ (max/rolls>theo?max:Math.max(1,max));
  // theoretical line position: count corresponding to theo proportion of rolls
  const thCount=rolls*theo;
  const thPix=H-40-(thCount/max)*(H-110);
  if(rolls>0)g.appendChild(LN(pad,thPix,W-pad,thPix,{stroke:'#C08A2D','stroke-width':2,'stroke-dasharray':'6 4'}));
  if(rolls>0)g.appendChild(T(W-24,thPix-8,'fair share '+(theo*100).toFixed(1)+'%',{'font-size':11,fill:'#C08A2D','text-anchor':'end','font-weight':800}));
  for(let i=0;i<faces;i++){
   const x=pad+(i+0.5)*((W-2*pad)/faces);
   const h=rolls? (counts[i]/max)*(H-110):0;
   g.appendChild(NS('rect',{x:x-bw/2,y:H-40-h,width:bw,height:Math.max(h,2),rx:6,fill:i%2?'#28517C':'#517DAB',opacity:.9}));
   g.appendChild(T(x,H-22,labels[i],{'font-size':12,fill:'#26243a','font-weight':800}));
   g.appendChild(T(x,H-48-h,String(counts[i]),{'font-size':12,fill:'#041D3D','font-weight':900}));
  }
  const emp=rolls?counts.reduce((a,c,i)=>Math.abs(c/rolls-theo)<Math.abs(a-theo)?c/rolls:0,0):0;
  let msg=rolls===0?'Roll karo! Bars = counts. Dashed gold line = the "fair share" every face SHOULD have.':
   'After '+rolls+' roll'+(rolls>1?'s':'')+': each bar vs the gold line. Long run me experimental ≈ theoretical (Law of Large Numbers).';
  if(rolls>=25)msg+=' Notice the gap shrinking as rolls grow — that is convergence!';
  info.innerHTML=msg;
  api.touch();
 }
 function roll(n){
  for(let k=0;k<n;k++){counts[R(1,faces)-1]++;rolls++}
  SFX.click();draw();
 }
 addBtn(ctl,'🎲 Roll 1','btn-s',()=>roll(1));
 addBtn(ctl,'⚡ Roll 25','btn-s',()=>roll(25));
 addBtn(ctl,'↺ Reset','btn-g',()=>{counts=new Array(faces).fill(0);rolls=0;draw()});
 if(mode==='coin')box.insertAdjacentHTML('afterbegin','<div style="text-align:center;font-weight:800;color:#5B4B8A">🪙 Coin Tally — heads vs tails</div>');
 draw();
};

/* ---------- LAB 22 · SEQUENCE MACHINE ---------- */
LABS.seqmachine=function(box,ctl,opts,api){
 box.innerHTML='';const s=makeSVG(520,300);box.appendChild(s);
 const g=s.appendChild(NS('g',{}));
 const info=readout(ctl,'');
 let kind=opts.kind||'AP';
 let a=2,d=3,r=2,n=8;
 function terms(){
  const out=[];
  for(let i=1;i<=10;i++)out.push(kind==='AP'? a+(i-1)*d : a*Math.pow(r,i-1));
  return out;
 }
 function draw(){
  g.innerHTML='';
  const t=terms(),W=520,H=300,pad=52;
  const mx=Math.max(...t);
  // baseline
  g.appendChild(LN(pad,H-52,W-30,H-52,{stroke:'#3f3c58','stroke-width':2}));
  const step=(W-30-pad)/10;
  t.forEach((v,i)=>{
   const x=pad+step*(i+0.5),y=H-52-(v/mx)*(H-130);
   const on=(i+1)===n;
   g.appendChild(CR(x,y,on?15:9,{fill:on?'#E3AF3C':(kind==='AP'?'#28517C':'#1F6B54'),opacity:on?1:.85,stroke:on?'#7A5A12':'none','stroke-width':2}));
   g.appendChild(T(x,H-36,'t'+(i+1),{'font-size':11,fill:'#517DAB','font-weight':700}));
   g.appendChild(T(x,y-22,on?String(v):'',{'font-size':14,fill:'#7A5A12','font-weight':900}));
  });
  const formula=kind==='AP'? ('tn = '+a+' + (n−1)×'+d+' = '+a+' + '+(a-0)+'+(n−1)·'+d) : ('tn = '+a+'×'+r+'^(n−1)');
  const val=kind==='AP'? a+(n-1)*d : a*Math.pow(r,n-1);
  g.appendChild(T(W/2,34,kind+' · t'+n+' = '+val,{'font-size':16,fill:'#041D3D','font-weight':900}));
  g.appendChild(T(W/2,56,formula,{'font-size':12.5,fill:'#517DAB','font-weight':700}));
  info.innerHTML=(kind==='AP'? 'AP: har term me '+d+' JUDD raha hai (constant difference). Growth seedhi line me.':'GP: har term ko '+r+' se MULTIPLY ho raha hai (constant ratio). Growth curve me — explosion!');
  api.touch();
 }
 addTabs(ctl,['AP · adding','GP · multiplying'],0,i=>{kind=i===0?'AP':'GP';draw()});
 addSlider(ctl,'first term a',1,10,a,1,v=>{a=v;draw()});
 if(true)addSlider(ctl,'step d (AP)',1,9,d,1,v=>{d=v;draw()});
 addSlider(ctl,'ratio r (GP)',2,4,r,1,v=>{r=v;draw()});
 addSlider(ctl,'pick term n',1,10,n,1,v=>{n=v;draw()});
 draw();
};

/* ---------- NEW WORLD 13 · CHANCE MANSION ---------- */
WORLDS.push(
{id:'prob',n:'Chance Mansion',ch:'Book Ch 7 · Probability (The Mathematics of Maybe)',ic:'🎲',
 tag:'Where "maybe" gets a number. Snakes & Ladders, cricket tosses, card tricks — every maybe has a maths.',
 boss:{n:'LUCKYLICH',ti:'Keeper of Odds',taunt:'You feel lucky, Warrior? My dice never lie — they only follow the maths you have not learned yet!',art:'crystal'},
 concepts:[
  {id:'prob1',t:'What Are the Chances?',sub:'Empirical vs theoretical probability',
   irl:['Weather app "80% rain" = probability from past data (empirical). Batting order ka toss = fair 50-50 (theoretical)','Snakes & Ladders: chaar 6 lagane ke baad bhi P(6) = 1/6 hi rehta hai — die ko memory nahi hoti (Gambler\'s Fallacy!)'],
   hook:{ic:'🎲',s:'Gaming night: Riya tosses the coin for batting — and gets HEADS seven times in a row! "Ab toh tails pakka!" shouts her brother. Their Dadi, chess champion of the colony, smiles: "The coin has no memory, beta. Har toss fresh hai." Then she rolls a six on demand... because she knows exactly what the odds were all along.',
         w:'Probability assigns a NUMBER to "maybe". Ek baar samajh gaye, toh games, weather, insurance, cricket DRS — sab ka hidden score-pad dikhne lagta hai.'},
   facts:[['P = favourable ÷ total','P(event) = (outcomes that count) ÷ (ALL equally likely outcomes). Range hamesha 0 se 1: 0 = impossible, 1 = certain.'],
          ['Theoretical vs empirical','Theoretical = pure counting on fair assumptions (P(heads) = 1/2). Empirical = ACTUAL trials (13 heads in 20 tosses = 0.65). Dono different ho sakte hain.'],
          ['Law of Large Numbers','Trials badhao → experimental probability theoretical ke paas converge karti hai. 10 tosses me bias dikhta hai, 10,000 me nahi.'],
          ['Events have no memory','Independent events: past results ka agle result pe ZERO asar. "6 teen baar aa gaya, ab nahi aayega" — Gambler\'s Fallacy, maths galat hai.']],
   lab:['dicecasino',{mode:'die'}],
   tasks:['Roll 25 twice and find the face farthest from the gold line','Roll until some face crosses the fair-share line — count the rolls it took','Reset, then check: does the SAME face win again? (Randomness!)'],
   ex:{t:'In 20 tosses Riya got 13 heads. What is the empirical probability of heads, and why is it not 1/2?',
       steps:[['Empirical P = favourable trials ÷ total trials','Experimental probability ACTUAL data se aati hai: 13/20.','Empirical P(heads) = 13/20.'],
              ['13/20 = 0.65 = 65%','Simple division: 13 ÷ 20 = 0.65.','13/20 = 0.65.'],
              ['Theoretical is still 1/2 = 0.5','Fair coin ASSUME karke theoretical 1/2 hai. Actual run me 0.65 aaya — chhote sample me gap normal hai.','Theoretical P stays 1/2 — the gap is normal sampling variation.'],
              ['More trials → closer to 0.5','1000 tosses karo — percentage 50% ke aas-paas settle hogi. Law of Large Numbers in action.','With many more tosses the empirical value drifts toward 0.5.']]},
   gen(){
    const t=R(1,3);
    if(t===1){
     const f=pick(['heads','tails']);
     return Q('A fair coin is tossed once. P('+f+') = ?','1/2',['1/4','1','0'],'2 equally likely outcomes, 1 favourable.','P = favourable ÷ total = 1/2.');
    }
    if(t===2){
     const n=R(1,6);
     return Q('A fair die is rolled once. P(getting '+n+') = ?','1/6',['1/2','1/3','1/4'],'6 equally likely faces, 1 favourable — 1/6.','Count: 1 favourable out of 6.');
    }
    const got=R(7,16),tot=20;
    return Q('A coin lands heads '+got+' times in '+tot+' tosses. The empirical probability of heads is…',got+'/'+tot,[ (tot-got)+'/'+tot,'1/2','1/5'],'Empirical = actual heads ÷ total tosses = '+got+'/'+tot+'. (Theoretical 1/2 se different ho sakta hai!)','Empirical uses ACTUAL trial data, not fair assumptions.');
   }},
  {id:'prob2',t:'Sample Spaces & Events',sub:'Listing outcomes like a bookkeeper',
   irl:['Menu combos: 3 snacks × 2 drinks = 6 choices — restaurant, uniform, seat+meal sab me counting rules chalti hain','Cricket analyst: two-dice run predictions, over-by-over outcome tables — sample space sabse pehle banta hai'],
   hook:{ic:'📋',s:'The village fair snack stall: Samosa, Pakora, Bhaji — and Chai or Lassi to drink. Little Kabir wants to count EVERY possible snack-and-drink combo before choosing. His aunt laughs: "Bas 6 hain, page likhna band kar." But Kabir draws a table — and realises the TABLE is the secret weapon of probability.',
         w:'Sample space likhna = poora game board dekh lena. Har probability usi table ke upar banti hai — count karna aata hai toh P nikalna minutes ka kaam hai.'},
   facts:[['Sample space S = ALL outcomes','Experiment ke har possible result ki list. Die: {1..6}. Coin: {H, T}. Do coins: {HH, HT, TH, TT} — 4 outcomes.'],
          ['Counting rule: multiply stages','Die + coin = 6 × 2 = 12 outcomes. 2 shirts × 3 pants = 6 outfits. Har stage ke options MULTIPLY hote hain.'],
          ['Event = S ka subset','"Odd number" event = {1, 3, 5} — sample space ke selected members. P(event) = size of subset ÷ size of S.'],
          ['Tree diagrams tame multi-step chaos','Har branch = ek choice. Paths start-to-end = complete outcomes. Probabilities branches pe multiply, different paths pe add.']],
   lab:['seqmachine',{kind:'AP'}],
   tasks:['List S for a die and a coin tossed together (12 outcomes!)','Pick an event of 3 outcomes and compute its probability'],
   ex:{t:'A die is rolled and a coin tossed. Find |S| and P(die shows 6 AND coin shows heads).',
       steps:[['Two stages: 6 × 2 = 12 outcomes','Die 6 ways, coin 2 ways — multiply: 12 equally likely pairs.','|S| = 6 × 2 = 12.'],
              ['Favourable: only (6, H)','Ek hi pair match karta hai: die 6 aur heads.','Exactly 1 favourable outcome: (6, H).'],
              ['P = 1/12','1 ÷ 12. (Shortcut check: 1/6 × 1/2 = 1/12 — independent events multiply!)','P = 1/12 — and indeed (1/6)(1/2) = 1/12.']]},
   gen(){
    const t=R(1,3);
    if(t===1){
     return Q('A die is rolled and a coin is tossed together. How many outcomes are in the sample space?','12',['8','6','36'],'Stages multiply: 6 × 2 = 12.','Multiply options at each stage.');
    }
    if(t===2){
     return Q('Two coins are tossed together. How many outcomes are in the sample space?','4',['2','3','8'],'HH, HT, TH, TT — 2 × 2 = 4. (Note: HT and TH are DIFFERENT paths!)','2 stages × 2 outcomes each = 4 paths.');
    }
    return Q('From a bag with 3 red and 5 blue balls, one is drawn. P(red) = ?','3/8',['5/8','1/2','3/5'],'Total 8 balls, 3 red → 3/8.','Favourable ÷ total = 3/8.');
   }},
  {id:'prob3',t:'Complement & the 0–1 Range',sub:'P(not A) = 1 − P(A)',
   irl:['"Kal barish hogi ya nahi" — dono cases ka sum 1 hota hai. Insurance premiums exactly is math pe bante hain','Match jeetne ka chance 2/7 hai toh haare ka 5/7 — commentators yehi boltе hain'],
   hook:{ic:'🪞',s:'Archery range: Arjun ka bullseye probability 0.15 hai. Uski didi poochti hain: "Toh MISS hone ka chance?" Arjun calculates: 1 − 0.15 = 0.85. "Miss hi zyada likely hai, didi!" Didi giggle karti hain — but Arjun ne complement ka master trick pakad liya hai: jo nahi hua, wo 1 minus jo hua.',
         w:'"NOT" events ka shortcut 99% cases me time bachata hai — direct counting painful ho toh complement ek second me answer deta hai.'},
   facts:[['P(not A) = 1 − P(A)','A aur not-A milke POORA sample space dhak dete hain. Sum hamesha 1.','A + complement = 1.'],
          ['P = 0 means impossible','"Die pe 7 aana" — koi outcome match nahi karta → P = 0.','An event with no favourable outcomes has probability 0.'],
          ['P = 1 means certain','"Die pe 9 se kam number" — har outcome satisfy → P = 1.','An event covering the whole sample space has probability 1.'],
          ['Probabilities NEVER leave [0, 1]','Negative probability ya 1.5 jaise numbers maths me exist hi nahi karte. Agar nikle — calculation me galti hai!','0 ≤ P ≤ 1, always.']],
   lab:['dicecasino',{mode:'coin'}],
   tasks:['Roll the coin tally and check heads% + tails% stays 100%','Find P(not 6) on a die using the complement (5/6)'],
   ex:{t:'A bag has 3 red, 2 blue, 1 green ball. One is drawn. Find P(not red).',
       steps:[['Total = 6 balls','3 + 2 + 1 = 6 equally likely draws.','Total outcomes = 6.'],
              ['P(red) = 3/6 = 1/2','Direct: 3 red out of 6.','P(red) = 3/6 = 1/2.'],
              ['P(not red) = 1 − 1/2 = 1/2','Complement rule — instant! (Direct bhi: blue + green = 3/6.)','P(not red) = 1 − 1/2 = 1/2.'],
              ['Bonus: P(not green) = 1 − 1/6 = 5/6','Same trick har "not" event pe chalta hai.','Complement works for any "not" question.']]},
   gen(){
    const t=R(1,3);
    if(t===1){
     const red=R(2,5),blue=R(2,5);
     return Q('A bag has '+red+' red and '+blue+' blue balls. One is drawn. P(NOT red) = ?',blue+'/'+(red+blue),[red+'/'+(red+blue),'1/2','1/'+(red+blue)],'P(red) = '+red+'/'+(red+blue)+', so P(not red) = 1 − that = '+blue+'/'+(red+blue)+'.','Complement: 1 − P(red).');
    }
    if(t===2){
     return Q('A die is rolled once. P(a number less than 10) = ?','1',['5/6','0','1/6'],'Max face is 6 — EVERY outcome is < 10 → certain event.','All outcomes qualify → P = 1.');
    }
    return Q('A die is rolled once. P(a number greater than 6) = ?','0',['1/6','1/2','1'],'Impossible event — no face exceeds 6.','No favourable outcomes → P = 0.');
   }}
 ]},
/* ---------- NEW WORLD 14 · SEQUENCE SPIRES ---------- */
{id:'seq',n:'Sequence Spires',ch:'Book Ch 8 · Sequences & Progressions',ic:'♾️',
 tag:'Predicting what comes next — patterns from chai stalls to Sierpiński fractals.',
 boss:{n:'THE INFINITE',ti:'Pattern Serpent',taunt:'Each scale on my body follows the last, Warrior. Predict me… if you dare to think in patterns!',art:'ring'},
 concepts:[
  {id:'seq1',t:'Patterns All Around',sub:'Sequences & the language of terms',
   irl:['Staircase steps, calendar dates, chai stall token numbers — life sequences me bhara hai','Stadium seat rows, parking bays, EMI schedule numbers — sab indexed lists hain (t1, t2, t3…)'],
   hook:{ic:'🪜',s:'The chai stall keeps tokens: 1, 2, 3, 4… easy. But the kolam rangoli outside grows: 3 dots, 5 dots, 7 dots each ring. Little Meera squints: "Har ring me 2 extra!" She has just READ a pattern — the first superpower of Sequence Spires. Her brother bets she cannot guess ring 100. She smiles: "199 dots. Seedha formula se."',
         w:'Sequence = numbered list (t1, t2, t3…). Pattern pakadna = future predict karna. Maths, coding, science — sab me yahi hota hai.'},
   facts:[['A sequence is an ordered list','t1, t2, t3, … — position matters! {3,5,7} ≠ {5,3,7}. Subscript n = position ka address.'],
          ['Terms follow a RULE','Har sequence ke peeche ek rule chhupa hai — "add 2", "double it", "multiply by previous + 1". Rule mil gaya toh ANY term mil sakta hai.'],
          ['t_n means the nth term','t1 = pehla, t5 = paanchwa, t100 = sauwa. Rule likhne ke baad t100 ka jawab seconds me.'],
          ['Guess-check-verify','Pattern pakdo → next term predict karo → verify karo. Ye scientific method ka maths version hai.']],
   lab:['seqmachine',{kind:'AP'}],
   tasks:['Spot the rule of 3, 5, 7, 9… and predict t10 (answer: 21)','Switch to GP mode and watch adding become exploding'],
   ex:{t:'Find the next three terms of: 3, 5, 7, 9, …',
       steps:[['Differences: 5−3 = 2, 7−5 = 2, 9−7 = 2','Har step me +2 — constant difference!','The pattern adds 2 each time.'],
              ['Next: 11, 13, 15','9 + 2 = 11, 11 + 2 = 13, 13 + 2 = 15.','Next three: 11, 13, 15.'],
              ['Bonus rule: tn = 2n + 1','Check: t1 = 3 ✓, t2 = 5 ✓ — formula mil gaya. t100 = 201!','tn = 2n + 1 (verify with the given terms).']]},
   gen(){
    const starts=[[3,2],[10,4],[7,5],[2,6],[50,3],[1,7]];
    const [a0,d0]=pick(starts);
    const seq=[a0,a0+d0,a0+2*d0].join(', ');
    return Q('Find the next term of: '+seq+', …',String(a0+3*d0),[String(a0+4*d0),String(a0+2*d0),String(a0+3*d0+d0+1)],'Constant difference '+d0+' — add it again to the last term: '+(a0+2*d0)+' + '+d0+' = '+(a0+3*d0)+'.','Find the constant difference, then add once more.');
   }},
  {id:'seq2',t:'Arithmetic Progressions',sub:'a, d, and tn = a + (n−1)d',
   irl:['Taxi fare: ₹200 fixed + ₹40/km = AP 240, 280, 320… (book ka exact example!)','Gym membership renewal, salary increments ₹2000/half-year, staircase heights — constant step = AP'],
   hook:{ic:'🚕',s:'Taxi meter story from the book: booking ₹200, then ₹40 per km. 1 km → ₹240, 2 km → ₹280, 3 km → ₹320. "Ye toh wahi rangoli pattern hai!" bolti Meera — "2 ki jagah 40 badh raha hai." Papa calculate karte hain 10 km ka fare bina meter dekhe: ₹600. AP ne paise bacha diye.',
         w:'AP = constant JUDDNE wala pattern. Formula tn = a + (n−1)d kisi bhi term ko seedha nikaal deta hai — counting ke bina t1000 bhi.'},
   facts:[['AP = constant difference d','Har term me SAME amount judta hai. d = t2 − t1 = t3 − t2 = … (always check 2 gaps!).'],
          ['tn = a + (n−1)d','a = first term, d = step. t1 = a, t2 = a + d, … t_n = a + (n−1)d. "(n−1) jumps of d" — yahi geometry hai.'],
          ['Recursive rule: t1 = a, tn = tn−1 + d','Ek-ek karke aage badhna. Explicit formula se fast, recursive se intuitive.'],
          ['Real model: fixed + rate×n','Taxi: 200 + 40n. Savings: 500 + 150n. "Fixed fee + per-unit charge" = AP in disguise.']],
   lab:['seqmachine',{kind:'AP'}],
   tasks:['Set a = 5, d = 4 and check t6 = 25 by hand','Find which term equals 100 for a = 4, d = 6'],
   ex:{t:'Find the 31st term of an AP whose 11th term is 38 and 16th term is 73.',
       steps:[['Equations: a + 10d = 38, a + 15d = 73','t_n = a + (n−1)d — dono terms ko equation me likho.','Write both as a + (n−1)d.'],
              ['Subtract: 5d = 35 → d = 7','Equations minus karo — a cancel, d mil gaya.','Subtracting: 5d = 35, so d = 7.'],
              ['a = 38 − 10×7 = −32','Back-substitute: a + 70 = 38.','Then a = −32.'],
              ['t31 = −32 + 30×7 = 178','31st term = a + 30d = −32 + 210 = 178.','t31 = 178.']]},
   gen(){
    const t=R(1,2);
    if(t===1){
     const a0=R(2,9),d0=R(2,8),n=R(8,15);
     return Q('In the AP with first term '+a0+' and common difference '+d0+', the '+n+'th term is…',String(a0+(n-1)*d0),[String(a0+n*d0),String(a0+(n-2)*d0),String(a0+(n-1)*(d0+1))],'t'+n+' = a + (n−1)d = '+a0+' + '+(n-1)+'×'+d0+' = '+(a0+(n-1)*d0)+'.','t_n = a + (n−1)d — (n−1) jumps of size d.');
    }
    const a0=R(2,8),d0=R(2,6),target=a0+R(5,12)*d0;
    const n=(target-a0)/d0+1;
    return Q('Which term of the AP '+a0+', '+(a0+d0)+', '+(a0+2*d0)+', … is '+target+'?','t'+n,['t'+(n+1),'t'+(n-1),'t'+(n+2)],'Solve a + (n−1)d = '+target+': (n−1) = ('+(target)+'−'+a0+')/'+d0+' = '+(n-1)+' → n = '+n+'.','Set tn = target and solve for n.');
   }},
  {id:'seq3',t:'Geometric Progressions',sub:'a, r, and tn = a·r^(n−1)',
   irl:['Bacteria doubling (book ka example): 30 → 60 → 120 → … = 30·2ⁿ','Population growth, compound interest, viral video shares, Sierpiński fractal triangles — multiply-style growth = GP'],
   hook:{ic:'🦠',s:'Science lab: 30 bacteria rakh diye. Ek ghante me DOUBLE — 60. Phir 120, 240… Do din baad teacher ne whiteboard pe likha: 30 × 2⁴⁸. Class hansi, phir chup — number itna BADA tha ki poore earth se zyada! "Yehi hai multiplying power," teacher boli. "Adding linear hai, multiplying EXPONENTIAL."',
         w:'GP = constant MULTIPLY wala pattern (ratio r). Doubling, halving, tripling — GP hi hai. Fractals aur finance dono yahin milte hain.'},
   facts:[['GP = constant ratio r','Har term ko pichle se MULTIPLY kiya gaya. r = t2/t1 = t3/t2 (do ratios check karo).'],
          ['tn = a·r^(n−1)','a = first term, r = multiplier. t8 = a·r⁷ — seven jumps of multiplication.'],
          ['r = 2 → doubling explosion','2ⁿ bahut tez badhta hai: 2¹⁰ ≈ 1000, 2²⁰ ≈ 10 lakh, 2³⁰ = 100 crore ke aas paas!'],
          ['r < 1 → shrinking GP','Bounce ball 60% tak hi uthta hai: heights 80, 48, 28.8… — GP with r = 0.6. Area of fractal also SHRINKS.']],
   lab:['seqmachine',{kind:'GP'}],
   tasks:['Set a = 3, r = 2 and watch t10 (multiply, don\'t add!)','Compare AP d = 2 vs GP r = 2 at t8 — kiski value zyada?'],
   ex:{t:'The bacteria count starts at 30 and doubles every hour. Find the count after 2 h, 4 h and n hours.',
       steps:[['It\'s a GP: 30, 60, 120, … with r = 2','Doubling = ×2 each hour — geometric progression.','Counts form a GP with first term 30 and ratio 2.'],
              ['2 h: 30 × 2² = 120','Do doublings: ×4.','After 2 hours: 120.'],
              ['4 h: 30 × 2⁴ = 480','Chaar doublings: ×16.','After 4 hours: 480.'],
              ['n h: 30 × 2ⁿ','General: after n hours, n multiplications of 2 → 30·2ⁿ.','After n hours: 30·2ⁿ.']]},
   gen(){
    const t=R(1,3);
    if(t===1){
     const a0=pick([2,3,5]),r0=pick([2,3]);
     return Q('Find the next term of the GP: '+a0+', '+(a0*r0)+', '+(a0*r0*r0)+', …',String(a0*r0*r0*r0),[String(a0*r0*r0+r0),String(a0*r0*r0*r0*r0),String(a0*r0*r0+ a0*r0)],'Ratio = '+r0+' (constant). Multiply: '+(a0*r0*r0)+' × '+r0+' = '+(a0*r0*r0*r0)+'.','Divide consecutive terms to find r, then multiply again.');
    }
    if(t===2){
     return Q('Bacteria double every hour, starting from 50. After 3 hours the count is…','400',['150','200','350'],'GP: 50 × 2³ = 400.','50·2ⁿ after n hours.');
    }
    const a0=R(2,6),r0=2,n=R(6,9);
    return Q('In the GP with a = '+a0+' and r = 2, the '+n+'th term is…',String(a0*Math.pow(2,n-1)),[String(a0*Math.pow(2,n)),String(a0*(n-1)*2),String(a0*Math.pow(2,n-2))],'t'+n+' = a·r^(n−1) = '+a0+' × 2^'+(n-1)+' = '+(a0*Math.pow(2,n-1))+'.','t_n = a·r^(n−1).');
   }}
 ]}
);
</script>
