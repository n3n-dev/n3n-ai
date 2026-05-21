import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { MapPin, Monitor, Network, Eye, Brain, Globe } from 'lucide-react'
import VideoSection from './VideoSection'
import type { Translations } from '../i18n/translations'

interface Props {
  tr: Translations
  variant?: 'default' | 'story'
  innowatchHeadlineOverride?: string
  innowatchHeadlineSubOverride?: string
  innowatchDescOverride?: string
  wizeyeHeadlineOverride?: string
  wizeyeHeadlineSubOverride?: string
  wizeyeDescOverride?: string
  wizeyeFeaturesOverride?: { title: string; desc: string }[]
}

const innowatchIcons = [MapPin, Monitor, Network]
const wizeyeIcons = [Eye, Brain, Globe]

export default function Products({
  tr,
  variant = 'default',
  innowatchHeadlineOverride,
  innowatchHeadlineSubOverride,
  innowatchDescOverride,
  wizeyeHeadlineOverride,
  wizeyeHeadlineSubOverride,
  wizeyeDescOverride,
  wizeyeFeaturesOverride,
}: Props) {
  const isStory = variant === 'story'
  const refA = useRef<HTMLDivElement>(null)
  const refB = useRef<HTMLDivElement>(null)
  const inViewA = useInView(refA, { once: true, margin: '-80px' })
  const inViewB = useInView(refB, { once: true, margin: '-80px' })

  return (
    <div id="products">
      {/* ── INNOWATCH ── */}
      <VideoSection id={isStory ? 'step-01' : undefined} tint="rgba(4,8,20,0.80)">
        <div ref={refA} className="max-w-6xl mx-auto px-5 sm:px-8 md:px-16 lg:px-28 py-12 md:py-20 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-6 md:gap-12 lg:gap-16 items-center">
            {/* Left text */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={inViewA ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              {isStory ? (
                <div className="inline-flex items-center gap-2.5 md:gap-3 mb-3 md:mb-6 flex-wrap">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-600/15 border border-blue-500/30 text-blue-300 text-[10px] sm:text-xs font-bold tracking-wider">
                    {tr.steps.s1.badge}
                  </div>
                  <span className="text-[10px] sm:text-xs text-blue-200/60 font-medium tracking-wide">{tr.steps.s1.role}</span>
                </div>
              ) : (
                <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-blue-600/15 border border-blue-500/30 text-blue-400 text-[10px] sm:text-xs font-bold tracking-wider sm:tracking-widest mb-3 md:mb-6">
                  <span className="sm:hidden">INNOWATCH</span>
                  <span className="hidden sm:inline">INNOWATCH · 실시간 수천 개 동시 관제</span>
                </div>
              )}
              <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-white leading-[1.25] md:leading-tight mb-2 md:mb-4 break-keep">
                {innowatchHeadlineOverride ?? tr.products.innowatch.headline}
                {' '}
                <br className="hidden md:block" />
                <span className="animated-gradient">{innowatchHeadlineSubOverride ?? tr.products.innowatch.headlineSub}</span>
              </h2>
              <p className="text-gray-400 leading-relaxed mb-4 md:mb-8 text-xs sm:text-sm md:text-base break-keep">{innowatchDescOverride ?? tr.products.innowatch.desc}</p>

              {/* Feature list */}
              <div className="flex flex-col gap-4 md:gap-5">
                {tr.products.innowatch.features.map((f, i) => {
                  const Icon = innowatchIcons[i]
                  return (
                    <motion.div
                      key={f.title}
                      initial={{ opacity: 0, x: -20 }}
                      animate={inViewA ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.6, delay: 0.15 + i * 0.1 }}
                      className="flex gap-2.5 md:gap-4"
                    >
                      <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-blue-600/15 border border-blue-500/25 flex items-center justify-center mt-0.5">
                        <Icon size={14} className="text-blue-400 md:hidden" />
                        <Icon size={18} className="text-blue-400 hidden md:block" />
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

            {/* Right: mock UI */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={inViewA ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-w-sm sm:max-w-md lg:max-w-none mx-auto lg:mx-0 w-full"
            >
              <div className="rounded-2xl border border-blue-800/40 bg-gray-900/60 backdrop-blur-sm overflow-hidden shadow-2xl shadow-black/40">
                {/* Mock header */}
                <div className="flex items-center gap-2 px-3 md:px-4 py-2 md:py-3 border-b border-gray-800/60 bg-gray-900/80">
                  <div className="flex gap-1 md:gap-1.5">
                    <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-red-500/60" />
                    <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-yellow-500/60" />
                    <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-green-500/60" />
                  </div>
                  <span className="text-gray-400 text-[10px] md:text-xs ml-1.5 md:ml-2 truncate">INNOWATCH — Live Video on Map</span>
                </div>
                {/* Mock map + feeds */}
                <div className="relative bg-[#0A1628]">
                  {/* Map area with GIS-style background */}
                  <div className="relative p-3 md:p-4 h-[140px] md:h-auto md:min-h-[200px]">
                    {/* Satellite map background */}
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
                    {/* Map pins with pulse */}
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
                    {/* Map overlay — road-like lines */}
                    <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 100 100">
                      <path d="M10,50 Q30,20 50,45 T90,30" stroke="rgba(59,130,246,0.5)" fill="none" strokeWidth="0.5" />
                      <path d="M20,80 Q50,60 80,70" stroke="rgba(59,130,246,0.3)" fill="none" strokeWidth="0.3" />
                    </svg>
                  </div>

                  {/* Camera feeds strip */}
                  <div className="grid grid-cols-3 gap-px bg-gray-800/30 border-t border-blue-900/40">
                    {[
                      'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&q=70',
                      'https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?w=400&q=70',
                      'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=400&q=70',
                    ].map((src, i) => (
                      <div key={i} className="aspect-video bg-[#080e1c] relative overflow-hidden">
                        <img src={src} alt="" className="absolute inset-0 w-full h-full object-cover opacity-40" />
                        <div className="absolute inset-0 bg-[#080e1c]/40" />
                        <div className="absolute top-1 left-1.5 flex items-center gap-1 z-10">
                          <span className="w-1 h-1 rounded-full bg-red-400 animate-pulse" />
                          <span className="text-[9px] sm:text-[8px] md:text-[7px] text-gray-300 md:text-gray-400 font-mono">CAM-{String(i + 1).padStart(3,'0')}</span>
                        </div>
                        <div className="absolute bottom-1 right-1.5 text-[9px] sm:text-[8px] md:text-[7px] text-gray-400 md:text-gray-500 font-mono z-10 truncate max-w-[calc(100%-12px)]">
                          {['서울 강남', '부산 해운대', '인천 송도'][i]}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Bottom status */}
                  <div className="flex items-center justify-between px-3 md:px-4 py-2 border-t border-blue-900/40 bg-[#080e1c]">
                    <div className="flex items-center gap-2 md:gap-3 flex-wrap">
                      <div className="flex items-center gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                        <span className="text-[10px] md:text-[9px] text-gray-300 md:text-gray-400">정상</span>
                      </div>
                      <span className="text-[10px] md:text-[9px] text-gray-600">|</span>
                      <span className="text-[10px] md:text-[9px] text-gray-400 md:text-gray-500">지연: 8ms</span>
                      <span className="text-[10px] md:text-[9px] text-gray-600">|</span>
                      <span className="text-[10px] md:text-[9px] text-gray-400 md:text-gray-500">6 / 12 feeds</span>
                    </div>
                  </div>
                </div>
              </div>

            </motion.div>
          </div>
        </div>
      </VideoSection>

      {/* ── WIZEYE ── */}
      <VideoSection id={isStory ? 'step-02' : undefined} tint="rgba(2,12,24,0.83)">
        <div ref={refB} className="max-w-6xl mx-auto px-5 sm:px-8 md:px-16 lg:px-28 py-12 md:py-20 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-6 md:gap-12 lg:gap-16 items-center">
            {/* Left: mock UI */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={inViewB ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="relative order-2 lg:order-1 max-w-sm sm:max-w-md lg:max-w-none mx-auto lg:mx-0 w-full"
            >
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
                  {/* AI detection viewport */}
                  <div className="relative aspect-[16/10] bg-gray-900 overflow-hidden border-b border-gray-800/50">
                    {/* CCTV background footage */}
                    <img
                      src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&q=70"
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover opacity-25"
                    />
                    <div className="absolute inset-0 bg-[#040C18]/50" />
                    {/* Detection boxes */}
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
                        {/* Tracking crosshair */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className={`w-1 h-1 rounded-full ${box.color.replace('border-', 'bg-')} opacity-60`} />
                        </div>
                      </div>
                    ))}
                    {/* Scan line */}
                    <motion.div
                      className="absolute left-0 right-0 h-px bg-cyan-400/30"
                      animate={{ top: ['5%', '95%', '5%'] }}
                      transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                    />
                    {/* Corner brackets for detection area */}
                    <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-cyan-500/30" />
                    <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-cyan-500/30" />
                    <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-cyan-500/30" />
                    <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-cyan-500/30" />
                  </div>

                  {/* Stats strip */}
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

                  {/* Real-time event log */}
                  <div className="px-3 md:px-4 py-2 md:py-3">
                    <div className="flex items-center justify-between mb-1.5 md:mb-2">
                      <span className="text-[9px] md:text-[10px] text-gray-500 font-mono">EVENT LOG</span>
                      <span className="text-[8px] md:text-[9px] text-cyan-400">LIVE</span>
                    </div>
                    <div className="flex flex-col gap-1 md:gap-1.5">
                      {[
                        { time: '14:23:07', event: '이상 행동 감지 — Zone A', level: 'text-amber-400' },
                        { time: '14:22:51', event: '객체 추적 완료 — ID #847', level: 'text-green-400' },
                        { time: '14:22:34', event: '예측 알림 — 혼잡도 임계치 도달', level: 'text-red-400' },
                      ].map((log) => (
                        <div key={log.time} className="flex items-center gap-1.5 md:gap-2">
                          <span className="text-[8px] md:text-[9px] text-gray-600 font-mono shrink-0">{log.time}</span>
                          <span className={`text-[8px] md:text-[9px] ${log.level}`}>●</span>
                          <span className="text-[9px] md:text-[10px] text-gray-400 truncate">{log.event}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

            </motion.div>

            {/* Right text */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={inViewB ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="order-1 lg:order-2"
            >
              {isStory ? (
                <div className="inline-flex items-center gap-2.5 md:gap-3 mb-3 md:mb-6 flex-wrap">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-600/15 border border-cyan-500/30 text-cyan-300 text-[10px] sm:text-xs font-bold tracking-wider">
                    {tr.steps.s2.badge}
                  </div>
                  <span className="text-[10px] sm:text-xs text-cyan-200/60 font-medium tracking-wide">{tr.steps.s2.role}</span>
                </div>
              ) : (
                <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-cyan-600/15 border border-cyan-500/30 text-cyan-400 text-[10px] sm:text-xs font-bold tracking-wider sm:tracking-widest mb-3 md:mb-6">
                  <span className="sm:hidden">WIZEYE</span>
                  <span className="hidden sm:inline">WIZEYE · AI 실시간 감지</span>
                </div>
              )}
              <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-white leading-[1.25] md:leading-tight mb-2 md:mb-4 break-keep">
                {wizeyeHeadlineOverride ?? tr.products.wizeye.headline}
                {' '}
                <br className="hidden md:block" />
                <span className="animated-gradient">{wizeyeHeadlineSubOverride ?? tr.products.wizeye.headlineSub}</span>
              </h2>
              <p className="text-gray-400 leading-relaxed mb-4 md:mb-8 text-xs sm:text-sm md:text-base break-keep">{wizeyeDescOverride ?? tr.products.wizeye.desc}</p>

              <div className="flex flex-col gap-4 md:gap-5">
                {(wizeyeFeaturesOverride ?? tr.products.wizeye.features).map((f, i) => {
                  const Icon = wizeyeIcons[i]
                  return (
                    <motion.div
                      key={f.title}
                      initial={{ opacity: 0, x: 20 }}
                      animate={inViewB ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.6, delay: 0.15 + i * 0.1 }}
                      className="flex gap-2.5 md:gap-4"
                    >
                      <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-cyan-600/15 border border-cyan-500/25 flex items-center justify-center mt-0.5">
                        <Icon size={14} className="text-cyan-400 md:hidden" />
                        <Icon size={18} className="text-cyan-400 hidden md:block" />
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
          </div>
        </div>
      </VideoSection>
    </div>
  )
}
