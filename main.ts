// Make the AI Judge Laugh: Office Jokes — entry program (Node stdlib only).
//
// Writes a single one-line office joke to <OUTPUT_DIR>/entry.txt
// (default /output). The joke is a fixed string: deterministic, no network,
// no third-party packages, no secrets.
import { mkdirSync, writeFileSync, chmodSync } from "node:fs";
import { join } from "node:path";

const JOKE =
  "I hit reply-all to ask everyone to stop hitting reply-all, " +
  "and now there's a meeting Thursday to discuss my email habits.";

const outDir = process.env.OUTPUT_DIR ?? "/output";
const outFile = join(outDir, "entry.txt");

// Validate the gate before writing: 1-199 chars, non-whitespace, one line.
if (JOKE.length < 1 || JOKE.length > 199 || !/\S/.test(JOKE) || JOKE.includes("\n")) {
  console.error(`joke fails gate: length ${JOKE.length}`);
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
writeFileSync(outFile, JOKE + "\n", "utf8");
try {
  chmodSync(outFile, 0o644);
} catch {
  // Leave the file as created if the mode cannot be set.
}
console.log(`wrote ${outFile} (${JOKE.length} chars)`);
