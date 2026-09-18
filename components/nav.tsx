"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useLang } from "./lang-context";

const LINKS: Array<{ href: string; key: Parameters<ReturnType<typeof useLang>["t"]>[0] }> = [
  { href: "#solucao", key: "nav_solution" },
  { href: "#como", key: "nav_how" },
  { href: "#triplecheck", key: "nav_triple" },
  { href: "#tecnologia", key: "nav_tech" },
  { href: "#demo", key: "nav_demo" },
  { href: "#contato", key: "nav_contact" },
];

export default function Nav() {
  const { t, lang, toggle } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`nav${scrolled ? " is-scrolled" : ""}`}>
      <a href="#hero" className="nav__brand" onClick={() => setOpen(false)}>
        <Image src="/logo-mark.png" alt="Valory" width={36} height={38} className="nav__logo" priority />
        <span className="nav__name">VALORY</span>
      </a>

      <nav className={`nav__links${open ? " is-open" : ""}`}>
        {LINKS.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
            {t(l.key)}
          </a>
        ))}
      </nav>

      <div className="nav__actions">
        <button className="lang" onClick={toggle} aria-label="Idioma">
          <span className={`lang__pt${lang === "pt" ? " is-active" : ""}`}>PT</span>
          <span className="lang__sep">/</span>
          <span className={`lang__en${lang === "en" ? " is-active" : ""}`}>EN</span>
        </button>
        <button className="nav__burger" onClick={() => setOpen((v) => !v)} aria-label="Menu">
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
