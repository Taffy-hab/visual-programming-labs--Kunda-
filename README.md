# visual-programming-labs — Кунда Иван

Лабораторные работы по дисциплине **«Технологии визуального программирования»**.
Студент: Кунда Иван, группа УИР-241.

| № | Тема | Материалы |
|---|------|-----------|
| 1 | Моделирование бизнес-процессов: BPMN, Activity, Sequence, Flowchart | [`lab1/report.md`](lab1/report.md) |
| 2 | Node-RED: потоки, HTTP, MQTT, dashboard, Telegram | [`lab2/docs/report.md`](lab2/docs/report.md) |
| 3 | Bubble: AI-генерация, UI, Data, CRUD-workflows | [`lab3/docs/report.md`](lab3/docs/report.md) |
| 4 | Автоматизация бизнес-процессов в n8n: базовые узлы и Redis | [`lab4/docs/report.md`](lab4/docs/report.md) |

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

Вариант 2 — без Docker (использован при выполнении работы, см. отчёт):

```powershell
./scripts/start-n8n.ps1
./scripts/start-redis.ps1
```

n8n будет доступен по адресу <http://localhost:5678>.
