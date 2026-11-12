# Working with Data

A naming convention links a JSON file to an entity automatically. For the full mapping table (Page/Component/Section/Template) and `getData(...)`, see Development → Data.

## Recommendations

- keep data as close as possible to the entity it belongs to;
- use `Global.json`/`Common.json` only for data that's genuinely shared across the project: changing either file triggers a full rebuild;
- Templates never have their own data — pass it in from the calling entity (Page/Section/Component).

This keeps coupling loose and lets Incremental Build pinpoint what actually needs rebuilding.
