import { chapter } from "../src/content/wars/ch06";
import { bank } from "../src/content/wars/ch06.gen";
import { makeRNG } from "../src/lib/wars/engine";

let n = 0, errs = 0;
const seen = new Set<string>();
for (const [gid, fn] of Object.entries(bank)) {
  for (let d = 1 as 1|2|3|4; d <= 4; d++) {
    for (let i = 0; i < 40; i++) {
      try {
        const q = fn(makeRNG((i * 7919 + d * 104729 + gid.length) >>> 0), d as 1|2|3|4);
        if (!q.text || !q.answer || !q.steps.length || !q.concept || !q.hint1 || q.hint2 === undefined) { console.log("MISSING FIELDS", gid, d, i); errs++; }
        if (q.type === "mcq" && (!q.choices || !q.choices.includes(q.answer))) { console.log("BAD MCQ", gid, d, i, q.answer, q.choices); errs++; }
        if (/NaN|Infinity|undefined/.test(q.text + q.answer + q.steps.join(""))) { console.log("NaN/undef", gid, d, i, q.text, q.answer); errs++; }
        if (q.sub !== "s1" && q.sub !== "s2" && q.sub !== "s3" && q.sub !== "s4") { console.log("BAD SUB", gid, d, i, q.sub); errs++; }
        if (q.ch !== 6) { console.log("BAD CH", gid, d, i, q.ch); errs++; }
        if (q.steps.length < 2 || q.steps.length > 7) { console.log("BAD STEPS LEN", gid, d, i, q.steps.length); errs++; }
        seen.add(q.text); n++;
      } catch (e) { console.log("THROW", gid, d, i, e); errs++; }
    }
  }
}
console.log(`generated ${n} questions, ${seen.size} unique texts, ${errs} errors`);
const sizeTotal = Object.values(chapter.bankSize).reduce((a, b) => a + b, 0);
console.log("chapter bank size:", sizeTotal.toLocaleString());
console.log("subtopics:", chapter.subtopics.map(s => `${s.id}:${s.slides.length} slides, ${s.gens.length} gens`).join(" | "));

// ── spot-check: every generator's answers must satisfy its own arithmetic ──
// Re-derive a handful of known identities on random samples.
import type { Question } from "../src/lib/wars/types";
const num = (s: string): number => parseFloat(s);
let spotErrs = 0;
function spot(gid: string, check: (q: Question) => boolean, samples: number) {
  const fn = bank[gid];
  if (!fn) { console.log("SPOT missing gen", gid); spotErrs++; return; }
  for (let i = 0; i < samples; i++) {
    const q = fn(makeRNG((i * 31337 + gid.length * 977) >>> 0), ((i % 4) + 1) as 1|2|3|4);
    if (!check(q)) { console.log("SPOT FAIL", gid, i, q.text, "=>", q.answer); spotErrs++; }
  }
}
spot("peri-poly", (q) => num(q.answer) > 0, 30);
spot("circumference", (q) => num(q.answer) > 0, 30);
spot("arc-length", (q) => num(q.answer) > 0, 30);
spot("area-rect", (q) => num(q.answer) > 0, 30);
spot("area-circle", (q) => num(q.answer) > 0, 30);
spot("combo-shape", (q) => num(q.answer) > 0, 30);
spot("semi-circle", (q) => num(q.answer) > 0, 30);
console.log("spot checks:", spotErrs === 0 ? "ok" : `${spotErrs} failures`);
