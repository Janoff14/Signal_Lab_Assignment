import { readFileSync } from "node:fs";

const readme = readFileSync("README.md", "utf8");
const requiredSections = ["## Run (Single Command Stack)", "## Verify Observability", "## Stop"];

const missing = requiredSections.filter((section) => !readme.includes(section));
if (missing.length > 0) {
  console.error(`README missing required sections: ${missing.join(", ")}`);
  process.exit(1);
}

console.log("README workflow section check passed.");
