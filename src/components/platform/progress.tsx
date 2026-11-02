"use client";

// My Progress — mastery bands per book, XP, streak, weak concepts and the
// per-chapter ladder, all read from the real Learn progress store.
import { useEffect, useState } from "react";
import { Flame, TrendingUp, Trophy, Zap } from "lucide-react";
import { BOOKS, allChapters } from "@/lib/learn/artifacts";
import { getStreak, getXp, XP_EVENT } from "@/lib/saathy-progress";

interface LearnProg { band?: number; quizBest?: number; done?: boolean; slidesViewed?: string[]; weak?: string[] }

function readProg(book: string, ch: number): LearnProg {
  try { return JSON.parse(localStorage.getItem(`saathy.learn.${book}.${ch}`) ?? "{}") as LearnProg; } catch { return {}; }
}

const BAND_NAMES = ["", "Foundation", "Developing", "Proficient", "Mastery"];

export function ProgressScreen() {
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const r = () => { setXp(getXp()); setStreak(getStreak()); setTick(t => t + 1); };
    r();
    window.addEventListener(XP_EVENT, r);
    return () => window.removeEventListener(XP_EVENT, r);
  }, []);

  const chapters = allChapters();
  const level = Math.max(1, Math.floor(xp / 250) + 1);
  const levelPct = Math.round(((xp % 250) / 250) * 100);

  return (
    <div className="space-y-6" key={tick}>
      <div>
        <h1 className="font-[family-name:var(--font-hand)] text-3xl text-[#17324F]">My progress</h1>
        <p className="text-sm text-[#637C96]">Honest numbers only — updated as you learn, quiz and play.</p>
      </div>

      {/* level hero */}
      <section className="relative overflow-hidden rounded-2xl border border-[#D8DDE7] bg-gradient-to-br from-[#102B4C] to-[#214F78] p-6 text-white shadow-[0_16px_40px_-24px_rgba(16,43,76,.8)]">
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/10 shadow-[inset_0_0_0_1.5px_rgba(255,255,255,.25)]">
            <span className="text-2xl font-extrabold">L{level}</span>
          </div>
          <div className="min-w-40 flex-1">
            <p className="text-sm font-bold text-[#A9CEE8]">Level {level} learner · {xp} XP total</p>
            <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-white/15">
              <div className="h-full rounded-full bg-[#F6D5C6] transition-all duration-700" style={{ width: `${Math.max(4, levelPct)}%` }} />
            </div>
            <p className="mt-1.5 text-[11px] text-white/70">{250 - (xp % 250)} XP to level {level + 1}</p>
          </div>
          <div className="flex gap-4">
            <div className="rounded-xl bg-white/10 px-4 py-3 text-center">
              <p className="flex items-center gap-1 text-lg font-extrabold"><Flame className="h-4 w-4 text-[#F6D5C6]" />{streak}</p>
              <p className="text-[10px] font-bold uppercase tracking-wider text-white/70">day streak</p>
            </div>
            <div className="rounded-xl bg-white/10 px-4 py-3 text-center">
              <p className="flex items-center gap-1 text-lg font-extrabold"><Zap className="h-4 w-4 text-[#F6D5C6]" />{chapters.filter(c => readProg(c.book, c.chapter).done).length}</p>
              <p className="text-[10px] font-bold uppercase tracking-wider text-white/70">chapters done</p>
            </div>
          </div>
        </div>
      </section>

      {/* per-book ladders */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {BOOKS.map(b => {
          const chs = chapters.filter(c => c.book === b.key);
          const done = chs.filter(c => readProg(c.book, c.chapter).done).length;
          const avg = chs.length ? Math.round((done / chs.length) * 100) : 0;
          return (
            <section key={b.key} className="rounded-2xl border border-[#D8DDE7] bg-white p-5 shadow-[0_10px_30px_-22px_rgba(16,43,76,.4)]">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-extrabold text-[#102B4C]">{b.name}</h3>
                <TrendingUp className="h-4 w-4" style={{ color: b.accent }} />
              </div>
              <p className="mt-1 text-xs text-[#637C96]">{done}/{chs.length} chapters · {avg}% complete</p>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#EDF2F7]">
                <div className="h-full rounded-full transition-all duration-700" style={{ width: `${Math.max(4, avg)}%`, background: b.key === "gm" ? "#2a5298" : b.key === "sc" ? "#2a7a5f" : "#7a4a9e" }} />
              </div>
              <ul className="mt-4 space-y-2 max-h-64 overflow-y-auto pr-1 [scrollbar-width:thin]">
                {chs.map(c => {
                  const p = readProg(c.book, c.chapter);
                  const band = p.band ?? 0;
                  return (
                    <li key={c.chapter} className="flex items-center gap-2.5 rounded-lg bg-[#FFFDF6] px-2.5 py-2">
                      <span className="text-[11px] font-extrabold text-[#637C96] w-5">{c.chapter}</span>
                      <span className="min-w-0 flex-1 truncate text-[12px] font-bold text-[#17324F]">{c.title}</span>
                      {p.done
                        ? <span className="flex items-center gap-1 rounded-md bg-[#e3f2e6] px-1.5 py-0.5 text-[10px] font-extrabold text-[#2f7a44]"><Trophy className="h-3 w-3" /> done</span>
                        : band > 0
                          ? <span className="rounded-md bg-[#EFF6FC] px-1.5 py-0.5 text-[10px] font-extrabold text-[#214F78]">{BAND_NAMES[band] ?? `B${band}`}</span>
                          : <span className="rounded-md bg-[#F1F4F8] px-1.5 py-0.5 text-[10px] font-bold text-[#637C96]">not started</span>}
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
