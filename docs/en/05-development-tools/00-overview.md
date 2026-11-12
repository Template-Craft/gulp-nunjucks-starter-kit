# Development Tools

A ready-made development environment, integrated into the Build System and requiring no setup after `npm install`.

## What's included

- HTML processing through Nunjucks;
- SCSS/CSS processing;
- JavaScript bundling;
- code quality tooling (ESLint + Prettier);
- automatic browser sync (BrowserSync);
- incremental rebuilding and dependency analysis;
- system notifications about build progress;
- [optional Docker](./09-docker.md) — isolated development with no Node/npm on the host;
- additional tools (see Optional Tools).

## Build System vs. Development Tools

The Build System decides *what* gets built and *when*. Development Tools are what runs inside those tasks and helps with day-to-day work (linting, formatting, the editor, notifications).
