import { Fragment } from "react";

const TERMS = [
  "Triple Check", "Zero Divergência", "Visão Computacional",
  "Digital Twin", "Rastreabilidade Total", "Segurança NR-12", "IHM Web",
];

export default function Marquee() {
  const loop = [...TERMS, ...TERMS];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {loop.map((term, i) => (
          <Fragment key={i}>
            <span>{term}</span>
            <i>◆</i>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
