import { defineCollection, z } from 'astro:content';

import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

const noticias = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.string(),
    resumo: z.string(),
    image: z.string(),
  }),
});


export const collections = {
  noticias,
  docs: defineCollection({ loader: docsLoader(), schema: docsSchema() })
};

