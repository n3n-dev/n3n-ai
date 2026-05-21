import About from './About'
import BusinessAreas from './BusinessAreas'
import ConnectedX from './ConnectedX'
import OperationIntelligence from './OperationIntelligence'
import Products from './Products'
import UseCasesMarquee from './UseCasesMarquee'
import type { Translations, Lang } from '../i18n/translations'

interface Props {
  tr: Translations
  lang: Lang
  opintPreOverride?: string
  opintHighlightOverride?: string
  opintSubOverride?: string
  aboutH2Override?: string
  aboutBodyOverride?: string
  aboutCompact?: boolean
  aboutDiagram?: 'orbital' | 'flow'
}

export default function DraftBody({
  tr,
  lang,
  opintPreOverride,
  opintHighlightOverride,
  opintSubOverride,
  aboutH2Override,
  aboutBodyOverride,
  aboutCompact,
  aboutDiagram,
}: Props) {
  const aboutEyebrow = ''
  const aboutH2 =
    lang === 'ko'
      ? '현장 데이터를 실시간으로 연결하고\n즉시 의사결정으로 전환하는 AI 플랫폼'
      : 'A high-performance data intelligence platform\nbuilt on AI, GPU, and cloud technologies'
  const aboutBody =
    lang === 'ko'
      ? '흩어진 데이터를 하나로 연결하고 분석해\n더 빠르고 정확한 판단을 가능하게 합니다.'
      : 'Through INNOWATCH and WIZEYE, N3N AI connects and analyzes fragmented field data in real time, setting a new standard for faster, more accurate decision-making.'
  const aboutChips =
    lang === 'ko'
      ? ['클라우드 네이티브', '엣지 AI 처리', '엔터프라이즈 보안', '즉시 배포']
      : ['Cloud Native', 'Edge AI', 'Enterprise Security', 'Instant Deploy']

  const opintPre =
    lang === 'ko' ? '실시간 데이터 통합과 AI 분석을 통한' : 'Decision-making reimagined through'
  const opintHighlight =
    lang === 'ko' ? '의사결정 혁신' : 'real-time data integration and AI analytics'
  const opintSub =
    lang === 'ko'
      ? 'INNOWATCH + WIZEYE\n운영 데이터를 인사이트로 전환하여 기업의 실행력을 극대화합니다.'
      : 'INNOWATCH + WIZEYE\nTurn operational data into insight and maximize enterprise execution.'
  const innowatchHeadline = lang === 'ko' ? '실시간 위치 기반' : 'Real-time location-based'
  const innowatchHeadlineSub = lang === 'ko' ? '스마트 관제' : 'smart monitoring'
  const innowatchDesc =
    lang === 'ko'
      ? '지도 기반으로 CCTV와 IoT 데이터를 통합하여 현장 상황을 한눈에 파악할 수 있습니다.'
      : 'Unify CCTV and IoT data on a single map to capture the full field situation at a glance.'

  const wizeyeHeadline = lang === 'ko' ? '예측 분석으로' : 'Predictive analytics to'
  const wizeyeHeadlineSub =
    lang === 'ko' ? '상황 변화에 미리 대응합니다.' : 'stay ahead of changing conditions.'
  const wizeyeDesc =
    lang === 'ko'
      ? 'AI가 이상 징후를 실시간으로 감지하고, 문제 발생 전에 선제 대응을 가능하게 합니다.'
      : 'AI detects anomalies in real time, enabling preemptive response before issues occur.'
  const wizeyeFeatures =
    lang === 'ko'
      ? [
          { title: '실시간 객체 감지·추적', desc: '40ms 이내 감지·분류·추적' },
          { title: '행동 패턴 분석', desc: '이상 행동 자동 감지' },
          { title: '엣지–클라우드 하이브리드', desc: '유연 배포, 99.7% 정확도' },
        ]
      : [
          { title: 'Real-time Detection & Tracking', desc: 'Sub-40ms detect, classify, and track' },
          { title: 'Behavioral Pattern Analysis', desc: 'Auto-detect anomalies' },
          { title: 'Edge–Cloud Hybrid', desc: 'Flexible deployment, 99.7% accuracy' },
        ]

  const opintStats =
    lang === 'ko'
      ? [
          { value: '10억+', label: '일 처리 프레임' },
          { value: '2', label: '핵심 AI 플랫폼' },
          { value: '1', label: '통합 인텔리전스' },
          { value: '실시간', label: '운영 가시성' },
        ]
      : [
          { value: '1B+', label: 'Frames / day' },
          { value: '2', label: 'Core AI platforms' },
          { value: '1', label: 'Unified intelligence' },
          { value: 'Real-time', label: 'Operational visibility' },
        ]

  return (
    <>
      <About
        tr={tr}
        eyebrowOverride={aboutEyebrow}
        h2aOverride={aboutH2Override ?? aboutH2}
        h2bOverride=""
        bodyOverride={aboutBodyOverride ?? aboutBody}
        chipsOverride={aboutChips}
        compact={aboutCompact}
        diagram={aboutDiagram}
      />
      <OperationIntelligence
        tr={tr}
        preTextOverride={opintPreOverride ?? opintPre}
        highlightOverride={opintHighlightOverride ?? opintHighlight}
        subOverride={opintSubOverride ?? opintSub}
        statsOverride={opintStats}
      />
      <Products
        tr={tr}
        innowatchHeadlineOverride={innowatchHeadline}
        innowatchHeadlineSubOverride={innowatchHeadlineSub}
        innowatchDescOverride={innowatchDesc}
        wizeyeHeadlineOverride={wizeyeHeadline}
        wizeyeHeadlineSubOverride={wizeyeHeadlineSub}
        wizeyeDescOverride={wizeyeDesc}
        wizeyeFeaturesOverride={wizeyeFeatures}
      />
      <BusinessAreas
        lang={lang}
        headlineOverride="N3N Drives AI-Powered Intelligent Operational Innovation"
        subtitleOverride={
          lang === 'ko'
            ? '데이터와 영상을 통합한 AI 기반 프로덕트 플랫폼으로 전 산업의 운영 혁신을 실현합니다.'
            : 'A unified AI-driven product platform for video and data — delivering operational innovation across every industry.'
        }
        plansLabelOverride="Next Steps"
      />
      <ConnectedX
        lang={lang}
        eyebrowOverride="AI Learning & Deployment"
        subheadingOverride={lang === 'ko' ? '지속적으로 진화하는 AI' : 'AI that continuously evolves'}
        descriptionOverride={
          lang === 'ko'
            ? '영상 데이터를 기반으로 AI 모델을 지속 학습·고도화하며, 드론·선박·UAM·로지스틱스 등 다양한 모빌리티 환경으로 운영을 확장합니다.'
            : 'Continuously train and refine AI models on video data, and extend operations across drones, ships, UAM, logistics, and other mobility domains.'
        }
      />
      <UseCasesMarquee
        tr={tr}
        eyebrowOverride="Our Clients"
        h2Override={lang === 'ko' ? 'N3N 제품을 도입하여 활용 중인 고객사' : 'Clients using N3N products in production'}
        subOverride={
          lang === 'ko'
            ? '글로벌 엔터프라이즈부터 공공 인프라까지, 산업 현장에서 검증된 실제 운영 성과를 확인하세요.'
            : 'From global enterprises to public infrastructure — see the operational results proven in the field.'
        }
      />
    </>
  )
}
