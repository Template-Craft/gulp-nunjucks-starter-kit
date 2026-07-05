# Pages

A Page represents the final build target.

Each page is compiled into a separate HTML file and forms the highest architectural level of the project.

## Location

All Pages are located in:

```text
src/views/pages/
```

Each `.njk` file corresponds to a single HTML page after the build process.

## Creating a Page

To create a new page, simply add a new file.

```text
src/views/pages/
├── index.njk
├── about.njk
└── contacts.njk
```

No additional registration is required.

## Usage

A Page combines the other architectural entities of the project.

Typically, it:

- includes Templates;
- includes Sections;
- uses global data.

Pages are not intended to contain reusable markup.

Reusable parts of the interface should be moved into Components, Sections, or Templates.

## Page Data

If necessary, a Page can have its own JSON data file.

The file name must match the page name.

```text
pages/
    about.njk

data/
    about.json
```

Changing this file rebuilds only the corresponding page.

## Incremental Build

Changing a Page does not require dependency analysis.

The Build System rebuilds only the modified page.
