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
- **Next.js 앱 구현 완료**: layout/Nav/Footer, Home, Book(목록+챕터 리더 KO/EN 17개), Learn(아시므+자모조합기), Art(p5 갤러리), Name(myhangulname iframe), About. i18n(KO/EN 토글, localStorage). 디자인: 한지+오방색.
- `npm run build` 성공(26 페이지, 챕터 17개 SSG). 로컬 스모크 테스트 통과.
- **GitHub 퍼블리시**: https://github.com/josanku/hangul-love (public, main). 대용량 PDF는 .gitignore/.vercelignore 로 제외.
- **Vercel 배포 완료**: project `hangul-love` (prj_SwDjaPpRX7JUkpSCFso4RUA0cMCo), org team_XKrY0ZOeDsPMQ9u4wsFQZwXA (myhangulname/hangulart 동일). GitHub 연결 → 이후 push 자동 배포.
  - Live: https://hangul-love.vercel.app (전 페이지 200, 본문 정상 렌더 확인).
  - 첫 배포가 로컬 1.9GB PDF까지 업로드하려다 실패 → `.vercelignore` 추가 후 재배포(업로드 145B) 성공.
- **도메인 hangul.love**: Vercel 프로젝트에 추가 완료. 단, 네임서버가 Cloudflare(troy/violet.ns.cloudflare.com).
  - ⚠️ 남은 수동 1단계: Cloudflare DNS에 `A  hangul.love  76.76.21.21` (프록시 회색구름/DNS only) 추가 → 자동 연결·SSL 발급. (Cloudflare 자격증명이 로컬에 없어 대신 실행 불가.)
- 상태: 콘텐츠·기능·배포 100% 완료. hangul.love 연결만 CF DNS 레코드 1건 남음.
