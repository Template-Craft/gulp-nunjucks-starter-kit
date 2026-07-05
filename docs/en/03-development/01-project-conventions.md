# Project Conventions

The Build System is based on conventions.

The project structure, file naming rules, and methods of connecting architectural entities are all part of the project's architecture.

Following these conventions ensures that Dependency Analysis and Incremental Build work correctly.

## Project Structure

Each type of architectural entity has its own dedicated directory.

```text
src/views/
├── components/
├── data/
├── pages/
├── sections/
└── templates/
```

Each directory has a clearly defined purpose.

Changing the project structure requires corresponding changes to the Build System.

## Naming Conventions

The Build System uses naming conventions to automatically locate related files.

### Components

Components use the PascalCase naming convention.

```text
Header/
Footer/
Navigation/
```

### Sections

Sections use file names prefixed with an underscore.

```text
_about.njk
_hero.njk
```

When Sections are grouped by page or feature, the same convention applies.

```text
about/
    _hero.njk
    _gallery.njk
```

### Templates

All Templates are located in the `templates` directory and also use the underscore prefix.

```text
_head.njk
_scripts.njk
```

When using the Template API, the underscore is omitted.

```njk
{% include getTemplate("head") %}
```

### Data

Data files should use the name of the architectural entity they belong to.

```text
Header.json
Footer.json
About.json
```

Global data uses reserved names.

```text
Global.json
Common.json
```

## Template API

Architectural entities are connected exclusively through the Template API.

This allows the Build System to analyze project dependencies without requiring additional configuration.

## Following the Conventions

The Build System does not require Components, Sections, or Templates to be registered manually.

Simply place the entity in the correct directory, follow the naming conventions, and use the Template API.

The entity then automatically becomes part of the project's architecture.
