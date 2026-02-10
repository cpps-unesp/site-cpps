---
id: sass
title: Sass/Scss
sidebar_label: Sass
---

## Introdução

:::caution

É necessário finalizar o **TREINAMENTO CSS E HMTL** antes de começar o tutorial de utilização de Sass/Scss\*\*

:::

Sass/Scss é um **pré-processador CSS** que tem como intuito facilitar e melhorar o processo de estilização com CSS. Sendo assim, o seu intuito é oferecer métodos de estilização que não são possíveis através do CSS puro. Uns dos maiores exemplos disso são a possibilidade de utilizar _variáveis, mixins, nested rules, entre outros_ e também de solucionar o problema de repetição de código.

:::note

Este tutorial tem como objetivo facilitar o seguimento do treinamento JS do LabRI/UNESP, demonstrando como a utilização do Sass pode diminuir o tempo de estilização no desenvolvimento front-end.

:::

### Diferenças entre Sass e Scss

Sass é uma versão prévia do Scss, sendo o último considerado sua versão otimizada. Veja a seguir a diferença nas estruturas do Sass e do Scss.

- **Estrtura do Sass**:

![Estrutura do Sass](https://i.imgur.com/w5u5LSW.png)

- **Estrutura do Scss**:

![Estrutura do Scss](https://i.imgur.com/M4mmX56.png)

### Instalação

Para instalar o Sass basta entrar no [site oficial](https://sass-lang.com/install).

- **Instalando com NPM**

Utilize a seguinte linha de código:

```
npm install -g sass
```

### Vantagens em utilizar o Sass/Scss

- Facilita a organização e leitura do código;
- Facilita a reutilização de código, não sendo necessário repetir em diversos documentos CSS;
- Facilita o controle e organização da estilização da página.

## Conhecimentos básicos

### Como utilizar

Para utilizar um documento .scss é necessário:

1. Criar um documento CSS. _Exemplo_: `style.css`;
2. Criar um documento Scss. _Exemplo_: `style.scss`;
3. Criar código no documento Scss;
4. Utilizar a seguinte linha de código para adicionar o scss no css: ` sass --watch style.scss:style.css`;
5. Acrescentar o documento css no documento que será estilizado. Exemplo:
   - ![Adicionando Sass na estrutura HTML](https://i.imgur.com/Q4efvfi.png)

## Exemplo

Utilizando variáveis e nesting:

### Documento HTML

![imagem: exemplo HTML - index.html](https://i.imgur.com/GeXjfOf.png)

### Documento Scss - NAV

![imagem: exemplo Scss - nav.scss](https://i.imgur.com/T24Xzm7.png)

### Documento Scss - Style

![imagem: exemplo Scss - Style.scss](https://i.imgur.com/MoTAyfo.png)

### Documento Scss - Cores

![imagem: exemplo Scss - colors.scss](https://i.imgur.com/eb5GjhM.png)

## Exercício

Aplique os conhecimentos Scss/Sass em uma página HTML que contenha:

1. Uma barra de navegação com pelo menos DUAS páginas
2. Um título h1 com a cor ##191970;
3. Um texto h2 com a cor #4682B4;
4. Dois textos h3 com a cor #778899.

:::tip

Utilize nesting e variáveis para realizar o desafio.

:::
