# Референсы анимаций для сайта

Дата: 2026-10-13. Правило бренда: переходы ≤300 мс, фоновые петли дольше можно, `prefers-reduced-motion`
всегда. Берём грамматику движения, не ассеты. Что из списка взять — решает Руслан.

## Уже в сайте (v0.1)

- Появление блоков при прокрутке (fade + сдвиг 14 px, ступенчато для карточек).
- Подъём карточки и кнопки при наведении, стрелка у текстовой кнопки.
- Медленный дрейф оранжевой сетки на фоне (петля 40 с).

## Образцы

| Сайт | Что смотреть | Что взять нам |
|---|---|---|
| [nateherk.com](https://www.nateherk.com/) | твой образец структуры: мягкое появление блоков, карточки «What I'm up to» с цифрами | ритм прокрутки, карточки статусов |
| [rauno.me/craft](https://rauno.me/craft) | «Blur Reveal», «Staggered Text» — эталон микро-взаимодействий, всё короткое | появление заголовка героя по словам (blur → чётко, 200–300 мс) |
| [emilkowal.ski: The magic of clip-path](https://emilkowal.ski/ui/the-magic-of-clip-path) | анимации через `clip-path`: раскрытие картинки при прокрутке, линия прогресса | раскрытие фото в герое срезом, как наши плашки |
| [animations.dev](https://animations.dev/) | курс Эмиля Ковальски: easing, тайминг, когда анимация лишняя | правила для агентов: easing и длительность |
| [Codrops: Staggered 3D Grid Animations](https://tympanus.net/codrops/2024/10/16/staggered-3d-grid-animations-with-scroll-triggered-effects/) | сетка карточек, ступенчатое появление при прокрутке | сетка «чем занят» и будущая галерея фото |
| [Codrops: On-Scroll Layout Formations](https://tympanus.net/codrops/2024/09/18/exploration-of-on-scroll-layout-formations/) | элементы собираются в сетку при прокрутке | галерея «строю в каждой комнате», когда будут фото |
| [Codrops: Consecutive Scroll Animations](https://tympanus.net/codrops/2024/11/20/consecutive-scroll-animations-with-one-element/) | одна сцена, несколько шагов при прокрутке | лента шагов «интервью → упаковка → продукт» |
| [Awwwards: Scroll Reveals Across Site (Breaking)](https://www.awwwards.com/inspiration/scroll-reveals-across-site-breaking) | подборка сайтов с раскрытием при прокрутке | ориентир плотности движения |
| [Awwwards: Header Reveal (Wallnut)](https://www.awwwards.com/inspiration/header-reveal-animation-wallnut) | появление шапки | шапка-стекло, которая появляется после героя |
| [Awwwards: Navigation micro-animation (Eduard Bodak)](https://www.awwwards.com/inspiration/navigation-micro-animation-eduard-bodak-portfolio) | микро-анимации навигации | подчёркивание пунктов меню |
| [linear.app](https://linear.app/) | тёмная тема, подписи «Fig 0.1» мелким моно, спокойный ритм | чертёжные подписи-коды, как наши `REF JTX-01` |
| [superfocus.me](https://www.superfocus.me/) | твой образец для страницы Live OS: мелкие рисунки у блоков | страница Live OS |
| [Framer: chamfered button](https://www.framer.com/community/marketplace/components/chamfered-button/) | кнопка со срезанными углами и состояниями | проверка наших кнопок на hover/active |

## Чего не берём

Постоянный глитч, сканлайны, неон в тексте, круговые HUD, параллакс по мыши на всём экране,
анимации дольше 300 мс на элементах интерфейса (правило бренда).

## Предлагаю следующим шагом

1. Заголовок героя: появление по словам с blur → чёткость (rauno.me), 240 мс, один раз.
2. Фото героя: раскрытие `clip-path` срезом при загрузке (emilkowal.ski).
3. Счётчики регалий (отдельное предложение в `proposals/`, нарушает правило 300 мс).
