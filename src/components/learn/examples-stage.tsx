"use client";
// ExamplesStage — worked examples revealed line-by-line, like a teacher
// solving on the board. Tap "Agla step" to write the next line, then the
// final answer gets circled in red pen. Fully interactive, zero boredom.
import { useEffect, useMemo, useState } from "react";
import type { ChapterArtifacts } from "@/lib/learn/artifacts";
import { mathText } from "@/lib/learn/math-text";

export function ExamplesStage({ chapter, onDone, onExit, accent = "#b0552f" }: {
  chapter: ChapterArtifacts;
  onDone: (seen: number) => void;
  onExit: () => void;
  accent?: string;
}) {
  const exs = useMemo(() => chapter.examples, [chapter.examples]);
  const [i, setI] = useState(0);
  const [revealed, setRevealed] = useState(1); // steps shown so far
  const [showAns, setShowAns] = useState(false);
  // reset per-example state during render when the index changes (lint-safe)
  const [prevI, setPrevI] = useState(i);
  if (prevI !== i) { setPrevI(i); setRevealed(1); setShowAns(false); }

  if (exs.length === 0) {
    return (
      <OverlayShell title={`${chapter.title} — solved examples`} onExit={onExit} counter="">
        <div className="paper-sheet rounded-2xl px-6 py-10 text-center shadow-[0_18px_44px_rgba(16,43,76,0.14)]">
          <div className="paper-body !pl-0">
            <p className="font-hand text-[24px] font-bold text-[#16305b]">Is chapter me solved examples baad me judeinge</p>
            <p className="mt-1 text-[13px] font-bold text-[#637c96]">tab tak slides + quiz pe kaam karo.</p>
          </div>
        </div>
      </OverlayShell>
    );
  }

  const ex = exs[i];
  const allRevealed = revealed >= ex.steps.length;
  const next = () => {
    if (!allRevealed) setRevealed(r => r + 1);
    else if (!showAns) setShowAns(true);
    else if (i + 1 < exs.length) setI(i + 1);
    else onDone(exs.length);
  };

  return (
    <OverlayShell title={`${chapter.title} — solved examples`} onExit={onExit} counter={`${i + 1} / ${exs.length}`}>
      <div className="slide-glide w-full max-w-2xl" key={ex.id}>
        <div className="paper-sheet relative rounded-2xl px-5 py-6 shadow-[0_18px_44px_rgba(16,43,76,0.14)] sm:px-8">
          <div className="tape left-6 top-[-12px]" aria-hidden />
          <div className="page-curl" aria-hidden />
          <div className="paper-body">
            <p className="scribble text-[15px]">dekh, aise solve hota hai</p>
            <h2 className="font-hand mt-0.5 text-[26px] font-bold leading-tight text-[#16305b] sm:text-[30px]" dangerouslySetInnerHTML={{ __html: mathText(ex.title) }} />
            <p className="mt-2.5 rounded-xl border border-[#e4d9c8] bg-[#fffaf0] px-4 py-3 font-note text-[16.5px] font-semibold leading-relaxed text-[#2b3a67]">
              <span dangerouslySetInnerHTML={{ __html: mathText(ex.problem) }} />
            </p>

            {/* steps — each one "written" on the paper as you tap */}
            <ol className="mt-4 space-y-2">
              {ex.steps.slice(0, revealed).map((st, k) => (
                <li key={k} className="step-write flex items-start gap-2.5 font-note text-[15.5px] leading-[1.55] text-[#2b3a67]">
                  <span className="mt-[2px] flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 text-[12.5px] font-extrabold" style={{ borderColor: accent, color: accent, fontFamily: "var(--font-manrope)" }}>{k + 1}</span>
                  <span dangerouslySetInnerHTML={{ __html: mathText(st) }} />
                </li>
              ))}
            </ol>

            {/* final answer — circled in red pen */}
            {showAns && (
              <div className="rise-in mt-5 inline-flex items-center gap-2">
                <span className="rounded-lg px-4 py-2 font-hand text-[20px] font-bold text-[#16305b] ans-circle" dangerouslySetInnerHTML={{ __html: "Answer: " + mathText(ex.answer) }} />
              </div>
            )}

            <div className="mt-6 flex flex-wrap items-center gap-2.5">
              {!showAns ? (
                <button type="button" onClick={next} className="press rounded-full px-6 py-2.5 text-[13px] font-extrabold text-white shadow-[0_6px_16px_rgba(22,48,91,0.35)]" style={{ background: "#16305b" }}>
                  {allRevealed ? "Answer dikhao →" : `Agla step likho (${revealed}/${ex.steps.length}) →`}
                </button>
              ) : i + 1 < exs.length ? (
                <button type="button" onClick={next} className="press rounded-full bg-[#16305b] px-6 py-2.5 text-[13px] font-extrabold text-white shadow-[0_6px_16px_rgba(22,48,91,0.35)]">Agla example →</button>
              ) : (
                <button type="button" onClick={() => onDone(exs.length)} className="press rounded-full bg-[#16305b] px-6 py-2.5 text-[13px] font-extrabold text-white shadow-[0_6px_16px_rgba(22,48,91,0.35)]">Ho gaya — aage badho →</button>
              )}
              <div className="ml-auto flex items-center gap-1.5">
                {exs.map((e, k) => (
                  <button key={e.id} type="button" aria-label={`Example ${k + 1}`} onClick={() => setI(k)}
                    className={`h-2 rounded-full transition-all ${k === i ? "w-6" : "w-2"}`} style={{ background: k === i ? accent : k < i ? "#8fb6d9" : "#d8dde7" }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </OverlayShell>
  );
}

/** Shared full-screen overlay chrome for Examples / Master report. */
export function OverlayShell({ title, onExit, counter, children }: {
  title: string; onExit: () => void; counter: string; children: React.ReactNode;
}) {
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onExit(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onExit]);
  return (
    <div className="fade-in fixed inset-0 z-50 flex flex-col slide-stage">
      <div className="flex items-center justify-between gap-3 border-b border-[#e4e9f1] bg-white/80 px-4 py-2.5 backdrop-blur">
        <button type="button" onClick={onExit} className="press rounded-full border border-[#d8dde7] bg-white px-3.5 py-1.5 text-[12.5px] font-extrabold text-[#17324f] transition hover:bg-[#f2f7fd]">✕ Exit</button>
        <p className="min-w-0 flex-1 truncate text-center text-[12.5px] font-bold text-[#637c96]">{title}</p>
        <p className="shrink-0 rounded-full bg-[#eef4fb] px-3 py-1 text-[12px] font-extrabold text-[#2a5298]">{counter || "\u00a0"}</p>
      </div>
      <div className="flex min-h-0 flex-1 items-start justify-center overflow-y-auto px-4 py-6 sm:items-center">
        {children}
      </div>
    </div>
  );
}
