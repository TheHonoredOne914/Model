/* ============================ SAATHY · settings + init ============================ */

/* ---------- toast + confirm ---------- */
function toast(msg, kind) {
  const el = document.createElement("div");
  el.className = "toast " + (kind || "info");
  const icons = { ok: '<path d="M20 6 9 17l-5-5"/>', err: '<path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0zM12 9v4M12 17h.01"/>',
                  info: '<circle cx="12" cy="12" r="9"/><path d="M12 8h.01M12 11v5"/>' };
  el.innerHTML = `<svg viewBox="0 0 24 24">${icons[kind] || icons.info}</svg><span>${esc(msg)}</span>`;
  $("#toasts").appendChild(el);
  setTimeout(() => { el.classList.add("out"); setTimeout(() => el.remove(), 320); }, 2600);
}
let cfResolve = null;
function confirmDlg({ title, body, ok }) {
  $("#cfTitle").textContent = title; $("#cfBody").textContent = body;
  $("#cfOk").textContent = ok || "Confirm";
  $("#confirmModal").classList.add("open");
  return new Promise(res => { cfResolve = res; });
}
function settleCf(v) { $("#confirmModal").classList.remove("open"); if (cfResolve) { cfResolve(v); cfResolve = null; } }

/* ---------- settings bindings ---------- */
function bindSeg(id, obj, key, cb) {
  const seg = $(id);
  const sync = () => $$(id + " button").forEach(b => b.classList.toggle("on", b.dataset.v === obj[key]));
  seg.addEventListener("click", e => {
    const b = e.target.closest("button"); if (!b) return;
    obj[key] = b.dataset.v; sync(); saveState(); if (cb) cb(); toast("Preference saved", "ok");
  });
  sync();
}
function applyMotion() {
  const reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  const calm = !state.prefs.motion || reduce;
  document.documentElement.classList.toggle("calm", calm);
  const sw = $("#swMotion");
  sw.classList.toggle("on", state.prefs.motion);
  sw.setAttribute("aria-checked", String(!!state.prefs.motion));
}
function renderFounder() {
  const f = state.founder;
  const unlocked = window.__founderUnlocked;
  $("#fLock").style.display = unlocked ? "none" : "flex";
  $("#fPanel").classList.toggle("hidden", !unlocked);
  $("#fPanel").style.display = unlocked ? "flex" : "none";
  if (!unlocked) return;
  $("#fProvider").value = f.provider;
  const prov = PROVIDERS[f.provider];
  $("#fBase").placeholder = prov.defBase;
  $("#fBaseHint").textContent = prov.hint;
  $("#fModel").placeholder = prov.defModel;
  if (f.key) { $("#keyMask").classList.remove("hidden"); $("#fKey").classList.add("hidden");
    $("#keyMaskTxt").textContent = "••••" + f.key.slice(-4) + "  ·  saved in this browser"; }
  else { $("#keyMask").classList.add("hidden"); $("#fKey").classList.remove("hidden"); }
  if (!$("#fKey").value && !f.key) $("#fKey").value = "";
  $("#fTemp").value = f.temp; $("#tempVal").textContent = Number(f.temp).toFixed(2);
}
function setCfgStatus(kind, msg) {
  const el = $("#cfgStatus");
  el.className = "status-line " + kind;
  el.innerHTML = el.firstElementChild.outerHTML + `<span>${esc(msg)}</span>`;
}

/* ---------- PIN ---------- */
function openPin() {
  $("#pinModal").classList.add("open");
  $("#pinErr").textContent = "";
  $$(".pin-cell").forEach(c => { c.value = ""; c.classList.remove("err"); });
  setTimeout(() => $$(".pin-cell")[0].focus(), 60);
}
function tryPin() {
  const pin = $$(".pin-cell").map(c => c.value).join("");
  if (pin.length < 4) { $("#pinErr").textContent = "Enter all 4 digits."; return; }
  if (pinHash(pin) === state.pinHash) {
    $("#pinModal").classList.remove("open");
    window.__founderUnlocked = true;
    renderFounder(); toast("Founder mode unlocked", "ok");
  } else {
    $("#pinErr").textContent = "Incorrect PIN — try again.";
    const card = $("#pinCard"); card.classList.remove("shake"); void card.offsetWidth; card.classList.add("shake");
    $$(".pin-cell").forEach(c => { c.classList.add("err"); c.value = ""; });
    setTimeout(() => $$(".pin-cell")[0].focus(), 50);
  }
}

/* ---------- composer ---------- */
function autosize() {
  const ta = $("#input");
  ta.style.height = "auto";
  ta.style.height = Math.min(ta.scrollHeight, 170) + "px";
  $("#send").disabled = !ta.value.trim() || busy;
}

/* ---------- init ---------- */
function init() {
  initState();
  $("#sbAva").src = MASCOT.happy;
  $("#hdrAva").src = MASCOT.idle;
  $("#wMascot").src = MASCOT.idle;
  $("#pinAva").src = MASCOT.thinking;
  $("#sbLogo").src = LOGO_VS;
  window.__founderUnlocked = false;

  /* sidebar */
  $("#newChat").addEventListener("click", () => { newChatObj(); $("#searchInput").value = ""; renderList(); renderThread(); $("#input").focus();
    if (innerWidth <= 900) $("#app").classList.remove("sb-open"); });
  $("#sbCollapse").addEventListener("click", () => {
    if (innerWidth <= 900) $("#app").classList.remove("sb-open");
    else $("#app").classList.toggle("rail");
  });
  $("#sbToggle").addEventListener("click", () => $("#app").classList.add("sb-open"));
  $("#sbScrim").addEventListener("click", () => $("#app").classList.remove("sb-open"));
  $("#expandSearch").addEventListener("click", () => { $("#app").classList.remove("rail"); $("#searchInput").focus(); });
  $("#searchInput").addEventListener("input", renderList);

  /* drawer */
  const openDr = () => { renderFounder(); $("#app").classList.add("dr-open"); };
  $("#openSettingsSb").addEventListener("click", openDr);
  $("#openSettingsHdr").addEventListener("click", openDr);
  $("#closeDr").addEventListener("click", () => $("#app").classList.remove("dr-open"));
  $("#drScrim").addEventListener("click", () => $("#app").classList.remove("dr-open"));
  const tabs = [["#tabChat", "#paneChat"], ["#tabStudent", "#paneStudent"], ["#tabFounder", "#paneFounder"]];
  for (const [t, p] of tabs) {
    $(t).addEventListener("click", () => {
      tabs.forEach(([t2, p2]) => { $(t2).classList.toggle("on", t2 === t); $(p2).classList.toggle("on", p2 === p); });
      if (t === "#tabFounder") renderFounder();
    });
  }

  /* chat prefs */
  bindSeg("#segTone", state.prefs, "tone");
  bindSeg("#segStyle", state.prefs, "style");
  bindSeg("#segLen", state.prefs, "length");
  $("#selLang").value = state.prefs.lang;
  $("#selLang").addEventListener("change", e => { state.prefs.lang = e.target.value; saveState(); toast("Language saved", "ok"); });
  $("#swMotion").addEventListener("click", () => { state.prefs.motion = !state.prefs.motion; saveState(); applyMotion(); });

  /* student */
  $("#selClass").value = state.student.cls;
  $("#selSubject").value = state.student.subject;
  $("#inpTopic").value = state.student.topic;
  $("#inpNote").value = state.student.note;
  $("#selClass").addEventListener("change", e => { state.student.cls = e.target.value; saveState(); renderHeader(); toast("Saved", "ok"); });
  $("#selSubject").addEventListener("change", e => { state.student.subject = e.target.value; saveState(); renderHeader(); toast("Saved", "ok"); });
  $("#inpTopic").addEventListener("input", e => { state.student.topic = e.target.value.trim(); saveState(); renderHeader(); });
  $("#inpNote").addEventListener("input", e => { state.student.note = e.target.value.trim(); saveState(); });

  /* founder */
  $("#btnUnlock").addEventListener("click", openPin);
  $("#pinClose").addEventListener("click", () => $("#pinModal").classList.remove("open"));
  $("#btnPinGo").addEventListener("click", tryPin);
  $$(".pin-cell").forEach((cell, i, arr) => {
    cell.addEventListener("input", () => {
      cell.value = cell.value.replace(/\D/g, "").slice(0, 1);
      if (cell.value && i < 3) arr[i + 1].focus();
      if (arr.every(c => c.value)) tryPin();
    });
    cell.addEventListener("keydown", e => {
      if (e.key === "Backspace" && !cell.value && i > 0) arr[i - 1].focus();
      if (e.key === "Enter") tryPin();
    });
  });
  $("#fProvider").addEventListener("change", e => {
    state.founder.provider = e.target.value;
    const prov = PROVIDERS[e.target.value];
    $("#fBase").placeholder = prov.defBase;
    $("#fBaseHint").textContent = prov.hint;
    $("#fModel").placeholder = prov.defModel;
    if (!state.founder.model) $("#fModel").value = "";
  });
  $("#btnSaveCfg").addEventListener("click", () => {
    const f = state.founder;
    if ($("#fKey").value.trim()) f.key = $("#fKey").value.trim();
    f.base = $("#fBase").value.trim(); f.model = $("#fModel").value.trim();
    f.temp = parseFloat($("#fTemp").value) || 0.6;
    saveState(); renderFounder(); renderHeader();
    setCfgStatus("idle", "Configuration saved" + (f.key ? " — key masked. Run “Test connection” to verify." : " — no key saved yet."));
    toast("Configuration saved", "ok");
  });
  $("#btnTest").addEventListener("click", async () => {
    const f = state.founder;
    if ($("#fKey").value.trim()) f.key = $("#fKey").value.trim();
    f.base = $("#fBase").value.trim(); f.model = $("#fModel").value.trim();
    saveState(); renderFounder(); renderHeader();
    if (!f.key) { setCfgStatus("err", "No API key saved yet — paste a key first."); return; }
    const btn = $("#btnTest"); btn.disabled = true;
    btn.innerHTML = '<span class="spin"></span>Testing…';
    setCfgStatus("idle", "Contacting provider…");
    const res = await testConnection();
    setCfgStatus(res.ok ? "ok" : "err", res.msg);
    btn.innerHTML = '<svg viewBox="0 0 24 24"><path d="M13 2 3 14h9l-1 8 10-12h-9z"/></svg>Test connection';
    btn.disabled = false;
    toast(res.ok ? "Connection successful" : "Connection failed", res.ok ? "ok" : "err");
    renderThread();
  });
  $("#keyReplace").addEventListener("click", () => { $("#keyMask").classList.add("hidden"); const k = $("#fKey"); k.classList.remove("hidden"); k.value = ""; k.focus(); });
  $("#keyRemove").addEventListener("click", () => {
    confirmDlg({ title: "Remove the saved API key?", body: "Saathy will return to demo mode until a new key is configured.", ok: "Remove key" })
      .then(ok => { if (!ok) return; state.founder.key = ""; $("#fKey").value = ""; saveState(); renderFounder(); renderHeader(); setCfgStatus("idle", "Key removed — demo mode."); toast("API key removed", "info"); });
  });
  $("#btnPin").addEventListener("click", () => {
    const cur = $("#pinCur").value.trim(), nw = $("#pinNew").value.trim();
    if (pinHash(cur) !== state.pinHash) { toast("Current PIN is incorrect", "err"); return; }
    if (!/^\d{4}$/.test(nw)) { toast("New PIN must be exactly 4 digits", "err"); return; }
    if (pinHash(nw) === state.pinHash) { toast("New PIN must be different", "err"); return; }
    state.pinHash = pinHash(nw); saveState();
    $("#pinCur").value = ""; $("#pinNew").value = "";
    toast("Founder PIN updated", "ok");
  });
  $("#btnLock").addEventListener("click", () => { window.__founderUnlocked = false; renderFounder(); toast("Founder settings locked", "info"); });
  $("#btnResetCfg").addEventListener("click", () => {
    confirmDlg({ title: "Reset founder configuration?", body: "Provider, base URL, API key and model will be cleared. Conversations and student preferences are kept.", ok: "Reset" })
      .then(ok => { if (!ok) return; state.founder = { ...DEFAULTS.founder }; $("#fBase").value = ""; $("#fModel").value = ""; $("#fKey").value = "";
        saveState(); renderFounder(); renderHeader(); setCfgStatus("idle", "Configuration reset."); toast("Founder configuration reset", "info"); });
  });

  /* confirm modal */
  $("#cfOk").addEventListener("click", () => settleCf(true));
  $("#cfCancel").addEventListener("click", () => settleCf(false));
  $("#confirmModal").addEventListener("click", e => { if (e.target.id === "confirmModal") settleCf(false); });

  /* composer + welcome */
  const input = $("#input");
  input.addEventListener("input", autosize);
  input.addEventListener("keydown", e => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(input.value); }
  });
  $("#send").addEventListener("click", () => sendMessage(input.value));
  $$(".w-chip[data-q]").forEach(ch => ch.addEventListener("click", () => {
    input.value = ch.dataset.q; autosize(); input.focus();
    $("#send").disabled = false;
  }));
  $("#demoChip").addEventListener("click", openDemo);

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
      if ($("#pinModal").classList.contains("open")) $("#pinModal").classList.remove("open");
      else if ($("#confirmModal").classList.contains("open")) settleCf(false);
      else { $("#app").classList.remove("sb-open", "dr-open"); }
    }
  });

  applyMotion(); renderHeader(); renderList(); renderThread(); renderFounder(); autosize();
}
document.addEventListener("DOMContentLoaded", init);
