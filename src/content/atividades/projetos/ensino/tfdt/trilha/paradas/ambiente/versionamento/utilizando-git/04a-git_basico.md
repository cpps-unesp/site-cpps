---
id: git-basico
title: GIT - Básico
sidebar_label: GIT -Básico
---

## Git: comandos básicos

### Configuração do Git

Antes de começar a usar o Git, é necessário configurá-lo. É necessário fornecer seu nome de usuário e endereço de e-mail, para que o Git possa identificar quem fez as alterações em um arquivo. Para isso, execute os seguintes comandos:

```
git config --global user.name "Seu Nome"
git config --global user.email "seuemail@example.com"
```

### Iniciando um repositório Git

Para iniciar um repositório Git em um projeto existente, vá até a pasta do projeto e execute o seguinte comando:

```
git init
```

### Clonando um repositório Git

Para clonar um repositório Git existente, execute o seguinte comando:

```
git clone URL_DO_REPOSITÓRIO
```

### Adicionando arquivos para monitoramento

Antes de poder monitorar as alterações em um arquivo, você deve adicionar o arquivo ao Git. Para adicionar um arquivo específico, execute o seguinte comando:

```
git add NOME_DO_ARQUIVO
```

Para adicionar todos os arquivos em um diretório, execute o seguinte comando:

```
git add .
```

### Fazendo um commit

Depois de adicionar um arquivo ao Git, é hora de fazer um commit. Isso salva as alterações no repositório Git. Para fazer um commit, execute o seguinte comando:

```
git commit -m "SUA MENSAGEM DE COMMIT AQUI"
```

### Sincronizando com um repositório remoto

Para sincronizar seu repositório local com um repositório remoto, você deve primeiro adicionar o repositório remoto como um "remote" do seu repositório local. Isso é feito executando o seguinte comando:

```
git remote add NOME_DO_REMOTO URL_DO_REMOTO
```

Para fazer o pull das alterações remotas para o seu repositório local, execute o seguinte comando:

```
git pull NOME_DO_REMOTO BRANCH_DO_REMOTO
```

Para enviar suas alterações locais para o repositório remoto, execute o seguinte comando:

```
git push NOME_DO_REMOTO BRANCH_DO_REMOTO
```

## Git: comandos básicos

|  Comando   |                 Funcionalidade                  |       Descrição/Forma de usar       |
| :--------: | :---------------------------------------------: | :---------------------------------: |
| git config |             definir usuário e email             |  necessário para submeter commits   |
|  git help  |            ajuda a entender comandos            |  git help ou git `comando` --help   |
|  git init  |         adicionar um projeto existente          |                  -                  |
| git clone  |     clonar um repositório do gitlab/github      |           git clone `url`           |
|  git add   |    comando para iniciar submissão de commit     |                  -                  |
| git commit |           descreve o que será enviado           | "git commit -m `mensagem do commit` |
|  git pull  | adiciona ao projeto novas modificações externas |          "git pull origin"          |
|  git push  |                 enviar o commit                 |       "git push origin main"        |
| git status |           analisar status do arquivo            |                  -                  |

### Aplicação dos comandos

- Verificar estado atual dos arquivos monitorados pelo git

```
git status
```

- Adicinar todos os arquivos no monitoramento do git

```
git add .
```

- Salvando versionamento com comentário

```
git commit -m "inserir mensagem sobre o commit realizado"
```

- Sincronizar arquivos remotos localizados no repositorio do gitlab com seus arquivos locais

```
git pull origin main
```

- Sincronizar arquivos locais com arquivos localizados no repositorio remoto

```
git push origin main
```

#### Git global steup

```
git config --global user.name "Seu Nome'"
git config --global user.email "seuemail@unesp.br"
```

#### Create a new repository

```
git clone git@gitlab.com:unesp-labri/sys-admin/gestao-dados-labri.git
cd gestao-dados-labri
git switch -c main
touch README.md
git add README.md
git commit -m "add README"
git push -u origin main
```

#### Push an existing folder

```
cd existing_folder
git init --initial-branch=main
git remote add origin git@gitlab.com:unesp-labri/sys-admin/gestao-dados-labri.git
git add .
git commit -m "Initial commit"
git push -u origin main
```

#### Push an existing repository

```
cd existing_repo
git remote rename origin old-origin
git remote add origin git@gitlab.com:unesp-labri/sys-admin/gestao-dados-labri.git
git push -u origin --all
git push -u origin --tags
```

### Comandos adicionais do Git

```
git log`: exibe o histórico de commits do repositório.
git branch`: lista as branches existentes no repositório.
git checkout`: muda para outra branch ou para um commit específico.
git merge`: combina as mudanças de uma branch com outra.
git diff`: exibe as diferenças entre dois commits ou entre o diretório de trabalho e o último commit.
git reset`: desfaz commits, mudanças no índice (staged changes) ou o diretório de trabalho (unstaged changes).
git stash`: guarda mudanças no diretório de trabalho em um "stash", permitindo que você as retome mais tarde.
git tag`: cria, lista ou apaga tags (marcadores) de um commit específico.
```

Esses são apenas alguns dos comandos disponíveis no Git. É importante lembrar que é sempre possível obter ajuda com um comando específico usando o comando `git help` ou `git <comando> --help`. Além disso, existem muitos recursos online e livros disponíveis para aprofundar o conhecimento sobre o Git e sua utilização.

### Material de apoio

- [Oh Shit, Git!?!](https://ohshitgit.com/pt_BR)
- [Flight rules for Git](https://github.com/k88hudson/git-flight-rules)
- [Git Command Explorer](https://gitexplorer.com/)
- [Cómo borrar un archivo de entorno .env de Git después de haberlo enviado al repositorio remoto?](https://desarrolloweb.com/faq/como-borrar-un-archivo-de-entorno-env-de-git-despues-de-haberlo-enviado-al-repositorio-remoto)
- [Revertendo para um commit especifico !](https://natanaelfonseca.com.br/2013/06/06/git-revertendo-para-um-commit-especifico/)

## Autoria

- [Rafael de Almeida](https://gitlab.com/unesp-labri/sites/labri/-/commits/main/website/docs/projetos/ensino/trilha-dados?author=rafaelrdealmeida)
- [Leonardo de Almeida Petrilli](https://gitlab.com/unesp-labri/sites/labri/-/commits/main/website/docs/projetos/ensino?author=Leonardo%20Petrilli)
- [Ver todos os autores](https://gitlab.com/unesp-labri/sites/labri/-/commits/main/website/docs/projetos/ensino/trilha-dados/ambiente)
