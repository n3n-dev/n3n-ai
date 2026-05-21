import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useMemo } from 'react'
import type { Translations, Lang } from '../i18n/translations'

interface Props {
  tr: Translations
  lang: Lang
  badgeOverride?: string
  h1Override?: string
  subheadOverride?: string
}

const ease = [0.16, 1, 0.3, 1] as const

// Deterministic pseudo-random so SSR / re-renders stay stable.
function mulberry32(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// Draft 12 hero — derivative of Hero113, but:
// • no grid pattern background
// • columns animate vertically only (independent random phase, NOT a
//   left-to-right wave)
// • center glow line is stable, full hero height, no pulse
// • random "drop" lines fall from the top at varied x / timing
export default function Hero12({ tr, lang, badgeOverride, h1Override, subheadOverride }: Props) {
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

  const COLS = 56

  // Per-column random phase / duration so vertical pulses are decoupled
  // from neighbor index — kills the left→right wave reading.
  const colSeeds = useMemo(() => {
    const rand = mulberry32(2026)
    return Array.from({ length: COLS }).map(() => ({
      delay: rand() * 4.0,
      pulseDur: 2.6 + rand() * 2.4,
      shimmerDur: 2.2 + rand() * 1.8,
      shimmerDelay: rand() * 3.0,
    }))
  }, [])

  // Random drop lines that fall from the top edge to the bottom of the
  // hero. Variation across x, duration, delay, length, brightness so it
  // reads like sporadic streaks rather than a coordinated rain.
  const drops = useMemo(() => {
    const rand = mulberry32(91)
    return Array.from({ length: 14 }).map((_, i) => ({
      key: i,
      leftPct: rand() * 100,
      duration: 2.4 + rand() * 3.6,
      delay: rand() * 6.0,
      heightPct: 14 + rand() * 22,
      width: 1 + Math.round(rand() * 1.5),
      opacity: 0.45 + rand() * 0.45,
    }))
  }, [])

  return (
    <section className="relative overflow-hidden bg-[#050505] text-white isolate">
      {/* === COLUMN BAND === */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-x-0 bottom-0 h-[82%]">
          <div className="relative h-full w-full">
            {/* Soft vignette behind the columns */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(120% 80% at 50% 100%, rgba(20,80,80,0.35) 0%, rgba(8,20,20,0.18) 35%, rgba(0,0,0,0) 70%)',
              }}
            />

            <div className="absolute inset-0 flex items-end gap-[2px] px-[1.2%]">
              {Array.from({ length: COLS }).map((_, i) => {
                const center = (COLS - 1) / 2
                const distNorm = Math.abs(i - center) / center
                const heightPct = 70 - distNorm * 36 + Math.sin(i * 1.7) * 4
                const baseOpacity = 0.55 + (1 - distNorm) * 0.35
                const seed = colSeeds[i]

                return (
                  <motion.div
                    key={i}
                    className="relative flex-1 origin-bottom"
                    style={{ height: `${heightPct}%`, opacity: baseOpacity }}
                    initial={{ scaleY: 0.95 }}
                    animate={{ scaleY: [0.92, 1.04, 0.94, 1.0, 0.92] }}
                    transition={{
                      duration: seed.pulseDur,
                      ease: 'easeInOut',
                      repeat: Infinity,
                      delay: seed.delay,
                    }}
                  >
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          'linear-gradient(to top, rgba(180,255,235,0.95) 0%, rgba(80,210,200,0.85) 12%, rgba(40,160,170,0.55) 32%, rgba(20,120,140,0.30) 52%, rgba(20,80,90,0.10) 72%, rgba(0,0,0,0) 96%)',
                        filter: 'blur(0.4px)',
                      }}
                    />

                    {/* Vertical-only shimmer — opacity pulses, no traveling
                        highlight, no horizontal phase relationship. */}
                    <motion.div
                      className="absolute inset-x-0 bottom-0 h-[55%]"
                      style={{
                        background:
                          'linear-gradient(to top, rgba(255,255,255,0.85) 0%, rgba(180,255,230,0.60) 28%, rgba(80,210,200,0.18) 55%, rgba(0,0,0,0) 100%)',
                        mixBlendMode: 'screen',
                      }}
                      initial={{ opacity: 0.5 }}
                      animate={{ opacity: [0.45, 0.9, 0.55, 0.95, 0.45] }}
                      transition={{
                        duration: seed.shimmerDur,
                        ease: 'easeInOut',
                        repeat: Infinity,
                        delay: seed.shimmerDelay,
                      }}
                    />
                  </motion.div>
                )
              })}
            </div>

            {/* Aggregate bottom bloom */}
            <div
              className="absolute inset-x-0 bottom-0 h-[30%] pointer-events-none"
              style={{
                background:
                  'radial-gradient(60% 100% at 50% 100%, rgba(120,255,210,0.35) 0%, rgba(40,180,180,0.20) 40%, rgba(0,0,0,0) 75%)',
                mixBlendMode: 'screen',
                filter: 'blur(8px)',
              }}
            />
          </div>
        </div>
      </div>

      {/* === STABLE FULL-HEIGHT CENTER GLOW LINE === */}
      <div
        aria-hidden
        className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px]"
        style={{
          background:
            'linear-gradient(to bottom, rgba(180,255,230,0) 0%, rgba(180,255,230,0.45) 18%, rgba(255,255,255,0.92) 55%, rgba(180,255,230,0.85) 100%)',
          filter: 'blur(0.6px)',
          boxShadow: '0 0 18px rgba(120,255,210,0.55), 0 0 38px rgba(80,210,200,0.35)',
        }}
      />

      {/* === RANDOM DROP LINES === */}
      <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
        {drops.map((d) => (
          <motion.span
            key={d.key}
            className="absolute"
            style={{
              left: `${d.leftPct}%`,
              top: 0,
              width: `${d.width}px`,
              height: `${d.heightPct}%`,
              background:
                'linear-gradient(to bottom, rgba(180,255,230,0) 0%, rgba(180,255,230,0.55) 35%, rgba(255,255,255,0.95) 70%, rgba(180,255,230,0.55) 100%)',
              filter: 'blur(0.5px)',
              opacity: d.opacity,
              boxShadow: '0 0 12px rgba(120,255,210,0.55)',
            }}
            initial={{ y: '-120%' }}
            animate={{ y: ['-120%', '1400%'] }}
            transition={{
              duration: d.duration,
              ease: 'easeIn',
              repeat: Infinity,
              delay: d.delay,
            }}
          />
        ))}
      </div>

      {/* === CORNER REGISTRATION TICKS === */}
      {([
        { side: 'top-left', x: '6%', y: '34%' },
        { side: 'top-right', x: '94%', y: '34%' },
        { side: 'bottom-left', x: '6%', y: '92%' },
        { side: 'bottom-right', x: '94%', y: '92%' },
      ] as const).map((m, i) => (
        <span
          key={i}
          aria-hidden
          className="absolute pointer-events-none"
          style={{
            left: m.x,
            top: m.y,
            width: 18,
            height: 18,
            transform: 'translate(-50%,-50%)',
            borderTop: m.side.startsWith('top') ? '1px solid rgba(255,255,255,0.55)' : 'none',
            borderBottom: m.side.startsWith('bottom') ? '1px solid rgba(255,255,255,0.55)' : 'none',
            borderLeft: m.side.endsWith('left') ? '1px solid rgba(255,255,255,0.55)' : 'none',
            borderRight: m.side.endsWith('right') ? '1px solid rgba(255,255,255,0.55)' : 'none',
            opacity: 0.55,
          }}
        />
      ))}

      {/* === FOREGROUND CONTENT === */}
      <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 pt-32 md:pt-40 pb-32 md:pb-44">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="flex items-center justify-between text-[11px] md:text-[12px] tracking-[0.22em] uppercase font-medium text-white/70 mb-10 md:mb-14"
        >
          <span>{badge}</span>
          <span className="hidden md:inline">© {new Date().getFullYear()} — N3N AI / Aura 12</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease, delay: 0.05 }}
          className="font-grotesk font-semibold tracking-[-0.04em] leading-[0.92] whitespace-pre-line break-keep
                     text-[clamp(56px,12vw,180px)]"
          style={{
            backgroundImage:
              'linear-gradient(180deg, #FFFFFF 0%, #E8FFF7 45%, rgba(140,240,210,0.85) 100%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            textShadow: '0 0 32px rgba(120,255,210,0.10)',
          }}
        >
          {h1}
        </motion.h1>

        <div className="mt-12 md:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-14 items-end">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.15 }}
            className="lg:col-span-7"
          >
            <p className="text-lg md:text-2xl leading-[1.35] tracking-tight text-white/80 max-w-2xl break-keep">
              {sub}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold tracking-tight transition-colors"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.08) 100%)',
                  border: '1px solid rgba(180,255,230,0.35)',
                  color: '#F2FFFA',
                  backdropFilter: 'blur(6px)',
                  boxShadow:
                    '0 0 18px rgba(120,255,210,0.18), inset 0 1px 0 rgba(255,255,255,0.20)',
                }}
              >
                {tr.hero.cta1}
                <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform duration-300" />
              </a>
              <a
                href="#products"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-white/20 text-sm font-semibold tracking-tight text-white/85 hover:bg-white/5 transition-colors"
              >
                {lang === 'ko' ? '제품 보기' : 'View Products'}
              </a>
            </div>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.25 }}
            className="lg:col-span-5 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-white/15 pt-6"
          >
            {meta.map((m) => (
              <div key={m.k} className="flex items-baseline gap-3">
                <dt className="text-[11px] tabular-nums tracking-[0.18em] text-white/45">{m.k}</dt>
                <dd className="text-sm md:text-[15px] font-medium tracking-tight text-white/85">
                  {m.label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </div>

      <div className="absolute inset-x-0 top-0 h-px bg-white/12" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-white/15" />
    </section>
  )
}
