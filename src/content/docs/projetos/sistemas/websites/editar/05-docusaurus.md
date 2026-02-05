---
id: docusaurus
title: Alterar o menu principal
sidebar_label: Docusaurus.js
---

Esta página tem como objetivo fornecer instruções de modificação para os arquivos *docusaurus.js*. As alterações se referem ao **menu principal** no canto superior da página princial do site do LabRI/UNESP.

------

## Alterar o menu principal

- Para alterar o menu pricipal, localizado no canto superior da pagina inicial do LabRI, selecione a pasta *website* e abra o arquivo *docusaurus.config.js*.

![docusaurus](/img/projetos/sistemas/web-redes/readme15.jpg)

- Utilize o comando CTRL+F para pesquisar “navbar” no código. Os itens dentro do componente **items:** representam cada botão do menu inicial do LabRI.

![navbar](/img/projetos/sistemas/web-redes/readme16.jpg)

- No exemplo utilizado, iremos adicionar botão “notícias” no menu superior. O arquivo *.md* (*markdown*) referente a página “noticias” já está criado e localizado na pasta em *website>noticias*.

- É importante notar que cada item deverá estar entre chaves e separado por virgula. O conteúdo de cada item é composto por quatro informações, também separadas por virgulas.

    - “*to*” se refere ao local do documento *markdown*, no exemplo utilizaremos website/noticias
    - cada informação deve estar contida entre aspas simples, sempre lembrando da virgula que separa cada objeto
    - “*label*” se refere a como este botão será representado para os visitantes do site
    - “*position”* indica a posição do botão, no caso os outros botões do menu estão localizados na margem direita
    - “*id*” se refere a identificação da pagina no *markdown*

![noticias](/img/projetos/sistemas/web-redes/readme17.jpg)

------

## Alterar Redes Sociais

- Caso queira alterar as **redes sociais** do LabRI no final da página, utilize o comando CTRL+F e pesquise "Redes Sociais" em *docusaurus.js*.

![redes sociais](/img/projetos/sistemas/web-redes/readme18.jpg)

------