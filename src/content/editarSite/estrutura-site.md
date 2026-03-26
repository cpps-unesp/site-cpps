# Estrutura das Seções do Site

## Compartilhamentos Principais

- **Layout base de docs centralizado**:
  - `src/components/docs/DocsMdxPage.astro`
  - Consumido por:
    - `src/pages/[lang]/atividades/[...slug].astro`
    - `src/pages/[lang]/[support]/[...slug].astro`
    - `src/pages/[lang]/[editSite]/[...slug].astro`
- **Componentes de navegação/docs compartilhados**:
  - `src/components/docs/Sidebar.astro`
  - `src/components/docs/TableOfContents.astro`
  - `src/components/docs/Breadcrumbs.astro`
  - `src/components/docs/Pagination.astro`
- **Componentes MDX reutilizados nas 3 seções**:
  - `src/components/atividades/Notice.astro`
  - `src/components/atividades/Card.astro`
  - `src/components/atividades/CardGrid.astro`
  - `src/components/atividades/LinkCard.astro`
  - `src/components/atividades/Steps.astro`
- **Layout global compartilhado**:
  - `src/layouts/BaseLayout.astro`
- **Coleções Astro com schema espelhado** (estrutura muito parecida):
  - `src/content.config.ts` (coleções: atividades, atendimento, editarSite)
- **Builders de sidebar com mesmo papel** (um por seção):
  - `src/utils/atividadesSidebar.ts`
  - `src/utils/atendimentoSidebar.ts`
  - `src/utils/editarSiteSidebar.ts`
- **Comportamento de UI compartilhado**:
  - Menu lateral esquerdo + índice direito (mobile drawer + ocultar/mostrar no desktop) centralizados em `DocsMdxPage.astro`
- **Regras atuais da sidebar**:
  - `sidebar_section` é opcional e livre no frontmatter
  - Sem `sidebar_section`: item fica na raiz da sidebar
  - Com `sidebar_section`: item entra em seção dinâmica
  - Não existe mais seção `Geral` ou `Introdução` automática

## Diferenças Principais

- `/atividades/` tem índice próprio em `src/pages/[lang]/atividades/index.astro`.
- `/atendimento/` e `/editar-site/` usam rota traduzida via `routeTranslations` em `src/i18n/routeTranslations`.
