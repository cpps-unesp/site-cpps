---
id: configurando
title: Configurando o Recoll
sidebar_label: Configurando o Recoll
---

:::caution

As instruções de utilização indicadas abaixo foram feitas a partir da estação de trabalho remota do LabRI/UNESP. Sendo assim elas são destinadas especialmente às pessoas que possuem acesso a esta estação.

:::

### Passo 1 ─ Localização do programa e criação do atalho

Para localizar o programa:

1. Acessar a área de trabalho da estação remota;

2. Clicar no botão do canto inferior esquerdo (iniciar), em seguida em “acessórios” e procurar pelo “Recoll”;

3. É possível criar um atalho do programa em sua área de trabalho para facilitar acessos futuros. Para isso clique com o botão direito do mouse em cima de “Recoll” e selecione a opção “adicionar à área de trabalho”;

👇 Veja o gif abaixo para melhor entendimento dos passos indicados acima.

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

### Autoria

- [Rafael de Almeida](https://gitlab.com/unesp-labri/sites/labri/-/commits/main/website/docs/projetos/ensino/trilha-dados/recoll?author=rafaelrdealmeida)
- [Júlia Silveira](https://gitlab.com/unesp-labri/sites/labri/-/commits/main/website/docs/projetos/ensino/trilha-dados/recoll?author=Júlia%20Silveira)
- [Cintia Paulena Di Iorio](https://gitlab.com/unesp-labri/sites/labri/-/commits/main/website/docs/projetos/ensino/trilha-dados/recoll?author=cintia.iorio)
- [Ver todas as autorias](https://gitlab.com/unesp-labri/sites/labri/-/commits/main/website/docs/projetos/ensino/trilha-dados/recoll)