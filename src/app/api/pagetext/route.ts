import { NextResponse } from "next/server";
import { BOOK_TOTAL, type Lang } from "@/lib/bookPages";
import { getPageText, chapterOfPage } from "@/lib/pageText";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const sp = new URL(req.url).searchParams;
  const lang = sp.get("lang");
  const n = parseInt(sp.get("n") ?? "", 10);
  if ((lang !== "ko" && lang !== "en") || !Number.isInteger(n) || n < 1 || n > BOOK_TOTAL[lang as Lang]) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  const text = getPageText(lang as Lang, n);
  const ch = chapterOfPage(lang as Lang, n);
  return NextResponse.json({ ok: true, text, chapter: ch });
}
