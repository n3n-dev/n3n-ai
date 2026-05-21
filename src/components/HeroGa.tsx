import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, Clock } from 'lucide-react'
import type { Translations, Lang } from '../i18n/translations'

interface Props {
  tr: Translations
  lang?: Lang
  hideCta?: boolean
  badgeOverride?: string
  h1Override?: string
  subheadOverride?: string
}

const display: React.CSSProperties = {
  fontFamily: '"Newsreader", "Newsreader Display", Georgia, serif',
  fontWeight: 400,
  letterSpacing: '-0.025em',
  lineHeight: 1,
}
const body: React.CSSProperties = {
  fontSize: '12px',
  fontWeight: 300,
  lineHeight: '19.5px',
  letterSpacing: '-0.05em',
}
const label: React.CSSProperties = {
  fontSize: '10px',
  fontWeight: 500,
  lineHeight: '15px',
  letterSpacing: '-0.5px',
}
const link: React.CSSProperties = {
  fontSize: '12px',
  fontWeight: 400,
  lineHeight: '16px',
  letterSpacing: '-0.6px',
}

// Bracket container — L-shaped corner ticks pinned to the four corners of
// a section. Reproduces Neuform's `bracket-container` decoration.
function BracketCorners({ color = '#D1D5DB', size = 20 }: { color?: string; size?: number }) {
  const stroke = 1
  const corners: Array<[string, string, string]> = [
    ['top-0 left-0', `${size}px ${stroke}px`, `${stroke}px ${size}px`], // TL
    ['top-0 right-0', `${size}px ${stroke}px`, `${stroke}px ${size}px`], // TR
    ['bottom-0 left-0', `${size}px ${stroke}px`, `${stroke}px ${size}px`], // BL
    ['bottom-0 right-0', `${size}px ${stroke}px`, `${stroke}px ${size}px`], // BR
  ]
  return (
    <>
      {corners.map(([pos], i) => (
        <span key={i} aria-hidden className={`pointer-events-none absolute ${pos} block`} style={{ width: size, height: size }}>
          {/* Each corner draws two small bars to form an L. Position vary by corner. */}
          <span
            className="absolute"
            style={{
              background: color,
              left: i === 1 || i === 3 ? 'auto' : 0,
              right: i === 1 || i === 3 ? 0 : 'auto',
              top: i === 2 || i === 3 ? 'auto' : 0,
              bottom: i === 2 || i === 3 ? 0 : 'auto',
              width: size,
              height: stroke,
            }}
          />
          <span
            className="absolute"
            style={{
              background: color,
              left: i === 1 || i === 3 ? 'auto' : 0,
              right: i === 1 || i === 3 ? 0 : 'auto',
              top: i === 2 || i === 3 ? 'auto' : 0,
              bottom: i === 2 || i === 3 ? 0 : 'auto',
              width: stroke,
              height: size,
            }}
          />
        </span>
      ))}
    </>
  )
}

// Hero canvas — full-bleed halftone particle field. Two zones drift with a
// slow breathing pulse (Neuform's WebGL spec) and react gently to pointer.
// Top-left indigo cluster + bottom-right neutral cluster mirror the
// reference's halftone corner accents.
function HeroCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)
  const pointer = useRef({ x: 0, y: 0, active: false })

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0
    let W = 0
    let H = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    type Dot = { ax: number; ay: number; baseR: number; phase: number; tone: 'indigo' | 'gray' }
    let dots: Dot[] = []

    const build = () => {
      const rect = canvas.getBoundingClientRect()
      W = rect.width
      H = rect.height
      canvas.width = Math.floor(W * dpr)
      canvas.height = Math.floor(H * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const step = 16
      const cols = Math.ceil(W / step)
      const rows = Math.ceil(H / step)
      dots = []
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const ax = x * step + step / 2
          const ay = y * step + step / 2

          // Top-left zone strength.
          const tl = Math.max(0, 1 - Math.hypot(x / cols, y / rows) / 0.55)
          // Bottom-right zone strength.
          const br = Math.max(0, 1 - Math.hypot(1 - x / cols, 1 - y / rows) / 0.5)

          const tone: 'indigo' | 'gray' = tl >= br ? 'indigo' : 'gray'
          const t = Math.max(tl, br)
          if (t < 0.05) continue

          dots.push({
            ax,
            ay,
            baseR: 0.4 + t * 3.2,
            phase: (ax * 0.012 + ay * 0.014) % (Math.PI * 2),
            tone,
          })
        }
      }
    }

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      pointer.current = { x: e.clientX - rect.left, y: e.clientY - rect.top, active: true }
    }
    const onLeave = () => {
      pointer.current.active = false
    }

    const tick = (t: number) => {
      ctx.clearRect(0, 0, W, H)
      const ptr = pointer.current
      // Slow breathing pulse — 0..1 over ~7s.
      const breath = 0.55 + 0.45 * Math.sin(t * 0.0009)

      for (const d of dots) {
        // Per-dot breathing offset so the pulse ripples across the field.
        const local = 0.45 + 0.55 * Math.sin(t * 0.0009 + d.phase)

        // Subtle pointer parallax: dots near the cursor lean slightly away.
        let px = d.ax
        let py = d.ay
        if (ptr.active) {
          const dx = d.ax - ptr.x
          const dy = d.ay - ptr.y
          const dist = Math.hypot(dx, dy)
          const drift = Math.max(0, 1 - dist / 240) * 6
          px += (dx / (dist || 1)) * drift
          py += (dy / (dist || 1)) * drift
        }

        const r = d.baseR * (0.7 + 0.3 * local) * (0.85 + 0.15 * breath)
        ctx.beginPath()
        ctx.arc(px, py, r, 0, Math.PI * 2)
        if (d.tone === 'indigo') {
          ctx.fillStyle = `rgba(99, 102, 241, ${(0.55 * local).toFixed(3)})`
        } else {
          ctx.fillStyle = `rgba(156, 163, 175, ${(0.5 * local).toFixed(3)})`
        }
        ctx.fill()
      }
      raf = requestAnimationFrame(tick)
    }

    build()
    raf = requestAnimationFrame(tick)
    window.addEventListener('resize', build)
    canvas.addEventListener('pointermove', onMove)
    canvas.addEventListener('pointerleave', onLeave)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', build)
      canvas.removeEventListener('pointermove', onMove)
      canvas.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <canvas
      id="heroCanvas"
      ref={ref}
      className="pointer-events-auto absolute inset-0 z-0 h-full w-full"
      aria-hidden
    />
  )
}

export default function HeroGa({
  lang,
  h1Override,
  subheadOverride,
  badgeOverride: _b,
  hideCta: _h,
  tr: _tr,
}: Props) {
  const h1 = h1Override ?? 'Real Insights\nFinancial Reports'
  const sub =
    subheadOverride ??
    (lang === 'ko'
      ? 'AI 기반 데이터·영상 분석 플랫폼을 통해 실시간으로 상황을 판단하고 즉시 문제 해결까지 지원합니다.'
      : 'Get ready to take off! The moment has arrived to kickstart your adventure.')

  const navItems = [
    'Explore All Financial Features',
    'Countries',
    'Hot News',
    'Graphs',
    'Company Overview',
    'Manage Investments',
  ]
  const activeNav = navItems.length - 1

  return (
    <section className="relative w-full overflow-hidden bg-white text-[#111827]">
      {/* Hero block — bracket-container w/ min-h-[60vh] justify-end */}
      <div className="bracket-container relative flex min-h-[60vh] flex-col justify-end overflow-hidden pt-32 pb-16">
        {/* Animated halftone canvas — full-bleed background */}
        <HeroCanvas />

        {/* L-shaped corner brackets (Neuform's bracket-container decoration) */}
        <BracketCorners color="#D1D5DB" />

        {/* grid-line-x — horizontal hairline rules at top + bottom of hero */}
        <span aria-hidden className="grid-line-x pointer-events-none absolute inset-x-0 top-24 z-[1] h-px bg-[#E5E7EB]" />
        <span aria-hidden className="grid-line-x pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-px bg-[#E5E7EB]" />

        <div className="relative z-[2] mx-auto w-full max-w-[1500px] px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
            <div className="relative lg:col-span-9">
              {/* Round back-arrow chip pinned to the left of the headline */}
              <button
                type="button"
                aria-label="Back"
                className="absolute -left-1 md:-left-2 top-[42%] hidden md:inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#9CA3AF]/85 text-white transition-colors hover:bg-[#6B7280]"
              >
                <ArrowLeft size={18} />
              </button>

              <motion.h1
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                className="whitespace-pre-line break-keep text-[#0F172A] pl-0 md:pl-16"
                style={{ ...display, fontSize: 'clamp(56px, 9.4vw, 156px)' }}
              >
                {h1}
              </motion.h1>
            </div>

            <div className="lg:col-span-3 lg:pb-6">
              <p className="max-w-xs text-[#6B7280] lg:text-right" style={body}>
                {sub}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Section divider + nav strip */}
      <div className="border-t border-[#E5E7EB]">
        <div className="mx-auto max-w-[1500px] px-6 md:px-10">
          <nav className="flex items-center justify-center gap-6 md:gap-10 overflow-x-auto py-5">
            {navItems.map((n, i) => {
              const active = i === activeNav
              return (
                <a
                  key={n}
                  href="#"
                  className={`relative inline-flex items-center gap-2 whitespace-nowrap ${
                    active ? 'text-[#111827]' : 'text-[#9CA3AF]'
                  }`}
                  style={link}
                >
                  <span
                    aria-hidden
                    className={`inline-block h-1 w-1 rounded-full ${
                      active ? 'bg-[#111827]' : 'bg-[#D1D5DB]'
                    }`}
                  />
                  <span className={active ? 'border-b border-[#111827] pb-px' : ''}>{n}</span>
                </a>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Date / time meta band */}
      <div className="border-t border-[#E5E7EB]">
        <div className="mx-auto grid max-w-[1500px] grid-cols-2 px-6 md:px-10">
          {[
            { date: 'Nov 10', time: '5:00 PM' },
            { date: 'Nov 15', time: '3:30 PM' },
          ].map((meta, i) => (
            <div
              key={meta.date}
              className={`flex items-center gap-6 py-4 text-[#9CA3AF] ${
                i === 1 ? 'border-l border-[#E5E7EB] pl-8' : ''
              }`}
              style={label}
            >
              <span className="inline-flex items-center gap-2">
                <Calendar size={12} /> {meta.date}
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock size={12} /> {meta.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
