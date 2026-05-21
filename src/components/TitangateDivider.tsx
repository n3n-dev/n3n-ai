import type { Lang } from '../i18n/translations'

interface Props {
  lang: Lang
}

/**
 * Titangate-style section divider strip.
 * No hard lines (the marching-ants now lives inside the Hero above LIVE).
 * Background fades at the bottom so the strip visually continues into
 * whatever section follows — no hard boundary.
 */
export default function TitangateDivider({ lang: _lang }: Props) {
  void _lang

  return (
    <section className="relative bg-gradient-to-b from-[#060810] via-[#060810] to-transparent">

      <div className="relative mx-auto max-w-[1280px] px-8 md:px-12 pt-5 md:pt-6 pb-28 md:pb-40 grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)_minmax(0,auto)] gap-6 md:gap-10 items-center">
        {/* Left: brand tag + serial */}
        <div className="font-grotesk text-[10px] md:text-[11px] uppercase tracking-[0.22em] leading-[1.75] text-white">
          <div>
            <MottledText>N3N</MottledText>
            <span className="opacity-10 mx-2">|</span>
            <MottledText>N3N AI</MottledText>
          </div>
          <div className="flex items-center gap-3">
            <MottledText>001</MottledText>
            <PulseDots />
            <MottledText>A NEW CLASS OF OPERATION</MottledText>
          </div>
        </div>

        {/* Middle: tagline */}
        <div className="font-grotesk text-[10px] md:text-[11px] uppercase tracking-[0.22em] leading-[1.75] text-white">
          <div>
            <MottledText>WHERE OTHERS WATCH THE OBVIOUS,</MottledText>
          </div>
          <div>
            <MottledText>WE DECODE WHAT MOVES BEHIND IT.</MottledText>
          </div>
        </div>

        {/* Right: Static system code */}
        <div className="flex items-center justify-end gap-2 md:gap-2.5">
          <div className="font-grotesk text-[9px] md:text-[10px] uppercase tracking-[0.22em] leading-[1.05] text-right text-white">
            <div><MottledText>N3N</MottledText></div>
            <div><MottledText>OS</MottledText></div>
          </div>
          <div className="font-grotesk text-[34px] md:text-[42px] font-extralight leading-none tracking-[0.02em] tabular-nums text-white/55">
            0042
          </div>
        </div>
      </div>
    </section>
  )
}

const MOTTLE_PALETTE = [0.28, 0.36, 0.44, 0.52, 0.62]
function MottledText({ children }: { children: string }) {
  const chars = Array.from(children)
  return (
    <span>
      {chars.map((ch, i) => {
        if (ch === ' ') return <span key={i}>{'\u00A0'}</span>
        const hash = (i * 2654435761 + ch.charCodeAt(0) * 40503) >>> 0
        const base = MOTTLE_PALETTE[hash % MOTTLE_PALETTE.length]
        return (
          <span
            key={i}
            style={{ display: 'inline-block', opacity: base }}
          >
            {ch}
          </span>
        )
      })}
    </span>
  )
}

function PulseDots() {
  return (
    <span className="inline-flex items-center gap-[3px]" aria-hidden>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="block w-[3px] h-[3px] bg-blue-300/40"
        />
      ))}
    </span>
  )
}
