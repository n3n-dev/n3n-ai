import { motion } from 'framer-motion'
import { Cloud, Share2, Monitor, Video } from 'lucide-react'
import type { Lang } from '../i18n/translations'

interface Props {
 lang: Lang
 /** Section background, defaults to white. */
 bg?: 'white' | 'cream'
 /** Override the headline text. `\n` is rendered as a linebreak. */
 h2Override?: string
 /** Optional desktop-only headline override. Falls back to h2Override. */
 h2DesktopOverride?: string
 /** Override the body paragraph. `\n` is rendered as a linebreak. */
 bodyOverride?: string
 /** Optional desktop-only body override. Falls back to bodyOverride. */
 bodyDesktopOverride?: string
 /** Override the tag pill labels. Provide 4 entries to fully replace. */
 tagsOverride?: string[]
 /** Override the orbital node labels (top, right, bottom, left). */
 nodeLabelsOverride?: { top?: string; right?: string; bottom?: string; left?: string }
}

const ease = [0.16, 1, 0.3, 1] as const

// Top-of-page platform overview. Two-column layout: copy on the left,
// orbital diagram on the right with N3N CORE OS at the center surrounded
// by Multi-Cloud / IoT Sensors / Edge Clients / VMS Input nodes.
export default function PlatformOverview({
 lang,
 bg = 'white',
 h2Override,
 h2DesktopOverride,
 bodyOverride,
 bodyDesktopOverride,
 tagsOverride,
 nodeLabelsOverride,
}: Props) {
 const isKo = lang === 'ko'
 const sectionBg = bg === 'cream' ? '#F4F2EC' : '#FFFFFF'

 // Tag pill UI removed in Draft 20. The `tagsOverride` prop is kept for
 // backwards-compat but no longer rendered.
 void tagsOverride

 const nodes: Array<{
  Icon: typeof Cloud
  label: string
  position: 'top' | 'right' | 'bottom' | 'left'
 }> = [
  { Icon: Cloud, label: nodeLabelsOverride?.top ?? 'MULTI-CLOUD', position: 'top' },
  { Icon: Share2, label: nodeLabelsOverride?.right ?? 'IOT SENSORS', position: 'right' },
  { Icon: Monitor, label: nodeLabelsOverride?.bottom ?? 'EDGE CLIENTS', position: 'bottom' },
  { Icon: Video, label: nodeLabelsOverride?.left ?? 'VMS INPUT', position: 'left' },
 ]

 const positionStyle = (pos: 'top' | 'right' | 'bottom' | 'left'): React.CSSProperties => {
  switch (pos) {
   case 'top':
    return { left: '50%', top: 0, transform: 'translate(-50%, -50%)' }
   case 'right':
    return { left: '100%', top: '50%', transform: 'translate(-50%, -50%)' }
   case 'bottom':
    return { left: '50%', top: '100%', transform: 'translate(-50%, -50%)' }
   case 'left':
    return { left: 0, top: '50%', transform: 'translate(-50%, -50%)' }
  }
 }

 return (
  <section className="relative w-full py-16 md:py-28 overflow-hidden" style={{ background: sectionBg }}>
   <div className="relative mx-auto max-w-[1080px] px-6 md:px-10 flex flex-col items-center gap-12 md:gap-16">
    {/* === LEFT: copy === */}
    <motion.div
     initial={{ opacity: 0, y: 20 }}
     whileInView={{ opacity: 1, y: 0 }}
     viewport={{ once: true, amount: 0.3 }}
     transition={{ duration: 0.7, ease }}
     className="text-center"
    >
     <h2
      className="md:hidden font-grotesk font-semibold tracking-tight text-[#0B0B0B] break-keep whitespace-pre-line"
      style={{
       fontSize: 'clamp(28px, 4vw, 48px)',
       lineHeight: 1.15,
       letterSpacing: '-0.02em',
      }}
     >
      {h2Override ??
       (isKo
        ? 'AI·GPU·클라우드\n기술이 융합된\n고성능 데이터\n인텔리전스 플랫폼'
        : 'A high-performance\ndata intelligence platform\nfusing AI, GPU,\nand cloud')}
     </h2>
     <h2
      className="hidden md:block font-grotesk font-semibold tracking-tight text-[#0B0B0B] break-keep whitespace-pre-line"
      style={{
       fontSize: 'clamp(28px, 4vw, 48px)',
       lineHeight: 1.15,
       letterSpacing: '-0.02em',
      }}
     >
      {h2DesktopOverride ?? h2Override ??
       (isKo
        ? 'AI·GPU·클라우드\n기술이 융합된\n고성능 데이터\n인텔리전스 플랫폼'
        : 'A high-performance\ndata intelligence platform\nfusing AI, GPU,\nand cloud')}
     </h2>

     <p className="md:hidden mt-6 text-[14px] leading-[1.6] text-[#3a3a3a] break-keep max-w-[280px] mx-auto text-center whitespace-pre-line">
      {bodyOverride ??
       (isKo
        ? 'N3N AI는 INNOWATCH와 WIZEYE를 통해 흩어진 현장 데이터를 실시간으로 연결하고 분석하여, 더 빠르고 정확한 의사결정의 새로운 기준을 제시합니다.'
        : 'N3N AI connects and analyzes scattered field data in real time through INNOWATCH and WIZEYE, setting a new standard for faster, more accurate decisions.')}
     </p>
     <p className="hidden md:block mt-7 text-[16px] leading-[1.6] text-[#3a3a3a] break-keep max-w-[520px] mx-auto text-center whitespace-pre-line">
      {bodyDesktopOverride ?? bodyOverride ??
       (isKo
        ? 'N3N AI는 INNOWATCH와 WIZEYE를 통해 흩어진 현장 데이터를 실시간으로 연결하고 분석하여, 더 빠르고 정확한 의사결정의 새로운 기준을 제시합니다.'
        : 'N3N AI connects and analyzes scattered field data in real time through INNOWATCH and WIZEYE, setting a new standard for faster, more accurate decisions.')}
     </p>

    </motion.div>

    {/* === Orbital diagram + tag pills below (mobile/tablet) === */}
    <motion.div
     initial={{ opacity: 0, scale: 0.95 }}
     whileInView={{ opacity: 1, scale: 1 }}
     viewport={{ once: true, amount: 0.3 }}
     transition={{ duration: 0.8, ease }}
     className="flex flex-col items-center w-full"
    >
    <div
     className="relative aspect-square w-full max-w-[210px] sm:max-w-[300px] md:max-w-[380px]"
    >
     {/* concentric rings */}
     <div className="absolute inset-0 rounded-full border border-[#0B0B0B]/[0.04]" />
     <div className="absolute inset-[14%] rounded-full border border-[#0B0B0B]/[0.03]" />

     {/* center: N3N CORE OS */}
     <div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center rounded-2xl text-white w-[88px] h-[88px] md:w-[132px] md:h-[132px]"
      style={{
       background: 'linear-gradient(135deg, #46805A 0%, #87C599 100%)',
       boxShadow: '0 24px 48px -12px rgba(70,128,90,0.42)',
      }}
     >
      <img
       src={`${import.meta.env.BASE_URL}logo-n3n.png`}
       alt="N3N"
       className="h-6 md:h-8 invert"
      />
     </div>

     {/* orbital nodes */}
     {nodes.map(({ Icon, label, position }) => (
      <div
       key={label}
       className="absolute flex flex-col items-center gap-1.5 md:gap-2"
       style={positionStyle(position)}
      >
       <span
        className="inline-flex items-center justify-center w-9 h-9 md:w-12 md:h-12 rounded-xl bg-white text-[#6AA87B]"
        style={{
         boxShadow:
          '0 2px 6px -2px rgba(11,11,11,0.04), 0 0 0 1px rgba(11,11,11,0.025)',
        }}
       >
        <Icon size={18} strokeWidth={1.6} />
       </span>
       <span
        className="font-grotesk whitespace-nowrap"
        style={{
         fontSize: 10,
         fontWeight: 600,
         letterSpacing: '0.18em',
         color: '#0B0B0B',
         opacity: 0.6,
        }}
       >
        {label}
       </span>
      </div>
     ))}
    </div>

    </motion.div>
   </div>
  </section>
 )
}
