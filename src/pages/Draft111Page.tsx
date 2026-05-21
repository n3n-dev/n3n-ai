import Hero111 from '../components/Hero111'
import Industries from '../components/Industries'
import UseCasesMarquee from '../components/UseCasesMarquee'
import ConnectedX from '../components/ConnectedX'
import DraftSwitcher from '../components/DraftSwitcher'
import type { Translations, Lang } from '../i18n/translations'

interface Props {
  tr: Translations
  lang: Lang
}

// Draft 11-1 — Navy/slate light system. Same content scaffolding as
// Draft 11 (Hero11 → Industries → ConnectedX → UseCases) with the
// DESIGN.md tokens (#0A2540 / #64748B / #E2E8F0 / #FFFFFF, system font,
// 60/500/-0.025em display, 4px radii, strong grid).
export default function Draft111Page({ tr, lang }: Props) {
  return (
    <main style={{ background: '#E2E8F0', color: '#0A2540' }}>
      <DraftSwitcher theme="dark" active="Draft 11-1" />
      <Hero111 tr={tr} lang={lang} />

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

      <ConnectedX lang={lang} lightBg eyebrowOverride="" />

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
  )
}
