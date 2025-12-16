// @ts-check
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
                // --- NEWSCLOUD (ATUALIZADO AQUI) ---
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
                 // --- DIÁRIOS BR (ATUALIZADO) ---
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
                // --- FULLTEXT (ATUALIZADO) ---
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
                      // Aponta para o index.md
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
                      // autogenerate: false, // Caso precise desativar a geração automática
                      collapsed: false, // Define se o menu começa aberto ou fechado
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
                      // Aponta para o index.md
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
                      // Atenção: Seu arquivo parece estar nomeado como 'identidade.md.md' na imagem.
                      // Se for isso mesmo, o slug pode variar, mas geralmente o Astro limpa para:
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
                      // Aponta para o index.md
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
                      // Aponta para o index.md dentro da nova pasta internetri
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
                // --- TFDT (Trilhas de Fundamentos) - CORRIGIDO ---
                {
                  label: "Trilhas de Fundamentos (TFDT)",
                  items: [
                    {
                      label: "Ambiente de Desenvolvimento",
                      items: [
                        {
                          label: "Introdução",
                          slug: "docs/projetos/ensino/tfdt/ambiente/01-intro",
                        },
                        // SUBPASTA MARKDOWN
                        {
                          label: "Markdown",
                          items: [
                            {
                              label: "01 - Noções Gerais",
                              slug: "docs/projetos/ensino/tfdt/ambiente/markdown/01-nocoes-gerais",
                            },
                            {
                              label: "02 - Sintaxe",
                              slug: "docs/projetos/ensino/tfdt/ambiente/markdown/02-sintaxe",
                            },
                            {
                              label: "03 - Criar GitHub Profile",
                              slug: "docs/projetos/ensino/tfdt/ambiente/markdown/03-criar-github-profile",
                            },
                          ],
                        },
                        // SUBPASTA VERSIONAMENTO
                        {
                          label: "Versionamento",
                          items: [
                            { label: "01a - Noções Gerais", slug: "docs/projetos/ensino/tfdt/ambiente/versionamento/01a-nocoes_gerais" },
                            { label: "02a - Dinâmica Versionamento", slug: "docs/projetos/ensino/tfdt/ambiente/versionamento/02a-dinamica_versionamento" },
                            { label: "03a - Tipos Licenças", slug: "docs/projetos/ensino/tfdt/ambiente/versionamento/03a-tipos_licencas" },
                            { label: "03b - Criar Repositório", slug: "docs/projetos/ensino/tfdt/ambiente/versionamento/03b-criar_repositorio" },
                            { label: "03c - Acessar Repositório", slug: "docs/projetos/ensino/tfdt/ambiente/versionamento/03c-acessar_repositorio" },
                            { label: "04a - Git Básico", slug: "docs/projetos/ensino/tfdt/ambiente/versionamento/04a-git_basico" },
                            { label: "05b - Acesso SSH", slug: "docs/projetos/ensino/tfdt/ambiente/versionamento/05b-acesso-ssh" },
                            { label: "05c - Integrar Branches", slug: "docs/projetos/ensino/tfdt/ambiente/versionamento/05c-integrar-branches" },
                          ],
                        },
                        // ARQUIVOS SOLTOS NA PASTA AMBIENTE
                        {
                          label: "04 - Comandos Linux",
                          slug: "docs/projetos/ensino/tfdt/ambiente/04-comandos-linux",
                        },
                        {
                          label: "05 - Editor de Código",
                          slug: "docs/projetos/ensino/tfdt/ambiente/05-editor-codigo",
                        },
                        {
                          label: "06 - Ambiente Virtual",
                          slug: "docs/projetos/ensino/tfdt/ambiente/06-ambiente-virtual",
                        },
                        {
                          label: "07 - Certificação",
                          slug: "docs/projetos/ensino/tfdt/ambiente/07-certificacao",
                        },
                      ],
                    },
                  ],
                },
                // --- TECNOLOGIAS DIGITAIS ---
                {
                  label: "Tecnologias Digitais",
                  items: [
                    // Arquivos soltos na raiz da pasta
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
                {
                  label: "Processar imagens que contém texto",
                  items: [
                    {
                      label: "Apresentação",
                      slug: "docs/projetos/ensino/processarimagens",
                    },
                  ],
                },
                // --- ACESSO REMOTO 
                {
                  label: "Acesso Remoto",
                  items: [
                    {
                      label: "Introdução",
                      slug: "docs/projetos/ensino/acessoremoto", // Aponta para index.md
                    },
                    {
                      label: "Explicação",
                      slug: "docs/projetos/ensino/acessoremoto/explicar",
                    },
                    {
                      label: "Instruções",
                      slug: "docs/projetos/ensino/acessoremoto/instruir",
                    },
                    {
                      label: "Solicitar Acesso",
                      slug: "docs/projetos/ensino/acessoremoto/solicitar-acesso",
                    },
                    {
                      label: "Tutoriais",
                      slug: "docs/projetos/ensino/acessoremoto/tutoriais",
                    },
                  ],
                },
                {
                  label: "Recoll",
                  items: [
                    {
                      label: "Apresentação",
                      slug: "docs/projetos/ensino/recoll",
                    },
                  ],
                },
                {
                  label: "Filezilla",
                  items: [
                    {
                      label: "Apresentação",
                      slug: "docs/projetos/ensino/filezilla",
                    },
                  ],
                },
                {
                  label: "Material Bibliográfico",
                  items: [
                    {
                      label: "Apresentação",
                      slug: "docs/projetos/ensino/materialbibliografico",
                    },
                  ],
                },
                {
                  label: "Curso: Governança da Internet",
                  items: [
                    {
                      label: "Apresentação",
                      slug: "docs/projetos/ensino/curso",
                    },
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
                    {
                      label: "Apresentação",
                      slug: "docs/projetos/sistemas/websites",
                    },
                  ],
                },
                {
                  label: "Infraestrutura Computacional",
                  items: [
                    {
                      label: "Apresentação",
                      slug: "docs/projetos/sistemas/infraestrutura",
                    },
                  ],
                },
                {
                  label: "Cadernos LabRI/UNESP",
                  items: [
                    {
                      label: "Apresentação",
                      slug: "docs/projetos/sistemas/cadernoslabri",
                    },
                  ],
                },
                {
                  label: "Sistema de Confecção de Certificados",
                  items: [
                    {
                      label: "Apresentação",
                      slug: "docs/projetos/sistemas/sistemacertificados",
                    },
                  ],
                },
                {
                  label: "Sistema de OCR Automático",
                  items: [
                    {
                      label: "Apresentação",
                      slug: "docs/projetos/sistemas/ocr",
                    },
                  ],
                },
              ], 
            }, 

            // --- EXTENSÃO ---
            {
              label: "Extensão",
              items: [
                // --------- POD-RI ----------
                {
                  label: "POD-RI",
                  items: [
                    {
                      label: "Apresentação",
                      slug: "docs/projetos/extensao/podri",
                    },
                  ],
                },
                {
                  label: "Conhecer Para Acolher",
                  items: [
                    {
                      label: "Apresentação",
                      slug: "docs/projetos/extensao/conhecerparaacolher",
                    },
                  ],
                },
                {
                  label: "Cidades Saudáveis e Sustentáveis",
                  items: [
                    {
                      label: "Apresentação",
                      slug: "docs/projetos/extensao/cidadessaudaveis",
                    },
                  ],
                },
                {
                  label: "As Relações Internacionais e o Novo Coronavírus",
                  items: [
                    {
                      label: "Apresentação",
                      slug: "docs/projetos/extensao/ricoronavirus",
                    },
                  ],
                },
              ], 
            }, // Fim de Extensão
             
          ], // Fim de items (Projetos)
        }, // Fim de Projetos
      ],
    }),
    pagefind(),
    mdx(),
  ],
});