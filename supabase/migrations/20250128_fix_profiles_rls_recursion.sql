-- Migration: Fix infinite recursion in profiles RLS policy
-- Description: Create a security definer function to check admin role without triggering RLS

-- Создаем функцию для проверки роли админа с SECURITY DEFINER
-- Это позволяет проверить роль без применения RLS политик
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- Удаляем проблемную политику с рекурсией
DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;

-- Создаем исправленную политику, использующую функцию с SECURITY DEFINER
CREATE POLICY "Admins can view all profiles"
  ON profiles FOR SELECT
  USING (public.is_admin());

-- Также исправляем аналогичную политику в user_progress, если она есть
DROP POLICY IF EXISTS "Admins can view all progress" ON user_progress;
CREATE POLICY "Admins can view all progress"
  ON user_progress FOR SELECT
  USING (public.is_admin());

