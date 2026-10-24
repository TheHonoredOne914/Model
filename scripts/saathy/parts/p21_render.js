/* ============================ SAATHY · rendering ============================ */

/* ---------- markdown-lite with school-math support ---------- */
function mathHtml(s) {
  return s
    .replace(/\\(t?frac)\{([^{}]+)\}\{([^{}]+)\}/g, (_, __, a, b) => `<span class="mfrac"><i>${a}</i><i>${b}</i></span>`)
    .replace(/\\(times|div|pm|mp|leq|geq|neq|approx|rightarrow|Rightarrow|pi|theta|alpha|beta|gamma|Delta|omega|mu|degree)/g,
      (_, k) => ({ times:"×", div:"÷", pm:"±", mp:"∓", leq:"≤", geq:"≥", neq:"≠", approx:"≈", rightarrow:"→", Rightarrow:"⇒",
        pi:"π", theta:"θ", alpha:"α", beta:"β", gamma:"γ", Delta:"Δ", omega:"ω", mu:"μ", degree:"°" }[k] || k))
    .replace(/\^\{([^{}]+)\}|\^(\w)/g, (_, a, b) => `<sup>${a || b}</sup>`)
    .replace(/_\{([^{}]+)\}|_(\w)/g, (_, a, b) => `<sub>${a || b}</sub>`);
}
function inlineMd(s) {
  s = esc(s);
  const codes = [];
  s = s.replace(/`([^`\n]+)`/g, (_, c) => { codes.push(c); return "\u0000C" + (codes.length - 1) + "\u0000"; });
  const maths = [];
  s = s.replace(/\$\$([^$]+)\$\$/g, (_, m) => { maths.push({ m, block: true }); return "\u0000M" + (maths.length - 1) + "\u0000"; });
  s = s.replace(/\$([^$\n]+)\$/g, (_, m) => { maths.push({ m, block: false }); return "\u0000M" + (maths.length - 1) + "\u0000"; });
  s = s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  s = s.replace(/(^|[\s(])\*([^*\n]+)\*/g, "$1<em>$2</em>");
  s = s.replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
  s = s.replace(/\u0000M(\d+)\u0000/g, (_, i) => {
    const { m, block } = maths[+i];
    const inner = mathHtml(m.trim());
    return block ? `<span class="math-block math">${inner}</span>` : `<span class="math">${inner}</span>`;
  });
  s = s.replace(/\u0000C(\d+)\u0000/g, (_, i) => `<code>${codes[+i]}</code>`);
  return s;
}
function md(src) {
  const lines = String(src || "").replace(/\r/g, "").split("\n");
  const out = []; let i = 0;
  const flushP = buf => { if (buf.length) out.push(`<p>${buf.join("<br>")}</p>`); buf.length = 0; };
  const p = [];
  while (i < lines.length) {
    const L = lines[i];
    if (/^\s*```/.test(L)) {
      flushP(p); const buf = []; i++;
      while (i < lines.length && !/^\s*```/.test(lines[i])) { buf.push(lines[i]); i++; }
      i++; out.push(`<pre><code>${esc(buf.join("\n"))}</code></pre>`); continue;
    }
    if (/^\s*(?:-{3,}|\*{3,}|_{3,})\s*$/.test(L)) { flushP(p); out.push("<hr>"); i++; continue; }
    if (/^\s*#{1,4}\s+/.test(L)) {
      flushP(p); const h = L.match(/^\s*(#{1,4})\s+(.*)$/);
      out.push(`<h${h[1].length + 1}>${inlineMd(h[2].trim())}</h${h[1].length + 1}>`); i++; continue;
    }
    if (/^\s*\|.*\|\s*$/.test(L)) {
      flushP(p); const rows = [];
      while (i < lines.length && /^\s*\|.*\|\s*$/.test(lines[i])) { rows.push(lines[i].trim()); i++; }
      if (rows.length > 1 && /^[\s|:-]+$/.test(rows[1])) rows.splice(1, 1);
      const cells = r => r.slice(1, -1).split("|").map(c => c.trim());
      const head = cells(rows[0]);
      let t = '<div class="tbl-wrap"><table><thead><tr>' + head.map(c => `<th>${inlineMd(c)}</th>`).join("") + "</tr></thead><tbody>";
      for (let r = 1; r < rows.length; r++) t += "<tr>" + cells(rows[r]).map(c => `<td>${inlineMd(c)}</td>`).join("") + "</tr>";
      out.push(t + "</tbody></table></div>"); continue;
    }
    if (/^\s*[-*•]\s+/.test(L)) {
      flushP(p); const items = [];
      while (i < lines.length && /^\s*[-*•]\s+/.test(lines[i])) { items.push(lines[i].replace(/^\s*[-*•]\s+/, "")); i++; }
      out.push("<ul>" + items.map(x => `<li>${inlineMd(x)}</li>`).join("") + "</ul>"); continue;
    }
    if (/^\s*\d+[.)]\s+/.test(L)) {
      flushP(p); const items = [];
      while (i < lines.length && /^\s*\d+[.)]\s+/.test(lines[i])) { items.push(lines[i].replace(/^\s*\d+[.)]\s+/, "")); i++; }
      out.push("<ol>" + items.map(x => `<li>${inlineMd(x)}</li>`).join("") + "</ol>"); continue;
    }
    if (/^\s*>\s?/.test(L)) {
      flushP(p); const q = [];
      while (i < lines.length && /^\s*>\s?/.test(lines[i])) { q.push(lines[i].replace(/^\s*>\s?/, "")); i++; }
      out.push(`<blockquote>${inlineMd(q.join(" "))}</blockquote>`); continue;
    }
    if (/^\s*$/.test(L)) { flushP(p); i++; continue; }
    p.push(inlineMd(L)); i++;
  }
  flushP(p);
  return out.join("");
}

/* ---------- sidebar list ---------- */
function renderList() {
  const q = ($("#searchInput").value || "").trim().toLowerCase();
  const list = $("#chatList");
  const chats = [...state.chats].sort((a, b) => b.updated - a.updated)
    .filter(c => !q || c.title.toLowerCase().includes(q) || c.messages.some(m => (m.content || "").toLowerCase().includes(q)));
  list.innerHTML = "";
  if (!chats.length) {
    const d = document.createElement("div"); d.className = "sb-empty";
    const img = pose("sleeping"); img.style.width = "74px";
    d.appendChild(img);
    const t = document.createElement("div");
    t.textContent = q ? `No chats found for “${q}”` : "No chats yet — say hello!";
    d.appendChild(t); list.appendChild(d); return;
  }
  for (const c of chats) {
    const el = document.createElement("button");
    el.className = "chat-item" + (c.id === activeChatId ? " on" : "");
    el.title = c.title;
    el.style.animationDelay = Math.min(chats.indexOf(c) * 0.03, 0.3) + "s";
    el.innerHTML = `
      <span class="ci-ic"><svg viewBox="0 0 24 24"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg></span>
      <span class="ci-txt"><b>${esc(c.title)}</b><span>${c.messages.length ? esc((c.messages[c.messages.length - 1].content || c.messages[c.messages.length - 1].detail || "").replace(/[*$`#>|_-]/g, " ").replace(/\s+/g, " ").trim().slice(0, 46)) : "No messages yet"}</span></span>
      ${c.demo ? '<span class="ci-demo">Sample</span>' : ""}
      <span class="ci-del" title="Delete chat"><svg class="ic" style="width:13px;height:13px" viewBox="0 0 24 24"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg></span>`;
    el.addEventListener("click", e => {
      if (e.target.closest(".ci-del")) { e.stopPropagation(); delChat(c.id); return; }
      openChat(c.id);
      if (window.innerWidth <= 900) $("#app").classList.remove("sb-open");
    });
    list.appendChild(el);
  }
}

/* ---------- thread ---------- */
const FUP_ITEMS = [
  { icon: '<path d="M2 4h6a4 4 0 0 1 4 4v12a3 3 0 0 0-3-3H2zM22 4h-6a4 4 0 0 0-4 4v12a3 3 0 0 1 3-3h7z"/>', t: "Explain with a diagram", q: "Explain this with a simple diagram I can draw in my notebook." },
  { icon: '<path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"/>', t: "Give more examples", q: "Give me more examples." },
  { icon: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.2-3.2"/>', t: "Practice questions", q: "Give me 3 practice questions on this, from easy to hard." },
];
function buildMsg(m, chat, prev, isLastAssistant) {
  const wrap = document.createElement("div");
  if (m.role === "user") {
    wrap.className = "msg msg-u";
    const b = document.createElement("div"); b.className = "bubble"; b.textContent = m.content;
    wrap.appendChild(b); return wrap;
  }
  wrap.className = "msg msg-a";
  const lead = !prev || prev.role !== "assistant";
  if (lead) { const av = pose(m.role === "error" || m.role === "notice" ? "wink" : "explaining"); av.className = "ava"; wrap.appendChild(av); }
  else { const sp = document.createElement("div"); sp.style.width = "40px"; sp.style.flex = "0 0 auto"; wrap.appendChild(sp); }
  const body = document.createElement("div"); body.className = "msg-body";
  if (m.role === "assistant") {
    const card = document.createElement("div"); card.className = "bubble-a";
    card.innerHTML = `<div class="md">${md(m.content)}</div>`;
    body.appendChild(card);
    const meta = document.createElement("div"); meta.className = "msg-meta";
    meta.innerHTML = `<span>${clock(m.ts)}</span>${chat.demo ? '<span class="sample-pill">Sample</span>' : ""}
      <button class="copy" title="Copy response"><svg viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>Copy</button>`;
    meta.querySelector(".copy").addEventListener("click", () => {
      navigator.clipboard.writeText(m.content).then(() => toast("Response copied", "ok")).catch(() => toast("Couldn't copy", "err"));
    });
    body.appendChild(meta);
    if (isLastAssistant && !chat.demo) {
      const fups = document.createElement("div"); fups.className = "fups";
      for (const f of FUP_ITEMS) {
        const b = document.createElement("button"); b.className = "fup";
        b.innerHTML = `<svg viewBox="0 0 24 24">${f.icon}</svg>${f.t}`;
        b.addEventListener("click", () => sendMessage(f.q));
        fups.appendChild(b);
      }
      body.appendChild(fups);
    }
  } else if (m.role === "notice") {
    body.innerHTML = `<div class="bubble-n"><b>Saathy isn't connected to a model yet.</b><br>${md(m.content)}</div>`;
  } else if (m.role === "error") {
    body.innerHTML = `<div class="bubble-e"><div class="e-title"><svg viewBox="0 0 24 24"><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/></svg>Something went wrong</div>
      <div class="e-detail">${esc(m.detail || "Unknown error")}</div>
      <button class="retry"><svg viewBox="0 0 24 24"><path d="M3 12a9 9 0 1 0 2.6-6.4L3 8"/><path d="M3 3v5h5"/></svg>Retry</button></div>`;
    body.querySelector(".retry").addEventListener("click", async () => {
      const chat2 = activeChat(); if (!chat2 || busy) return;
      const idx = chat2.messages.indexOf(m);
      if (idx > -1) chat2.messages.splice(idx, 1);
      saveState();
      await runModelTurn(chat2);
    });
  }
  wrap.appendChild(body);
  return wrap;
}
function buildTyping() {
  const wrap = document.createElement("div"); wrap.className = "msg msg-a"; wrap.id = "typingRow";
  const av = pose("thinking"); av.className = "ava"; wrap.appendChild(av);
  const body = document.createElement("div"); body.className = "msg-body";
  body.innerHTML = `<div class="typing" style="display:contents"></div>`;
  const t = document.createElement("div"); t.className = "typing";
  t.innerHTML = `<div class="t-b"><i></i><i></i><i></i></div><span class="t-note">Saathy is thinking…</span>`;
  body.appendChild(t); wrap.appendChild(body);
  return wrap;
}
function renderThread() {
  const chat = activeChat();
  const thread = $("#thread"), welcome = $("#welcome");
  const empty = !chat || !chat.messages.length;
  welcome.classList.toggle("hidden", !empty);
  thread.innerHTML = "";
  if (!chat || empty) { $("#scroller").scrollTop = 0; return; }
  let lastAssistantRendered = false;
  const msgs = chat.messages;
  for (let i = 0; i < msgs.length; i++) {
    const isLastA = msgs[i].role === "assistant" && !msgs.slice(i + 1).some(x => x.role === "assistant");
    thread.appendChild(buildMsg(msgs[i], chat, msgs[i - 1], isLastA));
  }
  $("#scroller").scrollTop = $("#scroller").scrollHeight;
}

/* ---------- header / composer status ---------- */
function renderHeader() {
  const s = state.student;
  const chipTxt = `Class ${s.cls} · ${s.subject}${s.topic ? " · " + s.topic : ""}`;
  $("#hdrChipTxt").textContent = chipTxt;
  $("#hdrChip").classList.toggle("hidden", !s.cls && !s.subject);
  const f = state.founder;
  const dot = $("#modelDot"), note = $("#modelNote");
  if (f.key) {
    dot.classList.add("ok");
    note.textContent = `${PROVIDERS[f.provider]?.label || f.provider} · ${f.model || "model not set"}`;
  } else {
    dot.classList.remove("ok");
    note.textContent = "Demo mode — Founder Settings connects a model";
  }
}
