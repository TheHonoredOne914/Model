"use client";

// Games — the full VidhyaSaathy arcade. Top: the four REAL games from the
// games library (Tinker, Maths War, Optics Lab, Quill & Blade) opened in a
// full-screen GameFrame. Below: the chapter arcade (mini-games on the chapter
// you're learning) with live best scores.
import { useEffect, useMemo, useState } from "react";
import { Flame, Lightbulb, Play, Puzzle, Sparkles, SquareStack, Swords, Trophy, Wand2, Zap } from "lucide-react";
import { BOOKS, allChapters, type ChapterArtifacts } from "@/lib/learn/artifacts";
import { GameHub } from "@/components/learn/games";
import { GameFrame, type BigGame } from "@/components/platform/game-frame";
import { continueCard, getGameScores } from "@/lib/platform/store";
import { playFlick } from "@/lib/platform/sound";

/** The four real games — each opens full-screen inside the platform. */
const BIG_GAMES: (BigGame & { icon: React.ComponentType<{ className?: string }>; meta: string; blurb: string; tint: string; featured?: boolean })[] = [
  {
    key: "tinker",
    name: "Tinker — The Knowledge Quest",
    tagline: "Canvas adventure",
    src: "/games/tinker.html",
    accent: "#7fb2ff",
    chip: "Adventure",
    meta: "Run with Dhruva · boss fights · 5 question types",
    blurb: "Dragons ke saamne MCQ, true-false, match aur ordering jeet ke aage badho. XP, hearts, aur poora fantasy polish.",
    icon: Swords,
    tint: "#EAF2FF",
    featured: true,
  },
  {
    key: "wars",
    name: "Maths War — Concept Arena",
    tagline: "Grade 9 arena",
    src: "/wars/play",
    accent: "#ffc76b",
    chip: "Grade 9",
    meta: "12 worlds · 38 concepts · 20 interactive labs",
    blurb: "Seekho → practice → boss arena. Streak banao, level up karo, hero warrior ko har world ka boss karao.",
    icon: Wand2,
    tint: "#FFF3DD",
  },
  {
    key: "optics",
    name: "Optics Lab — Light Ka Game",
    tagline: "Physics sandbox",
    src: "/games/optics-lab.html",
    accent: "#ffe28a",
    chip: "Class 7–10",
    meta: "Reflection · refraction · dispersion · TIR",
    blurb: "Live beam engine ke saath light ke experiments karo — SEEKHO → KARO → PARTY loop, hints ke saath.",
    icon: Lightbulb,
    tint: "#FFFBE8",
  },
  {
    key: "quill",
    name: "Quill & Blade",
    tagline: "Literature duel",
    src: "/games/quill-blade.html",
    accent: "#e9b8ff",
    chip: "Pixel duel",
    meta: "Shakespeare · figures of speech · HP rounds",
    blurb: "Shakespeare ka quote padho, figure of speech pehchano — metaphor, oxymoron, hyperbole — aur strike land karo.",
    icon: Sparkles,
    tint: "#F9F0FF",
  },
];

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
  const [openGame, setOpenGame] = useState<BigGame | null>(null);
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

  if (openGame) {
    return <GameFrame game={openGame} onExit={() => setOpenGame(null)} />;
  }

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
        <p className="text-sm text-[#637C96]">The full arcade — 4 bade games + har chapter pe mini-games. Jeeto, XP kamao.</p>
      </div>

      {/* ============ THE BIG FOUR ============ */}
      <section>
        <div className="mb-3 flex items-center gap-2">
          <Swords className="h-4 w-4 text-[#c9a227]" />
          <h2 className="text-sm font-extrabold uppercase tracking-[0.14em] text-[#102B4C]">The Big Four — real games</h2>
        </div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {BIG_GAMES.map(g => {
            const Icon = g.icon;
            return (
              <button
                key={g.key}
                onClick={() => setOpenGame(g)}
                onMouseEnter={playFlick}
                className={`group relative overflow-hidden rounded-2xl border border-[#D8DDE7] bg-white p-5 text-left shadow-[0_10px_30px_-22px_rgba(16,43,76,.4)] transition hover:-translate-y-0.5 hover:border-[#A9CEE8] hover:shadow-[0_18px_40px_-20px_rgba(16,43,76,.5)] ${g.featured ? "lg:col-span-2" : ""}`}
              >
                {/* accent spine + washi tape */}
                <span className="absolute inset-y-0 left-0 w-1.5" style={{ background: g.accent }} aria-hidden />
                <span className="pointer-events-none absolute -right-6 -top-7 h-20 w-24 rotate-[10deg] rounded-sm opacity-70 transition group-hover:rotate-[6deg]" style={{ background: g.tint }} aria-hidden />
                <div className="flex items-start gap-4">
                  <span
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl shadow-[inset_0_0_0_1.5px_#d7e6f6] transition group-hover:scale-110 group-hover:-rotate-6"
                    style={{ background: g.tint, color: "#102B4C" }}
                  >
                    <Icon className="h-6 w-6" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-center gap-2">
                      <span className="text-base font-extrabold text-[#102B4C]">{g.name}</span>
                      <span className="rounded-full px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide" style={{ background: g.tint, color: "#214F78" }}>
                        {g.chip}
                      </span>
                    </span>
                    <span className="mt-0.5 block text-[11px] font-bold uppercase tracking-[0.12em] text-[#637C96]">{g.meta}</span>
                    <span className="mt-1.5 block text-xs leading-relaxed text-[#637C96]">{g.blurb}</span>
                    <span
                      className="mt-3 inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-extrabold text-[#102B4C] shadow-[0_8px_18px_-10px_rgba(16,43,76,.5)] transition group-hover:gap-2.5 group-hover:brightness-105"
                      style={{ background: g.accent }}
                    >
                      <Play className="h-3.5 w-3.5" /> Play now
                    </span>
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* ============ CHAPTER ARCADE ============ */}
      <section>
        <div className="mb-3 flex items-center gap-2">
          <Zap className="h-4 w-4 text-[#e8825a]" />
          <h2 className="text-sm font-extrabold uppercase tracking-[0.14em] text-[#102B4C]">Chapter arcade — current chapter pe mini-games</h2>
        </div>

        {/* featured */}
        {chapter && (
          <div className="relative mb-4 overflow-hidden rounded-2xl border border-[#D8DDE7] bg-gradient-to-br from-[#102B4C] to-[#214F78] p-6 text-white shadow-[0_16px_40px_-24px_rgba(16,43,76,.8)]">
            <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#A9CEE8] opacity-20 blur-2xl" aria-hidden />
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#A9CEE8]">Today&apos;s challenge</p>
            <h3 className="mt-1 text-xl font-extrabold">Cricket Lab — {chapter.title}</h3>
            <p className="mt-1 max-w-xl text-sm text-white/80">
              Bowl the MCQ Rush on {BOOKS.find(b => b.key === book)?.subject} ch. {chapter.chapter} — 60 seconds, har ball ek question.
            </p>
            <button
              onClick={() => { setActive("play"); playFlick(); }}
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#F6D5C6] px-5 py-2.5 text-sm font-bold text-[#17324F] transition hover:bg-[#f3c6b2] active:scale-[.98]"
            >
              <Play className="h-4 w-4" /> Play now
            </button>
          </div>
        )}

        {/* mini-game cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {GAME_META.map(g => {
            const s = scores[`${g.key}.${book}${chapterNo}`] ?? getGameScores()[`${g.key}.${book}${chapterNo}`];
            const Icon = g.icon;
            return (
              <button
                key={g.key}
                onClick={() => { setActive("play"); playFlick(); }}
                onMouseEnter={playFlick}
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
        <div className="mt-4 rounded-2xl border border-[#D8DDE7] bg-white p-5 shadow-[0_10px_30px_-22px_rgba(16,43,76,.4)]">
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
        </div>
      </section>
    </div>
  );
}
