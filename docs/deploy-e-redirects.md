# Deploy e Redirects

Como o site é publicado e como os redirects de URL são gerenciados.

## Arquitetura de deploy

O site é um conjunto de arquivos HTML estáticos gerados em build time (`output: 'static'` no `astro.config.mjs`). Não há servidor de aplicação nem Worker — toda página é pré-renderizada.

### Pipeline

1. **Push para o GitHub** em qualquer branch dispara o deploy.
2. **Cloudflare Pages** (integração nativa com o repositório) detecta o push e roda:
   - `npm run build` — gera os arquivos em `dist/` (HTML + assets + `_redirects` + pagefind)
   - Publica `dist/` no CDN global da Cloudflare
3. A branch `main` vai para produção (`cpps.franca.unesp.br`). Outras branches geram preview deploys em `<hash>.site-cpps.pages.dev`.

A configuração fica no painel da Cloudflare → Workers & Pages → `site-cpps` → Settings → Builds & deployments:

- **Build command:** `npm run build`
- **Build output directory:** `dist`
- **Production branch:** `main`
- **Preview branches:** todas (`*`)

> **Importante:** não existe `.github/workflows/deploy.yml`. O deploy via GitHub Actions foi removido porque duplicava o trabalho da integração nativa da Cloudflare. O workflow que sobrou (`ci.yml`) só roda typecheck/lint/build como validação em PRs — não faz deploy.

## Histórico: por que migrei de SSR para estático

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

Sintaxe da Cloudflare Pages. Cada linha é uma regra: `origem destino código`.

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
3. Faça `npm run build` e confirme que `dist/_redirects` foi gerado corretamente.
4. Push para `main` — a Cloudflare faz o deploy automaticamente em ~1-2 minutos.

Para testar a propagação:
```bash
curl -sI https://cpps.franca.unesp.br/<rota> | grep -E 'HTTP|location'
```

## SEO multilíngue

O `BaseLayout.astro` injeta as tags `<link rel="alternate" hreflang="...">` para cada idioma (pt-BR, en-US, es-ES) em todas as páginas, além de `x-default` apontando para PT. Junto com o `sitemap.xml`, isso é o que o Google usa para indexar as variantes — o redirect da raiz tem pouco impacto na indexação dos conteúdos.

A canonical URL de cada página aponta para si mesma (com prefixo de idioma).
