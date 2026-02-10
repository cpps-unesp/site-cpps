---
id: p07-01-objetos
title: Objetos
sidebar_label: Objetos
---

- [Replit](https://replit.com/@fparon/objetos#main.py)

### Classes e objetos

Podemos pensar uma classe como o "tipo de algo" e a instância como uma "subcategoria desse tipo". Por exemplo, país pode ser considerado um tipo de classe, e o Brasil seria uma instância dessa classe.

- Para prepararmos um bolo, a **classe** seria a receita, e o **objeto** seria o bolo em si.
- Na construção de uma casa, a planta da casa seria **classe**, e a casa em si, **objeto**

- `self`

### Declaração de uma classe

```py

class Pais:
    # atributos e métodos da classe

```

- A palavra reservada `class` aponta a criação de uma classe em Python;
- Após a palavra `class`, indicamos o nome desejado para a classe. Por convenção, o nome da classe deve ser iniciado com letra maiúscula. Caso o nome da classe seja constituído por mais de uma palavra, a letra inical de cada palavra deve ser maiúscula. Ex.: `PaisesAfrica`

### Construtor da classe (instanciar objeto)

Quando criamos algo baseado nos parâmetros definidos em uma classe, dizemos que estamos instanciando um objeto.

Uma classe pode ser entendida como um molde ou um modelo para a criação de um novo tipo de objeto. Ela permite que novas instâncias deste objeto sejam produzidas. Cada objeto instanciado pode ter atributos e métodos.

Uma classe é composta por atributos e métodos.

- Atributos são variáveis internas que definem as características do objeto criado. Os atributos devem ser referenciados no construtor da classe.
- Métodos são funções internas que modificam o estado do objeto. Fornecem funcionalidades a determinado objeto

Para declarar um atributo em uma classe, é necessário utilizar o método especial `__init__()` e a palavra reservada `self`.

- `__init__()` : método responsável por iniciar um objeto. Seu primeiro parâmetro é a própria instância do objeto, que por convenção é chamado de `self`
- A título de curiosidade, o método `__new__()` é o responsável por construir a classe.
- Para manipularmos o objeto criado e acessarmos seus atributos, utilizamos o operador `.`. Por exemplo, `conta.titular`
- Objetos são acessados por referência. Quando criamos uma variável para associar a um objeto, essa variável não guarda o objeto, mas sim apenas uma maneira de acessá-lo. Não é correto dizer que a variável é o objeto, pois ela apenas faz uma referência ao objeto que será criado.

- CONTINUANDO COM ATRIBUTOS - Agregação/Associação
- Composição
  - Quando a existência de uma classe depende de uma outra classe
- Modificadores de acesso (Encapsulamento)

```py

class Pais: # definição do modelo

    def __init__(self, nome, continente, capital, idioma): # função construtora da classe. Responsável por definir as características do tipo de dado (no nosso caso, `Pais`)
        self.nome = nome
        self.continente = continente
        self.capital = capital
        self.idioma = idioma

    def localizacao(self): # criação de um método. Define determinado comportamento ou ação que um objeto pode realizar
        if self.continente:
            print(f'{self.nome} está localizado no {self.continente}')
        else:
            print('Continente não indicado')


    def __str__(self):
      return f'{self.nome} está localizado no continente {self.continente} e tem como capital {self.capital}. O idioma oficial é o {self.idioma}.'



def main(): #
    paises = Pais('Africa do Sul', 'África', 'Joanesburgo', 'Inglês') # criação de um objeto do tipo país que possui os atributos nome, continente, capital e idioma
    print(paises)
    print(f'{paises.nome}, {paises.continente}, {paises.capital},  {paises.idioma}')
    lugar = paises.localizacao()



if __name__ == "__main__":
    main()

```

### Encapsulamento

Encapsulamento diz respeito à proteção do acesso de algumas informações presentes em determinada classe

- Em Python, o encapsulamento é realizado a partir de uma convenção a qual indica que métodos que começam com um underscores `_` não devem (mas podem) ser acessados fora da classe
- `get`: recupera dados
- `set`: altera dados

| Encapsulamento               | Descrição                                                                                          |
| ---------------------------- | -------------------------------------------------------------------------------------------------- |
| `self.atributo` - público    | Pode ser acessada por qualquer lugar                                                               |
| `self.__atributo` - privado  | Atributo/Método não deve ser acessado fora da classe                                               |
| `self._atributo` - protegido | Atributo/Método é público mas não deve ser acessado                                                |
| `@property`                  | Atributo/Método está restrito, sendo assim, o acesso às variáveis funciona apenas dentro da classe |

- https://algoritmosempython.com.br/cursos/programacao-python/encapsulamento/

### Tipos de métodos

- [Replit](https://replit.com/@fparon/objetos#metodos_classe.py)

- `@classmethod`: Método de classe, utiliza por convenção o `cls` como parâmetro de funções
- `@staticmethod`: Métodos estáticos, não recebem as convenções `cls` e `self` como parâmetros da função. Não interage com os atributos.
- `@abstractclassmethod`: Métodos abstratos, servem para proteger os métodos herdados que precisam ser modificados
- Métodos de instância não utilizam decoradores; recebem como parâmetro o `self`

### Herança e polimorfismo

- Herança: receber funcionalidades e características de outra classe

- Polimorfismo: sobrescrever/modificar um método recebido como herança de outra classe

- `self` utilizado sempre que queremos falar do exemplo
- `cls` utilizado sempre que queremos falar com a classe

### Herança múltipla e interfaces
