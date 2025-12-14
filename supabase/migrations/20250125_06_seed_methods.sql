-- Migration: Seed initial methods data
-- Description: Insert existing 15 methods from static array into database
-- Note: Files need to be uploaded to Storage separately and file_url updated

INSERT INTO methods (title, description, tags, level, direction, icon_name, format, is_active) VALUES
  ('Определение ИИ и машинного обучения', 'Введение в основы искусственного интеллекта и машинного обучения для начинающих специалистов.', ARRAY['Введение в ИИ', 'Основы ML'], 'beginner', 'ai', 'BookOpen', 'pdf', true),
  ('Сферы машинного обучения', 'Обзор различных областей применения технологий машинного обучения в современном мире.', ARRAY['Для начинающих'], 'beginner', 'ml', 'Zap', 'pdf', true),
  ('Искусство промтинга: как общаться с ИИ', 'Подробное руководство по эффективному взаимодействию с AI-моделями через промты.', ARRAY['Промтинг'], 'beginner', 'prompting', 'Lightbulb', 'pdf', true),
  ('Виды нейросетей', 'Классификация и особенности различных типов нейронных сетей и их архитектур.', ARRAY['Нейросети'], 'intermediate', 'neural', 'Network', 'pdf', true),
  ('Нейросети и языковые модели', 'Углубленное изучение языковых моделей и их применение в современных AI-системах.', ARRAY['Нейросети', 'Языковые модели'], 'intermediate', 'neural', 'Cpu', 'pdf', true),
  ('Данные для обучения моделей', 'Создание и подготовка датасетов для эффективного обучения AI-моделей.', ARRAY['Датасеты', 'Подготовка данных'], 'intermediate', 'ml', 'Database', 'pdf', true),
  ('Алгоритмы глубокого обучения', 'Погружение в архитектуры глубоких нейронных сетей и методы их обучения.', ARRAY['Deep Learning', 'Алгоритмы'], 'advanced', 'neural', 'Layers', 'pdf', true),
  ('Оценка качества моделей', 'Метрики и методы оценки производительности машинного обучения.', ARRAY['Метрики', 'Оценка'], 'intermediate', 'ml', 'BarChart3', 'pdf', true),
  ('Практика промтинга с GPT', 'Практические примеры и техники промтинга для различных задач.', ARRAY['Промтинг', 'GPT', 'Практика'], 'beginner', 'prompting', 'Key', 'pdf', true),
  ('Computer Vision: основы', 'Обработка и анализ изображений с помощью компьютерного зрения.', ARRAY['Computer Vision', 'Обработка изображений'], 'intermediate', 'ai', 'Target', 'pdf', true),
  ('Этика в искусственном интеллекте', 'Этические вопросы, bias и ответственность в разработке AI-систем.', ARRAY['Этика', 'AI Ethics'], 'intermediate', 'ai', 'Shield', 'pdf', true),
  ('Transformer архитектура', 'Deep Dive в архитектуру Transformer и её применение в NLP.', ARRAY['Transformers', 'NLP'], 'advanced', 'neural', 'Brain', 'pdf', true),
  ('Градиентный спуск и оптимизация', 'Теория и практика алгоритмов оптимизации в машинном обучении.', ARRAY['Оптимизация', 'Gradient Descent'], 'intermediate', 'ml', 'TrendingUp', 'pdf', true),
  ('MLOps: практика развертывания', 'DevOps для машинного обучения: от обучения до production.', ARRAY['MLOps', 'Deployment'], 'advanced', 'ml', 'Code', 'pdf', true),
  ('Создание документации для AI проектов', 'Лучшие практики ведения документации в проектах машинного обучения.', ARRAY['Документация', 'Best Practices'], 'beginner', 'ai', 'FileText', 'pdf', true)
ON CONFLICT DO NOTHING;

-- Note: After uploading files to Storage bucket 'methods', update file_url for each method:
-- UPDATE methods SET file_url = 'methods/method-{id}.pdf', file_name = 'method-{id}.pdf' WHERE id = '{method-id}';

