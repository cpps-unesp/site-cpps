import type { CollectionEntry } from 'astro:content';
import routeTranslations from '../i18n/routeTranslations';
import type { SupportedLang } from '../types/lang';

export function getNoticiaSlug(post: CollectionEntry<'noticias'>): string {
  return post.data.slug || post.id.replace(/\.[^/.]+$/, '');
}

export function getNoticiaUrl(post: CollectionEntry<'noticias'>, lang: SupportedLang): string {
  return `/${lang}/${routeTranslations.noticias[lang]}/${getNoticiaSlug(post)}`;
}
