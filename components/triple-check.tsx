"use client";

import { useRef, useState } from "react";
import { useLang } from "./lang-context";
import { Reveal } from "./reveal";
import { SITE } from "@/lib/site-data";

type State = "idle" | "run" | "ok" | "bad";

// layout da caixa (px, coordenadas dentro da cena)
const PER_ROW = 5;
const SLOT_W = 34;
const SLOT_H = 20;
const PILL_STYLES = ["a", "b", "c", "a", "b", "c", "a", "b", "c", "a"] as const;

export default function TripleCheck() {
  const { t } = useLang();
  const [counts, setCounts] = useState<[number, number, number]>([0, 0, 0]);
  const [state, setState] = useState<State>("idle");
  const [force, setForce] = useState(false);
  const [total, setTotal] = useState(0);
  const [landed, setLanded] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const to = useRef<ReturnType<typeof setTimeout> | null>(null);

  function clearAll() {
    if (timer.current) clearInterval(timer.current);
    if (to.current) clearTimeout(to.current);
    timer.current = null;
    to.current = null;
  }

  function reset() {
    clearAll();
    setState("idle");
    setCounts([0, 0, 0]);
    setLanded(0);
    setTotal(0);
  }

  function run() {
    if (state === "run") return;
    clearAll();
    const { minItems, maxItems } = SITE.tripleCheck;
    const tot = minItems + Math.floor(Math.random() * (maxItems - minItems + 1));
    setTotal(tot);
    setState("run");
    setCounts([0, 0, 0]);
    setLanded(0);
    let step = 0;
    timer.current = setInterval(() => {
      step++;
      setLanded(step);
      // #1 CNC e #2 Peso contam cada item; #3 Visão "perde" o último quando forçamos divergência
      const visual = force ? Math.min(step, tot - 1) : step;
      setCounts([step, step, visual]);
      if (step >= tot) {
        clearAll();
        to.current = setTimeout(() => setState(force ? "bad" : "ok"), 520);
      }
    }, 320);
  }

  const cardCls =
    state === "run" ? " is-run" : state === "ok" ? " is-ok" : state === "bad" ? " is-bad" : "";
  const names = ["tc_1_t", "tc_2_t", "tc_3_t"] as const;
  const statusKey =
    state === "run" ? "tc_status_run"
    : state === "ok" ? "tc_status_ok"
    : state === "bad" ? "tc_status_bad"
    : "tc_status_idle";

  // posições de repouso das cápsulas dentro da caixa (px, origem = topo da caixa)
  const BOX_INNER_H = 172;
  const pills = Array.from({ length: Math.max(total, 0) }, (_, i) => {
    const row = Math.floor(i / PER_ROW);
    const col = i % PER_ROW;
    const restX = 16 + col * SLOT_W + (row % 2) * 6;
    const restY = BOX_INNER_H - 26 - row * SLOT_H; // empilha do fundo para cima
    const isLanded = i < landed;
    // a #3 (visão) "não vê" o último item quando há divergência forçada
    const missed = state !== "idle" && force && i === total - 1 && i < landed;
    return { i, restX, restY, isLanded, missed, style: PILL_STYLES[i % PILL_STYLES.length] };
  });

  return (
    <section className="section sec-dark" id="triplecheck">
      <Reveal className="section__head">
        <span className="eyebrow">{t("tc_eyebrow")}</span>
        <h2>{t("tc_title")}</h2>
        <p className="section__lead">{t("tc_lead")}</p>
      </Reveal>

      <Reveal className="tcx">
        <div className="tcx__stage-wrap">
          {/* CENA: caixa recebendo os medicamentos */}
          <div className="tcx__scene">
            <div className="tcx__dispenser">
              <span className="tcx__nozzle" />
            </div>
            <div className={`tcx__box${state === "ok" ? " ok" : ""}${state === "bad" ? " bad" : ""}`}>
              <div className="tcx__box-inner">
                {pills.map((p) => (
                  <span
                    key={p.i}
                    className={`pill pill--${p.style}${p.isLanded ? " in" : ""}${p.missed ? " missed" : ""}`}
                    style={
                      p.isLanded
                        ? { transform: `translate(${p.restX}px, ${p.restY}px)` }
                        : { transform: `translate(${16 + (p.i % PER_ROW) * SLOT_W}px, -36px)` }
                    }
                  />
                ))}
              </div>
              {/* feixe da visão computacional */}
              {state === "run" && <span className="tcx__scan" />}
              <span className="tcx__box-tag">
                <b>{landed}</b>/{total || "—"}
              </span>
            </div>
            <span className="tcx__box-label">CAIXA · RAC</span>
          </div>

          {/* CONTADORES */}
          <div className="tcx__counters tcx__counters--v">
            {[0, 1, 2].map((i) => (
              <article className={`tcx__card${cardCls}`} key={i}>
                <div className="tcx__card-top">
                  <span className="tcx__id">#{i + 1}</span>
                  <span className="tcx__name">{t(names[i])}</span>
                </div>
                <span className="tcx__num">{counts[i]}</span>
                <span className="tcx__unit">{t("tc_unit")}</span>
              </article>
            ))}
          </div>
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
      </Reveal>
    </section>
  );
}
