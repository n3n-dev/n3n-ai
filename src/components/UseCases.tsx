import { useRef, useState, useCallback } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import type { Translations } from '../i18n/translations'

interface Props { tr: Translations }

const BADGE_CLASS = 'bg-gray-900/70 backdrop-blur-sm'

const VISIBLE = 3

export default function UseCases({ tr }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const cases = tr.usecases.cases
  const [page, setPage] = useState(0)
  const maxPage = Math.ceil(cases.length / VISIBLE) - 1

  const prev = useCallback(() => setPage((p) => Math.max(0, p - 1)), [])
  const next = useCallback(() => setPage((p) => Math.min(maxPage, p + 1)), [maxPage])

  const visible = cases.slice(page * VISIBLE, page * VISIBLE + VISIBLE)

  return (
    <section className="py-28 bg-gray-50 dark:bg-gray-950 overflow-hidden">
      <div ref={ref} className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24">
        {/* Header + arrows */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14"
        >
          <span className="text-xs font-semibold tracking-[0.25em] uppercase text-blue-600 dark:text-blue-400 mb-4 block">
            {tr.usecases.eyebrow}
          </span>
          <div className="flex items-end justify-between gap-8 flex-wrap">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight mb-4">
                {tr.usecases.h2}
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-base max-w-2xl leading-relaxed">
                {tr.usecases.sub}
              </p>
            </div>
            {/* Navigation arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={prev}
                disabled={page === 0}
                className="w-10 h-10 rounded-full border border-gray-300 dark:border-gray-700 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={18} className="text-gray-700 dark:text-gray-300" />
              </button>
              <button
                onClick={next}
                disabled={page === maxPage}
                className="w-10 h-10 rounded-full border border-gray-300 dark:border-gray-700 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronRight size={18} className="text-gray-700 dark:text-gray-300" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((item, i) => {
            const badgeColor = BADGE_CLASS
            return (
              <motion.article
                key={`${page}-${i}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="group rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:shadow-xl hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-300 flex flex-col"
              >
                <div className="relative h-48 overflow-hidden bg-gray-200 dark:bg-gray-800">
                  <img
                    src={item.image}
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className={`absolute top-4 left-4 px-3 py-1 rounded-md text-[11px] font-semibold tracking-wider uppercase text-white ${badgeColor}`}>
                    {item.category}
                  </span>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 leading-snug">
                    {item.client}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed flex-1 mb-5">
                    {item.desc}
                  </p>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-1.5 text-blue-600 dark:text-blue-400 text-sm font-semibold group-hover:gap-2.5 transition-all"
                  >
                    {tr.usecases.cta}
                    <ArrowRight size={14} />
                  </a>
                </div>
              </motion.article>
            )
          })}
        </div>

        {/* Page indicator */}
        <div className="flex items-center justify-center gap-1.5 mt-8">
          {Array.from({ length: maxPage + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === page
                  ? 'w-6 bg-blue-600 dark:bg-blue-400'
                  : 'w-1.5 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
