# CSS Pipeline

```text
SCSS → Sass → PostCSS (Autoprefixer → Sort Media Queries) → CSSNano (build only) → CSS
```

The single entry point is `src/assets/styles/main.scss` (`gulp/tasks/styles.mjs`).

## Sass

SCSS → CSS compilation through `sass` (Dart Sass). In dev mode, Source Maps are generated immediately (`sourcemaps: true` only when `app.isDev`).

## PostCSS

- **Autoprefixer** — vendor prefixes driven by the `browserslist` entry in `package.json` (the `stylesheets` key);
- **postcss-sort-media-queries** — sorts `@media` rules (`desktop-first`) for predictable, more compact output.

## CSSNano — build only

```js
app.isBuild ? [cssnano({ preset: [cssnanoPresetAdvanced, { discardComments: true, mergeRules: true, ... }] })] : [];
```

In dev mode, CSSNano isn't even wired in — minification costs time, and dev doesn't need it. That's a deliberate choice for the sake of the dev loop's speed, not an oversight.
