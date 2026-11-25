// Have You Tried Turning It Off? — make.fun entry.
//
// Writes one original funny line, spoken by a hopeless tech support
// agent to a desperate customer, to /output/entry.txt.
//
// The line is validated at import time (single line, 1-199 characters)
// and verified by reading the output file back after writing it, so a
// bad write can never pass silently.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// The competition gate: 1 to 199 characters of non-blank UTF-8 text,
// a single line. MAX_CHARS is the exclusive upper bound.
const MAX_CHARS = 200;

const LINE =
  "Have you tried turning it off and on again? Perfect — that was step one of twelve, and steps two through twelve are also turning it off and on again.";

function validateLine(line: string): void {
  const chars = [...line].length;
  if (chars < 1 || chars >= MAX_CHARS) {
    throw new Error(
      `entry line is ${chars} characters, must be 1-${MAX_CHARS - 1}`,
    );
  }
  if (!line.trim()) {
    throw new Error("entry line must not be blank");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry line must be a single line");
  }
}

// Import-time validation: fail before anything else runs.
validateLine(LINE);

function writeEntry(line: string): void {
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", line, "utf-8");
}

function verifyEntry(line: string): void {
  // Read-back self-verification: what landed on disk must be exactly
  // the validated line, byte for byte.
  const written = readFileSync("/output/entry.txt", "utf-8");
  if (written !== line) {
    throw new Error("read-back verification failed: /output/entry.txt does not match the entry line");
  }
}

function main(): void {
  writeEntry(LINE);
  verifyEntry(LINE);
  console.log(LINE);
}

main();
