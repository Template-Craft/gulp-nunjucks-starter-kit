# Project Conventions

Структура каталогов, имена файлов и способ подключения сущностей — часть архитектуры, а не стиль оформления. Их соблюдение — единственное условие для корректной работы Dependency Analysis и Incremental Build; регистрировать новые Components, Sections или Templates отдельно не нужно.

```text
src/views/
├── components/
├── data/
├── pages/
├── sections/
└── templates/
```

## Именование

| Сущность       | Соглашение                      | Пример                              |
| -------------- | -------------------------------- | ------------------------------------ |
| **Components** | PascalCase, директория           | `Header/`, `Footer/`, `Navigation/`   |
| **Sections**   | `_` + имя                        | `_about.njk`, `about/_hero.njk`       |
| **Templates**  | `_` + имя (в `templates/`)       | `_head.njk`, `_scripts.njk`           |
| **Data**       | имя файла = имя сущности         | `Header.json`, `Global.json`, `Common.json` |

Для Templates подчёркивание указывается в имени файла, но не при вызове через Template API:

```njk
{% include getTemplate("head") %}
```

## Template API — единственный способ подключения

Все сущности подключаются только через `getComponent`/`getSection`/`getTemplate`/`getData` — это то, что позволяет Build System анализировать зависимости без дополнительной конфигурации. Прямые относительные пути ломают эту связь.
