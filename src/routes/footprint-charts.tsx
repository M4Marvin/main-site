import { createFileRoute, redirect } from "@tanstack/react-router"

export const Route = createFileRoute("/footprint-charts")({
  beforeLoad: () => {
    throw redirect({ to: "/work/charts" })
  },
})
