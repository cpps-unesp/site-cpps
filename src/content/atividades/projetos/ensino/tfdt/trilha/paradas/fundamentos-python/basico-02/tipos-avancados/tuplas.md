---
id: p03-02-tuplas
title: Tuplas
sidebar_label: Tuplas
---

- [Replit - tuplas](https://replit.com/@fparon/tipos-avancados#tuplas.py)

|Estrutura de dados `tuple`||
|------------------|-------|
|uso||
|criação| `()` ou `tuple()` (cria lista vazia) `(1,)` para um item ou `(1,2,3)` para varios items|
|métodos de buscar|`minha_tupla.index(item)` or `item in minha_tupla`|
|métodos comuns|Não é possivel adicionar or remover itens. Então apenas `minha_tupla.count(item)` contar itens da tupla e `minha_tupla.index(item)` operam sobre tuplas|
|ordem preservada?| sim. os itens podem ser acessados por índices|
|mutável?|não|
|pode ser reordenado?| não|


-Um bom uso de a tupla pode ser para armazenar as informações de uma linha em uma planilha. Esses dados são apenas informações. Não necessariamente nos preocupamos em atualizar ou manipular esses dados. Queremos apenas um instantâneo somente leitura.

- Parece muito trabalho sem muitos benefícios, certo? Não tão. tuples são ótimos quando você depende de seus dados permanecerem inalterados. Devido a esta garantia, podemos usar tuplesem outros tipos de recipientes como sets e dictionários.

- Também é uma ótima maneira de consolidar informações rapidamente.


- Para criar uma tupla de um item, você precisará incluir uma vírgula final.

- desempacotar tuplas


```
estudante = ("João", 21, "História das Relações Internacionais", 10.0)

nome, idade, disciplina, nota = estudante

def http_status_code():
...     return 200, "OK"
...
code, value = http_status_code()

```


- Tuplas são uma forma leve de armazenar informações que descrevem algo, como uma pessoa - seu nome, idade e cidade natal. Você pode pensar nisso como uma linha em uma planilha. As tuplas são representadas entre parênteses, porém os parênteses não são necessários para criar uma tupla, apenas uma sequência de objetos seguidos por vírgulas.

- Lembre-se de que as tuplas são imutáveis, portanto, você não pode alterá-las depois de criadas. Tuplas são ótimas para mover dados de uma maneira leve, porque você pode descompactá-los facilmente em várias variáveis.
