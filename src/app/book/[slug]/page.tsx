import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CHAPTERS, getChapterMeta, renderKo, renderEn } from "@/lib/book";
import ChapterReader from "./ChapterReader";

export function generateStaticParams() {
  return CHAPTERS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const ch = getChapterMeta(slug);
  if (!ch) return {};
  return {
    title: `${ch.koTitle} · ${ch.enTitle}`,
    description: `${ch.koTitle} — 한글정음 / HANGUL, The Cosmic Philosophy`,
  };
}

export default async function ChapterPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const ch = getChapterMeta(slug);
  if (!ch) notFound();

  const idx = CHAPTERS.findIndex((c) => c.slug === slug);
  const prev = idx > 0 ? CHAPTERS[idx - 1] : null;
  const next = idx < CHAPTERS.length - 1 ? CHAPTERS[idx + 1] : null;

  return (
    <ChapterReader
      koTitle={ch.koTitle}
      enTitle={ch.enTitle}
      koHtml={renderKo(ch)}
      enHtml={renderEn(ch)}
      prev={prev ? { slug: prev.slug, koTitle: prev.koTitle, enTitle: prev.enTitle } : null}
      next={next ? { slug: next.slug, koTitle: next.koTitle, enTitle: next.enTitle } : null}
    />
  );
}
