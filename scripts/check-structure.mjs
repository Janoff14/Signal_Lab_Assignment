import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

const requiredPaths = [
  "apps/web",
  "apps/api",
  "packages/contracts",
  "infra/observability",
  "README.md",
  ".env.example",
  "package.json",
  "turbo.json",
  "tsconfig.base.json",
];

const missing = requiredPaths.filter((p) => !fs.existsSync(path.join(root, p)));

if (missing.length > 0) {
  console.error("Missing required paths:");
  missing.forEach((p) => console.error(`- ${p}`));
  process.exit(1);
}

const packageChecks = [
  {
    path: "apps/web/package.json",
    scripts: ["dev", "build", "lint", "typecheck", "test"],
  },
  {
    path: "apps/api/package.json",
    scripts: ["start:dev", "build", "lint", "typecheck", "test"],
  },
  {
    path: "packages/contracts/package.json",
    scripts: ["build", "lint", "typecheck", "test"],
  },
];

for (const check of packageChecks) {
  const filePath = path.join(root, check.path);
  const parsed = JSON.parse(fs.readFileSync(filePath, "utf8"));
  const scripts = parsed.scripts ?? {};
  for (const scriptName of check.scripts) {
    if (!scripts[scriptName]) {
      console.error(`Missing script '${scriptName}' in ${check.path}`);
      process.exit(1);
    }
    if (String(scripts[scriptName]).includes("placeholder passed")) {
      console.error(`Placeholder script '${scriptName}' in ${check.path}`);
      process.exit(1);
    }
  }
}

console.log("Structure check passed.");
