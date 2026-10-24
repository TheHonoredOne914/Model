/* ============================ SAATHY · core ============================ */
"use strict";
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const LS_KEY = "saathy.v1";
const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const sleep = ms => new Promise(r => setTimeout(r, ms));
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
const escRe = s => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

function pinHash(pin) { let h = 5381; for (const c of "saathy·" + pin) { h = ((h * 33) ^ c.charCodeAt(0)) >>> 0; } return h.toString(36); }
const DEFAULT_PIN_HASH = pinHash("2405");

function relTime(ts) {
  const d = Date.now() - ts, m = Math.round(d / 6e4);
  if (m < 1) return "just now";
  if (m < 60) return m + "m ago";
  const h = Math.round(m / 60); if (h < 24) return h + "h ago";
  const dd = Math.round(h / 24); if (dd < 7) return dd + "d ago";
  return new Date(ts).toLocaleDateString(undefined, { day: "numeric", month: "short" });
}
function clock(ts) { return new Date(ts).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }); }

/* ---------------- seed conversations (honest demo content) ---------------- */
const SEED_DEMO_LINEAR_U = "Can you explain linear equations with examples?";
const SEED_DEMO_LINEAR_A = "Solving these step by step is my favourite thing! 😄\n\nA **linear equation** is an equation in which the highest power of the variable is **1** — its graph is always a straight *line*.\n\n**Example:** solve $2x + 3 = 7$\n\n**Step 1 — Subtract 3 from both sides**\n$$2x = 4$$\n*Why?* Whatever you do to one side of an equation, you must do to the other — that keeps it balanced, like a see-saw.\n\n**Step 2 — Divide both sides by 2**\n$$x = 2$$\n\n✅ **So the solution is $x = 2$.** Always check by substituting back: $2(2) + 3 = 7$ ✔\n\nYour turn — try $3x - 5 = 10$ and tell me what you get!";
const SEED_DEMO_SCALAR_U = "What is the difference between scalar and vector quantities? Can you give examples from class 9 physics?";
const SEED_DEMO_SCALAR_A = "Great question! In Class 9 Physics we learn that physical quantities can be broadly classified into two types: **scalar and vector quantities**. Let me explain the difference with clear examples:\n\n## 1. Scalar Quantities\n\n- Scalars have only **magnitude** (a numerical value) and **no direction**.\n- They are fully described by a single number with a unit.\n- **Examples:** mass, time, temperature, distance, energy, speed.\n\n## 2. Vector Quantities\n\n- Vectors have **both magnitude and direction**.\n- They require at least two pieces of information to be fully described (e.g., *5 m east*).\n- **Examples:** displacement, velocity, acceleration, force, momentum.\n\n## Quick Comparison\n\n| Feature | Scalar | Vector |\n|---|---|---|\n| Magnitude | Yes | Yes |\n| Direction | No | Yes |\n| Example | Mass, Temperature | Displacement, Force |\n\nIf you want, I can also show you a few diagrams to make the difference more visual. Would you like that?";
const SEED_DEMO_WORK_U = "What is the formula for work and kinetic energy?";
const SEED_DEMO_WORK_A = "Two formulas every Class 9 student should own 😊\n\n**Work** — force actually moving something:\n$$W = F \\times d$$\nWork is in **joules (J)** — and remember, holding a bag without moving it does *zero* work, no matter how tired you feel!\n\n**Kinetic energy** — energy of motion:\n$$KE = \\tfrac{1}{2} m v^2$$\nNotice the $v^2$: double a car's speed and its kinetic energy becomes **4×**. That's why braking distance grows so fast.\n\nWant a numerical example with real numbers?";

function seedChats() {
  const now = Date.now(), H = 36e5;
  return [
    { id: uid() + "s1", title: "Linear Equations", demo: true, updated: now - 2 * H, messages: [
      { role: "user", content: SEED_DEMO_LINEAR_U, ts: now - 2 * H },
      { role: "assistant", content: SEED_DEMO_LINEAR_A, ts: now - 2 * H + 4e4 } ] },
    { id: uid() + "s2", title: "Motion and Force", demo: true, updated: now - 5 * H, messages: [
      { role: "user", content: SEED_DEMO_SCALAR_U, ts: now - 5 * H },
      { role: "assistant", content: SEED_DEMO_SCALAR_A, ts: now - 5 * H + 4e4 } ] },
    { id: uid() + "s3", title: "Work and Energy", demo: true, updated: now - 26 * H, messages: [
      { role: "user", content: SEED_DEMO_WORK_U, ts: now - 26 * H },
      { role: "assistant", content: SEED_DEMO_WORK_A, ts: now - 26 * H + 4e4 } ] },
    { id: uid() + "s4", title: "Cell Structure", demo: true, updated: now - 50 * H, messages: [] },
    { id: uid() + "s5", title: "Quadratic Equations", demo: true, updated: now - 74 * H, messages: [] },
  ];
}

/* ---------------- state ---------------- */
const DEFAULTS = {
  prefs:   { tone: "friendly", style: "step", length: "balanced", lang: "English", motion: true },
  student: { cls: "9", subject: "Science", topic: "", note: "" },
  founder: { provider: "openai", base: "", key: "", model: "", temp: 0.6 },
};
let state = null;
let activeChatId = null;
let busy = false;

function loadState() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return null;
    const s = JSON.parse(raw);
    if (!s || !Array.isArray(s.chats)) return null;
    return s;
  } catch (e) { return null; }
}
function saveState() {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify({
      chats: state.chats, prefs: state.prefs, student: state.student,
      founder: state.founder, pinHash: state.pinHash, seeded: true,
    }));
  } catch (e) { /* storage full / private mode — prototype limitation */ }
}
function initState() {
  state = loadState();
  if (!state) {
    state = { chats: seedChats(), prefs: { ...DEFAULTS.prefs }, student: { ...DEFAULTS.student },
              founder: { ...DEFAULTS.founder }, pinHash: DEFAULT_PIN_HASH, seeded: true };
    saveState();
  }
  state.prefs = { ...DEFAULTS.prefs, ...state.prefs };
  state.student = { ...DEFAULTS.student, ...state.student };
  state.founder = { ...DEFAULTS.founder, ...state.founder };
}
const activeChat = () => state.chats.find(c => c.id === activeChatId) || null;

/* mascot pose helper */
const pose = (name) => { const el = new Image(); el.src = MASCOT[name] || MASCOT.idle; el.alt = "Saathy " + name; el.draggable = false; return el; };
