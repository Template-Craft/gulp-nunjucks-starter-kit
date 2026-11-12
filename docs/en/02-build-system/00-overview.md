# Build System Overview

The Build System is the project's central part. Unlike a typical bundler, it works not just with files but with architectural entities: Pages, Sections, Components, Templates, Data.

## Main responsibilities

- preparing the build environment;
- processing project assets;
- rendering HTML pages;
- analyzing architectural dependencies;
- incremental rebuilding;
- the dev server and watch mode.

## Architectural approach

The Build System doesn't require configuring the project's structure — instead it relies on naming conventions, directory layout, and the Template API to determine entities and the relationships between them on its own.

## Build lifecycle

```text
Source Files
      │
      ▼
Reset Output Directory
      │
      ▼
Process Assets
      │
      ▼
Render Templates
      │
      ▼
Write Output
      │
      ▼
Development Server / Watch Mode
```

## Internal mechanisms

- Template API;
- Build Pipeline;
- Dependency Graph;
- Incremental Build;
- Watch Mode.

Each is covered in detail in the following sections.
