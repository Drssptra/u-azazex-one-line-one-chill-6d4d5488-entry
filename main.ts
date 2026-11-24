// One Line, One Chill — make.fun bounty u-azazex-one-line-one-chill-6d4d5488.
//
// A single sentence of horror, written to $MAKEFUN_OUTPUT_DIR/entry.txt
// with no trailing newline, and echoed to stdout. Node 22, stdlib only,
// no network, fully deterministic: the same line on every run. The line
// aims at the judge's order — frightening first, then vivid, original,
// and tightly built, with the last words landing the blow.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: one sentence, one breath, one chill. The scare is a small,
// concrete detail — a labelled drawer — and a date that has not happened yet.
const ENTRY =
  "My dentist keeps the teeth he pulls, and this morning I found mine in his drawer, labelled with a date three years from now.";

// The gate wants 1 to 200 characters of UTF-8 text, not only whitespace.
// The brief wants one sentence, so guard that too: a single terminal full
// stop, and no other sentence-ending mark anywhere inside the line.
if (ENTRY.length < 1 || ENTRY.length > 200) {
  throw new Error(`entry is ${ENTRY.length} characters, outside the 1-200 gate`);
}
if (ENTRY.trim().length === 0 || ENTRY.includes("\n")) {
  throw new Error("entry must be a single non-blank line");
}
if (!ENTRY.endsWith(".") || /[.!?][^.]/.test(ENTRY.slice(0, -1))) {
  throw new Error("entry must be exactly one sentence");
}

// MAKEFUN_OUTPUT_DIR names the directory; the file itself is entry.txt
// inside it, defaulting to /output/entry.txt when the variable is unset.
const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");

// Stdout gets the line too (a trailing newline here is fine).
console.log(ENTRY);
