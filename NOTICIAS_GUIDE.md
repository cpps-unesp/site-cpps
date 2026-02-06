# Guia de Gerenciamento de Notícias

Este guia explica como criar, editar e gerenciar as notícias do site CPPS.

## Como criar uma nova notícia

As notícias são armazenadas como arquivos Markdown (`.md`) na pasta `src/content/noticias/`.

1. Crie um novo arquivo com a extensão `.md`.
2. O nome do arquivo deve ser curto e descritivo (ex: `nova-pesquisa-unesp.md`).
3. Adicione o seguinte cabeçalho (frontmatter) no início do arquivo:

```markdown
---
title: "Título da Notícia"
date: 2024-03-20
resumo: "Uma breve descrição da notícia que aparecerá nos cartões de listagem."
tags: ["Categoria 1", "Categoria 2"]
image: "/imagens/noticias/sua-imagem.jpg"
lang: "pt"
author: "Nome do Autor"
featured: false
---
```

### Explicação dos campos:

- **title**: O título principal da notícia.
- **date**: Data de publicação (formato AAAA-MM-DD).
- **resumo**: Texto curto que aparece na listagem e abaixo do título na página da notícia.
- **tags**: Lista de categorias. A primeira tag costuma ser a principal.
- **image**: Caminho para a imagem de destaque. As imagens devem ser colocadas na pasta `public/imagens/noticias/`.
- **lang**: Idioma da notícia (`pt`, `en` ou `es`). **Importante**: Você deve criar um arquivo para cada idioma se desejar que a notícia apareça em todas as versões do site.
- **author**: (Opcional) Nome de quem escreveu a matéria.
- **featured**: Se definido como `true`, esta notícia aparecerá no destaque principal (no topo) da página de notícias. Se houver mais de uma notícia marcada como `true`, a mais recente será escolhida. Se nenhuma for marcada, a mais recente do site será o destaque automaticamente.

## Estilizando o conteúdo

Abaixo do cabeçalho, você pode escrever o conteúdo da notícia usando Markdown padrão.

```markdown
## Subtítulo
Este é um parágrafo normal.

- Item de lista 1
- Item de lista 2

[Link para algum site](https://unesp.br)
```

## Dicas para o "Estilo Agência Pública"

- **Títulos Impactantes**: Use títulos claros e diretos.
- **Imagens de Qualidade**: O estilo jornalístico depende muito de boas imagens de destaque.
- **Tags**: Use tags consistentes para que a barra lateral de categorias funcione bem.

## Integração Futura

Atualmente, o sistema utiliza arquivos locais. Para a futura integração com **Strapi** ou **Notion**, a estrutura de dados (campos como título, data, resumo, etc.) foi planejada para ser compatível com essas plataformas.
