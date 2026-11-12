# Sections

Sections — основные строительные блоки страниц. Каждая Section — самостоятельная функциональная область интерфейса (Hero, About, Services, Gallery, Contacts), объединяющая связанные компоненты и данные в рамках одной задачи. Композиция всей страницы — ответственность Page, а не Section.

## Организация

Build System поддерживает два способа организации в зависимости от `settings.isMultipage` (`gulp/config/settings.mjs`).

### Landing Page (`isMultipage: false`)

```text
src/views/sections/
├── _hero.njk
├── _about.njk
├── _services.njk
├── _gallery.njk
└── _contacts.njk
```

### Многостраничный проект (`isMultipage: true`)

```text
src/views/sections/
├── about/
│   ├── _hero.njk
│   ├── _about.njk
│   └── _team.njk
├── contacts/
│   ├── _hero.njk
│   └── _contacts.njk
└── services/
    ├── _hero.njk
    └── _services.njk
```

Одинаковые имена Sections в разных каталогах допустимы — при группировке по страницам они принадлежат разным архитектурным областям.

## Именование

Имя файла начинается с `_`, само имя отражает назначение функциональной области.

## Доступ через Template API

Разработчик указывает не путь к файлу, а архитектурный адрес — Build System сам резолвит физическое расположение.

Landing Page:

```njk
{% include getSection("", "about") %}
```

Многостраничный проект:

```njk
{% include getSection("about", "hero") %}
```

## Взаимодействие с Components и данными

Section может использовать любое количество Components, отвечая за их организацию внутри своей области — сам Component отвечает только за собственную функциональность. Данные Section получает через Template API (`getData`), как и любая другая сущность.
