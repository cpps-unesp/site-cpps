# Plano de execução — plataforma de sites

Roteiro em ordem executável para **duas pessoas** (Rafael e Arthur), derivado dos ADRs 040 a 047
desta proposta. Começa pelo que está quebrado hoje e termina no agente.

**Como ler.** Cada item tem um identificador, a trilha a que pertence, de que depende e o que
conta como pronto. As trilhas são três, e a separação existe porque elas usam ferramentas
diferentes e podem correr em paralelo:

| trilha | o que é | onde acontece |
|---|---|---|
| **SITE** | código do site e do kit | `cpps-unesp/site-cpps`, depois os demais repositórios e o `@colabhd/site-kit` |
| **DEVOPS** | infraestrutura, GitOps, segredos, DNS | `colabhd/devops`, cluster, Cloudflare, Authentik |
| **DECISÃO** | não é trabalho técnico: é escolha, chamado, assinatura ou conta | fora do teclado |

**Sobre estimativas.** Onde há número, ele é **estimativa de esforço**, em dia-pessoa, não prazo
e não compromisso. Nenhum item tem data, com duas exceções que vêm dos próprios ADRs e estão
marcadas como tal. Itens sem estimativa são os que dependem de terceiros (UNESP, npm, GitHub,
Mend) ou de experimento cujo resultado decide o tamanho.

---

## Fase 0 — Destravar o que está quebrado

Nada nas fases seguintes anda enquanto esta não fecha. Hoje o `site-cpps` não consegue mergear
nada: o ruleset `Protect main` exige o check `ci`, e o `ci` falha.

### 0.1 — SITE — `npm run ci` volta a passar em checkout limpo (causa 1: ordem)

- **Problema:** `tsc` roda antes de `tinacms build`, e `tina/__generated__` é gitignorado →
  **TS2307 em `src/lib/tina/pages.ts:8`**.
- **Fazer:** inverter a ordem no script `ci` do `package.json`, gerando antes de compilar.
- **Pronto quando:** `git clean -xdf && npm ci && npm run ci` passa numa máquina limpa.
- **Estimativa:** 0,5 dia-pessoa. Revertível, não depende de nada.

### 0.2 — SITE — `npm run ci` volta a passar em checkout limpo (causa 2: credencial)

- **Problema:** `tinacms build` sem `--local` e sem credenciais lança *"Client not configured
  properly. Missing clientId, token"* — ele tenta falar com o TinaCloud.
- **Fazer:** a CI roda com `--local` até o backend próprio existir (5.x). Registrar no workflow
  **por que** o `--local` está ali, para não virar mistério.
- **A verificar no mesmo item:** se `--local` produz admin publicável ou só um build que passa.
  Abrir o `/admin` do artefato de CI e tentar um save.
- **Pronto quando:** o check `ci` fica verde num PR de teste.
- **Estimativa:** 0,5 a 1 dia-pessoa.

### 0.3 — SITE — desfazer o `output: 'server'` da branch `feat/tinacms-visual-editing`

- **Problema:** `astro.config.mjs:13-14` trocou `output: 'static'` por `output: 'server'` com
  `@astrojs/node`. A Pages publica `dist`; com adapter a saída vira `dist/client` +
  `dist/server`, e o `public/_redirects` (83 linhas, 69 regras efetivas, 34 com curinga) deixa
  de valer. **O time já saiu de SSR por esta mesma quebra**, registrado em
  `docs/deploy-e-redirects.md`.
- **Fazer:** voltar `output: 'static'`, remover `@astrojs/node`.
- **Pronto quando:** `npm run build` gera `dist/` plano e o `_redirects` está lá.
- **Estimativa:** 0,5 dia-pessoa.

### 0.4 — SITE — criar `src/pages/index.astro`

- **Problema:** a raiz `/` só funciona porque uma regra do `_redirects` a cobre — regra que some
  em qualquer runtime que não seja a Pages.
- **Fazer:** página de redirect para a raiz em `pt`.
- **Pronto quando:** `dist/index.html` existe depois do build.
- **Estimativa:** 0,25 dia-pessoa.

### 0.5 — SITE — portar as 35 regras estáticas do `_redirects` para o `astro.config.mjs`

- **Fazer:** as 35 estáticas vão para a chave `redirects` (o Astro as materializa em páginas no
  build estático). As **34 com curinga** ficam no `_redirects`, com comentário no próprio
  arquivo dizendo que dependem da Cloudflare Pages — hoje esse aviso mora num `.md` que ninguém
  leu antes de mexer no `astro.config.mjs`.
- **Pronto quando:** as 35 aparecem como arquivo em `dist/` e o `_redirects` fica só com as 34.
- **Estimativa:** 1 dia-pessoa.

### 0.6 — SITE — sanitizar o rich-text (XSS armazenado)

- **Problema:** `textarea → marked sem sanitização → set:html`, em `src/utils/markdown.ts` e
  `src/components/TextoComCheck.astro:35`. É o único defeito da série explorável por terceiro, e
  a edição visual multiplica quem pode escrevê-lo por dezenas de pessoas, em repositório público
  com commit no save.
- **Fazer:** pipeline do ADR-043 — `rehype-sanitize` sobre a saída do `marked`, com a allowlist
  escrita lá (`p`, `br`, `strong`, `em`, listas, `h2`–`h4`, `a` com esquema restrito, `code`,
  `blockquote`; sem `img`, `script`, `style`, `iframe` nem `on*`). Uma função única de render, e
  **nenhum `set:html` fora dela** — regra verificável por `grep` no CI.
- **Cuidado:** os marcadores próprios (quebra de linha codificada e `<Destaque texto="…" />`)
  são resolvidos **antes**, no parse de `src/lib/tina/pages.ts`, e viram componente Astro; o
  `texto` do `Destaque` é interpolado como **texto**, nunca como markup.
- **Pronto quando:** um teste com `<img src=x onerror=alert(1)>` num campo sai inerte na página,
  e os marcadores continuam funcionando.
- **Estimativa:** 1 a 2 dias-pessoa.
- **Bloqueia:** o primeiro save de qualquer pessoa de fora da equipe central.

### 0.7 — DEVOPS — corrigir o ruleset `Protect main` do `site-cpps`

- **Fazer:** remover a exigência de **1 aprovação**, mantendo check `ci` e `non_fast_forward`
  (ADR-046). Sem isso o CMS não publica sozinho.
- **Pronto quando:** `gh api repos/cpps-unesp/site-cpps/rulesets/16229911` mostra o perfil novo.
- **Estimativa:** 0,25 dia-pessoa.
- **Depende de:** 0.1 e 0.2 (não afrouxar a proteção antes de a CI de fato pegar erro).

### 0.8 — SITE — corrigir o `AGENTS.md` e o `docs/deploy-e-redirects.md`

- **Problema:** o `AGENTS.md` afirma que a `main` não é protegida, e **está errado**. O
  `README.md` e o `docs/deploy-e-redirects.md` falam de integração Git, e o modo passa a ser
  Direct Upload.
- **Fazer:** no mesmo PR de 0.7. Dono: **Rafael** (o ADR-046 nomeia).
- **Estimativa:** 0,25 dia-pessoa.

---

## Fase 1 — Decisões humanas que bloqueiam trabalho técnico

Nenhuma é código. Todas travam fase seguinte, e por isso vêm cedo.

### 1.1 — DECISÃO — ratificar os oito ADRs

Todos estão como **Proposto**. Revisar, aceitar ou devolver. Enquanto forem proposta, o resto
deste plano é plano de proposta.

### 1.2 — DECISÃO — registrar o escopo npm `@colabhd`

Medido em 22/09: `registry.npmjs.org/-/org/colabhd/package` devolve `Scope not found`. **Está
livre.** Registrar em conta de **organização** no npm, com dono nomeado — não em conta pessoal.
Bloqueia todo o item 4.x.

### 1.3 — DECISÃO — confirmar a conta única da Cloudflare, e quem tem acesso a ela

O ADR-041 decide **uma** conta. Confirmar, nomear quem administra, e emitir o token dedicado aos
sites com escopo `Pages:Edit` — lembrando que ele é **de conta** e alcança todos os projetos.

### 1.4 — DECISÃO — o que fazer com `lab-ippri-unesp/site-odr`

Privado hoje, e repositório privado no plano Free **não aceita ruleset** (403 na API). Três
saídas, na ordem de preferência do ADR-046: (a) revisar histórico com `gitleaks` e abrir; (b)
manter privado e **fora** da plataforma; (c) tratar como aplicação, pelo guia do parque.
Ninguém olhou o conteúdo dele ainda — olhar é parte da decisão.

### 1.5 — DECISÃO — `site-gedai`, `site-lantri`, `site-nefa`: arquivar ou provisionar

Criados em 11/06/2026, **privados e com `size` 0**. Pela regra do ADR-046 não deveriam existir
antes de haver conteúdo e data acordados com o grupo. Decidir um por um.

### 1.6 — DECISÃO — abrir chamado na UNESP sobre `nefits.franca.unesp.br`

O CNAME aponta para `labriunesp.github.io`, **conta do GitHub que não existe**: qualquer pessoa
pode registrar esse nome e servir conteúdo sob um hostname `unesp.br`, com certificado válido.
Pedir **remoção ou reapontamento** do registro. Prazo não é nosso. Verificar antes, e registrar
a data, se o nome `labriunesp` ainda pode ser registrado por terceiro.

### 1.7 — DECISÃO — escrever o termo de entrada de grupo

Três propriedades, por escrito, antes do primeiro grupo externo: **rascunho público no instante
do save** (sem embargo possível); **a edição visual não acompanha a saída**; **a mídia em R2 não
acompanha a transferência do repositório**. Mais o que o ADR-046 acrescenta sobre dado pessoal:
o histórico público não é apagável sem reescrita. Data de aceite e assinatura vão para o
`sites.yaml`.

### 1.8 — DECISÃO — 2FA nas três organizações

Verificar se está exigido em `Settings → Authentication security` das três orgs e ligar onde não
estiver. É a única exigência de identidade que o plano Free oferece; o resto do `iam.md` não é
executável no GitHub sem plano pago, e isso está registrado no ADR-040.

---

## Fase 2 — Hospedagem do primeiro site

### 2.1 — DEVOPS — criar o repositório público de plataforma em `colabhd`

Guarda: o **workflow reutilizável** de CI e de deploy, o **preset do Renovate** e o script
`create`. **Uma cópia só** — workflow reutilizável em repositório público é chamado por `uses:`
pelas três orgs; não se replica nada. *Estimativa: 0,5 dia-pessoa.*

### 2.2 — DEVOPS — extrair o job de deploy do `devops` para workflow reutilizável

Molde pronto e rodando: `.github/workflows/website.yaml` do `devops`, com
`cloudflare/wrangler-action@v3` e `pages deploy … --project-name=… --branch=…`, com preview por
PR comentado. Parametrizar projeto, diretório e branch. *Estimativa: 1 a 2 dias-pessoa.*

### 2.3 — DEVOPS — segredo do token nas três orgs

Segredo de **organização** (não de repositório), lido só pelo workflow reutilizável sob um
`environment` com revisor. Três cópias é o custo aceito — segredo de org não cruza org. Dono
nomeado e rotação registrada, conforme `iam.md`. *Estimativa: 0,5 dia-pessoa.*

### 2.4 — DEVOPS — criar o projeto da Pages do `site-cpps` como **Direct Upload**

**A escolha é irreversível por projeto, nos dois sentidos.** Conferir duas vezes antes de criar.
*Estimativa: 0,5 dia-pessoa.*

### 2.5 — DEVOPS — `sites.yaml` no `colabhd/devops`

Arquivo novo, schema Zod próprio, **fonte única da frota** (ADR-046): `slug`, `nome`, `org`,
`repo`, `hostname`, `zona`, `dono`, `responsavel_tecnico`, `projeto_pages`, `modo_deploy`,
`classe_ruleset`, `status`, `data_no_ar`, `termo_entrada`. Dele saem a lista de origens do
admin, os alvos do check externo, a classe de ruleset e a lista do espelho.
*Estimativa: 1 dia-pessoa.*

### 2.6 — DEVOPS — check externo de 200 na raiz

Blackbox no **parque** (não na Cloudflare: o alarme não mora no prédio que vigia), um `GET` por
hostname do `sites.yaml`. Sem alerta com destinatário nem SLO — a classe leve dispensa os dois,
e o ADR-046 aceita isso por escrito. *Estimativa: 1 dia-pessoa.*

### 2.7 — DEVOPS — ensaiar a contingência de saída

Servir o `dist` de um site a partir do K3s, uma vez, e registrar o tempo. Sem ensaio, a
reversibilidade prometida no ADR-041 é uma frase. *Estimativa: 1 dia-pessoa.*

---

## Fase 3 — i18n e acessibilidade (o que o CMS vai multiplicar)

Vem **antes** do CMS de propósito: são defeitos que a edição visual multiplicaria por dezenas de
pessoas.

### 3.1 — SITE — resolvedor único de i18n, com `trim` como guarda

Função única em `src/lib/tina/pages.ts`, devolvendo `{ texto, traduzido }`, e **nenhum acesso
direto a `campo[lang]` em componente**. O `??` de hoje não cobre o caso real, que é **string
vazia**: são **70 valores `""` em `en`/`es`** medidos nos `tina-pages`. *Estimativa: 1 a 2
dias-pessoa* (a maior parte é mecânica, nos componentes de seção mais o `Hero.astro`).

### 3.2 — SITE — ligar o aviso de não traduzido

`src/components/TranslationWarning.astro` já existe. Quando qualquer campo voltar
`traduzido: false`, a página EN/ES exibe o aviso. *Estimativa: 0,5 dia-pessoa.*

### 3.3 — SITE — restituir `departamentos` e tirar a URL de dentro do campo

`departamentos` virou `string[]` puro em português e **perdeu tradução que existia na `main`** —
recuperar de `git show main:src/i18n/locales/{en,es}.json`. Os cards de Projetos passam a
guardar a **chave** da rota, e a URL é montada por `getTranslatedPath`. *Estimativa: 1
dia-pessoa.*

### 3.4 — SITE — módulo único de idiomas

`src/i18n/langs.ts` como fonte, e os 23 arquivos que hoje cravam os três códigos passam a
importar dali. Meta verificável: zero `'es'` literal fora de `src/i18n/` e dos JSON.
*Estimativa: 1 dia-pessoa.*

### 3.5 — SITE — classificar os 51 campos: localizado ou compartilhado

*Localizado é o que uma pessoa lê; compartilhado é o que uma máquina usa.* É contrato do schema,
feito uma vez, e **o agente de tradução não pode ser ligado sem ele** — sem a classificação ele
reescreveria `id` e caminho de imagem. *Estimativa: 1 dia-pessoa.*

### 3.6 — SITE — a faxina de contraste, em PRs separados

Três coisas, nesta ordem: (a) trocar a linha 2 do `global.css` por
`@plugin 'daisyui' { themes: … }` com **lista explícita**, expulsando o `light` embutido de onde
vem o `btn-primary` a **2,09:1**; (b) eliminar as **18 ocorrências de hex** (10 valores
distintos); (c) corrigir os dois pares medidos para ≥ 4,5:1 e ≥ 3:1 conforme o papel.
**Medir também o modo escuro**, que ninguém mediu. *Estimativa: 2 a 3 dias-pessoa.*

### 3.7 — SITE — gate de contraste como check obrigatório

Aritmética pura sobre os hex e sobre o catálogo de variantes, nos **dois modos**, no job `ci` de
cada repositório de site — não no `.github` da organização, que não é herdado. Liga **depois**
de 3.6, para não nascer vermelho: **não há modo aviso com prazo**. *Estimativa: 1 a 2
dias-pessoa.*

---

## Fase 4 — O kit

### 4.1 — SITE — inverter os 7 componentes que chamam `getCollection`

Componente publicado em pacote **não pode importar `astro:content`** (módulo virtual do projeto
que faz o build). A dependência inverte: buscar fica na página, desenhar vai para o kit.
*Estimativa: 2 a 3 dias-pessoa.*

### 4.2 — SITE — publicar `@colabhd/site-kit` em `1.0.0`

`.astro` publica em pacote npm **sem build step**, oficialmente suportado. `1.0.0` desde o
primeiro dia, não por maturidade: o auto-merge **recusa `minor` em versão `0.x`**, e um kit em
`0.x` transformaria cada componente novo em dezenas de PRs manuais. *Depende de 1.2.*
*Estimativa: 1 dia-pessoa.*

### 4.3 — SITE — Astro Integration que injeta a diretiva `@source`

**Tailwind 4 não varre `node_modules`.** Sem a diretiva, o build **passa** e a página sai sem
estilo — falha silenciosa, a pior classe para duas pessoas com dezenas de repositórios. O gate
precisa falhar quando a folha compilada não contiver as classes do kit. *Não provado em bancada:*
verificar com um site novo usando um componente do kit e `grep` da classe no CSS de `dist/`.
*Estimativa: 1 a 2 dias-pessoa.*

### 4.4 — SITE — mover para o kit o resolvedor, o módulo de idiomas e o aviso

O que a fase 3 escreveu em `src/` do piloto é exportado pelo kit; o site consome. É a mesma
entrega, não uma fase seguinte. *Estimativa: 1 dia-pessoa.*

### 4.5 — SITE — o catálogo de variantes (paletas e pares tipográficos)

Cada variante é um **par (claro, escuro)** medido nos dois modos. Uma variante só entra no
catálogo quando os dois lados passam no gate. *Estimativa: 2 a 3 dias-pessoa.*

### 4.6 — DEVOPS — preset do Renovate e instalação nas três orgs

Preset público em `colabhd` (preset público **cruza org**), e em cada site apenas
`{"extends": ["colabhd/renovate-config"]}`. App hospedado da Mend, **instalado em cada uma das
três orgs**. *Estimativa: 1 a 2 dias-pessoa.*

### 4.7 — DEVOPS — o script `create`

Script `gh`, não CLI publicada. Numa ordem só: repositório a partir do template, ruleset da
classe, projeto da Pages como Direct Upload, registro DNS, linha no `sites.yaml`. **Termina
quando a raiz responde 200.** *Estimativa: 2 a 3 dias-pessoa.*

---

## Fase 5 — O CMS self-hospedado

Seis peças sem scaffold: `tinacms init backend` **aborta** para `astro` + self-host
(`@tinacms/cli/dist/index.js:7693-7699`). Nenhuma existe na branch hoje.

### 5.1 — SITE — `tina/database.ts`

Liga `createDatabase` ao GitProvider e ao adapter de datalayer (documentados: **Upstash Redis**
e **MongoDB**). *Estimativa: 1 a 2 dias-pessoa.*

### 5.2 — SITE — wrapper Express do `TinaNodeBackend`

É handler Node `(req, res)` — **não** roda em `APIRoute` do Astro. É o processo que o contêiner
executa. *Estimativa: 2 dias-pessoa.*

### 5.3 — SITE — `authProvider` de backend e de frontend

Backend valida a sessão que o porteiro entrega e resolve **grupo → tenant**; frontend entrega o
token que o cliente põe em `Authorization: Bearer`. *Estimativa: 2 a 3 dias-pessoa.*

### 5.4 — SITE — media store no R2

`media.tina` lança `E_SELF_HOSTED_MEDIA` fora da TinaCloud: exige `loadCustomStore` +
`createMediaHandler`. Destino R2 **desde o dia um** — não é contingência de cota. Migrar os
141 MB em 281 arquivos do `site-cpps`. *Estimativa: 2 a 3 dias-pessoa.*

### 5.5 — SITE — GitProvider embrulhado em `AsyncLocalStorage`

`GitProvider.onPut(key, value)` **não recebe o usuário**. Sem o wrapper, **todos os commits de
todos os sites saem com uma identidade só**, contra o `iam.md`. **Não sai do escopo**: o
critério 1 do ADR-042 manda **parar a promoção** se não fechar. Teste: `git log --format='%an
%ae'` num site editado por duas pessoas mostra dois autores. *Estimativa: 2 a 3 dias-pessoa.*

### 5.6 — DEVOPS — GitHub App instalado nas três orgs

`Contents: read/write`, só nos repositórios de site, dono nomeado (Rafael). Chave privada no
SOPS+age do `devops`, **não** em segredo de organização. *Estimativa: 1 dia-pessoa.*

### 5.7 — DEVOPS — subir o contêiner em `cms.colabh.org`

Pelas etapas 0 a 7 do `novo-app.md`, **sem sync automático**, com promoção por prova. Backend
escutando só em `127.0.0.1`, `Service` publicando **só a porta do porteiro** (`oauth2-proxy`
v7.6.0, Authentik como IdP). Respeitar as restrições de 19/09: **nada novo em `vm-cpps-02` nem
em `k3s-franca-05`**. Ficha no `aplicacoes.yaml` com `sitio_dono` — o CMS **é** representável,
diferente dos sites. *Estimativa: 2 a 3 dias-pessoa.*

### 5.8 — DEVOPS — grupos do Authentik e ciclo de vida do editor

Grupo por tenant, entrada pelo dono do grupo, saída no fim do vínculo, revisão semestral. **O
MVP do `iam.md` não está implantado**: o piloto entra com os dois da equipe central, e
**nenhum grupo externo entra no admin antes disso existir** — o ADR-042 põe **2026-12-22** como
gatilho. *Estimativa: 2 dias-pessoa (mais o que o IAM custar, que não é deste plano).*

### 5.9 — SITE — teste negativo de isolamento de tenant

Pessoa do grupo A pedindo `PUT` em documento do grupo B recebe **403 no backend** — não basta o
menu estar escondido no admin. *Estimativa: 0,5 dia-pessoa.*

### 5.10 — DEVOPS — runbook de reindexação

O datalayer é **cache reconstruível**; a fonte da verdade é o conjunto de repositórios. Medir o
tempo de reindexação do `site-cpps` e extrapolar. *Estimativa: 1 dia-pessoa.*

---

## Fase 6 — Edição visual cross-origin

### 6.1 — SITE — **o experimento, antes de prometer qualquer coisa**

Duas origens de verdade, sem `/etc/hosts` e sem `localhost` nas duas pontas: A serve o admin, B
serve um build do `site-cpps`. Definir `PUBLIC_TINA_ADMIN_ORIGIN` no build de B e registrar: (1)
o `src` do iframe sai relativo a A ou absoluto para B? (2) a leitura de
`contentWindow.location.href` a cada 100 ms lança `SecurityError`, silencia ou devolve
`about:blank`? (3) o `postMessage` do `@tinacms/bridge` chega com `event.origin` igual a B e é
aceito? **Este item decide o tamanho de 6.2.** *Estimativa: 1 a 2 dias-pessoa.*

### 6.2 — SITE — proxy de preview em `cms.colabh.org/preview/<slug>/…`

Só se 6.1 mostrar que é preciso. Verificar também se servir sob esse caminho quebra os caminhos
relativos do site (assets, links internos) — medir contando 404 numa navegação completa.
*Estimativa: 2 a 4 dias-pessoa, a depender de 6.1.*

### 6.3 — SITE — lista de origens gerada do `sites.yaml`

Lida no build do contêiner, **nunca digitada à mão**. Um site novo entra por uma linha no
registro. O que falha quando atrasa: a edição visual daquele site não monta — nunca um site fora
do ar. *Estimativa: 1 dia-pessoa.*

### 6.4 — SITE — `PUBLIC_TINA_ADMIN_ORIGIN` no build de cada site

Atende o segundo modo de entrada: a pessoa está no site publicado e clica para editar.
*Estimativa: 0,5 dia-pessoa.*

---

## Fase 7 — Segundo e terceiro sites, e a governança que os segura

### 7.1 — SITE — `colabhd/site-redalint`

Corrigir o `ci.yml`, que usa `push` com `branches-ignore: main` e **nunca roda na main**;
**criar** o projeto na Cloudflare Pages como Direct Upload (hoje ele tem GitHub Pages
habilitado, `status: null`, e nenhum projeto na Cloudflare); adotar o kit e o preset. Convergir
as versões: ele está em `astro-pagefind` ^1.8.3, `theme-change` ^2.5.0, `@astrojs/mdx` ^5.0.0.
*Estimativa: 3 a 5 dias-pessoa.*

### 7.2 — SITE — `lab-ippri-unesp/site-lab`

Mesma stack e mesmas versões antigas do 7.1 (medido em 22/09). **Não medidos** ainda: deploy e
ruleset — ler `gh api repos/lab-ippri-unesp/site-lab/pages` e `.../rulesets` antes de planejar.
*Estimativa: 3 a 5 dias-pessoa.*

### 7.3 — SITE — inventariar `cpps-unesp/site-nepps`

Apareceu na varredura de 22/09 (66 MB, público) e não está em plano nenhum. Ler `package.json`,
deploy e ruleset, e classificá-lo. *Estimativa: 0,5 dia-pessoa.*

### 7.4 — DEVOPS — script `gh` idempotente de ruleset

Lê `classe_ruleset` no `sites.yaml` e aplica o perfil: **site de grupo** = check `ci` +
`non_fast_forward`; **repositório de plataforma** = PR + 1 aprovação + `ci` +
`non_fast_forward`. O mesmo script **publica o estado real lido da API**, para que a
documentação pare de ser fonte sobre configuração — foi assim que o `AGENTS.md` apodreceu.
*Estimativa: 1 a 2 dias-pessoa.*

### 7.5 — DEVOPS — espelho do conteúdo para o parque

`git clone --mirror` de cada repositório do `sites.yaml` mais sincronização do bucket R2, num
volume coberto pelo PBS. Semanal. Hoje a frota existe em **uma cópia só**, no GitHub.
*Estimativa: 1 a 2 dias-pessoa.*

### 7.6 — DECISÃO — ensaiar a saída de um grupo, uma vez

Transferir um repositório de teste, rotacionar os segredos, mover o domínio e copiar a mídia.
**A razão declarada para N repositórios é que sair seja barato** — e uma razão de desenho nunca
testada é hipótese. O ADR-046 dá 5 dias úteis entre pedido e site do grupo respondendo 200 como
limiar de fracasso.

### 7.7 — DEVOPS — procedimento de rollback escrito

Promoção do deploy anterior na Pages (`wrangler pages deployment list`) mais `git revert` do
commit do CMS. **Medir** quantos deploys a Pages retém por projeto — é o que decide o alcance;
listar os deploys do projeto do `devops`, que é o mais antigo que temos. *Estimativa: 0,5
dia-pessoa.*

---

## Fase 8 — O agente

O determinístico não espera GPU nenhuma, e é o grosso do valor: sobrevive inteiro se o agente
for abandonado.

### 8.1 — SITE — scanner de lacuna de i18n

Lê a **classificação de campos** de 3.5 em vez de adivinhar por heurística. Roda no Actions de
cada repositório (público, grátis, sem cota) e publica um **manifesto consolidado** — um
artefato, não uma chamada. *Estimativa: 2 a 3 dias-pessoa.*

### 8.2 — SITE — extrator e remontador dos marcadores

Quebra de linha codificada e `<Destaque texto="…" />` saem do texto antes de qualquer
processamento e voltam depois, **com verificação de contagem**. *Estimativa: 1 a 2
dias-pessoa.*

### 8.3 — SITE — validadores de schema, URL e nome próprio

Sobre qualquer proposta, de máquina ou de gente: **nunca traduzir nome próprio, nunca alterar
URL** — validado depois, deterministicamente, não pedido educadamente antes. *Estimativa: 1 a 2
dias-pessoa.*

### 8.4 — DEVOPS — os dois defeitos do PR #540, cada um com dono

- **Conflito de nó** — `apps/sp/llm/vllm.yaml` e `apps/sp/llm/llamacpp.yaml` põem duas cargas em
  `k3s-sp-gpu-01`, que tem **1 GPU alocável**: uma fica `Pending` desde o primeiro apply. Issue
  no `devops`, dono **Rafael**, resolvida dentro do próprio #540.
- **App-of-apps não recursivo** — os `Application` de `apps/sp` são `Directory` sem bloco
  `directory`: mergear o #540 **deposita arquivos na main e não muda nada no cluster**, por falta
  do `Application` `apps/sp/llm.yaml`. **A CI não acusa.** Não é defeito daquele PR, é uma
  **classe**: issue no `devops`, dono **Arthur**, e a correção (ou o ADR) é lá, não aqui.

### 8.5 — DEVOPS — o endpoint existir

vLLM **v0.29.0** + LiteLLM no namespace `llm`. A versão é pinada por causa do episódio de 21/09:
`gpt-oss-20b` numa RTX A5000 respondeu **só pontos de exclamação** — MXFP4 numa Ampere sem FP4
nativo, caindo em kernel Marlin com bug de dimensões. **O vLLM subiu, ficou ready, o health
check passou**; só o conteúdo mostrava o defeito. Candidato de modelo: `qwen38-27b`, 55,6 GB em
BF16, formato **nativo da sm_120**, TP=1 numa placa — já baixando desde 21/09, e o enlace de
~92 Mbit/s é o recurso mais escasso. **Ler a licença no model card antes de qualquer uso.**

### 8.6 — DEVOPS — o CronJob do agente

CronJob, dois `Secret` (SOPS+age: escrita no GitHub e chave do LiteLLM), uma `NetworkPolicy`
(egress só para o `Service` do LiteLLM e `api.github.com`), ficha no `aplicacoes.yaml` com
`sitio_dono: sp`. **O parque puxa o manifesto; o Actions nunca chama o parque.**
*Estimativa: 2 a 3 dias-pessoa.*

### 8.7 — SITE — guardrails e conjunto-ouro

`dry-run` é o padrão; escrita exige flag. Saída sempre por PR com diff. Saída restrita a schema
por *guided decoding* — que garante **forma, não conteúdo**. **Nunca mandar string bruta de
rich-text ao modelo** (os marcadores saem antes, e o caminho do `set:html` executa o que
chegar — ver 0.6). Conjunto-ouro de 60 segmentos por direção, julgamento cego dos dois
operadores: **90% de publicável** em duas rodadas consecutivas, com iteração de prompt entre
elas, ou o agente cai e ficam o scanner, os validadores e o gate. *Estimativa: 3 a 5
dias-pessoa.*

---

## As duas datas que existem, e vêm dos ADRs

Não são prazos deste plano; são gatilhos de reabertura já escritos:

- **2026-10-31** — se o PR #540 não estiver mergeado, reabre a comparação com a API hospedada
  para o lote frio, agora com custo **medido** em vez de estimado (ADR-047).
- **2026-12-22** — se nenhum site além do `site-cpps` estiver editando pelo admin central,
  reabrir o desenho central; e se as seis peças do CMS não estiverem de pé, cair no **modo
  formulário cross-origin**, que já funciona hoje com Bearer e CORS, como entrega intermediária
  (ADR-043). Na mesma data, se o SSO com grupos não existir, o admin não recebe o segundo grupo
  (ADR-042).

## O que pode ser feito em paralelo, com duas pessoas

- A fase 0 é sequencial e curta: uma pessoa faz, a outra revisa. Nada mais anda antes.
- Depois dela, **fase 2 (hospedagem) e fase 3 (i18n e contraste) correm em paralelo** — uma
  pessoa em cada trilha, porque não se tocam.
- A fase 4 (kit) depende de 3.1–3.6 estarem fechadas no piloto, senão o kit nasce carregando os
  defeitos para dezenas de repositórios.
- A fase 5 (CMS) é a mais longa e a mais arriscada: seis peças sem scaffold. Enquanto ela corre,
  a outra pessoa faz 7.1 e 7.2, que não dependem do CMS.
- A fase 8 tem uma metade (8.1 a 8.3) que **não depende de GPU nenhuma** e pode entrar a
  qualquer momento depois de 3.5.

## Onde este plano pode dar errado

1. **6.1 falhar de um jeito não previsto** — se o `PreviewInner` não funcionar nem com proxy, a
   edição visual cai para o modo formulário e a decisão 3 precisa ser reexaminada.
2. **A fase 5 não fechar.** Seis peças sem scaffold, duas pessoas. O gatilho de plano B é
   2026-12-22 (acima); sem ele, "edição visual agora" vira espera indefinida.
3. **O `ci` verde de 0.1/0.2 ser parcial** — `--local` pode produzir build que passa e admin que
   não publica. É por isso que a verificação está escrita dentro do item.
4. **A frota crescer antes do `create` existir.** Repositório criado à mão é repositório que não
   entra no `sites.yaml`, e a partir daí a fonte única deixa de ser única.
