import Hero16 from '../components/Hero16'
import Industries from '../components/Industries'
import UseCasesMarquee from '../components/UseCasesMarquee'
import ConnectedX from '../components/ConnectedX'
import DraftSwitcher from '../components/DraftSwitcher'
import VideoIntroOverlay from '../components/VideoIntroOverlay'
import SolutionTabs from '../components/SolutionTabs'
import PlatformOverview from '../components/PlatformOverview'
import type { Translations, Lang } from '../i18n/translations'

interface Props {
  tr: Translations
  lang: Lang
}

// Draft 16 — Draft 15 + Hero113 top→bottom drip wave per column.
export default function Draft16Page({ tr, lang }: Props) {
  return (
    <>
      <VideoIntroOverlay
        videoSrc={`${import.meta.env.BASE_URL}hero-video-4.mp4`}
        lang={lang}
      />
      <main className="bg-[#F4F2EC]">
      <DraftSwitcher theme="light" active="Draft 16" />
      <Hero16 tr={tr} lang={lang} />

      <div className="relative z-10">
        <PlatformOverview lang={lang} bg="white" />
        <SolutionTabs tr={tr} lang={lang} bg="white" />
      </div>

      <Industries
        tr={tr}
        light
        eyebrowOverride=""
        h2Override={
          lang === 'ko'
            ? 'N3N이 해결한 운영 과제'
            : 'Operational Challenges N3N Has Solved'
        }
        subOverride={
          lang === 'ko'
            ? '데이터와 영상을 통합한 AI 기반 프로덕트 플랫폼으로 전 산업의 운영 혁신을 실현합니다.'
            : 'A unified AI-driven product platform for video and data — delivering operational innovation across every industry.'
        }
        nextStepsLabel="Next Steps"
        nextSteps={
          lang === 'ko'
            ? [
                ['글로벌 Smart City Edge Intelligence 확대', '실시간 운영 KPI 통합'],
                ['AI 기반 침입·이상행동 자동 탐지 고도화', '통합 관제 API'],
                ['예측 정비·불량 감지 모델 확장', '엣지 추론 가속'],
                ['열화상·드론 통합 모니터링', '전력망 장애 선제 대응'],
                ['서버룸 환경 통합 관제', '무중단 운영 자동화'],
                ['물류 플릿 실시간 추적', '드론·선박 통합 대시보드'],
              ]
            : [
                ['Expand global Smart City Edge Intelligence', 'Integrate real-time operations KPIs'],
                ['Enhanced AI-based intrusion & anomaly detection', 'Unified control API'],
                ['Predictive maintenance & defect detection', 'Accelerated edge inference'],
                ['Thermal & drone-integrated monitoring', 'Proactive grid fault response'],
                ['Unified server-room control', 'Automated non-stop operations'],
                ['Real-time logistics fleet tracking', 'Drone & vessel unified dashboard'],
              ]
        }
      />

      <ConnectedX lang={lang} lightBg hideText />

      <UseCasesMarquee
        tr={tr}
        lightBg
        eyebrowOverride="Our Clients"
        h2Override={
          lang === 'ko'
            ? 'N3N 제품을 도입하여 활용 중인 고객사'
            : 'Clients using N3N products in production'
        }
        subOverride={
          lang === 'ko'
            ? '글로벌 엔터프라이즈부터 공공 인프라까지, 산업 현장에서 검증된 실제 운영 성과를 확인하세요.'
            : 'From global enterprises to public infrastructure — see the operational results proven in the field.'
        }
      />
      </main>
    </>
  )
}
