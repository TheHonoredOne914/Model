// /api/plan — structured learning plan pipeline (slide → quiz → game → flashcards
// with a level check first and a report last; every step agent-owned + checkpointed).
//   POST { book?, chapterNumber?, topic? }  → creates a plan (band from provided level or 1)
//   GET                                     → recent plans
//   PATCH { id, stepDone?, score?, weak? }  → advances a step, writes checkpoint
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { buildPlan } from "@/server/saathy/plan";

export const dynamic = "force-dynamic";

const BOOK_ALIASES: Record<string, string> = { gm: "gm", maths: "gm", math: "gm", us: "us", sst: "us", science: "sc", sci: "sc" };

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json().catch(() => ({}))) as { book?: string; chapterNumber?: number; topic?: string; band?: number };
    const book = BOOK_ALIASES[(body.book ?? "").toLowerCase()] ?? "gm";
    let chapterNumber = body.chapterNumber ?? 0;
    let title = body.topic ?? "";

    if (!title) {
      // pick chapter from the requested book via the KB tree
      const { bookTree } = await import("@/server/saathy/books");
      const tree = bookTree() as Array<{ book: string; number: number; title: string }>;
      const bookName = { gm: "Ganita Manjari", us: "Understanding Society", sc: "Exploration" }[book] ?? "Ganita Manjari";
      const b = tree.filter((t) => t.book === bookName);
      const ch = b.find((c) => c.number === chapterNumber) ?? b[0] ?? tree[0];
      chapterNumber = ch.number;
      title = ch.title;
    }

    const plan = buildPlan(book, chapterNumber, title, Math.max(0, Math.min(3, body.band ?? 1)));
    const row = await db.learningPlan.create({
      data: {
        book: plan.book,
        chapterNumber: plan.chapterNumber,
        title: plan.title,
        band: plan.band,
        steps: JSON.stringify(plan.steps),
        checkpoint: "{}",
      },
    });
    return NextResponse.json({ ok: true, id: row.id, plan });
  } catch (e) {
    return NextResponse.json({ ok: false, error: e instanceof Error ? e.message : "plan create failed" }, { status: 500 });
  }
}

export async function GET() {
  const rows = await db.learningPlan.findMany({ orderBy: { updatedAt: "desc" }, take: 10 });
  return NextResponse.json({
    ok: true,
    plans: rows.map((r) => ({ id: r.id, book: r.book, chapterNumber: r.chapterNumber, title: r.title, band: r.band, steps: JSON.parse(r.steps), currentStep: r.currentStep, checkpoint: JSON.parse(r.checkpoint), updatedAt: r.updatedAt })),
  });
}

export async function PATCH(req: NextRequest) {
  try {
    const body = (await req.json()) as { id: string; stepDone?: string; score?: number; weak?: string[] };
    const row = await db.learningPlan.findUnique({ where: { id: body.id } });
    if (!row) return NextResponse.json({ ok: false, error: "plan not found" }, { status: 404 });

    const steps = JSON.parse(row.steps) as Array<{ id: string; status: string }>;
    const checkpoint = JSON.parse(row.checkpoint) as Record<string, unknown>;

    if (body.stepDone) {
      const st = steps.find((s) => s.id === body.stepDone);
      if (st) st.status = "done";
      checkpoint[body.stepDone] = { score: body.score ?? null, weak: body.weak ?? [], at: new Date().toISOString() };
    }
    const currentStep = Math.min(steps.findIndex((s) => s.status === "pending"), steps.length - 1);
    if (currentStep >= 0 && steps[currentStep]) steps[currentStep].status = "active";

    const updated = await db.learningPlan.update({
      where: { id: body.id },
      data: { steps: JSON.stringify(steps), checkpoint: JSON.stringify(checkpoint), currentStep: Math.max(0, currentStep) },
    });
    return NextResponse.json({ ok: true, steps: JSON.parse(updated.steps), checkpoint: JSON.parse(updated.checkpoint) });
  } catch (e) {
    return NextResponse.json({ ok: false, error: e instanceof Error ? e.message : "patch failed" }, { status: 500 });
  }
}
