"use client";

import { useState } from "react";
import { useLang } from "./lang-context";
import { Reveal } from "./reveal";
import { SITE } from "@/lib/site-data";

type Status = "idle" | "sending" | "ok" | "error";

export default function Contact() {
  const { t } = useLang();
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", email: "", msg: "" });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("bad response");
      setStatus("ok");
      setForm({ name: "", email: "", msg: "" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="section section--tint" id="contato">
      <Reveal className="contact">
        <div className="contact__copy">
          <span className="eyebrow">{t("ct_eyebrow")}</span>
          <h2>{t("ct_title")}</h2>
          <p>{t("ct_lead")}</p>
          <ul className="contact__info">
            {/* TROCAR: e-mail e telefone reais */}
            <li>
              <span>{t("ct_email_l")}</span>
              <a href={`mailto:${SITE.contact.email}`}>{SITE.contact.email}</a>
            </li>
            <li>
              <span>{t("ct_phone_l")}</span>
              <a href={`tel:${SITE.contact.phoneHref}`}>{SITE.contact.phoneLabel}</a>
            </li>
          </ul>
        </div>

        <form className="contact__form spot" onSubmit={onSubmit}>
          <label>
            <span>{t("ct_f_name")}</span>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </label>
          <label>
            <span>{t("ct_f_email")}</span>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </label>
          <label>
            <span>{t("ct_f_msg")}</span>
            <textarea
              rows={4}
              value={form.msg}
              onChange={(e) => setForm({ ...form, msg: e.target.value })}
            />
          </label>
          <button className="btn btn--gold" type="submit" disabled={status === "sending"}>
            {status === "sending" ? "…" : t("ct_f_btn")}
          </button>
          {status === "ok" && <small className="contact__ok">✓ OK</small>}
          <small className="contact__note">{t("ct_note")}</small>
        </form>
      </Reveal>
    </section>
  );
}
