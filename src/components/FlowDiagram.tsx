import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import {
  Video,
  Waypoints,
  Monitor,
  Cloud,
  ScanSearch,
  BellRing,
  LayoutDashboard,
  PlayCircle,
} from 'lucide-react'

type Node = { Icon: LucideIcon; label: string }

const inputs: Node[] = [
  { Icon: Video, label: 'Video Streams' },
  { Icon: Waypoints, label: 'IoT Sensors' },
  { Icon: Monitor, label: 'Edge Systems' },
  { Icon: Cloud, label: 'Multi-cloud' },
]

const outcomes: Node[] = [
  { Icon: ScanSearch, label: 'Detection' },
  { Icon: BellRing, label: 'Alerts' },
  { Icon: LayoutDashboard, label: 'Dashboard' },
  { Icon: PlayCircle, label: 'Actions' },
]

/* Row y-centers in viewBox space (0-360) for 4 items */
const ROW_Y = [45, 135, 225, 315]

/* x coords: source edge, hub center, outcome edge */
const SRC_X = 110
const HUB_X = 250
const OUT_X = 390
const HUB_Y = 180

/* Build curved bezier path from (x,y) to hub */
const toHub = (x: number, y: number) =>
  `M ${x} ${y} C ${(x + HUB_X) / 2 + 30} ${y}, ${(x + HUB_X) / 2 - 10} ${HUB_Y}, ${HUB_X} ${HUB_Y}`

/* Build curved bezier path from hub to (x,y) */
const fromHub = (x: number, y: number) =>
  `M ${HUB_X} ${HUB_Y} C ${(HUB_X + x) / 2 + 10} ${HUB_Y}, ${(HUB_X + x) / 2 - 30} ${y}, ${x} ${y}`

interface FlowDiagramProps {
  outputLabels?: string[]
}

export default function FlowDiagram({ outputLabels }: FlowDiagramProps = {}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const renderedOutcomes: Node[] = outputLabels
    ? outcomes.map((o, i) => ({ ...o, label: outputLabels[i] ?? o.label }))
    : outcomes

  return (
    <div ref={ref} className="relative w-full mx-auto max-w-[540px]">
      {/* Aspect-ratio wrapper for the pipeline itself */}
      <div className="relative w-full" style={{ aspectRatio: '500 / 360' }}>
        {/* SVG paths + animated dots */}
        <svg
          className="absolute inset-0 w-full h-full overflow-visible"
          viewBox="0 0 500 360"
          preserveAspectRatio="none"
        >
          <defs>
            <radialGradient id="fd-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(59,130,246,0.35)" />
              <stop offset="60%" stopColor="rgba(59,130,246,0.08)" />
              <stop offset="100%" stopColor="rgba(59,130,246,0)" />
            </radialGradient>
          </defs>

          {/* Center glow */}
          <circle cx={HUB_X} cy={HUB_Y} r="110" fill="url(#fd-glow)" />

          {/* Input paths */}
          {ROW_Y.map((y, i) => (
            <motion.path
              key={`in-${i}`}
              d={toHub(SRC_X, y)}
              stroke="rgba(59,130,246,0.55)"
              strokeWidth="1.2"
              strokeDasharray="2 4"
              fill="none"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={inView ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ duration: 0.9, delay: 0.2 + i * 0.08, ease: 'easeOut' }}
            />
          ))}

          {/* Output paths */}
          {ROW_Y.map((y, i) => (
            <motion.path
              key={`out-${i}`}
              d={fromHub(OUT_X, y)}
              stroke="rgba(34,211,238,0.55)"
              strokeWidth="1.2"
              strokeDasharray="2 4"
              fill="none"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={inView ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ duration: 0.9, delay: 0.5 + i * 0.08, ease: 'easeOut' }}
            />
          ))}

          {/* Animated flowing dots along input paths */}
          {ROW_Y.map((y, i) => (
            <circle key={`in-dot-${i}`} r="2.2" fill="#60a5fa">
              <animateMotion dur={`${3 + i * 0.4}s`} repeatCount="indefinite" begin={`${i * 0.5}s`}>
                <mpath href={`#fd-in-${i}`} />
              </animateMotion>
            </circle>
          ))}
          {ROW_Y.map((y, i) => (
            <circle key={`out-dot-${i}`} r="2.2" fill="#22d3ee">
              <animateMotion dur={`${3 + i * 0.4}s`} repeatCount="indefinite" begin={`${i * 0.5 + 1.5}s`}>
                <mpath href={`#fd-out-${i}`} />
              </animateMotion>
            </circle>
          ))}

          {/* Invisible reference paths for mpath refs */}
          {ROW_Y.map((y, i) => (
            <path key={`in-ref-${i}`} id={`fd-in-${i}`} d={toHub(SRC_X, y)} fill="none" stroke="none" />
          ))}
          {ROW_Y.map((y, i) => (
            <path key={`out-ref-${i}`} id={`fd-out-${i}`} d={fromHub(OUT_X, y)} fill="none" stroke="none" />
          ))}
        </svg>

        {/* Side vertical labels */}
        <span className="absolute left-0 top-1/2 -translate-y-1/2 -rotate-90 origin-center text-[9px] font-semibold tracking-[0.35em] uppercase text-gray-400 dark:text-gray-500 select-none">
          Sources
        </span>
        <span className="absolute right-0 top-1/2 -translate-y-1/2 rotate-90 origin-center text-[9px] font-semibold tracking-[0.35em] uppercase text-gray-400 dark:text-gray-500 select-none">
          Outcomes
        </span>

        {/* Source cards (left) */}
        <div className="absolute left-[5%] top-0 h-full flex flex-col justify-between py-[3%]">
          {inputs.map((n, i) => (
            <motion.div
              key={n.label}
              initial={{ opacity: 0, x: -12 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
            >
              <Chip {...n} />
            </motion.div>
          ))}
        </div>

        {/* Outcome cards (right) */}
        <div className="absolute right-[5%] top-0 h-full flex flex-col justify-between py-[3%]">
          {renderedOutcomes.map((n, i) => (
            <motion.div
              key={n.label}
              initial={{ opacity: 0, x: 12 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 + i * 0.08 }}
            >
              <Chip {...n} accent />
            </motion.div>
          ))}
        </div>

        {/* Core hub — centered */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
        >
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex flex-col items-center justify-center shadow-2xl shadow-blue-500/40 ring-4 ring-blue-400/10">
            <span className="text-white font-bold text-base md:text-lg leading-none tracking-tight">N3N</span>
            <span className="text-blue-50/90 text-[9px] md:text-[10px] tracking-[0.2em] uppercase mt-1">
              Core OS
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function Chip({ Icon, label, accent }: Node & { accent?: boolean }) {
  return (
    <div
      className={`flex items-center gap-1.5 px-2 py-1.5 rounded-md border backdrop-blur-sm ${
        accent
          ? 'border-cyan-400/40 bg-cyan-500/[0.08] dark:bg-cyan-500/10'
          : 'border-blue-400/40 bg-blue-500/[0.08] dark:bg-blue-500/10'
      }`}
    >
      <Icon
        size={14}
        className={
          accent
            ? 'text-cyan-500 dark:text-cyan-300 shrink-0'
            : 'text-blue-500 dark:text-blue-300 shrink-0'
        }
      />
      <span
        className={`text-[10px] font-semibold tracking-[0.02em] leading-none whitespace-nowrap ${
          accent ? 'text-cyan-700 dark:text-cyan-100' : 'text-blue-700 dark:text-blue-100'
        }`}
      >
        {label}
      </span>
    </div>
  )
}
