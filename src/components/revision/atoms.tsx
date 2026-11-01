"use client";

import { useEffect, useRef, useState } from "react";

/* Renders trusted self-authored mini-HTML (sup/sub/strong/br only). */
export function Html({ html, className }: { html: string; className?: string }) {
  return (
    <span
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

/* ---------------------------------------------------------------
   LovePopup — sweet notes, now a tiny sticky note dropped on the desk 💖
   Appears for 2 seconds, then disappears. Repeats every 30 minutes.
   (First one shows ~3s after opening the app.)
   Hidden test hook: append ?love=demo to the URL to see it every 15s.
---------------------------------------------------------------- */
const LOVE_MSGS = [
  "heyy babyieee dont worry uh can do it 💖",
  "just takeeee careee babyieee 🌸",
  "if need any help further meko dm kr dena 💬",
  "shanti se padhooo, sab ho jayegaa babyieee ✨",
  "uh got thiss babyieee, bas calm rehooo 💪",
  "stressss? not todayyy. padhai full onnn 📚",
  "chillll maro babyieee, tum kar logiiii 🌟",
  "80/80 loading… bas babyieee ke liye 🔥",
  "ek ek concept karooo, no rushhh 😌💕",
  "proud of uu babyieee, keep goinggg 💖",
];

export function LovePopup() {
  const [msg, setMsg] = useState<string | null>(null);
  const [leaving, setLeaving] = useState(false);
  const idx = useRef(0);
  const timers = useRef<Array<ReturnType<typeof setTimeout>>>([]);

  useEffect(() => {
    const demo =
      typeof window !== "undefined" &&
      new URLSearchParams(window.location.search).get("love") === "demo";
    const everyMs = demo ? 15_000 : 30 * 60 * 1000; // 30 minutes
    const firstMs = demo ? 1_200 : 3_000;

    const show = () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
      setLeaving(false);
      setMsg(LOVE_MSGS[idx.current % LOVE_MSGS.length]);
      idx.current += 1;
      // hold ~1.6s, fade out 0.5s => gone after 2 seconds
      timers.current.push(setTimeout(() => setLeaving(true), 1_600));
      timers.current.push(setTimeout(() => setMsg(null), 2_100));
    };

    const first = setTimeout(show, firstMs);
    const loop = setInterval(show, everyMs);
    return () => {
      clearTimeout(first);
      clearInterval(loop);
      timers.current.forEach(clearTimeout);
    };
  }, []);

  if (!msg) return null;
  return (
    <div
      role="status"
      className={`love-pop ${leaving ? "love-out" : ""} pointer-events-none fixed left-1/2 top-5 z-[100] -translate-x-1/2`}
    >
      <div className="sticky-note sticky-lemon sway-in flex -rotate-2 items-center gap-2.5 px-5 py-3">
        <span aria-hidden className="text-lg">💖</span>
        <span className="whitespace-nowrap font-hand text-[15px] font-bold text-[#8a4a22]">
          {msg}
        </span>
      </div>
    </div>
  );
}

/* Paper progress track — a pencil line that fills with colour */
export function ProgressBar({
  value,
  className = "",
  barClass = "bg-[#b0552f]",
  trackClass = "bg-[#e8e0cf]",
}: {
  value: number;
  className?: string;
  barClass?: string;
  trackClass?: string;
}) {
  return (
    <div className={`h-1.5 w-full overflow-hidden rounded-full ${trackClass} ${className}`}>
      <div
        className={`h-full rounded-full transition-all duration-500 ${barClass}`}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}

/* Hand-drawn chip — a small label that looks circled in pen */
export function Chip({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border border-current/30 px-2.5 py-0.5 font-hand text-[12.5px] font-bold leading-tight ${className}`}
    >
      {children}
    </span>
  );
}

/* Screen header shared by revision pages — back + title + progress */
export function PaperHeader({
  onBack,
  eyebrow,
  title,
  right,
}: {
  onBack?: () => void;
  eyebrow: string;
  title: string;
  right?: React.ReactNode;
}) {
  return (
    <div className="sticky top-0 z-30 border-b border-[#e8e0cf] bg-[#f4efe4]/95 backdrop-blur">
      <div className="mx-auto flex max-w-2xl items-center gap-3 px-4 py-3">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="press flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#d8dde7] bg-white text-[15px] font-extrabold text-[#17324f] hover:bg-[#f2f7fd]"
            aria-label="Back"
          >
            ←
          </button>
        )}
        <div className="min-w-0 flex-1">
          <p className="truncate font-hand text-[14px] font-bold leading-none text-[#b0552f]">{eyebrow}</p>
          <p className="truncate text-[15px] font-extrabold leading-tight text-[#16305b]">{title}</p>
        </div>
        {right}
      </div>
    </div>
  );
}
