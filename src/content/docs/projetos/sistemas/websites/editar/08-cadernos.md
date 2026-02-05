---
id: cadernos
title: Editar Cadernos
sidebar_label: Cadernos
---

Esta página tem como objetivo indicar como editar os textos que serão publicados nos **cadernos** LabBRI/UNESP.

------

## Localização

- Os cadernos publicados no site do LabRI estão localizados na pasta *website>cadernos*

- O arquivo markdown da publicação deverá seguir o padrão *DATA-LABRI-NUMERO DO CADERNO.md* como indicado a seguir

- A data descrita no nome do arquivo deve seguir o formato ANO-MÊS-DIA

![cadernos](/img/projetos/sistemas/web-redes/readme21.jpg)

------

## Metadados

- Metadados são parte da estrutura de um dado principal, sendo responsáveis por fazer dele um conjunto de informações úteis

- É possível definir metadados como dados que explicam outros dados

- Os *metadados* da publicação dos cadernos do LabRI/UNESP ficam sempre no inicio do arquivo Markdown, entre hífens

![metadados](/img/projetos/sistemas/web-redes/readme22.jpg)

- *Slug* indica a URL da publicação

- *Tags* indica as etiquetas ou rótulos que ficarão associados a publicação. Sempre entre colchetes e separado por virgula

- *Title* e *Subtitle* indicam respectivamente o titulo e subtitulo da publicação, deverá estar entre aspas duplas

- *Author* e *author_subtitle* indicam os autores e o subtitulo correspondente das publicações. No exemplo a seguir, o *author_subtitle* é "Graduandos em Relações Internacionais"

- *Tipo_publicacao* contém o tipo e o número da publicação, que aparecerá na prévia localizada em **Cadernos**

- *Image_url* indica o URL da imagem que será utilizada na publicação

- *Descriçao* representa uma breve descrição da publicação, que aparecerá na prévia localizada em **Cadernos**

- *Download_pdf* indica o local para download do PDF, ou seja, uma informação estática que deverá estar localizada em **website>static>arquivos**

![exemplo](/img/projetos/sistemas/web-redes/readme23.jpg)

- O arquivo PDF/EPUB é gerado por um script a parte

- Para saber mais sobre informações estáticas, [clique aqui](/docs/projetos/sistemas/site/editar/static)

------