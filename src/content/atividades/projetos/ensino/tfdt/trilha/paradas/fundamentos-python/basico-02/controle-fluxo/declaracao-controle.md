---
id: p04-02-declarações-de-controle
title: Declarações de controle
sidebar_label: Declarações de controle
---


### O que são algoritmos

Segundo Tremblay, algoritmo é uma "sequência ordenada, e não ambígua, de passos que levam à solução de um dado problema." Um algoritmo pode ser representado, dentre outras maneiras, por:


- Descrição de narrativa;
    - Utilização do português para descrever o passo a passo para realizar alguma tarefa ou resolver algum problema
    - Exemplo: receita de bolo
- Fluxograma;
    - Utilização de símbolos gráficos para descrever o passo a passo para realizar alguma tarefa ou resolver algum problema
- Linguagem algorítmica
    - Pseudo linguagem de programação utilizada para representar o algorítmo



### Declaração de controle

Os scripts ou programas que construímos podem obedecer certas condições prévias para executar determinada ação. Para que isso ocorra, utilizamos as chamadas declarações de controle ou controle de fluxo, que irão verificar determinada condição pré-estabelecida antes de executar determinada ação. Iremos ver duas declarações de controle: as condicionais; e os laços de repetição

#### Condicionais

A linguagem de programação Python utiliza as palavras-chave `if`, `elif` e `else` para indicar execução condicional de determinado código. Basicamente, a partir dessas palavras-chave, ao executar determinado script ou programa, é verificado se determinada condição é verdadeira. Em caso afirmativo, determinado bloco de código será executado. Em caso negativo, outro bloco de código será executado.

##### `if` e veracidade

- O número `0` sempre será `False`. Qualquer outro número, incluindo os negativos, são `True`.
- `list`, `set`, `tuple`, `dict` vazios são `False`. Qualquer um desses tipos de dados quando tiver elementos são `True`






- Loops e instruções de controle nos permitem controlar o fluxo lógico de nosso programa.
- laços de repetição e controle

### Noção geral sobre iteração

- Iteração: é o processo de percorrer itens em uma coleção


### Comando `for`

- range(),zip(), enumerate(), os.walk(), exclusão de linha
- for no dict metodos
- https://youtu.be/OSGv2VnC0go e video do Hash


```py

colors = ["Red", "Green", "Blue", "Orange"]
for color in colors:
    print(f"The color is: {color}")

The color is: Red
The color is: Green
The color is: Blue
The color is: Orange

```

- `range(start, stop, step)` e `help(range)`

- Se quiser ver explicitamente o que uma chamada para range()produz para fins de depuração, você pode passar o resultado para o list()método para ver todos os valores de uma vez. Por exemplo: list(range(5)). Lembre-se de que isso é ineficiente, portanto, use-o para teste, não no código de produção.

```py

for num in range(5):
    print(f"The number is: {num}")

```

- `enumerate (iteravel, start=0)`

  - Como enumerate()retorna uma estrutura que se parece com uma lista de tuples por baixo do capô, podemos aproveitar a descompactação da tupla no forloop.


  ```py

cores = ['azul', 'amarelo', 'vermelho','preto', 'branco', 'verde']

for index, item in enumerate(cores, start=1):
    print(f'Item: {item} é o indice: {index}')

  ```

- Laços em dicionários


```py

lusofonia = {"AmÃ©rica do Sul": "Brasil", "Europa": "Portugual", "Ãfrica":"Angola", "Ãsia":"Macau" }

for regiao in lusofonia:
    print(f"A região pe: {regiao}")

for luso, pais in lusofonia.items():
    print(f"A região é: {regiao} e o pais é: {pais}")

for  pais in lusofonia.values():
    print(f"O pais é: {pais}")

```




### Comandos `if`, `elif`, `else`


- `if` significa: execute o resto deste código apenas uma vez, se a condição for avaliada como `True`

- Para executar o condigo apenas se a expressão for `False`, use a palavra chave `not`

- `if` e veracidade

- `if` e funções

- `if` declarações aninhadas

- como não utilizar a declaração `if`
  - As comparações em Python são avaliadas como `True` ou `False`. Com declarações condicionais, verificamos esse valor implicitamente . Em Python, não queremos comparar `True` ou `False`com `==`.

```py

# NÃO FAÇA ISSO
if (3 < 5) == True:
    print("Olá")

# NÃO FAÇA ISSO
if (3 < 5 ) is True:
    print("Olá")

# FAÇA ISSO
if 3 < 5:
    print("Olá")

# FAÇA ISSO

a = True
b = [1,2,3]

if a and b:
    print("Olá")

if a is True:
    print("Olá")


```

- `else`

  - A `else` instrução é o que você deseja executar se e somente se sua `if` instrução não foi acionada.


- `elif`

  - A instrução `elif` é utilizada se existir mais condições a serem verificadas e é acionado se o `if` não for considerado `True`. É possivel ter quantas instruções `elif`forem necessárias. São expressões intermediárias que antecedem o `else`



### Comando `while`


- Em vez de serem executados apenas uma vez quando uma condição é atendida, como uma a instrução `if` faz, na instrução `while` são executados para sempre até que uma condição não seja mais atendida.

-  A instrução `while`, normelmente deve ser acompanhada de um contador/flag para evitar um loop infinito.


```py
contador = 0
maximo = 5

# while controlado
while contador < maximo:
    print(f"O contador é: {contador}")
    contador = contador + 1

# while infinito

while contadot < maximo:
    print(f"O contador é: {contador}")


```



### Break, continue e return


|Instrução|Detalhamento|
|---|---|
|`return`|A instrução `return` é usada para encerrar a execuçao de uma função e retornar o resultado para o chamador; <br/> as instruções indicadas abaixo a palavra-chave `return` não serão executadas;<br/> se a instrução `return` não tiver nenhuma expressão, `None` será retornado|
|`break`|A instrução `break` sairá completamente do loop atual, o que significa que não executará mais nenhuma das instruções contidas dentro deste loop |
|`continue`|A instrução `continue` volta para o início do loop atual|
|`yield`|A instrução `yield` retorna um resultado intermediário para o chamador, mas mantém o estado local da função, para que ela possa ser retomada exatamente de onde parou|





### Tratamento de exceções e tracebacks


- o basico de `try` e `except`



### Trabalhando com Arquivos





### Material de apoio

- https://www.delftstack.com/pt/howto/python/loop-through-files-in-directory-python/

- https://realpython.com/python-for-loop/

- https://www.datacamp.com/community/tutorials/loops-python-tutorial

- https://www.learnbyexample.org/python-for-loop/

- Inserir exemplo do ["Glob para listar arquivos"](https://www.digitalocean.com/community/tutorials/how-to-use-the-pathlib-module-to-manipulate-filesystem-paths-in-python-3-pt)


- [Iteradores e iteráveis em Python- Ciência Programada](https://cienciaprogramada.com.br/2021/08/iteradores-e-iteraveis-em-python/)
