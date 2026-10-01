# Nexya — roteiro e guia de produção do motion

Versão de produção: 1.1 — 1 de outubro de 2026. Atualizada com as referências de marca adicionais.

Este material contém um roteiro de 30 segundos, direção de arte, narração, especificação das telas demonstrativas, passo a passo de produção e um briefing em JSON para um agente de programação. É uma especificação para produzir o vídeo; não contém um projeto Remotion implementado nem um MP4 renderizado.

## 1. Objetivo e decisões de produção

Apresentar a Nexya como um hub de agentes de IA para atendimento, com campanhas de mensagens e ligações feitas com IA. A sequência deve mostrar como essas capacidades se conectam, usando o design das referências fornecidas.

- Duração: 30 segundos.
- Composição principal: 1920 × 1080, 16:9, 30 FPS, 900 frames. Assumida para apresentação da plataforma e demonstração de interfaces.
- Composição secundária: 1080 × 1920, 9:16, 30 FPS, 900 frames, com layout próprio para redes sociais.
- Idioma: português brasileiro.
- Tom: claro, confiante, tecnológico, com foco no produto.
- CTA: “Conheça a Nexya”. Encerramento falado: “Nexya. Transforme seu atendimento.” Sem endereço ou contato inventado.
- Fluxo: marca → agentes em voz e texto → personalização e integrações → campanhas e atendimento → chamada → operação conectada → marca e CTA.
- Ligações: mostrar uma chamada em andamento. A direção da chamada não foi confirmada; não afirmar que o produto recebe chamadas ou faz chamadas ativas nesta versão.
- Telas de agentes e voz: representações conceituais das capacidades informadas pelo usuário. Não tratar disposição de controles, transcrição ou indicadores desenhados para o vídeo como prova de funcionalidades adicionais existentes.

As referências comerciais mencionam atendimento 24/7 e integração com canais. A versão curta prioriza capacidades e personalização. Não apresentar ganhos percentuais, multiplicadores de atendimento, investimento acumulado, exclusividade de mercado, zero erros ou vendas garantidas como resultados comprovados. Logos de integrações específicas devem ser usados somente após confirmar os canais que se deseja promover.

## 2. Tratamento das referências e dos dados

Os dois prints servem apenas como referência visual. Não incorporar os prints originais em frames, texturas, fundos ou thumbnails. Recriar a interface em componentes React e preencher todos os elementos com conteúdo demonstrativo novo.

Não copiar nomes, números, cidades, campanhas, mensagens, datas nem métricas dos prints. Não fazer OCR para montar uma base de clientes. Não conectar o projeto de vídeo ao backend real.

Usar dados centralizados em `src/data/demo.ts`, por exemplo:

- Empresa: “Empresa Demo”.
- Campanha: “Apresentação Nexya”.
- Contato: “Contato Demo”.
- Identificador telefônico: “•••• 0000”; nunca usar um telefone discável.
- Agentes: “Agente de atendimento”, “Agente de mensagens”, “Agente de voz”.
- Mensagem recebida: “Olá! Quero conhecer a solução.”
- Resposta demonstrativa: “Olá! Vou te ajudar a conhecer a Nexya.”
- Estado de campanha: “Em execução”.
- Estado de agente: “Em atendimento”.
- Estado de chamada: “Em andamento”.
- Indicadores opcionais: “3 agentes ativos”, “12 conversas demo”, “1 campanha demo”.
- Selo discreto nas telas: “Demonstração”.

Indicadores animados ilustram a operação, não desempenho real. Evitar uma taxa de sucesso ou um contador de vendas.

## 3. Direção de arte

### Identidade visual

As referências mostram fundo verde muito escuro, painéis em verde fechado, turquesa nos destaques, branco suave nos textos, bordas discretas e cantos arredondados. Preservar essa linguagem.

Paleta sugerida, aproximada visualmente; substituir pelos tokens reais da marca se estiverem disponíveis:

| Uso | Cor sugerida |
|---|---|
| Fundo principal | `#061A17` |
| Sidebar | `#0A2A25` |
| Superfície de cards | `#12332E` |
| Destaque turquesa | `#14D8CD` |
| Texto principal | `#F2F7F6` |
| Texto secundário | `#9AB5B0` |
| Estado positivo | `#26C978` |

Fonte sugerida: Inter, pesos 400, 600 e 700, carregada localmente. Não alegar que é a fonte exata dos prints.

Usar o logo oficial em SVG ou PNG transparente. Se ele ainda não estiver disponível, trabalhar com a palavra “Nexya” e deixar a substituição simples. Não inventar um símbolo semelhante e apresentá-lo como logo oficial.

### Referências adicionais de marca

Os materiais adicionais apresentam preto e verde escuro, textos brancos com palavras em turquesa, objetos translúcidos em vidro 3D, reflexos ciano e grandes elementos de marca parcialmente fora do enquadramento. A estética deve aparecer na abertura e no encerramento, mantendo a interface legível nas cenas de produto.

O posicionamento fornecido enfatiza agentes de atendimento em voz e texto, configuração com a identidade da empresa, linguagem adaptada ao público, fluxos personalizados e integração com sistemas e canais. Estes pontos passam a orientar o roteiro.

Para obter o vidro 3D: usar uma forma de marca autorizada em Three.js/React Three Fiber, com material transmissivo, extrusão, iluminação e ambiente de reflexo controlado. Se o asset da marca não estiver disponível, usar objetos abstratos de vidro ao lado do wordmark oficial, sem inventar um novo símbolo da Nexya. A fidelidade do material deve ser avaliada em um frame antes de animar a rotação. É uma recomendação de implementação, não um efeito automático garantido.

A primeira versão pode usar perspectivas e camadas 2D, mas um renderizador 3D é adequado para reproduzir melhor a transmissão e os reflexos do vidro das novas referências. Prever mais tempo de renderização e medir com uma amostra curta.

### Linguagem de movimento

- Aproximações curtas e suaves, entre aproximadamente 1,00 e 1,12 de escala para detalhes de interface.
- Uma ação principal por cena.
- Entradas de elementos em sequência com pequenos intervalos.
- Easing consistente, sem quicar todos os cards.
- Brilho turquesa pontual em conexões, botões e estados ativos.
- Separação dos painéis em camadas com profundidade sutil.
- Conexões SVG que se desenham entre módulos.
- Transições que reaproveitam a forma de um elemento: card vira painel; barra vira onda; onda vira conexão.

A sensação de profundidade pode ser feita com CSS e perspectiva. Three.js é opcional para a abertura ou para uma cena de módulos flutuantes. A primeira versão pode ser construída inteiramente em React, SVG e Remotion.

### Legibilidade

No horizontal, aproximar o painel relevante em cada cena e reduzir menus sem importância. No vertical, usar cards empilhados e detalhes em tela cheia, com título próprio. Não encolher o dashboard desktop inteiro para caber no celular.

Como ponto de partida no vertical, reservar pelo menos 90 px nas laterais, 180 px no topo e 300 px na base para textos principais; revisar essas margens na aplicação de destino antes da publicação. São escolhas de layout, não uma especificação oficial de área segura.

## 4. Roteiro completo por cena

Os intervalos usam início inclusivo e fim exclusivo. As transições estão dentro das janelas: 900 frames no total. A narração é proposta editorial baseada no contexto fornecido, sem validação independente das capacidades comerciais.

### Cena 1 — futuro do atendimento: 0–3 s / frames 0–89

**Objetivo:** abrir com uma imagem de marca reconhecível.

**Visual:** fundo preto esverdeado. Um objeto de vidro com reflexos turquesa entra parcialmente no quadro e gira lentamente. Logo ou wordmark Nexya permanece limpo e legível.

**Ação:** entre 0 e 0,8 s, reflexo atravessa o vidro. Até 1,5 s, o texto é revelado em duas entradas. Manter leitura até 2,5 s e começar a passagem para o hub nos últimos 0,5 s.

**Texto:** “O futuro do atendimento já começou.” Destacar “futuro” em turquesa.

**Narração:** “O futuro do atendimento já começou.”

**Som:** impacto curto e entrada da trilha. **Transição:** o reflexo do objeto vira uma linha de conexão.

### Cena 2 — voz e texto: 3–7 s / frames 90–209

**Objetivo:** definir o produto antes de apresentar funções.

**Visual:** núcleo Nexya com cards “Agente de texto” e “Agente de voz”. Ícones de mensagem e onda de áudio aparecem de forma contida; o shell da plataforma emerge ao fundo.

**Ação:** cards entram sequencialmente durante o primeiro segundo, linhas conectam os agentes ao hub e uma leve aproximação destaca seus estados.

**Texto:** “Agentes de IA em voz e texto”.

**Narração:** “Conheça a Nexya: agentes de IA em voz e texto.”

**Som:** dois acentos discretos. **Transição:** um card do agente se expande no painel de personalização.

### Cena 3 — personalização e integração: 7–12 s / frames 210–359

**Objetivo:** mostrar a adaptação ao negócio e a conexão com a operação.

**Visual:** painel conceitual “Seu agente”, com três campos demonstrativos: “Identidade da empresa”, “Tom de voz” e “Fluxos de atendimento”. O nome “Empresa Demo” preenche o primeiro campo; “Claro e acolhedor” aparece no segundo; “Atendimento” no terceiro. Ao lado, cards genéricos “Seus sistemas” e “Seus canais” se conectam ao agente.

**Ação:** campos aparecem em sequência até 9 s. Entre 9 e 11 s, conexões se desenham para sistemas e canais. Segurar o resultado e começar a próxima cena.

**Texto:** “Sua identidade. Seus sistemas. Seus canais.”

**Narração:** “Personalizados para sua empresa e conectados aos seus sistemas e canais.”

**Som:** acentos leves de configuração. **Transição:** a conexão do card de canais conduz ao painel de campanha.

**Representação:** a tela é conceitual; não alegar que estes campos já existem exatamente assim no frontend. Não adicionar treinamento de modelo, fine-tuning ou integrações com marcas específicas por inferência.

### Cena 4 — campanha e atendimento: 12–18 s / frames 360–539

**Objetivo:** demonstrar a sequência campanha → resposta → atuação do agente.

**Visual:** painel de campanha no design dos primeiros prints, com a campanha fictícia “Apresentação Nexya”. Em seguida, caixa de respostas ampliada com um agente identificado.

**Ação:** 12–13 s: campanha entra. 13–14 s: botão “Iniciar campanha” é acionado e o status vira “Em execução”. 14–15 s: uma mensagem demonstrativa chega: “Olá! Quero conhecer a solução.” 15–16 s: indicador de digitação. 16–18 s: resposta do agente: “Olá! Vou te ajudar a conhecer a Nexya.”

**Texto:** “Da campanha à conversa.”

**Narração:** “Centralize campanhas e transforme respostas em atendimento com inteligência artificial.”

**Som:** clique e uma notificação, em volume baixo. **Transição:** o badge do agente dá lugar ao módulo de voz; não afirmar ligação automática após uma resposta.

**Legibilidade:** usar mensagens curtas e remover detalhes secundários da interface. Se seis segundos não forem suficientes, reduzir movimentos e manter a sequência principal, sem acelerar a leitura.

### Cena 5 — ligações com IA: 18–24 s / frames 540–719

**Objetivo:** mostrar a capacidade de voz como parte do hub.

**Visual:** painel conceitual “Agente de voz”, “Chamada em andamento”, “Contato Demo”, “•••• 0000”. Onda turquesa no centro. Objeto de vidro discreto na borda para conectar a cena à marca.

**Ação:** painel ganha foco, onda acompanha o frame ou um áudio autorizado e o timer demonstrativo avança. Não mostrar direção de chamada sem confirmação. Não acrescentar uma transcrição como função nativa não confirmada.

**Texto:** “Ligações com agentes de voz”.

**Narração:** “Amplie sua operação com ligações feitas por agentes de voz.”

**Som:** acento de conexão. Uma única narração principal, sem uma segunda voz sobreposta. **Transição:** onda se estende e conecta os módulos.

### Cena 6 — operação conectada: 24–27 s / frames 720–809

**Objetivo:** fixar a combinação de personalização, fluxos e centralização.

**Visual:** hub no centro; painéis de mensagens, atendimento e voz ao redor. Um pulso turquesa percorre as conexões.

**Ação:** câmera se afasta, elementos se alinham e o conjunto fica estável. Não simular milhares de atendimentos nem ganhos percentuais.

**Texto:** “Sua marca. Seus fluxos.”

**Narração:** “Sua marca. Seus fluxos. Uma operação conectada.”

**Som:** acento na convergência. **Transição:** módulos desaparecem, mantendo a marca.

### Cena 7 — marca e CTA: 27–30 s / frames 810–899

**Objetivo:** encerrar com identidade e próxima ação.

**Visual:** Nexya em branco, subtítulo “Transforme seu atendimento.”, botão turquesa “Conheça a Nexya”. Objeto de vidro permanece parcialmente fora do quadro, com reflexo lento.

**Ação:** marca e CTA entram até 28 s; reservar aproximadamente dois segundos para leitura.

**Narração:** “Nexya. Transforme seu atendimento.”

**Som:** assinatura curta e fade da trilha. Inserir URL ou contato somente após receber o destino oficial.

## 5. Narração pronta

O futuro do atendimento já começou.

Conheça a Nexya: agentes de IA em voz e texto.

Personalizados para sua empresa e conectados aos seus sistemas e canais.

Centralize campanhas e transforme respostas em atendimento com inteligência artificial.

Amplie sua operação com ligações feitas por agentes de voz.

Sua marca. Seus fluxos. Uma operação conectada.

Nexya. Transforme seu atendimento.

Direção vocal: natural, confiante, clara; sem leitura exagerada de anúncio. Confirmar a pronúncia da marca com uma referência autorizada. Gerar as sete frases separadamente ajuda a sincronizar a montagem.

Os tempos são alvos. Medir os arquivos antes de finalizar: ajustar pausas e distribuição se necessário, mantendo 30 segundos e evitando cortes de palavras. A versão anterior da narração foi substituída por esta; não combinar os dois textos.

## 6. Passo a passo para produzir

### Etapa 1 — preparar ferramentas e materiais

Instalar Node.js na versão LTS oferecida no site oficial. Abrir um editor com um agente de programação capaz de editar o projeto, como Cursor, Codex ou Claude Code. Verificar no terminal:

```bash
node -v
npm -v
```

Separar o logo oficial, a fonte e os áudios, quando disponíveis. As referências de design devem ficar fora de `public/`, para não serem incorporadas acidentalmente à renderização. Ao fornecer referências a outro serviço, usar cópias com dados sensíveis removidos ou fornecer apenas as especificações visuais deste guia.

### Etapa 2 — criar um projeto exclusivo para o vídeo

Em uma pasta de projetos fora do repositório da aplicação de produção, executar um comando por linha:

```bash
npx create-video@latest --yes --blank --no-tailwind nexya-motion
cd nexya-motion
npm install
```

Criar uma composição de vídeo simples é suficiente para esta produção. Não é necessário montar um SaaS de geração de vídeos.

### Etapa 3 — instalar orientações para o agente

Dentro da pasta `nexya-motion`:

```bash
npx skills add remotion-dev/skills
```

Selecionar o agente/editor utilizado e a instalação no projeto quando o instalador oferecer essas opções. Se já estiverem instaladas, evitar duplicar a instalação. Pedir ao agente que leia as boas práticas de Remotion antes de implementar.

Manter `remotion` e todos os pacotes `@remotion/*` na mesma versão exata. Se adicionar um pacote Remotion, usar `npx remotion add <pacote>` para ajudar a manter compatibilidade. Three.js e GSAP são opcionais nesta primeira versão.

### Etapa 4 — fornecer o briefing

Colocar este guia no projeto como `BRIEF.md` e fornecer ao agente os arquivos de marca e referências autorizadas. Colar o JSON da seção 8 como instrução de implementação.

Os nomes de arquivos a seguir são uma estrutura sugerida que o agente deverá criar:

| Caminho relativo | Conteúdo |
|---|---|
| `src/Root.tsx` | Registro das composições |
| `src/NexyaMotion.tsx` | Sequência principal |
| `src/scenes/` | Sete cenas |
| `src/components/` | Shell, cards, conversa, onda, cursor e marca |
| `src/data/demo.ts` | Dados fictícios centralizados |
| `src/theme.ts` | Paleta, tipografia e dimensões |
| `public/brand/` | Logo e fonte autorizados |
| `public/audio/` | Narração, trilha e efeitos autorizados |
| `out/` | Arquivos exportados |

### Etapa 5 — fazer uma primeira versão estática

Antes de animar tudo, pedir ao agente:

> Leia BRIEF.md. Monte as sete cenas em versão estática, registre a composição NexyaLandscape com 1920×1080, 30 FPS e 900 frames e use exclusivamente dados demonstrativos novos. Recrie cards, sidebar, conversa e painel de voz seguindo a linguagem visual descrita. Use a palavra Nexya se o logo oficial ainda não existir. Não incorpore screenshots no vídeo. Garanta que o projeto compile e apresente capturas das cenas para revisão.

Revisar proporção dos cards, cores, texto, logo e hierarquia. Uma captura de frame pode ser gerada com:

```bash
npx remotion still src/index.ts NexyaLandscape out/frame-01.png --frame=45
```

`src/index.ts` é o entrypoint comum do projeto; confirmar o caminho criado pelo scaffold e substituí-lo nos comandos se necessário.

### Etapa 6 — animar por cena

Abrir a prévia:

```bash
npm run dev
```

Usar o endereço que o terminal informar. Pedir primeiro as cenas 1 e 2; depois 3 e 4; em seguida 5, 6 e 7. As cenas já têm janelas fixas neste roteiro, mas podem ser redistribuídas se a voz exigir.

Orientação técnica para o agente: dirigir todos os movimentos pelo frame, com `useCurrentFrame`, `useVideoConfig`, `interpolate`, `spring` e easing apropriado. Não usar relógio real, `setInterval`, `Date.now`, animações CSS dependentes do tempo real ou `Math.random` sem controle para definir frames.

Se usar Three.js, instalar a integração compatível `@remotion/three` e atualizar a cena pela posição do frame. Se usar GSAP, usar a integração oficial de timeline com Remotion. Não adicionar essas dependências apenas para dar nome de tecnologia ao projeto.

### Etapa 7 — adicionar narração e som

Gravar a narração ou usar uma ferramenta de voz já disponível ao usuário. Salvar cada frase como `voice-01.wav` a `voice-07.wav`, ou equivalentes em MP3. Medir as durações e pedir ao agente que alinhe cada arquivo à respectiva cena.

Colocar uma trilha instrumental autorizada, discreta, sem competir com a fala. Acrescentar somente os efeitos que ajudam a perceber cliques, mensagens e transições.

Alternativa prática: exportar o vídeo sem áudio e montar a narração e a trilha no CapCut. Nesse caso, definir antes as durações das cenas para evitar desalinhamento. Se a voz exceder 30 segundos, revisar a montagem e não simplesmente cortar o final.

A onda de chamada é ilustrativa quando não existe áudio de chamada. Uma transcrição demonstrativa não deve ser apresentada como funcionalidade do produto confirmada pelo usuário; tratá-la apenas como recurso narrativo ou omiti-la.

### Etapa 8 — revisar e corrigir

Assistir em velocidade normal, verificar frames próximos às transições e assistir uma vez sem som. O vídeo deve comunicar o produto mesmo sem narração.

Exemplo de pedido de ajuste específico:

> Na cena de atendimento, aumente a conversa e o texto principal. Mostre a pergunta primeiro, segure por um segundo, depois exiba a digitação e a resposta. Reduza o brilho do fundo e mantenha a transição para voz dentro da janela de 12 a 18 segundos. Preserve as demais cenas.

Verificar: dados demonstrativos, ausência de imagens originais, ausência de conexões ao backend, leitura dos textos, ortografia, logo, pronúncia, carregamento de fontes, sincronização da voz e CTA. A revisão deve confirmar também que nenhuma função adicional foi inserida como promessa comercial.

### Etapa 9 — exportar horizontal

Após o agente registrar o ID `NexyaLandscape`, executar:

```bash
npx remotion render src/index.ts NexyaLandscape out/nexya-1920x1080.mp4 --codec=h264 --pixel-format=yuv420p
```

Para um rascunho mais leve:

```bash
npx remotion render src/index.ts NexyaLandscape out/nexya-preview.mp4 --scale=0.5 --codec=h264 --pixel-format=yuv420p
```

Se o computador estiver com pouca memória, começar com `--concurrency=1`. Isso reduz paralelismo e pode aumentar o tempo de exportação. O tempo real depende da máquina e da complexidade; medir no projeto, sem assumir um prazo fixo.

### Etapa 10 — adaptar e exportar vertical

Pedir ao agente:

> Crie NexyaPortrait com 1080×1920, 30 FPS e 900 frames. Reorganize a apresentação para celular: uma ação por tela, cards empilhados, títulos maiores, conversa ampliada e painel de chamada central. Preserve roteiro, dados fictícios, voz e identidade. Não use apenas crop ou redução da composição horizontal.

Exportar depois que essa composição estiver implementada:

```bash
npx remotion render src/index.ts NexyaPortrait out/nexya-1080x1920.mp4 --codec=h264 --pixel-format=yuv420p
```

### Etapa 11 — finalizar a entrega

Guardar projeto, arquivos autorizados, narração, fonte e vídeos finais. Fazer uma revisão de ambos os MP4s já exportados, porque a prévia no editor não substitui a conferência do arquivo final.

## 7. Pedidos de refinamento para copiar

**Melhorar o movimento:**

> Preserve os layouts aprovados. Refine easing, intervalos de entrada e continuidade. Faça cada transição aproveitar um elemento da cena anterior. Reduza movimentos sem função e mantenha os textos estáveis tempo suficiente para leitura.

**Melhorar o foco no produto:**

> Aumente o painel relevante de cada cena. Na campanha, foque botão, estado e mensagem. No atendimento, foque pergunta, agente e resposta. Na voz, foque chamada e onda. Diminua detalhes da sidebar que não ajudam a entender a cena.

**Corrigir vazamento de referências:**

> Revise todos os componentes e assets. Remova qualquer imagem original de referência da composição. Substitua dados copiados por src/data/demo.ts. Não mostrar nomes, contatos, campanhas, conversas, datas ou métricas das referências, inclusive em fundos, thumbnails e frames de transição.

## 8. Briefing completo em JSON para o agente

Este JSON é uma instrução estruturada para o agente de programação; não é um formato que o Remotion interpreta automaticamente.

```json
{
  "task": "Implementar um motion de apresentação da Nexya em um projeto Remotion executável",
  "language": "pt-BR",
  "product": {
    "name": "Nexya",
    "description": "Hub de agentes de IA para atendimento, campanhas de mensagens e ligações feitas com IA",
    "confirmed_capabilities": [
      "hub de agentes",
      "atendimento com IA",
      "disparo de mensagens",
      "ligações com IA"
    ],
    "call_direction": "Não confirmada; representar apenas chamada em andamento",
    "unconfirmed_features": [
      "transcrição como função nativa",
      "ligação automática disparada por resposta",
      "atendimento 24 horas",
      "agenda automática",
      "ganhos comerciais",
      "integrações específicas"
    ],
    "reference_positioning": [
      "agentes em voz e texto",
      "identidade da empresa",
      "linguagem adaptada ao público",
      "fluxos personalizados",
      "integração com sistemas e canais"
    ]
  },
  "compositions": [
    {
      "id": "NexyaLandscape",
      "width": 1920,
      "height": 1080,
      "fps": 30,
      "durationInFrames": 900
    },
    {
      "id": "NexyaPortrait",
      "width": 1080,
      "height": 1920,
      "fps": 30,
      "durationInFrames": 900,
      "layout": "Reorganização própria para celular"
    }
  ],
  "references": {
    "purpose": "Somente design, hierarquia e linguagem de componentes",
    "embed_original_screenshots": false,
    "copy_reference_data": false,
    "connect_real_backend": false,
    "logo": "Usar asset oficial; se ausente, usar wordmark Nexya e permitir substituição"
  },
  "art_direction": {
    "palette_is_approximate": true,
    "background": "#061A17",
    "sidebar": "#0A2A25",
    "surface": "#12332E",
    "accent": "#14D8CD",
    "text": "#F2F7F6",
    "muted_text": "#9AB5B0",
    "success": "#26C978",
    "font": "Inter local ou fonte oficial fornecida",
    "style": "Interface escura, cards arredondados, bordas discretas, brilho turquesa controlado",
    "motion": "Easing consistente, profundidade sutil, entradas sequenciais, transições com continuidade visual",
    "avoid": [
      "efeitos que ocultam o produto",
      "texto ilegível",
      "dashboard desktop reduzido no vertical",
      "todas as entradas com bounce",
      "métricas apresentadas como prova de desempenho"
    ],
    "brand_visuals": "Objetos de vidro 3D translúcido com reflexos turquesa, fundo preto esverdeado, tipografia branca e palavras destacadas em ciano"
  },
  "demo_data": {
    "company": "Empresa Demo",
    "campaign": "Apresentação Nexya",
    "contact": "Contato Demo",
    "phone_label": "•••• 0000",
    "incoming_message": "Olá! Quero conhecer a solução.",
    "agent_reply": "Olá! Vou te ajudar a conhecer a Nexya.",
    "environment_label": "Demonstração"
  },
  "scenes": [
    {
      "id": "opening",
      "from": 0,
      "durationInFrames": 90,
      "visual": "Objeto de vidro turquesa e marca sobre fundo escuro",
      "headline": "O futuro do atendimento já começou.",
      "voiceover": "O futuro do atendimento já começou.",
      "transition": "Reflexo vira conexão"
    },
    {
      "id": "hub",
      "from": 90,
      "durationInFrames": 120,
      "visual": "Hub Nexya com agente de texto e agente de voz",
      "headline": "Agentes de IA em voz e texto",
      "voiceover": "Conheça a Nexya: agentes de IA em voz e texto.",
      "transition": "Card vira painel de personalização"
    },
    {
      "id": "customization",
      "from": 210,
      "durationInFrames": 150,
      "visual": "Identidade, tom de voz e fluxos demonstrativos conectados a sistemas e canais genéricos",
      "headline": "Sua identidade. Seus sistemas. Seus canais.",
      "voiceover": "Personalizados para sua empresa e conectados aos seus sistemas e canais.",
      "transition": "Conexão conduz à campanha"
    },
    {
      "id": "campaign-support",
      "from": 360,
      "durationInFrames": 180,
      "visual": "Campanha fictícia inicia, resposta chega e agente atende",
      "headline": "Da campanha à conversa.",
      "voiceover": "Centralize campanhas e transforme respostas em atendimento com inteligência artificial.",
      "transition": "Badge revela módulo de voz"
    },
    {
      "id": "voice",
      "from": 540,
      "durationInFrames": 180,
      "visual": "Chamada demonstrativa em andamento com onda e timer; sem direção nem transcrição nativa presumidas",
      "headline": "Ligações com agentes de voz",
      "voiceover": "Amplie sua operação com ligações feitas por agentes de voz.",
      "transition": "Onda conecta módulos"
    },
    {
      "id": "connected",
      "from": 720,
      "durationInFrames": 90,
      "visual": "Mensagens, atendimento e voz conectados ao hub Nexya",
      "headline": "Sua marca. Seus fluxos.",
      "voiceover": "Sua marca. Seus fluxos. Uma operação conectada.",
      "transition": "Marca permanece"
    },
    {
      "id": "closing",
      "from": 810,
      "durationInFrames": 90,
      "visual": "Marca, vidro turquesa e CTA com dois segundos de leitura",
      "headline": "Transforme seu atendimento.",
      "voiceover": "Nexya. Transforme seu atendimento.",
      "transition": "Fade de trilha",
      "cta": "Conheça a Nexya"
    }
  ],
  "implementation": {
    "base": "React, TypeScript, Remotion e SVG",
    "three_js": "Adequado para vidro 3D nas cenas de marca; usar integração oficial compatível e forma de marca autorizada ou objeto abstrato, mantendo o wordmark real",
    "animation_clock": "Frame do Remotion",
    "allowed_animation_tools": [
      "useCurrentFrame",
      "useVideoConfig",
      "interpolate",
      "spring",
      "Easing",
      "integrações oficiais compatíveis"
    ],
    "avoid": [
      "setInterval para timing",
      "Date.now para animação",
      "Math.random não controlado",
      "CSS animation dependente do tempo real",
      "dependências fictícias",
      "assets remotos sem necessidade"
    ],
    "audio": "Ler arquivos locais se disponíveis; não falhar quando ainda ausentes",
    "waveform": "Sincronizar com áudio autorizado quando disponível; caso contrário, tratar como onda ilustrativa",
    "versioning": "Manter pacotes remotion e @remotion na mesma versão exata",
    "duration": "900 frames por composição; transições incluídas nas janelas"
  },
  "workflow": [
    "Ler BRIEF.md e boas práticas Remotion instaladas",
    "Criar componentes e sete cenas estáticas",
    "Verificar design, dados fictícios e compilação",
    "Animar cenas em grupos e revisar na prévia",
    "Adicionar áudio local e ajustar tempos após medir durações",
    "Adaptar layout vertical",
    "Renderizar amostras e revisar frames de transição",
    "Exportar MP4 horizontal e vertical e conferir os arquivos finais"
  ],
  "deliverables": [
    "Projeto executável",
    "Composições registradas",
    "Dados demonstrativos centralizados",
    "README com comandos",
    "MP4 horizontal",
    "MP4 vertical"
  ],
  "completion_rule": "Executar implementação e validação; informar claramente se assets, áudios ou renderização estiverem ausentes. Não declarar MP4 concluído sem gerar e conferir o arquivo."
}
```

## 9. Referências oficiais verificadas

- Criação de vídeos com agentes: https://www.remotion.dev/docs/ai/coding-agents
- Instalação de skills: https://www.remotion.dev/docs/ai/skills
- Criação do projeto: https://www.remotion.dev/docs/cli/create-video
- Exportação: https://www.remotion.dev/docs/cli/render
- Renderização de frame: https://www.remotion.dev/docs/cli/still
- Integração Three.js: https://www.remotion.dev/docs/three
- Integração GSAP: https://www.remotion.dev/docs/gsap
- Node.js: https://nodejs.org/en/download

Os comandos de implementação pressupõem que o agente criou as composições com os IDs especificados. Este roteiro não foi executado como projeto de vídeo nesta entrega.
