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
                 {
                  label: "DiáriosBR",
                  items: [
                    {
                      label: "Apresentação",
                      slug: "docs/projetos/dados/diariosbr",
                    },
                  ],
                },
                 {
                  label: "FullText",
                  items: [
                    {
                      label: "Apresentação",
                      slug: "docs/projetos/dados/fulltext",
                    },
                  ],
                },
                 {
                  label: "Mercodocs",
                  items: [
                    {
                      label: "Apresentação",
                      slug: "docs/projetos/dados/mercodocs",
                    },
                  ],
                },
                 {
                  label: "TweePlantA",
                  items: [
                    {
                      label: "Apresentação",
                      slug: "docs/projetos/dados/tweeplanta",
                    },
                  ],
                },
                 {
                  label: "Acervo Redalint",
                  items: [
                    {
                      label: "Apresentação",
                      slug: "docs/projetos/dados/acervorodalint",
                    },
                  ],
                },
                 {
                  label: "IRjournals BR",
                  items: [
                    {
                      label: "Apresentação",
                      slug: "docs/projetos/dados/irjournals",
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
                  ],
                },
                 {
                  label: "Intert e Relações Internacionais",
                  items: [
                    {
                      label: "Apresentação",
                      slug: "docs/projetos/dados/interteri",
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
                {
                  label: "Trilha de Dados",
                  slug: "docs/projetos/ensino/trilha-de-dados",
                },
                {
                  label: "Trilhas de Fundamentos de Tecnologias Digitais",
                  items: [
                    {
                      label: "Apresentação",
                      slug: "docs/projetos/ensino/tfdt",
                    },
                  ],
                },
                {
                  label: "Tecnologias Digitais",
                  items: [
                    {
                      label: "Apresentação",
                      slug: "docs/projetos/ensino/tecnologiasdigitais",
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
                {
                  label: "Acesso Remoto",
                  items: [
                    {
                      label: "Introdução",
                      slug: "docs/projetos/ensino/acessoremoto",
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