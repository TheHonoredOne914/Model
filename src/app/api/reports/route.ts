// GET /api/reports?type=parent|teacher — daily family summary / class weakness heatmap.
// Data comes only from stored evidence; honest empty states when there's nothing yet.
import { NextRequest, NextResponse } from "next/server";
import { parentReport, teacherReport } from "@/server/saathy/reports";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const type = req.nextUrl.searchParams.get("type") ?? "parent";
  try {
    if (type === "teacher") {
      const r = await teacherReport();
      return NextResponse.json({ ok: true, type, ...r });
    }
    const r = await parentReport();
    return NextResponse.json({ ok: true, type: "parent", ...r });
  } catch (e) {
    return NextResponse.json({ ok: false, error: e instanceof Error ? e.message : "report failed" }, { status: 500 });
  }
}
