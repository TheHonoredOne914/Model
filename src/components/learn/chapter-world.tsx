"use client";
// ChapterWorld v2 — the full learning flow per chapter, now with per-book
// identity and a complete loop:
//   level check (4 tiers) → Explore (map+flowchart) → Learn (slides)
//   → Solve (worked examples, line-by-line) → Try (quiz) → Fix (flashcards)
//   → Play (games) → Master (report card).
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Map as MapIcon, BookOpen, PencilRuler, PenLine, Layers, Gamepad2, Trophy, Sparkles, ChevronRight } from "lucide-react";
import type { ChapterArtifacts } from "@/lib/learn/artifacts";
import { bookInfo, chaptersOf } from "@/lib/learn/artifacts";
import { ConceptMapView } from "./concept-map";
import { FlowChartView } from "./flow-chart";
import { SlideStage } from "./slide-stage";
import { QuizPaper } from "./quiz-paper";
import { FlashcardDeck } from "./flashcards";
import { GameHub } from "./games";
import { ExamplesStage } from "./examples-stage";
import { MasterReport } from "./master-report";
import { Mascot } from "@/components/saathy/mascot";

type StepKey = "explore" | "learn" | "solve" | "try" | "fix" | "play" | "master";

// per-book identity — every module feels like its own subject
const BOOK_THEME: Record<string, { accent: string; soft: string; tint: string; doodle: string }> = {
  gm: { accent: "#2a5298", soft: "#eef4fb", tint: "#f6fbff", doodle: "π ∑ √ ÷" },
  sc: { accent: "#2a7a5f", soft: "#eafaf1", tint: "#f4fcf8", doodle: "⚗ ⚛ 🧭" },
  us: { accent: "#7a4a9e", soft: "#f5effb", tint: "#faf7fd", doodle: "🏛 ⚖ 🌍" },
};

const STEPS: { key: StepKey; label: string; desc: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { key: "explore", label: "Explore", desc: "chapter ka naksha dekho", icon: MapIcon },
  { key: "learn", label: "Learn", desc: "slides se concept samjho", icon: BookOpen },
  { key: "solve", label: "Solve", desc: "examples line-by-line", icon: PencilRuler },
  { key: "try", label: "Try", desc: "worksheet quiz do", icon: PenLine },
  { key: "fix", label: "Fix", desc: "flashcards se yaad pakka", icon: Layers },
  { key: "play", label: "Play", desc: "games me score banao", icon: Gamepad2 },
  { key: "master", label: "Master", desc: "report + aage ka plan", icon: Trophy },
];

interface Progress { band: number | null; slidesViewed: number; quizBest: number; cardsKnown: number; xp: number; done: StepKey[]; weak: string[] }
const EMPTY: Progress = { band: null, slidesViewed: 0, quizBest: 0, cardsKnown: 0, xp: 0, done: [], weak: [] };

function loadProgress(book: string, ch: number): Progress {
  try { return { ...EMPTY, ...JSON.parse(localStorage.getItem(`saathy.learn.${book}.${ch}`) ?? "{}") }; } catch { return EMPTY; }
}
function saveProgress(book: string, ch: number, p: Progress) {
  try { localStorage.setItem(`saathy.learn.${book}.${ch}`, JSON.stringify(p)); } catch { /* private mode */ }
}

export function ChapterWorld({ chapter }: { chapter: ChapterArtifacts }) {
  const info = bookInfo(chapter.book);
  const theme = BOOK_THEME[chapter.book] ?? BOOK_THEME.gm;
  const [prog, setProg] = useState<Progress>(EMPTY);
  const [hydrated, setHydrated] = useState(false);
  const [overlay, setOverlay] = useState<null | "slides" | "quiz" | "flash" | "games" | "examples" | "master" | "gate">(null);
  const [tab, setTab] = useState<"map" | "flow">("map");

  useEffect(() => {
    const p = loadProgress(chapter.book, chapter.chapter);
    try { localStorage.setItem(`saathy.learn.${chapter.book}.${chapter.chapter}.ts`, String(Date.now())); } catch { /* private mode */ }
    let alive = true;
    (async () => { await Promise.resolve(); if (!alive) return; setProg(p); setHydrated(true); if (p.band === null) setOverlay("gate"); })();
    return () => { alive = false; };
  }, [chapter]);
  useEffect(() => { if (hydrated) saveProgress(chapter.book, chapter.chapter, prog); }, [prog, hydrated, chapter]);

  const upd = (patch: Partial<Progress>) => setProg(p => ({ ...p, ...patch }));
  const markDone = (k: StepKey) => setProg(p => ({ ...p, done: p.done.includes(k) ? p.done : [...p.done, k] }));

  const bandLabel = prog.band === null ? "" : ["Basics se shuru", "Basic-plus", "Beech se", "Top se"][prog.band];
  const nextIdx = STEPS.findIndex(s => !prog.done.includes(s.key));
  const nextKey: StepKey = STEPS[Math.max(0, nextIdx === -1 ? STEPS.length - 1 : nextIdx)].key;

  const chapters = useMemo(() => chaptersOf(chapter.book), [chapter.book]);
  const chIdx = chapters.findIndex(c => c.chapter === chapter.chapter);
  const prevCh = chIdx > 0 ? chapters[chIdx - 1] : null;
  const nextCh = chIdx >= 0 && chIdx < chapters.length - 1 ? chapters[chIdx + 1] : null;

  if (!hydrated) return <div className="flex min-h-[60vh] items-center justify-center text-[13px] font-bold text-[#637c96]">khol rahe hain…</div>;

  /* ---------- LEVEL GATE (4 tiers) ---------- */
  if (overlay === "gate") return (
    <LevelGate chapter={chapter} accent={theme.accent} onDone={band => { upd({ band }); setOverlay(null); }} />
  );

  const openStep = (k: StepKey) => {
    if (k === "explore") { document.getElementById("explore-panel")?.scrollIntoView({ behavior: "smooth", block: "start" }); return; }
    if (k === "learn") setOverlay("slides");
    if (k === "solve") setOverlay("examples");
    if (k === "try") setOverlay("quiz");
    if (k === "fix") setOverlay("flash");
    if (k === "play") setOverlay("games");
    if (k === "master") setOverlay("master");
  };

  /* ---------- MAIN DESK ---------- */
  return (
    <div className="desk-bg min-h-screen" style={{ ["--accent" as string]: theme.accent }}>
      {/* ======== page header ======== */}
      <div className="sticky top-0 z-30 border-b border-[#e4e9f1] bg-white/92 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
          <Link href="/learn" className="press flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#d8dde7] bg-white text-[15px] font-extrabold text-[#17324f] hover:bg-[#f2f7fd]" aria-label="All books">←</Link>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[14.5px] font-extrabold leading-tight text-[#16305b]">{chapter.title}</p>
            <p className="truncate text-[11.5px] font-bold text-[#637c96]">{info.name} · Grade {chapter.grade} · {chapter.sections.length} sections · {chapter.slides.length} slides · {chapter.flashcards.length} cards · {chapter.quiz.length} quiz Qs</p>
          </div>
          {prog.band !== null && <span className="hidden shrink-0 rounded-full px-3 py-1 text-[11.5px] font-extrabold sm:block" style={{ background: theme.soft, color: theme.accent }}>Level {prog.band + 1}/4 · {bandLabel}</span>}
          <Link href="/" className="hidden shrink-0 rounded-full bg-[#16305b] px-4 py-1.5 text-[12px] font-extrabold text-white hover:bg-[#214F78] sm:block">Saathy chat</Link>
        </div>
        {/* flow ribbon — the journey in one line */}
        <div className="mx-auto max-w-6xl overflow-x-auto px-4 pb-2.5">
          <div className="flex min-w-max items-center gap-1">
            {STEPS.map((s, i) => {
              const isDone = prog.done.includes(s.key);
              const isNext = s.key === nextKey;
              const Icon = s.icon;
              return (
                <div key={s.key} className="flex items-center">
                  <button type="button" onClick={() => openStep(s.key)} title={s.desc}
                    className={`press flex items-center gap-1.5 rounded-full border-2 px-3 py-1.5 text-[12px] font-extrabold transition-all duration-200 ${isDone ? "border-[#9fd8a8] bg-[#eef8f0] text-[#3e7d4d]" : isNext ? "border-[#f0b490] bg-[#fff1e7] text-[#b0552f] shadow-[0_2px_10px_rgba(176,85,47,0.18)]" : "border-[#e4e9f1] bg-white text-[#637c96] hover:border-[#c9d6e4] hover:-translate-y-0.5"}`}>
                    <Icon className={`h-3.5 w-3.5 ${isNext ? "animate-pulse" : ""}`} />
                    {s.label}{isDone && " ✓"}
                  </button>
                  {i < STEPS.length - 1 && <span aria-hidden className="font-hand px-1 text-[14px] text-[#b0552f] opacity-60">→</span>}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ======== body ======== */}
      <div className="mx-auto max-w-6xl px-4 py-6">
        {/* hero stats — sticky notes, staggered rise */}
        <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
          <HeroCard delay={0} icon={<Trophy className="h-4.5 w-4.5" />} title={`Level ${(prog.band ?? 0) + 1}/4`} sub={prog.band !== null ? bandLabel : "level check ho chuka"} mood="sticky-lemon" tilt="-rotate-[1.1deg]" />
          <HeroCard delay={60} icon={<BookOpen className="h-4.5 w-4.5" />} title={`${prog.slidesViewed}/${chapter.slides.length}`} sub="slides dekhi" mood="sticky-sky" tilt="rotate-[0.8deg]" />
          <HeroCard delay={120} icon={<PenLine className="h-4.5 w-4.5" />} title={prog.quizBest ? `${prog.quizBest}%` : "—"} sub="quiz best score" mood="sticky-peach" tilt="rotate-[1.2deg]" />
          <HeroCard delay={180} icon={<Sparkles className="h-4.5 w-4.5" />} title={`${prog.xp} XP`} sub="game station se" mood="sticky-mint" tilt="-rotate-[0.9deg]" />
        </div>

        {/* explore: concept map + flowchart — the notebook page */}
        <div id="explore-panel" className="rise-in doodle-paper scroll-mt-32 rounded-3xl border border-[#dbe4f0] p-4 shadow-[0_10px_28px_rgba(16,43,76,0.09)] sm:p-6">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <div className="min-w-0">
              <h2 className="font-hand text-[26px] font-bold leading-tight text-[#16305b]">{chapter.conceptMap ? chapter.conceptMap.center : chapter.title} — ka naksha</h2>
              <p className="text-[12.5px] font-semibold text-[#637c96]">Explore karo: poora chapter ek nazar me, phir flow pe chalo.</p>
            </div>
            <div className="flex rounded-full border border-[#d8dde7] bg-[#f6f9fc] p-1">
              <button type="button" onClick={() => setTab("map")} className={`rounded-full px-3.5 py-1.5 text-[12px] font-extrabold transition ${tab === "map" ? "bg-[#16305b] text-white shadow" : "text-[#637c96] hover:text-[#16305b]"}`}>Concept map</button>
              <button type="button" onClick={() => setTab("flow")} disabled={!chapter.flowchart} className={`rounded-full px-3.5 py-1.5 text-[12px] font-extrabold transition disabled:opacity-40 ${tab === "flow" ? "bg-[#16305b] text-white shadow" : "text-[#637c96] hover:text-[#16305b]"}`}>Chapter flow</button>
            </div>
          </div>
          {tab === "map" && chapter.conceptMap && <div className="fade-in"><ConceptMapView map={chapter.conceptMap} accent={theme.accent} /></div>}
          {tab === "flow" && chapter.flowchart && <div className="fade-in"><FlowChartView chart={chapter.flowchart} accent={theme.accent} /></div>}

          {/* sections — clickable jump pills */}
          <div className="mt-5 border-t border-[#dbe0d4] pt-4">
            <p className="scribble text-[16px]">is chapter me kya kya hai</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {chapter.sections.map((s, i) => (
                <span key={s.id} className="rounded-full border border-[#e4d9c8] bg-[#fffaf0] px-3 py-1.5 text-[12px] font-bold text-[#7a5a2e] transition hover:-translate-y-0.5 hover:shadow-[0_3px_10px_rgba(16,43,76,0.10)]" style={{ transform: `rotate(${((i * 13) % 3) - 1}deg)` }}>
                  {s.id} · {s.title}
                </span>
              ))}
            </div>
          </div>

          {/* CTA row — the whole loop at your fingertips */}
          <div className="mt-6 flex flex-wrap items-center gap-2.5 border-t border-[#dbe0d4] pt-5">
            <button type="button" onClick={() => setOverlay("slides")} className="press flex items-center gap-1.5 rounded-full px-6 py-2.5 text-[13.5px] font-extrabold text-white shadow-[0_6px_16px_rgba(22,48,91,0.35)] transition hover:brightness-110" style={{ background: theme.accent }}>
              <BookOpen className="h-4 w-4" /> Slides se seekho
            </button>
            <button type="button" onClick={() => setOverlay("examples")} className="press flex items-center gap-1.5 rounded-full border-2 px-5 py-2 text-[13px] font-extrabold transition hover:bg-[#f6fbff]" style={{ borderColor: theme.accent, color: theme.accent }}>
              <PencilRuler className="h-4 w-4" /> Solved examples
            </button>
            <button type="button" onClick={() => setOverlay("quiz")} className="press flex items-center gap-1.5 rounded-full border-2 border-[#16305b] bg-white px-5 py-2 text-[13px] font-extrabold text-[#16305b] hover:bg-[#f2f7fd]">
              <PenLine className="h-4 w-4" /> Seedha quiz
            </button>
            <button type="button" onClick={() => setOverlay("flash")} className="press flex items-center gap-1.5 rounded-full border-2 border-[#e4d9c8] bg-white px-5 py-2 text-[13px] font-extrabold text-[#7a5a2e] hover:bg-[#fffaf0]">
              <Layers className="h-4 w-4" /> Flashcards
            </button>
            <button type="button" onClick={() => setOverlay("games")} className="press flex items-center gap-1.5 rounded-full border-2 border-[#e4d9c8] bg-white px-5 py-2 text-[13px] font-extrabold text-[#7a5a2e] hover:bg-[#fffaf0]">
              <Gamepad2 className="h-4 w-4" /> Games
            </button>
          </div>

          {/* Saathy's honest recommendation */}
          {prog.quizBest > 0 && prog.quizBest < 75 ? (
            <p className="mt-4 rounded-2xl border border-[#f3d9c4] bg-[#fff6ec] px-4 py-3 font-note text-[14.5px] leading-snug text-[#8a4a22]">
              <span className="font-hand text-[16px]">Saathy ki salah:</span> quiz {prog.quizBest}% aaya — flashcards ek baar palto (✓ Fix), phir quiz dobara. Wahi asli tarika hai.
            </p>
          ) : prog.quizBest >= 75 ? (
            <p className="mt-4 flex items-center gap-3 rounded-2xl border border-[#cfe8d6] bg-[#f0faf3] px-4 py-3">
              <Mascot pose="cheering" size={40} />
              <span className="font-note text-[14.5px] leading-snug text-[#2f6b3f]"><span className="font-hand text-[16px]">Saathy bolta hai:</span> {prog.quizBest}%! Chapter solid hai — games me XP banao, phir agla chapter kholo.</span>
            </p>
          ) : null}
        </div>

        {/* prev / next chapter nav */}
        <div className="mt-6 flex items-center justify-between gap-3">
          {prevCh ? <Link href={`/learn/${chapter.book}/${prevCh.chapter}`} className="max-w-[46%] truncate rounded-full border border-[#d8dde7] bg-white px-4 py-2 text-[12.5px] font-extrabold text-[#17324f] hover:bg-[#f2f7fd]">← Ch {prevCh.chapter}: {prevCh.title}</Link> : <span />}
          {nextCh ? <Link href={`/learn/${chapter.book}/${nextCh.chapter}`} className="group flex max-w-[46%] items-center gap-1 truncate rounded-full px-4 py-2 text-[12.5px] font-extrabold text-white transition hover:brightness-110" style={{ background: theme.accent }}>
            <span className="truncate">Ch {nextCh.chapter}: {nextCh.title}</span> <ChevronRight className="h-4 w-4 shrink-0 transition group-hover:translate-x-0.5" />
          </Link> : <span />}
        </div>
      </div>

      {/* ======== full-screen overlays ======== */}
      {overlay === "slides" && (
        <SlideStage chapter={chapter} accent={theme.accent}
          onDone={viewed => { upd({ slidesViewed: Math.max(prog.slidesViewed, viewed) }); markDone("learn"); markDone("explore"); markDone("solve"); setOverlay("examples"); }}
          onExit={() => { markDone("explore"); if (prog.slidesViewed > 0) markDone("learn"); setOverlay(null); }} />
      )}
      {overlay === "examples" && (
        <ExamplesStage chapter={chapter} accent={theme.accent}
          onDone={() => { markDone("solve"); setOverlay("quiz"); }}
          onExit={() => setOverlay(null)} />
      )}
      {overlay === "quiz" && (
        <QuizPaper chapter={chapter} accent={theme.accent}
          onDone={({ correct, total, weak }) => { const pct = total ? Math.round((correct / total) * 100) : 0; upd({ quizBest: Math.max(prog.quizBest, pct), weak: weak.length ? weak : prog.weak }); markDone("try"); setOverlay(pct < 75 ? "flash" : "games"); }}
          onExit={() => setOverlay(null)} />
      )}
      {overlay === "flash" && (
        <FlashcardDeck chapter={chapter} accent={theme.accent}
          onDone={({ known }) => { upd({ cardsKnown: Math.max(prog.cardsKnown, known) }); markDone("fix"); setOverlay("games"); }}
          onExit={() => { if (prog.cardsKnown > 0) markDone("fix"); setOverlay(null); }} />
      )}
      {overlay === "games" && (
        <GameHub chapter={chapter} accent={theme.accent} onExit={() => { markDone("play"); setOverlay("master"); }} onXp={n => upd({ xp: prog.xp + n })} />
      )}
      {overlay === "master" && (
        <MasterReport chapter={chapter} stats={{ ...prog }} onClose={() => { markDone("master"); setOverlay(null); }} />
      )}
    </div>
  );
}

function HeroCard({ icon, title, sub, mood, tilt, delay }: { icon: React.ReactNode; title: string; sub: string; mood: string; tilt: string; delay: number }) {
  return (
    <div className={`sticky-note ${mood} ${tilt} rise-in px-4 py-3.5`} style={{ animationDelay: `${delay}ms` }}>
      <span className="text-[#16305b]">{icon}</span>
      <p className="font-hand mt-1 text-[24px] font-bold leading-none text-[#16305b]">{title}</p>
      <p className="mt-1 text-[11.5px] font-bold text-[#5a6b8c]">{sub}</p>
    </div>
  );
}

/* ================= Level Gate — 4-tier diagnostic ================= */
function LevelGate({ chapter, accent, onDone }: { chapter: ChapterArtifacts; accent: string; onDone: (band: number) => void }) {
  const qs = useMemo(() => {
    const easy = shuffle(chapter.quiz.filter(q => q.difficulty === "easy")).slice(0, 3);
    const med = shuffle(chapter.quiz.filter(q => q.difficulty === "medium")).slice(0, 3);
    const hard = shuffle(chapter.quiz.filter(q => q.difficulty === "hard")).slice(0, 2);
    return [...shuffle(easy), ...shuffle(med), ...shuffle(hard)].slice(0, 6);
  }, [chapter.quiz]);
  const [i, setI] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);

  const q = qs[i];
  const pick = (k: number) => {
    if (picked !== null) return;
    setPicked(k);
    if (k === q.answer) setCorrect(c => c + 1);
    setTimeout(() => {
      if (i + 1 >= qs.length) {
        const pct = Math.round((correct + (k === q.answer ? 1 : 0)) / qs.length * 100);
        onDone(pct >= 75 ? 3 : pct >= 50 ? 2 : pct >= 25 ? 1 : 0);
      } else { setI(i + 1); setPicked(null); }
    }, 650);
  };

  return (
    <div className="fade-in fixed inset-0 z-50 flex items-start justify-center overflow-y-auto desk-bg px-4 py-8 sm:items-center">
      <div className="rise-in w-full max-w-xl">
        <div className="relative paper-sheet rounded-2xl px-5 py-7 shadow-[0_18px_44px_rgba(16,43,76,0.16)] sm:px-8">
          <div className="tape left-8 top-[-12px]" aria-hidden />
          <div className="paper-body">
            <p className="scribble text-[16px]">Ch {chapter.chapter} · {chapter.title}</p>
            <h1 className="font-hand text-[30px] font-bold leading-tight text-[#16305b]">Pehle dekhte hain, tum kahan ho</h1>
            <p className="font-note mt-1 text-[15px] leading-snug text-[#5a6b8c]">6 chhote sawal — isi chapter ke. Jitna aata hai utna sahi karo; level ke hisaab se plan banega. Koi marks ka dar nahi, yeh sirf mapping hai.</p>

            <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#e8e0cf]"><div className="h-full rounded-full transition-all duration-300" style={{ width: `${((i + (picked !== null ? 1 : 0)) / qs.length) * 100}%`, background: accent }} /></div>

            {q && (
              <div className="mt-5">
                <p className="font-note text-[17.5px] font-bold leading-snug text-[#16305b]">{q.q}</p>
                <div className="mt-3 space-y-2">
                  {q.options.map((o, k) => (
                    <button key={k} type="button" onClick={() => pick(k)} disabled={picked !== null}
                      className={`press w-full rounded-xl border-2 px-3.5 py-2.5 text-left font-note text-[15px] font-semibold transition ${picked !== null && k === q.answer ? "pop-good border-[#5fae6f] bg-[#eef8f0]" : picked === k ? "shake border-[#d96a4a] bg-[#fdf0ea]" : "border-[#e4d9c8] bg-white/85 hover:-translate-y-px hover:border-[#7fb3ff]"}`}>{o}</button>
                  ))}
                </div>
              </div>
            )}
            <p className="mt-5 text-[11.5px] font-semibold text-[#8a94a8]">4 levels: Basics se · Basic-plus · Beech se · Top se — tumhara jawab wahi tay karega.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}
