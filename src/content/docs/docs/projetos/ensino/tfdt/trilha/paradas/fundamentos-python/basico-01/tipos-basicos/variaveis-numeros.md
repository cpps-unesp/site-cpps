---
id: p01-01-variaveis-e-numeros
title: Variáveis e Números
sidebar_label: Variáveis e Números
---
 - [Clique aqui](https://replit.com/@fparon/Variavel-e-numeros#main.py) para acessar o replit dessa página
 - Este tutorial abordará conceitos sobre variáveis, regras de nomeação, comentários, operadores de atribuição, palavras reservadas e números em Python.
### Variáveis

Uma variável é uma etiqueta que representa um valor específico. Podemos atribuir um valor a uma variável usando o operador de atribuição =, onde a variável está à esquerda e o valor à direita; 
- A variável sempre estará à esquerda do operador `=` e o valor à direita do operador `=`;
- É normal perguntarmos qual valor de determinada variável;

- Exemplo:

```py
palavra = 'pneumoultramicroscopicossilicovulcanoconiótico'
print(palavra)

```
#### Regras para a nomeação de variáveis 📚

Para definir os nomes das variáveis, precisamos seguir algumas regras:
- Não podem ter espaço e devem começar com letra ou sublinhado
- Não podem usar palavras reservadas ou identificadores internos que tenham finalidades importantes em Python
- Por convenção, pede-se que se utilize apenas letras minúsculas e sublinhado para nomear as variáveis 
- Não podem conter caracteres especiais \(@, #, !\)

### Comentários 💬

Podemos comentar o código através da utilização de `#` ou de docstrings `"""comentário"""`
- Comentário com `#`

```py
#Comentário para indicar que a variável palavra refere-se a um valor vinculado à maior palavra da língua portuguesa
palavra = 'pneumoultramicroscopicossilicovulcanoconiótico'
print(palavra)


```
- Comentário com docstring

```py
"""
Comentário para indicar que a variável palavra refere-se a um valor vinculado à maior palavra da língua portuguesa
As docstrings são utilizadas para comentários mais longos e para documentar melhor o código 
"""

palavra = 'pneumoultramicroscopicossilicovulcanoconiótico'
print(palavra)


```

### Operadores de atribuição ⚙️

Além do `=`, também temos mais dois operadores de atribuição `+=` e `-=` 

```py
mais_igual = 99 
mais_igual += 1
print(mais_igual)
menos_igual = 100
menos_igual -= 1 
print(menos_igual)
```
A expressão `mais_igual += 1` é uma versão sintética da expressão `mais_igual = mais_igual + 1`
- Não confundir valor de atribuição `=` com o operador de igualdade `==` 

### Palavras reservadas ⚠️


||||||
|---|---|---|---|---|
| and | del | from | None | True | 
| as | elif | global | nonlocal | try
| assert | else | if not | while
| break | except | import | or |  with
| class | False | in | pass | yield
| continue | finally | is | raise
| def | for | lambda | return

### Números 🔢

Há três tipos de dados básicos numéricos: 

|Tipo|Significado|Uso|
|---|---|---|
|`int`|Número inteiro|São números positivos e negativos; não têm casas decimais|
|`float`|Número decimal|São números de ponto flutuante, positivos ou negativos; podem conter 1 ou mais casas decimais|
|`complex`|Números complexos|São números em que a parte imaginária é representada pelo `j`|

- A função *built-in* `print()` imprime na tela determinado valor. Já `type()` indica o tipo de dado do valor.
 

```py
numero_inteiro = 10
numero_decimal = 10.10
numero_complexo = 10j 
print(numero_inteiro, type(numero_inteiro))
print(numero_decimal, type(numero_decimal))
print(numero_complexo, type(numero_complexo)) 
```
- Sempre o resultado de uma divisão de números inteiros será um `float`
- Uma operação entre um `int` e um `float` sempre resultará em um `float` 


----------------------------------------------------

##### Valores e Tipos

- Valores
    - Atribuímos valores para as variáveis \(como n sendo igual a 1, no exemplo abaixo\)
    - Valores aparecerão na tela através do comando **print**
```py
n = 3
print(1+n)
```
- Tipos
    - "Classes" dos valores 
    - Definem o que o valor representa, ex.: 2 é representado por **int** , um número **int**eiro
```py
type(2)
<class 'int'>
```
##### Atribuições

Criamos variáveis que necessitam de certo valor
```py
message = olá
n = 13
```
- Os nomes das variáveis não podem começar com números, conter caracteres especiais \(@, #, !\) ou ser uma palavra-chave do Python 
```py 
a = 12bola #Erro de síntaxe
b = @trevo #Erro de síntaxe
c = True #Erro de síntaxe
```
##### Expressões

- Atribuição de valores e requisição das igualdades 
```py
n = 2
5 + n
7
```
- Instrução
    - "instrui" o Python a executar o comando \(ex.: print\)
```py
print(olá, mundo!)
olá, mundo!
```
- Expressões não aparecem diretamente na tela, é necessário executar o comando **print** para acompanhar o processo

##### Operações com *Strings* 🔤

- São possíveis de serem executadas utilizando \+ e\* 
```py
'mãe'
'pai'
'mãe' + 'pai' 
mãepai
``` 
- Para operações com \* , é necessário o uso de um número
```py
'pão'
'pão' * 3
pãopãopão
```


### Material de Apoio 📚

- [Tipos de dados em Python: Numéricos](https://www.devmedia.com.br/tipos-de-dados-em-python-numericos/40652)