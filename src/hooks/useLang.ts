import { useState } from 'react'
import { t, type Lang, type Translations } from '../i18n/translations'

export function useLang(): { lang: Lang; tr: Translations; toggle: () => void } {
  const [lang, setLang] = useState<Lang>(() => {
    const saved = localStorage.getItem('lang') as Lang | null
    return saved ?? 'ko'
  })

  const toggle = () =>
    setLang((prev) => {
      const next: Lang = prev === 'ko' ? 'en' : 'ko'
      localStorage.setItem('lang', next)
      return next
    })

  return { lang, tr: t[lang], toggle }
}
