import { motion } from 'framer-motion'
import type { Lang } from '../i18n/translations'

interface Props {
 lang: Lang
}

const ease = [0.16, 1, 0.3, 1] as const

// Connected X, AI Learning & Deployment section. Video sits as a
// full-bleed background; the headline, subhead, and domain pills are
// overlaid on top with a dark scrim for legibility.
export default function ConnectedXSection({ lang }: Props) {
 const isKo = lang === 'ko'

 const domains = isKo
  ? ['드론', '선박', 'UAM', '로지스틱스']
  : ['Drone', 'Ship', 'UAM', 'Logistics']

 return (
  <section className="relative w-full bg-black py-12 md:py-14 overflow-hidden">
   {/* === BACKGROUND VIDEO === */}
   <video
    autoPlay
    loop
    muted
    playsInline
    aria-hidden
    className="absolute inset-0 h-full w-full object-cover"
   >
    <source src={`${import.meta.env.BASE_URL}hero-video-4.mp4`} type="video/mp4" />
   </video>

   {/* === SCRIM, darken video for text legibility === */}
   <div
    aria-hidden
    className="absolute inset-0 pointer-events-none"
    style={{
     background:
      'linear-gradient(to bottom, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.45) 40%, rgba(0,0,0,0.55) 75%, rgba(0,0,0,0.78) 100%)',
    }}
   />

   {/* === OVERLAY CONTENT === */}
   <div className="relative mx-auto max-w-[1280px] px-6 md:px-10 min-h-[30vh] md:min-h-[36vh] flex items-center justify-center">
    <motion.div
     initial={{ opacity: 0, y: 16 }}
     whileInView={{ opacity: 1, y: 0 }}
     viewport={{ once: true, amount: 0.4 }}
     transition={{ duration: 0.7, ease }}
     className="text-center max-w-3xl mx-auto"
    >
     <h2
      className="font-grotesk font-semibold tracking-tight text-white"
      style={{
       fontSize: 'clamp(36px, 5vw, 56px)',
       lineHeight: 1.05,
       letterSpacing: '-0.02em',
       textShadow: '0 2px 24px rgba(0,0,0,0.45)',
      }}
     >
      Connected X
     </h2>

     <p
      className="mt-5 md:hidden text-[14px] leading-[1.7] text-white/85 break-keep whitespace-pre-line"
      style={{ textShadow: '0 1px 12px rgba(0,0,0,0.5)' }}
     >
      {isKo
       ? '영상 데이터를 기반으로 AI 분석을 고도화하고,\n다양한 모빌리티 환경으로 연결을 확장합니다.'
       : 'Built on video data, we advance AI analytics\nand extend connectivity across mobility environments.'}
     </p>
     <p
      className="hidden md:block mt-6 text-[16px] leading-[1.7] text-white/85 break-keep whitespace-pre-line"
      style={{ textShadow: '0 1px 12px rgba(0,0,0,0.5)' }}
     >
      {isKo
       ? '영상 데이터를 기반으로 AI 분석을 고도화하고,\n다양한 모빌리티 환경으로 연결을 확장합니다.'
       : 'Built on video data, we advance AI analytics\nand extend connectivity across mobility environments.'}
     </p>

     {/* Mobility-domain pills */}
     <div className="mt-8 flex flex-wrap items-center justify-center gap-3 md:gap-4">
      {domains.map((d) => (
       <span
        key={d}
        tabIndex={0}
        className="inline-flex items-center px-4 py-2 rounded-full font-grotesk text-white/70 break-keep backdrop-blur-md border border-white/10 bg-white/[0.04] transition-colors hover:text-white hover:bg-white/10 hover:border-white/25 focus:text-white focus:bg-white/10 focus:border-white/25 focus:outline-none cursor-default"
        style={{ fontSize: 13, fontWeight: 500 }}
       >
        {d}
       </span>
      ))}
     </div>
    </motion.div>
   </div>
  </section>
 )
}
