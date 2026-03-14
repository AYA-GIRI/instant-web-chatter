-- Seed: Developer role track "AI for Developers: Practical Developer Workflows"
-- 7 lessons, each with theory -> info -> quiz -> task.
-- Ref: docs/content/developer-role-track-spec.md

-- ============================================
-- Course: AI for Developers (role_track)
-- ============================================
INSERT INTO practicum_courses (
  slug, title, description, icon_name, color, difficulty, estimated_duration,
  lessons_count, sort_order, is_published, is_common_base, course_category
)
VALUES (
  'ai-for-developers',
  'AI для разработчиков: практические сценарии',
  'Использование AI для разбора кода, отладки, документации и планирования. Курс для джунов и стажёров после прохождения общей базы.',
  'Code',
  '#22c55e',
  'medium',
  '60 мин',
  7,
  1,
  true,
  false,
  'role_track'
);

-- ============================================
-- Lesson 1 — Use AI to understand unfamiliar code
-- ============================================
INSERT INTO practicum_lessons (course_id, slug, title, description, sort_order, is_published)
VALUES (
  (SELECT id FROM practicum_courses WHERE slug = 'ai-for-developers'),
  'understand-unfamiliar-code',
  'Использовать AI для понимания чужого кода',
  'Научить формулировать запрос так, чтобы получить полезное объяснение кода: цель, структура, риски.',
  1,
  true
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, content) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-developers') AND slug = 'understand-unfamiliar-code'),
  1, 'theory', 'Запрос на разбор кода',
  'AI нужен контекст кода и чёткая постановка. Вместо «объясни всё» лучше попросить:
- основное назначение кода;
- ключевые части и связи;
- подозрительные или рискованные места;
- ответ кратко и по делу.

Объяснения AI всё равно нужно сверять с реальным кодом.'
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, content, info_style) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-developers') AND slug = 'understand-unfamiliar-code'),
  2, 'info', 'Пример слабого и сильного запроса',
  '**Слабый:** «Объясни этот модуль.» — непонятно, что именно нужно и в каком формате.

**Сильный:** «Вот фрагмент [язык/фреймворк]. Нужно: 1) назначение в одном абзаце, 2) основные части по пунктам, 3) что стоит проверить вручную или перепроверить. Ответ кратко, без лишней теории.»',
  'example'
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, quiz_question, quiz_options, quiz_correct_index) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-developers') AND slug = 'understand-unfamiliar-code'),
  3, 'quiz', 'Что важно в запросе на разбор кода?',
  'Что важнее всего добавить в запрос к AI при разборе незнакомого кода?',
  '["Только скопировать весь файл.", "Контекст кода, просьбу о назначении и структуре, просьбу указать рискованные места и ограничить формат ответа.", "Просьбу объяснить всё подряд без ограничений.", "Ничего, AI и так всё поймёт."]'::jsonb,
  1
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, task_description, task_hint, task_difficulty, task_success_criteria) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-developers') AND slug = 'understand-unfamiliar-code'),
  4, 'task', 'Запрос на понимание незнакомого модуля',
  'Напиши запрос к AI, который поможет разобраться в незнакомом модуле. Запрос должен просить модель:
1) объяснить основное назначение кода;
2) описать ключевые части;
3) указать подозрительные или рискованные места;
4) дать ответ кратко и технически.',
  'Добавь контекст (язык/фреймворк при необходимости), явно перечисли, что хочешь получить, и ограничь формат (кратко, по пунктам).',
  'easy',
  ARRAY['Запрос просит объяснить назначение кода.', 'Запрос просит структуру или ключевые части.', 'Есть просьба указать рискованные или подозрительные места.', 'Есть ограничение на формат ответа (кратко, технически).', 'Нет размытой формулировки вроде «объясни всё».']
);

-- ============================================
-- Lesson 2 — Use AI to frame debugging problems correctly
-- ============================================
INSERT INTO practicum_lessons (course_id, slug, title, description, sort_order, is_published)
VALUES (
  (SELECT id FROM practicum_courses WHERE slug = 'ai-for-developers'),
  'frame-debugging',
  'Формулировать задачу на отладку для AI',
  'Научить описывать баг так, чтобы AI помог с диагностикой, а не только с «магическим фиксом».',
  2,
  true
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, content) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-developers') AND slug = 'frame-debugging'),
  1, 'theory', 'Что нужно для полезного запроса на отладку',
  'Запрос на отладку должен содержать контекст: что делаешь, в какой среде. Важно явно указать ожидаемое и фактическое поведение, а также сигнал ошибки (сообщение, лог, шаги воспроизведения). AI полезнее просить сформулировать гипотезы и следующие шаги проверки, а не только «почини код».'
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, content, info_style) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-developers') AND slug = 'frame-debugging'),
  2, 'info', 'Слабый и сильный запрос на отладку',
  '**Слабый:** «Мой код не работает, почини.» — модель не знает контекста, ожиданий и симптома.

**Сильный:** «[Язык/фреймворк]. При [действие] ожидаю [результат], получаю [факт]. Ошибка: [сообщение/лог]. Прошу предложить возможные причины и 2–3 следующих шага проверки.»',
  'example'
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, quiz_question, quiz_options, quiz_correct_index) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-developers') AND slug = 'frame-debugging'),
  3, 'quiz', 'Что должно быть в запросе на отладку?',
  'Что обязательно должно быть в запросе к AI при отладке?',
  '["Только «почини код».", "Контекст, ожидаемое и фактическое поведение, симптом ошибки и просьба о гипотезах или следующих шагах проверки.", "Полный дамп памяти.", "Ничего, AI сам найдёт баг."]'::jsonb,
  1
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, task_description, task_example, task_hint, task_difficulty, task_success_criteria) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-developers') AND slug = 'frame-debugging'),
  4, 'task', 'Улучшить слабый запрос на отладку',
  'Дан слабый запрос на отладку: «Мой код не работает, почини.»

Перепиши его так, чтобы AI мог помочь: укажи контекст, ожидаемое поведение, фактическое поведение, ошибку или симптом и попроси возможные причины и следующие шаги проверки, а не только готовый фикс.',
  'Пример: «Python, FastAPI. При POST на /users ожидаю 201 и запись в БД, получаю 500. В логе: IntegrityError на поле email. Прошу: возможные причины и 2–3 шага проверки.»',
  'Добавь минимум: контекст (что за код), ожидаемое vs фактическое, один конкретный симптом, просьбу о диагностике.',
  'medium',
  ARRAY['Есть технический контекст.', 'Указано ожидаемое и фактическое поведение.', 'Есть наблюдаемый симптом или сигнал ошибки.', 'Запрос просит помощь в диагностике, а не только готовый фикс.']
);

-- ============================================
-- Lesson 3 — Critically evaluate an AI explanation of code
-- ============================================
INSERT INTO practicum_lessons (course_id, slug, title, description, sort_order, is_published)
VALUES (
  (SELECT id FROM practicum_courses WHERE slug = 'ai-for-developers'),
  'evaluate-ai-explanation',
  'Критически оценивать объяснение кода от AI',
  'Научить отделять полезное объяснение от сомнительных утверждений и понимать, что нужно проверить вручную.',
  3,
  true
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, content) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-developers') AND slug = 'evaluate-ai-explanation'),
  1, 'theory', 'Почему ответ AI нужно проверять',
  'Ответ AI может звучать уверенно и при этом содержать ошибки. Нужно отделять полезные части от сомнительных и понимать, что именно стоит проверить по коду. Слепо принимать объяснение нельзя — разработчик сам отвечает за понимание.'
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, content, info_style) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-developers') AND slug = 'evaluate-ai-explanation'),
  2, 'info', 'Что проверять в объяснении',
  'Полезно выделить: что в ответе совпадает с кодом; какие утверждения нельзя проверить без кода; какие места в коде стоит открыть и перепроверить; почему слепое доверие опасно.',
  'tip'
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, quiz_question, quiz_options, quiz_correct_index) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-developers') AND slug = 'evaluate-ai-explanation'),
  3, 'quiz', 'Как относиться к объяснению AI?',
  'Как правильно относиться к объяснению кода от AI?',
  '["Принять как истину, раз модель уверена.", "Выделить полезное и сомнительное, указать, что проверить в коде вручную, и не доверять слепо.", "Игнорировать ответ полностью.", "Спросить ту же модель ещё раз без изменений."]'::jsonb,
  1
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, task_description, task_hint, task_difficulty, task_success_criteria) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-developers') AND slug = 'evaluate-ai-explanation'),
  4, 'task', 'Разобрать ответ AI об объяснении кода',
  'Тебе дан ответ AI с объяснением фрагмента кода. Опиши:
1) что в ответе выглядит полезным;
2) что выглядит сомнительным или неочевидным;
3) что ты бы проверил вручную в коде;
4) почему объяснение нельзя просто принять на веру.',
  'Опирайся на конкретные формулировки из ответа и на то, как их можно проверить по коду.',
  'medium',
  ARRAY['Выделены и полезные, и сомнительные части.', 'Указаны конкретные пункты для ручной проверки в коде.', 'Объяснено, почему слепое доверие рискованно.', 'Ответ привязан к технической реальности.']
);

-- ============================================
-- Lesson 4 — Use AI to draft technical explanations and documentation
-- ============================================
INSERT INTO practicum_lessons (course_id, slug, title, description, sort_order, is_published)
VALUES (
  (SELECT id FROM practicum_courses WHERE slug = 'ai-for-developers'),
  'draft-documentation',
  'Использовать AI для черновиков документации',
  'Научить запрашивать черновик документации с указанием аудитории, структуры и запрета на выдумывание деталей.',
  4,
  true
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, content) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-developers') AND slug = 'draft-documentation'),
  1, 'theory', 'Запрос на черновик документации',
  'В запросе нужно указать: для кого документ (аудитория), что именно документируем, какие разделы нужны. Важно явно сказать, что AI не должен придумывать недостающие технические детали. Готовый черновик всё равно сверяют с реальной реализацией.'
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, content, info_style) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-developers') AND slug = 'draft-documentation'),
  2, 'info', 'Пример запроса на документацию',
  '«Нужен черновик документации по API-методу [описание]. Аудитория: разработчики, которые будут вызывать метод. Разделы: назначение, параметры, ответ, пример вызова, возможные ошибки. Не придумывать детали, которых нет в коде — только структура и заглушки по факту.»',
  'example'
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, quiz_question, quiz_options, quiz_correct_index) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-developers') AND slug = 'draft-documentation'),
  3, 'quiz', 'Что важно в запросе на документацию?',
  'Что важно указать в запросе на черновик документации?',
  '["Только «напиши документацию».", "Аудиторию, что документируем, структуру разделов и явный запрет на выдумывание недостающих деталей.", "Максимально длинный текст.", "Ничего, AI сам знает контекст."]'::jsonb,
  1
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, task_description, task_hint, task_difficulty, task_success_criteria) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-developers') AND slug = 'draft-documentation'),
  4, 'task', 'Запрос на черновик документации по фиче или коду',
  'Напиши запрос к AI для генерации черновика документации по фиче или фрагменту кода. В запросе укажи:
1) для кого документ (аудитория);
2) что именно документируется;
3) какие разделы должны быть;
4) что модель не должна придумывать недостающие технические детали.',
  'Добавь в конце фразу о том, что черновик нужно будет сверить с реализацией.',
  'medium',
  ARRAY['Указана аудитория.', 'Указано, что документируется.', 'Задана полезная структура.', 'Есть явная инструкция не выдумывать детали.', 'Есть осознание необходимости проверки.']
);

-- ============================================
-- Lesson 5 — Use AI to decompose an implementation task
-- ============================================
INSERT INTO practicum_lessons (course_id, slug, title, description, sort_order, is_published)
VALUES (
  (SELECT id FROM practicum_courses WHERE slug = 'ai-for-developers'),
  'decompose-task',
  'Декомпозировать задачу с помощью AI',
  'Научить использовать AI как помощника по планированию: контекст, шаги, риски и зависимости.',
  5,
  true
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, content) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-developers') AND slug = 'decompose-task'),
  1, 'theory', 'AI как помощник по планированию',
  'AI может помочь разбить задачу на шаги, выделить риски и зависимости. Это черновой план, а не истина в последней инстанции — итоговое решение и реализация остаются за разработчиком.'
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, content, info_style) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-developers') AND slug = 'decompose-task'),
  2, 'info', 'Пример сценария',
  'Сценарий: новая бэкенд-задача в незнакомом репозитории. Можно попросить AI: помочь понять контекст и границы задачи; предложить порядок шагов реализации; выделить риски и зависимости; сформировать черновой план. План потом уточняешь сам по коду и требованиям.',
  'example'
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, quiz_question, quiz_options, quiz_correct_index) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-developers') AND slug = 'decompose-task'),
  3, 'quiz', 'Роль AI в планировании',
  'Как правильно использовать план от AI?',
  '["Принять как финальную архитектуру.", "Использовать как черновик: понять контекст, шаги и риски, затем уточнить по коду и требованиям.", "Игнорировать полностью.", "Отправить план заказчику без проверки."]'::jsonb,
  1
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, task_description, task_hint, task_difficulty, task_success_criteria) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-developers') AND slug = 'decompose-task'),
  4, 'task', 'Опиши, как бы использовал AI для планирования задачи',
  'Представь: тебе дали новую бэкенд-задачу в незнакомом коде. Опиши, как ты бы использовал AI, чтобы:
1) понять контекст;
2) разбить задачу на шаги реализации;
3) выделить риски и зависимости;
4) подготовить черновой план реализации.',
  'Опиши последовательность действий и укажи, что план — черновик, а не окончательное решение.',
  'medium',
  ARRAY['Есть последовательность практических этапов.', 'Учтено понимание контекста.', 'Учтены риски и зависимости.', 'AI выступает как поддержка планирования, а не как финальный авторитет.']
);

-- ============================================
-- Lesson 6 — Use AI to think about test cases and edge cases (Variant A)
-- ============================================
INSERT INTO practicum_lessons (course_id, slug, title, description, sort_order, is_published)
VALUES (
  (SELECT id FROM practicum_courses WHERE slug = 'ai-for-developers'),
  'tests-and-edge-cases',
  'Использовать AI для тест-кейсов и граничных случаев',
  'Научить формулировать запрос на генерацию позитивных, негативных и граничных сценариев с конкретным контекстом.',
  6,
  true
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, content) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-developers') AND slug = 'tests-and-edge-cases'),
  1, 'theory', 'Запрос на тест-сценарии',
  'AI может предложить позитивные, негативные и граничные сценарии. Запрос должен содержать контекст: какая функция или фича, что она делает. Важно явно попросить несколько классов сценариев (например, позитивные, негативные, граничные). Предложенные кейсы потом сверяют с реальным поведением и требованиями.'
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, content, info_style) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-developers') AND slug = 'tests-and-edge-cases'),
  2, 'info', 'Пример запроса',
  '«Есть бэкенд-функция [краткое описание]. Нужно: 5 позитивных сценариев, 5 негативных, 3 граничных. Для каждого — входные данные и ожидаемый результат/поведение. Контекст: [язык, фреймворк].»',
  'example'
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, quiz_question, quiz_options, quiz_correct_index) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-developers') AND slug = 'tests-and-edge-cases'),
  3, 'quiz', 'Тест-кейсы от AI',
  'Сгенерированные AI тест-кейсы нужно:',
  '["Сразу использовать без проверки.", "Сверить с реальным поведением и требованиями; при необходимости дополнить или скорректировать.", "Удалить и написать только вручную.", "Отправить тестировщику без ревью."]'::jsonb,
  1
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, task_description, task_hint, task_difficulty, task_success_criteria) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-developers') AND slug = 'tests-and-edge-cases'),
  4, 'task', 'Запрос на тест-сценарии для функции или фичи',
  'Напиши запрос к AI, чтобы получить:
- несколько позитивных сценариев;
- несколько негативных сценариев;
- несколько граничных случаев
для конкретной бэкенд-функции или фичи. Укажи контекст (что за функция/фича) и желаемое количество или формат.',
  'Укажи язык/стек при необходимости и попроси конкретный формат (например, вход → ожидание).',
  'medium',
  ARRAY['Есть контекст функции или фичи.', 'Запрос просит несколько классов сценариев (позитивные, негативные, граничные).', 'Достаточная конкретика, не размытый «напиши тесты».']
);

-- ============================================
-- Lesson 7 — Safe and responsible AI use in development
-- ============================================
INSERT INTO practicum_lessons (course_id, slug, title, description, sort_order, is_published)
VALUES (
  (SELECT id FROM practicum_courses WHERE slug = 'ai-for-developers'),
  'safe-ai-in-development',
  'Безопасное и ответственное использование AI в разработке',
  'Научить видеть риски конфиденциальности, качества и безопасности при использовании AI в работе.',
  7,
  true
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, content) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-developers') AND slug = 'safe-ai-in-development'),
  1, 'theory', 'Риски при использовании AI в разработке',
  'Часть кода, данных или внутренней информации не стоит бездумно вставлять во внешние AI-сервисы. Сгенерированный код нужно ревьюить. Ответ AI может создавать риски по безопасности, надёжности и конфиденциальности. Полезное использование AI остаётся в рамках безопасных границ.'
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, content, info_style) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-developers') AND slug = 'safe-ai-in-development'),
  2, 'info', 'Примеры рисков',
  'Риск: вставить в публичный чат код с ключами, паролями или внутренней логикой. Безопасно: обобщить задачу, убрать чувствительные данные, ревьюить результат. Риск: слепо вставить сгенерированный код в прод без проверки безопасности и граничных случаев.',
  'warning'
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, quiz_question, quiz_options, quiz_correct_index) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-developers') AND slug = 'safe-ai-in-development'),
  3, 'quiz', 'Безопасность и AI',
  'Что разумнее делать при использовании AI в разработке?',
  '["Вставлять любой код и данные в AI без ограничений.", "Не вставлять конфиденциальные данные и ключи; ревьюить сгенерированный код; понимать риски безопасности и конфиденциальности.", "Никогда не использовать AI для кода.", "Доверять всему выводу модели без проверки."]'::jsonb,
  1
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, task_description, task_hint, task_difficulty, task_success_criteria) VALUES
(
  (SELECT id FROM practicum_lessons WHERE course_id = (SELECT id FROM practicum_courses WHERE slug = 'ai-for-developers') AND slug = 'safe-ai-in-development'),
  4, 'task', 'Полезный и рискованный сценарий использования AI',
  'Опиши:
1) один случай, когда разработчику полезно использовать AI;
2) один случай, когда использование AI может создать риск для безопасности, качества или конфиденциальности.

Для рискованного случая укажи: в чём риск, что нужно проверить или сделать безопасно, чего делать не стоит.',
  'Выбери реалистичные ситуации из разработки; для риска укажи конкретное безопасное действие или проверку.',
  'medium',
  ARRAY['Приведены реалистичные ситуации разработчика.', 'Назван конкретный риск.', 'Описано безопасное действие или ручная проверка.', 'Нет формулировок в духе «можно не проверять» или «AI всегда безопасен».']
);
