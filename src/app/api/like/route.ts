import { NextResponse } from "next/server";
import { hincr, hgetAll, K } from "@/lib/kv";

export const runtime = "nodejs";

function keyOf(path: string | null): string {
  return (path && path.length <= 300 ? path : "/") || "/";
}

export async function GET(req: Request) {
  const path = keyOf(new URL(req.url).searchParams.get("path"));
  const all = await hgetAll(K.likes);
  return NextResponse.json({ count: all[path] ?? 0 });
}

export async function POST(req: Request) {
  const path = keyOf(new URL(req.url).searchParams.get("path"));
  const count = await hincr(K.likes, path, 1);
  return NextResponse.json({ count });
}
