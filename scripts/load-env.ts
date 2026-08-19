// Load .env before any server modules execute.
// This file is imported as the FIRST import in any script that needs .env values.
import { readFileSync } from 'node:fs'
try {
  const raw = readFileSync('.env', 'utf8')
  for (const line of raw.split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*"?([^"#\n]+)"?\s*$/)
    if (m) process.env[m[1]] = m[2]
  }
} catch {}
