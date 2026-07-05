# Incremental Build

Incremental Build rebuilds only the parts of the project that are actually affected by a change.

Instead of performing a complete rebuild, the Build System uses the results of Dependency Analysis to determine the minimum amount of work required.

## Purpose

The primary purpose of Incremental Build is to reduce development time by rebuilding only the affected architectural entities.

After a file changes, the system determines not only its type but also the impact of that change on the rest of the project.

## How It Works

Changes are processed through several stages.

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

Each stage performs a single task and uses the results produced by the previous stage.

## Scope of Changes

The Build System decides what to rebuild based on architectural relationships.

For example, modifying a Component does not automatically trigger a rebuild of the entire project.

Only the Pages that use Sections containing that Component will be rebuilt.

The same approach is applied to all other architectural entities.

## Working with Dependency Cache

Incremental Build does not perform a full dependency analysis after every change.

Instead, it uses the current dependency index maintained by the Build System.

As a result, determining the scope of changes requires only a minimal amount of time regardless of the project's size.

## Why Incremental Build Exists as a Separate Mechanism

Incremental Build is responsible exclusively for deciding what needs to be rebuilt.

It neither analyzes dependencies nor stores the analysis results.

This separation of responsibilities keeps the Build System architecture simple, modular, and predictable.
