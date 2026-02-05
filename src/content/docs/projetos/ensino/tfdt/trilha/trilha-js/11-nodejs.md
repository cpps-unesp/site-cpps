---
id: nodejs
title: Node.js
sidebar_label: Node.js
---

## Introdução

Trata-se de um _software open-source_ (código aberto), sendo um **ambiente de execução de programas escritos em JavaScript**, não dependendo de navegadores da web. Umas das principais vantagens de utilizar o Node.js é a sua alta capacidade de escala e a sua vasta utilidade para programadores de JavaScript.

Para exemplificar, o Node.js pode ser utilizado para **construir qualquer tipo de aplicação web**, incluindo _APIs, websites e outros_.

Além disso, vale mencionar que outras bibliotecas do JavaScript, como **React** e Angular**, podem utilizar o Node.js no desenvolvimento de aplicações.

:::tip

Acesse o link para ler mais sobre a [documentação do Node.js](https://nodejs.org/api/documentation.html).

:::

### NPM

Trata-se de um **Gerenciador de Pacotes do Node** (_Node Package Manager_) que ajuda a utilização do Node.js, possibilitando a **instalação e desinstalação de pacotes**, assim como pode auxiliar no **gerenciamento de versões e possíveis dependências necessárias**.

Para utiliza-lo basta instalar o Node.js.

Além disso, basta criar um documento `package.json` na pasta de um projeto para utilizar os pacotes instalados.

### Instalação

Instale o Node.js através do link de [download](https://nodejs.org/en/download/) ou através do [nvm](https://github.com/nvm-sh/nvm).

### Comandos básicos

|Função|Comando|
|---|---|
|**Instalar o NPM**|`curl https://npmjs.org/install.sh | sh``|
|**Checar a versão**|`npm -v`|
|**Iniciar projeto**|`npm init`|
|**Instalar módulo**|`npm install <module>`|

## Resoluções de possíveis problemas do Node.js

Embora a utilização do Node.js facilite muito o processo de utilização do JavaScript, é possível encontrar problemas ao utilizá-lo. Entretanto, na maior parte das vezes esses problemas são facilmente resolvidos.

* **Problema de memória**

```
FATAL ERROR: ... JavaScript heap out of memory.
```

Para resolver esse problema e continuar a utilizar o Node.js/NPM basta aumentar sua capacidade de memória:

|Capacidade máxima|Código|
|---|---|
|**1GB**|`node --max-old-space-size=1024 index.js`|
|**2GB**|`node --max-old-space-size=2048 index.js`|
|**3GB**|`node --max-old-space-size=3072 index.js`|
|**4GB**|`node --max-old-space-size=4096 index.js`|