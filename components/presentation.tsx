"use client";

import { useLang } from "./lang-context";
import { Reveal } from "./reveal";
import { SITE } from "@/lib/site-data";

export default function Presentation() {
  const { t } = useLang();
  return (
    <section className="section sec-dark" id="apresentacao">
      <Reveal className="section__head">
        <span className="eyebrow">{t("pres_eyebrow")}</span>
        <h2>{t("pres_title")}</h2>
        <p className="section__lead">{t("pres_lead")}</p>
      </Reveal>

      <Reveal className="pres">
        <div className="pres__frame">
          <iframe
            src={SITE.presentation.embedUrl}
            title="Valory RAC — Apresentação"
            allowFullScreen
            loading="lazy"
            frameBorder={0}
          />
        </div>
        <a
          className="pres__fs"
          href={SITE.presentation.pubUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {t("pres_fs")} ↗
        </a>
      </Reveal>
    </section>
  );
}
