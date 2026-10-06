// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import cloudflare from '@astrojs/cloudflare';
import react from '@astrojs/react';
import emdash from 'emdash/astro';
import { d1, r2 } from '@emdash-cms/cloudflare';

const SITE = 'https://cpps.franca.unesp.br';

// https://astro.build/config
export default defineConfig({
  site: SITE,
  // Cloudflare Workers: as páginas que não leem o EmDash continuam pré-renderizadas
  // (`prerender = true`); as que leem rodam no Worker. Recursos em wrangler.jsonc.
  output: 'server',
  adapter: cloudflare(),
  // Autoriza o serviço de imagens a redimensionar a mídia do EmDash servida pelo
  // próprio domínio. Sem isso, em produção as imagens saem no tamanho original. O
  // EmDash só registra esse padrão sozinho quando recebe `siteUrl`, mas `siteUrl`
  // também fixa a origem do login por passkey e quebraria o admin em localhost.
  // Em `astro dev` o EmDash já autoriza a mídia de qualquer origem.
  image: {
    remotePatterns: [
      { hostname: new URL(SITE).hostname, pathname: '/_emdash/api/media/file/**' },
    ],
  },
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
    mdx(),
    react(),
    emdash({
      database: d1({ binding: 'DB' }),
      storage: r2({ binding: 'MEDIA' }),
    }),
  ],
});
