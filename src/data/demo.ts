// Dados exclusivamente demonstrativos. Nada aqui vem das referências nem de backend real.
export const demo = {
  company: "Empresa Demo",
  campaign: "Apresentação Nexya",
  contact: "Contato Demo",
  phoneLabel: "•••• 0000",
  agents: {
    support: "Agente de atendimento",
    messages: "Agente de mensagens",
    voice: "Agente de voz",
    text: "Agente de texto",
  },
  incomingMessage: "Olá! Quero conhecer a solução.",
  agentReply: "Olá! Vou te ajudar a conhecer a Nexya.",
  status: {
    campaignIdle: "Pronta",
    campaign: "Em execução",
    agent: "Em atendimento",
    call: "Em andamento",
  },
  indicators: ["3 agentes ativos", "12 conversas demo", "1 campanha demo"],
  seal: "Demonstração",
  customization: [
    { label: "Identidade da empresa", value: "Empresa Demo" },
    { label: "Tom de voz", value: "Claro e acolhedor" },
    { label: "Fluxos de atendimento", value: "Atendimento" },
  ],
  callStartSeconds: 12, // timer demonstrativo avança a partir daqui
  cta: "Conheça a Nexya",
  nav: ["Painel", "Agentes", "Campanhas", "Respostas", "Voz", "Integrações"],
} as const;

export const copy = {
  opening: {
    before: "O ",
    highlight: "futuro",
    after: " do atendimento já começou.",
  },
  hub: "Agentes de IA em voz e texto",
  customization: "Sua identidade. Seus sistemas. Seus canais.",
  campaign: "Da campanha à conversa.",
  voice: "Ligações com agentes de voz",
  connected: "Sua marca. Seus fluxos.",
  closing: "Transforme seu atendimento.",
} as const;
