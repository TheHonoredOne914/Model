"use client";

// RevisionApp — the container for the Revision module ("Mission 80/80").
// Owns the screen state + the localStorage progress, all on the notebook desk.
import { useEffect, useState } from "react";
import Link from "next/link";
import { Target } from "lucide-react";
import {
  DATA,
  emptyProgress,
  loadProgress,
  saveProgress,
  type Progress,
} from "@/lib/revision";
import { Home } from "./home";
import { ChapterView } from "./chapter-view";
import { PowerPage } from "./power-page";
import { LovePopup } from "./atoms";

type Screen = { kind: "home" } | { kind: "chapter"; num: number } | { kind: "power" };

export function RevisionApp({ profileName }: { profileName?: string | null }) {
  const [screen, setScreen] = useState<Screen>({ kind: "home" });
  const [progress, setProgress] = useState<Progress>(emptyProgress());
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let alive = true;
    (async () => {
      await Promise.resolve();
      if (!alive) return;
      setProgress(loadProgress());
      setHydrated(true);
    })();
    return () => { alive = false; };
  }, []);
  useEffect(() => { if (hydrated) saveProgress(progress); }, [progress, hydrated]);

  const chapter = screen.kind === "chapter" ? DATA.chapters.find((c) => c.num === screen.num) : null;

  return (
    <div className="mod-revision notebook-desk min-h-screen">
      <LovePopup />

      {/* slim module header — keeps the three modules visually one family */}
      <header className="sticky top-0 z-40 border-b border-[#e8e0cf] bg-[#f4efe4]/95 backdrop-blur">
        <div className="mx-auto flex max-w-2xl items-center gap-2.5 px-4 py-2.5">
          <Link href="/" className="flex items-center gap-1.5 rounded-full border border-[#d8dde7] bg-white px-3 py-1.5 text-[12px] font-extrabold text-[#17324f] transition hover:bg-[#f2f7fd]">
            ← Saathy chat
          </Link>
          <span className="ml-auto flex items-center gap-1.5 rounded-full bg-[#fff1e7] px-3 py-1.5 font-hand text-[13px] font-bold text-[#b0552f]">
            <Target className="h-3.5 w-3.5" /> Revision module
          </span>
        </div>
      </header>

      <main>
        {screen.kind === "home" && (
          <Home
            progress={progress}
            profileName={profileName}
            onOpenChapter={(num) => setScreen({ kind: "chapter", num })}
            onOpenPower={() => setScreen({ kind: "power" })}
            onReset={() => setProgress(emptyProgress())}
          />
        )}
        {screen.kind === "chapter" && chapter && (
          <ChapterView
            chapter={chapter}
            progress={progress}
            setProgress={(fn) => setProgress((p) => fn(p))}
            onBack={() => setScreen({ kind: "home" })}
          />
        )}
        {screen.kind === "power" && <PowerPage onBack={() => setScreen({ kind: "home" })} />}
      </main>
    </div>
  );
}
