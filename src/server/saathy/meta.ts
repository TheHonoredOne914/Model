// Parses the model's trailing ```saathy {...}``` meta block out of a reply.
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
    const j = JSON.parse(m[1].trim()) as Record<string, unknown>;
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
