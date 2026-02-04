// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import pagefind from "astro-pagefind";
import starlight from "@astrojs/starlight";
import mdx from '@astrojs/mdx';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  site: "https://cpps.franca.unesp.br",
  output: 'server',
  adapter: cloudflare({
    imageService: 'compile',
  }),
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [starlight({
      title: 'Documentação CPPS',
      disable404Route: true,
    }), pagefind(), mdx()],
});
