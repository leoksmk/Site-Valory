"use client";

import { useRef, useState } from "react";
import { useLang } from "./lang-context";
import { Reveal } from "./reveal";
import { SITE } from "@/lib/site-data";

type Phase = "idle" | "cnc" | "peso" | "visao" | "ok" | "bad";

const UNIT_G = 12; // peso por caixa de remédio (ilustrativo)
const COLS = 4;
const IW = 50;
const IH = 30;
const GAPX = 8;
const GAPY = 10;
const PADX = 16;
const BOX_H = 212;
const MED_TINTS = ["t1", "t2", "t3", "t4", "t2", "t1", "t3", "t4", "t1", "t2"] as const;

export default function TripleCheck() {
  const { t } = useLang();
  const [phase, setPhase] = useState<Phase>("idle");
  const [total, setTotal] = useState(0);
  const [placed, setPlaced] = useState(0);
  const [weight, setWeight] = useState(0);
  const [scanIndex, setScanIndex] = useState(0);
  const [force, setForce] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const raf = useRef<number[]>([]);

  const missedIndex = force ? total - 1 : -1;
  const c1 = placed;
  const c2 = Math.round(weight / UNIT_G);
  const c3 = missedIndex >= 0 ? Math.max(0, scanIndex - (scanIndex > missedIndex ? 1 : 0)) : scanIndex;

  function clearAll() {
    timers.current.forEach((x) => {
      clearInterval(x);
      clearTimeout(x);
    });
    raf.current.forEach((id) => cancelAnimationFrame(id));
    timers.current = [];
    raf.current = [];
  }

  function reset() {
    clearAll();
    setPhase("idle");
    setTotal(0);
    setPlaced(0);
    setWeight(0);
    setScanIndex(0);
  }

  function run() {
    if (phase !== "idle" && phase !== "ok" && phase !== "bad") return;
    clearAll();
    const { minItems, maxItems } = SITE.tripleCheck;
    const tot = minItems + Math.floor(Math.random() * (maxItems - minItems + 1));
    setTotal(tot);
    setPlaced(0);
    setWeight(0);
    setScanIndex(0);
    setPhase("cnc");

    // ETAPA 1 — CNC: coleta e posiciona cada caixa
    let n = 0;
    const iv = setInterval(() => {
      n++;
      setPlaced(n);
      if (n >= tot) {
        clearInterval(iv);
        timers.current.push(setTimeout(() => startPeso(tot), 620));
      }
    }, 300);
    timers.current.push(iv);
  }

  function startPeso(tot: number) {
    setPhase("peso");
    const target = tot * UNIT_G;
    const dur = 1300;
    const start = performance.now();
    const step = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setWeight(target * eased);
      if (p < 1) raf.current.push(requestAnimationFrame(step));
      else timers.current.push(setTimeout(() => startVisao(tot), 620));
    };
    raf.current.push(requestAnimationFrame(step));
  }

  function startVisao(tot: number) {
    setPhase("visao");
    let i = 0;
    const iv = setInterval(() => {
      i++;
      setScanIndex(i);
      if (i >= tot) {
        clearInterval(iv);
        timers.current.push(
          setTimeout(() => setPhase(force ? "bad" : "ok"), 800)
        );
      }
    }, 230);
    timers.current.push(iv);
  }

  const running = phase === "cnc" || phase === "peso" || phase === "visao";
  const statusKey =
    phase === "cnc" ? "tc_ph_cnc"
    : phase === "peso" ? "tc_ph_peso"
    : phase === "visao" ? "tc_ph_visao"
    : phase === "ok" ? "tc_status_ok"
    : phase === "bad" ? "tc_status_bad"
    : "tc_status_idle";
  const statusState =
    phase === "ok" ? "ok" : phase === "bad" ? "bad" : running ? "run" : "idle";

  // etapas do stepper
  const steps = [
    { key: "tc_1_t", n: c1, active: phase === "cnc", done: ["peso", "visao", "ok", "bad"].includes(phase) },
    { key: "tc_2_t", n: c2, active: phase === "peso", done: ["visao", "ok", "bad"].includes(phase) },
    { key: "tc_3_t", n: c3, active: phase === "visao", done: ["ok", "bad"].includes(phase) },
  ] as const;

  const boxState = phase === "ok" ? " ok" : phase === "bad" ? " bad" : "";

  const items = Array.from({ length: Math.max(total, 0) }, (_, i) => {
    const row = Math.floor(i / COLS);
    const col = i % COLS;
    const restX = PADX + col * (IW + GAPX);
    const restY = BOX_H - 20 - row * (IH + GAPY);
    const isPlaced = i < placed;
    const seen = (phase === "visao" || phase === "ok" || phase === "bad") && i < scanIndex && i !== missedIndex;
    const missed = (phase === "visao" || phase === "bad") && i === missedIndex && scanIndex > i;
    return { i, restX, restY, isPlaced, seen, missed, tint: MED_TINTS[i % MED_TINTS.length] };
  });

  return (
    <section className="section sec-dark" id="triplecheck">
      <Reveal className="section__head">
        <span className="eyebrow">{t("tc_eyebrow")}</span>
        <h2>{t("tc_title")}</h2>
        <p className="section__lead">{t("tc_lead")}</p>
      </Reveal>

      <Reveal className="tcx">
        {/* STEPPER — 3 etapas */}
        <div className="tcx__steps">
          {steps.map((s, i) => (
            <div
              key={s.key}
              className={`tcx__step${s.active ? " active" : ""}${s.done ? " done" : ""}${
                phase === "bad" && i === 2 ? " bad" : ""
              }`}
            >
              <span className="tcx__step-badge">{i + 1}</span>
              <div className="tcx__step-txt">
                <span className="tcx__step-name">{t(s.key)}</span>
                <span className="tcx__step-num">
                  {s.n}
                  <small>{t("tc_unit")}</small>
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* CENA */}
        <div className={`tcx__scene phase-${phase}`}>
          <div className="tcx__stagelbl">{t(statusKey)}</div>

          <div className={`tcx__box${boxState}`}>
            <div className="tcx__box-flap" />
            <div className="tcx__box-inner">
              {items.map((it) => (
                <span
                  key={it.i}
                  className={`med med--${it.tint}${it.isPlaced ? " in" : ""}${it.seen ? " seen" : ""}${
                    it.missed ? " miss" : ""
                  }`}
                  style={
                    it.isPlaced
                      ? { transform: `translate(${it.restX}px, ${it.restY}px)` }
                      : { transform: `translate(${PADX + (it.i % COLS) * (IW + GAPX)}px, -46px)` }
                  }
                >
                  <b />
                </span>
              ))}
            </div>
            {(phase === "visao") && <span className="tcx__scan" />}
            <span className="tcx__box-tag">
              <b>{Math.max(placed, 0)}</b>/{total || "—"}
            </span>
          </div>

          {/* balança (etapa peso) */}
          <div className={`tcx__scale${phase === "peso" ? " on" : ""}`}>
            <div className="tcx__scale-plate" />
            <div className="tcx__scale-read">
              <span className="tcx__scale-k">{t("tc_weight")}</span>
              <span className="tcx__scale-v">{Math.round(weight)}<small>g</small></span>
            </div>
          </div>

          <span className="tcx__scene-cap">CAIXA · RAC</span>
        </div>

        {/* PAINEL */}
        <div className="tcx__panel">
          <div className="tcx__status" data-state={statusState}>
            <i className="tcx__led" />
            <span>{t(statusKey)}</span>
          </div>
          <div className="tcx__controls">
            <button className="btn btn--gold" onClick={run} disabled={running}>
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
                  if (!running) reset();
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
