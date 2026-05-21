import Hero0 from '../components/Hero0'
import SolutionFlowIntro from '../components/SolutionFlowIntro'
import OperationIntelligence from '../components/OperationIntelligence'
import Industries from '../components/Industries'
import UseCasesMarquee from '../components/UseCasesMarquee'
import ConnectedX from '../components/ConnectedX'
import type { Translations, Lang } from '../i18n/translations'

interface Props {
  tr: Translations
  lang: Lang
}

export default function Draft0Page({ tr, lang }: Props) {
  const h1 = 'From Video\nto Decisions'
  const subhead =
    lang === 'ko'
      ? 'AI 영상 분석으로 이상 상황을 감지하고 즉각적인 대응과 운영 판단을 지원합니다.'
      : 'AI video analytics detects anomalies, enabling instant response and informed decisions.'

  return (
    <main>
      <Hero0 tr={tr} h1Override={h1} subheadOverride={subhead} />
      <SolutionFlowIntro tr={tr} />
      <OperationIntelligence
        tr={tr}
        eyebrowOverride={tr.proof.eyebrow}
        h2Override={tr.proof.h2}
        hideSub
        statsOverride={tr.vision.stats}
      />
      <Industries tr={tr} />
      <UseCasesMarquee tr={tr} />
      <ConnectedX
        lang={lang}
        closingEyebrow={tr.closing.eyebrow}
        closingStatement={tr.closing.statement}
      />
    </main>
  )
}
