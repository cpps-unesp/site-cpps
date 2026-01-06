---
id: p05-01-arquivos
title: Trabalhando com Arquivos
sidebar_label: Trabalhando com arquivos
---

- [Link](https://replit.com/@fparon/arquivos#main.py) do Replit
- Gestores de contexto

```py

# Sintaxe: 
with open('caminho_arquivo', 'modo_de_acesso', encoding='utf-8') as apelido:
  # operação com arquivo
# o arquivo será fechado ao final do bloco with

```
- O tipo de dado retornado pelo `read()` será sempre uma `str`



|Modo|Descrição|Exemplo|
|---|---|---|
|`r`|Abre o arquivo para leitura||
|`w`|Abre o arquivo para escrita. Todo conteúdo que estiver dentro do arquivo será sobrescrito. Se o arquivo não <br/>existir, será criado um automaticamente||
|`x`|Cria um novo arquivo. Caso o arquivo já exista, será retornado um erro pois neste modo o arquivo necessariamente <br/>não pode existir antes de ser aberto||
|`a`|Abre o arquivo para escrita e insere os dados no final do arquivo. Se o arquivo não existir, será criado||
|`+`|Abre o arquivo para leitura e escrita. A escrita sempre ocorrerá no final do arquivo||


|Método|Descrição|Exemplo|
|----|---|---|
|`read()`|Lê todo o arquivo se nenhum argumento é fornecido. Caso um argumento do tipo `int` seja inserido, será retornado a quantidade de caracteres correspondentes ao `int` apontado|`read()` e `read(10)`|
|`readline()`|Lê apenas uma linha do arquivo||
|`readlines()`|Lê o arquivo e transforma cada linha em um elemento de uma lista||
|`write()`|`w` - modo utilizado caso o conteúdo do arquivo possa ser apagado; `a` - se você quer adicionar conteúdo sem perder os dados já existentes no arquivo; `x` - para ter certeza que um novo arquivo será criado do zero||
|`append()`|||

- Os métodos `read()` e `readlines()` não são indicados para uso se o arquivo for muito grande, pois eles colocam todo o conteúdo do arquivo na memória do computador.

```py

 with open("my_file.text") as my_file:
     contents = my_file.read()

```

```py


>>> import json
>>> with open("cities.json") as cities_file:
...     cities_data = json.load(cities_file)
...     print(cities_data)

```