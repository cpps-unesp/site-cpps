# AGENTS.md
# Guidance for agentic coding in this repository.

## Project Snapshot
- Framework: Astro (static output) with Starlight docs.
- Styling: Tailwind CSS + DaisyUI themes.
- Content: MDX + Astro content collections.
- Languages: `pt`, `en`, `es`.

## Commands (Build/Lint/Test)
- Install dependencies: `npm install`
- Dev server: `npm run dev` (Astro dev)
- Production build: `npm run build` (Astro build + Pagefind index)
- Preview build: `npm run preview`
- Astro CLI: `npm run astro`
 - Single test: not available (no test runner configured)
 - CI check (PRs): `npm run build`

### Lint / Format / Test
- `package.json` does **not** define `lint`, `format`, or `test` scripts.
- README mentions `npm run lint` and `npm run format`, but they are not wired.
- There is no test runner configured.


## Repository Structure
- `src/pages/`: page routes, with localized routes under `src/pages/[lang]/`.
- `src/components/`: UI components (`PascalCase.astro`).
- `src/icons/`: icon components.
- `src/content/`: MDX content and Astro collections.
- `src/i18n/`: language routing and translations.
- `src/styles/`: global Tailwind + DaisyUI theme tokens.

## Code Style Guidelines

### Imports
- Use ESM `import`/`export` only (`"type": "module"`).
- Keep imports grouped at top of Astro frontmatter.
- Prefer relative paths and existing aliases (none configured).
- Keep type-only imports explicit when helpful (e.g., `import type { SupportedLang }`).

### Formatting
- Astro: frontmatter first, then markup. Keep logic in frontmatter.
- Avoid complex inline expressions in templates; compute in frontmatter.
- Follow existing quote style per file; TS files favor single quotes.
- Use trailing commas in multiline objects/arrays where already used.

### Types & Validation
- TypeScript is strict via `astro/tsconfigs/strict`.
- Use `type` aliases for unions (e.g., `SupportedLang`).
- Prefer explicit return types for exported helpers.
- Use Zod schemas for content collection validation.

### Naming
- Components: `PascalCase.astro`.
- Functions: `camelCase`.
- Files: keep existing style (`camelCase`, `kebab-case`).
- i18n routes: `kebab-case` segments (`institucional/sobre`).

### Error Handling & Guards
- Prefer early returns for invalid input (e.g., null checks).
- Gracefully handle missing optional fields (use fallbacks).
- Avoid throwing for user content unless necessary.

## Astro / Starlight Conventions
- Static output (`output: 'static'`).
- Starlight uses `docsLoader()` + `docsSchema()` for docs collections.
- Sidebar structure is defined in `astro.config.mjs`.

## Content Collections (Astro)
- `noticias` collection:
  - Required: `title`, `date`, `resumo`, `image`, `lang`.
  - Optional: `tags` (defaults to `[]`).
  - Slug derived from `date + title` via `slugify`.
- `membros` collection:
  - Required: `title`, `lang`, `cargo`.
  - Optional: `foto`, `contribuicao`, `redes`.
  - Slug derived from filename (`nome-do-membro.pt.mdx`).

## i18n Guidelines
- Supported languages: `pt`, `en`, `es`.
- Use `getLangFromUrl` to resolve language from request path.
- Use `getTranslatedPath` to generate localized route segments.
- Keep `src/i18n/routes.ts` as the source of truth for translations.

## Styling Guidelines
- Tailwind content paths include `src/**/*.{astro,ts,tsx,js,jsx}`.
- DaisyUI themes configured in `src/styles/global.css`.
- Use semantic DaisyUI classes where possible.
- Respect typography choices:
  - Base font: `Montserrat`.
  - Headings: `Bebas Neue`.
- Use theme tokens (primary/secondary/accent/neutral) rather than hard-coded colors.
- Keep custom CSS changes localized in `src/styles/global.css`.

## Markdown / MDX
- Prefer Markdown for content; keep structure simple and consistent.
- Follow README templates for `membros` and `noticias` entries.
- Use `lang` frontmatter consistently and ensure correct locale in filename.

### Frontmatter (quick reference)
- `noticias`: `title`, `date`, `resumo`, `image`, `lang` (optional `tags`).
- `membros`: `title`, `lang`, `cargo` (optional `foto`, `contribuicao`, `redes`).

## Routing & Slugs
- Route translations are keyed by the base path string.
- Slug helpers normalize accents and whitespace.
- Use `slugify` only where repo already does (`noticias` collection).

## Build Output & Search
- Output goes to `dist/`.
- Pagefind indexes are generated during `npm run build`.

## Known Gaps / TODO (for maintainers)
- No lint/format/test scripts configured.
- If you add tooling, update `package.json` and this file.

## Cursor/Copilot Rules
- No `.cursor/rules/` or `.cursorrules` found.
- No `.github/copilot-instructions.md` found.

## Practical Guidance for Agents
- Keep changes minimal and localized.
- Preserve Portuguese content where appropriate; do not auto-translate.
- Update i18n route mappings when new localized routes are added.
- When adding new pages, consider the `[lang]` route structure.
- Avoid large refactors unless requested.
- Main is protected by CI/merge guard workflows; merge via PR with green checks.
- Without GitHub branch protection, direct pushes are discouraged but not technically blocked.

## When in Doubt
- Follow patterns from nearby files.
- Prefer explicit, readable code over cleverness.
- Avoid introducing new dependencies without request.
