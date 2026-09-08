// tsc não resolve imports .astro; este arquivo é verificado pelo `astro check`.
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { getCollection } from 'astro:content';
import type { IslandRegistry } from '@tinacms/astro/experimental';
import type { QueryResult } from '@tinacms/astro/data';
import type { PostQuery } from '../../../tina/__generated__/types';
import PostBody from '../../components/tina/PostBody.astro';
import Hero from '../../components/Hero.astro';
import SobreBody from '../../components/tina/SobreBody.astro';
import EquipeBody from '../../components/tina/EquipeBody.astro';
import DocumentosSection from '../../components/DocumentosSection.astro';
import CafeComCienciaSection from '../../components/CafeComCienciaSection.astro';
import ProjetosPesquisaHeader from '../../components/ProjetosPesquisaHeader.astro';
import IniciativasMaterialApoioSection from '../../components/IniciativasMaterialApoioSection.astro';
import IniciativasOficinasSection from '../../components/IniciativasOficinasSection.astro';
import IniciativasProjetosSection from '../../components/IniciativasProjetosSection.astro';
import IniciativasProjetosDeDadosSection from '../../components/IniciativasProjetosDeDadosSection.astro';
import IniciativasParceiriasSection from '../../components/IniciativasParceiriasSection.astro';
import IniciativasSolucoesTecnologicasSection from '../../components/IniciativasSolucoesTecnologicasSection.astro';
import { getTranslations } from '../../utils/i18n';
import { getPost } from './data';
import {
  getCafe,
  getDocumentos,
  getEquipe,
  getHome,
  getInicDados,
  getInicMaterial,
  getInicOficinas,
  getInicParcerias,
  getInicPesquisa,
  getInicProjetos,
  getInicSolucoes,
  getSobre,
  normalizeLang,
} from './pages';

const langOf = (params: URLSearchParams) => normalizeLang(params.get('lang') ?? 'pt');

async function membroSlugs(lang: string): Promise<string[]> {
  const entries = await getCollection('membros', ({ data }) => data.draft !== true);
  return entries
    .filter((entry) => entry.id.endsWith(`.${lang}.mdx`))
    .map((entry) => entry.id.split('/').pop()?.replace(/\.(pt|en|es)\.mdx$/, '') ?? '');
}

export const islands: IslandRegistry = {
  post: {
    fetch: (_request, params) => getPost(params.get('slug') ?? 'hello-world'),
    component: PostBody,
    wrapper: { tag: 'article' },
    propsFromData: (data) => ({
      data: (data as QueryResult<PostQuery>).data?.post,
    }),
  },
  home: {
    fetch: (_request, params) => getHome(langOf(params)),
    component: Hero,
    wrapper: { tag: 'div', className: 'contents' },
    propsFromData: (data, params) => ({
      heroData: data,
      lang: langOf(params),
    }),
  },
  sobre: {
    fetch: (_request, params) => getSobre(langOf(params)),
    component: SobreBody,
    wrapper: { tag: 'div', className: 'contents' },
    propsFromData: (data) => ({
      data,
    }),
  },
  equipe: {
    fetch: async (_request, params) => {
      const lang = langOf(params);
      return {
        doc: await getEquipe(lang),
        texts: getTranslations(lang).texts,
        lang,
        membroSlugs: await membroSlugs(lang),
      };
    },
    component: EquipeBody,
    wrapper: { tag: 'div', className: 'contents' },
    propsFromData: (data) => {
      const d = data as {
        doc: unknown;
        texts: unknown;
        lang: string;
        membroSlugs: string[];
      };
      return {
        data: d.doc,
        texts: d.texts,
        lang: d.lang,
        membroSlugs: d.membroSlugs,
      };
    },
  },
  documentos: {
    fetch: (_request, params) => getDocumentos(langOf(params)),
    component: DocumentosSection,
    wrapper: { tag: 'div', className: 'contents' },
    propsFromData: (data, params) => ({
      documentos: data,
      lang: langOf(params),
    }),
  },

  cafe: {
    fetch: (_request, params) => getCafe(langOf(params)),
    component: CafeComCienciaSection,
    wrapper: { tag: 'div', className: 'contents' },
    propsFromData: (data, params) => ({
      cafe: data,
      lang: langOf(params),
    }),
  },
  pesquisa: {
    fetch: (_request, params) => getInicPesquisa(langOf(params)),
    component: ProjetosPesquisaHeader,
    wrapper: { tag: 'div', className: 'contents' },
    propsFromData: (data) => ({
      data,
    }),
  },
  material: {
    fetch: (_request, params) => getInicMaterial(langOf(params)),
    component: IniciativasMaterialApoioSection,
    wrapper: { tag: 'div', className: 'contents' },
    propsFromData: (data) => ({
      data,
    }),
  },
  oficinas: {
    fetch: (_request, params) => getInicOficinas(langOf(params)),
    component: IniciativasOficinasSection,
    wrapper: { tag: 'div', className: 'contents' },
    propsFromData: (data) => ({
      data,
    }),
  },
  projetos: {
    fetch: (_request, params) => getInicProjetos(langOf(params)),
    component: IniciativasProjetosSection,
    wrapper: { tag: 'div', className: 'contents' },
    propsFromData: (data) => ({
      data,
    }),
  },
  dados: {
    fetch: (_request, params) => getInicDados(langOf(params)),
    component: IniciativasProjetosDeDadosSection,
    wrapper: { tag: 'div', className: 'contents' },
    propsFromData: (data) => ({
      data,
    }),
  },
  parcerias: {
    fetch: (_request, params) => getInicParcerias(langOf(params)),
    component: IniciativasParceiriasSection,
    wrapper: { tag: 'div', className: 'contents' },
    propsFromData: (data) => ({
      data,
    }),
  },
  solucoes: {
    fetch: (_request, params) => getInicSolucoes(langOf(params)),
    component: IniciativasSolucoesTecnologicasSection,
    wrapper: { tag: 'div', className: 'contents' },
    propsFromData: (data) => ({
      data,
    }),
  },
};
