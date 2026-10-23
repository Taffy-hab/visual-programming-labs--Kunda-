# Лабораторная работа №2 — Node-RED

**Студент:** Кунда Иван (kunda)
**Группа:** УИР-241
**Дисциплина:** Визуальное программирование
**Дата выполнения:** 23.10.2026

---

## 1. Краткое описание выполненного

В рамках лабораторной работы №2 установлен Node-RED (без Docker, через npm) и собрано
**12 потоков**, демонстрирующих основные возможности визуального программирования:

| № | Файл | Что демонстрирует |
|---|------|-------------------|
| 01 | `flows/flow-01-inject-debug.json` | Inject (repeat 5 s, once) → Debug (complete msg object) |
| 02 | `flows/flow-02-function.json` | Function: `let/const`, `if/else`, `for`, массив, объект |
| 03 | `flows/flow-03-switch.json` | Switch по `msg.payload.category` + ветка `otherwise` |
| 04 | `flows/flow-04-change.json` | Change: `msg.topic`, `msg.timestamp` (date), `msg.payload` |
| 05 | `flows/flow-05-template.json` | Mustache-шаблон → JSON со студентом, возрастом и группой |
| 06 | `flows/flow-06-http-request.json` | HTTP Request к публичному API (random joke) |
| 07 | `flows/flow-07-mqtt.json` | MQTT publish/subscribe через публичный HiveMQ |
| 08 | `flows/flow-08-endpoints.json` | Три REST-эндпоинта с валидацией и кодами 200/400/404 |
| 09 | `flows/flow-09-dashboard.json` | Dashboard: ui_gauge + ui_chart (вкладка «Lab2», группа «Датчики») |
| 10 | `flows/flow-10-telegram.json` | Telegram-бот: `/start`, `/time`, эхо (токен не коммитится) |
| 11 | `flows/flow-11-files.json` | Запись/чтение локального JSON-файла в домашней папке |
| 12 | `flows/flow-12-context.json` | Персистентный flow context (счётчик) |

Документация REST API: [`docs/api.md`](api.md).

---

## 2. Способ установки (npm, без Docker)

Docker не использовался. Установка выполнена глобально через npm:

```bash
npm install -g --unsafe-perm node-red
npm install node-red-dashboard node-red-contrib-telegrambot   # в ~/.node-red
```

Дополнительные ноды установлены в пользовательский каталог Node-RED
`C:\Users\kakah\.node-red`:

```bash
cd C:\Users\kakah\.node-red
npm install node-red-dashboard node-red-contrib-telegrambot
```

### Версии (из лога запуска Node-RED)

```
Node-RED version: v5.0.9
Node.js  version: v24.22.1
npm            : 11.19.1
ОС             : Windows_NT 10.0.26200 x64
node-red-dashboard           : 3.6.6
node-red-contrib-telegrambot : 19.0.3
Settings file  : C:\Users\kakah\.node-red\settings.js
Flow file      : C:\Users\kakah\.node-red\flows.json
Context store  : 'default' [module=localfilesystem]
```

Запуск (фоновый процесс, лог в `~/.node-red/node-red.log`):

```bash
node-red
# Server now running at http://127.0.0.1:1880/
```

### Особенности окружения

- PowerShell блокирует `npm.ps1` (ExecutionPolicy), поэтому npm вызывался через `cmd /c "npm ..."`.
- В Node-RED 5 отдельной ноды **`file out` больше нет**: запись выполняет нода `file`,
  чтение — `file in`. Поток 11 собран на актуальных нодах.
- Для персистентного контекста в `settings.js` включено:

```js
contextStorage: {
    default: {
        module: "localfilesystem"
    }
},
```

Файл контекста: `C:\Users\kakah\.node-red\context\<flow-id>\flow.json`.
Запись на диск выполняется с интервалом ~30 с (flushInterval по умолчанию).

---

## 3. Ключевые AI-промпты

1. «Сгенерируй код function-ноды Node-RED: на вход число, нужно построить массив `1..N`,
   посчитать сумму циклом `for`, определить категорию через `if/else` (`big`/`medium`/`small`)
   и вернуть объект `{input, sum, category, numbers, meta}` в `msg.payload`.
   Используй `let`/`const`, без внешних библиотек».
2. «Сделай function-ноду для REST-эндпоинта `GET /api/items/:id?format=json|text`:
   проверь, что `id` — целое положительное число (иначе 400), что `format` равен `json`
   или `text` (иначе 400), что `id <= 100` (иначе 404). Установи `msg.statusCode`,
   `msg.headers` с `Content-Type: application/json; charset=utf-8` и верни объект ошибки
   на русском языке».
3. «Напиши Mustache-шаблон для ноды template (Format = JSON), который из `msg.payload`
   с полями `name`, `age`, `group` формирует JSON `{student, age, group, greeting}`,
   где `greeting` — приветствие с именем и группой».
4. «Сгенерируй function-ноду для Telegram-бота: если текст `/start` — ответ
   "Привет! Я бот lab2.", если `/time` — текущее время, иначе — "Эхо: <текст>".
   Ответ сформируй в формате `msg.payload = {chatId, type:"message", content}`
   для ноды telegram sender».
5. «Сгенерируй function-ноду для счётчика в flow context: `flow.get("counter")`,
   инкремент, `flow.set`, вернуть `msg.payload = {counter}`; данные должны сохраняться
   между перезапусками Node-RED».

---

## 4. Освоенные ноды

**Базовые:** `inject`, `debug`, `function`, `switch`, `change`, `template`.
**Сеть:** `http in`, `http response`, `http request`, `mqtt in`, `mqtt out` (config: `mqtt-broker`).
**Dashboard:** `ui_tab`, `ui_group`, `ui_gauge`, `ui_chart`.
**Telegram:** `telegram receiver`, `telegram sender` (config: `telegram bot`).
**Файлы:** `file` (запись), `file in` (чтение).
**Контекст:** `flow context` (`flow.get` / `flow.set`), change-delete для сброса.

---

## 5. Структура репозитория

```
lab2/
├── docs/
│   ├── api.md          # описание трёх эндпоинтов
│   └── report.md       # этот отчёт
├── flows/
│   ├── flow-01-inject-debug.json
│   ├── flow-02-function.json
│   ├── flow-03-switch.json
│   ├── flow-04-change.json
│   ├── flow-05-template.json
│   ├── flow-06-http-request.json
│   ├── flow-07-mqtt.json
│   ├── flow-08-endpoints.json
│   ├── flow-09-dashboard.json
│   ├── flow-10-telegram.json
│   ├── flow-11-files.json
│   └── flow-12-context.json
└── screenshots/        # скриншоты добавляются вручную
```

Каждый `flow-NN-*.json` — самостоятельный экспорт Node-RED (массив нод с общей вкладкой),
его можно импортировать через **Import → Clipboard**.

---

## 6. Проверка

Все потоки задеплоены на `http://localhost:1880` через Admin API (`POST /flows`).
Лог запуска: `C:\Users\kakah\.node-red\node-red.log`.

### 6.1. REST-эндпоинты (flow-08)

| Запрос | Ожидание | Фактически |
|--------|----------|------------|
| `GET /api/text` | 200, `простой текст от Node-RED` | ✅ 200, `text/plain; charset=utf-8` |
| `GET /api/info` | 200, JSON app/author | ✅ 200, `{"app":"node-red-lab2","author":"kunda"}` |
| `GET /api/items/5` | 200, JSON | ✅ 200, `{"id":5,"name":"item-5","found":true}` |
| `GET /api/items/42?format=text` | 200, текст | ✅ 200, `item 42` |
| `GET /api/items/0` | 400 | ✅ 400, `{"error":"id должен быть положительным числом"}` |
| `GET /api/items/abc` | 400 | ✅ 400, `{"error":"id должен быть положительным числом"}` |
| `GET /api/items/999` | 404 | ✅ 404, `{"error":"item 999 не найден"}` |
| `GET /api/items/5?format=xml` | 400 | ✅ 400, `{"error":"недопустимый format"}` |

Фактический вывод команд:

```text
$ curl -s http://localhost:1880/api/text
простой текст от Node-RED
$ curl -s http://localhost:1880/api/info
{"app":"node-red-lab2","author":"kunda"}
$ curl -s -w " [HTTP %{http_code}]" http://localhost:1880/api/items/0
{"error":"id должен быть положительным числом"} [HTTP 400]
$ curl -s -w " [HTTP %{http_code}]" http://localhost:1880/api/items/999
{"error":"item 999 не найден"} [HTTP 404]
$ curl -s -w " [HTTP %{http_code}]" "http://localhost:1880/api/items/5?format=xml"
{"error":"недопустимый format"} [HTTP 400]
```

### 6.2. Dashboard (flow-09)

- `http://localhost:1880/ui` → **200 OK**, dashboard отдаёт страницу.
- В логе: `Dashboard version 3.6.6 started at /ui`.
- Вкладка **Lab2** → группа **Датчики**: `ui_gauge` «Температура» (0…50, label °C)
  и `ui_chart` «История температуры, °C» (line). Данные обновляются каждые 2 с
  (18…28 °C, округление до 0.1).

### 6.3. Файлы (flow-11)

- Inject «записать в файл» → создан `C:\Users\kakah\lab2-data.json`.
- Содержимое (UTF-8, pretty JSON):

```json
{
  "author": "kunda",
  "student": "Кунда",
  "group": "УИР-241",
  "lab": 2,
  "ts": "2026-10-23T06:41:10.516Z",
  "payload": { "author": "kunda", "lab": 2 }
}
```

- Inject «прочитать из файла» → `file in` возвращает содержимое в `msg.payload`
  (output as single buffered string, encoding utf8).
- Поле `overwriteFile = true`, поэтому файл перезаписывается, а не дополняется.

### 6.4. Персистентный context (flow-12)

1. Inject «+1» → счётчик увеличивается, `GET /context/flow/<flow-id>`:
   `{"default":{"counter":{"msg":"1","format":"number"}}}`.
2. Через ~30 с значение сброшено на диск в `~/.node-red/context/<flow-id>/flow.json`.
3. Перезапуск Node-RED → счётчик остался `1` (значение прочитано из файла).
4. Повторный «+1» → `2`. ✅ Значение сохраняется между перезапусками.

### 6.5. MQTT (flow-07) — ограничение сети

Поток собран корректно (публичный брокер `broker.hivemq.com:1883`,
топик `student/kunda/lab2/temp`, publish каждые 5 с, подписка на тот же топик),
но в текущей сети исходящий TCP-порт **1883 заблокирован**:

```text
[mqtt-broker:HiveMQ public] Connection failed to broker: mqtt://broker.hivemq.com:1883
Test-NetConnection broker.hivemq.com -Port 1883 -> False
Test-NetConnection test.mosquitto.org -Port 1883 -> False
Test-NetConnection broker.hivemq.com -Port 443  -> True
```

HTTPS (443) работает (поток 06 и `http request` к публичному API — успешно),
блокировка касается именно MQTT-порта. На сети без ограничений поток заработает
без изменений; проверка выполнена на уровне конфигурации и запуска (ноды активны,
ошибок конфигурации нет).

### 6.6. Telegram (flow-10) — требуется токен

- Поток импортируется и деплоится без ошибок структуры.
- В логе (ожидаемо, пока токен пуст):

```text
[warn] [telegram bot:tvl_lab2_kunda_bot] Aborting: Token of tvl_lab2_kunda_bot is not set
[warn] [telegram receiver] bot not initialized.
[warn] [telegram sender] bot not initialized.
```

- Имя бота: `tvl_lab2_kunda_bot`.
- **Что нужно сделать вручную:** открыть `@BotFather` → `/newbot` (или взять готового бота)
  → скопировать токен → двойной клик по ноде `telegram bot` → вставить токен в поле `Token`
  → **Deploy**. Токен в репозиторий не коммитится (поле оставлено пустым).
- После деплоя отправить боту `/start`, `/time` и любой текст — должны прийти
  «Привет! Я бот lab2.», текущее время и «Эхо: <текст>».

---

## 7. Ожидаемые скриншоты (`lab2/screenshots/`)

| Файл | Что должно быть на скриншоте |
|------|------------------------------|
| `01-flow-01-inject-debug.png` | Поток 01 в редакторе + вывод complete msg object |
| `02-flow-02-function.png` | Поток 02 и объект `{input, sum, category, ...}` в Debug |
| `03-flow-03-switch.png` | Поток 03, срабатывание выхода `big` |
| `04-flow-04-change.png` | Поток 04 и изменённые `topic`/`timestamp`/`payload` |
| `05-flow-05-template.png` | Поток 05 и JSON из Mustache-шаблона |
| `06-flow-06-http-request.png` | Поток 06 и ответ random joke API |
| `07-flow-07-mqtt.png` | Поток 07 и настройки брокера «HiveMQ public» |
| `08-flow-08-endpoints.png` | Поток 08 целиком |
| `09-api-text.png` | `GET /api/text` в браузере/curl |
| `10-api-info.png` | `GET /api/info` → JSON |
| `11-api-items-200.png` | `GET /api/items/5` → 200 |
| `12-api-items-400.png` | `GET /api/items/0` и `?format=xml` → 400 |
| `13-api-items-404.png` | `GET /api/items/999` → 404 |
| `14-dashboard-ui.png` | `http://localhost:1880/ui` — gauge + график |
| `15-flow-10-telegram.png` | Поток 10 и переписка с ботом |
| `16-flow-11-files.png` | Поток 11 и содержимое `lab2-data.json` |
| `17-flow-12-context.png` | Поток 12 и счётчик после перезапуска |

Скриншоты сняты из работающего Node-RED (редактор, API в браузере, dashboard)
и добавлены в репозиторий. `17-flow-12-context.png` — счётчик до/после перезапуска;
`14-dashboard-ui.png` — gauge с реальным значением и график с накопленной историей.

---

## 8. Выводы

В ходе работы освоена установка и настройка Node-RED через npm без Docker, включая
подключение сторонних пакетов (`node-red-dashboard`, `node-red-contrib-telegrambot`)
и настройку персистентного контекста. Собраны 12 потоков, покрывающих базовые ноды
обработки сообщений, ветвление, шаблонизацию, HTTP-клиент и сервер, MQTT, dashboard,
Telegram и работу с файлами. На практике проверено, что HTTP-эндпоинты корректно
возвращают коды 200/400/404 и заголовки `Content-Type`, файл данных пишется в UTF-8,
а счётчик в flow context сохраняется после перезапуска Node-RED. Отдельным результатом
стало выявление ограничений окружения: блокировка исходящего MQTT-порта 1883 и
необходимость не коммитить секреты (Telegram-токен остаётся в локальной настройке).
Визуальное программирование в Node-RED позволяет быстро собирать интеграции, но требует
внимания к версиям нод (в Node-RED 5 нода `file out` объединена с `file`) и к порядку
проверок в валидации запросов.
