"use client";
// ConceptMap v2 — radial hand-drawn map with group halos, an animated hub and a
// clickable legend: tap a group in the legend to spotlight it, others fade.
import { useMemo, useState } from "react";
import type { ConceptMap } from "@/lib/learn/artifacts";

const GROUP_FILL = ["#d7e9f5", "#f6d5c6", "#d9f2dd", "#f3e6f7", "#fff3c9"];
const GROUP_STROKE = ["#7fa8d0", "#dd9a72", "#7cb98a", "#b58cc9", "#d4b45a"];

export function ConceptMapView({ map, accent = "#b0552f" }: { map: ConceptMap; accent?: string }) {
  const [hover, setHover] = useState<string | null>(null);
  const [spotGroup, setSpotGroup] = useState<string | null>(null);
  const W = 900, H = 620, CX = W / 2, CY = H / 2;

  const layout = useMemo(() => {
    const groups = map.groups.map((g, gi) => ({ ...g, idx: gi }));
    const byGroup = new Map<string, typeof map.nodes>();
    for (const n of map.nodes) { const l = byGroup.get(n.group) ?? []; l.push(n); byGroup.set(n.group, l); }
    const positions = new Map<string, { x: number; y: number }>();
    groups.forEach((g, gi) => {
      const base = (gi / Math.max(1, groups.length)) * Math.PI * 2 - Math.PI / 2;
      const nodes = byGroup.get(g.id) ?? [];
      const spread = Math.min(1.2, 0.46 * nodes.length);
      nodes.forEach((n, ni) => {
        const a = base + (nodes.length === 1 ? 0 : (ni / (nodes.length - 1) - 0.5) * spread);
        const r = 168 + (ni % 3) * 64;
        positions.set(n.id, { x: CX + Math.cos(a) * r * 1.25, y: CY + Math.sin(a) * r * 0.92 });
      });
    });
    return { groups, positions };
  }, [map, CX, CY]);

  const groupIdx = (gid: string) => layout.groups.findIndex(g => g.id === gid);
  const dimmed = (gid: string) => spotGroup !== null && gid !== spotGroup;

  return (
    <div className="w-full">
      <div className="doodle-paper relative overflow-hidden rounded-2xl border border-[#dbe4f0] shadow-[inset_0_1px_0_#fff]">
        <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label={`Concept map: ${map.center}`}>
          {/* group halos — soft organic blobs behind each cluster */}
          {layout.groups.map((g, gi) => {
            const pts = (map.nodes ?? []).filter(n => n.group === g.id).map(n => layout.positions.get(n.id)).filter(Boolean) as { x: number; y: number }[];
            if (pts.length === 0) return null;
            const cx = pts.reduce((s, p) => s + p.x, 0) / pts.length;
            const cy = pts.reduce((s, p) => s + p.y, 0) / pts.length;
            const rx = Math.max(...pts.map(p => Math.abs(p.x - cx))) + 84;
            const ry = Math.max(...pts.map(p => Math.abs(p.y - cy))) + 46;
            const isDim = dimmed(g.id);
            return (
              <ellipse key={`halo-${g.id}`} cx={cx} cy={cy} rx={rx} ry={ry}
                fill={GROUP_FILL[gi % GROUP_FILL.length]} opacity={isDim ? 0.14 : 0.30}
                stroke={GROUP_STROKE[gi % GROUP_STROKE.length]} strokeWidth="1.4" strokeDasharray="3 6" strokeLinecap="round"
                style={{ transition: "opacity .3s ease" }} />
            );
          })}

          {/* edges */}
          {map.edges.map((e, i) => {
            const a = layout.positions.get(e.from), b = layout.positions.get(e.to);
            if (!a || !b) return null;
            const ga = map.nodes.find(n => n.id === e.from)?.group ?? "";
            const isDim = dimmed(ga);
            const mx = (a.x + b.x) / 2 + ((i % 3) - 1) * 26, my = (a.y + b.y) / 2 + ((i % 2) - 0.5) * 30;
            const active = hover !== null && (hover === e.from || hover === e.to);
            return (
              <g key={i} style={{ transition: "opacity .3s ease" }} opacity={isDim ? 0.15 : 1}>
                <path d={`M${a.x},${a.y} Q${mx},${my} ${b.x},${b.y}`} fill="none"
                  stroke={active ? accent : "#9db8d4"} strokeWidth={active ? 2.6 : 1.7} strokeLinecap="round"
                  className={active ? "sketch-line" : ""} />
                {e.label && !isDim && (
                  <text x={mx} y={my - 6} textAnchor="middle" fontSize="11" fill="#8a94a8" fontFamily="var(--font-hand)"
                    transform={`rotate(${((i * 23) % 5) - 2} ${mx} ${my})`}>{e.label}</text>
                )}
              </g>
            );
          })}

          {/* center hub — double ring + slow pulse */}
          <g style={{ transition: "opacity .3s ease" }}>
            <ellipse cx={CX} cy={CY} rx={Math.max(74, map.center.length * 7.2)} ry="44" fill="#16305b" stroke="#214F78" strokeWidth="3" />
            <text x={CX} y={CY + 7} textAnchor="middle" fontSize="19" fontWeight="800" fill="#ffffff" fontFamily="var(--font-manrope)">{map.center}</text>
            <ellipse cx={CX} cy={CY} rx={Math.max(80, map.center.length * 7.2 + 6)} ry="50" fill="none" stroke={accent} strokeWidth="1.6" strokeDasharray="5 6" className="sketch-line" opacity="0.75" />
          </g>

          {/* nodes */}
          {map.nodes.map((n, i) => {
            const p = layout.positions.get(n.id); if (!p) return null;
            const gi = groupIdx(n.group); const w = Math.max(84, n.label.length * 8.4);
            const active = hover === n.id;
            const isDim = dimmed(n.group);
            return (
              <g key={n.id} opacity={isDim ? 0.18 : 1}
                onMouseEnter={() => setHover(n.id)} onMouseLeave={() => setHover(null)}
                style={{ cursor: "default", transition: "opacity .3s ease" }}
                transform={`rotate(${((i * 31) % 5) - 2} ${p.x} ${p.y})`}>
                <rect x={p.x - w / 2 + 2} y={p.y - 17} width={w} height={38} rx="19" fill="#16305b" opacity={active ? 0.16 : 0.08} />
                <rect x={p.x - w / 2} y={p.y - 19} width={w} height={38} rx="19"
                  fill={active ? "#ffffff" : GROUP_FILL[gi % GROUP_FILL.length]}
                  stroke={GROUP_STROKE[gi % GROUP_STROKE.length]} strokeWidth={active ? 3 : 2}
                  style={{ transition: "fill .2s ease, stroke-width .2s ease" }} />
                <text x={p.x} y={p.y + 5} textAnchor="middle" fontSize="13" fontWeight="700" fill="#2b3a67" fontFamily="var(--font-manrope)">{n.label}</text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* legend — clickable spotlights */}
      <div className="mt-2.5 flex flex-wrap items-center justify-center gap-2">
        {layout.groups.map((g, i) => {
          const isSpot = spotGroup === g.id;
          return (
            <button key={g.id} type="button"
              onClick={() => setSpotGroup(isSpot ? null : g.id)}
              className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-[12px] font-bold transition ${isSpot ? "border-[#16305b] bg-white text-[#16305b] shadow-[0_2px_8px_rgba(16,43,76,0.14)]" : "border-transparent bg-white/60 text-[#637c96] hover:bg-white"}`}>
              <span className="inline-block h-3 w-5 rounded-full" style={{ background: GROUP_FILL[i % GROUP_FILL.length], border: `2px solid ${GROUP_STROKE[i % GROUP_STROKE.length]}` }} aria-hidden />
              {g.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
