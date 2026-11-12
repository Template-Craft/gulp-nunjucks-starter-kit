# Templates

Templates — повторно используемая разметка, не привязанная к конкретной странице, Section или Component: общие фрагменты документа, нужные во многих местах проекта.

## Расположение

```text
src/views/templates/
├── _head.njk
├── _scripts.njk
└── _meta.njk
```

## Подключение

```njk
{% include getTemplate("head") %}
{% include getTemplate("scripts") %}
```

Если Template — Nunjucks Macro:

```njk
{% from getTemplate('head') import HTMLHead %}
{% from getTemplate('scripts') import scripts %}
```

Оба варианта учитываются системой анализа зависимостей. Подчёркивание из имени файла при вызове не указывается — Build System сам преобразует архитектурное имя в путь.

## Ограничение: Templates не вызывают Components

Это жёсткое правило, а не стилистическая рекомендация. Анализ зависимостей (`gulp/utils/findComponentUsages.mjs`) намеренно исключает `views/templates/**` при поиске вызовов `getComponent(...)`:

```njk
{# НЕЛЬЗЯ — вызов не попадёт в Dependency Graph #}
{% include getComponent("Header") %}
```

Если внутри Template всё же написать `getComponent(...)`, страница отрендерится корректно — сам вызов отработает. Но Build System не узнает об этой связи: при изменении `Header` Incremental Build не найдёт страницы, использующие этот Template, и не пересоберёт их. Результат — молча устаревший HTML в `build/`, который обнаружится не сразу.

Если Template-у нужна переиспользуемая разметка уровня компонента — оформите её как Nunjucks Macro внутри самого Template, либо вынесите в Component и подключайте его из Page/Section напрямую, а не из Template.

Связь в обратную сторону — Page/Section/Component, вызывающие Template через `getTemplate(...)` — работает штатно и полностью учитывается анализом зависимостей.

## Данные

Templates не имеют собственных JSON-файлов — данные передаёт вызывающая сущность либо используются глобальные данные (подробнее — раздел Data).

## Incremental Build

При изменении Template Build System находит все Sections и Pages, где он используется, и пересобирает только их.
