import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Factory, Building2, Route, Bell, PlayCircle, Monitor, ArrowRight } from 'lucide-react'
import type { Lang } from '../i18n/translations'

interface Props {
  lang: Lang
  headlineOverride?: string
  subtitleOverride?: string
  plansLabelOverride?: string
}

interface AreaItem {
  id: string
  icon: typeof Building2
  title: string
  service: string
  current: string
  plans: string[]
  color: string
  iconBg: string
}

const areas: Record<string, AreaItem[]> = {
  ko: [
    {
      id: 'smart-cities', icon: Building2, title: 'Smart Cities',
      service: 'Pixel On Demand Camera',
      current: '33 스마트시티 대상 3백만 대 이상의 실시간 Visual Intelligence',
      plans: ['글로벌 OEM → Platform', '미국 Smart City Edge Intelligence'],
      color: 'border-gray-200 dark:border-gray-800',
      iconBg: 'bg-gray-900 dark:bg-white',
    },
    {
      id: 'power-plant', icon: Factory, title: 'Power Plant',
      service: 'Industrial Video in Power Plant',
      current: '대한민국 발전소 60%에 Industrial Video를 전송',
      plans: ['거점고객 매년 80% 성장', '신규고객 개발'],
      color: 'border-gray-200 dark:border-gray-800',
      iconBg: 'bg-gray-900 dark:bg-white',
    },
    {
      id: 'soc-ai', icon: Route, title: 'SOC AI Transformation',
      service: '대규모 SOC AI Transformation',
      current: '교통, 항만, 댐, 자자체 자율주행 센터 등',
      plans: ['SW 시장 6~9천억 규모', '시장점유율 30% 목표'],
      color: 'border-gray-200 dark:border-gray-800',
      iconBg: 'bg-gray-900 dark:bg-white',
    },
    {
      id: 'smart-alert', icon: Bell, title: 'Smart Alert',
      service: '구조적 알림 시스템',
      current: '임계치 초과 시 지역 → 공업단지 → 공장 → 설비 단계적 접근',
      plans: ['SCADA·HMI·센서·CCTV 통합', '분산 데이터 실시간 연동'],
      color: 'border-gray-200 dark:border-gray-800',
      iconBg: 'bg-gray-900 dark:bg-white',
    },
    {
      id: 'playback', icon: PlayCircle, title: 'Operation Playback',
      service: '시점 기반 영상·데이터 재생',
      current: '과거 시점 영상과 데이터를 재생하여 원인을 입체적으로 파악',
      plans: ['특정 시점 Play Back', '특정 기간 Play Back'],
      color: 'border-gray-200 dark:border-gray-800',
      iconBg: 'bg-gray-900 dark:bg-white',
    },
    {
      id: 'display-wall', icon: Monitor, title: 'Display Wall',
      service: '직관적인 디스플레이 월 운영',
      current: '멀티 디스플레이로 하나의 큰 월 화면 구성, 셀 단위 관리',
      plans: ['Live Video on Map', 'Data Integration'],
      color: 'border-gray-200 dark:border-gray-800',
      iconBg: 'bg-gray-900 dark:bg-white',
    },
  ],
  en: [
    {
      id: 'smart-cities', icon: Building2, title: 'Smart Cities',
      service: 'Pixel On Demand Camera',
      current: 'Real-time Visual Intelligence for 3M+ devices across 33 smart cities',
      plans: ['Global OEM → Platform', 'US Smart City Edge Intelligence'],
      color: 'border-gray-200 dark:border-gray-800',
      iconBg: 'bg-gray-900 dark:bg-white',
    },
    {
      id: 'power-plant', icon: Factory, title: 'Power Plant',
      service: 'Industrial Video in Power Plant',
      current: 'Industrial Video delivery to 60% of Korean power plants',
      plans: ['80% YoY growth with key accounts', 'New customer acquisition'],
      color: 'border-gray-200 dark:border-gray-800',
      iconBg: 'bg-gray-900 dark:bg-white',
    },
    {
      id: 'soc-ai', icon: Route, title: 'SOC AI Transformation',
      service: 'Large-scale SOC AI Transformation',
      current: 'Target: Transportation, ports, dams, autonomous driving centers',
      plans: ['SW market ₩600B-900B', '30% market share target'],
      color: 'border-gray-200 dark:border-gray-800',
      iconBg: 'bg-gray-900 dark:bg-white',
    },
    {
      id: 'smart-alert', icon: Bell, title: 'Smart Alert',
      service: 'Structural Alert System',
      current: 'Step-by-step drill down from region to equipment on threshold alerts',
      plans: ['SCADA·HMI·Sensor·CCTV integration', 'Real-time distributed data sync'],
      color: 'border-gray-200 dark:border-gray-800',
      iconBg: 'bg-gray-900 dark:bg-white',
    },
    {
      id: 'playback', icon: PlayCircle, title: 'Operation Playback',
      service: 'Time-based Video & Data Replay',
      current: 'Replay video and data at any point to identify root cause',
      plans: ['Point-in-time Play Back', 'Time-range Play Back'],
      color: 'border-gray-200 dark:border-gray-800',
      iconBg: 'bg-gray-900 dark:bg-white',
    },
    {
      id: 'display-wall', icon: Monitor, title: 'Display Wall',
      service: 'Intuitive Display Wall Management',
      current: 'Unified multi-display wall with cell-based management',
      plans: ['Live Video on Map', 'Data Integration'],
      color: 'border-gray-200 dark:border-gray-800',
      iconBg: 'bg-gray-900 dark:bg-white',
    },
  ],
}

export default function BusinessAreas({ lang, headlineOverride, subtitleOverride, plansLabelOverride }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const items = areas[lang]

  return (
    <section className="py-16 md:py-24 lg:py-28 bg-white dark:bg-gray-950 overflow-hidden">
      <div ref={ref} className="max-w-7xl mx-auto px-5 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-10 md:mb-12 lg:mb-14"
        >
          <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] sm:tracking-[0.25em] uppercase text-blue-600 dark:text-blue-400 mb-2 block">
            BUSINESS AREAS
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-[1.25] md:leading-tight mb-3 break-keep">
            {headlineOverride ?? (lang === 'ko' ? 'N3N이 만드는 변화' : 'Transformations by N3N')}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base max-w-3xl mx-auto leading-relaxed break-keep">
            {subtitleOverride ??
              (lang === 'ko'
                ? '산업 현장의 실시간 영상과 데이터를 통합하여 운영 혁신을 이끕니다.'
                : 'Driving operational innovation by integrating real-time video and data across industries.')}
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {items.map((item, i) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className={`group rounded-2xl border-2 ${item.color} bg-gray-50 dark:bg-gray-900 p-5 md:p-6 hover:shadow-lg transition-all duration-300 flex flex-col`}
              >
                {/* Service badge */}
                <div className="mb-3">
                  <span className="inline-block px-2 md:px-2.5 py-0.5 md:py-1 rounded-md bg-gray-900/70 dark:bg-white/80 text-white dark:text-gray-900 text-[10px] md:text-xs font-semibold">
                    {item.service}
                  </span>
                </div>

                {/* Icon + Title */}
                <div className="flex items-center gap-3 mb-3 md:mb-4">
                  <div className="w-8 h-8 md:w-9 md:h-9 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                    <Icon size={16} className="text-gray-500 dark:text-gray-400 md:hidden" />
                    <Icon size={18} className="text-gray-500 dark:text-gray-400 hidden md:block" />
                  </div>
                  <h3 className="text-base md:text-lg font-bold text-gray-900 dark:text-white break-keep">{item.title}</h3>
                </div>

                {/* Current business */}
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4 md:mb-5 flex-1 break-keep">
                  {item.current}
                </p>

                {/* Plans */}
                <div className="border-t border-gray-200 dark:border-gray-800 pt-4">
                  <span className="text-[10px] font-bold tracking-widest uppercase text-gray-400 dark:text-gray-500 mb-2 block">
                    {plansLabelOverride ?? (lang === 'ko' ? '앞으로의 계획' : 'Future Plans')}
                  </span>
                  {item.plans.map((plan, j) => (
                    <div key={j} className="flex items-center gap-2 mb-1 last:mb-0">
                      <ArrowRight size={12} className="text-gray-400 flex-shrink-0" />
                      <span className="text-[11px] sm:text-xs font-medium text-gray-700 dark:text-gray-300 break-keep">{plan}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
