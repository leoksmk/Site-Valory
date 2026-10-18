"use client";

import { useLang } from "./lang-context";
import { Reveal } from "./reveal";

const STEPS = [
  { n: "01", tt: "sol_c1_t", dd: "sol_c1_d" },
  { n: "02", tt: "sol_c2_t", dd: "sol_c2_d" },
  { n: "03", tt: "sol_c3_t", dd: "sol_c3_d" },
] as const;

export default function Solution() {
  const { t } = useLang();
  return (
    <section className="section" id="solucao">
      <div className="split">
        <Reveal className="section__head section__head--left split__head">
          <span className="eyebrow">{t("sol_eyebrow")}</span>
          <h2>{t("sol_title")}</h2>
          <p className="section__lead">{t("sol_lead")}</p>
        </Reveal>

        <div className="process" role="list">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.08} className="process__step">
              <span className="process__n" aria-hidden="true">{s.n}</span>
              <div role="listitem">
                <h3>{t(s.tt)}</h3>
                <p>{t(s.dd)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
