# Design Principles

The architectural approach implemented by the Build System is based on a small set of fundamental design principles.

Every architectural decision described throughout this documentation is derived from one or more of these principles.

---

## Architecture Defines the Tools

Technology choices are always driven by architectural requirements.

The Build System is built on Gulp and Nunjucks not because these technologies are mandatory, but because they provide an effective foundation for implementing the project's architectural concepts.

Should more suitable technologies emerge in the future, the architectural approach itself would remain unchanged.

---

## One Responsibility per Architectural Entity

Every architectural entity has a single, clearly defined responsibility.

For example:

- **Pages** define application entry points.
- **Sections** compose the structure of individual pages.
- **Components** provide reusable user interface elements.
- **Templates** implement reusable infrastructure templates.
- **Data** serves as the source of information used during rendering.

Clear separation of responsibilities makes the project easier to understand, maintain and evolve.

---

## Project Structure Should Be Self-Explanatory

The project structure should communicate its architecture without requiring developers to study the documentation or source code first.

A developer opening the project for the first time should be able to understand the purpose of its primary directories simply by looking at their names and organization.

---

## Reusability Is an Architectural Principle

Code reuse is not treated as an optional feature.

Instead, the project architecture is intentionally designed so that reusing Components, Sections and Templates becomes a natural consequence of the overall structure.

---

## The Build System Must Understand the Architecture

The Build System operates on more than just files.

It understands architectural entities such as Pages, Sections, Components, Templates and the relationships between them.

This enables a significantly higher level of automation than traditional file-based processing.

---

## Every Dependency Must Be Known

Relationships between architectural entities should always be visible to the Build System.

This allows the system to analyze changes, construct the Dependency Graph and rebuild only the parts of the project that are actually affected.

---

## Performance Is a Consequence of Architecture

Optimizing the build process is not an independent objective.

Capabilities such as Incremental Build become possible because the Build System understands the project's architecture and has complete knowledge of the relationships between its entities.
