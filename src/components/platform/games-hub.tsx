"use client";

// Games — the four real Saathy games wired to every chapter, with live best
// scores. Featured card recommends a game for the chapter you're learning.
import { useEffect, useMemo, useState } from "react";
import { Flame, Play, Puzzle, SquareStack, Trophy, Zap } from "lucide-react";
import { BOOKS, allChapters, type ChapterArtifacts } from "@/lib/learn/artifacts";
import { GameHub } from "@/components/learn/games";
import { continueCard, getGameScores } from "@/lib/platform/store";
import { playFlick } from "@/lib/platform/sound";

const GAME_META = [
  { key: "mcq", name: "MCQ Rush", desc: "60 seconds. Kitne sahi? Best score save.", icon: Zap, tint: "#FBE9DF" },
  { key: "match", name: "Match the Concept", desc: "Term ko uske matlab se milao — kam flips me.", icon: Puzzle, tint: "#EFF6FC" },
  { key: "streak", name: "True / False Streak", desc: "Statement sahi ya galat? Streak banao.", icon: Flame, tint: "#FFF5ED" },
  { key: "tiles", name: "Tile Flip", desc: "Cards palat kar jodi dhoondo.", icon: SquareStack, tint: "#F6FBFF" },
] as const;

export function GamesScreen() {
  const chapters = useMemo(() => allChapters(), []);
  const cont = continueCard();
  const [book, setBook] = useState<"gm" | "sc" | "us">(cont?.book ?? "sc");
  const [chapterNo, setChapterNo] = useState<number>(cont?.chapter ?? 8);
  const [active, setActive] = useState<"hub" | "play">("hub");
  const [scores, setScores] = useState<Record<string, { best: number; plays: number }>>({});

  const chapter: ChapterArtifacts | undefined =
    chapters.find(c => c.book === book && c.chapter === chapterNo);

  const refreshScores = () => setScores(getGameScores());

  useEffect(() => {
    const id = window.setTimeout(refreshScores, 0);
    window.addEventListener("vs.platform", refreshScores);
    return () => { window.clearTimeout(id); window.removeEventListener("vs.platform", refreshScores); };
  }, []);

  useEffect(() => {
    const id = window.setTimeout(() => { setBook(cont?.book ?? "sc"); setChapterNo(cont?.chapter ?? 8); }, 0);
    return () => window.clearTimeout(id);
  }, [cont?.book, cont?.chapter]);

  if (active === "play" && chapter) {
    return (
      <div className="space-y-4">
        <button
          onClick={() => { setActive("hub"); playFlick(); }}
          className="text-sm font-bold text-[#214F78] hover:underline"
        >
          &larr; Back to games
        </button>
        <div className="notebook-desk overflow-hidden rounded-2xl border border-[#D8DDE7] bg-white shadow-[0_16px_40px_-26px_rgba(16,43,76,.5)]">
          <div
            className="h-2.5 w-full"
            style={{ background: book === "gm" ? "#2a5298" : book === "sc" ? "#2a7a5f" : "#7a4a9e" }}
            aria-hidden
          />
          <div className="mx-auto w-full max-w-3xl px-4 py-6 sm:px-6">
            <GameHub
              chapter={chapter}
              onExit={() => setActive("hub")}
              onXp={() => { /* GameHub banks XP itself */ }}
              accent={book === "gm" ? "#2a5298" : book === "sc" ? "#2a7a5f" : "#7a4a9e"}
              inline
            />
          </div>
        </div>
      </div>
    );
  }

  const chs = chapters.filter(c => c.book === book);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-[family-name:var(--font-hand)] text-3xl text-[#17324F]">Games</h1>
        <p className="text-sm text-[#637C96]">Har game real chapter content pe — jeeto, XP kamao, mastery badhao.</p>
      </div>

      {/* featured */}
      {chapter && (
        <section className="relative overflow-hidden rounded-2xl border border-[#D8DDE7] bg-gradient-to-br from-[#102B4C] to-[#214F78] p-6 text-white shadow-[0_16px_40px_-24px_rgba(16,43,76,.8)]">
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#A9CEE8] opacity-20 blur-2xl" aria-hidden />
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#A9CEE8]">Today&apos;s challenge</p>
          <h2 className="mt-1 text-xl font-extrabold">Cricket Lab — {chapter.title}</h2>
          <p className="mt-1 max-w-xl text-sm text-white/80">
            Bowl the MCQ Rush on {BOOKS.find(b => b.key === book)?.subject} ch. {chapter.chapter} — 60 seconds, har ball ek question.
          </p>
          <button
            onClick={() => { setActive("play"); playFlick(); }}
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#F6D5C6] px-5 py-2.5 text-sm font-bold text-[#17324F] transition hover:bg-[#f3c6b2] active:scale-[.98]"
          >
            <Play className="h-4 w-4" /> Play now
          </button>
        </section>
      )}

      {/* game cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {GAME_META.map(g => {
          const s = scores[`${g.key}.${book}${chapterNo}`] ?? getGameScores()[`${g.key}.${book}${chapterNo}`];
          const Icon = g.icon;
          return (
            <button
              key={g.key}
              onClick={() => { setActive("play"); playFlick(); }}
              className="group rounded-2xl border border-[#D8DDE7] bg-white p-5 text-left shadow-[0_10px_30px_-22px_rgba(16,43,76,.4)] transition hover:-translate-y-0.5 hover:border-[#A9CEE8] hover:shadow-[0_14px_30px_-18px_rgba(16,43,76,.5)]"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl shadow-[inset_0_0_0_1.5px_#d7e6f6] transition group-hover:scale-110 group-hover:-rotate-6" style={{ background: g.tint, color: "#2a5298" }}>
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-3 text-sm font-extrabold text-[#102B4C]">{g.name}</h3>
              <p className="mt-1 text-xs leading-relaxed text-[#637C96]">{g.desc}</p>
              <p className="mt-3 flex items-center gap-1 text-[11px] font-extrabold text-[#c9a227]">
                <Trophy className="h-3 w-3" /> best {s?.best ?? 0} · {s?.plays ?? 0} plays
              </p>
            </button>
          );
        })}
      </div>

      {/* chapter picker */}
      <section className="rounded-2xl border border-[#D8DDE7] bg-white p-5 shadow-[0_10px_30px_-22px_rgba(16,43,76,.4)]">
        <h3 className="text-sm font-extrabold text-[#102B4C]">Choose your pitch</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {BOOKS.map(b => (
            <button
              key={b.key}
              onClick={() => { setBook(b.key); setChapterNo(chapters.find(c => c.book === b.key)?.chapter ?? 1); playFlick(); }}
              className={`rounded-full px-3.5 py-1.5 text-xs font-extrabold transition ${
                book === b.key ? "bg-[#102B4C] text-white" : "bg-[#FFF9F5] text-[#637C96] hover:text-[#17324F] border border-[#D8DDE7]"
              }`}
            >
              {b.subject}
            </button>
          ))}
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {chs.map(c => (
            <button
              key={c.chapter}
              onClick={() => { setChapterNo(c.chapter); playFlick(); }}
              className={`rounded-xl border px-3 py-1.5 text-xs font-bold transition ${
                chapterNo === c.chapter ? "border-[#214F78] bg-[#EFF6FC] text-[#214F78]" : "border-[#D8DDE7] text-[#637C96] hover:border-[#A9CEE8]"
              }`}
            >
              Ch {c.chapter} · {c.title.length > 26 ? c.title.slice(0, 26) + "…" : c.title}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
