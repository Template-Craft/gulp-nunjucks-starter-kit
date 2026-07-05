# Components

A Component is the primary reusable building block of the user interface.

Each Component is represented by its own directory containing all files related to that architectural entity.

## Structure

The minimum Component structure is:

```text
Header/
└── Header.njk
```

In practice, a Component usually contains multiple files.

```text
Header/
├── Header.njk
├── _Header.scss
└── Header.mjs
```

Each file has a single responsibility.

- `Header.njk` — component template.
- `_Header.scss` — component styles.
- `Header.mjs` — client-side logic (when required).

## Naming Convention

The directory, template, stylesheet, and JavaScript file must all use the same name.

```text
Header/
├── Header.njk
├── _Header.scss
└── Header.mjs
```

This convention allows the Build System to automatically associate the Component with its corresponding JSON data file.

## Component Data

If a Component has its own data, it is stored separately.

```text
src/views/data/
└── Header.json
```

The JSON file name must exactly match the Component name.

When this file changes, the Build System automatically identifies the corresponding Component, analyzes its usage, and rebuilds only the affected Pages.

## Including Components

Components are included through the Template API.

To include a regular template:

```njk
{% include getComponent("Header") %}
```

If the Component is implemented as a Nunjucks Macro:

```njk
{% from getComponent("Header") import Header %}
```

Both approaches are fully supported by the Build System and are taken into account during dependency analysis.

## Incremental Build

Changing any file within a Component triggers a search for all places where that Component is used.

If the Component is included inside a Section, the Build System continues dependency analysis to determine which Pages use that Section.

As a result, only the pages that are actually affected are rebuilt.
