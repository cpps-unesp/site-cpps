// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import pagefind from 'astro-pagefind';
import mdx from '@astrojs/mdx';
import cloudflare from '@astrojs/cloudflare';
import react from '@astrojs/react';
import emdash from 'emdash/astro';
import { d1, r2 } from '@emdash-cms/cloudflare';

// https://astro.build/config
export default defineConfig({
  site: 'https://cpps.franca.unesp.br',
  // Cloudflare Workers: as páginas que não leem o EmDash continuam pré-renderizadas
  // (`prerender = true`); as que leem rodam no Worker. Recursos em wrangler.jsonc.
  output: 'server',
  adapter: cloudflare(),
  // Idiomas do conteúdo no EmDash. As URLs /pt/, /en/ e /es/ continuam sendo
  // resolvidas pelas rotas [lang] do site, por isso o roteamento é manual.
  i18n: {
    defaultLocale: 'pt',
    locales: ['pt', 'en', 'es'],
    routing: 'manual',
  },
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    pagefind(),
    mdx(),
    react(),
    emdash({
      database: d1({ binding: 'DB' }),
      storage: r2({ binding: 'MEDIA' }),
    }),
  ],
});
