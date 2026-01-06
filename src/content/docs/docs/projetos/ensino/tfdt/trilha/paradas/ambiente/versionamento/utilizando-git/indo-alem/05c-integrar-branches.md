---
id: integrar-branches
title: Trabalhando com branches
sidebar_label: Trabalhando com Branches
---



## Trabalhando com branches secundárias

1 - Gerar uma nova branch para desenvolver uma tarefa

```
git checkout –b feature # criando o branch de trabalho

```
2 - Trazer as alterações na branch principal (main) 

  
```
git checkout  <nome da branch secundaria> # se conectar na branch secundária

git rebase main

``` 


3 - Levar as alterações da branch secundária para a branch principal (main)


```

git checkout main # se concectar a brach principal

git merge <nome da branch secundaria>


```

## Autoria

- [Rafael de Almeida](https://gitlab.com/unesp-labri/sites/labri/-/commits/main/website/docs/projetos/ensino/trilha-dados?author=rafaelrdealmeida)
- [Leonardo de Almeida Petrilli](https://gitlab.com/unesp-labri/sites/labri/-/commits/main/website/docs/projetos/ensino?author=Leonardo%20Petrilli)
- [Ver todos os autores](https://gitlab.com/unesp-labri/sites/labri/-/commits/main/website/docs/projetos/ensino/trilha-dados/ambiente)