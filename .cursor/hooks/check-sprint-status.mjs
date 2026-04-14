import { readFileSync } from "node:fs";

const path = "_bmad-output/sprint-status.yaml";
const content = readFileSync(path, "utf8");

if (!content.includes("development_status:")) {
  console.error("Sprint status file missing development_status block.");
  process.exit(1);
}

console.log("Sprint status structure check passed.");
