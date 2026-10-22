/* ============ WIDGETS A ============ */
const WIDG = {};
function tween(dur, fn){ return new Promise(res => { const t0 = performance.now(); function step(t){ const p = clamp((t - t0) / dur, 0, 1); fn(p < 1 ? (1 - Math.pow(1 - p, 3)) : 1); if (p < 1) requestAnimationFrame(step); else res(); } requestAnimationFrame(step); }); }
function NSVG(vb, w='100%'){ return `<svg viewBox="${vb}" width="${w}" style="max-width:520px">`; }
function svgPoint(svg, cx, cy){ const pt = svg.createSVGPoint(); pt.x = cx; pt.y = cy; return pt.matrixTransform(svg.getScreenCTM().inverse()); }
function sdrag(node, svg, onMove, onEnd){
  node.style.touchAction = 'none';
  const mv = e => { const p = svgPoint(svg, e.clientX, e.clientY); onMove(p, e); };
  const up = () => { window.removeEventListener('pointermove', mv); window.removeEventListener('pointerup', up); if (onEnd) onEnd(); };
  node.addEventListener('pointerdown', e => { e.preventDefault(); node.setPointerCapture && node.setPointerCapture(e.pointerId); window.addEventListener('pointermove', mv); window.addEventListener('pointerup', up); });
}

/* ---------- SORT BAY: generic two-bin classifier ---------- */
WIDG.sort = function(box, opts={}){
  const bins = opts.bins || [
    { k:'r', title:'ORDER BAY', sub:'perfect p/q citizens', color:'var(--good)', bg:'rgba(78,216,142,.06)' },
    { k:'i', title:'WILD BAY', sub:'endless-decimal rebels', color:'var(--coral)', bg:'rgba(255,122,110,.06)' } ];
  box.innerHTML = `
    <div class="sortpool" style="display:flex;flex-wrap:wrap;gap:9px;justify-content:center;padding:16px 10px 8px;min-height:96px"></div>
    <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;padding:6px 12px 18px">
      ${bins.map(b => `<div class="sortbin" data-k="${b.k}" style="flex:1;min-width:150px;max-width:230px;border-radius:16px;border:2px dashed color-mix(in srgb, ${b.color} 50%, transparent);background:${b.bg};padding:12px;text-align:center;transition:.2s">
        <div class="wnum" style="color:${b.color};font-size:13px">${b.title}</div>
        <div style="font-size:11px;color:var(--dim);margin:2px 0 8px">${b.sub}</div>
        <div class="binslots" style="display:flex;flex-wrap:wrap;gap:5px;justify-content:center;min-height:34px"></div>
      </div>`).join('')}
    </div>
    <div class="sortmsg" style="text-align:center;font-size:12.5px;color:var(--dim);min-height:20px;padding-bottom:10px"></div>`;
  const pool = box.querySelector('.sortpool'), msg = box.querySelector('.sortmsg');
  let sel = null, left = 0, doneFn = null;
  const items = opts.items.map(t => ({ t, k: t.k }));
  left = items.length;
  items.forEach(it => {
    const c = el('button', 'wbtn grabbable', mf(it.t.s)); c.style.fontSize = '14.5px';
    c.onclick = () => { Sfx.tap(); $$('.sortpool .wbtn').forEach(b => b.style.outline = ''); c.style.outline = '2.5px solid var(--gold)'; sel = { c, it }; msg.textContent = `Now tap a bay to file "${mf(it.t.s)}"`; };
    pool.appendChild(c);
  });
  box.querySelectorAll('.sortbin').forEach(bin => {
    bin.onclick = () => {
      if (!sel) { msg.textContent = 'Tap a number first, then its bay.'; return; }
      const ok = (bin.dataset.k === sel.it.k);
      if (ok){
        Sfx.ok(); msg.textContent = 'Filed correctly.';
        sel.c.style.outline = ''; bin.querySelector('.binslots').appendChild(sel.c); sel.c.classList.remove('grabbable'); sel.c.style.animation = 'popIn .35s cubic-bezier(.34,1.56,.64,1)';
        sel = null; left--;
        if (left === 0 && doneFn){ const f = doneFn; doneFn = null; setTimeout(f, 500); }
      } else {
        Sfx.bad(); bin.style.animation = 'shake .4s'; setTimeout(() => bin.style.animation = '', 420);
        msg.innerHTML = `<b style="color:var(--bad)">Not that bay.</b> Look again.`;
      }
    };
  });
  return { node: box, onDone: f => { doneFn = f; } };
};

/* ---------- NUMBER LINE: spiral of roots ---------- */
WIDG.numline = function(box){
  box.innerHTML = NSVG('0 0 420 250') + `
    <line x1="30" y1="200" x2="395" y2="200" stroke="rgba(255,255,255,.5)" stroke-width="2.5"/>
    ${[0,1,2,3,4].map(i => `<line x1="${30 + i*78}" y1="193" x2="${30 + i*78}" y2="207" stroke="rgba(255,255,255,.5)" stroke-width="2"/><text x="${30 + i*78}" y="224" text-anchor="middle" class="svgtext" font-size="13" fill="#9AA8BE">${i}</text>`).join('')}
    <text x="380" y="224" text-anchor="middle" class="svgtext" font-size="13" fill="#9AA8BE">√10…</text>
    <g id="nl-cons"></g><g id="nl-arc"></g><g id="nl-marks"></g>
    <g id="nl-guess"><line x1="0" y1="160" x2="0" y2="200" stroke="var(--gold)" stroke-width="2.5" stroke-dasharray="5 4"/><path d="M-6 160 L6 160 L0 149 Z" fill="var(--gold)" transform="translate(0,0)"/><circle cx="0" cy="208" r="9" fill="var(--gold)" class="dragdot"/><text x="0" y="140" text-anchor="middle" class="svgtext" font-size="12" fill="var(--gold)">your guess</text></g>
    </svg>
    <div style="text-align:center;padding-bottom:12px"><span class="wlabel" id="nl-read">number line ready</span></div>`;
  const svg = box.querySelector('svg'), cons = svg.querySelector('#nl-cons'), arc = svg.querySelector('#nl-arc'), marks = svg.querySelector('#nl-marks'), guess = svg.querySelector('#nl-guess'), read = box.querySelector('#nl-read');
  const X = v => 30 + v * 78, U = 78, OX0 = 30;
  let gx = X(1.4), guessOn = false;
  function drawGuess(){ guess.querySelector('line').setAttribute('x1', gx); guess.querySelector('line').setAttribute('x2', gx); guess.querySelectorAll('path,circle')[0].setAttribute('transform', `translate(${gx},0)`); guess.querySelector('circle').setAttribute('cx', gx); guess.querySelector('text').setAttribute('x', gx); }
  drawGuess();
  sdrag(guess.querySelector('circle'), svg, p => { if (!guessOn) return; gx = clamp(p.x, X(0.6), X(3.2)); drawGuess(); });
  const api = {
    node: box,
    showGuess(on){ guessOn = on; guess.style.opacity = on ? 1 : .25; if (on) read.textContent = 'Drag the gold pin: where will the arc land?'; },
    guessVal(){ return (gx - OX0) / U; },
    hideGuess(){ guessOn = false; guess.style.opacity = 0; },
    async swing(n){
      const base = n - 1, R = Math.sqrt(n) * U;
      const bx = X(base), topY = 200 - U;
      cons.innerHTML += `<line x1="${bx}" y1="200" x2="${bx}" y2="${topY}" stroke="var(--wc)" stroke-width="2.5" stroke-dasharray="4 3"/><text x="${bx + 8}" y="${(200 + topY) / 2}" class="svgtext" font-size="12" fill="var(--wc)">1</text><text x="${(OX0 + bx) / 2}" y="216" text-anchor="middle" class="svgtext" font-size="11" fill="#9AA8BE" opacity=".7">${base}</text>`;
      read.textContent = `Height 1 over a base of ${base}… swing the arc!`; Sfx.tap();
      const th0 = Math.atan2(-U, base * U);
      const g = elNS('g'); arc.appendChild(g);
      await tween(950, p => {
        const th = th0 * (1 - p);
        const hx = OX0 + R * Math.cos(th), hy = 200 + R * Math.sin(th);
        const ex = OX0 + R * Math.cos(th0), ey = 200 + R * Math.sin(th0);
        let d = `M ${OX0 + R} 200 A ${R} ${R} 0 0 0`;
        const steps = 24;
        for (let i = 1; i <= Math.floor(steps * p); i++){ const t2 = th0 * (1 - i / steps); d += ` ${ (OX0 + R * Math.cos(t2)).toFixed(1) } ${ (200 + R * Math.sin(t2)).toFixed(1) }`; }
        g.innerHTML = `<path d="${d}" fill="none" stroke="var(--gold)" stroke-width="1.6" opacity=".5" stroke-dasharray="3 4"/><line x1="${OX0}" y1="200" x2="${hx.toFixed(1)}" y2="${hy.toFixed(1)}" stroke="var(--gold)" stroke-width="3" stroke-linecap="round"/><circle cx="${hx.toFixed(1)}" cy="${hy.toFixed(1)}" r="5" fill="var(--gold)"/><line x1="${OX0}" y1="200" x2="${ex.toFixed(1)}" y2="${ey.toFixed(1)}" stroke="var(--gold)" stroke-width="1" opacity=".25"/>`;
      });
      const v = Math.sqrt(n);
      marks.innerHTML += `<circle cx="${X(v)}" cy="200" r="7" fill="var(--gold)"/><circle cx="${X(v)}" cy="200" r="12" fill="none" stroke="var(--gold)" stroke-width="2" opacity=".5"/><text x="${X(v)}" y="182" text-anchor="middle" class="svgtext" font-size="14" fill="var(--gold)">√${n}</text>`;
      g.remove(); Sfx.ok(); read.textContent = `√${n} ≈ ${v.toFixed(3)} — a wild one, it never repeats.`;
      await wait(400);
    },
    reset(){ cons.innerHTML = ''; arc.innerHTML = ''; marks.innerHTML = ''; read.textContent = 'number line ready'; }
  };
  return api;
};
function elNS(tag, attrs){ const n = document.createElementNS('http://www.w3.org/2000/svg', tag); for (const k in (attrs || {})) n.setAttribute(k, attrs[k]); return n; }

/* ---------- POWER ORBS ---------- */
WIDG.orbs = function(box){
  box.innerHTML = `<div class="orbrow" style="display:flex;gap:26px;justify-content:center;align-items:center;min-height:150px;padding:14px 8px 4px;flex-wrap:wrap"></div>
    <div style="text-align:center;padding-bottom:12px"><span class="wlabel" id="or-read"></span></div>`;
  const row = box.querySelector('.orbrow'), read = box.querySelector('#or-read');
  let clickCb = null;
  function orb(e, label, big){
    const d = el('button', 'orb grabbable');
    const s = big ? 86 : 66;
    d.style.cssText = `width:${s}px;height:${s}px;border-radius:50%;display:grid;place-items:center;position:relative;border:none;transition:transform .2s cubic-bezier(.34,1.56,.64,1);background:radial-gradient(circle at 32% 28%, #FFF3D6, var(--gold) 45%, #8A5A14 100%);box-shadow:0 10px 26px -6px rgba(242,180,65,.5), inset 0 -6px 14px rgba(0,0,0,.28);color:#3A2A08;font-family:var(--disp);font-weight:800;font-size:${big?17:14.5}px`;
    d.innerHTML = label; d.dataset.e = e;
    d.onmouseenter = () => d.style.transform = 'scale(1.08)';
    d.onmouseleave = () => d.style.transform = '';
    d.onclick = () => { if (clickCb) clickCb(d, e); else { Sfx.tap(); d.style.animation = 'pulseG .5s'; setTimeout(() => d.style.animation = '', 520); } };
    return d;
  }
  const api = {
    node: box,
    clear(){ row.innerHTML = ''; clickCb = null; },
    say(t){ read.innerHTML = t; },
    show(exps, labels){ this.clear(); exps.forEach((e,i) => row.appendChild(orb(e, labels ? labels[i] : `2<sup>${e}</sup>`, e >= 5))); },
    async fuse(a, b, res){
      const orbs = [...row.children]; const A = orbs[0], B = orbs[1];
      A.style.outline = '3px solid var(--gold)'; B.style.outline = '3px solid var(--gold)'; Sfx.tap();
      await wait(250);
      const r = row.getBoundingClientRect();
      A.style.position = 'absolute'; B.style.position = 'absolute';
      A.style.left = '20%'; B.style.left = '65%'; A.style.top = B.style.top = '40px';
      await tween(650, p => { A.style.transform = `translate(${p * r.width * 0.22}px,0) scale(${1 - p * .25})`; B.style.transform = `translate(${-p * r.width * 0.22}px,0) scale(${1 - p * .25})`; });
      A.remove(); B.remove();
      const C = orb(res.exp, res.label, true); C.style.animation = 'popIn .5s cubic-bezier(.34,1.56,.64,1)'; row.appendChild(C);
      Sfx.unlock(); read.innerHTML = res.say;
    },
    awaitClick(cb){ clickCb = cb; },
    pickTwo(){
      return new Promise(res => {
        const chosen = [];
        this.awaitClick((d, e) => {
          if (chosen.includes(d)) return;
          chosen.push(d); d.style.outline = '3px solid var(--gold)'; Sfx.tap();
          if (chosen.length === 2){ this.awaitClick(null); res({ els: chosen, exps: chosen.map(c => +c.dataset.e || 0) }); }
        });
      });
    }
  };
  return api;
};

/* ---------- ROOT SHIELD (rationalise) ---------- */
WIDG.shield = function(box){
  box.innerHTML = `<div style="display:grid;place-items:center;padding:10px 8px 2px">
    <div id="sh-frac" style="font-family:var(--disp);font-weight:800;font-size:40px;display:flex;align-items:center;gap:14px;min-height:76px"></div>
    <div class="demonline" id="sh-msg" style="font-size:13px;color:var(--dim);min-height:22px;margin-top:2px"></div></div>
    <div id="sh-shields" style="display:flex;gap:9px;justify-content:center;flex-wrap:wrap;padding:8px 10px 18px"></div>`;
  const frac = box.querySelector('#sh-frac'), msg = box.querySelector('#sh-msg'), shs = box.querySelector('#sh-shields');
  function renderFrac(num, den, struck){
    frac.innerHTML = `<span style="color:var(--gold2)">${mf(num)}</span><span style="font-size:44px;color:var(--dim)">⁄</span><span style="color:${struck ? 'var(--good)' : 'var(--coral)'}">${mf(den)}</span>`;
  }
  const api = {
    node: box,
    show(num, den){ renderFrac(num, den, false); frac.style.animation = 'popIn .4s'; msg.textContent = 'A root demon guards the denominator…'; shs.innerHTML = ''; },
    async offer(shieldList, correctIdx, tip){
      msg.textContent = tip || 'Pick the shield that slays the root below.';
      shs.innerHTML = '';
      return new Promise(res => {
        shieldList.forEach((s, i) => {
          const b = el('button', 'wbtn', mf(s)); b.style.fontSize = '16px';
          b.onclick = async () => {
            if (i === correctIdx){
              Sfx.slash(); b.classList.add('lit');
              frac.style.animation = 'shake .4s'; 
              await wait(380);
              renderFrac(num + ' × ' + s, den + ' × ' + s, false); Sfx.hit();
              await wait(650);
              msg.innerHTML = `<b style="color:var(--good)">Demon slain.</b> Denominator purified.`;
              res(true);
            } else {
              Sfx.bad(); b.style.animation = 'shake .4s'; setTimeout(() => b.style.animation = '', 420);
              msg.innerHTML = `<b style="color:var(--bad)">The shield bounced off.</b> ${tip || 'Multiply by something that makes the root disappear.'}`;
            }
          };
          shs.appendChild(b);
        });
      });
    },
    result(txt){ frac.style.animation = 'popIn .45s'; renderFrac(txt.num, txt.den, true); },
    say(t){ msg.innerHTML = t; }
  };
  return api;
};

/* ---------- ZERO LAB (zeroes of polynomial) ---------- */
WIDG.zerolab = function(box){
  box.innerHTML = NSVG('0 0 420 240') + `
    <line x1="24" y1="30" x2="24" y2="208" stroke="rgba(255,255,255,.35)" stroke-width="2"/>
    <line x1="24" y1="170" x2="400" y2="170" stroke="rgba(255,255,255,.55)" stroke-width="2.5"/>
    <text x="30" y="188" class="svgtext" font-size="11" fill="#9AA8BE">y = 0 waterline</text>
    <g id="zl-curve"></g>
    <line id="zl-drop" x1="0" y1="0" x2="0" y2="170" stroke="var(--gold)" stroke-width="2" stroke-dasharray="4 4" opacity="0"/>
    <circle id="zl-dot" cx="0" cy="0" r="9" fill="var(--gold)" class="dragdot" opacity="0"/>
    <text id="zl-p" x="0" y="0" class="svgtext" font-size="14" fill="var(--gold)" text-anchor="middle" opacity="0"></text>
    </svg>
    <div style="display:flex;gap:10px;justify-content:center;align-items:center;padding-bottom:14px;flex-wrap:wrap">
      <span class="wlabel" id="zl-read">drag the runner along the line</span>
    </div>`;
  const svg = box.querySelector('svg'), curve = svg.querySelector('#zl-curve'), dot = svg.querySelector('#zl-dot'), drop = svg.querySelector('#zl-drop'), pT = svg.querySelector('#zl-p'), read = box.querySelector('#zl-read');
  let f = x => x - 3, label = 'p(x) = x − 3', px = 0.6, zeroFound = false, onZero = null;
  const X = x => 60 + x * 46, Y = y => 170 - y * 26;
  function drawCurve(){
    let d = '';
    for (let x = -0.7; x <= 4.2; x += 0.05){ const y = f(x); d += (d ? ' L' : 'M') + X(x).toFixed(1) + ' ' + Y(y).toFixed(1); }
    curve.innerHTML = `<path d="${d}" fill="none" stroke="var(--wc)" stroke-width="3.5" stroke-linecap="round"/><text x="330" y="${Y(f(4.2)) - 10}" class="svgtext" font-size="13" fill="var(--wc)">${mf(label)}</text>`;
  }
  function place(){
    const y = f(px);
    dot.setAttribute('cx', X(px)); dot.setAttribute('cy', Y(y));
    drop.setAttribute('x1', X(px)); drop.setAttribute('x2', X(px)); drop.setAttribute('y1', Y(y)); drop.setAttribute('y2', 170);
    pT.setAttribute('x', X(px)); pT.setAttribute('y', Math.min(Y(y) - 14, 158));
    pT.textContent = 'p(' + px.toFixed(1) + ') = ' + y.toFixed(2);
    if (Math.abs(y) < 0.12 && !zeroFound){ zeroFound = true; Sfx.unlock(); toast('SPLASH! p(x) = 0 — that x is a ZERO', 'gold', 'target'); if (onZero){ const cb = onZero; onZero = null; setTimeout(cb, 350); } }
  }
  sdrag(dot, svg, p => { px = clamp((p.x - 60) / 46, -0.5, 4.1); place(); });
  drawCurve();
  const api = {
    node: box,
    setFn(nf, nl){ f = nf; label = nl; zeroFound = false; drawCurve(); dot.style.opacity = 1; drop.style.opacity = 1; pT.style.opacity = 1; place(); },
    say(t){ read.innerHTML = t; },
    onZero(cb){ onZero = cb; },
    get x(){ return px; }
  };
  return api;
};

/* ============ THE SQUARE CUTTER — (a+b)² flagship ============ */
WIDG.square = function(box){
  box.innerHTML = NSVG('0 0 460 320') + `
    <defs>
      <linearGradient id="sqA" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFD98F"/><stop offset="1" stop-color="#D89A2B"/></linearGradient>
      <linearGradient id="sqB" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#7FE8DC"/><stop offset="1" stop-color="#1E8C82"/></linearGradient>
      <linearGradient id="sqC" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFB3D9"/><stop offset="1" stop-color="#C24288"/></linearGradient>
      <linearGradient id="sqD" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#CFC5FF"/><stop offset="1" stop-color="#6450C4"/></linearGradient>
    </defs>
    <g id="sq-pieces"></g><g id="sq-grid"></g><g id="sq-labels"></g><g id="sq-braces"></g>
    <g id="sq-knob"><line x1="0" y1="0" x2="0" y2="0" stroke="#fff" stroke-width="2" stroke-dasharray="6 5" opacity=".0"/><circle cx="0" cy="0" r="11" fill="var(--gold)" class="dragdot" opacity="0"/><circle cx="0" cy="0" r="16" fill="none" stroke="var(--gold)" stroke-width="1.5" opacity="0" class="knobring"/></g>
    </svg>
    <div class="wctl" id="sq-ctl"></div>
    <div style="text-align:center;padding-bottom:12px"><span class="wlabel" id="sq-read"></span></div>`;
  const svg = box.querySelector('svg'), G = {
    pieces: svg.querySelector('#sq-pieces'), grid: svg.querySelector('#sq-grid'), labels: svg.querySelector('#sq-labels'),
    braces: svg.querySelector('#sq-braces'), knob: svg.querySelector('#sq-knob'), ctl: box.querySelector('#sq-ctl'), read: box.querySelector('#sq-read')
  };
  const OX = 62, OY = 34, S = 212;
  let a = 3, b = 3, mode = 'plus', labeled = false, knobOn = false, animating = false;
  const U = () => S / (a + b);
  function pieceDefs(){
    if (mode === 'plus') return [
      { id:'A', w:a, h:a, col:'url(#sqA)', name:'a²' },
      { id:'B', w:b, h:a, col:'url(#sqB)', name:'ab' },
      { id:'C', w:a, h:b, col:'url(#sqC)', name:'ab' },
      { id:'D', w:b, h:b, col:'url(#sqD)', name:'b²' } ];
    const m = a - b;
    return [
      { id:'A', w:m, h:a, col:'url(#sqA)', name:'(a−b)×a', x:0, y:0 },
      { id:'B', w:b, h:m, col:'url(#sqB)', name:'b×(a−b)', x:m, y:b, ghost:true },
      { id:'C', w:b, h:b, col:'url(#sqC)', name:'b²', x:m, y:0, gone:true } ];
  }
  function draw(anim){
    const u = U(); const defs = pieceDefs();
    G.pieces.innerHTML = ''; G.grid.innerHTML = ''; G.braces.innerHTML = '';
    if (mode === 'plus'){
      const pos = { A:[0,0], B:[a,0], C:[0,a], D:[a,a] };
      defs.forEach(d => {
        const [px, py] = pos[d.id];
        const g = elNS('g', { transform:`translate(${OX + px*u} ${OY + py*u})`, style:`transition:transform ${anim ? '.55s cubic-bezier(.22,1,.36,1)' : '0s'}` });
        g.dataset.id = d.id;
        const r = elNS('rect', { width:d.w*u, height:d.h*u, fill:d.col, stroke:'rgba(10,14,24,.5)', 'stroke-width':2, rx:3 });
        r.style.transition = anim ? 'width .55s cubic-bezier(.22,1,.36,1), height .55s cubic-bezier(.22,1,.36,1)' : '0s';
        g.appendChild(r);
        const t = elNS('text', { x:d.w*u/2, y:d.h*u/2 + 6, 'text-anchor':'middle', class:'svgtext', 'font-size':Math.min(20, d.w*u/2.6), fill:'#0B141B', opacity: labeled ? 1 : 0 });
        t.innerHTML = d.name; g.appendChild(t);
        G.pieces.appendChild(g);
      });
      /* braces */
      const bu = U();
      G.braces.innerHTML = `
        <line x1="${OX}" y1="${OY + S + 14}" x2="${OX + a*bu}" y2="${OY + S + 14}" stroke="var(--gold)" stroke-width="3"/><line x1="${OX + a*bu}" y1="${OY + S + 14}" x2="${OX + S}" y2="${OY + S + 14}" stroke="#9B8CFF" stroke-width="3"/>
        <text x="${OX + a*bu/2}" y="${OY + S + 34}" text-anchor="middle" class="svgtext" font-size="15" fill="var(--gold)">a</text>
        <text x="${OX + a*bu + b*bu/2}" y="${OY + S + 34}" text-anchor="middle" class="svgtext" font-size="15" fill="#9B8CFF">b</text>
        <line x1="${OX - 14}" y1="${OY}" x2="${OX - 14}" y2="${OY + a*bu}" stroke="var(--gold)" stroke-width="3"/><line x1="${OX - 14}" y1="${OY + a*bu}" x2="${OX - 14}" y2="${OY + S}" stroke="#9B8CFF" stroke-width="3"/>
        <text x="${OX - 22}" y="${OY + a*bu/2 + 5}" text-anchor="end" class="svgtext" font-size="15" fill="var(--gold)">a</text>
        <text x="${OX - 22}" y="${OY + a*bu + b*bu/2 + 5}" text-anchor="end" class="svgtext" font-size="15" fill="#9B8CFF">b</text>
        <text x="${OX + S/2}" y="${OY - 12}" text-anchor="middle" class="svgtext" font-size="14" fill="#9AA8BE">side = a + b</text>`;
      /* unit grid */
      if (G.grid.dataset.on){
        let gl = '';
        for (let i = 0; i <= a + b; i++){ gl += `<line x1="${OX + i*u}" y1="${OY}" x2="${OX + i*u}" y2="${OY + S}" stroke="#fff" stroke-width="1" opacity=".14"/><line x1="${OX}" y1="${OY + i*u}" x2="${OX + S}" y2="${OY + i*u}" stroke="#fff" stroke-width="1" opacity=".14"/>`; }
        G.grid.innerHTML = gl;
      }
      /* knob */
      const kx = OX + a * u;
      G.knob.querySelector('line').setAttribute('x1', kx); G.knob.querySelector('line').setAttribute('y1', OY); G.knob.querySelector('line').setAttribute('x2', kx); G.knob.querySelector('line').setAttribute('y2', OY + S);
      G.knob.querySelectorAll('circle').forEach(c => { c.setAttribute('cx', kx); c.setAttribute('cy', OY + S + 26); });
    } else {
      /* minus mode pieces with slide animation */
      const u2 = U(); const m = a - b;
      const mk = (d, tx, ty, rot, dur) => {
        const g = elNS('g', { transform:`translate(${tx} ${ty}) rotate(${rot})`, style:`transition:transform ${dur}s cubic-bezier(.34,1.2,.4,1)` });
        g.dataset.id = d.id;
        const r = elNS('rect', { width:d.w*u2, height:d.h*u2, fill:d.col, stroke:'rgba(10,14,24,.5)', 'stroke-width':2, rx:3 });
        g.appendChild(r);
        const t = elNS('text', { x:d.w*u2/2, y:d.h*u2/2 + 5, 'text-anchor':'middle', class:'svgtext', 'font-size':13, fill:'#0B141B' });
        t.innerHTML = d.name; g.appendChild(t);
        return g;
      };
      const A = mk(defs[0], OX, OY, 0, anim ? 0.9 : 0);
      const B = mk(defs[1], OX + m*u2, anim ? OY + a*u2 : OY + b*u2, anim ? 90 : 0, anim ? 0.9 : 0);
      const C = mk(defs[2], OX + m*u2, OY, 0, 0);
      if (anim){ C.style.opacity = 0; C.style.transition = 'opacity .6s'; }
      G.pieces.append(A, B, C);
      G.braces.innerHTML = `
        <line x1="${OX}" y1="${OY + S + 14}" x2="${OX + m*u2}" y2="${OY + S + 14}" stroke="var(--gold)" stroke-width="3"/><line x1="${OX + m*u2}" y1="${OY + S + 14}" x2="${OX + S}" y2="${OY + S + 14}" stroke="#9B8CFF" stroke-width="3"/>
        <text x="${OX + m*u2/2}" y="${OY + S + 34}" text-anchor="middle" class="svgtext" font-size="15" fill="var(--gold)">a−b</text>
        <text x="${OX + m*u2 + b*u2/2}" y="${OY + S + 34}" text-anchor="middle" class="svgtext" font-size="15" fill="#9B8CFF">b</text>`;
      if (anim){
        G.labels.innerHTML = `<text x="${OX + S + 26}" y="${OY + S/2}" class="svgtext" font-size="14" fill="var(--good)" transform="rotate(90 ${OX + S + 26} ${OY + S/2})" text-anchor="middle">a + b tall</text>`;
      }
    }
  }
  draw(false);
  sdrag(G.knob.querySelector('circle'), svg, p => {
    if (!knobOn || animating) return;
    const T = a + b;
    const na = clamp(Math.round((p.x - OX) / U()), 1, T - 1);
    if (na !== a){ a = na; b = T - a; draw(true); if (labeled) showEq(); }
  });
  function showEq(){
    if (mode !== 'plus') return;
    G.read.innerHTML = `<span style="color:var(--gold)">a²</span> + <span style="color:var(--teal)">ab</span> + <span style="color:var(--rose)">ab</span> + <span style="color:#9B8CFF">b²</span> &nbsp;=&nbsp; (a+b)² &nbsp;&nbsp;<span style="opacity:.7">with a=${a}, b=${b}: ${a*a} + ${a*b} + ${a*b} + ${b*b} = ${(a+b)*(a+b)}</span>`;
  }
  function btn(txt, fn, lit){ const x = el('button', 'wbtn' + (lit ? ' lit' : ''), txt); x.onclick = () => { Sfx.tap(); fn(x); }; G.ctl.appendChild(x); return x; }
  const api = {
    node: box,
    say(t){ G.read.innerHTML = t; },
    enableKnob(on){ knobOn = on; G.knob.querySelector('circle').style.opacity = on ? 1 : 0; G.knob.querySelectorAll('circle')[1].style.opacity = on ? .8 : 0; G.knob.querySelector('circle').classList.toggle('grabbable', on); if (on) G.read.innerHTML = 'Drag the gold knob — slice the side anywhere. Watch all four areas change.'; },
    setAB(na, nb){ a = na; b = nb; draw(true); if (labeled) showEq(); },
    label(){ labeled = true; draw(false); showEq(); },
    gridOn(){ G.grid.dataset.on = '1'; draw(false); },
    gridOff(){ delete G.grid.dataset.on; draw(false); },
    ctlClear(){ G.ctl.innerHTML = ''; },
    btn,
    get a(){ return a; }, get b(){ return b; },
    piecesEls(){ return [...G.pieces.children]; },
    async countTask(){
      const els = this.piecesEls(); const vals = { A: a*a, B: a*b, C: a*b, D: b*b };
      const names = { A:'a²', B:'ab', C:'ab', D:'b²' };
      let count = 0; const got = [];
      G.read.innerHTML = 'Tap each coloured piece to count its unit squares.';
      return new Promise(res => {
        els.forEach(g => {
          g.style.cursor = 'pointer';
          g.addEventListener('click', function h(){
            if (g.dataset.counted) return; g.dataset.counted = '1';
            count++; got.push(vals[g.dataset.id]); Sfx.coin();
            g.style.filter = 'brightness(1.25)';
            toast(`${names[g.dataset.id]} = ${vals[g.dataset.id]} squares`, 'gold', 'spark', 1300);
            G.read.innerHTML = `Counted ${count}/4 — running total: <b style="color:var(--gold)">${got.reduce((s,v)=>s+v,0)}</b>`;
            if (count === 4){
              Sfx.unlock();
              G.read.innerHTML = `<b style="color:var(--gold)">${a*a} + ${a*b} + ${a*b} + ${b*b} = ${(a+b)*(a+b)}</b> — the four pieces ARE the whole square.`;
              setTimeout(res, 900);
            }
          });
        });
      });
    },
    async minusDemo(){
      mode = 'minus'; labeled = false; knobOn = false;
      G.knob.querySelector('circle').style.opacity = 0; G.knob.querySelectorAll('circle')[1].style.opacity = 0;
      a = 5; b = 2; draw(false);
      await wait(800);
      G.read.innerHTML = 'Start: big square a×a. The b² corner is stolen…';
      const Cs = [...G.pieces.children].find(g => g.dataset.id === 'C');
      if (Cs){ Cs.style.transition = 'opacity .6s'; Cs.style.opacity = 0; }
      Sfx.tap();
      await wait(1400);
      const u2 = U(), m = a - b;
      const B = [...G.pieces.children].find(g => g.dataset.id === 'B');
      if (B){
        B.style.transition = 'transform .9s cubic-bezier(.34,1.2,.4,1)';
        B.style.transform = `translate(${OX + m * u2}px, ${OY + a * u2}px) rotate(90deg)`;
      }
      G.labels.innerHTML = `<text x="${OX + S + 30}" y="${OY + (a + b) * u2 / 2}" class="svgtext" font-size="14" fill="var(--good)" transform="rotate(90 ${OX + S + 30} ${OY + (a + b) * u2 / 2})" text-anchor="middle">a + b tall</text>`;
      Sfx.slash();
      await wait(1100);
      G.read.innerHTML = 'Slide the leftover strip down… it becomes a clean (a−b) × (a+b) rectangle!';
      await wait(1500);
    },
    async setAB2(na, nb){ a = na; b = nb; draw(true); await wait(650); },
    minusMode(){ mode = 'minus'; draw(false); },
    plusMode(){ mode = 'plus'; draw(false); if (labeled) showEq(); },
    get mode(){ return mode; }
  };
  return api;
};
