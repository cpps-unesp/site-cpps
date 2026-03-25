import type { SupportedLang } from '../types/lang';

export function getLangFromUrl(url: URL): SupportedLang {
  const supportedLangs: SupportedLang[] = ['pt', 'en', 'es'];

  const pathParts = url.pathname.split('/').filter(Boolean);

  const lang = pathParts[0] as SupportedLang;

  return supportedLangs.includes(lang) ? lang : 'pt';
}
