---
id: equipe
title: Editar equipe
sidebar_label: Equipe
---

Esta página indica como o editar a pagina de equipe do site do LabRI/UNESP.

-----

## Editar a equipe de estágiarios

- Quando quiser adicionar um novo membro ou alterar as informações de um estágiario **ativo** do LabRI/UNESP, procure o arquivo localizado em *docs>equipe>ativo.md* e utilize a estrutura indicada

```
## Nome do membro

<img className="img-equipe-foto" src="/imagens/img-geral/exemplo.png"/>

<div className="img-equipe-redes">
<a href="https://www.linkedin.com/in/exemplo"> <img className="img-icon-redes" src="/imagens/logos/linkedin.svg"/> </a>

<a href="https://www.instagram.com/exemplo/"> <img className="img-icon-redes" src="/imagens/logos/instagram.png" /> </a>

</div>

<div style={{textAlign: 'center'}}>

**Estagiário Remunerado/Voluntário**

*período de colaboração*

Breve descrição

</div>
```

- Caso queira editar os estágiarios que **já passaram** pela equipe do Labri/UNESP, procure *docs>equipe>inativo.md* e utilize a estrutura indicada

```
## Nome exemplo

<img className="img-equipe-foto" src="/imagens/img-geral/exemplo.png"/> 

<div className="img-equipe-redes">
<a href="https://www.linkedin.com/in/exemplo/"> <img className="img-icon-redes" src="/imagens/logos/linkedin.svg"/> </a>
<a href="http://lattes.cnpq.br/exemplo"> <img className="img-icon-redes" src="/imagens/logos/lattes.png"/> </a>

</div>

<div style={{textAlign: 'center'}}>

**Estagiário Voluntário/Remunerado**

*DD/MM/AA - DD/MM/AA*

</div>
```

-----

## Editar a equipe dos projetos

- Caso queira editar as informaçoes de um **membro dos projetos** do LabRI/UNESP, procure a pasta do projeto desejado em *docs>projetos*. Abra o arquivo *02-equipe.md* para realizar alterações nos membros do projeto, utilizando a estrutura indicada
- Lembre-se de observar a estrutura do arquivo *02-equipe.md*, geralmente está divido em "Coordernadores" e "Colaboradores" (ativos e inativos)

```
### [Nome do Membro](/docs/equipe#nome-exemplo) 

<img className="img-equipe-foto" src="/imagens/img-geral/exemplo.png"/> 

<div className="img-equipe-redes">
<a href="http://lattes.cnpq.br/exemplo"> <img className="img-icon-redes" src="/imagens/logos/lattes.png" /> </a>

<a href="https://www.linkedin.com/exemplo"> <img className="img-icon-redes" src="/imagens/logos/linkedin.svg"/> </a>

</div>

<div style={{textAlign: 'center'}}>

*periodo de participação*

</div>
```

-----

## Adicionar foto

- Para aprender a adicionar imagens, [clique aqui](/docs/projetos/sistemas/site/markdown/geral)
- Dê preferência a imagens no **formato** *jpg* ou até *png*, com proporção de um quadrado de lados iguais (evita que a imagem fique distorcida)
- O **padrão** a ser adotado ao nomear os arquivos deve ser *nome-sobrenome.jpg*
- As **imagens** da equipe do LabRI e dos membros dos projetos deverão sempre sempre estar localizadas em *website>static>img>equipe*
- Os **icones** das redes sociais da equipe e do projeto estão localizados em *website>static>img>social*
- Para saber mais sobre informações estáticas do site do LabRI/UNESP [clique aqui](/docs/projetos/sistemas/site/editar/static#static)

-----