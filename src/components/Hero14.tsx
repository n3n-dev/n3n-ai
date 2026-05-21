import { motion } from 'framer-motion'
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

function mulberry32(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// Draft 14 hero — Hero13 with the center vertical highlight strip on
// each column removed (the faint line through the middle of every
// cylinder). Edge shading retained so the 3D rounded look survives.
//
// Column gradient sampled from the reference (bottom → top):
//   ~0–8%   deep teal void          rgba(8,40,42,*)
//   ~8–22%  cyan-teal               rgba(78,184,181,*)
//   ~22–38% bright cyan-white       rgba(216,245,240,*)
//   ~38–55% hot white core          rgba(248,255,253,*)
//   ~55–72% jade / mint             rgba(109,213,168,*)
//   ~72–88% emerald                 rgba(45,157,95,*)
//   ~88–100% dark green fade        rgba(10,48,32,0)
export default function Hero14({ lang, h1Override, subheadOverride }: Props) {
  const h1 =
    h1Override ??
    (lang === 'ko'
      ? 'From Video\nto Decisions'
      : 'From Video\nto Decisions')
  const sub =
    subheadOverride ??
    (lang === 'ko'
      ? 'AI 영상 분석으로 이상 상황을 감지하고 즉각적인 대응과 운영 판단을 지원합니다.'
      : 'AI video analytics detects anomalies, enabling instant response and informed decisions.')

  const COLS = 56

  const colSeeds = useMemo(() => {
    const rand = mulberry32(2026)
    return Array.from({ length: COLS }).map(() => ({
      delay: rand() * 4.0,
      pulseDur: 2.6 + rand() * 2.4,
      shimmerDur: 2.2 + rand() * 1.8,
      shimmerDelay: rand() * 3.0,
    }))
  }, [])

  const drops = useMemo(() => {
    const rand = mulberry32(91)
    return Array.from({ length: 10 }).map((_, i) => ({
      key: i,
      leftPct: rand() * 100,
      duration: 2.6 + rand() * 3.4,
      delay: rand() * 6.0,
      heightPct: 12 + rand() * 18,
      width: 1 + Math.round(rand() * 1.3),
      opacity: 0.35 + rand() * 0.4,
    }))
  }, [])

  // Column body gradient — bottom (teal) through white core to emerald top.
  const colBg =
    'linear-gradient(to top,' +
    'rgba(8,40,42,0) 0%,' +
    'rgba(40,120,124,0.55) 6%,' +
    'rgba(78,184,181,0.85) 14%,' +
    'rgba(160,228,218,0.92) 24%,' +
    'rgba(216,245,240,0.95) 34%,' +
    'rgba(248,255,253,1) 46%,' +
    'rgba(180,235,200,0.92) 58%,' +
    'rgba(109,213,168,0.85) 68%,' +
    'rgba(60,180,118,0.70) 78%,' +
    'rgba(45,157,95,0.45) 86%,' +
    'rgba(20,90,55,0.18) 94%,' +
    'rgba(10,48,32,0) 100%)'

  // Hot white shimmer — sits over the white-core band of each column.
  const shimmerBg =
    'linear-gradient(to top,' +
    'rgba(216,245,240,0) 0%,' +
    'rgba(216,245,240,0.55) 30%,' +
    'rgba(248,255,253,0.95) 50%,' +
    'rgba(180,235,200,0.55) 70%,' +
    'rgba(109,213,168,0) 100%)'

  // Cylindrical light wrap — horizontal gradient simulating a rounded
  // tube. Side edges fall to darker green-black, center carries a
  // narrow bright highlight strip, giving each column a 3D / glass feel.
  const cylinderShade =
    'linear-gradient(to right,' +
    'rgba(0,0,0,0.55) 0%,' +
    'rgba(0,0,0,0.30) 12%,' +
    'rgba(0,0,0,0.08) 28%,' +
    'rgba(255,255,255,0.00) 42%,' +
    'rgba(255,255,255,0.00) 58%,' +
    'rgba(0,0,0,0.08) 72%,' +
    'rgba(0,0,0,0.30) 88%,' +
    'rgba(0,0,0,0.55) 100%)'

  return (
    <section className="relative overflow-hidden bg-[#000000] text-white isolate">
      {/* === BACKGROUND GRID === */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
        }}
      />
      {/* Slightly stronger major grid every 4th line for depth */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.07) 1px, transparent 1px)',
          backgroundSize: '224px 224px',
        }}
      />

      {/* === COLUMN BAND === */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-x-0 bottom-0 h-[82%]">
          <div className="relative h-full w-full">
            {/* Soft vignette behind the columns — keyed to teal/emerald */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(120% 80% at 50% 100%, rgba(45,157,95,0.30) 0%, rgba(20,90,80,0.18) 35%, rgba(0,0,0,0) 70%)',
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
                    {/* base color band */}
                    <div
                      className="absolute inset-0"
                      style={{ background: colBg, filter: 'blur(0.4px)' }}
                    />

                    {/* cylindrical edge shadow — darkens left/right sides */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{ background: cylinderShade, mixBlendMode: 'multiply' }}
                    />

                    <motion.div
                      className="absolute inset-x-0 bottom-[26%] h-[40%]"
                      style={{ background: shimmerBg, mixBlendMode: 'screen' }}
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

            {/* Aggregate bottom bloom — emerald + teal */}
            <div
              className="absolute inset-x-0 bottom-0 h-[34%] pointer-events-none"
              style={{
                background:
                  'radial-gradient(60% 100% at 50% 100%, rgba(78,184,181,0.40) 0%, rgba(45,157,95,0.22) 45%, rgba(0,0,0,0) 78%)',
                mixBlendMode: 'screen',
                filter: 'blur(10px)',
              }}
            />
          </div>
        </div>
      </div>

      {/* === RANDOM DROP LINES (kept, retuned to reference colors) === */}
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
                'linear-gradient(to bottom, rgba(216,245,240,0) 0%, rgba(160,228,218,0.45) 35%, rgba(248,255,253,0.95) 70%, rgba(109,213,168,0.55) 100%)',
              filter: 'blur(0.5px)',
              opacity: d.opacity,
              boxShadow: '0 0 12px rgba(78,184,181,0.45)',
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
            borderTop: m.side.startsWith('top') ? '1px solid rgba(255,255,255,0.45)' : 'none',
            borderBottom: m.side.startsWith('bottom') ? '1px solid rgba(255,255,255,0.45)' : 'none',
            borderLeft: m.side.endsWith('left') ? '1px solid rgba(255,255,255,0.45)' : 'none',
            borderRight: m.side.endsWith('right') ? '1px solid rgba(255,255,255,0.45)' : 'none',
            opacity: 0.5,
          }}
        />
      ))}

      {/* === FOREGROUND CONTENT === */}
      <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 pt-44 md:pt-60 pb-44 md:pb-60 min-h-[88vh] flex flex-col justify-center">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease, delay: 0.05 }}
          className="font-grotesk font-semibold tracking-[-0.04em] leading-[0.92] whitespace-pre-line break-keep text-center
                     text-[clamp(56px,12vw,180px)]"
          style={{
            backgroundImage:
              'linear-gradient(180deg, #FFFFFF 0%, #E8FFF7 45%, rgba(140,240,210,0.85) 100%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            textShadow: '0 0 32px rgba(78,184,181,0.12)',
          }}
        >
          {h1}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.15 }}
          className="mt-10 md:mt-14 text-sm md:text-base lg:text-lg leading-[1.35] tracking-tight text-white/80 text-center mx-auto whitespace-nowrap"
        >
          {sub}
        </motion.p>
      </div>

      <div className="absolute inset-x-0 top-0 h-px bg-white/12" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-white/15" />
    </section>
  )
}
