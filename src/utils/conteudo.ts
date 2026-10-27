import { getEmDashCollection, getEmDashEntry } from 'emdash';
import type { EditProxy, ImageValue } from 'emdash';
import type { SupportedLang } from '../types/lang';
import { getTranslations } from './i18n';

// Conteúdo editável no EmDash (/_emdash/admin): páginas institucionais, equipe,
// documentos, Café com Ciência e projetos. Os modelos estão em seed/seed.json.
// Cada função devolve o mesmo formato que os componentes recebiam dos JSON de
// idioma, para os componentes não mudarem.

const IDIOMA_PADRAO: SupportedLang = 'pt';

// O que o componente <Image> de emdash/ui recebe: o valor de um campo de imagem
// do EmDash ou o caminho de um arquivo de public/. O componente resolve a URL,
// gera o srcset e respeita o ponto focal escolhido no admin.
export type Imagem = ImageValue | string;

// Quem não tem foto no admin aparece com o avatar genérico.
const FOTO_PADRAO = '/imagens/equipe/00-person.svg';

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

// Edição visual do EmDash: os componentes espalham `{...edit?.campo}` no elemento
// que mostra o campo, e o editor logado, no modo de edição, clica nele para editar
// ali mesmo. Para visitantes não sai atributo nenhum. Só ganha anotação o que está
// no idioma da página: um item mostrado em pt numa página en ou es (falta
// tradução) fica sem, para o editor não sobrescrever o português a partir dela.
type EntradaEditavel = { edit: EditProxy; data: object };

export function edicao(
  entrada: EntradaEditavel | null | undefined,
  lang: SupportedLang
): EditProxy | undefined {
  const locale = (entrada?.data as { locale?: string } | undefined)?.locale;
  return entrada && locale === lang ? entrada.edit : undefined;
}

// getEmDashEntry já cai para pt quando falta a tradução.
async function getPagina(slug: string, lang: SupportedLang) {
  const { entry, error } = await getEmDashEntry('paginas', slug, { locale: lang });
  if (error) throw error;
  return { pagina: entry?.data ?? null, edicaoPagina: edicao(entry, lang) };
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

export async function getHero(lang: SupportedLang) {
  const { pagina, edicaoPagina } = await getPagina('home', lang);
  return {
    edit: edicaoPagina,
    title: escapeHtml(pagina?.title ?? ''),
    description: textoParaParagrafos(
      pagina?.introducao,
      'text-primary font-semibold bg-white px-1 rounded'
    ).join(' '),
    button: pagina?.botao_texto
      ? { url: pagina.botao_link ?? '', text: pagina.botao_texto }
      : undefined,
    imagem: pagina?.imagem,
  };
}

type MembroEquipe = {
  slug?: string;
  nome: string;
  cargo?: string;
  descricao?: string;
  contribuicao?: string;
  foto?: Imagem;
  prioridade?: number;
  status: 'ativo' | 'inativo';
  redes: { tipo: string; url: string }[];
  edit?: EditProxy;
};

export async function getEquipe(lang: SupportedLang) {
  const [{ pagina, edicaoPagina }, pessoas] = await Promise.all([
    getPagina('equipe', lang),
    listarTraduzido('equipe', lang),
  ]);

  // Ordem das abas: a mesma das opções do campo Categoria.
  const categorias: Record<string, MembroEquipe[]> = {
    Coordenação: [],
    Pesquisadores: [],
    Estagiários: [],
  };
  for (const pessoa of pessoas) {
    const { data } = pessoa;
    (categorias[data.categoria] ??= []).push({
      edit: edicao(pessoa, lang),
      slug: data.slug ?? undefined,
      nome: data.title,
      cargo: data.cargo,
      descricao: data.descricao,
      contribuicao: data.contribuicao,
      foto: data.foto ?? FOTO_PADRAO,
      prioridade: data.prioridade,
      status: data.ativo === false ? 'inativo' : 'ativo',
      redes: data.redes ?? [],
    });
  }

  return {
    edit: edicaoPagina,
    title: pagina?.title ?? '',
    intro: textoParaParagrafos(pagina?.introducao, 'font-semibold'),
    categorias: Object.fromEntries(
      Object.entries(categorias).filter(([, membros]) => membros.length > 0)
    ),
  };
}

export async function getSobre(lang: SupportedLang) {
  const blocos = await listarTraduzido('sobre', lang);
  return Object.fromEntries(
    blocos
      .sort((a, b) => a.data.ordem - b.data.ordem)
      .map((bloco) => {
        const { data } = bloco;
        return [
          data.slug ?? data.id,
          {
            edit: edicao(bloco, lang),
            titulo: data.title,
            reverse: data.invertido ?? false,
            texto: (data.paragrafos ?? []).map((p) => ({ conteudo: p.texto, check: p.check ?? false })),
            departamentos: data.lista && data.lista.length > 0 ? data.lista.map((l) => l.item) : undefined,
            imagem: (data.imagens ?? []).map((i) => i.imagem).filter((i) => i !== undefined),
          },
        ];
      })
  );
}

export async function getDocumentos(lang: SupportedLang) {
  const [{ pagina, edicaoPagina }, documentos] = await Promise.all([
    getPagina('documentos', lang),
    listarTraduzido('documentos', lang),
  ]);

  return {
    edit: edicaoPagina,
    titulo: pagina?.title ?? '',
    descricao: pagina?.introducao ?? '',
    grupos: documentos
      .sort((a, b) => a.data.ordem - b.data.ordem)
      .map((documento) => {
        const { data } = documento;
        // Linhas seguidas com o mesmo nome formam um arquivo com vários formatos.
        const arquivos: { nome: string; formatos: { tipo: string; url: string }[] }[] = [];
        for (const linha of data.arquivos ?? []) {
          const nome = linha.nome ?? '';
          const ultimo = arquivos.at(-1);
          const formato = { tipo: linha.tipo, url: linha.url };
          if (ultimo && ultimo.nome === nome) ultimo.formatos.push(formato);
          else arquivos.push({ nome, formatos: [formato] });
        }
        return {
          edit: edicao(documento, lang),
          titulo: data.title,
          descricao: data.descricao ?? '',
          arquivos,
        };
      }),
  };
}

export async function getCafe(lang: SupportedLang) {
  const [{ pagina, edicaoPagina }, episodios] = await Promise.all([
    getPagina('cafe-com-ciencia', lang),
    listarTraduzido('cafe_episodios', lang),
  ]);
  const { cafe } = getTranslations(lang);

  return {
    ...cafe,
    edit: edicaoPagina,
    titulo: pagina?.title ?? '',
    descricao: pagina?.introducao ?? '',
    episodios: episodios.map((episodio) => {
      const { data } = episodio;
      return {
        edit: edicao(episodio, lang),
        id: data.slug ?? data.id,
        numero: data.numero,
        icone: data.icone,
        titulo: data.title,
        descricao: data.descricao,
        materiais: data.materiais ?? [],
      };
    }),
  };
}

export async function getProjetosDePesquisa(lang: SupportedLang) {
  const [{ pagina, edicaoPagina }, projetos] = await Promise.all([
    getPagina('projetos-de-pesquisa', lang),
    listarTraduzido('projetos', lang),
  ]);
  const { iniciativas } = getTranslations(lang);

  return {
    ...iniciativas,
    // Só o título e a introdução da página: a lista de projetos é montada no
    // navegador, fora do alcance das anotações; cada projeto se edita no admin.
    edit: edicaoPagina,
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
