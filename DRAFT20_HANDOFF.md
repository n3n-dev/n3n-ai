# Draft 20 작업 정리

**브랜치:** `feat/draft20-iteration`
**라우트:** `/draft20`

---

## 구현 완료

### 전역 UI
- **VideoIntroOverlay** — 진입 시 풀스크린 영상 + 건너뛰기 / 오늘 다시 보지 않기(localStorage) / 닫기
- **Navbar** — N3N 로고(센터) + `Company` 링크 / Hero 통과 후 화이트 블러 배경 / 모바일 풀스크린 오버레이 메뉴
- **Footer** — 한영 토글 / 패밀리 사이트(N3N·Jikji.ai) / 상담 문의 mailto:business@n3n.co.kr
- **ScrollToTop** 버튼

### 섹션
| 섹션 | 컴포넌트 | 내용 |
|---|---|---|
| Hero | `Hero20` | "From Video to Decisions" + AI 영상 분석 카피, 컬럼 바 애니메이션(반응형 56/96) |
| Platform Overview | `PlatformOverview` | "흩어진 현장 데이터를 실시간 인텔리전스로" + 오비탈 다이어그램 |
| Solution Tabs | `SolutionTabs` | INNOWATCH/WIZEYE 탭 · 6개 카드 캐러셀 · 4개 통계 카드 |
| Connected X | `ConnectedXSection` | 배경 영상 풀블리드 + 도메인 chip (드론·선박·UAM·로지스틱스) |
| Industries | `Industries` | 6개 카드 + NEXT STEPS (스마트시티/보안/팩토리/에너지/데이터센터/물류) |
| Our Clients | `UseCasesMarquee` | 좌우 마퀴 클라이언트 카드 |

### 반응형
- 모바일(<768px): 단일 컬럼, 본문 14px, 햄버거 풀스크린 메뉴
- 데스크탑(≥768px): 멀티 컬럼, 본문 16px

---

## TODO

- [ ] `/company` 페이지 콘텐츠
- [ ] 서비스 이용약관 페이지/링크 (현재 `href="#"`)
- [ ] 영문 카피 최종 검수
- [ ] `DraftSwitcher` 삭제 여부 결정 (현재 `return null`)
