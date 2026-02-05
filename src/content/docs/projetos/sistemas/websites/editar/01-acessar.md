---
id: acessar
title: Acessar edição do site
sidebar_label: Acesso
---

Bem-vindo, estagiário(a)! Essa página tem como objetivo auxiliar você que está começando a entender melhor como funciona o acesso e edição do site do LabRI/UNESP.

O site do LabRI é construído com a plataforma [Docusaurus 2](https://v2.docusaurus.io/), um moderno gerador de websites.

-----

## Passo a passo para edição do site

- Ao acessar o Gitlab, clique no menu representado por três traços na horizontal no canto superior esquerdo, clicar em: Groups > View all groups > Unesp Labri

![Groups](/img/projetos/sistemas/web-redes/readme1.jpg)

![Unesp Labri](/img/projetos/sistemas/web-redes/readme2.jpg)


- Na nova página, na aba “Subgroups and projects”, clicar em: sites > labri
- No menu em horizontal central da página, procurar por “Web IDE” com uma seta para baixo ao lado. Ao clicar na seta, o estagiário irá perceber que existe a opção de escolha entre “Web IDE” E “Gitpod”. Ambos são diferentes formas de edição do site. O estagiário escolhe uma delas e clica em cima da escolha.

![Editores](/img/projetos/sistemas/web-redes/readme3.jpg)

- Deve ser levado em consideração que o Web IDE é uma forma de edição mais simples e generalizada, enquanto o Gitpod é para edições mais completas.

-----

## Gitpod

- Ao **acessar Gitpod**, no código localizado na metade inferior da tela na aba “Terminal”, vá até a última linha do código, dê um espaço do *$* e digite “cd website”. Após isso, vá até a nova última linha e escreva “ls”. Depois, na nova última linha, digite “yarn install $$ yarn start”. Aguarde o carregamento.

![Gitpod1](/img/projetos/sistemas/web-redes/readme6.jpeg)

- Com isso, foi criado um site provisório, como um “site rascunho”. O intuito é que o estagiário consiga editar esse “site rascunho” e poder visualizar o resultado antes de modificar o site original. O acesso e as eventuais modificações podem ser verificadas clicando no link http://localhost:3000/, que foi criado no código apertando Ctrl + Click.

- Agora, no menu esquerdo, clique em “website”. Os novos menus abertos são as páginas do site. Para editar, abra um dos menus abertos e escolha a página.

![Bar](/img/projetos/sistemas/web-redes/readme7.jpeg)

-----

## Web IDE

- Ao **acessar Web IDE**, no menu esquerdo, clique na pasta “website”. Nela, está localizado todo o conteúdo do site do LabRI, escolha uma das pastas e abra as pastas internas para editar. Ao final da edição, clique em “Create commit...”, depois, selecione a opção "Commit to main branch" e clique em "Commit" novamente.  Em alguns minutos, o site oficial será editado.

![Commit1](/img/projetos/sistemas/web-redes/readme4.jpg)

![Commit2](/img/projetos/sistemas/web-redes/readme5.jpg)

-----

## Commit

- Ao final da edição, para **salvar o progresso**, na mesma barra do Terminal clique no sinal de "+" ao lado direito. No lado direito inferior, será criado um novo terminal com o título "bash". É nele que você irá digitar o código para salvar seu progresso, ou seja dar **commit** nas modificações realizadas.

![Save1](/img/projetos/sistemas/web-redes/readme8.jpg)

- No novo terminal chamado "bash", digite o seguinte:

```
git add . && git commit -m 'descrição da edição'
```

- Na parte de descrição da edição, você irá descrever brevemente o que foi feito. Algo como "edição da página x" ou "mudança das fotos da equipe", somente para fins de organização.
Descreveu? Dê Enter.

- Depois, na nova linha de baixo, digite:

```
git pull origin main && git push origin main
```

![Save2](/img/projetos/sistemas/web-redes/readme9.jpg)

Pronto. Seu progresso foi salvo.

- Dica: É interessante o estagiário salvar o seu progresso aos poucos e não deixar para o final da edição, para que não corra o risco de parte do processo ser perdido em eventuais bugs do computador.