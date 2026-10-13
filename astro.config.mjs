// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Адрес сайта: jetixagency.com (слово Руслана 13.10). CNAME лежит в public/CNAME.
// Для локальной сборки под GitHub Pages без домена: SITE_URL=https://bogersebekov.github.io SITE_BASE=/website-own-v1

const SITE = process.env.SITE_URL || 'https://jetixagency.com';
const BASE = process.env.SITE_BASE || '/';

export default defineConfig({
  site: SITE,
  base: BASE,
  trailingSlash: 'ignore',
  integrations: [sitemap()],
  build: { format: 'directory' },
});
