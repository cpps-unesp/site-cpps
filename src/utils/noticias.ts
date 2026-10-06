import { getEmDashCollection, getEmDashEntry } from 'emdash';
import type { PortableTextBlock } from 'emdash';
import routeTranslations from '../i18n/routeTranslations';
import type { SupportedLang } from '../types/lang';

// Notícias vêm do EmDash (coleção `noticias`, definida em seed/seed.json) e são
// renderizadas sob demanda: o que é publicado no admin aparece no próximo acesso.

const LANGS: SupportedLang[] = ['pt', 'en', 'es'];
const TAXONOMIA_TAGS = 'tag';
const IMAGEM_PADRAO = '/imagens/campus/entrada-unesp-franca2.jpg';
const AUTOR_PADRAO = 'Equipe CPPS';

export type NoticiaTag = { slug: string; label: string };

export type Noticia = {
  slug: string;
  title: string;
  date: Date;
  lang: SupportedLang;
  resumo: string;
  image: string;
  imageAlt: string;
  tags: NoticiaTag[];
  author: string;
  featured: boolean;
  content: PortableTextBlock[];
};

type NoticiaEntry = NonNullable<Awaited<ReturnType<typeof getEmDashEntry<'noticias'>>>['entry']>;

// Resolve a URL pública de um arquivo do storage do EmDash (local, S3, R2...).
export type MediaUrlResolver = ((storageKey: string) => string) | undefined;

function isSupportedLang(value: string | undefined): value is SupportedLang {
  return LANGS.includes(value as SupportedLang);
}

function getImageUrl(image: NoticiaEntry['data']['image'], resolveMedia: MediaUrlResolver): string {
  if (!image) return IMAGEM_PADRAO;
  const storageKey = typeof image.meta?.storageKey === 'string' ? image.meta.storageKey : '';
  if (storageKey) {
    return resolveMedia ? resolveMedia(storageKey) : `/_emdash/api/media/file/${storageKey}`;
  }
  return image.src || IMAGEM_PADRAO;
}

function toNoticia(entry: NoticiaEntry, resolveMedia: MediaUrlResolver): Noticia {
  const { data } = entry;
  return {
    slug: data.slug ?? entry.id,
    title: data.title,
    date: new Date(data.date),
    lang: data.lang,
    resumo: data.resumo,
    image: getImageUrl(data.image, resolveMedia),
    imageAlt: data.image?.alt || data.title,
    tags: (data.terms?.[TAXONOMIA_TAGS] ?? []).map(({ slug, label }) => ({ slug, label })),
    author: data.author?.trim() || AUTOR_PADRAO,
    featured: data.featured ?? false,
    content: data.content ?? [],
  };
}

async function listNoticias(lang: SupportedLang, resolveMedia: MediaUrlResolver) {
  const { entries, error } = await getEmDashCollection('noticias', {
    where: { lang },
    orderBy: { date: 'desc' },
  });
  return { noticias: entries.map((entry) => toNoticia(entry, resolveMedia)), error };
}

export function getNoticiaUrl(slug: string, lang: SupportedLang): string {
  return `/${lang}/${routeTranslations.noticias[lang]}/${slug}`;
}

export function getNoticiaCategoriaUrl(tagSlug: string, lang: SupportedLang): string {
  return `/${lang}/${routeTranslations.noticias[lang]}/categoria/${tagSlug}`;
}

export function formatNoticiaDate(
  date: Date,
  lang: SupportedLang,
  options: Intl.DateTimeFormatOptions = {}
): string {
  const locale = lang === 'pt' ? 'pt-BR' : lang === 'es' ? 'es-ES' : 'en-US';
  return date.toLocaleDateString(locale, { timeZone: 'America/Sao_Paulo', ...options });
}

export type NoticiasRoute =
  | { kind: 'list'; lang: SupportedLang; noticias: Noticia[]; tag: string | null }
  | {
      kind: 'detail';
      lang: SupportedLang;
      noticia: Noticia;
      noticiasDoIdioma: Noticia[];
      isPreview: boolean;
    }
  | { kind: 'redirect'; location: string }
  | { kind: 'not-found' }
  | { kind: 'error'; error: Error };

// Interpreta /[lang]/<noticias|news>/[...slug]:
//   []                    -> lista
//   ['categoria', <tag>]  -> lista filtrada pela categoria
//   [<slug>]              -> notícia
export async function resolveNoticiasRoute(
  langParam: string | undefined,
  segment: string,
  slugParam: string | undefined,
  resolveMedia: MediaUrlResolver
): Promise<NoticiasRoute> {
  if (!isSupportedLang(langParam)) return { kind: 'not-found' };
  const lang = langParam;
  const slugParts = (slugParam ?? '').split('/').filter(Boolean);

  const expectedSegment = routeTranslations.noticias[lang];
  if (segment !== expectedSegment) {
    return { kind: 'redirect', location: `/${lang}/${expectedSegment}/${slugParts.join('/')}` };
  }

  const { noticias, error } = await listNoticias(lang, resolveMedia);
  if (error) return { kind: 'error', error };

  if (slugParts.length === 0) {
    return { kind: 'list', lang, noticias, tag: null };
  }

  if (slugParts.length === 2 && slugParts[0] === 'categoria') {
    return { kind: 'list', lang, noticias, tag: slugParts[1] };
  }

  if (slugParts.length !== 1) return { kind: 'not-found' };

  const { entry, error: entryError, isPreview } = await getEmDashEntry('noticias', slugParts[0]);
  if (entryError) return { kind: 'error', error: entryError };
  if (!entry) return { kind: 'not-found' };

  return {
    kind: 'detail',
    lang,
    noticia: toNoticia(entry, resolveMedia),
    noticiasDoIdioma: noticias,
    isPreview,
  };
}

export async function getNoticiasSitemapPaths(): Promise<string[]> {
  const paths: string[] = [];
  for (const lang of LANGS) {
    paths.push(`/${lang}/${routeTranslations.noticias[lang]}`);
    const { noticias } = await listNoticias(lang, undefined);
    for (const noticia of noticias) {
      paths.push(getNoticiaUrl(noticia.slug, lang));
    }
    const tagSlugs = new Set(noticias.flatMap((noticia) => noticia.tags.map((tag) => tag.slug)));
    for (const tagSlug of tagSlugs) {
      paths.push(getNoticiaCategoriaUrl(tagSlug, lang));
    }
  }
  return paths;
}
