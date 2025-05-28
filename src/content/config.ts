import { defineCollection, z } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';
import slugify from "slugify";

// ✅ Função para gerar slug baseado na data e título
function createSlug(date: Date, title: string): string {
  return slugify(`${date.toISOString().split('T')[0]}-${title}`, { 
    lower: true, 
    strict: true 
  });
}

// ✅ Collection de notícias
const noticias = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.date(),  // ✅ Agora usando z.date()
    resumo: z.string(),
    image: z.string(),
    tags: z.array(z.string()).optional().default([]),
    lang: z.enum(['pt', 'en', 'es']),
  }).transform((data) => ({
    ...data,
    slug: createSlug(data.date, data.title),
  })),
});

// ✅ Collection de documentação do Starlight
const docs = defineCollection({ 
  loader: docsLoader(), 
  schema: docsSchema() 
});

// ✅ Exportando as collections
export const collections = {
  noticias,
  docs
};
