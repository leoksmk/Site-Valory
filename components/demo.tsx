"use client";

import { useLang } from "./lang-context";
import { Reveal } from "./reveal";

export default function Demo() {
  const { t } = useLang();
  const shots = ["Dashboard", "Mapa", "Ordens"];
  const caps = ["demo_s1", "demo_s2", "demo_s3"] as const;

  return (
    <section className="section sec-dark" id="demo">
      <Reveal className="section__head">
        <span className="eyebrow">{t("demo_eyebrow")}</span>
        <h2>{t("demo_title")}</h2>
        <p className="section__lead">{t("demo_lead")}</p>
      </Reveal>

      {/* TROCAR: vídeo/GIF da IHM no lugar de .demo__ph */}
      <Reveal className="demo__media spot">
        <div className="demo__ph">
          <div className="demo__play">▶</div>
          <p>
            {t("demo_ph_1")}
            <br />
            <small>{t("demo_ph_2")}</small>
          </p>
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
