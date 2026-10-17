# Аналитика посещений — Cloudflare Web Analytics

Дата: 2026-10-17. Почему он: бесплатно, **без cookie** и без хранения на устройстве посетителя →
баннер согласия не нужен. Сайт на GitHub Pages, поэтому подключаем скрипт-«маячок» (JS beacon), а не прокси Cloudflare.

## Что уже сделано в коде

- `src/layouts/Base.astro` подключает `https://static.cloudflareinsights.com/beacon.min.js`, **только если**
  при сборке задана переменная `PUBLIC_CF_WEB_ANALYTICS_TOKEN`. Нет переменной — скрипта нет, сайт работает.
- `.github/workflows/deploy.yml` передаёт в сборку `vars.PUBLIC_CF_WEB_ANALYTICS_TOKEN`.
- `/datenschutz` уже описывает Cloudflare Web Analytics (п. 4).

## Что сделать Руслану (10 минут)

1. Зайти на https://dash.cloudflare.com/sign-up — создать бесплатный аккаунт (или войти в существующий).
2. В меню слева: **Analytics & Logs → Web Analytics** → **Add a site**.
3. Ввести домен `jetixagency.com`. На вопрос про DNS выбрать вариант **без** переноса DNS («JS snippet» / manual).
4. Cloudflare покажет кусок кода вида
   `<script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='{"token": "abc123..."}'></script>`.
   Скопировать **только значение `token`** (строка из букв и цифр). Это не секрет — он и так виден в коде страницы.
5. GitHub → репозиторий `website-own-v1` → **Settings → Secrets and variables → Actions → вкладка Variables →
   New repository variable**: имя `PUBLIC_CF_WEB_ANALYTICS_TOKEN`, значение — токен.
6. Следующий деплой `main` включит счётчик. Данные видны в Cloudflare → Web Analytics через несколько минут после первых визитов.

Проверка: открыть сайт, «Просмотр кода страницы», найти `cloudflareinsights` — строка есть.

Локально (по желанию): `PUBLIC_CF_WEB_ANALYTICS_TOKEN=токен npm run build`.

## Если позже захочется другой сервис

GoatCounter, Plausible, Umami — тоже без cookie. Тогда поменять скрипт в `Base.astro` и п. 4 в `src/pages/datenschutz.astro`.
