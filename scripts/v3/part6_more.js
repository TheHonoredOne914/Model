/* ================= ARTIFACTS · REPORTS · FOUNDER · BOOT ================= */

/* ---------- 12 interactive artifacts ---------- */
const ARTIFACTS=[
 {id:"motion",t:"Motion Lab",s:"Set u, a — watch s = ut + ½at² come alive",bg:"#D7E9F5"},
 {id:"atom",t:"Atom Builder",s:"Pick an element — shells fill by the 2n² rule",bg:"#FBE9DF"},
 {id:"circuit",t:"Circuit Lab",s:"Series vs parallel — light the bulbs",bg:"#FFF5ED"},
 {id:"states",t:"States of Matter",s:"Drag temperature — ice → water → steam",bg:"#D7E9F5"},
 {id:"cell",t:"Cell Explorer",s:"Tap organelles, learn their jobs",bg:"#FBE9DF"},
 {id:"sound",t:"Sound Waves",s:"Frequency slider — see the wave, hear the pitch",bg:"#FFF5ED"},
 {id:"timeline",t:"Timeline Explorer",s:"French & Russian revolutions in order",bg:"#FBE9DF"},
 {id:"monsoon",t:"Monsoon Explorer",s:"Season switch — watch the winds flip",bg:"#D7E9F5"},
 {id:"democ",t:"Democracy Detector",s:"Democratic or not? Decide & defend",bg:"#FFF5ED"},
 {id:"india",t:"Physical Features",s:"Tap India's regions — facts on the spot",bg:"#FBE9DF"},
 {id:"identity",t:"Identity Builder",s:"(a+b)² — see it geometrically",bg:"#D7E9F5"},
 {id:"dice",t:"Probability Dice",s:"Roll 100 — watch probability emerge",bg:"#FFF5ED"}
];
function renderArtifacts(){
  $("#artTiles").innerHTML=ARTIFACTS.map(a=>`<div class="art-tile" data-a="${a.id}"><div class="a-ico" style="background:${a.bg}">${a.t[0]}</div><h4>${a.t}</h4><p>${a.s}</p></div>`).join("");
  $("#artTiles").querySelectorAll("[data-a]").forEach(x=>x.onclick=()=>openArtifact(x.dataset.a));
}
function openArtifact(id){
  const a=ARTIFACTS.find(x=>x.id===id);
  openStage(a.t, "tutor", b=>({
    motion:artMotion, atom:artAtom, circuit:artCircuit, states:artStates, cell:artCell, sound:artSound,
    timeline:artTimeline, monsoon:artMonsoon, democ:artDemoc, india:artIndia, identity:artIdentity, dice:artDice
  }[id](b)));
}
function artMotion(b){
  b.innerHTML=`<div class="art-stage"><h4 style="margin-bottom:8px">v = u + at · s = ut + ½at²</h4>
  <div class="sim-ctl"><span class="muted" style="min-width:86px">u (m/s)</span><input type="range" id="mU" min="0" max="30" value="5"><span class="sim-val" id="mUv">5</span></div>
  <div class="sim-ctl"><span class="muted" style="min-width:86px">a (m/s²)</span><input type="range" id="mA" min="-5" max="10" value="2"><span class="sim-val" id="mAv">2</span></div>
  <div id="mTable" style="margin-top:10px"></div></div>`;
  const draw=()=>{ const u=+$("#mU").value,a=+$("#mA").value; $("#mUv").textContent=u; $("#mAv").textContent=a;
    $("#mTable").innerHTML=`<table style="width:100%;font-size:14px;text-align:center;border-collapse:collapse"><tr><th>t(s)</th><th>v(m/s)</th><th>s(m)</th></tr>`+
    [0,1,2,3,4,5].map(t=>{const v=u+a*t,s=u*t+.5*a*t*t;return `<tr style="border-top:1px dashed var(--border)"><td>${t}</td><td>${v}</td><td>${s}</td></tr>`}).join("")+"</table>"+
    `<p class="muted" style="margin-top:8px">a<0 slows it down (deceleration) — exactly why negative acceleration is signed.</p>`;
  };
  $("#mU").oninput=draw; $("#mA").oninput=draw; draw();
}
function artAtom(b){
  const EL=[["H",1],["He",2],["Li",3],["Be",4],["B",5],["C",6],["N",7],["O",8],["F",9],["Ne",10],["Na",11],["Mg",12],["Al",13],["Si",14],["P",15],["S",16],["Cl",17],["Ar",18],["K",19],["Ca",20]];
  b.innerHTML=`<div class="art-stage"><div class="sim-ctl"><span class="muted">Element</span><select id="aEl" style="padding:9px 12px;border-radius:10px;border:1.5px solid var(--border)">${EL.map((e,i)=>`<option value="${i}" ${e[1]===6?"selected":""}>${e[0]} (Z=${e[1]})</option>`).join("")}</select></div>
  <div class="atom-shell" id="aShells"></div><p class="muted" id="aNote" style="text-align:center"></p></div>`;
  const draw=()=>{ const [sym,Z]=EL[+$("#aEl").value];
    const caps=[2,8,8,2]; const shells=[]; let left=Z;
    for(const c of caps){ const take=Math.min(left,c); shells.push(take); left-=take; if(!left)break; }
    $("#aShells").innerHTML=`<div class="atom-orb"><b>${sym}</b>p+n</div>`+shells.map(s=>`<div class="atom-orb"><b>${s}</b>e⁻</div>`).join("");
    $("#aNote").textContent=`Z=${Z} → ${Z} protons, ${Z} electrons in ${shells.length} shell(s): ${shells.join(", ")}. Valence shell: ${shells[shells.length-1]}.`;
  };
  $("#aEl").onchange=draw; draw();
}
function artCircuit(b){
  b.innerHTML=`<div class="art-stage"><div class="row" style="justify-content:center">
  <button class="pill on" id="cSer">Series</button><button class="pill" id="cPar">Parallel</button>
  <span class="muted" style="min-width:80px">Bulbs: <b id="cN">3</b></span><input type="range" id="cR" min="1" max="4" value="3" style="max-width:130px"></div>
  <div class="circuit" id="cBulbs"></div><p class="muted" id="cNote" style="text-align:center"></p></div>`;
  let par=false;
  const draw=()=>{ const n=+$("#cR").value;
    $("#cSer").classList.toggle("on",!par); $("#cPar").classList.toggle("on",par);
    $("#cBulbs").innerHTML=[...Array(n)].map((_,i)=>`<div class="c-bulb ${par?"lit":n===1?"lit":""}" style="${par?"":"opacity:"+(1-(n-1)*.18)}">B${i+1}</div>`).join("")+`<div class="atom-orb"><b>⎓</b>cell</div>`;
    $("#cNote").textContent=par?`Parallel: every bulb gets full voltage — all shine bright. Break one, rest still glow.`:`Series: current is same, voltage splits across ${n} bulbs — each dims. Break one, all die.`;
  };
  $("#cSer").onclick=()=>{par=false;draw();}; $("#cPar").onclick=()=>{par=true;draw();}; $("#cR").oninput=()=>{$("#cN").textContent=$("#cR").value;draw();}; draw();
}
function artStates(b){
  b.innerHTML=`<div class="art-stage"><div class="sim-ctl"><span class="muted" style="min-width:80px">Temp (°C)</span><input type="range" id="sT" min="-20" max="130" value="25"><span class="sim-val" id="sTv">25</span></div>
  <div id="sBox" style="text-align:center;font-size:44px;min-height:70px"></div><p class="muted" id="sNote" style="text-align:center"></p></div>`;
  const draw=()=>{ const t=+$("#sT").value; $("#sTv").textContent=t;
    let box,note;
    if(t<0){ box="▪ ▪ ▪"; note="Solid — particles vibrate in fixed spots. Strong forces, fixed shape."; }
    else if(t<100){ box="● ● ●"; note="Liquid — particles slide past each other. Fixed volume, takes container's shape."; }
    else { box="· · ·   · · ·"; note="Gas — particles fly free. Diffusion, compressible, fills everything."; }
    if(t===0)note="Melting point of ice — phase change, temperature pauses while latent heat works.";
    if(t===100)note="Boiling point — latent heat of vaporisation, temperature holds at 100 °C.";
    $("#sBox").textContent=box; $("#sNote").textContent=note;
  };
  $("#sT").oninput=draw; draw();
}
function artCell(b){
  const parts=[["Nucleus","Control room — holds chromosomes (DNA), directs all activity"],["Mitochondria","Powerhouse — releases energy as ATP from food"],["Chloroplast","(plants only) — photosynthesis kitchen, holds chlorophyll"],["Ribosome","Protein factory of the cell"],["Plasma membrane","Selectively permeable gatekeeper — osmosis lives here"],["Cell wall","(plants only) — rigid cellulose armour"],["Vacuole","Storage tank — sap in plants, big and central"],["Lysosome","Suicide bag — cleanup crew, digests worn parts"]];
  b.innerHTML=`<div class="art-stage"><div class="cell-map">${parts.map((p,i)=>`<div class="cell-part" data-i="${i}">${p[0]}</div>`).join("")}</div><div class="card" id="cInfo" style="margin:12px 0 0;background:var(--cream)">Tap an organelle — its story appears here.</div></div>`;
  b.querySelectorAll(".cell-part").forEach(x=>x.onclick=()=>{ b.querySelectorAll(".cell-part").forEach(y=>y.classList.remove("on")); x.classList.add("on"); $("#cInfo").innerHTML=`<b>${parts[+x.dataset.i][0]}</b><p class="muted" style="margin:6px 0 0">${parts[+x.dataset.i][1]}</p>`; });
}
function artSound(b){
  b.innerHTML=`<div class="art-stage"><div class="sim-ctl"><span class="muted" style="min-width:86px">Frequency (Hz)</span><input type="range" id="sF" min="60" max="600" value="220"><span class="sim-val" id="sFv">220</span></div>
  <div id="sWave" style="display:flex;gap:3px;align-items:flex-end;height:90px;margin:14px 0"></div><p class="muted" id="sN" style="text-align:center"></p>
  <button class="btn peach sm" id="sPlay">Play the tone</button></div>`;
  let ac=null;
  const draw=()=>{ const f=+$("#sF").value; $("#sFv").textContent=f;
    $("#sWave").innerHTML=[...Array(40)].map((_,i)=>`<div style="width:7px;height:${38+34*Math.sin(i*f/40)}px;background:var(--ocean);border-radius:4px"></div>`).join("");
    $("#sN").textContent=`f = ${f} Hz — higher frequency = higher pitch. Amplitude (height) = loudness.`;
  };
  $("#sF").oninput=draw;
  $("#sPlay").onclick=()=>{ try{ ac=ac||new (window.AudioContext||window.webkitAudioContext)(); const o=ac.createOscillator(),g=ac.createGain(); o.frequency.value=+$("#sF").value; o.type="sine"; g.gain.value=.08; o.connect(g); g.connect(ac.destination); o.start(); setTimeout(()=>o.stop(),600); }catch(e){ toast("Audio not available here"); } };
  draw();
}
function artTimeline(b){
  const EV={ "1789":["Bastille falls","Rioters storm the Bastille — feudal order cracks. France becomes a constitutional monarchy by 1791."],
    "1791":["Constitution of 1791","Powers separated — National Assembly elected by active citizens (men 25+, paying taxes)."],
    "1793":["Reign of Terror begins","Robespierre's Committee of Public Safety — enemies executed, price caps on bread."],
    "1794":["Robespierre executed","The Terror devours its own — arrests then a final 'Republic of Virtue' bid fails."],
    "1804":["Napoleon crowned Emperor","Monarchy returns — but laws (the Code) keep revolutionary reforms."],
    "1914":["WWI begins","Russia's army breaks; food shortages by 1917, Tsar loses support."],
    "1917 Feb":["February Revolution","Petrograd strikes; Tsar abdicates — Provisional Government forms."],
    "1917 Oct":["October Revolution","Lenin's Bolsheviks seize power — land to peasants, banks nationalised."],
    "1918":["Brest-Litovsk","Russia exits WWI; civil war follows, 'War Communism'."]};
  const yrs=Object.keys(EV);
  b.innerHTML=`<div class="art-stage">${yrs.map((y,i)=>`<div class="tl-item" data-i="${i}" style="cursor:pointer"><div class="yr">${y}</div><div>${EV[y][0]}</div></div>`).join("")}<div class="card" id="tlInfo" style="margin:12px 0 0;background:var(--cream)">Tap an event for the full story.</div></div>`;
  b.querySelectorAll(".tl-item").forEach(x=>x.onclick=()=>{ const e=EV[yrs[+x.dataset.i]]; $("#tlInfo").innerHTML=`<b>${e[0]} — ${yrs[+x.dataset.i]}</b><p class="muted" style="margin:6px 0 0">${e[1]}</p>`; });
}
function artMonsoon(b){
  const SEAS={Summer:["Sea → Land","South-west monsoon winds blow FROM the ocean TO land, heavy with moisture — June onwards, the whole country breathes rain.","Rain","low-pressure over land pulls moisture in"],Winter:["Land → Sea","North-east winds blow FROM land TO sea — dry over most of India; Tamil Nadu coast catches rain.","Sun","land cools fast, high pressure over land pushes air seaward"],Retreating:["Oct–Nov shift","Monsoon withdraws; October heat; cyclones hit the eastern coast.","Shift","wind reversal as the sun moves south"]};
  b.innerHTML=`<div class="art-stage"><div class="row">${Object.keys(SEAS).map(s=>`<button class="pill ${s==="Summer"?"on":""}" data-s="${s}">${s}</button>`).join("")}</div>
  <div style="text-align:center;font-size:40px;margin:14px 0" id="moIco">🌧</div>
  <div style="text-align:center;font-weight:800;color:var(--ocean)" id="moDir">Sea → Land</div>
  <p class="muted" style="text-align:center;margin-top:8px" id="moWhy"></p></div>`;
  b.querySelectorAll("[data-s]").forEach(x=>x.onclick=()=>{ b.querySelectorAll("[data-s]").forEach(y=>y.classList.remove("on")); x.classList.add("on");
    const d=SEAS[x.dataset.s]; $("#moIco").textContent=d[2]; $("#moDir").textContent=d[0]; $("#moWhy").textContent=d[1]+" Why: "+d[3]; });
  b.querySelectorAll("[data-s]")[0].click();
}
function artDemoc(b){
  const Q=[["A king decides everything but builds great roads","Not democratic — power isn't with the people, however good the roads."],
  ["People vote every 5 years; whoever loses accepts the result","Democratic — free, fair, regular elections with real choice."],
  ["One party wins 99% 'yes' votes in a referendum","Not democratic — no real choice, no fair contest."],
  ["Women vote, men don't","Not democratic — universal adult franchise means EVERY adult citizen."],
  ["Court strikes down an unfair law made by Parliament","Democratic — independent judiciary protecting rights is part of the system."]];
  let i=0;
  const draw=()=>{ if(i>=Q.length){ b.innerHTML=`<div class="card" style="text-align:center"><b>Detector complete — you think like a civics examiner now.</b><button class="btn primary" style="margin-top:10px" onclick="Saathy.openArtifact('democ')">Again</button></div>`; return; }
    b.innerHTML=`<div class="art-stage"><p class="muted">${i+1}/${Q.length}</p><div style="font-weight:700;margin:8px 0 14px">${Q[i][0]}</div>
    <div class="row"><button class="btn primary" id="dY">Democratic</button><button class="btn danger" id="dN">Not democratic</button></div><div id="dFb" style="margin-top:12px"></div></div>`;
    $("#dY").onclick=()=>judge(true); $("#dN").onclick=()=>judge(false);
  };
  const judge=(saidYes)=>{ $("#dFb").innerHTML=`<div class="card" style="background:var(--cream)"><b>${Q[i][0].startsWith("People vote")||Q[i][0].startsWith("Court")? "It IS democratic —":"It is NOT democratic —"}</b><p class="muted" style="margin:6px 0 0">${Q[i][1]}</p><button class="btn primary sm" style="margin-top:10px" id="dNext">Next</button></div>`;
    $("#dNext").onclick=()=>{i++;draw();}; };
  draw();
}
function artIndia(b){
  const R={ "Himalayas":"Young fold mountains — Indo-Australian plate hit the Eurasian plate. Glaciers feed the Ganga, Indus, Brahmaputra.",
  "Northern Plains":"Alluvial flatland by the three river systems — food bowl, dense population.",
  "Thar Desert":"Arid west — Luni is the only big river; altitude matters less than rainfall here.",
  "Deccan Plateau":"Triangular ancient lava (black soil) plateau — cotton country, Western Ghats wall it in.",
  "Coastal Strips":"Konkan (west, narrow) vs Coromandel (east, wider) — ports and deltas.",
  "Islands":"Lakshadweep: coral. Andaman & Nicobar: submerged mountain chain — India's eastern point."};
  b.innerHTML=`<div class="art-stage">${Object.keys(R).map(k=>`<button class="cell-part" data-k="${k}" style="width:100%;text-align:left;margin-bottom:8px">${k}</button>`).join("")}<div class="card" id="inInfo" style="background:var(--cream);margin-top:6px">Tap a region.</div></div>`;
  b.querySelectorAll("[data-k]").forEach(x=>x.onclick=()=>{ b.querySelectorAll("[data-k]").forEach(y=>y.classList.remove("on")); x.classList.add("on"); $("#inInfo").innerHTML=`<b>${x.dataset.k}</b><p class="muted" style="margin:6px 0 0">${R[x.dataset.k]}</p>`; });
}
function artIdentity(b){
  b.innerHTML=`<div class="art-stage"><div class="sim-ctl"><span class="muted">a =</span><input type="range" id="ia" min="1" max="6" value="2"><span class="sim-val" id="iav">2</span></div>
  <div class="sim-ctl"><span class="muted">b =</span><input type="range" id="ib" min="1" max="6" value="3"><span class="sim-val" id="ibv">3</span></div>
  <div id="iGrid" style="display:grid;gap:4px;max-width:280px;margin:14px auto"></div><p class="muted" id="iWhy" style="text-align:center"></p></div>`;
  const draw=()=>{ const a=+$("#ia").value,bb=+$("#ib").value; $("#iav").textContent=a; $("#ibv").textContent=bb;
    const cells=[]; for(let r=0;r<a+bb;r++){ const row=[]; for(let c=0;c<a+bb;c++){ const inA=r<a&&c<a, inB=(r>=a&&c>=a), restA=r<a, restC=c<a;
      row.push(inA?`<div style="background:var(--ocean);color:#fff;border-radius:6px;padding:9px 0;font-weight:800">a²</div>`:inB?`<div style="background:var(--peach);border-radius:6px;padding:9px 0;font-weight:800">b²</div>`:restA?`<div style="background:var(--sky);border-radius:6px;padding:9px 0;font-weight:800">ab</div>`:`<div style="background:var(--powder);border-radius:6px;padding:9px 0;font-weight:800">ab</div>`);} cells.push(`<div style="display:grid;grid-template-columns:repeat(${a+bb},1fr);gap:4px">${row.join("")}</div>`); }
    $("#iGrid").innerHTML=cells.join("");
    $("#iWhy").textContent=`Square of side (${a}+${bb}) = ${a+bb}. Two big squares (${a}²=${a*a}, ${bb}²=${bb*bb}) + two rectangles (${a}×${bb} twice = ${2*a*bb}) → (a+b)² = a² + 2ab + b² = ${a*a}+${2*a*bb}+${bb*bb} = ${a*a+2*a*bb+bb*bb}.`;
  };
  $("#ia").oninput=draw; $("#ib").oninput=draw; draw();
}
function artDice(b){
  b.innerHTML=`<div class="art-stage"><p class="muted">Two dice, 100 rolls — watch P(sum=7) approach 6/36 ≈ 0.167.</p>
  <button class="btn peach" id="dRoll">Roll 100</button><div id="dBars" style="display:flex;gap:3px;align-items:flex-end;height:110px;margin-top:14px"></div><p class="muted" id="dStat" style="text-align:center;margin-top:8px"></p></div>`;
  const tally={}; 
  $("#dRoll").onclick=()=>{ let n=0,total=Object.values(tally).reduce((a,b)=>a+b,0);
    for(let k=0;k<100;k++){ const s=1+Math.floor(Math.random()*6)+1+Math.floor(Math.random()*6); tally[s]=(tally[s]||0)+1; }
    total=Object.values(tally).reduce((a,b)=>a+b,0);
    const max=Math.max(...Object.values(tally));
    $("#dBars").innerHTML=[...Array(11)].map((_,i)=>{const s=i+2,v=tally[s]||0;return `<div style="flex:1;text-align:center"><div style="height:${v/max*90||2}px;background:var(--ocean);border-radius:4px 4px 0 0"></div><small style="font-size:10px">${s}</small></div>`}).join("");
    $("#dStat").textContent=`Total rolls: ${total} · P(7) so far = ${((tally[7]||0)/total).toFixed(3)} (theory 0.167) — law of large numbers in action.`;
  };
}

/* ---------- Reports ---------- */
function renderReports(tab){
  $("#repBody").innerHTML = tab==="parent"? repParent() : repTeacher();
  $("#repTabs").querySelectorAll(".tm").forEach(t=>t.classList.toggle("on",t.dataset.r===tab));
  $("#repTabs").querySelectorAll(".tm").forEach(t=>t.onclick=()=>renderReports(t.dataset.r));
}
function repParent(){
  const ms=Object.entries(S.mastery).filter(([,v])=>v.seen);
  const touched=ms.length, weak=weakConcepts(3);
  const today=S.trail.filter(t=>new Date(t.t).toDateString()===new Date().toDateString());
  const qs=today.filter(t=>t.ev==="right"||t.ev==="wrong").length;
  const acc=qs?Math.round(100*today.filter(t=>t.ev==="right").length/qs):0;
  const dn=new Date().toLocaleDateString("en-IN",{weekday:"long",day:"numeric",month:"short"});
  return `<div class="card"><div class="rep-head"><div class="rep-avatar">${(S.profile.name||"S")[0].toUpperCase()}</div>
    <div><b style="font-size:16px">${S.profile.name||"Student"} · Class ${S.profile.cls}</b><div class="muted">${dn} · Daily report for parents</div></div></div>
    <div class="stat-grid">
      <div class="stat"><b>${S.streak.n}</b><span>day streak</span></div>
      <div class="stat"><b>${qs}</b><span>questions today</span></div>
      <div class="stat"><b>${qs?acc+"%":"—"}</b><span>accuracy today</span></div>
      <div class="stat"><b>${S.xp}</b><span>total XP</span></div></div>
    ${touched?`<h4 style="margin:14px 0 8px">Concept map</h4>${ms.slice(0,6).map(([k,v])=>`<div class="heat-row"><span class="hl">${conceptName(k)}</span><div class="bar" style="width:90px;height:8px;border-radius:4px;background:var(--powder)"><i style="display:block;height:100%;width:${Math.round(v.score)}%;background:${v.score>=75?"var(--good)":v.score>=40?"var(--ocean)":"var(--bad)"};border-radius:4px"></i></div><span class="muted" style="min-width:82px;text-align:right;font-size:12px">${PARENT_WORD[v.band-1].split("—")[0]}</span></div>`).join("")}
    ${weak.length?`<div class="askthis" style="margin-top:14px"><b>Tomorrow's focus:</b> ${conceptName(weak[0].k)} — Saathy will rebuild the basics with simpler examples before re-testing.</div>`:""}
    <div class="askthis" style="margin-top:10px"><b>Ask this at dinner:</b> "What's one concept that finally clicked today?" — progress talk beats marks talk.</div>
    <p class="muted" style="margin-top:10px">Privacy wall: parents never see the child's AI chats or doubts — only evidence-based progress.</p>`:
    `<p class="muted">No learning events yet — once your child studies tonight, this page fills with honest evidence.</p>`}
    <button class="btn primary sm no-print" style="margin-top:12px" onclick="window.print()">Print / save report</button></div>`;
}
function repTeacher(){
  const ms=Object.entries(S.mastery).filter(([,v])=>v.seen);
  const heat=k=>{const v=S.mastery[k];return v.score>=75?"d4":v.score>=50?"d3":v.score>=25?"d2":"d1";};
  const dna=Object.values(S.mastery).reduce((a,m)=>{for(const f in m.dna)a[f]=(a[f]||0)+m.dna[f];return a;},{});
  const clusters={}; S.trail.filter(t=>t.ev==="wrong").forEach(t=>{clusters[conceptName(t.key)]=(clusters[conceptName(t.key)]||0)+1;});
  const demo=[["Rhea S.",68],["Imran K.",54],["Ananya P.",81],["Kabir M.",38],["Meera J.",72],["Dev A.",45]];
  return `<div class="card"><h3>Class 9-A · Concept heatmap <span class="chip">Morning view</span></h3>
  <p class="muted">${ms.length?"":"No evidence yet — "}${S.profile.name||"your student"}'s data plus 6 sample students to preview the class view.</p>
  ${ms.map(([k,v])=>`<div class="heat-row"><span class="hl">${conceptName(k)}</span><span class="muted" style="font-size:12px">${S.profile.name||"Student"} ${Math.round(v.score)}%</span>${demo.map(([,sc])=>`<div class="heat-dot ${heat(sc>=v.score?sc:sc)}" title="sample student ${sc}%"></div>`).join("")}</div>`).join("")||`<div class="heat-row"><span class="hl">Run a quiz or plan first — the heatmap builds itself from the evidence trail.</span></div>`}
  <h4 style="margin:16px 0 6px">Doubt clusters (anonymised)</h4>
  ${Object.entries(clusters).sort((a,b)=>b[1]-a[1]).slice(0,4).map(([c,n])=>`<div class="heat-row"><span class="hl">${c}</span><span class="chip peach">${n} doubts</span></div>`).join("")||`<p class="muted">No doubt clusters yet.</p>`}
  <h4 style="margin:16px 0 6px">Error DNA (why answers go wrong)</h4>
  <div class="row">${["concept","careless","method","guess"].map(f=>`<span class="badge">${f}: ${dna[f]||0}</span>`).join("")}</div>
  <div class="askthis" style="margin-top:14px"><b>Reteach suggestion:</b> ${ms.length?`Start ${conceptName(weakConcepts(1)[0]?.k||"")} from the prerequisite — the DNA shows concept gaps, not carelessness.`:"Publish a session; evidence flows in automatically tonight."}</div>
  <button class="btn primary sm no-print" style="margin-top:12px" onclick="window.print()">Print / save</button></div>`;
}

/* ---------- Founder ---------- */
const FOUNDER_PIN="2405";
function founderUnlock(pins){
  const pin=pins.map(p=>p.value).join("");
  if(pin!==FOUNDER_PIN){ $("#fpErr").classList.remove("hidden"); pins.forEach(p=>p.value=""); pins[0].focus(); return; }
  $("#fpErr").classList.add("hidden");
  S.founder.unlocked=true; save(); renderFounder();
}
async function renderFounder(){
  if(!S.founder.unlocked){ $("#founderGate").classList.remove("hidden"); $("#founderBody").classList.add("hidden"); return; }
  $("#founderGate").classList.add("hidden"); $("#founderBody").classList.remove("hidden");
  const f=S.founder; const files=f.files||[];
  $("#founderBody").innerHTML=`
  <div class="card"><h3>Model status — 10-phase strengthening <span class="chip good">All live</span></h3>
  ${[["1","Knowledge core","3 NCERT books embedded ("+allChapters().length+" chapters)"],["2","Personalisation","4 bands · Error DNA · L1→L3 ladder · learning weights"],
    ["3","Plan engine","diagnostic → slides → quiz → game → flashcards → report"],["4","Video kit",VIDEO_CONCEPTS+" concepts · "+VIDEO_DB.length+" verified direct video links (3 teachers each)"],
    ["5","Games","5 arcade games on one question bank"],["6","Artifacts","12 interactive labs (Science · SST · Maths)"],
    ["7","Reports","parent daily + teacher heatmap, printable"],["8","YouTube brain","link understanding + timeline cards + quiz-after"],
    ["9","Corpus","Founder ingestion — "+files.length+"/100 files, ≤300 MB each"],["10","Plug & play AI","Gemini (AIza) / Groq / OpenAI — paste key, one tap"]]
   .map(p=>`<div class="phase done"><div class="pn">${p[0]}</div><div><b>${p[1]}</b><div class="muted">${p[2]}</div></div></div>`).join("")}
  </div>
  <div class="card"><h3>Training corpus <span class="chip" id="corpusCount">${files.length}/100 files</span></h3>
    <p class="muted">Upload up to 100 documents (PDF · MD · TXT · DOCX · CSV · JSON), single file up to 300 MB. Everything is parsed, indexed and becomes searchable teaching knowledge — and every file stays downloadable here.</p>
    <div class="dropzone" id="dropzone"><b>Tap to choose files</b> or drag them here<br><span class="muted">${files.length}/100 used · ≤300 MB each</span></div>
    <div id="ingestLog" class="muted" style="margin-top:8px"></div>
    <div style="margin-top:14px" id="tfList">${files.map((fl,i)=>`
      <div class="tf-item"><div class="tf-ic">${(fl.name||"?").split(".").pop().slice(0,3).toUpperCase()}</div>
      <div class="tf-name"><b>${fl.name}</b><span>${(fl.size/1048576).toFixed(2)} MB · ${fl.chars?fl.chars.toLocaleString()+" chars indexed":"indexed"}</span></div>
      <button class="btn ghost sm" data-dl="${i}">Download</button><button class="btn danger sm" data-rm="${i}">Remove</button></div>`).join("")}</div>
  </div>
  <div class="card"><h3>API quick panel</h3>
    <p class="muted">${S.api.ok?`Connected: ${S.api.provider} · ${S.api.model}`:"No key connected — students can still use the full offline NCERT brain."}</p>
    <button class="btn primary sm" onclick="document.getElementById('settingsBtn').click()">Open AI &amp; API settings</button>
  </div>`;
  bindFounder();
}
function bindFounder(){
  const dz=$("#dropzone"), pick=$("#filePick");
  dz.onclick=()=>pick.click();
  dz.ondragover=e=>{e.preventDefault();dz.classList.add("drag");};
  dz.ondragleave=()=>dz.classList.remove("drag");
  dz.ondrop=e=>{e.preventDefault();dz.classList.remove("drag");handleFiles(e.dataTransfer.files);};
  pick.onchange=()=>handleFiles(pick.files);
  document.querySelectorAll("[data-dl]").forEach(b=>b.onclick=()=>downloadFile(+b.dataset.dl));
  document.querySelectorAll("[data-rm]").forEach(b=>b.onclick=async()=>{ const i=+b.dataset.rm; const fl=S.founder.files[i]; await idbDel(fl.id); S.founder.files.splice(i,1); save(); renderFounder(); });
}
async function handleFiles(list){
  const files=[...list]; if(!files.length) return;
  const log=$("#ingestLog"); 
  for(const file of files){
    if(S.founder.files.length>=100){ log.textContent="Cap reached: 100 files. Remove one to add more."; toast("100-file cap reached"); break; }
    if(file.size>300*1048576){ log.textContent=`${file.name}: over 300 MB — skipped.`; toast(file.name+" over 300 MB"); continue; }
    log.textContent=`Ingesting ${file.name} (${(file.size/1048576).toFixed(1)} MB)…`;
    try{
      const id="f_"+Date.now()+"_"+Math.random().toString(36).slice(2,7);
      let text="";
      if(/\.(txt|md|csv|json)$/i.test(file.name)) text=await file.text();
      else if(/\.pdf$/i.test(file.name)) text=await pdfToText(file);
      else if(/\.(docx)$/i.test(file.name)) text=await docxToText(file);
      else if(/\.(doc)$/i.test(file.name)) text="";

      if(text && text.length>20){
        await idbPut(id,text);
        S.founder.files.push({id,name:file.name,size:file.size,type:file.type||"file",chars:text.length,added:Date.now()});
        log.textContent=`✓ ${file.name} — ${text.length.toLocaleString()} chars indexed into the teaching corpus.`;
      } else {
        await idbPut(id,await file.text().catch(()=> ""));
        S.founder.files.push({id,name:file.name,size:file.size,type:file.type||"file",chars:0,added:Date.now()});
        log.textContent=`Stored ${file.name} (raw). Text extraction unavailable offline for this format — it stays downloadable.`;
      }
      save(); renderFounder();
    }catch(e){ log.textContent="Failed: "+file.name+" — "+e.message; }
  }
}
async function pdfToText(file){
  // lazy-load pdf.js from CDN (needs internet, like the AI key)
  if(!window.pdfjsLib){
    await new Promise((res,rej)=>{ const s=document.createElement("script"); s.src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"; s.onload=res; s.onerror=()=>rej(new Error("PDF engine needs internet once")); document.head.appendChild(s); });
    window.pdfjsLib.GlobalWorkerOptions.workerSrc="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
  }
  const buf=await file.arrayBuffer(); const pdf=await pdfjsLib.getDocument({data:buf}).promise;
  let out=[];
  const pages=Math.min(pdf.numPages,400);
  for(let p=1;p<=pages;p++){ const pg=await pdf.getPage(p); const tc=await pg.getTextContent(); out.push(tc.items.map(i=>i.str).join(" ")); }
  return out.join("\n");
}
async function docxToText(file){
  const buf=new Uint8Array(await file.arrayBuffer());
  // minimal ZIP reader: find word/document.xml (deflate-raw via DecompressionStream)
  const view=new DataView(buf.buffer); let i=4, entry=null;
  while(i<buf.length-30){
    if(view.getUint32(i,true)===0x04034b50){
      const method=view.getUint16(i+8,true), csize=view.getUint32(i+18,true);
      const nlen=view.getUint16(i+26,true), elen=view.getUint16(i+28,true);
      const name=new TextDecoder().decode(buf.slice(i+30,i+30+nlen));
      const start=i+30+nlen+elen;
      if(/word\/document\.xml$/.test(name)) { entry=buf.slice(start,start+csize); entry._method=method; break; }
      i=start+csize;
    } else i++;
  }
  if(!entry) return "";
  let xml;
  if(entry._method===8){ const ds=new DecompressionStream("deflate-raw"); const st=new Blob([entry]).stream().pipeThrough(ds); xml=await new Response(st).text(); }
  else xml=new TextDecoder().decode(entry);
  return xml.replace(/<w:p[ >]/g,"\n<w:p ").replace(/<[^>]+>/g,"").replace(/&amp;/g,"&").trim();
}
function downloadFile(i){
  const fl=S.founder.files[i];
  idbGet(fl.id).then(text=>{
    const blob=new Blob([text||""],{type:"text/plain"});
    const a=document.createElement("a"); a.href=URL.createObjectURL(blob);
    a.download=fl.name.replace(/\.\w+$/,"")+"_training.txt"; a.click();
    setTimeout(()=>URL.revokeObjectURL(a.href),4000);
    toast("Downloading "+fl.name);
  });
}

/* ---------- Home ---------- */
function renderHome(){
  $("#streakN").textContent=S.streak.n;
  const chip=$("#aiChip");
  chip.textContent="AI: "+(S.api.ok?S.api.provider:"Off"); chip.classList.toggle("good",S.api.ok); chip.classList.toggle("peach",!S.api.ok);
  // Next action card
  const na=$("#naTitle"),nd=$("#naDesc");
  const dec=decayed(), weak=weakConcepts(1)[0];
  let action,desc,dest;
  if(!Object.keys(S.mastery).some(k=>S.mastery[k].seen)){ action="Take your first level check"; desc="3 tiny questions — Setu finds where to start. Not a test."; dest=()=>go("plan"); }
  else if(dec.length){ action="Quick warm-up?"; desc=conceptName(dec[0])+" is fading — a 2-minute flashcard refresher keeps it alive."; dest=()=>{const k=dec[0];const ch=chapterOf(k.split(":").slice(0,2).join(":"));if(ch)openFlash(ch.book+":"+ch.number,ch);}; }
  else if(weak&&weak.score<40){ action="Rebuild the basics: "+conceptName(weak.k); desc="Concept gap detected — Guru brings simpler examples first, then we re-test."; dest=()=>go("plan"); }
  else { action="Tonight's plan is ready"; desc="Slides → quiz → game → flashcards. Pick a chapter and Saathy walks you through."; dest=()=>go("plan"); }
  na.textContent=action; nd.textContent=desc;
  $("#naGo").onclick=dest;
  $("#naSwap").onclick=()=>go("games");
  // mastery map
  const mm=$("#masteryMap"); const ms=Object.entries(S.mastery).filter(([,v])=>v.seen).slice(0,8);
  mm.innerHTML=ms.length?ms.map(([k,v])=>`<span class="mm-pill">${conceptName(k).slice(0,34)}<span class="bar"><i style="width:${Math.round(v.score)}%"></i></span><b>${Math.round(v.score)}%</b></span>`).join(""):`<span class="muted">Take a level check and your concept pills appear here — per concept, never a single number.</span>`;
  // stats
  const qs=S.trail.filter(t=>t.ev==="right"||t.ev==="wrong").length;
  $("#homeStats").innerHTML=[["Questions",qs],["XP",S.xp],["Badges",S.badges.length],["Games best",S.games.mcqBest]]
    .map(([l,v])=>`<div class="stat"><b>${v}</b><span>${l}</span></div>`).join("");
  $("#phaseLine")&&($("#phaseLine").textContent="10-phase strengthening: all phases live.");
  checkStreak();
}
function checkStreak(){
  const today=new Date().toDateString();
  if(S.streak.day!==today){
    const y=new Date(Date.now()-864e5).toDateString();
    S.streak.n = S.streak.day===y ? S.streak.n+1 : 1;
    S.streak.day=today; save();
  }
}

/* ---------- Navigation ---------- */
const TABS=[["home","Home","M3 11l9-8 9 8v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z"],["chat","Saathy","M4 5h16v11H8l-4 4z"],["plan","Plan","M5 4h14v16l-7-4-7 4z"],["games","Games","M6 9h4M8 7v4m6-2h.01M16 11h.01M7 5h10a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3z"],["videos","Videos","M4 6h16v12H4zM10 9l5 3-5 3z"],["artifacts","Labs","M12 3v10m0 0a4 4 0 1 0 .01 0M7 3h10"],["reports","Reports","M4 5h16v14H4zM8 9h8M8 13h8M8 17h5"],["founder","Founder","M5 11h14v9H5zM8 11V7a4 4 0 0 1 8 0v4"]];
let CUR="home";
function renderNav(){
  const html=TABS.map(([id,label,d])=>`<button class="tab ${CUR===id?"on":""}" data-t="${id}"><svg viewBox="0 0 24 24"><path d="${d}"/></svg><span>${label}</span></button>`).join("");
  $("#tabbar").innerHTML=html;
  $("#sidenav").innerHTML=`<div style="display:flex;align-items:center;gap:8px;padding:8px 10px 14px"><svg class="mascot" viewBox="0 0 64 64"><use href="#clg"/><path fill="url(#clg)" d="M20 46a12 12 0 0 1-2-23.8A16 16 0 0 1 49 26a10 10 0 0 1-3 20z"/><g fill="#fff"><circle cx="26" cy="33" r="3"/><circle cx="40" cy="33" r="3"/></g><path d="M27 41q5 4 10 0" stroke="#fff" stroke-width="2.4" fill="none" stroke-linecap="round"/><rect x="24" y="49" width="17" height="9" rx="2.4" fill="#F6D5C6"/></svg><b style="color:var(--navy)">Saathy v.3</b></div>`+html+`<div class="side-foot">I am Saathy v.1<br>trained on NCERT modules and books</div>`;
  document.querySelectorAll("[data-t]").forEach(b=>b.onclick=()=>go(b.dataset.t));
}
function go(tab){
  CUR=tab;
  document.querySelectorAll(".screen").forEach(s=>s.classList.toggle("on",s.id==="scr-"+tab));
  renderNav();
  if(tab==="home") renderHome();
  if(tab==="plan") renderPlan();
  if(tab==="games") renderGames();
  if(tab==="videos") renderVideos();
  if(tab==="artifacts") renderArtifacts();
  if(tab==="reports") renderReports("parent");
  if(tab==="founder") renderFounder();
  window.scrollTo({top:0});
}

/* ---------- Settings ---------- */
function openSettings(){
  $("#settingsWrap").classList.remove("hidden");
  const key=S.api.key||"";
  $("#apiKey").value=key;
  paintModels(); paintConn(); paintStudent();
}
function closeSettings(){ $("#settingsWrap").classList.add("hidden"); }
function paintModels(){
  const d=detectProvider($("#apiKey").value)||{provider:"",models:[]};
  const cur=S.api.model;
  $("#apiModel").innerHTML=d.models.map(m=>`<option ${m===cur?"selected":""}>${m}</option>`).join("")||`<option value="">— paste a key first —</option>`;
}
function paintConn(){
  const ok=S.api.ok, st=$("#connState");
  st.classList.toggle("on",ok);
  st.querySelector("span").textContent= ok? `Connected · ${S.api.provider} · ${S.api.model}` : (S.api.key? "Key pasted — tap Connect" : "Not connected");
}
function paintStudent(){
  $("#stName").value=S.profile.name||"";
  $("#stClass").value="Class "+S.profile.cls;
  $("#langPills").querySelectorAll(".pill").forEach(p=>p.classList.toggle("on",p.dataset.l===S.profile.lang));
  $("#timePills").querySelectorAll(".pill").forEach(p=>p.classList.toggle("on",+p.dataset.m===S.profile.budget));
}
async function doConnect(){
  const key=$("#apiKey").value.trim();
  const d=detectProvider(key);
  const btn=$("#connectBtn"); btn.disabled=true; btn.textContent="Testing…";
  try{
    if(!d) throw new Error("Key not recognised — AIza… / gsk_… / sk-…");
    S.api={key,provider:d.provider,model:$("#apiModel").value||d.models[0],ok:false};
    await testConnection();
    S.api.ok=true; save(); paintConn(); toast("Connected — Saathy is fully awake ✓");
    renderHome();
  }catch(e){ S.api.ok=false; save(); paintConn(); toast("Connection failed: "+e.message,true); }
  btn.disabled=false; btn.textContent="Connect";
}

/* ---------- Boot (guarded: settings can never die) ---------- */
function boot(){
  loadState();
  // 0) SETTINGS FIRST — always alive even if anything else fails
  try{
    $("#settingsBtn").addEventListener("click",e=>{e.preventDefault();openSettings();});
    $("#closeSet").addEventListener("click",closeSettings);
    $("#settingsWrap").addEventListener("click",e=>{ if(e.target.id==="settingsWrap") closeSettings(); });
    $("#setTabs").querySelectorAll(".tm").forEach(t=>t.onclick=()=>{
      $("#setTabs").querySelectorAll(".tm").forEach(x=>x.classList.toggle("on",x===t));
      $("#setChat").classList.toggle("hidden",t.dataset.s!=="chat");
      $("#setStudent").classList.toggle("hidden",t.dataset.s!=="student");
      $("#setAbout").classList.toggle("hidden",t.dataset.s!=="about");
    });
    $("#apiKey").addEventListener("input",paintModels);
    $("#connectBtn").addEventListener("click",doConnect);
    $("#langPills").querySelectorAll(".pill").forEach(p=>p.onclick=()=>{S.profile.lang=p.dataset.l;paintStudent();save();});
    $("#timePills").querySelectorAll(".pill").forEach(p=>p.onclick=()=>{S.profile.budget=+p.dataset.m;paintStudent();save();});
    $("#saveStudent").addEventListener("click",()=>{ S.profile.name=$("#stName").value.trim(); S.profile.cls=parseInt($("#stClass").value.replace(/\D/g,""))||9; save(); toast("Saved ✓"); closeSettings(); renderHome(); });
  }catch(e){ console.error("settings boot",e); alert("Settings failed to start — please reload once."); }
  // 1) everything else, each guarded
  const guard=(name,fn)=>{ try{ fn(); }catch(e){ console.error(name,e); } };
  loadBooks();
  guard("nav",()=>{ renderNav(); go("home"); });
  guard("chat",()=>{
    $("#sendBtn").addEventListener("click",sendChat);
    $("#chatInput").addEventListener("keydown",e=>{ if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();sendChat();} });
    $("#chatInput").addEventListener("input",function(){ this.style.height="auto"; this.style.height=Math.min(120,this.scrollHeight)+"px"; });
    addMsg("ai","Namaste! I am **Saathy v.1**, trained on NCERT modules and books.\n\nAsk me any doubt — or paste a **YouTube link** and I'll understand it with a timeline. For a plan, open **Plan**. I check your level first, then teach at exactly your depth.");
    const sug=["Explain Motion from basics","Quiz me on Polynomials","Plan my night","Video for French Revolution"];
    $("#chatSugg").innerHTML=sug.map(s=>`<button class="s-btn">${s}</button>`).join("");
    $("#chatSugg").querySelectorAll(".s-btn").forEach(b=>b.onclick=()=>{ $("#chatInput").value=b.textContent; sendChat(); });
  });
  guard("founder-pin",()=>{
    const pins=[$("#fp1"),$("#fp2"),$("#fp3"),$("#fp4")];
    pins.forEach((p,i)=>{ p.addEventListener("input",()=>{ if(p.value&&i<3)pins[i+1].focus(); }); p.addEventListener("keydown",e=>{ if(e.key==="Backspace"&&!p.value&&i>0)pins[i-1].focus(); }); });
    $("#fpGo").addEventListener("click",()=>founderUnlock(pins));
    if(S.founder.unlocked) renderFounder();
  });
  guard("stage",()=>{ $("#closeStage").addEventListener("click",closeStage); $("#stageWrap").addEventListener("click",e=>{ if(e.target.id==="stageWrap") closeStage(); }); });
  guard("home",()=>renderHome());
  guard("books-int",()=>{ /* sanity: chapters loaded */ });
  console.log("Saathy v.3 booted — 10-phase model, all live");
}
/* Global API */
const Saathy={go,openArtifact,closeStage,renderGames,openSettings};
window.Saathy=Saathy;
if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",boot); else boot();
