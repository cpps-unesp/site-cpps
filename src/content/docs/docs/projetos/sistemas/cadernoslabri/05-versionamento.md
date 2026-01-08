---
id: versionamento
title: Versionamento
sidebar_label: Versionamento
---

## Introdução

Atualmente construir um *software* exige muita capacidade lógica, mas para se chegar na versão definitiva é necessário a utilização de versionamentos. Este processo é responsável por fazer o gerenciamento das versões criadas para um sistema, modelo ou código, garantindo que o desenvolvedor consiga administrar as mudanças feitas ao longo do tempo, outro ponto fulcral é permitir que outros desenvolvedores trabalhem no mesmo arquivo, como também garantir a segurança no processo de mudança de uma versão para outra.

As ferramentas de versionamento foram necessárias para se conseguir controlar as mudanças, pois sem isso qualquer erro que o programa apresentasse ou não seria recuperado ou não se saberia qual a causa do erro fatal. Com o versionamento, pode-se observar todas as mudanças que ocorreram ao longo do tempo de trabalho, fora a possibilidade de recuperar uma versão antiga. O versionamento de códigos consiste em controle das versões do códigos e *scripts* específicos, pode-se armazenar essas versões em repositórios como o *Gitlab* ou *Github*, com o auxílio desses repositórios podemos identificar quem fez alguma alteração, gerenciar as ramificações geradas por uma nova mudança.

Por outro lado, o versionamento de *software* é direcionado para o processo de desenvolvimento, que consiste em assegurar controle sobre as versões da aplicação já construídas, esse tipo de processo se torna essencial quando um programa passou pelo *deploy* (etapa preparatória de um algoritmo a ser usado). Com isto, este modelo de versionamento pode ser usado principalmente para a manutenção e atualização do software contra algum bug ou vulnerabilidade, tendo em mente sempre a melhoria do programa desenvolvido. 

Versionamento semântico tem como finalidade um ordenamento de versões antigas quanto novas, este tipo de ferramenta é essencial para compreender os tipos de alterações que foram feitas dentre os diversos tipos de versões que existem em um programa. Contudo, a versão mais aprimorada deve manter uma compatibilidade com suas versões anteriores, para que exista uma versão nova deve se ter funcionalidades inéditas, como também ter uma descrição das funcionalidades obsoletas de suas antecessoras. Um exemplo de aplicação do versionamento semântico são os chamados *Patch Notes*, que contém descrição conceitual e explicação detalhada das mudanças realizadas em certa versão do código.

Para fazer alterações no código é necessário que algumas operações sejam realizadas através do *software* de versionamento [Git](https://git-scm.com/). Este guia explica algumas operações básicas do software Git. Após realizar alguma modificação no repositório, é preciso *sincronizar* todas as modificações. Para isso, é necessária a execução de alguns comandos pela ferramenta git. Para realizar essas alterações é necessario solicitar acesso aos repositórios do *LabRI/UNESP* no *[Gitlab](https://gitlab.com/unesp-labri)*. A solicitação deve ser feita com os colaboradores através do canais de [atendimento](https://labriunesp.org/docs/atendimento/) do LabRI/UNESP. Não se esqueça de [criar sua conta](https://gitlab.com/users/sign_up/) no site do *Gitlab* primeiro.

Para fazer alterações no código é necessário que algumas operações sejam realizadas através do software de versionamento [Git](https://git-scm.com/). Este guia explica algumas operações básicas do software Git. Após realizar alguma modificação no repositório, é preciso *sincronizar* todas as modificações. Para isso, é necessária a execução de alguns comandos pela ferramenta git. Para realizar essas alterações é necessario solicitar acesso aos repositórios do *LabRI/UNESP* no *[Gitlab](https://gitlab.com/unesp-labri)*. A solicitação deve ser feita com os colaboradores através do canais de [atendimento](https://labriunesp.org/docs/atendimento/) do LabRI/UNESP. Não se esqueça de [criar sua conta](https://gitlab.com/users/sign_up/) no site do *Gitlab*.

-----

### Git

É um sistema de controle de versão de código aberto (VCS) colaborativo, permite a manutenção do histórico de alterações dos seus arquivos. As alterações no código são feitas em um movimento único (*commit*) que permite recuperar o estado anterior do sistema, ou seja, é possivel "voltar atrás" e recuperar as versões antigas do nosso código. Ao comparar mudanças e encontrar *bugs*, o *Git* auxilia a observar possíveis otimizações.

Os arquivos e seus históricos ficam armazenados em um **repositório**, que podem ser gerenciados através de sistemas como *CVS* E *SVN*. 

Para mais informações sobre problemas comuns ao utilizar o *Git*, [clique aqui](https://ohshitgit.com/pt_BR).

-----

### Github

*GitHub* é uma plataforma para gerenciar seu código e criar um ambiente de colaboração entre devs, utilizando o *Git* como sistema de controle. Tanto o Github quanto o *Gitlab* são plataformas de hospedagem de código. Possuem várias características semelhantes, porém o Github se tornou mais popular e passou a funcionar como uma rede social para desenvolvedores.

-----

### Gitlab

É uma ferramenta que ajuda desenvolvedores a monitorar, testar e implantar seus códigos. Oferece recursos *DevOps*, integração contínua e ferramentas para o gerenciamento de projetos em equipe.

Para entender melhor as semelhas e diferenças entre *Github* e *Gitlab*, [clique aqui](https://kinsta.com/pt/blog/gitlab-vs-github/)

-----

## Configurando o Git

Após concedido acesso da sua conta *GitLab* aos repositórios do LabRI/UNESP, é necessário clonar os arquivos e pastas no seu computador. A clonagem pode ser efetuada através de 2 métodos. Ao acessar o link do [repositório no GitLab](https://gitlab.com/unesp-labri/sites/labri) é possível encontrar no canto *superior direito* da tela o botão denominado "Clone", para efetuar a clonagem via SSH e HTTPS.

![readme](/imagens/img-geral/readme.jpg)

-----

### Clonando repositório via SSH

A clonagem e sincronização via SSH fazem a *autenticação automaticamente*, sem intervenção do usuário.

```bash
git clone git@gitlab.com:unesp-labri/sites/labri.git
```

-----

### Clonando o repositório via HTTPS

A clonagem via HTTPS requer a *autenticação com usuário e senha*. Primeiro é necessário executar os comandos abaixo para definir seu nome o email. Eles serão usados para identificar a autoria das modificações.

```bash
  git config --global user.email "you@example.com"
  git config --global user.name "Your Name"
```

Vale notar que:
- Não é necessário que email e nome sejam iguais aos da conta do *GitLab*.
- O argumento `--global` pode ser omitido para que as configurações sejam válidas apenas para um respositório específico. Isto é útil caso você esteja trabalhando em repositórios diferentes e queira manter uma identidade diferente para cada. Em outras palavras, o argumento `--global` permite definir uma identidade padrão para sua conta do *Gitlab*.

Para clonar o repositório via HTTPS utilize o seguinte comando:

```bash
git clone
```

Exemplo

```bash
git clone https://gitlab.com/unesp-labri/sites/labri
```

-----

### Iniciando um projeto novo com o Github

Para iniciar o *Git* e vincular um repositório local (pasta localizada no seu computador) ao repositório do *Github* pela *primeira* vez, utilize:

```bash
cd <pasta_raiz_projeto> # é a pasta raiz do repositório

git init 

git add . && git commit -m 'insira mensagem aqui'

git remote -v # mostra uma lista de repositórios vinculados ao seu projeto, a primeira vez que utilizar esse comando a lista estará vazia

git remote add origin <link_do_repositório_https> # adiciona um nome padrão (origin) para o repositório e vincula a um link do github (HTTPS)

git push origin main
```

É importante se atentar para o local em que está executando estes comandos, sempre na **raiz do repositório** em questão.

Exemplo:

```bash
cd teste 

git init

git add . && git commit -m 'Primeira mudança do projeto'

git remote -v

git remote add origin https://github.com/user/teste.git

git push origin main
```

-----

## Configurando o .gitignore

Após clonado o repositório, é importante adicionar à raiz do repositório o arquivo .`gitignore`. Este arquivo contem informações a respeito de todas arquivos e pastas que devem ser ignorados pelo controle de versionamento.

Isto se deve à necessidade de que apenas o código seja gravado pelo repositório, excluindo arquivos e diretórios criados localmente, como configurações do usuário e bibliotecas.

-----

## Gravando mudanças

Ao tentar gravar modificações no repositório pela primeira vez, o usuário verá uma mensagem semelhante à esta:

```bash
*** Please tell me who you are.
Run

git config --global user.email "you@example.com"
git config --global user.name "Your Name"

to set your account's default identity.
Omit --global to set the identity only in this repository.
```

Após [configurar o Git](https://labriunesp.org/docs/projetos/sistemas/cadernos/versionamento#configurando-o-git) com a sua identificação, utilize o seguinte comando para gravar modificações feitas no código:

```bash
  git add . && git commit -m 'inserir mensagem'
```

**Onde:**

`git add .` adiciona as últimas mudanças nos conteúdos do diretório atual (referida como `.`) à lista de mudanças a serem gravadas no  repositório. Deve ser efetuado sempre que novas mudanças são feitas.

`&&` encadeia comandos para que sejam executados sequencialmente.

`git commit` "comete" as mudanças feitas nos arquivos monitorados, gravando-as no repositório.

`-m 'mensagem'` especifica mensagem que descreva as mudanças. A descrição deve estar entre aspas simples ou duplas.

Para alterar a mensagem do *último commit*, utilize:

```bash

git commit --amend: ## Insira o texto da sua mensagem

```

### Sincronizando o repositório

Ao usar os comandos acima, as mudanças são cometidas (gravadas) apenas na sua cópia local do repositório.

É necessário sincronizar o repositório local com o repositório remoto, o que é feito através dos seguintes comandos:

```bash
  git pull origin main
```

**Onde:**

`git pull` baixa todos os commits mais recentes do repositório remoto e os integra no repositório local. 

`origin main ` são argumentos para especificar que a origem dos commits a serem integrados é o ramo `main` do repositório remoto. Estes argumentos não são mandatório, no entanto, explicitá-los garante que não hajam conflitos.


```bash
git push origin main
```

Integra as modificações locais ao repositório remoto.

É importante quaisquer mudanças pendendes sejam cometidas antes de executar  `git pull`, que por sua vez deve sempre ser executado antes de `git push` para evitar conflitos ao mesclar as modificações locais/remotas.

-----

## Material de apoio

```bash
git help 
```

```bash
git help add
git help commit
git help <qualquer_comando_git>
``` 

Para mais informações sobre os comandos Git, clique [aqui](https://www.freecodecamp.org/portuguese/news/10-comandos-do-git-que-todo-desenvolvedor-deveria-conhecer/) e [aqui](https://gist.github.com/leocomelli/2545add34e4fec21ec16).

Caso tenha encontrado alguma dificuldade durante esse processo, recomendamos este [artigo](https://www.alura.com.br/artigos/o-que-e-git-github?gclid=Cj0KCQiAgribBhDkARIsAASA5bsDzVKzDhRnnj5T7_APqI3vOIS2ehdRgDDKjLYX66Yhde1GVSGie6MaAh99EALw_wcB) publicado com varios videos tutoriais.