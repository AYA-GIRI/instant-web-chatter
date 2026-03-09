-- Migration: Create practicum tables (courses, lessons, steps)
-- Description: Yandex Practicum-style "Material + Tasks" structure
-- Hierarchy: Course -> Lesson -> Step (theory/task/quiz/info)

-- ============================================
-- 1. Practicum Courses (top-level modules)
-- ============================================
CREATE TABLE IF NOT EXISTS practicum_courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  icon_name TEXT NOT NULL DEFAULT 'BookOpen',
  color TEXT NOT NULL DEFAULT '#6366f1',
  difficulty TEXT NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard')),
  estimated_duration TEXT NOT NULL DEFAULT '30 min',
  lessons_count INTEGER NOT NULL DEFAULT 0,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_practicum_courses_slug ON practicum_courses(slug);
CREATE INDEX IF NOT EXISTS idx_practicum_courses_published ON practicum_courses(is_published);

-- ============================================
-- 2. Practicum Lessons (within a course)
-- ============================================
CREATE TABLE IF NOT EXISTS practicum_lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID REFERENCES practicum_courses(id) ON DELETE CASCADE NOT NULL,
  slug TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(course_id, slug)
);

CREATE INDEX IF NOT EXISTS idx_practicum_lessons_course ON practicum_lessons(course_id);
CREATE INDEX IF NOT EXISTS idx_practicum_lessons_sort ON practicum_lessons(sort_order);

-- ============================================
-- 3. Practicum Steps (content blocks within a lesson)
-- ============================================
CREATE TABLE IF NOT EXISTS practicum_steps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id UUID REFERENCES practicum_lessons(id) ON DELETE CASCADE NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,

  -- Step type determines rendering and behavior
  step_type TEXT NOT NULL CHECK (step_type IN ('theory', 'task', 'quiz', 'info')),

  -- Common fields
  title TEXT,

  -- For theory/info: markdown content with glossary links
  -- Glossary link syntax: {{term|search_query}} renders as clickable link to /methods?search=search_query
  content TEXT,

  -- For task: AI-verified prompt exercise
  task_description TEXT,
  task_example TEXT,
  task_hint TEXT,
  task_difficulty TEXT CHECK (task_difficulty IN ('easy', 'medium', 'hard') OR task_difficulty IS NULL),
  task_success_criteria TEXT[],

  -- For quiz: simple choice questions
  quiz_question TEXT,
  quiz_options JSONB,
  quiz_correct_index INTEGER,

  -- For info: style variant
  info_style TEXT CHECK (info_style IN ('example', 'warning', 'tip', 'note') OR info_style IS NULL),

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_practicum_steps_lesson ON practicum_steps(lesson_id);
CREATE INDEX IF NOT EXISTS idx_practicum_steps_sort ON practicum_steps(sort_order);
CREATE INDEX IF NOT EXISTS idx_practicum_steps_type ON practicum_steps(step_type);

-- ============================================
-- RLS Policies
-- ============================================

ALTER TABLE practicum_courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE practicum_lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE practicum_steps ENABLE ROW LEVEL SECURITY;

-- Courses: everyone reads published, admins read all and write
DROP POLICY IF EXISTS "Anyone can view published courses" ON practicum_courses;
CREATE POLICY "Anyone can view published courses"
  ON practicum_courses FOR SELECT
  USING (is_published = true);

DROP POLICY IF EXISTS "Admins can view all courses" ON practicum_courses;
CREATE POLICY "Admins can view all courses"
  ON practicum_courses FOR SELECT
  USING (public.is_admin());

DROP POLICY IF EXISTS "Admins can insert courses" ON practicum_courses;
CREATE POLICY "Admins can insert courses"
  ON practicum_courses FOR INSERT
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admins can update courses" ON practicum_courses;
CREATE POLICY "Admins can update courses"
  ON practicum_courses FOR UPDATE
  USING (public.is_admin());

DROP POLICY IF EXISTS "Admins can delete courses" ON practicum_courses;
CREATE POLICY "Admins can delete courses"
  ON practicum_courses FOR DELETE
  USING (public.is_admin());

-- Lessons: everyone reads published course lessons, admins read all and write
DROP POLICY IF EXISTS "Anyone can view published lessons" ON practicum_lessons;
CREATE POLICY "Anyone can view published lessons"
  ON practicum_lessons FOR SELECT
  USING (
    is_published = true
    AND EXISTS (
      SELECT 1 FROM practicum_courses c
      WHERE c.id = course_id AND c.is_published = true
    )
  );

DROP POLICY IF EXISTS "Admins can view all lessons" ON practicum_lessons;
CREATE POLICY "Admins can view all lessons"
  ON practicum_lessons FOR SELECT
  USING (public.is_admin());

DROP POLICY IF EXISTS "Admins can insert lessons" ON practicum_lessons;
CREATE POLICY "Admins can insert lessons"
  ON practicum_lessons FOR INSERT
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admins can update lessons" ON practicum_lessons;
CREATE POLICY "Admins can update lessons"
  ON practicum_lessons FOR UPDATE
  USING (public.is_admin());

DROP POLICY IF EXISTS "Admins can delete lessons" ON practicum_lessons;
CREATE POLICY "Admins can delete lessons"
  ON practicum_lessons FOR DELETE
  USING (public.is_admin());

-- Steps: inherit visibility from lessons
DROP POLICY IF EXISTS "Anyone can view steps of published lessons" ON practicum_steps;
CREATE POLICY "Anyone can view steps of published lessons"
  ON practicum_steps FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM practicum_lessons l
      JOIN practicum_courses c ON c.id = l.course_id
      WHERE l.id = lesson_id
        AND l.is_published = true
        AND c.is_published = true
    )
  );

DROP POLICY IF EXISTS "Admins can view all steps" ON practicum_steps;
CREATE POLICY "Admins can view all steps"
  ON practicum_steps FOR SELECT
  USING (public.is_admin());

DROP POLICY IF EXISTS "Admins can insert steps" ON practicum_steps;
CREATE POLICY "Admins can insert steps"
  ON practicum_steps FOR INSERT
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admins can update steps" ON practicum_steps;
CREATE POLICY "Admins can update steps"
  ON practicum_steps FOR UPDATE
  USING (public.is_admin());

DROP POLICY IF EXISTS "Admins can delete steps" ON practicum_steps;
CREATE POLICY "Admins can delete steps"
  ON practicum_steps FOR DELETE
  USING (public.is_admin());

-- ============================================
-- Triggers for updated_at
-- ============================================

CREATE OR REPLACE FUNCTION public.handle_practicum_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS on_practicum_courses_updated ON practicum_courses;
CREATE TRIGGER on_practicum_courses_updated
  BEFORE UPDATE ON practicum_courses
  FOR EACH ROW EXECUTE FUNCTION public.handle_practicum_updated_at();

DROP TRIGGER IF EXISTS on_practicum_lessons_updated ON practicum_lessons;
CREATE TRIGGER on_practicum_lessons_updated
  BEFORE UPDATE ON practicum_lessons
  FOR EACH ROW EXECUTE FUNCTION public.handle_practicum_updated_at();

DROP TRIGGER IF EXISTS on_practicum_steps_updated ON practicum_steps;
CREATE TRIGGER on_practicum_steps_updated
  BEFORE UPDATE ON practicum_steps
  FOR EACH ROW EXECUTE FUNCTION public.handle_practicum_updated_at();
