import { NextResponse } from "next/server";
import { hgetAll, listRange, isKVConfigured, K } from "@/lib/kv";
import type { Comment } from "@/app/api/comments/route";

export const runtime = "nodejs";

function authorized(req: Request): boolean {
  const key = process.env.ADMIN_KEY;
  if (!key) return false;
  const given = req.headers.get("x-admin-key") ?? new URL(req.url).searchParams.get("key");
  return given === key;
}

export async function GET(req: Request) {
  if (!authorized(req)) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const [views, likes, daily] = await Promise.all([
    hgetAll(K.views),
    hgetAll(K.likes),
    hgetAll(K.daily),
  ]);

  const rawComments = await listRange(K.commentsAll, 0, 199);
  const comments = rawComments
    .map((s) => {
      try { return JSON.parse(s) as Comment; } catch { return null; }
    })
    .filter(Boolean) as Comment[];

  const totalViews = Object.values(views).reduce((a, b) => a + b, 0);
  const totalLikes = Object.values(likes).reduce((a, b) => a + b, 0);

  const topPages = Object.entries(views)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 40);

  const dailySeries = Object.entries(daily).sort((a, b) => a[0].localeCompare(b[0]));

  return NextResponse.json({
    ok: true,
    storage: isKVConfigured() ? "vercel-kv" : "in-memory (연결 시 영구 저장)",
    totalViews,
    totalLikes,
    totalComments: comments.length,
    topPages,
    likesByPage: Object.entries(likes).sort((a, b) => b[1] - a[1]).slice(0, 40),
    dailySeries,
    comments,
  });
}
