# Dependency Analysis

Определяет связи между архитектурными сущностями проекта — не файловые зависимости, а то, какие Pages/Sections используют конкретный Component, Section или Template.

```text
Component(Header)
        │
        ├── index.njk
        ├── about.njk
        └── contacts.njk
```

Эта информация нужна Incremental Build, чтобы определить область влияния изменения.

## Как это работает

Build System сканирует `.njk`-файлы на вызовы Template API (`getComponent`, `getSection`, `getTemplate`) — не на физические пути. Перед анализом из файла вычищаются Nunjucks- и HTML-комментарии (`gulp/utils/stripComments.mjs`), чтобы закомментированный вызов не попал в граф как реальная зависимость.

Результат — индекс `сущность → файлы, где она используется` (`gulp/utils/findComponentUsages.mjs`, `findSectionUsages.mjs`, `findTemplatesUsages.mjs`), а не описание структуры проекта целиком.

## Ограничение

Анализ регулярочный, а не AST — он не видит динамические имена (`getComponent(someVar)`). Для таких случаев нужен полный ребилд; на практике имена сущностей в проекте статичны, поэтому это не мешает повседневной работе.
