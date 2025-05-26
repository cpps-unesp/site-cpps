export const prerender = true;

export async function GET() {
  const base = 'https://cpps.franca.unesp.br';  // ✅ Altere para a URL real

  const langs = ['pt', 'en', 'es'];
  const paths = [
    '', // home
    'institucional/sobre',
    'iniciativas/projetos',
    'noticias'
  ];

  const urls = langs.flatMap(lang => 
    paths.map(path => 
      `<url>
        <loc>${base}/${lang}/${path}</loc>
        <changefreq>weekly</changefreq>
        <priority>${path === '' ? '1.0' : '0.8'}</priority>
      </url>`
    )
  );

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls.join('\n')}
  </urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml'
    }
  });
}
