---
id: sidebar
title: Alterar o o menu lateral
sidebar_label: Sidebar.js
---

Esta página tem como objetivo fornecer instruções de modificação para os arquivos *sidebar.js*. As alterações se referem ao **menu lateral** no canto esquerdo das páginas LabRI/UNESP. 

------

## Alterar o menu lateral

- Para editar o menu lateral das páginas do LabRI procure o arquivo *sidebar.js* localizado na pasta *website/sidebar.js*

![sidebar](/imagens/logos/logo-cpps-unesp.png)

- Utilize o comando CTRL+F para buscar dentro do arquivo *sidebar.js* a página que deseja alterar o menu lateral. 

![info](/imagens/logos/logo-cpps-unesp.png)

- Os objetos contidos na função *module.export* representam o menu lateral de uma página especifica. O exemplo utilizado neste tutorial será da página de [atendimentos](https://labriunesp.org/docs/atendimento/) do site do LabRI, representado por "*info*" na função.

- Caso queira alterar algum botão, utilize a estrutura da foto anterior, adicionando o endereço da página do markdown de referencia. Este endereço deve estar localizado no inicio de todo arquivo *.md* com o nome "*slug*"

![slug](/imagens/logos/logo-cpps-unesp.png)

- O nome que será mostrado para o botão do menu lateral deverá ser colocado em "*sidebar_label*". 

- É importante lembrar que barra lateral aparece apenas nas páginas que estão localizadas dentro da pasta *docs*

------

## Alterar "type"

Caso deseje adicionar um que botão redirecione o usuário para outro local do site do LabRI/UNESP (ou até outro site da web) utilize a mesma estrutura de "Equipe" no exemplo, alterando o **tipo** para *link*.

![equipe](/imagens/logos/logo-cpps-unesp.png)

------