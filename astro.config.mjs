// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import pagefind from 'astro-pagefind';
import mdx from '@astrojs/mdx';
import node from '@astrojs/node';
import react from '@astrojs/react';
import emdash, { local } from 'emdash/astro';
import { sqlite } from 'emdash/db';

// https://astro.build/config
export default defineConfig({
  site: 'https://cpps.franca.unesp.br',
  // As páginas existentes continuam pré-renderizadas (`prerender = true`).
  // Só as rotas do EmDash (admin, API e notícias) rodam sob demanda.
  output: 'server',
  adapter: node({ mode: 'standalone' }),
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    pagefind(),
    mdx(),
    react(),
    emdash({
      database: sqlite({ url: 'file:./data.db' }),
      storage: local({
        directory: './uploads',
        baseUrl: '/_emdash/api/media/file',
      }),
    }),
  ],
});
