#!/usr/bin/env python3
"""Patch public/Saathy.html: fix fatal JS syntax errors, remove emoji violations,
route the no-key chat path through smartReply (cloud brain -> offline book brain),
and append the brain-pack script block."""
import io, sys

PATH = "/home/z/my-project/public/Saathy.html"
src = io.open(PATH, encoding="utf-8").read()

def rep(old, new, count=1, label=""):
    global src
    found = src.count(old)
    if found != count:
        print(f"FAIL [{label}]: expected {count} occurrence(s), found {found}")
        sys.exit(1)
    src = src.replace(old, new)
    print(f"ok [{label}] x{count}")

# 1. FATAL: invalid JS killed the whole v4 glue block (3x) — construct strings via chr()
#    to avoid transport corruption of bracket/dot sequences
OB, CB, DOT = chr(91), chr(93), chr(46)
old1 = "vids:" + OB + "h" + DOT + "primary," + DOT * 3 + "h" + DOT + "alternates" + CB
new1 = ("vids:" + OB + "h" + DOT + "primary" + CB + DOT + "concat(h" + DOT +
        "alternates||" + OB + CB + ")")
rep(old1, new1, 3, "glue syntax fix")

# 2. emoji violations -> clean text
rep("my favourite thing! 😄", "my favourite thing!", 1, "seed emoji 1")
rep("✅ **So the solution is $x = 2$.** Always check by substituting back: $2(2) + 3 = 7$ ✔",
    "**So the solution is $x = 2$.** Always check by substituting back: $2(2) + 3 = 7$ — it balances.",
    1, "seed emoji 2")
rep("should own 😊", "should own", 1, "seed emoji 3")
rep('icon:"🌍"', 'icon:"§"', 1, "book icon")
rep('<div style="text-align:center;font-size:40px;margin:14px 0" id="moIco">🌧</div>',
    '<div style="text-align:center;font-size:40px;margin:14px 0" id="moIco">Rain</div>',
    1, "monsoon placeholder")
rep('celebrate small wins, sprinkle light emojis where natural.',
    'celebrate small wins.', 1, "system prompt tone")

# 3. NOTICE_TEXT -> actionable fallback
rep('const NOTICE_TEXT = "Add an API key in **Settings → Founder** (protected by PIN) and I\'ll answer for real — explaining concepts, solving step by step and quizzing you. Until then, open the **Sample** chats in the sidebar to see how I explain things. ☁️";',
    'const NOTICE_TEXT = "I couldn\'t find that one in my built-in books, and my live brain isn\'t reachable right now. Try me on any chapter topic — like **explain photosynthesis**, **what is democracy** or **linear equations** — or type `plan Motion`, `video gravitation`, `test me force`. ☁️";',
    1, "notice text")

# 4. no-key branch -> smartReply (cloud brain, offline book brain, honest fallback)
rep("""  if (!state.founder.key) {
    busy = true; renderThread();
    const typing = buildTyping(); $("#thread").appendChild(typing);
    $("#scroller").scrollTop = $("#scroller").scrollHeight;
    await sleep(650);
    removeTyping();
    chat.messages.push({ role: "notice", content: NOTICE_TEXT, ts: Date.now() });
    chat.updated = Date.now(); busy = false;
    saveState(); renderList(); renderThread();
    return;
  }""",
"""  if (!state.founder.key) {
    busy = true; renderThread();
    await smartReply(chat, t);
    busy = false;
    saveState(); renderList(); renderThread(); autosize();
    return;
  }""", 1, "no-key branch")

# 5. header status: show brain mode honestly
rep("""  if (f.key) {
    dot.classList.add("ok");
    note.textContent = `${PROVIDERS[f.provider]?.label || f.provider} · ${f.model || "model not set"}`;
  } else {
    dot.classList.remove("ok");
    note.textContent = "Demo mode — Founder Settings connects a model";
  }""",
"""  if (f.key) {
    dot.classList.add("ok");
    note.textContent = `${PROVIDERS[f.provider]?.label || f.provider} · ${f.model || "model not set"}`;
  } else if (window.__brainMode === "cloud") {
    dot.classList.add("ok");
    note.textContent = "Saathy Cloud — live, no key needed";
  } else {
    dot.classList.remove("ok");
    note.textContent = "Book brain — offline NCERT knowledge";
  }""", 1, "header status")

# 6. append the brain pack before </body>
BRAIN_PACK = """<script>
/* ============================ SAATHY · brain pack (v4.1) ============================
   Makes the chat genuinely work with zero configuration:
   1. cloud brain  — POST /api/brain (served by the preview server; z-ai SDK backend)
   2. book brain   — offline retrieval over the built-in NCERT corpus (KB_gm / KB_sc / KB_us)
   3. honest fallback — actionable notice, never a dead end                      */
"use strict";

window.__brainMode = window.__brainMode || "offline";

/* ---------- probe the server brain once per boot ---------- */
async function probeBrain() {
  try {
    const ctl = new AbortController(); const to = setTimeout(() => ctl.abort(), 4000);
    const r = await fetch("/api/brain", { method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ping: true }), signal: ctl.signal });
    clearTimeout(to);
    if (!r.ok) throw new Error("bad status " + r.status);
    const j = await r.json();
    window.__brainMode = (j && j.brain === "cloud") ? "cloud" : "offline";
  } catch (e) { window.__brainMode = "offline"; }
  try { renderHeaderStatus(); } catch (e) {}
}

/* ---------- cloud reply ---------- */
async function cloudReply(chat) {
  const r = await fetch("/api/brain", { method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ system: systemPrompt(), messages: historyForAPI(chat) }) });
  if (!r.ok) throw new Error("brain " + r.status);
  const j = await r.json();
  return (j && j.text) ? j.text : null;
}

/* ---------- smart reply: cloud -> book -> honest notice ---------- */
async function smartReply(chat, t) {
  const typing = buildTyping(); $("#thread").appendChild(typing);
  $("#scroller").scrollTop = $("#scroller").scrollHeight;
  let text = null, cloudFailed = false;
  if (window.__brainMode === "cloud") {
    try { text = await cloudReply(chat); }
    catch (e) { cloudFailed = true; window.__brainMode = "offline"; try { renderHeaderStatus(); } catch (e2) {} }
  }
  if (!text) { if (!cloudFailed) await sleep(420); text = offlineAnswer(t); }
  removeTyping();
  if (text) chat.messages.push({ role: "assistant", content: text, ts: Date.now() });
  else chat.messages.push({ role: "notice", content: NOTICE_TEXT, ts: Date.now() });
  chat.updated = Date.now();
  const av = $("#hdrAva");
  if (av) { av.classList.remove("wink"); void av.offsetWidth; av.classList.add("wink"); }
}

/* ---------- offline book brain: real grounded answers from the built-in corpus ---------- */
const BRAIN_STOP = new Set(["the","a","an","and","or","of","to","in","on","for","with","what","whats","how",
  "why","when","where","which","who","is","are","was","were","do","does","did","can","could","should","would",
  "please","me","my","i","you","your","it","its","that","this","these","those","tell","about","explain",
  "define","definition","describe","give","want","need","know","understand","class","std","grade","chapter",
  "chap","topic","difference","different","between","example","examples","mean","meaning","means","short",
  "note","notes","briefly","simply","basic","basics"]);
function brainTokens(q) {
  return [...new Set(String(q).toLowerCase().replace(/[^a-z0-9 ]/g, " ").split(/\\s+/)
    .filter(w => w.length > 2 && !BRAIN_STOP.has(w)))];
}
function cleanSentences(text) {
  return String(text || "").replace(/\\s+/g, " ")
    .split(/(?<=[.!?])\\s+(?=[A-Z(])/).map(s => s.trim())
    .filter(s => s.length > 30 && s.length < 400);
}
const wordRe = w => new RegExp("\\\\b" + escRe(w) + "\\\\b", "g");

function offlineAnswer(q) {
  const raw = String(q || "").trim();
  if (!raw) return null;
  const ql = raw.toLowerCase();

  /* small talk + identity */
  if (/^(hi+|hello+|hey+|hlo+|namaste|good (morning|afternoon|evening)|yo)\\b/.test(ql)) {
    return "Hello! I'm **Saathy** — your learning companion, trained on NCERT modules and books. My book brain has every chapter of **Ganita Manjari**, **Science Exploration** and **Understanding Society** built right in. Try:\\n\\n- **explain photosynthesis**\\n- **difference between scalar and vector**\\n- **what is a linear equation**\\n\\nOr type `plan Motion` and I'll run the full loop — level check, slides, quiz, game, flashcards and a report.";
  }
  if (/who are you|your name|tumhara naam|aap kaun|about yourself|introduce yourself/.test(ql)) {
    return "I am **Saathy v.1**, trained on NCERT modules and books — the AI companion of VidhyaSaathy (*Learning, with you*).\\n\\nRight now I'm answering from my **book brain**: every reply is grounded in the actual chapters stored inside this page, with the source shown. When a live model is connected (Settings or the preview server), I get full free-form tutoring on top.";
  }
  if (/^(thanks|thank you|thankyou|thx|dhanyavad|shukriya)\\b/.test(ql)) {
    return "Anytime! That's what I'm here for. A tiny next step: ask me to **test you** on the concept you just read — 60 seconds, and your mastery updates honestly.";
  }
  if (/^(how are you|kaise ho|kaisa hai|whats up|wassup|sup)\\b/.test(ql)) {
    return "Running warm and fully charged! More importantly — how are *you* doing? Tell me the chapter that's been bothering you and we'll crack it together, one small step at a time.";
  }
  if (/^(bye|goodbye|good night|gn|see you)\\b/.test(ql)) {
    return "See you soon! Your streak, mastery and reports stay saved right here. When you're back, just type `plan <chapter>` and we continue exactly where we left off.";
  }
  if (/what can you do|^help\\b|how do (you|i) (use|work)|features|kya kar sakte/.test(ql)) {
    return "Here's what I can do right now, with zero setup:\\n\\n- **Explain any chapter concept** — grounded in your three books, with the exact section cited\\n- `plan <chapter>` — full loop: level check, slides, quiz, game, flashcards, report\\n- `test me <topic>` — honest ladder quiz (Sure / Unsure / Guess)\\n- `video <topic>` — verified teacher videos, 3 per concept, every link checked\\n- `game` — five learning games that feed your mastery\\n- Paste a **YouTube link** — I build a watch timeline with checkpoints\\n- Track **streaks, XP, mastery and weak concepts** in Reports\\n\\nWhat are we learning today?";
  }
  const cmd = offlineBrainSuggest(ql);
  if (cmd) return cmd;

  /* knowledge retrieval over the corpus */
  const words = brainTokens(raw);
  if (!words.length) return null;
  const cands = [];
  for (const bk in BOOKS) {
    for (const ch of BOOKS[bk].chapters) {
      const chHay = (ch.title + " " + (ch.intro || "")).toLowerCase();
      const chScore = words.reduce((a, w) => a + (new RegExp("\\\\b" + escRe(w) + "\\\\b").test(chHay) ? (w.length >= 5 ? 3 : 1.5) : 0), 0);
      for (const sec of (ch.sections || [])) {
        const body = String(sec.content || "").slice(0, 2600).toLowerCase();
        const st = String(sec.title || "").toLowerCase();
        let s = chScore;
        for (const w of words) {
          if (new RegExp("\\\\b" + escRe(w) + "\\\\b").test(st)) s += 4;
          s += Math.min((body.match(new RegExp("\\\\b" + escRe(w) + "\\\\b", "g")) || []).length, 4) * 1.2;
        }
        cands.push({ bk, ch, sec, s });
      }
    }
  }
  if (!cands.length) return null;
  cands.sort((a, b) => b.s - a.s);
  const best = cands[0];
  if (best.s < 3.5) return null;

  const bookName = BOOKS[best.bk].name.split(" (")[0];
  const head = "**" + (best.sec.title || best.ch.title) + "** — from *" + bookName +
    "*, Chapter " + best.ch.number + ": " + best.ch.title + " (§" + best.sec.id + ")";
  const introSents = cleanSentences(best.sec.content);
  const intro = introSents.slice(0, 2).join(" ");

  const scored = [];
  for (const c of cands.slice(0, 5)) {
    if (c.s < best.s * 0.45) break;
    const sameBook = BOOKS[c.bk].name.split(" (")[0];
    for (const sn of cleanSentences(c.sec.content)) {
      const sc = words.reduce((a, w) => a + (sn.toLowerCase().includes(w) ? 1 : 0), 0);
      if (sc > 0) scored.push({ sn, sc, from: c.sec === best.sec ? null : (c.sec.title || "§" + c.sec.id) + " (" + sameBook + ")" });
    }
  }
  scored.sort((a, b) => b.sc - a.sc);
  const bullets = []; const seen = new Set();
  for (const it of scored) {
    const k = it.sn.slice(0, 60).toLowerCase();
    if (seen.has(k) || intro.includes(it.sn)) continue;
    seen.add(k);
    bullets.push(it.from ? it.sn + " *(also in " + it.from + ")*" : it.sn);
    if (bullets.length >= 4) break;
  }

  const tips = [];
  try {
    if (typeof matchVideos === "function" && typeof VIDEO_KIT !== "undefined" && VIDEO_KIT.length) {
      const hits = matchVideos(raw, { limit: 1 });
      if (hits.length) tips.push("Type `video " + hits[0].concept.split(/\\s+/).slice(0, 3).join(" ") + "` and I'll open the verified video kit for this.");
    }
  } catch (e) {}
  tips.push("Type `test me " + best.ch.title.split(/[:—]/)[0].trim().split(/\\s+/).slice(0, 2).join(" ") + "` and I'll start a quick mastery quiz on this chapter.");

  let out = head + "\\n\\n" + (intro ? intro + "\\n\\n" : "");
  if (bullets.length) out += "**Key points**\\n" + bullets.map(b => "- " + b).join("\\n") + "\\n\\n";
  out += tips.join("  \\n");
  return out;
}

/* ---------- boot ---------- */
document.addEventListener("DOMContentLoaded", () => { probeBrain(); });
</script>"""

rep("</script>\n</body>", "</script>\n" + BRAIN_PACK + "\n</body>", 1, "brain pack append")

io.open(PATH, "w", encoding="utf-8").write(src)
print("PATCH DONE —", len(src), "bytes")
