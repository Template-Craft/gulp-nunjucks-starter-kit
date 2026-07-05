# Dependency Cache

Dependency Cache stores the results of Dependency Analysis and keeps them up to date.

Instead of reanalyzing the entire project after every change, the Build System uses the existing dependency index and updates only the part related to the modified architectural entity.

## Purpose

The primary purpose of Dependency Cache is to reduce the amount of work required to determine the scope of changes.

Once the initial analysis is complete, the Build System has an up-to-date index of architectural entity usage that can be reused during subsequent builds.

## How It Works

During the initial build, the Build System performs a full project analysis and creates the dependency index.

Throughout the rest of the development process, this index is not rebuilt from scratch.

After a file changes, the Build System determines the type of architectural entity, reanalyzes only its usage, and updates the corresponding cache entry.

All remaining information stays unchanged.

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

## Incremental Updates

Dependency Cache is updated incrementally.

Changing a single Component, Section, or Template does not trigger a new analysis of the remaining architectural entities.

As a result, the cost of updating the cache remains nearly constant regardless of the project's size.

## Interaction with Other Mechanisms

Dependency Cache serves as a shared integration point between several Build System mechanisms.

- Dependency Analysis creates and updates the dependency index.
- Incremental Build uses the index to determine the scope of changes.
- Watch Mode initiates the update process after detecting file changes.

Each mechanism is responsible only for its own area of responsibility.

## Why Dependency Cache Exists as a Separate Mechanism

Storing analysis results is an independent responsibility.

Separating Dependency Cache into its own mechanism eliminates unnecessary project-wide analysis, reduces change processing time, and preserves the modular architecture of the Build System.

## Architectural Outcome

Dependency Cache enables the Build System to make decisions based on already known architectural relationships within the project.

This is what allows Incremental Build to remain fast even as the number of Pages, Components, Sections, and Templates continues to grow.
