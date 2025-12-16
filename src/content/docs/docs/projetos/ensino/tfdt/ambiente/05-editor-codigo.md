---
id: editor-codigo
title: Editor de Código
sidebar_label: Editor de Código
---
*Tempo estimado: 8 - 10 minutos*

:::tip
Atenção: O VSCode é um dos editores mais populares para desenvolvimento de software e é usado por muitos desenvolvedores em todo o mundo. É importante!
:::


## Introdução ao VSCode

O VSCode é um editor de código-fonte gratuito e de código aberto criado pela Microsoft. Ele é um editor leve e altamente personalizável que suporta várias linguagens de programação e possui muitos recursos avançados para desenvolvimento de software.
  

## Instalação do VSCode

  

Antes de começar a usar o VSCode, você precisa instalá-lo em seu computador. O VSCode está disponível para Windows, MacOS e Linux. Você pode baixar a versão mais recente do VSCode no site oficial da Microsoft, [clicando aqui](https://code.visualstudio.com/download).

  

## Como usar o VSCode

  

Aqui estão algumas instruções básicas sobre como usar o VSCode:

  

### 1. Abrir o VSCode

  

Depois de instalar o VSCode, abra-o clicando no ícone do VSCode em sua área de trabalho.

  

### 2. Criar um novo arquivo

  

Para criar um novo arquivo, vá em `Arquivo > Novo Arquivo` ou use o atalho `Ctrl + N` (Windows) ou `Cmd + N` (MacOS). Você pode salvar o arquivo em seu computador clicando em `Arquivo > Salvar` ou usando o atalho `Ctrl + S` (Windows) ou `Cmd + S` (MacOS).

  

### 3. Personalizar o VSCode

  

O VSCode é altamente personalizável. Você pode personalizar o tema, as cores, as fontes, as extensões e muitas outras opções. Para personalizar o VSCode, vá em `Arquivo > Preferências` (Windows) ou `Code > Preferências` (MacOS) e selecione a opção desejada.

  

### 4. Instalar extensões

  

O VSCode tem muitas extensões disponíveis para melhorar a funcionalidade do editor. Para instalar extensões, vá em `Exibir > Extensões` ou use o atalho `Ctrl + Shift + X` (Windows) ou `Cmd + Shift + X` (MacOS). Pesquise a extensão desejada e clique em `Instalar`.

  

### 5. Usar o terminal integrado

  

O VSCode possui um terminal integrado que permite executar comandos diretamente no editor. Para abrir o terminal, vá em `Terminal > Novo Terminal` ou use o atalho `Ctrl + Shift +` (Windows) ou `Cmd + Shift +` (MacOS).

  

### 6. Usar o depurador integrado

  

O VSCode possui um depurador integrado que permite depurar o código em tempo real. Para usar o depurador, coloque pontos de interrupção no código e vá em `Depurar > Iniciar Depuração` ou use o atalho `F5`.

### VS Code Remoto

O VS Code também pode ser usado de forma online e remota. Com essa funcionalidade, é possível acessar e editar seus arquivos e projetos diretamente no navegador, sem precisar baixar e instalar o software no seu computador local.

Para utilizar o VS Code de forma online e remota, você pode usar o serviço "Visual Studio Code Online" fornecido pela Microsoft. Com ele, é possível acessar o VS Code a partir de qualquer dispositivo com um navegador web moderno e uma conexão à internet. Aqui tem o site do VS Code explicando o acesso remoto [Visual Studio Code for the Web](https://code.visualstudio.com/docs/editor/vscode-web).

Para começar, você precisa acessar o site [VS Code Online](https://vscode.dev/) e fazer login com a sua conta Microsoft. Depois de fazer o login, você verá uma tela semelhante à tela inicial do VS Code.

A partir daí, você pode criar novos projetos, abrir projetos existentes, editar arquivos e usar todas as funcionalidades do VS Code diretamente no navegador.

Vale lembrar que, como os arquivos e projetos são armazenados na nuvem, é necessário ter uma conexão estável e segura com a internet para garantir uma experiência de uso satisfatória.

Com essa funcionalidade, você pode trabalhar remotamente e colaborar com outras pessoas em tempo real, sem precisar instalar o VS Code em cada dispositivo que usar.

### Serviços de hospedagem na utilização remota

O Visual Studio Code pode ser utilizado de forma remota através de serviços de hospedagem de código como Gitpod, GitHub e GitLab. Esses serviços permitem que você crie um ambiente de desenvolvimento completo na nuvem, com acesso a todo o código do seu projeto, além de ferramentas de integração, como controle de versão e colaboração.

Aqui estão algumas etapas básicas para começar a usar o VS Code em conjunto com esses serviços:

**Gitpod:**

-   Acesse o site do [Gitpod ](https://gitpod.io/) e crie uma conta;
-   Abra um repositório no Gitpod clicando no botão "Open in Gitpod" no GitHub ou no GitLab, ou digitando o endereço do repositório no Gitpod;
-   O Gitpod criará um ambiente de desenvolvimento na nuvem, com todas as dependências necessárias para o seu projeto;
-   Depois de alguns minutos, o VS Code será iniciado dentro do navegador, com acesso a todos os arquivos do seu projeto.

**GitHub:**

-   Acesse o site do  [GitHub](https://github.com/) e crie uma conta;
-   Crie um novo repositório ou faça o fork de um repositório existente;
-   Clique no botão "Code" e copie o link do repositório;
-   Abra o VS Code e vá em "File" -> "Open Folder";
-   Cole o link do repositório na caixa de diálogo e clique em "Open";
-   O VS Code carregará todos os arquivos do seu projeto e você poderá começar a trabalhar.

**GitLab:**

-   Acesse o site do [GitLab](https://gitlab.com/) e crie uma conta;
-   Crie um novo repositório ou faça o fork de um repositório existente;
-   Clique no botão "Clone" e copie o link do repositório;
-   Abra o VS Code e vá em "File" -> "Open Folder";
-   Cole o link do repositório na caixa de diálogo e clique em "Open";
-   O VS Code carregará todos os arquivos do seu projeto e você poderá começar a trabalhar.

Com o VS Code configurado em conjunto com esses serviços, você poderá aproveitar todos os recursos do editor, como IntelliSense, depuração de código, extensões e muito mais, em um ambiente de desenvolvimento completamente online e remoto.

  

## Comandos principais


- Ctrl + N (Windows) ou Cmd + N (MacOS): criar um novo arquivo

- Ctrl + S (Windows) ou Cmd + S (MacOS): salvar o arquivo

- Ctrl + Shift + X (Windows) ou Cmd + Shift + X (MacOS): abrir o painel de extensões

- Ctrl + Shift + P (Windows) ou Cmd + Shift + P (MacOS): abrir o painel de comandos

- Ctrl + Shift + N (Windows) ou Cmd + Shift + N (MacOS): criar uma nova janela do VSCode

- Ctrl + Shift + T (Windows) ou Cmd + Shift + T (MacOS): reabrir a última guia fechada

- Ctrl + Shift + F (Windows) ou Cmd + Shift + F (MacOS): pesquisar em todos os arquivos do projeto

- Ctrl + F (Windows) ou Cmd + F (MacOS): pesquisar em um arquivo específico

- Ctrl + `(Windows) ou Cmd +` (MacOS): abrir o terminal integrado

## Autoria

- [Rafael de Almeida](https://gitlab.com/unesp-labri/sites/labri/-/commits/main/website/docs/projetos/ensino/trilha-dados?author=rafaelrdealmeida)
- [Leonardo de Almeida Petrilli](https://gitlab.com/unesp-labri/sites/labri/-/commits/main/website/docs/projetos/ensino?author=Leonardo%20Petrilli)
- [Ver todos os autores](https://gitlab.com/unesp-labri/sites/labri/-/commits/main/website/docs/projetos/ensino/trilha-dados/ambiente)