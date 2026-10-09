# Deploy e Redirects

Como o site é publicado, como atualizar o EmDash sem perder dados e como os redirects de URL são gerenciados.

## Arquitetura de deploy

O site roda inteiro na Cloudflare, como um **Worker** (`output: 'server'` com o adapter `@astrojs/cloudflare`):

| Recurso | Binding | Para quê |
|---|---|---|
| Worker `cpps-site` | — | Renderiza as páginas que leem o EmDash e serve o admin em `/_emdash/admin` |
| Static Assets | `ASSETS` | Arquivos de `dist/client/`: imagens de `public/`, CSS, JS, páginas pré-renderizadas (404 e 500), `robots.txt` e `_redirects`. São servidos sem acionar o Worker |
| D1 `cpps-site` | `DB` | Banco do EmDash (conteúdo, usuários, traduções) |
| R2 `cpps-site-media` | `MEDIA` | Imagens e arquivos enviados pelo admin |
| KV (criado pelo adapter) | `SESSION` | Sessões de login do admin |
| Images | `IMAGES` | Redimensiona as imagens do R2 (`/_image?...`), criado pelo adapter |
| Cron Trigger (a cada minuto) | — | Publicação agendada, backups e manutenção do EmDash (ver [Cron](#cron-e-publicação-agendada)) |

A configuração fica em `wrangler.jsonc`; o build gera a versão completa em `dist/server/wrangler.json`. A entrada do Worker é `src/worker.ts`.

## Conta, limites e login

- **Conta e limites do plano gratuito.** Os limites do Workers Free são por conta, não por site: 5 Cron Triggers, 10 bancos D1, 100 mil requisições por dia, 10 ms de CPU por requisição, 5 milhões de linhas lidas e 100 mil escritas por dia no D1, mil escritas por dia no KV e 5 mil transformações de imagem por mês. O CPPS cabe sozinho; dezenas de sites numa mesma conta gratuita não cabem (o sexto já fica sem cron). Antes do segundo site, decida entre uma conta por grupo de pesquisa ou o Workers Paid (US$ 5/mês por conta). No ambiente de teste, as páginas gastaram 15 ms de CPU na mediana e até 153 ms, acima dos 10 ms do plano gratuito ([ambiente-de-teste.md](ambiente-de-teste.md#tempo-e-cpu)).
- **Login.** No plano gratuito o Worker não envia e-mail: não há link mágico nem recuperação de conta por e-mail, e convites são copiados à mão. Cada pessoa entra com passkey. Tenha **pelo menos dois administradores**: se o único perder a passkey, a saída é mexer direto no banco. Uma alternativa é o Cloudflare Access (gratuito até 50 pessoas), que pode substituir a passkey e mandar código por e-mail; ver o guia [Deploy to Cloudflare](https://docs.emdashcms.com/deployment/cloudflare/) do EmDash.
- **Papéis.** Admin (50) gerencia usuários e o modelo de conteúdo: só para quem mantém o site. Editor (40) publica tudo: coordenação e professores. Author (30) publica o próprio conteúdo e Contributor (20) só cria rascunhos: estudantes.

## Ambiente de teste

Para experimentar sem mexer no conteúdo de verdade, há um site separado em https://cpps-site-teste.cpps-franca.workers.dev: o Worker `cpps-site-teste`, com banco, bucket e sessões próprios (bloco `env.teste` do `wrangler.jsonc`, que não herda bindings nem vars da produção). Serve para testar mudanças grandes, como uma atualização do EmDash, e para ensaiar a migração para o domínio. Enquanto existir, ocupa 1 dos 5 crons e 1 dos 10 bancos da conta gratuita.

Como foi montado, como publicar uma versão nova, o que o teste mostrou e como apagar tudo: [ambiente-de-teste.md](ambiente-de-teste.md).

## Produção antes do domínio

Desde 09/10/2026 o site com o EmDash está no ar em https://cpps-site.cpps-franca.workers.dev, e é lá que o conteúdo é editado. O endereço oficial, `cpps.franca.unesp.br`, continua apontando para o Pages até a [migração](#migração-para-o-domínio); até lá, o que for publicado no site atual precisa ser repetido aqui.

| Recurso | Nome |
|---|---|
| Worker | `cpps-site` |
| Banco D1 | `cpps-site`, na região ENAM |
| Bucket R2 | `cpps-site-media` |
| KV de sessões | `cpps-site-session` |

Como foi montado, para refazer em outro site:

1. Crie o banco na região que o *placement* do `wrangler.jsonc` mira e ponha o `database_id` no `wrangler.jsonc`, com commit (não é segredo): o deploy a partir do build do Astro não grava o ID de volta, e o token que o Workers Builds cria não tem permissão de D1.
   ```bash
   npx wrangler d1 create cpps-site --location enam
   ```
2. Faça o build com o endereço workers.dev, para o serviço de imagens aceitar a mídia de lá:
   ```bash
   EMDASH_SITE_URL=https://cpps-site.cpps-franca.workers.dev npm run build
   ```
3. Publique trancado. Com um endereço que o navegador recusa, ninguém consegue criar o administrador enquanto você confere o Worker. Na primeira vez, o Wrangler cria o bucket e o KV; nos primeiros instantes, um Worker novo com *placement* pode responder com o erro 1042.
   ```bash
   npx wrangler deploy --var EMDASH_SITE_URL:https://cpps-site.invalid
   ```
4. Abra uma página e espere a resposta, sem interromper: o primeiro acesso, ou o cron, aplica as migrações do banco. Confira se as 90 da versão 1.2 estão lá e se a trava está livre (`is_locked` igual a 0); se ela ficar presa, veja [Migrações no primeiro acesso](ambiente-de-teste.md#migrações-no-primeiro-acesso).
   ```bash
   npx wrangler d1 execute cpps-site --remote --command "SELECT COUNT(*) FROM _emdash_migrations; SELECT is_locked FROM _emdash_migrations_lock"
   ```
5. Destranque com `npx wrangler deploy`, sem o `--var`, e logo em seguida conclua a configuração em `/_emdash/admin`: título, **Sample content** (importa notícias, equipe, projetos, páginas e traduções de `seed/seed.json`, com as imagens baixadas do jsDelivr), conta e chave de acesso.
6. Confira se nenhuma imagem ficou para trás. Se um download falha, o EmDash grava o campo vazio sem avisar. A consulta abaixo deve voltar vazia:
   ```bash
   npx wrangler d1 execute cpps-site --remote --command "
     SELECT 'equipe', slug, locale FROM ec_equipe WHERE (foto IS NULL OR foto = '') AND slug <> 'breno-andreazza'
     UNION ALL SELECT 'paginas', slug, locale FROM ec_paginas WHERE slug = 'home' AND (imagem IS NULL OR imagem = '')
     UNION ALL SELECT 'sobre', slug, locale FROM ec_sobre WHERE imagens LIKE '%\"imagem\":null%'
     UNION ALL SELECT 'noticias', slug, locale FROM ec_noticias WHERE image IS NULL OR image = ''"
   ```
7. Gere a chave de criptografia do EmDash e guarde uma cópia em local seguro (perdê-la torna ilegíveis os segredos de plugins guardados no banco):
   ```bash
   npx emdash secrets generate          # mostra a chave
   npx wrangler secret put EMDASH_ENCRYPTION_KEY
   ```
8. Convide pelo menos mais um administrador (Usuários → Convidar usuário).

Falta fazer os passos 7 e 8.

O `wrangler.jsonc` não fixa `EMDASH_SITE_URL` na produção: cada chave de acesso vale para o endereço em que foi criada, e o login no workers.dev continua funcionando durante a migração. Conferido em 09/10/2026: as 57 páginas do sitemap respondem com o mesmo status do site atual, com as diferenças de texto já esperadas ([ambiente-de-teste.md](ambiente-de-teste.md#conteúdo-igual-ao-site-atual)), e o servidor leva 60 ms por página na mediana.

## Migração para o domínio

Quando o conteúdo estiver pronto, como no guia [Move to a New Domain](https://docs.emdashcms.com/guides/change-domain/) do EmDash. Ensaie antes no ambiente de teste.

1. Antes: pelo menos dois administradores; todos que editam com a sessão aberta no workers.dev, porque é de lá que sai a passagem do login; o que mudou no site atual repetido aqui; e o ponto de restauração do banco anotado (`npx wrangler d1 time-travel info cpps-site`).
2. Aponte `cpps.franca.unesp.br` para o Worker. O hostname é um custom hostname do Cloudflare for SaaS (CNAME para `proxy.cppsunesp.org`, na zona `cppsunesp.org`), então use uma **rota**, não um *custom domain*. Acrescente ao `wrangler.jsonc` e faça o deploy:
   ```jsonc
   "routes": [{ "pattern": "cpps.franca.unesp.br/*", "zone_name": "cppsunesp.org" }],
   ```
   A partir daí, quem visita o domínio já vê o site novo. Em `https://cpps.franca.unesp.br/_emdash/admin` deve aparecer a tela de entrada do EmDash.
3. No admin, em Settings → General → **Change domain**, informe `cpps.franca.unesp.br` e clique em **Check and switch**. Com rota, a verificação automática falha (a Cloudflare não roda o Worker para uma requisição que ele faz à própria rota): use **Use … anyway**.
4. Cada pessoa, ainda logada no workers.dev, usa **Continue on cpps.franca.unesp.br** em Settings → General e cadastra uma chave de acesso no domínio, em Settings → Security. O link vale uma vez, por 5 minutos. Sem e-mail configurado, quem não fizer isso continua entrando só pelo workers.dev; no ensaio, confira se quem não é administrador vê esse botão.
5. Desconecte o Pages `site-cpps` do repositório, para ele não tentar publicar o formato novo, faça o merge da branch na `main` e troque a branch de produção do Workers Builds para `main`.
6. Quando todos entrarem pelo domínio: acrescente `"workers_dev": false` ao `wrangler.jsonc` e faça o deploy, para o site só responder no domínio; tire a variável de build `EMDASH_SITE_URL` do Workers Builds (o domínio já está autorizado no `astro.config.mjs`); e apague o projeto Pages `site-cpps`.
7. Meça o custo real com tráfego: em Workers → `cpps-site` → Observability, o tempo de CPU das páginas (o limite gratuito é 10 ms; no ambiente de teste, a mediana foi 15 ms e o máximo, 153 ms). Confira também a ligação do cron com o Worker com `npx emdash doctor`.

## Deploys seguintes (Workers Builds)

No painel: Workers & Pages → `cpps-site` (o Worker) → Settings → Builds → conectar o repositório `cpps-unesp/site-cpps`:

- **Build command:** `npm run build`
- **Deploy command:** `npx wrangler deploy`
- **Production branch:** `claude/bold-rubin-cekd64` até a migração; depois, `main`.
- **Variável de build:** `EMDASH_SITE_URL=https://cpps-site.cpps-franca.workers.dev` até a migração, para as imagens no workers.dev serem otimizadas.
- **Builds de outras branches: desligados.** Uma versão de preview roda com os mesmos D1, R2 e KV da produção: abrir o preview de um PR que atualiza o EmDash migraria o banco de produção, e o que for editado no admin do preview iria para o ar. Preview só com banco, bucket e KV próprios (seção "Preview deployments" do guia do EmDash), o que no plano gratuito gasta mais um dos 10 bancos D1.

Enquanto o Pages existir, exclua esta branch das prévias dele (Settings → Build → Branch control): a prévia do Pages desta branch dá 404 em todas as páginas, porque ele não roda o EmDash, e confunde quem abre o link pelo PR.

O `ci.yml` continua validando os PRs (seed, typecheck, lint e build); não faz deploy. Se o Workers Builds não aceitar o `lts/*` do `.nvmrc`, defina a variável de build `NODE_VERSION=24`.

Deploys seguintes não mexem no conteúdo do banco. Mudanças no modelo de conteúdo (`seed/seed.json`) depois do site no ar seguem o guia [Evolving a Deployed Site](https://docs.emdashcms.com/deployment/schema-evolution/): mudar o seed não altera um banco que já existe.

## Atualizar o EmDash

Uma versão nova do EmDash pode trazer migrações do banco. Elas rodam sozinhas no primeiro acesso depois do deploy, só andam para frente, e voltar o código para a versão anterior não as desfaz. Por isso o Dependabot não faz merge sozinho de `emdash`, `@emdash-cms/*`, `astro`, `@astrojs/*` nem `wrangler`.

1. Numa branch, rode `npx upgrade-emdash@latest` (a ferramenta oficial, desde a 1.2). Ele atualiza juntos `emdash` e `@emdash-cms/cloudflare` (o segundo exige a versão exata do primeiro), roda o npm e escreve `.emdash/UPGRADE.md` com as entradas do changelog entre as duas versões e as migrações novas. Se o Dependabot abriu um PR para cada pacote, feche os dois e use este caminho.
   - O comando também instala skills de agente de IA em `.agents/` e `.claude/`, mais um `skills-lock.json`. Não faça commit delas sem decidir: mudam o comportamento de quem usa assistentes de IA no repositório.
2. Leia o `.emdash/UPGRADE.md` (fora do Git) e ajuste o que cada entrada pedir. As notas também saem no blog, em https://emdashcms.com/blog.
3. Teste localmente com `npm run dev` (o banco local também migra) e rode `npm run ci`.
4. Se houver migração nova, antes do merge anote o ponto de restauração do banco: `npx wrangler d1 time-travel info cpps-site`.
5. Faça o merge e acompanhe o primeiro acesso com `npx wrangler tail`. Confira a página inicial, uma notícia, a busca e o login no admin.
6. Se algo der errado: restaure o banco com `npx wrangler d1 time-travel restore cpps-site --bookmark=<o bookmark do passo 4>` e volte o Worker para a versão anterior (Workers → `cpps-site` → Deployments). No plano gratuito o Time Travel cobre só os últimos 7 dias.

## Cron e publicação agendada

O cron roda a cada minuto (`* * * * *` em `wrangler.jsonc`), como no guia do EmDash: é o que publica as notícias agendadas no horário. Até a 1.1 isso era arriscado no plano gratuito: a limpeza do log de 404 lia a tabela inteira a cada execução e podia esgotar as 5 milhões de leituras diárias do D1, derrubando todas as consultas do site até a meia-noite UTC ([#3748](https://github.com/emdash-cms/emdash/issues/3748)), e as execuções em isolate frio passavam dos 10 ms de CPU e se perdiam ([#3858](https://github.com/emdash-cms/emdash/issues/3858)). Desde a 1.2, essa limpeza roda uma vez por hora e só quando a tabela passa do limite; a publicação agendada continua a cada minuto.

Para outro intervalo, use a mesma expressão em `triggers.crons` e em `createScheduledHandler({ generalCron })`, em `src/worker.ts`. Pensando em vários sites, o que pesa é o limite de 5 Cron Triggers por conta no plano gratuito, não a frequência.

## Backups

O que existe hoje:

- **D1 Time Travel:** restaura o banco para qualquer minuto dos últimos 7 dias (30 no plano pago), com `npx wrangler d1 time-travel restore`.
- **Chave de criptografia:** guarde uma cópia da `EMDASH_ENCRYPTION_KEY` fora da Cloudflare.

Desde 09/10/2026 o conteúdo de verdade está no banco `cpps-site`, então o backup fora da Cloudflare deixou de ser opcional. O EmDash tem as ferramentas: `npx emdash site export` gera um pacote `.emdash` com o site inteiro, e `npx emdash export-seed` gera o seed atualizado, para o Git.

O que falta, e depende de criar um token da API da Cloudflare para rodar no GitHub Actions: um backup semanal fora da Cloudflare, como no guia [Backups](https://docs.emdashcms.com/guides/backups/) do EmDash. O `wrangler d1 export` simples falha por causa das tabelas de busca (FTS5), então o guia exporta tabela por tabela; o R2 é copiado à parte. O mesmo job pode gerar um `seed/seed.json` atualizado com `npx emdash export-seed` e abrir um PR, para o conteúdo voltar a ficar versionado no repositório público. O backup bruto do banco contém usuários e não pode ser commitado.

## Imagens

- O componente `<Image>` de `emdash/ui` gera as variantes (`/_image?...&f=webp`) pelo binding Images. Cada combinação de imagem e largura conta uma vez por mês nas 5 mil transformações gratuitas da conta; passando disso, imagens novas falham com o erro 9422.
- `astro.config.mjs` autoriza o serviço de imagens a otimizar `/_emdash/api/media/file/**` no domínio do site. Sem isso, em produção as imagens sairiam no tamanho original.
- O assistente aplica o seed em lotes de 5 downloads, e cada lote baixa de novo as imagens que já tinha baixado no lote anterior. Por isso a biblioteca de mídia começa com cópias repetidas de algumas fotos (cerca de 50 arquivos para 32 imagens). É comportamento do EmDash e não afeta o site.

## Arquivo `public/_redirects`

Sintaxe dos Static Assets da Cloudflare (a mesma do Pages). Cada linha é uma regra: `origem destino código`. Os Static Assets aplicam o arquivo antes de chamar o Worker.

- `*` em qualquer posição vira `:splat` no destino.
- A primeira regra que casa é a que vale.
- **Ordem:** primeiro todas as regras exatas, depois as com curinga. Toda regra que vem depois da primeira com `*` conta como dinâmica; o limite é 100 dinâmicas, e passando dele o resto do arquivo é ignorado em silêncio. Hoje são 35 exatas e 34 com curinga.

O arquivo tem dois tipos de regra:

1. **Seções fora do ar** (wiki, atividades, busca, atendimento, editar-site, publicações e a página de um membro despublicado): `302` para a home do idioma, nunca para um caminho sob o prefixo redirecionado, para não criar loop. Reverter no mesmo deploy em que o conteúdo voltar.
2. **Caminhos sem prefixo de idioma → versão PT** (`/`, `/wiki`, `/noticias`...): `301`.

Para conferir depois de um deploy:
```bash
curl -sI https://cpps.franca.unesp.br/<rota> | grep -E 'HTTP|location'
```

## Adicionando novos redirects

1. Edite `public/_redirects` respeitando a ordem acima.
2. Use `301` para mudanças permanentes (renomeação, reorganização) e `302` ou `307` para casos temporários.
3. Rode `npm run build` e confira se `dist/client/_redirects` saiu certo. O build avisa quando uma regra exata está abaixo de uma com curinga.
4. Faça o merge na `main`; o Workers Builds publica.

## SEO multilíngue

O `BaseLayout.astro` injeta as tags `<link rel="alternate" hreflang="...">` para cada idioma (pt-BR, en-US, es-ES) e `x-default` apontando para PT. O canonical, o `og:url` e o hreflang levam sempre a barra final, como o `sitemap.xml`: no Worker, `/x` e `/x/` respondem 200, e sem isso cada uma se declarava canônica.

O `robots.txt` é estático (`public/robots.txt`) e bloqueia `/_emdash/`. O `sitemap.xml` é gerado a cada acesso e inclui as notícias publicadas, também em en e es, onde aparecem em português com aviso enquanto não houver tradução.

## Histórico: a fase estática (antes do EmDash)

Antes do EmDash o site era estático (`output: 'static'`) e publicado no Cloudflare Pages, com toda a lógica de redirect em `public/_redirects`. Uma tentativa anterior de rodar como Worker tinha sido abandonada porque quebrou no upgrade do adapter v12 → v13 (que trocou o formato Pages pelo formato Workers + Assets) e porque o SSR quase não trazia ganho para um site só de conteúdo. Com o EmDash o Worker voltou, agora no formato Workers + Assets, porque o conteúdo vem do banco a cada acesso.

Nessa migração se perdeu a detecção do idioma do navegador na raiz: quem acessa `cpps.franca.unesp.br` cai sempre em `/pt/` e troca de idioma pelo seletor do menu. O público principal é brasileiro, e o hreflang cuida da indexação das outras versões.
