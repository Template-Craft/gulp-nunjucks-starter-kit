# Watch Mode

Watch Mode keeps the Build System running continuously during development.

It monitors changes to source files, determines which architectural entities are affected, and triggers only the required build steps.

## Purpose

The primary purpose of Watch Mode is to minimize the time between changing the source code and seeing the result.

Instead of executing a complete rebuild, the Build System analyzes the change and performs only the necessary actions.

## Change Detection

Watch Mode observes every architectural area of the project.

For example:

- Templates;
- Components;
- Sections;
- Data;
- Styles;
- Scripts;
- Images;
- Fonts.

When a change is detected, the corresponding task is passed to the Build System for further processing.

## Interaction with Other Mechanisms

Watch Mode does not make rebuild decisions on its own.

Its responsibility is limited to detecting changes and passing that information to other Build System mechanisms.

The Dependency Graph then analyzes the change and determines which architectural entities must be updated.

## Working with the Development Server

During development, Watch Mode works together with the Development Server.

After processing a change, the server automatically provides the updated version of the project without requiring a manual restart.

## Why Watch Mode Is a Separate Mechanism

Separating file watching from rebuild logic allows the Build System to maintain a modular architecture.

Watch Mode is responsible only for detecting changes.

Dependency analysis, rebuild decisions, and task execution remain the responsibility of other Build System components.
