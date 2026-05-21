import { useEffect, useMemo, useRef, useState } from 'react'

interface Props {
  /** Final text to settle on */
  text: string
  /** Total scramble duration in ms */
  duration?: number
  /** Delay before the scramble starts, in ms */
  delay?: number
  className?: string
  /** Pool of characters used while scrambling */
  charset?: string
  /** Re-run animation whenever this key changes */
  trigger?: string | number
  /** Whether to loop indefinitely (for status line feel) */
  loop?: boolean
  /** Pause between loops in ms (loop only) */
  loopPauseMs?: number
  /**
   * When true, each character is rendered in its own slot whose width is
   * reserved by an invisible ghost of the final character. Prevents
   * surrounding layout from shaking as scrambled chars of different
   * widths cycle through. Use for headlines where jitter is distracting.
   */
  stable?: boolean
  /**
   * When true, each line's reveal progresses in parallel based on the
   * line's own length (so multi-line headlines animate simultaneously
   * rather than waiting for the previous line to finish). Preserves `\n`.
   */
  parallelLines?: boolean
  /**
   * When false, the component starts already settled on `text` and only
   * animates when `trigger` changes. Use for hover-triggered glitch.
   */
  autoPlay?: boolean
}

const DEFAULT_CHARS =
  '!<>-_\\/[]{}—=+*^?#$%&@:;*0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'

interface CharInfo {
  lineLen: number
  relIdx: number
}

export default function AsciiGlitchText({
  text,
  duration = 1400,
  delay = 0,
  className,
  charset = DEFAULT_CHARS,
  trigger,
  loop = false,
  loopPauseMs = 2400,
  stable = false,
  parallelLines = false,
  autoPlay = true,
}: Props) {
  const [display, setDisplay] = useState(text)
  const rafRef = useRef<number | null>(null)
  const timeoutRef = useRef<number | null>(null)
  const initialMountRef = useRef(true)

  // Per-character line info for parallel-line reveal
  const lineInfo = useMemo<(CharInfo | null)[]>(() => {
    const chars = Array.from(text)
    const info: (CharInfo | null)[] = new Array(chars.length).fill(null)
    let lineStart = 0
    for (let i = 0; i <= chars.length; i++) {
      if (i === chars.length || chars[i] === '\n') {
        const lineLen = i - lineStart
        for (let j = lineStart; j < i; j++) {
          info[j] = { lineLen, relIdx: j - lineStart }
        }
        lineStart = i + 1
      }
    }
    return info
  }, [text])

  useEffect(() => {
    const textChars = Array.from(text)
    let cancelled = false

    // First mount + autoPlay off → settle immediately, don't animate
    const wasInitial = initialMountRef.current
    initialMountRef.current = false
    if (wasInitial && !autoPlay) {
      setDisplay(text)
      return
    }

    // Throttle scramble redraws so unrevealed chars don't jitter every frame.
    // ~12fps is enough to feel alive without overwhelming the eye.
    const UPDATE_INTERVAL_MS = 80

    const run = () => {
      const start = performance.now() + delay
      let lastPaint = 0
      const tick = (now: number) => {
        if (cancelled) return
        const elapsed = now - start
        if (elapsed < 0) {
          rafRef.current = requestAnimationFrame(tick)
          return
        }
        const progress = Math.min(elapsed / duration, 1)
        const shouldPaint = now - lastPaint >= UPDATE_INTERVAL_MS || progress >= 1
        if (shouldPaint) {
          lastPaint = now
          let out = ''
          for (let i = 0; i < textChars.length; i++) {
            const ch = textChars[i]
            if (ch === ' ' || ch === '\n' || ch === '\t' || ch === '.' || ch === ',') {
              out += ch
              continue
            }
            let relIdx: number
            let len: number
            if (parallelLines && lineInfo[i]) {
              relIdx = lineInfo[i]!.relIdx
              len = lineInfo[i]!.lineLen
            } else {
              relIdx = i
              len = textChars.length
            }
            // Simple binary state: revealed (final char) or scrambling (random).
            // No progressive/sparse flicker — keeps the animation calm.
            const revealIdx = progress * len
            if (relIdx < revealIdx) {
              out += ch
            } else {
              out += charset[Math.floor(Math.random() * charset.length)]
            }
          }
          setDisplay(out)
        }
        if (progress < 1) {
          rafRef.current = requestAnimationFrame(tick)
        } else {
          setDisplay(text)
          if (loop) {
            timeoutRef.current = window.setTimeout(() => {
              if (!cancelled) run()
            }, loopPauseMs)
          }
        }
      }
      rafRef.current = requestAnimationFrame(tick)
    }

    run()

    return () => {
      cancelled = true
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current)
    }
  }, [text, duration, delay, charset, trigger, loop, loopPauseMs, autoPlay, parallelLines, lineInfo])

  if (!stable) {
    return <span className={className}>{display}</span>
  }

  // Stable mode: per-character grid slots
  const finalChars = Array.from(text)
  const liveChars = Array.from(display)
  return (
    <span className={className}>
      {finalChars.map((ch, i) => {
        if (ch === '\n') return <br key={i} />
        if (ch === ' ') return <span key={i}>{'\u00A0'}</span>
        const live = liveChars[i] ?? ch
        return (
          <span
            key={i}
            style={{
              display: 'inline-grid',
              verticalAlign: 'baseline',
              gridTemplateAreas: '"slot"',
            }}
          >
            <span
              aria-hidden
              style={{
                gridArea: 'slot',
                visibility: 'hidden',
                userSelect: 'none',
              }}
            >
              {ch}
            </span>
            <span style={{ gridArea: 'slot' }}>{live}</span>
          </span>
        )
      })}
    </span>
  )
}
