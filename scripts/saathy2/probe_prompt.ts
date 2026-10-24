// Probe: build the system prompt exactly like /api/chat does and print it.
import { loadProfile, loadSubjects, matchConcepts, loadNotes } from '/home/z/my-project/src/server/saathy/context.ts';
import { buildSystemPrompt } from '/home/z/my-project/src/server/saathy/prompt.ts';

const profile = await loadProfile();
const subjects = await loadSubjects();
console.log('--- profile language:', profile.language, '| socratic:', profile.socratic);

const hits = matchConcepts('Why is acceleration zero when I return?', subjects);
const notes = await loadNotes(hits.map((h) => h.conceptId));
const system = buildSystemPrompt({
  profile,
  subjects,
  hits,
  notes,
  mode: 'explain',
  focusConceptName: hits[0]?.conceptName ?? null,
});
console.log('--- prompt contains Hinglish rule:', system.includes('Hinglish mode'));
console.log('--- first 3000 chars ---');
console.log(system.slice(0, 3000));
process.exit(0);
