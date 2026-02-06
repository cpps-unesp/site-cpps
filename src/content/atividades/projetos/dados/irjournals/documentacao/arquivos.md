---
id: arquivos-controle
title: Documentação IRJournalsBR
sidebar_label: Arquivos de Controle
---

### Arquivos do controle


|nome        |função                             |    variáveis                           |
|------------|-----------------------------------|----------------------------------------|
|`.logs.csv` |armanezar histórico da coleta      |`date`, `houve_coleta`(`TRUE`), `coleta`|
|`acervo.csv`|refere-se cada edição              |`url` de determinada edição, `editions`, `vol`, `n`, `ano`, `revista`|
|`info_data` |tamanho e localização de cada pdf  |`loc_arquivo` local do pdf, `pdf_url` localização web, `size` tamanho|


:::info

O `info_data` contém informações que possibilitam vincular os arquivos pdf, csv (com referencias) , csv (com metadados)

:::


- `loc_arquivo` (de `logs/info_data.csv`) e `path_pdf` (de `csv/ano/nome_arquivo.csv` ) vinculam os arquivos pdf ao csv das referencias

- `pdf_url` (de `logs/info_data.csv`) e `PDFURL` (de `metadados/nome_arquivo.csv`) vinculam o metadados com os  arquivos pdf