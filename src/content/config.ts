import { defineCollection, z } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';
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
    foto: z.string(),
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

// ✅ Collection de documentação do Starlight
const docs = defineCollection({
  loader: docsLoader(),
  schema: docsSchema(),
});

// ✅ Exportando as collections
export const collections = {
  noticias,
  docs,
  membros,
};
