---
id: acesso-remoto
title: Acesso Remoto
sidebar_label: Acesso Remoto
---

# Utilização do X2Go

## Instalando

```
sudo add-apt-repository ppa:x2go/stable -y

sudo apt-get update && sudo apt-get install x2goclient -y
```

## Configurando o X2GO para acesso via chave pública

### Criar usuário

- antes de gerar a chave ssh para configurar seu acesso, é necessário estar logado pelo usuário `labri`
- caso o usuário ainda não exista, crie o usuário através do comando:

```
sudo adduser <nome_usuário>
```

- senha: xxxxx (verificar com responsável)

### Troca de usuário

```
su labri
```

### Localização e deslocamento

- ao trocar de usuário no terminal, é necessário verificar a pasta atual com `pwd`
- em seguida, vá para a pasta raíz do atual usuário com o comando `cd` antes de gerar a chave ssh

```
pwd

cd
```

![terminal_comando_local](/imagens/logos/logo-cpps-unesp.png)

### Gerar chave privada e pública ssh

```
ssh-keygen -b 2048 -t rsa -v
```

- quando aperecer a mensagem `Enter file in which to save the key` não escreva nada, deixe em branco apentando `ENTER`
- quando aperecer a mensagem `Enter passphrase` não escreva nada, deixe em branco apentando `ENTER`

### Enviar chave pública para o computador de destino

- em `<nome_pc>`, inserir o nome do usuário
- em `<host>`, inserir o nome do computador a ser acessado

```
ssh-copy-id <user>@<host>
```

- Digite a senha do usuário quando aparecer o que está abaixo. Dê Enter.

```
ssh-copy-id <user>@<host> password:
```

### Configurando conexão em LAN no X2Go

- Entre no X2Go e clique nas três linhas horizontais para entrar nas configurações de "Session preferences".

- Vá na aba "Connection" e habilite "Connection speed" para "LAN".

### Deixando o Acesso Remoto funcional

- Ao terminar de configurar o Acesso Remoto pelo X2Go, é necessário deixá-lo funcional
- Para isso, realize o acesso e adicione os atalhos "Google Chrome" e "Recoll" na área de trabalho, como mostram as imagens abaixo

![print_1_x2go](/imagens/logos/logo-cpps-unesp.png)

![print_2_x2go](/imagens/logos/logo-cpps-unesp.png)

![print_3_x2go](/imagens/logos/logo-cpps-unesp.png)

# Utilização do Chrome Remote Desktop

## Instalar Navegador - Google Chrome

```
sudo apt-get update && wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb

sudo apt-get update && sudo dpkg -i google-chrome-stable_current_amd64.deb

rm google-chrome*
```

# Instalar Chrome Remote Desktop

```
sudo apt-get update && wget https://dl.google.com/linux/direct/chrome-remote-desktop_current_amd64.deb
sudo apt-get update && sudo apt-get install --assume-yes ./chrome-remote-desktop_current_amd64.deb

rm chrome-remote-desktop*
```

- https://cloud.google.com/architecture/chrome-desktop-remote-on-compute-engine

## Acesso via SSH

Quando o acesso a área de trabalho remota acessada via Chrome Remote Desktop é interropido ou esta inativo você tem duas opções para reativa-lo.

A primeira opção é via x2go reativar o acesso via Chrome Remote Desktop. A segunda opção é reativar o acesso via Chrome Remote Desktop a partir de acesso SSH

:::info

Necessário acesso admistrativo para realizar os procedimentos abaixo. Quando possivel prefira fazer este procedimento via x2go

:::

### Etapa 1: Acesso via SSH

- Substitua `<user>` pelo seu usuário

```
ssh <user>@lantrivm01.lantri.org
```

### Etapa 2: SystemD

- ação: `status`, `stop`, `start`, `restart`
- substitua a palavra `<ação>` por uma das ações indicadas no item anterior

```
sudo systemctl <ação> chrome-remote-desktop@$USER
```

### Etapa 3: Refazer acesso via SSH

:::info

Caso a etapa 2 tenha sido bem sucedida esta etapa não será necessária

:::

- Acesse a [Area de trabalho remota do Google Chrome - configurar por SSH](https://remotedesktop.google.com/headless)
- Clicar `começar`>> `Próxima` >> `Autorizar`
- Copiar o comando indicado em `Debian Linux`
- Colar o comando indicado em `Debian Linux` no terminal acesso via SSH
