import { defineConfig } from "tinacms";
import type { TinaField } from "tinacms";
import { routeTranslations } from "../src/i18n/routes";

type PaginaInstitucional =
  | "institucional/sobre"
  | "institucional/equipe"
  | "institucional/documentos"
  | "iniciativas/cafe-com-ciencia"
  | "iniciativas/material-de-apoio"
  | "iniciativas/oficinas"
  | "iniciativas/projetos"
  | "iniciativas/projetos-de-pesquisa"
  | "iniciativas/projetos-de-dados"
  | "iniciativas/parcerias"
  | "iniciativas/solucoes-tecnologicas";

// Todas as collections são field-based (1 documento com {pt,en,es} por
// campo, sem "um arquivo por idioma") — não há como inferir o idioma do
// documento, então o preview do admin abre sempre em pt. Para editar en/es
// visualmente: usar o seletor de idioma da própria página dentro do preview
// (o form permanece o mesmo, já que o documento é único).
function rotearInstitucionalPt(key: PaginaInstitucional): () => string {
  return (): string => `/pt/${routeTranslations[key].pt}`;
}

function rotearHomePt(): string {
  return "/pt/";
}

// i18n "field-based": cada campo de texto vira um objeto com um subcampo por
// idioma, dentro do MESMO documento. Ver docs/tinacms-i18n-field-based.md
// (a escrever) e o plano de migração para a classificação completa de quais
// campos são localizados vs. compartilhados entre idiomas.
const LANGS = [
  { code: "pt", label: "Português" },
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
] as const;

// Campo único localizado (string, number, boolean, rich-text...).
// `leaf` aceita qualquer spec de campo folha — `Omit<TinaField,...>` não
// funciona bem aqui porque TinaField é uma união e o TS colapsa as
// propriedades específicas de cada variante (ex.: `overrides` do rich-text).
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function localized(name: string, label: string, leaf: Record<string, any>): TinaField {
  return {
    type: "object",
    name,
    label,
    fields: LANGS.map(({ code, label: langLabel }) => ({ ...leaf, name: code, label: langLabel })) as TinaField[],
  } as TinaField;
}

// Lista cujo ITEM é localizado. A lista continua única e compartilhada
// entre idiomas; cada item vira {pt,en,es}.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function localizedList(name: string, label: string, leaf: Record<string, any>): TinaField {
  return {
    type: "object",
    name,
    label,
    list: true,
    fields: LANGS.map(({ code, label: langLabel }) => ({ ...leaf, name: code, label: langLabel })) as TinaField[],
  } as TinaField;
}

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

const textoBlocoFields: TinaField[] = [
  localized("conteudo", "Conteúdo", { type: "string", ui: { component: "textarea" } }),
  { type: "boolean", name: "check", label: "Ícone de Check" },
];

function secaoSobre(label: string, name: string, nameOverride?: string): TinaField {
  return {
    type: "object",
    name,
    ...(nameOverride ? { nameOverride } : {}),
    label,
    fields: [
      localized("titulo", "Título", { type: "string" }),
      { type: "boolean", name: "reverse", label: "Inverter Layout" },
      {
        type: "object", name: "texto", label: "Textos", list: true,
        fields: [...textoBlocoFields],
      },
      { type: "string", name: "departamentos", label: "Departamentos", list: true },
      { type: "image", name: "imagem", label: "Imagens", list: true },
    ],
  };
}

const membroFields: TinaField[] = [
  { type: "string", name: "id", label: "ID (interno, não editar)" },
  { type: "string", name: "nome", label: "Nome" },
  localized("cargo", "Cargo", { type: "string" }),
  localized("descricao", "Descrição", { type: "string", ui: { component: "textarea" } }),
  localized("contribuicao", "Contribuição", { type: "string", ui: { component: "textarea" } }),
  { type: "image", name: "foto", label: "Foto" },
  { type: "string", name: "prioridade", label: "Prioridade (número; vazio = ordem alfabética)" },
  { type: "string", name: "status", label: "Status (ativo/inativo)", options: ["ativo", "inativo"] },
  {
    type: "object", name: "redes", label: "Redes / Links", list: true,
    fields: [
      { type: "string", name: "tipo", label: "Tipo" },
      { type: "string", name: "url", label: "URL" },
      { type: "image", name: "icone", label: "Ícone" },
    ],
  },
];

function categoriaEquipe(label: string, name: string, nameOverride: string): TinaField {
  return {
    type: "object", name, nameOverride, label, list: true,
    ui: {
      itemProps: (item: object) => ({
        label:
          "nome" in item && typeof item.nome === "string" && item.nome
            ? item.nome
            : `Novo membro (${label})`,
      }),
    },
    fields: [...membroFields],
  };
}

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  // Uncomment to allow cross-origin requests from non-localhost origins
  // during local development (e.g. GitHub Codespaces, Gitpod, Docker).
  // Use 'private' to allow all private-network IPs (WSL2, Docker, etc.)
  // server: {
  //   allowedOrigins: ['https://your-codespace.github.dev'],
  // },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/r/content-modelling-collections/
  schema: {
    collections: [
      {
        name: "home",
        label: "Página Inicial (Home)",
        path: "src/content/tina-pages/home",
        format: "json",
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
          router: rotearHomePt,
          global: true,
        },
        fields: [
          localized("titulo", "Título do Site", { type: "string" }),
          localized("descricao", "Descrição do Site", { type: "string", ui: { component: "textarea" } }),
          {
            type: "object",
            name: "identidade",
            label: "Identidade Visual",
            fields: [
              { type: "image", name: "logo", label: "Logo" },
            ],
          },
          {
            type: "object",
            name: "hero",
            label: "Hero Section",
            fields: [
              localized("title", "Título", {
                type: "rich-text",
                description: "Shift+Enter insere uma quebra de linha (só aparece em telas maiores).",
              }),
              localized("description", "Descrição", {
                type: "rich-text",
                description:
                  "Pra dar ênfase num trecho: botão de embed (ou digite /) → \"Destaque\" → escreva o texto.",
                // Em collections JSON o Tina assume parser "markdown", que não
                // lê JSX — e o template inline abaixo é um elemento JSX.
                parser: { type: "mdx" },
                templates: [
                  {
                    name: "Destaque",
                    label: "Destaque",
                    inline: true,
                    fields: [
                      { type: "string", name: "texto", label: "Texto destacado", required: true },
                    ],
                  },
                ],
              }),
              { type: "image", name: "link", label: "Imagem de Fundo" },
              {
                type: "object",
                name: "button",
                label: "Botão",
                fields: [
                  localized("text", "Texto", { type: "string" }),
                  { type: "string", name: "url", label: "Link" },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "sobre",
        label: "Página Sobre",
        path: "src/content/tina-pages/sobre",
        format: "json",
        ui: {
          allowedActions: { create: false, delete: false },
          router: rotearInstitucionalPt("institucional/sobre"),
          global: true,
        },
        fields: [
          secaoSobre("Seção Quem Somos", "quem_somos"),
          secaoSobre("Seção Objetivos", "objetivos"),
          secaoSobre("Seção Objetivos Específicos", "objetivosEspecificos"),
        ],
      },
      {
        name: "equipe",
        label: "Página Equipe",
        path: "src/content/tina-pages/equipe",
        format: "json",
        ui: {
          allowedActions: { create: false, delete: false },
          router: rotearInstitucionalPt("institucional/equipe"),
        },
        fields: [
          localized("title", "Título", { type: "string" }),
          localized("intro", "Introdução", {
            type: "rich-text",
            description: "Shift+Enter insere uma quebra de linha (só aparece em telas maiores).",
          }),
          {
            type: "object",
            name: "categorias",
            label: "Categorias",
            fields: [
              categoriaEquipe("Coordenação", "coordenacao", "Coordenação"),
              categoriaEquipe("Pesquisadores", "pesquisadores", "Pesquisadores"),
              categoriaEquipe("Estagiários", "estagiarios", "Estagiários"),
            ],
          },
        ],
      },
      {
        name: "documentos",
        label: "Página Documentos",
        path: "src/content/tina-pages/documentos",
        format: "json",
        ui: {
          allowedActions: { create: false, delete: false },
          router: rotearInstitucionalPt("institucional/documentos"),
        },
        fields: [
          localized("titulo", "Título", { type: "string" }),
          localized("descricao", "Descrição", { type: "string", ui: { component: "textarea" } }),
          {
            type: "object", name: "grupos", label: "Grupos de Documentos", list: true,
            ui: {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              itemProps: (item: any) => ({
                label: item?.titulo?.pt || item?.id || "Novo grupo",
              }),
            },
            fields: [
              { type: "string", name: "id", label: "ID (interno, não editar)" },
              localized("titulo", "Título", { type: "string" }),
              localized("descricao", "Descrição", { type: "string", ui: { component: "textarea" } }),
              {
                type: "object", name: "arquivos", label: "Arquivos", list: true,
                fields: [
                  localized("nome", "Nome", { type: "string" }),
                  {
                    type: "object", name: "formatos", label: "Formatos", list: true,
                    fields: [
                      { type: "string", name: "tipo", label: "Tipo (ex.: PDF, HTML)" },
                      { type: "string", name: "url", label: "URL" },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "cafe",
        label: "Café com Ciência",
        path: "src/content/tina-pages/cafe",
        format: "json",
        ui: {
          allowedActions: { create: false, delete: false },
          router: rotearInstitucionalPt("iniciativas/cafe-com-ciencia"),
        },
        fields: [
          localized("titulo", "Título", { type: "string" }),
          localized("descricao", "Descrição", { type: "string", ui: { component: "textarea" } }),
          localized("episodioLabel", "Rótulo do episódio", { type: "string" }),
          {
            type: "object", name: "materiais", label: "Rótulos dos materiais",
            fields: [
              localized("transcricao", "Transcrição", { type: "string" }),
              localized("artigo", "Artigo", { type: "string" }),
            ],
          },
          {
            type: "object", name: "episodios", label: "Episódios", list: true,
            ui: {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              itemProps: (item: any) => ({
                label: item?.titulo?.pt || item?.id || "Novo episódio",
              }),
            },
            fields: [
              { type: "string", name: "id", label: "ID (interno, não editar)" },
              { type: "number", name: "numero", label: "Número" },
              { type: "string", name: "icone", label: "Ícone (emoji)" },
              localized("titulo", "Título", { type: "string" }),
              localized("descricao", "Descrição", { type: "string", ui: { component: "textarea" } }),
              {
                type: "object", name: "materiais", label: "Materiais", list: true,
                fields: [
                  { type: "string", name: "tipo", label: "Tipo" },
                  localized("url", "URL", { type: "string" }),
                ],
              },
            ],
          },
        ],
      },
      {
        name: "inic_pesquisa",
        label: "Projetos de Pesquisa",
        path: "src/content/tina-pages/inic-pesquisa",
        format: "json",
        ui: {
          allowedActions: { create: false, delete: false },
          router: rotearInstitucionalPt("iniciativas/projetos-de-pesquisa"),
        },
        fields: [
          localized("titulo", "Título", { type: "string" }),
          localized("descricao", "Descrição", { type: "string", ui: { component: "textarea" } }),
          localized("ordenarPor", "Rótulo 'Ordenar por'", { type: "string" }),
          localized("porTitulo", "Rótulo 'Título'", { type: "string" }),
          localized("porDocente", "Rótulo 'Docente'", { type: "string" }),
          localized("porPeriodo", "Rótulo 'Período'", { type: "string" }),
          {
            type: "object", name: "projetos", label: "Projetos", list: true,
            ui: {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              itemProps: (item: any) => ({
                label: item?.titulo?.pt || item?.id || "Novo projeto",
              }),
            },
            fields: [
              { type: "string", name: "id", label: "ID (interno, não editar)" },
              localized("titulo", "Título", { type: "string" }),
              { type: "string", name: "docente", label: "Docente" },
              { type: "string", name: "periodo", label: "Período" },
              localized("departamento", "Departamento", { type: "string" }),
              localized("status", "Status", { type: "string" }),
              { type: "string", name: "agencia", label: "Agência" },
              { type: "string", name: "processo", label: "Processo" },
              localized("natureza", "Natureza", { type: "string" }),
              { type: "string", name: "valor", label: "Valor" },
              { type: "string", name: "associados", label: "Associados", list: true },
              localized("resumo", "Resumo", { type: "string", ui: { component: "textarea" } }),
              localizedList("apoioCentro", "Apoio do Centro", { type: "string" }),
              { type: "string", name: "mostrar", label: "Campos visíveis", list: true },
            ],
          },
        ],
      },
      {
        name: "inic_material",
        label: "Material de Apoio",
        path: "src/content/tina-pages/inic-material",
        format: "json",
        ui: {
          allowedActions: { create: false, delete: false },
          router: rotearInstitucionalPt("iniciativas/material-de-apoio"),
          global: true,
        },
        fields: [
          localized("titulo", "Título", { type: "string" }),
          localized("descricao", "Descrição", { type: "string", ui: { component: "textarea" } }),
        ],
      },
      {
        name: "inic_oficinas",
        label: "Oficinas",
        path: "src/content/tina-pages/inic-oficinas",
        format: "json",
        ui: {
          allowedActions: { create: false, delete: false },
          router: rotearInstitucionalPt("iniciativas/oficinas"),
          global: true,
        },
        fields: [
          localized("titulo", "Título", { type: "string" }),
          localized("descricao", "Descrição", { type: "string", ui: { component: "textarea" } }),
        ],
      },
      {
        name: "inic_projetos",
        label: "Projetos (hub)",
        path: "src/content/tina-pages/inic-projetos",
        format: "json",
        ui: {
          allowedActions: { create: false, delete: false },
          router: rotearInstitucionalPt("iniciativas/projetos"),
        },
        fields: [
          localized("titulo", "Título", { type: "string" }),
          localized("descricao", "Descrição", { type: "string", ui: { component: "textarea" } }),
          {
            type: "object", name: "cards", label: "Cartões", list: true,
            fields: [
              localized("titulo", "Título", { type: "string" }),
              localized("descricao", "Descrição", { type: "string", ui: { component: "textarea" } }),
              localized("link", "Link", { type: "string" }),
            ],
          },
        ],
      },
      {
        name: "inic_dados",
        label: "Projetos de Dados",
        path: "src/content/tina-pages/inic-dados",
        format: "json",
        ui: {
          allowedActions: { create: false, delete: false },
          router: rotearInstitucionalPt("iniciativas/projetos-de-dados"),
          global: true,
        },
        fields: [
          localized("titulo", "Título", { type: "string" }),
          localized("descricao", "Descrição", { type: "string", ui: { component: "textarea" } }),
        ],
      },
      {
        name: "inic_parcerias",
        label: "Parcerias",
        path: "src/content/tina-pages/inic-parcerias",
        format: "json",
        ui: {
          allowedActions: { create: false, delete: false },
          router: rotearInstitucionalPt("iniciativas/parcerias"),
          global: true,
        },
        fields: [
          localized("titulo", "Título", { type: "string" }),
          localized("descricao", "Descrição", { type: "string", ui: { component: "textarea" } }),
        ],
      },
      {
        name: "inic_solucoes",
        label: "Soluções Tecnológicas",
        path: "src/content/tina-pages/inic-solucoes",
        format: "json",
        ui: {
          allowedActions: { create: false, delete: false },
          router: rotearInstitucionalPt("iniciativas/solucoes-tecnologicas"),
          global: true,
        },
        fields: [
          localized("titulo", "Título", { type: "string" }),
          localized("descricao", "Descrição", { type: "string", ui: { component: "textarea" } }),
        ],
      },
      {
        name: "post",
        label: "Posts (demo tinacms-demo)",
        path: "content/posts",
        format: "md",
        ui: {
          router: (): string => "/tinacms-demo",
        },
        fields: [
          { type: "string", name: "title", label: "Título", required: true },
          { type: "string", name: "eyebrow", label: "Subtítulo" },
          { type: "rich-text", name: "body", label: "Corpo", isBody: true },
          {
            type: "object",
            name: "ctaPrimary",
            label: "CTA primário",
            fields: [
              { type: "string", name: "label", label: "Texto" },
              { type: "string", name: "href", label: "Link" },
            ],
          },
          {
            type: "object",
            name: "ctaSecondary",
            label: "CTA secundário",
            fields: [
              { type: "string", name: "label", label: "Texto" },
              { type: "string", name: "href", label: "Link" },
            ],
          },
        ],
      },
    ],
  },
});
