# Data

Every piece of project data is a JSON file in one directory, regardless of which entity it belongs to:

```text
src/views/data/
```

## Naming by entity

| Entity | Example |
| --- | --- |
| Page | `pages/about.njk` → `data/about.json` |
| Component | `components/Header/Header.njk` → `data/Header.json` |
| Section | `sections/_about.njk` → `data/about.json` |
| Template | has no data of its own — gets it from the calling entity or from global data |

The matching name is all the Build System needs to link data to an entity automatically.

## Global data

```text
Global.json
Common.json
```

Available to the whole project. Changing either of these triggers a full rebuild.

## Reading data

```njk
{{ getData("Header").title }}
```

## Recommendations

Keep data as close as possible to the entity it belongs to. Use `Global.json`/`Common.json` only for data that's genuinely shared across the whole project: this keeps coupling loose and lets Incremental Build pinpoint what actually needs rebuilding.
