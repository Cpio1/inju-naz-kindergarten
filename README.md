# «ІНЖУ-НАЗ» балабақшасы — сайт

Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · Motion · Lucide.
Один проект, один домен, две самостоятельные вёрстки:

```
src/
  app/              layout, page, favicon (icon.svg), OG-картинка, robots, sitemap
  website/          компьютерная версия (≥ 1024px)
  mobile-website/   мобильная версия (< 1024px)
  shared/           данные, переводы (kk / ru), медиа, общие компоненты и хуки
  styles/           globals.css — палитра Pearl Garden и базовые стили
```

Сервер отдаёт обе вёрстки (поисковики видят весь текст), CSS сразу показывает нужную,
а после загрузки лишняя удаляется из DOM — без ошибок гидратации и без двойных видео.

## Фото и видео

Файлы читаются при сборке — достаточно положить их в `public/` и сделать redeploy.

| Файл | Где показывается |
| --- | --- |
| `public/main-page.(jpg|jpeg|png|webp)` | Главный экран (Hero) |
| `public/main-page2.(jpg|…|mp4|webm|mov)` | Раздел «Біздің балабақша» — фото или видео |
| `public/main-page2-poster.jpg` | (необязательно) обложка для видео |
| `public/images/*` | Галерея, по порядку имён: `01.jpg`, `02.jpg`, … (видео тоже можно) |

Пока файлов нет, показываются аккуратные жемчужные заглушки.

## Данные и тексты

* `src/shared/data/kindergarten.ts` — телефоны, Instagram, часы, группы, точка 2GIS.
* `src/shared/i18n/kk.ts`, `ru.ts` — все тексты на казахском и русском.

Карта: у 2GIS пока нет карточки организации, поэтому используется здание
«Аль-Фараби, 35, с. Мухаметжан Туймебаев» из базы 2GIS (geo id `9430047404769404`).
Когда карточка детского сада появится в 2GIS, достаточно заменить ссылку в `links.twoGisCard`.

## Команды

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production-сборка
npm run typecheck
```

## Vercel

Импортируйте репозиторий в Vercel — настройки по умолчанию (Next.js). Секреты не нужны.
Необязательно: `NEXT_PUBLIC_SITE_URL=https://ваш-домен.kz` для canonical/OG-ссылок
(иначе берётся production-домен Vercel).
