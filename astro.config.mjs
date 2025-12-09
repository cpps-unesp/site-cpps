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
              slug: "docs", // src/content/docs/docs/index.mdx
            },
          ],
        },

        {
          label: "Projetos",
          items: [
            {
              label: "Introdução",
              slug: "docs/projetos", // src/content/docs/docs/index.mdx
            },
            // --- DADOS ---
            {
              label: "Dados",
              items: [
                {
                  label: "Visão geral",
                  slug: "docs/projetos/dados",   // src/content/docs/projetos/dados/index.mdx
                },

                // --------- HEMEROTECA PEB ----------
                {
                  label: "Hemeroteca PEB",
                  items: [
                    {
                      label: "Apresentação",
                      slug: "docs/projetos/dados/hemeroteca-peb",
                    },
                    //depois adiciona:
                    // { label: "Equipe", slug: "docs/projetos/dados/hemeroteca-peb/equipe" },
                    // { label: "Atividades Realizadas", slug: "docs/projetos/dados/hemeroteca-peb/atividades-realizadas" },
                    // etc.
                  ],
                },
                {
                  label: "NewsCloud",
                  items: [
                    {
                      label: "Apresentação",
                      slug: "docs/projetos/dados/newscloud",
                    },
                    //depois adiciona:
                    // { label: "Equipe", slug: "docs/projetos/dados/hemeroteca-peb/equipe" },
                    // { label: "Atividades Realizadas", slug: "docs/projetos/dados/hemeroteca-peb/atividades-realizadas" },
                    // etc.
                  ],
                },
                 {
                  label: "DiáriosBR",
                  items: [
                    {
                      label: "Apresentação",
                      slug: "docs/projetos/dados/diariosbr",
                    },
                    //depois adiciona:
                    // { label: "Equipe", slug: "docs/projetos/dados/hemeroteca-peb/equipe" },
                    // { label: "Atividades Realizadas", slug: "docs/projetos/dados/hemeroteca-peb/atividades-realizadas" },
                    // etc.
                  ],
                },
                 {
                  label: "FullText",
                  items: [
                    {
                      label: "Apresentação",
                      slug: "docs/projetos/dados/fulltext",
                    },
                    //depois adiciona:
                    // { label: "Equipe", slug: "docs/projetos/dados/hemeroteca-peb/equipe" },
                    // { label: "Atividades Realizadas", slug: "docs/projetos/dados/hemeroteca-peb/atividades-realizadas" },
                    // etc.
                  ],
                },
                 {
                  label: "Mercodocs",
                  items: [
                    {
                      label: "Apresentação",
                      slug: "docs/projetos/dados/mercodocs",
                    },
                    //depois adiciona:
                    // { label: "Equipe", slug: "docs/projetos/dados/hemeroteca-peb/equipe" },
                    // { label: "Atividades Realizadas", slug: "docs/projetos/dados/hemeroteca-peb/atividades-realizadas" },
                    // etc.
                  ],
                },
                 {
                  label: "TweePlantA",
                  items: [
                    {
                      label: "Apresentação",
                      slug: "docs/projetos/dados/tweeplanta",
                    },
                    //depois adiciona:
                    // { label: "Equipe", slug: "docs/projetos/dados/hemeroteca-peb/equipe" },
                    // { label: "Atividades Realizadas", slug: "docs/projetos/dados/hemeroteca-peb/atividades-realizadas" },
                    // etc.
                  ],
                },
                 {
                  label: "Acervo Redalint",
                  items: [
                    {
                      label: "Apresentação",
                      slug: "docs/projetos/dados/acervorodalint",
                    },
                    //depois adiciona:
                    // { label: "Equipe", slug: "docs/projetos/dados/hemeroteca-peb/equipe" },
                    // { label: "Atividades Realizadas", slug: "docs/projetos/dados/hemeroteca-peb/atividades-realizadas" },
                    // etc.
                  ],
                },
                 {
                  label: "IRjournals BR",
                  items: [
                    {
                      label: "Apresentação",
                      slug: "docs/projetos/dados/irjournals",
                    },
                    //depois adiciona:
                    // { label: "Equipe", slug: "docs/projetos/dados/hemeroteca-peb/equipe" },
                    // { label: "Atividades Realizadas", slug: "docs/projetos/dados/hemeroteca-peb/atividades-realizadas" },
                    // etc.
                  ],
                },
                 {
                  label: "GovLatinAmerica",
                  items: [
                    {
                      label: "Apresentação",
                      slug: "docs/projetos/dados/govlatinamerica",
                    },
                    //depois adiciona:
                    // { label: "Equipe", slug: "docs/projetos/dados/hemeroteca-peb/equipe" },
                    // { label: "Atividades Realizadas", slug: "docs/projetos/dados/hemeroteca-peb/atividades-realizadas" },
                    // etc.
                  ],
                },
                 {
                  label: "Intert e Relações Internacionais",
                  items: [
                    {
                      label: "Apresentação",
                      slug: "docs/projetos/dados/interteri",
                    },
                    //depois adiciona:
                    // { label: "Equipe", slug: "docs/projetos/dados/hemeroteca-peb/equipe" },
                    // { label: "Atividades Realizadas", slug: "docs/projetos/dados/hemeroteca-peb/atividades-realizadas" },
                    // etc.
                  ],
                },
                {
                  label: "ThesisBR",
                  items: [
            
                    {
                      label: "Conheça o projeto",
                      link: "https://cpps-unesp.github.io/thesisbr/", //URL real aqui
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
              ],
            },

            // --- SISTEMAS ---
            {
              label: "Sistemas",
              autogenerate: { directory: "docs/projetos/sistemas" },
            },

            // --- EXTENSÃO ---
            {
              label: "Extensão",
              autogenerate: { directory: "docs/projetos/extensao" },
            },
             // --------- POD-RI ----------
                {
                  label: "POD-RI",
                  items: [
                    {
                      label: "Apresentação",
                      slug: "docs/projetos/extensao/podri",
                    },
                    //depois adiciona:
                    // { label: "Equipe", slug: "docs/projetos/dados/hemeroteca-peb/equipe" },
                    // { label: "Atividades Realizadas", slug: "docs/projetos/dados/hemeroteca-peb/atividades-realizadas" },
                    // etc.
                  ],
                },
          ],
        },
      ],
    }),
    pagefind(),
    mdx(),
  ],
});
