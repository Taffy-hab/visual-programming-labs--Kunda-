# Лабораторная работа №5 — TypeBot (Трек C)

**Студент:** Кунда  
**Группа:** СДП-УИР-241  
**Дисциплина:** Технологии визуального программирования  
**Репозиторий:** `visual-programming-labs--Kunda-`

## 1. Краткое описание выбранного трека

Я выбрал **Трек C — TypeBot**. Это облачная платформа для создания чат-ботов
с визуальным редактором flow. В качестве базы взял шаблон **Lead Generation**
и русифицировал его. Workspace и бот названы с обязательным указанием фамилии
и группы:

- workspace: `lab5-Kunda-SDP-UIR-241`;
- bot: `lab5-Kunda-SDP-UIR-241-bot`;
- основной flow: `flow-01-Kunda-SDP-UIR-241-typebot.json`.

Цель работы — освоить переменные, условия, HTTP-интеграцию, темы оформления
и публикацию бота на примере диалога на русском языке.

## 2. Ссылка на бота / flow

**Публичная ссылка на бота:**  
`https://typebot.io/ЗАМЕНИТЕ-НА-ВАШ-PUBLIC-ID`

> Плейсхолдер выше нужно заменить после публикации в TypeBot Cloud.  
> Также после ручного экспорта нужно заменить файлы из `lab5/exports/`
> на реальные — сейчас они помечены как `example: true`.

**Локальные экспорты:**

- [`../exports/flow-01-Kunda-SDP-UIR-241-typebot.json`](../exports/flow-01-Kunda-SDP-UIR-241-typebot.json) — основной русифицированный флоу;
- [`../exports/README.md`](../exports/README.md) — как заменить пример на реальный экспорт.

## 3. Использованные AI-промпты

1. **Русификация шаблона:**  
   «Переведи все тексты шаблона Lead Generation на русский язык: приветствие,
   поля ввода, placeholder’ы, кнопки, сообщения об ошибках и финальный текст.
   Сохрани технические имена переменных без перевода».

2. **Переменные и условие:**  
   «Добавь в TypeBot переменные `user_name` и `user_group`. Создай Condition,
   который проверяет, что `user_group` содержит `СДП-УИР-241`, и возвращает
   две ветки: успех и ошибку».

3. **Генерация примера экспорта:**  
   «Создай правдоподобный JSON-экспорт TypeBot с группами блоков, переменными,
   condition, webhook и темой. Обязательно пометь файл как пример, если нет
   доступа к реальному аккаунту».

4. **Инструкции по скриншотам:**  
   «Напиши пошаговые инструкции, что должно быть видно на скриншотах
   регистрации, workspace, переменных, условия, HTTP-интеграции, темы
   и результата диалога».

5. **Отчёт и выводы:**  
   «Сформируй отчёт по лабораторной работе №5 от первого лица, включи описание
   трека, список освоенных элементов, ссылки на артефакты и 4 предложения выводов».

## 4. Освоенные блоки, ноды и элементы

| Элемент | Где использован |
|---|---|
| `Start` | старт диалога |
| `Text` | приветствие, успешная/ошибочная ветки, финальное сообщение |
| `Input` | ввод имени и группы |
| `Variable` | `user_name`, `user_group`, `contact` |
| `Condition` | проверка `user_group contains СДП-УИР-241` |
| `Webhook / HTTP Request` | POST запрос на `webhook.site` с данными пользователя |
| `Theme` | цвета кнопок/фона, имя бота, логотип |
| `Publish` | публичная web-ссылка и встраивание на сайт |
| `Telegram channel` | подключение бота через BotFather (по желанию) |
| `Results / Analytics` | просмотр тестовых прохождений в админке |
| `Export / Import JSON` | сохранение флоу в `lab5/exports/` |

Добавленные по заданию новые шаги сверх шаблона:

1. поле ввода группы с переменной `user_group`;
2. блок `Condition` с ветками успеха и ошибки;
3. блок `Webhook` с передачей `user_name` и `user_group`.

## 5. Скриншоты workflow и диалогов

> `.md`-файлы — готовые инструкции. `.png`-файлы нужно добавить после
> выполнения ручных шагов в TypeBot. Ссылки уже прописаны.

| Скриншот | Инструкция | Файл |
|---|---|---|
| Регистрация | [`01-registration.md`](../screenshots/01-registration.md) | [`01-registration.png`](../screenshots/01-registration.png) |
| Workspace | [`02-workspace.md`](../screenshots/02-workspace.md) | [`02-workspace.png`](../screenshots/02-workspace.png) |
| Шаблон | [`03-template.md`](../screenshots/03-template.md) | [`03-template.png`](../screenshots/03-template.png) |
| Переменные | [`04-variables.md`](../screenshots/04-variables.md) | [`04-variables.png`](../screenshots/04-variables.png) |
| Условие | [`05-condition.md`](../screenshots/05-condition.md) | [`05-condition.png`](../screenshots/05-condition.png) |
| HTTP-интеграция | [`06-http-integration.md`](../screenshots/06-http-integration.md) | [`06-http-integration.png`](../screenshots/06-http-integration.png) |
| Тема | [`07-theme.md`](../screenshots/07-theme.md) | [`07-theme.png`](../screenshots/07-theme.png) |
| Канал/публикация | [`08-channel-telegram.md`](../screenshots/08-channel-telegram.md) | [`08-channel-telegram.png`](../screenshots/08-channel-telegram.png) |
| Результат диалога | [`09-result-dialog.md`](../screenshots/09-result-dialog.md) | [`09-result-dialog.png`](../screenshots/09-result-dialog.png) |
| Админка | [`10-admin-results.md`](../screenshots/10-admin-results.md) | [`10-admin-results.png`](../screenshots/10-admin-results.png) |

## 6. Выводы

В ходе работы я освоил визуальный редактор TypeBot и понял, как из готового
шаблона собрать полноценный русскоязычный диалог. Я научился связывать поля
ввода с переменными и использовать условие для разветвления сценария.
Отдельно для меня полезным оказался HTTP Request: через webhook.site я увидел,
как данные бота уходят во внешнюю систему. Смена темы показала, как брендинг
влияет на восприятие бота. В дальнейшем я могу расширить флоу новыми каналами
и подключить реальный сервис вместо тестового webhook.
