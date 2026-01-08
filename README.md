# markdownlint-rule-unique-table-numbering

A custom [markdownlint][markdownlint] rule that checks that tables with
a numbering in the first column has all unique first column.

## Overview

This rule is for the [Node.js markdownlint library][markdownlint] and its
associated tools.

If the first columns in the first and second row has ascending values then
the whole column needs to be unique.

### Why?

Many tables have a unique identifier in the first column. This rule tries
to deduce if the first column is a column with an id and then enforces
uniqueness for the whole column.

**Examples of where this is useful:**

- Allocation of document numbers
- Database descriptions
- Lists of things which needs to be uniquely identified

**Example structure:**

```markdown
# Document Register

| Document Number | Author         | Title                                 |
| --------------- | -------------- | ------------------------------------- |
| LOTR-001        | Bilbo Baggins  | There and Back Again                  |
| LOTR-002        | Gandalf        | The Quest of Erebor                   |
| LOTR-003        | Frodo Baggins  | The Red Book of Westmarch             |
| LOTR-004        | Samwise Gamgee | The Tale of Samwise the Brave         |
| LOTR-005        | Elrond         | The Council of Elrond Proceedings     |
| LOTR-006        | Aragorn        | The Annals of the Kings of Gondor     |
| LOTR-007        | Legolas        | The Journey of the Fellowship         |
| LOTR-008        | Pippin Took    | The Guard of the Citadel              |
```

## Installation

```sh
npm install --save-dev markdownlint-rule-unique-table-numbering
```

## Usage

### With markdownlint-cli

If installed locally, markdownlint will auto-discover the rule by package name.
You can use:

```sh
markdownlint --rules markdownlint-rule-unique-table-numbering *.md
```

If you want to use a direct path, you can still use:

```sh
markdownlint --rules ./index.cjs *.md
```

### With markdownlint-cli2

If installed locally, markdownlint-cli2 will auto-discover the rule by package
name. You can add it to your config file using the package name:

```jsonc
{
    "customRules": [
        "markdownlint-rule-unique-table-numbering"
    ]
}
```

Or to `.markdownlint-cli2.yaml`:

```yaml
customRules:
    - markdownlint-rule-unique-table-numbering
```

To use a direct path, you can still reference index.cjs if needed:

```jsonc
{
    "customRules": [
        "./index.cjs"
    ]
}
```

### With VS Code

If using the [`markdownlint` extension for VS Code][vscode-markdownlint],
install this package in your workspace and the rule will be auto-discovered.
For advanced usage, see the markdownlint-cli2 examples above or refer to the
extension documentation.

## Testing

To run the tests:

```sh
npm test
```

## Contributing

Pull requests and issues are welcome! Please ensure your code passes linting
and tests before submitting.

## License

MIT

[markdownlint]: <https://github.com/DavidAnson/markdownlint>
[vscode-markdownlint]: <https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint>
