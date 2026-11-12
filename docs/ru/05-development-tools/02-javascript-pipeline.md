# JavaScript Pipeline

```text
JavaScript (ESM) → Babel (babel-loader) → Webpack → Bundle
```

Точка входа — `src/scripts/main/app.mjs` (`gulp/tasks/scripts.mjs`).

## Babel + core-js

`@babel/preset-env` таргетится на `browserslist` (ключ `javascripts`), `babel-plugin-polyfill-corejs3` добавляет полифиллы `core-js` только там, где они реально используются (`method: 'usage-global'`). Версия в опциях плагина (`version: '3.51'`) должна совпадать с версией установленного `core-js` — при обновлении `core-js` это значение нужно поднимать вручную.

## Webpack

Алиас `Components` указывает на `src/views/components/` — импорт клиентской логики компонента без относительных путей:

```js
import something from 'Components/Header/Header.mjs';
```

## Dev vs Production

| | Dev | Build |
| --- | --- | --- |
| `devtool` | `eval-cheap-module-source-map` | выключен |
| `cache` | `{ type: 'filesystem' }` | выключен |
| минификация | нет | да, с суффиксом `.min.js` |

Filesystem-кэш и быстрые source maps в dev — ради скорости пересборки, не ради качества итогового бандла (это задача build-режима).
