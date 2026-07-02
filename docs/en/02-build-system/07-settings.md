# Build System Configuration

The Build System uses a centralized configuration system.

All settings that affect the behavior of Build System mechanisms are defined in a single location:

```text
gulp/config/settings.mjs
```

This approach allows the behavior of the Build System to be adjusted without modifying individual tasks.

## Purpose

The `settings.mjs` file defines the runtime configuration of the Build System.

Depending on the configuration, it controls:

- project mode;
- Dependency Cache behavior;
- Runtime Monitor settings;
- debug mode.

All Build System mechanisms use the same configuration source.

## Project Mode

The

```js
isMultipage;
```

option defines the architectural mode of the project.

Two modes are supported:

- Landing Page;
- Multipage Project.

Some Build System mechanisms automatically adapt their behavior depending on the selected mode.

## Dependency Cache

The

```js
settings.cache;
```

section controls the behavior of the Dependency Cache.

Its primary settings include:

- automatic cache rebuilding during startup;
- memory usage limits;
- diagnostic logging;
- dependency table output.

A detailed explanation of the Dependency Cache is provided in its dedicated documentation.

## Runtime Monitor

The

```js
settings.monitor;
```

section configures the Runtime Monitor responsible for observing system resource usage.

It defines:

- maximum memory usage;
- maximum CPU usage;
- monitoring interval.

These settings allow the Build System to be adapted to different development environments.

## Debug Mode

The

```js
debug;
```

option enables additional diagnostic features of the Build System.

This mode is intended primarily for debugging and analyzing the internal behavior of the Build System rather than everyday development.
