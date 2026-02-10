// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  site: 'https://cpps.franca.unesp.br',
  output: 'server',
  adapter: cloudflare({
    imageService: 'cloudflare',
    platformProxy: {
      enabled: false,
    },
  }),
  vite: {
    build: {
      cssMinify: 'esbuild',
    },
    ssr: {
      external: ['node:fs/promises', 'node:path', 'node:url', 'node:crypto', 'node:path/posix'],
    },
    plugins: [tailwindcss()],
  },

  integrations: [mdx()],
});
