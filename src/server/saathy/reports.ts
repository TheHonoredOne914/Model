// Saathy reports — parent daily summary + teacher weakness heatmap.
// All numbers come from REAL stored evidence (EvidenceRecord, MasteryState,
// LearningPlan checkpoints). Never invented; empty state says so honestly.
import { db } from "@/lib/db";

export interface ParentReport {
  student: string;
  className: string;
  date: string;
  streak: number;
  questionsToday: number;
  accuracyToday: number | null;
  totalXp: number;
  xpNote: string;
  strong: string[];
  weak: string[];
  planMoves: string[];
  line: string;
}

export interface TeacherCell {
  concept: string;
  chapter: string;
  subject: string;
  attempts: number;
  accuracy: number; // 0..1, -1 when no data
  band: number; // 0..3 internal
  flag: "ok" | "watch" | "weak" | "no-evidence";
}

function bandOf(score: number): number {
  const pct = score * 100;
  if (pct < 25) return 0;
  if (pct < 50) return 1;
  if (pct < 75) return 2;
  return 3;
}

export async function parentReport(): Promise<ParentReport> {
  const profile = await db.studentProfile.findUnique({ where: { id: "main" } });
  const now = new Date();
  const dayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const [todayEvidence, allEvidence, concepts, plans] = await Promise.all([
    db.evidenceRecord.findMany({ where: { createdAt: { gte: dayStart } }, include: { concept: true } }),
    db.evidenceRecord.findMany({ include: { concept: { include: { chapter: true } } }, orderBy: { createdAt: "desc" } }),
    db.concept.findMany({ include: { mastery: true, chapter: true } }),
    db.learningPlan.findMany({ orderBy: { updatedAt: "desc" }, take: 3 }),
  ]);

  // streak: consecutive days (including today) with >=1 evidence
  const days = new Set(allEvidence.map((e) => e.createdAt.toDateString()));
  let streak = 0;
  for (let i = 0; i < 60; i++) {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i).toDateString();
    if (days.has(d)) streak++;
    else if (i > 0 || !days.has(d)) break;
  }

  const questionsToday = todayEvidence.length;
  const correctToday = todayEvidence.filter((e) => e.correct).length;
  const accuracyToday = questionsToday ? correctToday / questionsToday : null;

  // strong/weak from recent evidence (last 50)
  const perConcept = new Map<string, { c: number; a: number; name: string }>();
  for (const e of allEvidence.slice(0, 50)) {
    const k = e.conceptId;
    const cur = perConcept.get(k) ?? { c: 0, a: 0, name: e.concept.name };
    cur.a++; if (e.correct) cur.c++;
    perConcept.set(k, cur);
  }
  const rated = [...perConcept.values()].filter((x) => x.a >= 2);
  const strong = rated.filter((x) => x.c / x.a >= 0.7).sort((a, b) => b.c / b.a - a.c / a.a).slice(0, 3).map((x) => x.name);
  const weak = rated.filter((x) => x.c / x.a < 0.5).sort((a, b) => a.c / a.a - b.c / b.a).slice(0, 3).map((x) => x.name);

  const totalXp = Math.min(999, allEvidence.length * 5 + streak * 10);
  const planMoves = plans.map((p) => {
    const steps = JSON.parse(p.steps) as Array<{ title: string; status: string }>;
    const done = steps.filter((s) => s.status === "done").length;
    return `${p.title}: ${done}/${steps.length} steps done${done < steps.length ? ` — next: ${steps[done]?.title ?? "review"}` : " — plan complete"}`;
  });

  const line = questionsToday === 0
    ? `${profile?.name ?? "Learner"} hasn't answered anything today yet — a 5-minute plan session would get the streak moving.`
    : `${profile?.name ?? "Learner"} answered ${questionsToday} question${questionsToday > 1 ? "s" : ""} today with ${Math.round((accuracyToday ?? 0) * 100)}% accuracy and a ${streak}-day streak.`;

  return {
    student: profile?.name ?? "Learner",
    className: profile?.className ?? "Class 9",
    date: now.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" }),
    streak, questionsToday, accuracyToday, totalXp, xpNote: `XP ${totalXp} — grows with every honest attempt`,
    strong, weak, planMoves, line,
  };
}

export async function teacherReport(): Promise<{ className: string; generated: string; cells: TeacherCell[]; summary: string }> {
  const [profile, concepts] = await Promise.all([
    db.studentProfile.findUnique({ where: { id: "main" } }),
    db.concept.findMany({ include: { mastery: true, chapter: { include: { subject: true } }, evidences: true } }),
  ]);

  const cells: TeacherCell[] = concepts.map((c) => {
    const attempts = c.evidences.length;
    const correct = c.evidences.filter((e) => e.correct).length;
    const acc = attempts ? correct / attempts : -1;
    const score = c.mastery?.score ?? 0.5;
    const band = bandOf(score);
    const flag: TeacherCell["flag"] = attempts < 2 ? "no-evidence" : acc >= 0.7 ? "ok" : acc >= 0.5 ? "watch" : "weak";
    return { concept: c.name, chapter: c.chapter.name, subject: c.chapter.subject.name, attempts, accuracy: acc, band, flag };
  });

  const weak = cells.filter((c) => c.flag === "weak");
  const noEv = cells.filter((c) => c.flag === "no-evidence").length;
  const summary = weak.length
    ? `${weak.length} concept${weak.length > 1 ? "s" : ""} need re-teaching: ${weak.slice(0, 4).map((w) => w.concept).join(", ")}. ${noEv} concepts have no evidence yet — give them a level check.`
    : `No weak concepts from evidence so far (${noEv} without data). Run a chapter quiz to build the heatmap.`;

  cells.sort((a, b) => (a.flag === "weak" ? -1 : 1) - (b.flag === "weak" ? -1 : 1) || a.accuracy - b.accuracy);
  return { className: profile?.className ?? "Class 9", generated: new Date().toISOString(), cells, summary };
}
