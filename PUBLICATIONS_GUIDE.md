# Guia de Publicações

Este documento descreve como adicionar e gerenciar publicações no site do CPPS.

## Estrutura de Arquivos

As publicações estão localizadas em `src/content/publicacoes/[lang]/`.

Exemplo: `src/content/publicacoes/pt/artigo-exemplo.md`

## Formato do Frontmatter

Cada arquivo Markdown deve conter o seguinte cabeçalho:

```markdown
---
title: "Título da Publicação"
date: 2024-02-15
authors: ["Autor 1", "Autor 2"]
summary: "Um breve resumo do trabalho acadêmico."
tags: ["Democracia", "Instituições"]
type: "artigo" # Opções: artigo, analise, material-didatico, texto-curto, texto-longo
lang: "pt"
image: "/imagens/campus/entrada-unesp-franca.jpg"
featured: true
pdf_url: "https://exemplo.com/artigo.pdf" # Opcional
---
```

## Tipos de Publicação

Os tipos suportados e suas traduções em `pt.json`:
- `artigo`: Artigo
- `analise`: Análise
- `material-didatico`: Material Didático
- `texto-curto`: Texto Curto
- `texto-longo`: Texto Longo

## Como Adicionar uma Nova Publicação

1. Crie um arquivo `.md` na pasta do idioma correspondente.
2. Preencha o frontmatter com os metadados acadêmicos.
3. Escreva o conteúdo em Markdown abaixo do frontmatter. Utilize títulos (`##`, `###`) para organizar as seções (Introdução, Metodologia, etc).

## Estilo

A seção de publicações utiliza a fonte **Montserrat** para títulos para garantir um aspecto profissional e acadêmico, similar a periódicos como BPSR e InternetLab.
As publicações podem ser filtradas por tipo e pesquisadas por título ou autor na página de listagem.
