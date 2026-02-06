---
id: doc
title: Documentação Recoll
sidebar_label: Documentação
---

## Configurando o Recoll

:::caution

As instruções de utilização indicadas abaixo foram feitas a partir da estação de trabalho remota do LabRI/UNESP. Sendo assim elas são destinadas especialmente às pessoas que possuem acesso a esta estação.

:::

### Passo 1 ─ Localização do programa e criação do atalho

Para localizar o programa:

1. Acessar a área de trabalho da estação remota;

2. Clicar no botão do canto inferior esquerdo (iniciar), em seguida em “acessórios” e procurar pelo “Recoll”;

3. É possível criar um atalho do programa em sua área de trabalho para facilitar acessos futuros. Para isso clique com o botão direito do mouse em cima de “Recoll” e selecione a opção “adicionar à área de trabalho”;

Veja o gif abaixo para melhor entendimento dos passos indicados acima.

![Passo 1](https://i.imgur.com/bKTZWtK.gif)

### Passo 2 ─ Configurações Iniciais

Algumas modificações ao iniciar o Recoll são necessárias para facilitar a utilização da ferramenta, abaixo estão algumas configurações necessárias:

1. Desabilitar o autocompletar:

a) Devido a quantidade de bases disponíveis no Recoll, o autocomplete acaba deixando a pesquisa mais lenta;

b) Siga o passo a passo para desabilitar: _Recoll ➡ Preferências ➡ GUI configuration ➡ disable Qt autocompletation in search entry_. Como abaixo:

![Passo 2.1](https://i.imgur.com/ImB99L6.gif)

2. Editar Programas de visualização de arquivos:

a) _Recoll ➡ Preferências ➡ GUI configuration ➡ choose editor applications ➡ Native viewers_. Como abaixo:

![Passo 2 a](https://i.imgur.com/mKUnSHj.gif)

b) Substituir programas padrão pelos especificados abaixo:

##### Substituição de programa no Recoll:

|Programa Padrão|Programa Especificado|
|---------------|---------------------|
|inode/directory|`pcmanfm %f`|
|inode/directory/parentopen|`pcmanfm --select %(childurl) %f`|
|text/html|`google-chrome %f`|
|application/pdf|`okular %f`|

Abaixo um exemplo da substituição do programa padrão pelo especificado:

![Passo 2 b](https://i.imgur.com/HcUugvn.gif)



## Utilizando o Recoll

### Selecionar o índice da base de dados desejada

##### Passo 1:

Abrir o Recoll → clique no item "_Query_" do menu → clique em "_external index dialog_";

:::tip

Leia mais sobre _external index dialog_ **[aqui](https://docs.google.com/document/d/1msD8d3czzZaCW5Iv1Q17CN--OnNc96MZPwO_QxSNB98/edit?usp=sharing#heading=h.kl72495mtjzv)**

:::

##### Passo 2

Selecione o índice da base que deseja pesquisar → clique no botão "**ok**";

##### Passo 3

Na caixa de pesquisa, realize a busca desejada.

![Gif: Selecionar o índice da base de dados desejada](https://i.imgur.com/f5rjVpE.gif)

## Pesquisas no Recoll Desktop Search

### Utilização de operadores booleanos

Para realizar pesquisas mais avançadas e deste modo aprimorar a filtragem e seleção dos arquivos disponíveis no Recoll, é necessário a utilização dos chamados **operadores booleanos (AND, OR, NOT)** e de alguns outros parâmetros voltados à filtragem de dados.

![Imagem: exemplo de operadores booleanos](https://i.imgur.com/vBuRqBP.jpg)

#### Termos Booleanos

|Exemplo|Explicação|
|-------|----------|
|`Brasil AND Mercosul`|O programa irá retornar resultados que contenham necessariamente as palavras “Brasil” e “Mercosul”|
|`Brasil OR Mercosul`|Poderá retornar as três opções: “Brasil” sozinho, “Mercosul” sozinho, ou “Brasil” e “Mercosul” no mesmo documento.|
|`Brasil -Argentina`|Só serão mostrados resultados com “Brasil” mas que não possuam o termo “Argentina” |
|`“Brasil” AND (“Coreia do Sul” OR “ONU”)` ou `“Brasil” AND “Coreia do Sul” OR “ONU”`|Essas duas expressões são equivalentes. Recomenda-se a utilização dos parênteses para deixar a construção da expressão mais clara. Além disso, cabe ressaltar que o OR tem prioridade em relação ao AND. Essa expressão irá retornar arquivos que contenham necessariamente a palavra Brasil e a palavra ONU ou Coreia do Sul.|
|`dir:/caminho/desejado`|Restringir a pesquisa do índice externo a uma pasta específica.|
|`filename: 2018` ou `filename: 2018-01-01/2022-01-01`|Restringe a pesquisa a partir de um termo que aparece o nome do arquivo. Útil se os arquivos seguem algum padrão de nomeação ou se possuem data em seu nome. Por exemplo, os PDFs das revistas brasileiras de Relações Internacionais disponíveis no LabRI, possuem sua data de publicação no nome do arquivo, sendo possível filtrar os PDFs utilizando o operador _filename_.|
|`date: 2018` ou `date: 2018-01-01/2022-01-01`|Caso, os arquivos possuam os metadados de data. É possível filtrá-los pelo operador _date_.|

### Utilização do dir

##### Passo 1

Selecionar índice externo que se deseja pesquisar;

##### Passo 2

Realizar uma busca geral no índice;

##### Passo 3

A partir do retorno da busca realizada, copie o endereço do diretório de algum arquivo retornado na busca;

##### Passo 4

Digite na busca “dir:” e cole o endereço copiado na caixa de busca do Recoll, apague o nome do arquivo, digite o termo desejado (Exemplo “Brasil AND Mercosul”):

**Copiar**: `/media/hdvm07/bd/00002-002/jornal-esp/2021/07/08/geral,bolsonaro-e-fernandez-duelam-na-abertura-da-cupula-do-mercosul-e-escancaram-divergencias-no-bloco,70003772654.html`

**Ajustar para**:
`dir:/media/hdvm07/bd/00002-002/jornal-esp/2021/07/08 Brasil AND Mercosul`

### Autoria

- [Rafael de Almeida](https://gitlab.com/unesp-labri/sites/labri/-/commits/main/website/docs/projetos/ensino/trilha-dados/recoll?author=rafaelrdealmeida)
- [Júlia Silveira](https://gitlab.com/unesp-labri/sites/labri/-/commits/main/website/docs/projetos/ensino/trilha-dados/recoll?author=Júlia%20Silveira)
- [Cintia Paulena Di Iorio](https://gitlab.com/unesp-labri/sites/labri/-/commits/main/website/docs/projetos/ensino/trilha-dados/recoll?author=cintia.iorio)
- [Ver todas as autorias](https://gitlab.com/unesp-labri/sites/labri/-/commits/main/website/docs/projetos/ensino/trilha-dados/recoll)