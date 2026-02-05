---
id: combinando-dataframes
title: Combinando Dataframes
sidebar_label: Combinando Dataframes
---

Para unirmos DataFrames podemos usar o `concat`, `join`,`merge`,`append`

|Função|Une linhas|Une colunas|
|---|---|---|
|concat| sim| sim|
|join  | não| sim|
|merge | não| sim|
|append| sim| não|

## `Concat` - Estrutura geral

```
variavel = pd.concat([df_01,df_02])
```

## `Concat` - Parâmetros

|Parâmetro|Opções|Explicação|
|---|---|---|
|`ignore_index`| `True` ou `False`| |
|`axis` | `0` ou `1`| |
|`keys` | | |
|`sort`| `True` ou `False`| ordena em ordem alfabética as colunas do DataFrame|
|`sort_values`| `df.sort_values("coluna")` | ordenação por coluna específica |
|`customizar_ordenação`| `df[lista_de_colunas]`| customiza a ordem das colunas |

-falar sobre `verify_integrity`
```
variavel = pd.concat([df_01,df_02],ignore_index=True)
```

## Operações de Conjunto

|Operação|Método|
|---|---|
|união| `concat()` + `drop_duplicates()`|
|intersecção| `merge()`|
|diferença| `isin()` + indexação booleana|
|mesmo conteúdo|`equals()`|

```
df_união=pd.concat([dataframe_01,dataframe_02], ignore_index=True)
df_união.drop_duplicates()
```

```
df_intersecção=dataframe_01.merge(dataframe_02)
df_intersecção.drop_duplicates()
```

```
dataframe_02[dataframe_02.paises.isin(dataframe_01.paises)==False]
```

```
dataframe_01.equals(dataframe_03)
```

## Junção
O join e o merge realizam a junção de DataFrames. Temos três tipos de junções:

- junção natural: pode deixar o DataFrame mais largo e gera um DataFrame a partir da intersecção;
- junção interna (inner join): utiliza `left_on` e `right_on`;
- junção externa: left join, right join, full join (outer).

Em todas as junções os dados da intersecção dos DataFrames estarão presentes.
- No `inner join` apenas a intersecção estará presente.
- No `left join` além da intersecção os dados do DataFrame indicados a esquerda estarão presentes.
- No `right join` além da intersecção os dados do DataFrame indicados a direita estarão presentes.
- No `full join` além da intersecção, todos os dados da esquerda e da direita no DataFrame estarão presente.

## Operadores de comparação

|Operador|Significado|
|---|---|
|`==`| igual a|
|`!=`| diferente|
|`>`| maior do que|
|`>=`| maior ou igual a|
|`<`| menor do que|
|`<=`| menor ou igual a|

## Operadores lógicos

|Operador|Significado|
|---|---|
|`&`| AND (retona True se todas as condições forem verdadeiras)|
|`|`| OR (retorna True se ao menos uma das condições forem verdadeiras)|
|`!`| NOT (retona True se a condição for False)|