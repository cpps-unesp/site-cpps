---
title: "Guia de Edição da Documentação"
description: "Aprenda como adicionar e editar arquivos na pasta /docs"
---

# Guia de Edição

Esta documentação agora é parte integrante do projeto Astro principal. Todos os arquivos residem em `src/content/docs/`.

## Como Editar um Arquivo Existente

1. Navegue até a pasta `src/content/docs/`.
2. Encontre o arquivo que deseja editar (ex: `projetos/dados/hemeroteca-peb/index.md`).
3. Abra o arquivo em seu editor de preferência.
4. Altere o conteúdo. O formato utilizado é **Markdown** (ou **MDX** se precisar de componentes Astro).
5. Salve o arquivo. O Astro atualizará automaticamente a página.

## Como Adicionar um Novo Arquivo

1. Crie um novo arquivo `.md` na subpasta desejada dentro de `src/content/docs/`.
2. Adicione o **Frontmatter** no topo do arquivo:

```markdown
---
title: "Título da sua Página"
description: "Uma breve descrição do que trata este documento"
---

# Conteúdo Principal

Seu texto em Markdown aqui...
```

3. O Astro criará automaticamente uma rota baseada no caminho do arquivo.
   - Exemplo: `src/content/docs/meu-projeto/info.md` -> `cpps.franca.unesp.br/docs/meu-projeto/info`

## Organização de Pastas

Tente manter a estrutura atual para facilitar a navegação:
- `projetos/dados/`: Projetos focados em datasets.
- `projetos/ensino/`: Trilhas e materiais educativos.
- `projetos/sistemas/`: Documentação de software e infraestrutura.

## Formatos Suportados

- **Markdown (.md)**: Padrão para textos, tabelas e links.
- **MDX (.mdx)**: Permite o uso de componentes interativos do Astro dentro do texto.
- **Astro Components**: Você pode usar classes do Tailwind CSS e DaisyUI se necessário.

## Atualizando o Menu Lateral

Atualmente, o menu lateral é definido no arquivo `src/pages/docs/[...slug].astro`. Se você adicionar uma nova seção principal, lembre-se de atualizar o array `sidebar` naquele arquivo.
