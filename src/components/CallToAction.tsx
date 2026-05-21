import { ArrowRight, Plus } from 'lucide-react'
import type { Lang } from '../i18n/translations'

interface Props {
  lang?: Lang
  /** Force light palette regardless of the app-wide dark class. Draft 0.5
   *  keeps the tail of the page on a bright background. */
  lightBg?: boolean
}

// Landing-page CTA block. Mirrors the supplied shadcn CallToAction layout —
// plus-icon corners, extended vertical guide lines, center dashed axis.
// Uses raw Tailwind button styling since this project doesn't have the
// shadcn `<Button>` primitive installed.
export default function CallToAction({ lang = 'en', lightBg = false }: Props) {
  const headline =
    lang === 'ko'
      ? '현장 데이터를 인사이트로 바꾸세요.'
      : 'Turn your field data into decisions.'
  const sub =
    lang === 'ko'
      ? '지금 바로 N3N AI를 경험해 보세요. 별도 설치 없이 바로 시작할 수 있습니다.'
      : 'Start with N3N AI today. No installation — instant access.'
  const primary = lang === 'ko' ? '시작하기' : 'Get Started'
  const secondary = lang === 'ko' ? '영업팀 문의' : 'Contact Sales'

  // Palette — light or dark based on surrounding section
  const sectionBg = lightBg ? 'bg-white' : 'bg-gray-50 dark:bg-[#0a0f1a]'
  const borderColor = lightBg
    ? 'border-gray-200'
    : 'border-gray-200 dark:border-gray-800'
  const h2Color = lightBg ? 'text-gray-900' : 'text-gray-900 dark:text-white'
  const pColor = lightBg ? 'text-gray-500' : 'text-gray-500 dark:text-gray-400'
  const plusColor = lightBg
    ? 'text-gray-300'
    : 'text-gray-300 dark:text-gray-700'
  const dashColor = lightBg
    ? 'border-gray-200'
    : 'border-gray-200 dark:border-gray-800'
  const primaryBtn = lightBg
    ? 'bg-gray-900 text-white hover:bg-gray-800'
    : 'bg-gray-900 text-white hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200'
  const outlineBtn = lightBg
    ? 'border border-gray-300 text-gray-900 hover:bg-gray-100'
    : 'border border-gray-300 text-gray-900 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-100 dark:hover:bg-gray-900'

  return (
    <section className={`${sectionBg} py-16 md:py-24 lg:py-28 px-5`}>
      <div
        className={`relative mx-auto flex w-full max-w-3xl flex-col justify-between gap-y-6 border-t border-b ${borderColor} bg-[radial-gradient(35%_80%_at_25%_0%,rgba(17,24,39,0.06),transparent)] px-4 py-12`}
      >
        <Plus
          className={`absolute top-[-12.5px] left-[-11.5px] z-10 size-6 ${plusColor}`}
          strokeWidth={1}
        />
        <Plus
          className={`absolute top-[-12.5px] right-[-11.5px] z-10 size-6 ${plusColor}`}
          strokeWidth={1}
        />
        <Plus
          className={`absolute bottom-[-12.5px] left-[-11.5px] z-10 size-6 ${plusColor}`}
          strokeWidth={1}
        />
        <Plus
          className={`absolute right-[-11.5px] bottom-[-12.5px] z-10 size-6 ${plusColor}`}
          strokeWidth={1}
        />

        {/* Extended vertical side lines (left + right) */}
        <div
          className={`-inset-y-6 pointer-events-none absolute left-0 w-px border-l ${borderColor}`}
        />
        <div
          className={`-inset-y-6 pointer-events-none absolute right-0 w-px border-r ${borderColor}`}
        />

        {/* Center dashed vertical guide */}
        <div
          className={`-z-10 absolute top-0 left-1/2 h-full border-l border-dashed ${dashColor}`}
        />

        <div className="space-y-1.5">
          <h2 className={`text-center font-bold text-2xl md:text-3xl ${h2Color}`}>
            {headline}
          </h2>
          <p className={`text-center text-sm md:text-base ${pColor}`}>{sub}</p>
        </div>

        <div className="flex items-center justify-center gap-2">
          <button
            type="button"
            className={`inline-flex h-10 items-center rounded-md px-4 text-sm font-medium transition-colors ${outlineBtn}`}
          >
            {secondary}
          </button>
          <button
            type="button"
            className={`inline-flex h-10 items-center rounded-md px-4 text-sm font-medium transition-colors ${primaryBtn}`}
          >
            {primary}
            <ArrowRight className="size-4 ml-1.5" />
          </button>
        </div>
      </div>
    </section>
  )
}
