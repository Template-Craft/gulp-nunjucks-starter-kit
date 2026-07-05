# Templates

Templates contain reusable markup that does not belong to a specific Page, Section, or Component.

They are typically used for common document fragments shared across multiple parts of the project.

## Location

All Templates are located in:

```text
src/views/templates/
```

For example:

```text
templates/
├── _head.njk
├── _scripts.njk
└── _meta.njk
```

## Including Templates

Templates are included through the Template API.

To include a regular template:

```njk
{% include getTemplate("head") %}
{% include getTemplate("scripts") %}
```

If a Template is implemented as a Nunjucks Macro:

```njk
{% from getTemplate("head") import head %}
{% from getTemplate("scripts") import scripts %}
```

Both approaches are fully supported by the Build System and are taken into account during dependency analysis.

The Build System automatically resolves the architectural Template name to the corresponding file path.

## Naming Convention

Template files use a leading underscore.

```text
_head.njk
```

When using the Template API, the underscore is omitted.

```njk
{% include getTemplate("head") %}
```

This ensures that the architectural Template name always remains the same regardless of the physical file name.

## Template Data

Templates do not have their own JSON data files.

When necessary, they receive data from the calling architectural entity or use the project's global data.

See the **Data** section for more information.

## Incremental Build

The Build System analyzes the usage of every Template.

When a Template changes, it automatically determines which Sections and Pages use it and rebuilds only the affected Pages.
