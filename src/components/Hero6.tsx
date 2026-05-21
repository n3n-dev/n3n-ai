import { motion } from 'framer-motion'
import type { Translations } from '../i18n/translations'

interface Props {
  tr: Translations
  hideCta?: boolean
  badgeOverride?: string
  h1Override?: string
  subheadOverride?: string
}

export default function Hero6({ tr, h1Override, subheadOverride }: Props) {
  const h1 = h1Override ?? tr.hero.h1

  return (
    <section className="font-bricolage relative min-h-screen flex overflow-hidden">
      {/* Video background */}
      <div className="absolute inset-0 z-0">
        <video autoPlay muted loop playsInline className="w-full h-full object-cover">
          <source src={`${import.meta.env.BASE_URL}hero-video-4.mp4`} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[#030812]/38" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#030812]/25 via-transparent to-[#030812]/75" />
      </div>

      {/* Right subhead anchor */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.1 }}
        className="absolute bottom-20 md:bottom-24 right-6 md:right-12 z-10 max-w-xs md:max-w-sm text-right"
      >
        <p className="text-sm md:text-base text-gray-300/90 leading-relaxed whitespace-pre-line break-keep">
          {subheadOverride ?? tr.hero.subhead}
        </p>
      </motion.div>

      {/* Massive editorial H1 */}
      <div className="relative z-10 w-full flex items-center justify-center">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="w-full px-6 text-center text-white font-bold leading-[0.96] tracking-tight break-keep whitespace-pre-line"
          style={{ fontSize: 'clamp(44px, 10vw, 168px)' }}
        >
          {h1}
        </motion.h1>
      </div>

    </section>
  )
}
