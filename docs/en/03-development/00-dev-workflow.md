# Development Workflow

The Build System shapes not just the build itself but the recommended order of work: every entity has its own area of responsibility, a naming convention, and predictable links to everything else — which is exactly what lets the Build System analyze dependencies and rebuild only what's needed.

## Typical cycle

1. Create an entity (Page, Section, Component, or Template) in the right directory.
2. Follow the naming conventions.
3. Wire it up through the Template API.
4. Run `npm run dev` and work on your part of the project.

The Build System handles dependency analysis and rebuilding on its own.

## Incremental Build in practice

After every change, the Build System determines which pages are actually affected and updates only those — regardless of project size (see Build System → Incremental Build for details).

## Next

The following documents cover creating and using each entity in practice.
