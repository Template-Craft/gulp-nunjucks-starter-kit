# Code Quality

## ESLint

Static analysis for JS/MJS (`eslint.config.mjs`, flat config): syntax errors, likely bugs, unused code, violated conventions.

```bash
npm run eslint:status
npm run eslint:fixesAll
```

## Prettier

Automatic source formatting — the same style for every developer regardless of editor. `eslint-config-prettier` turns off the ESLint style rules that would otherwise conflict with Prettier — the two tools don't argue with each other.

## Recommendation

Set your editor to format on save (see Editor Setup) — then formatting isn't something you have to think about at all.
