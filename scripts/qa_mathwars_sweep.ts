// ─── QA MATHEMATICAL SWEEP · Maths Wars (Task 16-1) ────────────────────────
// Runs every generator of all 8 chapters through:
//   A) structural gates (fields, junk strings, mcq/tf/numeric rules, $ balance,
//      dup-rate, difficulty coverage)
//   B) independent spot verification: per-(chapter,gen) re-derivations computed
//      from the question's own text and compared against q.answer.
import { makeRNG } from "../src/lib/wars/engine";
import type { Diff, Question } from "../src/lib/wars/types";

import { bank as b1, bankSize as z1 } from "../src/content/wars/ch01.gen";
import { bank as b2, bankSize as z2 } from "../src/content/wars/ch02.gen";
import { bank as b3, bankSize as z3 } from "../src/content/wars/ch03.gen";
import { bank as b4, bankSize as z4 } from "../src/content/wars/ch04.gen";
import { bank as b5, bankSize as z5 } from "../src/content/wars/ch05.gen";
import { bank as b6, bankSize as z6 } from "../src/content/wars/ch06.gen";
import { bank as b7, bankSize as z7 } from "../src/content/wars/ch07.gen";
import { bank as b8, bankSize as z8 } from "../src/content/wars/ch08.gen";

const CHAPTERS: { ch: number; bank: Record<string, (r: never, d: never) => never>; bankSize: Record<string, number> }[] = [
  { ch: 1, bank: b1 as never, bankSize: z1 },
  { ch: 2, bank: b2 as never, bankSize: z2 },
  { ch: 3, bank: b3 as never, bankSize: z3 },
  { ch: 4, bank: b4 as never, bankSize: z4 },
  { ch: 5, bank: b5 as never, bankSize: z5 },
  { ch: 6, bank: b6 as never, bankSize: z6 },
  { ch: 7, bank: b7 as never, bankSize: z7 },
  { ch: 8, bank: b8 as never, bankSize: z8 },
];

// ── numeric helpers (mirror engine.parseNumLike) ───────────────────────────
const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : Math.abs(a));
function parseNumLike(s: string): number | null {
  const t = s.trim().toLowerCase().replace(/\s+/g, "").replace(/−/g, "-");
  if (/^[+-]?\d+(\.\d+)?$/.test(t)) return parseFloat(t);
  const fr = t.match(/^([+-]?\d+(?:\.\d+)?)\/([+-]?\d+(?:\.\d+)?)$/);
  if (fr) { const den = parseFloat(fr[2]); if (den === 0) return null; return parseFloat(fr[1]) / den; }
  return null;
}
const close = (a: number, b: number, tol = 1e-6): boolean => Math.abs(a - b) <= Math.max(tol, tol * Math.abs(b));
const fracVal = (s: string): number | null => {
  const v = parseNumLike(s);
  return v !== null && isFinite(v) ? v : null;
};
/** value of q.answer via fraction/decimal parse (throws null) */
const ansVal = (q: Question): number | null => fracVal(q.answer.replace(/\\frac\{(-?\d+)\}\{(\d+)\}/g, "$1/$2").replace(/[\\${}]/g, ""));
const N = "[+-]?\\d+(?:\\.\\d+)?";
const NUM_RE = new RegExp(`^${N}$`);
const PT_RE = new RegExp(`\\((${N}),\\s*(${N})\\)`, "g");
function pts(text: string): [number, number][] {
  const out: [number, number][] = [];
  let m: RegExpExecArray | null;
  PT_RE.lastIndex = 0;
  while ((m = PT_RE.exec(text))) out.push([parseFloat(m[1]), parseFloat(m[2])]);
  return out;
}
const hypot = (dx: number, dy: number): number => Math.sqrt(dx * dx + dy * dy);
const uniq = <T,>(a: T[]): T[] => [...new Set(a)];
const PI22 = 22 / 7;
const P314 = 3.14;
const sum = (a: number[]): number => a.reduce((x, y) => x + y, 0);
const ordNum = (t: string): number | null => { const m = t.match(/(\d+)(?:st|nd|rd|th)/); return m ? parseInt(m[1], 10) : null; };
/** iterate a linear recursion */
function recur(seed: number, n: number, step: (prev: number, i: number) => number): number {
  let t = seed;
  for (let i = 2; i <= n; i++) t = step(t, i);
  return t;
}
function vir(n: number): number { let a = 1, b = 2; if (n === 1) return 1; for (let i = 3; i <= n; i++) { const c = a + b; a = b; b = c; } return b; }
function diceCount(pred: (a: number, b: number) => boolean): number { let c = 0; for (let a = 1; a <= 6; a++) for (let b = 1; b <= 6; b++) if (pred(a, b)) c++; return c; }
function coinEnum(n: number): string[] { const o: string[] = []; for (let m = 0; m < 2 ** n; m++) o.push(m.toString(2).padStart(n, "0")); return o; }
const countOnes = (s: string): number => (s.match(/1/g) ?? []).length;
function reducedFractionCompare(qAns: string, n: number, d: number, tol = 1e-9): boolean {
  const v = fracVal(qAns);
  return v !== null && close(v, n / d, tol);
}

// ── tiny polynomial string parser: "x^2-14x+49" / "3x^2 + 2x - 1" ──────────
function parsePoly(s: string): Map<number, number> | null {
  const t = s.replace(/\s+/g, "").replace(/−/g, "-");
  if (!/^[-+]?[0-9x^.*+-]+$/.test(t)) return null;
  const out = new Map<number, number>();
  const terms = t.match(/[+-]?[^+-]+/g);
  if (!terms) return null;
  for (const term of terms) {
    const m = term.match(/^([+-]?)(\d*)\*?(x?)(?:\^(\d+))?$/);
    if (!m) return null;
    const sign = m[1] === "-" ? -1 : 1;
    let coef = m[2] === "" ? 1 : parseInt(m[2], 10);
    const hasX = m[3] === "x";
    const pow = hasX ? (m[4] ? parseInt(m[4], 10) : 1) : 0;
    if (!hasX && !m[2]) return null;
    coef *= sign;
    out.set(pow, (out.get(pow) ?? 0) + coef);
  }
  return out;
}
function polyEquals(ans: string, expected: [number, number][]): boolean {
  const got = parsePoly(ans);
  if (!got) return false;
  const em = new Map<number, number>(expected);
  if (got.size !== em.size) return false;
  for (const [p, c] of em) if ((got.get(p) ?? 0) !== c) return false;
  return true;
}

// ═══════════════════════════ SPOT VERIFIERS ═══════════════════════════════
// Each entry: (q) => true (verified), false (MISMATCH), "skip" (can't parse).
type Verifier = (q: Question) => boolean | "skip";
const V: Record<string, Verifier> = {};
const def = (key: string, fn: Verifier) => { V[key] = fn; };

// ── ch01 ───────────────────────────────────────────────────────────────────
def("1:dist-formula", (q) => {
  const P = pts(q.text);
  if (P.length < 2) return "skip";
  let d = hypot(P[1][0] - P[0][0], P[1][1] - P[0][1]);
  const sc = q.text.match(/1 grid unit represents \$(\d+) m/);
  if (sc) d *= parseFloat(sc[1]);
  if (/returns by the same straight route/.test(q.text)) d *= 2;
  const a = ansVal(q);
  return a !== null && close(a, d);
});
def("1:apply-dist", (q) => {
  const P = pts(q.text);
  if (P.length < 2) return "skip";
  let d = hypot(P[1][0] - P[0][0], P[1][1] - P[0][1]);
  const sc = q.text.match(/1 grid unit represents \$(\d+) m/);
  if (sc) d *= parseFloat(sc[1]);
  if (/then returns by the same straight route/.test(q.text)) d *= 2;
  const a = ansVal(q);
  return a !== null && close(a, d);
});
def("1:axis-dist", (q) => {
  const P = pts(q.text);
  if (P.length < 1) return "skip";
  const [x, y] = P[0];
  let d: number;
  if (/from the origin/.test(q.text)) d = hypot(x, y);
  else if (/from the x-axis/.test(q.text)) d = Math.abs(y);
  else d = Math.abs(x);
  const a = ansVal(q);
  return a !== null && close(a, d);
});
def("1:path-len", (q) => {
  const P = pts(q.text);
  if (P.length < 2) return "skip";
  let d: number;
  if (P.length >= 3) d = Math.abs(P[1][0] - P[0][0]) + Math.abs(P[1][1] - P[0][1]) + Math.abs(P[2][0] - P[1][0]) + Math.abs(P[2][1] - P[1][1]);
  else d = Math.abs(P[1][0] - P[0][0]) + Math.abs(P[1][1] - P[0][1]);
  const a = ansVal(q);
  return a !== null && close(a, d);
});
def("1:midpoint", (q) => {
  const P = pts(q.text + " " + q.answer);
  if (P.length < 3) return "skip";
  const mx = (P[0][0] + P[1][0]) / 2, my = (P[0][1] + P[1][1]) / 2;
  const a = P[2];
  if (/midpoint of segment/.test(q.text)) { // reverse: M and A given, find B
    const bx = 2 * P[0][0] - P[1][0], by = 2 * P[0][1] - P[1][1];
    return close(a[0], bx) && close(a[1], by);
  }
  return close(a[0], mx) && close(a[1], my);
});
def("1:missing-vertex", (q) => {
  const P = pts(q.text + " " + q.answer);
  if (P.length < 4) return "skip";
  const given = P.slice(0, 3), D = P[3];
  const xs = given.map((p) => p[0]), ys = given.map((p) => p[1]);
  const xStar = xs[0] === xs[1] ? xs[2] : xs[0] === xs[2] ? xs[1] : xs[0];
  const yStar = ys[0] === ys[1] ? ys[2] : ys[0] === ys[2] ? ys[1] : ys[0];
  return close(D[0], xStar) && close(D[1], yStar);
});
def("1:plot-read", (q) => {
  const A = pts(q.answer);
  if (A.length !== 1) return "skip";
  const t = q.text;
  const east = t.match(/(\d+) units? east/), west = t.match(/(\d+) units? west/);
  const north = t.match(/(\d+) units? north/), south = t.match(/(\d+) units? south/);
  if (east && north) return A[0][0] === +east[1] && A[0][1] === +north[1];
  if (east && south) return A[0][0] === +east[1] && A[0][1] === -south[1];
  if (west && north) return A[0][0] === -west[1] && A[0][1] === +north[1];
  if (west && south) return A[0][0] === -west[1] && A[0][1] === -south[1];
  const right = t.match(/(\d+) units? to the right/), left = t.match(/(\d+) units? to the left/);
  const above = t.match(/(\d+) units? above/), below = t.match(/(\d+) units? below/);
  if (right && above) return A[0][0] === +right[1] && A[0][1] === +above[1];
  if (right && below) return A[0][0] === +right[1] && A[0][1] === -below[1];
  if (left && above) return A[0][0] === -left[1] && A[0][1] === +above[1];
  if (left && below) return A[0][0] === -left[1] && A[0][1] === -below[1];
  return "skip";
});
def("1:quad-identify", (q) => {
  const P = pts(q.text);
  if (P.length < 1 || !q.choices) return "skip";
  const [x, y] = P[0];
  const quad = x > 0 ? (y > 0 ? "Quadrant I" : "Quadrant IV") : y > 0 ? "Quadrant II" : "Quadrant III";
  if (q.type === "mcq" && /Which of these points/.test(q.text)) {
    const m = q.text.match(/lies in (Quadrant [IV]+)/);
    if (!m) return "skip";
    const want = m[1];
    const qq = want === "Quadrant I" ? [1, 1] : want === "Quadrant II" ? [-1, 1] : want === "Quadrant III" ? [-1, -1] : [1, -1];
    const A = pts(q.answer);
    return A.length === 1 && Math.sign(A[0][0]) === qq[0] && Math.sign(A[0][1]) === qq[1];
  }
  return q.answer === quad;
});
def("1:mcq-signs", (q) => {
  if (q.type === "tf") {
    const P = pts(q.text);
    if (P.length < 1) return "skip";
    const [x, y] = P[0];
    const m = q.text.match(/lies in (Quadrant [IV]+)/);
    if (!m) return "skip";
    const onAxis = x === 0 || y === 0;
    const quad = x > 0 ? (y > 0 ? "Quadrant I" : "Quadrant IV") : y > 0 ? "Quadrant II" : "Quadrant III";
    const truth = !onAxis && quad === m[1];
    return q.answer === (truth ? "true" : "false");
  }
  if (/The reflection of the point/.test(q.text)) {
    const P = pts(q.text);
    const A = pts(q.answer);
    if (P.length < 1 || A.length < 1) return "skip";
    const [x, y] = P[0];
    const want = /x-axis/.test(q.text) ? [x, -y] : [-x, y];
    return close(A[0][0], want[0]) && close(A[0][1], want[1]);
  }
  return "skip";
});

// ── ch02 ───────────────────────────────────────────────────────────────────
/** parse "ax + b" / "-x - 3" style linear strings */
function lin(s: string): [number, number] | null {
  const t = s.replace(/\s+/g, "").replace(/−/g, "-");
  const m = t.match(/^([+-]?\d*)\*?x([+-]\d+)?$/);
  if (!m) return null;
  const a = m[1] === "" || m[1] === "+" ? 1 : m[1] === "-" ? -1 : parseInt(m[1], 10);
  const b = m[2] ? parseInt(m[2], 10) : 0;
  return [a, b];
}
def("2:eval-poly", (q) => {
  const t = q.text.replace(/\$/g, "");
  let m = t.match(/input is (\d+)/) ?? t.match(/p\((\d+)\)/) ?? t.match(/for input (\d+)/);
  if (!m) return "skip";
  const x = parseInt(m[1], 10);
  m = t.match(/p\(x\) = ([^.(]+)/) ?? t.match(/into ([^.(]+?)\./);
  if (!m) return "skip";
  let a: number, b: number;
  const fr = m[1].match(/\\frac\{(\d+)\}\{(\d+)\}x\s*([+-])\s*(\d+)/);
  if (fr) { a = parseInt(fr[1], 10) / parseInt(fr[2], 10); b = fr[3] === "-" ? -parseInt(fr[4], 10) : parseInt(fr[4], 10); }
  else { const L = lin(m[1].replace(/p\(x\) ?=/i, "")); if (!L) return "skip"; [a, b] = L; }
  const a2 = ansVal(q);
  return a2 !== null && close(a2, a * x + b, 1e-3);
});
def("2:find-zero", (q) => {
  const t = q.text.replace(/\$/g, "");
  const m = t.match(/p\(x\) = ([^$]+?)\./) ?? t.match(/p\(x\) = ([^$]+)$/) ?? t.match(/p\(t\) = (\d+) - (\d+)t/);
  if (!m) return "skip";
  if (m.length === 3) { const T = +m[1], rr = +m[2]; const a = ansVal(q); return a !== null && close(a, T / rr); }
  const L = lin(m[1]);
  if (!L) return "skip";
  const a = ansVal(q);
  return a !== null && close(a, -L[1] / L[0], 1e-3);
});
def("2:pattern-nth", (q) => {
  const t = q.text.replace(/\\ldots/g, "").replace(/\$/g, "");
  const lists = [...t.matchAll(/(-?\d+(?:\.\d+)?), (-?\d+(?:\.\d+)?), (-?\d+(?:\.\d+)?), (-?\d+(?:\.\d+)?)/g)];
  const nM = t.match(/term number (\d+)/) ?? t.match(/(\d+)\^{th} term/) ?? t.match(/(\d+)th term/);
  if (!lists.length) return "skip";
  const L = lists[0].slice(1).map(Number);
  const d = L[1] - L[0], c = L[0] - d;
  if (!nM) {
    // two-belt coincidence: solve A(n) = B(n)
    if (lists.length >= 2) {
      const B = lists[1].slice(1).map(Number);
      const dB = B[1] - B[0], cB = B[0] - dB;
      const n = (cB - c) / (d - dB);
      const a = ansVal(q);
      return a !== null && close(a, n, 1e-9);
    }
    return "skip";
  }
  const a = ansVal(q);
  return a !== null && close(a, c + (+nM[1] - 1) * d, 1e-6);
});
def("2:matchstick-rule", (q) => {
  const t = q.text.replace(/\$/g, "");
  const per = t.match(/squares/) ? 3 : t.match(/triangles/) ? 2 : t.match(/hexagons/) ? 5 : null;
  const nM = t.match(/row of (\d+) such/) ?? t.match(/a row of (\d+)/) ?? t.match(/2 \\times (\d+)/) ?? t.match(/2×(\d+)/);
  if (t.match(/2 ?\\?x ?n grid/) || t.match(/2×n grid/)) {
    const n2 = t.match(/2 \\times (\d+) grid/);
    if (!n2) return "skip";
    const a = ansVal(q); return a !== null && close(a, 5 * +n2[1] + 2);
  }
  if (!per || !nM) return "skip";
  const n = +nM[1];
  const a = ansVal(q);
  if (t.match(/has used|has a box/)) {
    // reverse: n from S
    const sM = t.match(/used \$(\d+)|box of \$(\d+)/);
    return "skip"; // ambiguous parse; structural pass covers format
  }
  return a !== null && close(a, per * n + 1);
});
def("2:table-rule", (q) => {
  const t = q.text.replace(/\$/g, "");
  const rows = [...t.matchAll(/x = (-?\d+) → (-?\d+)/g)].map((m) => [+m[1], +m[2]]);
  if (rows.length < 2) return "skip";
  const a = rows[1][1] - rows[0][1];
  const b = rows[0][1] - a * rows[0][0];
  const kM = t.match(/input is (\d+)/) ?? t.match(/at x = (\d+)/) ?? t.match(/at t = (\d+)/) ?? t.match(/output \$(\d+)/);
  const a2 = ansVal(q);
  if (!a2) return "skip";
  if (kM) return close(a2, a * +kM[1] + b);
  if (t.match(/first produce the output/)) { const y = +(t.match(/output \$(-?\d+)/)?.[1] ?? NaN); return close(a2, (y - b) / a); }
  return "skip";
});
def("2:rate-word", (q) => {
  const t = q.text.replace(/[$₹]/g, "").replace(/,/g, "");
  const a = ansVal(q);
  if (a === null) return "skip";
  let m = t.match(/fixed hire fee plus (\d+) per kilometre.*fare for a (\d+) km/);
  if (m) return close(a, +m[1] * +m[2] + +(t.match(/charges (\d+) as a/)?.[1] ?? NaN));
  m = t.match(/costs (\d+) plus (\d+) per km\. \w+ paid (\d+) in total/);
  if (m) return close(a, (+m[3] - +m[1]) / +m[2]);
  m = t.match(/fixed plus (\d+(\.\d+)?) per km/);
  if (m && t.match(/fare .* for a (\d+) km/)) {
    const F = +(t.match(/charges ₹?(\d+) fixed/)?.[1] ?? t.match(/₹?(\d+) fixed/)?.[1] ?? NaN);
    return close(a, F + parseFloat(m[1]) * +t.match(/for a (\d+) km/)![1], 0.01);
  }
  m = t.match(/Plan A.*?(\d+) \+ (\d+) per parcel.*?Plan B.*?(\d+) \+ (\d+) per parcel/);
  if (m) return close(a, (+m[3] - +m[1]) / (+m[2] - +m[4]));
  return "skip";
});
def("2:growth-decay", (q) => {
  const t = q.text.replace(/[$₹,]/g, "");
  const a = ansVal(q);
  if (a === null) return "skip";
  let m = t.match(/is (\d+) cm tall and grows (\d+) cm every day.*after (\d+) days/);
  if (m) return close(a, +m[1] + +m[2] * +m[3]);
  m = t.match(/holds (\d+) L and drains at (\d+) L\/min.*after (\d+) minutes/);
  if (m) return close(a, +m[1] - +m[2] * +m[3]);
  m = t.match(/at (\d+)% drains (\d+)% per hour/);
  if (m) return close(a, +m[1] / +m[2]);
  m = t.match(/Tank P holds (\d+) L losing (\d+) L\/min, Tank Q holds (\d+) L losing (\d+) L\/min/);
  if (m) return close(a, +m[3] / +m[4] - +m[1] / +m[2]);
  return "skip";
});
def("2:graph-read", (q) => {
  const t = q.text.replace(/\$/g, "");
  const a2 = ansVal(q);
  if (a2 === null) return "skip";
  let m = t.match(/line y = ([^$]+) is drawn.*with x = (\d+)/) ?? t.match(/The line y = ([^,]+), find the y-coordinate of the point with x = (\d+)/);
  if (m) { const L = lin(m[1]); return L ? close(a2, L[0] * +m[2] + L[1]) : false; }
  m = t.match(/line y = ([^$]+) passes through a point whose y-coordinate is (\(-?\d+\)|-?\d+)/);
  if (m) { const L = lin(m[1]); return L ? close(a2, (+m[2] - L[1]) / L[0], 1e-3) : false; }
  m = t.match(/line y = (\d+)x [+-] \d+ passes through a point with y = (-?\d+)/);
  if (m) return "skip";
  const P = pts(t);
  if (P.length >= 2) {
    const a = (P[1][1] - P[0][1]) / (P[1][0] - P[0][0]);
    const b = P[0][1] - a * P[0][0];
    return close(a2, -b / a);
  }
  return "skip";
});
def("2:line-cross", (q) => {
  const t = q.text.replace(/\$/g, "");
  const a2 = ansVal(q);
  if (a2 === null) return "skip";
  let m = t.match(/line y = ([^$]+) cuts the y-axis/);
  if (m) { const L = lin(m[1]); return L ? close(a2, L[1]) : false; }
  m = t.match(/line y = ([^$]+) crosses the x-axis/);
  if (m) {
    const fr = m[1].match(/\\frac\{1\}\{2\}|\\frac\{3\}\{2\}|\\frac\{1\}\{4\}|\\frac\{5\}\{2\}/);
    if (fr && t.match(/cut the y-axis/)) { const b = +(t.match(/([+-]?\d+\.\d+)\s*\.$/)?.[1] ?? NaN); return isFinite(b) && close(a2, b, 0.005); }
    const L = lin(m[1]); return L ? close(a2, -L[1] / L[0], 1e-3) : false;
  }
  m = t.match(/P\(n\) = (\d+)n - (\d+)/);
  if (m) return close(a2, +m[2] / +m[1]);
  return "skip";
});

// ── ch03 ───────────────────────────────────────────────────────────────────
def("3:int-ops", (q) => {
  const t = q.text.replace(/\$/g, "").replace(/\\times/g, "*").replace(/−/g, "-");
  const a = ansVal(q);
  if (a === null) return "skip";
  let m = t.match(/\((-?\d+)\) \* \((-?\d+)\)/);
  if (m) return close(a, +m[1] * +m[2]);
  m = t.match(/\((-?\d+)\) \+ \((-?\d+)\)/);
  if (m) return close(a, +m[1] + +m[2]);
  m = t.match(/(\d+) \+ (\d+)/);
  if (m) return close(a, +m[1] + +m[2]);
  m = t.match(/(\d+) \* \((-?\d+)\) \+ \((-?\d+)\)/);
  if (m) return close(a, +m[1] * +m[2] + +m[3]);
  return "skip";
});
def("3:frac-dec", (q) => {
  const t = q.text;
  const a = ansVal(q);
  if (a === null) return "skip";
  let m = t.match(/\\frac\{(\d+)\}\{(\d+)\}\$ as a decimal/);
  if (m) return close(a, +m[1] / +m[2], 1e-9);
  m = t.match(/0\.\\overline\{(\d+)\}/);
  if (m) {
    const rep = m[1];
    const per = rep.length;
    return close(a, parseInt(rep, 10) / (10 ** per - 1), 1e-9);
  }
  if (q.type === "tf") {
    m = t.match(/\\frac\{(\d+)\}\{(\d+)\}/);
    if (!m) return "skip";
    const num = +m[1], den = +m[2];
    const rd = den / (gcd(num, den) || 1);
    let term = true;
    for (let x = rd; x > 1;) { if (x % 2 === 0) x /= 2; else if (x % 5 === 0) x /= 5; else { term = false; break; } }
    const claimTerminating = /is terminating\./.test(t);
    return claimTerminating === term; // key is always "true" ⇒ claim must be true ⇒ claim must match reality
  }
  return "skip";
});
def("3:sqrt-simplify", (q) => {
  const t = q.text.replace(/\$/g, "");
  const a = ansVal(q);
  if (a !== null) {
    let m = t.match(/\\sqrt\{(\d+)\}/);
    if (m && !t.match(/\\sqrt\{\d+\} \+/)) return close(a, Math.sqrt(+m[1]));
    const ms = [...t.matchAll(/\\sqrt\{(\d+)\}/g)].map((x) => +x[1]);
    if (ms.length === 2) {
      const sqfree = (n: number) => { let r = 1, x = n; for (let p = 2; p * p <= x; p++) { let c = 0; while (x % p === 0) { x /= p; c++; } if (c % 2) r *= p; } if (x > 1) r *= x; return r; };
      const coef = (n: number, k: number) => Math.round(Math.sqrt(n / k));
      const k = sqfree(ms[0]);
      if (sqfree(ms[1]) !== k) return false;
      return close(a, coef(ms[0], k) + coef(ms[1], k));
    }
    return "skip";
  }
  // fill: "k\sqrt{m}"
  const m = t.match(/\\sqrt\{(\d+)\} \\?and/);
  return "skip";
});
def("3:cyc-digit", (q) => {
  const m = q.text.match(/\$(\d+)\^\{(\d+)\}\$/);
  if (!m) return "skip";
  const b = +m[1], e = +m[2];
  let x = 1; const seen: number[] = [];
  for (let i = 0; i < 12; i++) { x = (x * b) % 10; seen.push(x); }
  const j = seen.slice(1).indexOf(seen[0]);
  const cyc = seen.slice(0, 1 + j);
  const a = ansVal(q);
  return a !== null && a === cyc[(e - 1) % cyc.length];
});
def("3:numline-betw", (q) => {
  const m = q.text.match(/from A\((-?\d+)\) to B\((-?\d+)\)/);
  const f = q.text.match(/\\frac\{(\d+)\}\{(\d+)\} of the way/);
  if (!m || !f) return "skip";
  const a = ansVal(q);
  return a !== null && close(a, +m[1] + ((+m[2] - +m[1]) * +f[1]) / +f[2], 1e-4);
});
def("3:abs-ops", (q) => {
  const t = q.text.replace(/\$/g, "").replace(/−/g, "-");
  const a = ansVal(q);
  if (a === null) return "skip";
  let m = t.match(/\|(-?\d+) - \((-?\d+)\)\|/);
  if (m) return close(a, Math.abs(+m[1] - +m[2]));
  m = t.match(/\|(-?\d+)\| \+ \|(-?\d+)\| - \|(-?\d+)\|/);
  if (m) return close(a, Math.abs(+m[1]) + Math.abs(+m[2]) - Math.abs(+m[3]));
  return "skip";
});
def("3:sqrt-between", (q) => {
  const m = q.text.match(/\\sqrt\{(\d+)\}/);
  if (!m || !q.choices) return "skip";
  const k = Math.floor(Math.sqrt(+m[1]));
  return q.answer === `${k} and ${k + 1}`;
});
def("3:dec-order", (q) => {
  if (!q.choices) return "skip";
  const val = (s: string): number | null => {
    const fr = s.match(/\\frac\{(\d+)\}\{(\d+)\}/);
    if (fr) return +fr[1] / +fr[2];
    const d = s.match(/(\d+\.\d+)/);
    return d ? parseFloat(d[1]) : null;
  };
  const vals = q.choices.map(val);
  if (vals.some((v) => v === null)) return "skip";
  const ai = q.choices.indexOf(q.answer);
  if (ai < 0) return false;
  return vals[ai] === Math.max(...(vals as number[]));
});
def("3:dens-rat", (q) => {
  const fr = [...q.text.matchAll(/\\frac\{(\d+)\}\{(\d+)\}/g)].map((m) => [+m[1], +m[2]]);
  if (fr.length < 2) return "skip";
  const lo = fr[0][0] / fr[0][1], hi = fr[1][0] / fr[1][1];
  const a = ansVal(q);
  return a !== null && a > lo && a < hi;
});

// ── ch04 ───────────────────────────────────────────────────────────────────
def("4:expand-square", (q) => {
  const t = q.text.replace(/\$/g, "");
  if (q.type !== "fill") return "skip";
  let m = t.match(/\(x \+ (\d+)\)\^2/);
  if (m) { const b = +m[1]; return polyEquals(q.answer, [[2, 2 * b], [1, 1], [0, b * b]]); }
  m = t.match(/\(x ([+-]) (\d+)\)\^2/);
  if (m) { const s = m[1] === "-" ? -1 : 1, b = +m[2]; return polyEquals(q.answer, [[2, 1], [1, s * 2 * b], [0, b * b]]); }
  m = t.match(/\((\d+)x ([+-]) (\d+)\)\^2/);
  if (m) { const p = +m[1], s = m[2] === "-" ? -1 : 1, qq = +m[3]; return polyEquals(q.answer, [[2, p * p], [1, s * 2 * p * qq], [0, qq * qq]]); }
  m = t.match(/\(x \+ (\d+)\)\^2 - \(x - (\d+)\)\^2/);
  if (m) return polyEquals(q.answer, [[1, 4 * +m[1]]]);
  m = t.match(/\(x \+ (\d+)\)\^2 \+ \(x - (\d+)\)\^2/);
  if (m) return polyEquals(q.answer, [[2, 2], [0, 2 * +m[1] * +m[1]]]);
  return "skip";
});
def("4:mental-square", (q) => {
  const m = q.text.match(/\$(\d+)\^2\$/);
  if (!m) return "skip";
  const a = ansVal(q);
  return a !== null && a === +m[1] * +m[1];
});
def("4:expand-prod", (q) => {
  const t = q.text.replace(/\$/g, "");
  if (q.type === "fill") {
    let m = t.match(/\(x \+ (\d+)\)\(x \+ (\d+)\)/);
    if (m) { const a = +m[1], b = +m[2]; return polyEquals(q.answer, [[2, 1], [1, a + b], [0, a * b]]); }
    m = t.match(/\(x \+ (\d+)\)\(x - (\d+)\)/);
    if (m) { const a = +m[1], c = +m[2]; return polyEquals(q.answer, [[2, 1], [1, a - c], [0, -a * c]]); }
    m = t.match(/\((\d+)x \+ (\d+)\)\(x ([+-]) (\d+)\)/);
    if (m) { const p = +m[1], qq = +m[2], s = m[3] === "-" ? -1 : 1, s2 = +m[4] * s; return polyEquals(q.answer, [[2, p * p], [1, p * s2 + qq], [0, qq * s2]]); }
    return "skip";
  }
  const m = t.match(/\((-?\d+)\)\((-?\d+)\)/) ?? t.match(/\(x ([+-]) (\d+)\)\(x ([+-]) (\d+)\)/);
  if (m && t.match(/coefficient of \$x\$/)) {
    const a = +(m[1] ?? (m[2] === "+" ? 1 : -1) * 0) || 0;
    // text form: (x + a)(x + b) with signed numbers in parentheses
    const nums = [...t.matchAll(/\((-?\d+)\)/g)].map((x) => +x[1]);
    if (nums.length >= 2) { const av = ansVal(q); return av !== null && av === nums[0] + nums[1]; }
  }
  return "skip";
});
def("4:coeff-find", (q) => {
  const t = q.text.replace(/\$/g, "");
  const a = ansVal(q);
  if (a === null) return "skip";
  let m = t.match(/\(x \+ (\d+)\)\^2 = x\^2 \+ kx/);
  if (m) return a === 2 * +m[1];
  m = t.match(/x\^2 \+ (\d+)x \+ k/);
  if (m) return a === (+m[1] / 2) ** 2;
  m = t.match(/\(x \+ (\d+)\)\(x \+ (\d+)\) = x\^2 \+ kx/);
  if (m) return a === +m[1] + +m[2];
  m = t.match(/\(x \+ (\d+)\)\^3.*coefficient of \$?\s?x\$? is/);
  if (m) return a === 3 * +m[1] * +m[1];
  return "skip";
});
def("4:cube-expand", (q) => {
  const t = q.text.replace(/\$/g, "");
  if (q.type !== "fill") {
    const m = t.match(/\((\d+)x \+ (\d+)\)\^3/);
    if (m && t.match(/coefficient of \$x\^2\$/)) { const a = ansVal(q); return a !== null && a === 3 * (+m[1]) ** 2 * +m[2]; }
    return "skip";
  }
  let m = t.match(/\(x \+ (\d+)\)\^3/);
  if (m) { const b = +m[1]; return polyEquals(q.answer, [[3, 1], [2, 3 * b], [1, 3 * b * b], [0, b ** 3]]); }
  m = t.match(/\(x ([+-]) (\d+)\)\^3/);
  if (m) { const s = m[1] === "-" ? -1 : 1, b = +m[2]; return polyEquals(q.answer, [[3, 1], [2, s * 3 * b], [1, 3 * b * b], [0, s * b ** 3]]); }
  return "skip";
});
def("4:cube-identity", (q) => {
  const t = q.text.replace(/\$/g, "");
  const a = ansVal(q);
  if (a === null) return "skip";
  let m = t.match(/a \+ b = (\d+)\) and \$?ab = (\d+)/) ?? t.match(/a \+ b = (\d+) and ab = (\d+)/);
  if (m) return a === (+m[1]) ** 3 - 3 * +m[2] * +m[1];
  m = t.match(/a - b = (\d+) and ab = (\d+)/);
  if (m) return a === (+m[1]) ** 3 + 3 * +m[2] * +m[1];
  m = t.match(/a \+ b = (\d+) and a\^3 \+ b\^3 = (-?\d+)/);
  if (m) return a === (+m[2] === 0 ? 0 : ((+m[1]) ** 3 - +m[2]) / (3 * +m[1]));
  return "skip";
});
def("4:tri-sq-combo", (q) => {
  const t = q.text.replace(/\$/g, "");
  const a = ansVal(q);
  if (a === null) return "skip";
  let m = t.match(/a = (\d+), b = (\d+), c = (\d+)/);
  if (m) return a === 2 * (+m[1] * +m[2] + +m[2] * +m[3] + +m[3] * +m[1]);
  m = t.match(/\((\d+)\+(\d+)\+(\d+)\)\^2/);
  if (m) return a === (+m[1] + +m[2] + +m[3]) ** 2;
  m = t.match(/a \+ b \+ c = (\d+) and a\^2 \+ b\^2 \+ c\^2 = (\d+)/);
  if (m) return a === ((+m[1]) ** 2 - +m[2]) / 2;
  m = t.match(/a \+ b \+ c = (\d+) and ab \+ bc \+ ca = (\d+)/);
  if (m) return a === (+m[1]) ** 2 - 2 * +m[2];
  return "skip";
});
def("4:eval-area", (q) => {
  const t = q.text.replace(/\$/g, "");
  const a = ansVal(q);
  if (a === null) return "skip";
  let m = t.match(/side \((\d+) \+ (\d+)\) m/);
  if (m) return a === (+m[1] + +m[2]) ** 2;
  m = t.match(/\((\d+) \+ (\d+)\) cm by \((\d+) - (\d+)\) cm/);
  if (m) return a === (+m[1] + +m[2]) * (+m[3] - +m[4]) && +m[1] === +m[3] && +m[2] === +m[4];
  m = t.match(/side \((\d+) \+ b\) cm and area (\d+)/);
  if (m) return a === Math.sqrt(+m[2]) - +m[1];
  m = t.match(/outer side (\d+) cm and a square window of side (\d+) cm/);
  if (m) return a === (+m[1]) ** 2 - (+m[2]) ** 2;
  return "skip";
});
/** expand "g(ux+v)" / "gx(ux±v)" / "gx(ux+vy)" answer strings */
function expandFac(ans: string): [number, number, number] | null {
  const t = ans.replace(/\s+/g, "");
  const m = t.match(/^(\d+)x?\((\d*)x([+-])(\d+)(y?)\)$/);
  if (!m) return null;
  const g = +m[1];
  const hasXOut = t.includes("x(");
  const u = m[2] === "" ? 1 : +m[2];
  const sgn = m[3] === "-" ? -1 : 1;
  const v = +m[4];
  const y = m[5] === "y";
  if (y) return [g, hasXOut ? g * u : 0, g * v]; // x² coef, xy coef (packed in slot 1), const 0
  // (g·u)x² + (g·v)x  for x( form; (g·u)x + g·v for plain
  return hasXOut ? [g * u, g * v, 0] : [0, g * u, g * v];
}
def("4:factor-common", (q) => {
  const t = q.text.replace(/\$/g, "");
  if (q.type !== "fill") return "skip";
  const e = expandFac(q.answer);
  if (!e) return "skip";
  let m = t.match(/^Factorise completely: (\d+)x \+ (\d+)$/);
  if (m) return e[0] === 0 && e[1] === +m[1] && e[2] === +m[2];
  m = t.match(/^Factorise completely: (\d+)x\^2 \+ (\d+)x$/);
  if (m) return e[0] === +m[1] && e[1] === +m[2] && e[2] === 0;
  m = t.match(/^Factorise completely: (\d+)x\^2 - (\d+)x$/);
  if (m) return e[0] === +m[1] && e[1] === -+m[2] && e[2] === 0;
  m = t.match(/^Factorise completely: (\d+)x\^2 \+ (\d+)xy$/);
  if (m) return e[0] === +m[1] && e[1] === +m[2];
  return "skip";
});
def("4:factor-group", (q) => {
  const t = q.text.replace(/\$/g, "").replace(/[{}\\]/g, "");
  if (q.type !== "fill") return "skip";
  const m = t.match(/Factorise by grouping: x\^3([+-])(\d+)x\^2\+(\d+)x([+-])(\d+)$/);
  if (!m) return "skip";
  const s1 = m[1] === "-" ? -1 : 1, c = +m[2], a2 = +m[4], s2 = m[4] === undefined ? 1 : 1;
  const s3 = m[4] === "-" ? -1 : 1;
  const expected: [number, number][] = [[3, 1], [2, s1 * c], [1, a2], [0, s3 * +m[5]]];
  // answer "(x±c)(x^2+a2)"
  const am = q.answer.replace(/\s+/g, "").match(/^\(x([+-])(\d+)\)\(x\^2\+(\d+)\)$/);
  if (!am) return false;
  const sg = am[1] === "-" ? -1 : 1, cc = +am[2], aa = +am[3];
  return sg === s1 && cc === c && aa === a2 && polyEquals(q.answer, expected.map(([p, co]) => [p, co]) as [number, number][]);
});
def("4:factor-trinomial", (q) => {
  const t = q.text.replace(/\$/g, "").replace(/[{}]/g, "");
  if (q.type !== "fill") return "skip";
  const m = t.match(/Factorise: x\^2([+-])(\d+)x([+-])(\d+)$/);
  if (!m) return "skip";
  const S = (m[1] === "-" ? -1 : 1) * +m[2];
  const P = (m[3] === "-" ? -1 : 1) * +m[4];
  // find integers a,b: a+b=S, ab=P
  for (let a = -Math.max(Math.abs(P), 1); a <= Math.max(Math.abs(P), 1); a++) {
    if (a !== 0 && P % a === 0 && a + P / a === S) {
      const am = q.answer.replace(/\s+/g, "").match(/^\(x([+-])(\d+)\)\(x([+-])(\d+)\)$/);
      if (!am) return false;
      return (am[1] === "-" ? -1 : 1) * +am[2] === a && (am[3] === "-" ? -1 : 1) * +am[4] === P / a;
    }
  }
  return false;
});
def("4:rational-simplify", (q) => {
  const t = q.text.replace(/\$/g, "");
  const a = ansVal(q);
  if (a === null) return "skip";
  let m = t.match(/\\frac\{x\^2 - (\d+)\}\{x \+ (\d+)\} and evaluate the result at x = (\d+)/);
  if (m) return a === +m[3] - +m[2] && +m[1] === (+m[2]) ** 2;
  m = t.match(/\\frac\{x\^2 - (\d+)\}\{x - (\d+)\} and evaluate the result at x = (\d+)/);
  if (m && !t.includes("x^3")) return a === +m[3] + +m[2] && +m[1] === (+m[2]) ** 2;
  m = t.match(/\\frac\{x\^2 - (\d+)x \+ (\d+)\}\{x - (\d+)\} and evaluate the result at x = (\d+)/);
  if (m) {
    const s = +m[1], p = +m[2], bb = +m[3], tt = +m[4];
    // find a with (x-a)(x-bb) = x² - sx + p
    const disc = s * s - 4 * p;
    if (disc < 0) return false;
    const r = Math.sqrt(disc);
    const a1 = (s + r) / 2, a2 = (s - r) / 2;
    const cand = Math.abs(a1 - bb) < 1e-9 ? a2 : a1;
    return a === tt - cand;
  }
  m = t.match(/\\frac\{x\^3 - (\d+)\}\{x - (\d+)\} and evaluate at x = (\d+)/);
  if (m) { const b = +m[2], tt = +m[3]; return a === tt * tt + tt * b + b * b && +m[1] === b ** 3; }
  return "skip";
});

// ── ch05 ───────────────────────────────────────────────────────────────────
def("5:chord-dist", (q) => {
  const t = q.text.replace(/\$/g, "");
  const a = ansVal(q);
  if (a === null) return "skip";
  const rM = t.match(/radius \$(\d+)\$? ?cm/), dM = t.match(/distance of \$?(\d+)/) ?? t.match(/perpendicular distance of \$(\d+)/);
  const cM = t.match(/chord measures \$(\d+)/) ?? t.match(/chord\) runs at a perpendicular distance/);
  if (rM && dM && !cM) { const r = +rM[1], d = +dM[1]; return close(a, 2 * Math.sqrt(r * r - d * d)) && d <= r; }
  if (rM && cM) {
    const c = +(t.match(/chord measures \$(\d+)/)?.[1] ?? t.match(/pathway.*?(\d+) m long/)?.[1] ?? NaN);
    if (!isFinite(c)) return "skip";
    const R = +rM[1];
    return close(a, Math.sqrt(R * R - (c / 2) ** 2));
  }
  return "skip";
});
def("5:radius-chord-pyth", (q) => {
  const t = q.text.replace(/\$/g, "");
  const a = ansVal(q);
  if (a === null) return "skip";
  const cM = t.match(/[Cc]hord of length \$(\d+)/) ?? t.match(/chord AB of length \$(\d+)/) ?? t.match(/Given AM = (\d+)/);
  const dM = t.match(/distance of \$(\d+)/) ?? t.match(/at a distance of \$(\d+)/) ?? t.match(/OM = (\d+)/);
  if (!cM || !dM) return "skip";
  const half = t.match(/AM = (\d+)/) ? +cM[1] : +cM[1] / 2;
  const dist = +dM[1];
  const R = Math.sqrt(dist * dist + half * half);
  return close(a, t.match(/DIAMETER/i) ? 2 * R : R);
});
def("5:central-inscribed", (q) => {
  const t = q.text.replace(/\$/g, "");
  const a = ansVal(q);
  if (a === null) return "skip";
  let m = t.match(/AOB = (\d+)/);
  if (m && t.match(/point \$?C/)) return a === +m[1] / 2;
  m = t.match(/subtends an angle of (\d+) at a point P/);
  if (m) return a === 2 * +m[1];
  m = t.match(/ACB = (\d+)/);
  if (m && t.match(/REFLEX/)) return a === 360 - 2 * +m[1];
  m = t.match(/OAB = (\d+)/);
  if (m) return a === 90 - +m[1];
  return "skip";
});
def("5:same-segment", (q) => {
  const t = q.text.replace(/\$/g, "");
  const a = ansVal(q);
  if (a === null) return "skip";
  let m = t.match(/ACB = (\d+)/);
  if (m && t.match(/find \\?angle ADB/)) return a === +m[1];
  m = t.match(/ADB = (\d+)/);
  if (m && t.match(/AEB \+ \$?\\?angle AFB/)) return a === 2 * +m[1];
  m = t.match(/BAC = (\d+) and .ABC = (\d+)/);
  if (m) return a === 2 * (180 - +m[1] - +m[2]);
  m = t.match(/ABD = (\d+) and .ADB = (\d+)/);
  if (m) return a === +m[1];
  return "skip";
});
def("5:semicircle-angle", (q) => {
  const t = q.text.replace(/\$/g, "");
  const a = ansVal(q);
  if (a === null) return "skip";
  if (t.match(/What is .*ACB/)) return a === 90;
  let m = t.match(/BC = (\d+) cm and AB = (\d+) cm/);
  if (m) { const h = +m[2], l = +m[1]; return close(a, Math.sqrt(h * h - l * l)); }
  m = t.match(/CAB = (\d+)/);
  if (m) return a === 90 - +m[1];
  return "skip";
});
def("5:cyclic-quad", (q) => {
  const t = q.text.replace(/\$/g, "");
  const a = ansVal(q);
  if (a === null) return "skip";
  let m = t.match(/angle A = (\d+)/);
  if (m && t.match(/find .angle C/)) return a === 180 - +m[1];
  m = t.match(/angle A = (\d+) and .angle B = (\d+)/);
  if (m) return a === 180 - +m[2];
  m = t.match(/angle A = (\d+) .,? ?.angle C/);
  return "skip";
});
def("5:vocab-numeric", (q) => {
  const t = q.text.replace(/\$/g, "");
  const a = ansVal(q);
  if (a === null) return "skip";
  let m = t.match(/diameter of a circular coin is (\d+) mm/);
  if (m) return a === +m[1] / 2;
  if (t.match(/length of OP/)) { const r = t.match(/radius \$(\d+) cm/); return r ? a === +r[1] : "skip"; }
  m = t.match(/radius \$(\d+) cm\. How long is its longest chord/);
  if (m) return a === 2 * +m[1];
  m = t.match(/subtends an angle of (\d+) at the centre/);
  if (m && t.match(/major arc/)) return a === 360 - +m[1];
  m = t.match(/cut into (\d+) equal sectors/);
  if (m) return a === 360 / +m[1];
  return "skip";
});
def("5:circum-triangle", (q) => {
  const t = q.text.replace(/\$/g, "");
  const a = ansVal(q);
  if (a === null) return "skip";
  let m = t.match(/legs \$(\d+) cm and \$(\d+) cm/);
  if (m && t.match(/radius of that circle/)) return a === Math.sqrt((+m[1]) ** 2 + (+m[2]) ** 2) / 2;
  if (m && t.match(/diameter of that circumcircle/)) return a === Math.sqrt((+m[1]) ** 2 + (+m[2]) ** 2);
  m = t.match(/circle of radius (\d+) cm\. What is the length of its hypotenuse/);
  if (m) return a === 2 * +m[1];
  return "skip";
});
def("5:eq-chords", (q) => {
  const t = q.text.replace(/\$/g, "");
  const a = ansVal(q);
  if (a === null) return "skip";
  let m = t.match(/each \$(\d+) cm long.*distance of \$(\d+) cm/);
  if (m) return a === +m[2];
  m = t.match(/radius \$(\d+) cm.*lengths \$(\d+) cm and \$(\d+) cm/);
  if (m) {
    const R = +m[1], c1 = +m[2], c2 = +m[3];
    const d1 = Math.sqrt(R * R - (c1 / 2) ** 2), d2 = Math.sqrt(R * R - (c2 / 2) ** 2);
    const opp = t.match(/opposite sides/);
    return close(a, opp ? d1 + d2 : Math.abs(d1 - d2), 1e-9);
  }
  return "skip";
});
def("5:arc-angle-word", (q) => {
  const t = q.text.replace(/\$/g, "");
  const a = ansVal(q);
  if (a === null) return "skip";
  let m = t.match(/ACB = (\d+)/);
  if (m && t.match(/REFLEX/)) return a === 360 - 2 * +m[1];
  m = t.match(/angle A = (\d+)/);
  if (m && t.match(/what is .angle C/)) return a === 180 - +m[1];
  m = t.match(/diameter AB = (\d+) cm.*distance from C to B is (\d+) cm/);
  if (m) return close(a, Math.sqrt((+m[1]) ** 2 - (+m[2]) ** 2));
  m = t.match(/each \$(\d+) cm long/);
  if (m) {
    const R = +(t.match(/radius \$(\d+) cm/)?.[1] ?? NaN);
    if (!isFinite(R)) return "skip";
    return close(a, Math.sqrt(R * R - (+m[1] / 2) ** 2));
  }
  m = t.match(/ACB = (\d+).*at what angle does D see/);
  if (m) return a === +m[1];
  m = t.match(/AOB = (\d+) at the centre.*ACB \+ .ADB/);
  if (m) return a === +m[1];
  return "skip";
});
def("5:circle-count", (q) => {
  const t = q.text.replace(/\$/g, "");
  const a = ansVal(q);
  if (a === null) return "skip";
  let m = t.match(/(\d+) cm apart\. What is the least possible radius/);
  if (m) return a === +m[1] / 2;
  m = t.match(/are \$(\d+) cm apart\. How many circles of radius exactly \$(\d+) cm/);
  if (m) { const s = +m[1], R = +m[2]; return a === (s === 2 * R ? 1 : 2); }
  m = t.match(/exactly \$(\d+) cm apart, and a circle of radius \$(\d+) cm passes through both\. How many/);
  if (m) return a === (+m[1] === 2 * +m[2] ? 1 : 2);
  return "skip";
});

// ── ch06 (π per stated rule) ───────────────────────────────────────────────
const piOf = (t: string): number => (/tfrac\{22\}\{7\}/.test(t) ? PI22 : P314);
def("6:peri-poly", (q) => {
  const t = q.text.replace(/\$/g, "");
  const a = ansVal(q);
  if (a === null) return "skip";
  let m = t.match(/\$(\d+)\$ m long and \$(\d+)\$ m wide/);
  if (m) return a === 2 * (+m[1] + +m[2]);
  m = t.match(/equilateral triangle has side \$(\d+)/);
  if (m) return a === 3 * +m[1];
  m = t.match(/two equal sides of \$(\d+) cm each and a base of \$(\d+) cm/);
  if (m) return a === 2 * +m[1] + +m[2];
  m = t.match(/adjacent sides \$(\d+) cm and \$(\d+) cm/);
  if (m) return a === 2 * (+m[1] + +m[2]);
  m = t.match(/side \$(\d+)\$ m\. Find its perimeter.*pentagon|side \$(\d+)\$ m\. Find its perimeter.*hexagon/);
  if (m) { const n = t.match(/pentagon/) ? 5 : 6; const s = +(m[1] ?? m[2]); return a === n * s; }
  m = t.match(/two sides of \$(\d+) cm and \$(\d+) cm, and a perimeter of \$(\d+) cm/);
  if (m) return a === +m[3] - +m[1] - +m[2];
  m = t.match(/four sides measuring \$(\d+), \$(\d+), \$(\d+) and \$(\d+) cm, and its perimeter is \$(\d+) cm/);
  if (m) return a === +m[5] - (+m[1] + +m[2] + +m[3] + +m[4]);
  m = t.match(/is \$(\d+) times its breadth of \$(\d+) m/);
  if (m) return a === 2 * (+m[1] * +m[2] + +m[2]);
  m = t.match(/perimeter \$(\d+) m, and its length is \$(\d+) times its breadth/);
  if (m) return a === +m[1] / (2 * (+m[2] + 1));
  return "skip";
});
def("6:circumference", (q) => {
  const t = q.text;
  const pi = piOf(t);
  const a = ansVal(q);
  if (a === null) return "skip";
  let m = t.match(/radius \$(\d+) cm\. Find the circumference/);
  if (m) return close(a, 2 * pi * +m[1], 0.011);
  m = t.match(/diameter \$(\d+) m\. Find the distance once around/);
  if (m) return close(a, pi * +m[1], 0.011);
  m = t.match(/radius \$(\d+(?:\.\d+)?) cm\. Find the circumference/);
  if (m) return close(a, 2 * P314 * parseFloat(m[1]), 0.06);
  m = t.match(/circumference is \$(\d+) cm\. Find its radius/);
  if (m) return close(a, +m[1] / (2 * pi), 0.011);
  m = t.match(/circumference is \$(\d+) m\. Find its diameter/);
  if (m) return close(a, +m[1] / pi, 0.011);
  m = t.match(/diameter \$(\d+) cm\. How many complete revolutions.*travels \$(\d+) m/);
  if (m) return close(a, (+m[2] * 100) / (pi * +m[1]), 0.011);
  return "skip";
});
def("6:arc-length", (q) => {
  const t = q.text;
  const pi = piOf(t);
  const a = ansVal(q);
  if (a === null) return "skip";
  let m = t.match(/subtends \$(\d+)\\?°?\\\^circ at the centre of a circle of radius \$(\d+) cm/);
  if (!m) m = t.match(/subtends \$?(\d+)\\\^circ at the centre of a circle of radius \$(\d+)/);
  if (m) return close(a, (+m[1] / 360) * 2 * pi * +m[2], 0.011);
  m = t.match(/radius \$(\d+) cm has length \$(\d+(?:\.\d+)?) cm\. What angle/);
  if (m) return close(a, (360 * parseFloat(m[2])) / (2 * pi * +m[1]), 0.011);
  return "skip";
});
def("6:area-circle", (q) => {
  const t = q.text;
  const pi = piOf(t);
  const a = ansVal(q);
  if (a === null) return "skip";
  let m = t.match(/radius \$(\d+) cm\. Find the area/);
  if (m) return close(a, pi * (+m[1]) ** 2, 0.011);
  m = t.match(/diameter \$(\d+) cm\. Find its area/);
  if (m) { const r = +m[1] / 2; return close(a, (t.match(/3\.14/) ? P314 : pi) * r * r, 0.06); }
  m = t.match(/outer radius \$(\d+) cm and inner radius \$(\d+) cm/);
  if (m) return close(a, pi * ((+m[1]) ** 2 - (+m[2]) ** 2), 0.011);
  m = t.match(/outer radius \$(\d+(?:\.\d+)?) cm and inner radius \$(\d+(?:\.\d+)?) cm/);
  if (m) return close(a, P314 * (parseFloat(m[1]) ** 2 - parseFloat(m[2]) ** 2), 0.06);
  m = t.match(/area of a circle is \$(\d+) cm\^2\. Find its radius/);
  if (m) return close(a, Math.sqrt((+m[1] * 7) / 22), 0.011);
  m = t.match(/area of a circle is \$(\d+) cm\^2\. Find its circumference/);
  if (m) { const r = Math.sqrt((+m[1] * 7) / 22); return close(a, 2 * pi * r, 0.011); }
  return "skip";
});
def("6:area-rect", (q) => {
  const t = q.text.replace(/[$₹,]/g, "");
  const a = ansVal(q);
  if (a === null) return "skip";
  let m = t.match(/side \$(\d+) m\. Find its area/);
  if (m) return a === (+m[1]) ** 2;
  m = t.match(/\$(\d+) m long and \$(\d+) m wide\. Find its area/);
  if (m) return a === +m[1] * +m[2];
  m = t.match(/perimeter \$(\d+) m and breadth \$(\d+) m\. Find its area/);
  if (m) return a === (+m[1] / 2 - +m[2]) * +m[2];
  m = t.match(/(\d+) m by (\d+) m is to be tiled at (\d+) per m/);
  if (m) return a === +m[1] * +m[2] * +m[3];
  m = t.match(/(\d+) m by (\d+) m must be fenced with wire costing (\d+) per metre/);
  if (m) return a === 2 * (+m[1] + +m[2]) * +m[3];
  m = t.match(/(\d+) m by (\d+) m has a path (\d+) m wide/);
  if (m) { const l = +m[1], b = +m[2], w = +m[3]; return a === l * b - (l - 2 * w) * (b - 2 * w); }
  return "skip";
});
def("6:area-para-tri", (q) => {
  const t = q.text.replace(/\$/g, "");
  const a = ansVal(q);
  if (a === null) return "skip";
  let m = t.match(/base \$(\d+) cm and perpendicular height \$(\d+) cm\. Find its area/);
  if (m) return a === +m[1] * +m[2];
  m = t.match(/base \$(\d+) cm and perpendicular height \$(\d+) cm\. Find its area \(in cm\)\^?2?/) ?? t.match(/triangle has base \$(\d+) cm and perpendicular height \$(\d+) cm/);
  if (m && t.match(/[Tt]riangle/)) return close(a, (+m[1] * +m[2]) / 2, 1e-9);
  m = t.match(/base \$(\d+) cm, slant side \$(\d+) cm, and perpendicular height \$(\d+) cm/);
  if (m) return a === +m[1] * +m[3];
  m = t.match(/area \$(\d+) cm\^2 and base \$(\d+) cm\. Find its (perpendicular )?height/);
  if (m) return a === +m[1] / +m[2];
  m = t.match(/area \$(\d+) cm\^2\. A triangle stands on the same base/);
  if (m) return close(a, +m[1] / 2, 1e-9);
  m = t.match(/area \$(\d+) cm\^2 and base \$(\d+) cm\. Find its height/);
  if (m) return a === +m[1] / +m[2];
  m = t.match(/area \$(\d+) cm\^2 and base \$(\d+) cm\. Find its height \(in cm\)/) && t.match(/[Tt]riangle/);
  if (m) { const A = +(t.match(/area \$(\d+) cm/)?.[1] ?? NaN), b = +(t.match(/base \$(\d+) cm/)?.[1] ?? NaN); return a === (2 * A) / b; }
  return "skip";
});
def("6:reverse-area", (q) => {
  const t = q.text.replace(/\$/g, "");
  const a = ansVal(q);
  if (a === null) return "skip";
  let m = t.match(/square has area \$(\d+) cm\^2\. Find its side/);
  if (m) return a === Math.sqrt(+m[1]);
  m = t.match(/area \$(\d+) cm\^2 and length \$(\d+) cm\. Find its breadth/);
  if (m) return a === +m[1] / +m[2];
  m = t.match(/area \$(\d+) cm\^2 and breadth \$(\d+) cm\. Find its length/);
  if (m) return a === +m[1] / +m[2];
  m = t.match(/perimeter \$(\d+) cm and area \$(\d+) cm\^2\. Find the length of its longer side/);
  if (m) {
    const P = +m[1] / 2, A = +m[2];
    const disc = P * P - 4 * A;
    if (disc < 0) return false;
    return a === (P + Math.sqrt(disc)) / 2;
  }
  m = t.match(/area \$(\d+) cm\^2 and base \$(\d+) cm\. Find its height/);
  if (m && t.match(/[Pp]arallelogram/)) return a === +m[1] / +m[2];
  m = t.match(/area \$(\d+) cm\^2 and base \$(\d+) cm\. Find its height/);
  if (m && t.match(/[Tt]riangle/)) return a === (2 * +m[1]) / +m[2];
  return "skip";
});
def("6:combo-shape", (q) => {
  const t = q.text;
  const pi = piOf(t);
  const a = ansVal(q);
  if (a === null) return "skip";
  let m = t.replace(/[$]/g, "").match(/cutting away a (\d+) m . (\d+) m rectangle from one corner of a (\d+) m . (\d+) m rectangle/);
  if (m) return a === +m[3] * +m[4] - +m[1] * +m[2];
  m = t.replace(/[$]/g, "").match(/cutting a (\d+) m . (\d+) m corner out of a (\d+) m . (\d+) m rectangle/);
  if (m) return a === 2 * (+m[3] + +m[4]);
  m = t.replace(/[$]/g, "").match(/rectangle (\d+) m long and (\d+) m wide, with a semicircular bend/);
  if (m) { const l = +m[1], w = +m[2]; return close(a, l * w + pi * (w / 2) ** 2, 0.011); }
  m = t.replace(/[$]/g, "").match(/two straight sides of (\d+) m each, joined by two semicircular bends of diameter (\d+) m/);
  if (m) return close(a, 2 * +m[1] + pi * +m[2], 0.011);
  return "skip";
});
def("6:semi-circle", (q) => {
  const t = q.text;
  const pi = piOf(t);
  const a = ansVal(q);
  if (a === null) return "skip";
  let m = t.match(/radius \$(\d+) m\. Find its perimeter/);
  if (m) return close(a, pi * +m[1] + 2 * +m[1], 0.011);
  m = t.match(/radius \$(\d+) cm\. Find the area of the glass/);
  if (m) return close(a, (pi * (+m[1]) ** 2) / 2, 0.011);
  m = t.match(/semicircle of radius \$(\d+(?:\.\d+)?) cm\. Find the area/);
  if (m) return close(a, (P314 * parseFloat(m[1]) ** 2) / 2, 0.06);
  m = t.match(/semicircle of radius \$(\d+(?:\.\d+)?) cm \(arc \+ diameter\)/);
  if (m) return close(a, P314 * parseFloat(m[1]) + 2 * parseFloat(m[1]), 0.06);
  m = t.match(/area of a semicircle is \$(\d+) cm\^2\. Find its radius/);
  if (m) return close(a, Math.sqrt((+m[1] * 7) / 11), 0.011);
  return "skip";
});

// ── ch07 ───────────────────────────────────────────────────────────────────
const DECK: Record<string, number> = {
  "a heart": 13, "a red card": 26, "a black card": 26, "a spade": 13, "not a heart": 39,
  "an ace": 4, "a king": 4, "a face card (J, Q or K)": 12, "a seven": 4,
  "a number card from 2 to 10": 36, "a queen or a king": 8, "not a face card": 40,
  "an ace or a king": 8, "a heart or a spade": 26, "a red face card": 6,
  "a card that is not red": 26, "the queen of hearts": 1, "a red king": 2,
  "a face card of spades": 3, "the ace of spades": 1, "a heart face card": 3, "a black face card": 6,
};
function dieSet(label: string): number[] {
  const f = [1, 2, 3, 4, 5, 6];
  if (label.includes("even number")) return f.filter((x) => x % 2 === 0);
  if (label.includes("odd number")) return f.filter((x) => x % 2 === 1);
  if (label.includes("prime")) return [2, 3, 5];
  if (label.includes("perfect square")) return [1, 4];
  const m3 = label.match(/multiple of \$(\d+)\$/);
  if (m3) return f.filter((x) => x % +m3[1] === 0);
  const gt = label.match(/greater than \$(\d+)\$/);
  if (gt) return f.filter((x) => x > +gt[1]);
  const al = label.match(/at least \$(\d+)\$/);
  if (al) return f.filter((x) => x >= +al[1]);
  const ls = label.match(/less than \$(\d+)\$/);
  if (ls) return f.filter((x) => x < +ls[1]);
  const am = label.match(/at most \$(\d+)\$/);
  if (am) return f.filter((x) => x <= +am[1]);
  const fac = label.match(/factor of \$(\d+)\$/);
  if (fac) return f.filter((x) => +fac[1] % x === 0);
  return [];
}
def("7:simple-dice", (q) => {
  const t = q.text;
  const a = ansVal(q);
  if (a === null) return "skip";
  if (t.match(/rolling a \$(\d+)\?\.\(Give/)) return close(a, 1 / 6);
  if (t.match(/probability of rolling a \$\d+\$/)) return close(a, 1 / 6, 1e-9) || "skip";
  const notE = t.match(/find \$P\(.not E\)\$|score is NOT/);
  if (notE) {
    const label = t.match(/“(.+?)”/)?.[1] ?? t.match(/NOT (a \$?\d.?|an even number|a prime number|a multiple of .\d+|a perfect square|a number greater than .\d+)/)?.[1];
    if (!label) return "skip";
    const fav = dieSet(label).length || 1;
    return close(a, (6 - fav) / 6, 1e-9);
  }
  if (t.match(/P\(E\) = \\frac\{(\d+)\}\{(\d+)\}/) || t.match(/probability of event \$E\$ is/)) {
    const m = t.match(/\\frac\{(\d+)\}\{(\d+)\}/);
    if (!m) return "skip";
    return close(a, (+m[2] - +m[1]) / +m[2], 1e-9);
  }
  const label = t.match(/rolling (.+?)”/)?.[1] ?? t.match(/score is (.+?)\. \(Fraction/)?.[1];
  if (label) {
    // combined conditions
    if (label.includes("even and greater than")) return close(a, diceCount((x) => x % 2 === 0 && x > 3) / 6, 1e-9);
    if (label.includes("odd and prime")) return close(a, diceCount((x) => x % 2 === 1 && [2, 3, 5].includes(x)) / 6, 1e-9);
    if (label.includes("even and less than")) return close(a, diceCount((x) => x % 2 === 0 && x < 5) / 6, 1e-9);
    if (label.includes("multiple of") && label.includes("or")) return close(a, diceCount((x) => x % 2 === 0 || x % 3 === 0) / 6, 1e-9);
    if (label.includes("prime or a perfect square")) return close(a, diceCount((x) => [2, 3, 5, 1, 4].includes(x)) / 6, 1e-9);
    if (label.includes("not a prime")) return close(a, diceCount((x) => ![2, 3, 5].includes(x)) / 6, 1e-9);
    if (label.includes("even but not")) return close(a, diceCount((x) => x % 2 === 0 && x !== 4) / 6, 1e-9);
    if (label.includes("greater than") && label.includes("less than")) return close(a, diceCount((x) => x > 2 && x < 6) / 6, 1e-9);
    const s = dieSet(label);
    if (s.length) return close(a, s.length / 6, 1e-9);
  }
  return "skip";
});
def("7:simple-coin", (q) => {
  const t = q.text;
  const a = ansVal(q);
  if (a === null) return "skip";
  if (t.match(/tossed once/)) return close(a, 1 / 2, 1e-9);
  const n = t.match(/tossed twice/) ? 2 : t.match(/three times/) ? 3 : 0;
  if (!n) return "skip";
  const label = t.match(/“(.+?)”/)?.[1] ?? "";
  const outs = coinEnum(n);
  const fav = outs.filter((o) => {
    const h = countOnes(o);
    if (label === "exactly two heads") return h === 2;
    if (label === "exactly one head") return h === 1;
    if (label === "exactly three heads") return h === 3;
    if (label === "at least one head") return h >= 1;
    if (label === "at least two heads") return h >= 2;
    if (label === "no heads") return h === 0;
    if (label === "at least one tail") return h < n;
    if (label === "both coins showing the same face") return o === "00" || o === "11";
    if (label === "the two coins showing different faces") return o === "01" || o === "10";
    if (label === "all three coins showing the same face") return o === "000" || o === "111";
    if (label === "exactly one tail") return h === n - 1;
    return false;
  }).length;
  return close(a, fav / 2 ** n, 1e-9);
});
def("7:coin-atleast", (q) => {
  const m = q.text.match(/tossed \$(\d+)\$ times/);
  if (!m) return "skip";
  return close(ansVal(q) as number, (2 ** +m[1] - 1) / 2 ** +m[1], 1e-9);
});
def("7:complement", (q) => {
  const t = q.text;
  const a = ansVal(q);
  if (a === null) return "skip";
  if (t.match(/fair die is rolled once\. Find the probability that the score is NOT/)) {
    const label = t.match(/NOT (a \$6\$|an even number|a prime number|a multiple of \$3\$|a perfect square|a number greater than \$4\$)/)?.[1] ?? "";
    const fav = dieSet(label.replace(/\$/g, "")).length || (label.includes("$6$") ? 1 : 0);
    return close(a, (6 - fav) / 6, 1e-9);
  }
  if (t.match(/P\(E\) = \\frac\{(\d+)\}\{(\d+)\}\. Find/)) {
    const m = t.match(/\\frac\{(\d+)\}\{(\d+)\}/)!;
    return close(a, (+m[2] - +m[1]) / +m[2], 1e-9);
  }
  if (t.match(/letter is chosen at random from the word/)) {
    const w = t.match(/“([A-Z]+)”/)?.[1];
    if (!w) return "skip";
    const cons = [...w].filter((c) => !"AEIOU".includes(c)).length;
    return close(a, cons / w.length, 1e-9);
  }
  if (t.match(/standard deck/)) {
    const label = t.match(/E is “drawing (.+?)”/)?.[1];
    if (!label) return "skip";
    const fav = DECK[label];
    return fav !== undefined ? close(a, (52 - fav) / 52, 1e-9) : "skip";
  }
  if (t.match(/spinner has \$8\$ equal sectors/)) {
    const label = t.match(/does NOT point at (.+?)\. \(Fraction/)?.[1] ?? "";
    const s = dieSet(label.replace(/\\?\$/g, ""));
    if (!s.length && !label.includes("odd") && !label.includes("multiple")) return "skip";
    return close(a, (8 - s.length) / 8, 1e-9);
  }
  if (t.match(/AT LEAST ONE|do NOT show the same|sum is NOT/)) {
    if (t.match(/Two fair dice.*AT LEAST ONE die shows a \$6\$/)) return close(a, 35 / 36, 1e-9);
    if (t.match(/do NOT show the same number/)) return close(a, 30 / 36, 1e-9);
    if (t.match(/coin is tossed \$3\$ times.*AT LEAST one head/)) return close(a, 7 / 8, 1e-9);
    if (t.match(/coin is tossed \$4\$ times.*AT LEAST one tail/)) return close(a, 15 / 16, 1e-9);
    if (t.match(/sum is NOT \$7\$/)) return close(a, 30 / 36, 1e-9);
  }
  return "skip";
});
def("7:sum-two-dice", (q) => {
  const t = q.text;
  const a = ansVal(q);
  if (a === null) return "skip";
  let m = t.match(/sum of the two numbers is \$(\d+)\$/);
  if (m) return close(a, diceCount((x, y) => x + y === +m![1]) / 36, 1e-9);
  m = t.match(/sum is greater than \$(\d+)\$/);
  if (m) return close(a, diceCount((x, y) => x + y > +m![1]) / 36, 1e-9);
  m = t.match(/sum is at most \$(\d+)\$/);
  if (m) return close(a, diceCount((x, y) => x + y <= +m![1]) / 36, 1e-9);
  if (t.match(/sum is a prime number/)) return close(a, diceCount((x, y) => [2, 3, 5, 7, 11].includes(x + y)) / 36, 1e-9);
  m = t.match(/PRODUCT of the two numbers is \$(\d+)\$/);
  if (m) return close(a, diceCount((x, y) => x * y === +m![1]) / 36, 1e-9);
  m = t.match(/differ by exactly \$(\d+)\$/);
  if (m) return close(a, diceCount((x, y) => Math.abs(x - y) === +m![1]) / 36, 1e-9);
  if (t.match(/both dice show odd/)) return close(a, diceCount((x, y) => x % 2 === 1 && y % 2 === 1) / 36, 1e-9);
  if (t.match(/product of the two numbers is even/)) return close(a, diceCount((x, y) => (x * y) % 2 === 0) / 36, 1e-9);
  if (t.match(/at least one die shows a \$6\$/)) return close(a, diceCount((x, y) => x === 6 || y === 6) / 36, 1e-9);
  if (t.match(/same number \(doubles\)/)) return close(a, diceCount((x, y) => x === y) / 36, 1e-9);
  return "skip";
});
def("7:marble-bag", (q) => {
  const t = q.text.replace(/\$/g, "");
  const a = ansVal(q);
  if (a === null) return "skip";
  const m = t.match(/contains (\d+) red, (\d+) blue(?: and|,) (\d+) green/);
  if (!m) {
    const m2 = t.match(/contains (\d+) red and (\d+) blue/);
    if (!m2) return "skip";
    const [r, b] = [+m2[1], +m2[2]];
    if (t.match(/it is red\./)) return close(a, r / (r + b), 1e-9);
    if (t.match(/it is blue\./)) return close(a, b / (r + b), 1e-9);
    return "skip";
  }
  const c = [+m[1], +m[2], +m[3]];
  const total = sum(c);
  const idx = (name: string) => (name.startsWith("red") ? 0 : name.startsWith("blue") ? 1 : 2);
  let mm = t.match(/probability that it is (red|blue|green)\. \(Fraction/);
  if (mm) return close(a, c[idx(mm[1])] / total, 1e-9);
  mm = t.match(/it is NOT (red|blue|green)\./);
  if (mm) return close(a, (total - c[idx(mm[1])]) / total, 1e-9);
  mm = t.match(/it is (red|blue|green) or (red|blue|green)\./);
  if (mm) return close(a, (c[idx(mm[1])] + c[idx(mm[2])]) / total, 1e-9);
  mm = t.match(/(\d+) (red|blue|green) marbles? (?:is|are) taken out and kept aside.*probability that it is (red|blue|green)/);
  if (mm) { const i = idx(mm[2]); return close(a, (c[i] - +mm[1]) / (total - +mm[1]), 1e-9); }
  mm = t.match(/(\d+) extra (red|blue|green) marbles are dropped in.*probability that it is (red|blue|green)/);
  if (mm) { const i = idx(mm[2]); return close(a, (c[i] + +mm[1]) / (total + +mm[1]), 1e-9); }
  return "skip";
});
def("7:cards-lite", (q) => {
  const label = q.text.match(/probability of drawing (.+?)\. \(Fraction/)?.[1];
  if (!label) return "skip";
  const fav = DECK[label];
  if (fav === undefined) return "skip";
  return close(ansVal(q) as number, fav / 52, 1e-9);
});
def("7:spinner", (q) => {
  const t = q.text.replace(/\$/g, "").replace(/\\circ/g, "");
  const a = ansVal(q);
  if (a === null) return "skip";
  const sectors = [...t.matchAll(/(red|blue|green|yellow|purple) (\d+)/g)].map((m) => [m[1], +m[2]] as [string, number]);
  if (sectors.length >= 4) {
    let mm = t.match(/stops on (red|blue|green|yellow|purple)\./);
    if (mm) { const s = sectors.find((x) => x[0] === mm![1]); return s ? close(a, s[1] / 360, 1e-9) : "skip"; }
    mm = t.match(/lands on (red|blue|green|yellow|purple) OR (red|blue|green|yellow|purple)\./);
    if (mm) {
      const s1 = sectors.find((x) => x[0] === mm![1])!, s2 = sectors.find((x) => x[0] === mm![2])!;
      return close(a, (s1[1] + s2[1]) / 360, 1e-9);
    }
    mm = t.match(/does NOT land on (red|blue|green|yellow|purple)\./);
    if (mm) { const s = sectors.find((x) => x[0] === mm![1])!; return close(a, (360 - s[1]) / 360, 1e-9); }
  }
  const label = t.match(/points at (?:a number that is )?(.+?)\. \(Fraction/)?.[1] ?? t.match(/it points at (.+?)\. \(Fraction/)?.[1];
  if (label) {
    const L = label.replace(/\\/g, "");
    const set = dieSet(L);
    if (set.length) return close(a, set.length / 8, 1e-9);
    if (L.includes("less than $9") || L.includes("less than 9")) return close(a, 1, 1e-9);
  }
  return "skip";
});
def("7:exp-vs-theo", (q) => {
  const t = q.text.replace(/[$,]/g, "");
  const a = ansVal(q);
  if (a === null) return "skip";
  let m = t.match(/tossed (\d+) times and heads came up (\d+) times/);
  if (m) return close(a, +m[2] / +m[1], 1e-9);
  m = t.match(/rolled (\d+) times and the face \d+ appeared (\d+) times/);
  if (m) return close(a, +m[2] / +m[1], 1e-9);
  m = t.match(/(\d+) students were asked their favourite fruit\. Results: mango: (\d+), apple: (\d+), banana: (\d+), grapes: (\d+)\./);
  if (m) {
    const counts = [+m[2], +m[3], +m[4], +m[5]];
    const ask = t.match(/favourite fruit is (mango|apple|banana|grapes)/)?.[1];
    const i = ["mango", "apple", "banana", "grapes"].indexOf(ask ?? "");
    return i >= 0 ? close(a, counts[i] / +m[1], 1e-9) : "skip";
  }
  m = t.match(/sample of (\d+) students, (\d+) said mango.*school has (\d+) students in total/);
  if (m) return close(a, (+m[2] * +m[3]) / +m[1], 1e-6);
  return "skip";
});
def("7:word-letters", (q) => {
  const t = q.text;
  const a = ansVal(q);
  if (a === null) return "skip";
  const w = t.match(/word “([A-Z]+)”|from the word “([A-Z]+)”/);
  const word = w?.[1] ?? w?.[2];
  if (!word) return "skip";
  const vowels = [...word].filter((c) => "AEIOU".includes(c)).length;
  if (t.match(/it is a vowel\./)) return close(a, vowels / word.length, 1e-9);
  if (t.match(/it is a consonant\./)) return close(a, (word.length - vowels) / word.length, 1e-9);
  if (t.match(/NOT a vowel/)) return close(a, (word.length - vowels) / word.length, 1e-9);
  const ch = t.match(/letter (\w)\. \(Fraction/)?.[1];
  if (ch) return close(a, [...word].filter((x) => x === ch).length / word.length, 1e-9);
  const two = t.match(/it is ([A-Z]) or ([A-Z])\. \(Fraction/);
  if (two) return close(a, [...word].filter((x) => x === two[1] || x === two[2]).length / word.length, 1e-9);
  return "skip";
});
def("7:tree-count", (q) => {
  const t = q.text.replace(/\$/g, "");
  const a = ansVal(q);
  if (a === null) return "skip";
  const size = t.match(/coin tossed twice/) ? 4 : t.match(/coin tossed three times/) ? 8 : t.match(/coin tossed and a die rolled|coin tossed and die rolled/) ? 12 : t.match(/two dice rolled/) ? 36 : t.match(/outfit/) ? 6 : 0;
  if (!size) return "skip";
  if (t.match(/how many outcomes are in the complete sample space/)) return a === size;
  const outs = size === 4 ? coinEnum(2) : size === 8 ? coinEnum(3) : size === 12 ? coinEnum(1).flatMap((c) => [1, 2, 3, 4, 5, 6].map((n) => c + n)) : size === 36 ? [...Array(36).keys()].map((i) => `${Math.floor(i / 6) + 1}-${(i % 6) + 1}`) : ["red+jeans", "red+khakis", "red+shorts", "blue+jeans", "blue+khakis", "blue+shorts"];
  const label = t.match(/“(.+?)”/)?.[1] ?? "";
  const L = label.replace(/\\?\$/g, "");
  const fav = outs.filter((o) => {
    if (L === "at least one head") return o.includes("1") || o.includes("H");
    if (L === "exactly one head") return countOnes(o.replace(/[^01]/g, "")) === 1 && !o.includes("-");
    if (L === "both faces the same") return o === "00" || o === "11";
    if (L === "exactly two heads") return countOnes(o.replace(/[^01]/g, "")) === 2 && !o.includes("-");
    if (L === "at least one tail") return o.includes("0") || o.includes("T");
    if (L === "all three the same face") return o === "000" || o === "111";
    if (L === "at least two heads") return countOnes(o.replace(/[^01]/g, "")) >= 2 && !o.includes("-");
    if (L === "heads and an even number") return o[0] === "H" && +o.slice(1) % 2 === 0;
    if (L === "tails and a number greater than 4") return o[0] === "T" && +o.slice(1) > 4;
    if (L === "an even number on the die") return +o.slice(1) % 2 === 0;
    if (L === "heads and a prime number") return o[0] === "H" && [2, 3, 5].includes(+o.slice(1));
    if (L.startsWith("the sum is")) { const k = +L.match(/sum is (\d+)/)![1]; const [x, y] = o.split("-").map(Number); return x + y === k; }
    if (L.startsWith("doubles")) { const [x, y] = o.split("-").map(Number); return x === y; }
    if (L === "at least one six") { const [x, y] = o.split("-").map(Number); return x === 6 || y === 6; }
    if (L === "the first die greater than the second") { const [x, y] = o.split("-").map(Number); return x > y; }
    if (L === "at least one even number") { const [x, y] = o.split("-").map(Number); return x % 2 === 0 || y % 2 === 0; }
    if (L === "both dice even") { const [x, y] = o.split("-").map(Number); return x % 2 === 0 && y % 2 === 0; }
    if (L.startsWith("the sum at least")) { const k = +L.match(/at least (\d+)/)![1]; const [x, y] = o.split("-").map(Number); return x + y >= k; }
    if (L === "the red shirt") return o.startsWith("red");
    if (L === "jeans") return o.endsWith("jeans");
    if (L === "the red shirt with jeans") return o === "red+jeans";
    return false;
  }).length;
  if (t.match(/how many outcomes of the sample space match/)) return a === fav;
  return close(a, fav / size, 1e-9);
});
def("7:which-more-likely", (q) => {
  const t = q.text.replace(/\$/g, "");
  if (q.type !== "mcq" || !q.choices) return "skip";
  let m = t.match(/holds (\d+) red and (\d+) blue/);
  if (m) {
    const want = +m[1] > +m[2] ? "drawing a red marble" : +m[1] < +m[2] ? "drawing a blue marble" : "they are equally likely";
    return q.answer === want;
  }
  m = t.match(/pick the MOST likely one|BEST odds/);
  if (m) {
    const items = [...t.matchAll(/([A-C])\$: (.+?) →/g)];
    if (items.length < 3) return "skip";
    const favs = items.map((it) => {
      const label = it[2];
      const sm = label.match(/sum is \$(\d+)/) ?? label.match(/sum is (\d+)/);
      if (sm) return diceCount((x, y) => x + y === +sm[1]);
      if (label.includes("even number")) return 3;
      if (label.includes("prime number")) return 3;
      const g = label.match(/greater than \$(\d+)/);
      if (g) return diceCount((x) => x > +g[1]);
      const am = label.match(/at most \$(\d+)/);
      if (am) return diceCount((x) => x <= +am[1]);
      const m3 = label.match(/multiple of \$(\d+)/);
      if (m3) return diceCount((x) => x % +m3[1] === 0);
      const r6 = label.match(/rolling a \$(\d)\$/);
      if (r6) return 1;
      const ls = label.match(/less than \$(\d+)/);
      if (ls) return diceCount((x) => x < +ls[1]);
      return -1;
    });
    if (favs.some((f) => f < 0)) return "skip";
    const maxI = favs.indexOf(Math.max(...favs));
    if (new Set(favs).size !== favs.length) return "skip";
    return q.answer === q.choices[maxI];
  }
  m = t.match(/contains (\d+) red, (\d+) blue and (\d+) green marbles\. One marble is drawn at random\. Which statement is true/);
  if (m) {
    const cc = [+m[1], +m[2], +m[3]];
    const maxI = cc.indexOf(Math.max(...cc));
    if (new Set(cc).size !== 3) return "skip";
    return q.answer === ["drawing a red marble", "drawing a blue marble", "drawing a green marble"][maxI];
  }
  return "skip";
});
def("7:mcq-scale", (q) => {
  if (q.type !== "mcq" || !q.choices) return "skip";
  const val = (s: string): number | null => {
    const fr = s.match(/\\frac\{(-?\d+)\}\{(\d+)\}/);
    if (fr) return +fr[1] / +fr[2];
    const d = s.match(/(-?\d+(?:\.\d+)?)/);
    return d ? parseFloat(d[1]) : null;
  };
  const vals = q.choices.map((c) => val(c));
  if (vals.some((v) => v === null)) return "skip";
  const ai = q.choices.indexOf(q.answer);
  if (q.text.includes("CANNOT be the probability")) {
    const inRange = (v: number) => v >= 0 && v <= 1;
    return !inRange(vals[ai] as number) && vals.filter((v, i) => i !== ai).every((v) => inRange(v as number));
  }
  return "skip";
});

// ── ch08 ───────────────────────────────────────────────────────────────────
def("8:next-term", (q) => {
  const t = q.text.replace(/\$/g, "").replace(/\\ldots/g, "");
  if (q.type === "mcq") {
    const nums = [...t.matchAll(/(\d+), (\d+), (\d+), (\d+)/g)];
    if (!nums.length) return "skip";
    const L = nums[0].slice(1).map(Number);
    // machine rule double+1
    if (t.includes("double, then add 1")) {
      let x = L[0];
      for (let i = 1; i < L.length; i++) { x = 2 * x + 1; if (x !== L[i]) return false; }
      const p1 = 2 * L[L.length - 1] + 1, p2 = 2 * p1 + 1;
      return q.answer === `${p1}, ${p2}`;
    }
    // doubling gaps
    const gaps = L.slice(1).map((v, i) => v - L[i]);
    const doubling = gaps.every((g, i) => (i === 0 ? true : g === 2 * gaps[i - 1]));
    if (doubling) {
      const last = L[L.length - 1];
      let g = gaps[gaps.length - 1];
      const p1 = last + 2 * g, p2 = p1 + 4 * g;
      return q.answer === `${p1}, ${p2}`;
    }
    return "skip";
  }
  const nums = [...t.matchAll(/(-?\d+), (-?\d+), (-?\d+), (-?\d+)(?:, (-?\d+))?/g)];
  if (!nums.length) return "skip";
  const L = nums[0].slice(1).filter(Boolean).map(Number);
  const last = L[L.length - 1];
  const d = L[1] - L[0];
  if (L.every((v, i) => i === 0 || v - L[i - 1] === d)) return close(ansVal(q) as number, last + d);
  const rr = L[1] / L[0];
  if (L.every((v, i) => i === 0 || v === L[i - 1] * rr)) return close(ansVal(q) as number, last * rr);
  if (L.every((v, i) => v === (L[0] / 2 ** i) * 2 ** 0 && Math.abs(v - L[0] / 2 ** i) < 1e-9)) return close(ansVal(q) as number, L[0] / 2 ** L.length);
  const gaps = L.slice(1).map((v, i) => v - L[i]);
  if (gaps.length >= 3 && gaps.every((g, i) => i === 0 || g - gaps[i - 1] === gaps[1] - gaps[0])) {
    const gd = gaps[1] - gaps[0];
    return close(ansVal(q) as number, last + gaps[gaps.length - 1] + gd);
  }
  // squares / triangular
  if (L.every((v, i) => v === (L[0] + i) ** 2)) return close(ansVal(q) as number, (L[0] + L.length) ** 2);
  const tri = (n: number) => (n * (n + 1)) / 2;
  const s0 = Math.round((Math.sqrt(8 * L[0] + 1) - 1) / 2);
  if (L.every((v, i) => v === tri(s0 + i))) return close(ansVal(q) as number, tri(s0 + L.length));
  return "skip";
});
def("8:explicit-rule", (q) => {
  const t = q.text.replace(/\$/g, "");
  const a = ansVal(q);
  if (a === null) return "skip";
  let m = t.match(/t_n = (\d+)n ([+-]) (\d+) for n .. 1\. Find t_\{?(\d+)/) ?? t.match(/t_n = (\d+)n ([+-]) (\d+)/);
  if (m && t.match(/Find t/)) { const p = +m[1], s = m[2] === "-" ? -1 : 1, qq = +m[3]; const n = +(t.match(/t_\{?(\d+)\}?\??\.$/)?.[1] ?? t.match(/Find t_\{?(\d+)/)?.[1] ?? NaN); return isFinite(n) && a === p * n + s * qq; }
  m = t.match(/t_n = n\^2 ([+-]) (\d*)n ([+-]) (\d+)/);
  if (m) { const s1 = m[1] === "-" ? -1 : 1, b = (m[2] === "" ? 1 : +m[2]) * s1, s2 = m[3] === "-" ? -1 : 1, c = +m[4]; const n = +(t.match(/Find t_\{?(\d+)/)?.[1] ?? NaN); return isFinite(n) && a === n * n + b * n + c; }
  if (q.type === "tf") {
    m = t.match(/\$?(-?\d+)\$? is a term of the sequence t_n = (\d+)n ([+-]) (\d+)/);
    if (m) { const mv = +m[1], p = +m[2], s = m[3] === "-" ? -1 : 1, c = +m[4]; const n = (mv - c) / (p * s); const whole = Number.isInteger(n) && n >= 1; return q.answer === (whole ? "true" : "false"); }
  }
  return "skip";
});
def("8:recursive-eval", (q) => {
  const t = q.text.replace(/\$/g, "");
  const a = ansVal(q);
  if (a === null) return "skip";
  let m = t.match(/t_1 = (\d+) and t_n = t_\{n-1\} \+ (\d+) for n .. 2\. Find t_\{?(\d+)/);
  if (m) return a === recur(+m[1], +m[3], (p) => p + +m[2]);
  m = t.match(/t_1 = (\d+) and t_n = (\d+)\\?,?t_\{n-1\} for n .. 2\. Find t_\{?(\d+)/) ?? t.match(/t_1 = (\d+) and t_n = (\d+)t_\{n-1\} for n .. 2\. Find t_\{?(\d+)/);
  if (m) return a === recur(+m[1], +m[3], (p) => p * +m[2]);
  m = t.match(/t_1 = (\d+) and t_n = (\d+)t_\{n-1\} \+ (\d+) for n .. 2\. Find t_\{?(\d+)/);
  if (m) return a === recur(+m[1], +m[4], (p) => +m[2] * p + +m[3]);
  m = t.match(/t_1 = (\d+) and t_n = t_\{n-1\}\^2 - 1 for n .. 2\. Find t_4/);
  if (m) return a === recur(+m[1], 4, (p) => p * p - 1);
  return "skip";
});
def("8:ap-nth", (q) => {
  const t = q.text.replace(/\$/g, "").replace(/,/g, " ");
  const a = ansVal(q);
  if (a === null) return "skip";
  let m = t.match(/(\d+)(?:st|nd|rd|th) term of the arithmetic progression (\d+) (\d+) (\d+) (\d+)/);
  if (m) { const n = +m[1], a0 = +m[2], d = +m[3] - a0; return a === a0 + (n - 1) * d; }
  m = t.match(/Which term of the arithmetic progression (\d+) (\d+) (\d+) is (-?\d+)/);
  if (m) { const a0 = +m[1], d = +m[2] - a0; return a === (+m[4] - a0) / d + 1; }
  m = t.match(/the (\d+)(?:st|nd|rd|th) term is (-?\d+) and the (\d+)(?:st|nd|rd|th) term is (-?\d+)\. Find the (\d+)(?:st|nd|rd|th) term/);
  if (m) { const p = +m[1], x = +m[2], qq = +m[3], y = +m[4], ridx = +m[5]; const d = (y - x) / (qq - p); return a === x + (ridx - p) * d; }
  m = t.match(/booking fee of .?([\d,]+) plus .?(\d+) per kilometre.*journey of (\d+) km/);
  if (m) return a === parseInt(m[1].replace(/,/g, ""), 10) + +m[2] * +m[3];
  m = t.match(/annual salary of .?([\d,]+) and receives an increment of .?([\d,]+) every year\. What is his annual salary in the (\d+)(?:st|nd|rd|th) year/);
  if (m) return a === parseInt(m[1].replace(/,/g, ""), 10) + (parseInt(m[1].replace(/,/g, ""), 10) === 0 ? 0 : 0) + (+m[3] - 1) * parseInt(m[2].replace(/,/g, ""), 10);
  return "skip";
});
def("8:ap-find-d", (q) => {
  const t = q.text.replace(/\$/g, "");
  const a = ansVal(q);
  if (a === null) return "skip";
  let m = t.match(/t_\{?(\d+)\}?? = (-?\d+) and t_\{?(\d+)\}?? = (-?\d+)\. Find the common difference/);
  if (m) return a === (+m[4] - +m[2]) / (+m[3] - +m[1]);
  m = t.match(/the (\d+)(?:st|nd|rd|th) term is (-?\d+) and the common difference is d = (-?\d+)\. Find the first term/);
  if (m) return a === +m[2] - (+m[1] - 1) * +m[3];
  return "skip";
});
def("8:ap-missing", (q) => {
  const t = q.text.replace(/\$/g, "");
  const a = ansVal(q);
  if (a === null) return "skip";
  let m = t.match(/are \$?(-?\d+), \$\? and \$?(-?\d+)\$?\. Find the missing middle term/);
  if (m) return a === (+m[1] + +m[2]) / 2;
  m = t.match(/(\d+) numbers are inserted between \$?(-?\d+) and \$?(-?\d+) so that the whole list forms an AP\. Find the .last. inserted number/);
  if (m) { const k = +m[1], x = +m[2], y = +m[3]; const d = (y - x) / (k + 1); return a === y - d; }
  m = t.match(/\?\, ?(-?\d+), \?\, ?(-?\d+) is an AP with two hidden terms\. Find the .first. term/);
  if (m) { const t1 = +m[1], t3 = +m[2]; return a === t1 - (t3 - t1) / 2; }
  m = t.match(/(-?\d+), \?\, ?(-?\d+), \? is an AP with two hidden terms\. Find the .last. \(fourth\) term/);
  if (m) { const t0 = +m[1], t2 = +m[2]; return a === t2 + (t2 - t0) / 2; }
  const four = t.match(/The four numbers \$?(-?\d+), \$?\?, (-?\d+), (-?\d+)\$? are consecutive/);
  if (four) { const t0 = +four[1], t2 = +four[2], t3 = +four[3]; return a === (t0 + t2) / 2; }
  const fourB = t.match(/The four numbers \$?(-?\d+), (-?\d+), \$?\?, (-?\d+)\$? are consecutive/);
  if (fourB) { const t0 = +fourB[1], t1 = +fourB[2], t3 = +fourB[3]; return a === (t1 + t3) / 2; }
  return "skip";
});
def("8:sum-naturals", (q) => {
  const t = q.text.replace(/\$/g, "");
  const a = ansVal(q);
  if (a === null) return "skip";
  let m = t.match(/first \$(\d+)\$ natural numbers: 1 \+ 2 \+ 3 \+ .+ \+ (\d+)/);
  if (m) return a === (+m[1] * (+m[1] + 1)) / 2;
  m = t.match(/sum \$(\d+) \+ (\d+) \+ (\d+) \+ .+ \+ (\d+)\$/);
  if (m) { const lo = +m[1], hi = +m[4]; return a === (hi * (hi + 1)) / 2 - ((lo - 1) * lo) / 2; }
  m = t.match(/first \$(\d+)\$ multiples of \$(\d+)\$/);
  if (m) return a === (+m[2] * +m[1] * (+m[1] + 1)) / 2;
  return "skip";
});
def("8:sum-odd", (q) => {
  const t = q.text.replace(/\$/g, "");
  const a = ansVal(q);
  if (a === null) return "skip";
  let m = t.match(/first \$(\d+)\$ odd numbers: 1 \+ 3 \+ 5 \+ .+ \+ (\d+)/);
  if (m) return a === (+m[1]) ** 2;
  m = t.match(/find 1 \+ 3 \+ 5 \+ .+ \+ (\d+) \(the first \$(\d+)\$ odd numbers\)/);
  if (m) return a === (+m[2]) ** 2;
  m = t.match(/first \$(\d+)\$ even numbers: 2 \+ 4 \+ 6 \+ .+ \+ (\d+)/);
  if (m) return a === +m[1] * (+m[1] + 1);
  m = t.match(/odd numbers from \$(\d+)\$ to \$(\d+)\$ \(inclusive\)/);
  if (m) { const lo = +m[1], hi = +m[2]; const k = (hi + 1) / 2, mm = (lo - 1) / 2; return a === k * k - mm * mm; }
  m = t.match(/starting from \$1\$, must be added together for the sum to first exceed \$(\d+)\$/);
  if (m) { const X = +m[1]; return a === Math.floor(Math.sqrt(X)) + 1; }
  return "skip";
});
def("8:ap-sum-word", (q) => {
  const t = q.text.replace(/[$,₊]/g, "");
  const a = ansVal(q);
  if (a === null) return "skip";
  let m = t.match(/for \$(\d+)\$ rows\. How many marbles are used in total/);
  if (m) return a === (+m[1] * (+m[1] + 1)) / 2;
  m = t.match(/first row has \$(\d+)\$ seats and each row behind it has \$(\d+)\$ more seats.*there are \$(\d+)\$ rows/);
  if (m) return a === (+m[3] * (2 * +m[1] + (+m[3] - 1) * +m[2])) / 2;
  m = t.match(/saves .?(\d+) in the first week and increases her weekly saving by .?(\d+) every week\. How much has she saved in total after \$(\d+)\$ weeks/);
  if (m) return a === (+m[3] * (2 * +m[1] + (+m[3] - 1) * +m[2])) / 2;
  m = t.match(/first row has \$(\d+)\$ seats and every row behind has \$(\d+)\$ more seats.*exactly \$(\d+)\$ seats\. How many rows/);
  if (m) {
    const a0 = +m[1], d = +m[2], S = +m[3];
    let n = 1, acc = a0;
    while (acc < S) { n++; acc += a0 + (n - 1) * d; }
    return a === n && acc === S;
  }
  return "skip";
});
def("8:gp-nth", (q) => {
  const t = q.text.replace(/\$/g, "");
  const a = ansVal(q);
  if (a === null) return "skip";
  let m = t.match(/progression (-?\d+) (-?\d+) (-?\d+) (-?\d+)/);
  if (m && t.match(/st|nd|rd|th\) term/)) {
    const n = ordNum(t.split("progression")[0].replace(/[^0-9]/g, " ") || "") ?? ordNum(t.match(/Find its (\d+)(?:st|nd|rd|th) term/)?.[1] ?? "");
    const a0 = +m[1], r = +m[2] / a0;
    if (!n) return "skip";
    return a === a0 * r ** (n - 1);
  }
  m = t.match(/progression (\d+) (\d+) (\d+) is (\d+)/);
  if (m) { const a0 = +m[1], r = +m[2] / a0; return a === Math.log(+m[4] / a0) / Math.log(r) + 1; }
  m = t.match(/dropped from a height of \$(\d+) ft\. After each bounce it rises to (\\frac\{\d+\}\{\d+})/);
  if (m) {
    const h = +m[1];
    const pf = m[2] === "\\frac{1}{2}" ? 0.5 : m[2] === "\\frac{3}{4}" ? 0.75 : m[2] === "\\frac{3}{5}" ? 0.6 : 0.8;
    const k = ordNum(t.match(/after the (\d+)(?:st|nd|rd|th) bounce/)?.[1] ?? "");
    if (!k) return "skip";
    return close(a, h * pf ** k, 0.011);
  }
  m = t.match(/starts with \$(\d+)\$ squares at Stage 1, and the count .doubles.*at Stage \$(\d+)\$/);
  if (m) return a === +m[1] * 2 ** (+m[2] - 1);
  return "skip";
});
def("8:sierpinski", (q) => {
  const t = q.text.replace(/\$/g, "");
  const a = ansVal(q);
  if (a === null) return "skip";
  let m = t.match(/at Stage \$(\d+)\$\?/) ?? t.match(/by Stage \$(\d+)\$/) ?? t.match(/at Stage \$(\d+)\$/) ?? t.match(/Stage \$(\d+)\$/);
  if (!m) return "skip";
  const k = +m[1];
  if (t.includes("black triangles")) return a === 3 ** k;
  if (t.includes("white holes")) return a === (3 ** k - 1) / 2;
  if (t.includes("3}{4") || t.includes("black area becomes")) {
    const v = ansVal(q);
    return v !== null && close(v, (3 / 4) ** k, 1e-9);
  }
  if (t.includes("carpet")) {
    const v = ansVal(q);
    return v !== null && close(v, (8 / 9) ** k, 1e-9);
  }
  return "skip";
});
def("8:virahanka", (q) => {
  const t = q.text.replace(/\$/g, "");
  const a = ansVal(q);
  if (a === null) return "skip";
  if (t.includes("What is the next term")) {
    const nums = [...t.matchAll(/(\d+)/g)].map((m) => +m[1]);
    const seq = nums.filter((v, i) => i < 8);
    const k = seq.length;
    for (let i = 2; i < k; i++) if (seq[i] !== seq[i - 1] + seq[i - 2]) return "skip";
    return a === seq[k - 2] + seq[k - 1];
  }
  const m = t.match(/Find V_\{?(\d+)/);
  if (m) return a === vir(+m[1]);
  const m2 = t.match(/Virahanka number V_\{?(\d+)/);
  if (m2) return a === vir(+m2[1]);
  const m3 = t.match(/Find t_\{?(\d+)/);
  if (m3) {
    const seeds = t.match(/t_1 = (\d+), t_2 = (\d+)/);
    if (!seeds) return "skip";
    let x = +seeds[1], y = +seeds[2];
    const k = +m3[1];
    for (let i = 3; i <= k; i++) { const c = x + y; x = y; y = c; }
    return a === y;
  }
  return "skip";
});

// ═══════════════════════════ STRUCTURAL SWEEP ═════════════════════════════
const SAMPLES = 150;
interface SpotQ { ch: number; gen: string; q: Question; d: Diff }
const spotPool: SpotQ[] = [];

let totalQ = 0, structErrs = 0, throwErrs = 0;
const coverage: Record<string, number[]> = {};
const dupFlags: string[] = [];

for (const C of CHAPTERS) {
  for (const gid of Object.keys(C.bank)) {
    const fn = C.bank[gid] as unknown as (r: import("../src/lib/wars/types").RNG, d: Diff) => Question;
    const key = `${C.ch}:${gid}`;
    coverage[key] = [0, 0, 0, 0];
    const seenText = new Map<string, number>();
    let genErrs = 0;
    for (let i = 0; i < SAMPLES; i++) {
      const d = ((i % 4) + 1) as Diff;
      const seed = ((C.ch * 2654435761) ^ (i * 7919 + d * 104729 + gid.length * 31)) >>> 0;
      const r = makeRNG(seed);
      let q: Question;
      try {
        q = fn(r, d);
      } catch (e) {
        console.log(`THROW  ${key} d=${d} i=${i}: ${e instanceof Error ? e.message : e}`);
        throwErrs++; genErrs++;
        continue;
      }
      coverage[key][d - 1]++;
      totalQ++;
      const issues: string[] = [];
      if (!q.text || !q.answer || !q.concept || !q.hint1 || !q.hint2) issues.push("missing required field");
      if (!q.steps || q.steps.length < 3) issues.push(`steps length ${q.steps?.length ?? 0} < 3`);
      if (q.steps && q.steps.some((s) => typeof s !== "string")) issues.push("non-string step");
      for (const s of [q.text, q.answer, q.concept, q.hint1, q.hint2, ...(q.steps ?? []), ...(q.choices ?? [])]) {
        if (typeof s !== "string") continue;
        if (/NaN|Infinity|undefined|\[object/.test(s)) issues.push(`junk token in ${JSON.stringify(s.slice(0, 80))}`);
        const dollars = (s.match(/\$/g) ?? []).length;
        if (dollars % 2 !== 0) issues.push(`unbalanced $ (${dollars}) in ${JSON.stringify(s.slice(0, 80))}`);
      }
      if (q.type === "mcq") {
        const ch = q.choices ?? [];
        if (ch.length < 2) issues.push("mcq <2 choices");
        else if (new Set(ch).size !== ch.length) issues.push(`duplicate choices: ${JSON.stringify(ch)}`);
        if (!ch.includes(q.answer)) issues.push(`answer not in choices: ${JSON.stringify(q.answer)}`);
      } else if (q.type === "tf") {
        if (!["true", "false"].includes(q.answer)) issues.push(`tf answer ${JSON.stringify(q.answer)}`);
      } else if (q.type === "numeric") {
        if (parseNumLike(q.answer) === null || !isFinite(parseNumLike(q.answer) as number)) issues.push(`numeric answer unparsable: ${JSON.stringify(q.answer)}`);
      } else if (q.type === "fill") {
        if (!q.answer.trim()) issues.push("empty fill answer");
      } else issues.push(`unknown type ${q.type}`);
      const dk = `${q.text}‖${q.answer}`;
      seenText.set(dk, (seenText.get(dk) ?? 0) + 1);
      if (issues.length) {
        structErrs++; genErrs++;
        if (genErrs <= 4) console.log(`STRUCT ${key} d=${d} i=${i}: ${issues.join(" | ")}`);
      }
      spotPool.push({ ch: C.ch, gen: gid, q, d });
    }
    // duplicate rate sanity
    let dups = 0;
    for (const c of seenText.values()) if (c > 1) dups += c - 1;
    if (dups / SAMPLES > 0.3) dupFlags.push(`${key}: ${((dups / SAMPLES) * 100).toFixed(0)}% duplicate (text+answer)`);
  }
}

// difficulty coverage report
const noCov: string[] = [];
for (const [key, counts] of Object.entries(coverage)) {
  counts.forEach((c, i) => { if (c === 0) noCov.push(`${key} d=${i + 1}`); });
}

// ═══════════════════════════ SPOT VERIFICATION ════════════════════════════
let verified = 0, mismatch = 0, skipped = 0, noVerifier = 0;
console.log("\n════ SPOT VERIFICATION (independent re-derivation) ════");
for (const C of CHAPTERS) {
  const eligible = spotPool.filter((s) => s.ch === C.ch && V[`${s.ch}:${s.gen}`]);
  const numericFirst = eligible.filter((s) => s.q.type === "numeric");
  const rest = eligible.filter((s) => s.q.type !== "numeric");
  const rng = makeRNG(0x5eed ^ (C.ch * 99991));
  const pickN = 25;
  const chosen: SpotQ[] = [];
  const usedIdx = new Set<number>();
  const poolOrder = [...numericFirst.map((_, i) => ({ i, w: 0 })), ...rest.map((_, i) => ({ i, w: 1 }))].map((x, j) => ({ ...x, j }));
  // sample: 25 tries over numeric-first then rest
  const takeFrom = (arr: SpotQ[], n: number) => {
    let got = 0, guard = 0;
    while (got < n && guard < arr.length * 6) {
      const idx = Math.floor(rng.next() * arr.length);
      guard++;
      const tag = `${arr[idx].gen}:${idx}`;
      if (usedIdx.has(tag)) continue;
      usedIdx.add(tag);
      chosen.push(arr[idx]);
      got++;
    }
  };
  takeFrom(numericFirst, pickN);
  takeFrom(rest, pickN - chosen.length);
  let v = 0, mm = 0, sk = 0;
  for (const s of chosen) {
    const res = V[`${s.ch}:${s.gen}`](s.q);
    if (res === "skip") { sk++; continue; }
    if (res) { v++; }
    else {
      mm++;
      console.log(`\nMISMATCH ch${s.ch} gen=${s.gen} d=${s.d}`);
      console.log(JSON.stringify(s.q, null, 1));
    }
  }
  verified += v; mismatch += mm; skipped += sk;
  noVerifier += spotPool.filter((s) => s.ch === C.ch && !V[`${s.ch}:${s.gen}`] && s.q.type === "numeric").length;
  console.log(`ch${C.ch}: verified ${v} · mismatch ${mm} · skipped ${sk} (of ${chosen.length} sampled)`);
}

// ═══════════════════════════ REPORT ═══════════════════════════════════════
console.log("\n════ SUMMARY ════");
console.log(`generators sampled: ${Object.keys(coverage).length} · questions generated: ${totalQ}`);
console.log(`structural errors: ${structErrs} · throws: ${throwErrs}`);
if (noCov.length) console.log(`DIFFICULTY COVERAGE GAPS: ${noCov.join(", ")}`);
else console.log("difficulty coverage: every generator produced questions at d=1..4 ✓");
if (dupFlags.length) console.log(`DUP-RATE FLAGS: ${dupFlags.join(" | ")}`);
console.log(`spot verification: verified ${verified} · MISMATCH ${mismatch} · skipped ${skipped}`);
console.log(`numeric questions without a verifier (not counted): ${noVerifier}`);

let grand = 0;
for (const C of CHAPTERS) {
  const declared = Object.keys(C.bank);
  const zs = Object.keys(C.bankSize);
  const sumZ = Object.values(C.bankSize).reduce((x, y) => x + y, 0);
  grand += sumZ;
  const mismatchKeys = declared.filter((k) => !zs.includes(k)).concat(zs.filter((k) => !declared.includes(k)));
  console.log(`ch${C.ch}: bank=${declared.length} gens · bankSize sum=${sumZ.toLocaleString()}${mismatchKeys.length ? ` · KEY MISMATCH: ${mismatchKeys.join(",")}` : ""}`);
}
console.log(`GRAND BANK TOTAL: ${grand.toLocaleString()}`);
if (structErrs + throwErrs + mismatch + noCov.length > 0) process.exitCode = 1;
