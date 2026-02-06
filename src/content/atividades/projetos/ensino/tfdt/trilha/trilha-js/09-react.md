---
id: react
title: React
sidebar_label: React
---

## Introdução ao React

### O que é React?

O **React** é uma biblioteca desenvolvida e disponibilizada pelo *Facebook*, sendo uma lib de [código aberto](https://github.com/facebook/react) e sendo mantida por diversos desenvolvedores a nível internacional.

Diferente do JQuery ou até mesmo do JavaScript puro, o React possui a habilidade de dividir as funcionalidades de um _software_ em **componentes**.

Esses componentes são:

1. Lógica (JavaScript);
2. Visualização (HTML/JSX);
3. Estilização (CSS).

* **JSX** ("JavaScript XML") trata-se de utilizar elementos HTML no JavaScript.

Exemplo de funcionalidade do JSX:

![Imagem: exemplo de funcionalidade do JSX](https://i.imgur.com/H85Yvdh.png)

* **Estrutura básica com _ES6_**:

![Imagem: Estrutura básica com ES6](https://i.imgur.com/fWxIIRL.png)

* **Exemplo**:

![Imagem: Exemplo básico de como utilizar o React](https://i.imgur.com/xGAvkwa.png)

:::caution

Para utilizar o componente em qualquer outra classe do projeto, basta utilizar o método `render()`:

:::

![Imagem: Explicação do método render para o React](https://i.imgur.com/QtmjkEB.png)

## Instalação e setup

* **Alternativa Um**: Para utilizar o React é necessário:

* [CDN](https://reactjs.org/docs/cdn-links.html): Biblioteca React
* [Babel](https://babeljs.io/): Compilador
* [Live-server](https://www.npmjs.com/package/live-server): Simulador de servidor

* **Alternativa Dois**: Utilize o comando [Create React App](https://create-react-app.dev):

```
npx create-react-app nome-da-pasta
cd nome-da-pasta
npm start
```

### Documentação

Acesse a [documentação do React](https://create-react-app.dev/docs/getting-started/) para entender melhor o "Getting Started"

## Propriedades

É possível repassar propriedades nas notações dos componentes e acessá-las de modo rápido. Utilizando o último exemplo, analise o exemplo a seguir:

![Imagem: Propriedades através do componente Lista](https://i.imgur.com/cGIWkAa.png)

Agora analise como esse componente pode ser acessado através da variável `this.props`:

![Imagem: Acessando o componente através da variável this.props](https://i.imgur.com/7NO3ZTw.png)

### Estado

O estado **não** é repassado ao componente, mas sim configurado em seu interior. Isso significa que é preciso de uma variável para armazenar uma lista de posts (como nos exemplos acima).

Utilize a variável `state` para definir o estado:

![Imagem: Utilizando variável state para definir o estado](https://i.imgur.com/72uu4nk.png)

Atualizando o render:

![Imagem: atualizando o render](https://i.imgur.com/GIlpYRX.png)

* **FLUXO DE RENDERIZAÇÃO**

A utilização da variável `state` ajuda a determinar a necessidade de cada componente ser renderizado novamente, caso receba alguma alteração.

* **ALTERANDO O ESTADO**

Embora seja possível acessar a variável state utilizando diretamente o `this.state`, não é possível utilizá-lo para alterar o estado. De maneira geral, o estado é **imutável**.

Todavia, é possível utilizar a função `setState` para repassarmos as variáveis que iremos atualizar no estado, ignorando outras informações que não serão modificadas:

![Imagem: atualizar estado utilizando setState](https://i.imgur.com/8e48sxc.png)

## Componentes e Métodos React

> É necessário pontuar que todo componente React tem um **ciclo de vida**, sendo necessário conhecer alguns métodos que podem interceptar sua renderização tradicional ou captar informações do ciclo.

A seguir veja alguns exemplos de **MÉTODOS**

### constructor

O método `constructor` é a primeira função executada no componente, sendo necessário repassar as `props` no componente pai `Component`.

Veja o exemplo a seguir:

![Imagem: exemplo de como utilizar o método constructor](https://i.imgur.com/kTcBQ1d.png)

### componentWillMount

O método `componentWillMount` é executado antes do método `render` e apenas **uma vez po componente** e possibilita a execução de alterações no estado.

Veja o exemplo a seguir:

![Imagem: exemplo de como utilizar o método componentWillMount](https://i.imgur.com/Knb6STi.png)

### componentDidMount

O método `componentDidMount` é executado após o método `render` e indica que a renderização inicial do componente foi finalizada. É aqui o momento indicado para qualquer processo assíncrono ou de efeito colateral (por exemplo: APIs).

Veja o exemplo a seguir:

![Imagem: exemplo de como utilizar o método componentDidMount](https://i.imgur.com/G87fBhF.png)

### componentWillReceiveProps

O método `componentWillReceiveProps` é executado logo após a atualização de algum componente.

Veja o exemplo a seguir:

![Imagem: exemplo de como utilizar o método componentWillReceiveProps](https://i.imgur.com/JuqW9Vj.png)

### shouldComponentUpdate

O método `shouldComponentUpdate` determina se o componente irá realizar o `render` novamente. Isso significa que esse método avalia se toda mudança feita deve ou não executar um novo `render`.

Veja o exemplo a seguir:

![Imagem: exemplo de como utilizar o método shouldComponentUpdate](https://i.imgur.com/kEGks6p.png)

Após a execução do `shouldComponentUpdate`, se a atualização gerou um novo `render`, será primeiramente realizado um `componentWillUpdate` e, após o render, o `componentDidUpdate`.

### componentWillUnmount

O método `componentWillUnmount` é chamado antes de um componente ser desmontado, sendo eficiente em casos que demandam o cancelamento do `EventListeners`ou `setIntervals`.

## Outros conhecimentos de React

### Stateless Components

Embora a maioria dos componentes que vimos até aqui possuam um ciclo de vida, muitos componentes React **não possuem ciclo de vida**. Ou seja, eles retornam apenas JSX.

Veja o exemplo a seguir:

![Imagem: exemplo de estrutura de um Stateless Component](https://i.imgur.com/We64AcI.png)

## Links úteis

* [Frontend Mentor](https://www.frontendmentor.io/challenges): plataforma digital para **treinar conhecimentos de JavaScript (incluindo React), CSS e HTML**.

* [Pensando em React](https://pt-br.reactjs.org/docs/thinking-in-react.html): documentação oficial do React sobre como pensar do jeito React.

### Ferramentas úteis para o uso do React

Sugestões de ferramentas para utilizar em conjunto com o React:

* [Redux](https://react-redux.js.org): Biblioteca *open-source* disponível para **React, Angular, Ember e Js**.

* [React DevTools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi): *Extensão do Google* que facilita o processo de inspecionar elementos React.

* [React-Bootstrap](https://react-bootstrap.github.io): utilizando **Bootstrap e React**.