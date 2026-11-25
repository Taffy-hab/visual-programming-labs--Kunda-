# Как быстро показать лабораторную №5

## Вариант 1 — через GitHub (самый быстрый)

Ничего локально поднимать не нужно, открываются прямо в браузере:

- [Отчёт](https://github.com/Taffy-hab/visual-programming-labs--Kunda-/blob/main/lab5/docs/report.md)
- [Все 12 скриншотов](https://github.com/Taffy-hab/visual-programming-labs--Kunda-/tree/main/lab5/screenshots)
- [Экспорт flow](https://github.com/Taffy-hab/visual-programming-labs--Kunda-/blob/main/lab5/exports/flow-01-Kunda-typebot.json)
- [Описание окружения](https://github.com/Taffy-hab/visual-programming-labs--Kunda-/blob/main/lab5/docs/ENVIRONMENT.md)
- [Официальный docker-compose](https://github.com/Taffy-hab/visual-programming-labs--Kunda-/blob/main/lab5/selfhosted/docker-compose.yml)
- [Скрипты воспроизведения](https://github.com/Taffy-hab/visual-programming-labs--Kunda-/tree/main/lab5/scripts)

Если нужно показать конкретную картинку, открывай прямую ссылку, например:
`https://github.com/Taffy-hab/visual-programming-labs--Kunda-/blob/main/lab5/screenshots/06-condition-true.png`

## Вариант 2 — живой бот локально

Сервисы должны быть запущены по инструкции в [ENVIRONMENT.md](docs/ENVIRONMENT.md).
После этого открой:

- бот: <http://127.0.0.1:8081/kunda-lab5-sdp-uir-241>
- редактор: <http://localhost:8080/typebots/cmwv249ca0003vgf7b74kla2e/edit>

Служебные процессы, если их нужно перезапустить:

```bash
node lab5/scripts/smtp-catcher.mjs     # OTP-почта, порт 1025
node lab5/scripts/webhook-server.mjs   # HTTP Request, порт 7788
```

Переснять скриншоты, если потребуется:

```bash
node lab5/scripts/run-dialog.mjs
node lab5/scripts/capture-builder.mjs
```
