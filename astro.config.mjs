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
      // Desligada por segurança. Para quem está logado como autor ou acima, a barra
      // é injetada no primeiro `</body>` do HTML (html.replace), e o Astro não
      // escapa `<` em atributos: um título publicado com `</body>` põe a barra
      // dentro de um <meta> e vira XSS contra o admin, que fica na mesma origem.
      // O site ainda não usa a edição visual (atributos `entry.edit`), única coisa
      // que depende da barra. Religar só quando o EmDash injetar no último
      // `</body>`. O modo 'client' é pior: injeta o script de inicialização do mesmo
      // jeito, para todos os visitantes.
      toolbar: false,
      // O admin usa as fontes do sistema: sem isso, o build baixa a Noto Sans do
      // Google Fonts e falha quando a rede falha.
      fonts: false,
      // O aviso de nova versão no admin só aparece depois de 7 dias, o mesmo
      // intervalo que o Dependabot espera (cooldown em .github/dependabot.yml).
      updateCheck: { minimumReleaseAge: '7d' },
    }),
  ],
});
