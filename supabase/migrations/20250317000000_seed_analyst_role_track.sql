-- Seed: Analyst role track "AI for Analysts: Practical Analytical Workflows"
-- 7 lessons, each with theory -> info -> quiz -> task.
-- Ref: docs/content/analyst-role-track-spec.md

-- ============================================
-- Course: AI for Analysts (role_track)
-- ============================================
INSERT INTO practicum_courses (
  slug, title, description, icon_name, color, difficulty, estimated_duration,
  lessons_count, sort_order, is_published, is_common_base, course_category
)
VALUES (
  'ai-for-analysts',
  'AI для аналитиков: практические сценарии',
  'Использование AI для уточнения бизнес-вопросов, декомпозиции задач, поддержки SQL-логики, проверки выводов и безопасной аналитики. Курс для джунов и стажёров после прохождения общей базы.',
  'BarChart3',
  '#0ea5e9',
  'medium',
  '60 мин',
  7,
  2,
  true,
  false,
  'role_track'
);

-- ============================================
-- Lesson 1 — Turn a vague business question into a clear analytical task
-- ============================================
INSERT INTO practicum_lessons (course_id, slug, title, description, sort_order, is_published)
VALUES (
  (SELECT id FROM practicum_courses WHERE slug = 'ai-for-analysts'),
  'clarify-business-question',
  'Преобразовать размытый вопрос в аналитическую задачу',
  'Научить использовать AI, чтобы превратить размытый бизнес-вопрос в чётко сформулированную аналитическую задачу.',
  1,
  true
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, content) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-analysts') AND slug = 'clarify-business-question'),
  1, 'theory', 'Зачем уточнять бизнес-вопрос перед анализом',
  'Размытый вопрос вроде «почему результаты ухудшились» не говорит, что именно нужно проверить. Перед тем как трогать данные, нужно прояснить: какую метрику смотрим, за какой период, по какому продукту или сегменту. AI может помочь выписать недостающий контекст, но решение о том, какую метрику считать основной, остаётся за аналитиком.'
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, content, info_style) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-analysts') AND slug = 'clarify-business-question'),
  2, 'info', 'Пример размытого и уточнённого запроса',
  '**Размытый запрос:** «Почему наши результаты стали хуже в последнее время?» — не ясно, какие результаты, за какой период и по кому.

**Уточнённый запрос:** «Помоги уточнить задачу. Бизнес-вопрос: почему конверсия в оплату для нового тарифа X упала за последние 2 месяца. Нужна формулировка аналитической задачи: какая метрика, какой период, какие сегменты и дополнительные вопросы стоит прояснить до анализа.»',
  'example'
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, quiz_question, quiz_options, quiz_correct_index) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-analysts') AND slug = 'clarify-business-question'),
  3, 'quiz', 'Чего не хватает в размытом вопросе',
  'Какая деталь важнее всего отсутствует в фразе «Почему наши результаты стали хуже?» для начала анализа?',
  '["Название любимого аналитического инструмента.", "Чёткое указание метрики или области (например, конверсия, выручка, NPS).", "Длина отчёта в страницах.", "Фамилия руководителя, который задал вопрос."]'::jsonb,
  1
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, task_description, task_hint, task_difficulty, task_success_criteria) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-analysts') AND slug = 'clarify-business-question'),
  4, 'task', 'Уточнить размытый бизнес-вопрос',
  'Дан размытый бизнес-вопрос: «Почему наши результаты стали хуже в последнее время?».

Перепиши его в запрос к AI так, чтобы:
1) появилась предполагаемая метрика или область (например, конверсия, выручка, удержание);
2) был указан период и, при необходимости, продукт или сегмент;
3) AI помог сформулировать список уточняющих вопросов перед анализом.',
  'Сфокусируйся на одном понятном сценарии (например, онлайн-продукт с конверсией в оплату) и попроси AI помочь выделить метрику, период, сегменты и недостающий контекст.',
  'easy',
  ARRAY['В запросе названа метрика или область анализа.', 'Указан период или временное окно.', 'Есть отсылка к продукту или сегменту.', 'Запрос просит AI помочь сформулировать уточняющие вопросы, а не сразу «объяснить всё».']
);

-- ============================================
-- Lesson 2 — Break an analytical task into useful sub-questions
-- ============================================
INSERT INTO practicum_lessons (course_id, slug, title, description, sort_order, is_published)
VALUES (
  (SELECT id FROM practicum_courses WHERE slug = 'ai-for-analysts'),
  'decompose-analytics-task',
  'Декомпозировать аналитическую задачу на под-вопросы',
  'Научить использовать AI, чтобы разбивать одну задачу на несколько направлений анализа: по сегментам, времени, источникам трафика и т.д.',
  2,
  true
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, content) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-analysts') AND slug = 'decompose-analytics-task'),
  1, 'theory', 'Зачем разбивать задачу на под-вопросы',
  'Одна формулировка «упала конверсия» скрывает много возможных причин. Полезно разложить задачу на под-вопросы: по сегментам, по каналам, по шагам воронки, по устройствам и т.п. AI может подсказать, какие срезы и сравнения стоит рассмотреть, но аналитик решает, какие реально считать и в каком порядке.'
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, content, info_style) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-analysts') AND slug = 'decompose-analytics-task'),
  2, 'info', 'Пример декомпозиции задачи про падение конверсии',
  'Сценарий: конверсия в оплату на лендинге упала.

Возможные направления, которые может предложить AI:
- сравнить новые и старые пользователи;
- сравнить устройства (мобайл/десктоп);
- посмотреть по каналам трафика;
- проверить отдельные шаги воронки (клик → форма → оплата);
- выделить период запуска новых кампаний или изменений продукта.',
  'example'
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, quiz_question, quiz_options, quiz_correct_index) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-analysts') AND slug = 'decompose-analytics-task'),
  3, 'quiz', 'Что показывает хорошую декомпозицию',
  'Что из ниже перечисленного больше всего похоже на полезную декомпозицию задачи «упала конверсия в оплату»?',
  '["Спросить AI: «Почему всё упало?» и ждать один ответ.", "Разбить анализ на несколько направлений: сегменты, каналы, шаги воронки, период изменений, устройства.", "Смотреть только общий график без срезов.", "Сразу запросить SQL и не формулировать под-вопросы."]'::jsonb,
  1
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, task_description, task_hint, task_difficulty, task_success_criteria) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-analysts') AND slug = 'decompose-analytics-task'),
  4, 'task', 'Описать, как использовать AI для декомпозиции',
  'Представь, что нужно разобрать падение конверсии для онлайн-продукта.

Опиши, как ты будешь использовать AI, чтобы:
1) предложить возможные срезы и сегменты;
2) сформировать список под-вопросов для анализа;
3) расставить приоритеты, с чего начать;
4) не ограничиться одним очевидным объяснением.',
  'Опиши именно подход: как бы ты формулировал запросы к AI и что ждал бы в ответ, а не итоговые выводы по данным.',
  'medium',
  ARRAY['Есть несколько направлений декомпозиции, а не одно.', 'Опора на реальный бизнес-кейс (конверсия).', 'Показано, как AI помогает, но не заменяет голову аналитика.', 'Есть явный план, с чего начать анализ.']
);

-- ============================================
-- Lesson 3 — Use AI to support SQL / query thinking (Variant A)
-- ============================================
INSERT INTO practicum_lessons (course_id, slug, title, description, sort_order, is_published)
VALUES (
  (SELECT id FROM practicum_courses WHERE slug = 'ai-for-analysts'),
  'sql-thinking-with-ai',
  'Использовать AI для продумывания SQL и запросов',
  'Научить использовать AI как помощника по структуре запросов: таблицы, фильтры, агрегации, объяснение логики — без слепого доверия к сгенерированному коду.',
  3,
  true
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, content) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-analysts') AND slug = 'sql-thinking-with-ai'),
  1, 'theory', 'AI как помощник по структуре запроса',
  'AI может подсказать, как связать таблицы, какие фильтры и агрегации нужны, и объяснить, что делает черновой запрос. Но он не знает бизнес-правил и может ошибаться в логике. Аналитик должен понимать, какую метрику считает запрос и по каким данным.'
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, content, info_style) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-analysts') AND slug = 'sql-thinking-with-ai'),
  2, 'info', 'Пример запроса к AI про SQL-логику',
  '«У меня задача: посчитать конверсию из регистрации в первую оплату для продукта X за последние 3 месяца. Таблицы: users (id, created_at), orders (user_id, status, created_at). Подскажи, какую структуру запроса и JOIN лучше использовать, какие фильтры на статус оплат и какие группировки нужны. Объясни логику шаг за шагом, а не просто дай готовый SQL.»',
  'example'
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, quiz_question, quiz_options, quiz_correct_index) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-analysts') AND slug = 'sql-thinking-with-ai'),
  3, 'quiz', 'Что важно указать в запросе к AI про SQL',
  'Что важнее всего указать в запросе к AI, если вы хотите получить полезную подсказку по SQL-логике?',
  '["Только название СУБД.", "Бизнес-вопрос, участвующие таблицы, нужную метрику и ожидания по объяснению логики.", "Только пример старого запроса без описания задачи.", "Только желаемое имя таблицы-результата."]'::jsonb,
  1
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, task_description, task_hint, task_difficulty, task_success_criteria) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-analysts') AND slug = 'sql-thinking-with-ai'),
  4, 'task', 'Написать запрос к AI для продумывания SQL',
  'Напиши запрос к AI, который поможет продумать логику SQL‑запроса для аналитической задачи (выбери понятный себе пример).

В запросе укажи:
1) бизнес-вопрос;
2) какие таблицы или сущности участвуют;
3) какую метрику или показатель нужно получить;
4) какие фильтры/срезы важны;
5) что AI должен не только выдать SQL, но и объяснить логику.',
  'Выбери реалистичную задачу (конверсия, удержание, активность и т.п.), а не абстрактное «напиши запрос про базу данных».',
  'medium',
  ARRAY['Указан бизнес-вопрос.', 'Есть перечисление таблиц или сущностей.', 'Названа метрика или показатель.', 'Попросено объяснить логику, а не только выдать код.', 'Нет полностью абстрактного «напиши любой запрос».']
);

-- ============================================
-- Lesson 4 — Critically evaluate AI-generated analytical conclusions
-- ============================================
INSERT INTO practicum_lessons (course_id, slug, title, description, sort_order, is_published)
VALUES (
  (SELECT id FROM practicum_courses WHERE slug = 'ai-for-analysts'),
  'critique-analytical-summary',
  'Критически оценивать аналитические выводы AI',
  'Научить отличать полезные аналитические выводы от выдуманных или слишком уверенных заключений модели.',
  4,
  true
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, content) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-analysts') AND slug = 'critique-analytical-summary'),
  1, 'theory', 'Почему аналитические выводы AI нужно проверять',
  'AI может красиво объяснить динамику метрик, придумать причинно-следственные связи и уверенные рекомендации, опираясь на неполную или даже выдуманную информацию. Задача аналитика — отделить полезное резюме фактов от гипотез, которые нужно проверить по данным.'
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, content, info_style) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-analysts') AND slug = 'critique-analytical-summary'),
  2, 'info', 'Пример сомнительного аналитического вывода',
  '«Конверсия упала, потому что пользователи устали от продукта и стали меньше им интересоваться.» — красиво звучащий, но неподтверждённый вывод: нет ссылки на данные, не рассмотрены альтернативные причины, не указано, какие проверки уже сделаны.',
  'warning'
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, quiz_question, quiz_options, quiz_correct_index) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-analysts') AND slug = 'critique-analytical-summary'),
  3, 'quiz', 'Как относиться к аналитическим выводам AI',
  'Как лучше всего относиться к аналитическим выводам, которые предлагает AI?',
  '["Принимать как истину, если звучит уверенно.", "Считать их гипотезами: отделять факты от интерпретаций и планировать проверки по данным.", "Игнорировать любые выводы AI полностью.", "Передавать выводы напрямую руководству без проверки."]'::jsonb,
  1
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, task_description, task_hint, task_difficulty, task_success_criteria) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-analysts') AND slug = 'critique-analytical-summary'),
  4, 'task', 'Разобрать аналитическое резюме от AI',
  'Представь, что AI дал тебе аналитическое резюме по динамике ключевой метрики.

Опиши:
1) какие части резюме выглядят полезными и близкими к данным;
2) какие выводы выглядят слишком уверенными или неподтверждёнными;
3) какие дополнительные проверки по данным ты бы сделал до использования этих выводов;
4) почему нельзя просто скопировать резюме в отчёт.',
  'Представь реальную метрику (конверсия, выручка, churn) и думай в терминах фактов vs гипотез.',
  'medium',
  ARRAY['Разделены полезные и сомнительные части вывода.', 'Названы конкретные проверки по данным.', 'Есть объяснение, почему слепое доверие рискованно.', 'Ответ привязан к аналитическому контексту, а не абстрактен.']
);

-- ============================================
-- Lesson 5 — Use AI to draft summaries and communicate findings
-- ============================================
INSERT INTO practicum_lessons (course_id, slug, title, description, sort_order, is_published)
VALUES (
  (SELECT id FROM practicum_courses WHERE slug = 'ai-for-analysts'),
  'communicate-findings-with-ai',
  'Использовать AI для формулировки аналитических выводов',
  'Научить использовать AI для структурирования и формулировки аналитических выводов под конкретную аудиторию без преувеличения уверенности.',
  5,
  true
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, content) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-analysts') AND slug = 'communicate-findings-with-ai'),
  1, 'theory', 'Аудитория и формат аналитического резюме',
  'Один и тот же анализ нужно по-разному объяснить продукт‑менеджеру, директору и коллеге‑аналитику. В запросе к AI важно указать аудиторию, цель резюме, желаемую структуру (например: контекст → главные выводы → детали → ограничения) и подчеркнуть, что нужно сохранить оговорки и неопределённость, а не выдать категоричные лозунги.'
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, content, info_style) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-analysts') AND slug = 'communicate-findings-with-ai'),
  2, 'info', 'Пример запроса на резюме для стейкхолдера',
  '«Нужно краткое резюме результатов анализа для продакт-менеджера. Аудитория: не аналитики. Вход: список ключевых находок и графиков (опишу текстом). Сформируй текст на 5–7 предложений: сначала контекст, потом 2–3 главных вывода, затем ограничения и что ещё нужно проверить. Не придумывай цифры и не делай категоричных утверждений, если в данных есть неопределённость.»',
  'example'
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, quiz_question, quiz_options, quiz_correct_index) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-analysts') AND slug = 'communicate-findings-with-ai'),
  3, 'quiz', 'Что важно указать в запросе на аналитическое резюме',
  'Что важнее всего добавить в запрос к AI, чтобы получить полезное аналитическое резюме для стейкхолдера?',
  '["Только просьбу «сделай красиво».", "Аудиторию, цель резюме, основную структуру и напоминание сохранить ограничения и неопределённость.", "Только список всех SQL-запросов.", "Ничего, AI сам поймёт."]'::jsonb,
  1
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, task_description, task_hint, task_difficulty, task_success_criteria) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-analysts') AND slug = 'communicate-findings-with-ai'),
  4, 'task', 'Запрос на черновик аналитического резюме',
  'Напиши запрос к AI, который поможет сформировать черновик аналитического резюме для стейкхолдера.

В запросе укажи:
1) кто аудитория (роль/уровень);
2) о каких находках нужно рассказать (без лишних деталей);
3) желаемую структуру текста;
4) что важно не преувеличивать уверенность и сохранить caveats.',
  'Представь реальный отчёт (например, итоги A/B‑теста или анализ падения метрики) и подумай, что стейкхолдер должен понять в первую очередь.',
  'medium',
  ARRAY['Указана аудитория.', 'Понятно, какой анализ резюмируется.', 'Задана структура или формат.', 'Есть указание не преувеличивать уверенность и сохранить ограничения.']
);

-- ============================================
-- Lesson 6 — Use AI to compare, verify, and stress-test analytical reasoning
-- ============================================
INSERT INTO practicum_lessons (course_id, slug, title, description, sort_order, is_published)
VALUES (
  (SELECT id FROM practicum_courses WHERE slug = 'ai-for-analysts'),
  'verify-analytics-with-ai',
  'Использовать AI для проверки и стресс-теста гипотез',
  'Научить использовать AI для поиска альтернативных объяснений, недостающих проверок и борьбы с подтверждающим смещением.',
  6,
  true
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, content) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-analysts') AND slug = 'verify-analytics-with-ai'),
  1, 'theory', 'AI как собеседник для проверки гипотез',
  'Когда у аналитика уже есть первая гипотеза, полезно попросить AI выступить в роли «критического коллеги»: предложить альтернативные объяснения, указать, какие данные ещё стоит проверить, и где может проявиться подтверждающее смещение. Это не замена проверки по данным, а подсказка, где можно ошибиться в рассуждении.'
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, content, info_style) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-analysts') AND slug = 'verify-analytics-with-ai'),
  2, 'info', 'Пример запроса на стресс-тест гипотезы',
  '«У меня гипотеза: падение конверсии связано с изменением формы регистрации. Вот краткое описание гипотезы и того, что уже проверено: [...]. Выступи как критичный коллега: предложи 3–5 альтернативных объяснений, подскажи, какие данные и срезы ещё стоит проверить, и где у меня может быть подтверждающее смещение.»',
  'example'
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, quiz_question, quiz_options, quiz_correct_index) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-analysts') AND slug = 'verify-analytics-with-ai'),
  3, 'quiz', 'Как лучше всего использовать AI для проверки гипотез',
  'Что разумнее всего попросить AI сделать, когда у вас уже есть гипотеза о причине изменения метрики?',
  '["Подтвердить, что гипотеза точно верна.", "Поиграть роль критичного коллеги: предложить альтернативные объяснения и недостающие проверки.", "Игнорировать гипотезу и начать новый анализ с нуля.", "Написать за вас финальный отчёт без проверки данных."]'::jsonb,
  1
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, task_description, task_hint, task_difficulty, task_success_criteria) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-analysts') AND slug = 'verify-analytics-with-ai'),
  4, 'task', 'Описать план использования AI для проверки гипотезы',
  'Представь, что у тебя уже есть гипотеза о причине изменения важной метрики.

Опиши, как ты будешь использовать AI, чтобы:
1) бросить вызов своей гипотезе;
2) получить альтернативные объяснения;
3) найти недостающие проверки по данным;
4) уменьшить риск подтверждающего смещения.',
  'Опирайся на реальный сценарий (например, продуктовая метрика или маркетинговый показатель), а не на абстрактный пример.',
  'medium',
  ARRAY['Показан структурированный план проверки гипотезы.', 'Упомянуты альтернативные объяснения.', 'Есть идеи недостающих проверок.', 'Есть осознание риска подтверждающего смещения.']
);

-- ============================================
-- Lesson 7 — Safe and responsible AI use in analytics
-- ============================================
INSERT INTO practicum_lessons (course_id, slug, title, description, sort_order, is_published)
VALUES (
  (SELECT id FROM practicum_courses WHERE slug = 'ai-for-analysts'),
  'safe-ai-in-analytics',
  'Безопасное и ответственное использование AI в аналитике',
  'Научить видеть риски качества данных, конфиденциальности и управленческих решений при использовании AI в аналитике.',
  7,
  true
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, content) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-analysts') AND slug = 'safe-ai-in-analytics'),
  1, 'theory', 'Риски при использовании AI в аналитике',
  'Аналитики работают с цифрами и выводами, на основе которых принимаются решения. AI может придумывать числа, метрики и причинно-следственные связи. Также важны риски конфиденциальности: нельзя бездумно копировать в открытые сервисы исходные данные клиентов или внутренние отчёты. Полезное использование AI остаётся в безопасных границах: структура, формулировки, идеи, но не финальные цифры и выводы без проверки.'
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, content, info_style) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-analysts') AND slug = 'safe-ai-in-analytics'),
  2, 'info', 'Примеры полезного и рискованного использования',
  'Полезно: попросить AI помочь сформулировать план анализа, список метрик или структуру отчёта, не передавая исходные данные клиентов.

Рискованно: копировать в открытый чат выгрузки с реальными клиентскими данными или принимать решения только по AI‑резюме без проверки цифр по своим источникам.',
  'warning'
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, quiz_question, quiz_options, quiz_correct_index) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-analysts') AND slug = 'safe-ai-in-analytics'),
  3, 'quiz', 'Что безопаснее при использовании AI в аналитике',
  'Какое поведение с AI в аналитике выглядит наиболее разумным?',
  '["Выгружать все данные клиентов в открытый чат, чтобы модель сама всё проанализировала.", "Использовать AI для структуры, идей и формулировок, но проверять цифры и выводы по своим данным и не передавать чувствительную информацию.", "Полностью отказаться от любых проверок, если ответ модели звучит уверенно.", "Давать AI принимать управленческие решения без участия людей."]'::jsonb,
  1
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, task_description, task_hint, task_difficulty, task_success_criteria) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-analysts') AND slug = 'safe-ai-in-analytics'),
  4, 'task', 'Полезный и рискованный сценарий использования AI в аналитике',
  'Опиши:
1) один случай, когда аналитику полезно использовать AI;
2) один случай, когда использование AI напрямую может создать риск для качества данных, конфиденциальности или управленческих решений.

Для рискованного случая укажи: в чём риск, что нужно проверить или сделать безопасно, чего делать не стоит.',
  'Опирайся на реалистичные ситуации: отчёты для руководства, ad-hoc анализ, подготовка презентаций.',
  'medium',
  ARRAY['Приведены реалистичные ситуации аналитика.', 'Для рискованного случая назван конкретный риск.', 'Описано безопасное действие или ручная проверка.', 'Нет формулировок слепого доверия («AI всегда прав», «можно не проверять»).']
);

