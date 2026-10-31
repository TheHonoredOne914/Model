// Saathy plan engine — builds the structured VidhyaSaathy learning loop:
//   level check (Setu) → concept slides (Guru) → chapter quiz (Quiz Master)
//   → game (Game Master) → flashcards (Flash Guru) → report (Reporter)
// Every step is owned by an agent, carries a checkpoint, and uses ONLY in-app
// content (book KB + concept tree) so the plan works fully offline.
import { searchBook } from "./books";
import { matchVideos, watchUrl } from "@/data/videos";

export interface PlanStep {
  id: string;
  title: string;
  agent: string;
  agentRole: string;
  kind: "diag" | "slides" | "quiz" | "game" | "flash" | "report";
  status: "pending" | "active" | "done";
  payload?: Record<string, unknown>;
}

export interface BuiltPlan {
  book: string;
  chapterNumber: number;
  title: string;
  band: number;
  steps: PlanStep[];
  checkpoint: Record<string, { score?: number; weak?: string[]; at: string }>;
}

const AGENTS: Record<PlanStep["kind"], { name: string; role: string }> = {
  diag: { name: "Setu", role: "Diagnostic Agent" },
  slides: { name: "Guru", role: "Tutor Agent" },
  quiz: { name: "Quiz Master", role: "Practice Agent" },
  game: { name: "Game Master", role: "Play Agent" },
  flash: { name: "Flash Guru", role: "Revision Agent" },
  report: { name: "Reporter", role: "Family Link Agent" },
};

function keyTerms(text: string, n = 8): string[] {
  const stop = new Set(["this", "that", "with", "from", "they", "have", "will", "your", "each", "which", "their", "said", "many", "some", "them", "then", "than", "when", "what", "these", "those", "because", "about", "into", "only", "also", "such", "give", "case", "most"]);
  const freq = new Map<string, number>();
  for (const w of text.toLowerCase().replace(/[^a-z0-9 ]/g, " ").split(/\s+/)) {
    if (w.length < 4 || stop.has(w)) continue;
    freq.set(w, (freq.get(w) ?? 0) + 1);
  }
  return [...freq.entries()].sort((a, b) => b[1] - a[1]).slice(0, n).map(([w]) => w);
}

function sentences(text: string): string[] {
  return text.split(/(?<=[.!?])\s+/).map((s) => s.trim()).filter((s) => s.length > 40);
}

function buildQuiz(chunks: { sourceRef: string; text: string }[], title: string, n = 5) {
  const qs: Array<{ q: string; options: string[]; answer: number; why: string; difficulty: 1 | 2 | 3 }> = [];
  const allSentences = chunks.flatMap((c) => sentences(c.text)).filter((s) => !s.includes("?"));
  const used = new Set<string>();
  for (const s of allSentences) {
    if (qs.length >= n) break;
    const terms = keyTerms(s, 4);
    if (!terms.length) continue;
    const blank = terms[0];
    if (used.has(blank)) continue;
    used.add(blank);
    const i = s.toLowerCase().lastIndexOf(blank);
    if (i === -1) continue;
    const surface = s.slice(i, i + blank.length);
    if (!surface) continue;
    const distractors = keyTerms(allSentences.filter((x) => x !== s).join(" "), 12)
      .filter((d) => d !== blank).slice(0, 6);
    if (distractors.length < 3) continue;
    const options = [blank, ...distractors.slice(0, 3)].sort(() => Math.random() - 0.5);
    qs.push({
      q: s.replace(surface, "______").replace(/\s+/g, " "),
      options,
      answer: options.indexOf(blank),
      why: `From ${title} — the passage states this directly.`,
      difficulty: 2,
    });
  }
  return qs;
}

function buildFlashcards(chunks: { sourceRef: string; text: string }[]) {
  const terms = keyTerms(chunks.map((c) => c.text).join(" "), 10);
  return terms.map((t) => {
    const holder = chunks.map((c) => ({ c, s: sentences(c.text).find((s) => s.toLowerCase().includes(t)) }))
      .find((x) => x.s);
    return {
      front: t.charAt(0).toUpperCase() + t.slice(1),
      back: holder?.s ? holder.s.slice(0, 220) : `Revise this term from ${chunks[0]?.sourceRef ?? "the chapter"}.`,
      src: holder?.c.sourceRef ?? "",
    };
  });
}

export function buildPlan(book: string, chapterNumber: number, title: string, band = 1): BuiltPlan {
  // Resolve the real KB chapter number from the title search. Source refs show
  // DISPLAY numbers, and the book name is in the ref itself — map accordingly.
  const probe = searchBook(title, { limit: 6 });
  let useNumber = chapterNumber;
  if (!useNumber && probe.length) {
    const m = probe[0].sourceRef.match(/^(.+?) G\d+(?: P\d+)? · Ch (\d+)/);
    if (m) {
      const display = Number(m[2]);
      const bookName = m[1];
      useNumber = /Exploration|Science/i.test(bookName)
        ? display + 200
        : /Understanding|Society/i.test(bookName)
          ? display + 100
          : display;
    }
  }
  const chunks = useNumber ? searchBook(title, { chapterNumber: useNumber, limit: 8 }) : probe;
  const quiz = buildQuiz(chunks, title);
  const cards = buildFlashcards(chunks);
  const vids = matchVideos(title, { limit: 1 })[0];
  const slideSections = chunks.slice(0, 5).map((c) => ({ heading: c.sourceRef, lines: sentences(c.text).slice(0, 3) }));

  const steps: PlanStep[] = [
    { id: "diag", title: "Level check", agent: AGENTS.diag.name, agentRole: AGENTS.diag.role, kind: "diag", status: "active",
      payload: { note: "3 tiny questions route you to a band 0-3. Not a test — a compass." } },
    { id: "slides", title: "Concept slides", agent: AGENTS.slides.name, agentRole: AGENTS.slides.role, kind: "slides", status: "pending",
      payload: { sections: slideSections, video: vids ? { concept: vids.concept, url: watchUrl(vids.primary.vid), author: vids.primary.author } : null } },
    { id: "quiz", title: "Chapter quiz", agent: AGENTS.quiz.name, agentRole: AGENTS.quiz.role, kind: "quiz", status: "pending",
      payload: { questions: quiz } },
    { id: "game", title: "Game station", agent: AGENTS.game.name, agentRole: AGENTS.game.role, kind: "game", status: "pending",
      payload: { suggestions: ["MCQ Rush (60s streak)", "Match the Concept", "Boss Level — beat it at 70%+"] } },
    { id: "flash", title: "Flashcards", agent: AGENTS.flash.name, agentRole: AGENTS.flash.role, kind: "flash", status: "pending",
      payload: { cards } },
    { id: "report", title: "Report & next move", agent: AGENTS.report.name, agentRole: AGENTS.report.role, kind: "report", status: "pending",
      payload: { note: "Parent daily summary + teacher heatmap update from this plan's checkpoints." } },
  ];

  return { book, chapterNumber, title, band, steps, checkpoint: {} };
}

/** One-line summary for the chat prompt so Saathy can hand the student the plan. */
export function planSummaryLine(p: BuiltPlan): string {
  return `Plan "${p.title}": ` + p.steps.map((s, i) => `${i + 1}. ${s.title} (${s.agent})`).join(" → ");
}
