# 06 — HTTP Request / Webhook

**Итоговый файл:** `06-http-integration.png`

## Что должно быть видно

- блок **Webhook / HTTP Request** в редакторе;
- URL вида `https://webhook.site/...`;
- метод `POST`;
- тело запроса с `{{user_name}}` и `{{user_group}}`.

## Как сделать

1. Откройте https://webhook.site/ и скопируйте свой уникальный URL.
2. В TypeBot добавьте блок **Webhook** после успешной ветки.
3. Укажите метод `POST`, заголовок `Content-Type: application/json` и тело с переменными.
4. Запустите тест и убедитесь, что запрос появился на webhook.site.
5. Сделайте скриншот настроек блока или страницы webhook.site с полученным запросом.
6. Сохраните как `lab5/screenshots/06-http-integration.png`.

> Не публикуйте чужой webhook URL — используйте только свой сгенерированный адрес.
