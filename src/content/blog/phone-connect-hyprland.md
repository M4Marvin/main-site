---
title: "Phone Connect: Full Android Integration with Hyprland"
date: "2026-07-28"
description: "Screen mirroring, remote input, clipboard sync, and file sharing — all over Tailscale mesh VPN. No USB, no same-WiFi required."
tags: ["hyprland", "kdeconnect", "scrcpy", "tailscale", "wayland", "linux"]
---

Phone fully integrated with my Hyprland desktop. No USB. No same-WiFi. Works from anywhere.

- `SUPER + P` → phone screen appears (scrcpy, H.265/60fps)
- Mouse + keyboard from phone via KDE Connect
- Clipboard sync, notifications, file sharing
- All over Tailscale mesh VPN

## The Stack

| Layer | Tool |
|-------|------|
| OS | Omarchy (Arch Linux) |
| Compositor | Hyprland |
| Device integration | KDE Connect 26.04+ |
| Screen mirroring | scrcpy 4.1 |
| Network | Tailscale mesh VPN |
| Portal bridge | hypr-kdeconnect-fix |

## Trickest Piece: Remote Input

The hardest feature to get working was remote mouse and keyboard from the phone. KDE Connect 26.04+ uses the **RemoteDesktop portal** on Wayland for input injection, but the `hypr-kdeconnect-portal` backend kept rejecting sessions because the KDE Connect daemon (`kdeconnectd`) was running as a D-Bus activated service with no `app_id`.

The portal backend requires a valid `app_id` for security. When `kdeconnectd` is auto-started by D-Bus, `xdg-desktop-portal` can't determine its identity, passing an empty `app_id` which gets rejected.

### The 3-Layer Fix

**Layer 1 — Portal routing** (`~/.config/xdg-desktop-portal/portals.conf`):

```ini
[preferred]
default=gtk
org.freedesktop.impl.portal.ScreenCast=hyprland
org.freedesktop.impl.portal.Screenshot=hyprland
org.freedesktop.impl.portal.GlobalShortcuts=hyprland
org.freedesktop.impl.portal.RemoteDesktop=hypr-kdeconnect
```

**Layer 2 — Proper app identity** (`~/.config/systemd/user/app-org.kde.kdeconnect.daemon.service`):

```ini
[Unit]
Description=KDE Connect Daemon

[Service]
Type=dbus
BusName=org.kde.kdeconnect
ExecStart=/usr/bin/kdeconnectd
Slice=app.slice
Restart=on-failure

[Install]
WantedBy=graphical-session.target
```

By running the daemon in `app.slice` with a name matching its desktop file ID, `xdg-desktop-portal` can determine the `app_id` and route sessions correctly.

**Layer 3 — D-Bus service override** (`~/.local/share/dbus-1/services/org.kde.kdeconnect.service`):

```ini
[D-BUS Service]
Name=org.kde.kdeconnect
SystemdService=app-org.kde.kdeconnect.daemon.service
```

This prevents D-Bus from starting `kdeconnectd` directly (which would bypass app identity) and instead forces activation through the systemd unit.

## Wireless ADB Over Tailscale

scrcpy needs ADB to work. With Android 11+'s wireless debugging:

```bash
# Phone: Settings → Developer Options → Wireless Debugging → Enable
adb pair <tailscale-ip>:<pairing-port> <pairing-code>
adb connect <tailscale-ip>:<connect-port>
```

The wrapper script at `~/.local/bin/scrcpy-phone` auto-detects whether ADB is already connected (USB or wireless) and launches scrcpy with H.265 encoding at 60 FPS:

```bash
#!/bin/bash
PHONE_TAILSCALE_IP="100.91.245.46"

if adb devices 2>/dev/null | grep -q '[0-9a-f.:]\+[[:space:]]\+device'; then
    exec scrcpy --video-codec=h265 --max-fps=60 --no-audio "$@"
fi

if tailscale status 2>/dev/null | grep -q "$PHONE_TAILSCALE_IP.*active"; then
    if timeout 3 adb connect "$PHONE_TAILSCALE_IP:5555" 2>/dev/null | grep -q connected; then
        exec scrcpy --video-codec=h265 --max-fps=60 --no-audio "$@"
    fi
    notify-send "scrcpy" "Phone is on Tailscale but ADB not reachable."
    exit 1
fi

notify-send "scrcpy" "Phone not found. Enable wireless debugging or plug in USB."
exit 1
```

## KDE Connect Features

Beyond remote input, KDE Connect provides a suite of phone-desktop integrations that work out of the box:

| Plugin | What it does |
|--------|-------------|
| `clipboard` | Two-way clipboard sync |
| `notifications` | Phone notifications on desktop |
| `share` | Send files/URLs between devices |
| `sftp` | Browse phone filesystem from desktop |
| `battery` | Phone battery in tray |
| `mprisremote` | Media playback controls |
| `findmyphone` | Ring phone from desktop |
| `digitizer` | Drawing tablet (works via uinput) |
| `telephony` | Call notifications and SMS |

Clipboard push gets its own keybinding:

```bash
# SUPER + CTRL + P → push clipboard to phone
kdeconnect-cli --send-clipboard -n "Nothing Phone 3a Pro"
```

## Verification

After setup, verify everything is healthy:

```bash
# Check RemoteDesktop portal is exposed
busctl --user introspect org.freedesktop.portal.Desktop \
  /org/freedesktop/portal/desktop org.freedesktop.portal.RemoteDesktop

# Self-test cursor movement
hypr-kdeconnect-portal --self-test-motion 120 0

# Check running services
systemctl --user status app-org.kde.kdeconnect.daemon.service \
  hypr-kdeconnect-portal.service xdg-desktop-portal.service

# Phone connectivity
tailscale status | grep phone
kdeconnect-cli -l
```

## Keybindings

| Key | Action |
|-----|--------|
| `SUPER + P` | Launch scrcpy (phone screen mirroring) |
| `SUPER + CTRL + P` | Push clipboard to phone |

## Files Changed

- `~/.config/hypr/bindings.conf` — keybindings
- `~/.config/xdg-desktop-portal/portals.conf` — portal routing
- `~/.config/systemd/user/app-org.kde.kdeconnect.daemon.service` — daemon with app identity
- `~/.local/share/dbus-1/services/org.kde.kdeconnect.service` — D-Bus override
- `~/.local/bin/scrcpy-phone` — scrcpy wrapper
- `~/.local/bin/send-clipboard-to-phone` — clipboard push

## Why This Matters

No Remote Desktop app. No cloud relay. No same-network requirement. The phone becomes a native extension of the desktop — screen mirroring, input device, notification bridge, clipboard highway, and file conduit. All over a WireGuard mesh that works from anywhere.
