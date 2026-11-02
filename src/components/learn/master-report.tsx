"use client";
// MasterReport — the chapter's closing report card: what you did, what's weak,
// what's next. Looks like a checked school report: red-pen ticks, a grade
// stamp and Saathy cheering beside it.
import { useMemo } from "react";
import Link from "next/link";
import type { ChapterArtifacts } from "@/lib/learn/artifacts";
import { bookInfo, chaptersOf } from "@/lib/learn/artifacts";
import { Mascot } from "@/components/saathy/mascot";

export interface MasterStats {
  band: number | null;
  slidesViewed: number;
  quizBest: number;
  cardsKnown: number;
  xp: number;
  done: string[];
  weak: string[];
}

/* stat row — module-level so it isn't re-created every render */
function Row({ label, val, sub, tint }: { label: string; val: string; sub: string; tint: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-[#e8e2d2] bg-white/80 px-3.5 py-2.5">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[13px] font-extrabold" style={{ background: `${tint}1f`, color: tint }}>{val}</span>
      <span className="min-w-0">
        <span className="block text-[12.5px] font-extrabold text-[#16305b]">{label}</span>
        <span className="block truncate text-[11px] font-bold text-[#8a94a8]">{sub}</span>
      </span>
    </div>
  );
}

export function MasterReport({ chapter, stats, onClose }: { chapter: ChapterArtifacts; stats: MasterStats; onClose: () => void }) {
  const info = bookInfo(chapter.book);
  const chapters = useMemo(() => chaptersOf(chapter.book), [chapter.book]);
  const chIdx = chapters.findIndex(c => c.chapter === chapter.chapter);
  const nextCh = chIdx >= 0 && chIdx < chapters.length - 1 ? chapters[chIdx + 1] : null;

  const totalQuiz = chapter.quiz.length;
  const totalSlides = chapter.slides.length;
  const totalCards = chapter.flashcards.length;
  const stepsAll = ["explore", "learn", "solve", "try", "fix", "play", "master"];
  const stepsDone = stepsAll.filter(k => stats.done.includes(k)).length;

  // grade from quiz best + coverage
  const coverage = Math.round(((stats.slidesViewed / Math.max(1, totalSlides)) * 0.35 + (stats.quizBest / 100) * 0.5 + (stats.cardsKnown / Math.max(1, totalCards)) * 0.15) * 100);
  const grade = stats.quizBest >= 75 && coverage >= 70 ? "A" : stats.quizBest >= 50 || coverage >= 55 ? "B" : coverage >= 30 ? "C" : "D";
  const stampColor = grade === "A" ? "#3e7d4d" : grade === "B" ? "#2a5298" : grade === "C" ? "#b0552f" : "#c04a3a";
  const stampText = grade === "A" ? "Shabaash!" : grade === "B" ? "Solid!" : grade === "C" ? "Ho jayega!" : "Chalo phir se!";

  const weakTitles = (stats.weak ?? [])
    .map(sec => chapter.sections.find(s => s.id === sec)?.title)
    .filter(Boolean) as string[];

  return (
    <div className="fade-in fixed inset-0 z-50 flex items-start justify-center overflow-y-auto slide-stage px-4 py-8 sm:items-center">
      <div className="rise-in w-full max-w-2xl">
        <div className="relative rounded-3xl border border-[#e8e2d2] bg-[#fffdf6] px-5 py-6 shadow-[0_24px_54px_rgba(16,43,76,0.18)] sm:px-8">
          {/* report-card header ribbon in the book's colour */}
          <div className="absolute inset-x-0 top-0 h-2.5 rounded-t-3xl" style={{ background: info.cover }} aria-hidden />
          <div className="tape left-8 top-3 rotate-[-4deg]" aria-hidden />

          <div className="mt-3 flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="scribble text-[15px]">report card — checked by Saathy ✎</p>
              <h2 className="font-hand mt-0.5 text-[28px] font-bold leading-tight text-[#16305b] sm:text-[32px]">{chapter.title}</h2>
              <p className="text-[12px] font-bold text-[#637c96]">{info.name} · Grade {chapter.grade} · Ch {chapter.chapter}</p>
            </div>
            {/* grade stamp */}
            <div className="stamp shrink-0 text-center" style={{ borderColor: stampColor, color: stampColor }}>
              <span className="block font-hand text-[34px] font-bold leading-none">{grade}</span>
              <span className="block text-[9.5px] font-extrabold uppercase tracking-widest">{stampText}</span>
            </div>
          </div>

          {/* mascot verdict */}
          <div className="mt-4 flex items-center gap-3 rounded-2xl border border-[#e4e9f1] bg-[#f6fbff] px-4 py-3">
            <Mascot pose={grade === "A" ? "cheering" : grade === "B" ? "excited" : grade === "C" ? "wink" : "thinking"} size={46} />
            <p className="font-note text-[15px] leading-snug text-[#2b3a67]">
              {grade === "A" ? "Ekdum top! Is chapter pe ab tumhara pakka command hai."
                : grade === "B" ? "Achha kaam! Bas thoda quiz polish aur full marks tumhara hai."
                : grade === "C" ? "Base ban raha hai — flashcards + dobara quiz, phir dekho magic."
                : "Koi baat nahi — slides ek baar phir se, main saath hoon."}
            </p>
          </div>

          {/* stat rows */}
          <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            <Row label="Quiz best" val={stats.quizBest ? `${stats.quizBest}%` : "—"} sub={`${totalQuiz} questions the practice me`} tint="#2a5298" />
            <Row label="Slides dekhi" val={`${stats.slidesViewed}/${totalSlides}`} sub="Learn step se" tint="#3e7d4d" />
            <Row label="Flashcards" val={`${stats.cardsKnown}/${totalCards}`} sub={'"Fix" step se yaad pakka'} tint="#b0552f" />
            <Row label="Game XP" val={`${stats.xp}`} sub="Play station se" tint="#8a5aa8" />
          </div>

          {/* progress line */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-[11.5px] font-extrabold text-[#637c96]">
              <span>Flow progress</span><span>{stepsDone}/{stepsAll.length} steps</span>
            </div>
            <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-[#e8e2d2]">
              <div className="h-full rounded-full transition-all duration-700" style={{ width: `${(stepsDone / stepsAll.length) * 100}%`, background: info.cover }} />
            </div>
          </div>

          {/* weak areas */}
          {weakTitles.length > 0 && (
            <div className="mt-4 rounded-2xl border border-[#f3d9c4] bg-[#fff6ec] px-4 py-3">
              <p className="scribble text-[14.5px]">in sections pe ek nazar aur dalo:</p>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {weakTitles.map(t => (
                  <span key={t} className="rounded-full border border-[#f0dcc8] bg-white px-3 py-1 text-[11.5px] font-extrabold text-[#8a4a22]">{t}</span>
                ))}
              </div>
            </div>
          )}

          {/* actions */}
          <div className="mt-5 flex flex-wrap items-center gap-2.5 border-t border-[#e8e2d2] pt-4">
            {nextCh ? (
              <Link href={`/learn/${chapter.book}/${nextCh.chapter}`} className="press rounded-full bg-[#16305b] px-5 py-2.5 text-[13px] font-extrabold text-white shadow-[0_6px_16px_rgba(22,48,91,0.35)] hover:bg-[#214F78]">
                Agla chapter: Ch {nextCh.chapter} →
              </Link>
            ) : (
              <Link href="/learn" className="press rounded-full bg-[#16305b] px-5 py-2.5 text-[13px] font-extrabold text-white shadow-[0_6px_16px_rgba(22,48,91,0.35)] hover:bg-[#214F78]">Hub pe wapas →</Link>
            )}
            <button type="button" onClick={onClose} className="press rounded-full border-2 border-[#16305b] bg-white px-5 py-2 text-[13px] font-extrabold text-[#16305b] hover:bg-[#f2f7fd]">Report band karo</button>
            <span className="ml-auto hidden text-[11px] font-bold text-[#8a94a8] sm:block">coverage {coverage}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
