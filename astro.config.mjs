import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import pagefind from "astro-pagefind";
import mdx from '@astrojs/mdx';
import cloudflare from '@astrojs/cloudflare';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: "https://cpps.franca.unesp.br",
  output: 'server',
  adapter: cloudflare({
    imageService: 'passthrough',
  }),
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [pagefind(), starlight({
      title: 'Documentação CPPS',
      sidebar: [
        {
          label: "Documentação",
          items: [
            {
              label: "Introdução",
              slug: "projetos", 
            },
          ],
        },

        {
          label: "Projetos",
          items: [
            {
              label: "Introdução",
              slug: "projetos", 
            },
            // --- DADOS ---
            {
              label: "Dados",
              items: [
                {
                  label: "Visão geral",
                  slug: "projetos/dados",
                },
                // --- HEMEROTECA PEB ---
                {
                  label: "Hemeroteca PEB",
                  items: [
                    { label: "Apresentação", slug: "projetos/dados/hemeroteca-peb" },
                    { label: "Equipe", slug: "projetos/dados/hemeroteca-peb/equipe" },
                    { label: "Atividades Realizadas", slug: "projetos/dados/hemeroteca-peb/atividades" },
                    {
                      label: "Documentação",
                      items: [
                        { label: "Introdução", slug: "projetos/dados/hemeroteca-peb/documentacao/introducao" },
                        { label: "Arquivo JSON", slug: "projetos/dados/hemeroteca-peb/documentacao/arquivo-json" },
                        { label: "Temas", slug: "projetos/dados/hemeroteca-peb/documentacao/temas" },
                      ],
                    },
                    { label: "Como citar Hemeroteca PEB", slug: "projetos/dados/hemeroteca-peb/como-citar" },
                  ],
                },
                // --- NEWSCLOUD ---
                {
                  label: "NewsCloud",
                  items: [
                    {
                      label: "Apresentação",
                      slug: "projetos/dados/newscloud",
                    },
                    {
                      label: "Equipe",
                      slug: "projetos/dados/newscloud/equipe",
                    },
                    {
                      label: "Atividades Realizadas",
                      slug: "projetos/dados/newscloud/atividades",
                    },
                    {
                      label: "Informações de Coleta",
                      slug: "projetos/dados/newscloud/informacoes",
                    },
                    {
                      label: "Documentação",
                      items: [
                        {
                          label: "Introdução",
                          slug: "projetos/dados/newscloud/documentacao/introducao",
                        },
                        {
                          label: "Elementos do Banco de Dados",
                          slug: "projetos/dados/newscloud/documentacao/elementos-bd",
                        },
                        {
                          label: "Elementos Peru",
                          slug: "projetos/dados/newscloud/documentacao/elementos-peru",
                        },
                        {
                          label: "Elementos Equador",
                          slug: "projetos/dados/newscloud/documentacao/equador",
                        },
                        {
                          label: "Elementos Colômbia",
                          slug: "projetos/dados/newscloud/documentacao/colombia",
                        },
                        {
                          label: "Elementos Brasil",
                          slug: "projetos/dados/newscloud/documentacao/brasil",
                        },
                        {
                          label: "Fluxograma",
                          slug: "projetos/dados/newscloud/documentacao/fluxograma",
                        },
                      ],
                    },
                    {
                      label: "Como citar",
                      slug: "projetos/dados/newscloud/como-citar",
                    },
                  ],
                },
                 // --- DIÁRIOS BR ---
                {
                  label: "DiáriosBR",
                  items: [
                    {
                      label: "Apresentação",
                      slug: "projetos/dados/diariosbr",
                    },
                    {
                      label: "Equipe",
                      slug: "projetos/dados/diariosbr/equipe",
                    },
                    {
                      label: "Atividades Realizadas",
                      slug: "projetos/dados/diariosbr/atividades",
                    },
                    {
                      label: "Documentação",
                      items: [
                        {
                          label: "Introdução",
                          slug: "projetos/dados/diariosbr/documentacao/introducao",
                        },
                        {
                          label: "Dados e Metadados",
                          slug: "projetos/dados/diariosbr/documentacao/dados",
                        },
                        {
                          label: "Localização e Conteúdo",
                          slug: "projetos/dados/diariosbr/documentacao/localizacao",
                        },
                        {
                          label: "Banco de Termos",
                          slug: "projetos/dados/diariosbr/documentacao/banco",
                        },
                        {
                          label: "Fluxograma",
                          slug: "projetos/dados/diariosbr/documentacao/fluxograma",
                        },
                        
                      ],
                    },
                    {
                      label: "Como citar",
                      slug: "projetos/dados/diariosbr/como-citar",
                    },
                  ],
                },
                // --- FULLTEXT ---
                {
                  label: "FullText",
                  items: [
                    {
                      label: "Apresentação",
                      slug: "projetos/dados/fulltext",
                    },
                    {
                      label: "Equipe",
                      slug: "projetos/dados/fulltext/equipe",
                    },
                    {
                      label: "Atividades Realizadas",
                      slug: "projetos/dados/fulltext/atividades",
                    },
                    {
                      label: "Identidade Visual",
                      slug: "projetos/dados/fulltext/identidade-visual",
                    },
                    {
                      label: "Como citar",
                      slug: "projetos/dados/fulltext/citar",
                    },
                  ],
                },
                // --- MERCODOCS ---
                {
                  label: "Mercodocs",
                  items: [
                    {
                      label: "Apresentação",
                      slug: "projetos/dados/mercodocs",
                    },
                    {
                      label: "Equipe",
                      slug: "projetos/dados/mercodocs/equipe",
                    },
                    {
                      label: "Atividades Realizadas",
                      slug: "projetos/dados/mercodocs/atividades",
                    },
                    {
                      label: "Documentação",
                      slug: "projetos/dados/mercodocs/documentacao",
                    },
                    {
                      label: "Como citar",
                      slug: "projetos/dados/mercodocs/como-citar",
                    },
                  ],
                },
                {
                  label: "TweePiNa",
                  items: [
                    {
                      label: "Apresentação",
                      slug: "projetos/dados/tweepina",
                    },
                    {
                      label: "Equipe",
                      slug: "projetos/dados/tweepina/equipe",
                    },
                    {
                      label: "Atividades Realizadas",
                      slug: "projetos/dados/tweepina/atividades",
                    },
                    {
                      label: "Documentação",
                      collapsed: false,
                      items: [
                        {
                          label: "Introdução",
                          slug: "projetos/dados/tweepina/infos/intro",
                        },
                        {
                          label: "Script com Caminhos Absolutos",
                          slug: "projetos/dados/tweepina/infos/script",
                        },
                        {
                          label: "Variáveis",
                          slug: "projetos/dados/tweepina/infos/variaveis",
                        },
                        {
                          label: "Fluxograma",
                          slug: "projetos/dados/tweepina/infos/fluxograma",
                        },
                        {
                          label: "Identificação de Status",
                          slug: "projetos/dados/tweepina/infos/identificacao",
                        },
                        {
                          label: "Projetos Semelhantes",
                          slug: "projetos/dados/tweepina/infos/projetos",
                        },
                        {
                          label: "Bibliotecas",
                          slug: "projetos/dados/tweepina/infos/biblioteca",
                        },
                      ],
                    },
                    {
                      label: "Identidade Visual",
                      slug: "projetos/dados/tweepina/identidade-visual",
                    },
                    {
                      label: "Como citar",
                      slug: "projetos/dados/tweepina/citar",
                    },
                  ],
                },
                {
                  label: "Acervo Rodalint",
                  items: [
                    {
                      label: "Apresentação",
                      slug: "projetos/dados/acervorodalint",
                    },
                    {
                      label: "Equipe",
                      slug: "projetos/dados/acervorodalint/equipe",
                    },
                    {
                      label: "Atividades Realizadas",
                      slug: "projetos/dados/acervorodalint/atividades",
                    },
                    {
                      label: "Documentação",
                      slug: "projetos/dados/acervorodalint/documentacao",
                    },
                    {
                      label: "Como citar",
                      slug: "projetos/dados/acervorodalint/citar",
                    },
                  ],
                },
                {
                  label: "IRJournalsBR",
                  items: [
                    {
                      label: "Apresentação",
                      slug: "projetos/dados/irjournals",
                    },
                    {
                      label: "Equipe",
                      slug: "projetos/dados/irjournals/equipe",
                    },
                    {
                      label: "Atividades Realizadas",
                      slug: "projetos/dados/irjournals/atividades",
                    },
                    {
                      label: "Documentação",
                      collapsed: false,
                      items: [
                        {
                          label: "Introdução",
                          slug: "projetos/dados/irjournals/documentacao/introducao",
                        },
                        {
                          label: "Metadados",
                          slug: "projetos/dados/irjournals/documentacao/metadados",
                        },
                        {
                          label: "Código das Revistas",
                          slug: "projetos/dados/irjournals/documentacao/revistas",
                        },
                        {
                          label: "Diretório Local",
                          slug: "projetos/dados/irjournals/documentacao/loca",
                        },
                        {
                          label: "Pastas",
                          slug: "projetos/dados/irjournals/documentacao/pastas",
                        },
                        {
                          label: "Arquivos de Controle",
                          slug: "projetos/dados/irjournals/documentacao/arquivos",
                        },
                      ],
                    },
                    {
                      label: "Identidade Visual",
                      slug: "projetos/dados/irjournals/identidade",
                    },
                    {
                      label: "Como citar",
                      slug: "projetos/dados/irjournals/citar",
                    },
                  ],
                },
                {
                  label: "GovLatinAmerica",
                  items: [
                    {
                      label: "Apresentação",
                      slug: "projetos/dados/govlatinamerica",
                    },
                    {
                      label: "Equipe",
                      slug: "projetos/dados/govlatinamerica/equipe",
                    },
                    {
                      label: "Atividades Realizadas",
                      slug: "projetos/dados/govlatinamerica/atividades",
                    },
                    {
                      label: "Dados",
                      slug: "projetos/dados/govlatinamerica/dados",
                    },
                    {
                      label: "Documentação",
                      slug: "projetos/dados/govlatinamerica/documentacao",
                    },
                    {
                      label: "Identidade Visual",
                      slug: "projetos/dados/govlatinamerica/identidade",
                    },
                    {
                      label: "Como citar",
                      slug: "projetos/dados/govlatinamerica/citar",
                    },
                  ],
                },
                {
                  label: "Internet e Relações Internacionais",
                  items: [
                    {
                      label: "Apresentação",
                      slug: "projetos/dados/internet-ri",
                    },
                    {
                      label: "Equipe",
                      slug: "projetos/dados/internet-ri/equipe",
                    },
                    {
                      label: "Atividades Realizadas",
                      slug: "projetos/dados/internet-ri/atividades",
                    },
                    {
                      label: "Documentação",
                      slug: "projetos/dados/internet-ri/documentacao",
                    },
                    {
                      label: "Como citar",
                      slug: "projetos/dados/internet-ri/citar",
                    },
                  ],
                },
                {
                  label: "ThesisBR ↗",
                  items: [
                    {
                      label: "Conheça o projeto",
                      link: "https://cpps-unesp.github.io/thesisbr/", 
                      attrs: { target: "_blank" },
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
                  slug: "projetos/ensino",
                },
                {
                  label: "Trilhas de Fundamentos de Tecnologias Digitais",
                  items: [
                    {
                      label: "Trilha de Dados - Python",
                      items: [
                        { label: "Comece por aqui", slug: "projetos/ensino/tfdt" },
                        {
                          label: "Paradas",
                          items: [
                            {
                              label: "Ambiente de Trabalho",
                              items: [
                                { label: "Introdução", slug: "projetos/ensino/tfdt/trilha/paradas/ambiente/01-intro" },
                                {
                                  label: "Markdown",
                                  items: [
                                    { label: "Noções Gerais", slug: "projetos/ensino/tfdt/trilha/paradas/ambiente/markdown/01-nocoes-gerais" },
                                    { label: "Sintaxe", slug: "projetos/ensino/tfdt/trilha/paradas/ambiente/markdown/02-sintaxe" },
                                    { label: "Criar GitHub Profile", slug: "projetos/ensino/tfdt/trilha/paradas/ambiente/markdown/03-criar-github-profile" },
                                  ]
                                },
                                {
                                  label: "Versionamento",
                                  items: [
                                      { label: "Noções Gerais", slug: "projetos/ensino/tfdt/trilha/paradas/ambiente/versionamento/01a-nocoes_gerais" },
                                      { label: "Dinâmica", slug: "projetos/ensino/tfdt/trilha/paradas/ambiente/versionamento/02a-dinamica_versionamento" },
                                      {
                                        label: "Repositório",
                                        items: [
                                          { label: "Tipos Licenças", slug: "projetos/ensino/tfdt/trilha/paradas/ambiente/versionamento/repositorio/03a-tipos_licencas" },
                                          { label: "Criar Repositório", slug: "projetos/ensino/tfdt/trilha/paradas/ambiente/versionamento/repositorio/03b-criar_repositorio" },
                                          { label: "Acessar Repositório", slug: "projetos/ensino/tfdt/trilha/paradas/ambiente/versionamento/repositorio/03c-acessar_repositorio" },
                                        ]
                                      },
                                      {
                                        label: "Utilizando o Git",
                                        items: [
                                          { label: "Git Básico", slug: "projetos/ensino/tfdt/trilha/paradas/ambiente/versionamento/utilizando-git/04a-git_basico" },
                                          {
                                            label: "Git - Indo Além",
                                            items: [
                                              { label: "Acesso SSH", slug: "projetos/ensino/tfdt/trilha/paradas/ambiente/versionamento/utilizando-git/indo-alem/05b-acesso-ssh" },
                                              { label: "Integrar Branches", slug: "projetos/ensino/tfdt/trilha/paradas/ambiente/versionamento/utilizando-git/indo-alem/05c-integrar-branches" },
                                            ]
                                          }
                                        ]
                                      }
                                  ]
                                },
                                { label: "Comandos Linux", slug: "projetos/ensino/tfdt/trilha/paradas/ambiente/04-comandos-linux" },
                                { label: "Editor de Código", slug: "projetos/ensino/tfdt/trilha/paradas/ambiente/05-editor-codigo" },
                                { label: "Ambiente Virtual", slug: "projetos/ensino/tfdt/trilha/paradas/ambiente/06-ambiente-virtual" },
                                { label: "Certificação", slug: "projetos/ensino/tfdt/trilha/paradas/ambiente/07-certificacao" },
                              ]
                            },
                            {
                              label: "Fundamentos Python",
                              items: [
                                { label: "Introdução", slug: "projetos/ensino/tfdt/trilha/paradas/fundamentos-python/01-intro" },
                                {
                                  label: "Básico 01",
                                  items: [
                                    { label: "Zen do Python", slug: "projetos/ensino/tfdt/trilha/paradas/fundamentos-python/basico-01/zen-do-python" },
                                    {
                                      label: "Tipos Básicos",
                                      items: [
                                        { label: "Variáveis e Números", slug: "projetos/ensino/tfdt/trilha/paradas/fundamentos-python/basico-01/tipos-basicos/variaveis-numeros" },
                                        { label: "Strings", slug: "projetos/ensino/tfdt/trilha/paradas/fundamentos-python/basico-01/tipos-basicos/strings" },
                                        { label: "Conversão de Tipos", slug: "projetos/ensino/tfdt/trilha/paradas/fundamentos-python/basico-01/tipos-basicos/conversao-de-tipos" },
                                        { label: "Operadores", slug: "projetos/ensino/tfdt/trilha/paradas/fundamentos-python/basico-01/tipos-basicos/operadores" },
                                      ]
                                    },
                                    { label: "Função", slug: "projetos/ensino/tfdt/trilha/paradas/fundamentos-python/basico-01/funcao" },
                                    { label: "Certificação", slug: "projetos/ensino/tfdt/trilha/paradas/fundamentos-python/basico-01/certificacao" },
                                  ]
                                },
                                {
                                  label: "Básico 02",
                                  items: [
                                    {
                                      label: "Controle de Fluxo",
                                      items: [
                                        { label: "Booleanos", slug: "projetos/ensino/tfdt/trilha/paradas/fundamentos-python/basico-02/controle-fluxo/booleanos" },
                                        { label: "Declaração e Controle", slug: "projetos/ensino/tfdt/trilha/paradas/fundamentos-python/basico-02/controle-fluxo/declaracao-controle" },
                                      ]
                                    },
                                    {
                                      label: "Tipos Avançados",
                                      items: [
                                        { label: "Listas", slug: "projetos/ensino/tfdt/trilha/paradas/fundamentos-python/basico-02/tipos-avancados/listas" },
                                        { label: "Dicionários", slug: "projetos/ensino/tfdt/trilha/paradas/fundamentos-python/basico-02/tipos-avancados/dicionarios" },
                                        { label: "Conjuntos", slug: "projetos/ensino/tfdt/trilha/paradas/fundamentos-python/basico-02/tipos-avancados/conjuntos" },
                                      ]
                                    },
                                    { label: "Mutabilidade", slug: "projetos/ensino/tfdt/trilha/paradas/fundamentos-python/basico-02/mutabilidade" },
                                  ]
                                },
                                {
                                  label: "Básico 03",
                                  items: [
                                    { label: "Arquivos", slug: "projetos/ensino/tfdt/trilha/paradas/fundamentos-python/basico-03/arquivos" },
                                    { label: "Bibliotecas", slug: "projetos/ensino/tfdt/trilha/paradas/fundamentos-python/basico-03/bibliotecas" },
                                    { label: "Diretórios", slug: "projetos/ensino/tfdt/trilha/paradas/fundamentos-python/basico-03/diretorios" },
                                    { label: "Certificação", slug: "projetos/ensino/tfdt/trilha/paradas/fundamentos-python/basico-03/certificacao" },
                                  ]
                                },
                                {
                                  label: "Intermediário",
                                  items: [
                                    { label: "Objetos", slug: "projetos/ensino/tfdt/trilha/paradas/fundamentos-python/intermediario/objetos" },
                                    { label: "Listas", slug: "projetos/ensino/tfdt/trilha/paradas/fundamentos-python/intermediario/listas" },
                                    { label: "Itertools", slug: "projetos/ensino/tfdt/trilha/paradas/fundamentos-python/intermediario/itertools" },
                                    { label: "Encode", slug: "projetos/ensino/tfdt/trilha/paradas/fundamentos-python/intermediario/encode" },
                                    { label: "Certificação", slug: "projetos/ensino/tfdt/trilha/paradas/fundamentos-python/intermediario/certificacao" },
                                  ]
                                }
                              ]
                            },
                            {
                              label: "Análise de Dados",
                              items: [
                                { label: "Introdução", slug: "projetos/ensino/tfdt/trilha/paradas/analise-dados/00-intro" },
                                { label: "Conceitos Básicos", slug: "projetos/ensino/tfdt/trilha/paradas/analise-dados/01-00-conceitos-basicos" },
                                { label: "Pandas: Series e DataFrame", slug: "projetos/ensino/tfdt/trilha/paradas/analise-dados/01-01-pandas-series-e-dataframe" },
                                { label: "Propriedades Básicas", slug: "projetos/ensino/tfdt/trilha/paradas/analise-dados/01-02-propriedades-basicas" },
                                { label: "Consulta e Modificação", slug: "projetos/ensino/tfdt/trilha/paradas/analise-dados/01-03-consulta-e-modificacao" },
                                { label: "Trabalhando com Arquivos", slug: "projetos/ensino/tfdt/trilha/paradas/analise-dados/01-04-trabalhando-com-arquivos" },
                                { label: "Gerar Gráficos", slug: "projetos/ensino/tfdt/trilha/paradas/analise-dados/02-gerar-graficos" },
                                { label: "Combinando Dataframes", slug: "projetos/ensino/tfdt/trilha/paradas/analise-dados/03-combinando-dataframes" },
                                { label: "Tratamento de Dados", slug: "projetos/ensino/tfdt/trilha/paradas/analise-dados/04-tratamento-de-dados" },
                              ]
                            },
                            {
                              label: "Coleta de Dados",
                              slug: "projetos/ensino/tfdt/trilha/paradas/coleta-dados/intro",
                            },
                            {
                              label: "Banco de Dados",
                              slug: "projetos/ensino/tfdt/trilha/paradas/banco-dados/intro",
                            },
                            {
                              label: "Métodos Quantitativos",
                              slug: "projetos/ensino/tfdt/trilha/paradas/metodos-quanti/intro",
                            },
                          ],
                        },
                        { label: "Indicações", slug: "projetos/ensino/tfdt/indicacoes" },
                        { label: "Identidade Visual", slug: "projetos/ensino/tfdt/id-visual" },
                      ],
                    },
                    {
                      label: "Trilha R",
                      items: [
                        { label: "Apresentação", slug: "projetos/ensino/tfdt/trilha/trilha-dados-r/01-intro" },
                        { label: "Howto", slug: "projetos/ensino/tfdt/trilha/trilha-dados-r/02-howto" },
                        { label: "codedoc", slug: "projetos/ensino/tfdt/trilha/trilha-dados-r/03-codedoc" },
                      ],
                    },
                    {
                      label: "Trilha JS",
                      items: [
                        { label: "Introdução", slug: "projetos/ensino/tfdt/trilha/trilha-js/01-intro" },
                        { label: "HTML", slug: "projetos/ensino/tfdt/trilha/trilha-js/02-html" },
                        { label: "CSS", slug: "projetos/ensino/tfdt/trilha/trilha-js/03-css" },
                        { label: "JavaScript", slug: "projetos/ensino/tfdt/trilha/trilha-js/04-js" },
                        { label: "Exercícios", slug: "projetos/ensino/tfdt/trilha/trilha-js/05-exercicios-js" }, 
                        { label: "jQuery", slug: "projetos/ensino/tfdt/trilha/trilha-js/06-jaquery" },
                        { label: "Bootstrap", slug: "projetos/ensino/tfdt/trilha/trilha-js/07-bootstrap" },
                        { label: "Acessibilidade", slug: "projetos/ensino/tfdt/trilha/trilha-js/08-acessibilidade-web" }, 
                        { label: "React", slug: "projetos/ensino/tfdt/trilha/trilha-js/09-react" },
                        { label: "D3", slug: "projetos/ensino/tfdt/trilha/trilha-js/10-d3" },
                        { label: "Node.js", slug: "projetos/ensino/tfdt/trilha/trilha-js/11-nodejs" },
                        { label: "Sass", slug: "projetos/ensino/tfdt/trilha/trilha-js/12-sass" },
                      ],
                    },
                  ],
                },
                {
                  label: "Tecnologias Digitais",
                  items: [
                    { label: "Apresentação", slug: "projetos/ensino/tecnologiasdigitais/intro" },
                    { label: "Identidade Visual", slug: "projetos/ensino/tecnologiasdigitais/id-visual" },
                    { label: "Anotações", slug: "projetos/ensino/tecnologiasdigitais/anotacoes/intro" },
                    { label: "Áudio", slug: "projetos/ensino/tecnologiasdigitais/audio/intro" },
                    { label: "Buscadores", slug: "projetos/ensino/tecnologiasdigitais/buscadores/intro" },
                    { label: "Conhecimentos", slug: "projetos/ensino/tecnologiasdigitais/conhecimentos/intro" },
                    { label: "Edição de Texto", slug: "projetos/ensino/tecnologiasdigitais/edicao-texto/intro" },
                    { label: "Google Docs", slug: "projetos/ensino/tecnologiasdigitais/google-docs/intro" },
                    { label: "Mapas Mentais", slug: "projetos/ensino/tecnologiasdigitais/mapas-mentais/intro" },
                  ],
                },
                {
                  label: "Processar imagens",
                  items: [
                    { label: "Introdução", slug: "projetos/ensino/processarimagens" },
                    { label: "Formatos", slug: "projetos/ensino/processarimagens/02-formatos" },
                    { label: "OCR", slug: "projetos/ensino/processarimagens/03-ocr" },
                    {
                      label: "Scanners",
                      items: [
                        { label: "Avision", slug: "projetos/ensino/processarimagens/scanners/avision" },
                        { label: "HP LaserJet", slug: "projetos/ensino/processarimagens/scanners/hp-laserjet" },
                        { label: "Plustek 3800", slug: "projetos/ensino/processarimagens/scanners/plustek-3800" },
                        { label: "Plustek PS286", slug: "projetos/ensino/processarimagens/scanners/plustek-ps286" },
                      ],
                    },
                  ],
                },
                {
                  label: "Acesso Remoto",
                  items: [
                    { label: "Introdução", slug: "projetos/ensino/acessoremoto" },
                    { label: "Explicação", slug: "projetos/ensino/acessoremoto/explicar" },
                    { label: "Instruções", slug: "projetos/ensino/acessoremoto/instruir" },
                    { label: "Solicitar Acesso", slug: "projetos/ensino/acessoremoto/solicitar-acesso" },
                    { label: "Tutoriais", slug: "projetos/ensino/acessoremoto/tutoriais" },
                  ],
                },
                {
                  label: "Recoll",
                  items: [
                    { label: "Apresentação", slug: "projetos/ensino/recoll" },
                    { label: "Colaboradores", slug: "projetos/ensino/recoll/02-colaboradores" },
                    { label: "Atividades Realizadas", slug: "projetos/ensino/recoll/03-atividades" },
                    { label: "Documentação", slug: "projetos/ensino/recoll/04-doc" },
                    { label: "Conceitos", slug: "projetos/ensino/recoll/05-conceitos" },
                    { label: "Configurando", slug: "projetos/ensino/recoll/06-configurando" },
                    { label: "Utilizando", slug: "projetos/ensino/recoll/07-utilizando" },
                    { label: "Pesquisas", slug: "projetos/ensino/recoll/08-pesquisas" },
                  ],
                },
                {
                  label: "FileZilla",
                  items: [
                    { label: "Apresentação", slug: "projetos/ensino/filezilla" },
                    { label: "Configuração", slug: "projetos/ensino/filezilla/configuracao" },
                  ],
                },
                {
                  label: "Material Bibliográfico",
                  items: [
                    { label: "Apresentação", slug: "projetos/ensino/materialbibliografico" },
                    { label: "Clássicos IPRI", slug: "projetos/ensino/materialbibliografico/classicos-ipri" },
                    { label: "Dicas Base de Dados", slug: "projetos/ensino/materialbibliografico/dicas-base-de-dados" },
                    { label: "Mapas", slug: "projetos/ensino/materialbibliografico/mapas" },
                  ],
                },
                {
                  label: "Curso: Governança",
                  items: [
                    { label: "Apresentação", slug: "projetos/ensino/curso" },
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
                    { label: "Introdução", slug: "projetos/sistemas/websites/01-intro-md" },
                    { label: "Atividades", slug: "projetos/sistemas/websites/02-atividades" },
                    {
                      label: "Editar",
                      collapsed: true,
                      items: [
                        { label: "Acessar", slug: "projetos/sistemas/websites/editar/01-acessar" },
                        { label: "Editar Páginas", slug: "projetos/sistemas/websites/editar/02-editar-paginas" },
                        { label: "Estrutura", slug: "projetos/sistemas/websites/editar/02-estrutura" },
                        { label: "Equipe", slug: "projetos/sistemas/websites/editar/03-equipe" },
                        { label: "Arquivos MD", slug: "projetos/sistemas/websites/editar/04-arquivos-md" },
                        { label: "Docusaurus", slug: "projetos/sistemas/websites/editar/05-docusaurus" },
                        { label: "Sidebar", slug: "projetos/sistemas/websites/editar/06-sidebar" },
                        { label: "Infos Estáticas", slug: "projetos/sistemas/websites/editar/07-infos-estaticas" },
                        { label: "Cadernos", slug: "projetos/sistemas/websites/editar/08-cadernos" },
                        { label: "Páginas JS", slug: "projetos/sistemas/websites/editar/09-paginas-js" },
                        { label: "GEPDAI", slug: "projetos/sistemas/websites/editar/gepdai" },
                      ],
                    },
                    {
                      label: "Markdown",
                      items: [
                        { label: "Geral", slug: "projetos/sistemas/websites/markdown/01-geral" },
                        { label: "Específico", slug: "projetos/sistemas/websites/markdown/02-especifico" },
                      ],
                    },
                  ],
                },
                {
                  label: "Infraestrutura Computacional",
                  collapsed: true,
                  items: [
                    { label: "Apresentação", slug: "projetos/sistemas/infraestrutura" },
                    {
                      label: "Infra as Code",
                      items: [
                        {
                          label: "Ansible",
                          items: [
                             { label: "Ansible", slug: "projetos/sistemas/infraestrutura/infra-as-code/ansible/01-ansible" },
                             { label: "Apoio", slug: "projetos/sistemas/infraestrutura/infra-as-code/ansible/apoio" },
                          ]
                        },
                        {
                          label: "Terraform",
                          items: [
                             { label: "Terraform", slug: "projetos/sistemas/infraestrutura/infra-as-code/terraform/02-terraform" },
                             { label: "Apoio", slug: "projetos/sistemas/infraestrutura/infra-as-code/terraform/apoio" },
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
                            { label: "Dell", slug: "projetos/sistemas/infraestrutura/infra-labriunesp/bios/01-dell" },
                            { label: "IBM", slug: "projetos/sistemas/infraestrutura/infra-labriunesp/bios/02-ibm" },
                            { label: "Ryzen", slug: "projetos/sistemas/infraestrutura/infra-labriunesp/bios/03-ryzen" },
                            { label: "118", slug: "projetos/sistemas/infraestrutura/infra-labriunesp/bios/04-118" },
                            { label: "119", slug: "projetos/sistemas/infraestrutura/infra-labriunesp/bios/5-119" },
                            { label: "HP ML30 Gen9", slug: "projetos/sistemas/infraestrutura/infra-labriunesp/bios/06-hp-ml30-gen9" },
                            { label: "123", slug: "projetos/sistemas/infraestrutura/infra-labriunesp/bios/07-123" },
                            { label: "Itautec", slug: "projetos/sistemas/infraestrutura/infra-labriunesp/bios/08-itautec" },
                            { label: "BIOS Geral", slug: "projetos/sistemas/infraestrutura/infra-labriunesp/bios" },
                          ]
                        },
                        { label: "Dualboot", slug: "projetos/sistemas/infraestrutura/infra-labriunesp/dualboot" },
                        { label: "Equipamentos", slug: "projetos/sistemas/infraestrutura/infra-labriunesp/equipslabri" },
                        { label: "Scanners", slug: "projetos/sistemas/infraestrutura/infra-labriunesp/scanners" },
                      ]
                    },
                    {
                        label: "Infra IPRI/Unesp",
                        items: [
                            { label: "Fapesp", slug: "projetos/sistemas/infraestrutura/infraipriunesp/fapesp" },
                        ]
                    },
                    {
                      label: "Linux",
                      collapsed: true,
                      items: [
                        { label: "Tela Preta", slug: "projetos/sistemas/infraestrutura/linux/03-tela-preta" },
                        { label: "Acesso Remoto", slug: "projetos/sistemas/infraestrutura/linux/04-acesso-remoto" },
                        { label: "Alterar Nome PC", slug: "projetos/sistemas/infraestrutura/linux/alterar-nome-pc" },
                        { label: "Atualizar", slug: "projetos/sistemas/infraestrutura/linux/atualizar" },
                        { label: "Formatar HD", slug: "projetos/sistemas/infraestrutura/linux/formatar-hd" },
                        { label: "Info Hardware", slug: "projetos/sistemas/infraestrutura/linux/info-hardware" },
                        { label: "Initramfs Boot", slug: "projetos/sistemas/infraestrutura/linux/initrafms-boot" },
                        { label: "Lock Screen", slug: "projetos/sistemas/infraestrutura/linux/lock-screen" },
                        { label: "Rede", slug: "projetos/sistemas/infraestrutura/linux/rein-network" },
                        { label: "Reparar FSCK", slug: "projetos/sistemas/infraestrutura/linux/reparar-fsck" },
                        { label: "Resolução de Erros", slug: "projetos/sistemas/infraestrutura/linux/resolucao-erros" },
                        { label: "Senha Root", slug: "projetos/sistemas/infraestrutura/linux/senha-root" },
                        { label: "Tutorial Pendrive", slug: "projetos/sistemas/infraestrutura/linux/tutorial-pendrive" },
                        { label: "Ubuntu Initramfs", slug: "projetos/sistemas/infraestrutura/linux/ubuntu-initrafms" },
                        { label: "Usuários", slug: "projetos/sistemas/infraestrutura/linux/usuarios" },
                        { label: "Ventoy", slug: "projetos/sistemas/infraestrutura/linux/ventoy" },
                        { label: "Verificar Linux", slug: "projetos/sistemas/infraestrutura/linux/verificar-linux" },
                      ]
                    },
                    {
                      label: "Redes",
                      collapsed: true,
                      items: [
                        {
                            label: "Container",
                            items: [
                                { label: "Intro", slug: "projetos/sistemas/infraestrutura/redes/container/01-intro" },
                                { label: "Apoio", slug: "projetos/sistemas/infraestrutura/redes/container/apoio" },
                            ]
                        },
                        {
                            label: "Firewall",
                            items: [
                                { label: "Intro", slug: "projetos/sistemas/infraestrutura/redes/firewall/01-intro" },
                                { label: "Apoio", slug: "projetos/sistemas/infraestrutura/redes/firewall/apoio" },
                            ]
                        },
                        {
                            label: "Kubernetes",
                            items: [
                                { label: "Intro", slug: "projetos/sistemas/infraestrutura/redes/kubernetes/01-intro" },
                                { label: "Apoio", slug: "projetos/sistemas/infraestrutura/redes/kubernetes/apoio" },
                            ]
                        },
                        {
                            label: "Proxmox",
                            items: [
                                { label: "Intro", slug: "projetos/sistemas/infraestrutura/redes/proxmox/01-intro" },
                                { label: "Instalação", slug: "projetos/sistemas/infraestrutura/redes/proxmox/02-intalacao" },
                                { label: "ZFS", slug: "projetos/sistemas/infraestrutura/redes/proxmox/06-zfs" },
                                { label: "Storage", slug: "projetos/sistemas/infraestrutura/redes/proxmox/storage" },
                                { label: "Apoio", slug: "projetos/sistemas/infraestrutura/redes/proxmox/apoio" },
                            ]
                        },
                        {
                            label: "Rancher",
                            items: [
                                { label: "Intro", slug: "projetos/sistemas/infraestrutura/redes/rancher/01-intro" },
                                { label: "Google Authenticator", slug: "projetos/sistemas/infraestrutura/redes/google-authenticador" },
                                { label: "Apoio", slug: "projetos/sistemas/infraestrutura/redes/rancher/apoio" },
                            ]
                        },
                        { label: "Atividades", slug: "projetos/sistemas/infraestrutura/atividades" },
                      ]
                    },
                  ],
                },
                {
                  label: "Cadernos LabRI/UNESP",
                  items: [
                    { label: "Apresentação", slug: "projetos/sistemas/cadernoslabri" },
                    { label: "Cadernos 1", slug: "projetos/sistemas/cadernoslabri/01-cadernos" },
                    { label: "Cadernos 2", slug: "projetos/sistemas/cadernoslabri/02-cadernos" },
                    { label: "Próximos Passos", slug: "projetos/sistemas/cadernoslabri/02-proximos" },
                    { label: "Cadernos 4", slug: "projetos/sistemas/cadernoslabri/03-cadernos" },
                    { label: "Comandos Linux", slug: "projetos/sistemas/cadernoslabri/03-comandos-linux" },
                    { label: "Cadernos 3", slug: "projetos/sistemas/cadernoslabri/04-cadernos" },
                    { label: "Editor de Código", slug: "projetos/sistemas/cadernoslabri/04-editor-codigo" },
                    { label: "Cadernos 5", slug: "projetos/sistemas/cadernoslabri/05-cadernos" },
                    { label: "Versionamento", slug: "projetos/sistemas/cadernoslabri/05-versionamento" },
                    { label: "Ambiente Virtual", slug: "projetos/sistemas/cadernoslabri/06-ambiente-virtual" },
                    { label: "Ambiente Virtual Windows", slug: "projetos/sistemas/cadernoslabri/07-ambiente-virtual-windows" },
                    { label: "Cadernos 7", slug: "projetos/sistemas/cadernoslabri/07-cadernos" },
                    { label: "Tipos de Dados Básicos", slug: "projetos/sistemas/cadernoslabri/07-tipos-dados-basicos" },
                    { label: "Cadernos 8", slug: "projetos/sistemas/cadernoslabri/08-cadernos" },
                    { label: "Cadernos 9", slug: "projetos/sistemas/cadernoslabri/09-cadernos" },
                    { label: "Cadernos 10", slug: "projetos/sistemas/cadernoslabri/10-cadernos" },
                  ],
                },
                {
                  label: "Confecção de Certificados",
                  items: [
                    { label: "Apresentação", slug: "projetos/sistemas/sistemacertificados" },
                  ],
                },
                {
                  label: "OCR Automático",
                  items: [
                    { label: "Apresentação", slug: "projetos/sistemas/ocr" },
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
                  label: "Cidades Saudáveis ↗",
                  link: "https://labriunesp.org/cidades-sustentaveis",
                  attrs: { target: "_blank" },
                },
                {
                  label: "RI e Coronavírus",
                  items: [
                    { label: "Apresentação", slug: "projetos/extensao/ricoronavirus/01-intro" },
                    { label: "Grupos de Trabalho", slug: "projetos/extensao/ricoronavirus/02-grupos-trabalho" },
                    { label: "Postagens", slug: "projetos/extensao/ricoronavirus/04-postagens" },
                    { label: "Identidade Visual", slug: "projetos/extensao/ricoronavirus/05-id-visual" },
                ],
              },
              ],
            },
          ], // Fim de items (Projetos)
        }, // Fim de Projetos
        {
          label: "Informações",
          items: [
            {
              label: "Atendimento",
              slug: "atendimento",
            },
            {
              label: "Estágio",
              slug: "estagio",
            },
            {
              label: "Processo",
              slug: "processo",
            },
            {
              label: "Estágio Voluntário",
              slug: "voluntario",
            },
            {
              label: "Emprestimo",
              slug: "emprestimo",
            },
            {
              label: "Contatos",
              slug: "contato",
            },
          ],
        },
      ], // Fim de sidebar
    }), // Fim de starlight
    mdx(),
  ], // Fim de integrations
}); // Fim de defineConfig
