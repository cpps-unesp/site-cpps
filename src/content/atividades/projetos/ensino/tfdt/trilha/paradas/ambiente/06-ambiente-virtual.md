---
id: ambiente-virtual
title: Ambiente Virtual
sidebar_label: Ambiente Virtual
---
*Tempo estimado: 8 - 10 minutos*

## O que é Ambiente virtual ?

:::tip
Neste tutorial, vamos aprender como criar e usar um ambiente virtual. O ambiente virtual é importante para proteger tanto o trabalho sendo feito quanto a máquina que está sendo usada.
:::

Ambiente virtual é uma técnica usada para criar um espaço isolado onde podemos instalar diferentes versões de pacotes ou bibliotecas para diferentes projetos sem afetar o ambiente global do sistema. O Conda é um gerenciador de pacotes e ambiente virtual que permite criar e gerenciar ambientes virtuais de forma fácil e eficiente. 👍


## Ativação e atualização do ambiente virtual

Para começar a trabalhar em um projeto usando um ambiente virtual conda, você precisa ativar o ambiente virtual correspondente. Para isso, você pode usar o comando `conda activate` seguido do nome do ambiente virtual.

```
git pull origin main && conda activate <nome_ambiente_do_projeto>
```

Este comando também pode ser usado para atualizar o ambiente virtual existente com as alterações mais recentes do repositório.

```
conda env update --prune
```

Lembre-se de que você deve estar na raiz do repositório para executar esses comandos.

## Instruções para primeira utilização

Se você ainda não criou um ambiente virtual para o projeto, siga as instruções abaixo.

### Inicialização do conda

Na primeira vez que você usar o conda em um novo terminal, é necessário inicializá-lo. Você pode fazer isso executando o comando abaixo.

```
conda init
```
Depois de executar este comando, reinicie o terminal antes de prosseguir.

### Configuração do conda

Antes de criar um novo ambiente virtual, você precisa configurar o conda para que ele use o diretório `env` para armazenar os ambientes virtuais e para ativar o modo de compatibilidade do pip.

```
conda config --set pip_interop_enabled True
conda config --set env_prompt '({name})'
conda config --add envs_dirs ./env
```

### Criação do ambiente virtual

Para criar um novo ambiente virtual, crie um arquivo `environment.yml` na raiz do repositório e adicione as dependências necessárias. Você pode usar o comando abaixo para criar o ambiente virtual a partir do arquivo `environment.yml`.

Abaixo indicamos um modelo básico de conteúdo do arquivo `environment.yml`

```
name: env_nome_ambiente_virtual[trocar pelo nome de sua escolha]
channels:
  - conda-forge
  - defaults
dependencies:
  - python

```

- `name`: indicação do nome do ambiente virtual
- `channels`: indicação dos locais em que estão as dependências/bibliotecas
- `dependencies`: bibliotecas/programas que serão instalados no ambiente virtual que será criado pelo conda

```
conda env create -f environment.yml
```

Certifique-se de que está na raiz do repositório antes de executar esse comando. O ambiente virtual será criado com o nome especificado no arquivo `environment.yml`.


## Autoria

- [Rafael de Almeida](https://gitlab.com/unesp-labri/sites/labri/-/commits/main/website/docs/projetos/ensino/trilha-dados?author=rafaelrdealmeida)
- [Leonardo de Almeida Petrilli](https://gitlab.com/unesp-labri/sites/labri/-/commits/main/website/docs/projetos/ensino?author=Leonardo%20Petrilli)
- [Ver todos os autores](https://gitlab.com/unesp-labri/sites/labri/-/commits/main/website/docs/projetos/ensino/trilha-dados/ambiente)