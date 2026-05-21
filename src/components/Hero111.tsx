import { motion } from 'framer-motion'
import { ArrowUpRight, Sun } from 'lucide-react'
import type { Translations, Lang } from '../i18n/translations'

interface Props {
  tr: Translations
  lang: Lang
  badgeOverride?: string
  h1Override?: string
  subheadOverride?: string
}

// DESIGN.md tokens — navy/slate light system.
const T = {
  bg: '#E2E8F0',
  surface: '#FFFFFF',
  border: '#E2E8F0',
  borderSoft: '#F1F5F9',
  textPrimary: '#0A2540',
  textSecondary: '#64748B',
  tertiary: '#94A3B8',
  accent: '#0A2540',
}

// 60/500/-0.025em from DESIGN.md.
const display: React.CSSProperties = {
  fontSize: 'clamp(40px, 7.4vw, 60px)',
  fontWeight: 500,
  lineHeight: '60px',
  letterSpacing: '-0.025em',
}
const body: React.CSSProperties = {
  fontSize: '14px',
  fontWeight: 400,
  lineHeight: '22.75px',
}

const ease = [0.4, 0, 0.2, 1] as const

export default function Hero111({ tr, lang, badgeOverride, h1Override, subheadOverride }: Props) {
  const badge = badgeOverride ?? 'N3N · Operational Intelligence'
  const h1 =
    h1Override ??
    (lang === 'ko'
      ? 'Decisions, in real time.\nFor the operations\nyou run.'
      : 'Decisions, in real time.\nFor the operations\nyou run.')
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
    <section className="relative overflow-hidden" style={{ background: T.bg, color: T.textPrimary }}>
      {/* Strong-grid scaffolding — vertical hairlines + horizontal hairlines */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {/* Top + bottom horizontal */}
        <span className="absolute inset-x-0 top-[64px] block h-px" style={{ background: T.border }} />
        <span className="absolute inset-x-0 bottom-0 block h-px" style={{ background: T.border }} />
        {/* Three vertical guides at 25% / 50% / 75% — strong grid */}
        {[25, 50, 75].map((p) => (
          <span
            key={p}
            className="absolute inset-y-0 block w-px"
            style={{ left: `${p}%`, background: T.borderSoft }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-[1400px] px-6 md:px-12 pt-[96px] pb-[64px] md:pt-[99.5px]">
        {/* Eyebrow row — primary chip + utility icon */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease }}
          className="mb-12 flex items-center justify-between"
        >
          <div
            className="inline-flex items-center gap-2 rounded-[4px] px-3 py-1.5"
            style={{
              background: T.surface,
              border: `1px solid ${T.border}`,
              color: T.textPrimary,
              fontSize: '12px',
              fontWeight: 500,
              lineHeight: '16px',
              letterSpacing: '-0.01em',
              boxShadow: 'rgba(0,0,0,0.05) 0px 1px 2px 0px',
            }}
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: T.accent }} />
            {badge}
          </div>
          <button
            type="button"
            aria-label="Toggle theme"
            className="hidden md:inline-flex h-8 w-8 items-center justify-center rounded-[4px]"
            style={{ background: T.surface, border: `1px solid ${T.border}`, color: T.textSecondary }}
          >
            <Sun size={14} />
          </button>
        </motion.div>

        {/* Display H1 — System Font 60/500/-0.025em */}
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease, delay: 0.05 }}
          className="whitespace-pre-line break-keep"
          style={{ ...display, color: T.textPrimary }}
        >
          {h1}
        </motion.h1>

        {/* Sub row: meta strip + lead paragraph */}
        <div className="mt-12 md:mt-[48px] grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-end">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease, delay: 0.15 }}
            className="lg:col-span-7"
          >
            <p className="max-w-2xl break-keep" style={{ ...body, color: T.textSecondary }}>
              {sub}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-2">
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 rounded-[4px] px-5 py-2.5 transition-colors"
                style={{
                  background: T.accent,
                  color: T.surface,
                  fontSize: '14px',
                  fontWeight: 500,
                  lineHeight: '22.75px',
                }}
              >
                {tr.hero.cta1}
                <ArrowUpRight size={14} className="transition-transform duration-150 group-hover:rotate-45" />
              </a>
              <a
                href="#products"
                className="inline-flex items-center gap-2 rounded-[4px] px-5 py-2.5 transition-colors"
                style={{
                  background: T.surface,
                  border: `1px solid ${T.border}`,
                  color: T.textPrimary,
                  fontSize: '14px',
                  fontWeight: 500,
                  lineHeight: '22.75px',
                  boxShadow: 'rgba(0,0,0,0.05) 0px 1px 2px 0px',
                }}
              >
                {lang === 'ko' ? '제품 보기' : 'View Products'}
              </a>
            </div>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease, delay: 0.25 }}
            className="lg:col-span-5 grid grid-cols-2 gap-x-6 gap-y-3 pt-6"
            style={{ borderTop: `1px solid ${T.border}` }}
          >
            {meta.map((m) => (
              <div key={m.k} className="flex items-baseline gap-3">
                <dt className="tabular-nums" style={{ fontSize: '12px', color: T.tertiary, letterSpacing: '0.04em' }}>
                  {m.k}
                </dt>
                <dd style={{ ...body, color: T.textPrimary, fontWeight: 500 }}>{m.label}</dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </div>
    </section>
  )
}
