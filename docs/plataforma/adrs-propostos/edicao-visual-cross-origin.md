---
title: "ADR-043 — Edição visual com admin central e sites em domínios próprios"
description: "O cliente do Tina autentica por Bearer, não por cookie: admin em outra origem funciona com CORS. A barreira é o PreviewInner, que monta o src do iframe como caminho da origem do admin — e nenhuma rota do admin consegue emitir URL absoluta, medido em 23/09/2026. O proxy de preview fica obrigatório."
sidebar:
  order: 46
medido: "2026-09-23"
medidoCom: "leitura do PreviewInner do tinacms (src relativo do iframe, laço de 100 ms sobre contentWindow.location.href); README do @tinacms/astro 0.7.0 (PUBLIC_TINA_ADMIN_ORIGIN) e validação de event.origin no @tinacms/bridge; assinatura de GitProvider.onPut(key,value); leitura de astro.config.mjs:13-14, de public/_redirects (83 linhas, 69 regras efetivas, 34 com curinga) e de src/utils/markdown.ts e src/components/TextoComCheck.astro:35 no site-cpps; execução de npm run ci em checkout limpo; gh api repos/cpps-unesp/site-cpps/rulesets — lido em 2026-09-22. Em 2026-09-23, bancada com os pacotes instalados (tinacms 3.13.0, @tinacms/app 2.5.13, @tinacms/astro 0.7.0, react-router 6.30.6) e Chrome headless em duas origens reais (127.0.0.1:5310 × :5311): leitura de @tinacms/app/src/preview.tsx:24 e de tinacms/dist/index.js:76253-76285 e 74338-74342; execução do corpo do laço de 100 ms copiado do bundle; execução de HashRouter + navigate() + useParams com o react-router do pacote; resolvePath('/~//host/path','/'); grep -rn TINA_ADMIN_ORIGIN em tinacms/ e @tinacms/; leitura de @tinacms/astro/src/{internal/admin-origin.ts,middleware.ts} e de @tinacms/bridge/dist/index.js; curl -sSI contra cpps.franca.unesp.br e devops-website.pages.dev — ver VERIFICACOES-2026-09-23.md"
---

## Status

**Proposto** — 2026-09-22. Aguarda revisão de Rafael e Arthur.

## Contexto

A decisão 3 do parque de sites é **edição visual agora**, não depois: quem edita
é pesquisador e bolsista, não quem abre PR. Ela colide com três decisões já
travadas e com a geografia das URLs.

**As URLs não são uma só origem, e não podem ser.** Os sites nascem em três
organizações do GitHub — `colabhd`, `lab-ippri-unesp`, `cpps-unesp` — e
publicam em domínios institucionais distintos pelo critério do
[ADR-015](/decisoes/dominios-por-natureza/): `cppsunesp.org`, `labriunesp.org`,
`lab-ippriunesp.org`, `colabh.org`. Há ainda o caso fora das zonas
autoritativas: `cpps.franca.unesp.br` é da UNESP e depende de chamado. Um admin
servido "do mesmo lugar que o site" significa, por construção, **N admins**.

**Um diagnóstico errado circulou no time e precisa morrer aqui.** A versão que
andava nas conversas era: *"a sessão do Tina é cookie, cookie não cruza origem,
logo admin central é impossível"*. Está errado.

:::caution[Correção de diagnóstico]
O cliente do Tina envia `Authorization: Bearer <token>`, obtido de
`authProvider.getToken()`. **Não é cookie.** Uma API GraphQL em outra origem
funciona com CORS configurado — não há `SameSite`, não há necessidade de
subdomínio comum, não há necessidade de `credentials: include`. Qualquer plano
que tenha sido descartado com o argumento do cookie precisa ser reavaliado.
:::

**A barreira real é o preview, e a causa dela foi medida.** O `PreviewInner` do
Tina monta o `src` do iframe como **caminho da origem do admin** e lê
`contentWindow.location.href` num laço de **100 ms** para saber em que rota o site
está. Com o site em outra origem, o `src` aponta para o lugar errado e a leitura
de `location.href` é justamente a operação que a política de mesma origem
bloqueia. O formulário funciona; o painel visual é que não monta. **Por que ele
não monta ficou medido em 23/09/2026**, com os pacotes instalados e navegador de
verdade — está na seção *Medido em 2026-09-23*, no fim deste ADR.

**O que `PUBLIC_TINA_ADMIN_ORIGIN` liga não é o preview, e isto é correção de
diagnóstico.** O README do `@tinacms/astro` **0.7.0** a documenta para
*"cross-origin admin deployments (Codespaces, separate-domain self-hosted)"*, e
medimos o que ela alcança: é lida **só** pelo `@tinacms/astro`, do lado do
*site* (`src/internal/admin-origin.ts`), e seu único consumidor é o
`bridgeScript()` do `src/middleware.ts`, que a injeta como
`init({adminOrigin:[…]})`. Ela liga **uma coisa**: a allowlist de `event.origin`
do `@tinacms/bridge` — que de fato valida origem **e** `event.source`, e nunca
usa `targetOrigin` curinga. O `tinacms` não a lê em lugar nenhum
(`grep -rn TINA_ADMIN_ORIGIN tinacms/` não retorna nada). Ou seja: o canal entre
admin e site já é cross-origin por desenho e já é validado, e **isso continua
verdadeiro**. O que a variável não faz — e nunca fez — é o preview aceitar URL
absoluta.

## Decisão

**Um admin central, e o site do preview servido por um caminho da própria origem
do admin.**

### 1. Um admin, em `cms.colabh.org`

Contêiner próprio do TinaCMS (decisão 2), atrás do **`oauth2-proxy` v7.6.0 com o
Authentik como IdP** — o porteiro e o hostname são decididos no
[ADR-042](/decisoes/tinacms-self-hospedado-central/), e este ADR usa o nome de lá:
**uma origem só para a mesma aplicação**. Não há alias `edita.`, e não há bundle
de admin dentro de cada site. Quem entrega a identidade ao `authProvider` de
backend é o proxy, não o navegador.

### 2. O preview é servido pelo proxy do próprio admin

O admin expõe `cms.colabh.org/preview/<slug>/…` e busca o conteúdo da origem
publicada daquele site. Do ponto de vista do navegador o iframe é **same-origin**:
o `src` relativo do `PreviewInner` resolve, e a leitura de
`contentWindow.location.href` a cada 100 ms para de lançar.

:::note[Esta é a peça que amarra a decisão 2 à decisão 3, e a medição a confirmou]
Um proxy de preview é um caminho HTTP no servidor do admin. Com o contêiner
próprio isso é configuração. Com TinaCloud não é possível — o admin é servido
por eles, e não há onde pendurar `/preview/`. **A escolha do self-hosted é o que
destrava a edição visual cross-origin**, e não apenas os US$ 24 por projeto por
mês que ela evita.

A bancada de 23/09/2026 chegou a levantar a hipótese de dispensar o proxy — um
`ui.router` protocolo-relativo (`//host/path`) sobrevive ao `matchPath` e ao hash
do `HashRouter` — e a hipótese **caiu na auditoria**: o `navigate()` do
react-router 6.30.6, por onde passa toda navegação de dentro do admin, colapsa a
barra dupla em `resolvePath`, e o iframe termina em `/host/path` na origem do
admin, 404. **O item 2 não é otimização; é a peça.**
:::

### 3. `PUBLIC_TINA_ADMIN_ORIGIN` no build de cada site

Cada site carrega a origem do admin na variável documentada pelo
`@tinacms/astro` 0.7.0. É o que atende o segundo modo de entrada — a pessoa está
no site publicado e clica para editar — e é a peça que evita reescrever o cliente.

**O que ela liga, exatamente, está medido (23/09/2026): a allowlist de
`event.origin` do `@tinacms/bridge`, e só.** Ela não toca no iframe do preview.
Escrever o item 3 como se ela resolvesse o preview foi o erro de diagnóstico que
a medição corrigiu — mas o item continua necessário, porque sem ele o bridge
recusa as mensagens do site e o segundo modo de entrada não existe.

### 4. A lista de origens do `postMessage` é gerada, nunca digitada

O `@tinacms/bridge` só aceita `event.origin` presente na lista configurada.
Manter essa lista à mão com dezenas de sites e duas pessoas é onde a coisa
apodrece.

A lista sai do **registro que já define a frota**: o `sites.yaml` do
[ADR-046](/decisoes/classe-leve-para-sites-de-divulgacao/), que mora no
`colabhd/devops` e tem `slug`, `org`, `repo` e `hostname`. **Não se cria um
segundo inventário no repositório do admin** — o argumento do ADR-046 contra
estender o `aplicacoes.yaml` ("duas listas divergem") vale inteiro aqui.

O mecanismo: a imagem do admin recebe o `sites.yaml` no build, a partir do
`devops`, e a lista de origens é gerada dele. O que falha quando isso atrasa é
delimitado e barato: **um site novo não aparece na lista de origens até o próximo
build do contêiner**, e o efeito é a edição visual daquele site não montar —
nunca um site fora do ar. Enquanto o preview for servido pelo proxy, a lista tem
na prática **uma entrada** (a própria origem do admin), e o campo multiorigem só é
exercitado no modo do item 3 — o que a medição de 23/09/2026 confirma, ao
confirmar que o proxy fica.

**E o `sites.yaml` passa a ser entrada de confiança do admin.** O valor que sai
dele alimenta a allowlist de `postMessage` de uma página autenticada. Um
`hostname` errado ou adulterado não gera só um preview quebrado: gera uma origem
a mais que o admin passa a aceitar como interlocutora. O ponto onde a imagem do
admin consome o `sites.yaml` **valida o formato** — host da lista de zonas da
casa, sem esquema, sem `@`, sem barra — e recusa a linha que não passar, em vez
de gerar a lista com ela.

### 5. O que esta decisão proíbe

**O admin não vira rota do Astro.** `TinaNodeBackend` é handler Node `(req,res)`
e roda como serviço separado. Pôr `output: 'server'` + `@astrojs/node` num site
quebra o deploy — a Pages publica `dist`, e com adapter a saída vira
`dist/client` + `dist/server` — e invalida o `public/_redirects`, que é sintaxe
proprietária da Pages: **83 linhas, 69 regras efetivas, 34 delas com curinga**,
contadas em 22/09. A raiz `/` iria a 404, porque não existe
`src/pages/index.astro`. Sete das nove rotas já são `prerender`. O arquivo
`docs/deploy-e-redirects.md` registra que o time **já saiu de SSR por esta mesma
quebra**; não voltamos.

:::caution[Um conflito novo entre este item e o modo estático, achado em 23/09/2026]
O item 5 proíbe adapter, e com razão. Mas a leitura do `@tinacms/astro` 0.7.0
feita na mesma bancada mostra que o wiring do lado do site **pressupõe** um:
o `middleware.ts` desiste logo no começo quando a rota é pré-renderizada
(`if (context.isPrerendered) { locals.tinaEdit = false; return next() }`,
linhas 17-20) e **não injeta bridge nenhum**; o bootstrap sobra para o
`<TinaIsland>`, cujo priming busca `/tina-island/[name]`, rota que o README do
pacote declara `prerender: false` — ou seja, on-demand, ou seja, adapter.

Isto **não** reabre o item 5: pôr adapter no site quebra o deploy da Pages, e
esse é fato medido do [ADR-041](/decisoes/sites-na-cloudflare-pages-direct-upload/).
O que fica registrado é a lacuna: **não sabemos ainda como o site estático
entrega o bridge ao admin**, e a bancada não mediu o fluxo de formulários ponta a
ponta (priming das ilhas, `forms:add`, `updateData`) porque o worktree em que ela
rodou era justamente o `output: 'server'` proibido. Medir isso com um build
`output: 'static'` servido na segunda origem é o **primeiro** trabalho antes de
prometer o modo visual a qualquer grupo — ver a seção de medição abaixo.
:::

### 6. A sanitização do rich-text, que é portão e é decidida aqui

O caminho `textarea → marked sem sanitização → set:html` existe hoje
(`src/utils/markdown.ts`, `src/components/TextoComCheck.astro:35`). É o único
defeito desta série explorável por terceiro, e é **esta** decisão que multiplica
quem pode escrevê-lo, de duas pessoas para dezenas, num repositório público com
commit no save. Nenhum outro ADR da leva decide a peça; ela fica aqui.

- **Pipeline:** `marked` continua fazendo markdown → HTML, e a saída passa por
  **`rehype-sanitize` com allowlist explícita** antes do `set:html`. Sanitizar o
  HTML de saída, e não a entrada: o editor pode digitar o que quiser, e o que não
  passa no allowlist simplesmente não sai na página.
- **Allowlist:** `p`, `br`, `strong`, `em`, `ul`/`ol`/`li`, `h2`–`h4`, `a`
  (só `href` com esquema `https:`, `mailto:` ou caminho relativo, mais `rel` e
  `target` que nós mesmos acrescentamos), `code` e `blockquote`. Sem `img` — a
  imagem entra por campo próprio, validado pelo media store —, sem `script`, sem
  `style`, sem `iframe`, sem atributo `on*`.
- **O `set:html` sobrevive**, porque depois do sanitizador ele deixa de ser o
  ponto perigoso; o que muda é que **nenhum componente chama `set:html` sobre
  string que não veio do pipeline**. Regra verificável por `grep` no gate: todo
  `set:html` do repositório recebe o retorno da função única de render.
- **Os marcadores próprios do [ADR-045](/decisoes/i18n-field-based-com-fallback/)
  continuam funcionando, porque não atravessam o sanitizador.** A quebra de linha
  codificada e o `<Destaque texto="…" />` são resolvidos **antes**, no parse de
  `src/lib/tina/pages.ts`, e viram componente Astro — não HTML no meio da string.
  O `texto` do `Destaque` é **conteúdo textual**, interpolado como texto, nunca
  como markup. Se algum dia um marcador precisar virar HTML, ele entra no
  allowlist por nome, não por exceção.
- **Quando:** antes do primeiro save de alguém de fora da equipe central. É
  portão de entrada do primeiro site no admin, e a ausência de decisão escrita
  para ele era, até este ADR, a maior lacuna da série.

## Alternativas rejeitadas

**Abrir mão da edição visual e ficar no formulário.** O argumento a favor é o
mais forte de todos: o modo formulário do Tina já funciona cross-origin **hoje**,
com Bearer e CORS, sem proxy, sem lista de origens e sem o experimento pendente
da seção seguinte. Seria entregável esta semana. Rejeitada porque a decisão 3 é
travada e porque o público-alvo — quem escreve o conteúdo dos grupos — é
exatamente quem não edita bem em formulário de campos aninhados; o schema do CPPS
tem 338 campos, dos quais 12% são stubs colapsáveis de `titulo`/`descricao`.

**Um admin servido de dentro de cada site (N bundles).** A favor: same-origin de
graça, proxy nenhum, lista de origens nenhuma, `PUBLIC_TINA_ADMIN_ORIGIN`
desnecessária. É a topologia que o Tina assume por padrão. Rejeitada pela deriva
**já medida** entre dois sites que deveriam ser iguais: `site-cpps` e
`site-redalint` têm a mesma stack em versões divergentes (`astro-pagefind` 1.8
vs 2.0, `theme-change` 2.5 vs 3.0, `@astrojs/mdx` 5 vs 6) e deploys diferentes
(GitHub Pages vs Cloudflare Pages). N cópias do admin derivariam do mesmo jeito,
e a equipe central tem **duas pessoas**. O custo de atualizar N bundles **não** é
mais de cota: com Direct Upload ([ADR-041](/decisoes/sites-na-cloudflare-pages-direct-upload/))
a Pages não compila nada, e os 500 builds/mês da integração Git deixam de morder.
O que sobra é N execuções de Actions e **N PRs de atualização** a cada release do
admin, revisados pelas mesmas duas pessoas — que é o custo que este ADR recusa.

**Reusar a rota bearer/PKCE do [ADR-032](/decisoes/conector-mcp-oauth-authentik/).**
A favor: é a única fachada OAuth que a casa já escreveu e já opera, e resolveria
o SSO do admin sem desenho novo. Rejeitada porque aquele ADR resolve um problema
que aqui não existe — **registro dinâmico anônimo de cliente MCP** (RFC 7591) com
`redirect_uri` de loopback em porta sorteada. O `authProvider` do Tina já entrega
Bearer e tem `redirect_uri` fixa. Acrescentar a fachada seria um salto a mais no
caminho de autenticação sem tocar na barreira real, que é o iframe. O Authentik
continua sendo o IdP do admin — por cliente OIDC comum atrás do `oauth2-proxy`
(ADR-042), não pela fachada.

## Consequências

**Aceita-se que o proxy de preview vira caminho de produção.** Se o admin cai,
ninguém edita. Nenhum **site** cai junto: os sites são estáticos na Pages e não
dependem do admin para servir. O modo de falha é "edição indisponível", não
"site fora".

**Aceita-se banda e latência não medidas.** O proxy passa a carregar o HTML e os
assets do site durante a edição. Não medimos o custo; a mídia do `site-cpps` hoje
são **141 MB em 281 arquivos**, e a maior parte disso não é tocada pelo preview
de uma página. Ver a seção de revisão.

**Aceita-se que o rascunho é público no instante do save.** Repositório público
(decisão 4) mais CMS central significa que `IsomorphicBridge.put()` commita por
arquivo gravado. **Não há embargo possível.** Quem precisa de rascunho fechado
não cabe neste desenho — é a decisão 4 que teria de mudar, não esta.

**A identidade única nos commits é tolerada só até a promoção, e o gatilho é o do
ADR-042.** `GitProvider.onPut(key, value)` não recebe usuário: sem um wrapper com
`AsyncLocalStorage` amarrando a sessão do Authentik à gravação, todos os commits
saem com uma identidade só, em **conflito aberto** com `diretrizes/iam.md`. O
critério 1 do [ADR-042](/decisoes/tinacms-self-hospedado-central/) é quem manda
**parar a promoção** se o wrapper não fechar; este ADR não define gatilho próprio,
mais frouxo, para o mesmo descumprimento.

**Aceita-se que o preview é sempre em `pt`.** O i18n é field-based: pt/en/es por
campo no mesmo documento, **51 campos localizados em 235 instâncias**, sem
fallback para `pt`. Campo vazio em `en`/`es` renderiza vazio, e o preview do
admin mostra sempre o português. Editar as traduções segue sendo trabalho às
cegas até isso mudar.

**A superfície de XSS armazenado passa a ter mais gente, e por isso o item 6 da
Decisão existe.** Dar edição a dezenas de pessoas sem sanitizar seria ampliar a
superfície de propósito; o pipeline com `rehype-sanitize` e allowlist é portão de
entrada do primeiro site no admin, não item de backlog, e é aqui que ele está
decidido — não em ADR futuro.

**O admin precisa de credencial em cada uma das três orgs.** Segredo de
organização não cruza org e um GitHub App precisa ser instalado em **cada** uma.
São três instalações e três conjuntos de permissão para manter.

**A mídia não vem de graça.** `media.tina` lança `E_SELF_HOSTED_MEDIA` fora da
TinaCloud; exige `loadCustomStore` + `createMediaHandler`, com destino **R2 desde
o dia um** — decidido no [ADR-042](/decisoes/tinacms-self-hospedado-central/), e
não por cota da Pages. É trabalho próprio do admin, não configuração, e tem a
consequência que o ADR-040 registra: a mídia não acompanha o `Transfer
repository`.

**A CI do site precisa ser consertada antes.** `npm run ci` falha em checkout
limpo: `tsc` roda antes de `tinacms build` e `tina/__generated__` é gitignorado
(TS2307 em `src/lib/tina/pages.ts:8`); e `tinacms build` sem `--local` e sem
credenciais lança *"Client not configured properly. Missing clientId, token"*. O
ruleset **"Protect main"** de `cpps-unesp/site-cpps` exige o check `ci`, então
hoje nada entra. (O `AGENTS.md` do repo afirma que não há ruleset; está errado.)

**O admin é aplicação, e entra pelo caminho da casa.** Ele roda em k8s, tem dado
de usuário e SSO, então passa pelas etapas 0–7 de
`frentes/aplicacoes-servicos/novo-app.md` e ganha ficha em
`website/src/data/inventario/aplicacoes.yaml`. Diferente dos **sites**, que ficam
na Cloudflare e são literalmente irrepresentáveis naquele schema (`sitio_dono`
restrito ao enum `franca`/`sp`), o admin é representável. Restrições vigentes de
2026-09-19 valem: nada novo em `vm-cpps-02` nem em `k3s-franca-05`.

## Medido em 2026-09-23: o experimento foi feito, e o proxy fica

O experimento que esta seção prometia foi executado em **23/09/2026**, em duas
origens reais (Chrome headless, `127.0.0.1:5310` servindo o admin e `:5311`
servindo o site), com os pacotes instalados — `tinacms` 3.13.0, `@tinacms/app`
2.5.13, `@tinacms/astro` 0.7.0, `react-router` 6.30.6 — e com o corpo do laço
copiado byte a byte do bundle. Foi feito duas vezes: uma bancada e uma auditoria
independente que reproduziu a saída e derrubou a conclusão da primeira.

**O `src` não sai absoluto, e não há rota do admin que o faça sair.** Não existe
concatenação com `window.location.origin` nem com `basePath`:
`@tinacms/app/src/preview.tsx:24` faz `src={props.url}` e nada mais, e quem
relativiza é o `PreviewInner` (`tinacms/dist/index.js:76256`), com
``url = `/${params["*"]}` ``. URL absoluta com esquema quebra — `ui.router`
devolvendo `https://cppsunesp.org/x` chega ao iframe como `/https://cppsunesp.org/x`,
caminho 404 na origem do admin. A hipótese de contornar por URL
**protocolo-relativa** (`//host/path`) chegou a passar no `matchPath` e no hash do
`HashRouter`, e **caiu na auditoria**: toda navegação de dentro do admin passa por
`handleNavigate` → `useNavigate` → `resolveTo` → `resolvePath`, e o
`resolvePath` do react-router 6.30.6 **come o segmento vazio** —
`resolvePath('/~//host/path','/')` devolve `{"pathname":"/~/host/path"}`, medido.
O iframe termina em `http://<admin>/host/path`: mesmo 404. O `//` só sobrevive em
hash colada à mão, que é inalcançável por dentro do admin.

**O laço de 100 ms lança, mas não mata.** Ele lê `contentWindow.location.href`
**sem try/catch** (`dist/index.js:76271`), e a guarda que tem
(`url2.origin === "null"`) serve a `about:blank`, não a cross-origin. Em duas
origens ele lança `SecurityError` **em todo tick** — 15 ticks, 15 exceções não
capturadas, medido, e reproduzido na auditoria com a mesma saída. Mas o
`setInterval` sobrevive ao throw (um laço nu, sem captura nenhuma, completou os
mesmos 15 ticks) e a árvore React não cai, porque o erro nasce num timer e não num
render. O efeito é cirúrgico: `reportedURL` fica `null` para sempre, então morre a
sincronia **iframe→admin** — o admin deixa de seguir a navegação feita dentro do
preview. A sincronia **admin→iframe** continua, porque passa por `setURL`, que não
toca em `location.href`. O `setInterval` nunca é limpo (`useEffect` sem cleanup),
então o ruído se acumula por sessão de edição: um `try/catch` de três linhas
upstream tornaria o modo degradado silencioso, e é o PR mínimo a mandar ao
`tinacms`.

**O canal do bridge atravessa a fronteira intacto.** Com duas origens reais, a
mensagem do site chega ao admin com `trusted=true` e o `postMessage` do admin
para o iframe com `targetOrigin` estrito passa. O `graphql-reducer.ts:210` deriva
o `expectedOrigin` da própria `url` do preview, valida inbound por origin **mais**
`event.source === iframe.contentWindow`, e `grep -n postMessage` no bundle do
`tinacms` não retorna **nenhum** canal paralelo com curinga. O admin já foi
escrito para o caso cross-origin — `@tinacms/app/src/lib/preview-origin.ts`
documenta em docstring que *"absolute URLs keep their own origin"* e traz teste
publicado no pacote. O que falta não é o canal: é o `src`.

:::caution[Aplicando o critério que esta seção definia: o proxy fica]
O critério era *"se (1) sair absoluto **e** (2) não impedir o bridge de
sincronizar, o proxy é dispensável"*. O resultado medido é que **(1) não sai
absoluto por nenhuma rota que o admin possa tomar**. A decisão continua com os
seis itens; o item 2 não vira otimização. E a causa muda de nome no texto: não é
`PUBLIC_TINA_ADMIN_ORIGIN` que falha em relativizar — ela nunca teve esse papel —,
é o `resolvePath` do react-router somado ao ``url = `/${params["*"]}` `` do
`PreviewInner`.
:::

**Efeito colateral medido na mesma corrida, e que este ADR precisa registrar:** os
sites saem hoje **sem `X-Frame-Options` e sem `frame-ancestors`** — medido com
`curl -sSI` contra `cpps.franca.unesp.br` e contra `devops-website.pages.dev`. O
iframe do editor funciona porque **não há política**, não porque alguém a
configurou. Se a casa adotar CSP (ver o ADR-044), `frame-ancestors` terá de listar
explicitamente `cms.colabh.org`, senão a edição visual cai no mesmo dia. Isso é
requisito deste ADR, não só daquele.

### O que continua sem verificação

1. **O fluxo de formulários ponta a ponta** — priming das ilhas, `forms:add`,
   `updateData` — **não foi medido**. Medimos o transporte, não a carga. E há
   motivo para desconfiar: a bancada rodou sobre o worktree `output: 'server'` +
   `@astrojs/node`, que é exatamente a configuração que o item 5 proíbe. Em
   `output: 'static'` o middleware do `@tinacms/astro` desiste em
   `context.isPrerendered` e não injeta bridge, e o `<TinaIsland>` depende de
   `/tina-island/[name]`, rota `prerender: false`. **Medir com um build
   `output: 'static'` do `site-cpps` servido na segunda origem é o primeiro
   trabalho**, e até que ele feche não se promete modo visual a grupo nenhum.
2. **O proxy sob `/preview/<slug>/`** continua sem medição: não sabemos se ele
   quebra os caminhos relativos do site (assets, `_redirects`, links internos). O
   `site-cpps` já usa **34 dos 100 redirects dinâmicos** permitidos por projeto na
   Pages. Mede-se contando 404 de asset numa navegação completa pelo preview.
3. **`GETTING_STARTED.md` não existe no pacote publicado** do `@tinacms/astro`
   0.7.0, embora o README o referencie duas vezes (o `files` do `package.json` só
   publica `package.json`, `src` e `dist`). Qualquer wiring que dependa daquele
   documento está apoiado no vazio, e o que temos é leitura do `src` publicado.

## Critério de revisão

1. **Cumprido em 23/09/2026, e o resultado foi manter o proxy.** O experimento
   devolveu (1) **não absoluto** — nenhuma rota do admin emite URL absoluta,
   porque `resolvePath` colapsa a forma protocolo-relativa — e (2) o bridge
   sincroniza, mas o laço de 100 ms perde a sincronia iframe→admin lançando a cada
   tick. O critério que substitui este: **upstream passar a montar o `src` com
   origem, ou o `handleNavigate` parar de normalizar o splat** → repetir o
   experimento e, se passar, remover o proxy.
2. **O `tinacms` publicar versão cujo changelog mencione URL absoluta no preview,
   ou aceitar o `try/catch` no laço de 100 ms** → repetir o experimento e, se
   passar, remover o proxy. (Atenção ao pacote certo: a variável do
   `@tinacms/astro` não governa esta peça; quem monta o `src` é o `tinacms`.)
3. **Um segundo grupo, além do CPPS, pedir embargo de rascunho** → repositório
   público + commit por save não atende; reabre a decisão 4 para aquele site, ou
   ele fica fora do admin central.
4. **O `AsyncLocalStorage` no `GitProvider` não estiver de pé quando o terceiro
   site entrar** → parar a entrada de novos sites até a trilha por usuário
   existir, porque aí o descumprimento de `iam.md` deixa de ser piloto.
5. **Data:** em **2026-12-22**, se nenhum site além do `site-cpps` estiver
   editando pelo admin central, reabrir — o custo do desenho central só se paga
   com N.
6. **O fluxo de formulários não fechar em `output: 'static'`** até o mesmo
   **2026-12-22** — isto é, se a medição pendente do item 1 da seção *O que
   continua sem verificação* mostrar que o bridge não é entregue sem adapter →
   a edição visual neste parque depende de uma peça que a decisão 5 proíbe, e o
   que se reabre é **esta** decisão, não a do ADR-041: ou o proxy também serve o
   bootstrap, ou cai-se no modo formulário do item 6 abaixo.
7. **Plano B, com data:** se em **2026-12-22** as sete peças do ADR-042 não
   estiverem de pé e o admin não existir como serviço, cai-se no **modo
   formulário cross-origin** — que já funciona hoje, com Bearer e CORS, sem proxy
   e sem lista de origens — como entrega intermediária, e a edição visual vira
   segunda fase. A decisão 3 continua travada; o que se adia é a forma, não o
   objetivo. Sem este gatilho, "edição visual agora" vira espera indefinida.
