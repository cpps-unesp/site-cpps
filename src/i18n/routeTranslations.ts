import routesJson from './routes';
import type { SupportedLang } from '../types/lang';

export interface Langs {
  pt: string;
  en: string;
  es: string;
}

export interface RouteTranslations {
  [key: string]: Langs;
}

const routeTranslations = routesJson as RouteTranslations;

export default routeTranslations;

export type { SupportedLang };
