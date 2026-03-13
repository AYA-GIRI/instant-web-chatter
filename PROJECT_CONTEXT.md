# Instant Web Chatter (Internium) — полная документация проекта

Этот документ описывает, что умеет проект, как он устроен, от чего зависит, как работает с Supabase (БД, RLS, Storage, Edge Functions) и какие ключевые потоки есть во фронтенде.

Важно: **схема Supabase в этом документе основана на SQL-интроспекции живой БД**, а не на `supabase/migrations/*`, потому что часть объектов могла быть создана через Supabase SQL Editor.

## Что умеет проект (функционально)

- **Авторизация и профили**: регистрация/вход через Supabase Auth, профиль пользователя, роли (`student`, `employee`, `admin`).
- **Чат с AI (стриминг)**:
  - Отдельная страница `/chat`
  - Плавающий чат-виджет на всех страницах
  - Стриминговые ответы (SSE) через Supabase Edge Functions
  - Выбор провайдера: **Gemini** или **OpenRouter**
- **Методички** (`/methods`):
  - Поиск и фильтры (направление/уровень/формат)
  - Открытие/скачивание файлов из Supabase Storage
  - Поддержка переходов из практикума по ссылкам-глоссарию вида `{{термин|поисковый запрос}}` (подставляет `?search=...`)
- **Практикум** (`/practicum`):
  - Курсы -> уроки -> шаги (блоки)
  - Типы шагов: теория, квиз, задание с AI-проверкой, инфо-блок
  - **Прогресс** пользователя и блокировки (уроки и шаги открываются последовательно)
- **Админка** (`/admin`, только `role=admin`):
  - Управление пользователями/ролями
  - Управление методичками (CRUD + Storage upload)
  - Просмотр прогресса студентов
  - **Конструктор практикумов** (CRUD курсов/уроков/шагов + сортировка + публикация)

## Технологии и зависимости

### Frontend

- **React 18 + TypeScript + Vite**
- **React Router** (маршрутизация)
- **Tailwind + shadcn/ui + Radix UI** (UI)
- **Supabase JS** (`@supabase/supabase-js`) — Auth/DB/Storage
- **TanStack React Query** — подключён через `QueryClientProvider` (проверьте фактическое использование хуков; часть логики реализована через `useEffect` + `supabase` напрямую)

### Backend (Supabase)

- **Postgres + RLS**
- **Edge Functions (Deno)**
- **Storage bucket** для файлов методичек

### AI

- **Gemini**: Edge Function `chat` использует `@google/generative-ai`
- **OpenRouter**: Edge Function `chat-openrouter` делает `fetch` в `https://openrouter.ai/api/v1/chat/completions`

### Зависимости, которые установлены, но могут использоваться только в UI-обвязке

Некоторые пакеты присутствуют, но в бизнес-логике могут не использоваться напрямую (например `react-day-picker`, `recharts`, `embla-carousel-react`) — они могут быть частью shadcn компонентов (`src/components/ui/*`), даже если конкретные страницы их не рендерят сейчас.

Факты по коду:
- `react-markdown` в `src/` не используется (поиск по импорту не дал совпадений).
- `recharts`/`embla`/`react-day-picker` встречаются внутри `src/components/ui/*` (chart/carousel/calendar), но не обязательно используются страницами.

## Маршрутизация (routes)

Маршруты описаны в `src/App.tsx`.

- **Публичные**:
  - `/` — Home
  - `/login` — Login
  - `/auth/callback` — AuthCallback
  - `/about` — About
  - `*` — NotFound
- **Требуют логин** (через `ProtectedRoute`):
  - `/profile` — Profile
  - `/methods` — Methods
  - `/practicum` — Practicum
  - `/practicum/:courseSlug` — PracticumCourse
  - `/practicum/:courseSlug/:lessonSlug` — PracticumLesson
- **Только admin**:
  - `/admin` — Admin

## Supabase: подключение во фронтенде

Клиент создаётся в `src/integrations/supabase/client.ts` и берёт env:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY` (или `VITE_SUPABASE_ANON_KEY`)

Сессия хранится в `localStorage`, включены `persistSession` и `autoRefreshToken`.

## Supabase: схема БД (по SQL-интроспекции живой БД)

Ниже — таблицы `public` (RLS включён везде), ключи и краткое назначение.

### Таблицы и количество строк (на момент сбора)

- `profiles`: 2
- `methods`: 15
- `applications`: 0
- `user_progress`: 9
- `practicum_courses`: 4
- `practicum_lessons`: 8
- `practicum_steps`: 33

### `profiles`

- PK: `id`
- FK: `profiles.id -> auth.users.id`
- Поля: `full_name`, `avatar_url`, `role` (check: `student|employee|admin`), `created_at`, `updated_at`

### `methods`

- PK: `id`
- Поля: `title`, `description`, `tags text[]`, `level` (beginner|intermediate|advanced), `direction` (ai|ml|neural|prompting), `file_url`, `file_name`, `file_size`, `icon_name`, `format`, `is_active`, `created_at`, `updated_at`

### `applications` (заявки)

Таблица в БД существует и защищена RLS, но **UI в админке удалён** (бизнес-функция выключена на уровне интерфейса).

### `user_progress`

Хранит прогресс по практикуму.

- Поля: `user_id`, `task_id`, `completed`, `completed_at`, `notes`, `created_at`, `updated_at`
- FK: `user_progress.user_id -> profiles.id`
- В практике используется формат `task_id = step_<uuid>` для шагов урока.

### Practicum таблицы

Иерархия: **course -> lesson -> step**.

- `practicum_courses`: курсы (slug, title, difficulty, estimated_duration, lessons_count, sort_order, is_published, ...)
- `practicum_lessons`: уроки внутри курса (course_id, slug, title, sort_order, is_published, ...)
- `practicum_steps`: шаги урока (lesson_id, sort_order, step_type + поля по типам)

Статистика по шагам:
- theory: 12
- task: 9
- quiz: 6
- info: 6

Примеры курсов (по данным БД):
- `prompting` (published)
- `neural-networks` (published)
- `ml-basics` (published)
- `privet` (not published)

## Supabase: RLS и политики (важно для доступа)

Все таблицы `public.*` имеют `rls_enabled=true`.

Ключевая функция:
- `public.is_admin()` — `SECURITY DEFINER` (используется в политиках как единый способ проверки админства без рекурсии RLS)

### Принципы доступа (сводно)

- `methods`:
  - читать могут все, но только `is_active=true`
  - админы могут читать всё и делать CRUD
- `practicum_*`:
  - читать могут все, но только опубликованное (`is_published=true`, иерархически)
  - админы могут читать всё и делать CRUD
- `profiles`:
  - пользователь читает/обновляет только свой профиль
  - админ читает/обновляет всё
- `user_progress`:
  - пользователь читает/пишет/удаляет только свой прогресс
  - админ может читать всё
- `applications`:
  - пользователь видит свои и может создавать/обновлять pending
  - админ видит/обновляет всё

## Supabase: триггеры и функции

Функции `public` (по SQL-интроспекции):
- `is_admin()` — security definer
- `handle_new_user()` — security definer (триггер на создание профиля при регистрации)
- `handle_updated_at()`, `handle_methods_updated_at()`, `handle_practicum_updated_at()` — поддержка `updated_at`
- `handle_progress_completion()` — логика заполнения `completed_at` при `completed=true`

Триггеры `public` (сводно):
- `profiles`: `on_profile_updated` -> `handle_updated_at()`
- `methods`: `on_methods_updated` -> `handle_methods_updated_at()`
- `applications`: `on_application_updated` -> `handle_updated_at()`
- `user_progress`: `on_progress_timestamp_updated` -> `handle_updated_at()`, `on_progress_updated` -> `handle_progress_completion()`
- `practicum_courses/lessons/steps`: `on_practicum_*_updated` -> `handle_practicum_updated_at()`

## Edge Functions и API

Фронтенд **не использует собственный REST backend**. Взаимодействие идёт через Supabase JS и Edge Functions.

### `streamChat()` (frontend)

Реализован в `src/utils/chatStream.ts`. Он:
- собирает `MentorContext` в строку (включая **критерии успеха** для заданий)
- отправляет POST в Edge Function
- читает SSE-стрим и отдаёт `delta` чанки в UI

### Edge Function: `chat` (Gemini)

- URL: `${VITE_SUPABASE_URL}/functions/v1/chat`
- `verify_jwt=false` (функция публично вызываема, но фронт всё равно передаёт `Authorization: Bearer <publishable key>`)
- Использует модель `gemini-2.5-flash`
- Добавляет `mode`-инструкции (`verify`, `discuss`, `explain`, `debug`) и `context` в системный промпт

### Edge Function: `chat-openrouter` (OpenRouter)

- URL: `${VITE_SUPABASE_URL}/functions/v1/chat-openrouter`
- `verify_jwt=true` (требует валидный JWT пользователя)
- Модель берётся из:
  1) `requestedModel` из тела запроса, или
  2) `OPENROUTER_MODEL` из env, или
  3) дефолт `google/gemini-2.5-flash`
- Делает proxy SSE напрямую (OpenRouter уже возвращает OpenAI-совместимый стрим)

### Edge Function: `list-models`

Сервисная функция, пытается проверить доступность известных Gemini-моделей.

## Практикум: как устроен прогресс и блокировки

### Прогресс по шагам

В `src/pages/PracticumLesson.tsx` прогресс хранится в `user_progress` с ключом `task_id = step_<stepId>`:
- quiz: при правильном ответе `completed=true`
- task: при `[ЗАЧТЕНО]` от AI `completed=true` и сохраняются `notes` (текст ответа пользователя)

### Блокировка шагов (внутри урока)

Показываются шаги до первого невыполненного интерактивного (quiz/task) включительно. Всё что дальше — скрыто/заблокировано.

### Блокировка уроков (внутри курса)

Внутри курса уроки открываются последовательно: следующий доступен только если предыдущий урок «завершён» (все интерактивные шаги выполнены).

## Админка: конструктор практикумов

Конструктор находится в `src/components/admin/PracticumBuilder.tsx` и позволяет:
- Курсы: CRUD + публикация + сортировка
- Уроки: CRUD + публикация + reorder
- Шаги: CRUD + reorder, выбор типа (theory/quiz/task/info) и редактирование полей по типу

### Как расширять типы блоков в будущем

Чтобы добавить, например, блок с картинками:
1) **БД**: расширить `practicum_steps` (новые поля, и/или новый `step_type` и связанные check constraints)\n
2) **Админка**: добавить новый тип в type picker, форму редактирования, превью\n
3) **Фронт урока**: добавить рендер нового типа в `PracticumLesson.tsx` (аналогично `TheoryStep`, `InfoStep`, `QuizStep`, `TaskStep`)\n

## Конфигурация окружения

### Frontend `.env`

Файл `.env` в репозитории игнорируется (`.gitignore`). Минимально нужно:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY` (или `VITE_SUPABASE_ANON_KEY`)

### Supabase secrets (Edge Functions)

- `GEMINI_API_KEY` — для `chat`
- `OPENROUTER_API_KEY` — для `chat-openrouter`
- `OPENROUTER_MODEL` — опционально
- `SITE_URL` — опционально (для заголовка `HTTP-Referer` на OpenRouter)

## Локальный запуск

1) Установить зависимости:
- `npm install`

2) Запустить dev:
- `npm run dev`

3) Supabase:
- применить миграции (если надо) через CLI или Dashboard\n
- задать secrets и задеплоить Edge Functions\n

## Проверка реального поведения через Playwright MCP (после регистрации)

Сейчас в Cursor не виден MCP-сервер Playwright (в доступных MCP только Supabase и Context7). Когда ты включишь Playwright MCP:

1) Я открою браузер и **подожду**, пока ты зарегистрируешься/войдёшь\n
2) После твоего «готово» прогоню сценарии:\n
   - login / session persistence\n
   - `/methods` поиск + переход из практикума по `?search=`\n
   - `/practicum` курсы/уроки/шаги, блокировки, прогресс, перезагрузка\n
   - `/chat` и плавающий чат: стриминг, выбор провайдера\n
   - `/admin` (если аккаунт админ)\n

И добавлю в этот документ секцию **Verification Results**: что работает, что нет, и какие есть ограничения.

