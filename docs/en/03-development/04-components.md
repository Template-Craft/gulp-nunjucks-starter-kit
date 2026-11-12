# Components

A Component is the main unit of interface reuse: a self-contained directory holding every file that belongs to that entity.

## Structure

Minimal:

```text
Header/
└── Header.njk
```

In practice — usually more:

```text
Header/
├── Header.njk
├── _Header.scss
└── Header.mjs
```

- `Header.njk` — the template;
- `_Header.scss` — the styles;
- `Header.mjs` — client-side logic (optional).

## Naming

The directory, template, styles, and script file names must all match — that's the only thing the Build System needs to link the component to its JSON data automatically, with zero configuration.

## Data

```text
src/views/data/
└── Header.json
```

The JSON file's name must fully match the component's name.

## Usage

```njk
{% include getComponent("Header") %}
```

or, if the component is a Nunjucks macro:

```njk
{% from getComponent('Header') import Header %}
```

Both forms are accounted for by the dependency analysis.

## Incremental Build

Changing any file in a component triggers a search for every place it's used. If the Component is nested inside a Section, the analysis continues up to the pages that use that Section — only the pages actually affected get rebuilt.
