---
id: especifico
title: Markdown
sidebar_label: Específico
---

A sintaxe básica do Markdown original pode ser insuficiente para a utilização de alguns recursos. Para estes casos é recomendado o uso de uma sintaxe extendida que seja compátivel a sintaxe básica do Markdown.

Para saber mais sobre sintaxe extendida em Markdown, [clique aqui](https://www.markdownguide.org/extended-syntax/)

Para mais tutoriais em Markdown, [clique aqui](https://www.markdownguide.org/tools/docusaurus/)

-----

## Tabelas

- Para adicionar uma tabela use tres ou mais hífens (---) para criar as colunas e pipes (|) para separar cada coluna


````
| Syntax      | Description |
| ----------- | ----------- |
| Header      | Title       |
| Paragraph   | Text        |
````
- O resultado renderizado deverá parecer com isso:

| Syntax      | Description |
| ----------- | ----------- |
| Header      | Title       |
| Paragraph   | Text        |

### Alinhamento

- Para alinhar o texto das colunas basta adicionar dois pontos na esquerda, direita, ou em ambos caso queira centralizar o texto

````
| Syntax      | Description | Test for text marks   |
| :---        |    :----:   |          ---:         |
| Header      | Title       | Here's this           |
| Paragraph   | Text        | And more              |

````

- O resultado redenrizado deverá parecer com isso:

| Syntax      | Description | Test for text marks   |
| :---        |    :----:   |          ---:         |
| Header      | Title       | Here's this           |
| Paragraph   | Text        | And more              |

- DICA: É possivel utilizar o [Markdown Tables Generator](https://www.tablesgenerator.com/markdown_tables) ou o [AnyWayData Markdown Export](https://anywaydata.com) para criar tabelas usando interface gráfica

### Formatação

- É possível alterar a formatação do texto da tabela, adicionando links, linhas de códigos e até ênfase (bold, italic)

- Para mais informações [clique aqui](https://labriunesp.org/docs/projetos/sistemas/site/markdown/geral#exemplol) ou no [guia oficial](https://www.markdownguide.org/basic-syntax/#emphasis)

- DICA: Também é possível utilizar HTML para adicionar quebras de linha e listas dentro de tabelas

-----

## Blocos de código

- A sintaxe básica de Markdown permite adicionar blocos de códigos na sua página

- Utilize três crases (```) para abrir e fechar uma caixa de código. Lembre-se de colocar os acentos no inicio e no final da caixa

- É possivel alterar a linguagem da caixa de código adicionando "bash", "hmtl" ou "javascript" após as crases do inicio, sem espaço entre as crases e a linguagem. Isso irá alterar a forma como seu bloco de código é visualizado, podendo habilitar diversos recursos de cada linguagem.

-----

## Notas de rodapé

- Quando uma *footnote é criada*, um número sobrescrito com um link aparece. Leitores podem clicar nesse número para pular para o fim da página, onde as referências ou notas de rodapés estão localizadas

- Para adicionar uma referência utilize o acento circunflexo e um identificador entre colchetes. Identificadores podem ser números ou palavras, mas não podem conter espaços ou caracteres especiais.

```
[^1]
```

- Para colocar as informações na nota de rodapé utilize colchetes, acento grave, identificador, dois pontos, texto. Como no exemplo a seguir:

```
[^1]: Minha Nota de Rodapé.
```

```

Essa é uma nota de rodapé basica,[^1] e essa é uma mais longa.[^bignote]

[^1]: Essa é a primeira nota de rodapé, a mais simples

[^bignote]: Essa é a opção mais longa para nota de rodapé, podendo adicionar paragrafos e códigos

    Adicione quantos paragrafos desejar.

    `{ meu código }`

```

- O resultado renderizado deverá parecer com isso:

Essa é uma nota de rodapé basica,[^1] e essa é uma mais longa.[^bignote]

[^1]: Essa é a primeira nota de rodapé, a mais simples

[^bignote]: Essa é a opção mais longa para nota de rodapé, podendo adicionar parágrafos e códigos

    Adicione quantos parágrafos desejar.

    `{ meu código }`

- A seta azul é interativa, ou seja é possível clicar nela para pular para o local original da referência

- O final da página deverá se parecer com isso: 