import { useState } from 'react'
import Hero05, { type Hero05Variant } from '../components/Hero05'
import VideoIntroOverlay from '../components/VideoIntroOverlay'
import TitangateDivider from '../components/TitangateDivider'
import SolutionFlowIntro from '../components/SolutionFlowIntro'
import Industries from '../components/Industries'
import UseCasesMarquee from '../components/UseCasesMarquee'
import ConnectedX from '../components/ConnectedX'
import type { Translations, Lang } from '../i18n/translations'

interface Props {
  tr: Translations
  lang: Lang
  /** Initial Hero05 variant — used so /draft0-2 lands on '2' and
   *  /draft0-3 lands on '3' even though both still mount Draft05Page. */
  defaultVariant?: Hero05Variant
}

export default function Draft05Page({ tr, lang, defaultVariant = '1' }: Props) {
  const h1 = 'From Video\nto Decisions'
  const subhead =
    lang === 'ko'
      ? 'AI 영상 분석으로 이상 상황을 감지하고 즉각적인 대응과 운영 판단을 지원합니다.'
      : 'AI video analytics detects anomalies, enabling instant response and informed decisions.'

  const [variant, setVariant] = useState<Hero05Variant>(defaultVariant)

  return (
    <>
      <VideoIntroOverlay
        videoSrc={`${import.meta.env.BASE_URL}hero-video-4.mp4`}
        lang={lang}
      />
      <main>
        <Hero05
          tr={tr}
          h1Override={h1}
          subheadOverride={subhead}
          variant={variant}
          onVariantChange={setVariant}
        />
        {/* Draft 2 / Draft 3 omit the Titangate divider strip (A NEW CLASS
            OF OPERATION / 0042 block) for a cleaner landing. */}
        {variant !== '2' && variant !== '3' && <TitangateDivider lang={lang} />}
        {/* Draft 1 pulls the solution section up into the hero's bottom
            padding for continuity with the 3D scene. Draft 2 / 3 have
            taller heroes with self-contained backdrops, so the negative
            margin (that would otherwise clip the solution into the hero
            area) is dropped. */}
        <div
          className={
            variant === '2' || variant === '3'
              ? 'relative z-10'
              : 'relative z-10 -mt-28 md:-mt-40'
          }
        >
          <SolutionFlowIntro tr={tr} stackVariant="hero3d" />
        </div>
        {/* Industries — rendered for every variant. */}
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
                  ['Expand Smart City Edge Intelligence globally', 'Unified real-time KPIs'],
                  ['Advance AI-based intrusion / anomaly detection', 'Unified control API'],
                  ['Scale predictive maintenance & defect detection', 'Edge inference acceleration'],
                  ['Integrated thermal / drone monitoring', 'Preemptive grid response'],
                  ['Unified data-center environment ops', 'Non-stop automation'],
                  ['Real-time logistics fleet tracking', 'Drone / vessel unified dashboard'],
                ]
          }
          nextStepsLabel="Next Steps"
        />
        {/* ConnectedX — light bg; kept across variants. */}
        <ConnectedX lang={lang} lightBg hideText />
        {/* Use cases — Draft 3 uses Draft 7's copy ("Our Clients" /
            Draft 7 subhead). Other variants keep the minimal version. */}
        {variant === '3' ? (
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
        ) : (
          <UseCasesMarquee tr={tr} lightBg eyebrowOverride="" />
        )}
      </main>
    </>
  )
}
