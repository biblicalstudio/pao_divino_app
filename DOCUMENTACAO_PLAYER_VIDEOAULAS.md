# 🎬 Documentação Técnica: Módulo de Vídeo Aulas & Player Profissional
> **Pão Divino WebApp** — Sistema de Reprodução com Edição Virtual de Trechos (Multi-cortes) e Checklist de Ingredientes.

---

## 📌 Sumário
1. [Visão Geral](#1-visão-geral)
2. [Estrutura do Arquivo `videoaulas.json`](#2-estrutura-do-arquivo-videoaulasjson)
3. [Sistema de Montagem Virtual (Cortes `start` e `end`)](#3-sistema-de-montagem-virtual-cortes-start-e-end)
4. [Lógica e Funcionamento do Player (`video-player.js`)](#4-lógica-e-funcionamento-do-player-video-playerjs)
5. [Checklist Interativo de Ingredientes](#5-checklist-interativo-de-ingredientes)
6. [Streaming Progressivo e Service Worker](#6-streaming-progressivo-e-service-worker)
7. [Guia Prático: Como Cadastrar ou Editar uma Aula](#7-guia-prático-como-cadastrar-ou-editar-uma-aula)

---

## 1. Visão Geral

O módulo de **Vídeo Aulas** foi desenvolvido para oferecer uma experiência de curso online fluida, responsiva e profissional diretamente no navegador ou PWA instalado, sem depender de plataformas externas (como YouTube ou Vimeo).

### Principais Recursos:
- **Player HTML5 100% customizado (Vanilla CSS & JS):** Controle total de timeline, botões de skip (-10s / +10s), velocidade de reprodução (0.75x a 2x), volume vertical suspenso (otimizado para celular), Picture-in-Picture (PiP), modo tela cheia e botão central de Play.
- **Edição Virtual de Vídeo (Virtual Montage):** Permite cortar introduções, pausas, propagandas ou tempos ociosos definindo múltiplos pontos de início e fim no JSON, sem precisar reeditar ou renderizar o arquivo MP4 original.
- **Linha do Tempo Unificada:** O aluno sempre vê o vídeo iniciando em `00:00` e a duração total equivale à soma exata dos trechos mantidos.
- **Wake Lock API:** Mantém a tela do celular ou computador acesa durante a reprodução da aula.
- **Persistência de Progresso:** Conclusão automática de aulas e marcação de ingredientes salvos no `localStorage`.

---

## 2. Estrutura do Arquivo `videoaulas.json`

O arquivo de configuração está localizado em:
`assets/VideoAulas/pao_rustico/videoaulas.json`

Cada objeto no array representa uma vídeo aula completa com os seguintes campos:

```json
[
  {
    "id": "videoaula-01-pao-portugues",
    "number": 1,
    "numStr": "01",
    "title": "PÃO PORTUGUÊS - Receita de pão rústico com azeite feito na pedra refratária",
    "shortTitle": "Pão Português Rústico",
    "category": "pao_rustico",
    "categoryName": "Pães Rústicos",
    "videoFile": "aula_01_pao_portugues.mp4",
    "videoPath": "assets/VideoAulas/pao_rustico/aula_01_pao_portugues.mp4",
    "yield": "3 pães médios de 200 g",
    "prepTime": "30 min (manuseio)",
    "totalTime": "4 a 5 horas (total)",
    "description": "Aprenda a fazer o tradicional Pão Português rústico com crosta crocante dourada, miolo macio e o aroma inconfundível do azeite de oliva, assado na pedra refratária.",
    "badge": "Pedra Refratária",
    "ingredientGroups": [
      {
        "group": "ESPONJA",
        "ingredients": [
          {
            "name": "Farinha de trigo",
            "amount": "80 g (⅔ xícara)",
            "notes": ""
          },
          {
            "name": "Água morna",
            "amount": "80 g (⅓ xícara)",
            "notes": ""
          },
          {
            "name": "Fermento biológico seco instantâneo",
            "amount": "5 g (½ sachê de 10 g)",
            "notes": ""
          }
        ]
      },
      {
        "group": "MASSA",
        "ingredients": [
          {
            "name": "Farinha de trigo",
            "amount": "320 g (2½ xícaras)",
            "notes": ""
          },
          {
            "name": "Sal",
            "amount": "8 g (½ colher de sopa)",
            "notes": ""
          },
          {
            "name": "Açúcar",
            "amount": "8 g (1 colher de sopa)",
            "notes": ""
          },
          {
            "name": "Azeite de oliva",
            "amount": "12 g (¾ colher de sopa)",
            "notes": ""
          },
          {
            "name": "Água",
            "amount": "160 g a 175 g (⅔ xícara)",
            "notes": ""
          }
        ]
      }
    ],
    "start1": "00:00",
    "end1": "00:16",
    "start2": "01:02",
    "end2": "01:54",
    "start3": "02:31",
    "end3": "04:29",
    "start4": "04:38",
    "end4": "08:58"
  }
]
```

### Descrição dos Campos:

| Campo | Tipo | Descrição |
|---|---|---|
| `id` | `string` | Identificador único da aula (usado para salvar progresso e ingredientes). |
| `number` | `number` | Número ordinal da aula (1 a 9). |
| `numStr` | `string` | Número formatado com dois dígitos (`"01"`, `"02"`...). |
| `title` | `string` | Título completo e detalhado da aula. |
| `shortTitle` | `string` | Título compacto para exibição em cards e navegação. |
| `category` | `string` | Slug da categoria (ex: `"pao_rustico"`). |
| `categoryName` | `string` | Nome legível da categoria (ex: `"Pães Rústicos"`). |
| `videoFile` | `string` | Nome do arquivo MP4 salvo na pasta de ativos. |
| `videoPath` | `string` | Caminho relativo do vídeo a partir da raiz do projeto. |
| `yield` | `string` | Rendimento em unidades ou gramas da receita da aula. |
| `prepTime` | `string` | Tempo estimado de mão na massa / manuseio. |
| `totalTime` | `string` | Tempo total incluindo fermentação e forno. |
| `description` | `string` | Dica do padeiro e orientações importantes da aula. |
| `badge` | `string` | Destaque técnico (ex: `"Iniciantes"`, `"Sem Sovar"`). |
| `ingredientGroups` | `array` | Grupos de ingredientes com nome, quantidade e notas. |
| `startN` / `endN` | `string` | Pontos de minutagem dos cortes (veja seção 3). |

---

## 3. Sistema de Montagem Virtual (Cortes `start` e `end`)

O player suporta três formatos intercambiáveis para definir os trechos visíveis do vídeo:

### Formato 1: Sequência Numerada (`start1`/`end1`, `start2`/`end2`...) — *(Recomendado)*
Permite adicionar quantos trechos desejar de forma direta:
```json
"start1": "00:00",
"end1": "00:16",
"start2": "01:02",
"end2": "01:54",
"start3": "02:31",
"end3": "04:29",
"start4": "04:38",
"end4": "08:58"
```

### Formato 2: Array de Segmentos (`segments`)
Ideal para integrações ou estruturas em lista:
```json
"segments": [
  { "start": "00:00", "end": "00:16" },
  { "start": "01:02", "end": "01:54" },
  { "start": "02:31", "end": "04:29" },
  { "start": "04:38", "end": "08:58" }
]
```

### Formato 3: Corte Único (`start` e `end`)
Para vídeos que precisam apenas de corte na introdução ou final:
```json
"start": "01:30",
"end": "07:58"
```

### Formatos de Minutagem Suportados:
O parser (`parseTimeToSeconds`) interpreta automaticamente:
- Minutagem padrão: `"00:00"`, `"01:30"`, `"12:45"`
- Minutagem com horas: `"01:15:30"`
- Segundos numéricos ou em string: `90`, `"90"`

---

## 4. Lógica e Funcionamento do Player (`video-player.js`)

Toda a inteligência do player está concentrada no arquivo [js/video-player.js](file:///Users/thyagosouza/Documents/AUTOMAÇÕES%20WHATSAPP/PÃES%20DIVINOS/app_pao_divino/js/video-player.js).

### Mapeamento: Tempo Real vs. Tempo Virtual

O player opera com duas escalas de tempo simultâneas:
1. **Tempo Real (`realTime`):** A posição física do arquivo MP4 (`video.currentTime`).
2. **Tempo Virtual (`virtualTime`):** A escala apresentada ao usuário, que sempre se inicia em `00:00` e termina na soma dos trechos selecionados.

```
Exemplo de Aula com 2 Cortes:
Corte 1: [00:00 a 00:16] -> Duração: 16 segundos
Corte 2: [01:02 a 01:54] -> Duração: 52 segundos
Duração Virtual Total = 16s + 52s = 68s (01:08)

Escala Virtual: 00:00 ----------------------- 00:16 ----------------------------------- 01:08
Arquivo Real:   00:00 ------------ 00:16 (SALTO) 01:02 ------------------------------- 01:54
```

### Principais Mecanismos:

1. **Início sem trecho cortado:** Ao abrir a aula, `applyStartTime()` posiciona o vídeo no primeiro segundo do `start1`. O mostrador de tempo exibe `00:00`.
2. **Salto Instantâneo entre Trechos (`timeupdate`):**
   ```javascript
   if (nextSeg) {
     if (realTime >= seg.end && realTime < nextSeg.start) {
       video.currentTime = nextSeg.start;
       if (videoState.isPlaying && video.paused) {
         video.play().catch(() => {});
       }
       updateTimelineProgress();
       return;
     }
   }
   ```
   No momento em que `end1` é atingido, o player salta para `start2` sem pausar e sem criar loops.
3. **Fim e Conclusão Automática:** Ao atingir o final do último trecho (`endN`), o vídeo pausa, trava a timeline em 100% e marca a aula como concluída no `localStorage` (`pao_divino_video_completed`).
4. **Navegação Virtual na Timeline:**
   - Ao arrastar a bolinha da timeline ou clicar em qualquer ponto, o player converte a posição percentual (0% a 100%) no ponto real correspondente dentro do trecho correto (`virtualToReal`).
   - O tooltip que acompanha o mouse/toque exibe sempre a minutagem virtual (iniciando em `00:00`).
5. **Botões de Skip (-10s / +10s) e Atalhos:**
   - Pressionar `-10s` (ou seta esquerda / tecla `J`) recua 10 segundos virtuais, navegando entre cortes se necessário, sem ultrapassar o `00:00`.
   - Pressionar `+10s` (ou seta direita / tecla `L`) avança 10 segundos virtuais sem ultrapassar a duração total.

---

## 5. Checklist Interativo de Ingredientes

Abaixo do player de vídeo é renderizada a lista completa de ingredientes da aula, mantendo o padrão visual e de interação do restante do aplicativo:

- **Grupos Organizados:** Separação por etapas da receita (ex: "ESPONJA", "MASSA", "COBERTURA").
- **Toque para Marcar (Check):** O item fica tachado, ganha estilo esmaecido e emite o som característico de clique.
- **Contador em Tempo Real:** Exibe quantos ingredientes já foram separados na bancada (ex: `3 de 8 separados`).
- **Persistência Individual por Aula:** As marcações são salvas no `localStorage` na chave `pao_divino_video_ing_{id}`.
- **Botão Desmarcar Todos:** Permite resetar as marcações para repetir a receita.
- **Compartilhar no WhatsApp:** Gera uma mensagem formatada com todos os ingredientes e envia via WhatsApp com 1 clique.

---

## 6. Streaming Progressivo e Service Worker

Para garantir que vídeos pesados (30 MB a 80 MB) comecem a reproduzir instantaneamente sem esperar o download completo:

1. **HTTP 206 Partial Content (Range Requests):**
   O servidor Netlify foi configurado através do `netlify.toml` com o cabeçalho `Accept-Ranges: bytes` para todas as rotas `/assets/VideoAulas/*`.
2. **Bypass no Service Worker (`sw.js`):**
   O `sw.js` ignora o cache para requisições de vídeos (`.mp4`) e requisições com cabeçalho `Range`, permitindo que o navegador requisite apenas os primeiros kilobytes necessários para iniciar o buffer imediatamente.
3. **Nomes de Arquivos ASCII:**
   Todos os arquivos de vídeo foram renomeados para caracteres alfanuméricos limpos (ex: `aula_01_pao_portugues.mp4`), evitando problemas de encoding UTF-8 / NFD em servidores Linux e dispositivos móveis.

---

## 7. Guia Prático: Como Cadastrar ou Editar uma Aula

### Para editar os cortes de uma aula existente:
1. Abra `assets/VideoAulas/pao_rustico/videoaulas.json`.
2. Localize a aula pelo `id` (ex: `videoaula-02-pao-caseiro-iniciantes`).
3. Modifique ou adicione os pares `startN` e `endN`:
   ```json
   "start1": "00:00",
   "end1": "00:13",
   "start2": "00:27",
   "end2": "10:26"
   ```
4. Salve o arquivo.

### Para adicionar uma nova vídeo aula:
1. Coloque o arquivo de vídeo em `assets/VideoAulas/pao_rustico/` usando um nome simples em letras minúsculas (ex: `aula_10_baguete_francesa.mp4`).
2. Abra `videoaulas.json` e adicione o novo objeto no final do array com os dados da receita e os cortes `start1`, `end1`...
3. Salve o arquivo. O player irá ler o JSON automaticamente e criar o card no catálogo.
