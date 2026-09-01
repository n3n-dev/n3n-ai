import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import type { Lang, Translations } from "../i18n/translations";

interface Props {
  isDark: boolean;
  onToggleTheme: () => void;
  lang: Lang;
  onToggleLang: () => void;
  tr: Translations;
}

// Routes where the navbar is only shown while the Hero is in view.
// Once the user scrolls past the Hero, it disappears so the scroll
// experience isn't interrupted. Users rely on the scroll-to-top button
// to come back up.
const HERO_ONLY_ROUTES = new Set<string>([
  "/draft0-5",
  "/draft0-2",
  "/draft0-3",
]);

// Routes whose hero uses a light/cream background. The navbar text and
// logo need to stay dark on these — the default treatment (white logo
// via invert + white "Company" text) is invisible on cream.
const LIGHT_HERO_ROUTES = new Set<string>(["/draft11-2", "/company"]);

export default function Navbar({ lang }: Props) {
  const [pastHero, setPastHero] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const heroOnly = HERO_ONLY_ROUTES.has(location.pathname);
  const lightHero = LIGHT_HERO_ROUTES.has(location.pathname);
  const onCompany = location.pathname === "/company";

  // On /company, the logo (and the page's close button) should return the
  // user to whichever draft they came from, not the root landing. We use
  // navigate(-1) when this session has prior history; if /company was opened
  // directly we fall back to "/".
  const goBack = () => {
    if (location.key !== "default") navigate(-1);
    else navigate("/");
  };

  useEffect(() => {
    const onScroll = () => {
      setPastHero(window.scrollY > window.innerHeight * 0.85);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll and listen for Escape while the mobile overlay is open.
  useEffect(() => {
    if (!mobileOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen]);

  if (heroOnly && pastHero) return null;

  // Keep the navbar transparent at all scroll positions — never flip to the
  // white/light chrome.
  const showScrolledChrome = false;

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          showScrolledChrome
            ? "bg-white/92 dark:bg-gray-950/92 backdrop-blur-md border-b border-gray-200/70 dark:border-white/8 shadow-sm"
            : pastHero
              ? "bg-white/55 backdrop-blur-md border-b border-black/5"
              : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-[1fr_auto_1fr] items-center h-16 md:h-20 pt-1 md:pt-2 gap-2 md:gap-4">
          {/* Left spacer */}
          <div />

          {/* Center: Logo — Titangate style. On /company the logo acts as a
            "back" affordance instead of routing to the landing page so users
            return to the draft they came from. */}
          {onCompany ? (
            <button
              type="button"
              onClick={goBack}
              className="flex items-center justify-center group bg-transparent border-0 p-0 cursor-pointer"
              aria-label="Back"
            >
              <img
                src={`${import.meta.env.BASE_URL}logo-n3n.png`}
                alt="N3N"
                width={738}
                height={227}
                className="h-7 w-auto transition-all"
              />
            </button>
          ) : (
            <Link
              to="/"
              className="flex items-center justify-center group"
              aria-label="N3N Home"
            >
              <img
                src={`${import.meta.env.BASE_URL}logo-n3n.png`}
                alt="N3N"
                width={738}
                height={227}
                className={`h-6 md:h-7 w-auto transition-all ${
                  lightHero || pastHero ? "" : "invert"
                }`}
              />
            </Link>
          )}

          {/* Right: Company pill */}
          <div className="flex items-center justify-end gap-1.5">
            {!onCompany && (
              <Link
                to="/company"
                className={`hidden md:inline-flex items-center px-4 md:px-5 py-1.5 md:py-2 rounded-lg backdrop-blur-md font-grotesk text-[10px] md:text-[12px] font-medium uppercase tracking-[0.22em] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent ${
                  lightHero || pastHero
                    ? "bg-[#0B0B0B]/5 hover:bg-[#0B0B0B]/10 text-[#0B0B0B]/80 hover:text-[#0B0B0B]"
                    : "bg-white/10 hover:bg-white/15 text-white/90 hover:text-white"
                }`}
                aria-label="Company"
              >
                Company
              </Link>
            )}

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              aria-expanded={mobileOpen}
              className={`md:hidden relative z-50 inline-flex items-center justify-center p-2 bg-transparent border-0 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent ${
                mobileOpen
                  ? "text-white"
                  : lightHero || pastHero
                    ? "text-[#0B0B0B]"
                    : "text-white"
              }`}
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X size={24} strokeWidth={2.2} />
              ) : (
                <Menu size={24} strokeWidth={2.2} />
              )}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile fullscreen overlay menu — rendered as a sibling of
          motion.header so its `fixed inset-0` is positioned relative to the
          viewport, not the header. framer-motion applies `transform` to
          motion.header (for the y:0 entrance animation), which would
          otherwise turn it into a containing block and trap the overlay
          inside the ~64px header strip. */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="md:hidden fixed inset-0 z-40 bg-[#050A18]/98 backdrop-blur-md overscroll-contain"
            role="dialog"
            aria-modal="true"
          >
            <nav className="h-full w-full flex flex-col items-center justify-center gap-8 px-6">
              {!onCompany && (
                <Link
                  to="/company"
                  onClick={() => setMobileOpen(false)}
                  className="font-grotesk text-[22px] font-medium tracking-tight text-white/90 hover:text-white transition-colors"
                >
                  {lang === "ko" ? "회사소개" : "Company"}
                </Link>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
