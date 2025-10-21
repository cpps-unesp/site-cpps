import routeTranslations from '../i18n/routeTranslations';
import type { SupportedLang } from '../i18n/routeTranslations';

/**
 * Obtém a versão traduzida de uma rota.
 *
 * @param originalKey - A chave original da rota.
 * @param lang - Idioma de destino.
 * @returns A rota traduzida ou a original.
 */
export function getTranslatedPath(
  originalKey: keyof typeof routeTranslations,
  lang: SupportedLang
): string {
  return routeTranslations[originalKey]?.[lang] ?? originalKey;
}
