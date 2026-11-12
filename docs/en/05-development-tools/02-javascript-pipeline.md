# JavaScript Pipeline

```text
JavaScript (ESM) → Babel (babel-loader) → Webpack → Bundle
```

The entry point is `src/scripts/main/app.mjs` (`gulp/tasks/scripts.mjs`).

## Babel + core-js

`@babel/preset-env` targets the `browserslist` entry (the `javascripts` key); `babel-plugin-polyfill-corejs3` adds `core-js` polyfills only where they're actually used (`method: 'usage-global'`). The version in the plugin's options (`version: '3.51'`) must match the installed `core-js` version — bump it by hand whenever `core-js` gets updated.

## Webpack

The `Components` alias points at `src/views/components/` — import a component's client-side logic without relative paths:

```js
import something from 'Components/Header/Header.mjs';
```

## Dev vs. Production

| | Dev | Build |
| --- | --- | --- |
| `devtool` | `eval-cheap-module-source-map` | disabled |
| `cache` | `{ type: 'filesystem' }` | disabled |
| minification | no | yes, with a `.min.js` suffix |

The filesystem cache and fast source maps in dev exist for rebuild speed, not for the quality of the final bundle — that's the build mode's job.
