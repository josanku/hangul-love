import { NextResponse } from "next/server";
import { hincr, K, today } from "@/lib/kv";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { path } = await req.json();
    if (typeof path !== "string" || path.length > 300) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }
    await hincr(K.views, path || "/");
    await hincr(K.daily, today());
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
