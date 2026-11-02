// VidhyaSaathy platform store — homework, goals, notifications, game scores,
// profile and settings. localStorage-backed (same spirit as saathy-progress).
// Mastery numbers are read live from the real Learn progress (saathy.learn.*).

import { allChapters, BOOKS } from "@/lib/learn/artifacts";

const K = {
  hw: "vs.homework.v1",
  goals: "vs.goals.v1",
  notes: "vs.notifications.v1",
  games: "vs.games.v1",
  profile: "vs.profile.v1",
};

export interface HomeworkItem {
  id: string;
  subject: string;
  bookKey: "gm" | "sc" | "us";
  chapter: number;
  title: string;
  detail: string;
  assigned: string;   // ISO date
  due: string;        // ISO date
  status: "todo" | "done";
  xp: number;
}

export interface Goal { id: string; label: string; done: boolean; xp: number }

export interface Notification {
  id: string;
  kind: "homework" | "streak" | "tip" | "game";
  title: string;
  body: string;
  t: number;
  read: boolean;
}

export interface GameScore { best: number; plays: number }

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch { return fallback; }
}
function write(key: string, v: unknown) {
  try { localStorage.setItem(key, JSON.stringify(v)); } catch { /* ignore */ }
}
export function emit() {
  if (typeof window !== "undefined") window.dispatchEvent(new CustomEvent("vs.platform"));
}

/* ---------------- profile ---------------- */
export interface Profile { name: string; klass: string; roll: string }
const DEFAULT_PROFILE: Profile = { name: "Aarav", klass: "Class 9 · A", roll: "Roll no. 1" };

export function getProfile(): Profile {
  return { ...DEFAULT_PROFILE, ...read<Partial<Profile>>(K.profile, {}) };
}
export function saveProfile(p: Profile) { write(K.profile, p); emit(); }

/* ---------------- homework ---------------- */
function iso(offsetDays: number): string {
  const d = new Date(Date.now() + offsetDays * 86400000);
  return d.toISOString().slice(0, 10);
}

export function defaultHomework(): HomeworkItem[] {
  return [
    { id: "hw-motion-diag", subject: "Physics", bookKey: "sc", chapter: 8, title: "Motion — diagnostic set", detail: "10 questions on distance–time and velocity–time graphs.", assigned: iso(-6), due: iso(-1), status: "todo", xp: 40 },
    { id: "hw-atom-chem", subject: "Chemistry", bookKey: "sc", chapter: 3, title: "Atoms & Molecules — practice sheet", detail: "Valency table + 8 numericals on molecular mass.", assigned: iso(-5), due: iso(0), status: "todo", xp: 35 },
    { id: "hw-linear-math", subject: "Maths", bookKey: "gm", chapter: 2, title: "Linear Equations — word problems", detail: "Age, money and tanki-fill problems (Q1–Q12).", assigned: iso(-2), due: iso(2), status: "todo", xp: 30 },
    { id: "hw-climate-sst", subject: "SST", bookKey: "us", chapter: 4, title: "Climate — mapping task", detail: "Mark monsoon wind routes on the India outline.", assigned: iso(-1), due: iso(4), status: "todo", xp: 25 },
  ];
}

export function getHomework(): HomeworkItem[] {
  const cur = read<HomeworkItem[]>(K.hw, []);
  if (!cur.length) { const d = defaultHomework(); write(K.hw, d); return d; }
  return cur;
}
export function setHwDone(id: string, done: boolean) {
  const hw = getHomework().map(h => h.id === id ? { ...h, status: done ? "done" as const : "todo" as const } : h);
  write(K.hw, hw); emit();
}
export function overdue(hw: HomeworkItem[]): HomeworkItem[] {
  const t = new Date().toISOString().slice(0, 10);
  return hw.filter(h => h.status === "todo" && h.due < t);
}

/* ---------------- goals ---------------- */
const DEFAULT_GOALS: Goal[] = [
  { id: "g1", label: "Finish today's Learn session", done: false, xp: 20 },
  { id: "g2", label: "Attempt 10 practice questions", done: false, xp: 15 },
  { id: "g3", label: "Ask Saathy one doubt", done: false, xp: 10 },
];
export function getGoals(): Goal[] {
  const cur = read<Goal[]>(K.goals, []);
  if (!cur.length) { write(K.goals, DEFAULT_GOALS); return DEFAULT_GOALS; }
  return cur;
}
export function toggleGoal(id: string) {
  const g = getGoals().map(x => x.id === id ? { ...x, done: !x.done } : x);
  write(K.goals, g); emit();
}

/* ---------------- notifications ---------------- */
const DEFAULT_NOTES: Notification[] = [
  { id: "n1", kind: "homework", title: "Motion diagnostic is overdue", body: "Physics · due yesterday. 10 questions, ~14 min.", t: Date.now() - 86400000, read: false },
  { id: "n2", kind: "homework", title: "New: Atoms & Molecules sheet", body: "Chemistry · assigned by teacher, due today.", t: Date.now() - 43200000, read: false },
  { id: "n3", kind: "tip", title: "Saathy made you a flowchart", body: "Motion chapter — open Learn to see the new diagram.", t: Date.now() - 3600000, read: false },
];
export function getNotifications(): Notification[] {
  const cur = read<Notification[]>(K.notes, []);
  if (!cur.length) { write(K.notes, DEFAULT_NOTES); return DEFAULT_NOTES; }
  return cur;
}
export function markAllRead() {
  write(K.notes, getNotifications().map(n => ({ ...n, read: true }))); emit();
}
export function markRead(id: string) {
  write(K.notes, getNotifications().map(n => n.id === id ? { ...n, read: true } : n)); emit();
}

/* ---------------- games ---------------- */
export function getGameScores(): Record<string, GameScore> {
  return read<Record<string, GameScore>>(K.games, {});
}
export function recordGame(key: string, score: number) {
  const all = getGameScores();
  const cur = all[key] ?? { best: 0, plays: 0 };
  all[key] = { best: Math.max(cur.best, score), plays: cur.plays + 1 };
  write(K.games, all); emit();
}

/* ---------------- subjects (real mastery from Learn progress) ---------------- */
export interface SubjectRow { key: string; name: string; pct: number; chapters: number; accent: string }

export function subjectRows(): SubjectRow[] {
  const chapters = allChapters();
  const rows: SubjectRow[] = [];
  for (const b of BOOKS) {
    const chs = chapters.filter(c => c.book === b.key);
    let sum = 0;
    for (const ch of chs) {
      try {
        const raw = localStorage.getItem(`saathy.learn.${b.key}.${ch.chapter}`);
        if (!raw) continue;
        const p = JSON.parse(raw) as { done?: boolean; slidesViewed?: string[]; quizBest?: number };
        if (p.done) sum += 100; else sum += Math.min(90, (p.slidesViewed?.length ?? 0) * 4 + (p.quizBest ?? 0) / 2);
      } catch { /* ignore */ }
    }
    rows.push({
      key: b.key,
      name: b.subject,
      pct: chs.length ? Math.min(100, Math.round(sum / chs.length)) : 0,
      chapters: chs.length,
      accent: b.key === "gm" ? "#2a5298" : b.key === "sc" ? "#2a7a5f" : "#7a4a9e",
    });
  }
  return rows;
}

/* ---------------- continue-learning ---------------- */
export interface ContinueCard { book: "gm" | "sc" | "us"; chapter: number; title: string; subject: string; mins: number }

export function continueCard(): ContinueCard | null {
  try {
    let best: { book: "gm" | "sc" | "us"; chapter: number; t: number } | null = null;
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (!k || !k.startsWith("saathy.learn.") || k.endsWith(".ts")) continue;
      const ts = localStorage.getItem(`${k}.ts`);
      if (!ts) continue;
      const t = Number(ts) || 0;
      if (!best || t > best.t) {
        const [, , bk, ch] = k.split(".");
        best = { book: bk as "gm" | "sc" | "us", chapter: Number(ch), t };
      }
    }
    if (!best) return { book: "sc", chapter: 8, title: "Motion", subject: "Science", mins: 14 };
    const ch = allChapters().find(c => c.book === best!.book && c.chapter === best!.chapter);
    const b = BOOKS.find(x => x.key === best!.book);
    return { book: best.book, chapter: best.chapter, title: ch?.title ?? `Chapter ${best.chapter}`, subject: b?.subject ?? "Science", mins: 14 };
  } catch { return { book: "sc", chapter: 8, title: "Motion", subject: "Science", mins: 14 }; }
}
