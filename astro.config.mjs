
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import pagefind from "astro-pagefind";
import starlight from "@astrojs/starlight";
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: "https://cpps-unesp.github.io",
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    starlight({
      title: 'Documentação CPPS',
      sidebar: [
        {
          label: "Documentação",
          items: [
            {
              label: "Introdução",
              slug: "docs", 
            },
          ],
        },

        {
          label: "Projetos",
          items: [
            {
              label: "Introdução",
              slug: "docs/projetos", 
            },
            // --- DADOS ---
            {
              label: "Dados",
              items: [
                {
                  label: "Visão geral",
                  slug: "docs/projetos/dados",
                },
                // --- HEMEROTECA PEB ---
                {
                  label: "Hemeroteca PEB",
                  items: [
                    {
                      label: "Apresentação",
                      slug: "docs/projetos/dados/hemeroteca-peb",
                    },
                    {
                      label: "Equipe",
                      slug: "docs/projetos/dados/hemeroteca-peb/equipe",
                    },
                    {
                      label: "Atividades Realizadas",
                      slug: "docs/projetos/dados/hemeroteca-peb/atividades",
                    },
                    {
                      label: "Documentação",
                      items: [
                        {
                          label: "Introdução",
                          slug: "docs/projetos/dados/hemeroteca-peb/documentacao/introducao",
                        },
                        {
                          label: "Arquivo JSON",
                          slug: "docs/projetos/dados/hemeroteca-peb/documentacao/arquivo-json",
                        },
                        {
                          label: "Temas",
                          slug: "docs/projetos/dados/hemeroteca-peb/documentacao/temas",
                        },
                      ],
                    },
                    {
                      label: "Como citar Hemeroteca PEB",
                      slug: "docs/projetos/dados/hemeroteca-peb/como-citar",
                    },
                  ],
                },
                // --- NEWSCLOUD ---
                {
                  label: "NewsCloud",
                  items: [
                    {
                      label: "Apresentação",
                      slug: "docs/projetos/dados/newscloud",
                    },
                    {
                      label: "Equipe",
                      slug: "docs/projetos/dados/newscloud/equipe",
                    },
                    {
                      label: "Atividades Realizadas",
                      slug: "docs/projetos/dados/newscloud/atividades",
                    },
                    {
                      label: "Informações de Coleta",
                      slug: "docs/projetos/dados/newscloud/informacoes",
                    },
                    {
                      label: "Documentação",
                      items: [
                        {
                          label: "Introdução",
                          slug: "docs/projetos/dados/newscloud/documentacao/introducao",
                        },
                        {
                          label: "Elementos do Banco de Dados",
                          slug: "docs/projetos/dados/newscloud/documentacao/elementos-bd",
                        },
                        {
                          label: "Elementos Peru",
                          slug: "docs/projetos/dados/newscloud/documentacao/elementos-peru",
                        },
                        {
                          label: "Elementos Equador",
                          slug: "docs/projetos/dados/newscloud/documentacao/equador",
                        },
                        {
                          label: "Elementos Colômbia",
                          slug: "docs/projetos/dados/newscloud/documentacao/colombia",
                        },
                        {
                          label: "Elementos Brasil",
                          slug: "docs/projetos/dados/newscloud/documentacao/brasil",
                        },
                        {
                          label: "Fluxograma",
                          slug: "docs/projetos/dados/newscloud/documentacao/fluxograma",
                        },
                      ],
                    },
                    {
                      label: "Como citar",
                      slug: "docs/projetos/dados/newscloud/como-citar",
                    },
                  ],
                },
                 // --- DIÁRIOS BR ---
                {
                  label: "DiáriosBR",
                  items: [
                    {
                      label: "Apresentação",
                      slug: "docs/projetos/dados/diariosbr",
                    },
                    {
                      label: "Equipe",
                      slug: "docs/projetos/dados/diariosbr/equipe",
                    },
                    {
                      label: "Atividades Realizadas",
                      slug: "docs/projetos/dados/diariosbr/atividades",
                    },
                    {
                      label: "Documentação",
                      items: [
                        {
                          label: "Introdução",
                          slug: "docs/projetos/dados/diariosbr/documentacao/introducao",
                        },
                        {
                          label: "Dados e Metadados",
                          slug: "docs/projetos/dados/diariosbr/documentacao/dados",
                        },
                        {
                          label: "Localização e Conteúdo",
                          slug: "docs/projetos/dados/diariosbr/documentacao/localizacao",
                        },
                        {
                          label: "Banco de Termos",
                          slug: "docs/projetos/dados/diariosbr/documentacao/banco",
                        },
                        {
                          label: "Fluxograma",
                          slug: "docs/projetos/dados/diariosbr/documentacao/fluxograma",
                        },
                        
                      ],
                    },
                    {
                      label: "Como citar",
                      slug: "docs/projetos/dados/diariosbr/como-citar",
                    },
                  ],
                },
                // --- FULLTEXT ---
                {
                  label: "FullText",
                  items: [
                    {
                      label: "Apresentação",
                      slug: "docs/projetos/dados/fulltext",
                    },
                    {
                      label: "Equipe",
                      slug: "docs/projetos/dados/fulltext/equipe",
                    },
                    {
                      label: "Atividades Realizadas",
                      slug: "docs/projetos/dados/fulltext/atividades",
                    },
                    {
                      label: "Identidade Visual",
                      slug: "docs/projetos/dados/fulltext/identidade-visual",
                    },
                    {
                      label: "Como citar",
                      slug: "docs/projetos/dados/fulltext/citar",
                    },
                  ],
                },
                // --- MERCODOCS ---
                {
                  label: "Mercodocs",
                  items: [
                    {
                      label: "Apresentação",
                      slug: "docs/projetos/dados/mercodocs",
                    },
                    {
                      label: "Equipe",
                      slug: "docs/projetos/dados/mercodocs/equipe",
                    },
                    {
                      label: "Atividades Realizadas",
                      slug: "docs/projetos/dados/mercodocs/atividades",
                    },
                    {
                      label: "Documentação",
                      slug: "docs/projetos/dados/mercodocs/documentacao",
                    },
                    {
                      label: "Como citar",
                      slug: "docs/projetos/dados/mercodocs/como-citar",
                    },
                  ],
                },
                {
                  label: "TweePiNa",
                  items: [
                    {
                      label: "Apresentação",
                      slug: "docs/projetos/dados/tweeplanta",
                    },
                    {
                      label: "Equipe",
                      slug: "docs/projetos/dados/tweeplanta/equipe",
                    },
                    {
                      label: "Atividades Realizadas",
                      slug: "docs/projetos/dados/tweeplanta/atividades",
                    },
                    {
                      label: "Documentação",
                      collapsed: false,
                      items: [
                        {
                          label: "Introdução",
                          slug: "docs/projetos/dados/tweeplanta/infos/intro",
                        },
                        {
                          label: "Script com Caminhos Absolutos",
                          slug: "docs/projetos/dados/tweeplanta/infos/script",
                        },
                        {
                          label: "Variáveis",
                          slug: "docs/projetos/dados/tweeplanta/infos/variaveis",
                        },
                        {
                          label: "Fluxograma",
                          slug: "docs/projetos/dados/tweeplanta/infos/fluxograma",
                        },
                        {
                          label: "Identificação de Status",
                          slug: "docs/projetos/dados/tweeplanta/infos/identificacao",
                        },
                        {
                          label: "Projetos Semelhantes",
                          slug: "docs/projetos/dados/tweeplanta/infos/projetos",
                        },
                        {
                          label: "Bibliotecas",
                          slug: "docs/projetos/dados/tweeplanta/infos/biblioteca",
                        },
                      ],
                    },
                    {
                      label: "Identidade Visual",
                      slug: "docs/projetos/dados/tweeplanta/identidade-visual",
                    },
                    {
                      label: "Como citar",
                      slug: "docs/projetos/dados/tweeplanta/citar",
                    },
                  ],
                },
                {
                  label: "Acervo Rodalint",
                  items: [
                    {
                      label: "Apresentação",
                      slug: "docs/projetos/dados/acervorodalint",
                    },
                    {
                      label: "Equipe",
                      slug: "docs/projetos/dados/acervorodalint/equipe",
                    },
                    {
                      label: "Atividades Realizadas",
                      slug: "docs/projetos/dados/acervorodalint/atividades",
                    },
                    {
                      label: "Documentação",
                      slug: "docs/projetos/dados/acervorodalint/documentacao",
                    },
                    {
                      label: "Como citar",
                      slug: "docs/projetos/dados/acervorodalint/citar",
                    },
                  ],
                },
                {
                  label: "IRJournalsBR",
                  items: [
                    {
                      label: "Apresentação",
                      slug: "docs/projetos/dados/irjournals",
                    },
                    {
                      label: "Equipe",
                      slug: "docs/projetos/dados/irjournals/equipe",
                    },
                    {
                      label: "Atividades Realizadas",
                      slug: "docs/projetos/dados/irjournals/atividades",
                    },
                    {
                      label: "Documentação",
                      collapsed: false,
                      items: [
                        {
                          label: "Introdução",
                          slug: "docs/projetos/dados/irjournals/documentacao/introducao",
                        },
                        {
                          label: "Metadados",
                          slug: "docs/projetos/dados/irjournals/documentacao/metadados",
                        },
                        {
                          label: "Código das Revistas",
                          slug: "docs/projetos/dados/irjournals/documentacao/revistas",
                        },
                        {
                          label: "Diretório Local",
                          slug: "docs/projetos/dados/irjournals/documentacao/loca",
                        },
                        {
                          label: "Pastas",
                          slug: "docs/projetos/dados/irjournals/documentacao/pastas",
                        },
                        {
                          label: "Arquivos de Controle",
                          slug: "docs/projetos/dados/irjournals/documentacao/arquivos",
                        },
                      ],
                    },
                    {
                      label: "Identidade Visual",
                      slug: "docs/projetos/dados/irjournals/identidade",
                    },
                    {
                      label: "Como citar",
                      slug: "docs/projetos/dados/irjournals/citar",
                    },
                  ],
                },
                {
                  label: "GovLatinAmerica",
                  items: [
                    {
                      label: "Apresentação",
                      slug: "docs/projetos/dados/govlatinamerica",
                    },
                    {
                      label: "Equipe",
                      slug: "docs/projetos/dados/govlatinamerica/equipe",
                    },
                    {
                      label: "Atividades Realizadas",
                      slug: "docs/projetos/dados/govlatinamerica/atividades",
                    },
                    {
                      label: "Dados",
                      slug: "docs/projetos/dados/govlatinamerica/dados",
                    },
                    {
                      label: "Documentação",
                      slug: "docs/projetos/dados/govlatinamerica/documentacao",
                    },
                    {
                      label: "Identidade Visual",
                      slug: "docs/projetos/dados/govlatinamerica/identidade",
                    },
                    {
                      label: "Como citar",
                      slug: "docs/projetos/dados/govlatinamerica/citar",
                    },
                  ],
                },
                {
                  label: "Internet e Relações Internacionais",
                  items: [
                    {
                      label: "Apresentação",
                      slug: "docs/projetos/dados/internetri",
                    },
                    {
                      label: "Equipe",
                      slug: "docs/projetos/dados/internetri/equipe",
                    },
                    {
                      label: "Atividades Realizadas",
                      slug: "docs/projetos/dados/internetri/atividades",
                    },
                    {
                      label: "Documentação",
                      slug: "docs/projetos/dados/internetri/documentacao",
                    },
                    {
                      label: "Como citar",
                      slug: "docs/projetos/dados/internetri/citar",
                    },
                  ],
                },
                {
                  label: "ThesisBR",
                  items: [
                    {
                      label: "Conheça o projeto",
                      link: "https://cpps-unesp.github.io/thesisbr/", 
                    },
                  ],
                },
              ],
            },

            // --- ENSINO ---
            {
              label: "Ensino",
              items: [
                {
                  label: "Visão geral",
                  slug: "docs/projetos/ensino",
                },
                // --- TRILHA DE DADOS - PYTHON ---
                {
                  label: "Trilhas de Fundamentos de Tecnologias Digitais",
                  items: [
                    {
                      label: "Trilha de Dados - Python",
                      items: [
                        { label: "Comece por aqui", slug: "docs/projetos/ensino/tfdt" },
                        {
                          label: "Paradas",
                          items: [
                            // 1. AMBIENTE DE TRABALHO
                            {
                              label: "Ambiente de Trabalho",
                              items: [
                                { label: "Introdução", slug: "docs/projetos/ensino/tfdt/trilha/paradas/ambiente/01-intro" },
                                {
                                  label: "Markdown",
                                  items: [
                                    { label: "Noções Gerais", slug: "docs/projetos/ensino/tfdt/trilha/paradas/ambiente/markdown/01-nocoes-gerais" },
                                    { label: "Sintaxe", slug: "docs/projetos/ensino/tfdt/trilha/paradas/ambiente/markdown/02-sintaxe" },
                                    { label: "Criar GitHub Profile", slug: "docs/projetos/ensino/tfdt/trilha/paradas/ambiente/markdown/03-criar-github-profile" },
                                  ]
                                },
                                {
                                  label: "Versionamento",
                                  items: [
                                      { label: "Noções Gerais", slug: "docs/projetos/ensino/tfdt/trilha/paradas/ambiente/versionamento/01a-nocoes_gerais" },
                                      { label: "Dinâmica", slug: "docs/projetos/ensino/tfdt/trilha/paradas/ambiente/versionamento/02a-dinamica_versionamento" },
                                      {
                                        label: "Repositório",
                                        items: [
                                          { label: "Tipos Licenças", slug: "docs/projetos/ensino/tfdt/trilha/paradas/ambiente/versionamento/repositorio/03a-tipos_licencas" },
                                          { label: "Criar Repositório", slug: "docs/projetos/ensino/tfdt/trilha/paradas/ambiente/versionamento/repositorio/03b-criar_repositorio" },
                                          { label: "Acessar Repositório", slug: "docs/projetos/ensino/tfdt/trilha/paradas/ambiente/versionamento/repositorio/03c-acessar_repositorio" },
                                        ]
                                      },
                                      {
                                        label: "Utilizando o Git",
                                        items: [
                                          { label: "Git Básico", slug: "docs/projetos/ensino/tfdt/trilha/paradas/ambiente/versionamento/utilizando-git/04a-git_basico" },
                                          {
                                            label: "Git - Indo Além",
                                            items: [
                                              { label: "Acesso SSH", slug: "docs/projetos/ensino/tfdt/trilha/paradas/ambiente/versionamento/utilizando-git/indo-alem/05b-acesso-ssh" },
                                              { label: "Integrar Branches", slug: "docs/projetos/ensino/tfdt/trilha/paradas/ambiente/versionamento/utilizando-git/indo-alem/05c-integrar-branches" },
                                            ]
                                          }
                                        ]
                                      }
                                  ]
                                },
                                { label: "Comandos Linux", slug: "docs/projetos/ensino/tfdt/trilha/paradas/ambiente/04-comandos-linux" },
                                { label: "Editor de Código", slug: "docs/projetos/ensino/tfdt/trilha/paradas/ambiente/05-editor-codigo" },
                                { label: "Ambiente Virtual", slug: "docs/projetos/ensino/tfdt/trilha/paradas/ambiente/06-ambiente-virtual" },
                                { label: "Certificação", slug: "docs/projetos/ensino/tfdt/trilha/paradas/ambiente/07-certificacao" },
                              ]
                            },
                            // 2. FUNDAMENTOS PYTHON
                            {
                              label: "Fundamentos Python",
                              items: [
                                { label: "Introdução", slug: "docs/projetos/ensino/tfdt/trilha/paradas/fundamentos-python/01-intro" },
                                {
                                  label: "Básico 01",
                                  items: [
                                    { label: "Zen do Python", slug: "docs/projetos/ensino/tfdt/trilha/paradas/fundamentos-python/basico-01/zen-do-python" },
                                    {
                                      label: "Tipos Básicos",
                                      items: [
                                        { label: "Variáveis e Números", slug: "docs/projetos/ensino/tfdt/trilha/paradas/fundamentos-python/basico-01/tipos-basicos/variaveis-numeros" },
                                        { label: "Strings", slug: "docs/projetos/ensino/tfdt/trilha/paradas/fundamentos-python/basico-01/tipos-basicos/strings" },
                                        { label: "Conversão de Tipos", slug: "docs/projetos/ensino/tfdt/trilha/paradas/fundamentos-python/basico-01/tipos-basicos/conversao-de-tipos" },
                                        { label: "Operadores", slug: "docs/projetos/ensino/tfdt/trilha/paradas/fundamentos-python/basico-01/tipos-basicos/operadores" },
                                      ]
                                    },
                                    { label: "Função", slug: "docs/projetos/ensino/tfdt/trilha/paradas/fundamentos-python/basico-01/funcao" },
                                    { label: "Certificação", slug: "docs/projetos/ensino/tfdt/trilha/paradas/fundamentos-python/basico-01/certificacao" },
                                  ]
                                },
                                {
                                  label: "Básico 02",
                                  items: [
                                    {
                                      label: "Controle de Fluxo",
                                      items: [
                                        { label: "Booleanos", slug: "docs/projetos/ensino/tfdt/trilha/paradas/fundamentos-python/basico-02/controle-fluxo/booleanos" },
                                        { label: "Declaração e Controle", slug: "docs/projetos/ensino/tfdt/trilha/paradas/fundamentos-python/basico-02/controle-fluxo/declaracao-controle" },
                                      ]
                                    },
                                    {
                                      label: "Tipos Avançados",
                                      items: [
                                        { label: "Listas", slug: "docs/projetos/ensino/tfdt/trilha/paradas/fundamentos-python/basico-02/tipos-avancados/listas" },
                                        { label: "Dicionários", slug: "docs/projetos/ensino/tfdt/trilha/paradas/fundamentos-python/basico-02/tipos-avancados/dicionarios" },
                                        { label: "Conjuntos", slug: "docs/projetos/ensino/tfdt/trilha/paradas/fundamentos-python/basico-02/tipos-avancados/conjuntos" },
                                      ]
                                    },
                                    { label: "Mutabilidade", slug: "docs/projetos/ensino/tfdt/trilha/paradas/fundamentos-python/basico-02/mutabilidade" },
                                  ]
                                },
                                {
                                  label: "Básico 03",
                                  items: [
                                    { label: "Arquivos", slug: "docs/projetos/ensino/tfdt/trilha/paradas/fundamentos-python/basico-03/arquivos" },
                                    { label: "Bibliotecas", slug: "docs/projetos/ensino/tfdt/trilha/paradas/fundamentos-python/basico-03/bibliotecas" },
                                    { label: "Diretórios", slug: "docs/projetos/ensino/tfdt/trilha/paradas/fundamentos-python/basico-03/diretorios" },
                                    { label: "Certificação", slug: "docs/projetos/ensino/tfdt/trilha/paradas/fundamentos-python/basico-03/certificacao" },
                                  ]
                                },
                                {
                                  label: "Intermediário",
                                  items: [
                                    { label: "Objetos", slug: "docs/projetos/ensino/tfdt/trilha/paradas/fundamentos-python/intermediario/objetos" },
                                    { label: "Listas", slug: "docs/projetos/ensino/tfdt/trilha/paradas/fundamentos-python/intermediario/listas" },
                                    { label: "Itertools", slug: "docs/projetos/ensino/tfdt/trilha/paradas/fundamentos-python/intermediario/itertools" },
                                    { label: "Encode", slug: "docs/projetos/ensino/tfdt/trilha/paradas/fundamentos-python/intermediario/encode" },
                                    { label: "Certificação", slug: "docs/projetos/ensino/tfdt/trilha/paradas/fundamentos-python/intermediario/certificacao" },
                                  ]
                                }
                              ]
                            },
                            // 3. ANÁLISE DE DADOS
                            {
                              label: "Análise de Dados",
                              items: [
                                { label: "Introdução", slug: "docs/projetos/ensino/tfdt/trilha/paradas/analise-dados/00-intro" },
                                { label: "Conceitos Básicos", slug: "docs/projetos/ensino/tfdt/trilha/paradas/analise-dados/01-00-conceitos-basicos" },
                                { label: "Pandas: Series e DataFrame", slug: "docs/projetos/ensino/tfdt/trilha/paradas/analise-dados/01-01-pandas-series-e-dataframe" },
                                { label: "Propriedades Básicas", slug: "docs/projetos/ensino/tfdt/trilha/paradas/analise-dados/01-02-propriedades-basicas" },
                                { label: "Consulta e Modificação", slug: "docs/projetos/ensino/tfdt/trilha/paradas/analise-dados/01-03-consulta-e-modificacao" },
                                { label: "Trabalhando com Arquivos", slug: "docs/projetos/ensino/tfdt/trilha/paradas/analise-dados/01-04-trabalhando-com-arquivos" },
                                { label: "Gerar Gráficos", slug: "docs/projetos/ensino/tfdt/trilha/paradas/analise-dados/02-gerar-graficos" },
                                { label: "Combinando Dataframes", slug: "docs/projetos/ensino/tfdt/trilha/paradas/analise-dados/03-combinando-dataframes" },
                                { label: "Tratamento de Dados", slug: "docs/projetos/ensino/tfdt/trilha/paradas/analise-dados/04-tratamento-de-dados" },
                              ]
                            },
                            // 4. COLETA DE DADOS
                            {
                              label: "Coleta de Dados",
                              slug: "docs/projetos/ensino/tfdt/trilha/paradas/coleta-dados/intro",
                            },
                            // 5. BANCO DE DADOS
                            {
                              label: "Banco de Dados",
                              slug: "docs/projetos/ensino/tfdt/trilha/paradas/banco-dados/intro",
                            },
                            // 6. MÉTODOS QUANTITATIVOS
                            {
                              label: "Métodos Quantitativos",
                              slug: "docs/projetos/ensino/tfdt/trilha/paradas/metodos-quanti/intro",
                            },
                          ],
                        },
                        {
                          label: "Indicações",
                          slug: "docs/projetos/ensino/tfdt/indicacoes",
                        },
                        {
                          label: "Identidade Visual",
                          slug: "docs/projetos/ensino/tfdt/id-visual",
                        },
                      ],
                    },
                    // --- TRILHA R---
                  {
                    label: "Trilha R",
                    items: [
                      { label: "Apresentação", slug: "/docs/projetos/ensino/tfdt/trilha/trilha-dados-r/01-intro" },
                      { label: "Howto", slug: "/docs/projetos/ensino/tfdt/trilha/trilha-dados-r/02-howto" },
                      { label: "codedoc", slug: "/docs/projetos/ensino/tfdt/trilha/trilha-dados-r/03-codedoc.md" },
                    ],
                  }, // 👈 FECHAMENTO CORRETO

                  // --- TRILHA JS ---
                  {
                    label: "Trilha JS",
                    items: [
                      { label: "01 - Introdução", slug: "docs/projetos/ensino/tfdt/trilha/trilha-js/01-intro" },
                      { label: "02 - HTML", slug: "docs/projetos/ensino/tfdt/trilha/trilha-js/02-html" },
                      { label: "03 - CSS", slug: "docs/projetos/ensino/tfdt/trilha/trilha-js/03-css" },
                      { label: "04 - JavaScript", slug: "docs/projetos/ensino/tfdt/trilha/trilha-js/04-js" },
                      { label: "05 - Exercícios", slug: "docs/projetos/ensino/tfdt/trilha/trilha-js/05-exercicios-js" },
                      { label: "06 - jQuery", slug: "docs/projetos/ensino/tfdt/trilha/trilha-js/06-jaquery" },
                      { label: "07 - Bootstrap", slug: "docs/projetos/ensino/tfdt/trilha/trilha-js/07-bootstrap" },
                      { label: "08 - Acessibilidade", slug: "docs/projetos/ensino/tfdt/trilha/trilha-js/08-acessibilidade-web" },
                      { label: "09 - React", slug: "docs/projetos/ensino/tfdt/trilha/trilha-js/09-react" },
                      { label: "10 - D3", slug: "docs/projetos/ensino/tfdt/trilha/trilha-js/10-d3" },
                      { label: "11 - Node.js", slug: "docs/projetos/ensino/tfdt/trilha/trilha-js/11-nodejs" },
                      { label: "12 - Sass", slug: "docs/projetos/ensino/tfdt/trilha/trilha-js/12-sass" },
                    ],
                  },

                // --- TECNOLOGIAS DIGITAIS ---
                {
                  label: "Tecnologias Digitais",
                  items: [
                    // Arquivos soltos na raiz da pasta websites
                    {
                      label: "Apresentação",
                      slug: "docs/projetos/ensino/tecnologiasdigitais/intro",
                    },
                    {
                      label: "Identidade Visual",
                      slug: "docs/projetos/ensino/tecnologiasdigitais/id-visual",
                    },
                    // Pastas (Apontando para o arquivo intro.md dentro de cada uma)
                    {
                      label: "Anotações",
                      slug: "docs/projetos/ensino/tecnologiasdigitais/anotacoes/intro",
                    },
                    {
                      label: "Áudio",
                      slug: "docs/projetos/ensino/tecnologiasdigitais/audio/intro",
                    },
                    {
                      label: "Buscadores",
                      slug: "docs/projetos/ensino/tecnologiasdigitais/buscadores/intro",
                    },
                    {
                      label: "Conhecimentos",
                      slug: "docs/projetos/ensino/tecnologiasdigitais/conhecimentos/intro",
                    },
                    {
                      label: "Edição de Texto",
                      slug: "docs/projetos/ensino/tecnologiasdigitais/edicao-texto/intro",
                    },
                    {
                      label: "Google Docs",
                      slug: "docs/projetos/ensino/tecnologiasdigitais/google-docs/intro",
                    },
                    {
                      label: "Mapas Mentais",
                      slug: "docs/projetos/ensino/tecnologiasdigitais/mapas-mentais/intro",
                    },
                  ],
                },
                // --- PROCESSAR IMAGENS ---
                {
                  label: "Processar imagens que contém texto",
                  items: [
                    { label: "Introdução", slug: "docs/projetos/ensino/processarimagens" },
                    { label: "Formatos", slug: "docs/projetos/ensino/processarimagens/02-formatos" },
                    { label: "OCR", slug: "docs/projetos/ensino/processarimagens/03-ocr" },
                    {
                      label: "Scanners",
                      items: [
                        { label: "Avision", slug: "docs/projetos/ensino/processarimagens/scanners/avision" },
                        { label: "HP LaserJet", slug: "docs/projetos/ensino/processarimagens/scanners/hp-laserjet" },
                        { label: "Plustek 3800", slug: "docs/projetos/ensino/processarimagens/scanners/plustek-3800" },
                        { label: "Plustek PS286", slug: "docs/projetos/ensino/processarimagens/scanners/plustek-ps286" },
                      ],
                    },
                  ],
                },
                // --- ACESSO REMOTO ---
                {
                  label: "Acesso Remoto",
                  items: [
                    { label: "Introdução", slug: "docs/projetos/ensino/acessoremoto" },
                    { label: "Explicação", slug: "docs/projetos/ensino/acessoremoto/explicar" },
                    { label: "Instruções", slug: "docs/projetos/ensino/acessoremoto/instruir" },
                    { label: "Solicitar Acesso", slug: "docs/projetos/ensino/acessoremoto/solicitar-acesso" },
                    { label: "Tutoriais", slug: "docs/projetos/ensino/acessoremoto/tutoriais" },
                  ],
                },
                // --- RECOLL ---
                {
                  label: "Recoll",
                  items: [
                    { label: "Apresentação", slug: "docs/projetos/ensino/recoll" },
                    { label: "Colaboradores", slug: "docs/projetos/ensino/recoll/02-colaboradores" },
                    { label: "Atividades Realizadas", slug: "docs/projetos/ensino/recoll/03-atividades" },
                    { label: "Documentação", slug: "docs/projetos/ensino/recoll/04-doc" },
                    { label: "Conceitos", slug: "docs/projetos/ensino/recoll/05-conceitos" },
                    { label: "Configurando", slug: "docs/projetos/ensino/recoll/06-configurando" },
                    { label: "Utilizando", slug: "docs/projetos/ensino/recoll/07-utilizando" },
                    { label: "Pesquisas", slug: "docs/projetos/ensino/recoll/08-pesquisas" },
                  ],
                },
                // --- FILEZILLA ---
                {
                  label: "FileZilla",
                  items: [
                    { label: "Apresentação", slug: "docs/projetos/ensino/filezilla" },
                    { label: "Configuração", slug: "docs/projetos/ensino/filezilla/configuracao" },
                  ],
                },
                // --- MATERIAL BIBLIOGRÁFICO ---
                {
                  label: "Material Bibliográfico",
                  items: [
                    { label: "Apresentação", slug: "docs/projetos/ensino/materialbibliografico" },
                    { label: "Clássicos IPRI", slug: "docs/projetos/ensino/materialbibliografico/classicos-ipri" },
                    { label: "Dicas Base de Dados", slug: "docs/projetos/ensino/materialbibliografico/dicas-base-de-dados" },
                    { label: "Mapas", slug: "docs/projetos/ensino/materialbibliografico/mapas" },
                  ],
                },
                // --- CURSO ---
                {
                  label: "Curso: Governança da Internet",
                  items: [
                    { label: "Apresentação", slug: "docs/projetos/ensino/curso" },
                  ],
                },
              ],
            },

            // --- SISTEMAS ---
            {
              label: "Sistemas",
              items: [
                {
                  label: "Websites e Redes",
                  items: [
                    { label: "01 - Introdução", slug: "docs/projetos/sistemas/websites/01-intro-md" },
                    { label: "02 - Atividades", slug: "docs/projetos/sistemas/websites/02-atividades" },
                    {
                      label: "Editar",
                      collapsed: true,
                      items: [
                        { label: "01 - Acessar", slug: "docs/projetos/sistemas/websites/editar/01-acessar" },
                        { label: "02 - Editar Páginas", slug: "docs/projetos/sistemas/websites/editar/02-editar-paginas" },
                        { label: "02 - Estrutura", slug: "docs/projetos/sistemas/websites/editar/02-estrutura" },
                        { label: "03 - Equipe", slug: "docs/projetos/sistemas/websites/editar/03-equipe" },
                        { label: "04 - Arquivos MD", slug: "docs/projetos/sistemas/websites/editar/04-arquivos-md" },
                        { label: "05 - Docusaurus", slug: "docs/projetos/sistemas/websites/editar/05-docusaurus" },
                        { label: "06 - Sidebar", slug: "docs/projetos/sistemas/websites/editar/06-sidebar" },
                        { label: "07 - Infos Estáticas", slug: "docs/projetos/sistemas/websites/editar/07-infos-estaticas" },
                        { label: "08 - Cadernos", slug: "docs/projetos/sistemas/websites/editar/08-cadernos" },
                        { label: "09 - Páginas JS", slug: "docs/projetos/sistemas/websites/editar/09-paginas-js" },
                        { label: "GEPDAI", slug: "docs/projetos/sistemas/websites/editar/gepdai" },
                      ],
                    },
                    {
                      label: "Markdown",
                      items: [
                        { label: "01 - Geral", slug: "docs/projetos/sistemas/websites/markdown/01-geral" },
                        { label: "02 - Específico", slug: "docs/projetos/sistemas/websites/markdown/02-especifico" },
                      ],
                    },
                  ],
                },
                {
                  label: "Infraestrutura Computacional",
                  collapsed: true,
                  items: [
                    { label: "Apresentação", slug: "docs/projetos/sistemas/infraestrutura" },
                    {
                      label: "Infra as Code",
                      items: [
                        {
                          label: "Ansible",
                          items: [
                             { label: "01 - Ansible", slug: "docs/projetos/sistemas/infraestrutura/infra-as-code/ansible/01-ansible" },
                             { label: "Apoio", slug: "docs/projetos/sistemas/infraestrutura/infra-as-code/ansible/apoio" },
                          ]
                        },
                        {
                          label: "Terraform",
                          items: [
                             { label: "02 - Terraform", slug: "docs/projetos/sistemas/infraestrutura/infra-as-code/terraform/02-terraform" },
                             { label: "Apoio", slug: "docs/projetos/sistemas/infraestrutura/infra-as-code/terraform/apoio" },
                          ]
                        },
                      ],
                    },
                    {
                      label: "Infra LabRI/Unesp",
                      items: [
                        {
                          label: "BIOS",
                          collapsed: true,
                          items: [
                            { label: "01 - Dell", slug: "docs/projetos/sistemas/infraestrutura/infra-labriunesp/bios/01-dell" },
                            { label: "02 - IBM", slug: "docs/projetos/sistemas/infraestrutura/infra-labriunesp/bios/02-ibm" },
                            { label: "03 - Ryzen", slug: "docs/projetos/sistemas/infraestrutura/infra-labriunesp/bios/03-ryzen" },
                            { label: "04 - 118", slug: "docs/projetos/sistemas/infraestrutura/infra-labriunesp/bios/04-118" },
                            { label: "05 - 119", slug: "docs/projetos/sistemas/infraestrutura/infra-labriunesp/bios/5-119" },
                            { label: "06 - HP ML30 Gen9", slug: "docs/projetos/sistemas/infraestrutura/infra-labriunesp/bios/06-hp-ml30-gen9" },
                            { label: "07 - 123", slug: "docs/projetos/sistemas/infraestrutura/infra-labriunesp/bios/07-123" },
                            { label: "08 - Itautec", slug: "docs/projetos/sistemas/infraestrutura/infra-labriunesp/bios/08-itautec" },
                            { label: "BIOS Geral", slug: "docs/projetos/sistemas/infraestrutura/infra-labriunesp/bios" },
                          ]
                        },
                        { label: "Dualboot", slug: "docs/projetos/sistemas/infraestrutura/infra-labriunesp/dualboot" },
                        { label: "Equipamentos", slug: "docs/projetos/sistemas/infraestrutura/infra-labriunesp/equipslabri" },
                        { label: "Scanners", slug: "docs/projetos/sistemas/infraestrutura/infra-labriunesp/scanners" },
                      ]
                    },
                    {
                        label: "Infra IPRI/Unesp",
                        items: [
                            { label: "Fapesp", slug: "docs/projetos/sistemas/infraestrutura/infraipriunesp/fapesp" },
                        ]
                    },
                    {
                      label: "Linux",
                      collapsed: true,
                      items: [
                        { label: "03 - Tela Preta", slug: "docs/projetos/sistemas/infraestrutura/linux/03-tela-preta" },
                        { label: "04 - Acesso Remoto", slug: "docs/projetos/sistemas/infraestrutura/linux/04-acesso-remoto" },
                        { label: "Alterar Nome PC", slug: "docs/projetos/sistemas/infraestrutura/linux/alterar-nome-pc" },
                        { label: "Atualizar", slug: "docs/projetos/sistemas/infraestrutura/linux/atualizar" },
                        { label: "Formatar HD", slug: "docs/projetos/sistemas/infraestrutura/linux/formatar-hd" },
                        { label: "Info Hardware", slug: "docs/projetos/sistemas/infraestrutura/linux/info-hardware" },
                        { label: "Initramfs Boot", slug: "docs/projetos/sistemas/infraestrutura/linux/initrafms-boot" },
                        { label: "Lock Screen", slug: "docs/projetos/sistemas/infraestrutura/linux/lock-screen" },
                        { label: "Rede (Rein-network)", slug: "docs/projetos/sistemas/infraestrutura/linux/rein-network" },
                        { label: "Reparar FSCK", slug: "docs/projetos/sistemas/infraestrutura/linux/reparar-fsck" },
                        { label: "Resolução de Erros", slug: "docs/projetos/sistemas/infraestrutura/linux/resolucao-erros" },
                        { label: "Senha Root", slug: "docs/projetos/sistemas/infraestrutura/linux/senha-root" },
                        { label: "Tutorial Pendrive", slug: "docs/projetos/sistemas/infraestrutura/linux/tutorial-pendrive" },
                        { label: "Ubuntu Initramfs", slug: "docs/projetos/sistemas/infraestrutura/linux/ubuntu-initrafms" },
                        { label: "Usuários", slug: "docs/projetos/sistemas/infraestrutura/linux/usuarios" },
                        { label: "Ventoy", slug: "docs/projetos/sistemas/infraestrutura/linux/ventoy" },
                        { label: "Verificar Linux", slug: "docs/projetos/sistemas/infraestrutura/linux/verificar-linux" },
                      ]
                    },
                    {
                      label: "Redes",
                      collapsed: true,
                      items: [
                        {
                            label: "Container",
                            items: [
                                { label: "01 - Intro", slug: "docs/projetos/sistemas/infraestrutura/redes/container/01-intro" },
                                { label: "Apoio", slug: "docs/projetos/sistemas/infraestrutura/redes/container/apoio" },
                            ]
                        },
                        {
                            label: "Firewall",
                            items: [
                                { label: "01 - Intro", slug: "docs/projetos/sistemas/infraestrutura/redes/firewall/01-intro" },
                                { label: "Apoio", slug: "docs/projetos/sistemas/infraestrutura/redes/firewall/apoio" },
                            ]
                        },
                        {
                            label: "Kubernetes",
                            items: [
                                { label: "01 - Intro", slug: "docs/projetos/sistemas/infraestrutura/redes/kubernetes/01-intro" },
                                { label: "Apoio", slug: "docs/projetos/sistemas/infraestrutura/redes/kubernetes/apoio" },
                            ]
                        },
                        {
                            label: "Proxmox",
                            items: [
                                { label: "01 - Intro", slug: "docs/projetos/sistemas/infraestrutura/redes/proxmox/01-intro" },
                                { label: "02 - Instalação", slug: "docs/projetos/sistemas/infraestrutura/redes/proxmox/02-intalacao" },
                                { label: "06 - ZFS", slug: "docs/projetos/sistemas/infraestrutura/redes/proxmox/06-zfs" },
                                { label: "Storage", slug: "docs/projetos/sistemas/infraestrutura/redes/proxmox/storage" },
                                { label: "Apoio", slug: "docs/projetos/sistemas/infraestrutura/redes/proxmox/apoio" },
                            ]
                        },
                        {
                            label: "Rancher",
                            items: [
                                { label: "01 - Intro", slug: "docs/projetos/sistemas/infraestrutura/redes/rancher/01-intro" },
                                { label: "Google Authenticator", slug: "docs/projetos/sistemas/infraestrutura/redes/google-authenticador" },
                                { label: "Apoio", slug: "docs/projetos/sistemas/infraestrutura/redes/rancher/apoio" },
                            ]
                        },
                        { label: "Atividades", slug: "docs/projetos/sistemas/infraestrutura/atividades" },
                      ]
                    },
                  ],
                },
                // --- CADERNOS LABRI ---
                {
                  label: "Cadernos LabRI/UNESP",
                  items: [
                    { label: "Apresentação", slug: "docs/projetos/sistemas/cadernoslabri" },
                    { label: "01 - Cadernos", slug: "docs/projetos/sistemas/cadernoslabri/01-cadernos" },
                    { label: "02 - Cadernos", slug: "docs/projetos/sistemas/cadernoslabri/02-cadernos" },
                    { label: "02 - Próximos Passos", slug: "docs/projetos/sistemas/cadernoslabri/02-proximos" },
                    { label: "03 - Cadernos", slug: "docs/projetos/sistemas/cadernoslabri/03-cadernos" },
                    { label: "03 - Comandos Linux", slug: "docs/projetos/sistemas/cadernoslabri/03-comandos-linux" },
                    { label: "04 - Cadernos", slug: "docs/projetos/sistemas/cadernoslabri/04-cadernos" },
                    { label: "04 - Editor de Código", slug: "docs/projetos/sistemas/cadernoslabri/04-editor-codigo" },
                    { label: "05 - Cadernos", slug: "docs/projetos/sistemas/cadernoslabri/05-cadernos" },
                    { label: "05 - Versionamento", slug: "docs/projetos/sistemas/cadernoslabri/05-versionamento" },
                    { label: "06 - Ambiente Virtual", slug: "docs/projetos/sistemas/cadernoslabri/06-ambiente-virtual" },
                    { label: "07 - Ambiente Virtual Windows", slug: "docs/projetos/sistemas/cadernoslabri/07-ambiente-virtual-windows" },
                    { label: "07 - Cadernos", slug: "docs/projetos/sistemas/cadernoslabri/07-cadernos" },
                    { label: "07 - Tipos de Dados Básicos", slug: "docs/projetos/sistemas/cadernoslabri/07-tipos-dados-basicos" },
                    { label: "08 - Cadernos", slug: "docs/projetos/sistemas/cadernoslabri/08-cadernos" },
                    { label: "09 - Cadernos", slug: "docs/projetos/sistemas/cadernoslabri/09-cadernos" },
                    { label: "10 - Cadernos", slug: "docs/projetos/sistemas/cadernoslabri/10-cadernos" },
                  ],
                },
                {
                  label: "Sistema de Confecção de Certificados",
                  items: [
                    { label: "Apresentação", slug: "docs/projetos/sistemas/sistemacertificados" },
                  ],
                },
                {
                  label: "Sistema de OCR Automático",
                  items: [
                    { label: "Apresentação", slug: "docs/projetos/sistemas/ocr" },
                  ],
                },
              ],
            },

            // --- EXTENSÃO ---
            {
              label: "Extensão",
              items: [
                 {
                  label: "POD-RI ↗",
                  link: "https://labriunesp.org/pod-ri",
                  attrs: { target: "_blank" },
                },
                {
                  label: "Conhecer Para Acolher ↗",
                  link: "https://labriunesp.org/conhecer-para-acolher",
                  attrs: { target: "_blank" },
                },
                {
                  label: "Cidades Saudáveis e Sustentáveis ↗",
                  link: "https://labriunesp.org/cidades-sustentaveis",
                  attrs: { target: "_blank" },
                },
                 {
                  label: "As Relações Internacionais e o Novo Coronavírus",
                  items: [
                    { label: "Apresentação", slug: "docs/projetos/extensao/ricoronavirus" },
                    { label: "Grupos de Trabalho", slug: "docs/projetos/extensao/ricoronavirus/02-grupos-trabalho" },
                    { label: "Postagens", slug: "docs/projetos/extensao/ricoronavirus/04-postagens" },
                    { label: "Identidade Visual", slug: "docs/projetos/extensao/ricoronavirus/05-id-visual" },
                  ],
                },
              ],
            }, // Fim de Extensão
          ], // Fim de items (Projetos)
        }, // Fim de Projetos
      ], // Fim de sidebar
    }), // Fim de starlight
    pagefind(),
    mdx(),
  ], // Fim de integrations
}); // Fim de defineConfig