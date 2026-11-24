// Полуавтоматический помощник для скриншотов TypeBot.
// ВАЖНО: скрипт не регистрируется и не вводит учётные данные.
// Он только открывает страницы в отдельном профиле браузера и ждёт ваших действий.
//
// Установка:
//   npm i playwright
//   npx playwright install chromium
//
// Запуск:
//   node lab5/screenshots/capture.mjs
//
// При желании переопределите адреса через переменные окружения, например:
//   TYPEBOT_URL=https://app.typebot.com/ node lab5/screenshots/capture.mjs

import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const OUTPUT_DIR = 'lab5/screenshots';
const PROFILE_DIR = './.playwright-typebot-profile';

mkdirSync(OUTPUT_DIR, { recursive: true });

const targets = [
  ['01-registration', process.env.TYPEBOT_URL || 'https://app.typebot.com/'],
  ['02-workspace', process.env.TYPEBOT_WORKSPACE_URL || 'https://app.typebot.com/'],
  ['03-template', process.env.TYPEBOT_TEMPLATE_URL || 'https://app.typebot.com/'],
  ['04-variables', process.env.TYPEBOT_EDITOR_URL || 'https://app.typebot.com/'],
  ['05-condition', process.env.TYPEBOT_EDITOR_URL || 'https://app.typebot.com/'],
  ['06-http-integration', process.env.TYPEBOT_EDITOR_URL || 'https://app.typebot.com/'],
  ['07-theme', process.env.TYPEBOT_EDITOR_URL || 'https://app.typebot.com/'],
  ['08-channel-telegram', process.env.TYPEBOT_PUBLISH_URL || 'https://app.typebot.com/'],
  ['09-result-dialog', process.env.TYPEBOT_PREVIEW_URL || 'https://app.typebot.com/'],
  ['10-admin-results', process.env.TYPEBOT_RESULTS_URL || 'https://app.typebot.com/'],
];

const context = await chromium.launchPersistentContext(PROFILE_DIR, {
  headless: false,
  viewport: { width: 1440, height: 900 },
});

const page = await context.newPage();

for (const [name, url] of targets) {
  if (!url) continue;

  await page.goto(url, { waitUntil: 'domcontentloaded' });
  console.log(`\n[${name}] Откройте нужный экран вручную, затем нажмите Enter для скриншота...`);

  await new Promise((resolve) => process.stdin.once('data', resolve));

  const path = `${OUTPUT_DIR}/${name}.png`;
  await page.screenshot({ path, fullPage: true });
  console.log(`Сохранено: ${path}`);
}

await context.close();
console.log('\nГотово. Проверьте файлы в lab5/screenshots/.');
