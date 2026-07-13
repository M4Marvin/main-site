#!/usr/bin/env node
import { execFile } from "node:child_process"
import { readdir } from "node:fs/promises"
import { promisify } from "node:util"
import { join, basename } from "node:path"

const exec = promisify(execFile)

const DIAGRAMS_DIR = "diagrams"
const OUTPUT_DIR = "public"

async function findMmdFiles(dir) {
  const files = []
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...(await findMmdFiles(path)))
    } else if (entry.name.endsWith(".mmd")) {
      files.push(path)
    }
  }
  return files
}

async function generate(input) {
  const output = join(OUTPUT_DIR, basename(input, ".mmd") + ".svg")
  const args = [
    "-i", input,
    "-o", output,
    "-t", "dark",
    "-b", "transparent",
    "-w", "800",
    "-q",
  ]
  console.log(`  ${input} → ${output}`)
  try {
    await exec("./node_modules/.bin/mmdc", args, { cwd: process.cwd() })
  } catch (err) {
    throw new Error(`Failed to generate ${output}: ${err.stderr || err.message}`)
  }
}

async function main() {
  const inputs = await findMmdFiles(DIAGRAMS_DIR)
  console.log(`Generating ${inputs.length} diagram(s)...`)
  for (const input of inputs) {
    await generate(input)
  }
  console.log("Done.")
}

main().catch((err) => {
  console.error(err.message)
  process.exit(1)
})
