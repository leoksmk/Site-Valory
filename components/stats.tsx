"use client";

import { useLang } from "./lang-context";
import CountUp from "./count-up";
import { Reveal } from "./reveal";

export default function Stats() {
  const { t } = useLang();
  return (
    <section className="stats">
      <Reveal delay={0}>
        <div className="stat spot">
          <div className="stat__num">
            <CountUp target={3} suffix="×" />
          </div>
          <div className="stat__lbl">{t("stat_1")}</div>
        </div>
      </Reveal>
      <Reveal delay={0.08}>
        <div className="stat spot">
          <div className="stat__num">
            <CountUp target={0} suffix="%" />
          </div>
          <div className="stat__lbl">{t("stat_2")}</div>
        </div>
      </Reveal>
      <Reveal delay={0.16}>
        <div className="stat spot">
          <div className="stat__num stat__num--txt">NR-12</div>
          <div className="stat__lbl">{t("stat_3")}</div>
        </div>
      </Reveal>
      <Reveal delay={0.24}>
        <div className="stat spot">
          <div className="stat__num stat__num--txt">24/7</div>
          <div className="stat__lbl">{t("stat_4")}</div>
        </div>
      </Reveal>
    </section>
  );
}
