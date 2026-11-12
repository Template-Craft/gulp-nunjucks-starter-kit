# Development Workflow

```text
File changes → Determine change type → Dependency analysis → Incremental rebuild → BrowserSync → Page updates
```

## BrowserSync

Reloads the browser automatically after a build — CSS/images update in place (no page reload), HTML/JS trigger a full reload.

## Source Maps

In dev mode, SCSS gets Source Maps — browser devtools show the original `.scss` files instead of the compiled CSS.

## Console output and notifications

The Build System logs what's happening in detail to the console (in whatever language `settings.locale` picks, see Build System → Settings); on errors, it additionally shows a system notification (`node-notifier`).
