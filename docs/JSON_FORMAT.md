# JSON format

[English](JSON_FORMAT.md) · [Русский](JSON_FORMAT.ru.md)

A file may be: a **course** (`lessons[]`), a single **lesson** (object with `exercises`), or an **array of lessons**. Several files can be loaded at once ("Replace course" merges them into a new course, "Add to current" appends lessons; a lesson with the same `id` is replaced and its progress is kept).

## Course

| Field | Description |
|---|---|
| `title` | Course name. Also the key under which progress is stored |
| `description` | Optional |
| `srs` | Optional. **Without it there is no repetition.** See below |
| `settings` | Optional. See below |
| `lessons[]` | Lessons: `id`, `title`, `theory`, `srs`, `exercises[]` |

## Exercises

| `type` | Fields |
|---|---|
| `choice` | `question`, `options[]`, `answer` (option text or index from 0) |
| `input` | `question`, `answer` (string or array of accepted answers), `hint` |
| `order` | `question`, `answer` (correct sentence), `extra[]` (distractor words), `words[]` (custom word set) |
| `match` | `question`, `pairs` as `[["word","translation"], ...]`, at least 2 |

Every exercise may have `id` (unique; progress is stored by it, so do not change it when editing a course), `explanation` (shown after the answer) and `srs` (override).

Answer checking for `input` and `order` ignores case and the punctuation `. , ! ? ; : « » " “ ”`. Letters with diacritics (ö, ä) matter.

## Theory

`theory` of a lesson is shown before the first session. It is a string, an array of blocks, or `{ "title": "...", "blocks": [...] }`. A block is a string (paragraph) or an object:

| `type` | Fields |
|---|---|
| `text` | `text` |
| `list` | `items[]` |
| `table` | `rows` (array of arrays), `header: true` makes the first row a header |
| `example` | `text`, `translation` |
| `note` | `text` |

Inside text, `**bold**` and `\n` (line break) work.

## Spaced repetition (`srs`)

```json
"srs": { "intervals": [1, 3, 7, 14, 30], "failDays": 2 }
```

- `intervals`: days until the next review after the 1st, 2nd, 3rd... correct answer in a row (the last value repeats)
- `failDays`: days until review after a mistake (0 = next session). A mistake resets the chain
- `"srs": {}` or `true` enables repetition with defaults
- Priority: exercise `srs` → lesson `srs` → course `srs`. `false` disables repetition at that level

## Settings

| Field | Default | Meaning |
|---|---|---|
| `retryWrong` | `true` | Ask mistaken exercises again at the end of the session |
| `shuffle` | `true` | Shuffle exercises (`false` keeps file order) |
| `sessionSize` | `0` | Max exercises per session (0 = unlimited) |
| `unlock` | `"none"` | `"sequential"`: a lesson opens when all exercises of the previous one are answered |
| `dailyGoal` | `0` | Daily XP goal (0 = off) |
| `xp` | `10` | XP for a correct first try |
| `mastery` | `3` | Correct answers in a row to count an exercise as learned |

## Full example

See [`examples/sample-course.json`](../examples/sample-course.json).

## Prompt for an AI assistant

> Create a JSON course for the JSON-Lingvo platform: {title, description, srs (optional), settings (optional), lessons:[{id,title,theory,exercises}]}. Exercise types: choice (question, options, answer), input (question, answer: string or array), order (question, answer, extra), match (question, pairs). Every exercise needs a unique id. Topic: ... Level: ... Make 3 lessons of 8 exercises, each starting with short theory. Return JSON only.
