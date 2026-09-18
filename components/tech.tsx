"use client";

import { useLang } from "./lang-context";

export default function Tech() {
  const { t } = useLang();
  const cards = [
    { ico: "◎", tt: "tech_c1_t", dd: "tech_c1_d" },
    { ico: "⚖", tt: "tech_c2_t", dd: "tech_c2_d" },
    { ico: "◫", tt: "tech_c3_t", dd: "tech_c3_d" },
    { ico: "⟳", tt: "tech_c4_t", dd: "tech_c4_d" },
    { ico: "⛨", tt: "tech_c5_t", dd: "tech_c5_d" },
    { ico: "▦", tt: "tech_c6_t", dd: "tech_c6_d" },
  ] as const;

  return (
    <section className="section section--alt" id="tecnologia">
      <div className="section__head reveal">
        <span className="eyebrow">{t("tech_eyebrow")}</span>
        <h2>{t("tech_title")}</h2>
        <p className="section__lead">{t("tech_lead")}</p>
      </div>

      <div className="cards cards--3">
        {cards.map((c) => (
          <article className="card card--tech spot reveal" key={c.tt}>
            <div className="card__ico">{c.ico}</div>
            <h3>{t(c.tt)}</h3>
            <p>{t(c.dd)}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
