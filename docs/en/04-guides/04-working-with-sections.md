# Working with Sections

A Section describes the structure of one logical block of a page (Hero, About, Gallery, Contacts). For the directory layout (Landing Page vs. Multipage) and wiring things up through `getSection(...)`, see Development → Sections.

## The main rule

A Section groups Components into a finished block, but shouldn't duplicate markup across sections — the moment a piece of markup repeats in more than one Section, move it into a Component (see Working with Components).

## Which mode to pick

A single page file → Landing Page; several pages each with their own set of sections → Multi-page Project. Switching between modes doesn't require rewriting the Sections themselves, only their location and the `group` argument passed to `getSection`.
