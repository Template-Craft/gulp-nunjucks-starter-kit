# Multi-page Project

Для многостраничных проектов рекомендуется группировать Sections по страницам.

Это позволяет избежать перегруженного каталога `sections` и упрощает навигацию по проекту.

## Рекомендуемая структура

```text
src/views/
├── pages/
│   ├── index.njk
│   ├── about.njk
│   ├── services.njk
│   └── contacts.njk
│
├── sections/
│   ├── about/
│   │   ├── _hero.njk
│   │   ├── _history.njk
│   │   └── _team.njk
│   │
│   ├── services/
│   │   ├── _hero.njk
│   │   └── _pricing.njk
│   │
│   └── contacts/
│       ├── _hero.njk
│       └── _form.njk
│
├── components/
├── templates/
└── data/
```

## Подключение Sections

Sections подключаются через Template API.

```njk
{% include getSection("about", "hero") %}
{% include getSection("about", "history") %}
{% include getSection("about", "team") %}
```

## Общие Components

Components остаются общими для всего проекта.

Один и тот же Component может использоваться в Sections различных страниц без каких-либо ограничений.

## Templates

Templates также являются общими для всего проекта и могут использоваться любыми Components и Sections независимо от страницы.

Они предназначены для переиспользования небольших частей разметки и не привязаны к конкретной странице.

## Когда использовать

Такая структура рекомендуется для проектов с большим количеством страниц, где каждая страница имеет собственный набор Sections.

Она сохраняет порядок в каталоге проекта, облегчает навигацию и хорошо масштабируется по мере роста приложения.
