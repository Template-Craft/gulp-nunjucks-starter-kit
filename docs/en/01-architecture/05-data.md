# Data

Data is the architectural area responsible for content: templates define structure, Data provides the substance. All JSON files live in a single directory, regardless of which entity they belong to:

```text
src/views/data/
```

## Data levels

Global sources (`Global.json`, `Common.json`) are available to the whole project. Local sources belong to a specific entity — for example, a component can have its own data file sharing the component's name.

```text
src/views/
├── components/
│   └── Header/
│       └── Header.njk
└── data/
    └── Header.json
```

## Naming

A JSON file's name must exactly match the name of the entity it belongs to (`Header.json` → component `Header`, `about.json` → section `_about.njk` or page `about.njk`). That match is all the Build System needs to link data to an entity — no extra configuration required.

## Reading data

```njk
{% set siteData = getData('Global') %}
{{ getData("Header").title }}
```

The Build System reads the corresponding JSON file and passes its contents into the template through the Template API.
