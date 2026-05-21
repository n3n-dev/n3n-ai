import Hero from '../components/Hero'
import Industries from '../components/Industries'
import About from '../components/About'
import OperationIntelligence from '../components/OperationIntelligence'
import Products from '../components/Products'
import UseCases from '../components/UseCases'
import ConnectedX from '../components/ConnectedX'
import type { Translations, Lang } from '../i18n/translations'

interface Props {
  tr: Translations
  lang: Lang
}

export default function LandingPage({ tr, lang }: Props) {
  return (
    <main>
      <Hero tr={tr} hideCta />
      <About tr={tr} />
      <OperationIntelligence tr={tr} />
      <Products tr={tr} />
      <Industries tr={tr} />
      <UseCases tr={tr} />
      <ConnectedX lang={lang} />
    </main>
  )
}
