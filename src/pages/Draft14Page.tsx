import Hero14 from '../components/Hero14'
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

// Draft 14 — Draft 13 duplicate with the per-column center highlight
// strip removed (cleaner 3D cylinders, no faint mid-line).
export default function Draft14Page({ tr, lang }: Props) {
  return (
    <>
      <VideoIntroOverlay
        videoSrc={`${import.meta.env.BASE_URL}hero-video-4.mp4`}
        lang={lang}
      />
      <main className="bg-[#F4F2EC]">
      <DraftSwitcher theme="light" active="Draft 14" />
      <Hero14 tr={tr} lang={lang} />

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
