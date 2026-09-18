# Valory — Landing Page (RAC)

Landing page estática da **Valory**, apresentando o **RAC** — célula automatizada de cartonização inteligente para alocação de medicamentos em embalagens (Triple Check, visão computacional, zero divergência, NR-12).

Site estático (HTML + CSS + JS puro), **bilíngue PT/EN**, sem build. Roda direto na Vercel ou no GitHub Pages.

## Estrutura

```
index.html            → página única
assets/css/style.css  → tema dourado/escuro + responsivo
assets/js/main.js      → i18n PT/EN, menu, animações
assets/img/            → logo e imagens
```

## Rodar localmente

Abra o `index.html` no navegador, ou sirva a pasta:

```bash
python3 -m http.server 8080
# http://localhost:8080
```

## Publicar na Vercel (recomendado)

Site estático, **sem build**. A Vercel serve a pasta direto.

1. Acesse [vercel.com](https://vercel.com) → **Add New… → Project** → importe `leoksmk/Site-Valory`.
2. **Framework Preset:** `Other` · **Build Command:** vazio · **Output Directory:** `.` (raiz).
   (O `vercel.json` já deixa isso pronto — pode só clicar em **Deploy**.)
3. A branch de **produção** (padrão: `main`) vira a URL principal.
4. **Toda outra branch e cada PR ganham um _Preview URL_ automático** — é assim que você vê esta branch
   (`claude/loving-mccarthy-ea04tw`) no ar sem mexer na produção.

> Importante: se o deploy "não muda", quase sempre é porque as alterações estão numa branch
> diferente da de produção. Faça merge na `main` para atualizar a URL principal, ou use o Preview URL da branch.

## Publicar no GitHub Pages (alternativa)

1. **Settings → Pages → Build and deployment**.
2. **Source: Deploy from a branch** → escolha a branch e a pasta `/ (root)`.
3. Em ~1 min o site fica em `https://<usuário>.github.io/<repo>/`.
   (Pages publica **uma** branch só — por isso mudanças em outra branch não aparecem.)

## O que ainda falta trocar (placeholders)

Marcados no código com comentários `<!-- TROCAR ... -->`:

- **`assets/img/render-placeholder.png`** → render 3D final do equipamento (hero).
- **Bloco `.demo__ph`** (em `index.html`) → vídeo/GIF da IHM em modo demo.
- **`.shot__ph`** (3 quadros) → screenshots reais do dashboard, mapa da bancada e ordens.
- **Seção Contato** → e-mail e telefone reais; o formulário é demonstrativo (integrar com backend/serviço de e-mail depois).

## Textos

Todo o conteúdo bilíngue vive em `assets/js/main.js` (objeto `I18N`, chaves `pt` e `en`). Editar ali atualiza os dois idiomas — a chave `data-i18n` no HTML liga cada texto.
