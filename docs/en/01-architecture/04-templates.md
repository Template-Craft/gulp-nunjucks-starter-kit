# Templates

## Purpose

A **Template** is a reusable infrastructure template.

Unlike Components, Templates are not intended to represent user interface elements. Instead, they provide reusable markup that supports other architectural entities.

Typical examples include layouts, wrappers, form fragments and other reusable rendering structures.

---

## Responsibilities

A Template is responsible for:

- providing reusable infrastructure markup;
- reducing duplication across Components and Sections;
- accepting rendering parameters;
- remaining independent of any specific Page or Section.

Templates should focus exclusively on rendering infrastructure.

---

## Composition

Templates are typically used by Components or Sections.

Rather than representing standalone interface elements, they provide reusable markup that simplifies the implementation of higher-level architectural entities.

---

## Organization

All Templates are stored in a single directory.

```text
src/views/templates/
├── _head.njk
├── _form.njk
├── _select.njk
├── _option.njk
└── _card-layout.njk
```

The directory contains infrastructure templates shared across the entire project.

---

## Naming Convention

All Template files begin with an underscore (`_`).

The file name should describe the purpose of the template rather than a specific page or feature.

---

## Access Through the Template API

Templates are included through the Template API.

```njk
{% include getTemplate("head") %}
```

Developers reference the architectural name of the Template rather than its physical location.

The build system resolves the corresponding file automatically.

This allows the internal directory structure to change without affecting existing template calls.

---

## Data

Templates do not have dedicated JSON data files.

Instead, they use global data or receive all required information from the Components or Sections that include them.

Templates are intentionally designed to remain independent of application data and focus solely on reusable rendering logic.

---

## Why Templates Exist Separately

Templates solve infrastructure-level rendering problems.

Keeping them separate from Components prevents reusable interface elements from becoming cluttered with generic markup while encouraging consistent reuse throughout the project.
