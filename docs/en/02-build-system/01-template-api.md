# Template API

The abstraction layer between the project's architectural model and its physical structure. Instead of relative paths, templates reach architectural entities through a single set of functions — the Build System resolves the physical location itself.

```njk
{% include getComponent("Header") %}
{% include getSection("about", "hero") %}
{% include getTemplate("head") %}
{% set siteData = getData("Global") %}
```

## Available functions

| Function                  | Purpose                                            |
| -------------------------- | --------------------------------------------------- |
| `getComponent(name)`       | Path to a Component's template.                     |
| `getSection(group, name)`  | Path to a Section's template (`group` is empty for a Landing Page). |
| `getTemplate(name)`        | Path to an infrastructural Template.                |
| `getData(name)`            | Reads `src/views/data/<name>.json` and returns it as an object. |
| `jsonParse` (filter)       | `{{ value \| jsonParse }}` — parses a JSON string inside a template. |

All functions and the filter are registered in the Nunjucks runtime when the Build System starts (`gulp/tasks/templates.mjs`) and are available in any `.njk` file without extra imports.

## Why not relative paths

Relative paths hard-wire templates to the file structure. The Template API removes that dependency: changing the directory layout doesn't require touching existing calls, because the Build System resolves the architectural address to a file itself.
