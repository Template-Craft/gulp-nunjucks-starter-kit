# Architectural Approach

The architectural approach is the foundation the whole Build System is built around. It defines how the project is organized, what role each element plays, and how those elements interact. The Build System doesn't invent these rules — it implements and automates them.

## Why architecture matters more than tools

For small sites, the choice of build system or templating engine often looks like the main decision. As a project grows, it becomes clear that long-term complexity is driven by architecture, not tooling — architecture is what answers:

- how the project is organized;
- what role each type of template plays;
- where data lives;
- how code reuse is achieved;
- how the project's elements interact with each other;
- how changes propagate through the system.

Without these decisions — or when they're made ad hoc — a project loses predictability regardless of the stack behind it.

## Architecture defines the tools

The Build System is built on Gulp and Nunjucks because they let you implement an architectural approach that already existed — not because they define it. The tools can be replaced without changing the architecture itself.

## What follows from this

Every Build System capability is a consequence of the architectural approach, not an independent feature:

```text
Architecture
      │
      ▼
Project Structure
      │
      ▼
Separation of templates by responsibility (Pages / Sections / Components / Templates)
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
Build Pipeline
```

Each level builds on the one before it — that's why the following sections cover them in exactly this order.
