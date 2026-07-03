# VPS Deployment Summary

> **Date:** 2026-07-03  
> **Host:** main (Hetzner VPS) — Ubuntu 24.04, 4 vCPU Xeon Skylake, 8GB RAM, 76GB disk  
> **IP:** `77.42.65.13` | **Tailscale:** `100.80.96.4` | **SSH:** port `3232`, user `marv`, key `~/.ssh/hetzner_key`

## Security

| Layer | Config |
|---|---|
| **UFW** | Deny all incoming except `3232/tcp` + `tailscale0`, allow all outgoing |
| **SSH** | `PasswordAuthentication no`, `PermitRootLogin no` |
| **fail2ban** | Active on sshd |

## Services

| Service | Container | URL | Port | Status |
|---|---|---|---|---|
| **Forgejo** | `forgejo` | `git.m4marvin.com` | `127.0.0.1:8003` | Running (codeberg.org/forgejo/forgejo:10, SQLite, Actions enabled) |
| **Vaultwarden** | `vaultwarden` | `vault.m4marvin.com` | `127.0.0.1:8004` | Running (signups disabled, admin first-run done) |
| **Uptime Kuma** | `kuma` | `status.m4marvin.com` | `127.0.0.1:8005` | Running (first-run setup pending) |
| **Cloudflared** | systemd | all VPS subdomains | — | Running (tunnel `ffd206b8-f950-4b32-bdaa-81e414ee7546`) |

## Not Yet Deployed

| Service | Port | Subdomain | Blocked By |
|---|---|---|---|
| **Portfolio** | `:8001` | `m4marvin.com` | Repo URL needed |
| **Chat** | `:8002` | `chat.m4marvin.com` | Repo at `~/codes/v2app` (TanStack Start), needs Dockerfile + Postgres container |

## Directories

```
~/apps/
├── docker-compose.yml   # Forgejo + Vaultwarden + Kuma
│
~/data/
├── forgejo/             # Git repos + Forgejo data (SQLite)
├── vaultwarden/         # Encrypted password vault
└── kuma/                # Uptime Kuma monitoring data

~/.cloudflared/
├── cert.pem                                 # Origin cert
├── config.yaml                              # Ingress: 5 hosts → 8001-8005 + 404
└── ffd206b8-f950-4b32-bdaa-81e414ee7546.json  # Tunnel credentials

/etc/cloudflared/
└── config.yaml                              # System copy for service
```

## Forgejo Setup

- **Image:** `codeberg.org/forgejo/forgejo:10`
- **Database:** SQLite (single user)
- **Domain:** `git.m4marvin.com`
- **Actions:** Enabled — runner registration token available from Site Admin → Actions → Runners
- **Beast runner:** `forgejo-runner` on beast (v6.3.1, label `ubuntu-latest`) is connected and polling

## Vaultwarden Setup

- **Image:** `vaultwarden/server:latest`
- **Signups:** Disabled (`SIGNUPS_ALLOWED=false`)
- **Admin:** First-run completed via admin token

## Cloudflared Config

```yaml
tunnel: ffd206b8-f950-4b32-bdaa-81e414ee7546
credentials-file: /home/marv/.cloudflared/ffd206b8-f950-4b32-bdaa-81e414ee7546.json

ingress:
  - hostname: m4marvin.com           → localhost:8001
  - hostname: chat.m4marvin.com      → localhost:8002
  - hostname: git.m4marvin.com       → localhost:8003
  - hostname: vault.m4marvin.com     → localhost:8004
  - hostname: status.m4marvin.com    → localhost:8005
  - service: http_status:404
```

## DNS (Cloudflare)

| Record | Type | Routes to |
|---|---|---|
| `m4marvin.com` | CNAME | `ffd206b8.cfargotunnel.com` |
| `chat.m4marvin.com` | CNAME | `ffd206b8.cfargotunnel.com` |
| `git.m4marvin.com` | CNAME | `ffd206b8.cfargotunnel.com` |
| `vault.m4marvin.com` | CNAME | `ffd206b8.cfargotunnel.com` |
| `status.m4marvin.com` | CNAME | `ffd206b8.cfargotunnel.com` |

## Port Scheme

```
8001 = Portfolio (m4marvin.com)          ❌ Not deployed
8002 = Chat      (chat.m4marvin.com)     ❌ Not deployed
8003 = Forgejo   (git.m4marvin.com)      ✅ Running
8004 = Vaultwarden (vault.m4marvin.com)  ✅ Running
8005 = Uptime Kuma (status.m4marvin.com) ✅ Running
8006–8099 = reserved
```

## What's Left

1. **Uptime Kuma first-run** — create admin account + add HTTP monitors at `https://status.m4marvin.com`
2. **Portfolio** — needs repo URL, then Dockerfile + compose entry on `:8001`
3. **Chat** — needs Dockerfile for `~/codes/v2app` (TanStack Start SSR + Drizzle + Postgres container)
4. **Email** — Cloudflare Email Routing + SMTP relay (Resend/Brevo) for `@m4marvin.com` + Forgejo notifications
5. **Cloudflare Access** (optional) — OTP/SSO layer in front of Vaultwarden/Forgejo
