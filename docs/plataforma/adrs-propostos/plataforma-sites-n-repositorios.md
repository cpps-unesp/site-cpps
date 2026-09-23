---
title: "ADR-040 — Topologia da plataforma de sites: um repositório por site, em três organizações, com chassi em pacote npm"
description: "Um repositório por site, em três organizações do GitHub, e o chassi comum num pacote npm público. O custo aceito é um volume de PRs de dependência entre a ordem de 300 e 970 por mês em 30 repos, medido em bancada e dependente de uma decisão de cadência ainda não tomada; o que compra isso é a saída de um grupo virar uma transferência de repositório."
sidebar:
  order: 43
medido: "2026-09-23"
medidoCom: "gh api orgs/{colabhd,lab-ippri-unesp,cpps-unesp} e .../repos (plano, contagem e visibilidade dos repositórios); leitura dos package.json de cpps-unesp/site-cpps na main, de colabhd/site-redalint e de lab-ippri-unesp/site-lab; gh api repos/cpps-unesp/site-cpps/rulesets; gh api repos/colabhd/site-redalint/pages; leitura de .github/workflows/ci.yml do site-redalint; contagem de PRs de Dependabot e de merges por mês no site-cpps; GET registry.npmjs.org/-/org/colabhd/package e /@colabhd%2fsite-kit para o escopo npm — tudo lido em 2026-09-22. Em 2026-09-23, duas bancadas: (a) Tailwind — site Astro 6.4.8 + tailwindcss 4.3.3 + @tailwindcss/vite 4.3.3 + vite 7.3.6 consumindo um pacote instalado por npm pack + tarball (diretório real em node_modules, não symlink), com e sem @source, com e sem Astro Integration, em astro build e astro dev, mais uma corrida de controle com .gitignore e outra com o cabeçalho DaisyUI real do site-cpps; (b) Renovate — npx renovate@44.108.2 com RENOVATE_PLATFORM=local e RENOVATE_DRY_RUN=full sobre o package.json e o package-lock.json reais do site-cpps, em três configurações, mais gh pr list --state all --author app/dependabot no cpps-unesp/site-cpps (254 PRs) e leitura de configuration-options.md, how-renovate-works.md e mend-hosted/overview.md em renovatebot/renovate@bdf59d6 — ver VERIFICACOES-2026-09-23.md"
---

## Status

**Proposto** — 2026-09-22. Aguarda revisão de Rafael e Arthur.

## Contexto

A casa vai hospedar **dezenas de sites** de grupos de pesquisa, cada um com identidade visual
própria, mantidos por uma equipe central de **duas pessoas** (Rafael e Arthur). Os sites são de
divulgação: não guardam dado de pesquisa, e o repositório é **público** por requisito, não por
acaso.

Hoje a frota já existe e já deriva, em **três organizações do GitHub**, todas no plano Free:

| organização | nome | o que tem hoje |
|---|---|---|
| `colabhd` | Colaboratório de Humanidades Digitais | **82 repositórios, 11 públicos** — entre eles `site-redalint`, `site-colabhd` (vazio) e `.github`; o `devops` (IaC) é **privado** |
| `lab-ippri-unesp` | Laboratório Multiusuário IPPRI/UNESP | 3 repositórios: `site-lab` e `.github` públicos, `site-odr` **privado** |
| `cpps-unesp` | Centro de Pesquisa Política e Social | 11 repositórios, 4 públicos: `site-cpps`, `site-nefits`, `site-nepps`, `obs-studio`; `site-gedai`, `site-lantri` e `site-nefa` são **privados e vazios** |

Este quadro é o **único** desta série; os demais ADRs da leva citam esta seção em vez de repetir a tabela.

A deriva é mensurável, e em **três** repositórios, não dois. `site-cpps`, `site-redalint` e
`site-lab` têm a **mesma stack** — Astro 6, Tailwind 4, DaisyUI 5, `astro-pagefind`,
`theme-change`, MDX, `sharp` — em versões divergentes, medidas nos três `package.json` em
22/09/2026: `site-redalint` e `site-lab` estão em `astro-pagefind` ^1.8.3, `theme-change`
^2.5.0 e `@astrojs/mdx` ^5.0.0 (e Tailwind cravado em 4.1.18), enquanto o `site-cpps` está em
^2.0.1, ^3.0.4 e ^6.0.3. Os deploys também divergem: o `site-cpps` publica na Cloudflare Pages
e o `site-redalint` tem **GitHub Pages** habilitado (`build_type: workflow`, `status: null` —
configurado e nunca construído), sem projeto nenhum na Cloudflare. O `site-cpps` tem ruleset
ativo `Protect main` (PR + 1 aprovação + `non_fast_forward` + check `ci`); o `site-redalint`
não tem ruleset, e o `ci.yml` dele usa `push` com `branches-ignore: main` — **nunca roda na
main**. O `site-nefits` é outra stack (Astro 7 + React + Bootstrap) e `nefits.franca.unesp.br`
faz CNAME para `labriunesp.github.io`, conta que **não existe** (404). `site-gedai`,
`site-lantri` e `site-nefa`, criados em 11/06/2026, seguem com `size` 0 — e **privados**. Duas
pessoas não seguram trinta stacks divergentes por inspeção.

:::note[Travado, e não reaberto aqui]
Repositório **público**; TinaCMS self-hospedado (não TinaCloud); edição visual agora; agente de
IA local na GPU própria; **mínimo de infra própria**, com Cloudflare gratuito. Este ADR
registra o que isso obriga na topologia.
:::

## Decisão

**Um repositório por site. Não monorepo.** O chassi comum sai do repositório e vira pacote npm
público, `@colabhd/site-kit`, publicado a partir da organização `colabhd`.

### O custo medido que se aceita

No `site-cpps`, num único site: **254 PRs de Dependabot** desde 07/08/2025 e **30,2 merges/mês**
(a contagem de 171 era de 22/09 e recontamos em 23/09, com a série inteira). Em janelas de meses
completos do regime ativo, a taxa fica entre **30,9 e 37,3 PRs/mês**. Projetando linearmente para
30 repositórios, **da ordem de 970 PRs/mês sem agrupamento** — o que a equipe de duas pessoas
não revisa manualmente em hipótese nenhuma.

:::caution[Medido em 23/09/2026: o agrupamento está medido, o volume mensal não — e depende de uma decisão que ainda não tomamos]
**O agrupamento, esse, está medido.** Com `npx renovate@44.108.2` em
`RENOVATE_PLATFORM=local` e dry-run, sobre o `package.json` e o `package-lock.json`
**reais** do `site-cpps`, as mesmas 14 atualizações pendentes produzem **13 branches sem
agrupamento e 7 com `group:allNonMajor`** — fator **1,86**. Todos os não-majors colapsam
em `renovate/all-minor-patch`; cada `major` continua em branch própria, porque o preset casa
só `minor` e `patch`. (Uma terceira corrida deu 4 branches, mas ali 3 atualizações foram
**suprimidas** por regras de `ignore`, o que é outra coisa e não conta como agrupamento.)

**A sobreposição também está medida, e ela não reduz PR nenhum.** Dos 20 pacotes diretos do
`site-cpps` e dos 20 do `site-redalint`, **12 são o mesmo pacote**; pelos lockfiles, **489 dos
507 pacotes da árvore do `site-redalint` (96,4%) também estão na do `site-cpps`**, e a união
dos dois é 625, não 1.114. Mas a documentação do Renovate é explícita: o fluxo é um laço
*"For each repository"* que faz clone, extração, agrupamento e `Create PR` inteiramente dentro
do repositório, e *"all updates sharing the same `groupName` will be placed into the same
branch/PR"* — a mesma branch **daquele** repositório. **Não existe PR que atravesse
repositórios.** O que cruza organização é o preset, que é configuração. Trinta repositórios com
a mesma dependência produzem trinta PRs idênticos. O que a sobreposição reduz é **decisão**, não
PR: um `major` do Astro é uma leitura de changelog e trinta merges, não trinta leituras.

**O volume mensal continua em aberto, e o número não é 1.045 nem é um número só.** A taxa base
medida nos 254 PRs de Dependabot do `site-cpps` (`gh pr list --state all --author
"app/dependabot"`), em janelas de meses **completos** do regime ativo, fica entre **30,9 e 37,3
PRs/mês** — os 34,8 implícitos em 1.045÷30 caem dentro dessa faixa, e a extrapolação original
**não estava inflada**. O que falta para fechar é uma decisão nossa: o preset testado **não
declara `schedule`**, e o padrão do Renovate é *"at any time"*; o App gratuito da Mend roda
**de 4 em 4 horas**. Com `automerge` nos não-majors, isso cria, mergeia e recria o PR de grupo a
cada chegada de update, não uma vez por semana. Faixa defensável hoje: **~970/mês sem
agrupamento**, **~300/mês com `group:allNonMajor` mais um `schedule` semanal explícito** (que
ninguém escreveu e ninguém benchou), e indeterminado entre os dois na configuração que de fato
testamos. **Decidir e benchar o `schedule` é o próximo passo**, e é ele que fecha esta lacuna.

E o que **não** cai em hipótese nenhuma é o número de merges na `main`.
:::

### O que esse custo compra

1. **A saída de um grupo é `Transfer repository`.** Histórico, issues e PRs vão junto numa
   operação do GitHub. Num monorepo, a mesma saída é `git filter-repo` e uma negociação sobre o
   que sai junto.
2. **Isolamento por grupo.** Permissão, ruleset, colaborador externo e blast radius de um
   deploy ficam no escopo daquele site.
3. **Actions grátis e sem cota**, porque o repositório é público — o que só vale enquanto a
   decisão 4 valer.

### O `@colabhd/site-kit` deixa de ser opcional

Com monorepo, o chassi comum é uma pasta e o compartilhamento é de graça. Com N repositórios,
**não existe compartilhamento sem pacote**. O kit é o que impede que 30 repositórios virem 30
stacks — é infraestrutura da decisão, não conveniência. npm cobra zero por pacote público e não
limita a quantidade.

Três armadilhas verificadas, e o que cada uma obriga:

**1. Tailwind 4 não varre `node_modules` — verificado em bancada em 23/09/2026.** Um site Astro
6.4.8 com Tailwind 4.3.3 via `@tailwindcss/vite`, consumindo um pacote instalado de verdade em
`node_modules` (por `npm pack` + tarball, **não** por symlink, que falsearia o teste), compila
com **exit 0 e sem um aviso** e produz um CSS de **5.609 bytes onde nenhuma** das classes do
pacote existe — enquanto o HTML sai com elas no markup. É a falha silenciosa na forma pura:
build verde, página crua. Com `@source` apontando para o pacote, o mesmo build produz 6.190
bytes e as regras aparecem. A documentação oficial promete exatamente isso, e o exemplo canônico
de `@source` é um pacote de UI de terceiro.

Mitigação: o kit expõe uma **Astro Integration** que injeta a diretiva — e isso também está
**provado**: com o site declarando apenas `integrations: [kitUi()]` e um `global.css` de uma
linha, o CSS de `dist/` traz as mesmas regras utilitárias que o `@source` escrito à mão, em
`astro build` e em `astro dev`. Funciona também **caminho absoluto** em `@source`, que a doc não
documenta, e funciona com o cabeçalho DaisyUI real do `site-cpps` (`@plugin 'daisyui'` mais
blocos de tema): `.btn` e `.btn-primary` vindos do pacote saem no CSS.

:::caution[A injeção tem uma condição, e a condição é ela própria uma armadilha]
Astro **anexa** os plugins Vite de uma integração *depois* dos declarados no `vite.plugins` do
site. Um plugin `enforce: 'pre'` do kit portanto roda **depois** de `@tailwindcss/vite:scan`,
que já consumiu o `@import "tailwindcss"` — o `transform` do kit vê o CSS, não encontra o
marcador, não injeta nada, e o build fica verde e sem estilo. **A versão ingênua da integração
falha no mesmo silêncio que ela existe para evitar**, e isso foi medido nos dois arranjos
(pacote por symlink e pacote real em `node_modules`). Duas saídas foram medidas, ambas
produzindo o CSS correto: **(a)** o kit vira dono do Tailwind, injetando `[injetor,
tailwindcss()]` na mesma chamada, e cada site **remove** `tailwindcss()` do seu
`astro.config.mjs` — o que só troca a linha esquecida por uma linha que precisa ser apagada; e
**(b)** o injetor se reordena sozinho em `configResolved`, movendo-se à frente de
`@tailwindcss/vite` no array `resolved.plugins` (mutável em tempo de execução, `Object.isFrozen`
falso) — funciona **sem mudança nenhuma no site**, ao preço de depender de um detalhe não
documentado do Vite. **Adota-se (b), com (a) como recuo**, e o gate de CI do kit passa a incluir
um `grep` de classe-sentinela no CSS de `dist/`: é o único teste que pega essa regressão, porque
o build nunca vai avisar.
:::

**E `@source` varre demais, não de menos.** Medido na mesma bancada: o Tailwind 4.3.3 **ignora a
parte de extensão do glob** e varre todo arquivo sob o diretório-base da diretiva — classes que
só existiam em `tokens.ts`, `LEIAME.txt` e `dados.json` dentro do pacote saíram no CSS com
`@source "<pkg>/**/*.astro"`. O conselho, portanto, é o inverso do intuitivo: **apontar o
`@source` para o diretório mais estreito que contém componentes**, nunca para a raiz do pacote,
senão README, CHANGELOG e qualquer `node_modules` aninhado viram fonte de classe. O gate do kit
vigia as duas pontas: classe-sentinela ausente **e** inchaço do CSS.

**2. Componentes do pacote não podem importar `astro:content`.** É módulo virtual do projeto
que faz o build, não do pacote. A dependência **inverte**: o kit recebe dados por **props**, e
quem chama `getCollection` é a página do site. Hoje **7 componentes do `site-cpps` chamam
`getCollection` direto** — são os que precisam ser partidos em dois (buscar fica na página,
desenhar vai para o kit).

**3. `.astro` publica em pacote npm sem build step**, oficialmente suportado pelo Astro. O kit
não tem pipeline de compilação, `dist/` nem sourcemap: o que está no repositório é o que é
publicado — é o que põe a manutenção do kit ao alcance de duas pessoas.

### O escopo do kit, e a fronteira com o site

Com N repositórios, **tudo o que não estiver no kit deriva**. A fronteira precisa estar escrita
para poder ser vigiada (é o critério 4 do
[ADR-044](/decisoes/identidade-visual-por-grupo-tokens/)):

| é do kit | é do site |
|---|---|
| componentes `.astro` que recebem dados por `props` | as chamadas de `getCollection`, e o conteúdo |
| tokens, variantes nomeadas e as fontes hospedadas | a escolha da variante, que é dado |
| resolvedor de i18n, módulo de idiomas e componente de aviso ([ADR-045](/decisoes/i18n-field-based-com-fallback/)) | as traduções |
| integração do Pagefind, em **versão única** | nada |
| a Astro Integration que injeta a diretiva `@source` do Tailwind, apontada para a pasta de componentes | o `global.css`, que importa o Tailwind — **e nada mais** |
| o pino de `vite` que o `@tailwindcss/vite` exige (peerDependency ou override propagado) | nada |
| os workflows reutilizáveis (`ci`, deploy, gate de contraste) | o arquivo de três linhas que os chama por `uses:` |

Não é do kit: `astro.config.mjs` de cada site, `public/_redirects`, conteúdo e mídia. Um
resolvedor de i18n copiado em dezenas de repositórios deriva exatamente como `astro-pagefind`
^1.8.3 vs ^2.0.1 já derivou — é o defeito que esta decisão existe para não multiplicar.

### Em qual organização nasce um site

A pergunta é a análoga, para organização do GitHub, da que o
[ADR-015](/decisoes/dominios-por-natureza/) respondeu para domínio — e a resposta é a mesma:
**a organização é a da instituição dona do grupo**, não a de quem faz o trabalho técnico.

- `cpps-unesp` para grupo do CPPS de Franca; `lab-ippri-unesp` para grupo do IPPRI.
- **`colabhd` é a org da plataforma** — kit, workflows, preset, `devops` — e **não recebe site
  de grupo de outra instituição**. O `site-redalint` está lá por história, não por critério, e
  fica onde está: mover repositório de org quebra link publicado e força rotação de segredo sem
  ganho.
- **Grupo que muda de instituição** muda de org pelo mesmo `Transfer repository` da saída, com
  rotação dos segredos da org de origem e linha nova no `sites.yaml`
  ([ADR-046](/decisoes/classe-leve-para-sites-de-divulgacao/)). O hostname **não** muda, pelo
  ADR-015.

A escolha não é cosmética: ela determina de qual conjunto de segredos, de quais instalações de
GitHub App e de qual cota de Actions aquele site depende, e o que precisa ser rotacionado
quando o grupo sair.

### Quem é dono das organizações, e o que o plano Free não deixa auditar

As três orgs estão no plano **Free** (medido em 22/09/2026). Como no desenho desta série **quem
escreve na `main` publica no ar** ([ADR-041](/decisoes/sites-na-cloudflare-pages-direct-upload/)),
o GitHub é o elo da cadeia de confiança com menos controle — e isso precisa estar escrito, não
subentendido:

- **Dois owners nomeados por organização**, Rafael e Arthur, e nenhum terceiro. Editor de grupo
  entra como colaborador do repositório do grupo, nunca como membro com permissão de org.
- **2FA exigido na organização**, nas três. É a única exigência de identidade que o Free
  oferece. **Não verificado** se está ligada hoje — a API não devolveu o campo para estas orgs;
  verificaria em *Settings → Authentication security* de cada uma.
- **Revisão semestral de membros e colaboradores**, por `gh api orgs/<org>/members` e
  `repos/<repo>/collaborators`, com a saída registrada. É o substituto pobre da revisão de
  acesso que o `diretrizes/iam.md` pede.
- **O que não é executável no Free:** não há SAML, não há política de segurança de organização e
  o log de auditoria tem retenção curta. **Parte do `iam.md` não se aplica ao GitHub neste
  plano** — a trilha por usuário que a casa exige existe no commit, não na administração da org.
  Registrar a lacuna é honesto; aplicá-la ao CMS e ao agente e não ao GitHub, onde o conteúdo e
  o deploy realmente moram, não seria.

### Provisionamento: o `create`, o escopo npm e qual Renovate

Três peças que esta decisão pressupõe e que **não existem hoje**:

1. **O `create` é um script `gh`** no repositório público de `colabhd`, executado por Rafael ou
   Arthur — não uma CLI publicada em npm, que seria mais uma dependência para duas pessoas
   manterem. Numa ordem só: criar o repositório a partir do template, aplicar o ruleset da
   classe, criar o projeto da Pages como Direct Upload, criar o registro DNS e acrescentar a
   linha no `sites.yaml`. Ele **termina quando a raiz responde 200**, que é a definição de
   "pronto" do ADR-046.
2. **O escopo npm `@colabhd` não existe.** Medido em 22/09/2026:
   `registry.npmjs.org/-/org/colabhd/package` devolve `Scope not found`, e
   `@colabhd/site-kit` devolve 404. Está livre, e **precisa ser registrado antes do primeiro
   `publish`** — em conta de organização no npm, com dono nomeado, não em conta pessoal.
3. **Renovate é o App hospedado da Mend**, instalado nas três orgs — não self-hosted em Actions,
   que custaria um workflow e um token por org, ampliando a superfície de credencial que esta
   decisão tenta reduzir. O custo é a terceira instalação e um terceiro no caminho das
   dependências. **Verificado em 23/09/2026** (`docs/usage/mend-hosted/overview.md`,
   `renovatebot/renovate@bdf59d6`): o **Mend Renovate Community Cloud** é *"a generous free
   tier, available for all across an unlimited number of public and private repositories"* —
   **não há teto de repositórios**. O que a mesma página traz, e o ADR não previa, são dois
   limites que importam com 30 repos: **1 job concorrente por organização** e **agendamento a
   cada 4 horas** no plano gratuito. Com três orgs, a fila é serial **dentro de cada uma**. Há
   porta aberta sem pagar: o plano **Community (OSS) Cloud** (2 jobs concorrentes) é
   solicitável para projetos sob licença aprovada pela OSI — o que a decisão 4 (repositório
   público) torna plausível, e o que falta é **conferir a licença dos repositórios** e pedir.

### Publicar em `1.0.0` desde o primeiro dia

Não por maturidade, por semver: **o auto-merge recusa `minor` em versão `0.x`**, porque ali o
`minor` é tratado como quebra. Um kit em `0.x` transforma cada adição de componente em 30 PRs
de revisão manual — o que a automação existe para evitar. O primeiro `publish` é `1.0.0`.

### As três organizações: o que cruza e o que não cruza

| mecanismo | cruza organização? |
|---|---|
| segredo de organização | **não** |
| workflow reutilizável no repo `.github` da org | **não** — e workflows no `.github` de org **não são herdados** nem pelos repos da própria org |
| instalação de GitHub App | **não** — precisa ser instalada em **cada** org |
| ruleset | **não** — é por **repositório** |
| pacote npm público | **sim** |
| preset de Renovate em repositório **público** | **sim** |
| workflow reutilizável em repositório **público**, chamado por `uses:` | **sim** |

Disso decorre onde cada peça mora:

- **O kit e os workflows reutilizáveis moram em `colabhd`, em repositórios públicos**,
  consumidos pelas outras duas orgs por `uses:
  colabhd/<repo>/.github/workflows/<arquivo>.yml@v1` e por `@colabhd/site-kit`. `colabhd` é a
  org da plataforma — é onde o `devops` já está.
- **Não no `colabhd/.github`.** Ele contém hoje **apenas o `sync-readme`**; não há workflow
  reutilizável, dependabot compartilhado nem template — e, ainda que houvesse, nada ali seria
  herdado. É a armadilha mais fácil de cair.
- **Segredo é triplicado por construção.** Não há como evitar; há como reduzir o que o segredo
  pode fazer (abaixo).
- **Ruleset é por repositório**: a aplicação vira script `gh` idempotente sobre a lista de
  repositórios, não configuração de interface. O **conteúdo** de cada ruleset não é decidido
  aqui: são as duas variantes do [ADR-046](/decisoes/classe-leve-para-sites-de-divulgacao/) —
  site de grupo e repositório de plataforma —, e o script lê a classe no `sites.yaml`. Nomear
  `Protect main` como perfil único faria o script desfazer, a cada execução, a decisão do 046.

:::caution[`site-odr` é privado, e isso colide com duas coisas]
Repositório **privado no plano Free não aceita ruleset nem branch protection** — a API devolve
403 — e ainda gasta da cota de 2.000 min/mês de Actions da org. Ou ele vira público (decisão 4)
ou fica **fora** desta plataforma.
:::

### Renovate com preset central, não 30 cópias de `dependabot.yml`

O `dependabot.yml` do `site-cpps` tem **60 linhas** e o workflow de auto-merge tem **107**.
Replicar isso é 30 cópias de 167 linhas que derivam a cada edição — a mesma deriva que já se vê
entre `site-cpps` e `site-redalint`.

A decisão é **Renovate com preset compartilhado** num repositório público de `colabhd`, e em
cada site apenas `{"extends": ["colabhd/renovate-config"]}`. Preset público cruza organização,
o agrupamento por ecossistema reduz o número de PRs, e a política de auto-merge passa a ser
editada **num lugar**.

### O token `Pages:Edit` é de conta, e não é escopável por projeto

Um token com escopo `Pages:Edit` alcança **todos** os projetos da conta Cloudflare. Com N
repositórios, cada repositório que guarda esse token pode apagar o projeto de qualquer outro
grupo. Num monorepo o problema não some, mas tem uma superfície só; aqui são 30.

Mitigação em três camadas, na ordem em que reduzem risco:

1. **Uma conta Cloudflare, e o número de contas é decisão do
   [ADR-041](/decisoes/sites-na-cloudflare-pages-direct-upload/)**, que é quem decide
   hospedagem. Este ADR **não** abre uma conta por organização: isso multiplicaria o teto de 100
   projetos, mas também multiplicaria zona, assento de Zero Trust e o lugar onde se procura um
   deploy, com duas pessoas. O gatilho de lotação é o do ADR-041, e vale por conta.
2. **O token é segredo de organização**, nunca de repositório, e só é lido por workflow
   reutilizável de `colabhd` sob um `environment` com revisor obrigatório.
3. **Nenhum projeto novo nasce com integração Git.** Todo site de grupo é Direct Upload, pelo
   ADR-041 — a integração Git deixa de ser exceção a considerar e passa a ser estado herdado a
   corrigir.

:::caution[A escolha entre integração Git e Direct Upload é irreversível por projeto, nos dois sentidos]
Errar exige **recriar o projeto** com outro nome e refazer DNS; quem decide o modo é o ADR-041.
O `site-redalint` **não está do lado errado dessa escolha — ele não está nela**: não tem projeto
na Cloudflare Pages, e publica por GitHub Pages (`status: null`, nunca construído). Para ele o
trabalho é **criar** o projeto como Direct Upload, não recriar. O molde já existe na casa: o
`devops` publica o próprio site por Cloudflare Pages com `cloudflare/wrangler-action@v3` em
`.github/workflows/website.yaml`.
:::

### O que fazer com a frota que já existe

| classe | repositórios | ação |
|---|---|---|
| **piloto** | `cpps-unesp/site-cpps` | extrai o kit; é a fonte dos componentes. **74% do schema já é genérico** (250 de 338 campos). A correção do `AGENTS.md` — que afirma não haver proteção na `main` e **está errado** — é item datado do [ADR-046](/decisoes/classe-leve-para-sites-de-divulgacao/), com dono |
| **converge** | `colabhd/site-redalint`, `lab-ippri-unesp/site-lab` | **stack medida em 22/09**: a mesma do `site-cpps`, em versões mais antigas (`astro-pagefind` ^1.8.3, `theme-change` ^2.5.0, `@astrojs/mdx` ^5.0.0 nos dois). Adotam o kit, o preset de Renovate e o ruleset da classe. No `site-redalint`, corrigir o `ci.yml` que nunca roda na `main` e **criar** o projeto na Pages como Direct Upload. Do `site-lab` **não** foram medidos deploy nem ruleset — verificaria com `gh api repos/lab-ippri-unesp/site-lab/pages` e `.../rulesets` |
| **colide com decisão** | `lab-ippri-unesp/site-odr` (privado) | vira público ou sai da plataforma |
| **outra stack, e quebrado** | `cpps-unesp/site-nefits` (Astro 7 + React + Bootstrap) | congelar e reconstruir sobre o kit. O CNAME pendurado **não** é "um 404 que não piora": é registro em domínio da UNESP apontando para um nome de conta livre no GitHub. Quem decide removê-lo, e quando, é o ADR-041 |
| **a inventariar** | `cpps-unesp/site-nepps` (66 MB, público) | apareceu na varredura de 22/09 e não estava em nenhum plano. Ler `package.json`, deploy e ruleset antes de classificar |
| **nasce do kit** | `site-gedai`, `site-lantri`, `site-nefa` (privados, `size` 0 desde 11/06/2026), `colabhd/site-colabhd` (vazio) | não há migração: são os primeiros a usar o `create`, e provam que ele basta. Sendo privados, os três colidem com a decisão 4 antes mesmo de existir conteúdo |

## Alternativas rejeitadas

**Monorepo com todos os sites.** É a alternativa mais forte, e o argumento a favor é grande:
**um** `package.json`, **um** lockfile, **um** `dependabot.yml`, um CI — o volume inteiro vira o
de um repositório só, isto é, da ordem de **9 a 32 PRs/mês** conforme a cadência, contra os 300
a 970 de trinta; o kit não precisa existir como pacote (é uma pasta, e as três armadilhas
somem), a deriva de versões fica impossível por construção, e Turborepo/pnpm workspaces com
build afetado resolvem o CI. A medição de 23/09/2026 **não muda o sinal** desse argumento — ele
continua sendo um salto de 30× —, mas muda o tamanho do prêmio que se estava anunciando. Para
duas pessoas, é o que menos trabalho dá **enquanto ninguém sai**.

Rejeitada por três razões, na ordem do peso:

1. **A saída de um grupo.** Grupos de pesquisa têm autonomia institucional; num monorepo, levar
   o site é cirurgia de histórico e negociação sobre o que vai junto. É o raciocínio do
   [ADR-015](/decisoes/dominios-por-natureza/): identidade institucional pesa mais que simetria
   de layout.
2. **Permissão.** Um colaborador de um grupo não pode ter commit no site dos outros 29, e o
   GitHub não dá permissão por pasta.
3. **Coerência com o TinaCMS self-hospedado.** Um projeto do TinaCloud equivale a um
   repositório, e o plano Team custa **US$ 24 por projeto por mês** (30 sites = US$ 720/mês).
   Self-hospedar já assume que a granularidade é o repositório.

**Template repository com sincronização.** Nasce certo e deriva em seguida: `site-cpps` e
`site-redalint` são a prova empírica disso nesta casa — mesma stack, três versões divergentes,
dois deploys. O argumento a favor é real (zero indireção, o site é legível sozinho, nada a
publicar), mas sincronização de template não tem semver, changelog nem auto-merge: é cópia com
boas intenções.

**Git submodule para o chassi.** Compartilha sem npm e sem registro. Rejeitado porque submodule
aponta para **commit**, não para faixa de versão: não há `^1.2` nem auto-merge de patch, o
Renovate teria que atualizar 30 ponteiros, e todo colaborador — professor ou bolsista, não
engenheiro de plataforma — passa a precisar de `git submodule update --init` para o `npm run
dev` funcionar. O custo cai sobre quem menos pode pagá-lo.

## Consequências

**Aceita-se** o volume de PRs de dependência, e ele agora tem faixa em vez de ponto: **da ordem
de 970/mês em 30 repos sem agrupamento, e da ordem de 300/mês com `group:allNonMajor` mais um
`schedule` semanal**, medido em bancada em 23/09/2026 (agrupamento: 13 → 7 branches sobre os
manifestos reais do `site-cpps`; taxa base: 30,9 a 37,3 PRs/mês em meses completos do
`site-cpps`). O `schedule` é decisão que ainda não foi tomada e é ela que fixa o número dentro
da faixa. Se a automação de merge falhar, a fila é impossível de revisar à mão em qualquer ponto
dessa faixa: a automação não é conforto, é pré-requisito.

**Aceita-se que a taxa observada hoje é um piso, não a demanda.** O `dependabot.yml` do
`site-cpps` tem `open-pull-requests-limit: 10`, e o pico de PRs npm abertos simultaneamente
chegou a 16 — o mês de agosto com 3 PRs não é mês calmo, é mês estrangulado, e os três são de
classe *security*, que fura o teto. Qualquer número tirado da contagem de PRs do Dependabot
**subestima** a chegada de atualizações.

**Aceita-se** uma indireção a mais: um bug de componente vira `publish` do kit mais uma onda de
PRs, em vez de um commit. O tempo entre a correção e o último site atualizado vira métrica da
plataforma.

**A promessa "sair é transferir o repositório" tem uma exceção, e ela é desta decisão, não do
runbook.** A mídia enviada pelo CMS **não** mora no repositório: o media store self-hospedado
obriga um bucket R2 ([ADR-042](/decisoes/tinacms-self-hospedado-central/)), e bucket não
acompanha `Transfer repository`. Logo a saída de um grupo é o repositório **mais** uma cópia da
mídia, e o runbook de saída do ADR-046 é quem descreve a cópia. Dizer só "transfere o
repositório" seria vender uma promessa que o desenho do CMS já furou.

**Aceita-se** três cópias de cada segredo de deploy e três instalações de qualquer GitHub App
que venha a existir; não há mecanismo no GitHub que evite isso, só disciplina de mantê-los
idênticos por script. E **aceita-se** que "a `main` está protegida" vire afirmação a
**verificar por script**, não a pressupor — o `AGENTS.md` errado do `site-cpps` mostra como ela
apodrece sozinha.

**A ordem de execução não é decidida aqui.** São oito ADRs interdependentes — o CMS depende do
`ci` verde, o kit depende da inversão de sete componentes, o agente depende do PR #540 — e a
sequência, com duas pessoas, vai no plano de execução que acompanha esta leva
(`PLANO-DE-EXECUCAO.md`, no repositório da proposta), não num ADR. O que este ADR fixa é a
dependência dura: **nada de kit antes de `npm run ci` verde no piloto**, e nada de segundo site
antes de o primeiro estar no ar pelo `create`.

**Os sites ficam fora do inventário de aplicações da casa.** A ficha obrigatória em
`website/src/data/inventario/aplicacoes.yaml` é validada por Zod strict com `sitio_dono`
restrito ao enum `franca`/`sp`, e a guarda de CI (`.github/scripts/guarda-apps.py:17`) só
indexa `apps/franca`, `apps/sp` e `apps/multi`: **um site na Cloudflare é irrepresentável
ali**. Há precedente de exclusão — as 14 fichas não incluem `devops.colabh.org` nem
`trilhas.colabh.org`. A plataforma precisa de registro próprio, em ADR à parte, e não de
gambiarra no enum.

**Sobre a Cloudflare.** O [ADR-021](/decisoes/reduzir-dependencia-cloudflare/) foi revogado em
15/08/2026 — *"a decisão vigente é a oposta: a Cloudflare fica, e é o caminho preferido de
entrada"*. A ressalva: aquilo decide **entrada**, não **hospedagem**. Dezenas de sites na Pages
é **classe de carga nova**, com tetos próprios (100 projetos/conta, 500 builds/mês, 20.000
arquivos e 25 MiB por arquivo por deploy, 100 redirects dinâmicos — o `site-cpps` já tem 34).
Este ADR não herda aquela decisão: anota os tetos como gatilho.

## Critério de revisão

1. **Volume real de PRs de dependência passar de 400/mês** na frota, medido após 90 dias com o
   preset de Renovate ativo → o monorepo volta à mesa, com o dado que hoje lhe falta. **Este
   gatilho só é coerente com `schedule` semanal no preset** (projeção de ~300/mês, 1,5× de
   folga). Sem `schedule`, a projeção é ~970/mês e o critério dispara no dia zero — o que é
   outra forma de dizer que a decisão de cadência precisa vir antes deste critério valer.
2. **A taxa de auto-merge cair abaixo de 80% das *atualizações de dependência*** — não dos PRs —
   em um mês → a automação não segura a fila; corrige-se o preset ou muda a topologia. **O
   denominador mudou em 23/09/2026, e por razão mecânica:** o agrupamento colapsa justamente os
   automergeáveis num PR só e deixa cada `major` como PR próprio, então a mesma realidade que
   hoje mede ~77% de merge por PR passaria a medir da ordem de 48% no dia seguinte à troca, sem
   que nada tivesse piorado. Medido por PR, este critério dispararia falso no primeiro mês.
3. **A conta Cloudflare passar de 70 projetos Pages** — mesmo número e mesmo gatilho do
   critério 1 do [ADR-041](/decisoes/sites-na-cloudflare-pages-direct-upload/), que é quem
   decide hospedagem; os dois reabrem juntos, e a segunda conta volta à mesa **ali**, não aqui.
4. **Nenhum grupo pedir a saída do repositório até 2027-09-22** → o benefício principal não se
   materializou em 12 meses e o custo em PRs foi pago à toa.
5. **O kit precisar de três `major` em 6 meses** → a fronteira entre kit e site está no lugar
   errado; refazer a divisão antes de adicionar sites.
6. **Surgir uma quarta organização** → revalidar a decisão de pôr kit e workflows em `colabhd`,
   e o custo de segredo por org.
