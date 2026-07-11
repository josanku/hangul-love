export type Chapter = {
  slug: string; // stable, used in URL
  num: string; // display order label
  koTitle: string;
  enTitle: string;
  koFile: string;
  enFile: string;
};

/**
 * Chapter manifest for both books. Order follows the printed edition.
 * KO source: master/*.md (full text). EN source: pdftotext extraction.
 */
export const CHAPTERS: Chapter[] = [
  { slug: "cover", num: "00", koTitle: "여는 글", enTitle: "Cover & Intro", koFile: "00-cover-intro.md", enFile: "00-cover-intro.txt" },
  { slug: "hunmin-sejong", num: "01", koTitle: "훈민정음 · 세종 서문", enTitle: "Hunminjeongeum · Sejong's Preface", koFile: "01-hunminjeongeum-sejong.md", enFile: "01-hunminjeongeum-sejong.txt" },
  { slug: "toc-intro", num: "02", koTitle: "목차와 머리말", enTitle: "Contents & Introduction", koFile: "02-toc-and-intro.md", enFile: "02-toc-and-intro.txt" },
  { slug: "principles", num: "03", koTitle: "정음 풀이 1 · 창제원리", enTitle: "Explanation 1 · Principles of Creation", koFile: "03-1-changje-wonri.md", enFile: "03-1-principles-creation.txt" },
  { slug: "initials", num: "04", koTitle: "정음 풀이 2 · 첫소리", enTitle: "Explanation 2 · Initial Consonants", koFile: "04-2-cheotsori-puri.md", enFile: "04-2-initial-consonants.txt" },
  { slug: "medials", num: "05", koTitle: "정음 풀이 3 · 가운뎃소리", enTitle: "Explanation 3 · Medial Vowels", koFile: "05-3-gaundetsori-puri.md", enFile: "05-3-medial-vowels.txt" },
  { slug: "finals", num: "06", koTitle: "정음 풀이 4 · 끝소리", enTitle: "Explanation 4 · Final Consonants", koFile: "06-4-kkeutsori-puri.md", enFile: "06-4-final-consonants.txt" },
  { slug: "harmony", num: "07", koTitle: "정음 풀이 5 · 첫가끝 어울림", enTitle: "Explanation 5 · Three-Sound Harmony", koFile: "07-5-cheotgakkeut-irum.md", enFile: "07-5-three-sound-harmony.txt" },
  { slug: "usage", num: "08", koTitle: "정음 풀이 6 · 낱글자 쓰임", enTitle: "Explanation 6 · Example Usage", koFile: "08-6-natgeulja-sayong.md", enFile: "08-6-example-usage.txt" },
  { slug: "jeong-inji", num: "09", koTitle: "마무리 · 정인지 서", enTitle: "Postscript · Jeong In-ji", koFile: "09-matumal-jeong-inji.md", enFile: "09-postscript-jeong-inji.txt" },
  { slug: "guide", num: "10", koTitle: "보탬 · 일러두기", enTitle: "Appendix · Guide & Notice", koFile: "10-botaem-illeoddugi.md", enFile: "10-appendix-guide-notice.txt" },
  { slug: "more-explain", num: "11", koTitle: "보탬 · 덧풀이", enTitle: "Appendix · Additional Notes", koFile: "11-botaem-deotpuri.md", enFile: "11-appendix-additional.txt" },
  { slug: "more-see", num: "12", koTitle: "보탬 · 더보기", enTitle: "Appendix · Supplementary", koFile: "12-botaem-deobogi.md", enFile: "12-appendix-supplementary.txt" },
  { slug: "origin", num: "13", koTitle: "보탬 · 한글 원형", enTitle: "Appendix · Hangul Origin", koFile: "13-botaem-hangul-wonhyeong.md", enFile: "13-appendix-origin.txt" },
  { slug: "art", num: "14", koTitle: "보탬 · 한글아트", enTitle: "Appendix · Hangul Art", koFile: "14-botaem-hangul-art.md", enFile: "14-appendix-hangul-art.txt" },
  { slug: "ashimeu", num: "15", koTitle: "보탬 · 시므 스스로 (아시므)", enTitle: "Appendix · Sime Self-Hangul (Ashimeu)", koFile: "15-botaem-sime-seuseuro.md", enFile: "15-appendix-sime-self-hangul.txt" },
  { slug: "closing", num: "16", koTitle: "보탬 · 연혁 · 닫는 글", enTitle: "References · Editor's Closing", koFile: "16-botaem-yeonhyeok-closing.md", enFile: "16-references-editor-closing.txt" },
];

export function getChapterMeta(slug: string): Chapter | undefined {
  return CHAPTERS.find((c) => c.slug === slug);
}
