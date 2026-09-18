"use client";

import { useLang } from "./lang-context";

export default function Levels() {
  const { t } = useLang();
  const levels = [
    { n: "01", tt: "how_l1_t", dd: "how_l1_d" },
    { n: "02", tt: "how_l2_t", dd: "how_l2_d" },
    { n: "03", tt: "how_l3_t", dd: "how_l3_d" },
  ] as const;

  return (
    <section className="section section--alt" id="como">
      <div className="section__head reveal">
        <span className="eyebrow">{t("how_eyebrow")}</span>
        <h2>{t("how_title")}</h2>
        <p className="section__lead">{t("how_lead")}</p>
      </div>

      <div className="levels">
        {levels.map((l) => (
          <div className="level spot reveal" key={l.n}>
            <span className="level__n">{l.n}</span>
            <div>
              <h3>{t(l.tt)}</h3>
              <p>{t(l.dd)}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
