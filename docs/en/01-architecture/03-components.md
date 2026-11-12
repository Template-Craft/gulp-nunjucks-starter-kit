# Components

A Component is a reusable architectural entity, not a single file. It's a directory that groups everything belonging to one interface element — markup, styles, and client-side logic — under one shared name.

```text
Header/
├── Header.njk
├── _Header.scss
└── Header.mjs
```

If it has its own data, that's a file with the same name under `src/views/data/`:

```text
src/views/data/
└── Header.json
```

It physically lives in a different directory, but architecturally it belongs to the `Header` component.

## Naming

A component's name is its unique identifier. Every file belonging to it shares that name — the Build System links them without any extra registration or configuration.

## Usage and reuse

A Component shouldn't depend on where it's used, and gets its data only through the Template API:

```njk
{% include getComponent("Header") %}
```

or, if the component is written as a Nunjucks macro:

```njk
{% from getComponent('Header') import Header %}
```

A Component can be used by any number of Sections and Pages without restriction.
