// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";

import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
   site: 'https://site-cpps.github.io',
  base: '/',
  integrations: [ starlight({ title: 'CPPS/UNESP' })],
  vite: {
    plugins: [tailwindcss()],
  },
});