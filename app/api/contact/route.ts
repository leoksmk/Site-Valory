import { NextResponse } from "next/server";

/**
 * Endpoint de contato.
 *
 * Hoje apenas valida e registra a mensagem (log do servidor). Para enviar
 * e-mail de verdade, plugue um provedor aqui — ex.: Resend, SendGrid ou SMTP —
 * usando uma variável de ambiente na Vercel (Settings → Environment Variables):
 *
 *   const { Resend } = await import("resend");
 *   const resend = new Resend(process.env.RESEND_API_KEY);
 *   await resend.emails.send({ ... });
 */
export async function POST(req: Request) {
  try {
    const data = await req.json();
    const name = String(data?.name ?? "").trim();
    const email = String(data?.email ?? "").trim();
    const msg = String(data?.msg ?? "").trim();

    if (!name || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
    }

    // TODO: integrar provedor de e-mail. Por enquanto, apenas loga.
    console.log("[contato]", { name, email, msg });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }
}
