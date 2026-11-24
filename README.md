# visual-programming-labs — Кунда Иван

Лабораторные работы по дисциплине **«Технологии визуального программирования»**.
Студент: Кунда Иван, группа УИР-241.

| № | Тема | Материалы |
|---|------|-----------|
| 1 | Моделирование бизнес-процессов: BPMN, Activity, Sequence, Flowchart | [`lab1/report.md`](lab1/report.md) |
| 2 | Node-RED: потоки, HTTP, MQTT, dashboard, Telegram | [`lab2/docs/report.md`](lab2/docs/report.md) |
| 3 | Bubble: AI-генерация, UI, Data, CRUD-workflows | [`lab3/docs/report.md`](lab3/docs/report.md) |
| 4 | Автоматизация бизнес-процессов в n8n: базовые узлы и Redis | [`lab4/docs/report.md`](lab4/docs/report.md) |
| 5 | TypeBot: чат-бот, переменные, условия и интеграции | [`lab5/docs/report.md`](lab5/docs/report.md) |
| 6 | Kodular: «Приветствие» и ачивка «Камера» | [`lab6/docs/report.md`](lab6/docs/report.md) |

## Lab 3 — HabitFlow

**HabitFlow** — трекер привычек на Bubble: регистрация, структура header + body + footer,
строка «ТВП: Кунда», сущности `Habit` / `HabitLog` и полный CRUD через workflows.

- отчёт: [`lab3/docs/report.md`](lab3/docs/report.md)
- скриншоты: [`lab3/screenshots/`](lab3/screenshots/)
- промпт для AI-агента, исследование Build Guides, описание Data Type и workflows — в отчёте.

## Лабораторная работа №4

Цель — освоить построение сценариев автоматизации в n8n: триггеры, узлы
обработки данных, ветвление, HTTP-запросы, расписание, а также работу с
внешним хранилищем Redis (запись, чтение, удаление, проверка существования).

Что внутри `lab4`:

- [`lab4/docs/report.md`](lab4/docs/report.md) — отчёт по работе;
- [`lab4/docs/redis.md`](lab4/docs/redis.md) — описание сценариев с Redis;
- `lab4/flows/` — экспортированные workflow в формате JSON;
- `lab4/screenshots/` — скриншоты каждого этапа.

### Быстрый старт

Вариант 1 — Docker (как в методичке):

```bash
docker compose up -d
```

Вариант 2 — без Docker (использован при выполнении работы, см. отчёт).
Нужны **два отдельных окна** — в каждом работает свой сервер, окна закрывать нельзя.

Проще всего — двойным кликом по файлам:

- `scripts\start-redis.cmd`
- `scripts\start-n8n.cmd`

Либо из PowerShell (в Windows по умолчанию действует политика `Restricted`,
поэтому нужен флаг `-ExecutionPolicy Bypass`):

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\start-redis.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\start-n8n.ps1
```

n8n будет доступен по адресу <http://localhost:5678>, Redis — на `127.0.0.1:6379`.
Остановка — `Ctrl+C` в окне сервера или закрытие окна.

Параметры скриптов (порты, каталог данных) можно переопределить, например:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\start-n8n.ps1 -Port 5679
```

## Лабораторная работа №5 — TypeBot

Чат-бот на TypeBot для дисциплины «Технологии визуального программирования».
Работа выполняется студентом **Кунда** (группа **СДП-УИР-241**) в треке C (TypeBot).
Здесь будут русифицированные диалоги, переменные, условия, HTTP-интеграция,
экспортированные флоу, скриншоты и отчёт.

- отчёт: [`lab5/docs/report.md`](lab5/docs/report.md)
- экспорты: [`lab5/exports/`](lab5/exports/)
- скриншоты: [`lab5/screenshots/`](lab5/screenshots/)

## Лабораторная работа №6 — Kodular

Приложение «Приветствие» в Kodular: ввод имени, проверка пустого поля через
`if/else`, соединение строк через `text_join`, фамилия `Kunda` на экране.
Дополнительно реализована ачивка 13 — «Камера» (`Camera1.TakePicture` →
`AfterPicture` → `Image1.Picture`).

- отчёт: [`lab6/docs/report.md`](lab6/docs/report.md)
- экспорт: [`lab6/exports/lab6-kunda.aia`](lab6/exports/lab6-kunda.aia)
- скриншоты: [`lab6/screenshots/`](lab6/screenshots/)
