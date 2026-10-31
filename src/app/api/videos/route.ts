// GET /api/videos?q=&cls=&subject= — curated video kit (all links oEmbed-verified).
// GET /api/videos (no params) → full kit summary + first concepts for browsing.
import { NextRequest, NextResponse } from "next/server";
import { VIDEO_KIT, VIDEO_KIT_SUMMARY, matchVideos, AUTO_PLAN, watchUrl } from "@/data/videos";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q")?.trim() ?? "";
  const cls = req.nextUrl.searchParams.get("cls");
  const subject = req.nextUrl.searchParams.get("subject");

  const shaped = (v: (typeof VIDEO_KIT)[number]) => ({
    subject: v.subject,
    subjectName: v.subjectName,
    cls: v.cls,
    concept: v.concept,
    primary: { ...v.primary, url: watchUrl(v.primary.vid) },
    alternates: v.alternates.map((a) => ({ ...a, url: watchUrl(a.vid) })),
    watchPlan: AUTO_PLAN,
  });

  if (q || cls || subject) {
    let hits = q ? matchVideos(q, { cls: cls ? Number(cls) : undefined, limit: 8 }) : VIDEO_KIT;
    if (cls) hits = hits.filter((v) => v.cls === Number(cls));
    if (subject) hits = hits.filter((v) => v.subject === subject);
    return NextResponse.json({ ok: true, count: hits.length, concepts: hits.map(shaped) });
  }

  return NextResponse.json({
    ok: true,
    summary: VIDEO_KIT_SUMMARY,
    concepts: VIDEO_KIT.slice(0, 12).map(shaped),
  });
}
