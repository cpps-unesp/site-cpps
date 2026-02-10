---
id: docusaurus
title: Alterar o menu principal
sidebar_label: Docusaurus.js
---

Esta página tem como objetivo fornecer instruções de modificação para os arquivos _docusaurus.js_. As alterações se referem ao **menu principal** no canto superior da página princial do site do LabRI/UNESP.

---

## Alterar o menu principal

- Para alterar o menu pricipal, localizado no canto superior da pagina inicial do LabRI, selecione a pasta _website_ e abra o arquivo _docusaurus.config.js_.

![docusaurus](/imagens/logos/logo-cpps-unesp.png)

- Utilize o comando CTRL+F para pesquisar “navbar” no código. Os itens dentro do componente **items:** representam cada botão do menu inicial do LabRI.

![navbar](/imagens/logos/logo-cpps-unesp.png)

- No exemplo utilizado, iremos adicionar botão “notícias” no menu superior. O arquivo _.md_ (_markdown_) referente a página “noticias” já está criado e localizado na pasta em _website>noticias_.

- É importante notar que cada item deverá estar entre chaves e separado por virgula. O conteúdo de cada item é composto por quatro informações, também separadas por virgulas.
  - “_to_” se refere ao local do documento _markdown_, no exemplo utilizaremos website/noticias
  - cada informação deve estar contida entre aspas simples, sempre lembrando da virgula que separa cada objeto
  - “_label_” se refere a como este botão será representado para os visitantes do site
  - “_position”_ indica a posição do botão, no caso os outros botões do menu estão localizados na margem direita
  - “_id_” se refere a identificação da pagina no _markdown_

![noticias](/imagens/logos/logo-cpps-unesp.png)

---

## Alterar Redes Sociais

- Caso queira alterar as **redes sociais** do LabRI no final da página, utilize o comando CTRL+F e pesquise "Redes Sociais" em _docusaurus.js_.

![redes sociais](/imagens/logos/logo-cpps-unesp.png)

---
