import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, X } from 'lucide-react'
import type { Lang } from '../i18n/translations'

interface Props {
  lang: Lang
}

const ease = [0.16, 1, 0.3, 1] as const

const techBoxes = [
  {
    title: 'VIDEO INTELLIGENCE',
    items: ['POD (Pixel On Demand)', 'VIDEO INTELLIGENCE ENGINE', 'RDS (Remote Desktop System)'],
  },
  {
    title: 'DATA INTELLIGENCE',
    items: ['DTG (Dynamic Topology Generator)', 'DATA PLATFORM'],
  },
  {
    title: 'OPERATION INTELLIGENCE',
    items: ['SOP (Standard Operation Procedure)', 'VIDEO INTELLIGENCE ENGINE', 'RDS (Remote Desktop System)'],
  },
  {
    title: 'DATA VISUALIZATION',
    items: ['LOCATION BASED VISUALIZATION', 'MULTI LAYER & ZOOMABLE UI', 'DIGITAL TIME-SPACE CREATION'],
  },
]

const smartIotRows = [
  { label: 'Smart Factory', desc: 'Integrated visualization of facility/quality/operational data at production sites for quick and accurate decisions.' },
  { label: 'Smart IT Operations', desc: 'Increase MTTR/MTTD by providing IT operators with data visibility through visualization of IT infrastructure.' },
  { label: 'Smart Service Operations', desc: 'Visualize complex service processes into an intuitive UI for efficient operation/management.' },
  { label: 'Smart City', desc: "Visualize the city's vast infrastructure and operations on a single screen for real-time monitoring and information." },
  { label: 'Smart Asset Monitoring', desc: 'Real-time monitoring of corporate assets and public infrastructure.' },
]

const milestones = [
  {
    year: '1999',
    eyebrow: '',
    products: [],
    bullets: ['영상정보기술 창업'],
  },
  {
    year: '2000',
    eyebrow: 'Product',
    products: [
      '의료 안내 시스템 및 원격 제어 시스템 개발',
      'CCTV 통합관제 S/W 개발',
      '영상포털 프로그램 개발',
      '관제통합 컨트롤러 시스템 개발',
      '무선 안내 솔루션 개발',
      '다중 모니터링 제어 시스템 개발',
    ],
    bullets: [
      '중소기업청, "Network 기반의 분산제어 FMS구축" 우수등급 획득',
      '벤처기업 인증',
      '기술혁신형 중소기업(INNO-BIZ) A등급 선정',
    ],
  },
  {
    year: '2010',
    eyebrow: 'Product',
    products: [
      '통합 관제 솔루션 INNOWATCH 출시',
      '스마트 팩토리 솔루션 FACTORY NOW 출시',
      '영상 분석 솔루션 PLAYCAN 출시',
      '비전 인텔리전스 솔루션 WIZEYE 출시',
      'IoT솔루션 DAVIZ 출시',
    ],
    bullets: [
      'WIZEYE, 스마트시티 통합 플랫폼 인증 획득',
      '엔터테인먼트(콘서트) 출시',
      'ISC West 2018, MVP(Most Valuable Product) 수상',
      '하나금융그룹 투자유치',
      '스마트시티 비즈니스 확대, 정관장 수상',
      'OSP, 우수사례 선정',
      'Splunk와 기술파트너십 체결',
      '엔쓰리엔 미국법인 설립',
      'CISCO IoT 기술투자 유치',
      '시범엔쓰, 엔쓰리엔(주)',
      'INNOWATCH, OSEN증가등급 획득',
    ],
  },
  {
    year: '2020',
    eyebrow: 'Product',
    products: [
      '도심형 GPU CLOUD DATA CENTER',
      'GPU CLOUD Platform',
      'HPC manufacturing',
      'LLM AI service',
      'VISION AI service',
    ],
    bullets: [],
  },
  {
    year: 'FUTURE',
    eyebrow: '',
    products: [],
    bullets: [],
  },
]

const projectCols = [
  {
    year: '2000',
    items: [
      '일본, Hitachi 관제시스템',
      '미국 CBS, 대선개표 방송 (조지 부시-존 케리)',
      'MICROSOFT, MIX 2008 / YOUTUBE 한국 런칭 쇼',
      'U-City 사업 참여 인천대교, 교통관제 시스템',
    ],
  },
  {
    year: '2010',
    items: [
      '서울핵안보회의, 보안 모니터링 시스템',
      '현대자동차, 글로벌화재감시 시스템',
      '포스코, 설비 / 품질 모니터링 시스템',
      '인하대학교, 인하공전 CCTV 통합감시시스템',
      '한국교통대학교, CCTV 통합감시시스템',
      '경찰청, 교통정보 CCTV 시스템',
      '전쟁기념관, 통합관제시스템 구축',
      '현대글로비스, CCTV 통합관제시스템 구축',
      '한양대학교 ERICA 캠퍼스, CCTV 통합감시시스템',
      '삼성전자, 해외 생산공장 모니터링 시스템',
      '휴믹, GMP 공정관리 시스템',
      'Jaipur, India Smart City',
      'Miami, US Smart City',
      'AT&T Mexico Cell Tower',
      'JFE BigData Analytics',
      'Carnival QoE',
      '삼성전자, IT Resource Management',
      '하나캠퍼스, Digital Transformation 시스템',
      'JFE 철강, 공장 품질 관리 시스템',
      '경남소방본부, 통합안전 모니터링 시스템',
      '통영시청, 해상안전 시스템',
      '부산광역시, 스마트시티 통합 모니터링 시스템',
      'KDDI, 자율주행자동차 운영 시스템',
      '롯데마트, 베트남 비즈니스 현황 모니터링 시스템',
      '화승 VINA, 스마트 팩토리 생산 관리 시스템',
      'EXEO, 설비 관리 시스템',
      '한중NCS, 스마트 팩토리 통합 모니터링 시스템',
      'QRT, Lab 통합 모니터링 시스템',
      '한국서부발전, 발전설비 통합 모니터링 시스템',
      '한국중부발전, 통합관제 시스템',
      '한국남부발전, 스마트 재난관리 시스템',
      '중소기업중앙회, 스마트공장 운영시스템',
      '하나금융지주, 콜라보 플랫폼 시각화 모니터링 시스템',
      '스마트공장 보급확산사업 (경남, 경기, 전북 등)',
      '통영거제 해상안전시스템',
      '영원무역, 통합모니터링 시스템',
      '모노리스, 제주카트 경기장 모니터링',
      'ES청림, 통합모니터링 시스템',
      '한국동방전, 과학화보안 통합관제 시스템',
      'CJ그룹, PLAYCAN 배회모니터링',
      '삼성전자, PLAYCAN 피플카운팅',
    ],
  },
]

export default function CompanyPage({ lang }: Props) {
  const isKo = lang === 'ko'
  const navigate = useNavigate()
  const location = useLocation()

  // Same back behaviour as the navbar logo — return to the draft we came from.
  const goBack = () => {
    if (location.key !== 'default') navigate(-1)
    else navigate('/')
  }

  return (
    <main className="min-h-screen bg-white text-[#0B0B0B]">
      {/* Close button — back to wherever the user opened the page from. */}
      <button
        type="button"
        onClick={goBack}
        aria-label="Close"
        className="fixed top-6 right-6 z-50 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#0B0B0B]/15 bg-white/80 backdrop-blur-md text-[#0B0B0B]/70 hover:text-[#0B0B0B] hover:border-[#0B0B0B]/40 transition"
      >
        <X size={18} />
      </button>

      {/* === HERO === */}
      <section className="pt-32 md:pt-40 pb-16 md:pb-24 px-6">
        <div className="max-w-3xl mx-auto text-left">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.05 }}
            className="font-grotesk font-semibold tracking-tight"
            style={{ fontSize: 'clamp(28px, 4.4vw, 44px)', lineHeight: 1.15, letterSpacing: '-0.02em' }}
          >
            New Enterprise to You Forever, N3N
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease, delay: 0.15 }}
            className="mt-10 space-y-5 text-[14px] md:text-[15px] leading-[1.8] text-[#3a3a3a] break-keep"
          >
            <p>
              {isKo
                ? 'N3N은 영상, 센서, DB, 로그 등 유형에 관계없이 고객이 필요로 하는 모든 데이터를 수집하고, 가장 직관적인 방식으로 시각화하여 실질적인 인사이트를 제공하는 글로벌 데이터 기업입니다.'
                : 'N3N collects all data (video, sensor, DB, log, etc.) on the site that customers want to see — regardless of type — and is a global data company that aims to provide insights by expressing it in the most intuitive way.'}
            </p>
            <p>
              {isKo
                ? '1999년 창립 이래, 독자적인 영상 특허 기술을 기반으로 영상 인텔리전스 분야를 선도해 왔습니다. 스마트 팩토리, 스마트 시티, 고객 경험 등 다양한 산업 현장에서 축적한 폭넓은 경험과 우수한 R&D 역량을 토대로, 디지털 트랜스포메이션 시대에 최적화된 혁신적인 인텔리전스 플랫폼을 제공합니다. 이러한 기술력은 글로벌 기업으로부터의 공식 인증과 Cisco의 전략적 기술 투자 유치로 이어지며 그 가치를 입증해 왔습니다.'
                : 'Since its establishment in 1999, N3N has developed video intelligence technology based on unique video patents. Backed by deep experience across smart factories, smart cities, and customer experiences — and an excellent R&D team — we deliver innovative intelligence platforms for the era of digital transformation. We have carried out numerous projects in recognition of our technological prowess from global companies, and have attracted technology investment from Cisco.'}
            </p>
            <p>
              {isKo
                ? "모든 자산과 객체가 실시간으로 연결되는 '초연결' 시대에는 신속하고 정확한 의사결정이 경쟁력의 핵심입니다. N3N은 현장의 생생한 영상과 데이터를 운영자가 가장 쉽고 빠르게 파악할 수 있도록 표현함으로써, 즉각적인 인사이트 도출과 빠른 의사결정을 지원합니다. 나아가 수집된 IoT 데이터에 현장감을 더해 데이터의 가치를 높이고, 지속적인 비즈니스 성과를 창출하는 새로운 모델을 제시합니다."
                : "Fast decision-making is essential in the era of 'hyper-connectivity' where all assets and objects communicate in real time. N3N expresses images and data containing vivid on-site information so operators can understand and access them most easily and quickly — giving customers instantaneous insight and the ability to make quick, accurate decisions. We present a successful business model that brings a vivid sense of realism to collected IoT data and continues to generate value."}
            </p>
          </motion.div>
        </div>
      </section>

      {/* === TECHNOLOGY === */}
      <section className="py-20 md:py-28 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center font-grotesk font-semibold text-3xl md:text-4xl tracking-tight">
            Technology
          </h2>

          <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-5">
            {techBoxes.map((b) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease }}
                className="rounded-[14px] border border-[#0B0B0B]/15 bg-white p-7 md:p-8"
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-grotesk font-semibold text-[15px] md:text-[16px] tracking-[0.04em]">
                    {b.title}
                  </h3>
                  <ArrowRight size={16} className="text-[#0B0B0B]/55 shrink-0" />
                </div>
                <ul className="mt-4 space-y-1.5 text-[12.5px] md:text-[13px] text-[#0B0B0B]/65 font-grotesk">
                  {b.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </motion.div>
            ))}

            {/* SMART IoT — full width row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease }}
              className="md:col-span-2 rounded-[14px] border border-[#0B0B0B]/15 bg-white p-7 md:p-8"
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-grotesk font-semibold text-[15px] md:text-[16px] tracking-[0.04em]">
                  SMART IoT SOLUTIONS
                </h3>
                <ArrowRight size={16} className="text-[#0B0B0B]/55 shrink-0" />
              </div>
              <ul className="mt-5 space-y-3 md:space-y-2.5">
                {smartIotRows.map((r) => (
                  <li key={r.label} className="grid md:grid-cols-[200px_1fr] gap-1 md:gap-6">
                    <span className="font-grotesk font-medium text-[12.5px] md:text-[13px] text-[#0B0B0B]">
                      {r.label}
                    </span>
                    <span className="text-[12.5px] md:text-[13px] text-[#0B0B0B]/65">
                      {r.desc}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* === OUR PATH === */}
      <section className="py-20 md:py-28 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center font-grotesk font-semibold text-3xl md:text-4xl tracking-tight">
            Our Path
          </h2>
          <p className="mt-6 max-w-3xl mx-auto text-center text-[14px] md:text-[15px] leading-[1.75] text-[#3a3a3a] break-keep">
            {isKo
              ? '1999년 창립 이래, N3N은 영상 인텔리전스 기술과 데이터 구조화 / 시각화 기술, 특허, 그리고 다양한 산업 경험을 축적해 왔습니다. 이를 바탕으로 산업별 요구를 혁신적으로 해결하는 솔루션을 제공합니다.'
              : 'Since its inception in 1999, N3N has accumulated video intelligence technology, data structuring and visualization technology, patents and experience. Based on this, we provide solutions that innovatively address the different demands of various industries.'}
          </p>

          {/* Cards */}
          <div className="mt-14 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-5">
            {milestones.filter((m) => m.products.length > 0).map((m) => (
              <div
                key={m.year}
                className="rounded-[16px] border border-[#0B0B0B]/15 bg-white p-7 text-center"
              >
                <span className="text-[10px] tracking-[0.28em] uppercase text-[#0B0B0B]/45 font-grotesk">
                  {m.eyebrow}
                </span>
                <ul className="mt-5 space-y-2 text-[13px] md:text-[13.5px] text-[#0B0B0B]/80">
                  {m.products.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Timeline */}
          <div className="relative mt-12 md:mt-14">
            <div className="absolute top-1/2 left-0 right-0 h-px bg-[#0B0B0B]/15" />
            <div className="relative flex items-center justify-between">
              {milestones.map((m) => {
                const isEdge = m.year === '1999' || m.year === 'FUTURE'
                return (
                  <div
                    key={m.year}
                    className={`relative inline-flex items-center justify-center rounded-full font-grotesk font-semibold ${
                      isEdge
                        ? 'h-12 w-12 bg-[#0B0B0B] text-white text-[11px] tracking-[0.04em]'
                        : 'h-16 w-16 md:h-20 md:w-20 border border-[#0B0B0B]/15 bg-white text-[#0B0B0B] text-[14px] md:text-[16px]'
                    }`}
                  >
                    {m.year}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Bullets row beneath timeline */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-6">
            {milestones.map((m) => (
              <div key={m.year + '-bullets'} className="text-[12.5px] text-[#0B0B0B]/65 leading-[1.7] break-keep">
                {m.bullets.map((b) => (
                  <p key={b} className="mb-1.5">
                    {b}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === PROJECT === */}
      <section className="py-20 md:py-28 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center font-grotesk font-semibold text-3xl md:text-4xl tracking-tight">
            Project
          </h2>

          <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
            {projectCols.map((col) => (
              <div key={col.year}>
                <div className="border-t border-[#0B0B0B]/20 pt-6">
                  <h3 className="font-grotesk font-semibold text-2xl md:text-3xl text-[#0B0B0B]/80 tracking-tight">
                    {col.year}
                  </h3>
                  <ul className="mt-5 space-y-1.5 text-[12.5px] md:text-[13px] text-[#0B0B0B]/70 leading-[1.7] break-keep">
                    {col.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === GET IN TOUCH === */}
      <section className="py-24 md:py-32 px-6 bg-white border-t border-[#0B0B0B]/10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-grotesk font-semibold text-3xl md:text-4xl tracking-tight">
            GET IN TOUCH
          </h2>
          <p className="mt-6 text-[14px] md:text-[15px] leading-[1.75] text-[#3a3a3a] break-keep">
            {isKo
              ? "'Global AI Platform Provider' 엔쓰리엔과 함께할 여러분의 많은 관심과 지원을 바랍니다."
              : "We look forward to your interest and support — alongside N3N, your 'Global AI Platform Provider'."}
          </p>
          <a
            href="mailto:business@n3n.co.kr"
            className="mt-10 inline-flex items-center gap-2 rounded-full border border-[#0B0B0B] px-7 py-3 text-[12px] font-grotesk font-semibold tracking-[0.2em] uppercase hover:bg-[#0B0B0B] hover:text-white transition-colors"
          >
            Contact Us
            <ArrowRight size={14} />
          </a>
        </div>
      </section>
    </main>
  )
}
