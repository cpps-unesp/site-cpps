---
id: paginas
title: Edição de páginas
sidebar_label: Edição de páginas
---


Esta página reúne informações para e edição das paginas de grupos que utilizam o site do LabRI/UNESP



## Projeto Cidades Sustentáveis

- [Paginas do projeto Cidades Sustentáveis](https://gitlab.com/unesp-labri/sites/labri/-/tree/main/website/src/pages/cidades-sustentaveis)


## Edição rápida

### Edição de publicações

- Após entrar na pasta com as [Paginas do projeto Cidades Sustentáveis](https://gitlab.com/unesp-labri/sites/labri/-/tree/main/website/src/pages/cidades-sustentaveis) clique em `publicacoes.js`

- Vá até a linha 31 nesta linha consta a seguinte informação `const primeiracoluna = [

- duplique as linhas que estão entre chaves `{}` e edite as informações necessárias


```
    {
        projeto: "publicacoes - labri-unesp",
        titulo: "INSIRA O TITULO AQUI",
        autor: "Autora: INSIRA OS AUTORES AQUI",
        imgFoto: "/img/cidades-sustentaveis/pdf-icon.svg",
        link: "https://drive.google.com/file/d/1pJptDshS_5455JUkXj8LFm-H9_LC6t_D/view?usp=sharing"
    },

```

### Edição de membros

- Após entrar na pasta com as [Paginas do projeto Cidades Sustentáveis](https://gitlab.com/unesp-labri/sites/labri/-/tree/main/website/src/pages/cidades-sustentaveis) clique em `sobre.js`

- Vá até a linha 47 nesta linha consta a seguinte informação `const exmembros = [`

- duplique as linhas que estão entre chaves `{}` e edite as informações necessárias


```

{
        projeto: "sobre - labri-unesp",
        nome: "Prof. Dr. Daniel Damásio Borges",
        imgFoto: "/img/cidades-sustentaveis/membro_cidades-sustentaveis.jpg",
        sobre: (
            <>
            <p>
            Professor associado de direito internacional público da Faculdade de Ciências Humanas e Sociais da UNESP, campus Franca/SP, sendo vinculado aos programas de graduação em direito e em relações internacionais e de pós-graduação em direito desta instituição.  
            <span> Possui graduação em direito pela Faculdade de Direito da Universidade de São Paulo (2001), mestrado em direito internacional pela Faculdade de Direito da Universidade de São Paulo (2005) e pela Universidade Paris I (Panthéon-Sorbonne - 2006), doutorado em direito pela Universidade Paris I (Panthéon-Sorbonne - 2011) e livre-docência em direito internacional público pela Faculdade de Direito da Universidade de São Paulo (2017).</span>
            </p>
            </>
        )
    },


```

### Inserir fotos

- Para inserir fotos dos membros faça upload na [esta página](https://gitlab.com/unesp-labri/sites/labri/-/tree/main/website/static/img/cidades-sustentaveis)
- Ajuste o o item `imgFoto` indicado acima. Em nosso exemplo seria necessário substituir `membro_cidades-sustentaveis.jpg` pelo nome do arquivo da foto do respectivo membro
