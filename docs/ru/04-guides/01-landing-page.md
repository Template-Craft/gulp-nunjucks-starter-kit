# Landing Page

Используйте этот режим, когда у проекта одна страница, а Sections не нужно группировать по разделам сайта. Выставьте `settings.isMultipage: false` (это и есть значение по умолчанию).

Структура каталогов, пример `sections/` и `getSection("", "...")` — раздел Architecture → Sections и Development → Sections (раздел "Одностраничные проекты").

## Что меняется относительно Multipage

- `getSection(group, name)` вызывается с пустым `group` (`getSection("", "hero")`);
- `sections/` — плоский список файлов, без вложенных папок по страницам;
- Components и Templates используются точно так же, без различий.

Если позже проект вырастет до нескольких страниц — переходите на структуру из Multi-page Project, архитектура Components/Templates при этом не меняется.
