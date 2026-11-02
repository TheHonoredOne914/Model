// ─── MATHS WARS · ch04 smoke harness ───────────────────────────────────────
// Every generator × every difficulty × 40 seeds → validate the Question contract.
import { chapter } from "../src/content/wars/ch04";
import { bank, bankSize } from "../src/content/wars/ch04.gen";
import { checkAnswer, makeRNG } from "../src/lib/wars/engine";

let n = 0, errs = 0;
const seen = new Set<string>();

const VALID_TYPES = new Set(["numeric", "mcq", "tf", "fill"]);

for (const [gid, fn] of Object.entries(bank)) {
  for (let d = 1 as 1 | 2 | 3 | 4; d <= 4; d++) {
    for (let i = 0; i < 40; i++) {
      try {
        const q = fn(makeRNG((i * 7919 + d * 104729 + gid.length) >>> 0), d as 1 | 2 | 3 | 4);
        // ── contract fields ──
        if (!q.text || !q.answer || !q.steps.length || !q.concept || !q.hint1 || !q.hint2) {
          console.log("MISSING FIELDS", gid, d, i); errs++;
        }
        if (q.steps.length < 3 || q.steps.length > 6) {
          console.log("BAD STEPS COUNT", gid, d, i, q.steps.length); errs++;
        }
        if (!VALID_TYPES.has(q.type)) { console.log("BAD TYPE", gid, d, i, q.type); errs++; }
        if (q.ch !== 4) { console.log("WRONG CH", gid, d, i, q.ch); errs++; }
        if (![1, 2, 3, 4].includes(q.diff)) { console.log("BAD DIFF", gid, d, i, q.diff); errs++; }
        // ── mcq integrity ──
        if (q.type === "mcq") {
          if (!q.choices || !q.choices.includes(q.answer)) {
            console.log("BAD MCQ", gid, d, i, q.answer, q.choices); errs++;
          }
          if (q.choices && new Set(q.choices).size !== q.choices.length) {
            console.log("DUP CHOICES", gid, d, i, q.choices); errs++;
          }
        }
        // ── no NaN / undefined leakage anywhere visible ──
        const blob = q.text + q.answer + q.steps.join("") + (q.verify ?? "") + (q.mistake ?? "") + (q.remember ?? "");
        // strip legitimate LaTeX \text{...} groups before hunting for brace artifacts
        if (/NaN|Infinity|undefined|\{[a-z]+\}/.test(blob.replace(/\\text\{[^}]*\}/g, ""))) {
          console.log("NaN/undef/brace-artifact", gid, d, i, blob.slice(0, 160)); errs++;
        }
        // ── answers must verify via the engine ──
        const chk = checkAnswer(q, q.answer);
        if (!chk.ok) { console.log("ANSWER NOT ACCEPTED BY ENGINE", gid, d, i, q.answer); errs++; }
        seen.add(q.text); n++;
      } catch (e) {
        console.log("THROW", gid, d, i, e); errs++;
      }
    }
  }
}

console.log(`generated ${n} questions, ${seen.size} unique texts, ${errs} errors`);

// ── chapter wiring ──
const sizeTotal = Object.values(chapter.bankSize).reduce((a, b) => a + b, 0);
console.log("chapter bank size:", sizeTotal.toLocaleString());
console.log("subtopics:", chapter.subtopics.map(s => `${s.id}:${s.slides.length} slides, ${s.gens.length} gens`).join(" | "));

let wireErrs = 0;
const bankIds = new Set(Object.keys(bank));
const wired = new Set<string>();
for (const s of chapter.subtopics) {
  if (s.slides.length < 5 || s.slides.length > 8) { console.log("BAD SLIDE COUNT", s.id, s.slides.length); wireErrs++; }
  if (s.objectives.length < 2 || s.objectives.length > 4) { console.log("BAD OBJECTIVES", s.id); wireErrs++; }
  for (const need of ["hook", "explore", "predict", "explain", "example", "mistake", "check"] as const) {
    if (!s.slides.some((sl) => sl.k === need)) { console.log("MISSING SLIDE KIND", s.id, need); wireErrs++; }
  }
  for (const g of s.gens) {
    wired.add(g.id);
    if (!bankIds.has(g.id)) { console.log("SUBTOPIC GEN NOT IN BANK", s.id, g.id); wireErrs++; }
  }
}
for (const gid of bankIds) {
  if (!wired.has(gid)) { console.log("BANK GEN NOT WIRED TO ANY SUBTOPIC", gid); wireErrs++; }
}
for (const [gid, sz] of Object.entries(bankSize)) {
  if (bankIds.has(gid) && !(sz > 0)) { console.log("BAD BANKSIZE", gid, sz); wireErrs++; }
}
if (chapter.num !== 4 || chapter.worldId !== "identity-forge") { console.log("BAD CHAPTER META"); wireErrs++; }
console.log("wiring errors:", wireErrs);

if (errs > 0 || wireErrs > 0 || n < 1500) {
  console.log("SMOKE FAIL");
  process.exit(1);
}
console.log("SMOKE PASS");
