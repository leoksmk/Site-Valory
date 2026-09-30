"use client";

import { useEffect, useState } from "react";

type Theme = "pearl" | "dark";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("pearl");

  useEffect(() => {
    try {
      const t = localStorage.getItem("valory_theme");
      if (t === "dark" || t === "pearl") setTheme(t);
      else setTheme((document.documentElement.dataset.theme as Theme) || "pearl");
    } catch {}
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "pearl" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("valory_theme", next);
    } catch {}
  }

  return (
    <button
      className="theme"
      onClick={toggle}
      aria-label="Alternar tema"
      title={theme === "dark" ? "Mudar para Pérola" : "Mudar para Preto"}
    >
      {theme === "dark" ? "☀" : "☾"}
    </button>
  );
}
