# Revisão da branch `feat/tinacms-visual-editing`

**Data:** 2026-09-23 · **Base revisada:** `9737c20` · **Comparada com:** `main` (`80d8661`)

Revisão da integração do TinaCMS, com os achados verificados em código, build ou
documentação primária. Cada item traz onde conferir. O que não foi verificado está
marcado como tal — e a lista do que continua sem verificação está em
[`verificacoes-2026-09-23.md`](./verificacoes-2026-09-23.md).

O que está bem-feito e deve ser preservado: as ilhas, o uso de `tinaField` e os
overrides do `TinaMarkdown`. A crítica abaixo é de integração e de caminho para
produção, não da modelagem de conteúdo.

---

## 1. Bloqueadores

### 1.1 `npm run ci` falha em checkout limpo, por duas causas independentes

O check `ci` é obrigatório no ruleset `Protect main` (PR + 1 aprovação +
`non_fast_forward` + `ci`). Enquanto ele estiver vermelho, **a branch não mergeia**.

**Primeira falha — typecheck.** `npm run ci` roda `astro sync && npm run typecheck && …`,
e `typecheck` é `tsc --noEmit && astro check`. O `tsc` roda *antes* do `tinacms build`
que geraria `tina/__generated__`, e esse diretório está no `.gitignore` (`tina/.gitignore`).
Resultado: `src/lib/tina/pages.ts:8` importa `../../../tina/__generated__/client`, que não
existe no checkout, e o `tsc` aborta com TS2307. Note que `src/lib/tina/data.ts` e
`src/lib/tina/islands.ts` têm `@ts-nocheck` e escapam; `pages.ts` não tem.

**Segunda falha — build.** Corrigido o typecheck, `npm run build` roda
`tinacms build && astro build && pagefind --site ./dist`. Sem `--local` e sem
credenciais (`tina/config.ts:137,139` lê `NEXT_PUBLIC_TINA_CLIENT_ID` e `TINA_TOKEN`,
ambas vazias), o CLI entra em `_createApiUrl()` e lança
`Client not configured properly. Missing clientId, token`. Como o script usa `&&`,
nada depois executa.

**Encaminhamento:** gerar o client como passo próprio do workflow, *antes* do typecheck:

```
npx tinacms build --local --skip-cloud-checks --noTelemetry
```

Atenção: a flag é `--noTelemetry` (não `--no-telemetry`); `--content=local` não serve,
pois ainda exige `clientId` e `token`; e `--local` sobe servidor na porta 4001, que
colide com um `tinacms dev` em execução. Manter `pages.ts` type-checado — não espalhar
`@ts-nocheck`.

### 1.2 `output: 'server'` quebra a publicação e derruba a raiz do site

`astro.config.mjs:12-14` passou de `output: 'static'` para `output: 'server'` com
`adapter: node({ mode: 'standalone' })`.

- A Cloudflare Pages publica `dist`. Com adapter, o Astro escreve `dist/client` e
  `dist/server`, e `dist/` fica sem `index.html`.
- `public/_redirects` é sintaxe proprietária da Pages (83 linhas, **69 regras
  efetivas**, das quais 34 dinâmicas). Fora dela, nenhum runtime as lê.
- Como não existe `src/pages/index.astro`, a raiz do domínio passa a **404**.

`docs/deploy-e-redirects.md` registra que o time já saiu de SSR antes, por esta mesma
quebra.

**E a mudança não era necessária:** 7 das 9 rotas já declaram `prerender = true`; a
única rota sob demanda é `src/pages/tina-island/[name].ts` (`prerender = false`).

**Ressalva verificada em 2026-09-23:** voltar a `output: 'static'` tem um conflito
próprio — o middleware do `@tinacms/astro` desiste quando a rota é `isPrerendered`, e
`<TinaIsland>` depende de `/tina-island/[name]`, que exige adapter. O fluxo de
formulários em modo estático **não foi verificado ponta a ponta** e é o primeiro
trabalho antes de prometer edição visual.

### 1.3 XSS armazenado no caminho que a branch abre para editores

`tina/config.ts` expõe um campo textarea cujo valor passa por `renderMarkdown()`
(`src/utils/markdown.ts`) sem sanitização e é injetado com `set:html` em
`src/components/TextoComCheck.astro:35`. O `marked` não sanitiza HTML desde que a
opção `sanitize` foi removida.

O risco é pré-existente, mas hoje ninguém escreve nesse campo. A branch abre esse
caminho de escrita para dezenas de estudantes e professores. **Fechar antes de dar
acesso, não depois.**

---

## 2. Regressões verificadas

### 2.1 Quatro links `/en/` e `/es/` dão 404 duro

Verificado em 2026-09-23 com `npx astro build` da branch e da `main`, e confirmado sob
`wrangler pages dev` sobre `dist/client` (semântica real da Pages, com as 69 regras de
`_redirects` e o `404.html`).

`src/content/tina-pages/inic-projetos/index.json` traz `cards[].link` como campo
localizado, e a migração preencheu `en`/`es` trocando só o prefixo de idioma, mantendo
o slug em português. Mas `src/i18n/routes.ts` define slugs traduzidos. Resultado:
`/en/iniciativas/projetos-de-pesquisa` e as outras três **não existem no `dist`** — 404,
sem redirect. Na `main` esses links apenas vazavam para `/pt/`; na branch quebram.

Correção: o campo de rota não deve ser texto livre localizado. Use chave de rota
não-localizada com `options`, e derive a URL do `routeTranslations`.

### 2.2 `departamentos` perdeu a tradução

`tina/config.ts:93` declara `departamentos` como `{ type: 'string', list: true }` — sem
passar por `localized()`. Na `main` os seis nomes estavam traduzidos em `en.json` e
`es.json`; a migração manteve só o português. `BlocoSection.astro` renderiza o valor
direto, então as páginas EN/ES do "Sobre" passam a mostrar português.

### 2.3 O modelo field-based não tem fallback

Em nenhum ponto do caminho field-based existe `?? doc.campo.pt`. Campo vazio em `en`/`es`
renderiza vazio. Hoje isso é invisível porque a herança foi assada no dado durante a
migração, mas conteúdo novo sai em branco. Há **70 valores `en`/`es` vazios** nos JSONs
atuais (42 em `equipe`, 14 em `documentos`, 10 em `inic-pesquisa`, 4 em `cafe`).

Encaminhamento: um resolvedor único, usando `trim()` como guarda — o caso real é string
vazia, não `null`:

```ts
export function L(campo, lang) {
  return campo?.[lang]?.trim() || campo?.pt || ''
}
```

---

## 3. Pontos de atenção

**O fallback é silencioso.** `getFieldBasedDoc` (`src/lib/tina/pages.ts:110`) tem `catch {}`
vazio: se o content API falhar, o site serve JSON estático sem avisar ninguém. Em build de
produção isso deveria ser erro, não degradação.

**Dois parsers divergentes.** O caminho ao vivo recebe a AST pronta do GraphQL; o fallback
usa os parsers artesanais de `pages.ts:38-72`, que cobrem só dois padrões — a quebra
codificada e `<Destaque texto="…" />`, com regex sem flag global. Qualquer formatação além
disso (negrito, link, lista, segundo `<Destaque>`) sai como texto cru, e nem o editor nem o
build avisam.

**Sobra de scaffold.** `src/pages/tinacms-demo.astro`, `content/posts/hello-world.md`, a
collection `post` em `tina/config.ts`, `src/components/tina/PostBody.astro` e `migrate.cjs`
na raiz devem sair antes do merge. `tinacms-demo.astro` é a única rota sem `prerender`
declarado.

**O `AGENTS.md` está errado.** Ele afirma que não há branch protection. O ruleset
`Protect main` está ativo, com PR, 1 aprovação, `non_fast_forward` e o check `ci`
obrigatório. Corrigir no mesmo PR.

**Busca.** O build ainda roda `pagefind --site ./dist`, e em modo `server` o aviso é
explícito: `Output type 'server' does not produce static *.html pages … will not work
with astro-pagefind`. Resolve-se junto com o item 1.2.

---

## 4. O que vem depois

Este site é o primeiro de vários que usarão a mesma stack. As decisões de plataforma que
decorrem desta revisão estão em [`adrs-propostos/`](./adrs-propostos/) (oito ADRs no
formato usado no `devops`, todos com status **Proposto**), e a ordem de execução está em
[`plano-de-execucao.md`](./plano-de-execucao.md), que começa pelos bloqueadores acima.
