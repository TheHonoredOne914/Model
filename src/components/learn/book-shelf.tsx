"use client";
// BookShelf — the learn hub's book sections. Each book keeps its own identity:
// themed shelf header, subject doodles, and chapter cards with a live progress
// bar (read from localStorage saathy.learn.*) so returning students see
// exactly how far each chapter has travelled.
import { useEffect, useState } from "react";
import Link from "next/link";
import type { BookInfo, ChapterArtifacts } from "@/lib/learn/artifacts";

const TOTAL_STEPS = 7; // explore…master

// hand-drawn subject doodles — tiny inline SVGs, no emoji
function SubjectDoodle({ subject, accent }: { subject: string; accent: string }) {
  if (subject === "Mathematics") return (
    <svg viewBox="0 0 40 40" className="h-9 w-9" aria-hidden><path d="M6,34 L20,6 L34,34 Z" fill="none" stroke={accent} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="4 3.4" /><path d="M12,27 L28,27" stroke={accent} strokeWidth="2.4" strokeLinecap="round" /></svg>
  );
  if (subject === "Science") return (
    <svg viewBox="0 0 40 40" className="h-9 w-9" aria-hidden><path d="M16,6 L16,16 L8,31 Q6,35 10,35 L30,35 Q34,35 32,31 L24,16 L24,6" fill="none" stroke={accent} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="4 3.4" /><path d="M13,25 L27,25" stroke={accent} strokeWidth="2.4" strokeLinecap="round" /></svg>
  );
  return (
    <svg viewBox="0 0 40 40" className="h-9 w-9" aria-hidden><circle cx="20" cy="20" r="13" fill="none" stroke={accent} strokeWidth="2.4" strokeDasharray="4 3.4" /><path d="M7,20 L33,20 M20,7 Q27,20 20,33 Q13,20 20,7" fill="none" stroke={accent} strokeWidth="2" strokeLinecap="round" /></svg>
  );
}

interface ChapterProgress { pct: number; quizBest: number }

function readProgress(book: string, ch: number): ChapterProgress | null {
  try {
    const raw = localStorage.getItem(`saathy.learn.${book}.${ch}`);
    if (!raw) return null;
    const p = JSON.parse(raw) as { done?: string[]; quizBest?: number };
    const done = p.done?.length ?? 0;
    if (done === 0 && !p.quizBest) return null;
    return { pct: Math.round((done / TOTAL_STEPS) * 100), quizBest: p.quizBest ?? 0 };
  } catch { return null; }
}

export function BookShelf({ book, chapters }: { book: BookInfo; chapters: ChapterArtifacts[] }) {
  const [prog, setProg] = useState<Record<number, ChapterProgress | null>>({});

  useEffect(() => {
    let alive = true;
    (async () => {
      await Promise.resolve();
      if (!alive) return;
      const next: Record<number, ChapterProgress | null> = {};
      for (const c of chapters) next[c.chapter] = readProgress(book.key, c.chapter);
      setProg(next);
    })();
    return () => { alive = false; };
  }, [book.key, chapters]);

  const accent = book.key === "gm" ? "#2a5298" : book.key === "sc" ? "#2a7a5f" : "#7a4a9e";

  return (
    <section className="sway-in mb-12" style={{ animationDelay: "60ms" }}>
      {/* shelf header — book spine + subject doodle */}
      <div className="mb-4 flex items-center gap-3">
        <div className="h-12 w-9 shrink-0 rounded-r-md rounded-l-sm shadow-[0_6px_14px_rgba(16,43,76,0.25)]" style={{ background: book.cover, borderLeft: "4px solid rgba(255,255,255,0.35)" }} aria-hidden />
        <div className="min-w-0 flex-1">
          <h2 className="truncate text-[19px] font-extrabold leading-tight text-[#16305b]">{book.name}</h2>
          <p className="truncate text-[12.5px] font-bold text-[#637c96]">{book.subject} · {chapters.length} chapters · {book.blurb}</p>
        </div>
        <div className="shrink-0 rounded-xl border border-[#e8e2d2] bg-white/70 px-2 py-1 opacity-80"><SubjectDoodle subject={book.subject} accent={accent} /></div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {chapters.map((c, i) => {
          const p = prog[c.chapter];
          const complete = !!p && p.pct >= 100;
          return (
            <Link key={c.chapter} href={`/learn/${book.key}/${c.chapter}`}
              className="press rise-in group relative overflow-hidden rounded-2xl border border-[#e4e9f1] bg-white p-4 shadow-[0_4px_14px_rgba(16,43,76,0.06)] transition-all duration-200 hover:-translate-y-1.5 hover:border-[#c9d9ea] hover:shadow-[0_18px_34px_rgba(16,43,76,0.15)]"
              style={{ animationDelay: `${Math.min(i * 45, 400)}ms` }}>
              <div className="absolute right-0 top-0 h-10 w-10 rounded-bl-2xl transition-all group-hover:h-12 group-hover:w-12" style={{ background: book.cover, opacity: 0.92 }} aria-hidden>
                <span className="absolute right-2 top-1.5 font-hand text-[15px] font-bold text-white">{c.chapter}</span>
              </div>
              <div className="tape tape-sm left-6 top-2" aria-hidden />
              <p className="scribble text-[13px]">{book.subject}</p>
              <h3 className="mt-0.5 line-clamp-2 min-h-[42px] text-[14px] font-extrabold leading-snug text-[#16305b]">{c.title}</h3>
              <div className="mt-2.5 flex flex-wrap gap-1.5 text-[10.5px] font-extrabold text-[#637c96]">
                <span className="rounded-full bg-[#eef4fb] px-2 py-0.5">{c.slides.length} slides</span>
                <span className="rounded-full bg-[#fff3ea] px-2 py-0.5">{c.flashcards.length} cards</span>
                <span className="rounded-full bg-[#eef8f0] px-2 py-0.5">{c.quiz.length} quiz</span>
              </div>

              {/* live progress — only when the chapter has been opened before */}
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#edf1f7]">
                <div className="h-full rounded-full transition-all duration-700" style={{ width: `${p?.pct ?? 0}%`, background: complete ? "#5fae6f" : book.key === "gm" ? "#2a5298" : book.key === "sc" ? "#2a7a5f" : "#7a4a9e" }} />
              </div>
              <p className="mt-2 flex items-center justify-between text-[11.5px] font-extrabold" style={{ color: accent }}>
                {complete ? <span className="flex items-center gap-1 text-[#3e7d4d]">✓ Master ho gaya</span>
                  : p ? <span>{p.pct}% ho gaya — jari rakho</span>
                  : <span className="opacity-60 transition group-hover:translate-x-0.5 group-hover:opacity-100">Kholo → flow shuru</span>}
                {p && p.quizBest > 0 && <span className="text-[#8a94a8]">quiz {p.quizBest}%</span>}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
