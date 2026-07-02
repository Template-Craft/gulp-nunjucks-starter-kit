# Runtime Monitor

During development, the Build System can automatically monitor memory and CPU usage.

The Runtime Monitor operates alongside the other Build System mechanisms and helps identify excessive resource consumption during long development sessions.

## Purpose

The primary purpose of the Runtime Monitor is to observe the Gulp process while the Build System is running.

If resource usage exceeds configured limits, the Build System notifies the developer.

## Monitored Resources

The Runtime Monitor observes:

- memory usage;
- CPU usage.

The corresponding thresholds are configured in:

```text
gulp/config/settings.mjs
```

## Notifications

When resource usage exceeds the configured limits, the Build System:

- writes a message to the console;
- displays a system notification.

This helps detect potential memory leaks or unexpectedly high CPU usage during development.

## Integration

The Runtime Monitor starts automatically together with the Development Server when running the Build System in development mode.

No additional configuration is required.

## Disabling the Monitor

If necessary, the Runtime Monitor can be disabled by starting the Build System with the appropriate command-line option.

All other Build System mechanisms continue to operate normally.
