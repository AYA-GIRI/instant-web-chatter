-- One-off: mark base course as completed for test user andrewlachtin@gmail.com.
-- Run in Supabase SQL Editor or via migration. Progress is in user_progress (task_id = step_<uuid>, completed = true).
-- Common base completion is derived from all interactive steps (task/quiz) of the course with is_common_base = true.

DO $$
DECLARE
  v_user_id UUID;
  v_step_id UUID;
BEGIN
  SELECT id INTO v_user_id FROM auth.users WHERE email = 'andrewlachtin@gmail.com' LIMIT 1;

  IF v_user_id IS NULL THEN
    RAISE NOTICE 'User andrewlachtin@gmail.com not found in auth.users; skip marking base completed.';
    RETURN;
  END IF;

  FOR v_step_id IN
    SELECT s.id
    FROM practicum_steps s
    JOIN practicum_lessons l ON l.id = s.lesson_id
    JOIN practicum_courses c ON c.id = l.course_id
    WHERE c.is_common_base = true
      AND c.is_published = true
      AND l.is_published = true
      AND s.step_type IN ('task', 'quiz')
  LOOP
    INSERT INTO public.user_progress (user_id, task_id, completed, completed_at, updated_at)
    VALUES (v_user_id, 'step_' || v_step_id, true, NOW(), NOW())
    ON CONFLICT (user_id, task_id)
    DO UPDATE SET completed = true, completed_at = NOW(), updated_at = NOW();
  END LOOP;

  RAISE NOTICE 'Base course marked completed for user %', v_user_id;
END $$;
