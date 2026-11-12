# Incremental Build

Rebuilds only the parts of the project actually affected by a change, using the result of Dependency Analysis instead of a full rebuild.

```text
File Changed
      │
      ▼
Determine Entity
      │
      ▼
Dependency Analysis
      │
      ▼
Affected Pages
      │
      ▼
Rebuild
```

## Area of effect

Changing a Component doesn't mean rebuilding the whole project — only the Pages that use Sections containing that Component get rebuilt. The same logic applies to every other entity (`gulp/tasks/templates.mjs: resolveRenderTargets`).

## Working with the Dependency Cache

Incremental Build doesn't re-analyze the project on every change — it uses the up-to-date index from the Dependency Cache, so determining the area of effect takes roughly constant time regardless of project size.

## When no link is found

If the Build System can't unambiguously determine the area of effect (for example, an entity hasn't yet appeared in any known file), it falls back to a full rebuild of every page — a deliberate safe fallback, not an error.
