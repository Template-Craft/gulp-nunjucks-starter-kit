# gulp-nunjucks-starter-kit

> **Architecture-first Starter Kit focused on maintainable frontend development with Nunjucks.**

## Why this project exists

Most build systems focus on automating development tasks such as compiling templates, processing stylesheets, bundling JavaScript or running a development server.

As projects grow, however, the primary challenge is rarely the tooling itself. Long-term maintainability depends on architecture: project structure, reusable components, data organization and dependency management.

**gulp-nunjucks-starter-kit** was created as the result of years of refining an architectural approach across real-world projects.

Rather than introducing a new development methodology, the project formalizes proven architectural patterns and provides a build system that supports them.

---

## Architecture First

The core principle of this project is simple:

> **Architecture defines the tools — not the other way around.**

Gulp, Nunjucks and every other technology used in this project are implementation details of a larger architectural vision.

```text
Architecture
      │
      ▼
Project Structure
      │
      ▼
Naming Conventions
      │
      ▼
Template API
      │
      ▼
Dependency Graph
      │
      ▼
Incremental Build
      │
      ▼
Development Experience
```

The Starter Kit is built around this idea, ensuring that every part of the development workflow follows the same architectural principles.

---

## Features

- Opinionated project architecture.
- Consistent project structure.
- Pages, Sections, Components and Templates.
- Centralized data organization.
- Template API for reusable templates.
- Automatic dependency analysis.
- Dependency Graph.
- Incremental Build.
- Intelligent rebuild strategy.
- Ready-to-use development environment.
- Integrated code quality tools.
- Comprehensive documentation.

These features are not isolated capabilities but different aspects of a single architectural approach.

---

## Project Goals

The Starter Kit was designed to:

- provide a scalable and maintainable project architecture;
- minimize project setup;
- reduce repetitive manual work;
- improve long-term maintainability;
- establish consistent development conventions;
- optimize the development workflow;
- let developers focus on building websites instead of configuring tooling.

---

## Project Status

> **Active development**

The Starter Kit is actively maintained and continuously improved.

Although it is already used in production projects, both the documentation and some internal APIs continue to evolve.

---

## Requirements

Before getting started, make sure the following software is installed:

- Node.js **22** or newer
- npm **10** or newer
- Git

### Recommended

- Visual Studio Code

The Starter Kit is editor-agnostic, but Visual Studio Code provides the best development experience thanks to the preconfigured workspace included with the project.

---

## Quick Start

### 1. Create a new project

This repository is configured as a **GitHub Template Repository**.

Click **Use this template** on GitHub to create a new project with the complete project structure, build system and development environment already configured.

Alternatively, you can clone the repository manually.

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

The development server starts automatically with BrowserSync enabled.

### 4. Open the project

Open the project in Visual Studio Code.

The Starter Kit already contains a preconfigured `.vscode` workspace. Visual Studio Code will automatically recommend the required extensions, allowing you to start developing immediately without additional configuration.

### 5. Explore the documentation

The documentation is intended to be read in the following order:

1. Philosophy
2. Architecture
3. Build System
4. Development
5. Guides
6. Development Tools

Following this order provides a complete understanding of both the architectural concepts and the implementation details behind the Starter Kit.

---

## Documentation

## Documentation

The project documentation is available in the `docs/` directory.

For the best learning experience, it is recommended to read the documentation in the following order:

1. Philosophy
2. Architecture
3. Build System
4. Development
5. Guides
6. Development Tools

Each section focuses on a different aspect of the Starter Kit, from its architectural philosophy to practical development workflows and implementation details.

### Available languages

- 🇬🇧 English — `docs/en/`
- 🇷🇺 Русский — `docs/ru/`

Additional translations may be added in the future.

### Philosophy

Explains the architectural principles and design decisions behind the project.

### Architecture

Describes the project structure, directory layout and responsibilities of every architectural entity.

### Build System

Documents the internal implementation of the build system, dependency graph, incremental rebuild logic and development pipeline.

### Development

Provides everything required to start working with the Starter Kit, including project setup, recommended workflow and development environment.

### Guides

Practical guides covering Pages, Sections, Components, Templates and Data, together with naming conventions and recommended usage patterns.

### Development Tools

Describes the integrated tooling used by the project, including linting, formatting, compilation, JavaScript bundling and editor integration.

---

## Ecosystem

The Starter Kit can be extended with additional tools.

One of them is **nsk-tools** — an optional CLI utility that automates repetitive development tasks while remaining completely independent from the build system itself.

This separation keeps the Starter Kit lightweight while allowing the ecosystem to evolve independently.

---

## Contributing

Contributions, ideas, bug reports and pull requests are always welcome.

If you have suggestions for improving the architecture, development workflow or documentation, feel free to open an issue or start a discussion.

---

## License

Released under the MIT License.
