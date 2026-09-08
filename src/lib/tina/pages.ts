// Loaders Tina para as páginas editáveis (home + institucionais).
//
// Em `tinacms dev` (ou com Tina Cloud configurada) os documentos vêm do
// content API com metadados de edição; fora desse contexto (ex.: `astro
// build` puro) a query falha e usamos o JSON estático como fallback —
// o mesmo conteúdo, sem os marcadores de edição.
import { requestWithMetadata } from '@tinacms/astro/data';
import client from '../../../tina/__generated__/client';

import ptHome from '../../content/tina-pages/home/pt.json';
import enHome from '../../content/tina-pages/home/en.json';
import esHome from '../../content/tina-pages/home/es.json';
import ptSobre from '../../content/tina-pages/sobre/pt.json';
import enSobre from '../../content/tina-pages/sobre/en.json';
import esSobre from '../../content/tina-pages/sobre/es.json';
import ptEquipe from '../../content/tina-pages/equipe/pt.json';
import enEquipe from '../../content/tina-pages/equipe/en.json';
import esEquipe from '../../content/tina-pages/equipe/es.json';
import ptDocumentos from '../../content/tina-pages/documentos/pt.json';
import enDocumentos from '../../content/tina-pages/documentos/en.json';
import esDocumentos from '../../content/tina-pages/documentos/es.json';
import ptCafe from '../../content/tina-pages/cafe/pt.json';
import enCafe from '../../content/tina-pages/cafe/en.json';
import esCafe from '../../content/tina-pages/cafe/es.json';
import ptInicPesquisa from '../../content/tina-pages/inic-pesquisa/pt.json';
import enInicPesquisa from '../../content/tina-pages/inic-pesquisa/en.json';
import esInicPesquisa from '../../content/tina-pages/inic-pesquisa/es.json';
import ptInicMaterial from '../../content/tina-pages/inic-material/pt.json';
import enInicMaterial from '../../content/tina-pages/inic-material/en.json';
import esInicMaterial from '../../content/tina-pages/inic-material/es.json';
import ptInicOficinas from '../../content/tina-pages/inic-oficinas/pt.json';
import enInicOficinas from '../../content/tina-pages/inic-oficinas/en.json';
import esInicOficinas from '../../content/tina-pages/inic-oficinas/es.json';
import ptInicProjetos from '../../content/tina-pages/inic-projetos/pt.json';
import enInicProjetos from '../../content/tina-pages/inic-projetos/en.json';
import esInicProjetos from '../../content/tina-pages/inic-projetos/es.json';
import ptInicDados from '../../content/tina-pages/inic-dados/pt.json';
import enInicDados from '../../content/tina-pages/inic-dados/en.json';
import esInicDados from '../../content/tina-pages/inic-dados/es.json';
import ptInicParcerias from '../../content/tina-pages/inic-parcerias/pt.json';
import enInicParcerias from '../../content/tina-pages/inic-parcerias/en.json';
import esInicParcerias from '../../content/tina-pages/inic-parcerias/es.json';
import ptInicSolucoes from '../../content/tina-pages/inic-solucoes/pt.json';
import enInicSolucoes from '../../content/tina-pages/inic-solucoes/en.json';
import esInicSolucoes from '../../content/tina-pages/inic-solucoes/es.json';


export type TinaLang = 'pt' | 'en' | 'es';

const statics = {
  home: { pt: ptHome, en: enHome, es: esHome },
  sobre: { pt: ptSobre, en: enSobre, es: esSobre },
  equipe: { pt: ptEquipe, en: enEquipe, es: esEquipe },
  documentos: { pt: ptDocumentos, en: enDocumentos, es: esDocumentos },
  cafe: { pt: ptCafe, en: enCafe, es: esCafe },
  inic_pesquisa: { pt: ptInicPesquisa, en: enInicPesquisa, es: esInicPesquisa },
  inic_material: { pt: ptInicMaterial, en: enInicMaterial, es: esInicMaterial },
  inic_oficinas: { pt: ptInicOficinas, en: enInicOficinas, es: esInicOficinas },
  inic_projetos: { pt: ptInicProjetos, en: enInicProjetos, es: esInicProjetos },
  inic_dados: { pt: ptInicDados, en: enInicDados, es: esInicDados },
  inic_parcerias: { pt: ptInicParcerias, en: enInicParcerias, es: esInicParcerias },
  inic_solucoes: { pt: ptInicSolucoes, en: enInicSolucoes, es: esInicSolucoes },
} as const;

export function normalizeLang(lang: string): TinaLang {
  return lang === 'en' || lang === 'es' ? lang : 'pt';
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function getDoc(collection: keyof typeof statics, lang: string, fallback?: any): Promise<any> {
  const query = client.queries[collection];
  if (typeof query === 'function') {
    try {
      const res = await requestWithMetadata(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (query as any)({ relativePath: `${normalizeLang(lang)}.json` }),
        { priority: 'primary' },
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const doc = (res as any)?.data?.[collection];
      if (doc?.id) return doc;
    } catch {
      // Tina indisponível — cai para o fallback estático abaixo.
    }
  }
  return fallback ?? statics[collection][normalizeLang(lang)];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getHome(lang: string, fallback?: any): Promise<any> {
  return getDoc('home', lang, fallback);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getSobre(lang: string, fallback?: any): Promise<any> {
  return getDoc('sobre', lang, fallback);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getEquipe(lang: string, fallback?: any): Promise<any> {
  return getDoc('equipe', lang, fallback);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getDocumentos(lang: string, fallback?: any): Promise<any> {
  return getDoc('documentos', lang, fallback);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getCafe(lang: string, fallback?: any): Promise<any> {
  return getDoc('cafe', lang, fallback);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getInicPesquisa(lang: string, fallback?: any): Promise<any> {
  return getDoc('inic_pesquisa', lang, fallback);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getInicMaterial(lang: string, fallback?: any): Promise<any> {
  return getDoc('inic_material', lang, fallback);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getInicOficinas(lang: string, fallback?: any): Promise<any> {
  return getDoc('inic_oficinas', lang, fallback);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getInicProjetos(lang: string, fallback?: any): Promise<any> {
  return getDoc('inic_projetos', lang, fallback);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getInicDados(lang: string, fallback?: any): Promise<any> {
  return getDoc('inic_dados', lang, fallback);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getInicParcerias(lang: string, fallback?: any): Promise<any> {
  return getDoc('inic_parcerias', lang, fallback);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getInicSolucoes(lang: string, fallback?: any): Promise<any> {
  return getDoc('inic_solucoes', lang, fallback);
}


// O GraphQL do Tina responde com os `name` dos campos (`quem_somos`,
// `coordenacao`…), que podem diferir das chaves históricas do JSON
// (`quem-somos`, `Coordenação`…). Estes normalizadores aceitam os dois
// formatos e preservam as referências dos sub-objetos (e com elas os
// metadados de edição do Tina).

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function toSobreBlocos(doc: any): Record<string, any> {
  if (!doc) return {};
  return {
    'quem-somos': doc.quem_somos ?? doc['quem-somos'],
    objetivos: doc.objetivos,
    objetivosEspecificos: doc.objetivosEspecificos,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function toEquipeData(doc: any): any {
  if (!doc) return doc;
  const cats = doc.categorias ?? {};
  return {
    ...doc,
    categorias: {
      Coordenação: cats.coordenacao ?? cats['Coordenação'],
      Pesquisadores: cats.pesquisadores ?? cats['Pesquisadores'],
      Estagiários: cats.estagiarios ?? cats['Estagiários'],
    },
  };
}
