# Templates

Templates are infrastructural markup: the document's base structure, `<head>` contents, shared resource includes. A Template doesn't define a page's composition and isn't an interface element on its own — that's the job of Pages, Sections, and Components.

```text
src/views/templates/
├── _head.njk
└── _scripts.njk
```

## Difference from Components

Both use the same templating engine, but solve different problems: a Component is a self-contained interface entity, a Template is infrastructure other entities rely on.

It's not just a conceptual distinction: a Template **cannot** call `getComponent(...)` — dependency analysis deliberately doesn't track such calls inside `templates/`, and the link would simply fall out of the Dependency Graph. See Development → Templates for details and what to do instead.

## Usage

```njk
{% include getTemplate("head") %}
{% include getTemplate("scripts") %}
```

or, if the Template is written as a Nunjucks macro:

```njk
{% from getTemplate('head') import HTMLHead %}
```

The Build System converts the architectural name into a file path itself — no need to add `_` or an extension.

## Data

Templates don't have their own JSON files. If a template needs data, the calling entity (Page, Section, Component) passes it in, or global project data is used.
