// Shared types — the integration contract between Saathy's UI and engine.
// The future VidhyaSaathy app can call the same /api/* contracts.

export type Tier = 0 | 1 | 2 | 3;

// VS-22: four internal performance bands — internal routing only.
// Students NEVER see numbers or band labels; only friendly concept statuses.
export interface TierInfo {
  tier: Tier;
  label: string; // friendly, student-visible
  directive: string; // pedagogy directive (internal)
  dot: string; // heat-map colour (green=secure, peach=mixed, red=stuck)
}

export const TIERS: Record<Tier, TierInfo> = {
  0: {
    tier: 0,
    label: "Let's fix this",
    directive:
      'Large gaps. Start from the prerequisite in the simplest possible words. One tiny idea at a time. Always build one concrete everyday example before any formula. Ask one small guiding question to keep them moving.',
    dot: '#E5484D',
  },
  1: {
    tier: 1,
    label: 'Building up',
    directive:
      'Basics partly clear. Lead with a worked example, then guided practice. Keep steps numbered and short. Check the prerequisite briefly if they hesitate.',
    dot: '#F19937',
  },
  2: {
    tier: 2,
    label: 'Almost there',
    directive:
      'Basics clear. Give application-level questions and slightly richer reasoning. Point out the classic exam traps for this concept. Push one level beyond the textbook example.',
    dot: '#7FB3FF',
  },
  3: {
    tier: 3,
    label: 'Mastered',
    directive:
      'Consistent understanding. Offer a harder challenge or connect this concept to the next one. Keep it snappy — do not over-explain what they already know.',
    dot: '#46A758',
  },
};

export function tierFor(score: number): Tier {
  if (score < 0.25) return 0;
  if (score < 0.5) return 1;
  if (score < 0.75) return 2;
  return 3;
}

// VS-23 adaptive difficulty: route Quick Check level from the internal band.
export function difficultyFor(tier: Tier): 1 | 2 | 3 {
  if (tier === 0) return 1;
  if (tier === 3) return 3;
  return 2;
}

// AI-08: mastery estimate update from evidence (EMA-style, simple and explainable).
export function masteryUpdate(score: number, correct: boolean, difficulty: number): number {
  const delta = correct ? 0.05 + 0.05 * difficulty : -(0.09 - 0.03 * difficulty);
  return Math.min(1, Math.max(0, Math.round((score + delta) * 100) / 100));
}

// ---------- Context shapes ----------

export interface ConceptCtx {
  id: string;
  name: string;
  order: number;
  score: number | null;
  tier: Tier | null;
  label: string;
}

export interface ChapterCtx {
  id: string;
  name: string;
  number: number;
  concepts: ConceptCtx[];
}

export interface SubjectCtx {
  id: string;
  name: string;
  chapters: ChapterCtx[];
}

export interface ProfileCtx {
  name: string;
  className: string;
  section: string;
  board: string;
  schoolName: string;
  tone: string;
  style: string;
  length: string;
  language: string;
  socratic: boolean;
  animations: boolean;
  sounds: boolean;
  focusSubjectId: string | null;
  focusChapterId: string | null;
  focusConceptId: string | null;
}

export interface NoteCtx {
  conceptName: string;
  title: string;
  sourceRef: string;
  content: string;
}

// ---------- Chat meta (parsed from the model's ```saathy block) ----------

export type ChatMode = 'chat' | 'explain' | 'solve' | 'practise' | 'summarise';

// Intent routing (server-side): when the student just types naturally, route the
// message to the right TASK MODE so the pedagogy matches the intent — the same
// Saathy, but the output UX always fits what was actually asked.
export function detectMode(content: string): ChatMode {
  const t = content.toLowerCase().trim();
  const has = (...words: string[]) => words.some((w) => t.includes(w));
  if (has('summarise', 'summarize', 'summary of', 'revise quickly', 'quick revision')) return 'summarise';
  if (has('practise', 'practice', 'quiz me', 'test me', 'give me questions', 'questions on', 'questions about', 'mcq')) return 'practise';
  if (has('solve', 'find the value', 'calculate', 'how much is', 'what is the value', 'evaluate', 'simplify', 'numerical', 'a car ', 'a train ', 'a ball ')) return 'solve';
  if (has('explain', 'what is', 'what are', 'why does', 'why is', 'how does', 'how do', 'difference between', 'define', 'meaning of', 'teach me', "i don't understand", 'i dont understand', 'confus', 'elaborate', 'samjha')) return 'explain';
  return 'chat';
}

export interface QuickCheck {
  concept: string;
  question: string;
  options: string[];
  answer: number;
  hint: string;
  hint2?: string;
  difficulty: 1 | 2 | 3;
}

export interface ChatMeta {
  mode?: ChatMode;
  followups?: string[];
  sources?: string[];
  quickcheck?: QuickCheck | null;
  focusConcept?: string | null;
}

// ---------- API payloads ----------

export interface ContextResponse {
  profile: ProfileCtx;
  subjects: SubjectCtx[];
}

export interface MasterySnapshot {
  conceptId: string;
  concept: string;
  score: number;
  tier: Tier;
  label: string;
}
