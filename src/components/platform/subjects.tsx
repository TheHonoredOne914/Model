"use client";

// My Subjects — real books, real chapters, live mastery from Learn progress.
import { useEffect, useState } from "react";
import { BookOpen, ChevronRight } from "lucide-react";
import { BOOKS, allChapters } from "@/lib/learn/artifacts";

export function Subjects({ openChapter }: { openChapter: (book: "gm" | "sc" | "us", chapter: number) => void }) {
  const [open, setOpen] = useState<string | null>("sc");
  const [pct, setPct] = useState<Record<string, number>>({});

  useEffect(() => {
    const id = window.setTimeout(() => {
      const chapters = allChapters();
      const out: Record<string, number> = {};
      for (const b of BOOKS) {
        const chs = chapters.filter(c => c.book === b.key);
        let sum = 0;
        for (const ch of chs) {
          try {
            const raw = localStorage.getItem(`saathy.learn.${b.key}.${ch.chapter}`);
            if (!raw) continue;
            const p = JSON.parse(raw) as { done?: boolean; slidesViewed?: string[] };
            if (p.done) sum += 100;
            else sum += Math.min(90, (p.slidesViewed?.length ?? 0) * 4);
          } catch { /* ignore */ }
        }
        out[b.key] = chs.length ? Math.min(100, Math.round(sum / chs.length)) : 0;
      }
      setPct(out);
    }, 0);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-[family-name:var(--font-hand)] text-3xl text-[#17324F]">My subjects</h1>
        <p className="text-sm text-[#637C96]">Three notebooks on your desk — every chapter a full learning module.</p>
      </div>
      {BOOKS.map(b => {
        const chs = allChapters().filter(c => c.book === b.key);
        const isOpen = open === b.key;
        return (
          <section key={b.key} className="overflow-hidden rounded-2xl border border-[#D8DDE7] bg-white shadow-[0_10px_30px_-22px_rgba(16,43,76,.4)]">
            <button
              onClick={() => setOpen(isOpen ? null : b.key)}
              className="flex w-full items-center gap-4 p-5 text-left transition hover:bg-[#FFF9F5]"
            >
              <div className="h-14 w-11 shrink-0 rounded-md shadow-[inset_0_0_0_2px_rgba(255,255,255,.25)]" style={{ background: b.cover }} aria-hidden />
              <div className="min-w-0 flex-1">
                <h3 className="text-base font-extrabold text-[#102B4C]">{b.name}</h3>
                <p className="truncate text-xs text-[#637C96]">{b.subject} · {chs.length} chapters · {b.blurb}</p>
                <div className="mt-2 h-2 max-w-56 overflow-hidden rounded-full bg-[#EDF2F7]">
                  <div className="h-full rounded-full bg-[#214F78] transition-all duration-700" style={{ width: `${Math.max(4, pct[b.key] ?? 0)}%` }} />
                </div>
              </div>
              <span className="text-xl font-extrabold" style={{ color: b.accent }}>{pct[b.key] ?? 0}%</span>
              <ChevronRight className={`h-5 w-5 text-[#637C96] transition-transform ${isOpen ? "rotate-90" : ""}`} />
            </button>
            {isOpen && (
              <div className="border-t border-[#EDF2F7] bg-[#FFFDF6] p-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2.5">
                {chs.map(ch => (
                  <button
                    key={ch.chapter}
                    onClick={() => openChapter(b.key, ch.chapter)}
                    className="group flex items-center gap-3 rounded-xl border border-[#D8DDE7] bg-white p-3 text-left transition hover:border-[#A9CEE8] hover:shadow-[0_8px_20px_-14px_rgba(16,43,76,.5)]"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#EFF6FC] text-[13px] font-extrabold text-[#214F78]">{ch.chapter}</span>
                    <span className="min-w-0">
                      <span className="block truncate text-[13px] font-bold text-[#17324F]">{ch.title}</span>
                      <span className="block text-[11px] text-[#637C96]">{ch.slides.length} slides · {ch.quiz.length} questions · {ch.flashcards.length} cards</span>
                    </span>
                    <BookOpen className="ml-auto h-4 w-4 shrink-0 text-[#A9CEE8] transition group-hover:text-[#214F78]" />
                  </button>
                ))}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}
