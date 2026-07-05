# Sections

A Section represents a large, self-contained part of a page.

A Section typically corresponds to a single logical screen or a meaningful part of the interface and combines multiple Components.

## Structure

The Build System supports two approaches to organizing Sections.

### Landing Page Projects

For Landing Page projects, all Sections are placed directly in the `sections` directory.

```text
src/views/sections/
├── _hero.njk
├── _about.njk
├── _services.njk
└── _contacts.njk
```

Sections are included through the Template API.

```njk
{% include getSection("", "hero") %}
{% include getSection("", "about") %}
```

### Multipage Projects

For larger projects, it is recommended to group Sections by page.

```text
src/views/sections/
├── about/
│   ├── _hero.njk
│   ├── _history.njk
│   └── _team.njk
│
├── contacts/
│   ├── _hero.njk
│   └── _form.njk
```

Sections are included as follows:

```njk
{% include getSection("about", "hero") %}
{% include getSection("about", "history") %}
```

## Purpose

A Section is responsible for the structure of a specific part of a page.

A Section typically contains Components, Templates, and the presentation logic required for that part of the interface.

A Section should not contain markup that is reused across multiple independent areas of the project. Such markup should be extracted into a Component.

## Incremental Build

When a Section is modified, the Build System automatically determines which Pages use it and rebuilds only those pages.

If a Section is used by a single Page, only that Page will be rebuilt.
