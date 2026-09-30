"use client";

import { useEffect, useRef } from "react";
import { useLang } from "./lang-context";
import { Reveal } from "./reveal";

export default function Demo() {
  const { t } = useLang();
  const videoRef = useRef<HTMLVideoElement>(null);
  const shots = ["Dashboard", "Mapa", "Ordens"];
  const caps = ["demo_s1", "demo_s2", "demo_s3"] as const;

  // reproduz em 1,5× (como um GIF: sem controles, em loop)
  useEffect(() => {
    const v = videoRef.current;
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

  return (
    <section className="section" id="demo">
      <Reveal className="section__head">
        <span className="eyebrow">{t("demo_eyebrow")}</span>
        <h2>{t("demo_title")}</h2>
        <p className="section__lead">{t("demo_lead")}</p>
      </Reveal>

      <Reveal className="demo__media">
        <div className="demo__video">
          <video
            ref={videoRef}
            src="/ihm-demo.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
        </div>
      </Reveal>

      <div className="demo__shots">
        {shots.map((s, i) => (
          <Reveal key={s} delay={i * 0.08}>
            <figure className="shot">
              {/* TROCAR: screenshot real */}
              <div className="shot__ph">{s}</div>
              <figcaption>{t(caps[i])}</figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
