import { NextResponse } from "next/server";
import { listRange, listRemove, K } from "@/lib/kv";
import type { Comment } from "@/app/api/comments/route";

export const runtime = "nodejs";

function authorized(req: Request): boolean {
  const key = process.env.ADMIN_KEY;
  if (!key) return false;
  return req.headers.get("x-admin-key") === key;
}

// Delete a comment by id (from both its page list and the global list).
export async function DELETE(req: Request) {
  if (!authorized(req)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  const id = new URL(req.url).searchParams.get("id");
  if (!id) return NextResponse.json({ ok: false }, { status: 400 });

  // Find the matching stored string in the global list, then remove from both.
  const all = await listRange(K.commentsAll, 0, 1999);
  for (const s of all) {
    let c: Comment | null = null;
    try { c = JSON.parse(s) as Comment; } catch { c = null; }
    if (c && c.id === id) {
      await listRemove(K.commentsAll, s);
      await listRemove(K.commentList(c.path), s);
      return NextResponse.json({ ok: true });
    }
  }
  return NextResponse.json({ ok: false, error: "not found" }, { status: 404 });
}
