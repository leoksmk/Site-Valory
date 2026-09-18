"use client";

import Image from "next/image";
import { useLang } from "./lang-context";

export default function Hero() {
  const { t } = useLang();
  return (
    <section className="hero" id="hero">
      <div className="hero__grid">
        <div className="hero__copy reveal">
          <span className="badge">
            <i className="dot" />
            <span>{t("hero_badge")}</span>
          </span>
          <h1 className="hero__title">
            <span>{t("hero_title_1")}</span>
            <span className="grad shimmer">{t("hero_title_2")}</span>
          </h1>
          <p className="hero__sub">{t("hero_sub")}</p>
          <div className="hero__cta">
            <a href="#demo" className="btn btn--gold">
              {t("hero_cta1")}
            </a>
            <a href="#triplecheck" className="btn btn--ghost">
              {t("hero_cta2")}
            </a>
          </div>
        </div>

        <div className="hero__visual reveal" id="tilt">
          {/* TROCAR: substitua /render-placeholder.png pelo render 3D final */}
          <div className="hero__frame" id="tiltInner">
            <div className="hero__frameGlow" />
            <Image
              src="/render-placeholder.png"
              alt="Valory RAC"
              width={660}
              height={517}
              className="hero__img"
              priority
            />
            <span className="hero__tag">RAC · NEXT 2K26</span>
            <span className="hero__chip hero__chip--1">◎ Visão</span>
            <span className="hero__chip hero__chip--2">⚖ Peso</span>
          </div>
        </div>
      </div>
      <a href="#solucao" className="hero__scroll" aria-label="Rolar">
        <span />
      </a>
    </section>
  );
}
