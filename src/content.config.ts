import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Журнал «строю публично»: одна запись = один md-файл в src/content/journal/.
// Имя файла: YYYY-MM-DD-slug.md. Позже из этой же коллекции растёт блог.
const journal = defineCollection({
  loader: glob({ base: './src/content/journal', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    lang: z.enum(['ru', 'en']).default('ru'),
    draft: z.boolean().default(false),
  }),
});

export const collections = { journal };
