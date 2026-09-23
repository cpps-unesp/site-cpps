---
title: "ADR-042 — TinaCMS self-hospedado central desde o início, um serviço para todos os sites"
description: "No TinaCloud um projeto equivale a um repositório, o que dá cerca de US$ 720/mês com 30 sites. A decisão é um contêiner self-hospedado único, multi-tenant, atrás de oauth2-proxy — sete peças sem scaffold oficial, medidas em bancada em 23/09/2026, e uma delas é a trilha por usuário que o iam.md exige."
sidebar:
  order: 45
medido: "2026-09-23"
medidoCom: "leitura do abort de self-host para astro em @tinacms/cli/dist/index.js:7693-7699; execução de npm run ci em checkout limpo da branch feat/tinacms-visual-editing do cpps-unesp/site-cpps; leitura do README do @tinacms/astro 0.7.0 (PUBLIC_TINA_ADMIN_ORIGIN) e da validação de event.origin no @tinacms/bridge; assinatura de GitProvider.onPut(key,value); contagem de campos do schema do site-cpps (338 campos, 250 genéricos) e dos campos localizados (51 campos, 235 instâncias); tamanho da mídia do site-cpps (141 MB em 281 arquivos); gh api do ruleset Protect main em cpps-unesp/site-cpps; páginas de preço do TinaCloud, de limites do Cloudflare Pages/R2/Zero Trust e de Actions no GitHub Free, lidas em 2026-09-22. Em 2026-09-23, bancada com @tinacms/graphql 2.4.11, @tinacms/datalayer 2.0.29 e memory-level 1.0.0: leitura de createDatabase (dist/index.js:6674), de initLevel (sublevels _content/_metadata/_appData) e de Database.put; duas Database no mesmo processo Node sobre o MESMO level físico, com e sem namespace, com e sem collection detached; TinaNodeBackend real servindo dois tenants em 127.0.0.1:5340-5341, com PUT cross-tenant por HTTP antes e depois do authProvider próprio — ver VERIFICACOES-2026-09-23.md"
---

## Status

**Proposto** — 2026-09-22. Aguarda revisão de Rafael e Arthur.

## Contexto

O parque de sites que está sendo montado tem forma decidida: **dezenas de sites**, identidade
visual própria por grupo, **um repositório público por site** (não monorepo), **edição visual
agora**, e **equipe central de duas pessoas** — Rafael e Arthur. Os repositórios estão espalhados
por **três organizações do GitHub**, todas no plano Free: `colabhd`, `lab-ippri-unesp` e
`cpps-unesp`.

O CMS escolhido é o TinaCMS, e ele tem dois modos de operar. A pergunta deste ADR é só qual dos
dois, e quando.

### A conta que decide

O TinaCloud cobra **por projeto**, e **projeto equivale a repositório**. Como a decisão de N
repositórios já está tomada, a multiplicação é direta:

| plano | preço | projetos | usuários | SSO |
|---|---|---|---|---|
| Free | US$ 0 | **1** | 2 | não |
| Team | **US$ 24 / projeto / mês** | 1 por assinatura | — | não |
| Enterprise | sob consulta | — | — | sim |

Com 30 sites, o Team dá **cerca de US$ 720 por mês**, indexado ao número de grupos atendidos — e o
número de grupos é justamente o que se quer que cresça. O Free não serve porque dá 1 projeto e 2
usuários, e 2 usuários é a equipe central inteira, sem sobrar assento para nenhum editor de grupo.
O SSO, que o `diretrizes/iam.md` exige, só existe no Enterprise.

### O que o self-host custa em troca

Custa código que **não tem scaffold**. O comando `tinacms init backend` **aborta** para a
combinação framework `astro` + self-host — o abort está em
`@tinacms/cli/dist/index.js:7693-7699`. Não há gerador oficial, e não há nenhuma peça de backend
na branch `feat/tinacms-visual-editing` do `site-cpps` hoje: o que existe é o lado do cliente.

### O bloqueador que vem antes de tudo

`npm run ci` **falha em checkout limpo** do `site-cpps`, por **duas causas independentes**:

1. **Ordem.** O `tsc` roda antes do `tinacms build`, e `tina/__generated__` é gitignorado — o
   compilador não acha o módulo gerado e quebra com **TS2307 em `src/lib/tina/pages.ts:8`**.
2. **Credencial.** `tinacms build` sem `--local` e sem credenciais lança
   `Client not configured properly. Missing clientId, token` — ele tenta falar com o TinaCloud.

Isso não é detalhe de CI: `cpps-unesp/site-cpps` tem ruleset **ativo** chamado `Protect main`
exigindo PR, 1 aprovação, `non_fast_forward` e o check **`ci`** obrigatório. Enquanto o `ci` falha,
**nenhum PR entra na main**. (O `AGENTS.md` do repositório afirma o contrário e está errado;
corrigir na mesma leva.)

## Decisão

**Um contêiner self-hospedado do TinaCMS, central, multi-tenant, desde o início — não TinaCloud, e
não um backend por site.**

### As sete peças que precisam ser escritas

Não há scaffold; estas são as peças, e nenhuma delas é opcional. **Eram seis até
23/09/2026**: a bancada mostrou que o roteador de tenant é peça própria, e não um
detalhe do `authProvider`.

| peça | o que resolve | nota |
|---|---|---|
| `tina/database.ts` | liga `createDatabase` ao GitProvider e ao adapter de datalayer | adapters documentados: **Upstash Redis** e **MongoDB** — mas o adapter tem de ser `abstract-level` **1.x**, ver o aviso abaixo |
| **roteador de tenant** | instancia **uma `Database` e um `TinaNodeBackend` por tenant** e despacha pelo primeiro segmento do caminho | `TinaNodeBackend` amarra **um** `databaseClient` na criação do handler; o `databaseClient` gerado pelo `@tinacms/cli` é singleton de módulo, então o nosso é escrito à mão |
| wrapper Express do `TinaNodeBackend` | o backend é handler Node `(req, res)` — **não** roda em `APIRoute` do Astro | é o processo que o contêiner executa |
| `authProvider` de backend | valida a sessão que o porteiro entrega e recusa caminho fora do tenant daquele grupo | decide *se pode*; quem decide *qual database* é o roteador |
| `authProvider` de frontend | entrega o token que o cliente põe em `Authorization: Bearer` | |
| media store | `media.tina` lança `E_SELF_HOSTED_MEDIA` fora do TinaCloud; exige `loadCustomStore` + `createMediaHandler` | destino R2 (10 GB-mês grátis, egress grátis; a mídia do CPPS hoje é **141 MB em 281 arquivos**) |
| **GitProvider com `AsyncLocalStorage`** | atribuição de commit por usuário | **não sai do escopo** |

:::caution[Duas restrições de versão medidas em 23/09/2026, e nenhuma dá erro que se entenda]
**O adapter de datalayer tem de ser `abstract-level` 1.x.** O `LevelProxy` do
`@tinacms/graphql` (`dist/index.js:3369-3401`) intercepta todo acesso a
propriedade e **lança se a propriedade não for função**; o `abstract-level` 3.x
acessa `.parent` como propriedade em `isDescendant`, e o resultado é
`Error: The property, parent, is not a function` dentro de
`Database._indexAllContent` — mensagem que não diz nada sobre versão. O
`@tinacms/graphql` fixa `abstract-level ^1.0.4` e o `@tinacms/cli` usa
`memory-level ^1.0.0`; qualquer escolha de Upstash ou MongoDB herda essa trava.

**E o eixo de versão do backend fecha em 2.0.29.** O `@tinacms/datalayer` só
existe alinhado com `@tinacms/graphql` até a **2.0.29** (`^2.4.9`); a 2.0.30 já
pede `@tinacms/graphql ^3.0.0`, enquanto a branch tem 2.4.11. Escrever o backend
hoje fixa `@tinacms/datalayer@2.0.29`, ou sobe o eixo inteiro para a 3.x — que
não foi testada.
:::

:::caution[A peça que não pode ser cortada do escopo]
`GitProvider.onPut(key, value)` **não recebe o usuário**. Sem um wrapper que carregue a identidade
da requisição por `AsyncLocalStorage` até o momento do commit, **todos os commits de todos os
sites saem com uma identidade só** — e o `diretrizes/iam.md` da casa exige trilha por usuário. Um
CMS central sem isso troca "quem escreveu" por "o CMS escreveu", que é exatamente o que a diretriz
proíbe. O git provider oficial é só o `tinacms-gitprovider-github`; o wrapper é nosso.
:::

### Onde roda, e atrás de quem

**Um contêiner**, no cluster, seguindo o guia *Como pôr uma aplicação no parque* — etapas 0 a 7,
nascendo **sem sync automático**, com promoção por prova. Ele é **uma das quatro peças próprias** da lista fechada do
[ADR-041](/decisoes/sites-na-cloudflare-pages-direct-upload/) — as outras são o monitoramento
externo, a contingência de saída e o CronJob do agente —, e é a **maior** delas: todo o resto
(sites, CDN, TLS) fica no Cloudflare gratuito. Respeitar as restrições vigentes de 2026-09-19: **nada novo
em `vm-cpps-02` nem em `k3s-franca-05`**.

**Hostname: `cms.colabh.org`, e é este ADR que o fixa.** Pela ADR-015, é serviço de usuário
servindo os dois sítios e vários grupos, logo mora em `colabh.org`, zona já autoritativa na
Cloudflare; pela ADR-016, em um nível só. O nome não é cosmético: admin e API são **o mesmo
processo**, e essa origem é a que entra no `PUBLIC_TINA_ADMIN_ORIGIN` de cada site, na lista de
origens validadas do `@tinacms/bridge` e no caminho de preview do
[ADR-043](/decisoes/edicao-visual-cross-origin/). Um nome só, em todos os lugares — não há alias
`edita.`.

**Porteiro: `oauth2-proxy` v7.6.0.** Três razões, em ordem de peso:

- já roda em **5 aplicações** da casa — runbook, modo de falha e diagnóstico conhecidos;
- a casa **nunca** usou proxy provider nem outpost do Authentik; estrear um componente novo junto
  com uma aplicação nova dobra a superfície de erro que o `novo-app.md` manda reduzir;
- o Cloudflare Access tem **50 assentos gratuitos, por usuário único na conta**, e há posição
  escrita de **2026-08-06** contra expandi-lo. Dezenas de grupos com poucos editores cada
  atravessam 50 assentos sem esforço; o `oauth2-proxy` não tem teto de assento.

### Loopback e porta única

O processo do backend **escuta só em `127.0.0.1`**, e o `Service` publica **só a porta do
porteiro**. É a letra da ADR-025 e é a classe do incidente do `busca-api` de **2026-08-21**: sem
isso, qualquer pod do cluster alcança `/api/tina/gql` por trás do porteiro, e o porteiro vira
decoração para quem já está dentro.

### Multi-tenant: um schema, um serviço

**Um schema único para todos os sites.** A medição sustenta: **74% do schema do CPPS já é
genérico** (250 de 338 campos), e 12% são stubs de `titulo`/`descricao` colapsáveis. O que é
próprio de cada grupo é identidade visual e conteúdo, não forma de documento.

O tenant é resolvido por **primeiro segmento do caminho** (`cms.colabh.org/<grupo>/…`), e não por
hostname por grupo: hostname por grupo multiplica registro DNS e certificado, e a ADR-016 já
registra que o Universal SSL não cobre `x.y.dominio.org`.

**O `defineConfig` do admin vem do kit, e isso é decidido aqui.** O bundle do admin é montado pelo
`@tinacms/app` a partir do `tina/config.ts` do site (`import config from 'TINA_IMPORT'`,
`<TinaCMS {...config}>`), e o registro de plugins do Tina é **por instância, no browser**: um
`TinaCMS` novo traz de volta todo plugin embutido, medido em 23/09/2026. Logo a proibição do
seletor de cor do [ADR-044](/decisoes/identidade-visual-por-grupo-tokens/) — que se executa por
`cms.fields.remove('color')` mais lista-branca de `ui.component` no `cmsCallback` — **só é
auditável se o `cmsCallback` for do kit e o site não puder escrever o seu**. Com admin central
servindo N configs, a alternativa é repetir a regra em N lugares e torcer. Fica decidido: o
`@colabhd/site-kit` exporta o `defineConfig` comum, o site declara schema e conteúdo, e
`cmsCallback` próprio de site é recusado pela guarda de CI.

**Quem decide o isolamento:** a pertinência da pessoa ao grupo é do **dono do grupo**, não da
equipe central; o `authProvider` de backend lê o grupo do Authentik que o `oauth2-proxy` entrega e
recusa qualquer caminho fora dos tenants daquele grupo. O mapeamento grupo → tenant mora no git do
`devops`, versionado.

**Medido em 23/09/2026: o caso negativo foi rodado, e o 403 é integralmente nosso.** O backend
inteiro do Tina tem **147 linhas** e **um único ponto de decisão de acesso**: `isAuthorized(req,
res)` do `BackendAuthProvider`, chamado em `@tinacms/datalayer@2.0.29`, `dist/index.js:122-128`,
**antes** de qualquer resolução de documento, devolvendo booleano — sem caminho, sem coleção, sem
documento —, com `errorCode` copiado direto para `res.statusCode`. `secure: true` existe **só** na
rota `gql`. `handleAuthorize`/`handleAuthenticate` do `@tinacms/graphql` são autenticação contra a
*auth collection*, não autorização por caminho: **não há, em lugar nenhum do Tina, a decisão
"este usuário pode escrever neste caminho"**. Dois tenants no mesmo processo, servidos por HTTP:
com o `LocalBackendAuthProvider` de fábrica, um `PUT` de quem tem sessão do `grupo-a` em
`/grupo-b/api/tina/gql` devolve **HTTP 200** e grava no disco do `grupo-b`; com **doze linhas
nossas** no `authProvider` comparando o grupo entregue pelo porteiro com o tenant do caminho, o
mesmo `PUT` devolve **HTTP 403** e o controle (o próprio `grupo-b`) continua em 200. A afirmação
do ADR estava certa nas duas pontas: não há implementação, e ela é nossa.

**E um processo com N tenants é viável, sob duas condições que não são opcionais.**
`createDatabase` (`@tinacms/graphql@2.4.11`, `dist/index.js:6674`) é fábrica pura — sem singleton,
sem cache de módulo —, todo o estado é campo de instância, e o `gitProvider` é *bind* na
construção, logo fixo por `Database`: **uma `Database` por tenant** é o granulado natural. Medido:
duas `Database` no mesmo processo, compartilhando o **mesmo** level físico, com bridges apontando
para diretórios distintos — um `updateDocument` no tenant A deixou B intacto em level, em disco e
no gitProvider, e `buildSchema(config)` rodou **uma vez** para os dois. As condições, que a
auditoria arrancou ao tentar derrubar o resultado:

1. **`namespace` por `Database`, sempre.** `createDatabase` faz `namespace: config.namespace ||
   "tinacms"`: dois tenants sem namespace no mesmo level caem no **mesmo** sublevel e vazam sem
   erro nenhum — medido, uma consulta de conexão do grupo A devolveu a página do grupo B.
2. **Nenhuma collection `isDetached: true` num level compartilhado.** O `initLevel` cria
   `appLevel = rootLevel.sublevel("_appData")` **sem** namespace, ao contrário de `_content` e
   `_metadata`. Collection detached — que é como a *auth collection* self-hospedada mora no
   datalayer — grava em `appLevel.sublevel(nome)` e **colide entre tenants**: medido, o tenant B
   leu o documento de usuário do tenant A antes de qualquer escrita, a mutação em A mudou o que B
   lê, e o arquivo de B ficou intacto e ignorado no disco, porque `_indexAllContent` pula
   collections detached. É primeiro-a-indexar-ganha, em silêncio.

   Se qualquer uma das duas não puder ser garantida, o caminho é **um adapter físico por tenant**,
   e não um level compartilhado. Compartilhar datalayer sem essas condições é o modo de falhar com
   HTTP 200 e sem ruído.

**O que continua sem verificação, e é o granulado mais fino.** `isAuthorized` só vê a requisição
crua, então negar **um documento** dentro do tenant — e não o tenant inteiro — exige ler
`req.body.query`/`variables` e interpretar o GraphQL; nada no Tina ajuda nisso. Se a regra for só
"grupo × tenant", o prefixo de caminho basta e está provado. Faltam também duas coisas medíveis e
não medidas: **que o `oauth2-proxy` de fato entregue o grupo do Authentik em cabeçalho de
requisição** (na bancada isso foi um `x-grupo` inventado), e **o inventário de rotas** — `secure:
true` só existe em `gql`, então toda rota que um `authProvider` real acrescente por `extraRoutes`
(auth, mídia) entra **sem** passar pelo porteiro de tenant, e precisa de gate próprio. Nota
operacional da mesma bancada: travessia de caminho a partir do próprio tenant
(`relativePath: "../../../grupo-b/…"`) é barrada pelo `assertWithinBase` do `FilesystemBridge`,
mas volta com **HTTP 200** e o erro só no corpo GraphQL.

### Ciclo de vida do editor, e o pré-requisito que não é nosso

Com dezenas de grupos e duas pessoas, o que quebra não é o `authProvider`: é ninguém saber quem
ainda deveria ter acesso. A regra:

- **Entrada.** O **dono do grupo** (obrigação 1 do
  [ADR-046](/decisoes/classe-leve-para-sites-de-divulgacao/)) pede o acesso nominalmente; a equipe
  central põe a pessoa no grupo do Authentik daquele tenant. Nunca conta compartilhada, nunca
  "o bolsista usa o login do professor".
- **Saída.** Fim de bolsa, de vínculo ou de participação → o dono do grupo avisa, e a remoção é
  do grupo do Authentik. **O commit já feito continua no histórico público**, com nome e e-mail —
  isso é consequência de repositório público e precisa estar no termo de entrada, porque não é
  reversível.
- **Revisão.** Semestral, por grupo, com a lista enviada ao dono do grupo para confirmação. Sem
  resposta em 30 dias, o grupo inteiro é suspenso do admin — é a única sanção executável com duas
  pessoas.

:::caution[O SSO de que isto depende ainda não existe]
O `diretrizes/iam.md` está com o **MVP não implantado**. O Authentik roda em `sso.colabh.org` e o
`oauth2-proxy` v7.6.0 já serve 5 aplicações, mas o desenho acima pressupõe grupos por tenant e
revisão de acesso que a casa ainda não opera. **Pré-requisito datado:** o piloto (CPPS) pode
entrar com os dois editores da equipe central; **nenhum grupo externo entra no admin antes de o
grupo do Authentik e a revisão semestral existirem**. Se isso não estiver de pé até
**2026-12-22** — a mesma data do critério 5 do ADR-043 —, o admin central não recebe o segundo
grupo, e a decisão de centralizar precisa ser reexaminada por não ter para quem servir.
:::

### O que o admin edita, e o que fica de fora na primeira fase

O schema decidido acima cobre as **páginas** do Tina (`src/content/tina-pages/`). As collections
MDX — `noticias`, `membros`, `publicacoes` — **ficam fora do admin na primeira fase**, e isso tem
um custo que precisa ser dito na cara: **notícia é o conteúdo que mais muda num site de grupo**, e
enquanto ela estiver fora, publicá-la é abrir PR — ou seja, depende das duas pessoas da equipe
central, que é exatamente o gargalo que a decisão "edição visual agora" existe para remover. A
edição visual entrega, na primeira fase, o texto institucional, que muda uma vez por ano.

Por que assim mesmo: collection no Tina exige schema próprio por collection, convenção de nome por
idioma (`nome.pt.mdx`) que o Tina não gera sozinho, e o modelo de arquivo-por-idioma do
[ADR-045](/decisoes/i18n-field-based-com-fallback/) — três coisas a escrever **depois** de as seis
peças estarem de pé. **A segunda fase entra com `noticias` primeiro**, e o gatilho é o critério 6.

### O índice do Tina é estado derivado

`Database.put()` **commita no git antes de indexar**, e **aborta se o git falhar**. A ordem importa
para o backup: a fonte da verdade é o conjunto de repositórios, e o datalayer (Upstash ou MongoDB)
é **cache reconstruível**. O que fazer com essa fonte da verdade — se o GitHub é cópia única ou se
há espelho no parque — **não é decidido aqui**: é a obrigação 6 do
[ADR-046](/decisoes/classe-leve-para-sites-de-divulgacao/). Consequência prática: o índice **não** entra no PBS nem no VolSync; o
que precisa existir é um **runbook de reindexação**. **Não medido:** o tempo de reconstrução do
índice para dezenas de sites. O que mediria: reindexar `site-cpps` e `site-redalint` e extrapolar
por número de documentos.

### GitHub App nas três orgs

Um **GitHub App** instalado **em cada uma das três organizações** — `colabhd`, `lab-ippri-unesp` e
`cpps-unesp` — porque instalação de App **não cruza org**, assim como segredo de organização não
cruza. **Dono nomeado** (Rafael) e escopo mínimo (`Contents: read/write`, só nos repositórios de
site), conforme o `iam.md`. A chave privada mora no SOPS+age do `devops`, e não em segredo de
organização — segredo de org obrigaria três cópias com três rotações.

### Rascunho público no instante do save

Repositório público + CMS central significa que o `IsomorphicBridge.put()` **commita por arquivo
gravado**: o rascunho vira conteúdo público no instante do save. **Não há embargo possível** neste
desenho. Isto tem que ser dito a cada grupo **antes** de ele entrar, por escrito, no termo de
entrada — não é letra miúda, é a propriedade mais surpreendente do arranjo.

Consequência já visível: `lab-ippri-unesp/site-odr` é **privado**, o que colide com a decisão 4. Ou
vira público e entra, ou fica fora do CMS central. E, sendo privado no plano Free, ele **não aceita
ruleset nem branch protection** (a API devolve 403) — nem o portão de PR existe nele hoje.

### Ordem do conserto do `ci`

1. **Primeiro a ordem**, que não depende de nada: mover a geração (`tinacms build`) para antes do
   `tsc` no script `ci`. Conserta a causa 1 sozinha e é revertível.
2. **Depois a credencial**: a causa 2 só fecha de vez quando o backend existir e o `tina/config.ts`
   apontar `contentApiUrlOverride` para ele, dispensando `clientId`/`token` do TinaCloud. Até lá, a
   CI roda com `--local`. **Não verificado:** se `--local` produz um admin publicável ou apenas um
   build que passa — o que verificaria é abrir o `/admin` do artefato de CI e tentar um save.
3. Só então faz sentido tratar o resto. O **contraste** reprovado em WCAG AA é decidido pelo
   [ADR-044](/decisoes/identidade-visual-por-grupo-tokens/). O **XSS armazenado** de `marked` sem
   sanitização (`src/utils/markdown.ts` → `set:html` em `TextoComCheck.astro:35`) é decidido pelo
   [ADR-043](/decisoes/edicao-visual-cross-origin/), que é quem abre a edição a dezenas de
   pessoas — não há ADR separado para ele, e não deve haver promessa de um.

## Alternativas rejeitadas

**TinaCloud.** É o caminho de menor esforço e o argumento a favor é forte e honesto: ele entrega
**zero código de backend**. As sete peças acima simplesmente não existiriam, e uma equipe de duas
pessoas tem motivo de sobra para preferir não escrevê-las. Rejeitado porque o preço é **por
projeto** e projeto é **repositório**: a decisão 1, que existe para que a saída de um grupo seja
transferir o repositório, converte-se aqui em custo linear no número de grupos — cerca de
**US$ 720/mês com 30 sites**, contra US$ 0 de licença no self-host. Some-se o SSO só no
Enterprise, contra o `iam.md`.

**Backend em Cloudflare Workers.** Seria coerente com a decisão 6 — infra própria zero, e a casa já
publica pela Cloudflare. Rejeitado por dois riscos, e **nenhum dos dois está medido**, o que
precisa ficar escrito num ADR que marca tudo o mais: (a) o teto de **10 ms de CPU por
requisição** no plano gratuito é apertado para um backend GraphQL que resolve schema e fala com
um datalayer — **não medimos** o custo por requisição do `TinaNodeBackend`, e verificaríamos com
um deploy de teste e `wrangler tail`; (b) o `TinaNodeBackend` é handler Node `(req, res)`, e a
ponte para o runtime dos Workers depende de adapter de terceiro — **não verificamos** qual é nem
seu último commit, e verificaríamos antes de reabrir. Comprar o plano pago para caber no teto
troca uma conta por outra, que é o que esta decisão evita.

**Correção de precisão, de 23/09/2026:** o obstáculo não é o backend. O `TinaNodeBackend` são
**147 linhas sem dependência de `express`** — é só `(req: IncomingMessage, res: ServerResponse)`,
e o handler não tem estado global. O que não cabe em Worker são o `Database`, o
`FilesystemBridge` e o `isomorphic-git`. Quem reabrir esta alternativa ataca esses três, não o
handler.

**Um backend por site.** O argumento a favor é o mais forte dos três e merece ser escrito inteiro:
**isolamento perfeito** — nenhum erro de resolução de tenant pode vazar conteúdo de um grupo para
outro — e **coerência total com a decisão 1**, porque a saída de um grupo passaria a ser entregar o
repositório **e** o contêiner, sem nada restar acoplado. Rejeitado porque multiplica por N a única
peça de infra própria que a decisão 6 admite: dezenas de contêineres, dezenas de datalayers,
dezenas de porteiros e dezenas de fichas de inventário, para duas pessoas operarem. O isolamento
que se perde é recuperável por teste (o caso negativo descrito acima); o custo operacional que se
ganharia não é recuperável por nada.

## Consequências

**Aceita-se escrever e manter sete peças sem scaffold oficial** — eram seis até a bancada de
23/09/2026 separar o roteador de tenant do `authProvider` —, com duas pessoas. É dívida de
código assumida de olhos abertos, em troca de não ter dívida financeira linear no número de grupos.

**Aceita-se um ponto único de falha para edição.** O CMS cair significa que **ninguém edita** —
mas **nenhum site cai**: os sites são estáticos na Cloudflare Pages e continuam publicados. A
queda é de edição, não de publicação, e essa é a diferença que torna o ponto único tolerável.

**Aceita-se reacoplar o que a decisão 1 desacoplou.** A saída de um grupo devolve o repositório,
mas **não devolve o CMS**: para continuar editando visualmente fora daqui, o grupo sobe o próprio
backend ou assina o TinaCloud. Isso vai no termo de entrada, junto com o rascunho público.

**Aceita-se que o índice é descartável** — perda do datalayer custa reindexação, não conteúdo — e
que, em troca, um `put` com o git indisponível **falha em vez de enfileirar**.

**Aceita-se rascunho público no save**, sem embargo, para todo grupo que entrar.

**Entra uma ficha** em `website/src/data/inventario/aplicacoes.yaml` com `sitio_dono` em
`franca`/`sp`. Diferente dos sites na Cloudflare — que são literalmente irrepresentáveis naquele
schema Zod strict e cujo precedente de exclusão são `devops.colabh.org` e `trilhas.colabh.org` — o
CMS **é** representável, porque roda no parque.

**O admin central implica cross-origin, e a medição de 23/09/2026 confirmou que o proxy fica.** O
cliente do Tina autentica por `Authorization: Bearer` obtido de `authProvider.getToken()`, **não
por cookie** — isto corrige o diagnóstico anterior que circulou — então a API em outra origem
funciona com CORS. A barreira real é o `PreviewInner`, que monta o `src` do iframe como **caminho
da origem do admin**; medido em bancada e auditado, **nenhuma rota que o admin possa tomar produz
URL absoluta** (o `resolvePath` do react-router colapsa a forma protocolo-relativa), então a saída
continua sendo servir o site por um caminho da própria origem do admin. Uma correção de fato que
vale aqui: `PUBLIC_TINA_ADMIN_ORIGIN` **não governa o preview** — ela é lida só pelo
`@tinacms/astro`, do lado do site, e alimenta a allowlist de `event.origin` do `@tinacms/bridge`,
que de fato nunca usa `targetOrigin` curinga. O detalhe é do
[ADR-043](/decisoes/edicao-visual-cross-origin/); aqui basta registrar que **a centralização é o
que cria essa exigência** e que ela **não** foi dispensada pela medição.

**Nada disto conserta o i18n.** Os 51 campos localizados (235 instâncias) continuam **sem fallback
para pt**, e o preview do admin continua sempre em pt. É custo herdado, não introduzido por este
ADR.

## Critério de revisão

1. **O wrapper de `AsyncLocalStorage` não fechar até a primeira promoção** (etapa 6 do
   `novo-app.md`) e os commits saírem com identidade única → **parar a promoção**, não seguir com
   aviso. **Este é o único gatilho da série para essa peça**; o ADR-043 cita-o em vez de definir
   outro, mais frouxo. O gatilho é observável: `git log --format='%an %ae'` no repositório de um site editado por
   duas pessoas diferentes deve mostrar dois autores.
2. **O número de sites ficar em 5 ou menos por 12 meses corridos**, ou o TinaCloud passar a cobrar
   por organização/usuário em vez de por projeto → recalcular: 5 sites no Team são US$ 120/mês, e a
   essa altura a dívida de código pode custar mais que a conta.
3. **Indisponibilidade do CMS passar de 4 horas em um mês**, ou a reindexação completa passar de 30
   minutos → reabrir a topologia (réplica, ou backend por sítio). Ambos os números precisam ser
   medidos antes de virarem limiar; hoje não são.
4. **Um grupo exigir embargo de rascunho** (conteúdo sob embargo, dado pessoal, avaliação por
   pares) → o repositório público deixa de servir para ele. Quem reabre é a **decisão 4**, não
   esta: ou o grupo fica fora, ou o parque passa a ter repositório privado — e repositório privado
   no Free perde ruleset e consome os 2.000 min/mês de Actions da org.
5. **O TinaCMS publicar scaffold oficial de backend self-host para `astro`** — isto é, o abort em
   `@tinacms/cli/dist/index.js:7693-7699` desaparecer — → reavaliar quais das sete peças podem ser
   aposentadas em favor do upstream.
6. **O primeiro site estar no ar pelo admin e a collection `noticias` continuar fora dele por
   mais de 90 dias**, ou o número de PRs de notícia abertos pela equipe central passar de 10 num
   mês → a segunda fase deixa de ser plano e vira trabalho, porque o gargalo que a decisão 3
   queria remover continua de pé.
