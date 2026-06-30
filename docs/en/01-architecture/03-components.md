# Components

## Purpose

A **Component** is a reusable architectural entity responsible for implementing a single user interface element or feature.

Components are independent of Pages and Sections and can be reused throughout the project wherever the same functionality is required.

---

## Responsibilities

A Component is responsible for:

- implementing a single UI element or feature;
- encapsulating its own presentation logic;
- exposing a reusable interface through the Template API;
- owning the resources required for its implementation.

Each Component should have a single, well-defined responsibility and remain independent from page composition.

---

## Architectural Entity

A Component is **not** a single file.

Instead, it represents an architectural entity that may consist of multiple files implementing different aspects of the component.

For example:

```text
src/views/components/
└── Header/
    ├── Header.njk
    ├── _Header.scss
    └── Header.mjs
```

Each file has its own responsibility, but together they form a single architectural entity named `Header`.

---

## Organization

Each Component is stored in its own directory.

This organization makes it possible to extend a Component with additional resources while keeping everything related to its implementation grouped together.

The build system treats the directory as the physical representation of a single architectural entity.

---

## Naming Convention

Component directories use **PascalCase**.

The main template file always has the same name as the directory.

```text
Button/
└── Button.njk

Gallery/
└── Gallery.njk

UserCard/
└── UserCard.njk
```

This convention allows the build system to identify Components consistently throughout the project.

---

## Access Through the Template API

Components are included through the Template API.

```njk
{% include getComponent("Button") %}
```

If a Component provides Nunjucks macros, they can be imported in the standard way.

```njk
{% from getComponent("Button") import Button %}
```

The build system resolves the physical template location automatically.

As a result, templates depend on architectural entities rather than directory structures.

---

## Data

When a Component requires its own data, it uses a data source with the same name.

For example:

```text
src/views/data/
└── Header.json
```

Although this file is physically stored in the `data` directory, it **architecturally belongs** to the `Header` Component.

This separation keeps all project data centralized while preserving the ownership relationship between Components and their data sources.

---

## Why Components Exist Separately

Components represent reusable user interface functionality.

They encapsulate implementation details, own their resources and expose a stable architectural interface through the Template API.

This makes Components easy to reuse, maintain and evolve independently from the Pages and Sections that use them.
