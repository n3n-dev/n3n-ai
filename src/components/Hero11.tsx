import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import type { Translations, Lang } from '../i18n/translations'

interface Props {
  tr: Translations
  lang: Lang
  badgeOverride?: string
  h1Override?: string
  subheadOverride?: string
}

const ease = [0.16, 1, 0.3, 1] as const

export default function Hero11({ tr, lang, badgeOverride, h1Override, subheadOverride }: Props) {
  const badge = badgeOverride ?? '◐  N3N · AI Operational Intelligence'
  const h1 =
    h1Override ??
    (lang === 'ko'
      ? 'Decisions,\nin real time.'
      : 'Decisions,\nin real time.')
  const sub =
    subheadOverride ??
    (lang === 'ko'
      ? '흩어진 영상·데이터를 하나로 연결해, 현장의 의사결정을 즉시 가능하게 합니다.'
      : 'Connecting fragmented video and data into a single signal — so the field can decide, instantly.')

  const meta = [
    { k: '01', label: lang === 'ko' ? '실시간 영상 분석' : 'Real-time Video Analytics' },
    { k: '02', label: lang === 'ko' ? '엣지 추론' : 'Edge Inference' },
    { k: '03', label: lang === 'ko' ? '운영 인텔리전스' : 'Operational Intelligence' },
    { k: '04', label: lang === 'ko' ? '엔터프라이즈 보안' : 'Enterprise Security' },
  ]

  return (
    <section className="relative bg-[#F4F2EC] text-[#0B0B0B] overflow-hidden">
      {/* Top hairlines (editorial RET feel) */}
      <div className="absolute inset-x-0 top-0 h-px bg-[#0B0B0B]/12" />
      <div className="absolute inset-x-0 top-20 h-px bg-[#0B0B0B]/8" />

      {/* Subtle grain dot grid */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.10]"
        style={{
          backgroundImage:
            'radial-gradient(rgba(11,11,11,0.55) 1px, transparent 1px)',
          backgroundSize: '22px 22px',
        }}
      />

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 pt-32 md:pt-40 pb-20 md:pb-28">
        {/* Eyebrow row */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="flex items-center justify-between text-[11px] md:text-[12px] tracking-[0.22em] uppercase font-medium text-[#0B0B0B]/70 mb-10 md:mb-14"
        >
          <span>{badge}</span>
          <span className="hidden md:inline">© {new Date().getFullYear()} — N3N AI / Light</span>
        </motion.div>

        {/* Display H1 — RET-style oversized */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease, delay: 0.05 }}
          className="font-grotesk font-semibold tracking-[-0.04em] leading-[0.92] whitespace-pre-line break-keep
                     text-[clamp(56px,12vw,180px)]"
        >
          {h1}
        </motion.h1>

        {/* Sub row: meta strip + lead paragraph */}
        <div className="mt-12 md:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-14 items-end">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.15 }}
            className="lg:col-span-7"
          >
            <p className="text-lg md:text-2xl leading-[1.35] tracking-tight text-[#0B0B0B]/80 max-w-2xl break-keep">
              {sub}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#0B0B0B] text-[#F4F2EC] text-sm font-semibold tracking-tight hover:bg-[#1A1A1A] transition-colors"
              >
                {tr.hero.cta1}
                <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform duration-300" />
              </a>
              <a
                href="#products"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-[#0B0B0B]/20 text-sm font-semibold tracking-tight hover:bg-[#0B0B0B]/5 transition-colors"
              >
                {lang === 'ko' ? '제품 보기' : 'View Products'}
              </a>
            </div>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.25 }}
            className="lg:col-span-5 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-[#0B0B0B]/15 pt-6"
          >
            {meta.map((m) => (
              <div key={m.k} className="flex items-baseline gap-3">
                <dt className="text-[11px] tabular-nums tracking-[0.18em] text-[#0B0B0B]/50">{m.k}</dt>
                <dd className="text-sm md:text-[15px] font-medium tracking-tight text-[#0B0B0B]/85">
                  {m.label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </div>

      {/* Bottom hairline */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-[#0B0B0B]/15" />
    </section>
  )
}
