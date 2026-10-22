/* ============ UI: shell, home, world, codex, profile, dojo ============ */
MW.SCREENS = {};
function setWC(node, color){ node.style.setProperty('--wc', color); }
function topbarHTML(){
  const s = Store.data, lv = levelOf(s.xp), prev = xpForLevel(lv), next = xpForLevel(lv + 1);
  const p = Math.round((s.xp - prev) / (next - prev) * 100);
  return `<div class="topbar"><div class="in">
    <button class="logo btnhome" style="cursor:pointer">MATHS <span class="lw">WARS</span></button>
    <div class="lvlchip" title="Level ${lv}"><div class="lv" style="--p:${p}%"><i>${lv}</i></div><div class="xt"><b>Level ${lv}</b>${s.xp} XP</div></div>
    <div class="tspacer"></div>
    <div class="streakchip">${IC.flame}<span>${s.streak}</span></div>
    <div class="coinchip">${IC.coin}<span>${s.coins}</span></div>
    <button class="icobtn btncodex" title="Concept Codex">${IC.book}</button>
    <button class="icobtn btnprofile" title="Profile">${IC.star}</button>
    <button class="icobtn btnsound" title="Sound">${s.settings.sound ? IC.sound : IC.mute}</button>
  </div></div>`;
}
function bindTop(sc){
  sc.querySelector('.btnhome').onclick = () => { Sfx.click(); Router.go('home'); };
  sc.querySelector('.btncodex').onclick = () => { Sfx.click(); Router.go('codex'); };
  sc.querySelector('.btnprofile').onclick = () => { Sfx.click(); Router.go('profile'); };
  sc.querySelector('.btnsound').onclick = e => { Store.data.settings.sound = !Store.data.settings.sound; Sfx.on = Store.data.settings.sound; Store.save(); Sfx.click(); e.currentTarget.innerHTML = Store.data.settings.sound ? IC.sound : IC.mute; };
}
function grantXP(n, ev){
  const before = levelOf(Store.data.xp);
  Store.data.xp += n; Store.save();
  if (ev && n > 0) xpFly(ev.clientX || window.innerWidth / 2, ev.clientY || 120, '+' + n + ' XP');
  const after = levelOf(Store.data.xp);
  if (after > before){ Store.data.coins += after * 5; Store.save(); Sfx.unlock(); toast(`LEVEL UP — Level ${after}! +${after * 5} coins`, 'gold', 'star', 3200); }
}
function dayStr(){ return new Date().toISOString().slice(0, 10); }
function checkStreak(){
  const s = Store.data; const today = dayStr();
  if (s.lastDay === today) return;
  const y = new Date(Date.now() - 864e5).toISOString().slice(0, 10);
  s.streak = s.lastDay === y ? s.streak + 1 : 1;
  s.lastDay = today; Store.save();
}

/* ---------- HOME ---------- */
MW.SCREENS.home = function(sc){
  checkStreak();
  const s = Store.data;
  sc.innerHTML = topbarHTML() + `<div class="wrap">
    <div class="hero-row">
      <div class="hero-bust">${heroBust(64)}</div>
      <div style="flex:1">
        <div class="hero-hi">Welcome back, <span style="background:linear-gradient(100deg,var(--gold2),var(--gold));-webkit-background-clip:text;background-clip:text;color:transparent">Dhruva</span></div>
        <div class="hero-sub">10 realms. ${TOTAL_SPARKS} concepts hiding inside games. Bosses guarding them. Your blade: a pencil.</div>
      </div>
    </div>
    <div id="continue-slot"></div>
    <div class="sect-t">${IC.grid} The Realms</div>
    <div class="mapgrid" id="map"></div>
    <div class="sect-t">${IC.swordpair} Extra Modes</div>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:14px">
      <button class="glass" id="dojoBtn" style="padding:18px;text-align:left;transition:.2s">
        <div style="display:flex;gap:13px;align-items:center">
          <div style="width:46px;height:46px;border-radius:14px;background:rgba(255,122,110,.12);border:1px solid rgba(255,122,110,.3);display:grid;place-items:center;color:var(--coral)">${IC.sword}</div>
          <div><div style="font-family:var(--disp);font-weight:700;font-size:15.5px">The Endless Dojo</div>
          <div style="font-size:12.5px;color:var(--dim);margin-top:3px">Infinite practice, any realm, survival style. 3 mistakes and you're out.</div></div>
        </div></button>
      <button class="glass" id="codexBtn" style="padding:18px;text-align:left;transition:.2s">
        <div style="display:flex;gap:13px;align-items:center">
          <div style="width:46px;height:46px;border-radius:14px;background:rgba(63,207,192,.12);border:1px solid rgba(63,207,192,.3);display:grid;place-items:center;color:var(--teal)">${IC.book}</div>
          <div><div style="font-family:var(--disp);font-weight:700;font-size:15.5px">Concept Codex</div>
          <div style="font-size:12.5px;color:var(--dim);margin-top:3px">${s.codex.length}/${TOTAL_SPARKS} captured. Every concept you've secretly learnt, collected like trophies.</div></div>
        </div></button>
    </div>
    <div style="text-align:center;color:var(--faint);font-size:11.5px;margin-top:30px;letter-spacing:.4px">MATHS WARS · a Class IX quest · progress saves on this device</div>
  </div>`;
  bindTop(sc);
  /* continue card */
  const slot = sc.querySelector('#continue-slot');
  let nextAct = null;
  for (let i = 0; i < WORLDS.length && !nextAct; i++){
    const w = WORLDS[i];
    if (!worldUnlocked(s, i)) { nextAct = { type:'locked', w, i }; break; }
    const st = wstate(s, w.id);
    const sp = w.sparks.find(x => !st.sparks[x.id]);
    if (sp) { nextAct = { type:'spark', w, spark:sp }; break; }
    if (!st.boss) { nextAct = { type:'boss', w }; break; }
  }
  if (nextAct && nextAct.type !== 'locked'){
    const w = nextAct.w;
    const card = el('div', 'glass');
    setWC(card, w.color);
    card.style.cssText += 'margin-top:18px;padding:16px 18px;display:flex;align-items:center;gap:14px;flex-wrap:wrap;cursor:pointer;border-color:color-mix(in srgb,var(--wc) 35%,transparent)';
    const label = nextAct.type === 'spark' ? `Spark: ${nextAct.spark.title}` : nextAct.type === 'boss' ? `BOSS: ${w.boss.name}` : '';
    card.innerHTML = `<div style="width:44px;height:44px;border-radius:13px;display:grid;place-items:center;background:color-mix(in srgb,var(--wc) 16%,transparent);color:var(--wc)">${nextAct.type === 'boss' ? IC.skull : IC.spark}</div>
      <div style="flex:1;min-width:180px"><div style="font-family:var(--disp);font-weight:700;font-size:15px">Continue in ${w.name}</div>
      <div style="font-size:12.5px;color:var(--dim);margin-top:2px">${label}</div></div>
      <span class="btn btn-world btn-sm">Jump in ${IC.next}</span>`;
    card.onclick = () => { Sfx.click(); Router.go(nextAct.type === 'boss' ? 'world' : 'world', { wid: w.id, auto: nextAct.type }); };
    slot.appendChild(card);
  }
  /* map */
  const map = sc.querySelector('#map');
  WORLDS.forEach((w, i) => {
    const unlocked = worldUnlocked(s, i);
    const pr = worldProgress(s, w);
    const pct = Math.round((pr.sparks / pr.total) * (pr.boss ? 100 : 90));
    const card = el('button', 'island' + (unlocked ? '' : ' locked'));
    setWC(card, w.color);
    card.innerHTML = `<div class="art">${islandArt(w, 1)}
      ${pr.boss ? `<div class="bosstamp done">${IC.check}</div>` : ''}</div>
      <div class="body">
        <h3>${w.name}</h3><div class="tag">${w.tag}</div>
        <div class="desc">${unlocked ? w.desc : 'Sealed realm. Prove yourself in the previous isles to break the seal.'}</div>
        <div class="foot">
          <div class="ring"><svg viewBox="0 0 52 52"><circle cx="26" cy="26" r="22" fill="none" stroke="rgba(255,255,255,.1)" stroke-width="5"/><circle cx="26" cy="26" r="22" fill="none" stroke="${w.color}" stroke-width="5" stroke-linecap="round" stroke-dasharray="${pct * 1.382} 200"/></svg><div class="rv">${pr.sparks}/${pr.total}</div></div>
          <span class="pill ${unlocked ? '' : 'gray'}">${pr.boss ? 'CONQUERED' : unlocked ? 'ENTER' : IC.lock + ' LOCKED'}</span>
        </div>
      </div>
      ${unlocked ? '' : `<div class="lockover"><div class="lin">${IC.lock}<span>Locked realm</span></div></div>`}`;
    card.onclick = () => {
      if (!unlocked){ Sfx.bad(); toast('Break the seal first — conquer the realm before this one.', 'bad', 'lock'); return; }
      Sfx.click(); Router.go('world', { wid: w.id });
    };
    map.appendChild(card);
  });
  sc.querySelector('#dojoBtn').onclick = () => { Sfx.click(); Router.go('dojo'); };
  sc.querySelector('#codexBtn').onclick = () => { Sfx.click(); Router.go('codex'); };
};

/* ---------- WORLD HUB ---------- */
MW.SCREENS.world = function(sc, p){
  const w = WORLD_BY_ID[p.wid] || WORLDS[0];
  const s = Store.data, st = wstate(s, w.id);
  sc.innerHTML = topbarHTML() + `<div class="wrap">
    <div class="backrow"><button class="btn btn-ghost btn-sm" id="bk">${IC.back} All realms</button></div>
    <div class="wbanner"><div class="bgart">${islandArt(w, 2)}</div>
      <div class="in">
        <div style="flex:1">
          <h1>${w.name}</h1>
          <div class="pill" style="margin-top:8px">${w.tag}</div>
          <div class="sub">${w.desc}</div>
        </div>
        <div style="text-align:center;min-width:120px">
          <div style="font-family:var(--disp);font-weight:800;font-size:13px;color:var(--wc);letter-spacing:1px">BOSS</div>
          <div style="font-family:var(--disp);font-weight:700;font-size:16px;margin-top:4px">${w.boss.name}</div>
          <div style="font-size:10.5px;color:var(--dim);margin-top:2px;max-width:150px">${w.boss.title}</div>
        </div>
      </div></div>
    <div class="nodepath" id="path"></div>
  </div>`;
  setWC(sc, w.color);
  bindTop(sc);
  sc.querySelector('#bk').onclick = () => { Sfx.click(); Router.go('home'); };
  const path = sc.querySelector('#path');
  let metNext = false;
  w.sparks.forEach((sp, i) => {
    const done = !!st.sparks[sp.id];
    const drillBest = st.drills[sp.id] || 0;
    const now = !done && !metNext;
    if (now) metNext = true;
    const node = el('div', `node ${done ? 'done' : now ? 'now' : 'lock'}`);
    node.innerHTML = `<div class="rail"><div class="dot">${done ? IC.check : now ? IC.spark : IC.lock}</div><div class="cord"></div></div>
      <div class="card">
        <h3>${i + 1}. ${sp.title} ${done ? `<span class="pill">${IC.check} mastered</span>` : ''}</h3>
        <p>${sp.brief}</p>
        <div class="acts">
          <button class="btn ${now ? 'btn-world' : done ? 'btn-c' : 'btn-ghost'} btn-sm act-spark">${now ? IC.play + ' Play the Spark' : done ? IC.refresh + ' Replay' : IC.lock + ' Locked'}</button>
          ${done ? `<button class="btn btn-c btn-sm act-drill">${IC.sword} Drill · best ${drillBest} streak</button>` : ''}
        </div>
      </div>`;
    node.querySelector('.act-spark').onclick = () => { Sfx.click(); if (!done && !now) { toast('Clear the previous spark first.', 'bad', 'lock'); return; } Router.go('spark', { wid: w.id, sid: sp.id }); };
    const db = node.querySelector('.act-drill');
    if (db) db.onclick = () => { Sfx.click(); Router.go('drill', { wid: w.id, sid: sp.id }); };
    path.appendChild(node);
  });
  /* boss node */
  const sparksDone = w.sparks.filter(x => st.sparks[x.id]).length;
  const bossReady = sparksDone === w.sparks.length;
  const bossNode = el('div', `node ${st.boss ? 'done' : bossReady ? 'now' : 'lock'}`);
  bossNode.innerHTML = `<div class="rail"><div class="dot" style="color:var(--bad)">${st.boss ? IC.check : IC.skull}</div></div>
    <div class="card" style="border-color:${st.boss ? 'rgba(78,216,142,.35)' : bossReady ? 'rgba(255,107,107,.4)' : ''}">
      <h3>BOSS — ${w.boss.name} <span style="font-size:11px;color:var(--faint);letter-spacing:1px">${w.boss.title.toUpperCase()}</span></h3>
      <p>${st.boss ? 'Already conquered. The realm remembers your name.' : bossReady ? 'All sparks mastered. The boss awaits — 6 heavy questions, 3 lives, no mercy.' : `Master all ${w.sparks.length} sparks to summon the boss. (${sparksDone}/${w.sparks.length})`}</p>
      <div class="acts"><button class="btn ${st.boss || bossReady ? 'btn-p' : 'btn-ghost'} btn-sm act-boss">${st.boss ? IC.refresh + ' Fight again' : bossReady ? IC.sword + ' Enter the arena' : IC.lock + ' Sealed'}</button></div>
    </div>`;
  bossNode.querySelector('.act-boss').onclick = () => {
    if (!bossReady && !st.boss){ Sfx.bad(); toast('The boss only wakes when all sparks are mastered.', 'bad', 'lock'); return; }
    Sfx.boss(); Router.go('boss', { wid: w.id });
  };
  path.appendChild(bossNode);
};

/* ---------- CONCEPT CAPTURE OVERLAY ---------- */
function overlayConcept(world, spark, onDone){
  const c = spark.concept;
  const ovl = el('div', 'ovl');
  setWC(ovl, world.color);
  ovl.innerHTML = `<div class="box">
    <div class="cap-badge">${IC.idea}</div>
    <div class="cap-kicker">Concept captured</div>
    <div class="cap-name">${c.name}</div>
    <div class="cap-hook">"${c.hook}"</div>
    <div class="cap-pts">${c.pts.map(pt => `<div class="pt">${IC.check}<span>${pt}</span></div>`).join('')}</div>
    <div class="rewline"><div class="rew">${IC.spark}<span>+40 XP</span></div><div class="rew">${IC.book}<span>Codex updated</span></div></div>
    <div style="display:flex;gap:10px;justify-content:center;margin-top:16px;flex-wrap:wrap">
      <button class="btn btn-p" id="oc-practice">${IC.sword} Drill it now</button>
      <button class="btn btn-c" id="oc-map">${IC.next} Later</button>
    </div>
    <div style="margin-top:14px;font-family:var(--hand);font-size:19px;color:var(--dim)">You just learnt real maths. Felt like a game, didn't it?</div>
  </div>`;
  document.body.appendChild(ovl);
  requestAnimationFrame(() => ovl.classList.add('on'));
  Sfx.unlock(); confetti(70);
  const close = go => { ovl.classList.remove('on'); setTimeout(() => ovl.remove(), 320); if (onDone) onDone(go); };
  ovl.querySelector('#oc-practice').onclick = () => { Sfx.click(); close('drill'); };
  ovl.querySelector('#oc-map').onclick = () => { Sfx.click(); close('map'); };
}

/* ---------- BOSS VICTORY / DEFEAT ---------- */
function overlayVictory(world, onDone){
  const ovl = el('div', 'ovl');
  setWC(ovl, world.color);
  const s = Store.data;
  ovl.innerHTML = `<div class="box">
    <div style="width:120px;margin:0 auto">${heroFull(110)}</div>
    <div class="cap-kicker" style="margin-top:10px">Boss conquered</div>
    <div class="cap-name">${world.boss.name} has fallen</div>
    <div class="cap-hook">Realm of ${world.name} — cleared!</div>
    <div class="rewline">
      <div class="rew">${IC.bolt}<span>+150 XP</span></div>
      <div class="rew">${IC.coin}<span>+50 coins</span></div>
      <div class="rew">${IC.trophy}<span>Badge earned</span></div>
    </div>
    <div style="margin-top:14px;color:var(--dim);font-size:13px;line-height:1.6">Every concept you captured in this realm just crushed a boss. That's the whole trick of Maths Wars — <b style="color:var(--ink)">learning while playing</b>.</div>
    <div style="display:flex;gap:10px;justify-content:center;margin-top:18px;flex-wrap:wrap">
      <button class="btn btn-p" id="ov-map">${IC.next} Onward</button>
    </div>
  </div>`;
  document.body.appendChild(ovl);
  requestAnimationFrame(() => ovl.classList.add('on'));
  Sfx.fanfare(); confetti(120);
  ovl.querySelector('#ov-map').onclick = () => { Sfx.click(); ovl.classList.remove('on'); setTimeout(() => ovl.remove(), 320); onDone(); };
}
function overlayDefeat(onRetry){
  const ovl = el('div', 'ovl');
  ovl.innerHTML = `<div class="box">
    <div class="failbadge">${IC.skull}</div>
    <div class="cap-kicker" style="color:var(--bad);margin-top:12px">Down but not out</div>
    <div class="cap-name" style="font-size:21px">The boss survived this round</div>
    <div style="color:var(--dim);font-size:13.5px;line-height:1.65;margin-top:10px">Bosses hit hard, but every attempt makes the next one easier — you still keep <b style="color:var(--gold2)">all the XP</b> you earned. Skim the sparks once more, then come back swinging.</div>
    <div style="display:flex;gap:10px;justify-content:center;margin-top:18px;flex-wrap:wrap">
      <button class="btn btn-p" id="od-retry">${IC.refresh} Rematch</button>
      <button class="btn btn-c" id="od-back">Retreat &amp; train</button>
    </div>
  </div>`;
  document.body.appendChild(ovl);
  requestAnimationFrame(() => ovl.classList.add('on'));
  ovl.querySelector('#od-retry').onclick = () => { Sfx.click(); ovl.classList.remove('on'); setTimeout(() => ovl.remove(), 320); onRetry(true); };
  ovl.querySelector('#od-back').onclick = () => { Sfx.click(); ovl.classList.remove('on'); setTimeout(() => ovl.remove(), 320); onRetry(false); };
}

/* ---------- CODEX ---------- */
MW.SCREENS.codex = function(sc){
  const s = Store.data;
  sc.innerHTML = topbarHTML() + `<div class="wrap">
    <div class="backrow"><button class="btn btn-ghost btn-sm" id="bk">${IC.back} Back</button></div>
    <div class="hero-row" style="margin-top:10px"><div class="hero-bust" style="color:var(--teal)">${IC.book}</div>
      <div><div class="hero-hi">Concept Codex</div>
      <div class="hero-sub"><b style="color:var(--gold2)">${s.codex.length}</b> of <b>${TOTAL_SPARKS}</b> concepts captured. Each one was learnt by playing — that's stealth learning.</div></div></div>
    ${WORLDS.map(w => {
      const st = wstate(s, w.id);
      const cards = w.sparks.map(sp => {
        const got = s.codex.includes(sp.id);
        return `<div class="cxc ${got ? '' : 'lock'}" style="--wc:${w.color}">
          <div class="k">${got ? IC.check : IC.lock} ${w.name}</div>
          <h4>${got ? sp.concept.name : '???'}</h4>
          <p>${got ? sp.concept.hook : 'Play the spark "' + sp.title + '" to capture this concept.'}</p></div>`;
      }).join('');
      return `<div class="sect-t" style="--wc:${w.color};color:${w.color}">${w.name}</div><div class="codexgrid">${cards}</div>`;
    }).join('')}
  </div>`;
  bindTop(sc);
  sc.querySelector('#bk').onclick = () => { Sfx.click(); Router.go('home'); };
};

/* ---------- PROFILE ---------- */
MW.SCREENS.profile = function(sc){
  const s = Store.data, lv = levelOf(s.xp);
  const acc = s.stats.answered ? Math.round(s.stats.correct / s.stats.answered * 100) : 0;
  sc.innerHTML = topbarHTML() + `<div class="wrap">
    <div class="backrow"><button class="btn btn-ghost btn-sm" id="bk">${IC.back} Back</button></div>
    <div class="hero-row" style="margin-top:10px">
      <div class="hero-bust">${heroBust(64)}</div>
      <div><div class="hero-hi">Dhruva · Level ${lv}</div>
      <div class="hero-sub">${s.xp} XP · ${s.coins} coins · ${s.streak}-day streak · the blade sharpens with every problem.</div></div></div>
    <div class="sect-t">Battle record</div>
    <div class="statgrid">
      <div class="stat"><div class="v" style="color:var(--gold)">${s.stats.answered}</div><div class="k">Questions faced</div></div>
      <div class="stat"><div class="v" style="color:var(--good)">${acc}%</div><div class="k">Accuracy</div></div>
      <div class="stat"><div class="v" style="color:var(--teal)">${s.stats.sparks}</div><div class="k">Concepts played</div></div>
      <div class="stat"><div class="v" style="color:var(--coral)">${s.stats.bosses}</div><div class="k">Bosses slain</div></div>
      <div class="stat"><div class="v" style="color:var(--violet)">${s.stats.drills}</div><div class="k">Drills done</div></div>
      <div class="stat"><div class="v" style="color:var(--orange)">${s.codex.length}/${TOTAL_SPARKS}</div><div class="k">Codex captured</div></div>
    </div>
    <div class="sect-t">Realm mastery</div>
    <div style="display:grid;gap:11px">
      ${WORLDS.map(w => { const pr = worldProgress(s, w); const pct = Math.round(((pr.sparks + pr.boss) / (pr.total + 1)) * 100);
        return `<div class="glass" style="--wc:${w.color};padding:13px 16px">
          <div style="display:flex;justify-content:space-between;align-items:center;gap:10px">
            <div style="font-family:var(--disp);font-weight:700;font-size:14px">${w.name}</div>
            <div style="font-size:12px;color:var(--dim)">${pr.sparks}/${pr.total} sparks ${pr.boss ? '· boss ✓' : ''}</div></div>
          <div class="mbar"><i style="width:${pct}%"></i></div></div>`; }).join('')}
    </div>
    <div class="sect-t">Settings</div>
    <div style="display:flex;gap:10px;flex-wrap:wrap">
      <button class="btn btn-c btn-sm" id="sndBtn">${s.settings.sound ? IC.sound : IC.mute} Sound: ${s.settings.sound ? 'ON' : 'OFF'}</button>
      <button class="btn btn-ghost btn-sm" id="rstBtn">${IC.refresh} Reset all progress</button>
    </div></div>`;
  bindTop(sc);
  sc.querySelector('#bk').onclick = () => { Sfx.click(); Router.go('home'); };
  sc.querySelector('#sndBtn').onclick = e => { Store.data.settings.sound = !Store.data.settings.sound; Sfx.on = Store.data.settings.sound; Store.save(); Sfx.click(); e.currentTarget.innerHTML = `${Store.data.settings.sound ? IC.sound : IC.mute} Sound: ${Store.data.settings.sound ? 'ON' : 'OFF'}`; };
  sc.querySelector('#rstBtn').onclick = () => {
    if (confirm('Wipe ALL progress and start the quest anew?')){ Store.reset(); Sfx.bad(); Router.go('home'); }
  };
};

/* ---------- DOJO (endless practice picker) ---------- */
MW.SCREENS.dojo = function(sc){
  const s = Store.data;
  sc.innerHTML = topbarHTML() + `<div class="wrap">
    <div class="backrow"><button class="btn btn-ghost btn-sm" id="bk">${IC.back} Back</button></div>
    <div class="hero-row" style="margin-top:10px"><div class="hero-bust" style="color:var(--coral)">${IC.sword}</div>
      <div><div class="hero-hi">The Endless Dojo</div>
      <div class="hero-sub">Pick any unlocked realm. Fresh generated questions forever — 3 mistakes ends the run. Combo streaks multiply XP.</div></div></div>
    <div class="mapgrid" id="dk"></div></div>`;
  bindTop(sc);
  sc.querySelector('#bk').onclick = () => { Sfx.click(); Router.go('home'); };
  const dk = sc.querySelector('#dk');
  WORLDS.forEach((w, i) => {
    const unlocked = worldUnlocked(s, i);
    const pr = worldProgress(s, w);
    const b = el('button', 'island' + (unlocked ? '' : ' locked'));
    setWC(b, w.color);
    b.innerHTML = `<div class="art">${islandArt(w, 3)}</div><div class="body">
      <h3>${w.name}</h3><div class="tag">${w.tag}</div>
      <div class="desc">${unlocked ? 'Endless generated questions from this realm.' : 'Realm still sealed.'}</div>
      <div class="foot"><div class="ring"><svg viewBox="0 0 52 52"><circle cx="26" cy="26" r="22" fill="none" stroke="rgba(255,255,255,.1)" stroke-width="5"/></svg><div class="rv" style="color:${w.color}">${IC.sword ? '' : ''}${pr.total}</div></div>
      <span class="pill ${unlocked ? '' : 'gray'}">${unlocked ? 'TRAIN' : IC.lock}</span></div></div>`;
    b.onclick = () => { if (!unlocked){ Sfx.bad(); return; } Sfx.click(); Router.go('drill', { wid: w.id, endless: true }); };
    dk.appendChild(b);
  });
};
