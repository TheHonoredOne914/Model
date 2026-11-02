"use client";

import { DATA } from "@/lib/revision";
import { Html, Chip } from "./atoms";
import { MoonStar, Zap, ShieldCheck, Timer, Heart, ArrowLeft } from "lucide-react";

/* Exam Morning Power Page — one bright revision sheet for the exam morning */
export function PowerPage({ onBack }: { onBack: () => void }) {
  const f = DATA.final;
  return (
    <div className="mx-auto w-full max-w-lg px-4 pb-28 pt-4 sm:max-w-2xl">
      <div className="rise-in relative paper-sheet dog-ear rounded-2xl px-5 py-6 shadow-[0_14px_34px_rgba(16,43,76,0.13)] sm:px-7">
        <div className="tape tape-mint left-6 top-[-12px]" aria-hidden />
        <div className="paper-body">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#eef8f0] text-[#3e7d4d]">
              <MoonStar className="h-5 w-5" />
            </div>
            <div>
              <p className="font-hand text-[19px] font-bold text-[#16305b]">{f.title}</p>
              <p className="font-note text-[12px] font-semibold text-[#5a6b8c]">Subah sirf ye page — 3 baar padho, phir exam dené jao</p>
            </div>
          </div>
          <p className="mt-3 font-note text-[13.5px] leading-relaxed text-[#3f4d6b]">
            <Html html={f.body} />
          </p>
        </div>
      </div>

      <h2 className="mb-3 mt-7 flex items-center gap-2 px-1 font-hand text-[17px] font-bold text-[#16305b]">
        <Zap className="h-4 w-4 text-[#e5762f]" /> 12 Killer formulas
      </h2>
      <div className="space-y-2">
        {f.formulas.map((x, i) => (
          <div key={i} className="doodle-paper rise-in flex items-start gap-3 rounded-2xl border border-[#dbe4f0] p-4 shadow-[0_2px_8px_rgba(16,43,76,0.06)]" style={{ animationDelay: `${i * 40}ms` }}>
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#fff1e7] font-hand text-[14px] font-bold text-[#b0552f]">
              {i + 1}
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-hand text-[18px] font-bold leading-relaxed text-[#16305b]">
                <Html html={x.f} />
              </p>
              <div className="mt-1.5 flex items-start gap-2">
                <Chip className="shrink-0 text-[#2a5298]">{x.ch}</Chip>
                <p className="font-note text-[12px] leading-relaxed text-[#5a6b8c]">
                  <Html html={x.use} />
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h2 className="mb-3 mt-7 flex items-center gap-2 px-1 font-hand text-[17px] font-bold text-[#16305b]">
        <ShieldCheck className="h-4 w-4 text-[#3e7d4d]" /> Exam hall ke 8 rules
      </h2>
      <div className="space-y-2">
        {f.rules.map((r, i) => (
          <div key={i} className="paper-lite rise-in flex gap-3 rounded-2xl border border-[#e4d9c8] p-4" style={{ animationDelay: `${i * 40}ms` }}>
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-[#eef8f0] font-hand text-[13px] font-bold text-[#3e7d4d]">
              {i + 1}
            </span>
            <p className="font-note text-[13px] leading-relaxed text-[#3f4d6b]">
              <Html html={r} />
            </p>
          </div>
        ))}
      </div>

      <h2 className="mb-3 mt-7 flex items-center gap-2 px-1 font-hand text-[17px] font-bold text-[#16305b]">
        <Timer className="h-4 w-4 text-[#7a4a9e]" /> Subah ka 10-minute drill
      </h2>
      <ol className="space-y-2">
        {f.drill.map((d, i) => (
          <li key={i} className="rise-in flex gap-3 rounded-2xl border border-[#e4d0f0] bg-[#faf3fd] p-4" style={{ animationDelay: `${i * 40}ms` }}>
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-[#f3e8fb] font-hand text-[13px] font-bold text-[#7a4a9e]">
              {i + 1}
            </span>
            <p className="font-note text-[13px] leading-relaxed text-[#3f4d6b]">
              <Html html={d} />
            </p>
          </li>
        ))}
      </ol>

      <div className="sticky-note sticky-lemon mt-6 rotate-[-0.6deg] p-6 text-center">
        <Heart className="mx-auto h-6 w-6 text-[#b0552f]" />
        <p className="mt-3 font-hand text-[16px] leading-relaxed text-[#7a4a22]">
          <Html html={f.pep} />
        </p>
        <p className="mt-3 font-hand text-[26px] font-bold text-[#b0552f]">80/80 is yours.</p>
      </div>

      <button
        type="button"
        onClick={onBack}
        className="press mx-auto mt-6 flex items-center gap-1.5 rounded-full border border-[#d8dde7] bg-white px-5 py-2.5 text-[13px] font-extrabold text-[#17324f] transition-colors hover:bg-[#f2f7fd]"
      >
        <ArrowLeft className="h-4 w-4" /> Chapters pe wapas
      </button>
    </div>
  );
}
