import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="scroll-top"
          type="button"
          onClick={scrollTop}
          aria-label="Scroll to top"
          initial={{ opacity: 0, y: 12, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.9 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full bg-white hover:bg-gray-100 text-gray-900 border border-gray-200 shadow-lg shadow-black/10 hover:shadow-black/20 transition-colors flex items-center justify-center"
        >
          <ArrowUp size={18} strokeWidth={2.5} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
