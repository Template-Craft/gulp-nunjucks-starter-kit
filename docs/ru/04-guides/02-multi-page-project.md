# Multi-page Project

Используйте этот режим, когда страниц несколько и у каждой — свой набор Sections. Выставьте `settings.isMultipage: true`.

Структура каталогов, пример `sections/<page>/` и `getSection("about", "hero")` — раздел Architecture → Sections и Development → Sections (раздел "Многостраничные проекты").

## Что меняется относительно Landing Page

- `sections/` группируется по страницам, а не лежит плоским списком;
- `getSection(group, name)` вызывается с непустым `group` — именем страницы;
- одинаковые имена Sections в разных страницах не конфликтуют — они принадлежат разным архитектурным областям.

Components и Templates остаются общими для всего проекта независимо от режима — один и тот же Component может использоваться в Sections любых страниц без ограничений.
