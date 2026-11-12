# Dependency Analysis

Determines relationships between a project's architectural entities — not file dependencies, but which Pages/Sections use a given Component, Section, or Template.

```text
Component(Header)
        │
        ├── index.njk
        ├── about.njk
        └── contacts.njk
```

Incremental Build needs this to determine a change's area of effect.

## How it works

The Build System scans `.njk` files for Template API calls (`getComponent`, `getSection`, `getTemplate`) — not for physical paths. Before scanning, Nunjucks and HTML comments are stripped from the file (`gulp/utils/stripComments.mjs`), so a commented-out call doesn't end up in the graph as a real dependency.

The result is an index of `entity → files where it's used` (`gulp/utils/findComponentUsages.mjs`, `findSectionUsages.mjs`, `findTemplatesUsages.mjs`), not a description of the whole project structure.

## Limitation

The analysis is regex-based, not AST-based — it can't see dynamic names (`getComponent(someVar)`). Such cases need a full rebuild; in practice entity names in the project are static, so this doesn't get in the way of day-to-day work.
