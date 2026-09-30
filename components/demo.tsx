"use client";

import { useEffect, useRef } from "react";
import { useLang } from "./lang-context";
import { Reveal } from "./reveal";

export default function Demo() {
  const { t } = useLang();
  const mainRef = useRef<HTMLVideoElement>(null);

  // vídeo principal (IHM) em 1,5×
  useEffect(() => {
    const v = mainRef.current;
    if (!v) return;
    const setRate = () => {
      v.playbackRate = 1.5;
    };
    setRate();
    v.addEventListener("loadedmetadata", setRate);
    v.addEventListener("play", setRate);
    return () => {
      v.removeEventListener("loadedmetadata", setRate);
      v.removeEventListener("play", setRate);
    };
  }, []);

  const shots = [
    { key: "demo_s1", src: "/demo-dashboard.webm" }, // Dashboard
    { key: "demo_s2", src: null }, // Mapa (placeholder)
    { key: "demo_s3", src: "/demo-ordens.webm" }, // Ordens SD serviço
  ] as const;

  return (
    <section className="section" id="demo">
      <Reveal className="section__head">
        <span className="eyebrow">{t("demo_eyebrow")}</span>
        <h2>{t("demo_title")}</h2>
        <p className="section__lead">{t("demo_lead")}</p>
      </Reveal>

      <Reveal className="demo__media">
        <div className="demo__video">
          <video ref={mainRef} src="/ihm-demo.mp4" autoPlay muted loop playsInline preload="auto" />
        </div>
      </Reveal>

      <div className="demo__shots">
        {shots.map((s, i) => (
          <Reveal key={s.key} delay={i * 0.08}>
            <figure className="shot">
              {s.src ? (
                <div className="shot__video">
                  <video src={s.src} autoPlay muted loop playsInline preload="metadata" />
                </div>
              ) : (
                <div className="shot__ph">{t(s.key).split(" ")[0]}</div>
              )}
              <figcaption>{t(s.key)}</figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
