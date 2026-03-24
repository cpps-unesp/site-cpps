import type { SupportedLang } from '../types/lang';
import { stripBaseFromPathname } from './basePath';

export function getLangFromUrl(url: URL): SupportedLang {
  const supportedLangs: SupportedLang[] = ['pt', 'en', 'es'];
  const pathnameWithoutBase = stripBaseFromPathname(url.pathname, import.meta.env.BASE_URL);
  const pathParts = pathnameWithoutBase.split('/').filter(Boolean);

  const lang = pathParts[0] as SupportedLang;

  return supportedLangs.includes(lang) ? lang : 'pt';
}
