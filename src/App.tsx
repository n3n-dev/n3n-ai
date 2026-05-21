import { Routes, Route } from 'react-router-dom'
import { useTheme } from './hooks/useTheme'
import { useLang } from './hooks/useLang'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import LandingPage from './pages/LandingPage'
import Draft2Page from './pages/Draft2Page'
import Draft3Page from './pages/Draft3Page'
import Draft4Page from './pages/Draft4Page'
import Draft5Page from './pages/Draft5Page'
import Draft6Page from './pages/Draft6Page'
import Draft7Page from './pages/Draft7Page'
import Draft8Page from './pages/Draft8Page'
import Draft9Page from './pages/Draft9Page'
import Draft0Page from './pages/Draft0Page'
import Draft05Page from './pages/Draft05Page'
import Draft11Page from './pages/Draft11Page'
import Draft111Page from './pages/Draft111Page'
import Draft112Page from './pages/Draft112Page'
import Draft113Page from './pages/Draft113Page'
import Draft12Page from './pages/Draft12Page'
import Draft13Page from './pages/Draft13Page'
import Draft14Page from './pages/Draft14Page'
import Draft15Page from './pages/Draft15Page'
import Draft16Page from './pages/Draft16Page'
import Draft17Page from './pages/Draft17Page'
import Draft20Page from './pages/Draft20Page'
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
          <Route path="/" element={<Draft20Page tr={tr} lang={lang} />} />
          <Route path="/draft2" element={<Draft2Page tr={tr} lang={lang} />} />
          <Route path="/draft3" element={<Draft3Page tr={tr} lang={lang} />} />
          <Route path="/draft4" element={<Draft4Page tr={tr} lang={lang} />} />
          <Route path="/draft5" element={<Draft5Page tr={tr} lang={lang} />} />
          <Route path="/draft6" element={<Draft6Page tr={tr} lang={lang} />} />
          <Route path="/draft7" element={<Draft7Page tr={tr} lang={lang} />} />
          <Route path="/draft8" element={<Draft8Page tr={tr} lang={lang} />} />
          <Route path="/draft9" element={<Draft9Page tr={tr} lang={lang} />} />
          <Route path="/draft0" element={<Draft0Page tr={tr} lang={lang} />} />
          <Route path="/draft0-5" element={<Draft05Page tr={tr} lang={lang} />} />
          <Route path="/draft0-2" element={<Draft05Page tr={tr} lang={lang} defaultVariant="2" />} />
          <Route path="/draft0-3" element={<Draft05Page tr={tr} lang={lang} defaultVariant="3" />} />
          <Route path="/draft11" element={<Draft11Page tr={tr} lang={lang} />} />
          <Route path="/draft11-1" element={<Draft111Page tr={tr} lang={lang} />} />
          <Route path="/draft11-2" element={<Draft112Page tr={tr} lang={lang} />} />
          <Route path="/draft11-3" element={<Draft113Page tr={tr} lang={lang} />} />
          <Route path="/draft12" element={<Draft12Page tr={tr} lang={lang} />} />
          <Route path="/draft13" element={<Draft13Page tr={tr} lang={lang} />} />
          <Route path="/draft14" element={<Draft14Page tr={tr} lang={lang} />} />
          <Route path="/draft15" element={<Draft15Page tr={tr} lang={lang} />} />
          <Route path="/draft16" element={<Draft16Page tr={tr} lang={lang} />} />
          <Route path="/draft17" element={<Draft17Page tr={tr} lang={lang} />} />
          <Route path="/draft20" element={<Draft20Page tr={tr} lang={lang} />} />
          <Route path="/company" element={<CompanyPage lang={lang} />} />
        </Routes>
        <Footer isDark={isDark} onToggleTheme={toggleTheme} lang={lang} onToggleLang={toggleLang} />
        <ScrollToTop />
      </div>
    </div>
  )
}
