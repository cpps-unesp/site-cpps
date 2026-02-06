---
id: geral
title: Markdown
sidebar_label: Geral
---

## O que é Markdown?

:::tip
Markdown é a linguagem utilizada para a formatação de textos. Por exemplo, em programas como o Microsoft Word, você aperta um botão e o texto fica em negrito. No markdown, você adiciona caracteres específicos no texto para formatá-lo. Por exemplo, para deixar uma palavra em negrito, coloque dois asteriscos entre o texto.
:::

É possível utilizar aplicativos de edição para markdown, mas é importante que se entenda o processo como um todo e como utilizá-lo manualmente.

## Por quê usar markdown?

O markdown foi criado para uso em websites, portanto pode ser usado em conjunto com diversas linguagens de programação diferentes. O markdown é bem amplo, possui códigos simples e alguns mais complexos. O uso cotidiano facilita o manuseio.

## Exemplo

```

**Olá!**, *Clique em uma opção para continuar:*
- [Opção 1](link da opção 1)
- [Opção 2](link da opção 2)

```
O texto acima está formatado com o markdown, o resultado dele seria esse:

**Olá!**, *Clque em uma opção para continuar:*

- [Opção 1](https://www.markdownguide.org/getting-started/)
- [Opção 2](https://www.markdownguide.org/basic-syntax/)

-----

## Citação

Para criar um campo de citação, somente adicione um ">" na frente da frase, por exemplo:

```
> LabRI UNESP
```
O texto ficaria assim:
> Labri UNESP

## Imagem

Para inserir uma imagem qualquer no site, tenha ela salva nos seus documentos. Entre no Gitpod e na aba lateral esquerda procure por website > static > img. Clique com o botão direito em img e em Upload. Escolha a imagem salva nos seus documentos.

Agora, sua imagem está salva no diretório do site. Para inseri-la na página, utilize o seguinte código:

```
![Título](/imagens/logos/logo-cpps-unesp.png)
```

No título, você pode colocar qualquer coisa, é só para razões de controle.
O link seguinte é a localização do arquivo no diretório do site. Não esqueça de descrever o formato (geralmente png, jpg ou jpeg).
Lembre-se, ao renomear o arquivo no diretório, você irá precisar trocar o nome na edição também.

-----

## Material de Apoio


- Para se aprofundar sobre o conceito do markdown, [clique aqui](https://www.markdownguide.org/getting-started/).
- Para visualizar os códigos mais básicos, [clique aqui](https://www.markdownguide.org/basic-syntax/).
- Para visualizar códigos mais complexos, [clique aqui](https://www.markdownguide.org/extended-syntax/).
- As vezes, pode acontecer do markdown não ser o suficiente para uma formatação que você deseja. Nesse caso, [clique aqui](https://www.markdownguide.org/hacks/) para visualizar alguns códigos em HTML para auxiliá-lo nessas ocasiões.
- Caso você esteja procurando aplicativos para editar markdown ou queira saber quais programas aceitam essa linguagem, [clique aqui](https://www.markdownguide.org/tools/).
- O site do LabRI é criado no Docusaurus, para visualizar o uso do markdown especificamente no Docusaurus, [clique aqui](https://docusaurus.io/docs/markdown-features).
- [Centralizando link ou imagem no Ducosaurus](https://stackoverflow.com/questions/57788506/center-a-hyperlink-or-an-image-in-docusaurus)