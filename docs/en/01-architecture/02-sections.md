# Sections

Sections are the main building blocks of pages. Each Section is a self-contained functional area of the interface (Hero, About, Services, Gallery, Contacts) that groups related components and data around a single concern. Composing the whole page is a Page's job, not a Section's.

## Organization

The Build System supports two layouts, controlled by `settings.isMultipage` (`gulp/config/settings.mjs`).

### Landing Page (`isMultipage: false`)

```text
src/views/sections/
├── _hero.njk
├── _about.njk
├── _services.njk
├── _gallery.njk
└── _contacts.njk
```

### Multi-page project (`isMultipage: true`)

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

Identical Section names in different directories are fine — when grouped by page, they belong to different architectural areas.

## Naming

The file name starts with `_`, and the name itself reflects the functional area it represents.

## Access through the Template API

The developer specifies an architectural address, not a file path — the Build System resolves the physical location itself.

Landing Page:

```njk
{% include getSection("", "about") %}
```

Multi-page project:

```njk
{% include getSection("about", "hero") %}
```

## Interaction with Components and data

A Section can use any number of Components, and is responsible for organizing them within its own area — a Component itself is only responsible for its own functionality. A Section gets its data through the Template API (`getData`), same as any other entity.
