/* ============ WIDGETS B ============ */
/* ---------- GRID MAP (coordinates) ---------- */
WIDG.grid = function(box){
  const U = 27, CX = 210, CY = 148;
  box.innerHTML = NSVG('0 0 420 296') + `
    <g id="gm-cells"></g>
    <g id="gm-axes">
      <line x1="${CX - 7*U}" y1="${CY}" x2="${CX + 7*U}" y2="${CY}" stroke="rgba(255,255,255,.6)" stroke-width="2.5"/>
      <line x1="${CX}" y1="${CY - 5*U}" x2="${CX}" y2="${CY + 5*U}" stroke="rgba(255,255,255,.6)" stroke-width="2.5"/>
      ${[-6,-5,-4,-3,-2,-1,1,2,3,4,5,6].map(i => `<text x="${CX + i*U}" y="${CY + 15}" text-anchor="middle" class="svgtext" font-size="9.5" fill="#7A879C">${i}</text>`).join('')}
      ${[-4,-3,-2,-1,1,2,3,4].map(i => `<text x="${CX - 10}" y="${CY - i*U + 3}" text-anchor="end" class="svgtext" font-size="9.5" fill="#7A879C">${i}</text>`).join('')}
      <text x="${CX + 7*U + 4}" y="${CY + 4}" class="svgtext" font-size="12" fill="#9AA8BE">x</text>
      <text x="${CX + 6}" y="${CY - 5*U + 6}" class="svgtext" font-size="12" fill="#9AA8BE">y</text>
    </g>
    <g id="gm-quads" opacity="0"><rect x="${CX}" y="${CY - 5*U}" width="${6*U}" height="${5*U}" fill="var(--wc)" opacity=".1"/><text x="${CX + 3*U}" y="${CY - 4.4*U}" text-anchor="middle" class="svgtext" font-size="12" fill="var(--wc)">QUADRANT I (+,+)</text></g>
    <g id="gm-flags"></g>
    <g id="gm-ship" class="grabbable"></g>
    </svg>
    <div class="wctl" id="gm-ctl"></div>
    <div style="text-align:center;padding-bottom:12px"><span class="wlabel" id="gm-read"></span></div>`;
  const svg = box.querySelector('svg'), ship = svg.querySelector('#gm-ship'), flags = svg.querySelector('#gm-flags'), read = box.querySelector('#gm-read'), ctl = box.querySelector('#gm-ctl'), quads = svg.querySelector('#gm-quads');
  let pos = { x:0, y:0 };
  function drawShip(){
    const px = CX + pos.x * U, py = CY - pos.y * U;
    ship.setAttribute('transform', `translate(${px} ${py})`);
    ship.innerHTML = `<ellipse cx="0" cy="26" rx="20" ry="4" fill="#000" opacity=".3"/>
      <path d="M-15 18 L15 18 L9 26 L-9 26 Z" fill="#8A5A22"/>
      <path d="M0 16 L0 -12 L13 10 Z" fill="var(--wc)"/>
      <path d="M-2 16 L-2 -8 L-11 12 Z" fill="#F8F4EA" opacity=".85"/>
      <circle cx="0" cy="-14" r="2.6" fill="var(--gold)"/>`;
    read.innerHTML = `ship at <b style="color:var(--wc)">(${pos.x}, ${pos.y})</b>`;
  }
  drawShip();
  async function sailTo(nx, ny, dur=520){
    const sx = pos.x, sy = pos.y;
    await tween(dur, p => { pos.x = Math.round(lerp(sx, nx, p) * 10) / 10; pos.y = Math.round(lerp(sy, ny, p) * 10) / 10; drawShip(); });
    pos.x = nx; pos.y = ny; drawShip();
    if (api && api._cb && pos.x === api._cb.x && pos.y === api._cb.y){ const c = api._cb; api._cb = null; c.fn(); }
  }
  svg.addEventListener('click', e => {
    const p = svgPoint(svg, e.clientX, e.clientY);
    const nx = clamp(Math.round((p.x - CX) / U), -7, 7), ny = clamp(Math.round((CY - p.y) / U), -5, 5);
    if (nx === pos.x && ny === pos.y) return;
    Sfx.tap(); sailTo(nx, ny, 380);
  });
  function btns(){
    [['← W',-1,0],['N ↑',0,1],['S ↓',0,-1],['E →',1,0]].forEach(([t,dx,dy]) => {
      const b = el('button', 'wbtn', t); b.style.minWidth = '58px';
      b.onclick = () => { Sfx.tap(); sailTo(clamp(pos.x + dx, -7, 7), clamp(pos.y + dy, -5, 5), 240); };
      ctl.appendChild(b);
    });
  }
  const api = {
    node: box, read, ctl,
    btns,
    sailTo, get pos(){ return pos; },
    say(t){ read.innerHTML = t; },
    showQuads(on){ quads.style.opacity = on ? 1 : 0; },
    flag(x, y, label){
      const px = CX + x * U, py = CY - y * U;
      flags.innerHTML += `<g transform="translate(${px} ${py})"><line x1="0" y1="0" x2="0" y2="-18" stroke="var(--gold)" stroke-width="2.5"/><path d="M0 -18 L12 -14 L0 -10Z" fill="var(--gold)"/><text x="0" y="-24" text-anchor="middle" class="svgtext" font-size="11" fill="var(--gold)">${label || '×'}</text></g>`;
    },
    clearFlags(){ flags.innerHTML = ''; },
    arrive(t){ api._cb = t; }
  };
  return api;
};

/* ---------- LINE RIDER ---------- */
WIDG.line = function(box){
  const U = 27, CX = 210, CY = 145;
  box.innerHTML = NSVG('0 0 420 290') + `
    <g id="lr-grid"></g>
    <line x1="${CX - 6.6*U}" y1="${CY}" x2="${CX + 6.6*U}" y2="${CY}" stroke="rgba(255,255,255,.55)" stroke-width="2"/>
    <line x1="${CX}" y1="${CY - 5*U}" x2="${CX}" y2="${CY + 5*U}" stroke="rgba(255,255,255,.55)" stroke-width="2"/>
    <g id="lr-line2"></g><g id="lr-line"></g><g id="lr-dots"></g>
    <circle id="lr-rider" cx="0" cy="0" r="8" fill="var(--gold)" opacity="0" class="dragdot"/>
    <text id="lr-riderlbl" x="0" y="0" class="svgtext" font-size="12.5" fill="var(--gold)" text-anchor="middle" opacity="0"></text>
    </svg>
    <div style="text-align:center;padding:2px 0 4px"><span class="wlabel" id="lr-eq"></span></div>
    <div class="wctl" id="lr-ctl"></div>
    <div style="text-align:center;padding-bottom:10px"><span class="wlabel" id="lr-read"></span></div>`;
  const svg = box.querySelector('svg'), lineG = svg.querySelector('#lr-line'), dots = svg.querySelector('#lr-dots'), line2 = svg.querySelector('#lr-line2'),
    rider = svg.querySelector('#lr-rider'), rlbl = svg.querySelector('#lr-riderlbl'), eqL = box.querySelector('#lr-eq'), read = box.querySelector('#lr-read'), ctl = box.querySelector('#lr-ctl');
  const PX = (x, y) => [CX + x * U, CY - y * U];
  function grid(){ let g = ''; for (let i = -6; i <= 6; i++){ const [x0,] = PX(i, 0); g += `<line x1="${x0}" y1="${CY - 4.6*U}" x2="${x0}" y2="${CY + 4.6*U}" stroke="#fff" opacity=".06"/>`; } for (let j = -4; j <= 4; j++){ const [, y0] = PX(0, j); g += `<line x1="${CX - 6.4*U}" y1="${y0}" x2="${CX + 6.4*U}" y2="${y0}" stroke="#fff" opacity=".06"/>`; } svg.querySelector('#lr-grid').innerHTML = g; }
  grid();
  const api = {
    node: box, read, ctl,
    eq(a, b, c){
      eqL.innerHTML = mf(`${a}x + ${b}y = ${c}`).replace(/-$/, '−');
      eqL.innerHTML = `${a}x + (${b})y = ${c}`.replace('+ (-', '− ').replace(')y', 'y');
      eqL.innerHTML = a + 'x ' + (b < 0 ? '− ' + (-b) : '+ ' + b) + 'y = ' + c;
      let p1, p2;
      if (a === 0){ p1 = PX(-6, c / b); p2 = PX(6, c / b); }
      else if (b === 0){ p1 = PX(c / a, -5); p2 = PX(c / a, 5); }
      else { p1 = PX(-6.5, (c - a * -6.5) / b); p2 = PX(6.5, (c - a * 6.5) / b); }
      lineG.innerHTML = `<line x1="${p1[0]}" y1="${p1[1]}" x2="${p2[0]}" y2="${p2[1]}" stroke="var(--wc)" stroke-width="4" stroke-linecap="round" opacity=".9"/><line x1="${p1[0]}" y1="${p1[1]}" x2="${p2[0]}" y2="${p2[1]}" stroke="var(--wc)" stroke-width="10" opacity=".14" stroke-linecap="round"/>`;
      this._abc = { a, b, c };
      dots.innerHTML = ''; read.innerHTML = '';
    },
    eq2(a, b, c){
      let p1, p2;
      if (a === 0){ p1 = PX(-6, c / b); p2 = PX(6, c / b); }
      else if (b === 0){ p1 = PX(c / a, -5); p2 = PX(c / a, 5); }
      else { p1 = PX(-6.5, (c - a * -6.5) / b); p2 = PX(6.5, (c - a * 6.5) / b); }
      line2.innerHTML = `<line x1="${p1[0]}" y1="${p1[1]}" x2="${p2[0]}" y2="${p2[1]}" stroke="#FF7A6E" stroke-width="3" stroke-dasharray="7 6" opacity=".85"/>`;
    },
    clear2(){ line2.innerHTML = ''; },
    showRider(x, y){ const p = PX(x, y); rider.setAttribute('cx', p[0]); rider.setAttribute('cy', p[1]); rider.style.opacity = 1; rlbl.setAttribute('x', p[0]); rlbl.setAttribute('y', p[1] - 14); rlbl.textContent = `(${x}, ${y})`; rlbl.style.opacity = 1; },
    hideRider(){ rider.style.opacity = 0; rlbl.style.opacity = 0; },
    async moveRider(x, y){ const p0 = [ +rider.getAttribute('cx'), +rider.getAttribute('cy') ], p1 = PX(x, y); rider.style.opacity = 1; rlbl.style.opacity = 1; await tween(420, t => { const px = lerp(p0[0], p1[0], t), py = lerp(p0[1], p1[1], t); rider.setAttribute('cx', px); rider.setAttribute('cy', py); rlbl.setAttribute('x', px); rlbl.setAttribute('y', py - 14); }); rlbl.textContent = `(${x}, ${y})`; },
    found(){ return dots.querySelectorAll('.okd').length; },
    pick(mode){ /* mode 'solution' | 'any' */
      return new Promise(res => {
        svg.querySelector('#lr-hit') && svg.querySelector('#lr-hit').remove();
        const hit = elNS('rect', { x: CX - 6.6*U, y: CY - 5*U, width: 13.2*U, height: 10*U, fill: 'transparent', id: 'lr-hit' });
        svg.insertBefore(hit, dots);
        hit.style.cursor = 'crosshair';
        hit.onpointerdown = e => {
          const p = svgPoint(svg, e.clientX, e.clientY);
          const x = Math.round((p.x - CX) / U), y = Math.round((CY - p.y) / U);
          if (Math.abs(x) > 6 || Math.abs(y) > 4) return;
          const { a, b, c } = this._abc;
          const on = a * x + b * y === c;
          const [px, py] = PX(x, y);
          if (on){ Sfx.ok(); dots.innerHTML += `<g class="okd"><circle cx="${px}" cy="${py}" r="7" fill="var(--good)"/><circle cx="${px}" cy="${py}" r="12" fill="none" stroke="var(--good)" opacity=".5"/><text x="${px}" y="${py - 14}" text-anchor="middle" class="svgtext" font-size="11" fill="var(--good)">(${x},${y})</text></g>`; }
          else { Sfx.bad(); dots.innerHTML += `<g class="bad"><circle cx="${px}" cy="${py}" r="6" fill="none" stroke="var(--bad)" stroke-width="2.5"/><line x1="${px-4}" y1="${py-4}" x2="${px+4}" y2="${py+4}" stroke="var(--bad)" stroke-width="2.5"/><line x1="${px+4}" y1="${py-4}" x2="${px-4}" y2="${py+4}" stroke="var(--bad)" stroke-width="2.5"/></g>`; }
          if (mode === 'solution' && !on){ /* keep */ }
          res({ x, y, on });
        };
      });
    },
    stopPick(){ const h = svg.querySelector('#lr-hit'); if (h) h.remove(); },
    say(t){ read.innerHTML = t; },
    btn(t, fn){ const b = el('button', 'wbtn', t); b.onclick = () => { Sfx.tap(); fn(b); }; ctl.appendChild(b); return b; },
    ctlClear(){ ctl.innerHTML = ''; }
  };
  return api;
};

/* ---------- BALANCE LAB ---------- */
WIDG.balance = function(box){
  box.innerHTML = `<div id="bl-beam" style="position:relative;margin:8px auto 0;width:min(430px,100%);transition:transform .5s cubic-bezier(.34,1.3,.4,1)">
      <div style="height:10px;border-radius:6px;background:linear-gradient(180deg,#5A688A,#31415F);box-shadow:0 6px 14px rgba(0,0,0,.4)"></div>
      <div style="display:flex;justify-content:space-between;padding:0 30px">
        <div id="bl-L" style="flex:1;margin:0 8px;padding:10px;border-radius:14px;background:rgba(255,255,255,.05);border:1px solid var(--line);min-height:86px;display:flex;flex-wrap:wrap;gap:6px;align-items:center;justify-content:center"></div>
        <div style="align-self:center;font-family:var(--disp);font-weight:800;font-size:22px;color:var(--dim)">=</div>
        <div id="bl-R" style="flex:1;margin:0 8px;padding:10px;border-radius:14px;background:rgba(255,255,255,.05);border:1px solid var(--line);min-height:86px;display:flex;flex-wrap:wrap;gap:6px;align-items:center;justify-content:center"></div>
      </div>
      <div style="text-align:center;margin-top:-2px"><div style="width:14px;height:26px;background:linear-gradient(180deg,#5A688A,#22304C);margin:0 auto;border-radius:0 0 6px 6px"></div><div style="width:76px;height:9px;background:#22304C;margin:0 auto;border-radius:5px"></div></div>
    </div>
    <div class="wctl" id="bl-ctl" style="padding-top:12px"></div>
    <div style="text-align:center;padding-bottom:10px"><span class="wlabel" id="bl-read"></span></div>`;
  const L = box.querySelector('#bl-L'), R = box.querySelector('#bl-R'), beam = box.querySelector('#bl-beam'), ctl = box.querySelector('#bl-ctl'), read = box.querySelector('#bl-read');
  let st = { xs:0, cl:0, cr:0 }, done = null;
  function chip(t, color){ const c = el('span', '', mf(t)); c.style.cssText = `font-family:var(--disp);font-weight:800;font-size:15px;padding:8px 12px;border-radius:10px;background:${color || 'rgba(242,180,65,.16)'};border:1.5px solid color-mix(in srgb,var(--gold) 45%,transparent);color:var(--gold2)`; return c; }
  function draw(){
    L.innerHTML = ''; R.innerHTML = '';
    for (let i = 0; i < st.xs; i++) L.appendChild(chip('x'));
    if (st.cl !== 0) L.appendChild(chip((st.cl > 0 ? '+ ' : '− ') + Math.abs(st.cl), 'rgba(255,255,255,.07)'));
    R.appendChild(chip(String(st.cr), 'rgba(124,226,175,.13)'));
    const d = (st.xs + st.cl) - st.cr;
    beam.style.transform = `rotate(${clamp(d * -1.6, -8, 8)}deg)`;
    if (st.xs === 1 && st.cl === 0 && done){ const f = done; done = null; beam.style.transform = 'rotate(0deg)'; read.innerHTML = `<b style="color:var(--good)">BALANCED.</b> x = ${st.cr} — you solved it by touching both sides equally.`; Sfx.unlock(); setTimeout(f, 800); }
  }
  function op(label, fn, kind){
    const b = el('button', 'wbtn', label);
    b.onclick = () => {
      const r = fn(st);
      if (!r){ Sfx.bad(); read.innerHTML = `<b style="color:var(--bad)">Can't do that cleanly here.</b>`; b.style.animation = 'shake .4s'; setTimeout(() => b.style.animation = '', 420); return; }
      Sfx.coin(); draw();
    };
    ctl.appendChild(b); return b;
  }
  const api = {
    node: box, read,
    load(xs, cl, cr, tip){ st = { xs, cl, cr }; done = null; ctl.innerHTML = ''; draw(); read.innerHTML = tip || 'Keep it balanced: whatever you do to the left, do to the right.'; },
    op,
    onSolved(cb){ done = cb; },
    say(t){ read.innerHTML = t; },
    get state(){ return st; }
  };
  return api;
};

/* ---------- ANGLE LAB ---------- */
WIDG.angle = function(box){
  box.innerHTML = NSVG('0 0 420 260') + `<g id="an-g"></g></svg>
    <div class="wctl" id="an-ctl"></div>
    <div style="text-align:center;padding-bottom:10px"><span class="wlabel" id="an-read"></span></div>`;
  const svg = box.querySelector('svg'), g = svg.querySelector('#an-g'), read = box.querySelector('#an-read'), ctl = box.querySelector('#an-ctl');
  let mode = 'pair', theta = 60, onChip = null;
  const CXa = 210, CYa = 130;
  function arcPath(cx, cy, r, a1, a2){
    const large = Math.abs(a2 - a1) > 180 ? 1 : 0;
    const x1 = cx + r * Math.cos(a1 * Math.PI / 180), y1 = cy - r * Math.sin(a1 * Math.PI / 180);
    const x2 = cx + r * Math.cos(a2 * Math.PI / 180), y2 = cy - r * Math.sin(a2 * Math.PI / 180);
    return `M ${x1} ${y1} A ${r} ${r} 0 ${large} ${a1 > a2 ? 1 : 0} ${x2} ${y2}`;
  }
  function chipAt(x, y, label, val, key){
    const gg = elNS('g', { class:'anchip', style:'cursor:pointer' });
    gg.innerHTML = `<circle cx="${x}" cy="${y}" r="15" fill="rgba(255,255,255,.07)" stroke="var(--wc)" stroke-width="1.5" stroke-dasharray="3 3"/><text x="${x}" y="${y + 4}" text-anchor="middle" class="svgtext" font-size="10.5" fill="var(--ink)">${label}</text>`;
    gg.addEventListener('click', () => { if (onChip) onChip({ key, val }); else { Sfx.tap(); read.innerHTML = `∠${label} = <b style="color:var(--wc)">${val}°</b>`; } });
    g.appendChild(gg);
  }
  function draw(){
    g.innerHTML = '';
    if (mode === 'pair'){
      const th = theta;
      const qx = CXa + 130 * Math.cos(th * Math.PI / 180), qy = CYa - 130 * Math.sin(th * Math.PI / 180);
      g.innerHTML = `
        <line x1="${CXa - 150}" y1="${CYa}" x2="${CXa + 150}" y2="${CYa}" stroke="rgba(255,255,255,.65)" stroke-width="3"/>
        <line x1="${CXa}" y1="${CYa}" x2="${CXa + 150}" y2="${CYa}" stroke="var(--wc)" stroke-width="3.5"/>
        <line x1="${CXa}" y1="${CYa}" x2="${qx}" y2="${qy}" stroke="var(--gold)" stroke-width="3.5" stroke-linecap="round"/>
        <path d="${arcPath(CXa, CYa, 34, 0, th)}" fill="none" stroke="var(--wc)" stroke-width="2" opacity=".8"/>
        <path d="${arcPath(CXa, CYa, 46, th, 180)}" fill="none" stroke="var(--gold)" stroke-width="2" opacity=".8"/>
        <text x="${CXa + 52 * Math.cos(th/2 * Math.PI/180)}" y="${CYa - 52 * Math.sin(th/2 * Math.PI/180) + 4}" class="svgtext" font-size="12.5" fill="var(--wc)">${th}°</text>
        <text x="${CXa + 64 * Math.cos((th+180)/2 * Math.PI/180)}" y="${CYa - 64 * Math.sin((th+180)/2 * Math.PI/180) + 4}" class="svgtext" font-size="12.5" fill="var(--gold)">${180 - th}°</text>
        <circle cx="${qx}" cy="${qy}" r="11" fill="var(--gold)" class="dragdot" id="an-handle"/>
        <text x="${CXa}" y="${CYa + 34}" text-anchor="middle" class="svgtext" font-size="11" fill="#9AA8BE">O — drag the gold ray</text>`;
      read.innerHTML = `${th}° + ${180 - th}° = <b style="color:var(--gold)">180°</b> — always, a straight line is 180°.`;
      sdrag(svg.querySelector('#an-handle'), svg, p => { theta = clamp(Math.round(Math.atan2(CYa - p.y, p.x - CXa) * 180 / Math.PI), 12, 168); draw(); });
    } else if (mode === 'vert'){
      const th = theta;
      const ex1 = CXa + 140 * Math.cos(th * Math.PI / 180), ey1 = CYa - 140 * Math.sin(th * Math.PI / 180);
      const ex2 = CXa - 140 * Math.cos(th * Math.PI / 180), ey2 = CYa + 140 * Math.sin(th * Math.PI / 180);
      g.innerHTML = `
        <line x1="${CXa - 150}" y1="${CYa}" x2="${CXa + 150}" y2="${CYa}" stroke="rgba(255,255,255,.65)" stroke-width="3"/>
        <line x1="${ex2}" y1="${ey2}" x2="${ex1}" y2="${ey1}" stroke="var(--gold)" stroke-width="3.5" stroke-linecap="round"/>
        <path d="${arcPath(CXa, CYa, 30, 0, th)}" fill="none" stroke="var(--wc)" stroke-width="2"/>
        <path d="${arcPath(CXa, CYa, 30, 180, 180 + th)}" fill="none" stroke="var(--wc)" stroke-width="2"/>
        <text x="${CXa + 44 * Math.cos(th/2 * Math.PI/180)}" y="${CYa - 44 * Math.sin(th/2 * Math.PI/180) + 4}" class="svgtext" font-size="12" fill="var(--wc)">${th}°</text>
        <text x="${CXa + 44 * Math.cos((180 + th/2) * Math.PI/180)}" y="${CYa - 44 * Math.sin((180 + th/2) * Math.PI/180) + 4}" class="svgtext" font-size="12" fill="var(--wc)">${th}°</text>
        <circle cx="${ex1}" cy="${ey1}" r="11" fill="var(--gold)" class="dragdot" id="an-handle"/>
        <text x="${CXa}" y="${CYa + 42}" text-anchor="middle" class="svgtext" font-size="11" fill="#9AA8BE">X-cross — opposite angles always match</text>`;
      sdrag(svg.querySelector('#an-handle'), svg, p => { theta = clamp(Math.round(Math.atan2(CYa - p.y, p.x - CXa) * 180 / Math.PI), 15, 165); draw(); });
    } else if (mode === 'parallel'){
      const th = theta;
      const y1 = 70, y2 = 190;
      const T = (y) => { const dx = (y - y1) / Math.tan(th * Math.PI / 180); return CXa + dx; };
      const t0 = CXa - (y1 - 30) / Math.tan(th * Math.PI / 180) - 60, t1 = CXa - (y2 - 30) / Math.tan(th * Math.PI / 180) + 90;
      const P1 = T(y1), P2 = T(y2);
      g.innerHTML = `
        <line x1="30" y1="${y1}" x2="390" y2="${y1}" stroke="rgba(255,255,255,.65)" stroke-width="3"/>
        <line x1="30" y1="${y2}" x2="390" y2="${y2}" stroke="rgba(255,255,255,.65)" stroke-width="3"/>
        <line x1="${t0}" y1="30" x2="${t1}" y2="230" stroke="var(--gold)" stroke-width="3.5" stroke-linecap="round"/>
        <circle cx="${t0}" cy="30" r="11" fill="var(--gold)" class="dragdot" id="an-handle"/>
        <text x="34" y="${y1 - 8}" class="svgtext" font-size="10.5" fill="#9AA8BE">line m</text><text x="34" y="${y2 - 8}" class="svgtext" font-size="10.5" fill="#9AA8BE">line n</text>`;
      const V = 180 - th;
      chipAt(P1 + 42, y1 - 22, '1', th, '0ne'); chipAt(P1 - 42, y1 - 22, '2', V, '0nw');
      chipAt(P1 - 42, y1 + 24, '3', V, '0sw'); chipAt(P1 + 42, y1 + 24, '4', th, '0se');
      chipAt(P2 + 42, y2 - 24, '5', th, '1ne'); chipAt(P2 - 42, y2 - 24, '6', V, '1nw');
      chipAt(P2 - 42, y2 + 26, '7', V, '1sw'); chipAt(P2 + 42, y2 + 26, '8', th, '1se');
      sdrag(svg.querySelector('#an-handle'), svg, p => { theta = clamp(Math.round(Math.atan2(p.y - 30, p.x - t0) * 180 / Math.PI), 20, 160); draw(); if (theta < 20) theta = 20; });
    } else if (mode === 'tri'){
      const A = { x: CXa - 110, y: 190 }, B = { x: CXa + 110, y: 190 }, C = api._C || { x: CXa + 30, y: 52 };
      const sid = (P, Q) => Math.round(Math.hypot(P.x - Q.x, P.y - Q.y) / 26 * 10) / 10;
      const ang = (P, Q, R) => { const a1 = Math.atan2(Q.y - P.y, Q.x - P.x), a2 = Math.atan2(R.y - P.y, R.x - P.x); let d = Math.abs(a1 - a2) * 180 / Math.PI; if (d > 180) d = 360 - d; return Math.round(d); };
      const Aa = ang(A, B, C), Ba = ang(B, C, A), Ca = ang(C, A, B);
      g.innerHTML = `
        <path d="M ${A.x} ${A.y} L ${B.x} ${B.y} L ${C.x} ${C.y} Z" fill="var(--wc)" opacity=".14" stroke="var(--wc)" stroke-width="3"/>
        <path d="${arcPath(A.x, A.y, 26, Math.atan2(B.y - A.y, B.x - A.x) * 180 / Math.PI, Math.atan2(C.y - A.y, C.x - A.x) * 180 / Math.PI)}" fill="none" stroke="var(--gold)" stroke-width="2"/>
        <path d="${arcPath(B.x, B.y, 26, Math.atan2(C.y - B.y, C.x - B.x) * 180 / Math.PI, Math.atan2(A.y - B.y, A.x - B.x) * 180 / Math.PI)}" fill="none" stroke="var(--gold)" stroke-width="2"/>
        <path d="${arcPath(C.x, C.y, 26, Math.atan2(A.y - C.y, A.x - C.x) * 180 / Math.PI, Math.atan2(B.y - C.y, B.x - C.x) * 180 / Math.PI)}" fill="none" stroke="var(--gold)" stroke-width="2"/>
        <circle cx="${A.x}" cy="${A.y}" r="10" fill="var(--wc)" class="dragdot" data-v="A"/><circle cx="${B.x}" cy="${B.y}" r="10" fill="var(--wc)" class="dragdot" data-v="B"/><circle cx="${C.x}" cy="${C.y}" r="10" fill="var(--gold)" class="dragdot" data-v="C"/>
        <text x="${A.x - 16}" y="${A.y + 20}" class="svgtext" font-size="12" fill="#9AA8BE">A ${Aa}°</text>
        <text x="${B.x + 6}" y="${B.y + 20}" class="svgtext" font-size="12" fill="#9AA8BE">B ${Ba}°</text>
        <text x="${C.x}" y="${C.y - 16}" text-anchor="middle" class="svgtext" font-size="12" fill="var(--gold)">C ${Ca}°</text>`;
      read.innerHTML = `${Aa}° + ${Ba}° + ${Ca}° = <b style="color:var(--gold)">${Aa + Ba + Ca}°</b> — drag any corner, it never changes.`;
      svg.querySelectorAll('.dragdot').forEach(h => {
        sdrag(h, svg, p => {
          const v = h.dataset.v;
          if (v === 'C'){ api._C = { x: clamp(p.x, 60, 380), y: clamp(p.y, 40, 180) }; } else if (v === 'A'){ A.x = clamp(p.x, 40, 200); A.y = clamp(p.y, 150, 235); api._A = A; } else { B.x = clamp(p.x, 220, 390); B.y = clamp(p.y, 150, 235); api._B = B; }
          draw();
        });
      });
    }
  }
  const api = {
    node: box, read, ctl,
    mode(m){ mode = m; onChip = null; ctl.innerHTML = ''; draw(); },
    set(t){ theta = t; draw(); },
    get theta(){ return theta; },
    say(s){ read.innerHTML = s; },
    pickChip(cb){ onChip = cb; },
    btn(t, fn){ const b = el('button', 'wbtn', t); b.onclick = () => { Sfx.tap(); fn(b); }; ctl.appendChild(b); return b; },
    resetTri(){ api._C = { x: CXa + 30, y: 52 }; api._A = null; api._B = null; if (mode === 'tri') draw(); }
  };
  draw();
  return api;
};
