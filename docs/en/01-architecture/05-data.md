# Data

## Purpose

**Data** is an independent architectural entity responsible for supplying structured information during rendering.

Unlike other architectural entities, Data is centralized in a single directory while remaining logically associated with the entities that own it.

---

## Responsibilities

Data is responsible for:

- storing structured information;
- supplying architectural entities with content;
- separating content from presentation;
- supporting reusable templates without embedding data into markup.

---

## Organization

All project data is stored in a single directory.

```text
src/views/data/
├── Global.json
├── Common.json
├── Header.json
├── Hero.json
└── Contacts.json
```

Centralizing data makes it easier to locate, maintain and reuse across the project.

---

## Architectural Ownership

Although every JSON file is physically stored in `src/views/data`, each file may architecturally belong to a specific entity.

For example:

```text
src/views/components/
└── Header/
    ├── Header.njk
    ├── _Header.scss
    └── Header.mjs

src/views/data/
└── Header.json
```

Here, `Header.json` is physically located in the shared data directory but architecturally belongs to the `Header` Component.

The same principle applies to Pages and Sections.

This distinction allows the project to keep all data centralized without losing the relationship between an architectural entity and its data source.

---

## Global Data

Global data is stored alongside entity data.

Typical examples include:

- site configuration;
- navigation;
- localization;
- shared settings;
- other project-wide information.

Global data is accessed through the Template API.

```njk
{% set site = getData("Global") %}
```

---

## Local Data

Pages, Sections and Components may each own their own data source.

The build system automatically associates these JSON files with the corresponding architectural entity during rendering.

Templates are the only architectural entity that does not have dedicated data files.

---

## Why Data Exists Separately

Data is treated as an independent architectural entity rather than as part of template implementation.

Centralizing all JSON files improves discoverability, simplifies maintenance and keeps presentation independent from content while preserving clear architectural ownership throughout the project.
