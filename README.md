# Valory — Landing Page (RAC)

Landing page estática da **Valory**, apresentando o **RAC** — célula automatizada de cartonização inteligente para alocação de medicamentos em embalagens (Triple Check, visão computacional, zero divergência, NR-12).

Site estático (HTML + CSS + JS puro), **bilíngue PT/EN**, sem build. Roda direto no GitHub Pages.

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

## Publicar no GitHub Pages

1. Faça push para o repositório.
2. **Settings → Pages → Build and deployment**.
3. **Source: Deploy from a branch** → escolha a branch (ex.: `main`) e a pasta `/ (root)`.
4. Salve. Em ~1 min o site fica no ar em `https://<usuário>.github.io/<repo>/`.

## O que ainda falta trocar (placeholders)

Marcados no código com comentários `<!-- TROCAR ... -->`:

- **`assets/img/render-placeholder.png`** → render 3D final do equipamento (hero).
- **Bloco `.demo__ph`** (em `index.html`) → vídeo/GIF da IHM em modo demo.
- **`.shot__ph`** (3 quadros) → screenshots reais do dashboard, mapa da bancada e ordens.
- **Seção Contato** → e-mail e telefone reais; o formulário é demonstrativo (integrar com backend/serviço de e-mail depois).

## Textos

Todo o conteúdo bilíngue vive em `assets/js/main.js` (objeto `I18N`, chaves `pt` e `en`). Editar ali atualiza os dois idiomas — a chave `data-i18n` no HTML liga cada texto.
