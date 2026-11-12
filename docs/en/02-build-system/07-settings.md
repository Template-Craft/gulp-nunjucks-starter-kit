# Build System Settings

Every parameter that affects the Build System's behavior lives in one place:

```text
gulp/config/settings.mjs
```

## Project mode

```js
isMultipage; // false = Landing Page, true = Multipage Project
```

Some mechanisms (for example, how `getSection` addresses Sections) behave differently depending on this flag.

## Console output language

```js
locale: 'en'; // 'en' | 'ru' | 'pl' | ...
```

Translations live in `gulp/i18n/locales/*.mjs` — one file per language. If the given locale isn't supported, or a specific string is missing from it, English is used (both as the fallback and as the default). Technical tags in logs (`[Cache]`, `[DEBUG]`, entity names) are never translated — they're grep-able labels, not prose.

## Dependency Cache

```js
cache: {
  autoRebuild: true,   // build the cache on dev startup
  maxMemoryMB: 300,    // memory limit; the cache is cleared past it
  verbose: true,        // log cache access
  debugTables: false,   // always print dependency tables, not just on a fresh analysis
}
```

See the Dependency Cache section for details.

## Runtime Monitor

```js
monitor: {
  maxMemoryMB: Math.round((os.totalmem() / 1024 / 1024) * 0.15), // 15% of RAM
  maxCpuPercent: CORES * 60,
  intervalMs: 10_000,
}
```

`os.totalmem()` always returns the HOST's memory — if the Build System runs inside a memory-capped Docker container, set the real limit explicitly via the `DOCKER_MEM_LIMIT_MB` environment variable (see the Docker section): the threshold is then computed from it instead of the host's memory.

## Debugging

```js
debug: false;
```

Turns on extra diagnostics. Not needed for everyday development.
