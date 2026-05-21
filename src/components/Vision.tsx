import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import type { Translations } from '../i18n/translations'

const stepColors = [
  { text: 'text-blue-600 dark:text-blue-400', border: 'border-blue-500/50' },
  { text: 'text-cyan-600 dark:text-cyan-400', border: 'border-cyan-500/50' },
  { text: 'text-indigo-600 dark:text-indigo-400', border: 'border-indigo-500/50' },
  { text: 'text-violet-600 dark:text-violet-400', border: 'border-violet-500/50' },
]
const stepNums = ['01', '02', '03', '04']

interface Props { tr: Translations }

export default function Vision({ tr }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start center', 'end center'] })
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section id="vision" className="py-28 bg-white dark:bg-gray-950 relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-40 dark:opacity-15" />

      <div ref={ref} className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="text-center mb-20"
        >
          <span className="text-xs font-semibold tracking-[0.25em] uppercase text-blue-600 dark:text-blue-400 mb-4 block">
            {tr.vision.eyebrow}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
            {tr.vision.h2a}
            <span className="animated-gradient">{tr.vision.h2b}</span>
          </h2>
          <p className="mt-5 text-gray-500 dark:text-gray-400 max-w-xl mx-auto text-base">{tr.vision.sub}</p>
        </motion.div>

        {/* Steps */}
        <div className="relative max-w-3xl mx-auto mb-20">
          <div className="absolute left-7 md:left-1/2 top-0 bottom-0 w-px bg-gray-200 dark:bg-gray-800 -translate-x-1/2 overflow-hidden">
            <motion.div
              className="w-full bg-gradient-to-b from-blue-500 to-violet-500 origin-top"
              style={{ scaleY: lineScale, height: '100%' }}
            />
          </div>

          <div className="flex flex-col gap-14">
            {tr.vision.steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.15 * i, ease: [0.16, 1, 0.3, 1] }}
                className={`flex items-start gap-6 ${
                  i % 2 === 0
                    ? 'md:pr-[calc(50%+2rem)] md:text-right md:flex-row-reverse'
                    : 'md:pl-[calc(50%+2rem)]'
                }`}
              >
                <div
                  className={`flex-shrink-0 w-14 h-14 rounded-2xl border-2 ${stepColors[i].border} bg-white dark:bg-gray-950 flex items-center justify-center z-10`}
                >
                  <span className={`text-lg font-bold ${stepColors[i].text}`}>{stepNums[i]}</span>
                </div>
                <div className="flex-1 pt-2">
                  <h3 className={`text-xl font-bold mb-2 ${stepColors[i].text}`}>{step.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-base leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-5"
        >
          {tr.vision.stats.map((s) => (
            <div
              key={s.label}
              className="p-6 rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-center"
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
