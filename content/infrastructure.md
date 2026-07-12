# Self-Hosted Infrastructure

My personal cloud. Two machines, two Cloudflare tunnels, no third parties holding my data.

## VPS (Hetzner)

4 vCPU, 8GB RAM, 76GB disk. Ubuntu. Runs the lightweight services, all bound to 127.0.0.1.

**Forgejo** — self-hosted Git. All my repos, private. Behind git.m4marvin.com.

**Vaultwarden** — self-hosted password manager. No Bitwarden cloud subscription. Behind vault.m4marvin.com.

**Uptime Kuma** — monitoring dashboard. Pings all services every 30s. Behind status.m4marvin.com.

**Copyparty** — lightweight file server. Static binary, no database. Serves my resume PDF, project screenshots, and site images. Behind files.m4marvin.com.

No public ports except SSH on a non-standard port. Fail2ban, key-only auth.

## Beast (Arch Desktop)

Intel Core Ultra 9, 93GB RAM, Arc Pro 130T GPU. The heavy lifter.

**Immich** — self-hosted Google Photos. 40k+ photos with ML-powered search and facial recognition via OpenVINO on the Arc GPU. Behind photos.m4marvin.com.

**mFinancialCharts** — crypto charting platform. 3664 parquet files, 818 symbols. Single-container deployment. Behind charts.m4marvin.com.

**Forgejo runner** — CI/CD for my repos. 16 cores, Docker-in-Docker. Polls Forgejo over the tunnel.

**Jellyfin** — media server. Tailnet-only, not public.

## Cloudflare tunnels

Two tunnels run as systemd services. No open ports on either machine. Cloudflare handles TLS and DDoS. All subdomains route through the tunnels to localhost ports.

## Why

I like owning my stuff. Git repos, passwords, photos, financial data, files, media — all on hardware I control, behind tunnels that expose zero attack surface.