import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { useTheme } from "./hooks/useTheme";
import { useLang } from "./hooks/useLang";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import LoadingScreen from "./components/LoadingScreen";
import "./index.css";

const Draft20Page = lazy(() => import("./pages/Draft20Page"));
const CompanyPage = lazy(() => import("./pages/CompanyPage"));

export default function App() {
  const { isDark, toggle: toggleTheme } = useTheme();
  const { lang, tr, toggle: toggleLang } = useLang();

  return (
    <div className="bg-white dark:bg-gray-950">
      <Navbar
        isDark={isDark}
        onToggleTheme={toggleTheme}
        lang={lang}
        onToggleLang={toggleLang}
        tr={tr}
      />
      <Suspense fallback={<LoadingScreen onComplete={() => {}} />}>
        <Routes>
          <Route path="/" element={<Draft20Page tr={tr} lang={lang} />} />
          <Route path="/company" element={<CompanyPage lang={lang} />} />
        </Routes>
      </Suspense>
      <Footer
        isDark={isDark}
        onToggleTheme={toggleTheme}
        lang={lang}
        onToggleLang={toggleLang}
      />
      <ScrollToTop />
    </div>
  );
}
