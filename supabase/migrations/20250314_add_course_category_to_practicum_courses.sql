-- P0.3: минимальная таксономия курсов практикума
-- Добавляет поле course_category и связывает его с is_common_base.

ALTER TABLE public.practicum_courses
ADD COLUMN IF NOT EXISTS course_category TEXT
CHECK (
  course_category IS NULL
  OR course_category IN ('common_base', 'role_track', 'optional')
);

-- Согласованность course_category и is_common_base:
-- - common_base  -> is_common_base = true
-- - role_track/optional -> is_common_base = false
-- - NULL         -> не проверяем (для обратной совместимости)
ALTER TABLE public.practicum_courses
ADD CONSTRAINT practicum_courses_category_base_consistency
CHECK (
  course_category IS NULL
  OR (course_category = 'common_base' AND is_common_base = true)
  OR (course_category <> 'common_base' AND is_common_base = false)
);

