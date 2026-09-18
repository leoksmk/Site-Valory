"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { Variants } from "framer-motion";
import { useLang } from "./lang-context";

const EASE = [0.22, 0.7, 0.2, 1] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export default function Hero() {
  const { t } = useLang();
  const [peso, setPeso] = useState(128.4);
  const [corr, setCorr] = useState(1.7);

  // telemetria "viva" — pequenas flutuações
  useEffect(() => {
    const id = setInterval(() => {
      setPeso(128 + Math.random() * 1.2);
      setCorr(1.5 + Math.random() * 0.5);
    }, 1400);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="hero" id="hero">
      <div className="hero__grid">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.span className="badge" variants={item}>
            <i className="dot" />
            {t("hero_badge")}
          </motion.span>
          <motion.h1 className="hero__title" variants={item}>
            <span>{t("hero_title_1")}</span>
            <span className="g">{t("hero_title_2")}</span>
          </motion.h1>
          <motion.p className="hero__sub" variants={item}>
            {t("hero_sub")}
          </motion.p>
          <motion.div className="hero__cta" variants={item}>
            <a href="#demo" className="btn btn--dark">
              {t("hero_cta1")}
            </a>
            <a href="#contato" className="btn btn--ghost">
              {t("hero_cta2")}
            </a>
          </motion.div>
          <motion.div className="hero__metrics" variants={item}>
            <div className="metric">
              <div className="n">3<span className="u">×</span></div>
              <div className="l">{t("stat_1")}</div>
            </div>
            <div className="metric">
              <div className="n">0<span className="u">%</span></div>
              <div className="l">{t("stat_2")}</div>
            </div>
            <div className="metric">
              <div className="n">24/7</div>
              <div className="l">{t("stat_4")}</div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero__visual"
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.25, ease: EASE }}
        >
          <div className="stage" id="stage">
            <div className="stage__top">
              <span className="t">RAC · TELEMETRIA EM TEMPO REAL</span>
              <span className="stage__live">
                <b />
                LIVE
              </span>
            </div>
            {/* TROCAR: /render-placeholder.png pelo render 3D final (ou modelo STL 3D) */}
            <div className="stage__screen">
              <Image src="/render-placeholder.png" alt="Valory RAC" width={660} height={517} priority />
            </div>
            <div className="stage__chips">
              <div className="chip">
                <div className="k">PESO LÍQUIDO</div>
                <div className="v">{peso.toFixed(1)}g</div>
              </div>
              <div className="chip">
                <div className="k">CORRENTE</div>
                <div className="v">{corr.toFixed(1)}A</div>
              </div>
              <div className="chip ok">
                <div className="k">TRIPLE CHECK</div>
                <div className="v">9=9=9</div>
              </div>
            </div>
            <motion.div
              className="stage__float"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <div className="t">Status</div>
              <div className="v">✓ {t("tc_status_ok").split("·")[1]?.trim() || "Zero divergência"}</div>
            </motion.div>
          </div>
        </motion.div>
      </div>
      <a href="#solucao" className="hero__scroll" aria-label="Rolar">
        <span />
      </a>
    </section>
  );
}
