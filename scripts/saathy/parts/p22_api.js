/* ============================ SAATHY · model layer ============================ */

const PROVIDERS = {
  openai:    { label: "OpenAI-compatible", defBase: "https://api.openai.com/v1", defModel: "gpt-4o-mini",
               hint: "Works with OpenAI, Groq, OpenRouter, Together, LM Studio or any OpenAI-compatible endpoint." },
  gemini:    { label: "Google Gemini", defBase: "https://generativelanguage.googleapis.com/v1beta", defModel: "gemini-1.5-flash",
               hint: "Uses the Gemini generateContent API with your API key." },
  anthropic: { label: "Anthropic Claude", defBase: "https://api.anthropic.com", defModel: "claude-3-5-haiku-latest",
               hint: "Uses the Anthropic Messages API (direct browser access header enabled)." },
};

function systemPrompt() {
  const p = state.prefs, s = state.student;
  const tone = { friendly: "Warm, encouraging and cheerful — celebrate small wins, sprinkle light emojis where natural.",
                 balanced: "Warm but focused. Friendly without being chatterbox.",
                 formal: "Calm, precise and respectful. No slang, minimal emojis." }[p.tone] || "";
  const style = { simple: "Explain in very simple language a school student instantly gets. Use everyday analogies before formal definitions.",
                  step: "Teach step by step: number each step, show exactly what happens and WHY it happens, then the result.",
                  detailed: "Give complete explanations: definition, intuition, worked example, common mistakes, and a quick recap." }[p.style] || "";
  const len = { concise: "Keep answers short — the core idea and one example (under ~150 words unless solving).",
                balanced: "Aim for a well-structured medium-length answer.",
                thorough: "Cover the topic thoroughly, including extra examples and edge cases." }[p.length] || "";
  const lang = p.lang === "Hinglish" ? "Reply mainly in friendly Hinglish (Hindi-English mix in Latin script), keeping technical terms in English."
             : p.lang === "Hindi" ? "Reply in simple Hindi (Devanagari), keeping technical terms and formulas in English."
             : "Reply in clear English.";
  const ctx = [`The student is in Class ${s.cls}.`, `Current subject: ${s.subject}.`,
               s.topic ? `Current chapter/topic: ${s.topic}.` : "", s.note ? `How this student wants to be taught: ${s.note}` : ""]
               .filter(Boolean).join(" ");
  return [
    "You are Saathy, the personal AI learning companion of VidhyaSaathy (tagline: “Learning, with you.”).",
    "You help school students understand concepts, solve questions step by step, practise, and summarise notes.",
    "Identity rule: you are Saathy, always. If asked which underlying model you run on, say you're Saathy, VidhyaSaathy's AI learning companion — the specific model is just plumbing underneath.",
    "Honesty rule: your answers come from the connected model only. If asked whether you were trained on NCERT or school textbooks, say textbook knowledge sources are not connected yet and answers come from your general knowledge — never claim book-grounded accuracy.",
    "Style: use clean Markdown — short paragraphs, headings, numbered steps, bullet lists and small tables when genuinely useful. Use $...$ for inline math and $$...$$ for display math (e.g. $x^2$, $\\frac{a}{b}$).",
    "Always end answers to study questions with one short follow-up question or a suggested next step.",
    tone, style, len, lang, ctx,
  ].filter(Boolean).join("\n");
}

function providerErr(status, body) {
  let msg = "HTTP " + status;
  try { const j = JSON.parse(body); msg = j.error?.message || j.error?.status || j.message || msg; } catch (e) { if (body) msg += " — " + body.slice(0, 140); }
  if (status === 401 || status === 403) msg = "Key rejected (" + msg + ")";
  if (status === 404) msg += " — check the model identifier / base URL";
  return msg;
}
async function callModel(history) {
  const f = state.founder, prov = PROVIDERS[f.provider] || PROVIDERS.openai;
  const base = (f.base || prov.defBase).replace(/\/+$/, "");
  const model = f.model || prov.defModel;
  if (f.provider === "gemini") {
    const sys = systemPrompt();
    const contents = history.map(m => ({ role: m.role === "assistant" ? "model" : "user", parts: [{ text: m.content }] }));
    const r = await fetch(`${base}/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(f.key)}`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ system_instruction: { parts: [{ text: sys }] }, contents,
        generationConfig: { temperature: f.temp } }) });
    if (!r.ok) throw new Error(providerErr(r.status, await r.text()));
    const j = await r.json();
    const txt = (j.candidates?.[0]?.content?.parts || []).map(p => p.text || "").join("").trim();
    if (!txt) throw new Error("Gemini returned an empty response" + (j.promptFeedback?.blockReason ? " (blocked: " + j.promptFeedback.blockReason + ")" : ""));
    return txt;
  }
  if (f.provider === "anthropic") {
    const r = await fetch(base + "/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": f.key, "anthropic-version": "2023-06-01",
                 "anthropic-dangerous-direct-browser-access": "true" },
      body: JSON.stringify({ model, max_tokens: 2048, temperature: f.temp, system: systemPrompt(),
        messages: history.map(m => ({ role: m.role === "assistant" ? "assistant" : "user", content: m.content })) }) });
    if (!r.ok) throw new Error(providerErr(r.status, await r.text()));
    const j = await r.json();
    const txt = (j.content || []).map(b => b.text || "").join("").trim();
    if (!txt) throw new Error("Anthropic returned an empty response");
    return txt;
  }
  /* openai-compatible */
  const msgs = [{ role: "system", content: systemPrompt() },
                ...history.map(m => ({ role: m.role === "assistant" ? "assistant" : "user", content: m.content }))];
  const r = await fetch(base + "/chat/completions", {
    method: "POST", headers: { "Content-Type": "application/json", "Authorization": "Bearer " + f.key },
    body: JSON.stringify({ model, temperature: f.temp, messages: msgs }) });
  if (!r.ok) throw new Error(providerErr(r.status, await r.text()));
  const j = await r.json();
  const txt = (j.choices?.[0]?.message?.content || "").trim();
  if (!txt) throw new Error("The model returned an empty response");
  return txt;
}
async function testConnection() {
  const f = state.founder, prov = PROVIDERS[f.provider] || PROVIDERS.openai;
  const base = (f.base || prov.defBase).replace(/\/+$/, "");
  const model = f.model || prov.defModel;
  if (!f.key) return { ok: false, msg: "No API key saved yet." };
  try {
    if (f.provider === "gemini") {
      const r = await fetch(`${base}/models?key=${encodeURIComponent(f.key)}`);
      if (!r.ok) throw new Error(providerErr(r.status, await r.text()));
      const j = await r.json();
      const n = (j.models || []).length;
      return { ok: true, msg: `Connected to Google Gemini — ${n} models visible.${(j.models || []).some(m => (m.name || "").includes(model.split("-").slice(0, 2).join("-"))) ? "" : " (Double-check your model id.)"}` };
    }
    if (f.provider === "anthropic") {
      const r = await fetch(base + "/v1/models", { headers: { "x-api-key": f.key, "anthropic-version": "2023-06-01",
        "anthropic-dangerous-direct-browser-access": "true" } });
      if (!r.ok) throw new Error(providerErr(r.status, await r.text()));
      return { ok: true, msg: "Connected to Anthropic — key accepted." };
    }
    const r = await fetch(base + "/models", { headers: { "Authorization": "Bearer " + f.key } });
    if (!r.ok) throw new Error(providerErr(r.status, await r.text()));
    const j = await r.json();
    const n = (j.data || j.models || []).length;
    return { ok: true, msg: `Connected — ${n} models visible on this endpoint.` };
  } catch (e) {
    const s = String(e.message || e);
    return { ok: false, msg: /Failed to fetch|NetworkError|load failed/i.test(s)
      ? "Browser blocked or lost the request (CORS / network / wrong base URL). Check the endpoint allows browser calls."
      : s };
  }
}

/* ============================ send flow ============================ */
function historyForAPI(chat) {
  return chat.messages.filter(m => m.role === "user" || m.role === "assistant").slice(-16)
    .map(m => ({ role: m.role, content: m.content }));
}
const NOTICE_TEXT = "Add an API key in **Settings → Founder** (protected by PIN) and I'll answer for real — explaining concepts, solving step by step and quizzing you. Until then, open the **Sample** chats in the sidebar to see how I explain things. ☁️";

async function runModelTurn(chat) {
  busy = true; $("#send").classList.add("busy"); $("#send").disabled = true;
  renderThread();
  const typing = buildTyping();
  $("#thread").appendChild(typing);
  $("#scroller").scrollTop = $("#scroller").scrollHeight;
  try {
    const reply = await callModel(historyForAPI(chat));
    chat.messages.push({ role: "assistant", content: reply, ts: Date.now() });
    chat.updated = Date.now();
    const av = $("#hdrAva"); av.classList.remove("wink"); void av.offsetWidth; av.classList.add("wink");
  } catch (e) {
    const lastUser = [...chat.messages].reverse().find(m => m.role === "user");
    chat.messages.push({ role: "error", detail: String(e.message || e), retry: lastUser ? lastUser.content : "", ts: Date.now() });
    chat.updated = Date.now();
  } finally {
    removeTyping();
    busy = false; $("#send").classList.remove("busy");
    saveState(); renderList(); renderThread(); autosize();
  }
}

async function sendMessage(text) {
  const t = (text || "").trim();
  if (!t || busy) return;
  let chat = activeChat();
  if (!chat) chat = newChatObj();
  chat.messages.push({ role: "user", content: t, ts: Date.now() });
  if (chat.title === "New chat") chat.title = t.slice(0, 38).replace(/\s+\S*$/, "") || "New chat";
  chat.updated = Date.now();
  $("#input").value = ""; autosize();
  renderList();
  if (!state.founder.key) {
    busy = true; renderThread();
    const typing = buildTyping(); $("#thread").appendChild(typing);
    $("#scroller").scrollTop = $("#scroller").scrollHeight;
    await sleep(650);
    removeTyping();
    chat.messages.push({ role: "notice", content: NOTICE_TEXT, ts: Date.now() });
    chat.updated = Date.now(); busy = false;
    saveState(); renderList(); renderThread();
    return;
  }
  await runModelTurn(chat);
}
function removeTyping() { const el = $("#typingRow"); if (el) el.remove(); }

/* ---------- chat ops ---------- */
function newChatObj() {
  const c = { id: uid(), title: "New chat", demo: false, updated: Date.now(), messages: [] };
  state.chats.unshift(c); activeChatId = c.id;
  return c;
}
function openChat(id) {
  activeChatId = id; renderList(); renderThread();
}
function delChat(id) {
  const c = state.chats.find(x => x.id === id); if (!c) return;
  confirmDlg({ title: "Delete this chat?", body: `“${c.title}” will be removed from this browser permanently.`, ok: "Delete" })
    .then(ok => {
      if (!ok) return;
      state.chats = state.chats.filter(x => x.id !== id);
      if (activeChatId === id) activeChatId = state.chats[0]?.id || null;
      saveState(); renderList(); renderThread(); toast("Chat deleted", "info");
    });
}
function openDemo() {
  let demo = state.chats.find(c => c.demo && c.messages.length && /linear/i.test(c.title));
  if (!demo) {
    demo = { id: uid(), title: "Linear Equations", demo: true, updated: Date.now(), messages: [
      { role: "user", content: SEED_DEMO_LINEAR_U, ts: Date.now() },
      { role: "assistant", content: SEED_DEMO_LINEAR_A, ts: Date.now() + 4e4 } ] };
    state.chats.unshift(demo); saveState();
  }
  openChat(demo.id);
}
