# Unique table number violations

## Same number

<!-- markdownlint-disable MD047 -->

| id  | text     |
| --- | -------- |
| 1   | harder   |
| 2   | better   |
| 3   | faster   |
| 4   | stronger |
| 1   | work it  |

| id    | text     |
| ----- | -------- |
| AAA-1 | faster   |
| AAA-2 | higher   |
| AAA-2 | stronger |

| id    | text     |
| ----- | -------- |
| AAA-1 | faster   |
| AAA-3 | higher   |
| AAA-2 | stronger |

| id    | text     |
| ----- | -------- |
| AAA-8 | faster   |
| AAA-9 | higher   |
| AAA-2 | stronger |

| id    | text     |
| ----- | -------- |
| AAA-8 | faster   |
| AAA-9 | higher   |
| AAA-8 | stronger |

| id  | text     |
| --- | -------- |
| AAA | faster   |
| AAA | higher   |
| AAA | stronger |

| id  | text     |
| --- | -------- |
| A-1 | faster   |