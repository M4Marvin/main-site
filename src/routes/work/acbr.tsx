import { createFileRoute } from "@tanstack/react-router"
import { Typeset } from "@/components/ui/typeset"
import { pageHead } from "@/lib/seo"

export const Route = createFileRoute("/work/acbr")({
  component: AcbrPage,
  head: () =>
    pageHead({
      title: "ACBR Drug Discovery Web Server",
      description:
        "ML serving platform for early-stage drug discovery at ACBR, University of Delhi — prediction, virtual screening, Tanimoto similarity, QED. Sole engineer.",
      path: "/work/acbr",
    }),
})

function AcbrPage() {
  return (
    <main id="main" tabIndex={-1} className="pb-8">
      <Typeset>
        <h1>ACBR Drug Discovery Web Server</h1>

        <p className="mt-2 !font-mono !text-[12px] !tracking-normal !text-zinc-500">
          Sole Engineer — ML &amp; Web Platform · ACBR, University of Delhi · Sep 2024 – Mar 2025
        </p>

        <p>
          The lab built the models. I deployed and served them, and I designed the website
          researchers use to run them: virtual screening, Tanimoto similarity, QED drug-likeness,
          bioactivity prediction against four cancer targets (BCR-ABL, HDAC6, PARP1, Telomerase).
        </p>

        <figure className="my-8">
          <img
            src="/acbr-surface.svg"
            alt="ACBR platform surface: prediction, virtual screening, Tanimoto similarity, and QED drug-likeness"
            width={880}
            height={140}
            decoding="async"
          />
          <figcaption>
            Prediction · Screening · Tanimoto · QED — four surfaces, one FastAPI backend.
          </figcaption>
        </figure>

        <h2>What I built</h2>

        <ul>
          <li>Next.js + React + Tailwind site for the open-source server.</li>
          <li>
            FastAPI services to deploy and serve the lab&apos;s trained models for bioactivity
            prediction and virtual screening.
          </li>
          <li>Tanimoto similarity and RDKit QED drug-likeness wired into the same platform.</li>
          <li>Dockerized so the lab could run it without a local Python zoo.</li>
        </ul>

        <p>
          Live at{" "}
          <a href="https://bic.acbr.du.ac.in" target="_blank" rel="noopener noreferrer">
            bic.acbr.du.ac.in
            <span aria-hidden="true"> ↗</span>
          </a>
          .
        </p>
      </Typeset>
    </main>
  )
}
