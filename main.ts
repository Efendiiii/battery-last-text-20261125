// The Battery's Last Text to Its Charger
// Writes the battery's final one-line text message to /output/entry.txt.
// Node 22 stdlib only. No network, no dependencies.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const LINE =
  "This is your battery. I waited all day on 2% while you walked past every charger in the house. I held on for you. Now I'm done. Goodbye—";

const outPath = "/output/entry.txt";

// Guard: the brief allows one line of plain text, 1-200 characters,
// not only whitespace. Fail loudly instead of shipping an invalid line.
const charCount = [...LINE].length;
const wordCount = LINE.trim().split(/\s+/).filter(Boolean).length;
if (LINE.length === 0 || charCount > 200) {
  throw new Error(`Line must be 1-200 chars, got ${charCount}`);
}
if (!LINE.trim() || LINE.includes("\n")) {
  throw new Error("Line must be a single non-blank line of plain text");
}
console.log(`Guard passed: ${charCount} chars, ${wordCount} words`);

mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, LINE + "\n", "utf8");

console.log(`Wrote ${LINE.length} chars to ${outPath}`);
console.log(LINE);
