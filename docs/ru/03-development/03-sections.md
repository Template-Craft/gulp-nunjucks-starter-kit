# Sections

Section — крупный самостоятельный блок страницы, обычно соответствующий одному логическому экрану и объединяющий несколько Components.

## Одностраничные проекты

```text
src/views/sections/
├── _hero.njk
├── _about.njk
├── _services.njk
└── _contacts.njk
```

```njk
{% include getSection("", "hero") %}
{% include getSection("", "about") %}
```

## Многостраничные проекты

```text
src/views/sections/
├── about/
│   ├── _hero.njk
│   ├── _history.njk
│   └── _team.njk
├── contacts/
│   ├── _hero.njk
│   └── _form.njk
```

```njk
{% include getSection("about", "hero") %}
{% include getSection("about", "history") %}
```

## Назначение

Section отвечает за структуру своей части страницы и обычно объединяет Components, Templates и логику отображения. Разметку, нужную в нескольких независимых местах, выносите в Component — не дублируйте внутри Sections.

## Incremental Build

При изменении Section Build System находит все страницы, где она используется, и пересобирает только их. Если секция используется одной страницей — пересоберётся только эта страница.
