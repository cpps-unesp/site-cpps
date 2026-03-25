import routeTranslations from '../i18n/routeTranslations';
import type { SupportedLang } from '../types/lang';
import { normalizeLegacyAtividadesSlug } from './wikiLegacyAliases';

export function resolveAtividadesLegacyPath(
  lang: SupportedLang,
  rawSlug: string,
  validSlugs: Set<string>
): string | null {
  const normalizedSlug = normalizeLegacyAtividadesSlug(rawSlug);

  if (!normalizedSlug) {
    return null;
  }

  if (normalizedSlug === 'equipe') {
    return `/${lang}/${routeTranslations['institucional/equipe'][lang]}`;
  }

  if (validSlugs.has(normalizedSlug)) {
    const suffix = normalizedSlug === 'index' ? '' : `/${normalizedSlug}`;
    return `/${lang}/wiki${suffix}`;
  }

  return null;
}
