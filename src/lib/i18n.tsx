"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Lang = "ko" | "en";

type Dict = Record<string, { ko: string; en: string }>;

/** UI copy. Add keys as needed; every value is bilingual. */
export const t: Dict = {
  "site.title": { ko: "한글 러브", en: "Hangul Love" },
  "site.tagline": {
    ko: "한글을 읽고, 배우고, 즐기고, 나누다",
    en: "Read, learn, enjoy & share Hangul",
  },
  "nav.home": { ko: "홈", en: "Home" },
  "nav.book": { ko: "책", en: "The Book" },
  "nav.learn": { ko: "배우기", en: "Learn" },
  "nav.art": { ko: "한글아트", en: "Hangul Art" },
  "nav.name": { ko: "내 한글이름", en: "My Hangul Name" },
  "nav.search": { ko: "검색", en: "Search" },
  "nav.about": { ko: "소개", en: "About" },

  "home.heroTitle": { ko: "한글, 사랑하다", en: "Hangul, with Love" },
  "home.heroSub": {
    ko: "세종이 남긴 소리의 과학. 두 권의 책을 무료로 읽고, 59초 만에 원리를 깨우치고, 예술로 즐기세요.",
    en: "The science of sound King Sejong left us. Read both books free, grasp the logic in 59 seconds, and enjoy it as art.",
  },
  "home.readBook": { ko: "책 읽기", en: "Read the book" },
  "home.learn59": { ko: "59초 만에 깨우치기", en: "Learn in 59 seconds" },

  "home.cardBookT": { ko: "두 권의 책", en: "Two Books" },
  "home.cardBookD": {
    ko: "『한글정음』(한국어)과 『HANGUL: The Design Philosophy』(영어) 전문을 챕터별로.",
    en: "Full text of Hangul Jeongeum (Korean) and HANGUL: The Design Philosophy (English), chapter by chapter.",
  },
  "home.cardLearnT": { ko: "아시므 · 59초", en: "Ashimeu · 59s" },
  "home.cardLearnD": {
    ko: "하늘(ㆍ)·사람(ㅣ)·땅(ㅡ) 세 점으로 한글의 원리를 순식간에.",
    en: "Sky (ㆍ), Person (ㅣ), Earth (ㅡ) — three strokes that unlock all of Hangul.",
  },
  "home.cardArtT": { ko: "한글아트", en: "Hangul Art" },
  "home.cardArtD": {
    ko: "자모가 살아 움직이는 생성 예술. hangulart.com 에서 더 보기.",
    en: "Generative art where letters come alive. More at hangulart.com.",
  },
  "home.cardNameT": { ko: "내 한글이름", en: "My Hangul Name" },
  "home.cardNameD": {
    ko: "당신의 이름을 한글로. myhangulname.com 에서 카드로 만들어 보세요.",
    en: "Your name in Hangul. Make a card at myhangulname.com.",
  },

  "book.title": { ko: "두 권의 책", en: "The Books" },
  "book.intro": {
    ko: "챕터를 눌러 웹에서 바로 읽으세요. 언어는 각 페이지에서 전환됩니다.",
    en: "Tap a chapter to read on the web. Switch language on each page.",
  },
  "book.readKo": { ko: "한국어", en: "Korean" },
  "book.readEn": { ko: "English", en: "English" },
  "book.downloadPdf": { ko: "원본 PDF 내려받기", en: "Download original PDF" },
  "book.prev": { ko: "이전", en: "Prev" },
  "book.next": { ko: "다음", en: "Next" },
  "book.toc": { ko: "목차", en: "Contents" },

  "learn.title": { ko: "한글 배우기", en: "Learn Hangul" },
  "learn.ashimeuTitle": {
    ko: "아시므 — 한글 59초 만에 깨우치기",
    en: "Ashimeu — Learn Hangul in 59 Seconds",
  },
  "learn.ashimeuLead": {
    ko: "한글은 외우는 글자가 아니라 이해하는 글자입니다. 단 세 점에서 모든 것이 나옵니다.",
    en: "Hangul is not memorized but understood. Everything grows from just three points.",
  },
  "learn.try": { ko: "자모 조합기", en: "Jamo builder" },

  "about.title": { ko: "소개", en: "About" },

  "common.enjoy": { ko: "이어서 즐기기", en: "Keep exploring" },
  "common.openSite": { ko: "사이트 열기 ↗", en: "Open site ↗" },
  "common.backHome": { ko: "← 홈으로", en: "← Home" },
};

export function tr(key: string, lang: Lang): string {
  return t[key]?.[lang] ?? key;
}

const LangContext = createContext<{
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
}>({ lang: "ko", setLang: () => {}, toggle: () => {} });

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ko");

  useEffect(() => {
    const saved = (typeof window !== "undefined" &&
      window.localStorage.getItem("hl.lang")) as Lang | null;
    if (saved === "ko" || saved === "en") setLangState(saved);
    else if (typeof navigator !== "undefined" && !navigator.language.startsWith("ko"))
      setLangState("en");
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      window.localStorage.setItem("hl.lang", l);
      document.documentElement.lang = l;
    } catch {}
  }, []);

  const toggle = useCallback(() => setLang(lang === "ko" ? "en" : "ko"), [lang, setLang]);

  return (
    <LangContext.Provider value={{ lang, setLang, toggle }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}

/** Convenience hook: translate a key in the current language. */
export function useT() {
  const { lang } = useLang();
  return (key: string) => tr(key, lang);
}
