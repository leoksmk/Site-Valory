"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { DICT, type Lang, type TKey } from "@/lib/i18n";

type Ctx = {
  lang: Lang;
  t: (key: TKey) => string;
  toggle: () => void;
  setLang: (l: Lang) => void;
};

const LangContext = createContext<Ctx | null>(null);

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("pt");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("valory_lang") as Lang | null;
      if (saved === "pt" || saved === "en") setLangState(saved);
    } catch {}
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("valory_lang", l);
    } catch {}
    document.documentElement.lang = l === "en" ? "en" : "pt-BR";
  }, []);

  const toggle = useCallback(() => {
    setLang(lang === "en" ? "pt" : "en");
  }, [lang, setLang]);

  const t = useCallback((key: TKey) => DICT[lang][key] ?? DICT.pt[key] ?? "", [lang]);

  return (
    <LangContext.Provider value={{ lang, t, toggle, setLang }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LangProvider");
  return ctx;
}
