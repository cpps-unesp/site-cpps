import { getEmDashCollection, getEmDashEntry } from 'emdash';
import type { SupportedLang } from '../types/lang';
import { getTranslations } from './i18n';

// Conteúdo editável no EmDash (/_emdash/admin): páginas institucionais, equipe,
// documentos, Café com Ciência e projetos. Os modelos estão em seed/seed.json.
// Cada função devolve o mesmo formato que os componentes recebiam dos JSON de
// idioma, para os componentes não mudarem.

const IDIOMA_PADRAO: SupportedLang = 'pt';

// Resolve a URL pública de um arquivo do storage do EmDash (local, S3, R2...).
export type MediaUrlResolver = ((storageKey: string) => string) | undefined;

type ImagemEmDash = { src?: string; meta?: Record<string, unknown> } | null | undefined;

export function urlDaImagem(
  imagem: ImagemEmDash,
  resolveMedia: MediaUrlResolver,
  padrao = ''
): string {
  if (!imagem) return padrao;
  const storageKey = typeof imagem.meta?.storageKey === 'string' ? imagem.meta.storageKey : '';
  if (storageKey) {
    return resolveMedia ? resolveMedia(storageKey) : `/_emdash/api/media/file/${storageKey}`;
  }
  return imagem.src || padrao;
}

type Colecao = 'paginas' | 'sobre' | 'equipe' | 'documentos' | 'cafe_episodios' | 'projetos';
type EntradaComGrupo = { data: { id: string; translationGroup?: string | null } };

function grupo(entry: EntradaComGrupo): string {
  return entry.data.translationGroup ?? entry.data.id;
}

// Lista a coleção no idioma pedido, na ordem de criação; o que ainda não foi
// traduzido aparece em pt, como acontecia com os JSON de idioma.
async function listarTraduzido<C extends Colecao>(colecao: C, lang: SupportedLang) {
  const orderBy = { created_at: 'asc' } as const;
  const padrao = await getEmDashCollection(colecao, { locale: IDIOMA_PADRAO, orderBy });
  if (padrao.error) throw padrao.error;
  if (lang === IDIOMA_PADRAO) return padrao.entries;

  const traduzidas = await getEmDashCollection(colecao, { locale: lang, orderBy });
  if (traduzidas.error) throw traduzidas.error;

  const porGrupo = new Map(traduzidas.entries.map((entry) => [grupo(entry), entry]));
  const usados = new Set<string>();
  const mescladas = padrao.entries.map((entry) => {
    const traducao = porGrupo.get(grupo(entry));
    if (!traducao) return entry;
    usados.add(grupo(entry));
    return traducao;
  });
  return [...mescladas, ...traduzidas.entries.filter((entry) => !usados.has(grupo(entry)))];
}

// getEmDashEntry já cai para pt quando falta a tradução.
async function getPagina(slug: string, lang: SupportedLang) {
  const { entry, error } = await getEmDashEntry('paginas', slug, { locale: lang });
  if (error) throw error;
  return entry?.data ?? null;
}

function escapeHtml(texto: string): string {
  return texto
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Texto simples do admin -> HTML: linha em branco separa parágrafos, Enter quebra a
// linha (a partir de telas médias, como no layout original) e **texto** recebe a
// classe de destaque.
function textoParaParagrafos(texto: string | undefined, classeDestaque: string): string[] {
  return (texto ?? '')
    .split(/\n\s*\n/)
    .map((paragrafo) => paragrafo.trim())
    .filter(Boolean)
    .map((paragrafo) =>
      escapeHtml(paragrafo)
        .replace(/\*\*(.+?)\*\*/g, `<span class="${classeDestaque}">$1</span>`)
        .replace(/\s*\n\s*/g, '<br class="hidden sm:inline" /> ')
    );
}

export async function getHero(lang: SupportedLang, resolveMedia: MediaUrlResolver) {
  const pagina = await getPagina('home', lang);
  return {
    title: escapeHtml(pagina?.title ?? ''),
    description: textoParaParagrafos(
      pagina?.introducao,
      'text-primary font-semibold bg-white px-1 rounded'
    ).join(' '),
    button: pagina?.botao_texto
      ? { url: pagina.botao_link ?? '', text: pagina.botao_texto }
      : undefined,
    link: urlDaImagem(pagina?.imagem, resolveMedia),
  };
}

type MembroEquipe = {
  slug?: string;
  nome: string;
  cargo?: string;
  descricao?: string;
  contribuicao?: string;
  foto: string;
  prioridade?: number;
  status: 'ativo' | 'inativo';
  redes: { tipo: string; url: string }[];
};

export async function getEquipe(lang: SupportedLang, resolveMedia: MediaUrlResolver) {
  const [pagina, pessoas] = await Promise.all([
    getPagina('equipe', lang),
    listarTraduzido('equipe', lang),
  ]);

  // Ordem das abas: a mesma das opções do campo Categoria.
  const categorias: Record<string, MembroEquipe[]> = {
    Coordenação: [],
    Pesquisadores: [],
    Estagiários: [],
  };
  for (const { data } of pessoas) {
    (categorias[data.categoria] ??= []).push({
      slug: data.slug ?? undefined,
      nome: data.title,
      cargo: data.cargo,
      descricao: data.descricao,
      contribuicao: data.contribuicao,
      foto: urlDaImagem(data.foto, resolveMedia),
      prioridade: data.prioridade,
      status: data.ativo === false ? 'inativo' : 'ativo',
      redes: data.redes ?? [],
    });
  }

  return {
    title: pagina?.title ?? '',
    intro: textoParaParagrafos(pagina?.introducao, 'font-semibold'),
    categorias: Object.fromEntries(
      Object.entries(categorias).filter(([, membros]) => membros.length > 0)
    ),
  };
}

export async function getSobre(lang: SupportedLang, resolveMedia: MediaUrlResolver) {
  const blocos = await listarTraduzido('sobre', lang);
  return Object.fromEntries(
    blocos
      .sort((a, b) => a.data.ordem - b.data.ordem)
      .map(({ data }) => [
        data.slug ?? data.id,
        {
          titulo: data.title,
          reverse: data.invertido ?? false,
          texto: (data.paragrafos ?? []).map((p) => ({ conteudo: p.texto, check: p.check ?? false })),
          departamentos: data.lista && data.lista.length > 0 ? data.lista.map((l) => l.item) : undefined,
          imagem: (data.imagens ?? []).map((i) => urlDaImagem(i.imagem, resolveMedia)),
        },
      ])
  );
}

export async function getDocumentos(lang: SupportedLang) {
  const [pagina, documentos] = await Promise.all([
    getPagina('documentos', lang),
    listarTraduzido('documentos', lang),
  ]);

  return {
    titulo: pagina?.title ?? '',
    descricao: pagina?.introducao ?? '',
    grupos: documentos
      .sort((a, b) => a.data.ordem - b.data.ordem)
      .map(({ data }) => {
        // Linhas seguidas com o mesmo nome formam um arquivo com vários formatos.
        const arquivos: { nome: string; formatos: { tipo: string; url: string }[] }[] = [];
        for (const linha of data.arquivos ?? []) {
          const nome = linha.nome ?? '';
          const ultimo = arquivos.at(-1);
          const formato = { tipo: linha.tipo, url: linha.url };
          if (ultimo && ultimo.nome === nome) ultimo.formatos.push(formato);
          else arquivos.push({ nome, formatos: [formato] });
        }
        return { titulo: data.title, descricao: data.descricao ?? '', arquivos };
      }),
  };
}

export async function getCafe(lang: SupportedLang) {
  const [pagina, episodios] = await Promise.all([
    getPagina('cafe-com-ciencia', lang),
    listarTraduzido('cafe_episodios', lang),
  ]);
  const { cafe } = getTranslations(lang);

  return {
    ...cafe,
    titulo: pagina?.title ?? '',
    descricao: pagina?.introducao ?? '',
    episodios: episodios.map(({ data }) => ({
      id: data.slug ?? data.id,
      numero: data.numero,
      icone: data.icone,
      titulo: data.title,
      descricao: data.descricao,
      materiais: data.materiais ?? [],
    })),
  };
}

export async function getProjetosDePesquisa(lang: SupportedLang) {
  const [pagina, projetos] = await Promise.all([
    getPagina('projetos-de-pesquisa', lang),
    listarTraduzido('projetos', lang),
  ]);
  const { iniciativas } = getTranslations(lang);

  return {
    ...iniciativas,
    projetosDePesquisa: pagina?.title,
    descricaoProjetosDePesquisa: pagina?.introducao,
    projetosLista: projetos.map(({ data }) => ({
      id: data.slug ?? data.id,
      titulo: data.title,
      docente: data.docente ?? '',
      periodo: data.periodo ?? '',
      departamento: data.departamento ?? '',
      status: data.situacao ?? '',
      agencia: data.agencia ?? '',
      processo: data.processo ?? '',
      natureza: data.natureza ?? '',
      valor: data.valor ?? '',
      associados: (data.associados ?? []).map((a) => a.nome),
      resumo: data.resumo ?? '',
      ...(data.mostrar && data.mostrar.length > 0 ? { mostrar: data.mostrar } : {}),
    })),
  };
}
