-- Seed: Designer role track "AI for Designers: Practical Design Workflows"
-- 7 lessons, each with theory -> info -> quiz -> task.
-- Ref: docs/content/designer-role-track-spec.md

-- ============================================
-- Course: AI for Designers (role_track)
-- ============================================
INSERT INTO practicum_courses (
  slug, title, description, icon_name, color, difficulty, estimated_duration,
  lessons_count, sort_order, is_published, is_common_base, course_category
)
VALUES (
  'ai-for-designers',
  'AI для дизайнеров: практические сценарии',
  'Использование AI для уточнения дизайнерской задачи, генерации направлений и референсов, формулирования стиля и ограничений, поддержки мудбордов, объяснения решений и безопасного использования AI в дизайне. Курс для джунов и стажёров после прохождения общей базы.',
  'Layers',
  '#ec4899',
  'medium',
  '60 мин',
  7,
  4,
  true,
  false,
  'role_track'
);

-- ============================================
-- Lesson 1 — Turn a vague design request into a clear task
-- ============================================
INSERT INTO practicum_lessons (course_id, slug, title, description, sort_order, is_published)
VALUES (
  (SELECT id FROM practicum_courses WHERE slug = 'ai-for-designers'),
  'clarify-design-request',
  'Преобразовать размытый дизайн‑запрос в понятную задачу',
  'Научить использовать AI, чтобы превратить фразу «сделай крутой дизайн» в чётко оформленную задачу с продуктовым контекстом, аудиторией, целью и ограничениями.',
  1,
  true
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, content) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-designers') AND slug = 'clarify-design-request'),
  1, 'theory', 'Зачем уточнять дизайн‑задачу до запроса к AI',
  'Размытое «сделай красивый дизайн» почти гарантированно даёт размытый результат. Перед тем как просить AI генерировать идеи, важно прояснить:
- что именно проектируем (страница, экран, баннер, презентация и т.п.);
- для кого (аудитория, сегмент);
- какова цель (конверсия, понимание информации, поддержание бренда);
- какие есть ограничения (бренд‑гайд, платформа, формат, контент);
- что считается полезным итоговым артефактом.

AI лучше всего помогает, когда дизайнер уже сам сформулировал задачу, а не ждёт магии от одной фразы.'
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, content, info_style) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-designers') AND slug = 'clarify-design-request'),
  2, 'info', 'Пример слабого и уточнённого запроса',
  '**Слабый запрос:** «Сделай крутой дизайн для нашего продукта.» — непонятно, о чём речь, кто аудитория и что вообще считать успехом.

**Уточнённый запрос к AI:** «Нужны идеи для главного экрана мобильного приложения для трекера привычек. Аудитория: молодые специалисты 20–30 лет. Цель: быстро показать прогресс и мотивировать вернуться. Укажи 3–4 варианта общих визуальных направлений (композиция, уровень визуального шума, характер иллюстраций) с кратким описанием, как они поддерживают цель.»',
  'example'
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, quiz_question, quiz_options, quiz_correct_index) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-designers') AND slug = 'clarify-design-request'),
  3, 'quiz', 'Что важно добавить к «сделай крутой дизайн»',
  'Что важнее всего добавить к фразе «сделай крутой дизайн для нашего продукта», прежде чем просить AI генерировать идеи?',
  '["Название любимого дизайнера.", "Контекст продукта, аудиторию, цель экрана/материала и ограничения.", "Только палитру из трёх любимых цветов.", "Ничего, AI сам придумает подходящий контекст."]'::jsonb,
  1
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, task_description, task_hint, task_difficulty, task_success_criteria) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-designers') AND slug = 'clarify-design-request'),
  4, 'task', 'Уточнить размытый дизайн‑запрос',
  'Дан размытый запрос: «Сделай крутой лендинг для нашего продукта.»

Перепиши его в запрос к AI так, чтобы:
1) было понятно, что за продукт и для кого он;
2) была обозначена основная цель (что должен сделать пользователь);
3) были обозначены ключевые ограничения (бренд‑тон, платформа, формат);
4) AI помог сгенерировать осмысленные направления, а не просто «красивые картинки».',
  'Сфокусируйся на одном разумном продукте (например, SaaS‑сервис или мобильное приложение) и уточни задачу так, чтобы другой дизайнер понял её из текста.',
  'easy',
  ARRAY['Есть продуктовый контекст.', 'Указана аудитория или сценарий использования.', 'Сформулирована цель дизайна.', 'Упомянуты ограничения или бренд‑рамки.', 'Нет размытой формулировки «сделай красиво» без контекста.']
);

-- ============================================
-- Lesson 2 — Use AI to generate design directions and references
-- ============================================
INSERT INTO practicum_lessons (course_id, slug, title, description, sort_order, is_published)
VALUES (
  (SELECT id FROM practicum_courses WHERE slug = 'ai-for-designers'),
  'design-directions-and-refs',
  'Использовать AI для генерации направлений и референсов',
  'Научить использовать AI для структурированного визуального ресёрча: несколько разных направлений, опирающихся на контекст продукта и аудиторию.',
  2,
  true
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, content) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-designers') AND slug = 'design-directions-and-refs'),
  1, 'theory', 'Зачем структурировать визуальную разведку',
  'AI может быстро накидать стили и референсы, но если не задать рамки, всё будет случайным. Полезнее просить:
- несколько разных направлений (например, более спокойное, более экспрессивное, более минималистичное);
- привязку к продукту и аудитории;
- явное описание того, чем направления отличаются друг от друга;
- удобный формат, который потом можно использовать при презентации или мудборде.'
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, content, info_style) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-designers') AND slug = 'design-directions-and-refs'),
  2, 'info', 'Пример запроса на направления и референсы',
  '«Задача: редизайн главного экрана веб‑сервиса для управления задачами. Аудитория: product‑ и engineering‑команды в стартапах.

Нужно 3 разных визуальных направления или группы референсов. Для каждого:
- короткое название направления;
- описание композиции и уровня детализации;
- характер типографики и цвета;
- чем это направление может быть полезно именно для такой аудитории.

Опираться на современный продуктовый веб‑дизайн, а не на абстрактные постеры.»',
  'example'
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, quiz_question, quiz_options, quiz_correct_index) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-designers') AND slug = 'design-directions-and-refs'),
  3, 'quiz', 'Что важно указать в запросе на направления',
  'Что важнее всего добавить в запрос к AI, если вы хотите получить 3 разных визуальных направления для продукта?',
  '["Только список любимых шрифтов.", "Что именно проектируем, для кого, какой стиль/настроение хотим исследовать и чем направления должны отличаться друг от друга.", "Только палитру из бренда.", "Ничего, пусть модель сама выберет контекст."]'::jsonb,
  1
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, task_description, task_hint, task_difficulty, task_success_criteria) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-designers') AND slug = 'design-directions-and-refs'),
  4, 'task', 'Написать запрос на визуальные направления и референсы',
  'Напиши запрос к AI, который поможет получить 3 визуальных направления или группы референсов для выбранной тобой дизайн‑задачи.

Укажи:
1) что именно проектируется;
2) для кого это делается;
3) какое настроение/стиль нужно исследовать;
4) чем направления должны отличаться;
5) в каком формате удобнее получить результат.',
  'Представь реальный бриф (например, лендинг, экран приложения, промо‑баннер) и сформулируй запрос так, чтобы по нему можно было собирать мудборд.',
  'medium',
  ARRAY['Указан объект дизайна.', 'Указана аудитория.', 'Описано настроение или стиль.', 'Явно запрошено несколько разных направлений.', 'Запрошена понятная структура ответа.']
);

-- ============================================
-- Lesson 3 — Critically evaluate weak AI-generated design suggestions
-- ============================================
INSERT INTO practicum_lessons (course_id, slug, title, description, sort_order, is_published)
VALUES (
  (SELECT id FROM practicum_courses WHERE slug = 'ai-for-designers'),
  'critique-ai-design',
  'Критически оценивать дизайн‑идеи от AI',
  'Научить отличать полезные AI‑идеи от дежурных, не привязанных к продукту или пользователю предложений.',
  3,
  true
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, content) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-designers') AND slug = 'critique-ai-design'),
  1, 'theory', 'Почему визуально «красиво» не всегда хорошо для продукта',
  'AI может предлагать визуально приятные, но продуктово слабые решения: перегруженный первый экран, плохую иерархию, нечитабельный текст, off‑brand стили. Дизайнер отвечает не только за «красиво», но и за:
- понятность;
- соответствие бренду;
- поддержку задач пользователя;
- доступность.

Поэтому любые AI‑предложения нужно пропускать через фильтр продуктовой логики и UX.'
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, content, info_style) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-designers') AND slug = 'critique-ai-design'),
  2, 'info', 'Пример слабого AI‑предложения',
  '«Сделать главный экран в стиле неонового киберпанка с мелким светящимся текстом и анимированным фоном.» — может выглядеть эффектно в отрыве от контекста, но для, например, B2B‑дашборда по финансам это создаст проблемы с читаемостью, восприятием серьёзности бренда и отвлечёт внимание от данных.',
  'warning'
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, quiz_question, quiz_options, quiz_correct_index) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-designers') AND slug = 'critique-ai-design'),
  3, 'quiz', 'Как относиться к дизайн‑идеям от AI',
  'Как лучше всего относиться к дизайн‑идеям, которые предлагает AI?',
  '["Принимать любую идею, если она выглядит «красиво».", "Считать их черновыми вариантами: выделять полезные элементы, отбрасывать слабые и проверять всё на соответствие продукту и пользователю.", "Игнорировать любые идеи AI.", "Передавать предложения напрямую в разработку без ревью."]'::jsonb,
  1
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, task_description, task_hint, task_difficulty, task_success_criteria) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-designers') AND slug = 'critique-ai-design'),
  4, 'task', 'Описать, как разобрать слабое AI‑предложение',
  'Представь, что AI описал концепт экрана или визуального решения для твоего продукта.

Опиши:
1) какие элементы концепта ты бы счёл потенциально полезными;
2) какие элементы выглядят дежурными, слабыми или не соответствующими продукту;
3) что нужно проверить по продуктовым требованиям и сценариям;
4) почему нельзя просто принять предложение как есть.',
  'Привязывайся к реальному типу продукта (например, личный кабинет, маркетинговый лендинг, дашборд), а не к абстрактным «экранам».',
  'medium',
  ARRAY['Выделены и полезные, и слабые части предложения.', 'Критика привязана к продукту и пользователю.', 'Названы проверки, которые нужно сделать вручную.', 'Нет абстрактного «плохо/норм» без объяснений.']
);

-- ============================================
-- Lesson 4 — Use AI to articulate style and constraints clearly
-- ============================================
INSERT INTO practicum_lessons (course_id, slug, title, description, sort_order, is_published)
VALUES (
  (SELECT id FROM practicum_courses WHERE slug = 'ai-for-designers'),
  'articulate-style-and-constraints',
  'Формулировать стиль и ограничения понятнее для AI',
  'Научить превращать размытые эстетические просьбы в контекст и конкретные ограничения, которые делают ответы AI полезнее.',
  4,
  true
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, content) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-designers') AND slug = 'articulate-style-and-constraints'),
  1, 'theory', 'Почему «сделай современно» не работает без контекста',
  'Фразы вроде «сделай современно и минималистично» почти ничего не говорят модели. Полезнее объяснить:
- что именно проектируем и для кого;
- какую роль играет минимализм (фокус на тексте, данных, изображениях);
- какие ограничения есть по бренду, доступности, плотности информации;
- что точно не подходит (например, перегруженные иллюстрации, слишком мелкий текст).

AI лучше справляется, когда стиль описан через задачи и контекст, а не только через модные прилагательные.'
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, content, info_style) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-designers') AND slug = 'articulate-style-and-constraints'),
  2, 'info', 'Пример улучшения запроса «сделай современно и минималистично»',
  '«Задача: карточка тарифа на лендинге B2B‑сервиса. Аудитория: продакт‑менеджеры и основатели. 

Под “современно и минималистично” здесь понимаю:
- чёткую иерархию заголовок → цена → список выгод;
- много воздуха, без тяжёлых рамок и лишних линий;
- сдержанную цветовую схему с акцентным цветом из бренда;
- хорошую читаемость на десктопе и ноутбуках.

Предложи варианты, которые отвечают этому описанию, а не любому «минимализму» из Pinterest.»',
  'example'
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, quiz_question, quiz_options, quiz_correct_index) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-designers') AND slug = 'articulate-style-and-constraints'),
  3, 'quiz', 'Чем заменить размытое описание стиля',
  'Что поможет сделать запрос «сделай современно и минималистично» более полезным для AI?',
  '["Добавить ещё два прилагательных про стиль.", "Объяснить контекст (что и для кого), роль минимализма и конкретные ограничения по композиции, контрасту и читаемости.", "Указать только hex‑коды цветов.", "Ничего не менять, так модель проявит «творчество»."]'::jsonb,
  1
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, task_description, task_hint, task_difficulty, task_success_criteria) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-designers') AND slug = 'articulate-style-and-constraints'),
  4, 'task', 'Улучшить слабый запрос на стиль и ограничения',
  'Дан слабый запрос: «Сделай современный минималистичный экран профиля.»

Перепиши его так, чтобы AI понял:
1) что за продукт и кто пользователь;
2) какую роль играет этот экран;
3) что именно подразумевается под «современным минимализмом» в этом контексте;
4) какие ограничения есть по бренду, доступности и содержанию;
5) какой формат предложения ты ожидаешь в ответ.',
  'Опиши, чего точно делать не нужно (например, чрезмерные анимации, слишком мелкий текст, off‑brand иллюстрации).',
  'medium',
  ARRAY['Запрос заменяет размытые прилагательные на контекст и ограничения.', 'Указаны продукт и пользователь.', 'Пояснено, что именно значит стиль в данном случае.', 'Заданы ограничения по бренду/доступности.', 'Понятно, какой формат ответа ожидается.']
);

-- ============================================
-- Lesson 5 — Use AI to support moodboards and early concept exploration
-- ============================================
INSERT INTO practicum_lessons (course_id, slug, title, description, sort_order, is_published)
VALUES (
  (SELECT id FROM practicum_courses WHERE slug = 'ai-for-designers'),
  'moodboards-and-exploration',
  'Использовать AI для мудбордов и ранней разведки концептов',
  'Научить использовать AI для расширения поля идей и сборки мудбордов, не перепутывая черновые варианты с финальным решением.',
  5,
  true
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, content) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-designers') AND slug = 'moodboards-and-exploration'),
  1, 'theory', 'AI как помощник на ранней стадии, а не финальный арт‑директор',
  'На стадии ранних концептов AI может:
- предложить неожиданные комбинации стилей;
- подсказать дополнительные направления, о которых вы не думали;
- помочь описать отличия между вариантами.

Но:
- выбирать направление;
- решать, что реально работает для продукта и пользователя;
- соединять это с реальными ограничениями интерфейса —
остается задачей дизайнера. Мудборд — инструмент разговора, а не автоматический генератор «готового дизайна».'
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, content, info_style) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-designers') AND slug = 'moodboards-and-exploration'),
  2, 'info', 'Пример workflow с AI для мудборда',
  'Пример подхода:
1) Кратко описать продукт, аудиторию и задачу экрана;
2) Попросить AI предложить 3–4 направления с описанием визуального характера;
3) Выбрать 1–2 направления и попросить конкретизировать их через примеры референсов или описания деталей;
4) Составить из этого мудборд и отметить, какие элементы точно не подходят под бренд/задачи.',
  'tip'
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, quiz_question, quiz_options, quiz_correct_index) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-designers') AND slug = 'moodboards-and-exploration'),
  3, 'quiz', 'Чего не должно происходить на стадии исследований',
  'Чего лучше избегать при использовании AI на стадии ранних концептов и мудбордов?',
  '["Сравнивать различные направления между собой.", "Принимать первый понравившийся вариант AI как финальное решение без обсуждения и проверки.", "Просить дополнительные варианты, если текущие не подходят.", "Фиксировать, что в концептах точно не подходит бренду."]'::jsonb,
  1
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, task_description, task_hint, task_difficulty, task_success_criteria) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-designers') AND slug = 'moodboards-and-exploration'),
  4, 'task', 'Описать workflow использования AI для мудборда',
  'Опиши, как ты будешь использовать AI на стадии ранней разведки концептов для выбранной дизайн‑задачи.

Твой план должен включать:
1) какой контекст ты дашь модели;
2) как попросишь варианты направлений/референсов;
3) как будешь сравнивать и отбирать идеи;
4) как превратишь результат в полезный мудборд или стартовый набор направлений.',
  'Опиши конкретные шаги, а не только общее «буду смотреть, что предложит AI».',
  'medium',
  ARRAY['План включает чёткие этапы.', 'Есть ввод контекста.', 'Есть логика сравнения и фильтрации.', 'Подчёркнута роль суждения дизайнера, а не слепого принятия.']
);

-- ============================================
-- Lesson 6 — Use AI to explain design rationale and handoff more clearly
-- ============================================
INSERT INTO practicum_lessons (course_id, slug, title, description, sort_order, is_published)
VALUES (
  (SELECT id FROM practicum_courses WHERE slug = 'ai-for-designers'),
  'explain-design-rationale',
  'Использовать AI для объяснения решений и handoff‑заметок',
  'Научить использовать AI, чтобы структурировать объяснение дизайна и handoff‑заметки под конкретную аудиторию, не выдумывая причины, которых не было.',
  6,
  true
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, content) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-designers') AND slug = 'explain-design-rationale'),
  1, 'theory', 'Зачем структурировать объяснение дизайна',
  'Хорошее объяснение решения помогает:
- синхронизироваться с продактом и командой;
- упростить handoff для разработчиков;
- показать логику, а не только «вкус».

AI может помочь:
- предложить структуру объяснения;
- подсветить, что нужно уточнить для конкретной аудитории;
- переформулировать длинный текст в более понятный.

Важно явно указать, что модель не должна придумывать мотивы, которых у дизайнера не было.'
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, content, info_style) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-designers') AND slug = 'explain-design-rationale'),
  2, 'info', 'Пример запроса на объяснение решения',
  '«Нужно короткое объяснение дизайн‑решения для продакта (аудитория не про дизайн). Я дам кратко: какую задачу решает экран, какие ограничения были и почему выбрано текущее направление. Помоги структурировать это в 3–4 абзаца: контекст → основная идея → как это помогает пользователю и бизнесу → какие ограничения были. Не придумывай причин, которых я не называл.»',
  'example'
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, quiz_question, quiz_options, quiz_correct_index) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-designers') AND slug = 'explain-design-rationale'),
  3, 'quiz', 'Что важно указать в запросе на объяснение дизайна',
  'Что важнее всего указать в запросе к AI, когда вы просите помочь с объяснением дизайн‑решения или handoff‑заметок?',
  '["Только просьбу «сделай красиво и убедительно».", "Кто аудитория, что объясняется, какая структура нужна и что нельзя придумывать несуществующие причины.", "Только список использованных шрифтов и цветов.", "Ничего, AI сам вытащит нужные аргументы."]'::jsonb,
  1
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, task_description, task_hint, task_difficulty, task_success_criteria) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-designers') AND slug = 'explain-design-rationale'),
  4, 'task', 'Написать запрос на черновик объяснения или handoff‑заметок',
  'Напиши запрос к AI, который поможет подготовить короткое объяснение дизайн‑решения или handoff‑заметку.

В запросе укажи:
1) кто аудитория (разработчики, продакт, стейкхолдеры и т.п.);
2) что именно нужно объяснить (экран, паттерн, компонент);
3) какую структуру текста ты ожидаешь;
4) что AI не должен придумывать причины, которых ты не давал.',
  'Представь сценарий реальной передачи работы в команду, а не абстрактное «объясни дизайн вообще».',
  'medium',
  ARRAY['Указана аудитория.', 'Понятно, что объясняется.', 'Запрошена разумная структура.', 'Явно запрещено придумывать несуществующие мотивы.']
);

-- ============================================
-- Lesson 7 — Safe and responsible AI use in design
-- ============================================
INSERT INTO practicum_lessons (course_id, slug, title, description, sort_order, is_published)
VALUES (
  (SELECT id FROM practicum_courses WHERE slug = 'ai-for-designers'),
  'safe-ai-in-design',
  'Безопасное и ответственное использование AI в дизайне',
  'Научить видеть риски для юзабилити, бренда и качества дизайна при использовании AI и оставлять за дизайнером финальную ответственность.',
  7,
  true
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, content) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-designers') AND slug = 'safe-ai-in-design'),
  1, 'theory', 'Риски при использовании AI в дизайне',
  'AI может:
- предлагать off‑brand визуал;
- ухудшать читаемость и доступность;
- создавать иллюзию «готового решения», хотя детали не продуманы.

Дизайнер остаётся ответственным за:
- соответствие бренду и продукту;
- юзабилити и иерархию;
- консистентность между экранами и состояниями.

Полезное использование AI — это ускорение ресёрча и формулировок, а не отказ от собственной ответственности.'
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, content, info_style) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-designers') AND slug = 'safe-ai-in-design'),
  2, 'info', 'Примеры полезного и рискованного использования',
  'Полезно: попросить AI помочь сформулировать альтернативные варианты направления, список рисков по доступности для сложного экрана, структуру объяснения решения для стейкхолдеров.

Рискованно: принимать сгенерированные макеты или концепты без проверки бренд‑гайдов, контраста, читаемости, мобильных состояний и сценариев использования.',
  'warning'
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, quiz_question, quiz_options, quiz_correct_index) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-designers') AND slug = 'safe-ai-in-design'),
  3, 'quiz', 'Что безопаснее при использовании AI в дизайне',
  'Какое поведение с AI в дизайне выглядит наиболее разумным?',
  '["Принимать любой понравившийся вариант от AI без проверки и сразу отдавать в разработку.", "Использовать AI для идей, формулировок и структурирования, проверяя всё на соответствие бренду, доступности и задачам пользователя.", "Полностью отказаться от любых собственных решений и полагаться только на AI.", "Считать, что если AI сделал макет, то он точно лучше текущего."]'::jsonb,
  1
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, task_description, task_hint, task_difficulty, task_success_criteria) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-designers') AND slug = 'safe-ai-in-design'),
  4, 'task', 'Полезный и рискованный сценарий использования AI в дизайне',
  'Опиши:
1) один случай, когда дизайнеру полезно использовать AI;
2) один случай, когда использование AI напрямую может создать риск для юзабилити, бренда или качества дизайна.

Для рискованного случая укажи:
- в чём риск;
- что нужно проверить или исправить вручную;
- чего делать не стоит.',
  'Опирайся на реальные задачи: редизайн сложного экрана, подготовка презентации для стейкхолдеров, работа с визуальной айдентикой и т.п.',
  'medium',
  ARRAY['Приведены реалистичные ситуации дизайнера.', 'Для рискованного случая назван конкретный риск.', 'Описано безопасное действие или ручная проверка.', 'Избегается язык слепого доверия к AI.']
);

