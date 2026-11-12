# Dependency Cache

Holds the result of Dependency Analysis in process memory and keeps it current, instead of rescanning the whole project on every change.

```text
Initial Build
      │
      ▼
Dependency Analysis
      │
      ▼
Dependency Cache
      │
      ▼
───────────────
      │
      ▼
File Changed
      │
      ▼
Update Cache Entry
      │
      ▼
Incremental Build
```

## How it gets updated

On startup (`npm run dev`), a full analysis runs once and the cache is built. After that it's updated two ways (`gulp/utils/updateDependencyMap.mjs`):

- **from the entity's side** — when the defining file itself changes (e.g. `Header.njk`), the already-known users of that entity are rescanned;
- **from the file's side** (`syncFileUsages`) — when ANY `.njk` file changes, it's rescanned for every `getComponent`/`getSection`/`getTemplate` call it contains, and the map is updated from its point of view. This is needed so a new call, just added to an already-existing file, lands in the graph immediately instead of waiting for the next full rebuild.

Before writing, the new map is compared against the old one (`isSameMap`) — if nothing changed, the cache is left alone and no extra log line is printed.

## Memory protection

The cache is just an in-memory object with no TTL. The only safeguard against unbounded growth is `settings.cache.maxMemoryMB` (`gulp/config/settings.mjs`): if `heapUsed` exceeds the threshold, the cache is cleared entirely and rebuilt on the next access.
