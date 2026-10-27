import routeTranslations from '../i18n/routeTranslations';
import type { SupportedLang } from '../types/lang';
import { getNoticiaUrl } from './noticias';

type RoutePath = { params: { lang: SupportedLang; slug: string } };

export function buildRouteTranslationPaths(langs: SupportedLang[]): RoutePath[] {
  const paths: RoutePath[] = [];
  const catchAllRouteKeys: Array<keyof typeof routeTranslations> = [
    'iniciativas/projetos',
    'iniciativas/projetos-de-pesquisa',
    'iniciativas/projetos-de-dados',
    'iniciativas/cafe-com-ciencia',
    'iniciativas/material-de-apoio',
    'iniciativas/oficinas',
    'iniciativas/solucoes-tecnologicas',
    'iniciativas/parcerias',
    'institucional/sobre',
    'institucional/equipe',
    'institucional/documentos',
  ];

  for (const routeKey of catchAllRouteKeys) {
    const traducoes = routeTranslations[routeKey];
    for (const lang of langs) {
      const slugValue = traducoes[lang];
      if (typeof slugValue === 'string') {
        paths.push({ params: { lang, slug: slugValue } });
      }
    }
  }

  return paths;
}

export function getMembroSlugFromEntryId(entryId: string): string {
  const fileName = entryId.split('/').pop() ?? '';
  return fileName.replace(/\.(pt|en|es)\.mdx$/, '');
}

export function buildMembroPaths(langs: SupportedLang[], memberSlugs: string[]): RoutePath[] {
  return memberSlugs.flatMap((slug) =>
    langs.map((lang) => ({
      params: { lang, slug },
    }))
  );
}

export function findOriginalKey(translatedSlug: string, lang: SupportedLang): string | null {
  for (const [key, translations] of Object.entries(routeTranslations)) {
    if (translations[lang] === translatedSlug) {
      return key;
    }
  }
  return null;
}

// Rota de cada entrada da coleção `paginas` do EmDash ('' é a Home).
const ROTA_DA_PAGINA: Record<string, string> = {
  home: '',
  equipe: 'institucional/equipe',
  documentos: 'institucional/documentos',
  'cafe-com-ciencia': 'iniciativas/cafe-com-ciencia',
  'projetos-de-pesquisa': 'iniciativas/projetos-de-pesquisa',
};

// Links "Visualização ao vivo" e de pré-visualização do admin do EmDash. Ele monta a
// URL com o urlPattern da coleção (seed/seed.json), escrito com o caminho em pt, e
// só põe o idioma na frente fora do pt, porque o roteamento do Astro é manual:
// /pt/equipe, /en/pt/institucional/equipe#<slug>, /es/pt/noticias/<slug>.
// Devolve a página de verdade no idioma, ou null se o caminho não veio do admin.
export function getCaminhoDoAdmin(lang: SupportedLang, slugPath: string): string | null {
  const caminho = slugPath.replace(/\/+$/, '');
  const emPt = lang === 'pt' ? caminho : caminho.replace(/^pt\//, '');
  if (lang !== 'pt' && emPt === caminho) return null;

  const noticia = /^noticias\/([^/]+)$/.exec(emPt);
  if (noticia) return lang === 'pt' ? null : getNoticiaUrl(noticia[1], lang);

  const chave = emPt in ROTA_DA_PAGINA ? ROTA_DA_PAGINA[emPt] : lang === 'pt' ? null : emPt;
  if (chave === null) return null;
  if (chave === '') return `/${lang}/`;
  const destino = routeTranslations[chave]?.[lang];
  return destino ? `/${lang}/${destino}/` : null;
}
