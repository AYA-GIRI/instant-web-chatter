-- Fix glossary links in practicum_steps to use search queries that match actual method titles/tags

UPDATE practicum_steps SET content = REPLACE(content, '{{Промпт|промпт}}', '{{Промпт|промтинг}}')
WHERE content LIKE '%{{Промпт|промпт}}%';

UPDATE practicum_steps SET task_description = REPLACE(task_description, '{{машинного обучения|машинное обучение}}', '{{машинного обучения|машинного обучения}}')
WHERE task_description LIKE '%{{машинного обучения|машинное обучение}}%';

UPDATE practicum_steps SET content = REPLACE(content, '{{языковых моделей|нейросети}}', '{{языковых моделей|языковые модели}}')
WHERE content LIKE '%{{языковых моделей|нейросети}}%';

UPDATE practicum_steps SET content = REPLACE(content, '{{обучающего датасета|данные для обучения}}', '{{обучающего датасета|датасет}}')
WHERE content LIKE '%{{обучающего датасета|данные для обучения}}%';

UPDATE practicum_steps SET content = REPLACE(content, '{{методичке по градиентному спуску|градиентный спуск}}', '{{методичке по градиентному спуску|градиентный}}')
WHERE content LIKE '%{{методичке по градиентному спуску|градиентный спуск}}%';

UPDATE practicum_steps SET content = REPLACE(content, '{{языковых моделей|нейросети и языковые модели}}', '{{языковых моделей|языковые модели}}')
WHERE content LIKE '%{{языковых моделей|нейросети и языковые модели}}%';

UPDATE practicum_steps SET content = REPLACE(content, '{{Машинное обучение|определение ИИ и машинного обучения}}', '{{Машинное обучение|определение ИИ}}')
WHERE content LIKE '%{{Машинное обучение|определение ИИ и машинного обучения}}%';

UPDATE practicum_steps SET content = REPLACE(content, '{{методичке по ML|сферы машинного обучения}}', '{{методичке по ML|сферы машинного}}')
WHERE content LIKE '%{{методичке по ML|сферы машинного обучения}}%';

UPDATE practicum_steps SET content = REPLACE(content, '{{методичке о датасетах|данные для обучения}}', '{{методичке о датасетах|датасет}}')
WHERE content LIKE '%{{методичке о датасетах|данные для обучения}}%';

UPDATE practicum_steps SET content = REPLACE(content, '{{методичке по оценке качества|оценка качества моделей}}', '{{методичке по оценке качества|оценка качества}}')
WHERE content LIKE '%{{методичке по оценке качества|оценка качества моделей}}%';
