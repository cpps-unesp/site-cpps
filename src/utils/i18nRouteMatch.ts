import routeTranslations from '../i18n/routeTranslations';
import type { SupportedLang } from '../types/lang';

type RouteKey = keyof typeof routeTranslations;

export interface RouteMatch {
  key: RouteKey;
  prefix: string;
  remainder: string;
}

export function isSupportedLang(value: string): value is SupportedLang {
  return value === 'pt' || value === 'en' || value === 'es';
}

export function getRouteMatch(path: string, sourceLang: SupportedLang): RouteMatch | null {
  const keys = Object.keys(routeTranslations) as RouteKey[];
  let bestMatch: RouteMatch | null = null;

  for (const key of keys) {
    const prefix = routeTranslations[key][sourceLang];
    if (path === prefix || path.startsWith(`${prefix}/`)) {
      const remainder = path.slice(prefix.length).replace(/^\//, '');
      if (!bestMatch || prefix.length > bestMatch.prefix.length) {
        bestMatch = { key, prefix, remainder };
      }
    }
  }

  return bestMatch;
}

export function translatePathBetweenLangs(
  path: string,
  sourceLang: SupportedLang,
  targetLang: SupportedLang
): string {
  const match = getRouteMatch(path, sourceLang);
  if (!match) return path;

  const translatedPrefix = routeTranslations[match.key][targetLang];
  return `${translatedPrefix}${match.remainder ? `/${match.remainder}` : ''}`;
}

export function getLocalizedPathFromPathname(pathname: string, targetLang: SupportedLang): string {
  const pathParts = pathname.split('/').filter(Boolean);
  const maybeLang = pathParts[0];
  const sourceLang = isSupportedLang(maybeLang) ? maybeLang : null;
  const currentPath = sourceLang ? pathParts.slice(1).join('/') : pathParts.join('/');

  const translatedPath = sourceLang
    ? translatePathBetweenLangs(currentPath, sourceLang, targetLang)
    : currentPath;

  return (
    `/${targetLang}/${translatedPath}`.replace(/\/+/g, '/').replace(/\/$/, '/') || `/${targetLang}/`
  );
}
