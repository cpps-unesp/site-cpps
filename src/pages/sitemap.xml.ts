export const prerender = true;

import { getCollection } from 'astro:content';
import type { SupportedLang } from '../types/lang';
import {
  buildLocalizedContentPaths,
  buildMembroPaths,
  buildNewsCategoryPaths,
  buildRouteTranslationPaths,
  getMembroSlugFromEntryId,
} from '../utils/catchAllRouting';

export async function GET() {
  const base = 'https://cpps.franca.unesp.br';
  const langs: SupportedLang[] = ['pt', 'en', 'es'];
  const urls = new Set<string>();

  for (const lang of langs) {
    urls.add(`/${lang}/`);
    urls.add(`/${lang}/atividades`);
  }

  for (const path of buildRouteTranslationPaths(langs)) {
    urls.add(`/${path.params.lang}/${path.params.slug}`);
  }

  const noticias = await getCollection('noticias');
  const noticiaSlugs = [...new Set(noticias.map((entry) => entry.slug))];
  for (const path of buildLocalizedContentPaths(langs, 'noticias', noticiaSlugs)) {
    urls.add(`/${path.params.lang}/${path.params.slug}`);
  }

  const tags = [...new Set(noticias.flatMap((entry) => entry.data.tags || []))];
  for (const path of buildNewsCategoryPaths(langs, tags)) {
    urls.add(`/${path.params.lang}/${path.params.slug}`);
  }

  const publicacoes = await getCollection('publicacoes');
  const publicationSlugs = [
    ...new Set(publicacoes.map((entry) => entry.slug || entry.id.replace(/\.[^/.]+$/, ''))),
  ];
  for (const path of buildLocalizedContentPaths(langs, 'publicacao', publicationSlugs)) {
    urls.add(`/${path.params.lang}/${path.params.slug}`);
  }

  const membros = await getCollection('membros');
  const memberSlugs = [...new Set(membros.map((entry) => getMembroSlugFromEntryId(entry.id)))];
  for (const path of buildMembroPaths(langs, memberSlugs)) {
    urls.add(`/${path.params.lang}/${path.params.slug}`);
  }

  const atividades = await getCollection('atividades');
  for (const lang of langs) {
    for (const entry of atividades) {
      urls.add(`/${lang}/atividades/${entry.slug}`);
    }
  }

  const xmlItems = [...urls]
    .sort((a, b) => a.localeCompare(b, 'pt-BR'))
    .map((path) => {
      const normalizedPath = path.endsWith('/') ? path : `${path}/`;
      const priority = normalizedPath.split('/').filter(Boolean).length <= 1 ? '1.0' : '0.8';
      return `
      <url>
        <loc>${base}${normalizedPath}</loc>
        <changefreq>weekly</changefreq>
        <priority>${priority}</priority>
      </url>`;
    });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${xmlItems.join('\n')}
  </urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml'
    }
  });
}
