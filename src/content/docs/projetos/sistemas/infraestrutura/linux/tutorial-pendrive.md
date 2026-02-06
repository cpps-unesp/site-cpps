---
id: tutorial-pendrive
title: Tornar pendrive bootável para formatação
sidebar_label: Tornar pendrive bootável para formatação
---
:::tip
Essa página visa auxiliar na configuração do armazenamento de um sistema operacional em um pendrive para formatação de um computador.
:::

1. Abra o Terminal, digite o código e instale o GParted em seu computador de acordo com o sistema operacional utilizado (para distribuições Linux):
```
Debian: sudo apt-get install gparted
Fedora: su -c "yum install gparted"
Mageia: sudo urpmi gparted
OpenSUSE: sudo zypper install gparted
Ubuntu: sudo apt-get install gparted
```

2. Plugue o pendrive que deseja armazenar o sistema operacional. Abra o GParted e, no canto superior direito, selecione o pendrive plugado.

![gparted1](/imagens/img-geral/gparted1.png)

3. Selecione o pendrive listado e clique no menu superior Dispositivo > Criar tabela de partições. Selecione a opção "msdos" e clique em aplicar.

![gparted2](/imagens/img-geral/gparted2.png)

4. Agora, no menu superior clique em Partição > Novo. Mantenha todas as configurações da tabela, alterando apenas "Sistema de arquivos" para fat32.

![gparted3](/imagens/img-geral/github3.png)

5. Clique no símbolo verde para aplicar todas as operações.
![gparted4](/imagens/img-geral/gparted4.png)

6. Agora, baixe o sistema operacional que deseja colocar no computador formatado. Por exemplo, o [site do Ubuntu](https://releases.ubuntu.com/) oferece diferentes versões do sistema operacional.

7. Entre no [site do Balena](https://www.balena.io/etcher) e baixe o programa exposto na tela inicial.
![balena1](/imagens/img-geral/balena1.png)

8. Abra o Balena e clique em "Flash from file". Selecione o sistema operacional baixado e clique em "Flash"
![balena2](/imagens/img-geral/balena2.png)

9. Ao término do upload, o pendrive já pode ser usado para formatar um computador.