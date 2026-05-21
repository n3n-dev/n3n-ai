import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Car, Plane, Ship, Building2, Satellite, Radio } from 'lucide-react'
import type { Translations } from '../i18n/translations'

interface Props { tr: Translations }

/* 6 nodes arranged in a circle around center (50,50), radius ~38% */
const RADIUS = 38
const nodeIcons = [Satellite, Plane, Ship, Building2, Radio, Car]
const nodes = nodeIcons.map((Icon, i) => {
  const angle = (i * 60 - 90) * (Math.PI / 180) // start from top (-90°)
  return {
    Icon,
    x: 50 + RADIUS * Math.cos(angle),
    y: 50 + RADIUS * Math.sin(angle),
    delay: 0.2 + i * 0.1,
  }
})

/* SVG lines from each node to center hub (50%, 50%) */
const lines = nodes.map((n) => ({ x1: n.x, y1: n.y, x2: 50, y2: 50, delay: n.delay }))

export default function ConnectingThings({ tr }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="relative py-28 bg-[#060E1A] overflow-hidden">
      {/* Circuit grid background */}
      <div
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,102,255,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(0,102,255,0.25) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div ref={ref} className="relative max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-5">
            {tr.connecting.h2}
          </h2>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            {tr.connecting.sub}
          </p>
        </motion.div>

        {/* Network diagram */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto max-w-3xl aspect-square md:aspect-[4/3]"
        >
          {/* Connection lines SVG */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {lines.map((l, i) => (
              <motion.line
                key={i}
                x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
                stroke="rgba(59,130,246,0.3)"
                strokeWidth="0.3"
                strokeDasharray="2 2"
                initial={{ pathLength: 0 }}
                animate={inView ? { pathLength: 1 } : {}}
                transition={{ duration: 1.2, delay: l.delay, ease: 'easeOut' }}
              />
            ))}
          </svg>

          {/* Animated pulse rings on lines */}
          {lines.map((l, i) => (
            <motion.div
              key={`pulse-${i}`}
              className="absolute w-2 h-2 rounded-full bg-blue-400/60"
              style={{ left: `${l.x1}%`, top: `${l.y1}%` }}
              animate={inView ? {
                left: [`${l.x1}%`, `${l.x2}%`],
                top: [`${l.y1}%`, `${l.y2}%`],
                opacity: [0, 1, 0],
              } : {}}
              transition={{
                duration: 2.5,
                delay: l.delay + 1,
                repeat: Infinity,
                repeatDelay: 3,
                ease: 'easeInOut',
              }}
            />
          ))}

          {/* Center hub */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <motion.div
              initial={{ scale: 0 }}
              animate={inView ? { scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.4, type: 'spring' }}
              className="relative"
            >
              {/* Pulse rings */}
              <div className="absolute -inset-6 rounded-full border border-blue-500/20 animate-ping" style={{ animationDuration: '3s' }} />
              <div className="absolute -inset-10 rounded-full border border-blue-500/10 animate-ping" style={{ animationDuration: '4s', animationDelay: '0.5s' }} />

              <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-2xl shadow-blue-600/40">
                <div className="text-center">
                  <span className="text-white font-bold text-lg md:text-xl block leading-none">N3N</span>
                  <span className="text-blue-100 text-[9px] md:text-[10px] tracking-wider block mt-1">OI CORE</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Device nodes */}
          {nodes.map(({ Icon, x, y, delay }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: delay + 0.3, type: 'spring' }}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-gray-800/80 border border-gray-700/60 backdrop-blur-sm flex flex-col items-center justify-center gap-1 hover:border-blue-500/50 hover:bg-gray-800 transition-colors">
                <Icon size={20} className="text-blue-400" />
                <span className="text-[9px] md:text-[10px] text-gray-400 font-medium">
                  {tr.connecting.nodes[i]}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Phase cards */}
        <div className="grid md:grid-cols-2 gap-6 mt-20">
          {tr.connecting.phases.map((phase, i) => (
            <motion.div
              key={phase.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.8 + i * 0.15 }}
              className="flex gap-5 p-6 rounded-2xl border border-gray-800/60 bg-gray-900/40 backdrop-blur-sm"
            >
              <div className="flex-shrink-0 px-3 py-2 rounded-xl bg-blue-600/15 border border-blue-500/30 flex items-center justify-center whitespace-nowrap">
                <span className="text-blue-400 font-bold text-sm">{phase.title}</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">{phase.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
