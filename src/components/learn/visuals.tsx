"use client";
// VisualBoard v2 — renders a slide's VisualSpec as proper hand-sketched
// diagrams: numbered pipelines with arrows, VS comparison columns, tree
// connectors, labelled chips and gridded plots. Notebook style throughout.
import type { VisualSpec } from "@/lib/learn/artifacts";

export function VisualBoard({ visual, accent = "#b0552f" }: { visual: VisualSpec; accent?: string }) {
  if (!visual) return null;
  switch (visual.kind) {
    case "steps":
      return (
        <div className="flex flex-wrap items-stretch gap-1.5">
          {visual.items.map((t, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <div className="paper-lite flex min-h-[64px] max-w-[220px] items-center rounded-xl border-2 px-3 py-2 text-[13px] font-semibold leading-snug shadow-[0_3px_10px_rgba(16,43,76,0.10)] transition hover:-translate-y-0.5" style={{ borderColor: `${accent}55` }}>
                <span className="flex items-center gap-2">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[12px] font-extrabold text-white" style={{ background: accent, fontFamily: "var(--font-manrope)" }}>{i + 1}</span>
                  <span>{t}</span>
                </span>
              </div>
              {i < visual.items.length - 1 && (
                <svg width="26" height="14" viewBox="0 0 26 14" aria-hidden className="shrink-0">
                  <path d="M2,7 Q10,3 20,7" fill="none" stroke={accent} strokeWidth="2" strokeLinecap="round" className="sketch-line" />
                  <path d="M17,3.5 L22,7 L17,10.5" fill="none" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
          ))}
        </div>
      );
    case "compare":
      return (
        <div className="relative grid grid-cols-1 gap-3 sm:grid-cols-2">
          {[visual.left, visual.right].map((col, c) => (
            <div key={c} className={`paper-lite relative rounded-xl border-2 p-3 shadow-[0_3px_10px_rgba(16,43,76,0.10)] transition hover:-translate-y-0.5 ${c === 0 ? "border-[#7fa8d0]" : "border-[#dd9a72]"}`}>
              <p className="font-hand text-lg font-bold" style={{ color: c === 0 ? "#2a5298" : "#b0552f" }}>{col.title}</p>
              <ul className="mt-1.5 space-y-1.5">
                {col.items.map((it, i) => (
                  <li key={i} className="flex gap-1.5 text-[13px] font-semibold leading-snug text-[#2b3a67]">
                    <span className="mt-[3px] inline-block h-2 w-2 shrink-0 rounded-full" style={{ background: c === 0 ? "#7fa8d0" : "#dd9a72" }} />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <span aria-hidden className="font-hand absolute left-1/2 top-1/2 z-10 hidden h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-[#e4d9c8] bg-[#fffaf0] text-[14px] font-bold text-[#7a5a2e] shadow-[0_3px_10px_rgba(16,43,76,0.14)] sm:flex">VS</span>
        </div>
      );
    case "flow":
      return (
        <div className="paper-lite rounded-xl border-2 border-[#b9d4ea] px-3.5 py-3">
          <div className="flex flex-wrap items-center gap-1.5">
            {visual.items.map((t, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <div className="rounded-lg border-2 bg-white px-3 py-2 text-[12.5px] font-bold text-[#17324f] shadow-[0_2px_6px_rgba(16,43,76,0.10)] transition hover:-translate-y-0.5" style={{ borderColor: i === visual.items.length - 1 ? "#9fd8a8" : "#b9d4ea" }}>{t}</div>
                {i < visual.items.length - 1 && <span aria-hidden className="font-hand text-lg" style={{ color: accent }}>→</span>}
              </div>
            ))}
          </div>
        </div>
      );
    case "labels":
      return (
        <div className="flex flex-wrap gap-2">
          {visual.items.map((t, i) => (
            <span key={i} className="rounded-full border border-[#e3d9c6] bg-[#fffaf0] px-3.5 py-2 text-[12.5px] font-bold text-[#7a5a2e] shadow-[0_2px_6px_rgba(16,43,76,0.08)] transition hover:-translate-y-0.5 hover:shadow-[0_5px_12px_rgba(16,43,76,0.14)]" style={{ transform: `rotate(${((i * 37) % 7) - 3}deg)` }}>{t}</span>
          ))}
        </div>
      );
    case "tree":
      return (
        <div className="flex flex-col items-center">
          <div className="rounded-xl border-2 bg-white px-4 py-2 text-[13.5px] font-extrabold text-[#16305b] shadow-[0_3px_10px_rgba(16,43,76,0.14)]" style={{ borderColor: accent }}>{visual.root}</div>
          {/* connector trunk */}
          <svg width="16" height="26" viewBox="0 0 16 26" aria-hidden><path d="M8,2 L8,20" stroke={accent} strokeWidth="2" strokeLinecap="round" className="sketch-line" /></svg>
          <div className="relative flex flex-wrap justify-center gap-2 pt-1.5">
            {/* horizontal spread line */}
            <span aria-hidden className="absolute -top-0 left-6 right-6 h-px" style={{ background: `repeating-linear-gradient(90deg, ${accent} 0 5px, transparent 5px 9px)` }} />
            {visual.children.map((t, i) => (
              <div key={i} className="flex flex-col items-center">
                <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden><path d="M6,0 L6,8" stroke={accent} strokeWidth="1.6" strokeLinecap="round" strokeDasharray="2.5 2.5" /></svg>
                <div className="rounded-lg border border-[#d8dde7] bg-[#f4f9ff] px-3 py-1.5 text-[12.5px] font-semibold text-[#2a5298] transition hover:-translate-y-0.5 hover:shadow-[0_4px_10px_rgba(16,43,76,0.10)]">{t}</div>
              </div>
            ))}
          </div>
        </div>
      );
    case "plot": {
      const pts = visual.points.filter(p => p.length >= 2 && Number.isFinite(p[0]) && Number.isFinite(p[1]));
      if (pts.length < 2) return null;
      const W = 460, H = 230, PAD = 40;
      const xs = pts.map(p => p[0]), ys = pts.map(p => p[1]);
      const x0 = Math.min(...xs), x1 = Math.max(...xs), y0 = Math.min(...ys), y1 = Math.max(...ys);
      const sx = (x: number) => PAD + ((x - x0) / (x1 - x0 || 1)) * (W - PAD - 16);
      const sy = (y: number) => H - PAD - ((y - y0) / (y1 - y0 || 1)) * (H - PAD - 20);
      // light grid behind the data
      const gridXs = Array.from({ length: 5 }, (_, g) => PAD + (g * (W - PAD - 16)) / 4);
      const gridYs = Array.from({ length: 4 }, (_, g) => 16 + (g * (H - PAD - 16)) / 3);
      const grid = (
        <g aria-hidden>
          {gridXs.map((gx, g) => <line key={`gx${g}`} x1={gx} y1={14} x2={gx} y2={H - PAD} stroke="#cfe0ef" strokeWidth="1" strokeDasharray="3 4" />)}
          {gridYs.map((gy, g) => <line key={`gy${g}`} x1={PAD} y1={gy} x2={W - 12} y2={gy} stroke="#cfe0ef" strokeWidth="1" strokeDasharray="3 4" />)}
        </g>
      );
      if (visual.type === "bar") {
        const bw = (W - PAD - 16) / pts.length * 0.58;
        return (
          <div className="paper-lite rounded-xl border-2 border-[#b9d4ea] p-3">
            <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-[540px]" role="img" aria-label={`${visual.ylabel} vs ${visual.xlabel}`}>
              {grid}
              <line x1={PAD} y1={H - PAD} x2={W - 8} y2={H - PAD} stroke={accent} strokeWidth="1.6" strokeLinecap="round" />
              <line x1={PAD} y1={12} x2={PAD} y2={H - PAD} stroke={accent} strokeWidth="1.6" strokeLinecap="round" />
              {pts.map((p, i) => (
                <g key={i}>
                  <rect x={sx(p[0]) - bw / 2} y={sy(p[1])} width={bw} height={H - PAD - sy(p[1])} rx="4" fill="#d7e9f5" stroke="#7fb3ff" strokeWidth="1.6" className="bar-in" style={{ animationDelay: `${i * 80}ms`, transformOrigin: `0px ${H - PAD}px` }} />
                  <text x={sx(p[0])} y={sy(p[1]) - 6} textAnchor="middle" fontSize="10.5" fontWeight="800" fill="#2a5298" fontFamily="var(--font-manrope)">{p[1]}</text>
                  <text x={sx(p[0])} y={H - PAD + 15} textAnchor="middle" fontSize="10" fill="#637c96" fontFamily="var(--font-manrope)">{p[0]}</text>
                </g>
              ))}
              <text x={W / 2} y={H - 6} textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#637c96" fontFamily="var(--font-manrope)">{visual.xlabel}</text>
              <text x={13} y={H / 2} textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#637c96" transform={`rotate(-90 13 ${H / 2})`} fontFamily="var(--font-manrope)">{visual.ylabel}</text>
            </svg>
          </div>
        );
      }
      const path = pts.map((p, i) => `${i === 0 ? "M" : "L"}${sx(p[0]).toFixed(1)},${sy(p[1]).toFixed(1)}`).join(" ");
      const area = `${path} L${sx(pts[pts.length - 1][0]).toFixed(1)},${H - PAD} L${sx(pts[0][0]).toFixed(1)},${H - PAD} Z`;
      return (
        <div className="paper-lite rounded-xl border-2 border-[#b9d4ea] p-3">
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-[540px]" role="img" aria-label={`${visual.ylabel} vs ${visual.xlabel}`}>
            {grid}
            <line x1={PAD} y1={H - PAD} x2={W - 8} y2={H - PAD} stroke={accent} strokeWidth="1.6" strokeLinecap="round" />
            <line x1={PAD} y1={12} x2={PAD} y2={H - PAD} stroke={accent} strokeWidth="1.6" strokeLinecap="round" />
            <path d={area} fill={accent} opacity="0.08" />
            <path d={path} fill="none" stroke="#2a5298" strokeWidth="2.6" strokeLinecap="round" className="draw-path" pathLength={100} />
            {pts.map((p, i) => (
              <g key={i}>
                <circle cx={sx(p[0])} cy={sy(p[1])} r="4.2" fill="#fff" stroke={accent} strokeWidth="2.2" className="dot-in" style={{ animationDelay: `${i * 90}ms` }} />
                <text x={sx(p[0])} y={sy(p[1]) - 9} textAnchor="middle" fontSize="10" fontWeight="800" fill="#2a5298" fontFamily="var(--font-manrope)">{p[1]}</text>
                <text x={sx(p[0])} y={H - PAD + 15} textAnchor="middle" fontSize="10" fill="#637c96" fontFamily="var(--font-manrope)">{p[0]}</text>
              </g>
            ))}
            <text x={W / 2} y={H - 6} textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#637c96" fontFamily="var(--font-manrope)">{visual.xlabel}</text>
            <text x={13} y={H / 2} textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#637c96" transform={`rotate(-90 13 ${H / 2})`} fontFamily="var(--font-manrope)">{visual.ylabel}</text>
          </svg>
        </div>
      );
    }
  }
}
