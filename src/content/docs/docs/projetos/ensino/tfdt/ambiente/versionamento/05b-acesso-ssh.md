---
id: chave-ssh
title: Acesso por chave SSH
sidebar_label: Acesso por chave SSH
---
*Tempo estimado: 2 - 4 minutos*

- Não precisa de senha para interagir com o repositório (pull, push e afins)
- Maior segurança no acesso

Para gerar sua chave SSH sem precisar fazer o login, siga estes passos: 

## No terminal 

Primeiro, remova o repositório local digitando o comando abaixo no terminal.  
Lembre-se de fazer o commit antes de removê-lo. 

```
rm -rf <nome do repositório>/
```

Em seguida, gere a chave SSH:

- quando rodar o comando abaixo será pedido para inserir senha algumas vez. Você pode ignorar isso e dar `enter` em vez de digitar uma senha

```
ssh-keygen -b 2048 -t rsa -v
```

E, a partir da raiz do seu usuário (/home/nome_usuário), digite o comando abaixo para visualizar e copiar sua chave SSH pública.

```
cat ~/.ssh/id_rsa.pub
```

Mantenha copiada a chave gerada, assim como mostra o print. 

![tutorial_ssh_1](/img/projetos/ensino/versionamento/tutorial_ssh_1.jpeg)


## GitLab

Em seguida, acesse o GitLab pela sua conta e clique em preferências.

<div style={{textAlign: 'center'}}>

![image](/img/projetos/ensino/versionamento/tutorial_ssh_2.jpeg)

</div>

Clique em SSH Keys, cole sua chave e adicione para salvar.

![tutorial_ssh_3](/img/projetos/ensino/versionamento/tutorial_ssh_3.jpeg)

Após salvar sua chave, é preciso clonar novamente o repositório excluído. Para isso, vá na pasta raíz de seu repositório no GitLab e copie o link para clone pelo ssh, como mostra a imagem. 

![tutorial_ssh_4](/img/projetos/ensino/versionamento/tutorial_ssh_4.jpeg)


## Terminal 

Novamente em seu terminal, digite o comando abaixo e cole o link do repositório. 

```
git clone --recurse-submodules <link do repositório>
```

Se der alguma mensagem de erro, tente somente:

```
git clone <link do repositório>
```



<div style={{textAlign: 'center'}}>

![image](/img/projetos/ensino/versionamento/tutorial_ssh_5.jpeg)

</div>

## VSCode

Entre no repositório clonado e digite `code .` para abrir o VSCode. 

<div style={{textAlign: 'center'}}>

![image](/img/projetos/ensino/versionamento/tutorial_ssh_6.jpeg)

</div>

Para realizar as configurações do seu ambiente virtual, [clique aqui](docs/projetos/ensino/trilha-dados/ambiente/ambiente-virtual). 

## Autoria

- [Rafael de Almeida](https://gitlab.com/unesp-labri/sites/labri/-/commits/main/website/docs/projetos/ensino/trilha-dados?author=rafaelrdealmeida)
- [Leonardo de Almeida Petrilli](https://gitlab.com/unesp-labri/sites/labri/-/commits/main/website/docs/projetos/ensino?author=Leonardo%20Petrilli)
- [Ver todos os autores](https://gitlab.com/unesp-labri/sites/labri/-/commits/main/website/docs/projetos/ensino/trilha-dados/ambiente)