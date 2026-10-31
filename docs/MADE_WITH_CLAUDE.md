# Made with Claude / Сделано с помощью Claude

[English](#english) · [Русский](#русский)

## English

**Cheat sheet**

- This project was designed and written in a conversation with [Claude](https://claude.ai) (Anthropic). A human gave the requirements and reviewed the results.
- **What was verified:** an automated end-to-end test (`npm test`, 35 checks in jsdom) covers loading, all four exercise types, repetition scheduling, settings, unlock and reset.
- **What was NOT verified:** real browsers and phones, accessibility, the Windows `.exe` on a real Windows machine, GitHub Actions workflows (written but not run), security audit.
- The `.exe` is **not code-signed**, so Windows SmartScreen and some antivirus tools may warn about it.
- Progress is stored in the browser (`localStorage`). Clearing site data deletes it. Use the built-in backup.
- Before using in production or with real learners, review the code. AI-written code can contain mistakes.
- Choose and check the license yourself: the repository uses MIT as a template. Replace `YOUR NAME` in `LICENSE`. Read the current [Anthropic terms](https://www.anthropic.com/legal) about outputs if this matters to you.
- Do not commit secrets or personal data to the repository.
- Good practice: keep this note, and mention AI assistance when you share the project.

## Русский

**Памятка**

- Проект придуман и написан в диалоге с [Claude](https://claude.ai) (Anthropic). Человек ставил задачи и проверял результат.
- **Что проверено:** автоматический сквозной тест (`npm test`, 35 проверок в jsdom): загрузка, все 4 типа заданий, расписание повторов, настройки, открытие уроков и сброс.
- **Что НЕ проверено:** реальные браузеры и телефоны, доступность, `.exe` на настоящем Windows, workflow GitHub Actions (написаны, но не запускались), аудит безопасности.
- `.exe` **не подписан** цифровой подписью, поэтому Windows SmartScreen и некоторые антивирусы могут предупреждать.
- Прогресс хранится в браузере (`localStorage`). Очистка данных сайта его удалит. Используйте встроенную резервную копию.
- Перед использованием в серьёзных целях или с реальными учениками просмотрите код. В коде, написанном ИИ, бывают ошибки.
- Лицензию выберите и проверьте сами: в репозитории стоит MIT как шаблон. Замените `YOUR NAME` в `LICENSE`. Если это важно, прочитайте актуальные [условия Anthropic](https://www.anthropic.com/legal) про результаты работы модели.
- Не добавляйте в репозиторий пароли, ключи и личные данные.
- Хорошая практика: оставьте эту памятку и упоминайте помощь ИИ, когда делитесь проектом.
