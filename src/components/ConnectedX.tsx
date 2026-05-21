import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Camera, Brain, Wifi } from 'lucide-react'
import type { Lang } from '../i18n/translations'

interface Props {
  lang: Lang
  eyebrowOverride?: string
  subheadingOverride?: string
  descriptionOverride?: string
  closingEyebrow?: string
  closingStatement?: string
  /** Force light-theme palette regardless of the app-wide dark class. */
  lightBg?: boolean
  /** Hide all heading/body text — leaves only the video backdrop band. */
  hideText?: boolean
}

const domains = {
  ko: ['드론', '선박', 'UAM', '로지스틱스'],
  en: ['Drone', 'Ship', 'UAM', 'Logistics'],
}

const steps = {
  ko: [
    { icon: Camera, label: '데이터 수집', desc: '탑재된 카메라의 영상 데이터를 AI 학습을 위해 수집합니다.' },
    { icon: Brain, label: '모델 학습', desc: '수집된 데이터를 정교하게 선별하고 AI 모델을 반복적으로 개선합니다.' },
    { icon: Wifi, label: '배포', desc: '업데이트된 AI 모델을 최적의 네트워크를 통해 각 차량으로 배포합니다.' },
  ],
  en: [
    { icon: Camera, label: 'Data Collection', desc: 'Collect video data from onboard cameras for AI training.' },
    { icon: Brain, label: 'Model Training', desc: 'Selectively curate data and iteratively improve AI models.' },
    { icon: Wifi, label: 'Deployment', desc: 'Deploy updated AI models to each vehicle via optimal networks.' },
  ],
}

export default function ConnectedX({ lang, eyebrowOverride, subheadingOverride, descriptionOverride, closingEyebrow, closingStatement, lightBg, hideText }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const domainItems = domains[lang]
  const stepItems = steps[lang]

  return (
    <section
      className={`relative overflow-hidden ${
        hideText ? 'py-16 md:py-20' : 'py-12 md:py-16 lg:py-20'
      } ${
        lightBg ? 'bg-white' : 'bg-gray-50 dark:bg-[#0a0f1a]'
      }`}
    >
      {/* Video backdrop — muted autoplay loop. Placeholder uses the
          hero-video-4 asset already bundled with the project until the
          dedicated Connected X clip lands. */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover z-0 pointer-events-none"
      >
        <source
          src={`${import.meta.env.BASE_URL}hero-video-4.mp4`}
          type="video/mp4"
        />
      </video>
      {/* Readability overlay — tints the video down (lighter tint on
          lightBg mode, deeper blue for dark). */}
      <div
        className={`absolute inset-0 z-0 pointer-events-none ${
          lightBg
            ? 'bg-white/75'
            : 'bg-[#0a0f1a]/80'
        }`}
      />
      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6">
        {hideText && <div className="h-24 md:h-32" aria-hidden />}
        {!hideText && closingStatement && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto mb-14 md:mb-20"
          >
            {closingEyebrow && (
              <div className="inline-flex items-center gap-2 mb-4 md:mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/80" />
                <span className="text-[11px] md:text-xs font-semibold tracking-[0.22em] uppercase text-cyan-600 dark:text-cyan-300">
                  {closingEyebrow}
                </span>
              </div>
            )}
            <p className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white leading-snug tracking-tight whitespace-pre-line break-keep">
              {closingStatement}
            </p>
          </motion.div>
        )}
        {/* Header */}
        {!hideText && <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-6"
        >
          {(() => {
            const eyebrowText = eyebrowOverride ?? 'Future Mobility'
            return eyebrowText ? (
              <span className={`text-[11px] sm:text-xs font-semibold tracking-[0.2em] sm:tracking-[0.25em] uppercase mb-2 block ${lightBg ? 'text-gray-500' : 'text-cyan-600 dark:text-cyan-400'}`}>
                {eyebrowText}
              </span>
            ) : null
          })()}
          <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.25] md:leading-tight mb-2 break-keep ${lightBg ? 'text-gray-900' : 'text-gray-900 dark:text-white'}`}>
            Connected X
          </h2>
          {subheadingOverride && (
            <h3 className={`text-lg sm:text-xl md:text-2xl font-bold mt-2 md:mt-3 mb-3 break-keep ${lightBg ? 'text-gray-900' : 'text-gray-900 dark:text-white'}`}>
              {subheadingOverride}
            </h3>
          )}
          <p className={`text-sm sm:text-base max-w-2xl mx-auto leading-relaxed whitespace-pre-line break-keep ${lightBg ? 'text-gray-500' : 'text-gray-500 dark:text-gray-400'}`}>
            {descriptionOverride ??
              (lang === 'ko'
                ? '탑재된 카메라의 영상을 AI 학습에 활용해 모델을 지속적으로 개선합니다. 개선된 AI를 최적의 네트워크를 통해 각 차량으로 빠르게 배포해, 주행 환경에 즉시 반영합니다.'
                : 'Continuously improve AI models using onboard camera footage. Deploy enhanced AI to each vehicle via optimal networks for immediate real-world application.')}
          </p>
        </motion.div>}

        {/* Image/steps/domain container removed — the full-section video
            backdrop replaces the framed diagram. If the chips still add
            value they can be reintroduced here later. */}
      </div>
    </section>
  )
}
