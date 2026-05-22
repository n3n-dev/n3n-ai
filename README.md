# N3N AI Draft

> 본 빌드는 **사전 배포 버전**입니다. 최종 업데이트는 다음달 진행 예정.

---

## Tech

- React 19 + TypeScript
- Vite 6
- Tailwind CSS 4
- Framer Motion
- React Router

## Local

```bash
npm install
npm run dev      # http://localhost:5173/
npm run build
npm run preview
```

## 주요 섹션

| 섹션                               | 컴포넌트            |
| ---------------------------------- | ------------------- |
| Hero                               | `Hero20`            |
| Platform Overview                  | `PlatformOverview`  |
| Solution Tabs (INNOWATCH / WIZEYE) | `SolutionTabs`      |
| Connected X                        | `ConnectedXSection` |
| Industry Use Cases                 | `Industries`        |
| Operational Intelligence in Action | `UseCasesMarquee`   |

## 전역 UI

- VideoIntroOverlay — 진입 시 풀스크린 영상 + 건너뛰기 / 오늘 다시 보지 않기 / 닫기
- Navbar — Hero 통과 후 화이트 블러 배경, 모바일 풀스크린 오버레이 메뉴
- Footer — 한영 토글, 패밀리 사이트(N3N · Jikji.ai), 상담 문의 mailto
- ScrollToTop

## 반응형

- 모바일 (<768px): 단일 컬럼, 본문 14px, 햄버거 풀스크린 메뉴
- 데스크탑 (≥768px): 멀티 컬럼, 본문 16px
