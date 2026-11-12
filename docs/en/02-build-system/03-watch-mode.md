# Watch Mode

Watches source files during development, figures out which entities are affected, and runs only the necessary build stages — instead of the full cycle.

## What gets watched

`gulpfile.mjs` keeps a separate watcher per area:

- Templates / Components / Sections / Data (`.njk`, `.json`) — one watcher, the change type is determined from the file's path;
- Styles (`.scss`);
- Scripts (`.js`/`.mjs`);
- Images;
- Fonts.

## Interaction with other mechanisms

Watch Mode itself doesn't decide what to rebuild — it detects a change and passes it on. The actual analysis of what's affected happens in the dependency system (see Dependency Analysis and Incremental Build).

## Dev server

After processing a change, BrowserSync reloads the page automatically — no manual refresh needed.
