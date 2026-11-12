# Creating a Project

A new project starts with architecture, not with configuring the Build System: decide on the structure, the main Sections, and the reusable Components before you write the first page.

## Steps

1. Create the first page: `src/views/pages/index.njk` (plus `data/index.json` if it needs data).
2. Pick a mode — Landing Page or Multipage (see below) — and set `settings.isMultipage` accordingly.
3. Break the page into Sections, wire them up with `getSection(...)`.
4. Extract repeated elements into Components.
5. `npm run dev` — the Build System tracks dependencies from here on.

Directory structure and naming conventions live in Development → Project Conventions; examples of wiring up each entity live in the corresponding files in the Development section.

## nsk-tools (optional)

Creating files/directories can be automated with the independent **nsk-tools** CLI — entirely optional, purely a convenience.
