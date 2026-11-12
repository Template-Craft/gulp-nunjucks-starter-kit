# Performance

Dev speed isn't a side effect — it's an architectural requirement: most of the mechanisms that make things faster run automatically and need no configuration.

## Incremental Build + Dependency Cache

Only pages actually affected get rebuilt; the dependency map lives in process memory and is updated incrementally, not recomputed from scratch on every change (see the Build System section for details).

## What's deliberately disabled in dev

- CSSNano (CSS minification) — build only;
- HTML beautify — build only;
- a full production JS build — dev uses `eval-cheap-module-source-map` + webpack's filesystem cache instead.

## Fast feedback

BrowserSync updates the page right after the build finishes — no manual reload, so you can focus on writing code instead of waiting for it to compile.
