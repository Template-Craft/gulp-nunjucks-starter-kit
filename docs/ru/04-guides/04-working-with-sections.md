# Working with Sections

Sections описывают структуру страницы.

Каждая Section представляет собой самостоятельный логический блок, например Hero, About, Gallery или Contacts.

## Организация

Для Landing Page рекомендуется использовать плоскую структуру.

```text
sections/
├── _hero.njk
├── _about.njk
└── _contacts.njk
```

Для многостраничных проектов рекомендуется группировать Sections по страницам.

```text
sections/
└── about/
    ├── _hero.njk
    ├── _history.njk
    └── _team.njk
```

## Подключение

Sections подключаются через Template API.

```njk
{% include getSection("", "hero") %}
```

или

```njk
{% include getSection("about", "hero") %}
```

## Использование Components

Section может содержать любое количество Components.

Именно Sections обычно объединяют Components в законченные блоки страницы.

## Ответственность

Section отвечает за композицию страницы, но не должна дублировать повторно используемые элементы интерфейса.

Если часть разметки начинает использоваться в нескольких Sections, её рекомендуется вынести в отдельный Component.
