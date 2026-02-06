import { defineCollection, z } from 'astro:content';
import slugify from 'slugify';

// ✅ Collection de notícias
const noticias = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.date(),
    resumo: z.string(),
    image: z.string(),
    tags: z.array(z.string()).optional().default([]),
    lang: z.enum(['pt', 'en', 'es']),
  }).transform((data) => ({
    ...data,
    slug: slugify(`${data.date.toISOString().split('T')[0]}-${data.title}`, {
      lower: true,
      strict: true,
    }),
  })),
});

// ✅ Collection de membros (com slug baseado no nome do arquivo)
const membros = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    lang: z.enum(['pt', 'en', 'es']),
    foto: z.string().optional(),
    cargo: z.string(),
    contribuicao: z.string().optional(),
    redes: z.array(
      z.object({
        tipo: z.string(),
        url: z.string(),
        icone: z.string(),
      })
    ).optional(),
  }).transform((data, ctx: any) => {
    const filePath = ctx?.meta?.fileURL?.pathname ?? '';
    const fileName = filePath.split('/').pop() ?? '';
    const rawSlug = fileName.replace(/(-pt|-en|-es)?\.mdx$/, '');

    return {
      ...data,
      slug: rawSlug,
    };
  }),
});

// ✅ Collection de documentação
const docs = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().optional().default('Documentação'),
    description: z.string().optional(),
    sidebar_label: z.string().optional(),
  }).passthrough(),
});

// ✅ Exportando as collections
export const collections = {
  noticias,
  docs,
  membros,
};
