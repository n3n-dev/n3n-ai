import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Copy, MapPin, Maximize2, TrendingUp, TrendingDown } from 'lucide-react'
import HeroGa from '../components/HeroGa'
import DraftSwitcher from '../components/DraftSwitcher'
import type { Translations, Lang } from '../i18n/translations'

// Mini card-canvas — slow breathing dot field. Used inside the 2x2 grid
// cards' left panel and the closing right panel, mirroring the reference's
// `card-canvas` data-pattern decoration.
function CardCanvas({ tone = 'gray' }: { tone?: 'gray' | 'indigo' }) {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    let raf = 0
    let W = 0
    let H = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    type D = { x: number; y: number; r: number; phase: number }
    let dots: D[] = []
    const build = () => {
      const rect = canvas.getBoundingClientRect()
      W = rect.width
      H = rect.height
      canvas.width = Math.floor(W * dpr)
      canvas.height = Math.floor(H * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const step = 14
      dots = []
      for (let y = step / 2; y < H; y += step) {
        for (let x = step / 2; x < W; x += step) {
          dots.push({ x, y, r: 1, phase: (x * 0.011 + y * 0.013) % (Math.PI * 2) })
        }
      }
    }
    const tick = (t: number) => {
      ctx.clearRect(0, 0, W, H)
      const breath = 0.55 + 0.45 * Math.sin(t * 0.001)
      for (const d of dots) {
        const local = 0.4 + 0.6 * Math.sin(t * 0.0011 + d.phase)
        const cxDist = Math.hypot(d.x - W / 2, d.y - H / 2)
        const fade = Math.max(0.15, 1 - cxDist / Math.max(W, H))
        const alpha = (0.3 * local + 0.15 * breath) * fade
        ctx.beginPath()
        ctx.arc(d.x, d.y, d.r * (0.85 + 0.15 * breath), 0, Math.PI * 2)
        ctx.fillStyle =
          tone === 'indigo'
            ? `rgba(99,102,241,${alpha.toFixed(3)})`
            : `rgba(17,24,39,${alpha.toFixed(3)})`
        ctx.fill()
      }
      raf = requestAnimationFrame(tick)
    }
    build()
    raf = requestAnimationFrame(tick)
    window.addEventListener('resize', build)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', build)
    }
  }, [tone])
  return <canvas ref={ref} className="absolute inset-0 h-full w-full" aria-hidden />
}

interface Props {
  tr: Translations
  lang: Lang
}

const display: React.CSSProperties = {
  fontFamily: '"Newsreader", "Newsreader Display", Georgia, serif',
  fontWeight: 400,
  letterSpacing: '-0.025em',
  lineHeight: 1.05,
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

const reveal = {
  initial: { opacity: 0, y: 8 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] },
}

function ProgressBar({ filled, total = 7, color }: { filled: number; total?: number; color: string }) {
  return (
    <div className="flex items-center gap-[2px]">
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className="block h-3 w-1.5 rounded-[2px]"
          style={{ background: i < filled ? color : '#E5E7EB' }}
        />
      ))}
    </div>
  )
}

function TaskRows({
  rows,
}: {
  rows: { filled: number; total: number; label: string; color: string }[]
}) {
  return (
    <div className="flex flex-col gap-1.5">
      {rows.map((r) => (
        <div key={r.label} className="flex items-center gap-3">
          <ProgressBar filled={r.filled} total={r.total} color={r.color} />
          <span className="tabular-nums text-[#6B7280]" style={label}>
            {r.filled}/{r.total}
          </span>
          <span className="text-[#9CA3AF]" style={label}>
            · {r.label}
          </span>
        </div>
      ))}
    </div>
  )
}

function DotWorldMap({ tone = '#A5B4FC' }: { tone?: string }) {
  const map = [
    '       ........                                ',
    '     ............         ......               ',
    '   ......  .......      ............           ',
    ' .... ..   ........   ................         ',
    ' ....       ......    .................   .... ',
    '  ...        ...    ......... ........  .....  ',
    '   .          .   ..............  .  .. .....  ',
    '              .  ................     . .....  ',
    '                ........  .........    ..... . ',
    '                ......     ...  ..      ....   ',
    '                ......      .            ....  ',
    '                 ....                     ...  ',
    '                 ...                       .   ',
    '                  ..                            ',
  ]
  const dots: { cx: number; cy: number }[] = []
  map.forEach((row, y) => {
    for (let x = 0; x < row.length; x++) {
      if (row[x] === '.') dots.push({ cx: x * 8 + 4, cy: y * 8 + 4 })
    }
  })
  const w = 48 * 8
  const h = map.length * 8
  return (
    <svg
      aria-hidden
      viewBox={`0 0 ${w} ${h}`}
      className="absolute inset-0 h-full w-full opacity-90"
      preserveAspectRatio="xMidYMid meet"
    >
      {dots.map((d, i) => (
        <circle key={i} cx={d.cx} cy={d.cy} r={1.4} fill={tone} />
      ))}
    </svg>
  )
}

function PrimaryButton({ children, dark = true }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <button
      type="button"
      className={`inline-flex items-center gap-1.5 rounded-[6px] px-4 py-2 transition-colors ${
        dark ? 'bg-black text-white hover:bg-[#111827]' : 'border border-[#E5E7EB] bg-white text-[#111827] hover:bg-[#F9FAFB]'
      }`}
      style={{ fontSize: '12px', fontWeight: 500, lineHeight: '16px', letterSpacing: '-0.6px', boxShadow: dark ? 'none' : 'rgba(0,0,0,0.05) 0px 1px 2px 0px' }}
    >
      {children}
    </button>
  )
}

function GhostButton({ children }: { children: React.ReactNode }) {
  return <PrimaryButton dark={false}>{children}</PrimaryButton>
}

function TimeTabs() {
  const items = ['1D', '7D', '1M']
  return (
    <div className="inline-flex items-center gap-0.5 rounded-[4px] border border-[#E5E7EB] bg-white p-0.5">
      {items.map((t, i) => (
        <button
          key={t}
          type="button"
          className={`rounded-[4px] px-2 py-0.5 ${
            i === 1 ? 'bg-[#F3F4F6] text-[#111827]' : 'text-[#9CA3AF] hover:text-[#111827]'
          }`}
          style={{ fontSize: '9px', fontWeight: 400, lineHeight: '13.5px', letterSpacing: '-0.45px' }}
        >
          {t}
        </button>
      ))}
    </div>
  )
}

function DiagonalStripes({ className = '' }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`absolute inset-0 ${className}`}
      style={{
        background:
          'repeating-linear-gradient(135deg, #F3F4F6 0px, #F3F4F6 1px, transparent 1px, transparent 14px)',
      }}
    />
  )
}

function DotGridBg() {
  return (
    <div
      aria-hidden
      className="absolute inset-0"
      style={{
        backgroundImage: 'radial-gradient(rgba(17,24,39,0.18) 1px, transparent 1px)',
        backgroundSize: '14px 14px',
      }}
    />
  )
}

function AvatarStack() {
  const colors = ['#9CA3AF', '#6B7280', '#4B5563']
  return (
    <div className="flex -space-x-2">
      {colors.map((c, i) => (
        <span
          key={i}
          className="inline-block h-6 w-6 rounded-full border-2 border-white"
          style={{ background: c }}
          aria-hidden
        />
      ))}
    </div>
  )
}

export default function DraftGaPage({ tr, lang }: Props) {
  const [tab, setTab] = useState(0)

  // ─────── Hero copy (mirrors Draft 3) ───────
  const heroH1 =
    lang === 'ko'
      ? 'Transforming Video\ninto Decisions'
      : 'Transforming Video\ninto Decisions'
  const heroSub =
    lang === 'ko'
      ? 'AI 기반 데이터·영상 분석 플랫폼을 통해 실시간으로 상황을 판단하고 즉시 문제 해결까지 지원합니다.'
      : 'An AI-driven data and video analytics platform that assesses situations in real time and drives immediate problem resolution.'

  // ─────── Twin product cards — INNOWATCH / WIZEYE (Draft 3 copy) ───────
  const twinCards =
    lang === 'ko'
      ? [
          {
            title: 'INNOWATCH',
            sub: '지도 기반으로 CCTV와 IoT 데이터를 통합하여 현장 상황을 한눈에 파악합니다.',
            location: 'Smart City · Public Infra',
            engaged: '+25 운영 사이트 가동 중',
            delta: '+12.4%',
            up: true,
            tasks: [
              { filled: 5, total: 7, label: '카메라 커버리지', color: '#22C55E' },
              { filled: 5, total: 7, label: '엣지 노드', color: '#22C55E' },
              { filled: 2, total: 7, label: '대기 알림', color: '#F87171' },
            ],
          },
          {
            title: 'WIZEYE',
            sub: 'AI가 이상 징후를 실시간으로 감지하고, 문제 발생 전에 선제 대응을 가능하게 합니다.',
            location: 'Industrial · Logistics',
            engaged: '+40 고객사 운영 중',
            delta: '+8.3%',
            up: true,
            tasks: [
              { filled: 7, total: 7, label: '실시간 감지', color: '#22C55E' },
              { filled: 6, total: 7, label: '추적 정확도', color: '#22C55E' },
              { filled: 2, total: 7, label: '오탐 큐', color: '#F87171' },
            ],
          },
        ]
      : [
          {
            title: 'INNOWATCH',
            sub: 'Unify CCTV and IoT data on a single map to capture the full field situation at a glance.',
            location: 'Smart City · Public Infra',
            engaged: '+25 operations live',
            delta: '+12.4%',
            up: true,
            tasks: [
              { filled: 5, total: 7, label: 'Camera coverage', color: '#22C55E' },
              { filled: 5, total: 7, label: 'Edge nodes', color: '#22C55E' },
              { filled: 2, total: 7, label: 'Alert backlog', color: '#F87171' },
            ],
          },
          {
            title: 'WIZEYE',
            sub: 'AI detects anomalies in real time, enabling preemptive response before issues occur.',
            location: 'Industrial · Logistics',
            engaged: '+40 customers in production',
            delta: '+8.3%',
            up: true,
            tasks: [
              { filled: 7, total: 7, label: 'Real-time detection', color: '#22C55E' },
              { filled: 6, total: 7, label: 'Tracking accuracy', color: '#22C55E' },
              { filled: 2, total: 7, label: 'False positive', color: '#F87171' },
            ],
          },
        ]

  // ─────── Operation Intelligence — section 2 ───────
  const opTitle =
    lang === 'ko'
      ? '의사결정을 다시 정의하는\n실시간 운영 인텔리전스'
      : 'Operational Intelligence\nacross every industry'
  const officialMetric = lang === 'ko' ? '1B+' : '1B+'
  const officialMetricSub = lang === 'ko' ? '일 처리 프레임' : 'frames processed daily'
  const opBodyHead =
    lang === 'ko'
      ? '현장 데이터를 실시간으로 연결하고 즉시 의사결정으로 전환합니다'
      : 'A high-performance data intelligence platform built on AI, GPU, and cloud'
  const opBody =
    lang === 'ko'
      ? '흩어진 영상·IoT·운영 데이터를 하나의 신호로 묶고, INNOWATCH와 WIZEYE가 의사결정에 필요한 패턴을 우선 노출합니다. 운영 데이터를 인사이트로 전환해 기업의 실행력을 극대화합니다.'
      : 'INNOWATCH and WIZEYE connect and analyze fragmented field data in real time, setting a new standard for faster, more accurate decision-making. Operational data becomes insight, and insight becomes execution.'

  // ─────── Capability tabs (replaces Diversification / Options / …) ───────
  const tabItems =
    lang === 'ko'
      ? ['Cloud Native', 'Edge AI', 'Enterprise Security', 'Instant Deploy', 'Mobility']
      : ['Cloud Native', 'Edge AI', 'Enterprise Security', 'Instant Deploy', 'Mobility']

  // 2x2 grid — six business areas distilled into four; each card title in
  // Newsreader display, mirroring the reference layout.
  const gridItems =
    lang === 'ko'
      ? [
          { title: '스마트시티\n통합 관제', desc: '도시 전역 교통·환경·안전 데이터 통합 관제.' },
          { title: 'SOC 보안\n실시간 분석', desc: '수천 대 카메라 영상 AI 실시간 분석.' },
          { title: '스마트 팩토리\n예측 정비', desc: '생산 라인 불량·설비 이상 실시간 감지.' },
          { title: '데이터센터\n무중단 운영', desc: '서버룸 환경 감시·출입 통제·장비 상태.' },
        ]
      : [
          { title: 'Smart City\nUnified Ops', desc: 'Citywide traffic, environment, and safety operations.' },
          { title: 'SOC Security\nReal-time AI', desc: 'AI analyzes thousands of camera feeds in real time.' },
          { title: 'Smart Factory\nPredictive Care', desc: 'Detect line defects and equipment anomalies.' },
          { title: 'Data Center\nNon-stop Ops', desc: 'Environment, access, and equipment-state oversight.' },
        ]

  // ─────── Closing — opint pre/highlight + business marquee + stats ───────
  const closingLeftHead =
    lang === 'ko'
      ? '실시간 데이터 통합과 AI 분석을 통한 의사결정 혁신'
      : 'Decision-making reimagined through real-time data integration and AI analytics.'
  const closingLeftBody =
    lang === 'ko'
      ? 'INNOWATCH와 WIZEYE — 운영 데이터를 인사이트로 전환하여 기업의 실행력을 극대화합니다.'
      : 'INNOWATCH + WIZEYE — Turn operational data into insight and maximize enterprise execution.'
  const closingRightHead =
    lang === 'ko'
      ? 'Cities, Plants,\nCenters, and Logistics'
      : 'Cities, Plants,\nCenters, and Logistics'

  const stats =
    lang === 'ko'
      ? [
          { v: '1B+', d: '하루 처리 프레임 — INNOWATCH × WIZEYE 통합 파이프라인.' },
          { v: '40ms', d: '평균 감지 지연 — 객체 탐지·분류·추적까지 실시간.' },
          { v: '99.7%', d: '운영 환경에서 검증된 모델 정확도.' },
        ]
      : [
          { v: '1B+', d: 'Frames processed daily across the unified INNOWATCH × WIZEYE pipeline.' },
          { v: '40ms', d: 'Median detection latency — detect, classify, and track in real time.' },
          { v: '99.7%', d: 'Model accuracy validated in production deployments.' },
        ]

  return (
    <main className="bg-white text-[#111827]">
      {/* Floating dark-on-white draft switcher (same buttons as Draft 0.5) */}
      <DraftSwitcher theme="dark" active="Draft 가" />

      <HeroGa tr={tr} lang={lang} h1Override={heroH1} subheadOverride={heroSub} />

      {/* TWIN PRODUCT CARDS — INNOWATCH / WIZEYE */}
      <section className="border-b border-[#E5E7EB]">
        <div className="mx-auto grid max-w-[1500px] grid-cols-1 lg:grid-cols-2">
          {twinCards.map((c, i) => (
            <motion.article
              key={c.title}
              {...reveal}
              className={`relative px-6 md:px-10 pt-12 pb-10 ${
                i === 1 ? 'lg:border-l border-[#E5E7EB]' : ''
              }`}
            >
              <div className="relative h-[260px] md:h-[320px] mb-8">
                <DotWorldMap tone={i === 0 ? '#A5B4FC' : '#C7D2FE'} />
                <div className="absolute right-0 bottom-0">
                  <GhostButton>
                    <Copy size={12} /> Copy link
                  </GhostButton>
                </div>
                <div className="absolute left-0 bottom-0">
                  <TaskRows rows={c.tasks} />
                </div>
              </div>

              <div className="flex items-start justify-between gap-4">
                <h3
                  className="break-keep text-[#0F172A]"
                  style={{ ...display, fontSize: 'clamp(28px, 3.4vw, 44px)' }}
                >
                  {c.title}
                </h3>
                <div className="flex items-center gap-2 whitespace-nowrap">
                  <span className="text-[#9CA3AF]" style={label}>
                    Today
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 rounded-[6px] px-2 py-1 ${
                      c.up ? 'bg-[#EDFAF2] text-[#188A42]' : 'bg-[#FEF4F4] text-[#AE4F4F]'
                    }`}
                    style={{ fontSize: '10px', fontWeight: 500, lineHeight: '15px', letterSpacing: '-0.5px' }}
                  >
                    {c.up ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                    {c.delta}
                  </span>
                </div>
              </div>

              <p className="mt-3 max-w-[42ch] text-[#9CA3AF]" style={body}>
                {c.sub}
              </p>

              <div className="mt-4 inline-flex items-center gap-1.5 text-[#9CA3AF]" style={link}>
                <MapPin size={12} />
                {c.location}
              </div>

              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <AvatarStack />
                  <span className="text-[#9CA3AF]" style={link}>
                    {c.engaged}
                  </span>
                </div>
                <PrimaryButton>
                  <Maximize2 size={12} /> Expand
                </PrimaryButton>
              </div>

              {i === 1 && (
                <button
                  type="button"
                  aria-label="Next"
                  className="hidden lg:inline-flex absolute -left-7 top-[150px] h-12 w-12 items-center justify-center rounded-full bg-black text-white shadow-[rgba(0,0,0,0.15)_0px_4px_12px]"
                >
                  <ArrowRight size={16} />
                </button>
              )}
            </motion.article>
          ))}
        </div>
      </section>

      {/* OPERATION INTELLIGENCE — section title */}
      <section className="border-b border-[#E5E7EB]">
        <div className="mx-auto max-w-[1500px] px-6 md:px-10 pt-16 md:pt-24 pb-10">
          <motion.h2
            {...reveal}
            className="break-keep whitespace-pre-line text-[#0F172A]"
            style={{ ...display, fontSize: 'clamp(36px, 5.6vw, 80px)' }}
          >
            {opTitle}
          </motion.h2>
        </div>

        {/* OFFICIAL split — 1B+ frames */}
        <div className="mx-auto grid max-w-[1500px] grid-cols-1 lg:grid-cols-2 border-t border-[#E5E7EB]">
          <motion.div
            {...reveal}
            className="relative min-h-[460px] bg-[#F9FAFB] p-8 md:p-12 overflow-hidden"
          >
            <DiagonalStripes />
            <div className="relative h-full flex flex-col">
              <div className="flex-1" />
              <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-6 items-end">
                <div>
                  <div
                    className="text-[#0F172A] tabular-nums"
                    style={{ ...display, fontSize: 'clamp(64px, 9vw, 128px)', lineHeight: 1 }}
                  >
                    {officialMetric}
                  </div>
                  <p className="mt-3 max-w-[36ch] text-[#9CA3AF] uppercase" style={label}>
                    {officialMetricSub}
                  </p>
                </div>
                <TaskRows
                  rows={[
                    { filled: 7, total: 7, label: lang === 'ko' ? '실시간' : 'Real-time', color: '#22C55E' },
                    { filled: 5, total: 7, label: lang === 'ko' ? 'AI 정확도' : 'Accuracy', color: '#22C55E' },
                    { filled: 2, total: 7, label: lang === 'ko' ? '오탐' : 'False positive', color: '#F87171' },
                  ]}
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            {...reveal}
            className="relative p-8 md:p-12 lg:border-l border-[#E5E7EB]"
          >
            <h3 className="text-[#0F172A]" style={{ ...display, fontSize: '20px' }}>
              {opBodyHead}
            </h3>

            <p className="mt-5 max-w-[58ch] text-[#9CA3AF]" style={body}>
              {opBody}
            </p>

            <div className="mt-8 flex items-center gap-3">
              <button
                type="button"
                role="switch"
                aria-checked="false"
                className="relative inline-flex h-5 w-9 items-center rounded-full bg-[#E5E7EB] transition-colors hover:bg-[#D1D5DB]"
              >
                <span className="absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white shadow-[rgba(0,0,0,0.1)_0px_1px_3px]" />
              </button>
              <span className="text-[#111827]" style={link}>
                {lang === 'ko' ? '도입 알림 받기' : 'Get rollout updates'}
              </span>
            </div>

            <div className="mt-12 flex items-end justify-between">
              <div
                aria-hidden
                className="h-12 w-24 opacity-50"
                style={{
                  backgroundImage: 'radial-gradient(rgba(17,24,39,0.3) 1px, transparent 1px)',
                  backgroundSize: '6px 6px',
                }}
              />
              <div className="flex items-center gap-3">
                <AvatarStack />
                <a href="#" className="border-b border-[#9CA3AF] pb-px text-[#6B7280]" style={link}>
                  {lang === 'ko' ? '운영 사례 전체 보기' : 'See the complete case archive'}
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CAPABILITY TABS + 2x2 GRID */}
      <section className="bg-[#F9FAFB] border-b border-[#E5E7EB]">
        <div className="mx-auto max-w-[1500px] px-6 md:px-10 pt-10">
          <div className="flex items-center gap-4 md:gap-8 overflow-x-auto pb-2">
            {tabItems.map((t, i) => {
              const active = i === tab
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTab(i)}
                  className={`whitespace-nowrap rounded-[4px] px-3 py-1.5 transition-colors ${
                    active
                      ? 'border border-dotted border-[#D1D5DB] bg-white text-[#111827]'
                      : 'text-[#9CA3AF] hover:text-[#111827]'
                  }`}
                  style={link}
                >
                  {t}
                </button>
              )
            })}
          </div>
        </div>

        <div className="mx-auto max-w-[1500px] px-6 md:px-10 py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {gridItems.map((g) => (
              <motion.article
                key={g.title}
                {...reveal}
                className="grid grid-cols-2 overflow-hidden rounded-[8px] border border-[#E5E7EB] bg-white shadow-[rgba(0,0,0,0.05)_0px_1px_2px_0px,rgba(0,0,0,0.06)_0px_8px_24px_-12px]"
              >
                <div className="relative bg-[#F3F4F6] p-4 min-h-[280px] overflow-hidden">
                  <CardCanvas tone="gray" />
                  <div className="absolute left-4 bottom-4 z-[1]">
                    <GhostButton>
                      <Copy size={12} /> Copy link
                    </GhostButton>
                  </div>
                </div>

                <div className="flex flex-col justify-between p-6 md:p-8">
                  <div>
                    <h3
                      className="whitespace-pre-line break-keep text-[#0F172A]"
                      style={{ ...display, fontSize: 'clamp(22px, 2.4vw, 30px)', lineHeight: 1.1 }}
                    >
                      {g.title}
                    </h3>
                    <p className="mt-3 max-w-[28ch] text-[#9CA3AF]" style={body}>
                      {g.desc}
                    </p>
                  </div>
                  <div className="mt-6 flex items-center gap-2">
                    <TimeTabs />
                    <PrimaryButton>
                      <Maximize2 size={12} /> Expand
                    </PrimaryButton>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* CLOSING — split + stats */}
      <section>
        <div className="mx-auto grid max-w-[1500px] grid-cols-1 lg:grid-cols-[1fr_2fr] border-b border-[#E5E7EB]">
          <motion.div {...reveal} className="relative p-8 md:p-12 bg-white">
            <p className="text-[#111827]" style={link}>
              {closingLeftHead}
            </p>
            <p className="mt-6 max-w-[36ch] text-[#9CA3AF]" style={body}>
              {closingLeftBody}
            </p>

            <div className="mt-8 flex items-center gap-3">
              <button
                type="button"
                role="switch"
                aria-checked="false"
                className="relative inline-flex h-5 w-9 items-center rounded-full bg-[#E5E7EB]"
              >
                <span className="absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white" />
              </button>
              <span className="text-[#111827]" style={link}>
                {lang === 'ko' ? '도입 상담 알림' : 'Reminder'}
              </span>
            </div>

            <div
              aria-hidden
              className="mt-16 h-20 w-32 opacity-60"
              style={{
                backgroundImage: 'radial-gradient(rgba(17,24,39,0.3) 1px, transparent 1px)',
                backgroundSize: '8px 8px',
              }}
            />
          </motion.div>

          <motion.div {...reveal} className="relative bg-[#F9FAFB] p-8 md:p-12 overflow-hidden">
            <DotGridBg />
            <div className="relative">
              <h2
                className="break-keep whitespace-pre-line text-[#0F172A]"
                style={{ ...display, fontSize: 'clamp(28px, 4vw, 56px)' }}
              >
                {closingRightHead}
              </h2>
            </div>
            <div className="relative mt-24 flex justify-end">
              <div className="rounded-[8px] border border-[#E5E7EB] bg-white p-3 shadow-[rgba(0,0,0,0.05)_0px_1px_2px_0px]">
                <TaskRows
                  rows={[
                    { filled: 5, total: 7, label: lang === 'ko' ? '카메라' : 'Cameras', color: '#22C55E' },
                    { filled: 5, total: 7, label: lang === 'ko' ? '엣지' : 'Edge', color: '#22C55E' },
                    { filled: 2, total: 7, label: lang === 'ko' ? '오탐' : 'False positive', color: '#F87171' },
                  ]}
                />
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mx-auto max-w-[1500px] px-6 md:px-10 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 text-center">
            {stats.map((s) => (
              <motion.div key={s.v} {...reveal}>
                <div
                  className="text-[#0F172A]"
                  style={{ ...display, fontSize: 'clamp(56px, 8vw, 112px)' }}
                >
                  {s.v}
                </div>
                <p className="mx-auto mt-3 max-w-[28ch] text-[#9CA3AF]" style={body}>
                  {s.d}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
