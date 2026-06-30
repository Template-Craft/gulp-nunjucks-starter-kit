# Project Structure

## Overview

The project structure is a direct implementation of the architectural approach described in the previous section.

Each directory represents a specific architectural entity with a clearly defined responsibility. The structure is intentionally designed to make the architecture understandable without requiring developers to study the build system or the project internals.

```
views/
├── pages/
├── sections/
├── components/
├── templates/
└── data/
```

Each directory exists for a specific purpose and should only contain the corresponding architectural entity.

---

## Architectural Entities

The project is organized around five architectural entities:

- **Pages** — entry points that generate HTML documents.
- **Sections** — large structural parts of individual pages.
- **Components** — reusable user interface elements.
- **Templates** — reusable infrastructure templates.
- **Data** — structured information used during rendering.

Each entity has its own responsibility and lifecycle.

---

## Separation of Responsibilities

Architectural entities are intentionally isolated from one another.

This separation prevents responsibilities from overlapping and makes the project easier to maintain as it grows.

For example:

- Pages should not contain reusable interface logic.
- Sections should not become global components.
- Components should not define page structure.
- Templates should not replace Components.
- Data should remain independent from template implementation.

Keeping these boundaries clear results in a predictable and maintainable architecture.

---

## Physical Structure and Architecture

Directories are a physical representation of the architectural model.

They exist to organize architectural entities, not to define them.

The architecture comes first; the directory structure simply reflects it.

This distinction is important because the build system understands the architectural entities themselves rather than treating the project as a collection of unrelated files.
