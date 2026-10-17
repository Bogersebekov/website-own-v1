// Места под фото и видео. Тот же ID, что в docs/media.md (реестр).
// file пустой = материала ещё нет. Пустые места видны только в превью (PUBLIC_SHOW_SLOTS=1),
// в боевой сборке не показываются.
// Когда материал пришёл: картинку кладём в src/assets/media/, короткое видео в public/media/,
// пишем имя файла в file, статус в docs/media.md.

export type MediaKind = 'vertical' | 'screen' | 'wide';

export interface MediaSlot {
  id: string;
  kind: MediaKind;
  hint: string;
  file?: string;
  alt?: string;
}

export const media: Record<string, MediaSlot> = {
  'PROMO-01': { id: 'PROMO-01', kind: 'vertical', hint: 'шортс или пост' },
  'PROMO-02': { id: 'PROMO-02', kind: 'vertical', hint: 'шортс или пост' },
  'PROMO-03': { id: 'PROMO-03', kind: 'vertical', hint: 'шортс или пост' },
  'SITE-01': { id: 'SITE-01', kind: 'screen', hint: 'скриншот сайта' },
  'SITE-02': { id: 'SITE-02', kind: 'screen', hint: 'скриншот сайта' },
  'K001-IMG-01': { id: 'K001-IMG-01', kind: 'screen', hint: 'сетка публикаций' },
  'K001-IMG-02': { id: 'K001-IMG-02', kind: 'screen', hint: 'первый экран лендинга' },
  'K001-IMG-03': { id: 'K001-IMG-03', kind: 'screen', hint: 'состав продукта' },
};

export const showSlots = import.meta.env.PUBLIC_SHOW_SLOTS === '1';
