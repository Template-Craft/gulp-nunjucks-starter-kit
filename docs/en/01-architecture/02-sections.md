# Sections

## Purpose

A **Section** represents a major structural part of a Page.

It groups related functionality into an independent architectural unit responsible for a specific area of the page.

A Section serves as the layer between the overall page composition and reusable Components.

---

## Responsibilities

A Section is responsible for:

- implementing a distinct functional area of a Page;
- composing Components and Templates;
- consuming Section-specific Data when required;
- encapsulating functionality that belongs to a particular part of the page.

Each Section should have a clear responsibility and remain independent from the rest of the page structure.

---

## Composition

A Page is built by composing independent Sections.

Each Section represents a self-contained functional area and does not depend on its position within the Page.

This approach makes it possible to reorganize page layouts, reuse Sections when appropriate and scale the project without changing its architectural principles.

---

## Organization

The build system supports two ways of organizing Sections, depending on the project's structure.

### Landing Page

For small projects, Sections can be placed directly inside the `src/views/sections` directory.

```text
src/views/sections/
├── _hero.njk
├── _about.njk
├── _services.njk
├── _gallery.njk
└── _contacts.njk
```

### Multi-page Project

For larger projects, Sections can be grouped by functional area or by page.

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

This organization keeps the project structure clean and maintainable regardless of its size.

---

## Naming Convention

All Sections follow a consistent naming convention.

Section files begin with an underscore (`_`), while the file name reflects the purpose of the corresponding functional area.

When Sections are organized into groups, identical file names may exist in different directories because they belong to different architectural contexts.

---

## Access Through the Template API

Sections are included through the Template API.

Instead of referencing a physical file path, developers specify the **architectural address** of the Section.

For a Landing Page:

```njk
{% include getSection("", "about") %}
```

For a Multi-page Project:

```njk
{% include getSection("about", "hero") %}
```

The build system resolves the physical location of the template automatically.

As a result, templates remain independent of the directory structure, allowing the project organization to evolve without requiring changes to existing template calls.

---

## Data

A Section may have its own JSON data file.

This allows a Section to manage its own content independently while keeping Page data focused on page-level concerns.

---

## Why Sections Exist Separately

Sections separate page composition from reusable interface elements.

Pages define the overall document structure.

Sections organize major functional areas.

Components implement reusable user interface elements.

This layered architecture keeps responsibilities clearly separated and allows projects to grow without increasing structural complexity.
