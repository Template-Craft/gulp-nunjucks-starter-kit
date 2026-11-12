# Sections

A Section is a large self-contained block of a page, usually matching a single logical screen and grouping several Components together.

## Single-page projects

```text
src/views/sections/
├── _hero.njk
├── _about.njk
├── _services.njk
└── _contacts.njk
```

```njk
{% include getSection("", "hero") %}
{% include getSection("", "about") %}
```

## Multi-page projects

```text
src/views/sections/
├── about/
│   ├── _hero.njk
│   ├── _history.njk
│   └── _team.njk
├── contacts/
│   ├── _hero.njk
│   └── _form.njk
```

```njk
{% include getSection("about", "hero") %}
{% include getSection("about", "history") %}
```

## Purpose

A Section is responsible for the structure of its own part of the page, and typically groups Components, Templates, and display logic. Markup needed in several unrelated places goes into a Component — don't duplicate it across Sections.

## Incremental Build

When a Section changes, the Build System finds every page that uses it and rebuilds only those. If a section is used by a single page, only that page gets rebuilt.
