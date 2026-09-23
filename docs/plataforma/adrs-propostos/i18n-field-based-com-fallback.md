---
title: "ADR-045 — Modelo multilíngue dos sites: field-based no CMS, com resolvedor único e fallback explícito"
description: "O CMS guarda pt/en/es por campo no mesmo documento e a migração perdeu o fallback para pt: 70 valores vazios em en/es renderizam vazio. Mantém o field-based, restitui o fallback num resolvedor único com trim como guarda, e classifica campo a campo."
sidebar:
  order: 48
medido: "2026-09-23"
medidoCom: "contagem de localized()/localizedList() em tina/config.ts (51 campos) e de chaves \"pt\": nos doze JSON de src/content/tina-pages/ (235 instâncias); contagem dos valores \"en\": \"\" e \"es\": \"\" (70, distribuídos por equipe 42, documentos 14, inic-pesquisa 10, cafe 4); leitura de src/utils/i18n.ts na main (deepMerge) e de src/components/IniciativasProjetosSection.astro, src/lib/tina/pages.ts, src/i18n/routes.ts e src/content/tina-pages/sobre/index.json na branch feat/tinacms-visual-editing; varredura dos 23 arquivos de código com os três códigos de idioma cravados — lido em 2026-09-22. Em 2026-09-23: npx astro build da branch e da main em cópias separadas, com o TinaCMS fora do ar; dist servido por @astrojs/node e, na auditoria, por wrangler 4.136.3 pages dev sobre dist/client (semântica real de Cloudflare Pages, 69 regras de _redirects parseadas, 404.html); curl com e sem barra final registrando código e redirect_url; varredura de links internos quebrados nos dois dist — ver VERIFICACOES-2026-09-23.md"
---

## Status

**Proposto** — 2026-09-22. Aguarda revisão de Rafael e Arthur.

## Contexto

Os sites do parque são trilíngues (`pt`, `en`, `es`) e a edição visual pelo TinaCMS obriga a
responder em voz alta uma pergunta que a main nunca precisou responder: **onde mora a
tradução — no documento ou no arquivo?** O site-cpps respondeu as duas coisas, e hoje
convivem dois modelos no mesmo repositório:

| modelo | onde | forma |
|---|---|---|
| **arquivo por idioma** | collections MDX (`noticias`, `membros`, `publicacoes`) | campo `lang` no frontmatter + sufixo no nome (`marcelo-passini-mariano.pt.mdx`) |
| **field-based** | páginas do Tina (`src/content/tina-pages/*/index.json`) | um documento, e cada campo de texto vira `{pt, en, es}` |

O field-based foi a escolha da branch `feat/tinacms-visual-editing`, e está no comentário do
próprio `tina/config.ts`:

> *i18n "field-based": cada campo de texto vira um objeto com um subcampo por idioma, dentro
> do MESMO documento.*

Medido na branch, em 22/09/2026: **51 campos localizados** declarados em `tina/config.ts` (54
chamadas de `localized()`/`localizedList()`, menos as duas definições e uma menção em
comentário) e **235 instâncias** nos doze JSON de `src/content/tina-pages/` (chaves `"pt":`
no nível de valor), concentradas em `inic-pesquisa` (74), `equipe` (71), `cafe` (30) e
`documentos` (20).

### O que o field-based entrega, e o que ele tirou

Entrega o que a edição visual precisa: **um documento, um formulário**. O editor vê os três
idiomas lado a lado no mesmo campo, não há documento órfão nem par de arquivos a sincronizar,
e a estrutura da página (ordem das seções, imagens, `check`) é editada uma vez só.

O que tirou é mais caro do que parecia. Primeiro, **o preview do admin abre sempre em `pt`** —
o `tina/config.ts` registra que, sendo o documento único, não há como inferir o idioma dele,
e editar en/es visualmente exige o seletor de idioma *da página dentro do preview*. Segundo,
**perdeu-se o fallback**, que é o defeito estrutural desta ADR.

### O defeito: não há fallback para `pt`

Na `main`, `src/utils/i18n.ts` resolvia idioma por **herança com merge profundo**:
`getTranslations(lang)` devolve `deepMerge(pt, translations[lang])` — `pt` é a base, e o
locale só sobrescreve o que traduziu, inclusive dentro de arrays de objetos casados por `id`.
Campo não traduzido caía em português, visivelmente, mas caía.

Na branch com o field-based, **não há herança nenhuma**. O acesso é direto, campo a campo:

```astro
{data?.titulo?.[lang] ?? 'Projetos'}   ...   {card.titulo[lang]}
```

Dois problemas num trecho só, ambos em `src/components/IniciativasProjetosSection.astro`:

- **`??` não cobre o caso real.** O `??` só dispara em `null`/`undefined`, e o que existe nos
  JSON é **string vazia**. Medido: **70 valores `"en": ""` ou `"es": ""`** nos
  `tina-pages` — 42 em `equipe`, 14 em `documentos`, 10 em `inic-pesquisa`, 4 em `cafe`.
  Cada um desses renderiza **vazio** na página EN/ES hoje.
- **Literal em português cravado no código** como "fallback": `'Projetos'`, o parágrafo de
  descrição inteiro do `IniciativasProjetosSection`, e o rótulo `Ver mais` do botão dos
  cards, que nem passa por idioma. O fallback existe, no lugar errado: é intraduzível e o
  editor não o alcança pelo CMS.

:::note[O caso real é string vazia, não nulo]
A guarda correta é `typeof v === 'string' && v.trim() !== ''`. Um campo que o editor abriu e
deixou em branco grava `""`; um campo com espaço grava `" "`. Qualquer resolvedor escrito com
`??` ou `||` sobre o valor cru vai passar `" "` adiante e continuar renderizando vazio.
:::

### Regressões concretas já visíveis

- **`departamentos` ficou fora do esquema localizado.** Em
  `src/content/tina-pages/sobre/index.json` ele é `string[]` puro, com os seis departamentos
  em português, consumido por `SectionPadrao.astro` e `BlocoSection.astro` sem passar por
  idioma. Na `main` esse conteúdo entrava pelo `deepMerge`, nas mesmas doze seções, e tinha
  tradução. **As páginas `/en/` e `/es/` do Sobre perderam tradução que existia.**
- **Os links dos cards de Projetos guardam slug em português sob `en` e `es`.** Em
  `inic-projetos/index.json:26-27,43-44`, os três idiomas apontam para
  `/{lang}/iniciativas/projetos-de-pesquisa` e `/{lang}/iniciativas/projetos-de-dados`,
  enquanto `src/i18n/routes.ts` declara `initiatives/research-projects` e
  `iniciativas/proyectos-de-investigacion`. O link virou **conteúdo editável** e escapou da
  tabela de rotas, que o `AGENTS.md` declara fonte de verdade.

  **Medido em 23/09/2026: os quatro links são 404 duro, e não redirecionam.** O
  `getStaticPaths` de `src/pages/[lang]/[...slug].astro` gera só
  `routeTranslations[chave][lang]` (`buildRouteTranslationPaths`,
  `src/utils/catchAllRouting.ts:7-34`), então o `dist/client/` sai com
  `en/initiatives/research-projects/` e `es/iniciativas/proyectos-de-investigacion/` e
  **sem nenhum `en/iniciativas/`**. Servindo o `dist` pelo adapter node configurado na
  branch: 200 nos dois caminhos `/pt/`, **404 nos quatro `/en/` e `/es/`**, com e sem barra
  final, `redirect_url` vazio em todos. A auditoria repetiu com `wrangler pages dev` sobre
  `dist/client` — semântica real da Cloudflare Pages, com as 69 regras do `_redirects`
  parseadas — e deu o mesmo: **os quatro 404**, sem regra que case (a única próxima,
  `/iniciativas/*` → `/pt/iniciativas/:splat`, só pega caminho **sem** prefixo de idioma, e
  de fato responde 301 para `/pt/`). Nuance que só a emulação da Pages mostra: as rotas
  **válidas** ganham `308` canônico para barra final; as quatro quebradas não ganham nada.

  **É regressão da branch.** Na `main` o mesmo card traz `href` cravado em
  `/pt/iniciativas/projetos-de-pesquisa` (`IniciativasProjetosSection.astro:23,34`), que
  existe e responde 200 — vazava idioma, não quebrava. Na branch o href virou
  `card.link[lang]` (linha 56). Varrendo os dois `dist` inteiros, **o único link interno
  quebrado que a branch acrescenta são esses quatro**. A decisão 4 deixa de ser higiene e
  passa a ser conserto de 404 em produção.

  *Nota de método, para quem repetir:* o build foi `npx astro build` com o TinaCMS fora do
  ar, não `npm run build` — sem Tina de pé, `getFieldBasedDoc`
  (`src/lib/tina/pages.ts:98-113`) cai no JSON estático pelo `catch`. Isso não muda o
  veredito, porque o 404 nasce no `getStaticPaths`, que só conhece `routeTranslations` e é
  independente do conteúdo.

  *Nota de lado, medida no mesmo build:* o `404.astro` é servido **em português** para URL
  sob `/en/` e `/es/` — quem cai nesses quatro links vê "Página não encontrada" em PT.

:::caution[Seis links quebrados que não são desta branch, e ninguém tinha escrito]
Medido em 23/09/2026 nos **dois** `dist` (branch e `main`): `/pt/iniciativas`,
`/en/initiatives`, `/es/iniciativas` e os três `/{lang}/institucional` aparecem como `href`
em todas as páginas de seção e **nenhum tem página gerada** — não há chave de rota para o
nível intermediário em `src/i18n/routes.ts`. São 404 no ar hoje, em PT inclusive, e não
entram como regressão desta ADR porque são anteriores a ela. Cabem no mesmo PR da decisão 4.
Menor, e também nos dois `dist`: as páginas EN e ES trazem `href="/pt/iniciativas/projetos"`
no dropdown de navegação — vaza PT, responde 200, e a branch não consertou.
:::

### Marcadores dentro do campo de texto

Os campos rich-text guardam **string markdown**, não AST, e `src/lib/tina/pages.ts` faz o
parse de dois padrões próprios no caminho estático: a **quebra de linha codificada** `'\\\n'`
(constante `BREAK_MARKDOWN`) e o **componente inline `Destaque`**, `<Destaque texto="..." />`,
casado pela regex `/<Destaque texto="([^"]*)" \/>/` e renderizado por
`src/components/tina/Destaque.astro`.

O `Destaque` aparece nos três idiomas do `hero.description` em `home/index.json` — o marcador
já atravessou a tradução uma vez, à mão. Para o editor não técnico é uma armadilha: o campo
contém sintaxe que **não pode ser quebrada** e não avisa. Trocar `texto="..."` por aspas
tipográficas, ou perder a barra do `\`, derruba o parse silenciosamente — o build passa, a
página sai errada.

### Um quarto idioma

Medido: **23 arquivos de código** (fora de `src/content/`) carregam os três códigos cravados
juntos — `src/types/lang.ts` (`type SupportedLang = 'pt' | 'en' | 'es'`), `tina/config.ts`
(`const LANGS`), `sitemap.xml.ts`, `404.astro`, os cinco `src/pages/[lang]/**`, os
utilitários de sidebar e `TranslationWarning.astro`, que repete duas vezes a cascata
`currentLang === 'en' ? ... : currentLang === 'es' ? ... : ...`. Contando os que carregam ao
menos um código, são 49. Acrescentar um quarto idioma hoje é varredura manual, sem nada que
falhe se um arquivo for esquecido.

## Decisão

**O field-based fica.** É o modelo que a edição visual de um documento por página exige, e
trocá-lo depois de 235 instâncias migradas custa mais do que corrigir o que ele quebrou. As
correções abaixo são condição para a branch entrar na main.

### 1. Resolvedor único, com `trim` como guarda

Uma função só, em `src/lib/tina/pages.ts`, e **nenhum acesso direto a `campo[lang]` em
componente**:

```ts
export function resolver(campo: Partial<Localized> | null | undefined, lang: TinaLang): { texto: string; traduzido: boolean } {
  const v = campo?.[lang];
  if (typeof v === 'string' && v.trim() !== '') return { texto: v, traduzido: true };
  const base = campo?.pt;
  if (typeof base === 'string' && base.trim() !== '') return { texto: base, traduzido: false };
  return { texto: '', traduzido: false };
}
```

`pt` é a língua-base por ser a que o centro escreve primeiro e a única com cobertura
completa. Isto restitui, explícito, o que o `deepMerge(pt, translations[lang])` da main fazia
por herança.

### 2. Aviso de não traduzido, no componente que já existe

`src/components/TranslationWarning.astro` já está escrito e já lista os idiomas em que a
página existe. Quando **qualquer** campo voltar `traduzido: false`, a página EN/ES exibe o
aviso: o leitor vê português com etiqueta em vez de bloco em branco, e o editor vê no site o
que falta sem abrir o CMS.

### 3. Regra para conteúdo novo, com os dois modelos convivendo

> **Conteúdo com data própria e URL própria** (notícia, publicação, membro) → **arquivo por
> idioma**, com `lang` no frontmatter e sufixo no nome.
> **Conteúdo que é a página** (seções, títulos, cards, textos institucionais) → **field-based
> no Tina**.

O critério é o ciclo de vida: o que nasce e morre sozinho vira arquivo; o que é estrutura da
página vira campo. Conteúdo novo que não se encaixe claramente **vai para o field-based**,
que é o lado com edição visual.

### 4. `departamentos` entra no esquema localizado, e o link sai do campo

`departamentos` vira `localizedList('departamentos', ...)`, com a tradução restituída do
histórico (`git show main:src/i18n/locales/{en,es}.json`) antes do merge — é regressão, não
escopo novo. O card de Projetos passa a guardar a **chave** da rota
(`iniciativas/projetos-de-pesquisa`), não a URL; a URL é montada por
`getTranslatedPath(chave, lang)` e o editor escolhe o destino numa lista.

**Isto virou conserto de 404, não higiene**, pela medição de 23/09/2026 registrada acima: os
quatro links respondem 404 duro na Pages, sem redirect. É condição de merge da branch, e não
item de polimento.

**E a guarda barata vem do mesmo lugar que a do seletor de cor.** O `ui.validate` do Tina roda
por campo a cada mudança e **desabilita o botão Save** quando reprova — medido em 23/09/2026
no formulário real ([ADR-044](/decisoes/identidade-visual-por-grupo-tokens/)). Um `validate`
no subcampo `pt` que recuse string vazia impede, **no ato da digitação**, o documento que hoje
renderiza vazio em `en`/`es`. Não substitui o resolvedor da decisão 1 — o resolvedor cobre os
70 vazios que já existem —, mas tira a origem do defeito para o conteúdo novo, e é mais barato
que qualquer varredura.

### 5. Lista de idiomas num módulo único — e as três peças são do kit, não do site

`src/i18n/langs.ts` exporta `LANGS` (código, rótulo, se é base) e `SupportedLang` derivado
dela; `tina/config.ts`, `sitemap.xml.ts`, `TranslationWarning.astro`, `LanguageSelector` e os
`[lang]` importam daí. Alvo: acrescentar idioma = editar **um** arquivo, mais as traduções.
Meta verificável: zero `'es'` literal fora de `src/i18n/` e dos JSON de conteúdo.

**No `site-cpps` esses arquivos nascem em `src/`; no parque eles são do
`@colabhd/site-kit`.** O resolvedor da decisão 1, o módulo de idiomas desta decisão e o
componente de aviso da decisão 2 são **exportados pelo kit**, e o site apenas os consome — o
que fica no site são as traduções e o conteúdo. A razão é a premissa do
[ADR-040](/decisoes/plataforma-sites-n-repositorios/): com N repositórios não existe
compartilhamento sem pacote, e um resolvedor copiado em dezenas de sites deriva exatamente como
`astro-pagefind` ^1.8.3 vs ^2.0.1 já derivou. O piloto escreve em `src/`, e a extração para o
kit é parte da mesma entrega, não de uma fase seguinte.

### 6. Classificação campo a campo: localizado ou compartilhado

O comentário do `tina/config.ts` admite que isso **não foi feito** — remete ao "plano de
migração para a classificação completa de quais campos são localizados vs. compartilhados".
A regra:

> **Localizado** é o que uma pessoa lê. **Compartilhado** é o que uma máquina usa.

Localizado: título, descrição, resumo, transcrição, rótulo, texto de botão, `alt` de imagem.
Compartilhado: `id`, caminho de imagem, data, `check`, `reverse`, ordem, chave de rota.
Fronteiras decididas por escrito: `link` externo é compartilhado, salvo se o destino tiver
versão por idioma; `natureza` de projeto e `cargo` de membro são localizados, e já estão.

:::tip[O agente de tradução herda esta classificação]
O agente de IA local
([ADR-047](/decisoes/agente-de-traducao-local-cliente-do-endpoint/)) preenche **só** os campos
classificados como localizados, e preserva os marcadores: `\` de quebra e
`<Destaque texto="..." />` atravessam intactos. Um campo que ele não conseguir traduzir fica
`""` — e cai no fallback com aviso, que é o comportamento correto. O agente nunca escreve em
campo compartilhado.
:::

## Alternativas rejeitadas

**Um documento por idioma** (`sobre.pt.json`, `sobre.en.json`, `sobre.es.json`). O argumento
mais forte a favor: o preview do admin saberia o idioma do documento, e a edição visual de
EN/ES ficaria idêntica à de PT — exatamente o que o field-based tirou e não recupera.
Rejeitada porque triplica a estrutura da página: ordem das seções, imagens, `check` e
`reverse` mantidos três vezes, e divergindo. É o modelo das collections MDX, e lá funciona
porque o documento **é** o conteúdo; numa página institucional, a maior parte do documento é
estrutura compartilhada.

**i18n nativo do Tina.** O argumento a favor: não escrever nada — seria o caminho suportado.
Rejeitada porque não foi encontrado, na versão em uso, mecanismo de i18n de primeira classe
no schema (o que existe é convenção de pasta/arquivo, que recai na alternativa anterior).
*Não verificado exaustivamente:* não auditamos o changelog do `tinacms` nem o `@tinacms/cli`
à procura de suporte não documentado. Verificaria antes de escrever o resolvedor — se
existir, esta ADR muda.

**Árvore de arquivos por locale** (`content/pt/**`, `content/en/**`, `content/es/**`). O
argumento a favor: é o modelo do resto do ecossistema Astro, casa com o roteamento `[lang]`
que já temos e torna óbvio o que existe em cada idioma. Rejeitada pelo mesmo motivo do
documento por idioma, agravado: com **dezenas de sites**, a divergência entre árvores só
seria detectável por ferramenta que teríamos de escrever.

## Consequências

- **Aceita-se que o preview do admin continue abrindo em `pt`.** É o custo direto do
  field-based e esta ADR não o resolve. O contorno — o seletor de idioma da própria página
  dentro do preview — precisa estar no guia do editor, não ser descoberto.
- **Aceita-se que o site publique português com etiqueta em vez de nada.** Num site de
  divulgação é melhor que bloco vazio; para quem espera tradução completa, é a admissão
  pública de que ela não existe. As 70 lacunas medidas ficam visíveis no dia do merge.
- **Aceita-se dois modelos de i18n no mesmo repositório**, com o custo de o desenvolvedor ter
  de saber em qual está mexendo. A regra da decisão 3 é o que impede um terceiro modelo.
- **Aceita-se que o índice de busca em `en`/`es` passe a conter português.** O Pagefind indexa
  o `dist/`, e com o fallback ligado a página EN passa a servir texto em `pt` — a relevância
  degrada justamente nos idiomas que já estão incompletos. Aceita-se por escrito, porque a
  alternativa (excluir do índice a página que caiu no fallback) tornaria invisível um conteúdo
  que **existe** e é o único disponível naquele idioma. O Pagefind é peça do kit, em versão
  única (ADR-040), e é lá que essa configuração mora se algum dia mudar.
- **Aceita-se que os marcadores dentro do campo continuem frágeis.** Esta ADR não resolve o
  `Destaque` digitado à mão; só o nomeia e obriga o agente a preservá-lo. A saída real — ele
  virar bloco do editor, e não texto — fica para quando o backend self-hosted estiver de pé.
- Todo componente que hoje faz `campo[lang]` precisa mudar: os componentes de seção sob
  `src/components/`, mais `Hero.astro`. Trabalho mecânico, cabe num PR. A classificação dos
  **51 campos** é feita uma vez, e é o contrato que o agente de tradução obedece — sem ela, o
  agente não pode ser ligado sem risco de reescrever `id` e caminho de imagem.

## Critério de revisão

1. **Um quarto idioma ser pedido** → se, no dia do pedido, ainda houver mais de um arquivo
   fora de `src/i18n/` com código de idioma cravado, a decisão 5 falhou e o custo real vai
   para a ADR de revisão.
2. **O número de valores `""` em `en`/`es` nos `tina-pages` subir acima dos 70 medidos hoje**,
   três meses depois do agente de tradução entrar em operação → o fallback virou desculpa
   para não traduzir, e o aviso precisa escalar (página EN/ES sem tradução sai do sitemap).
3. **O TinaCMS publicar i18n de primeira classe no schema** → a alternativa 2 reabre, e o
   resolvedor próprio passa a ser dívida.
4. **Um editor não técnico quebrar um marcador em produção** (quebra de linha ou `Destaque`),
   ou **um segundo site do kit escolher modelo diferente** → no primeiro caso, tirar os
   marcadores de dentro do campo de texto; no segundo, a regra da decisão 3 deixou de ser
   óbvia e vira documentação do kit em vez de ADR.
