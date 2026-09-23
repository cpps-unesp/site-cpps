---
title: "ADR-047 — Agente de IA local para tradução e estilo: cliente HTTP do endpoint do parque, com o determinístico primeiro"
description: "As seis Blackwell são recurso alocável do k8s de SP desde 19/09, mas nenhuma jamais serviu um modelo. O agente é cliente HTTP do endpoint do PR #540 — CronJob, dois Secrets, uma NetworkPolicy — e tudo que é determinístico sobe antes, no Actions, sem GPU."
sidebar:
  order: 50
medido: "2026-09-23"
medidoCom: "cabeçalho de apps/sp/kueue-fila/resourceflavor.yaml (label colabh.org/gpu=rtx-pro-6000-blackwell em k3s-sp-hpc-01/02/03, 2 GPUs alocáveis cada, medido em 19/09/2026); leitura de apps/sp/llm/vllm.yaml e apps/sp/llm/llamacpp.yaml no PR #540 (nodeSelector para k3s-sp-gpu-01, uma GPU cada) e dos app-of-apps de apps/sp (Directory sem bloco directory); registro do episódio de 21/09 com gpt-oss-20b em RTX A5000 e vLLM v0.13.0; catálogo de modelos (qwen38-27b, 55,6 GB em BF16, licença consultar-model-card); contagem de 51 campos localizados e 235 instâncias e das medições de contraste do site-cpps — lido em 2026-09-22. Em 2026-09-23, bancada da guarda do seletor de cor: leitura do registro de plugins do tinacms 3.13.0 e do validateSchema do @tinacms/schema-tools 2.10.0; renderização do FormBuilder real em jsdom; execução de uma guarda de referência (esbuild + import do tina/config.ts + caminhada na árvore) contra o config real do site-cpps e contra três configs envenenados, incluindo o contraexemplo que a lista-negra não pega — ver VERIFICACOES-2026-09-23.md"
---

## Status

**Proposto** — 2026-09-22. Aguarda revisão de Rafael e Arthur.

## Contexto

O conteúdo dos sites é trilíngue por campo: `pt`, `en` e `es` no mesmo documento. No schema do
site-cpps são **51 campos localizados em 235 instâncias**, e **não há fallback para `pt`** —
campo vazio em `en` ou `es` renderiza vazio, sem aviso, e o preview do admin mostra sempre `pt`.
Com dezenas de sites e uma equipe central de duas pessoas, a lacuna de tradução não é problema de
qualidade: é o modo de falha padrão.

Junto vem um segundo caso, de estilo e não de língua: o `btn-primary` está em **2,09:1** e o
`text-primary` sobre branco em **2,57:1** — ambos reprovam WCAG AA hoje. Há **18 cores hex
cravadas** em `src/styles/global.css`, e a linha 2 declara o plugin `daisyui` **sem lista
explícita de temas**, o que faz entrar o tema `light` embutido — é dele que sai o `btn-primary` a
2,09:1. Identidade visual própria por grupo multiplica esse caso por N.

A decisão travada é **agente de IA local, na GPU própria** — e ela convive com a regra de **usar
o mínimo possível de infra própria para os sites**. Este ADR decide a forma do agente de modo que
as duas sobrevivam juntas.

### A inversão de premissa

Circulou o diagnóstico de que as seis RTX PRO 6000 Blackwell estariam fora do Kubernetes por
estarem em `vfio-pci`. **Está errado.** As seis são recurso alocável do k8s de SP desde
**19/09/2026**: `k3s-sp-hpc-01/02/03` carregam o label `colabh.org/gpu=rtx-pro-6000-blackwell`
com **2 GPUs alocáveis cada**, medido no cabeçalho de `apps/sp/kueue-fila/resourceflavor.yaml`.
O `vfio-pci` é **elo do meio** da cadeia host → VM → nó do k3s, não o oposto de estar no cluster.
Os nós `k3s-sp-gpu-01/02/03` são RTX A5000, 1 GPU alocável cada.

### O que de fato falta

**Nenhuma Blackwell jamais serviu um modelo.** O endpoint está no **PR #540**
(*feat(llm): vLLM nas 12 placas dos dois sítios*, vLLM v0.29.0 + LiteLLM no namespace `llm`),
**aberto desde 21/09/2026 e não mergeado**. Ou seja: a placa existe, o agendador enxerga a placa,
e não há endpoint. É essa distância — e não a GPU — que o desenho abaixo precisa atravessar.

## Decisão

### 1. O agente é cliente HTTP do endpoint do parque, não aplicação de GPU

Ele **não pede GPU**, **não entra no Kueue**, **não precisa de device plugin**. A forma é:

| peça | conteúdo |
|---|---|
| `CronJob` | a rodada de varredura e proposta, no namespace do agente |
| `Secret` (SOPS+age) | credencial de escrita no GitHub, conta de serviço com dono nomeado |
| `Secret` (SOPS+age) | chave do LiteLLM, escopo mínimo ao modelo do catálogo |
| `NetworkPolicy` | egress para o `Service` do LiteLLM e para `api.github.com`, nada além |
| ficha | `website/src/data/inventario/aplicacoes.yaml`, `sitio_dono: sp` |

Subir um vLLM próprio do agente criaria **um segundo dono para placa que já tem dono**, e
reabriria por dentro a disputa que o Kueue existe para arbitrar por fora. Cliente HTTP não disputa
placa: se o endpoint estiver ocupado, ele espera ou falha, e falhar é aceitável (ver item 3).

:::note
O agente é representável na ficha de inventário porque roda em SP. Os **sites** não são: o schema
Zod strict restringe `sitio_dono` ao enum `franca`/`sp`, e a guarda de CI
(`.github/scripts/guarda-apps.py:17`) só indexa `apps/franca`, `apps/sp` e `apps/multi` — um site
na Cloudflare é literalmente irrepresentável ali. O agente entra pelo guia
`frentes/aplicacoes-servicos/novo-app.md` (etapas 0 a 7, nasce **sem sync automático**, promoção
com prova); os sites não entram, pelo precedente de exclusão de `devops.colabh.org` e
`trilhas.colabh.org`.
:::

### 2. Dois defeitos verificados no #540, a resolver antes de o agente depender dele

1. **Duas cargas no mesmo nó de 1 GPU.** `apps/sp/llm/vllm.yaml` põe `vllm-gpt-oss-20b-01` em
   `k3s-sp-gpu-01` pedindo uma GPU, e `apps/sp/llm/llamacpp.yaml` põe `llamacpp-gpt-oss-20b` no
   **mesmo nó** pedindo outra. O nó tem 1 GPU alocável: **um fica `Pending` desde o primeiro
   apply**.
2. **Os app-of-apps são `Directory` não recursivos** (`path: apps/sp`, sem bloco `directory`).
   Mergear o #540 **deposita os arquivos na main e não muda nada no cluster** — falta o
   `Application` `apps/sp/llm.yaml`. **A CI não acusa isso.**

Nenhum dos dois é trabalho do agente, e os dois são pré-requisito dele. Enquanto não caírem, o
agente roda no modo do item 3 — mas **esperar não é plano**, e por isso cada um recebe dono e
issue no `colabhd/devops`, abertas junto com a ratificação deste ADR:

- **Conflito de nó** (`vllm.yaml` × `llamacpp.yaml` em `k3s-sp-gpu-01`): issue no `devops`, dono
  **Rafael**, resolvida dentro do próprio #540 — é defeito daquele PR e sai com ele.
- **App-of-apps não recursivo**: issue no `devops`, dono **Arthur**. E este **não é defeito do
  #540**: é uma **classe** — qualquer arquivo depositado em `apps/sp` sem `Application`
  correspondente não produz efeito nenhum no cluster, e a CI não acusa. Merece correção na
  guarda de CI do `devops` (ou ADR próprio **lá**, não aqui): um ADR da frente de sites não é
  lugar para decidir o app-of-apps do parque, e registrá-lo como contexto seria deixá-lo sem
  dono de novo.

### 3. O determinístico primeiro, no GitHub Actions, sem GPU nenhuma

Constrói-se **agora** tudo que não precisa de modelo. É o **grosso do valor** e sobrevive
inteiro se o agente for abandonado:

- **Scanner de lacuna de i18n** — lê a **lista de campos não linguísticos do schema** em vez de
  adivinhar por heurística. Um scanner ingênuo conta URL, slug, data, código e nome de arquivo
  como "tradução faltando"; **não contamos quantos são** — verificaria rodando a versão
  heurística sobre os doze JSON de `src/content/tina-pages/` e comparando com a classificação de
  campos do [ADR-045](/decisoes/i18n-field-based-com-fallback/). O schema já ajuda: 250 de 338
  campos do CPPS são genéricos.
- **Extrator e remontador dos marcadores próprios** — a quebra de linha codificada e o componente
  inline `Destaque` com atributo `texto` saem do texto antes de qualquer processamento e voltam
  depois, com verificação de contagem.
- **Validador de schema, de URL e de nome próprio** — sobre qualquer proposta, de máquina ou de gente.
- **Gate de contraste** — aritmética pura sobre os hex de `src/styles/global.css` e sobre o
  catálogo de variantes, nos dois modos (claro e escuro). Reprova o PR que introduzir par abaixo
  de 4,5:1 (3:1 para texto grande). **A regra e o limiar são do
  [ADR-044](/decisoes/identidade-visual-por-grupo-tokens/)**; o que é deste ADR é a
  implementação, porque ela é aritmética e cai junto com o resto do determinístico.
- **Guarda do seletor de cor no schema** — peça irmã da anterior, e **não é aritmética nem é
  `grep`**. Medido em 23/09/2026: um componente de cor entregue como função React não contém a
  string `color`, escapa da busca literal e **some** do `tina/__generated__/_schema.json`, porque
  função não sobrevive a `JSON.stringify`; e uma lista-negra de nomes é contornável em três
  linhas de `cmsCallback`. A implementação é um script Node que **compila `tina/config.ts` com
  esbuild, importa o módulo e anda na árvore `collections → fields/templates`**, aprovando apenas
  `ui.component` cujo nome esteja no catálogo do kit — lista-branca — e reprovando `ui.component`
  função, as props exclusivas do picker (`colorFormat`, `colors`, `widget`) e qualquer
  `cmsCallback` escrito pelo site. Some, para este item, o custo de ler o `_schema.json`: ele não
  serve como fonte. Uma implementação de referência já rodou, com dois casos negativos.
- **Teste do registro de plugins do Tina** — o `cms.fields.remove('color')` do `cmsCallback` do
  kit é API pública **não documentada**; o teste falha se `cms.fields.find('color')` voltar a
  existir depois do `cmsCallback`, e é ele que avisa se um upgrade do Tina mudar o registro.
  Sozinho ele não basta (o contraexemplo da lista-negra passa por ele), por isso anda junto com a
  lista-branca acima.

:::tip
**O caso de estilo responde sem GPU.** Contraste é aritmética, e uma página de tema estática
responde em 0 ms. Pedir a um modelo que "avalie a acessibilidade da paleta" é trocar uma resposta
exata por uma plausível.
:::

### 4. A fronteira que sustenta a exceção à regra de infra mínima

**Nenhum build de site pode depender do endpoint.** O agente abre PR; o site constrói a partir do
git. Com a GPU desligada, o pior caso é **um PR que não abre** — nunca um site fora do ar.

É essa fronteira que torna o agente uma exceção tolerável à decisão de infra mínima: ele é
**uma das quatro peças próprias** da lista fechada do
[ADR-041](/decisoes/sites-na-cloudflare-pages-direct-upload/) — com o monitoramento externo, a
contingência de saída e o contêiner do CMS — e a **única no caminho de escrita do conteúdo**,
ainda assim fora do caminho crítico de publicação.

### 5. Topologia com N repositórios: o parque puxa, o Actions não chama o parque

São três organizações no GitHub (`colabhd`, `lab-ippri-unesp`, `cpps-unesp`), e segredo de
organização **não cruza org**. O desenho evita o problema em vez de replicá-lo:

- o **scanner** roda no Actions de cada repo (público, grátis e sem cota) e publica um
  **manifesto consolidado** de lacunas — um artefato, não uma chamada;
- o **CronJob no parque PUXA** o manifesto e abre os PRs;
- o Actions **nunca** chama o endpoint nem abre porta para o parque. Não há entrada do GitHub
  para dentro da infraestrutura.

O que isso custa: o agente precisa de credencial de escrita nas três orgs. Um GitHub App tem de
ser **instalado em cada org** — três instalações da mesma App, uma decisão de operação a repetir
sempre que nascer uma quarta org.

### 6. Escolha de modelo, e o critério que a governa

O episódio de **21/09** é o critério: `gpt-oss-20b` numa RTX A5000 com vLLM v0.13.0 respondeu
**apenas pontos de exclamação** a qualquer pergunta — MXFP4 numa Ampere sem FP4 nativo caindo em
kernel Marlin com bug de dimensões. **O vLLM subiu, ficou ready, o health check passou**; só o
conteúdo mostrava o defeito. Por isso o catálogo pina a **v0.29.0**.

Daí saem as duas perguntas que toda escolha de modelo responde antes de subir:

1. **A placa faz esse formato nativamente?**
2. **A versão do motor tem o conserto daquele kernel?**

Candidato: **`qwen38-27b` (Qwen3.8-27B)**, denso, **55,6 GB em BF16** — formato **nativo da
sm_120**, TP=1 numa placa. Já está baixando desde 21/09. **Não pedir modelo novo**: o enlace de
~92 Mbit/s (~41 GB/h, compartilhado) é o recurso mais escasso do conjunto, mais que a VRAM.

### 7. Guardrails

- **`dry-run` é o padrão.** Escrita exige flag explícita.
- **Saída sempre por PR com diff.** Nada vai para a main pelo agente.
- **Saída restrita a schema por *guided decoding*** — garante **forma, não conteúdo**: é defesa
  contra JSON quebrado, não contra tradução errada.
- **Nunca mandar string bruta de rich-text ao modelo.** Os marcadores saem antes (item 3). Há
  razão de segurança além da de formato: existe **XSS armazenado** no caminho textarea → `marked`
  sem sanitização → `set:html` (`src/utils/markdown.ts`, `src/components/TextoComCheck.astro:35`).
  Texto gerado por modelo que chegue nesse caminho **executa**.
- **Nunca traduzir nome próprio; nunca alterar URL.** Validado deterministicamente depois, não
  pedido educadamente antes.
- Repositório público + CMS central significa **rascunho público no instante do save**
  (`IsomorphicBridge.put()` commita por arquivo gravado). O PR do agente é, portanto, público
  desde o primeiro commit — o que é aceitável porque os sites são de divulgação e não guardam
  dado de pesquisa.

## Alternativas rejeitadas

**API hospedada (modelo de fornecedor, por token).** O argumento a favor é forte e é o de custo:
o lote frio inicial sai por **cerca de US$ 21 estimados** — menos que uma hora de trabalho das
duas pessoas, com zero operação, zero fila e qualidade hoje superior à de qualquer modelo que
caiba numa placa. **A decisão local não é de custo**, e fingir que é seria desonesto. Ela é de
três outras coisas: (a) não submeter texto de terceiros — conteúdo de grupos, antes de publicado
— a termos de serviço sem contrato institucional; (b) não criar dependência de cartão e conta
numa equipe de duas pessoas dentro de universidade pública, onde compra é chamado; (c) usar
capacidade **já comprada e hoje ociosa**. Se alguma das três cair, a alternativa volta.

**vLLM dedicado ao agente.** Daria isolamento de versão e de fila, e eliminaria a dependência do
#540 — é o caminho mais rápido para o agente funcionar esta semana. Rejeitada porque cria um
**segundo dono para placa que já tem dono**: hoje GPU em SP é agendada por `nodeSelector` e
`requests`, o Kueue está mergeado mas **não sincronizado**, nenhum nó de SP tem taint e não há
`PriorityClass` — ou seja, **ganha quem chegou primeiro**. Um vLLM do agente nesse ambiente é
exatamente o defeito do item 2, de novo, por escolha.

**Agente como serviço vivo, com GPU quente.** Daria resposta interativa dentro do TinaCMS —
sugestão enquanto se edita. Rejeitada por prender uma Blackwell de 96 GB para carga que é **em
lote por natureza**: a lacuna de i18n é estoque, não fluxo. Volta a ser discutível quando houver
isolamento provado e a placa puder ser partida.

**Não traduzir: campo vazio e site monolíngue `pt`.** O argumento a favor é o mais honesto de
todos — **vazio não mente**, e tradução ruim em página institucional é pior que ausência.
Rejeitada porque hoje o vazio **também** não avisa: sem fallback e sem marca. A parte defensável
é absorvida pelo item 3 — o scanner mede a lacuna, e o fallback explícito para `pt` é decisão
separada, que não depende de modelo nenhum.

## Consequências

**O que muda na operação**

- Nasce **uma** aplicação nova no parque, de classe barata: CronJob, dois Secrets, uma
  NetworkPolicy. Entra pelas etapas 0 a 7, sem sync automático, com ficha no inventário.
- O ganho determinístico chega **antes** do endpoint: scanner, marcadores, validadores e gate de
  contraste são PRs de CI, e valem mesmo se o #540 nunca for mergeado.
- O gate de contraste **reprova a paleta atual** no dia em que ligar, e por isso ele **não
  liga antes da faxina**: declarar a lista explícita de temas do DaisyUI e corrigir o par de
  2,09:1 vêm primeiro, em PRs separados, como o ADR-044 decide. Não há "modo aviso com prazo" —
  a ordem existe justamente para que o gate não nasça vermelho.

**O que se aceita como custo**

- **Latência de dias no caminho do agente.** Ele só funciona depois do #540 mergeado, do
  `Application` `apps/sp/llm.yaml` criado e do conflito de nó resolvido — e o item 3 entrega
  valor nesse intervalo.
- **Uma exceção à regra de infra mínima**, escrita e delimitada: o agente é a única peça própria
  na cadeia dos sites, e o item 4 garante que ela não pode derrubar site nenhum.
- **Três instalações de GitHub App**, uma por org, e a repetição disso a cada org nova.
- **`pt` segue o único idioma garantido** até o fallback explícito existir. O agente propõe
  tradução; ele não promete cobertura.
- **Qualidade não medida.** Nenhum modelo serviu ainda; a taxa de publicável é hipótese até a
  primeira rodada do conjunto-ouro.

**Trilha e identidade**

O `diretrizes/iam.md` exige trilha por usuário. O agente é **conta de serviço com dono nomeado**,
e seus commits saem com identidade única — correto aqui, porque o autor é o agente, não uma
pessoa. É **diferente** do problema do TinaCMS, onde `GitProvider.onPut()` não recebe usuário e
commits de pessoas distintas colapsariam numa identidade só: os dois casos não compartilham solução.

## Critério de revisão

1. **Desistência do agente — gatilho observável:** duas rodadas consecutivas do **conjunto-ouro**
   (60 segmentos por direção, julgamento cego dos dois operadores, **com iteração de prompt entre
   elas**) sem atingir **90% de publicável**. Nesse caso o agente cai e **o scanner, os
   validadores e o painel ficam** — eles não dependem dele.
2. **Desistência por segurança:** um erro adversarial que o validador determinístico não proteja
   (marcador remontado errado, URL alterada, HTML injetado no caminho do `set:html`). Um basta.
3. **O PR #540 não mergeado até 2026-10-31** → reabrir a comparação com a API hospedada para o
   lote frio, agora com o custo **medido** em vez de estimado.
4. **Queda de qualquer das três razões da decisão local** — contrato institucional, forma de
   pagamento estável, ou a capacidade local deixar de estar ociosa → a hospedada volta à mesa.
5. **Chegada de conteúdo não público** para tradução (grupo pedindo tradução de material ainda não
   divulgado) → a premissa "sites de divulgação, sem dado de pesquisa" cai, e o desenho de
   publicação por PR público precisa ser revisto antes de qualquer rodada.
6. **Isolamento de GPU provado em SP** (taint, `PriorityClass` e Kueue sincronizado) → reabrir a
   alternativa do serviço vivo, que hoje é rejeitada por disputa de placa e não por mérito.

## A verificar antes da primeira rodada

Marcado para não virar medição inventada:

- **Licença do `qwen38-27b`.** O catálogo registra `consultar-model-card`. **Verificaria** lendo o
  model card no repositório de origem antes de qualquer uso, e registrando a licença na ficha.
- **Taxa de publicável de qualquer modelo local** em pt→en e pt→es. Nunca medida — nenhum modelo
  jamais serviu numa Blackwell. **Verificaria** com a primeira rodada do conjunto-ouro do critério 1.
- **Os ~US$ 21 do lote frio** são estimativa a partir da contagem de campos, não fatura.
  **Verificaria** com uma rodada paga de 200 segmentos, medindo tokens reais.
- **Se o *guided decoding* do vLLM v0.29.0 funciona em sm_120** com este modelo. O episódio de
  21/09 mostra que "subiu e ficou ready" não é evidência de nada. **Verificaria** com 50 saídas
  estruturadas conferidas contra o schema antes de ligar a escrita.
- **O tempo real de download do modelo.** 55,6 GB a ~92 Mbit/s dariam ~1h20 se o enlace fosse só
  dele — e não é. **Verificaria** pelo progresso do download iniciado em 21/09, não por aritmética.
- **Se o LiteLLM do #540 expõe cota por chave**, que é o que daria ao agente escopo mínimo de
  verdade. **Verificaria** na configuração do PR antes de escrever o segundo `Secret`.
