import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import type { Translations } from '../i18n/translations'

interface Props { tr: Translations }

export default function Contact({ tr }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="contact" className="relative overflow-hidden">
      {/* CTA Banner — image background style */}
      <div ref={ref} className="relative h-[280px] md:h-[320px] bg-[#0a0e18] overflow-hidden">
        {/* Right side background image */}
        <div className="absolute right-0 top-0 bottom-0 w-3/5">
          <img
            src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0e18] via-[#0a0e18]/80 to-transparent" />
          <div className="absolute inset-0 bg-[#0a0e18]/30" />
        </div>

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-8 md:px-16 lg:px-24 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-snug mb-3">
              {tr.contact.h2a}
              {tr.contact.h2b}
            </h2>
            <p className="text-gray-400 text-sm mb-6">{tr.contact.sub}</p>
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 px-8 py-3 border border-gray-400/40 text-white text-sm font-medium hover:bg-white hover:text-gray-900 transition-all"
            >
              {tr.contact.submit}
            </button>
          </motion.div>
        </div>
      </div>

      {/* Expandable form */}
      <AnimatePresence>
        {showForm && !submitted && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="bg-[#0a0e18] overflow-hidden"
          >
            <div className="max-w-2xl mx-auto px-6 pb-14 pt-4">
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  {([
                    { id: 'name' as const, label: tr.contact.name, ph: tr.contact.namePh },
                    { id: 'company' as const, label: tr.contact.company, ph: tr.contact.companyPh },
                  ]).map((f) => (
                    <div key={f.id} className="flex flex-col gap-1.5">
                      <label className="text-xs font-medium text-gray-400">{f.label}</label>
                      <input
                        type="text"
                        placeholder={f.ph}
                        value={form[f.id]}
                        onChange={(e) => setForm({ ...form, [f.id]: e.target.value })}
                        className="px-4 py-3 border border-gray-700/60 bg-transparent text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
                        required
                      />
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-gray-400">{tr.contact.email}</label>
                  <input
                    type="email"
                    placeholder={tr.contact.emailPh}
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="px-4 py-3 border border-gray-700/60 bg-transparent text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-gray-400">{tr.contact.message}</label>
                  <textarea
                    rows={4}
                    placeholder={tr.contact.messagePh}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="px-4 py-3 border border-gray-700/60 bg-transparent text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="group flex items-center justify-center gap-2 w-full px-6 py-3 bg-white text-gray-900 font-semibold text-sm hover:bg-gray-100 transition-colors"
                >
                  {tr.contact.submit}
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </div>
          </motion.div>
        )}

        {submitted && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            className="bg-[#0a0e18] overflow-hidden"
          >
            <div className="flex flex-col items-center justify-center py-12 text-center gap-3">
              <h3 className="text-xl font-bold text-white">{tr.contact.successTitle}</h3>
              <p className="text-gray-400 text-sm">{tr.contact.successSub}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
