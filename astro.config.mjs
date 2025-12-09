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
          ],
        },
      ],
    }),
    pagefind(),
    mdx(),
  ],
});
