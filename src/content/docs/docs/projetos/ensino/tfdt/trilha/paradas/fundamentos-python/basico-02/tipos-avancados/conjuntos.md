---
id: p03-03-conjuntos
title: Conjuntos
sidebar_label: Conjuntos
---

- [Replit - conjuntos](https://replit.com/@fparon/tipos-avancados#conjuntos.py)

Conjuntos, chamados em inglês de `set` são um tipo de dados que permitem armazenar outros tipos imutáveis ​​de uma forma não ordenada. Um item só pode estar contido em um conjunto uma vez. Não há duplicatas permitidas. Os benefícios de um conjunto são: ser capaz de usar operações de conjunto poderoso, como union, difference, e intersection.

|Estrutura de dados `set`||
|------------------|-------|
|uso| Usado para armazenar tipos de dados imutáveis ​​com exclusividade. Fácil de comparar os itens em sets. |
|criação| `set()` (cria lista vazia) `(1,)` `{}`  fazer um `dict` vazio e `{1,2,3}` para varios items|
|métodos de buscar| `item in meu_conjunto`|
|métodos comuns|`meu_set.add(item)` adicionar item, `minha_tupla.discard(item)` remove item se estiver presente sem retorno de erro,  `minha_tupla.remove(item)` retorna erro se o item não existir `meu_set.update(outro_set)` |
|ordem preservada?| não, items não podem ser acessados pelo indice|
|mutável?| Sim, é possivel adicionar ou remover items|
|pode ser reordenado?| Não, por que items não são ordenados|


|Ação|Método|
|-----|-----|
|Remove o elemento especificado e retorna `None`; se o elemento não existir, é gerado um `KeyError`|`conjunto.remove(elemento)`|
|Remove o elemento especificado e retorna `None`; se o elemento não existe, não gera um `KeyError`|`conjunto.discard('elemento')`|
|Remove um elemento arbitrário e retorna o elemento removido; se não houver o elemento, gera um `KeyError`|`conjunto.pop()`|
|Adiciona um determinado elemento ao conjunto; se o elemento estiver presente, não adiciona nenhum elemento|`conjunto.add(elemento)`|
|Retorna uma cópia autônoma do conjunto|`conjunto.copy()`|
|Remove todos os elementos de um conjunto|`conjunto.clear()`|
|Retorna os elementos diferentes da comparação de dois conjuntos; Não modifica os conjuntos originais|`conjunto_01.difference(conjunto_02)`|
|Atualiza o conjunto a partir das diferenças entre eles |`conjunto_01.difference_update(conjunto_02)`|
|Retorna um novo conjunto com os elementos comuns aos conjuntos envolvidos na intersecção|`conjunto_01.intersection(conjunto_02)`|
|Atualiza o conjunto que chama o método com a intersecção dos conjuntos indicados; retorna um `None`|`conjunto_01.intersection_update(conjunto_02)`|
|Retorna `True` se dois conjuntos não apresentam elementos comuns; retorna `False` se os dois conjuntos apresentam elementos comuns; este método leva um único argumento e pode receber um iterável (lista, tupla, dicionário, string). Este método irá converter o iterável em um conjunto e verificará se os conjuntos são separados ou não|`conjunto_01.isdisjoint(conjunto_02)`|
|Retorna `True` se o subconjunto está dentro do conjunto. Caso contrário, retorna `False`.|`conjunto_01.issubset(conjunto_02)`|
|Retorna `True` se `set_a` é um super conjunto do `set_b`. Caso contrário, retorna `False`|`conjunto_01.issuperset(conjunto_02)`|
|Retorna os elementos que não estão na intersecção dos conjuntos|`conjunto_01.symmetric_difference(conjunto_02)`|
|Encontra os elementos que não fazem parte da intersecção e atualiza o conjunto pelo método|`conjunto_01.symmetric_difference_update(conjunto_02)`|
|retorna um novo conjunto com elementos únicos de todos os conjuntos relacionados na união|`conjunto_01.union(conjunto_02)`|
|Atualiza o conjunto que chama o método, adicionando elementos iteráveis; retorna `None` |`conjunto.update(elementos)`|





- Enquanto você está aprendendo Python, é útil para usar type(), dir()e help()o mais rápido possível.


- sets não podem conter tipos mutáveis
  - A maneira que setpermite verificar rapidamente se um item está contido neles ou não é com um algoritmo chamado hash. Não vou cobrir os detalhes, mas um algoritmo é uma maneira de representar um tipo de dados imutável com uma representação numérica única. Em Python, há uma hash()função embutida. A hash()função funciona apenas em tipos de dados imutáveis. Isso significa tipos de dados em que o conteúdo não pode ser alterado após a criação.

- `set` podem ser usados ​​para eliminar a duplicação dos itens em uma lista
  - Se você não se preocupa com a ordem , pode desduplicar rapidamente os itens em a `list`

- items em `set` não são ordenados
  - Isso significa que, ao imprimi-los, os itens não serão exibidos na ordem em que foram inseridos
  - Isso também significa que você não pode acessar itens de`set` pelos seus indices
  - Se o seu conjunto contiver itens do mesmo tipo e você quiser classificá-los, será necessário converter o setem listprimeiro. Ou você pode usar o sorted(sequence)método embutido , que fará a conversão para você

- Como um conjunto não tem ordem, não podemos adicionar ou remover itens por índice. Precisamos chamar as operações com o próprio item

- Tenha cuidado ao passar strpara my_set.update(sequence). Isso porque um string também é uma sequência.


- Você pode atualizar um setpassando em outra sequência, ou seja set, outra list, ou tuple


- Operações com o `set`
  - sets permitem operações rápidas e fáceis para comparar itens entre dois conjuntos.

|Metodo|simbolo|resultado|
|----|----|----|
|`s.union(t)`|`s | t`|cria um novo conjunto com todos os itens|
|`s.intersection(t)`|`s & t`|cria um novo conjunto contendo apenas itens que estão dentro `s` e dentro `t`|
|`s.difference(t)`|`s ^ t`|cria um novo conjunto contendo itens que não estão em ambos|


- Existem outras operações úteis disponíveis em sets, como verificar se um conjunto é um subconjunto, um superconjunto e muito mais, mas não tenho tempo para cobrir todos eles. Python também tem um frozensettipo, se você precisar da funcionalidade de um setem um pacote imutável (o que significa que o conteúdo não pode ser alterado após a criação).


- Os conjuntos são um ótimo tipo de dados para armazenar dados únicos - você só pode ter um de qualquer objeto em um conjunto. Os conjuntos não são ordenados, portanto, você não pode acessá-los com a []sintaxe de indexação, mas eles têm algumas funções úteis.







