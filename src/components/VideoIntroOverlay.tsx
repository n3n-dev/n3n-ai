import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SkipForward, Check, X } from 'lucide-react'
import type { Lang } from '../i18n/translations'

interface Props {
  videoSrc: string
  lang?: Lang
  /** Called when overlay should dismiss (video ended OR skip clicked) */
  onComplete?: () => void
  /** localStorage key used for the "don't show today" preference */
  storageKey?: string
}

const todayYmd = () => {
  const d = new Date()
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

const readOptOutDate = (key: string): string | null => {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

const writeOptOutDate = (key: string, value: string) => {
  try {
    localStorage.setItem(key, value)
  } catch {
    /* noop */
  }
}

/**
 * Full-viewport intro video overlay.
 * - Auto-plays on mount (muted + playsInline for browser autoplay policy compliance)
 * - Dismisses on video end OR when user clicks the bottom-center "Skip" button
 * - "Don't show again today" checkbox stores the current date in localStorage.
 *   If the stored date matches today on next mount, overlay is suppressed
 *   entirely (fresh sessions within the same day skip the intro).
 * - Main page content (H1, sections) stays mounted in parallel — overlay
 *   is a fixed z-layer ON TOP, not a replacement. SEO-safe.
 */
export default function VideoIntroOverlay({
  videoSrc,
  lang = 'ko',
  onComplete,
  storageKey = 'n3n-intro-hidden-date',
}: Props) {
  const [visible, setVisible] = useState(() => readOptOutDate(storageKey) !== todayYmd())
  const [dontShowToday, setDontShowToday] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const isKo = lang === 'ko'

  // Lock body scroll while overlay is up
  useEffect(() => {
    if (!visible) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [visible])

  const dismiss = () => {
    if (dontShowToday) writeOptOutDate(storageKey, todayYmd())
    setVisible(false)
    if (videoRef.current) videoRef.current.pause()
  }

  return (
    <AnimatePresence
      onExitComplete={() => {
        onComplete?.()
      }}
    >
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] bg-black"
        >
          <video
            ref={videoRef}
            src={videoSrc}
            autoPlay
            muted
            playsInline
            onEnded={dismiss}
            className="w-full h-full object-cover scale-110 origin-top"
          />

          {/* Top-right close button */}
          <motion.button
            type="button"
            onClick={dismiss}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="absolute top-6 md:top-8 right-6 md:right-8 z-10 inline-flex items-center justify-center w-10 h-10 md:w-11 md:h-11 rounded-full border border-white/30 bg-transparent backdrop-blur-md text-white/85 hover:bg-white hover:text-black hover:border-white transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            aria-label={isKo ? '인트로 영상 닫기' : 'Close intro video'}
          >
            <X size={18} strokeWidth={2} />
          </motion.button>

          {/* Bottom gradient for button readability */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-black/85 via-black/45 to-transparent" />

          {/* Controls stack — Skip button + "Don't show today" checkbox */}
          <div className="absolute bottom-10 md:bottom-14 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3.5 md:gap-4">
            {/* Skip button */}
            <motion.button
              type="button"
              onClick={dismiss}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-[4px] border border-white/30 bg-transparent backdrop-blur-md text-white/90 hover:bg-white hover:text-black hover:border-white transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
              aria-label={isKo ? '인트로 영상 건너뛰기' : 'Skip intro video'}
            >
              <span className="font-grotesk text-xs md:text-sm font-semibold tracking-[0.2em] uppercase">
                {isKo ? '건너뛰기' : 'Skip intro'}
              </span>
              <SkipForward
                size={14}
                className="group-hover:translate-x-0.5 transition-transform"
              />
            </motion.button>

            {/* Don't show today checkbox */}
            <motion.label
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.5 }}
              className="flex items-center gap-2 cursor-pointer select-none text-white/75 hover:text-white/95 transition-colors"
            >
              <input
                type="checkbox"
                checked={dontShowToday}
                onChange={(e) => setDontShowToday(e.target.checked)}
                className="sr-only"
              />
              <span
                aria-hidden
                className={`w-4 h-4 rounded-[2px] border flex items-center justify-center transition-all ${
                  dontShowToday
                    ? 'border-white bg-white'
                    : 'border-white/50 bg-transparent hover:border-white/80'
                }`}
              >
                {dontShowToday && <Check size={11} className="text-black" strokeWidth={3} />}
              </span>
              <span className="font-grotesk text-[11px] md:text-xs font-medium uppercase tracking-[0.12em]">
                {isKo ? '오늘은 더이상 보지 않기' : "Don't show again today"}
              </span>
            </motion.label>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
