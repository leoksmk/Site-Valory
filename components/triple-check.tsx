"use client";

import { useRef, useState } from "react";
import { useLang } from "./lang-context";

type State = "idle" | "run" | "ok" | "bad";

export default function TripleCheck() {
  const { t } = useLang();
  const [counts, setCounts] = useState<[number, number, number]>([0, 0, 0]);
  const [state, setState] = useState<State>("idle");
  const [force, setForce] = useState(false);
  const running = useRef(false);
  const raf = useRef<number[]>([]);

  const statusKey =
    state === "run" ? "tc_status_run"
    : state === "ok" ? "tc_status_ok"
    : state === "bad" ? "tc_status_bad"
    : "tc_status_idle";

  function clearRaf() {
    raf.current.forEach((id) => cancelAnimationFrame(id));
    raf.current = [];
  }

  function reset() {
    clearRaf();
    running.current = false;
    setState("idle");
    setCounts([0, 0, 0]);
  }

  function animateOne(index: number, to: number, duration: number, onDone: () => void) {
    const start = performance.now();
    const step = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const val = Math.round(to * eased);
      setCounts((prev) => {
        const next = [...prev] as [number, number, number];
        next[index] = val;
        return next;
      });
      if (p < 1) raf.current.push(requestAnimationFrame(step));
      else onDone();
    };
    raf.current.push(requestAnimationFrame(step));
  }

  function run() {
    if (running.current) return;
    running.current = true;
    clearRaf();
    setState("run");
    const total = 8 + Math.floor(Math.random() * 8); // 8..15
    const finals: [number, number, number] = [total, total, force ? total - 1 : total];
    let done = 0;
    finals.forEach((to, i) => {
      window.setTimeout(() => {
        animateOne(i, to, 900, () => {
          done++;
          if (done === 3) {
            running.current = false;
            setState(force ? "bad" : "ok");
          }
        });
      }, i * 380);
    });
  }

  function cardClass(i: number) {
    let cls = "tcx__card";
    if (state === "run") cls += " is-run";
    else if (state === "ok") cls += " is-ok";
    else if (state === "bad") cls += " is-bad";
    return cls;
  }

  const names = ["tc_1_t", "tc_2_t", "tc_3_t"] as const;

  return (
    <section className="section" id="triplecheck">
      <div className="section__head reveal">
        <span className="eyebrow">{t("tc_eyebrow")}</span>
        <h2>{t("tc_title")}</h2>
        <p className="section__lead">{t("tc_lead")}</p>
      </div>

      <div className="tcx reveal">
        <div className="tcx__counters">
          {[0, 1, 2].map((i) => (
            <article className={cardClass(i)} key={i}>
              <span className="tcx__id">#{i + 1}</span>
              <span className="tcx__name">{t(names[i])}</span>
              <span className="tcx__num">{counts[i]}</span>
              <span className="tcx__unit">{t("tc_unit")}</span>
            </article>
          ))}
        </div>

        <div className="tcx__panel">
          <div className="tcx__status" data-state={state}>
            <i className="tcx__led" />
            <span>{t(statusKey)}</span>
          </div>
          <div className="tcx__controls">
            <button className="btn btn--gold" onClick={run} disabled={state === "run"}>
              {t("tc_sim_btn")}
            </button>
            <button className="btn btn--ghost" onClick={reset}>
              {t("tc_sim_reset")}
            </button>
            <label className="tcx__toggle">
              <input
                type="checkbox"
                checked={force}
                onChange={(e) => {
                  setForce(e.target.checked);
                  if (state !== "run") reset();
                }}
              />
              <span className="tcx__switch" />
              <span>{t("tc_toggle")}</span>
            </label>
          </div>
        </div>
      </div>
    </section>
  );
}
