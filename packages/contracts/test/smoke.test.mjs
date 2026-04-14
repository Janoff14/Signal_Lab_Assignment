import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

test("contracts source entry exists", () => {
  const root = process.cwd();
  assert.equal(fs.existsSync(path.join(root, "src/index.ts")), true);
});
