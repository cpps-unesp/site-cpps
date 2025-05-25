import { defineCollection, z } from 'astro:content';

import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

import slugify from "slugify"; // Certifique-se de ter instalado: npm install slugify

// Função auxiliar para gerar slug
function createSlug(date: string, num: string): string {
  
  return slugify(`${date}-${num}`, { lower: true, strict: true });
}

const noticias = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.string(),
    resumo: z.string(),
    image: z.string(),
  }).transform((data) => ({
    ...data,
    slug: createSlug(data.date,data.title),
  })),
});


export const collections = {
  noticias,
  docs: defineCollection({ loader: docsLoader(), schema: docsSchema() })
};

