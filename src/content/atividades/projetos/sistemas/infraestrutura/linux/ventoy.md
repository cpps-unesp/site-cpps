---
id: ventoy
title: Uso do Ventoy para formatação
sidebar_label: Uso do Ventoy para formatação
---
:::tip
Esta página visa instruir sobre o uso do programa "Ventoy" para tornar um pendrive bootável. O objetivo do uso do Ventoy é ser possível somente copiar e colar o arquivo .ISO do sistema operacional desejado na pasta de um pendrive.
:::

1. [Clique aqui](https://www.ventoy.net/en/download.html) para fazer o download do Ventoy para o seu sistema operacional sendo utilizado. Será aberta uma nova página no Github, clique novamente no link do Ventoy para o seu sistema operacional.

2. Após o download, clique com o botão direito no arquivo baixado e clique em "Extrair aqui". Plugue o pendrive em seu computador. Entre na nova pasta criada e execute o arquivo de nome "VentoyGUI.x86_64"

![ventoy1](/imagens/img-geral/ventoy1.png)

3. Selecione o pendrive desejado e clique em "Install". Certifique-se de que este é o pendrive desejado, pois o Ventoy apagará todos os arquivos contidos nele.

![ventoy2](/imagens/img-geral/ventoy2.png)

4. Perceba que o nome do pendrive mudou para Ventoy. Agora, é possível baixar um arquivo .ISO e somente copiar de uma pasta e colar no pendrive para fazer o boot. Escolha o sistema operacional desejado e passe para o pendrive.

5. A partir daqui, as configurações são específicas para os PCs Dell do LabRI/UNESP. Acesse a BIOS do computador, ligando-o e apertando consecutivamente a tecla F2 assim que apertar o botão de ligar.

6. Na caixa de busca, digite "Secure boot" e clique na primeira opção.

![ventoy3](/imagens/img-geral/ventoy3.jpeg)

7. Arraste a página para baixo e procure pela opção "Secure Boot" e "Enable Secure Boot". Desabilite-a como na imagem abaixo. Após, clique em "Apply Changes" e em "Yes.

![ventoy4](/imagens/img-geral/ventoy4.jpeg)

8. Feito isso, agora é necessário configurar a BIOS para inicializar o computador pelo pendrive. No menu lateral esquerdo, clique em "Boot Configuration". Na lista, clique nas setas até o pendrive ser a primeira opção.

![bios1](/imagens/img-geral/bios1.jpeg)

9. Clique em "Apply Changes", "Yes" e em "Exit". O computador irá inicializar pelo pendrive Ventoy. Agora é só escolher o sistema operacional desejado e dar início a formatação.


### Material de apoio
- [Como fazer Pen Drive Bootável de Linux e Windows - Ventoy](https://www.youtube.com/watch?v=11CkqZQ3scE)