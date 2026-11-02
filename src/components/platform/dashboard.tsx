"use client";

// Dashboard — "Namaste, Aarav" desk. Continue-learning card, subjects, the
// learning path, today's goals, teacher homework and the streak week.
import { useEffect, useState } from "react";
import {
  ArrowRight, BookOpen, CheckCircle2, Circle, Clock, Flame, Play,
  Sparkles, Target, Trophy,
} from "lucide-react";
import { allChapters } from "@/lib/learn/artifacts";
import { getXp, getStreak, XP_EVENT } from "@/lib/saathy-progress";
import {
  continueCard, getGoals, getHomework, getProfile, overdue, subjectRows, toggleGoal, emit,
} from "@/lib/platform/store";
import { addXp } from "@/lib/saathy-progress";
import { playChime } from "@/lib/platform/sound";
import type { Screen } from "./app-shell";

const DAY = ["S", "M", "T", "W", "T", "F", "S"];

export function Dashboard({ go, openChapter }: {
  go: (s: Screen) => void;
  openChapter: (book: "gm" | "sc" | "us", chapter: number) => void;
}) {
  const [, force] = useState(0);
  // name + continue card read localStorage → must resolve AFTER mount (SSR-safe,
  // otherwise the server HTML mismatches and React re-renders the whole tree)
  const [name, setName] = useState("Aarav");
  const [card, setCard] = useState<ReturnType<typeof continueCard>>(null);
  const [subjects, setSubjects] = useState<{ key: string; name: string; pct: number; chapters: number; accent: string }[]>([]);
  const [hw, setHw] = useState<ReturnType<typeof getHomework>>([]);
  const [goals, setGoals] = useState<ReturnType<typeof getGoals>>([]);
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);
  const [pathState, setPathState] = useState<Record<number, "done" | "now" | "next">>({});

  useEffect(() => {
    const refresh = () => {
      setSubjects(subjectRows());
      setHw(getHomework());
      setGoals(getGoals());
      setXp(getXp());
      setStreak(getStreak());
      setName(getProfile().name);
      setCard(continueCard());
      // path states from real learn progress
      const cCard = card ?? continueCard();
      const cb = cCard?.book ?? "sc";
      const cn = cCard?.chapter ?? 8;
      const ps: Record<number, "done" | "now" | "next"> = {};
      for (const ch of allChapters().filter(c => c.book === cb)) {
        try {
          const raw = localStorage.getItem(`saathy.learn.${cb}.${ch.chapter}`);
          const p = raw ? JSON.parse(raw) as { done?: boolean } : null;
          ps[ch.chapter] = p?.done ? "done" : ch.chapter === cn ? "now" : "next";
        } catch { ps[ch.chapter] = ch.chapter === cn ? "now" : "next"; }
      }
      setPathState(ps);
    };
    const id = window.setTimeout(refresh, 0);
    window.addEventListener(XP_EVENT, refresh);
    window.addEventListener("vs.platform", refresh);
    return () => { window.clearTimeout(id); window.removeEventListener(XP_EVENT, refresh); window.removeEventListener("vs.platform", refresh); };
  }, []);

  const late = overdue(hw);
  const todayIdx = new Date().getDay();

  /* learning path = a window around the continue chapter; states resolve after
     mount (localStorage is SSR-safe only in effects) */
  const allCh = allChapters();
  const contBook = card?.book ?? "sc";
  const contNo = card?.chapter ?? 8;
  const bookCh = allCh.filter(c => c.book === contBook);
  const contIdx = Math.max(0, bookCh.findIndex(c => c.chapter === contNo));
  const start = Math.max(0, Math.min(contIdx - 2, bookCh.length - 6));
  const chapters = bookCh.slice(start, start + 6);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-6">
      {/* ============ main column ============ */}
      <div className="space-y-6 min-w-0">
        {/* greeting */}
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <h1 className="font-[family-name:var(--font-hand)] text-4xl text-[#17324F] leading-tight">
              Namaste, {name}!
            </h1>
            <p suppressHydrationWarning className="text-sm text-[#637C96] mt-0.5">
              {new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" })}
              {"  ·  "}
              <span className="inline-flex items-center gap-1"><Flame className="h-3.5 w-3.5 text-[#e8825a]" />{streak}-day streak</span>
              {"  ·  "}
              <span className="inline-flex items-center gap-1"><Trophy className="h-3.5 w-3.5 text-[#c9a227]" />{xp} XP</span>
            </p>
          </div>
          <button
            onClick={() => go("saathy")}
            className="group inline-flex items-center gap-2 rounded-full bg-[#102B4C] px-4 py-2 text-sm font-semibold text-white shadow-[0_6px_16px_-6px_rgba(16,43,76,.5)] transition hover:bg-[#214F78]"
          >
            <Sparkles className="h-4 w-4 text-[#F6D5C6]" />
            Ask Saathy a doubt
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>

        {/* continue learning — notebook sheet with the formula doodle */}
        {card && (
          <section className="relative overflow-hidden rounded-2xl border border-[#D8DDE7] bg-white shadow-[0_10px_30px_-18px_rgba(16,43,76,.35)]">
            <div className="grid grid-cols-1 sm:grid-cols-[1fr_240px]">
              <div className="p-6">
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#637C96]">Continue learning</p>
                <h2 className="mt-1 text-xl font-extrabold text-[#102B4C]">
                  {card.subject} — {card.title}
                </h2>
                <p className="mt-1 text-sm text-[#637C96]">
                  Session 3 · diagnostic + slides · about {card.mins} min left
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <button
                    onClick={() => openChapter(card.book, card.chapter)}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#F6D5C6] px-5 py-2.5 text-sm font-bold text-[#17324F] shadow-[inset_0_0_0_1.5px_rgba(173,108,80,.35)] transition hover:bg-[#F3C6B2] active:scale-[.98]"
                  >
                    <Play className="h-4 w-4" /> Resume
                  </button>
                  <button
                    onClick={() => go("learn")}
                    className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-[#214F78] transition hover:bg-[#FBE9DF]"
                  >
                    <BookOpen className="h-4 w-4" /> All modules
                  </button>
                </div>
              </div>
              {/* formula doodle panel */}
              <div className="relative hidden sm:block border-l border-[#D8DDE7] bg-[#FFF9F5]">
                <div
                  className="absolute inset-0 opacity-[0.5]"
                  style={{ backgroundImage: "repeating-linear-gradient(to bottom, transparent 0 23px, #cfe0ee 23px 24px)" }}
                  aria-hidden
                />
                <div className="relative flex h-full flex-col items-center justify-center p-4">
                  <div className="font-[family-name:var(--font-hand)] text-3xl text-[#102B4C]">a = Δv / Δt</div>
                  <div className="mt-1 font-[family-name:var(--font-hand)] text-base text-[#637C96]">acceleration — ch. {card.chapter}</div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* subjects */}
        <section className="rounded-2xl border border-[#D8DDE7] bg-white p-6 shadow-[0_10px_30px_-22px_rgba(16,43,76,.4)]">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-[#102B4C]">My subjects</h3>
            <button onClick={() => go("subjects")} className="text-xs font-bold text-[#214F78] hover:underline">see all</button>
          </div>
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
            {subjects.map(s => (
              <button
                key={s.key}
                onClick={() => go("subjects")}
                className="group rounded-xl border border-[#D8DDE7] bg-[#FFFDF6] p-3 text-left transition hover:border-[#A9CEE8] hover:shadow-[0_8px_20px_-14px_rgba(16,43,76,.5)]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-[#17324F]">{s.name}</span>
                  <span className="text-xs font-extrabold" style={{ color: s.accent }}>{s.pct}%</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#EDF2F7]">
                  <div className="h-full rounded-full transition-all duration-700" style={{ width: `${Math.max(4, s.pct)}%`, background: s.accent }} />
                </div>
                <p className="mt-1.5 text-[11px] text-[#637C96]">{s.chapters} chapters</p>
              </button>
            ))}
          </div>
        </section>

        {/* learning path */}
        <section className="rounded-2xl border border-[#D8DDE7] bg-white p-6 shadow-[0_10px_30px_-22px_rgba(16,43,76,.4)]">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-[#102B4C]">Learning path — {card?.subject ?? "Science"}</h3>
            <button onClick={() => openChapter(card?.book ?? "sc", card?.chapter ?? 8)} className="text-xs font-bold text-[#214F78] hover:underline">open module</button>
          </div>
          <div className="mt-4 flex items-stretch gap-2 overflow-x-auto pb-1">
            {chapters.map(ch => {
              const st = pathState[ch.chapter] ?? "next";
              return (
                <div key={`${ch.book}-${ch.chapter}`} className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => openChapter(ch.book, ch.chapter)}
                    className={`w-40 rounded-xl border p-3 text-left transition hover:shadow-[0_8px_20px_-14px_rgba(16,43,76,.5)] ${
                      st === "now" ? "border-[#214F78] bg-[#EFF6FC]" : "border-[#D8DDE7] bg-[#FFFDF6]"
                    }`}
                  >
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#637C96]">Ch {ch.chapter}</p>
                    <p className="mt-0.5 line-clamp-2 text-sm font-bold text-[#17324F]">{ch.title}</p>
                    <p className={`mt-1.5 text-[11px] font-semibold ${st === "now" ? "text-[#214F78]" : "text-[#637C96]"}`}>
                      {st === "done" ? "completed" : st === "now" ? "learning now" : "up next"}
                    </p>
                  </button>
                  <div className="h-px w-3 bg-[#A9CEE8]" aria-hidden />
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* ============ right rail ============ */}
      <div className="space-y-5 min-w-0">
        {/* goals */}
        <section className="paper-sheet rounded-2xl border border-[#D8DDE7] p-5 shadow-[0_10px_30px_-22px_rgba(16,43,76,.4)]">
          <h3 className="flex items-center gap-2 text-sm font-extrabold text-[#102B4C]">
            <Target className="h-4 w-4 text-[#214F78]" /> Today&apos;s goals
            <span className="ml-auto text-xs font-bold text-[#637C96]">{goals.filter(g => g.done).length}/{goals.length}</span>
          </h3>
          <ul className="paper-body mt-3 space-y-2.5">
            {goals.map(g => (
              <li key={g.id}>
                <button
                  className="flex w-full items-start gap-2.5 text-left group"
                  onClick={() => { toggleGoal(g.id); if (!g.done) { addXp(g.xp); playChime(); } else { emit(); } }}
                >
                  {g.done
                    ? <CheckCircle2 className="mt-0.5 h-4.5 w-4.5 h-[18px] w-[18px] shrink-0 text-[#5fae6f]" />
                    : <Circle className="mt-0.5 h-[18px] w-[18px] shrink-0 text-[#A9CEE8] transition group-hover:text-[#214F78]" />}
                  <span className={`text-[13px] leading-snug ${g.done ? "text-[#637C96] line-through" : "text-[#17324F] font-medium"}`}>
                    {g.label}
                    <span className="ml-1.5 text-[11px] font-bold text-[#c9a227]">+{g.xp} XP</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </section>

        {/* teacher homework */}
        <section className="rounded-2xl border border-[#D8DDE7] bg-white p-5 shadow-[0_10px_30px_-22px_rgba(16,43,76,.4)]">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-[#102B4C]">Teacher&apos;s homework</h3>
            <button onClick={() => go("homework")} className="text-xs font-bold text-[#214F78] hover:underline">all</button>
          </div>
          <ul className="mt-3 space-y-2.5">
            {hw.slice(0, 3).map(h => {
              const isLate = late.some(l => l.id === h.id);
              return (
                <li key={h.id}>
                  <button onClick={() => go("homework")} className="w-full rounded-xl border border-[#D8DDE7] bg-[#FFFDF6] p-3 text-left transition hover:border-[#A9CEE8]">
                    <div className="flex items-center gap-2">
                      <span className="rounded-md bg-[#EFF6FC] px-1.5 py-0.5 text-[10px] font-extrabold text-[#214F78]">{h.subject}</span>
                      {isLate && <span className="rounded-md bg-[#F6D5C6] px-1.5 py-0.5 text-[10px] font-extrabold text-[#a0522d]">OVERDUE</span>}
                      {h.status === "done" && <span className="rounded-md bg-[#e3f2e6] px-1.5 py-0.5 text-[10px] font-extrabold text-[#2f7a44]">DONE</span>}
                    </div>
                    <p className="mt-1.5 text-[13px] font-bold leading-snug text-[#17324F]">{h.title}</p>
                    <p className="mt-0.5 flex items-center gap-1 text-[11px] text-[#637C96]">
                      <Clock className="h-3 w-3" /> due {new Date(h.due).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                    </p>
                  </button>
                </li>
              );
            })}
          </ul>
        </section>

        {/* streak week */}
        <section className="rounded-2xl border border-[#D8DDE7] bg-white p-5 shadow-[0_10px_30px_-22px_rgba(16,43,76,.4)]">
          <h3 className="flex items-center gap-2 text-sm font-extrabold text-[#102B4C]">
            <Flame className="h-4 w-4 text-[#e8825a]" /> This week
            <span className="ml-auto text-xs font-bold text-[#637C96]">{streak}-day streak</span>
          </h3>
          <div className="mt-3 grid grid-cols-7 gap-1.5">
            {DAY.map((d, i) => {
              const active = i <= todayIdx && (i === todayIdx ? streak > 0 : streak > todayIdx - i);
              return (
                <div key={i} className="flex flex-col items-center gap-1">
                  <div className={`h-8 w-8 rounded-full border text-center text-[11px] font-bold leading-8 ${
                    active ? "border-[#e8825a] bg-[#F6D5C6] text-[#a0522d]" : "border-[#D8DDE7] text-[#637C96]"
                  }`}>{d}</div>
                </div>
              );
            })}
          </div>
          <p className="mt-2 text-[11px] text-[#637C96]">Study any 5 minutes today to keep the flame alive.</p>
        </section>
      </div>
    </div>
  );
}
