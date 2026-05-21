import Hero6 from '../components/Hero6'
import DraftBody from '../components/DraftBody'
import type { Translations, Lang } from '../i18n/translations'

interface Props {
  tr: Translations
  lang: Lang
}

export default function Draft6Page({ tr, lang }: Props) {
  const badge = 'Innowatch / WizEye, Video & Data Analytics Product'
  const h1 = 'From Video\nto Decisions'
  const subhead =
    lang === 'ko'
      ? 'AI 영상 분석으로 이상 상황을 감지하고\n즉각적인 대응과 운영 판단을 지원합니다.'
      : 'AI video analytics detects anomalies,\nenabling instant response and informed decisions.'

  const aboutH2 =
    lang === 'ko'
      ? '현장의 모든 데이터를\n실시간 판단으로 바꾸는 플랫폼'
      : 'A platform that transforms all field data\ninto real-time decisions'
  const aboutBody =
    lang === 'ko'
      ? '영상, 센서, 시스템 데이터를 통합 분석해\n운영 효율과 대응 정확도를 높입니다.'
      : 'Integrate and analyze video, sensor, and system data\nto boost operational efficiency and response accuracy.'

  return (
    <main>
      <Hero6
        tr={tr}
        hideCta
        badgeOverride={badge}
        h1Override={h1}
        subheadOverride={subhead}
      />
      <DraftBody
        tr={tr}
        lang={lang}
        aboutH2Override={aboutH2}
        aboutBodyOverride={aboutBody}
        aboutCompact
        aboutDiagram="flow"
      />
    </main>
  )
}
