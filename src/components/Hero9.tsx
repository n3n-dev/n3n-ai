import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import type { Translations } from '../i18n/translations'

interface Props {
  tr: Translations
  hideCta?: boolean
  badgeOverride?: string
  h1Override?: string
  subheadOverride?: string
}

export default function Hero9({ tr, hideCta, h1Override, subheadOverride }: Props) {
  return (
    <section className="font-bricolage relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video background */}
      <div className="absolute inset-0 z-0">
        <video autoPlay muted loop playsInline className="w-full h-full object-cover">
          <source src={`${import.meta.env.BASE_URL}hero-video-4.mp4`} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[#030812]/48" />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 65% 55% at 50% 50%, rgba(3,8,18,0.45) 0%, rgba(3,8,18,0.2) 65%, rgba(3,8,18,0.78) 100%)',
          }}
        />
        {/* Faint grid */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(0,102,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(0,102,255,0.6) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
      </div>

      {/* HUD top-left — detection box */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="absolute top-24 left-6 md:left-10 z-10 flex items-start gap-3"
      >
        <div className="relative w-16 h-16 md:w-20 md:h-20 border border-blue-400/60 overflow-hidden">
          <span className="absolute -top-px -left-px w-3 h-3 border-t-2 border-l-2 border-blue-400" />
          <span className="absolute -top-px -right-px w-3 h-3 border-t-2 border-r-2 border-blue-400" />
          <span className="absolute -bottom-px -left-px w-3 h-3 border-b-2 border-l-2 border-blue-400" />
          <span className="absolute -bottom-px -right-px w-3 h-3 border-b-2 border-r-2 border-blue-400" />
          <motion.span
            animate={{ top: ['8%', '78%', '8%'] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute left-0 right-0 h-px bg-blue-400/80"
          />
        </div>
        <div className="flex flex-col gap-0.5 text-[10px] tracking-[0.18em] uppercase text-blue-300/90 font-mono">
          <span>Detect · 23ms</span>
          <span className="text-gray-400">x: 0.42 · y: 0.68</span>
        </div>
      </motion.div>

      {/* HUD top-right — LIVE pill */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="absolute top-24 right-6 md:right-10 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-400/40 bg-blue-500/10 text-blue-200 text-[10px] md:text-xs font-semibold tracking-[0.25em] uppercase"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
        Live
      </motion.div>

      {/* Center content — no badge */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-10 max-w-6xl mx-auto px-6 text-center"
      >
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-[40px] sm:text-[56px] md:text-7xl lg:text-8xl xl:text-[120px] font-bold text-white leading-[0.92] tracking-tight mb-3 md:mb-4 whitespace-pre-line break-keep drop-shadow-[0_2px_24px_rgba(0,0,0,0.55)]"
        >
          {h1Override ?? tr.hero.h1}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-sm md:text-base lg:text-lg text-gray-300/90 max-w-md md:max-w-xl lg:max-w-none mx-auto leading-relaxed break-keep px-2"
        >
          {subheadOverride ?? tr.hero.subhead}
        </motion.p>

        {!hideCta && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.95 }}
            className="mt-8"
          >
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 px-7 py-3 border border-blue-400/60 bg-blue-500/10 hover:bg-blue-500/20 text-blue-100 font-semibold rounded-md transition-all tracking-wide"
            >
              {tr.hero.cta1}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        )}
      </motion.div>

      {/* HUD bottom-left — fps counter */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.7 }}
        className="absolute bottom-8 left-6 md:left-10 z-10 font-mono"
      >
        <div className="text-[10px] tracking-[0.2em] uppercase text-gray-400 mb-1">
          Frames / day
        </div>
        <motion.div
          animate={{ opacity: [0.75, 1, 0.75] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          className="text-2xl md:text-3xl font-bold text-white tabular-nums"
        >
          1,248,392
        </motion.div>
      </motion.div>

      {/* HUD bottom-right — accuracy + bars */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.75 }}
        className="absolute bottom-8 right-6 md:right-10 z-10 flex items-end gap-3"
      >
        <div className="flex items-end gap-0.5 h-10">
          {[30, 55, 42, 72, 58, 88, 76, 94].map((h, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              transition={{ duration: 0.8, delay: 1 + i * 0.06 }}
              className="w-1 bg-gradient-to-t from-blue-500/80 to-blue-300/40"
            />
          ))}
        </div>
        <div className="text-right font-mono">
          <div className="text-[10px] tracking-[0.2em] uppercase text-gray-400">Accuracy</div>
          <div className="text-xl md:text-2xl font-bold text-white tabular-nums">99.7%</div>
        </div>
      </motion.div>
    </section>
  )
}
