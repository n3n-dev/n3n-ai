import { motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
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

// Draft 17 hero, Draft 16 with the column color palette flipped to a
// sunset / sky scheme: sky blue at the bottom, hot white core, warm
// yellow toward the top fading into the black background. Drip / bloom
// retuned to match.
//
// Column gradient sampled from the reference (bottom → top):
//  ~0–8%  deep teal void     rgba(8,40,42,*)
//  ~8–22% cyan-teal        rgba(78,184,181,*)
//  ~22–38% bright cyan-white    rgba(216,245,240,*)
//  ~38–55% hot white core     rgba(248,255,253,*)
//  ~55–72% jade / mint       rgba(109,213,168,*)
//  ~72–88% emerald         rgba(45,157,95,*)
//  ~88–100% dark green fade    rgba(10,48,32,0)
export default function Hero20({ lang, h1Override, subheadOverride }: Props) {
 const h1 =
  h1Override ??
  (lang === 'ko'
   ? 'From Video\nto Decisions'
   : 'From Video\nto Decisions')
 const sub =
  subheadOverride ??
  (lang === 'ko'
   ? 'AI 영상 분석으로 이상 상황을 감지하고\n즉각적인 대응과 운영 판단을 지원합니다.'
   : 'AI video analytics detects anomalies,\nenabling instant response and informed decisions.')

 // More bars on desktop so each one reads as a thin stroke; fewer on
 // mobile so the bars stay visible at narrow widths.
 const [COLS, setCOLS] = useState(56)
 useEffect(() => {
  if (typeof window === 'undefined') return
  const mq = window.matchMedia('(min-width: 768px)')
  const apply = () => setCOLS(mq.matches ? 96 : 56)
  apply()
  mq.addEventListener('change', apply)
  return () => mq.removeEventListener('change', apply)
 }, [])

 const colSeeds = useMemo(() => {
  const rand = mulberry32(2026)
  return Array.from({ length: COLS }).map(() => ({
   delay: rand() * 4.0,
   pulseDur: 2.6 + rand() * 2.4,
   shimmerDur: 2.2 + rand() * 1.8,
   shimmerDelay: rand() * 3.0,
  }))
 }, [COLS])

 const drops = useMemo(() => {
  const rand = mulberry32(91)
  // Snap each drop to the seam between two columns so the bright
  // streak falls down the gap, not on top of a column.
  return Array.from({ length: 10 }).map((_, i) => {
   const gapIndex = Math.floor(rand() * (COLS - 1)) + 1
   return {
    key: i,
    leftPct: (gapIndex / COLS) * 100,
    duration: 2.6 + rand() * 3.4,
    delay: rand() * 6.0,
    heightPct: 12 + rand() * 18,
    width: 1,
    opacity: 0.35 + rand() * 0.4,
   }
  })
 }, [COLS])

 // Column body gradient, sage green bottom → hot white core → yellow top.
 //  ~0–6%  transparent fade in
 //  6–22%  deep sage / pistachio  rgba(106,168,123,*)
 //  22–38% light sage / mint    rgba(200,226,197,*)
 //  38–55% hot white core      rgba(255,255,255,*)
 //  55–72% warm white / cream    rgba(254,243,199,*)
 //  72–88% yellow          rgba(250,204,21,*)
 //  88–100% deep amber fading out
 const colBg =
  'linear-gradient(to top,' +
  'rgba(20,52,32,0) 0%,' +
  'rgba(70,128,90,0.55) 6%,' +
  'rgba(106,168,123,0.88) 14%,' +
  'rgba(149,196,163,0.92) 24%,' +
  'rgba(200,226,197,0.95) 34%,' +
  'rgba(255,255,255,1) 44%,' +
  'rgba(254,249,225,0.85) 54%,' +
  'rgba(254,240,138,0.55) 64%,' +
  'rgba(253,224,138,0.32) 74%,' +
  'rgba(230,200,120,0.16) 82%,' +
  'rgba(200,170,90,0.06) 90%,' +
  'rgba(160,140,60,0) 100%)'

 // Hot white shimmer, sits over the white-core band of each column.
 // Tinted: cool sage below the core, warm cream above.
 const shimmerBg =
  'linear-gradient(to top,' +
  'rgba(200,226,197,0) 0%,' +
  'rgba(200,226,197,0.55) 30%,' +
  'rgba(255,255,255,0.95) 50%,' +
  'rgba(254,249,225,0.45) 70%,' +
  'rgba(254,240,138,0) 100%)'

 // Subtle bevel, narrow dark fall-off at the very edges of each
 // rounded-rect column. Far softer than a cylinder wrap; the middle
 // 80% of the face stays flat. NO center highlight.
 const bevelShade =
  'linear-gradient(to right,' +
  'rgba(0,0,0,0.40) 0%,' +
  'rgba(0,0,0,0.18) 6%,' +
  'rgba(0,0,0,0.04) 14%,' +
  'rgba(0,0,0,0) 22%,' +
  'rgba(0,0,0,0) 78%,' +
  'rgba(0,0,0,0.04) 86%,' +
  'rgba(0,0,0,0.18) 94%,' +
  'rgba(0,0,0,0.40) 100%)'

 // SVG turbulence grain, tiled, low-opacity, blended into the column
 // band only.
 const grainSvg =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='1.4' numOctaves='2' seed='7' stitchTiles='stitch'/><feColorMatrix type='matrix' values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.65 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>"

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
      {/* Soft vignette behind the columns, keyed to sage green */}
      <div
       className="absolute inset-0"
       style={{
        background:
         'radial-gradient(120% 80% at 50% 100%, rgba(106,168,123,0.30) 0%, rgba(70,110,82,0.18) 35%, rgba(0,0,0,0) 70%)',
       }}
      />

      <div className="absolute inset-0 flex items-end gap-[2px]">
       {Array.from({ length: COLS }).map((_, i) => {
        const center = (COLS - 1) / 2
        const distNorm = Math.abs(i - center) / center
        const heightPct = 70 - distNorm * 20 + Math.sin(i * 1.7) * 4
        const baseOpacity = 0.72 + (1 - distNorm) * 0.22
        const seed = colSeeds[i]
        // phase delay across columns produces the wavy
        // top→bottom drip effect from Hero113.
        const dripDelay = (i / COLS) * 1.6

        return (
         <motion.div
          key={i}
          className="relative flex-1 origin-bottom overflow-hidden"
          style={{
           height: `${heightPct}%`,
           opacity: baseOpacity,
           borderRadius: '8px 8px 4px 4px',
           boxShadow:
            'inset 1px 0 0 rgba(255,255,255,0.06), inset -1px 0 0 rgba(0,0,0,0.30)',
           // Top-edge mask, every layer inside this column
           // (color band, bevel, grain, shimmer) fades to
           // transparent in the upper portion so the column
           // dissolves smoothly into the black background
           // instead of ending on a hard rounded-rect cap.
           WebkitMaskImage:
            'linear-gradient(to top, black 0%, black 38%, rgba(0,0,0,0.85) 58%, rgba(0,0,0,0.45) 78%, rgba(0,0,0,0.18) 90%, transparent 100%)',
           maskImage:
            'linear-gradient(to top, black 0%, black 38%, rgba(0,0,0,0.85) 58%, rgba(0,0,0,0.45) 78%, rgba(0,0,0,0.18) 90%, transparent 100%)',
          }}
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

          {/* edge bevel only, no center stripe */}
          <div
           className="absolute inset-0 pointer-events-none"
           style={{ background: bevelShade, mixBlendMode: 'multiply' }}
          />

          {/* per-column grain, tiled noise for texture */}
          <div
           className="absolute inset-0 pointer-events-none"
           style={{
            backgroundImage: `url("${grainSvg}")`,
            backgroundSize: '180px 180px',
            mixBlendMode: 'overlay',
            opacity: 0.45,
           }}
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

          {/* top→bottom drip, bright band traveling down the
            column on a loop, phase-offset by column index
            so the band reads as a wave moving across the
            whole row. */}
          <motion.div
           className="absolute inset-x-0 h-[28%] pointer-events-none"
           style={{
            background:
             'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(200,226,197,0.55) 40%, rgba(255,255,255,0.92) 60%, rgba(254,249,225,0.45) 80%, rgba(0,0,0,0) 100%)',
            mixBlendMode: 'screen',
            filter: 'blur(2px)',
           }}
           initial={{ y: '-120%' }}
           animate={{ y: ['-120%', '120%'] }}
           transition={{
            duration: 3.2,
            ease: 'easeInOut',
            repeat: Infinity,
            delay: -dripDelay,
           }}
          />
         </motion.div>
        )
       })}
      </div>

      {/* Aggregate bottom bloom, sage green */}
      <div
       className="absolute inset-x-0 bottom-0 h-[34%] pointer-events-none"
       style={{
        background:
         'radial-gradient(60% 100% at 50% 100%, rgba(106,168,123,0.42) 0%, rgba(70,110,82,0.22) 45%, rgba(0,0,0,0) 78%)',
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
        'linear-gradient(to bottom, rgba(254,249,225,0) 0%, rgba(254,240,138,0.28) 35%, rgba(255,255,255,0.92) 70%, rgba(200,226,197,0.55) 100%)',
       filter: 'blur(0.5px)',
       opacity: d.opacity,
       boxShadow: '0 0 12px rgba(106,168,123,0.45)',
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

   {/* === FOREGROUND CONTENT === */}
   <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 pt-44 md:pt-60 pb-44 md:pb-60 min-h-[88vh] flex flex-col justify-center">
    <motion.h1
     initial={{ opacity: 0, y: 24 }}
     animate={{ opacity: 1, y: 0 }}
     transition={{ duration: 1, ease, delay: 0.05 }}
     className="font-grotesk font-semibold tracking-[-0.04em] leading-[0.92] whitespace-pre-line break-keep text-center
           text-[clamp(44px,11vw,180px)]"
     style={{
      color: '#FFFFFF',
      textShadow: '0 0 32px rgba(255,255,255,0.18)',
     }}
    >
     {h1}
    </motion.h1>

    <motion.p
     initial={{ opacity: 0, y: 16 }}
     animate={{ opacity: 1, y: 0 }}
     transition={{ duration: 0.8, ease, delay: 0.15 }}
     className="relative isolate mt-5 md:mt-8 self-center inline-flex px-8 py-2 text-[14px] md:text-[16px] leading-[1.45] tracking-tight text-white/90 text-center break-keep whitespace-pre-line md:whitespace-nowrap max-w-[92%] md:max-w-none before:absolute before:inset-0 before:-z-10 before:bg-black/12 before:backdrop-blur-sm before:[mask-image:linear-gradient(to_right,transparent,black_25%,black_75%,transparent)]"
    >
     {sub}
    </motion.p>
   </div>

   <div className="absolute inset-x-0 top-0 h-px bg-white/12" />
   <div className="absolute inset-x-0 bottom-0 h-px bg-white/15" />
  </section>
 )
}
