"use client";

import { useLang } from "./lang-context";
import { Reveal } from "./reveal";

export default function Solution() {
  const { t } = useLang();
  const cards = [
    { step: "01", ico: "◧", tt: "sol_c1_t", dd: "sol_c1_d" },
    { step: "02", ico: "⊞", tt: "sol_c2_t", dd: "sol_c2_d" },
    { step: "03", ico: "✓", tt: "sol_c3_t", dd: "sol_c3_d" },
  ] as const;

  return (
    <section className="section" id="solucao">
      <Reveal className="section__head">
        <span className="eyebrow">{t("sol_eyebrow")}</span>
        <h2>{t("sol_title")}</h2>
        <p className="section__lead">{t("sol_lead")}</p>
      </Reveal>

      <div className="cards cards--3">
        {cards.map((c, i) => (
          <Reveal key={c.step} delay={i * 0.1}>
            <article className="card spot">
              <span className="card__step">{c.step}</span>
              <div className="card__ico">{c.ico}</div>
              <h3>{t(c.tt)}</h3>
              <p>{t(c.dd)}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
