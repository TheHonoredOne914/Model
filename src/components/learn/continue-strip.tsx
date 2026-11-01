"use client";

// ContinueStrip — personalised "jahan chhoda tha wahin se" row for the Learn hub.
// Reads the per-chapter progress (localStorage saathy.learn.*) and links back in.
import { useEffect, useState } from "react";
import Link from "next/link";
import { Play } from "lucide-react";
import { BOOKS, chaptersOf } from "@/lib/learn/artifacts";

interface LastSpot { book: string; bookName: string; ch: number; title: string; accent: string; }

export function ContinueStrip() {
  const [spot, setSpot] = useState<LastSpot | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      await Promise.resolve();
      if (!alive) return;
      try {
        let best: { key: string; ts: number } | null = null;
        for (let i = 0; i < localStorage.length; i++) {
          const k = localStorage.key(i);
          if (!k || !k.startsWith("saathy.learn.") || k.endsWith(".ts")) continue;
          const ts = Number(localStorage.getItem(`${k}.ts`) ?? 0);
          if (ts > 0 && (!best || ts > best.ts)) best = { key: k, ts };
        }
        if (!best) return;
        const parts = best.key.split("."); // saathy.learn.<book>.<ch>
        const book = parts[2];
        const ch = Number(parts[3]);
        const info = BOOKS.find((b) => b.key === book);
        const chapter = chaptersOf(book).find((c) => c.chapter === ch);
        if (info && chapter) setSpot({ book, bookName: info.name, ch, title: chapter.title, accent: info.cover });
      } catch { /* private mode */ }
    })();
    return () => { alive = false; };
  }, []);

  if (!spot) return null;
  return (
    <Link
      href={`/learn/${spot.book}/${spot.ch}`}
      className="mod-card mod-learn rise-in mb-6 flex items-center gap-3 rounded-2xl border border-[#cfe8d6] bg-white p-4 shadow-[0_4px_14px_rgba(16,43,76,0.07)]"
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white shadow-[0_4px_10px_rgba(16,43,76,0.18)]" style={{ background: spot.accent }}>
        <Play className="h-5 w-5" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-hand text-[16px] font-bold text-[#b0552f]">Wahin se chalu karein — jahan chhoda tha</span>
        <span className="block truncate text-[13px] font-extrabold text-[#16305b]">Ch {spot.ch}: {spot.title}</span>
        <span className="block truncate text-[11.5px] font-bold text-[#8a94a8]">{spot.bookName}</span>
      </span>
      <span className="mod-goto shrink-0 font-hand text-[14px] font-bold text-[#3e7d4d]">jari rakho →</span>
    </Link>
  );
}
