import { NextResponse } from "next/server";

/**
 * Endpoint de contato.
 *
 * Valida a mensagem e encaminha para o e-mail da equipe (só no servidor,
 * o endereço nunca aparece no site).
 *
 * Envio:
 *  - Se RESEND_API_KEY estiver definida na Vercel, usa a Resend.
 *  - Senão, usa o FormSubmit (grátis, sem chave). No PRIMEIRO envio o
 *    FormSubmit manda um e-mail de ativação para CONTACT_TO; clique em
 *    "Activate" e os próximos chegam normalmente.
 *
 * CONTACT_TO (env) troca o destinatário sem mexer no código.
 */
const CONTACT_TO = process.env.CONTACT_TO || "leonardokenmiwa@gmail.com";
const SITE_URL = "https://valory-p5rj4oqth-leoksmk.vercel.app";

function esc(s: string) {
  return s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
}

async function sendResend(name: string, email: string, msg: string) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM || "VALORY <onboarding@resend.dev>",
      to: [CONTACT_TO],
      reply_to: email,
      subject: `Contato pelo site · ${name}`,
      html: `<p><b>Nome:</b> ${esc(name)}</p><p><b>E-mail:</b> ${esc(email)}</p><p><b>Mensagem:</b><br>${esc(msg).replace(/\n/g, "<br>")}</p>`,
    }),
  });
  return res.ok;
}

async function sendFormSubmit(name: string, email: string, msg: string, origin: string) {
  const res = await fetch(`https://formsubmit.co/ajax/${CONTACT_TO}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Origin: origin,
      Referer: origin + "/",
    },
    body: JSON.stringify({
      _subject: `Contato pelo site VALORY · ${name}`,
      _template: "table",
      _captcha: "false",
      _replyto: email,
      nome: name,
      email,
      mensagem: msg || "(sem mensagem)",
    }),
  });
  if (!res.ok) return false;
  const data = await res.json().catch(() => null);
  return data?.success === true || data?.success === "true";
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const name = String(data?.name ?? "").trim().slice(0, 120);
    const email = String(data?.email ?? "").trim().slice(0, 200);
    const msg = String(data?.msg ?? "").trim().slice(0, 4000);

    if (!name || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
    }

    const origin = req.headers.get("origin") || SITE_URL;
    const sent = process.env.RESEND_API_KEY
      ? await sendResend(name, email, msg)
      : await sendFormSubmit(name, email, msg, origin);

    if (!sent) {
      console.error("[contato] falha no envio", { name, email });
      return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }
}
