-- Seed: Tester role track "AI for Testers: Practical QA Workflows"
-- 7 lessons, each with theory -> info -> quiz -> task.
-- Ref: docs/content/tester-role-track-spec.md

-- ============================================
-- Course: AI for Testers (role_track)
-- ============================================
INSERT INTO practicum_courses (
  slug, title, description, icon_name, color, difficulty, estimated_duration,
  lessons_count, sort_order, is_published, is_common_base, course_category
)
VALUES (
  'ai-for-testers',
  'AI для тестировщиков: практические сценарии',
  'Использование AI для уточнения поведения фичи, генерации позитивных/негативных/граничных сценариев, структурирования багрепортов, проверки покрытий и безопасного применения AI в тестировании. Курс для джунов и стажёров после прохождения общей базы.',
  'Shield',
  '#6366f1',
  'medium',
  '60 мин',
  7,
  3,
  true,
  false,
  'role_track'
);

-- ============================================
-- Lesson 1 — Turn vague feature understanding into a clear testing task
-- ============================================
INSERT INTO practicum_lessons (course_id, slug, title, description, sort_order, is_published)
VALUES (
  (SELECT id FROM practicum_courses WHERE slug = 'ai-for-testers'),
  'clarify-feature-request',
  'Преобразовать размытый запрос в понятную тестовую задачу',
  'Научить использовать AI, чтобы превратить фразу «протестируй эту фичу» в чётко оформленную задачу с контекстом, ожидаемым поведением и вопросами к продукту.',
  1,
  true
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, content) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-testers') AND slug = 'clarify-feature-request'),
  1, 'theory', 'Зачем уточнять задачу до написания тестов',
  'Размытое «протестируй эту фичу» не даёт понять, что именно важно проверить. Перед сценариями нужно прояснить:
- что за фича и для кого она;
- какое поведение считается корректным;
- какие ограничения и варианты поведения существуют;
- что ещё нужно спросить у продукт‑менеджера или разработчика.

AI может помочь превратить смутный запрос в более конкретную формулировку задачи, но ответственность за понимание остаётся на тестировщике.'
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, content, info_style) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-testers') AND slug = 'clarify-feature-request'),
  2, 'info', 'Пример слабого и уточнённого запроса',
  '**Слабый запрос:** «Протестируй новый экран профиля.» — не ясно, что проверять и по каким критериям.

**Уточнённый запрос к AI:** «Новая фича: экран редактирования профиля в веб‑кабинете. Пользователь может менять имя, аватар и e‑mail. Нужен список уточняющих вопросов и тестовых аспектов: что важно узнать про ожидаемое поведение, валидацию и ограничения перед тем, как писать сценарии?»',
  'example'
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, quiz_question, quiz_options, quiz_correct_index) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-testers') AND slug = 'clarify-feature-request'),
  3, 'quiz', 'Что критично добавить к запросу «протестируй фичу»',
  'Что важнее всего добавить к фразе «протестируй эту фичу», прежде чем просить AI помогать с тестами?',
  '["Название любимого фреймворка для тестов.", "Контекст фичи, ожидаемое поведение и вопросы, которые ещё нужно прояснить.", "Только пример багрепорта из прошлого проекта.", "Ничего, AI и так всё поймёт."]'::jsonb,
  1
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, task_description, task_hint, task_difficulty, task_success_criteria) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-testers') AND slug = 'clarify-feature-request'),
  4, 'task', 'Уточнить размытый запрос на тестирование фичи',
  'Дан размытый запрос: «Протестируй, пожалуйста, новую регистрацию. Там что‑то странно работает.»

Перепиши его в запрос к AI так, чтобы:
1) появилось описание фичи и кто ей пользуется;
2) было проговорено ожидаемое поведение;
3) были перечислены вопросы, которые нужно прояснить перед сценарием;
4) AI помог собрать список аспектов, которые стоит уточнить у команды.',
  'Сфокусируйся на одном понятном продукте (например, регистрация в веб‑сервисе) и попроси AI помочь уточнить границы поведения и открытые вопросы, а не сразу «написать тест‑кейс».',
  'easy',
  ARRAY['Есть краткий, но конкретный контекст фичи.', 'Упомянуто ожидаемое поведение.', 'В запросе есть просьба помочь сформулировать вопросы к продукту/разработчику.', 'Нет размытой формулировки «протестируй всё» без уточнений.']
);

-- ============================================
-- Lesson 2 — Generate positive, negative, and edge-case scenarios
-- ============================================
INSERT INTO practicum_lessons (course_id, slug, title, description, sort_order, is_published)
VALUES (
  (SELECT id FROM practicum_courses WHERE slug = 'ai-for-testers'),
  'generate-scenarios',
  'Генерировать позитивные, негативные и граничные сценарии',
  'Научить использовать AI для расширения тестового мышления: позитивные, негативные и граничные сценарии для одной фичи.',
  2,
  true
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, content) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-testers') AND slug = 'generate-scenarios'),
  1, 'theory', 'Почему нужны разные классы сценариев',
  'Полезное тестирование включает:
- позитивные сценарии (как всё должно работать);
- негативные сценарии (невалидные данные, странные действия);
- граничные случаи (минимумы, максимумы, переходы состояний).

AI может быстро предложить варианты, но тестировщик должен задать контекст фичи, ожидания и формат, а потом отфильтровать и дополнить идеи.'
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, content, info_style) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-testers') AND slug = 'generate-scenarios'),
  2, 'info', 'Пример запроса на сценарии',
  '«Фича: форма регистрации с полями имя, e‑mail, пароль. Помоги сгенерировать:
- 5 позитивных сценариев (как должно работать),
- 5 негативных (ошибочные/пустые данные),
- 3 граничных случая (длины, специальные символы, границы валидации).

Верни ответ в виде списка: тип сценария → шаги → ожидаемый результат.»',
  'example'
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, quiz_question, quiz_options, quiz_correct_index) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-testers') AND slug = 'generate-scenarios'),
  3, 'quiz', 'Что важно указать в запросе на сценарии',
  'Что важно добавить в запрос к AI, если вы хотите получить полезные позитивные/негативные/граничные сценарии?',
  '["Только «сделай мне тест‑кейсы».", "Контекст фичи, ожидаемое поведение, список типов сценариев и желаемый формат ответа.", "Только список прошлых багов.", "Ничего, модель сама придумает нужные детали."]'::jsonb,
  1
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, task_description, task_hint, task_difficulty, task_success_criteria) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-testers') AND slug = 'generate-scenarios'),
  4, 'task', 'Написать запрос на генерацию сценариев для фичи',
  'Напиши запрос к AI, который поможет сгенерировать:
- несколько позитивных сценариев;
- несколько негативных сценариев;
- несколько граничных случаев
для выбранной тобой фичи (например, смена пароля, оформление заказа, восстановление доступа). Укажи, какой формат ответа тебе нужен.',
  'Выбери одну понятную фичу и попроси конкретный формат (например, сценарий → шаги → ожидаемый результат), а не просто «список идей».',
  'medium',
  ARRAY['Указан контекст фичи.', 'Запрос явно просит позитивные, негативные и граничные сценарии.', 'Запрос просит понятный формат ответа.', 'Нет полностью размытой формулировки без контекста.']
);

-- ============================================
-- Lesson 3 — Critically evaluate AI-generated test suggestions
-- ============================================
INSERT INTO practicum_lessons (course_id, slug, title, description, sort_order, is_published)
VALUES (
  (SELECT id FROM practicum_courses WHERE slug = 'ai-for-testers'),
  'critique-ai-tests',
  'Критически оценивать тестовые идеи от AI',
  'Научить отличать полезные тестовые идеи от слабых, повторяющихся или нереалистичных сценариев, и замечать пропущенные проверки.',
  3,
  true
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, content) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-testers') AND slug = 'critique-ai-tests'),
  1, 'theory', 'Почему нельзя слепо верить списку сценариев от AI',
  'AI может выдать длинный список тест‑кейсов, который выглядит впечатляюще, но:
- часть сценариев может повторять друг друга;
- часть будет нереалистичной для продукта;
- могут отсутствовать важные граничные случаи или бизнес‑правила.

Задача тестировщика — отфильтровать идеи, дополнить список и проверить, что покрыты ключевые риски.'
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, content, info_style) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-testers') AND slug = 'critique-ai-tests'),
  2, 'info', 'На что смотреть в списке сценариев',
  'Полезно спросить себя:
- есть ли дублирующие сценарии;
- покрыты ли важные негативные и граничные случаи;
- нет ли нереалистичных шагов, которые продукт не поддерживает;
- где список опирается на реальные правила, а где — на догадки модели.',
  'tip'
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, quiz_question, quiz_options, quiz_correct_index) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-testers') AND slug = 'critique-ai-tests'),
  3, 'quiz', 'Как относиться к списку тестов от AI',
  'Как лучше всего относиться к большому списку тестовых сценариев, который предложил AI?',
  '["Принять его как полный набор и больше ничего не придумывать.", "Рассматривать как черновик: выделить полезные сценарии, удалить дубли, добавить недостающие и сверить с требованиями.", "Сразу удалить всё и писать только вручную.", "Передать список разработке без проверки."]'::jsonb,
  1
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, task_description, task_hint, task_difficulty, task_success_criteria) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-testers') AND slug = 'critique-ai-tests'),
  4, 'task', 'Описать, как разобрать список тестов от AI',
  'Представь, что AI дал тебе длинный список тестовых сценариев для фичи «оформление заказа».

Опиши:
1) какие сценарии ты бы считал полезными;
2) какие выглядели бы слабыми, дублирующимися или нереалистичными;
3) какие важные проверки могут быть пропущены;
4) как ты бы доработал набор тестов самостоятельно.',
  'Думай в терминах реального продукта: статусы заказа, способы оплаты, ошибки сети, отмена и т.п.',
  'medium',
  ARRAY['Различаются полезные и слабые идеи.', 'Названы типы пропущенных проверок.', 'Есть предложения по доработке набора тестов.', 'Ответ привязан к реалистичному сценарию, а не абстрактен.']
);

-- ============================================
-- Lesson 4 — Use AI to structure a stronger bug report
-- ============================================
INSERT INTO practicum_lessons (course_id, slug, title, description, sort_order, is_published)
VALUES (
  (SELECT id FROM practicum_courses WHERE slug = 'ai-for-testers'),
  'structure-bug-report',
  'Использовать AI для улучшения структуры багрепорта',
  'Научить переписывать слабые багрепорты в структурированные, не выдумывая детали.',
  4,
  true
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, content) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-testers') AND slug = 'structure-bug-report'),
  1, 'theory', 'Что делает багрепорт полезным',
  'Полезный багрепорт обычно включает:
- краткое описание проблемы;
- шаги воспроизведения;
- ожидаемое поведение;
- фактическое поведение;
- окружение (платформа, браузер, версия).

AI может помочь переписать слабый текст в более ясную структуру, но тестировщик не должен придумывать несуществующие факты или скрывать отсутствие данных.'
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, content, info_style) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-testers') AND slug = 'structure-bug-report'),
  2, 'info', 'Пример слабого и улучшенного багрепорта',
  'Слабый: «Страница сломалась, ничего не работает.»

Уточнённый: «При попытке сохранить профиль на desktop Chrome 122:
1) Открыть страницу профиля;
2) Изменить имя и e‑mail;
3) Нажать “Сохранить”.

Ожидаю: данные сохраняются, сообщение об успехе.
Фактически: показывается ошибка 500, данные не сохраняются.»',
  'example'
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, quiz_question, quiz_options, quiz_correct_index) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-testers') AND slug = 'structure-bug-report'),
  3, 'quiz', 'Чего часто не хватает в слабом багрепорте',
  'Какой элемент чаще всего отсутствует в слабом багрепорте типа «страница сломалась, ничего не работает»?',
  '["Название любимого браузера тестировщика.", "Конкретные шаги воспроизведения, ожидаемое и фактическое поведение.", "Имя разработчика, который чинил похожий баг.", "Ссылка на документацию по фиче."]'::jsonb,
  1
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, task_description, task_hint, task_difficulty, task_success_criteria) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-testers') AND slug = 'structure-bug-report'),
  4, 'task', 'Переписать слабый багрепорт в структурированный запрос к AI',
  'Дан слабый багрепорт: «Страница профиля сломалась и ничего не сохраняется.»

Напиши запрос к AI, который поможет переписать его в понятный, структурированный багрепорт без выдуманных деталей. Запрос должен подсказать:
1) как описать шаги воспроизведения;
2) как сформулировать ожидаемое и фактическое поведение;
3) как аккуратно описать отсутствующую информацию (например, неизвестную версию браузера).',
  'Не придумывай данные, которых у тебя нет — лучше явно обозначь пробелы и попроси AI помочь их оформить.',
  'medium',
  ARRAY['Запрос акцентирует структуру багрепорта.', 'Есть фокус на шагах, ожидании и фактическом поведении.', 'Явно указано, что нельзя выдумывать детали.', 'Разрешено честно обозначать недостающую информацию.']
);

-- ============================================
-- Lesson 5 — Use AI to check missing coverage and hidden assumptions
-- ============================================
INSERT INTO practicum_lessons (course_id, slug, title, description, sort_order, is_published)
VALUES (
  (SELECT id FROM practicum_courses WHERE slug = 'ai-for-testers'),
  'review-coverage',
  'Использовать AI для проверки покрытий и скрытых предположений',
  'Научить использовать AI как помощника по поиску недостающих проверок и скрытых допущений в уже придуманных сценариях.',
  5,
  true
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, content) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-testers') AND slug = 'review-coverage'),
  1, 'theory', 'AI как «чек‑лист» по недостающим проверкам',
  'Когда набор сценариев уже есть, полезно посмотреть на него глазами «критичного коллеги». AI можно попросить:
- указать, какие области не покрыты;
- подсказать дополнительные негативные и граничные случаи;
- заметить предположения, которые мы делаем о поведении системы.

Это не отменяет ручной проверки требований и рисков, но помогает не застревать в одном очевидном объяснении.'
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, content, info_style) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-testers') AND slug = 'review-coverage'),
  2, 'info', 'Пример запроса на проверку покрытий',
  '«Вот список моих тестовых сценариев для фичи оплаты (опишу кратко). Выступи как критичный коллега: скажи, какие области могут быть не покрыты (например, ошибки сети, отмена платежа, повторная оплата), и предложи 5–7 идей сценариев, которые стоит добавить. Не выдумывай поведение, которого нет в описании фичи.»',
  'example'
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, quiz_question, quiz_options, quiz_correct_index) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-testers') AND slug = 'review-coverage'),
  3, 'quiz', 'Как лучше использовать AI для проверки покрытий',
  'Как разумнее всего использовать AI, когда у вас уже есть набор тестовых сценариев?',
  '["Попросить AI подтвердить, что сценарии точно полные, и больше ничего не делать.", "Попросить AI выступить критичным коллегой: указать пробелы в покрытии и предложить дополнительные направления проверки.", "Выкинуть свои сценарии и взять только список от AI.", "Вообще не использовать AI на этом шаге."]'::jsonb,
  1
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, task_description, task_hint, task_difficulty, task_success_criteria) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-testers') AND slug = 'review-coverage'),
  4, 'task', 'Описать план использования AI для проверки покрытий',
  'Представь, что у тебя уже есть набор тестовых сценариев для важной фичи (например, оформление заказа или регистрация).

Опиши, как ты будешь использовать AI, чтобы:
1) проверить, какие области могут быть не покрыты;
2) получить идеи дополнительных сценариев;
3) отфильтровать предложения AI, оставив только реалистичные;
4) сверить всё с требованиями и рисками продукта.',
  'Опиши именно подход и шаги взаимодействия с AI, а не финальный список сценариев.',
  'medium',
  ARRAY['Есть план, как просить AI найти пробелы в покрытии.', 'Упомянута фильтрация предложений AI.', 'Есть связь с требованиями и рисками продукта.', 'AI не используется как «последняя инстанция» без проверки.']
);

-- ============================================
-- Lesson 6 — Use AI to draft test documentation and checklists
-- ============================================
INSERT INTO practicum_lessons (course_id, slug, title, description, sort_order, is_published)
VALUES (
  (SELECT id FROM practicum_courses WHERE slug = 'ai-for-testers'),
  'draft-qa-docs',
  'Использовать AI для черновиков тестовой документации и чек‑листов',
  'Научить писать запросы к AI для подготовки чек‑листов и QA‑заметок под конкретную аудиторию и структуру.',
  6,
  true
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, content) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-testers') AND slug = 'draft-qa-docs'),
  1, 'theory', 'Зачем структурировать тестовую документацию',
  'Чек‑листы и QA‑заметки помогают не терять важные проверки и делиться контекстом с командой. В запросе к AI важно указать:
- для какой аудитории пишется документ (команда тестирования, разработчики, менеджер);
- по какой фиче нужна документация;
- какую структуру использовать (разделы, уровень детализации);
- что нельзя выдумывать поведение, которого нет в описании фичи.'
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, content, info_style) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-testers') AND slug = 'draft-qa-docs'),
  2, 'info', 'Пример запроса на чек‑лист',
  '«Нужен черновой чек‑лист для регресса фичи восстановления пароля. Аудитория: команда тестирования. Вход: краткое текстовое описание фичи (опишу ниже). Сформируй список проверок по блокам (успешные сценарии, ошибки, граничные случаи). Не придумывай поведение, которого нет в описании.»',
  'example'
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, quiz_question, quiz_options, quiz_correct_index) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-testers') AND slug = 'draft-qa-docs'),
  3, 'quiz', 'Что важно указать в запросе на чек‑лист',
  'Что важнее всего указать в запросе к AI при подготовке тестового чек‑листа?',
  '["Только просьбу «сделай чек‑лист».", "Фичу, аудиторию, структуру разделов и запрет на выдумывание поведения.", "Только список прошлых релизов.", "Ничего, модель сама выберет формат."]'::jsonb,
  1
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, task_description, task_hint, task_difficulty, task_success_criteria) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-testers') AND slug = 'draft-qa-docs'),
  4, 'task', 'Написать запрос на черновик чек‑листа или QA‑заметок',
  'Напиши запрос к AI, который поможет сформировать черновик тестового чек‑листа или QA‑заметок для конкретной фичи.

В запросе укажи:
1) что за фича;
2) для кого пишется документ;
3) какую структуру ожидаешь (разделы, приоритеты);
4) что AI не должен придумывать поведение, которого нет в описании.',
  'Представь, что этот документ потом будет читать кто‑то из команды без дополнительного устного контекста.',
  'medium',
  ARRAY['Указана фича.', 'Указана аудитория.', 'Задана структура или формат документа.', 'Есть запрет на выдумывание поведения.']
);

-- ============================================
-- Lesson 7 — Safe and responsible AI use in testing
-- ============================================
INSERT INTO practicum_lessons (course_id, slug, title, description, sort_order, is_published)
VALUES (
  (SELECT id FROM practicum_courses WHERE slug = 'ai-for-testers'),
  'safe-ai-in-testing',
  'Безопасное и ответственное использование AI в тестировании',
  'Научить видеть риски ложной уверенности, пропущенных проверок и утечки данных при использовании AI в QA‑работе.',
  7,
  true
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, content) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-testers') AND slug = 'safe-ai-in-testing'),
  1, 'theory', 'Риски при использовании AI в тестировании',
  'AI может создать иллюзию полного покрытия: длинный список тестов и уверенные формулировки. Но:
- сценарии могут не соответствовать реальному продукту;
- важные проверки могут быть пропущены;
- в открытые сервисы нельзя выгружать реальные данные пользователей или внутренние отчёты.

Полезное использование AI в тестировании — это идеи, структура и формулировки, а не замена понимания продукта и ручной верификации.'
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, content, info_style) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-testers') AND slug = 'safe-ai-in-testing'),
  2, 'info', 'Примеры полезного и рискованного использования',
  'Полезно: попросить AI помочь сформулировать план тестирования, идеи негативных сценариев или структуру багрепорта, не передавая реальные пользовательские данные.

Рискованно: копировать в внешний сервис полные логи с персональными данными, полные дампы багов или внутреннюю документацию и принимать решения о качестве только по резюме AI.',
  'warning'
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, quiz_question, quiz_options, quiz_correct_index) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-testers') AND slug = 'safe-ai-in-testing'),
  3, 'quiz', 'Что безопаснее при использовании AI в тестировании',
  'Какое поведение с AI в тестировании выглядит наиболее разумным?',
  '["Выгружать реальные данные пользователей и внутренние логи в любой AI‑сервис для удобства.", "Использовать AI для идей и структуры, не передавая чувствительные данные и проверяя сценарии по требованиям и продукту.", "Полностью доверять любому списку тестов от AI без проверки.", "Вообще не думать о рисках, если сервис популярен."]'::jsonb,
  1
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, task_description, task_hint, task_difficulty, task_success_criteria) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-testers') AND slug = 'safe-ai-in-testing'),
  4, 'task', 'Полезный и рискованный сценарий использования AI в тестировании',
  'Опиши:
1) один случай, когда тестировщику полезно использовать AI;
2) один случай, когда использование AI напрямую может создать риск для качества тестирования или конфиденциальности.

Для рискованного случая укажи:
- в чём риск;
- что нужно проверить или сделать вручную;
- чего делать не стоит.',
  'Опирайся на реалистичные сценарии: регресс важной фичи, подготовка отчёта о качестве, анализ логов и т.п.',
  'medium',
  ARRAY['Приведены реалистичные ситуации тестировщика.', 'Для рискованного случая назван конкретный риск.', 'Описано безопасное действие или ручная проверка.', 'Нет формулировок слепого доверия к AI.']
);

