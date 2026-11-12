# Project Structure

Directory structure is part of the architecture, not a matter of taste. Each directory owns exactly one type of entity, the Build System determines a file's role from where it lives, and that's precisely what makes dependency analysis possible without manual configuration.

```text
src/
├── assets/
│   ├── fonts/
│   ├── img/
│   ├── sprites/
│   └── styles/
├── scripts/
│   └── main/
│       └── app.mjs
└── views/
    ├── components/
    ├── data/
    ├── pages/
    ├── sections/
    └── templates/
```

## Architectural areas

### views/

Project templates and the data tied to them — the main object the Build System works with, and where a site's structure is actually defined.

### assets/

Resources used during development and build: styles, images, fonts, SVG sprites.

### scripts/

Client-side JavaScript — a separate architectural area, kept apart from the template structure.

## Architectural elements inside `views/`

- **Pages** — the project's entry points.
- **Sections** — the large functional parts of a page.
- **Components** — reusable interface elements.
- **Templates** — infrastructural markup.
- **Data** — the data source.

Each is covered in detail in the following sections.
