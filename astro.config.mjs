// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Адрес сайта. Пока домен не подключён, сайт живёт на GitHub Pages по адресу
// https://bogersebekov.github.io/website-own-v1/ — отсюда `base`.
// Когда домен подключён: SITE = 'https://<домен>', BASE = '/' и файл public/CNAME с доменом.
const SITE = process.env.SITE_URL ?? 'https://bogersebekov.github.io';
const BASE = process.env.SITE_BASE ?? '/website-own-v1';

export default defineConfig({
  site: SITE,
  base: BASE,
  trailingSlash: 'ignore',
  integrations: [sitemap()],
  build: { format: 'directory' },
});
