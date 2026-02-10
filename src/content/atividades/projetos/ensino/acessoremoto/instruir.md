---
id: instrucao-inicial
title: Instruções de acesso
sidebar_label: Instruções de acesso
---

:::tip
Nesta página você encontra as seguintes instruções para:

- Mudar a senha provisória e habilitar a identificação por dois fatores para realizar acesso ssh
- Ativar o acesso a Estação Remota de Trabalho via Chrome Remote Desktop (CRD)
- Funcionalidades do CRD
- Configurações iniciais do seu usuário pessoal na estação remota de trabalho
  :::

:::info

Tempo total estimado para realizar as instruções indicadas: 30 minutos

:::

## Habilitar Identificação por dois fatores

Para acessar a Estação Remota de Trabalho é necessário inicialmente realizar os passos indicados abaixo:

- Ter os dados de acesso (usuario, senha provisória, endereço do servidor) que são enviados ao email inserido no formulário de cadastro.

- Instalar o aplicativo **Google Authenticator** ([Android](https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=pt_BR&gl=US) | [Apple](https://apps.apple.com/br/app/google-authenticator/id388497605)) ou **FreeOTP** ([Android](https://play.google.com/store/apps/details?id=org.fedorahosted.freeotp&hl=pt_BR&gl=US) | [Apple](https://apps.apple.com/us/app/freeotp-authenticator/id872559395)) no seu celular

- Após instalar o aplicativo, verifique se está conectado na mesma conta de email indicada no formulário de cadastro.

<details>
<summary>Informações para auxiliar na escolha de um dos apps acima</summary>

- Ambos os aplicativos irão funcionar da mesma maneira mostrando o código de verificação necessário para você realizar o acesso ssh.
- Pontos para avaliar ao escolher um dos dois:
  - O Google Authenticator é um aplicativo proprietário e FreeOTP é open source
  - No FreeOTP é possivel fazer backup de sua chave secreta
- Você vai precisar de um desses aplicativos apenas quando for fazer acesso ssh (ativar o Chrome Remote Desktop (CRD), por exemplo).
- No uso cotidiano do Chrome Remote Desktop não será necessário a interação com um desses aplicativos. Apenas quando for necessário uma reativação do CRD.

</details>

- **[Habilitar Identificação por dois fatores (clique aqui para assistir o video)](https://youtu.be/ncNyvDqn4iQ)**

- **Atenção:** Caso você tenha problemas com o PowerShell, você pode utilizar o terminal de extensão do Google Chrome chamado Secure Shell. [Clique aqui](https://youtu.be/z3GmizNhmig) para acessar o vídeo de instruções do Secure Shell no canal do LabRI/UNESP.

<details>
<summary>Indicamos aqui, textualmente, os principais pontos indicados no vídeo acima</summary>

- Abra o terminal (em distribuições linux ou no macOS) ou o powerShell (no windows)
- Realize o acesso ssh digitando: `ssh seu_usuario@endereço_servidor`
  - troque o usuario e o endereço\_ do \_servidor pelos que foram enviados por email para você
- Digite a senha provisória enviada por email (ela será pedida duas vezes).
  - Lembre-se que ao digitar a senha no PowerShell ou no Terminal, ela não aparece na tela por questões de segurança. Não se preocupe se você não conseguir ver a senha enquanto a digita. Você pode estar acostumado a ver asteriscos ou pontos em outros lugares ao digitar uma senha, mas no terminal nada é mostrado. Assim, você pode ignorar que o terminal pareça travado, **apenas digite sua senha e pressione Enter (repita este processo se necessário)**.
- Digite uma senha pessoal e intransferível (somente você saberá essa senha)
- Escaneie o qr-CODE que aparecer **apenas**, no **Google Authenticator** ([Android](https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=pt_BR&gl=US) | [Apple](https://apps.apple.com/br/app/google-authenticator/id388497605)) ou **FreeOTP** ([Android](https://play.google.com/store/apps/details?id=org.fedorahosted.freeotp&hl=pt_BR&gl=US) | [Apple](https://apps.apple.com/us/app/freeotp-authenticator/id872559395))
  - Não escaneie o qr-CODE com o aplicativo da câmera do celular
- Insira o codigo de verificação que aparece no **Google Authenticator** ([Android](https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=pt_BR&gl=US) | [Apple](https://apps.apple.com/br/app/google-authenticator/id388497605)) ou **FreeOTP** ([Android](https://play.google.com/store/apps/details?id=org.fedorahosted.freeotp&hl=pt_BR&gl=US) | [Apple](https://apps.apple.com/us/app/freeotp-authenticator/id872559395)) no powershell ou no terminal
- Realize o acesso ssh novamente digitando: `ssh seu_usuario@endereço_servidor` (troque o usuario e o endereço_do_servidor pelos que foram enviados por email para você). Agora você vai digitar a senha pessoal e inserir o código de verificação de aparecer no **Google Authenticator** ([Android](https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=pt_BR&gl=US) | [Apple](https://apps.apple.com/br/app/google-authenticator/id388497605)) ou **FreeOTP** ([Android](https://play.google.com/store/apps/details?id=org.fedorahosted.freeotp&hl=pt_BR&gl=US) | [Apple](https://apps.apple.com/us/app/freeotp-authenticator/id872559395))
- Para sair do acesso via ssh você por digitar `exit` ou fechar a janela do power shell ou terminal

</details>

## Ativar acesso via CRD

Agora que você já mudou a senha provisória e habilitou o duplo fator de autenticação. Vamos para a etapa de ativar ou reativar o Chrome Remote Desktop (CRD)

Para isso, assista o seguinte vídeo: **[Ativar Chrome Remote Desktop](https://youtu.be/z3GmizNhmig?si=4IHGWFQIblUPmn3D)**

Abaixo indicamos textualmente os principais pontos indicados no vídeo acima:

<details>
<summary>Indicamos aqui, textualmente, os principais pontos indicados no vídeo acima</summary>

- Abra o secure Shell (extensão Chrome Store) ou terminal (em distribuições linux ou no macOS) ou o [powerShell (no windows)](https://youtu.be/Gbs55DTZuGM)
- Realize o acesso ssh digitando: `ssh seu_usuario@endereço_servidor`
  - troque o usuario e o endereço\_ do \_servidor pelos que foram enviados por email para você
- Digite sua senha pessoal e intransferível
  - Lembre-se que ao digitar a senha no PowerShell ou no Terminal, ela não aparece na tela por questões de segurança. Não se preocupe se você não conseguir ver a senha enquanto a digita. Você pode estar acostumado a ver asteriscos ou pontos em outros lugares ao digitar uma senha, mas no terminal nada é mostrado. Assim, você pode ignorar que o terminal pareça travado, **apenas digite sua senha e pressione Enter (repita este proceso se necessário)**.
- Digite o código de verificação indicado no **Google Authenticator** ([Android](https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=pt_BR&gl=US) | [Apple](https://apps.apple.com/br/app/google-authenticator/id388497605)) ou **FreeOTP** ([Android](https://play.google.com/store/apps/details?id=org.fedorahosted.freeotp&hl=pt_BR&gl=US) | [Apple](https://apps.apple.com/us/app/freeotp-authenticator/id872559395))
- Após o passo acima você estará acessando o servidor (repare a linha indica seu_usuario@nome_do_servidor)
- Acesse a página do <u>_[Chrome Remote Desktop](https://remotedesktop.google.com/)_</u> e faça login na conta google ou @unesp.br que deseja ativar o aplicativo
- Clique no menu lateral em <u>_[Configurar por ssh](https://remotedesktop.google.com/u/4/headless)_</u> e clique em todos os botões em azul. Na última tela copie a chave indicada em `Debian Linux`
- No powerShell ou no terminal (linux ou MacOS) digite `add-chrome-remote-desktop`, de um espaço, cole a chave copiada e de `enter`
  - Exemplificação:

  `add-chrome-remote-desktop DISPLAY= /opt/google/chrome-remote-desktop/start-host --code="4/0AVHEtk4NEdBqUxUZkQ71FLLuBThmFoMeZialyg_sPq3y8ZFn2qnHR9HHm_rqt0ITm_0BYA" --redirect-url="https://remotedesktop.google.com/_/oauthredirect" --name=$(hostname)`

- Indique um PIN de no minimo 6 digitos
- Quando por pedido uma senha aperte `ctrl` + `c`

</details>

## Funcionalidades

O Chrome Remote Desktop apresenta algumas funcionalidades interessantes:

- Ajustes da janela do acesso remoto
  - É possivel colocar em tela cheia. Neste modo todos as teclas de atalho funcionam no desktop remoto
  - Caso a tela remota não esteja ajustada em seu monitor, é possivel ajustar-la. Para isso, teste habilitar ou desabilitar as opções `ajustar à janela`, `ajustar tamanho`, `dimensionamento suave`
- Upload e download de arquivos
- Compartilhamento da area de transferência (copia e cola) entre a sua maquina local e o desktop remoto

- Para verificar e ajustar essas funcionalidades, assista o seguinte vídeo: **[Funcionalidades do acesso remoto](https://youtu.be/3PlyAlsJQoA)**

## Configurações Iniciais

Normalmente, no primeiro acesso que você realizará algumas configurações não estarão adequadas.

Por exemplo, o teclado vem no padrão norte-americano sendo necessário um rápido ajuste para o português. Caso contrário teclas como `ç` e `~` não funcionarão no seu usuário da estação remota.

Além disso, você pode criar atalhos na sua área de trabalho para facilitar a abertura de programas que você mais utiliza.

Para realizar esses ajustes, assista aos seguintes vídeos:

- **[Configurar teclado no acesso remoto](https://youtu.be/TNE2lFU1fCM)**
- **[Criar atalhos na área de trabalho](https://youtu.be/4JAw_E2Dv2E)**

# Material de apoio

- [Como consertar o problema de não consigo digitar no terminal no Linux](https://archive.is/wip/FU78I)

# Autoria

- [Artur Dantas](https://gitlab.com/unesp-labri/sites/labri/-/commits/main/website/docs/projetos/ensino/acesso-remoto?author=Artur%20Dantas)
- [Rafael de Almeida](https://gitlab.com/unesp-labri/sites/labri/-/commits/main/website/docs/projetos/ensino/acesso-remoto?author=rafaelrdealmeida)
- [Ver todas as autorias](https://gitlab.com/unesp-labri/sites/labri/-/commits/main/website/docs/projetos/ensino/acesso-remoto)
