/* ============ PLAY: question engine, spark player, drill, boss ============ */
function askQuestion(container, q, opts = {}){
  return new Promise(resolve => {
    const world = opts.world;
    const card = el('div', 'qcard');
    setWC(card, world.color);
    card.innerHTML = `
      <div class="strip"></div>
      <div class="qhead"><div class="qc">${IC.pen}<span>${opts.label || 'TRAINING'}</span></div>
        <div class="qmeta"><span>${opts.timer ? IC.flame : ''}</span></div></div>
      <div class="qtext">${mf(q.q)}</div>
      <div class="qopts ${q.o.length <= 2 ? 'one' : ''}"></div>
      <div class="deckbox"></div>
      ${opts.timer ? `<div class="timerow"><i></i></div>` : ''}
      <div class="qfoot"><div class="left">
        <button class="hbtn hintbtn">${IC.idea} Hint · 5 coins</button>
      </div><div class="right" style="font-family:var(--disp);font-weight:700;font-size:11px;color:#8B8676">paper-first: solve on paper!</div></div>`;
    container.innerHTML = ''; container.appendChild(card);
    window.__mwq = q; /* QA hook */
    const optsBox = card.querySelector('.qopts');
    let settled = false;
    const keys = ['A', 'B', 'C', 'D'];
    q.o.forEach((o, i) => {
      const b = el('button', 'opt', `<span class="key">${keys[i]}</span>${mf(o)}`);
      b.style.animationDelay = (i * 0.07) + 's';
      b.onclick = () => answer(i, b);
      optsBox.appendChild(b);
    });
    let timerRAF = null;
    if (opts.timer){
      const bar = card.querySelector('.timerow i'); const t0 = performance.now(); const total = opts.timer * 1000;
      const tick = t => {
        const left = 1 - (t - t0) / total;
        if (left <= 0){ if (!settled){ timeoutEnd(); } return; }
        bar.style.transform = `scaleX(${left})`;
        timerRAF = requestAnimationFrame(tick);
      };
      timerRAF = requestAnimationFrame(tick);
    }
    function stopTimer(){ if (timerRAF) cancelAnimationFrame(timerRAF); }
    function showDeck(steps, extra, hand){
      const d = el('div', 'deck');
      d.innerHTML = `<h4>${IC.book} ${extra || 'How the pros do it'}</h4>
        ${steps && steps.length ? `<ol>${steps.map(s2 => `<li>${mf(s2)}</li>`).join('')}</ol>` : ''}
        ${hand ? `<div class="why">${hand}</div>` : ''}`;
      card.querySelector('.deckbox').appendChild(d);
      d.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    function finish(result){
      settled = true; stopTimer();
      card.querySelectorAll('.opt').forEach(b => b.style.pointerEvents = 'none');
      card.querySelector('.hintbtn').style.pointerEvents = 'none';
      setTimeout(() => resolve(result), result.ok ? 850 : 300);
    }
    function wrongEnd(idx){
      Sfx.bad();
      const btns = [...optsBox.children];
      btns[q.a].classList.add('right');
      if (idx >= 0) btns[idx].classList.add('wrong');
      showDeck(q.s, 'Solution deck', 'Got it wrong? Good — mistakes are the fastest teachers. Read the deck, own the idea.');
      const cont = el('button', 'btn btn-c btn-sm', `${IC.check} Got it — next`);
      cont.style.margin = '10px 18px 16px';
      cont.onclick = () => finish({ ok:false, usedHint:false });
      card.querySelector('.deckbox').appendChild(cont);
    }
    function timeoutEnd(){ if (settled) return; wrongEnd(-1); }
    function answer(idx, btn){
      if (settled) return;
      if (idx === q.a){
        Sfx.ok();
        btn.classList.add('right');
        Store.data.stats.correct++;
        const r = card.getBoundingClientRect();
        xpFly(r.right - 70, r.top + 30, '+10');
        showDeck(q.s, 'Solution deck', 'Clean. That\'s how it\'s done.');
        finish({ ok:true, usedHint:false });
      } else wrongEnd(idx);
    }
    card.querySelector('.hintbtn').onclick = e => {
      if (Store.data.coins < 5){ Sfx.bad(); toast('Not enough coins — solve more to earn!', 'bad', 'coin'); return; }
      Store.data.coins -= 5; Store.save();
      e.currentTarget.disabled = true; e.currentTarget.innerHTML = IC.idea + ' Hint used';
      Sfx.coin();
      const d = el('div', 'deck');
      d.innerHTML = `<h4>${IC.idea} Hint</h4><div style="font-size:14px;line-height:1.6">${mf(q.h)}</div>`;
      card.querySelector('.deckbox').appendChild(d);
    };
    if (opts.onMount) opts.onMount(card);
  });
}

/* ---------- SPARK PLAYER ---------- */
MW.SCREENS.spark = function(sc, p){
  const w = WORLD_BY_ID[p.wid], sp = SPARK_BY_ID[p.sid];
  setWC(sc, w.color);
  let cancelled = false;
  addCleanup(() => { cancelled = true; });
  sc.innerHTML = topbarHTML() + `<div class="wrap" style="max-width:760px">
    <div class="sparktop">
      <button class="btn btn-ghost btn-sm" id="bk">${IC.back} Realm</button>
      <div class="tspacer" style="flex:1"></div>
      <span class="chip chip-wc">${w.name}</span>
    </div>
    <div style="margin-top:8px">
      <div style="font-family:var(--disp);font-weight:800;font-size:clamp(21px,4vw,27px)">Spark · ${sp.title}</div>
      <div style="color:var(--dim);font-size:13px;margin-top:4px">${sp.brief}</div>
    </div>
    <div class="sparkstage">
      <div class="wbox" id="wbox"></div>
      <div class="dhruva"><div class="av">${heroBust(40)}</div>
        <div style="flex:1"><div class="who">DHRUVA</div><div class="say" id="saybox"></div>
        <div style="font-size:10.5px;color:var(--faint);margin-top:6px" id="sayhint">tap the message to hurry Dhruva</div></div></div>
      <div id="taskslot" style="padding:0 14px"></div>
      <div id="askslot" style="padding:14px"></div>
    </div>
  </div>`;
  bindTop(sc);
  sc.querySelector('#bk').onclick = () => { Sfx.click(); Router.go('world', { wid: w.id }); };
  const saybox = sc.querySelector('#saybox'), taskslot = sc.querySelector('#taskslot'), askslot = sc.querySelector('#askslot');
  let skipFn = null;
  saybox.parentElement.parentElement.onclick = () => { if (skipFn){ const f = skipFn; skipFn = null; f(); } };
  const ctx = {
    mount(key, opts){
      const box = el('div'); sc.querySelector('#wbox').innerHTML = ''; sc.querySelector('#wbox').appendChild(box);
      box.style.width = 'min(560px,100%)';
      return WIDG[key](box, opts || {});
    },
    say(html){
      if (cancelled) return Promise.resolve();
      return new Promise(res => {
        saybox.innerHTML = `<span class="cursor"></span>`;
        const tmp = el('div'); tmp.innerHTML = html;
        const full = tmp.innerHTML;
        let i = 0; const plain = html.replace(/<[^>]+>/g, '');
        Sfx.tap();
        const type = () => {
          if (cancelled) return res();
          i += 2 + Math.floor(Math.random() * 2);
          const vis = plain.slice(0, i);
          saybox.innerHTML = vis.replace(/[<>&]/g, '') + '<span class="cursor"></span>';
          if (i < plain.length) typer = setTimeout(type, 14);
          else { saybox.innerHTML = full; typer = null; }
        };
        let typer = setTimeout(type, 30);
        const done = () => {
          if (typer) clearTimeout(typer); typer = null;
          saybox.innerHTML = full;
          skipFn = null; sayhint.textContent = '';
          setTimeout(res, 220);
        };
        skipFn = done;
        const autoT = setTimeout(done, clamp(1500 + plain.length * 34, 2600, 8200));
        const oldDone = done;
        skipFn = () => { clearTimeout(autoT); oldDone(); };
      });
    },
    wait(ms){ return new Promise(res => { if (cancelled) return res(); const t = setTimeout(res, ms); addCleanup(() => clearTimeout(t)); }); },
    ask(q){
      if (cancelled) return Promise.resolve(true);
      return askQuestion(askslot, q, { world: w, label: 'SPARK CHECK', timer: 0 }).then(r => {
        askslot.innerHTML = '';
        Store.data.stats.answered++;
        if (!r.ok){ /* gentle: no heart loss in sparks */ }
        Store.save();
        return r.ok;
      });
    }
  };
  (async () => {
    await ctx.say(`Spark <b>"${sp.title}"</b> — watch, touch, play. The concept will sneak into your head. That's a promise.`);
    await LESSONS[sp.id](ctx);
    if (cancelled) return;
    /* mark done */
    const st = wstate(Store.data, w.id);
    if (!st.sparks[sp.id]){
      st.sparks[sp.id] = 1; Store.data.stats.sparks++;
      if (!Store.data.codex.includes(sp.id)) Store.data.codex.push(sp.id);
      Store.save(); grantXP(40);
    }
    overlayConcept(w, sp, go => {
      if (go === 'drill') Router.go('drill', { wid: w.id, sid: sp.id });
      else Router.go('world', { wid: w.id });
    });
  })().catch(err => { console.error('spark error', err); toast('Spark hiccup — ' + err.message, 'bad', 'x', 4200); });
};

/* ---------- DRILL ---------- */
MW.SCREENS.drill = function(sc, p){
  const w = WORLD_BY_ID[p.wid];
  const endless = !!p.endless;
  const sp = p.sid ? SPARK_BY_ID[p.sid] : null;
  setWC(sc, w.color);
  addCleanup(() => { running = false; });
  sc.innerHTML = topbarHTML() + `<div class="wrap" style="max-width:760px">
    <div class="sparktop">
      <button class="btn btn-ghost btn-sm" id="bk">${IC.back} Exit</button>
      <div class="tspacer" style="flex:1"></div>
      <span class="chip chip-wc">${endless ? 'DOJO · ' : ''}${w.name}${sp ? ' · ' + sp.title : ''}</span>
    </div>
    <div class="hud" id="hud"></div>
    <div id="qslot" style="min-height:200px"></div>
  </div>`;
  bindTop(sc);
  sc.querySelector('#bk').onclick = () => { Sfx.click(); running = false; Router.go(endless ? 'dojo' : 'world', { wid: w.id }); };
  const hud = sc.querySelector('#hud'), qslot = sc.querySelector('#qslot');
  let running = true, solved = 0, faced = 0, hearts = 3, combo = 0, best = 0, qn = 0;
  const totalQ = endless ? Infinity : 8;
  function drawHUD(){
    hud.innerHTML = `
      <div class="hearts">${[0,1,2].map(i => `<span class="${i < hearts ? '' : 'off'}">${IC.heart}</span>`).join('')}</div>
      <div class="combo ${combo >= 2 ? 'on' : ''}">${IC.flame} COMBO ×${combo}</div>
      <span class="chip">${endless ? 'Solved: ' + solved : `Question ${Math.min(qn + 1, totalQ)}/${totalQ}`}</span>`;
  }
  function report(){
    const acc = faced ? Math.round(solved / faced * 100) : 0;
    const ovl = el('div', 'ovl'); setWC(ovl, w.color);
    Store.data.stats.drills++;
    const coins = solved >= 6 ? 10 : solved >= 3 ? 5 : 2;
    Store.data.coins += coins;
    if (sp){ const st = wstate(Store.data, w.id); st.drills[sp.id] = Math.max(st.drills[sp.id] || 0, best); }
    Store.save();
    ovl.innerHTML = `<div class="box">
      <div class="cap-kicker" style="color:${acc >= 75 ? 'var(--good)' : acc >= 50 ? 'var(--gold)' : 'var(--coral)'}">${acc >= 75 ? 'Sharp blade' : acc >= 50 ? 'Getting there' : 'Train more, warrior'}</div>
      <div class="cap-name">${solved} solved · ${acc}% accuracy</div>
      <div class="cap-hook">best combo ×${best}</div>
      <div class="rewline">
        <div class="rew">${IC.bolt}<span>+${solved * 10} XP</span></div>
        <div class="rew">${IC.coin}<span>+${coins} coins</span></div>
      </div>
      ${!endless && solved >= 6 && hearts === 3 ? `<div style="margin-top:8px;font-family:var(--hand);font-size:20px;color:var(--gold2)">Flawless-ish. The boss is sweating.</div>` : ''}
      <div style="display:flex;gap:10px;justify-content:center;margin-top:16px;flex-wrap:wrap">
        <button class="btn btn-p" id="rp-again">${IC.refresh} Again</button>
        <button class="btn btn-c" id="rp-map">${IC.next} Done</button>
      </div></div>`;
    document.body.appendChild(ovl);
    requestAnimationFrame(() => ovl.classList.add('on'));
    if (solved >= 6) confetti(60);
    ovl.querySelector('#rp-again').onclick = () => { Sfx.click(); ovl.remove(); Router.go('drill', p); };
    ovl.querySelector('#rp-map').onclick = () => { Sfx.click(); ovl.remove(); Router.go(endless ? 'dojo' : 'world', endless ? {} : { wid: w.id }); };
  }
  async function loop(){
    while (running){
      if (!endless && qn >= totalQ){ running = false; report(); return; }
      if (hearts <= 0){ running = false; report(); return; }
      drawHUD();
      const r = mulberry32(Date.now() % 2147483647 + qn * 977 + (endless ? solved * 31 : 0));
      const maxLv = endless ? 3 : clamp(1 + Math.floor(combo / 3), 1, 3);
      const q = genQuestion(w.id, r, maxLv);
      qn++; faced++;
      const res = await askQuestion(qslot, q, { world: w, label: endless ? 'DOJO · Q' + (solved + 1) : `DRILL · ${qn}/${totalQ}`, timer: endless ? 40 : 35 });
      Store.data.stats.answered++;
      if (res.ok){
        solved++; combo++; best = Math.max(best, combo);
        grantXP(10 + (combo >= 2 ? Math.min(5 * (combo - 1), 20) : 0));
        if (combo >= 3) toast(`COMBO ×${combo} — the streak is alive!`, 'gold', 'flame', 1400);
      } else {
        combo = 0; hearts--;
        if (hearts > 0) toast(endless ? 'Strike! 2 more and the run ends.' : 'Ouch. The deck above is worth a read.', 'bad', 'x', 2000);
      }
      Store.save(); drawHUD();
      await wait(650);
      if (!running) return;
    }
  }
  loop();
};

/* ---------- BOSS ARENA ---------- */
MW.SCREENS.boss = function(sc, p){
  const w = WORLD_BY_ID[p.wid];
  setWC(sc, w.color);
  addCleanup(() => { running = false; });
  sc.innerHTML = topbarHTML() + `<div class="wrap" style="max-width:780px">
    <div class="sparktop">
      <button class="btn btn-ghost btn-sm" id="bk">${IC.back} Retreat</button>
      <div class="tspacer" style="flex:1"></div>
      <span class="chip chip-wc">BOSS · ${w.name}</span>
    </div>
    <div class="arena" id="arena">
      <div class="motes" id="motes"></div>
      <div class="floor"></div>
      <div class="monwrap" id="monwrap"></div>
      <div class="mname">${w.boss.name}</div>
      <div class="mtitle">${w.boss.title}</div>
      <div class="bossbar"><div class="lbl"><span>BOSS HP</span><span id="bhpTxt">6 / 6</span></div><div class="bar"><i id="bhp" style="width:100%"></i></div></div>
      <div class="hud" id="hud" style="margin:12px 0 0"></div>
    </div>
    <div id="qslot" style="margin-top:16px;min-height:120px"></div>
  </div>`;
  bindTop(sc);
  sc.querySelector('#bk').onclick = () => { Sfx.click(); running = false; Router.go('world', { wid: w.id }); };
  const arena = sc.querySelector('#arena'), monwrap = sc.querySelector('#monwrap'), hud = sc.querySelector('#hud'), qslot = sc.querySelector('#qslot');
  for (let i = 0; i < 14; i++){
    const m = el('i', 'mote');
    m.style.cssText += `left:${5 + Math.random() * 90}%;bottom:${Math.random() * 40}%;width:${2 + Math.random() * 3}px;height:${2 + Math.random() * 3}px;animation-delay:${Math.random() * 6}s;animation-duration:${5 + Math.random() * 4}s`;
    sc.querySelector('#motes').appendChild(m);
  }
  monwrap.innerHTML = monsterSVG(BOSS_ART[w.id], w.id + Date.now());
  const mon = monwrap.querySelector('.mon');
  let running = true, bossHP = 6, hearts = 3, qn = 0, combo = 0;
  function drawHUD(){
    hud.innerHTML = `<div class="hearts">${[0,1,2].map(i => `<span class="${i < hearts ? '' : 'off'}">${IC.heart}</span>`).join('')}</div>
      <div class="combo ${combo >= 2 ? 'on' : ''}">${IC.flame} ×${combo}</div>
      <span class="chip">Strike ${Math.min(qn + 1, 6)} / 6</span>`;
  }
  function hitBoss(crit){
    Sfx.slash();
    const sl = el('div', 'slash');
    sl.innerHTML = `<svg viewBox="0 0 100 100"><path d="M8 78 Q50 8 92 22" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round" opacity=".9"/><path d="M12 88 Q54 20 94 34" stroke="var(--gold)" stroke-width="3" fill="none" stroke-linecap="round" opacity=".7"/></svg>`;
    sl.style.left = (monwrap.clientWidth / 2 - 95 + (Math.random() * 40 - 20)) + 'px';
    sl.style.top = '30px';
    monwrap.appendChild(sl); setTimeout(() => sl.remove(), 500);
    mon.classList.remove('hit'); void mon.offsetWidth; mon.classList.add('hit');
    dmgNum(monwrap, crit ? 'CRIT −2' : '−1', 52 + Math.random() * 10 + '%', 30 + Math.random() * 14 + '%', crit);
    bossHP -= crit ? 2 : 1;
    const pct = clamp(bossHP / 6 * 100, 0, 100);
    sc.querySelector('#bhp').style.width = pct + '%';
    sc.querySelector('#bhpTxt').textContent = Math.max(0, bossHP) + ' / 6';
  }
  function bossAttack(){
    Sfx.hit();
    mon.classList.remove('lunge'); void mon.offsetWidth; mon.classList.add('lunge');
    arena.classList.remove('shake'); void arena.offsetWidth; arena.classList.add('shake');
    dmgNum(arena, 'HIT!', 46 + Math.random() * 8 + '%', 62 + Math.random() * 10 + '%');
  }
  function win(){
    running = false;
    mon.classList.add('die');
    Sfx.boss();
    setTimeout(() => {
      const st = wstate(Store.data, w.id);
      const first = !st.boss;
      st.boss = 1; Store.data.stats.bosses++; Store.save();
      grantXP(150); Store.data.coins += 50; Store.save();
      overlayVictory(w, () => Router.go('world', { wid: w.id }));
    }, 1200);
  }
  function lose(){
    running = false;
    overlayDefeat(retry => {
      if (retry) Router.go('boss', { wid: w.id });
      else Router.go('world', { wid: w.id });
    });
  }
  async function loop(){
    while (running){
      if (bossHP <= 0){ win(); return; }
      if (hearts <= 0){ lose(); return; }
      drawHUD();
      const r = mulberry32(Date.now() % 2147483647 + qn * 131 + 7);
      const q = genQuestion(w.id, r, 3);
      qn++;
      const res = await askQuestion(qslot, q, { world: w, label: `BOSS STRIKE ${qn}`, timer: 45 });
      Store.data.stats.answered++;
      if (!running) return;
      if (res.ok){
        combo++;
        if (combo >= 3){ hitBoss(true); toast('FINISHER! Combo ×' + combo, 'gold', 'bolt', 1500); combo = 0; }
        else hitBoss(false);
        grantXP(15);
      } else {
        combo = 0; hearts--;
        bossAttack();
      }
      Store.save(); drawHUD();
      await wait(900);
    }
  }
  drawHUD();
  loop();
};
