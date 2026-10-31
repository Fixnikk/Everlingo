# JSON-Lingvo

[English](README.md) · [Русский](README.ru.md)

![License: MIT](https://img.shields.io/badge/license-MIT-green)
![Made with Claude](https://img.shields.io/badge/made%20with-Claude-d97757)
![No build step](https://img.shields.io/badge/build-none-blue)

A Duolingo-style learning platform that runs from **one HTML file**. You write lessons in plain JSON, load them, and practice. Spaced repetition is optional and fully controlled from the JSON itself.

> The app interface is currently in Russian. **Course content can be in any language.** Interface translation is on the roadmap.

<!-- Add a screenshot or GIF: docs/img/demo.gif -->

## Why

Existing apps lock you into their own courses. JSON-Lingvo flips this: any teacher, student or AI assistant can produce a lesson file, and the app turns it into exercises, theory pages and a repetition schedule. No server, no account, no tracking: progress stays in your browser.

## Features

- 4 exercise types: multiple choice, typed answer, sentence builder, matching pairs
- Theory pages shown before a lesson (text, lists, tables, examples, notes)
- **Optional** spaced repetition: no `srs` block means no repetition. Rules can be set per course, lesson or exercise
- Course settings in JSON: retry mistakes, shuffle, session size, sequential unlock, daily XP goal, XP per answer, mastery threshold
- Load several JSON files at once; add lessons to an existing course
- Lessons are marked as completed; streak, XP and daily goal
- Built-in manual with a "copy all" button; progress backup and reset
- Works offline; a portable Windows `.exe` is available in Releases

## Quick start

| Way | How |
|---|---|
| In a browser | Open `index.html` (double click). Nothing to install |
| Online demo | Enable GitHub Pages (see [docs/PUBLISHING.md](docs/PUBLISHING.md)) |
| Windows | Download `JSON-Lingvo-portable.exe` from [Releases](../../releases) |

Then press **Load JSON** and choose your file, for example [`examples/sample-course.json`](examples/sample-course.json).

## Minimal lesson file

```json
{
  "title": "My course",
  "lessons": [{
    "id": "l1", "title": "Lesson 1",
    "exercises": [
      { "type": "choice", "question": "Hello in Swedish?", "options": ["Hej", "Tack"], "answer": "Hej" }
    ]
  }]
}
```

Add `"srs": {}` at the top level to enable spaced repetition. Full format: **[docs/JSON_FORMAT.md](docs/JSON_FORMAT.md)**. The same manual is built into the app (button "Инструкция").

## How spaced repetition works

A correct first try schedules the exercise again after 1, 3, 7, 14 and 30 days (configurable). A mistake resets the chain and schedules a repeat after `failDays` (default 2). Without an `srs` block nothing is scheduled and the "Repeat" button is hidden.

## Develop

```bash
npm install
npm test            # end-to-end test in jsdom (35 checks)
```

Build the Windows portable exe (on Windows or in CI):

```bash
cd electron
npm install
npm run dist        # -> electron/dist/JSON-Lingvo-portable.exe
```

Pushing a tag like `v1.0.0` builds the exe in GitHub Actions and attaches it to the release.

## Project layout

```
index.html              the whole app (HTML + CSS + JS, no dependencies)
examples/               sample course
docs/                   JSON format, publishing guide, notes about AI
tests/e2e.test.js       end-to-end test
electron/               wrapper that produces the portable .exe
.github/workflows/      CI: tests and exe build
```

## Roadmap

- Interface translations (i18n)
- Images and audio in exercises
- "Review only" mode for selected lessons
- Optional sync between devices

## Made with Claude

This project was written with [Claude](https://claude.ai) (Anthropic). It was tested automatically, but not audited by a human expert. See [docs/MADE_WITH_CLAUDE.md](docs/MADE_WITH_CLAUDE.md).

## License

[MIT](LICENSE)
