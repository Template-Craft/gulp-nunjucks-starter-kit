# Design Principles

The Build System's architectural approach rests on a handful of principles. Every decision described in the rest of the documentation follows from one or more of them.

## Architecture defines the tools

Gulp and Nunjucks were chosen not because they're mandatory, but because they implement an architectural approach that already existed. If better tools come along, the approach stays the same.

## One element — one responsibility

- **Pages** are the application's entry points.
- **Sections** structure individual pages.
- **Components** hold reusable interface elements.
- **Templates** provide infrastructural markup.
- **Data** is the source of content for templates.

This separation is what makes the architecture predictable — which is why the sections on each entity below don't repeat a separate "why is this its own thing" justification: the reason is always this one.

## Project structure must be self-evident

A developer opening the project for the first time should understand what each top-level directory is for from its name and position in the tree — without reading documentation or source code.

## Reuse is part of the architecture, not an afterthought

The architecture is built so that reusing Components, Sections, and Templates is a natural consequence of the structure, not a separate practice someone has to maintain by hand.

## The Build System understands architecture, not just files

The Build System operates on architectural entities — pages, sections, components, templates, and the relationships between them — not on files matched by a glob. That's what enables a level of automation plain file processing can't reach.

## Every dependency must be known to the system

Relationships between entities must be visible to the Build System — this is the basis for the Dependency Graph and for rebuilding only the pages actually affected by a change.

## Performance is a consequence of architecture

Incremental Build isn't a separate optimization bolted on — it's possible because the Build System already understands the project's architecture and every dependency between its elements.
