/**
 * DADOS DO SITE — fonte única e editável.
 *
 * Os valores abaixo marcados como "ILUSTRATIVO" são de DEMONSTRAÇÃO.
 * Troque pelos números reais do projeto quando forem definidos.
 * (Os textos em PT/EN ficam em lib/i18n.ts.)
 */

export const SITE = {
  /** Contato exibido na seção "Contato" e no rodapé. */
  contact: {
    email: "contato@valory.com", // TROCAR pelo e-mail real
    phoneLabel: "+55 (00) 0000-0000", // TROCAR pelo telefone real (exibição)
    phoneHref: "+550000000000", // TROCAR pelo telefone real (link tel:)
  },

  /**
   * Painel de telemetria do hero — SIMULAÇÃO no front-end (valores ilustrativos).
   * Os valores flutuam entre base e base+var para dar sensação de "ao vivo".
   */
  telemetry: {
    peso: { base: 128, var: 1.2, unit: "g", label: "PESO LÍQUIDO" }, // ILUSTRATIVO
    corrente: { base: 1.5, var: 0.5, unit: "A", label: "CORRENTE" }, // ILUSTRATIVO
    tripleCheck: "9=9=9", // ILUSTRATIVO
    intervalMs: 1400,
  },

  /** Simulador do Triple Check: faixa de itens por ciclo. */
  tripleCheck: {
    minItems: 8, // ILUSTRATIVO
    maxItems: 15, // ILUSTRATIVO
  },
} as const;
