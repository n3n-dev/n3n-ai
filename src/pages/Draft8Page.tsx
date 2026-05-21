import Hero8 from '../components/Hero8'
import DraftBody from '../components/DraftBody'
import type { Translations, Lang } from '../i18n/translations'

interface Props {
  tr: Translations
  lang: Lang
}

export default function Draft8Page({ tr, lang }: Props) {
  const badge = 'AI-Powered Video Intelligence Platform'
  const h1 = 'Transforming Video into\nActionable Intelligence'
  const subhead =
    lang === 'ko'
      ? 'AI 기반 영상 분석으로 상황을 즉시 파악하고 빠르게 대응합니다.'
      : 'AI-powered video analytics for instant situational awareness and rapid response.'

  return (
    <main>
      <Hero8
        tr={tr}
        hideCta
        badgeOverride={badge}
        h1Override={h1}
        subheadOverride={subhead}
      />
      <DraftBody tr={tr} lang={lang} />
    </main>
  )
}
