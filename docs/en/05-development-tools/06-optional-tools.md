# Optional Tools

The Starter Kit is fully functional without these — they're maintenance utilities, not build dependencies.

## nsk-tools

An independent CLI for routine development tasks — creating files/directories following the project's conventions, and similar chores. Details: [nsk-tools](https://github.com/Ko2doo/nsk-tools).

## npm-check-updates

```bash
npm run ncu                       # what's outdated
npm run ncu:interactive           # update selectively
npm run ncu:interactive:formatgroup
```

## sass-migrator

```bash
npm run sass:migrator
npm run sass:migrator:imports
```

Migrates Sass syntax when the language changes — rarely needed day to day, mostly useful when porting an older project.
