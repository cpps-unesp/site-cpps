// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import pagefind from 'astro-pagefind';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://cpps-unesp.github.io',
  base: '/site-cpps',
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [pagefind(), mdx()],
});
