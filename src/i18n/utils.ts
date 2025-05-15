import { defaultLang, translations } from './translations';

export function getLangFromUrl(url: URL): string {
  const [, lang] = url.pathname.split('/');
  return lang in translations ? lang : defaultLang;
}
