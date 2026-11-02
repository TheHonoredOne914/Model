"use client";

import { DATA, chapterStat, readiness, type Progress } from "@/lib/revision";
import { Html, ProgressBar, Chip } from "./atoms";
import { Target, Flame, MoonStar, ChevronRight, RotateCcw, BookOpen, Zap } from "lucide-react";
import { useState } from "react";

/* Mission 80/80 home — a revision planner page taped to the desk.
   Identity: peach (mod-revision), index cards, sticky notes, handwriting. */
export function Home({
  progress,
  onOpenChapter,
  onOpenPower,
  onReset,
  profileName,
}: {
  progress: Progress;
  onOpenChapter: (num: number) => void;
  onOpenPower: () => void;
  onReset: () => void;
  profileName?: string | null;
}) {
  const [planOpen, setPlanOpen] = useState(false);
  const ready = readiness(DATA.chapters, progress);
  const firstName = (profileName ?? "").split(" ")[0] || null;

  // most-weak chapter = lowest overall, shown as the "start here" suggestion
  const weakest = DATA.chapters
    .map((ch) => ({ ch, s: chapterStat(ch, progress) }))
    .sort((a, b) => a.s.overallPct - b.s.overallPct)[0];

  return (
    <div className="mx-auto w-full max-w-lg px-4 pb-32 pt-5 sm:max-w-2xl">
      {/* mission cover page */}
      <div className="rise-in relative paper-sheet dog-ear rounded-2xl px-5 py-6 shadow-[0_14px_34px_rgba(16,43,76,0.13)] sm:px-7">
        <div className="tape tape-pink left-6 top-[-12px]" aria-hidden />
        <div className="paper-body">
          <div className="flex items-center justify-between gap-2">
            <Chip className="rotate-[-1.5deg] text-[#b0552f]">
              <Target className="h-3.5 w-3.5" /> Mission
            </Chip>
            <span className="font-hand text-[13.5px] font-bold text-[#637c96]">Ganita Manjari · Gr 9</span>
          </div>
          <div className="mt-3 flex items-end gap-3">
            <span className="font-hand text-[64px] font-bold leading-none text-[#16305b]">
              80<span className="text-[30px] text-[#637c96]">/80</span>
            </span>
            <span className="pb-1.5 font-note text-[13px] font-semibold leading-snug text-[#5a6b8c]">
              Final Revision ·<br className="hidden sm:block" /> ek ek concept, ek time pe
            </span>
          </div>
          <div className="mt-5">
            <div className="mb-1.5 flex items-center justify-between text-[12px]">
              <span className="flex items-center gap-1 font-extrabold text-[#16305b]">
                <Flame className="h-3.5 w-3.5 text-[#e5762f]" /> Readiness meter
              </span>
              <span className="font-hand text-[15px] font-bold text-[#b0552f]">{ready}%</span>
            </div>
            <ProgressBar value={ready} className="h-2.5" barClass="bg-[#b0552f]" />
            <p className="mt-2 font-note text-[12.5px] leading-relaxed text-[#5a6b8c]">
              Concepts padho + IMP questions solve karo + MCQs maaro — meter khud bharta jayega.{" "}
              {ready >= 80
                ? "Tum exam ke liye ready ho, ab sirf revision!"
                : ready >= 30
                ? "Shuruat solid hai, aise hi chalte raho."
                : "Aaj raat 3 rounds ke saath poora syllabus cover karo."}
            </p>
          </div>
          {firstName && (
            <p className="mt-3 font-hand text-[16px] font-bold text-[#2a5298]">
              Chalo {firstName}, aaj thoda aur paas le jayein ✎
            </p>
          )}
        </div>
      </div>

      {/* start-here sticky note — personalisation: weakest chapter first */}
      {weakest && weakest.s.overallPct < 100 && (
        <button
          type="button"
          onClick={() => onOpenChapter(weakest.ch.num)}
          className="sway-in sticky-note sticky-sky mt-4 flex w-full -rotate-[0.7deg] items-center gap-3 p-4 text-left"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/70 text-[#2a5298]">
            <Zap className="h-5 w-5" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block font-hand text-[15.5px] font-bold leading-tight text-[#16305b]">
              Aaj yahan se shuru karo — Ch {weakest.ch.num}: {weakest.ch.short}
            </span>
            <span className="mt-0.5 block text-[11.5px] font-bold text-[#5a6b8c]">
              sabse kam ready ({weakest.s.overallPct}%) — thoda dhyan isi pe
            </span>
          </span>
          <ChevronRight className="h-5 w-5 shrink-0 text-[#2a5298]" />
        </button>
      )}

      {/* night plan — a folded note */}
      <button
        type="button"
        onClick={() => setPlanOpen((o) => !o)}
        className="press mt-4 flex w-full items-center justify-between rounded-2xl border border-[#e4d9c8] bg-[#fffaf0] p-4 text-left transition-colors hover:border-[#d9c8ab]"
      >
        <span className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f3e8fb] text-[#7a4a9e]">
            <MoonStar className="h-5 w-5" />
          </span>
          <span>
            <span className="block text-[13.5px] font-extrabold text-[#16305b]">Aaj raat ka plan · 3 rounds</span>
            <span className="block text-[11.5px] font-bold text-[#8a94a8]">~2 ghante mein poora syllabus</span>
          </span>
        </span>
        <ChevronRight
          className={`h-5 w-5 text-[#8a94a8] transition-transform ${planOpen ? "rotate-90" : ""}`}
        />
      </button>
      {planOpen && (
        <div className="rise-in mt-2 space-y-2 rounded-2xl border border-[#e4d9c8] bg-[#fffaf0] p-4">
          {DATA.plan.rounds.map((r, i) => (
            <div key={i} className="paper-lite rounded-xl p-3">
              <p className="font-hand text-[14.5px] font-bold uppercase tracking-wide text-[#b0552f]">
                {r.round}
              </p>
              <p className="mt-0.5 font-note text-[13.5px] font-semibold text-[#16305b]">
                <Html html={r.do} />
              </p>
              <p className="mt-1 font-note text-[12px] leading-relaxed text-[#5a6b8c]">
                <Html html={r.goal} />
              </p>
            </div>
          ))}
          <div className="rounded-xl border border-[#f3d9c4] bg-[#fff6ec] p-3">
            <p className="font-hand text-[14.5px] font-bold uppercase tracking-wide text-[#b0552f]">
              Golden rule
            </p>
            <p className="mt-1 font-note text-[12.5px] leading-relaxed text-[#7a4a22]">
              <Html html={DATA.plan.golden} />
            </p>
          </div>
        </div>
      )}

      {/* chapters — index cards pinned to the desk */}
      <h2 className="mb-3 mt-7 px-1 font-hand text-[17px] font-bold text-[#16305b]">
        Chapters · {DATA.chapters.length} total
      </h2>
      <div className="space-y-3">
        {DATA.chapters.map((ch, i) => {
          const s = chapterStat(ch, progress);
          return (
            <button
              key={ch.num}
              onClick={() => onOpenChapter(ch.num)}
              style={{ animationDelay: `${i * 45}ms` }}
              className="rise-in press group relative w-full overflow-hidden rounded-2xl border border-[#e4d9c8] bg-white p-4 text-left shadow-[0_3px_12px_rgba(16,43,76,0.07)] transition-all hover:-translate-y-0.5 hover:border-[#d9c8ab] hover:shadow-[0_12px_26px_rgba(16,43,76,0.13)]"
            >
              <div className="tape tape-sm left-5 top-1.5 opacity-70" aria-hidden />
              <div className="flex items-start gap-3">
                <div
                  className={`flex h-11 w-11 shrink-0 flex-col items-center justify-center rounded-xl font-hand text-[20px] font-bold shadow-[0_2px_6px_rgba(16,43,76,0.12)] ${
                    ch.star
                      ? "bg-[#f0b490] text-[#7a3a12]"
                      : "bg-[#eef4fb] text-[#2a5298]"
                  }`}
                >
                  {ch.num}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate text-[13.5px] font-extrabold text-[#16305b]">{ch.short}</p>
                    {ch.star && (
                      <Chip className="shrink-0 text-[#b0552f]">★ Most imp</Chip>
                    )}
                  </div>
                  <div className="mt-2 grid grid-cols-3 gap-2 font-note text-[10px] font-bold uppercase tracking-wide text-[#8a94a8]">
                    <div>
                      <p className="mb-1">Learn</p>
                      <ProgressBar value={s.learnPct} barClass="bg-[#5fae6f]" />
                    </div>
                    <div>
                      <p className="mb-1">IMP Qs</p>
                      <ProgressBar value={s.impPct} barClass="bg-[#a86bc9]" />
                    </div>
                    <div>
                      <p className="mb-1">
                        MCQ {s.mcqCorrect}/{s.mcqTotal}
                      </p>
                      <ProgressBar value={s.mcqAccPct} barClass="bg-[#e5762f]" />
                    </div>
                  </div>
                </div>
                <ChevronRight className="mt-3 h-5 w-5 shrink-0 text-[#b3bdcf] transition-transform group-hover:translate-x-0.5 group-hover:text-[#b0552f]" />
              </div>
            </button>
          );
        })}
      </div>

      {/* power page — the lucky pen card */}
      <button
        type="button"
        onClick={onOpenPower}
        className="mod-card mod-revision mt-5 flex w-full items-center gap-3 rounded-2xl border-2 border-dashed border-[#f0b490] bg-[#fff6ec] p-4 text-left"
      >
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#fff1e7] text-[#b0552f]">
          <MoonStar className="h-5 w-5" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[13.5px] font-extrabold text-[#16305b]">Exam Morning Power Page</span>
          <span className="block text-[11.5px] font-bold text-[#8a94a8]">
            12 killer formulas + 8 hall rules — subah sirf ye dekho
          </span>
        </span>
        <span className="mod-goto font-hand text-[13.5px] font-bold text-[#b0552f]">kholo →</span>
      </button>

      {/* back to the other modules */}
      <div className="mt-5 grid grid-cols-2 gap-3">
        <a href="/" className="mod-card mod-chat flex items-center gap-2.5 rounded-2xl border border-[#d8e6f4] bg-[#f3f9ff] p-3.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-[#2a5298] shadow-[0_1px_4px_rgba(16,43,76,0.10)]">
            <Target className="h-4.5 w-4.5" />
          </span>
          <span className="min-w-0">
            <span className="block text-[12.5px] font-extrabold text-[#16305b]">Saathy chat</span>
            <span className="block truncate text-[10.5px] font-bold text-[#8a94a8]">poochho jo samajh na aaye</span>
          </span>
        </a>
        <a href="/learn" className="mod-card mod-learn flex items-center gap-2.5 rounded-2xl border border-[#cfe8d6] bg-[#f0faf3] p-3.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-[#3e7d4d] shadow-[0_1px_4px_rgba(16,43,76,0.10)]">
            <BookOpen className="h-4.5 w-4.5" />
          </span>
          <span className="min-w-0">
            <span className="block text-[12.5px] font-extrabold text-[#16305b]">Learn modules</span>
            <span className="block truncate text-[10.5px] font-bold text-[#8a94a8]">slides · quiz · games</span>
          </span>
        </a>
      </div>

      {/* reset */}
      <button
        type="button"
        onClick={() => {
          if (window.confirm("Sara progress reset ho jayega. Pakka?")) onReset();
        }}
        className="mx-auto mt-8 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-bold text-[#b3bdcf] transition-colors hover:text-[#d96a4a]"
      >
        <RotateCcw className="h-3.5 w-3.5" /> Progress reset
      </button>
    </div>
  );
}
