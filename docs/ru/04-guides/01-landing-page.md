# Landing Page

Для одностраничных проектов рекомендуется использовать плоскую структуру Sections.

## Пример структуры

```text
src/views/
├── pages/
│   └── index.njk
│
├── sections/
│   ├── _hero.njk
│   ├── _about.njk
│   ├── _services.njk
│   ├── _gallery.njk
│   ├── _contacts.njk
│   └── _footer.njk
│
├── components/
├── templates/
└── data/
```

Каждая Section отвечает за отдельный логический экран страницы.

## Страница

Обычно Page содержит только подключение Sections.

```njk
{% include getSection("", "hero") %}
{% include getSection("", "about") %}
{% include getSection("", "services") %}
{% include getSection("", "gallery") %}
{% include getSection("", "contacts") %}
{% include getSection("", "footer") %}
```

Это позволяет сохранить Page максимально компактной.

## Components

Если отдельные элементы интерфейса начинают повторяться, их рекомендуется переносить в Components.

Sections отвечают за структуру страницы, а Components — за повторно используемые части интерфейса.

## Templates

Templates используются для небольших переиспользуемых фрагментов разметки, которые могут применяться внутри Components или Sections.

Как правило, они не используются непосредственно на уровне Page.

## Преимущества

Такой подход делает архитектуру проекта простой, предсказуемой и хорошо масштабируемой.

Даже крупные Landing Page остаются легко читаемыми благодаря разделению страницы на независимые Sections.
