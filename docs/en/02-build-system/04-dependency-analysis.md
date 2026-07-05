# Dependency Analysis

Dependency Analysis is responsible for identifying relationships between the architectural entities of the project.

Unlike traditional file dependency analysis, the Build System analyzes the usage of architectural entities and maintains up-to-date information about where they are used.

## Purpose

The primary purpose of Dependency Analysis is to determine which parts of the project use a particular architectural entity.

For example:

```text
Component(Header)
        │
        ├── index.njk
        ├── about.njk
        └── contacts.njk
```

This information is used by the Build System during incremental builds to determine the scope of changes.

## Architectural Entities

Dependency Analysis works with the following entities:

- Components;
- Sections;
- Templates.

Each entity is analyzed independently according to the project's architectural conventions.

## How It Works

During analysis, the Build System scans the project's templates to determine which architectural entities they use.

The analysis is based on Template API calls rather than physical file paths.

As a result, dependency analysis is built upon the project's architectural model and remains independent of the directory structure.

## Eliminating False Dependencies

Before analyzing templates, the Build System removes Nunjucks and HTML comments.

This prevents commented Template API calls from being indexed and eliminates false dependencies.

## Analysis Result

The result of Dependency Analysis is an index of architectural entity usage.

For each entity, the Build System stores a list of files in which it is used.

This index does not describe the entire project structure. Instead, it contains only the information required to quickly determine the scope of changes.

## Why Dependency Analysis Exists as a Separate Mechanism

Determining dependencies is an independent responsibility within the Build System.

Separating this mechanism isolates architectural analysis from the subsequent rebuild logic and allows the analysis results to be reused by other Build System components.
