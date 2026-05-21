import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import type { Translations } from '../i18n/translations'

interface Props {
  tr: Translations
  hideCta?: boolean
  badgeOverride?: string
  h1Override?: string
  subheadOverride?: string
}

export default function Hero4({ tr, badgeOverride, h1Override, subheadOverride }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '22%'])
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])

  const h1 = h1Override ?? tr.hero.h1
  const lines = h1.split('\n')

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover scale-105"
        >
          <source src={`${import.meta.env.BASE_URL}hero-video-4.mp4`} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[#030812]/72" />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(3,8,18,0.55) 0%, rgba(3,8,18,0.25) 55%, rgba(3,8,18,0.9) 100%)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#030812]/55 via-transparent to-[#030812]" />
      </div>

      <motion.div
        style={{ y: contentY, opacity }}
        className="relative z-10 max-w-6xl mx-auto px-5 sm:px-6 text-center pt-20 sm:pt-24 pb-20 md:pb-28"
      >
        {/* Minimal eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="inline-flex items-center gap-3 mb-6 md:mb-8 text-[10px] sm:text-xs font-semibold tracking-[0.35em] uppercase text-blue-300/90"
        >
          <span className="block w-8 h-px bg-blue-400/60" />
          {badgeOverride ?? tr.hero.badge}
          <span className="block w-8 h-px bg-blue-400/60" />
        </motion.div>

        {/* H1 with staggered word reveal */}
        <h1 className="text-[34px] sm:text-[46px] md:text-6xl lg:text-7xl xl:text-[88px] font-bold text-white leading-[1.08] tracking-tight mb-6 md:mb-8 whitespace-pre-line break-keep">
          {lines.map((line, li) => (
            <span key={li} className="block">
              {line.split(' ').map((w, wi) => (
                <motion.span
                  key={`${li}-${wi}`}
                  initial={{ opacity: 0, y: 28, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{
                    duration: 0.9,
                    delay: 0.25 + li * 0.12 + wi * 0.05,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="inline-block mr-[0.22em] last:mr-0"
                >
                  {w}
                </motion.span>
              ))}
            </span>
          ))}
        </h1>

        {/* Subhead */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300/90 max-w-3xl mx-auto leading-relaxed whitespace-pre-line break-keep px-2"
        >
          {subheadOverride ?? tr.hero.subhead}
        </motion.p>

        {/* Stats inline — minimal, no cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-12 md:mt-16 flex flex-row flex-wrap items-center justify-center gap-x-8 sm:gap-x-12 md:gap-x-16 gap-y-5"
        >
          {tr.vision.stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white tabular-nums whitespace-nowrap">
                {s.value}
              </div>
              <div className="mt-1 text-[10px] sm:text-xs text-blue-300/70 tracking-[0.2em] uppercase whitespace-nowrap">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Bottom-right scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-8 right-8 z-10 hidden md:flex flex-col items-end gap-2 text-[10px] text-gray-400/70 tracking-[0.3em] uppercase"
      >
        <span>{tr.hero.scroll}</span>
        <motion.div
          animate={{ scaleY: [0.2, 1, 0.2] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-10 origin-top bg-gray-400/50"
        />
      </motion.div>
    </section>
  )
}
