---
id: p01-02b-operadores
title: Operadores
sidebar_label: Operadores
---

- Link para o [Replit](https://replit.com/@fparon/operadores#main.py) dessa parte

### Operadores em string 🔧

| Operador | Descrição                                              |
| -------- | ------------------------------------------------------ |
| `+`      | Concatenação de string                                 |
| `*`      | Repetição de string                                    |
| `in`     | Verifica se determinado caractere existe na string     |
| `not in` | Verifica se determinado caractere não existe na string |

```py
continente = 'europa_'
pais = 'frança'
print(continente + ' ' + pais)
print(continente * 10)
print('f'in pais)
print('b'in pais)
print('b'not in pais)
```

### Operadores aritméticos

| Operador | Descrição                           | Exemplo |
| -------- | ----------------------------------- | ------- |
| `+`      | Realiza a operação de adição        | 5+5     |
| `-`      | Realiza a operação de subtração     | 5-5     |
| `*`      | Realiza a operação de multiplicação | 5\*5    |
| `/`      | Realiza a operação de divisão       | 5/5     |
| `%`      | Resto da divisão                    | 10%5    |
| `//`     | Divisão arredondada                 | 22//5   |
| `**`     | Potenciação                         | 5\*\*2  |

```py
'''
Operadores Aritméticos
'''
print(5+5)
print(5-5)
print(5*5)
print(5/5)
print(10%5)
print(22//5)
print(5**2)
```

### Operadores de atribuição

- Este operador atribui um valor operando a sua esquerda baseado no valor operando à direita

| Operador | Exemplo 1 | Exemplo2     |
| -------- | --------- | ------------ |
| `=`      | x = 3     | x = 3        |
| `+=`     | x += 3    | x = x + 3    |
| `-=`     | x -= 3    | x = x - 3    |
| `*=`     | x \*= 3   | x = x \* 3   |
| `/=`     | x /= 3    | x = x / 3    |
| `%=`     | x %= 3    | x = x % 3    |
| `//=`    | x //= 3   | x = x // 3   |
| `**=`    | x \*\*= 3 | x = x \*\* 3 |
| `&=`     | x &= 3    | x = x & 3    |
| `\|=`    | x \|= 3   | x = x \| 3   |
| `^=`     | x ^= 3    | x = x ^ 3    |
| `<<=`    | x <<= 3   | x = x << 3   |
| `>>=`    | x >>= 3   | x = x >> 3   |

```py
'''
Operadores de atribuição
'''
soma = 1
soma += 3 #Equivalente a `soma = soma + 3`
print(soma)
soma -= 2
print(soma)
soma *= 2
print(soma)
soma /= 2 #Lembre-se que toda divisão gera um tipo de dado `float`
print(soma)
soma = 1
soma ^= 3
print(soma)
soma >>= 3
print(soma)

```

### Operadores de comparação

| Operador | Descrição                                                                                                  | Exemplo |
| -------- | ---------------------------------------------------------------------------------------------------------- | ------- |
| `>`      | `Maior que` e também retorna `True` quando o valor da esquerda é maior do que o da direita                 | x > y   |
| `<`      | `Menor que` e também retorna `True` quando o valor da esquerda é menor do que o da direita                 | x < y   |
| `==`     | `Igualdade` e também retorna `True` se ambos os valores forem iguais                                       | x == y  |
| `!=`     | `Diferente` e também retorna `True` se os valores forem diferentes                                         | x != y  |
| `>=`     | `Maior ou igual` e também retorna `True` quando o valor da esquerda for maior ou igual do que o da direita | x >= y  |
| `<=`     | `Menor ou igual` e também retorna `True` quando o valor da esquerda for menor ou igual do que o da direita | x <= y  |

```py
'''
Operadores de Comparação
'''
x = 10
y = 20
print(x > y)
print(x < y)
print(x == y)
print(x != y)
print(x >= y)
print(x <= y)

```

### Operadores lógicos ou booleanos

| Operador | Descrição                                                                      | Exemplo            |
| -------- | ------------------------------------------------------------------------------ | ------------------ |
| `and`    | Retorna `True` se ambas operações são verdadeiras                              | x > y `and` x > 20 |
| `or`     | Retorna `True` se uma das operações for verdadeira                             | x > y `or` x > 20  |
| `not`    | Inverte o resultado, retornando `False` se o resultado for `True` e vice-versa | `not` x > 20       |

```py
'''
Operadores lógicos ou booleanos
'''
a, b, c = 10, 15, 20
d = 10
print(a, b, c)
print(a > b and a > c)
print(a < b and a < c)
print(a == b or a == c)
print(a == b or a == c or a == d)
print(not a > b)
```

### Operadores de identidade

| Operador | Descrição                                      | Exemplo      |
| -------- | ---------------------------------------------- | ------------ |
| `is`     | Retorna `True` se os valores são idênticos     | x `is` y     |
| `is not` | Retorna `True` se os valores não são idênticos | x `is not` y |

```py
'''
Operadores de Identidade
Diferenciar operadores de identidade de operadores de comparação
'''
a = [5]
b = [5]
print(a is b)
print(a is not b)
print(a == b)
```

### Operadores de membros ou de associação

| Operador | Descrição                                          | Exemplo             |
| -------- | -------------------------------------------------- | ------------------- |
| `in`     | Retorna `True` se ambas operações são verdadeiras  | 'x' `in` xororó     |
| `not in` | Retorna `True` se uma das operações for verdadeira | 'x' `not in` xororó |

```py
'''
Operadores de membros ou de associação
'''
a = [5, 10, 15]
b = 'Brasil'
print(5 in a)
print('Brasil' not in a)
print('sil' in b)
print('Brasiu' in b)
```

### Precedência de Operadores

- A tabela abaixo apresenta a precedência de operadores do menor para o maior, ou seja os operadores das linhas superiores da tabela têm precedência mais baixa em relação aos operadores da parte inferior.

| Operador                               | Descrição                                                       |
| -------------------------------------- | --------------------------------------------------------------- |
| `or`                                   | Booleano `or`                                                   |
| `and`                                  | Booleano `and`                                                  |
| `not`                                  | Booleano `not`                                                  |
| `==`, `!=`, `>=`, `<=`, `is`, `is not` | Comparações e Identidades                                       |
| `+`, `-`                               | Adição e Subtração                                              |
| `*`, `/`, `//`, `%`                    | Multiplicação, divisão, divisão arrendondada e resto da divisão |
| `**`                                   | Exponenciação                                                   |

- Os parênteses `()` têm precedência mais alta e podem ser usados para forçar a variação de uma expressão na ordem que você quiser
- A exponenciação tem a precedência mais alta
- A multiplicação e a divisão têm a precedência mais alta do que a adição e a subtração

```py
'''
Precedência
'''
a = 5
b = 10
c = 15
print(5 + 10**2)
print((5 + 10)**2)
print(a + b - c*a/b)
print(a + (b - c)*a/b)
```
