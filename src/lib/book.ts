import "server-only";
import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";
import type { Chapter } from "./chapters";

export { CHAPTERS, getChapterMeta } from "./chapters";
export type { Chapter } from "./chapters";

const BOOK_DIR = path.join(process.cwd(), "src", "content", "book");

function readIfExists(p: string): string | null {
  try {
    return fs.readFileSync(p, "utf8");
  } catch {
    return null;
  }
}

/** Korean markdown → HTML. */
export function renderKo(ch: Chapter): string {
  const raw = readIfExists(path.join(BOOK_DIR, "ko", ch.koFile));
  if (!raw) return "";
  return marked.parse(raw, { async: false }) as string;
}

/** English pdftotext output → tidy paragraph HTML. */
export function renderEn(ch: Chapter): string {
  const raw = readIfExists(path.join(BOOK_DIR, "en", ch.enFile));
  if (!raw) return "";
  const esc = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const blocks = raw.replace(/\r/g, "").split(/\n\s*\n/);
  const out: string[] = [];
  for (const b of blocks) {
    const lines = b.split("\n").map((l) => l.trim()).filter(Boolean);
    if (lines.length === 0) continue;
    const joined = lines.join(" ").replace(/\s+/g, " ").trim();
    if (/^\d{1,4}$/.test(joined)) continue; // drop stray page numbers
    out.push(`<p>${esc(joined)}</p>`);
  }
  return out.join("\n");
}
