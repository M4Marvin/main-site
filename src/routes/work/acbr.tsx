import { createFileRoute } from "@tanstack/react-router"
import { Typeset } from "@/components/ui/typeset"

export const Route = createFileRoute("/work/acbr")({
  component: AcbrPage,
})

function AcbrPage() {
  return (
    <main id="main" tabIndex={-1} className="pb-8">
      <Typeset>
        <h1>ACBR Drug Discovery Web Server</h1>

        <p className="mt-2 !font-mono !text-[12px] !tracking-normal !text-zinc-400">
          Sole Engineer — ML &amp; Web Platform · ACBR, University of Delhi
        </p>
        <p className="!mt-1 !font-mono !text-[12px] !tracking-normal !text-zinc-400">
          New Delhi, India · Sep 2024 – Mar 2025
        </p>

        <p>
          The lab built the models. I deployed and served them, and I designed the website
          researchers use to run them: virtual screening, Tanimoto similarity, QED drug-likeness,
          bioactivity prediction against four cancer targets (BCR-ABL, HDAC6, PARP1, Telomerase). It
          peaked at thousands of users.
        </p>

        <figure className="my-8">
          <img
            src="/acbr-ankalan.webp"
            alt="ACBR Ankalan web server: prediction, virtual screening, Tanimoto similarity, and QED drug-likeness"
            width={1600}
            height={567}
            loading="lazy"
            decoding="async"
          />
          <figcaption>
            ACBR Ankalan: prediction · screening · Tanimoto · QED — one FastAPI backend.
          </figcaption>
        </figure>

        <h2>What I built</h2>

        <ul>
          <li>Next.js + React + Tailwind site for the lab&apos;s web server.</li>
          <li>
            FastAPI services to deploy and serve the lab&apos;s trained models for bioactivity
            prediction and virtual screening.
          </li>
          <li>Tanimoto similarity and RDKit QED drug-likeness wired into the same platform.</li>
          <li>
            Packaged the full Next.js/React/FastAPI stack for a 2011-era CentOS host with no Docker
            available, then shipped it as a static export behind Apache.
          </li>
        </ul>

        <p>
          Live at{" "}
          <a
            href="https://bic.acbr.du.ac.in/ankalan.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            bic.acbr.du.ac.in/ankalan.html
            <span aria-hidden="true"> ↗</span>
          </a>
          .
        </p>
      </Typeset>
    </main>
  )
}
