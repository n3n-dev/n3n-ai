import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface Props {
  id?: string
  children: React.ReactNode
  videoSrc?: string
  /** Gradient overlay color hint — defaults to deep blue-black */
  tint?: string
  className?: string
  /** Whether the section should be full viewport height */
  fullHeight?: boolean
}

export default function VideoSection({
  id,
  children,
  videoSrc,
  tint = 'rgba(5,10,24,0.75)',
  className = '',
  fullHeight = false,
}: Props) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '15%'])

  return (
    <section
      id={id}
      ref={ref}
      className={`relative ${fullHeight ? 'min-h-screen' : ''} ${className}`}
    >
      {/* Parallax background — contained in its own overflow-hidden wrapper so
          the section itself stays overflow:visible (required for any sticky
          children inside `children` to work). */}
      <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
        <motion.div className="absolute inset-[-10%]" style={{ y: bgY }}>
          {videoSrc ? (
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            >
              <source src={videoSrc} type="video/mp4" />
            </video>
          ) : (
            <div className="w-full h-full bg-[#050A18]" />
          )}

          {/* Tint overlay */}
          <div className="absolute inset-0" style={{ background: tint }} />

          {/* Subtle grid */}
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(0,102,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,102,255,0.5) 1px, transparent 1px)',
              backgroundSize: '80px 80px',
            }}
          />

          {/* Radial glow center */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(0,80,200,0.08) 0%, transparent 65%)',
            }}
          />

          {/* Bottom fade into next section */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050A18] to-transparent" />
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </section>
  )
}
