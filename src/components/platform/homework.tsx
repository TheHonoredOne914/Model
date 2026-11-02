"use client";

// Homework — teacher-assigned sets with real due dates; "Start" opens the
// linked chapter module; "Mark done" banks the XP.
import { useEffect, useState } from "react";
import { CalendarDays, CheckCircle2, Clock, Play } from "lucide-react";
import { getHomework, overdue, setHwDone, type HomeworkItem } from "@/lib/platform/store";
import { addXp } from "@/lib/saathy-progress";
import { playChime } from "@/lib/platform/sound";

export function Homework({ openChapter }: { openChapter: (book: "gm" | "sc" | "us", chapter: number) => void }) {
  const [hw, setHw] = useState<HomeworkItem[]>([]);
  const [filter, setFilter] = useState<"todo" | "done" | "all">("todo");

  useEffect(() => {
    const r = () => setHw(getHomework());
    r();
    window.addEventListener("vs.platform", r);
    return () => window.removeEventListener("vs.platform", r);
  }, []);

  const late = new Set(overdue(hw).map(h => h.id));
  const list = hw.filter(h => filter === "all" || h.status === filter);
  const today = new Date().toISOString().slice(0, 10);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-[family-name:var(--font-hand)] text-3xl text-[#17324F]">Homework</h1>
          <p className="text-sm text-[#637C96]">Assigned by your teachers. Finish on time, bank the XP.</p>
        </div>
        <div className="flex rounded-xl border border-[#D8DDE7] bg-white p-1">
          {(["todo", "done", "all"] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-lg px-3.5 py-1.5 text-xs font-extrabold capitalize transition ${
                filter === f ? "bg-[#102B4C] text-white" : "text-[#637C96] hover:text-[#17324F]"
              }`}
            >
              {f} {f === "todo" && `(${hw.filter(h => h.status === "todo").length})`}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {list.map(h => (
          <section
            key={h.id}
            className={`relative overflow-hidden rounded-2xl border bg-white p-5 shadow-[0_10px_30px_-22px_rgba(16,43,76,.4)] ${
              late.has(h.id) ? "border-[#e8b09a]" : "border-[#D8DDE7]"
            }`}
          >
            {late.has(h.id) && <div className="absolute inset-x-0 top-0 h-1 bg-[#F6D5C6]" aria-hidden />}
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-[#EFF6FC] px-2 py-0.5 text-[11px] font-extrabold text-[#214F78]">{h.subject}</span>
              {late.has(h.id) && <span className="rounded-md bg-[#F6D5C6] px-2 py-0.5 text-[11px] font-extrabold text-[#a0522d]">OVERDUE</span>}
              {h.status === "done" && <CheckCircle2 className="h-4 w-4 text-[#5fae6f]" />}
              <span className="ml-auto text-xs font-extrabold text-[#c9a227]">+{h.xp} XP</span>
            </div>
            <h3 className="mt-2.5 text-[15px] font-extrabold text-[#102B4C]">{h.title}</h3>
            <p className="mt-1 text-[13px] leading-relaxed text-[#637C96]">{h.detail}</p>
            <div className="mt-4 flex flex-wrap items-center gap-2.5">
              <button
                onClick={() => openChapter(h.bookKey, h.chapter)}
                className="inline-flex items-center gap-2 rounded-xl bg-[#F6D5C6] px-4 py-2 text-[13px] font-bold text-[#17324F] shadow-[inset_0_0_0_1.5px_rgba(173,108,80,.35)] transition hover:bg-[#F3C6B2] active:scale-[.98]"
              >
                <Play className="h-3.5 w-3.5" /> Start
              </button>
              {h.status === "todo" ? (
                <button
                  onClick={() => { setHwDone(h.id, true); addXp(h.xp); playChime(); }}
                  className="inline-flex items-center gap-2 rounded-xl border border-[#5fae6f] bg-[#e3f2e6] px-4 py-2 text-[13px] font-bold text-[#2f7a44] transition hover:bg-[#d9ecdd] active:scale-[.98]"
                >
                  <CheckCircle2 className="h-3.5 w-3.5" /> Mark done
                </button>
              ) : (
                <button
                  onClick={() => setHwDone(h.id, false)}
                  className="inline-flex items-center gap-2 rounded-xl border border-[#D8DDE7] px-4 py-2 text-[13px] font-semibold text-[#637C96] transition hover:bg-[#FFF9F5]"
                >
                  Undo
                </button>
              )}
              <span className="ml-auto flex items-center gap-1.5 text-[11px] font-semibold text-[#637C96]">
                <CalendarDays className="h-3.5 w-3.5" />
                {new Date(h.assigned).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                {" → "}
                <span className={h.due < today && h.status === "todo" ? "text-[#a0522d]" : ""}>
                  {new Date(h.due).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                </span>
                {h.due === today && h.status === "todo" && <Clock className="h-3 w-3 text-[#a0522d]" />}
              </span>
            </div>
          </section>
        ))}
      </div>
      {!list.length && (
        <div className="rounded-2xl border border-dashed border-[#D8DDE7] bg-[#FFFDF6] p-10 text-center">
          <p className="font-[family-name:var(--font-hand)] text-2xl text-[#17324F]">All clear here</p>
          <p className="mt-1 text-sm text-[#637C96]">Nothing in this pile. Ask Saathy for a challenge instead.</p>
        </div>
      )}
    </div>
  );
}
