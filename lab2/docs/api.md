# API Node-RED — лабораторная работа №2

Автор: **Кунда** (kunda), группа **УИР-241**.
Базовый URL: `http://localhost:1880` (порт Node-RED по умолчанию).
Все эндпоинты реализованы потоком [`flow-08-endpoints.json`](../flows/flow-08-endpoints.json).
Логика валидации находится в function-ноде перед `http response`.

| Метод | URL | Назначение | Формат ответа |
|-------|-----|------------|---------------|
| GET | `/api/text` | Простой текстовый ответ | `text/plain` |
| GET | `/api/info` | Информация о приложении | `application/json` |
| GET | `/api/items/:id` | Элемент по идентификатору | `application/json` или `text/plain` |

---

## 1. GET /api/text

Возвращает фиксированную строку, чтобы проверить, что HTTP-ветка работает.

**Параметры:** нет.

**Запрос:**

```bash
curl http://localhost:1880/api/text
```

**Ответ — 200 OK**

```
Content-Type: text/plain; charset=utf-8

простой текст от Node-RED
```

**Ошибки:** не предусмотрены.

---

## 2. GET /api/info

Возвращает сведения о приложении и авторе.

**Параметры:** нет.

**Запрос:**

```bash
curl http://localhost:1880/api/info
```

**Ответ — 200 OK**

```
Content-Type: application/json; charset=utf-8

{"app":"node-red-lab2","author":"kunda"}
```

| Поле | Тип | Описание |
|------|-----|----------|
| `app` | string | Имя приложения |
| `author` | string | Фамилия автора (латиницей) |

**Ошибки:** не предусмотрены.

---

## 3. GET /api/items/:id

Возвращает элемент с указанным идентификатором либо описание ошибки.

### Параметры

| Параметр | Где | Обязательный | Допустимые значения | Описание |
|----------|-----|--------------|---------------------|----------|
| `id` | path | да | целое число `1..100` | Идентификатор элемента |
| `format` | query | нет | `json` (по умолчанию), `text` | Формат ответа |

### Правила валидации (порядок проверок)

1. `id` не является целым числом или `id <= 0` → **400** `{"error":"id должен быть положительным числом"}`.
2. `format` присутствует и не равен `json`/`text` → **400** `{"error":"недопустимый format"}`.
3. `id > 100` → **404** `{"error":"item <id> не найден"}`.
4. Иначе → **200** с объектом элемента (или текстом, если `format=text`).

### 3.1. Успешный JSON-ответ

```bash
curl http://localhost:1880/api/items/5
```

**Ответ — 200 OK**

```
Content-Type: application/json; charset=utf-8

{"id":5,"name":"item-5","found":true}
```

| Поле | Тип | Описание |
|------|-----|----------|
| `id` | number | Идентификатор элемента |
| `name` | string | Имя элемента (`item-<id>`) |
| `found` | boolean | Признак успешного поиска |

### 3.2. Успешный текстовый ответ

```bash
curl "http://localhost:1880/api/items/42?format=text"
```

**Ответ — 200 OK**

```
Content-Type: text/plain; charset=utf-8

item 42
```

### 3.3. Ошибка: id не число или ≤ 0

```bash
curl -i http://localhost:1880/api/items/0
curl -i http://localhost:1880/api/items/abc
```

**Ответ — 400 Bad Request**

```
Content-Type: application/json; charset=utf-8

{"error":"id должен быть положительным числом"}
```

### 3.4. Ошибка: недопустимый format

```bash
curl -i "http://localhost:1880/api/items/5?format=xml"
```

**Ответ — 400 Bad Request**

```
Content-Type: application/json; charset=utf-8

{"error":"недопустимый format"}
```

### 3.5. Ошибка: элемент не найден

```bash
curl -i http://localhost:1880/api/items/999
```

**Ответ — 404 Not Found**

```
Content-Type: application/json; charset=utf-8

{"error":"item 999 не найден"}
```

---

## Сводная таблица статусов

| Запрос | Статус | Тело |
|--------|--------|------|
| `GET /api/text` | 200 | `простой текст от Node-RED` |
| `GET /api/info` | 200 | `{"app":"node-red-lab2","author":"kunda"}` |
| `GET /api/items/5` | 200 | `{"id":5,"name":"item-5","found":true}` |
| `GET /api/items/42?format=text` | 200 | `item 42` |
| `GET /api/items/0` | 400 | `{"error":"id должен быть положительным числом"}` |
| `GET /api/items/abc` | 400 | `{"error":"id должен быть положительным числом"}` |
| `GET /api/items/5?format=xml` | 400 | `{"error":"недопустимый format"}` |
| `GET /api/items/999` | 404 | `{"error":"item 999 не найден"}` |

## Замечания по реализации

- Статус ответа задаётся через `msg.statusCode`, заголовки — через `msg.headers`
  (объект с `Content-Type`), поэтому кодировка везде `utf-8` и кириллица не ломается.
- Порядок проверок важен: сначала проверяется `id`, затем `format`, затем наличие элемента.
  Поэтому `GET /api/items/0?format=xml` вернёт ошибку про `id`, а не про `format`.
- Эндпоинты доступны без авторизации, так как `adminAuth`/`httpNodeAuth` в `settings.js`
  не настроены (локальная учебная установка).
