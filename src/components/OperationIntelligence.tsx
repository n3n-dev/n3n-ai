import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import VideoSection from './VideoSection'
import type { Translations } from '../i18n/translations'

interface Props {
  tr: Translations
  preTextOverride?: string
  highlightOverride?: string
  subOverride?: string
  statsOverride?: { value: string; label: string }[]
  eyebrowOverride?: string
  h2Override?: string
  hideSub?: boolean
}

export default function OperationIntelligence({
  tr,
  preTextOverride,
  highlightOverride,
  subOverride,
  statsOverride,
  eyebrowOverride,
  h2Override,
  hideSub,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <VideoSection id="operation" tint="rgba(4,8,20,0.85)">
      <div ref={ref} className="max-w-4xl mx-auto px-5 sm:px-8 md:px-16 lg:px-24 pt-16 md:pt-20 lg:pt-24 pb-10 md:pb-14 text-center">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="mb-10 md:mb-14 lg:mb-16"
        >
          {eyebrowOverride && (
            <div className="inline-flex items-center gap-2 mb-4 md:mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400/80" />
              <span className="text-[11px] md:text-xs font-semibold tracking-[0.22em] uppercase text-blue-200/90">
                {eyebrowOverride}
              </span>
            </div>
          )}
          {h2Override ? (
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-[1.25] md:leading-tight mb-4 md:mb-5 break-keep whitespace-pre-line">
              {h2Override}
            </h2>
          ) : (
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-[1.25] md:leading-tight mb-4 md:mb-5 break-keep">
              {preTextOverride ?? tr.opint.preText}
              <br />
              <span className="animated-gradient">{highlightOverride ?? tr.opint.highlight}</span>
            </h2>
          )}
          {!hideSub && (
            <p className="text-gray-400 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto whitespace-pre-line break-keep">
              {subOverride ?? tr.opint.sub}
            </p>
          )}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-row flex-wrap items-start justify-center gap-x-4 gap-y-6 sm:gap-x-8 md:gap-x-10"
        >
          {(statsOverride ?? tr.opint.stats).map((s) => (
            <div key={s.label} className="text-center min-w-[70px] sm:min-w-0">
              <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold animated-gradient-slow whitespace-nowrap">{s.value}</div>
              <div className="text-[11px] sm:text-xs md:text-sm text-gray-500 mt-1.5 md:mt-2 whitespace-nowrap">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </VideoSection>
  )
}
