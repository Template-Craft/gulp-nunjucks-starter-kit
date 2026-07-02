# Template API

The Template API provides a unified way to access architectural entities within the project.

Instead of referencing physical file paths, templates use architectural addresses that remain independent of the project's directory structure.

## Purpose

The primary goal of the Template API is to decouple templates from the physical organization of files.

A template should describe **what** it uses rather than **where** it is located.

This approach allows the internal structure of the project to evolve without requiring changes to existing templates.

## Available API

The Build System provides several global helper functions.

### Components

Components are included using:

```njk
{% include getComponent("Header") %}
```

If the Component is implemented as a Nunjucks macro:

```njk
{% from getComponent("Header") import Header %}
```

### Sections

For Landing Page projects:

```njk
{% include getSection("", "about") %}
```

For Multipage projects:

```njk
{% include getSection("about", "hero") %}
```

### Templates

```njk
{% include getTemplate("head") %}
```

### Data

```njk
{{ getData("Global") }}
```

## Why Template API Exists

The Template API separates architectural concepts from physical file locations.

As a result:

- templates remain independent of the directory structure;
- architectural entities have a consistent access mechanism;
- project organization can change without modifying existing template code.

This makes the project easier to maintain and scale over time.
