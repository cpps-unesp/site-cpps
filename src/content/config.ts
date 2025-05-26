import { defineCollection, z } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';
import slugify from "slugify";

function createSlug(date: string, title: string): string {
  return slugify(`${date}-${title}`, { lower: true, strict: true });
}

const noticias = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.string(),
    resumo: z.string(),
    lang: z.enum(['pt', 'en', 'es']),
  }).transform((data) => ({
    ...data,
    slug: createSlug(data.date, data.title),
  })),
});

export const collections = {
  noticias,
  docs: defineCollection({ loader: docsLoader(), schema: docsSchema() }),
};
