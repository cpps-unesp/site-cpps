import routeTranslations from '../i18n/routeTranslations';
import type { SupportedLang } from '../types/lang';

type RoutePath = { params: { lang: SupportedLang; slug: string } };

export function buildRouteTranslationPaths(langs: SupportedLang[]): RoutePath[] {
  const paths: RoutePath[] = [];
  const catchAllRouteKeys: Array<keyof typeof routeTranslations> = [
    'iniciativas/projetos',
    'iniciativas/projetos-de-pesquisa',
    'iniciativas/projetos-de-dados',
    'iniciativas/cafe-com-ciencia',
    'iniciativas/material-de-apoio',
    'iniciativas/oficinas',
    'iniciativas/solucoes-tecnologicas',
    'iniciativas/parcerias',
    'institucional/sobre',
    'institucional/equipe',
    'institucional/documentos',
  ];

  for (const routeKey of catchAllRouteKeys) {
    const traducoes = routeTranslations[routeKey];
    for (const lang of langs) {
      const slugValue = traducoes[lang];
      if (typeof slugValue === 'string') {
        paths.push({ params: { lang, slug: slugValue } });
      }
    }
  }

  return paths;
}

export function getMembroSlugFromEntryId(entryId: string): string {
  const fileName = entryId.split('/').pop() ?? '';
  return fileName.replace(/\.(pt|en|es)\.mdx$/, '');
}

export function buildMembroPaths(langs: SupportedLang[], memberSlugs: string[]): RoutePath[] {
  return memberSlugs.flatMap((slug) =>
    langs.map((lang) => ({
      params: { lang, slug },
    }))
  );
}

export function findOriginalKey(translatedSlug: string, lang: SupportedLang): string | null {
  for (const [key, translations] of Object.entries(routeTranslations)) {
    if (translations[lang] === translatedSlug) {
      return key;
    }
  }
  return null;
}
