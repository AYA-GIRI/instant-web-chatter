-- Migration: Seed practicum data - 3 courses with lessons and steps
-- Content covers: Prompting, Neural Networks basics, ML fundamentals

-- ============================================
-- Course 1: Prompting (based on existing prompt practicum)
-- ============================================
INSERT INTO practicum_courses (slug, title, description, icon_name, color, difficulty, estimated_duration, lessons_count, sort_order, is_published)
VALUES (
  'prompting',
  'Искусство промтинга',
  'Научитесь создавать эффективные промпты для ChatGPT и других LLM. Освойте техники few-shot, chain-of-thought и структурирования запросов.',
  'MessageSquare',
  '#8b5cf6',
  'easy',
  '45 мин',
  3,
  1,
  true
);

-- Course 1, Lesson 1: What is a prompt
INSERT INTO practicum_lessons (course_id, slug, title, description, sort_order, is_published)
VALUES (
  (SELECT id FROM practicum_courses WHERE slug = 'prompting'),
  'what-is-prompt',
  'Что такое промпт',
  'Узнаете, что такое промпт, зачем он нужен и из каких частей состоит хороший запрос к ИИ.',
  1,
  true
);

-- Lesson 1 steps
INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, content) VALUES
((SELECT id FROM practicum_lessons WHERE slug = 'what-is-prompt'), 1, 'theory', 'Что такое промпт',
'# Что такое промпт

{{Промпт|промтинг}} -- это текстовый запрос, который вы отправляете языковой модели (например, ChatGPT, YandexGPT или Claude). От качества промпта напрямую зависит качество ответа.

Представьте, что вы общаетесь с очень умным, но буквальным собеседником. Он знает огромное количество информации, но понимает только то, что вы ему написали -- ни больше, ни меньше.

## Почему это важно

Хороший промпт -- это разница между:
- "Расскажи про Python" (слишком общий запрос)
- "Объясни, чем список отличается от кортежа в Python, с примерами кода для начинающего разработчика" (конкретный, полезный запрос)

Второй вариант даст гораздо более полезный ответ, потому что модель точно понимает, **что** нужно объяснить, **как** это сделать и **для кого**.'),

((SELECT id FROM practicum_lessons WHERE slug = 'what-is-prompt'), 2, 'info', 'Аналогия', 'Промпт -- как заказ в ресторане. Можно сказать "принесите что-нибудь вкусное" и получить непредсказуемый результат. А можно описать: "стейк средней прожарки с овощами на гриле, без острого" -- и получить именно то, что хотели.'),

((SELECT id FROM practicum_lessons WHERE slug = 'what-is-prompt'), 3, 'theory', 'Из чего состоит хороший промпт',
'## Структура хорошего промпта

Эффективный промпт обычно содержит несколько ключевых элементов:

1. **Роль** -- кем должна "притвориться" модель
2. **Контекст** -- фоновая информация для задачи
3. **Задача** -- что конкретно нужно сделать
4. **Формат** -- в каком виде нужен ответ
5. **Ограничения** -- чего делать не нужно

Не обязательно использовать все элементы в каждом промпте. Для простых вопросов достаточно четкой задачи. Но чем сложнее запрос, тем больше элементов стоит включить.

> Подробнее о техниках промтинга можно прочитать в разделе {{методичек|промтинг}}.'),

((SELECT id FROM practicum_lessons WHERE slug = 'what-is-prompt'), 4, 'quiz', 'Проверьте себя', NULL);

-- Set quiz data separately (needs lesson_id reference)
UPDATE practicum_steps SET
  quiz_question = 'Какой из этих промптов даст более качественный результат?',
  quiz_options = '[
    "Напиши текст про маркетинг",
    "Ты -- маркетолог с 10-летним стажем. Напиши продающий текст для лендинга онлайн-школы английского языка. Целевая аудитория: взрослые 25-40 лет. Объем: 3 абзаца. Тон: дружелюбный, но профессиональный.",
    "Сделай маркетинг хорошо",
    "Маркетинг текст лендинг школа"
  ]'::jsonb,
  quiz_correct_index = 1
WHERE step_type = 'quiz' AND lesson_id = (SELECT id FROM practicum_lessons WHERE slug = 'what-is-prompt');

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, task_description, task_example, task_hint, task_difficulty, task_success_criteria) VALUES
((SELECT id FROM practicum_lessons WHERE slug = 'what-is-prompt'), 5, 'task', 'Базовый промпт',
'Напишите промпт, который попросит ИИ объяснить концепцию {{машинного обучения|машинного обучения}} простыми словами для школьника. Используйте хотя бы 3 элемента структуры хорошего промпта (роль, контекст, задача, формат, ограничения).',
'Объясни [тема] простыми словами, как будто рассказываешь [аудитория]. Используй [формат/аналогии].',
'Укажите целевую аудиторию и желаемый формат ответа. Попробуйте задать роль модели.',
'easy',
ARRAY['Промпт содержит четкую задачу', 'Указана целевая аудитория', 'Используется хотя бы 3 элемента структуры', 'Промпт понятен и конкретен']);


-- Course 1, Lesson 2: Prompting techniques
INSERT INTO practicum_lessons (course_id, slug, title, description, sort_order, is_published)
VALUES (
  (SELECT id FROM practicum_courses WHERE slug = 'prompting'),
  'techniques',
  'Техники промтинга',
  'Изучите основные техники: few-shot, chain-of-thought, role-playing и другие.',
  2,
  true
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, content) VALUES
((SELECT id FROM practicum_lessons WHERE slug = 'techniques'), 1, 'theory', 'Основные техники',
'# Техники промтинга

Существует несколько проверенных техник, которые значительно повышают качество ответов {{языковых моделей|языковые модели}}.

## 1. Zero-shot (без примеров)
Самый простой подход -- просто описываете задачу:
```
Классифицируй этот отзыв как позитивный или негативный: "Отличный товар, доставка быстрая!"
```

## 2. Few-shot (с примерами)
Даете модели несколько примеров перед основной задачей:
```
Классифицируй отзывы:
"Супер товар!" -> Позитивный
"Ужасное качество" -> Негативный
"Доставка быстрая, но упаковка мятая" -> ?
```

## 3. Chain-of-Thought (цепочка рассуждений)
Просите модель рассуждать пошагово:
```
Реши задачу пошагово, объясняя каждый шаг рассуждения.
```

## 4. Role-playing (ролевая игра)
Задаете модели конкретную роль:
```
Ты -- опытный senior Python-разработчик. Проведи код-ревью этого фрагмента...
```');

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, content, info_style) VALUES
((SELECT id FROM practicum_lessons WHERE slug = 'techniques'), 2, 'info', 'Совет', 'Комбинируйте техники между собой! Например, few-shot + role-playing: задайте роль эксперта и покажите примеры желаемого ответа. Это один из самых мощных подходов.', 'tip');

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, task_description, task_example, task_hint, task_difficulty, task_success_criteria) VALUES
((SELECT id FROM practicum_lessons WHERE slug = 'techniques'), 3, 'task', 'Chain-of-Thought промпт',
'Напишите промпт, который заставит модель рассуждать пошагово при решении логической задачи. Используйте технику chain-of-thought.',
'Реши задачу пошагово. Сначала [шаг 1], затем [шаг 2]. Объясни свое рассуждение на каждом этапе.',
'Используйте фразы вроде "давай подумаем пошагово" или "объясни свои рассуждения на каждом этапе"',
'medium',
ARRAY['Промпт явно требует пошагового рассуждения', 'Используется техника chain-of-thought', 'Задача для модели понятна и конкретна']);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, task_description, task_example, task_hint, task_difficulty, task_success_criteria) VALUES
((SELECT id FROM practicum_lessons WHERE slug = 'techniques'), 4, 'task', 'Few-shot промпт',
'Создайте промпт с примерами (few-shot) для классификации отзывов на позитивные и негативные. Дайте минимум 2 примера.',
'Классифицируй отзыв. Примеры:
Отзыв: "Отличный товар!" -> Позитивный
Отзыв: "Ужасное качество" -> Негативный
Отзыв: [новый отзыв] -> ?',
'Дайте 2-3 примера с ответами перед основным заданием. Убедитесь, что формат ответа единообразный.',
'hard',
ARRAY['Промпт содержит минимум 2 примера', 'Примеры показывают ожидаемый формат ответа', 'Есть четкая задача для классификации нового текста']);


-- Course 1, Lesson 3: Advanced techniques
INSERT INTO practicum_lessons (course_id, slug, title, description, sort_order, is_published)
VALUES (
  (SELECT id FROM practicum_courses WHERE slug = 'prompting'),
  'advanced',
  'Продвинутые приемы',
  'Научитесь работать с контекстом, итерациями и сложными сценариями.',
  3,
  true
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, content) VALUES
((SELECT id FROM practicum_lessons WHERE slug = 'advanced'), 1, 'theory', 'Работа с контекстом',
'# Продвинутые приемы промтинга

## Итеративный промтинг

Не пытайтесь получить идеальный результат с первого раза. Промтинг -- это диалог:

1. Отправьте начальный промпт
2. Оцените результат
3. Уточните запрос, указав что нравится, а что нет
4. Повторите

## Работа с контекстом

Модель "забывает" информацию за пределами контекстного окна. Для длинных задач:
- Давайте краткое резюме предыдущих шагов
- Структурируйте информацию в четкие блоки
- Используйте маркеры типа "КОНТЕКСТ:", "ЗАДАЧА:", "ФОРМАТ:"

## Промпт с ограничениями

Иногда важнее сказать, чего **не** делать:
```
Объясни квантовую механику. 
НЕ используй формулы.
НЕ упоминай конкретных ученых. 
Объясняй через бытовые аналогии.
Максимум 5 предложений.
```

> Больше примеров продвинутых техник -- в {{методичке по промтингу|промтинг}}.');

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, task_description, task_example, task_hint, task_difficulty, task_success_criteria) VALUES
((SELECT id FROM practicum_lessons WHERE slug = 'advanced'), 2, 'task', 'Промпт с контекстом',
'Создайте промпт для генерации маркетингового текста. Включите роль, контекст и конкретные требования к результату. Используйте ограничения и формат.',
'Ты - [роль]. Твоя задача - [задача]. Контекст: [контекст]. Требования: [список]. Ограничения: [список]. Формат ответа: [формат].',
'Определите роль ИИ, дайте контекст задачи, перечислите критерии успеха И ограничения.',
'medium',
ARRAY['Задана роль для модели', 'Описан контекст задачи', 'Есть конкретные требования к результату', 'Есть ограничения (чего не делать)', 'Указан формат ответа']);


-- ============================================
-- Course 2: Neural Networks basics
-- ============================================
INSERT INTO practicum_courses (slug, title, description, icon_name, color, difficulty, estimated_duration, lessons_count, sort_order, is_published)
VALUES (
  'neural-networks',
  'Основы нейросетей',
  'Разберитесь, как устроены нейронные сети, что такое обучение модели и какие виды нейросетей существуют.',
  'Brain',
  '#ec4899',
  'medium',
  '1 час',
  2,
  2,
  true
);

-- Course 2, Lesson 1
INSERT INTO practicum_lessons (course_id, slug, title, description, sort_order, is_published)
VALUES (
  (SELECT id FROM practicum_courses WHERE slug = 'neural-networks'),
  'what-is-nn',
  'Что такое нейросеть',
  'Узнаете базовые принципы работы нейронных сетей, их строение и назначение.',
  1,
  true
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, content) VALUES
((SELECT id FROM practicum_lessons WHERE slug = 'what-is-nn'), 1, 'theory', 'Нейросеть простыми словами',
'# Что такое нейросеть

{{Нейронная сеть|нейросети}} -- это математическая модель, вдохновленная устройством человеческого мозга. Она состоит из слоев "нейронов", которые обрабатывают информацию и учатся находить закономерности в данных.

## Как это работает (упрощенно)

1. **Входной слой** -- получает данные (картинку, текст, числа)
2. **Скрытые слои** -- обрабатывают данные, выделяя все более сложные признаки
3. **Выходной слой** -- выдает результат (классификацию, предсказание, текст)

Каждая связь между нейронами имеет **вес** -- число, которое определяет важность этой связи. Процесс обучения -- это подбор таких весов, при которых сеть дает правильные ответы.

## Где используются нейросети

- **Распознавание изображений** -- Face ID на телефоне
- **Обработка текста** -- ChatGPT, переводчики
- **Рекомендации** -- "вам также понравится" в Netflix/YouTube
- **Генерация контента** -- картинки (Midjourney), музыка, код');

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, content, info_style) VALUES
((SELECT id FROM practicum_lessons WHERE slug = 'what-is-nn'), 2, 'info', 'Аналогия',
'Нейросеть -- как ребенок, который учится различать кошек и собак. Сначала он ошибается, но после тысяч примеров начинает безошибочно отличать одних от других. При этом он не запоминает правила ("у кошки усы") -- он сам находит закономерности.', 'example');

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, content) VALUES
((SELECT id FROM practicum_lessons WHERE slug = 'what-is-nn'), 3, 'theory', 'Обучение нейросети',
'## Как нейросеть учится

Процесс обучения нейросети можно описать в 4 шага:

1. **Прямой проход** -- данные проходят через сеть, сеть выдает предсказание
2. **Вычисление ошибки** -- сравниваем предсказание с правильным ответом
3. **Обратное распространение** -- вычисляем, какие веса нужно изменить
4. **Обновление весов** -- корректируем веса в нужную сторону

Этот цикл повторяется тысячи и миллионы раз на разных примерах из {{обучающего датасета|датасет}}. Постепенно ошибка уменьшается, и модель становится точнее.

> Подробнее об алгоритмах обучения можно прочитать в {{методичке по градиентному спуску|градиентный}}.');

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, quiz_question, quiz_options, quiz_correct_index) VALUES
((SELECT id FROM practicum_lessons WHERE slug = 'what-is-nn'), 4, 'quiz', 'Проверьте понимание',
'Что происходит во время "обучения" нейросети?',
'["Нейросеть запоминает все обучающие примеры наизусть", "Подбираются веса связей между нейронами, чтобы минимизировать ошибку", "Программист вручную прописывает правила для каждого случая", "Нейросеть загружает ответы из интернета"]'::jsonb,
1);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, task_description, task_hint, task_difficulty, task_success_criteria) VALUES
((SELECT id FROM practicum_lessons WHERE slug = 'what-is-nn'), 5, 'task', 'Объясните нейросеть',
'Напишите промпт, который попросит ИИ объяснить принцип работы нейронной сети для человека без технического образования. Используйте аналогию из реальной жизни.',
'Задайте роль (например, учитель), укажите аудиторию и попросите использовать бытовую аналогию.',
'easy',
ARRAY['Промпт просит объяснить нейросеть простым языком', 'Указана аудитория без технического образования', 'Просит использовать аналогию из жизни']);


-- Course 2, Lesson 2
INSERT INTO practicum_lessons (course_id, slug, title, description, sort_order, is_published)
VALUES (
  (SELECT id FROM practicum_courses WHERE slug = 'neural-networks'),
  'types-of-nn',
  'Виды нейросетей',
  'Познакомитесь с основными архитектурами: CNN, RNN, Transformers и их применением.',
  2,
  true
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, content) VALUES
((SELECT id FROM practicum_lessons WHERE slug = 'types-of-nn'), 1, 'theory', 'Основные архитектуры',
'# Виды нейросетей

Не все нейросети устроены одинаково. Разные задачи требуют разных архитектур.

## Сверточные нейросети (CNN)
Специализируются на **изображениях**. "Сканируют" картинку маленькими фильтрами, выделяя сначала простые элементы (линии, углы), а затем сложные (глаза, лица, объекты).

**Применение:** распознавание лиц, медицинские снимки, автопилот.

## Рекуррентные нейросети (RNN)
Работают с **последовательностями** -- текстом, временными рядами, аудио. Имеют "память" о предыдущих шагах.

**Применение:** перевод текста, генерация музыки, прогнозирование курса акций.

## Трансформеры (Transformers)
Революционная архитектура 2017 года, которая лежит в основе GPT, BERT, Claude и других {{языковых моделей|языковые модели}}. Обрабатывают весь текст целиком, используя механизм "внимания".

**Применение:** ChatGPT, генерация изображений (DALL-E), перевод, поиск.');

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, content, info_style) VALUES
((SELECT id FROM practicum_lessons WHERE slug = 'types-of-nn'), 2, 'info', 'Интересный факт',
'Архитектура Transformer была описана в статье "Attention Is All You Need" в 2017 году исследователями Google. Эта работа полностью изменила индустрию ИИ и привела к появлению ChatGPT, Claude, Gemini и других современных моделей.', 'note');

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, quiz_question, quiz_options, quiz_correct_index) VALUES
((SELECT id FROM practicum_lessons WHERE slug = 'types-of-nn'), 3, 'quiz', 'Выберите архитектуру',
'Какая архитектура нейросети лучше всего подходит для распознавания объектов на фотографии?',
'["RNN (рекуррентная)", "CNN (сверточная)", "Transformer", "Все одинаково подходят"]'::jsonb,
1);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, task_description, task_hint, task_difficulty, task_success_criteria) VALUES
((SELECT id FROM practicum_lessons WHERE slug = 'types-of-nn'), 4, 'task', 'Сравните архитектуры',
'Напишите промпт, который попросит ИИ сравнить CNN и Transformer в формате таблицы. Укажите, по каким критериям нужно сравнивать.',
'Используйте структурированный формат. Попросите сравнение по конкретным критериям: задачи, преимущества, недостатки, примеры использования.',
'medium',
ARRAY['Промпт просит сравнение CNN и Transformer', 'Указан формат ответа (таблица)', 'Перечислены конкретные критерии сравнения']);


-- ============================================
-- Course 3: Machine Learning fundamentals
-- ============================================
INSERT INTO practicum_courses (slug, title, description, icon_name, color, difficulty, estimated_duration, lessons_count, sort_order, is_published)
VALUES (
  'ml-basics',
  'Введение в машинное обучение',
  'Поймете ключевые концепции ML: типы обучения, данные, метрики качества и практические применения.',
  'TrendingUp',
  '#06b6d4',
  'medium',
  '1 час',
  2,
  3,
  true
);

-- Course 3, Lesson 1
INSERT INTO practicum_lessons (course_id, slug, title, description, sort_order, is_published)
VALUES (
  (SELECT id FROM practicum_courses WHERE slug = 'ml-basics'),
  'what-is-ml',
  'Что такое машинное обучение',
  'Разберетесь в определении ML, его отличиях от классического программирования и типах обучения.',
  1,
  true
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, content) VALUES
((SELECT id FROM practicum_lessons WHERE slug = 'what-is-ml'), 1, 'theory', 'ML vs классическое программирование',
'# Что такое машинное обучение

{{Машинное обучение|определение ИИ}} (Machine Learning, ML) -- это подраздел искусственного интеллекта, в котором компьютер учится решать задачи на основе данных, а не явных правил.

## В чем отличие от обычного программирования

**Классический подход:**
Программист пишет правила -> программа применяет их к данным -> результат

**ML подход:**
Программист дает данные + правильные ответы -> алгоритм сам находит правила -> модель применяет их к новым данным

## Пример

Задача: определить, спам ли письмо.

**Классический подход:** программист пишет правила: "если содержит слово БЕСПЛАТНО и более 3 восклицательных знаков, то спам".

**ML подход:** алгоритму дают 10 000 писем с пометкой "спам" / "не спам". Он сам находит признаки спама -- возможно, такие, о которых программист бы не подумал.');

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, content) VALUES
((SELECT id FROM practicum_lessons WHERE slug = 'what-is-ml'), 2, 'theory', 'Типы машинного обучения',
'## Три типа машинного обучения

### 1. Обучение с учителем (Supervised Learning)
Модели дают примеры с правильными ответами. Она учится предсказывать ответ для новых данных.

**Задачи:** классификация (спам/не спам), регрессия (предсказание цены)

### 2. Обучение без учителя (Unsupervised Learning)
Модель получает данные БЕЗ правильных ответов и ищет скрытые закономерности и группы.

**Задачи:** кластеризация клиентов, поиск аномалий

### 3. Обучение с подкреплением (Reinforcement Learning)
Модель-"агент" учится методом проб и ошибок, получая награду за правильные действия.

**Задачи:** игры (AlphaGo), робототехника, автопилот

> Подробнее о сферах применения -- в {{методичке по ML|сферы машинного}}.');

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, quiz_question, quiz_options, quiz_correct_index) VALUES
((SELECT id FROM practicum_lessons WHERE slug = 'what-is-ml'), 3, 'quiz', 'Определите тип обучения',
'Алгоритм получает 10 000 фотографий кошек и собак с подписями ("кошка"/"собака") и учится различать их. Какой это тип обучения?',
'["Обучение без учителя", "Обучение с подкреплением", "Обучение с учителем", "Трансферное обучение"]'::jsonb,
2);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, task_description, task_hint, task_difficulty, task_success_criteria) VALUES
((SELECT id FROM practicum_lessons WHERE slug = 'what-is-ml'), 4, 'task', 'Объясните типы ML',
'Напишите промпт, который попросит ИИ объяснить три типа машинного обучения через аналогию с обучением ребенка. Каждый тип -- отдельный сценарий.',
'Задайте формат: для каждого типа ML -- отдельная аналогия с реальной ситуацией обучения ребенка.',
'medium',
ARRAY['Промпт просит объяснить 3 типа ML', 'Используется аналогия с обучением ребенка', 'Каждый тип описан отдельным сценарием']);


-- Course 3, Lesson 2
INSERT INTO practicum_lessons (course_id, slug, title, description, sort_order, is_published)
VALUES (
  (SELECT id FROM practicum_courses WHERE slug = 'ml-basics'),
  'data-and-metrics',
  'Данные и метрики',
  'Узнаете, почему данные -- основа ML, и как измерять качество моделей.',
  2,
  true
);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, content) VALUES
((SELECT id FROM practicum_lessons WHERE slug = 'data-and-metrics'), 1, 'theory', 'Данные -- топливо ML',
'# Данные и метрики качества

## Почему данные так важны

В машинном обучении есть поговорка: **"Garbage in -- garbage out"** (мусор на входе -- мусор на выходе). Качество модели напрямую зависит от качества данных.

### Что нужно для хороших данных:
- **Объем** -- достаточно примеров для обучения
- **Качество** -- данные корректные и без ошибок
- **Разнообразие** -- данные покрывают разные случаи
- **Баланс** -- примеров каждого класса примерно поровну

### Разделение данных

Данные обычно делят на 3 части:
- **Обучающая выборка (train)** -- 70-80%, на ней модель учится
- **Валидационная выборка (val)** -- 10-15%, для настройки параметров
- **Тестовая выборка (test)** -- 10-15%, финальная проверка

> Подробнее о подготовке данных -- в {{методичке о датасетах|датасет}}.');

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, content, info_style) VALUES
((SELECT id FROM practicum_lessons WHERE slug = 'data-and-metrics'), 2, 'info', 'Важно',
'Никогда не тестируйте модель на тех же данных, на которых она обучалась! Это как давать ученику на экзамене те же самые задачи, что были в учебнике -- вы проверите его память, а не понимание.', 'warning');

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, content) VALUES
((SELECT id FROM practicum_lessons WHERE slug = 'data-and-metrics'), 3, 'theory', 'Метрики качества',
'## Как измерить качество модели

Основные метрики зависят от типа задачи.

### Для классификации:
- **Accuracy** (точность) -- доля правильных ответов
- **Precision** -- из тех, кого модель назвала "позитивным", сколько действительно позитивных
- **Recall** -- из всех реально позитивных, сколько модель нашла

### Для регрессии:
- **MAE** (Mean Absolute Error) -- средняя абсолютная ошибка
- **RMSE** (Root Mean Squared Error) -- корень из средней квадратичной ошибки

> Подробнее -- в {{методичке по оценке качества|оценка качества}}.');

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, quiz_question, quiz_options, quiz_correct_index) VALUES
((SELECT id FROM practicum_lessons WHERE slug = 'data-and-metrics'), 4, 'quiz', 'Проверьте себя',
'Почему данные нельзя использовать одновременно для обучения и тестирования модели?',
'["Это слишком дорого по вычислительным ресурсам", "Модель может просто запомнить ответы, а не научиться обобщать", "Это запрещено лицензией", "На самом деле можно, это миф"]'::jsonb,
1);

INSERT INTO practicum_steps (lesson_id, sort_order, step_type, title, task_description, task_hint, task_difficulty, task_success_criteria) VALUES
((SELECT id FROM practicum_lessons WHERE slug = 'data-and-metrics'), 5, 'task', 'Метрики для задачи',
'Напишите промпт, который попросит ИИ объяснить, какую метрику качества лучше выбрать для медицинской диагностики (определение болезни) и почему. Попросите сравнить precision и recall для этого случая.',
'Подумайте: что хуже в медицине -- пропустить больного (низкий recall) или ошибочно диагностировать здорового (низкий precision)?',
'hard',
ARRAY['Промпт просит выбрать метрику для медицинской диагностики', 'Просит сравнить precision и recall', 'Просит обосновать выбор', 'Задача сформулирована конкретно']);
