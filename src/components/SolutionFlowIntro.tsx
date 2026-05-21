import { useRef, useState } from 'react'
import type React from 'react'
import { motion, useInView, AnimatePresence, useMotionValueEvent, useScroll, useMotionValue, useSpring, useTransform } from 'framer-motion'
import {
  MapPin, Monitor, Network,
  Eye, Brain, Globe,
  ClipboardList, Bell, Zap,
  type LucideIcon,
} from 'lucide-react'
import VideoSection from './VideoSection'
import FlowDiagram from './FlowDiagram'
import type { Translations } from '../i18n/translations'

interface Props {
  tr: Translations
  /** `hero3d` pushes card-stack depth further for the 0.5 hero layout. */
  stackVariant?: 'default' | 'hero3d'
}

export default function SolutionFlowIntro({ tr, stackVariant = 'default' }: Props) {
  const pinRef = useRef<HTMLDivElement>(null)
  const stackWrapRef = useRef<HTMLDivElement>(null)
  const inStackView = useInView(stackWrapRef, { once: true, amount: 0.15 })
  const [hoveredLayer, setHoveredLayer] = useState<string | null>(null)
  const [selectedLayer, setSelectedLayer] = useState<string | null>(null)
  const { scrollYProgress } = useScroll({
    target: pinRef,
    offset: ['start start', 'end end'],
  })

  const _isKo = tr.steps.s1.role.includes('수집')
  void _isKo

  const layerContent: Record<string, {
    headline: string
    headlineSub: string
    desc: string
    features: { title: string; desc: string }[]
    featureIcons: LucideIcon[]
  }> = {
    innowatch: {
      headline: tr.products.innowatch.headline,
      headlineSub: tr.products.innowatch.headlineSub,
      desc: tr.products.innowatch.desc,
      features: tr.products.innowatch.features,
      featureIcons: [MapPin, Monitor, Network],
    },
    wizeye: {
      headline: tr.products.wizeye.headline,
      headlineSub: tr.products.wizeye.headlineSub,
      desc: tr.products.wizeye.desc,
      features: tr.products.wizeye.features,
      featureIcons: [Eye, Brain, Globe],
    },
    decision: {
      headline: tr.decision.headline,
      headlineSub: tr.decision.headlineSub,
      desc: tr.decision.desc,
      features: tr.decision.features,
      featureIcons: [ClipboardList, Bell, Zap],
    },
  }

  const layerList: {
    id: string
    num: string
    label: string        // pill label (verb — what the stage does)
    stackLabel: string   // stack card label (product name)
    targetId: string
    role: string
    dot: string
    text: string
    border: string
    gradient: [string, string]
    shadowColor: string
    offsetY: number
    revealDelay: number
  }[] = [
    // Unified hero-primary blue across all 3 layers — minor lightness
    // shift so they still read as separate tiers, but stay monotone so the
    // section doesn't compete with itself visually.
    {
      id: 'innowatch',
      num: '01',
      label: 'COLLECT',
      stackLabel: 'INNOWATCH',
      targetId: 'step-01',
      role: tr.steps.s1.role,
      dot: 'bg-blue-200/80',
      text: 'text-blue-200/85',
      border: 'border-blue-200/20',
      gradient: ['#cfe0ff', '#6094d6'],
      shadowColor: '#1e3566',
      offsetY: 0,
      revealDelay: 0.45,
    },
    {
      id: 'wizeye',
      num: '02',
      label: 'ANALYZE',
      stackLabel: 'WIZEYE',
      targetId: 'step-02',
      role: tr.steps.s2.role,
      dot: 'bg-blue-200/75',
      text: 'text-blue-200/80',
      border: 'border-blue-200/20',
      gradient: ['#bdd0f2', '#4f7ec2'],
      shadowColor: '#182c52',
      offsetY: 30,
      revealDelay: 0.25,
    },
    {
      id: 'decision',
      num: '03',
      label: 'DECIDE & ACT',
      stackLabel: 'DECISION',
      targetId: 'step-03',
      role: tr.steps.s3.role,
      dot: 'bg-blue-200/70',
      text: 'text-blue-200/75',
      border: 'border-blue-200/20',
      gradient: ['#a8beeb', '#3d6ab0'],
      shadowColor: '#12244a',
      offsetY: 60,
      revealDelay: 0.05,
    },
  ]

  const selectedLayerMeta = selectedLayer
    ? layerList.find((layer) => layer.id === selectedLayer) ?? null
    : null

  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    if (progress < 0.04) {
      setSelectedLayer(null)
      return
    }

    const nextLayer =
      progress < 0.38 ? 'innowatch' : progress < 0.68 ? 'wizeye' : 'decision'

    setSelectedLayer((current) => (current === nextLayer ? current : nextLayer))
  })

  const selectLayer = (layer: { id: string }) => {
    setSelectedLayer(layer.id)
  }

  const renderPills = (dimAll = false) => (
    <div className="flex items-center justify-center gap-2 flex-wrap">
      {layerList.map((l) => {
        const active = selectedLayer === l.id
        const hoverLocked = Boolean(selectedLayer)
        return (
          <button
            key={l.id}
            type="button"
            onClick={() => selectLayer(l)}
            onMouseEnter={hoverLocked ? undefined : () => setHoveredLayer(l.id)}
            onMouseLeave={hoverLocked ? undefined : () => setHoveredLayer(null)}
            onFocus={hoverLocked ? undefined : () => setHoveredLayer(l.id)}
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-200 ${
              active
                ? `${l.border} bg-white/[0.05]`
                : dimAll
                  ? 'border-white/10 opacity-60 hover:opacity-90 hover:border-white/20'
                  : 'border-white/10 opacity-50 hover:opacity-90 hover:border-white/20'
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${l.dot} ${
                active ? 'shadow-[0_0_12px_currentColor]' : ''
              }`}
            />
            <span className={`font-mono text-[11px] font-semibold ${l.text}`}>{l.num}</span>
            <span className="w-px h-3 bg-white/15" />
            <span className={`text-[10px] md:text-[11px] font-bold tracking-wider ${l.text}`}>
              {l.label}
            </span>
          </button>
        )
      })}
    </div>
  )

  return (
    <VideoSection id="solution-flow" tint="rgba(5,10,24,0.90)">
      <div className="relative">
        <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8 md:px-16 pt-28 pb-0 md:pt-36 lg:pt-44">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.15] tracking-tight mb-5 md:mb-7 whitespace-pre-line break-keep">
              {tr.flow.h2}
            </h2>
            <p className="text-gray-400 text-sm md:text-base lg:text-lg leading-relaxed break-keep">
              {tr.flow.sub}
            </p>
          </div>
        </div>

        <div ref={pinRef} className="relative min-h-[320vh]">
          <div className="sticky top-16 z-10 flex min-h-[calc(100svh-4rem)] items-start">
            <div className="w-full max-w-6xl mx-auto px-5 sm:px-8 md:px-16 pt-[40px] pb-8 md:pb-10 lg:pb-12">
              <div className="mx-auto mb-6 md:mb-8 max-w-4xl text-center">
              {renderPills(true)}
            </div>

            <motion.div
              layout
              className={`relative flex flex-col gap-8 md:gap-10 ${
                selectedLayerMeta ? 'lg:flex-row lg:items-start' : 'items-center'
              }`}
            >
              {/* Glass 3D layer stack — when a layer is selected the stack
                 is compact and anchored to the top-left; when no layer is
                 selected it expands to the full column for the pre-reveal
                 pose. */}
          <motion.div
            layout
            className={`w-full flex ${
              selectedLayerMeta
                ? 'order-2 lg:order-1 lg:w-[120px] lg:flex-none justify-center lg:justify-start'
                : 'order-2 justify-center'
            }`}
          >
            <div
              ref={stackWrapRef}
              className={`relative w-full ${
                selectedLayerMeta ? 'max-w-[110px]' : 'max-w-[460px] md:max-w-[500px]'
              }`}
            >
              {stackVariant === 'hero3d' ? (
                <IsometricLayerStack
                  layerList={layerList}
                  selectedLayer={selectedLayer}
                  hoveredLayer={hoveredLayer}
                  inStackView={inStackView}
                  onHover={(id) => setHoveredLayer(id)}
                  onLeave={() => setHoveredLayer(null)}
                  onSelect={selectLayer}
                />
              ) : (
                <GlassLayerStack
                  layerList={layerList}
                  selectedLayer={selectedLayer}
                  hoveredLayer={hoveredLayer}
                  inStackView={inStackView}
                  onHover={(id) => setHoveredLayer(id)}
                  onLeave={() => setHoveredLayer(null)}
                  onSelect={selectLayer}
                />
              )}

              {/* Slab-side hover popover — a connector line + preview card
                 appears to the right of the hovered slab. Vertical percent
                 tracks the slab center within the SVG viewBox (svgH=155,
                 each slab center at vbPadY + i*gapY + (h+t)/2 → 26/48/70%). */}
              {layerList.map((l, i) => {
                const show = hoveredLayer === l.id && !selectedLayer
                const preview = layerContent[l.id]
                if (!preview) return null
                // Exact slab-center percent inside the stack SVG viewBox.
                const yPct = [26, 48, 70][i] ?? 50
                const lineColor = l.gradient[0]
                return (
                  <AnimatePresence key={`popover-${l.id}`}>
                    {show && (
                      <motion.div
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -6 }}
                        transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                        className="pointer-events-none absolute z-30 hidden lg:flex items-center"
                        style={{
                          top: `${yPct}%`,
                          left: '100%',
                          transform: 'translateY(-50%)',
                        }}
                      >
                        {/* Connector line from the slab to the popover —
                           inline style with the layer's gradient color so
                           Tailwind JIT doesn't miss the dynamic class. */}
                        <span
                          className="block h-[2px] w-12 rounded-full"
                          style={{
                            background: `linear-gradient(to right, ${lineColor}00, ${lineColor}ee)`,
                            boxShadow: `0 0 6px ${lineColor}88`,
                          }}
                        />
                        <span
                          className="block h-2 w-2 rounded-full"
                          style={{
                            background: lineColor,
                            boxShadow: `0 0 10px ${lineColor}`,
                          }}
                        />

                        <div className="ml-3 w-[240px] rounded-xl border border-white/10 bg-[#0b1427]/95 p-3 shadow-[0_12px_40px_rgba(0,0,0,0.45)] backdrop-blur-md">
                          <div className="mb-1.5 flex items-center gap-1.5">
                            <span className={`font-mono text-[10px] font-semibold ${l.text}`}>
                              {l.num}
                            </span>
                            <span className="h-3 w-px bg-white/15" />
                            <span className={`text-[10px] font-bold tracking-wider ${l.text}`}>
                              {l.label}
                            </span>
                          </div>
                          <div className="text-[12px] font-semibold text-white leading-snug mb-1">
                            {preview.headline} {preview.headlineSub}
                          </div>
                          <div className="text-[11px] text-gray-400 leading-relaxed break-keep">
                            {preview.desc}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )
              })}
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            {selectedLayerMeta && (
              <motion.div
                key={selectedLayerMeta.id}
                layout
                initial={{ opacity: 0, x: 28 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
                className="order-1 lg:order-2 w-full lg:flex-1"
              >
                <StepSectionPreview
                  tr={tr}
                  layer={selectedLayerMeta}
                  content={layerContent[selectedLayerMeta.id]}
                />
              </motion.div>
            )}
          </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
      </div>
    </VideoSection>
  )
}

interface StepSectionPreviewProps {
  tr: Translations
  layer: {
    id: string
    num: string
    text: string
    border: string
    label: string
  }
  content: {
    headline: string
    headlineSub: string
    desc: string
    features: { title: string; desc: string }[]
    featureIcons: LucideIcon[]
  }
}

function StepSectionPreview({ tr, layer, content }: StepSectionPreviewProps) {
  // Decision step is diagram-first: keep the headline + subhead at the
  // top for context, then the flow diagram as the main visual below.
  if (layer.id === 'decision') {
    return (
      <div className="flex flex-col gap-6 md:gap-8 text-left w-full max-w-[720px]">
        <div>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white leading-[1.22] md:leading-tight mb-2 md:mb-3 break-keep">
            {content.headline}{' '}
            {content.headlineSub}
          </h3>
          <p className="text-gray-400 leading-relaxed text-xs sm:text-sm md:text-base break-keep">
            {content.desc}
          </p>
        </div>
        <div className="relative w-full overflow-visible">
          <div className="origin-top-left scale-[0.78] md:scale-[0.86]">
            <FlowDiagram outputLabels={tr.decision.outputs} />
          </div>
        </div>
      </div>
    )
  }

  // Innowatch / Wizeye: headline + subhead on top, icon list directly
  // below the subhead (no preview image).
  return (
    <div className="flex flex-col gap-6 md:gap-8 text-left max-w-[640px]">
      <div>
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white leading-[1.22] md:leading-tight mb-2 md:mb-3 break-keep">
          {content.headline}{' '}
          {content.headlineSub}
        </h3>
        <p className="text-gray-400 leading-relaxed text-xs sm:text-sm md:text-base break-keep">
          {content.desc}
        </p>
      </div>

      <div className="flex flex-col gap-3 md:gap-4">
        {content.features.map((f, i) => {
          const Icon = content.featureIcons[i]
          return (
            <div key={f.title} className="flex items-start gap-3.5 md:gap-4">
              <div className="flex h-11 w-11 md:h-12 md:w-12 flex-shrink-0 items-center justify-center rounded-[10px] border border-white/10 bg-white/[0.04]">
                <Icon size={18} className="text-white/75" />
              </div>
              <div className="flex-1 min-w-0 pt-0.5">
                <div className="text-white font-semibold text-sm md:text-base mb-0.5">
                  {f.title}
                </div>
                <div className="text-gray-400 text-xs md:text-sm leading-snug break-keep">
                  {f.desc}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function _InnowatchPreview() {
  return (
    <div className="relative w-full">
      <div className="rounded-2xl border border-blue-800/40 bg-gray-900/60 backdrop-blur-sm overflow-hidden shadow-2xl shadow-black/40">
        <div className="flex items-center gap-2 px-3 md:px-4 py-2 md:py-3 border-b border-gray-800/60 bg-gray-900/80">
          <div className="flex gap-1 md:gap-1.5">
            <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-red-500/60" />
            <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-yellow-500/60" />
            <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-green-500/60" />
          </div>
          <span className="text-gray-400 text-[10px] md:text-xs ml-1.5 md:ml-2 truncate">INNOWATCH — Live Video on Map</span>
        </div>
        <div className="relative bg-[#0A1628]">
          <div className="relative p-3 md:p-4 h-[120px] md:h-[160px]">
            <img
              src="https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=800&q=80"
              alt=""
              className="absolute inset-0 w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-[#0A1628]/60" />
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: 'linear-gradient(rgba(0,102,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,102,255,0.3) 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}
            />
            {[
              { x: '20%', y: '30%' }, { x: '45%', y: '25%' }, { x: '70%', y: '40%' },
              { x: '35%', y: '60%' }, { x: '60%', y: '65%' }, { x: '80%', y: '55%' },
            ].map((pin, i) => (
              <div key={i} className="absolute" style={{ left: pin.x, top: pin.y }}>
                <div className="w-2 h-2 rounded-full bg-blue-400 relative">
                  <div className="absolute -inset-1.5 rounded-full bg-blue-400/20 animate-ping" style={{ animationDuration: `${2 + i * 0.3}s` }} />
                </div>
              </div>
            ))}
            <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 100 100">
              <path d="M10,50 Q30,20 50,45 T90,30" stroke="rgba(59,130,246,0.5)" fill="none" strokeWidth="0.5" />
              <path d="M20,80 Q50,60 80,70" stroke="rgba(59,130,246,0.3)" fill="none" strokeWidth="0.3" />
            </svg>
          </div>
          <div className="grid grid-cols-3 gap-px bg-gray-800/30 border-t border-blue-900/40">
            {[
              'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&q=70',
              'https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?w=400&q=70',
              'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=400&q=70',
            ].map((src, i) => (
              <div key={src} className="aspect-video bg-[#080e1c] relative overflow-hidden">
                <img src={src} alt="" className="absolute inset-0 w-full h-full object-cover opacity-40" />
                <div className="absolute inset-0 bg-[#080e1c]/40" />
                <div className="absolute top-1 left-1.5 flex items-center gap-1 z-10">
                  <span className="w-1 h-1 rounded-full bg-red-400 animate-pulse" />
                  <span className="text-[9px] sm:text-[8px] md:text-[7px] text-gray-300 md:text-gray-400 font-mono">CAM-{String(i + 1).padStart(3,'0')}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function _WizeyePreview() {
  return (
    <div className="relative w-full">
      <div className="rounded-2xl border border-cyan-800/40 bg-gray-900/60 backdrop-blur-sm overflow-hidden shadow-2xl shadow-black/40">
        <div className="flex items-center gap-2 px-3 md:px-4 py-2 md:py-3 border-b border-gray-800/60 bg-gray-900/80">
          <div className="flex gap-1 md:gap-1.5">
            <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-red-500/60" />
            <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-yellow-500/60" />
            <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-green-500/60" />
          </div>
          <span className="text-gray-400 text-[10px] md:text-xs ml-1.5 md:ml-2 truncate">WIZEYE — AI Vision Analytics</span>
        </div>
        <div className="bg-[#040C18]">
          <div className="relative aspect-[16/7] bg-gray-900 overflow-hidden border-b border-gray-800/50">
            <img
              src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&q=70"
              alt=""
              className="absolute inset-0 w-full h-full object-cover opacity-25"
            />
            <div className="absolute inset-0 bg-[#040C18]/50" />
            {[
              { top: '15%', left: '10%', w: '22%', h: '50%', color: 'border-cyan-400', label: 'PERSON', conf: '98.2%' },
              { top: '25%', left: '48%', w: '30%', h: '40%', color: 'border-yellow-400', label: 'VEHICLE', conf: '96.7%' },
              { top: '55%', left: '22%', w: '18%', h: '30%', color: 'border-green-400', label: 'OBJECT', conf: '94.1%' },
            ].map((box) => (
              <div
                key={box.label}
                className={`absolute border-2 ${box.color}`}
                style={{ top: box.top, left: box.left, width: box.w, height: box.h }}
              >
                <div className={`absolute -top-4 left-0 flex items-center gap-1 ${box.color.replace('border-', 'text-')}`}>
                  <span className="text-[10px] sm:text-[9px] md:text-[8px] font-bold bg-gray-900/80 px-1 py-px">{box.label}</span>
                  <span className="text-[9px] sm:text-[8px] md:text-[7px] opacity-70">{box.conf}</span>
                </div>
              </div>
            ))}
            <motion.div
              className="absolute left-0 right-0 h-px bg-cyan-400/30"
              animate={{ top: ['5%', '95%', '5%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            />
            <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-cyan-500/30" />
            <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-cyan-500/30" />
            <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-cyan-500/30" />
            <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-cyan-500/30" />
          </div>
          <div className="grid grid-cols-3 border-b border-gray-800/50">
            {[
              { label: 'Objects', value: '1,247' },
              { label: 'Accuracy', value: '99.3%' },
              { label: 'FPS', value: '30' },
            ].map((s, i) => (
              <div key={s.label} className={`py-2 md:py-2.5 px-2 md:px-3 text-center ${i < 2 ? 'border-r border-gray-800/50' : ''}`}>
                <span className="text-cyan-400 font-bold text-xs md:text-sm">{s.value}</span>
                <span className="text-gray-500 text-[9px] md:text-[10px] ml-1 md:ml-1.5">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

interface GlassLayerStackProps {
  layerList: {
    id: string
    num: string
    label: string
    stackLabel: string
    dot: string
    text: string
    border: string
    gradient: [string, string]
    revealDelay: number
  }[]
  selectedLayer: string | null
  hoveredLayer: string | null
  inStackView: boolean
  onHover: (id: string) => void
  onLeave: () => void
  onSelect: (layer: { id: string }) => void
}

function GlassLayerStack({
  layerList,
  selectedLayer,
  hoveredLayer,
  inStackView,
  onHover,
  onLeave,
  onSelect,
}: GlassLayerStackProps) {
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const mxSpring = useSpring(mx, { stiffness: 60, damping: 20 })
  const mySpring = useSpring(my, { stiffness: 60, damping: 20 })
  const tiltX = useTransform(mySpring, [-0.5, 0.5], ['55deg', '42deg'])
  const tiltY = useTransform(mxSpring, [-0.5, 0.5], ['-20deg', '20deg'])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - rect.left) / rect.width - 0.5)
    my.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handleMouseLeave = () => {
    mx.set(0)
    my.set(0)
    onLeave()
  }

  return (
    <div
      className="relative w-full flex justify-center py-8"
      style={{ perspective: 1200 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{
          transformStyle: 'preserve-3d',
          rotateX: tiltX,
          rotateY: tiltY,
          rotateZ: '-8deg',
          width: '100%',
          maxWidth: 420,
          height: 260,
          position: 'relative',
        }}
      >
        {layerList.map((layer, i) => {
          const isActive = selectedLayer === layer.id
          const isHovered = hoveredLayer === layer.id && !selectedLayer
          const isDimmed =
            !!(selectedLayer || hoveredLayer) && !isActive && !isHovered

          const zPos = (2 - i) * 72
          const xOff = (i - 1) * 28
          const yOff = (i - 1) * 16

          return (
            <motion.div
              key={layer.id}
              initial={{ opacity: 0, y: yOff - 50, z: zPos - 50 }}
              animate={{
                opacity: inStackView ? (isDimmed ? 0.3 : 1) : 0,
                y: yOff,
                z: isActive ? zPos + 28 : isHovered ? zPos + 14 : zPos,
                scale: isActive ? 1.06 : isHovered ? 1.02 : 1,
              }}
              transition={{
                delay: inStackView ? layer.revealDelay : 0,
                duration: 0.55,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="absolute cursor-pointer"
              style={{
                width: 380,
                height: 86,
                left: '50%',
                top: '50%',
                marginLeft: -190 + xOff,
                marginTop: -43 + yOff,
                transformStyle: 'preserve-3d',
              }}
              onClick={() => onSelect(layer)}
              onMouseEnter={() => onHover(layer.id)}
            >
              {/* Back face — gives thickness depth */}
              <div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{
                  transform: 'translateZ(-16px)',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                  backgroundColor: 'rgba(255,255,255,0.02)',
                  border: `1px solid ${layer.gradient[1]}44`,
                  boxShadow: 'inset 0 0 40px rgba(0,80,200,0.12), inset -6px -6px 24px rgba(0,40,160,0.08)',
                }}
              />

              {/* Mid refraction stripe */}
              <div
                className="absolute inset-3 rounded-xl pointer-events-none opacity-25 mix-blend-overlay"
                style={{
                  transform: 'translateZ(-8px)',
                  background:
                    'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.28) 10px, rgba(255,255,255,0.28) 20px)',
                  maskImage: 'radial-gradient(ellipse at center, transparent 15%, black 100%)',
                  WebkitMaskImage: 'radial-gradient(ellipse at center, transparent 15%, black 100%)',
                }}
              />

              {/* Front face — main glass surface */}
              <div
                className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden"
                style={{
                  transform: 'translateZ(0px)',
                  background:
                    'linear-gradient(135deg, rgba(255,255,255,0.13) 0%, rgba(200,230,255,0.02) 100%)',
                  backdropFilter: 'blur(18px)',
                  WebkitBackdropFilter: 'blur(18px)',
                  borderTop: `2px solid rgba(255,255,255,${isActive ? 0.95 : 0.72})`,
                  borderLeft: `2px solid rgba(255,255,255,${isActive ? 0.85 : 0.58})`,
                  borderRight: '1px solid rgba(255,255,255,0.18)',
                  borderBottom: '1px solid rgba(255,255,255,0.14)',
                  boxShadow: `
                    inset 10px 10px 20px -6px rgba(255,255,255,0.55),
                    inset -10px -10px 28px -6px rgba(0,100,255,0.14)
                  `,
                }}
              >
                {/* Sweeping glare */}
                <motion.div
                  className="absolute w-[200%] h-[200%] pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(to bottom right, transparent 40%, rgba(255,255,255,0.55) 45%, rgba(255,255,255,0.85) 50%, rgba(255,255,255,0.55) 55%, transparent 60%)',
                    transformOrigin: 'top left',
                  }}
                  initial={{ x: '-100%', y: '-100%' }}
                  animate={{ x: '100%', y: '100%' }}
                  transition={{
                    duration: 4.5,
                    repeat: Infinity,
                    repeatDelay: i * 1.5 + 2,
                    ease: 'easeInOut',
                  }}
                />
              </div>

              {/* Label */}
              <div
                className="absolute inset-0 flex items-center gap-3 px-6 pointer-events-none"
                style={{ transform: 'translateZ(2px)' }}
              >
                <span className={`font-mono text-[11px] font-bold ${layer.text}`}>{layer.num}</span>
                <span className="w-px h-3 bg-white/20" />
                <span className={`text-[11px] font-bold tracking-[0.18em] ${layer.text}`}>{layer.stackLabel}</span>
                <div className="flex-1" />
                <span
                  className={`w-2 h-2 rounded-full ${layer.dot} transition-all duration-300 ${
                    isActive ? 'shadow-[0_0_10px_currentColor] opacity-100' : 'opacity-55'
                  }`}
                />
              </div>
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}

// Build a closed SVG path from a polygon whose vertices have been rounded by
// radius `r` via quadratic beziers. Used to give the iso slab chiseled, 3D-
// beveled corners rather than sharp geometric points.
function roundedPolygon(points: [number, number][], r: number): string {
  const n = points.length
  const parts: string[] = []
  for (let i = 0; i < n; i++) {
    const prev = points[(i + n - 1) % n]
    const curr = points[i]
    const next = points[(i + 1) % n]

    const d1 = Math.hypot(curr[0] - prev[0], curr[1] - prev[1])
    const d2 = Math.hypot(next[0] - curr[0], next[1] - curr[1])
    // Cap the corner radius at half the shorter adjacent edge so beveling
    // never overshoots on thin parallelograms.
    const rr = Math.min(r, d1 / 2, d2 / 2)
    const f1 = rr / d1
    const f2 = rr / d2

    const enterX = curr[0] - (curr[0] - prev[0]) * f1
    const enterY = curr[1] - (curr[1] - prev[1]) * f1
    const exitX = curr[0] + (next[0] - curr[0]) * f2
    const exitY = curr[1] + (next[1] - curr[1]) * f2

    if (i === 0) {
      parts.push(`M${enterX},${enterY}`)
    } else {
      parts.push(`L${enterX},${enterY}`)
    }
    parts.push(`Q${curr[0]},${curr[1]} ${exitX},${exitY}`)
  }
  parts.push('Z')
  return parts.join(' ')
}

// Isometric slab stack for the 0.5 hero — SVG iso rhombus with a "hard glass"
// treatment that mirrors the hero keyhole's MeshPhysicalMaterial: pale
// ice-blue frosted shell + bright colored inner core + glossy sheen.
function IsometricLayerStack({
  layerList,
  selectedLayer,
  hoveredLayer,
  inStackView,
  onHover,
  onLeave,
  onSelect,
}: GlassLayerStackProps) {
  // viewBox-space dimensions — chosen to mirror the classic 2:1 iso ratio.
  const w = 100                 // rhombus horizontal extent
  const h = 50                  // rhombus vertical extent (top face) — 2:1 iso
  const t = 11                  // slab thickness — slimmer, less chunky
  const gapY = 34               // vertical air between slabs
  const vbPadX = 8
  const vbPadY = 10
  const svgW = w + vbPadX * 2
  const svgH = h + t + gapY * (layerList.length - 1) + vbPadY * 2 + 6

  // Iso face slope — matches top-edge gradient of the side parallelograms.
  // left-front face top edge runs from (0, h/2) to (w/2, h): slope = h/w = 0.5.

  // Corner radius (in viewBox units) — gives every polygon a chiseled bevel.
  const cornerR = 2.4
  const topFacePath = roundedPolygon(
    [
      [0, h / 2],
      [w / 2, 0],
      [w, h / 2],
      [w / 2, h],
    ],
    cornerR,
  )
  const leftFacePath = roundedPolygon(
    [
      [0, h / 2],
      [w / 2, h],
      [w / 2, h + t],
      [0, h / 2 + t],
    ],
    cornerR,
  )
  const rightFacePath = roundedPolygon(
    [
      [w / 2, h],
      [w, h / 2],
      [w, h / 2 + t],
      [w / 2, h + t],
    ],
    cornerR,
  )
  const shadowFacePath = topFacePath
  // Full 6-vertex silhouette of the slab — only the outer perimeter is
  // rounded. Painting this behind the three face gradients fills the
  // small triangular gaps that appeared where each face's rounded corner
  // peeled away from its neighbour.
  const slabSilhouettePath = roundedPolygon(
    [
      [0, h / 2],
      [w / 2, 0],
      [w, h / 2],
      [w, h / 2 + t],
      [w / 2, h + t],
      [0, h / 2 + t],
    ],
    cornerR,
  )

  // Render bottom-up so upper layers paint over lower ones.
  const renderOrder = [...layerList].map((l, i) => ({ layer: l, i })).reverse()

  return (
    <div className="relative w-full flex justify-center py-6 md:py-8">
      <svg
        viewBox={`0 0 ${svgW} ${svgH}`}
        className="w-full"
        style={{ maxWidth: 480, overflow: 'visible' }}
      >
        <defs>
          {/* Frosted ice-blue TOP face — brightest, catches direct light */}
          <linearGradient id="iso-shell-top" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e6f2ff" stopOpacity={0.75} />
            <stop offset="55%" stopColor="#b9d6ff" stopOpacity={0.45} />
            <stop offset="100%" stopColor="#85b3ff" stopOpacity={0.4} />
          </linearGradient>

          {/* Left-front face — deeper, in shadow */}
          <linearGradient id="iso-shell-left" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4a6fa8" stopOpacity={0.75} />
            <stop offset="100%" stopColor="#1e3566" stopOpacity={0.85} />
          </linearGradient>

          {/* Right-front face — mid-tone, cyan refraction */}
          <linearGradient id="iso-shell-right" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#6b94c9" stopOpacity={0.6} />
            <stop offset="100%" stopColor="#365687" stopOpacity={0.7} />
          </linearGradient>

          {/* Bright diagonal sheen riding across the top face */}
          <linearGradient id="iso-sheen" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.72)" />
            <stop offset="55%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>

          {/* Cast shadow under each slab — larger blur radius + wider
              filter region so the shadow dissolves into the background
              instead of reading as a sharp silhouette. */}
          <filter id="iso-cast-shadow" x="-60%" y="-60%" width="220%" height="280%">
            <feGaussianBlur stdDeviation="6.5" />
          </filter>
          <filter id="iso-active-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" />
          </filter>

          {/* Ethereal-shader distortion — same SVG primitives as the hero
              backdrop (feTurbulence + feDisplacementMap), but with a tiny
              displacement so slab edges only shimmer rather than warp.
              The subtle distortion gives the flat gradients a glassy,
              "hero shader" material feel. */}
          <filter id="iso-ethereal" x="-8%" y="-8%" width="116%" height="116%">
            <feTurbulence
              type="turbulence"
              baseFrequency="0.022 0.055"
              numOctaves={2}
              seed={3}
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={0.8}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>

          {/* Deep silhouette fill that sits behind the three faces and
              closes the corner gaps left by per-face rounded polygons. */}
          <linearGradient id="iso-silhouette" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#2a4b80" stopOpacity={0.95} />
            <stop offset="100%" stopColor="#0f1c38" stopOpacity={0.95} />
          </linearGradient>
        </defs>

        {renderOrder.map(({ layer, i }) => {
          const isActive = selectedLayer === layer.id
          const isHovered = hoveredLayer === layer.id && !selectedLayer
          const isDimmed =
            !!(selectedLayer || hoveredLayer) && !isActive && !isHovered

          const baseY = vbPadY + i * gapY
          const liftY = isActive ? -6 : isHovered ? -2 : 0
          const targetY = baseY + liftY

          return (
            <motion.g
              key={layer.id}
              initial={{ opacity: 0, x: vbPadX, y: targetY - 16 }}
              animate={{
                opacity: inStackView ? (isDimmed ? 0.42 : 1) : 0,
                x: vbPadX,
                y: targetY,
              }}
              transition={{
                delay: inStackView ? layer.revealDelay : 0,
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
              }}
              onClick={() => onSelect(layer)}
              onMouseEnter={() => onHover(layer.id)}
              onMouseLeave={onLeave}
              style={{ cursor: 'pointer' }}
            >
              {/* Cast shadow — rhombus footprint blurred heavily so it
                 fades out rather than drawing as a defined patch under
                 the slab. */}
              <g transform={`translate(0, ${t + 8})`} opacity={0.22}>
                <path
                  d={shadowFacePath}
                  fill="rgba(5,10,24,0.6)"
                  filter="url(#iso-cast-shadow)"
                />
              </g>

              {/* Active glow pad — neutral tone (no layer tint) so the
                 shadow reads as a soft halo rather than colored ink.
                 Previously pulled from layer.gradient[1] which bled a
                 strong blue/cyan/emerald stain under the slab. */}
              {isActive && (
                <g transform={`translate(0, ${t + 6})`} opacity={0.42}>
                  <path
                    d={shadowFacePath}
                    fill="rgba(200, 220, 240, 0.9)"
                    filter="url(#iso-active-glow)"
                  />
                </g>
              )}

              {/* Full slab silhouette — paints behind the 3 face polygons
                 to fill the tiny gaps opened by per-corner rounding. */}
              <path d={slabSilhouettePath} fill="url(#iso-silhouette)" />

              {/* --- OUTER FROSTED SHELL — 3 faces, each with its own
                 gradient, distorted by the ethereal turbulence filter so
                 the slab surface reads like the hero's shader material. */}
              <g filter="url(#iso-ethereal)">
                {/* Left-front shell face (shadow side) */}
                <path
                  d={leftFacePath}
                  fill="url(#iso-shell-left)"
                  strokeLinejoin="round"
                />

                {/* Right-front shell face (mid-tone side) */}
                <path
                  d={rightFacePath}
                  fill="url(#iso-shell-right)"
                  strokeLinejoin="round"
                />

                {/* Top face — bright frosted glass */}
                <path
                  d={topFacePath}
                  fill="url(#iso-shell-top)"
                  stroke={isActive ? 'rgba(205,232,255,0.9)' : 'rgba(188,226,255,0.55)'}
                  strokeWidth={isActive ? 0.55 : 0.35}
                  strokeLinejoin="round"
                />

                {/* Top sheen — diagonal white highlight (clearcoat reflection) */}
                <path
                  d={topFacePath}
                  fill="url(#iso-sheen)"
                  opacity={0.5}
                  pointerEvents="none"
                />
              </g>

              {/* --- LABEL on LEFT-FRONT face, skewed to match face slope +0.5 --- */}
              {/* Face is a parallelogram with center at world (w/4, 3h/4 + t/2).
                   With textAnchor='middle' and matrix(1 0.5 0 1 e f), the text's
                   center maps to world (e, f). e = w/4 horizontally centers on
                   face; f = 3h/4 + t/2 + small nudge vertically centers. */}
              <text
                x={0}
                y={0}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="rgba(255,255,255,0.96)"
                style={{
                  fontSize: 3.4,
                  fontWeight: 800,
                  letterSpacing: '0.06em',
                  pointerEvents: 'none',
                  textShadow: '0 0 2px rgba(0,0,0,0.6)',
                }}
                transform={`matrix(1 0.5 0 1 ${w / 4} ${(3 * h) / 4 + t / 2 + 1.5})`}
              >
                {layer.stackLabel}
              </text>
            </motion.g>
          )
        })}
      </svg>
    </div>
  )
}
