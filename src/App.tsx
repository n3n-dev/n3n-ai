import { Routes, Route, Navigate } from 'react-router-dom'
import { useTheme } from './hooks/useTheme'
import { useLang } from './hooks/useLang'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Draft17Page from './pages/Draft17Page'
import CompanyPage from './pages/CompanyPage'
import './index.css'

export default function App() {
  const { isDark, toggle: toggleTheme } = useTheme()
  const { lang, tr, toggle: toggleLang } = useLang()

  return (
    <div className={isDark ? 'dark' : ''}>
      <div className="bg-white dark:bg-gray-950">
        <Navbar isDark={isDark} onToggleTheme={toggleTheme} lang={lang} onToggleLang={toggleLang} tr={tr} />
        <Routes>
          <Route path="/" element={<Draft17Page tr={tr} lang={lang} />} />
          <Route path="/company" element={<CompanyPage lang={lang} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer isDark={isDark} onToggleTheme={toggleTheme} lang={lang} onToggleLang={toggleLang} />
        <ScrollToTop />
      </div>
    </div>
  )
}
