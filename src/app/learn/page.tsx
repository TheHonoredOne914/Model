// /learn — the module hub: three books, every chapter a notebook cover on the desk.
import Link from "next/link";
import { Layers, MessageSquare } from "lucide-react";
import { BOOKS, chaptersOf, artifactStats } from "@/lib/learn/artifacts";
import { ContinueStrip } from "@/components/learn/continue-strip";
import { BookShelf } from "@/components/learn/book-shelf";

export const metadata = {
  title: "Learn — VidhyaSaathy modules | Saathy",
  description: "Every chapter as a full learning flow: slides, examples, quiz, flashcards, games, reports.",
};

export default function LearnHub() {
  const stats = artifactStats();
  return (
    <main className="mod-learn notebook-desk min-h-screen">
      {/* desk header — a notebook cover with spiral binding */}
      <div className="relative overflow-hidden bg-[#102b4c] text-white">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#214F78] opacity-60 blur-2xl" aria-hidden />
        <div className="pointer-events-none absolute -bottom-32 left-1/4 h-64 w-64 rounded-full bg-[#2a5298] opacity-40 blur-3xl" aria-hidden />
        {/* spiral rings along the bottom edge of the cover */}
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
        <div className="relative mx-auto max-w-6xl px-4 py-10 sm:py-14">
          <div className="flex flex-wrap items-center gap-2">
            <Link href="/" className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-[12px] font-extrabold text-white backdrop-blur transition hover:bg-white/20">
              <MessageSquare className="h-3.5 w-3.5" /> Saathy chat
            </Link>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3.5 py-1.5 text-[12px] font-extrabold text-[#dff0ff] backdrop-blur">
              <Layers className="h-3.5 w-3.5" /> Learn module
            </span>
          </div>
          <h1 className="font-hand mt-4 text-[40px] font-bold leading-none sm:text-[54px]">Learning, in flow.</h1>
          <p className="mt-2 max-w-xl text-[14.5px] font-semibold leading-relaxed text-[#cfe0f2]">
            Har chapter ka poora module — level check, slides se samajh, examples se dekh, quiz se test, flashcards se pakka, games me score, aur last me seedhi report.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {[
              `${stats.slides} slides`,
              `${stats.cards} flashcards`,
              `${stats.quiz} quiz questions`,
              `${stats.examples} solved examples`,
              `${stats.maps} concept maps`,
              `${stats.flows} flowcharts`,
            ].map(t => (
              <span key={t} className="rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-[12px] font-extrabold text-[#dff0ff] backdrop-blur">{t}</span>
            ))}
            <span className="rounded-full bg-[#F6D5C6] px-3.5 py-1.5 text-[12px] font-extrabold text-[#7a3a12]">{stats.total} artifacts total</span>
          </div>
        </div>
      </div>

      {/* books — spread on the study desk */}
      <div className="min-h-[60vh]">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <ContinueStrip />
          {BOOKS.map(book => (
            <BookShelf key={book.key} book={book} chapters={chaptersOf(book.key)} />
          ))}
        </div>
      </div>
    </main>
  );
}
