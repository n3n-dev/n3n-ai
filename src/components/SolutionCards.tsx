import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  MapPin, Monitor, Network,
  Eye, Brain, Globe,
  ClipboardList, Bell, Zap,
  type LucideIcon,
} from 'lucide-react'
import type { Translations } from '../i18n/translations'

interface Props {
  tr: Translations
  /** Section background. "cream" matches Draft 17 (default); "white"
   *  is used by Draft 14 / 15 / 16 where the page bg under the cards
   *  reads as a clean sheet. */
  bg?: 'cream' | 'white'
}

const ease = [0.16, 1, 0.3, 1] as const

// Card-grid solution section used by Draft 17. Reuses the same content
// surfaced by `SolutionFlowIntro` (tr.flow / tr.products / tr.decision)
// re-laid out as a flex-row of cards. The active card grows wider and
// shows headline + sub + the 3 feature rows (icon + title + desc).
// Inactive cards collapse to a numeral + stage label (COLLECT / ANALYZE
// / DECIDE & ACT). Active card swaps in the brand label (INNOWATCH /
// WIZEYE / CONNECT X) instead.
export default function SolutionCards({ tr, bg = 'cream' }: Props) {
  const sectionBg = bg === 'white' ? '#FFFFFF' : '#F4F2EC'
  const cardChipBg = bg === 'white' ? '#F4F2EC' : '#FFFFFF'
  const inno = tr.products.innowatch
  const wize = tr.products.wizeye
  const dec = tr.decision

  const ACCENT = '#6AA87B'
  const ACCENT_SOFT = '#C8E2C5'

  type Card = {
    num: string
    stage: string   // COLLECT / ANALYZE / DECIDE & ACT (shown when inactive)
    brand: string   // INNOWATCH / WIZEYE / CONNECT X (shown when active)
    title: string
    titleSub: string
    desc: string
    features: { title: string; desc: string }[]
    featureIcons: LucideIcon[]
  }

  const cards: Card[] = [
    {
      num: '01',
      stage: 'COLLECT',
      brand: 'INNOWATCH',
      title: inno.headline,
      titleSub: inno.headlineSub,
      desc: inno.desc,
      features: inno.features,
      featureIcons: [MapPin, Monitor, Network],
    },
    {
      num: '02',
      stage: 'ANALYZE',
      brand: 'WIZEYE',
      title: wize.headline,
      titleSub: wize.headlineSub,
      desc: wize.desc,
      features: wize.features,
      featureIcons: [Eye, Brain, Globe],
    },
    {
      num: '03',
      stage: 'DECIDE & ACT',
      brand: 'CONNECT X',
      title: dec.headline,
      titleSub: dec.headlineSub,
      desc: dec.desc,
      features: dec.features,
      featureIcons: [ClipboardList, Bell, Zap],
    },
  ]

  const [activeIdx, setActiveIdx] = useState<number>(0)

  return (
    <section className="relative w-full" style={{ background: sectionBg }}>
      {/* faint grid */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.55]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(11,11,11,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(11,11,11,0.04) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
        }}
      />

      <div className="relative mx-auto max-w-[1280px] px-6 md:px-10 pt-24 md:pt-32 pb-24 md:pb-32">
        {/* === HEADER === */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease }}
          className="max-w-3xl"
        >
          <h2
            className="font-grotesk font-semibold tracking-tight text-[#0B0B0B] whitespace-pre-line break-keep"
            style={{
              fontSize: 'clamp(36px, 5.6vw, 72px)',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
            }}
          >
            {tr.flow.h2}
          </h2>
          <p className="mt-6 md:mt-8 text-[15px] md:text-base lg:text-lg leading-relaxed text-[#3a3a3a] break-keep max-w-2xl">
            {tr.flow.sub}
          </p>
        </motion.div>

        {/* === CARDS === */}
        <div
          className="mt-16 md:mt-20 flex flex-col md:flex-row gap-5 md:gap-6 items-stretch"
          onMouseLeave={() => setActiveIdx(0)}
        >
          {cards.map((c, i) => {
            const active = i === activeIdx
            return (
              <motion.article
                key={c.num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                onMouseEnter={() => setActiveIdx(i)}
                onFocus={() => setActiveIdx(i)}
                tabIndex={0}
                aria-expanded={active}
                className="relative rounded-[20px] border cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-offset-2 overflow-hidden"
                animate={{
                  flexGrow: active ? 2.6 : 1,
                  boxShadow: active
                    ? '0 24px 60px -20px rgba(31,74,44,0.25), 0 8px 20px -8px rgba(0,0,0,0.06)'
                    : '0 1px 0 rgba(0,0,0,0.02)',
                  borderColor: active ? ACCENT_SOFT : '#E6E2D8',
                }}
                transition={{ duration: 0.55, ease }}
                style={{
                  background: '#FFFFFF',
                  display: 'flex',
                  flexDirection: 'column',
                  flexBasis: 0,
                  height: 460,
                }}
              >
                {/* numeral — when active, brand name renders inline next to
                    the number so the header reads "01. INNOWATCH". */}
                <div
                  className="px-7 pt-7 flex items-baseline gap-3"
                  style={{
                    fontFamily: '"Inter", system-ui, sans-serif',
                    fontSize: active ? 32 : 72,
                    fontWeight: 600,
                    letterSpacing: '-0.02em',
                    lineHeight: 1,
                    color: active ? '#C9C6BD' : '#E5E2D6',
                    transition: 'font-size 0.35s cubic-bezier(0.16,1,0.3,1), color 0.35s cubic-bezier(0.16,1,0.3,1)',
                  }}
                >
                  <span>{active ? `${c.num}.` : `${c.num}.`}</span>
                  {active && <span>{c.brand}</span>}
                </div>

                {/* === ACTIVE: top = brand + title/sub, bottom = feature list === */}
                <AnimatePresence initial={false}>
                  {active && (
                    <motion.div
                      key="active-body"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3, ease }}
                      className="flex flex-col flex-1 justify-between"
                    >
                      {/* TOP — title + sub (brand is now inline with the numeral above) */}
                      <div className="px-7 mt-5">
                        <h3
                          className="font-grotesk font-semibold text-[#0B0B0B] break-keep"
                          style={{
                            fontSize: 24,
                            lineHeight: 1.2,
                            letterSpacing: '-0.015em',
                          }}
                        >
                          {c.title}
                          <br />
                          {c.titleSub}
                        </h3>
                      </div>

                      {/* BOTTOM — feature list */}
                      <ul className="px-7 pb-7 pt-8 space-y-4">
                        {c.features.map((f, fi) => {
                          const FIcon = c.featureIcons[fi] ?? MapPin
                          return (
                            <li key={f.title} className="flex items-start gap-3.5">
                              <span
                                className="inline-flex h-9 w-9 items-center justify-center rounded-[10px] shrink-0"
                                style={{
                                  background: cardChipBg,
                                  color: ACCENT,
                                  border: `1px solid ${ACCENT_SOFT}`,
                                }}
                              >
                                <FIcon size={16} />
                              </span>
                              <div className="min-w-0">
                                <div
                                  className="font-grotesk font-semibold text-[#0B0B0B] break-keep"
                                  style={{ fontSize: 14, lineHeight: 1.3 }}
                                >
                                  {f.title}
                                </div>
                                <div
                                  className="mt-0.5 text-[#5a5a5a] break-keep"
                                  style={{ fontSize: 12, lineHeight: 1.45 }}
                                >
                                  {f.desc}
                                </div>
                              </div>
                            </li>
                          )
                        })}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* spacer pushes the inactive footer to the bottom */}
                {!active && <div className="flex-1" />}

                {/* === INACTIVE: stage label at the bottom === */}
                <AnimatePresence initial={false}>
                  {!active && (
                    <motion.div
                      key="inactive-footer"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.3, ease }}
                      className="px-7 pb-7"
                    >
                      <span
                        style={{
                          fontFamily: '"Inter", system-ui, sans-serif',
                          fontSize: '13px',
                          fontWeight: 600,
                          letterSpacing: '0.18em',
                          textTransform: 'uppercase',
                          color: '#E5E2D6',
                        }}
                      >
                        {c.stage}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
