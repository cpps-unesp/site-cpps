// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import pagefind from "astro-pagefind";
import starlight from "@astrojs/starlight";
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: "https://cpps-unesp.github.io",
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [starlight({
      title: 'Documentação CPPS',
      sidebar: [
        {
          label: "Informações",
          items: [
            {
              label: "Atendimento",
              slug: "docs/atendimento",
            },
            {
              label: "Estágio",
              slug: "docs/estagio",
            },
            {
              label: "Processo",
              slug: "docs/processo",
            },
            {
              label: "Estágio Voluntário",
              slug: "docs/voluntario",
            },
            {
              label: "Emprestimo",
              slug: "docs/emprestimo",
            },
          ],
        },
      ],
    }), pagefind(), mdx()],
});