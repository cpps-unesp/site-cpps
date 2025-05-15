import pt from './locales/pt.json';
import en from './locales/en.json';
import es from './locales/es.json';

export const translations = { pt, en, es };
export const defaultLang = 'pt';

export function useTranslations(lang: string) {
  return function t(path: string) {
    return path.split('.').reduce((obj, key) => obj?.[key], translations[lang]) ?? path;
  };
}
