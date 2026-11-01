"use client";
// FlowChartView v2 — a crisp, readable chapter journey map.
// Rounded "station" nodes, smooth curved connectors with real arrowheads,
// animated draw-in, and a detail card that springs open under the node.
import { useMemo, useState } from "react";
import type { FlowChart } from "@/lib/learn/artifacts";

const INK = "#17324f";
const NODE_W = 190;
const NODE_H = 62;
const COLS = 3;
const GAP_X = 250;
const ROW_H = 132;

export function FlowChartView({ chart, accent = "#b0552f" }: { chart: FlowChart; accent?: string }) {
  const [open, setOpen] = useState<number | null>(null);

  // snake layout: rows of COLS, alternate direction so the path "snakes"
  const layout = useMemo(() => {
    const rows: number[][] = [];
    chart.steps.forEach((_, i) => { const r = Math.floor(i / COLS); if (!rows[r]) rows[r] = []; rows[r].push(i); });
    const pos = chart.steps.map((_, i) => {
      const r = Math.floor(i / COLS), c = i % COLS;
      const col = r % 2 === 0 ? c : COLS - 1 - c;
      return { x: 20 + col * GAP_X, y: 30 + r * ROW_H };
    });
    const w = 20 + (COLS - 1) * GAP_X + NODE_W + 20;
    const h = 30 + (rows.length - 1) * ROW_H + NODE_H + 74;
    return { pos, w, h };
  }, [chart.steps]);

  // build one smooth path per edge, snake-direction aware
  const edgePath = (a: number, b: number) => {
    const p1 = layout.pos[a], p2 = layout.pos[b];
    if (!p1 || !p2) return null;
    const ax = p1.x + NODE_W / 2, ay = p1.y;
    const bx = p2.x + NODE_W / 2, by = p2.y;
    if (ay === by) {
      // same row → straight-ish horizontal with a soft bow
      const dir = bx > ax ? 1 : -1;
      const m1x = ax + dir * (NODE_W / 2 + 8), m2x = bx - dir * (NODE_W / 2 + 8);
      return `M${m1x},${ay} C${(m1x + m2x) / 2},${ay - 26} ${(m1x + m2x) / 2},${by - 26} ${m2x},${by}`;
    }
    // vertical hop → S-curve out of the bottom, into the top
    const outY = ay + 30, inY = by - 30;
    return `M${ax},${outY} C${ax},${(outY + inY) / 2} ${bx},${(outY + inY) / 2} ${bx},${inY}`;
  };

  const title = chart.title.length > 46 ? chart.title.slice(0, 44) + "…" : chart.title;

  return (
    <div className="w-full">
      <div className="doodle-paper relative overflow-hidden rounded-2xl border border-[#dbe4f0] shadow-[inset_0_1px_0_#fff]">
        <svg viewBox={`0 0 ${layout.w} ${layout.h}`} className="block h-auto w-full" role="img" aria-label={chart.title}>
          <defs>
            <marker id="fc-arrow" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7.5" markerHeight="7.5" orient="auto-start-reverse">
              <path d="M0,0.6 L9,5 L0,9.4 Q2.6,5 0,0.6 Z" fill={accent} />
            </marker>
          </defs>

          {/* title chip */}
          <text x={layout.w / 2} y={18} textAnchor="middle" fontSize="13.5" fontWeight="800" fill="#637c96" fontFamily="var(--font-manrope)" letterSpacing="0.4">{title}</text>

          {/* edges — drawn with a marching dash so the path feels alive */}
          {chart.edges.map(([a, b], i) => {
            const d = edgePath(a, b);
            if (!d) return null;
            const active = open === a || open === b;
            return (
              <g key={`${a}-${b}`}>
                <path d={d} fill="none" stroke={active ? accent : "#9db8d4"} strokeWidth={active ? 2.6 : 2} strokeLinecap="round" markerEnd="url(#fc-arrow)" opacity={active ? 1 : 0.85} />
                <path d={d} fill="none" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" opacity="0.0" />
                <path d={d} fill="none" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeDasharray="5 7" className="sketch-line" opacity={active ? 0.9 : 0.35} />
              </g>
            );
          })}

          {/* nodes */}
          {chart.steps.map((s, i) => {
            const p = layout.pos[i];
            const isOpen = open === i;
            return (
              <g key={s.id} onClick={() => setOpen(isOpen ? null : i)} style={{ cursor: "pointer" }} role="button" aria-expanded={isOpen}>
                {/* soft shadow */}
                <rect x={p.x + 2.5} y={p.y + 4} width={NODE_W} height={NODE_H} rx="14" fill="#16305b" opacity={isOpen ? 0.18 : 0.10} />
                {/* body */}
                <rect x={p.x} y={p.y} width={NODE_W} height={NODE_H} rx="14"
                  fill={isOpen ? "#fff6ec" : "#ffffff"}
                  stroke={isOpen ? accent : "#b9d4ea"}
                  strokeWidth={isOpen ? 2.6 : 1.8}
                  style={{ transition: "fill .2s ease, stroke .2s ease" }} />
                {/* left accent bar */}
                <rect x={p.x} y={p.y} width="5" height={NODE_H} rx="2.5" fill={accent} opacity={isOpen ? 1 : 0.55} />
                {/* number chip */}
                <circle cx={p.x + 24} cy={p.y + NODE_H / 2} r="12.5" fill={isOpen ? accent : "#eef4fb"} stroke={isOpen ? "#ffffff" : "#c9d9ea"} strokeWidth="1.4" />
                <text x={p.x + 24} y={p.y + NODE_H / 2 + 4.5} textAnchor="middle" fontSize="12.5" fontWeight="800" fill={isOpen ? "#ffffff" : "#2a5298"} fontFamily="var(--font-manrope)">{i + 1}</text>
                {/* label */}
                <text x={p.x + 44} y={p.y + (s.label.length > 24 ? NODE_H / 2 - 4 : NODE_H / 2 + 4.5)}
                  fontSize="12.5" fontWeight="800" fill={INK} fontFamily="var(--font-manrope)">
                  {s.label.length > 26 ? s.label.slice(0, 24) + "…" : s.label}
                </text>
                {s.label.length > 24 && (
                  <text x={p.x + 44} y={p.y + NODE_H / 2 + 12} fontSize="10.5" fontWeight="700" fill="#637c96" fontFamily="var(--font-manrope)">
                    {s.label.slice(24, 46).length > 0 ? s.label.slice(24, 44) + (s.label.length > 44 ? "…" : "") : ""}
                  </text>
                )}
                {/* tap hint dot */}
                <circle cx={p.x + NODE_W - 14} cy={p.y + 14} r="3" fill={isOpen ? accent : "#d8dde7"}>
                  <animate attributeName="opacity" values="1;0.25;1" dur="1.8s" repeatCount="indefinite" />
                </circle>
              </g>
            );
          })}

          {/* detail card — springs open under the selected node */}
          {open !== null && chart.steps[open] && (() => {
            const p = layout.pos[open];
            const cw = Math.min(layout.w - 40, Math.max(240, NODE_W + 90));
            const cx = Math.min(Math.max(p.x + NODE_W / 2 - cw / 2, 14), layout.w - cw - 14);
            const cy = p.y + NODE_H + 8;
            return (
              <g className="fc-detail">
                <rect x={cx} y={cy} width={cw} height={58} rx="12" fill="#16305b" />
                <polygon points={`${p.x + NODE_W / 2 - 7},${cy - 0.5} ${p.x + NODE_W / 2 + 7},${cy - 0.5} ${p.x + NODE_W / 2},${cy + 7}`} fill="#16305b" />
                <text x={cx + 14} y={cy + 20} fontSize="11" fontWeight="800" fill="#a9cee8" fontFamily="var(--font-manrope)" letterSpacing="0.6">STEP {open + 1}</text>
                <foreignObject x={cx + 12} y={cy + 26} width={cw - 24} height={28}>
                  <div className="text-[11.5px] font-semibold leading-[1.25] text-white" style={{ fontFamily: "var(--font-manrope)" }}>
                    {chart.steps[open].detail}
                  </div>
                </foreignObject>
              </g>
            );
          })()}
        </svg>
      </div>
      <div className="mt-2.5 flex items-center justify-center gap-2 text-[11.5px] font-semibold text-[#8a94a8]">
        <span className="inline-block h-1.5 w-6 rounded-full" style={{ background: accent }} aria-hidden />
        kisi bhi step pe tap karo — detail khulegi
      </div>
    </div>
  );
}
