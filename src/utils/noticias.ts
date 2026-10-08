import { getEmDashCollection, getEmDashEntry, getTerm } from 'emdash';
import type { EditProxy, PortableTextBlock } from 'emdash';
import routeTranslations from '../i18n/routeTranslations';
import type { SupportedLang } from '../types/lang';
import type { Imagem } from './conteudo';

// Notícias vêm do EmDash (coleção `noticias`, definida em seed/seed.json) e são
// renderizadas sob demanda: o que é publicado no admin aparece no próximo acesso.
// Cada idioma é uma tradução da notícia no EmDash.

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
  image: Imagem;
  imageAlt: string;
  tags: NoticiaTag[];
  author: string;
  featured: boolean;
  content: PortableTextBlock[];
  // Edição visual (ver `edicao` em ./conteudo): as listas só trazem notícias no
  // idioma da página; a página da notícia descarta a anotação quando mostra a
  // versão em pt por falta de tradução.
  edit: EditProxy;
};

type NoticiaEntry = NonNullable<Awaited<ReturnType<typeof getEmDashEntry<'noticias'>>>['entry']>;

function isSupportedLang(value: string | undefined): value is SupportedLang {
  return LANGS.includes(value as SupportedLang);
}

function toNoticia(entry: NoticiaEntry): Noticia {
  const { data } = entry;
  const locale = (data as { locale?: string }).locale;
  return {
    // Nunca `entry.id`: desde o EmDash 1.2 ele leva o prefixo do idioma (en/<slug>).
    slug: data.slug ?? data.id,
    title: data.title,
    date: new Date(data.date),
    lang: isSupportedLang(locale) ? locale : 'pt',
    resumo: data.resumo,
    image: data.image ?? IMAGEM_PADRAO,
    imageAlt: data.image?.alt || data.title,
    tags: (data.terms?.[TAXONOMIA_TAGS] ?? []).map(({ slug, label }) => ({ slug, label })),
    author: data.author?.trim() || AUTOR_PADRAO,
    featured: data.featured ?? false,
    content: data.content ?? [],
    edit: entry.edit,
  };
}

async function listNoticias(lang: SupportedLang) {
  const { entries, error } = await getEmDashCollection('noticias', {
    locale: lang,
    orderBy: { date: 'desc' },
  });
  return { noticias: entries.map(toNoticia), error };
}

// O slug vem do admin e o EmDash não restringe os caracteres: codifica para a URL.
export function getNoticiaUrl(slug: string, lang: SupportedLang): string {
  return `/${lang}/${routeTranslations.noticias[lang]}/${encodeURIComponent(slug)}`;
}

export function getNoticiaCategoriaUrl(tagSlug: string, lang: SupportedLang): string {
  return `/${lang}/${routeTranslations.noticias[lang]}/categoria/${encodeURIComponent(tagSlug)}`;
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
  | { kind: 'list'; lang: SupportedLang; noticias: Noticia[]; tag: NoticiaTag | null }
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
  slugParam: string | undefined
): Promise<NoticiasRoute> {
  if (!isSupportedLang(langParam)) return { kind: 'not-found' };
  const lang = langParam;
  const slugParts = (slugParam ?? '').split('/').filter(Boolean);

  const expectedSegment = routeTranslations.noticias[lang];
  if (segment !== expectedSegment) {
    return { kind: 'redirect', location: `/${lang}/${expectedSegment}/${slugParts.join('/')}` };
  }

  const { noticias, error } = await listNoticias(lang);
  if (error) return { kind: 'error', error };

  if (slugParts.length === 0) {
    return { kind: 'list', lang, noticias, tag: null };
  }

  if (slugParts.length === 2 && slugParts[0] === 'categoria') {
    // Só etiquetas que existem no EmDash; sem isso, qualquer texto na URL virava
    // título de página com status 200. O getTerm cai para pt sem tradução.
    try {
      const termo = await getTerm(TAXONOMIA_TAGS, slugParts[1], {
        locale: lang,
        includeCounts: false,
      });
      if (!termo) return { kind: 'not-found' };
      return { kind: 'list', lang, noticias, tag: { slug: termo.slug, label: termo.label } };
    } catch (erro) {
      return { kind: 'error', error: erro instanceof Error ? erro : new Error(String(erro)) };
    }
  }

  if (slugParts.length !== 1) return { kind: 'not-found' };

  // Sem tradução no idioma pedido, o EmDash devolve a versão em pt.
  const { entry, error: entryError, isPreview } = await getEmDashEntry('noticias', slugParts[0], {
    locale: lang,
  });
  if (entryError) return { kind: 'error', error: entryError };
  if (!entry) return { kind: 'not-found' };

  return {
    kind: 'detail',
    lang,
    noticia: toNoticia(entry),
    noticiasDoIdioma: noticias,
    isPreview,
  };
}

// Sem tradução, a notícia em pt também é servida em /en/ e /es/ (com aviso), como
// na versão estática do site, e o hreflang de cada página aponta para lá: essas
// URLs entram no sitemap. Uma falha ao ler o EmDash sobe como erro, em vez de
// tirar as notícias do sitemap em silêncio.
export async function getNoticiasSitemapPaths(): Promise<string[]> {
  const paths: string[] = [];
  const emPt = await listNoticias('pt');
  if (emPt.error) throw emPt.error;
  for (const lang of LANGS) {
    const doIdioma = lang === 'pt' ? emPt : await listNoticias(lang);
    if (doIdioma.error) throw doIdioma.error;
    const noticias = [...emPt.noticias, ...doIdioma.noticias];
    paths.push(`/${lang}/${routeTranslations.noticias[lang]}`);
    for (const slug of new Set(noticias.map((noticia) => noticia.slug))) {
      paths.push(getNoticiaUrl(slug, lang));
    }
    for (const tagSlug of new Set(noticias.flatMap((noticia) => noticia.tags.map((tag) => tag.slug)))) {
      paths.push(getNoticiaCategoriaUrl(tagSlug, lang));
    }
  }
  return paths;
}
