# WORKLOG — hangul.love

## 2026-07-11
- 리소스 조사 완료.
  - 책 원본: `/Users/skyblue/hangul/` (repo josanku/hangul, GitHub Pages, CNAME=hangul.hangulmadang.com).
    - KO 전체 본문: `master/*.md` (8,234줄). EN: `chapters-en/*.pdf` (텍스트 없음, 1.5GB PDF).
  - 인프라 참조: `/Users/skyblue/hangulname` (myhangulname.com) = Next.js 16 + Tailwind 4 + Vercel + GitHub josanku.
  - 한글아트: `/Users/skyblue/hangulart` (Next.js, Vercel) + `public/gallery/*.html` (p5.js). ashimeu: `public/ashimeu-hangul.png`.
- 결정: hangul.love = 신규 Next.js 앱 (myhangulname 동일 스택), Vercel 배포, GitHub josanku/hangul-love.
- 도구 확인: node v20.20, npm 10.8, pdftotext OK, gh 로그인(josanku), vercel CLI 없음(npx 사용).
- **EN 본문 추출 완료**: `chapters-en/*.pdf` → `_content/en-raw/*.txt` (pdftotext -layout, 9,254줄). OCR 잔상 소량(정리 필요).
- PLAN.md 작성 완료. (기획서)
- 다음: Next.js 스캐폴드 → 콘텐츠 정리 → 페이지 구현 → GitHub → Vercel/도메인.
