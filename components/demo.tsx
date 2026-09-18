"use client";

import { useLang } from "./lang-context";

export default function Demo() {
  const { t } = useLang();
  const shots = ["Dashboard", "Mapa", "Ordens"];
  const caps = ["demo_s1", "demo_s2", "demo_s3"] as const;

  return (
    <section className="section" id="demo">
      <div className="section__head reveal">
        <span className="eyebrow">{t("demo_eyebrow")}</span>
        <h2>{t("demo_title")}</h2>
        <p className="section__lead">{t("demo_lead")}</p>
      </div>

      {/* TROCAR: coloque o vídeo/GIF da IHM no lugar de .demo__ph */}
      <div className="demo__media reveal spot">
        <div className="demo__ph">
          <div className="demo__play">▶</div>
          <p>
            {t("demo_ph_1")}
            <br />
            <small>{t("demo_ph_2")}</small>
          </p>
        </div>
      </div>

      <div className="demo__shots">
        {shots.map((s, i) => (
          <figure className="shot reveal" key={s}>
            {/* TROCAR: substitua .shot__ph pela screenshot real */}
            <div className="shot__ph">{s}</div>
            <figcaption>{t(caps[i])}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
