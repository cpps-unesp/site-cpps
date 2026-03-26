import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import slugify from 'slugify';
import { PUBLICATION_TYPES } from './config/publicationTypes';

const noticias = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/noticias',
  }),
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

const publicacoes = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/publicacoes',
  }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    authors: z.array(z.string()),
    summary: z.string(),
    tags: z.array(z.string()).optional().default([]),
    type: z.enum(PUBLICATION_TYPES),
    lang: z.enum(['pt', 'en', 'es']),
    image: z.string().optional(),
    featured: z.boolean().optional().default(false),
    pdf_url: z.string().optional(),
  }),
});

const membros = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/membros',
  }),
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

const atividades = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/atividades',
  }),
  schema: z
    .object({
      title: z.string().optional().default('Atividades'),
      description: z.string().optional(),
      sidebar_label: z.string().optional(),
      sidebar_section: z.string().trim().optional(),
      sidebar_order: z.number().int().optional(),
      draft: z.boolean().optional().default(false),
    })
    .passthrough(),
});

const atendimento = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/atendimento',
  }),
  schema: z
    .object({
      title: z.string().optional().default('Atendimento'),
      description: z.string().optional(),
      sidebar_label: z.string().optional(),
      sidebar_section: z.string().trim().optional(),
      sidebar_order: z.number().int().optional(),
      draft: z.boolean().optional().default(false),
    })
    .passthrough(),
});

const editarSite = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/editarSite',
  }),
  schema: z
    .object({
      title: z.string().optional().default('Editar site'),
      description: z.string().optional(),
      custom_slug: z.string().trim().optional(),
      sidebar_label: z.string().optional(),
      sidebar_section: z.string().trim().optional(),
      sidebar_order: z.number().int().optional(),
      draft: z.boolean().optional().default(false),
    })
    .passthrough(),
});

export const collections = {
  noticias,
  publicacoes,
  atividades,
  atendimento,
  editarSite,
  membros,
};