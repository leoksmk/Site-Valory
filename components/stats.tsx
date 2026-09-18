"use client";

import { useLang } from "./lang-context";
import CountUp from "./count-up";

export default function Stats() {
  const { t } = useLang();
  return (
    <section className="stats">
      <div className="stat spot reveal">
        <div className="stat__num">
          <CountUp target={3} suffix="×" />
        </div>
        <div className="stat__lbl">{t("stat_1")}</div>
      </div>
      <div className="stat spot reveal">
        <div className="stat__num">
          <CountUp target={0} suffix="%" />
        </div>
        <div className="stat__lbl">{t("stat_2")}</div>
      </div>
      <div className="stat spot reveal">
        <div className="stat__num stat__num--txt">NR-12</div>
        <div className="stat__lbl">{t("stat_3")}</div>
      </div>
      <div className="stat spot reveal">
        <div className="stat__num stat__num--txt">24/7</div>
        <div className="stat__lbl">{t("stat_4")}</div>
      </div>
    </section>
  );
}
