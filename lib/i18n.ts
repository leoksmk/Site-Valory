export type Lang = "pt" | "en";

export const DICT = {
  pt: {
    nav_solution: "A Solução", nav_how: "Como Funciona", nav_triple: "Triple Check",
    nav_tech: "Tecnologia", nav_demo: "Demonstração", nav_contact: "Contato",

    hero_badge: "Fase 2 → Fase 3 · Em integração",
    hero_title_1: "Alocação de medicamentos",
    hero_title_2: "100% automatizada.",
    hero_sub: "Uma célula robótica que separa, conta e embala medicamentos em caixas — com verificação tripla e zero divergência, sem depender de operação humana intensiva.",
    hero_cta1: "Ver demonstração", hero_cta2: "Como garantimos zero erro",
    hero_demo_tag: "DEMO", hero_demo_note: "Valores ilustrativos de demonstração",

    stat_1: "Contagens independentes (Triple Check)",
    stat_2: "Divergência tolerada na validação",
    stat_3: "Arquitetura de segurança industrial",
    stat_4: "Operação contínua e rastreável",

    sol_eyebrow: "A Solução", sol_title: "O que é o RAC",
    sol_lead: "Uma célula automatizada de cartonização inteligente: ela recebe a ordem de separação, coleta cada medicamento no nicho certo, deposita na embalagem e valida a contagem antes de liberar. Menos erro humano, mais rastreabilidade, throughput previsível.",
    sol_c1_t: "Separa", sol_c1_d: "Dispensers organizados por SKU liberam cada produto de forma controlada, conduzidos por funis ao ponto central.",
    sol_c2_t: "Embala", sol_c2_d: "Uma mesa cartesiana X/Y posiciona a caixa durante o enchimento, distribuindo o conteúdo com precisão.",
    sol_c3_t: "Valida", sol_c3_d: "Cada ordem é conferida por três contagens independentes. Qualquer divergência bloqueia o processo automaticamente.",

    how_eyebrow: "Arquitetura", how_title: "Três níveis funcionais",
    how_lead: "Estrutura modular em perfil de alumínio, projetada para manutenção fácil e segurança NR-12.",
    how_l1_t: "Nível Superior · Dispensação", how_l1_d: "4 dispensers, sistema de funis e distribuidor central que direcionam o fluxo de produtos até a embalagem.",
    how_l2_t: "Nível Intermediário · Cartonização", how_l2_d: "Mesa cartesiana X/Y com célula de carga integrada para posicionamento e pesagem contínua da caixa.",
    how_l3_t: "Nível Inferior · Infra de TI", how_l3_d: "Raspberry Pi, drivers, fontes e cabeamento — o cérebro que orquestra a célula e expõe tudo na IHM web.",

    tc_eyebrow: "O diferencial", tc_title: "Triple Check · Zero Divergência",
    tc_lead: "A decisão de liberar uma embalagem cruza três contagens independentes. Basta uma delas divergir acima da tolerância para o processo bloquear. Rode a simulação:",
    tc_1_t: "Contagem CNC", tc_2_t: "Contagem por Peso", tc_3_t: "Contagem Visual",
    tc_unit: "itens",
    tc_sim_btn: "Simular ciclo", tc_sim_reset: "Reiniciar", tc_toggle: "Forçar divergência",
    tc_status_idle: "Aguardando ciclo", tc_status_run: "Executando ciclo…",
    tc_status_ok: "Sincronizado · Zero divergência", tc_status_bad: "Divergência detectada · Processo bloqueado",

    tech_eyebrow: "Tecnologia", tech_title: "O que há por dentro",
    tech_lead: "Engenharia industrial e software se encontram numa arquitetura distribuída, medindo e registrando cada ciclo.",
    tech_c1_t: "Visão Computacional", tech_c1_d: "Serviço de visão que valida o conteúdo da embalagem — a terceira prova do Triple Check.",
    tech_c2_t: "Zero Divergência", tech_c2_d: "Cruzamento de contagens com tolerância configurável e bloqueio automático fora do limite.",
    tech_c3_t: "Rastreabilidade Total", tech_c3_d: "Cada ciclo, evento e ordem é persistido com carimbo de tempo para auditoria completa.",
    tech_c4_t: "Telemetria & Digital Twin", tech_c4_d: "Posição, peso, corrente e inclinação medidos em tempo real, refletidos num gêmeo digital.",
    tech_c5_t: "Segurança NR-12", tech_c5_d: "Portas de operação e abastecimento, parada de emergência e intertravamento previsto.",
    tech_c6_t: "IHM Web", tech_c6_d: "Painel central em tempo real: contadores, telemetria, ordens e console de operação.",

    demo_eyebrow: "Demonstração", demo_title: "IHM em modo demo",
    demo_lead: "Operação completa sem hardware: criação de ordens, telemetria simulada e Triple Check ao vivo. Vídeo em breve.",
    demo_ph_1: "Espaço reservado para o vídeo da IHM", demo_ph_2: "(substituir por vídeo/GIF)",
    demo_s1: "Dashboard de operação", demo_s2: "Mapa da bancada", demo_s3: "Ordens e rastreabilidade",

    ct_eyebrow: "Contato", ct_title: "Vamos conversar sobre automação",
    ct_lead: "Quer ver o RAC de perto ou levar essa solução para a sua operação? Deixe seu contato — a Valory retorna.",
    ct_email_l: "E-mail", ct_phone_l: "Telefone",
    ct_f_name: "Nome", ct_f_email: "E-mail", ct_f_msg: "Mensagem", ct_f_btn: "Enviar",
    ct_note: "* Formulário demonstrativo — integrar com e-mail/backend depois.",

    footer_tag: "Automação industrial inteligente · RAC NEXT 2K26",
    footer_rights: "Todos os direitos reservados.",
  },
  en: {
    nav_solution: "The Solution", nav_how: "How It Works", nav_triple: "Triple Check",
    nav_tech: "Technology", nav_demo: "Demo", nav_contact: "Contact",

    hero_badge: "Phase 2 → Phase 3 · Integrating",
    hero_title_1: "Medication allocation,",
    hero_title_2: "100% automated.",
    hero_sub: "A robotic cell that sorts, counts and packs medication into boxes — with triple verification and zero divergence, without relying on intensive human labor.",
    hero_cta1: "Watch the demo", hero_cta2: "How we guarantee zero error",
    hero_demo_tag: "DEMO", hero_demo_note: "Illustrative demo values",

    stat_1: "Independent counts (Triple Check)",
    stat_2: "Divergence tolerated at validation",
    stat_3: "Industrial safety architecture",
    stat_4: "Continuous, traceable operation",

    sol_eyebrow: "The Solution", sol_title: "What RAC is",
    sol_lead: "A smart automated cartonization cell: it receives the picking order, collects each item from the right niche, drops it into the box and validates the count before release. Less human error, more traceability, predictable throughput.",
    sol_c1_t: "Sort", sol_c1_d: "SKU-organized dispensers release each product in a controlled way, funneled toward the central point.",
    sol_c2_t: "Pack", sol_c2_d: "A cartesian X/Y table positions the box during filling, distributing contents with precision.",
    sol_c3_t: "Validate", sol_c3_d: "Every order is checked by three independent counts. Any divergence blocks the process automatically.",

    how_eyebrow: "Architecture", how_title: "Three functional levels",
    how_lead: "Modular aluminum-profile structure, designed for easy maintenance and NR-12 safety.",
    how_l1_t: "Top Level · Dispensing", how_l1_d: "4 dispensers, funnel system and central distributor that guide the product flow into the package.",
    how_l2_t: "Middle Level · Cartonization", how_l2_d: "Cartesian X/Y table with an integrated load cell for positioning and continuous weighing of the box.",
    how_l3_t: "Bottom Level · IT Infra", how_l3_d: "Raspberry Pi, drivers, power supplies and wiring — the brain that orchestrates the cell and exposes it all on the web HMI.",

    tc_eyebrow: "The differentiator", tc_title: "Triple Check · Zero Divergence",
    tc_lead: "Releasing a package cross-checks three independent counts. A single one drifting beyond tolerance blocks the process. Run the simulation:",
    tc_1_t: "CNC Count", tc_2_t: "Weight Count", tc_3_t: "Visual Count",
    tc_unit: "items",
    tc_sim_btn: "Simulate cycle", tc_sim_reset: "Reset", tc_toggle: "Force divergence",
    tc_status_idle: "Waiting for cycle", tc_status_run: "Running cycle…",
    tc_status_ok: "Synced · Zero divergence", tc_status_bad: "Divergence detected · Process blocked",

    tech_eyebrow: "Technology", tech_title: "What's inside",
    tech_lead: "Industrial engineering meets software in a distributed architecture, measuring and logging every cycle.",
    tech_c1_t: "Computer Vision", tech_c1_d: "A vision service that validates package contents — the third proof of the Triple Check.",
    tech_c2_t: "Zero Divergence", tech_c2_d: "Cross-checked counts with configurable tolerance and automatic blocking beyond the limit.",
    tech_c3_t: "Full Traceability", tech_c3_d: "Every cycle, event and order is persisted with a timestamp for complete auditing.",
    tech_c4_t: "Telemetry & Digital Twin", tech_c4_d: "Position, weight, current and tilt measured in real time, mirrored in a digital twin.",
    tech_c5_t: "NR-12 Safety", tech_c5_d: "Operation and loading doors, emergency stop and planned interlocking.",
    tech_c6_t: "Web HMI", tech_c6_d: "A real-time central panel: counters, telemetry, orders and an operation console.",

    demo_eyebrow: "Demo", demo_title: "HMI in demo mode",
    demo_lead: "Full operation without hardware: order creation, simulated telemetry and live Triple Check. Video coming soon.",
    demo_ph_1: "Reserved space for the HMI video", demo_ph_2: "(replace with video/GIF)",
    demo_s1: "Operation dashboard", demo_s2: "Workbench map", demo_s3: "Orders & traceability",

    ct_eyebrow: "Contact", ct_title: "Let's talk automation",
    ct_lead: "Want to see RAC up close or bring this solution to your operation? Leave your contact — Valory will get back to you.",
    ct_email_l: "Email", ct_phone_l: "Phone",
    ct_f_name: "Name", ct_f_email: "Email", ct_f_msg: "Message", ct_f_btn: "Send",
    ct_note: "* Demo form — wire it to email/backend later.",

    footer_tag: "Smart industrial automation · RAC NEXT 2K26",
    footer_rights: "All rights reserved.",
  },
} as const;

export type TKey = keyof (typeof DICT)["pt"];
