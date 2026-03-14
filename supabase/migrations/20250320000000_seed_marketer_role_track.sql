-- Seed: Marketer role track "AI for Marketers: Practical Marketing Workflows"
-- 7 lessons, each with theory -> info -> quiz -> task.
-- Ref: docs/content/marketer-role-track-spec.md

-- ============================================
-- Course: AI for Marketers (role_track)
-- ============================================
INSERT INTO practicum_courses (
  slug, title, description, icon_name, color, difficulty, estimated_duration,
  lessons_count, sort_order, is_published, is_common_base, course_category
)
VALUES (
  'ai-for-marketers',
  'AI для маркетологов: практические сценарии',
  'Использование AI для уточнения маркетинговых задач, генерации аудиторно‑чувствительных сообщений, структурирования идей кампаний и ресёрча, подготовки отчётов и безопасного применения AI в маркетинге. Курс для джунов и стажёров после прохождения общей базы.',
  'TrendingUp',
  '#f97316',
  'medium',
  '60 мин',
  7,
  5,
  true,
  false,
  'role_track'
);

-- ============================================
-- Lesson 1 — Turn a vague marketing task into a clear request
-- ============================================
INSERT INTO practicum_lessons (course_id, slug, title, description, sort_order, is_published)
VALUES (
  (SELECT id FROM practicum_courses WHERE slug = 'ai-for-marketers'),
  'clarify-marketing-task',
  'Преобразовать размытое маркетинговое задание в понятный запрос',
  'Научить превращать фразу «сделай маркетинговый текст» в чёткий запрос к AI с аудиторией, каналом, целью, тоном и форматом.',
  1,
  true
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, content) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-marketers') AND slug = 'clarify-marketing-task'),
  1, 'theory', 'Почему размытый запрос даёт размытый текст',
  'Фраза «сделай маркетинговый текст для продукта» не говорит модели:
- кто целевая аудитория;
- для какого канала пишется текст;
- какая бизнес‑цель (продать, вовлечь, объяснить);
- какой тон у бренда;
- какой формат нужен (пост, письмо, лендинг, баннер).

AI лучше всего помогает, когда маркетолог уже сам задал рамки задачи и использует модель как ускоритель, а не как замену чёткому брифу.'
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, content, info_style) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-marketers') AND slug = 'clarify-marketing-task'),
  2, 'info', 'Пример слабого и уточнённого запроса',
  '**Слабый запрос:** «Сделай маркетинговый текст для нашего продукта.»

**Уточнённый запрос к AI:** «Нужен текст для e‑mail‑рассылки по базе текущих клиентов малых бизнесов. Продукт: онлайн‑сервис для управления задачами команды. Цель письма: напомнить о продукте и мотивировать попробовать новый функционал аналитики. Тон: дружелюбный, без агрессивных продаж. Формат: письмо до 3 абзацев + один чёткий призыв к действию.»',
  'example'
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, quiz_question, quiz_options, quiz_correct_index) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-marketers') AND slug = 'clarify-marketing-task'),
  3, 'quiz', 'Что важно добавить к «сделай маркетинговый текст»',
  'Что важнее всего добавить к фразе «сделай маркетинговый текст для нашего продукта», прежде чем просить AI писать текст?',
  '["Только список любимых слоганов.", "Аудиторию, канал, бизнес‑цель, тон и формат выхода.", "Только длинное описание продукта.", "Ничего, модель сама подберёт всё остальное."]'::jsonb,
  1
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, task_description, task_hint, task_difficulty, task_success_criteria) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-marketers') AND slug = 'clarify-marketing-task'),
  4, 'task', 'Уточнить размытое маркетинговое задание',
  'Дан размытый запрос: «Сделай маркетинговый текст для нашего продукта.»

Перепиши его в запрос к AI так, чтобы:
1) была понятна аудитория;
2) был назван канал или формат (e‑mail, пост, лендинг и т.п.);
3) была сформулирована бизнес‑цель;
4) был обозначен желаемый тон;
5) был понятен формат ответа.',
  'Выбери один реалистичный сценарий (например, письмо, соцсети или лендинг) и сформулируй запрос так, чтобы им мог воспользоваться другой маркетолог без дополнительного контекста.',
  'easy',
  ARRAY['Указана аудитория.', 'Назван канал или формат.', 'Есть формулировка цели.', 'Указан тон или стиль.', 'Понятно, какого вида текст ожидается.']
);

-- ============================================
-- Lesson 2 — Generate audience-aware messaging
-- ============================================
INSERT INTO practicum_lessons (course_id, slug, title, description, sort_order, is_published)
VALUES (
  (SELECT id FROM practicum_courses WHERE slug = 'ai-for-marketers'),
  'audience-aware-messaging',
  'Генерировать сообщения с учётом аудитории',
  'Научить формулировать запросы к AI так, чтобы тексты подстраивались под реальную аудиторию и задачу, а не становились безликими.',
  2,
  true
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, content) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-marketers') AND slug = 'audience-aware-messaging'),
  1, 'theory', 'Почему одна формулировка не подходит всем',
  'Сообщение для основателя стартапа, HR‑менеджера и студента будет отличаться:
- разный контекст и болевые точки;
- разные примеры и язык;
- разные ожидания от продукта.

AI может быстро предложить варианты, но только если в запросе чётко заданы аудитория, оффер, цель коммуникации, тон и формат. Задача маркетолога — задать эти рамки и потом отбирать варианты, а не надеяться на «универсальный текст».'
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, content, info_style) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-marketers') AND slug = 'audience-aware-messaging'),
  2, 'info', 'Пример запроса на 5 вариантов сообщений',
  '«Нужно 5 вариантов сообщения для кампании в LinkedIn.

Аудитория: руководители продуктовых команд в B2B SaaS.
Продукт: платформа для аналитики воронки.
Цель: заинтересовать демо, а не сразу закрыть продажу.
Тон: профессиональный, без хайпа, с акцентом на экономию времени команды.

Формат ответа: список из 5 коротких сообщений (до 2–3 предложений каждое).»',
  'example'
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, quiz_question, quiz_options, quiz_correct_index) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-marketers') AND slug = 'audience-aware-messaging'),
  3, 'quiz', 'Что важно указать в запросе на варианты сообщений',
  'Что важнее всего указать в запросе к AI, если вы хотите получить полезные варианты маркетинговых сообщений?',
  '["Только список фич продукта.", "Аудиторию, оффер, цель коммуникации, тон и формат ответа.", "Только длину текста в символах.", "Ничего, модель сама выберет нужный стиль."]'::jsonb,
  1
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, task_description, task_hint, task_difficulty, task_success_criteria) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-marketers') AND slug = 'audience-aware-messaging'),
  4, 'task', 'Написать запрос на 5 вариантов сообщений для кампании',
  'Напиши запрос к AI, который поможет сгенерировать 5 вариантов сообщений для выбранной кампании.

В запросе укажи:
1) аудиторию;
2) продукт или оффер;
3) цель коммуникации;
4) тон;
5) формат ответа.',
  'Выбери один понятный канал (например, e‑mail, соцсеть, баннер) и сформулируй запрос так, чтобы AI мог выдать варианты, а ты — сравнить их между собой.',
  'medium',
  ARRAY['Ясно, кто аудитория.', 'Понятен продукт или оффер.', 'Чётко обозначена цель сообщения.', 'Есть настройка тона.', 'Запрошен удобный формат ответа.']
);

-- ============================================
-- Lesson 3 — Improve weak AI-generated copy
-- ============================================
INSERT INTO practicum_lessons (course_id, slug, title, description, sort_order, is_published)
VALUES (
  (SELECT id FROM practicum_courses WHERE slug = 'ai-for-marketers'),
  'improve-weak-copy',
  'Улучшать слабый AI‑текст',
  'Научить разбирать, почему AI‑копирайтинг выглядит слишком общим или слабым, и как менять запрос или текст.',
  3,
  true
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, content) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-marketers') AND slug = 'improve-weak-copy'),
  1, 'theory', 'Типичные проблемы AI‑копирайтинга',
  'AI‑тексты часто:
- полны общих слов («инновационный», «уникальный», «лучшее решение»);
- не учитывают конкретику аудитории;
- не отражают бренд‑тон;
- не опираются на реальные выгоды и контекст.

Задача маркетолога — увидеть, что именно делает текст слабым, и задать более точный запрос или явно попросить переработку по конкретным критериям.'
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, content, info_style) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-marketers') AND slug = 'improve-weak-copy'),
  2, 'info', 'Пример слабого текста',
  '«Наш продукт — это инновационное решение для вашего бизнеса. Мы поможем вам увеличить эффективность и достичь новых высот. Присоединяйтесь к нам уже сегодня!» — текст, который можно подставить почти к любому продукту, без конкретики, аудитории и измеримых выгод.',
  'warning'
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, quiz_question, quiz_options, quiz_correct_index) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-marketers') AND slug = 'improve-weak-copy'),
  3, 'quiz', 'Что делает AI‑текст слабым',
  'Что из ниже перечисленного чаще всего делает AI‑маркетинговый текст слабым?',
  '["Слишком короткая длина.", "Отсутствие конкретики про аудиторию, продукт и выгоды, много общих фраз.", "Недостаток эмодзи.", "Отсутствие упоминания нейросетей."]'::jsonb,
  1
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, task_description, task_hint, task_difficulty, task_success_criteria) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-marketers') AND slug = 'improve-weak-copy'),
  4, 'task', 'Разобрать и улучшить слабый AI‑текст',
  'Представь, что AI сгенерировал слабый, слишком общий текст для твоей кампании.

Опиши:
1) что в этом тексте выглядит общим или бессодержательным;
2) чего не хватает для твоей аудитории и цели;
3) что ты попросил бы AI изменить в следующем запросе или итерации;
4) какие конкретные улучшения сделали бы текст полезнее.',
  'Привязывай критику к аудитории, продукту и цели, а не только к вкусу («нравится/не нравится»).',
  'medium',
  ARRAY['Названы конкретные слабости текста.', 'Критика привязана к аудитории и цели.', 'Есть предложения по улучшению следующего запроса или версии текста.', 'Есть понимание, как сделать текст менее общим и более полезным.']
);

-- ============================================
-- Lesson 4 — Use AI to structure campaign and content ideas
-- ============================================
INSERT INTO practicum_lessons (course_id, slug, title, description, sort_order, is_published)
VALUES (
  (SELECT id FROM practicum_courses WHERE slug = 'ai-for-marketers'),
  'structure-campaign-ideas',
  'Использовать AI для структурирования идей кампании и контента',
  'Научить использовать AI для расширения и структурирования идей, а не только для списка случайных предложений.',
  4,
  true
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, content) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-marketers') AND slug = 'structure-campaign-ideas'),
  1, 'theory', 'AI как партнёр по структурированию идей',
  'AI можно попросить:
- предложить категории идей (форматы, каналы, углы подачи);
- помочь разложить идеи по воронке или этапам кампании;
- подсказать критерии выбора лучших вариантов.

Важно не останавливаться на первом списке, а задавать структуру и дальше самостоятельно отбирать, что реально подходит под цель и ресурсы.'
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, content, info_style) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-marketers') AND slug = 'structure-campaign-ideas'),
  2, 'info', 'Пример workflow планирования кампании с AI',
  'Пример:
1) Описать продукт, аудиторию, цель и ограничения кампании;
2) Попросить AI предложить 3–4 категории идей (форматы, каналы, темы);
3) Попросить по 3–5 идей в каждой категории;
4) Отобрать идеи, которые реалистично реализовать, и попросить AI помочь их уточнить (сообщения, форматы, шаги).',
  'tip'
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, quiz_question, quiz_options, quiz_correct_index) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-marketers') AND slug = 'structure-campaign-ideas'),
  3, 'quiz', 'Чего не хватает в «просто попросить идеи»',
  'Почему запрос «придумай идеи для маркетинговой кампании» без контекста и структуры слабый?',
  '["Потому что AI не умеет придумывать идеи.", "Потому что без контекста, категорий и критериев выбора список будет случайным и сложно применимым.", "Потому что нужно сразу просить готовые макеты.", "Потому что запрос должен быть на английском."]'::jsonb,
  1
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, task_description, task_hint, task_difficulty, task_success_criteria) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-marketers') AND slug = 'structure-campaign-ideas'),
  4, 'task', 'Описать workflow использования AI для идей кампании',
  'Опиши, как ты будешь использовать AI, чтобы спланировать начальный пул идей кампании или контент‑плана для запуска.

Твой ответ должен включать:
1) какой контекст ты дашь модели;
2) как попросишь категории идей или направлений;
3) как будешь отбирать перспективные идеи;
4) как превратишь их в реальные точки плана.',
  'Опирайся на реальный сценарий (запуск фичи, сезонная акция, новый продукт), а не на абстрактный «кампания вообще».',
  'medium',
  ARRAY['Описан структурированный процесс.', 'Есть ввод контекста.', 'Есть логика отбора идей.', 'Показано, как перейти от идей к плану.']
);

-- ============================================
-- Lesson 5 — Use AI to support marketing research and comparisons
-- ============================================
INSERT INTO practicum_lessons (course_id, slug, title, description, sort_order, is_published)
VALUES (
  (SELECT id FROM practicum_courses WHERE slug = 'ai-for-marketers'),
  'research-and-comparisons',
  'Использовать AI для поддержки ресёрча и сравнений',
  'Научить формулировать запросы к AI для структуры ресёрча и сравнения конкурентов, не путая гипотезы с фактами.',
  5,
  true
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, content) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-marketers') AND slug = 'research-and-comparisons'),
  1, 'theory', 'AI как помощник в ресёрче, а не источник истины',
  'AI может помочь:
- сформулировать вопросы к ресёрчу;
- предложить гипотезы о позиционировании конкурентов;
- предложить, по каким осям сравнивать продукты.

Но он:
- может «придумывать» детали;
- не знает ваших внутренних данных;
- не заменяет проверку по реальным источникам.

Поэтому важно явно разделять: что считаем гипотезой, а что — фактом, и всегда планировать верификацию.'
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, content, info_style) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-marketers') AND slug = 'research-and-comparisons'),
  2, 'info', 'Пример запроса на структуру ресёрча',
  '«Мне нужно спланировать начальный ресёрч конкурентов в нише [описание]. Помоги:
- предложить 5–7 осей сравнения (позиционирование, кому продают, ключевые выгоды, каналы и т.п.);
- сформулировать вопросы, на которые стоит ответить по каждой оси;
- явно отделить то, что ты предлагаешь как гипотезы для проверки, от того, что можно считать типичными паттернами рынка.

Не придумывай конкретные факты о брендах — сосредоточься на структуре ресёрча.»',
  'example'
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, quiz_question, quiz_options, quiz_correct_index) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-marketers') AND slug = 'research-and-comparisons'),
  3, 'quiz', 'Чем опасно доверять AI в ресёрче без проверки',
  'Почему нельзя относиться к ответам AI по конкурентам как к финальному источнику правды?',
  '["Потому что AI вообще не умеет отвечать на вопросы.", "Потому что он может придумывать факты, не знать актуальные данные и не имеет доступа к вашим источникам, поэтому нужен слой проверки.", "Потому что маркетолог обязан искать только в офлайн‑книгах.", "Потому что так написано в любой инструкции."]'::jsonb,
  1
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, task_description, task_hint, task_difficulty, task_success_criteria) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-marketers') AND slug = 'research-and-comparisons'),
  4, 'task', 'Написать запрос на структуру ресёрча и сравнений',
  'Напиши запрос к AI, который поможет тебе структурировать начальный ресёрч по конкурентам или похожим продуктам.

В запросе укажи:
1) что ты хочешь сравнить (ниша, тип продуктов);
2) какие измерения/оси сравнения тебе важны;
3) где нужно отделить гипотезы от фактов;
4) какой формат ответа будет тебе удобен.',
  'Сосредоточься на структуре ресёрча и осознанном отношении к данным, а не на попытке получить «готовый отчёт».',
  'medium',
  ARRAY['Чётко указана цель сравнения.', 'Есть перечисление осей или измерений.', 'Присутствует осознанное разделение гипотез и фактов.', 'Запрошен удобный формат структурированного ответа.']
);

-- ============================================
-- Lesson 6 — Draft summaries and reporting for stakeholders
-- ============================================
INSERT INTO practicum_lessons (course_id, slug, title, description, sort_order, is_published)
VALUES (
  (SELECT id FROM practicum_courses WHERE slug = 'ai-for-marketers'),
  'stakeholder-summaries',
  'Использовать AI для подготовки сводок и отчётов для стейкхолдеров',
  'Научить формулировать запросы к AI для структурирования коротких отчётов и апдейтов без потери важных caveats и контекста.',
  6,
  true
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, content) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-marketers') AND slug = 'stakeholder-summaries'),
  1, 'theory', 'Чем хороша структурированная сводка для стейкхолдера',
  'Стейкхолдерам нужны:
- короткий и понятный контекст;
- 2–3 главных вывода;
- что уже сделано и что планируется;
- ограничения и неопределённости.

AI может помочь собрать это в компактный текст, если маркетолог:
- чётко задаёт аудиторию и цель;
- описывает ключевые находки;
- просит сохранить caveats и не превращать всё в «победный отчёт».'
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, content, info_style) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-marketers') AND slug = 'stakeholder-summaries'),
  2, 'info', 'Пример запроса на сводку для стейкхолдера',
  '«Нужен короткий апдейт для продакта о результатах кампании.

Аудитория: продакт‑менеджер, не маркетолог.
Дам тебе: 3–5 ключевых метрик и наблюдений (опишу текстом).
Сделай текст на 6–8 предложений в структуре: контекст → основные результаты → что это значит → следующие шаги → ограничения и неопределённости. 

Не придумывай цифры и выводы, которых я не упоминал, не превращай текст в рекламный слоган.»',
  'example'
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, quiz_question, quiz_options, quiz_correct_index) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-marketers') AND slug = 'stakeholder-summaries'),
  3, 'quiz', 'Что важно указать в запросе на сводку для стейкхолдера',
  'Что важнее всего указать в запросе к AI, когда вы просите помочь со сводкой для стейкхолдера?',
  '["Только длину текста и эмодзи.", "Кто аудитория, какие находки нужно резюмировать, желаемую структуру и просьбу сохранить caveats и не выдумывать выводы.", "Только список всех SQL‑запросов.", "Ничего, пусть модель сама решает, что важно."]'::jsonb,
  1
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, task_description, task_hint, task_difficulty, task_success_criteria) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-marketers') AND slug = 'stakeholder-summaries'),
  4, 'task', 'Написать запрос на черновик сводки для стейкхолдера',
  'Напиши запрос к AI, который поможет тебе подготовить короткий апдейт для стейкхолдера о результатах кампании или контент‑активности.

В запросе укажи:
1) кто аудитория;
2) что примерно нужно резюмировать;
3) какую структуру текста ты ожидаешь;
4) что нельзя превращать текст в «хайп» и выдумывать уверенность там, где её нет.',
  'Представь реальную ситуацию отчётности (например, апдейт по пилоту или квартальной кампании), а не абстрактный «успех маркетинга».',
  'medium',
  ARRAY['Указана аудитория.', 'Понятно, какие находки нужно резюмировать.', 'Запрошена структура.', 'Есть акцент на сохранении неопределённостей и отказе от выдуманных выводов.']
);

-- ============================================
-- Lesson 7 — Safe and responsible AI use in marketing
-- ============================================
INSERT INTO practicum_lessons (course_id, slug, title, description, sort_order, is_published)
VALUES (
  (SELECT id FROM practicum_courses WHERE slug = 'ai-for-marketers'),
  'safe-ai-in-marketing',
  'Безопасное и ответственное использование AI в маркетинге',
  'Научить видеть риски вводящих в заблуждение обещаний, off‑brand‑сообщений и неэтичного использования AI в коммуникациях.',
  7,
  true
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, content) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-marketers') AND slug = 'safe-ai-in-marketing'),
  1, 'theory', 'Риски при использовании AI в маркетинге',
  'AI может:
- предложить обещания, которые продукт не выполняет;
- придумывать факты и кейсы;
- генерировать сообщения, не соответствующие бренду или этике.

Маркетолог остаётся ответственным за:
- точность формулировок;
- соответствие бренду и тону;
- отсутствие вводящих в заблуждение обещаний.

Полезное использование AI — ускорение черновиков и идей, а не снятие ответственности за то, что в итоге обещает компания.'
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, content, info_style) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-marketers') AND slug = 'safe-ai-in-marketing'),
  2, 'info', 'Примеры полезного и рискованного использования',
  'Полезно: попросить AI предложить варианты формулировки выгоды с учётом реальных ограничений продукта, помочь сдержанно объяснить результаты кампании или структурировать FAQ.

Рискованно: позволять AI придумывать кейсы успеха, менять цифры «для убедительности» или использовать агрессивные формулировки, которые бренд обычно избегает.',
  'warning'
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, quiz_question, quiz_options, quiz_correct_index) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-marketers') AND slug = 'safe-ai-in-marketing'),
  3, 'quiz', 'Что безопаснее при использовании AI в маркетинге',
  'Какое поведение с AI в маркетинге выглядит наиболее разумным?',
  '["Просить модель обещать максимум, чтобы привлечь внимание.", "Использовать AI для идей и черновиков, проверяя факты, соответствие бренду и избегая вводящих в заблуждение формулировок.", "Позволять AI придумывать кейсы и цифры, если текст выглядит убедительно.", "Перекладывать всю ответственность за коммуникацию на AI."]'::jsonb,
  1
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, task_description, task_hint, task_difficulty, task_success_criteria) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-marketers') AND slug = 'safe-ai-in-marketing'),
  4, 'task', 'Полезный и рискованный сценарий использования AI в маркетинге',
  'Опиши:
1) один случай, когда маркетологу полезно использовать AI;
2) один случай, когда использование AI напрямую может создать риск для бренда, честности коммуникаций или качества сообщений.

Для рискованного случая укажи:
- в чём риск;
- что нужно проверить или исправить вручную;
- чего делать не стоит.',
  'Опирайся на реальные задачи: подготовка лендинга, e‑mail‑цепочки, постов для соцсетей или материалов для перформанс‑кампаний.',
  'medium',
  ARRAY['Приведены реалистичные ситуации маркетолога.', 'Назван конкретный риск.', 'Описано безопасное действие или проверка.', 'Избегается язык слепого доверия к AI.']
);

