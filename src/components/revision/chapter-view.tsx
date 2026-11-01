"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  learnDeck,
  LETTERS,
  type Chapter,
  type ImpQ,
  type LearnCard,
  type McqResult,
  type Progress,
} from "@/lib/revision";
import { Html, ProgressBar, Chip } from "./atoms";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  BookOpen,
  ListChecks,
  Zap,
  Eye,
  Check,
  X,
  GraduationCap,
  Lightbulb,
} from "lucide-react";

type Mode = "learn" | "imp" | "mcq";

export function ChapterView({
  chapter,
  progress,
  setProgress,
  onBack,
}: {
  chapter: Chapter;
  progress: Progress;
  setProgress: (fn: (p: Progress) => Progress) => void;
  onBack: () => void;
}) {
  const [mode, setMode] = useState<Mode>("learn");
  const chKey = String(chapter.num);

  const [learnIdx, setLearnIdx] = useState(0);
  const [impIdx, setImpIdx] = useState(0);
  const [mcqIdx, setMcqIdx] = useState(0);
  const deck = useMemo(() => learnDeck(chapter), [chapter]);

  /* mark learn card done */
  useEffect(() => {
    setProgress((p) => {
      const done = p.learnDone[chKey] ?? [];
      if (done.includes(learnIdx)) return p;
      return {
        ...p,
        learnDone: { ...p.learnDone, [chKey]: [...done, learnIdx] },
      };
    });
  }, [learnIdx, chKey, setProgress]);

  /* keyboard nav */
  const go = (dir: 1 | -1) => {
    if (mode === "learn") {
      setLearnIdx((i) => Math.min(deck.length - 1, Math.max(0, i + dir)));
    } else if (mode === "imp") {
      setImpIdx((i) => Math.min(chapter.imps.length - 1, Math.max(0, i + dir)));
    } else {
      setMcqIdx((i) => Math.min(chapter.mcqs.length - 1, Math.max(0, i + dir)));
    }
  };
  const goRef = useRef(go);
  useEffect(() => {
    goRef.current = go;
  });
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goRef.current(1);
      if (e.key === "ArrowLeft") goRef.current(-1);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  /* swipe */
  const touchX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 60) go(dx < 0 ? 1 : -1);
    touchX.current = null;
  };

  const starKey =
    mode === "learn"
      ? `L:${chKey}:${learnIdx}`
      : mode === "imp"
      ? `Q:${chKey}:${impIdx}`
      : `M:${chKey}:${chapter.mcqs[mcqIdx]?.n ?? 0}`;
  const starred = !!progress.stars[starKey];
  const toggleStar = () =>
    setProgress((p) => ({
      ...p,
      stars: { ...p.stars, [starKey]: !p.stars[starKey] },
    }));

  const doneCount =
    mode === "learn"
      ? (progress.learnDone[chKey] ?? []).length
      : mode === "imp"
      ? (progress.impDone[chKey] ?? []).length
      : Object.keys(progress.mcq[chKey] ?? {}).length;
  const total =
    mode === "learn"
      ? deck.length
      : mode === "imp"
      ? chapter.imps.length
      : chapter.mcqs.length;

  const tabs: { id: Mode; label: string; icon: React.ReactNode }[] = [
    { id: "learn", label: "Learn", icon: <BookOpen className="h-4 w-4" /> },
    { id: "imp", label: `IMP Qs`, icon: <ListChecks className="h-4 w-4" /> },
    { id: "mcq", label: "MCQ Drill", icon: <Zap className="h-4 w-4" /> },
  ];

  return (
    <div className="mx-auto w-full max-w-lg px-4 pb-32 pt-4 sm:max-w-2xl">
      {/* header — notebook margin note */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onBack}
          className="press flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#d8dde7] bg-white text-[#17324f] transition-colors hover:border-[#b9d4ea]"
          aria-label="Back to chapters"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span
              className={`flex h-7 w-7 items-center justify-center rounded-lg font-hand text-[15px] font-bold ${
                chapter.star ? "bg-[#f0b490] text-[#7a3a12]" : "bg-[#eef4fb] text-[#2a5298]"
              }`}
            >
              {chapter.num}
            </span>
            <p className="truncate text-[14px] font-extrabold text-[#16305b]">{chapter.short}</p>
            {chapter.star && <Chip className="text-[#b0552f]">★</Chip>}
          </div>
          <div className="mt-1.5 flex items-center gap-2">
            <ProgressBar value={total ? (doneCount / total) * 100 : 0} className="h-1" />
            <span className="shrink-0 font-hand text-[13px] font-bold text-[#8a94a8]">
              {doneCount}/{total}
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={toggleStar}
          className={`press flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-colors ${
            starred
              ? "border-[#f0b490] bg-[#fff1e7] text-[#b0552f]"
              : "border-[#d8dde7] bg-white text-[#8a94a8] hover:text-[#b0552f]"
          }`}
          aria-label={starred ? "Remove star" : "Star for later"}
        >
          <Star className={`h-5 w-5 ${starred ? "fill-[#f0b490]" : ""}`} />
        </button>
      </div>

      {/* mode tabs — paper folder tabs */}
      <div className="mt-4 grid grid-cols-3 gap-1 rounded-2xl border border-[#e4d9c8] bg-[#fffaf0] p-1">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setMode(t.id)}
            className={`press flex min-h-[40px] items-center justify-center gap-1.5 rounded-xl font-hand text-[14px] font-bold transition-all ${
              mode === t.id
                ? "bg-[#16305b] text-white shadow-[0_2px_8px_rgba(22,48,91,0.30)]"
                : "text-[#7a6a4a] hover:bg-white/70"
            }`}
          >
            {t.icon}
            {t.label}
          </button>
        ))}
      </div>

      {/* card area */}
      <div
        className="mt-4"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {mode === "learn" && (
          <LearnCardView
            chapter={chapter}
            card={deck[learnIdx]}
            pos={learnIdx}
            total={deck.length}
          />
        )}
        {mode === "imp" && (
          <ImpQView
            key={`imp-${impIdx}`}
            q={chapter.imps[impIdx]}
            pos={impIdx}
            total={chapter.imps.length}
            solved={!!(progress.impDone[chKey] ?? []).includes(impIdx)}
            onSolve={() =>
              setProgress((p) => {
                const done = p.impDone[chKey] ?? [];
                if (done.includes(impIdx)) return p;
                return { ...p, impDone: { ...p.impDone, [chKey]: [...done, impIdx] } };
              })
            }
          />
        )}
        {mode === "mcq" && (
          <McqView
            key={`mcq-${chapter.mcqs[mcqIdx]?.n ?? mcqIdx}`}
            chapter={chapter}
            idx={mcqIdx}
            progress={progress}
            setProgress={setProgress}
          />
        )}
      </div>

      {/* nav bar — a paper strip pinned to the bottom */}
      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-[#e8e0cf] bg-[#f4efe4]/95 backdrop-blur">
        <div className="composer-safe mx-auto flex max-w-lg items-center gap-2 px-4 py-3 sm:max-w-2xl">
          <button
            type="button"
            onClick={() => go(-1)}
            disabled={
              (mode === "learn" && learnIdx === 0) ||
              (mode === "imp" && impIdx === 0) ||
              (mode === "mcq" && mcqIdx === 0)
            }
            className="press flex min-h-[44px] flex-1 items-center justify-center gap-1 rounded-xl border border-[#d8dde7] bg-white text-[13px] font-extrabold text-[#17324f] transition-all enabled:hover:bg-[#f2f7fd] disabled:opacity-30"
          >
            <ChevronLeft className="h-4 w-4" /> Pichhla
          </button>
          <span className="shrink-0 font-hand text-[14px] font-bold text-[#637c96]">
            {mode === "learn" ? learnIdx + 1 : mode === "imp" ? impIdx + 1 : mcqIdx + 1} /{" "}
            {total}
          </span>
          <button
            type="button"
            onClick={() => go(1)}
            disabled={
              (mode === "learn" && learnIdx === deck.length - 1) ||
              (mode === "imp" && impIdx === chapter.imps.length - 1) ||
              (mode === "mcq" && mcqIdx === chapter.mcqs.length - 1)
            }
            className="press flex min-h-[44px] flex-1 items-center justify-center gap-1 rounded-xl bg-[#16305b] text-[13px] font-extrabold text-white shadow-[0_4px_12px_rgba(22,48,91,0.30)] transition-all enabled:hover:bg-[#214F78] disabled:opacity-30"
          >
            {mode === "learn" && learnIdx === deck.length - 2
              ? "Almost done!"
              : mode === "learn" && learnIdx === deck.length - 1
              ? "Complete"
              : "Agla"}{" "}
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ================= LEARN (one concept at a time — index cards) ================= */

function LearnCardView({
  chapter,
  card,
  pos,
  total,
}: {
  chapter: Chapter;
  card: LearnCard;
  pos: number;
  total: number;
}) {
  const key = `${chapter.num}-${card.kind}-${"idx" in card ? card.idx : "i"}`;
  return (
    <div key={key} className="flip-in relative paper-sheet dog-ear rounded-2xl px-5 py-5 shadow-[0_12px_30px_rgba(16,43,76,0.13)] sm:px-7 sm:py-6">
      <div className="tape tape-sky left-6 top-[-11px]" aria-hidden />
      <div className="paper-body">
        {card.kind === "intro" && (
          <>
            <Chip className="rotate-[-1deg] text-[#2a5298]">
              <GraduationCap className="h-3.5 w-3.5" /> Chapter intro
            </Chip>
            <p className="mt-3 font-hand text-[22px] font-bold leading-snug text-[#16305b]">
              {chapter.short} — ek line mein
            </p>
            <p className="mt-2 font-note text-[14px] leading-relaxed text-[#3f4d6b]">
              <Html html={chapter.intro} />
            </p>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              {[
                { n: chapter.formulas.length, l: "Formulas" },
                { n: chapter.checks.length, l: "Concept rules" },
                { n: chapter.tricks.length, l: "Speed tricks" },
              ].map((x) => (
                <div key={x.l} className="rounded-xl border border-[#e4d9c8] bg-white/80 p-2.5">
                  <p className="font-hand text-[22px] font-bold leading-none text-[#b0552f]">{x.n}</p>
                  <p className="mt-1 font-note text-[10px] font-bold uppercase tracking-wide text-[#8a94a8]">
                    {x.l}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}

        {card.kind === "formula" && (
          <>
            <Chip className="rotate-[-1deg] text-[#b0552f]">
              Formula {card.idx + 1}/{chapter.formulas.length}
            </Chip>
            <div className="doodle-paper mt-3 rounded-2xl border border-[#dbe4f0] p-4">
              <p className="font-hand text-[22px] font-bold leading-relaxed text-[#16305b] sm:text-[26px]">
                <Html html={chapter.formulas[card.idx].f} />
              </p>
            </div>
            <p className="mt-4 font-note text-[14px] leading-relaxed text-[#3f4d6b]">
              <Html html={chapter.formulas[card.idx].meaning} />
            </p>
            <div className="mt-3 rounded-xl border border-[#cfe8d6] bg-[#f0faf3] p-3">
              <p className="font-hand text-[13.5px] font-bold uppercase tracking-wide text-[#3e7d4d]">
                Tiny example
              </p>
              <p className="mt-1 font-note text-[13.5px] font-semibold text-[#3e7d4d]">
                <Html html={chapter.formulas[card.idx].ex} />
              </p>
            </div>
          </>
        )}

        {card.kind === "check" && (
          <>
            <Chip className="rotate-[-1deg] text-[#3e7d4d]">
              <Check className="h-3.5 w-3.5" /> Concept rule {card.idx + 1}/{chapter.checks.length}
            </Chip>
            <p className="mt-4 font-note text-[15.5px] font-semibold leading-relaxed text-[#16305b]">
              <Html html={chapter.checks[card.idx]} />
            </p>
          </>
        )}

        {card.kind === "trick" && (
          <>
            <Chip className="rotate-[-1deg] text-[#7a4a9e]">
              <Zap className="h-3.5 w-3.5" /> Speed trick {card.idx + 1}/{chapter.tricks.length}
            </Chip>
            <div className="mt-3 rounded-2xl border border-[#e4d0f0] bg-[#faf3fd] p-4">
              <p className="font-hand text-[13.5px] font-bold uppercase tracking-wide text-[#7a4a9e]">
                Instant trick
              </p>
              <p className="mt-1 font-note text-[14px] font-bold leading-relaxed text-[#16305b]">
                <Html html={chapter.tricks[card.idx].trick} />
              </p>
            </div>
            <p className="mt-3 font-note text-[13.5px] leading-relaxed text-[#5a6b8c]">
              <span className="font-bold text-[#3f4d6b]">Kab fire kare: </span>
              <Html html={chapter.tricks[card.idx].when} />
            </p>
          </>
        )}
        <div className="mt-5 flex justify-center gap-1">
          {Array.from({ length: total }).map((_, i) => (
            <span
              key={i}
              className={`h-1 rounded-full transition-all ${
                i === pos ? "w-4 bg-[#b0552f]" : "w-1 bg-[#d8cfba]"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ================= IMP QUESTIONS — worksheet style ================= */

function ImpQView({
  q,
  pos,
  total,
  solved,
  onSolve,
}: {
  q: ImpQ;
  pos: number;
  total: number;
  solved: boolean;
  onSolve: () => void;
}) {
  const [show, setShow] = useState(false);

  return (
    <div className="flip-in relative paper-sheet dog-ear rounded-2xl px-5 py-5 shadow-[0_12px_30px_rgba(16,43,76,0.13)] sm:px-7 sm:py-6">
      <div className="tape tape-pink right-6 top-[-11px] rotate-[2deg]" aria-hidden />
      <div className="paper-body">
        <div className="flex flex-wrap items-center gap-2">
          <Chip className="text-[#a86bc9]">IMP Q {pos + 1}/{total}</Chip>
          {solved && (
            <Chip className="text-[#3e7d4d]">
              <Check className="h-3.5 w-3.5" /> done
            </Chip>
          )}
          <Chip className="text-[#637c96]">{q.level}</Chip>
          <span className="truncate font-hand text-[13px] font-bold text-[#8a94a8]">{q.concept}</span>
        </div>

        <p className="mt-3 font-note text-[15.5px] font-bold leading-relaxed text-[#16305b]">
          <Html html={q.stem} />
        </p>

        {q.fig && (
          <img
            src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/figs/${q.fig}`}
            alt="Question figure"
            className="mt-3 w-full rounded-xl border border-[#e4d9c8] bg-white"
          />
        )}

        {!show ? (
          <button
            type="button"
            onClick={() => {
              setShow(true);
              onSolve();
            }}
            className="press mt-5 flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-[#16305b] text-[13.5px] font-extrabold text-white shadow-[0_4px_12px_rgba(22,48,91,0.30)] transition-colors hover:bg-[#214F78]"
          >
            <Eye className="h-4 w-4" /> Pehle KHUD try karo — phir solution dikhao
          </button>
        ) : (
          <div className="rise-in mt-4 space-y-3">
            <div className="paper-lite rounded-2xl p-4">
              <p className="font-hand text-[14px] font-bold uppercase tracking-wide text-[#2a5298]">
                Solution
              </p>
              <ol className="mt-2 space-y-2">
                {q.steps.map((s, i) => (
                  <li key={i} className="flex gap-2.5 font-note text-[13.5px] leading-relaxed text-[#3f4d6b]">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-[#eef4fb] font-hand text-[12.5px] font-bold text-[#2a5298]">
                      {i + 1}
                    </span>
                    <span>
                      <Html html={s} />
                    </span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="rounded-2xl border-2 border-[#9fd8a8] bg-[#eef8f0] p-4">
              <p className="font-hand text-[14px] font-bold uppercase tracking-wide text-[#3e7d4d]">
                Answer
              </p>
              <p className="mt-1 font-hand text-[18px] font-bold leading-relaxed text-[#2e5e38]">
                <Html html={q.answer} />
              </p>
            </div>
            {q.why.length > 0 && (
              <div className="paper-lite rounded-2xl p-4">
                <p className="font-hand text-[14px] font-bold uppercase tracking-wide text-[#2a5298]">
                  Why this works
                </p>
                <ul className="mt-2 space-y-1.5">
                  {q.why.map((w, i) => (
                    <li key={i} className="font-note text-[12.5px] leading-relaxed text-[#5a6b8c]">
                      • <Html html={w} />
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="sticky-note sticky-peach flex gap-2.5 p-4">
              <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-[#b0552f]" />
              <div>
                <p className="font-hand text-[14px] font-bold uppercase tracking-wide text-[#b0552f]">
                  Teacher note
                </p>
                <p className="mt-1 font-hand text-[14.5px] italic leading-relaxed text-[#7a4a22]">
                  <Html html={q.hinglish} />
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ================= MCQ DRILL — tick the right box ================= */

function McqView({
  chapter,
  idx,
  progress,
  setProgress,
}: {
  chapter: Chapter;
  idx: number;
  progress: Progress;
  setProgress: (fn: (p: Progress) => Progress) => void;
}) {
  const q = chapter.mcqs[idx];
  const chKey = String(chapter.num);
  const saved = (progress.mcq[chKey] ?? {})[String(q.n)];
  const [picked, setPicked] = useState<"A" | "B" | "C" | "D" | null>(saved ?? null);

  const answered = picked !== null;
  const isRight = picked === q.ans;

  const results = Object.values(progress.mcq[chKey] ?? {});
  const c = results.filter((r) => r === "C").length;
  const w = results.filter((r) => r === "W").length;

  const pick = (L: "A" | "B" | "C" | "D") => {
    if (answered) return;
    setPicked(L);
    const res: McqResult = L === q.ans ? "C" : "W";
    setProgress((p) => ({
      ...p,
      mcq: { ...p.mcq, [chKey]: { ...(p.mcq[chKey] ?? {}), [String(q.n)]: res } },
    }));
  };

  return (
    <div className="flip-in relative paper-sheet dog-ear rounded-2xl px-5 py-5 shadow-[0_12px_30px_rgba(16,43,76,0.13)] sm:px-7 sm:py-6">
      <div className="tape tape-mint left-6 top-[-11px]" aria-hidden />
      <div className="paper-body">
        <div className="flex flex-wrap items-center gap-2">
          <Chip className="text-[#b0552f]">MCQ {idx + 1}/{chapter.mcqs.length}</Chip>
          <Chip className="text-[#637c96]">{q.level}</Chip>
          <span className="truncate font-hand text-[13px] font-bold text-[#8a94a8]">{q.concept}</span>
          <span className="ml-auto flex items-center gap-2 font-hand text-[13.5px] font-bold">
            <span className="flex items-center gap-1 text-[#3e7d4d]">
              <Check className="h-3.5 w-3.5" /> {c}
            </span>
            <span className="flex items-center gap-1 text-[#d96a4a]">
              <X className="h-3.5 w-3.5" /> {w}
            </span>
          </span>
        </div>

        <p className="mt-3 font-note text-[15.5px] font-bold leading-relaxed text-[#16305b]">
          <Html html={q.stem} />
        </p>

        <div className="mt-4 space-y-2">
          {q.options.map((opt, i) => {
            const L = LETTERS[i];
            const isAns = L === q.ans;
            let cls = "border-[#e4d9c8] bg-white/85 text-[#3f4d6b] hover:-translate-y-px hover:border-[#7fb3ff]";
            let badge = "bg-[#eef4fb] text-[#2a5298]";
            if (answered) {
              if (isAns) { cls = "pop-good border-[#5fae6f] bg-[#eef8f0] text-[#2e5e38]"; badge = "bg-[#5fae6f] text-white"; }
              else if (L === picked) { cls = "shake border-[#d96a4a] bg-[#fdf0ea] text-[#b0552f]"; badge = "bg-[#d96a4a] text-white"; }
              else { cls = "border-[#e8e0cf]/60 bg-white/40 text-[#a9a290]"; badge = "bg-[#efe9db] text-[#a9a290]"; }
            }
            return (
              <button
                key={L}
                onClick={() => pick(L)}
                disabled={answered}
                className={`press flex w-full items-start gap-3 rounded-xl border-2 p-3.5 text-left font-note text-[14px] font-semibold transition-all ${cls} ${
                  answered ? "cursor-default" : ""
                }`}
              >
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg font-hand text-[13px] font-bold ${badge}`}
                >
                  {answered && isAns ? <Check className="h-3.5 w-3.5" /> : answered && L === picked ? <X className="h-3.5 w-3.5" /> : L}
                </span>
                <span className="leading-relaxed">
                  <Html html={opt} />
                </span>
              </button>
            );
          })}
        </div>

        {answered && (
          <div className="rise-in mt-4 space-y-3">
            <div
              className={`rounded-2xl border-2 p-4 ${
                isRight ? "border-[#9fd8a8] bg-[#eef8f0]" : "border-[#f0b4a0] bg-[#fdf0ea]"
              }`}
            >
              <p
                className={`flex items-center gap-1.5 font-hand text-[16px] font-bold ${
                  isRight ? "text-[#3e7d4d]" : "text-[#b0552f]"
                }`}
              >
                {isRight ? (
                  <>
                    <Check className="h-4 w-4" /> Sahi! Answer: ({q.ans})
                  </>
                ) : (
                  <>
                    <X className="h-4 w-4" /> Galat — correct answer: ({q.ans})
                  </>
                )}
              </p>
              <p className="mt-1.5 font-note text-[13px] leading-relaxed text-[#3f4d6b]">
                <Html html={q.expl} />
              </p>
            </div>
            {!isRight && Object.keys(q.traps).length > 0 && (
              <div className="paper-lite rounded-2xl p-4">
                <p className="font-hand text-[14px] font-bold uppercase tracking-wide text-[#d96a4a]">
                  Trap analysis — options ne phansaya kaise
                </p>
                <ul className="mt-2 space-y-1.5">
                  {Object.entries(q.traps).map(([L, t]) => (
                    <li key={L} className="font-note text-[12.5px] leading-relaxed text-[#5a6b8c]">
                      <span className="font-hand font-bold text-[#d96a4a]">({L})</span>{" "}
                      <Html html={t} />
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="sticky-note sticky-peach flex gap-2.5 p-4">
              <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-[#b0552f]" />
              <div>
                <p className="font-hand text-[14px] font-bold uppercase tracking-wide text-[#b0552f]">
                  1-line logic
                </p>
                <p className="mt-1 font-hand text-[14.5px] italic leading-relaxed text-[#7a4a22]">
                  <Html html={q.hinglish} />
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
