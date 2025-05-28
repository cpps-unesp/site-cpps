// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import pagefind from "astro-pagefind";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [starlight({
      title: 'Documentação CPPS',
    }), pagefind()],
});