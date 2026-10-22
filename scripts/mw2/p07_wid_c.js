/* ============ WIDGETS C ============ */
/* ---------- TRIANGLE FORGE ---------- */
WIDG.tri = function(box){
  box.innerHTML = NSVG('0 0 440 270') + `<g id="tf-g"></g></svg>
    <div class="wctl" id="tf-ctl"></div>
    <div style="text-align:center;padding-bottom:10px"><span class="wlabel" id="tf-read"></span></div>`;
  const svg = box.querySelector('svg'), g = svg.querySelector('#tf-g'), read = box.querySelector('#tf-read'), ctl = box.querySelector('#tf-ctl');
  let sides = [3, 4, 5];
  function triPts(a, b, c){
    const S = 40, W = 300, H = 190;
    const sc = Math.min(S * 7 / (a + b + c), 2);
    const cx = 0, A = { x: 60, y: 232 };
    const B = { x: A.x + c * sc * 1.35, y: A.y };
    const x = (b*b + c*c - a*a) / (2*c), y = Math.sqrt(Math.max(0, b*b - x*x));
    const C = { x: A.x + x * sc * 1.35, y: A.y - y * sc * 1.35 };
    return [A, B, C];
  }
  function drawTri(pts, labels, opts={}){
    const [A, B, C] = pts;
    const tick = (P, Q, n, col) => { const mx = (P.x + Q.x)/2, my = (P.y + Q.y)/2; const dx = Q.x - P.x, dy = Q.y - P.y; const L = Math.hypot(dx, dy); const nx = -dy/L, ny = dx/L; let s = ''; for (let i = 0; i < n; i++){ const o = (i - (n-1)/2) * 5; s += `<line x1="${mx + nx*6 + dx/L*o}" y1="${my + ny*6 + dy/L*o}" x2="${mx - nx*6 + dx/L*o}" y2="${my - ny*6 + dy/L*o}" stroke="${col}" stroke-width="2.4"/>`; } return s; };
    return `<path d="M ${A.x} ${A.y} L ${B.x} ${B.y} L ${C.x} ${C.y} Z" fill="${opts.fill || 'var(--wc)'}" fill-opacity="${opts.fillOp || .15}" stroke="${opts.stroke || 'var(--wc)'}" stroke-width="3" ${opts.dash ? 'stroke-dasharray="7 5"' : ''} style="transition:all .6s cubic-bezier(.22,1,.36,1)"/>
      ${labels ? `<text x="${(A.x + B.x)/2}" y="${A.y + 18}" text-anchor="middle" class="svgtext" font-size="12.5" fill="var(--gold2)">${labels[0]}</text><text x="${(B.x + C.x)/2 + 14}" y="${(B.y + C.y)/2}" class="svgtext" font-size="12.5" fill="var(--gold2)">${labels[1]}</text><text x="${(A.x + C.x)/2 - 16}" y="${(A.y + C.y)/2}" text-anchor="end" class="svgtext" font-size="12.5" fill="var(--gold2)">${labels[2]}</text>` : ''}
      ${opts.ticks || ''}`;
  }
  function sliderRow(label, val, min, max, cb){
    const d = el('div', '', `<span class="wlabel" style="min-width:120px">${label} = <b class="wnum">${val}</b></span>`);
    const s = el('input', 'slider'); s.type = 'range'; s.min = min; s.max = max; s.value = val; s.step = 1;
    s.oninput = () => { d.querySelector('b').textContent = s.value; cb(+s.value); };
    d.appendChild(s); d.style.cssText = 'display:flex;align-items:center;gap:10px;justify-content:center;flex-wrap:wrap';
    return d;
  }
  const api = {
    node: box, read, ctl,
    say(t){ read.innerHTML = t; },
    btn(t, fn){ const b = el('button', 'wbtn', t); b.onclick = () => { Sfx.tap(); fn(b); }; ctl.appendChild(b); return b; },
    ctlClear(){ ctl.innerHTML = ''; },
    setSides(a, b, c){ sides = [a, b, c]; },
    free(){ /* draggable triangle with live angles */
      const A = { x: 110, y: 210 }, B = { x: 330, y: 210 }; let C = { x: 220, y: 60 };
      const ang = (P, Q, R) => { const a1 = Math.atan2(Q.y - P.y, Q.x - P.x), a2 = Math.atan2(R.y - P.y, R.x - P.x); let d = Math.abs(a1 - a2) * 180 / Math.PI; return d > 180 ? 360 - d : d; };
      const dr = () => {
        const Aa = Math.round(ang(A, B, C)), Ba = Math.round(ang(B, C, A)), Ca = 180 - Aa - Ba;
        g.innerHTML = drawTri([A, B, C]) + `
          <circle cx="${A.x}" cy="${A.y}" r="10" fill="var(--wc)" class="dragdot" data-v="A"/><circle cx="${B.x}" cy="${B.y}" r="10" fill="var(--wc)" class="dragdot" data-v="B"/><circle cx="${C.x}" cy="${C.y}" r="10" fill="var(--gold)" class="dragdot" data-v="C"/>
          <text x="${A.x - 14}" y="${A.y + 22}" class="svgtext" font-size="12" fill="#9AA8BE">${Aa}°</text>
          <text x="${B.x + 4}" y="${B.y + 22}" class="svgtext" font-size="12" fill="#9AA8BE">${Ba}°</text>
          <text x="${C.x}" y="${C.y - 15}" text-anchor="middle" class="svgtext" font-size="12" fill="var(--gold)">${Ca}°</text>`;
        read.innerHTML = `angles: ${Aa}° + ${Ba}° + ${Ca}° = <b style="color:var(--gold)">${Aa + Ba + Ca}°</b>`;
        svg.querySelectorAll('.dragdot').forEach(h => { h.onpointerdown = null; sdrag(h, svg, p => { const v = h.dataset.v; if (v === 'C') C = { x: clamp(p.x, 70, 370), y: clamp(p.y, 45, 200) }; else if (v === 'A'){ A.x = clamp(p.x, 50, 300); A.y = clamp(p.y, 160, 235); } else { B.x = clamp(p.x, 140, 390); B.y = clamp(p.y, 160, 235); } dr(); }); });
      };
      dr();
    },
    heron(){
      ctl.innerHTML = '';
      const draw2 = () => {
        const [a, b, c] = sides;
        const ok = a + b > c && b + c > a && a + c > b;
        if (!ok){
          g.innerHTML = `<path d="M 60 232 L 340 232" stroke="var(--bad)" stroke-width="3" stroke-dasharray="8 6"/><circle cx="60" cy="232" r="5" fill="var(--bad)"/><circle cx="340" cy="232" r="5" fill="var(--bad)"/><text x="200" y="120" text-anchor="middle" class="svgtext" font-size="15" fill="var(--bad)">these 3 sides can't close — the gate is locked</text><text x="200" y="145" text-anchor="middle" font-size="12" fill="#9AA8BE">two sides together must beat the third</text>`;
          read.innerHTML = `<b style="color:var(--bad)">Invalid triangle.</b> a + b must be greater than c.`;
          return null;
        }
        const pts = triPts(a, b, c);
        const s = (a + b + c) / 2, area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
        g.innerHTML = drawTri(pts, ['c = ' + c, 'a = ' + a, 'b = ' + b], { fillOp: .12 }) + `<path id="tf-water" d="M ${pts[0].x} ${pts[0].y} L ${pts[1].x} ${pts[1].y} L ${pts[2].x} ${pts[2].y} Z" fill="var(--cyan)" opacity="0"/>`;
        read.innerHTML = `s = (a+b+c)/2 = ${fr(s)} &nbsp;·&nbsp; Area = √(s(s−a)(s−b)(s−c)) = <b style="color:var(--gold)">${fr(Math.round(area * 100) / 100)}</b>`;
        return area;
      };
      ctl.appendChild(sliderRow('side a', sides[0], 2, 9, v => { sides[0] = v; draw2(); }));
      ctl.appendChild(sliderRow('side b', sides[1], 2, 9, v => { sides[1] = v; draw2(); }));
      ctl.appendChild(sliderRow('side c', sides[2], 2, 9, v => { sides[2] = v; draw2(); }));
      const area = draw2();
      return area;
    },
    fillWater(amount){
      const w = svg.querySelector('#tf-water'); if (!w) return;
      return tween(900, p => w.setAttribute('opacity', p * (amount || .45)));
    },
    async snapDemo(s1, s2, s3){
      const pts1 = triPts(s1, s2, s3);
      g.innerHTML = drawTri(pts1, [`c=${s3}`, `a=${s1}`, `b=${s2}`], { ticks: drawTri(pts1, null, { fillOp: 0 }).includes('x') ? '' : '' }) ;
      const base = drawTri(pts1, [`c=${s3}`, `a=${s1}`, `b=${s2}`]);
      g.innerHTML = base + `<g id="tf-clone" transform="translate(150 0) rotate(6 220 130)" style="transition:transform .8s cubic-bezier(.22,1,.36,1)">${drawTri(pts1, null, { stroke: 'var(--gold)', fill: 'var(--gold)', fillOp: .18, dash: true })}</g>
        <text x="150" y="36" class="svgtext" font-size="12" fill="#9AA8BE">same 3 sides, random pose…</text>`;
      read.innerHTML = `Both triangles: sides ${s1}, ${s2}, ${s3}. Watch the gold one…`;
      await wait(900);
      svg.querySelector('#tf-clone').setAttribute('transform', 'translate(0 0) rotate(0 220 130)');
      await wait(900);
      read.innerHTML = `<b style="color:var(--good)">SNAP — perfect overlap.</b> Same three sides forces the same triangle. That's SSS.`;
      Sfx.unlock();
    }
  };
  return api;
};

/* ---------- QUAD SLICER ---------- */
WIDG.quad = function(box){
  box.innerHTML = NSVG('0 0 440 270') + `<g id="qd-g"></g></svg>
    <div class="wctl" id="qd-ctl"></div>
    <div style="text-align:center;padding-bottom:10px"><span class="wlabel" id="qd-read"></span></div>`;
  const svg = box.querySelector('svg'), g = svg.querySelector('#qd-g'), read = box.querySelector('#qd-read'), ctl = box.querySelector('#qd-ctl');
  let A = { x: 80, y: 205 }, B = { x: 250, y: 205 }, C = { x: 330, y: 75 }, D = { x: 160, y: 75 };
  const path = (...ps) => 'M ' + ps.map(p => `${p.x} ${p.y}`).join(' L ') + ' Z';
  const api = {
    node: box, read, ctl,
    say(t){ read.innerHTML = t; },
    btn(t, fn){ const b = el('button', 'wbtn', t); b.onclick = () => { Sfx.tap(); fn(b); }; ctl.appendChild(b); return b; },
    drawQuad(){
      g.innerHTML = `<path d="${path(A, B, C, D)}" fill="var(--wc)" fill-opacity=".13" stroke="var(--wc)" stroke-width="3"/>
        <text x="${(A.x+B.x)/2}" y="${A.y + 20}" text-anchor="middle" class="svgtext" font-size="12" fill="#9AA8BE">A</text>
        <text x="${(B.x+C.x)/2 + 14}" y="${(B.y+C.y)/2}" class="svgtext" font-size="12" fill="#9AA8BE">B</text>
        <text x="${(C.x+D.x)/2}" y="${C.y - 12}" text-anchor="middle" class="svgtext" font-size="12" fill="#9AA8BE">C</text>
        <text x="${(D.x+A.x)/2 - 14}" y="${(D.y+A.y)/2}" class="svgtext" font-size="12" fill="#9AA8BE">D</text>`;
    },
    async slice(){
      this.drawQuad();
      await wait(400);
      const mid1 = { x: (A.x + C.x) / 2, y: (A.y + C.y) / 2 };
      g.innerHTML = `
        <g id="qd-h1" style="transition:transform .7s cubic-bezier(.22,1,.36,1)"><path d="${path(A, B, C)}" fill="var(--gold)" fill-opacity=".3" stroke="var(--gold)" stroke-width="3"/><text x="${(A.x+B.x+C.x)/3}" y="${(A.y+B.y+C.y)/3}" text-anchor="middle" class="svgtext" font-size="13" fill="var(--gold2)">△ABC = 180°</text></g>
        <g id="qd-h2" style="transition:transform .7s cubic-bezier(.22,1,.36,1)"><path d="${path(A, C, D)}" fill="var(--teal)" fill-opacity=".3" stroke="var(--teal)" stroke-width="3"/><text x="${(A.x+C.x+D.x)/3}" y="${(A.y+C.y+D.y)/3}" text-anchor="middle" class="svgtext" font-size="13" fill="var(--teal)">△ACD = 180°</text></g>
        <line x1="${A.x}" y1="${A.y}" x2="${C.x}" y2="${C.y}" stroke="#fff" stroke-width="2" stroke-dasharray="6 5" opacity=".7"/>`;
      Sfx.slash();
      await wait(350);
      const dx = (C.x - A.x), dy = (C.y - A.y), L = Math.hypot(dx, dy), nx = -dy / L, ny = dx / L;
      svg.querySelector('#qd-h1').setAttribute('transform', `translate(${nx * 26} ${ny * 26})`);
      svg.querySelector('#qd-h2').setAttribute('transform', `translate(${-nx * 26} ${-ny * 26})`);
      await wait(800);
      read.innerHTML = `One diagonal → two triangles → <b style="color:var(--gold)">180° + 180° = 360°</b>. Every quadrilateral. Always.`;
      Sfx.unlock();
      await wait(600);
    },
    para(){
      let slant = 70, width = 190, cyT = 70, cyB = 205;
      const dr = () => {
        const A2 = { x: 90, y: cyB }, B2 = { x: 90 + width, y: cyB }, C2 = { x: 90 + width + slant, y: cyT }, D2 = { x: 90 + slant, y: cyT };
        const m1 = { x: (A2.x + C2.x) / 2, y: (A2.y + C2.y) / 2 }, m2 = { x: (B2.x + D2.x) / 2, y: (B2.y + D2.y) / 2 };
        g.innerHTML = `<path d="${path(A2, B2, C2, D2)}" fill="var(--wc)" fill-opacity=".12" stroke="var(--wc)" stroke-width="3"/>
          <line x1="${A2.x}" y1="${A2.y}" x2="${C2.x}" y2="${C2.y}" stroke="var(--gold)" stroke-width="2" stroke-dasharray="6 5"/>
          <line x1="${B2.x}" y1="${B2.y}" x2="${D2.x}" y2="${D2.y}" stroke="var(--gold)" stroke-width="2" stroke-dasharray="6 5"/>
          <circle cx="${(m1.x + m2.x) / 2}" cy="${(m1.y + m2.y) / 2}" r="5.5" fill="var(--gold)"/>
          <line x1="${A2.x}" y1="${A2.y + 12}" x2="${B2.x}" y2="${B2.y + 12}" stroke="var(--teal)" stroke-width="2.4"/><line x1="${D2.x}" y1="${D2.y - 12}" x2="${C2.x}" y2="${C2.y - 12}" stroke="var(--teal)" stroke-width="2.4"/>
          <circle cx="${A2.x}" cy="${A2.y}" r="10" fill="var(--gold)" class="dragdot"/>
          <text x="${(A2.x+B2.x)/2}" y="${cyB + 34}" text-anchor="middle" class="svgtext" font-size="12" fill="#9AA8BE">drag gold dot → change the slant, properties never break</text>
          <text x="40" y="40" class="svgtext" font-size="12" fill="var(--teal)">opp. sides equal ∥</text>
          <text x="40" y="58" class="svgtext" font-size="12" fill="var(--gold)">diagonals bisect •</text>`;
        read.innerHTML = `opposite sides equal & parallel · opposite angles equal · diagonals bisect each other`;
        sdrag(svg.querySelector('.dragdot'), svg, p => { slant = clamp(p.x - 90 - width, -50, 150); cyT = clamp(p.y, 45, 150); dr(); });
      };
      dr();
    }
  };
  return api;
};

/* ---------- CIRCLE LAB ---------- */
WIDG.circle = function(box){
  box.innerHTML = NSVG('0 0 440 280') + `<g id="cl-g"></g></svg>
    <div class="wctl" id="cl-ctl"></div>
    <div style="text-align:center;padding-bottom:10px"><span class="wlabel" id="cl-read"></span></div>`;
  const svg = box.querySelector('svg'), g = svg.querySelector('#cl-g'), read = box.querySelector('#cl-read'), ctl = box.querySelector('#cl-ctl');
  const CX = 220, CY = 140, R = 92;
  const P = (deg, r=R) => [CX + r * Math.cos(deg * Math.PI / 180), CY - r * Math.sin(deg * Math.PI / 180)];
  function base(){
    return `<circle cx="${CX}" cy="${CY}" r="${R}" fill="var(--wc)" fill-opacity=".05" stroke="var(--wc)" stroke-width="3"/><circle cx="${CX}" cy="${CY}" r="4" fill="var(--gold)"/><text x="${CX + 8}" y="${CY + 16}" class="svgtext" font-size="12" fill="var(--gold)">O</text>`;
  }
  const api = {
    node: box, read, ctl,
    say(t){ read.innerHTML = t; },
    btn(t, fn){ const b = el('button', 'wbtn', t); b.onclick = () => { Sfx.tap(); fn(b); }; ctl.appendChild(b); return b; },
    chord(){
      let d = 46;
      const dr = () => {
        const half = Math.sqrt(R*R - d*d);
        const x1 = CX - half, x2 = CX + half, y = CY + d;
        g.innerHTML = base() + `
          <line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" stroke="var(--gold)" stroke-width="3.5"/>
          <line x1="${CX}" y1="${CY}" x2="${CX}" y2="${y}" stroke="var(--teal)" stroke-width="2" stroke-dasharray="5 4"/>
          <path d="M ${CX} ${y - 12} L ${CX + 12} ${y - 12} L ${CX + 12} ${y}" fill="none" stroke="var(--teal)" stroke-width="1.6"/>
          <circle cx="${CX}" cy="${y}" r="10" fill="var(--gold)" class="dragdot"/>
          <text x="${CX + 8}" y="${(CY + y)/2 + 4}" class="svgtext" font-size="12" fill="var(--teal)">d = ${fr(Math.round(d/R*100)/100)}r</text>
          <text x="${(x1 + x2)/2}" y="${y + 20}" text-anchor="middle" class="svgtext" font-size="12" fill="var(--gold)">chord = ${fr(Math.round(2*half/R*100)/100)}·r</text>
          <text x="${x1 - 8}" y="${y + 4}" text-anchor="end" class="svgtext" font-size="11" fill="#9AA8BE">drag me</text>`;
        read.innerHTML = `perpendicular from centre splits the chord in <b style="color:var(--gold)">half</b> — drag the chord up and down, it never fails.`;
        sdrag(svg.querySelector('.dragdot'), svg, p => { d = clamp(p.y - CY, 8, R - 12); dr(); });
      };
      dr();
    },
    equalChords(){
      const d = 40, half = Math.sqrt(R*R - d*d);
      g.innerHTML = base() + `
        <line x1="${CX - half}" y1="${CY - d}" x2="${CX + half}" y2="${CY - d}" stroke="var(--gold)" stroke-width="3.5"/>
        <line x1="${CX - half}" y1="${CY + d}" x2="${CX + half}" y2="${CY + d}" stroke="var(--teal)" stroke-width="3.5"/>
        <line x1="${CX}" y1="${CY}" x2="${CX}" y2="${CY - d}" stroke="#fff" stroke-width="1.6" stroke-dasharray="4 4" opacity=".7"/>
        <line x1="${CX}" y1="${CY}" x2="${CX}" y2="${CY + d}" stroke="#fff" stroke-width="1.6" stroke-dasharray="4 4" opacity=".7"/>
        <text x="${CX}" y="${CY - d - 10}" text-anchor="middle" class="svgtext" font-size="12" fill="var(--gold)">chord 1</text>
        <text x="${CX}" y="${CY + d + 24}" text-anchor="middle" class="svgtext" font-size="12" fill="var(--teal)">chord 2</text>`;
      read.innerHTML = `equal chords sit at <b style="color:var(--gold)">equal distances</b> from the centre — mirrored twins.`;
    },
    inscribed(){
      let pd = 305; /* point angle */
      const Aa = 150, Ba = 30;
      const dr = () => {
        const [ax, ay] = P(Aa), [bx, by] = P(Ba), [px, py] = P(pd);
        const central = Math.abs(Aa - Ba);
        const ins = Math.round(central / 2 * 10) / 10;
        g.innerHTML = base() + `
          <path d="M ${CX} ${CY} L ${ax} ${ay} A ${R} ${R} 0 0 0 ${bx} ${by} Z" fill="none" stroke="var(--teal)" stroke-width="2.2"/>
          <line x1="${ax}" y1="${ay}" x2="${px}" y2="${py}" stroke="var(--gold)" stroke-width="2.4"/>
          <line x1="${bx}" y1="${by}" x2="${px}" y2="${py}" stroke="var(--gold)" stroke-width="2.4"/>
          <circle cx="${px}" cy="${py}" r="10" fill="var(--gold)" class="dragdot"/>
          <text x="${(CX + ax)/2 - 6}" y="${(CY + ay)/2}" text-anchor="end" class="svgtext" font-size="11.5" fill="var(--teal)">A</text>
          <text x="${(CX + bx)/2 + 8}" y="${(CY + by)/2}" class="svgtext" font-size="11.5" fill="var(--teal)">B</text>
          <text x="${ax - 10}" y="${ay - 8}" text-anchor="end" class="svgtext" font-size="11.5" fill="var(--gold)">A</text>
          <text x="${bx + 10}" y="${by - 8}" class="svgtext" font-size="11.5" fill="var(--gold)">B</text>
          <text x="${(CX+ax+bx)/3}" y="${(CY+ay+by)/3 - 4}" text-anchor="middle" class="svgtext" font-size="12" fill="var(--teal)">centre: ${central}°</text>
          <text x="${px}" y="${py + 26}" text-anchor="middle" class="svgtext" font-size="12" fill="var(--gold)">edge: ${ins}°</text>`;
        read.innerHTML = `angle at centre <b style="color:var(--teal)">${central}°</b> · angle at edge <b style="color:var(--gold)">${ins}°</b> — the edge view is always HALF.`;
        sdrag(svg.querySelector('.dragdot'), svg, p => {
          pd = Math.atan2(CY - p.y, p.x - CX) * 180 / Math.PI;
          if (pd < 0) pd += 360;
          const lo = Ba, hi = Aa;
          if (!(pd > hi && pd < 360 + lo)) pd = clamp(pd, hi, lo + 360) % 360;
          dr();
        });
      };
      dr();
    },
    cyclic(){
      let dd = 320;
      const Aa = 160, Ba = 20, Ca = 285;
      const dr = () => {
        const [ax, ay] = P(Aa), [bx, by] = P(Ba), [cx2, cy2] = P(Ca), [dx, dy] = P(dd);
        const ang = (P1, P2, P3) => { const a1 = Math.atan2(P2.y - P1.y, P2.x - P1.x), a2 = Math.atan2(P3.y - P1.y, P3.x - P1.x); let r = Math.abs(a1 - a2) * 180 / Math.PI; return Math.round(r > 180 ? 360 - r : r); };
        const PA = { x: ax, y: ay }, PB = { x: bx, y: by }, PC = { x: cx2, y: cy2 }, PD = { x: dx, y: dy };
        const a1 = ang(PA, PB, PD) + ang(PA, PD, PB), s1 = ang(PA, PB, PD) + ang(PD, PB, PA);
        const A_ = ang(PA, PB, PD), C_ = ang(PC, PD, PB);
        g.innerHTML = base() + `
          <path d="M ${ax} ${ay} L ${bx} ${by} L ${cx2} ${cy2} L ${dx} ${dy} Z" fill="var(--wc)" fill-opacity=".12" stroke="var(--gold)" stroke-width="2.6"/>
          <circle cx="${dx}" cy="${dy}" r="10" fill="var(--gold)" class="dragdot"/>
          <text x="${ax - 12}" y="${ay}" text-anchor="end" class="svgtext" font-size="11.5" fill="var(--ink)">A ${A_}°</text>
          <text x="${bx + 10}" y="${by}" class="svgtext" font-size="11.5" fill="var(--ink)">B</text>
          <text x="${cx2}" y="${cy2 - 12}" text-anchor="middle" class="svgtext" font-size="11.5" fill="var(--ink)">C ${C_}°</text>
          <text x="${dx}" y="${dy + 24}" text-anchor="middle" class="svgtext" font-size="11.5" fill="var(--gold)">D — drag me around!</text>`;
        read.innerHTML = `∠A + ∠C = <b style="color:var(--gold)">${A_}° + ${C_}° = ${A_ + C_}°</b> — cyclic quadrilateral: opposite angles always pair to 180°.`;
        sdrag(svg.querySelector('.dragdot'), svg, p => { dd = Math.atan2(CY - p.y, p.x - CX) * 180 / Math.PI; if (dd < 0) dd += 360; if (dd > Aa && dd < 360) dd = Aa + 1; if (dd < Ba) dd = Ba - 1 + 360 > 360 ? 359 : dd; if (dd > Ca && dd < Aa) dd = Ca + 1; dr(); });
      };
      dr();
    }
  };
  return api;
};

/* ---------- UNWRAPPER (nets & volume) ---------- */
WIDG.solid = function(box){
  box.innerHTML = NSVG('0 0 440 280') + `<g id="so-g"></g></svg>
    <div class="wctl" id="so-ctl"></div>
    <div style="text-align:center;padding-bottom:10px"><span class="wlabel" id="so-read"></span></div>`;
  const svg = box.querySelector('svg'), g = svg.querySelector('#so-g'), read = box.querySelector('#so-read'), ctl = box.querySelector('#so-ctl');
  function slider(t, min, max, val, cb){
    const d = el('div', '', `<span class="wlabel">${t}</span>`);
    const s = el('input', 'slider'); s.type = 'range'; s.min = min; s.max = max; s.value = val;
    s.oninput = () => cb(+s.value);
    d.appendChild(s); d.style.cssText = 'display:flex;align-items:center;gap:10px';
    return d;
  }
  const api = {
    node: box, read, ctl,
    say(t){ read.innerHTML = t; },
    btn(t, fn){ const b = el('button', 'wbtn', t); b.onclick = () => { Sfx.tap(); fn(b); }; ctl.appendChild(b); return b; },
    ctlClear(){ ctl.innerHTML = ''; },
    cubeNet(){
      const u = 42, x0 = 130, y0 = 90;
      const faces = [
        { n:'back', fx: 2, fy: 1, c:'rgba(255,255,255,.10)' },
        { n:'left', fx: 1, fy: 1, c:'rgba(95,217,232,.4)' },
        { n:'front',fx: 2, fy: 1, c:'rgba(95,217,232,.55)', dy: 1 },
        { n:'right',fx: 3, fy: 1, c:'rgba(95,217,232,.4)' },
        { n:'top',  fx: 2, fy: 0, c:'rgba(255,255,255,.18)' },
        { n:'bottom',fx:2, fy: 2, c:'rgba(255,255,255,.14)' }
      ];
      const dr = (t) => {
        let s = `<text x="220" y="30" text-anchor="middle" class="svgtext" font-size="13" fill="var(--wc)">unwrap slider → the box opens flat</text>`;
        faces.forEach(f => {
          const closed = { x: x0 + u, y: y0 + u };
          const open = { x: x0 + f.fx * u, y: y0 + f.fy * u };
          const cx2 = lerp(closed.x, open.x, t), cy2 = lerp(closed.y, open.y, t);
          const sh = t > .92 ? `box-shadow:0 6px 14px rgba(0,0,0,.35);` : '';
          s += `<g transform="translate(${cx2} ${cy2})" style="transition:transform .1s linear"><rect width="${u}" height="${u}" rx="3" fill="${f.c}" stroke="rgba(255,255,255,.4)" stroke-width="1.4" style="${sh}"/><text x="${u/2}" y="${u/2 + 4}" text-anchor="middle" font-size="10" fill="#0B141B" font-weight="700" opacity="${t > .5 ? .9 : 0}">${f.n}</text></g>`;
        });
        if (t > .92) s += `<text x="220" y="${y0 + 3.4*u}" text-anchor="middle" class="svgtext" font-size="13" fill="var(--gold)">6 faces → surface area = 6 × side²</text>`;
        g.innerHTML = s;
      };
      dr(0);
      ctl.appendChild(slider('unwrap', 0, 100, 0, v => dr(v / 100)));
      read.innerHTML = 'A box is just 6 squares in disguise. Pull the slider.';
    },
    pour(){
      let level = 0; const bw = 120, bh = 150, bx = 160, by = 60;
      const rows = 5, cols = 3; let placed = 0; const total = rows * cols;
      const dr = () => {
        let s = `<rect x="${bx}" y="${by}" width="${bw}" height="${bh}" fill="none" stroke="rgba(255,255,255,.5)" stroke-width="3" rx="6"/>`;
        for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++){
          const i = r * cols + c;
          const on = i < placed;
          s += `<rect x="${bx + 4 + c * (bw - 8) / cols}" y="${by + bh - 4 - (r + 1) * (bh - 8) / rows}" width="${(bw - 8) / cols - 3}" height="${(bh - 8) / rows - 3}" rx="3" fill="${on ? 'var(--cyan)' : 'rgba(255,255,255,.06)'}" stroke="rgba(255,255,255,.25)" style="transition:fill .3s"/>`;
        }
        s += `<text x="${bx + bw + 16}" y="${by + bh/2}" class="svgtext" font-size="15" fill="var(--gold)">${placed} cubes</text>`;
        if (placed === total) s += `<text x="${bx + bw/2}" y="${by - 12}" text-anchor="middle" class="svgtext" font-size="14" fill="var(--good)">V = ${cols} × ${rows} = ${total} unit cubes!</text>`;
        g.innerHTML = s;
      };
      dr();
      read.innerHTML = 'Tap ADD — stack unit cubes until the box is full. Volume = how many cubes fit inside.';
      ctl.appendChild(api.btn('+ 1 layer of cubes', () => { if (placed < total){ placed += cols; Sfx.coin(); dr(); if (placed >= total){ Sfx.unlock(); if (api._full) api._full(); } } }));
      ctl.appendChild(api.btn('reset', () => { placed = 0; dr(); }));
      api.onFull = cb => api._full = cb;
    },
    cylNet(){
      const dr = (t) => {
        const spread = t * 120;
        g.innerHTML = `
          <ellipse cx="${220 - spread}" cy="150" rx="34" ry="12" fill="rgba(95,217,232,.4)" stroke="rgba(255,255,255,.5)" style="transition:transform .1s"/>
          <rect x="186" y="66" width="120" height="168" fill="rgba(95,217,232,.3)" stroke="rgba(255,255,255,.5)" transform="translate(${spread * .1} 0)"/>
          <ellipse cx="${220 + spread + 100}" cy="150" rx="34" ry="12" fill="rgba(95,217,232,.4)" stroke="rgba(255,255,255,.5)"/>
          <text x="246" y="150" text-anchor="middle" font-size="11" fill="#0B141B" font-weight="700" opacity="${t > .5 ? 1 : 0}">2πr × h</text>
          ${t > .92 ? `<text x="220" y="264" text-anchor="middle" class="svgtext" font-size="13" fill="var(--gold)">rolled flat: rectangle 2πr wide × h tall → CSA = 2πrh</text>` : ''}`;
      };
      dr(0);
      ctl.appendChild(slider('unroll', 0, 100, 0, v => dr(v / 100)));
      read.innerHTML = 'A cylinder is a rolled-up rectangle plus two circle lids.';
    }
  };
  return api;
};

/* ---------- REMAINDER MACHINE ---------- */
WIDG.remainder = function(box){
  box.innerHTML = `<div style="display:grid;place-items:center;padding:8px 8px 0">
    <div id="rm-p" style="font-family:var(--disp);font-weight:700;font-size:16px;color:var(--ink)">p(x) = x<sup>3</sup> − 3x<sup>2</sup> + 4x − 4</div>
    <div id="rm-work" style="font-family:var(--disp);font-weight:800;font-size:22px;margin-top:10px;min-height:34px;color:var(--gold2)"></div>
    <div id="rm-msg" style="font-size:12.5px;color:var(--dim);min-height:20px;margin-top:2px;text-align:center"></div></div>
    <div id="rm-ctl" style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;padding:8px 10px 18px"></div>`;
  const pL = box.querySelector('#rm-p'), work = box.querySelector('#rm-work'), msg = box.querySelector('#rm-msg'), ctl = box.querySelector('#rm-ctl');
  const polys = [
    { txt:'p(x) = x<sup>3</sup> − 3x<sup>2</sup> + 4x − 4', f: x => x*x*x - 3*x*x + 4*x - 4 },
    { txt:'p(x) = x<sup>3</sup> + x<sup>2</sup> − 5x + 2', f: x => x*x*x + x*x - 5*x + 2 },
    { txt:'p(x) = 2x<sup>3</sup> − x<sup>2</sup> − 8x + 4', f: x => 2*x*x*x - x*x - 8*x + 4 } ];
  let cur = polys[0], testA = 1;
  function work2(){
    const v = cur.f(testA);
    work.innerHTML = `p(${testA}) = ${v}`;
    work.style.color = v === 0 ? 'var(--good)' : 'var(--gold2)';
    msg.innerHTML = v === 0 ? `<b style="color:var(--good)">Remainder 0 → (x − ${testA}) IS a factor. Jackpot.</b>` : `Leftover gold when dividing by (x − ${testA}): <b>${v}</b>`;
    Sfx.tap();
    if (v === 0 && api._zero){ const cb = api._zero; api._zero = null; setTimeout(cb, 500); }
  }
  const api = {
    node: box,
    say(t){ msg.innerHTML = t; },
    load(i){ cur = polys[i % polys.length]; pL.innerHTML = cur.txt; work2(); },
    test(a){ testA = a; work2(); },
    get value(){ return cur.f(testA); },
    buttons(list){
      ctl.innerHTML = '';
      list.forEach(a => { const b = el('button', 'wbtn', `test x = ${a}`); b.style.minWidth = '96px'; b.onclick = () => api.test(a); ctl.appendChild(b); });
    },
    onZero(cb){ api._zero = cb; }
  };
  return api;
};

/* ---------- MIDPOINT BRIDGE ---------- */
WIDG.midpt = function(box){
  box.innerHTML = NSVG('0 0 440 260') + `<g id="mp-g"></g></svg>
    <div style="text-align:center;padding-bottom:12px"><span class="wlabel" id="mp-read"></span></div>`;
  const svg = box.querySelector('svg'), g = svg.querySelector('#mp-g'), read = box.querySelector('#mp-read');
  const A = { x: 100, y: 215 }, B = { x: 350, y: 215 }; let C = { x: 250, y: 60 };
  const dr = () => {
    const M1 = { x: (A.x + B.x) / 2, y: (A.y + B.y) / 2 }, M2 = { x: (A.x + C.x) / 2, y: (A.y + C.y) / 2 };
    const base = Math.hypot(B.x - A.x, B.y - A.y), seg = Math.hypot(M2.x - M1.x, M2.y - M1.y);
    const ratio = Math.round(seg / base * 20) / 20;
    g.innerHTML = `
      <path d="M ${A.x} ${A.y} L ${B.x} ${B.y} L ${C.x} ${C.y} Z" fill="var(--wc)" fill-opacity=".08" stroke="var(--wc)" stroke-width="2.5"/>
      <line x1="${M1.x}" y1="${M1.y}" x2="${M2.x}" y2="${M2.y}" stroke="var(--gold)" stroke-width="4" stroke-linecap="round"/>
      <circle cx="${M1.x}" cy="${M1.y}" r="5" fill="var(--teal)"/><circle cx="${M2.x}" cy="${M2.y}" r="5" fill="var(--teal)"/>
      <circle cx="${A.x}" cy="${A.y}" r="9" fill="var(--wc)" class="dragdot" data-v="A"/><circle cx="${B.x}" cy="${B.y}" r="9" fill="var(--wc)" class="dragdot" data-v="B"/><circle cx="${C.x}" cy="${C.y}" r="9" fill="var(--gold)" class="dragdot" data-v="C"/>
      <text x="${(M1.x + M2.x)/2}" y="${(M1.y + M2.y)/2 - 10}" text-anchor="middle" class="svgtext" font-size="12" fill="var(--gold)">half-bridge</text>
      <text x="220" y="246" text-anchor="middle" font-size="11.5" fill="#9AA8BE">segment/base length ratio = ${ratio} — drag any corner</text>`;
    read.innerHTML = `midpoints joined → <b style="color:var(--gold)">parallel to the base, exactly HALF of it</b>. Drag C anywhere — the law holds.`;
    svg.querySelectorAll('.dragdot').forEach(h => sdrag(h, svg, p => {
      const v = h.dataset.v;
      if (v === 'C') C = { x: clamp(p.x, 130, 400), y: clamp(p.y, 40, 190) };
      else if (v === 'A'){ A.x = clamp(p.x, 50, 260); A.y = clamp(p.y, 170, 240); }
      else { B.x = clamp(p.x, 180, 400); B.y = clamp(p.y, 170, 240); }
      dr();
    }));
  };
  dr();
  return { node: box, say(t){ read.innerHTML = t; } };
};

/* ---------- DATA DESK ---------- */
WIDG.data = function(box){
  box.innerHTML = NSVG('0 0 440 270') + `<g id="dt-g"></g></svg>
    <div class="wctl" id="dt-ctl"></div>
    <div style="text-align:center;padding-bottom:10px"><span class="wlabel" id="dt-read"></span></div>`;
  const svg = box.querySelector('svg'), g = svg.querySelector('#dt-g'), read = box.querySelector('#dt-read'), ctl = box.querySelector('#dt-ctl');
  const x0 = 50, y0 = 220, colW = 36, maxH = 150;
  let vals = [];
  function stat(){
    if (!vals.length) return { mean:0, med:0, mode:0, count:0 };
    const s = [...vals].sort((a, b) => a - b);
    const mean = vals.reduce((a, b) => a + b, 0) / vals.length;
    const med = s.length % 2 ? s[(s.length - 1) / 2] : (s[s.length / 2 - 1] + s[s.length / 2]) / 2;
    const freq = {}; vals.forEach(v => freq[v] = (freq[v] || 0) + 1);
    let mode = s[0], mf = 0; for (const k in freq) if (freq[k] > mf){ mf = freq[k]; mode = +k; }
    return { mean, med, mode, count: vals.length, mf: mf || 1 };
  }
  function drawMMM(){
    const st = stat();
    const freq = {}; vals.forEach(v => freq[v] = (freq[v] || 0) + 1);
    let s = `<line x1="${x0}" y1="${y0}" x2="${x0 + 10 * colW}" y2="${y0}" stroke="rgba(255,255,255,.55)" stroke-width="2"/>`;
    for (let i = 1; i <= 10; i++){
      const f = freq[i] || 0, h = f * 22, x = x0 + (i - 1) * colW;
      const isMode = st.count > 0 && i === st.mode && f === Math.max(...Object.values(freq));
      s += `<g class="dtcol" data-v="${i}" style="cursor:pointer"><rect x="${x + 3}" y="${y0 - h}" width="${colW - 6}" height="${h}" rx="4" fill="${isMode ? 'var(--gold)' : 'var(--wc)'}" opacity="${f ? (isMode ? 1 : .8) : .12}" style="transition:all .3s"/><text x="${x + colW/2}" y="${y0 + 16}" text-anchor="middle" font-size="11" fill="#9AA8BE" font-weight="700">${i}</text>${f ? `<text x="${x + colW/2}" y="${y0 - h - 6}" text-anchor="middle" font-size="11" fill="var(--ink)" font-weight="700">${f}</text>` : ''}</g>`;
    }
    if (st.count){
      const mx = x0 + (st.mean - .5) * colW;
      s += `<path d="M ${mx} ${y0 + 26} l -7 11 l 14 0 Z" fill="var(--gold)"/><text x="${mx}" y="${y0 + 52}" text-anchor="middle" font-size="10.5" fill="var(--gold)" font-weight="700">mean ${fr(Math.round(st.mean * 10) / 10)}</text>`;
      const dx = x0 + (st.med - .5) * colW;
      s += `<line x1="${dx}" y1="${y0 - maxH - 8}" x2="${dx}" y2="${y0}" stroke="var(--teal)" stroke-width="2" stroke-dasharray="4 4"/><text x="${dx + 5}" y="${y0 - maxH - 4}" font-size="10.5" fill="var(--teal)" font-weight="700">median ${fr(st.med)}</text>`;
    }
    g.innerHTML = s;
    svg.querySelectorAll('.dtcol').forEach(c2 => c2.addEventListener('click', () => { vals.push(+c2.dataset.v); Sfx.tap(); drawMMM(); upd(); }));
    function upd(){ read.innerHTML = st.count ? `n=${st.count} · mean <b style="color:var(--gold)">${fr(Math.round(st.mean*10)/10)}</b> · median <b style="color:var(--teal)">${fr(st.med)}</b> · mode <b style="color:var(--gold)">${st.mode}</b> — tap more columns!` : 'Tap a column to drop a data ball into it.'; }
    upd();
  }
  const api = {
    node: box, read, ctl,
    say(t){ read.innerHTML = t; },
    btn(t, fn){ const b = el('button', 'wbtn', t); b.onclick = () => { Sfx.tap(); fn(b); }; ctl.appendChild(b); return b; },
    ctlClear(){ ctl.innerHTML = ''; },
    mmm(){ vals = []; drawMMM(); },
    add(n){ for (let i = 0; i < n; i++) vals.push(ri(Math.random, 1, 10)); drawMMM(); },
    preset(arr){ vals = arr.slice(); drawMMM(); },
    get vals(){ return vals; },
    dice(n, speed){
      const counts = [0, 0, 0, 0, 0, 0];
      let rolls = 0;
      const dr = () => {
        let s = `<line x1="${x0}" y1="${y0}" x2="${x0 + 6 * colW + 20}" y2="${y0}" stroke="rgba(255,255,255,.55)" stroke-width="2"/>`;
        for (let i = 0; i < 6; i++){
          const h = maxH * counts[i] / Math.max(1, Math.max(...counts));
          s += `<rect x="${x0 + i * (colW + 4)}" y="${y0 - h}" width="${colW}" height="${h}" rx="5" fill="var(--wc)" opacity=".85" style="transition:height .18s, y .18s"/><text x="${x0 + i * (colW + 4) + colW/2}" y="${y0 + 16}" text-anchor="middle" font-size="12" fill="#9AA8BE" font-weight="700">${i + 1}</text><text x="${x0 + i * (colW + 4) + colW/2}" y="${y0 - h - 6}" text-anchor="middle" font-size="11" fill="var(--ink)">${counts[i]}</text>`;
        }
        s += `<text x="${x0 + 6 * colW + 26}" y="${y0 - maxH/2}" class="svgtext" font-size="13" fill="var(--gold)">rolls: ${rolls}</text>`;
        g.innerHTML = s;
      };
      dr();
      read.innerHTML = 'rolling…';
      return new Promise(res => {
        let i = 0;
        const iv = setInterval(() => {
          const r = ri(Math.random, 1, 6); counts[r - 1]++; rolls++; dr();
          if (++i >= n){
            clearInterval(iv);
            const sixes = counts[5];
            read.innerHTML = `<b style="color:var(--gold)">${n} rolls:</b> each face lands about <b>${Math.round(rolls / 6)}</b> times — nobody can promise WHICH roll, but everyone knows the long-run share: 1/6. That's probability.`;
            Sfx.unlock(); res(counts);
          }
        }, speed || 40);
      });
    }
  };
  return api;
};
