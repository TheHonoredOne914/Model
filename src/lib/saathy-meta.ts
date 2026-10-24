// Shared (client + server) parser for Saathy's trailing ```saathy {...}``` meta
// block, plus a live-streaming stripper so the raw JSON never flashes on screen.
import type { ChatMeta, QuickCheck } from '@/lib/saathy-types';

function sanitizeQuickCheck(q: unknown): QuickCheck | null {
  if (!q || typeof q !== 'object') return null;
  const obj = q as Record<string, unknown>;
  const question = typeof obj.question === 'string' ? obj.question.trim() : '';
  const options = Array.isArray(obj.options) ? obj.options.filter((o): o is string => typeof o === 'string').slice(0, 4) : [];
  const answer = typeof obj.answer === 'number' && Number.isInteger(obj.answer) ? obj.answer : -1;
  const hint = typeof obj.hint === 'string' ? obj.hint : '';
  if (!question || options.length < 2 || answer < 0 || answer >= options.length) return null;
  return {
    concept: typeof obj.concept === 'string' ? obj.concept : '',
    question,
    options,
    answer,
    hint,
    hint2: typeof obj.hint2 === 'string' ? obj.hint2 : undefined,
    difficulty: obj.difficulty === 3 ? 3 : obj.difficulty === 1 ? 1 : 2,
  };
}

export function parseSaathyMeta(text: string): { clean: string; meta: ChatMeta } {
  const re = /```saathy\s*([\s\S]*?)```\s*$/;
  const m = text.match(re);
  if (!m) return { clean: text.trim(), meta: {} };
  try {
    const j = JSON.parse(repairJson(m[1].trim())) as Record<string, unknown>;
    const meta: ChatMeta = {
      followups: Array.isArray(j.followups)
        ? (j.followups as unknown[]).filter((f): f is string => typeof f === 'string').slice(0, 3)
        : [],
      sources: Array.isArray(j.sources)
        ? (j.sources as unknown[]).filter((s): s is string => typeof s === 'string').slice(0, 4)
        : [],
      quickcheck: sanitizeQuickCheck(j.quickcheck),
    };
    return { clean: text.slice(0, m.index).trim(), meta };
  } catch {
    return { clean: text.trim(), meta: {} };
  }
}

// Models love writing LaTeX with single backslashes inside JSON strings
// ("$1\ \mathrm{m/s^2}$") — invalid JSON escapes. Re-escape any backslash that
// is not already a valid JSON escape so the meta block parses reliably.
function repairJson(s: string): string {
  return s.replace(/\\(?![\\/"bfnrtu])/g, '\\\\');
}

// Live display: hide a trailing (possibly still-partial) meta block while the
// model is streaming, so students never see raw JSON flicker into the bubble.
export function stripStreamingMeta(text: string): string {
  // 1) Complete meta block sitting at the end: "```saathy\n{...}\n```"
  const complete = text.match(/```saathy[\s\S]*?```[\s\n]*$/);
  if (complete && complete.index !== undefined) {
    return text.slice(0, complete.index).trimEnd();
  }
  // 2) Block opened but the closing fence has not arrived yet.
  const openIdx = text.lastIndexOf('```saathy');
  if (openIdx !== -1) return text.slice(0, openIdx).trimEnd();
  // 3) Only the bare fence characters have arrived so far.
  const fenceIdx = text.lastIndexOf('```');
  if (fenceIdx !== -1 && text.slice(fenceIdx + 3).trim() === '') {
    return text.slice(0, fenceIdx).trimEnd();
  }
  return text;
}
