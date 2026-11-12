# Working with Components

Create a Component when an interface element is used more than once, or stands on its own as a self-contained logical block. For directory structure, naming, data, and usage (`getComponent`/`from ... import`), see Development → Components — same rules, same examples, no point repeating them here.

## When NOT to make a Component

- the element is used exactly once and isn't a self-contained logical block — keep the markup inside the Section;
- you need infrastructural markup other entities rely on (not a UI element) — that's a Template, not a Component (and a Template can't call a Component — see Development → Templates).

## The main rule

A Component is responsible only for its own functionality — not for page logic or structure. When it changes, the Build System finds every related page on its own and rebuilds only those.
