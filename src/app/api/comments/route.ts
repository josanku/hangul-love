import { NextResponse } from "next/server";
import { listPush, listRange, K } from "@/lib/kv";

export const runtime = "nodejs";

export type Comment = {
  id: string;
  path: string;
  name: string;
  text: string;
  ts: string;
};

function keyOf(path: string | null): string {
  return (path && path.length <= 300 ? path : "/") || "/";
}

export async function GET(req: Request) {
  const path = keyOf(new URL(req.url).searchParams.get("path"));
  const raw = await listRange(K.commentList(path), 0, 199);
  const comments = raw
    .map((s) => {
      try { return JSON.parse(s) as Comment; } catch { return null; }
    })
    .filter(Boolean);
  return NextResponse.json({ comments });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const path = keyOf(typeof body.path === "string" ? body.path : null);
    const rawName = String(body.name ?? "").replace(/[<>]/g, "").trim().slice(0, 40);
    const name = rawName || "익명";
    const text = String(body.text ?? "").trim().slice(0, 1000);
    if (!text) return NextResponse.json({ ok: false, error: "empty" }, { status: 400 });

    const comment: Comment = {
      id: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
      path,
      name,
      text,
      ts: new Date().toISOString(),
    };
    const s = JSON.stringify(comment);
    await listPush(K.commentList(path), s);
    await listPush(K.commentsAll, s, 2000);
    return NextResponse.json({ ok: true, comment });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
