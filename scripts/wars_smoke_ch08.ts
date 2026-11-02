import { chapter } from "../src/content/wars/ch08";
import { bank } from "../src/content/wars/ch08.gen";
import { makeRNG, checkAnswer } from "../src/lib/wars/engine";

let n = 0, errs = 0;
const seen = new Set<string>();
const gens = Object.keys(bank);
for (const gid of gens) {
  for (let d = 1 as 1 | 2 | 3 | 4; d <= 4; d++) {
    for (let i = 0; i < 40; i++) {
      try {
        const q = bank[gid](makeRNG((i * 7919 + d * 104729 + gid.length) >>> 0), d as 1 | 2 | 3 | 4);
        if (!q.text || !q.answer || !q.steps.length || !q.concept || !q.hint1 || !q.hint2) { console.log("MISSING FIELDS", gid, d, i); errs++; }
        if (q.steps.length < 3 || q.steps.length > 6) { console.log("BAD STEP COUNT", gid, d, i, q.steps.length); errs++; }
        if (q.type === "mcq") {
          if (!q.choices || q.choices.length < 2 || !q.choices.includes(q.answer)) { console.log("BAD MCQ", gid, d, i, q.answer, q.choices); errs++; }
          if (q.choices && new Set(q.choices).size !== q.choices.length) { console.log("DUP CHOICES", gid, d, i, q.choices); errs++; }
        }
        if (/NaN|Infinity|undefined/.test(q.text + q.answer + q.steps.join("") + (q.concept ?? "") + (q.hint1 ?? "") + (q.hint2 ?? ""))) { console.log("NaN/undef", gid, d, i, q.text, q.answer); errs++; }
        const self = checkAnswer(q, q.answer);
        if (!self.ok) { console.log("SELF-CHECK FAIL", gid, d, i, q.type, q.answer); errs++; }
        seen.add(q.text); n++;
      } catch (e) { console.log("THROW", gid, d, i, e); errs++; }
    }
  }
}
console.log(`generated ${n} questions, ${seen.size} unique texts, ${errs} errors`);
const sizeTotal = Object.values(chapter.bankSize).reduce((a, b) => a + b, 0);
console.log("chapter bank size:", sizeTotal.toLocaleString());
console.log("generators:", gens.length, "| bankSize keys:", Object.keys(chapter.bankSize).length);
console.log("subtopics:", chapter.subtopics.map(s => `${s.id}:${s.slides.length} slides, ${s.gens.length} gens`).join(" | "));
const slideKinds = chapter.subtopics.map(s => s.slides.map(x => x.k).join(","));
console.log("slide loops:", slideKinds.join(" || "));
