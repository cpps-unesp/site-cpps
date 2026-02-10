---
id: jquery
title: JQuery
sidebar_label: JQuery
---

## Introdução

- [Website oficial do JQuery](https://jquery.com)

Criada em 2006 como ferramente para reduzir a escrita de algumas funções do JavaScript, JQuery é uma biblioteca _open source_ que tem como intuito facilitar o desenvolvimento front-end.

:::tip

Utilize _websites_ de exercícios (como os que foram recomendados na [página JS](https://labriunesp.org/docs/projetos/ensino/trilha-dados/linguagens/js/exercicios-js)) para se apronfundar nos conhecimentos JQuery.

:::

## Módulo 1: Primeiros Passos

### Instalando o JQuery

Pode ser utilizado através de um link direto no código HTML:

```
<script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
```

Também é possível salvar diretamente no código do projeto:

```
https://code.jquery.com/jquery-3.5.1.min.js
```

### Sintaxe

- `$(seletor).ação()`
- **$**: simbolo de acesso ao JQuery;
- **Seletor**: utilizado para encontrar os elementos HTML;
- **Ação**: o que deseja realizar

### Métodos de inicialização

- Estrutura:

![estrutura1](https://i.imgur.com/YF7vh4q.png)

- Equivale a:

![estrutura2](https://i.imgur.com/pGF6Fzo.png)

### SELETORES

Para encontrar os elementos HTML, o seletor seleciona o elemento de acordo com seu nome.

Por exemplo, para selecionar todos os elementos `<p>`, utilizamos `$("p")`.

Exemplo:

![exemplo1](https://i.imgur.com/QoWAsTn.png)

_Visualização do resultado_: [LINK](#)

Para selecionar #id, utilize: `$(#test)`.

Exemplo:

![exemplo2](https://i.imgur.com/hNgMJrc.png)

Para selecionar .class, utilize: `$(.test)`

Exemplo:

![exemplo3](https://i.imgur.com/qitacng.png)

### ATRIBUTOS

Acesse o [link](https://api.jquery.com/category/attributes/) para conhecer alguns atributos e seus significados.

### EVENTOS

Os métodos de eventos disparam eventos que acontecem quando o usuário interage com o navegador, como uma forma de manipular o comportamento do(s) elemento(s) selecionado.

| Tipo de eventos          | Nome                                                        |
| ------------------------ | ----------------------------------------------------------- |
| **Eventos de Navegador** | _scroll()_                                                  |
| **Eventos de Mouse**     | _click()_, _dblclick()_, _hover()_, _mouseleave()_, e mais. |
| **Eventos de Teclado**   | _keypress()_, _keyup()_, _keydown()_                        |

**Sintaxe**: `$("p").click();`

- **COMO UTILIZAR**

> "click()"

![click](https://i.imgur.com/sV2xiDv.png)

> "dblclick()"

![dblclick](https://i.imgur.com/tBDXiJU.png)

> "mouseenter()"

![mouseenter](https://i.imgur.com/IxnHQ5X.png)

> "mouseleave()"

![mouseleave](https://i.imgur.com/G8ZaG8s.png)

Acesse a [tabela de métodos](https://www.w3bai.com/pt/jquery/jquery_ref_events.html) de manipulação de eventos para conhecer todas propriedades e suas funções.

### EFEITOS: Básicos

A biblioteca do JQuery disponibiliza diversas técnicas para a adesão de animações em uma página web.

[Documentação](https://api.jquery.com/category/effects/)

**Exemplos**:

- Utilizando métodos "hide()" e "show()"

![efeitoExemplo1](https://i.imgur.com/V6YJ4Nn.png)

_Sintaxe_:

    $(selector).hide(speed, callback);

    $(selector).show(speed, callback);

- O efeito do JQuery será utilizado no valor de velocidade. Resultado final:

![efeitoResultado1](https://i.imgur.com/GMTStpH.png)

- Utilizando o método "toggle()" (elemento "hidden" passa a ser "shown" e "shown" passa a ser "hidden")

_Sintaxe_:

    $(selector).toggle(speed, callback);

- Resultado final:

![efeitoResultado2](https://i.imgur.com/dX1qBJI.png)

As velocidades também podem ser determinadas como, por exemplo, `("slow")` ao invés de números.

Treine os exercícios de "[Efeitos JQ](https://www.w3schools.com/jquery/exercise_jq.asp?filename=exercise_jq_dom_add2)".

### EFEITOS: Tabela e Valores

- **TABELA**

| Aplicação                    | Significado                                                                | Exemplos                                              |
| ---------------------------- | -------------------------------------------------------------------------- | ----------------------------------------------------- |
| _(speed, callback)_          | Determinar um valor (numérico ou não) de velocidade                        | $("p").fadeToggle("slow"); / $("p");fadeToggle(3000); |
| _(speed, opacity, callback)_ | Determinar um valor de velocidade para a duração de um efeito de opacidade | $("p").fadeTo("slow", 0.15);                          |
| _(stopAll, goToEnd)_         | Determinar o método stop()                                                 | $("p").stop()                                         |
| _callback_                   | Determinar o parametro callback depois do efeito ter sido aplicado         | alert("Aviso após efeito");                           |

- **VALORES**
  - **Valores relativos**: Para determinar um valor relativo, basta utilizar "+=" ou "-=" antes do valor. _Exemplo_: "height: '+=150px'"
  - **Valores pré-definidos**: Utilizar "show", "hide" ou "toggle".

### EFEITOS: "animate()"

_Sintaxe_:

```
$(selector).animate({params}, speed, callback);
```

O parametro "{params}" define a propriedade CSS a ser animada.

- Exemplos:

1.

![efeitoResultado3](https://i.imgur.com/sZRU4MT.png)

2.

![efeitoResultado4](https://i.imgur.com/fsDmxe0.png)

3. EXEMPLO COM _CALLBACK_:

![efeitoResultado5](https://i.imgur.com/HXmKM9Q.png)

### JSON e JQuery

É possível carregar dados de um arquivo ".json" em um documento utilizando o JQuery.

Para importar dados de um arquivo .json, utilize o método `$.getJSON()`, utilizando o caminho do arquivo json dentro dos parênteses.
