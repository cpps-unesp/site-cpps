---
id: html
title: HyperText Markup Language (HTML)
sidebar_label: HTML
---

## Módulo 1: Primeiros passos

### O que é HTML?

HyperText Markup Language (HTML) trata-se da fonte primária de inserção de textos e imagens em uma página web. De certa maneira, o HTML puro é apenas a maneira abstrata de gerar informações, não contando com estilizações avançadas. Por esse motivo, aprender HTML significa aprender a base de toda a construção de uma página da Web e, posteriormente, aprender a intercalar esses conhecimentos com o Cascading Style Sheets (CSS) e o JavaScript para que o resultado final conte com maior nível de personalização e interação, facilitando a visualização e administração de dados.

### Ferramentas necessárias

Para aprender e dominar os conhecimentos sobre HTML é necessário utilizar um editor de texto para a prática do que será aprendido. Além disso, saber manusear um editor de texto pode se tornar de grande importância para facilitar processos que podem ser automatizados.

:::tip

Sugestões de editor de texto: [Atom](https://atom.io) ou [VSCode](https://code.visualstudio.com).

:::

Além disso, será necessário utilizar um navegador (Chrome, Safari, etc...) para poder visualizar o que está sendo gerado no editor de código.

:::tip

Procure não utilizar o _Internet Explorer_ devido a limitação do navegador em lidar com ferramentas mais avançadas.

:::

## Primeiros Passos

Crie uma pasta pessoal para o projeto para que todos os arquivos de código sejam encontrados facilmente.

### Criando um arquivo

**Editor de texto utilizado**: _Vs Code_

1. Abra o VS Code;

2. Clique em "Arquivo" e depois em "Abrir pasta" para abrir a pasta do projeto;

3. Clique em "Arquivo" e depois em "Novo arquivo";

4. Utilize o comando "Ctrl + S" para Salvar o arquivo;

5. Salve o Arquivo na pasta do projeto como "nomedoarquivo.html" para que o arquivo seja entendido como um documento HTML.

6. Para criar um novo arquivo utilize o comando "Ctrl + N" e depois use o comando "Ctrl + S" para salvá-lo.

### Entendendo as estruturas básicas da web

O HTML é utilizado para definir o conteúdo de uma página web. Sendo assim, para criar qualquer página na web é necessário aprender a utilizar o HTML para criar as estruturas básicas para o funcionamento das páginas criadas.

## Criando uma primeira página com HTML

1. Crie uma pasta chamada "basic-web-pages" dentro da sua pasta pessoal de códigos;

2. Crie um arquivo chamado "basics.html";

### Estrutura do documento HTML

Todo documento HTML precisa de uma estrutura básica, sendo essa composta em primeiro momento por "!DOCTYPE html" para indicar para o navegador que o documento está escrito em HTML.

Além disso, é necessário que todo o código esteja dentro da tag html. Sendo assim, abra o documento com

    <html> ("opening tag")

e feche o documento com

    </html> ("closing tag").

Todo documento HTML precisa de uma tag

    <head> conteúdo </head>

A tag "head" comporta todo o metadata do site: título da página, código de CSS, etc...

A próxima tag básica de todo código de HTML seria o "body"

    <body> conteúdo </body>

Sendo assim: as três tags necessárias em todos os códigos de html são "html", "head" e "body".

Para escrever páginas que comportam caracteres utilizados na língua portguesa, utilize o comando "meta charset" no início da página

    <!DOCTYPE html>
    <meta charset="utf-8">

UTF-8 trata-se de uma recomendação atual para enconding na Web, sendo compatível com quase todos os idiomas do mundo.

Essa tag serve para comportar toda a parte vísivel do código na página web.

    <!DOCTYPE html>
    <meta charset="utf-8">
    <html>
    <head>
    </head>
    <body>
    </body>
    </html>

Já no caso de especificar a língua principal da página, basta colocar uma indicação "lang" na tag "html"

```
<!DOCTYPE html>
<html lang="pt-br">
```

#### Fazer um comentário no código

Para criar um comentário que não será lido pelo código, basta utilizar

    <!-- texto -->

### Adicionando o título da página

Para adicionar um título para sua pagína basta utilizar a tag "title" no "head" do código

    <!DOCTYPE html>
    <meta charset="utf-8">
    <html>
        <head>
            <title>Título</title>
        </head>
    <body>
    </body>
    </html>

Para visualizar o código basta salvar o arquivo e abrir e visualizá-lo através de um navegador.

### Adicionando parágrafos

Para adicionar parágrafos basta utilizar a tag "p" no "body" do código

    <!DOCTYPE html>
    <meta charset="utf-8">
    <html>
        <head>
            <title>Título</title>
        </head>
        <body>
            <p>Exemplo de parágrafo</p>
        </body>
    </html>

:::tip

Dica utilize o site [Lorem Ipsum](https://www.lipsum.com) para gerar textos autómaticos. A sua utilização pode facilitar a criação de páginas modelo.

:::

### Utilizando "headings" (tamanhos de textos)

Muitas vezes se faz necessário utilizar diferentes tamanhos de textos no corpo da página: diferenciar um título de um texto, etc. Para fazer isso, basta utilizar as diferentes tags "h": h1, h2, h3, ..., h6. Quanto menor for o número, maior será o tamanho da fonte.

    <!DOCTYPE html>
    <meta charset="utf-8">
    <html>
        <head>
            <title>Título</title>
        </head>
        <body>
            <h1>Exemplo de título</h1>
            <h2>Exemplo de subtítulo</h2>
            <p>Exemplo de parágrafo</p>
        </body>
    </html>

Além disso, a diferença entre as tags de headings também está na ordem de relevância de cada uma. As ferramentas que processam as informações do código HTML, como as ferramentas de busca online, determinam que cada heading possui um nível de importância, não sendo possível haver mais de "h1" em uma mesma página pois essa tag determina o que se apresenta como mais importante.

### Criando listas não ordenadas

Utilize a tag "ul" para que o navegador reconheça que tudo que está dentro dessa tag pode ser entendido como uma lista não ordenada.

    <body>
    <ul>
    </ul>
    </body>

Utilize a tag "li" para indicar cada um dos tópicos da lista

    <body>
    <ul>
    <li>Tópico um</li>
    <li>Tópico dois</li>
    <li>Tópico três</li>
    </ul>
    </body>

### Criando listas ordenadas

Utilize a tag "ol" para que o navegador reconheça que tudo que está dentro dessa tag pode ser entendido como uma lista ordenada.

    <body>
    <ol>
    </ol>
    </body>

Utilize a tag "li" para indicar cada um dos tópicos da lista de forma ordenada (1, 2, 3, ...)

    <body>
    <ol>
    <li>Tópico um</li>
    <li>Tópico dois</li>
    <li>Tópico três</li>
    </ol>
    </body>

### Elementos inline: ênfase (itálico)

Para gerar ênfase em uma palavra/frase dentro de um parágrafo basta utilizar a tag "em"

    <body>
    <p>
    <em>Lorem ipsum</em> dolor sit amet, consectetur adipiscing elit.
    </p>
    </body>

### Elementos inline: destacar (negrito)

Para destacar uma palavra/frase dentro de um parágrafo basta utilizar a tag "strong"

    <body>
    <p>
    <strong>Lorem ipsum</strong> dolor sit amet, consectetur adipiscing elit.
    </p>
    </body>

É possível utilizar a tag "em" e "strong" em conjunto

    <body>
    <p>
    <em><strong>Lorem ipsum</strong></em> dolor sit amet, consectetur adipiscing elit.
    </p>
    </body>

### Como quebrar um texto

#### Quebra de linha

Para quebrar uma linha utilize a tag "br" de "break"

    <body>
    <p>
    Lorem ipsum<br/>
    dolor sit amet, consectetur adipiscing elit.
    </p>
    </body>

#### Quebra de texto utilizando uma "linha" horizontal

Para quebrar um texto utilizando uma "linha" horizontal utilize a tag "hr"

    <body>
    <p>
    Lorem ipsum<br/>
    dolor sit amet
    </p>
    <hr/>
    <p>consectetur adipiscing elit.</p>
    </body>

### Como inserir imagens

Para inserir uma imagem é necessário que ela esteja em uma pasta img dentro da pasta do projeto, sendo recomendado que ela esteja no formato **SVG**. Depois, basta utilizar a tag "figure" e indicar o caminho relativo da imagem através de um código "img src"

```
<body>
<figure>
<img src="/imagens/logos/logo-cpps-unesp.png">
</figure>
</body>
```

Para inserir legenda da imagem basta utilizar a tag "figcaption"

```
<body>
<figure>
<img src="/imagens/logos/logo-cpps-unesp.png">
<figcaption>Legenda da imagem</figcaption>
</figure>
</body>
```

### Como inserir um "favicon"

Para inserir um _favicon_ é necessário que o mesmo esteja na pasta img do projeto e que esteja no formato "ico".

Para utilizar no código basta colocar o caminho relativo da imagem na tag "link" na "head"

```
<hmtl lang="pt-br">
<head>
<title>Título da Página</title>
<link href="img/img.ico" rel="icon">
</head>
</html>
```

### Como mudar a cor de um elemento de texto usando apenas HTML

Para mudar a cor de um ou mais elemento de texto utilizando apenas o HTML basta referenciar a cor através da tag "font color"

```
<h1><font color="red">Nome</font> da Página</h1>
```

## Quiz 1: FORMULÁRIO

Preencha o formulário para poder continuar o treinamento. [Acesse aqui](https://forms.gle/giyg5LUv4arh1zP69)

## Exercício Prático 1

Reproduza a imagem abaixo utilizando apenas os conhecimentos aprendidos nesse primeiro módulo.

![exemplo](https://i.imgur.com/naY1BQ1.png)

Link das imagens necessárias:

- [Icon](https://findicons.com/icon/238224/application_xml)

- [Imagem principal](https://imgur.com/nX8u383)

## Módulo 2: Aprofundando os conhecimentos HTML

**PRÉ-REQUISITOS PARA FAZER O MÓDULO 2 DO HTML**: Concluir _[Quiz 1](https://forms.gle/giyg5LUv4arh1zP69)_, _[Exercício Prático 1](https://labriunesp.org/docs/projetos/ensino/trilha-dados/linguagens/js/html#exercício-prático)_ e o _[Módulo 1 do CSS](https://labriunesp.org/docs/projetos/ensino/trilha-dados/linguagens/js/css)_.

### Listas de definição

As listas de definição são necessárias quando se está listando termos e significados, como em um glossário. Para fazer isso basta utilizar a propriedade "dl".

```
<dl>
    <dt>HTML</dt>
    <dd>
    HyperText Markup Language (HTML) trata-se da fonte primária de inserção de textos e imagens em uma página web.
    </dd>
    <dt>CSS</dt>
    <dd>
    Cascading Style Sheet (CSS) é utilizado para personalizar e estilizar os elementos escritos através do HTML.
    </dd>
</dl>
```

#### Utilizando propriedade CSS para estilizar listas no HTML

Existe uma propriedade que facilita o processo de personalização os tipos de listas HTML: **list-style-type**.

Utilize o documento do código CSS para estilizar.

```
ul{
    list-style-type: circle;
}

ol{
    list-style-type: upper-alpha;
}
```

:::caution

_upper-alpha_ determina que haverá uma sequência alfabética antes de cada "li", enquanto _circle_ determina que será alterado para círculo na frente de cada "li".

:::

### Links no HTML

Para fazer com que uma palavra e/ou frase se torne um link para outra página, basta utilizar a tag "a".

```
<p>Aprenda <a href="https://labriunesp.org/docs/projetos/ensino/trilha-dados/linguagens/js/html">HTML</a> online.</p>
```

## Módulo 3: Semântica

**PRÉ-REQUISITOS PARA FAZER O MÓDULO 3 DO HTML**: Concluir

### O que são elementos semânticos?

Elementos semânticos são tags utilizadas para organizar a estrutura do código com maior nível de precisão, tornando as informações mais compreensíveis através de uma organização específica e simples.

Além disso, elementos semânticos são essenciais para que o site seja priorizado pelas ferramentas de busca, facilitando que seu conteúdo seja encontrado de maneira mais fácil.

Outro fator importante seria o maior nível de acessibilidade resultante do bom uso de elementos semânticos. Por exemplo, facilita e padroniza a leitura através de softwares específicos.

**Lembre-se**: Por se tratar de uma questão estrutural, os elementos semânticos devem estar no código HTML e não no CSS.

| Tag     | Explicação                  | Exemplo                               |
| ------- | --------------------------- | ------------------------------------- |
| section | Para seção de genérica      | -                                     |
| article | Para seção idependente      | Artigo de revista, post de fórum, etc |
| address | Para informações do article | Contato de uma empresa, etc           |
