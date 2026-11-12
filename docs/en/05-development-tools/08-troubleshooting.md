# Troubleshooting

## Changes don't show up in the browser

- is the Build System still running (`npm run dev`)?
- any errors in the console?
- is the changed file inside `src/`?
- running in Docker? See [the Docker section](./09-docker.md) on `CHOKIDAR_USEPOLLING` (relevant on macOS/Windows).

## The expected page didn't rebuild

- is the Template API used correctly;
- does the entity's name match the convention;
- is the file in the right directory;
- **check for a `getComponent(...)` call inside `templates/`** — such links aren't tracked on purpose (see Development → Templates), and this is the most common hidden cause of "the page didn't update."

If the Build System can't unambiguously determine the dependency, it falls back to a full rebuild (that's expected behavior, not an error).

## Component not found

```njk
{% include getComponent("Header") %}
```

Check: the component's directory exists, the name's casing is correct, and it matches the naming convention.

## Section doesn't include

Make sure you're using the right call form.

Single-page project:

```njk
{% include getSection("", "about") %}
```

Multi-page project:

```njk
{% include getSection("about", "hero") %}
```

Also check the `sections/` directory structure and the value of `settings.isMultipage`.

## Template not found

```njk
{% include getTemplate("head") %}
```

The Starter Kit converts the template name into a file path automatically. Don't include Templates directly via relative paths.

## Data isn't updating

Check the JSON file's name, that it follows the naming convention, and that it lives in `src/views/data`. Also remember the distinction between local and global data: changing `Global.json` or `Common.json` rebuilds the whole project — that's expected.

## Build errors

When something fails, the Build System prints detailed output to the console. Start debugging from the first error message — later ones are often just a consequence of the original cause.

## If it's not one of these

Most of the time the cause shows up in the Build System's own messages. If it's still unclear: run a full rebuild, double-check every dependency is installed, and verify the project structure matches the Starter Kit's conventions. Following the architectural conventions almost always prevents these situations in the first place.
