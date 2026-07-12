import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Flipbook from "@/components/Flipbook";
import { BOOK_TITLE, BOOK_TOTAL, type Lang } from "@/lib/bookPages";

export function generateStaticParams() {
  return [{ lang: "ko" }, { lang: "en" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (lang !== "ko" && lang !== "en") return {};
  return { title: BOOK_TITLE[lang as Lang] };
}

export default async function ReadPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { lang } = await params;
  if (lang !== "ko" && lang !== "en") notFound();
  const { page } = await searchParams;
  const p = Math.min(BOOK_TOTAL[lang as Lang], Math.max(1, parseInt(page ?? "1", 10) || 1));
  return <Flipbook lang={lang as Lang} initialPage={p} />;
}
