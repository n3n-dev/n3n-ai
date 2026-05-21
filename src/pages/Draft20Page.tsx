import Hero20 from '../components/Hero20'
import Industries from '../components/Industries'
import UseCasesMarquee from '../components/UseCasesMarquee'
import ConnectedXSection from '../components/ConnectedXSection'
import VideoIntroOverlay from '../components/VideoIntroOverlay'
import SolutionTabs from '../components/SolutionTabs'
import PlatformOverview from '../components/PlatformOverview'
import type { Translations, Lang } from '../i18n/translations'

interface Props {
 tr: Translations
 lang: Lang
}

// Draft 20, clone of Draft 17.
export default function Draft20Page({ tr, lang }: Props) {
 return (
  <>
   <VideoIntroOverlay
    videoSrc={`${import.meta.env.BASE_URL}hero-video-4.mp4`}
    lang={lang}
   />
   <main className="bg-[#F4F2EC]">
   <Hero20 tr={tr} lang={lang} />

   <div className="relative z-10">
    <PlatformOverview
     lang={lang}
     bg="cream"
     h2Override={
      lang === 'ko'
       ? '흩어진 현장 데이터를\n실시간 인텔리전스로'
       : 'From Data to\nReal-time Intelligence'
     }
     h2DesktopOverride={
      lang === 'ko'
       ? '흩어진 현장 데이터를 실시간 인텔리전스로'
       : 'From Data to Real-time Intelligence'
     }
     bodyOverride={
      lang === 'ko'
       ? 'INNOWATCH와 WIZEYE 기반으로\n영상·센서 데이터를 실시간 연결 및 분석합니다.'
       : 'Powered by INNOWATCH and WIZEYE,\nvideo and sensor data are analyzed in real time.'
     }
     bodyDesktopOverride={
      lang === 'ko'
       ? 'INNOWATCH와 WIZEYE 기반으로 영상·센서 데이터를 실시간 연결 및 분석합니다.'
       : 'Powered by INNOWATCH and WIZEYE,\nvideo and sensor data are analyzed in real time.'
     }
     tagsOverride={
      lang === 'ko'
       ? ['클라우드 기반 운영', '엣지 AI 분석', '기업용 보안']
       : ['Cloud-based Operations', 'Edge AI Analytics', 'Enterprise Security']
     }
     nodeLabelsOverride={{
      top: 'MULTI-CLOUD',
      right: 'IoT SENSORS',
      bottom: 'CONTROL CENTER',
      left: 'VIDEO / VMS',
     }}
    />
    <SolutionTabs
     tr={tr}
     lang={lang}
     variant="draft20"
     h2Override={
      lang === 'ko'
       ? '실시간 데이터 기반\n운영 인텔리전스'
       : 'Real-time\nOperational Intelligence'
     }
    />
   </div>

   <ConnectedXSection lang={lang} />

   <Industries
    tr={tr}
    light
    eyebrowOverride=""
    h2Override={
     lang === 'ko'
      ? 'N3N이 해결한\n운영 과제'
      : 'Industry Use Cases'
    }
    h2DesktopOverride={
     lang === 'ko'
      ? 'N3N이 해결한 운영 과제'
      : 'Industry Use Cases'
    }
    subOverride={
     lang === 'ko'
      ? '데이터와 영상을 통합한 AI 기반 플랫폼으로\n다양한 산업 환경의 운영 효율을 지능적으로 연결합니다.'
      : 'AI-powered operational intelligence\nacross real-world industries.'
    }
    subDesktopOverride={
     lang === 'ko'
      ? '데이터와 영상을 통합한 AI 기반 플랫폼으로\n다양한 산업 환경의 운영 효율을 지능적으로 연결합니다.'
      : 'AI-powered operational intelligence across real-world industries.'
    }
    nextStepsLabel="Next Steps"
    itemsOverride={[
     {
      title: lang === 'ko' ? '스마트시티' : 'Smart City',
      desc:
       lang === 'ko'
        ? '도시 전역의 교통·환경·안전 데이터를 실시간으로 연결하여 이상 상황을 빠르게 감지하고 대응합니다.'
        : 'Connect citywide traffic, environment and safety data in real time, detect and respond to anomalies quickly.',
     },
     {
      desc:
       lang === 'ko'
        ? 'AI 기반 영상 분석으로 침입·이상행동을 실시간 감지하고 빠른 상황 대응을 지원합니다.'
        : 'AI video analytics detects intrusion and abnormal behavior in real time, supporting rapid response.',
     },
     {
      title: lang === 'ko' ? '스마트 팩토리' : 'Smart Factory',
      desc:
       lang === 'ko'
        ? '생산 설비와 운영 데이터를 실시간 분석하여 이상 감지와 예지 정비를 지원합니다.'
        : 'Analyze production equipment and operational data in real time, enabling anomaly detection and predictive maintenance.',
     },
     {
      title: lang === 'ko' ? '에너지·플랜트' : 'Energy & Plant',
      desc:
       lang === 'ko'
        ? '설비 상태와 열화상 데이터를 통합 분석하여 위험 상황을 사전에 감지합니다.'
        : 'Unify equipment status and thermal-imaging data to detect hazardous conditions proactively.',
     },
     {
      title: lang === 'ko' ? '데이터센터' : 'Data Center',
      desc:
       lang === 'ko'
        ? '서버·설비·출입 환경을 통합 모니터링하여 안정적인 무중단 운영을 지원합니다.'
        : 'Unified monitoring of servers, facilities and access, supporting stable, non-stop operations.',
     },
     {
      title: lang === 'ko' ? '교통·물류' : 'Transport & Logistics',
      desc:
       lang === 'ko'
        ? '차량·드론·선박 데이터를 실시간으로 연결하여 물류 흐름과 운영 상황을 통합 관리합니다.'
        : 'Connect vehicle, drone and vessel data in real time, unify logistics flow and operational status.',
     },
    ]}
    nextSteps={
     lang === 'ko'
      ? [
        ['Smart City Edge Intelligence', '실시간 도시 운영 KPI 통합'],
        ['AI 기반 이상행동 탐지 고도화', '통합 보안 관제 API 연동'],
        ['Predictive Maintenance 확대', '엣지 기반 AI 추론 최적화'],
        ['열화상 기반 통합 모니터링', '장애 예측 및 선제 대응'],
        ['통합 인프라 모니터링', '운영 자동화 환경 확장'],
        ['실시간 물류 추적', '드론·선박 통합 대시보드'],
       ]
      : [
        ['Smart City Edge Intelligence', 'Real-time city operations KPIs'],
        ['Enhanced AI anomaly detection', 'Unified security control API'],
        ['Expand Predictive Maintenance', 'Optimize edge AI inference'],
        ['Thermal-based unified monitoring', 'Predictive fault response'],
        ['Unified infrastructure monitoring', 'Expand operations automation'],
        ['Real-time logistics tracking', 'Drone & vessel unified dashboard'],
       ]
    }
   />

   <UseCasesMarquee
    tr={tr}
    lightBg
    eyebrowOverride="Our Clients"
    h2Override={
     lang === 'ko'
      ? 'N3N이 만든 실제 운영 성과'
      : 'Operational Intelligence\nin Action'
    }
    subOverride={
     lang === 'ko'
      ? '스마트시티·공공 인프라·엔터프라이즈 현장에서\n검증된 AI 운영 성과를 확인해보세요.'
      : 'Proven AI operational intelligence across real-world industries.'
    }
   />
   </main>
  </>
 )
}
