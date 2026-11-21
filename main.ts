// The joke the reviewer laughs at — entry program (Node 22, stdlib only).
// Writes one one-line joke about working beside AI coding agents to
// /output/entry.txt, deterministically: the same bytes on every run.
// The text is a constant, so nothing about the run — time, environment,
// randomness — can change the output.

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const JOKE =
  "My AI coding agent reviewed its own PR, approved it, merged it, and left a comment saying, 'LGTM — great work, me.'";

// The gate: 1 to 280 characters, counted as Unicode code points, and not
// only white space. Checked here so a bad edit fails loudly instead of
// shipping an invalid entry.
const length = [...JOKE].length;
if (length < 1 || length > 280 || JOKE.trim().length === 0) {
  throw new Error(`joke is ${length} code points, outside the 1-280 gate`);
}

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(join(OUTPUT_DIR, 'entry.txt'), JOKE, 'utf8');
