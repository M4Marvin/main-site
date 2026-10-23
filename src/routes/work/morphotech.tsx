import { createFileRoute, Link } from "@tanstack/react-router"
import { Typeset } from "@/components/ui/typeset"
import { RebuildFlow } from "@/components/sections/signal-flow"

export const Route = createFileRoute("/work/morphotech")({
  component: MorphotechPage,
})

function MorphotechPage() {
  return (
    <main id="main" tabIndex={-1} className="pb-8">
      <Typeset>
        <h1>Morphotech Data — Client Data to Agent Tools</h1>

        <p className="mt-2 !font-mono !text-[12px] !tracking-normal !text-zinc-400">
          Senior Software Engineer · Morphotech Data
        </p>
        <p className="!mt-1 !font-mono !text-[12px] !tracking-normal !text-zinc-400">
          Remote · Apr 2026 – Present
        </p>

        <p>
          Morphotech Data builds B2B data infrastructure for go-to-market teams. I lead a small team
          delivering two client engagements, and I designed and built the company site. Client names
          are not public; this page describes the shape of the work.
        </p>

        <figure className="my-8 not-prose">
          <RebuildFlow />
          <figcaption className="mt-2 font-mono text-[12px] text-zinc-400">
            From messy client data to agent-ready tools.
          </figcaption>
        </figure>

        <h2>The problem</h2>

        <p>
          Client data arrives messy and duplicated: the same company under several spellings,
          contacts with no stable key, and a relational schema built for a workflow that no longer
          exists. The stack around it cannot support AI agents — not because the models are weak,
          but because the data has no reliable query surface. An agent that reads duplicates and
          contradictory rows produces confident nonsense.
        </p>

        <h2>What I did</h2>

        <ul>
          <li>
            Rebuilt the relational schema around the client&apos;s actual entities and
            relationships, then added the dedupe constraints the old schema was missing.
          </li>
          <li>
            Ran the migration: moved the cleaned records into the new schema without losing the
            history the client still needed.
          </li>
          <li>
            Shipped <strong>15 MCP tools</strong> over the cleaned data — query, search, and write —
            so off-the-shelf coding agents can use it.
          </li>
          <li>
            Integrated the tools into the client web app with the AI SDK, and added observability so
            the client can see what the agents ask and what they change.
          </li>
          <li>Deployed to client infrastructure or AWS, depending on the engagement.</li>
          <li>
            Led a small team across two engagements: scoping, delivery, and the client communication
            that keeps a data migration from becoming a surprise.
          </li>
        </ul>

        <h2>The company site</h2>

        <p>
          I also designed and built{" "}
          <a href="https://morphotechdata.com" target="_blank" rel="noopener noreferrer">
            morphotechdata.com
            <span aria-hidden="true"> ↗</span>
          </a>{" "}
          — the public surface for the same data business. It is the part of this work you can open
          without an NDA.
        </p>

        <h2>What I owned</h2>

        <p>
          End-to-end delivery for both engagements: the data model, the migration, the MCP tool
          surface, the agent integration, and the client-facing communication. The team was small;
          the point was to leave the client with a schema and a tool surface their own engineers
          could extend.
        </p>

        <p>
          For the deeper technical work, see <Link to="/work/sirius">Sirius</Link> and{" "}
          <Link to="/work/charts">mFinancialCharts</Link>.
        </p>
      </Typeset>
    </main>
  )
}
