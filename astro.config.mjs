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
  // EmDash registra esse padrão sozinho com `siteUrl` (que fixaria a origem do
  // login por passkey e quebraria o admin em localhost) ou, desde a 1.2, com
  // EMDASH_SITE_URL no ambiente do build. Nos endereços workers.dev (a produção
  // até a migração e o teste), passe EMDASH_SITE_URL no build com o endereço,
  // para as imagens deles também serem otimizadas.
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
      // A barra de edição para quem está logado fica no padrão ('server'). Até a
      // 1.1 ela era injetada no primeiro `</body>` do HTML, e um título publicado
      // com `</body>` a punha dentro de um atributo (XSS contra o admin); a 1.2
      // injeta no último (emdash-cms/emdash#3681). Não usar 'client', que injeta um
      // script para todos os visitantes.
      // O admin usa as fontes do sistema: sem isso, o build baixa a Noto Sans do
      // Google Fonts e falha quando a rede falha.
      fonts: false,
      // Só português no admin (o inglês sempre vai junto, como reserva).
      admin: { locales: ['pt-BR'] },
      // O aviso de nova versão no admin só aparece depois de 7 dias, o mesmo
      // intervalo que o Dependabot espera (cooldown em .github/dependabot.yml).
      updateCheck: { minimumReleaseAge: '7d' },
    }),
  ],
});
