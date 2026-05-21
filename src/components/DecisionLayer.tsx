import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ClipboardList, Bell, Zap } from 'lucide-react'
import VideoSection from './VideoSection'
import FlowDiagram from './FlowDiagram'
import type { Translations } from '../i18n/translations'

interface Props {
  tr: Translations
}

const featureIcons = [ClipboardList, Bell, Zap]

export default function DecisionLayer({ tr }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <VideoSection id="step-03" tint="rgba(4,14,18,0.85)">
      <div
        ref={ref}
        className="max-w-6xl mx-auto px-5 sm:px-8 md:px-16 lg:px-28 py-12 md:py-20 lg:py-24"
      >
        <div className="grid lg:grid-cols-2 gap-6 md:gap-12 lg:gap-16 items-center">
          {/* Left: text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2.5 md:gap-3 mb-3 md:mb-6 flex-wrap">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-600/15 border border-emerald-500/30 text-emerald-300 text-[10px] sm:text-xs font-bold tracking-wider">
                {tr.steps.s3.badge}
              </div>
              <span className="text-[10px] sm:text-xs text-emerald-200/60 font-medium tracking-wide">{tr.steps.s3.role}</span>
            </div>

            <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-white leading-[1.25] md:leading-tight mb-2 md:mb-4 break-keep">
              {tr.decision.headline}
              {' '}
              <br className="hidden md:block" />
              <span className="animated-gradient">{tr.decision.headlineSub}</span>
            </h2>
            <p className="text-gray-400 leading-relaxed mb-4 md:mb-8 text-xs sm:text-sm md:text-base break-keep">
              {tr.decision.desc}
            </p>

            <div className="flex flex-col gap-4 md:gap-5">
              {tr.decision.features.map((f, i) => {
                const Icon = featureIcons[i]
                return (
                  <motion.div
                    key={f.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.15 + i * 0.1 }}
                    className="flex gap-2.5 md:gap-4"
                  >
                    <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-emerald-600/15 border border-emerald-500/25 flex items-center justify-center mt-0.5">
                      <Icon size={14} className="text-emerald-300 md:hidden" />
                      <Icon size={18} className="text-emerald-300 hidden md:block" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-white font-semibold text-xs sm:text-sm md:text-base mb-0.5 md:mb-1">{f.title}</div>
                      <div className="text-gray-400 text-[11px] sm:text-xs md:text-sm leading-snug md:leading-relaxed break-keep">{f.desc}</div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* Right: FlowDiagram with decision-focused output labels */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full"
          >
            <FlowDiagram outputLabels={tr.decision.outputs} />
          </motion.div>
        </div>
      </div>
    </VideoSection>
  )
}
