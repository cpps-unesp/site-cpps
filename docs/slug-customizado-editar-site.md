# Slug customizado no Editar Site

## Objetivo

Permitir URL amigável para páginas de `editar-site` sem renomear o arquivo físico.

Exemplo:

- Arquivo: `src/content/editarSite/02-criar-arquivo.mdx`
- URL canônica: `/pt/editar-site/criar-arquivo`

## Como usar

Adicione o campo `custom_slug` no frontmatter da página desejada:

```md
---
title: Criar Arquivos
description: Criar Arquivos
custom_slug: criar-arquivo
sidebar_order: 2
sidebar_label: Criar Arquivos
---
```

## Regras

- `custom_slug` é opcional.
- Quando definido, ele vira o slug canônico da página.
- O nome do arquivo continua livre para seguir convenções internas (ex.: prefixo numérico para ordenação editorial).
- Sem `custom_slug`, o slug padrão continua sendo derivado do `id` do arquivo (sem extensão).

## Comportamento de URL

- A rota canônica usa `custom_slug`.
- Se o slug antigo (derivado do arquivo) ainda for acessado, ocorre redirecionamento `301` para a URL canônica.

Exemplo:

- `/pt/editar-site/02-criar-arquivo` → `301` → `/pt/editar-site/criar-arquivo`

## Outros idiomas

O campo `custom_slug` pode ser usado de duas formas:

- `string`: aplica o mesmo slug em todos os idiomas.
- `objeto` por idioma: chaves opcionais `pt`, `en`, `es`.

Quando o objeto não tiver um idioma específico, o sistema usa fallback para o slug padrão do arquivo naquele item.

Exemplos de frontmatter:

### a) Slug único

```md
---
title: Criar Arquivos
custom_slug: criar-arquivo
---
```

### b) Apenas um idioma

```md
---
title: Criar Arquivos
custom_slug:
	pt: criar-arquivo
---
```

### c) Três idiomas

```md
---
title: Criar Arquivos
custom_slug:
	pt: criar-arquivo
	en: create-file
	es: crear-archivo
---
```

Com objeto parcial, se um idioma faltar, a URL desse idioma cai para o slug padrão derivado do arquivo.

## Arquivos envolvidos

- Schema da coleção: `src/content.config.ts`
- Resolução de slug (padrão e customizado): `src/utils/docsVisibility.ts`
- Roteamento de `editar-site`: `src/pages/[lang]/[editSite]/[...slug].astro`
- Sidebar de docs (usa slug resolvido): `src/utils/docsSidebar.ts`

## Boas práticas

- Use slugs curtos, em minúsculas e com hífen.
- Evite acentos, espaços e barras no início/fim.
- Mantenha `sidebar_label` para texto amigável no menu e `custom_slug` para URL.

## Validação rápida

1. Execute `npm run build`.
2. Abra a URL canônica e confirme renderização.
3. Abra a URL antiga e confirme redirecionamento `301`.

## Checklist editorial (guias do `editar-site`)

Use este checklist ao criar ou revisar páginas em `src/content/editarSite/`:

1. **Abertura padrão:** iniciar com uma frase curta no formato “Este guia...”.
2. **Termos consistentes:** preferir `página`, `conteúdo`, `coleção`, `rota (URL)` e `slug`.
3. **Frontmatter claro:** manter `title`, `description`, `sidebar_label` e `custom_slug` coerentes entre si.
4. **Tabelas de campos:** usar colunas padronizadas (`Campo`, `Obrigatório`, `Padrão`, `Exemplo`).
5. **Exemplos executáveis:** incluir exemplos de frontmatter válidos para o schema atual.
6. **Idioma e rota:** quando citar exemplos multilíngues, explicitar `pt`, `en`, `es`.
7. **Fechamento de qualidade:** rodar `npm run build` após alterações de documentação.
