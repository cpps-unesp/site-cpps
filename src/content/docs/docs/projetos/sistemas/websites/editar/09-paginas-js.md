---
id: paginasjs
title: Editar páginas JS
sidebar_label: Páginas JS
---

Este tutorial tem como objetivo auxiliar na edição das páginas [home](https://labriunesp.org), [sobre](https://labriunesp.org/sobre), [grupos de extensão](https://labriunesp.org/grupos-extensao) e [grupos de pesquisa](https://labriunesp.org/grupos-pesquisa) do site LabRI/UNESP. Os arquivos *.js* (javascript) que correspondem a essas páginas estão localizado em **website>src>pages**

- index.js 
- sobre.js
- grupos-extensao.js
- grupos-pesquisa.js

Além disso, este tutorial vai te ensinar a editar as páginas próprias de grupos no site e a adicionar publicações a essas páginas

------

## Index.js

- Para editar a **Home** do site procure o arquivo *index.js* em *website>src>pages*

- Um arquivo *.js* é um arquivo de texto que contem código em *JavaScript*. É usado para executar instruções JavaScript em uma página web

- Todos os elementos da [página inicial](https://labriunesp.org) do LabRI/UNESP estão descritos em *index.js*

![pages](/img/projetos/sistemas/web-redes/readme24.jpg)

- Para alterar informações da página inicial é só utilizar o comando **CTRL+F** em *index.js* e pesquisar a constante que deseja modificar

- As constantes que podem ser alteradas são: **slide**, **docs**, **info**, **grupos**, **paggrupos**

- **const slide** indica o Menu Slide no inicio da página incial do LabRI/UNESP

- **const docs** indica a divisória em vermelho no meio da pagina inicial: "Tecnologias Digitais" e "Oficinas e Cursos"

- **const info** indica a seção no começo da página, abaixo do menu slide: "Bem vindo ao Labri/UNESP", "Projetos" e "Oportunidade de Estágio"

- **const grupos** indica a seção no final da página inicial, direcionando o usuário para as páginas: "Grupos de pesquisa" e "Grupos de Extensão"

- **const paggrupos** indica a última seção da página inicial, direcionando o usuário para as páginas: "Pod-RI", "Gepdai", "Cidades Saudáveis e Sustentáveis" e "Conhecer Para Acolher"

------

## Sobre.js

- Para editar a página **Sobre** do site procure o arquivo *sobre.js* em *websites>src>pages*

- Todas os elementos da [página "sobre"](https://labriunesp.org/sobre) estão descritas em *sobre.js*

- A constante **sobre** contém os seguintes objetos:
    - **quem_somos**
    - **objetivos**
    - **histórico**
    - **suporte**
    - **equipe**

![pages](/img/projetos/sistemas/web-redes/readme25.jpg)

- Utilize o comando **CTRL+F** para pesquisar "const" + o nome do objeto que deseja alterar e modifique as informações necessárias, lembrando sempre de analisar os exemplos já contidos no código

------

## Grupos de Extensão

- Para editar a página **Grupo de Extensões** do site procure o arquivo *grupos-extensao.js* em *websites>src>pages*

- Na constante **projetos** é possível ver todos as informações sobre grupos de extensão no site LabRI/UNESP

- Todas os elementos da [página "grupos-extensão"](https://labriunesp.org/grupos-extensao) estão descritas em *grupo-extensao.js*

- Cada grupo (objeto) deve conter as seguintes propriedades:
    - "title" se refere ao nome do grupo
    - "imageUrl" se refere ao logo do grupo, alocada em **static>img>grupos** no formato .png
    - "description" se refere a descrição do grupo
    - "pessoas" indica o nome dos docentes do DERI envolvidos no grupo
    - "website" site do grupo, se tiver
    - "rede1" indica o link de uma rede social do grupo
    - "rede1Img" indica uma imagem, icone da rede social 1 localizado em **static>img>social**
    - "rede2" indica o link de outra rede social do grupo
    - "rede2Img" indica uma imagem, icone da rede social 2 localizado em **static>img>social**

- Se atende para os exemplos já existentes no código antes de realizar modificações, note que somente algumas informações devem estar entre aspas duplas

------

## Grupos de Pesquisa

- Para editar a página **Grupos de Pesquisa** do site procure o arquivo *grupos-extensao.js* em *websites>src>pages*

- Todas os elementos da [página "grupos-pesquisa"](https://labriunesp.org/grupos-pesquisa) estão descritas em *grupos-pesquisa.js*

- Cada grupo (objeto) deve conter as seguintes propriedades:
    - "title"
    - "imageUrl" imagem alocada em **static>img>grupos**
    - "description"
    - "pessoas"
    - "website" link
    - "rede1" link
    - "rede1Img" imagem alocada em **static>img>social**
    - "rede2" link
    - "rede2Img" imagem alocada em **static>img>social**

- Se atente para os exemplos já existentes no código antes de realizar modificações, note que somente algumas informações devem estar entre aspas duplas

------

## Editar páginas de grupo

- Alguns **grupos** (pesquisa, extensão, afins) possuem página própria no site do LabRI/UNESP. Um exemplo disso é o [Pod-RI](https://labriunesp.org/pod-ri)

- Para alterar as páginas de um **grupo** no site do LabRI/UNESP, procure a pasta *pages* em **website>src>pages**

- Procure a subpasta correspondente ao nome do grupo que deseja alterar

- Para alterar a pagina inicial do grupo, abra o arquivo *index.js* e analise as constantes

------

## Adicionar artigos a um projeto de extensão

- Para adicionar **artigos** ou **publicações** a um grupo de extensão no site do LabRI/UNESP procure a pasta *pages* em **web>src>pages**

- Identifique a subpasta do grupo que deseja alterar e abra o arquivo **publicacoes.js**, observando sempre as constantes

- Observe que as publicações (objetos) da **const arquivos** devem conter os dados: *projeto*, *titulo*, *autor*, *imgFoto* e *link*

------