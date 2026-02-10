---
id: p03-01-listas
title: Tipos de dados Avançados - Listas
sidebar_label: Listas
---

- [Replit](https://replit.com/@fparon/tipos-avancados#listas.py) dessa parte

| Estrutura de dados | `list`                                         |
| ------------------ | ---------------------------------------------- |
| uso                |                                                |
| criação            | `[]` ou `list()` (cria lista vazia) ou [1,2,3] |
| métidos de buscar  |                                                |
| métodos comuns     | `len(minha_lista)` quantidade de elementos     |
| ordem preservada?  | sim. os itens podem ser acessados por índices  |
| mutável?           | sim                                            |
| ordenado?          |                                                |

- métodos de ajuda: help()

- Se desejar classificar para retornar uma nova cópia de sua lista, em vez de modificar sua cópia original, você pode usar a sorted(my_list)função incorporada em sua lista para retornar uma nova list , classificada em ordem crescente (crescente). Ou use sorted(my_list, reverse=True)para criar uma nova listclassificação ao contrário, em ordem decrescente (ou decrescente). Esta operação não modificará a lista subjacente.

| Ação                                                                                                     | Método                                        | retorno | possivel erro |
| -------------------------------------------------------------------------------------------------------- | --------------------------------------------- | ------- | ------------- |
| checar tamanho                                                                                           | `len(minha_lista)`                            | `int`   |               |
| adicionar no final da lista                                                                              | `minha_lista.append(item)`                    |         |               |
| adicionar itens de outra lista                                                                           | `minha_lista.extend(item)`                    |         |               |
| saber indice do item                                                                                     | `minha_lista.index(item)`                     |         |               |
| inserir em posição determinada da lista                                                                  | `minha_lista.insert(posição, item)`           |         |               |
| remover item da lista                                                                                    | `minha_lista.remove(item)`                    |         |               |
| remover o último item ou um item pelo indice                                                             | `minha_lista.pop()` ou `minha_lista.pop(pos)` |         |               |
| exclui um elemento a partir de um determinado índice e remove fatias de uma lista                        | `del` `minha_lista[n1:n2]`                    |         |               |
| remove todos os itens de uma lista                                                                       | `minha_lista.clear()`                         |         |               |
| quantidades de vezes que determinado item aparece na lista                                               | `minha_lista.count(item)`                     |         |               |
| copia a lista original e os novos elementos colocados na nova lista não são acrescidos na lista original | `minha_lista.copy()`                          |         |               |
| classifica os elementos da lista em ordem crescente ou decrescente, muda a lista diretamente             | `minha_lista.sort()`                          |         |               |
| não muda a lista, simplesmente ordena                                                                    | `sorted`(`minha_lista`)                       |         |               |
| inverte os elementos da lista                                                                            | `minha_lista.reverse()`                       |         |               |
| atualização na posição                                                                                   | minha_lista[posição] = `item`                 |         |               |
| procurar item na lista                                                                                   | item in minha_lista                           |         |               |

- As listas são ótimas para armazenar uma sequência ordenada de objetos. Lembre-se de que você pode ver o estado atual de sua lista a qualquer momento, digitando o próprio nome de sua lista. Verifique sua lista após cada operação para ver se ela mudou.

- fatiamento de listas
- utiliar os metodos

### Avaliar

- https://realpython.com/python-reverse-list/
