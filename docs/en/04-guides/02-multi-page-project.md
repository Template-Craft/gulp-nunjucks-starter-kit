# Multi-page Project

Use this mode when there are several pages and each has its own set of Sections. Set `settings.isMultipage: true`.

For the directory structure, the `sections/<page>/` example, and `getSection("about", "hero")`, see Architecture → Sections and Development → Sections (the "Multi-page projects" part).

## What's different from Landing Page

- `sections/` is grouped by page instead of being a flat list;
- `getSection(group, name)` is called with a non-empty `group` — the page's name;
- identical Section names across different pages don't conflict — they belong to different architectural areas.

Components and Templates stay shared across the whole project regardless of mode — the same Component can be used in Sections belonging to any page, without restriction.
