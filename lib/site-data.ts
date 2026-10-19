/**
 * DADOS DO SITE: fonte única e editável.
 *
 * Os valores abaixo marcados como "ILUSTRATIVO" são de DEMONSTRAÇÃO.
 * Troque pelos números reais do projeto quando forem definidos.
 * (Os textos em PT/EN ficam em lib/i18n.ts.)
 */

export const SITE = {
  /**
   * Formulário de contato (Web3Forms, envio pelo navegador).
   * Chave pública gerada em https://web3forms.com para o e-mail da equipe;
   * as mensagens chegam nesse e-mail. A chave pode ficar no código (é pública).
   */
  web3formsKey: "5d65a73c-ed01-44e9-bcc4-a48bb3a076de",

  /**
   * Painel de telemetria do hero: SIMULAÇÃO no front-end (valores ilustrativos).
   * Os valores flutuam entre base e base+var para dar sensação de "ao vivo".
   */
  telemetry: {
    peso: { base: 128, var: 1.2, unit: "g", label: "PESO LÍQUIDO" }, // ILUSTRATIVO
    corrente: { base: 1.5, var: 0.5, unit: "A", label: "CORRENTE" }, // ILUSTRATIVO
    tripleCheck: "9=9=9", // ILUSTRATIVO
    intervalMs: 1400,
  },

  /** Simulador do Triple Check: faixa de itens por ciclo (animação da caixa). */
  tripleCheck: {
    minItems: 6, // ILUSTRATIVO
    maxItems: 10, // ILUSTRATIVO
  },

  /** Apresentação do projeto (Google Slides publicado). */
  presentation: {
    // URL de EMBED (troque /pub por /embed). Para atualizar, publique de novo o slide.
    embedUrl:
      "https://docs.google.com/presentation/d/e/2PACX-1vQ3cz3cnaj9uqXICVv6ombTSNDixmBCYZefDJbgKY0II6ERSBu5CvbAGQBMvn1kpr2ANlOr64HIcfmq/pub?start=false&loop=false&delayms=3000",
    // https://docs.google.com/presentation/d/1bm1OaYtGqh8J2t4KdJdqMiBPKRbhfaszUfmiO1heXik/edit?usp=sharing
    pubUrl:
      "https://docs.google.com/presentation/d/e/2PACX-1vQ3cz3cnaj9uqXICVv6ombTSNDixmBCYZefDJbgKY0II6ERSBu5CvbAGQBMvn1kpr2ANlOr64HIcfmq/pub?start=false&loop=false&delayms=3000&slide=id.p",
  },
} as const;
