# Runtime Monitor

During development, tracks the Gulp process's RAM and CPU usage and warns when a threshold is exceeded — running alongside everything else, with no extra setup required.

## What's monitored

Memory (RSS/CPU, via `pidusage`) is checked every `intervalMs` (10 seconds by default). Thresholds are `settings.monitor.maxMemoryMB` and `maxCpuPercent` (see the Settings section).

## When a threshold is exceeded

The Build System:

- prints a message to the console;
- shows a system notification (`node-notifier`).

## Disabling it

```bash
gulp --no-monitor
```

or via `npm run dev -- --no-monitor`. Everything else keeps working as usual.
