"use client";

import Image from "next/image";
import { useLang } from "./lang-context";
import { Reveal } from "./reveal";

const LEVELS = [
  { n: "01", tt: "how_l1_t", dd: "how_l1_d" },
  { n: "02", tt: "how_l2_t", dd: "how_l2_d" },
  { n: "03", tt: "how_l3_t", dd: "how_l3_d" },
] as const;

export default function Levels() {
  const { t } = useLang();
  return (
    <section className="section section--tint" id="como">
      <div className="split">
        <Reveal className="section__head section__head--left split__head">
          <span className="eyebrow">{t("how_eyebrow")}</span>
          <h2>{t("how_title")}</h2>
          <p className="section__lead">{t("how_lead")}</p>
          <div className="levels__figure">
            <Image src="/render-placeholder.png" alt="Estrutura do RAC em 3 níveis" width={660} height={517} />
          </div>
        </Reveal>

        <div className="rows" role="list">
          {LEVELS.map((l, i) => (
            <Reveal key={l.n} delay={i * 0.08} className="row">
              <span className="row__n" aria-hidden="true">{l.n}</span>
              <div role="listitem">
                <h3>{t(l.tt)}</h3>
                <p>{t(l.dd)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
