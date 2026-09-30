"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "./lang-context";
import { Reveal } from "./reveal";
import type { TKey } from "@/lib/i18n";

type Clip = { id: string; key: TKey; src: string | null; rate?: number };

// A bancada/estrutura vem primeiro (padrão). src null = placeholder até o vídeo chegar.
const CLIPS: Clip[] = [
  { id: "estrutura", key: "demo_estrutura", src: null }, // TROCAR: /demo-estrutura.webm
  { id: "ihm", key: "demo_ihm", src: "/ihm-demo.mp4", rate: 1.5 },
  { id: "dashboard", key: "demo_s1", src: "/demo-dashboard.webm" },
  { id: "ordens", key: "demo_s3", src: "/demo-ordens.webm" },
];

export default function Demo() {
  const { t } = useLang();
  const [active, setActive] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const clip = CLIPS[active];

  // velocidade por clipe (IHM em 1,5×)
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const rate = clip.rate ?? 1;
    const setRate = () => {
      v.playbackRate = rate;
    };
    setRate();
    v.addEventListener("loadedmetadata", setRate);
    v.addEventListener("play", setRate);
    return () => {
      v.removeEventListener("loadedmetadata", setRate);
      v.removeEventListener("play", setRate);
    };
  }, [active, clip.rate]);

  function choose(i: number) {
    setActive(i);
    // o escolhido "sobe" para o display
    requestAnimationFrame(() => {
      stageRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }

  return (
    <section className="section" id="demo">
      <Reveal className="section__head">
        <span className="eyebrow">{t("demo_eyebrow")}</span>
        <h2>{t("demo_title")}</h2>
        <p className="section__lead">{t("demo_lead")}</p>
      </Reveal>

      {/* DISPLAY em destaque */}
      <Reveal className="demo__stage-wrap">
        <div className="demo__stage" ref={stageRef}>
          <AnimatePresence mode="wait">
            <motion.div
              key={clip.id}
              className="demo__stage-media"
              initial={{ opacity: 0, y: 16, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.22, 0.7, 0.2, 1] }}
            >
              {clip.src ? (
                <video
                  ref={videoRef}
                  src={clip.src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                />
              ) : (
                <div className="demo__stage-ph">
                  <div className="demo__play">▶</div>
                  <p>{t("demo_soon")}</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
          <div className="demo__cap">{t(clip.key)}</div>
        </div>
      </Reveal>

      {/* SELETOR (miniaturas) */}
      <div className="demo__thumbs">
        {CLIPS.map((c, i) => (
          <Reveal key={c.id} delay={i * 0.06}>
            <button
              type="button"
              className={`demo__thumb${i === active ? " is-active" : ""}`}
              onClick={() => choose(i)}
              aria-label={t(c.key)}
            >
              <div className="demo__thumb-media">
                {c.src ? (
                  <video src={`${c.src}#t=0.2`} muted playsInline preload="metadata" />
                ) : (
                  <span className="demo__thumb-ph" />
                )}
                <span className="demo__thumb-play">▶</span>
              </div>
              <span className="demo__thumb-cap">{t(c.key)}</span>
            </button>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
