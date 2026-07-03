# m4marvin.com — Handoff Document

> **Last updated:** 2026-07-03  
> **Progress:** VPS baseline (Steps 1–8), VPS cloudflared + Docker apps (9–11a), and beast full deployment (12–15) complete. Portfolio + Chat (11b) still pending — need portfolio repo URL.
>
> See separate summaries for full current state:
> - [`beast-deployment-summary.md`](beast-deployment-summary.md) — Immich, Charts, Forgejo Runner, Cloudflared
> - [`vps-deployment-summary.md`](vps-deployment-summary.md) — Forgejo, Vaultwarden, Kuma, Cloudflared, security

---

## 1. What's Done (VPS: `main` @ 77.42.65.13)

| Step | Description | Status |
|---|---|---|
| 1 | `sudo apt update && sudo apt upgrade -y` | ✅ Done |
| 2 | UFW: deny incoming (except 3232/tcp + tailscale0), allow outgoing, enable | ✅ Done |
| 3 | SSH: PasswordAuthentication no, PermitRootLogin no, restart sshd | ✅ Done |
| 4 | `sudo fail2ban-client status sshd` — verify jail active | ✅ Done |
| 5 | `sudo apt install -y docker.io docker-compose-v2`, enable docker, `usermod -aG docker marv` | ✅ Done |
| 6 | `cloudflared` deb installed | ✅ Done |
| 7 | `cloudflared tunnel login` | ✅ Done |
| 8 | `cloudflared tunnel create vps` → `ffd206b8-f950-4b32-bdaa-81e414ee7546` | ✅ Done |
| 9 | Write `~/.cloudflared/config.yaml` (5 hosts → 8001–8005), ingress validate | ✅ Done |
| 10 | Route DNS (5 CNAMEs) + `sudo cloudflared service install` + systemctl enable | ✅ Done |
| 11a | Docker compose: Forgejo (`:8003`), Vaultwarden (`:8004`), Uptime Kuma (`:8005`) | ✅ Done |
| 11b | Docker compose: Portfolio (`:8001`) + LLM Chat (`:8002`) | ❌ Pending |
| 12 | cloudflared on beast: config, `tunnel create beast` (`b71b332b`), DNS routes, systemd | ✅ Done |
| 13 | Immich v3 on beast: server + ML (OpenVINO) + postgres (vectorchord) + valkey | ✅ Done |
| 14 | Charts on beast: Dockerized marvFinancialCharts (`:8090`) | ✅ Done |
| 15 | Forgejo Runner on beast (v6.3.1, label `ubuntu-latest`) | ✅ Done |

**Current files on VPS:**

```
~/.cloudflared/
├── cert.pem                                       # Origin cert
├── config.yaml                                    # Ingress: 5 hosts + 404
└── ffd206b8-f950-4b32-bdaa-81e414ee7546.json     # Tunnel credentials

/etc/cloudflared/
└── config.yaml                                    # System copy for service

~/apps/
└── docker-compose.yml                 # Forgejo + Vaultwarden + Kuma

~/data/
├── forgejo/
├── vaultwarden/
└── kuma/
```

---

## 2. Architecture — Final Service Layout

```
                          Cloudflare Edge (orange proxy, TLS)
                               │
         ┌────────────────────┼────────────────────┐
         │ tunnels            │                    │ tunnels
         ▼                    │                    ▼
   cloudflared                │              cloudflared
   (on VPS, SSH :3232)        │              (on beast: home NAT, no ports)
         │                    │                    │
   ┌─────┼─────┬─────┬─────┐  │       ┌───────────┼───────────┬───────────┐
   ▼     ▼     ▼     ▼     ▼  │       ▼           ▼           ▼           ▼
  :8001 :8002 :8003 :8004 :8005     :2283       :8090       :8096      (runner)
   pf    chat  forge vault kuma    immich      trading    jellyfin     forgejo
  (SSR) (LLM) (git)              (photos)    (charts)   (tailnet)    runner
                                     ▲                       ▲           │
                                     │                       │           │
                              cloudflared tunnel      cloudflared     polls
                              on beast → :2283        on beast →     git.m4marvin.com
                                                      :8090          for CI jobs
                                                                     (builds on beast)
```

### VPS services (ports 8001–8005 on 127.0.0.1)

| Port | Subdomain | Service | Container |
|---|---|---|---|
| 8001 | `m4marvin.com` | Portfolio (TanStack Start SSR, from v2app repo) | custom Docker |
| 8002 | `chat.m4marvin.com` | LLM Chat (TanStack, proxies external LLM API, from v2app repo) | custom Docker |
| 8003 | `git.m4marvin.com` | Forgejo (Git hosting) | `codeberg.org/forgejo/forgejo:10` |
| 8004 | `vault.m4marvin.com` | Vaultwarden (password manager) | `vaultwarden/server:latest` |
| 8005 | `status.m4marvin.com` | Uptime Kuma (monitoring) | `louislam/uptime-kuma:latest` |

### Beast services (localhost ports, via beast's own cloudflared tunnel)

| Port | Subdomain | Service | Status |
|---|---|---|---|
| 2283 | `photos.m4marvin.com` | Immich (photo backup + ML) | ❌ To deploy |
| 8090 | `charts.m4marvin.com` | Trading app (heavy backend, from v2app repo) | ❌ To deploy |
| 8096 | *(tailnet-only, no domain)* | Jellyfin (+ sonarr/radarr/prowlarr) | ✅ Already running (host network) |
| — | *(polls git.m4marvin.com over tunnel)* | **Forgejo Runner** (CI/CD on beast's 16 cores/93GB RAM) | ❌ To deploy (after Forgejo is live) |

### VPS port scheme — Sequential 8001–8099

```
8001 = Portfolio (m4marvin.com)
8002 = LLM Chat  (chat.m4marvin.com)
8003 = Forgejo   (git.m4marvin.com)
8004 = Vaultwarden (vault.m4marvin.com)
8005 = Uptime Kuma (status.m4marvin.com)
8006–8099 = reserved for future VPS apps
```

---

## 3. Step 9 — Write cloudflared Config on VPS

The config file goes at `~/.cloudflared/config.yml`. The port numbers below match the 8001–8005 scheme above.

```yaml
# ~/.cloudflared/config.yml
tunnel: ffd206b8-f950-4b32-bdaa-81e414ee7546
credentials-file: /home/marv/.cloudflared/ffd206b8-f950-4b32-bdaa-81e414ee7546.json

ingress:
  - hostname: m4marvin.com
    service: http://localhost:8001
  - hostname: chat.m4marvin.com
    service: http://localhost:8002
  - hostname: git.m4marvin.com
    service: http://localhost:8003
  - hostname: vault.m4marvin.com
    service: http://localhost:8004
  - hostname: status.m4marvin.com
    service: http://localhost:8005
  - service: http_status:404
```

Create it:

```bash
cat > ~/.cloudflared/config.yml <<'EOF'
tunnel: ffd206b8-f950-4b32-bdaa-81e414ee7546
credentials-file: /home/marv/.cloudflared/ffd206b8-f950-4b32-bdaa-81e414ee7546.json

ingress:
  - hostname: m4marvin.com
    service: http://localhost:8001
  - hostname: chat.m4marvin.com
    service: http://localhost:8002
  - hostname: git.m4marvin.com
    service: http://localhost:8003
  - hostname: vault.m4marvin.com
    service: http://localhost:8004
  - hostname: status.m4marvin.com
    service: http://localhost:8005
  - service: http_status:404
EOF

# Validate
cloudflared tunnel ingress validate
```

---

## 4. Step 10 — Route DNS + Install Service on VPS

```bash
# Route each hostname through the tunnel (creates CNAMEs in Cloudflare DNS)
cloudflared tunnel route dns vps m4marvin.com
cloudflared tunnel route dns vps chat.m4marvin.com
cloudflared tunnel route dns vps git.m4marvin.com
cloudflared tunnel route dns vps vault.m4marvin.com
cloudflared tunnel route dns vps status.m4marvin.com

# Install as systemd service (auto-start on boot)
sudo cloudflared service install
sudo systemctl enable --now cloudflared

# Check it's healthy
sudo journalctl -u cloudflared -f
# Should see: "Registered tunnel connection" and no errors
```

After this, the tunnel is live but returning 502s (nothing listening on 8001–8005 yet). That's expected.

---

## 5. Step 11 — Deploy VPS Docker Apps

### 5.1 Create directory structure

```bash
mkdir -p ~/apps
mkdir -p ~/data/{forgejo,vaultwarden,kuma}
```

### 5.2 Deploy Forgejo, Vaultwarden, Kuma first (ready-to-go containers)

These are standard Docker images — just up and they work. The portfolio and LLM chat need the v2app repo first (see Undecided).

Create `~/apps/docker-compose.yml`:

```yaml
services:
  # ── Forgejo (Git hosting) ──
  forgejo:
    image: codeberg.org/forgejo/forgejo:10
    container_name: forgejo
    restart: unless-stopped
    ports:
      - "127.0.0.1:8003:3000"
    environment:
      - FORGEJO__server__DOMAIN=git.m4marvin.com
      - FORGEJO__server__ROOT_URL=https://git.m4marvin.com
      - FORGEJO__server__SSH_DOMAIN=git.m4marvin.com
      - FORGEJO__actions__ENABLED=true
    volumes:
      - ~/data/forgejo:/data
      - /etc/timezone:/etc/timezone:ro
      - /etc/localtime:/etc/localtime:ro

  # ── Vaultwarden (Password manager) ──
  vaultwarden:
    image: vaultwarden/server:latest
    container_name: vaultwarden
    restart: unless-stopped
    ports:
      - "127.0.0.1:8004:80"
    environment:
      - DOMAIN=https://vault.m4marvin.com
      - SIGNUPS_ALLOWED=false
    volumes:
      - ~/data/vaultwarden:/data

  # ── Uptime Kuma (Monitoring) ──
  kuma:
    image: louislam/uptime-kuma:latest
    container_name: kuma
    restart: unless-stopped
    ports:
      - "127.0.0.1:8005:3001"
    volumes:
      - ~/data/kuma:/app/data
```

```bash
cd ~/apps
docker compose up -d

# Verify each
curl -s -o /dev/null -w "%{http_code}" http://localhost:8003   # forgejo → 200
curl -s -o /dev/null -w "%{http_code}" http://localhost:8004   # vaultwarden → 200
curl -s -o /dev/null -w "%{http_code}" http://localhost:8005   # kuma → 200
```

At this point `git.`, `vault.`, and `status.` subdomains should work through the tunnel.

### 5.3 Deploy Portfolio + LLM Chat (from v2app repo)

These need the v2app source. The exact commands depend on the **Undecided** items below. General approach:

```bash
# Clone the repo
cd ~/apps
git clone <v2app-github-url> v2app

# Build Docker images (if Dockerfile exists) OR:
# Build the app (npm install, npm run build) and run via node
cd ~/apps/v2app

# ...specific build commands depend on repo structure...
```

They'll be added to `~/apps/docker-compose.yml` as:

```yaml
  portfolio:
    build: ./v2app/packages/portfolio   # or wherever it is in the monorepo
    container_name: portfolio
    restart: unless-stopped
    ports:
      - "127.0.0.1:8001:3000"   # default TanStack SSR port
    environment:
      - NODE_ENV=production

  llm-chat:
    build: ./v2app/packages/chat       # or wherever it is in the monorepo
    container_name: llm-chat
    restart: unless-stopped
    ports:
      - "127.0.0.1:8002:3000"
    environment:
      - NODE_ENV=production
      - OPENAI_API_KEY=${OPENAI_API_KEY}   # or Anthropic / whatever LLM API
```

---

## 6. Beast Setup (steps 12–15 — NOT STARTED)

### 6.1 Step 12 — cloudflared on beast

```bash
sudo pacman -S cloudflared
cloudflared tunnel login
cloudflared tunnel create beast
# → tunnel ID: <beast-tunnel-id>

# Write ~/.cloudflared/config.yml:
cat > ~/.cloudflared/config.yml <<'EOF'
tunnel: <beast-tunnel-id>
credentials-file: /home/marvin/.cloudflared/<beast-tunnel-id>.json

ingress:
  - hostname: photos.m4marvin.com
    service: http://localhost:2283
  - hostname: charts.m4marvin.com
    service: http://localhost:8090
  - service: http_status:404
EOF

cloudflared tunnel ingress validate

cloudflared tunnel route dns beast photos.m4marvin.com
cloudflared tunnel route dns beast charts.m4marvin.com

sudo cloudflared service install
sudo systemctl enable --now cloudflared
sudo journalctl -u cloudflared -f
```

### 6.2 Step 13 — Deploy Immich on beast

Create `~/immich/docker-compose.yml` (standard Immich stack with 4 containers):
- `immich-server` → `127.0.0.1:2283`
- `immich-machine-learning` → Intel OpenVINO via `/dev/dri` (Arc GPU)
- `immich-postgres` → pgvector
- `immich-redis` → redis

```bash
mkdir -p ~/immich/{library,postgres,redis,model-cache}
cd ~/immich
# create .env with DB_PASSWORD, etc.
docker compose up -d
```

### 6.3 Step 14 — Deploy Trading App on beast

From the v2app repo on beast:
```bash
# Clone v2app (or pull if already cloned)
cd ~/trading   # working dir for the trading app
# Build and run, bind to 127.0.0.1:8090
docker compose up -d
```

### 6.4 Jellyfin — No Changes

Already running. Tailnet-only. Access: `http://beast:8096` or `http://100.105.177.97:8096` from any tailnet device.

### 6.5 Step 15 — Deploy Forgejo Runner on beast

The Forgejo server runs on the VPS (light, git hosting + web UI + Actions queue). CI/CD jobs
execute on beast (heavy) via a **Forgejo Runner** container. The runner polls the Forgejo API
for queued jobs, then clones repos and runs build/test/deploy steps on beast's hardware.

```
┌─ VPS (light) ───────────┐         ┌─ beast (heavy) ─────────────────────┐
│  Forgejo server          │         │  Forgejo Runner                      │
│  Actions: ENABLED        │◄────────│  polls https://git.m4marvin.com     │
│  queues CI jobs          │ tunnel  │  (via cloudflared tunnel)            │
│  127.0.0.1:8003          │         │                                      │
└──────────────────────────┘         │  Clones repos → ~/runner/repos/      │
                                     │  Runs build scripts                  │
                                     │  Runs tests (16 cores, 93GB RAM)     │
                                     │  Docker-in-Docker for container jobs │
                                     │  Reports status back to Forgejo      │
                                     └──────────────────────────────────────┘
```

**Setup (after Forgejo is live at git.m4marvin.com):**

```bash
# 1. Get runner token from Forgejo admin UI:
#    https://git.m4marvin.com → Site Administration → Actions → Runners → Create new Runner
#    Copy the registration token.

# 2. Create runner directory
mkdir -p ~/runner/data
```

**`~/runner/docker-compose.yml` on beast:**

```yaml
services:
  runner:
    image: code.forgejo.org/forgejo/runner:latest
    container_name: forgejo-runner
    restart: unless-stopped
    environment:
      - DOCKER_HOST=tcp://docker:2376
      - DOCKER_TLS_VERIFY=1
      - DOCKER_CERT_PATH=/certs/client
    volumes:
      - ~/runner/data:/data
      - /var/run/docker.sock:/var/run/docker.sock   # for Docker-in-Docker

  # (Optional) daemon container if using dind:
  # This is only needed if you want isolated docker-in-docker for jobs.
  # For most personal use, mounting the host docker socket is simpler.
```

**Registration (one-time, after first startup):**

```bash
cd ~/runner
docker compose up -d

# Register the runner (using the token from Forgejo admin UI)
docker exec -it forgejo-runner \
  forgejo-runner register \
  --instance https://git.m4marvin.com \
  --token <RUNNER_TOKEN> \
  --name beast \
  --labels ubuntu-latest:docker://node:22-bookworm,ubuntu-22.04:docker://catthehacker/ubuntu:act-22.04
```

**Alternative: run the runner binary directly (no container):**

```bash
# Download the runner binary
curl -L https://code.forgejo.org/forgejo/runner/releases/latest/download/forgejo-runner-linux-amd64 -o ~/runner/forgejo-runner
chmod +x ~/runner/forgejo-runner

# Register
./forgejo-runner register \
  --instance https://git.m4marvin.com \
  --token <RUNNER_TOKEN> \
  --name beast

# Run (use systemd or tmux/screen or just `./forgejo-runner daemon`)
```

The runner will appear in Forgejo admin panel as "beast" and be ready to execute workflows.

**Example workflow (`.forgejo/workflows/build.yml` in any repo):**

```yaml
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest      # matches the label from registration
    steps:
      - uses: actions/checkout@v4
      - run: go build ./...
      - run: go test -race ./...  # all 16 cores on beast
```

**Key points:**
- The runner polls Forgejo over the Cloudflare tunnel (`https://git.m4marvin.com`). No special networking needed — it's just HTTPS from beast to Cloudflare to the tunnel to Forgejo.
- Build/tests run entirely on beast. Only git clone (initial fetch) and status reports traverse the network, and those are tiny payloads for personal repos.
- If you want faster git clones for large repos, you can expose Forgejo on the tailnet interface too (add `- "100.80.96.4:8003:3000"` to the Forgejo ports in the VPS compose, then register the runner with `--instance http://100.80.96.4:8003`). This bypasses Cloudflare entirely for clone traffic. Optional optimization, not required for personal use.

---

## 7. DNS Record Summary (Cloudflare)

Records created automatically by `cloudflared tunnel route dns`:

| Type | Name | Content | Created by |
|---|---|---|---|
| CNAME | `m4marvin.com` | `ffd206b8-f950-4b32-bdaa-81e414ee7546.cfargotunnel.com` | step 10 (VPS) |
| CNAME | `chat` | same VPS tunnel CNAME | step 10 (VPS) |
| CNAME | `git` | same VPS tunnel CNAME | step 10 (VPS) |
| CNAME | `vault` | same VPS tunnel CNAME | step 10 (VPS) |
| CNAME | `status` | same VPS tunnel CNAME | step 10 (VPS) |
| CNAME | `photos` | `<beast-tunnel>.cfargotunnel.com` | step 12 (beast) |
| CNAME | `charts` | `<beast-tunnel>.cfargotunnel.com` | step 12 (beast) |

Manual records (email — to be created later):

| Type | Name | Content | Purpose |
|---|---|---|---|
| MX | `m4marvin.com` | (CF Email Routing values) | Email receive |
| TXT | `m4marvin.com` | SPF record | Email auth |
| TXT | `<relay>._domainkey` | DKIM key | Email signing |
| TXT | `_dmarc` | DMARC policy | Email policy |

---

## 8. Undecided / Open Items

### ✅ Recently Decided

| # | Decision |
|---|---|
| — | **Forgejo Runner on beast** — CI/CD runner runs on beast (16 cores, 93GB RAM) polling `git.m4marvin.com`. ✅ Deployed (v6.3.1, label `ubuntu-latest`). |
| — | **v2app = three separate repos** — Portfolio, Chat, Trading each in their own GitHub repo. |
| — | **Dockerization** — Dockerfiles need to be created when repos are available. |
| — | **LLM Chat API** — opencode-go endpoint. |
| — | **Trading app DB** — No database needed; uses Parquet data lake on disk. ✅ Confirmed. |
| — | **Forgejo DB** — SQLite (simpler for single user). ✅ Confirmed. |
| — | **Charts port** — Runs on `:8001` internally, cloudflared maps from `:8090` → `localhost:8001`. |

### 🔴 Blocking — Need Answers

| # | Question | Why it matters |
|---|---|---|
| 1 | **Portfolio repo URL** | Can't deploy `m4marvin.com` without the repo |
| 2 | **Chat app (v2app) Dockerization** | Needs Dockerfile + Postgres container on VPS; `~/codes/v2app` is the local source |

### 🟡 Important but not blocking

| # | Question | Status |
|---|---|---|
| 5 | **SSH on VPS: public :3232 or tailnet-only?** | Current (public) |
| 6 | **Jellyfin: tailnet-only?** | ✅ Confirmed, unchanged |
| 9 | **Uptime Kuma: where to run?** | On VPS; can't reach tailnet-only beast services |
| 10 | **SMTP relay provider** | Resend (3k/mo) or Brevo (300/day) — needed for Forgejo + @m4marvin.com |
| 11 | **Cloudflare Access (OTP/SSO)?** | Optional layer for vault/forgejo |
| 12 | **Beast uptime** | Desktop may sleep; services unavailable during sleep |
| 13 | **Backup strategy** | rsync VPS volumes → beast weekly; Immich built-in or rsync

---

## 9. Quick Reference — Commands After Step 10

### If you've already done step 10 (cloudflared running):

```bash
# Check tunnel health
sudo journalctl -u cloudflared -f

# Docker compose (after creating ~/apps/docker-compose.yml)
cd ~/apps
docker compose up -d
docker compose ps
docker compose logs -f forgejo   # check a specific service

# Test through the tunnel
curl -H "Host: git.m4marvin.com" http://localhost:8003   # from VPS
curl https://git.m4marvin.com                             # from anywhere (or wait for DNS propagation)

# If tunnel isn't routing:
sudo systemctl restart cloudflared
cloudflared tunnel info vps
```

### Add a new service later:

```bash
# 1. Add to ~/apps/docker-compose.yml (new container, new port e.g. 8006)
# 2. Add to ~/.cloudflared/config.yml:
#      - hostname: new.m4marvin.com
#        service: http://localhost:8006
# 3. Route the new hostname:
cloudflared tunnel route dns vps new.m4marvin.com
# 4. Restart tunnel:
sudo systemctl restart cloudflared
# 5. Start the container:
cd ~/apps && docker compose up -d
```

---

## 10. System Inventory (for reference)

### VPS — `main` (Hetzner)
- Ubuntu 24.04, 4 vCPU Xeon Skylake 2.1GHz, 8GB RAM, 76GB disk (73GB free)
- Public IP: `77.42.65.13` | Tailscale: `100.80.96.4` (hetzner-vps)
- SSH: port `3232`, user `marv`, key `~/.ssh/hetzner_key` (password auth disabled)
- Firewall: UFW — deny all except `3232/tcp` + `tailscale0` interface
- Running: fail2ban, sshd, tailscaled, docker, cloudflared (after step 10)

### Beast — Arch Desktop
- Intel Core Ultra 9 285H (16 cores), 93GB RAM, Intel Arc Pro 130T GPU (QSV)
- 1.9TB btrfs on LUKS, 1.2TB free
- Home LAN: `192.168.1.113` | Public: `86.99.231.73` (NAT) | Tailscale: `100.105.177.97`
- Docker v29.5.1, compose v5.1.4
- Running: Jellyfin, Sonarr, Radarr, Prowlarr (host network, `~/jellyfin/docker-compose.yml`)
- Planned: Immich (`~/immich/`), Forgejo Runner (`~/runner/`), Trading app code, cloudflared
- Docker socket available: `/var/run/docker.sock` (for runner Docker-in-Docker jobs)
- Media: `~/media/` — 31GB Movies, 233GB TV Shows (264GB total)
- Packages: `tailscale 1.98.2`, `jellyfin-server 10.11.9`, `cloudflared` (not yet)

### Domain — m4marvin.com
- Registrar: Cloudflare (registered 2026-06-30)
- Nameservers: `kay.ns.cloudflare.com`, `vicente.ns.cloudflare.com`
- DNS: (empty — will be populated by cloudflared routes)
- Cloudflare features available: proxy (orange), Email Routing, Tunnels, Access (Zero Trust)
