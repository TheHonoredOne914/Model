'use strict';
/* ============ MATHS WARS v4 — core engine ============ */
const MW = { V: 4 };
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
function el(tag, cls, html){ const n = document.createElement(tag); if (cls) n.className = cls; if (html != null) n.innerHTML = html; return n; }
const clamp = (v,a,b) => Math.max(a, Math.min(b, v));
const lerp = (a,b,t) => a + (b-a)*t;
function esc(s){ return String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])); }
/* seeded rng */
function mulberry32(seed){ let a = seed >>> 0; return function(){ a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
const pick = (r, arr) => arr[Math.floor(r() * arr.length)];
const ri = (r, a, b) => a + Math.floor(r() * (b - a + 1));
function shuffle(r, arr){ const a = arr.slice(); for (let i = a.length - 1; i > 0; i--){ const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
function wait(ms){ return new Promise(res => setTimeout(res, ms)); }
/* math text formatter: ^{..} -> sup, _{..} -> sub */
function mf(s){
  return esc(s).replace(/\^\{([^}]+)\}/g, '<sup>$1</sup>').replace(/_\{([^}]+)\}/g, '<sub>$1</sub>');
}
function fr(v){ return Number.isInteger(v) ? String(v) : (Math.abs(v - Math.round(v)) < 1e-9 ? String(Math.round(v)) : String(Math.round(v * 100) / 100)); }
function gcd(a,b){ a = Math.abs(a); b = Math.abs(b); while (b){ [a,b] = [b, a % b]; } return a || 1; }

/* ============ SAVE ============ */
const SAVE_KEY = 'mathswar_save_v4';
function freshSave(){
  return { xp:0, coins:20, streak:1, lastDay:'', worlds:{}, codex:[], seen:{}, stats:{answered:0, correct:0, bosses:0, sparks:0, drills:0}, settings:{sound:true} };
}
function wstate(save, wid){
  if (!save.worlds[wid]) save.worlds[wid] = { sparks:{}, drills:{}, boss:0 };
  return save.worlds[wid];
}
const Store = {
  data: null,
  load(){
    try { const raw = localStorage.getItem(SAVE_KEY); this.data = raw ? Object.assign(freshSave(), JSON.parse(raw)) : freshSave(); }
    catch(e){ this.data = freshSave(); }
    if (!this.data.worlds) this.data.worlds = {};
    /* codex backfill: any mastered spark must be in the codex */
    try {
      Object.keys(this.data.worlds || {}).forEach(wid => {
        const w = WORLD_BY_ID[wid];
        if (!w) return;
        const st = this.data.worlds[wid];
        w.sparks.forEach(sp => { if (st.sparks[sp.id] && !this.data.codex.includes(sp.id)) this.data.codex.push(sp.id); });
      });
    } catch(e){}
  },
  save(){ try { localStorage.setItem(SAVE_KEY, JSON.stringify(this.data)); } catch(e){} },
  reset(){ this.data = freshSave(); this.save(); }
};

/* ============ AUDIO (WebAudio synth — no assets) ============ */
const Sfx = {
  ctx:null, on:true,
  boot(){ if (!this.ctx){ try { this.ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch(e){} } if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume(); },
  tone(f, dur, type='sine', vol=0.12, slide=0){
    if (!this.on || !this.ctx) return;
    const t = this.ctx.currentTime, o = this.ctx.createOscillator(), g = this.ctx.createGain();
    o.type = type; o.frequency.setValueAtTime(f, t);
    if (slide) o.frequency.exponentialRampToValueAtTime(Math.max(30, f + slide), t + dur);
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + 0.015); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(this.ctx.destination); o.start(t); o.stop(t + dur + 0.05);
  },
  click(){ this.tone(660, .06, 'triangle', .07); },
  tap(){ this.tone(440, .05, 'sine', .06); },
  ok(){ this.tone(523, .12, 'sine', .1); setTimeout(()=>this.tone(659, .12, 'sine', .1), 90); setTimeout(()=>this.tone(784, .2, 'sine', .12), 180); },
  bad(){ this.tone(220, .22, 'sawtooth', .08, -80); setTimeout(()=>this.tone(160, .25, 'sawtooth', .07, -60), 90); },
  hit(){ this.tone(180, .16, 'square', .12, -100); this.tone(90, .22, 'sawtooth', .1, -40); },
  slash(){ this.tone(900, .12, 'sawtooth', .07, -700); },
  coin(){ this.tone(988, .09, 'square', .06); setTimeout(()=>this.tone(1319, .16, 'square', .06), 80); },
  unlock(){ [523,659,784,1047].forEach((f,i)=>setTimeout(()=>this.tone(f, .22, 'sine', .11), i*110)); setTimeout(()=>this.tone(1319, .4, 'triangle', .1), 480); },
  fanfare(){ [392,523,659,784,1047].forEach((f,i)=>setTimeout(()=>{ this.tone(f, .3, 'triangle', .12); this.tone(f*1.005, .3, 'sine', .08); }, i*140)); },
  boss(){ this.tone(98, .5, 'sawtooth', .1, -30); setTimeout(()=>this.tone(87, .6, 'sawtooth', .09, -25), 240); }
};

/* ============ ICONS ============ */
const IC = (function(){
  const w = (d, extra='') => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ${extra}>${d}</svg>`;
  const F = d => `<svg viewBox="0 0 24 24" fill="currentColor" stroke="none">${d}</svg>`;
  return {
    back: w('<path d="M19 12H5M12 19l-7-7 7-7"/>'),
    next: w('<path d="M5 12h14M12 5l7 7-7 7"/>'),
    sword: w('<path d="M14.5 17.5 3 6V3h3l11.5 11.5M13 19l6-6M16 16l4 4M19 21l2-2"/>'),
    shield: w('<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>'),
    flame: F('<path d="M12 22c4.4 0 7-2.8 7-6.5 0-2.5-1.2-4.3-2.6-6-.9-1-1.4-2.3-1.4-3.5 0-1.6-1.3-3-3-3-3.9 0-7 4.4-7 9 0 4.9 3.1 10 7 10z"/>'),
    coin: F('<circle cx="12" cy="12" r="9" fill="#F2B441"/><circle cx="12" cy="12" r="6.5" fill="none" stroke="#B97F1E" stroke-width="1.6"/><path d="M12 8.4v7.2M9.6 10.2c0-1 .9-1.7 2.4-1.7s2.4.6 2.4 1.5c0 2.4-4.8 1.4-4.8 3.8 0 .9.9 1.6 2.4 1.6s2.4-.7 2.4-1.6" stroke="#B97F1E" stroke-width="1.4" fill="none" stroke-linecap="round"/>'),
    star: F('<path d="M12 2l2.9 6.6 7.1.7-5.4 4.8 1.6 7-6.2-3.8L5.8 21l1.6-7L2 9.3l7.1-.7L12 2z"/>'),
    book: w('<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V4a2 2 0 0 0-2-2H6.5A2.5 2.5 0 0 0 4 4.5v15zM4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5"/>'),
    lock: w('<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>'),
    check: w('<path d="M20 6 9 17l-5-5"/>'),
    x: w('<path d="M18 6 6 18M6 6l12 12"/>'),
    bolt: F('<path d="M13 2 4.5 13.5H11L9.5 22 19 10h-6.5L13 2z"/>'),
    heart: F('<path d="M12 21s-7.5-4.6-9.7-9.3C.8 8.3 3 5 6.3 5c2 0 3.6 1.1 4.5 2.7h2.4C14.1 6.1 15.7 5 17.7 5 21 5 23.2 8.3 21.7 11.7 19.5 16.4 12 21 12 21z"/>'),
    gear: w('<circle cx="12" cy="12" r="3.2"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1 1.55V21a2 2 0 1 1-4 0v-.09A1.7 1.7 0 0 0 9 19.36a1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.64 15a1.7 1.7 0 0 0-1.55-1H3a2 2 0 1 1 0-4h.09A1.7 1.7 0 0 0 4.64 9a1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.7 1.7 0 0 0 9 4.64 1.7 1.7 0 0 0 10 3.09V3a2 2 0 1 1 4 0v.09a1.7 1.7 0 0 0 1 1.55 1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.7 1.7 0 0 0 19.36 9c.24.57.8.96 1.42 1H21a2 2 0 1 1 0 4h-.09a1.7 1.7 0 0 0-1.51 1z"/>'),
    sound: w('<path d="M11 5 6 9H2v6h4l5 4V5z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a9 9 0 0 1 0 14"/>'),
    mute: w('<path d="M11 5 6 9H2v6h4l5 4V5z"/><path d="M22 9l-6 6M16 9l6 6"/>'),
    skull: F('<path d="M12 2C7 2 3 6 3 11c0 2.6 1.2 4.6 3 6v3a2 2 0 0 0 2 2h1v-2h2v2h2v-2h2v2h1a2 2 0 0 0 2-2v-3c1.8-1.4 3-3.4 3-6 0-5-4-9-9-9zM8.5 13A1.8 1.8 0 1 1 8.5 9.4 1.8 1.8 0 0 1 8.5 13zm7 0a1.8 1.8 0 1 1 0-3.6 1.8 1.8 0 0 1 0 3.6z"/>'),
    spark: F('<path d="M12 1l2.2 6.8L21 10l-6.8 2.2L12 19l-2.2-6.8L3 10l6.8-2.2L12 1zM19 17l1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3z"/>'),
    target: w('<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1" fill="currentColor"/>'),
    dice: w('<rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="8.5" cy="8.5" r="1.3" fill="currentColor" stroke="none"/><circle cx="15.5" cy="8.5" r="1.3" fill="currentColor" stroke="none"/><circle cx="8.5" cy="15.5" r="1.3" fill="currentColor" stroke="none"/><circle cx="15.5" cy="15.5" r="1.3" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.3" fill="currentColor" stroke="none"/>'),
    ruler: w('<path d="M3 17 17 3l4 4L7 21l-4-4zM8 16l1.5 1.5M11 13l1.5 1.5M14 10l1.5 1.5M17 7l1.5 1.5"/>'),
    cube: w('<path d="M21 8 12 3 3 8v8l9 5 9-5V8z"/><path d="M3 8l9 5 9-5M12 13v8"/>'),
    chart: w('<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>'),
    angle: w('<path d="M4 20 14 4M4 20h16"/><path d="M9.5 20a6 6 0 0 0-2.2-4.6"/>'),
    circleS: w('<circle cx="12" cy="12" r="8.5"/><path d="M12 3.5v17M3.5 12h17"/>'),
    tri: w('<path d="M12 3 22 20H2L12 3z"/>'),
    grid: w('<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/>'),
    idea: F('<path d="M12 2a7 7 0 0 0-4 12.7c.7.5 1 1.4 1 2.3v1a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-1c0-.9.3-1.8 1-2.3A7 7 0 0 0 12 2zM9.5 22h5"/>'),
    play: F('<path d="M7 4.5v15c0 .8.9 1.3 1.6.9l12-7.5c.6-.4.6-1.4 0-1.8l-12-7.5C7.9 3.2 7 3.7 7 4.5z"/>'),
    flag: w('<path d="M4 22V4s1-1.5 4-1.5S12 4 15 4s4-1.5 4-1.5V14s-1 1.5-4 1.5-4-1.5-7-1.5-4 1.5-4 1.5"/>'),
    trophy: w('<path d="M8 21h8M12 17v4M7 4h10v6a5 5 0 0 1-10 0V4zM7 6H4a2 2 0 0 0 2 4h1M17 6h3a2 2 0 0 1-2 4h-1"/>'),
    drag: w('<path d="M12 2v6M12 22v-6M2 12h6M22 12h-6M9 5l3-3 3 3M9 19l3 3 3-3M5 9 2 12l3 3M19 9l3 3-3 3"/>'),
    eye: w('<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/>'),
    pen: w('<path d="M17 3a2.8 2.8 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>'),
    refresh: w('<path d="M21 12a9 9 0 1 1-2.64-6.36M21 3v6h-6"/>'),
    swordpair: w('<path d="M3 3h3l11.5 11.5M14.5 17.5 3 6V3M13 19l6-6M16 16l4 4M19 21l2-2M21 3h-3L6.5 14.5"/>')
  };
})();

/* ============ TOASTS & FX ============ */
function toast(msg, kind='good', icon='check', ms=2400){
  const t = el('div', `toast ${kind}`, `${IC[icon] || IC.check}<span>${msg}</span>`);
  $('#toasts').appendChild(t);
  setTimeout(() => { t.classList.add('out'); setTimeout(() => t.remove(), 320); }, ms);
}
function confetti(n=90, colors=['#F2B441','#3FCFC0','#FF7A6E','#9B8CFF','#4ED88E','#5FD9E8']){
  const host = el('div', 'confetti'); document.body.appendChild(host);
  for (let i = 0; i < n; i++){
    const c = el('i', 'cf');
    c.style.cssText = `left:${Math.random()*100}%;top:${-4 - Math.random()*10}%;background:${colors[i % colors.length]};animation-duration:${1.4 + Math.random()*1.6}s;animation-delay:${Math.random()*0.5}s;transform:rotate(${Math.random()*360}deg)`;
    host.appendChild(c);
  }
  setTimeout(() => host.remove(), 3600);
}
function dmgNum(container, text, x, y, crit=false){
  const d = el('div', 'dmg' + (crit ? ' crit' : '')); d.textContent = text;
  d.style.left = x; d.style.top = y;
  container.appendChild(d); setTimeout(() => d.remove(), 1050);
}
function xpFly(x, y, text){
  const d = el('div', 'xpfly'); d.textContent = text;
  d.style.left = x + 'px'; d.style.top = y + 'px';
  document.body.appendChild(d); setTimeout(() => d.remove(), 950);
}

/* ============ ROUTER ============ */
const Router = {
  cur: null, cleanups: [],
  go(name, params={}){
    this.cleanups.forEach(f => { try { f(); } catch(e){} }); this.cleanups = [];
    const stage = $('#stage');
    const old = stage.querySelector('.screen.on');
    if (old){ old.classList.remove('on'); setTimeout(() => old.remove(), 420); }
    const sc = el('div', 'screen');
    stage.appendChild(sc);
    MW.SCREENS[name](sc, params);
    requestAnimationFrame(() => requestAnimationFrame(() => sc.classList.add('on')));
    this.cur = name;
  }
};
function addCleanup(f){ Router.cleanups.push(f); }
