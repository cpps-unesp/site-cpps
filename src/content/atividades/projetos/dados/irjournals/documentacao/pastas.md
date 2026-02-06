---
id: pastas
title: Documentação IRJournalsBR
sidebar_label: Pastas
---

### Pastas com dados e metadados

|Pasta        |conteúdo                                           |Estrutura| Exemplo |
|-------------|---------------------------------------------------|---------|---------|
|pdf          | arquivos PDF de todos os artigos                  |`pdf/ano/nome_arquivo` | `pdf/2003/2003-v.2-n.2-02.pdf`|
|xml          | xml gerados, via grobid, a partir dos pdfs        |`xml/ano/nome_arquivo` |`xml/2003/2003-v.2-n.2-02.tei.xml`|
|metadados    | cada linha contem metadados de um artigo da edição|`metadados/nome_arquivo` |`metadados/2013v01n01.csv`|
|csv          | cada arquivo csv contem dados das referências citadas em cada artigo das revistas|`csv/ano/nome_arquivo`| `/2003/2003-v.2-n.2-02.csv`|
|logs         | info de controle da coleta dos pdfs               |`logs/.logs.csv` , `logs/acervo.csv` , `info_data`|
|logs_metadata | info de controle de coleta dos metadados         |`logs_metadata/.logs.csv`, `acervo.csv` |