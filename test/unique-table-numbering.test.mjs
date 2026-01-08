import assert from "node:assert";
import test from "node:test";
import numberedHeadingsUnique from "../index.cjs";
import { main as cli2 } from "markdownlint-cli2";

const numberedViolations = [
  'unique-table-numbering-violations.md:13 error unique-table-first-column-numbered Enforce unique first column in tables if first and second row are sequential numbers with same prefix. [First column value deduced to be incremental (1) is not unique in this table.]',
  'unique-table-numbering-violations.md:19 error unique-table-first-column-numbered Enforce unique first column in tables if first and second row are sequential numbers with same prefix. [First column value deduced to be incremental (AAA-2) is not unique in this table.]',
  'unique-table-numbering-violations.md:37 error unique-table-first-column-numbered Enforce unique first column in tables if first and second row are sequential numbers with same prefix. [First column value deduced to be incremental (AAA-8) is not unique in this table.]',
];
const customRules = numberedHeadingsUnique;
const paramsBase = {
  "argv": [ "unique-table-numbering-violations.md" ],
  "directory": "test",
  "optionsOverride": {
    customRules,
    config: { "MD024": false }
  }
};

test("unique table numbering violations", async () => {
  const messages = [];
  const params = {
    ...paramsBase,
    "logError": (message) => messages.push(message)
  };
  const result = await cli2(params);
  assert.equal(result, 1);
  assert.deepEqual(messages, numberedViolations);
});

// No config or fix tests for this rule (not applicable)

test("no issues in project files", async () => {
  const params = {
    "argv": [ "*.md" ],
  };
  const result = await cli2(params);
  assert.equal(result, 0);
});
