import slugify from 'slugify';
import routeTranslations from '../i18n/routeTranslations';
import type { SupportedLang } from '../types/lang';

type RoutePath = { params: { lang: SupportedLang; slug: string } };

export function buildRouteTranslationPaths(langs: SupportedLang[]): RoutePath[] {
  const paths: RoutePath[] = [];

  for (const traducoes of Object.values(routeTranslations)) {
    for (const lang of langs) {
      const slugValue = traducoes[lang];
      if (typeof slugValue === 'string') {
        paths.push({ params: { lang, slug: slugValue } });
      }
    }
  }

  return paths;
}

export function buildLocalizedContentPaths(
  langs: SupportedLang[],
  routeKey: 'noticias' | 'publicacao',
  slugs: string[],
): RoutePath[] {
  const paths: RoutePath[] = [];

  for (const slug of slugs) {
    for (const lang of langs) {
      const prefix = routeTranslations[routeKey][lang];
      paths.push({
        params: {
          lang,
          slug: `${prefix}/${slug}`,
        },
      });
    }
  }

  return paths;
}

export function buildNewsCategoryPaths(langs: SupportedLang[], tags: string[]): RoutePath[] {
  const paths: RoutePath[] = [];

  for (const lang of langs) {
    const prefix = routeTranslations.noticias[lang];
    for (const tag of tags) {
      const tagSlug = slugify(tag, { lower: true, strict: true });
      paths.push({
        params: {
          lang,
          slug: `${prefix}/categoria/${tagSlug}`,
        },
      });
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
    })),
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
