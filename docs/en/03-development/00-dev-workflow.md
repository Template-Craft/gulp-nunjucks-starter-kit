# Development Workflow

The Build System defines not only the project's build process but also the recommended approach to development.

It is based on an architectural model in which every entity has a clearly defined responsibility, naming conventions, and predictable relationships with other parts of the project.

Following these conventions allows the Build System to automatically analyze dependencies and perform incremental rebuilding of only the affected pages.

## Development Process

A typical development workflow consists of several steps:

1. Create a new architectural entity (Page, Section, Component, or Template).
2. Place it in the appropriate directory.
3. Follow the established naming conventions.
4. Use the Template API to connect architectural entities.
5. Start the development mode and focus only on the part of the project being modified.

The Build System automatically determines the relationships between entities and performs the required rebuild.

## Architectural Conventions

The project is built around conventions.

The Build System expects a specific directory structure, file naming rules, and methods for connecting architectural entities.

Following these conventions is part of the project's architecture and eliminates the need for additional configuration.

## Incremental Build

During development, there is no need to manually determine which pages should be rebuilt.

After every change, the Build System automatically analyzes architectural dependencies and updates only the pages that are actually affected.

This approach keeps development fast even as the project grows.

## Next

The following documents describe in detail how to create and use each architectural entity within the project.
