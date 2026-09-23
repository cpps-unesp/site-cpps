---
title: "ADR-041 — Sites de grupo na Cloudflare Pages por Direct Upload, e nenhum deles no K3s"
description: "Todo site de grupo é HTML estático publicado na Cloudflare Pages por Direct Upload a partir do Actions. Rejeita a integração Git, cuja cota de 500 builds/mês estoura por volta de 8 sites, e a escolha é irreversível por projeto nos dois sentidos."
sidebar:
  order: 44
medido: "2026-09-23"
medidoCom: "leitura de .github/workflows/website.yaml do colabhd/devops (cloudflare/wrangler-action@v3, pages deploy); contagem de public/_redirects no site-cpps (83 linhas, 69 regras efetivas, 34 com curinga); leitura de astro.config.mjs:13-14 e de docs/deploy-e-redirects.md na branch feat/tinacms-visual-editing; gh api repos/colabhd/site-redalint/pages e .../contents/.github/workflows/ci.yml; gh api repos/cpps-unesp/site-cpps/rulesets; contagem de merges por mês e de mídia (141 MB em 281 arquivos) no site-cpps; páginas de limites do Cloudflare Pages e do R2, lidas em 2026-09-22. Em 2026-09-23: curl -sSI contra cpps.franca.unesp.br e devops-website.pages.dev; leitura de pages/configuration/{serving-pages,headers,rollbacks}, pages/platform/limits e do corpus pages/llms-full.txt (965.548 bytes); npx astro build da branch feat/tinacms-visual-editing e da main, servidos por @astrojs/node e por wrangler 4.136.3 pages dev sobre dist/client (semântica real de Pages, 69 regras de _redirects, 404.html); gh api repos/colabhd/devops para contagem de execuções do workflow de deploy — ver VERIFICACOES-2026-09-23.md"
---

## Status

**Proposto** — 2026-09-22. Aguarda revisão de Rafael e Arthur.

## Contexto

São dezenas de sites de divulgação de grupos de pesquisa, um repositório público
por site ([ADR-040](/decisoes/plataforma-sites-n-repositorios/)), identidade visual própria
por grupo e uma equipe central de **duas pessoas**. Este ADR responde onde esse
HTML é servido — e é a única pergunta da casa cujo **custo se multiplica por N**.
Um cluster a mais é um cluster; trinta sites são trinta domínios, trinta
pipelines e trinta objetos que alguém precisa saber reiniciar às 23h de um
domingo, e se os trinta estiverem no K3s uma queda derruba os trinta de uma vez —
inclusive a página que explicaria a queda. Em troca, o conteúdo é estático e não
guarda dado de pesquisa: não há sessão, banco nem o que restaurar, e ele
**sobrevive ao parque inteiro fora do ar** — única classe de coisa nossa da qual
isso é verdade. Pô-lo atrás daquilo que ele deveria sobreviver desperdiça essa
propriedade por construção.

### Três organizações, e uma conta da Cloudflare

Os sites nascem em três organizações do GitHub, todas no plano Free — o quadro
delas está no [ADR-040](/decisoes/plataforma-sites-n-repositorios/) e não se
repete aqui. O que importa para hospedagem é a restrição de mecanismo: **segredo
de organização não cruza org**, GitHub App é instalado em **cada** org, e ruleset
é por repositório. Um **workflow reutilizável em repositório público**, esse,
**cruza** — é chamado por `uses:` de qualquer org, e é o que evita triplicar o
deploy.

**A conta da Cloudflare é uma só, e este ADR é quem decide isso.** Uma conta por
organização dobraria o teto de 100 projetos, mas também triplicaria zona, assento
de Zero Trust, token a rotacionar e lugar onde se procura um deploy — para duas
pessoas, o teto é o problema menor. Os emissores do deploy continuam sendo três,
porque as orgs são três. Todos os gatilhos de lotação desta série contam
projetos **nessa** conta.

### O estado atual está errado em dois pontos verificados

1. **`site-redalint` publica fora da Cloudflare.** Tem **GitHub Pages** habilitado
   (`build_type: workflow`, `status: null` — configurado e nunca construído) e
   **nenhum projeto na Cloudflare Pages**: ele não está do lado errado da escolha
   entre integração Git e Direct Upload, ele ainda não está nela. Também não tem
   ruleset, e o `ci.yml` dispara em `push` com `branches-ignore: main` — ou seja,
   **nunca roda na main**.
2. **A branch `feat/tinacms-visual-editing` do `site-cpps` já quebrou o deploy.**
   Trocou `output: 'static'` por `output: 'server'` com `@astrojs/node`
   (`astro.config.mjs:13-14`). A Pages publica `dist`; com adapter a saída vira
   `dist/client` + `dist/server`, e o `public/_redirects` deixa de valer — a
   sintaxe é proprietária da Pages e um servidor Node não a lê. A contagem, feita
   em 22/09: **83 linhas, 69 regras efetivas, das quais 34 com curinga
   (dinâmicas) e 35 estáticas**. A raiz `/` vai a 404: não
   existe `src/pages/index.astro`; 7 das 9 rotas já são `prerender`. **O time já
   saiu de SSR por esta mesma quebra**, registrado em
   `docs/deploy-e-redirects.md`; a branch refez o erro sem ler o registro.

### Relação com o ADR-021, que foi revogado

O [ADR-021](/decisoes/reduzir-dependencia-cloudflare/) foi **revogado em
2026-08-15**: *"a decisão vigente é a oposta: a Cloudflare fica, e é o caminho
preferido de entrada"*.

:::caution[Aquilo decidiu entrada, não hospedagem]
A política vigente diz que o tráfego **entra** pela Cloudflare — túnel, Access,
DNS. Não diz que o **conteúdo mora** lá. Dezenas de sites na Pages é classe de
carga nova, com cota própria, e é isto que este ADR decide; citar o 021 como se
já resolvesse seria esticar o que ele diz.
:::

## Decisão

**Todo site de grupo é HTML estático publicado na Cloudflare Pages por Direct
Upload a partir do GitHub Actions. Nenhum site entra no K3s.**

### Direct Upload, não integração Git

A integração Git da Pages consome **500 builds/mês** e permite **1 build
concorrente** (lidos em 2026-09-22). Direct Upload **não consome cota de build**:
quem compila é o Actions, e a Pages só recebe arquivos. A conta: o `site-cpps`
sozinho mergeou **30,2 vezes por mês**; com um build por merge mais os de PR, a
cota de 500 estoura por volta de **8 sites** nesse ritmo, e o build concorrente
único vira serialização justamente nos dias em que todo mundo mexe. Direct Upload
elimina as duas restrições, porque Actions em repositório **público** é grátis e
sem cota.

:::caution[A escolha é irreversível por projeto, nos dois sentidos]
Um projeto criado como Direct Upload não vira integração Git depois, e o
contrário também não. Não há migração: há recriar o projeto, com novo histórico
de deploy e nova amarração de domínio. Por isso se decide **uma vez, no molde**.
:::

O molde já existe e roda: `.github/workflows/website.yaml` do `devops` publica o
próprio site com `cloudflare/wrangler-action@v3` (versão lida no arquivo) e
`pages deploy … --project-name=… --branch=…`, com preview por PR comentado no
pull request. O passo é **extrair esse job para um workflow reutilizável, numa
cópia só**, num repositório **público** de `colabhd`, chamado pelos sites das
três orgs por `uses: colabhd/<repo>/.github/workflows/deploy.yml@v1`. O que não é
herdado é workflow no repositório `.github` de uma organização; workflow
reutilizável em repositório público **cruza org**, e é por isso que o
[ADR-040](/decisoes/plataforma-sites-n-repositorios/) põe kit e workflows ali.
Replicar três cópias seria criar, à mão, a deriva que esta série existe para
evitar.

### Os limites que importam, com número e data

Lidos na documentação em **2026-09-22**, sujeitos a mudança:

| limite | valor | folga medida |
|---|---|---|
| projetos da Pages por conta | **100**, e a doc diz que **não é rotineiramente aumentado** | dezenas de sites cabem; centenas não |
| builds por mês (só integração Git) | 500 | **não se aplica** ao Direct Upload |
| builds concorrentes (só integração Git) | 1 | **não se aplica** ao Direct Upload |
| arquivos por deploy | 20.000 | `site-cpps` hoje: 281 arquivos de mídia + páginas; longe do teto |
| tamanho por arquivo | 25 MiB | 141 MB de mídia no total, nenhum arquivo perto disso |
| redirects estáticos | 2.000 | **35** no `site-cpps` (de 69 regras efetivas) |
| **redirects dinâmicos** | **100** | **34** no `site-cpps` — 34% do orçamento gasto no primeiro site |
| redirects, teto **combinado** | **2.100** (2.000 estáticos + 100 dinâmicos) | lido em 23/09; o ADR trazia os dois números e não o teto conjunto |
| regras no `_headers` | **100** | nenhuma: o `site-cpps` não tem `public/_headers` em branch nenhuma |
| tamanho de um header no `_headers` | **2.000 caracteres** | idem — e é este teto que inviabiliza CSP por hash por página ([ADR-044](/decisoes/identidade-visual-por-grupo-tokens/)) |

:::caution[Uma armadilha do `_headers` que morde a arquitetura do CMS]
A doc traz o aviso, lido em 23/09/2026: *"Custom headers defined in the `_headers`
file are not applied to responses generated by Pages Functions, even if the
request URL matches a rule defined in `_headers`."* Se algum site do parque ganhar
uma Pages Function, **cabeçalho de segurança configurado no `_headers` não a
cobre**. Hoje isso é inócuo — a decisão é estático puro —, mas é exatamente a
classe de exceção que a branch `feat/tinacms-visual-editing` já demonstrou saber
criar ao trocar `output: 'static'` por `output: 'server'`.
:::

O limite de redirects é **por projeto** e não acumula com a frota: o risco é o
crescimento de um site. Ainda assim, 34 de 100 no dia zero é o número a vigiar, e
a maior parte é seção fora do ar — dívida que se paga devolvendo conteúdo, não
comprando cota. O teto de **100 projetos** é o único que a frota pode encostar, e
tratá-lo como elástico seria inventar.

**A mídia não espera cota para sair daqui.** Ela vai para o R2 (10 GB-mês grátis,
egress gratuito) **desde o dia um**, e não por limite da Pages: é exigência do
media store self-hospedado do CMS — `media.tina` lança `E_SELF_HOSTED_MEDIA` fora
da TinaCloud ([ADR-042](/decisoes/tinacms-self-hospedado-central/)). Os 20.000
arquivos e os 25 MiB por arquivo deixam de ser gatilho de migração e ficam como
limite a vigiar para o que continuar viajando no deploy — imagem de tema, favicon
e o que já está no git hoje (141 MB em 281 arquivos no `site-cpps`).

### A reversão obrigatória no código, antes de qualquer deploy

A branch `feat/tinacms-visual-editing` precisa desfazer o que quebrou:

1. **`output: 'server'` e `@astrojs/node` saem**; volta `output: 'static'`. O
   backend do Tina é serviço à parte
   ([ADR-042](/decisoes/tinacms-self-hospedado-central/)), não motivo para o site
   virar SSR. **Confirmado empiricamente em 23/09/2026:** `npx astro build` da
   branch produz `dist/client/` **e** `dist/server/entry.mjs`, e **não existe
   `dist/index.html`** — publicar `dist` na Pages subiria o bundle de servidor
   junto e não serviria nada na raiz; o diretório publicável passa a ser
   `dist/client`. O `_redirects` e o `404.html`, esses, saem corretamente dentro
   de `dist/client/`. Na mesma corrida o build avisa
   *"[pagefind] Output type `server` does not produce static \*.html pages … will
   not work with astro-pagefind integration"*, e o script `npm run build` continua
   chamando `pagefind --site ./dist`, que sob adapter aponta para um diretório com
   `client/` e `server/` dentro: o caminho do índice de busca muda junto, e
   ninguém percebeu.
2. **Criar `src/pages/index.astro`** com redirect para a raiz em `pt`. Hoje a
   raiz só funciona porque uma regra do `_redirects` a cobre — e essa regra
   desaparece em qualquer runtime que não seja a Pages.
3. **Portar as 35 regras estáticas** de `public/_redirects` para a chave
   `redirects` do `astro.config.mjs`, que o Astro materializa em páginas de
   redirect no build estático. As 34 regras com curinga, que não têm equivalente,
   ficam no `_redirects` marcadas ali como dependentes da Pages — hoje esse aviso mora num
   `.md` que ninguém leu antes de mexer no `astro.config.mjs`.
4. **Corrigir `README.md` e `docs/deploy-e-redirects.md`** para dizer Direct
   Upload, e não integração Git.

### Zonas: o padrão e o caso especial

Sites nascem em **zona nossa** — `colabh.org`, `cppsunesp.org`, `labriunesp.org`,
`lab-ippriunesp.org` —, com Universal SSL em um nível só
([ADR-016](/decisoes/hostnames-um-nivel/)). `cpps.franca.unesp.br` é da UNESP e
cada mudança de DNS ali exige chamado: **caso especial, não padrão**.

**O CNAME pendurado do `nefits` é risco, não anedota, e sai antes de qualquer
outro trabalho naquele site.** `nefits.franca.unesp.br` aponta para
`labriunesp.github.io`, conta do GitHub que **não existe**: é um registro em
domínio institucional de terceiro apontando para um nome que qualquer pessoa pode
registrar e passar a servir — conteúdo arbitrário sob um hostname `unesp.br`, com
certificado válido. A decisão: **abrir chamado na UNESP para remover ou reapontar
o registro**, e só depois discutir a reconstrução do site. **Não verificado** se o
nome `labriunesp` segue disponível no GitHub para registro por terceiro;
verificaria tentando a criação da organização com esse nome, ou consultando
`api.github.com/users/labriunesp`, e registrando a data da leitura. A classe do
problema — CNAME que sobrevive ao destino — vira verificação periódica no critério
7.

### O que fica na infra própria: a lista fechada

São **quatro** peças próprias em toda a plataforma de sites, e esta é a lista —
os outros ADRs da série citam-na em vez de cada um declarar a sua como "a única":

| peça | onde | decidida em |
|---|---|---|
| **monitoramento externo** dos sites | K3s, no parque | aqui |
| **contingência de saída** | K3s, no parque | aqui |
| **contêiner do CMS** | K3s, no parque | [ADR-042](/decisoes/tinacms-self-hospedado-central/) |
| **CronJob do agente de tradução** | K3s de SP | [ADR-047](/decisoes/agente-de-traducao-local-cliente-do-endpoint/) |

As duas primeiras existem pela mesma razão — **não podem depender do que
observam**:

- **Monitoramento externo**: um `GET` na raiz de cada hostname do `sites.yaml`,
  rodando **no nosso parque**. O princípio do [ADR-027](/decisoes/plataforma-observabilidade/)
  é que o vigia fica **fora do objeto vigiado**: lá o objeto vigiado é o parque e
  o deadman é um Worker da Cloudflare; aqui o objeto vigiado é a Cloudflare, então
  o vigia inverte e vai para o parque. Pôr o blackbox dos sites num Worker seria
  hospedar o alarme dentro do prédio que ele vigia.
- **Contingência de saída**: capacidade **provada** de servir o `dist` de um site
  a partir do K3s se a Pages cair ou mudar de termos. Sem ensaio, é uma frase.

### Rollback de publicação

Com Direct Upload e sem aprovação humana no merge
([ADR-046](/decisoes/classe-leve-para-sites-de-divulgacao/)), um save do editor
vira commit, a CI passa — ela valida build, schema e contraste, **não conteúdo** —
e a página vai ao ar. O procedimento, em duas camadas:

1. **No ar, agora**: `wrangler pages deployment list` e promoção do deploy
   anterior no projeto. Quem executa é o `responsavel_tecnico` daquele site no
   `sites.yaml`; fora do horário, não há plantão, e isso é parte do que a classe
   leve aceita.
2. **No git, em seguida**: `git revert` do commit do CMS, senão o próximo deploy
   republica o conteúdo ruim.

**Medido parcialmente em 23/09/2026: a doc não publica número, e a evidência aponta
para não haver poda — mas o número real continua sem medição.** A página de
[limites](https://developers.cloudflare.com/pages/platform/limits/) **não lista
qualquer limite de deploys retidos por projeto**, e a de
[rollbacks](https://developers.cloudflare.com/pages/configuration/rollbacks/)
(atualizada em 2026-04-21) diz apenas *"Any production deployment that has been
successfully built is a valid rollback target"*, sem teto. Duas passagens da
própria doc indicam que a Pages **não poda sozinha**: há tutorial oficial
ensinando a apagar deploys antigos por Worker com cron (*"you can use the API to
delete deployments after a month"*) e um *known issue* registrando que *"you may
not be able to delete your Pages project if it has a high number (over 100) of
deployments"* — plataforma que poda não gera nenhum dos dois. Para contraste, o
Workers publica teto explícito de 100 versões para rollback; a Pages não publica
equivalente. Dado indireto da casa: o workflow de deploy do `colabhd/devops`
acumula **536 execuções bem-sucedidas desde 2026-05-11**, e ninguém notou poda.

**O que falta, e o que já se tentou.** Falta `wrangler pages deployment list
--project-name=devops-website` e contar as linhas: não foi rodado por **ausência de
`CF_API_TOKEN` na estação**. O caminho mais barato, tentado e descartado, foi
curlar as URLs de preview antigas colhidas dos comentários de PR do `devops`: o
**Cloudflare Access** na frente da zona devolve `302` para a tela de login tanto
para deploy vivo quanto para hash inventado, o que torna os dois indistinguíveis.
Em projeto **sem** Access o discriminador existe (hash inventado devolve `404`),
mas não temos hashes antigos desse projeto. Fecha-se isto com token de API, ou com
um service token do Access. **Até lá o runbook de rollback assume alcance amplo mas
não promete profundidade**, e a camada 2 (`git revert`) continua sendo a que de
fato garante a correção.

Nada mais: nenhum site recebe `Ingress`, `Application` do ArgoCD ou ficha no
inventário. `website/src/data/inventario/aplicacoes.yaml` tem schema Zod strict
com `sitio_dono` restrito ao enum `franca`/`sp` — **um site na Cloudflare é
literalmente irrepresentável nele** —, e a guarda de CI
(`.github/scripts/guarda-apps.py:17`) só indexa `apps/franca`, `apps/sp` e
`apps/multi` (as 14 fichas já não incluem `devops.colabh.org` nem
`trilhas.colabh.org`). A frota precisa então de **registro próprio**; este ADR
não decide o formato, decide que o inventário não é o lugar.

## Alternativas rejeitadas

**Sites no K3s, com Traefik e túnel.** O argumento mais forte a favor: é onde a
casa já sabe operar — `Ingress` por túnel é decisão vigente
([ADR-029](/decisoes/ingress-por-tunel/)), GitOps e monitoramento existem, e um
site estático num nginx é o workload mais barato que há; trinta deles não pesam
num cluster que roda vLLM. Rejeitada por **raio de falha e custo por unidade de
operação**: trinta sites são trinta `Application`, trinta `Ingress`, trinta
hostnames no túnel e trinta objetos que uma queda derruba junto, e o guia *"Como
pôr uma aplicação no parque"* tem oito etapas com portões, desenhadas para
aplicação com estado. Trinta vezes isso, com duas pessoas, é a equipe inteira em
cerimônia para servir HTML — e as restrições de 2026-09-19 ainda proíbem coisa
nova em `vm-cpps-02` e `k3s-franca-05`.

**GitHub Pages**, que o `site-redalint` tem habilitado hoje. O argumento mais
forte: grátis, mora na mesma org do repositório e dispensa o token de conta da
Cloudflare — não há segredo para replicar em três orgs. Rejeitada por três
razões. **Não há equivalente do `_redirects`**, e as 69 regras do `site-cpps` não
têm para onde ir. **Fragmenta a borda**: metade da frota atrás da Cloudflare são
duas histórias de TLS, cache e diagnóstico. E **não há preview por PR** — que
serve à equipe central na revisão de mudanças de **código** (kit, layout,
`_redirects`, `astro.config.mjs`), não à publicação de conteúdo pelo CMS, que por
desenho **não** passa por revisão: o `IsomorphicBridge.put()` commita por arquivo
gravado e o ADR-046 tira a exigência de aprovação justamente para que o editor
publique sozinho. O `site-redalint` migra — é o trabalho que esta decisão cria.

**Workers Static Assets**, que a própria Cloudflare recomenda para projetos
novos. É a alternativa séria: é onde a Cloudflare investe e os Workers não têm o
teto de 100 projetos — justamente o limite que esta frota pode encostar. **Não
verificamos** se há declaração de manutenção da Pages; verificaria na página de
produto e no changelog antes de usar isso como argumento, e o critério 2 abaixo
não depende disso — depende de anúncio. A médio prazo, é provável que seja o
destino. Rejeitada **agora, e só agora**: o molde que já roda na casa é
`pages deploy` (`.github/workflows/website.yaml` do `devops`), e trocar de
produto na mesma decisão em que se padroniza joga fora a prova que o molde tem;
`_redirects` e `_headers` não têm tradução direta, e as 34 regras dinâmicas do
`site-cpps` virariam código no Worker. **Não foi verificado** como ele se comporta
com preview por PR e domínio próprio por projeto na conta Free — é o que se
verificaria antes de reabrir, e é a alternativa que o critério abaixo vigia.

## Consequências

**Aceita-se que a disponibilidade dos sites passa a ser da Cloudflare.** Uma
queda da Pages derruba a frota toda, e não temos como consertar — só comunicar.
Em troca, a frota deixa de cair junto com o parque, que é o modo de falha que de
fato acontece conosco. Trocar um modo de falha que ocorre por um que não
controlamos é a escolha consciente, e é o que o monitoramento externo e a
contingência de saída existem para tornar reversível.

**Aceita-se um token de conta mais amplo do que se gostaria, em três cópias.** O
escopo `Pages:Edit` é **de conta e não é escopável por projeto**: qualquer
repositório que o tenha publica em **qualquer** projeto da Pages. E porque
**segredo de org não cruza org**, ele existe em `colabhd`, `lab-ippri-unesp` e
`cpps-unesp` — três lugares para rotacionar, três para vazar. Mitigação mínima:
token dedicado aos sites, dono nomeado conforme `diretrizes/iam.md`, rotação
registrada. O **workflow** não precisa de cópia: reutilizável em repositório
público de `colabhd`, ele é chamado por `uses:` das três orgs — o que se triplica
é o segredo, não o código.

**Aceita-se que Direct Upload joga a complexidade do build para o Actions.** A
Pages deixa de compilar, então quebrou o build é quebrou o CI — e o CI de hoje
não está pronto: `npm run ci` do `site-cpps` **falha em checkout limpo** (`tsc`
antes de `tinacms build`, `tina/__generated__` gitignorado, TS2307 em
`src/lib/tina/pages.ts:8`). É pré-requisito, não consequência.

**A proteção de branch é desigual, e passa a importar mais.** Com Direct Upload,
quem escreve na `main` publica: ausência de ruleset deixa de ser higiene e vira
controle de acesso ao site no ar. `cpps-unesp/site-cpps` tem ruleset **ativo**
`Protect main` — PR, 1 aprovação, `non_fast_forward` e check `ci` obrigatório (o
`AGENTS.md` do repo afirma o contrário e **está errado**; corrigir);
`site-redalint` não tem ruleset nenhum; e no GitHub Free **repositório privado
não aceita ruleset nem branch protection** (403 na API), o que faz de
`lab-ippri-unesp/site-odr` um repositório que não pode ser protegido e colide com
o requisito de repositório público.

**Três repositórios (`gedai`, `lantri`, `nefa`) criados em 2026-06-11 seguem com
`size` 0** — a medida honesta da capacidade da equipe: antes de multiplicar
projetos da Pages, esses três precisam existir ou ser fechados.

**Aceita-se, por ora, um parque sem cabeçalho de segurança nenhum.** Medido em
23/09/2026, em dois projetos e duas zonas: os sites saem sem `Strict-Transport-Security`,
sem `X-Frame-Options`, sem `Permissions-Policy` e sem `Content-Security-Policy` — a
Pages **não injeta CSP**, e o que ela acrescenta é só
`access-control-allow-origin`, `cache-control`, `referrer-policy`,
`x-content-type-options`, `server` e `cf-ray`. Isso é o que faz o iframe do editor
visual funcionar hoje ([ADR-043](/decisoes/edicao-visual-cross-origin/)) — por
**ausência** de política, não por desenho — e é item de auditoria esperando
acontecer em sítio de universidade pública. A correção é barata e herdável:
`public/_headers` no kit, uma vez. O caminho de menor risco começa por
`X-Frame-Options`/`frame-ancestors` (listando `cms.colabh.org`) e HSTS, que não
tocam em inline, e deixa CSP para depois do inventário de `<script>` inline que o
[ADR-044](/decisoes/identidade-visual-por-grupo-tokens/) descreve.

**Não verificado:** o tempo de `pages deploy` de um site já construído — mede-se
cronometrando o passo do `wrangler-action` em três deploys seguidos do primeiro
site no molde. A retenção de deploys, que decide o alcance do rollback, está na
seção de rollback acima, e continua **parcial** pelo motivo escrito lá: falta o
token de API.

## Critério de revisão

1. **A frota passar de 70 projetos da Pages** — 70% do teto de 100 que a doc diz
   não aumentar de rotina → Workers Static Assets vira plano de migração.
2. **A Cloudflare anunciar fim de vida da Pages** ou parar de aceitar projetos
   novos → reabrir no dia do anúncio, não no do desligamento.
3. **Um site encostar em 80 redirects dinâmicos** (hoje o máximo é 34, no
   `site-cpps`) → aquele site precisa de Worker, e vale perguntar se ainda é um
   site estático.
4. **Duas indisponibilidades da Pages acima de 30 minutos em 12 meses**, medidas
   pelo monitoramento externo → a contingência de saída vira desenho ativo.
5. **O ensaio de contingência falhar, ou não ser executado por 12 meses** → a
   reversibilidade prometida aqui não existe. Reabrir.
6. **A UNESP delegar a zona `franca.unesp.br`, ou recusar um chamado de DNS
   necessário** → o caso especial vira política, num sentido ou no outro.
7. **Uma varredura semestral encontrar CNAME apontando para destino inexistente**
   em qualquer hostname do `sites.yaml` — a classe de problema do `nefits` —, ou o
   chamado de remoção daquele registro ficar sem resposta por 60 dias → escalar na
   UNESP e registrar o risco por escrito para o grupo dono do hostname.
