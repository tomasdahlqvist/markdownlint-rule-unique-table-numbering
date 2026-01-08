/* eslint-disable func-style */
/** @type import("markdownlint").Rule */

"use strict";

function parsePrefixAndNumber(str) {
  // Match prefix and trailing number, e.g. ID-001
  const matchResult = str.match(/^(?<prefix>.*?)(?<number>\d+)$/u);
  if (matchResult) {
    return { prefix: matchResult.groups.prefix, number: parseInt(matchResult.groups.number, 10), raw: matchResult.groups.number };
  }
  return { prefix: "", number: 0, raw: null };
}

function firstColumn(line) {
  return line
    .replace(/^\s*\|/u, "")
    .replace(/\|\s*$/u, "")
    .split("|")[0]
    .trim();
}

function checkTable(rows, onError) {
  if (rows.length < 2) {
    return;
  }
  
  // Get first column of first and second row
  const parsed1 = parsePrefixAndNumber(firstColumn(rows[0].line));
  const parsed2 = parsePrefixAndNumber(firstColumn(rows[1].line));
  if (
    parsed1?.prefix === parsed2?.prefix &&
    parsed2.number === parsed1.number + 1
  ) {
    // Only enforce uniqueness if first two rows are sequential with same prefix
    const seen = new Map();
    rows.forEach(({ line, lineNumber }) => {
      const firstCol = firstColumn(line);
      const parsed = parsePrefixAndNumber(firstCol);
      if (parsed) {
        const key = parsed.prefix + parsed.number;
        if (seen.has(key)) {
          onError({
            lineNumber,
            detail: `First column value deduced to be incremental (${firstCol}) is not unique in this table.`,
          });
        } else {
          seen.set(key, lineNumber);
        }
      }
    });
  }
}

const rule = {
  names: ["unique-table-first-column-numbered"],
  description:
    "Enforce unique first column in tables if first and second row are sequential numbers with same prefix.",
  tags: ["tables", "unique", "numbered"],
  function(params, onError) {
    let inTable = false;
    let tableRows = [];
    params.lines.forEach((line, idx) => {
      // Detect start of table (line with | and ---)
      if (/^\s*\|?\s*:?[-| ]+:?\s*\|/u.test(line)) {
        inTable = true;
        tableRows = [];
        return;
      }
      // If in a table, collect rows
      if (inTable && /^\s*\|/u.test(line)) {
        tableRows.push({ line, lineNumber: idx + 1 });
      } else if (inTable && !/^\s*\|/u.test(line)) {
        // End of table if line is not a table row
        checkTable(tableRows, onError);
        inTable = false;
        tableRows = [];
      }
    });
    // Check last table if file ends with a table
    if (inTable) {
      checkTable(tableRows, onError);
    }

  },
};

module.exports = [rule];