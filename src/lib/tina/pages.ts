// Loaders Tina para as páginas editáveis (home + institucionais).
//
// Em `tinacms dev` (ou com Tina Cloud configurada) os documentos vêm do
// content API com metadados de edição; fora desse contexto (ex.: `astro
// build` puro) a query falha e usamos o JSON estático como fallback —
// o mesmo conteúdo, sem os marcadores de edição.
import { requestWithMetadata } from '@tinacms/astro/data';
import client from '../../../tina/__generated__/client';

import homeDoc from '../../content/tina-pages/home/index.json';
import sobreDoc from '../../content/tina-pages/sobre/index.json';
import equipeDoc from '../../content/tina-pages/equipe/index.json';
import documentosDoc from '../../content/tina-pages/documentos/index.json';
import cafeDoc from '../../content/tina-pages/cafe/index.json';
import inicPesquisaDoc from '../../content/tina-pages/inic-pesquisa/index.json';
import inicMaterialDoc from '../../content/tina-pages/inic-material/index.json';
import inicOficinasDoc from '../../content/tina-pages/inic-oficinas/index.json';
import inicProjetosDoc from '../../content/tina-pages/inic-projetos/index.json';
import inicDadosDoc from '../../content/tina-pages/inic-dados/index.json';
import inicParceriasDoc from '../../content/tina-pages/inic-parcerias/index.json';
import inicSolucoesDoc from '../../content/tina-pages/inic-solucoes/index.json';


export type TinaLang = 'pt' | 'en' | 'es';
export type Localized = { pt: string; en: string; es: string };

export function normalizeLang(lang: string): TinaLang {
  return lang === 'en' || lang === 'es' ? lang : 'pt';
}

// Collections já migradas para o schema field-based: 1 documento fixo
// (`index.json`), sem depender de `lang` para o `relativePath`. Cada campo
// de texto já vem como {pt,en,es} com metadados do Tina preservados — quem
// resolve o idioma é o componente, não este loader (ver plano de migração).
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function getFieldBasedDoc(collection: string, fallback: any): Promise<any> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const query = (client.queries as any)[collection];
  if (typeof query === 'function') {
    try {
      const res = await requestWithMetadata(
        query({ relativePath: 'index.json' }),
        { priority: 'primary' },
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const doc = (res as any)?.data?.[collection];
      if (doc?.id) return doc;
    } catch {
      // Tina indisponível — cai para o fallback estático abaixo.
    }
  }
  return fallback;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getHome(_lang: string, fallback?: any): Promise<any> {
  return getFieldBasedDoc('home', fallback ?? homeDoc);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getSobre(_lang: string, fallback?: any): Promise<any> {
  return getFieldBasedDoc('sobre', fallback ?? sobreDoc);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getEquipe(_lang: string, fallback?: any): Promise<any> {
  return getFieldBasedDoc('equipe', fallback ?? equipeDoc);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getDocumentos(_lang: string, fallback?: any): Promise<any> {
  return getFieldBasedDoc('documentos', fallback ?? documentosDoc);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getCafe(_lang: string, fallback?: any): Promise<any> {
  return getFieldBasedDoc('cafe', fallback ?? cafeDoc);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getInicPesquisa(_lang: string, fallback?: any): Promise<any> {
  return getFieldBasedDoc('inic_pesquisa', fallback ?? inicPesquisaDoc);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getInicMaterial(_lang: string, fallback?: any): Promise<any> {
  return getFieldBasedDoc('inic_material', fallback ?? inicMaterialDoc);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getInicOficinas(_lang: string, fallback?: any): Promise<any> {
  return getFieldBasedDoc('inic_oficinas', fallback ?? inicOficinasDoc);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getInicProjetos(_lang: string, fallback?: any): Promise<any> {
  return getFieldBasedDoc('inic_projetos', fallback ?? inicProjetosDoc);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getInicDados(_lang: string, fallback?: any): Promise<any> {
  return getFieldBasedDoc('inic_dados', fallback ?? inicDadosDoc);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getInicParcerias(_lang: string, fallback?: any): Promise<any> {
  return getFieldBasedDoc('inic_parcerias', fallback ?? inicParceriasDoc);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getInicSolucoes(_lang: string, fallback?: any): Promise<any> {
  return getFieldBasedDoc('inic_solucoes', fallback ?? inicSolucoesDoc);
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
