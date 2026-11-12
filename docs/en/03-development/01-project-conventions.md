# Project Conventions

Directory structure, file names, and how entities get wired up are part of the architecture, not a style choice. Following them is the only requirement for Dependency Analysis and Incremental Build to work correctly — there's no separate registration step for new Components, Sections, or Templates.

```text
src/views/
├── components/
├── data/
├── pages/
├── sections/
└── templates/
```

## Naming

| Entity         | Convention                       | Example                               |
| -------------- | --------------------------------- | --------------------------------------- |
| **Components** | PascalCase, own directory         | `Header/`, `Footer/`, `Navigation/`      |
| **Sections**   | `_` + name                        | `_about.njk`, `about/_hero.njk`          |
| **Templates**  | `_` + name (inside `templates/`)  | `_head.njk`, `_scripts.njk`              |
| **Data**       | file name = entity name           | `Header.json`, `Global.json`, `Common.json` |

For Templates, the underscore is part of the file name but isn't used when calling the Template API:

```njk
{% include getTemplate("head") %}
```

## The Template API is the only way to wire things up

Every entity is connected only through `getComponent`/`getSection`/`getTemplate`/`getData` — that's what lets the Build System analyze dependencies without extra configuration. Direct relative paths break that link.
