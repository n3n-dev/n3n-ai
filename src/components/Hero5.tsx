import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import type { Translations, Lang } from '../i18n/translations'

interface Props {
  tr: Translations
  lang?: Lang
  hideCta?: boolean
  badgeOverride?: string
  h1Override?: string
  subheadOverride?: string
}

export default function Hero5({
  tr,
  hideCta,
  badgeOverride,
  h1Override,
  subheadOverride,
}: Props) {
  const kpis = [
    { label: 'Connected cameras', value: '500+' },
    { label: 'Detection latency', value: '40ms' },
    { label: 'Model accuracy', value: '99.7%' },
  ]
  const dailyLabel = 'Processed today'
  const dailyValue = '10B+'
  const throughputLabel = 'Throughput · last 12h'
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Video background */}
      <div className="absolute inset-0 z-0">
        <video autoPlay muted loop playsInline className="w-full h-full object-cover">
          <source src={`${import.meta.env.BASE_URL}hero-video-4.mp4`} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[#030812]/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#030812]/75 via-[#030812]/35 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#030812]/85" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-28 md:py-32 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
        {/* Left: copy */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 text-[11px] font-semibold tracking-[0.15em] uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            {badgeOverride ?? tr.hero.badge}
          </div>
          <h1 className="text-[32px] sm:text-[42px] md:text-5xl lg:text-[64px] font-bold text-white leading-[1.08] tracking-tight mb-6 whitespace-pre-line break-keep">
            {h1Override ?? tr.hero.h1}
          </h1>
          <p className="text-base md:text-lg text-gray-300/90 leading-relaxed whitespace-pre-line break-keep mb-8 max-w-xl">
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

        {/* Right: glass dashboard mockup */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <div className="rounded-2xl border border-white/15 bg-white/[0.04] backdrop-blur-xl p-5 shadow-2xl shadow-black/40">
            {/* Mock header */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
              </div>
              <div className="flex items-center gap-2 text-[10px] text-gray-400 tracking-[0.2em] uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Live
              </div>
            </div>

            {/* KPI row */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              {kpis.map((k) => (
                <div key={k.label} className="rounded-lg bg-white/[0.03] border border-white/5 p-3">
                  <div className="text-[9px] text-gray-400 tracking-[0.18em] uppercase mb-1">
                    {k.label}
                  </div>
                  <div className="text-base md:text-lg font-bold text-white tabular-nums">
                    {k.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Bar chart */}
            <div className="rounded-lg bg-white/[0.03] border border-white/5 p-4 mb-3">
              <div className="flex items-end gap-1.5 h-24">
                {[30, 55, 42, 68, 48, 72, 60, 88, 76, 92, 82, 95].map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ duration: 0.8, delay: 0.5 + i * 0.05, ease: 'easeOut' }}
                    className="flex-1 rounded-sm bg-gradient-to-t from-blue-500/70 to-blue-400/30"
                  />
                ))}
              </div>
              <div className="mt-2 text-[9px] text-gray-500 tracking-[0.15em] uppercase">
                {throughputLabel}
              </div>
            </div>

            {/* Detection tags */}
            <div className="flex flex-wrap gap-2">
              {['Vehicle · 98%', 'Person · 96%', 'Anomaly · 12', 'Zone A · OK'].map((b) => (
                <span
                  key={b}
                  className="text-[10px] px-2 py-1 rounded border border-blue-400/30 bg-blue-500/10 text-blue-200 tabular-nums"
                >
                  {b}
                </span>
              ))}
            </div>
          </div>

          {/* Floating accent card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="absolute -right-6 -bottom-6 rounded-xl border border-white/15 bg-[#0b1220]/85 backdrop-blur-md px-4 py-3 shadow-2xl"
          >
            <div className="text-[10px] text-gray-400 tracking-[0.18em] uppercase">
              {dailyLabel}
            </div>
            <div className="text-xl font-bold text-white tabular-nums">
              {dailyValue} <span className="text-xs text-blue-300 font-medium">frames</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
