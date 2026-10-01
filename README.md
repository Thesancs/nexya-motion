# Nexya — vídeo de apresentação (Remotion)

Motion de 30 s da Nexya em duas composições:

| ID | Formato | Uso |
|---|---|---|
| `NexyaLandscape` | 1920×1080, 30 fps, 900 frames | Apresentação |
| `NexyaPortrait` | 1080×1920, 30 fps, 900 frames | Redes sociais (layout próprio, não é crop) |

Roteiro, direção de arte e regras de conteúdo: [BRIEF.md](BRIEF.md).
Todos os dados exibidos são fictícios (`src/data/demo.ts`); o projeto não se conecta a nenhum backend.

## Comandos

```bash
npm i                      # instalar dependências
npm run dev                # prévia no Remotion Studio
npm run lint               # eslint + tsc

# frame de revisão
npx remotion still src/index.ts NexyaLandscape out/frame.png --frame=45

# exportar
npx remotion render src/index.ts NexyaLandscape out/nexya-1920x1080.mp4 --codec=h264 --pixel-format=yuv420p
npx remotion render src/index.ts NexyaPortrait  out/nexya-1080x1920.mp4 --codec=h264 --pixel-format=yuv420p
```

## Estrutura

| Caminho | Conteúdo |
|---|---|
| `src/Root.tsx` | Registro das composições (e de cada cena, na pasta "Cenas") |
| `src/NexyaMotion.tsx` | Sequência das 7 cenas + faixa de narração |
| `src/scenes/` | Uma cena por arquivo; cada uma tem coordenadas de paisagem (`L`) e vertical (`P`) |
| `src/components/` | Marca (logo, vidro, hub), shell da plataforma e componentes de UI |
| `src/anim.ts` | Easing único, entradas padrão e `usePortrait()` |
| `src/theme.ts` | Paleta, tipografia (Inter local) |
| `src/data/demo.ts` | Dados fictícios e textos das cenas |
| `public/` | Logo oficial, fontes e narração |
| `scripts/transcribe.mts` | Transcreve a narração com tempos por palavra (Whisper local) |

## Narração e sincronia

A narração fica em `public/audio/voice.wav`. As janelas das cenas em `src/NexyaMotion.tsx` foram alinhadas ao início de cada frase:

| Cena | Frase começa | Janela (frames) |
|---|---|---|
| 1 · Abertura | 0,36 s | 0–90 |
| 2 · Voz e texto | 3,14 s | 90–210 |
| 3 · Personalização | 7,34 s | 210–350 |
| 4 · Campanha | 11,78 s | 350–504 |
| 5 · Ligações | 16,98 s | 504–618 |
| 6 · Operação conectada | 20,74 s | 618–735 |
| 7 · Marca e CTA | 24,70 s | 735–900 |

O arquivo atual tem outro conteúdo depois de 27,5 s, por isso a faixa é cortada em 816 frames. Ao trocar a narração:

```bash
node scripts/transcribe.mts pt   # gera out/voice-captions.json com o início de cada palavra
```

Depois ajuste as `durationInFrames` em `src/NexyaMotion.tsx` e `src/Root.tsx`, o `duration` do `<Background>` de cada cena e o corte do `<Audio>`.

## Para o agente de programação

As skills do Remotion não estão neste repositório. Em uma máquina nova:

```bash
npx skills add remotion-dev/skills
```

Mantenha `remotion` e todos os `@remotion/*` na mesma versão exata (hoje 4.0.532); use `npx remotion add <pacote>` ao adicionar pacotes.

## Pendências

- Narração: remover o trecho extra do arquivo de áudio (hoje cortado no vídeo).
- Trilha e efeitos sonoros autorizados.
- Transições com troca de forma (card → painel, onda → conexão); hoje são fades.
- Vidro 3D em Three.js (hoje é 2D com gradientes SVG).
- Exportar e conferir os dois MP4.
