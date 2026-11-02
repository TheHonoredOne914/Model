"use client";

// Sessions — the Learn module hub embedded in the platform shell.
import { Layers } from "lucide-react";
import { BOOKS, artifactStats, chaptersOf } from "@/lib/learn/artifacts";
import { ContinueStrip } from "@/components/learn/continue-strip";
import { BookShelf } from "@/components/learn/book-shelf";
import { playPageFlip } from "@/lib/platform/sound";

export function Sessions() {
  const stats = artifactStats();
  return (
    <div className="space-y-6">
      {/* notebook cover band */}
      <div className="relative overflow-hidden rounded-2xl bg-[#102B4C] px-6 py-7 text-white shadow-[0_16px_40px_-24px_rgba(16,43,76,.8)]">
        <div
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-[14px] opacity-40"
          style={{
            backgroundImage: "radial-gradient(circle 4.5px at 50% 50%, transparent 2.6px, rgba(255,255,255,0.75) 3.4px, transparent 4.2px)",
            backgroundSize: "30px 14px",
            backgroundRepeat: "repeat-x",
            backgroundPosition: "15px 0",
          }}
          aria-hidden
        />
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[11px] font-extrabold text-[#dff0ff]">
            <Layers className="h-3.5 w-3.5" /> Learn module
          </span>
        </div>
        <h1 className="font-[family-name:var(--font-hand)] mt-3 text-4xl leading-none">Learning, in flow.</h1>
        <p className="mt-2 max-w-xl text-[13.5px] font-semibold leading-relaxed text-[#cfe0f2]">
          Har chapter ka poora module — level check, slides se samajh, examples se dekh, quiz se test, flashcards se pakka, games me score, aur seedhi report.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {[
            `${stats.slides} slides`,
            `${stats.cards} flashcards`,
            `${stats.quiz} quiz questions`,
            `${stats.examples} examples`,
            `${stats.maps} concept maps`,
            `${stats.flows} flowcharts`,
          ].map(t => (
            <span key={t} className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-extrabold text-[#dff0ff]">{t}</span>
          ))}
        </div>
      </div>

      <ContinueStrip />
      {BOOKS.map(book => (
        <BookShelf key={book.key} book={book} chapters={chaptersOf(book.key)} />
      ))}
      <button onClick={() => playPageFlip()} className="sr-only" aria-hidden tabIndex={-1} />
    </div>
  );
}
