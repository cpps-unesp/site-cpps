---
title: "ADR-044 — Identidade visual própria por grupo, por tokens versionados, sem fork de código"
description: "Cada grupo recebe identidade própria como dado — tokens e variantes nomeadas de um catálogo fechado, nunca seletor de cor livre — sobre um kit único. Editor de blocos React e fork por grupo são rejeitados, e o gate de contraste vira check obrigatório."
sidebar:
  order: 47
medido: "2026-09-23"
medidoCom: "medição de contraste de btn-primary (2,09:1) e text-primary sobre branco (2,57:1) no site-cpps; leitura de src/styles/global.css (18 ocorrências de hex, 10 valores distintos; linha 2 com @plugin 'daisyui' sem lista de temas); contagem de componentes .astro na branch feat/tinacms-visual-editing (72, ~4.990 linhas) e na main (71, 4.798); contagem dos 7 componentes que chamam getCollection; leitura dos package.json de site-cpps, site-redalint e site-lab; gh api repos/cpps-unesp/site-cpps/rulesets — lido em 2026-09-22. Em 2026-09-23: curl -sSI contra cpps.franca.unesp.br e devops-website.pages.dev (dois projetos, duas zonas) e leitura do corpus de documentação da Cloudflare Pages (pages/llms-full.txt, 965.548 bytes); Chrome 152 headless por CDP contra a URL de produção e contra a mesma página servida localmente sob cinco políticas de CSP; leitura do registro de plugins do tinacms 3.13.0 (DEFAULT_FIELDS, ColorFieldPlugin, PluginType.add/find/remove) e do validateSchema do @tinacms/schema-tools 2.10.0; renderização do FormBuilder real do Tina em jsdom nos estados com e sem cms.fields.remove('color'); bancada de Tailwind 4.3.3 com pacote real em node_modules — ver VERIFICACOES-2026-09-23.md"
---

## Status

**Proposto** — 2026-09-22. Aguarda revisão de Rafael e Arthur.

## Contexto

O parque de sites vai para três organizações do GitHub, todas no plano Free — o
quadro está no [ADR-040](/decisoes/plataforma-sites-n-repositorios/). São dezenas
de sites previstos, **um repositório por site**, e uma equipe central de **duas
pessoas**.

O requisito é explícito e não está em discussão: **identidade visual própria por
grupo** — não "o mesmo site com outra cor". Duas medições enquadram o problema.

**A deriva já começou, e ela é a forma que o fork toma quando ninguém decide.**
`site-cpps`, `site-redalint` e `site-lab` têm a **mesma stack** — Astro 6,
Tailwind 4, DaisyUI 5, `astro-pagefind`, `theme-change`, MDX, `sharp` — em
versões divergentes: os dois últimos em `astro-pagefind` ^1.8.3, `theme-change`
^2.5.0 e `@astrojs/mdx` ^5.0.0, o `site-cpps` em ^2.0.1, ^3.0.4 e ^6.0.3 (lido nos
três `package.json` em 22/09). O `site-nefits` já é outra stack (Astro 7 + React +
Bootstrap). O quadro completo da frota, com deploys e rulesets, está no ADR-040.

**A base atual reprova acessibilidade hoje.** No `site-cpps`, `btn-primary` sai
a **2,09:1** e `text-primary` sobre branco a **2,57:1** — ambos abaixo do
4,5:1 do WCAG 2.1 AA (1.4.3) e do 3:1 de elemento de interface (1.4.11).
Em `src/styles/global.css` há **18 ocorrências de cor hex cravada** (10 valores
distintos), e a **linha 2 é `@plugin 'daisyui';`**, sem lista explícita de
temas: o tema `light` embutido do DaisyUI entra junto com o tema `light` próprio
declarado logo abaixo, e é do embutido que vem o `btn-primary` a 2,09:1.

Se a identidade virar dado editável pelo professor no CMS, esse defeito deixa de
ser um bug de uma folha de estilo e passa a ser **uma classe de defeito que
qualquer pessoa pode criar a qualquer momento**, num repositório público, com
commit imediato no save.

## Decisão

**A identidade de cada grupo é entregue por tokens versionados e variantes
nomeadas, sobre um kit único de componentes. Não há fork de código, e não há
editor de blocos.**

### O mecanismo: token é variável CSS, e variável CSS é dado

No Tailwind 4 com DaisyUI 5, todo utilitário resolve para **variável CSS**:
`bg-primary` compila para `background-color: var(--color-primary)`, e o DaisyUI 5
declara os temas como blocos de custom properties. A consequência operacional é
direta: **redefinir o valor do token num bloco `<style>` no `<head>`, montado a
partir do conteúdo do site, repinta a página inteira sem recompilar o Tailwind.**

O que isso economiza, na ordem em que importa:

- **Uma única folha compilada do kit serve todos os grupos.** Não há build de
  tema por grupo, nem `safelist`, nem variante de classe multiplicada no bundle.
- **Um release do kit não força rebuild de todo o parque.** A cota de 500
  builds/mês da Pages **deixou de morder** quando o
  [ADR-041](/decisoes/sites-na-cloudflare-pages-direct-upload/) decidiu Direct
  Upload — quem compila é o Actions. O que sobra, e é o custo real, são **N
  execuções de Actions e N PRs de atualização** por release: multiplicar build
  por variante de tema multiplicaria isso de novo, sobre as mesmas duas pessoas.
- **A mudança de identidade vira diff de um arquivo de conteúdo**, revisável por
  quem não lê CSS.

:::note[O limite honesto do mecanismo]
Injetar token muda o **valor** de um utilitário que já existe na folha
compilada. Não cria utilitário novo: se ninguém escreveu `bg-brand-7` no kit,
nenhum token o faz existir. É exatamente isso que torna a fronteira do fork
verificável — ver abaixo.
:::

### Pré-requisito: a faxina, antes de qualquer token

Sem ela o token entra num alicerce que já reprova.

1. Trocar a linha 2 por `@plugin 'daisyui' { themes: ... }` com **lista
   explícita**, expulsando o `light` embutido de onde vem o 2,09:1.
2. Eliminar as **18 ocorrências de hex** de `src/styles/global.css`, deixando
   cor só dentro do bloco de tema, como token nomeado.
3. Corrigir os dois pares medidos (`btn-primary` 2,09:1, `text-primary` sobre
   branco 2,57:1) para ≥ 4,5:1 e ≥ 3:1 conforme o papel.

Em **PRs separados** e **antes** de ligar o gate: ligar o gate primeiro deixa a
main vermelha, e o ruleset `Protect main` do `cpps-unesp/site-cpps` já exige o
check `ci`. Hoje ele exige também PR, 1 aprovação e `non_fast_forward` — e a
exigência de **aprovação** cai pelo [ADR-046](/decisoes/classe-leve-para-sites-de-divulgacao/),
que define os rulesets por classe; o que permanece, e é o que importa aqui, é o
check `ci` obrigatório. (O `AGENTS.md` do repo afirma que não há ruleset nenhum e
**está errado**; a correção é item do ADR-046.)

### O gate de contraste é check obrigatório, não zelo

**Onde roda:** no mesmo job `ci` que o ruleset já exige, no workflow **de cada
repositório de site**. Não no `.github` da organização — workflow lá **não é
herdado** pelos repos, e o `colabhd/.github` contém hoje **apenas o
`sync-readme`**.

**O que bloqueia:** qualquer par token/fundo declarado no catálogo ou no
conteúdo do site abaixo de **4,5:1** para texto normal e **3:1** para texto
grande e elemento de interface. Falha fecha o merge.

**Quem é dono do gate:** este ADR. A regra, o limiar e a decisão de ligá-lo
bloqueante estão aqui; a **implementação** (aritmética sobre os hex, no job `ci`)
é item do [ADR-047](/decisoes/agente-de-traducao-local-cliente-do-endpoint/), que
o constrói junto com o resto do determinístico. Não há "modo aviso com prazo": a
faxina vem antes justamente para que o gate não nasça vermelho.

**O parque tem tema escuro, e o gate percorre a matriz.** O `theme-change` está na
stack dos três sites medidos, e o `global.css` declara tema `light` próprio além
do embutido do DaisyUI. Portanto **cada variante do catálogo é um par (claro,
escuro)**, medida nos dois modos, e o gate reprova se qualquer um dos dois lados
reprovar. As duas medições que abrem este ADR — `btn-primary` 2,09:1 e
`text-primary` sobre branco 2,57:1 — são do modo claro; **o modo escuro não foi
medido**, e medi-lo é parte da faxina, não trabalho posterior. Uma variante só
existe no catálogo quando os dois lados passam.

**Por que é pré-requisito, e não capricho:** no desenho anterior a cor vinha do
código e passava por revisão. Com token no conteúdo, **a decisão de
acessibilidade sai do repositório e vai para o CMS**, que num repositório
público commita por arquivo no instante do save — não há embargo. O gate é o que
devolve a decisão para um lugar onde alguém a confere.

O peso não é só técnico. Site de universidade pública estadual é sítio da
administração pública: a LBI (Lei 13.146/2015, art. 63) obriga acessibilidade de
sítios mantidos por empresas e órgãos públicos, e o eMAG adota WCAG como
referência. **Não verificado:** não há parecer jurídico da UNESP em mãos sobre o
enquadramento exato deste parque; verificaria com a Procuradoria Jurídica antes
de afirmar obrigação em texto público.

### A fronteira entre identidade própria e fork

**O grupo pode mudar, por dado:**

| eixo | como |
|---|---|
| paleta | variante nomeada do catálogo (ex.: `oceano`, `terra`, `grafite`) |
| par tipográfico | par nomeado do catálogo, com as fontes já hospedadas pelo kit |
| raio e densidade | `--radius-box`, `--radius-field`, `--radius-selector`, `--size-field`, `--border` (tokens do DaisyUI 5) |
| marca | logotipo, favicon, imagem de capa — asset, não código |
| composição da home | ordem e presença das seções **que o kit publica** |
| variante de cabeçalho/rodapé | entre as variantes nomeadas que o kit publica |

**O grupo não pode, sem deixar de ser kit:** markup novo de componente; classe
utilitária que não existe na folha compilada do kit; CSS arbitrário injetado;
override de breakpoint ou de grid; fonte fora do conjunto publicado; troca de
biblioteca de UI (o caminho que o `site-nefits` já tomou com React + Bootstrap).

Quem cruza a fronteira **fica com o repositório próprio e sai do kit**. Isso é
coerente com a decisão de N repositórios: a saída de um grupo é transferir o
repositório, e sair do kit é o mesmo movimento em escala menor.

### Como o professor escolhe: opções validadas, nunca cor livre

O campo no schema é **seleção com `options` validadas** — a variante nomeada —,
nunca entrada livre de cor.

:::tip[Regra, para o revisor e para o CI — reescrita com a medição de 23/09/2026]
**Nenhum campo do schema pode declarar seletor de cor.** A proibição tem duas
camadas, e as duas foram medidas em 23/09/2026 contra `tinacms` 3.13.0,
`@tinacms/schema-tools` 2.10.0 e `@tinacms/graphql` 2.4.11.

**Declarativo não existe, e isso não vai mudar sozinho.** Não há allowlist de
componentes em lugar nenhum do Tina. O `validateSchema` do `schema-tools` tem
assinatura fechada — `({ schema }) => void`, sem hook de regra — e **aceita**
`ui: { component: 'color' }` sem reclamar (medido, com controle negativo: o mesmo
validador rejeita nome de campo duplicado); o validador de build do
`@tinacms/graphql` checa só `name` e `type` do campo e nunca lê `ui`.

**Na ferramenta, e funciona.** O componente de cor é o plugin `color` do registro
embutido (`DEFAULT_FIELDS`, 22 plugins), registrado **por instância de CMS**, no
browser. `cms.fields.remove('color')` no `cmsCallback` — caminho tipado em
`defineConfig`, chamado pelo provider do admin, e usado pelo próprio Tina para
sobrescrever o campo `rich-text` — apaga o plugin: um campo com
`ui.component: 'color'` passa a renderizar *"Unrecognized field type"*. Melhor:
registrar no lugar um componente de recusa que diga ao professor para usar a
variante nomeada. Medido renderizando o `FormBuilder` real em DOM, nos dois
estados. Nenhuma doc oficial do Tina descreve isso, então é API pública **não
documentada** e vira **teste próprio no `ci`** — é esse teste que nos avisa se um
upgrade do Tina mudar o registro.

**O `grep` literal sai, e a guarda que entra é lista-branca, não lista-negra.**
Um componente de cor entregue como função React (`ui: { component: SeletorLivre }`)
não contém a string `color`, escapa do `grep`, escapa do registro de plugins — o
`InnerField` renderiza função direto — e ainda **some** do
`tina/__generated__/_schema.json`, porque função não sobrevive a `JSON.stringify`
(medido: zero ocorrências no JSON serializado). Logo o `_schema.json` **não serve
como fonte** para esta guarda. E lista-negra também não serve: a auditoria
construiu o contraexemplo que passa em tudo — no `cmsCallback`, copiar o plugin de
fábrica para outro nome (`cms.fields.add({ ...cms.fields.find('color'), name:
'seletor-de-marca' })`), chamar `cms.fields.remove('color')` para parecer
obediente, e declarar `ui.component: 'seletor-de-marca'` no schema. Isso passa no
`grep`, passa numa guarda que procura `'color'` e passa num teste de CI que só
confere `cms.fields.find('color')` — **e entrega o color picker de fábrica com
campo hex livre ao professor**.

A guarda, portanto: roda **sobre o módulo de config compilado** (esbuild, import,
caminhada na árvore de `collections → fields/templates` — medido não-vacuoso: 338
campos visitados, 88 com bloco `ui`, 13 collections no `tina/config.ts` real), e
**aprova apenas `ui.component` cujo nome esteja no catálogo publicado pelo kit**.
Reprova qualquer outra string, reprova `ui.component` que seja função, e reprova
as props exclusivas do picker (`colorFormat`, `colors`, `widget`).

**E o `cmsCallback` do site é proibido.** O registro de plugins é populado em
runtime, no browser, por instância de `TinaCMS`: nenhuma guarda estática segura um
site que possa escrever o próprio `cmsCallback`. Ele vem do `defineConfig`
compartilhado do `@colabhd/site-kit`, e é lá — num lugar só, para todo o parque —
que moram a remoção do plugin e a lista-branca. **Isso deixa de ser conveniência
do kit e passa a ser requisito de segurança desta decisão.**

**Nota:** `widget: 'block'` com lista de `colors` **não** é catálogo fechado — o
`BlockWidget` renderiza um campo de hex livre ao lado das amostras. Não há
configuração do picker do Tina que o torne aceitável.
:::

A razão é a mesma do gate: um seletor de cor livre é um gerador de pares
reprovados, e a pessoa que o usa não tem como saber disso na hora. Um catálogo
fechado é a única forma de o contraste ser **auditado uma vez** em vez de
auditado a cada save.

**E a validação não espera o CI.** O `ui.validate` do Tina é função por campo,
roda no final-form a cada mudança de valor e tem precedência sobre o `validate` do
plugin. Medido em 23/09/2026 no formulário real: digitar um valor fora do catálogo
produz `hasValidationErrors=true`, exibe a mensagem no próprio campo e
**desabilita o botão Save** — o `canSubmit` do `FormBuilder` é
`!pristine && !submitting && !hasValidationErrors && …`. Token fora do enum não
chega a virar commit. É a camada que faltava entre "opções validadas" e "gate no
CI": o professor descobre na hora, não no PR.

## Alternativas rejeitadas

**Puck.** É editor de blocos visual, maduro, e daria ao professor liberdade de
composição que token nenhum dá — **esse é o argumento forte a favor, e ele é
real**: se um grupo quiser uma página com arranjo que o kit não prevê, tokens
não respondem e o Puck responde. Rejeitado por três fatos: é **React-only**; o
projeto **não tem `@astrojs/react`**; e os **72 componentes `.astro` (cerca de
4.990 linhas na branch `feat/tinacms-visual-editing`; 71 e 4.798 na `main`
hoje)** não são registráveis no mapa de componentes do Puck, que espera
componente React. Adotá-lo significaria **dois modelos de conteúdo** ao mesmo
tempo — a árvore de blocos em JSON do Puck e as content collections em MDX — com
duas pessoas para operar os dois.

**craft.js.** Mesmo diagnóstico, um degrau pior: é framework para *construir* um
editor, não um editor pronto, e também React-only.

**Quando os dois voltam à mesa:** se o kit passar a ter `@astrojs/react` por
outro motivo já decidido, ou num site **novo** que nasça React sem os 72
componentes — aí a liberdade de composição passa a valer o preço.

**Tema único com troca de cor.** O argumento a favor é o mais forte de todos
para uma equipe de duas pessoas: é o mais barato de operar e **elimina a classe
inteira de falhas de contraste**, porque há um tema só, auditado uma vez.
Rejeitado porque contradiz o requisito: dezenas de grupos pintados da mesma cor
primária continuam sendo o mesmo site, e a identidade própria é o pedido.

**Fork do repositório por grupo.** A favor: liberdade total, e encaixe perfeito
com "a saída de um grupo é transferir o repositório" — os repositórios já são N.
Rejeitado porque a deriva medida acima é o fork acontecendo sem que ninguém o
tenha escolhido: mesma stack em versões divergentes, um CI que nunca roda na
main, um CNAME apontando para conta inexistente. Fork institucionaliza isso e
multiplica por N o custo de qualquer correção de contraste — num parque que já
aceitou **254 PRs de Dependabot e 30,2 merges/mês num único site**, e projeta
entre **300 e 970 PRs/mês em 30 repositórios**, conforme a cadência do Renovate
([ADR-040](/decisoes/plataforma-sites-n-repositorios/), medido em 23/09/2026).

## Consequências

**O kit vira pacote npm público, publicado em `1.0.0` desde o início** — pacote
público é ilimitado e gratuito, e o auto-merge recusa `minor` em versão `0.x`.
Pacote público **cruza organização**, o que resolve o kit para as três orgs de
uma vez; ruleset, porém, é **por repositório**, e segredo de organização **não
cruza org**.

**Aceita-se uma armadilha silenciosa, e ela vira item do gate — agora medida.** O
Tailwind 4 **não varre `node_modules`**: em bancada de 23/09/2026, um site com o
pacote instalado de verdade em `node_modules` e sem `@source` compila com exit 0,
sem um aviso, e produz CSS onde **nenhuma** classe do pacote existe, enquanto o
HTML sai com elas. A mitigação (Astro Integration do kit injetando a diretiva)
**funciona**, com a ressalva de ordenação de plugins Vite que o
[ADR-040](/decisoes/plataforma-sites-n-repositorios/) registra. Duas coisas desta
decisão dependem disso e foram confirmadas na mesma corrida: **os tokens DaisyUI
sobrevivem à injeção** — com o cabeçalho real do `site-cpps` (`@plugin 'daisyui'`
mais blocos de tema), `.btn` e `.btn-primary` vindos do pacote saem no CSS —, e o
`@source` **varre todo arquivo sob o diretório-base, ignorando a extensão do
glob**: variante nomeada que gere classe a partir de `.ts` do kit é alcançada sem
glob mais largo, e o risco real é o oposto, varrer README e lockfile e inchar o
CSS. A diretiva aponta para a **pasta de componentes**, não para a raiz do pacote.
O gate precisa falhar quando a folha compilada não contiver as classes do kit —
senão o modo de falha é um deploy verde com o site branco.

**Sete componentes precisam ser invertidos antes de entrar no kit.** Componente
publicado em pacote não pode importar `astro:content` (módulo virtual): o kit
recebe dados por `props` e quem chama `getCollection` é a página do site. Hoje
**7 componentes do `site-cpps` chamam `getCollection`**. Publicar `.astro` em
pacote npm é oficialmente suportado pelo Astro, sem build step.

**Aceita-se que o catálogo fechado vai frustrar pedido legítimo.** A primeira
resposta a "quero esse verde" será "não está no catálogo; entra como variante
nova na próxima versão do kit" — latência de semanas, com duas pessoas. É o
preço de auditar contraste uma vez em vez de a cada save.

**O rótulo da variante entra no i18n field-based e herda o defeito dele.** São
**51 campos localizados em 235 instâncias**, **sem fallback para `pt`**: rótulo
de variante vazio em `en`/`es` renderiza vazio. O preview do admin é sempre em
`pt`, então o buraco não aparece para quem edita.

**O gate não é obrigatório em todo lugar, e isso fica escrito.** No GitHub Free,
**repositório privado não aceita ruleset nem branch protection** (a API devolve
403). O `lab-ippri-unesp/site-odr` é privado — lá o gate roda informativo, sem
poder bloquear. Isso também colide com o requisito de repositório público, e é
decisão de outro ADR.

**Não entra na ficha de inventário da casa.** O schema Zod strict de
`website/src/data/inventario/aplicacoes.yaml` restringe `sitio_dono` ao enum
`franca`/`sp`, e a guarda de CI (`.github/scripts/guarda-apps.py:17`) só indexa
`apps/franca`, `apps/sp` e `apps/multi`: um kit em npm e sites na Cloudflare são
literalmente irrepresentáveis ali. Há precedente de exclusão — as 14 fichas não
incluem `devops.colabh.org` nem `trilhas.colabh.org`.

**A Cloudflare Pages não injeta CSP — medido em 23/09/2026, e o mecanismo de
injeção pode ser fechado.** `curl -sSI` contra `cpps.franca.unesp.br/pt/` e contra
`devops-website.pages.dev` (dois projetos, duas zonas) devolveu o mesmo conjunto
de cabeçalhos — `access-control-allow-origin`, `cache-control`,
`referrer-policy: strict-origin-when-cross-origin`, `x-content-type-options:
nosniff`, `server: cloudflare`, `cf-ray` — e **nenhum `Content-Security-Policy`
nem `Content-Security-Policy-Report-Only`**, igual em 200, em 404 e em asset. É
exatamente a lista que a doc da Pages publica como *headers always added*, e CSP
não está nela: nas 965 KB do corpus de documentação da Pages, as cinco menções a
CSP são exemplos de **o projeto** declará-la em `public/_headers`. **CSP na Pages
é opt-in, e ninguém optou:** o `site-cpps` não tem `public/_headers` em nenhuma
branch, e nenhum commit em todo o histórico jamais criou um.

:::caution[O que a mesma medição derrubou, e é honestidade obrigatória aqui]
Não existe, hoje, **precedente em produção** de bloco `<style>` inline aplicando.
A primeira leitura da bancada concluiu que sim, a partir de
`getComputedStyle(.line-clamp-3).webkitLineClamp === "3"` na página de notícias —
e a auditoria mostrou que esse valor vem da folha **externa**
`/_astro/global.*.css`, não do inline. Os blocos `<style>` com escopo do Astro
servidos hoje (4 regras em `/pt/noticias/`, 4 em `/pt/institucional/sobre/`) não
casam com **nenhum** elemento do DOM: remover o bloco inteiro não muda uma vírgula
da renderização. **A aposta do mecanismo de tokens repousa só sobre a ausência de
CSP, que essa sim foi medida** — não sobre um precedente que não existe.
:::

**O que muda se a casa quiser CSP depois, e a alternativa já testada.** Na mesma
bancada, a mesma página sob `style-src 'self'` teve os blocos bloqueados, com
`--color-primary` resolvendo para string vazia e o elemento transparente: o
mecanismo de tokens **não degrada, morre**. **Nonce está fora de alcance em
hospedagem estática** — nonce é por requisição, a Pages serve arquivo, e
`_headers` é estático. **Hash é frágil nesta escala** — muda a cada build, teria
de ser gerado no build, dentro do teto de **100 regras de header e 2.000
caracteres por header**, e não cobriria conteúdo do CMS. **A saída boa é a
terceira, e foi verificada:** servir os tokens como **arquivo CSS por site**
(`<link rel="stylesheet" href="/tokens.css">`) passou sob `style-src 'self'` sem
nonce e sem hash, aplicando a custom property normalmente. **Recomendação: manter
o inline agora, porque ele passa, e escrever o gerador de tokens de modo que
trocar `<style>` inline por arquivo seja mudança de uma função, não de um
desenho.**

**E, se o dia da CSP chegar, ela é maior que os tokens.** A home do `site-cpps`
serve hoje **6 blocos `<script>` inline** — entre eles o bootstrap do
`theme-change` que lê `localStorage` antes da pintura — e 2 atributos `style=`;
uma `script-src 'self'` quebra o tema antes de quebrar a cor. E, medido pela
auditoria, uma `style-src 'self'` derruba também as **três folhas externas de
terceira origem** que o site carrega: Google Fonts para Montserrat e Bebas Neue, e
o Font Awesome do cdnjs — ou seja, a **tipografia que esta decisão define** cai
junto. Adotar CSP neste parque é projeto próprio, com inventário de inline e de
origem externa, e não um cabeçalho que se acrescenta.

**Não verificado, e continua:** o contraste de qualquer par no **modo escuro** —
nem no tema próprio nem no embutido do DaisyUI —, e o contraste de qualquer par do
catálogo, porque o catálogo ainda não existe. A medição real é a primeira tarefa
depois da faxina, e nada de 23/09 a antecipou.

## Critério de revisão

1. **Três pedidos de identidade recusados pelo catálogo em 12 meses**, ou um
   grupo declarando por escrito que sai do kit por esse motivo → reabrir com
   eixo novo, ou com editor de blocos.
2. **`@astrojs/react` entrar no kit por outro motivo já decidido** → Puck volta à
   mesa no mesmo dia.
3. **Qualquer par do catálogo medido abaixo de 4,5:1 em produção com o gate
   ligado** → o defeito é do gate, não do catálogo; reabrir o gate.
4. **Mais de 30% dos sites no ar com CSS local fora do kit** (medível por busca
   de `@layer` e `!important` fora dos arquivos do pacote) → a fronteira está no
   lugar errado e precisa ser redesenhada, não reforçada.
5. **DaisyUI 6, ou o Tailwind passar a varrer `node_modules`** → a mecânica de
   injeção muda e este ADR se reabre pela mecânica, não pelo princípio.
6. **Data-limite:** 2027-03-22, ou o **décimo site no ar** com o kit, o que vier
   primeiro.
