# Sections

Section представляет собой крупный самостоятельный блок страницы.

Обычно Section соответствует одному логическому экрану или смысловой части интерфейса и объединяет несколько Components.

## Структура

Build System поддерживает два способа организации Sections.

### Одностраничные проекты

Для Landing Page все секции располагаются непосредственно в каталоге `sections`.

```text
src/views/sections/
├── _hero.njk
├── _about.njk
├── _services.njk
└── _contacts.njk
```

Подключение выполняется через Template API.

```njk
{% include getSection("", "hero") %}
{% include getSection("", "about") %}
```

### Многостраничные проекты

Для крупных проектов Sections рекомендуется группировать по страницам.

```text
src/views/sections/
├── about/
│   ├── _hero.njk
│   ├── _history.njk
│   └── _team.njk
│
├── contacts/
│   ├── _hero.njk
│   └── _form.njk
```

Подключение выглядит следующим образом.

```njk
{% include getSection("about", "hero") %}
{% include getSection("about", "history") %}
```

## Назначение

Section отвечает за структуру конкретной части страницы.

Внутри Section обычно располагаются Components, Templates и необходимая логика отображения.

Section не должна содержать разметку, которая используется во многих независимых местах проекта. Такая разметка должна быть вынесена в Component.

## Incremental Build

При изменении Section Build System автоматически определяет страницы, в которых она используется, и пересобирает только их.

Если Section используется только одной страницей, будет пересобрана только эта страница.
