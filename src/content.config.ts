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

// Видео для рассылки: одна запись = одна страница jetixagency.com/v/<имя-файла>/.
// id — код записи из ссылки Cap (cap.jetixagency.com/s/КОД). Сами видео лежат на сервере, не в репозитории.
const videos = defineCollection({
  loader: glob({ base: './src/content/videos', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    id: z.string().regex(/^[A-Za-z0-9_-]{4,64}$/),
    date: z.coerce.date(),
    description: z.string().optional(),
    // Обложка для превью ссылки: файл в public/v/, например /v/primer.jpg
    poster: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { journal, videos };
