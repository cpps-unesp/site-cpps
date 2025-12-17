---
id: ambiente-virtual-windows
title: Ambiente Virtual no Windows
sidebar_label: Ambiente Virtual no Windows
---

## Anaconda no Windows

No sistema operacional Windows, o anaconda é instalado por padrão de uma maneira que o comando `conda` não fica acessível para o sistema todo. 

Diferentemente do Linux, a instalação do Anaconda cria um terminal separado, chamado 'Conda Powershell', e que deve ser executado separadamente para ser utilizado.

Para maior conveniência, é possivel integrar o anaconda ao terminal do Windows, como mostrado na imagem à seguir: 
![#miniconda-powershell](/img/projetos/sistemas/cadernos-labri/miniconda_powershell.png)

Ensinaremos como fazer isto neste tutorial.
Tutorial original de como adicionar anaconda ao Terminal do Windows se encontra [neste link](https://medium.com/@shouke.wei/windows-python-developers-had-better-setup-earlier-iv-add-anaconda-powershell-on-windows-8942dd9cc1a) .

### Requisitos:
- Instale o Terminal do Windows
- Instale o PowerShell 7

### Adicionando o Anaconda PowerShell ao Windows Terminal
Segue o passo a passo
#### Passo 1: Procure o Prompt Anaconda PowerShell

- Digite `Anaconda PowerShell` na pesquisa do menu Iniciar
- Clique com o botão direito em "Abrir local do arquivo"
- Botão direito em Anaconda PowerShell Prompt
- Clique em `Propriedades`
- Copie o caminho da caixa de texto `Alvo`

![Fig.1. Search the path of Anaconda PowerShell Prompt](/img/projetos/sistemas/cadernos-labri/anaconda_atalho.gif)

#### Passo 2: Editar o alvo
Cole o sequinte texto em algum editor de texto:

```
%windir%\System32\WindowsPowerShell\v1.0\powershell.exe -ExecutionPolicy ByPass -NoExit -Command "& '%USERPROFILE%\anaconda3\shell\condabin\conda-hook.ps1' ; conda activate '%USERPROFILE%\anaconda3' "
```
Remova informações que não serão utilizadas, deixando apenas:

```
powershell.exe -ExecutionPolicy ByPass -NoExit -Command & %USERPROFILE%\anaconda3\shell\condabin\conda-hook.ps1; conda activate %USERPROFILE%\anaconda3
```

### Passo 3: Copie o caminho do ícone do Anaconda
(Detalhe, este ícone não é incluso na instalação do Miniconda)
- Digite Anaconda navigator na caixa de busca do Menu Iniciar
- Botão direito para abrir o caminho do arquivo
- Botão direito em Navegador Anaconda(anaconda3)
- Botão direito em propriedades
- Clique em "mudar ícone"
- Copie o caminho do ícone na caixa de texto. Será parecido com este:
```
%USERPROFILE%\anaconda3\Menu\anaconda-navigator.ico
```

![Fig. 2. Path of Anaconda Navigator Icon](/img/projetos/sistemas/cadernos-labri/icone_anaconda_navigator.gif)

#### Passo 4: Abra as configurações do Windows Terminal
- Abra o Windows Terminal
- Clique na seta para baixo e selecione "Configurações

![Fig.3. Go to setting of the Windows Terminal](/img/projetos/sistemas/cadernos-labri/wt_config.png)
#### Passo 5. Abra o arquivo JSON do terminal
- Vá para o último item do menu da esquerda
- Selecione a opção para abrir o arquivo JSON

![Fig.4. Open JSON File of Windows Terminal](/img/projetos/sistemas/json_wt.png)

#### Passo 6. Copie o código do cmd.exe e modifique-o
Copie o Código da seção contendo `cmd.exe`, que deve parecer com o seguinte
```
{
      "commandline": "cmd.exe",
      "guid": "{0caa0dad-35be-5f56-a8ff-afceeeaa6101}",
      "hidden": false,
      "name": "Command Prompt"
    },

```
Pode haver algumas diferenças, mas isto não é  significativo.

Cole o código acima na última linha do seu JSON, e modifique-o;
Mude a parte “commandline:” para o alvo do caminho do Anaconda PowerShell Prompt encontrado acima. O texto original se parece com o seguinte:
```
"commandline": "powershell.exe -ExecutionPolicy ByPass -NoExit -Command & C:\\Users\\**nomedeusuário**\\anaconda3\\shell\\condabin\\conda-hook.ps1;conda activate C:\\Users\\**nomedeusuário**\\anaconda3",
```

Para maior conveniência. você pode substituir a parte `C:\\Users\\nomedeusuário\` para %USERPROFILE%, e ao invés de "powershell.exe", indique `pwsh.exe`caso tenha instalado o PowerShell7, que é uma versão mais recente, mais moderna e mais rápida do Power Shell
#### Passo 7. adicione a linha “icon:”
Você pode adicionar a linha "icon:" depois de qualquer linha, por
```
"hidden": false,
"icon": "%USERPROFILE%\\Anaconda3\\Menu\\anaconda-navigator.ico",
```

#### Passo 8. modifique a linha “guid” 
Cada entrada no arquivo JSON deve ter um identificador único, definido no parâmetro `guid`.

Gere um novo Guid aleatório abrindo o PowerShell e digitando o comando:
```
New-Guid
```

Substitua o guid antigo presente na seção do JSON copiada pelo novo guid
```
"guid": "{e242afdc-1259-4c82-be93-1e7025c5953f}",
```
#### Passo 9. Modifique a linha "name"
Mude o parâmetro Prompt Prompt” da linha “name” para “Anaconda PowerShell”, ou algum outro nome de sua preferência, da seguinte maneira.:

```
"name": "Anaconda PowerShell"
```
Se esta não é a última linha do arquivo JSON, certifique-se de que há uma vírgula (",") no final da entrada correspondente, após a chave de fechamento ("}"). O resultado final se parecerá com o seguinte:
```
{
    "commandline": "C:\\Program Files\\PowerShell\\7\\pwsh.exe -ExecutionPolicy ByPass -NoExit -Command & %USERPROFILE%\\miniconda3\\shell\\condabin\\conda-hook.ps1;conda activate %USERPROFILE%\\miniconda3",
    "guid": "{b07b9ec5-2dd3-4b1b-92ac-0d29f3fc35db}",
    "hidden": false,
    "historySize": 9001,
    "icon": "%USERPROFILE%\\\\miniconda3\\\\Menu\\\\anaconda-navigator.ico",
    "name": "Miniconda PowerShell",
    "padding": "8, 8, 8, 8",
    "startingDirectory": "%USERPROFILE%\\Programming\\tweepina"
},
```
Salve o arquivo e reinicie o Terminal do Windows para finalizar.

#### Passo 10. Utilizando o conda via PowerShell

Por padrão, as distribuições Anaconda não são adicionadas ao caminho do Windows, e fazê-lo é desencorajado, pois segundo a documentação oficial, pode causar conflitos com programas que podem ter o Anaconda como uma dependência opcional.

Desta maneira, os comandos relacionados ao Anaconda não são acessíveis através dos terminais do Windows, mas apenas através dos atalhos "Anaconda Prompt" e "Anaconda Powershell Prompt", adicionados pelo instalador ao menu iniciar do Windows.

É possível, no entanto, habilitar a utilização do Anaconda através do Powershell. A ativação é bem simples, basta:

1. Abrir o Anaconda Powershell Prompt (via menu iniciar, por exemplo)
2. Digitar o comando:
```
conda init powershell
```
3. Reiniciar o terminal. Pronto!

Por padrão, toda vez que uma sessão do PowerShell for iniciada, o ambiente virtual "base" será iniciado automaticamente, o que pode levar alguns segundos.
Para desativar este comportamento, basta utilizar o comando:
```
conda config --set auto_activate_base false
```

#### Referências (em inglês):
- tutorial para adicionar Perfil do Anaconda ao Terminal do Windows: https://medium.com/@shouke.wei/windows-python-developers-had-better-setup-earlier-iv-add-anaconda-powershell-on-windows-8942dd9cc1a
- ativar utilização do Anaconda via powershell: https://stackoverflow.com/questions/64149680/how-to-activate-conda-environment-from-powershell