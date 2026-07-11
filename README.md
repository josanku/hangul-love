# hangul.love

한글을 **읽고 · 배우고 · 즐기고 · 나누는** 허브.
Read, learn, enjoy & share Hangul.

두 권의 책을 세계에 무료로 공개합니다:
- 『한글정음 — 우주비밀코드』 (한국어)
- 『HANGUL: The Design Philosophy』 (영어)

## 메뉴 / Sections
- **The Book** — 두 책 전문, 챕터별 웹 리더 (KO/EN 전환)
- **Learn** — 아시므: 한글 59초 만에 깨우치기 + 자모 조합기
- **Hangul Art** — 생성 예술 갤러리 · [hangulart.com](https://hangulart.com)
- **My Hangul Name** — 내 이름을 한글로 · [myhangulname.com](https://myhangulname.com)
- **About**

## Stack (myhangulname.com 동일)
Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · Vercel · 도메인 `hangul.love`

## Dev
```bash
npm install
npm run dev      # http://localhost:3000
npm run build
```

## 콘텐츠 소스
- KO 본문: `src/content/book/ko/*.md` (원본 `master/*.md`)
- EN 본문: `src/content/book/en/*.txt` (원본 PDF → pdftotext 추출)
- 대용량 원본 PDF(각 1.5GB)는 저장소에서 제외(`.gitignore`).

기획·기록: [PLAN.md](PLAN.md) · [WORKLOG.md](WORKLOG.md)

© 2026 조산구 (Josanku)
