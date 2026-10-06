# Deploy e Redirects

Como o site é publicado e como os redirects de URL são gerenciados.

## Arquitetura de deploy

O site roda inteiro na Cloudflare, como um **Worker** (`output: 'server'` com o adapter `@astrojs/cloudflare`):

| Recurso | Binding | Para quê |
|---|---|---|
| Worker `cpps-site` | — | Renderiza as páginas que leem o EmDash e serve o admin em `/_emdash/admin` |
| Static Assets | `ASSETS` | Arquivos de `dist/client/` (imagens de `public/`, CSS, JS, índice do Pagefind, páginas pré-renderizadas e `_redirects`) |
| D1 `cpps-site` | `DB` | Banco do EmDash (conteúdo, usuários, traduções) |
| R2 `cpps-site-media` | `MEDIA` | Imagens e arquivos enviados pelo admin |
| KV (criado pelo adapter) | `SESSION` | Sessões de login do admin |
| Images | `IMAGES` | Redimensionamento das imagens do R2 |
| Cron Trigger (a cada minuto) | — | Publicação agendada, backups e manutenção do EmDash |

A configuração fica em `wrangler.jsonc`; o build gera a versão completa em `dist/server/wrangler.json`. A entrada do Worker é `src/worker.ts`.

### Primeiro deploy (uma vez, com uma conta da Cloudflare do CPPS)

1. `npx wrangler login`
2. `npm run build && npx wrangler deploy` — na primeira vez o Wrangler cria o banco D1, o bucket R2 e o KV de sessões com os nomes do `wrangler.jsonc`.
3. Gere a chave de criptografia do EmDash e guarde uma cópia em local seguro (perdê-la torna ilegíveis os segredos de plugins guardados no banco):
   ```bash
   npx emdash secrets generate          # mostra a chave
   npx wrangler secret put EMDASH_ENCRYPTION_KEY
   ```
4. Confira o Worker no endereço `https://cpps-site.<sua-conta>.workers.dev`. As páginas que vêm do EmDash ficam sem conteúdo até o passo 6.
5. Aponte `cpps.franca.unesp.br` para o Worker. O hostname já passa pela Cloudflare (CNAME para `proxy.cppsunesp.org`, na zona `cppsunesp.org`): no painel dessa zona, troque o destino do projeto Pages `site-cpps` para o Worker `cpps-site` (por exemplo, uma rota de Worker `cpps.franca.unesp.br/*`).
6. Abra `https://cpps.franca.unesp.br/_emdash/admin` e conclua o assistente: título do site, **Sample content** (importa notícias, equipe, projetos, páginas e traduções de `seed/seed.json`, baixando as imagens de `public/`), conta e passkey. Faça isso já no domínio final: a passkey fica presa ao domínio em que foi criada.

### Deploys seguintes (Workers Builds)

No painel: Workers & Pages → `cpps-site` (o Worker) → Settings → Builds → conectar o repositório `cpps-unesp/site-cpps`:

- **Build command:** `npm run build`
- **Deploy command:** `npx wrangler deploy`
- **Production branch:** `main`
- **Builds de outras branches:** `npx wrangler versions upload` (gera uma URL de preview sem afetar produção)

Depois que o domínio estiver no Worker, desconecte e apague o projeto **Pages** `site-cpps`, que não sabe publicar este formato.

Deploys seguintes não mexem no conteúdo do banco. Mudanças no modelo de conteúdo (`seed/seed.json`) depois do site no ar seguem o guia [Evolving a Deployed Site](https://docs.emdashcms.com/deployment/schema-evolution/).

> O workflow `ci.yml` continua só validando PRs (typecheck, lint e build); não faz deploy.

## Histórico: a fase estática (antes do EmDash)

Anteriormente o site usava `output: 'server'` com o adapter `@astrojs/cloudflare`, executando como Cloudflare Worker. Funcionava, mas:

1. **Quebrou no upgrade do adapter v12 → v13.** A v13 mudou o formato de saída de `dist/_worker.js` (formato Pages) para `dist/server/entry.mjs` + `dist/server/wrangler.json` (formato Workers + Assets, um produto diferente). A configuração de build da Cloudflare Pages esperava o formato antigo e passou a falhar.
2. **Pouco ganho real do SSR.** Das ~15 páginas do projeto, 10 já tinham `prerender = true`. As 5 restantes só faziam redirects baseados em `Accept-Language` ou aliases legados — comportamento facilmente replicável em arquivo de redirects.
3. **Complexidade desnecessária.** SSR exige bundling do Worker, gestão de bindings (`ASSETS`, KV), runtime separado. Pra um site de conteúdo, é overkill.

A migração foi: remover o adapter, mudar para `output: 'static'`, mover toda a lógica de redirect para `public/_redirects`.

### O que se perdeu

Auto-detecção do idioma do navegador na raiz `/`. Antes, quem acessava `cpps.franca.unesp.br` era redirecionado para `/pt/`, `/en/` ou `/es/` conforme o `Accept-Language`. Agora cai sempre em `/pt/`. Para trocar de idioma, o visitante usa o seletor no menu.

A degradação é pequena porque:

- O público principal é brasileiro
- O Googlebot já era enviado para `/pt/` na maioria das vezes
- O seletor de idiomas continua funcionando normalmente

## Arquivo `public/_redirects`

Sintaxe dos Static Assets da Cloudflare (a mesma do Pages). Cada linha é uma regra: `origem destino código`.

- `*` em qualquer posição vira `:splat` no destino
- Placeholders nomeados (`:lang`) também funcionam, mas não são usados aqui — preferimos rules explícitas por idioma para evitar matches indesejados
- A primeira regra que casa é a que vale (ordem importa)
- Códigos: `301` (permanente, recomendado para mudanças canônicas) ou `307` (temporário)

Atualmente o arquivo tem ~80 regras divididas em três blocos:

### 1. Aliases legados específicos (`/atividades/<old>` → `/wiki/<new>`)

URLs antigas do wiki que foram renomeadas. Cada alias tem 3 linhas (uma por idioma). Estão definidos historicamente em `src/utils/wikiLegacyAliases.ts` (mantido como referência).

Exemplo:
```
/pt/atividades/geral/info/processo-seletivo  /pt/wiki/infos-gerais/03processo  301
/en/atividades/geral/info/processo-seletivo  /en/wiki/infos-gerais/03processo  301
/es/atividades/geral/info/processo-seletivo  /es/wiki/infos-gerais/03processo  301
```

### 2. Catch-all genérico `/atividades` → `/wiki`

Para URLs `/atividades/...` que não casaram com nenhum alias específico:
```
/pt/atividades/*  /pt/wiki/:splat  301
/en/atividades/*  /en/wiki/:splat  301
/es/atividades/*  /es/wiki/:splat  301
```

### 3. Paths sem prefixo de idioma → versão PT

Garantem que URLs sem `/pt/`, `/en/`, `/es/` ainda funcionem, redirecionando para a versão portuguesa:
```
/                /pt/              301
/wiki            /pt/wiki          301
/wiki/*          /pt/wiki/:splat   301
/iniciativas     /pt/iniciativas   301
...
```

> **Por que 301 e não 307?**
> 301 sinaliza ao Google que o destino é a localização canônica permanente, transferindo PageRank. Como a estrutura do site não vai voltar a ter detecção de idioma na raiz, o redirect é mesmo permanente.

## Adicionando novos redirects

1. Edite `public/_redirects` na ordem certa (mais específico antes do mais genérico).
2. Use `301` para mudanças permanentes (renomeação, reorganização), `307` apenas para casos temporários (ex: feature em testes A/B).
3. Faça `npm run build` e confirme que `dist/client/_redirects` foi gerado corretamente. Os Static Assets do Worker aplicam o arquivo antes de chamar o Worker; `npx wrangler dev` mostra as regras carregadas.
4. Push para `main` — o Workers Builds faz o deploy automaticamente.

Para testar a propagação:
```bash
curl -sI https://cpps.franca.unesp.br/<rota> | grep -E 'HTTP|location'
```

## SEO multilíngue

O `BaseLayout.astro` injeta as tags `<link rel="alternate" hreflang="...">` para cada idioma (pt-BR, en-US, es-ES) em todas as páginas, além de `x-default` apontando para PT. Junto com o `sitemap.xml`, isso é o que o Google usa para indexar as variantes — o redirect da raiz tem pouco impacto na indexação dos conteúdos.

A canonical URL de cada página aponta para si mesma (com prefixo de idioma).
