<script>
'use strict';
/* ================= LAB ENGINES · part 1 ================= */
const LABS={};
const SVGNS='http://www.w3.org/2000/svg';
function NS(t,at){const e=document.createElementNS(SVGNS,t);for(const k in at)e.setAttribute(k,at[k]);return e}
function makeSVG(w,h){const s=NS('svg',{viewBox:'0 0 '+w+' '+h,width:'100%'});s.style.maxWidth=w+'px';return s}
function T(x,y,str,at){const t=NS('text',Object.assign({x:x,y:y,fill:'#26243a','font-size':13,'font-weight':700,'font-family':'Outfit,Inter,sans-serif','text-anchor':'middle'},at||{}));t.textContent=str;return t}
function LN(x1,y1,x2,y2,st){return NS('line',Object.assign({x1:x1,y1:y1,x2:x2,y2:y2,stroke:'#3f3c58','stroke-width':2,'stroke-linecap':'round'},st||{}))}
function RC(x,y,w,h,st){return NS('rect',Object.assign({x:x,y:y,width:w,height:h},st||{}))}
function CR(cx,cy,r,st){return NS('circle',Object.assign({cx:cx,cy:cy,r:r},st||{}))}
function PT(d,st){return NS('path',Object.assign({d:d,fill:'none',stroke:'#3f3c58','stroke-width':2.2,'stroke-linecap':'round'},st||{}))}
function ARC(cx,cy,r,a1,a2,st){const x1=cx+r*Math.cos(a1*Math.PI/180),y1=cy-r*Math.sin(a1*Math.PI/180),x2=cx+r*Math.cos(a2*Math.PI/180),y2=cy-r*Math.sin(a2*Math.PI/180);const large=(Math.abs(a2-a1)>180)?1:0;return PT('M '+x1+' '+y1+' A '+r+' '+r+' 0 '+large+' '+(a1>a2?1:0)+' '+x2+' '+y2,st||{})}
function svgPoint(svg,ev){const r=svg.getBoundingClientRect();const vb=svg.viewBox.baseVal;return{x:(ev.clientX-r.left)/r.width*vb.width,y:(ev.clientY-r.top)/r.height*vb.height}}
function makeDrag(svg,node,onmove){
 node.style.cursor='grab';
 node.addEventListener('pointerdown',e=>{
  e.preventDefault();node.setPointerCapture&&node.setPointerCapture(e.pointerId);
  const mv=ev=>onmove(svgPoint(svg,ev));
  const up=()=>{removeEventListener('pointermove',mv);removeEventListener('pointerup',up)};
  addEventListener('pointermove',mv);addEventListener('pointerup',up);
 });
}
function addSlider(ctl,label,min,max,val,step,onin,fmtFn){
 const row=document.createElement('div');row.className='ctlrow';
 row.innerHTML='<span class="slab">'+label+' <span class="val"></span></span>';
 const inp=document.createElement('input');inp.type='range';inp.min=min;inp.max=max;inp.step=step||1;inp.value=val;
 row.appendChild(inp);ctl.appendChild(row);
 const valEl=row.querySelector('.val');
 const upd=()=>{valEl.textContent=fmtFn?fmtFn(+inp.value):inp.value};
 upd();
 inp.addEventListener('input',()=>{upd();onin(+inp.value)});
 return inp;
}
function addTabs(ctl,names,active,onpick){
 const t=document.createElement('div');t.className='tabs';
 names.forEach((n,i)=>{const b=document.createElement('button');b.className='tab'+(i===active?' on':'');b.textContent=n;
  b.addEventListener('click',()=>{t.querySelectorAll('.tab').forEach(x=>x.classList.remove('on'));b.classList.add('on');onpick(i)});
  t.appendChild(b)});
 ctl.appendChild(t);return t;
}
function addBtn(ctl,label,cls,fn){
 const b=document.createElement('button');b.className='btn btn-sm '+(cls||'btn-s');b.textContent=label;
 b.addEventListener('click',fn);ctl.appendChild(b);return b;
}
function readout(ctl,html){
 let r=ctl.querySelector('.readout');
 if(!r){r=document.createElement('div');r.className='readout';ctl.appendChild(r)}
 r.innerHTML=html;return r;
}

/* ---------- 1. NUMBER LINE ---------- */
LABS.numline=function(box,ctl,opts,api){
 box.innerHTML='';const s=makeSVG(700,150);box.appendChild(s);
 const X0=70,DX=56,XMAX=640,Y=78;
 s.appendChild(LN(X0-20,Y,XMAX+20,Y,{stroke:'#26243a','stroke-width':2.5}));
 for(let i=-5;i<=5;i++){const x=X0+(i+5)*DX;
  s.appendChild(LN(x,Y-6,x,Y+6,{stroke:'#26243a'}));
  s.appendChild(T(x,Y+22,String(i),{'font-size':12,fill:'#6d6a85'}));
 }
 const g=s.appendChild(NS('g',{}));
 const pin=CR(X0+2.5*DX,Y,9,{fill:'#f97316',stroke:'#c2410c','stroke-width':2.5,style:'cursor:grab;filter:drop-shadow(0 3px 6px rgba(249,115,22,.5))'});
 g.appendChild(pin);
 const pinlab=T(X0+2.5*DX,Y-24,'2.5',{'font-size':13,fill:'#c2410c'});
 g.appendChild(pinlab);
 let pinv=2.5;
 const setPin=v=>{pinv=clamp(v,-5,5);const x=X0+(pinv+5)*DX;pin.setAttribute('cx',x);pinlab.setAttribute('x',x);pinlab.textContent=fmt(pinv);api.touch()};
 makeDrag(s,pin,pt=>setPin((pt.x-X0)/DX-5));
 const special=[[Math.sqrt(2),'√2'],[Math.sqrt(3),'√3'],[Math.PI,'π'],[Math.sqrt(5),'√5'],[Math.sqrt(7),'√7']];
 const irrg=s.appendChild(NS('g',{}));
 special.forEach(([v,nm])=>{const x=X0+(v+5)*DX;if(x>XMAX)return;
  irrg.appendChild(NS('path',{d:'M '+x+' '+(Y-14)+' l 5 -9 l 5 9 z',fill:'#7c3aed'}));
  irrg.appendChild(T(x,Y-30,nm,{'font-size':10,fill:'#7c3aed'}));
 });
 irrg.style.opacity=0;
 const chips=document.createElement('div');chips.className='tabs';ctl.appendChild(chips);
 const fams=[['N Naturals',v=>v>=1&&Number.isInteger(v),'#059669'],
  ['W Wholes',v=>v>=0&&Number.isInteger(v),'#0284c7'],
  ['Z Integers',v=>Number.isInteger(v),'#7c3aed'],
  ['Q Rationals',v=>true,'#d97706'],
  ['Irrationals',v=>special.some(([sv])=>Math.abs(sv-v)<0.005),'#be185d'],
  ['R Reals',v=>true,'#3f3c58']];
 let marks=[];
 fams.forEach((f,i)=>{const b=document.createElement('button');b.className='tab';b.textContent=f[0];
  b.addEventListener('click',()=>{chips.querySelectorAll('.tab').forEach(x=>x.classList.remove('on'));b.classList.add('on');show(f);api.touch()});
  chips.appendChild(b)});
 function show(f){
  marks.forEach(m=>m.remove());marks=[];
  const pred=f[1],col=f[2];
  irrg.style.opacity=(f[0]==='Irrationals')?1:0.25;
  if(f[0]==='R Reals'){
   marks.push(RC(X0,Y-3,XMAX-X0,6,{fill:'url(#realg)',opacity:.9}));
   const defs=NS('linearGradient',{id:'realg',x1:0,y1:0,x2:1,y2:0});
   ['','#6366f1','#a855f7','#ec4899'].forEach((c,i)=>{if(c){const st=NS('stop',{offset:(i/3)*100+'%','stop-color':c});defs.appendChild(st)}});
   s.appendChild(defs);
   readout(ctl,'Every single point on this line is a <b>Real number</b> — rationals and irrationals together, no gaps.');
   return;
  }
  if(f[0]==='Q Rationals'){
   for(let v=-5;v<=5.01;v+=0.25){const x=X0+(v+5)*DX;marks.push(CR(x,Y,3.4,{fill:col}))}
   readout(ctl,'Rationals are <b>everywhere dense</b> — between any two dots there is always another dot. Yet they still leave room for √2, √3, π…');
   return;
  }
  for(let v=-5;v<=5;v++){if(pred(v)){const x=X0+(v+5)*DX;marks.push(CR(x,Y,7,{fill:col,opacity:.95}))}}
  readout(ctl,'<b>'+f[0].split(' ')[0]+'</b> highlighted. Now drag the orange pin onto one of these dots — or somewhere else entirely!');
 }
 const btwn=document.createElement('div');btwn.className='ctlrow';btwn.style.marginTop='6px';ctl.appendChild(btwn);
 const b1=addBtn(btwn,'🎯 Drop pin at a random irrational','btn-g',()=>{setPin(pick(special)[0]+R(-2,3));api.touch()});
 readout(ctl,'Tap a family chip above to see which numbers belong to it. Drag the orange pin anywhere!');
 if(opts.mode==='between'){
  let count=0;const dots=[];
  const info=readout(ctl,'Two pins are placed. Insert midpoints — the gaps NEVER run out!');
  const bctl=document.createElement('div');bctl.className='ctlrow';ctl.appendChild(bctl);
  addBtn(bctl,'➕ Insert midpoint','btn-p',()=>{
   count++;
   const v=(pinv)/2+((count%2)?-1:1)*0;
   const nv=pinv+(pinv>0?-1:1)*Math.pow(0.5,count+1);
   const x=X0+(nv+5)*DX;
   const d=CR(x,Y,5,{fill:'#059669',opacity:.9});
   s.appendChild(d);dots.push(d);
   info.innerHTML='Inserted <b>'+count+'</b> midpoint'+(count>1?'s':'')+' — still infinitely many left. Density in action!';
   SFX.step();api.touch();
  });
  addBtn(bctl,'🧹 Reset','btn-g',()=>{dots.forEach(d=>d.remove());dots.length=0;count=0;info.innerHTML='Reset. Insert midpoints again!'});
 }
 if(opts.mode==='decimal'){
  const bank=[['1/3','0.333333…',false],['1/7','0.142857142857…',true],['17/8','2.125',false],['2/9','0.222222…',false],['5/11','0.454545…',true]];
  let bi=0,revealed=0;
  const info=readout(ctl,'Pick a fraction, then reveal its decimal digits one by one.');
  const dctl=document.createElement('div');dctl.className='ctlrow';ctl.appendChild(dctl);
  const sel=document.createElement('div');sel.className='tabs';dctl.appendChild(sel);
  bank.forEach((b,i)=>{const tb=document.createElement('button');tb.className='tab'+(i===0?' on':'');tb.textContent=b[0];
   tb.addEventListener('click',()=>{sel.querySelectorAll('.tab').forEach(x=>x.classList.remove('on'));tb.classList.add('on');bi=i;revealed=0;info.innerHTML='Reveal the digits of <b>'+b[0]+'</b>…';api.touch()});
   sel.appendChild(tb)});
  addBtn(dctl,'🔢 Reveal next digit','btn-p',()=>{
   revealed++;
   const b=bank[bi];
   info.innerHTML='<b>'+b[0]+' = '+b[1]+'</b><br>'+(b[2]?'Repeating block! The denominator has a prime ≠ 2,5 → <b>non-terminating recurring</b>.':'The denominator is built from 2s and 5s → <b>terminating</b> decimal.');
   SFX.click();api.touch();
  });
 }
};

/* ---------- 2. ROOT SPIRAL ---------- */
LABS.spiral=function(box,ctl,opts,api){
 box.innerHTML='';const s=makeSVG(560,410);box.appendChild(s);
 const O={x:305,y:318},sc=92;
 const g=s.appendChild(NS('g',{}));
 const nlg=s.appendChild(NS('g',{}));
 s.appendChild(LN(30,375,540,375,{stroke:'#26243a','stroke-width':2.5}));
 for(let i=0;i<=5;i++){const x=30+i*100;s.appendChild(LN(x,370,x,380,{stroke:'#26243a'}));s.appendChild(T(x,395,String(i),{'font-size':11,fill:'#6d6a85'}))}
 let pts=[{x:1,y:0}];
 let k=1;
 const info=readout(ctl,'Build the Spiral of Theodorus: each new triangle adds an arm of length 1 → hypotenuse √(k+1).');
 const bctl=document.createElement('div');bctl.className='ctlrow';ctl.appendChild(bctl);
 const landings=[];
 addBtn(bctl,'➡️ Next triangle','btn-p',()=>{
  if(k>=7){info.innerHTML='Spiral complete up to <b>√7</b>! Notice: each hypotenuse = √(previous² + 1²).';return}
  const prev=pts[pts.length-1];
  const len=Math.hypot(prev.x,prev.y);
  const np={x:prev.x+(-prev.y/len),y:prev.y+(prev.x/len)};
  pts.push(np);k++;
  const p0={x:O.x,y:O.y},p1={x:O.x+prev.x*sc,y:O.y-prev.y*sc},p2={x:O.x+np.x*sc,y:O.y-np.y*sc};
  const poly=PT('M '+p0.x+' '+p0.y+' L '+p1.x+' '+p1.y+' L '+p2.x+' '+p2.y+' Z',{fill:'rgba(99,102,241,'+(0.10+k*0.05)+')',stroke:'#6366f1','stroke-width':2});
  g.appendChild(poly);
  g.appendChild(CR(p2.x,p2.y,4,{fill:'#e11d48'}));
  g.appendChild(T(p2.x+(p2.x>O.x?-26:26),p2.y,'√'+k,{'font-size':12,fill:'#be185d'}));
  const hyp=Math.hypot(np.x,np.y);
  if(k<=5){
   const lx=30+hyp*100;
   const arc=PT('M '+p2.x+' '+p2.y+' A '+hyp*100+' '+hyp*100+' 0 0 1 '+lx+' 375',{stroke:'#d97706','stroke-width':1.6,'stroke-dasharray':'5 4'});
   nlg.appendChild(arc);nlg.appendChild(CR(lx,375,5,{fill:'#d97706'}));
   nlg.appendChild(T(lx,362,'√'+k,{'font-size':11,fill:'#b45309'}));
   landings.push(lx);
  }
  info.innerHTML='Triangle '+k+': hypotenuse² = '+k+' → length <b>√'+k+'</b> ≈ '+fmt(Math.sqrt(k))+(k<=5?' — the arc drops it onto the number line at '+fmt(Math.sqrt(k))+'.':'');
  SFX.step();api.touch();
 });
 addBtn(bctl,'🧹 Clear spiral','btn-g',()=>{g.innerHTML='';nlg.innerHTML='';pts=[{x:1,y:0}];k=1;info.innerHTML='Spiral cleared. Build it again!'});
};

/* ---------- 3. EXPONENTS & RATIONALISE ---------- */
LABS.expo=function(box,ctl,opts,api){
 box.innerHTML='';const s=makeSVG(520,240);box.appendChild(s);
 let a=2,n=3;
 const bars=s.appendChild(NS('g',{}));
 const draw=()=>{
  bars.innerHTML='';
  const vals=[];let v=1;
  for(let i=1;i<=n;i++){v*=a;vals.push(v)}
  const maxv=Math.min(vals[vals.length-1],220);
  const H=150,base=200;
  vals.forEach((val,i)=>{
   const h=Math.max(8,val/maxv*H);
   bars.appendChild(RC(50+i*70,base-h,34,h,{rx:6,fill:'url(#expgrad)'}));
   bars.appendChild(T(67,base-h-8,fmt(Math.min(val,1e6)),{'font-size':12,fill:'#4338ca'}));
   bars.appendChild(T(67,base+16,'a^'+(i+1),{'font-size':11,fill:'#6d6a85'}));
  });
  readout(ctl,'Laws firing: <b>aᵐ·aⁿ = aᵐ⁺ⁿ</b> → each step multiplies by '+a+'. So '+a+'<sup>'+n+'</sup> = '+fmt(Math.pow(a,n))+'. Also (aᵐ)ⁿ = aᵐ·ⁿ: slide and verify!');
 };
 const defs=NS('linearGradient',{id:'expgrad',x1:0,y1:1,x2:0,y2:0});
 defs.appendChild(NS('stop',{offset:'0%','stop-color':'#818cf8'}));defs.appendChild(NS('stop',{offset:'100%','stop-color':'#4f46e5'}));
 s.appendChild(defs);
 addSlider(ctl,'Base a',1,6,a,1,v=>{a=v;draw()});
 addSlider(ctl,'Power n',1,6,n,1,v=>{n=v;draw()});
 draw();
 const rctl=document.createElement('div');rctl.className='ctlrow';ctl.appendChild(rctl);
 const info=readout(ctl,'');
 addTabs(rctl,['Laws of powers','Rationalise 1/√n','Conjugate 1/(√7−2)'],0,i=>{
  const r=readout(ctl,'');
  if(i===0)r.innerHTML='Slide a and n: aᵐ·aⁿ = aᵐ⁺ⁿ · aᵐ/aⁿ = aᵐ⁻ⁿ · (aᵐ)ⁿ = aᵐⁿ · a⁻ⁿ = 1/aⁿ · a^(1/2) = √a';
  if(i===1)r.innerHTML='Pick a surd below: watch the surd move upstairs. <span id="rsurds"></span>';
  if(i===2)r.innerHTML='1/(√7 − 2): multiply by (√7 + 2)/(√7 + 2). Denominator: (√7−2)(√7+2) = 7 − 4 = <b>3</b>. Result: <b>(√7 + 2)/3</b>. The difference-of-squares kills the surd!';
  if(i===1){
   const sd=r.querySelector('#rsurds')||r;
   const bctl2=document.createElement('div');bctl2.className='ctlrow';ctl.appendChild(bctl2);bctl2.id='rbtns';
   const old=ctl.querySelectorAll('#rbtns');old.forEach(x=>x.remove());
   const bc=document.createElement('div');bc.className='ctlrow';bc.id='rbtns';ctl.appendChild(bc);
   [2,3,5,7,10].forEach(nn=>{
    addBtn(bc,'1/√'+nn,'btn-s',()=>{readout(ctl,'Multiply top & bottom by √'+nn+': (1·√'+nn+')/(√'+nn+'·√'+nn+') = <b>√'+nn+'/'+nn+'</b> — surd upstairs, clean integer downstairs!');api.touch()});
   });
  }
  api.touch();
 });
};

/* ---------- 4. POLYNOMIAL BUILDER (degree) ---------- */
LABS.degree=function(box,ctl,opts,api){
 box.innerHTML='';const s=makeSVG(560,200);box.appendChild(s);
 const exprT=T(280,70,'',{'font-size':26,'font-weight':800,fill:'#26243a','font-family':'Outfit'});
 const degT=T(280,120,'',{'font-size':17,fill:'#4338ca','font-family':'Outfit'});
 const badge=RC(200,145,160,34,{rx:17,fill:'#f1eef8'});
 const badgeT=T(280,168,'',{'font-size':14,'font-weight':800,fill:'#4338ca','font-family':'Outfit'});
 s.appendChild(badge);s.appendChild(exprT);s.appendChild(degT);s.appendChild(badgeT);
 const terms=[{k:'x³',p:3,ok:true},{k:'x²',p:2,ok:true},{k:'x',p:1,ok:true},{k:'7',p:0,ok:true},{k:'√x',p:0.5,ok:false},{k:'1/x',p:-1,ok:false}];
 const state={};
 const chips=document.createElement('div');chips.className='tabs';ctl.appendChild(chips);
 function upd(){
  const on=terms.filter(t=>state[t.k]);
  if(!on.length){exprT.textContent='0';degT.textContent='(turn some terms on)';badgeT.textContent='—';return}
  const bad=on.filter(t=>!t.ok);
  const expr=on.map(t=>t.k).join(' + ').replace(/\+ −/g,'− ');
  exprT.textContent=on.length>1?on.map(t=>t.k).join(' + '):on[0].k;
  if(bad.length){
   degT.textContent='Not a polynomial — '+bad[0].k+' has a fractional/negative power!';
   badge.setAttribute('fill','#fef2f2');badgeT.textContent='🚫 NOT A POLYNOMIAL';badgeT.setAttribute('fill','#dc2626');
  }else{
   const deg=Math.max(...on.map(t=>t.p));
   degT.textContent='Highest power = '+deg+' → degree '+deg;
   badge.setAttribute('fill','#ecfdf5');
   badgeT.textContent=deg===0?'CONSTANT':deg===1?'LINEAR':deg===2?'QUADRATIC':'CUBIC';
   badgeT.setAttribute('fill','#047857');
  }
 }
 terms.forEach(t=>{
  const b=document.createElement('button');b.className='tab';b.textContent=t.k;
  b.addEventListener('click',()=>{state[t.k]=!state[t.k];b.classList.toggle('on',!!state[t.k]);upd();api.touch();SFX.click()});
  chips.appendChild(b);
 });
 upd();
 readout(ctl,'Build a polynomial by toggling terms. Watch the degree = highest whole-number power — and the alarm when √x or 1/x sneaks in!');
};

/* ---------- 5. POLYGRAPH ---------- */
LABS.polygraph=function(box,ctl,opts,api){
 box.innerHTML='';const s=makeSVG(460,340);box.appendChild(s);
 const U=30,CX=230,CY=170;
 for(let i=-7;i<=7;i++){s.appendChild(LN(CX+i*U,10,CX+i*U,330,{stroke:'#e9e5f0'}))}
 for(let j=-5;j<=5;j++){s.appendChild(LN(30,CY+j*U,430,CY+j*U,{stroke:'#e9e5f0'}))}
 s.appendChild(LN(20,CY,440,CY,{stroke:'#26243a','stroke-width':2}));
 s.appendChild(LN(CX,15,CX,325,{stroke:'#26243a','stroke-width':2}));
 for(let i=-7;i<=7;i+=2){if(i) s.appendChild(T(CX+i*U,CY+14,String(i),{'font-size':9,fill:'#6d6a85'}))}
 for(let j=-4;j<=4;j+=2){if(j) s.appendChild(T(CX-12,CY-j*U+4,String(j),{'font-size':9,fill:'#6d6a85'}))}
 const curve=PT('',{stroke:'#e11d48','stroke-width':3});
 s.appendChild(curve);
 const zg=s.appendChild(NS('g',{}));
 let a=1,b=0,c=-2;
 const px=x=>CX+x*U, py=y=>CY-y*U;
 function drawPoly(){
  zg.innerHTML='';
  let d='';
  for(let x=-7.4;x<=7.4;x+=0.2){
   let y;
   if(a===0)y=b*x+c;else y=a*x*x+b*x+c;
   if(y>11)y=11;if(y<-11)y=-11;
   d+=(d?' L ':'M ')+px(x)+' '+py(y);
  }
  curve.setAttribute('d',d);
  const str=a===0?(b+'x + '+c):(a+'x² + '+b+'x + '+c);
  if(a===0){
   if(b!==0){const z=-c/b;if(Math.abs(z)<=7.4){
    zg.appendChild(CR(px(z),CY,6,{fill:'#059669',stroke:'#fff','stroke-width':2}));
    zg.appendChild(T(px(z),CY-14,'zero: '+fmt(z),{'font-size':11,fill:'#047857'}));
   }}
   readout(ctl,'p(x) = '+str+' — a LINE polynomial. Its single zero is where the line crosses the x-axis'+(b!==0?' at x = '+fmt(-c/b)+'.':'.'));
  }else{
   const disc=b*b-4*a*c;
   if(disc>=0){
    const z1=(-b-Math.sqrt(disc))/(2*a),z2=(-b+Math.sqrt(disc))/(2*a);
    [z1,z2].forEach(z=>{if(Math.abs(z)<=7.5){zg.appendChild(CR(px(z),CY,6,{fill:'#059669',stroke:'#fff','stroke-width':2}));zg.appendChild(T(px(z),CY-14,fmt(z),{'font-size':11,fill:'#047857'}))}});
    readout(ctl,'p(x) = '+str+' — a QUADRATIC. Zeros at x = '+fmt(z1)+' and '+fmt(z2)+' (p(x) = 0 there → the curve crosses the x-axis).');
   }else{
    readout(ctl,'p(x) = '+str+' — the parabola MISSES the x-axis (discriminant < 0): <b>no real zeros</b>.');
   }
  }
  api.touch();
 }
 const tabs=addTabs(ctl,['Line  ax+b','Parabola  ax²+bx+c'],0,i=>{
  if(i===0){a=0}else{a=1}
  drawPoly();
 });
 addSlider(ctl,'b  (slope / x-coeff)',-4,4,b,1,v=>{b=v;drawPoly()});
 addSlider(ctl,opts&&opts.noC?'':'c  (constant)',-5,5,c,1,v=>{c=v;drawPoly()});
 const arow=document.createElement('div');arow.className='ctlrow';arow.innerHTML='<span class="slab">a (only in parabola tab) <span class="val">1</span></span>';
 const ainp=document.createElement('input');ainp.type='range';ainp.min=-2;ainp.max=2;ainp.step=1;ainp.value=1;
 arow.appendChild(ainp);ctl.appendChild(arow);
 ainp.addEventListener('input',()=>{const v=+ainp.value;a=v===0?1:v;arow.querySelector('.val').textContent=a;drawPoly()});
 drawPoly();
};

/* ---------- 6. IDENTITY SQUARE-CUT (flagship) ---------- */
LABS.ident=function(box,ctl,opts,api){
 box.innerHTML='';const s=makeSVG(520,300);box.appendChild(s);
 const g=s.appendChild(NS('g',{}));
 const brT=T(260,288,'',{'font-size':15,'font-weight':800,fill:'#312e81','font-family':'Outfit'});
 s.appendChild(brT);
 let a=3,b=2,tab=0,xv=2;
 const P={x:135,y:34};
 function draw(){
  g.innerHTML='';
  const u=Math.min(38,220/(a+b));
  if(tab===0){
   const S=(a+b)*u;
   g.appendChild(RC(P.x,P.y,S,S,{rx:8,fill:'#f8f7ff',stroke:'#312e81','stroke-width':2.5}));
   g.appendChild(RC(P.x,P.y,a*u,a*u,{fill:'#818cf8'}));
   g.appendChild(RC(P.x+a*u,P.y,b*u,a*u,{fill:'#6ee7b7'}));
   g.appendChild(RC(P.x,P.y+a*u,a*u,b*u,{fill:'#34d399'}));
   g.appendChild(RC(P.x+a*u,P.y+a*u,b*u,b*u,{fill:'#fcd34d'}));
   g.appendChild(T(P.x+a*u/2,P.y+a*u/2+5,'a²='+a*a,{'font-size':13,fill:'#fff'}));
   g.appendChild(T(P.x+a*u+b*u/2,P.y+a*u/2+5,'ab='+(a*b),{'font-size':13,fill:'#065f46'}));
   g.appendChild(T(P.x+a*u/2,P.y+a*u+b*u/2+5,'ab='+(a*b),{'font-size':13,fill:'#065f46'}));
   g.appendChild(T(P.x+a*u+b*u/2,P.y+a*u+b*u/2+5,'b²='+b*b,{'font-size':12,fill:'#92400e'}));
   g.appendChild(T(P.x+S/2,P.y+S+18,'side = a + b = '+a+' + '+b+' = '+(a+b),{'font-size':12,fill:'#6d6a85'}));
   brT.innerHTML='(' + a + ' + ' + b + ')² = ' + (a+b)*(a+b) + '  =  a² + 2ab + b² = ' + a*a + ' + ' + (2*a*b) + ' + ' + b*b;
  }else if(tab===1){
   const S=a*u;
   g.appendChild(RC(P.x,P.y,S,S,{rx:6,fill:'#818cf8',stroke:'#312e81','stroke-width':2.5}));
   g.appendChild(T(P.x+S/2,P.y+S/2+5,'a² = '+(a*a),{'font-size':15,fill:'#fff','font-weight':800}));
   g.appendChild(RC(P.x+S-b*u,P.y,b*u,S,{fill:'rgba(239,68,68,.28)'}));
   g.appendChild(RC(P.x,P.y+S-b*u,S-b*u,b*u,{fill:'rgba(239,68,68,.28)'}));
   g.appendChild(RC(P.x+S-b*u,P.y+S-b*u,b*u,b*u,{fill:'rgba(59,130,246,.45)',stroke:'#2563eb','stroke-width':2,'stroke-dasharray':'5 3'}));
   g.appendChild(T(P.x+S-b*u/2,P.y+S/2,'−ab',{'font-size':12,fill:'#991b1b'}));
   g.appendChild(T(P.x+(S-b*u)/2,P.y+S-b*u/2,'−ab',{'font-size':12,fill:'#991b1b'}));
   g.appendChild(T(P.x+S-b*u/2,P.y+S-b*u/2+4,'+b²',{'font-size':11,fill:'#1e3a8a'}));
   brT.innerHTML='(' + a + ' − ' + b + ')² = ' + (a-b)*(a-b) + '  =  a² − 2ab + b² = ' + a*a + ' − ' + (2*a*b) + ' + ' + b*b;
  }else if(tab===2){
   const W=(a+b)*u,H=(a-b)*u;
   g.appendChild(RC(P.x,P.y+((a+b)*u-H)/2,W,H,{rx:6,fill:'#f8f7ff',stroke:'#312e81','stroke-width':2.5}));
   g.appendChild(RC(P.x,P.y+((a+b)*u-H)/2,a*u,H,{fill:'#818cf8'}));
   g.appendChild(RC(P.x+a*u,P.y+((a+b)*u-H)/2,b*u,H,{fill:'#6ee7b7'}));
   g.appendChild(T(P.x+a*u/2,P.y+((a+b)*u-H)/2+H/2+5,'a(a−b)='+(a*(a-b)),{'font-size':12,fill:'#fff'}));
   g.appendChild(T(P.x+a*u+b*u/2,P.y+((a+b)*u-H)/2+H/2+5,'b(a−b)='+(b*(a-b)),{'font-size':12,fill:'#065f46'}));
   g.appendChild(T(P.x+W/2,P.y+((a+b)*u-H)/2-8,'width = a + b = '+(a+b),{'font-size':11,fill:'#6d6a85'}));
   brT.innerHTML='(' + a + ' + ' + b + ')(' + a + ' − ' + b + ') = ' + (a+b)*(a-b) + '  =  a² − b² = ' + (a*a) + ' − ' + (b*b);
  }else{
   const W=(xv+a)*u,H=(xv+b)*u;
   g.appendChild(RC(P.x,P.y,W,H,{rx:6,fill:'#f8f7ff',stroke:'#312e81','stroke-width':2.5}));
   g.appendChild(RC(P.x,P.y,xv*u,xv*u,{fill:'#818cf8'}));
   g.appendChild(RC(P.x+xv*u,P.y,a*u,xv*u,{fill:'#6ee7b7'}));
   g.appendChild(RC(P.x,P.y+xv*u,xv*u,b*u,{fill:'#34d399'}));
   g.appendChild(RC(P.x+xv*u,P.y+xv*u,a*u,b*u,{fill:'#fcd34d'}));
   g.appendChild(T(P.x+xv*u/2,P.y+xv*u/2+5,'x²',{'font-size':13,fill:'#fff'}));
   g.appendChild(T(P.x+xv*u+a*u/2,P.y+xv*u/2+5,'ax',{'font-size':12,fill:'#065f46'}));
   g.appendChild(T(P.x+xv*u/2,P.y+xv*u+b*u/2+5,'bx',{'font-size':12,fill:'#065f46'}));
   g.appendChild(T(P.x+xv*u+a*u/2,P.y+xv*u+b*u/2+5,'ab='+(a*b),{'font-size':12,fill:'#92400e'}));
   brT.innerHTML='(x + ' + a + ')(x + ' + b + ')  =  x² + ' + (a+b) + 'x + ' + (a*b);
  }
  api.touch();
 }
 addTabs(ctl,['(a+b)²','(a−b)²','(a+b)(a−b)','(x+a)(x+b)'],0,i=>{tab=i;draw()});
 addSlider(ctl,'a',1,6,a,1,v=>{a=v;draw()});
 addSlider(ctl,'b',1,6,b,1,v=>{b=v;draw()});
 const xr=document.createElement('div');xr.className='ctlrow';xr.id='xrow';
 xr.innerHTML='<span class="slab">x <span class="val">2</span></span>';
 const xi=document.createElement('input');xi.type='range';xi.min=1;xi.max=4;xi.value=2;
 xr.appendChild(xi);ctl.appendChild(xr);
 xi.addEventListener('input',()=>{xv=+xi.value;xr.querySelector('.val').textContent=xv;if(tab===3)draw()});
 draw();
 readout(ctl,'The square-cut proof: ONE a² square + TWO ab strips + ONE b² corner fill the whole (a+b)² square. Slide a and b — the count always works!');
};

/* ---------- 7. REMAINDER / FACTOR MACHINE ---------- */
LABS.remt=function(box,ctl,opts,api){
 box.innerHTML='';const s=makeSVG(520,250);box.appendChild(s);
 const factor=opts.mode==='factor';
 const CO=factor?[1,-4,1,6]:[1,-3,4,-4];
 const pstr=factor?'x³ − 4x² + x + 6':'x³ − 3x² + 4x − 4';
 const pxT=T(260,26,'p(x) = '+pstr,{'font-size':16,'font-weight':800,fill:'#312e81','font-family':'Outfit'});
 s.appendChild(pxT);
 let k=1;
 const found=[];
 const barT=T(130,180,'p(k)',{'font-size':13,fill:'#4338ca','font-family':'Outfit'});
 const barR=T(390,180,'remainder',{'font-size':13,fill:'#b45309','font-family':'Outfit'});
 s.appendChild(barT);s.appendChild(barR);
 const draw=()=>{
  const val=CO[0]*k*k*k+CO[1]*k*k+CO[2]*k+CO[3];
  const hT=clamp(Math.abs(val)*9,6,70);
  s.querySelectorAll('.bar').forEach(x=>x.remove());
  const bar1=RC(95,175-hT,70,hT,{rx:6,fill:val===0?'#10b981':'url(#expgrad)',class:'bar'});
  const bar2=RC(355,175-hT,70,hT,{rx:6,fill:val===0?'#10b981':'rgba(217,119,6,.75)',class:'bar'});
  s.appendChild(bar1);s.appendChild(bar2);
  s.appendChild(T(130,175-hT-8,String(val),{'font-size':15,'font-weight':800,fill:'#4338ca','font-family':'Outfit',class:'bar'}));
  s.appendChild(T(390,175-hT-8,String(val),{'font-size':15,'font-weight':800,fill:'#b45309','font-family':'Outfit',class:'bar'}));
  if(factor){
   if(val===0&&!found.includes(k)){found.push(k);SFX.ok();burst(24)}
   const chips=found.map(r=>r>0?'(x − '+r+')':r===0?'x':'(x + '+(-r)+')').join(' × ');
   readout(ctl,'p('+k+') = '+val+(val===0?' ✦ FACTOR FOUND: (x − '+k+') — collected '+found.length+'/3. '+chips:' — not zero, keep hunting (try small integers!).'));
   if(found.length===3){readout(ctl,'🏆 Complete: '+pstr+' = (x+1)(x−2)(x−3). All three integer roots found!');burst(60);SFX.win()}
  }else{
   readout(ctl,'Dividing by (x − '+k+') → remainder = p('+k+') = <b>'+val+'</b>.'+(val===0?' Remainder 0 → (x − '+k+') is a FACTOR!':' No long division needed — one substitution.'));
  }
  api.touch();
 };
 if(factor){readout(ctl,'Hunt for integer roots: slide k until the bars turn GREEN (p(k) = 0). Collect all three factors!')}
 else{readout(ctl,'Slide k — the two bars NEVER disagree. That is the Remainder Theorem: remainder = p(k).')}
 addSlider(ctl,'k in (x − k)',-3,3,k,1,v=>{k=v;draw()});
 draw();
};
</script>
