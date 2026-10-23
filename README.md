# m4marvin.com — Portfolio

Personal portfolio site. Live at **[m4marvin.com](https://m4marvin.com)**.

## Stack

- **Framework:** TanStack Router (client-rendered SPA) + Vite
- **UI:** React 19, Tailwind CSS 4, shadcn/ui tokens
- **Build:** Vite, pnpm
- **Deploy:** Docker → nginx (Hetzner VPS; container port 80, published as 8001, exposed via Cloudflare tunnel)

There is no TanStack Start/SSR layer yet. `src/main.tsx` mounts the router into `#app`;
`index.html` is the static shell.

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

`pnpm build` runs `scripts/gen-sitemap.mjs`, then `vite build`, then `scripts/prerender-meta.mjs`.

## Docker

```bash
docker build -t main-site .
docker run -d -p 8080:80 main-site
```

Multi-stage build: `node:22-slim` for the build, `nginx:alpine` for serving static `dist/`.

## Health check

`GET /up` is served directly by nginx and returns `200 ok` with `Cache-Control: no-store`.
It does not touch the SPA or the filesystem.

```bash
curl -i https://m4marvin.com/up
```

Use it for Uptime Kuma, Cloudflare health checks, or the deploy gate.

## Scripts

| Command                | Description                           |
| ---------------------- | ------------------------------------- |
| `pnpm dev`             | Vite dev server on :3000              |
| `pnpm build`           | Production build to `dist/`           |
| `pnpm preview`         | Serve production build                |
| `pnpm typecheck`       | TypeScript type check                 |
| `pnpm lint`            | oxlint                                |
| `pnpm format`          | oxfmt                                 |
| `pnpm generate-routes` | Regenerate TanStack Router route tree |
| `pnpm diagrams`        | Regenerate the C4 SVGs from `diagrams/` |

There is no test suite yet; `typecheck`, `lint` and a production build are the checks.

## Project Layout

```
.
├── src/
│   ├── routes/           # File-based routes (home, work, blog, self-hosted)
│   ├── components/       # Sections and UI primitives
│   ├── content/blog/     # Markdown posts
│   └── lib/              # Portfolio data, SEO, blog loader
├── public/               # Static assets, diagrams, og.png, sitemap.xml
├── diagrams/             # Mermaid sources for the C4 diagrams
├── scripts/              # Sitemap and diagram generators
├── Dockerfile
├── nginx.conf
├── vite.config.ts
└── package.json
```

## Media

Images live in `public/`. The Sirius demo video and the charting screenshots are served from
`files.m4marvin.com` so the repository does not carry the binaries:

- `media/sirius-demo-vertical.mp4` — 1080×1920, 25.6 s, ~2 MB, H.264
- `public/sirius-poster.webp` — 9:16 poster for the case-study video
- `public/sirius-card.webp` — 16:9 still for the home Work card
- `media/charts_app/1.png` — the charting screenshot on the Work card

The video host serves `accept-ranges: bytes`, so seeking works. Source and render pipeline for
the video live in `~/codes/sirius-demo`.

## Related

This portfolio is part of the broader self-hosted `m4marvin.com` ecosystem:

- `git.m4marvin.com` — self-hosted Forgejo (git)
- `vault.m4marvin.com` — self-hosted Vaultwarden (passwords)
- `status.m4marvin.com` — self-hosted Uptime Kuma (monitoring)
- `chat.m4marvin.com` — self-hosted LLM chat
- `photos.m4marvin.com` — self-hosted Immich (on beast)
- `charts.m4marvin.com` — self-hosted trading charts (on beast)
