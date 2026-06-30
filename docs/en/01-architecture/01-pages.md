# Pages

## Purpose

A **Page** is the entry point for generating an HTML document.

Each page represents a single output file and defines the high-level composition of that document.

Pages are responsible for assembling Sections rather than implementing user interface logic directly.

---

## Responsibilities

A Page is responsible for:

- defining the document structure;
- composing the required Sections;
- providing page-specific Data;
- serving as the starting point for rendering.

A Page should remain lightweight and focus on composition rather than implementation.

---

## Composition

Pages typically consist of multiple Sections.

```njk
{% include getSection("hero") %}
{% include getSection("features") %}
{% include getSection("contacts") %}
```

Each Section encapsulates an independent part of the page, allowing the overall structure to remain clean and easy to understand.

---

## Reusability

Pages are not intended to be reused.

Each Page represents a unique entry point within the project and is rendered into a single HTML document.

Reusable functionality belongs in Sections, Components or Templates rather than in Pages.

---

## Data

A Page may have its own JSON data file.

This data is available only while rendering the corresponding Page and is intended to describe page-specific content.

Shared or reusable data should belong to the appropriate architectural entity instead.

---

## Why Pages Exist Separately

Pages define the public entry points of the project.

Separating them from reusable entities keeps responsibilities clear and allows the build system to analyze dependencies more accurately during incremental builds.
