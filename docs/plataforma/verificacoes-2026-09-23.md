# Verificações de 2026-09-23 — o que saiu do "não verificado"

Os oito ADRs da leva (040 a 047) foram escritos em 22/09/2026 marcando honestamente o que não
tinha sido medido. Em **23/09/2026** seis dessas lacunas foram para a bancada: cada uma foi
verificada por um agente, e cada verificação foi **auditada por um segundo agente**, que
reproduziu o método e tentou derrubar o resultado. Duas conclusões caíram na auditoria, e é a
versão auditada que está escrita nos ADRs.

**Regra que valeu na bancada, e que vale para quem repetir:** um veredito só conta com método e
saída real colados no relato, e "a documentação diz" é verificação da promessa da doc, não do
comportamento. Onde não deu para medir, o veredito é *inconclusivo* ou *parcial*, e o que faltou
está escrito — nunca apagado.

Bancadas preservadas em `/var/tmp/verif-*` e `/var/tmp/verif-*-auditoria/`, na estação de Rafael.

---

## O que foi medido

| afirmação verificada | veredito | método, em uma linha | o que mudou no ADR |
|---|---|---|---|
| **ADR-043** — `PUBLIC_TINA_ADMIN_ORIGIN` faz o `src` do `PreviewInner` sair absoluto, e o laço de 100 ms impede a sincronia? | **parcial** (hipótese refutada; conclusão da 1ª bancada derrubada na auditoria) | Pacotes instalados (`tinacms` 3.13.0, `@tinacms/app` 2.5.13, `@tinacms/astro` 0.7.0, `react-router` 6.30.6) + Chrome headless em duas origens reais (127.0.0.1:5310 × :5311): leitura de `preview.tsx:24` e `dist/index.js:76253-76285`; laço de 100 ms executado com o corpo copiado do bundle; `HashRouter` + `navigate()` + `useParams` reais; `resolvePath('/~//host/path','/')` | A causa mudou de nome e o **proxy de preview ficou**: o item 2 continua obrigatório, o item 3 foi reescrito para dizer o que a variável realmente liga (allowlist do bridge), o critério 1 foi marcado como cumprido e substituído, e entrou um critério 6 novo sobre o modo `output: 'static'` |
| **ADR-040** — Tailwind 4 não varre `node_modules`, e uma Astro Integration do kit resolve isso? | **confirmado**, nas duas pontas, com uma ressalva de ordenação que ninguém tinha | Site Astro 6.4.8 + Tailwind 4.3.3 com pacote instalado por `npm pack` + tarball (diretório real em `node_modules`, não symlink), em `astro build` e `astro dev`, com e sem `@source`, com e sem integração, mais controles com `.gitignore` e com o cabeçalho DaisyUI real do `site-cpps` | A armadilha 1 virou fato medido (5.609 bytes sem uma classe do pacote, build verde); entrou o `:::caution` da ordenação de plugins Vite, com as saídas (a) e (b) e a adoção de (b); e a orientação de glob foi **invertida** — `@source` varre demais, não de menos |
| **ADR-044 / ADR-041** — a Cloudflare Pages entrega CSP que bloqueie o `<style>` inline dos tokens? E quantos deploys ela retém? | **parcial** (CSP: confirmado que não injeta; precedente de inline em produção: refutado. Retenção: inconclusivo) | `curl -sSI` contra dois projetos em duas zonas; corpus `pages/llms-full.txt` (965.548 bytes); Chrome 152 por CDP contra a URL de produção e contra a mesma página local sob cinco políticas de CSP, com controle positivo | ADR-044: o mecanismo de injeção pode ser fechado, com `:::caution` registrando que **não há precedente de inline vivo em produção**, mais a saída `tokens.css` e o achado de que uma CSP futura derruba Google Fonts e Font Awesome. ADR-041: retenção reescrita como parcial, com o que se tentou; entraram três limites novos na tabela e a armadilha do `_headers` × Pages Functions |
| **ADR-042** — existe implementação ou teste do mapeamento grupo → tenant, e o 403 cross-tenant é nosso? | **parcial** (afirmação do ADR confirmada; a tese-bônus de isolamento foi derrubada na auditoria) | `@tinacms/graphql` 2.4.11 + `@tinacms/datalayer` 2.0.29: duas `Database` no mesmo processo sobre o **mesmo** level físico, com e sem `namespace`, com e sem collection `detached`; `TinaNodeBackend` real em 127.0.0.1:5340-5341 com `PUT` cross-tenant por HTTP antes e depois do `authProvider` próprio | As **seis peças viraram sete** (roteador de tenant); a seção multi-tenant ganhou o caso negativo medido (200 sem código nosso, 403 com doze linhas) e as **duas condições obrigatórias** de isolamento; entraram as travas de versão (`abstract-level` 1.x, `@tinacms/datalayer` 2.0.29) e o `defineConfig` do kit como requisito de segurança |
| **ADR-045** — as quatro URLs `/en/` e `/es/` com slug em português dão 404 ou redirecionam? | **confirmado** | `npx astro build` da branch e da `main`; `dist` servido pelo adapter node e, na auditoria, por `wrangler pages dev` sobre `dist/client` (semântica real de Pages, 69 regras de `_redirects`, `404.html`); `curl` com e sem barra final; varredura de links internos nos dois `dist` | O "não verificado" virou fato: **404 duro, sem redirect, também na emulação da Pages**, e é **regressão da branch**. A decisão 4 passou de higiene a conserto de 404. Entrou um `:::caution` com os seis breadcrumbs quebrados (anteriores à branch) e a guarda por `ui.validate` |
| **ADR-040** — o agrupamento do Renovate e a sobreposição entre sites reduzem os 1.045 PRs/mês, e em quanto? | **parcial** (agrupamento medido; o número mensal não) | `npx renovate@44.108.2`, `RENOVATE_PLATFORM=local`, dry-run, sobre o `package.json` e o `package-lock.json` reais do `site-cpps`, em três configurações; `gh pr list --state all --author "app/dependabot"` (254 PRs); doc em `renovatebot/renovate@bdf59d6` | O `:::caution` da projeção foi substituído: agrupamento **13 → 7 branches** (fator 1,86), sobreposição 96,4% que corta **decisão e não PR**, e o volume passou de "1.045" para a **faixa 300–970/mês**, dependente de um `schedule` que ninguém escreveu. O critério 2 trocou de denominador e o critério 1 ganhou a condição que o torna coerente. Fechou de graça a lacuna do Renovate App gratuito |
| **ADR-044** — existe bloqueio declarativo no Tina que torne o componente de cor indisponível? | **parcial** | Leitura do registro de plugins do `tinacms` 3.13.0 e do `validateSchema` do `@tinacms/schema-tools` 2.10.0 (com controle negativo); `FormBuilder` real renderizado em jsdom com e sem `cms.fields.remove('color')`; guarda de referência executada contra o `tina/config.ts` real e contra três configs envenenados | A `:::tip` da regra foi reescrita: **declarativo não existe**, mas `cms.fields.remove('color')` no `cmsCallback` remove de verdade; o `grep` sai e a guarda entra como **lista-branca sobre o config compilado** (a lista-negra proposta foi derrubada por contraexemplo na auditoria); `cmsCallback` de site vira proibido; entrou o parágrafo do `ui.validate` que desabilita o Save |

---

## As duas conclusões que a auditoria derrubou

Ficam registradas porque a lição é de método, não de conteúdo.

**1. A edição visual cross-origin *não* funciona sem proxy.** A primeira bancada concluiu que
sim, em modo degradado, por um caminho protocolo-relativo (`ui.router` devolvendo `//host/path`).
O caminho foi verificado em três pedaços isolados — `matchPath` sozinho, atribuição crua de
`window.location.hash`, leitura do `slice(1)` no papel — e nunca com a chamada real,
`navigate()`. A auditoria rodou a cadeia inteira e mostrou que `resolvePath` do react-router
6.30.6 **colapsa o segmento vazio**: `navigate("/~//host/path")` chega ao iframe como
`/host/path`, na origem do admin, 404. O `//` só sobrevive em hash colada à mão, inalcançável por
dentro do admin. **Consequência para o pacote:** o ADR-042 **não** perde o argumento da edição
visual, e o item 2 do ADR-043 **não** vira otimização.

**2. Duas `Database` num datalayer compartilhado *podem* vazar.** A primeira bancada concluiu que
não vazam, a partir de um caso fácil — collection normal, consultada por `document(relativePath)`.
A auditoria derrubou em duas configurações: sem `namespace`, os dois tenants caem no mesmo
sublevel; e com collection `isDetached: true` — que é como a *auth collection* self-hospedada mora
no datalayer — o `appLevel` **não é namespaced**, e o tenant B lê o documento do tenant A antes de
qualquer escrita, com o arquivo de B intacto e ignorado no disco. **Consequência para o pacote:**
o ADR-042 não pode registrar "pode compartilhar datalayer"; registra as duas condições, ou um
adapter físico por tenant.

---

## Correções de fato que entraram de carona

- **`overrides: { "vite": "^7.3.2" }` no `package.json` do `site-cpps` (linhas 40-42) é
  load-bearing e não está em ADR nenhum.** Sem ele, npm 11 resolve `@tailwindcss/vite` 4.3.3
  contra vite 8 (rolldown) e o build morre com `Missing field 'tsconfigPaths'` — erro que não diz
  "versão errada de vite". Com dezenas de repositórios, essa linha deriva. Entrou na tabela de
  fronteira do ADR-040 como responsabilidade do **kit**, não de cada `package.json` copiado.
- **`site-redalint` e `site-lab` não são duas derivas, são uma cópia:** dos 14 pacotes que os dois
  compartilham, **os 14 têm range idêntico**, enquanto nenhum dos 12 comuns aos três bate com o
  `site-cpps`. A classe "converge" do ADR-040 é uma migração a projetar, não duas.
- **Os sites saem sem cabeçalho de segurança nenhum** — sem CSP, sem HSTS, sem `X-Frame-Options`,
  sem `Permissions-Policy`. O iframe do editor funciona por **ausência** de política. Registrado
  no ADR-041 (consequências) e no ADR-043 (`frame-ancestors` vira requisito dele também).
- **`GETTING_STARTED.md` não existe no pacote publicado do `@tinacms/astro` 0.7.0**, embora o
  README o cite duas vezes. Quem apontar para ele como fonte de wiring está apontando para o
  vazio.
- **Bug upstream que vale reportar:** o `setInterval` do `PreviewInner` nunca é limpo
  (`useEffect` sem cleanup) e não tem `try/catch`. Três linhas resolveriam o ruído inteiro em
  cross-origin. É o PR mínimo a mandar ao `tinacms`.
- **O índice do Pagefind muda de lugar com o adapter:** sob `output: 'server'` o build avisa que
  `astro-pagefind` não funciona, e `pagefind --site ./dist` passa a apontar para um diretório com
  `client/` e `server/` dentro. Mais um motivo para a reversão do ADR-041.

---

## O que continua sem verificação

Nada aqui foi apagado dos ADRs; cada item continua escrito no seu lugar, com o que falta.

| lacuna | onde está escrita | o que já se tentou | o que falta, e por quê |
|---|---|---|---|
| **Fluxo de formulários do Tina ponta a ponta** (priming das ilhas, `forms:add`, `updateData`) em `output: 'static'` | ADR-043, *O que continua sem verificação*, item 1 | Medimos o **transporte** (iframe, `postMessage`, allowlist), não a carga. E a bancada rodou sobre o worktree `output: 'server'`, que é a configuração proibida pelo item 5 | Um build `output: 'static'` do `site-cpps` servido na segunda origem. É o **primeiro** trabalho antes de prometer modo visual a qualquer grupo: há evidência documental de que o modo estático depende de `/tina-island/[name]`, rota `prerender: false` que exige adapter |
| **O proxy sob `/preview/<slug>/` quebra caminhos relativos?** | ADR-043, mesma seção, item 2 | Nada: o proxy não existe ainda | Contar 404 de asset numa navegação completa pelo preview, depois que o proxy existir |
| **Retenção de deploys da Cloudflare Pages** | ADR-041, seção *Rollback de publicação* | Doc lida (nenhum número publicado; duas passagens indicam que não há poda; 536 deploys do `devops` desde 11/05 sem sinal de poda). Tentado curlar previews antigas: o **Cloudflare Access** devolve 302 igual para deploy vivo e para hash inventado | `wrangler pages deployment list --project-name=devops-website`. Falta **`CF_API_TOKEN`** na estação — ou um service token do Access |
| **Volume mensal de PRs com Renovate** | ADR-040, `:::caution` da projeção, e critério 1 | Agrupamento medido (13 → 7 branches). Taxa base medida (30,9–37,3/mês em meses completos) | **Decidir e benchar o `schedule`.** O preset testado não o declara, o padrão do Renovate é *at any time* e o App gratuito roda de 4 em 4 horas. Sem essa decisão o número fica entre 300 e 970 |
| **Granulado fino de autorização no Tina** (negar *um documento* dentro do tenant) | ADR-042, seção multi-tenant | Provado que o 403 por **tenant** funciona com doze linhas | `isAuthorized` só vê a requisição crua; negar por documento exige ler `req.body.query`/`variables` e interpretar GraphQL. Nada no Tina ajuda |
| **O `oauth2-proxy` entrega o grupo do Authentik em cabeçalho?** | ADR-042, seção multi-tenant | Na bancada foi um `x-grupo` inventado | Subir o `oauth2-proxy` v7.6.0 contra o Authentik e ler os cabeçalhos que chegam ao backend |
| **Inventário de rotas do backend do Tina** | ADR-042, seção multi-tenant | `secure: true` existe só em `gql`, verificado | Toda rota acrescentada por `extraRoutes` (auth, mídia) entra sem passar pelo porteiro de tenant e precisa de gate próprio — ainda não escrito |
| **Contraste no modo escuro**, e o contraste de qualquer par do catálogo | ADR-044, consequências | Nada em 23/09 | O catálogo ainda não existe; a medição é a primeira tarefa depois da faxina |
| **Parecer jurídico da UNESP** sobre o enquadramento do parque na LBI / eMAG | ADR-044, seção do gate | Nada | Procuradoria Jurídica da UNESP — fora do teclado |
| **2FA exigido nas três organizações do GitHub** | ADR-040, seção de donos das orgs | A API não devolveu o campo | *Settings → Authentication security* de cada org, à mão |
| **Tempo de `pages deploy`** de um site já construído | ADR-041, consequências | Nada | Cronometrar o passo do `wrangler-action` em três deploys seguidos do primeiro site no molde |
| **Tempo de reindexação** do datalayer para dezenas de sites | ADR-042, *O índice do Tina é estado derivado* | Nada | Reindexar `site-cpps` e `site-redalint` e extrapolar por número de documentos |
| **`tinacms build --local` produz admin publicável?** | ADR-042, *Ordem do conserto do `ci`* | Nada | Abrir o `/admin` do artefato de CI e tentar um save |
| **Workers Static Assets**: preview por PR e domínio próprio por projeto no Free; e declaração de manutenção da Pages | ADR-041, alternativas | Nada | É o que se verifica antes de reabrir a alternativa |
| **`labriunesp` segue disponível no GitHub?** (o CNAME pendurado do `nefits`) | ADR-041, seção de zonas | Nada | `api.github.com/users/labriunesp`, com a data da leitura registrada |
| **i18n de primeira classe no `tinacms`** | ADR-045, alternativas rejeitadas | Nada | Auditar changelog do `tinacms` e do `@tinacms/cli` antes de escrever o resolvedor |
| **Custo por requisição do `TinaNodeBackend` em Workers**, e qual adapter faz a ponte | ADR-042, alternativas | Correção de precisão: o obstáculo não é o handler (147 linhas, sem `express`), são `Database`/`FilesystemBridge`/`isomorphic-git` | Deploy de teste e `wrangler tail`, se a alternativa for reaberta |
| **Política de privacidade própria da UNESP** a que estes sites devam se submeter | ADR-046, obrigações | Nada | Pergunta institucional, fora do teclado |
| **Tamanho total da frota espelhada** | ADR-046, obrigação do espelho | Nada | Só há um site no ar; mede-se quando houver frota |
| **Replicação de ruleset por repositório sem script** | ADR-046, fim do arquivo | Nada | Depende de mecanismo do GitHub que não confirmamos existir |
| **Quantos falsos positivos um scanner heurístico de i18n produz** | ADR-047, peças determinísticas | Nada | Rodar a versão heurística sobre os doze JSON de `src/content/tina-pages/` e comparar com a classificação de campos do ADR-045 |
| **Taxa de tradução publicável do modelo local** | ADR-047, consequências | Nenhum modelo serviu ainda | Depende do PR #540 subir o endpoint |

---

## Decisões do pacote que a medição reabre

1. **Nenhuma decisão caiu.** O proxy de preview fica (ADR-043 item 2), o self-hosted mantém o
   argumento da edição visual (ADR-042), o field-based fica (ADR-045), o Direct Upload fica
   (ADR-041), os tokens por `<style>` inline ficam (ADR-044).
2. **Uma decisão precisa ser tomada e não existia:** a **cadência do Renovate** (`schedule` no
   preset compartilhado). Ela fixa o volume de PRs dentro da faixa 300–970/mês e é pré-requisito
   para o critério 1 do ADR-040 significar alguma coisa.
3. **Uma fronteira do kit ganhou peso de segurança:** o `defineConfig` comum, exportado pelo
   `@colabhd/site-kit`, deixa de ser conveniência e vira o único lugar onde a proibição do
   seletor de cor é auditável (ADR-042 e ADR-044).
4. **Um conflito novo entra na fila:** o wiring do `@tinacms/astro` 0.7.0 pressupõe rota
   on-demand, e o ADR-043 item 5 proíbe adapter. Não reabre o item 5 — reabre a pergunta de como
   o site estático entrega o bridge, e é o critério 6 novo do ADR-043, com data em 2026-12-22.
