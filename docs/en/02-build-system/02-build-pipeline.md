# Build Pipeline

The sequence of stages the project goes through during a build. Each stage owns one area and doesn't depend on the internal implementation of the rest.

```text
Reset
   │
   ▼
Assets Processing
   │
   ▼
Template Rendering
   │
   ▼
Output Generation
```

## Task isolation

Each Gulp task is responsible for exactly one type of resource: `styles` handles stylesheets, `scripts` handles client JS, `images`/`fonts` handle assets, `templates` builds the HTML. This lets you change or extend one stage without touching the rest of the Build System.

## Orchestration

Sequencing and parallelism are set via `gulp.series`/`gulp.parallel` in `gulpfile.mjs` — the Pipeline itself contains no business logic, it just wires independent tasks together.

## Full vs. incremental build

A full build runs on `npm run build` or the first `npm run dev` start. During development, incremental build takes over — only the entities affected by a given change get processed (see Incremental Build).
