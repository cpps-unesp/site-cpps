---
id: ambiente-virtual
title: Ambiente Virtual
sidebar_label: Ambiente Virtual
---

:::tip
Os ambientes virtuais habilitam a criação de um ambiente onde cada projeto possui suas configurações em suas diretrizes independentemente de outros projetos. Assim, é possível a administração das dependências de múltiplos projetos sem convergência dessas dependências.
:::

A ferramenta **Anaconda** tem como objetivo simplificar a instalação e o gerenciamento de instrumentos de linguagens, como Python, em prol principalmente de aplicações no âmbito científico. A partir da utilização da Anaconda, a maioria dos programadores entra em contato com o gerenciador  **Conda**, que permite gerenciar ambientes virtuais e em qualquer linguagem.

O Conda, por causa de sua versatilidade de utilizar bibliotecas e pacotes, tem grande eficiência em testar aplicações de código em diversos cenários, sendo possível o uso de processos de testes e com sistemas de integração contínuo.

Caso queira manipular o repositório de um projeto, é necessário configurar e inicializar o ambiente virtual. O uso do ambiente virtual garante que todas as bibliotecas e componentes necessários para a utilização do repositório sejam mantidos em um ambiente isolado do sistema. 

Desta forma, se algum destes componentes deixa de ser compatível, seja por uma atualização, mudança de configuração ou outro tipo de modificação, isto não afetará o funcionamento interno do ambiente virtual, permitindo que o código continue funcionando, independentemente de modificações externas.

### Criação

A seguir, os comandos utilizados para configurar, criar e ativar o ambiente virtual. Lembrando que *estes comandos só devem ser executados uma vez*, visto que uma vez ativado o ambiente virtual, todo o trabalho no diretório do repositório se dará dentro do ambiente virtual.

Seguem os comandos:

```
conda config --set pip_interop_enabled True
```

Habilita a interoperabilidade entre o [repositório do ambiente virtual Anaconda (conda-forge)](https://conda-forge.org/), e o  [repositório oficial da comunidade Python (pip)](https://pypi.org/). Desta forma, componentes presentes no repositório oficial serão incluídos no ambiente virtual.

```
conda config --set env_prompt '({name})'
```

Renomeia o ambiente virtual do nome padrão "base" para "anaconda", de forma a explicitar para o usuário quando este está dentro do ambiente virtual.

```
conda config --add envs_dirs ./env
```

Cria a pasta do ambiente virtual, onde ficarão alocadas as bibliotecas e componentes utilizados pelo TweePIna

**Os comandos a seguir devem ser executados dentro da pasta raíz do repositório em questão**. 

Isto é necessário pois as bibliotecas a serem utilizadas são listadas no arquivo `environment.yml`, que se encontra na raiz do repositório. Se o arquivo não é encontrado, não é possível realizar o download dos componentes necessários para o funcionamento do ambiente virtual.

```
touch environment.yml && conda env create -f environment.yml
```

Checa se o arquivo `environment.yml` está presente, em seguida cria o ambiente e baixa os componentes especificados no arquivo

### Ativação e atualização

Para ativar o ambiente virtual, use os comandos:

```
git pull origin main && conda activate env_tweepina && conda env update --prune
```

**Onde:**

`git pull origin main` baixa todas modificações recentes do repositório remoto para o repositório local.

`conda activate env_tweepina` ativa o ambiente virtual (lembrando que a ativação só deve ser feita uma vez)

`conda env update` atualiza os componentes utilziados pelo ambiente virtual. O argumento `--prune` remove do ambiente quaisquer componentes removidos do arquivo `environment.yml`