import { useEffect, useState } from "react";
import { t, type Lang, type Translations } from "../i18n/translations";

export function useLang(): {
  lang: Lang;
  tr: Translations;
  toggle: () => void;
} {
  const [lang, setLang] = useState<Lang>(() => {
    const saved = localStorage.getItem("lang") as Lang | null;
    return saved ?? "ko";
  });

  // Mirror the active locale onto <html lang="…"> so screen readers and
  // search engines see the right language for the rendered content.
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const toggle = () =>
    setLang((prev) => {
      const next: Lang = prev === "ko" ? "en" : "ko";
      localStorage.setItem("lang", next);
      return next;
    });

  return { lang, tr: t[lang], toggle };
}
