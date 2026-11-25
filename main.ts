// Have You Tried Turning It Off? — make.fun entry.
//
// Writes one original funny line, spoken by a hopeless tech support
// agent to a desperate customer, to /output/entry.txt.

import { mkdirSync, writeFileSync } from "node:fs";

const LINE =
  "Have you tried turning it off and on again? Perfect — that was step one of twelve, and steps two through twelve are also turning it off and on again.";

function main(): void {
  // The gate: 1 to 199 characters of non-blank UTF-8 text, a single line.
  const chars = [...LINE].length;
  if (chars < 1 || chars > 199) {
    throw new Error(`entry line is ${chars} characters, must be 1-199`);
  }
  if (!LINE.trim() || LINE.includes("\n")) {
    throw new Error("entry line must be a single non-blank line");
  }
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", LINE, "utf-8");
  console.log(LINE);
}

main();
