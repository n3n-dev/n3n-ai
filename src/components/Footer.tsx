import { useEffect, useRef, useState } from 'react'
import { ChevronUp, ExternalLink } from 'lucide-react'
import type { Lang } from '../i18n/translations'

interface Props {
 isDark: boolean
 onToggleTheme: () => void
 lang: Lang
 onToggleLang: () => void
}

const familySites = [
 { name: 'N3N', url: 'https://www.n3n.co.kr', desc: '엔쓰리엔 공식 사이트' },
 { name: 'JIKJI.AI', url: 'https://www.jikji.ai', desc: '직지AI' },
]

export default function Footer({ lang, onToggleLang }: Props) {
 const year = new Date().getFullYear()
 const [open, setOpen] = useState(false)
 const ref = useRef<HTMLDivElement>(null)
 const buttonRef = useRef<HTMLButtonElement>(null)
 const firstItemRef = useRef<HTMLAnchorElement>(null)

 useEffect(() => {
  if (!open) return

  const onClick = (e: MouseEvent) => {
   if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
  }

  const onKey = (e: KeyboardEvent) => {
   if (e.key === 'Escape') {
    setOpen(false)
    buttonRef.current?.focus()
   }
  }

  window.addEventListener('mousedown', onClick)
  window.addEventListener('keydown', onKey)

  const frame = requestAnimationFrame(() => firstItemRef.current?.focus())

  return () => {
   window.removeEventListener('mousedown', onClick)
   window.removeEventListener('keydown', onKey)
   cancelAnimationFrame(frame)
  }
 }, [open])

 return (
  <footer className="bg-[#1a1a1a] border-t border-gray-700/50">
   <div className="max-w-7xl mx-auto px-5 sm:px-6 py-5 sm:py-6">
    {/* Row 1: Logo + Controls cluster */}
    <div className="flex items-center justify-between gap-4 mb-3 sm:mb-4">
     <img
      src={`${import.meta.env.BASE_URL}logo-n3n.png`}
      alt="N3N"
      className="h-4 sm:h-5 invert shrink-0"
     />

     <div className="flex items-center gap-2">
      {/* Language toggle */}
      <button
       onClick={onToggleLang}
       className="inline-flex items-center px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-md text-[11px] sm:text-xs font-semibold tracking-wide border border-gray-700 text-gray-300 hover:border-blue-400 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a1a1a]"
       aria-label="Toggle language"
      >
       {lang === 'ko' ? '한글' : 'EN'}
      </button>

      {/* Theme toggle, hidden (single-theme product) */}

      {/* Family sites dropdown */}
      <div ref={ref} className="relative">
       <button
        ref={buttonRef}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-md border border-gray-700 text-[11px] sm:text-xs text-gray-300 hover:border-blue-400 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a1a1a]"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Family sites menu"
       >
        <span className="font-semibold tracking-wide">Family Sites</span>
        <ChevronUp
         size={12}
         className={`transition-transform ${open ? '' : 'rotate-180'} text-gray-500`}
        />
       </button>
       {open && (
        <ul
         role="menu"
         aria-label="Family sites"
         className="absolute right-0 bottom-full mb-2 w-56 sm:w-64 rounded-lg border border-gray-700 bg-[#111] shadow-xl overflow-hidden z-10"
        >
         {familySites.map((site, i) => (
          <li key={site.url} role="none">
           <a
            ref={i === 0 ? firstItemRef : undefined}
            role="menuitem"
            href={site.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="flex items-center justify-between gap-3 px-3 sm:px-4 py-2.5 sm:py-3 text-[11px] sm:text-xs text-gray-300 hover:bg-gray-800 hover:text-white transition-colors focus:outline-none focus-visible:bg-gray-800 focus-visible:text-white"
           >
            <span className="flex flex-col gap-0.5">
             <span className="font-semibold">{site.name}</span>
             <span className="text-[10px] text-gray-500">{site.desc}</span>
            </span>
            <ExternalLink size={12} className="text-gray-500 flex-shrink-0" aria-hidden="true" />
           </a>
          </li>
         ))}
        </ul>
       )}
      </div>
     </div>
    </div>

    {/* Row 2: Policy links */}
    <div className="flex flex-wrap items-center gap-x-1 gap-y-1 text-[11px] sm:text-xs text-gray-400 mb-3 sm:mb-4">
     <a href="#" className="hover:text-white transition-colors">
      서비스 이용약관
     </a>
     <span className="text-gray-600 mx-1 sm:mx-1.5">|</span>
     <a
      href="https://n3n.co.kr/000_privacy-policy"
      target="_blank"
      rel="noopener noreferrer"
      className="font-bold text-gray-300 hover:text-white transition-colors"
     >
      개인정보처리방침
     </a>
     <span className="text-gray-600 mx-1 sm:mx-1.5">|</span>
     <a href="mailto:business@n3n.co.kr" className="hover:text-white transition-colors">
      상담 문의
     </a>
    </div>

    {/* Row 3: Company info + copyright */}
    <div className="text-[10px] sm:text-[11px] text-gray-500 leading-[1.7]">
     <p className="flex flex-wrap gap-x-1 gap-y-0.5">
      <span>서울특별시 강남구 봉은사로 411 (삼성동), 2층 엔쓰리엔</span>
      <span className="hidden sm:inline">&nbsp;|&nbsp;</span>
      <span>Tel. 02-761-5805</span>
      <span className="hidden sm:inline">&nbsp;|&nbsp;</span>
      <span>Fax. 02-554-5803</span>
      <span className="hidden sm:inline">&nbsp;|&nbsp;</span>
      <span>Email. business@n3n.co.kr</span>
     </p>
     <p>&copy; 2017-{year} N3N Co., Ltd. All Rights Reserved.</p>
    </div>
   </div>
  </footer>
 )
}
