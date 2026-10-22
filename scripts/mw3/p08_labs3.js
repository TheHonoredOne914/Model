<script>
'use strict';
/* ================= LAB ENGINES · part 3 ================= */

/* ---------- 15. PARALLELOGRAM ---------- */
LABS.para=function(box,ctl,opts,api){
 box.innerHTML='';const s=makeSVG(520,300);box.appendChild(s);
 const g=s.appendChild(NS('g',{}));
 const royal=opts.mode==='royal';
 let skew=62,ratio=1.5,mode=royal?0:0;
 const info=readout(ctl,'');
 function draw(){
  g.innerHTML='';
  let ang,sa,sb;
  if(!royal){ang=skew;sa=95;sb=95*ratio}
  else if(mode===0){ang=90;sa=110;sb=70}
  else if(mode===1){ang=skew;sa=85;sb=85}
  else{ang=90;sa=85;sb=85}
  const rad=ang*Math.PI/180;
  const A={x:120,y:240},B={x:120+sb,y:240};
  const D={x:120+sa*Math.cos(rad),y:240-sa*Math.sin(rad)};
  const C={x:B.x+D.x-A.x,y:B.y+D.y-A.y};
  g.appendChild(PT('M '+A.x+' '+A.y+' L '+B.x+' '+B.y+' L '+C.x+' '+C.y+' L '+D.x+' '+D.y+' Z',{fill:'rgba(79,70,229,.09)',stroke:'#4f46e5','stroke-width':2.8}));
  g.appendChild(LN(A.x,A.y,B.x,B.y,{stroke:'#0d9488','stroke-width':4,opacity:.5}));
  g.appendChild(LN(D.x,D.y,C.x,C.y,{stroke:'#0d9488','stroke-width':4,opacity:.5}));
  g.appendChild(LN(A.x,A.y,D.x,D.y,{stroke:'#f59e0b','stroke-width':4,opacity:.5}));
  g.appendChild(LN(B.x,B.y,C.x,C.y,{stroke:'#f59e0b','stroke-width':4,opacity:.5}));
  [[A,'A'],[B,'B'],[C,'C'],[D,'D']].forEach(p=>g.appendChild(T(p[0].x+(p[0].x>200?-14:14),p[0].y+(p[0].y>200?-8:-8),p[1],{'font-size':13,fill:'#312e81','font-weight':800})));
  const arc=(P,Q,R,col)=>{const a1=Math.atan2(Q.y-P.y,Q.x-P.x)*180/Math.PI,a2=Math.atan2(R.y-P.y,R.x-P.x)*180/Math.PI;g.appendChild(ARC(P.x,P.y,22,a1,a2,{stroke:col,'stroke-width':2.2}))};
  arc(A,B,D,'#e11d48');arc(C,B,D,'#e11d48');
  const angA=ang<90?ang:180-ang;
  if(royal){
   const eq=(mode===1||mode===2),rectA=(mode===0||mode===2);
   g.appendChild(T(260,28,'Rhombus: equal sides ✓ · Rectangle: equal angles ✓ · Square: BOTH',{'font-size':12,fill:'#3f3c58'}));
   g.appendChild(T(260,52,(rectA?'✓ diagonals EQUAL':'✗ diagonals not equal')+'   ·   '+(eq?'✓ diagonals ⊥ & bisect angles':'✗ diagonals not ⊥'),{'font-size':13,fill:'#047857','font-weight':800}));
   g.appendChild(LN(A.x,A.y,C.x,C.y,{stroke:'#7c3aed','stroke-width':2,'stroke-dasharray':'5 3'}));
   g.appendChild(LN(B.x,B.y,D.x,D.y,{stroke:'#7c3aed','stroke-width':2,'stroke-dasharray':'5 3'}));
   info.innerHTML=(mode===0?'RECTANGLE':'mode')+' · diagonals drawn dashed — check equality'+(rectA?' (equal ✓)':' (unequal)')+' and angle between them'+(eq?' (90° ✓)':' (not 90°)')+'.';
  }else{
   g.appendChild(LN((A.x+C.x)/2-6,(A.y+C.y)/2,(A.x+C.x)/2+6,(A.y+C.y)/2,{stroke:'#7c3aed','stroke-width':3}));
   g.appendChild(LN((B.x+D.x)/2-6,(B.y+D.y)/2,(B.x+D.x)/2+6,(B.y+D.y)/2,{stroke:'#7c3aed','stroke-width':3}));
   info.innerHTML='Opposite sides: teal pair equal & parallel, amber pair equal & parallel · Opposite angles equal ('+fmt(ang<90?ang:180-ang)+'° twins) · Diagonals bisect each other at the midpoint (tick marks) · Angle sum 360°.';
  }
  api.touch();
 }
 if(royal){
  addTabs(ctl,['Rectangle','Rhombus','Square'],0,i=>{mode=i;draw()});
  addSlider(ctl,'skew (rhombus)',30,150,62,1,v=>{skew=v;if(mode===1)draw()});
 }else{
  addSlider(ctl,'Angle at A',35,145,62,1,v=>{skew=v;draw()});
  addSlider(ctl,'Side ratio',1,2.4,ratio,.1,v=>{ratio=v;draw()});
 }
 draw();
};

/* ---------- 16. MIDPOINT THEOREM ---------- */
LABS.midp=function(box,ctl,opts,api){
 box.innerHTML='';const s=makeSVG(520,320);box.appendChild(s);
 const g=s.appendChild(NS('g',{}));
 const A={x:110,y:270},B={x:410,y:270};
 let cx=300,cy=70,t=0.5;
 const info=readout(ctl,'');
 function draw(){
  g.innerHTML='';
  const C={x:cx,y:cy};
  const D={x:(A.x+B.x)/2,y:(A.y+B.y)/2},E={x:(A.x+C.x)/2,y:(A.y+C.y)/2};
  const P={x:A.x+(B.x-A.x)*t,y:A.y+(B.y-A.y)*t},Q={x:A.x+(C.x-A.x)*t,y:A.y+(C.y-A.y)*t};
  g.appendChild(PT('M '+A.x+' '+A.y+' L '+B.x+' '+B.y+' L '+C.x+' '+C.y+' Z',{fill:'rgba(79,70,229,.07)',stroke:'#4f46e5','stroke-width':2.6}));
  g.appendChild(LN(P.x,P.y,Q.x,Q.y,{stroke:t===0.5?'#059669':'#e11d48','stroke-width':3.4}));
  g.appendChild(T((P.x+Q.x)/2+30,(P.y+Q.y)/2,'t = '+fmt(t),{'font-size':12,fill:t===0.5?'#047857':'#be185d','font-weight':800}));
  [[D,'mid AB',-6,18],[E,'mid AC',16,-6]].forEach(m=>{
   g.appendChild(CR(m[0].x,m[0].y,5,{fill:'#f59e0b',stroke:'#fff','stroke-width':2}));
  });
  g.appendChild(T(D.x,D.y+20,'D',{'font-size':12,fill:'#b45309','font-weight':800}));
  g.appendChild(T(E.x-14,E.y,'E',{'font-size':12,fill:'#b45309','font-weight':800}));
  const nAB=Math.hypot(P.x-Q.x,P.y-Q.y);
  const nBC=Math.hypot(B.x-C.x,B.y-C.y);
  const ratio=nAB/nBC;
  const node=CR(C.x,C.y,10,{fill:'#f97316',stroke:'#fff','stroke-width':2.5,style:'cursor:grab'});
  g.appendChild(node);
  makeDrag(s,node,p=>{cx=clamp(p.x,180,400);cy=clamp(p.y,40,240);draw();api.touch()});
  const par=Math.abs(t-0.5)<0.001;
  info.innerHTML=(par?'★ MIDPOINT THEOREM: ':'Off-midpoint (t ≠ ½): ')+'inner/BC = '+fmt(ratio)+' — '+(par?'EXACTLY ½ and parallel to BC ✓. Drag C — the ratio refuses to change!':'not parallel to BC. Slide t to 0.5 to re-magnetise.');
  api.touch();
 }
 addSlider(ctl,'Slide t along the sides',0,1,t,.05,v=>{t=Math.round(v*20)/20;draw()});
 draw();
};

/* ---------- 17. CIRCLE LAB ---------- */
LABS.circl=function(box,ctl,opts,api){
 box.innerHTML='';const s=makeSVG(480,340);box.appendChild(s);
 const g=s.appendChild(NS('g',{}));
 const CX=240,CY=165,R=115;
 const mode=opts.mode||'parts';
 let pAng=210,h1=60,h2=60,cthl=80,cphi=90,p1=20,p2=140,p3=200,p4=320;
 const info=readout(ctl,'');
 function draw(){
  g.innerHTML='';
  g.appendChild(CR(CX,CY,R,{fill:'rgba(13,148,136,.05)',stroke:'#0d9488','stroke-width':2.6}));
  g.appendChild(CR(CX,CY,4,{fill:'#0f766e'}));
  g.appendChild(T(CX+10,CY-8,'O',{'font-size':12,fill:'#0f766e','font-weight':800}));
  const P=a=>({x:CX+R*Math.cos(a*Math.PI/180),y:CY-R*Math.sin(a*Math.PI/180)});
  if(mode==='parts'){
   const A=P(210),C=P(pAng);
   g.appendChild(LN(A.x,A.y,C.x,C.y,{stroke:'#e11d48','stroke-width':3}));
   g.appendChild(CR(A.x,A.y,6,{fill:'#312e81'}));g.appendChild(T(A.x-14,A.y+4,'A',{'font-size':12,fill:'#312e81'}));
   const node=CR(C.x,C.y,9,{fill:'#f97316',stroke:'#fff','stroke-width':2.5,style:'cursor:grab'});
   g.appendChild(node);g.appendChild(T(C.x+16,C.y-10,'P (drag!)',{'font-size':11,fill:'#c2410c'}));
   g.appendChild(T((A.x+C.x)/2,(A.y+C.y)/2-10,'chord',{'font-size':11,fill:'#be185d'}));
   const chord=Math.hypot(A.x-C.x,A.y-C.y);
   info.innerHTML='AP is a <b>chord</b> = '+fmt(chord/ R*100)+'% of diameter. The piece of circle between A and P is an <b>arc</b>; chord + arc enclose a <b>segment</b>; two radii + arc make a <b>sector</b>. The diameter (through O) is always the longest chord.';
   makeDrag(s,node,p=>{let a=Math.atan2(CY-p.y,p.x-CX)*180/Math.PI;pAng=Math.round(a);draw();api.touch()});
  }
  if(mode==='chords'){
   const chordAt=(half,col)=>{
    const d=Math.sqrt(Math.max(0,R*R-half*half));
    const x1=CX-half,x2=CX+half,y=CY-d;
    g.appendChild(LN(x1,y,x2,y,{stroke:col,'stroke-width':3}));
    g.appendChild(LN(CX,CY,CX,y,{stroke:col,'stroke-width':1.6,'stroke-dasharray':'4 3'}));
    g.appendChild(CR(CX,y,4,{fill:col}));
    g.appendChild(LN(CX-8,y,CX+8,y,{stroke:col,'stroke-width':2.5}));
    return{d,len:2*half};
   };
   const c1=chordAt(h1,'#e11d48');
   info.innerHTML='Chord 1: length '+fmt(c1.len)+' · distance from centre '+fmt(c1.d)+'. The perpendicular from O ALWAYS bisects the chord (tick mark ✓). Longer chord → smaller distance. Make both chords EQUAL and watch distances match!';
   if(h1!==h2){
    const c2=chordAt(h2,'#7c3aed');
    info.innerHTML+=' Chord 2: '+fmt(c2.len)+' at distance '+fmt(c2.d)+'.';
   }else{
    const c2=chordAt(h2,'#7c3aed');
    info.innerHTML+=' Chord 2 EQUAL → same distance ✓ (equal chords ⇔ equidistant).';
   }
  }
  if(mode==='angles'){
   const A=P(180+cthl/2),B=P(180-cthl/2),C=P(cphi);
   g.appendChild(LN(CX,CY,A.x,A.y,{stroke:'#e11d48','stroke-width':2.4}));
   g.appendChild(LN(CX,CY,B.x,B.y,{stroke:'#e11d48','stroke-width':2.4}));
   g.appendChild(ARC(CX,CY,30,180-cthl/2,180+cthl/2,{stroke:'#e11d48','stroke-width':2.6}));
   g.appendChild(LN(C.x,C.y,A.x,A.y,{stroke:'#2563eb','stroke-width':2}));
   g.appendChild(LN(C.x,C.y,B.x,B.y,{stroke:'#2563eb','stroke-width':2}));
   const a1=Math.atan2(A.y-C.y,A.x-C.x)*180/Math.PI,a2=Math.atan2(B.y-C.y,B.x-C.x)*180/Math.PI;
   g.appendChild(ARC(C.x,C.y,26,a1,a2,{stroke:'#2563eb','stroke-width':2.6}));
   g.appendChild(T(CX,CY+46,'central '+cthl+'°',{'font-size':12,fill:'#be185d','font-weight':800}));
   g.appendChild(T(C.x,C.y-16,'∠C = '+(cthl/2)+'°',{'font-size':12,fill:'#1d4ed8','font-weight':800}));
   const node=CR(C.x,C.y,8,{fill:'#f97316',stroke:'#fff','stroke-width':2,style:'cursor:grab'});
   g.appendChild(node);
   makeDrag(s,node,p=>{let a=Math.atan2(CY-p.y,p.x-CX)*180/Math.PI;cphi=a;draw();api.touch()});
   info.innerHTML='Same arc AB: central angle at O = <b>'+cthl+'°</b>, inscribed angle at C = <b>'+(cthl/2)+'°</b> — always HALF. Drag C anywhere on the major arc: it never changes. (Arc is a semicircle → inscribed = 90°.)';
  }
  if(mode==='cyclic'){
   const pts=[P(p1),P(p2),P(p3),P(p4)];
   g.appendChild(PT('M '+pts[0].x+' '+pts[0].y+' L '+pts[1].x+' '+pts[1].y+' L '+pts[2].x+' '+pts[2].y+' L '+pts[3].x+' '+pts[3].y+' Z',{fill:'rgba(13,148,136,.08)',stroke:'#0f766e','stroke-width':2.4}));
   const ang=(P0,P1,P2)=>{const v1={x:P1.x-P0.x,y:P1.y-P0.y},v2={x:P2.x-P0.x,y:P2.y-P0.y};const dt=v1.x*v2.x+v1.y*v2.y,m1=Math.hypot(v1.x,v1.y),m2=Math.hypot(v2.x,v2.y);return Math.acos(clamp(dt/(m1*m2),-1,1))*180/Math.PI};
   const As=ang(pts[0],pts[1],pts[3]),Bs=ang(pts[1],pts[0],pts[2]),Cs=ang(pts[2],pts[1],pts[3]),Ds=ang(pts[3],pts[0],pts[2]);
   pts.forEach((pt,i)=>{
    const node=CR(pt.x,pt.y,8,{fill:'#f97316',stroke:'#fff','stroke-width':2,style:'cursor:grab'});
    g.appendChild(node);
    const which=[p1,p2,p3,p4][i];
    makeDrag(s,node,p=>{let a=Math.atan2(CY-p.y,p.x-CX)*180/Math.PI;if(i===0)p1=a;else if(i===1)p2=a;else if(i===2)p3=a;else p4=a;draw();api.touch()});
   });
   info.innerHTML='∠A = '+fmt(As)+'°, ∠C = '+fmt(Cs)+'° → A + C = <b>'+fmt(As+Cs)+'°</b> · ∠B + ∠D = <b>'+fmt(Bs+Ds)+'°</b>. Opposite angles of a cyclic quadrilateral ALWAYS sum to 180° — drag any corner!';
  }
  api.touch();
 }
 if(mode==='parts'||mode==='chords'){
  if(mode==='parts')addSlider(ctl,'Point P angle',0,359,pAng,1,v=>{pAng=v;draw()});
  else{
   addSlider(ctl,'Chord 1 half-length',12,108,h1,1,v=>{h1=v;draw()});
   addSlider(ctl,'Chord 2 half-length',12,108,h2,1,v=>{h2=v;draw()});
  }
 }
 if(mode==='angles'){
  addSlider(ctl,'Central angle',30,170,cthl,2,v=>{cthl=v;draw()});
 }
 if(mode==='cyclic'){
  addSlider(ctl,'Vertex A',0,359,p1,1,v=>{p1=v;draw()});
  addSlider(ctl,'Vertex B',0,359,p2,1,v=>{p2=v;draw()});
  addSlider(ctl,'Vertex C',0,359,p3,1,v=>{p3=v;draw()});
  addSlider(ctl,'Vertex D',0,359,p4,1,v=>{p4=v;draw()});
 }
 draw();
};

/* ---------- 18. HERON MACHINE ---------- */
LABS.heron=function(box,ctl,opts,api){
 box.innerHTML='';const s=makeSVG(520,270);box.appendChild(s);
 const g=s.appendChild(NS('g',{}));
 const core=opts.mode!=='field';
 let a=13,b=14,c=15,rate=5;
 const info=readout(ctl,'');
 function draw(){
  g.innerHTML='';
  const valid=a+b>c&&a+c>b&&b+c>a;
  const sc=Math.min(16,150/Math.max(a,b,c));
  const ax=70,ay=225,bx=ax+c*sc,by=225;
  if(valid){
   const x=(a*a+c*c-b*b)/(2*c);
   const h=Math.sqrt(Math.max(0,a*a-x*x));
   const cx2=ax+x*sc,cy2=225-h*sc;
   g.appendChild(PT('M '+ax+' '+ay+' L '+bx+' '+by+' L '+cx2+' '+cy2+' Z',{fill:'rgba(22,163,74,.1)',stroke:'#16a34a','stroke-width':2.6}));
   g.appendChild(T(ax-16,229,'a='+a,{'font-size':11,fill:'#14532d'}));
   g.appendChild(T((ax+bx)/2,241,'c='+c,{'font-size':11,fill:'#14532d'}));
   g.appendChild(T((bx+cx2)/2+18,(by+cy2)/2,'b='+b,{'font-size':11,fill:'#14532d'}));
   const sm=(a+b+c)/2;
   const A2=Math.sqrt(sm*(sm-a)*(sm-b)*(sm-c));
   info.innerHTML='s = ('+a+'+'+b+'+'+c+')/2 = <b>'+fmt(sm)+'</b> · s−a='+fmt(sm-a)+', s−b='+fmt(sm-b)+', s−c='+fmt(sm-c)+'<br>Area = √(s(s−a)(s−b)(s−c)) = √('+fmt(sm*(sm-a)*(sm-b)*(sm-c))+') = <b>'+fmt(A2)+(core?'':' m²')+'</b>'+(core?'':' · at ₹'+rate+'/m² → <b>₹'+fmt(A2*rate)+'</b>');
  }else{
   g.appendChild(LN(ax,ay,bx,by,{stroke:'#ef4444','stroke-width':3}));
   info.innerHTML='⚠️ '+a+', '+b+', '+c+' cannot form a triangle ('+(a+b)+' ≤ '+c+'). Heron needs a valid triangle — fix the sliders!';
  }
  api.touch();
 }
 addSlider(ctl,'side a',2,15,a,1,v=>{a=v;draw()});
 addSlider(ctl,'side b',2,15,b,1,v=>{b=v;draw()});
 addSlider(ctl,'side c',2,15,c,1,v=>{c=v;draw()});
 if(!core)addSlider(ctl,'rate ₹/m²',1,10,rate,1,v=>{rate=v;draw()});
 const bctl=document.createElement('div');bctl.className='ctlrow';ctl.appendChild(bctl);
 addBtn(bctl,'🏞️ Park 122-120-22','btn-s',()=>{a=15;b=15;c=3;draw()});
 addBtn(bctl,'🔺 Classic 13-14-15','btn-s',()=>{a=13;b=14;c=15;draw()});
 draw();
};

/* ---------- 19. SOLID LAB ---------- */
LABS.solid=function(box,ctl,opts,api){
 box.innerHTML='';const s=makeSVG(560,280);box.appendChild(s);
 const g=s.appendChild(NS('g',{}));
 const mode=opts.mode||'cone';
 let r=7,h=24,unroll=false;
 const info=readout(ctl,'');
 const PV=()=>(r%7===0)?22/7:PI;
 const pnote=()=>(r%7===0)?' (π=22/7)':'';
 function draw(){
  g.innerHTML='';
  const cx=170,base=235;
  if(mode==='cone'){
   const W=r*8,H=Math.min(h*6,170);
   g.appendChild(PT('M '+(cx-W)+' '+base+' L '+cx+' '+(base-H)+' L '+(cx+W)+' '+base+' Z',{fill:'rgba(8,145,178,.12)',stroke:'#0891b2','stroke-width':2.6}));
   g.appendChild(NS('ellipse',{cx:cx,cy:base,rx:W,ry:14,fill:'rgba(8,145,178,.15)',stroke:'#0891b2','stroke-width':2}));
   g.appendChild(LN(cx,base,cx,base-H,{stroke:'#3f3c58','stroke-dasharray':'4 3'}));
   g.appendChild(T(cx+4,base-H/2,'h='+h,{'font-size':11,fill:'#3f3c58'}));
   const l=Math.hypot(r,h);
   g.appendChild(T(cx+W/2+10,base-H/2,'l='+fmt(l),{'font-size':11,fill:'#0e7490','font-weight':800}));
   g.appendChild(T(cx,base+30,'r = '+r,{'font-size':12,fill:'#0f766e','font-weight':800}));
   if(unroll){
    const RL=l*4.4,sweep=360*r/l;
    const ex=cx+330+RL*Math.cos(sweep*Math.PI/180),ey=140-RL*Math.sin(sweep*Math.PI/180);
    g.appendChild(PT('M '+(cx+330)+' 140 L '+(cx+330+RL)+' 140 A '+RL+' '+RL+' 0 '+(sweep>180?1:0)+' 1 '+ex+' '+ey+' Z',{fill:'rgba(8,145,178,.1)',stroke:'#0891b2','stroke-width':2}));
    g.appendChild(T(cx+330,140,'O',{'font-size':12,fill:'#0e7490'}));
    g.appendChild(T(cx+330,258,'unrolled: sector radius l = '+fmt(l)+', arc = 2πr = '+fmt(2*PV()*r)+pnote(),{'font-size':11,fill:'#0e7490'}));
   }
   info.innerHTML='l² = r² + h² → l = '+fmt(l)+' · CSA = πrl = '+fmt(PV()*r*l)+pnote()+' · TSA = πr(l+r) = '+fmt(PV()*r*(l+r))+pnote()+' · V = ⅓πr²h = '+fmt(PV()*r*r*h/3)+pnote()+' · 3 cones fill 1 cylinder!';
  }
  if(mode==='cylinder'){
   const W=r*7,H=Math.min(h*5,160);
   g.appendChild(RC(cx-W,base-H,2*W,H,{fill:'rgba(8,145,178,.1)',stroke:'#0891b2','stroke-width':2.6,rx:6}));
   g.appendChild(NS('ellipse',{cx:cx,cy:base-H,rx:W,ry:12,fill:'rgba(8,145,178,.2)',stroke:'#0891b2','stroke-width':2}));
   g.appendChild(T(cx,base+26,'r = '+r+' · h = '+h,{'font-size':12,fill:'#0f766e','font-weight':800}));
   if(unroll){
    g.appendChild(RC(cx+130,60,2*PV()*r*3.4,H,{fill:'rgba(8,145,178,.08)',stroke:'#0891b2','stroke-width':2}));
    g.appendChild(T(cx+130+PV()*r*3.4,50,'width = 2πr = '+fmt(2*PV()*r)+pnote()+' × height h = '+h,{'font-size':11,fill:'#0e7490'}));
   }
   info.innerHTML='CSA = 2πrh = '+fmt(2*PV()*r*h)+pnote()+' · TSA = 2πr(r+h) = '+fmt(2*PV()*r*(r+h))+pnote()+' · V = πr²h = '+fmt(PV()*r*r*h)+pnote()+' = '+fmt(PV()*r*r*h/1000)+' L · the label peels into a 2πr × h rectangle!';
  }
  if(mode==='sphere'){
   const W=Math.min(r*7,110);
   g.appendChild(CR(cx,130,W,{fill:'rgba(8,145,178,.12)',stroke:'#0891b2','stroke-width':2.6}));
   g.appendChild(NS('ellipse',{cx:cx,cy:130,rx:W,ry:W*0.32,fill:'none',stroke:'#0891b2','stroke-width':1.4,'stroke-dasharray':'4 3'}));
   g.appendChild(T(cx,130+W+22,'r = '+r,{'font-size':12,fill:'#0f766e','font-weight':800}));
   info.innerHTML='Sphere SA = 4πr² = '+fmt(4*PV()*r*r)+pnote()+' · Hemisphere: CSA 2πr² = '+fmt(2*PV()*r*r)+', TSA 3πr² = '+fmt(3*PV()*r*r)+pnote()+' · V(sphere) = 4/3 πr³ = '+fmt(4*PV()*r*r*r/3)+pnote()+' · (r=7 classics: 616, 308, 462!)';
  }
  api.touch();
 }
 addTabs(ctl,['Cone','Cylinder','Sphere'],['cone','cylinder','sphere'].indexOf(mode),i=>{
  LABS.solid(box,ctl,{mode:['cone','cylinder','sphere'][i]},api);
 });
 addSlider(ctl,'radius r',2,15,r,1,v=>{r=v;draw()});
 addSlider(ctl,mode==='sphere'?'(sphere ignores h)':'height h',2,30,h,1,v=>{h=v;draw()});
 const bctl=document.createElement('div');bctl.className='ctlrow';ctl.appendChild(bctl);
 addBtn(bctl,'🪄 Unroll / fold','btn-p',()=>{unroll=!unroll;draw();SFX.step();api.touch()});
 draw();
};

/* ---------- 20. DATA DESK ---------- */
LABS.stats=function(box,ctl,opts,api){
 box.innerHTML='';const s=makeSVG(560,270);box.appendChild(s);
 const g=s.appendChild(NS('g',{}));
 const mode=opts.mode||'table';
 const info=readout(ctl,'');
 const scores=[6,2,0,4,6,1,3,5,2,6,0,4,7,3,2,5,1,4,6,2];
 let freqs=[4,7,12,5,2];
 let data=[4,6,5,6,9];
 const px=x=>60+x*24,py=y=>235-y*10;
 function draw(){
  g.innerHTML='';
  if(mode==='table'){
   const counts={};scores.forEach(v=>counts[v]=(counts[v]||0)+1);
   let yy=30;
   g.appendChild(T(150,yy-14,'value',{'font-size':11,fill:'#6d6a85'}));
   g.appendChild(T(280,yy-14,'tally',{'font-size':11,fill:'#6d6a85'}));
   g.appendChild(T(420,yy-14,'frequency',{'font-size':11,fill:'#6d6a85'}));
   for(let v=0;v<=7;v++){
    const f=counts[v]||0;if(!f&&v>6)continue;
    const tally='|'.repeat(Math.min(f,5))+(f>5?' ⊘':'');
    g.appendChild(T(150,yy,v,{'font-size':12,fill:'#3f3c58'}));
    g.appendChild(T(280,yy,tally,{'font-size':14,fill:'#0f766e'}));
    g.appendChild(T(420,yy,String(f),{'font-size':12,fill:'#312e81','font-weight':800}));
    yy+=22;
   }
   const mx=Math.max(...scores),mn=Math.min(...scores);
   info.innerHTML='Range = '+mx+' − '+mn+' = <b>'+(mx-mn)+'</b> · frequency of 2 = <b>'+counts[2]+'</b> · the table turns 20 messy scores into an instant story.';
  }
  if(mode==='chart'){
   freqs.forEach((f,i)=>{
    const bw=70,gap=mode2===0?14:0;
    g.appendChild(RC(70+i*(bw+gap),235-f*12,bw,f*12,{fill:'url(#expgrad)',stroke:'#4f46e5','stroke-width':1.5,rx:mode2===0?8:2}));
    g.appendChild(T(70+i*(bw+gap)+bw/2,248,((i*20)+'-'+(i*20+20)),{'font-size':10,fill:'#6d6a85'}));
    g.appendChild(T(70+i*(bw+gap)+bw/2,235-f*12-8,String(f),{'font-size':12,fill:'#312e81','font-weight':800}));
   });
   const mi=freqs.indexOf(Math.max(...freqs));
   info.innerHTML=(mode2===0?'BAR GRAPH (gaps = separate categories)':'HISTOGRAM (bars TOUCH = continuous classes)')+' · modal class '+((mi*20)+'-'+(mi*20+20))+' with '+freqs[mi]+' students · total = '+freqs.reduce((a,b)=>a+b,0)+'.';
  }
  if(mode==='averages'){
   const sorted=[...data].sort((x,y)=>x-y);
   const mean=data.reduce((a,b)=>a+b,0)/data.length;
   const n=sorted.length;
   const med=n%2?sorted[(n-1)/2]:(sorted[n/2-1]+sorted[n/2])/2;
   const cnt={};let mode2v=null,mc=0;
   data.forEach(v=>{cnt[v]=(cnt[v]||0)+1;if(cnt[v]>mc){mc=cnt[v];mode2v=v}});
   data.forEach(v=>{
    g.appendChild(CR(px(v),205,7,{fill:'#0d9488',opacity:.85}));
   });
   g.appendChild(LN(px(0),205,px(15),205,{stroke:'#26243a','stroke-width':2}));
   for(let i=0;i<=15;i+=3){g.appendChild(T(px(i),226,String(i),{'font-size':10,fill:'#6d6a85'}))}
   g.appendChild(NS('path',{d:'M '+px(mean)+' 195 l -6 -12 h 12 z',fill:'#e11d48'}));
   g.appendChild(T(px(mean),172,'mean '+fmt(mean),{'font-size':11,fill:'#be185d','font-weight':800}));
   g.appendChild(LN(px(med),185,px(med),218,{stroke:'#d97706','stroke-width':3}));
   g.appendChild(T(px(med),238,'median',{'font-size':10,fill:'#b45309'}));
   if(mc>1){g.appendChild(T(px(mode2v),188,'★',{'font-size':16,fill:'#7c3aed'}));g.appendChild(T(px(mode2v),158,'mode',{'font-size':10,fill:'#6d28d9'}))}
   info.innerHTML='Data: ['+data.join(', ')+'] · mean = '+fmt(mean)+' · median = '+fmt(med)+' (sorted: '+sorted.join(', ')+') · mode = '+(mc>1?mode2v+' (×'+mc+')':'none')+'. Try adding a 50 — watch who survives!';
  }
  api.touch();
 }
 let mode2=0;
 if(mode==='chart'){
  addTabs(ctl,['Bar graph','Histogram'],0,i=>{mode2=i;draw()});
  addSlider(ctl,'freq 0–20',0,20,freqs[0],1,v=>{freqs[0]=v;draw()});
  addSlider(ctl,'freq 20–40',0,20,freqs[1],1,v=>{freqs[1]=v;draw()});
  addSlider(ctl,'freq 40–60',0,20,freqs[2],1,v=>{freqs[2]=v;draw()});
  addSlider(ctl,'freq 60–80',0,20,freqs[3],1,v=>{freqs[3]=v;draw()});
  addSlider(ctl,'freq 80–100',0,20,freqs[4],1,v=>{freqs[4]=v;draw()});
 }
 if(mode==='averages'){
  const bctl=document.createElement('div');bctl.className='ctlrow';ctl.appendChild(bctl);
  addBtn(bctl,'➕ add value','btn-s',()=>{data.push(R(1,12));draw();SFX.click()});
  addBtn(bctl,'➖ remove last','btn-s',()=>{if(data.length>2){data.pop();draw()}});
  addBtn(bctl,'💥 add 50 (outlier!)','btn-gold',()=>{data.push(50);draw();SFX.hit();api.touch()});
  addBtn(bctl,'🧹 reset','btn-g',()=>{data=[4,6,5,6,9];draw()});
 }
 if(mode==='table'){
  const bctl=document.createElement('div');bctl.className='ctlrow';ctl.appendChild(bctl);
  addBtn(bctl,'🎲 new match data','btn-s',()=>{for(let i=0;i<20;i++)scores[i]=R(0,7);draw();SFX.click();api.touch()});
 }
 draw();
};
</script>
