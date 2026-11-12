# Pages

Pages are the Build System's entry points. Every file in `views/pages/` becomes a separate HTML page after the build.

## Responsibility

A Page is responsible only for composing the page: which Sections are used, in what order, what data is needed, and which Template serves as the base. A Page shouldn't contain complex logic or reusable markup — that's the job of Sections, Components, and Templates.

```njk
{% from getTemplate('head') import HTMLHead %}
<html>
  <head>{{ HTMLHead() }}</head>
  <body>
    {% from getComponent('Header') import Header %}
    {{ Header() }}

    {% include getSection('', 'first_section') %}

    {% from getComponent('Footer') import Footer %}
    {{ Footer() }}

    {% include getTemplate('scripts') %}
  </body>
</html>
```

## Data

A Page can use its own data, global data (`Global.json`), and data needed by the entities it includes. The page itself shouldn't become a data source for other parts of the project.

## Incremental Build

For the Build System, a Page is the final target of the build and the unit Incremental Build operates on. When a component, section, template, or data file changes, the Build System figures out which Pages depend on it and rebuilds only those.
