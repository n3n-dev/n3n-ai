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

export default function Hero8({ tr, hideCta, badgeOverride, h1Override, subheadOverride }: Props) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Video background */}
      <div className="absolute inset-0 z-0">
        <video autoPlay muted loop playsInline className="w-full h-full object-cover">
          <source src={`${import.meta.env.BASE_URL}hero-video-4.mp4`} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[#030812]/50" />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(3,8,18,0.55) 0%, rgba(3,8,18,0.25) 60%, rgba(3,8,18,0.9) 100%)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#030812]/85" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-28 md:py-32 flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-5xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-blue-400/40 bg-blue-500/15 text-blue-200 text-xs sm:text-[13px] font-semibold tracking-[0.15em] uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            {badgeOverride ?? tr.hero.badge}
          </div>
          <h1 className="text-[30px] sm:text-[36px] md:text-[44px] lg:text-[54px] xl:text-[64px] font-bold text-white leading-[1.12] tracking-tight mb-5 whitespace-pre-line break-keep">
            {h1Override ?? tr.hero.h1}
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-gray-300/90 leading-relaxed whitespace-pre-line break-keep mb-8 max-w-2xl mx-auto">
            {subheadOverride ?? tr.hero.subhead}
          </p>
          {!hideCta && (
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 px-7 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-2xl shadow-blue-600/30 hover:shadow-blue-500/50 hover:-translate-y-0.5"
            >
              {tr.hero.cta1}
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
          )}
        </motion.div>
      </div>
    </section>
  )
}
