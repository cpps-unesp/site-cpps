# Ambiente de teste na Cloudflare

Registro de como o ambiente de teste do EmDash foi montado em 08/10/2026 e do que o teste mostrou. Desde 09/10/2026 a produção existe à parte, em https://cpps-site.cpps-franca.workers.dev ([deploy-e-redirects.md](deploy-e-redirects.md#produção-antes-do-domínio)), e o teste serve só para experimentos: mudanças grandes, atualizações do EmDash e o ensaio da migração para o domínio.

## O que existe

| | |
|---|---|
| Endereço | https://cpps-site-teste.cpps-franca.workers.dev |
| Worker | `cpps-site-teste`, na conta da Cloudflare do CPPS (a mesma do Pages `site-cpps`) |
| Banco D1 | `cpps-site-teste`, na região ENAM (leste da América do Norte) |
| Bucket R2 | `cpps-site-teste-media` |
| KV de sessões | `cpps-site-teste-session`, criado pelo deploy |
| Cron | a cada minuto |
| Configuração | bloco `env.teste` do `wrangler.jsonc`, na branch `claude/bold-rubin-cekd64` |

Nada aqui aponta para a produção: um ambiente do Wrangler não herda bindings nem vars do bloco principal. Enquanto existir, o teste ocupa 1 dos 5 crons e 1 dos 10 bancos da conta no plano gratuito.

O conteúdo veio do `seed/seed.json`, importado na configuração inicial (**Sample content**). O que for editado aqui fica só no teste; o conteúdo de verdade é editado na produção.

Quem fez a configuração inicial é o administrador. Para chamar mais gente, use Usuários → Convidar no admin e mande o link à mão: no plano gratuito o Worker não envia e-mail. Cada passkey fica presa ao endereço de teste e não serve para a produção.

## Publicar uma versão nova

Por enquanto, à mão, de uma cópia da branch:

```bash
CLOUDFLARE_ENV=teste EMDASH_SITE_URL=https://cpps-site-teste.cpps-franca.workers.dev npm run build
npx wrangler deploy
```

- Confira na saída o nome **`cpps-site-teste`**. Sem o `CLOUDFLARE_ENV=teste`, o mesmo comando publica a produção.
- O `EMDASH_SITE_URL` do build autoriza o serviço de imagens a otimizar a mídia do endereço de teste. O que vale com o Worker rodando está nas `vars` do `env.teste`.
- Se a pasta tiver o `.env` de desenvolvimento, o build copia os valores dele para `dist/server/.dev.vars`. Esse arquivo não vai para a Cloudflare, mas um build limpo é feito sem o `.env` na pasta.

### Credenciais

`npx wrangler login`, ou um token da API, que dá para limitar e pôr prazo. O token usado na montagem foi criado em My Profile → API Tokens → Custom token, com:

- **Account, Edit:** Workers Scripts, D1, Workers R2 Storage, Workers KV Storage.
- **Account, Read:** Workers Tail, Workers Builds Configuration, Account Analytics, Account Settings.
- **User, Read:** User Details, Memberships.
- **Account Resources:** só a conta do CPPS. **TTL:** com data de fim.

Guarde o token num `.env` fora do Git (`CLOUDFLARE_API_TOKEN` e `CLOUDFLARE_ACCOUNT_ID`) e passe o arquivo ao Wrangler com `--env-file <arquivo>`. Apague o token quando não precisar mais dele.

## Publicação automática

O teste é publicado à mão. A publicação automática a cada push vale para a produção ([Deploys seguintes](deploy-e-redirects.md#deploys-seguintes-workers-builds)). Se o teste também for ligado ao Workers Builds, use uma branch própria para ele, com `CLOUDFLARE_ENV=teste` e `EMDASH_SITE_URL=https://cpps-site-teste.cpps-franca.workers.dev` nas variáveis de build. O token que o Workers Builds cria não tem permissão de D1; por isso o ID do banco de teste está no `wrangler.jsonc`.

## O que o teste mostrou

### Banco longe do Worker

O D1 não tem região na América do Sul, e o banco ficou na ENAM. Sem *placement*, o Worker rodava em São Paulo e cada consulta ao banco ia e voltava, cerca de 140 ms cada. Como cada página faz dezenas de consultas, levava de 15 a 30 s. Com `"placement": { "mode": "targeted", "region": "aws:us-east-1" }` no `wrangler.jsonc`, cada consulta caiu para 40–55 ms. Os arquivos estáticos continuam saindo do ponto da Cloudflare mais perto do visitante.

### Migrações no primeiro acesso

No modo padrão (`auto`), o EmDash aplica as migrações do banco (90 na versão 1.2) na primeira requisição que chega. Na primeira tentativa, ainda sem *placement*, elas não couberam no tempo da requisição: pararam na 57ª, e a trava de migração ficou presa. Daí em diante, toda página saía sem conteúdo e perdia uns 4 s esperando a trava. O banco estava vazio, então foi apagado e recriado. Com *placement*, as 90 migrações terminaram em cerca de 15 s, mas o primeiro acesso e o cron ainda disputaram a trava.

Se a trava prender, os logs (`npx wrangler tail cpps-site-teste`) mostram `MigrationLockHeldError` com o número da trava. Para liberar, como no guia [Core migrations](https://docs.emdashcms.com/deployment/core-migrations/#release-a-stuck-migration-lock) do EmDash:

```bash
npx wrangler d1 execute cpps-site-teste --remote --command "UPDATE _emdash_migrations_lock SET is_locked = 0 WHERE is_locked = <número da trava>"
```

Depois, abra uma página e espere a resposta, sem interromper.

O guia recomenda para produção `migrations: { runtime: "check", dev: "auto" }` no `astro.config.mjs` e `npx emdash migrate` no deploy, antes do `wrangler deploy`. Assim nenhuma migração roda no acesso de um visitante, e a inicialização do EmDash cai para uma consulta. Ainda não foi aplicado: falta testar aqui, e o deploy automático precisaria de um token com permissão de D1.

### Tempo e CPU

Medido com o conteúdo importado:

- **No servidor**, pelo cabeçalho `Server-Timing`: mediana de 46 ms por página e máximo de 412 ms. A primeira página de cada instância nova do Worker gasta 0,2–0,5 s a mais iniciando o EmDash.
- **CPU:** em 156 páginas servidas durante os testes, mediana de 15 ms, 90% abaixo de 46 ms e máximo de 153 ms. Cada lote da importação inicial gastou de 270 a 430 ms. O plano gratuito permite 10 ms por requisição. Nenhuma foi cortada no teste, mas com tráfego real o excesso pode virar o erro 1102. Antes da produção, é preciso decidir entre o Workers Paid (US$ 5/mês por conta) e reduzir a CPU com cache ou pré-renderização.

### Conteúdo igual ao site atual

As 57 páginas do sitemap respondem com o mesmo status do site atual, e 39 têm texto idêntico. As diferenças:

- **Já esperadas:**
  - categorias em ordem alfabética, com o nome no título;
  - data em espanhol corrigida;
  - foto da Home como imagem;
  - ícone do Lattes removido de uma pessoa sem currículo.
- **Nova:** aspas retas no lugar das tipográficas numa notícia. O Markdown do site atual troca as aspas sozinho; o EmDash guarda o texto como foi digitado.

### "Visualização ao vivo" do admin dava 404

O EmDash monta esse link com o padrão de URL da coleção. Como o roteamento de idiomas do site é manual, ele não põe `/pt/` na frente, e as coleções sem padrão iam para `/<coleção>/<slug>`.

- **Padrões:** agora todos começam em `/pt/` (`seed/seed.json`).
- **Outros idiomas:** o site leva `/en/pt/...` e `/es/pt/...` para a página traduzida (`getCaminhoDoAdmin` em `src/utils/catchAllRouting.ts`).
- **Coleções sem página própria** (Sobre, Equipe, Documentos, Café com Ciência e Projetos): o link abre a página em que o item aparece, no topo.

Mudar o seed não altera um banco que já existe, então no teste os padrões foram gravados direto na tabela `_emdash_collections`.

### Admin trancado no primeiro deploy

Até a configuração inicial, quem abre `/_emdash/admin` primeiro vira administrador. Por isso o primeiro deploy subiu com `--var EMDASH_SITE_URL:https://cpps-site-teste.invalid`. A passkey ficaria presa a um endereço que o navegador recusa, então ninguém conseguia se cadastrar enquanto o ambiente era conferido. Na hora da configuração, um deploy com o endereço de verdade destrancou o admin.

O mesmo teste confirmou que o Worker lê o `EMDASH_SITE_URL` das `vars` em tempo de execução: é o que prende o login do teste ao endereço dele e o que tranca o primeiro deploy. A produção usou a mesma trava.

## Pendências

- Ensaiar aqui a migração para o domínio ([Migração para o domínio](deploy-e-redirects.md#migração-para-o-domínio)).
- Decidir o plano da conta, gratuito ou pago, olhando a CPU.
- Testar aqui as migrações no deploy (`runtime: "check"` com `emdash migrate`).
- Pôr prazo e restringir à conta do CPPS o token da API, e apagá-lo quando não for mais usado.
- Opcional: âncoras por item nas páginas de listagem, para "Visualização ao vivo" rolar até o item.

## Apagar tudo

```bash
npx wrangler delete --name cpps-site-teste
npx wrangler d1 delete cpps-site-teste
npx wrangler r2 bucket delete cpps-site-teste-media   # esvazie o bucket pelo painel antes
npx wrangler kv namespace list                        # ache o id do cpps-site-teste-session
npx wrangler kv namespace delete --namespace-id <id>
```

Depois, tire o bloco `env.teste` do `wrangler.jsonc`.
