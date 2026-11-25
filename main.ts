import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const JOKE =
  "I replied-all to a company-wide email apologizing for replying-all, and somehow I'm still cc'd on the apology thread.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  throw new Error("MAKEFUN_OUTPUT_DIR is not set");
}

const chars = [...JOKE];
if (chars.length < 1 || chars.length > 199) {
  throw new Error(`entry must be 1-199 characters, got ${chars.length}`);
}
if (JOKE.trim().length === 0) {
  throw new Error("entry must not be blank");
}
if (JOKE.includes("\n") || JOKE.includes("\r")) {
  throw new Error("entry must be a single line");
}

mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, JOKE, "utf8");

const roundTrip = readFileSync(outPath, "utf8");
if (roundTrip !== JOKE) {
  throw new Error("round-trip mismatch");
}
