---
id: css
title: Cascading Style Sheet (CSS)
sidebar_label: CSS
---

## Módulo 1: Primeiros passos

**PRÉ-REQUISITOS PARA FAZER O MÓDULO 1 DO HTML**: Concluir _[Quiz 1](https://forms.gle/giyg5LUv4arh1zP69)_ e _[Exercício Prático 1](https://labriunesp.org/docs/projetos/ensino/trilha-dados/linguagens/js/html#exercício-prático)_.

### O que é "CSS"?

:::tip
Cascading Style Sheet (CSS) é utilizado para personalizar e estilizar os elementos escritos através do HTML. Além disso, CSS passou a ser uma linguagem completa que dispensa as regras de estilo do HTML, principalmente por gerar resultados mais robustos e por ser de fácil utilização. 
:::


De modo geral, CSS possui uma estrutura de sintaxe simples, para definir um valor basta utilizar ":" e terminar com ";"

```
color: blue;
background-color: black;
```

Outra maneira de indicar um valor específico, seria através da tag "style" 

* _style_ aplicado no elemento: 

```
<p style="color: blue; background-color: black;">
Testando estilos com CSS
</p>
```

* _style_ como tag separada: 

A tag "style" deve estar dentro da tag "head". Veja um exemplo:

```
<!DOCTYPE html>
<html>
    <head>
    <meta charset="utf-8">
    <title>Exemplo</title>
        <style>
            p{
                color: blue;
                background-color: black;
            }
        </style>
    </head>
</html>
```

### Como utilizar o CSS

A maneira de indicar um estilo dentro do CSS segue uma ordem, sendo ela: 

* **Seletor**: o nome do elemento que deseja modificar.  
    
    * *Exemplo*: se o seletor for "p" então todos os elementos do código que são definidos por "p" estarão seguindo o estilo indicado por essa tag.

* **Propriedade**: o nome do que deseja ser modificado dentro do elemento (seletor) indicado. 

    * *Exemplo*: se a propriedade for "color" então a cor do texto do seletor será da cor indicada nessa linha. 

* **Propriedade-subpropriedade**: tem a mesma característica da "Propriedade" mas adiciona uma subdivisão específica do que deseja ser estilizado. 

    * *Exemplo*: se a propriedade-subpropriedade for "background-color" então a cor que será modificada será apenas do elemento indicado. 

```
seletor{ 
    propriedade: valor;  
    propriedade-subpropriedade: valor;
}
```

### Como aplicar o CSS através de um arquivo separado

Para que o código fique mais organizado, é necessário criar um arquivo ".css" para a página que deseja editar. Sendo assim, é recomendado criar uma pasta CSS dentro da pasta do projeto para que todos os documentos .css possam ser encotrados nessa nova pasta. 

*Exemplo*: Para estilizar uma página chamada de "sobre.html" é interessante dar o nome do arquivo css de "sobre.css". 

### Como referenciar o arquivo CSS dentro do arquivo HTML 

Após criar o documento .css é necessário fazer uma referencia direta na "head" através da tag "link" e utilizando o caminho relativo do arquivo. 

```
<link rel="stylesheet" href="css/sobre.css">
```

### Algumas propriedades essenciais do CSS 

#### Texto

|Propriedade|Valor|Observação|
|-----------|-----|----------|
|text-align|center/right/left/justify|-|
|text-decoration|underline/italic/bold|-|
|font-family|serif/sans-serif|Utilizar o **nome** da fonte entre aspas seguido do tipo de fonte que ela se encaixa. *Exemplo*: "Helvetica", sans-serif;|
|line-height|Tamanho da altura de cada linha|Utilizar medidas em pixel (px), rem (rem), etc|
|letter-spacing|Espaçamento entre letras|Utilizar medidas em pixel (px), rem(rem), etc|
|word-spacing|Espaçamento entre palavras|Utilizar medidas em pixel(px), rem(rem), etc|
|color|Cor da fonte|Utilizar nome de cores em inglês ou o código da cor utilizando "#" e 6 dígitos. *Exemplo*: #000000;| 

#### Fundo 

|Propriedade|Valor|Observação|
|-----------|-----|----------|
|background-color|Cor de fundo do elemento|Utilizar nome de cores em inglês ou o código da cor utilizando "#" e 6 dígitos. *Exemplo*: #000000;|
|background-image|Imagem de fundo do elemento|Utilizar a url da imagem. *Exemplo*: url(link padrão)|

#### Bordas

|Propriedade|Valor|Observação|
|-----------|-----|----------|
|border-width|Largura da borda|Utilizar medidas em pixel (px), rem (rem), etc|
|border-color|Cor da borda|Utilizar nome de cores em inglês ou o código da cor utilizando "#" e 6 dígitos. *Exemplo*: #000000;|
|border-style|solid/dotted/double/etc|-|

Além disso, a função de borda pode ser simplificada para apenas: 

```
seletor{
    border: valor da width, style, cor da borda;
}
```

Caso prefira colocar a borda em apenas um local específico do elemento, é possível utilizar a posição (bottom/left/right/top) na frente da propriedade "border". *Exemplo*: border-left: 2px dotted red;

### Quiz: FORMULÁRIO 

Teste os conhecimentos aprendidos neste primeiro módulo através deste [formulário](https://forms.gle/hrmKYE9DJPqivbzk7).

## Módulo 2: Aprofundando os conhecimentos CSS

**PRÉ-REQUISITOS PARA FAZER O MÓDULO 2 DO CSS**: Concluir 

### Dimensões 

Compreender como funciona a estilização de dimensões é importante para conseguir determinar a altura e a largura dos elementos dentro de uma página. Para isso, basta utilizar as tags "height" (altura) e "width" (largura). 

Lembre-se: as medidas devem estar em _pixels_ (px), _rem_ (rem), etc. 

```
p{
    background-color: #F1F1F1;
    height: 750px;
    width: 500px;
}
```

### Espaçamento 

As propriedades de espaçamento são importantes para determinar o espaçamento interno dos elementos, facilitando a leitura e visualização do resultado final. 

|Propriedade|Valor|Observação|
|-----------|-----|----------|
|Padding|Propriedade utilizada para determinar os limites internos de um elemento (margem/borda)|Utilizar medidas em pixel (px), rem (rem), etc ou apenas escrever "auto"|
|Margin|Propriedade utilizada para determinar os limites externos de um elemento (margem/borda)|Utilizar medidas em pixel (px), rem (rem), etc ou apenas escrever "auto"|

#### Padding 

É possível determinar o padding de cada um dos lados do elemento:

```
p{
    padding-top: 10px;
    padding-right: 5px;
    padding-bottom: 5px;
    padding-left: 10px;
}
```

Também é possível simplificar o código determinando todos os valores em apenas uma linha: 

```
p{
    padding: 10px 5px 5px 10px; 
}
```

_Lembre-se_: os valores serão entendidos através da ordem: top/right/bottom/left. 

#### Margin 

É possível determinar a margin de cada um dos lados do elemento:

```
p{
    margin-top: 10px;
    margin-right: 5px;
    margin-bottom: 5px;
    margin-left: 10px;
}
```

Também é possível simplificar o código determinando todos os valores em apenas uma linha: 

```
p{
    margin: 10px 5px 5px 10px; 
}
```

_Lembre-se_: os valores serão entendidos através da ordem: top/right/bottom/left. 

### Maior nível de especificação de seletores 

Para estilizar propriedade mais específicas basta utilizar a tag "id" no código HTML:

```
<figure>
    <img src="/imagens/img-geral/exemplo.png" alt="Imagem" id="nome-imagem">
</figure>
```

Logo em seguida utilize o CSS para modificar o elemento desejado:

```
#nome-imagem{
    width= 30px;
}
```

:::caution

A especificação "id" sobressai os outros seletores. Isso significa que se houver duas definições (seletor e id) o navegador irá reconhecer apenas o "id". 

:::

#### Herança 

Entender o conceito de herança no código CSS facilita o processo de criação do código, além de simplicar e evitar repetições desnecessárias. Sendo assim, alguns elementos (elementos pai) são capazes de gerar heranças que podem ser utilizadas em elementos posteriores. 

Para que isso seja possível basta utilizar o valor "inherit" quando for determinar uma propriedade dentro do CSS. 

Veja no exemplo a seguir um caso onde o valor de um elemento irá ser herdado por outro elemento

```
img{
    width: 30px;
    height: 30px;
}

img2{
    width: inherit;
    height: inherit; 
}
```

### Classes 

Para que a estilização de um elemento não afete outro elemento de uma mesma tag, utilize classes para especificar o que deve ser modificado. 

_Exemplo_: quando for modificar o valor de uma tag "h2" utilize uma definição de class para que a modificação seja afeita apenas no h2 desejado. 

**HTML**:

```
<h2 class="subtitulo">Aprendendo HTML e CSS</h2>
```

**CSS**: 

```
.subtitulo{
    color: red;
    font-size: 12px;
}
```

### Quiz: Formulário Módulo 2 CSS

Preencha o [Quiz do Módulo 2](https://forms.gle/QCpAGPAbgNbD3Dav5) para fixar os conhecimentos adquiridos neste módulo. 

## Módulo 3: Padrões CSS

**PRÉ-REQUISITOS PARA FAZER O MÓDULO 3 DO CSS**: Concluir o [Quiz do Módulo 2 do CSS](https://forms.gle/QCpAGPAbgNbD3Dav5). 

Devido a alta quantidade de informações contidas em um processo de estilização, é necessário se atentar na organização do código, sendo preferível optar por aderir um **padrão CSS** para facilitar o andamento da escrita do código. 

### BEMCSS

O padrão BEMCSS é uma ótima opção para quem está começando a aprender HTML e CSS, sendo uma maneira de facilitar o planejamento do nome das classes e possui grande foco na estruturação. 

#### Como funciona 

A estrutura BEM é: *bloco__elemento--modificador*

- *bloco*: trata-se de um elemento HTML que não depende de outro elemento para fazer sentido; 

- *elemento*: trata-se da parte _semântica_ do bloco;

- *modificador*: trata-se do comportamento ou estilização do bloco.

- Exemplo no HTML: 

```
<section class="biografia biografia--autor">
<h2 class="biografia__titulo">Título da Biografia</h2>
</section>
```

- Exemplo no CSS: 

```
.biografia__titulo{
    color: red;
    font-size: 10px;
}
```

#### Display 

|Tipo de Display|Significado|Modo de utilização|
|---------------|-----------|------------------|
|block|o elemento passará a ocupar toda a largura disponível; diminuir o elemento resulta em uma margem não removível|"display:block"|
|inline|o elemento ocupa o espaço necessário para visualização, permitindo que outro elemento fique ao lado quando possível; não é possivel determinar valores de tamanho.|"display:inline"|
|inline-block|permite as mesmas coisas que o "inline" porém também é possível modificar os valores de tamanho.|"display:inline-block"|

### Quiz: Formulário Módulo 3 CSS

Preencha o [Quiz do Módulo 3](https://forms.gle/Jgh6d9e88zaoGmnS7) para fixar os conhecimentos adquiridos neste módulo.

## Módulo 4: Web Design Responsivo ー Parte 1 

### Unidades Relativas: EM e REM

Utilizar medidas relativas é muito útil quando se está criando sites com maior nível de resposividade, fazendo com que seja necessário analisar como o site será recebido em diferentes dispositivos. 

- **Utilizando porcentagem (%) como medida**: 

Quando utilizamos porcentagem (%) para definir um tamanho dentro do CSS, o tamanho final será relativo ao tamanho da sua tag mãe ("div").


```
div{
    width: 100px;
}

img{
    width: 50%;
}
```

- **Utilizando EM (em) como medida**: 

Quando utilizamos EM (em) para definir o tamanho de um elemento dentro do CSS, o tamanho final será relativo ao tamanho da fonte do elemento pai. 

```
div{
    font-size: 20px;
}

img{
    width: 10em; /* 100px */
}
```

- **Utilizando REM (rem) como medida**: 

Quando utilizamos REM (rem) para definir o tamanho de um elemento dentro do CSS, o tamanho final será relativo ao tamanho da fonte da tag "html". 

```
html{
    font-size: 10px;
}

img{
    height: 10rem; /* 100px */
}
```

### Media queries 

Devido ao crescente número de usuários de dispositivos mobile, a criação de sites precisa se adaptar a essa nova demanda. Sendo assim, os elementos de um site precisam estar de acordo com qualquer dispositivo onde ele venha a ser utilizado, sendo necessário aderir ao código valores de **medias queries** que representem essa disponibilidade de mudança conforme o dispositivo utilizado. 

As _medias queries_ podem ser declaradas a partir das seguintes linhas: 

```
<link rel="stylesheet" href="base.css" media="screen">
<link rel="stylesheet" href="mobile.css" media="(max-width: 480px)">
```

Também é possível declarar as _medias queries_ separadamente dentro do arquivo CSS: 

```
@media screen {
  body {
    font-size: 16px;
  }
}

@media (max-width: 480px) {
  body {
    font-size: 12px;
  }
}
```

### Viewport

Declarar medias queries pode não ser o suficiente na maioria das vezes, tendo em vista que atualmente há uma variedade extensa de dispositivos móveis com diferentes tamanhos de tela. Para que isso não venha a ser um problema, a Apple criou uma solução para os problemas relacionados ao viewport: 

```
<meta name="viewport" content="width=370">
```

Essa declaração determina que a largura em qualquer dispositivo será de 370px. 

Também é possível fazer uma declaração que seja mais abrangente:

```
<meta name="viewport" content="width=device-width">
```

### Design Responsivo 

A ideia de Web Design Resposivo nasce da necessidade de incorporar elementos que se adequem a diferentes tipos de dispositivos sem perder a qualidade, o conteúdo e a resolução do que foi feito. 

Há três elementos que precisam existir em qualquer design responsivo: 

    1. layout fluído usando medidas flexíveis, como porcentagens e rem/em;
    2. media queries para ajustes de design;
    3. uso de imagens flexíveis.

### Mobile-first ou Desktop-first?

O conceito de _desktop-first_ significa a criação de uma página prioritariamente voltada para o uso através do desktop. Todavia, criar um design totalmente voltado para o desktop pode dificultar a sua incorporação para dispositivos móveis e com menores dimensões. 

O conceito de _mobile-first_ significa a criação inversa da ideia apresentada pelo _desktop-first_, ou seja, o foco passa a ser a criação de páginas para visualização e utilização em dispositivos móveis e com menores dimensões. A prática do _mobile-first_ facilita a incorporação de medidas de dispositivos maiores (como o desktop) e com diferentes resoluções. 

### CSS Reset 

Quando não especificamos os valores de estilização o navegador reconhece que o estilo utilizado será o estilo padrão dos navegadores. Para evitar que isso ocorra, utilize alguns mecanismos de CSS Reset para determinar valores básicos do CSS. 

#### Tabela de diferentes CSS Reset

|Nome|Como funciona|Download|
|----|-------------|------|
|HTML5 Boilerplate|-|[Link](https://html5boilerplate.com/)|
|YUI3 CSS Reset|-|[Link](https://cssdeck.com/blog/scripts/yahoo-css-reset-yui-3/)|
|Eric Meyer CSS Reset|-|[Link](http://meyerweb.com/eric/tools/css/reset/)|

### Importar fontes externas

Para importar fontes externas, ou seja, fontes mais específicas e estilizadas do que as que as fontes padrões, é necessário utilizar o comando "import". Veja o exemplo abaixo: 

```
@import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');

body {
    font-family: 'Roboto', sans-serif;
}
```

**Aviso**: o _import_ deve estar na primeira linha do arquivo CSS. 

### CSS Geral e CSS específico 

* **CSS Geral**: 

Criação de um arquivo css que defina valores padrões de todas as páginas do projeto. 

Embora a sua criação seja eficaz e necessária, um arquivo geral pode acabar se tornando muito extenso, fazendo com que muitas páginas tenham que fazer import de informações que não serão utilizadas por elas. 

* **CSS Específico**: 

Criação de um arquivo css que defina valores específicos da página em que será inserido. 

Embora a criação de um arquivo específico seja uma ótima alternativa para evitar arquivos pesados, o número de arquivos css criados podem afetar a quantidade de import em um arquivo html. 

### Progressive Enhancement

O conceito de "Progressive Enhancement" significa valorizar em primeiro lugar o conteúdo Web e como ele será recebido por diferentes pessoas em diferentes condições e dispositivos. 

Isso significa que é necessário priorizar e garantir a adequação das condições, opções, limitações e restrições de todas as páginas antes de publicar um projeto.

### Display Flex 

De maneira geral, "display: flex" é utilizado para manipular o posicionamento de elementos de maneira **unidimensional**, ou seja, irá distribuir valores de maneira igual. Veja alguns exemplos abaixo: 

* **Valores horizontais**: 

_justify-content_

|Propriedade|Significado|
|-----------|-----------|
|_flex-start_|Valor padrão: todos os elementos ficam grudados uns aos outros à esquerda do flex container|
|_flex-end_|Todos os elementos ficam grudados uns aos outros à direita do flex container|
|_center_|Todos os elementos ficam grudados uns aos outros no centro do flex container|
|_space-between_|O primeiro elemento fica totalmente à direita e o segundo elemento totalmente à equerda|
|_space-around_|Cada elemento possui um espaçamento igual em ambos os lados, fazendo com que o elemento que esteja na direita possua um espaçamento maior à sua direita (o valor do space-around+valor pré-existente à sua direita) e o elemento que esteja na esquerda irá ter um espaçamento maior à sua esquerda|
|_space-evenly_|Arruma o valor adicional do problema identificado no "space-around"|

* **Valores verticais**:

_align-items_

|Propriedade|Significado|
|-----------|-----------|
|_stretch_|Valor padrão: os elementos se esticam para que todos fiquem com a mesma altura|
|_flex-start_|Todos os elementos ficam alinhados no topo do flex container|
|_flex-end_|Todos os elementos ficam alinhados na base do flex container|
|_center_|Os elementos ficam alinhados no meio do flex container|
|_baseline_|Os elementos se alinham conforme o conteúdo textual de cada|

:::tip

Utilize o website [Caniuse](https://caniuse.com) para descobrir a compatibilidade das propriedades CSS em diferentes dispositivos e navegadores.  

:::

### Quiz: Formulário Módulo 4 do CSS

Conclua o [Quiz](https://forms.gle/vCUE2c7SMcyC9N4c9) para finalizar o Módulo 4 do CSS.

## Módulo 5: Web Design Responsivo ー Parte 2

### Responsividade e Fallback 

Há uma pequena parcela de usuários que utiliza navegadores mais antigos, porém esses navegadores muitas vezes não suportam propriedades e valores das versões mais novas do CSS, sendo necessário avaliar uma maneira de fazer com que o projeto seja compatível com qualquer navegador. 

A maneira mais simples de fazer isso é criando tags que contenham dois valores, sendo o primeiro valor compatível com navegadores mais antigos e o último valor compatível com navegadores mais recentes. 

O resultado será: o navegador mais antigo irá aderir o primeiro valor estabelecido, enquanto o navegador mais recente irá aderir o último valor estabelecido pois o último valor de uma tag é o que prevalece no resultado final. 

Exemplo: 

```
background-color: #f00;
background-color: #0f0;
```

### Padronizar valores do CSS

Assim como já foi visto anteriormente, a criação de padrões CSS pode ajudar na criação de códigos menores e mais objetivos.

Sendo assim, quando criamos uma primeira página com CSS, é necessário observar quais elementos serão padrão em todo o projeto. 

Após essa análise, crie um documento "container.css" para arquivar valores que serão utilizados ao decorrer de todo o projeto. 

### Utilizando "calc()" como medida 

**Comentário**: Fazer um módulo apenas explicando como utilizar os diferentes tipos de medidas e como cada uma é importante para coisas diferentes. 


### Display: grid 

Embora "display: flex" tenha se mostrado muito útil quando precisamos lidar com valores iguais, quando nos deparamos com situações em que o posicionamento precisa ser dado de maneira **bidimensional**, "flex" passa a não ser suficiente para estes casos. 

Por este motivo, quando formos lidar com situações que demandam posicionamento bidimensional, utilizamos "display: grid". 

Assim como "display: flex" irá criar um *flex container*, a utilização de "diplay grid" cria um *grid container*. Isso significa que cada um dos elementos irão ser posicionados uma coluna separada. Veja os exemplos abaixo: 

Após determinar que "display: grid", adicione outras especificações que determinarão o posicionamento dos elementos

|Propriedade|Significado|Exemplo|
|-----------|-----------|-------|
|**grid-template-columns**|Cada valor dentro dessa propriedade irá representar **uma** coluna|"grid-template-columns: 1fr 1fr 1fr" : 3 colunas em que cada uma ocupa 1 fração do espaço disponível|
|**grid-template-rows**|Cada valor dentro dessa propriedade irá representar **uma** fileira|"grid-template-rows: 1fr 1fr" : 2 fileiras em que cada uma ocupa 1 fração do espaço disponível|
|**grid-row**|Valor estabelecido para um elemento filho. Recebe dois valores: linha início e linha de término|"grid-row: span 2" : o valor "span" é utilizado para mesclar linhas e o "2" demonstra a quantidade de linhas que devem ser mescladas| 

### Quiz: Formulário do Módulo 5 do CSS

Preencha o [formulário do módulo 5](https://forms.gle/7XAZbb97JAbGhtAUA) para finalizar o módulo 5. 

## Módulo 6: Frameworks de CSS: Bootstrap

Para que não seja necessário sempre começar um projeto do zero, ou seja, criar toda a estrutura de estilização básica antes de entrar nas especificações do projeto, é muito recorrente a utilização de frameworks de CSS para facilitar o processo. 

Frameworks de CSS são arquivos opensource que contém algumas estilizações básicas para a estrutura de um projeto. 

O framework mais utilizado atualmente é o **Bootstrap**.

### O que é: Bootstrap 

Tendo sido criado por desenvolvedores do website Twitter, Bootstrap é um framework muito bem estruturado e simples de utilizar, além de conter diversos tipos de classes que podem simplificar o processo de estilização de um código. 

Para aprender mais sobre o Bootstrap basta visitar o website oficial: [GetBootstrap](https://getbootstrap.com/).

Alguns recursos disponibilizados são: 

* *Reset CSS*;

* *Estilo visual base para uma diversa quantidade de tags*;

* *Ícones*;

* *Grids prontos para uso*;

* *Componentes CSS*;

* *Plugins JavaScript*;

* *Tudo Responsivo e mobile-first*; 

* *Estilo e componentes básicos*

### Aplicação do Bootstrap

Para aplicar o Boostrap em seu projeto, basta importar através da seguinte linha de código: 

```
<link rel="stylesheet" href="css/bootstrap.css">
```

Será a partir dessa linha que o Bootstrap já estará pronto para utilizar, além de já ser aplicado o reset disponibilizado.

*Exemplo de classe*: **Jumbotron** - utilizado para estilizar um título com frase de abertura em destaque. 

### Utilizando Bootstrap no JavaScript: JQuery

Além de conter arquivos CSS, o Bootstrap conta também com arquivo JavaScript. Entretanto, para utiliza-lo é necessário utilizar outro framework: [JQuery](https://jquery.com/). 

Basta adicionar no código: 

```
<script src="js/jquery.js"></script>
<script src="js/bootstrap.js.js">
```

### Quiz: Formulário do Módulo 6 do CSS 

Conclua o [formulário do Módulo 6](https://forms.gle/2ifuFhiVTM9R3xN19) para finalizar o Módulo 6 do CSS. 

## Tabelas de propriedades CSS

### Font

|Propriedade|Valores|Significado|
|-----------|-------|-----------|
|**font-size**|px, em, rem, pt, %|Manipulação do _tamanho da fonte_|
|**font-weight**|0 à 1000 porém depende da fonte utilizada|Manipulação do _peso da fonte_|
|**font-style**|normal, italic, oblique| - |
|**font-family**|serif, sans-serif, monospace, custom|Manipulação da _família da fonte_|

### Text

|Propriedade|Valores|Significado|
|-----------|-------|-----------|
|**text-align**|left, center, right, justify|Manipulação do _alinhamento do texto_|
|**text-transform**|capitalize, uppercase, lowercase, none|Manipulação da _capitalização do texto_|
|**text-indent**|px, em, rem, %|Manipulação do _tamanho da indentação_ que deve ser colocado antes do texto|

### Letter-spacing

|Propriedade|Valores|Significado|
|-----------|-------|-----------|
|**letter-spacing**|px, em, rem, %, pt|Manipulação do espaçamento entre as letras|

### Line-height

|Propriedade|Valores|Significado|
|-----------|-------|-----------|
|**line-height**|px, em, rem, %, pt, sem unidade de medida|Manipulação da altura das linhas|

### Cor

Diferentes maneiras de definir o valor da propriedade "color": 

|Valores|Significado|
|-------|-----------|
|**#RRGGBB**|Valor hexadecimal de uma cor. *Exemplo*: #f1f1f1|
|**#RGB**|Valor hexadecimal simplificado. *Exemplo*: #fff|
|**rgb(R, G, B)**|Valor RGB de 0 a 255. *Exemplo*: rgb(255, 0, 255)|
|**#RRGGBBAA**|Valor hexadecimal com opacidade (alpha). *Exemplo*: #ff00ff00|
|**rgba(R, G, B, A)**|Valor RGB com opacidade. *Exemplo*: rgba(255, 0, 255, 0.0)|

### Background

|Propriedade|Valores|Significado|
|-----------|-------|-----------|
|**background-color**|hexadecimal, nome, rgb, rgba|Manipulação da _cor de fundo_|
|**background-image**|url()|Inserção de _imagem de fundo_|
|**background-size**|y, x/y, cover, contain, %, rem, px, em|Manipulação do _tamanho do plano de fundo_|
|**background-repeat**|repeat, no-repeat|Manipulação de _repetição da imagem de fundo_|
|**background-position**|top right bottom left, top px, bottom rem, right %|Manipulação da _posição do plano de fundo_|

### Border 

|Propriedade|Valores|Significado|
|-----------|-------|-----------|
|**border**| espessura estilo cor|Inserção de uma borda em todo o elemento|
|**border-top**|espessura estilo cor|Inserção de uma borda no topo do elemento|
|**border-right**|espessura estilo cor|Inserção de uma borda na direita do elemento|
|**border-bottom**|espessura estilo cor|Inserção de uma borda abaixo do elemento|
|**border-left**|espessura estilo cor|Inserção de uma borda na esquerda do elemento|

### Vertical-align

|Propriedade|Valores|Significado|
|-----------|-------|-----------|
|**vertical-align**|baseline, top, middle, bottom|Alinhar verticalmente elementos inline ou inline-block|

### Width 

|Propriedade|Valores|Significado|
|-----------|-------|-----------|
|**width**|px, rem, em, %|Manipulação da _largura do elemento_|
|**min-width**|px, rem, em, %|Manipulação da _largura mínima do elemento_|
|**max-width**|px, rem, em, %|Manipulação da _largura máxima do elemento_|

### Height 

|Propriedade|Valores|Significado|
|-----------|-------|-----------|
|**height**|px, rem, em, %|Manipulação da _altura do elemento_|
|**min-height**|px, rem, em, %|Manipulação da _altura mínima do elemento_|
|**max-height**|px, rem, em, %|Manipulação da _altura máxima do elemento_|

### Box-sizing 

|Propriedade|Valores|Significado|
|-----------|-------|-----------|
|**box-sizing**|border-box, content-box|Definição de qual _caixa do box model_ será utilizada|

### Overflow 

|Propriedade|Valores|Significado|
|-----------|-------|-----------|
|**overflow**|visible, hidden, scroll, auto|Manipulação dos _elementos internos que ultrapassam o espaço definido pela tag mãe_|
|**overflow-x**|visible, hidden, scroll, auto|Manipulação dos _elementos internos que ultrapassam o espaço horizontal definido pela tag mãe|
|**overflow-y**|visible, hidden, scroll, auto|Manipulação dos _elementos internos que ultrapassam o espaço vertical definido pela tag mãe|

### Display 

|Propriedades|Valores|
|------------|-------|
|**display**|flex, block|

### Flex Container

|Propriedade|Valores|Significado|
|-----------|-------|-----------|
|**flex-direction**|row, row-reverse, column, column-reverse|Definição da _direção dos flex itens_|
|**flex-wrap**|wrap, nowrap, wrap-reverse|Definição da _quebra ou não quebra de linha_|
|**flex-flow**|row nowrap,  row wrap, column wrap|Definição de um _atalho para as propriedades __flex-direction__ e __flex-wrap__|
|**justify-content**|flex-start, flex-end, center, space-between, space-around|Definição do _alinhamento dos flex itens no container de acordo com a direção_|
|**align-items**|stretch, flex-start, flex-end, center, baseline|Definição do _alinhamento dos flex itens de acordo com o eixo do container_|
|**align-content**|stretch, flex-start, flex-end, center, space-between, space-around|Definição do _alinhamento do container em relação ao eixo vertical_|

### Flex item 

|Propriedade|Valores|Significado|
|-----------|-------|-----------|
|**flex-grow**|número (ex: 0, 1, ...)|Definição da _habilidade de um flex item crescer|
|**flex-basis**|auto, unidade (px, %, número, etc), 0|Definição do _tamanho inicial do flex item_|
|**flex-shrink**|0, 1, número|Definição da _capacidade de redução do tamanho do item_|
|**flex**|1, 0 1 auto (padrão), etc|Definição do _atalho para as propriedades flex-grow, flex-shrink e flex-basis_|
|**order**|número|Modificação da _ordem dos flex itens_|
|**align-self**|auto, flex-start, flex-end, center, baseline, stretch|Definição do _alinhamento específico de um único flex item_|



