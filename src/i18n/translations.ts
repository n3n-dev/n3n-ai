export type Lang = 'ko' | 'en'

// ── Type ────────────────────────────────────────────────
export type Translations = {
 nav: {
  about: string; products: string; technology: string
  vision: string; contact: string; cta: string
 }
 hero: {
  badge: string; h1: string; subhead: string; sub: string
  cta1: string; cta2: string; scroll: string
  stat1: string; stat2: string; stat3: string; stat4: string
 }
 industries: {
  eyebrow: string; h2: string; sub: string
  items: { title: string; desc: string }[]
 }
 about: {
  eyebrow: string; h2a: string; h2b: string; body: string; cta: string
  cards: { title: string; desc: string }[]
 }
 connecting: {
  h2: string; sub: string
  nodes: string[]
  phases: { title: string; desc: string }[]
 }
 opint: {
  preText: string; highlight: string; sub: string
  innowatch: { tag: string; desc: string }
  wizeye: { tag: string; desc: string }
  stats: { value: string; label: string }[]
 }
 products: {
  innowatch: {
   headline: string; headlineSub: string; tag: string; desc: string; liveCount: string
   features: { title: string; desc: string }[]
  }
  wizeye: {
   headline: string; headlineSub: string; tag: string; desc: string
   features: { title: string; desc: string }[]
  }
  demo: string
 }
 usecases: {
  eyebrow: string; h2: string; sub: string; cta: string
  cases: { client: string; category: string; desc: string; image: string }[]
 }
 tech: {
  eyebrow: string; h2a: string; h2b: string; sub: string; arch: string
  cards: { label: string; desc: string }[]
  nodes: { label: string; sub: string }[]
 }
 vision: {
  eyebrow: string; h2a: string; h2b: string; sub: string
  steps: { title: string; desc: string }[]
  stats: { value: string; label: string }[]
 }
 contact: {
  eyebrow: string; h2a: string; h2b: string; sub: string
  name: string; namePh: string; company: string; companyPh: string
  email: string; emailPh: string; message: string; messagePh: string
  submit: string; successTitle: string; successSub: string
 }
 footer: {
  desc: string
  cols: { Products: string[]; Company: string[]; Resources: string[]; Legal: string[] }
  rights: string; status: string
 }
 problem: {
  eyebrow: string; h2: string
  lines: string[]
 }
 flow: {
  eyebrow: string; h2: string; sub: string
 }
 steps: {
  s1: { badge: string; role: string }
  s2: { badge: string; role: string }
  s3: { badge: string; role: string }
 }
 decision: {
  eyebrow: string; headline: string; headlineSub: string; desc: string
  features: { title: string; desc: string }[]
  outputs: string[]
 }
 proof: {
  eyebrow: string; h2: string
 }
 closing: {
  eyebrow: string; statement: string
 }
}

// ── Korean ──────────────────────────────────────────────
const ko: Translations = {
 nav: {
  about: '소개',
  products: '제품',
  technology: '기술',
  vision: '비전',
  contact: '문의',
  cta: '시작하기',
 },
 hero: {
  badge: 'Real-time Operational Intelligence Platform',
  h1: '운영 인텔리전스로\n기업을 혁신하세요',
  subhead: '전례 없는 속도와 정확도로 데이터를 감지하고, 분석하고, 실행합니다',
  sub: 'N3N AI 플랫폼이 현장의 모든 데이터를 실시간으로 통합하여, 기업 운영의 전 과정을 하나의 인텔리전스로 연결합니다.',
  cta1: '상담 요청하기',
  cta2: '제품 살펴보기',
  scroll: '스크롤',
  stat1: '가동률 SLA',
  stat2: '추론 지연시간',
  stat3: '엔터프라이즈 고객',
  stat4: 'AI 모니터링',
 },
 industries: {
  eyebrow: 'Industries',
  h2: 'N3N이 해결하는 운영 과제',
  sub: '스마트시티부터 에너지 인프라까지, N3N AI 플랫폼은 산업 현장의 복잡한 운영 문제를 실시간 인텔리전스로 해결합니다.',
  items: [
   { title: '스마트시티', desc: '도시 전역의 교통·환경·안전 데이터를 통합 관제하고, 이상 징후를 즉각 감지하여 시민 안전을 강화합니다.' },
   { title: 'SOC (보안관제)', desc: '수천 대 카메라 영상을 AI로 실시간 분석하여, 침입·이상행동을 자동 탐지하고 즉각 대응합니다.' },
   { title: '스마트 팩토리', desc: '생산 라인의 불량·설비 이상을 실시간 감지하고, 예측 정비로 가동률을 극대화합니다.' },
   { title: '에너지·플랜트', desc: '원격 설비 모니터링과 열화상 분석으로 안전 사고를 예방하고 운영 효율을 높입니다.' },
   { title: '데이터센터', desc: '서버룸 환경 감시, 출입 통제, 장비 상태를 통합 관제하여 무중단 운영을 지원합니다.' },
   { title: '교통·물류', desc: '차량·드론·선박의 실시간 위치와 영상을 통합하여, 물류 흐름을 최적화하고 사고를 예방합니다.' },
  ],
 },
 about: {
  eyebrow: 'N3N AI',
  h2a: 'AI와 클라우드, 혁신의 융합으로',
  h2b: ' 탄생한 인텔리전스',
  body: 'N3N AI는 AI 클라우드 인프라 전문 기업입니다. INNOWATCH와 WIZEYE를 통해 현장 데이터를 실시간으로 수집·분석하고, 더 빠른 의사결정을 지원합니다.',
  cta: '운영 지능 알아보기 →',
  cards: [
   { title: '클라우드 네이티브', desc: '클라우드 네이티브 설계로 무한한 확장성' },
   { title: '엣지 AI 처리', desc: '엣지 AI로 10ms 미만 지연의 실시간 분석' },
   { title: '엔터프라이즈 보안', desc: 'SOC2 Type II 인증, 제로 트러스트 기반의 엔터프라이즈 보안' },
   { title: '즉시 배포', desc: '몇 시간 안에 온보딩부터 프로덕션까지 완전 관리형 배포' },
  ],
 },
 connecting: {
  h2: '모든 연결을 실시간으로 파악하다',
  sub: '센서, 장치, 영상 데이터를 하나로 연결해 이동하는 모든 것을 실시간으로 추적하고 모니터링합니다.',
  nodes: ['차량', '드론', '선박', '스마트시티', '위성', '5G/LTE'],
  phases: [
   { title: 'Phase 1', desc: '글로벌 기업(Cisco 등) 대상 검증된 B2B 플랫폼. 엔터프라이즈급 실시간 영상 통합 인프라를 제공합니다.' },
   { title: 'Phase 2', desc: '차량, 드론, 선박, 스마트시티, 저궤도 위성, 5G/LTE 등 이동하는 모든 디바이스를 연결하는 지능형 인프라스트럭처로 확장.' },
  ],
 },
 opint: {
  preText: "모니터링과 분석을",
  highlight: "하나의 플랫폼으로",
  sub: 'INNOWATCH는 데이터 수집·모니터링을, WIZEYE는 AI 분석·예측을 담당합니다. 두 제품이 결합하여 운영 데이터를 실시간으로 통합하고, 더 빠른 의사결정을 가능하게 만듭니다.',
  innowatch: {
   tag: 'INNOWATCH, 데이터 수집·모니터링',
   desc: '네트워크 한계를 허물고 수천 개의 실시간 영상을 단일 통합 맵(Map)에서 관제합니다.',
  },
  wizeye: {
   tag: 'WIZEYE, AI 분석·예측',
   desc: '복잡한 IoT 빅데이터를 직관적인 비즈니스 프로세스 앱으로 변환하여 행동 가능한 인사이트를 도출합니다.',
  },
  stats: [
   { value: '10억+', label: '일일 분석 프레임' },
   { value: '2가지', label: '핵심 AI 플랫폼' },
   { value: '1개', label: '통합 인텔리전스' },
   { value: '실시간', label: '운영 가시성' },
  ],
 },
 products: {
  innowatch: {
   headline: '모든 현장을',
   headlineSub: '하나의 화면으로 연결합니다',
   tag: '',
   desc: 'CCTV와 IoT 데이터를 통합해 분산된 현장을 실시간으로 통합 관제합니다.',
   liveCount: '여러 시스템을 하나의 운영 화면으로 통합합니다.',
   features: [
    {
     title: 'Live Map 관제',
     desc: 'CCTV 영상과 IoT 데이터를 지도 위에서 동시 확인',
    },
    {
     title: '디스플레이 월',
     desc: '대형 스크린으로 다채널 영상을 중앙 집중 관리',
    },
    {
     title: 'Universal 연동',
     desc: '다양한 보안·운영 시스템과 유연하게 통합',
    },
   ],
  },
  wizeye: {
   headline: 'AI가 상황을',
   headlineSub: '실시간으로 이해합니다',
   tag: 'WIZEYE, AI 분석·예측 엔진',
   desc: '객체 인식과 행동 분석으로 이상 징후를 즉시 감지하고 의미 있는 정보로 변환합니다.',
   features: [
    {
     title: '실시간 객체 감지·추적',
     desc: '40ms 이내 감지·분류·추적',
    },
    {
     title: '행동 패턴 분석',
     desc: '이상 행동 자동 감지, 오경보 30% 절감',
    },
    {
     title: '엣지–클라우드 하이브리드',
     desc: '유연 배포, 99.7% 정확도',
    },
   ],
  },
  demo: '상담 요청',
 },
 usecases: {
  eyebrow: 'Use Cases',
  h2: 'N3N을 이미 사용하고 있는 기업들',
  sub: '글로벌 엔터프라이즈부터 공공 인프라까지, 산업 현장에서 검증된 실제 운영 성과를 확인하세요.',
  cta: '사례 자세히 보기',
  cases: [
   { client: 'Port Operations', category: '물류', desc: '항만 Logistics 운영정보와 IoT 데이터를 통합 시각화하여 4,000+ 자율 센서 노드의 원격 모니터링 및 운영 자동화를 실현했습니다.', image: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=600&q=80' },
   { client: 'Barcelona Smart Grid', category: '도시 운영', desc: 'Smart Alarm Intelligence를 배치하여 IoT 노이즈 캔슬레이션으로 오경보 발송 비용을 30% 절감했습니다.', image: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=600&q=80' },
   { client: 'Global Edge: 데이터 주권', category: '데이터센터', desc: '14개 주권 데이터 허브에 DTG 프로토콜을 구현하여 고우선순위 패킷 무결성을 보장합니다.', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80' },
   { client: '제약 H사', category: '생산공정', desc: 'GMP 공정 시각화로 일탈 관리 및 실시간 온도/습도/차압 관리', image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600&q=80' },
   { client: 'POSCO', category: '생산공정', desc: 'Big Data 기반 실시간 Industrial IoT 데이터 시각화로 글로벌 운영 실현', image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&q=80' },
   { client: 'H반도체', category: '생산공정', desc: 'Wafer Big Data 맵과 연동된 공정 시각화로 예측 정비와 실시간 불량 원인 파악', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80' },
   { client: 'AT&T Mission Control', category: '서비스 운영', desc: '통신사 고객의 IoT Device 이용 정보를 통합 시각화한 IoT Management Platform 구현', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80' },
   { client: 'AT&T Mexico', category: '서비스 운영', desc: '기지국의 센서 데이터, CCTV 정보 통합 시각화로 24/7/365 무인 원격 모니터링', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80' },
   { client: 'Carnival Cruise', category: '서비스 운영', desc: '고객경험품질(QoE)의 시각화로 고객 맞춤형 IoT 서비스를 위한 실시간 데이터 통제력 확보', image: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?w=600&q=80' },
   { client: '인도 자이푸르', category: '스마트시티', desc: '공공인프라 정보 통합 모니터링으로 실시간 원격 운영체계 구현', image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&q=80' },
   { client: '마이애미 데이드', category: '스마트시티', desc: '실시간 통합 행정 KPI를 바탕으로 투명/효율성을 재고할 수 있는 스마트시티 플랫폼', image: 'https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?w=600&q=80' },
   { client: '송도 국제업무지구', category: '스마트시티', desc: '다양한 도시 운영 시나리오와 시각화된 IoT Data를 융합한 스마트시티 운영 솔루션', image: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=600&q=80' },
   { client: 'Cisco ITRM', category: 'IT 인프라', desc: '복잡한 IT인프라를 인과관계에 기반한 논리 MAP으로 시각화하여 문제 원인 즉시 파악', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80' },
   { client: 'H자동차', category: '산업현장', desc: '불꽃감지 센서 데이터와 실시간 영상 통합으로 화재 예방 시스템 구축', image: 'https://images.unsplash.com/photo-1565043666747-69f6646db940?w=600&q=80' },
   { client: 'POSCO ICT', category: '산업현장', desc: '생산 현장의 실시간 Full HD 화면을 중앙 관제실에서 원격 모니터링', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80' },
   { client: 'S시 메트로', category: '공공인프라', desc: '지하철 운영 상황 및 시설물의 원격/지능형 관리를 위한 Smart Connected Subway 구현', image: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=600&q=80' },
   { client: '한국남동발전', category: '공공인프라', desc: '1,500대 이상의 CCTV와 센서 데이터 통합으로 네트워크 비용 및 유지보수비 절감', image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80' },
   { client: '인천대교', category: '공공인프라', desc: 'CCTV, 맵, 데이터, 기상 정보, 감지/제어 시스템의 통합으로 교통상황 통합 모니터링', image: 'https://images.unsplash.com/photo-1545893835-abaa50cbe628?w=600&q=80' },
  ],
 },
 tech: {
  eyebrow: '기술 스택',
  h2a: '엔드-투-엔드',
  h2b: ' AI 인프라',
  sub: '모델 학습부터 엣지 배포까지 수직 통합된 스택. 데이터 수집, 추론, 의사결정까지 하나의 파이프라인으로 처리합니다.',
  cards: [
   { label: 'AI/ML 모델', desc: '커스텀 학습된 비전 & 이상 감지 모델' },
   { label: '엣지 컴퓨팅', desc: '소스에서 데이터 처리, 지연시간 10배 감소' },
   { label: '클라우드 인프라', desc: '자동 확장 멀티리전 인프라' },
   { label: 'MLOps 파이프라인', desc: '지속적 모델 학습 & 배포' },
   { label: '글로벌 CDN', desc: '50개 이상 리전에서 저지연 제공' },
   { label: '제로 트러스트', desc: '종단간 암호화, SOC 2 준수' },
  ],
  arch: '엔드-투-엔드 아키텍처',
  nodes: [
   { label: '데이터 소스', sub: '카메라 · 센서 · API' },
   { label: '엣지 레이어', sub: 'WIZEYE 엣지 노드' },
   { label: 'AI 엔진', sub: 'N3N AI 코어' },
   { label: '클라우드', sub: '멀티리전 IaaS' },
   { label: '인사이트', sub: '대시보드 · 알림 · API' },
  ],
 },
 vision: {
  eyebrow: '작동 방식',
  h2a: '산재된 데이터를',
  h2b: ' 인텔리전스로 전환',
  sub: '다양한 출처의 데이터를 수집하고, AI로 분석하며, 즉각적인 운영 인사이트를 제공합니다.',
  steps: [
   { title: '수집', desc: '카메라, IoT 센서, 데이터 스트림 등 모든 소스를 연결. INNOWATCH와 WIZEYE가 가시적·비가시적 데이터를 동시에 수집합니다.' },
   { title: '분석', desc: 'AI 비전 엔진이 영상 스트림을 실시간으로 처리, 객체, 행동, 이상을 감지하며 IoT 빅데이터를 구조화된 인사이트로 변환합니다.' },
   { title: '통합', desc: 'N3N Operation Intelligence 코어가 INNOWATCH와 WIZEYE의 데이터를 하나의 통합 인텔리전스 레이어로 융합합니다.' },
   { title: '실행', desc: '자동화된 워크플로우가 알림, 복구, 비즈니스 프로세스 앱을 트리거, 인간 개입 없이 즉각적인 행동 가능한 통찰을 제공합니다.' },
  ],
  stats: [
   { value: '100억+', label: '일일 분석 프레임' },
   { value: '500+', label: '카메라 연동' },
   { value: '40ms', label: '평균 감지 시간' },
   { value: '99.7%', label: '정확도' },
  ],
 },
 contact: {
  eyebrow: '문의하기',
  h2a: '지금 바로 운영 인텔리전스를',
  h2b: ' 경험해보세요',
  sub: '전문가 상담을 원하시면 아래 양식을 작성하세요. 빠른 시일 내에 연락드리겠습니다.',
  name: '이름', namePh: '김지은',
  company: '회사', companyPh: '주식회사 예시',
  email: '이메일', emailPh: 'jane@example.com',
  message: '메시지', messagePh: '사용 사례를 알려주세요...',
  submit: '상담 요청하기',
  successTitle: '메시지가 전송되었습니다!',
  successSub: '팀이 24시간 이내에 연락드리겠습니다.',
 },
 footer: {
  desc: 'AI 클라우드 인프라 & 영상 비전 기술. 가시적·비가시적 데이터를 하나의 운영 지능으로.',
  cols: {
   Products: ['INNOWATCH', 'WIZEYE', '요금제', '변경 이력'],
   Company: ['소개', '채용', '블로그', '보도자료'],
   Resources: ['문서', 'API 레퍼런스', '상태', '보안'],
   Legal: ['개인정보처리방침', '이용약관', '쿠키 정책'],
  },
  rights: '© {year} n3n.ai Inc. All rights reserved.',
  status: '모든 시스템 정상 운영 중',
 },
 problem: {
  eyebrow: 'THE PROBLEM',
  h2: '데이터는 쌓이지만,\n판단은 느려집니다',
  lines: [
   '수천 채널의 영상은 쌓이지만, 중요한 순간은 놓치기 쉽습니다.',
   '현장은 연결되어 있어도, 판단은 여전히 사람에게 남아 있습니다.',
  ],
 },
 flow: {
  eyebrow: 'SOLUTION FLOW',
  h2: '하나의 파이프라인,\n세 단계의 지능',
  sub: '데이터를 판단으로 전환합니다.',
 },
 steps: {
  s1: { badge: 'STEP 01 · INNOWATCH', role: '수집·관제' },
  s2: { badge: 'STEP 02 · WIZEYE', role: '감지·분석' },
  s3: { badge: 'STEP 03 · DECISION LAYER', role: '판단·대응' },
 },
 decision: {
  eyebrow: 'STEP 03 · DECISION LAYER',
  headline: '판단을 실행으로',
  headlineSub: '바로 연결합니다',
  desc: '분석 결과를 알림, 대시보드, 자동 대응으로 연결해 즉각적인 운영 대응을 가능하게 합니다.',
  features: [
   { title: 'Rules Engine', desc: '운영 규칙에 따라 상황을 분류하고 우선순위를 매깁니다.' },
   { title: 'Real-time Alerts', desc: '담당자에게 정확한 맥락의 알림을 즉시 전달합니다.' },
   { title: 'Automated Actions', desc: '사전 정의된 대응 절차를 자동으로 실행합니다.' },
  ],
  outputs: ['Incident Detection', 'Real-time Alerts', 'Operational Decisions', 'Automated Actions'],
 },
 proof: {
  eyebrow: 'PROOF',
  h2: '현장이 증명하는 숫자',
 },
 closing: {
  eyebrow: 'VISION',
  statement: '데이터와 사람, 판단을 연결합니다.\n이 흐름이 반복될수록 N3N의 AI는 더 정교해집니다.',
 },
}

// ── English ──────────────────────────────────────────────
const en: Translations = {
 nav: {
  about: 'About',
  products: 'Products',
  technology: 'Technology',
  vision: 'Vision',
  contact: 'Contact',
  cta: 'Get Started',
 },
 hero: {
  badge: 'Real-time Operational Intelligence Platform',
  h1: 'Transform Your Enterprise\nwith Operational Intelligence',
  subhead: 'Detect, analyze, and act on data with unprecedented speed and accuracy',
  sub: 'The N3N AI Platform integrates all field data in real time, connecting every stage of enterprise operations into a single intelligence layer.',
  cta1: 'Request Consultation',
  cta2: 'Explore Products',
  scroll: 'Scroll',
  stat1: 'Uptime SLA',
  stat2: 'Inference Latency',
  stat3: 'Enterprise Clients',
  stat4: 'AI Monitoring',
 },
 industries: {
  eyebrow: 'Industries',
  h2: 'Operational Challenges N3N Solves',
  sub: 'From smart cities to energy infrastructure, the N3N AI Platform solves complex operational challenges with real-time intelligence.',
  items: [
   { title: 'Smart City', desc: 'Integrate traffic, environmental, and safety data across the city. Detect anomalies instantly and strengthen public safety.' },
   { title: 'SOC (Security Operations)', desc: 'AI-powered real-time analysis of thousands of camera feeds. Automatically detect intrusions and abnormal behavior.' },
   { title: 'Smart Factory', desc: 'Detect production defects and equipment anomalies in real time. Maximize uptime with predictive maintenance.' },
   { title: 'Energy & Plant', desc: 'Remote facility monitoring and thermal analysis to prevent safety incidents and improve operational efficiency.' },
   { title: 'Data Center', desc: 'Unified monitoring of server room environment, access control, and equipment status for zero-downtime operations.' },
   { title: 'Transport & Logistics', desc: 'Integrate real-time location and video from vehicles, drones, and ships to optimize logistics and prevent accidents.' },
  ],
 },
 about: {
  eyebrow: 'N3N AI',
  h2a: 'Intelligence Born from',
  h2b: ' AI and Cloud Innovation',
  body: 'N3N AI specializes in AI cloud infrastructure. Through INNOWATCH and WIZEYE, we collect and analyze all field data in real time, enabling faster decision-making.',
  cta: 'Explore Operation Intelligence →',
  cards: [
   { title: 'Cloud-Native', desc: 'Designed for scalability from the ground up. Multi-region support, fault-tolerant architecture, and unlimited elasticity.' },
   { title: 'Edge AI Processing', desc: 'Real-time video analysis with sub-10ms latency. Intelligence runs directly at the edge.' },
   { title: 'Enterprise Security', desc: 'SOC 2 Type II certified with zero-trust architecture and end-to-end encryption.' },
   { title: 'Instant Deployment', desc: 'From onboarding to production in hours, a fully managed platform.' },
  ],
 },
 connecting: {
  h2: 'Every Connection, Tracked in Real Time',
  sub: 'Sensors, devices, and video data unified into one platform, tracking and monitoring everything in motion.',
  nodes: ['Vehicle', 'Drone', 'Ship', 'Smart City', 'Satellite', '5G/LTE'],
  phases: [
   { title: 'Phase 1', desc: 'Proven B2B platform for global enterprises (Cisco, etc.). Delivering enterprise-grade real-time video integration infrastructure.' },
   { title: 'Phase 2', desc: 'Expanding to intelligent infrastructure connecting all moving devices, vehicles, drones, ships, smart cities, LEO satellites, and 5G/LTE networks.' },
  ],
 },
 opint: {
  preText: 'Monitoring and Analytics,',
  highlight: 'Unified in One Platform',
  sub: 'INNOWATCH handles data collection and monitoring. WIZEYE handles AI analysis and prediction. Together, they integrate operational data in real time for faster decision-making.',
  innowatch: {
   tag: 'INNOWATCH, Data Collection & Monitoring',
   desc: 'Break network limits, monitor thousands of real-time video feeds on a single unified map.',
  },
  wizeye: {
   tag: 'WIZEYE, AI Analysis & Prediction',
   desc: 'Transform complex IoT big data into intuitive business process apps, delivering actionable insight.',
  },
  stats: [
   { value: '1B+', label: 'Frames Analyzed Daily' },
   { value: '2', label: 'AI Platforms' },
   { value: '1', label: 'Unified Intelligence' },
   { value: 'Real-time', label: 'Operational Visibility' },
  ],
 },
 products: {
  innowatch: {
   headline: 'Connect Every Site',
   headlineSub: 'to One Screen',
   tag: '',
   desc: 'Integrate CCTV and IoT data to unify distributed sites under a single real-time monitoring layer.',
   liveCount: 'Multiple systems consolidated into one operations view.',
   features: [
    {
     title: 'Live Map View',
     desc: 'CCTV streams and IoT data on one map.',
    },
    {
     title: 'Display Wall',
     desc: 'Multi-channel centralized monitoring on large screens.',
    },
    {
     title: 'Universal Integration',
     desc: 'Flexible integration with any security or ops system.',
    },
   ],
  },
  wizeye: {
   headline: 'AI Understands',
   headlineSub: 'the Situation in Real Time',
   tag: 'WIZEYE, AI Analysis & Prediction Engine',
   desc: 'Object recognition and behavior analysis turn anomalies into meaningful, decision-ready information.',
   features: [
    {
     title: 'Real-time Detection & Tracking',
     desc: 'Sub-40ms detect, classify, and track.',
    },
    {
     title: 'Behavioral Pattern Analysis',
     desc: 'Auto-detect anomalies, 30% fewer false alarms.',
    },
    {
     title: 'Edge–Cloud Hybrid',
     desc: 'Flexible deployment, 99.7% accuracy.',
    },
   ],
  },
  demo: 'Request Consultation',
 },
 usecases: {
  eyebrow: 'Use Cases',
  h2: 'Enterprises Already Using N3N',
  sub: 'From global enterprises to public infrastructure, see proven operational results across industries.',
  cta: 'View Full Case Study',
  cases: [
   { client: 'Port of Singapore: Streamflow Optimization', category: 'Logistics', desc: 'Harmonizing 4,000+ autonomous sensor nodes into a singular editorial environment for 24/7 stress-testing.', image: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=600&q=80' },
   { client: 'Barcelona Smart Grid: Anomaly Suppression', category: 'Urban Ops', desc: 'Deploying Smart Alarm Intelligence to reduce false maintenance dispatch costs by 30% via IoT noise cancellation.', image: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=600&q=80' },
   { client: 'Global Edge: Sovereign Data Guarding', category: 'Data Centers', desc: 'Implementing DTG protocols across 14 sovereign data hubs to ensure high-priority packet integrity.', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80' },
   { client: 'Pharma H', category: 'Production', desc: 'GMP process visualization for deviation management and real-time temperature/humidity/pressure control', image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600&q=80' },
   { client: 'POSCO', category: 'Production', desc: 'Real-time Industrial IoT data visualization based on Big Data for global operations', image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&q=80' },
   { client: 'H Semiconductor', category: 'Production', desc: 'Wafer Big Data map-linked process visualization for predictive maintenance and defect root cause analysis', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80' },
   { client: 'AT&T Mission Control', category: 'Service Ops', desc: 'Integrated IoT Device usage visualization as IoT Management Platform for telecom customers', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80' },
   { client: 'AT&T Mexico', category: 'Service Ops', desc: 'Cell tower sensor data and CCTV integrated visualization for 24/7/365 unmanned remote monitoring', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80' },
   { client: 'Carnival Cruise', category: 'Service Ops', desc: 'QoE visualization for real-time data control enabling personalized IoT services', image: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?w=600&q=80' },
   { client: 'Jaipur, India', category: 'Smart City', desc: 'Integrated public infrastructure monitoring for real-time remote operations', image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&q=80' },
   { client: 'Miami-Dade County', category: 'Smart City', desc: 'Real-time integrated administrative KPI-based smart city platform for transparency and efficiency', image: 'https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?w=600&q=80' },
   { client: 'Songdo IBD', category: 'Smart City', desc: 'Smart city operations solution combining urban scenarios with visualized IoT data', image: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=600&q=80' },
   { client: 'Cisco ITRM', category: 'IT Infra', desc: 'Causal logic MAP visualization of complex IT infrastructure for instant root cause identification', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80' },
   { client: 'H Motors', category: 'Industrial', desc: 'Fire prevention system integrating flame detection sensors with real-time video', image: 'https://images.unsplash.com/photo-1565043666747-69f6646db940?w=600&q=80' },
   { client: 'POSCO ICT', category: 'Industrial', desc: 'Full HD real-time production floor monitoring from central control room', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80' },
   { client: 'S Metro', category: 'Public Infra', desc: 'Smart Connected Subway for remote intelligent management of operations and facilities', image: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=600&q=80' },
   { client: 'KOEN', category: 'Public Infra', desc: 'Integration of 1,500+ CCTVs and sensor data reducing network and maintenance costs', image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80' },
   { client: 'Incheon Bridge', category: 'Public Infra', desc: 'Integrated traffic monitoring via CCTV, maps, weather, and detection/control systems', image: 'https://images.unsplash.com/photo-1545893835-abaa50cbe628?w=600&q=80' },
  ],
 },
 tech: {
  eyebrow: 'Technology Stack',
  h2a: 'End-to-End',
  h2b: ' AI Infrastructure',
  sub: 'A vertically integrated stack from model training to edge deployment. One pipeline for data ingestion, inference, and decision-making.',
  cards: [
   { label: 'AI/ML Models', desc: 'Custom-trained vision & anomaly detection models' },
   { label: 'Edge Computing', desc: 'Process data at source, 10x latency reduction' },
   { label: 'Cloud Infra', desc: 'Auto-scaling multi-region infrastructure' },
   { label: 'MLOps Pipeline', desc: 'Continuous model training & deployment' },
   { label: 'Global CDN', desc: 'Low-latency delivery in 50+ regions' },
   { label: 'Zero Trust', desc: 'End-to-end encrypted, SOC 2 compliant' },
  ],
  arch: 'End-to-End Architecture',
  nodes: [
   { label: 'Data Sources', sub: 'Cameras · Sensors · APIs' },
   { label: 'Edge Layer', sub: 'WIZEYE Edge Nodes' },
   { label: 'AI Engine', sub: 'N3N AI Core' },
   { label: 'Cloud Platform', sub: 'Multi-region IaaS' },
   { label: 'Insights', sub: 'Dashboards · Alerts · APIs' },
  ],
 },
 vision: {
  eyebrow: 'How It Works',
  h2a: 'From Scattered Data to',
  h2b: ' Actionable Intelligence',
  sub: 'Collect data from diverse sources, analyze with AI, and deliver instant operational insights.',
  steps: [
   { title: 'Capture', desc: 'Connect cameras, IoT sensors, and data streams from any source. INNOWATCH and WIZEYE simultaneously collect visible and invisible data.' },
   { title: 'Analyze', desc: 'AI vision engine processes video streams in real time, detecting objects, behaviors, and anomalies while converting IoT big data into structured insights.' },
   { title: 'Unify', desc: 'N3N Operation Intelligence core fuses INNOWATCH and WIZEYE data into a single unified intelligence layer.' },
   { title: 'Act', desc: 'Automated workflows trigger alerts, remediations, and business process apps, delivering Actionable Insight without human intervention.' },
  ],
  stats: [
   { value: '10B+', label: 'Frames Analyzed Daily' },
   { value: '500+', label: 'Camera Integrations' },
   { value: '40ms', label: 'Avg. Detection Time' },
   { value: '99.7%', label: 'Accuracy Rate' },
  ],
 },
 contact: {
  eyebrow: 'Contact Us',
  h2a: 'Experience Operational Intelligence',
  h2b: ' Today',
  sub: 'Schedule a consultation with our experts. Fill out the form below and we\'ll get back to you promptly.',
  name: 'Name', namePh: 'Jane Kim',
  company: 'Company', companyPh: 'Acme Corp',
  email: 'Email', emailPh: 'jane@acme.com',
  message: 'Message', messagePh: 'Tell us about your use case...',
  submit: 'Request Consultation',
  successTitle: 'Message Sent!',
  successSub: 'Our team will get back to you within 24 hours.',
 },
 footer: {
  desc: 'AI cloud infrastructure & video vision technology. Visible and invisible data, one Operation Intelligence.',
  cols: {
   Products: ['INNOWATCH', 'WIZEYE', 'Pricing', 'Changelog'],
   Company: ['About', 'Careers', 'Blog', 'Press'],
   Resources: ['Docs', 'API Reference', 'Status', 'Security'],
   Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy'],
  },
  rights: '© {year} n3n.ai Inc. All rights reserved.',
  status: 'All systems operational',
 },
 problem: {
  eyebrow: 'THE PROBLEM',
  h2: 'Data piles up.\nDecisions lag behind.',
  lines: [
   'Thousands of channels stream in, but the moments that matter still slip through.',
   'Sites are connected, yet judgment still rests on people.',
  ],
 },
 flow: {
  eyebrow: 'SOLUTION FLOW',
  h2: 'One pipeline.\nThree layers of intelligence.',
  sub: 'Turning data into decisions.',
 },
 steps: {
  s1: { badge: 'STEP 01 · INNOWATCH', role: 'Capture & Monitor' },
  s2: { badge: 'STEP 02 · WIZEYE', role: 'Detect & Analyze' },
  s3: { badge: 'STEP 03 · DECISION LAYER', role: 'Decide & Act' },
 },
 decision: {
  eyebrow: 'STEP 03 · DECISION LAYER',
  headline: 'Connect Judgment',
  headlineSub: 'Straight to Action',
  desc: 'Pipe analysis results into alerts, dashboards, and automated responses for instant operational action.',
  features: [
   { title: 'Rules Engine', desc: 'Classify and prioritize situations against your operating rules.' },
   { title: 'Real-time Alerts', desc: 'Deliver context-rich notifications to the right operator, instantly.' },
   { title: 'Automated Actions', desc: 'Trigger pre-defined response workflows without human delay.' },
  ],
  outputs: ['Incident Detection', 'Real-time Alerts', 'Operational Decisions', 'Automated Actions'],
 },
 proof: {
  eyebrow: 'PROOF',
  h2: 'Numbers the field has proven',
 },
 closing: {
  eyebrow: 'VISION',
  statement: 'We connect data, people, and decisions.\nEvery cycle sharpens the intelligence beneath it.',
 },
}

export const t: Record<Lang, Translations> = { ko, en }
