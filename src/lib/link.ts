import { site } from '../data/site.ru';

// Ссылка из данных: 'tg' = личный Telegram, '/путь' = страница сайта с учётом base, иначе внешний адрес.
// Пустая строка = ссылки ещё нет (вызывающий показывает «скоро»).
export function resolveHref(href: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  if (!href) return '';
  if (href === 'tg') return site.links.telegram;
  if (href.startsWith('/')) return `${base}${href}`;
  return href;
}

export const isExternal = (href: string) => /^https?:\/\//.test(href);
