# m4marvin.com — Portfolio

Personal portfolio site. Live at **[m4marvin.com](https://m4marvin.com)**.

## Stack

- **Framework:** TanStack Start (SSR React)
- **UI:** React 19, Tailwind CSS 4, shadcn/ui, motion
- **3D:** Three.js + react-three-fiber
- **Build:** Vite, pnpm
- **Deploy:** Docker → nginx (Hetzner VPS, port 8001, exposed via Cloudflare tunnel)

## Development

```bash
pnpm install
pnpm dev          # localhost:3000
```

## Build

```bash
pnpm build        # → dist/
pnpm preview      # preview production build
```

## Docker

```bash
docker build -t main-site .
docker run -d -p 8080:80 main-site
```

Multi-stage build: `node:22-slim` for the build, `nginx:alpine` for serving static `dist/`.

## Scripts

| Command                | Description                           |
| ---------------------- | ------------------------------------- |
| `pnpm dev`             | Vite dev server on :3000              |
| `pnpm build`           | Production build to `dist/`           |
| `pnpm preview`         | Serve production build                |
| `pnpm test`            | Run Vitest                            |
| `pnpm typecheck`       | TypeScript type check                 |
| `pnpm lint`            | oxlint                                |
| `pnpm generate-routes` | Regenerate TanStack Router route tree |

## Project Layout

```
.
├── src/                  # Application code
│   ├── routes/           # File-based routes
│   └── ...
├── public/               # Static assets
├── dist/                 # Build output (gitignored)
├── Dockerfile
├── nginx.conf
├── vite.config.ts
└── package.json
```

## Media

Images live in `public/`. Video does not: the Sirius demo on `/work/sirius` and the home page
Work card streams from `files.m4marvin.com/sirius_demo/sirius-demo.mp4`, next to the charting
app's thumbnails, so the repository does not carry a 2.5 MB binary. That host serves it with
`accept-ranges: bytes`, so seeking works. Source and render pipeline for it:
`~/codes/sirius-demo` (fframes).

## Related

This portfolio is part of the broader self-hosted `m4marvin.com` ecosystem.
Infrastructure docs (architecture, deployment, services) live in a separate repo:

- `git.m4marvin.com` — self-hosted Forgejo (git)
- `vault.m4marvin.com` — self-hosted Vaultwarden (passwords)
- `status.m4marvin.com` — self-hosted Uptime Kuma (monitoring)
- `chat.m4marvin.com` — self-hosted LLM chat
- `photos.m4marvin.com` — self-hosted Immich (photos, on beast)
- `charts.m4marvin.com` — self-hosted trading charts (on beast)
