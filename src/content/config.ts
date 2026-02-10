import { defineCollection, z } from 'astro:content';
import slugify from 'slugify';

// ✅ Collection de notícias
const noticias = defineCollection({
  schema: z
    .object({
      title: z.string(),
      date: z.date(),
      resumo: z.string(),
      image: z.string(),
      tags: z.array(z.string()).optional().default([]),
      lang: z.enum(['pt', 'en', 'es']),
      featured: z.boolean().optional().default(false),
      author: z.string().optional(),
    })
    .transform((data) => ({
      ...data,
      slug: slugify(`${data.date.toISOString().split('T')[0]}-${data.title}`, {
        lower: true,
        strict: true,
      }),
    })),
});

// ✅ Collection de publicações (Artigos, Análises, etc.)
const publicacoes = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.date(),
    authors: z.array(z.string()),
    summary: z.string(),
    tags: z.array(z.string()).optional().default([]),
    type: z.enum(['artigo', 'analise', 'material-didatico', 'texto-curto', 'texto-longo']),
    lang: z.enum(['pt', 'en', 'es']),
    image: z.string().optional(),
    featured: z.boolean().optional().default(false),
    pdf_url: z.string().optional(),
  }),
});

// ✅ Collection de membros (com slug baseado no nome do arquivo)
const membros = defineCollection({
  type: 'content',
  schema: z
    .object({
      title: z.string(),
      lang: z.enum(['pt', 'en', 'es']),
      foto: z.string().optional(),
      cargo: z.string(),
      contribuicao: z.string().optional(),
      redes: z
        .array(
          z.object({
            tipo: z.string(),
            url: z.string(),
            icone: z.string(),
          })
        )
        .optional(),
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .transform((data, ctx: any) => {
      const filePath = ctx?.meta?.fileURL?.pathname ?? '';
      const fileName = filePath.split('/').pop() ?? '';
      const rawSlug = fileName.replace(/(-pt|-en|-es)?\.mdx$/, '');

      return {
        ...data,
        slug: rawSlug,
      };
    }),
});

// ✅ Collection de atividades
const atividades = defineCollection({
  type: 'content',
  schema: z
    .object({
      title: z.string().optional().default('Atividades'),
      description: z.string().optional(),
      sidebar_label: z.string().optional(),
      sidebar_section: z.enum(['geral']).optional(),
      sidebar_order: z.number().int().optional(),
    })
    .passthrough(),
});

// ✅ Collection de atendimento
const atendimento = defineCollection({
  type: 'content',
  schema: z
    .object({
      title: z.string().optional().default('Atendimento'),
      description: z.string().optional(),
      sidebar_label: z.string().optional(),
      sidebar_section: z.enum(['geral']).optional(),
      sidebar_order: z.number().int().optional(),
    })
    .passthrough(),
});

// ✅ Collection de editar-site
const editarSite = defineCollection({
  type: 'content',
  schema: z
    .object({
      title: z.string().optional().default('Editar site'),
      description: z.string().optional(),
      sidebar_label: z.string().optional(),
      sidebar_section: z.enum(['geral']).optional(),
      sidebar_order: z.number().int().optional(),
    })
    .passthrough(),
});

// ✅ Exportando as collections
export const collections = {
  noticias,
  publicacoes,
  atividades,
  atendimento,
  editarSite,
  membros,
};
