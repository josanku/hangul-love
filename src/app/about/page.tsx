"use client";

import { useLang } from "@/lib/i18n";
import Community from "@/components/Community";

export default function About() {
  const { lang } = useLang();

  return (
    <div className="container-narrow prose serif" style={{ padding: "48px 0" }}>
      {lang === "ko" ? (
        <>
          <h1>소개</h1>
          <p>
            <strong>한글 러브(hangul.love)</strong>는 한글을 세계와 나누기 위한 곳입니다.
            세종이 남긴 소리의 과학을 누구나 읽고, 배우고, 즐길 수 있도록 두 권의 책을
            온라인에 무료로 엽니다.
          </p>
          <h2>두 권의 책</h2>
          <ul>
            <li><strong>『한글정음 — 우주비밀코드』</strong> (한국어)</li>
            <li><strong>『HANGUL: The Design Philosophy』</strong> (영어)</li>
          </ul>
          <p>
            훈민정음의 창제 원리부터 첫소리·가운뎃소리·끝소리의 풀이, 정인지 서문,
            그리고 한글 원형·한글아트·아시므(시므 스스로)까지 — 원전을 오늘의 언어로
            풀어냅니다.
          </p>
          <h2>함께 즐기기</h2>
          <ul>
            <li><a href="https://hangulart.com" target="_blank" rel="noopener">hangulart.com</a> — 한글 생성 예술</li>
            <li><a href="https://myhangulname.com" target="_blank" rel="noopener">myhangulname.com</a> — 내 이름을 한글로</li>
          </ul>
          <h2>만든 이</h2>
          <p>조산구 (Josanku). 문의: 이 사이트의 저장소 또는 위 서비스들을 통해.</p>
          <hr />
          <p style={{ color: "var(--ink-soft)", fontSize: "0.9rem" }}>
            영어 본문은 원본 PDF에서 자동 추출되어 일부 표기가 다듬어지는 중입니다.
          </p>
        </>
      ) : (
        <>
          <h1>About</h1>
          <p>
            <strong>Hangul Love (hangul.love)</strong> exists to share Hangul with the world.
            It opens two books online, free, so anyone can read, learn, and enjoy the science
            of sound King Sejong left us.
          </p>
          <h2>Two books</h2>
          <ul>
            <li><strong>Hangul Jeongeum — The Cosmic Secret Code</strong> (Korean)</li>
            <li><strong>HANGUL: The Design Philosophy</strong> (English)</li>
          </ul>
          <p>
            From the creation principles of Hunminjeongeum through the initial, medial, and
            final sounds, Jeong In-ji&rsquo;s postscript, and on to Hangul&rsquo;s archetypes,
            Hangul art, and Ashimeu (Sime self-Hangul) — the original text, retold for today.
          </p>
          <h2>Keep exploring</h2>
          <ul>
            <li><a href="https://hangulart.com" target="_blank" rel="noopener">hangulart.com</a> — generative Hangul art</li>
            <li><a href="https://myhangulname.com" target="_blank" rel="noopener">myhangulname.com</a> — your name in Hangul</li>
          </ul>
          <h2>Author</h2>
          <p>Josanku. Contact via this site&rsquo;s repository or the services above.</p>
          <hr />
          <p style={{ color: "var(--ink-soft)", fontSize: "0.9rem" }}>
            The English text is auto-extracted from the original PDF and is being refined.
          </p>
        </>
      )}
      <Community title={lang === "ko" ? "소개 · Hangul Love" : "About · Hangul Love"} />
    </div>
  );
}
