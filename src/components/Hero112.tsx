import { motion } from 'framer-motion'
import { ArrowUpRight, Plus } from 'lucide-react'
import type { Translations, Lang } from '../i18n/translations'

interface Props {
  tr: Translations
  lang: Lang
  badgeOverride?: string
  h1Override?: string
  subheadOverride?: string
}

// Tirtus-inspired tokens — corporate navy / cobalt blue light system.
const T = {
  bg: '#FFFFFF',
  surfaceTint: '#F4F6FB',
  border: '#E1E6F0',
  borderSoft: '#EEF2F8',
  primary: '#0F1F4F', // deep corporate navy
  primaryHover: '#172A66',
  accent: '#2563EB', // cobalt blue
  textPrimary: '#0F1F4F',
  textSecondary: '#5A6786',
  tertiary: '#94A3B8',
}

const display: React.CSSProperties = {
  fontFamily: '"Inter", "Manrope", system-ui, sans-serif',
  fontWeight: 600,
  letterSpacing: '-0.035em',
  lineHeight: 0.98,
}
const body: React.CSSProperties = {
  fontFamily: '"Inter", system-ui, sans-serif',
  fontSize: '15px',
  fontWeight: 400,
  lineHeight: '24px',
  letterSpacing: '-0.005em',
}
const label: React.CSSProperties = {
  fontFamily: '"Inter", system-ui, sans-serif',
  fontSize: '11px',
  fontWeight: 500,
  lineHeight: '16px',
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
}

const ease = [0.4, 0, 0.2, 1] as const

export default function Hero112({ tr, lang, badgeOverride, h1Override, subheadOverride }: Props) {
  const badge = badgeOverride ?? '01 — Operational Intelligence'
  const h1 =
    h1Override ??
    (lang === 'ko'
      ? 'Engineered\nfor decision\nmaking.'
      : 'Engineered\nfor decision\nmaking.')
  const sub =
    subheadOverride ??
    (lang === 'ko'
      ? 'INNOWATCH와 WIZEYE — 영상·데이터·운영 신호를 하나의 인텔리전스 레이어로 결합해, 현장의 의사결정 속도를 단축합니다.'
      : 'INNOWATCH + WIZEYE — A unified intelligence layer that compresses the loop between operational signal and field decision.')

  // Corporate stat strip — Tirtus-style 4-column metric band.
  const stats =
    lang === 'ko'
      ? [
          { v: '2014', k: '설립' },
          { v: '12+', k: '주요 산업' },
          { v: '500+', k: '연결 카메라' },
          { v: '40ms', k: '감지 지연' },
        ]
      : [
          { v: '2014', k: 'Founded' },
          { v: '12+', k: 'Industries' },
          { v: '500+', k: 'Connected cameras' },
          { v: '40ms', k: 'Detection latency' },
        ]

  return (
    <section className="relative overflow-hidden" style={{ background: T.bg, color: T.textPrimary }}>
      {/* Strong grid scaffolding — vertical rules + thin horizontal */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {[0, 25, 50, 75, 100].map((p) => (
          <span
            key={p}
            className="absolute inset-y-0 block w-px"
            style={{ left: `${p}%`, background: T.borderSoft }}
          />
        ))}
        <span className="absolute inset-x-0 top-0 block h-px" style={{ background: T.border }} />
        <span className="absolute inset-x-0 top-[88px] block h-px" style={{ background: T.borderSoft }} />
      </div>

      {/* Top utility band — eyebrow + index */}
      <div className="relative">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-6 md:px-12 py-7">
          <div className="flex items-center gap-3">
            <span
              className="inline-flex h-7 w-7 items-center justify-center rounded-[4px]"
              style={{ background: T.primary, color: '#FFFFFF' }}
            >
              <Plus size={14} />
            </span>
            <span style={{ ...label, color: T.textSecondary }}>N3N AI · Industrial Intelligence</span>
          </div>
          <span style={{ ...label, color: T.tertiary }}>
            © {new Date().getFullYear()} / Republic of Korea
          </span>
        </div>
      </div>

      {/* Headline block */}
      <div className="relative mx-auto max-w-[1500px] px-6 md:px-12 pt-6 pb-16 md:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease }}
          className="mb-12 flex items-center gap-3"
        >
          <span style={{ ...label, color: T.accent }}>{badge}</span>
          <span className="block h-px flex-1" style={{ background: T.border }} />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease, delay: 0.05 }}
          className="whitespace-pre-line break-keep"
          style={{
            ...display,
            fontSize: 'clamp(64px, 12vw, 184px)',
            color: T.primary,
          }}
        >
          {h1}
        </motion.h1>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-end">
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
                className="group inline-flex items-center gap-2 rounded-[2px] px-6 py-3.5 transition-colors"
                style={{
                  background: T.primary,
                  color: '#FFFFFF',
                  fontSize: '14px',
                  fontWeight: 500,
                  lineHeight: '20px',
                  letterSpacing: '-0.005em',
                }}
              >
                {tr.hero.cta1}
                <ArrowUpRight size={14} className="transition-transform duration-150 group-hover:rotate-45" />
              </a>
              <a
                href="#products"
                className="inline-flex items-center gap-2 rounded-[2px] px-6 py-3.5 transition-colors hover:bg-[#0F1F4F]/5"
                style={{
                  border: `1px solid ${T.primary}`,
                  color: T.primary,
                  fontSize: '14px',
                  fontWeight: 500,
                  lineHeight: '20px',
                  letterSpacing: '-0.005em',
                }}
              >
                {lang === 'ko' ? '제품 살펴보기' : 'Explore the platform'}
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease, delay: 0.25 }}
            className="lg:col-span-5"
          >
            {/* Cobalt accent strip */}
            <div className="mb-6 flex items-center gap-3">
              <span className="block h-1 w-10" style={{ background: T.accent }} />
              <span style={{ ...label, color: T.textSecondary }}>
                {lang === 'ko' ? '한 눈에 보는 운영 지표' : 'At a glance'}
              </span>
            </div>

            <div
              className="overflow-hidden rounded-[2px]"
              style={{ border: `1px solid ${T.border}` }}
            >
              {/* Top inset card — primary stat */}
              <div
                className="px-6 py-7"
                style={{ background: T.primary, color: '#FFFFFF' }}
              >
                <div className="flex items-end justify-between">
                  <div>
                    <div style={{ ...label, color: 'rgba(255,255,255,0.6)' }}>
                      {lang === 'ko' ? '일 처리 프레임' : 'Frames / day'}
                    </div>
                    <div
                      className="mt-2 tabular-nums"
                      style={{
                        ...display,
                        fontSize: 'clamp(40px, 5vw, 64px)',
                        color: '#FFFFFF',
                      }}
                    >
                      1.2B
                    </div>
                  </div>
                  <span
                    className="inline-flex items-center gap-1 rounded-[2px] px-2 py-1 tabular-nums"
                    style={{
                      background: T.accent,
                      color: '#FFFFFF',
                      fontSize: '11px',
                      fontWeight: 600,
                      lineHeight: '14px',
                    }}
                  >
                    +8.4%
                  </span>
                </div>
              </div>

              {/* Stat grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4">
                {stats.map((s, i) => (
                  <div
                    key={s.k}
                    className="px-4 py-5"
                    style={{
                      background: T.bg,
                      borderLeft: i === 0 ? 'none' : `1px solid ${T.borderSoft}`,
                      borderTop: `1px solid ${T.borderSoft}`,
                    }}
                  >
                    <div
                      className="tabular-nums"
                      style={{ ...display, fontSize: '24px', color: T.primary }}
                    >
                      {s.v}
                    </div>
                    <div
                      className="mt-1"
                      style={{
                        fontFamily: '"Inter", system-ui, sans-serif',
                        fontSize: '11px',
                        fontWeight: 500,
                        color: T.textSecondary,
                      }}
                    >
                      {s.k}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom thick rule — corporate band finisher */}
      <div className="relative">
        <span className="block h-px" style={{ background: T.border }} />
        <div
          className="mx-auto flex max-w-[1500px] items-center justify-between px-6 md:px-12 py-4"
          style={{ ...label, color: T.tertiary }}
        >
          <span>↓ {lang === 'ko' ? '스크롤하여 운영 케이스 보기' : 'Scroll for operational cases'}</span>
          <span className="hidden md:inline">02 / Industries</span>
        </div>
        <span className="block h-1" style={{ background: T.primary }} />
      </div>
    </section>
  )
}
