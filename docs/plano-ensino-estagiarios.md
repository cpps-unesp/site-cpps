# Plano para a area de ensino do CPPS

Este documento propoe um plano para transformar a pagina `/pt/wiki/projetos/ensino` em um hub robusto de formacao, colaboracao e preparacao de cursos. A ideia central e organizar uma base comum de aprendizagem, trilhas aplicadas por area e caminhos de entrada para estudantes colaborarem com projetos reais do CPPS.

O plano tambem considera que parte dos materiais da wiki sera usada como base para cursos no Open edX, em uma instalacao mantida com Tutor.

## 1. Visao geral

A area de ensino deve funcionar como uma porta de entrada para estudantes, estagiarios, bolsistas, docentes e colaboradores. Ela nao deve ser apenas um arquivo de materiais soltos. Ela deve explicar como uma pessoa aprende, pratica, contribui e, com o tempo, passa a atuar em projetos de dados, engenharia de dados, ciencia de dados, DevOps, desenvolvimento e documentacao.

Frase guia:

> O estudante pode comecar contribuindo em poucas semanas, participar de projetos em alguns meses e construir autonomia tecnica ao longo de um ano.

## 2. Objetivos

- Criar uma pagina de ensino clara, robusta e expansivel.
- Corrigir o desalinhamento atual da pagina de ensino, que hoje aponta para projetos de dados.
- Organizar materiais em uma base comum reutilizavel.
- Criar exemplos aplicados a Relacoes Internacionais, Direito, Historia e Servico Social.
- Definir caminhos curto, medio e longo para colaboracao de estudantes.
- Conectar a wiki aos futuros cursos no Open edX.
- Reaproveitar a secao `/editar-site` como modulo inicial de contribuicao, evitando duplicacao de conteudo.
- Permitir que estagiarios aprendam enquanto ajudam a construir, revisar e documentar os materiais.
- Estabelecer um fluxo de contribuicao baseado em issues, pull requests e revisao.

## 3. Principios pedagogicos

1. Aprender fazendo.
   Cada modulo deve ter exemplos praticos e pequenas tarefas.

2. Reutilizar antes de duplicar.
   A base comum deve servir para varias areas e cursos.

3. Conectar conteudo a projetos reais.
   O estudante deve entender como uma aula se transforma em uma tarefa concreta.

4. Documentar o processo.
   Toda contribuicao deve melhorar a memoria institucional do CPPS.

5. Graduar a complexidade.
   A entrada deve ser simples, mas o caminho deve permitir crescimento tecnico.

6. Separar wiki e curso formal.
   A wiki e a fonte aberta e viva. O Open edX organiza percursos, avaliacao, tutoria e certificacao.

## 4. Arquitetura proposta da area de ensino

Estrutura conceitual:

```text
Ensino
├── Primeira contribuicao
│   ├── Guias de edicao do site
│   ├── Markdown e MDX
│   ├── Criacao de arquivos
│   ├── Pull request e preview
│   └── Resolucao de problemas
│
├── Base comum
│   ├── Ambiente de trabalho
│   ├── Git, GitHub e colaboracao
│   ├── Markdown e documentacao
│   ├── Python
│   ├── Coleta de dados
│   ├── Organizacao e limpeza de dados
│   ├── Pandas e analise exploratoria
│   ├── Visualizacao
│   ├── Bancos de dados
│   └── Etica, privacidade e reprodutibilidade
│
├── Aplicacoes por area
│   ├── Relacoes Internacionais
│   ├── Direito
│   ├── Historia
│   └── Servico Social
│
├── Trilhas de colaboracao
│   ├── Projetos de dados
│   ├── Engenharia de dados
│   ├── Ciencia de dados
│   ├── DevOps e infraestrutura
│   ├── Desenvolvimento
│   └── Documentacao tecnica
│
├── Projetos guiados
│   ├── Coletar e analisar notas diplomaticas
│   ├── Mapear decisoes judiciais
│   ├── Construir base documental historica
│   └── Analisar indicadores sociais
│
└── Cursos Open edX
    ├── Cursos em preparacao
    ├── Cursos publicados
    └── Como a wiki vira curso
```

A parte de "Primeira contribuicao" nao precisa duplicar conteudo. Ela deve apontar para os guias ja existentes em `src/content/editarSite/`, que ensinam como editar o site, escrever em Markdown/MDX, criar arquivos, abrir pull requests e previsualizar alteracoes.

## 5. Estrutura sugerida no repositorio

Esta estrutura pode ser criada gradualmente dentro de `src/content/atividades/projetos/ensino/`:

```text
src/content/atividades/projetos/ensino/
├── index.mdx
├── primeira-contribuicao.mdx
├── base-comum/
│   ├── index.mdx
│   ├── ambiente.mdx
│   ├── git-github.mdx
│   ├── markdown-documentacao.mdx
│   ├── python.mdx
│   ├── coleta-dados.mdx
│   ├── analise-dados.mdx
│   ├── visualizacao.mdx
│   ├── bancos-dados.mdx
│   └── etica-reprodutibilidade.mdx
├── aplicacoes/
│   ├── index.mdx
│   ├── relacoes-internacionais.mdx
│   ├── direito.mdx
│   ├── historia.mdx
│   └── servico-social.mdx
├── colaboracao/
│   ├── index.mdx
│   ├── projetos-dados.mdx
│   ├── engenharia-dados.mdx
│   ├── ciencia-dados.mdx
│   ├── devops.mdx
│   ├── desenvolvimento.mdx
│   └── documentacao.mdx
├── projetos-guiados/
│   ├── index.mdx
│   ├── notas-diplomaticas.mdx
│   ├── decisoes-judiciais.mdx
│   ├── corpus-historico.mdx
│   └── indicadores-sociais.mdx
└── open-edx/
    ├── index.mdx
    ├── mapa-cursos.mdx
    └── guia-conversao-wiki-curso.mdx
```

Observacao: `primeira-contribuicao.mdx` deve ser uma pagina ponte. Ela deve explicar a importancia da primeira contribuicao e encaminhar para `/pt/editar-site/...`, onde os guias ja estao mantidos.

## 6. Pagina principal de ensino

A pagina `/pt/wiki/projetos/ensino` deve ser um hub. Ela deve responder rapidamente:

- O que e a area de ensino do CPPS?
- Por onde o estudante deve comecar?
- Quais trilhas existem?
- Como os materiais se conectam a cursos no Open edX?
- Como estudantes podem colaborar com projetos reais?
- Quais caminhos existem para quem tem pouco, medio ou longo tempo?

Secoes recomendadas:

1. Apresentacao.
2. Comece por aqui.
3. Primeira contribuicao.
4. Base comum.
5. Aplicacoes por area.
6. Horizontes de colaboracao.
7. Trilhas de colaboracao tecnica.
8. Projetos guiados.
9. Cursos Open edX.
10. Como contribuir.

## 7. Primeira contribuicao e guias de edicao

Antes de entrar em dados, desenvolvimento ou infraestrutura, todo estudante deve conseguir fazer uma contribuicao simples no site ou na wiki. Isso cria familiaridade com Markdown, estrutura de arquivos, revisao, preview, pull request e CI.

A secao `src/content/editarSite/` ja oferece uma base muito boa para esse modulo inicial. Ela deve ser tratada como material obrigatorio de entrada para estagiarios e novos colaboradores.

### 7.1 Guias existentes que devem ser reaproveitados

| Guia | Arquivo | Uso no plano de ensino |
| --- | --- | --- |
| Inicio rapido | `src/content/editarSite/00-inicio-rapido.mdx` | Primeira visao do fluxo de contribuicao, noticia, publicacao, PR e preview |
| Markdown e MDX | `src/content/editarSite/01-markdown-basico.mdx` | Base de escrita para wiki, documentacao, materiais didaticos e paginas de projeto |
| Criar arquivos | `src/content/editarSite/02-criar-arquivo.mdx` | Organizacao de pastas, colecoes, sidebar e frontmatter |
| Escrever | `src/content/editarSite/03-escrever.mdx` | Uso de componentes MDX como `Notice`, `CardGrid`, `LinkCard` e `Steps` |
| Previsualizar alteracoes | `src/content/editarSite/previsualizar-alteracoes.mdx` | Branch, PR, Codespaces, preview automatico e revisao |
| Resolucao de problemas | `src/content/editarSite/troubleshooting.mdx` | Erros comuns de build, YAML, imagens, CI e componentes MDX |

### 7.2 Como isso entra na formacao

Esse modulo deve ser o "Modulo 0" dos estagiarios:

```text
Modulo 0: Como contribuir com o site e a wiki
├── Ler o inicio rapido
├── Editar uma pagina simples em Markdown/MDX
├── Criar ou ajustar um arquivo de conteudo
├── Abrir um pull request
├── Conferir o preview
└── Resolver ou documentar um problema encontrado
```

Entrega minima:

- uma correcao pequena em pagina existente;
- ou um exemplo simples adicionado a uma pagina didatica;
- ou uma issue bem descrita apontando problema, lacuna ou melhoria.

### 7.3 O que nao duplicar

Nao e recomendavel copiar os guias de `/editar-site` para dentro de `/ensino`. A pagina de ensino deve apenas explicar por que esses guias fazem parte da formacao e apontar para eles. Assim, a manutencao fica em um so lugar.

## 8. Base comum

A base comum reune competencias que servem para qualquer area. Ela deve ser usada tanto por estudantes de Relacoes Internacionais quanto de Direito, Historia, Servico Social e areas proximas.

### 8.1 Modulos da base comum

| Modulo | Objetivo | Entrega minima |
| --- | --- | --- |
| Como contribuir com o site e a wiki | Entender Markdown, MDX, arquivos, PR, preview e revisao | Primeira contribuicao via `/editar-site` |
| Ambiente de trabalho | Preparar computador, editor, terminal e pastas | Ambiente funcional documentado |
| Git e GitHub | Versionar arquivos e colaborar | Primeiro pull request |
| Markdown | Escrever documentos claros e reutilizaveis | Pagina de documentacao |
| Python basico | Automatizar tarefas simples | Script pequeno |
| Coleta de dados | Obter dados de paginas, APIs ou arquivos | Coleta reproduzivel |
| Limpeza de dados | Padronizar, validar e organizar bases | CSV/JSON limpo |
| Pandas | Explorar e transformar tabelas | Notebook ou script de analise |
| Visualizacao | Comunicar padroes e resultados | Grafico com interpretacao |
| Banco de dados | Guardar e consultar dados estruturados | Tabela consultavel |
| Etica e reprodutibilidade | Proteger dados e documentar metodos | README metodologico |

### 8.2 Padrao de aula

Cada pagina didatica deve seguir um padrao simples:

```md
## Objetivo

O que a pessoa deve conseguir fazer ao final.

## Pre-requisitos

Conhecimentos ou ferramentas necessarias.

## Conceitos principais

Explicacao curta dos termos e ideias.

## Exemplo guiado

Um exemplo que a pessoa consegue reproduzir.

## Exercicios

Tarefas pequenas, graduais e verificaveis.

## Aplicacao em projetos do CPPS

Onde isso aparece em projetos reais.

## Para aprofundar

Links, leituras e proximos materiais.

## Proximo passo

Pagina ou modulo seguinte.
```

## 9. Aplicacoes por area

As aplicacoes por area devem reaproveitar a base comum, mas trocar o problema, as fontes e a interpretacao.

| Area | Fontes possiveis | Perguntas de exemplo | Produtos possiveis |
| --- | --- | --- | --- |
| Relacoes Internacionais | notas do MRE, tratados, discursos, votacoes ONU, comercio exterior | Como mudam os temas da politica externa? Quais paises aparecem com mais frequencia? | Corpus, graficos, analise temporal |
| Direito | legislacao, jurisprudencia, diarios oficiais, decisoes judiciais | Como decisoes tratam determinado direito? Que padroes aparecem em acordaos? | Base de decisoes, classificacao, relatorio |
| Historia | jornais digitalizados, arquivos, correspondencias, atas, periodicos | Como um conceito aparece ao longo do tempo? Como construir um corpus documental? | Base documental, OCR revisado, linha do tempo |
| Servico Social | CadUnico, SUAS, IBGE, IPEA, dados municipais, politicas publicas | Como indicadores sociais variam por territorio? Como avaliar cobertura de servicos? | Mapas, indicadores, diagnostico territorial |

## 10. Trilhas de colaboracao tecnica

As trilhas de colaboracao explicam como a aprendizagem se conecta ao trabalho real.

| Trilha | O estudante aprende a fazer | Exemplos de contribuicao |
| --- | --- | --- |
| Projetos de dados | localizar, organizar, descrever e validar fontes | revisar bases, documentar variaveis, melhorar metadados |
| Engenharia de dados | estruturar coleta, transformacao e armazenamento | scripts, pipelines, validacoes, exports CSV/JSON/SQL |
| Ciencia de dados | analisar, modelar e comunicar resultados | notebooks, graficos, relatorios, analise exploratoria |
| DevOps | manter ambiente, deploy, automacao e CI | Docker, GitHub Actions, Tutor, Open edX, monitoramento |
| Desenvolvimento | criar interfaces e ferramentas internas | paginas, dashboards, APIs, componentes do site |
| Documentacao | transformar processo em material reutilizavel | tutoriais, guias, padroes, documentacao de projeto |

## 11. Horizontes de tempo

Nem todas as pessoas chegam com a mesma disponibilidade. A area de ensino deve apresentar tres caminhos.

### 11.1 Caminho curto: 2 a 4 semanas

Objetivo: fazer uma primeira contribuicao supervisionada.

Perfil:

- Estudante iniciante.
- Pessoa em voluntariado curto.
- Estagiario em ambientacao.
- Participante de oficina ou minicurso.

Roteiro sugerido:

```text
Semana 1: guias de /editar-site, Markdown, MDX, PR e preview
Semana 2: leitura de documentacao, dados simples e tarefa pequena
Semana 3: contribuicao em pagina, base ou script existente
Semana 4: revisao, pull request e registro do aprendizado
```

Entregas possiveis:

- corrigir uma pagina da wiki;
- revisar links;
- melhorar exemplos;
- limpar uma pequena tabela;
- validar metadados;
- rodar um script existente;
- abrir uma issue bem descrita;
- fazer um pull request simples.

### 11.2 Caminho medio: 2 a 4 meses

Objetivo: participar de um projeto com entregas regulares.

Perfil:

- Estagiario com carga horaria semanal.
- Bolsista em inicio de projeto.
- Estudante interessado em aprender dados aplicados.

Roteiro sugerido:

```text
Mes 1: modulo 0 de contribuicao e base comum
Mes 2: aplicacao por area
Mes 3: projeto guiado
Mes 4: contribuicao em projeto real
```

Entregas possiveis:

- notebook de analise exploratoria;
- script de coleta ou limpeza;
- documentacao de base de dados;
- painel simples;
- relatorio tecnico curto;
- pacote de dados organizado;
- contribuicao recorrente em repositorio.

### 11.3 Caminho longo: 6 a 12 meses

Objetivo: construir autonomia tecnica e apoiar novas pessoas.

Perfil:

- Bolsista de iniciacao cientifica.
- Estagiario de longa duracao.
- Monitor de curso.
- Integrante de equipe tecnica.

Roteiro sugerido:

```text
Meses 1-2: contribuicao no site, base comum solida e primeiros PRs
Meses 3-4: trilha aplicada e projeto guiado
Meses 5-6: colaboracao regular em projeto real
Meses 7-9: especializacao tecnica
Meses 10-12: autonomia, documentacao e mentoria
```

Entregas possiveis:

- pipeline de dados com documentacao;
- modulo de curso no Open edX;
- melhoria em infraestrutura Tutor/Open edX;
- dashboard ou interface de consulta;
- metodologia documentada;
- pacote de treinamento para novos estudantes;
- orientacao inicial de outro estudante.

## 12. Papel dos estagiarios

Os estagiarios podem atuar em duas frentes ao mesmo tempo:

1. Aprender seguindo os materiais.
2. Melhorar os proprios materiais enquanto aprendem.

Isso cria um ciclo virtuoso:

```text
Estuda uma pagina
→ executa o exemplo
→ encontra duvida ou erro
→ registra issue
→ corrige ou melhora o material
→ abre pull request
→ recebe revisao
→ documenta o aprendizado
```

### 12.1 Atividades iniciais dos estagiarios

- Fazer leitura guiada da pagina principal de ensino.
- Ler os guias de `/editar-site`: inicio rapido, Markdown/MDX, criar arquivos, escrever, preview e troubleshooting.
- Preparar ambiente de trabalho.
- Criar ou revisar perfil no GitHub.
- Fazer primeira edicao pequena em Markdown.
- Abrir um pull request simples.
- Conferir o preview automatico.
- Rodar o projeto localmente.
- Conferir se links e exemplos funcionam.
- Abrir issue para lacunas encontradas.
- Propor exercicios simples para paginas existentes.

### 12.2 Atividades intermediarias

- Revisar uma trilha completa.
- Padronizar paginas conforme o modelo didatico.
- Criar exemplos aplicados por area.
- Produzir pequenos datasets didaticos.
- Transformar uma pagina da wiki em roteiro de aula.
- Documentar um processo de projeto real.
- Melhorar os proprios guias de `/editar-site` quando encontrarem lacunas na experiencia de contribuicao.
- Apoiar outro estudante em uma tarefa de entrada.

### 12.3 Atividades avancadas

- Criar modulo no Open edX a partir da wiki.
- Automatizar validacoes de dados.
- Criar pipelines de coleta e limpeza.
- Melhorar infraestrutura de deploy, CI ou Tutor.
- Produzir dashboards e relatorios.
- Manter documentacao de projeto.
- Organizar backlog de tarefas para novos estudantes.
- Criar ou revisar materiais de onboarding para novas turmas de estagiarios.

## 13. Relacao entre wiki, Open edX e projetos reais

| Espaco | Funcao | Caracteristicas |
| --- | --- | --- |
| Editar site | Onboarding de contribuicao | Markdown, MDX, criacao de arquivos, PR, preview e troubleshooting |
| Wiki | Fonte aberta e viva | Conteudo editavel, documentacao, exemplos, memoria institucional |
| Open edX | Curso estruturado | Unidades, avaliacoes, certificado, tutoria, ritmo de aprendizagem |
| Projetos reais | Aplicacao e colaboracao | Issues, PRs, dados reais, infraestrutura, entregas tecnicas |

Mapeamento sugerido:

| Wiki | Open edX |
| --- | --- |
| Pasta de trilha | Course ou subsection |
| Pagina MDX | Unit |
| Exemplo guiado | Texto, video ou notebook |
| Exercicio | Problem |
| Projeto guiado | Assignment |
| Discussao | Forum |
| Certificacao | Course certificate |

## 14. Cursos Open edX iniciais

Cursos que podem ser preparados a partir dos materiais existentes:

| Curso | Base na wiki | Estado sugerido |
| --- | --- | --- |
| Introducao a programacao com Python | Formacao em Dados / Fundamentos de Python | Em construcao |
| Coleta de dados com Python | Formacao em Dados / Coleta de dados | Em construcao |
| Analise de dados com Pandas | Formacao em Dados / Analise de dados | Em construcao |
| Tecnologias digitais para pesquisa | Tecnologias digitais | Planejado |
| Como contribuir com a wiki do CPPS | `/editar-site` + base comum | Planejado |
| GitHub e documentacao para projetos | `/editar-site` + base comum / Git e Markdown | Planejado |
| Dados aplicados a Relacoes Internacionais | Aplicacoes / RI | Planejado |
| Dados aplicados a Direito | Aplicacoes / Direito | Planejado |
| Dados aplicados a Historia | Aplicacoes / Historia | Planejado |
| Dados aplicados a Servico Social | Aplicacoes / Servico Social | Planejado |

## 15. Projetos guiados recomendados

### 15.1 Relacoes Internacionais

Projeto: coletar e analisar notas diplomaticas.

Competencias:

- scraping;
- limpeza de texto;
- estruturacao em CSV/JSON;
- analise temporal;
- visualizacao;
- interpretacao de temas.

### 15.2 Direito

Projeto: organizar e analisar decisoes judiciais.

Competencias:

- coleta de documentos;
- normalizacao de metadados;
- classificacao tematica;
- cuidado com fonte e citacao;
- analise textual.

### 15.3 Historia

Projeto: construir corpus documental historico.

Competencias:

- organizacao de acervo;
- OCR;
- revisao de texto;
- metadados;
- linha do tempo;
- preservacao e documentacao.

### 15.4 Servico Social

Projeto: analisar indicadores sociais por territorio.

Competencias:

- download de dados publicos;
- limpeza de tabelas;
- cruzamento por municipio ou regiao;
- indicadores;
- mapas e graficos;
- relatorio de diagnostico.

## 16. Fluxo de trabalho para contribuicao

Fluxo recomendado para estudantes e estagiarios:

```text
1. Ler a pagina de ensino
2. Seguir os guias de /editar-site
3. Fazer uma primeira alteracao pequena
4. Abrir pull request e conferir preview
5. Escolher uma trilha
6. Rodar exemplos
7. Registrar duvidas
8. Escolher uma issue pequena
9. Fazer alteracao local
10. Rodar npm run build quando fizer sentido
11. Receber revisao
12. Ajustar
13. Documentar o aprendizado
```

Tipos de issues:

- `boa-primeira-tarefa`: correcao pequena e bem delimitada.
- `documentacao`: melhoria em texto, exemplos ou explicacoes.
- `exercicio`: criacao ou revisao de atividades.
- `dados`: limpeza, validacao ou documentacao de base.
- `codigo`: script, componente, automacao ou pipeline.
- `open-edx`: transformacao de material em curso.
- `devops`: infraestrutura, CI, Tutor, deploy ou monitoramento.

## 17. Governanca editorial

Para manter a area expansivel, e importante definir padroes minimos.

### 17.1 Toda pagina nova deve ter

- titulo claro;
- objetivo;
- pre-requisitos;
- exemplo reproduzivel;
- exercicio ou tarefa;
- indicacao de proximo passo;
- quando possivel, conexao com projeto real.

### 17.2 Toda trilha deve ter

- publico-alvo;
- carga horaria estimada;
- ordem sugerida;
- lista de modulos;
- projeto final;
- relacao com cursos Open edX;
- formas de colaboracao.

### 17.3 Revisao minima

Antes de publicar ou aceitar uma contribuicao:

- verificar se o texto esta claro;
- testar links;
- testar comandos e exemplos;
- conferir se o conteudo nao duplica desnecessariamente outra pagina;
- conferir se os guias de `/editar-site` continuam coerentes com o fluxo real de contribuicao;
- rodar `npm run build` quando houver alteracao estrutural ou MDX mais complexo.

## 18. Fases de implementacao

### Fase 1: Arrumar a porta de entrada

Prazo sugerido: 1 semana.

Entregas:

- corrigir `src/content/atividades/projetos/ensino/index.mdx`;
- trocar titulo e descricao de "Projetos de Dados" para "Ensino";
- criar secoes de base comum, aplicacoes, colaboracao e Open edX;
- incluir uma secao "Primeira contribuicao" apontando para `/pt/editar-site`;
- apontar para materiais existentes;
- manter links para Formacao em Dados, tecnologias digitais, processamento de imagens e material bibliografico.

### Fase 2: Criar paginas estruturantes

Prazo sugerido: 2 a 3 semanas.

Entregas:

- criar `base-comum/index.mdx`;
- criar `primeira-contribuicao.mdx` como pagina ponte para `/editar-site`;
- criar `aplicacoes/index.mdx`;
- criar `colaboracao/index.mdx`;
- criar `open-edx/index.mdx`;
- criar `projetos-guiados/index.mdx`;
- registrar lacunas como issues.

### Fase 3: Padronizar trilhas existentes

Prazo sugerido: 1 a 2 meses.

Entregas:

- revisar Formacao em Dados;
- revisar os guias de `/editar-site` com olhar de onboarding de estagiarios;
- revisar tecnologias digitais;
- revisar materiais de processamento de imagens;
- adicionar objetivos, exercicios e proximos passos;
- mapear quais paginas podem virar unidades no Open edX.

### Fase 4: Produzir exemplos aplicados por area

Prazo sugerido: 2 a 4 meses.

Entregas:

- criar uma pagina aplicada para Relacoes Internacionais;
- criar uma pagina aplicada para Direito;
- criar uma pagina aplicada para Historia;
- criar uma pagina aplicada para Servico Social;
- produzir pelo menos um projeto guiado por area.

### Fase 5: Preparar cursos Open edX

Prazo sugerido: 3 a 6 meses.

Entregas:

- selecionar primeiro curso piloto;
- converter materiais da wiki em unidades de curso;
- criar exercicios e avaliacoes;
- testar no Tutor;
- definir tutoria, certificacao e acompanhamento;
- coletar feedback dos estudantes.

## 19. Primeiro ciclo de trabalho dos estagiarios

Duracao sugerida: 4 semanas.

### Semana 1: ambientacao

- Ler a pagina de ensino.
- Ler `/pt/editar-site/inicio-rapido`.
- Ler `/pt/editar-site/markdown-basico`.
- Ler `/pt/editar-site/criar-arquivo`.
- Ler `/pt/editar-site/previsualizar-alteracoes`.
- Preparar ambiente local.
- Rodar o site.
- Entender estrutura de `src/content/atividades`.
- Corrigir um erro pequeno de texto ou link e abrir PR.

### Semana 2: primeira contribuicao didatica

- Escolher uma pagina da base comum ou da Formacao em Dados.
- Verificar se objetivo, exemplo e proximo passo estao claros.
- Propor um exercicio simples.
- Abrir PR.
- Conferir preview e responder a revisao.

### Semana 3: exemplo aplicado

- Escolher uma area: RI, Direito, Historia ou Servico Social.
- Levantar uma fonte de dados ou documentos.
- Criar um exemplo pequeno e reproduzivel.
- Documentar limitações da fonte.

### Semana 4: revisao e consolidacao

- Revisar contribuicao com orientador.
- Registrar aprendizados.
- Abrir issue para proximas melhorias.
- Escolher trilha de colaboracao para o proximo ciclo.

## 20. Indicadores de acompanhamento

Indicadores simples para acompanhar a evolucao:

- numero de paginas com padrao didatico completo;
- numero de exercicios adicionados;
- numero de estudantes que fizeram primeira contribuicao;
- numero de estudantes que completaram o modulo `/editar-site`;
- numero de PRs de estagiarios;
- numero de projetos guiados publicados;
- numero de paginas mapeadas para Open edX;
- numero de cursos piloto em preparacao;
- tempo medio ate a primeira contribuicao;
- quantidade de issues boas para iniciantes.

## 21. Riscos e cuidados

| Risco | Cuidado |
| --- | --- |
| A wiki virar um deposito desorganizado | Manter arquitetura e padrao editorial |
| Conteudo duplicado entre wiki e Open edX | Definir wiki como fonte aberta e Open edX como percurso |
| Conteudo duplicado entre ensino e editar-site | Usar `/ensino` como ponte e manter guias operacionais em `/editar-site` |
| Estudantes ficarem perdidos | Criar caminhos curto, medio e longo |
| Excesso de conteudo sem pratica | Exigir exemplos e exercicios |
| Projetos reais serem complexos demais | Criar tarefas pequenas e supervisionadas |
| Infraestrutura Open edX consumir muita energia | Comecar com curso piloto pequeno |
| Falta de continuidade | Documentar processos e formar estudantes que orientam novos estudantes |
| Gargalo na mentoria e revisao de PRs | Alocar tempo especifico de orientadores e bolsistas seniores para revisao e feedback |

## 22. Proximos passos imediatos

1. Aprovar a arquitetura geral.
2. Reescrever `src/content/atividades/projetos/ensino/index.mdx`.
3. Criar `primeira-contribuicao.mdx` apontando para os guias de `/editar-site`.
4. Revisar os guias de `/editar-site` como onboarding oficial de estagiarios.
5. Criar as paginas estruturantes vazias ou semivazias.
6. Mapear os materiais existentes da Formacao em Dados para a base comum.
7. Definir um primeiro curso piloto para Open edX.
8. Criar um quadro de issues para estagiarios.
9. Iniciar o primeiro ciclo de 4 semanas com tarefas pequenas.

## 23. Resultado esperado

Ao final da primeira etapa, a area de ensino deve deixar claro:

- como estudar;
- como escolher uma trilha;
- como aplicar conteudos em areas diferentes;
- como colaborar com projetos reais;
- como evoluir em curto, medio e longo prazo;
- como os materiais da wiki podem virar cursos no Open edX.

O resultado desejado e uma estrutura em que ensino, pesquisa, extensao, dados, desenvolvimento e infraestrutura se alimentem mutuamente. Estudantes aprendem com materiais abertos, melhoram esses materiais, aplicam o aprendizado em projetos e ajudam a formar a proxima turma.
