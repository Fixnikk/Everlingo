# Publishing guide / Как выложить на GitHub

[English](#english) · [Русский](#русский)

## English

### 1. Create the repository
1. github.com → **New repository**. Name: `json-lingvo` (short, lowercase, no spaces: it becomes part of the URL).
2. **Public**. Do not tick "Add README/.gitignore/license": they already exist in this folder.
3. Before the first commit replace `YOUR NAME` in `LICENSE` and `YOUR_USERNAME` anywhere you add links.

### 2. Upload the files
Web: open the empty repo → "uploading an existing file" → drag the **contents** of this folder (not the folder itself; keep `.github` and `.gitignore`: hidden files may need "show hidden files").

Git:
```bash
git init -b main
git add .
git commit -m "Initial release"
git remote add origin https://github.com/YOUR_USERNAME/json-lingvo.git
git push -u origin main
```

### 3. Make the page look good (and why)
| What | Why |
|---|---|
| **About** (gear icon): one-line description and Topics, for example `spaced-repetition`, `duolingo-alternative`, `language-learning`, `json`, `flashcards`, `offline`, `electron` | People find repositories by search and topics |
| Short summary and a screenshot or GIF at the top of the README | Visitors decide in 5 seconds. Put the file in `docs/img/` and link it where the comment in README says |
| Language links `English · Русский` at the top of each README | GitHub shows only `README.md`, so the switch must be visible. Add more as `README.xx.md` |
| Badges (license, "made with Claude") | Quick trust signals |
| `LICENSE` | Without a license nobody may legally reuse your code |
| `CONTRIBUTING.md`, Issues enabled | Tells people how to help |
| **Social preview** (Settings → General, 1280×640 PNG) | The picture shown when the link is shared |
| Example file in `examples/` | The first thing a new user wants is something to load |

### 4. Online demo with GitHub Pages
Settings → Pages → Source: *Deploy from a branch* → branch `main`, folder `/ (root)` → Save. After a minute the app is available at `https://YOUR_USERNAME.github.io/json-lingvo/`. Add this link to the About block and to the README. Progress is stored per site address, so the demo and a local file keep separate progress.

### 5. The Windows exe goes to Releases, not to the repo
The exe is about 109 MB, and GitHub rejects files above 100 MB in a repository. Releases allow large files and keep the history clean. That is why `*.exe` is in `.gitignore`.

Option A (manual): Releases → **Draft a new release** → tag `v1.0.0` → drag `JSON-Lingvo-portable.exe` into the assets → Publish.
Option B (automatic): `git tag v1.0.0 && git push origin v1.0.0`. The workflow `.github/workflows/build-windows.yml` builds the exe and attaches it. It was written but not run yet: check the Actions tab after the first tag.

### 6. Keep it healthy
- Use version tags (`v1.0.1`, `v1.1.0`) and describe changes in each release.
- The `Tests` workflow runs on every push and shows a green or red mark.
- Mention in the README that the project was made with AI assistance (already included) and keep `docs/MADE_WITH_CLAUDE.md`.

## Русский

### 1. Создайте репозиторий
1. github.com → **New repository**. Название: `json-lingvo` (короткое, строчными, без пробелов: оно станет частью адреса).
2. **Public**. Галочки «Add README / .gitignore / license» не ставьте: эти файлы уже есть в папке.
3. До первого коммита замените `YOUR NAME` в `LICENSE` и `YOUR_USERNAME` там, где добавляете ссылки.

### 2. Загрузите файлы
Через сайт: откройте пустой репозиторий → «uploading an existing file» → перетащите **содержимое** папки (не саму папку; скрытые `.github` и `.gitignore` тоже нужны, включите показ скрытых файлов).

Через git:
```bash
git init -b main
git add .
git commit -m "Initial release"
git remote add origin https://github.com/YOUR_USERNAME/json-lingvo.git
git push -u origin main
```

### 3. Оформите страницу (и зачем)
| Что | Зачем |
|---|---|
| **About** (значок шестерёнки): описание в одну строку и Topics, например `spaced-repetition`, `duolingo-alternative`, `language-learning`, `json`, `flashcards`, `offline`, `electron` | Репозитории находят по поиску и темам |
| Краткое описание и скриншот или GIF в начале README | Посетитель решает за 5 секунд. Положите файл в `docs/img/` и подставьте ссылку там, где стоит комментарий в README |
| Переключатель языков `English · Русский` вверху каждого README | GitHub показывает только `README.md`, поэтому переключатель должен быть виден. Новые языки добавляйте как `README.xx.md` |
| Бейджи (лицензия, «made with Claude») | Быстро вызывают доверие |
| `LICENSE` | Без лицензии никто не имеет права законно использовать ваш код |
| `CONTRIBUTING.md`, включённые Issues | Объясняют, как помочь проекту |
| **Social preview** (Settings → General, PNG 1280×640) | Картинка, которая показывается при отправке ссылки |
| Пример файла в `examples/` | Первое, что нужно новому пользователю, — что-то загрузить |

### 4. Онлайн-демо через GitHub Pages
Settings → Pages → Source: *Deploy from a branch* → ветка `main`, папка `/ (root)` → Save. Через минуту приложение откроется по адресу `https://YOUR_USERNAME.github.io/json-lingvo/`. Добавьте эту ссылку в блок About и в README. Прогресс хранится отдельно для каждого адреса сайта, поэтому у демо и у локального файла он будет разным.

### 5. Windows-exe кладут в Releases, а не в репозиторий
Exe весит около 109 МБ, а GitHub не принимает в репозиторий файлы больше 100 МБ. Releases допускают большие файлы и не засоряют историю. Поэтому `*.exe` добавлен в `.gitignore`.

Вариант А (вручную): Releases → **Draft a new release** → тег `v1.0.0` → перетащите `JSON-Lingvo-portable.exe` в Assets → Publish.
Вариант Б (автоматически): `git tag v1.0.0 && git push origin v1.0.0`. Workflow `.github/workflows/build-windows.yml` соберёт exe и приложит его к релизу. Он написан, но ещё не запускался: после первого тега загляните во вкладку Actions.

### 6. Поддерживайте порядок
- Используйте теги версий (`v1.0.1`, `v1.1.0`) и описывайте изменения в каждом релизе.
- Workflow `Tests` запускается при каждом push и показывает зелёную или красную отметку.
- Сообщайте, что проект сделан с помощью ИИ (это уже есть в README), и храните `docs/MADE_WITH_CLAUDE.md`.
