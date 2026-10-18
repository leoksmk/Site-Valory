"use client";

import { useLang } from "./lang-context";
import { Reveal } from "./reveal";

const SPECS = [
  { ico: "◎", tt: "tech_c1_t", dd: "tech_c1_d" },
  { ico: "⚖", tt: "tech_c2_t", dd: "tech_c2_d" },
  { ico: "◫", tt: "tech_c3_t", dd: "tech_c3_d" },
  { ico: "⟳", tt: "tech_c4_t", dd: "tech_c4_d" },
  { ico: "⛨", tt: "tech_c5_t", dd: "tech_c5_d" },
  { ico: "▦", tt: "tech_c6_t", dd: "tech_c6_d" },
] as const;

export default function Tech() {
  const { t } = useLang();
  return (
    <section className="section" id="tecnologia">
      <Reveal className="section__head section__head--left">
        <span className="eyebrow">{t("tech_eyebrow")}</span>
        <h2>{t("tech_title")}</h2>
        <p className="section__lead">{t("tech_lead")}</p>
      </Reveal>

      <div className="spec">
        {SPECS.map((s, i) => (
          <Reveal key={s.tt} delay={(i % 3) * 0.06} className="spec__cell">
            <span className="spec__ico" aria-hidden="true">{s.ico}</span>
            <h3>{t(s.tt)}</h3>
            <p>{t(s.dd)}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
