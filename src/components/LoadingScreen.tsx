import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  onComplete: () => void
}

export default function LoadingScreen({ onComplete }: Props) {
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState<'loading' | 'reveal'>('loading')

  useEffect(() => {
    const duration = 2200
    const interval = 30
    const steps = duration / interval
    let current = 0

    const timer = setInterval(() => {
      current++
      const eased = Math.pow(current / steps, 0.6)
      setProgress(Math.min(Math.round(eased * 100), 100))
      if (current >= steps) {
        clearInterval(timer)
        setProgress(100)
        setTimeout(() => setPhase('reveal'), 300)
        setTimeout(() => onComplete(), 1100)
      }
    }, interval)

    return () => clearInterval(timer)
  }, [onComplete])

  return (
    <AnimatePresence>
      {phase !== 'reveal' ? (
        <motion.div
          key="loading"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #030711 0%, #0A0F1E 50%, #030711 100%)' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                'linear-gradient(rgba(0,102,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0,102,255,0.15) 1px, transparent 1px)',
              backgroundSize: '64px 64px',
            }}
          />

          {/* Radial glow */}
          <div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(0,102,255,0.12) 0%, transparent 70%)',
            }}
          />

          <div className="relative z-10 flex flex-col items-center gap-12">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="flex flex-col items-center gap-3"
            >
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">N</span>
                </div>
                <span className="text-white text-3xl font-bold tracking-tight">
                  n3n<span className="text-blue-400">.ai</span>
                </span>
              </div>
              <p className="text-gray-400 text-sm tracking-widest uppercase">
                AI Cloud Infrastructure
              </p>
            </motion.div>

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col items-center gap-4 w-64"
            >
              <div className="w-full h-px bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: 'linear-gradient(90deg, #0066FF, #00D4FF)',
                    width: `${progress}%`,
                    transition: 'width 0.03s linear',
                    boxShadow: '0 0 12px rgba(0,102,255,0.8)',
                  }}
                />
              </div>
              <span className="text-gray-500 text-xs font-mono tabular-nums">
                {String(progress).padStart(3, '0')}%
              </span>
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
