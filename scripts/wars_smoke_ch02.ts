import { chapter } from "../src/content/wars/ch02";
import { bank } from "../src/content/wars/ch02.gen";
import { makeRNG } from "../src/lib/wars/engine";

let n = 0, errs = 0;
const seen = new Set<string>();
for (const [gid, fn] of Object.entries(bank)) {
  for (let d = 1 as 1|2|3|4; d <= 4; d++) {
    for (let i = 0; i < 40; i++) {
      try {
        const q = fn(makeRNG((i * 7919 + d * 104729 + gid.length) >>> 0), d as 1|2|3|4);
        if (!q.text || !q.answer || !q.steps.length || !q.concept || !q.hint1 || !q.hint2) { console.log("MISSING FIELDS", gid, d, i); errs++; }
        if (q.type === "mcq" && (!q.choices || !q.choices.includes(q.answer))) { console.log("BAD MCQ", gid, d, i, q.answer, q.choices); errs++; }
        if (q.choices && new Set(q.choices).size !== q.choices.length) { console.log("DUP CHOICES", gid, d, i, q.choices); errs++; }
        if (/NaN|Infinity|undefined/.test(q.text + q.answer + q.steps.join(""))) { console.log("NaN/undef", gid, d, i, q.text, q.answer); errs++; }
        if (q.ch !== 2) { console.log("WRONG CH", gid); errs++; }
        seen.add(q.text); n++;
      } catch (e) { console.log("THROW", gid, d, i, e); errs++; }
    }
  }
}
console.log(`generated ${n} questions, ${seen.size} unique texts, ${errs} errors`);

// consistency: subtopic gens ↔ bank keys
const genIds = new Set(Object.keys(bank));
const mapped = new Set(chapter.subtopics.flatMap((s) => s.gens.map((g) => g.id)));
for (const id of mapped) if (!genIds.has(id)) { console.log("MAPPED GEN MISSING IN BANK:", id); errs++; }
for (const id of genIds) if (!mapped.has(id)) { console.log("BANK GEN NOT MAPPED TO SUBTOPIC:", id); errs++; }

const sizeTotal = Object.values(chapter.bankSize).reduce((a, b) => a + b, 0);
console.log("chapter bank size:", sizeTotal.toLocaleString());
console.log("subtopics:", chapter.subtopics.map(s => `${s.id}:${s.slides.length} slides, ${s.gens.length} gens`).join(" | "));
if (errs > 0) process.exit(1);
