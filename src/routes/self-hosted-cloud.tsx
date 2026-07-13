import { createFileRoute, Link } from "@tanstack/react-router"
import { ArrowLeft, ExternalLink } from "lucide-react"
import { Typeset } from "@/components/ui/typeset"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export const Route = createFileRoute("/self-hosted-cloud")({
  component: SelfHostedCloudPage,
})

function SelfHostedCloudPage() {
  return (
    <main className="relative min-h-screen bg-black text-white">
      <div className="mx-auto max-w-4xl px-4 py-8 md:px-8 md:py-16">
        <div className="mb-12">
          <Link
            to="/"
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "-ml-3 gap-2 text-neutral-400 hover:text-white",
            )}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>

        <Typeset>
          <h1>My Personal Cloud: Two Boxes, One Tunnel, Zero Open Ports</h1>

          <p>
            Six live services, one Hetzner VPS, one Cloudflare tunnel, and a
            Tailscale tailnet. No third parties holding my data, no firewall
            holes, no monthly bills to anyone but a German hosting company. This
            is the story of how I built it, what runs on it, and what I learned
            about networking, security, and the real cost of convenience along
            the way. The full infrastructure overview is on the{" "}
            <Link to="/">home page</Link>, and the live services are linked
            throughout.
          </p>

          <h2>The Box</h2>

          <p>
            Everything public lives on a single Hetzner Cloud VPS. It is a
            shared-CPU CX-class instance: 4 vCPU on Intel Xeon Skylake, 7.6GB
            of RAM, 76GB of disk. It runs Ubuntu 24.04 LTS on a 6.8 kernel and
            has been up for 149 days at the time of writing. The floating IPv4
            is <code>77.42.65.13</code>, allocated in Falkenstein. Hetzner
            charges about €4.50 a month for this tier, and the reason I picked
            them over AWS or DigitalOcean is not the price so much as the
            posture: GDPR-compliant, ISO 27001 certified, C5 testat, with data
            centers in Falkenstein and Nuremberg that I can drive to. The
            AWS equivalent of this box would be a t3.small, which is roughly
            three times the price before you start paying for egress.
          </p>

          <p>
            Access is a single line in <code>~/.ssh/config</code>:{" "}
            <code>Host hetzner</code> maps to the floating IP, user{" "}
            <code>marv</code>, key file <code>~/.ssh/hetzner_key</code>. The SSH
            daemon listens on port 3232, not 22, with{" "}
            <code>PermitRootLogin no</code> and{" "}
            <code>PasswordAuthentication no</code>. Key-only, non-standard port,
            no root. Every time I type <code>ssh hetzner</code>, that is the
            whole story.
          </p>

          <h2>The Network Model</h2>

          <p>
            The mental model that made the rest of this design obvious is that
            the box sits on two separate, untrusted networks. One is public, one
            is private, and they are wired together by nothing but routing
            rules.
          </p>

          <p>
            The <strong>public network</strong> is the path every external
            visitor takes. A request comes in from the open internet, hits
            Cloudflare&apos;s edge (where TLS termination, CDN caching, the WAF,
            and DDoS protection all happen), and is then handed off over an
            outbound-only tunnel to <code>cloudflared</code> running on the VPS.
            The tunnel terminates on a service bound to{" "}
            <code>127.0.0.1</code>. No port on the VPS is ever exposed to the
            public internet. The only thing a port scan will find on the
            floating IP is SSH on 3232, and the floating IP is the only thing
            the VPS has anyway.
          </p>

          <p>
            The <strong>private network</strong> is a Tailscale tailnet. It is a
            mesh of WireGuard tunnels between the devices I own, with each
            device getting a stable 100.x.y.z address. The VPS sits on it as{" "}
            <code>100.80.96.4</code>. Beast (the desktop I will introduce
            later) is <code>100.105.177.97</code>. My MacBook is{" "}
            <code>100.71.249.91</code>. My phone is{" "}
            <code>100.91.245.46</code> and has been offline for 23 days, which
            is normal. The tailnet is how backups move, how I SSH into Beast
            from the MacBook, and how things that should never touch the
            public edge reach me.
          </p>

          <p>
            What goes on which network is a deliberate decision. Anything I
            want the world to use &mdash; Git, password vault, file server,
            charts, chat, this site &mdash; goes on the public tunnel.
            Anything I only want for myself &mdash; media servers, internal
            admin UIs, the Forgejo container&apos;s port 22, the database
            sockets &mdash; goes on the tailnet. The two networks are not
            symmetric. The public one is heavily filtered, the private one is
            trusted, and the box is the bridge between them.
          </p>

          <h2>Cloudflare Tunnels</h2>

          <p>
            The piece that makes the &ldquo;no public ports&rdquo; design
            possible is <code>cloudflared</code>, a small daemon that runs on
            the origin and dials outward to Cloudflare. It is a persistent
            outbound connection; Cloudflare terminates public traffic and
            reverses it through the tunnel. From the firewall&apos;s
            perspective, the VPS never accepts an inbound connection. From
            Cloudflare&apos;s perspective, the origin has no public IP that
            matters. The connection is post-quantum encrypted, and the daemon
            maintains four long-lived connections to two Cloudflare points of
            presence for redundancy. If one PoP dies, the others carry on.
          </p>

          <p>
            I run <code>cloudflared</code> as a systemd service, not a
            container. The unit file at{" "}
            <code>/etc/systemd/system/cloudflared.service</code> starts the
            daemon with the config at <code>/etc/cloudflared/config.yml</code>
            and enables it on boot. There is a daily systemd timer,
            <code>cloudflared-update.timer</code>, that pulls the latest
            upstream binary. Two reasons for the systemd approach: the daemon
            needs to start before Docker is even up, and the tunnel credentials
            sit on the host filesystem where the unit file can read them
            without container-volume gymnastics.
          </p>

          <p>
            The ingress rules are short. The user-mode copy at{" "}
            <code>~/.cloudflared/config.yaml</code> maps five hostnames to
            five local ports and ends with a catch-all that returns a 404.
            The same tunnel UUID (<code>ffd206b8-...</code>) is referenced by
            both the root-owned and user-owned configs; the dashboard drives
            most changes, but I keep the user-mode copy editable so I can
            tweak routing without sudo. The full mapping:{" "}
            <code>m4marvin.com</code> reaches the portfolio on port 8001,{" "}
            <code>chat.m4marvin.com</code> reaches the chat app on 8002,{" "}
            <code>git.m4marvin.com</code> reaches Forgejo on 8003,{" "}
            <code>vault.m4marvin.com</code> reaches Vaultwarden on 8004, and{" "}
            <code>status.m4marvin.com</code> reaches Uptime Kuma on 8005.{" "}
            <code>files.m4marvin.com</code> and <code>charts.m4marvin.com</code>{" "}
            are configured through the Cloudflare dashboard directly. The
            catch-all matters: any other hostname that resolves to the tunnel
            gets a 404, which is the only sensible answer for a host that
            should not be reaching into my infrastructure on a guess.
          </p>

          <h2>Tailscale</h2>

          <p>
            Tailscale is the second network. The reason I need it at all is
            that not everything should be on the public edge. Jellyfin, for
            one: I do not want my media server reachable from the open
            internet, full stop. The Forgejo container also exposes port 22 for
            SSH over Git, and I do not want that port on the public edge
            either. Internal admin UIs (Uptime Kuma&apos;s settings page, the
            Vaultwarden admin token endpoint) are the same shape &mdash; things
            that exist but should not be guessed.
          </p>

          <p>
            The tailnet is a mesh of WireGuard tunnels. Each device gets a
            stable 100.x.y.z address, and MagicDNS resolves the device name
            (<code>hetzner-vps</code>, <code>beast</code>,{" "}
            <code>macbook</code>) to that address automatically. Subnet routing
            is enabled on the VPS but IP forwarding is not, which is a known
            gap: the box is not currently a subnet router for anything behind
            it. That is a future feature, not a vulnerability, because nothing
            on the tailnet advertises private subnets.
          </p>

          <p>
            The split between the two networks is a discipline. The public
            tunnel is for things the world uses. The tailnet is for things
            only I use. When a new service lands, the first question is which
            network it belongs on, and the answer is almost always the
            tailnet unless the service has a reason to be public.
          </p>

          <h2>The Service Stack</h2>

          <p>
            Everything public runs in Docker Compose, with{" "}
            <code>~/apps/docker-compose.yml</code> as the single source of
            truth. Each service binds to <code>127.0.0.1</code> on a unique
            high port, and the Cloudflare tunnel is the only thing that
            reaches those ports. Here is what runs on the box, in the order
            it appears in the compose file.
          </p>

          <p>
            <strong>Forgejo</strong> (<code>codeberg.org/forgejo/forgejo:10</code>)
            on port 8003, reached at <code>git.m4marvin.com</code>. This is the
            Git server. The Actions framework is enabled, with a runner on
            Beast doing the actual CI/CD work &mdash; the runner attaches
            through the tailnet. <strong>Vaultwarden</strong> on port 8004,
            reached at <code>vault.m4marvin.com</code>. Signups are disabled,
            and the CSP header in the response includes Duo, so two-factor
            authentication is enforced on every login.{" "}
            <strong>Uptime Kuma</strong> on port 8001, reached at{" "}
            <code>status.m4marvin.com</code>. The heartbeat dashboard for
            every public service, plus a few internal ones. I recently wired
            up monitors for all the subdomains, so if any one of them goes
            silent I find out in under a minute.
          </p>

          <p>
            <strong>Copyparty</strong> on port 8009, reached at{" "}
            <code>files.m4marvin.com</code>. A single-binary file server. It
            hosts the resume PDF, the screenshots that appear on this site,
            the blog images, and a few other static assets. The service is
            auth-gated &mdash; a fresh request to the URL gets a 403, which is
            the correct answer. <strong>Portfolio</strong> on port 8001,
            reached at <code>m4marvin.com</code>. The site you are reading
            right now, built with TanStack Router and Vite, served by nginx
            inside the container. <strong>Charts</strong> on port 8006,
            reached at <code>charts.m4marvin.com</code>. The mFinancialCharts
            instance, built from the codebase covered in the{" "}
            <Link to="/footprint-charts">footprint charts writeup</Link>.{" "}
            <strong>Chat</strong> on port 8002, reached at{" "}
            <code>chat.m4marvin.com</code>. A small custom app (Better Auth
            and SQLite, with a local DB file) for a private messaging surface.
          </p>

          <p>
            Two things that you will not find on the VPS, on purpose: Immich
            (the self-hosted Google Photos replacement) and Jellyfin (the
            media server). Both run on Beast, the desktop I keep at home, and
            both are reachable only over the tailnet. Immich because the ML
            pipeline (facial recognition and natural-language search) runs on
            the Arc Pro GPU via OpenVINO, and Jellyfin because a media server
            on the public internet is asking for trouble. Forgejo&apos;s CI
            runner is also on Beast, with 16 cores and Docker-in-Docker
            available. The rule is simple: anything that wants more than
            network and disk, or that has no business being public, lives on
            Beast.
          </p>

          <h2>Security Model</h2>

          <p>
            The security model is defense in depth, with the layers stacked so
            that any single failure is bounded. At the network layer, every
            service is bound to <code>127.0.0.1</code> on a unique high port.
            Even if UFW disappeared entirely, the only way to reach those
            ports would be from inside the host. UFW does not disappear, of
            course: it is enabled with the default-deny inbound policy, and
            Cloudflare absorbs everything at the L3 and L4 layer before it
            even reaches the host. A port scan on the floating IP finds
            nothing except SSH on 3232.
          </p>

          <p>
            At the SSH layer, the daemon listens on port 3232, refuses root
            logins, refuses password authentication, and accepts only key
            auth. <code>fail2ban</code> watches the auth log and bans any IP
            that fails too many times in a row. The default jail is on,
            which is enough for a single-user box. The combination &mdash;
            non-standard port, key-only, and a bouncer &mdash; is
            aggressively effective at making automated SSH attacks a
            non-event.
          </p>

          <p>
            At the package layer, <code>unattended-upgrades</code> is enabled
            with <code>APT::Periodic::Unattended-Upgrade &quot;1&quot;</code>,
            which means security updates from Ubuntu apply themselves on a
            schedule without me doing anything. I check in periodically to
            see what got applied, but the system does not wait for me. At
            the integrity layer, AIDE runs daily via{" "}
            <code>dailyaidecheck.timer</code> and walks the entire
            filesystem against a baseline, taking about an hour of CPU per
            run. <code>chkrootkit</code> runs daily on its own timer. Neither
            tool pages me, which is a known gap &mdash; the alerts are in the
            logs, but I have not yet wired them to anything that would push
            a notification.
          </p>

          <p>
            The piece I am most proud of is the asymmetry. Even a worst-case
            L7 RCE in one of the public services is unreachable except via
            the Cloudflare tunnel, and the tunnel only knows about the
            subdomains I configured. An attacker would have to compromise
            Cloudflare&apos;s edge (or my Cloudflare account) to route new
            traffic at the origin, and the services themselves are bound to
            loopback, so a port-forward from inside a container still has to
            go through the tunnel. The blast radius of any single bug is
            small.
          </p>

          <h2>Backups, Beast, and the Cost of Owning It</h2>

          <p>
            There are two boxes, not one. The VPS is the boring, public one.
            Beast is the fun one. Beast is an Intel Core Ultra 9 desktop with
            93GB of RAM and an Arc Pro 130T GPU, sitting on my desk in Abu
            Dhabi. It runs Arch (not Ubuntu) and hosts the things that need
            real compute: Immich with OpenVINO ML on the Arc GPU, the
            Forgejo Actions runner on 16 cores, and Jellyfin on the tailnet.
            The two boxes do not see each other on the public internet; they
            see each other on the tailnet, at{" "}
            <code>100.80.96.4</code> and <code>100.105.177.97</code>.
          </p>

          <p>
            Backups run from Beast, not the VPS. The job is scheduled on
            Beast and pulls from the VPS over the Tailscale tailnet, which
            means the backup traffic is encrypted and never touches the
            public edge. The VPS does not need to know backups are happening.
            The data that moves is the small stuff: Forgejo repositories,
            Vaultwarden database, Copyparty file index, chat database, and
            service configs. The actual binary blobs (the photos, the media
            library) live on Beast, where they are produced.
          </p>

          <p>
            The cost math is what sold me on doing this in the first place.
            Hetzner is about €4.50 a month, the domain is $12 a year, and
            both Cloudflare and Tailscale are free on the personal tier.
            That works out to roughly <strong>$66 a year</strong> for the
            whole stack: Git hosting, password sync, file server, status
            page, this site, the charts, the chat app, plus a private mesh
            VPN across all my devices. The equivalent managed stack
            &mdash; GitHub Pro at $48, Bitwarden Premium at $40, Google
            Photos 200GB at $30, Dropbox Plus at $120, StatusCake Solo at
            $80, Vercel Pro at $240 &mdash; comes out to{" "}
            <strong>roughly $560 a year</strong>, and at the end of it I
            still do not own a single byte of my data.
          </p>

          <p>
            The thing nobody tells you about building infrastructure is that
            it teaches you more about the cloud than any certification. I
            learned DNS propagation and CNAMEs and the difference between a
            floating IP and a primary IP. I learned how TLS works end to end
            because Cloudflare handled the public side and I had to figure
            out what was happening on the origin side. I learned Docker
            networking by binding services to the wrong interface and
            watching them stop being reachable. I learned systemd by
            debugging a <code>cloudflared</code> unit that would not start
            on boot. I learned about defense in depth by sketching the
            failure modes on a whiteboard and noticing that the layers
            covered for each other.
          </p>

          <p>
            The cost of convenience is paid in trust, and trust is the one
            thing you cannot patch. Every service that asks me to upload
            my passwords, my photos, my source code, my files, is asking
            me to believe that it will still be there in five years, will
            still respect the access controls it advertises, and will
            still not be the one thing that gets breached. I stopped being
            willing to make that bet. The Hetzner box is not the cheapest
            way to host a Git server, but it is the only one where the
            answer to &ldquo;who has access to my repos&rdquo; is
            &ldquo;me.&rdquo;
          </p>

          <hr />

          <p>
            The live services are reachable through the tunnel:{" "}
            <a
              href="https://git.m4marvin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              git.m4marvin.com
              <ExternalLink className="ml-0.5 inline-block h-3 w-3" />
            </a>
            ,{" "}
            <a
              href="https://vault.m4marvin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              vault.m4marvin.com
              <ExternalLink className="ml-0.5 inline-block h-3 w-3" />
            </a>
            ,{" "}
            <a
              href="https://status.m4marvin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              status.m4marvin.com
              <ExternalLink className="ml-0.5 inline-block h-3 w-3" />
            </a>
            ,{" "}
            <a
              href="https://files.m4marvin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              files.m4marvin.com
              <ExternalLink className="ml-0.5 inline-block h-3 w-3" />
            </a>
            ,{" "}
            <a
              href="https://charts.m4marvin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              charts.m4marvin.com
              <ExternalLink className="ml-0.5 inline-block h-3 w-3" />
            </a>
            , and{" "}
            <a
              href="https://chat.m4marvin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              chat.m4marvin.com
              <ExternalLink className="ml-0.5 inline-block h-3 w-3" />
            </a>
            . The status page is the first place to look if anything looks
            off.
          </p>
        </Typeset>
      </div>
    </main>
  )
}
