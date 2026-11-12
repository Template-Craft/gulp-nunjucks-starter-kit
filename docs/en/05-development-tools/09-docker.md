# Docker (optional)

A way to run the Build System fully isolated from the host's Node/npm. **Not used by default** — the regular path remains `npm install && npm run dev`. Docker is useful for people who want to run the tool without installing Node/npm on their own machine (isolation/security), not for speed — on Linux, running natively is already about as fast as it gets (this project is **Linux-first**, see the README).

## Running it

```bash
docker compose build
docker compose up
```

Open `http://localhost:8080` — from there, work with `src/` on the host as usual: edits show up inside the container instantly (bind mount), and BrowserSync reloads the page on its own.

A production build works the same way, without a separate service:

```bash
docker compose run --rm dev npm run build
```

## How it's built

- **Image** — `node:22-slim` (not Alpine): native dependencies (`@parcel/watcher` and others) ship as prebuilt binaries for glibc.
- **`node_modules`** — a separate volume, not bind-mounted from the host: native binaries built on the host (especially on macOS/Windows) won't run inside a Linux container.
- **Non-root user** — the container runs as `node` (1000:1000), not root. If the host's UID/GID differs (`id -u`/`id -g`), create a `.env` file next to the compose file:
  ```env
  UID=1001
  GID=1001
  ```
  and rebuild the image — otherwise writing to the bind-mounted `build/` will hit a permission-denied error.

## OS-specific caveats

On **macOS/Windows** (Docker Desktop), live file-reload can lag because of filesystem virtualization. If edits under `src/` don't trigger a rebuild, uncomment this in `docker-compose.yml`:

```yaml
environment:
  CHOKIDAR_USEPOLLING: '1'
```

On **Linux** this isn't needed — the bind mount works natively, no virtualization involved.

## Memory limit inside the container

`settings.monitor.maxMemoryMB` (Runtime Monitor) defaults to a percentage of the **host's** memory (`os.totalmem()`), not the container's limit. If you actually cap the container (`mem_limit`/`deploy.resources`), set the same limit explicitly:

```yaml
environment:
  DOCKER_MEM_LIMIT_MB: '2048'
mem_limit: 2048m
```

otherwise the threshold will never trip, even if the container is genuinely starved for memory.

## What's missing

System notifications (`node-notifier`) don't show up from inside the container — there's neither a `notify-send` binary nor access to the host's D-Bus session. The same information is already visible in the terminal (colored output is preserved via `tty: true`) — forwarding the host's D-Bus into the container just to get a popup isn't worth it, since it deliberately weakens the very isolation the Docker option exists for.
