# Build System Overview

The Build System is the central part of the project.

It is responsible not only for compiling source files, but also for implementing and maintaining the architectural approach adopted throughout the project.

Unlike traditional build systems, the Build System operates not only on files, but also on architectural entities such as Pages, Sections, Components, Templates, and Data.

## Main Responsibilities

The Build System performs several interconnected tasks:

- preparing the build environment;
- processing project assets;
- rendering HTML pages;
- analyzing architectural dependencies;
- performing incremental rebuilding;
- enforcing architectural conventions;
- providing a development server and file watching.

All of these mechanisms work together as a unified system built upon a shared architectural model.

## Architectural Approach

The Build System does not require additional configuration to describe the project's structure.

Instead, it relies on naming conventions, directory organization, and the Template API to automatically identify architectural entities and the relationships between them.

This approach allows developers to focus on the architecture of the project rather than configuring the build system itself.

## Build Lifecycle

Each build goes through a sequence of well-defined stages.

```text
Source Files
      │
      ▼
Reset Output Directory
      │
      ▼
Process Assets
      │
      ▼
Render Templates
      │
      ▼
Write Output
      │
      ▼
Development Server / Watch Mode
```

Each stage is responsible for its own area of work and remains independent from the internal implementation of the other parts of the Build System.

## Core Mechanisms

The Build System is based on several interconnected mechanisms:

- Template API;
- Build Pipeline;
- Dependency Graph;
- Incremental Build;
- Watch Mode.

Each of these mechanisms is described in detail in the following sections of this documentation.
