// Sob demanda para incluir as notícias publicadas no EmDash.
export const prerender = false;

import { getCollection } from 'astro:content';
import type { SupportedLang } from '../types/lang';
import {
  buildMembroPaths,
  buildRouteTranslationPaths,
  getMembroSlugFromEntryId,
} from '../utils/catchAllRouting';
import { getNoticiasSitemapPaths } from '../utils/noticias';
import routeTranslations from '../i18n/routeTranslations';
import { filterVisibleDocsEntries, getDocsEntrySlug } from '../utils/docsVisibility';

export async function GET() {
  const base = 'https://cpps.franca.unesp.br';
  const langs: SupportedLang[] = ['pt', 'en', 'es'];
  const urls = new Set<string>();

  const atividades = filterVisibleDocsEntries(await getCollection('atividades'));
  const atendimento = filterVisibleDocsEntries(await getCollection('atendimento'));
  const editarSite = filterVisibleDocsEntries(await getCollection('editarSite'));

  // Seções despublicadas não têm página de entrada: só entram no sitemap
  // quando voltarem a ter conteúdo visível.
  for (const lang of langs) {
    urls.add(`/${lang}/`);

    if (atendimento.length > 0) {
      urls.add(`/${lang}/${routeTranslations.atendimento[lang]}`);
    }
    if (editarSite.length > 0) {
      urls.add(`/${lang}/${routeTranslations['editar-site'][lang]}`);
    }
    if (atividades.length > 0) {
      urls.add(`/${lang}/atividades`);
      urls.add(`/${lang}/wiki`);
    }
  }

  for (const path of buildRouteTranslationPaths(langs)) {
    urls.add(`/${path.params.lang}/${path.params.slug}`);
  }

  for (const path of await getNoticiasSitemapPaths()) {
    urls.add(path);
  }

  const membros = await getCollection('membros', ({ data }) => data.draft !== true);
  const memberSlugs = [...new Set(membros.map((entry) => getMembroSlugFromEntryId(entry.id)))];
  for (const path of buildMembroPaths(langs, memberSlugs)) {
    urls.add(`/${path.params.lang}/${path.params.slug}`);
  }

  for (const lang of langs) {
    for (const entry of atividades) {
      const slug = getDocsEntrySlug(entry, lang);
      if (slug === 'index') continue;
      urls.add(`/${lang}/wiki/${slug}`);
    }
  }

  for (const lang of langs) {
    const basePath = `/${lang}/${routeTranslations.atendimento[lang]}`;
    for (const entry of atendimento) {
      const slug = getDocsEntrySlug(entry, lang);
      if (slug === 'index') continue;
      urls.add(`${basePath}/${slug}`);
    }
  }

  for (const lang of langs) {
    const basePath = `/${lang}/${routeTranslations['editar-site'][lang]}`;
    for (const entry of editarSite) {
      const slug = getDocsEntrySlug(entry, lang);
      if (slug === 'index') continue;
      urls.add(`${basePath}/${slug}`);
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
      'Content-Type': 'application/xml',
    },
  });
}
