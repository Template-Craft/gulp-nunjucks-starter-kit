# Pages

A Page is the final target of the build: every `.njk` file in `src/views/pages/` becomes a separate HTML file.

## Creating one

```text
src/views/pages/
├── index.njk
├── about.njk
└── contacts.njk
```

No registration needed — just add the file.

## Usage

A page typically includes Templates, Sections, and global data. Don't store repeated markup in a Page — that's what Components, Sections, and Templates are for.

## Page data

```text
pages/
    about.njk

data/
    about.json
```

The JSON file's name must match the page's name — then changing the data rebuilds only that page.

## Incremental Build

Changing the page itself doesn't require dependency analysis — only that page gets rebuilt.
