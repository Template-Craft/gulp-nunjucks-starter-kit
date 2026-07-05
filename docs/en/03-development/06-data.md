# Data

The Build System uses JSON files to store the data required for rendering templates.

All project data is stored in a single directory regardless of which architectural entity it belongs to.

```text
src/views/data/
```

## Naming Convention

A data file must use the name of the architectural entity it belongs to.

For example:

```text
src/views/
├── components/
│   └── Header/
│       └── Header.njk
│
└── data/
    └── Header.json
```

This convention allows the Build System to automatically associate an architectural entity with its data without requiring additional configuration.

## Global Data

Special files are used to store data shared across the entire project:

```text
Global.json
Common.json
```

These files are considered globally available.

Changing either of them triggers a full rebuild of the project.

## Page Data

A Page may have its own JSON data file.

For example:

```text
pages/
└── about.njk

data/
└── about.json
```

If the JSON file name matches the Page name, the Build System rebuilds only that Page.

## Component Data

A Component may also have its own JSON data file.

For example:

```text
components/
└── Header/
    └── Header.njk

data/
└── Header.json
```

When this file changes, the Build System automatically identifies the corresponding Component, analyzes its usage, and rebuilds only the Pages that use that Component.

## Section Data

A Section may also have its own JSON data file.

For example:

```text
sections/
└── _about.njk

data/
└── about.json
```

When this file changes, the Build System identifies the corresponding Section, analyzes its usage, and rebuilds only the affected Pages.

## Template Data

Templates do not have their own JSON data files.

They represent reusable markup fragments and should receive the required data from the calling entity (Page, Section, or Component) or use the project's global data.

This approach keeps Templates independent of their own data source and allows the same Template to be reused throughout different parts of the project.

For example, a Template may describe the markup for a form element, a table row, a list item, or any other reusable structure while receiving its data through parameters or a Nunjucks Macro.

## Accessing Data

Data is accessed through the Template API.

```njk
{{ getData("Header").title }}
```

The Build System automatically loads the corresponding JSON file and makes its contents available to the template.

## Architectural Approach

All project data is stored in a single directory.

The Build System relies on naming conventions to automatically determine which JSON file belongs to each architectural entity.

This approach simplifies project maintenance, keeps the structure predictable, and enables the Build System to perform dependency analysis and incremental rebuilding automatically without requiring additional configuration.
