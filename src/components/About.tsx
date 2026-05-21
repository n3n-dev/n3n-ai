import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Cloud, Video, Waypoints, Monitor } from 'lucide-react'
import type { Translations } from '../i18n/translations'
import FlowDiagram from './FlowDiagram'

interface Props {
  tr: Translations
  eyebrowOverride?: string
  h2aOverride?: string
  h2bOverride?: string
  bodyOverride?: string
  chipsOverride?: string[]
  compact?: boolean
  diagram?: 'orbital' | 'flow'
}

/* 4 orbital nodes positioned on two concentric rings */
const orbitNodes = [
  { Icon: Cloud,     label: 'MULTI-CLOUD',   angle: -90,  ring: 'outer' as const },
  { Icon: Video,     label: 'VMS INPUT',      angle: 180,  ring: 'outer' as const },
  { Icon: Waypoints, label: 'IOT SENSORS',    angle: 0,    ring: 'outer' as const },
  { Icon: Monitor,   label: 'EDGE CLIENTS',   angle: 90,   ring: 'outer' as const },
]

/* Radius in % of container (half-width) */
const RING = { inner: 30, outer: 44 }

export default function About({ tr, eyebrowOverride, h2aOverride, h2bOverride, bodyOverride, chipsOverride, compact, diagram = 'orbital' }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="py-16 md:py-24 lg:py-28 bg-white dark:bg-gray-950 relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-40 dark:opacity-20" />

      <div ref={ref} className="relative max-w-7xl mx-auto px-5 sm:px-8 md:px-12 lg:px-24">
        <div className={`grid ${diagram === 'flow' ? 'lg:grid-cols-[1fr_1.2fr]' : compact ? 'lg:grid-cols-[3fr_2fr]' : 'lg:grid-cols-2'} gap-10 md:gap-14 lg:gap-16 items-center`}>
          {/* Left — text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] sm:tracking-[0.25em] uppercase text-blue-600 dark:text-blue-400 mb-3 sm:mb-4 block">
              {eyebrowOverride ?? tr.about.eyebrow}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-[1.25] md:leading-tight mb-4 md:mb-6 whitespace-pre-line break-keep">
              {h2aOverride ?? tr.about.h2a}
              {(h2bOverride ?? tr.about.h2b) && (
                <span className="animated-gradient">{h2bOverride ?? tr.about.h2b}</span>
              )}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base md:text-lg leading-relaxed mb-6 md:mb-8 whitespace-pre-line break-keep">
              {bodyOverride ?? tr.about.body}
            </p>

            {/* Feature chips — 2-col grid on mobile for better density */}
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
              {(chipsOverride ?? tr.about.cards.map((c) => c.title)).map((label) => (
                <span
                  key={label}
                  className="px-2.5 sm:px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-medium border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-900 text-center sm:text-left sm:whitespace-nowrap sm:shrink-0"
                >
                  {label}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right — diagram (orbital or flow) */}
          {diagram === 'flow' ? (
            <div className="w-full flex items-center justify-center">
              <FlowDiagram />
            </div>
          ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className={`relative aspect-square ${compact ? 'max-w-[220px] sm:max-w-[260px] md:max-w-[300px]' : 'max-w-[280px] sm:max-w-sm md:max-w-md'} mx-auto w-full px-6`}
          >
            {/* Orbit rings — SVG dashed circles */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
              {/* Outer ring */}
              <motion.circle
                cx="50" cy="50" r={RING.outer}
                fill="none"
                stroke="rgba(59,130,246,0.15)"
                strokeWidth="0.3"
                strokeDasharray="1.5 1.5"
                initial={{ pathLength: 0, rotate: 0 }}
                animate={inView ? { pathLength: 1 } : {}}
                transition={{ duration: 2, delay: 0.3, ease: 'easeOut' }}
              />
              {/* Inner ring */}
              <motion.circle
                cx="50" cy="50" r={RING.inner}
                fill="none"
                stroke="rgba(59,130,246,0.2)"
                strokeWidth="0.3"
                strokeDasharray="1.2 1.2"
                initial={{ pathLength: 0 }}
                animate={inView ? { pathLength: 1 } : {}}
                transition={{ duration: 1.8, delay: 0.5, ease: 'easeOut' }}
              />
            </svg>

            {/* Center glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(circle at 50% 50%, rgba(59,130,246,0.12) 0%, transparent 40%)',
              }}
            />

            {/* Center hub — N3N CORE OS */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <motion.div
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.4, type: 'spring' }}
              >
                <div className="w-24 h-24 md:w-28 md:h-28 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-2xl shadow-blue-500/30">
                  <div className="text-center">
                    <span className="text-white font-bold text-xl md:text-2xl block leading-none">N3N</span>
                    <span className="text-blue-100 text-[10px] md:text-xs tracking-wider block mt-1.5">CORE OS</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Orbital nodes */}
            {orbitNodes.map(({ Icon, label, angle, ring }, i) => {
              const r = RING[ring]
              const rad = (angle * Math.PI) / 180
              const x = 50 + r * Math.cos(rad)
              const y = 50 + r * Math.sin(rad)

              return (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 + i * 0.12, type: 'spring' }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2"
                  style={{ left: `${x}%`, top: `${y}%` }}
                >
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gray-100 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700/60 backdrop-blur-sm flex items-center justify-center hover:border-blue-400/50 transition-colors">
                    <Icon size={22} className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="text-[10px] md:text-xs font-semibold tracking-[0.1em] text-gray-500 dark:text-gray-400 whitespace-nowrap">
                    {label}
                  </span>
                </motion.div>
              )
            })}

            {/* Slow rotation animation on outer ring indicator */}
            <motion.div
              className="absolute w-1.5 h-1.5 rounded-full bg-blue-400/60"
              style={{ left: '50%', top: `${50 - RING.outer}%` }}
              animate={inView ? {
                rotate: [0, 360],
              } : {}}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'linear',
              }}
              // orbit around center
              // Use transform-origin trick: position at ring edge, rotate around center
            />
          </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}
