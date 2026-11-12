# CSS Pipeline

```text
SCSS → Sass → PostCSS (Autoprefixer → Sort Media Queries) → CSSNano (только build) → CSS
```

Единственная точка входа — `src/assets/styles/main.scss` (`gulp/tasks/styles.mjs`).

## Sass

Компиляция SCSS → CSS через `sass` (Dart Sass). В dev-режиме сразу генерируются Source Maps (`sourcemaps: true` только при `app.isDev`).

## PostCSS

- **Autoprefixer** — браузерные префиксы по `browserslist` из `package.json` (ключ `stylesheets`);
- **postcss-sort-media-queries** — сортирует `@media` (`desktop-first`) для предсказуемого и компактного вывода.

## CSSNano — только в build

```js
app.isBuild ? [cssnano({ preset: [cssnanoPresetAdvanced, { discardComments: true, mergeRules: true, ... }] })] : [];
```

В dev-режиме CSSNano вообще не подключается — минификация стоит времени, а в dev она не нужна. Это сознательный выбор ради скорости цикла разработки, а не недосмотр.
