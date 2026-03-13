-- P0.2: флаг обязательного базового курса для практикума
-- Добавляет колонку is_common_base в practicum_courses

ALTER TABLE public.practicum_courses
ADD COLUMN IF NOT EXISTS is_common_base boolean NOT NULL DEFAULT false;

-- Гарантируем, что в каждый момент времени опубликован не более один базовый курс.
-- Если нужно будет иметь несколько базовых курсов, этот индекс можно будет удалить.
CREATE UNIQUE INDEX IF NOT EXISTS practicum_courses_single_common_base
ON public.practicum_courses ((true))
WHERE is_common_base = true AND is_published = true;

