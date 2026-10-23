<script>
'use strict';
/* ================= LAB ENGINES · part 2 ================= */

/* ---------- 8. CARTESIAN ---------- */
LABS.coord=function(box,ctl,opts,api){
 box.innerHTML='';const s=makeSVG(440,360);box.appendChild(s);
 const U=27,CX=220,CY=180;
 for(let i=-7;i<=7;i++)s.appendChild(LN(CX+i*U,12,CX+i*U,348,{stroke:'#e9e5f0'}));
 for(let j=-6;j<=6;j++)s.appendChild(LN(20,CY+j*U,420,CY+j*U,{stroke:'#e9e5f0'}));
 s.appendChild(LN(10,CY,430,CY,{stroke:'#26243a','stroke-width':2.2}));
 s.appendChild(LN(CX,5,CX,355,{stroke:'#26243a','stroke-width':2.2}));
 for(let i=-6;i<=6;i+=2){if(i)s.appendChild(T(CX+i*U,CY+14,String(i),{'font-size':9,fill:'#6d6a85'}))}
 for(let j=-4;j<=4;j+=2){if(j)s.appendChild(T(CX-11,CY-j*U+4,String(j),{'font-size':9,fill:'#6d6a85'}))}
 s.appendChild(T(425,166,'x',{'font-size':14,fill:'#3f3c58','font-style':'italic'}));
 s.appendChild(T(232,16,'y',{'font-size':14,fill:'#3f3c58','font-style':'italic'}));
 s.appendChild(T(CX-10,CY+14,'O',{'font-size':11,fill:'#6d6a85'}));
 const qnames=['Quadrant I (+,+)=Quadrant II (−,+)=Quadrant III (−,−)=Quadrant IV (+,−)'.split('=')];
 const qlabs=[['I',330,50],['II',100,50],['III',100,310],['IV',330,310]];
 const qg=s.appendChild(NS('g',{}));
 qlabs.forEach(q=>qg.appendChild(T(q[1],q[2],q[0],{'font-size':26,'font-weight':800,fill:'rgba(124,58,237,.14)','font-family':'Outfit'})));
 const dots=s.appendChild(NS('g',{}));
 const mode=opts.mode||'explore';
 let streak=0,target=null;
 function addDot(x,y){
  const d=CR(CX+x*U,CY-y*U,6,{fill:'#e11d48',stroke:'#fff','stroke-width':2});
  const t=T(CX+x*U+(x>=0?16:-16),CY-y*U-8,'('+x+', '+y+')',{'font-size':11,fill:'#be185d','text-anchor':x>=0?'start':'end'});
  dots.appendChild(d);dots.appendChild(t);
  const q=(x>0&&y>0)?'I':(x<0&&y>0)?'II':(x<0&&y<0)?'III':(x>0&&y<0)?'IV':'axis';
  const msg=x===0||y===0?'('+x+', '+y+') sits ON an axis (the '+(x===0?'y':'x')+'-axis) — no quadrant!':'('+x+', '+y+') → Quadrant '+q;
  readout(ctl,msg);SFX.click();api.touch();
 }
 s.addEventListener('pointerdown',e=>{
  const p=svgPoint(s,e);
  const gx=clamp(Math.round((p.x-CX)/U),-6,6),gy=clamp(Math.round((CY-p.y)/U),-5,5);
  if(mode==='catch'){
   if(gx===target[0]&&gy===target[1]){
    streak++;SFX.ok();burst(18);addDot(gx,gy);newTarget();
    readout(ctl,'🎯 CAUGHT! Streak: '+streak+' — next: ('+target[0]+', '+target[1]+')');
   }else{
    SFX.no();api.touch();
    readout(ctl,'Not quite — you clicked ('+gx+', '+gy+'). Target: ('+target[0]+', '+target[1]+'). Walk '+target[0]+' in x (right+ / left−), climb '+target[1]+' in y (up+ / down−).');
   }
  }else addDot(gx,gy);
 });
 function newTarget(){
  target=[R(-5,5),R(-4,4)];
  if(target[0]===0&&target[1]===0)target[0]=3;
  const tg=document.createElement('div');tg.className='readout';tg.innerHTML='🎯 CATCH: <b>(' + target[0] + ', ' + target[1] + ')</b> · streak ' + streak;
  const old=ctl.querySelector('.readout');if(old)old.replaceWith(tg);
 }
 if(mode==='catch'){newTarget()}
 else readout(ctl,'Click anywhere on the grid to drop a point. Watch the quadrant labels and the sign rules!');
};

/* ---------- 9. LINE GRAPHER ---------- */
LABS.lineg=function(box,ctl,opts,api){
 box.innerHTML='';const s=makeSVG(480,340);box.appendChild(s);
 const U=20,CX=240,CY=170;
 for(let i=-11;i<=11;i++)s.appendChild(LN(CX+i*U,10,CX+i*U,330,{stroke:'#eef0f6'}));
 for(let j=-8;j<=8;j++)s.appendChild(LN(20,CY+j*U,460,CY+j*U,{stroke:'#eef0f6'}));
 s.appendChild(LN(10,CY,470,CY,{stroke:'#26243a','stroke-width':2.2}));
 s.appendChild(LN(CX,5,CX,335,{stroke:'#26243a','stroke-width':2.2}));
 const mode=opts.mode||'draw';
 let m=1,c=2,k=0,vert=false;
 const lineEl=PT('',{stroke:'#2563eb','stroke-width':3.2});
 const dots=s.appendChild(NS('g',{}));
 s.appendChild(lineEl);
 const px=x=>CX+x*U,py=y=>CY-y*U;
 function draw(){
  dots.innerHTML='';
  if(mode==='story'){
   const y=m*k+c;
   lineEl.setAttribute('d','M '+px(-11)+' '+py(m*-11+c)+' L '+px(11)+' '+py(m*11+c));
   if(k>=-11&&k<=11){
    dots.appendChild(LN(px(k),py(y),px(k),CY,{stroke:'#d97706','stroke-dasharray':'4 3'}));
    dots.appendChild(CR(px(k),py(y),7,{fill:'#f59e0b',stroke:'#fff','stroke-width':2}));
    dots.appendChild(T(px(k),py(y)-14,'('+k+', '+fmt(y)+')',{'font-size':12,fill:'#b45309'}));
   }
   readout(ctl,'Fare line: <b>y = '+m+'x + '+c+'</b> · ride '+k+' km → y = '+m+'('+k+') + '+c+' = <b>₹'+fmt(m*k+c)+'</b>. Every fare lives on this line!');
  }else if(vert){
   lineEl.setAttribute('d','M '+px(k)+' 5 L '+px(k)+' 335');
   readout(ctl,'<b>x = '+k+'</b> — a VERTICAL line. Every point on it has x = '+k+': it never crosses the y-axis'+(k===0?' (it IS the y-axis)':'')+'.');
  }else{
   lineEl.setAttribute('d','M '+px(-11)+' '+py(m*-11+c)+' L '+px(11)+' '+py(m*11+c));
   if(Math.abs(c)<=8){
    dots.appendChild(CR(px(0),py(c),6,{fill:'#059669',stroke:'#fff','stroke-width':2}));
    dots.appendChild(T(px(0)+22,py(c),'(0, '+fmt(c)+')',{'font-size':10,fill:'#047857'}));
   }
   if(m!==0&&Math.abs(-c/m)<=11){
    dots.appendChild(CR(px(-c/m),py(0),6,{fill:'#e11d48',stroke:'#fff','stroke-width':2}));
    dots.appendChild(T(px(-c/m),py(0)+18,'('+fmt(-c/m)+', 0)',{'font-size':10,fill:'#be185d'}));
   }
   readout(ctl,'<b>y = '+m+'x + '+c+'</b> · slope '+m+' · y-cut (0, '+fmt(c)+') · x-cut ('+fmt(-c/m)+', 0)'+(c===0?' · passes through the ORIGIN!':''));
  }
  api.touch();
 }
 if(mode==='table'){
  readout(ctl,'Press the buttons to plot solutions of <b>2x + 3y = 12</b> — then watch them line up!');
  const tctl=document.createElement('div');tctl.className='ctlrow';ctl.appendChild(tctl);
  [0,1,2,3,6].forEach(x0=>{
   addBtn(tctl,'x='+x0,'btn-s',()=>{
    const y0=(12-2*x0)/3;
    if(Math.abs(y0)>8)return;
    dots.appendChild(CR(px(x0),py(y0),7,{fill:'#059669',stroke:'#fff','stroke-width':2}));
    dots.appendChild(T(px(x0)+4,py(y0)-12,'('+x0+', '+fmt(y0)+')',{'font-size':11,fill:'#047857'}));
    lineEl.setAttribute('d','M '+px(-3)+' '+py((12-2*-3)/3)+' L '+px(7)+' '+py((12-14)/3));
    SFX.click();api.touch();
    readout(ctl,'('+x0+', '+fmt(y0)+') added. All solutions of 2x + 3y = 12 lie on ONE straight line — that is the graph.');
   });
  });
  addBtn(tctl,'🧹 clear','btn-g',()=>{dots.innerHTML=''});
  draw();lineEl.setAttribute('d','');
 }else{
  addTabs(ctl,['y = mx + c','vertical x = k'],0,i=>{vert=i===1;draw()});
  addSlider(ctl,'m (slope)',-3,3,m,1,v=>{m=v;draw()});
  addSlider(ctl,'c',-5,5,c,1,v=>{c=v;draw()});
  addSlider(ctl,'k / km',-10,10,k,1,v=>{k=v;draw()});
  draw();
 }
};

/* ---------- 10. POSTULATE DECK ---------- */
LABS.post=function(box,ctl,opts,api){
 box.innerHTML='';const s=makeSVG(520,210);box.appendChild(s);
 const cards=opts.set==='theorems'?[
  {t:'Theorem 5.1',d:'Two distinct lines cannot have more than one point in common.',f:s2=>{s2.appendChild(CR(200,80,5,{fill:'#e11d48'}));s2.appendChild(CR(320,80,5,{fill:'#e11d48'}));s2.appendChild(LN(140,140,380,60,{stroke:'#2563eb','stroke-width':3}));s2.appendChild(T(260,40,'two points → ONE line',{'font-size':12,fill:'#3f3c58'}))}},
  {t:'Proof by contradiction',d:'Suppose two lines shared TWO points P and Q. Then both pass through P and Q — but Postulate 1 says that line is UNIQUE. So they were the same line. Contradiction! ∎',f:s2=>{s2.appendChild(T(260,95,'l ≠ m, but l and m both pass P & Q',{'font-size':13,fill:'#3f3c58'}));s2.appendChild(T(260,130,'→ l = m  ✗ contradiction',{'font-size':15,fill:'#be185d','font-weight':800}))}},
  {t:'Playfair\'s version',d:'Through a point NOT on a line, exactly ONE parallel can be drawn.',f:s2=>{s2.appendChild(LN(80,160,440,160,{stroke:'#26243a','stroke-width':2.5}));s2.appendChild(CR(260,80,5,{fill:'#e11d48'}));s2.appendChild(T(272,72,'P',{'font-size':13,fill:'#be185d'}));s2.appendChild(LN(100,110,420,110,{stroke:'#2563eb','stroke-width':2.5}));s2.appendChild(T(440,104,'the unique parallel',{'font-size':11,fill:'#2563eb'}))}},
  {t:'Sum version',d:'If co-interior angles sum to 180°, the lines are parallel — and conversely. This is the 5th postulate in working clothes.',f:s2=>{s2.appendChild(LN(80,170,440,170,{stroke:'#26243a','stroke-width':2.5}));s2.appendChild(LN(140,170,340,40,{stroke:'#26243a','stroke-width':2.5}));s2.appendChild(LN(80,40,440,40,{stroke:'#26243a','stroke-width':2.5}));s2.appendChild(T(180,160,'70°',{'font-size':12,fill:'#047857'}));s2.appendChild(T(180,60,'110°',{'font-size':12,fill:'#047857'}));s2.appendChild(T(300,110,'70 + 110 = 180° ⇒ parallel ✓',{'font-size':12,fill:'#047857'}))}}
 ]:[
  {t:'Postulate 1',d:'A straight line may be drawn from any one point to any other point — through TWO distinct points there is exactly ONE line.',f:s2=>{s2.appendChild(CR(160,100,5,{fill:'#e11d48'}));s2.appendChild(CR(360,100,5,{fill:'#e11d48'}));s2.appendChild(LN(160,100,360,100,{stroke:'#2563eb','stroke-width':3}));s2.appendChild(T(260,80,'unique line',{'font-size':12,fill:'#2563eb'}))}},
  {t:'Postulate 2',d:'A terminated line (segment) can be extended endlessly in BOTH directions.',f:s2=>{s2.appendChild(LN(60,100,460,100,{stroke:'#2563eb','stroke-width':2.5}));s2.appendChild(NS('path',{d:'M 460 100 l -12 -5 v 10 z',fill:'#2563eb'}));s2.appendChild(NS('path',{d:'M 60 100 l 12 -5 v 10 z',fill:'#2563eb'}));s2.appendChild(T(260,70,'extend forever ↔',{'font-size':12,fill:'#3f3c58'}))}},
  {t:'Postulate 3',d:'A circle can be drawn with ANY centre and ANY radius.',f:s2=>{s2.appendChild(CR(260,105,60,{fill:'none',stroke:'#7c3aed','stroke-width':2.5}));s2.appendChild(CR(260,105,4,{fill:'#7c3aed'}));s2.appendChild(LN(260,105,320,105,{stroke:'#7c3aed','stroke-dasharray':'4 3'}));s2.appendChild(T(295,96,'r',{'font-size':12,fill:'#7c3aed','font-style':'italic'}))}},
  {t:'Postulate 4',d:'All right angles are equal to one another — 90° anywhere in the universe.',f:s2=>{[[130,150],[260,150],[390,150]].forEach(p=>{s2.appendChild(PT('M '+(p[0]-22)+' '+p[1]+' L '+(p[0]-22)+' '+(p[1]-22)+' L '+p[0]+' '+(p[1]-22),{stroke:'#d97706','stroke-width':2}));s2.appendChild(T(p[0],p[1]+16,'90°',{'font-size':11,fill:'#b45309'}))})}},
  {t:'Postulate 5 · the famous one',d:'If a transversal makes the interior angles on one side sum to LESS than 180°, the two lines meet on that side.',f:s2=>{s2.appendChild(LN(80,160,440,160,{stroke:'#26243a','stroke-width':2.5}));s2.appendChild(LN(120,160,300,30,{stroke:'#26243a','stroke-width':2.5}));s2.appendChild(LN(90,40,450,40,{stroke:'#26243a','stroke-width':2.5}));s2.appendChild(T(190,150,'100°',{'font-size':12,fill:'#be185d'}));s2.appendChild(T(210,55,'70°',{'font-size':12,fill:'#be185d'}));s2.appendChild(T(400,110,'100+70 < 180 → they MEET here →',{'font-size':11,fill:'#be185d'}))}},
  {t:'Axiom sampler',d:'“Things equal to the same thing are equal.” · “Equals added to equals are equal.” · “Halves of the same thing are equal.” — the everyday glue of every proof.',f:s2=>{s2.appendChild(T(260,80,'A = B ,  B = C',{'font-size':16,fill:'#3f3c58'}));s2.appendChild(T(260,125,'∴ A = C',{'font-size':20,fill:'#047857','font-weight':800}))}}
 ];
 let idx=0;
 const stage=s.appendChild(NS('g',{}));
 const title=T(260,28,'',{'font-size':16,'font-weight':800,fill:'#312e81','font-family':'Outfit'});
 const body=NS('foreignObject',{x:40,y:130,width:440,height:70});
 const bodyDiv=document.createElement('div');bodyDiv.style.cssText='font:13px Inter,sans-serif;color:#3f3c58;text-align:center;line-height:1.5';
 body.appendChild(bodyDiv);
 s.appendChild(title);s.appendChild(body);
 function draw(){
  stage.innerHTML='';
  cards[idx].f(stage);
  title.textContent=cards[idx].t;
  bodyDiv.textContent=cards[idx].d;
  dots2();
 }
 const bctl=document.createElement('div');bctl.className='ctlrow';ctl.appendChild(bctl);
 const prevB=addBtn(bctl,'← Prev','btn-g',()=>{idx=(idx-1+cards.length)%cards.length;draw();SFX.click();api.touch()});
 const dotsEl=document.createElement('span');dotsEl.className='qdots';dotsEl.style.margin='0 6px';bctl.appendChild(dotsEl);
 const nextB=addBtn(bctl,'Next →','btn-p',()=>{idx=(idx+1)%cards.length;draw();SFX.step();api.touch()});
 function dots2(){dotsEl.innerHTML='';cards.forEach((_,i)=>{const d=document.createElement('span');d.className='qdot'+(i===idx?' cur':'');d.style.width='12px';dotsEl.appendChild(d)})}
 draw();
 readout(ctl,opts.set==='theorems'?'Walk the theorem cards: one proof, two equivalent versions of the 5th postulate.':'Walk all five postulates (plus an axiom sampler). These cards ARE the syllabus.');
};

/* ---------- 11. TRANSVERSAL ---------- */
LABS.trans=function(box,ctl,opts,api){
 box.innerHTML='';const s=makeSVG(520,300);box.appendChild(s);
 const pair=opts.mode==='pair';
 const CXG=260,CYG=150;
 let ang=50,spread=pair?40:46;
 const g=s.appendChild(NS('g',{}));
 let hi=-1;
 const info=readout(ctl,'');
 function draw(){
  g.innerHTML='';
  const rad=ang*Math.PI/180;
  if(pair){
   const L=170;
   const x1=CXG-L*Math.cos(rad),y1=CYG+L*Math.sin(rad),x2=CXG+L*Math.cos(rad),y2=CYG-L*Math.sin(rad);
   g.appendChild(LN(x1,y1,x2,y2,{stroke:'#e11d48','stroke-width':3}));
   const x3=CXG-L*Math.cos((180-ang)*Math.PI/180),y3=CYG+L*Math.sin((180-ang)*Math.PI/180),x4=CXG+L*Math.cos((180-ang)*Math.PI/180),y4=CYG-L*Math.sin((180-ang)*Math.PI/180);
   g.appendChild(LN(x3,y3,x4,y4,{stroke:'#2563eb','stroke-width':3}));
   const A=ang,B=180-ang;
   const arcs=[[ang,'a',A,CXG,CYG],[ang+90,'b',B],[180+ang,'c',A],[270+ang,'d',B]];
   g.appendChild(ARC(CXG,CYG,26,0,ang,{stroke:'#e11d48','stroke-width':2.5}));
   g.appendChild(ARC(CXG,CYG,38,ang,180,{stroke:'#d97706','stroke-width':2.5}));
   g.appendChild(ARC(CXG,CYG,26,180,180+ang,{stroke:'#e11d48','stroke-width':2.5}));
   g.appendChild(ARC(CXG,CYG,38,180+ang,360,{stroke:'#d97706','stroke-width':2.5}));
   const lx=CXG+(58)*Math.cos(rad/2),ly=CYG-58*Math.sin(rad/2);
   const lb=ANG(CXG,CYG,54,ang/2,A,'#e11d48');
   const lb2=ANG(CXG,CYG,66,ang+(180-ang)/2,B,'#d97706');
   const lb3=ANG(CXG,CYG,54,180+ang/2,A,'#e11d48');
   const lb4=ANG(CXG,CYG,66,270+ang/2,B,'#d97706');
   g.appendChild(lb);g.appendChild(lb2);g.appendChild(lb3);g.appendChild(lb4);
   info.innerHTML='Vertically opposite: <b>a = c = '+A+'°</b> · <b>b = d = '+B+'°</b> · Linear pairs: a + b = 180° ✓. Drag the slider — opposites NEVER disagree.';
  }else{
   const L=190,dy=spread;
   const t1x=CXG-L*Math.cos(rad),t1y=CYG-dy-L*Math.sin(rad),t2x=CXG+L*Math.cos(rad),t2y=CYG-dy+L*Math.sin(rad);
   g.appendChild(LN(-10,CYG-dy,530,CYG-dy,{stroke:'#26243a','stroke-width':2.5}));
   g.appendChild(LN(-10,CYG+dy,530,CYG+dy,{stroke:'#26243a','stroke-width':2.5}));
   g.appendChild(LN(t1x,t1y,t2x,t2y,{stroke:'#7c3aed','stroke-width':3}));
   const tx1=CXG+dy/Math.tan(rad),tx2=CXG-dy/Math.tan(rad);
   const A=ang,B=180-ang;
   const pos=(cx,cy,r,a)=>({x:cx+r*Math.cos(a*Math.PI/180),y:cy-r*Math.sin(a*Math.PI/180)});
   const marks=[[tx1,CYG-dy,A,'#7c3aed','1',0,ang],[tx1,CYG-dy,B,'#d97706','2',ang,180],[tx1,CYG-dy,A,'#7c3aed','3',180,180+ang],[tx1,CYG-dy,B,'#d97706','4',270,360],[tx2,CYG+dy,A,'#7c3aed','5',0,ang],[tx2,CYG+dy,B,'#d97706','6',ang,180],[tx2,CYG+dy,A,'#7c3aed','7',180,180+ang],[tx2,CYG+dy,B,'#d97706','8',270,360]];
   const clickable=[];
   marks.forEach((mk,i)=>{
    const arc=ARC(mk[0],mk[1],22,mk[5],mk[6],{stroke:mk[3],'stroke-width':hi===i?4:2});
    g.appendChild(arc);
    const lp=pos(mk[0],mk[1],34,(mk[5]+mk[6])/2);
    const lb=T(lp.x,lp.y+4,mk[4],{'font-size':11,fill:mk[3],'font-weight':800});
    g.appendChild(lb);clickable.push([lb,i]);
   });
   const msg=hi<0?'Tap any angle label to meet its partners. Corresponding = same slot clone (equal); Alternate INTERIOR = Z-shape inside (equal); Co-interior = C-shape inside (sum 180°).':'';
   const corr={0:4,1:5,2:6,3:7,4:0,5:1,6:2,7:3};
   const vert={0:2,2:0,1:3,3:1,4:6,6:4,5:7,7:5};
   const lin={0:1,1:0,2:3,3:2,4:5,5:4,6:7,7:6};
   const altInt={2:4,4:2,3:5,5:3};
   const coInt={2:5,5:2,3:4,4:3};
   const val=i=>(i===0||i===2||i===4||i===6)?A:B;
   if(hi>=0){
    const c=corr[hi],v=vert[hi],lp2=lin[hi];
    let m='Angle '+(hi+1)+' = '+val(hi)+'° · CORRESPONDING angle '+(c+1)+' = '+val(c)+'° (EQUAL ✓) · Vertically opposite angle '+(v+1)+' = '+val(v)+'° (EQUAL ✓) · Linear-pair angle '+(lp2+1)+' = '+val(lp2)+'° (together '+(val(hi)+val(lp2))+'° ✓)';
    if(altInt[hi]!==undefined){const al=altInt[hi];m+=' · ALTERNATE INTERIOR angle '+(al+1)+' = '+val(al)+'° (EQUAL ✓)'}
    if(coInt[hi]!==undefined){const co=coInt[hi];m+=' · CO-INTERIOR angle '+(co+1)+' = '+val(co)+'° (together '+(val(hi)+val(co))+'° = 180° ✓)'}
    info.innerHTML=m;
   }else info.innerHTML=msg+' Top angles: '+A+'° / '+B+'° · bottom angles identical (parallel lines!). Drag the slider to tilt the transversal.';
   clickable.forEach(([lb,i])=>{lb.style.cursor='pointer';lb.addEventListener('click',()=>{hi=i;draw();SFX.click();api.touch()})});
  }
 }
 function ANG(cx,cy,r,aMid,v,col){
  const p={x:cx+r*Math.cos(aMid*Math.PI/180),y:cy-r*Math.sin(aMid*Math.PI/180)};
  return T(p.x,p.y,v+'°',{'font-size':12,fill:col,'font-weight':800});
 }
 addSlider(ctl,pair?'Rotate ray':'Tilt transversal',20,75,ang,1,v=>{ang=v;draw()});
 if(!pair){addSlider(ctl,'Spread between lines',26,60,spread,1,v=>{spread=v;draw()})}
 draw();
};

/* ---------- 12. TRIANGLE ANGLE SUM ---------- */
LABS.trisum=function(box,ctl,opts,api){
 box.innerHTML='';const s=makeSVG(480,320);box.appendChild(s);
 const g=s.appendChild(NS('g',{}));
 const B={x:90,y:270},C={x:390,y:270};
 let A={x:240,y:80};
 const ext=s.appendChild(NS('g',{}));
 let showExt=false;
 function angles(){}
 function angAt(P,Q,Rv){
  const v1={x:Q.x-P.x,y:Q.y-P.y},v2={x:Rv.x-P.x,y:Rv.y-P.y};
  const dot=v1.x*v2.x+v1.y*v2.y,m1=Math.hypot(v1.x,v1.y),m2=Math.hypot(v2.x,v2.y);
  return Math.acos(clamp(dot/(m1*m2),-1,1))*180/Math.PI;
 }
 function draw(){
  g.innerHTML='';ext.innerHTML='';
  const aA=angAt(A,B,C),aB=angAt(B,A,C),aC=angAt(C,A,B);
  g.appendChild(PT('M '+B.x+' '+B.y+' L '+A.x+' '+A.y+' L '+C.x+' '+C.y+' Z',{fill:'rgba(234,88,12,.08)',stroke:'#ea580c','stroke-width':2.6}));
  const arc=(P,Q,Rv,col)=>{const a1=Math.atan2(Q.y-P.y,Q.x-P.x)*180/Math.PI,a2=Math.atan2(Rv.y-P.y,Rv.x-P.x)*180/Math.PI;g.appendChild(ARC(P.x,P.y,26,a1,a2,{stroke:col,'stroke-width':2.4}))};
  arc(A,B,C,'#e11d48');arc(B,A,C,'#2563eb');arc(C,A,B,'#059669');
  const lab=(P,Q,Rv,v,col,off)=>{const a1=Math.atan2(Q.y-P.y,Q.x-P.x),a2=Math.atan2(Rv.y-P.y,Rv.x-P.x);let am=(a1+a2)/2;if(Math.abs(a1-a2)>Math.PI)am+=Math.PI;const r=44+(off||0);g.appendChild(T(P.x+r*Math.cos(am),P.y+r*Math.sin(am)+4,v+'°',{'font-size':12,fill:col,'font-weight':800}))};
  lab(A,B,C,fmt(aA),'#be185d');lab(B,C,A,fmt(aB),'#1d4ed8');lab(C,A,B,fmt(aC),'#047857');
  const node=CR(A.x,A.y,11,{fill:'#f97316',stroke:'#fff','stroke-width':2.5,style:'cursor:grab'});
  g.appendChild(node);
  makeDrag(s,node,p=>{A={x:clamp(p.x,120,360),y:clamp(p.y,50,250)};draw();api.touch()});
  if(showExt){
   const a1=Math.atan2(A.y-C.y,A.x-C.x);
   const ex={x:C.x+70*Math.cos(-a1),y:C.y+70*Math.sin(-a1)};
   ext.appendChild(LN(C.x,C.y,C.x+90,C.y,{stroke:'#26243a','stroke-dasharray':'6 4'}));
   ext.appendChild(ARC(C.x,C.y,30,0,a1*180/Math.PI,{stroke:'#7c3aed','stroke-width':2.6}));
   ext.appendChild(T(C.x+52,C.y-16,fmt(aB+aA)+'°',{'font-size':12,fill:'#6d28d9','font-weight':800}));
   ext.appendChild(T(C.x+70,C.y+22,'exterior = A + B ✓',{'font-size':11,fill:'#6d28d9'}));
  }
  readout(ctl,'∠A = '+fmt(aA)+'° · ∠B = '+fmt(aB)+'° · ∠C = '+fmt(aC)+'° → sum = <b>'+fmt(aA+aB+aC)+'°</b> (always 180°, however you drag!)');
 }
 const bctl=document.createElement('div');bctl.className='ctlrow';ctl.appendChild(bctl);
 addBtn(bctl,(showExt?'-hide':'🔦 Show')+' exterior angle','btn-s',()=>{showExt=!showExt;draw();api.touch()});
 draw();
};

/* ---------- 13. CONGRUENCE SNAP ---------- */
LABS.congr=function(box,ctl,opts,api){
 box.innerHTML='';const s=makeSVG(560,300);box.appendChild(s);
 let t1=[4,5,6],t2=[3,5,7];
 const g1=s.appendChild(NS('g',{})),g2=s.appendChild(NS('g',{}));
 const badge=T(280,286,'',{'font-size':16,'font-weight':800,fill:'#047857','font-family':'Outfit'});
 s.appendChild(badge);
 function drawTri(g,baseX,baseY,sc,tri,col,label){
  g.innerHTML='';
  const [s1,s2,s3]=tri;
  const x=(s2*s2+s1*s1-s3*s3)/(2*s1);
  const h2=s2*s2-x*x;
  if(h2<0)return false;
  const h=Math.sqrt(h2);
  const ax=baseX,ay=baseY,bx=baseX+s1*sc,by=baseY,cx=baseX+x*sc,cy=baseY-h*sc;
  g.appendChild(PT('M '+ax+' '+ay+' L '+bx+' '+by+' L '+cx+' '+cy+' Z',{fill:col.replace(')',', .12)').replace('rgb','rgba'),stroke:col,'stroke-width':2.6}));
  g.appendChild(T((ax+bx)/2,ay+16,'s1='+s1,{'font-size':11,fill:col}));
  g.appendChild(T((ax+cx)/2-16,(ay+cy)/2,'s2='+s2,{'font-size':11,fill:col}));
  g.appendChild(T((bx+cx)/2+16,(by+cy)/2,'s3='+s3,{'font-size':11,fill:col}));
  g.appendChild(T(baseX+s1*sc/2,baseY-8,label,{'font-size':13,'font-weight':800,fill:'#3f3c58','font-family':'Outfit'}));
  return true;
 }
 function draw(){
  const ok1=drawTri(g1,40,240,26,t1,'rgb(37,99,235)','Δ 1');
  const same=t1.slice().sort().join()===t2.slice().sort().join();
  const ok2=drawTri(g2,320,240,26,t2,'rgb(219,39,119)','Δ 2');
  if(!ok1||!ok2){badge.textContent='⚠️ those three sides cannot close — triangle inequality fails!';badge.setAttribute('fill','#dc2626');return}
  if(same){
   badge.textContent='CONGRUENT · SSS ✓ — CPCT unlocked: every angle & side matches!';
   badge.setAttribute('fill','#047857');
   if(!LABS.congr._cel){LABS.congr._cel=1;burst(40);SFX.win()}
  }else{badge.textContent='Different side sets → not congruent. Match all three!';badge.setAttribute('fill','#3f3c58')}
  api.touch();
 }
 addSlider(ctl,'Δ1 · side 1',2,9,t1[0],1,v=>{t1[0]=v;draw()});
 addSlider(ctl,'Δ1 · side 2',2,9,t1[1],1,v=>{t1[1]=v;draw()});
 addSlider(ctl,'Δ1 · side 3',2,9,t1[2],1,v=>{t1[2]=v;draw()});
 const hr=document.createElement('hr');hr.className='soft';hr.style.margin='2px 0';ctl.appendChild(hr);
 addSlider(ctl,'Δ2 · side 1',2,9,t2[0],1,v=>{t2[0]=v;draw()});
 addSlider(ctl,'Δ2 · side 2',2,9,t2[1],1,v=>{t2[1]=v;draw()});
 addSlider(ctl,'Δ2 · side 3',2,9,t2[2],1,v=>{t2[2]=v;draw()});
 draw();
 readout(ctl,'Set Δ2 equal to Δ1 (any order) and watch the SSS snap. Note: equal ANGLES alone (AAA) would never snap — size stays free!');
};

/* ---------- 14. ISOSCELES & INEQUALITY ---------- */
LABS.isos=function(box,ctl,opts,api){
 box.innerHTML='';const s=makeSVG(520,290);box.appendChild(s);
 const g=s.appendChild(NS('g',{}));
 const ineq=opts.mode==='ineq';
 let apex=50,a=5,b=6,c=9;
 const info=readout(ctl,'');
 function angAt(P,Q,Rv){const v1={x:Q.x-P.x,y:Q.y-P.y},v2={x:Rv.x-P.x,y:Rv.y-P.y};const dot=v1.x*v2.x+v1.y*v2.y,m1=Math.hypot(v1.x,v1.y),m2=Math.hypot(v2.x,v2.y);return Math.acos(clamp(dot/(m1*m2),-1,1))*180/Math.PI}
 function draw(){
  g.innerHTML='';
  if(!ineq){
   const L=95,baseY=240,cx=260;
   const half=L*Math.sin(apex*Math.PI/180),h=L*Math.cos(apex*Math.PI/180);
   const A={x:cx,y:baseY-h},B={x:cx-half,y:baseY},C={x:cx+half,y:baseY};
   g.appendChild(PT('M '+A.x+' '+A.y+' L '+B.x+' '+B.y+' L '+C.x+' '+C.y+' Z',{fill:'rgba(219,39,119,.09)',stroke:'#db2777','stroke-width':2.6}));
   g.appendChild(LN(A.x,A.y,B.x,B.y,{stroke:'#be185d','stroke-width':4,opacity:.55}));
   g.appendChild(LN(A.x,A.y,C.x,C.y,{stroke:'#be185d','stroke-width':4,opacity:.55}));
   g.appendChild(LN(B.x+8,B.y-4,B.x+28,B.y-4,{stroke:'#047857','stroke-width':2.5}));
   g.appendChild(LN(C.x-28,C.y-4,C.x-8,C.y-4,{stroke:'#047857','stroke-width':2.5}));
   const base=(180-apex)/2;
   g.appendChild(T(cx,baseY+22,(180-apex)/2+'°',{'font-size':13,fill:'#047857','font-weight':800}));
   g.appendChild(T(cx,baseY-h-14,'apex '+apex+'°',{'font-size':13,fill:'#be185d','font-weight':800}));
   info.innerHTML='Equal sides → equal base angles: (180 − '+apex+')/2 = <b>'+base+'° each</b>.'+(apex===60?' Apex 60 → all three 60° → EQUILATERAL!':'');
  }else{
   const valid=a+b>c&&a+c>b&&b+c>a;
   const sc=17;
   const ax=60,ay=240,bx=ax+c*sc,by=240;
   if(valid){
    const x=(a*a+c*c-b*b)/(2*c);
    const h=Math.sqrt(Math.max(0,a*a-x*x));
    const cx2=ax+x*sc,cy2=240-h*sc;
    g.appendChild(PT('M '+ax+' '+ay+' L '+bx+' '+by+' L '+cx2+' '+cy2+' Z',{fill:'rgba(219,39,119,.09)',stroke:'#db2777','stroke-width':2.6}));
    const sides=[[a,'a',ax,ay,cx2,cy2],[b,'b',bx,by,cx2,cy2],[c,'c',ax,ay,bx,by]];
    const big=Math.max(a,b,c);
    sides.forEach(sd=>{
     const mx=(sd[2]+sd[4])/2,my=(sd[3]+sd[5])/2;
     g.appendChild(T(mx,my-6,sd[0]+(sd[0]===big?' ◄ longest':''),{'font-size':11,fill:sd[0]===big?'#be185d':'#3f3c58','font-weight':sd[0]===big?800:400}));
    });
   }else{
    g.appendChild(LN(ax,ay,bx,by,{stroke:'#ef4444','stroke-width':3}));
    g.appendChild(T(260,150,'✗ NO TRIANGLE',{'font-size':20,fill:'#dc2626','font-weight':800,'font-family':'Outfit'}));
   }
   const chk=(p,q,r)=>p+' + '+q+' = '+(p+q)+' '+(p+q>r?'>':'≤')+' '+r+' '+(p+q>r?'✓':'✗');
   info.innerHTML=(valid?'Triangle closes! ':'IMPOSSIBLE! ')+chk(a,b,c)+' · '+chk(a,c,b)+' · '+chk(b,c,a);
  }
  api.touch();
 }
 if(!ineq){addSlider(ctl,'Apex angle',20,140,apex,1,v=>{apex=v;draw()})}
 else{
  addSlider(ctl,'side a',2,12,a,1,v=>{a=v;draw()});
  addSlider(ctl,'side b',2,12,b,1,v=>{b=v;draw()});
  addSlider(ctl,'side c',2,12,c,1,v=>{c=v;draw()});
 }
 draw();
};
</script>
