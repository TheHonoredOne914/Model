// POST /api/chat — Saathy's main streaming endpoint.
// Contract (the future VidhyaSaathy app calls the same shape):
//   body: { conversationId?, content, mode?, focusConceptId? }
//   SSE stream of JSON lines: {type:'meta'|'delta'|'done'|'error', ...}
import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import type { ChatMode } from '@/lib/saathy-types';
import { loadProfile, loadSubjects, matchConcepts, loadNotes, loadRecentMessages } from '@/server/saathy/context';
import { buildSystemPrompt, buildHintPrompt, buildWhyPrompt } from '@/server/saathy/prompt';
import { streamChat } from '@/server/saathy/providers';
import { parseSaathyMeta } from '@/server/saathy/meta';

export const dynamic = 'force-dynamic';
export const maxDuration = 120;

function sse(controller: ReadableStreamDefaultController, enc: TextEncoder, obj: unknown) {
  controller.enqueue(enc.encode(`data: ${JSON.stringify(obj)}\n\n`));
}

export async function POST(req: NextRequest) {
  let body: {
    conversationId?: string;
    content?: string;
    mode?: ChatMode;
    focusConceptId?: string | null;
    hintLevel?: 1 | 2 | null; // hint ladder request for pending quickcheck
    whyRequest?: boolean; // "why was I wrong?" request
  };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const content = (body.content ?? '').trim();
  if (!content) return Response.json({ error: 'Message is required' }, { status: 400 });

  const mode: ChatMode = body.mode ?? 'chat';

  try {
    const profile = await loadProfile();
    const subjects = await loadSubjects();

    // Focus concept: explicit param wins, else profile's persisted focus
    const focusConceptId = body.focusConceptId ?? profile.focusConceptId ?? null;
    const focusConcept = focusConceptId
      ? (await db.concept.findUnique({ where: { id: focusConceptId }, include: { mastery: true, chapter: true } }))
      : null;

    // Conversation handling
    let conversationId = body.conversationId;
    let isNew = false;
    if (conversationId) {
      const conv = await db.conversation.findUnique({ where: { id: conversationId } });
      if (!conv) return Response.json({ error: 'Conversation not found' }, { status: 404 });
    } else {
      const conv = await db.conversation.create({
        data: { title: content.slice(0, 60) + (content.length > 60 ? '…' : '') },
      });
      conversationId = conv.id;
      isNew = true;
    }

    const userMessage = await db.message.create({
      data: { conversationId, role: 'user', content },
    });

    // Context assembly (AI-02)
    const haystack = `${content} ${focusConcept?.name ?? ''}`;
    let hits = matchConcepts(haystack, subjects);
    if (focusConcept) {
      const already = hits.some((h) => h.conceptId === focusConcept.id);
      if (!already) {
        hits = [
          {
            conceptId: focusConcept.id,
            conceptName: focusConcept.name,
            tier: focusConcept.mastery ? (focusConcept.mastery.score < 0.25 ? 0 : focusConcept.mastery.score < 0.5 ? 1 : focusConcept.mastery.score < 0.75 ? 2 : 3) : null,
            score: focusConcept.mastery?.score ?? null,
            chapterName: focusConcept.chapter.name,
            subjectName: '',
          },
          ...hits,
        ];
      }
    }
    const noteIds = Array.from(new Set([focusConcept?.id, ...hits.map((h) => h.conceptId)].filter((x): x is string => !!x)));
    const notes = await loadNotes(noteIds);
    const history = await loadRecentMessages(conversationId);

    // System prompt
    let system: string;
    if (body.hintLevel) {
      system = buildHintPrompt(body.hintLevel);
    } else if (body.whyRequest) {
      system = buildWhyPrompt();
    } else {
      system = buildSystemPrompt({
        profile,
        subjects,
        hits,
        notes,
        mode,
        focusConceptName: focusConcept?.name ?? hits[0]?.conceptName ?? null,
      });
    }

    const convId = conversationId;
    const enc = new TextEncoder();
    const abort = new AbortController();

    const stream = new ReadableStream({
      async start(controller) {
        let full = '';
        try {
          sse(controller, enc, {
            type: 'meta',
            conversationId: convId,
            isNew,
            userMessageId: userMessage.id,
            mode,
          });

          req.signal.addEventListener('abort', () => abort.abort());
          for await (const delta of streamChat({ system, turns: history, signal: abort.signal })) {
            full += delta;
            sse(controller, enc, { type: 'delta', text: delta });
          }

          // Persist the assistant reply (meta block stripped)
          const { clean, meta } = body.hintLevel || body.whyRequest ? { clean: full.trim(), meta: {} } : parseSaathyMeta(full);
          const saved = await db.message.create({
            data: {
              conversationId: convId,
              role: 'assistant',
              content: clean || full.trim(),
              meta: JSON.stringify({ mode, ...meta, focusConcept: focusConcept?.name ?? null }),
            },
          });
          await db.conversation.update({ where: { id: convId }, data: { updatedAt: new Date() } });

          sse(controller, enc, { type: 'done', assistantMessageId: saved.id, meta });
        } catch (err) {
          const msg = err instanceof Error ? err.message : 'Unknown error';
          sse(controller, enc, { type: 'error', message: msg });
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream; charset=utf-8',
        'Cache-Control': 'no-cache, no-transform',
        Connection: 'keep-alive',
      },
    });
  } catch (err) {
    console.error('[/api/chat] failed:', err instanceof Error ? err.message : err);
    return Response.json({ error: 'Saathy could not process this request' }, { status: 500 });
  }
}
