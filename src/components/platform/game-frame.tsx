"use client";

// GameFrame — full-screen theatre for the four real VidhyaSaathy games.
// The whole desk becomes the game: a slim notebook top bar (back to games,
// title, live XP chip) and the game itself in a frame below. Esc exits too.
import { useEffect, useState } from "react";
import { Gamepad2, Loader2, Trophy, X } from "lucide-react";
import { getXp, XP_EVENT } from "@/lib/saathy-progress";
import { playFlick, playPageFlip } from "@/lib/platform/sound";

export interface BigGame {
  key: string;
  name: string;
  tagline: string;
  /** URL the game lives at (static /games/*.html or the React /wars/play) */
  src: string;
  accent: string;
  chip: string;
}

export function GameFrame({ game, onExit }: { game: BigGame; onExit: () => void }) {
  const [loaded, setLoaded] = useState(false);
  const [xp, setXp] = useState(0);

  useEffect(() => {
    setXp(getXp());
    const onXp = () => setXp(getXp());
    window.addEventListener(XP_EVENT, onXp);
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onExit(); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener(XP_EVENT, onXp);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onExit]);

  const exit = () => { playPageFlip(); onExit(); };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#0b1030]" role="dialog" aria-label={`${game.name} — playing`}>
      {/* notebook top bar */}
      <div className="relative flex shrink-0 items-center gap-3 border-b border-[#D8DDE7] bg-[#FFF9F5] px-3 py-2.5 sm:px-5">
        <button
          onClick={exit}
          onMouseEnter={playFlick}
          className="inline-flex items-center gap-1.5 rounded-full border border-[#D8DDE7] bg-white px-3.5 py-1.5 text-xs font-extrabold text-[#214F78] shadow-[0_6px_16px_-10px_rgba(16,43,76,.6)] transition hover:border-[#A9CEE8] active:scale-[.97]"
        >
          <X className="h-3.5 w-3.5" /> Exit game
        </button>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-extrabold leading-tight text-[#102B4C]">
            {game.name}
            <span className="ml-2 hidden text-[11px] font-bold uppercase tracking-[0.14em] sm:inline" style={{ color: game.accent }}>
              {game.tagline}
            </span>
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#e7d9a8] bg-[#fffbee] px-3 py-1.5 text-xs font-extrabold text-[#a0761b]">
          <Trophy className="h-3.5 w-3.5 text-[#c9a227]" /> {xp} XP
        </span>
        {/* washi tape corners */}
        <span className="pointer-events-none absolute -left-4 top-0 hidden h-6 w-16 rotate-[-8deg] rounded-sm bg-[#F6D5C6]/80 sm:block" aria-hidden />
        <span className="pointer-events-none absolute -right-5 top-1 hidden h-6 w-14 rotate-[7deg] rounded-sm bg-[#A9CEE8]/70 sm:block" aria-hidden />
      </div>

      {/* the game */}
      <div className="relative min-h-0 flex-1 bg-[#0b1030]">
        {!loaded && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-[#0b1030] text-white">
            <Gamepad2 className="h-10 w-10 animate-bounce text-[#F6D5C6]" />
            <p className="text-sm font-extrabold">Loading {game.name}…</p>
            <p className="flex items-center gap-1.5 text-xs font-semibold text-white/60">
              <Loader2 className="h-3.5 w-3.5 animate-spin" /> pen pack, dice, syllabus — sab ready kar rahe hain
            </p>
          </div>
        )}
        <iframe
          src={game.src}
          title={game.name}
          onLoad={() => setLoaded(true)}
          className="h-full w-full border-0"
          allow="fullscreen; autoplay; gamepad"
        />
      </div>
    </div>
  );
}
