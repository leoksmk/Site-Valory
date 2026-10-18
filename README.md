# VALORY · Landing Page

Landing page da **Valory**, apresentando a **VALORY**: célula automatizada de cartonização inteligente para alocação de medicamentos em embalagens (Triple Check, visão computacional, zero divergência, NR-12).

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS. **Bilíngue PT/EN.** Pronta para deploy na Vercel.

## Estrutura

```
app/
  layout.tsx          → metadata + fontes (next/font) + provider de idioma
  page.tsx            → monta as seções
  globals.css         → design system (tema dourado/escuro) + responsivo
  api/contact/route.ts→ endpoint do formulário de contato
components/
  nav, hero, marquee, stats, solution, levels, triple-check,
  tech, demo, contact, footer, background, interactions, count-up
  lang-context.tsx    → contexto React de idioma (PT/EN, persiste em localStorage)
lib/i18n.ts           → dicionário PT/EN tipado (fonte única dos textos)
public/               → logo e imagens
legacy-static/        → versão estática antiga (referência; não usada no deploy)
```

## Rodar localmente

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # build de produção
npm start       # sobe o build
```

## Deploy na Vercel

1. [vercel.com](https://vercel.com) → **Add New… → Project** → importe `leoksmk/Site-Valory`.
2. A Vercel detecta **Next.js** sozinha, não precisa configurar nada. Clique em **Deploy**.
3. A branch de **produção** (padrão: `main`) vira a URL principal; **cada outra branch/PR ganha um Preview URL automático**.

> Se o deploy "não muda", é porque as alterações estão numa branch diferente da de produção.
> Faça merge na `main` para atualizar a URL principal.

## Formulário de contato

`app/api/contact/route.ts` valida o POST e encaminha a mensagem por e-mail (só no servidor).
Padrão: FormSubmit, sem chave. No primeiro envio chega um e-mail de ativação no destinatário; clique em "Activate".
Opcional na Vercel (Settings → Environment Variables): `CONTACT_TO` troca o destinatário; `RESEND_API_KEY` passa a usar a Resend.

## O que ainda falta trocar (placeholders)

Marcados no código com `TROCAR`:

- **`public/render-placeholder.png`** → render 3D final (hero).
- **`components/demo.tsx`** → vídeo/GIF da IHM (`.demo__ph`) e as 3 screenshots (`.shot__ph`).
- **`components/contact.tsx`** → e-mail e telefone reais.
- **Logo:** `public/logo.webp` ainda tem fundo branco; substituir por PNG transparente.

## Textos (PT/EN)

Tudo vem de `lib/i18n.ts` (objeto `DICT`, chaves `pt` e `en`). Editar ali atualiza os dois idiomas de uma vez.
Os componentes leem via `t("chave")` do contexto de idioma.
