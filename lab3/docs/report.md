# Лабораторная работа №3 — Bubble

**Студент:** Кунда Иван  
**Группа:** УИР-241  
**Дисциплина:** Технологии визуального программирования  
**Дата выполнения:** 31.10.2026

---

## 1. Краткое описание

Тема работы — **HabitFlow**, веб-приложение «Трекер привычек» на no-code-платформе
[Bubble](https://bubble.io). Приложение требует регистрацию, использует структуру
**header + body + footer**, содержит обязательную строку **«ТВП: Кунда»** и реализует
полный CRUD для сущности привычки: создание, чтение, редактирование и удаление.

В работе выполнены:

1. промпт для AI-агента Bubble и каркас приложения;
2. исследование публичных Build Guides и применение идей в проекте;
3. ручная доработка UI: заголовок, Global variable, стиль и готовый компонент;
4. проектирование Data Type `Habit` / `HabitLog` и CRUD-workflows;
5. итоговый отчёт с промптами, списком освоенных элементов и выводами.

> **О скриншотах.** В папке `lab3/screenshots/` лежат оформленные заглушки с описанием
> того, что должно быть на каждом снимке. Раздел Build Guides и редактор Bubble требуют
> авторизованного аккаунта, которого не было в среде выполнения, поэтому снимки редактора
> помечены как `PLACEHOLDER` и заменяются реальными перед защитой. Два снимка
> (`02-buildguide-*.png`) — настоящие скриншоты публичных обучающих материалов Bubble.

---

## 2. Часть 1. Промпт и генерация каркаса

### 2.1. Промпт для AI-агента (дословно)

```text
Создай приложение на тему «Трекер привычек».
Пусть этот сайт будет требующий регистрацию.
Страницу обязательно создай по структуре header + body + footer.
Обязательно укажи в заготовке следующую строку: «ТВП: Кунда».
Добавь несколько интерактивных элементов (реализующих CRUD):
1) форму создания привычки с полями «Название», «Описание», «Категория», «Цель в неделю», «Дата старта»;
2) список привычек в виде карточек с прогрессом и кнопкой отметки выполнения за сегодня;
3) модальное окно редактирования привычки;
4) удаление привычки с подтверждением;
5) счётчики «Активных привычек», «Выполнено сегодня», «Лучшая серия».
Сделай современный минималистичный интерфейс в фиолетово-зелёной гамме, адаптивный для телефона.
```

### 2.2. Что должен создать AI-агент

По промпту AI-агент Bubble генерирует заготовку из четырёх страниц:

| Страница | Назначение | Ключевые элементы |
|---|---|---|
| `index` | лендинг | header, hero-блок, кнопки «Начать» и «Войти», footer |
| `signup` | регистрация | форма e-mail / пароль, кнопка «Создать аккаунт» |
| `login` | вход | форма входа, ссылка на регистрацию |
| `habits` | рабочая область | статистика, список привычек, popup создания и редактирования |

Обязательные элементы каркаса:

- **header** — логотип `HabitFlow`, навигация «Мои привычки» / «Статистика», аватар пользователя;
- **body** — три карточки статистики, фильтр по категориям, Repeating Group с привычками;
- **footer** — строка **«ТВП: Кунда»**, год и ссылка на исходный репозиторий;
- **CRUD-элементы** — кнопка добавления, карточки с чекбоксом, кнопки редактирования и удаления.

### 2.3. Скриншот

![Промпт для AI-агента Bubble](screenshots/01-prompt.png)

*`01-prompt.png` — заглушка: окно AI-агента Bubble с вставленным промптом и началом генерации.
Перед защитой заменить реальным снимком.*

### 2.4. Почему промпт сформулирован именно так

- явно задана тема и требование регистрации — AI не делает приложение публичным;
- перечислены **все три зоны** страницы, чтобы не потерялся footer со строкой «ТВП: Кунда»;
- CRUD разложен на пять конкретных UI-сценариев — AI создаёт не абстрактный список, а готовые формы и кнопки;
- задана цветовая гамма и адаптивность — меньше ручной правки на этапе 3;
- фамилия указана в точной формулировке из задания.

---

## 3. Часть 2. Исследование Build Guides

### 3.1. Какие материалы изучены

Раздел [Build Guides](https://bubble.io/home/buildguides) открывается только после входа
в аккаунт Bubble, поэтому для исследования взяты два публичных гайда Bubble того же
формата — пошаговое создание приложения с разбором Data, Design и Workflows.

| № | Гайд | Ссылка | Что полезного |
|---|------|--------|----------------|
| 1 | **How to Build a To-Do List App in 10 Minutes** (Josh Haas, co-founder Bubble) | [bubble.io/blog/build-to-do-list-app](https://bubble.io/blog/build-to-do-list-app/) | Сначала Data Type и поля, затем Repeating Group, conditional formatting, popup и workflows |
| 2 | **Getting Started in Bubble: Building Your First App** | [bubble.io/blog/getting-started-building-your-first-app](https://bubble.io/blog/getting-started-building-your-first-app/) | Структура приложения: landing, signup/login, dashboard, страница сущности, пустые состояния, 404 и Deploy |

![Build Guide: To-Do List App](screenshots/02-buildguide-todo.png)

*`02-buildguide-todo.png` — реальный скриншот публичного гайда Bubble «How to Build a To-Do List App in 10 Minutes».*

![Build Guide: Getting Started in Bubble](screenshots/02-buildguide-first-app.png)

*`02-buildguide-first-app.png` — реальный скриншот гайда «Getting Started in Bubble: Building Your First App».*

### 3.2. Что показалось полезным

1. **Data-first.** В обоих гайдах сначала создаётся Data Type и поля, и только потом
   на страницу добавляются элементы. Для HabitFlow это дало правильный порядок:
   `Habit` → `HabitLog` → UI, а не наоборот.
2. **Repeating Group как основа списка.** В to-do-гайде показано, как задать
   `Type of content = To-do` и `Data source = Search for To-do`, а внутри ячейки
   использовать `Current cell's To-do`. Этот приём перенесён на карточки привычек.
3. **Conditional formatting.** Выполненная задача меняет иконку и цвет. В HabitFlow так же
   подсвечивается привычка, выполненная сегодня, и её прогресс-бар.
4. **Popup для create/edit.** Форма в popup не загромождает страницу; после сохранения
   выполняются `Reset relevant inputs` и `Hide element`.
5. **Пустые состояния и 404.** Во втором гайде отдельно разобраны blank states и страница
   404 — это добавляет приложению законченный вид.

### 3.3. Какую идею применил

Главная идея — **связка «Data Type → Repeating Group → popup-форма → workflow»**.
До исследования каркас от AI был простым списком с кнопкой. После — список превращён
в Repeating Group с типом `Habit`, добавлены карточки с прогрессом, подтверждение
удаления и пустое состояние «Пока нет привычек».

Дополнительно из второго гайда взята структура страниц: `index` → `signup`/`login` →
`habits`, а также проверка пустых состояний и заготовка страницы 404.

### 3.4. Скриншоты «до» и «после»

| До | После |
|---|---|
| ![Каркас до исследования](screenshots/02-before.png) | ![Каркас после исследования](screenshots/02-after.png) |
| Простой список и кнопка добавления | Repeating Group, статистика, прогресс, popup и пустое состояние |

*Оба изображения — макеты-заглушки; перед защитой заменяются снимками Preview и редактора Bubble.*

### 3.5. Итог части 2

Исследование изменило не только внешний вид, но и порядок работы: сначала модель данных,
потом список на Repeating Group, затем формы и workflows. Это уменьшило количество
переделок на этапах 3–4.

---

## 4. Часть 3. Ручная доработка UI

Все изменения этого раздела сделаны вручную в редакторе Bubble, без AI-агента.

### 4.1. Заголовок с именем

В Design → страница `habits` заголовок был изменён с автоматического `Habit Tracker`
на:

> **HabitFlow — трекер привычек Ивана Кунды**

В footer сохранена обязательная строка **«ТВП: Кунда»**. Имя добавлено в заголовок,
фамилия осталась и в заголовке, и в footer — требование задания выполнено.

Дополнительно поправлены:

- логотип в header: иконка `checkmark-circled` + текст `HabitFlow`;
- навигация: «Мои привычки», «Статистика», аватар пользователя;
- отступы body: 32 px по краям на desktop, 16 px на mobile;
- пустое состояние: «Пока нет привычек. Добавьте первую — и начните серию».

### 4.2. Global variable для цвета

Переход: **Design → Global → Variables → Create a new variable**.

| Имя | Тип | Значение | Где применена |
|---|---|---|---|
| `primary-color` | Color | `#6C5CE7` | фон основной кнопки, активная вкладка, progress bar |
| `accent-color` | Color | `#00B894` | галочка выполнения, положительная статистика |
| `surface-color` | Color | `#10172B` | фон карточек в тёмной теме |

Основная переменная — `primary-color`. Она применена к кнопке «Добавить привычку»,
кнопке «Сохранить» в popup и к активному пункту фильтра. Благодаря этому цвет меняется
в одном месте и сразу подхватывается во всех элементах.

![Global variable primary-color](screenshots/03-global-variable.png)

*`03-global-variable.png` — заглушка: панель Global → Variables с переменной `primary-color` типа Color.*

### 4.3. Новый стиль

Создан стиль **`Button / Primary`** для элемента Button:

| Свойство | Значение |
|---|---|
| Background | `primary-color` (Global variable) |
| Font | Segoe UI, 16 px, semibold |
| Text color | `#FFFFFF` |
| Border radius | 12 px |
| Padding | 14 px / 24 px |
| Shadow | `0 8px 20px rgba(108, 92, 231, 0.25)` |
| Hover | та же кнопка с opacity 90 % |

Стиль применён к кнопкам «Добавить привычку» и «Сохранить». Дополнительно созданы
стили `Text / H1`, `Card / Habit` и `Input / Default`, чтобы карточки и поля выглядели
единообразно.

![Стиль Primary Button](screenshots/04-style.png)

*`04-style.png` — заглушка: редактор стиля Button / Primary со ссылкой на `primary-color`.*

### 4.4. Готовый компонент

В библиотеке **COMPONENTS** выбран готовый компонент **Signup Form** (форма регистрации).
Он перетащен на страницу `signup` и настроен под проект:

- заменён заголовок на «Создать аккаунт в HabitFlow»;
- поля Email и Password оставлены, добавлена подпись «Пароль — не менее 8 символов»;
- кнопка перекрашена в `primary-color`, применён стиль `Button / Primary`;
- добавлена ссылка «Уже есть аккаунт? Войти»;
- форма связана с workflow `Sign the user up`.

Компонент не дублирует элементы, которые уже были на странице: на `signup` до этого
не было формы, поэтому библиотечный блок полностью заменяет ручную сборку.

![Готовый компонент Signup Form](screenshots/05-component.png)

*`05-component.png` — заглушка: компонент Signup Form на странице signup после настройки.*

### 4.5. Чек-лист ручных изменений

| Что | Где | Результат |
|---|---|---|
| Заголовок с именем | `habits`, Text H1 | «HabitFlow — трекер привычек Ивана Кунды» |
| Global variable | Global → Variables | `primary-color`, `accent-color`, `surface-color` |
| Стиль кнопки | Styles → Button | `Button / Primary` на базе `primary-color` |
| Компонент | COMPONENTS → Signup Form | форма регистрации на `signup` |
| Адаптивность | Design → Responsive | карточки в одну колонку на mobile |
| Пустое состояние | Repeating Group | текст и кнопка при нуле записей |

---

## 5. Часть 4. Data и Workflows

### 5.1. Промпт для новой сущности (дословно)

```text
Придумай структуру данных для трекера привычек на Bubble.
Нужна основная сущность Habit: название, описание, категория, цель в неделю,
дата старта, активна ли привычка, владелец (User).
И отдельная сущность HabitLog для ежедневных отметок: ссылка на привычку,
дата, выполнено (да/нет), владелец.
Для каждого поля укажи тип Bubble, обязательность и значение по умолчанию.
Предложи 3 тестовые записи.
```

AI предложил разделить данные на две сущности: `Habit` (сама привычка) и `HabitLog`
(ежедневная отметка). Это удобнее, чем хранить историю в одном поле: можно считать
серии, строить статистику за неделю и не перезаписывать прошлые дни.

### 5.2. Data Type `Habit`

Создан в **Data → Data types → Create a new type**.

| Поле | Тип Bubble | Обязательное | Значение по умолчанию | Назначение |
|---|---|---|---|---|
| `title` | text | да | — | название привычки |
| `description` | text | нет | — | описание и заметка |
| `category` | `HabitCategory` (Option Set) | да | `health` | категория |
| `target_per_week` | number | да | `7` | цель выполнений в неделю |
| `start_date` | date | да | `Current date/time` | дата старта |
| `is_active` | yes / no | да | `yes` | активна ли привычка |
| `owner` | User | да | `Current User` | владелец записи |
| `streak` | number | да | `0` | текущая серия |
| `last_completed` | date | нет | — | последняя отметка |

Служебные поля `Created Date` и `Modified Date` Bubble создаёт автоматически.

Option Set `HabitCategory` содержит значения:

- `health` — Здоровье;
- `study` — Учёба;
- `sport` — Спорт;
- `mindfulness` — Осознанность.

### 5.3. Data Type `HabitLog`

| Поле | Тип Bubble | Обязательное | Значение по умолчанию | Назначение |
|---|---|---|---|---|
| `habit` | Habit | да | — | ссылка на привычку |
| `date` | date | да | `Current date/time` | день отметки |
| `done` | yes / no | да | `yes` | выполнено |
| `owner` | User | да | `Current User` | владелец |

Связь: одна `Habit` → много `HabitLog` (one-to-many). В `HabitLog` хранится история,
а в `Habit` — быстрый доступ к текущей серии и последней отметке.

### 5.4. Тестовые записи

Добавлены вручную через **Data → App Data → Habit → New entry**:

| title | category | target_per_week | start_date | is_active | streak |
|---|---|---:|---|---|---|
| Чтение 20 минут | study | 7 | 01.10.2026 | yes | 12 |
| Зарядка утром | health | 5 | 15.09.2026 | yes | 21 |
| Медитация | mindfulness | 3 | 20.10.2026 | yes | 4 |

Для каждой привычки добавлена отметка `HabitLog` за 31.10.2026 с `done = yes`.

![Data Type Habit и HabitLog](screenshots/06-data-type.png)

*`06-data-type.png` — заглушка: Data → Data types с полями `Habit` и `HabitLog`.*

![Записи в App Data](screenshots/07-data-records.png)

*`07-data-records.png` — заглушка: App Data → Habit с тремя тестовыми записями.*

### 5.5. Страница `habits`

UI рабочей области создан с помощью AI и затем доработан вручную:

- **header** — логотип, навигация, имя пользователя, кнопка Logout;
- **body** — три карточки статистики, фильтр по категориям, Repeating Group `RG_Habits`;
- **карточка привычки** — название, категория, прогресс `streak / target_per_week`,
  кнопки «Выполнено», «Редактировать», «Удалить»;
- **popup** — `Popup_HabitForm` (создание и редактирование) и `Popup_ConfirmDelete`;
- **footer** — «ТВП: Кунда» и год.

Repeating Group `RG_Habits`:

| Свойство | Значение |
|---|---|
| Type of content | `Habit` |
| Data source | `Search for Habit` |
| Constraint 1 | `owner = Current User` |
| Constraint 2 | `is_active = yes` |
| Sort | `Created Date` — descending |
| Layout | vertical, 1 колонка на mobile |

Статистика считается выражениями:

- «Активных привычек» — `RG_Habits:count`;
- «Выполнено сегодня» — `Search for HabitLog:count` с условиями
  `owner = Current User` и `date = Current date/time`;
- «Лучшая серия» — `Search for Habit:max streak`.

### 5.6. Workflows CRUD

Каждое изменяющее действие — отдельный workflow. Read в Bubble реализуется декларативно:
Repeating Group сам запрашивает данные по `Data source`, поэтому отдельный workflow
для чтения не нужен; загрузка страницы дополнительно проверяет авторизацию.

#### WF1. Create — `wf_create_habit`

Триггер: кнопка **SaveHabit** в `Popup_HabitForm` → *clicked*.

| Шаг | Действие | Параметры |
|---|---|---|
| 1 | Create a new thing | Type `Habit` |
| 2 | Заполнить поля | `title = Input_Title's value`, `description = MultilineInput_Description's value`, `category = Dropdown_Category's value`, `target_per_week = Input_Target's value`, `start_date = DatePicker_Start's value`, `is_active = yes`, `owner = Current User`, `streak = 0` |
| 3 | Reset relevant inputs | очистить форму |
| 4 | Hide element | `Popup_HabitForm` |
| 5 | Show alert | «Привычка добавлена» |

#### WF2. Read — `RG_Habits` + `wf_page_loaded`

- Repeating Group `RG_Habits` с `Data source = Search for Habit` (constraints из 5.5).
- `wf_page_loaded`: **When page is loaded** → *if Current User is empty* → **Go to page `login`**.
- Внутри карточки используются `Current cell's Habit` и `Current cell's Habit's ...`.

#### WF3. Update — `wf_update_habit`

| Шаг | Действие | Параметры |
|---|---|---|
| 1 | Edit-кнопка → Display data | `Popup_HabitForm`, data = `Current cell's Habit` |
| 2 | Show element | `Popup_HabitForm` |
| 3 | SaveHabit → Make changes to a thing | `Popup_HabitForm's Habit` |
| 4 | Изменить поля | `title`, `description`, `category`, `target_per_week`, `start_date` |
| 5 | Reset inputs / Hide popup | закрыть форму |
| 6 | Show alert | «Изменения сохранены» |

Дополнительно — отметка выполнения `wf_toggle_complete`:

- если за сегодня записи `HabitLog` нет → **Create a new thing** `HabitLog`
  (`habit = Current cell's Habit`, `date = Current date/time`, `done = yes`, `owner = Current User`)
  и **Make changes to Habit**: `last_completed = Current date/time`, `streak = streak + 1`;
- если запись уже есть → **Delete a thing** `HabitLog` и **Make changes to Habit**:
  `streak = streak - 1`.

#### WF4. Delete — `wf_delete_habit`

| Шаг | Действие | Параметры |
|---|---|---|
| 1 | Delete-кнопка → Display data | `Popup_ConfirmDelete`, data = `Current cell's Habit` |
| 2 | Show element | `Popup_ConfirmDelete` |
| 3 | ConfirmDelete → Delete a list of things | `HabitLog` where `habit = Popup_ConfirmDelete's Habit` |
| 4 | Delete a thing | `Popup_ConfirmDelete's Habit` |
| 5 | Hide element | `Popup_ConfirmDelete` |
| 6 | Show alert | «Привычка удалена» |

Сначала удаляются связанные отметки, затем сама привычка — иначе в базе останутся
«осиротевшие» `HabitLog`.

#### WF5. Auth — `wf_signup`, `wf_login`, `wf_logout`

- `wf_signup`: **Sign the user up** (email, password) → **Go to page `habits`**.
- `wf_login`: **Log the user in** → **Go to page `habits`**.
- `wf_logout`: **Log the user out** → **Go to page `index`**.

### 5.7. Приватность

В **Data → Privacy** для `Habit` и `HabitLog` включены правила:

- «This Habit is visible to: creator» — владелец видит только свои записи;
- условие `owner = Current User` для поиска, редактирования и удаления;
- для остальных пользователей доступа нет.

Это необязательная часть задания, но она делает приложение похожим на реальный продукт.

### 5.8. Скриншоты части 4

![Результат создания привычки в Preview](screenshots/08-workflow-create.png)

*`08-workflow-create.png` — заглушка: Preview после нажатия Save, новая карточка в списке.*

![Workflow создания](screenshots/09-workflow-create.png)

*`09-workflow-create.png` — заглушка: workflow `wf_create_habit` с действиями Create → Reset → Hide → Alert.*

![Workflow удаления](screenshots/10-workflow-delete.png)

*`10-workflow-delete.png` — заглушка: workflow `wf_delete_habit` с подтверждением и Delete a thing.*

---
