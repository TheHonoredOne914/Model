// Context retrieval (AI-02 boundary): assembles everything Saathy knows about
// the student right now. In the future VidhyaSaathy app this module is the only
// file that needs to swap — e.g. replace keyword matching with real RAG over
// the school's published material. Nothing else in the engine changes.
import { db } from '@/lib/db';
import { tierFor, TIERS, type ConceptCtx, type NoteCtx, type ProfileCtx, type SubjectCtx, type Tier } from '@/lib/saathy-types';

export async function loadProfile(): Promise<ProfileCtx> {
  const p = await db.studentProfile.findUnique({ where: { id: 'main' } });
  if (!p) throw new Error('Student profile missing');
  return {
    name: p.name,
    className: p.className,
    section: p.section,
    board: p.board,
    schoolName: p.schoolName,
    tone: p.tone,
    style: p.style,
    length: p.length,
    language: p.language,
    socratic: p.socratic,
    animations: p.animations,
    sounds: p.sounds,
    focusSubjectId: p.focusSubjectId,
    focusChapterId: p.focusChapterId,
    focusConceptId: p.focusConceptId,
  };
}

export async function loadSubjects(): Promise<SubjectCtx[]> {
  const subjects = await db.subject.findMany({
    orderBy: { order: 'asc' },
    include: {
      chapters: {
        orderBy: { order: 'asc' },
        include: {
          concepts: {
            orderBy: { order: 'asc' },
            include: { mastery: true },
          },
        },
      },
    },
  });

  return subjects.map((s) => ({
    id: s.id,
    name: s.name,
    chapters: s.chapters.map((ch) => ({
      id: ch.id,
      name: ch.name,
      number: ch.number,
      concepts: ch.concepts.map(
        (c): ConceptCtx => ({
          id: c.id,
          name: c.name,
          order: c.order,
          score: c.mastery?.score ?? null,
          tier: c.mastery ? tierFor(c.mastery.score) : null,
          label: c.mastery ? TIERS[tierFor(c.mastery.score)].label : 'Not started',
        })
      ),
    })),
  }));
}

export interface ConceptHit {
  conceptId: string;
  conceptName: string;
  tier: Tier | null;
  score: number | null;
  chapterName: string;
  subjectName: string;
}

// Keyword alias table — the AI-02 retrieval seam. Swap with embeddings/RAG later.
const ALIASES: Record<string, string[]> = {
  'Distance and Displacement': ['distance', 'displacement', 'scalar', 'vector path'],
  'Speed and Velocity': ['speed', 'velocity', 'average speed', 'uniform motion'],
  Acceleration: ['acceleration', 'accelerate', 'retardation', 'deceleration', 'a = (v - u)'],
  'Equations of Motion': ['equation of motion', 'equations of motion', 'v = u + at', 'v^2', 's = ut', 'second equation', 'third equation'],
  'Graphs of Motion': ['graph', 'distance-time', 'velocity-time', 'slope', 'area under'],
  'The Cartesian Plane': ['cartesian', 'x-axis', 'y-axis', 'origin', 'abscissa', 'ordinate', 'coordinate plane'],
  'Plotting Points': ['plot', 'plotting', 'ordered pair'],
  'Quadrants and Signs': ['quadrant', 'signs of coordinates'],
};

export function matchConcepts(message: string, subjects: SubjectCtx[]): ConceptHit[] {
  const msg = message.toLowerCase();
  const hits: ConceptHit[] = [];
  for (const s of subjects) {
    for (const ch of s.chapters) {
      for (const c of ch.concepts) {
        const keys = ALIASES[c.name] ?? [c.name.toLowerCase()];
        if (keys.some((k) => msg.includes(k))) {
          hits.push({
            conceptId: c.id,
            conceptName: c.name,
            tier: c.tier,
            score: c.score,
            chapterName: ch.name,
            subjectName: s.name,
          });
        }
      }
    }
  }
  return hits;
}

export async function loadNotes(conceptIds: string[]): Promise<NoteCtx[]> {
  if (conceptIds.length === 0) return [];
  const notes = await db.teacherNote.findMany({
    where: { conceptId: { in: conceptIds }, published: true },
    include: { concept: { include: { chapter: true } } },
  });
  return notes.map((n) => ({
    conceptName: n.concept.name,
    title: n.title,
    sourceRef: n.sourceRef,
    content: n.content,
  }));
}

export async function loadConceptsByIds(ids: string[]) {
  if (ids.length === 0) return [];
  return db.concept.findMany({
    where: { id: { in: ids } },
    include: { mastery: true, chapter: { include: { subject: true } } },
  });
}

export async function loadRecentMessages(conversationId: string, limit = 16) {
  const rows = await db.message.findMany({
    where: { conversationId },
    orderBy: { createdAt: 'desc' },
    take: limit,
  });
  return rows.reverse().map((m) => ({ role: m.role as 'user' | 'assistant', content: m.content }));
}
