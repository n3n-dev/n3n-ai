import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import VideoSection from './VideoSection'
import type { Translations } from '../i18n/translations'

interface Props {
  tr: Translations
}

export default function ProblemSection({ tr }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <VideoSection id="problem" tint="rgba(3,6,15,0.92)">
      <div
        ref={ref}
        className="max-w-3xl mx-auto px-5 sm:px-8 md:px-16 pt-20 md:pt-28 pb-16 md:pb-24 text-center"
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 mb-6 md:mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80" />
          <span className="text-[11px] md:text-xs font-semibold tracking-[0.22em] uppercase text-amber-300/90">
            {tr.problem.eyebrow}
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, delay: 0.08 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.2] tracking-tight mb-10 md:mb-14 whitespace-pre-line break-keep"
        >
          {tr.problem.h2}
        </motion.h2>

        {/* Pain lines */}
        <motion.ul
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="flex flex-col gap-4 md:gap-5 text-left max-w-2xl mx-auto"
        >
          {tr.problem.lines.map((line, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -16 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.35 + i * 0.12 }}
              className="relative pl-5 md:pl-6 text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed break-keep"
            >
              <span className="absolute left-0 top-[0.55em] w-2.5 h-px bg-amber-400/70" />
              {line}
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </VideoSection>
  )
}
