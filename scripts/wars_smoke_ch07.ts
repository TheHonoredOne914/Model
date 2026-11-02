import { chapter } from "../src/content/wars/ch07";
import { bank } from "../src/content/wars/ch07.gen";
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
        seen.add(q.text); n++;
      } catch (e) { console.log("THROW", gid, d, i, e); errs++; }
    }
  }
}
console.log(`generated ${n} questions, ${seen.size} unique texts, ${errs} errors`);
const sizeTotal = Object.values(chapter.bankSize).reduce((a, b) => a + b, 0);
console.log("chapter bank size:", sizeTotal.toLocaleString());
console.log("subtopics:", chapter.subtopics.map(s => `${s.id}:${s.slides.length} slides, ${s.gens.length} gens`).join(" | "));
