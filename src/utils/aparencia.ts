import { getEmDashEntry, getMenu } from 'emdash';
import type { ImageValue } from 'emdash';
import type { SupportedLang } from '../types/lang';
import { getTranslatedPath } from './getTranslatedPath';
import { getTranslations } from './i18n';

// Aparência editável no EmDash (Aparência › site): identidade visual, variações
// de layout, seções da home e rodapé. O menu do topo vem do menu "principal" do
// EmDash. Sem a coleção (banco antigo, build, páginas pré-renderizadas) ou com um
// valor inválido, vale o padrão do CPPS, para o site nunca quebrar por causa dela.

export type SecaoHome = 'hero' | 'noticias';
export type LayoutCabecalho = 'claro' | 'colorido';
export type LayoutHero = 'lateral' | 'centralizado';
export type Logo = ImageValue | string;

export type Aparencia = {
  nome: string;
  nomeCompleto: string;
  logo: Logo;
  mostrarLogosUnesp: boolean;
  cores: {
    primaria: string;
    secundaria: string;
    destaque: string;
    rodape: string;
  };
  fonteTexto: string;
  fonteTitulos: string;
  titulosMaiusculos: boolean;
  layoutCabecalho: LayoutCabecalho;
  layoutHero: LayoutHero;
  secoesHome: SecaoHome[];
  rodapeTexto: string;
  redes: { tipo: string; url: string }[];
};

// Só fontes do Google Fonts desta lista: o nome entra na URL do CSS das fontes e
// no CSS da página, então nada digitado à mão chega lá.
export const FONTES_TEXTO = [
  'Montserrat',
  'Inter',
  'Roboto',
  'Open Sans',
  'Lato',
  'Source Sans 3',
  'Nunito',
  'Merriweather',
] as const;
export const FONTES_TITULOS = [
  'Bebas Neue',
  'Oswald',
  'Montserrat',
  'Playfair Display',
  'Roboto Slab',
  'Merriweather',
  'Inter',
] as const;

const SECOES: readonly SecaoHome[] = ['hero', 'noticias'];
const REDES = ['instagram', 'facebook', 'youtube', 'linkedin', 'x', 'github', 'email', 'site'];

export const APARENCIA_PADRAO: Aparencia = {
  nome: 'CPPS',
  nomeCompleto: 'CPPS - Centro de Pesquisa Política e Social',
  logo: '/imagens/logos/cpps/logo-cpps-01_rev_1.png',
  mostrarLogosUnesp: true,
  cores: {
    primaria: '#00acf0',
    secundaria: '#347d9b',
    destaque: '#2197c5',
    rodape: '#2e3f46',
  },
  fonteTexto: 'Montserrat',
  fonteTitulos: 'Bebas Neue',
  titulosMaiusculos: true,
  layoutCabecalho: 'claro',
  layoutHero: 'lateral',
  secoesHome: ['hero'],
  rodapeTexto: '',
  redes: [],
};

const HEX = /^#[0-9a-f]{6}$/i;

function cor(valor: unknown, padrao: string): string {
  return typeof valor === 'string' && HEX.test(valor.trim()) ? valor.trim().toLowerCase() : padrao;
}

function escolha<T extends string>(valor: unknown, opcoes: readonly T[], padrao: T): T {
  return opcoes.includes(valor as T) ? (valor as T) : padrao;
}

function texto(valor: unknown, padrao: string): string {
  return typeof valor === 'string' && valor.trim() ? valor.trim() : padrao;
}

function temImagem(valor: unknown): valor is ImageValue {
  return (
    !!valor &&
    typeof valor === 'object' &&
    !!((valor as ImageValue).id || (valor as ImageValue).src)
  );
}

// Luminância relativa (WCAG 2.x) de uma cor #rrggbb.
function luminancia(hex: string): number {
  const canal = (i: number) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * canal(1) + 0.7152 * canal(3) + 0.0722 * canal(5);
}

export function contraste(a: string, b: string): number {
  const [claro, escuro] = [luminancia(a), luminancia(b)].sort((x, y) => y - x);
  return (claro + 0.05) / (escuro + 0.05);
}

// Texto sobre uma cor: branco ou quase preto, o que tiver mais contraste.
export function textoSobre(fundo: string): string {
  return contraste(fundo, '#ffffff') >= contraste(fundo, '#1f2937') ? '#ffffff' : '#1f2937';
}

// Conferência de contraste: uma cor usada como texto sobre o fundo (links, títulos
// em destaque) precisa de pelo menos 3:1 (WCAG AA para texto grande). Abaixo disso
// a cor escolhida continua nos botões e fundos, e o texto usa a do padrão.
export function corDeTexto(corEscolhida: string, fundo: string, padrao: string): string {
  return contraste(corEscolhida, fundo) >= 3 ? corEscolhida : padrao;
}

export async function getAparencia(lang: SupportedLang): Promise<Aparencia> {
  let dados: Record<string, unknown> | undefined;
  try {
    const { entry, error } = await getEmDashEntry('aparencia', 'site', { locale: lang });
    if (!error) dados = entry?.data as Record<string, unknown> | undefined;
  } catch {
    // Coleção ainda não criada neste banco: fica o padrão.
  }
  if (!dados) return APARENCIA_PADRAO;

  const p = APARENCIA_PADRAO;
  const secoes = Array.isArray(dados.secoes_home)
    ? (dados.secoes_home as { secao?: unknown; ativa?: unknown }[])
        .filter((item) => item?.ativa !== false)
        .map((item) => item?.secao)
        .filter(
          (secao, i, todas): secao is SecaoHome =>
            SECOES.includes(secao as SecaoHome) && todas.indexOf(secao) === i
        )
    : p.secoesHome;
  const redes = Array.isArray(dados.redes)
    ? (dados.redes as { tipo?: unknown; url?: unknown }[])
        .filter(
          (rede) =>
            REDES.includes(rede?.tipo as string) &&
            typeof rede?.url === 'string' &&
            /^(https:\/\/|mailto:)/.test(rede.url)
        )
        .map((rede) => ({ tipo: rede.tipo as string, url: rede.url as string }))
    : [];
  return {
    nome: texto(dados.title, p.nome),
    nomeCompleto: texto(dados.nome_completo, p.nomeCompleto),
    logo: temImagem(dados.logo) ? dados.logo : p.logo,
    mostrarLogosUnesp: dados.mostrar_logos_unesp !== false,
    cores: {
      primaria: cor(dados.cor_primaria, p.cores.primaria),
      secundaria: cor(dados.cor_secundaria, p.cores.secundaria),
      destaque: cor(dados.cor_destaque, p.cores.destaque),
      rodape: cor(dados.cor_rodape, p.cores.rodape),
    },
    fonteTexto: escolha(dados.fonte_texto, FONTES_TEXTO, 'Montserrat'),
    fonteTitulos: escolha(dados.fonte_titulos, FONTES_TITULOS, 'Bebas Neue'),
    titulosMaiusculos: dados.titulos_maiusculos !== false,
    layoutCabecalho: escolha(dados.layout_cabecalho, ['claro', 'colorido'] as const, 'claro'),
    layoutHero: escolha(dados.layout_hero, ['lateral', 'centralizado'] as const, 'lateral'),
    secoesHome: secoes.length > 0 ? secoes : p.secoesHome,
    rodapeTexto: typeof dados.rodape_texto === 'string' ? dados.rodape_texto.trim() : '',
    redes,
  };
}

// URL do CSS do Google Fonts com as duas fontes escolhidas.
export function urlFontes(aparencia: Aparencia): string {
  const familias = [...new Set([aparencia.fonteTexto, aparencia.fonteTitulos])].map((nome) =>
    nome === 'Bebas Neue' ? 'family=Bebas+Neue' : `family=${nome.replace(/ /g, '+')}:wght@400;700`
  );
  return `https://fonts.googleapis.com/css2?${familias.join('&')}&display=swap`;
}

// Variáveis de tema do DaisyUI e das fontes. Só entram cores validadas (#rrggbb)
// e nomes de fonte da lista, então o resultado é seguro para um <style>.
export function cssAparencia(aparencia: Aparencia): string {
  const { primaria, secundaria, destaque, rodape } = aparencia.cores;
  const p = APARENCIA_PADRAO.cores;
  const tema = (fundo: string) =>
    [
      `--color-primary:${primaria}`,
      `--color-primary-content:${textoSobre(primaria)}`,
      `--color-secondary:${secundaria}`,
      `--color-secondary-content:${textoSobre(secundaria)}`,
      `--color-accent:${destaque}`,
      `--color-accent-content:${textoSobre(destaque)}`,
      `--cor-texto-destaque:${corDeTexto(primaria, fundo, p.primaria)}`,
    ].join(';');
  return [
    `:root,[data-theme='light']{${tema('#ffffff')}}`,
    `[data-theme='dark']{${tema('#1f2937')}}`,
    `:root{--cor-rodape:${rodape};--cor-rodape-texto:${textoSobre(rodape)};` +
      `--fonte-texto:'${aparencia.fonteTexto}',sans-serif;` +
      `--fonte-titulos:'${aparencia.fonteTitulos}',sans-serif;` +
      `--titulos-caixa:${aparencia.titulosMaiusculos ? 'uppercase' : 'none'}}`,
  ].join('');
}

export type ItemMenu = { label: string; url: string; target?: string; children: ItemMenu[] };

// Menu padrão, o mesmo que estava fixo no cabeçalho.
function menuPadrao(lang: SupportedLang): ItemMenu[] {
  const h = getTranslations(lang).texts.header;
  const link = (label: string, caminho: Parameters<typeof getTranslatedPath>[0]): ItemMenu => ({
    label,
    url: `/${lang}/${getTranslatedPath(caminho, lang)}`,
    children: [],
  });
  return [
    { label: h.home, url: `/${lang}/`, children: [] },
    link(h.noticias, 'noticias'),
    {
      label: h.institucional,
      url: '',
      children: [
        link(h.sobre, 'institucional/sobre'),
        link(h.equipe, 'institucional/equipe'),
        link(h.documentos, 'institucional/documentos'),
      ],
    },
    {
      label: h.iniciativas,
      url: '',
      children: [
        link(h.cafe, 'iniciativas/cafe-com-ciencia'),
        link(h.projetos, 'iniciativas/projetos'),
      ],
    },
  ];
}

// Só links do próprio site, https ou mailto: um "javascript:" digitado no admin
// não vira link.
function urlSegura(url: string): string {
  return /^(\/(?!\/)|https:\/\/|mailto:|#)/.test(url) ? url : '';
}

type ItemDoEmDash = { label: string; url: string; target?: string; children?: ItemDoEmDash[] };

function converter(item: ItemDoEmDash): ItemMenu {
  return {
    label: item.label,
    url: urlSegura(item.url ?? ''),
    target: item.target === '_blank' ? '_blank' : undefined,
    children: (item.children ?? []).map(converter),
  };
}

export async function getMenuPrincipal(
  lang: SupportedLang,
  preRenderizada: boolean
): Promise<ItemMenu[]> {
  if (preRenderizada) return menuPadrao(lang);
  try {
    const menu = await getMenu('principal', { locale: lang });
    if (menu && menu.items.length > 0) return menu.items.map(converter);
  } catch {
    // Sem o menu no banco: fica o padrão.
  }
  return menuPadrao(lang);
}
