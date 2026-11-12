# Templates

Templates are reusable markup that isn't tied to a specific page, Section, or Component: shared document fragments needed in many places across the project.

## Location

```text
src/views/templates/
├── _head.njk
├── _scripts.njk
└── _meta.njk
```

## Usage

```njk
{% include getTemplate("head") %}
{% include getTemplate("scripts") %}
```

If the Template is a Nunjucks macro:

```njk
{% from getTemplate('head') import HTMLHead %}
{% from getTemplate('scripts') import scripts %}
```

Both forms are accounted for by the dependency analysis. The underscore in the file name isn't used when calling it — the Build System converts the architectural name into a path itself.

## Constraint: Templates don't call Components

This is a hard rule, not a style recommendation. Dependency analysis (`gulp/utils/findComponentUsages.mjs`) deliberately excludes `views/templates/**` when scanning for `getComponent(...)` calls:

```njk
{# NOT ALLOWED — this call won't make it into the Dependency Graph #}
{% include getComponent("Header") %}
```

If you write `getComponent(...)` inside a Template anyway, the page will still render fine — the call itself works. But the Build System won't know about that link: when `Header` changes, Incremental Build won't find the pages that use this Template and won't rebuild them. The result is silently stale HTML in `build/`, which won't surface right away.

If a Template needs component-level reusable markup, express it as a Nunjucks macro inside the Template itself, or extract it as a Component and include that Component from the Page/Section directly — not from inside a Template.

The reverse direction — a Page/Section/Component calling a Template through `getTemplate(...)` — works as expected and is fully tracked by the dependency analysis.

## Data

Templates don't have their own JSON files — data comes from the calling entity, or global data is used (see the Data section for details).

## Incremental Build

When a Template changes, the Build System finds every Section and Page that uses it and rebuilds only those.
