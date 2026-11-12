# Landing Page

Use this mode when the project has a single page and Sections don't need to be grouped by site area. Set `settings.isMultipage: false` (this is also the default).

For the directory structure, the `sections/` example, and `getSection("", "...")`, see Architecture → Sections and Development → Sections (the "Single-page projects" part).

## What's different from Multipage

- `getSection(group, name)` is called with an empty `group` (`getSection("", "hero")`);
- `sections/` is a flat list of files, no nested per-page folders;
- Components and Templates work exactly the same, no differences there.

If the project later grows into several pages, switch to the Multi-page Project structure — the Components/Templates architecture doesn't change.
