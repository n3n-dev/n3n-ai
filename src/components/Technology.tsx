import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { Brain, Network, Server, GitBranch, Globe, Lock } from 'lucide-react'
import type { Translations } from '../i18n/translations'

const icons = [Brain, Network, Server, GitBranch, Globe, Lock]

const stepColors = [
  { text: 'text-blue-600 dark:text-blue-400', border: 'border-blue-500/50' },
  { text: 'text-cyan-600 dark:text-cyan-400', border: 'border-cyan-500/50' },
  { text: 'text-indigo-600 dark:text-indigo-400', border: 'border-indigo-500/50' },
  { text: 'text-violet-600 dark:text-violet-400', border: 'border-violet-500/50' },
]

interface Props { tr: Translations }

export default function Technology({ tr }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const lineWidth = useTransform(scrollYProgress, [0.1, 0.7], ['0%', '100%'])

  return (
    <section id="technology" className="py-28 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-60 dark:opacity-20" />

      <div ref={ref} className="relative max-w-7xl mx-auto px-8 md:px-16 lg:px-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="text-center mb-20"
        >
          <span className="text-xs font-semibold tracking-[0.25em] uppercase text-blue-600 dark:text-blue-400 mb-4 block">
            {tr.tech.eyebrow}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
            {tr.tech.h2a}
            <span className="animated-gradient">{tr.tech.h2b}</span>
          </h2>
          <p className="mt-5 text-gray-500 dark:text-gray-400 max-w-xl mx-auto text-base leading-relaxed">{tr.tech.sub}</p>
        </motion.div>

        {/* Tech cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
          {tr.tech.cards.map((item, i) => {
            const Icon = icons[i]
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.08 * i, ease: [0.16, 1, 0.3, 1] }}
                className="group p-6 rounded-2xl border border-gray-200 dark:border-gray-700/50 bg-white dark:bg-gray-800/50 hover:border-blue-200 dark:hover:border-blue-800/60 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center mb-5 shadow-md shadow-blue-500/25 group-hover:scale-110 transition-transform">
                  <Icon size={22} className="text-white" />
                </div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">{item.label}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            )
          })}
        </div>

        {/* Architecture pipeline */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="p-8 md:p-12 rounded-3xl border border-gray-200 dark:border-gray-700/50 bg-white dark:bg-gray-800/40 mb-20"
        >
          <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center mb-10">{tr.tech.arch}</h3>

          <div className="flex flex-col md:flex-row items-center justify-between gap-3 max-w-4xl mx-auto">
            {tr.tech.nodes.map((node, i, arr) => (
              <div key={node.label} className="flex items-center gap-3">
                <div
                  className={`flex flex-col items-center justify-center w-24 py-3 px-2 rounded-xl text-center ${
                    i === 2
                      ? 'bg-blue-600 shadow-lg shadow-blue-600/25'
                      : 'bg-gray-100 dark:bg-gray-700/60 border border-gray-200 dark:border-gray-600/50'
                  }`}
                >
                  <span className={`text-[11px] font-bold leading-tight ${i === 2 ? 'text-white' : 'text-gray-700 dark:text-gray-200'}`}>
                    {node.label}
                  </span>
                  <span className={`text-[9px] mt-1 ${i === 2 ? 'text-blue-100' : 'text-gray-400'}`}>
                    {node.sub}
                  </span>
                </div>
                {i < arr.length - 1 && (
                  <div className="hidden md:block w-8 h-px bg-gray-200 dark:bg-gray-700 relative overflow-hidden">
                    <motion.div
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-blue-400"
                      style={{ width: lineWidth }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* How it works — 4 steps (merged from Vision) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-12">
            {tr.vision.h2a}
            <span className="animated-gradient">{tr.vision.h2b}</span>
          </h3>

          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {tr.vision.steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 + i * 0.1 }}
                className="text-center"
              >
                <div className={`w-12 h-12 rounded-2xl border-2 ${stepColors[i].border} mx-auto mb-4 flex items-center justify-center`}>
                  <span className={`text-lg font-bold ${stepColors[i].text}`}>{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h4 className={`text-base font-bold mb-2 ${stepColors[i].text}`}>{step.title}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-5"
        >
          {tr.vision.stats.map((s) => (
            <div
              key={s.label}
              className="p-6 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900/60 text-center"
            >
              <div className="text-3xl font-bold animated-gradient-slow mb-1">{s.value}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
