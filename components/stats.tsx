"use client";

import { useLang } from "./lang-context";
import CountUp from "./count-up";
import { Reveal } from "./reveal";
import type { TKey } from "@/lib/i18n";

// Números reais do projeto (deck RAC): 3 contagens, tolerância zero, 8 nichos N1–N8, NR-12.
const ITEMS: Array<{ n?: number; suf?: string; text?: string; key: TKey }> = [
  { n: 3, suf: "×", key: "stat_1" },
  { n: 0, suf: "%", key: "stat_2" },
  { n: 8, key: "stat_4" },
  { text: "NR-12", key: "stat_3" },
];

export default function Stats() {
  const { t } = useLang();
  return (
    <section className="stats-wrap">
      <div className="stats">
        {ITEMS.map((s, i) => (
          <Reveal key={s.key} delay={i * 0.06}>
            <div className="stat">
              <div className="stat__num">
                {s.text ?? <CountUp target={s.n ?? 0} suffix={s.suf} />}
              </div>
              <div className="stat__lbl">{t(s.key)}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
