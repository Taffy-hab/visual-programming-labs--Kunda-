# Скриншоты лабораторной работы №5

В этой папке находятся:

- `NN-*.md` — инструкции, **что и как снять**;
- `NN-*.png` — реальные скриншоты, которые нужно добавить после ручных шагов в TypeBot.

## Список скриншотов

| Файл | Что подтверждает |
|---|---|
| `01-registration.png` | Регистрация/вход в TypeBot Cloud |
| `02-workspace.png` | Workspace `lab5-Kunda-SDP-UIR-241` |
| `03-template.png` | Выбранный шаблон и имя бота |
| `04-variables.png` | Переменные `user_name`, `user_group`, `contact` |
| `05-condition.png` | Условие `user_group contains СДП-УИР-241` |
| `06-http-integration.png` | Webhook/HTTP Request и ответ webhook.site |
| `07-theme.png` | Тема и брендинг бота |
| `08-channel-telegram.png` | Публикация или Telegram-канал |
| `09-result-dialog.png` | Готовый диалог с успешной веткой |
| `10-admin-results.png` | Раздел Results/Analytics в админке |

## Полуавтоматический захват (необязательно)

Для интерактивных страниц после логина проще снимать вручную. Если хотите
получить помощь от скрипта, можно использовать Playwright:

```bash
npm i playwright
npx playwright install chromium
node lab5/screenshots/capture.mjs
```

Скрипт **не регистрируется и не вводит пароли**. Он открывает persistent-profile,
где вы один раз входите вручную, и по нажатию Enter сохраняет скриншот текущего экрана.
