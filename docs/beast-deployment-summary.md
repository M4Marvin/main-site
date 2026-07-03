# Beast Deployment Summary

> **Date:** 2026-07-03  
> **Host:** beast (Arch Desktop) — Intel Core Ultra 9 285H, 93GB RAM, Intel Arc Pro 130T

## Services

| Service | Container | URL | Port | Status |
|---|---|---|---|---|
| **Immich v3** | `immich_server` | `photos.m4marvin.com` | `127.0.0.1:2283` | Running (Valkey + Postgres with vectorchord + ML OpenVINO on Arc GPU) |
| **Charts** | `charts` | `charts.m4marvin.com` | `127.0.0.1:8090` | Running (FastAPI + React UI via StaticFiles, 3664 parquet files indexed, 818 symbols, Binance spot+futures) |
| **Forgejo Runner** | `forgejo-runner` | polls `git.m4marvin.com` | — | Running (v6.3.1, label `ubuntu-latest`, mounts host docker socket) |
| **Cloudflared** | systemd | tunnels `photos.` + `charts.` | — | Running (`b71b332b-7315-4af6-ac54-4dcc5035dc1e`) |
| **Jellyfin** | pre-existing | tailnet-only | `:8096` | Already running (unchanged) |

## Directories

```
~/apps/
├── docker-compose.yml   # Unified compose: Immich + Charts + Runner
├── .env                 # Immich env vars
│
~/data/
├── immich/
│   ├── library/          # Uploads
│   ├── postgres/         # Postgres data
│   ├── model-cache/      # ML model cache
│   └── redis/            # (unused, Valkey is ephemeral)
└── runner/               # Forgejo runner config + data

~/hosted-apps/marvFinancialCharts/   # Charts source (custom Dockerfile)
│   ├── backend/          # Python FastAPI on :8001
│   ├── marvCharts/       # React/Vite frontend
│   └── data/             # 1.5GB Binance parquet lake
```

## Immich Setup

- **Image:** `ghcr.io/immich-app/immich-server:v3` + `immich-machine-learning:v3-openvino`
- **Postgres:** `ghcr.io/immich-app/postgres:14-vectorchord0.4.3-pgvectors0.2.0`
- **Redis/Valkey:** `docker.io/valkey/valkey:9`
- **ML:** Intel Arc Pro 130T via `/dev/dri` (OpenVINO)
- **Auth:** First-run setup pending at `https://photos.m4marvin.com`

## Charts Setup

- **Container:** Single multi-stage build (node:22-slim → python:3.14-slim)
- **Frontend:** React 18 + Vite, built with `VITE_API_BASE_URL=""`, served via FastAPI `StaticFiles` mount at `/`
- **Backend:** FastAPI, uvicorn on `:8001`, Polars + PyArrow for Parquet data lake
- **Data:** 1.5GB Binance futures + spot data at `~/hosted-apps/marvFinancialCharts/data/`, mounted to `/app/data`
- **Repo:** `https://github.com/M4Marvin/marvFinancialCharts` (Dockerized + pnpm migration pushed)

## Forgejo Runner

- **Image:** `code.forgejo.org/forgejo/runner:6.3.1`
- **Registration:** Registered to `https://git.m4marvin.com` as `beast` with label `ubuntu-latest`
- **Capabilities:** 16 cores, 93GB RAM, Docker-in-Docker via host socket mount
- **Workflow:** Polls Forgejo Actions queue over Cloudflare tunnel, runs CI/CD on beast hardware

## DNS (Cloudflare)

| Record | Type | Routes to |
|---|---|---|
| `photos.m4marvin.com` | CNAME | `b71b332b.cfargotunnel.com` |
| `charts.m4marvin.com` | CNAME | `b71b332b.cfargotunnel.com` |

## Notable Decisions

- Cloudflared runs as systemd service, not in Docker (avoid networking complexity)
- All services bind to `127.0.0.1` only, exposed exclusively through the Cloudflare tunnel
- Jellyfin intentionally kept tailnet-only — no public domain
- Immich ML uses Intel OpenVINO (not CUDA) for Arc GPU acceleration
- Charts uses single-container approach (backend serves both API + static frontend)
- Forgejo Runner uses host Docker socket instead of DinD for simplicity
