import Hero from '../components/Hero'
import BusinessAreas from '../components/BusinessAreas'
import ConnectedX from '../components/ConnectedX'
import OperationIntelligence from '../components/OperationIntelligence'
import Products from '../components/Products'
import UseCasesMarquee from '../components/UseCasesMarquee'
import type { Translations, Lang } from '../i18n/translations'

interface Props {
  tr: Translations
  lang: Lang
}

export default function Draft2Page({ tr, lang }: Props) {
  return (
    <main>
      <Hero tr={tr} hideCta />
      <BusinessAreas lang={lang} />
      <OperationIntelligence tr={tr} />
      <Products tr={tr} />
      <ConnectedX lang={lang} />
      <UseCasesMarquee tr={tr} />
    </main>
  )
}
