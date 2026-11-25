// u-azazex-one-line-one-chill-6d4d5488 — v2 resubmit (revise agent).
// One-sentence horror: a lullaby that should not have a second verse,
// sung in sleep by a child who never heard the first. Node 22, stdlib
// only, no network, deterministic — identical output on every run.
// v2 entry is wholly new vs v1 (dentist/teeth/drawer/future date);
// no v1 wording, premise, or image is reused here.

import * as fs from "node:fs";
import * as path from "node:path";

const SENTENCE =
  "The lullaby my mother sang me only has one verse, so I froze when my daughter, who never heard it, sang the second in her sleep.";

function fail(message: string): never {
  throw new Error(`entry rejected: ${message}`);
}

function checkLength(text: string): void {
  const chars = [...text];
  if (chars.length < 1 || chars.length > 200) {
    fail(`length ${chars.length} outside 1-200`);
  }
}

function checkSingleLine(text: string): void {
  for (const ch of text) {
    if (ch === "\n" || ch === "\r") fail("contains a line break");
  }
  if (text !== text.trim()) fail("leading or trailing whitespace");
  if (text.trim().length === 0) fail("blank");
}

function checkOneSentence(text: string): void {
  const body = text.slice(0, -1);
  const terminators = [".", "!", "?"];
  for (const mark of terminators) {
    if (body.includes(mark)) fail(`extra sentence terminator ${mark}`);
  }
  if (!text.endsWith(".")) fail("must end with a full stop");
}

function resolveOutDir(): string {
  const dir = process.env.MAKEFUN_OUTPUT_DIR;
  return dir && dir.length > 0 ? dir : "/output";
}

function main(): void {
  checkLength(SENTENCE);
  checkSingleLine(SENTENCE);
  checkOneSentence(SENTENCE);
  const dir = resolveOutDir();
  fs.mkdirSync(dir, { recursive: true });
  const target = path.join(dir, "entry.txt");
  fs.writeFileSync(target, Buffer.from(SENTENCE, "utf8"));
  process.stdout.write(SENTENCE + "\n");
}

main();
