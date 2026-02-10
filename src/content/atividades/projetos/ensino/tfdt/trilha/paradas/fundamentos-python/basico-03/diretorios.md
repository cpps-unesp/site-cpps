---
id: p05-02-diretorios
title: Trabalhando com Diretórios
sidebar_label: Trabalhando com Diretórios
---

- [Link](https://replit.com/@fparon/diretorio#diretorio.py) do Replit

### Módulo `os`

- O módulo `os` fornece funções para interagirmos com o sistema operacional
- É um módulo nativo do Python (não é uma biblioteca externa)

| Método           | Descrição                                                         | Exemplo                                          |
| ---------------- | ----------------------------------------------------------------- | ------------------------------------------------ |
| `os.mkdir()`     | Cria diretório. Se o diretório criado já existir, retorna um erro | `os.mkdir('caminho')`                            |
| `os.makedirs()`  | Cria diretório. Se o diretório existir, não realiza nenhuma ação  | `os.makedirs('caminho', exist_ok = True)`        |
| `os.getcwd()`    | Obter diretório especificado                                      | `os.getcwd()`                                    |
| `os.listdir()`   | Listar diretório                                                  | `os.listdir('caminho')`                          |
| `os.chdir()`     | Mudar diretório                                                   | `os.chdir('caminho')`                            |
| `os.rename()`    | Renomear diretório ou arquivo                                     | `os.rename('caminho_origem', 'caminho_destino')` |
| `os.rmdir()`     | Remover diretório                                                 | `os.rmdir('caminho')`                            |
| `os.path.join()` | Une os caminhos relativos do diretório                            | `os.path.join('caminho', 'caminho')`             |

### Módulo `pathlib`

- [Replit - pathlib](https://replit.com/@fparon/diretorio#modulo_pathlib.py)
- Utilizar `from pathlib import Path`

| Método                                 | Descrição                                        | Exemplo                                                              |
| -------------------------------------- | ------------------------------------------------ | -------------------------------------------------------------------- |
| `Path('diretorio_a','diretorio_b')`    | Unir diretórios                                  | Ver [Replit](https://replit.com/@fparon/diretorio#modulo_pathlib.py) |
| `Path.home()`                          | Obter diretório absoluto                         | Ver [Replit](https://replit.com/@fparon/diretorio#modulo_pathlib.py) |
| `caminho.parent`                       | Acessar diretórios pai                           | Ver [Replit](https://replit.com/@fparon/diretorio#modulo_pathlib.py) |
| `os.path.basename('caminho')`          | Nome do arquivo                                  | Ver [Replit](https://replit.com/@fparon/diretorio#modulo_pathlib.py) |
| `os.path.dirname('caminho_diretorio')` | Nome do último diretório                         | Ver [Replit](https://replit.com/@fparon/diretorio#modulo_pathlib.py) |
| `os.path.abspath('caminho_relativo')`  | Diretório absoluto através do diretório relativo | Ver [Replit](https://replit.com/@fparon/diretorio#modulo_pathlib.py) |
| `os.path.exists('caminho')`            | Verificar arquivo                                | Ver [Replit](https://replit.com/@fparon/diretorio#modulo_pathlib.py) |

### Módulo `shutil`

- [Replit - shutil](https://replit.com/@fparon/diretorio#modulo_shutil.py)
- Necessário fazer o `import shutil`

| Método                                          | Descrição                          | Exemplo                                                             |
| ----------------------------------------------- | ---------------------------------- | ------------------------------------------------------------------- |
| `shutil.copyfile('caminho_completo')`           | Copiar arquivos no mesmo diretório | Ver [Replit](https://replit.com/@fparon/diretorio#modulo_shutil.py) |
| `shutil.copy('caminho', 'destino')`             | Copiar arquivo em outro diretório  | Ver [Replit](https://replit.com/@fparon/diretorio#modulo_shutil.py) |
| `shutil.copytree('diretorio_a', 'diretorio_b')` | Cópia recursiva no diretório       | Ver [Replit](https://replit.com/@fparon/diretorio#modulo_shutil.py) |
| `shutil.rmtree('caminho_completo')`             | Remover arquivo de subdiretório    | Ver [Replit](https://replit.com/@fparon/diretorio#modulo_shutil.py) |
| `shutil.which('caminho_arquivo')`               | Localizar arquivo                  | Ver [Replit](https://replit.com/@fparon/diretorio#modulo_shutil.py) |
| `shutil.disk_usage('.')`                        | Disco usado                        | Ver [Replit](https://replit.com/@fparon/diretorio#modulo_shutil.py) |
| `shutil.move('caminho_arquivo','destino')`      | Mover diretorio e arquivo          | Ver [Replit](https://replit.com/@fparon/diretorio#modulo_shutil.py) |

### Módulo `sys`

- https://pt.stackoverflow.com/questions/432235/como-funciona-o-m%C3%B3dulo-sys-do-python-e-para-que-ele-serve
- https://www.logicus.com.br/alguns-exemplos-do-modulo-sys-no-python/

### Módulo `datetime`

- [Replit - datetime](https://replit.com/@fparon/diretorio#modulo_datetime.py)
- O módulo `datetime` apresenta 5 classes principais:
  - Data (mês, dia, ano)
  - Hora (hora, minuto, segundo, microssegundo)
  - Datetime - Combinação de hora e data (mês, dia, ano, hora, minuto, segundo, microssegundo)
  - Timedelta - Uma duração de tempo usada para manipular datas
  - TZInfo - Lidar com fuso-horários

| Método                     | Descrição                                                                     | Exemplo                                                               |
| -------------------------- | ----------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| `date.today()`             | Data de hoje                                                                  | Ver [Replit](https://replit.com/@fparon/diretorio#modulo_datetime.py) |
| `datetime.now()`           | Horário                                                                       | Ver [Replit](https://replit.com/@fparon/diretorio#modulo_datetime.py) |
| `date.weekday()`           | Dia da semana (Nº)                                                            | Ver [Replit](https://replit.com/@fparon/diretorio#modulo_datetime.py) |
| `.strftime('%')`           | Formatar                                                                      | Ver [Replit](https://replit.com/@fparon/diretorio#modulo_datetime.py) |
| `.strptime(str, datetime)` | Converte string em datetime                                                   | Ver [Replit](https://replit.com/@fparon/diretorio#modulo_datetime.py) |
| `.astimezone()`            | Ajusta fuso horário com método embutido no Python                             | Ver [Replit](https://replit.com/@fparon/diretorio#modulo_datetime.py) |
| `timezone('regiao')`       | Módulo do pytz que usa os fuso-horários reais de acordo com a região indicada | Ver [Replit](https://replit.com/@fparon/diretorio#modulo_datetime.py) |
| `.sleep(int)`              | Faz uma pausa. Importado do `time`                                            | Ver [Replit](https://replit.com/@fparon/diretorio#modulo_datetime.py) |

- https://www.guru99.com/date-time-and-datetime-classes-in-python.html
- https://towardsdatascience.com/working-with-datetime-in-python-e032b8d2f512
- https://www.youtube.com/watch?v=Hj7cR9jcR6M
- https://www.alura.com.br/artigos/lidando-com-datas-e-horarios-no-python
- https://www.programiz.com/python-programming/datetime/current-time
- https://www.youtube.com/watch?v=FjJ1bClIa-o

| Regex | Descrição                           | Exemplo                       |
| ----- | ----------------------------------- | ----------------------------- |
| `%d`  | Dia do mês em número decimal(01-31) | 22                            |
| `%m`  | Mês em número decimal(01-12)        | 04                            |
| `%Y`  | Ano completo, com 4 dígitos         | 2020, 2021                    |
| `%H`  | Horas (00-23)                       | **13**:23                     |
| `%M`  | Minutos (00-59)                     | 13:**23**                     |
| `%B`  | Mês escrito por extenso             | January, February             |
| `%A`  | Dia da semana escrito por extenso   | Monday, Tuesday               |
| `%C`  | Dia da semana, data e horário       | Wednesday 2021-07-14 15:03:14 |
| `%x`  | Data                                | 2021-07-14                    |
| `%X`  | Horário                             | 15:04:10.123                  |

- `%a`, `%b`, `%y` tem o mesmo comportamento que seus correspondentes em maiúsculas, porém retornam o resultado de forma abreviada

### Material de apoio

- https://www.geeksforgeeks.org/create-an-empty-file-using-python/
- https://www.digitalocean.com/community/tutorials/how-to-use-the-pathlib-module-to-manipulate-filesystem-paths-in-python-3-pt
- http://devfuria.com.br/python/os-path/
- https://linuxhint.com/shutil-module-in-python/
- https://www.alura.com.br/artigos/trabalhando-com-arquivos-e-diretorios-no-python
- https://www.delftstack.com/pt/howto/python/how-to-delete-files-and-directories-in-python/
- [Python: Arquivos e pastas](https://www.phylos.net/2021-03-24/python-arquivos-e-pastas/)
- [Módulo os : Caminhos, Endereços, Pastas e Diretórios](https://www.pythonprogressivo.net/2018/10/Endereco-Caminho-path-Criar-Arquivo-Diretorio-Pasta-modulo-os.html)
- [Converter datatime pt-br](https://gist.github.com/turicas/8832723)
