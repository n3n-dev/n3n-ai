import Hero5 from '../components/Hero5'
import DraftBody from '../components/DraftBody'
import type { Translations, Lang } from '../i18n/translations'

interface Props {
  tr: Translations
  lang: Lang
}

export default function Draft5Page({ tr, lang }: Props) {
  const badge = 'Innowatch / WizEye, Video & Data Analytics Product'
  const h1 = 'Transforming Video Data into\nActionable Intelligence\nthrough AI-Driven Analytics.'
  const subhead =
    lang === 'ko'
      ? 'AI 기반 데이터·영상 분석 플랫폼을 통해 실시간으로 상황을 판단하고\n즉시 문제 해결까지 지원합니다.'
      : 'An AI-driven data and video analytics platform that assesses situations in real time\nand drives immediate problem resolution.'

  return (
    <main>
      <Hero5
        tr={tr}
        lang={lang}
        hideCta
        badgeOverride={badge}
        h1Override={h1}
        subheadOverride={subhead}
      />
      <DraftBody tr={tr} lang={lang} />
    </main>
  )
}
